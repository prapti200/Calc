import { getAppHtml } from '@/lib/template';
import { getAllStaticCalcParams, getCalc } from '@/lib/registry';
import OmniCalcClient from '@/components/OmniCalcClient';

export async function generateStaticParams() {
  return getAllStaticCalcParams();
}

export async function generateMetadata({ params }) {
  const { category, slug } = params;
  const calc = getCalc(category, slug);

  if (slug === 'bike-emi-calculator' || slug === 'loan-calculator' || calc?.id === 'sec-loan-calc') {
    return {
      title: 'Bike EMI Calculator – Two-Wheeler, Car & Loan EMI Calculator',
      description: 'Calculate your monthly installments instantly with our free Bike EMI Calculator. Check exact interest and repayment schedules for two-wheeler, car, and personal loans.',
      alternates: {
        canonical: '/financial/bike-emi-calculator',
      },
      openGraph: {
        title: 'Bike EMI Calculator – Two-Wheeler, Car & Loan EMI Calculator',
        description: 'Calculate your monthly installments instantly with our free Bike EMI Calculator. Check exact interest and repayment schedules for two-wheeler, car, and personal loans.',
        url: '/financial/bike-emi-calculator',
      },
    };
  }

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

  const isBikeCalc = slug === 'bike-emi-calculator' || slug === 'loan-calculator';

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Bike EMI Calculator",
    "operatingSystem": "Any",
    "applicationCategory": "FinanceApplication",
    "description": "Calculate your monthly installments instantly with our free Bike EMI Calculator. Check exact interest and repayment schedules for two-wheeler, car, and personal loans.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How is bike EMI calculated?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Bike EMI is calculated using the reducing-balance formula: EMI = P × r × (1 + r)^n / ((1 + r)^n - 1), where P is the principal loan amount, r is the monthly interest rate (annual rate divided by 12 and 100), and n is the tenure in months."
        }
      },
      {
        "@type": "Question",
        "name": "Can I use this tool as a car loan EMI calculator?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, absolutely. By clicking the Car Loan preset or adjusting the sliders to your vehicle's loan amount (e.g. ₹8,00,000) and tenure (e.g. 5 years), this universal EMI engine computes the exact monthly installment, interest liability, and amortization schedule for auto loans."
        }
      },
      {
        "@type": "Question",
        "name": "Does a longer loan tenure reduce my monthly EMI?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Choosing a longer tenure spreads the principal repayment across more months, resulting in a lower monthly EMI. However, interest accrues over a longer period, which increases the total cumulative interest paid over the life of the loan."
        }
      },
      {
        "@type": "Question",
        "name": "What is the typical interest rate for a two-wheeler loan in India?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Two-wheeler and bike loan interest rates in India typically range from 9.5% to 18% per annum, depending on the lender, loan amount, your credit score (CIBIL), and whether the vehicle is new or pre-owned."
        }
      }
    ]
  };

  return (
    <>
      {isBikeCalc && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
          />
        </>
      )}
      <OmniCalcClient initialHtml={html} />
    </>
  );
}
