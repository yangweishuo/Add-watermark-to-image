/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  distDir: 'dist',
  output: 'export',
  assetPrefix: './',
  basePath: '',
  cleanDistDir: true
}

module.exports = nextConfig 