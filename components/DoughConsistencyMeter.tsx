'use client';

import { LazyMotion, domAnimation, m, useReducedMotion } from 'motion/react';
import { Info } from 'lucide-react';
import { getHydrationTier } from '@/lib/sourdough-math';

interface DoughConsistencyMeterProps {
  hydrationPct: number;
  wholeGrainPct: number;
}

const SEGMENTS = [
  { label: 'Stiff', range: '<62%', width: '24%', color: 'bg-amber-200/80' },
  { label: 'Beginner', range: '62–70%', width: '20%', color: 'bg-emerald-200/80' },
  { label: 'Artisan', range: '71–78%', width: '18%', color: 'bg-orange-200/90' },
  { label: 'Wet', range: '79–85%', width: '16%', color: 'bg-rose-200/90' },
  { label: 'Batter', range: '86%+', width: '22%', color: 'bg-red-200/90' },
];

export function DoughConsistencyMeter({
  hydrationPct,
  wholeGrainPct,
}: DoughConsistencyMeterProps) {
  const prefersReducedMotion = useReducedMotion();
  const tier = getHydrationTier(hydrationPct);

  // Map 50% -> 0%, 95% -> 100% cleanly across the 5-segment scale
  const clamped = Math.min(95, Math.max(50, hydrationPct));
  const positionPct = ((clamped - 50) / (95 - 50)) * 100;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
            Dough Consistency Meter
          </span>
          <div className="mt-1 flex items-center gap-2 text-sm">
            <span className={`font-semibold ${tier.accentText}`}>{tier.label}</span>
            <span className="text-stone-400" aria-hidden="true">
              ·
            </span>
            <span className="text-stone-700">{tier.styleSummary}</span>
          </div>
        </div>
        <span className="font-mono text-xs font-medium text-stone-500 tabular-nums">
          Target Band: {tier.rangeLabel}
        </span>
      </div>

      {/* Spectrum Bar */}
      <div className="relative pt-1 pb-5">
        <div
          className="flex h-3 w-full overflow-hidden rounded-full border border-stone-200/80"
          role="meter"
          aria-label="Dough hydration consistency meter"
          aria-valuemin={50}
          aria-valuemax={95}
          aria-valuenow={Math.round(hydrationPct * 10) / 10}
        >
          {SEGMENTS.map((seg) => (
            <div
              key={seg.label}
              style={{ width: seg.width }}
              className={`${seg.color} border-r border-white/60 last:border-r-0`}
            />
          ))}
        </div>

        {/* Indicator Needle */}
        <LazyMotion features={domAnimation}>
          <m.div
            className="pointer-events-none absolute top-0 -ml-2 flex flex-col items-center"
            initial={false}
            animate={{ left: `${positionPct}%` }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.18, ease: [0.16, 1, 0.3, 1] }
            }
            style={{ left: `${positionPct}%` }}
          >
            <div className="h-5 w-4 rounded-sm border-2 border-white bg-[#C2410C] shadow-sm" />
          </m.div>
        </LazyMotion>

        {/* Scale Ticks */}
        <div className="mt-2 flex justify-between font-mono text-[11px] text-stone-500 tabular-nums">
          <span>50%</span>
          <span>62%</span>
          <span>70%</span>
          <span>78%</span>
          <span>85%</span>
          <span>95%+</span>
        </div>
      </div>

      {/* Handling Guide */}
      <div className={`rounded-xl border p-3.5 ${tier.accentBg} ${tier.accentBorder}`}>
        <p className={`text-sm leading-relaxed ${tier.accentText}`}>
          <span className="font-semibold">Handling Guide: </span>
          {tier.handlingGuide}
        </p>
        {wholeGrainPct >= 15 && (
          <p className="mt-2 flex items-start gap-1.5 border-t border-stone-900/10 pt-2 text-xs leading-relaxed text-stone-700">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#C2410C]" aria-hidden="true" />
            <span>
              Your blend uses{' '}
              <strong className="font-semibold tabular-nums">
                {wholeGrainPct.toFixed(0)}%
              </strong>{' '}
              whole-grain flour, which absorbs more water than white flour—expect it to
              feel roughly 3–5% drier during shaping.
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
