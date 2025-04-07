// 水印配置类型
export interface WatermarkConfig {
  // 基本属性
  text: string
  fontSize: number
  color: string
  opacity: number
  position: 'topLeft' | 'topCenter' | 'topRight' | 'centerLeft' | 'center' | 'centerRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight'
  angle: number
  
  // 平铺相关
  tiled: boolean
  tileGap?: number
  tileScale?: number
  
  // 防伪相关
  securityCode?: string
  securityCodeSize?: 'small' | 'medium' | 'large'
  securityFont?: string
  securityCodePosition?: 'corners' | 'center' | 'tiled'
  enableHiddenCode?: boolean
  hiddenCodeOpacity?: number
  
  // 类型
  type: 'text' | 'security'
} 