export interface GuideTextSegment {
  text: string;
  boldKeyword?: boolean;
  strong?: boolean;
}

export interface GuideTableRow {
  cells: string[];
}

export interface BakingGuideItem {
  id: string;
  badge: string;
  title: string;
  summary: string;
  paragraphs: GuideTextSegment[][];
  bullets?: GuideTextSegment[][];
  table?: {
    headers: string[];
    rows: GuideTableRow[];
  };
}

export const BAKING_GUIDE_ITEMS: BakingGuideItem[] = [
  {
    id: 'what-is-hydration',
    badge: 'Fundamentals',
    title: 'Dough Hydration Defined: Why Water Weight Controls Crumb & Crust',
    summary:
      'Learn how the ratio of total liquid to total flour shapes gluten extensibility, oven spring, and crumb structure.',
    paragraphs: [
      [
        {
          text: 'In artisan baking, hydration measures the total weight of water relative to the total weight of flour in your dough, expressed as a percentage. Because flour absorbs water at different rates depending on protein and bran content, small hydration shifts transform how dough behaves on the bench and inside the oven.',
        },
      ],
      [
        {
          text: 'Lower hydration doughs (55%–65%) form dense, tight gluten networks ideal for bagels and sandwich loaves, while higher hydration doughs (75%–85%+) allow free steam expansion during baking—producing translucent, open honeycomb alveoli and thin, blistered crusts. Using a ',
        },
        {
          text: 'sourdough hydration calculator online',
          boldKeyword: true,
        },
        {
          text: ' guarantees that hidden liquid from your starter or levain is included in that percentage.',
        },
      ],
    ],
  },
  {
    id: 'bakers-percentage-math',
    badge: "Baker's Math",
    title: 'How Baker’s Math Ratios Work (100% Flour Baseline Explained)',
    summary:
      'Scale any loaf effortlessly from one boule to bakery batches using flour-based percentages rather than total dough weight.',
    paragraphs: [
      [
        {
          text: "Baker's percentages anchor every ingredient to the combined weight of all flours (both bowl flour and starter flour), which always equals 100%. Water, starter, salt, and inclusions are each expressed as a percentage of that flour baseline rather than a percentage of the finished dough.",
        },
      ],
      [
        {
          text: 'For example, in a formula with 500g total flour, 375g total water is 75% hydration and 10g salt is 2% salt. Once you know the percentages, a ',
        },
        {
          text: 'simple sourdough calculator',
          boldKeyword: true,
        },
        {
          text: ' lets you scale up for twin loaves or down for miniature boules without changing texture or fermentation balance.',
        },
      ],
    ],
    bullets: [
      [
        { text: 'Total Flour = Added Bowl Flour + Flour Inside Starter (100% baseline)', strong: true },
      ],
      [
        { text: 'Hydration % = (Total Water ÷ Total Flour) × 100', strong: true },
      ],
      [
        { text: 'Salt % = (Salt Weight ÷ Total Flour) × 100 (typically 1.8% to 2.2%)', strong: true },
      ],
    ],
  },
  {
    id: 'bread-and-pizza-hydration',
    badge: 'Style Targets',
    title: 'Artisan Bread, Pizza & Enriched Dough Hydration Ranges',
    summary:
      'Compare ideal hydration targets across Neapolitan pizza, Detroit pan crusts, country loaves, and focaccia.',
    paragraphs: [
      [
        {
          text: 'Every baked style thrives inside a distinct moisture band. Oven temperature, baking vessel (hearth stone vs. oiled steel pan), and flour strength determine how much water your dough can support without slumping.',
        },
      ],
      [
        {
          text: 'Review the benchmarks below alongside our ',
        },
        {
          text: 'sourdough hydration chart',
          boldKeyword: true,
        },
        {
          text: ' to pick the exact hydration target before mixing your autolyse.',
        },
      ],
    ],
    table: {
      headers: ['Dough Type', 'Target Hydration', 'Flour Recommendation'],
      rows: [
        { cells: ['Sourdough Bagels & Pretzels', '52% – 58%', 'High-gluten bread flour (13%+)'] },
        { cells: ['Neapolitan Pizza (900°F oven)', '58% – 64%', 'Tipo 00 pizza flour'] },
        { cells: ['NY-Style & Home Oven Pizza', '62% – 67%', 'Bread flour + 1%–2% olive oil'] },
        { cells: ['Soft Sandwich Loaf & Milk Bread', '64% – 70%', 'Bread or unbleached AP flour'] },
        { cells: ['Detroit / Sicilian Pan Pizza', '70% – 76%', 'High-protein bread flour'] },
        { cells: ['Classic Artisan Country Batard', '72% – 78%', 'Bread flour + 10%–20% whole wheat'] },
        { cells: ['Focaccia, Ciabatta & Pan de Cristal', '80% – 92%', 'Strong bread flour + coil folds'] },
      ],
    },
  },
  {
    id: 'beginner-hydration-guide',
    badge: 'Getting Started',
    title: 'Choosing Your Ideal Starting Hydration Level as a New Baker',
    summary:
      'Build reliable shaping tension at 66%–70% before stepping up to wetter open-crumb doughs.',
    paragraphs: [
      [
        {
          text: 'The most common beginner mistake is starting directly at 80% hydration using soft all-purpose flour. Until your hands recognize proper gluten development and surface tension, excess water causes dough to tear on the bench and bake into a flat disc.',
        },
      ],
      [
        {
          text: 'Begin at 66% to 70% true hydration with sturdy bread flour (12%+ protein), then dial recipes up by 2% each bake as your coil folds improve. Checking numbers in the ',
        },
        {
          text: 'best sourdough hydration calculator free',
          boldKeyword: true,
        },
        {
          text: ' of guesswork keeps your adjustments repeatable from week to week.',
        },
      ],
    ],
  },
  {
    id: 'hidden-water-enriched-dough',
    badge: 'Enriched Doughs',
    title: 'Accounting for Liquid in Milk, Eggs, Butter & Honey (Enriched Doughs)',
    summary:
      'Calculate true hydration in brioche, cinnamon rolls, and milk bread by counting moisture hidden inside enrichments.',
    paragraphs: [
      [
        {
          text: 'When making sourdough brioche, panettone, or Hokkaido milk bread, straight water is often replaced by dairy, eggs, butter, and liquid sweeteners. Treating milk as 100% water—or ignoring the water inside whole eggs—throws off your final dough consistency.',
        },
      ],
      [
        {
          text: 'Multiply each enrichment weight by its water fraction below and include those grams inside your water input so your brioche stays supple rather than soggy.',
        },
      ],
    ],
    table: {
      headers: ['Enrichment Ingredient', 'Approx. Water Content', 'Water in 100g Ingredient'],
      rows: [
        { cells: ['Whole Milk / Buttermilk', '87% – 90%', '87g – 90g water'] },
        { cells: ['Heavy Cream', '58% – 60%', '58g water'] },
        { cells: ['Whole Egg (beaten)', '75%', '75g water (~37g per 50g egg)'] },
        { cells: ['Egg Yolk Only', '50%', '50g water'] },
        { cells: ['Unsalted Butter', '16% – 18%', '17g water'] },
        { cells: ['Honey', '17%', '17g water'] },
        { cells: ['Maple Syrup', '33%', '33g water'] },
      ],
    },
  },
  {
    id: 'preferments-poolish-biga-starter',
    badge: 'Preferments',
    title: 'Poolish, Biga, and Levain: Comparing Liquid & Stiff Preferments',
    summary:
      'Understand how yeast-fermented poolish and biga differ from wild sourdough starters in moisture and fermentation character.',
    paragraphs: [
      [
        {
          text: 'Pre-fermenting a portion of your flour improves extensibility, shelf life, and flavor complexity—whether you use commercial yeast or wild lactobacilli. Because each preferment carries a different water-to-flour ratio, failing to count its split distorts overall dough hydration.',
        },
      ],
      [
        {
          text: 'Testing formulas inside a dedicated ',
        },
        {
          text: 'sourdough hydration calculator app',
          boldKeyword: true,
        },
        {
          text: ' makes switching between a 100% liquid preferment and a 50% stiff preferment instant without recalculating flour totals by hand.',
        },
      ],
    ],
    table: {
      headers: ['Preferment Type', 'Typical Hydration', 'Flavor & Texture Impact'],
      rows: [
        { cells: ['Poolish (commercial yeast)', '100% (1:1)', 'Mild, nutty, highly extensible; great for baguettes & pizza'] },
        { cells: ['Biga (commercial yeast)', '50% – 60%', 'Firm, sweet, strong gluten lift & open structure'] },
        { cells: ['Liquid Sourdough Starter (Levain)', '100% (1:1)', 'Balanced tangy acidity, open honeycomb crumb'] },
        { cells: ['Stiff Levain / Pasta Madre', '50% – 65%', 'Creamy mild lactic notes, tall oven spring & longer fermentation'] },
      ],
    },
  },
  {
    id: 'starter-inoculation-guide',
    badge: 'Fermentation',
    title: 'Starter Inoculation Ratios: Balancing Fermentation Speed & Flavor',
    summary:
      'Adjust how much starter you mix into a loaf (10% to 30%) based on room temperature and baking schedule.',
    paragraphs: [
      [
        {
          text: 'Inoculation refers to the weight of ripe starter divided by total flour weight. Most everyday country recipes call for 20% inoculation (100g active starter for 500g total flour), finishing bulk fermentation in roughly 4 to 5 hours at 75°F (24°C).',
        },
      ],
    ],
    bullets: [
      [
        { text: 'Low Inoculation (10%–12%): ', strong: true },
        { text: 'Ideal for warm summer kitchens (>78°F) or long overnight bulk ferments with mild, sweet lactic aroma.' },
      ],
      [
        { text: 'Standard Inoculation (18%–22%): ', strong: true },
        { text: 'Predictable daytime baking rhythm with strong dough rise and clean blistering.' },
      ],
      [
        { text: 'High Inoculation (25%–30%): ', strong: true },
        { text: 'Helps cold winter kitchens (<68°F) or enriched sweet doughs rise without stalling.' },
      ],
    ],
  },
  {
    id: 'convert-to-lievito-madre',
    badge: 'Stiff Starter',
    title: 'Converting Liquid 100% Starter into 65% Lievito Madre (Stiff Levain)',
    summary:
      'Step-by-step weight conversion to turn a standard 1:1 liquid starter into a sweet, tall-rising 65% Italian stiff starter.',
    paragraphs: [
      [
        {
          text: 'Lievito madre (65% hydration stiff starter) favors creamy lactic fermentation and gentle acetic lift, helping enriched loaves and weak-flour batards stand taller. You can convert any mature 100% liquid starter in one feeding:',
        },
      ],
      [
        {
          text: 'Weigh 20g ripe 100% liquid starter (which contains 10g flour and 10g water), then knead it together with 90g bread flour and 55g water. Your jar now holds exactly 100g flour and 65g water—true 65.0% hydration stiff starter (165g total). Refresh two more times at a 1:3:1.95 ratio (e.g., 30g stiff seed + 90g flour + 58.5g water) before baking, and track the updated 65% starter hydration directly here instead of maintaining a ',
        },
        {
          text: 'sourdough calculator excel',
          boldKeyword: true,
        },
        {
          text: ' sheet.',
        },
      ],
    ],
  },
  {
    id: 'grams-in-a-cup-chart',
    badge: 'Unit Conversions',
    title: 'Cup-to-Gram Weight Equivalents for Flour, Water & Starter',
    summary:
      'Convert older volume-based recipes into accurate grams so your dough hydration stays consistent.',
    paragraphs: [
      [
        {
          text: 'Scooping flour straight from a bag packs up to 150g into a single cup, whereas lightly spooning flour yields 120g—creating a huge hydration swing. If your recipe lists volume measurements, convert ingredients using standard spooned-and-leveled gram weights before relying on a ',
        },
        {
          text: 'sourdough hydration calculator in cups',
          boldKeyword: true,
        },
        {
          text: ' estimate.',
        },
      ],
    ],
    table: {
      headers: ['Ingredient (1 US Cup / Spoon)', 'Weight in Grams', 'Weight in Ounces'],
      rows: [
        { cells: ['All-Purpose Flour (1 cup, spooned)', '120g', '4.23 oz'] },
        { cells: ['Bread Flour (1 cup, spooned)', '125g', '4.41 oz'] },
        { cells: ['Whole Wheat Flour (1 cup, spooned)', '130g', '4.59 oz'] },
        { cells: ['Dark Rye Flour (1 cup, spooned)', '115g', '4.06 oz'] },
        { cells: ['Water (1 cup)', '237g', '8.36 oz'] },
        { cells: ['Ripe 100% Starter (1 cup, stirred)', '225g', '7.94 oz'] },
        { cells: ['Fine Sea Salt (1 tsp)', '6g', '0.21 oz'] },
      ],
    },
  },
];
