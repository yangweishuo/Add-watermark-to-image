import { WatermarkTool } from '@/components/WatermarkTool'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            图片水印工具
          </h1>
          <p className="mt-4 text-gray-600 text-lg">
            简单高效的图片水印添加工具，支持文字和图片水印
          </p>
        </div>
        <WatermarkTool />
      </div>
    </main>
  )
} 