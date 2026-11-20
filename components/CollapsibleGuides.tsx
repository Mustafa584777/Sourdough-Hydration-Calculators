'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { BakingGuideItem, GuideTextSegment } from '@/lib/baking-guides-data';

interface CollapsibleGuidesProps {
  items: BakingGuideItem[];
}

function renderSegments(segments: GuideTextSegment[]) {
  return segments.map((seg, i) => {
    if (seg.boldKeyword) {
      return (
        <strong key={i} className="font-semibold text-[#1C1917]">
          {seg.text}
        </strong>
      );
    }
    if (seg.strong) {
      return (
        <strong key={i} className="font-semibold text-[#1C1917]">
          {seg.text}
        </strong>
      );
    }
    return <span key={i}>{seg.text}</span>;
  });
}

export function CollapsibleGuides({ items }: CollapsibleGuidesProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-stone-200 rounded-2xl border border-stone-200 bg-white">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <article key={item.id} id={item.id} className="px-4 py-1 sm:px-6">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`guide-panel-${item.id}`}
                id={`guide-trigger-${item.id}`}
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="flex min-h-[60px] w-full items-center justify-between gap-4 py-3.5 text-left transition-colors hover:text-[#C2410C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C2410C] cursor-pointer"
              >
                <span className="space-y-0.5 pr-2">
                  <span className="block text-[11px] font-semibold uppercase tracking-widest text-[#C2410C]">
                    {item.badge}
                  </span>
                  <span className="block font-serif text-base font-semibold text-[#1C1917] sm:text-lg">
                    {item.title}
                  </span>
                  <span className="block text-xs font-normal text-stone-500 sm:text-sm">
                    {item.summary}
                  </span>
                </span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-stone-500 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-[#C2410C]' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>
            </h3>

            {/* Rendered unconditionally in SSR HTML so search crawlers index all guide content */}
            <div
              id={`guide-panel-${item.id}`}
              role="region"
              aria-labelledby={`guide-trigger-${item.id}`}
              hidden={!isOpen}
              className={
                isOpen
                  ? 'border-t border-stone-100 pt-3.5 pb-5 space-y-3.5 text-sm leading-relaxed text-stone-700 sm:text-base'
                  : 'hidden'
              }
            >
              {item.paragraphs.map((para, pIdx) => (
                <p key={pIdx}>{renderSegments(para)}</p>
              ))}

              {item.bullets && item.bullets.length > 0 && (
                <ul className="list-disc space-y-2 pl-5 text-sm text-stone-700 sm:text-base">
                  {item.bullets.map((bullet, bIdx) => (
                    <li key={bIdx}>{renderSegments(bullet)}</li>
                  ))}
                </ul>
              )}

              {item.table && (
                <div className="overflow-x-auto rounded-xl border border-stone-200 bg-[#FAF8F5]/60">
                  <table className="w-full min-w-[460px] border-collapse text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-stone-200 bg-[#FAF8F5] text-[11px] font-semibold uppercase tracking-wider text-stone-500">
                        {item.table.headers.map((header) => (
                          <th key={header} className="px-4 py-2.5">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200/70 bg-white">
                      {item.table.rows.map((row, rIdx) => (
                        <tr key={rIdx}>
                          {row.cells.map((cell, cIdx) => (
                            <td
                              key={cIdx}
                              className={`px-4 py-2.5 ${
                                cIdx === 0
                                  ? 'font-medium text-[#1C1917]'
                                  : cIdx === 1
                                  ? 'font-mono font-semibold text-[#C2410C] tabular-nums whitespace-nowrap'
                                  : 'text-stone-600'
                              }`}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}
