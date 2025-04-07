'use client'

import React, { useState, useEffect } from 'react'
import { ImageUploader } from './ImageUploader'
import { WatermarkSettings } from './WatermarkSettings'
import { ImagePreview } from './ImagePreview'
import { ContactModal } from './ContactModal'
import type { WatermarkConfig } from '../types'

const STORAGE_KEY = 'watermark_usage_count'
const MAX_USAGE_COUNT = 5

export const WatermarkTool: React.FC = () => {
  const [images, setImages] = useState<File[]>([])
  const [usageCount, setUsageCount] = useState(0)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [watermarkConfig, setWatermarkConfig] = useState<WatermarkConfig>({
    // 基本属性
    text: '水印文字',
    fontSize: 24,
    color: '#000000',
    opacity: 0.5,
    position: 'center',
    angle: 0,
    
    // 平铺相关
    tiled: false,
    tileGap: 100,
    tileScale: 1,
    
    // 类型
    type: 'text',
    
    // 防伪相关
    securityCode: '',
    securityCodeSize: 'medium',
    securityFont: 'Arial',
    securityCodePosition: 'corners',
    enableHiddenCode: false,
    hiddenCodeOpacity: 0.1
  })

  // 初始化使用次数
  useEffect(() => {
    const storedCount = localStorage.getItem(STORAGE_KEY)
    setUsageCount(storedCount ? parseInt(storedCount) : 0)
  }, [])

  // 更新使用次数
  const updateUsageCount = () => {
    const newCount = usageCount + 1
    setUsageCount(newCount)
    localStorage.setItem(STORAGE_KEY, newCount.toString())
  }

  const handleDownloadComplete = () => {
    updateUsageCount()
    if (usageCount >= MAX_USAGE_COUNT - 1) {
      setIsContactModalOpen(true)
    }
  }

  const handleImagesUpload = async (files: File[]) => {
    if (usageCount >= MAX_USAGE_COUNT) {
      setIsContactModalOpen(true)
      return
    }

    // 检查每个文件是否已有水印
    const results = await Promise.all(files.map(checkWatermark))
    const hasWatermark = results.some(result => result)

    if (hasWatermark) {
      const confirmed = window.confirm('检测到部分图片可能已经包含水印，是否继续添加？')
      if (!confirmed) {
        return
      }
    }

    setImages(files)
  }

  // 删除单张图片
  const handleDeleteImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  // 清空所有图片
  const handleClearImages = () => {
    if (images.length > 0) {
      const confirmed = window.confirm('确定要清空所有已上传的图片吗？')
      if (confirmed) {
        setImages([])
      }
    }
  }

  const handleConfigChange = (newConfig: Partial<WatermarkConfig>) => {
    setWatermarkConfig(prev => ({
      ...prev,
      ...newConfig
    }))
  }

  // 检查图片是否已有水印
  const checkWatermark = async (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image()
      const reader = new FileReader()
      
      reader.onload = (e) => {
        img.src = e.target?.result as string
        img.onload = () => {
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')
          if (!ctx) {
            resolve(false)
            return
          }

          canvas.width = img.width
          canvas.height = img.height
          ctx.drawImage(img, 0, 0)

          // 获取图片数据
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
          const data = imageData.data

          // 检查透明度模式
          let hasTransparency = false
          let hasPattern = false
          let patternCount = 0
          const patterns: { [key: string]: number } = {}

          for (let i = 0; i < data.length; i += 4) {
            // 检查透明度
            if (data[i + 3] < 255 && data[i + 3] > 0) {
              hasTransparency = true
            }

            // 检查重复模式
            if (i % (canvas.width * 4 * 20) === 0) { // 每20行采样一次
              const pattern = `${data[i]},${data[i + 1]},${data[i + 2]}`
              patterns[pattern] = (patterns[pattern] || 0) + 1
              if (patterns[pattern] > 10) { // 如果某个颜色模式重复超过10次
                hasPattern = true
              }
              patternCount++
            }
          }

          // 如果发现半透明像素或重复模式，可能存在水印
          resolve(hasTransparency || (hasPattern && patternCount > 100))
        }
      }
      reader.readAsDataURL(file)
    })
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">上传图片</h2>
              <div className="flex items-center space-x-2">
                <div className="px-3 py-1 bg-blue-50 rounded-full">
                  <span className="text-sm text-blue-600 font-medium">
                    剩余次数：<span className="text-blue-700">{Math.max(0, MAX_USAGE_COUNT - usageCount)}</span>/{MAX_USAGE_COUNT}
                  </span>
                </div>
                {images.length > 0 && (
                  <button
                    onClick={handleClearImages}
                    className="text-sm text-red-600 hover:text-red-700 transition-colors"
                  >
                    清空图片
                  </button>
                )}
              </div>
            </div>
            {usageCount >= MAX_USAGE_COUNT && (
              <div className="text-sm text-red-600 bg-red-50 rounded-lg p-3 flex justify-between items-center">
                <span>您的免费使用次数已用完！</span>
                <button
                  onClick={() => setIsContactModalOpen(true)}
                  className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                >
                  联系作者
                </button>
              </div>
            )}
          </div>
          
          <ImageUploader onUpload={handleImagesUpload} />
          
          {images.length > 0 && (
            <div className="border-t border-gray-100 pt-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-gray-700">已上传图片</h3>
                <span className="text-sm text-gray-500">{images.length} 张图片</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {images.map((file, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-video rounded-lg border border-gray-200 overflow-hidden">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      onClick={() => handleDeleteImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    <div className="mt-1 text-xs text-gray-500 truncate">{file.name}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="border-t border-gray-100 pt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">水印设置</h2>
            <WatermarkSettings
              config={watermarkConfig}
              onChange={handleConfigChange}
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">实时预览</h2>
          <div className="relative">
            <ImagePreview
              images={images}
              watermarkConfig={watermarkConfig}
              onDownloadComplete={handleDownloadComplete}
              isPreview={true}
            />
          </div>
        </div>
      </div>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  )
} 