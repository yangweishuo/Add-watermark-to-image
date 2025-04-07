'use client'

import React, { useEffect, useRef, useState } from 'react'
import type { WatermarkConfig } from '@/types'
import JSZip from 'jszip'

interface ImagePreviewProps {
  images: File[]
  watermarkConfig: WatermarkConfig
  onDownloadComplete?: (images: string[]) => void
  isPreview?: boolean
}

const getSecurityCodeFontSize = (size: string | undefined, baseSize: number) => {
  switch (size) {
    case 'small':
      return baseSize * 0.75
    case 'large':
      return baseSize * 1.5
    default:
      return baseSize
  }
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  images,
  watermarkConfig,
  onDownloadComplete,
  isPreview = false
}) => {
  const [processedImages, setProcessedImages] = useState<string[]>([])
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    if (images.length > 0) {
      processImages()
    } else {
      setProcessedImages([])
    }
  }, [images, watermarkConfig])

  const processImages = async () => {
    setIsProcessing(true)
    const processed: string[] = []

    for (const image of images) {
      const result = await addWatermark(image)
      processed.push(result)
    }

    setProcessedImages(processed)
    setIsProcessing(false)
  }

  const addWatermark = (image: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const img = new Image()
        img.onload = () => {
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')
          if (!ctx) {
            resolve(URL.createObjectURL(image))
            return
          }

          // 设置画布大小
          canvas.width = img.width
          canvas.height = img.height

          // 绘制原图
          ctx.drawImage(img, 0, 0)

          if (watermarkConfig.type === 'text') {
            addTextWatermark(ctx, img)
          } else if (watermarkConfig.type === 'image' && watermarkConfig.imageFile) {
            addImageWatermark(ctx, img.width, img.height)
          } else if (watermarkConfig.type === 'security') {
            addSecurityWatermark(ctx, img.width, img.height)
          }

          // 转换为Blob并创建URL
          canvas.toBlob((blob) => {
            if (blob) {
              resolve(URL.createObjectURL(blob))
            } else {
              resolve(URL.createObjectURL(image))
            }
          }, 'image/jpeg', 0.9)
        }
        img.src = e.target?.result as string
      }
      reader.readAsDataURL(image)
    })
  }

  const addTextWatermark = (ctx: CanvasRenderingContext2D, image: HTMLImageElement) => {
    const { text, fontSize, color, opacity, position, angle, enable3D, depth, lightAngle, highlightColor, shadowColor } = watermarkConfig
    
    // 设置字体
    ctx.font = `${fontSize}px Arial`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    
    // 计算文字位置
    const { x, y } = calculatePosition(ctx, image, position)
    
    // 保存当前状态
    ctx.save()
    
    // 移动到文字位置并旋转
    ctx.translate(x, y)
    ctx.rotate((angle * Math.PI) / 180)
    
    // 设置透明度
    ctx.globalAlpha = opacity
    
    if (enable3D) {
      // 计算光源方向
      const lightX = Math.cos((lightAngle * Math.PI) / 180)
      const lightY = Math.sin((lightAngle * Math.PI) / 180)
      
      // 绘制3D效果
      for (let i = depth; i > 0; i--) {
        // 计算当前层的偏移
        const offsetX = i * lightX
        const offsetY = i * lightY
        
        // 设置阴影颜色
        ctx.fillStyle = shadowColor
        ctx.fillText(text, offsetX, offsetY)
      }
      
      // 绘制正面文字
      ctx.fillStyle = color
      ctx.fillText(text, 0, 0)
      
      // 绘制高光
      const highlightOffset = depth * 0.2
      ctx.fillStyle = highlightColor
      ctx.fillText(text, -highlightOffset * lightX, -highlightOffset * lightY)
    } else {
      // 绘制普通文字
      ctx.fillStyle = color
      ctx.fillText(text, 0, 0)
    }
    
    // 恢复状态
    ctx.restore()
  }

  const addImageWatermark = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    if (!watermarkConfig.imageFile) return

    const watermarkImg = new Image()
    watermarkImg.src = URL.createObjectURL(watermarkConfig.imageFile)

    ctx.save()
    ctx.globalAlpha = watermarkConfig.imageOpacity

    // 计算水印图片尺寸
    const scale = watermarkConfig.imageScale
    const watermarkWidth = width * scale
    const watermarkHeight = (watermarkImg.height / watermarkImg.width) * watermarkWidth

    // 计算位置
    const { x, y } = calculatePosition(ctx, watermarkImg, watermarkConfig.imagePosition)

    // 旋转
    if (watermarkConfig.imageRotation !== 0) {
      ctx.translate(x, y)
      ctx.rotate((watermarkConfig.imageRotation * Math.PI) / 180)
      ctx.translate(-x, -y)
    }

    // 绘制水印图片
    if (watermarkConfig.tiled) {
      const tileWidth = width / watermarkConfig.tileGap
      const tileHeight = height / watermarkConfig.tileGap
      for (let i = 0; i < width; i += tileWidth) {
        for (let j = 0; j < height; j += tileHeight) {
          ctx.drawImage(watermarkImg, i, j, watermarkWidth * watermarkConfig.tileScale, watermarkHeight * watermarkConfig.tileScale)
        }
      }
    } else {
      ctx.drawImage(watermarkImg, x - watermarkWidth / 2, y - watermarkHeight / 2, watermarkWidth, watermarkHeight)
    }

    ctx.restore()
  }

  const addSecurityWatermark = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    if (!watermarkConfig.securityCode) return

    ctx.save()
    ctx.font = `${getSecurityFontSize()}px ${watermarkConfig.securityFont}`
    ctx.fillStyle = '#000000'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    // 根据位置设置绘制点
    const positions = getSecurityPositions(width, height)
    positions.forEach(({ x, y }) => {
      ctx.fillText(watermarkConfig.securityCode, x, y)
    })

    // 如果启用隐藏防伪码
    if (watermarkConfig.enableHiddenCode) {
      ctx.globalAlpha = watermarkConfig.hiddenCodeOpacity
      const hiddenPositions = getRandomPositions(width, height, 5)
      hiddenPositions.forEach(({ x, y }) => {
        ctx.fillText(watermarkConfig.securityCode, x, y)
      })
    }

    ctx.restore()
  }

  const calculatePosition = (ctx: CanvasRenderingContext2D, image: HTMLImageElement, position: string) => {
    switch (position) {
      case 'top-left':
        return { x: image.width * 0.25, y: image.height * 0.25 }
      case 'top-right':
        return { x: image.width * 0.75, y: image.height * 0.25 }
      case 'bottom-left':
        return { x: image.width * 0.25, y: image.height * 0.75 }
      case 'bottom-right':
        return { x: image.width * 0.75, y: image.height * 0.75 }
      case 'center':
      default:
        return { x: image.width / 2, y: image.height / 2 }
    }
  }

  const getSecurityFontSize = () => {
    switch (watermarkConfig.securityCodeSize) {
      case 'small':
        return 12
      case 'large':
        return 24
      case 'medium':
      default:
        return 16
    }
  }

  const getSecurityPositions = (width: number, height: number) => {
    const positions = []
    const padding = 50

    switch (watermarkConfig.securityCodePosition) {
      case 'corners':
        positions.push(
          { x: padding, y: padding },
          { x: width - padding, y: padding },
          { x: padding, y: height - padding },
          { x: width - padding, y: height - padding }
        )
        break
      case 'center':
        positions.push({ x: width / 2, y: height / 2 })
        break
      case 'random':
        positions.push(...getRandomPositions(width, height, 4))
        break
    }

    return positions
  }

  const getRandomPositions = (width: number, height: number, count: number) => {
    const positions = []
    const padding = 100

    for (let i = 0; i < count; i++) {
      positions.push({
        x: padding + Math.random() * (width - 2 * padding),
        y: padding + Math.random() * (height - 2 * padding)
      })
    }

    return positions
  }

  const handleDownload = async () => {
    if (isProcessing || processedImages.length === 0) return

    const zip = new JSZip()
    const imgFolder = zip.folder('watermarked_images')

    for (let i = 0; i < processedImages.length; i++) {
      const response = await fetch(processedImages[i])
      const blob = await response.blob()
      imgFolder?.file(`watermarked_${i + 1}.jpg`, blob)
    }

    const content = await zip.generateAsync({ type: 'blob' })
    const url = URL.createObjectURL(content)
    const a = document.createElement('a')
    a.href = url
    a.download = 'watermarked_images.zip'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    onDownloadComplete?.(processedImages)
  }

  if (images.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-gray-500">请上传图片</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {processedImages.map((url, index) => (
          <div key={index} className="relative aspect-video">
            <img
              src={url}
              alt={`Processed ${index + 1}`}
              className="w-full h-full object-contain rounded-lg border border-gray-200"
            />
          </div>
        ))}
      </div>

      {!isPreview && (
        <button
          onClick={handleDownload}
          disabled={isProcessing || processedImages.length === 0}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
            isProcessing || processedImages.length === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isProcessing ? '处理中...' : '下载全部'}
        </button>
      )}
    </div>
  )
} 