import type { NextConfig } from 'next';

const SEVEN_DAYS_SECONDS = 60 * 60 * 24 * 7; // 604800 seconds (7 days)
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365; // 31536000 seconds (1 year)

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  experimental: {
    inlineCss: true,
    optimizePackageImports: ['lucide-react'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: ONE_YEAR_SECONDS,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(logo\\.png|favicon\\.ico)',
        headers: [
          {
            key: 'Cache-Control',
            value: `public, max-age=${ONE_YEAR_SECONDS}, s-maxage=${ONE_YEAR_SECONDS}, immutable`,
          },
        ],
      },
      {
        source: '/((?!_next/|api/|logo\\.png|favicon\\.ico).*)',
        headers: [
          {
            key: 'Cache-Control',
            value: `public, max-age=${SEVEN_DAYS_SECONDS}, s-maxage=${SEVEN_DAYS_SECONDS}, stale-while-revalidate=86400`,
          },
        ],
      },
    ];
  },
  output: 'standalone',
  webpack: (config, { dev }) => {
    // HMR is disabled in AI Studio via DISABLE_HMR env var.
    // Do not modify—file watching is disabled to prevent flickering during agent edits.
    if (dev && process.env.DISABLE_HMR === 'true') {
      config.watchOptions = {
        ignored: /.*/,
      };
    }
    return config;
  },
};

export default nextConfig;
