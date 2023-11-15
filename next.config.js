/** @type {import('next').NextConfig} */
const nextConfig = {}

if (process.env.NODE_ENV === 'development') {
  const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
  })
  
  nextConfig.env = {
    SITE_URL: 'http://localhost:3000',
  }

  module.exports = withBundleAnalyzer(nextConfig);
} else {
  nextConfig.images = {
    // domains: ['zachmontgomery.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'zmont.dev',
      }
    ]
  } 

  nextConfig.env = {
    SITE_URL: 'https://zmont.dev',
  }

  nextConfig.experimental = {
    serverActions: {
      allowedOrigins: [
        'zmont.dev',
        'localhost:3000'
      ]
    }
  }

  module.exports = nextConfig;
}
