import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { SourdoughCalculator } from '@/components/SourdoughCalculator';
import { EditorialSections } from '@/components/EditorialSections';
import { Footer } from '@/components/Footer';
import { FAQ_ITEMS } from '@/lib/editorial-data';

export const dynamic = 'force-static';
export const revalidate = 604800;

const HOME_TITLE = "Sourdough Hydration Calculator – True Baker's Percentage Tool";
const HOME_DESCRIPTION =
  "Free Sourdough Hydration Calculator online with starter math. Calculate true dough hydration, baker's percentages, and scale loaves in grams or ounces.";

export const metadata: Metadata = {
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  alternates: {
    canonical: 'https://sourdoughhydrationcalculator.online/',
  },
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: 'https://sourdoughhydrationcalculator.online/',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
  },
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Sourdough Hydration Calculator',
  url: 'https://sourdoughhydrationcalculator.online/',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  browserRequirements: 'Requires JavaScript',
  description: HOME_DESCRIPTION,
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  featureList: [
    "True Baker's Percentage & Starter Hydration Math",
    'Grams and Ounces Instant Unit Conversion',
    'Multi-Flour Blend Builder (Up to 3 Flours)',
    'Target Hydration Reverse Calculator Mode',
    'Recipe Batch Scaler & Shareable PNG Formula Card',
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Sourdough Hydration with Starter',
  description:
    'Step-by-step method to calculate true sourdough dough hydration by splitting your sourdough starter into flour and water weights before computing baker percentages.',
  totalTime: 'PT2M',
  tool: [
    {
      '@type': 'HowToTool',
      name: 'Sourdough Hydration Calculator',
    },
    {
      '@type': 'HowToTool',
      name: 'Digital Kitchen Scale',
    },
  ],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Find Starter Flour Weight',
      text: 'Divide your sourdough starter weight by (1 + Starter Hydration % / 100). For a 100% hydration liquid starter, divide the starter weight by 2.',
      url: 'https://sourdoughhydrationcalculator.online/#formula-guide',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Find Starter Water Weight',
      text: 'Subtract the starter flour weight from the total starter weight to isolate the exact grams of water contributed by your levain.',
      url: 'https://sourdoughhydrationcalculator.online/#formula-guide',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Sum Total Flour and Total Water',
      text: 'Add starter flour to all added flours in your recipe to get Total Flour, and add starter water to your added mixing water to get Total Water.',
      url: 'https://sourdoughhydrationcalculator.online/#formula-guide',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Divide Total Water by Total Flour',
      text: 'Compute True Hydration % = (Total Water / Total Flour) × 100 to reveal your accurate dough hydration percentage.',
      url: 'https://sourdoughhydrationcalculator.online/#formula-guide',
    },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <SourdoughCalculator
            heroIntro={
              <div className="max-w-2xl">
                <h1 className="font-serif text-3xl font-semibold tracking-tight text-[#1C1917] sm:text-4xl [text-wrap:balance]">
                  Sourdough Hydration Calculator
                </h1>
                <p className="mt-1.5 text-sm leading-relaxed text-stone-600 sm:text-base">
                  Use this free{' '}
                  <strong className="font-semibold text-[#1C1917]">
                    Sourdough Hydration Calculator
                  </strong>{' '}
                  to calculate true dough hydration, baker&apos;s percentages, and starter
                  flour-water ratios in real time.
                </p>
              </div>
            }
          />
          <EditorialSections />
        </main>
        <Footer />
      </div>
    </>
  );
}
