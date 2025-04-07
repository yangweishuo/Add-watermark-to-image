'use client'

import React, { useEffect, useRef, useState } from 'react'
import type { WatermarkConfig } from '@/types'

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
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const [watermarkedUrls, setWatermarkedUrls] = useState<string[]>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const urls = images.map(file => URL.createObjectURL(file))
    setPreviewUrls(urls)
    return () => {
      urls.forEach(URL.revokeObjectURL)
    }
  }, [images])

  useEffect(() => {
    const updateWatermarks = async () => {
      if (images.length === 0) return
      const newWatermarkedUrls = await Promise.all(
        previewUrls.map(url => applyWatermark(url))
      )
      setWatermarkedUrls(newWatermarkedUrls.filter((url): url is string => url !== undefined))
    }
    updateWatermarks()
  }, [previewUrls, watermarkConfig])

  const drawSecurityWatermark = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const {
      securityCode = '',
      securityFont = 'Arial',
      color = '#000000',
      fontSize = 24,
      opacity = 0.5,
      securityCodePosition = 'corners',
      securityCodeSize = 'medium',
      angle = 0
    } = watermarkConfig
    
    if (!securityCode) return

    const actualFontSize = getSecurityCodeFontSize(securityCodeSize, fontSize)
    ctx.font = `${actualFontSize}px ${securityFont}, monospace`
    ctx.fillStyle = color
    ctx.globalAlpha = opacity

    const padding = actualFontSize

    if (securityCodePosition === 'corners') {
      // 在四个角绘制防伪码
      const corners = [
        { x: padding, y: padding + actualFontSize }, // 左上
        { x: canvas.width - padding, y: padding + actualFontSize }, // 右上
        { x: padding, y: canvas.height - padding }, // 左下
        { x: canvas.width - padding, y: canvas.height - padding } // 右下
      ]

      corners.forEach(({ x, y }) => {
        ctx.save()
        ctx.translate(x, y)
        ctx.rotate((angle * Math.PI) / 180)
        ctx.fillText(securityCode, 0, 0)
        ctx.restore()
      })
    } else if (securityCodePosition === 'center') {
      // 在中心绘制防伪码
      ctx.save()
      ctx.translate(canvas.width / 2, canvas.height / 2)
      ctx.rotate((angle * Math.PI) / 180)
      const textMetrics = ctx.measureText(securityCode)
      ctx.fillText(securityCode, -textMetrics.width / 2, 0)
      ctx.restore()
    } else if (securityCodePosition === 'tiled') {
      // 平铺防伪码
      const textMetrics = ctx.measureText(securityCode)
      const codeWidth = textMetrics.width
      const codeHeight = actualFontSize
      const gap = Math.max(codeWidth, codeHeight) * 2

      for (let y = 0; y < canvas.height; y += gap) {
        for (let x = 0; x < canvas.width; x += gap) {
          ctx.save()
          ctx.translate(x + codeWidth / 2, y + codeHeight / 2)
          ctx.rotate((angle * Math.PI) / 180)
          ctx.fillText(securityCode, -codeWidth / 2, 0)
          ctx.restore()
        }
      }
    }

    // 如果启用隐藏水印，添加半透明的数字水印
    if (watermarkConfig.enableHiddenCode) {
      ctx.save()
      ctx.globalAlpha = watermarkConfig.hiddenCodeOpacity || 0.1
      ctx.font = `${actualFontSize * 2}px ${securityFont}, monospace`
      
      const step = actualFontSize * 3
      for (let x = -canvas.width; x < canvas.width * 2; x += step) {
        for (let y = -canvas.height; y < canvas.height * 2; y += step) {
          ctx.save()
          ctx.translate(x, y)
          ctx.rotate((45 * Math.PI) / 180)
          ctx.fillText(securityCode, 0, 0)
          ctx.restore()
        }
      }
      ctx.restore()
    }
  }

  const drawTiledWatermark = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const { 
      tileGap = 100, 
      tileScale = 1, 
      fontSize = 24, 
      text = '', 
      color = '#000000',
      angle = 0
    } = watermarkConfig
    
    const scaledFontSize = fontSize * tileScale
    ctx.font = `${scaledFontSize}px Arial`
    ctx.fillStyle = color
    
    // 计算单个水印的尺寸
    const textMetrics = ctx.measureText(text)
    const watermarkWidth = textMetrics.width
    const watermarkHeight = scaledFontSize

    // 计算需要绘制的行数和列数
    const cols = Math.ceil(canvas.width / (watermarkWidth + tileGap)) + 1
    const rows = Math.ceil(canvas.height / (watermarkHeight + tileGap)) + 1

    // 计算起始偏移，使水印在画布中居中
    const startX = -tileGap / 2
    const startY = -tileGap / 2

    // 绘制水印网格
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = startX + col * (watermarkWidth + tileGap)
        const y = startY + row * (watermarkHeight + tileGap) + watermarkHeight

        ctx.save()
        ctx.translate(x, y)
        ctx.rotate((angle * Math.PI) / 180)
        ctx.fillText(text, 0, 0)
        ctx.restore()
      }
    }
  }

  const applyWatermark = async (imageUrl: string) => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 加载原始图片
    const img = new Image()
    img.src = imageUrl
    await new Promise(resolve => {
      img.onload = resolve
    })

    // 设置画布尺寸
    canvas.width = img.width
    canvas.height = img.height

    // 绘制原始图片
    ctx.drawImage(img, 0, 0)

    // 应用水印
    ctx.save()
    ctx.globalAlpha = watermarkConfig.opacity

    if (watermarkConfig.type === 'text') {
      if (watermarkConfig.tiled) {
        // 绘制平铺水印
        drawTiledWatermark(ctx, canvas)
      } else {
        // 绘制单个水印
        const { text, fontSize, color, position, angle } = watermarkConfig
        
        // 计算位置
        let x = 0, y = 0
        switch (position) {
          case 'topLeft':
            x = fontSize; y = fontSize
            break
          case 'topCenter':
            x = canvas.width / 2; y = fontSize
            break
          case 'topRight':
            x = canvas.width - fontSize; y = fontSize
            break
          case 'centerLeft':
            x = fontSize; y = canvas.height / 2
            break
          case 'center':
            x = canvas.width / 2; y = canvas.height / 2
            break
          case 'centerRight':
            x = canvas.width - fontSize; y = canvas.height / 2
            break
          case 'bottomLeft':
            x = fontSize; y = canvas.height - fontSize
            break
          case 'bottomCenter':
            x = canvas.width / 2; y = canvas.height - fontSize
            break
          case 'bottomRight':
            x = canvas.width - fontSize; y = canvas.height - fontSize
            break
        }
        
        ctx.translate(x, y)
        ctx.rotate((angle * Math.PI) / 180)
        ctx.font = `${fontSize}px Arial`
        ctx.fillStyle = color
        
        // 计算文字宽度以实现居中
        const textMetrics = ctx.measureText(text)
        ctx.fillText(text, -textMetrics.width / 2, 0)
      }
    } else if (watermarkConfig.type === 'security') {
      drawSecurityWatermark(ctx, canvas)
    }

    ctx.restore()

    return canvas.toDataURL('image/png')
  }

  const handleDownload = async (imageUrl: string, index: number) => {
    const watermarkedImageUrl = await applyWatermark(imageUrl)
    if (!watermarkedImageUrl) return

    const link = document.createElement('a')
    link.href = watermarkedImageUrl
    link.download = `watermarked_${index + 1}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    onDownloadComplete?.([watermarkedImageUrl])
  }

  return (
    <div className="space-y-4">
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      
      <div className="grid grid-cols-1 gap-6">
        {previewUrls.map((url, index) => (
          <div key={url} className="space-y-4">
            {isPreview ? (
              <div className="relative rounded-xl overflow-hidden bg-white shadow-sm border border-gray-100">
                <img
                  src={watermarkedUrls[index] || url}
                  alt={`Preview ${index + 1}`}
                  className="w-full"
                />
                <div className="absolute top-4 right-4">
                  <button
                    className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white/100 transition-all text-sm font-medium text-gray-700 flex items-center gap-2"
                    onClick={() => handleDownload(url, index)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    下载
                  </button>
                </div>
              </div>
            ) : (
              <div className="relative group rounded-xl overflow-hidden bg-white shadow-sm border border-gray-100">
                <img
                  src={url}
                  alt={`Preview ${index + 1}`}
                  className="w-full"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 bg-black/50">
                  <button
                    className="px-6 py-3 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors text-gray-700 font-medium flex items-center gap-2"
                    onClick={() => handleDownload(url, index)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    下载水印图片
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {previewUrls.length === 0 && (
        <div className="p-12 text-center text-gray-500 border-2 border-dashed rounded-xl bg-gray-50/50">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-lg font-medium">请上传图片以预览水印效果</p>
          <p className="mt-2 text-sm text-gray-400">支持 JPG、PNG 格式图片</p>
        </div>
      )}
    </div>
  )
} 