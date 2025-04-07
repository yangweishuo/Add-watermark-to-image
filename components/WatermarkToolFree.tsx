'use client'

import React, { useState, useCallback } from 'react'
import { ImageUploader } from './ImageUploader'
import { WatermarkSettings } from './WatermarkSettings'
import { ImagePreview } from './ImagePreview'
import type { WatermarkConfig } from './WatermarkSettings'

export const WatermarkToolFree: React.FC = () => {
  // 上传的图片
  const [uploadedImages, setUploadedImages] = useState<File[]>([])
  
  // 处理后的图片
  const [processedImages, setProcessedImages] = useState<string[]>([])

  // 水印配置
  const [watermarkConfig, setWatermarkConfig] = useState<WatermarkConfig>({
    type: 'text',
    text: '示例水印',
    fontSize: 24,
    color: '#000000',
    opacity: 0.3,
    rotation: -30,
    isTiled: true,
    tileGap: 100,
    tileScale: 1,
    enableSecurity: false,
    securityCode: '',
    enableHiddenCode: false,
    hiddenCodeOpacity: 0.05,
    position: { x: 50, y: 50 }
  })

  // 处理图片上传
  const handleImagesUpload = useCallback((files: File[]) => {
    setUploadedImages(files)
  }, [])

  // 处理水印配置更新
  const handleWatermarkConfigChange = useCallback((updates: Partial<WatermarkConfig>) => {
    setWatermarkConfig(prev => ({ ...prev, ...updates }))
  }, [])

  // 处理处理后的图片变化
  const handleProcessedImagesChange = useCallback((images: string[]) => {
    setProcessedImages(images)
  }, [])

  // 下载处理后的图片
  const handleDownload = useCallback(() => {
    processedImages.forEach((dataUrl, index) => {
      const link = document.createElement('a')
      link.href = dataUrl
      link.download = `watermarked_${index + 1}.jpg`
      link.click()
    })
  }, [processedImages])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-12">
        {/* 标题区域 */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            专业水印工具
            <span className="ml-3 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              免费版
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            简单易用的在线水印工具，支持文字水印和图片水印，让您的作品更有专业范
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 左侧操作区域 */}
          <div className="space-y-8">
            {/* 上传区域 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">上传图片</h2>
                <p className="text-gray-500 mb-6">支持 JPG、PNG、WebP 格式，单个文件最大 20MB</p>
                <ImageUploader onImagesUpload={handleImagesUpload} />
              </div>
            </div>

            {/* 水印设置区域 */}
            {uploadedImages.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">水印设置</h2>
                  <p className="text-gray-500 mb-6">自定义水印样式，实时预览效果</p>
                  <WatermarkSettings
                    config={watermarkConfig}
                    onChange={handleWatermarkConfigChange}
                  />
                </div>
              </div>
            )}
          </div>

          {/* 右侧预览区域 */}
          {uploadedImages.length > 0 && (
            <div className="lg:sticky lg:top-8 space-y-8">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">实时预览</h2>
                  <p className="text-gray-500 mb-6">查看水印效果，满意后下载图片</p>
                  <ImagePreview
                    images={uploadedImages}
                    watermarkConfig={watermarkConfig}
                    onProcessedImagesChange={handleProcessedImagesChange}
                  />
                </div>
              </div>

              {/* 下载按钮 */}
              {processedImages.length > 0 && (
                <button
                  onClick={handleDownload}
                  className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-xl shadow-sm transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>下载处理后的图片</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* 功能介绍 */}
        {!uploadedImages.length && (
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">批量处理</h3>
              <p className="text-gray-600">支持多张图片同时添加水印，提高工作效率</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">自定义样式</h3>
              <p className="text-gray-600">灵活调整水印的大小、位置、透明度等属性</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">防伪保护</h3>
              <p className="text-gray-600">支持添加防伪码和隐藏水印，保护您的作品</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 