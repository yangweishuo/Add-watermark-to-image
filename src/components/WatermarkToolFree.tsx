import React, { useState, useRef } from 'react' // 导入React核心库和useState、useRef钩子
import { WatermarkConfig } from '../types/types' // 导入水印配置类型
import WatermarkSettings from './WatermarkSettings' // 导入水印设置组件
import { ImagePreview } from './ImagePreview' // 导入图片预览组件

export const WatermarkToolFree: React.FC = () => { // 定义水印工具组件（免费版）
  const [config, setConfig] = useState<WatermarkConfig>({ // 初始化水印配置状态
    text: '', // 水印文本，初始为空
    fontSize: 20, // 字体大小，初始为20像素
    color: '#000000', // 水印颜色，初始为黑色
    opacity: 50, // 水印透明度，初始为50%
    position: 'center', // 水印位置，初始为居中
    rotation: 0, // 水印旋转角度，初始为0度
    tiled: false, // 是否平铺水印，初始为否
    spacing: 50, // 平铺间距，初始为50像素
    imageUrl: '', // 图片URL，初始为空
    size: 100, // 水印大小，初始为100
    securityFont: 'Arial' // 安全水印字体，初始为Arial
  })

  const [image, setImage] = useState<File | null>(null) // 保存当前上传的图片文件
  const fileInputRef = useRef<HTMLInputElement>(null) // 创建文件输入框的引用

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => { // 处理图片上传事件
    const file = event.target.files?.[0] // 获取上传的第一个文件
    if (file) { // 如果文件存在
      setImage(file) // 更新图片状态
    }
  }

  const handleConfigChange = (newConfig: Partial<WatermarkConfig>) => { // 处理水印配置变更
    setConfig(prev => ({ ...prev, ...newConfig })) // 合并新旧配置
  }

  const handleDownload = (dataUrl: string) => { // 处理图片下载
    const link = document.createElement('a') // 创建一个a标签
    link.href = dataUrl // 设置链接地址为图片数据URL
    link.download = 'watermarked-image.jpg' // 设置下载文件名
    link.click() // 模拟点击链接触发下载
  }

  const handleDeleteImage = (index: number) => { // 处理删除图片
    setImage(null) // 清空图片状态
  }

  return (
    <div className="divide-y divide-gray-200">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-900">图片水印工具</h2>
          <div className="flex items-center space-x-4">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              选择图片
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-gray-200">
        <div className="p-6">
          <WatermarkSettings
            config={config}
            onChange={handleConfigChange}
          />
        </div>

        <div className="p-6">
          {image ? (
            <ImagePreview
              images={[image]}
              config={config}
              onDownload={handleDownload}
              onDeleteImage={handleDeleteImage}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="mt-2 text-sm text-gray-500">请选择一张图片</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}