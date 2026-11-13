import { getAppHtml } from '@/lib/template';
import OmniCalcClient from '@/components/OmniCalcClient';

export const metadata = {
  title: 'CALC• Modern Calculator - Professional Calculation Suite',
  description: '100% Client-Side calculation suite with 189 professional calculators for Finance, Fitness, Math, and Utilities.',
};

export default function NotFound() {
  const html = getAppHtml('all');
  return <OmniCalcClient initialHtml={html} />;
}

