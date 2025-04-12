'use client'

import { WatermarkToolFree } from '../components/WatermarkToolFree'

export default function Home() {
  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            图片水印工具
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            轻松为您的图片添加自定义水印
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <WatermarkToolFree />
        </div>
      </div>
    </main>
  )
} 