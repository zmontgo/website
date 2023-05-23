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
    domains: ['zachmontgomery.com'],
  } 

  nextConfig.env = {
    SITE_URL: 'https://zachmontgomery.com',
  }

  module.exports = nextConfig;
}
