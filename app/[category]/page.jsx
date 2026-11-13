import { getAppHtml } from '@/lib/template';
import { getAllSingleSegmentParams, getCalc, STANDALONE_PAGES, normalizeSuiteKey } from '@/lib/registry';
import OmniCalcClient from '@/components/OmniCalcClient';

export async function generateStaticParams() {
  const allParams = getAllSingleSegmentParams();
  return allParams.map(category => ({ category }));
}

export async function generateMetadata({ params }) {
  const { category } = params;
  const lower = (category || '').toLowerCase();

  if (lower === 'scientific' || lower === 'sci' || lower === 'scientific-calculator') {
    return {
      title: 'Scientific Calculator | CALC• Modern Calculator',
      description: 'High-precision interactive scientific calculator with trigonometry, logarithms, powers, and full evaluation history.'
    };
  }

  if (lower === 'standard' || lower === 'standard-calculator') {
    return {
      title: 'Standard Calculator | CALC• Modern Calculator',
      description: 'Clean, responsive standard 4-function calculator with active memory registers.'
    };
  }

  if (STANDALONE_PAGES[category]) {
    return {
      title: `${STANDALONE_PAGES[category].title} | CALC• Modern Calculator`,
    };
  }

  const calc = getCalc(category);
  if (calc) {
    return {
      title: `${calc.title} | CALC• Modern Calculator`,
      description: `Use the free, interactive ${calc.title} on CALC• Modern Calculator.`,
    };
  }

  const normalized = normalizeSuiteKey(category);
  const titles = {
    financial: 'Financial Calculators Suite | CALC• Modern Calculator',
    fitness: 'Health & Fitness Calculators Suite | CALC• Modern Calculator',
    math: 'Math & Algebra Solvers | CALC• Modern Calculator',
    other: 'Daily Utilities & Tools | CALC• Modern Calculator',
    standard: 'Standard & Scientific Calculator | CALC• Modern Calculator',
  };

  return {
    title: titles[normalized] || 'CALC• Modern Calculator',
  };
}

export default function CategoryPage({ params }) {
  const { category } = params;
  const html = getAppHtml(category);
  return <OmniCalcClient initialHtml={html} />;
}

