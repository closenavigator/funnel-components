/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  poweredByHeader: false,
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
  // Improve static optimization
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@radix-ui/react-icons', 'lucide-react'],
  },
  // Handle any redirects/rewrites if needed
  async redirects() {
    return []
  },
  // Optimize images
  images: {
    domains: ['*'],
    unoptimized: process.env.NODE_ENV !== 'production',
  },
}

module.exports = nextConfig 