import React, { useEffect, useRef, useState } from 'react'
import type { WatermarkConfig } from './WatermarkSettings'

interface ImagePreviewProps {
  images: File[]
  watermarkConfig: WatermarkConfig
  onProcessedImagesChange: (images: string[]) => void
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  images,
  watermarkConfig,
  onProcessedImagesChange
}) => {
  const [previews, setPreviews] = useState<string[]>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const loadImages = async () => {
      const imageUrls = await Promise.all(
        images.map((file) => URL.createObjectURL(file))
      )
      setPreviews(imageUrls)
    }

    loadImages()

    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [images])

  useEffect(() => {
    const applyWatermark = async () => {
      if (!canvasRef.current || previews.length === 0) return

      const processedImages: string[] = []
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      for (const previewUrl of previews) {
        const img = new Image()
        img.src = previewUrl
        await new Promise((resolve) => {
          img.onload = resolve
        })

        // 设置画布大小
        canvas.width = img.width
        canvas.height = img.height

        // 绘制原图
        ctx.drawImage(img, 0, 0)

        // 应用水印
        if (watermarkConfig.type === 'text') {
          ctx.save()
          
          // 设置字体
          ctx.font = `${watermarkConfig.fontSize}px Arial`
          ctx.fillStyle = watermarkConfig.color
          ctx.globalAlpha = watermarkConfig.opacity
          
          if (watermarkConfig.isTiled) {
            // 平铺水印
            const text = watermarkConfig.text
            const textWidth = ctx.measureText(text).width
            const textHeight = watermarkConfig.fontSize
            const gap = watermarkConfig.tileGap
            const scale = watermarkConfig.tileScale

            for (let y = 0; y < canvas.height; y += (textHeight + gap) * scale) {
              for (let x = 0; x < canvas.width; x += (textWidth + gap) * scale) {
                ctx.save()
                ctx.translate(x + textWidth / 2, y + textHeight / 2)
                ctx.rotate((watermarkConfig.rotation * Math.PI) / 180)
                ctx.scale(scale, scale)
                ctx.fillText(text, -textWidth / 2, -textHeight / 2)
                ctx.restore()
              }
            }
          } else {
            // 单个水印
            const { x, y } = watermarkConfig.position
            ctx.translate(x, y)
            ctx.rotate((watermarkConfig.rotation * Math.PI) / 180)
            ctx.fillText(watermarkConfig.text, 0, 0)
          }

          // 添加防伪码
          if (watermarkConfig.enableSecurity && watermarkConfig.securityCode) {
            ctx.font = '12px Arial'
            ctx.fillStyle = watermarkConfig.color
            ctx.globalAlpha = watermarkConfig.opacity
            ctx.fillText(watermarkConfig.securityCode, 10, canvas.height - 10)

            // 添加隐藏防伪码
            if (watermarkConfig.enableHiddenCode) {
              ctx.globalAlpha = watermarkConfig.hiddenCodeOpacity
              for (let y = 0; y < canvas.height; y += 100) {
                for (let x = 0; x < canvas.width; x += 200) {
                  ctx.fillText(watermarkConfig.securityCode, x, y)
                }
              }
            }
          }

          ctx.restore()
        }

        processedImages.push(canvas.toDataURL('image/jpeg', 0.9))
      }

      onProcessedImagesChange(processedImages)
    }

    applyWatermark()
  }, [previews, watermarkConfig, onProcessedImagesChange])

  return (
    <div className="space-y-4">
      <canvas ref={canvasRef} className="hidden" />
      <div className="grid grid-cols-1 gap-4">
        {previews.map((preview, index) => (
          <div
            key={preview}
            className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden"
          >
            <img
              src={preview}
              alt={`预览图 ${index + 1}`}
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  )
} 