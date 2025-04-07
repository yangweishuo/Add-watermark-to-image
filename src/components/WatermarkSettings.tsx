'use client'

import React from 'react'
import type { WatermarkConfig } from '@/types'

interface WatermarkSettingsProps {
  config: WatermarkConfig
  onChange: (config: Partial<WatermarkConfig>) => void
}

export const WatermarkSettings: React.FC<WatermarkSettingsProps> = ({
  config,
  onChange,
}) => {
  const handleTextChange = (text: string) => {
    onChange({ ...config, text })
  }

  const handleFontSizeChange = (fontSize: number) => {
    onChange({ ...config, fontSize })
  }

  const handleColorChange = (color: string) => {
    onChange({ ...config, color })
  }

  const handleOpacityChange = (opacity: number) => {
    onChange({ ...config, opacity })
  }

  const handlePositionChange = (position: WatermarkConfig['position']) => {
    onChange({ ...config, position })
  }

  const handleAngleChange = (angle: number) => {
    onChange({ ...config, angle })
  }

  const handleTiledChange = (tiled: boolean) => {
    onChange({ ...config, tiled })
  }

  const handleSecurityCodeChange = (securityCode: string) => {
    onChange({ ...config, securityCode })
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onChange({ imageFile: file })
    }
  }

  const generateRandomCode = () => {
    // 生成8位随机防伪码，包含数字和字母
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let code = ''
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    onChange({ securityCode: code })
  }

  const drawPattern = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate((config.patternRotation * Math.PI) / 180)

    switch (config.patternType) {
      case 'circle':
        ctx.beginPath()
        ctx.arc(0, 0, size / 2, 0, Math.PI * 2)
        ctx.fill()
        break
      case 'square':
        ctx.fillRect(-size / 2, -size / 2, size, size)
        break
      case 'triangle':
        ctx.beginPath()
        ctx.moveTo(0, -size / 2)
        ctx.lineTo(size / 2, size / 2)
        ctx.lineTo(-size / 2, size / 2)
        ctx.closePath()
        ctx.fill()
        break
      case 'star':
        ctx.beginPath()
        for (let i = 0; i < 5; i++) {
          const angle = (i * 4 * Math.PI) / 5
          const radius = i % 2 === 0 ? size / 2 : size / 4
          const x = Math.cos(angle) * radius
          const y = Math.sin(angle) * radius
          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.closePath()
        ctx.fill()
        break
      case 'custom':
        if (config.customPattern) {
          const path = new Path2D(config.customPattern)
          ctx.fill(path)
        }
        break
    }

    ctx.restore()
  }

  return (
    <div className="space-y-6">
      {/* 水印类型选择 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          水印类型
        </label>
        <select
          value={config.type}
          onChange={(e) => onChange({ ...config, type: e.target.value as WatermarkConfig['type'] })}
          className="w-full rounded-md border border-gray-300 px-3 py-2"
        >
          <option value="text">文字水印</option>
          <option value="image">图片水印</option>
          <option value="pattern">图案水印</option>
          <option value="security">防伪水印</option>
        </select>
      </div>

      {/* 文字水印设置 */}
      {config.type === 'text' && (
        <>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">水印文字</label>
            <input
              type="text"
              value={config.text}
              onChange={(e) => handleTextChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">字体大小</label>
            <input
              type="number"
              value={config.fontSize}
              onChange={(e) => handleFontSizeChange(parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">颜色</label>
            <input
              type="color"
              value={config.color}
              onChange={(e) => handleColorChange(e.target.value)}
              className="w-full h-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={config.enable3D}
                onChange={(e) => onChange({ enable3D: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">启用3D效果</span>
            </label>
          </div>
          {config.enable3D && (
            <>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">3D深度</label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="1"
                  value={config.depth}
                  onChange={(e) => onChange({ depth: parseInt(e.target.value) })}
                  className="w-full"
                />
                <div className="text-sm text-gray-500">{config.depth}px</div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">光源角度</label>
                <input
                  type="range"
                  min="0"
                  max="360"
                  step="1"
                  value={config.lightAngle}
                  onChange={(e) => onChange({ lightAngle: parseInt(e.target.value) })}
                  className="w-full"
                />
                <div className="text-sm text-gray-500">{config.lightAngle}°</div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">高光颜色</label>
                <input
                  type="color"
                  value={config.highlightColor}
                  onChange={(e) => onChange({ highlightColor: e.target.value })}
                  className="w-full h-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">阴影颜色</label>
                <input
                  type="color"
                  value={config.shadowColor}
                  onChange={(e) => onChange({ shadowColor: e.target.value })}
                  className="w-full h-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </>
          )}
        </>
      )}

      {/* 图片水印设置 */}
      {config.type === 'image' && (
        <>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">水印图片</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">缩放比例</label>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.1"
              value={config.imageScale}
              onChange={(e) => onChange({ imageScale: parseFloat(e.target.value) })}
              className="w-full"
            />
            <div className="text-sm text-gray-500">{Math.round(config.imageScale * 100)}%</div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">透明度</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={config.imageOpacity}
              onChange={(e) => onChange({ imageOpacity: parseFloat(e.target.value) })}
              className="w-full"
            />
            <div className="text-sm text-gray-500">{Math.round(config.imageOpacity * 100)}%</div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">旋转角度</label>
            <input
              type="range"
              min="0"
              max="360"
              step="1"
              value={config.imageRotation}
              onChange={(e) => onChange({ imageRotation: parseInt(e.target.value) })}
              className="w-full"
            />
            <div className="text-sm text-gray-500">{config.imageRotation}°</div>
          </div>
        </>
      )}

      {/* 图案水印设置 */}
      {config.type === 'pattern' && (
        <>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">图案类型</label>
            <select
              value={config.patternType}
              onChange={(e) => onChange({ patternType: e.target.value as 'circle' | 'square' | 'triangle' | 'star' | 'custom' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="circle">圆形</option>
              <option value="square">方形</option>
              <option value="triangle">三角形</option>
              <option value="star">星形</option>
              <option value="custom">自定义</option>
            </select>
          </div>
          {config.patternType === 'custom' && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">SVG 路径</label>
              <input
                type="text"
                value={config.customPattern}
                onChange={(e) => onChange({ customPattern: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="请输入 SVG 路径"
              />
            </div>
          )}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">颜色</label>
            <input
              type="color"
              value={config.patternColor}
              onChange={(e) => onChange({ patternColor: e.target.value })}
              className="w-full h-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">大小</label>
            <input
              type="range"
              min="10"
              max="100"
              step="1"
              value={config.patternSize}
              onChange={(e) => onChange({ patternSize: parseInt(e.target.value) })}
              className="w-full"
            />
            <div className="text-sm text-gray-500">{config.patternSize}px</div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">透明度</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={config.patternOpacity}
              onChange={(e) => onChange({ patternOpacity: parseFloat(e.target.value) })}
              className="w-full"
            />
            <div className="text-sm text-gray-500">{Math.round(config.patternOpacity * 100)}%</div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">旋转角度</label>
            <input
              type="range"
              min="0"
              max="360"
              step="1"
              value={config.patternRotation}
              onChange={(e) => onChange({ patternRotation: parseInt(e.target.value) })}
              className="w-full"
            />
            <div className="text-sm text-gray-500">{config.patternRotation}°</div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">间距</label>
            <input
              type="range"
              min="20"
              max="200"
              step="10"
              value={config.patternSpacing}
              onChange={(e) => onChange({ patternSpacing: parseInt(e.target.value) })}
              className="w-full"
            />
            <div className="text-sm text-gray-500">{config.patternSpacing}px</div>
          </div>
        </>
      )}

      {/* 通用设置 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          透明度
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={config.opacity * 100}
          onChange={(e) => handleOpacityChange(Number(e.target.value) / 100)}
          className="w-full"
        />
        <div className="text-sm text-gray-500 mt-1">{Math.round(config.opacity * 100)}%</div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          旋转角度
        </label>
        <input
          type="range"
          min="-180"
          max="180"
          value={config.angle}
          onChange={(e) => handleAngleChange(Number(e.target.value))}
          className="w-full"
        />
        <div className="text-sm text-gray-500 mt-1">{config.angle}°</div>
      </div>

      {/* 平铺设置 */}
      <div className="space-y-2">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={config.tiled}
            onChange={(e) => handleTiledChange(e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-gray-700">启用平铺</span>
        </label>
      </div>

      {config.tiled && (
        <>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">平铺间距</label>
            <input
              type="number"
              value={config.tileGap}
              onChange={(e) => onChange({ tileGap: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">平铺缩放</label>
            <input
              type="number"
              min="0.1"
              max="1"
              step="0.1"
              value={config.tileScale}
              onChange={(e) => onChange({ tileScale: parseFloat(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </>
      )}

      {/* 防伪水印设置 */}
      {config.type === 'security' && (
        <>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">防伪码</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={config.securityCode}
                onChange={(e) => handleSecurityCodeChange(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="请输入防伪码"
              />
              <button
                onClick={generateRandomCode}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                随机生成
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">字体大小</label>
            <select
              value={config.securityCodeSize}
              onChange={(e) => onChange({ securityCodeSize: e.target.value as 'small' | 'medium' | 'large' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="small">小</option>
              <option value="medium">中</option>
              <option value="large">大</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">位置</label>
            <select
              value={config.securityCodePosition}
              onChange={(e) => onChange({ securityCodePosition: e.target.value as 'corners' | 'center' | 'random' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="corners">四角</option>
              <option value="center">中心</option>
              <option value="random">随机</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={config.enableHiddenCode}
                onChange={(e) => onChange({ enableHiddenCode: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">启用隐藏防伪码</span>
            </label>
          </div>
          {config.enableHiddenCode && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">隐藏防伪码透明度</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={config.hiddenCodeOpacity}
                onChange={(e) => onChange({ hiddenCodeOpacity: parseFloat(e.target.value) })}
                className="w-full"
              />
              <div className="text-sm text-gray-500">{Math.round(config.hiddenCodeOpacity * 100)}%</div>
            </div>
          )}
        </>
      )}

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">位置</label>
        <select
          value={config.position}
          onChange={(e) => handlePositionChange(e.target.value as 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="top-left">左上</option>
          <option value="top-right">右上</option>
          <option value="bottom-left">左下</option>
          <option value="bottom-right">右下</option>
          <option value="center">中心</option>
        </select>
      </div>
    </div>
  )
} 