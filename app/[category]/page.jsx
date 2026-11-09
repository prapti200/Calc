import { getAppHtml } from '@/lib/template';
import { getAllCategories, getCalc, STANDALONE_PAGES, normalizeSuiteKey } from '@/lib/registry';
import OmniCalcClient from '@/components/OmniCalcClient';

export async function generateStaticParams() {
  const categories = getAllCategories();
  const pages = Object.keys(STANDALONE_PAGES);
  const extra = ['standard-calculator', 'scientific-calculator'];
  const allParams = Array.from(new Set([...categories, ...pages, ...extra]));
  return allParams.map(category => ({ category }));
}

export async function generateMetadata({ params }) {
  const { category } = params;
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

