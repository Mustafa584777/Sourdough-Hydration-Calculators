import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center mx-auto w-full max-w-4xl px-4 py-20 text-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-stone-500">404 Error</p>
          <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-[#1C1917] sm:text-4xl">
            Page Not Found
          </h1>
          <p className="mt-3 text-base text-stone-600">
            The sourdough recipe or page you are looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="mt-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl bg-[#C2410C] px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#9A3412] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Calculator</span>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
