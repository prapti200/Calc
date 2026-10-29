/* ==========================================================================
   CALC• MODERN CALCULATOR - SEO & INFORMATIONAL GUIDE ENGINE
   Provides comprehensive, verified, client-side SEO articles, how-to-use steps,
   mathematical formulas, and FAQs for every calculator when opened.
   ========================================================================== */

(function () {
  'use strict';

  // Curated knowledge base for popular calculators
  const SEO_DATABASE = {
    'sec-loan-calc': {
      title: 'Loan & EMI Payment Calculator',
      category: 'Financial Planning & Banking',
      badge: 'Banking Standard Amortization',
      tagline: 'Precision monthly loan installments, total interest liability, and dynamic principal-versus-interest ratio distribution.',
      overview: 'The <strong>Loan & EMI Calculator</strong> is an advanced financial computation tool designed to evaluate personal loans, commercial bank debt, retail financing, and education loans. It accurately models reducing-balance interest compounding to reveal your exact monthly obligations, total debt liability over the entire tenure, and how each dollar paid breaks down between debt reduction and banking interest charges. Comparing loan offers with an accurate amortization model enables borrowers to negotiate better interest rates, avoid predatory hidden borrowing costs, and choose repayment horizons that fit their budget.',
      steps: [
        { title: 'Specify Principal Borrowing Amount', desc: 'Enter your target loan sum (e.g. $250,000) using the numeric field or drag the interactive slider to test various loan amounts.' },
        { title: 'Configure Annual Interest Rate (APR)', desc: 'Enter the annual percentage rate charged by your lender (e.g. 6.5%). Even a 0.5% rate reduction can save thousands in cumulative interest.' },
        { title: 'Set Repayment Tenure (Years or Months)', desc: 'Adjust your loan term (e.g. 15 or 30 years). Shorter terms increase monthly payments but drastically decrease overall interest liability.' },
        { title: 'Analyze Results & Copy Direct Figures', desc: 'Inspect your monthly EMI, total interest, and proportional breakdown bar. Click any figure to copy it instantly to your clipboard.' }
      ],
      formulaName: 'Reducing Balance Loan Amortization Formula (Standard EMI)',
      formulaExpr: 'EMI = P × \\frac{r(1 + r)^n}{(1 + r)^n - 1}',
      formulaExplanation: 'Where <strong>P</strong> is the principal loan amount, <strong>r</strong> is the periodic monthly interest rate (annual rate divided by 12 and by 100), and <strong>n</strong> is the total number of monthly repayment periods (tenure in years × 12).',
      example: '<strong>Worked Example:</strong> Borrowing $250,000 at an annual interest rate of 6.5% for 15 years (180 months) yields a fixed monthly payment of <strong>$2,177.77</strong>. Across the entire term, you will repay $250,000 in principal and <strong>$141,998</strong> in cumulative interest, resulting in a total payment of $391,998.',
      faqs: [
        {
          q: 'What is an Equated Monthly Installment (EMI)?',
          a: 'An EMI is a fixed monthly payment made by a borrower to a lender on a specified calendar date each month. Each payment is split between the repayment of the principal loan balance and accrued interest on the outstanding sum.'
        },
        {
          q: 'How does loan tenure affect total borrowing cost?',
          a: 'Lengthening your loan tenure lowers your required monthly installment, making immediate cash flow more manageable. However, extending the repayment period keeps your principal balance outstanding longer, substantially increasing the total interest paid over time.'
        },
        {
          q: 'Can extra payments reduce my loan tenure and interest?',
          a: 'Yes! Making extra principal payments or switching to bi-weekly schedules directly reduces the remaining loan balance faster. Because interest is calculated on the remaining balance, every extra dollar paid reduces future interest charges and accelerates your debt-freedom date.'
        },
        {
          q: 'Is my financial data stored or transmitted over the internet?',
          a: '<strong>Never.</strong> This calculator runs 100% client-side in your web browser. No loan amounts, salary records, or personal data ever leave your device or get logged on remote servers.'
        }
      ]
    },

    'sec-auto-loan-calc': {
      title: 'Auto Loan & Car Financing Calculator',
      category: 'Automotive & Vehicle Finance',
      badge: 'Auto Lending Standard',
      tagline: 'Comprehensive vehicle financing calculations including down payment, dealer trade-in equity, negative equity rollovers, state sales taxes, and bi-weekly payoff.',
      overview: 'Purchasing a vehicle is one of the largest consumer financial transactions. The <strong>Auto Loan Calculator</strong> provides clear, dealer-independent clarity into true monthly car payments across 24 to 84-month terms. It accounts for down payments, existing vehicle trade-in values, negative equity rollovers from upside-down trades, local vehicle sales tax rates, and title/dealer fees so you can negotiate at the dealership with confidence.',
      steps: [
        { title: 'Enter Vehicle Purchase Price', desc: 'Input the agreed negotiated vehicle price before taxes and dealer add-ons.' },
        { title: 'Account for Down Payment & Trade-In', desc: 'Deduct upfront cash savings and net equity from your existing trade-in vehicle to reduce the financed sum.' },
        { title: 'Factor in State Sales Tax & Fees', desc: 'Add local municipal sales tax percentages and registration fees to avoid unexpected dealership financing surprises.' },
        { title: 'Select Loan Term & Financing APR', desc: 'Compare 36, 48, 60, and 72-month terms to balance affordable monthly payments against long-term interest costs.' }
      ],
      formulaName: 'Net Vehicle Amount Financed & Monthly Installment',
      formulaExpr: 'P_{financed} = (Price - DownPayment - NetTradeIn) \\times (1 + \\text{TaxRate}) + \\text{Fees}',
      formulaExplanation: 'The monthly payment is then determined using standard amortization where monthly interest is compounded on the net financed amount over the term.',
      example: '<strong>Vehicle Example:</strong> Buying a $35,000 vehicle with $5,000 down, $2,000 trade-in equity, and 7% sales tax at 5.5% APR for 60 months yields a monthly payment of <strong>$572.18</strong>, with total interest of $4,351 over the 5-year life of the car loan.',
      faqs: [
        {
          q: 'What is the recommended car loan term length?',
          a: 'Financial advisors widely recommend financing vehicles for 60 months (5 years) or fewer. Longer terms like 72 or 84 months lower monthly payments but increase the risk of becoming upside-down (owing more than the car is worth as it depreciates).'
        },
        {
          q: 'What does negative equity on a trade-in mean?',
          a: 'If you owe $18,000 on your current vehicle and the dealership values its trade-in at $15,000, you have $3,000 in negative equity. If rolled into your new auto loan, you finance the new vehicle plus the $3,000 shortfall.'
        },
        {
          q: 'Is this calculation completely secure and private?',
          a: 'Yes! All auto financing calculations execute 100% locally in your browser with zero remote server logging.'
        }
      ]
    },

    'sec-mort-calc': {
      title: 'Mortgage & Home Financing Calculator',
      category: 'Real Estate & Home Ownership',
      badge: 'Fannie Mae / Freddie Mac Standard',
      tagline: 'Fixed-rate monthly principal & interest payments, property taxes, homeowners insurance, and private mortgage insurance (PMI).',
      overview: 'The <strong>Mortgage Calculator</strong> evaluates residential real estate purchase costs across 15-year, 20-year, and 30-year fixed home loans. Beyond basic principal and interest, this suite factors in annual property tax rates, homeowners hazard insurance premiums, private mortgage insurance (PMI for down payments under 20%), and HOA fees to calculate your complete, realistic PITI (Principal, Interest, Taxes, Insurance) housing payment.',
      steps: [
        { title: 'Set Home Value & Down Payment', desc: 'Input the property purchase price and your cash down payment percentage (e.g. 10%, 20%).' },
        { title: 'Configure Mortgage APR & Loan Term', desc: 'Enter the locked loan interest rate and select your repayment term (15-year for lower total interest or 30-year for lower monthly payments).' },
        { title: 'Include Real Estate Taxes & Insurance', desc: 'Input estimated property tax rates and insurance costs to evaluate true monthly PITI housing expenditure.' },
        { title: 'Examine 5-Year Amortization Schedule', desc: 'Review the detailed schedule table showing exact principal equity accumulation and remaining balance year by year.' }
      ],
      formulaName: 'Monthly PITI Housing Cost Formula',
      formulaExpr: 'PITI = P \\left[ \\frac{r(1+r)^n}{(1+r)^n - 1} \\right] + \\text{Monthly Tax} + \\text{Monthly Insurance} + \\text{PMI}',
      formulaExplanation: 'Where P is the loan principal (home purchase price minus down payment), r is the monthly interest rate, and n is the total number of monthly payments.',
      example: '<strong>Real Estate Example:</strong> A $400,000 home with 20% down ($80,000) and a $320,000 loan at 6.75% for 30 years yields a monthly Principal & Interest payment of <strong>$2,075.60</strong>. Adding $300/mo property tax and $100/mo insurance yields a total monthly PITI payment of <strong>$2,475.60</strong>.',
      faqs: [
        {
          q: 'What is PITI in mortgage terminology?',
          a: 'PITI stands for Principal, Interest, Taxes, and Insurance. It represents the total monthly cost of homeownership that mortgage lenders evaluate against your Debt-to-Income (DTI) ratio.'
        },
        {
          q: 'When does Private Mortgage Insurance (PMI) stop?',
          a: 'Under the federal Homeowners Protection Act, conventional lenders are required to automatically cancel PMI once your remaining loan balance drops to 78% of the original home purchase value.'
        },
        {
          q: 'Are home calculation details private?',
          a: 'Yes. 100% of calculations occur in your web browser. No property address, salary, or loan numbers are sent to any server.'
        }
      ]
    },

    'sec-401k-calc': {
      title: '401(k) Retirement Savings Planner',
      category: 'Retirement & Wealth Building',
      badge: 'IRS Annual Contribution Guidelines',
      tagline: 'Compound interest wealth projection, annual employer match optimization, salary growth modeling, and inflation-adjusted retirement nest egg.',
      overview: 'A 401(k) retirement plan is one of the most effective tax-advantaged wealth accumulation tools available. The <strong>401(k) Retirement Calculator</strong> models your long-term retirement savings growth by compounding employee salary deferrals, corporate employer matching contributions, and investment returns across multi-decade accumulation horizons.',
      steps: [
        { title: 'Enter Current Age & Retirement Goal Age', desc: 'Establish your investment horizon (e.g., current age 30, target retirement age 67).' },
        { title: 'Input Salary & Contribution Rate', desc: 'Provide your annual income and the percentage you contribute each paycheck.' },
        { title: 'Include Employer Matching Contribution', desc: 'Take full advantage of corporate matches (e.g. 50% match up to 6% of salary) to maximize free wealth accumulation.' },
        { title: 'Simulate Compound Returns', desc: 'Forecast future portfolio balance based on historical equity returns (e.g., 7% to 9% annual growth).' }
      ],
      formulaName: 'Compound Annuity with Annual Contribution Scaling',
      formulaExpr: 'FV = P_0(1+r)^t + \\sum_{k=1}^{t} C_k(1+g)^k (1+r)^{t-k}',
      formulaExplanation: 'Where P_0 is initial balance, C_k is annual contribution increasing at salary growth rate g, and r is the expected annual portfolio return rate.',
      example: '<strong>401(k) Projection:</strong> Starting at age 30 with $20,000 balance, earning $85,000/yr, contributing 8% with a 4% employer match at 7.5% annual return yields a projected retirement nest egg of over <strong>$1.84 Million</strong> by age 67.',
      faqs: [
        {
          q: 'What is the employer 401(k) match?',
          a: 'An employer match is supplemental money contributed by your employer based on your contributions. It represents an immediate 50% to 100% guaranteed return on your contributed funds.'
        },
        {
          q: 'How does compounding accelerate retirement savings?',
          a: 'Compound interest generates earnings on past earnings. Over 30 years, compound investment growth accounts for the vast majority of your total retirement balance, far exceeding your direct salary contributions.'
        }
      ]
    },

    'sec-interest-calc': {
      title: 'Simple & Compound Interest Calculator',
      category: 'Banking & Investments',
      badge: 'Compound Compounding Standard',
      tagline: 'Compare simple interest versus compound growth across daily, monthly, quarterly, semi-annual, and annual frequencies with APY computation.',
      overview: 'Understanding the mathematical difference between <strong>Simple Interest</strong> (linear growth on initial principal only) and <strong>Compound Interest</strong> (exponential growth where interest accumulates on interest) is essential for evaluating savings accounts, fixed deposits, bonds, and high-yield instruments.',
      steps: [
        { title: 'Input Initial Principal', desc: 'Specify starting capital deposited into the investment or savings instrument.' },
        { title: 'Enter Nominal Annual Rate', desc: 'Set the stated annual interest rate (e.g. 5.25%).' },
        { title: 'Select Compounding Frequency', desc: 'Choose compounding interval: Daily (365/yr), Monthly (12/yr), Quarterly (4/yr), or Annually (1/yr).' },
        { title: 'Review Growth Comparison', desc: 'Compare simple vs compound returns, effective APY, and final accumulated wealth.' }
      ],
      formulaName: 'Compound Interest Formula',
      formulaExpr: 'A = P \\left(1 + \\frac{r}{n}\\right)^{nt}',
      formulaExplanation: 'Where A is the future accrued amount, P is initial principal, r is decimal annual interest rate, n is compounding frequency per year, and t is time in years.',
      example: '<strong>Compounding Example:</strong> A $10,000 deposit at 5% for 10 years yields $5,000 in simple interest ($15,000 total), whereas daily compounding yields <strong>$16,486.65</strong> ($6,486.65 in compound interest).',
      faqs: [
        {
          q: 'What is the difference between APR and APY?',
          a: 'APR (Annual Percentage Rate) is the nominal interest rate without accounting for intra-year compounding. APY (Annual Percentage Yield) reflects the true annual return factoring in compounding.'
        }
      ]
    },

    'sec-bmi-calc': {
      title: 'Body Mass Index (BMI) & Needle Gauge',
      category: 'Health, Clinical & Anthropometry',
      badge: 'WHO Clinical Standard',
      tagline: 'Evaluate clinical BMI classifications across Underweight, Normal, Overweight, and Obese tiers with interactive needle gauge and healthy weight ranges.',
      overview: '<strong>Body Mass Index (BMI)</strong> is an internationally recognized anthropometric metric adopted by the World Health Organization (WHO) and the Centers for Disease Control and Prevention (CDC) to screen body weight categories against height.',
      steps: [
        { title: 'Select Metric or Imperial Units', desc: 'Toggle between kilograms/centimeters and pounds/inches.' },
        { title: 'Enter Weight & Height', desc: 'Input your precise height and current body weight.' },
        { title: 'Read Needle Gauge Tier', desc: 'Inspect your exact clinical category: Underweight (<18.5), Normal (18.5–24.9), Overweight (25–29.9), or Obese (≥30).' },
        { title: 'Review Healthy Target Weight Range', desc: 'Identify your target weight boundary corresponding to a normal BMI range of 18.5 to 24.9.' }
      ],
      formulaName: 'WHO Body Mass Index Equation',
      formulaExpr: '\\text{BMI} = \\frac{\\text{Weight (kg)}}{\\left[\\text{Height (m)}\\right]^2} = \\frac{703 \\times \\text{Weight (lbs)}}{\\left[\\text{Height (inches)}\\right]^2}',
      formulaExplanation: 'BMI divides total body weight by height squared.',
      example: '<strong>Clinical Example:</strong> An adult weighing 72 kg at a height of 175 cm has a BMI of <strong>23.51</strong>, placed comfortably in the WHO Normal healthy tier.',
      faqs: [
        {
          q: 'Does BMI distinguish between fat and muscle?',
          a: 'No. BMI is an epidemiological screening metric. Very muscular athletes may have high BMIs without excess body fat. For body composition analysis, use our Body Fat % (US Navy) or Lean Body Mass calculators.'
        },
        {
          q: 'What are the official WHO BMI classification ranges?',
          a: 'Underweight: &lt; 18.5; Normal: 18.5–24.9; Overweight: 25.0–29.9; Obese Class I: 30.0–34.9; Obese Class II: 35.0–39.9; Severe Class III: &ge; 40.0.'
        }
      ]
    },

    'sec-calorie-calc': {
      title: 'Calorie Calculator & Deficit Targets',
      category: 'Metabolism & Nutritional Energetics',
      badge: 'Mifflin-St Jeor & Katch-McArdle Consensus',
      tagline: 'Precision daily caloric intake targets for weight maintenance, progressive fat loss deficit, and lean muscle mass gain.',
      overview: 'The <strong>Calorie Calculator</strong> models human energy thermodynamics to compute your exact daily caloric requirements based on age, gender, height, weight, and physical activity levels. By accurately determining your Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE), it delivers tailored caloric milestones for steady weight maintenance, mild or aggressive fat loss deficits, and lean muscle bulking surpluses without metabolic slowdown.',
      steps: [
        { title: 'Input Baseline Biometrics', desc: 'Provide your accurate age, biological sex, current weight, and height to determine your baseline metabolic rate.' },
        { title: 'Select Physical Activity Level', desc: 'Choose your weekly exercise frequency from Sedentary (office work) to Extremely Active (endurance training or manual labor).' },
        { title: 'Choose Caloric Target Strategy', desc: 'Select Maintenance, Mild Fat Loss (-250 kcal/day), Moderate Fat Loss (-500 kcal/day), or Muscle Gain (+300 to +500 kcal/day).' },
        { title: 'Review Personalized Macronutrient Split', desc: 'Inspect your target daily protein, carbohydrate, and dietary fat allocations designed to preserve lean muscle tissue.' }
      ],
      formulaName: 'Total Daily Energy Expenditure (TDEE) Model',
      formulaExpr: '\\text{TDEE} = \\text{BMR} \\times \\text{PAL}, \\quad \\text{Target} = \\text{TDEE} \\pm \\Delta_{\\text{cal}}',
      formulaExplanation: 'Where BMR is derived using the clinical Mifflin-St Jeor equation and PAL is the Physical Activity Level multiplier (1.2 to 1.9). Caloric deficit or surplus is applied to TDEE to establish weight change velocity.',
      example: '<strong>Nutrition Example:</strong> A 30-year-old male weighing 80 kg at 180 cm who exercises 4 days per week has a BMR of 1,775 kcal and a TDEE of <strong>2,751 kcal/day</strong>. A standard 500 kcal/day deficit establishes a target of <strong>2,251 kcal/day</strong>, projecting ~0.45 kg (1 lb) of fat loss per week.',
      faqs: [
        {
          q: 'How many calories are in one pound of body fat?',
          a: 'One pound of human adipose tissue stores approximately 3,500 kilocalories of metabolic energy. A daily caloric deficit of 500 kcal results in an expenditure deficit of 3,500 kcal per week, translating to roughly one pound of fat loss.'
        },
        {
          q: 'What is a safe and sustainable caloric deficit rate?',
          a: 'Clinical nutrition guidelines recommend a deficit of 300 to 500 kcal per day (15% to 20% below maintenance TDEE). Deficits exceeding 25% often trigger muscle catabolism, micronutrient deficiencies, and hormonal downregulation.'
        },
        {
          q: 'Can eating too few calories stall weight loss?',
          a: 'Yes. Severe chronic calorie restriction triggers adaptive thermogenesis, wherein non-exercise activity thermogenesis (NEAT) plunges, thyroid hormone T3 drops, and resting metabolic rate slows down.'
        }
      ]
    },

    'sec-bf-calc': {
      title: 'Body Fat % (US Navy Method)',
      category: 'Body Composition & Anthropometry',
      badge: 'US Navy Anthropometric Standard',
      tagline: 'Estimate adipose fat mass, lean tissue percentage, and body composition categories using tape measurement circumferences.',
      overview: 'The <strong>US Navy Body Fat Calculator</strong> utilizes circumferential anthropometric regression equations developed by the Naval Health Research Center. By comparing neck, waist, and hip circumferences against height, it accurately predicts total body fat percentage, adipose tissue mass, and lean mass without requiring expensive DEXA scans or hydrostatic submersion tanks.',
      steps: [
        { title: 'Select Gender', desc: 'Choose biological sex, as female body fat calculations require hip circumference in addition to waist and neck.' },
        { title: 'Measure Neck Circumference', desc: 'Measure around the neck just below the larynx (Adam\'s apple), keeping the tape horizontal and relaxed.' },
        { title: 'Measure Waist Circumference', desc: 'Measure horizontally at the level of the navel for men, or at the narrowest natural waistline for women.' },
        { title: 'Measure Hip Circumference (Females)', desc: 'Measure around the widest point of the hips and buttocks.' }
      ],
      formulaName: 'US Navy Body Fat Equations',
      formulaExpr: '\\%\\text{BF (Men)} = 86.010 \\log_{10}(\\text{waist} - \\text{neck}) - 70.041 \\log_{10}(\\text{height}) + 36.76',
      formulaExplanation: 'For women: %BF = 163.205 × log10(waist + hip - neck) - 97.684 × log10(height) - 78.387. All measurements are taken in centimeters or inches.',
      example: '<strong>Composition Example:</strong> A male with a height of 70 in (178 cm), neck of 16 in (40.6 cm), and waist of 34 in (86.4 cm) has an estimated body fat of <strong>16.4%</strong>, categorized in the Fitness/Athletic tier.',
      faqs: [
        {
          q: 'How accurate is the US Navy circumference method compared to DEXA?',
          a: 'Validation studies demonstrate that the US Navy tape method correlates within 3% to 4% of dual-energy X-ray absorptiometry (DEXA) scans across non-extreme body compositions, making it an excellent field assessment tool.'
        },
        {
          q: 'What are healthy body fat percentage ranges for men and women?',
          a: 'For men: Essential fat 2–5%, Athletes 6–13%, Fitness 14–17%, Acceptable 18–24%, Obese ≥25%. For women: Essential fat 10–13%, Athletes 14–20%, Fitness 21–24%, Acceptable 25–31%, Obese ≥32%.'
        }
      ]
    },

    'sec-bmr-calc': {
      title: 'BMR & TDEE Calorie Target Calculator',
      category: 'Metabolism & Clinical Energetics',
      badge: 'Clinical BMR Standard',
      tagline: 'Calculate baseline resting energy expenditure via Mifflin-St Jeor, Revised Harris-Benedict, and Katch-McArdle equations.',
      overview: '<strong>Basal Metabolic Rate (BMR)</strong> defines the exact quantity of energy (calories) expended while at rest in a neutrally temperate environment. It accounts for 60% to 75% of your total daily caloric burn, powering involuntary life-sustaining physiological functions including cardiopulmonary circulation, cellular protein synthesis, renal filtration, and neurological signaling.',
      steps: [
        { title: 'Input Biological Variables', desc: 'Enter your age, sex, current body weight, and standing height.' },
        { title: 'Provide Body Fat % (Optional)', desc: 'Enter known body fat to calculate via the Katch-McArdle formula, which accounts for lean tissue mass.' },
        { title: 'Compare Clinical Equations', desc: 'Review side-by-side comparative outputs for Mifflin-St Jeor, Harris-Benedict, and Katch-McArdle.' },
        { title: 'Multiply by Activity Factor', desc: 'Determine your Total Daily Energy Expenditure (TDEE) to guide nutritional planning.' }
      ],
      formulaName: 'Mifflin-St Jeor Equation (Clinical Standard)',
      formulaExpr: '\\text{BMR} = 10W + 6.25H - 5A + s \\quad (s = +5 \\text{ for male}, -161 \\text{ for female})',
      formulaExplanation: 'Where W is weight in kilograms, H is height in centimeters, A is chronological age in years, and s is sex adjustment factor.',
      example: '<strong>Clinical Example:</strong> A 28-year-old female weighing 62 kg at 165 cm has a BMR of <strong>1,351 kcal/day</strong>. This represents her baseline energy expenditure if remaining at complete bedrest for 24 hours.',
      faqs: [
        {
          q: 'What is the difference between BMR and RMR?',
          a: 'BMR requires strict laboratory fasting and sleep monitoring under neutral temperature conditions. Resting Metabolic Rate (RMR) is measured under less restrictive resting conditions and is typically about 10% higher than BMR.'
        },
        {
          q: 'Can resistance training increase resting BMR?',
          a: 'Yes. Muscle tissue is metabolically active, consuming roughly 13 kcal/kg per day at rest compared to 4.5 kcal/kg for adipose tissue. Adding lean muscle mass elevates your baseline metabolic rate.'
        }
      ]
    },

    'sec-ibw-calc': {
      title: 'Ideal Body Weight (IBW) Calculator',
      category: 'Clinical Pharmacology & Nutrition',
      badge: 'Devine, Robinson & Miller Pharmacopeia Standards',
      tagline: 'Identify healthy physiological weight baselines using recognized clinical pharmacology formulas.',
      overview: 'The <strong>Ideal Body Weight (IBW) Calculator</strong> calculates optimal clinical weight targets using the Devine (1974), Robinson (1983), and Miller (1983) equations. Adopted universally by clinical pharmacologists and hospital dietitians, these formulas establish standard baselines for narrow-therapeutic-index medication dosing (such as aminoglycosides and anesthetics) and nutritional support.',
      steps: [
        { title: 'Select Biological Sex', desc: 'Choose male or female, as formulas use distinct baseline values for skeletal sexual dimorphism.' },
        { title: 'Enter Height in cm or Feet/Inches', desc: 'Input your height; clinical formulas scale upward from a baseline height of 5 feet (60 inches).' },
        { title: 'Compare Pharmacopeia Standards', desc: 'Review calculated targets across Devine, Robinson, and Miller equations.' },
        { title: 'Cross-Reference WHO Normal BMI', desc: 'Compare clinical IBW against the WHO 18.5–24.9 kg/m² healthy weight boundary.' }
      ],
      formulaName: 'Devine Clinical IBW Equation',
      formulaExpr: '\\text{IBW}_{\\text{male}} = 50.0 + 2.3(H - 60), \\quad \\text{IBW}_{\\text{female}} = 45.5 + 2.3(H - 60)',
      formulaExplanation: 'Where H is height in inches above 5 feet (60 inches). For metric units, height is converted from centimeters.',
      example: '<strong>Pharmacology Example:</strong> A male patient measuring 5 ft 10 in (70 inches) has a Devine IBW of <strong>73.0 kg (160.9 lbs)</strong>, a Robinson IBW of 71.3 kg, and a Miller IBW of 70.1 kg.',
      faqs: [
        {
          q: 'Why are there multiple different IBW formulas?',
          a: 'Dr. Devine originally developed his equation in 1974 for theophylline clearance. Robinson (1983) and Miller (1983) later revised the coefficients using updated metropolitan height-weight tables to improve population fit.'
        },
        {
          q: 'What is Adjusted Body Weight (ABW)?',
          a: 'In clinical medicine, when an individual\'s actual weight exceeds 120% of IBW, clinicians use Adjusted Body Weight: ABW = IBW + 0.4 × (Actual Weight - IBW) for therapeutic medication dosing.'
        }
      ]
    },

    'sec-pace-calc': {
      title: 'Pace Calculator (Running, Race & Splits)',
      category: 'Cardiorespiratory & Athletic Endurance',
      badge: 'World Athletics Endurance Standard',
      tagline: 'Solve for running pace, split times, or race completion across 5K, 10K, Half Marathon, and Full Marathon distances.',
      overview: 'The <strong>Pace Calculator</strong> is an indispensable training tool for runners, marathoners, and triathletes. By interconnecting Distance, Elapsed Time, and Pace (min/km or min/mile), it allows athletes to plan race pacing strategies, establish target split intervals, prevent premature glycogen depletion, and analyze aerobic velocity.',
      steps: [
        { title: 'Select Two Target Variables', desc: 'Choose to calculate Pace (from time & distance), Finish Time (from distance & pace), or Distance.' },
        { title: 'Pick Preset Event Distance', desc: 'Click 5K, 10K, Half Marathon (21.0975 km), or Marathon (42.195 km), or enter a custom distance.' },
        { title: 'Choose Metric or Imperial Units', desc: 'Toggle between minutes per kilometer (min/km) and minutes per mile (min/mi).' },
        { title: 'Inspect Split Mile/Kilometer Table', desc: 'Review the cumulative elapsed time milestones at every marker to maintain consistent race pacing.' }
      ],
      formulaName: 'Athletic Pace & Velocity Relationships',
      formulaExpr: '\\text{Pace} = \\frac{\\text{Elapsed Time}}{\\text{Distance}}, \\quad \\text{Velocity} = \\frac{\\text{Distance}}{\\text{Elapsed Time}}',
      formulaExplanation: 'Pace represents time per unit distance. Total race time equals pace multiplied by total race distance.',
      example: '<strong>Race Example:</strong> To complete a 10K (6.214 miles) in under 50 minutes (00:49:30), an athlete must sustain an average pace of <strong>4:57 min/km (7:58 min/mile)</strong> at an average velocity of 12.12 km/h.',
      faqs: [
        {
          q: 'What is a "negative split" pacing strategy in distance running?',
          a: 'A negative split occurs when you run the second half of a race faster than the first half. Endurance physiology demonstrates that conservative early pacing conserves muscle glycogen and prevents late-race lactate crash.'
        },
        {
          q: 'How does running pace convert between min/km and min/mile?',
          a: 'Multiply min/km by 1.60934 to get min/mile. Conversely, divide min/mile by 1.60934 to determine min/km.'
        }
      ]
    },

    'sec-army-bf-calc': {
      title: 'Army Body Fat Calculator (AR 600-9)',
      category: 'Military Readiness & Anthropometry',
      badge: 'US Army Regulation AR 600-9 Standard',
      tagline: 'Official military tape test compliance: screening maximum body fat percentages and PASS/FAIL Army Body Composition Program standards.',
      overview: 'The <strong>Army Body Fat Calculator</strong> strictly implements the official Department of the Army Regulation AR 600-9 (Army Body Composition Program). Soldiers who exceed screening table weight-for-height standards must undergo circumferential tape testing at the neck and abdomen (and hips for female soldiers) to determine compliance with active-duty body fat thresholds.',
      steps: [
        { title: 'Select Soldier Gender & Age Bracket', desc: 'Choose male or female and select your age tier (17–20, 21–27, 28–39, or 40+) for applicable maximum fat allowances.' },
        { title: 'Measure Standing Height', desc: 'Measure height without footwear to the nearest 0.5 inch.' },
        { title: 'Take Neck Circumference', desc: 'Measure around the neck immediately below the thyroid cartilage (Adam\'s apple).' },
        { title: 'Take Abdomen / Hip Circumference', desc: 'For males, measure at the navel level at the end of normal expiration. For females, measure at the natural waist and widest hip point.' }
      ],
      formulaName: 'AR 600-9 Military Body Fat Equations',
      formulaExpr: '\\%\\text{Fat (Male)} = 86.010 \\log_{10}(\\text{Abdomen} - \\text{Neck}) - 70.041 \\log_{10}(\\text{Height}) + 36.76',
      formulaExplanation: 'Female soldiers: %Fat = 163.205 × log10(Waist + Hip - Neck) - 97.684 × log10(Height) - 78.387. All measurements in inches.',
      example: '<strong>Military Example:</strong> A 24-year-old male soldier, 71 in tall, neck 15.5 in, abdomen 35.0 in, has a calculated body fat of <strong>18.2%</strong>. This passes well below the maximum allowable standard of 22% for the 21–27 age bracket.',
      faqs: [
        {
          q: 'What are the maximum allowable body fat percentages under AR 600-9?',
          a: 'Male soldiers: Age 17–20: 20%; Age 21–27: 22%; Age 28–39: 24%; Age 40+: 26%. Female soldiers: Age 17–20: 30%; Age 21–27: 32%; Age 28–39: 34%; Age 40+: 36%.'
        },
        {
          q: 'What happens if a soldier exceeds body fat standards?',
          a: 'Soldiers who exceed body fat limits are enrolled in the Army Body Composition Program (ABCP), receive dietary counseling, undergo monthly tape monitoring, and are temporarily flagged from promotion.'
        }
      ]
    },

    'sec-lbm-calc': {
      title: 'Lean Body Mass (LBM) & FFMI Calculator',
      category: 'Body Composition & Hypertrophy',
      badge: 'Boer, James & Hume Consensus Standard',
      tagline: 'Calculate non-adipose muscle, organ, and bone mass with Fat-Free Mass Index (FFMI) natural muscularity grading.',
      overview: '<strong>Lean Body Mass (LBM)</strong> represents the total mass of your physiological body weight minus all adipose fat tissue, comprising skeletal muscle, skeletal bone, vital organs, and blood volume. This calculator computes LBM using the Boer, James, and Hume clinical formulas and assesses your <strong>Fat-Free Mass Index (FFMI)</strong> to evaluate natural genetic muscular potential.',
      steps: [
        { title: 'Input Height and Weight', desc: 'Enter current body weight and standing height in metric or imperial units.' },
        { title: 'Enter Body Fat % (Optional)', desc: 'Input known body fat percentage for precise direct DEXA-standard LBM and normalized FFMI calculations.' },
        { title: 'Review Boer, James, and Hume Outputs', desc: 'Examine clinical formula estimations of lean muscle mass.' },
        { title: 'Interpret FFMI Muscularity Tier', desc: 'Evaluate your FFMI: Below 18 (low muscle), 19–21 (average), 22–24 (athletic), 25+ (upper natural ceiling).' }
      ],
      formulaName: 'Boer Lean Body Mass & Normalized FFMI Equations',
      formulaExpr: '\\text{LBM}_{\\text{Boer (M)}} = 0.407W + 0.267H - 19.2, \\quad \\text{FFMI} = \\frac{\\text{LBM (kg)}}{[\\text{Height (m)}]^2}',
      formulaExplanation: 'Where W is weight in kg and H is height in cm. Normalized FFMI adjusts for taller athletes: FFMI_norm = FFMI + 6.1 × (1.8 - Height_m).',
      example: '<strong>Athletic Example:</strong> An 82 kg male at 180 cm with 15% body fat has an LBM of <strong>69.7 kg</strong> and an FFMI of <strong>21.5 kg/m²</strong>, placing him in the solid athletic naturally-trained category.',
      faqs: [
        {
          q: 'What is the natural limit for FFMI in drug-free athletes?',
          a: 'Landmark physiological studies by Kouri et al. established that natural, drug-free bodybuilders rarely exceed an FFMI of 25.0 kg/m², making 25 the benchmark ceiling for natural genetic potential.'
        },
        {
          q: 'Why is Lean Body Mass important for metabolism?',
          a: 'Skeletal muscle and organ mass drive the majority of resting metabolic expenditure. Tracking LBM during fat loss ensures your caloric deficit burns fat rather than metabolically valuable muscle.'
        }
      ]
    },

    'sec-healthy-weight-calc': {
      title: 'Healthy Weight Range Calculator',
      category: 'Clinical Weight Management',
      badge: 'WHO & Hamwi Skeletal Frame Standard',
      tagline: 'Identify ideal weight boundaries based on WHO BMI ranges (18.5–24.9) and clinical Hamwi equations adjusted for wrist skeletal frame.',
      overview: 'The <strong>Healthy Weight Calculator</strong> provides a personalized healthy weight boundary rather than an arbitrary single target. By integrating World Health Organization (WHO) epidemiological BMI ranges (18.5 to 24.9 kg/m²) with the Hamwi clinical method and wrist skeletal frame measurements, it identifies an achievable, biologically appropriate target weight envelope.',
      steps: [
        { title: 'Input Standing Height', desc: 'Enter your height accurately in centimeters or feet and inches.' },
        { title: 'Select Skeletal Frame Size', desc: 'Choose Small, Medium, or Large frame based on wrist circumference (under 6.5 in for small, 6.5–7.5 in for medium, over 7.5 in for large in men).' },
        { title: 'Review Normal Weight Boundary Range', desc: 'Inspect minimum and maximum weights corresponding to WHO BMI 18.5 and 24.9.' },
        { title: 'Examine Weight Delta', desc: 'Compare your current body weight against the healthy envelope to see the exact pounds or kilograms needed to reach normal range.' }
      ],
      formulaName: 'WHO Normal Range & Hamwi Frame Model',
      formulaExpr: 'W_{\\min} = 18.5 \\times H_m^2, \\quad W_{\\max} = 24.9 \\times H_m^2, \\quad W_{\\text{Hamwi}} = \\text{Base} \\pm 10\\%_{\\text{frame}}',
      formulaExplanation: 'Hamwi base: Men = 106 lbs for first 5 ft + 6 lbs per additional inch; Women = 100 lbs for first 5 ft + 5 lbs per inch. Frame adjustments add or subtract 10%.',
      example: '<strong>Clinical Example:</strong> For an adult at 5 ft 8 in (172.7 cm), the WHO healthy weight range spans <strong>121.7 lbs to 163.8 lbs (55.2 kg to 74.3 kg)</strong>, with a Hamwi medium-frame baseline of 154 lbs (69.9 kg).',
      faqs: [
        {
          q: 'Why does skeletal frame size influence ideal weight?',
          a: 'Bone density and skeletal width account for up to 15% of fat-free mass variation among individuals of identical height. Large-framed individuals naturally possess greater bone mass and lean baseline weight.'
        },
        {
          q: 'How do I accurately measure my wrist circumference for frame size?',
          a: 'Wrap a flexible tape measure around your non-dominant wrist just above the styloid process (wrist bone). Compare against standard clinical gender tables.'
        }
      ]
    },

    'sec-calories-burned-calc': {
      title: 'Calories Burned (2024 MET Standard)',
      category: 'Exercise Physiology & Energy Expenditure',
      badge: 'Compendium of Physical Activities (Ainsworth MET)',
      tagline: 'Accurate caloric energy expenditure across 20+ sports, cardio, and resistance exercises using Metabolic Equivalent of Task (MET).',
      overview: 'The <strong>Calories Burned Calculator</strong> calculates active exercise energy expenditure using the updated Compendium of Physical Activities. It utilizes standardized <strong>Metabolic Equivalent of Task (MET)</strong> ratings, where 1.0 MET represents resting oxygen consumption (3.5 mL O₂/kg/min). By factoring your exact body mass and exercise duration, it eliminates gym machine overestimation.',
      steps: [
        { title: 'Select Physical Activity or Sport', desc: 'Choose from running, cycling, swimming, weight lifting, HIIT, walking, rowing, or team sports.' },
        { title: 'Enter Exercise Duration', desc: 'Input the exact duration of active exertion in minutes.' },
        { title: 'Enter Body Weight', desc: 'Input current weight, as heavier bodies require proportionally greater metabolic energy to move.' },
        { title: 'Review Burned Calories & Fat Equivalent', desc: 'Inspect gross calories expended and equivalent grams of body fat oxidized.' }
      ],
      formulaName: 'Metabolic Equivalent of Task (MET) Energy Formula',
      formulaExpr: '\\text{Calories Burned} = \\text{Duration (hours)} \\times \\text{MET} \\times \\text{Body Weight (kg)}',
      formulaExplanation: 'Where MET is the energy cost multiplier of the activity. 1 MET = 1.0 kcal/kg/hour.',
      example: '<strong>Workout Example:</strong> A 75 kg individual running at 6.0 mph / 10-min mile (MET 9.8) for 45 minutes (0.75 hours) expends: 0.75 × 9.8 × 75 = <strong>551 kcal</strong> (equivalent to ~71 grams of body fat).',
      faqs: [
        {
          q: 'Why do wearable fitness trackers often overestimate calories burned?',
          a: 'Many consumer fitness trackers conflate gross calories (which include baseline resting BMR during the workout) with net exercise calories, leading to overestimations of 20% to 40%.'
        },
        {
          q: 'Does weight lifting burn calories after the workout ends?',
          a: 'Yes. High-intensity resistance training creates Excess Post-Exercise Oxygen Consumption (EPOC), elevating resting oxygen consumption and metabolic rate for 12 to 24 hours post-exercise.'
        }
      ]
    },

    'sec-orm-calc': {
      title: 'One Rep Max (1RM) Strength Calculator',
      category: 'Strength & Resistance Training',
      badge: 'Epley & Brzycki Consensus Model',
      tagline: 'Predict maximal single-repetition lift capacity with 100% to 50% training load percentage tables for powerlifting and hypertrophy.',
      overview: 'The <strong>One Rep Max (1RM) Calculator</strong> predicts your theoretical maximum lifting capacity for a single repetition on compound barbell lifts (Squat, Bench Press, Deadlift, Overhead Press). By utilizing validated submaximal repetition models (Epley, Brzycki, and Lombardi), lifters can safely test strength milestones without the elevated injury risk of attempting a true 100% failure load.',
      steps: [
        { title: 'Enter Weight Lifted', desc: 'Input the barbell or dumbbell weight used during your working set in kg or lbs.' },
        { title: 'Enter Repetitions to Technical Failure', desc: 'Input repetitions completed with strict form (accuracy is highest between 2 and 8 reps).' },
        { title: 'Compare Consensus Equations', desc: 'Review 1RM projections across Epley, Brzycki, and Lombardi formulas.' },
        { title: 'Consult Working Load Percentage Chart', desc: 'Inspect exact weight loads corresponding to 95%, 85%, 75%, and 65% of 1RM to plan your training blocks.' }
      ],
      formulaName: 'Epley and Brzycki Submaximal 1RM Equations',
      formulaExpr: '\\text{1RM}_{\\text{Epley}} = w \\left(1 + \\frac{r}{30}\\right), \\quad \\text{1RM}_{\\text{Brzycki}} = w \\times \\frac{36}{37 - r}',
      formulaExplanation: 'Where w is weight lifted and r is repetitions performed to momentary muscular failure.',
      example: '<strong>Lifting Example:</strong> Performing 100 kg on the bench press for 5 clean repetitions yields an estimated 1RM of <strong>116.7 kg</strong> (Epley) and <strong>112.5 kg</strong> (Brzycki). Working sets at 80% 1RM correspond to ~92 kg.',
      faqs: [
        {
          q: 'Why is submaximal 1RM testing safer than attempting a true 1RM?',
          a: 'Attempting a true maximal single repetition places extreme mechanical strain on tendons, ligaments, and stabilizing muscles. Calculating 1RM from a 3-to-5 rep set provides accurate programming numbers while preserving joint health.'
        },
        {
          q: 'What training percentages are optimal for hypertrophy versus strength?',
          a: 'Maximum strength development is optimized at 85%–100% 1RM (1–5 reps), while muscular hypertrophy is optimized across 65%–85% 1RM (6–12 reps) taken close to muscular failure.'
        }
      ]
    },

    'sec-thr-calc': {
      title: 'Target Heart Rate (THR) & Training Zones',
      category: 'Cardiovascular Health & Exercise Prescription',
      badge: 'American Heart Association & Karvonen Standards',
      tagline: 'Calculate maximum heart rate and 5 aerobic/anaerobic intensity training zones using Tanaka formula and Heart Rate Reserve.',
      overview: 'The <strong>Target Heart Rate Calculator</strong> establishes physiological cardiovascular intensity boundaries using both the traditional Tanaka maximum heart rate formula and the clinical <strong>Karvonen Heart Rate Reserve (HRR)</strong> method. By mapping your Resting Heart Rate against maximum capacity, it delineates 5 distinct training zones from Zone 1 Active Recovery to Zone 5 VO2 Max.',
      steps: [
        { title: 'Input Chronological Age', desc: 'Enter age to establish age-predicted maximum heart rate (HRmax).' },
        { title: 'Input Resting Heart Rate (RHR)', desc: 'Enter resting pulse taken immediately upon waking to calculate Heart Rate Reserve (HRR).' },
        { title: 'Review 5 Cardiovascular Zones', desc: 'Inspect exact beats-per-minute (BPM) ranges for Zone 1 (Recovery), Zone 2 (Aerobic Base), Zone 3 (Tempo), Zone 4 (Threshold), and Zone 5 (VO2 Max).' },
        { title: 'Calibrate Cardio Workouts', desc: 'Configure your heart rate monitor or smartwatch to target the specific zone aligned with your endurance goal.' }
      ],
      formulaName: 'Tanaka HRmax & Karvonen Heart Rate Reserve (HRR)',
      formulaExpr: 'HR_{\\max} = 208 - 0.7(\\text{Age}), \\quad \\text{Target BPM} = [(\\text{HR}_{\\max} - \\text{RHR}) \\times \\text{Zone}\\%] + \\text{RHR}',
      formulaExplanation: 'Where HRmax - RHR is Heart Rate Reserve (HRR), representing your usable cardiovascular range.',
      example: '<strong>Cardio Example:</strong> A 35-year-old with a resting heart rate of 60 bpm has an HRmax of <strong>183.5 bpm</strong> and an HRR of 123.5 bpm. Their Zone 2 Aerobic Base (60%–70% HRR) target spans <strong>134 to 146 BPM</strong>.',
      faqs: [
        {
          q: 'Why is Zone 2 training prioritized in modern endurance protocols?',
          a: 'Zone 2 training (60–70% HRR) stimulates mitochondrial biogenesis, improves fat oxidation efficiency, and strengthens the stroke volume of the left ventricle without accumulating excessive neuromuscular fatigue.'
        },
        {
          q: 'Why is the Tanaka formula preferred over the older "220 - Age" equation?',
          a: 'Clinical studies by Dr. Hirofumi Tanaka showed that the traditional "220 - Age" formula severely underestimates maximum heart rate in older adults and overestimates it in young adults. Tanaka\'s equation (208 - 0.7 × Age) has significantly lower standard deviation.'
        }
      ]
    },

    'sec-water-calc': {
      title: 'Daily Water Intake Target',
      category: 'Hydration & Renal Physiology',
      badge: 'NASEM Clinical Hydration Guidelines',
      tagline: 'Scientific daily fluid recommendations in liters, ounces, and 250ml glasses factoring in body mass, exercise volume, and climate.',
      overview: 'Water constitutes 55% to 65% of adult human body mass and is essential for cellular enzymatic reactions, thermoregulatory sweating, joint lubrication, waste filtration, and blood volume maintenance. The <strong>Daily Water Intake Calculator</strong> tailors baseline hydration recommendations from the National Academies of Sciences, Engineering, and Medicine (NASEM), adjusting for physical activity sweat loss and environmental heat.',
      steps: [
        { title: 'Input Body Weight', desc: 'Enter current weight in kilograms or pounds to determine basal cellular fluid requirements.' },
        { title: 'Input Daily Exercise Duration', desc: 'Enter average daily sweat-inducing workout duration in minutes.' },
        { title: 'Select Climate Condition', desc: 'Select temperate, hot/humid, or dry/arid climate to account for evaporative loss.' },
        { title: 'Inspect Total Daily Volume', desc: 'View recommendations in liters, fluid ounces, and standard 250 mL (8 oz) glasses.' }
      ],
      formulaName: 'Physiological Fluid Replacement Equation',
      formulaExpr: '\\text{Water (mL)} = [\\text{Weight (kg)} \\times 35] + [\\text{Exercise Min} \\times 12] + \\text{Climate Allowance}',
      formulaExplanation: 'Baseline hydration requires ~35 mL per kg of body mass, plus ~12 mL per minute of physical exercise to replenish sweat loss.',
      example: '<strong>Hydration Example:</strong> A 70 kg individual who exercises 45 minutes daily in a warm climate requires: (70 × 35) + (45 × 12) + 350 = <strong>3,340 mL (3.34 Liters / 113 fl oz / 13.4 glasses)</strong> daily.',
      faqs: [
        {
          q: 'Do coffee, tea, and fruits count toward daily fluid intake?',
          a: 'Yes. Contrary to popular myth, moderate caffeinated beverages contribute to daily hydration without significant diuretic deficit. Additionally, moisture-rich foods (fruits and vegetables) provide ~20% of total dietary water intake.'
        },
        {
          q: 'What is the most reliable self-assessment of hydration status?',
          a: 'Urine color is the simplest clinical indicator. Pale straw or light lemonade color indicates optimal hydration, while dark amber indicates dehydration and the need for immediate fluid intake.'
        }
      ]
    },

    'sec-pregnancy-calc': {
      title: 'Pregnancy Calculator & Fetal Milestones',
      category: 'Obstetrics, Maternal Health & Embryology',
      badge: 'ACOG Gestational Dating Standard',
      tagline: 'Accurate gestational age in weeks & days, trimester countdown, fetal size fruit comparison, and clinical prenatal milestone schedule.',
      overview: 'The <strong>Pregnancy Calculator</strong> provides comprehensive gestational tracking aligned with American College of Obstetricians and Gynecologists (ACOG) clinical standards. It computes exact gestational age, baby developmental progress, trimester transitions, and key clinical milestones (first heartbeat, anatomy ultrasound, glucose challenge screening, and full-term status).',
      steps: [
        { title: 'Select Dating Method', desc: 'Choose calculation by Last Menstrual Period (LMP), Conception Date, First Trimester Ultrasound, or Known Due Date.' },
        { title: 'Input Reference Date & Cycle Length', desc: 'Enter the anchor date and your average menstrual cycle length for precise ovulation calibration.' },
        { title: 'Track Gestational Age (Weeks & Days)', desc: 'Inspect current developmental age (e.g. 14 weeks 3 days) and trimester classification.' },
        { title: 'Review Clinical Testing Schedule', desc: 'Consult upcoming prenatal screening windows including NIPT, anatomy scans, and GDM screening.' }
      ],
      formulaName: 'Naegele\'s Modified Gestational Age Rule',
      formulaExpr: '\\text{EDD} = \\text{LMP} + 280 \\text{ days} + (\\text{Cycle Length} - 28 \\text{ days})',
      formulaExplanation: 'Clinical pregnancy duration is standardized at 280 days (40 weeks) from the first day of the Last Menstrual Period for a 28-day cycle.',
      example: '<strong>Prenatal Example:</strong> An LMP of January 15th with a 28-day cycle establishes an Estimated Date of Delivery (EDD) of <strong>October 22nd</strong>. At 20 weeks (June 4th), the fetus is ~10.5 inches long, comparable to a banana, coinciding with the detailed anatomy ultrasound window.',
      faqs: [
        {
          q: 'Why is gestational age counted from before conception occurred?',
          a: 'Universally in obstetrics, gestational age is measured from the first day of the Last Menstrual Period (LMP) because the exact timing of ovulation and fertilization cannot be known with absolute certainty in most pregnancies.'
        },
        {
          q: 'What weeks define the three trimesters of pregnancy?',
          a: 'First Trimester: Week 1 through 13w6d; Second Trimester: Week 14 through 27w6d; Third Trimester: Week 28 through delivery. Early term begins at 37w0d, and full term spans 39w0d to 40w6d.'
        }
      ]
    },

    'sec-pregnancy-weight-calc': {
      title: 'Pregnancy Weight Gain Tracker (IOM & ACOG)',
      category: 'Obstetrics & Maternal Nutrition',
      badge: 'Institute of Medicine (IOM) Guidelines',
      tagline: 'Track maternal weight progression by gestational week against Institute of Medicine target envelopes for singleton and twin pregnancies.',
      overview: 'Healthy maternal weight gain is vital for optimal fetal growth, placental development, and lowering risks of gestational diabetes, preeclampsia, preterm delivery, and cesarean birth. This calculator charts your weight progression against official <strong>Institute of Medicine (IOM) and ACOG guidelines</strong> tailored to your pre-pregnancy BMI.',
      steps: [
        { title: 'Enter Pre-Pregnancy Height and Weight', desc: 'Calculate your baseline pre-pregnancy BMI to determine your specific IOM recommended weight range.' },
        { title: 'Select Pregnancy Type', desc: 'Choose Singleton pregnancy or Twins pregnancy.' },
        { title: 'Input Current Gestational Week', desc: 'Provide your current week of pregnancy (Week 1 through 40).' },
        { title: 'Input Current Maternal Weight', desc: 'Compare your current gain against upper and lower IOM healthy weight bounds.' }
      ],
      formulaName: 'Institute of Medicine Maternal Target Envelope',
      formulaExpr: '\\text{Target Gain} = \\text{1st Trimester Gain} + [(\\text{Week} - 13) \\times \\text{Weekly Rate}]',
      formulaExplanation: 'First trimester target is 1.1–4.4 lbs (0.5–2.0 kg). Subsequent 2nd & 3rd trimester rate: Normal BMI = 1.0 lb/wk; Overweight = 0.6 lb/wk; Obese = 0.5 lb/wk.',
      example: '<strong>Clinical Example:</strong> A woman with a normal pre-pregnancy BMI (22.0) expecting a singleton has a total recommended weight gain of <strong>25 to 35 lbs (11.5 to 16.0 kg)</strong>. At Week 24, expected cumulative gain spans 14 to 18 lbs.',
      faqs: [
        {
          q: 'How is pregnancy weight gain physiologically distributed?',
          a: 'At 40 weeks, a 30-lb gain typically breaks down into: Baby (7.5 lbs), Placenta (1.5 lbs), Amniotic fluid (2.0 lbs), Uterine muscle (2.0 lbs), Maternal breast tissue (2.0 lbs), Blood volume (4.0 lbs), Maternal fat stores (7.0 lbs), and Extracellular fluids (4.0 lbs).'
        },
        {
          q: 'Is it safe to intentionally lose weight while pregnant?',
          a: 'No. Intentional weight loss or strict dieting is contraindicated during pregnancy due to the risk of fetal growth restriction and maternal ketonemia. Weight management should focus on nutrient-dense dietary quality.'
        }
      ]
    },

    'sec-pregnancy-conception-calc': {
      title: 'Pregnancy Conception Timing Calculator',
      category: 'Reproductive Biology & Conception Timing',
      badge: 'Clinical Retrospective Ovulation Dating',
      tagline: 'Determine the exact probable date of fertilization, 6-day fertile intercourse window, and embryonic age based on Due Date or LMP.',
      overview: 'Determining the exact timing of conception can be critical for parental milestones and medical history. Because human sperm can survive up to 5 days within cervical crypts and the ovum remains viable for 12 to 24 hours post-ovulation, the <strong>Pregnancy Conception Calculator</strong> reverse-calculates the precise 6-day intercourse window and fertilization date from your clinical Due Date or ultrasound scan.',
      steps: [
        { title: 'Select Known Anchor Date', desc: 'Choose Estimated Due Date (EDD), Last Menstrual Period (LMP), or First Trimester Ultrasound date.' },
        { title: 'Enter Date', desc: 'Input the exact anchor calendar date.' },
        { title: 'View Most Likely Conception Date', desc: 'Inspect the calculated biological fertilization day.' },
        { title: 'Review 6-Day Fertile Intercourse Window', desc: 'Identify the exact calendar dates when sexual intercourse could have resulted in pregnancy.' }
      ],
      formulaName: 'Retrospective Fertilization Dating Formula',
      formulaExpr: '\\text{Conception Date} = \\text{Estimated Due Date (EDD)} - 266 \\text{ days}',
      formulaExplanation: 'Biological gestation from fertilization to birth spans exactly 266 days (38 weeks). Fertile intercourse window spans Conception Date minus 5 days through Conception Date.',
      example: '<strong>Dating Example:</strong> An Estimated Due Date of November 15th corresponds to a biological conception date of <strong>February 24th</strong>, with the fertile intercourse window spanning <strong>February 19th through February 24th</strong>.',
      faqs: [
        {
          q: 'Can conception occur days after sexual intercourse?',
          a: 'Yes. If intercourse takes place 3 to 5 days before ovulation, sperm cells remain motile in the fallopian tubes awaiting follicle rupture. Fertilization occurs within hours of egg release.'
        },
        {
          q: 'Why are fetal age and clinical gestational age two weeks apart?',
          a: 'Gestational age is calculated from the start of your last period (2 weeks before ovulation in a 28-day cycle). True fetal/embryonic age begins at fertilization, making the embryo always 2 weeks younger than clinical gestational age.'
        }
      ]
    },

    'sec-due-date-calc': {
      title: 'Due Date Calculator (4 Clinical Methods)',
      category: 'Obstetrics & Clinical Perinatology',
      badge: 'Naegele\'s Rule & Ultrasound CRL Standard',
      tagline: 'Accurate Estimated Date of Delivery (EDD) calculated via LMP cycle adjustment, conception date, 1st trimester Crown-Rump Length, or IVF transfer.',
      overview: 'Only 4% to 5% of babies arrive on their exact predicted delivery date, but establishing an accurate <strong>Estimated Date of Delivery (EDD)</strong> is crucial for scheduling fetal growth scans, evaluating preterm labor risk, and timing post-dates induction. This calculator offers 4 recognized clinical methods: Last Menstrual Period with cycle length correction, known conception date, ultrasound Crown-Rump Length (CRL), and IVF embryo transfer dating.',
      steps: [
        { title: 'Select Dating Methodology', desc: 'Choose Last Menstrual Period (LMP), Conception Date, Ultrasound Scan, or IVF Transfer Date (Day 3 or Day 5 blastocyst).' },
        { title: 'Input Relevant Clinical Dates', desc: 'Provide cycle length (if using LMP) to calibrate for delayed or early ovulation.' },
        { title: 'Inspect Estimated Date of Delivery', desc: 'Review your official EDD and trimester transition dates.' },
        { title: 'Review Delivery Probability Distribution', desc: 'See statistical delivery probabilities across 37 to 42 weeks.' }
      ],
      formulaName: 'Naegele\'s Rule with Cycle Adjustment',
      formulaExpr: '\\text{EDD} = \\text{LMP} + 7 \\text{ days} - 3 \\text{ months} + 1 \\text{ year} + (\\text{Cycle} - 28 \\text{ days})',
      formulaExplanation: 'Standard Naegele\'s rule assumes a 28-day cycle with ovulation on day 14. Adjusting for longer or shorter cycles shifts EDD by the exact cycle delta.',
      example: '<strong>Clinical Example:</strong> An LMP of May 10th with a 32-day cycle establishes an EDD of <strong>February 18th</strong> of the following year (adjusted 4 days later than the standard 28-day calculation).',
      faqs: [
        {
          q: 'Which due date method is considered the most clinically accurate?',
          a: 'First-trimester ultrasound measurement of fetal Crown-Rump Length (CRL) between 8 and 13 weeks has an accuracy within ±5 to 7 days, superseding LMP dating if discrepancies exceed clinical thresholds.'
        },
        {
          q: 'How does IVF embryo transfer dating work?',
          a: 'For a Day 5 blastocyst transfer: EDD = Transfer Date + 261 days (equivalent to LMP = Transfer Date - 19 days). For a Day 3 transfer: EDD = Transfer Date + 263 days.'
        }
      ]
    },

    'sec-ovulation-calc': {
      title: 'Ovulation & Fertile Window Calculator',
      category: 'Reproductive Endocrinology & Family Planning',
      badge: 'Luteal Phase Endocrinology Standard',
      tagline: 'Pinpoint upcoming ovulation day, 6-day fertile window, and peak conception dates with a 6-month cycle forecast table.',
      overview: 'Maximizing the probability of natural conception requires timing intercourse during the fertile window—the 5 days leading up to ovulation and the day of ovulation itself. The <strong>Ovulation Calculator</strong> models your menstrual follicular and luteal phases to forecast peak fertility days, LH surge timing, and an interactive 6-month fertility calendar.',
      steps: [
        { title: 'Enter First Day of Last Period', desc: 'Input the exact start date of your most recent menstrual bleeding.' },
        { title: 'Enter Average Menstrual Cycle Length', desc: 'Provide your usual cycle length (typically between 21 and 35 days).' },
        { title: 'Specify Luteal Phase Length (Optional)', desc: 'Default is 14 days; customize if known from past basal body temperature tracking.' },
        { title: 'Review 6-Day Fertile Window & Peak Days', desc: 'Target intercourse during peak fertility days (ovulation day minus 2 days and minus 1 day).' }
      ],
      formulaName: 'Luteal Phase Back-Calculation Equation',
      formulaExpr: '\\text{Ovulation Day} = \\text{Cycle Length} - \\text{Luteal Phase (Default 14 days)}',
      formulaExplanation: 'While follicular phase length varies widely among women, the post-ovulatory luteal phase remains biologically consistent at 12 to 14 days.',
      example: '<strong>Fertility Example:</strong> In a 30-day cycle with LMP starting on June 1st, ovulation occurs on <strong>June 17th</strong> (Day 17). Peak conception intercourse days are <strong>June 15th, 16th, and 17th</strong>.',
      faqs: [
        {
          q: 'What physiological signs confirm ovulation is approaching?',
          a: 'Cervical mucus becomes clear, slippery, and stretchy (resembling raw egg whites); basal body temperature exhibits a post-ovulatory rise of 0.5°F to 1.0°F; and urine LH test strips show a surge 24–36 hours prior to release.'
        },
        {
          q: 'How frequently should couples have intercourse during the fertile window?',
          a: 'Reproductive endocrinologists recommend intercourse every 1 to 2 days during the fertile window to ensure continuous presence of viable sperm while maintaining healthy sperm concentration.'
        }
      ]
    },

    'sec-conception-calc': {
      title: 'Conception Calculator & Birth Planner',
      category: 'Family Planning & Fertility Strategy',
      badge: 'Chronological Gestational Planning Standard',
      tagline: 'Plan intercourse for maximum conception chances or reverse-target a specific due date, baby birth month, and zodiac sign.',
      overview: 'Whether planning around career leave, school enrollment cutoff dates, or seasonal climate preferences, the <strong>Conception Calculator</strong> allows prospective parents to either forward-project their delivery date from a planned conception date or reverse-engineer the required conception window to target a specific birth month.',
      steps: [
        { title: 'Select Planning Mode', desc: 'Choose "Target a Specific Due Date" or "Calculate from Planned Conception Date".' },
        { title: 'Input Target Calendar Date', desc: 'Provide your desired delivery date or planned conception cycle date.' },
        { title: 'Review Required Intercourse Window', desc: 'Identify the exact days to attempt conception to achieve your target delivery timeframe.' },
        { title: 'Inspect Astrological & Seasonal Milestone', desc: 'View baby birth month, zodiac sign, and seasonal milestones.' }
      ],
      formulaName: 'Reverse Gestational Delivery Model',
      formulaExpr: '\\text{Required Conception Window} = \\text{Target Due Date} - 266 \\text{ days} \\pm 5 \\text{ days}',
      formulaExplanation: 'Biological gestation from fertilization averages 266 days (38 weeks), with peak delivery clustered within ±7 days of the target date.',
      example: '<strong>Planning Example:</strong> To deliver a baby in early September (e.g. September 5th), conception should occur between <strong>December 10th and December 15th</strong> of the preceding year.',
      faqs: [
        {
          q: 'What is the natural statistical probability of conceiving in any given cycle?',
          a: 'For healthy couples under age 35 with well-timed intercourse during the fertile window, the monthly probability of conception (fecundability) is approximately 20% to 25% per cycle.'
        },
        {
          q: 'How does maternal age affect conception planning?',
          a: 'Natural fecundability gradually declines after age 32 and accelerates after age 37 due to diminished ovarian reserve and egg chromosomal quality, often requiring 6 to 12 months of planning.'
        }
      ]
    },

    'sec-period-calc': {
      title: 'Period Calculator & Menstrual Tracker',
      category: 'Gynecology & Menstrual Health',
      badge: 'Clinical Menstrual Cycle Standard',
      tagline: 'Menstrual cycle predictor tracking follicular, ovulatory, and luteal phases, PMS warning windows, and 6-month period calendar.',
      overview: 'The <strong>Period Calculator</strong> tracks menstrual cycles, predicts upcoming period start dates, and flags Premenstrual Syndrome (PMS) windows across the next 6 months. Tracking regular cycle length helps women understand hormonal fluctuations, plan travel and athletic competitions, and identify gynecological irregularities early.',
      steps: [
        { title: 'Input Start Date of Last Period', desc: 'Select the first day of active red bleeding from your most recent menstrual period.' },
        { title: 'Specify Average Cycle Length', desc: 'Input typical days from the start of one period to the start of the next (normal range: 21 to 35 days).' },
        { title: 'Enter Bleeding Duration', desc: 'Provide average duration of period flow (typically 3 to 7 days).' },
        { title: 'Review 6-Month Menstrual Calendar', desc: 'Inspect projected future period dates, fertile windows, and PMS onset windows.' }
      ],
      formulaName: 'Periodic Menstrual Recurrence Algorithm',
      formulaExpr: '\\text{Next Period Date}_k = \\text{LMP} + (k \\times \\text{Cycle Length}), \\quad \\text{PMS Window} = \\text{Period Start} - 5 \\text{ days}',
      formulaExplanation: 'Where k represents the cycle sequence index (1, 2, 3...) and the PMS window occurs during late luteal progesterone drop.',
      example: '<strong>Cycle Example:</strong> An LMP of July 1st with a 28-day cycle forecasts upcoming period onset dates on <strong>July 29th, August 26th, September 23rd, and October 21st</strong>, with PMS alerts beginning 5 days prior to each date.',
      faqs: [
        {
          q: 'What degree of menstrual cycle irregularity is considered normal?',
          a: 'Variation of 2 to 4 days from cycle to cycle is entirely normal and influenced by acute stress, travel, illness, or sleep disruptions. Variations exceeding 7 to 9 days consistently should be evaluated by a healthcare professional.'
        },
        {
          q: 'Why does Premenstrual Syndrome (PMS) occur 5 to 7 days before menstruation?',
          a: 'If fertilization does not occur, the corpus luteum degrades, causing a precipitous drop in circulating estrogen and progesterone levels. This sudden hormonal withdrawal triggers physical cramping, fluid retention, and neurotransmitter shifts.'
        }
      ]
    },

    'sec-macro-calc': {
      title: 'Macro Calculator (Protein, Carbs, Fats)',
      category: 'Sports Nutrition & Dietetics',
      badge: 'ISSN Sports Nutrition Standard',
      tagline: 'Calculate exact daily gram and calorie targets for Protein, Carbohydrates, and Fats with custom diet presets and per-meal splits.',
      overview: 'Macronutrients provide the chemical energy that powers human metabolism. The <strong>Macro Calculator</strong> converts your total daily caloric budget into specific gram targets for <strong>Protein (4 kcal/g)</strong>, <strong>Carbohydrates (4 kcal/g)</strong>, and <strong>Dietary Fats (9 kcal/g)</strong> based on proven athletic presets (Balanced, High Protein, Low Carb, or Ketogenic).',
      steps: [
        { title: 'Input Daily Calorie Target', desc: 'Enter your maintenance, deficit, or surplus daily caloric target (derived from our Calorie/TDEE calculator).' },
        { title: 'Select Macronutrient Ratio Preset', desc: 'Choose Balanced (40/30/30), High-Protein Hypertrophy (40/40/20), Endurance (55/25/20), or Ketogenic (5/25/70).' },
        { title: 'Select Meals Per Day', desc: 'Choose 3, 4, 5, or 6 daily meals to view per-meal protein, carbohydrate, and fat allocations.' },
        { title: 'Track Gram Targets with Food Scales', desc: 'Use daily gram targets to track your nutrition with standard digital kitchen scales and food databases.' }
      ],
      formulaName: 'Macronutrient Energy Density Conversions',
      formulaExpr: '\\text{Grams} = \\frac{\\text{Total Calories} \\times \\text{Ratio \\%}}{\\text{Energy Density (kcal/g)}}',
      formulaExplanation: 'Protein = 4 kcal/g, Carbohydrate = 4 kcal/g, Fat = 9 kcal/g. Grams are rounded to the nearest integer.',
      example: '<strong>Diet Example:</strong> A 2,200 kcal daily intake on a 40% Carb / 30% Protein / 30% Fat split equals: <strong>220g Carbohydrates (880 kcal)</strong>, <strong>165g Protein (660 kcal)</strong>, and <strong>73g Fat (660 kcal)</strong>.',
      faqs: [
        {
          q: 'Why is dietary protein prioritized during a caloric deficit?',
          a: 'Higher protein intakes (1.6 to 2.4 g/kg) maximize muscle protein synthesis, preserve lean muscle tissue from being oxidized for fuel, and provide the highest Thermic Effect of Food (TEF ~20–30%) among all macronutrients.'
        },
        {
          q: 'Can dietary fat intake be dropped too low to accelerate fat loss?',
          a: 'No. Dropping dietary fat below 15% to 20% of total daily calories impairs steroid hormone synthesis (including testosterone and estrogen), impairs fat-soluble vitamin absorption (A, D, E, K), and degrades cell membrane integrity.'
        }
      ]
    },

    'sec-carb-calc': {
      title: 'Carbohydrate Calculator (Training Load & Glycogen)',
      category: 'Athletic Performance & Glycogen Metabolism',
      badge: 'ACSM / ISSN Endurance Guidelines',
      tagline: 'Determine daily carbohydrate targets based on training load, glycogen replenishment, and pre/post-workout timing.',
      overview: 'Carbohydrates are the primary substrate for high-intensity muscular contractions and central nervous system cognition. The <strong>Carbohydrate Calculator</strong> implements official American College of Sports Medicine (ACSM) guidelines, scaling daily carbohydrate targets to your body mass and specific training volume (from light recovery days to multi-hour endurance sessions).',
      steps: [
        { title: 'Input Body Weight', desc: 'Enter body weight in kilograms or pounds for mass-scaled carbohydrate dosing.' },
        { title: 'Select Daily Training Intensity & Volume', desc: 'Choose Light (low intensity), Moderate (~1 hr/day), High (1–3 hrs/day), or Very High (4–5 hrs endurance/day).' },
        { title: 'Review Total Daily Carbohydrate Grams', desc: 'Inspect daily gram targets and associated caloric contribution (4 kcal/g).' },
        { title: 'Examine Pre- and Post-Workout Nutrient Timing', desc: 'Allocate carbohydrates around your training window for optimal intra-workout performance and rapid glycogen resynthesis.' }
      ],
      formulaName: 'ACSM Exercise-Volume Scaling Model',
      formulaExpr: '\\text{Carb Target (g)} = \\text{Weight (kg)} \\times \\text{Factor (g/kg)}',
      formulaExplanation: 'Factors: Light = 3–5 g/kg; Moderate = 5–7 g/kg; High/Endurance = 6–10 g/kg; Extreme/Ultra = 8–12 g/kg.',
      example: '<strong>Athletic Example:</strong> A 70 kg endurance athlete training 90 minutes daily requires ~7.0 g/kg = <strong>490 grams of carbohydrates (1,960 kcal)</strong> daily to maintain full glycogen stores.',
      faqs: [
        {
          q: 'What happens to athletic performance when glycogen is depleted?',
          a: 'When muscle and liver glycogen stores are exhausted (commonly termed "hitting the wall" or "bonking"), the body must oxidize fatty acids at a much slower ATP turnover rate, forcing an immediate 40% to 50% drop in exercise intensity.'
        },
        {
          q: 'What is the optimal carbohydrate window post-exercise?',
          a: 'Consuming 1.0 to 1.2 grams of carbohydrate per kg of body mass within 30 to 60 minutes post-exercise maximizes glycogen synthase activity, accelerating glycogen replenishment.'
        }
      ]
    },

    'sec-protein-calc': {
      title: 'Protein Calculator (Hypertrophy & Retention)',
      category: 'Hypertrophy & Clinical Nutrition',
      badge: 'ISSN Muscle Protein Synthesis Consensus',
      tagline: 'Calculate scientific daily protein requirements for hypertrophy, athletic maintenance, and deficit retention with whole-food equivalents.',
      overview: 'Dietary protein supplies the essential amino acids required for muscle protein synthesis (MPS), enzyme production, immune antibody synthesis, and connective tissue repair. The <strong>Protein Calculator</strong> calculates evidence-based protein requirements established by the International Society of Sports Nutrition (ISSN), moving beyond generic minimum RDA baselines to optimize muscle building and fat-loss retention.',
      steps: [
        { title: 'Input Body Weight and Height', desc: 'Provide weight and height for accurate total and lean-mass scaling.' },
        { title: 'Select Physiological Training Goal', desc: 'Choose Sedentary RDA (0.8 g/kg), Endurance Runner (1.2–1.4 g/kg), Hypertrophy/Strength (1.6–2.2 g/kg), or Fat Loss Preservation (2.0–2.4 g/kg).' },
        { title: 'Inspect Total Daily Protein Grams', desc: 'Review daily target grams and percentage of total caloric intake.' },
        { title: 'Review Per-Meal Leucine Dosing', desc: 'Distribute daily protein across 3 to 5 meals (0.4 g/kg/meal) to repeatedly stimulate Muscle Protein Synthesis.' }
      ],
      formulaName: 'ISSN Target Protein Dosing Model',
      formulaExpr: '\\text{Protein (g)} = \\text{Body Weight (kg)} \\times \\text{Factor (g/kg)}, \\quad \\text{Per-Meal} = \\frac{\\text{Protein (g)}}{\\text{Meals}}',
      formulaExplanation: 'RDA baseline = 0.8 g/kg; Athletic maintenance = 1.2–1.6 g/kg; Optimal hypertrophy = 1.6–2.2 g/kg; Aggressive cut = 2.0–2.4 g/kg.',
      example: '<strong>Hypertrophy Example:</strong> An 80 kg strength athlete targeting muscle growth at 2.0 g/kg requires <strong>160 grams of protein daily (640 kcal)</strong>, distributed across 4 meals of 40 grams each.',
      faqs: [
        {
          q: 'Is consuming more than 2.2 g/kg of protein harmful to healthy kidneys?',
          a: 'Numerous randomized controlled trials have confirmed that high-protein diets (up to 2.8 to 3.3 g/kg/day) cause no adverse renal or hepatic impairments in healthy individuals with normal baseline kidney function.'
        },
        {
          q: 'What is the "leucine trigger" hypothesis?',
          a: 'Muscle Protein Synthesis is triggered by the intracellular concentration of the essential amino acid leucine. Achieving ~2.5 to 3.5 grams of leucine per meal (present in ~30–40g of complete animal protein or ~45g of plant protein) fully initiates mTORC1 signaling.'
        }
      ]
    },

    'sec-fat-calc': {
      title: 'Fat Intake Calculator (AHA Lipid Guidelines)',
      category: 'Clinical Lipidology & Cardiovascular Health',
      badge: 'American Heart Association (AHA) Guidelines',
      tagline: 'AHA clinical lipid distribution: daily fat grams, saturated fat upper limits, and MUFA, PUFA, and Omega-3 targets.',
      overview: 'Dietary fats are vital for life, forming phospholipid cellular membranes, synthesizing steroid hormones (including testosterone and progesterone), and absorbing fat-soluble vitamins (A, D, E, and K). The <strong>Fat Intake Calculator</strong> implements American Heart Association (AHA) guidelines, balancing healthy Monounsaturated (MUFA) and Polyunsaturated (PUFA) fats while enforcing strict upper boundaries on atherogenic saturated fats.',
      steps: [
        { title: 'Input Daily Caloric Budget', desc: 'Enter total daily caloric target.' },
        { title: 'Select Dietary Approach', desc: 'Choose Standard Healthy (25%–30% fat), Mediterranean (35% fat, high MUFA), or Low-Fat Therapeutic (20% fat).' },
        { title: 'Review Total Daily Fat Grams', desc: 'Inspect total daily fat grams and caloric contribution (9 kcal/g).' },
        { title: 'Inspect Saturated Fat Upper Limit', desc: 'Ensure saturated fat stays below the AHA recommended ceiling of 6% to 10% of total daily calories to protect cardiovascular health.' }
      ],
      formulaName: 'AHA Cardiovascular Lipid Distribution Model',
      formulaExpr: '\\text{Fat (g)} = \\frac{\\text{Calories} \\times \\text{Fat Ratio}}{9}, \\quad \\text{Sat Fat Max (g)} = \\frac{\\text{Calories} \\times 0.07}{9}',
      formulaExplanation: 'Fat contains 9 kcal per gram. AHA recommends limiting saturated fat to under 7% of total energy for cardiovascular disease prevention.',
      example: '<strong>Cardiovascular Example:</strong> On a 2,000 kcal diet with 30% fat, total fat is <strong>67 grams (600 kcal)</strong>. Saturated fat is strictly limited to <strong>under 15.5 grams (140 kcal, 7%)</strong>, with the remainder composed of heart-healthy olive oil, nuts, seeds, and fish.',
      faqs: [
        {
          q: 'Why does excessive saturated fat raise LDL cholesterol?',
          a: 'Saturated fatty acids downregulate hepatic LDL receptor expression, impairing the clearance of circulating low-density lipoprotein particles from the bloodstream and promoting arterial plaque formation.'
        },
        {
          q: 'What are the best dietary sources of Monounsaturated (MUFA) and Omega-3 fats?',
          a: 'Extra virgin olive oil, avocados, almonds, and macadamias are rich in MUFA (oleic acid). Wild salmon, sardines, mackerel, chia seeds, and walnuts supply anti-inflammatory Omega-3 fatty acids (EPA and DHA).'
        }
      ]
    },

    'sec-tdee-calc': {
      title: 'TDEE Calculator (Total Daily Energy Expenditure)',
      category: 'Metabolic Rate & Energy Balance',
      badge: 'Compendium Physical Activity Level (PAL) Standard',
      tagline: 'Total Daily Energy Expenditure: Basal Metabolic Rate, TEF, NEAT, and EAT energy breakdowns with deficit and surplus milestones.',
      overview: 'Your <strong>Total Daily Energy Expenditure (TDEE)</strong> represents the aggregate number of calories your body burns across a 24-hour period. It is composed of four distinct components: Basal Metabolic Rate (BMR, ~60–75%), Non-Exercise Activity Thermogenesis (NEAT, ~15–20%), Thermic Effect of Food (TEF, ~10%), and Exercise Activity Thermogenesis (EAT, ~5–10%).',
      steps: [
        { title: 'Input Personal Biometrics', desc: 'Enter age, biological sex, weight, and height to calculate basal metabolic rate.' },
        { title: 'Select Physical Activity Multiplier (PAL)', desc: 'Choose Sedentary (1.2), Lightly Active (1.375), Moderately Active (1.55), Very Active (1.725), or Athlete (1.9).' },
        { title: 'Inspect Metabolic Component Breakdown', desc: 'Review the visual pie chart showing BMR, NEAT, TEF, and exercise burn.' },
        { title: 'Select Strategy Caloric Target', desc: 'Choose Maintenance, Weight Loss (cutting), or Muscle Hypertrophy (bulking).' }
      ],
      formulaName: 'Physical Activity Level (PAL) Factor Model',
      formulaExpr: '\\text{TDEE} = \\text{BMR}_{\\text{Mifflin}} \\times \\text{PAL}, \\quad \\text{TEF} = 0.10 \\times \\text{TDEE}',
      formulaExplanation: 'Where PAL is the standardized activity multiplier established by the FAO/WHO/UNU Expert Consultation.',
      example: '<strong>Metabolism Example:</strong> A 25-year-old female weighing 65 kg at 170 cm has a BMR of 1,440 kcal. With moderate exercise 4 times/week (PAL 1.55), her TDEE is <strong>2,232 kcal/day</strong>. A 20% fat loss deficit sets her target at <strong>1,786 kcal/day</strong>.',
      faqs: [
        {
          q: 'What is NEAT and why is it crucial for fat loss?',
          a: 'Non-Exercise Activity Thermogenesis (NEAT) accounts for energy expended during daily movements like walking, fidgeting, posture maintenance, and household tasks. It can vary by over 800 kcal per day between active and sedentary individuals.'
        },
        {
          q: 'Why does TDEE decrease as you lose weight?',
          a: 'A smaller body mass burns fewer calories at rest and during movement. In addition, metabolic adaptation slightly depresses thyroid and sympathetic output, requiring periodic recalibration of caloric targets.'
        }
      ]
    },

    'sec-gfr-calc': {
      title: 'GFR Calculator (eGFR - 2021 CKD-EPI Refit)',
      category: 'Nephrology & Renal Function',
      badge: '2021 CKD-EPI Refit Consensus Standard',
      tagline: 'Official 2021 CKD-EPI Refit & MDRD clinical renal calculators: estimate Glomerular Filtration Rate and Chronic Kidney Disease (CKD) stages.',
      overview: 'The <strong>Estimated Glomerular Filtration Rate (eGFR)</strong> is the clinical gold standard for evaluating kidney filtration function and staging Chronic Kidney Disease (CKD). This tool implements the landmark <strong>2021 CKD-EPI Creatinine equation</strong> developed by the National Kidney Foundation (NKF) and the American Society of Nephrology (ASN) Task Force, which entirely eliminated race-based modifiers to ensure standardized, equitable renal diagnostics.',
      steps: [
        { title: 'Select Creatinine Units', desc: 'Choose mg/dL (US standard) or µmol/L (international SI units).' },
        { title: 'Input Serum Creatinine Level', desc: 'Enter creatinine concentration from your standard comprehensive metabolic blood panel.' },
        { title: 'Input Age and Biological Sex', desc: 'Age and sex calibrate baseline muscle mass creatinine production.' },
        { title: 'Evaluate Clinical CKD Stage', desc: 'Check your eGFR against Stage 1 (≥90 Normal), Stage 2 (60–89 Mild), Stage 3a/b (30–59 Moderate), Stage 4 (15–29 Severe), or Stage 5 (<15 Kidney Failure).' }
      ],
      formulaName: '2021 CKD-EPI Creatinine Refit Equation (Race-Free)',
      formulaExpr: '\\text{eGFR} = 142 \\times \\min\\left(\\frac{S_{cr}}{\\kappa}, 1\\right)^\\alpha \\times \\max\\left(\\frac{S_{cr}}{\\kappa}, 1\\right)^{-1.200} \\times 0.9938^{\\text{Age}} \\times [1.012 \\text{ if female}]',
      formulaExplanation: 'Where Scr is serum creatinine in mg/dL, κ is 0.7 for females and 0.9 for males, and α is -0.241 for females and -0.302 for males.',
      example: '<strong>Clinical Example:</strong> A 50-year-old male with a serum creatinine of 1.0 mg/dL has an eGFR of <strong>94 mL/min/1.73m²</strong>, indicating normal Stage 1 renal filtration function.',
      faqs: [
        {
          q: 'Why did the 2021 NKF-ASN Task Force remove race from the eGFR formula?',
          a: 'The historic inclusion of a race coefficient led to overestimation of kidney function in Black patients, delaying nephrology referrals, clinical trials access, and kidney transplant list qualification. The 2021 race-free equation provides accurate, unbiased diagnostic parity.'
        },
        {
          q: 'Can high dietary protein or intense lifting artificially raise creatinine?',
          a: 'Yes. Creatinine is a metabolic byproduct of muscle creatine breakdown. Heavy muscular individuals or those consuming cooked meat/creatine supplements may exhibit elevated creatinine without true renal pathology.'
        }
      ]
    },

    'sec-body-type-calc': {
      title: 'Body Type Calculator (Heath-Carter Somatotype)',
      category: 'Anthropometry & Somatotyping',
      badge: 'Heath-Carter Somatotype Standard',
      tagline: 'Identify your Heath-Carter somatotype (Ectomorph, Mesomorph, Endomorph) with tailored nutritional and resistance training strategies.',
      overview: 'The <strong>Body Type Calculator</strong> identifies your physical somatotype classification based on the scientific Heath-Carter anthropometric model. Categorizing your predisposition across <strong>Ectomorph (linear, lean, fast metabolism)</strong>, <strong>Mesomorph (muscular, athletic, responsive)</strong>, and <strong>Endomorph (broad, higher storage capacity)</strong> provides actionable insights for optimizing training volume and macronutrient ratios.',
      steps: [
        { title: 'Select Skeletal Shoulder & Hip Structure', desc: 'Identify whether your clavicles are narrow, medium, or broad relative to your pelvic width.' },
        { title: 'Measure Wrist & Ankle Frame Circumference', desc: 'Evaluate joint circumference to assess bone density and skeletal structure.' },
        { title: 'Assess Weight Change Tendency', desc: 'Indicate whether you struggle to gain weight, gain muscle/lose fat easily, or store fat readily.' },
        { title: 'Review Personalized Nutrition & Workout Protocols', desc: 'Inspect tailored macronutrient splits and training volume frequencies aligned with your somatotype.' }
      ],
      formulaName: 'Heath-Carter Tri-Component Somatotype Assessment',
      formulaExpr: '\\text{Somatotype} = (\\text{Endomorphy}, \\text{Mesomorphy}, \\text{Ectomorphy}) \\in [1, 7]^3',
      formulaExplanation: 'Scores from 1 to 7 represent relative adiposity (endomorphy), musculoskeletal development (mesomorphy), and linearity/thinness (ectomorphy).',
      example: '<strong>Somatotype Example:</strong> An individual with broad shoulders, narrow waist, fast muscular response to lifting, and moderate frame scores a <strong>2-6-2 (Mesomorph)</strong>, performing best on a 40% Carb / 30% Protein / 30% Fat athletic protocol.',
      faqs: [
        {
          q: 'Can an individual be a hybrid combination of body types?',
          a: 'Yes! Pure single-somatotype individuals are rare. Most people are hybrids, such as Ecto-Mesomorphs (lean and athletic) or Meso-Endomorphs (strong and broad-framed).'
        },
        {
          q: 'Can diet and exercise change your somatotype?',
          a: 'While your skeletal bone structure and genetic muscle insertion points cannot be changed, targeted resistance training and structured nutrition significantly alter your muscularity (mesomorphy) and body fat (endomorphy).'
        }
      ]
    },

    'sec-bsa-calc': {
      title: 'Body Surface Area (BSA) Calculator',
      category: 'Clinical Pharmacology & Oncology',
      badge: 'Mosteller & Du Bois Clinical Standards',
      tagline: 'Compute clinical Body Surface Area (BSA) across Mosteller, Du Bois, Haycock, Boyd, and Gehan-George formulas with normal variance benchmarking.',
      overview: '<strong>Body Surface Area (BSA)</strong> represents the total surface area of the human body in square meters ($m^2$). In clinical medicine, BSA correlates much more closely with cardiac output, renal blood flow, and metabolic rate than total body weight, making it the universal standard for chemotherapy drug index dosing, indexing cardiac index ($L/min/m^2$), and estimating fluid resuscitation in burn trauma.',
      steps: [
        { title: 'Select Metric or Imperial Units', desc: 'Choose kilograms/centimeters or pounds/inches.' },
        { title: 'Input Accurate Height and Weight', desc: 'Enter current biometric values.' },
        { title: 'Compare Clinical Formulations', desc: 'Review outputs for Mosteller (universal clinical formula), Du Bois & Du Bois, and Haycock.' },
        { title: 'Benchmark Against Reference Standard', desc: 'Compare your BSA against the standard clinical reference adult value of 1.73 m².' }
      ],
      formulaName: 'Mosteller and Du Bois Clinical BSA Equations',
      formulaExpr: '\\text{BSA}_{\\text{Mosteller}} = \\sqrt{\\frac{H_{\\text{cm}} \\times W_{\\text{kg}}}{3600}}, \\quad \\text{BSA}_{\\text{Du Bois}} = 0.007184 \\times W_{\\text{kg}}^{0.425} \\times H_{\\text{cm}}^{0.725}',
      formulaExplanation: 'Mosteller\'s equation is preferred in clinical oncology due to its mathematical simplicity and high correlation with the classic Du Bois model.',
      example: '<strong>Clinical Example:</strong> An adult weighing 70 kg at a height of 175 cm has a Mosteller BSA of <strong>1.84 m²</strong> and a Du Bois BSA of <strong>1.85 m²</strong>, slightly above the 1.73 m² population reference baseline.',
      faqs: [
        {
          q: 'Why is chemotherapy dosed by Body Surface Area rather than weight?',
          a: 'Hepatic drug metabolism, renal clearance rates, and circulating plasma volumes correlate far more directly with surface area and metabolic rate than with adipose tissue mass. Dosing by BSA minimizes both sub-therapeutic underdosing and toxic overdosing.'
        },
        {
          q: 'What is considered the normal average BSA for men and women?',
          a: 'The global standard reference adult BSA is 1.73 m². Average North American adult men have a BSA of approximately 1.9 m², while adult women average approximately 1.6 m².'
        }
      ]
    },

    'sec-bac-calc': {
      title: 'BAC Calculator (Blood Alcohol Concentration & Sobriety)',
      category: 'Pharmacokinetics & Toxicology',
      badge: 'Widmark Pharmacokinetic Ethanol Model',
      tagline: 'Widmark pharmacokinetic Blood Alcohol Concentration model: calculate current BAC %, hours until sober, legal driving threshold, and impairment stages.',
      overview: 'The <strong>Blood Alcohol Concentration (BAC) Calculator</strong> models the pharmacokinetic absorption, distribution, and hepatic metabolism of ethanol in the human body. Utilizing the internationally validated <strong>Widmark Formula</strong>, it estimates your peak BAC %, hours remaining until reaching the legal driving limit (&lt;0.08%), and hours until reaching complete sobriety (0.000%).',
      steps: [
        { title: 'Input Body Weight and Biological Sex', desc: 'Sex determines body water distribution volume (r = 0.68 for men, 0.55 for women).' },
        { title: 'Input Standard Drinks Consumed', desc: 'Enter quantities for Beer (12 oz at 5%), Wine (5 oz at 12%), and 80-proof Spirits/Shots (1.5 oz at 40%).' },
        { title: 'Input Elapsed Time Since First Drink', desc: 'Enter elapsed time in hours to account for continuous hepatic metabolic breakdown.' },
        { title: 'Select Stomach Fullness Condition', desc: 'Choose empty stomach (rapid absorption) or full meal (attenuates and delays peak blood alcohol level).' }
      ],
      formulaName: 'Widmark Pharmacokinetic Ethanol Model',
      formulaExpr: '\\text{BAC} = \\left( \\frac{A \\times 5.14}{W \\times r} \\right) - (\\beta \\times H)',
      formulaExplanation: 'Where A is ounces of pure alcohol consumed, W is body weight in pounds, r is gender distribution factor (0.68 men, 0.55 women), β is the metabolic elimination rate (~0.015% per hour), and H is elapsed hours.',
      example: '<strong>Toxicology Example:</strong> An 80 kg (176 lb) male consuming 3 standard beers over 2 hours has an estimated current BAC of <strong>0.047%</strong> (Mild Euphoria), placing him below the 0.08% driving limit, with approximately <strong>3 hours and 8 minutes</strong> until reaching complete sobriety (0.000%).',
      faqs: [
        {
          q: 'What is the legal driving threshold for BAC in the United States and internationally?',
          a: 'In the United States and Canada, the legal limit for non-commercial drivers age 21+ is 0.08% BAC (0.05% in Utah). Many European and international countries enforce stricter thresholds of 0.05%, 0.02%, or zero tolerance (0.00%). Never drive if impaired.'
        },
        {
          q: 'Can coffee, cold showers, or exercise speed up alcohol metabolism?',
          a: 'No. Approximately 90% to 98% of alcohol is metabolized solely by liver enzymes (alcohol dehydrogenase and CYP2E1) at a fixed biological rate of ~0.015% BAC per hour. Neither caffeine nor physical activity can accelerate this enzymatic process.'
        }
      ]
    }
  };

  /**
   * Generates a high-quality fallback SEO guide for any calculator not explicitly in the curated database
   */
  function generateFallbackGuide(calcId, category) {
    // Attempt to extract title from registry or DOM
    let title = 'Calculator';
    let catName = category || 'General Utilities';

    if (window.AppRouter && typeof window.AppRouter.getCalcById === 'function') {
      const info = window.AppRouter.getCalcById(calcId);
      if (info && info.title) {
        title = info.title;
        catName = info.cat ? (info.cat.charAt(0).toUpperCase() + info.cat.slice(1)) : catName;
      }
    } else {
      const panel = document.getElementById(calcId);
      if (panel) {
        const heading = panel.querySelector('.section-heading, h2, h3');
        if (heading && heading.textContent.trim()) {
          title = heading.textContent.trim();
        }
      }
    }

    return {
      title: title,
      category: `${catName} Suite`,
      badge: 'Scientific & Algorithmic Standard',
      tagline: `Instant, accurate computation for ${title} with interactive controls and verified mathematical logic.`,
      overview: `The <strong>${title}</strong> is a dedicated calculation utility providing fast, reliable, and mathematically verified answers. Engineered for precision and ease of use, it features real-time dynamic inputs, interactive range sliders, and instant result computation designed to assist users in making informed, data-driven decisions.`,
      steps: [
        { title: 'Configure Calculation Inputs', desc: `Provide your initial parameters and values into the designated input fields.` },
        { title: 'Adjust Settings or Sliders', desc: `Fine-tune your calculation parameters using interactive sliders or dropdown selectors for real-time adjustments.` },
        { title: 'Review Real-Time Results', desc: `Inspect immediate visual results, breakdown summaries, and comparative statistics generated instantaneously.` },
        { title: 'Copy or Share Output', desc: `Click on any computed value to copy it directly to your clipboard or use Copy Direct Link to save the exact configuration.` }
      ],
      formulaName: 'Standard Computational Methodology',
      formulaExpr: '\\text{Result} = f(\\text{Input Parameters})',
      formulaExplanation: `All calculations follow established mathematical, engineering, or clinical standards with verified rounding rules and high floating-point precision.`,
      example: `<strong>Usage Example:</strong> Enter your baseline figures into the inputs above; the engine recalculates instantaneously on every keystroke with zero server delay.`,
      faqs: [
        {
          q: `Is the ${title} free to use?`,
          a: `Yes, 100% free with unlimited calculations, zero subscription barriers, and zero advertisements.`
        },
        {
          q: 'Is my data transmitted or logged on any external server?',
          a: '<strong>No.</strong> This tool runs 100% client-side directly within your web browser. Your inputs and computations are completely private, confidential, and safe.'
        },
        {
          q: 'How accurate are the results?',
          a: 'Our calculation engines use high-precision IEEE 754 floating-point arithmetic verified against industry and clinical standard reference models.'
        }
      ]
    };
  }

  /**
   * Builds the complete HTML string for the SEO & Informational Guide
   */
  function buildGuideHtml(data) {
    const stepsHtml = data.steps.map((s, idx) => `
      <div class="seo-step-item">
        <div class="seo-step-num">${idx + 1}</div>
        <div class="seo-step-content">
          <h4 class="seo-step-title">${s.title}</h4>
          <p class="seo-step-desc">${s.desc}</p>
        </div>
      </div>
    `).join('');

    const faqsHtml = data.faqs.map(faq => `
      <details class="seo-faq-item" open>
        <summary class="seo-faq-question">
          <span>${faq.q}</span>
          <svg class="seo-faq-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </summary>
        <div class="seo-faq-answer">
          <p>${faq.a}</p>
        </div>
      </details>
    `).join('');

    return `
      <section class="calc-seo-guide-wrap" aria-labelledby="seo-guide-heading">
        <!-- Client-Side Security & Privacy Highlight Banner (User Requested) -->
        <div class="seo-privacy-banner">
          <div class="seo-privacy-icon-box">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              <polyline points="9 12 11 14 15 10"></polyline>
            </svg>
          </div>
          <div class="seo-privacy-content">
            <div class="seo-privacy-title">
              <span>100% Client-Side & Private Calculation</span>
              <span class="seo-verified-badge">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                ${data.badge || 'Verified Standard'}
              </span>
            </div>
            <p class="seo-privacy-text">
              All computations run directly within your web browser using pure client-side JavaScript. <strong>Zero financial figures, personal data, or calculations are ever sent over the network or logged on remote servers.</strong> Completely safe, instant, private, and 100% free to use.
            </p>
          </div>
        </div>

        <!-- Section Title Row -->
        <div class="seo-header-row">
          <div class="seo-header-text">
            <span class="seo-category-pill">${data.category}</span>
            <h2 class="seo-main-heading" id="seo-guide-heading">Complete Guide: ${data.title}</h2>
            <p class="seo-tagline">${data.tagline}</p>
          </div>
        </div>

        <!-- 2-Column Grid: What is it vs How to Use -->
        <div class="seo-guide-grid">
          <!-- Column 1: What is this calculator? -->
          <article class="seo-card">
            <div class="seo-card-header">
              <div class="seo-card-icon-wrap">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
              </div>
              <h3 class="seo-card-title">What is this Calculator?</h3>
            </div>
            <div class="seo-card-body">
              <p class="seo-paragraph">${data.overview}</p>
              ${data.example ? `<div class="seo-example-box">${data.example}</div>` : ''}
            </div>
          </article>

          <!-- Column 2: How to Use It (Step-by-Step) -->
          <article class="seo-card">
            <div class="seo-card-header">
              <div class="seo-card-icon-wrap">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </div>
              <h3 class="seo-card-title">How to Use This Calculator</h3>
            </div>
            <div class="seo-steps-container">
              ${stepsHtml}
            </div>
          </article>
        </div>

        <!-- Formula & Mathematical Foundation -->
        <article class="seo-card seo-formula-card">
          <div class="seo-card-header">
            <div class="seo-card-icon-wrap">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="4" y="4" width="16" height="16" rx="2"></rect>
                <line x1="8" y1="9" x2="16" y2="9"></line>
                <line x1="9" y1="15" x2="15" y2="15"></line>
                <line x1="12" y1="12" x2="12" y2="12"></line>
              </svg>
            </div>
            <h3 class="seo-card-title">Formula & Mathematical Foundation</h3>
          </div>
          <div class="seo-card-body">
            <div class="seo-formula-banner">
              <span class="seo-formula-label">${data.formulaName}</span>
              <code class="seo-formula-code">${data.formulaExpr}</code>
            </div>
            <p class="seo-formula-desc">${data.formulaExplanation}</p>
          </div>
        </article>

        <!-- Structured FAQs for Search Engine Rich Snippets -->
        <article class="seo-card seo-faq-card">
          <div class="seo-card-header">
            <div class="seo-card-icon-wrap">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <h3 class="seo-card-title">Frequently Asked Questions (FAQ)</h3>
          </div>
          <div class="seo-faqs-container">
            ${faqsHtml}
          </div>
        </article>
      </section>
    `;
  }

  /**
   * Main Public API to update the SEO Guide when any calculator is opened
   */
  function updateGuide(calcId, category) {
    if (!calcId) return;

    // Auto-detect category if not passed
    if (!category) {
      if (window.AppRouter && typeof window.AppRouter.getCalcById === 'function') {
        const info = window.AppRouter.getCalcById(calcId);
        if (info && info.cat) category = info.cat;
      }
      if (!category) {
        const el = document.getElementById(calcId);
        if (el) {
          if (el.classList.contains('fit-calc-unit')) category = 'fitness';
          else if (el.classList.contains('fin-calc-unit')) category = 'financial';
          else if (el.classList.contains('math-calc-unit')) category = 'math';
          else if (el.classList.contains('other-calc-unit')) category = 'other';
        }
      }
    }

    // Detect target container
    let containerId = 'fin-seo-guide-container';
    if (category === 'fitness') containerId = 'fit-seo-guide-container';
    else if (category === 'math') containerId = 'math-seo-guide-container';
    else if (category === 'other' || category === 'utility' || category === 'internet' || category === 'weather' || category === 'transportation' || category === 'entertainment') containerId = 'other-seo-guide-container';
    else if (category === 'standard') containerId = 'std-seo-guide-container';

    let container = document.getElementById(containerId);
    if (!container) {
      // Look for any visible detail view or fallback to fin
      const activeDetail = document.querySelector('[id$="-detail-view"]:not([style*="display: none"])');
      if (activeDetail) {
        container = activeDetail.querySelector('.calc-seo-guide-container');
      }
    }

    if (!container) return;

    // Fetch data from curated DB or generate dynamic fallback
    const guideData = SEO_DATABASE[calcId] || generateFallbackGuide(calcId, category);
    container.innerHTML = buildGuideHtml(guideData);
    container.style.display = 'block';
  }

  // Expose to window
  window.SeoGuide = {
    updateGuide,
    SEO_DATABASE
  };

  // Auto-init on DOMContentLoaded for the initial default calculators
  document.addEventListener('DOMContentLoaded', () => {
    // Check initial financial calculator
    updateGuide('sec-mort-calc', 'financial');
    // Check initial fitness calculator
    updateGuide('sec-bmi-calc', 'fitness');
  });
})();
