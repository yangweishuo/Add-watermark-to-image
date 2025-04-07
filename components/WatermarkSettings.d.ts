export interface WatermarkConfig {
  type: 'text' | 'image'
  text: string
  fontSize: number
  color: string
  opacity: number
  rotation: number
  isTiled: boolean
  tileGap: number
  tileScale: number
  enableSecurity: boolean
  securityCode: string
  enableHiddenCode: boolean
  hiddenCodeOpacity: number
  position: {
    x: number
    y: number
  }
}

export interface WatermarkSettingsProps {
  config: WatermarkConfig
  onChange: (updates: Partial<WatermarkConfig>) => void
} 