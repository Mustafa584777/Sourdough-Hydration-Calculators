import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Terms of Use – Sourdough Hydration Calculator',
  description:
    'Terms of Use for sourdoughhydrationcalculator.online governing access to our free sourdough hydration calculator, recipe presets, and printable formula tools.',
  alternates: {
    canonical: 'https://sourdoughhydrationcalculator.online/terms',
  },
};

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-600 hover:text-[#C2410C] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Back to Calculator</span>
        </Link>

        <article className="mt-6 rounded-2xl border border-stone-200/90 bg-white p-6 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-stone-500">
            Legal · Last Updated November 2026
          </p>
          <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-[#1C1917] sm:text-4xl [text-wrap:balance]">
            Terms of Use
          </h1>
          <p className="mt-3 text-base leading-relaxed text-stone-600">
            By accessing or using{' '}
            <span className="font-medium text-[#1C1917]">
              sourdoughhydrationcalculator.online
            </span>
            , you agree to the following Terms of Use.
          </p>

          <div className="my-8 border-t border-stone-200/80" />

          <div className="space-y-6 text-sm leading-relaxed text-stone-700 sm:text-base">
            <section className="space-y-2">
              <h2 className="font-serif text-xl font-semibold text-[#1C1917]">
                1. Permitted Use
              </h2>
              <p>
                Sourdough Hydration Calculator is provided free of charge for personal,
                educational, and commercial bakery recipe planning. You are welcome to
                export, print, and share your calculated recipe cards for personal
                notes, culinary classes, or social communities.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-xl font-semibold text-[#1C1917]">
                2. Intellectual Property
              </h2>
              <p>
                The design, source code, editorial guides, and layout of{' '}
                <span className="font-medium text-[#1C1917]">
                  sourdoughhydrationcalculator.online
                </span>{' '}
                belong to the site operators. You may not scrape, mirror, or
                redistribute the application as a competing standalone service without
                prior permission. Recipes and formulas you enter or generate remain
                entirely yours.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-xl font-semibold text-[#1C1917]">
                3. Service Availability &amp; &ldquo;As-Is&rdquo; Basis
              </h2>
              <p>
                We strive to keep the calculator fast, accurate, and available 24/7, but
                the service is provided on an &ldquo;as-is&rdquo; and
                &ldquo;as-available&rdquo; basis without warranties of uninterrupted
                uptime or suitability for any specific commercial production guarantee.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-xl font-semibold text-[#1C1917]">
                4. Limitation of Liability
              </h2>
              <p>
                To the fullest extent permitted by law, we are not liable for any
                indirect, incidental, or baking-outcome damages resulting from your use
                of the calculator or reliance on its estimates. Please also review our{' '}
                <Link
                  href="/disclaimer"
                  className="font-semibold text-[#C2410C] underline-offset-4 hover:underline"
                >
                  Disclaimer
                </Link>
                .
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
