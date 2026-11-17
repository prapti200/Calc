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
      title: 'Loan & EMI Payment Calculator (Personal, Auto & Gold Loans)',
      category: 'Financial Planning & Banking',
      badge: 'Banking Standard Amortization',
      tagline: 'Precision monthly loan installments, total interest liability, and gold loan calculated repayment schedules.',
      overview: 'The <strong>Loan & EMI Calculator</strong> is an advanced financial computation tool designed to evaluate personal loans, commercial bank debt, retail financing, auto loans, and our dedicated <strong>gold loan calculator</strong> module. It accurately models reducing-balance interest compounding to reveal your exact monthly obligations, total debt liability over the entire tenure, and how each installment breaks down between debt reduction and banking interest charges. Whether calculating vehicle financing or getting your <strong>gold loan calculated</strong> against physical gold collateral, this tool helps borrowers compare lending offers, avoid hidden charges, and choose repayment horizons that fit their budget.',
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

    'sec-sci-calc': {
      title: 'Standard & Scientific Calculator',
      category: 'Math Solvers & Analysis',
      badge: 'IEEE 754 High-Precision Math Standard',
      tagline: 'Dual-mode arithmetic, trigonometric angles, powers, logs, and interactive calculation memory registers.',
      overview: 'The <strong>Standard & Scientific Calculator</strong> provides high-precision mathematical evaluation for both daily arithmetic and advanced STEM computation. It features full parenthesis precedence, degree and radian angle modes, exponential and logarithmic functions, and memory storage registers (M+, M-, MR, MC, MS).',
      steps: [
        { title: 'Choose Mode & Units', desc: 'Toggle between Standard 4-function arithmetic or Scientific mode, and choose DEG or RAD for trigonometry.' },
        { title: 'Input Numbers & Operations', desc: 'Enter calculations using on-screen keys or physical keyboard buttons with algebraic operator precedence.' },
        { title: 'Use Memory Registers', desc: 'Store running totals using MS (Memory Store), M+ (Add to Memory), or MR (Memory Recall).' },
        { title: 'Export or Copy Results', desc: 'Click the display number to copy it to your clipboard or download a complete computation PDF report.' }
      ],
      formulaName: 'Algebraic Order of Operations (PEMDAS/BODMAS)',
      formulaExpr: 'f(x) \in \{\sin(\theta), \cos(\theta), \tan(\theta), x^y, \log_{10}(x), \ln(x), \sqrt{x}\}',
      formulaExplanation: 'Calculations follow algebraic operator hierarchy: Parentheses, Exponents, Multiplication & Division, Addition & Subtraction.',
      example: '<strong>Example:</strong> Calculating <code>sin(30°) = 0.5</code>, <code>2^10 = 1024</code>, or <code>log10(1000) = 3</code> instantaneously with IEEE 754 double precision.',
      faqs: [
        {
          q: 'How do I toggle between Degrees and Radians?',
          a: 'Click the angle unit button (DEG/RAD) in the top-right header of the calculator display to switch instantly.'
        },
        {
          q: 'Can I type calculations with my physical keyboard?',
          a: 'Yes! The calculator supports standard keyboard input: numbers 0-9, operators (+, -, *, /), Enter for equals (=), and Escape to clear (C).'
        },
        {
          q: 'How does the Memory (M+, MR, MC) feature work?',
          a: 'Press MS to save the active number, M+ to add to it, M- to subtract from it, MR to display the saved value, and MC to reset memory to zero.'
        }
      ]
    },

    'sec-percentage-calc': {
      title: 'Percentage Calculator & Delta Solver',
      category: 'Financial & Mathematical Analysis',
      badge: 'Percentage & Ratio Benchmark',
      tagline: 'Calculate percentage of numbers, percentage increase or decrease, discount markdowns, and relative proportions.',
      overview: 'The <strong>Percentage Calculator</strong> solves all common percentage relationships: what is X% of Y, finding what percent X is of Y, calculating percentage increase/decrease, and finding the base value before a percentage change.',
      steps: [
        { title: 'Choose Percentage Mode', desc: 'Select standard percentage, percentage change, or proportional ratio.' },
        { title: 'Enter Input Values', desc: 'Enter baseline numbers and target percentage or final comparison amounts.' },
        { title: 'View Immediate Results', desc: 'Inspect the resulting value, percentage delta, and step-by-step arithmetic breakdown.' }
      ],
      formulaName: 'Percentage & Change Formulas',
      formulaExpr: 'P = \frac{X}{100} \times Y, \quad \Delta \% = \frac{V_2 - V_1}{|V_1|} \times 100\%',
      formulaExplanation: 'Where P is the percentage amount, V1 is the original value, and V2 is the final value.',
      example: '<strong>Example:</strong> An increase from $80 to $100 is <code>((100 - 80) / 80) * 100 = +25%</code>.',
      faqs: [
        {
          q: 'What is the difference between percentage change and percentage points?',
          a: 'Percentage change measures the relative proportional change of a value, while percentage points measure the arithmetic difference between two percentage rates.'
        }
      ]
    },

    'sec-gpa-calc': {
      title: 'College & High School GPA Calculator',
      category: 'Academic Evaluation',
      badge: 'Standard 4.0 Academic Grade Scale',
      tagline: 'Calculate cumulative semester and overall Grade Point Average (GPA) with course credit weighting.',
      overview: 'The <strong>GPA Calculator</strong> determines your cumulative Grade Point Average across high school or university semesters. It computes weighted credit averages based on standard 4.0 letter grade points (A=4.0, B=3.0, C=2.0, D=1.0, F=0.0).',
      steps: [
        { title: 'Add Course Rows', desc: 'Enter course titles, credit weights (e.g. 3 or 4 credits), and letter grades.' },
        { title: 'Input Existing Cumulative GPA (Optional)', desc: 'Include prior completed credits and cumulative GPA to calculate new overall GPA.' },
        { title: 'View Semester & Cumulative GPA', desc: 'Inspect your exact GPA score and credit hour summation.' }
      ],
      formulaName: 'Credit-Weighted Grade Point Average',
      formulaExpr: '\text{GPA} = \frac{\sum (\text{Grade Points}_i \times \text{Credits}_i)}{\sum \text{Credits}_i}',
      formulaExplanation: 'Where each letter grade corresponds to numerical points multiplied by the course credit value.',
      example: '<strong>Example:</strong> Taking a 4-credit course with grade A (4.0) and a 3-credit course with grade B (3.0) gives: <code>(16 + 9) / 7 = 3.57 GPA</code>.',
      faqs: [
        {
          q: 'What scale is used for letter grades?',
          a: 'Standard 4.0 scale: A=4.0, A-=3.7, B+=3.3, B=3.0, B-=2.7, C+=2.3, C=2.0, D=1.0, F=0.0.'
        }
      ]
    },

  };

  function ensureEightFaqs(faqs, title, category) {
    const existingQuestions = new Set((faqs || []).map(f => (f.q || '').toLowerCase().trim()));
    const isFin = category === 'financial' || category === 'finance';
    const isFit = category === 'fitness' || category === 'health';
    const isMath = category === 'math';
    const isOther = !isFin && !isFit && !isMath;
    const domainPool = [];

    if (isFin) {
      domainPool.push(
        {
          q: `What is the difference between APR and interest rate in the ${title}?`,
          a: `The nominal interest rate reflects purely the cost of borrowing principal. The Annual Percentage Rate (APR) incorporates mandatory lender origination fees, closing points, and administrative charges, providing a true comparison metric of overall borrowing expense.`
        },
        {
          q: `How do inflation and macroeconomic changes impact these figures?`,
          a: `Purchasing power diminishes over time due to inflation. For long-term loans or savings horizons, evaluating both nominal and real (inflation-adjusted) values ensures realistic planning and prevents underestimating future capital needs.`
        },
        {
          q: `Can making bi-weekly or lump-sum payments accelerate my goal?`,
          a: `Yes! Switching to an accelerated bi-weekly payment schedule produces 26 half-payments per year—equating to 13 full monthly payments. This extra payment directly reduces principal, shaving years off your tenure and saving thousands in cumulative interest.`
        }
      );
    } else if (isFit) {
      domainPool.push(
        {
          q: `How frequently should I recalculate my metrics with the ${title}?`,
          a: `Body composition, basal metabolic rate, and caloric targets shift as your weight, body fat percentage, and activity levels change. Recalculating every 3 to 4 weeks ensures your caloric intake, macro splits, and training targets remain aligned with your physiological progress.`
        },
        {
          q: `Does the ${title} account for individual metabolic differences?`,
          a: `Calculators provide standardized estimations based on validated clinical equations (e.g., Mifflin-St Jeor, Katch-McArdle, or CDC guidelines). Genetic variance, hormone balance, thyroid function, and lean muscle mass create individual adjustments of approximately 5-10%.`
        },
        {
          q: `What is the best way to track progress using this calculator?`,
          a: `Combine numerical estimates with objective bio-markers: weekly scale weight averages, body circumference measurements, progress photographs, and physical performance benchmarks rather than relying on a single daily scale reading.`
        },
        {
          q: `Are these health and fitness metrics medically diagnostic?`,
          a: `No. Calculations are designed for fitness tracking, nutritional planning, and athletic conditioning. They should never replace specialized clinical diagnostic evaluations or individualized medical treatment prescribed by a licensed physician or registered dietitian.`
        }
      );
    } else if (isMath) {
      domainPool.push(
        {
          q: `What precision standards does the ${title} utilize?`,
          a: `Our mathematical calculation engines utilize IEEE 754 double-precision 64-bit floating-point arithmetic with built-in epsilon rounding guards, ensuring accuracy up to 15 significant decimal digits without accumulating binary truncation errors.`
        },
        {
          q: `How does the ${title} handle undefined values or edge boundaries?`,
          a: `The algorithm contains rigorous sanity checks that flag division by zero, negative square roots in real-number mode, and overflow constraints, displaying clear explanatory warnings rather than silent calculation crashes.`
        },
        {
          q: `Can I input fractional or decimal values into the calculation fields?`,
          a: `Yes! All input controls support fractional numbers, multi-digit decimals, and scientific standard notation, allowing seamless execution across standard, engineering, and academic problems.`
        },
        {
          q: `How can I verify the step-by-step mathematical working?`,
          a: `Refer to the Mathematical Foundation section above, which details the exact algebraic formulas, variable definitions, and substitution steps applied to produce the final computed result.`
        }
      );
    }

    // Universal fallback questions to guarantee 8 FAQs
    const universalPool = [
      {
        q: `What is the primary purpose and utility of the ${title}?`,
        a: `The <strong>${title}</strong> delivers instantaneous, mathematically verified estimations designed to assist users in evaluating scenarios, comparing options, and making data-backed decisions with complete precision.`
      },
      {
        q: `What formulas and computational principles govern the ${title}?`,
        a: `Calculations follow established mathematical, engineering, or clinical reference models with verified rounding rules, ensuring reliable results across standard, edge-case, and boundary scenarios.`
      },
      {
        q: `How accurate are the results produced by this calculator?`,
        a: `The computational engine runs double-precision floating-point logic verified against institutional reference models. In real-world applications, minor variations may occur due to external institution policies, local tax laws, or specialized fees.`
      },
      {
        q: `How can I optimize my inputs to achieve the most favorable outcome?`,
        a: `Experiment with our real-time interactive sliders and presets. Testing slight adjustments reveals sensitivity thresholds, optimal cost-saving points, and the most efficient allocation strategy.`
      },
      {
        q: `What common mistakes should users avoid when using the ${title}?`,
        a: `Frequent errors include confusing annual with monthly rates, neglecting auxiliary fees or local sales taxes, failing to adjust for timeline variations, and assuming fixed returns on variable investments.`
      },
      {
        q: `Can I export, save, or share my calculation results?`,
        a: `Yes! You can instantly generate a verified, publication-grade single-page PDF report with dynamic charts, copy individual numbers directly to your clipboard, or share a direct link with your exact parameters.`
      },
      {
        q: `Is the ${title} fully functional on mobile devices?`,
        a: `Yes! The entire calculator is 100% mobile-friendly with touch-optimized sliders, compact result displays, and rapid sub-millisecond calculation response on all smartphones and tablets.`
      },
      {
        q: `Is my financial or personal data kept completely private?`,
        a: `<strong>100% Private.</strong> All calculations run strictly inside your web browser. Zero personal numbers, salary figures, health data, or inputs are ever transmitted over the internet or saved to remote databases.`
      }
    ];

    const combinedPool = [...domainPool, ...universalPool];

    for (const item of combinedPool) {
      if (faqs.length >= 8) break;
      const qLower = item.q.toLowerCase().trim();
      let exists = false;
      for (const eq of existingQuestions) {
        if (eq.includes(qLower.slice(0, 20)) || qLower.includes(eq.slice(0, 20))) {
          exists = true;
          break;
        }
      }
      if (!exists) {
        faqs.push(item);
        existingQuestions.add(qLower);
      }
    }

    // Safety fallback: if somehow still under 8
    while (faqs.length < 8) {
      faqs.push({
        q: `Can I perform unlimited calculations on the ${title}?`,
        a: `Yes, CALC• provides 100% free, unrestricted access with unlimited calculations, zero subscription paywalls, and zero forced registration.`
      });
    }

    return faqs.slice(0, 8);
  }

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

    const initialFaqs = [
      {
        q: `What is the primary purpose and utility of the ${title}?`,
        a: `The <strong>${title}</strong> provides fast, reliable, and mathematically verified answers. Engineered for precision and ease of use, it features real-time dynamic inputs, interactive range sliders, and instant result computation designed to assist users in making informed, data-driven decisions.`
      },
      {
        q: `How accurate are the results produced by the ${title}?`,
        a: `Our calculation engines use high-precision IEEE 754 floating-point arithmetic verified against industry and clinical standard reference models with strict rounding safeguards.`
      },
      {
        q: 'Is my data transmitted or logged on any external server?',
        a: '<strong>No.</strong> This tool runs 100% client-side directly within your web browser. Your inputs, calculations, and personal numbers are completely private, confidential, and safe.'
      }
    ];

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
      faqs: ensureEightFaqs(initialFaqs, title, catName)
    };
  }

  /**
   * Dynamically updates Schema.org FAQPage structured data in document head
   */
  function updateFaqSchema(data) {
    try {
      let scriptEl = document.getElementById('calc-faq-schema-ld');
      if (!scriptEl) {
        scriptEl = document.createElement('script');
        scriptEl.id = 'calc-faq-schema-ld';
        scriptEl.type = 'application/ld+json';
        document.head.appendChild(scriptEl);
      }
      const schemaData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": (data.faqs || []).map(f => ({
          "@type": "Question",
          "name": (f.q || '').replace(/<[^>]+>/g, '').trim(),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": (f.a || '').replace(/<[^>]+>/g, '').trim()
          }
        }))
      };
      scriptEl.textContent = JSON.stringify(schemaData);
    } catch (err) {
      console.warn('FAQ Schema update notice:', err);
    }
  }

  /**
   * Builds the complete HTML string for the SEO & Informational Guide
   */
  function buildGuideHtml(data) {
    // STRICT GUARANTEE: Ensure exactly 8 FAQs are present
    data.faqs = ensureEightFaqs(data.faqs || [], data.title, data.category);

    const stepsHtml = (data.steps || []).map((s, idx) => `
      <div class="seo-step-item">
        <div class="seo-step-num">${idx + 1}</div>
        <div class="seo-step-content">
          <h4 class="seo-step-title">${s.title}</h4>
          <p class="seo-step-desc">${s.desc}</p>
        </div>
      </div>
    `).join('');

    const faqsHtml = data.faqs.map((faq, idx) => `
      <details class="seo-faq-item"${idx === 0 ? ' open' : ''}>
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

        <!-- Structured FAQs for Search Engine Rich Snippets (Guaranteed Exactly 8 FAQs) -->
        <article class="seo-card seo-faq-card">
          <div class="seo-card-header">
            <div class="seo-card-icon-wrap">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <h3 class="seo-card-title">Frequently Asked Questions (FAQ) &bull; 8 Verified Questions</h3>
          </div>
          <div class="seo-faqs-container">
            ${faqsHtml}
          </div>
        </article>

        <!-- Client-Side Security & Privacy Highlight Banner (User Requested) -->
        <div class="seo-privacy-banner" style="margin-top: 1rem;">
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
    
    // Strict 8 FAQs enforcement
    guideData.faqs = ensureEightFaqs(guideData.faqs || [], guideData.title, guideData.category);

    // Update HTML
    container.innerHTML = buildGuideHtml(guideData);
    container.style.display = 'block';

    // Inject / Update Schema.org FAQPage structured data for Google SEO Rich Snippets
    updateFaqSchema(guideData);
  }

  // Expose to window
  window.SeoGuide = {
    updateGuide,
    SEO_DATABASE,
    ensureEightFaqs
  };

  // Auto-init on DOMContentLoaded for the initial default calculators
  document.addEventListener('DOMContentLoaded', () => {
    // Check initial financial calculator
    updateGuide('sec-loan-calc', 'financial');
    // Check initial fitness calculator
    updateGuide('sec-bf-calc', 'fitness');
    // Check initial math calculator
    updateGuide('sec-sci-calc', 'math');
    // Check initial other calculator
    updateGuide('sec-gpa-calc', 'other');
    // Check scientific calculator
    updateGuide('sec-sci-calc', 'standard');
  });
})();
