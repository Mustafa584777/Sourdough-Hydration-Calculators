'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Check,
  Copy,
  Image as ImageIcon,
  Plus,
  Printer,
  RotateCcw,
  Trash2,
} from 'lucide-react';
import {
  CalculatorMode,
  DEFAULT_RECIPE_STATE,
  FLOUR_NAME_OPTIONS,
  GRAMS_PER_OUNCE,
  RECIPE_PRESETS,
  RecipeState,
  TargetModeState,
  Unit,
  calculateSourdough,
  calculateTargetHydration,
  displayValueToGrams,
  formatNumberInput,
  formatRecipeClipboardText,
  formatWeight,
  getHydrationTier,
  gramsToDisplayValue,
} from '@/lib/sourdough-math';
import { DoughConsistencyMeter } from '@/components/DoughConsistencyMeter';
import { ShareCardModal } from '@/components/ShareCardModal';

interface NumericUnitInputProps {
  id: string;
  grams: number;
  unit: Unit;
  onChangeGrams: (grams: number) => void;
  ariaLabel?: string;
  className?: string;
}

function NumericUnitInput({
  id,
  grams,
  unit,
  onChangeGrams,
  ariaLabel,
  className = '',
}: NumericUnitInputProps) {
  const [focused, setFocused] = useState(false);
  const [draft, setDraft] = useState<string>(() => formatNumberInput(grams, unit));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setDraft(raw);
    if (raw.trim() === '') {
      onChangeGrams(0);
      return;
    }
    const parsed = Number.parseFloat(raw);
    if (!Number.isNaN(parsed) && parsed >= 0) {
      onChangeGrams(displayValueToGrams(parsed, unit));
    }
  };

  const handleBlur = () => {
    setFocused(false);
    setDraft(formatNumberInput(grams, unit));
  };

  return (
    <div className={`relative flex items-center ${className}`}>
      <input
        id={id}
        type="number"
        inputMode="decimal"
        min={0}
        step={unit === 'g' ? '1' : '0.1'}
        aria-label={ariaLabel}
        value={focused ? draft : formatNumberInput(grams, unit)}
        onFocus={(e) => {
          setFocused(true);
          setDraft(formatNumberInput(grams, unit));
          e.currentTarget.select();
        }}
        onChange={handleChange}
        onBlur={handleBlur}
        className="h-10 w-full rounded-lg border border-stone-300 bg-white pr-9 pl-3 font-mono text-sm font-medium text-[#1C1917] tabular-nums transition-colors focus:border-[#C2410C] focus:outline-none focus:ring-2 focus:ring-[#C2410C]/20"
      />
      <span className="pointer-events-none absolute right-3 font-mono text-xs font-medium text-stone-400">
        {unit}
      </span>
    </div>
  );
}

const DEFAULT_TARGET_STATE: TargetModeState = {
  totalFlourGrams: 500,
  starterGrams: 100,
  starterHydrationPct: 100,
  targetHydrationPct: 75,
  saltPercent: 2,
};

export function SourdoughCalculator() {
  const [mode, setMode] = useState<CalculatorMode>('forward');
  const [unit, setUnit] = useState<Unit>('g');
  const [activePresetId, setActivePresetId] = useState<string | null>('classic-tartine');
  const [recipe, setRecipe] = useState<RecipeState>(DEFAULT_RECIPE_STATE);
  const [targetState, setTargetState] = useState<TargetModeState>(DEFAULT_TARGET_STATE);
  const [copied, setCopied] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [scaleFocused, setScaleFocused] = useState(false);
  const [customScaleDraft, setCustomScaleDraft] = useState<string>('1');

  const result = useMemo(() => calculateSourdough(recipe), [recipe]);
  const targetResult = useMemo(() => calculateTargetHydration(targetState), [targetState]);

  // Listen for preset load requests triggered from the below-the-fold Hydration Chart
  useEffect(() => {
    const onLoadPresetEvent = (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      const preset = RECIPE_PRESETS.find((p) => p.id === customEvent.detail);
      if (preset) {
        setMode('forward');
        setRecipe(structuredClone(preset.state));
        setActivePresetId(preset.id);
      }
    };
    window.addEventListener('sourdough:load-preset', onLoadPresetEvent);
    return () => window.removeEventListener('sourdough:load-preset', onLoadPresetEvent);
  }, []);

  const handleLoadPreset = (presetId: string) => {
    const preset = RECIPE_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    setRecipe(structuredClone(preset.state));
    setActivePresetId(preset.id);
  };

  const handleReset = () => {
    setRecipe(structuredClone(DEFAULT_RECIPE_STATE));
    setTargetState({ ...DEFAULT_TARGET_STATE });
    setActivePresetId('classic-tartine');
  };

  const handleAddFlour = () => {
    if (recipe.flours.length >= 3) return;
    const usedNames = new Set(recipe.flours.map((f) => f.name));
    const nextName =
      FLOUR_NAME_OPTIONS.find((opt) => !usedNames.has(opt)) ?? 'Dark Rye';
    setActivePresetId(null);
    setRecipe((prev) => ({
      ...prev,
      flours: [
        ...prev.flours,
        {
          id: `flour-${Date.now()}`,
          name: nextName,
          weightGrams: 50,
        },
      ],
    }));
  };

  const handleRemoveFlour = (id: string) => {
    if (recipe.flours.length <= 1) return;
    setActivePresetId(null);
    setRecipe((prev) => ({
      ...prev,
      flours: prev.flours.filter((f) => f.id !== id),
    }));
  };

  const handleUpdateFlourName = (id: string, name: string) => {
    setActivePresetId(null);
    setRecipe((prev) => ({
      ...prev,
      flours: prev.flours.map((f) => (f.id === id ? { ...f, name } : f)),
    }));
  };

  const handleUpdateFlourWeight = (id: string, scaledGrams: number) => {
    setActivePresetId(null);
    const m = Math.max(0.1, recipe.scaleMultiplier);
    const baseGrams = scaledGrams / m;
    setRecipe((prev) => ({
      ...prev,
      flours: prev.flours.map((f) =>
        f.id === id ? { ...f, weightGrams: baseGrams } : f
      ),
    }));
  };

  const handleCopyRecipe = async () => {
    try {
      const text = formatRecipeClipboardText(recipe, result, unit);
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable
    }
  };

  const handleTransferTargetToForward = () => {
    if (!targetResult.isFeasible) return;
    setActivePresetId(null);
    setRecipe({
      flours: [
        {
          id: 'flour-1',
          name: 'Bread Flour',
          weightGrams: Math.round(targetResult.addedFlourNeededGrams * 10) / 10,
        },
      ],
      waterGrams: Math.round(targetResult.addedWaterNeededGrams * 10) / 10,
      starterGrams: targetState.starterGrams,
      starterHydrationPct: targetState.starterHydrationPct,
      saltMode: 'percent',
      saltPercent: targetState.saltPercent,
      saltGrams: Math.round(targetResult.saltGrams * 10) / 10,
      scaleMultiplier: 1,
    });
    setMode('forward');
  };

  const m = Math.max(0.1, recipe.scaleMultiplier);
  const maxWaterSliderGrams = Math.max(800, Math.round(result.addedFlourGrams * 1.25));
  const maxStarterSliderGrams = Math.max(400, Math.round(result.addedFlourGrams * 0.6));

  const targetTier = getHydrationTier(targetState.targetHydrationPct);

  return (
    <section
      id="calculator"
      aria-label="Interactive Sourdough Hydration Calculator"
      className="mx-auto max-w-6xl px-4 pt-6 pb-12 sm:px-6 sm:pt-8"
    >
      {/* Compact Editorial Headline & Mode Controls */}
      <div className="no-print mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <h1 className="font-serif text-3xl font-semibold tracking-tight text-[#1C1917] sm:text-4xl [text-wrap:balance]">
            Sourdough Hydration Calculator
          </h1>
          <p className="mt-1.5 text-sm leading-relaxed text-stone-600 sm:text-base">
            Calculate true dough hydration, baker&apos;s percentages, and starter flour-water
            ratios in real time.
          </p>
        </div>

        {/* Unit & Mode Segmented Controls */}
        <div className="flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
          <div
            role="tablist"
            aria-label="Calculator mode"
            className="flex w-full rounded-lg border border-stone-200 bg-stone-100/90 p-1 sm:inline-flex sm:w-auto"
          >
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'forward'}
              onClick={() => setMode('forward')}
              className={`h-10 flex-1 rounded-md px-2.5 text-center text-xs font-semibold transition-colors whitespace-nowrap sm:h-9 sm:flex-none sm:px-3.5 shrink-0 cursor-pointer ${
                mode === 'forward'
                  ? 'bg-white text-[#1C1917] shadow-xs'
                  : 'text-stone-600 hover:text-[#1C1917]'
              }`}
            >
              Hydration Calculator
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'target'}
              onClick={() => setMode('target')}
              className={`h-10 flex-1 rounded-md px-2.5 text-center text-xs font-semibold transition-colors whitespace-nowrap sm:h-9 sm:flex-none sm:px-3.5 shrink-0 cursor-pointer ${
                mode === 'target'
                  ? 'bg-white text-[#1C1917] shadow-xs'
                  : 'text-stone-600 hover:text-[#1C1917]'
              }`}
            >
              Target Hydration Mode
            </button>
          </div>

          <div
            role="group"
            aria-label="Measurement unit"
            className="flex w-full rounded-lg border border-stone-200 bg-stone-100/90 p-1 sm:inline-flex sm:w-auto"
          >
            <button
              type="button"
              onClick={() => setUnit('g')}
              aria-pressed={unit === 'g'}
              className={`h-10 flex-1 rounded-md px-3 text-center text-xs font-semibold transition-colors whitespace-nowrap sm:h-9 sm:flex-none shrink-0 cursor-pointer ${
                unit === 'g'
                  ? 'bg-[#1C1917] text-white'
                  : 'text-stone-600 hover:text-[#1C1917]'
              }`}
            >
              Grams (g)
            </button>
            <button
              type="button"
              onClick={() => setUnit('oz')}
              aria-pressed={unit === 'oz'}
              className={`h-10 flex-1 rounded-md px-3 text-center text-xs font-semibold transition-colors whitespace-nowrap sm:h-9 sm:flex-none shrink-0 cursor-pointer ${
                unit === 'oz'
                  ? 'bg-[#1C1917] text-white'
                  : 'text-stone-600 hover:text-[#1C1917]'
              }`}
            >
              Ounces (oz)
            </button>
          </div>
        </div>
      </div>

      {/* Print-Only Header */}
      <div className="hidden print-only mb-4 border-b border-stone-300 pb-3">
        <p className="text-xs uppercase tracking-wider text-stone-500">
          sourdoughhydrationcalculator.online · Baker&apos;s Formula Sheet
        </p>
        <h2 className="font-serif text-2xl font-bold text-black">
          Sourdough Hydration &amp; Baker&apos;s Percentage Breakdown
        </h2>
      </div>

      {mode === 'forward' ? (
        <>
          {/* Quick Recipe Presets (1-Click Load) */}
          <div className="no-print mb-5">
            <div className="grid grid-cols-1 gap-2 sm:flex sm:flex-wrap sm:items-center">
              <span className="mr-1 text-xs font-semibold uppercase tracking-wider text-stone-500">
                Presets:
              </span>
              {RECIPE_PRESETS.map((preset) => {
                const isActive = activePresetId === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleLoadPreset(preset.id)}
                    className={`inline-flex min-h-[42px] w-full items-center justify-between gap-1.5 rounded-lg border px-3.5 py-2 text-left text-xs font-medium transition-colors sm:h-10 sm:w-auto sm:justify-start sm:whitespace-nowrap shrink-0 cursor-pointer ${
                      isActive
                        ? 'border-[#C2410C] bg-[#C2410C]/8 text-[#9A3412] font-semibold'
                        : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300 hover:bg-stone-50'
                    }`}
                    title={preset.description}
                  >
                    <span>{preset.name}</span>
                    <span className="font-mono text-[11px] opacity-80 tabular-nums shrink-0">
                      ({preset.hydrationLabel})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main 2-Column Interactive Workspace */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
            {/* LEFT COLUMN: RECIPE INPUTS */}
            <div className="no-print rounded-2xl border border-stone-200/90 bg-white p-5 sm:p-6 lg:col-span-6">
              {/* Flour Blend Builder */}
              <div>
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <h2 className="text-sm font-semibold text-[#1C1917]">
                      Flour Blend (Up to 3 Flours)
                    </h2>
                    <p className="text-xs text-stone-500">
                      Added Flour:{' '}
                      <span className="font-mono font-semibold text-[#1C1917] tabular-nums">
                        {formatWeight(result.addedFlourGrams, unit)}
                      </span>
                      <span className="mx-1.5 text-stone-300" aria-hidden="true">
                        ·
                      </span>
                      With Starter:{' '}
                      <span className="font-mono font-semibold text-[#1C1917] tabular-nums">
                        {formatWeight(result.totalFlourGrams, unit)}
                      </span>
                    </p>
                  </div>

                  {recipe.flours.length < 3 && (
                    <button
                      type="button"
                      onClick={handleAddFlour}
                      className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-stone-200 bg-stone-50 px-3 text-xs font-semibold text-[#1C1917] hover:bg-stone-100 whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <Plus className="h-3.5 w-3.5 text-[#C2410C]" aria-hidden="true" />
                      <span>Add Flour</span>
                    </button>
                  )}
                </div>

                <div className="mt-3 space-y-2.5">
                  {recipe.flours.map((flour, index) => {
                    const scaledGrams = flour.weightGrams * m;
                    return (
                      <div
                        key={flour.id}
                        className="flex flex-col gap-2 sm:flex-row sm:items-center sm:flex-nowrap"
                      >
                        <div className="min-w-0 flex-1">
                          <label htmlFor={`flour-name-${flour.id}`} className="sr-only">
                            Flour {index + 1} type
                          </label>
                          <select
                            id={`flour-name-${flour.id}`}
                            value={
                              FLOUR_NAME_OPTIONS.includes(flour.name)
                                ? flour.name
                                : 'Custom'
                            }
                            onChange={(e) => {
                              if (e.target.value !== 'Custom') {
                                handleUpdateFlourName(flour.id, e.target.value);
                              }
                            }}
                            className="h-10 w-full rounded-lg border border-stone-300 bg-white px-3 text-sm font-medium text-[#1C1917] focus:border-[#C2410C] focus:outline-none focus:ring-2 focus:ring-[#C2410C]/20"
                          >
                            {FLOUR_NAME_OPTIONS.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                            {!FLOUR_NAME_OPTIONS.includes(flour.name) && (
                              <option value="Custom">{flour.name}</option>
                            )}
                          </select>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <div className="flex-1 sm:w-36 sm:flex-none">
                            <NumericUnitInput
                              id={`flour-weight-${flour.id}`}
                              grams={scaledGrams}
                              unit={unit}
                              ariaLabel={`${flour.name} weight`}
                              onChangeGrams={(val) =>
                                handleUpdateFlourWeight(flour.id, val)
                              }
                            />
                          </div>

                          {recipe.flours.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveFlour(flour.id)}
                              aria-label={`Remove ${flour.name}`}
                              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-stone-200 text-stone-500 hover:border-red-200 hover:bg-red-50 hover:text-red-700 cursor-pointer"
                            >
                              <Trash2 className="h-4 w-4" aria-hidden="true" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="my-5 border-t border-stone-200/80" />

              {/* Water Input + Slider */}
              <div>
                <div className="flex items-center justify-between gap-4">
                  <label
                    htmlFor="water-weight-input"
                    className="text-sm font-semibold text-[#1C1917]"
                  >
                    Water Weight (Added)
                  </label>
                  <div className="w-36 shrink-0">
                    <NumericUnitInput
                      id="water-weight-input"
                      grams={result.addedWaterGrams}
                      unit={unit}
                      ariaLabel="Added water weight"
                      onChangeGrams={(scaledGrams) => {
                        setActivePresetId(null);
                        setRecipe((prev) => ({
                          ...prev,
                          waterGrams: scaledGrams / m,
                        }));
                      }}
                    />
                  </div>
                </div>
                <div className="mt-3">
                  <input
                    type="range"
                    aria-label="Water weight slider"
                    className="crust-slider"
                    min={0}
                    max={
                      unit === 'g'
                        ? maxWaterSliderGrams
                        : Math.round((maxWaterSliderGrams / GRAMS_PER_OUNCE) * 10) / 10
                    }
                    step={unit === 'g' ? 5 : 0.2}
                    value={gramsToDisplayValue(result.addedWaterGrams, unit)}
                    onChange={(e) => {
                      const val = Number.parseFloat(e.target.value);
                      if (!Number.isNaN(val)) {
                        setActivePresetId(null);
                        const grams = displayValueToGrams(val, unit);
                        setRecipe((prev) => ({ ...prev, waterGrams: grams / m }));
                      }
                    }}
                  />
                  <div className="mt-1 flex justify-between font-mono text-[11px] text-stone-400 tabular-nums">
                    <span>{unit === 'g' ? '0g' : '0oz'}</span>
                    <span>
                      Starter adds {formatWeight(result.starterWaterGrams, unit)}
                    </span>
                    <span>
                      {formatWeight(maxWaterSliderGrams, unit)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="my-5 border-t border-stone-200/80" />

              {/* Sourdough Starter (Levain) Weight + Starter Hydration % */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <label
                      htmlFor="starter-weight-input"
                      className="text-sm font-semibold text-[#1C1917]"
                    >
                      Sourdough Starter (Levain)
                    </label>
                    <div className="w-36 shrink-0">
                      <NumericUnitInput
                        id="starter-weight-input"
                        grams={result.starterGrams}
                        unit={unit}
                        ariaLabel="Sourdough starter weight"
                        onChangeGrams={(scaledGrams) => {
                          setActivePresetId(null);
                          setRecipe((prev) => ({
                            ...prev,
                            starterGrams: scaledGrams / m,
                          }));
                        }}
                      />
                    </div>
                  </div>
                  <div className="mt-3">
                    <input
                      type="range"
                      aria-label="Starter weight slider"
                      className="crust-slider"
                      min={0}
                      max={
                        unit === 'g'
                          ? maxStarterSliderGrams
                          : Math.round((maxStarterSliderGrams / GRAMS_PER_OUNCE) * 10) / 10
                      }
                      step={unit === 'g' ? 5 : 0.2}
                      value={gramsToDisplayValue(result.starterGrams, unit)}
                      onChange={(e) => {
                        const val = Number.parseFloat(e.target.value);
                        if (!Number.isNaN(val)) {
                          setActivePresetId(null);
                          const grams = displayValueToGrams(val, unit);
                          setRecipe((prev) => ({ ...prev, starterGrams: grams / m }));
                        }
                      }}
                    />
                  </div>
                </div>

                {/* Starter Hydration % */}
                <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <label
                      htmlFor="starter-hydration-input"
                      className="text-sm font-medium text-stone-700"
                    >
                      Starter Hydration %
                    </label>
                    <p className="text-xs text-stone-500 tabular-nums">
                      Split: {formatWeight(result.starterFlourGrams, unit)} flour ·{' '}
                      {formatWeight(result.starterWaterGrams, unit)} water
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5">
                    {[
                      { label: '50% Stiff', val: 50 },
                      { label: '100% Liquid', val: 100 },
                      { label: '125%', val: 125 },
                    ].map((opt) => (
                      <button
                        key={opt.val}
                        type="button"
                        onClick={() => {
                          setActivePresetId(null);
                          setRecipe((prev) => ({
                            ...prev,
                            starterHydrationPct: opt.val,
                          }));
                        }}
                        className={`h-9 rounded-md border px-2.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          recipe.starterHydrationPct === opt.val
                            ? 'border-[#C2410C] bg-[#C2410C]/10 text-[#9A3412] font-semibold'
                            : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                    <div className="relative w-24 shrink-0">
                      <input
                        id="starter-hydration-input"
                        type="number"
                        inputMode="decimal"
                        min={10}
                        max={300}
                        step={5}
                        value={recipe.starterHydrationPct}
                        onChange={(e) => {
                          const v = Number.parseFloat(e.target.value);
                          setActivePresetId(null);
                          setRecipe((prev) => ({
                            ...prev,
                            starterHydrationPct: Number.isNaN(v) ? 0 : Math.max(0, v),
                          }));
                        }}
                        className="h-9 w-full rounded-md border border-stone-300 bg-white pr-6 pl-2.5 font-mono text-xs font-semibold text-[#1C1917] tabular-nums focus:border-[#C2410C] focus:outline-none focus:ring-2 focus:ring-[#C2410C]/20"
                      />
                      <span className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 font-mono text-xs text-stone-400">
                        %
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="my-5 border-t border-stone-200/80" />

              {/* Salt Weight or % Toggle */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <span className="text-sm font-semibold text-[#1C1917]">Salt</span>
                  <p className="text-xs text-stone-500 tabular-nums">
                    {recipe.saltMode === 'percent'
                      ? `Auto-calculated: ${formatWeight(result.saltGrams, unit)} (${recipe.saltPercent}% of total flour)`
                      : `Equals ${result.saltPercentOfTotalFlour.toFixed(2)}% of total flour`}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="inline-flex rounded-lg border border-stone-200 bg-stone-100 p-0.5">
                    <button
                      type="button"
                      onClick={() =>
                        setRecipe((prev) => ({
                          ...prev,
                          saltMode: 'percent',
                          saltPercent:
                            Math.round(result.saltPercentOfTotalFlour * 10) / 10 || 2,
                        }))
                      }
                      className={`h-8 rounded-md px-2.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        recipe.saltMode === 'percent'
                          ? 'bg-white text-[#1C1917] shadow-xs'
                          : 'text-stone-600 hover:text-[#1C1917]'
                      }`}
                    >
                      % Mode
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setRecipe((prev) => ({
                          ...prev,
                          saltMode: 'weight',
                          saltGrams: result.saltGrams / m,
                        }))
                      }
                      className={`h-8 rounded-md px-2.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        recipe.saltMode === 'weight'
                          ? 'bg-white text-[#1C1917] shadow-xs'
                          : 'text-stone-600 hover:text-[#1C1917]'
                      }`}
                    >
                      {unit} Weight
                    </button>
                  </div>

                  {recipe.saltMode === 'percent' ? (
                    <div className="relative w-24 shrink-0">
                      <input
                        id="salt-percent-input"
                        aria-label="Salt percentage"
                        type="number"
                        inputMode="decimal"
                        min={0}
                        max={10}
                        step={0.1}
                        value={recipe.saltPercent}
                        onChange={(e) => {
                          const v = Number.parseFloat(e.target.value);
                          setActivePresetId(null);
                          setRecipe((prev) => ({
                            ...prev,
                            saltPercent: Number.isNaN(v) ? 0 : Math.max(0, v),
                          }));
                        }}
                        className="h-10 w-full rounded-lg border border-stone-300 bg-white pr-7 pl-3 font-mono text-sm font-medium text-[#1C1917] tabular-nums focus:border-[#C2410C] focus:outline-none focus:ring-2 focus:ring-[#C2410C]/20"
                      />
                      <span className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 font-mono text-xs text-stone-400">
                        %
                      </span>
                    </div>
                  ) : (
                    <div className="w-28 shrink-0">
                      <NumericUnitInput
                        id="salt-weight-input"
                        grams={result.saltGrams}
                        unit={unit}
                        ariaLabel="Salt weight"
                        onChangeGrams={(scaledGrams) => {
                          setActivePresetId(null);
                          setRecipe((prev) => ({
                            ...prev,
                            saltGrams: scaledGrams / m,
                          }));
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="my-5 border-t border-stone-200/80" />

              {/* Recipe Scaler Multiplier */}
              <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <span className="text-sm font-semibold text-[#1C1917]">
                    Recipe Scaler
                  </span>
                  <p className="text-xs text-stone-500">
                    Scale batch for multiple loaves proportionally
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  {[
                    { label: '0.5x', val: 0.5 },
                    { label: '1x (1 Loaf)', val: 1 },
                    { label: '2x (2 Loaves)', val: 2 },
                    { label: '3x', val: 3 },
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      type="button"
                      onClick={() =>
                        setRecipe((prev) => ({ ...prev, scaleMultiplier: opt.val }))
                      }
                      className={`h-9 rounded-lg border px-2.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        recipe.scaleMultiplier === opt.val
                          ? 'border-[#1C1917] bg-[#1C1917] text-white'
                          : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}

                  <div className="relative w-20 shrink-0">
                    <input
                      id="custom-scale-input"
                      aria-label="Custom loaf multiplier"
                      type="number"
                      inputMode="decimal"
                      min={0.1}
                      max={50}
                      step={0.5}
                      value={scaleFocused ? customScaleDraft : String(recipe.scaleMultiplier)}
                      onFocus={(e) => {
                        setScaleFocused(true);
                        setCustomScaleDraft(String(recipe.scaleMultiplier));
                        e.currentTarget.select();
                      }}
                      onChange={(e) => {
                        setCustomScaleDraft(e.target.value);
                        const v = Number.parseFloat(e.target.value);
                        if (!Number.isNaN(v) && v >= 0.1) {
                          setRecipe((prev) => ({ ...prev, scaleMultiplier: v }));
                        }
                      }}
                      onBlur={() => {
                        setScaleFocused(false);
                        setCustomScaleDraft(String(recipe.scaleMultiplier));
                      }}
                      className="h-9 w-full rounded-lg border border-stone-300 bg-white pr-6 pl-2.5 font-mono text-xs font-semibold text-[#1C1917] tabular-nums focus:border-[#C2410C] focus:outline-none focus:ring-2 focus:ring-[#C2410C]/20"
                    />
                    <span className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 font-mono text-xs text-stone-400">
                      x
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: LIVE OUTPUT DASHBOARD */}
            <div className="print-clean-card rounded-2xl border border-stone-200/90 bg-white p-5 sm:p-6 lg:col-span-6">
              {/* Hero True Hydration Display */}
              <div className="flex flex-wrap items-end justify-between gap-4 border-b border-stone-200/80 pb-5">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                    True Total Hydration
                  </span>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="font-serif text-5xl font-bold tracking-tight text-[#C2410C] sm:text-6xl tabular-nums">
                      {result.trueHydrationPct.toFixed(1)}%
                    </span>
                  </div>
                </div>

                {/* Secondary KPI Trio */}
                <div className="grid w-full grid-cols-3 gap-3 text-left sm:w-auto sm:gap-6 sm:text-right">
                  <div>
                    <span className="block text-[11px] font-semibold uppercase tracking-wider text-stone-500">
                      Inoculation
                    </span>
                    <span className="mt-0.5 block font-mono text-base font-semibold text-[#1C1917] tabular-nums sm:text-lg">
                      {result.inoculationPct.toFixed(1)}%
                    </span>
                  </div>
                  <div>
                    <span className="block text-[11px] font-semibold uppercase tracking-wider text-stone-500">
                      Total Flour
                    </span>
                    <span className="mt-0.5 block font-mono text-base font-semibold text-[#1C1917] tabular-nums sm:text-lg">
                      {formatWeight(result.totalFlourGrams, unit)}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[11px] font-semibold uppercase tracking-wider text-stone-500">
                      Dough Weight
                    </span>
                    <span className="mt-0.5 block font-mono text-base font-semibold text-[#1C1917] tabular-nums sm:text-lg">
                      {formatWeight(result.totalDoughGrams, unit)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Consistency Meter & Handling Guide */}
              <div className="py-5 border-b border-stone-200/80">
                <DoughConsistencyMeter
                  hydrationPct={result.trueHydrationPct}
                  wholeGrainPct={result.wholeGrainPct}
                />
              </div>

              {/* Baker's Percentage Breakdown Table */}
              <div className="py-5">
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-[#1C1917]">
                    Added vs. Total Breakdown
                  </h2>
                  <span className="text-xs text-stone-500">
                    Baker&apos;s % based on Total Flour
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-stone-200 text-left text-[11px] font-semibold uppercase tracking-wider text-stone-500">
                        <th className="py-2 pr-3 font-semibold">Ingredient</th>
                        <th className="py-2 px-2 text-right font-semibold">Added</th>
                        <th className="py-2 px-2 text-right font-semibold">Starter</th>
                        <th className="py-2 px-2 text-right font-semibold">Total</th>
                        <th className="py-2 pl-2 text-right font-semibold">Baker&apos;s %</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {result.scaledFlours.map((flour) => (
                        <tr key={flour.id} className="hover:bg-stone-50/70">
                          <td className="py-2.5 pr-3 font-medium text-[#1C1917]">
                            {flour.name}
                          </td>
                          <td className="py-2.5 px-2 text-right font-mono text-stone-700 tabular-nums">
                            {formatWeight(flour.weightGrams, unit)}
                          </td>
                          <td className="py-2.5 px-2 text-right font-mono text-stone-400 tabular-nums">
                            —
                          </td>
                          <td className="py-2.5 px-2 text-right font-mono font-medium text-[#1C1917] tabular-nums">
                            {formatWeight(flour.weightGrams, unit)}
                          </td>
                          <td className="py-2.5 pl-2 text-right font-mono text-stone-600 tabular-nums">
                            {flour.pctOfTotalFlour.toFixed(1)}%
                          </td>
                        </tr>
                      ))}

                      <tr className="bg-stone-50/60">
                        <td className="py-2.5 pr-3 font-semibold text-[#1C1917]">
                          All Flours Combined
                        </td>
                        <td className="py-2.5 px-2 text-right font-mono text-stone-700 tabular-nums">
                          {formatWeight(result.addedFlourGrams, unit)}
                        </td>
                        <td className="py-2.5 px-2 text-right font-mono text-stone-600 tabular-nums">
                          +{formatWeight(result.starterFlourGrams, unit)}
                        </td>
                        <td className="py-2.5 px-2 text-right font-mono font-semibold text-[#1C1917] tabular-nums">
                          {formatWeight(result.totalFlourGrams, unit)}
                        </td>
                        <td className="py-2.5 pl-2 text-right font-mono font-semibold text-[#1C1917] tabular-nums">
                          100.0%
                        </td>
                      </tr>

                      <tr className="hover:bg-stone-50/70">
                        <td className="py-2.5 pr-3 font-semibold text-[#1C1917]">
                          Water
                        </td>
                        <td className="py-2.5 px-2 text-right font-mono text-stone-700 tabular-nums">
                          {formatWeight(result.addedWaterGrams, unit)}
                        </td>
                        <td className="py-2.5 px-2 text-right font-mono text-stone-600 tabular-nums">
                          +{formatWeight(result.starterWaterGrams, unit)}
                        </td>
                        <td className="py-2.5 px-2 text-right font-mono font-semibold text-[#C2410C] tabular-nums">
                          {formatWeight(result.totalWaterGrams, unit)}
                        </td>
                        <td className="py-2.5 pl-2 text-right font-mono font-semibold text-[#C2410C] tabular-nums">
                          {result.trueHydrationPct.toFixed(1)}%
                        </td>
                      </tr>

                      <tr className="hover:bg-stone-50/70">
                        <td className="py-2.5 pr-3 font-medium text-stone-700">
                          Starter ({recipe.starterHydrationPct}% hyd.)
                        </td>
                        <td className="py-2.5 px-2 text-right font-mono text-stone-700 tabular-nums">
                          {formatWeight(result.starterGrams, unit)}
                        </td>
                        <td className="py-2.5 px-2 text-right font-mono text-stone-400 tabular-nums">
                          Split above
                        </td>
                        <td className="py-2.5 px-2 text-right font-mono text-stone-700 tabular-nums">
                          {formatWeight(result.starterGrams, unit)}
                        </td>
                        <td className="py-2.5 pl-2 text-right font-mono text-stone-600 tabular-nums">
                          {result.inoculationPct.toFixed(1)}%
                        </td>
                      </tr>

                      <tr className="hover:bg-stone-50/70">
                        <td className="py-2.5 pr-3 font-medium text-stone-700">Salt</td>
                        <td className="py-2.5 px-2 text-right font-mono text-stone-700 tabular-nums">
                          {formatWeight(result.saltGrams, unit)}
                        </td>
                        <td className="py-2.5 px-2 text-right font-mono text-stone-400 tabular-nums">
                          —
                        </td>
                        <td className="py-2.5 px-2 text-right font-mono font-medium text-[#1C1917] tabular-nums">
                          {formatWeight(result.saltGrams, unit)}
                        </td>
                        <td className="py-2.5 pl-2 text-right font-mono text-stone-600 tabular-nums">
                          {result.saltPercentOfTotalFlour.toFixed(1)}%
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr className="border-t-2 border-stone-200 font-semibold text-[#1C1917]">
                        <td className="pt-3 pr-3">Total Dough Weight</td>
                        <td className="pt-3 px-2 text-right font-mono text-stone-500 tabular-nums">
                          —
                        </td>
                        <td className="pt-3 px-2 text-right font-mono text-stone-500 tabular-nums">
                          —
                        </td>
                        <td className="pt-3 px-2 text-right font-mono text-base text-[#1C1917] tabular-nums">
                          {formatWeight(result.totalDoughGrams, unit)}
                        </td>
                        <td className="pt-3 pl-2 text-right font-mono text-stone-600 tabular-nums">
                          {(
                            100 +
                            result.trueHydrationPct +
                            result.saltPercentOfTotalFlour
                          ).toFixed(1)}
                          %
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {/* Action Bar */}
              <div className="no-print grid grid-cols-2 gap-2.5 border-t border-stone-200/80 pt-4 sm:flex sm:flex-wrap sm:items-center">
                <button
                  type="button"
                  onClick={handleCopyRecipe}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#C2410C] px-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#9A3412] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C2410C] sm:px-4 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4" aria-hidden="true" />
                      <span>Copied Recipe</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" aria-hidden="true" />
                      <span>Copy Recipe</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setShareOpen(true)}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-stone-300 bg-white px-3.5 text-sm font-medium text-[#1C1917] transition-colors hover:bg-stone-50 sm:px-4 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <ImageIcon className="h-4 w-4 text-[#C2410C]" aria-hidden="true" />
                  <span>Share Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-stone-300 bg-white px-3.5 text-sm font-medium text-[#1C1917] transition-colors hover:bg-stone-50 sm:px-4 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Printer className="h-4 w-4 text-stone-600" aria-hidden="true" />
                  <span>Print Sheet</span>
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg border border-stone-200 px-3 text-xs font-semibold text-stone-600 transition-colors hover:bg-stone-100 hover:text-[#1C1917] sm:ml-auto sm:border-transparent whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Reset</span>
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* TAB 2: REVERSE CALCULATOR ("TARGET HYDRATION MODE") */
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
          {/* LEFT COLUMN: TARGET INPUTS */}
          <div className="no-print rounded-2xl border border-stone-200/90 bg-white p-5 sm:p-6 lg:col-span-6">
            <h2 className="font-serif text-xl font-semibold text-[#1C1917]">
              Target Hydration Mode
            </h2>
            <p className="mt-1 text-sm text-stone-600">
              Enter your total flour goal, starter weight, and desired hydration percentage to
              find the exact added water and flour required.
            </p>

            <div className="mt-5 space-y-5">
              {/* Total Flour Target */}
              <div className="flex items-center justify-between gap-4">
                <div>
                  <label
                    htmlFor="target-total-flour"
                    className="text-sm font-semibold text-[#1C1917]"
                  >
                    Total Flour Target
                  </label>
                  <p className="text-xs text-stone-500">Includes flour inside starter</p>
                </div>
                <div className="w-36 shrink-0">
                  <NumericUnitInput
                    id="target-total-flour"
                    grams={targetState.totalFlourGrams}
                    unit={unit}
                    ariaLabel="Target total flour weight"
                    onChangeGrams={(g) =>
                      setTargetState((prev) => ({ ...prev, totalFlourGrams: g }))
                    }
                  />
                </div>
              </div>

              <div className="border-t border-stone-200/80" />

              {/* Starter Weight */}
              <div className="flex items-center justify-between gap-4">
                <div>
                  <label
                    htmlFor="target-starter-weight"
                    className="text-sm font-semibold text-[#1C1917]"
                  >
                    Starter Weight
                  </label>
                  <p className="text-xs text-stone-500 tabular-nums">
                    Inoculation: {targetResult.inoculationPct.toFixed(1)}%
                  </p>
                </div>
                <div className="w-36 shrink-0">
                  <NumericUnitInput
                    id="target-starter-weight"
                    grams={targetState.starterGrams}
                    unit={unit}
                    ariaLabel="Target mode starter weight"
                    onChangeGrams={(g) =>
                      setTargetState((prev) => ({ ...prev, starterGrams: g }))
                    }
                  />
                </div>
              </div>

              {/* Starter Hydration */}
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <label
                  htmlFor="target-starter-hydration"
                  className="text-sm font-medium text-stone-700"
                >
                  Starter Hydration %
                </label>
                <div className="flex flex-wrap items-center gap-1.5">
                  {[50, 100, 125].map((pct) => (
                    <button
                      key={pct}
                      type="button"
                      onClick={() =>
                        setTargetState((prev) => ({
                          ...prev,
                          starterHydrationPct: pct,
                        }))
                      }
                      className={`h-9 rounded-md border px-2.5 text-xs font-medium whitespace-nowrap shrink-0 cursor-pointer ${
                        targetState.starterHydrationPct === pct
                          ? 'border-[#C2410C] bg-[#C2410C]/10 text-[#9A3412] font-semibold'
                          : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      {pct}%
                    </button>
                  ))}
                  <div className="relative w-24 shrink-0">
                    <input
                      id="target-starter-hydration"
                      type="number"
                      min={10}
                      max={300}
                      step={5}
                      value={targetState.starterHydrationPct}
                      onChange={(e) => {
                        const v = Number.parseFloat(e.target.value);
                        setTargetState((prev) => ({
                          ...prev,
                          starterHydrationPct: Number.isNaN(v) ? 0 : Math.max(0, v),
                        }));
                      }}
                      className="h-9 w-full rounded-md border border-stone-300 bg-white pr-6 pl-2.5 font-mono text-xs font-semibold text-[#1C1917] tabular-nums focus:border-[#C2410C] focus:outline-none focus:ring-2 focus:ring-[#C2410C]/20"
                    />
                    <span className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 font-mono text-xs text-stone-400">
                      %
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t border-stone-200/80" />

              {/* Desired Target Hydration % */}
              <div>
                <div className="flex items-center justify-between gap-4">
                  <label
                    htmlFor="desired-hydration-input"
                    className="text-sm font-semibold text-[#1C1917]"
                  >
                    Desired Target Hydration %
                  </label>
                  <div className="relative w-28 shrink-0">
                    <input
                      id="desired-hydration-input"
                      type="number"
                      inputMode="decimal"
                      min={45}
                      max={110}
                      step={0.5}
                      value={targetState.targetHydrationPct}
                      onChange={(e) => {
                        const v = Number.parseFloat(e.target.value);
                        setTargetState((prev) => ({
                          ...prev,
                          targetHydrationPct: Number.isNaN(v) ? 0 : Math.max(0, v),
                        }));
                      }}
                      className="h-10 w-full rounded-lg border border-stone-300 bg-white pr-7 pl-3 font-mono text-sm font-semibold text-[#1C1917] tabular-nums focus:border-[#C2410C] focus:outline-none focus:ring-2 focus:ring-[#C2410C]/20"
                    />
                    <span className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 font-mono text-xs text-stone-400">
                      %
                    </span>
                  </div>
                </div>
                <div className="mt-3">
                  <input
                    type="range"
                    aria-label="Target hydration percentage slider"
                    className="crust-slider"
                    min={50}
                    max={95}
                    step={0.5}
                    value={Math.min(95, Math.max(50, targetState.targetHydrationPct))}
                    onChange={(e) => {
                      const v = Number.parseFloat(e.target.value);
                      if (!Number.isNaN(v)) {
                        setTargetState((prev) => ({ ...prev, targetHydrationPct: v }));
                      }
                    }}
                  />
                  <div className="mt-1 flex justify-between font-mono text-[11px] text-stone-400 tabular-nums">
                    <span>50% Bagel</span>
                    <span>70% Country</span>
                    <span>78% Tartine</span>
                    <span>95% Pan</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-stone-200/80" />

              {/* Salt % */}
              <div className="flex items-center justify-between gap-4">
                <div>
                  <label
                    htmlFor="target-salt-pct"
                    className="text-sm font-semibold text-[#1C1917]"
                  >
                    Salt Percentage
                  </label>
                  <p className="text-xs text-stone-500">Standard artisan dough uses 2%</p>
                </div>
                <div className="relative w-24 shrink-0">
                  <input
                    id="target-salt-pct"
                    type="number"
                    inputMode="decimal"
                    min={0}
                    max={6}
                    step={0.1}
                    value={targetState.saltPercent}
                    onChange={(e) => {
                      const v = Number.parseFloat(e.target.value);
                      setTargetState((prev) => ({
                        ...prev,
                        saltPercent: Number.isNaN(v) ? 0 : Math.max(0, v),
                      }));
                    }}
                    className="h-10 w-full rounded-lg border border-stone-300 bg-white pr-7 pl-3 font-mono text-sm font-medium text-[#1C1917] tabular-nums focus:border-[#C2410C] focus:outline-none focus:ring-2 focus:ring-[#C2410C]/20"
                  />
                  <span className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 font-mono text-xs text-stone-400">
                    %
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: REVERSE CALCULATOR OUTPUTS */}
          <div className="print-clean-card rounded-2xl border border-stone-200/90 bg-white p-5 sm:p-6 lg:col-span-6">
            {!targetResult.isFeasible ? (
              <div
                role="alert"
                className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-900"
              >
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-700" aria-hidden="true" />
                <div>
                  <h3 className="text-sm font-semibold">Target Hydration Not Reachable</h3>
                  <p className="mt-1 text-sm leading-relaxed">
                    {targetResult.infeasibilityReason}
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="flex flex-wrap items-end justify-between gap-4 border-b border-stone-200/80 pb-5">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                      Exact Added Water Needed
                    </span>
                    <div className="mt-1 font-serif text-5xl font-bold tracking-tight text-[#C2410C] sm:text-6xl tabular-nums">
                      {formatWeight(targetResult.addedWaterNeededGrams, unit)}
                    </div>
                  </div>

                  <div className="grid w-full grid-cols-2 gap-4 text-left sm:w-auto sm:gap-5 sm:text-right">
                    <div>
                      <span className="block text-[11px] font-semibold uppercase tracking-wider text-stone-500">
                        Added Flour Needed
                      </span>
                      <span className="mt-0.5 block font-mono text-lg font-semibold text-[#1C1917] tabular-nums">
                        {formatWeight(targetResult.addedFlourNeededGrams, unit)}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[11px] font-semibold uppercase tracking-wider text-stone-500">
                        Total Dough Weight
                      </span>
                      <span className="mt-0.5 block font-mono text-lg font-semibold text-[#1C1917] tabular-nums">
                        {formatWeight(targetResult.totalDoughGrams, unit)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Expected Dough Feel */}
                <div className="py-5 border-b border-stone-200/80">
                  <div className={`rounded-xl border p-3.5 ${targetTier.accentBg} ${targetTier.accentBorder}`}>
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-sm font-semibold ${targetTier.accentText}`}>
                        {targetTier.label} · {targetTier.styleSummary}
                      </span>
                      <span className="font-mono text-xs font-semibold text-stone-600 tabular-nums">
                        {targetState.targetHydrationPct.toFixed(1)}%
                      </span>
                    </div>
                    <p className={`mt-1.5 text-sm leading-relaxed ${targetTier.accentText}`}>
                      {targetTier.handlingGuide}
                    </p>
                  </div>
                </div>

                {/* Mixing Bench Sheet */}
                <div className="py-5">
                  <h3 className="mb-3 text-sm font-semibold text-[#1C1917]">
                    Mixing Bowl Checklist
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                      <thead>
                        <tr className="border-b border-stone-200 text-left text-[11px] font-semibold uppercase tracking-wider text-stone-500">
                          <th className="py-2 pr-3 font-semibold">Ingredient</th>
                          <th className="py-2 px-2 text-right font-semibold">Add to Bowl</th>
                          <th className="py-2 pl-2 text-right font-semibold">Total Incl. Starter</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100">
                        <tr>
                          <td className="py-2.5 pr-3 font-medium text-[#1C1917]">Flour</td>
                          <td className="py-2.5 px-2 text-right font-mono font-semibold text-[#1C1917] tabular-nums">
                            {formatWeight(targetResult.addedFlourNeededGrams, unit)}
                          </td>
                          <td className="py-2.5 pl-2 text-right font-mono text-stone-600 tabular-nums">
                            {formatWeight(targetResult.totalFlourGrams, unit)} (100%)
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2.5 pr-3 font-medium text-[#1C1917]">Water</td>
                          <td className="py-2.5 px-2 text-right font-mono font-semibold text-[#C2410C] tabular-nums">
                            {formatWeight(targetResult.addedWaterNeededGrams, unit)}
                          </td>
                          <td className="py-2.5 pl-2 text-right font-mono text-stone-600 tabular-nums">
                            {formatWeight(targetResult.targetTotalWaterGrams, unit)} (
                            {targetState.targetHydrationPct.toFixed(1)}%)
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2.5 pr-3 font-medium text-stone-700">
                            Starter ({targetState.starterHydrationPct}% hyd.)
                          </td>
                          <td className="py-2.5 px-2 text-right font-mono font-medium text-[#1C1917] tabular-nums">
                            {formatWeight(targetResult.starterGrams, unit)}
                          </td>
                          <td className="py-2.5 pl-2 text-right font-mono text-stone-500 tabular-nums">
                            {formatWeight(targetResult.starterFlourGrams, unit)}F /{' '}
                            {formatWeight(targetResult.starterWaterGrams, unit)}W
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2.5 pr-3 font-medium text-stone-700">
                            Salt ({targetState.saltPercent}%)
                          </td>
                          <td className="py-2.5 px-2 text-right font-mono font-medium text-[#1C1917] tabular-nums">
                            {formatWeight(targetResult.saltGrams, unit)}
                          </td>
                          <td className="py-2.5 pl-2 text-right font-mono text-stone-600 tabular-nums">
                            {formatWeight(targetResult.saltGrams, unit)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="no-print flex flex-wrap items-center gap-3 border-t border-stone-200/80 pt-4">
                  <button
                    type="button"
                    onClick={handleTransferTargetToForward}
                    className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#C2410C] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#9A3412] whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>Open in Full Calculator</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="inline-flex h-10 items-center gap-2 rounded-lg border border-stone-300 bg-white px-4 text-sm font-medium text-[#1C1917] hover:bg-stone-50 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <Printer className="h-4 w-4 text-stone-600" aria-hidden="true" />
                    <span>Print Sheet</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <ShareCardModal
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        state={recipe}
        result={result}
        unit={unit}
      />
    </section>
  );
}
