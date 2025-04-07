/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export', // 静态导出
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig 