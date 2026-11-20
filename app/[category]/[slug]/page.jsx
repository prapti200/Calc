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

        if (slug === 'body-fat-calculator' || slug === 'body-fat' || slug === 'bf' || calc?.id === 'sec-bf-calc') {
    return {
      title: 'Body Fat Calculator – Free US Navy & BMI Fat % Estimator',
      description: 'Calculate your body fat percentage, fat mass, and lean body mass instantly with our free Body Fat Calculator using the U.S. Navy tape method and BMI formula.',
      keywords: [
        'body fat calculator',
        'body fat percentage calculator',
        'us navy body fat calculator',
        'body fat calculator men',
        'body fat calculator women',
        'lean body mass calculator'
      ],
      alternates: {
        canonical: '/body-fat-calculator',
      },
      openGraph: {
        title: 'Body Fat Calculator – Free US Navy & BMI Fat % Estimator',
        description: 'Calculate your body fat percentage, fat mass, and lean body mass instantly with our free Body Fat Calculator using the U.S. Navy tape method and BMI formula.',
        keywords: [
          'body fat calculator',
          'body fat percentage calculator',
          'us navy body fat calculator',
          'body fat calculator men',
          'body fat calculator women',
          'lean body mass calculator'
        ],
        url: '/body-fat-calculator',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Body Fat Calculator – Free US Navy & BMI Fat % Estimator',
        description: 'Calculate your body fat percentage, fat mass, and lean body mass instantly with our free Body Fat Calculator using the U.S. Navy tape method and BMI formula.',
        keywords: [
          'body fat calculator',
          'body fat percentage calculator',
          'us navy body fat calculator',
          'body fat calculator men',
          'body fat calculator women',
          'lean body mass calculator'
        ],
      },
    };
  }

if (slug === 'salary-calculator' || slug === 'salary' || calc?.id === 'sec-salary-calc') {
    return {
      title: 'Salary Calculator – In Hand, ADP & 8th Pay Commission (2026)',
      description: 'Free online Salary Calculator to check monthly take-home pay. Use our In Hand Salary Calculator, ADP Salary Calculator paycheck estimator, and 8th Pay Commission Salary Calculator.',
      keywords: [
        'salary calculator',
        'in hand salary calculator',
        'adp salary calculator',
        '8th pay commission salary calculator',
        'ctc to in hand salary',
        'take home pay calculator',
        'paycheck estimator',
        '8th cpc salary calculator',
        'fitment factor calculator',
        'gross to net salary',
        'fy 2026-27 salary calculator'
      ],
      alternates: {
        canonical: '/financial/salary-calculator',
      },
      openGraph: {
        title: 'Salary Calculator – In Hand, ADP & 8th Pay Commission (2026)',
        description: 'Free online Salary Calculator to check monthly take-home pay. Use our In Hand Salary Calculator, ADP Salary Calculator paycheck estimator, and 8th Pay Commission Salary Calculator.',
        keywords: [
          'salary calculator',
          'in hand salary calculator',
          'adp salary calculator',
          '8th pay commission salary calculator'
        ],
        url: '/financial/salary-calculator',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Salary Calculator – In Hand, ADP & 8th Pay Commission (2026)',
        description: 'Free online Salary Calculator to check monthly take-home pay. Use our In Hand Salary Calculator, ADP Salary Calculator paycheck estimator, and 8th Pay Commission Salary Calculator.',
        keywords: [
          'salary calculator',
          'in hand salary calculator',
          'adp salary calculator',
          '8th pay commission salary calculator'
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
    const isBfCalc = slug === 'body-fat-calculator' || slug === 'body-fat' || slug === 'bf' || calc?.id === 'sec-bf-calc';

  const bfSoftwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Body Fat Calculator – US Navy & BMI Fat % Estimator",
    "operatingSystem": "Any",
    "applicationCategory": "HealthApplication",
    "description": "Calculate your body fat percentage, fat mass, and lean body mass instantly with our free Body Fat Calculator using the U.S. Navy tape method and BMI formula.",
    "keywords": "body fat calculator, body fat percentage calculator, us navy body fat calculator, body fat calculator men, body fat calculator women, lean body mass calculator",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const bfFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How accurate is the U.S. Navy body fat calculator?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The U.S. Navy body fat calculator is clinically proven to have an error margin of approximately ±3% to ±4% compared to dual-energy X-ray absorptiometry (DEXA) scans and hydrostatic underwater weighing. Developed by researchers Hodgdon and Beckett at the Naval Health Research Center, it is widely utilized across military branches, police academies, and collegiate athletic programs due to its outstanding balance of high mathematical accuracy, low cost, and reproducibility without clinical equipment."
        }
      },
      {
        "@type": "Question",
        "name": "What is a healthy body fat percentage for men and women?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "According to the American Council on Exercise (ACE), a healthy body fat range for adult men is 14% to 24% (with 6% to 13% for athletes, and 14% to 17% for general fitness enthusiasts). For adult women, the healthy range is 21% to 31% (with 14% to 20% for athletes, and 21% to 24% for fitness enthusiasts). Women require higher essential adipose levels (10% to 13%) than men (2% to 5%) to support hormonal equilibrium, menstrual regularity, and reproductive health."
        }
      },
      {
        "@type": "Question",
        "name": "How do I calculate lean body mass from body fat percentage?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In this lean body mass calculator, lean body mass (LBM) is calculated by multiplying your total body weight by your body fat percentage to find fat mass, then subtracting that fat mass from total body weight: Fat Mass = Total Weight × (Body Fat % / 100) and Lean Body Mass = Total Weight − Fat Mass. Lean body mass accounts for skeletal muscle, bone density, organs, blood volume, and intracellular water."
        }
      },
      {
        "@type": "Question",
        "name": "Why is body fat percentage more useful than BMI alone?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Body Mass Index (BMI) evaluates only gross weight relative to stature squared (kg/m²). It completely fails to differentiate between adipose tissue and lean skeletal muscle. For example, athletes and weightlifters with low body fat (10%) are routinely flagged as 'obese' under BMI tables. Conversely, sedentary individuals with 'normal' BMI may suffer from 'sarcopenic obesity' (normal weight but excessive visceral fat and depleted muscle mass). Tracking body fat percentage ensures you are burning body fat rather than sacrificing precious metabolic muscle tissue during weight loss."
        }
      }
    ]
  };

  const bfBreadcrumbSchema = {
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
        "name": "Health & Fitness Calculators",
        "item": "https://calcmoderncalcultor.vercel.app/fitness"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Body Fat Calculator",
        "item": "https://calcmoderncalcultor.vercel.app/body-fat-calculator"
      }
    ]
  };

const isSalaryCalc = slug === 'salary-calculator' || slug === 'salary' || calc?.id === 'sec-salary-calc';

  const salarySoftwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Salary Calculator – In Hand, ADP & 8th Pay Commission",
    "operatingSystem": "Any",
    "applicationCategory": "FinanceApplication",
    "description": "Free online Salary Calculator to check monthly take-home pay. Use our In Hand Salary Calculator, ADP Salary Calculator paycheck estimator, and 8th Pay Commission Salary Calculator.",
    "keywords": "salary calculator, in hand salary calculator, adp salary calculator, 8th pay commission salary calculator",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    }
  };

  const salaryFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How accurate is this salary calculator?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "This salary calculator provides institutional-grade mathematical accuracy by applying official statutory payroll formulas. The In Hand Salary mode incorporates the latest FY 2026-27 Union Budget tax slabs (including the enhanced ₹75,000 standard deduction and Section 87A full rebate for taxable income up to ₹12 Lakhs), the Employees' Provident Fund Act (12% and ₹1,800 cap), and state Professional Tax schedules. The ADP mode calculates standard US federal and state withholding models, and the 8th Pay Commission mode uses established Central Pay Commission merger mechanics."
        }
      },
      {
        "@type": "Question",
        "name": "How do I calculate monthly take-home in the in hand salary calculator?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In the in hand salary calculator tab, simply input your annual Cost to Company (CTC) package and configure your Basic Pay percentage (typically 50%). The calculator automatically subtracts employer-side retirement accruals (Employer EPF and statutory gratuity) to arrive at Gross Salary, then deducts Employee EPF (12%), monthly Professional Tax (₹200), and income tax TDS to yield your exact net take-home salary deposited each month."
        }
      },
      {
        "@type": "Question",
        "name": "How does the ADP salary calculator mode differ from CTC calculation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The adp salary calculator mode is designed for gross-to-net paycheck calculations rather than annual CTC packages. Instead of deducting employer costs from an overall package, it starts directly with your gross wage per pay period (Bi-Weekly, Semi-Monthly, Weekly, or Monthly) and itemizes pre-tax retirement deductions (401k/NPS), statutory social insurance (FICA 6.2% Social Security + 1.45% Medicare), and income tax withholding to show your exact check-by-check take-home pay."
        }
      },
      {
        "@type": "Question",
        "name": "What fitment factor does the 8th pay commission salary calculator use?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our 8th pay commission salary calculator provides multiple fitment factor scenarios based on proposals submitted by staff associations and central employee confederations: 2.10 (conservative baseline), 2.28 (parity hike), 2.57 (matching the 7th CPC fitment factor benchmark), and 2.86 (ambitious proposal). You can also adjust the custom fitment slider anywhere between 1.80 and 3.50 to test custom revision models while accounting for X, Y, and Z city HRA revisions."
        }
      }
    ]
  };

  const salaryBreadcrumbSchema = {
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
        "name": "Salary Calculator",
        "item": "https://calcmoderncalcultor.vercel.app/financial/salary-calculator"
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
      {isBfCalc && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(bfSoftwareSchema) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(bfFaqSchema) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(bfBreadcrumbSchema) }}
          />
        </>
      )}
      {isSalaryCalc && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(salarySoftwareSchema) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(salaryFaqSchema) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(salaryBreadcrumbSchema) }}
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
