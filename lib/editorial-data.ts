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
    question: 'How do I calculate my sourdough hydration?',
    answer:
      'Divide your total water weight (added water plus water inside your starter) by your total flour weight (added flour plus flour inside your starter), then multiply by 100. For example, 390g total water divided by 500g total flour equals 78% true dough hydration.',
  },
  {
    question: 'How to calculate sourdough hydration with starter?',
    answer:
      'First isolate the flour and water in your sourdough starter: divide starter weight by (1 + starter hydration % / 100) to get starter flour, then subtract that from starter weight to get starter water. Add starter flour to your main flour, add starter water to your main water, and divide total water by total flour × 100.',
  },
  {
    question: 'How to determine sourdough starter hydration?',
    answer:
      'To determine and measure your sourdough starter hydration, weigh the flour and water you feed it (excluding the carried-over seed starter if using the same ratio consistently) and calculate (Water Weight ÷ Flour Weight) × 100. Equal weights of flour and water equal 100% hydration; twice as much flour as water equals a 50% stiff starter.',
  },
  {
    question: 'How do I know if my sourdough starter is at 100% hydration?',
    answer:
      'A 100% hydration starter is fed equal weights of flour and water (such as 50g flour and 50g water). Visually and texturally, a healthy 100% hydration starter at peak looks like thick pancake batter or whipped mousse with tiny bubbles throughout, rather than stiff clay dough or watery liquid.',
  },
  {
    question: 'How do I make my sourdough starter 100% hydration?',
    answer:
      'Over 2–3 consecutive feedings, weigh your carried-over starter on a digital scale and feed it exact 1:1 weights of flour and water (for example, 30g existing starter + 30g unbleached flour + 30g water). Once refreshed two or three times at 1:1 flour-to-water by weight, your culture settles at true 100% hydration.',
  },
  {
    question: 'What is the 1/3/3 rule for sourdough starter?',
    answer:
      'The 1:3:3 feeding rule refers to feeding 1 part mature starter with 3 parts flour and 3 parts water by weight (for example, 20g starter + 60g flour + 60g water). Bakers also use 1:3:3 as a balanced overnight build ratio that peaks gently over 8–10 hours at room temperature without quickly over-acidifying.',
  },
  {
    question: 'If I need 200g of sourdough starter, how much should I feed it?',
    answer:
      'Feed slightly above 200g to account for jar residue: at a 1:2:2 ratio, mix 45g seed starter + 90g flour + 90g water (225g total, leaving 200g clean to pour). At a slower 1:3:3 overnight ratio, mix 30g starter + 95g flour + 95g water (220g total).',
  },
  {
    question: 'How many times a day are you supposed to feed your sourdough starter?',
    answer:
      'When kept at warm room temperature (70–76°F / 21–24°C), feed an active starter once every 12 to 24 hours, or use a higher feeding ratio like 1:4:4 or 1:5:5 for a single daily refresh. If stored in the refrigerator between weekend bakes, one feeding per week is usually plenty.',
  },
  {
    question: 'Is it better to feed sourdough starter in the morning or at night?',
    answer:
      'Feed based on when you plan to mix dough: feed at night (using a 1:3:3 or 1:4:4 ratio) if you want a bubbly levain ready for morning mixing, or feed early in the morning (1:1:1 or 1:2:2) if you mix dough in the afternoon. What matters most is using the starter near its dome peak.',
  },
  {
    question: 'Can you overfeed a sourdough starter?',
    answer:
      'You cannot harm yeast by giving it plenty of food, but refreshing a starter before it finishes fermenting its previous meal gradually dilutes the yeast and lactic acid bacteria population. Wait until your starter reaches peak or begins to flatten slightly before discarding and feeding again.',
  },
  {
    question: 'Can you skip 2 days of feeding sourdough starter?',
    answer:
      'Yes. In the refrigerator, skipping 2 days has virtually no negative effect. At room temperature, a mature starter can usually survive 2 days un-fed—though it will deflate, smell sharper (acetone/vinegar), and need 1–2 warm 1:2:2 refresh feedings to regain peak vigor before baking.',
  },
  {
    question: 'What is the longest sourdough starter can go without feeding?',
    answer:
      'In a clean, loosely covered jar in the fridge (38–40°F / 3–4°C), an established starter typically lasts 2 to 4 weeks—and often several months—without feeding. At warm room temperature, leaving a starter longer than 3 to 5 days increases mold risk and requires revival feedings.',
  },
  {
    question: 'What are the signs that a sourdough starter is starving?',
    answer:
      'A starving starter collapses flat back to its starting line, turns watery or thin, develops a dark grayish-amber layer of liquid alcohol ("hooch") on top, and gives off a pungent nail-polish-remover (acetone) or sharp vinegar odor instead of mild creamy yogurt notes.',
  },
  {
    question: 'What are the signs of a strong sourdough starter?',
    answer:
      'A strong sourdough starter reliably doubles or triples in volume within 4 to 6 hours after a 1:2:2 feeding at 75°F, forms a domed top packed with even honeycomb bubbles on the jar walls, smells pleasantly sweet, tangy, or creamy, and rebounds quickly after cold storage.',
  },
  {
    question: 'What is the perfect hydration for sourdough?',
    answer:
      'There is no single perfect percentage for every flour, but 70% to 75% true hydration is ideal for most artisan country loaves made with bread flour. It delivers enough moisture for an open, custardy crumb and blistered crust while staying manageable to shape by hand.',
  },
  {
    question: 'Is 60% hydration ok for sourdough?',
    answer:
      'Yes. A 60% hydration sourdough produces a stiff, cohesive dough that is very easy to knead and shape—ideal for chewy sourdough bagels, pretzels, braided sandwich loaves, or beginners working with softer all-purpose flours that cannot hold high water.',
  },
  {
    question: 'Is 65% hydration too low for sourdough?',
    answer:
      'No, 65% hydration is not too low—it is a classic everyday hydration for sourdough sandwich bread, boules, and beginner country loaves. Expect a softer, more uniform, sliceable crumb and crisp ear without sticky bench handling.',
  },
  {
    question: 'Can you provide a recipe for sourdough with 65% hydration?',
    answer:
      'For a true 65% hydration loaf: mix 400g bread flour + 50g whole wheat flour + 275g water + 100g active 100%-hydration starter + 10g salt. Including the 50g flour and 50g water from the starter gives 500g total flour and 325g total water (325 ÷ 500 = 65.0% hydration).',
  },
  {
    question: 'Is 70% hydration good for sourdough bread?',
    answer:
      'Yes, 70% hydration is widely considered the gold standard for everyday sourdough bread. It strikes the sweet spot between beginner-friendly dough tension during shaping and a moist, moderately open crumb inside a crisp caramelized crust.',
  },
  {
    question: 'Is 75% hydration high for sourdough?',
    answer:
      '75% hydration is moderately high—right in the middle of classic Tartine-style artisan baking. With high-protein bread flour (12%+ protein) and 3–4 sets of stretch-and-folds, it builds wonderful extensibility and an open honeycomb crumb without feeling soupy.',
  },
  {
    question: 'Can you give me a recipe for 75% hydration sourdough?',
    answer:
      'For a true 75% hydration artisan loaf: combine 405g bread flour + 45g whole wheat flour + 325g water + 100g ripe 100%-hydration starter + 10g salt. Counting the 50g flour and 50g water from the starter totals 500g flour and 375g water (375 ÷ 500 = 75.0% hydration).',
  },
  {
    question: 'Is 80% hydration too high for sourdough?',
    answer:
      'For beginners or lower-protein all-purpose flour, 80% hydration can feel too sticky and slack to shape cleanly. However, with strong high-protein bread flour, whole grain blends, bassinage (adding water gradually), and coil folds, 80% hydration excels for open-crumb batards and ciabatta.',
  },
  {
    question: 'What happens if sourdough has too much hydration?',
    answer:
      'Excess hydration weakens the gluten network so dough spreads outward instead of rising tall in the oven. The dough clings to hands and proofing bannetons, scores smear shut rather than blooming, and the baked loaf often turns out flat with large gummy tunnels near the top.',
  },
  {
    question: 'How to know if dough is over hydrated?',
    answer:
      'Over-hydrated dough refuses to hold a cohesive ball after 3–4 rounds of coil folds, puddles flat across the counter within 30 seconds of preshaping, tears when stretched, and feels soupy or greasy instead of smooth and elastic.',
  },
  {
    question: 'How does whole wheat or rye flour affect hydration?',
    answer:
      'Whole wheat and rye flours retain their bran and germ, which absorb significantly more water than white bread flour. A 75% hydration dough with 40% whole wheat feels much firmer—closer to a 68% white dough—so bakers commonly add 3% to 6% more water when raising whole-grain percentages.',
  },
  {
    question: 'What is the best sourdough calculator?',
    answer:
      'A top-tier sourdough math tool automatically splits your starter or levain into its true flour and water weights, supports flour blends and stiff starters, scales batches instantly, and works fast offline without cluttered forms—all built into this calculator.',
  },
  {
    question: 'How to tell if sourdough is good quality?',
    answer:
      'Good quality sourdough has an open, even crumb without dense gummy bands at the bottom, light and crisp caramelized crust with natural blistering, balanced lactic-tangy aroma (never harsh or chalky), and clean fermented digestibility.',
  },
];
