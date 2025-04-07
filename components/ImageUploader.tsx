import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

interface ImageUploaderProps {
  onImagesUpload: (files: File[]) => void
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImagesUpload }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onImagesUpload(acceptedFiles)
  }, [onImagesUpload])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/gif': ['.gif'],
      'image/webp': ['.webp']
    },
    maxSize: 50 * 1024 * 1024, // 50MB
    multiple: true
  })

  return (
    <div
      {...getRootProps()}
      className={`
        border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors duration-200
        ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-500 hover:bg-gray-50'}
      `}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center space-y-4">
        <svg
          className={`w-12 h-12 ${isDragActive ? 'text-blue-500' : 'text-gray-400'}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <div className="space-y-1">
          <p className="text-base font-medium text-gray-700">
            {isDragActive ? '松开鼠标上传图片' : '拖拽图片到此处或点击上传'}
          </p>
          <p className="text-sm text-gray-500">
            支持 JPG、PNG、GIF、WebP 格式，单个文件最大 50MB
          </p>
        </div>
      </div>
    </div>
  )
} 