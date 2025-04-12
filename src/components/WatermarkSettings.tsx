import React, { useState } from 'react'
import { WatermarkSettingsProps, WatermarkConfig, WatermarkPosition, SecurityCodePosition } from '../types/types'

// 水印设置组件
const WatermarkSettings: React.FC<WatermarkSettingsProps> = ({ config, onChange, usageCount, maxUsageCount }) => {
  // 处理配置参数改变的函数
  const handleChange = (key: keyof WatermarkConfig, value: any) => {
    if (onChange) {
      onChange({ ...config, [key]: value })
    }
  }

  // 添加随机安全码到水印文字中
  const addSecurityCode = () => {
    // 生成随机6位数字和字母的安全码
    const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    handleChange('text', `${config.text || ''}${randomCode}`);
  }

  // 渲染组件UI
  return (
    <div className="space-y-6 p-4 bg-white rounded-lg shadow">
      <div className="border-b pb-4">
        <h3 className="text-lg font-medium text-gray-900">文字水印</h3>
        <div className="mt-4 space-y-4">
          <div>
            <label htmlFor="text" className="block text-sm font-medium text-gray-700">
              水印文字
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="text"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                value={config.text || ''}
                onChange={(e) => handleChange('text', e.target.value)}
                placeholder="输入水印文字"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="fontSize" className="block text-sm font-medium text-gray-700">
              字体大小
            </label>
            <div className="mt-1">
              <input
                type="range"
                id="fontSize"
                min="10"
                max="100"
                className="w-full"
                value={config.fontSize}
                onChange={(e) => handleChange('fontSize', parseInt(e.target.value))}
              />
              <div className="text-sm text-gray-500 mt-1">{config.fontSize}px</div>
            </div>
          </div>
          
          <div>
            <label htmlFor="color" className="block text-sm font-medium text-gray-700">
              颜色
            </label>
            <div className="mt-1 flex items-center">
              <input
                type="color"
                id="color"
                className="h-8 w-8 rounded-md border border-gray-300"
                value={config.color}
                onChange={(e) => handleChange('color', e.target.value)}
              />
              <input 
                type="text"
                className="ml-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md"
                value={config.color}
                onChange={(e) => handleChange('color', e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="opacity" className="block text-sm font-medium text-gray-700">
              透明度
            </label>
            <div className="mt-1">
              <input
                type="range"
                id="opacity"
                min="1"
                max="100"
                className="w-full"
                value={config.opacity}
                onChange={(e) => handleChange('opacity', parseInt(e.target.value))}
              />
              <div className="text-sm text-gray-500 mt-1">{config.opacity}%</div>
            </div>
          </div>
          
          <div>
            <label htmlFor="position" className="block text-sm font-medium text-gray-700">
              位置
            </label>
            <div className="mt-1">
              <select
                id="position"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                value={config.position}
                onChange={(e) => handleChange('position', e.target.value as WatermarkPosition)}
              >
                <option value="center">居中</option>
                <option value="top-left">左上角</option>
                <option value="top-right">右上角</option>
                <option value="bottom-left">左下角</option>
                <option value="bottom-right">右下角</option>
              </select>
            </div>
          </div>
          
          <div>
            <label htmlFor="rotation" className="block text-sm font-medium text-gray-700">
              旋转角度
            </label>
            <div className="mt-1">
              <input
                type="range"
                id="rotation"
                min="0"
                max="360"
                className="w-full"
                value={config.rotation}
                onChange={(e) => handleChange('rotation', parseInt(e.target.value))}
              />
              <div className="text-sm text-gray-500 mt-1">{config.rotation}°</div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <label htmlFor="tiled" className="block text-sm font-medium text-gray-700">
              平铺水印
            </label>
            <div className="mt-1">
              <input
                type="checkbox"
                id="tiled"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                checked={config.tiled}
                onChange={(e) => handleChange('tiled', e.target.checked)}
              />
            </div>
          </div>
          
          {config.tiled && (
            <div>
              <label htmlFor="spacing" className="block text-sm font-medium text-gray-700">
                间距
              </label>
              <div className="mt-1">
                <input
                  type="range"
                  id="spacing"
                  min="50"
                  max="400"
                  className="w-full"
                  value={config.spacing}
                  onChange={(e) => handleChange('spacing', parseInt(e.target.value))}
                />
                <div className="text-sm text-gray-500 mt-1">{config.spacing}px</div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-gray-900">防伪水印</h3>
        <div className="mt-4 space-y-4">
          <div>
            <button
              type="button"
              onClick={addSecurityCode}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={typeof usageCount === 'number' && typeof maxUsageCount === 'number' && usageCount >= maxUsageCount}
            >
              添加随机防伪码
              {typeof usageCount === 'number' && typeof maxUsageCount === 'number' && (
                <span className="ml-2 text-xs">
                  ({usageCount}/{maxUsageCount})
                </span>
              )}
            </button>
          </div>
          
          <div>
            <label htmlFor="securityCodeSize" className="block text-sm font-medium text-gray-700">
              防伪码大小
            </label>
            <div className="mt-1">
              <input
                type="range"
                id="securityCodeSize"
                min="10"
                max="100"
                className="w-full"
                value={config.securityCodeSize}
                onChange={(e) => handleChange('securityCodeSize', parseInt(e.target.value))}
              />
              <div className="text-sm text-gray-500 mt-1">{config.securityCodeSize}px</div>
            </div>
          </div>
          
          <div>
            <label htmlFor="securityCodePosition" className="block text-sm font-medium text-gray-700">
              防伪码位置
            </label>
            <div className="mt-1">
              <select
                id="securityCodePosition"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                value={config.securityCodePosition}
                onChange={(e) => handleChange('securityCodePosition', e.target.value as SecurityCodePosition)}
              >
                <option value="tiled">平铺</option>
                <option value="diagonal">对角线</option>
                <option value="border">边框</option>
              </select>
            </div>
          </div>
          
          <div>
            <label htmlFor="securityFont" className="block text-sm font-medium text-gray-700">
              防伪字体
            </label>
            <div className="mt-1">
              <select
                id="securityFont"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                value={config.securityFont || 'Arial'}
                onChange={(e) => handleChange('securityFont', e.target.value)}
              >
                <option value="Arial">Arial</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Courier New">Courier New</option>
                <option value="Georgia">Georgia</option>
                <option value="Verdana">Verdana</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 使用次数显示 */}
      {typeof usageCount === 'number' && typeof maxUsageCount === 'number' && usageCount >= 0 && maxUsageCount > 0 && (
        <div className="usage-count">
          剩余使用次数: {maxUsageCount - usageCount} / {maxUsageCount}
        </div>
      )}
    </div>
  )
}

export default WatermarkSettings