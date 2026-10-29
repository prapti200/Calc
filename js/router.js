/* ==========================================================================
   OMNICALC STUDIO - ADVANCED HTML5 BROWSER ROUTER (HISTORY API)
   Full Browser Router with clean path-based URLs (no hash router).
   Supports deep-linking, browser history (back/forward), and dynamic titles.
   ========================================================================== */

(function () {
  'use strict';

  // Master definition of all 104+ calculators with canonical slugs, aliases, and titles
  const CALC_REGISTRY = [
    // --- FINANCIAL CALCULATORS (73 Tools) ---
    { id: 'sec-mort-calc', cat: 'financial', slug: 'mortgage-calculator', aliases: ['mortgage', 'mort', 'mortgage-calc', 'home-mortgage'], title: 'Mortgage Calculator' },
    { id: 'sec-loan-calc', cat: 'financial', slug: 'loan-calculator', aliases: ['loan', 'emi', 'loan-calc', 'emi-calculator'], title: 'Loan & EMI Calculator' },
    { id: 'sec-auto-loan-calc', cat: 'financial', slug: 'auto-loan-calculator', aliases: ['auto-loan', 'car-loan', 'auto', 'vehicle-loan'], title: 'Auto Loan Calculator' },
    { id: 'sec-interest-calc', cat: 'financial', slug: 'interest-calculator', aliases: ['interest', 'interest-calc', 'simple-compound-interest'], title: 'Interest Calculator' },
    { id: 'sec-payment-calc', cat: 'financial', slug: 'payment-calculator', aliases: ['payment', 'payment-calc', 'debt-payment'], title: 'Payment Calculator' },
    { id: 'sec-retirement-calc', cat: 'financial', slug: 'retirement-calculator', aliases: ['retirement', 'nest-egg', 'retirement-nest-egg'], title: 'Retirement Calculator' },
    { id: 'sec-amortization-calc', cat: 'financial', slug: 'amortization-calculator', aliases: ['amortization', 'amort', 'amortization-schedule'], title: 'Amortization Calculator' },
    { id: 'sec-investment-calc', cat: 'financial', slug: 'investment-calculator', aliases: ['investment', 'invest', 'wealth-accumulator'], title: 'Investment Calculator' },
    { id: 'sec-currency-calc', cat: 'financial', slug: 'currency-converter-calculator', aliases: ['currency', 'currency-calculator', 'forex', 'currency-converter', 'exchange-rate'], title: 'Currency Converter' },
    { id: 'sec-inflation-calc', cat: 'financial', slug: 'inflation-calculator', aliases: ['inflation', 'cpi', 'purchasing-power'], title: 'Inflation Calculator' },
    { id: 'sec-finance-tvm-calc', cat: 'financial', slug: 'tvm-calculator', aliases: ['tvm', 'time-value-of-money', 'tvm-solver', 'finance-tvm-calculator'], title: 'Finance TVM Calculator' },
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
    { id: 'sec-marriage-tax-calc', cat: 'financial', slug: 'marriage-tax-calculator', aliases: ['marriage-tax', 'marriage-penalty', 'joint-tax'], title: 'Marriage Tax Penalty Calculator' },
    { id: 'sec-estate-tax-calc', cat: 'financial', slug: 'estate-tax-calculator', aliases: ['estate-tax', 'inheritance-tax', 'wealth-transfer'], title: 'Estate Tax Calculator' },
    { id: 'sec-paycheck-calc', cat: 'financial', slug: 'paycheck-calculator', aliases: ['paycheck', 'take-home-pay', 'net-pay-stub'], title: 'Take-Home-Paycheck Calculator' },
    { id: 'sec-auto-rebate-calc', cat: 'financial', slug: 'cash-back-or-low-interest-calculator', aliases: ['cash-back-or-low-interest', 'auto-rebate', 'car-rebate-vs-interest', 'rebate-vs-apr'], title: 'Cash Back vs Low Interest Calculator' },
    { id: 'sec-auto-lease-calc', cat: 'financial', slug: 'auto-lease-calculator', aliases: ['auto-lease', 'car-lease', 'lease-payment'], title: 'Auto Lease Calculator' },
    { id: 'sec-ci-calc', cat: 'financial', slug: 'compound-interest-calculator', aliases: ['compound-interest', 'ci', 'compound-growth'], title: 'Compound Interest Calculator' },
    { id: 'sec-roi-calc', cat: 'financial', slug: 'roi-calculator', aliases: ['roi', 'return-on-investment', 'profit-margin-calc'], title: 'ROI & Profit Margin Calculator' },
    { id: 'sec-interest-rate-calc', cat: 'financial', slug: 'interest-rate-calculator', aliases: ['interest-rate', 'apy-apr', 'effective-interest'], title: 'Interest Rate (APR & APY) Calculator' },
    { id: 'sec-savings-goal-calc', cat: 'financial', slug: 'savings-goal-calculator', aliases: ['savings-goal', 'savings', 'savings-plan'], title: 'Savings Goal Calculator' },
    { id: 'sec-simple-interest-calc', cat: 'financial', slug: 'simple-interest-calculator', aliases: ['simple-interest', 'simple-int', 'ordinary-interest'], title: 'Simple Interest Calculator' },
    { id: 'sec-cd-calc', cat: 'financial', slug: 'cd-calculator', aliases: ['cd', 'certificate-of-deposit', 'cd-yield'], title: 'CD (Certificate of Deposit) Calculator' },
    { id: 'sec-bond-calc', cat: 'financial', slug: 'bond-calculator', aliases: ['bond', 'bond-valuation', 'bond-ytm'], title: 'Bond Valuation Calculator' },
    { id: 'sec-mutual-fund-calc', cat: 'financial', slug: 'mutual-fund-calculator', aliases: ['mutual-fund', 'etf-wealth', 'mutual-fund-fee'], title: 'Mutual Fund & ETF Wealth Calculator' },
    { id: 'sec-avg-return-calc', cat: 'financial', slug: 'average-return-calculator', aliases: ['average-return', 'cagr', 'geometric-return'], title: 'Average Return (CAGR) Calculator' },
    { id: 'sec-irr-calc', cat: 'financial', slug: 'irr-calculator', aliases: ['irr', 'npv', 'irr-npv', 'internal-rate-of-return'], title: 'IRR & NPV Investment Calculator' },
    { id: 'sec-payback-calc', cat: 'financial', slug: 'payback-period-calculator', aliases: ['payback-period', 'payback', 'discounted-payback'], title: 'Payback Period Calculator' },
    { id: 'sec-pv-calc', cat: 'financial', slug: 'present-value-calculator', aliases: ['present-value', 'pv', 'discounted-pv'], title: 'Present Value Calculator' },
    { id: 'sec-fv-calc', cat: 'financial', slug: 'future-value-calculator', aliases: ['future-value', 'fv', 'compound-fv'], title: 'Future Value Calculator' },
    { id: 'sec-sales-tax-calc', cat: 'financial', slug: 'sales-tax-calculator', aliases: ['sales-tax', 'sales-tax-calc', 'vat'], title: 'Sales Tax Calculator' },
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
    { id: 'sec-tip-calc', cat: 'financial', slug: 'tip-calculator', aliases: ['tip', 'bill-split', 'utility/tip-calculator', 'utility/tip', 'other/tip-calculator', 'everyday/tip-calculator'], title: 'Tip & Bill Split Calculator' },

    // --- HEALTH, FITNESS & MATERNAL CALCULATORS (20 Tools) ---
    { id: 'sec-bmi-calc', cat: 'fitness', slug: 'bmi-calculator', aliases: ['bmi', 'body-mass-index', 'bmi-gauge'], title: 'Body Mass Index (BMI) & Gauge' },
    { id: 'sec-bmr-calc', cat: 'fitness', slug: 'bmr-calculator', aliases: ['bmr', 'bmr-tdee', 'basal-metabolic-rate', 'metabolism'], title: 'BMR & TDEE Calorie Target Calculator' },
    { id: 'sec-bf-calc', cat: 'fitness', slug: 'body-fat-calculator', aliases: ['body-fat', 'bf', 'body-fat-percentage', 'navy-body-fat'], title: 'Body Fat % (US Navy Method)' },
    { id: 'sec-water-calc', cat: 'fitness', slug: 'water-intake-calculator', aliases: ['water', 'water-intake', 'hydration', 'daily-water'], title: 'Daily Water Intake Recommendation' },
    { id: 'sec-ibw-calc', cat: 'fitness', slug: 'ideal-weight-calculator', aliases: ['ideal-weight', 'ibw', 'ideal-body-weight', 'healthy-weight-target'], title: 'Ideal Body Weight (IBW) Calculator' },
    { id: 'sec-calorie-calc', cat: 'fitness', slug: 'calorie-calculator', aliases: ['calorie', 'calories', 'calorie-deficit', 'tdee-deficit'], title: 'Calorie Calculator & Deficit Targets' },
    { id: 'sec-pace-calc', cat: 'fitness', slug: 'pace-calculator', aliases: ['pace', 'running-pace', 'marathon-pace', 'race-pace'], title: 'Pace Calculator (Running, Race & Splits)' },
    { id: 'sec-army-bf-calc', cat: 'fitness', slug: 'army-body-fat-calculator', aliases: ['army-body-fat', 'army-bf', 'ar-600-9', 'military-tape-test'], title: 'Army Body Fat Calculator (AR 600-9)' },
    { id: 'sec-lbm-calc', cat: 'fitness', slug: 'lean-body-mass-calculator', aliases: ['lean-body-mass', 'lbm', 'ffmi', 'boer-lbm'], title: 'Lean Body Mass (LBM) & FFMI Calculator' },
    { id: 'sec-healthy-weight-calc', cat: 'fitness', slug: 'healthy-weight-calculator', aliases: ['healthy-weight', 'who-weight', 'hamwi-weight'], title: 'Healthy Weight Range Calculator' },
    { id: 'sec-calories-burned-calc', cat: 'fitness', slug: 'calories-burned-calculator', aliases: ['calories-burned', 'met-calories', 'exercise-burn', 'activity-calories'], title: 'Calories Burned (2024 MET Standard)' },
    { id: 'sec-orm-calc', cat: 'fitness', slug: 'one-rep-max-calculator', aliases: ['one-rep-max', 'orm', '1rm', 'strength-max'], title: 'One Rep Max (1RM) Strength Calculator' },
    { id: 'sec-thr-calc', cat: 'fitness', slug: 'target-heart-rate-calculator', aliases: ['target-heart-rate', 'thr', 'heart-rate-zones', 'karvonen'], title: 'Target Heart Rate (THR) & Training Zones' },
    // 7 Maternal & Cycle Calculators
    { id: 'sec-pregnancy-calc', cat: 'fitness', slug: 'pregnancy-calculator', aliases: ['pregnancy', 'gestational-age', 'pregnancy-weeks'], title: 'Pregnancy Calculator' },
    { id: 'sec-pregnancy-weight-calc', cat: 'fitness', slug: 'pregnancy-weight-gain-calculator', aliases: ['pregnancy-weight', 'pregnancy-weight-gain', 'maternal-weight', 'iom-weight'], title: 'Pregnancy Weight Gain Calculator' },
    { id: 'sec-pregnancy-conception-calc', cat: 'fitness', slug: 'pregnancy-conception-calculator', aliases: ['pregnancy-conception', 'reverse-conception', 'when-conceived'], title: 'Pregnancy Conception Calculator' },
    { id: 'sec-due-date-calc', cat: 'fitness', slug: 'due-date-calculator', aliases: ['due-date', 'edd', 'delivery-date'], title: 'Due Date Calculator' },
    { id: 'sec-ovulation-calc', cat: 'fitness', slug: 'ovulation-calculator', aliases: ['ovulation', 'fertile-days', 'ovulation-calendar'], title: 'Ovulation Calculator' },
    { id: 'sec-conception-calc', cat: 'fitness', slug: 'conception-calculator', aliases: ['conception', 'fertile-window-timing', 'conception-planner'], title: 'Conception Calculator (Fertile Window Timing)' },
    { id: 'sec-period-calc', cat: 'fitness', slug: 'period-calculator', aliases: ['period', 'period-tracker', 'menstrual-cycle'], title: 'Period Calculator (Cycle Forecasting)' },

    // 9 New Clinical, Nutrition & Health Calculators
    { id: 'sec-macro-calc', cat: 'fitness', slug: 'macro-calculator', aliases: ['macro', 'macronutrient', 'macros'], title: 'Macro Calculator' },
    { id: 'sec-carb-calc', cat: 'fitness', slug: 'carbohydrate-calculator', aliases: ['carbohydrate', 'carb', 'carbs', 'carb-calculator'], title: 'Carbohydrate Calculator' },
    { id: 'sec-protein-calc', cat: 'fitness', slug: 'protein-calculator', aliases: ['protein', 'hypertrophy-protein', 'protein-intake'], title: 'Protein Calculator' },
    { id: 'sec-fat-calc', cat: 'fitness', slug: 'fat-intake-calculator', aliases: ['fat-intake', 'fat', 'fat-calculator', 'dietary-fat'], title: 'Fat Intake Calculator' },
    { id: 'sec-tdee-calc', cat: 'fitness', slug: 'tdee-calculator', aliases: ['tdee', 'total-daily-energy-expenditure'], title: 'TDEE Calculator' },
    { id: 'sec-gfr-calc', cat: 'fitness', slug: 'gfr-calculator', aliases: ['gfr', 'egfr', 'kidney-function', 'ckd-epi'], title: 'GFR Calculator (eGFR)' },
    { id: 'sec-body-type-calc', cat: 'fitness', slug: 'body-type-calculator', aliases: ['body-type', 'somatotype', 'ectomorph-mesomorph'], title: 'Body Type Calculator' },
    { id: 'sec-bsa-calc', cat: 'fitness', slug: 'bsa-calculator', aliases: ['bsa', 'body-surface-area', 'mosteller'], title: 'Body Surface Area (BSA) Calculator' },
    { id: 'sec-bac-calc', cat: 'fitness', slug: 'bac-calculator', aliases: ['bac', 'blood-alcohol', 'widmark', 'alcohol-calculator'], title: 'BAC Calculator' },

    // --- MATH & ALGEBRA (20 Tools) ---
    { id: 'sec-pct-calc', cat: 'math', slug: 'percentage-calculator', aliases: ['percentage', 'pct', 'percent'], title: 'Percentage Calculator (3-in-1 Suite)' },
    { id: 'sec-quad-calc', cat: 'math', slug: 'quadratic-equation-calculator', aliases: ['quadratic', 'quad', 'quadratic-solver', 'quadratic-equation', 'quadratic-formula', 'quadratic-formula-calculator'], title: 'Quadratic Equation Solver' },
    { id: 'sec-frac-calc', cat: 'math', slug: 'fraction-calculator', aliases: ['fractions', 'fraction', 'frac', 'fraction-reducer', 'fractions-calculator'], title: 'Fraction Calculator & Reducer' },
    { id: 'sec-gcd-calc', cat: 'math', slug: 'gcd-calculator', aliases: ['gcd', 'gcd-lcm', 'greatest-common-divisor', 'gcd-lcm-calculator'], title: 'GCD & LCM Integer Solver' },
    { id: 'sec-stats-calc', cat: 'math', slug: 'statistics-calculator', aliases: ['statistics', 'stats', 'mean-median-mode'], title: 'Statistics & Data Analyzer' },

    // 15 New Math Solvers
    { id: 'sec-sci-calc', cat: 'math', slug: 'scientific-calculator', aliases: ['scientific-calc', 'scientific', 'trig-calc'], title: 'Scientific Calculator' },
    { id: 'sec-random-calc', cat: 'math', slug: 'random-number-generator-calculator', aliases: ['random', 'random-number-calculator', 'rng', 'random-number', 'random-number-generator', 'dice-roller'], title: 'Random Number Generator' },
    { id: 'sec-pct-error-calc', cat: 'math', slug: 'percent-error-calculator', aliases: ['percent-error', 'relative-error', 'experimental-error', 'error-calc'], title: 'Percent Error Calculator' },
    { id: 'sec-exponent-calc', cat: 'math', slug: 'exponent-calculator', aliases: ['exponent', 'power', 'exponential', 'power-of-ten', 'power-calculator'], title: 'Exponent Calculator' },
    { id: 'sec-binary-calc', cat: 'math', slug: 'binary-calculator', aliases: ['binary', 'bitwise', 'binary-converter', 'base2'], title: 'Binary Calculator' },
    { id: 'sec-hex-calc', cat: 'math', slug: 'hex-calculator', aliases: ['hex', 'hexadecimal', 'hexadecimal-calculator', 'base16'], title: 'Hex Calculator' },
    { id: 'sec-half-life-calc', cat: 'math', slug: 'half-life-calculator', aliases: ['half-life', 'radioactive-decay', 'decay', 'half-life-calc'], title: 'Half-Life Calculator' },
    { id: 'sec-log-calc', cat: 'math', slug: 'log-calculator', aliases: ['log', 'logarithm', 'ln', 'natural-log', 'logarithm-calculator'], title: 'Log Calculator' },
    { id: 'sec-ratio-calc', cat: 'math', slug: 'ratio-calculator', aliases: ['ratio', 'proportion', 'aspect-ratio', 'ratio-solver', 'ratio-proportion-calculator'], title: 'Ratio Calculator' },
    { id: 'sec-root-calc', cat: 'math', slug: 'root-calculator', aliases: ['root', 'square-root', 'cube-root', 'radical', 'square-root-calculator'], title: 'Root Calculator' },
    { id: 'sec-lcm-calc', cat: 'math', slug: 'least-common-multiple-calculator', aliases: ['lcm-calculator', 'lcm', 'least-common-multiple', 'lowest-common-multiple'], title: 'Least Common Multiple (LCM)' },
    { id: 'sec-gcf-calc', cat: 'math', slug: 'greatest-common-factor-calculator', aliases: ['gcf-calculator', 'gcf', 'hcf', 'greatest-common-factor', 'hcf-calculator'], title: 'Greatest Common Factor (GCF)' },
    { id: 'sec-factor-calc', cat: 'math', slug: 'factor-calculator', aliases: ['factor', 'factors', 'prime-factors', 'divisors'], title: 'Factor Calculator' },
    { id: 'sec-rounding-calc', cat: 'math', slug: 'rounding-calculator', aliases: ['rounding', 'round', 'sig-figs', 'significant-figures'], title: 'Rounding Calculator' },
    { id: 'sec-sci-notation-calc', cat: 'math', slug: 'scientific-notation-calculator', aliases: ['scientific-notation', 'sci-notation', 'standard-form', 'engineering-notation'], title: 'Scientific Notation Calculator' },
    { id: 'sec-big-number-calc', cat: 'math', slug: 'big-number-calculator', aliases: ['big-number', 'bigint', 'arbitrary-precision', 'huge-numbers'], title: 'Big Number Calculator' },

    // --- 9 NEW GEOMETRY & TRIGONOMETRY CALCULATORS ---
    { id: 'sec-triangle-calc', cat: 'math', slug: 'triangle-calculator', aliases: ['triangle', 'triangle-solver', 'heron-calculator'], title: 'Triangle Calculator' },
    { id: 'sec-volume-calc', cat: 'math', slug: 'volume-calculator', aliases: ['volume', '3d-volume', 'volume-solver'], title: 'Volume Calculator' },
    { id: 'sec-slope-calc', cat: 'math', slug: 'slope-calculator', aliases: ['slope', 'gradient', 'slope-intercept-calculator'], title: 'Slope Calculator' },
    { id: 'sec-area-calc', cat: 'math', slug: 'area-calculator', aliases: ['area', '2d-area', 'surface-area-2d'], title: 'Area Calculator' },
    { id: 'sec-distance-calc', cat: 'math', slug: 'distance-calculator', aliases: ['distance', '2d-distance', '3d-distance', 'euclidean-distance'], title: 'Distance Calculator' },
    { id: 'sec-circle-calc', cat: 'math', slug: 'circle-calculator', aliases: ['circle', 'circumference', 'circle-solver'], title: 'Circle Calculator' },
    { id: 'sec-surface-area-calc', cat: 'math', slug: 'surface-area-calculator', aliases: ['surface-area', 'total-surface-area', '3d-surface-area'], title: 'Surface Area Calculator' },
    { id: 'sec-pythagorean-calc', cat: 'math', slug: 'pythagorean-theorem-calculator', aliases: ['pythagorean', 'pythagoras', 'pythagorean-calculator'], title: 'Pythagorean Theorem Calculator' },
    { id: 'sec-right-triangle-calc', cat: 'math', slug: 'right-triangle-calculator', aliases: ['right-triangle', 'right-angle-triangle', 'hypotenuse-calculator'], title: 'Right Triangle Calculator' },

    // --- DAILY UTILITIES & TOOLS (34 Tools) ---
    { id: 'sec-unit-calc', cat: 'other', slug: 'unit-converter-calculator', aliases: ['unit-converter', 'unit', 'converter', 'units'], title: 'Universal Unit Converter' },
    { id: 'sec-age-calc', cat: 'other', slug: 'age-calculator', aliases: ['age', 'date-difference', 'chronological-age'], title: 'Age Calculator & Chronology' },
    { id: 'sec-gpa-calc', cat: 'utility', slug: 'gpa-calculator', aliases: ['gpa', 'college-gpa', 'grade-point-average', 'other/gpa-calculator', 'everyday/gpa-calculator'], title: 'College & School GPA Calculator' },
    { id: 'sec-work-calc', cat: 'other', slug: 'work-hours-calculator', aliases: ['work-hours', 'work', 'hours', 'timesheet', 'work-wages'], title: 'Work Hours & Wages Calculator' },
    // Date & Time Suite (9)
    { id: 'sec-date-calc', cat: 'other', slug: 'date-calculator', aliases: ['date', 'date-difference-calculator', 'add-days', 'calendar-calculator'], title: 'Date Calculator' },
    { id: 'sec-time-calc', cat: 'other', slug: 'time-calculator', aliases: ['time', 'time-addition-calculator', 'time-subtraction-calculator', 'clock-calculator'], title: 'Time Calculator' },
    { id: 'sec-hours-calc', cat: 'other', slug: 'hours-calculator', aliases: ['hours', 'hours-worked-calculator', 'shift-hours-calculator', 'decimal-hours-calculator'], title: 'Hours Calculator' },
    { id: 'sec-time-card-calc', cat: 'other', slug: 'time-card-calculator', aliases: ['time-card', 'timesheet-calculator', 'weekly-time-card-calculator', 'timecard-calculator'], title: 'Time Card Calculator' },
    { id: 'sec-time-zone-calc', cat: 'other', slug: 'time-zone-calculator', aliases: ['time-zone', 'timezone-calculator', 'world-clock-calculator', 'tz-converter-calculator'], title: 'Time Zone Calculator' },
    { id: 'sec-time-duration-calc', cat: 'other', slug: 'time-duration-calculator', aliases: ['time-duration', 'duration-calculator', 'elapsed-time-calculator', 'timestamp-calculator'], title: 'Time Duration Calculator' },
    { id: 'sec-day-counter-calc', cat: 'other', slug: 'day-counter-calculator', aliases: ['day-counter', 'business-days-calculator', 'working-days-calculator', 'day-count-calculator'], title: 'Day Counter Calculator' },
    { id: 'sec-day-of-week-calc', cat: 'other', slug: 'day-of-the-week-calculator', aliases: ['day-of-the-week', 'day-of-week-calculator', 'day-finder-calculator', 'what-day-was-it-calculator'], title: 'Day of the Week Calculator' },
    // Housing / Building Suite (8)
    { id: 'sec-concrete-calc', cat: 'other', slug: 'concrete-calculator', aliases: ['concrete', 'cement-calculator', 'slab-calculator', 'concrete-volume-calculator'], title: 'Concrete Calculator' },
    { id: 'sec-btu-calc', cat: 'other', slug: 'btu-calculator', aliases: ['btu', 'air-conditioner-calculator', 'ac-btu-calculator', 'heating-cooling-calculator'], title: 'BTU Calculator' },
    { id: 'sec-sqft-calc', cat: 'other', slug: 'square-footage-calculator', aliases: ['square-footage', 'sqft-calculator', 'flooring-calculator', 'room-area-calculator'], title: 'Square Footage Calculator' },
    { id: 'sec-stair-calc', cat: 'other', slug: 'stair-calculator', aliases: ['stair', 'stairs-calculator', 'staircase-calculator', 'riser-tread-calculator'], title: 'Stair Calculator' },
    { id: 'sec-roofing-calc', cat: 'other', slug: 'roofing-calculator', aliases: ['roofing', 'roof-calculator', 'shingle-calculator', 'roof-pitch-calculator'], title: 'Roofing Calculator' },
    { id: 'sec-tile-calc', cat: 'other', slug: 'tile-calculator', aliases: ['tile', 'tiles-calculator', 'tile-box-calculator', 'flooring-tile-calculator'], title: 'Tile Calculator' },
    { id: 'sec-mulch-calc', cat: 'other', slug: 'mulch-calculator', aliases: ['mulch', 'landscaping-mulch-calculator', 'yard-mulch-calculator', 'garden-bed-calculator'], title: 'Mulch Calculator' },
    { id: 'sec-gravel-calc', cat: 'other', slug: 'gravel-calculator', aliases: ['gravel', 'aggregate-calculator', 'crushed-stone-calculator', 'driveway-gravel-calculator'], title: 'Gravel Calculator' },
    // Measurements & Science Suite (10)
    { id: 'sec-height-calc', cat: 'other', slug: 'height-calculator', aliases: ['height', 'stature', 'child-height-calculator', 'height-converter'], title: 'Height Calculator' },
    { id: 'sec-conversion-calc', cat: 'other', slug: 'conversion-calculator', aliases: ['conversion', 'multi-unit-converter', 'measurement-conversion'], title: 'Conversion Calculator' },
    { id: 'sec-gdp-calc', cat: 'other', slug: 'gdp-calculator', aliases: ['gdp', 'gross-domestic-product', 'gdp-per-capita', 'macroeconomics-calculator'], title: 'GDP Calculator' },
    { id: 'sec-density-calc', cat: 'other', slug: 'density-calculator', aliases: ['density', 'mass-volume-density', 'specific-gravity-calculator'], title: 'Density Calculator' },
    { id: 'sec-mass-calc', cat: 'other', slug: 'mass-calculator', aliases: ['mass', 'mass-from-density', 'weight-to-mass', 'physics-mass-calculator'], title: 'Mass Calculator' },
    { id: 'sec-weight-calc', cat: 'other', slug: 'weight-calculator', aliases: ['weight', 'planet-weight-calculator', 'gravitational-weight', 'weight-force'], title: 'Weight Calculator' },
    { id: 'sec-speed-calc', cat: 'other', slug: 'speed-calculator', aliases: ['speed', 'pace-calculator', 'velocity-calculator', 'distance-speed-time'], title: 'Speed Calculator' },
    { id: 'sec-molarity-calc', cat: 'other', slug: 'molarity-calculator', aliases: ['molarity', 'solution-concentration', 'chemistry-molarity', 'dilution-calculator'], title: 'Molarity Calculator' },
    { id: 'sec-molecular-weight-calc', cat: 'other', slug: 'molecular-weight-calculator', aliases: ['molecular-weight', 'molar-mass-calculator', 'formula-weight', 'chemical-molar-mass'], title: 'Molecular Weight Calculator' },
    { id: 'sec-roman-numeral-calc', cat: 'other', slug: 'roman-numeral-calculator', aliases: ['roman-numeral', 'roman-numeral-converter', 'roman-numerals-converter', 'arabic-to-roman'], title: 'Roman Numeral Converter' },
    // Electronics & Circuits Suite (4)
    { id: 'sec-voltage-drop-calc', cat: 'other', slug: 'voltage-drop-calculator', aliases: ['voltage-drop', 'wire-size-calculator', 'wire-voltage-drop', 'nec-voltage-drop'], title: 'Voltage Drop Calculator' },
    { id: 'sec-resistor-calc', cat: 'other', slug: 'resistor-calculator', aliases: ['resistor', 'resistor-color-code', 'resistor-bands', 'series-parallel-resistor'], title: 'Resistor Calculator' },
    { id: 'sec-ohms-law-calc', cat: 'other', slug: 'ohms-law-calculator', aliases: ['ohms-law', 'ohm-calculator', 'voltage-current-resistance', 'electrical-power-calculator'], title: "Ohm's Law Calculator" },
    { id: 'sec-electricity-calc', cat: 'other', slug: 'electricity-calculator', aliases: ['electricity', 'appliance-electricity-cost', 'kwh-cost-calculator', 'electric-bill-calculator'], title: 'Electricity Calculator' },

    
    // --- INTERNET & NETWORKING SUITE (5 Tools) ---
    { id: 'sec-ip-subnet-calc', cat: 'internet', slug: 'ip-subnet-calculator', aliases: ['ip-subnet', 'subnet-calculator', 'cidr-calculator', 'subnet-mask', 'ip-calculator', 'cidr', 'other/ip-subnet-calculator'], title: 'IP Subnet Calculator' },
    { id: 'sec-password-generator-calc', cat: 'internet', slug: 'password-generator', aliases: ['password-generator-calculator', 'password', 'pass-gen', 'random-password', 'secure-password', 'other/password-generator'], title: 'Password Generator' },
    { id: 'sec-bandwidth-calc', cat: 'internet', slug: 'bandwidth-calculator', aliases: ['bandwidth', 'download-time-calculator', 'network-speed-calculator', 'data-transfer-calculator', 'download-calculator', 'other/bandwidth-calculator'], title: 'Bandwidth Calculator' },
    { id: 'sec-base64-calc', cat: 'internet', slug: 'base64-encode-decode', aliases: ['base64', 'base64-calculator', 'base64-encoder', 'base64-decoder', 'base64-encode-decode-calculator', 'other/base64-encode-decode'], title: 'Base64 Encode / Decode' },
    { id: 'sec-url-encode-calc', cat: 'internet', slug: 'url-encode-decode', aliases: ['url-encode', 'url-decoder', 'url-encoder', 'url-encode-decode-calculator', 'percent-encoding', 'other/url-encode-decode'], title: 'URL Encode / Decode' },

    // --- EVERYDAY UTILITY SUITE (5 New Tools) ---
    { id: 'sec-grade-calc', cat: 'utility', slug: 'grade-calculator', aliases: ['grade', 'final-grade-calculator', 'class-grade-calculator', 'exam-grade-calculator', 'other/grade-calculator', 'everyday/grade-calculator'], title: 'Grade Calculator' },
    { id: 'sec-bra-size-calc', cat: 'utility', slug: 'bra-size-calculator', aliases: ['bra-size', 'bra-calculator', 'cup-size-calculator', 'bra-fitting', 'other/bra-size-calculator', 'everyday/bra-size-calculator'], title: 'Bra Size Calculator' },
    { id: 'sec-shoe-size-calc', cat: 'utility', slug: 'shoe-size-calculator', aliases: ['shoe-size', 'shoe-size-conversion', 'shoe-converter', 'foot-size-calculator', 'shoe-size-conversion-calculator', 'other/shoe-size-calculator', 'everyday/shoe-size-calculator'], title: 'Shoe Size Conversion' },
    { id: 'sec-golf-handicap-calc', cat: 'utility', slug: 'golf-handicap-calculator', aliases: ['golf-handicap', 'handicap-calculator', 'whs-handicap', 'golf-score-differential', 'usga-handicap', 'other/golf-handicap-calculator', 'everyday/golf-handicap-calculator'], title: 'Golf Handicap Calculator' },
    { id: 'sec-sleep-calc', cat: 'utility', slug: 'sleep-calculator', aliases: ['sleep', 'bedtime-calculator', 'wake-up-calculator', 'circadian-calculator', 'sleep-cycle-calculator', 'other/sleep-calculator', 'everyday/sleep-calculator'], title: 'Sleep Calculator' },

    // --- WEATHER & CLIMATE SUITE (3 Tools) ---
    { id: 'sec-wind-chill-calc', cat: 'other', slug: 'wind-chill-calculator', aliases: ['wind-chill', 'wind-chill-calc', 'windchill', 'frostbite-calculator', 'weather/wind-chill-calculator', 'other/wind-chill-calculator', 'weather/wind-chill'], title: 'Wind Chill & Frostbite Calculator' },
    { id: 'sec-heat-index-calc', cat: 'other', slug: 'heat-index-calculator', aliases: ['heat-index', 'heat-index-calc', 'humidex', 'feels-like-calculator', 'noaa-heat-index', 'weather/heat-index-calculator', 'other/heat-index-calculator', 'weather/heat-index'], title: 'Heat Index & NOAA Danger Calculator' },
    { id: 'sec-dew-point-calc', cat: 'other', slug: 'dew-point-calculator', aliases: ['dew-point', 'dew-point-calc', 'dewpoint', 'humidity-comfort-calculator', 'weather/dew-point-calculator', 'other/dew-point-calculator', 'weather/dew-point'], title: 'Dew Point & Comfort Index Calculator' },

    // --- TRANSPORTATION & VEHICLE SUITE (6 Tools) ---
    { id: 'sec-fuel-cost-calc', cat: 'other', slug: 'fuel-cost-calculator', aliases: ['fuel-cost', 'fuel-cost-calc', 'trip-fuel-calculator', 'gas-cost-calculator', 'road-trip-cost', 'transportation/fuel-cost-calculator', 'other/fuel-cost-calculator', 'transportation/fuel-cost'], title: 'Fuel Cost & Trip Expense Calculator' },
    { id: 'sec-gas-mileage-calc', cat: 'other', slug: 'gas-mileage-calculator', aliases: ['gas-mileage', 'gas-mileage-calc', 'mpg-calculator', 'fuel-economy-calculator', 'transportation/gas-mileage-calculator', 'other/gas-mileage-calculator', 'transportation/gas-mileage'], title: 'Gas Mileage & Fuel Economy Calculator' },
    { id: 'sec-horsepower-calc', cat: 'other', slug: 'horsepower-calculator', aliases: ['horsepower', 'horsepower-calc', 'hp-calculator', 'torque-to-hp', 'quarter-mile-hp', 'transportation/horsepower-calculator', 'other/horsepower-calculator', 'transportation/horsepower'], title: 'Horsepower Calculator (Torque & ET)' },
    { id: 'sec-engine-horsepower-calc', cat: 'other', slug: 'engine-horsepower-calculator', aliases: ['engine-horsepower', 'engine-hp', 'whp-to-bhp', 'crank-horsepower-calculator', 'displacement-hp', 'transportation/engine-horsepower-calculator', 'other/engine-horsepower-calculator', 'transportation/engine-horsepower'], title: 'Engine Horsepower (WHP to BHP) Calculator' },
    { id: 'sec-mileage-calc', cat: 'other', slug: 'mileage-calculator', aliases: ['mileage', 'mileage-calc', 'business-mileage-calculator', 'irs-mileage-calculator', 'commute-mileage-calculator', 'transportation/mileage-calculator', 'other/mileage-calculator', 'transportation/mileage'], title: 'Mileage Reimbursement Calculator' },
    { id: 'sec-tire-size-calc', cat: 'other', slug: 'tire-size-calculator', aliases: ['tire-size', 'tire-size-calc', 'tire-comparison-calculator', 'speedometer-error-calculator', 'tire-diameter', 'transportation/tire-size-calculator', 'other/tire-size-calculator', 'transportation/tire-size'], title: 'Tire Size Comparison Calculator' },

    // --- ENTERTAINMENT & ANECDOTES SUITE (2 Tools) ---
    { id: 'sec-dice-roller-calc', cat: 'other', slug: 'dice-roller-calculator', aliases: ['dice-roller', 'dice-roller-calc', 'dice', 'rpg-dice-calculator', 'dnd-dice-roller', 'dice-probability-calculator', 'entertainment/dice-roller-calculator', 'other/dice-roller-calculator', 'entertainment/dice-roller'], title: 'Dice Roller & RPG Probability Calculator' },
    { id: 'sec-love-calc', cat: 'other', slug: 'love-calculator', aliases: ['love', 'love-calc', 'love-compatibility-calculator', 'relationship-calculator', 'flames-calculator', 'entertainment/love-calculator', 'other/love-calculator', 'entertainment/love'], title: 'Love Calculator & Compatibility Meter' },

    // --- STANDARD & SCIENTIFIC KEYPAD (2 Modes) ---
    { id: 'box-std-mode', cat: 'standard', slug: 'standard-calculator', aliases: ['standard', 'standard-keypad', 'keypad', 'calc'], title: 'Standard Calculator' },
    { id: 'box-sci-mode', cat: 'standard', slug: 'scientific-calculator', aliases: ['scientific', 'sci', 'scientific-keypad', 'scientific-calc'], title: 'Scientific Calculator' }
  ];

  // Lookup fast indexes
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

  const BASE_APP_TITLE = 'CALC• Modern Calculator';

  // HTML5 History API Browser Router Engine
  const AppRouter = {
    registry: CALC_REGISTRY,
    isDispatching: false,
    getCalcById(id) {
      return byId.get(id);
    },

    /**
     * Resolve any pathname and query string into a concrete navigation instruction.
     * Works with:
     * - /fitness/pregnancy
     * - /financial/auto-loan
     * - /financial/mortgage
     * - /math/percentage
     * - /other/age
     * - /standard
     * - /scientific
     * - /financial?filter=auto
     * - /fitness?filter=pregnancy
     * - /calculator/pregnancy
     * - /pregnancy
     * - /
     */
    resolve(rawPath, rawSearch = '') {
      let pathStr = (rawPath || (typeof window !== 'undefined' ? window.location.pathname : '/')).trim();

      // Clean leading and trailing slashes
      pathStr = pathStr.replace(/^\/+|\/+$/g, '');

      // Parse query params
      const searchStr = rawSearch || (typeof window !== 'undefined' ? window.location.search : '');
      const queryParams = {};
      if (searchStr) {
        const cleaned = searchStr.replace(/^\?/, '');
        const sp = new URLSearchParams(cleaned);
        sp.forEach((v, k) => queryParams[k] = v);
      }

      // Root, hub, all, or index.html -> Zenith Hub
      if (!pathStr || pathStr === 'hub' || pathStr === 'all' || pathStr === 'index.html' || pathStr === 'view-zenith-hub') {
        return { type: 'hub', path: '/', title: 'All-in-One Calculator Suite' };
      }

      // Path segments
      const segments = pathStr.split('/').filter(Boolean);

      // 1. Direct DOM ID match (e.g. /sec-pregnancy-calc)
      const directIdMatch = byId.get(segments[segments.length - 1]) || byId.get(pathStr);
      if (directIdMatch) {
        return {
          type: 'calc',
          category: directIdMatch.cat,
          id: directIdMatch.id,
          slug: directIdMatch.slug,
          path: `/${directIdMatch.cat}/${directIdMatch.slug}`,
          title: directIdMatch.title,
          calc: directIdMatch
        };
      }

      // 2. /calculator/<slug> or /calc/<slug>
      if (segments.length >= 2 && (segments[0] === 'calculator' || segments[0] === 'calc')) {
        const targetSlug = segments[1].toLowerCase();
        const found = bySlug.get(targetSlug) || byAlias.get(targetSlug) || byId.get(targetSlug);
        if (found) {
          return {
            type: 'calc',
            category: found.cat,
            id: found.id,
            slug: found.slug,
            path: `/${found.cat}/${found.slug}`,
            title: found.title,
            calc: found
          };
        }
      }

      // 3. /<category>/<slug> (e.g. /fitness/pregnancy, /financial/auto-loan)
      if (segments.length >= 2) {
        const combined = `${segments[0].toLowerCase()}/${segments[1].toLowerCase()}`;
        const found = bySlug.get(combined) || byAlias.get(combined);
        if (found) {
          return {
            type: 'calc',
            category: found.cat,
            id: found.id,
            slug: found.slug,
            path: `/${found.cat}/${found.slug}`,
            title: found.title,
            calc: found
          };
        }
      }

      // 4. Single segment (category catalog, direct slug, or keypad mode)
      if (segments.length === 1) {
        const single = segments[0].toLowerCase();

        // Keypad modes
        if (single === 'scientific' || single === 'scientific-calculator') {
          const sci = byId.get('box-sci-mode');
          return { type: 'calc', category: 'standard', id: sci.id, slug: 'scientific-calculator', path: '/scientific-calculator', title: 'Scientific Calculator', calc: sci };
        }
        if (single === 'standard' || single === 'standard-calculator') {
          const std = byId.get('box-std-mode');
          return { type: 'calc', category: 'standard', id: std.id, slug: 'standard-calculator', path: '/standard-calculator', title: 'Standard Calculator', calc: std };
        }

        // Category catalogs
        const categories = ['financial', 'fitness', 'math', 'other', 'internet', 'utility', 'everyday', 'weather', 'transportation', 'entertainment'];
        if (categories.includes(single)) {
          let catTarget = single;
          let filter = queryParams.filter || null;
          if (single === 'internet') {
            catTarget = 'other';
            filter = 'internet';
          } else if (single === 'utility' || single === 'everyday') {
            catTarget = 'other';
            filter = 'everyday';
          } else if (single === 'weather') {
            catTarget = 'other';
            filter = 'weather';
          } else if (single === 'transportation') {
            catTarget = 'other';
            filter = 'transportation';
          } else if (single === 'entertainment') {
            catTarget = 'other';
            filter = 'entertainment';
          }
          let catalogPath = `/${single}`;
          if (queryParams.filter && queryParams.filter !== 'all') {
            catalogPath += `?filter=${encodeURIComponent(queryParams.filter)}`;
          }
          return {
            type: 'catalog',
            category: catTarget,
            filter: filter,
            path: catalogPath,
            title: this.getCategoryTitle(single, filter)
          };
        }

        // Direct slug match (e.g. /pregnancy, /mortgage, /auto-loan)
        const found = bySlug.get(single) || byAlias.get(single);
        if (found) {
          return {
            type: 'calc',
            category: found.cat,
            id: found.id,
            slug: found.slug,
            path: `/${found.cat}/${found.slug}`,
            title: found.title,
            calc: found
          };
        }
      }

      // Fallback -> Zenith Hub
      return { type: 'hub', path: '/', title: 'All-in-One Calculator Suite' };
    },

    getCategoryTitle(category, filter) {
      if (category === 'financial') {
        return filter ? `Financial - ${filter.toUpperCase()} | CALC•` : 'Financial Calculators Suite | CALC•';
      }
      if (category === 'fitness') {
        if (filter === 'pregnancy') return 'Pregnancy & Maternal Calculators | CALC•';
        if (filter === 'fitness') return 'Fitness & Workout Calculators | CALC•';
        return 'Health & Fitness Suite | CALC•';
      }
      if (category === 'math') return 'Math & Algebra Solvers | CALC•';
      if (category === 'internet' || filter === 'internet') return 'Internet & Networking Tools | CALC•';
      if (category === 'utility' || category === 'everyday' || filter === 'everyday') return 'Everyday Utility Calculators | CALC•';
      if (category === 'weather' || filter === 'weather') return 'Weather & Climate Calculators | CALC•';
      if (category === 'transportation' || filter === 'transportation') return 'Transportation & Vehicle Calculators | CALC•';
      if (category === 'entertainment' || filter === 'entertainment') return 'Entertainment & Anecdotes Calculators | CALC•';
      if (category === 'other') {
        if (filter === 'internet') return 'Internet & Networking Tools | CALC•';
        if (filter === 'everyday') return 'Everyday Utility Calculators | CALC•';
        if (filter === 'weather') return 'Weather & Climate Calculators | CALC•';
        if (filter === 'transportation') return 'Transportation & Vehicle Calculators | CALC•';
        if (filter === 'entertainment') return 'Entertainment & Anecdotes Calculators | CALC•';
        if (filter === 'date') return 'Date & Time Calculators | CALC•';
        if (filter === 'housing') return 'Housing & Building Calculators | CALC•';
        if (filter === 'measurements') return 'Measurements & Science Calculators | CALC•';
        if (filter === 'electronics') return 'Electronics & Circuit Calculators | CALC•';
        if (filter === 'general') return 'Daily Utilities & Tools | CALC•';
        return 'Daily Utilities & Tools | CALC•';
      }
      if (category === 'standard') return 'Standard Calculator | CALC•';
      return BASE_APP_TITLE;
    },

    /**
     * Get the canonical clean path for a given calculator (Browser Router format)
     */
    getUrlForCalc(calcOrId) {
      let calc = typeof calcOrId === 'object' ? calcOrId : byId.get(calcOrId);
      if (!calc && typeof calcOrId === 'string') {
        calc = bySlug.get(calcOrId) || byAlias.get(calcOrId);
      }
      if (!calc) return '/';
      if (calc.cat === 'standard') {
        return calc.slug.includes('scientific') ? '/scientific-calculator' : '/standard-calculator';
      }
      return `/${calc.cat}/${calc.slug}`;
    },

    /**
     * Update URL in browser address bar using HTML5 History API (pushState)
     */
    setAddressUrl(targetPath, newTitle, replace = false) {
      if (typeof window === 'undefined') return;
      const cleanPath = targetPath.startsWith('/') ? targetPath : `/${targetPath}`;
      const currentFull = window.location.pathname + window.location.search;

      if (currentFull !== cleanPath) {
        if (window.history && window.history.pushState) {
          if (replace) {
            window.history.replaceState({ path: cleanPath }, newTitle || document.title, cleanPath);
          } else {
            window.history.pushState({ path: cleanPath }, newTitle || document.title, cleanPath);
          }
        }
      }

      if (newTitle) {
        document.title = `${newTitle} | ${BASE_APP_TITLE}`;
        try {
          if (typeof document !== 'undefined') {
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) {
              metaDesc.setAttribute('content', `Use the free, interactive ${newTitle} on CALC• Modern Calculator - 100% client-side precision calculations, instantaneous results, and comprehensive benchmarks.`);
            }
            const ogTitle = document.querySelector('meta[property="og:title"]');
            if (ogTitle) {
              ogTitle.setAttribute('content', `${newTitle} | CALC• Modern Calculator`);
            }
          }
        } catch (e) {}
      }
    },

    /**
     * Notify router that a calculator has been opened in the UI.
     * Updates URL with clean browser path (e.g. /fitness/pregnancy).
     */
    onCalculatorOpened(calcId, category) {
      if (this.isDispatching) return;
      const calc = byId.get(calcId);
      if (calc) {
        const canonicalPath = this.getUrlForCalc(calc);
        this.setAddressUrl(canonicalPath, calc.title);
      } else {
        const fallbackCat = category || 'financial';
        this.setAddressUrl(`/${fallbackCat}/${calcId}`, 'Calculator');
      }
    },

    /**
     * Notify router that a catalog view has been opened (e.g. Back to Catalog or Filter click).
     */
    onCatalogOpened(category, filter = null) {
      if (this.isDispatching) return;
      let targetPath = `/${category}`;
      if (filter && filter !== 'all') {
        targetPath += `?filter=${encodeURIComponent(filter)}`;
      }
      const title = this.getCategoryTitle(category, filter);
      this.setAddressUrl(targetPath, title.replace(` | ${BASE_APP_TITLE}`, ''));
    },

    /**
     * Notify router that user returned to Zenith Hub
     */
    onHubOpened() {
      if (this.isDispatching) return;
      this.setAddressUrl('/', 'All Calculators');
      document.title = `${BASE_APP_TITLE} - All-in-One Calculator Suite`;
    },

    /**
     * Synchronize DOM according to a resolved route.
     */
    applyRoute(route) {
      this.isDispatching = true;
      try {
        if (route.type === 'hub') {
          if (typeof window.backToZenithHub === 'function') {
            window.backToZenithHub();
          } else {
            document.querySelectorAll('.view-section').forEach(sec => {
              sec.classList.toggle('active', sec.id === 'view-zenith-hub');
            });
          }
          document.title = `${BASE_APP_TITLE} - All-in-One Calculator Suite`;
          return;
        }

        if (route.type === 'catalog') {
          // Switch to category view
          if (typeof window.navigateToTab === 'function') {
            window.navigateToTab(route.category);
          } else {
            document.querySelectorAll('.view-section').forEach(sec => {
              sec.classList.toggle('active', sec.id === `view-${route.category}`);
            });
          }

          // Ensure catalog view is visible, detail hidden
          if (route.category === 'financial' && window.FinancialCalcs) {
            window.FinancialCalcs.showCatalog();
            if (route.filter) window.FinancialCalcs.filterCatalog(route.filter);
          } else if (route.category === 'fitness' && window.FitnessCalcs) {
            window.FitnessCalcs.showCatalog();
            if (route.filter) window.FitnessCalcs.filterCatalog(route.filter);
          } else if (route.category === 'math' && window.MathCalcs) {
            window.MathCalcs.showCatalog();
          } else if (route.category === 'other' && window.OtherCalcs) {
            window.OtherCalcs.showCatalog();
            if (route.filter) window.OtherCalcs.filterCatalog(route.filter);
          }

          document.title = `${route.title} | ${BASE_APP_TITLE}`;
          return;
        }

        if (route.type === 'calc') {
          const cat = route.category;
          const calcId = route.id;
          const actualViewCat = (cat === 'internet' || cat === 'utility' || cat === 'everyday' || cat === 'weather' || cat === 'transportation' || cat === 'entertainment') ? 'other' : cat;

          // 1. Switch to appropriate view section
          document.querySelectorAll('.view-section').forEach(sec => {
            sec.classList.toggle('active', sec.id === `view-${actualViewCat}`);
          });

          // 2. Sync tab pill navigation
          document.querySelectorAll('.zenith-nav-dropdown').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('onclick')?.includes(`'${actualViewCat}'`));
          });
          document.querySelectorAll('.cat-tab-btn').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.view === actualViewCat);
          });

          // 3. Open the specific calculator inside the engine
          if (cat === 'financial' && window.FinancialCalcs) {
            window.FinancialCalcs.openCalculator(calcId);
          } else if (cat === 'fitness' && window.FitnessCalcs) {
            window.FitnessCalcs.openCalculator(calcId);
          } else if (cat === 'math' && window.MathCalcs) {
            window.MathCalcs.openCalculator(calcId);
          } else if ((actualViewCat === 'other') && window.OtherCalcs) {
            window.OtherCalcs.openCalculator(calcId);
          } else if (cat === 'standard' && window.stdCalc) {
            if (calcId === 'box-sci-mode' || route.slug === 'scientific') {
              window.stdCalc.setScientificMode(true);
            } else {
              window.stdCalc.setScientificMode(false);
            }
          }

          document.title = `${route.title} | ${BASE_APP_TITLE}`;

          // Scroll to top
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } finally {
        this.isDispatching = false;
      }
    },

    /**
     * Copy direct clean URL of currently opened calculator or view
     */
    copyCurrentUrl() {
      const fullUrl = window.location.href;
      navigator.clipboard.writeText(fullUrl).then(() => {
        if (typeof window.showToast === 'function') {
          window.showToast(`Clean URL copied: ${fullUrl} 🔗`, '🔗');
        }
      }).catch(() => {
        if (typeof window.showToast === 'function') {
          window.showToast(`URL copied!`, '🔗');
        }
      });
    },

    /**
     * Main dispatch triggered by initial load or popstate
     */
    dispatch() {
      // Legacy hash migration: If user arrives with a hash like /#/fitness/pregnancy, convert it to browser router
      if (window.location.hash && window.location.hash.length > 1) {
        const hashContent = window.location.hash.replace(/^#\/?/, '');
        const resolvedFromHash = this.resolve(hashContent);
        if (resolvedFromHash && resolvedFromHash.path) {
          // Replace state with clean browser router path
          this.setAddressUrl(resolvedFromHash.path, resolvedFromHash.title, true);
          this.applyRoute(resolvedFromHash);
          return;
        }
      }

      const route = this.resolve(window.location.pathname, window.location.search);
      this.applyRoute(route);
    },

    /**
     * Initialize event listeners for HTML5 Browser Router
     */
    init() {
      // Listen for browser forward/back buttons
      window.addEventListener('popstate', () => {
        this.dispatch();
      });

      // Dispatch initial route on page load
      this.dispatch();
    }
  };

  // Expose globally
  window.AppRouter = AppRouter;

})();
