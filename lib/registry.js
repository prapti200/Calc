/**
 * CALC• Modern Calculator - Calculator Registry & Route Resolution
 * 189 interactive calculators across Financial, Health & Fitness, Math, Daily Utilities, and Standard Keypads.
 */

export const CALC_REGISTRY = [
  // --- FINANCIAL CALCULATORS (73 Tools) ---
  { id: 'sec-loan-calc', cat: 'financial', slug: 'loan-calculator', aliases: ['loan', 'emi', 'loan-calc', 'emi-calculator', 'gold-loan', 'gold-loan-calculator', 'gold-loan-calc'], title: 'Loan & EMI Calculator' },
  { id: 'sec-auto-loan-calc', cat: 'financial', slug: 'auto-loan-calculator', aliases: ['auto-loan', 'car-loan', 'auto', 'vehicle-loan'], title: 'Auto Loan Calculator' },
  { id: 'sec-inflation-calc', cat: 'financial', slug: 'inflation-calculator', aliases: ['inflation', 'cpi', 'purchasing-power'], title: 'Inflation Calculator' },
  { id: 'sec-mortgage-payoff-calc', cat: 'financial', slug: 'mortgage-payoff-calculator', aliases: ['mortgage-payoff', 'early-payoff', 'extra-mortgage-payment'], title: 'Mortgage Payoff Calculator' },
  { id: 'sec-401k-calc', cat: 'financial', slug: '401k-calculator', aliases: ['401k', '401-k', '401k-retirement'], title: '401(k) Calculator' },
  { id: 'sec-pension-calc', cat: 'financial', slug: 'pension-calculator', aliases: ['pension', 'pension-plan', 'defined-benefit'], title: 'Pension Calculator' },
  { id: 'sec-house-afford-calc', cat: 'financial', slug: 'house-affordability-calculator', aliases: ['house-affordability', 'house-afford', 'home-affordability', 'affordability'], title: 'House Affordability Calculator' },
  { id: 'sec-social-security-calc', cat: 'financial', slug: 'social-security-calculator', aliases: ['social-security', 'ss-benefits', 'social-security-benefits'], title: 'Social Security Calculator' },
  { id: 'sec-rent-calc', cat: 'financial', slug: 'rent-calculator', aliases: ['rent', 'rent-affordability', 'rental-budget'], title: 'Rent Calculator' },
  { id: 'sec-annuity-calc', cat: 'financial', slug: 'annuity-calculator', aliases: ['annuity', 'annuity-accumulation', 'fixed-annuity'], title: 'Annuity Calculator' },
  { id: 'sec-dti-calc', cat: 'financial', slug: 'dti-calculator', aliases: ['dti', 'debt-to-income', 'dti-ratio', 'debt-to-income-calculator'], title: 'Debt-to-Income (DTI) Calculator' },
  { id: 'sec-annuity-payout-calc', cat: 'financial', slug: 'annuity-payout-calculator', aliases: ['annuity-payout', 'spia', 'annuity-income'], title: 'Annuity Payout (SPIA) Calculator' },
  { id: 'sec-real-estate-calc', cat: 'financial', slug: 'real-estate-calculator', aliases: ['real-estate', 'cap-rate', 'property-investment'], title: 'Real Estate Investment Calculator' },
  { id: 'sec-roth-ira-calc', cat: 'financial', slug: 'roth-ira-calculator', aliases: ['roth-ira', 'roth', 'roth-ira-growth'], title: 'Roth IRA Calculator' },
  { id: 'sec-refinance-calc', cat: 'financial', slug: 'refinance-calculator', aliases: ['refinance', 'refi', 'mortgage-refinance'], title: 'Refinance Calculator' },
  { id: 'sec-ira-calc', cat: 'financial', slug: 'traditional-ira-calculator', aliases: ['traditional-ira', 'ira', 'traditional-ira-growth', 'ira-calculator'], title: 'Traditional IRA Calculator' },
  { id: 'sec-rental-prop-calc', cat: 'financial', slug: 'rental-property-calculator', aliases: ['rental-property', 'rental-prop', 'multifamily'], title: 'Rental Property Calculator' },
  { id: 'sec-rmd-calc', cat: 'financial', slug: 'rmd-calculator', aliases: ['rmd', 'required-minimum-distribution', 'ira-rmd'], title: 'RMD Calculator' },
  { id: 'sec-apr-calc', cat: 'financial', slug: 'apr-calculator', aliases: ['apr', 'apr-solver', 'true-apr'], title: 'APR Calculator' },
  { id: 'sec-fha-calc', cat: 'financial', slug: 'fha-loan-calculator', aliases: ['fha-loan', 'fha', 'fha-mortgage'], title: 'FHA Loan Calculator' },
  { id: 'sec-va-mortgage-calc', cat: 'financial', slug: 'va-mortgage-calculator', aliases: ['va-mortgage', 'va-loan', 'veterans-mortgage'], title: 'VA Mortgage Calculator' },
  { id: 'sec-home-equity-calc', cat: 'financial', slug: 'home-equity-loan-calculator', aliases: ['home-equity', 'second-mortgage', 'cltv', 'home-equity-calculator'], title: 'Home Equity Loan Calculator' },
  { id: 'sec-heloc-calc', cat: 'financial', slug: 'heloc-calculator', aliases: ['heloc', 'home-equity-line-of-credit'], title: 'HELOC Calculator' },
  { id: 'sec-down-payment-calc', cat: 'financial', slug: 'down-payment-calculator', aliases: ['down-payment', 'downpayment', 'home-savings'], title: 'Down Payment Calculator' },
  { id: 'sec-rent-vs-buy-calc', cat: 'financial', slug: 'rent-vs-buy-calculator', aliases: ['rent-vs-buy', 'rent-buy', 'buy-vs-rent'], title: 'Rent vs. Buy Calculator' },
  { id: 'sec-income-tax-calc', cat: 'financial', slug: 'income-tax-calculator', aliases: ['income-tax', 'tax', 'federal-tax', 'tax-brackets'], title: 'Income Tax Calculator' },
  { id: 'sec-salary-calc', cat: 'financial', slug: 'salary-calculator', aliases: ['salary', 'wage-conversion', 'hourly-to-salary', 'wage-calculator'], title: 'Salary & Wage Calculator' },
  { id: 'sec-auto-rebate-calc', cat: 'financial', slug: 'cash-back-or-low-interest-calculator', aliases: ['cash-back-or-low-interest', 'auto-rebate', 'car-rebate-vs-interest', 'rebate-vs-apr'], title: 'Cash Back vs Low Interest Calculator' },
  { id: 'sec-auto-lease-calc', cat: 'financial', slug: 'auto-lease-calculator', aliases: ['auto-lease', 'car-lease', 'lease-payment'], title: 'Auto Lease Calculator' },
  { id: 'sec-ci-calc', cat: 'financial', slug: 'compound-interest-calculator', aliases: ['compound-interest', 'ci', 'compound-growth', 'daily-compound-interest-calculator', 'daily-compound-interest'], title: 'Compound Interest Calculator' },
  { id: 'sec-roi-calc', cat: 'financial', slug: 'roi-calculator', aliases: ['roi', 'return-on-investment', 'profit-margin-calc'], title: 'ROI & Profit Margin Calculator' },
  { id: 'sec-interest-rate-calc', cat: 'financial', slug: 'interest-rate-calculator', aliases: ['interest-rate', 'apy-apr', 'effective-interest'], title: 'Interest Rate (APR & APY) Calculator' },
  { id: 'sec-savings-goal-calc', cat: 'financial', slug: 'savings-goal-calculator', aliases: ['savings-goal', 'savings', 'savings-plan'], title: 'Savings Goal Calculator' },
  { id: 'sec-cd-calc', cat: 'financial', slug: 'cd-calculator', aliases: ['cd', 'certificate-of-deposit', 'cd-yield'], title: 'CD (Certificate of Deposit) Calculator' },
  { id: 'sec-bond-calc', cat: 'financial', slug: 'bond-calculator', aliases: ['bond', 'bond-valuation', 'bond-ytm'], title: 'Bond Valuation Calculator' },
  { id: 'sec-mutual-fund-calc', cat: 'financial', slug: 'mutual-fund-calculator', aliases: ['mutual-fund', 'etf-wealth', 'mutual-fund-fee'], title: 'Mutual Fund & ETF Wealth Calculator' },
  { id: 'sec-avg-return-calc', cat: 'financial', slug: 'average-return-calculator', aliases: ['average-return', 'cagr', 'geometric-return'], title: 'Average Return (CAGR) Calculator' },
  { id: 'sec-irr-calc', cat: 'financial', slug: 'irr-calculator', aliases: ['irr', 'npv', 'irr-npv', 'internal-rate-of-return'], title: 'IRR & NPV Investment Calculator' },
  { id: 'sec-payback-calc', cat: 'financial', slug: 'payback-period-calculator', aliases: ['payback-period', 'payback', 'discounted-payback'], title: 'Payback Period Calculator' },
  { id: 'sec-pv-calc', cat: 'financial', slug: 'present-value-calculator', aliases: ['present-value', 'pv', 'discounted-pv'], title: 'Present Value Calculator' },
  { id: 'sec-fv-calc', cat: 'financial', slug: 'future-value-calculator', aliases: ['future-value', 'fv', 'compound-fv'], title: 'Future Value Calculator' },
  { id: 'sec-credit-card-calc', cat: 'financial', slug: 'credit-card-calculator', aliases: ['credit-card', 'credit-card-interest', 'card-revolving'], title: 'Credit Card Calculator' },
  { id: 'sec-cc-payoff-calc', cat: 'financial', slug: 'credit-card-payoff-calculator', aliases: ['credit-card-payoff', 'cc-payoff', 'card-payoff-goal'], title: 'Credit Cards Payoff Goal Calculator' },
  { id: 'sec-debt-payoff-calc', cat: 'financial', slug: 'debt-payoff-calculator', aliases: ['debt-payoff', 'snowball-avalanche', 'snowball', 'avalanche'], title: 'Debt Payoff (Snowball vs Avalanche) Calculator' },
  { id: 'sec-debt-consolidation-calc', cat: 'financial', slug: 'debt-consolidation-calculator', aliases: ['debt-consolidation', 'consolidation', 'debt-refi'], title: 'Debt Consolidation Calculator' },
  { id: 'sec-repayment-calc', cat: 'financial', slug: 'loan-repayment-calculator', aliases: ['loan-repayment', 'repayment', 'accelerated-biweekly'], title: 'Loan Repayment Calculator' },
  { id: 'sec-student-loan-calc', cat: 'financial', slug: 'student-loan-calculator', aliases: ['student-loan', 'student-debt', 'idr', 'save-plan'], title: 'Student Loan Calculator' },
  { id: 'sec-college-cost-calc', cat: 'financial', slug: 'college-cost-calculator', aliases: ['college-cost', '529-plan', 'tuition-savings'], title: 'College Cost & 529 Savings Calculator' },
  { id: 'sec-depreciation-calc', cat: 'financial', slug: 'depreciation-calculator', aliases: ['depreciation', 'asset-depreciation', 'macrs'], title: 'Asset Depreciation Calculator' },
  { id: 'sec-margin-calc', cat: 'financial', slug: 'gross-margin-calculator', aliases: ['gross-margin', 'margin', 'markup', 'cogs'], title: 'Gross Margin & Markup Calculator' },
  { id: 'sec-discount-calc', cat: 'financial', slug: 'discount-calculator', aliases: ['discount', 'coupon', 'stacked-discounts'], title: 'Discount & Coupon Calculator' },
  { id: 'sec-business-loan-calc', cat: 'financial', slug: 'business-loan-calculator', aliases: ['business-loan', 'dscr', 'commercial-loan'], title: 'Business Loan & DSCR Underwriting' },
  { id: 'sec-personal-loan-calc', cat: 'financial', slug: 'personal-loan-calculator', aliases: ['personal-loan', 'unsecured-loan', 'personal-borrowing'], title: 'Personal Loan Calculator' },
  { id: 'sec-boat-loan-calc', cat: 'financial', slug: 'boat-loan-calculator', aliases: ['boat-loan', 'marine-loan', 'boat-financing'], title: 'Boat Loan Calculator' },
  { id: 'sec-gen-lease-calc', cat: 'financial', slug: 'commercial-lease-calculator', aliases: ['commercial-lease', 'equipment-lease', 'gen-lease', 'capital-lease'], title: 'Equipment & Commercial Lease Calculator' },
  { id: 'sec-budget-calc', cat: 'financial', slug: 'budget-calculator', aliases: ['budget', '50-30-20-budget', 'budget-rule', '50-30-20'], title: '50/30/20 Budget Rule Calculator' },
  { id: 'sec-commission-calc', cat: 'financial', slug: 'commission-calculator', aliases: ['commission', 'sales-commission', 'tiered-commission'], title: 'Sales Commission Calculator' },
  { id: 'sec-sip-calc', cat: 'financial', slug: 'sip-calculator', aliases: ['sip', 'systematic-investment', 'mutual-fund-sip'], title: 'SIP Investment Calculator' },
  { id: 'sec-disc-calc', cat: 'financial', slug: 'price-discount-calculator', aliases: ['price-discount', 'sale-price', 'percent-off'], title: 'Sale Price Discount Calculator' },

  // --- HEALTH, FITNESS & MATERNAL CALCULATORS (29 Tools) ---
  { id: 'sec-bf-calc', cat: 'fitness', slug: 'body-fat-calculator', aliases: ['body-fat', 'bf', 'body-fat-percentage', 'navy-body-fat'], title: 'Body Fat % (US Navy Method)' },
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

