import React, { useState, useEffect } from 'react' // 导入React核心库和useState、useEffect钩子
import { ImagePreviewProps, WatermarkConfig } from '../types/types' // 导入图片预览属性和水印配置类型

export const ImagePreview: React.FC<ImagePreviewProps> = ({ images, config, onDownload, onDeleteImage }) => { // 定义图片预览组件
  const [processedImages, setProcessedImages] = useState<string[]>([]) // 用于存储处理后的图片数据URL
  const [selectedImage, setSelectedImage] = useState<number>(0) // 当前选中的图片索引
  const [isProcessing, setIsProcessing] = useState<boolean>(false) // 是否正在处理图片的标志
  const [error, setError] = useState<string | null>(null) // 存储错误信息

  useEffect(() => { // 当图片数组或配置变化时执行
    if (images.length > 0) { // 如果有图片
      processImages() // 处理图片
    }
  }, [images, config]) // 依赖项：图片和配置

  const processImages = async () => { // 处理所有图片的异步函数
    setIsProcessing(true) // 设置正在处理状态
    setError(null) // 清空错误信息
    try {
      const processed = await Promise.all(images.map(processImage)) // 并行处理所有图片
      setProcessedImages(processed) // 更新处理后的图片数组
    } catch (err) {
      setError(err instanceof Error ? err.message : '处理图片时出错') // 设置错误信息
    }
    setIsProcessing(false) // 结束处理状态
  }

  const processImage = async (file: File): Promise<string> => { // 处理单个图片的异步函数
    return new Promise((resolve, reject) => { // 返回Promise
      const reader = new FileReader() // 创建文件读取器
      reader.onload = (e) => { // 文件读取完成时
        const img = new Image() // 创建图片对象
        img.onload = () => { // 图片加载完成时
          const canvas = document.createElement('canvas') // 创建画布元素
          const ctx = canvas.getContext('2d') // 获取2D绘图上下文
          if (!ctx) { // 如果无法获取上下文
            reject(new Error('无法获取画布上下文')) // 拒绝Promise
            return
          }

          canvas.width = img.width // 设置画布宽度为图片宽度
          canvas.height = img.height // 设置画布高度为图片高度
          ctx.drawImage(img, 0, 0) // 在画布上绘制图片

          // Add watermark
          addWatermark(ctx, canvas.width, canvas.height, config) // 添加水印

          resolve(canvas.toDataURL('image/jpeg')) // 将画布转换为数据URL并解析Promise
        }
        img.onerror = () => reject(new Error('图片加载失败')) // 图片加载失败时拒绝Promise
        img.src = e.target?.result as string // 设置图片源为读取的数据
      }
      reader.onerror = () => reject(new Error('文件读取失败')) // 文件读取失败时拒绝Promise
      reader.readAsDataURL(file) // 以数据URL方式读取文件
    })
  }

  const addWatermark = (ctx: CanvasRenderingContext2D, width: number, height: number, config: WatermarkConfig) => { // 添加水印的函数
    ctx.save() // 保存当前画布状态
    ctx.globalAlpha = config.opacity / 100 // 设置全局透明度
    addTextWatermark(ctx, width, height, config) // 添加文字水印
    
    // 添加防伪码水印
    if (config.securityCode) {
      addSecurityCodeWatermark(ctx, width, height, config)
    }
    
    ctx.restore() // 恢复画布状态
  }

  const addTextWatermark = (ctx: CanvasRenderingContext2D, width: number, height: number, config: WatermarkConfig) => { // 添加文字水印的函数
    ctx.font = `${config.fontSize}px ${config.securityFont || 'Arial'}` // 设置字体大小和字体
    ctx.fillStyle = config.color // 设置填充颜色
    ctx.textAlign = 'center' // 设置文本对齐方式为居中
    ctx.textBaseline = 'middle' // 设置文本基线为中间

    if (config.tiled) { // 如果启用了平铺水印
      const spacing = config.spacing || 100 // 获取间距
      for (let x = spacing; x < width; x += spacing) { // 水平方向循环
        for (let y = spacing; y < height; y += spacing) { // 垂直方向循环
          ctx.save() // 保存当前状态
          ctx.translate(x, y) // 移动到当前位置
          ctx.rotate((config.rotation * Math.PI) / 180) // 旋转指定角度（转换为弧度）
          ctx.fillText(config.text, 0, 0) // 在当前位置绘制文本
          ctx.restore() // 恢复之前的状态
        }
      }
    } else { // 如果不是平铺水印
      const position = getPosition(width, height, config.position) // 获取水印位置
      ctx.save() // 保存当前状态
      ctx.translate(position.x, position.y) // 移动到指定位置
      ctx.rotate((config.rotation * Math.PI) / 180) // 旋转指定角度
      ctx.fillText(config.text, 0, 0) // 在指定位置绘制文本
      ctx.restore() // 恢复之前的状态
    }
  }

  const addSecurityCodeWatermark = (ctx: CanvasRenderingContext2D, width: number, height: number, config: WatermarkConfig) => {
    if (!config.securityCode) return;
    
    // 确保有安全码文本内容，如果没有则使用默认值
    const securityText = typeof config.text === 'string' ? config.text : '安全水印';
    
    ctx.font = `${config.securityCodeSize}px Arial`
    ctx.fillStyle = config.color // 使用相同的颜色作为文字水印
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    
    // 根据位置设置防伪码
    if (config.securityCodePosition === 'tiled') {
      // 平铺模式
      const spacing = 150
      for (let x = spacing; x < width; x += spacing) {
        for (let y = spacing; y < height; y += spacing) {
          ctx.save()
          ctx.translate(x, y)
          ctx.rotate((config.rotation * Math.PI) / 180)
          ctx.fillText(securityText, 0, 0)
          ctx.restore()
        }
      }
    } else if (config.securityCodePosition === 'diagonal') {
      // 对角线模式
      ctx.save()
      ctx.translate(width * 0.25, height * 0.25)
      ctx.rotate((config.rotation * Math.PI) / 180)
      ctx.fillText(securityText, 0, 0)
      ctx.restore()
      
      ctx.save()
      ctx.translate(width * 0.75, height * 0.75)
      ctx.rotate((config.rotation * Math.PI) / 180)
      ctx.fillText(securityText, 0, 0)
      ctx.restore()
    } else if (config.securityCodePosition === 'border') {
      // 边框模式
      const positions = [
        { x: width * 0.2, y: height * 0.1 },
        { x: width * 0.8, y: height * 0.1 },
        { x: width * 0.2, y: height * 0.9 },
        { x: width * 0.8, y: height * 0.9 }
      ]
      
      positions.forEach(pos => {
        ctx.save()
        ctx.translate(pos.x, pos.y)
        ctx.rotate((config.rotation * Math.PI) / 180)
        ctx.fillText(securityText, 0, 0)
        ctx.restore()
      })
    }
  }

  const getPosition = (width: number, height: number, position: string) => { // 根据位置参数获取坐标的函数
    switch (position) { // 根据位置类型
      case 'top-left': // 左上角
        return { x: width * 0.1, y: height * 0.1 } // 返回左上角坐标
      case 'top-right': // 右上角
        return { x: width * 0.9, y: height * 0.1 } // 返回右上角坐标
      case 'bottom-left': // 左下角
        return { x: width * 0.1, y: height * 0.9 } // 返回左下角坐标
      case 'bottom-right': // 右下角
        return { x: width * 0.9, y: height * 0.9 } // 返回右下角坐标
      default: // 默认（居中）
        return { x: width * 0.5, y: height * 0.5 } // 返回中心点坐标
    }
  }

  const handleDownload = () => { // 处理下载的函数
    if (processedImages[selectedImage] && onDownload) { // 如果有处理后的图片并且提供了下载回调
      onDownload(processedImages[selectedImage]) // 调用下载回调，传入当前选中的图片
    }
  }

  if (isProcessing) { // 如果正在处理图片
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        <p className="mt-4 text-sm text-gray-500">处理中...</p>
      </div>
    )
  }

  if (error) { // 如果有错误
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="mt-4 text-sm text-red-500">{error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {processedImages.length > 0 && (
        <>
          <div className="relative">
            <img
              src={processedImages[selectedImage]}
              alt="预览"
              className="w-full h-auto rounded-lg shadow-lg"
            />
            <button
              onClick={() => onDeleteImage(selectedImage)}
              className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleDownload}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              下载图片
            </button>
          </div>
        </>
      )}
    </div>
  )
} 