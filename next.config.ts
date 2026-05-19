import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['blesklab.ru', 'localhost'],
    formats: ['image/avif', 'image/webp'],
  },
  output: 'standalone',
  outputFileTracingRoot: process.cwd(),
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Оптимизация CSS
  optimizeFonts: true,
  // Уменьшаем размер CSS
  swcMinify: true,
  // Разделяем CSS для критического пути
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;