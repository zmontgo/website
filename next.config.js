/** @type {import('next').NextConfig} */
const nextConfig = {}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

if (process.env.NODE_ENV === 'production') {
  nextConfig.images = {
    domains: ['zachmontgomery.com'],
  } 

  nextConfig.env = {
    SITE_URL: 'https://zachmontgomery.com',
  }

  module.exports = nextConfig;
} else {
  nextConfig.env = {
    SITE_URL: 'http://localhost:3000',
  }

  module.exports = withBundleAnalyzer(nextConfig);
}
