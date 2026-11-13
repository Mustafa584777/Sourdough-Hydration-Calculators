'use client';

import { useEffect, useState } from 'react';
import { Check, Copy, Download, Printer, X } from 'lucide-react';
import {
  CalculatedResult,
  RecipeState,
  Unit,
  formatRecipeClipboardText,
  formatWeight,
  getHydrationTier,
} from '@/lib/sourdough-math';

interface ShareCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  state: RecipeState;
  result: CalculatedResult;
  unit: Unit;
}

export function ShareCardModal({
  isOpen,
  onClose,
  state,
  result,
  unit,
}: ShareCardModalProps) {
  const [recipeTitle, setRecipeTitle] = useState('Artisan Country Sourdough');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const tier = getHydrationTier(result.trueHydrationPct);
  const scaleLabel =
    state.scaleMultiplier === 1 ? '1x Batch' : `${state.scaleMultiplier}x Batch`;

  const summaryText = `${recipeTitle.trim() || 'Sourdough Formula'}\n${formatRecipeClipboardText(
    state,
    result,
    unit
  )}`;

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback ignored if clipboard blocked
    }
  };

  const handleDownloadPng = () => {
    const width = 1080;
    const rowCount = result.scaledFlours.length + 3; // flours + water + starter + salt
    const height = Math.max(1220, 820 + rowCount * 68);

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background
    ctx.fillStyle = '#FAF8F5';
    ctx.fillRect(0, 0, width, height);

    // Outer Card Frame
    const pad = 56;
    ctx.fillStyle = '#FFFFFF';
    ctx.strokeStyle = '#E7E5E4';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(pad, pad, width - pad * 2, height - pad * 2, 24);
    ctx.fill();
    ctx.stroke();

    let y = pad + 72;
    const left = pad + 60;
    const right = width - pad - 60;

    // Kicker
    ctx.fillStyle = '#78716C';
    ctx.font = '600 22px system-ui, -apple-system, sans-serif';
    ctx.fillText(`BAKER'S FORMULA SHEET · ${scaleLabel.toUpperCase()}`, left, y);

    y += 56;

    // Title
    ctx.fillStyle = '#1C1917';
    ctx.font = '700 46px Georgia, serif';
    const titleText = (recipeTitle.trim() || 'Artisan Country Sourdough').slice(0, 36);
    ctx.fillText(titleText, left, y);

    y += 38;
    ctx.fillStyle = '#57534E';
    ctx.font = '500 24px system-ui, -apple-system, sans-serif';
    ctx.fillText(`${tier.label} · ${tier.styleSummary}`, left, y);

    y += 42;
    ctx.strokeStyle = '#E7E5E4';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(left, y);
    ctx.lineTo(right, y);
    ctx.stroke();

    // Hero Metric Strip
    y += 68;
    ctx.fillStyle = '#C2410C';
    ctx.font = '700 92px Georgia, serif';
    ctx.fillText(`${result.trueHydrationPct.toFixed(1)}%`, left, y);

    ctx.fillStyle = '#78716C';
    ctx.font = '600 20px system-ui, -apple-system, sans-serif';
    ctx.fillText('TRUE HYDRATION', left, y + 34);

    // Secondary stats on right
    const col2 = left + 420;
    const col3 = left + 660;

    ctx.fillStyle = '#1C1917';
    ctx.font = '700 38px monospace';
    ctx.fillText(`${result.inoculationPct.toFixed(1)}%`, col2, y - 16);
    ctx.fillText(formatWeight(result.totalDoughGrams, unit), col3, y - 16);

    ctx.fillStyle = '#78716C';
    ctx.font = '600 20px system-ui, -apple-system, sans-serif';
    ctx.fillText('INOCULATION', col2, y + 20);
    ctx.fillText('TOTAL DOUGH', col3, y + 20);

    y += 74;
    ctx.strokeStyle = '#E7E5E4';
    ctx.beginPath();
    ctx.moveTo(left, y);
    ctx.lineTo(right, y);
    ctx.stroke();

    // Ingredient Table Header
    y += 48;
    ctx.fillStyle = '#78716C';
    ctx.font = '700 20px system-ui, -apple-system, sans-serif';
    ctx.fillText('INGREDIENT', left, y);
    ctx.textAlign = 'right';
    ctx.fillText('WEIGHT', right - 180, y);
    ctx.fillText("BAKER'S %", right, y);
    ctx.textAlign = 'left';

    y += 22;
    ctx.strokeStyle = '#F5F5F4';
    ctx.beginPath();
    ctx.moveTo(left, y);
    ctx.lineTo(right, y);
    ctx.stroke();

    const rows: Array<{ name: string; weight: string; pct: string }> = [
      ...result.scaledFlours.map((f) => ({
        name: f.name,
        weight: formatWeight(f.weightGrams, unit),
        pct: `${f.pctOfTotalFlour.toFixed(1)}%`,
      })),
      {
        name: 'Water (added to bowl)',
        weight: formatWeight(result.addedWaterGrams, unit),
        pct: `${result.bakersWaterPct.toFixed(1)}%`,
      },
      {
        name: `Starter (${state.starterHydrationPct}% hyd.)`,
        weight: formatWeight(result.starterGrams, unit),
        pct: `${result.inoculationPct.toFixed(1)}%`,
      },
      {
        name: 'Salt',
        weight: formatWeight(result.saltGrams, unit),
        pct: `${result.saltPercentOfTotalFlour.toFixed(1)}%`,
      },
    ];

    for (const row of rows) {
      y += 58;
      ctx.fillStyle = '#1C1917';
      ctx.font = '500 26px system-ui, -apple-system, sans-serif';
      ctx.fillText(row.name, left, y);

      ctx.font = '600 26px monospace';
      ctx.textAlign = 'right';
      ctx.fillText(row.weight, right - 180, y);
      ctx.fillStyle = '#57534E';
      ctx.fillText(row.pct, right, y);
      ctx.textAlign = 'left';

      y += 18;
      ctx.strokeStyle = '#F5F5F4';
      ctx.beginPath();
      ctx.moveTo(left, y);
      ctx.lineTo(right, y);
      ctx.stroke();
    }

    // Starter Math Summary Box
    y += 52;
    ctx.fillStyle = '#FAF8F5';
    ctx.beginPath();
    ctx.roundRect(left, y, right - left, 118, 16);
    ctx.fill();

    ctx.fillStyle = '#1C1917';
    ctx.font = '600 22px system-ui, -apple-system, sans-serif';
    ctx.fillText('True Total Flour & Water (including starter)', left + 28, y + 44);
    ctx.fillStyle = '#57534E';
    ctx.font = '500 23px monospace';
    ctx.fillText(
      `Total Flour: ${formatWeight(result.totalFlourGrams, unit)}   ·   Total Water: ${formatWeight(result.totalWaterGrams, unit)}`,
      left + 28,
      y + 86
    );

    // Footer Attribution
    const footerY = height - pad - 44;
    ctx.fillStyle = '#78716C';
    ctx.font = '500 21px system-ui, -apple-system, sans-serif';
    ctx.fillText('sourdoughhydrationcalculator.online', left, footerY);
    ctx.textAlign = 'right';
    ctx.fillText('True Baker’s Percentage Formula', right, footerY);
    ctx.textAlign = 'left';

    const link = document.createElement('a');
    const slug = `${Math.round(result.trueHydrationPct)}pct-sourdough-recipe.png`;
    link.download = slug;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div
      className="no-print fixed inset-0 z-50 flex items-center justify-center bg-stone-950/50 p-4 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-card-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl border border-stone-200 bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-stone-200 pb-4">
          <div>
            <h2 id="share-card-title" className="font-serif text-xl font-semibold text-[#1C1917]">
              Shareable Recipe Card
            </h2>
            <p className="mt-1 text-sm text-stone-600">
              Download as a crisp PNG card or copy formatted text for notes and forums.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close share recipe card modal"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-stone-500 hover:bg-stone-100 hover:text-[#1C1917] cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4">
          <label htmlFor="recipe-card-name" className="block text-xs font-semibold uppercase tracking-wider text-stone-500">
            Card Title
          </label>
          <input
            id="recipe-card-name"
            type="text"
            value={recipeTitle}
            onChange={(e) => setRecipeTitle(e.target.value)}
            maxLength={45}
            className="mt-1.5 h-10 w-full rounded-lg border border-stone-300 bg-white px-3 text-sm font-medium text-[#1C1917] focus:border-[#C2410C] focus:outline-none focus:ring-2 focus:ring-[#C2410C]/20"
            placeholder="e.g. Weekend Country Boule"
          />
        </div>

        {/* Live Card Preview */}
        <div className="mt-4 rounded-xl border border-stone-200 bg-[#FAF8F5] p-5">
          <div className="flex items-baseline justify-between gap-4 border-b border-stone-200/80 pb-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">
                Baker&apos;s Formula · {scaleLabel}
              </p>
              <h3 className="mt-0.5 font-serif text-lg font-semibold text-[#1C1917]">
                {recipeTitle.trim() || 'Artisan Country Sourdough'}
              </h3>
            </div>
            <div className="text-right">
              <span className="font-serif text-3xl font-bold text-[#C2410C] tabular-nums">
                {result.trueHydrationPct.toFixed(1)}%
              </span>
              <p className="text-[11px] font-medium text-stone-500">True Hydration</p>
            </div>
          </div>

          <div className="mt-3 space-y-1.5 text-sm">
            {result.scaledFlours.map((f) => (
              <div key={f.id} className="flex justify-between">
                <span className="text-stone-700">{f.name}</span>
                <span className="font-mono font-medium text-[#1C1917] tabular-nums">
                  {formatWeight(f.weightGrams, unit)}{' '}
                  <span className="text-stone-500">({f.pctOfTotalFlour.toFixed(1)}%)</span>
                </span>
              </div>
            ))}
            <div className="flex justify-between">
              <span className="text-stone-700">Water (added)</span>
              <span className="font-mono font-medium text-[#1C1917] tabular-nums">
                {formatWeight(result.addedWaterGrams, unit)}{' '}
                <span className="text-stone-500">({result.bakersWaterPct.toFixed(1)}%)</span>
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-700">
                Starter ({state.starterHydrationPct}% hyd.)
              </span>
              <span className="font-mono font-medium text-[#1C1917] tabular-nums">
                {formatWeight(result.starterGrams, unit)}{' '}
                <span className="text-stone-500">({result.inoculationPct.toFixed(1)}%)</span>
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-700">Salt</span>
              <span className="font-mono font-medium text-[#1C1917] tabular-nums">
                {formatWeight(result.saltGrams, unit)}{' '}
                <span className="text-stone-500">({result.saltPercentOfTotalFlour.toFixed(1)}%)</span>
              </span>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-stone-200/80 pt-2.5 text-xs text-stone-600">
            <span>Total Dough: <strong className="font-mono text-[#1C1917] tabular-nums">{formatWeight(result.totalDoughGrams, unit)}</strong></span>
            <span>sourdoughhydrationcalculator.online</span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-5 flex flex-wrap items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-stone-300 bg-white px-4 text-sm font-medium text-[#1C1917] hover:bg-stone-100 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Printer className="h-4 w-4 text-stone-600" aria-hidden="true" />
            <span>Print View</span>
          </button>
          <button
            type="button"
            onClick={handleCopyText}
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-stone-300 bg-white px-4 text-sm font-medium text-[#1C1917] hover:bg-stone-100 whitespace-nowrap shrink-0 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-emerald-700" aria-hidden="true" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 text-stone-600" aria-hidden="true" />
                <span>Copy Text</span>
              </>
            )}
          </button>
          <button
            type="button"
            onClick={handleDownloadPng}
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#C2410C] px-4 text-sm font-semibold text-white hover:bg-[#9A3412] whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            <span>Download PNG</span>
          </button>
        </div>
      </div>
    </div>
  );
}
