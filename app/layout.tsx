import type { Metadata, Viewport } from 'next';
import { Fraunces, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  weight: ['600', '700'],
  adjustFontFallback: true,
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  adjustFontFallback: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  weight: ['500', '600'],
  adjustFontFallback: true,
});

const SITE_URL = 'https://sourdoughhydrationcalculator.online';
const PAGE_TITLE = "Sourdough Hydration Calculator Online – True Baker's Percentage Tool";
const PAGE_DESCRIPTION =
  "Free online sourdough hydration calculator with starter & levain math. Calculate true dough hydration, baker's percentages, flour blends, and scale recipes in grams or ounces.";

export const revalidate = 604800;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 0.6,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    'sourdough hydration calculator',
    'baker percentage calculator',
    'sourdough starter hydration',
    'levain math calculator',
    'bread dough hydration',
    'true sourdough hydration',
    'recipe scaler sourdough',
  ],
  alternates: {
    canonical: './',
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: SITE_URL,
    siteName: 'Sourdough Hydration Calculator',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          async
          defer
          fetchPriority="low"
          src="https://www.googletagmanager.com/gtm.js?id=GTM-T5K3FG6K"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());`,
          }}
        />
      </head>
      <body className="min-h-screen bg-[#FAF8F5] text-[#1C1917] antialiased selection:bg-[#C2410C]/15 selection:text-[#9A3412]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
