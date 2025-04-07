// 水印配置类型
export type WatermarkType = 'text' | 'image' | 'security' | 'pattern'

export interface WatermarkConfig {
  // 基本属性
  text: string
  fontSize: number
  color: string
  opacity: number
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center'
  angle: number
  
  // 平铺相关
  tiled: boolean
  tileGap: number
  tileScale: number
  
  // 类型
  type: WatermarkType
  
  // 3D文字效果
  enable3D: boolean
  depth: number
  lightAngle: number
  highlightColor: string
  shadowColor: string
  
  // 防伪相关
  securityCode: string
  securityCodeSize: 'small' | 'medium' | 'large'
  securityFont: string
  securityCodePosition: 'corners' | 'center' | 'random'
  enableHiddenCode: boolean
  hiddenCodeOpacity: number

  // 图片水印相关
  imageFile?: File
  imageScale: number
  imageOpacity: number
  imagePosition: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center'
  imageRotation: number

  // 图案水印相关
  patternType: 'circle' | 'square' | 'triangle' | 'star' | 'custom'
  patternColor: string
  patternSize: number
  patternOpacity: number
  patternRotation: number
  patternSpacing: number
  customPattern?: string // SVG 路径
} 