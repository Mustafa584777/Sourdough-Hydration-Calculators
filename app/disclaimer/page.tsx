import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Disclaimer – Sourdough Hydration Calculator',
  description:
    'Baking and informational disclaimer for sourdoughhydrationcalculator.online regarding flour absorption, ambient humidity, starter strength, and baker percentages.',
  alternates: {
    canonical: 'https://sourdoughhydrationcalculator.online/disclaimer',
  },
};

export default function DisclaimerPage() {
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
            Legal · Informational Notice
          </p>
          <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-[#1C1917] sm:text-4xl [text-wrap:balance]">
            Disclaimer
          </h1>
          <p className="mt-3 text-base leading-relaxed text-stone-600">
            Important culinary and technical context for interpreting results from{' '}
            <span className="font-medium text-[#1C1917]">
              sourdoughhydrationcalculator.online
            </span>
            .
          </p>

          <div className="my-8 border-t border-stone-200/80" />

          <div className="space-y-6 text-sm leading-relaxed text-stone-700 sm:text-base">
            <section className="space-y-2">
              <h2 className="font-serif text-xl font-semibold text-[#1C1917]">
                1. Mathematical Accuracy vs. Real-World Baking Variables
              </h2>
              <p>
                Our calculator performs exact baker&apos;s percentage arithmetic based on
                the ingredient weights and starter hydration percentage you provide.
                However, real-world dough behavior varies significantly based on:
              </p>
              <ul className="list-disc space-y-1.5 pl-5">
                <li>
                  <strong>Flour Protein &amp; Extraction:</strong> High-protein bread
                  flours, freshly milled whole grains, rye, and heritage wheats absorb
                  different amounts of water at the exact same hydration percentage.
                </li>
                <li>
                  <strong>Kitchen Temperature &amp; Humidity:</strong> Warm environments
                  accelerate fermentation and protease activity, making dough feel more
                  extensible or slack over time.
                </li>
                <li>
                  <strong>Starter Age &amp; Acidity:</strong> An overly acidic or past-peak
                  levain weakens gluten faster than a young, sweet, active levain.
                </li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-xl font-semibold text-[#1C1917]">
                2. Informational &amp; Educational Purpose
              </h2>
              <p>
                All dough handling guides, hydration charts, and starter explanations on
                this site are provided for general educational and culinary reference.
                Always use your hands, visual cues, and a digital kitchen scale when
                adjusting water during mixing (for example, holding back 5–10% water for
                bassinage when testing an unfamiliar flour).
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-xl font-semibold text-[#1C1917]">
                3. Food Safety &amp; Allergens
              </h2>
              <p>
                Nothing on this website constitutes nutritional, dietary, or medical
                advice. Users are responsible for verifying flour ingredients, allergens
                (such as wheat, rye, spelt, or gluten), and safe baking temperatures for
                their own kitchen or customers.
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
