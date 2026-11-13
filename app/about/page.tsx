import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const dynamic = 'force-static';
export const revalidate = 604800;

export const metadata: Metadata = {
  title: 'About Us – Sourdough Hydration Calculator',
  description:
    'Learn how Sourdough Hydration Calculator helps home bakers and artisan bakeries calculate true dough hydration, levain splits, and baker percentages.',
  alternates: {
    canonical: 'https://sourdoughhydrationcalculator.online/about',
  },
};

export default function AboutPage() {
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
            About Us
          </p>
          <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-[#1C1917] sm:text-4xl [text-wrap:balance]">
            Precision Baker&apos;s Math Without the Clutter
          </h1>
          <p className="mt-3 text-base leading-relaxed text-stone-600">
            Built for home bakers, cottage bakeries, and fermentation enthusiasts at{' '}
            <span className="font-medium text-[#1C1917]">
              sourdoughhydrationcalculator.online
            </span>
            .
          </p>

          <div className="my-8 border-t border-stone-200/80" />

          <div className="space-y-6 text-sm leading-relaxed text-stone-700 sm:text-base">
            <section className="space-y-2.5">
              <h2 className="font-serif text-xl font-semibold text-[#1C1917]">
                Why We Built This Tool
              </h2>
              <p>
                Most online bread calculators treat sourdough starter as a footnote—or
                ignore it completely. Yet a 20% inoculation of 100% liquid starter or a
                50% stiff pasta madre significantly shifts the real water-to-flour ratio
                in your mixing bowl.
              </p>
              <p>
                We created Sourdough Hydration Calculator to give bakers an instant,
                distraction-free workspace that separates starter flour and starter water
                automatically, handles multi-flour blends, converts seamlessly between
                grams and ounces, and lets you work backwards from a target hydration.
              </p>
            </section>

            <section className="space-y-2.5">
              <h2 className="font-serif text-xl font-semibold text-[#1C1917]">
                Our Design Principles
              </h2>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  <strong>Zero Friction:</strong> No accounts, no paywalls, and no
                  Calculate button—every percentage and weight updates on each keystroke.
                </li>
                <li>
                  <strong>Local-First Privacy:</strong> All math, unit conversions, and
                  PNG recipe card generation run directly in your browser.
                </li>
                <li>
                  <strong>Built for the Bench:</strong> Clean print sheets, copyable
                  Reddit/notes summaries, and mobile-ready controls you can use with
                  flour-dusted hands.
                </li>
              </ul>
            </section>

            <section className="space-y-2.5">
              <h2 className="font-serif text-xl font-semibold text-[#1C1917]">
                Get in Touch
              </h2>
              <p>
                Have an idea for a new preset or flour-hydration feature? Visit our{' '}
                <Link
                  href="/contact"
                  className="font-semibold text-[#C2410C] underline-offset-4 hover:underline"
                >
                  Contact page
                </Link>{' '}
                to send feedback.
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
