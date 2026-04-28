import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  env: {
    NEXT_PUBLIC_API_URL: "http://localhost:3000",
  },
  async rewrites() {
    return [
      // HOME assets
      {
        source: '/home/_next/:path*',
        destination: 'http://localhost:3002/_next/:path*',
      },

      // HOME páginas
      {
        source: '/home/:path*',
        destination: 'http://localhost:3002/:path*',
      },

      // EXTRATO assets
      {
        source: '/extrato/_next/:path*',
        destination: 'http://localhost:3003/_next/:path*',
      },

      // EXTRATO páginas
      {
        source: '/extrato/:path*',
        destination: 'http://localhost:3003/:path*',
      },
    ];
  },
};

export default nextConfig;
