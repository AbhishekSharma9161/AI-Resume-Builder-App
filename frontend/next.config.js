/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  // Removed swcMinify as it's no longer needed in Next.js 15+
  images: {
    domains: ['cdn.builder.io'],
  },
  // Fix workspace root inference issue
  outputFileTracingRoot: path.join(__dirname, '../'),
  // Enable build caching
  output: 'standalone',
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    return [
      {
        source: '/api/:path*',
        destination: `${apiUrl}/api/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
