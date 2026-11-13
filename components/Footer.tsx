import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="no-print border-t border-stone-200 bg-[#FAF8F5]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 text-xs text-stone-600 md:flex-row md:items-center md:justify-between sm:px-6">
        <div className="space-y-2 max-w-md">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 font-serif text-sm font-semibold text-[#1C1917] whitespace-nowrap"
          >
            <Image
              src="/logo.png"
              alt="Sourdough Hydration Calculator logo"
              width={28}
              height={28}
              referrerPolicy="no-referrer"
              className="h-7 w-7 rounded-md object-contain shrink-0"
            />
            <span>Sourdough Hydration Calculator</span>
          </Link>
          <p className="leading-relaxed text-stone-500">
            All baker&apos;s percentage and hydration calculations run 100% locally in
            your browser—no recipe data is ever uploaded or stored.
          </p>
        </div>

        <nav
          aria-label="Footer navigation"
          className="flex flex-wrap items-center gap-x-6 gap-y-2.5 shrink-0"
        >
          <Link
            href="/about"
            className="font-medium text-stone-600 hover:text-[#1C1917] hover:underline underline-offset-4 whitespace-nowrap"
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className="font-medium text-stone-600 hover:text-[#1C1917] hover:underline underline-offset-4 whitespace-nowrap"
          >
            Contact
          </Link>
          <Link
            href="/privacy-policy"
            className="font-medium text-stone-600 hover:text-[#1C1917] hover:underline underline-offset-4 whitespace-nowrap"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="font-medium text-stone-600 hover:text-[#1C1917] hover:underline underline-offset-4 whitespace-nowrap"
          >
            Terms
          </Link>
          <Link
            href="/disclaimer"
            className="font-medium text-stone-600 hover:text-[#1C1917] hover:underline underline-offset-4 whitespace-nowrap"
          >
            Disclaimer
          </Link>
        </nav>
      </div>
    </footer>
  );
}
