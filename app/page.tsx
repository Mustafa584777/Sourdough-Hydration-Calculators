import { Header } from '@/components/Header';
import { SourdoughCalculator } from '@/components/SourdoughCalculator';
import { EditorialSections } from '@/components/EditorialSections';
import { Footer } from '@/components/Footer';
import { FAQ_ITEMS } from '@/lib/sourdough-math';

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Sourdough Hydration Calculator',
  url: 'https://sourdoughhydrationcalculator.online',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  browserRequirements: 'Requires JavaScript',
  description:
    "Free online sourdough hydration calculator with starter & levain math. Calculate true dough hydration, baker's percentages, flour blends, and scale recipes in grams or ounces.",
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  featureList: [
    'True Baker Percentage & Starter Hydration Math',
    'Grams and Ounces Instant Unit Conversion',
    'Multi-Flour Blend Builder (Up to 3 Flours)',
    'Target Hydration Reverse Calculator Mode',
    'Recipe Batch Scaler & Shareable PNG Formula Card',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <SourdoughCalculator />
          <EditorialSections />
        </main>
        <Footer />
      </div>
    </>
  );
}
