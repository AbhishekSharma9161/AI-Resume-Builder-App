/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.builder.io'],
  },
  // Add this to prevent build errors:
  output: 'standalone',  // ← Add this for Render deployment
  async rewrites() {
    const API_BASE = process.env.NEXT_PUBLIC_API_URL && 
                     process.env.NEXT_PUBLIC_API_URL !== 'undefined'
      ? process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, '')
      : '';

    return [
      {
        source: '/api/:path*',
        destination: API_BASE ? `${API_BASE}/api/:path*` : '/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;