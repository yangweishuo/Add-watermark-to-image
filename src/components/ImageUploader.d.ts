import { FC } from 'react'

export interface ImageUploaderProps {
  onImagesUpload: (files: File[]) => void
}

export declare const ImageUploader: FC<ImageUploaderProps> 