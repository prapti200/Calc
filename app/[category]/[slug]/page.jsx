import { getAppHtml } from '@/lib/template';
import { getAllStaticCalcParams, getCalc } from '@/lib/registry';
import OmniCalcClient from '@/components/OmniCalcClient';

export async function generateStaticParams() {
  return getAllStaticCalcParams();
}

export async function generateMetadata({ params }) {
  const { category, slug } = params;
  const calc = getCalc(category, slug);

  if (slug === 'inflation-calculator' || slug === 'inflation' || calc?.id === 'sec-inflation-calc') {
    return {
      title: 'Inflation Calculator India – Future Value & Purchasing Power',
      description: 'Free Inflation Calculator India to check future value of money, purchasing power loss, and real returns using RBI & MoSPI CPI rates. Fast, accurate & mobile-ready.',
      alternates: {
        canonical: '/financial/inflation-calculator',
      },
      openGraph: {
        title: 'Inflation Calculator India – Future Value & Purchasing Power',
        description: 'Free Inflation Calculator India to check future value of money, purchasing power loss, and real returns using RBI & MoSPI CPI rates. Fast, accurate & mobile-ready.',
        url: '/financial/inflation-calculator',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Inflation Calculator India – Future Value & Purchasing Power',
        description: 'Free Inflation Calculator India to check future value of money, purchasing power loss, and real returns using RBI & MoSPI CPI rates. Fast, accurate & mobile-ready.',
      },
    };
  }

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
  const calc = getCalc(category, slug);
  const html = getAppHtml(`${category}/${slug}`);

  const isBikeCalc = slug === 'bike-emi-calculator' || slug === 'loan-calculator' || calc?.id === 'sec-loan-calc';
  const isInflationCalc = slug === 'inflation-calculator' || slug === 'inflation' || calc?.id === 'sec-inflation-calc';

  const inflationSoftwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Inflation Calculator India",
    "operatingSystem": "Any",
    "applicationCategory": "FinanceApplication",
    "description": "Free Inflation Calculator India to check future value of money, purchasing power loss, and real returns using RBI & MoSPI CPI rates. Fast, accurate & mobile-ready.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    }
  };

  const inflationFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is an inflation calculator and how does it work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "An inflation calculator is an online financial modeling tool that computes how rising price levels decrease the purchasing power of money over time. By applying the compound inflation formula FV = PV × (1 + r)^n, it projects the future cost of today's goods and reveals the real, inflation-eroded value of your savings across any selected time horizon."
        }
      },
      {
        "@type": "Question",
        "name": "How is inflation calculated in India?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "India measures retail inflation through the Consumer Price Index (CPI), compiled and released monthly by the Ministry of Statistics and Programme Implementation (MoSPI) using the revised 2024=100 base series. CPI monitors price changes across a representative consumption basket encompassing food and beverages, fuel and light, clothing, housing, and miscellaneous services. Wholesale inflation is separately tracked through the Wholesale Price Index (WPI) published by the Office of the Economic Adviser."
        }
      },
      {
        "@type": "Question",
        "name": "What is the average inflation rate in India to use for retirement planning?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For comprehensive retirement planning in India, certified financial planners advise assuming a conservative long-term baseline inflation rate of 6.0% per annum for standard household and lifestyle expenses. However, for specialized expenditure baskets such as healthcare, hospital treatments, and children's higher education, dedicated category rates of 8% to 10% per annum should be modeled to avoid severe retirement corpus deficits."
        }
      },
      {
        "@type": "Question",
        "name": "What is the RBI's inflation target in India?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Reserve Bank of India (RBI), under the flexible inflation targeting framework established with the Ministry of Finance, has set a medium-term headline retail CPI target of 4.0% with a tolerance band of ±2% (ranging between 2.0% and 6.0%) for the five-year monetary policy horizon extending through 2026–2031."
        }
      },
      {
        "@type": "Question",
        "name": "How much will ₹1 lakh be worth after 10 or 20 years?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "At a standard 6.0% annual inflation rate, ₹1,00,000 (1 Lakh) today will have a real purchasing power of approximately ₹55,839 after 10 years (representing a 44.2% loss in real value). After 20 years, its purchasing power will erode to just ₹31,180 (a 68.8% loss in value). Conversely, purchasing a basket of goods costing ₹1,00,000 today will require ₹1,79,085 in 10 years and ₹3,20,714 in 20 years."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between nominal return and real inflation-adjusted return?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nominal return is the unadjusted percentage gain produced by an investment before accounting for taxes and inflation. Real inflation-adjusted return, calculated via the Fisher Equation Real Return = [(1 + Nominal) / (1 + Inflation)] - 1, measures the true expansion in your purchasing power. For example, an investment earning 6.5% nominal return when inflation is 6.0% delivers a true pre-tax real return of only +0.47%."
        }
      },
      {
        "@type": "Question",
        "name": "How can I beat inflation in India?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To consistently beat inflation in India, capital must be allocated into productive growth asset classes that historically outpace retail CPI. Core inflation-beating instruments include diversified equity mutual funds and index funds (Nifty 50 and Sensex historically yielding 11%–13% CAGR over 10+ years), National Pension System (NPS) Tier-1 equity schemes, Sovereign Gold Bonds (SGBs) or physical gold as a monetary debasement hedge, and commercial real estate or REITs with contractual rent escalation clauses."
        }
      }
    ]
  };

  const inflationBreadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://calcmoderncalcultor.vercel.app/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Financial Calculators",
        "item": "https://calcmoderncalcultor.vercel.app/financial"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Inflation Calculator India",
        "item": "https://calcmoderncalcultor.vercel.app/financial/inflation-calculator"
      }
    ]
  };


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
      {isInflationCalc && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(inflationSoftwareSchema) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(inflationFaqSchema) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(inflationBreadcrumbSchema) }}
          />
        </>
      )}

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
