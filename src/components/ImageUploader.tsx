'use client'

import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

interface ImageUploaderProps {
  onUpload: (files: File[]) => void
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onUpload }) => {
  const [isDragging, setIsDragging] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const validFiles = acceptedFiles.filter(file => {
      const isValidType = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.type)
      const isValidSize = file.size <= 20 * 1024 * 1024 // 20MB
      return isValidType && isValidSize
    })

    if (validFiles.length > 0) {
      onUpload(validFiles)
    }
  }, [onUpload])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
      'image/gif': ['.gif']
    },
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false)
  })

  return (
    <div
      {...getRootProps()}
      className={`
        p-8 border-2 border-dashed rounded-lg text-center cursor-pointer
        transition-colors duration-200
        ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
      `}
    >
      <input {...getInputProps()} />
      <div className="space-y-2">
        <p className="text-lg">拖拽图片到此处，或点击上传</p>
        <p className="text-sm text-gray-500">
          支持 JPG、PNG、WebP、GIF 格式
          <br />
          单个文件大小不超过 20MB
        </p>
      </div>
    </div>
  )
} 