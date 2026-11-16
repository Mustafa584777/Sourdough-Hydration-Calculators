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
