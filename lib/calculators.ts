export interface FAQItem {
  question: string;
  answer: string;
}

export interface CalculatorDefinition {
  slug: string;
  name: string;
  category: 'finance' | 'health' | 'math' | 'utility';
  categoryLabel: string;
  categorySlug: string;
  title: string; // Under 60 chars
  h1: string;
  metaDescription: string; // Under 155 chars
  keywords: string[];
  shortDescription: string;
  explanation: string;
  formula?: string;
  faqs: FAQItem[];
  relatedSlugs: string[];
}

export const CATEGORIES = {
  finance: {
    name: 'Finance & Investment Calculators',
    slug: 'finance-calculators',
    description: 'Comprehensive financial calculators for loans, mortgages, investments, retirement, and tax planning.',
  },
  health: {
    name: 'Health & Fitness Calculators',
    slug: 'health-calculators',
    description: 'Clinical and wellness calculators for BMI, body fat percentage, calorie burn, and target heart rates.',
  },
  math: {
    name: 'Math & Scientific Solvers',
    slug: 'math-calculators',
    description: 'Advanced mathematics, algebra, trigonometry, and scientific calculation tools for students and professionals.',
  },
  utility: {
    name: 'Everyday & Unit Utilities',
    slug: 'utility-calculators',
    description: 'Practical daily utilities including unit converters, age finders, time trackers, and everyday math helpers.',
  },
} as const;

export const CALCULATORS: CalculatorDefinition[] = [
  {
    slug: 'loan-calculator',
    name: 'Loan & EMI Calculator',
    category: 'finance',
    categoryLabel: 'Finance',
    categorySlug: 'finance-calculators',
    title: 'Loan & EMI Calculator | Monthly Payment Solver',
    h1: 'Loan & EMI Calculator',
    metaDescription: 'Calculate monthly loan EMI payments, total interest, and complete amortization schedules with real-time interest rate adjustments.',
    keywords: ['loan calculator', 'emi calculator', 'personal loan', 'loan payment', 'amortization schedule'],
    shortDescription: 'Calculate monthly loan payments, total interest, and view an interactive amortization schedule.',
    explanation: 'A loan calculator computes your periodic installment based on the principal amount borrowed, annual percentage rate (APR), and repayment tenure. By adjusting your tenure or making extra prepayments, you can drastically reduce total interest paid over the life of the loan.',
    formula: 'EMI = [P × r × (1 + r)^n] / [(1 + r)^n - 1]\nWhere P = Principal Loan Amount, r = Monthly Interest Rate (Annual Rate / 12 / 100), n = Total Number of Monthly Payments.',
    faqs: [
      {
        question: 'How is the monthly loan payment (EMI) calculated?',
        answer: 'Monthly EMI is calculated using standard reducing balance amortization: EMI = [P × r × (1+r)^n] / [(1+r)^n - 1]. Each monthly payment includes both principal reduction and interest accrued for that month.',
      },
      {
        question: 'Does making extra principal payments reduce overall loan tenure?',
        answer: 'Yes. Every dollar paid above your scheduled monthly payment directly pays down the principal balance, reducing future interest charges and shortening the overall loan payoff timeline.',
      },
      {
        question: 'What is the difference between fixed and floating loan interest rates?',
        answer: 'Fixed-rate loans maintain the exact same interest rate and payment throughout the loan term. Floating or variable-rate loans fluctuate based on benchmark market rates (e.g. SOFR, Prime Rate, or RBI Repo Rate).',
      },
    ],
    relatedSlugs: ['mortgage-calculator', 'auto-loan-calculator', 'compound-interest-calculator', 'sip-calculator'],
  },
  {
    slug: 'mortgage-calculator',
    name: 'Mortgage Calculator',
    category: 'finance',
    categoryLabel: 'Finance',
    categorySlug: 'finance-calculators',
    title: 'Mortgage Calculator | Home Loan Payments & Taxes',
    h1: 'Mortgage Calculator',
    metaDescription: 'Estimate your monthly mortgage payment including principal, interest, property taxes, home insurance, and PMI with amortization.',
    keywords: ['mortgage calculator', 'home loan calculator', 'pmi calculator', 'property tax', 'amortization schedule'],
    shortDescription: 'Estimate comprehensive monthly housing costs including principal, interest, taxes, and PMI.',
    explanation: 'A comprehensive mortgage calculator evaluates total housing costs by factoring in your home purchase price, down payment, loan term, interest rate, property taxes, homeowners insurance, and private mortgage insurance (PMI).',
    formula: 'Total Monthly Payment = (P × [r(1 + r)^n] / [(1 + r)^n - 1]) + Monthly Property Tax + Homeowners Insurance + PMI',
    faqs: [
      {
        question: 'What does PITI stand for in mortgage calculations?',
        answer: 'PITI stands for Principal, Interest, Taxes, and Insurance. It represents the four primary components of a standard monthly mortgage payment.',
      },
      {
        question: 'When is Private Mortgage Insurance (PMI) required?',
        answer: 'Conventional lenders typically require PMI when the down payment is less than 20% of the home purchase price. PMI automatically drops off once your loan balance reaches 78% of the original purchase value.',
      },
      {
        question: 'Should I choose a 15-year or a 30-year fixed mortgage?',
        answer: 'A 30-year fixed mortgage offers lower monthly payments, providing greater cash flow flexibility. A 15-year mortgage has higher monthly payments but saves tens of thousands in interest and builds equity much faster.',
      },
    ],
    relatedSlugs: ['loan-calculator', 'auto-loan-calculator', 'compound-interest-calculator', 'sip-calculator'],
  },
  {
    slug: 'auto-loan-calculator',
    name: 'Auto Loan Calculator',
    category: 'finance',
    categoryLabel: 'Finance',
    categorySlug: 'finance-calculators',
    title: 'Auto Loan Calculator | Car Payment & Interest',
    h1: 'Auto Loan Calculator',
    metaDescription: 'Calculate monthly car loan payments, total financing costs, sales tax, and trade-in value across 24 to 84 month loan terms.',
    keywords: ['auto loan calculator', 'car payment calculator', 'vehicle financing', 'car loan interest', 'auto financing'],
    shortDescription: 'Calculate monthly car payments, total financing interest, and dealer terms.',
    explanation: 'An auto loan calculator determines your monthly vehicle installment, incorporating purchase price, down payment, trade-in allowance, sales tax rate, and loan term ranging from 24 to 84 months.',
    formula: 'Monthly Payment = [Financed Amount × Monthly Rate × (1 + Monthly Rate)^Months] / [(1 + Monthly Rate)^Months - 1]',
    faqs: [
      {
        question: 'How does loan term length affect car payments?',
        answer: 'A longer term (e.g. 72 or 84 months) lowers your monthly payment but significantly increases the total interest you pay over the loan life and increases the risk of being upside down on your vehicle.',
      },
      {
        question: 'How does a vehicle trade-in reduce loan costs?',
        answer: 'The trade-in value is subtracted from the vehicle purchase price, reducing both the financed amount and in many states reducing the sales tax assessed on the purchase.',
      },
      {
        question: 'What credit score is needed for the best auto loan rates?',
        answer: 'Credit scores above 720 typically qualify for prime and super-prime interest rates from banks, credit unions, and manufacturer captive financing arms.',
      },
    ],
    relatedSlugs: ['loan-calculator', 'mortgage-calculator', 'compound-interest-calculator', 'percentage-calculator'],
  },
  {
    slug: 'compound-interest-calculator',
    name: 'Compound Interest Calculator',
    category: 'finance',
    categoryLabel: 'Finance',
    categorySlug: 'finance-calculators',
    title: 'Compound Interest Calculator | Investment Growth',
    h1: 'Compound Interest Calculator',
    metaDescription: 'Project investment growth over time with daily, monthly, or annual compound interest and regular recurring monthly contributions.',
    keywords: ['compound interest calculator', 'investment calculator', 'compound growth', 'interest compounding', 'future value'],
    shortDescription: 'Forecast compound interest growth with periodic deposits and flexible compounding frequencies.',
    explanation: 'Compound interest is the interest on savings or investment calculated on both the initial principal and the accumulated interest from prior periods. Albert Einstein famously called compound interest the eighth wonder of the world.',
    formula: 'A = P(1 + r/n)^(nt) + PMT × [((1 + r/n)^(nt) - 1) / (r/n)]\nWhere P = Principal, r = Annual Rate, n = Compounding frequency per year, t = Years, PMT = Periodic Contribution.',
    faqs: [
      {
        question: 'What is the Rule of 72?',
        answer: 'The Rule of 72 is a quick mental math shortcut: divide 72 by your annual interest rate to find the approximate number of years it takes for your investment to double (e.g. 72 / 8% = 9 years).',
      },
      {
        question: 'How does compounding frequency impact returns?',
        answer: 'The more frequently interest compounds (daily vs monthly vs annually), the faster your wealth accumulates, as interest is credited and earns subsequent interest sooner.',
      },
      {
        question: 'How do regular monthly contributions enhance compounding?',
        answer: 'Regular contributions inject new principal consistently into the compounding cycle, multiplying exponential growth substantially over 10, 20, and 30-year horizons.',
      },
    ],
    relatedSlugs: ['sip-calculator', 'loan-calculator', 'mortgage-calculator', 'percentage-calculator'],
  },
  {
    slug: 'sip-calculator',
    name: 'SIP Calculator',
    category: 'finance',
    categoryLabel: 'Finance',
    categorySlug: 'finance-calculators',
    title: 'SIP Calculator | Mutual Fund Wealth Planner',
    h1: 'SIP Calculator (Systematic Investment Plan)',
    metaDescription: 'Calculate the future maturity value and wealth gain of your monthly Systematic Investment Plan (SIP) in equity mutual funds.',
    keywords: ['sip calculator', 'systematic investment plan', 'mutual fund sip', 'wealth planner', 'mutual fund return'],
    shortDescription: 'Forecast maturity value and total wealth created through monthly SIP investments.',
    explanation: 'A Systematic Investment Plan (SIP) allows investors to invest a fixed amount regularly into mutual fund portfolios, taking advantage of rupee-cost / dollar-cost averaging and long-term compounding.',
    formula: 'M = P × [((1 + i)^n - 1) / i] × (1 + i)\nWhere M = Maturity Value, P = Periodic SIP installment, i = Periodic rate of return, n = Total number of installments.',
    faqs: [
      {
        question: 'What is rupee-cost averaging in SIPs?',
        answer: 'When market prices drop, your fixed SIP installment purchases more fund units. When prices rise, it buys fewer units. Over time, this lowers your average cost per unit without timing the market.',
      },
      {
        question: 'Can I increase my SIP amount over time?',
        answer: 'Yes, step-up or top-up SIPs allow you to increase your contribution annually (e.g. by 10% each year with salary increments), which can more than double your final corpus.',
      },
      {
        question: 'Are returns from SIP investments guaranteed?',
        answer: 'Mutual fund returns depend on market performance and are not guaranteed, but historical broad-market equity index funds have averaged 10%–14% annualized returns over 10+ year periods.',
      },
    ],
    relatedSlugs: ['compound-interest-calculator', 'loan-calculator', 'percentage-calculator', 'mortgage-calculator'],
  },
  {
    slug: 'bmi-calculator',
    name: 'BMI Calculator',
    category: 'health',
    categoryLabel: 'Health & Fitness',
    categorySlug: 'health-calculators',
    title: 'BMI Calculator | Body Mass Index & Health Gauge',
    h1: 'Body Mass Index (BMI) Calculator',
    metaDescription: 'Calculate your Body Mass Index (BMI), health classification, and ideal weight range for adults and teens in metric or imperial.',
    keywords: ['bmi calculator', 'body mass index', 'bmi gauge', 'healthy weight', 'obesity chart'],
    shortDescription: 'Calculate Body Mass Index and identify healthy weight categories according to WHO guidelines.',
    explanation: 'Body Mass Index (BMI) is a standardized screening metric derived from a person’s weight and height. It provides an immediate benchmark to categorize individuals as underweight, normal weight, overweight, or obese according to World Health Organization (WHO) standards.',
    formula: 'Metric: BMI = Weight (kg) / [Height (m)]²\nImperial: BMI = [Weight (lbs) / (Height (inches))²] × 703',
    faqs: [
      {
        question: 'What are the standard WHO BMI categories?',
        answer: 'Underweight: BMI < 18.5; Normal weight: BMI 18.5 – 24.9; Overweight: BMI 25.0 – 29.9; Class 1 Obesity: BMI 30.0 – 34.9; Class 2 Obesity: BMI 35.0 – 39.9; Class 3 Obesity: BMI ≥ 40.0.',
      },
      {
        question: 'Does BMI distinguish between muscle and body fat?',
        answer: 'BMI measures total body mass relative to height, so muscular athletes and bodybuilders may register as overweight or obese despite possessing low body fat percentage.',
      },
      {
        question: 'What is considered a healthy BMI target?',
        answer: 'A BMI between 18.5 and 24.9 is considered the optimal healthy weight range for adult men and women, associated with lowest risk for cardiovascular and metabolic disorders.',
      },
    ],
    relatedSlugs: ['age-calculator', 'unit-converter', 'percentage-calculator', 'compound-interest-calculator'],
  },
  {
    slug: 'percentage-calculator',
    name: 'Percentage Calculator',
    category: 'math',
    categoryLabel: 'Math Solvers',
    categorySlug: 'math-calculators',
    title: 'Percentage Calculator | Quick Percent Math Solver',
    h1: 'Percentage Calculator',
    metaDescription: 'Solve percentage of a value, percentage increase/decrease, percent difference, and fraction to percent conversions instantly.',
    keywords: ['percentage calculator', 'percent difference', 'percent change', 'percent increase', 'math solver'],
    shortDescription: 'Solve common percentage problems including percent change, discount percentages, and fractions.',
    explanation: 'A percentage represents a portion expressed per hundred. This solver handles everyday percentage calculations: finding X% of Y, calculating percentage increase or decrease between two values, and determining what percentage one number is of another.',
    formula: 'Basic Percentage: P = (X / Y) × 100\nPercent Change: % Change = [(New Value - Original Value) / Original Value] × 100',
    faqs: [
      {
        question: 'How do you calculate percentage increase or decrease?',
        answer: 'Subtract the original number from the new number, divide by the original number, and multiply by 100. A positive result indicates an increase; a negative result represents a decrease.',
      },
      {
        question: 'How do you find what percentage one number is of another?',
        answer: 'Divide the part by the total whole and multiply by 100. For example, to find what percentage 25 is of 200: (25 / 200) × 100 = 12.5%.',
      },
      {
        question: 'How do you calculate a store discount price?',
        answer: 'Multiply the original price by the discount percentage divided by 100 to find savings, then subtract that from the original price. Example: $80 with 20% off = $80 - ($80 × 0.20) = $64.',
      },
    ],
    relatedSlugs: ['scientific-calculator', 'loan-calculator', 'sip-calculator', 'unit-converter'],
  },
  {
    slug: 'age-calculator',
    name: 'Age Calculator',
    category: 'utility',
    categoryLabel: 'Daily Utilities',
    categorySlug: 'utility-calculators',
    title: 'Age Calculator | Exact Age in Years, Months, Days',
    h1: 'Age Calculator',
    metaDescription: 'Determine your exact chronological age in years, months, weeks, days, hours, and minutes from your date of birth to any target date.',
    keywords: ['age calculator', 'chronological age', 'birthday countdown', 'date difference', 'calculate age'],
    shortDescription: 'Calculate exact age in years, months, and days, with next birthday countdown and fun time units.',
    explanation: 'An age calculator computes chronological age by finding the exact duration between your birth date and the current date (or any specified target date), accurately accounting for varying calendar months and leap years.',
    formula: 'Years = EndYear - BirthYear (adjusted for month/day passed)\nMonths = EndMonth - BirthMonth (borrowing from previous year if negative)\nDays = EndDay - BirthDay (borrowing days from previous month if negative)',
    faqs: [
      {
        question: 'How does the calculator handle leap years?',
        answer: 'The calculator checks each year between the dates to account for February 29th leap days, ensuring exact day counts and accurate calendar intervals.',
      },
      {
        question: 'Can I calculate age as of a past or future date?',
        answer: 'Yes, you can choose any custom target date to determine your exact age on that date, such as for passport applications, retirement planning, or school eligibility.',
      },
      {
        question: 'How is the birthday countdown calculated?',
        answer: 'The countdown checks the upcoming occurrence of your birth month and day, calculating the remaining days, hours, and minutes until your next celebration.',
      },
    ],
    relatedSlugs: ['unit-converter', 'bmi-calculator', 'percentage-calculator', 'loan-calculator'],
  },
  {
    slug: 'unit-converter',
    name: 'Unit Converter',
    category: 'utility',
    categoryLabel: 'Daily Utilities',
    categorySlug: 'utility-calculators',
    title: 'Unit Converter | Length, Weight, Temperature, Area',
    h1: 'Universal Unit Converter',
    metaDescription: 'Convert units for length, weight, temperature, volume, area, speed, time, and digital storage with precision exchange calculations.',
    keywords: ['unit converter', 'metric converter', 'length converter', 'weight conversion', 'temperature converter'],
    shortDescription: 'Convert between metric and imperial units across length, mass, volume, temperature, and data.',
    explanation: 'A universal conversion tool that translates measurements between international metric (SI) units and US customary imperial units across length, weight/mass, volume, area, speed, and temperature.',
    formula: 'Target Value = Source Value × (Source Standard Conversion Factor / Target Standard Conversion Factor)\nTemperature: °F = (°C × 9/5) + 32  |  °C = (°F - 32) × 5/9',
    faqs: [
      {
        question: 'How do you convert Celsius to Fahrenheit?',
        answer: 'Multiply the Celsius temperature by 9/5 (1.8) and add 32. Example: 25°C × 1.8 + 32 = 77°F.',
      },
      {
        question: 'How many pounds are in a kilogram?',
        answer: 'One kilogram is equal to approximately 2.20462 pounds (lbs). Conversely, 1 pound equals 0.453592 kilograms.',
      },
      {
        question: 'What is the difference between fluid ounces and dry ounces?',
        answer: 'Fluid ounces (fl oz) measure volume (liquid capacity), whereas ounces (oz) measure mass or weight. 1 US fluid ounce of water weighs approximately 1.04 dry ounces.',
      },
    ],
    relatedSlugs: ['percentage-calculator', 'scientific-calculator', 'age-calculator', 'bmi-calculator'],
  },
  {
    slug: 'scientific-calculator',
    name: 'Scientific Calculator',
    category: 'math',
    categoryLabel: 'Math Solvers',
    categorySlug: 'math-calculators',
    title: 'Scientific Calculator | Trig, Logs, Powers & Math',
    h1: 'Scientific & Standard Calculator',
    metaDescription: 'High-precision online scientific calculator supporting trigonometry, logarithms, exponentials, roots, factorials, and parentheses.',
    keywords: ['scientific calculator', 'online calculator', 'trig calculator', 'math calculator', 'logarithm calculator'],
    shortDescription: 'Advanced scientific and arithmetic calculator with trigonometric functions, exponents, and memory registers.',
    explanation: 'A browser-based scientific calculator equipped with standard arithmetic and advanced scientific operators including sin, cos, tan, ln, log10, square roots, factorials, and memory storage registers (MC, MR, M+, M-).',
    formula: 'Operator Precedence (PEMDAS): Parentheses ➔ Exponents/Roots ➔ Multiplication/Division ➔ Addition/Subtraction',
    faqs: [
      {
        question: 'What is the difference between Radian and Degree mode?',
        answer: 'Degree mode measures angles from 0 to 360 degrees (common in navigation and geometry). Radian mode measures angles based on circle radius arc length where 2π radians = 360 degrees (standard in calculus and physics).',
      },
      {
        question: 'How do memory functions (MC, MR, M+, M-) work?',
        answer: 'M+ adds the current display value to memory; M- subtracts it; MR recalls the stored memory value to the screen; MC clears the memory register to zero.',
      },
      {
        question: 'What is the difference between ln and log?',
        answer: 'ln represents natural logarithm (base e ≈ 2.71828), whereas log is common logarithm (base 10).',
      },
    ],
    relatedSlugs: ['percentage-calculator', 'unit-converter', 'loan-calculator', 'compound-interest-calculator'],
  },
];

export function getCalculatorBySlug(slug: string): CalculatorDefinition | undefined {
  return CALCULATORS.find(c => c.slug === slug);
}

export function getCalculatorsByCategory(category: 'finance' | 'health' | 'math' | 'utility'): CalculatorDefinition[] {
  return CALCULATORS.filter(c => c.category === category);
}

export function getAllCalculatorSlugs(): string[] {
  return CALCULATORS.map(c => c.slug);
}
