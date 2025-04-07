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

  return (
    <div className="space-y-4">
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
          <option value="security">防伪水印</option>
        </select>
      </div>

      {/* 文字水印设置 */}
      {config.type === 'text' && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              水印文字
            </label>
            <input
              type="text"
              value={config.text}
              onChange={(e) => handleTextChange(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2"
              placeholder="请输入水印文字"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              字体大小
            </label>
            <input
              type="range"
              min="12"
              max="72"
              value={config.fontSize}
              onChange={(e) => handleFontSizeChange(Number(e.target.value))}
              className="w-full"
            />
            <div className="text-sm text-gray-500 mt-1">{config.fontSize}px</div>
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
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={config.tiled}
          onChange={(e) => handleTiledChange(e.target.checked)}
          className="rounded border-gray-300 text-blue-600 mr-2"
        />
        <label className="text-sm font-medium text-gray-700">
          平铺水印
        </label>
      </div>

      {/* 防伪水印设置 */}
      {config.type === 'security' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            防伪码
          </label>
          <input
            type="text"
            value={config.securityCode}
            onChange={(e) => handleSecurityCodeChange(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2"
            placeholder="请输入防伪码"
          />
        </div>
      )}
    </div>
  )
} 