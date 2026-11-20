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
  return (
    <div className="divide-y divide-stone-200 border-y border-stone-200">
      {items.map((item, idx) => (
        <details key={item.question} className="group py-1" open={idx === 0}>
          <summary className="flex min-h-[52px] w-full list-none items-center justify-between gap-4 py-3.5 text-left text-base font-semibold text-[#1C1917] transition-colors hover:text-[#C2410C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C2410C] cursor-pointer [&::-webkit-details-marker]:hidden">
            <h3>{renderFaqQuestion(item.question)}</h3>
            <ChevronDown
              className="h-5 w-5 shrink-0 text-stone-500 transition-transform duration-200 group-open:rotate-180 group-open:text-[#C2410C]"
              aria-hidden="true"
            />
          </summary>
          <div className="pb-4 pr-8 text-sm leading-relaxed text-stone-600 sm:text-base">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}
