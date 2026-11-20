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

    if (lower === 'body-fat-calculator' || lower === 'body-fat' || lower === 'bf' || lower === 'body-fat-percentage') {
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
  
  const isBf = (category || '').toLowerCase() === 'body-fat-calculator' || (category || '').toLowerCase() === 'body-fat';

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

  return (
    <>
      {isBf && (
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
      <OmniCalcClient initialHtml={html} />
    </>
  );
}

