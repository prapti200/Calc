import { getAppHtml } from '@/lib/template';
import { getAllStaticCalcParams, getCalc } from '@/lib/registry';
import OmniCalcClient from '@/components/OmniCalcClient';

export async function generateStaticParams() {
  return getAllStaticCalcParams();
}

export async function generateMetadata({ params }) {
  const { category, slug } = params;
  const calc = getCalc(category, slug);

  if (calc) {
    return {
      title: `${calc.title} | CALC• Modern Calculator`,
      description: `Use the free, interactive ${calc.title} on CALC• Modern Calculator - 100% client-side precision calculations, instantaneous results, and comprehensive benchmarks.`,
      openGraph: {
        title: `${calc.title} | CALC• Modern Calculator`,
        description: `100% Client-Side calculation for ${calc.title}.`,
      },
    };
  }

  return {
    title: 'Calculator | CALC• Modern Calculator',
  };
}

export default function CalculatorPage({ params }) {
  const { category, slug } = params;
  const html = getAppHtml(`${category}/${slug}`);
  return <OmniCalcClient initialHtml={html} />;
}

