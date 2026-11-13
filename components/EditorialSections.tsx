import { FAQ_ITEMS, HYDRATION_CHART_ROWS } from '@/lib/sourdough-math';
import { FaqAccordion } from '@/components/FaqAccordion';
import { PresetLoaderButton } from '@/components/PresetLoaderButton';

export function EditorialSections() {
  return (
    <div className="no-print border-t border-stone-200/90 bg-white">
      <div className="mx-auto max-w-6xl space-y-16 px-4 py-14 sm:px-6 sm:py-16">
        {/* 1. Sourdough Hydration Chart (55% to 90%) */}
        <section id="hydration-chart" aria-labelledby="hydration-chart-heading">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-stone-500">
              01 · Reference Guide
            </p>
            <h2
              id="hydration-chart-heading"
              className="mt-2 font-serif text-2xl font-semibold tracking-tight text-[#1C1917] sm:text-3xl [text-wrap:balance]"
            >
              Sourdough Hydration Chart (55% to 90%+)
            </h2>
            <p className="mt-2.5 text-sm leading-relaxed text-stone-600 sm:text-base">
              Hydration shapes everything from dough extensibility to oven spring and
              crumb openness. Use this chart to match your target hydration to the bread
              style you want to bake.
            </p>
          </div>

          {/* Mobile Card List */}
          <div className="mt-6 space-y-3 md:hidden">
            {HYDRATION_CHART_ROWS.map((row) => (
              <div
                key={row.range}
                className="rounded-xl border border-stone-200 bg-white p-4 space-y-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-sm font-semibold text-[#C2410C] tabular-nums">
                    {row.range}
                  </span>
                  <span className="text-xs font-semibold text-stone-600">
                    Difficulty: {row.difficulty}
                  </span>
                </div>
                <p className="text-sm font-semibold text-[#1C1917]">
                  {row.breadStyle}
                </p>
                <p className="text-xs leading-relaxed text-stone-600">
                  {row.crumbAndCrust}
                </p>
                {row.presetId && (
                  <div className="pt-1">
                    <PresetLoaderButton presetId={row.presetId} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Table */}
          <div className="mt-6 hidden overflow-x-auto rounded-2xl border border-stone-200 md:block">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-stone-200 bg-[#FAF8F5] text-xs font-semibold uppercase tracking-wider text-stone-500">
                  <th className="px-5 py-3.5">Hydration %</th>
                  <th className="px-5 py-3.5">Bread Style</th>
                  <th className="px-5 py-3.5">Crumb &amp; Crust Profile</th>
                  <th className="px-5 py-3.5">Handling Difficulty</th>
                  <th className="px-5 py-3.5 text-right">Calculator</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200/80 bg-white">
                {HYDRATION_CHART_ROWS.map((row) => (
                  <tr key={row.range} className="hover:bg-[#FAF8F5]/60">
                    <td className="px-5 py-4 font-mono font-semibold text-[#C2410C] whitespace-nowrap tabular-nums">
                      {row.range}
                    </td>
                    <td className="px-5 py-4 font-semibold text-[#1C1917]">
                      {row.breadStyle}
                    </td>
                    <td className="px-5 py-4 text-stone-600 leading-relaxed">
                      {row.crumbAndCrust}
                    </td>
                    <td className="px-5 py-4 font-medium text-stone-700 whitespace-nowrap">
                      {row.difficulty}
                    </td>
                    <td className="px-5 py-4 text-right">
                      {row.presetId ? (
                        <PresetLoaderButton presetId={row.presetId} />
                      ) : (
                        <span className="text-xs text-stone-400">Custom</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 2. How to Calculate Sourdough Hydration with Starter */}
        <section id="formula-guide" aria-labelledby="formula-guide-heading">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <article className="lg:col-span-7">
              <p className="text-xs font-semibold uppercase tracking-widest text-stone-500">
                02 · Baker&apos;s Math
              </p>
              <h2
                id="formula-guide-heading"
                className="mt-2 font-serif text-2xl font-semibold tracking-tight text-[#1C1917] sm:text-3xl [text-wrap:balance]"
              >
                How to Calculate Sourdough Hydration with Starter
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-stone-700 sm:text-base">
                <p>
                  In commercial yeast baking, hydration is simply water divided by flour.
                  In naturally leavened bread, your <strong>sourdough starter (levain)</strong>{' '}
                  contains both flour and water—so ignoring it underestimates your true
                  dough hydration, especially when using a 50% stiff levain or high
                  inoculation.
                </p>
                <p>
                  To calculate <strong>true sourdough hydration</strong>, split the starter
                  into its flour and water components first, add them to your main bowl
                  totals, and divide total water by total flour:
                </p>

                <ol className="list-decimal space-y-2.5 pl-5 text-stone-700">
                  <li>
                    <strong>Find Starter Flour:</strong> Divide starter weight by{' '}
                    <code className="rounded bg-stone-100 px-1.5 py-0.5 font-mono text-xs text-[#1C1917]">
                      1 + (Starter Hydration % / 100)
                    </code>
                    . For a 100% hydration starter, divide by 2.
                  </li>
                  <li>
                    <strong>Find Starter Water:</strong> Subtract Starter Flour from total
                    Starter Weight.
                  </li>
                  <li>
                    <strong>Sum Total Flour &amp; Total Water:</strong> Add Starter Flour to
                    your added flours, and Starter Water to your added water.
                  </li>
                  <li>
                    <strong>Divide Water by Flour:</strong>{' '}
                    <code className="rounded bg-stone-100 px-1.5 py-0.5 font-mono text-xs text-[#1C1917]">
                      True Hydration % = (Total Water / Total Flour) × 100
                    </code>
                    .
                  </li>
                </ol>
              </div>
            </article>

            {/* Worked Example Column */}
            <aside className="rounded-2xl border border-stone-200 bg-[#FAF8F5] p-6 lg:col-span-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                Worked Example · Classic Country Loaf
              </p>
              <h3 className="mt-1 font-serif text-xl font-semibold text-[#1C1917]">
                450g Flour + 340g Water + 100g Starter
              </h3>
              <p className="mt-2 text-sm text-stone-600">
                Assuming a standard <strong>100% hydration liquid starter</strong> (1:1
                flour to water):
              </p>

              <dl className="mt-4 divide-y divide-stone-200/90 text-sm">
                <div className="flex justify-between py-2.5">
                  <dt className="text-stone-600">Starter Flour (100g ÷ 2)</dt>
                  <dd className="font-mono font-semibold text-[#1C1917] tabular-nums">
                    50g
                  </dd>
                </div>
                <div className="flex justify-between py-2.5">
                  <dt className="text-stone-600">Starter Water (100g − 50g)</dt>
                  <dd className="font-mono font-semibold text-[#1C1917] tabular-nums">
                    50g
                  </dd>
                </div>
                <div className="flex justify-between py-2.5">
                  <dt className="text-stone-600">Total Flour (450g + 50g)</dt>
                  <dd className="font-mono font-semibold text-[#1C1917] tabular-nums">
                    500g
                  </dd>
                </div>
                <div className="flex justify-between py-2.5">
                  <dt className="text-stone-600">Total Water (340g + 50g)</dt>
                  <dd className="font-mono font-semibold text-[#1C1917] tabular-nums">
                    390g
                  </dd>
                </div>
                <div className="flex justify-between py-2.5">
                  <dt className="font-semibold text-[#1C1917]">
                    True Hydration (390g ÷ 500g)
                  </dt>
                  <dd className="font-mono font-bold text-[#C2410C] tabular-nums">
                    78.0%
                  </dd>
                </div>
              </dl>

              <p className="mt-3 text-xs leading-relaxed text-stone-500">
                Notice the difference: skipping the starter math yields 340 ÷ 450 = 75.6%,
                a 2.4% error that changes dough handling in the bowl.
              </p>
            </aside>
          </div>
        </section>

        {/* 3. Frequently Asked Questions */}
        <section id="faq" aria-labelledby="faq-heading">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-stone-500">
                03 · Common Questions
              </p>
              <h2
                id="faq-heading"
                className="mt-2 font-serif text-2xl font-semibold tracking-tight text-[#1C1917] sm:text-3xl [text-wrap:balance]"
              >
                Frequently Asked Questions
              </h2>
              <p className="mt-2.5 text-sm leading-relaxed text-stone-600">
                Essential baker&apos;s math answers covering starter inoculation, stiff
                levains, and whole-grain water absorption.
              </p>
            </div>

            <div className="lg:col-span-8">
              <FaqAccordion items={FAQ_ITEMS} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
