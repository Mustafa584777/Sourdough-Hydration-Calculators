import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy – Sourdough Hydration Calculator',
  description:
    'Privacy Policy for sourdoughhydrationcalculator.online. Learn how all sourdough calculations run locally in your browser without collecting personal recipe data.',
  alternates: {
    canonical: 'https://sourdoughhydrationcalculator.online/privacy-policy',
  },
};

export default function PrivacyPolicyPage() {
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
            Privacy Policy
          </h1>
          <p className="mt-3 text-base leading-relaxed text-stone-600">
            Your privacy matters. This Privacy Policy explains how{' '}
            <span className="font-medium text-[#1C1917]">
              sourdoughhydrationcalculator.online
            </span>{' '}
            handles information when you use our calculator.
          </p>

          <div className="my-8 border-t border-stone-200/80" />

          <div className="space-y-6 text-sm leading-relaxed text-stone-700 sm:text-base">
            <section className="space-y-2">
              <h2 className="font-serif text-xl font-semibold text-[#1C1917]">
                1. Local Browser Calculations (No Recipe Collection)
              </h2>
              <p>
                Every calculation—including flour blends, water weights, starter
                hydration splits, batch scaling, and PNG recipe card rendering—is
                executed 100% locally inside your web browser. We do not transmit, log,
                or store your recipes or custom ingredient inputs on any server.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-xl font-semibold text-[#1C1917]">
                2. Personal Information &amp; Accounts
              </h2>
              <p>
                Our calculator does not require registration, login, or payment. If you
                choose to email us via our{' '}
                <Link
                  href="/contact"
                  className="font-semibold text-[#C2410C] underline-offset-4 hover:underline"
                >
                  Contact page
                </Link>
                , we only use your email address and message content to respond to your
                inquiry.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-xl font-semibold text-[#1C1917]">
                3. Hosting &amp; Standard Server Logs
              </h2>
              <p>
                Like most websites hosted on modern cloud infrastructure (such as Vercel),
                our hosting provider may automatically process standard, non-identifying
                HTTP request metadata (such as browser user-agent, requested URL, and
                aggregated traffic metrics) to keep the service fast, secure, and
                reliable.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-xl font-semibold text-[#1C1917]">
                4. Third-Party Links &amp; Updates
              </h2>
              <p>
                We may update this Privacy Policy periodically to reflect improvements
                to the site. Any changes will appear on this page with an updated
                revision date. If you have questions, please reach out through our{' '}
                <Link
                  href="/contact"
                  className="font-semibold text-[#C2410C] underline-offset-4 hover:underline"
                >
                  Contact page
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
