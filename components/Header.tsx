'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, Printer, X } from 'lucide-react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  return (
    <header className="no-print border-b border-stone-200/90 bg-[#FAF8F5]/95">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3.5 sm:gap-8 sm:px-6">
        <Link
          href="/"
          className="inline-flex min-w-0 items-center gap-2.5 font-serif text-base font-semibold tracking-tight text-[#1C1917] sm:text-lg whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C2410C] rounded-sm"
        >
          <Image
            src="/logo.png"
            alt="Sourdough Hydration logo"
            width={32}
            height={32}
            priority
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

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-stone-300 bg-white px-3 text-xs font-semibold text-[#1C1917] transition-colors hover:bg-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C2410C] sm:px-4 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Printer className="h-3.5 w-3.5 text-stone-600" aria-hidden="true" />
            <span className="hidden xs:inline sm:inline">Print Sheet</span>
            <span className="xs:hidden sm:hidden">Print</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-stone-300 bg-white text-[#1C1917] transition-colors hover:bg-stone-100 md:hidden cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Menu className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav
          aria-label="Mobile navigation"
          className="border-t border-stone-200/80 bg-white px-4 py-3 md:hidden"
        >
          <div className="grid grid-cols-2 gap-2">
            <Link
              href="/#calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="flex h-11 items-center rounded-lg px-3 text-sm font-medium text-[#1C1917] hover:bg-stone-100"
            >
              Calculator
            </Link>
            <Link
              href="/#hydration-chart"
              onClick={() => setMobileMenuOpen(false)}
              className="flex h-11 items-center rounded-lg px-3 text-sm font-medium text-[#1C1917] hover:bg-stone-100"
            >
              Hydration Chart
            </Link>
            <Link
              href="/#formula-guide"
              onClick={() => setMobileMenuOpen(false)}
              className="flex h-11 items-center rounded-lg px-3 text-sm font-medium text-[#1C1917] hover:bg-stone-100"
            >
              Formula Guide
            </Link>
            <Link
              href="/#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="flex h-11 items-center rounded-lg px-3 text-sm font-medium text-[#1C1917] hover:bg-stone-100"
            >
              FAQ
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
