'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQItem } from '@/lib/sourdough-math';

interface FaqAccordionProps {
  items: FAQItem[];
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-stone-200 border-y border-stone-200">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={item.question} className="py-1">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${idx}`}
                id={`faq-trigger-${idx}`}
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="flex min-h-[52px] w-full items-center justify-between gap-4 py-3.5 text-left text-base font-semibold text-[#1C1917] transition-colors hover:text-[#C2410C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C2410C] cursor-pointer"
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-stone-500 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-[#C2410C]' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>
            </h3>
            {isOpen && (
              <div
                id={`faq-panel-${idx}`}
                role="region"
                aria-labelledby={`faq-trigger-${idx}`}
                className="pb-4 pr-8 text-sm leading-relaxed text-stone-600 sm:text-base"
              >
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
