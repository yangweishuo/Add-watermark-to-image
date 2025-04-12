export type WatermarkPosition = 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export type SecurityCodePosition = 'tiled' | 'diagonal' | 'border';

export interface WatermarkConfig {
  text: string;
  fontSize: number;
  color: string;
  opacity: number;
  position: WatermarkPosition;
  rotation: number;
  tiled: boolean;
  spacing: number;
  imageUrl: string;
  size: number;
  securityFont: string;
  securityCode?: boolean;
  securityCodeSize?: number;
  securityCodePosition?: SecurityCodePosition;
}

export interface ImagePreviewProps {
  images: File[];
  config: WatermarkConfig;
  onDownload: (dataUrl: string) => void;
  onDeleteImage: (index: number) => void;
}

export interface WatermarkSettingsProps {
  config: WatermarkConfig;
  onChange: (config: Partial<WatermarkConfig>) => void;
  usageCount?: number;
  maxUsageCount?: number;
}

export interface ImageUploaderProps {
  onUpload: (files: File[]) => void;
} 