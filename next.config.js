/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

const withVercelToolbar = require('@vercel/toolbar/plugins/next')()
module.exports = withVercelToolbar(nextConfig) 