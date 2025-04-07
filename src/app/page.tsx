import { WatermarkTool } from '@/components/WatermarkTool'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">图片水印工具</h1>
          <p className="mt-2 text-gray-600">支持批量处理、多种水印样式、防伪水印等功能</p>
        </div>
        <WatermarkTool />
      </div>
    </main>
  )
} 