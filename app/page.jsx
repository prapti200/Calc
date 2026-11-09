import { getAppHtml } from '@/lib/template';
import OmniCalcClient from '@/components/OmniCalcClient';

export const metadata = {
  title: 'CALC• Modern Calculator - Professional All-In-One Calculation Suite',
  description: '100% Client-Side Calculation Suite for Finance, Health, Math, and Daily Utilities. Over 189 interactive calculators.',
};

export default function HomePage() {
  const html = getAppHtml('/');
  return <OmniCalcClient initialHtml={html} />;
}

