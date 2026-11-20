import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const fraunces = localFont({
  src: './fonts/fraunces.woff2',
  variable: '--font-fraunces',
  display: 'swap',
  preload: false,
  weight: '600 700',
  adjustFontFallback: 'Times New Roman',
  fallback: ['Georgia', 'serif'],
});

const plusJakartaSans = localFont({
  src: './fonts/plus-jakarta-sans.woff2',
  variable: '--font-plus-jakarta',
  display: 'swap',
  preload: true,
  weight: '400 700',
  adjustFontFallback: 'Arial',
  fallback: ['system-ui', 'sans-serif'],
});

const jetbrainsMono = localFont({
  src: './fonts/jetbrains-mono.woff2',
  variable: '--font-jetbrains-mono',
  display: 'swap',
  preload: false,
  weight: '500 600',
  adjustFontFallback: false,
  fallback: ['ui-monospace', 'monospace'],
});

const SITE_URL = 'https://sourdoughhydrationcalculator.online';
const PAGE_TITLE = "Sourdough Hydration Calculator – True Baker's Percentage Tool";
const PAGE_DESCRIPTION =
  "Free Sourdough Hydration Calculator online with starter math. Calculate true dough hydration, baker's percentages, and scale loaves in grams or ounces.";

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
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());(function(){var l=false;function loadGTM(){if(l)return;l=true;window.dataLayer.push({'gtm.start':Date.now(),event:'gtm.js'});var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtm.js?id=GTM-T5K3FG6K';document.head.appendChild(s);}['pointerdown','keydown','scroll','touchstart','mousemove'].forEach(function(e){window.addEventListener(e,loadGTM,{once:true,passive:true});});window.addEventListener('load',function(){setTimeout(loadGTM,10000);});})();`,
          }}
        />
      </head>
      <body className="min-h-screen bg-[#FAF8F5] text-[#1C1917] antialiased selection:bg-[#C2410C]/15 selection:text-[#9A3412]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
