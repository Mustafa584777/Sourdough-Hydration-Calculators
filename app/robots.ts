import type { MetadataRoute } from 'next';

const SITE_URL = 'https://sourdoughhydrationcalculator.online';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/data/',
          '/admin/',
          '/private/',
          '/cgi-bin/',
          '/*?*',
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
