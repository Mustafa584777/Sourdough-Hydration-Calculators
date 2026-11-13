export type Unit = 'g' | 'oz';
export type SaltMode = 'percent' | 'weight';
export type CalculatorMode = 'forward' | 'target';

export interface FlourItem {
  id: string;
  name: string;
  weightGrams: number;
}

export interface RecipeState {
  flours: FlourItem[];
  waterGrams: number;
  starterGrams: number;
  starterHydrationPct: number;
  saltMode: SaltMode;
  saltPercent: number;
  saltGrams: number;
  scaleMultiplier: number;
}

export interface TargetModeState {
  totalFlourGrams: number;
  starterGrams: number;
  starterHydrationPct: number;
  targetHydrationPct: number;
  saltPercent: number;
}

export interface CalculatedResult {
  addedFlourGrams: number;
  starterFlourGrams: number;
  starterWaterGrams: number;
  totalFlourGrams: number;
  addedWaterGrams: number;
  totalWaterGrams: number;
  starterGrams: number;
  saltGrams: number;
  saltPercentOfTotalFlour: number;
  totalDoughGrams: number;
  trueHydrationPct: number;
  bakersWaterPct: number;
  inoculationPct: number;
  wholeGrainPct: number;
  scaledFlours: Array<{
    id: string;
    name: string;
    weightGrams: number;
    pctOfTotalFlour: number;
  }>;
}

export interface TargetCalculatedResult {
  totalFlourGrams: number;
  addedFlourNeededGrams: number;
  starterGrams: number;
  starterFlourGrams: number;
  starterWaterGrams: number;
  targetTotalWaterGrams: number;
  addedWaterNeededGrams: number;
  saltGrams: number;
  totalDoughGrams: number;
  inoculationPct: number;
  isFeasible: boolean;
  infeasibilityReason: string | null;
}

export interface HydrationTier {
  id: string;
  label: string;
  rangeLabel: string;
  styleSummary: string;
  handlingGuide: string;
  accentBg: string;
  accentText: string;
  accentBorder: string;
}

export interface RecipePreset {
  id: string;
  name: string;
  shortName: string;
  hydrationLabel: string;
  description: string;
  state: RecipeState;
}

export interface HydrationChartRow {
  range: string;
  breadStyle: string;
  crumbAndCrust: string;
  difficulty: 'Low' | 'Moderate' | 'Intermediate' | 'Advanced';
  presetId?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export const GRAMS_PER_OUNCE = 28.349523125;

export const FLOUR_NAME_OPTIONS = [
  'Bread Flour',
  'All-Purpose Flour',
  'Whole Wheat',
  'Dark Rye',
  'Spelt Flour',
  'High-Extraction T85',
  'Semolina',
];

export const DEFAULT_RECIPE_STATE: RecipeState = {
  flours: [
    { id: 'flour-1', name: 'Bread Flour', weightGrams: 405 },
    { id: 'flour-2', name: 'Whole Wheat', weightGrams: 45 },
  ],
  waterGrams: 340,
  starterGrams: 100,
  starterHydrationPct: 100,
  saltMode: 'percent',
  saltPercent: 2,
  saltGrams: 10,
  scaleMultiplier: 1,
};

export const RECIPE_PRESETS: RecipePreset[] = [
  {
    id: 'beginner-country',
    name: 'Beginner Country Loaf',
    shortName: 'Beginner Country',
    hydrationLabel: '70%',
    description: 'Forgiving, easy to shape, crisp golden ear.',
    state: {
      flours: [
        { id: 'flour-1', name: 'Bread Flour', weightGrams: 450 },
        { id: 'flour-2', name: 'Whole Wheat', weightGrams: 50 },
      ],
      waterGrams: 335,
      starterGrams: 100,
      starterHydrationPct: 100,
      saltMode: 'percent',
      saltPercent: 2,
      saltGrams: 11,
      scaleMultiplier: 1,
    },
  },
  {
    id: 'classic-tartine',
    name: 'Classic Tartine Style',
    shortName: 'Classic Tartine',
    hydrationLabel: '78%',
    description: 'Open, custardy crumb with blistered artisanal crust.',
    state: {
      flours: [
        { id: 'flour-1', name: 'Bread Flour', weightGrams: 405 },
        { id: 'flour-2', name: 'Whole Wheat', weightGrams: 45 },
      ],
      waterGrams: 340,
      starterGrams: 100,
      starterHydrationPct: 100,
      saltMode: 'percent',
      saltPercent: 2,
      saltGrams: 10,
      scaleMultiplier: 1,
    },
  },
  {
    id: 'ciabatta-focaccia',
    name: 'High-Hydration Ciabatta / Focaccia',
    shortName: 'Ciabatta / Focaccia',
    hydrationLabel: '85%',
    description: 'Ultra-wet dough for big irregular alveoli and tender crumb.',
    state: {
      flours: [{ id: 'flour-1', name: 'Bread Flour', weightGrams: 450 }],
      waterGrams: 375,
      starterGrams: 100,
      starterHydrationPct: 100,
      saltMode: 'percent',
      saltPercent: 2.2,
      saltGrams: 11,
      scaleMultiplier: 1,
    },
  },
  {
    id: 'stiff-bagels',
    name: 'Stiff Sourdough Bagels',
    shortName: 'Stiff Bagels',
    hydrationLabel: '58%',
    description: 'Dense, chewy dough built with a 50% stiff levain.',
    state: {
      flours: [{ id: 'flour-1', name: 'Bread Flour', weightGrams: 440 }],
      waterGrams: 260,
      starterGrams: 90,
      starterHydrationPct: 50,
      saltMode: 'percent',
      saltPercent: 2,
      saltGrams: 10,
      scaleMultiplier: 1,
    },
  },
];

export const HYDRATION_CHART_ROWS: HydrationChartRow[] = [
  {
    range: '55% – 60%',
    breadStyle: 'Sourdough Bagels, Pretzels, Pasta-Style Loaves',
    crumbAndCrust: 'Tight, uniform, very chewy crumb; thin satin crust after boiling.',
    difficulty: 'Low',
    presetId: 'stiff-bagels',
  },
  {
    range: '62% – 70%',
    breadStyle: 'Beginner Country Loaf, Sandwich Boule, Pain de Mie',
    crumbAndCrust: 'Even, soft tender crumb; holds tall scoring lines effortlessly.',
    difficulty: 'Low',
    presetId: 'beginner-country',
  },
  {
    range: '71% – 78%',
    breadStyle: 'Tartine Country Bread, Batard, French Miche',
    crumbAndCrust: 'Open, irregular honeycomb crumb; thin, shattering, blistered crust.',
    difficulty: 'Moderate',
    presetId: 'classic-tartine',
  },
  {
    range: '79% – 85%',
    breadStyle: 'High-Hydration Artisan Country, Pan de Cristal Prep',
    crumbAndCrust: 'Translucent, custard-like alveoli; requires coil folds and strong flour.',
    difficulty: 'Intermediate',
  },
  {
    range: '86% – 95%+',
    breadStyle: 'Focaccia, Ciabatta, Pan de Cristal',
    crumbAndCrust: 'Batter-like, ultra-open lacy interior; baked in oiled pans or heavily floured couche.',
    difficulty: 'Advanced',
    presetId: 'ciabatta-focaccia',
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'What is the best sourdough hydration for beginners?',
    answer:
      'For most new bakers, 68% to 72% true hydration is the sweet spot. At 70% hydration, dough made with standard bread flour feels supple and cohesive without sticking excessively to your hands or the bench, making shaping, tension building, and clean razor scoring much easier.',
  },
  {
    question: 'Does sourdough starter count towards hydration?',
    answer:
      'Yes. Your sourdough starter (or levain) contains both flour and water, and ignoring it skews your hydration calculation—especially at higher inoculation rates or with stiff/liquid starters. To find true hydration, divide starter weight by (1 + starter hydration / 100) to isolate the starter flour and starter water, then add both to your recipe totals.',
  },
  {
    question: 'How does whole wheat or rye flour affect hydration?',
    answer:
      'Whole wheat and rye flours retain their bran and germ, which absorb significantly more water than sifted white bread flour. A 75% hydration dough made with 40% whole wheat will feel noticeably firmer—closer to a 68% white dough—so bakers typically add 3% to 6% more water when increasing whole-grain percentages.',
  },
  {
    question: 'How do I calculate hydration for a stiff starter (50% hydration)?',
    answer:
      'For a 50% hydration stiff starter (two parts flour to one part water by weight), divide the starter weight by 1.50 to get the starter flour, and subtract that from the starter weight to get the starter water. For example, 90g of 50% stiff starter contributes 60g of flour and 30g of water to your total dough.',
  },
];

export function gramsToDisplayValue(grams: number, unit: Unit): number {
  if (unit === 'g') {
    return Math.round(grams * 10) / 10;
  }
  return Math.round((grams / GRAMS_PER_OUNCE) * 100) / 100;
}

export function displayValueToGrams(value: number, unit: Unit): number {
  if (unit === 'g') {
    return Math.max(0, value);
  }
  return Math.max(0, value * GRAMS_PER_OUNCE);
}

export function formatWeight(grams: number, unit: Unit): string {
  if (!Number.isFinite(grams) || grams < 0) return unit === 'g' ? '0g' : '0.00oz';
  if (unit === 'g') {
    const rounded = Math.round(grams * 10) / 10;
    const str = Number.isInteger(rounded) ? rounded.toFixed(0) : rounded.toFixed(1);
    return `${str}g`;
  }
  const oz = grams / GRAMS_PER_OUNCE;
  return `${oz.toFixed(2)}oz`;
}

export function formatNumberInput(grams: number, unit: Unit): string {
  if (!Number.isFinite(grams)) return '0';
  if (unit === 'g') {
    const rounded = Math.round(grams * 10) / 10;
    return Number.isInteger(rounded) ? rounded.toFixed(0) : rounded.toFixed(1);
  }
  const oz = grams / GRAMS_PER_OUNCE;
  return (Math.round(oz * 100) / 100).toString();
}

export function calculateSourdough(state: RecipeState): CalculatedResult {
  const m = Math.max(0.1, state.scaleMultiplier);
  const scaledFloursRaw = state.flours.map((f) => ({
    id: f.id,
    name: f.name.trim() || 'Flour',
    weightGrams: Math.max(0, f.weightGrams) * m,
  }));

  const addedFlourGrams = scaledFloursRaw.reduce((sum, f) => sum + f.weightGrams, 0);
  const addedWaterGrams = Math.max(0, state.waterGrams) * m;
  const starterGrams = Math.max(0, state.starterGrams) * m;
  const starterRatio = Math.max(0, state.starterHydrationPct) / 100;

  const starterFlourGrams = starterGrams / (1 + starterRatio);
  const starterWaterGrams = starterGrams - starterFlourGrams;

  const totalFlourGrams = addedFlourGrams + starterFlourGrams;
  const totalWaterGrams = addedWaterGrams + starterWaterGrams;

  const trueHydrationPct = totalFlourGrams > 0 ? (totalWaterGrams / totalFlourGrams) * 100 : 0;
  const bakersWaterPct = totalFlourGrams > 0 ? (addedWaterGrams / totalFlourGrams) * 100 : 0;
  const inoculationPct = totalFlourGrams > 0 ? (starterGrams / totalFlourGrams) * 100 : 0;

  const saltGrams =
    state.saltMode === 'percent'
      ? (totalFlourGrams * Math.max(0, state.saltPercent)) / 100
      : Math.max(0, state.saltGrams) * m;

  const saltPercentOfTotalFlour =
    totalFlourGrams > 0 ? (saltGrams / totalFlourGrams) * 100 : 0;

  const totalDoughGrams = totalFlourGrams + totalWaterGrams + saltGrams;

  const wholeGrainGrams = scaledFloursRaw.reduce((sum, f) => {
    const lower = f.name.toLowerCase();
    if (
      lower.includes('whole') ||
      lower.includes('rye') ||
      lower.includes('spelt') ||
      lower.includes('einkorn') ||
      lower.includes('emmer') ||
      lower.includes('khorasan') ||
      lower.includes('kamut')
    ) {
      return sum + f.weightGrams;
    }
    return sum;
  }, 0);

  const wholeGrainPct = totalFlourGrams > 0 ? (wholeGrainGrams / totalFlourGrams) * 100 : 0;

  const scaledFlours = scaledFloursRaw.map((f) => ({
    ...f,
    pctOfTotalFlour: totalFlourGrams > 0 ? (f.weightGrams / totalFlourGrams) * 100 : 0,
  }));

  return {
    addedFlourGrams,
    starterFlourGrams,
    starterWaterGrams,
    totalFlourGrams,
    addedWaterGrams,
    totalWaterGrams,
    starterGrams,
    saltGrams,
    saltPercentOfTotalFlour,
    totalDoughGrams,
    trueHydrationPct,
    bakersWaterPct,
    inoculationPct,
    wholeGrainPct,
    scaledFlours,
  };
}

export function calculateTargetHydration(state: TargetModeState): TargetCalculatedResult {
  const totalFlourGrams = Math.max(0, state.totalFlourGrams);
  const starterGrams = Math.max(0, state.starterGrams);
  const starterRatio = Math.max(0, state.starterHydrationPct) / 100;

  const starterFlourGrams = starterGrams / (1 + starterRatio);
  const starterWaterGrams = starterGrams - starterFlourGrams;
  const addedFlourNeededGrams = totalFlourGrams - starterFlourGrams;

  const targetTotalWaterGrams = (totalFlourGrams * Math.max(0, state.targetHydrationPct)) / 100;
  const addedWaterNeededGrams = targetTotalWaterGrams - starterWaterGrams;

  const saltGrams = (totalFlourGrams * Math.max(0, state.saltPercent)) / 100;
  const totalDoughGrams = totalFlourGrams + targetTotalWaterGrams + saltGrams;
  const inoculationPct = totalFlourGrams > 0 ? (starterGrams / totalFlourGrams) * 100 : 0;

  let isFeasible = true;
  let infeasibilityReason: string | null = null;

  if (addedFlourNeededGrams < 0) {
    isFeasible = false;
    infeasibilityReason =
      'Starter flour alone exceeds your Total Flour target. Increase Total Flour or reduce Starter Weight.';
  } else if (addedWaterNeededGrams < 0) {
    isFeasible = false;
    infeasibilityReason =
      'Your starter already supplies more water than needed for this target hydration. Raise Target Hydration % or use a stiffer/smaller starter.';
  }

  return {
    totalFlourGrams,
    addedFlourNeededGrams,
    starterGrams,
    starterFlourGrams,
    starterWaterGrams,
    targetTotalWaterGrams,
    addedWaterNeededGrams,
    saltGrams,
    totalDoughGrams,
    inoculationPct,
    isFeasible,
    infeasibilityReason,
  };
}

export function getHydrationTier(hydrationPct: number): HydrationTier {
  if (hydrationPct < 62) {
    return {
      id: 'stiff',
      label: 'Stiff Dough',
      rangeLabel: '< 62%',
      styleSummary: 'Bagels, Pretzels & Braided Loaves',
      handlingGuide:
        'Firm, low-moisture dough. Knead firmly or use a spiral/stand mixer; holds dense structure and crisp boiled shapes.',
      accentBg: 'bg-amber-50',
      accentText: 'text-amber-900',
      accentBorder: 'border-amber-200',
    };
  }
  if (hydrationPct <= 70.5) {
    return {
      id: 'beginner',
      label: 'Beginner Friendly',
      rangeLabel: '62% – 70%',
      styleSummary: 'Easy-to-Shape Country Boule',
      handlingGuide:
        'Supple, cohesive, and forgiving on the bench. Builds surface tension cleanly and yields tall, well-defined scoring ears.',
      accentBg: 'bg-emerald-50',
      accentText: 'text-emerald-900',
      accentBorder: 'border-emerald-200',
    };
  }
  if (hydrationPct <= 78.5) {
    return {
      id: 'artisan',
      label: 'Open Crumb / Artisan',
      rangeLabel: '71% – 78%',
      styleSummary: 'Classic Tartine & Batard',
      handlingGuide:
        'Balanced artisanal dough for an open honeycomb crumb. Perform 3–4 sets of stretch-and-folds spaced 30 minutes apart.',
      accentBg: 'bg-orange-50',
      accentText: 'text-[#9A3412]',
      accentBorder: 'border-orange-200',
    };
  }
  if (hydrationPct <= 85.5) {
    return {
      id: 'wet',
      label: 'Wet / Coil Folds Needed',
      rangeLabel: '79% – 85%',
      styleSummary: 'High-Hydration Country & Ciabatta',
      handlingGuide:
        'Extensible, slack dough requiring high-protein bread flour, bassinage (held-back water), and gentle coil folds.',
      accentBg: 'bg-rose-50',
      accentText: 'text-rose-900',
      accentBorder: 'border-rose-200',
    };
  }
  return {
    id: 'batter',
    label: 'Batter-Like / Pan Dough',
    rangeLabel: '> 85%',
    styleSummary: 'Focaccia & Pan de Cristal',
    handlingGuide:
      'Pourable, ultra-hydrated dough. Ferment in a well-oiled baking pan or use lamination and strong gluten development.',
    accentBg: 'bg-red-50',
    accentText: 'text-red-900',
    accentBorder: 'border-red-200',
  };
}

export function formatRecipeClipboardText(
  state: RecipeState,
  result: CalculatedResult,
  unit: Unit
): string {
  const tier = getHydrationTier(result.trueHydrationPct);
  const scaleLabel =
    state.scaleMultiplier === 1 ? '1x Batch' : `${state.scaleMultiplier}x Scaled Batch`;

  const flourLines = result.scaledFlours
    .map(
      (f) =>
        `  - ${f.name}: ${formatWeight(f.weightGrams, unit)} (${f.pctOfTotalFlour.toFixed(1)}%)`
    )
    .join('\n');

  return [
    `SOURDOUGH FORMULA (${result.trueHydrationPct.toFixed(1)}% True Hydration · ${scaleLabel})`,
    `Style: ${tier.label} — ${tier.styleSummary}`,
    ``,
    `INGREDIENTS (Added to Bowl):`,
    flourLines,
    `  - Water: ${formatWeight(result.addedWaterGrams, unit)} (${result.bakersWaterPct.toFixed(1)}%)`,
    `  - Sourdough Starter (${state.starterHydrationPct}% hyd.): ${formatWeight(result.starterGrams, unit)} (${result.inoculationPct.toFixed(1)}% inoc.)`,
    `  - Salt: ${formatWeight(result.saltGrams, unit)} (${result.saltPercentOfTotalFlour.toFixed(1)}%)`,
    ``,
    `TRUE BAKER'S TOTALS (Including Starter):`,
    `  - Total Flour: ${formatWeight(result.totalFlourGrams, unit)} (100%)`,
    `  - Total Water: ${formatWeight(result.totalWaterGrams, unit)} (${result.trueHydrationPct.toFixed(1)}%)`,
    `  - Total Dough Weight: ${formatWeight(result.totalDoughGrams, unit)}`,
    ``,
    `Calculated at https://sourdoughhydrationcalculator.online`,
  ].join('\n');
}
