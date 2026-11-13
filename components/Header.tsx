'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Printer } from 'lucide-react';

export function Header() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <header className="no-print border-b border-stone-200/90 bg-[#FAF8F5]/95">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-4 py-3.5 sm:px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 font-serif text-lg font-semibold tracking-tight text-[#1C1917] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C2410C] rounded-sm"
        >
          <Image
            src="/logo.png"
            alt="Sourdough Hydration logo"
            width={32}
            height={32}
            referrerPolicy="no-referrer"
            className="h-8 w-8 rounded-md object-contain shrink-0"
          />
          <span>Sourdough Hydration</span>
        </Link>

        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600"
        >
          <Link
            href="/#calculator"
            className="hover:text-[#1C1917] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Calculator
          </Link>
          <Link
            href="/#hydration-chart"
            className="hover:text-[#1C1917] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Hydration Chart
          </Link>
          <Link
            href="/#formula-guide"
            className="hover:text-[#1C1917] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Formula Guide
          </Link>
          <Link
            href="/#faq"
            className="hover:text-[#1C1917] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            FAQ
          </Link>
        </nav>

        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-stone-300 bg-white px-4 text-xs font-semibold text-[#1C1917] transition-colors hover:bg-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C2410C] whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Printer className="h-3.5 w-3.5 text-stone-600" aria-hidden="true" />
            <span>Print Sheet</span>
          </button>
        </div>
      </div>
    </header>
  );
}
