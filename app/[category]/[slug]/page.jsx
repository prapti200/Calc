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
      keywords: [
        'inflation calculator',
        'inflation calculator india',
        'future value of money calculator',
        'purchasing power calculator',
        'CPI inflation calculator India',
        'rupee value over time',
        'inflation adjusted return calculator',
        'historical inflation rate in India',
        'CAGR inflation formula',
        'consumer price index',
        'rbi inflation target',
        'cpi inflation',
        'mospi cpi'
      ],
      alternates: {
        canonical: '/financial/inflation-calculator',
      },
      openGraph: {
        title: 'Inflation Calculator India – Future Value & Purchasing Power',
        description: 'Free Inflation Calculator India to check future value of money, purchasing power loss, and real returns using RBI & MoSPI CPI rates. Fast, accurate & mobile-ready.',
      keywords: [
        'inflation calculator',
        'inflation calculator india',
        'future value of money calculator',
        'purchasing power calculator',
        'CPI inflation calculator India',
        'rupee value over time',
        'inflation adjusted return calculator',
        'historical inflation rate in India',
        'CAGR inflation formula',
        'consumer price index',
        'rbi inflation target',
        'cpi inflation',
        'mospi cpi'
      ],
        url: '/financial/inflation-calculator',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Inflation Calculator India – Future Value & Purchasing Power',
        description: 'Free Inflation Calculator India to check future value of money, purchasing power loss, and real returns using RBI & MoSPI CPI rates. Fast, accurate & mobile-ready.',
      keywords: [
        'inflation calculator',
        'inflation calculator india',
        'future value of money calculator',
        'purchasing power calculator',
        'CPI inflation calculator India',
        'rupee value over time',
        'inflation adjusted return calculator',
        'historical inflation rate in India',
        'CAGR inflation formula',
        'consumer price index',
        'rbi inflation target',
        'cpi inflation',
        'mospi cpi'
      ],
      },
    };
  }

    if (slug === '8th-pay-commission-salary-calculator' || slug === '8th-pay-commission' || calc?.id === 'sec-8th-pay-commission-calc') {
    return {
      title: '8th Pay Commission Salary Calculator 2026 – Fitment & Matrix',
      description: 'Free 8th Pay Commission Salary Calculator (8th CPC) to estimate your revised basic pay, HRA, TA, NPS, and net monthly in-hand salary across Pay Levels 1 to 18.',
      keywords: [
        '8th pay commission salary calculator',
        '8th cpc salary calculator',
        '8th pay commission pay matrix calculator',
        'fitment factor calculator',
        '7th vs 8th pay commission salary comparison',
        '8th pay commission expected salary hike',
        'central government employee salary calculator 2026',
        '8th pay commission fitment factor',
        'central government pay matrix',
        '8th cpc basic pay'
      ],
      alternates: {
        canonical: '/financial/8th-pay-commission-salary-calculator',
      },
      openGraph: {
        title: '8th Pay Commission Salary Calculator 2026 – Fitment & Matrix',
        description: 'Free 8th Pay Commission Salary Calculator (8th CPC) to estimate your revised basic pay, HRA, TA, NPS, and net monthly in-hand salary across Pay Levels 1 to 18.',
        keywords: [
          '8th pay commission salary calculator',
          '8th cpc salary calculator',
          '8th pay commission pay matrix calculator',
          'fitment factor calculator',
          '7th vs 8th pay commission salary comparison',
          '8th pay commission expected salary hike',
          'central government employee salary calculator 2026'
        ],
        url: '/financial/8th-pay-commission-salary-calculator',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: '8th Pay Commission Salary Calculator 2026 – Fitment & Matrix',
        description: 'Free 8th Pay Commission Salary Calculator (8th CPC) to estimate your revised basic pay, HRA, TA, NPS, and net monthly in-hand salary across Pay Levels 1 to 18.',
        keywords: [
          '8th pay commission salary calculator',
          '8th cpc salary calculator',
          '8th pay commission pay matrix calculator',
          'fitment factor calculator',
          '7th vs 8th pay commission salary comparison',
          '8th pay commission expected salary hike',
          'central government employee salary calculator 2026'
        ],
      },
    };
  }

  if (slug === 'heloc-calculator' || slug === 'heloc' || calc?.id === 'sec-heloc-calc') {
    return {
      title: 'HELOC Calculator – Monthly Draw & Repayment Payment Estimator',
      description: 'Free HELOC Calculator to estimate your monthly payment during both the interest-only draw period and principal-and-interest repayment phase, plus max credit line.',
      keywords: [
        'heloc calculator',
        'heloc calculator payment',
        'home equity line of credit calculator',
        'heloc payment calculator',
        'heloc interest only payment calculator',
        'heloc draw period and repayment period calculator',
        'combined loan to value (CLTV) calculator',
        'how much equity can I borrow',
        'heloc amortization schedule',
        'heloc rates november 2026',
        'payment shock'
      ],
      alternates: {
        canonical: '/financial/heloc-calculator',
      },
      openGraph: {
        title: 'HELOC Calculator – Monthly Draw & Repayment Payment Estimator',
        description: 'Free HELOC Calculator to estimate your monthly payment during both the interest-only draw period and principal-and-interest repayment phase, plus max credit line.',
        keywords: [
          'heloc calculator',
          'heloc calculator payment',
          'home equity line of credit calculator',
          'heloc payment calculator',
          'heloc interest only payment calculator',
          'heloc draw period and repayment period calculator',
          'combined loan to value (CLTV) calculator',
          'how much equity can I borrow',
          'heloc amortization schedule'
        ],
        url: '/financial/heloc-calculator',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'HELOC Calculator – Monthly Draw & Repayment Payment Estimator',
        description: 'Free HELOC Calculator to estimate your monthly payment during both the interest-only draw period and principal-and-interest repayment phase, plus max credit line.',
        keywords: [
          'heloc calculator',
          'heloc calculator payment',
          'home equity line of credit calculator',
          'heloc payment calculator',
          'heloc interest only payment calculator',
          'heloc draw period and repayment period calculator',
          'combined loan to value (CLTV) calculator',
          'how much equity can I borrow',
          'heloc amortization schedule'
        ],
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
  const isCpcCalc = slug === '8th-pay-commission-salary-calculator' || slug === '8th-pay-commission' || calc?.id === 'sec-8th-pay-commission-calc';

  const cpcSoftwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "8th Pay Commission Salary Calculator",
    "operatingSystem": "Any",
    "applicationCategory": "FinanceApplication",
    "description": "Free 8th Pay Commission Salary Calculator (8th CPC) to estimate your revised basic pay, HRA, TA, NPS, and net monthly in-hand salary across Pay Levels 1 to 18.",
    "keywords": "8th pay commission salary calculator, 8th cpc salary calculator, 8th pay commission pay matrix calculator, fitment factor calculator, 7th vs 8th pay commission salary comparison, 8th pay commission expected salary hike, central government employee salary calculator 2026",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    }
  };

  const cpcFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How is salary calculated under the 8th Pay Commission?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Under the 8th Pay Commission, salary is calculated by multiplying your existing 7th CPC Basic Pay by an officially notified Fitment Factor (expected between 1.92 and 2.86). This yields your revised 8th CPC Basic Pay. Allowances like House Rent Allowance (HRA: 30%, 20%, or 10% based on X, Y, or Z city class) and Transport Allowance (TA: ₹1,350 to ₹7,200 depending on Pay Level) are recalculated on the new basic pay. Mandatory deductions (10% NPS on Basic + DA, CGHS, and Income Tax TDS) are subtracted to determine monthly take-home salary."
        }
      },
      {
        "@type": "Question",
        "name": "What is the expected fitment factor for the 8th Pay Commission?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The expected fitment factor for the 8th Pay Commission is projected between 1.92 (conservative baseline) and 2.86 (staff union demand), with 2.28 considered the most probable actuarial compromise. For reference, the 7th CPC applied a fitment factor of 2.57 in 2016, and the 6th CPC applied a factor of 1.86 in 2006. The final official fitment factor will be confirmed upon Union Cabinet approval."
        }
      },
      {
        "@type": "Question",
        "name": "What will be the minimum basic salary in the 8th Pay Commission?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The minimum basic salary (Pay Level 1 entry) is expected to rise from the 7th CPC baseline of ₹18,000 to approximately ₹34,560 at a 1.92 fitment factor, ₹41,040 at a 2.28 fitment factor, or up to ₹51,480 at a 2.86 fitment factor. This represents a 92% to 186% increase in foundational basic pay before allowances."
        }
      },
      {
        "@type": "Question",
        "name": "From which date will the 8th Pay Commission be applicable?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The 8th Pay Commission is scheduled to take retrospective effect from January 1, 2026. Following the decennial timeline of past Central Pay Commissions (7th CPC effective Jan 1, 2016; 6th CPC effective Jan 1, 2006), any delay in administrative notification will be fully compensated through a retrospective lump-sum arrears payout covering all elapsed months from January 1, 2026."
        }
      },
      {
        "@type": "Question",
        "name": "What happens to Dearness Allowance (DA) when the 8th CPC is implemented?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Under standard Central Pay Commission rules, all accumulated Dearness Allowance (DA) is merged into the revised Basic Pay upon implementation, resetting the ongoing DA rate back to 0%. Fresh bi-annual DA adjustments (announced every January and July) will subsequently accrue on the newly elevated 8th CPC basic pay based on 12-month average AICPI-IW consumer price indices."
        }
      },
      {
        "@type": "Question",
        "name": "How much will minimum pension increase under the 8th Pay Commission?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Central Government minimum basic pension (currently pegged at ₹9,000 per month under 7th CPC for 50% of minimum basic) will increase proportionally with the revised basic pay. Under an expected fitment factor of 1.92 to 2.86, minimum pension will rise to between ₹17,280 and ₹25,740 per month (with ₹20,520/month at the moderate 2.28 estimate), plus Dearness Relief (DR)."
        }
      },
      {
        "@type": "Question",
        "name": "Will higher 8th CPC salary increase my Income Tax under FY 2026-27 slabs?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, higher revised basic pay increases taxable gross salary. However, under the New Tax Regime (FY 2026-27), standard deductions (₹75,000 for salaried employees) and full tax rebates under Section 87A mean total income up to ₹7,75,000 incurs zero income tax liability. For employees entering higher tax brackets (10%, 15%, 20%), employer NPS contributions (up to 14% of Basic + DA under Sec 80CCD(2)) remain fully tax-exempt."
        }
      }
    ]
  };

  const cpcBreadcrumbSchema = {
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
        "name": "8th Pay Commission Salary Calculator",
        "item": "https://calcmoderncalcultor.vercel.app/financial/8th-pay-commission-salary-calculator"
      }
    ]
  };

  const isHelocCalc = slug === 'heloc-calculator' || slug === 'heloc' || calc?.id === 'sec-heloc-calc';

  const inflationSoftwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Inflation Calculator India",
    "operatingSystem": "Any",
    "applicationCategory": "FinanceApplication",
    "description": "Free Inflation Calculator India to check future value of money, purchasing power loss, and real returns using RBI & MoSPI CPI rates. Fast, accurate & mobile-ready.",
    "keywords": "inflation calculator, inflation calculator india, future value of money calculator, purchasing power calculator, CPI inflation calculator India, rupee value over time, inflation adjusted return calculator, historical inflation rate in India, CAGR inflation formula, consumer price index, rbi inflation target, cpi inflation, mospi cpi",
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


  const helocSoftwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "HELOC Calculator",
    "operatingSystem": "Any",
    "applicationCategory": "FinanceApplication",
    "description": "Free HELOC Calculator to estimate your monthly payment during both the interest-only draw period and principal-and-interest repayment phase, plus max credit line.",
    "keywords": "heloc calculator, heloc calculator payment, home equity line of credit calculator, heloc payment calculator, heloc interest only payment calculator, heloc draw period and repayment period calculator, combined loan to value (CLTV) calculator, how much equity can I borrow, heloc amortization schedule",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const helocFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How is a HELOC monthly payment calculated?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A HELOC monthly payment is calculated in two phases: during the draw period, payments are interest-only: Payment = Balance × (APR / 12). During the repayment period, the balance fully amortizes over the remaining term (typically 20 years) combining principal and interest using the standard amortization formula."
        }
      },
      {
        "@type": "Question",
        "name": "What is the monthly payment on a $50,000 HELOC?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "At a benchmark rate of 7.50% APR, the monthly payment on a $50,000 HELOC during a 10-year interest-only draw period is $312.50 per month. During a subsequent 20-year repayment period, the monthly payment resets to $402.80 per month (a +$90.30/mo jump)."
        }
      },
      {
        "@type": "Question",
        "name": "What is the monthly payment on a $100,000 HELOC?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "At 7.50% APR, the monthly payment on a $100,000 HELOC is $625.00 per month during the interest-only draw period, and $805.59 per month during a 20-year repayment period."
        }
      },
      {
        "@type": "Question",
        "name": "How much home equity do I need to qualify for a HELOC?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most lenders require homeowners to retain at least 15% to 20% equity in their home, capping the Combined Loan-to-Value (CLTV) ratio at 80% to 85% across all mortgage balances."
        }
      },
      {
        "@type": "Question",
        "name": "What happens when my HELOC draw period ends?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "When the draw period ends (typically after 10 years), withdrawal privileges freeze and the loan automatically converts into a fully amortizing repayment phase, causing payments to jump to cover both principal reduction and interest."
        }
      },
      {
        "@type": "Question",
        "name": "Are HELOC interest payments tax-deductible?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Under current IRS tax rules through 2026, HELOC interest is tax-deductible only if the borrowed funds are used to buy, build, or substantially improve the home securing the loan."
        }
      },
      {
        "@type": "Question",
        "name": "Can I pay off my HELOC early without a penalty?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most lenders permit early payoff without a prepayment penalty, though some charge an early closure fee ($300 to $500) if the line of credit is formally closed within the first 24 to 36 months."
        }
      }
    ]
  };

  const helocBreadcrumbSchema = {
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
        "name": "HELOC Calculator",
        "item": "https://calcmoderncalcultor.vercel.app/financial/heloc-calculator"
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
      {isCpcCalc && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(cpcSoftwareSchema) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(cpcFaqSchema) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(cpcBreadcrumbSchema) }}
          />
        </>
      )}
      {isHelocCalc && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(helocSoftwareSchema) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(helocFaqSchema) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(helocBreadcrumbSchema) }}
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
