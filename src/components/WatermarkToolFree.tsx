'use client'

import React, { useState, useEffect } from 'react'
import { ImageUploader } from './ImageUploader'
import { WatermarkSettings } from './WatermarkSettings'
import { ImagePreview } from './ImagePreview'
import type { WatermarkConfig } from '@/types'

export const WatermarkToolFree: React.FC = () => {
  const [images, setImages] = useState<File[]>([])
  const [processedImages, setProcessedImages] = useState<string[]>([])
  const [watermarkConfig, setWatermarkConfig] = useState<WatermarkConfig>({
    text: '水印文字',
    fontSize: 24,
    color: '#000000',
    opacity: 0.5,
    position: 'center',
    angle: 0,
    tiled: false,
    tileGap: 100,
    tileScale: 1,
    type: 'text',
    enable3D: false,
    depth: 5,
    lightAngle: 45,
    highlightColor: '#ffffff',
    shadowColor: '#000000',
    securityCode: '',
    securityCodeSize: 'medium',
    securityFont: 'Arial',
    securityCodePosition: 'corners',
    enableHiddenCode: false,
    hiddenCodeOpacity: 0.1,
    imageScale: 0.2,
    imageOpacity: 0.5,
    imagePosition: 'center',
    imageRotation: 0,
    patternType: 'circle',
    patternColor: '#000000',
    patternSize: 20,
    patternOpacity: 0.5,
    patternRotation: 0,
    patternSpacing: 50,
    customPattern: ''
  })

  const handleImagesUpload = (files: File[]) => {
    setImages(files)
  }

  const handleConfigChange = (newConfig: Partial<WatermarkConfig>) => {
    setWatermarkConfig(prev => ({
      ...prev,
      ...newConfig
    }))
  }

  const handleProcessedImagesChange = (images: string[]) => {
    setProcessedImages(images)
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <ImageUploader onUpload={handleImagesUpload} />
          
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
              onDownloadComplete={handleProcessedImagesChange}
              isPreview={true}
            />
          </div>
        </div>
      </div>
    </div>
  )
} 