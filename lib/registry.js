/**
 * CALC• Modern Calculator - Calculator Registry & Route Resolution
 * 189 interactive calculators across Financial, Health & Fitness, Math, Daily Utilities, and Standard Keypads.
 */

export const CALC_REGISTRY = [
  // --- FINANCIAL CALCULATORS (73 Tools) ---
  { id: 'sec-loan-calc', cat: 'financial', slug: 'bike-emi-calculator', aliases: ['bike-loan', 'bike-loan-calculator', 'bike-emi', 'two-wheeler-loan', 'loan-calculator', 'loan', 'emi', 'loan-calc', 'emi-calculator', 'gold-loan', 'gold-loan-calculator', 'gold-loan-calc'], title: 'Bike EMI Calculator – Two-Wheeler, Car & Loan EMI Calculator' },
  { id: 'sec-inflation-calc', cat: 'financial', slug: 'inflation-calculator', aliases: ['inflation', 'inflation-calculator-india', 'cpi', 'purchasing-power', 'future-value-of-money', 'cpi-inflation-calculator-india', 'rupee-value-over-time', 'inflation-adjusted-return', 'cagr-inflation-formula'], keywords: 'inflation calculator, inflation calculator india, future value of money calculator, purchasing power calculator, CPI inflation calculator India, rupee value over time, inflation adjusted return calculator, historical inflation rate in India, CAGR inflation formula, consumer price index, rbi inflation target, cpi inflation, mospi cpi', title: 'Inflation Calculator India – Future Value & Purchasing Power' },
  { id: 'sec-heloc-calc', cat: 'financial', slug: 'heloc-calculator', aliases: ['heloc', 'home-equity-line-of-credit', 'heloc-payment-calculator', 'home-equity-calculator', 'cltv-calculator', 'heloc-interest-only-calculator', 'heloc-amortization-schedule'], keywords: 'heloc calculator, heloc calculator payment, home equity line of credit calculator, heloc payment calculator, heloc interest only payment calculator, heloc draw period and repayment period calculator, combined loan to value (CLTV) calculator, how much equity can I borrow, heloc amortization schedule', title: 'HELOC Calculator – Monthly Draw & Repayment Payment Estimator' },
  { id: 'sec-salary-calc', cat: 'financial', slug: 'salary-calculator', aliases: ['salary', 'wage-conversion', 'hourly-to-salary', 'wage-calculator', 'in-hand-salary-calculator', 'adp-salary-calculator', '8th-pay-commission-salary-calculator'], title: 'Salary Calculator – In Hand, ADP & 8th Pay Commission (2026)', keywords: 'salary calculator, in hand salary calculator, adp salary calculator, 8th pay commission salary calculator' },
  { id: 'sec-roi-calc', cat: 'financial', slug: 'roi-calculator', aliases: ['roi', 'return-on-investment', 'profit-margin-calc'], title: 'ROI & Profit Margin Calculator' },
  { id: 'sec-sip-calc', cat: 'financial', slug: 'sip-calculator', aliases: ['sip', 'systematic-investment', 'mutual-fund-sip'], title: 'SIP Investment Calculator' },
  { id: 'sec-disc-calc', cat: 'financial', slug: 'price-discount-calculator', aliases: ['price-discount', 'sale-price', 'percent-off'], title: 'Sale Price Discount Calculator' },

  // --- HEALTH, FITNESS & MATERNAL CALCULATORS (29 Tools) ---
  { id: 'sec-bf-calc', cat: 'fitness', slug: 'body-fat-calculator', aliases: ['body-fat', 'bf', 'body-fat-percentage', 'navy-body-fat', 'us-navy-body-fat-calculator', 'lean-body-mass-calculator'], title: 'Body Fat Calculator – Free US Navy & BMI Fat % Estimator', keywords: 'body fat calculator, body fat percentage calculator, us navy body fat calculator, body fat calculator men, body fat calculator women, lean body mass calculator' },
  { id: 'sec-pregnancy-weight-calc', cat: 'fitness', slug: 'pregnancy-weight-gain-calculator', aliases: ['pregnancy-weight', 'pregnancy-weight-gain', 'maternal-weight', 'iom-weight'], title: 'Pregnancy Weight Gain Calculator' },
  { id: 'sec-ovulation-calc', cat: 'fitness', slug: 'ovulation-calculator', aliases: ['ovulation', 'fertile-days', 'ovulation-calendar'], title: 'Ovulation Calculator' },
  { id: 'sec-period-calc', cat: 'fitness', slug: 'period-calculator', aliases: ['period', 'period-tracker', 'menstrual-cycle'], title: 'Period Calculator (Cycle Forecasting)' },
  { id: 'sec-protein-calc', cat: 'fitness', slug: 'protein-calculator', aliases: ['protein', 'hypertrophy-protein', 'protein-intake'], title: 'Protein Calculator' },
  { id: 'sec-bsa-calc', cat: 'fitness', slug: 'bsa-calculator', aliases: ['bsa', 'body-surface-area', 'mosteller'], title: 'Body Surface Area (BSA) Calculator' },

  // --- MATH & ALGEBRA SOLVERS (29 Tools) ---
  { id: 'sec-pct-calc', cat: 'math', slug: 'percentage-calculator', aliases: ['percentage', 'pct', 'percent'], title: 'Percentage Calculator (3-in-1 Suite)' },
  { id: 'sec-gcd-calc', cat: 'math', slug: 'gcd-calculator', aliases: ['gcd', 'gcd-lcm', 'greatest-common-divisor', 'gcd-lcm-calculator'], title: 'GCD & LCM Integer Solver' },
  { id: 'sec-stats-calc', cat: 'math', slug: 'statistics-calculator', aliases: ['statistics', 'stats', 'mean-median-mode'], title: 'Statistics & Data Analyzer' },
  { id: 'sec-sci-calc', cat: 'math', slug: 'scientific-calculator', aliases: ['scientific-calc', 'scientific', 'trig-calc'], title: 'Scientific Calculator' },
  { id: 'sec-binary-calc', cat: 'math', slug: 'binary-calculator', aliases: ['binary', 'bitwise', 'binary-converter', 'base2'], title: 'Binary Calculator' },
  { id: 'sec-hex-calc', cat: 'math', slug: 'hex-calculator', aliases: ['hex', 'hexadecimal', 'hexadecimal-calculator', 'base16'], title: 'Hex Calculator' },
  { id: 'sec-half-life-calc', cat: 'math', slug: 'half-life-calculator', aliases: ['half-life', 'radioactive-decay', 'decay', 'half-life-calc'], title: 'Half-Life Calculator' },
  { id: 'sec-log-calc', cat: 'math', slug: 'log-calculator', aliases: ['log', 'logarithm', 'ln', 'natural-log', 'logarithm-calculator'], title: 'Log Calculator' },
  { id: 'sec-ratio-calc', cat: 'math', slug: 'ratio-calculator', aliases: ['ratio', 'proportion', 'aspect-ratio', 'ratio-solver', 'ratio-proportion-calculator'], title: 'Ratio Calculator' },
  { id: 'sec-root-calc', cat: 'math', slug: 'root-calculator', aliases: ['root', 'square-root', 'cube-root', 'radical', 'square-root-calculator'], title: 'Root Calculator' },
  { id: 'sec-lcm-calc', cat: 'math', slug: 'least-common-multiple-calculator', aliases: ['lcm-calculator', 'lcm', 'least-common-multiple', 'lowest-common-multiple'], title: 'Least Common Multiple (LCM)' },
  { id: 'sec-gcf-calc', cat: 'math', slug: 'greatest-common-factor-calculator', aliases: ['gcf-calculator', 'gcf', 'hcf', 'greatest-common-factor', 'hcf-calculator'], title: 'Greatest Common Factor (GCF)' },
  { id: 'sec-factor-calc', cat: 'math', slug: 'factor-calculator', aliases: ['factor', 'factors', 'prime-factors', 'divisors'], title: 'Factor Calculator' },
  { id: 'sec-sci-notation-calc', cat: 'math', slug: 'scientific-notation-calculator', aliases: ['scientific-notation', 'sci-notation', 'standard-form', 'engineering-notation'], title: 'Scientific Notation Calculator' },
  { id: 'sec-volume-calc', cat: 'math', slug: 'volume-calculator', aliases: ['volume', '3d-volume', 'volume-solver'], title: 'Volume Calculator' },
  { id: 'sec-slope-calc', cat: 'math', slug: 'slope-calculator', aliases: ['slope', 'gradient', 'slope-intercept-calculator'], title: 'Slope Calculator' },
  { id: 'sec-area-calc', cat: 'math', slug: 'area-calculator', aliases: ['area', '2d-area', 'surface-area-2d'], title: 'Area Calculator' },
  { id: 'sec-distance-calc', cat: 'math', slug: 'distance-calculator', aliases: ['distance', '2d-distance', '3d-distance', 'euclidean-distance'], title: 'Distance Calculator' },
  { id: 'sec-circle-calc', cat: 'math', slug: 'circle-calculator', aliases: ['circle', 'circumference', 'circle-solver'], title: 'Circle Calculator' },
  { id: 'sec-surface-area-calc', cat: 'math', slug: 'surface-area-calculator', aliases: ['surface-area', 'total-surface-area', '3d-surface-area'], title: 'Surface Area Calculator' },
  { id: 'sec-pythagorean-calc', cat: 'math', slug: 'pythagorean-theorem-calculator', aliases: ['pythagorean', 'pythagoras', 'pythagorean-calculator'], title: 'Pythagorean Theorem Calculator' },
  { id: 'sec-right-triangle-calc', cat: 'math', slug: 'right-triangle-calculator', aliases: ['right-triangle', 'right-angle-triangle', 'hypotenuse-calculator'], title: 'Right Triangle Calculator' },

  // --- DAILY UTILITIES, INTERNET, WEATHER & TRANSPORTATION (58 Tools) ---
  { id: 'sec-gpa-calc', cat: 'utility', slug: 'gpa-calculator', aliases: ['gpa', 'college-gpa', 'grade-point-average', 'other/gpa-calculator', 'everyday/gpa-calculator'], title: 'College & School GPA Calculator' },
  { id: 'sec-stair-calc', cat: 'other', slug: 'stair-calculator', aliases: ['stair', 'stairs-calculator', 'staircase-calculator', 'riser-tread-calculator'], title: 'Stair Calculator' },
  { id: 'sec-gravel-calc', cat: 'other', slug: 'gravel-calculator', aliases: ['gravel', 'aggregate-calculator', 'crushed-stone-calculator', 'driveway-gravel-calculator'], title: 'Gravel Calculator' },
  { id: 'sec-density-calc', cat: 'other', slug: 'density-calculator', aliases: ['density', 'mass-volume-density', 'specific-gravity-calculator'], title: 'Density Calculator' },
  { id: 'sec-grade-calc', cat: 'utility', slug: 'grade-calculator', aliases: ['grade', 'final-grade-calculator', 'class-grade-calculator', 'exam-grade-calculator', 'other/grade-calculator', 'everyday/grade-calculator'], title: 'Grade Calculator' },
  { id: 'sec-bra-size-calc', cat: 'utility', slug: 'bra-size-calculator', aliases: ['bra-size', 'bra-calculator', 'cup-size-calculator', 'bra-fitting', 'other/bra-size-calculator', 'everyday/bra-size-calculator'], title: 'Bra Size Calculator' },
  { id: 'sec-fuel-cost-calc', cat: 'other', slug: 'fuel-cost-calculator', aliases: ['fuel-cost', 'fuel-cost-calc', 'trip-fuel-calculator', 'gas-cost-calculator', 'road-trip-cost', 'transportation/fuel-cost-calculator', 'other/fuel-cost-calculator', 'transportation/fuel-cost'], title: 'Fuel Cost & Trip Expense Calculator' },
  { id: 'sec-mileage-calc', cat: 'other', slug: 'mileage-calculator', aliases: ['mileage', 'mileage-calc', 'business-mileage-calculator', 'irs-mileage-calculator', 'commute-mileage-calculator', 'transportation/mileage-calculator', 'other/mileage-calculator', 'transportation/mileage'], title: 'Mileage Reimbursement Calculator' },

  // --- KEYPADS ---
  { id: 'box-std-mode', cat: 'standard', slug: 'standard-calculator', aliases: ['standard', 'standard-keypad', 'keypad', 'calc'], title: 'Standard Calculator' },
  { id: 'box-sci-mode', cat: 'standard', slug: 'scientific-calculator', aliases: ['scientific', 'sci', 'scientific-keypad', 'scientific-calc'], title: 'Scientific Calculator' }
];

export const STANDALONE_PAGES = {
  'privacy-policy': { key: 'privacy', slug: 'privacy-policy', title: 'Privacy Policy' },
  'privacy': { key: 'privacy', slug: 'privacy-policy', title: 'Privacy Policy' },
  'about-us': { key: 'about', slug: 'about-us', title: 'About Us & Mission' },
  'about': { key: 'about', slug: 'about-us', title: 'About Us & Mission' },
  'contact': { key: 'contact', slug: 'contact', title: 'Contact & Support' },
  'contact-us': { key: 'contact', slug: 'contact', title: 'Contact & Support' },
  'support': { key: 'contact', slug: 'contact', title: 'Contact & Support' },
  'terms-of-service': { key: 'terms', slug: 'terms-of-service', title: 'Terms of Service' },
  'terms': { key: 'terms', slug: 'terms-of-service', title: 'Terms of Service' },
  'tos': { key: 'terms', slug: 'terms-of-service', title: 'Terms of Service' },
  'editorial-policy': { key: 'editorial', slug: 'editorial-policy', title: 'Editorial Policy & Standards' },
  'editorial': { key: 'editorial', slug: 'editorial-policy', title: 'Editorial Policy & Standards' },
  'affiliate-disclosure': { key: 'affiliate', slug: 'affiliate-disclosure', title: 'Affiliate Disclosure' },
  'affiliate': { key: 'affiliate', slug: 'affiliate-disclosure', title: 'Affiliate Disclosure' },
  'security': { key: 'security', slug: 'security', title: 'Security Architecture' },
  'security-architecture': { key: 'security', slug: 'security', title: 'Security Architecture' },
  'sandbox': { key: 'security', slug: 'security', title: 'Security & Sandboxing Architecture' }
};

// Fast lookup maps
const byId = new Map();
const bySlug = new Map();
const byAlias = new Map();

CALC_REGISTRY.forEach(item => {
  byId.set(item.id, item);
  bySlug.set(`${item.cat}/${item.slug}`, item);
  bySlug.set(item.slug, item);
  bySlug.set(`other/${item.slug}`, item);
  bySlug.set(`utility/${item.slug}`, item);
  bySlug.set(`weather/${item.slug}`, item);
  bySlug.set(`transportation/${item.slug}`, item);
  bySlug.set(`entertainment/${item.slug}`, item);
  if (item.cat === 'utility') bySlug.set(`everyday/${item.slug}`, item);
  if (item.cat === 'internet') bySlug.set(`net/${item.slug}`, item);
  if (item.aliases) {
    item.aliases.forEach(alias => {
      byAlias.set(alias.toLowerCase(), item);
      byAlias.set(`${item.cat}/${alias.toLowerCase()}`, item);
    });
  }
});

export function normalizeSuiteKey(key) {
  if (!key) return 'all';
  key = String(key).toLowerCase().trim();
  if (key === 'finance' || key === 'financial' || key === 'fin') return 'financial';
  if (key === 'health' || key === 'fitness' || key === 'fit') return 'fitness';
  if (key === 'math' || key === 'mathematics') return 'math';
  if (key === 'utility' || key === 'utilities' || key === 'other' || key === 'everyday' || key === 'internet' || key === 'weather' || key === 'transportation' || key === 'entertainment') return 'other';
  if (key === 'standard' || key === 'scientific') return 'standard';
  if (key === 'zenith-hub' || key === 'hub' || key === 'all') return 'all';
  return key;
}

export function getCalc(category, slug) {
  if (!slug) {
    return bySlug.get(category) || byAlias.get(category);
  }
  return bySlug.get(`${category}/${slug}`) || bySlug.get(slug) || byAlias.get(`${category}/${slug}`) || byAlias.get(slug);
}

export function getCalcById(id) {
  return byId.get(id);
}

export function getAllStaticCalcParams() {
  const params = [];
  const seen = new Set();

  const add = (category, slug) => {
    const key = `${category}/${slug}`;
    if (!seen.has(key)) {
      seen.add(key);
      params.push({ category, slug });
    }
  };

  CALC_REGISTRY.forEach(item => {
    // Canonical path [category]/[slug]
    add(item.cat, item.slug);

    // Common category aliases
    if (item.cat === 'financial') {
      add('finance', item.slug);
    } else if (item.cat === 'fitness') {
      add('health', item.slug);
    } else if (item.cat === 'other' || item.cat === 'utility' || item.cat === 'internet') {
      add('other', item.slug);
      add('utilities', item.slug);
      add('utility', item.slug);
    }

    // Generic calculator prefixes
    add('calculator', item.slug);
    add('calc', item.slug);

    // Multi-segment aliases in CALC_REGISTRY (e.g. utility/tip-calculator)
    if (item.aliases) {
      item.aliases.forEach(a => {
        if (a.includes('/')) {
          const parts = a.split('/');
          if (parts.length === 2 && parts[0] && parts[1]) {
            add(parts[0].toLowerCase(), parts[1].toLowerCase());
          }
        }
      });
    }
  });

  // Standard & Scientific Keypad combinations
  add('standard', 'scientific-calculator');
  add('standard', 'scientific');
  add('standard', 'standard-calculator');
  add('math', 'scientific-calculator');
  add('math', 'scientific');

  return params;
}

export function getAllSingleSegmentParams() {
  const set = new Set();

  // 1. All categories & aliases
  getAllCategories().forEach(c => set.add(c.toLowerCase()));

  // 2. All standalone pages & aliases
  Object.keys(STANDALONE_PAGES).forEach(p => set.add(p.toLowerCase()));
  set.add('about');
  set.add('privacy');
  set.add('terms');
  set.add('contact-us');

  // 3. Core keypad shortcuts (CRITICAL!)
  set.add('scientific');
  set.add('sci');
  set.add('scientific-calculator');
  set.add('scientific-keypad');
  set.add('standard');
  set.add('standard-calculator');
  set.add('standard-keypad');
  set.add('calc');
  set.add('calculator');
  set.add('calculators');

  // 4. All 167 calculator slugs (e.g. loan-calculator, bmi-calculator, etc.)
  CALC_REGISTRY.forEach(item => {
    if (item.slug) set.add(item.slug.toLowerCase());
    if (item.aliases) {
      item.aliases.forEach(a => {
        if (!a.includes('/')) {
          set.add(a.toLowerCase());
        }
      });
    }
  });

  return Array.from(set);
}

export function getAllCategories() {
  return [
    'financial',
    'fitness',
    'math',
    'other',
    'standard',
    'finance',
    'health',
    'utilities',
    'utility',
    'internet',
    'everyday',
    'weather',
    'transportation',
    'entertainment'
  ];
}

