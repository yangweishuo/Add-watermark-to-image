import '../styles/globals.css'

export const metadata = {
  title: '图片水印工具',
  description: '轻松为您的图片添加自定义水印',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" className="h-full">
      <body className="h-full bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="min-h-full">
          {children}
        </div>
      </body>
    </html>
  )
} 