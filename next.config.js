/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "blesklab.ru",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
  // Оптимизация бандла
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  // Разделение кода
  modularizeImports: {
    "@fortawesome/fontawesome-free": {
      transform: "@fortawesome/fontawesome-free/lib/icons/{member}",
    },
  },
};

module.exports = nextConfig;
