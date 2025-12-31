/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.builder.io'],
  },
  async rewrites() {
    // Handle case where NEXT_PUBLIC_API_URL might be undefined
    const API_BASE = process.env.NEXT_PUBLIC_API_URL && 
                     process.env.NEXT_PUBLIC_API_URL !== 'undefined'
      ? process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, '') // remove trailing slash
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
