/** @type {import('next').NextConfig} */
const nextConfig = {
  // 静态导出：构建产物输出到 out/ 目录，
  // 部署到 Cloudflare Workers 静态资源（或任何静态文件服务器）
  output: 'export',
  images: {
    // 静态导出没有 Next.js 图片优化服务，必须关闭
    unoptimized: true,
  },
}

module.exports = nextConfig
