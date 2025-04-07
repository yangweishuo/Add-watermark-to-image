import React from 'react'
import type { WatermarkSettingsProps } from './WatermarkSettings'

export const WatermarkSettings: React.FC<WatermarkSettingsProps> = ({ config, onChange }) => {
  const handleChange = (key: string, value: any) => {
    onChange({ [key]: value })
  }

  return (
    <div className="space-y-6">
      {/* 水印类型 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">水印类型</label>
        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 rounded-lg ${
              config.type === 'text'
                ? 'bg-blue-100 text-blue-700 border-2 border-blue-200'
                : 'bg-gray-100 text-gray-700 border-2 border-gray-200'
            }`}
            onClick={() => handleChange('type', 'text')}
          >
            文字水印
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              config.type === 'image'
                ? 'bg-blue-100 text-blue-700 border-2 border-blue-200'
                : 'bg-gray-100 text-gray-700 border-2 border-gray-200'
            }`}
            onClick={() => handleChange('type', 'image')}
          >
            图片水印
          </button>
        </div>
      </div>

      {/* 水印文字 */}
      {config.type === 'text' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">水印文字</label>
          <input
            type="text"
            value={config.text}
            onChange={(e) => handleChange('text', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="请输入水印文字"
          />
        </div>
      )}

      {/* 字体大小 */}
      {config.type === 'text' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            字体大小: {config.fontSize}px
          </label>
          <input
            type="range"
            min="12"
            max="72"
            value={config.fontSize}
            onChange={(e) => handleChange('fontSize', parseInt(e.target.value))}
            className="w-full"
          />
        </div>
      )}

      {/* 颜色选择 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">水印颜色</label>
        <input
          type="color"
          value={config.color}
          onChange={(e) => handleChange('color', e.target.value)}
          className="w-12 h-12 p-1 rounded border border-gray-300"
        />
      </div>

      {/* 透明度 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          透明度: {Math.round(config.opacity * 100)}%
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={config.opacity * 100}
          onChange={(e) => handleChange('opacity', parseInt(e.target.value) / 100)}
          className="w-full"
        />
      </div>

      {/* 旋转角度 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          旋转角度: {config.rotation}°
        </label>
        <input
          type="range"
          min="-180"
          max="180"
          value={config.rotation}
          onChange={(e) => handleChange('rotation', parseInt(e.target.value))}
          className="w-full"
        />
      </div>

      {/* 平铺设置 */}
      <div>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={config.isTiled}
            onChange={(e) => handleChange('isTiled', e.target.checked)}
            className="h-4 w-4 text-blue-600 rounded border-gray-300"
          />
          <label className="ml-2 text-sm font-medium text-gray-700">启用平铺水印</label>
        </div>
        
        {config.isTiled && (
          <div className="space-y-4 pl-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                平铺间距: {config.tileGap}px
              </label>
              <input
                type="range"
                min="50"
                max="300"
                value={config.tileGap}
                onChange={(e) => handleChange('tileGap', parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                缩放比例: {config.tileScale}x
              </label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={config.tileScale}
                onChange={(e) => handleChange('tileScale', parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        )}
      </div>

      {/* 防伪设置 */}
      <div>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={config.enableSecurity}
            onChange={(e) => handleChange('enableSecurity', e.target.checked)}
            className="h-4 w-4 text-blue-600 rounded border-gray-300"
          />
          <label className="ml-2 text-sm font-medium text-gray-700">启用防伪码</label>
        </div>
        
        {config.enableSecurity && (
          <div className="space-y-4 pl-6">
            <input
              type="text"
              value={config.securityCode}
              onChange={(e) => handleChange('securityCode', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="请输入防伪码"
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={config.enableHiddenCode}
                onChange={(e) => handleChange('enableHiddenCode', e.target.checked)}
                className="h-4 w-4 text-blue-600 rounded border-gray-300"
              />
              <label className="ml-2 text-sm font-medium text-gray-700">添加隐藏防伪码</label>
            </div>
            {config.enableHiddenCode && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  隐藏码透明度: {Math.round(config.hiddenCodeOpacity * 100)}%
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={config.hiddenCodeOpacity * 100}
                  onChange={(e) => handleChange('hiddenCodeOpacity', parseInt(e.target.value) / 100)}
                  className="w-full"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
} 