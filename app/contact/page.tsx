import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ContactForm } from '@/components/ContactForm';

export const dynamic = 'force-static';
export const revalidate = 604800;

export const metadata: Metadata = {
  title: 'Contact Us – Sourdough Hydration Calculator',
  description:
    'Contact Sourdough Hydration Calculator for feedback, bug reports, preset requests, or questions about baker percentage calculations.',
  alternates: {
    canonical: 'https://sourdoughhydrationcalculator.online/contact',
  },
};

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-600 hover:text-[#C2410C] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Back to Calculator</span>
        </Link>

        <div className="mt-6 mb-8 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-stone-500">
            Contact
          </p>
          <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-[#1C1917] sm:text-4xl [text-wrap:balance]">
            Contact Sourdough Hydration Calculator
          </h1>
          <p className="mt-2.5 text-sm leading-relaxed text-stone-600 sm:text-base">
            Questions about baker&apos;s percentages, feature suggestions, or bug reports?
            We&apos;d love to hear from you.
          </p>
        </div>

        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
