'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQItem } from '@/lib/editorial-data';

interface FaqAccordionProps {
  items: FAQItem[];
}

function renderFaqQuestion(question: string) {
  const target = 'best sourdough calculator';
  const idx = question.toLowerCase().indexOf(target);
  if (idx === -1) return question;
  const before = question.slice(0, idx);
  const match = question.slice(idx, idx + target.length).toLowerCase();
  const after = question.slice(idx + target.length);
  return (
    <>
      {before}
      <strong className="font-bold text-[#1C1917]">{match}</strong>
      {after}
    </>
  );
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
                <span>{renderFaqQuestion(item.question)}</span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-stone-500 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-[#C2410C]' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div
              id={`faq-panel-${idx}`}
              role="region"
              aria-labelledby={`faq-trigger-${idx}`}
              hidden={!isOpen}
              className={
                isOpen
                  ? 'pb-4 pr-8 text-sm leading-relaxed text-stone-600 sm:text-base'
                  : 'hidden'
              }
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
