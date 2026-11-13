import type { NextConfig } from 'next';

const SEVEN_DAYS_SECONDS = 60 * 60 * 24 * 7; // 604800 seconds (7 days)

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
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: SEVEN_DAYS_SECONDS,
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
        source: '/((?!_next/|api/).*)',
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
  transpilePackages: ['motion'],
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
