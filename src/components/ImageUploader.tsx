import React from 'react'
import { useDropzone } from 'react-dropzone'
import { ImageUploaderProps } from '../types/types'

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onUpload }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp']
    },
    maxSize: 5242880, // 5MB
    onDrop: (acceptedFiles) => {
      onUpload(acceptedFiles)
    }
  })

  return (
    <div
      {...getRootProps()}
      className={`p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-all duration-200 ease-in-out
        ${
          isDragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
        }`}
    >
      <input {...getInputProps()} className="hidden" />
      <div className="space-y-4">
        <svg
          className={`w-16 h-16 mx-auto transition-colors duration-200 ${
            isDragActive ? 'text-blue-500' : 'text-gray-400'
          }`}
          stroke="currentColor"
          fill="none"
          viewBox="0 0 48 48"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
          />
        </svg>
        <div className={`transition-colors duration-200 ${isDragActive ? 'text-blue-500' : 'text-gray-600'}`}>
          {isDragActive ? (
            <p className="text-lg font-medium">将图片拖放到此处</p>
          ) : (
            <>
              <p className="text-lg font-medium">点击上传或将图片拖放到此处</p>
              <p className="mt-2 text-sm text-gray-500">支持 PNG、JPG、GIF、WebP 格式，最大 5MB</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
} 