import { FC } from 'react'
import type { WatermarkConfig } from './WatermarkSettings.d'

export interface ImagePreviewProps {
  images: File[]
  watermarkConfig: WatermarkConfig
  onProcessedImagesChange: (processedImages: string[]) => void
}

export declare const ImagePreview: FC<ImagePreviewProps> 