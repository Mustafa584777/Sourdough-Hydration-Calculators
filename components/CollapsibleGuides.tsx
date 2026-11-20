import { ChevronDown } from 'lucide-react';
import { BakingGuideItem, GuideTextSegment } from '@/lib/baking-guides-data';

interface CollapsibleGuidesProps {
  items: BakingGuideItem[];
}

function renderSegments(segments: GuideTextSegment[]) {
  return segments.map((seg, i) => {
    if (seg.boldKeyword || seg.strong) {
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
  return (
    <div className="divide-y divide-stone-200 rounded-2xl border border-stone-200 bg-white">
      {items.map((item, idx) => (
        <article key={item.id} id={item.id} className="px-4 py-1 sm:px-6">
          <details className="group" open={idx === 0}>
            <summary className="flex min-h-[60px] w-full list-none items-center justify-between gap-4 py-3.5 text-left transition-colors hover:text-[#C2410C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C2410C] cursor-pointer [&::-webkit-details-marker]:hidden">
              <div className="space-y-0.5 pr-2">
                <span className="block text-[11px] font-semibold uppercase tracking-widest text-[#C2410C]">
                  {item.badge}
                </span>
                <h3 className="font-serif text-base font-semibold text-[#1C1917] sm:text-lg">
                  {item.title}
                </h3>
                <p className="text-xs font-normal text-stone-500 sm:text-sm">
                  {item.summary}
                </p>
              </div>
              <ChevronDown
                className="h-5 w-5 shrink-0 text-stone-500 transition-transform duration-200 group-open:rotate-180 group-open:text-[#C2410C]"
                aria-hidden="true"
              />
            </summary>

            <div className="border-t border-stone-100 pt-3.5 pb-5 space-y-3.5 text-sm leading-relaxed text-stone-700 sm:text-base">
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
          </details>
        </article>
      ))}
    </div>
  );
}
