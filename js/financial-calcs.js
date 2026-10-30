/* ==========================================================================
   CALC• MODERN CALCULATOR - FINANCIAL CALCULATORS ENGINE (PRO & US EDITIONS)
   ========================================================================== */

const FinancialCalcs = {
  currency: '$',

  formatCurrency(val, currency = this.currency) {
    if (isNaN(val) || !isFinite(val)) return `${currency}0.00`;
    return `${currency}${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  },

  setCurrency(curr) {
    this.currency = curr;
    document.querySelectorAll('.curr-symbol').forEach(el => {
      el.textContent = curr;
    });
    // Re-run all financial calculations
    this.calcMortgage();
    this.calcLoanEMI();
    this.calcAutoLoan();
    this.calcInterest();
    this.calcPayment();
    this.calcRetirement();
    this.calcAmortization();
    this.calcInvestment();
    this.calcCurrency();
    this.calcInflation();
    this.calcFinanceTVM('fv');
    this.calcMortgagePayoff();
    this.calc401k();
    this.calcCompoundInterest();
    this.calcSIP();
    this.calcDiscountTax();
    this.calcTipSplit();
    this.calcROI();
    this.calcPension();
    this.calcHouseAffordability();
    this.calcSocialSecurity();
    this.calcRent();
    this.calcAnnuity();
    this.calcDTI();
    this.calcAnnuityPayout();
    this.calcRealEstate();
    this.calcRothIRA();
    this.calcRefinance();
    this.calcIRA();
    this.calcRentalProperty();
    this.calcRMD();
    this.calcAPR();
    this.calcFHALoan();
    this.calcVAMortgage();
    this.calcHomeEquityLoan();
    this.calcHELOC();
    this.calcDownPayment();
    this.calcRentVsBuy();
    this.calcIncomeTax();
    this.calcSalary();
    this.calcMarriageTax();
    this.calcEstateTax();
    this.calcPaycheck();
    this.calcAutoRebate();
    this.calcAutoLease();
    this.calcInterestRate();
    this.calcSavingsGoal();
    this.calcSimpleInterest();
    this.calcCD();
    this.calcBond();
    this.calcMutualFund();
    this.calcAverageReturn();
    this.calcIRR();
    this.calcPayback();
    this.calcPresentValue();
    this.calcFutureValue();
    this.calcSalesTax();
    this.calcCreditCard();
    this.calcCCPayoff();
    this.calcDebtPayoff();
    this.calcDebtConsolidation();
    this.calcRepayment();
    this.calcStudentLoan();
    this.calcCollegeCost();
    this.calcDepreciation();
    this.calcMargin();
    this.calcDiscount();
    this.calcBusinessLoan();
    this.calcPersonalLoan();
    this.calcBoatLoan();
    this.calcGenLease();
    this.calcBudget();
    this.calcCommission();
  },

  // ------------------------------------------------------------------------
  // 1. US MORTGAGE CALCULATOR (With Taxes, Insurance, PMI, HOA & Schedule)
  // ------------------------------------------------------------------------
  calcMortgage() {
    const homePrice = parseFloat(document.getElementById('mort-price')?.value) || 0;
    const downPayment = parseFloat(document.getElementById('mort-down')?.value) || 0;
    const termYears = parseFloat(document.getElementById('mort-term')?.value) || 30;
    const rate = parseFloat(document.getElementById('mort-rate')?.value) || 0;
    const annualTax = parseFloat(document.getElementById('mort-tax')?.value) || 0;
    const annualIns = parseFloat(document.getElementById('mort-ins')?.value) || 0;
    const monthlyHOA = parseFloat(document.getElementById('mort-hoa')?.value) || 0;

    const loanAmount = Math.max(0, homePrice - downPayment);
    const downPaymentPct = homePrice > 0 ? (downPayment / homePrice) * 100 : 0;
    const downPctEl = document.getElementById('mort-down-pct');
    if (downPctEl) downPctEl.textContent = `${downPaymentPct.toFixed(1)}%`;

    if (loanAmount <= 0 || rate <= 0 || termYears <= 0) {
      return;
    }

    const monthlyRate = (rate / 100) / 12;
    const totalPayments = termYears * 12;

    // Standard US Monthly Principal & Interest: P * r * (1+r)^n / ((1+r)^n - 1)
    const factor = Math.pow(1 + monthlyRate, totalPayments);
    const monthlyPI = (loanAmount * monthlyRate * factor) / (factor - 1);

    // Monthly Taxes and Homeowners Insurance
    const monthlyTax = annualTax / 12;
    const monthlyIns = annualIns / 12;

    // US Private Mortgage Insurance (PMI): Required if down payment < 20%
    // Typical US PMI is ~0.75% of original loan amount per year
    let monthlyPMI = 0;
    if (downPaymentPct < 20) {
      monthlyPMI = (loanAmount * 0.0075) / 12;
    }

    const totalMonthlyPayment = monthlyPI + monthlyTax + monthlyIns + monthlyHOA + monthlyPMI;
    const totalLoanCost = (monthlyPI * totalPayments);
    const totalInterestPaid = totalLoanCost - loanAmount;

    // Update UI elements
    const resTotalMo = document.getElementById('res-mort-total-monthly');
    const resPI = document.getElementById('res-mort-pi');
    const resTax = document.getElementById('res-mort-tax');
    const resIns = document.getElementById('res-mort-ins');
    const resPMI = document.getElementById('res-mort-pmi');
    const resHOA = document.getElementById('res-mort-hoa');
    const resTotalInt = document.getElementById('res-mort-total-interest');
    const resLoanAmt = document.getElementById('res-mort-loan-amount');

    if (resTotalMo) resTotalMo.textContent = this.formatCurrency(totalMonthlyPayment);
    if (resPI) resPI.textContent = this.formatCurrency(monthlyPI);
    if (resTax) resTax.textContent = this.formatCurrency(monthlyTax);
    if (resIns) resIns.textContent = this.formatCurrency(monthlyIns);
    if (resHOA) resHOA.textContent = this.formatCurrency(monthlyHOA);
    if (resTotalInt) resTotalInt.textContent = this.formatCurrency(totalInterestPaid);
    if (resLoanAmt) resLoanAmt.textContent = this.formatCurrency(loanAmount);

    if (resPMI) {
      if (monthlyPMI > 0) {
        resPMI.textContent = `${this.formatCurrency(monthlyPMI)} (<20% down)`;
        resPMI.style.color = 'var(--accent-rose)';
      } else {
        resPMI.textContent = '$0.00 (No PMI: ≥20% down)';
        resPMI.style.color = 'var(--accent-green)';
      }
    }

    // Generate 5-year Amortization preview
    this.renderMortgageAmortization(loanAmount, monthlyRate, monthlyPI);
  },

  renderMortgageAmortization(principal, monthlyRate, monthlyPI) {
    const tableBody = document.getElementById('mortgage-amort-body');
    if (!tableBody) return;

    let balance = principal;
    let html = '';

    for (let year = 1; year <= 5; year++) {
      let yearInterest = 0;
      let yearPrincipal = 0;

      for (let m = 0; m < 12; m++) {
        const intMonth = balance * monthlyRate;
        const prinMonth = monthlyPI - intMonth;
        yearInterest += intMonth;
        yearPrincipal += prinMonth;
        balance -= prinMonth;
        if (balance < 0) balance = 0;
      }

      html += `
        <tr>
          <td>Year ${year}</td>
          <td>${this.formatCurrency(yearPrincipal)}</td>
          <td>${this.formatCurrency(yearInterest)}</td>
          <td>${this.formatCurrency(balance)}</td>
        </tr>
      `;
    }
    tableBody.innerHTML = html;
  },

  // ------------------------------------------------------------------------
  // 2. LOAN & EMI CALCULATOR (Auto, Personal, Student Loans)
  // ------------------------------------------------------------------------
  calcLoanEMI() {
    const principal = parseFloat(document.getElementById('loan-amount')?.value) || 0;
    const annualRate = parseFloat(document.getElementById('loan-rate')?.value) || 0;
    const tenureYears = parseFloat(document.getElementById('loan-years')?.value) || 0;

    if (principal <= 0 || annualRate <= 0 || tenureYears <= 0) {
      this.updateLoanOutputs(0, 0, 0, 100, 0);
      return;
    }

    const monthlyRate = (annualRate / 12) / 100;
    const totalMonths = tenureYears * 12;

    const factor = Math.pow(1 + monthlyRate, totalMonths);
    const emi = (principal * monthlyRate * factor) / (factor - 1);
    const totalPayment = emi * totalMonths;
    const totalInterest = totalPayment - principal;

    const principalPct = Math.round((principal / totalPayment) * 100);
    const interestPct = 100 - principalPct;

    this.updateLoanOutputs(emi, totalInterest, totalPayment, principalPct, interestPct);
  },

  updateLoanOutputs(emi, interest, total, principalPct, interestPct) {
    const emiEl = document.getElementById('res-loan-emi');
    const interestEl = document.getElementById('res-loan-interest');
    const totalEl = document.getElementById('res-loan-total');
    const barPrincipal = document.getElementById('loan-bar-principal');
    const barInterest = document.getElementById('loan-bar-interest');
    const pctPrincipal = document.getElementById('loan-pct-principal');
    const pctInterest = document.getElementById('loan-pct-interest');

    if (emiEl) emiEl.textContent = this.formatCurrency(emi);
    if (interestEl) interestEl.textContent = this.formatCurrency(interest);
    if (totalEl) totalEl.textContent = this.formatCurrency(total);

    if (barPrincipal) barPrincipal.style.width = `${principalPct}%`;
    if (barInterest) barInterest.style.width = `${interestPct}%`;
    if (pctPrincipal) pctPrincipal.textContent = `${principalPct}%`;
    if (pctInterest) pctInterest.textContent = `${interestPct}%`;
  },

  // ------------------------------------------------------------------------
  // 3. 401(k) & RETIREMENT SAVINGS PLANNER (US Standard)
  // ------------------------------------------------------------------------
  calc401k() {
    const currentAge = parseFloat(document.getElementById('ret-current-age')?.value) || 30;
    const retireAge = parseFloat(document.getElementById('ret-retire-age')?.value) || 67;
    const currentBal = parseFloat(document.getElementById('ret-current-bal')?.value) || 0;
    const salary = parseFloat(document.getElementById('ret-salary')?.value) || 0;
    const contribPct = parseFloat(document.getElementById('ret-contrib-pct')?.value) || 0;
    const matchPct = parseFloat(document.getElementById('ret-match-pct')?.value) || 0;
    const matchCap = parseFloat(document.getElementById('ret-match-cap')?.value) || 6;
    const returnRate = parseFloat(document.getElementById('ret-return-rate')?.value) || 7.5;
    const salaryGrowth = parseFloat(document.getElementById('ret-salary-growth')?.value) || 2.5;
    const inflationRate = parseFloat(document.getElementById('ret-inflation-rate')?.value) || 2.5;

    if (retireAge <= currentAge || salary <= 0) return;

    const years = retireAge - currentAge;
    let balance = currentBal;
    let currentSalary = salary;
    let totalEmployeeContrib = 0;
    let totalEmployerMatch = 0;

    const r = returnRate / 100;
    const g = salaryGrowth / 100;

    for (let y = 1; y <= years; y++) {
      const ageNow = currentAge + y - 1;
      const irsLimit = ageNow >= 50 ? 30500 : 23000;
      // Annual employee contribution capped by IRS limits
      const desiredContrib = currentSalary * (contribPct / 100);
      const empContrib = Math.min(desiredContrib, irsLimit);

      // Employer match: e.g. 50% match up to 6% of salary
      const eligibleSalary = currentSalary * (Math.min(contribPct, matchCap) / 100);
      const matchContrib = eligibleSalary * (matchPct / 100);

      totalEmployeeContrib += empContrib;
      totalEmployerMatch += matchContrib;

      // Add to balance and apply annual investment growth
      balance = (balance + empContrib + matchContrib) * (1 + r);
      // Salary increase for next year
      currentSalary *= (1 + g);
    }

    const totalGrowth = Math.max(0, balance - (currentBal + totalEmployeeContrib + totalEmployerMatch));
    const monthlyIncome = (balance * 0.04) / 12; // 4% rule
    const inflationFactor = Math.pow(1 + (inflationRate / 100), years);
    const purchasingPower = balance / (inflationFactor || 1);

    const resBalance = document.getElementById('res-ret-balance');
    const resEmpContrib = document.getElementById('res-ret-emp-contrib');
    const resEmployerMatch = document.getElementById('res-ret-employer-match');
    const resGrowth = document.getElementById('res-ret-growth');
    const resMoIncome = document.getElementById('res-ret-monthly-income');
    const resPurchasing = document.getElementById('res-ret-purchasing-power');

    if (resBalance) resBalance.textContent = this.formatCurrency(balance);
    if (resEmpContrib) resEmpContrib.textContent = this.formatCurrency(totalEmployeeContrib);
    if (resEmployerMatch) resEmployerMatch.textContent = this.formatCurrency(totalEmployerMatch);
    if (resGrowth) resGrowth.textContent = this.formatCurrency(totalGrowth);
    if (resMoIncome) resMoIncome.textContent = this.formatCurrency(monthlyIncome);
    if (resPurchasing) resPurchasing.textContent = this.formatCurrency(purchasingPower);

    // Update progress bar
    const barEmp = document.getElementById('ret-bar-emp');
    const barMatch = document.getElementById('ret-bar-match');
    const barGrowth = document.getElementById('ret-bar-growth');
    if (balance > 0 && barEmp && barMatch && barGrowth) {
      const pEmp = ((totalEmployeeContrib + currentBal) / balance) * 100;
      const pMatch = (totalEmployerMatch / balance) * 100;
      const pGrowth = Math.max(0, 100 - pEmp - pMatch);
      barEmp.style.width = `${pEmp.toFixed(1)}%`;
      barMatch.style.width = `${pMatch.toFixed(1)}%`;
      barGrowth.style.width = `${pGrowth.toFixed(1)}%`;
    }
  },

  // ------------------------------------------------------------------------
  // NEW: PENSION CALCULATOR (Defined Benefit Plan Engine)
  // ------------------------------------------------------------------------
  calcPension() {
    const fas = parseFloat(document.getElementById('pension-fas')?.value) || 0;
    const serviceYears = parseFloat(document.getElementById('pension-service-years')?.value) || 0;
    const multiplier = parseFloat(document.getElementById('pension-multiplier')?.value) || 0;
    const curAge = parseFloat(document.getElementById('pension-cur-age')?.value) || 45;
    const retAge = parseFloat(document.getElementById('pension-ret-age')?.value) || 62;
    const lifeExp = parseFloat(document.getElementById('pension-life-exp')?.value) || 85;
    const cola = parseFloat(document.getElementById('pension-cola')?.value) || 0;

    if (fas <= 0 || serviceYears <= 0 || multiplier <= 0) return;

    const annualPension = serviceYears * (multiplier / 100) * fas;
    const monthlyPension = annualPension / 12;
    const replacementRatio = (annualPension / fas) * 100;
    const retirementYears = Math.max(1, lifeExp - retAge);

    // Lifetime total calculation with COLA compounding
    const c = cola / 100;
    let lifetimeTotal = 0;
    if (c === 0) {
      lifetimeTotal = annualPension * retirementYears;
    } else {
      lifetimeTotal = annualPension * ((Math.pow(1 + c, retirementYears) - 1) / c);
    }

    // Equivalent Lump-Sum Present Value (standard discount rate 4.5%)
    const discountRate = 0.045;
    let presentValue = 0;
    for (let y = 1; y <= retirementYears; y++) {
      const yearBenefit = annualPension * Math.pow(1 + c, y - 1);
      presentValue += yearBenefit / Math.pow(1 + discountRate, y);
    }

    const resMonthly = document.getElementById('res-pension-monthly');
    const resAnnual = document.getElementById('res-pension-annual');
    const resRepl = document.getElementById('res-pension-replacement');
    const resLife = document.getElementById('res-pension-lifetime');
    const resPV = document.getElementById('res-pension-lump-sum');

    if (resMonthly) resMonthly.textContent = this.formatCurrency(monthlyPension);
    if (resAnnual) resAnnual.textContent = this.formatCurrency(annualPension);
    if (resRepl) resRepl.textContent = `${replacementRatio.toFixed(1)}%`;
    if (resLife) resLife.textContent = this.formatCurrency(lifetimeTotal);
    if (resPV) resPV.textContent = this.formatCurrency(presentValue);
  },

  // ------------------------------------------------------------------------
  // NEW: HOUSE AFFORDABILITY CALCULATOR (US 28/36 Underwriting Rule)
  // ------------------------------------------------------------------------
  calcHouseAffordability() {
    const annualIncome = parseFloat(document.getElementById('afford-income')?.value) || 0;
    const monthlyDebt = parseFloat(document.getElementById('afford-debt')?.value) || 0;
    const downPayment = parseFloat(document.getElementById('afford-down')?.value) || 0;
    const rate = parseFloat(document.getElementById('afford-rate')?.value) || 6.5;
    const termYears = parseFloat(document.getElementById('afford-term')?.value) || 30;
    const taxRate = parseFloat(document.getElementById('afford-tax-rate')?.value) || 1.2;
    const insAnnual = parseFloat(document.getElementById('afford-ins-annual')?.value) || 1200;
    const monthlyHOA = parseFloat(document.getElementById('afford-hoa')?.value) || 0;

    if (annualIncome <= 0 || rate <= 0 || termYears <= 0) return;

    const monthlyGross = annualIncome / 12;
    // 28/36 Rule Standard
    const frontEndBudget = monthlyGross * 0.28;
    const backEndBudget = Math.max(0, (monthlyGross * 0.36) - monthlyDebt);
    const maxRecPayment = Math.min(frontEndBudget, backEndBudget);

    // Conservative (25/33) and Aggressive (33/43)
    const maxConsPayment = Math.min(monthlyGross * 0.25, Math.max(0, (monthlyGross * 0.33) - monthlyDebt));
    const maxAggrPayment = Math.min(monthlyGross * 0.33, Math.max(0, (monthlyGross * 0.43) - monthlyDebt));

    const solvePrice = (maxPmt) => {
      const r = (rate / 100) / 12;
      const n = termYears * 12;
      const k = (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const fixedMonthly = (insAnnual / 12) + monthlyHOA;
      const tMo = (taxRate / 100) / 12;

      // First solve assuming PMI is required (< 20% down)
      const pmiMo = 0.0075 / 12;
      let price = (maxPmt - fixedMonthly + (downPayment * (k + pmiMo))) / (k + pmiMo + tMo);

      // If down payment >= 20% of purchase price, re-solve without PMI
      if (price > 0 && (downPayment / price) >= 0.20) {
        price = (maxPmt - fixedMonthly + (downPayment * k)) / (k + tMo);
      }
      return Math.max(downPayment, price);
    };

    const recPrice = solvePrice(maxRecPayment);
    const consPrice = solvePrice(maxConsPayment);
    const aggrPrice = solvePrice(maxAggrPayment);

    const recLoan = Math.max(0, recPrice - downPayment);
    const r = (rate / 100) / 12;
    const n = termYears * 12;
    const factor = Math.pow(1 + r, n);
    const monthlyPI = recLoan > 0 ? (recLoan * r * factor) / (factor - 1) : 0;
    const monthlyTax = (recPrice * (taxRate / 100)) / 12;
    const monthlyIns = insAnnual / 12;
    const isUnder20Down = (downPayment / recPrice) < 0.20;
    const monthlyPMI = (isUnder20Down && recLoan > 0) ? (recLoan * 0.0075) / 12 : 0;
    const totalMonthly = monthlyPI + monthlyTax + monthlyIns + monthlyPMI + monthlyHOA;

    const resPrice = document.getElementById('res-afford-max-price');
    const resLoan = document.getElementById('res-afford-max-loan');
    const resTotalMo = document.getElementById('res-afford-monthly-total');
    const resPI = document.getElementById('res-afford-pi');
    const resTax = document.getElementById('res-afford-tax');
    const resIns = document.getElementById('res-afford-ins');
    const resPMI = document.getElementById('res-afford-pmi');
    const resHOA = document.getElementById('res-afford-hoa');
    const resCons = document.getElementById('res-afford-cons-price');
    const resAggr = document.getElementById('res-afford-aggr-price');
    const resDTI = document.getElementById('res-afford-dti');

    if (resPrice) resPrice.textContent = this.formatCurrency(recPrice);
    if (resLoan) resLoan.textContent = this.formatCurrency(recLoan);
    if (resTotalMo) resTotalMo.textContent = this.formatCurrency(totalMonthly);
    if (resPI) resPI.textContent = this.formatCurrency(monthlyPI);
    if (resTax) resTax.textContent = this.formatCurrency(monthlyTax);
    if (resIns) resIns.textContent = this.formatCurrency(monthlyIns);
    if (resPMI) resPMI.textContent = isUnder20Down ? this.formatCurrency(monthlyPMI) : '$0.00 (≥20% Down)';
    if (resHOA) resHOA.textContent = this.formatCurrency(monthlyHOA);
    if (resCons) resCons.textContent = this.formatCurrency(consPrice);
    if (resAggr) resAggr.textContent = this.formatCurrency(aggrPrice);
    if (resDTI) {
      const dtiPct = ((totalMonthly + monthlyDebt) / monthlyGross) * 100;
      resDTI.textContent = `${dtiPct.toFixed(1)}% Back-End DTI`;
    }
  },

  // ------------------------------------------------------------------------
  // NEW: SOCIAL SECURITY CALCULATOR (US SSA Full Retirement & Early/Delayed)
  // ------------------------------------------------------------------------
  calcSocialSecurity() {
    const salary = parseFloat(document.getElementById('ss-salary')?.value) || 85000;
    const claimAge = parseFloat(document.getElementById('ss-claim-age')?.value) || 67;
    const lifeExp = parseFloat(document.getElementById('ss-life-exp')?.value) || 85;

    // SSA 2024 Bend Points for PIA (Average Indexed Monthly Earnings)
    const cappedEarnings = Math.min(salary, 168600);
    const aime = cappedEarnings / 12;

    let pia = 0;
    if (aime <= 1174) {
      pia = aime * 0.90;
    } else if (aime <= 7078) {
      pia = (1174 * 0.90) + (aime - 1174) * 0.32;
    } else {
      pia = (1174 * 0.90) + ((7078 - 1174) * 0.32) + ((aime - 7078) * 0.15);
    }

    const getFactor = (age) => {
      if (age === 67) return 1.0;
      if (age < 67) {
        const m = (67 - age) * 12;
        let red = 0;
        if (m <= 36) {
          red = m * (5 / 9) / 100;
        } else {
          red = (36 * (5 / 9) / 100) + ((m - 36) * (5 / 12) / 100);
        }
        return Math.max(0.70, 1 - red);
      }
      // Delayed credit: 8% per year past 67 up to 70
      const delayedYears = Math.min(3, age - 67);
      return 1 + (delayedYears * 0.08);
    };

    const factor = getFactor(claimAge);
    const monthlyBenefit = pia * factor;
    const annualBenefit = monthlyBenefit * 12;
    const yearsOfBenefits = Math.max(1, lifeExp - claimAge);
    const lifetimeTotal = annualBenefit * yearsOfBenefits;

    // Benchmarks at 62, 67, and 70
    const f62 = getFactor(62);
    const m62 = pia * f62;
    const l62 = m62 * 12 * Math.max(1, lifeExp - 62);

    const f67 = getFactor(67);
    const m67 = pia * f67;
    const l67 = m67 * 12 * Math.max(1, lifeExp - 67);

    const f70 = getFactor(70);
    const m70 = pia * f70;
    const l70 = m70 * 12 * Math.max(1, lifeExp - 70);

    const resMo = document.getElementById('res-ss-monthly');
    const resYr = document.getElementById('res-ss-annual');
    const resLife = document.getElementById('res-ss-lifetime');
    const resPct = document.getElementById('res-ss-pct-pia');

    if (resMo) resMo.textContent = this.formatCurrency(monthlyBenefit);
    if (resYr) resYr.textContent = this.formatCurrency(annualBenefit);
    if (resLife) resLife.textContent = this.formatCurrency(lifetimeTotal);
    if (resPct) resPct.textContent = `${(factor * 100).toFixed(1)}% of FRA`;

    const el62Mo = document.getElementById('res-ss-62-mo');
    const el62Yr = document.getElementById('res-ss-62-yr');
    const el62Life = document.getElementById('res-ss-62-life');
    if (el62Mo) el62Mo.textContent = this.formatCurrency(m62);
    if (el62Yr) el62Yr.textContent = this.formatCurrency(m62 * 12);
    if (el62Life) el62Life.textContent = this.formatCurrency(l62);

    const el67Mo = document.getElementById('res-ss-67-mo');
    const el67Yr = document.getElementById('res-ss-67-yr');
    const el67Life = document.getElementById('res-ss-67-life');
    if (el67Mo) el67Mo.textContent = this.formatCurrency(m67);
    if (el67Yr) el67Yr.textContent = this.formatCurrency(m67 * 12);
    if (el67Life) el67Life.textContent = this.formatCurrency(l67);

    const el70Mo = document.getElementById('res-ss-70-mo');
    const el70Yr = document.getElementById('res-ss-70-yr');
    const el70Life = document.getElementById('res-ss-70-life');
    if (el70Mo) el70Mo.textContent = this.formatCurrency(m70);
    if (el70Yr) el70Yr.textContent = this.formatCurrency(m70 * 12);
    if (el70Life) el70Life.textContent = this.formatCurrency(l70);

    const breakEvenEl = document.getElementById('res-ss-breakeven-text');
    if (breakEvenEl) {
      if (lifeExp < 79) {
        breakEvenEl.textContent = `Based on your life expectancy of ${lifeExp}, claiming early (62) secures ${this.formatCurrency(l62)} in cumulative benefits before age 78 break-even.`;
      } else if (lifeExp <= 82) {
        breakEvenEl.textContent = `At age ${lifeExp}, claiming at Full Retirement Age (67) yields optimal lifetime wealth (${this.formatCurrency(l67)}), beating early claims by ${this.formatCurrency(l67 - l62)}.`;
      } else {
        breakEvenEl.textContent = `With a life expectancy of ${lifeExp}, delaying until age 70 maximizes your guaranteed lifetime wealth (${this.formatCurrency(l70)}), outpacing age 62 by ${this.formatCurrency(l70 - l62)}!`;
      }
    }
  },

  // ------------------------------------------------------------------------
  // NEW: RENT CALCULATOR (30% Rule, 40x Rule & 50/30/20 Framework)
  // ------------------------------------------------------------------------
  calcRent() {
    const annualIncome = parseFloat(document.getElementById('rent-income')?.value) || 0;
    const monthlyDebt = parseFloat(document.getElementById('rent-debt')?.value) || 0;
    const utilities = parseFloat(document.getElementById('rent-utilities')?.value) || 0;
    const savingsGoal = parseFloat(document.getElementById('rent-savings-goal')?.value) || 0;

    if (annualIncome <= 0) return;

    const monthlyGross = annualIncome / 12;
    const recRent = monthlyGross * 0.30;
    const consRent = monthlyGross * 0.25;
    const stretchRent = monthlyGross * 0.35;
    const landlordMax = annualIncome / 40;

    // 50/30/20 Budget Breakdown
    const needs50 = monthlyGross * 0.50;
    const wants30 = monthlyGross * 0.30;
    const savings20 = monthlyGross * 0.20;

    // Free discretionary income after rent + debt + utilities + savings
    const discretionary = Math.max(0, monthlyGross - recRent - monthlyDebt - utilities - savingsGoal);

    const resRec = document.getElementById('res-rent-recommended');
    const resCons = document.getElementById('res-rent-conservative');
    const resStretch = document.getElementById('res-rent-stretched');
    const res40x = document.getElementById('res-rent-landlord-rule');
    const resDisc = document.getElementById('res-rent-discretionary');
    const resNeeds = document.getElementById('res-rent-needs');
    const resWants = document.getElementById('res-rent-wants');
    const resSav = document.getElementById('res-rent-savings');

    if (resRec) resRec.textContent = this.formatCurrency(recRent);
    if (resCons) resCons.textContent = this.formatCurrency(consRent);
    if (resStretch) resStretch.textContent = this.formatCurrency(stretchRent);
    if (res40x) res40x.textContent = this.formatCurrency(landlordMax);
    if (resDisc) resDisc.textContent = this.formatCurrency(discretionary);
    if (resNeeds) resNeeds.textContent = this.formatCurrency(needs50);
    if (resWants) resWants.textContent = this.formatCurrency(wants30);
    if (resSav) resSav.textContent = this.formatCurrency(savings20);
  },

  // ------------------------------------------------------------------------
  // NEW: ANNUITY CALCULATOR (Deferred Annuity & Compound Wealth Growth)
  // ------------------------------------------------------------------------
  calcAnnuity() {
    const initial = parseFloat(document.getElementById('ann-initial')?.value) || 0;
    const monthly = parseFloat(document.getElementById('ann-monthly')?.value) || 0;
    const rate = parseFloat(document.getElementById('ann-rate')?.value) || 0;
    const years = parseFloat(document.getElementById('ann-years')?.value) || 0;
    const freq = parseInt(document.getElementById('ann-freq')?.value) || 12;
    const taxRate = parseFloat(document.getElementById('ann-tax')?.value) || 24;

    if (initial < 0 || rate < 0 || years <= 0) return;

    const r = rate / 100;
    const n = freq;
    const i = r / n;
    const totalPeriods = n * years;
    const depositPerPeriod = (monthly * 12) / n;

    // Tax-deferred growth formula
    let fv = initial * Math.pow(1 + i, totalPeriods);
    if (i > 0) {
      fv += depositPerPeriod * ((Math.pow(1 + i, totalPeriods) - 1) / i);
    } else {
      fv += depositPerPeriod * totalPeriods;
    }

    const totalPrincipal = initial + (monthly * 12 * years);
    const totalInterest = Math.max(0, fv - totalPrincipal);

    // Taxable account equivalent (annual tax drag)
    const afterTaxR = r * (1 - (taxRate / 100));
    const iTaxable = afterTaxR / n;
    let fvTaxable = initial * Math.pow(1 + iTaxable, totalPeriods);
    if (iTaxable > 0) {
      fvTaxable += depositPerPeriod * ((Math.pow(1 + iTaxable, totalPeriods) - 1) / iTaxable);
    } else {
      fvTaxable += depositPerPeriod * totalPeriods;
    }
    const taxAdvantage = Math.max(0, fv - fvTaxable);

    const resFV = document.getElementById('res-ann-future-val');
    const resPrinc = document.getElementById('res-ann-principal');
    const resInt = document.getElementById('res-ann-interest');
    const resAdv = document.getElementById('res-ann-tax-advantage');

    if (resFV) resFV.textContent = this.formatCurrency(fv);
    if (resPrinc) resPrinc.textContent = this.formatCurrency(totalPrincipal);
    if (resInt) resInt.textContent = this.formatCurrency(totalInterest);
    if (resAdv) resAdv.textContent = this.formatCurrency(taxAdvantage);

    const barP = document.getElementById('ann-bar-principal');
    const barI = document.getElementById('ann-bar-interest');
    if (fv > 0 && barP && barI) {
      const pctP = (totalPrincipal / fv) * 100;
      barP.style.width = `${pctP.toFixed(1)}%`;
      barI.style.width = `${(100 - pctP).toFixed(1)}%`;
    }
  },

  // ------------------------------------------------------------------------
  // NEW: DEBT-TO-INCOME (DTI) RATIO CALCULATOR (Front & Back-End Ratios)
  // ------------------------------------------------------------------------
  calcDTI() {
    const grossIncome = parseFloat(document.getElementById('dti-income')?.value) || 0;
    const housing = parseFloat(document.getElementById('dti-housing')?.value) || 0;
    const auto = parseFloat(document.getElementById('dti-auto')?.value) || 0;
    const student = parseFloat(document.getElementById('dti-student')?.value) || 0;
    const cc = parseFloat(document.getElementById('dti-cc')?.value) || 0;
    const other = parseFloat(document.getElementById('dti-other')?.value) || 0;

    if (grossIncome <= 0) return;

    const nonHousingDebt = auto + student + cc + other;
    const totalDebt = housing + nonHousingDebt;

    const frontEndDTI = (housing / grossIncome) * 100;
    const backEndDTI = (totalDebt / grossIncome) * 100;

    // Lender headroom
    const cap36 = Math.max(0, (grossIncome * 0.36) - totalDebt);
    const cap43 = Math.max(0, (grossIncome * 0.43) - totalDebt);
    const freeCash = Math.max(0, grossIncome - totalDebt);

    // Status evaluation
    let statusText = 'Excellent (Prime Loan Rates)';
    let statusColor = '#10b981';
    if (backEndDTI <= 36) {
      statusText = '✓ Excellent — Easily qualifies for prime conventional mortgages (≤36%)';
      statusColor = '#10b981';
    } else if (backEndDTI <= 43) {
      statusText = '✓ Good — Qualifies for standard FHA & conventional loans (36%–43%)';
      statusColor = '#3b82f6';
    } else if (backEndDTI <= 50) {
      statusText = '⚠ Stretched — High risk; may require compensating factors/assets (44%–50%)';
      statusColor = '#f59e0b';
    } else {
      statusText = '✕ Overburdened — Exceeds lending threshold; debt reduction advised (>50%)';
      statusColor = '#e11d48';
    }

    const resBack = document.getElementById('res-dti-backend');
    const resFront = document.getElementById('res-dti-frontend');
    const resStatus = document.getElementById('res-dti-status');
    const resCap36 = document.getElementById('res-dti-cap-36');
    const resCap43 = document.getElementById('res-dti-cap-43');
    const resFree = document.getElementById('res-dti-free-cash');

    if (resBack) {
      resBack.textContent = `${backEndDTI.toFixed(1)}%`;
      resBack.style.color = statusColor;
    }
    if (resFront) resFront.textContent = `${frontEndDTI.toFixed(1)}%`;
    if (resStatus) {
      resStatus.textContent = statusText;
      resStatus.style.color = statusColor;
    }
    if (resCap36) resCap36.textContent = this.formatCurrency(cap36);
    if (resCap43) resCap43.textContent = this.formatCurrency(cap43);
    if (resFree) resFree.textContent = this.formatCurrency(freeCash);

    // Dynamic bar
    const barH = document.getElementById('dti-bar-housing');
    const barO = document.getElementById('dti-bar-other');
    const barF = document.getElementById('dti-bar-free');
    if (barH && barO && barF) {
      const pH = Math.min(100, (housing / grossIncome) * 100);
      const pO = Math.min(100 - pH, (nonHousingDebt / grossIncome) * 100);
      const pF = Math.max(0, 100 - pH - pO);
      barH.style.width = `${pH.toFixed(1)}%`;
      barO.style.width = `${pO.toFixed(1)}%`;
      barF.style.width = `${pF.toFixed(1)}%`;
    }
  },

  // ------------------------------------------------------------------------
  // NEW: ANNUITY PAYOUT CALCULATOR (Immediate SPIA & Term-Certain Payouts)
  // ------------------------------------------------------------------------
  calcAnnuityPayout() {
    const principal = parseFloat(document.getElementById('payout-principal')?.value) || 0;
    const years = parseFloat(document.getElementById('payout-years')?.value) || 20;
    const freq = parseInt(document.getElementById('payout-freq')?.value) || 12;
    const rate = parseFloat(document.getElementById('payout-rate')?.value) || 5.0;
    const timing = document.getElementById('payout-timing')?.value || 'end';

    if (principal <= 0 || years <= 0) return;

    const n = years * freq;
    const r = (rate / 100) / freq;

    let pmt = 0;
    if (r > 0) {
      pmt = principal * ((r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
      if (timing === 'begin') {
        pmt = pmt / (1 + r);
      }
    } else {
      pmt = principal / n;
    }

    const annualIncome = pmt * freq;
    const totalPayout = pmt * n;
    const totalInterest = Math.max(0, totalPayout - principal);

    const resPMT = document.getElementById('res-payout-payment');
    const resAnn = document.getElementById('res-payout-annual');
    const resTot = document.getElementById('res-payout-total');
    const resInt = document.getElementById('res-payout-interest');

    if (resPMT) resPMT.textContent = this.formatCurrency(pmt);
    if (resAnn) resAnn.textContent = this.formatCurrency(annualIncome);
    if (resTot) resTot.textContent = this.formatCurrency(totalPayout);
    if (resInt) resInt.textContent = this.formatCurrency(totalInterest);

    const barP = document.getElementById('payout-bar-principal');
    const barI = document.getElementById('payout-bar-interest');
    if (totalPayout > 0 && barP && barI) {
      const pP = (principal / totalPayout) * 100;
      barP.style.width = `${pP.toFixed(1)}%`;
      barI.style.width = `${(100 - pP).toFixed(1)}%`;
    }
  },

  // ------------------------------------------------------------------------
  // NEW: REAL ESTATE CALCULATOR (Rental Property ROI & Cap Rate Analyzer)
  // ------------------------------------------------------------------------
  calcRealEstate() {
    const price = parseFloat(document.getElementById('re-price')?.value) || 0;
    const downPct = parseFloat(document.getElementById('re-down-pct')?.value) || 20;
    const rate = parseFloat(document.getElementById('re-rate')?.value) || 6.75;
    const termYears = parseFloat(document.getElementById('re-term')?.value) || 30;
    const monthlyRent = parseFloat(document.getElementById('re-rent')?.value) || 0;
    const vacancyPct = parseFloat(document.getElementById('re-vacancy')?.value) || 5;
    const taxYr = parseFloat(document.getElementById('re-tax-yr')?.value) || 0;
    const insYr = parseFloat(document.getElementById('re-ins-yr')?.value) || 0;
    const hoa = parseFloat(document.getElementById('re-hoa')?.value) || 0;
    const mgmtPct = parseFloat(document.getElementById('re-mgmt-pct')?.value) || 8;
    const maintPct = parseFloat(document.getElementById('re-maint-pct')?.value) || 5;
    const closingPct = parseFloat(document.getElementById('re-closing-pct')?.value) || 3;

    if (price <= 0 || monthlyRent <= 0) return;

    const downPayment = price * (downPct / 100);
    const loanAmount = Math.max(0, price - downPayment);
    const initialCash = downPayment + (price * (closingPct / 100));

    // Mortgage P&I
    let monthlyPI = 0;
    if (loanAmount > 0 && rate > 0) {
      const r = (rate / 100) / 12;
      const n = termYears * 12;
      const factor = Math.pow(1 + r, n);
      monthlyPI = (loanAmount * r * factor) / (factor - 1);
    }

    const grossAnnualRent = monthlyRent * 12;
    const egi = grossAnnualRent * (1 - (vacancyPct / 100));

    // Operating expenses
    const moTax = taxYr / 12;
    const moIns = insYr / 12;
    const moMgmt = monthlyRent * (mgmtPct / 100);
    const moMaint = monthlyRent * (maintPct / 100);
    const totalMoExpenses = moTax + moIns + hoa + moMgmt + moMaint;
    const annualExpenses = totalMoExpenses * 12;

    const noi = egi - annualExpenses;
    const annualDebtService = monthlyPI * 12;
    const annualCashFlow = noi - annualDebtService;
    const monthlyCashFlow = annualCashFlow / 12;

    const capRate = price > 0 ? (noi / price) * 100 : 0;
    const cocReturn = initialCash > 0 ? (annualCashFlow / initialCash) * 100 : 0;
    const grm = grossAnnualRent > 0 ? price / grossAnnualRent : 0;
    const dscr = annualDebtService > 0 ? noi / annualDebtService : 0;

    const resMoCF = document.getElementById('res-re-monthly-cf');
    const resAnnCF = document.getElementById('res-re-annual-cf');
    const resCap = document.getElementById('res-re-cap-rate');
    const resCoC = document.getElementById('res-re-coc');
    const resNOI = document.getElementById('res-re-noi');
    const resCash = document.getElementById('res-re-cash-required');
    const resPI = document.getElementById('res-re-mortgage-pi');
    const resGRM = document.getElementById('res-re-grm');
    const resDSCR = document.getElementById('res-re-dscr');

    if (resMoCF) {
      resMoCF.textContent = this.formatCurrency(monthlyCashFlow);
      resMoCF.style.color = monthlyCashFlow >= 0 ? 'var(--accent-green)' : 'var(--accent-rose)';
    }
    if (resAnnCF) resAnnCF.textContent = this.formatCurrency(annualCashFlow);
    if (resCap) resCap.textContent = `${capRate.toFixed(2)}%`;
    if (resCoC) resCoC.textContent = `${cocReturn.toFixed(2)}%`;
    if (resNOI) resNOI.textContent = this.formatCurrency(noi);
    if (resCash) resCash.textContent = this.formatCurrency(initialCash);
    if (resPI) resPI.textContent = this.formatCurrency(monthlyPI);
    if (resGRM) resGRM.textContent = `${grm.toFixed(2)}x`;
    if (resDSCR) resDSCR.textContent = dscr.toFixed(2);
  },

  // ------------------------------------------------------------------------
  // NEW: ROTH IRA CALCULATOR (Tax-Free Wealth & Compounding)
  // ------------------------------------------------------------------------
  calcRothIRA() {
    const curAge = parseFloat(document.getElementById('roth-cur-age')?.value) || 28;
    const retAge = parseFloat(document.getElementById('roth-ret-age')?.value) || 65;
    const curBal = parseFloat(document.getElementById('roth-cur-bal')?.value) || 0;
    const annualContrib = parseFloat(document.getElementById('roth-annual-contrib')?.value) || 7000;
    const returnRate = parseFloat(document.getElementById('roth-return-rate')?.value) || 8.0;
    const retTax = parseFloat(document.getElementById('roth-ret-tax')?.value) || 22;

    if (retAge <= curAge) return;

    const years = retAge - curAge;
    const r = returnRate / 100;

    let fv = curBal * Math.pow(1 + r, years);
    if (r > 0) {
      fv += annualContrib * ((Math.pow(1 + r, years) - 1) / r);
    } else {
      fv += annualContrib * years;
    }

    const totalContributed = curBal + (annualContrib * years);
    const taxFreeGrowth = Math.max(0, fv - totalContributed);
    const taxesSaved = fv * (retTax / 100);
    const monthlyIncome = (fv * 0.04) / 12; // 4% rule

    const resFV = document.getElementById('res-roth-balance');
    const resContrib = document.getElementById('res-roth-contributed');
    const resGrowth = document.getElementById('res-roth-growth');
    const resTaxSaved = document.getElementById('res-roth-tax-saved');
    const resIncome = document.getElementById('res-roth-monthly-income');

    if (resFV) resFV.textContent = this.formatCurrency(fv);
    if (resContrib) resContrib.textContent = this.formatCurrency(totalContributed);
    if (resGrowth) resGrowth.textContent = this.formatCurrency(taxFreeGrowth);
    if (resTaxSaved) resTaxSaved.textContent = this.formatCurrency(taxesSaved);
    if (resIncome) resIncome.textContent = this.formatCurrency(monthlyIncome);

    const barC = document.getElementById('roth-bar-contrib');
    const barG = document.getElementById('roth-bar-growth');
    if (fv > 0 && barC && barG) {
      const pC = (totalContributed / fv) * 100;
      barC.style.width = `${pC.toFixed(1)}%`;
      barG.style.width = `${(100 - pC).toFixed(1)}%`;
    }
  },

  // ------------------------------------------------------------------------
  // 23. REFINANCE CALCULATOR (Break-Even & Lifetime Interest Savings)
  // ------------------------------------------------------------------------
  calcRefinance() {
    const curBalance = parseFloat(document.getElementById('refi-cur-balance')?.value) || 0;
    const curRate = parseFloat(document.getElementById('refi-cur-rate')?.value) || 0;
    const curTermRem = parseFloat(document.getElementById('refi-cur-term-rem')?.value) || 25;
    const newRate = parseFloat(document.getElementById('refi-new-rate')?.value) || 0;
    const newTerm = parseFloat(document.getElementById('refi-new-term')?.value) || 30;
    const closingCosts = parseFloat(document.getElementById('refi-closing-costs')?.value) || 0;
    const cashOut = parseFloat(document.getElementById('refi-cash-out')?.value) || 0;

    if (curBalance <= 0 || curRate <= 0 || curTermRem <= 0 || newRate <= 0 || newTerm <= 0) return;

    // Current loan monthly P&I and remaining interest
    const rCur = (curRate / 100) / 12;
    const nCur = curTermRem * 12;
    const factorCur = Math.pow(1 + rCur, nCur);
    const pmtCur = (curBalance * rCur * factorCur) / (factorCur - 1);
    const totalIntCur = (pmtCur * nCur) - curBalance;

    // New loan calculation
    const newLoanAmt = curBalance + cashOut;
    const rNew = (newRate / 100) / 12;
    const nNew = newTerm * 12;
    const factorNew = Math.pow(1 + rNew, nNew);
    const pmtNew = (newLoanAmt * rNew * factorNew) / (factorNew - 1);
    const totalIntNew = (pmtNew * nNew) - newLoanAmt;

    const monthlySavings = pmtCur - pmtNew;
    const lifetimeSavings = totalIntCur - (totalIntNew + closingCosts);
    const breakEvenMonths = monthlySavings > 0 ? Math.ceil(closingCosts / monthlySavings) : 0;

    const elSavings = document.getElementById('res-refi-monthly-savings');
    const elNewPmt = document.getElementById('res-refi-new-payment');
    const elCurPmt = document.getElementById('res-refi-cur-payment');
    const elBreakEven = document.getElementById('res-refi-breakeven');
    const elLifetime = document.getElementById('res-refi-lifetime-savings');

    if (elSavings) {
      if (monthlySavings >= 0) {
        elSavings.textContent = `Save ${this.formatCurrency(monthlySavings)} / mo`;
        elSavings.style.color = 'var(--accent-green)';
      } else {
        elSavings.textContent = `+${this.formatCurrency(Math.abs(monthlySavings))} / mo higher`;
        elSavings.style.color = 'var(--accent-rose)';
      }
    }
    if (elNewPmt) elNewPmt.textContent = this.formatCurrency(pmtNew);
    if (elCurPmt) elCurPmt.textContent = this.formatCurrency(pmtCur);
    if (elBreakEven) {
      if (monthlySavings > 0 && closingCosts > 0) {
        elBreakEven.textContent = `${breakEvenMonths} Months (${(breakEvenMonths / 12).toFixed(1)} Yrs)`;
      } else if (closingCosts === 0) {
        elBreakEven.textContent = 'Instant (No closing costs)';
      } else {
        elBreakEven.textContent = 'No break-even (Higher payment)';
      }
    }
    if (elLifetime) {
      elLifetime.textContent = this.formatCurrency(lifetimeSavings);
      elLifetime.style.color = lifetimeSavings >= 0 ? 'var(--accent-green)' : 'var(--accent-rose)';
    }
  },

  // ------------------------------------------------------------------------
  // 24. TRADITIONAL IRA CALCULATOR (Upfront Deductions & Growth)
  // ------------------------------------------------------------------------
  calcIRA() {
    const curAge = parseFloat(document.getElementById('ira-cur-age')?.value) || 30;
    const retAge = parseFloat(document.getElementById('ira-ret-age')?.value) || 65;
    const curBal = parseFloat(document.getElementById('ira-cur-bal')?.value) || 0;
    const annualContrib = parseFloat(document.getElementById('ira-annual-contrib')?.value) || 7000;
    const returnRate = parseFloat(document.getElementById('ira-return-rate')?.value) || 7.5;
    const curTax = parseFloat(document.getElementById('ira-current-tax')?.value) || 24;
    const retTax = parseFloat(document.getElementById('ira-ret-tax')?.value) || 15;

    if (retAge <= curAge) return;

    const years = retAge - curAge;
    const r = returnRate / 100;

    let fv = curBal * Math.pow(1 + r, years);
    if (r > 0) {
      fv += annualContrib * ((Math.pow(1 + r, years) - 1) / r);
    } else {
      fv += annualContrib * years;
    }

    const totalContributed = curBal + (annualContrib * years);
    const upfrontTaxSavingsYear = annualContrib * (curTax / 100);
    const totalUpfrontTaxSavings = upfrontTaxSavingsYear * years;
    const taxesDueRetirement = fv * (retTax / 100);
    const afterTaxWealth = fv - taxesDueRetirement;
    const monthlyIncome = (afterTaxWealth * 0.04) / 12;

    // Normal taxable account comparison (gains taxed at 15% annually)
    const rTaxable = r * 0.85;
    let fvTaxable = curBal * Math.pow(1 + rTaxable, years);
    if (rTaxable > 0) {
      fvTaxable += (annualContrib - upfrontTaxSavingsYear) * ((Math.pow(1 + rTaxable, years) - 1) / rTaxable);
    }
    const iraAdvantage = Math.max(0, afterTaxWealth - fvTaxable);

    const elBal = document.getElementById('res-ira-balance');
    const elUpfront = document.getElementById('res-ira-tax-savings-now');
    const elAfterTax = document.getElementById('res-ira-after-tax');
    const elIncome = document.getElementById('res-ira-monthly-income');
    const elAdv = document.getElementById('res-ira-advantage');

    if (elBal) elBal.textContent = this.formatCurrency(fv);
    if (elUpfront) elUpfront.textContent = this.formatCurrency(totalUpfrontTaxSavings);
    if (elAfterTax) elAfterTax.textContent = this.formatCurrency(afterTaxWealth);
    if (elIncome) elIncome.textContent = this.formatCurrency(monthlyIncome);
    if (elAdv) elAdv.textContent = this.formatCurrency(iraAdvantage);

    const barContrib = document.getElementById('ira-bar-contrib');
    const barGrowth = document.getElementById('ira-bar-growth');
    if (fv > 0 && barContrib && barGrowth) {
      const pC = (totalContributed / fv) * 100;
      barContrib.style.width = `${pC.toFixed(1)}%`;
      barGrowth.style.width = `${(100 - pC).toFixed(1)}%`;
    }
  },

  // ------------------------------------------------------------------------
  // 25. RENTAL PROPERTY CALCULATOR (Multi-unit, OpEx, NOI & Returns)
  // ------------------------------------------------------------------------
  calcRentalProperty() {
    const price = parseFloat(document.getElementById('rental-price')?.value) || 0;
    const downPct = parseFloat(document.getElementById('rental-down-pct')?.value) || 20;
    const rate = parseFloat(document.getElementById('rental-rate')?.value) || 6.75;
    const term = parseFloat(document.getElementById('rental-term')?.value) || 30;
    const grossRent = parseFloat(document.getElementById('rental-gross-rent')?.value) || 0;
    const otherInc = parseFloat(document.getElementById('rental-other-inc')?.value) || 0;
    const vacancyPct = parseFloat(document.getElementById('rental-vacancy')?.value) || 5;
    const taxYr = parseFloat(document.getElementById('rental-tax-yr')?.value) || 0;
    const insYr = parseFloat(document.getElementById('rental-ins-yr')?.value) || 0;
    const hoa = parseFloat(document.getElementById('rental-hoa')?.value) || 0;
    const mgmtPct = parseFloat(document.getElementById('rental-mgmt')?.value) || 8;
    const maintPct = parseFloat(document.getElementById('rental-maint')?.value) || 5;
    const capexPct = parseFloat(document.getElementById('rental-capex')?.value) || 5;
    const closingPct = parseFloat(document.getElementById('rental-closing-costs')?.value) || 3;

    if (price <= 0 || grossRent <= 0) return;

    const downPayment = price * (downPct / 100);
    const loanAmount = Math.max(0, price - downPayment);
    const initialCash = downPayment + (price * (closingPct / 100));

    // Mortgage P&I
    let monthlyPI = 0;
    if (loanAmount > 0 && rate > 0) {
      const r = (rate / 100) / 12;
      const n = term * 12;
      const factor = Math.pow(1 + r, n);
      monthlyPI = (loanAmount * r * factor) / (factor - 1);
    }

    const totalMonthlyRent = grossRent + otherInc;
    const effectiveMonthlyRevenue = totalMonthlyRent * (1 - (vacancyPct / 100));

    // Operating expenses
    const moTax = taxYr / 12;
    const moIns = insYr / 12;
    const moMgmt = grossRent * (mgmtPct / 100);
    const moMaint = grossRent * (maintPct / 100);
    const moCapEx = grossRent * (capexPct / 100);
    const totalMonthlyOpEx = moTax + moIns + hoa + moMgmt + moMaint + moCapEx;

    const monthlyNOI = effectiveMonthlyRevenue - totalMonthlyOpEx;
    const annualNOI = monthlyNOI * 12;
    const monthlyCashFlow = monthlyNOI - monthlyPI;
    const annualCashFlow = monthlyCashFlow * 12;

    const capRate = price > 0 ? (annualNOI / price) * 100 : 0;
    const cocReturn = initialCash > 0 ? (annualCashFlow / initialCash) * 100 : 0;
    const oer = effectiveMonthlyRevenue > 0 ? (totalMonthlyOpEx / effectiveMonthlyRevenue) * 100 : 0;

    const elMoCF = document.getElementById('res-rental-monthly-cf');
    const elCap = document.getElementById('res-rental-cap-rate');
    const elCoC = document.getElementById('res-rental-coc');
    const elNOI = document.getElementById('res-rental-noi');
    const elCash = document.getElementById('res-rental-total-cash');
    const elOER = document.getElementById('res-rental-oer');
    const elPI = document.getElementById('res-rental-mortgage-pi');

    if (elMoCF) {
      elMoCF.textContent = this.formatCurrency(monthlyCashFlow);
      elMoCF.style.color = monthlyCashFlow >= 0 ? 'var(--accent-green)' : 'var(--accent-rose)';
    }
    if (elCap) elCap.textContent = `${capRate.toFixed(2)}%`;
    if (elCoC) elCoC.textContent = `${cocReturn.toFixed(2)}%`;
    if (elNOI) elNOI.textContent = this.formatCurrency(annualNOI);
    if (elCash) elCash.textContent = this.formatCurrency(initialCash);
    if (elOER) elOER.textContent = `${oer.toFixed(1)}% OER`;
    if (elPI) elPI.textContent = this.formatCurrency(monthlyPI);
  },

  // ------------------------------------------------------------------------
  // 26. RMD CALCULATOR (IRS SECURE 2.0 Uniform Lifetime Table)
  // ------------------------------------------------------------------------
  calcRMD() {
    const balance = parseFloat(document.getElementById('rmd-balance')?.value) || 0;
    const age = parseInt(document.getElementById('rmd-age')?.value) || 73;
    const taxRate = parseFloat(document.getElementById('rmd-tax-rate')?.value) || 22;

    if (balance <= 0) return;

    // IRS Uniform Lifetime Table (SECURE 2.0)
    const uniformTable = {
      72: 27.4, 73: 26.5, 74: 25.5, 75: 24.6, 76: 23.7, 77: 22.9, 78: 22.0, 79: 21.1,
      80: 20.2, 81: 19.4, 82: 18.5, 83: 17.7, 84: 16.8, 85: 16.0, 86: 15.2, 87: 14.4,
      88: 13.7, 89: 12.9, 90: 12.2, 91: 11.5, 92: 10.8, 93: 10.1, 94: 9.5, 95: 8.9,
      96: 8.4, 97: 7.8, 98: 7.3, 99: 6.8, 100: 6.4, 101: 6.0, 102: 5.6, 103: 5.2,
      104: 4.9, 105: 4.6, 106: 4.3, 107: 4.1, 108: 3.9, 109: 3.7, 110: 3.5, 111: 3.4,
      112: 3.3, 113: 3.1, 114: 3.0, 115: 2.9, 116: 2.8, 117: 2.7, 118: 2.5, 119: 2.3, 120: 2.0
    };

    let factor = uniformTable[age];
    if (!factor) {
      if (age < 72) factor = 27.4 + (72 - age) * 0.9;
      else factor = 2.0;
    }

    const isMandatory = age >= 73;
    const annualRMD = balance / factor;
    const monthlyRMD = annualRMD / 12;
    const taxLiability = annualRMD * (taxRate / 100);
    const afterTaxRMD = annualRMD - taxLiability;

    const elAnnual = document.getElementById('res-rmd-annual');
    const elMonthly = document.getElementById('res-rmd-monthly');
    const elFactor = document.getElementById('res-rmd-factor');
    const elTax = document.getElementById('res-rmd-tax');
    const elAfterTax = document.getElementById('res-rmd-after-tax');
    const elNotice = document.getElementById('res-rmd-notice');

    if (elAnnual) elAnnual.textContent = this.formatCurrency(annualRMD);
    if (elMonthly) elMonthly.textContent = this.formatCurrency(monthlyRMD);
    if (elFactor) elFactor.textContent = `${factor.toFixed(1)} Divisor`;
    if (elTax) elTax.textContent = this.formatCurrency(taxLiability);
    if (elAfterTax) elAfterTax.textContent = this.formatCurrency(afterTaxRMD);
    if (elNotice) {
      if (isMandatory) {
        elNotice.innerHTML = `Mandatory RMD active for age ${age} (SECURE 2.0 requirement)`;
        elNotice.style.color = 'var(--accent-green)';
      } else {
        elNotice.innerHTML = `Under age 73: RMD is not yet mandatory. Earliest required age is 73.`;
        elNotice.style.color = 'var(--accent-amber, #f59e0b)';
      }
    }
  },

  // ------------------------------------------------------------------------
  // 27. APR CALCULATOR (True Annual Percentage Rate Solver)
  // ------------------------------------------------------------------------
  calcAPR() {
    const loanAmt = parseFloat(document.getElementById('apr-loan-amt')?.value) || 0;
    const nominalRate = parseFloat(document.getElementById('apr-rate')?.value) || 0;
    const termYears = parseFloat(document.getElementById('apr-term')?.value) || 30;
    const pointsPct = parseFloat(document.getElementById('apr-points')?.value) || 0;
    const origFee = parseFloat(document.getElementById('apr-origination')?.value) || 0;
    const otherFees = parseFloat(document.getElementById('apr-other-fees')?.value) || 0;

    if (loanAmt <= 0 || nominalRate <= 0 || termYears <= 0) return;

    const pointsCost = loanAmt * (pointsPct / 100);
    const totalFees = pointsCost + origFee + otherFees;
    const netProceeds = loanAmt - totalFees;

    const n = termYears * 12;
    const rNom = (nominalRate / 100) / 12;
    const factorNom = Math.pow(1 + rNom, n);
    const monthlyPMT = (loanAmt * rNom * factorNom) / (factorNom - 1);

    // Solve for APR using binary search for effective periodic rate
    let low = 0;
    let high = 0.5;
    let rEff = rNom;

    for (let iter = 0; iter < 40; iter++) {
      rEff = (low + high) / 2;
      const factorEff = Math.pow(1 + rEff, n);
      const pv = monthlyPMT * ((factorEff - 1) / (rEff * factorEff));
      if (pv > netProceeds) {
        low = rEff;
      } else {
        high = rEff;
      }
    }

    const apr = rEff * 12 * 100;
    const spread = apr - nominalRate;
    const totalFinanceCharges = (monthlyPMT * n) - netProceeds;

    const elAPR = document.getElementById('res-apr-rate');
    const elNom = document.getElementById('res-apr-nominal');
    const elSpread = document.getElementById('res-apr-spread');
    const elPMT = document.getElementById('res-apr-monthly-pmt');
    const elCharges = document.getElementById('res-apr-finance-charges');

    if (elAPR) elAPR.textContent = `${apr.toFixed(3)}% APR`;
    if (elNom) elNom.textContent = `${nominalRate.toFixed(3)}%`;
    if (elSpread) elSpread.textContent = `+${spread.toFixed(3)}% Rate Spread`;
    if (elPMT) elPMT.textContent = this.formatCurrency(monthlyPMT);
    if (elCharges) elCharges.textContent = this.formatCurrency(totalFinanceCharges);
  },

  // ------------------------------------------------------------------------
  // 28. FHA LOAN CALCULATOR (Upfront & Monthly MIP Breakdown)
  // ------------------------------------------------------------------------
  calcFHALoan() {
    const price = parseFloat(document.getElementById('fha-price')?.value) || 0;
    const downPct = parseFloat(document.getElementById('fha-down-pct')?.value) || 3.5;
    const rate = parseFloat(document.getElementById('fha-rate')?.value) || 6.25;
    const termYears = parseFloat(document.getElementById('fha-term')?.value) || 30;
    const taxYr = parseFloat(document.getElementById('fha-tax-yr')?.value) || 0;
    const insYr = parseFloat(document.getElementById('fha-ins-yr')?.value) || 0;
    const hoa = parseFloat(document.getElementById('fha-hoa')?.value) || 0;

    if (price <= 0 || rate <= 0 || termYears <= 0) return;

    const downPayment = price * (downPct / 100);
    const baseLoan = Math.max(0, price - downPayment);
    // FHA Upfront Mortgage Insurance Premium (UFMIP = 1.75%)
    const ufmip = baseLoan * 0.0175;
    const totalLoan = baseLoan + ufmip;

    const r = (rate / 100) / 12;
    const n = termYears * 12;
    const factor = Math.pow(1 + r, n);
    const monthlyPI = (totalLoan * r * factor) / (factor - 1);

    // Annual FHA MIP rate: typically 0.55% for down payment < 5% on 30yr
    const annualMIPRate = downPct >= 5 ? 0.0050 : 0.0055;
    const monthlyMIP = (baseLoan * annualMIPRate) / 12;
    const monthlyTax = taxYr / 12;
    const monthlyIns = insYr / 12;
    const totalMonthly = monthlyPI + monthlyMIP + monthlyTax + monthlyIns + hoa;

    const elTotal = document.getElementById('res-fha-total-monthly');
    const elPI = document.getElementById('res-fha-pi');
    const elMIP = document.getElementById('res-fha-mip-monthly');
    const elUFMIP = document.getElementById('res-fha-ufmip');
    const elTotalLoan = document.getElementById('res-fha-total-loan');
    const elDown = document.getElementById('res-fha-min-down');

    if (elTotal) elTotal.textContent = this.formatCurrency(totalMonthly);
    if (elPI) elPI.textContent = this.formatCurrency(monthlyPI);
    if (elMIP) elMIP.textContent = this.formatCurrency(monthlyMIP);
    if (elUFMIP) elUFMIP.textContent = this.formatCurrency(ufmip);
    if (elTotalLoan) elTotalLoan.textContent = this.formatCurrency(totalLoan);
    if (elDown) elDown.textContent = this.formatCurrency(downPayment);
  },

  // ------------------------------------------------------------------------
  // 29. VA MORTGAGE CALCULATOR (0% Down, $0 PMI & Tiered Funding Fee)
  // ------------------------------------------------------------------------
  calcVAMortgage() {
    const price = parseFloat(document.getElementById('va-price')?.value) || 0;
    const downPct = parseFloat(document.getElementById('va-down-pct')?.value) || 0;
    const rate = parseFloat(document.getElementById('va-rate')?.value) || 6.125;
    const termYears = parseFloat(document.getElementById('va-term')?.value) || 30;
    const usage = document.getElementById('va-usage')?.value || 'first';
    const isExempt = document.getElementById('va-disability')?.value === 'yes';
    const taxYr = parseFloat(document.getElementById('va-tax-yr')?.value) || 0;
    const insYr = parseFloat(document.getElementById('va-ins-yr')?.value) || 0;

    if (price <= 0 || rate <= 0 || termYears <= 0) return;

    const downPayment = price * (downPct / 100);
    const baseLoan = Math.max(0, price - downPayment);

    // VA Funding Fee Tier
    let feePct = 0;
    if (!isExempt) {
      if (usage === 'first') {
        if (downPct < 5) feePct = 2.15;
        else if (downPct < 10) feePct = 1.50;
        else feePct = 1.25;
      } else {
        if (downPct < 5) feePct = 3.30;
        else if (downPct < 10) feePct = 1.50;
        else feePct = 1.25;
      }
    }

    const fundingFee = baseLoan * (feePct / 100);
    const totalLoan = baseLoan + fundingFee;

    const r = (rate / 100) / 12;
    const n = termYears * 12;
    const factor = Math.pow(1 + r, n);
    const monthlyPI = (totalLoan * r * factor) / (factor - 1);
    const monthlyTax = taxYr / 12;
    const monthlyIns = insYr / 12;
    const totalMonthly = monthlyPI + monthlyTax + monthlyIns;

    // Conventional comparison PMI savings (~0.75% / yr for 8 years until 20% equity)
    const pmiSavings = baseLoan * 0.0075 * 8;

    const elTotal = document.getElementById('res-va-monthly');
    const elPI = document.getElementById('res-va-pi');
    const elFee = document.getElementById('res-va-funding-fee');
    const elPMISavings = document.getElementById('res-va-pmi-savings');
    const elLoan = document.getElementById('res-va-total-loan');

    if (elTotal) elTotal.textContent = this.formatCurrency(totalMonthly);
    if (elPI) elPI.textContent = this.formatCurrency(monthlyPI);
    if (elFee) elFee.textContent = isExempt ? '$0 (Exempt)' : `${this.formatCurrency(fundingFee)} (${feePct.toFixed(2)}%)`;
    if (elPMISavings) elPMISavings.textContent = `${this.formatCurrency(pmiSavings)} ($0 Monthly PMI!)`;
    if (elLoan) elLoan.textContent = this.formatCurrency(totalLoan);
  },

  // ------------------------------------------------------------------------
  // 30. HOME EQUITY LOAN CALCULATOR (Second Mortgage & CLTV)
  // ------------------------------------------------------------------------
  calcHomeEquityLoan() {
    const homeValue = parseFloat(document.getElementById('he-home-value')?.value) || 0;
    const firstMortgage = parseFloat(document.getElementById('he-first-balance')?.value) || 0;
    const loanAmt = parseFloat(document.getElementById('he-loan-amount')?.value) || 0;
    const rate = parseFloat(document.getElementById('he-rate')?.value) || 7.75;
    const termYears = parseFloat(document.getElementById('he-term')?.value) || 15;
    const maxCLTV = parseFloat(document.getElementById('he-max-cltv')?.value) || 85;

    if (homeValue <= 0 || loanAmt <= 0 || rate <= 0 || termYears <= 0) return;

    const maxBorrowLimit = Math.max(0, (homeValue * (maxCLTV / 100)) - firstMortgage);
    const totalDebt = firstMortgage + loanAmt;
    const cltv = (totalDebt / homeValue) * 100;
    const remainingEquity = Math.max(0, homeValue - totalDebt);

    const r = (rate / 100) / 12;
    const n = termYears * 12;
    const factor = Math.pow(1 + r, n);
    const monthlyPayment = (loanAmt * r * factor) / (factor - 1);
    const totalInterest = (monthlyPayment * n) - loanAmt;

    const elPmt = document.getElementById('res-he-monthly');
    const elCLTV = document.getElementById('res-he-cltv');
    const elMaxBorrow = document.getElementById('res-he-max-borrow');
    const elInt = document.getElementById('res-he-total-interest');
    const elEquity = document.getElementById('res-he-equity-remaining');

    if (elPmt) elPmt.textContent = this.formatCurrency(monthlyPayment);
    if (elCLTV) {
      elCLTV.textContent = `${cltv.toFixed(1)}% CLTV`;
      elCLTV.style.color = cltv <= maxCLTV ? 'var(--accent-green)' : 'var(--accent-rose)';
    }
    if (elMaxBorrow) elMaxBorrow.textContent = this.formatCurrency(maxBorrowLimit);
    if (elInt) elInt.textContent = this.formatCurrency(totalInterest);
    if (elEquity) elEquity.textContent = this.formatCurrency(remainingEquity);
  },

  // ------------------------------------------------------------------------
  // 31. HELOC CALCULATOR (Draw Period vs Repayment Phase Shock)
  // ------------------------------------------------------------------------
  calcHELOC() {
    const homeValue = parseFloat(document.getElementById('heloc-home-value')?.value) || 0;
    const firstMortgage = parseFloat(document.getElementById('heloc-mortgage')?.value) || 0;
    const maxCLTV = parseFloat(document.getElementById('heloc-max-cltv')?.value) || 85;
    const drawnAmt = parseFloat(document.getElementById('heloc-draw-amount')?.value) || 0;
    const rate = parseFloat(document.getElementById('heloc-rate')?.value) || 8.5;
    const drawYears = parseFloat(document.getElementById('heloc-draw-years')?.value) || 10;
    const repayYears = parseFloat(document.getElementById('heloc-repay-years')?.value) || 20;

    if (homeValue <= 0 || drawnAmt <= 0 || rate <= 0) return;

    const maxLineAvailable = Math.max(0, (homeValue * (maxCLTV / 100)) - firstMortgage);

    // Interest-Only Draw Phase
    const monthlyDrawPayment = (drawnAmt * (rate / 100)) / 12;
    const totalDrawInterest = monthlyDrawPayment * (drawYears * 12);

    // Amortized Repayment Phase (Principal + Interest)
    const r = (rate / 100) / 12;
    const n = repayYears * 12;
    const factor = Math.pow(1 + r, n);
    const monthlyRepayPayment = (drawnAmt * r * factor) / (factor - 1);
    const totalRepayInterest = (monthlyRepayPayment * n) - drawnAmt;

    const paymentShock = monthlyRepayPayment - monthlyDrawPayment;
    const totalInterest = totalDrawInterest + totalRepayInterest;

    const elDraw = document.getElementById('res-heloc-draw-payment');
    const elRepay = document.getElementById('res-heloc-repay-payment');
    const elShock = document.getElementById('res-heloc-shock');
    const elMaxLine = document.getElementById('res-heloc-max-line');
    const elInt = document.getElementById('res-heloc-total-interest');

    if (elDraw) elDraw.textContent = this.formatCurrency(monthlyDrawPayment);
    if (elRepay) elRepay.textContent = this.formatCurrency(monthlyRepayPayment);
    if (elShock) elShock.textContent = `+${this.formatCurrency(paymentShock)} Jump / mo`;
    if (elMaxLine) elMaxLine.textContent = this.formatCurrency(maxLineAvailable);
    if (elInt) elInt.textContent = this.formatCurrency(totalInterest);
  },

  // ------------------------------------------------------------------------
  // 32. DOWN PAYMENT CALCULATOR (Savings Timeline & HYSA Growth)
  // ------------------------------------------------------------------------
  calcDownPayment() {
    const targetPrice = parseFloat(document.getElementById('down-target-price')?.value) || 0;
    const targetPct = parseFloat(document.getElementById('down-target-pct')?.value) || 20;
    const closingPct = parseFloat(document.getElementById('down-closing-pct')?.value) || 3.0;
    const curSaved = parseFloat(document.getElementById('down-cur-saved')?.value) || 0;
    const monthlySave = parseFloat(document.getElementById('down-monthly-save')?.value) || 0;
    const hysaRate = parseFloat(document.getElementById('down-hysa-rate')?.value) || 4.5;

    if (targetPrice <= 0) return;

    const downPaymentGoal = targetPrice * (targetPct / 100);
    const closingCostsGoal = targetPrice * (closingPct / 100);
    const totalCashNeeded = downPaymentGoal + closingCostsGoal;
    const deficit = Math.max(0, totalCashNeeded - curSaved);

    let months = 0;
    let balance = curSaved;
    let totalDeposited = curSaved;
    const rMo = (hysaRate / 100) / 12;

    if (balance < totalCashNeeded && monthlySave > 0) {
      while (balance < totalCashNeeded && months < 360) {
        months++;
        balance = (balance + monthlySave) * (1 + rMo);
        totalDeposited += monthlySave;
      }
    }

    const interestEarned = Math.max(0, balance - totalDeposited);
    const yrs = Math.floor(months / 12);
    const remMo = months % 12;

    const elTotal = document.getElementById('res-down-total-cash');
    const elDown = document.getElementById('res-down-target-amt');
    const elClosing = document.getElementById('res-down-closing-amt');
    const elTimeline = document.getElementById('res-down-timeline');
    const elEarned = document.getElementById('res-down-interest-earned');

    if (elTotal) elTotal.textContent = this.formatCurrency(totalCashNeeded);
    if (elDown) elDown.textContent = this.formatCurrency(downPaymentGoal);
    if (elClosing) elClosing.textContent = this.formatCurrency(closingCostsGoal);
    if (elTimeline) {
      if (curSaved >= totalCashNeeded) {
        elTimeline.textContent = 'Goal Achieved! Ready to buy.';
      } else if (monthlySave <= 0) {
        elTimeline.textContent = 'Need monthly savings';
      } else {
        elTimeline.textContent = `${yrs > 0 ? yrs + ' Yrs ' : ''}${remMo} Months`;
      }
    }
    if (elEarned) elEarned.textContent = this.formatCurrency(interestEarned);
  },

  // ------------------------------------------------------------------------
  // 33. RENT VS. BUY CALCULATOR (Wealth Comparison & Break-Even Year)
  // ------------------------------------------------------------------------
  calcRentVsBuy() {
    const homePrice = parseFloat(document.getElementById('rvb-home-price')?.value) || 0;
    const downPct = parseFloat(document.getElementById('rvb-down-pct')?.value) || 20;
    const rate = parseFloat(document.getElementById('rvb-mort-rate')?.value) || 6.75;
    const termYears = parseFloat(document.getElementById('rvb-mort-term')?.value) || 30;
    const homeGrowth = parseFloat(document.getElementById('rvb-home-growth')?.value) || 4.0;
    const taxRate = parseFloat(document.getElementById('rvb-tax-rate')?.value) || 1.25;
    const maintIns = parseFloat(document.getElementById('rvb-maint-ins')?.value) || 1.5;
    const curRent = parseFloat(document.getElementById('rvb-cur-rent')?.value) || 0;
    const rentGrowth = parseFloat(document.getElementById('rvb-rent-growth')?.value) || 3.5;
    const investRate = parseFloat(document.getElementById('rvb-invest-rate')?.value) || 7.5;
    const yearsStay = parseInt(document.getElementById('rvb-years-stay')?.value) || 7;

    if (homePrice <= 0 || curRent <= 0 || rate <= 0) return;

    const downPayment = homePrice * (downPct / 100);
    const loanAmt = homePrice - downPayment;
    const buyClosingCosts = homePrice * 0.03; // ~3% buying fees
    const initialCash = downPayment + buyClosingCosts;

    const r = (rate / 100) / 12;
    const n = termYears * 12;
    const factor = Math.pow(1 + r, n);
    const monthlyPI = (loanAmt * r * factor) / (factor - 1);

    const rInvestMo = (investRate / 100) / 12;
    let rentPortfolio = initialCash;
    let homeValue = homePrice;
    let mortgageBalance = loanAmt;
    let breakEvenYear = null;

    let cumulativeBuyCost = initialCash;
    let cumulativeRentCost = 0;
    let monthlyRentNow = curRent;

    for (let y = 1; y <= 30; y++) {
      let annualBuyCash = 0;
      let annualRentCash = 0;

      for (let m = 1; m <= 12; m++) {
        // Mortgage month
        const intMo = mortgageBalance * r;
        const prinMo = monthlyPI - intMo;
        mortgageBalance = Math.max(0, mortgageBalance - prinMo);

        // Taxes + insurance/maintenance
        const propCostMo = (homeValue * ((taxRate + maintIns) / 100)) / 12;
        const totalBuyMo = monthlyPI + propCostMo;
        annualBuyCash += totalBuyMo;

        // Rent month
        const totalRentMo = monthlyRentNow + 30; // $30 renters insurance
        annualRentCash += totalRentMo;

        // Opportunity cost: difference invested or withdrawn
        const cashDiff = totalBuyMo - totalRentMo;
        rentPortfolio = (rentPortfolio * (1 + rInvestMo)) + cashDiff;
      }

      cumulativeBuyCost += annualBuyCash;
      cumulativeRentCost += annualRentCash;

      // Appreciation
      homeValue *= (1 + (homeGrowth / 100));
      monthlyRentNow *= (1 + (rentGrowth / 100));

      // Net Wealth Comparison at year y
      const netHomeEquity = (homeValue * 0.94) - mortgageBalance; // 6% selling costs

      if (netHomeEquity > rentPortfolio && breakEvenYear === null) {
        breakEvenYear = y;
      }

      if (y === yearsStay) {
        const diff = Math.abs(netHomeEquity - rentPortfolio);

        const elVerdict = document.getElementById('res-rvb-verdict');
        const elBreakEven = document.getElementById('res-rvb-breakeven');
        const elEquity = document.getElementById('res-rvb-buy-equity');
        const elPort = document.getElementById('res-rvb-rent-portfolio');
        const elBuyCost = document.getElementById('res-rvb-buy-net-cost');
        const elRentCost = document.getElementById('res-rvb-rent-net-cost');

        if (elVerdict) {
          if (netHomeEquity >= rentPortfolio) {
            elVerdict.textContent = `🏡 Buying is Cheaper by ${this.formatCurrency(diff)} over ${yearsStay} Years`;
            elVerdict.style.color = 'var(--accent-green)';
          } else {
            elVerdict.textContent = `🏢 Renting is Cheaper by ${this.formatCurrency(diff)} over ${yearsStay} Years`;
            elVerdict.style.color = 'var(--accent-primary, #2563eb)';
          }
        }
        if (elBreakEven) {
          elBreakEven.textContent = breakEvenYear ? `Year ${breakEvenYear}` : '30+ Years';
        }
        if (elEquity) elEquity.textContent = this.formatCurrency(netHomeEquity);
        if (elPort) elPort.textContent = this.formatCurrency(rentPortfolio);
        if (elBuyCost) elBuyCost.textContent = this.formatCurrency(cumulativeBuyCost);
        if (elRentCost) elRentCost.textContent = this.formatCurrency(cumulativeRentCost);
      }
    }
  },

  // ------------------------------------------------------------------------
  // 4. COMPOUND INTEREST CALCULATOR
  // ------------------------------------------------------------------------
  calcCompoundInterest() {
    const principal = parseFloat(document.getElementById('ci-principal')?.value) || 0;
    const monthlyDeposit = parseFloat(document.getElementById('ci-monthly')?.value) || 0;
    const rate = parseFloat(document.getElementById('ci-rate')?.value) || 0;
    const years = parseFloat(document.getElementById('ci-years')?.value) || 0;
    const freq = parseInt(document.getElementById('ci-freq')?.value) || 12;

    if (principal < 0 || rate < 0 || years <= 0) return;

    const r = rate / 100;
    const n = freq;
    const t = years;

    const principalFuture = principal * Math.pow(1 + r / n, n * t);

    let depositsFuture = 0;
    let totalDeposited = principal;

    if (monthlyDeposit > 0) {
      const totalMonths = t * 12;
      const effectiveMonthlyRate = Math.pow(1 + r / n, n / 12) - 1;
      if (effectiveMonthlyRate > 0) {
        depositsFuture = monthlyDeposit * ((Math.pow(1 + effectiveMonthlyRate, totalMonths) - 1) / effectiveMonthlyRate);
      } else {
        depositsFuture = monthlyDeposit * totalMonths;
      }
      totalDeposited += monthlyDeposit * totalMonths;
    }

    const totalFutureValue = principalFuture + depositsFuture;
    const totalInterestEarned = totalFutureValue - totalDeposited;

    const resFutureEl = document.getElementById('res-ci-future');
    const resInvestedEl = document.getElementById('res-ci-invested');
    const resInterestEl = document.getElementById('res-ci-interest');

    if (resFutureEl) resFutureEl.textContent = this.formatCurrency(totalFutureValue);
    if (resInvestedEl) resInvestedEl.textContent = this.formatCurrency(totalDeposited);
    if (resInterestEl) resInterestEl.textContent = this.formatCurrency(totalInterestEarned);
  },

  // ------------------------------------------------------------------------
  // 5. SIP (SYSTEMATIC INVESTMENT PLAN)
  // ------------------------------------------------------------------------
  calcSIP() {
    const monthlyAmt = parseFloat(document.getElementById('sip-amount')?.value) || 0;
    const annualRate = parseFloat(document.getElementById('sip-rate')?.value) || 0;
    const years = parseFloat(document.getElementById('sip-years')?.value) || 0;

    if (monthlyAmt <= 0 || annualRate <= 0 || years <= 0) return;

    const i = (annualRate / 12) / 100;
    const n = years * 12;

    const maturityValue = monthlyAmt * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    const investedAmount = monthlyAmt * n;
    const estReturns = maturityValue - investedAmount;

    const investedPct = Math.round((investedAmount / maturityValue) * 100);
    const returnPct = 100 - investedPct;

    const resMaturity = document.getElementById('res-sip-maturity');
    const resInvested = document.getElementById('res-sip-invested');
    const resReturns = document.getElementById('res-sip-returns');
    const barInvested = document.getElementById('sip-bar-invested');
    const barReturns = document.getElementById('sip-bar-returns');

    if (resMaturity) resMaturity.textContent = this.formatCurrency(maturityValue);
    if (resInvested) resInvested.textContent = this.formatCurrency(investedAmount);
    if (resReturns) resReturns.textContent = this.formatCurrency(estReturns);

    if (barInvested) barInvested.style.width = `${investedPct}%`;
    if (barReturns) barReturns.style.width = `${returnPct}%`;
  },

  // ------------------------------------------------------------------------
  // 6. DISCOUNT & SALES TAX (With US State Tax Presets)
  // ------------------------------------------------------------------------
  calcDiscountTax() {
    const origPrice = parseFloat(document.getElementById('disc-price')?.value) || 0;
    const discountPct = parseFloat(document.getElementById('disc-percent')?.value) || 0;
    const couponPct = parseFloat(document.getElementById('disc-coupon')?.value) || 0;
    const taxPct = parseFloat(document.getElementById('disc-tax')?.value) || 0;

    if (origPrice <= 0) return;

    const priceAfterDisc = origPrice * (1 - discountPct / 100);
    const priceAfterCoupon = priceAfterDisc * (1 - couponPct / 100);
    const taxAmount = priceAfterCoupon * (taxPct / 100);
    const finalPrice = priceAfterCoupon + taxAmount;
    const totalSavings = origPrice - priceAfterCoupon;

    const resFinal = document.getElementById('res-disc-final');
    const resSavings = document.getElementById('res-disc-savings');
    const resTax = document.getElementById('res-disc-tax');

    if (resFinal) resFinal.textContent = this.formatCurrency(finalPrice);
    if (resSavings) resSavings.textContent = this.formatCurrency(totalSavings);
    if (resTax) resTax.textContent = this.formatCurrency(taxAmount);
  },

  setUSTaxState(rate) {
    const taxInput = document.getElementById('disc-tax');
    if (taxInput) {
      taxInput.value = rate;
      this.calcDiscountTax();
    }
  },

  // ------------------------------------------------------------------------
  // 7. TIP & BILL SPLITTER (US Standards: 15%, 18%, 20%, 25%)
  // ------------------------------------------------------------------------
  calcTipSplit() {
    const bill = parseFloat(document.getElementById('tip-bill')?.value) || 0;
    const tipPercent = parseFloat(document.getElementById('tip-percent')?.value) || 0;
    const people = parseInt(document.getElementById('tip-people')?.value) || 1;

    if (bill <= 0 || people < 1) return;

    const totalTip = bill * (tipPercent / 100);
    const totalBill = bill + totalTip;
    const tipPerPerson = totalTip / people;
    const totalPerPerson = totalBill / people;

    const resTotal = document.getElementById('res-tip-total-person');
    const resTipPerson = document.getElementById('res-tip-per-person');
    const resTotalBill = document.getElementById('res-tip-grand-total');

    if (resTotal) resTotal.textContent = this.formatCurrency(totalPerPerson);
    if (resTipPerson) resTipPerson.textContent = this.formatCurrency(tipPerPerson);
    if (resTotalBill) resTotalBill.textContent = this.formatCurrency(totalBill);
  },

  // ------------------------------------------------------------------------
  // 8. ROI (RETURN ON INVESTMENT) & PROFIT MARGIN
  // ------------------------------------------------------------------------
  calcROI() {
    const invested = parseFloat(document.getElementById('roi-invested')?.value) || 0;
    const returned = parseFloat(document.getElementById('roi-returned')?.value) || 0;

    if (invested <= 0) return;

    const netProfit = returned - invested;
    const roiPct = (netProfit / invested) * 100;
    const marginPct = returned > 0 ? (netProfit / returned) * 100 : 0;

    const resProfit = document.getElementById('res-roi-net-profit');
    const resRoi = document.getElementById('res-roi-pct');
    const resMargin = document.getElementById('res-roi-margin');

    if (resProfit) {
      resProfit.textContent = this.formatCurrency(netProfit);
      resProfit.style.color = netProfit >= 0 ? 'var(--accent-green)' : 'var(--accent-rose)';
    }
    if (resRoi) {
      resRoi.textContent = `${roiPct.toFixed(2)}%`;
      resRoi.style.color = roiPct >= 0 ? 'var(--accent-green)' : 'var(--accent-rose)';
    }
    if (resMargin) resMargin.textContent = `${marginPct.toFixed(2)}%`;
  },

  // ------------------------------------------------------------------------
  // 9. AUTO LOAN CALCULATOR (Enhanced Institutional Version)
  // ------------------------------------------------------------------------
  calcAutoLoan() {
    const el = id => document.getElementById(id);
    const price = parseFloat(el('auto-price')?.value) || 0;
    const down = parseFloat(el('auto-down')?.value) || 0;
    const tradein = parseFloat(el('auto-tradein')?.value) || 0;
    const tradeinOwed = parseFloat(el('auto-tradein-owed')?.value) || 0;
    const taxMode = el('auto-tax-mode')?.value || 'finance';
    const taxRate = parseFloat(el('auto-tax')?.value) || 0;
    const rate = parseFloat(el('auto-rate')?.value) || 0;
    const termMonths = parseFloat(el('auto-term')?.value) || 60;
    const fees = parseFloat(el('auto-fees')?.value) || 0;

    // Net trade-in equity (can be negative if underwater on existing vehicle loan)
    const netTradein = tradein - tradeinOwed;

    // In most states, sales tax is assessed on vehicle price minus trade-in value credit
    const taxablePrice = Math.max(0, price - Math.max(0, tradein));
    const salesTax = taxablePrice * (taxRate / 100);

    // Financed Amount
    let totalLoan = 0;
    if (taxMode === 'finance') {
      totalLoan = Math.max(0, price - netTradein - down + salesTax + fees);
    } else {
      totalLoan = Math.max(0, price - netTradein - down);
    }

    let monthly = 0;
    let totalInt = 0;
    if (totalLoan > 0 && termMonths > 0) {
      if (rate > 0) {
        const i = (rate / 100) / 12;
        const factor = Math.pow(1 + i, termMonths);
        monthly = (totalLoan * i * factor) / (factor - 1);
        totalInt = (monthly * termMonths) - totalLoan;
      } else {
        monthly = totalLoan / termMonths;
        totalInt = 0;
      }
    }

    // Bi-weekly payment equivalent (accelerated 26 payments/year)
    const biweekly = (monthly * 12) / 26;

    // Total out of pocket
    let totalCost = 0;
    if (taxMode === 'finance') {
      totalCost = down + Math.max(0, netTradein) + (monthly * termMonths);
    } else {
      totalCost = down + Math.max(0, netTradein) + salesTax + fees + (monthly * termMonths);
    }

    // Update hero and stat boxes
    if (el('res-auto-monthly')) el('res-auto-monthly').textContent = this.formatCurrency(monthly);
    if (el('res-auto-biweekly')) el('res-auto-biweekly').textContent = this.formatCurrency(biweekly);
    if (el('res-auto-loan')) el('res-auto-loan').textContent = this.formatCurrency(totalLoan);
    if (el('res-auto-interest')) el('res-auto-interest').textContent = this.formatCurrency(totalInt);
    if (el('res-auto-tax')) el('res-auto-tax').textContent = this.formatCurrency(salesTax);
    if (el('res-auto-net-tradein')) {
      el('res-auto-net-tradein').textContent = (netTradein < 0 ? '-' : '') + this.formatCurrency(Math.abs(netTradein));
      el('res-auto-net-tradein').style.color = netTradein >= 0 ? 'var(--accent-green)' : 'var(--accent-rose)';
    }
    if (el('res-auto-cost')) el('res-auto-cost').textContent = this.formatCurrency(totalCost);

    // Visual multi-segment ratio bar
    const sumComponents = totalLoan + totalInt + (taxMode === 'upfront' ? (salesTax + fees) : 0);
    if (sumComponents > 0) {
      const pPct = Math.max(5, (totalLoan / sumComponents) * 100);
      const iPct = Math.max(2, (totalInt / sumComponents) * 100);
      const tPct = Math.max(2, 100 - pPct - iPct);
      if (el('auto-bar-principal')) el('auto-bar-principal').style.width = `${pPct.toFixed(1)}%`;
      if (el('auto-bar-interest')) el('auto-bar-interest').style.width = `${iPct.toFixed(1)}%`;
      if (el('auto-bar-tax')) el('auto-bar-tax').style.width = `${tPct.toFixed(1)}%`;
    }

    // Breakdown Table
    if (el('auto-loan-breakdown-body')) {
      el('auto-loan-breakdown-body').innerHTML = `
        <tr>
          <td><strong>Vehicle Purchase Price</strong></td>
          <td>Agreed sticker/negotiated vehicle price</td>
          <td style="text-align:right; font-weight:700;">${this.formatCurrency(price)}</td>
        </tr>
        <tr>
          <td><strong>Trade-in Allowance</strong></td>
          <td>Gross credit: ${this.formatCurrency(tradein)} (Owed: -${this.formatCurrency(tradeinOwed)})</td>
          <td style="text-align:right; color:${netTradein >= 0 ? 'var(--accent-green)' : 'var(--accent-rose)'}; font-weight:700;">${netTradein >= 0 ? '-' : '+'}${this.formatCurrency(Math.abs(netTradein))}</td>
        </tr>
        <tr>
          <td><strong>Cash Down Payment</strong></td>
          <td>Direct upfront buyer equity</td>
          <td style="text-align:right; color:var(--accent-green); font-weight:700;">-${this.formatCurrency(down)}</td>
        </tr>
        <tr>
          <td><strong>Estimated Sales Tax</strong></td>
          <td>${taxRate.toFixed(2)}% on taxable ${this.formatCurrency(taxablePrice)} (${taxMode === 'finance' ? 'Financed' : 'Paid Upfront'})</td>
          <td style="text-align:right; color:var(--text-secondary);">${this.formatCurrency(salesTax)}</td>
        </tr>
        <tr>
          <td><strong>Dealer Documentation & Registration</strong></td>
          <td>Title, registration & paperwork fees</td>
          <td style="text-align:right; color:var(--text-secondary);">${this.formatCurrency(fees)}</td>
        </tr>
        <tr style="background:rgba(37,99,235,0.06); font-weight:800;">
          <td><strong style="color:var(--accent-primary);">TOTAL PRINCIPAL FINANCED</strong></td>
          <td>Base amount borrowed on promissory note</td>
          <td style="text-align:right; color:var(--accent-primary); font-size:1.05rem;">${this.formatCurrency(totalLoan)}</td>
        </tr>
        <tr>
          <td><strong>Total Finance Charge (Interest)</strong></td>
          <td>${rate.toFixed(2)}% APR compounded monthly over ${termMonths} months</td>
          <td style="text-align:right; color:#f59e0b; font-weight:700;">+${this.formatCurrency(totalInt)}</td>
        </tr>
        <tr style="border-top:2px solid var(--card-border); font-weight:800;">
          <td><strong style="color:var(--accent-green);">TOTAL LIFETIME VEHICLE COST</strong></td>
          <td>Down + Trade-in Net + All ${termMonths} Payments + Upfront Fees</td>
          <td style="text-align:right; color:var(--accent-green); font-size:1.1rem;">${this.formatCurrency(totalCost)}</td>
        </tr>
      `;
    }
  },

  // ------------------------------------------------------------------------
  // 10. INTEREST CALCULATOR (Simple & Compound with APY)
  // ------------------------------------------------------------------------
  calcInterest() {
    const principal = parseFloat(document.getElementById('int-principal')?.value) || 0;
    const rate = parseFloat(document.getElementById('int-rate')?.value) || 0;
    const years = parseFloat(document.getElementById('int-time')?.value) || 1;
    const mode = document.getElementById('int-mode')?.value || 'compound';
    const freq = parseFloat(document.getElementById('int-freq')?.value) || 12;

    let endBalance = principal;
    let totalInterest = 0;
    let apy = rate;

    if (principal > 0 && rate >= 0 && years > 0) {
      if (mode === 'simple') {
        totalInterest = principal * (rate / 100) * years;
        endBalance = principal + totalInterest;
        apy = rate;
      } else {
        const r = rate / 100;
        endBalance = principal * Math.pow(1 + (r / freq), freq * years);
        totalInterest = endBalance - principal;
        apy = (Math.pow(1 + (r / freq), freq) - 1) * 100;
      }
    }

    const elEnd = document.getElementById('res-int-end-bal');
    const elEarned = document.getElementById('res-int-earned');
    const elApy = document.getElementById('res-int-apy');

    if (elEnd) elEnd.textContent = this.formatCurrency(endBalance);
    if (elEarned) elEarned.textContent = this.formatCurrency(totalInterest);
    if (elApy) elApy.textContent = `${apy.toFixed(2)}% APY`;
  },

  // ------------------------------------------------------------------------
  // 11. PAYMENT CALCULATOR (Loan & Debt Payoff Terms)
  // ------------------------------------------------------------------------
  calcPayment() {
    const balance = parseFloat(document.getElementById('pay-balance')?.value) || 0;
    const rate = parseFloat(document.getElementById('pay-rate')?.value) || 0;
    const goal = document.getElementById('pay-goal')?.value || 'payment';
    const termYears = parseFloat(document.getElementById('pay-years')?.value) || 5;
    const fixedPayment = parseFloat(document.getElementById('pay-fixed-payment')?.value) || 0;

    const i = (rate / 100) / 12;
    const elMonthly = document.getElementById('res-pay-monthly');
    const elTotalInt = document.getElementById('res-pay-total-int');
    const elTotalPay = document.getElementById('res-pay-total-pay');
    const elTime = document.getElementById('res-pay-timeline');

    if (goal === 'payment') {
      const n = termYears * 12;
      let monthly = 0;
      let totalInt = 0;
      if (balance > 0 && n > 0) {
        if (i > 0) {
          const factor = Math.pow(1 + i, n);
          monthly = (balance * i * factor) / (factor - 1);
          totalInt = (monthly * n) - balance;
        } else {
          monthly = balance / n;
        }
      }
      if (elMonthly) elMonthly.textContent = this.formatCurrency(monthly);
      if (elTotalInt) elTotalInt.textContent = this.formatCurrency(totalInt);
      if (elTotalPay) elTotalPay.textContent = this.formatCurrency(balance + totalInt);
      if (elTime) elTime.textContent = `${termYears} Years (${n} Months)`;
    } else {
      if (fixedPayment <= (balance * i)) {
        if (elMonthly) elMonthly.textContent = this.formatCurrency(fixedPayment);
        if (elTotalInt) elTotalInt.textContent = 'Infinite (Payment ≤ Interest)';
        if (elTotalPay) elTotalPay.textContent = 'N/A';
        if (elTime) elTime.textContent = 'Never (Payment too low)';
        return;
      }
      const n = Math.log(fixedPayment / (fixedPayment - (balance * i))) / Math.log(1 + i);
      const months = Math.ceil(n);
      const totalInt = (fixedPayment * months) - balance;
      const yrs = Math.floor(months / 12);
      const remMo = months % 12;

      if (elMonthly) elMonthly.textContent = this.formatCurrency(fixedPayment);
      if (elTotalInt) elTotalInt.textContent = this.formatCurrency(totalInt);
      if (elTotalPay) elTotalPay.textContent = this.formatCurrency(balance + totalInt);
      if (elTime) elTime.textContent = `${yrs > 0 ? yrs + ' Yrs ' : ''}${remMo} Mo (${months} total)`;
    }
  },

  // ------------------------------------------------------------------------
  // 12. RETIREMENT CALCULATOR (Nest Egg & 4% Safe Withdrawal)
  // ------------------------------------------------------------------------
  calcRetirement() {
    const curAge = parseFloat(document.getElementById('retc-cur-age')?.value) || 30;
    const retAge = parseFloat(document.getElementById('retc-ret-age')?.value) || 65;
    const savings = parseFloat(document.getElementById('retc-savings')?.value) || 0;
    const annualContrib = parseFloat(document.getElementById('retc-contrib')?.value) || 0;
    const returnRate = parseFloat(document.getElementById('retc-return')?.value) || 7.5;
    const desiredIncome = parseFloat(document.getElementById('retc-income')?.value) || 60000;

    const years = Math.max(1, retAge - curAge);
    const r = returnRate / 100;

    const fvSavings = savings * Math.pow(1 + r, years);
    const fvContrib = annualContrib > 0 ? annualContrib * ((Math.pow(1 + r, years) - 1) / r) : 0;
    const projectedNestEgg = fvSavings + fvContrib;

    const safeAnnualWithdrawal = projectedNestEgg * 0.04;
    const safeMonthlyIncome = safeAnnualWithdrawal / 12;
    const targetNestEgg = desiredIncome / 0.04;
    const gap = targetNestEgg - projectedNestEgg;

    const elProjected = document.getElementById('res-retc-projected');
    const elMonthly = document.getElementById('res-retc-monthly');
    const elTarget = document.getElementById('res-retc-target');
    const elStatus = document.getElementById('res-retc-status');

    if (elProjected) elProjected.textContent = this.formatCurrency(projectedNestEgg);
    if (elMonthly) elMonthly.textContent = this.formatCurrency(safeMonthlyIncome);
    if (elTarget) elTarget.textContent = this.formatCurrency(targetNestEgg);
    if (elStatus) {
      if (gap <= 0) {
        elStatus.textContent = '✓ Fully On Track!';
        elStatus.style.color = 'var(--accent-green)';
      } else {
        elStatus.textContent = `Gap: ${this.formatCurrency(gap)}`;
        elStatus.style.color = 'var(--accent-rose)';
      }
    }
  },

  // ------------------------------------------------------------------------
  // 13. AMORTIZATION CALCULATOR (Schedule & Breakdown)
  // ------------------------------------------------------------------------
  calcAmortization() {
    const loan = parseFloat(document.getElementById('amort-loan')?.value) || 0;
    const rate = parseFloat(document.getElementById('amort-rate')?.value) || 0;
    const years = parseFloat(document.getElementById('amort-term')?.value) || 30;

    if (loan <= 0 || rate <= 0 || years <= 0) return;

    const i = (rate / 100) / 12;
    const totalPayments = years * 12;
    const factor = Math.pow(1 + i, totalPayments);
    const monthly = (loan * i * factor) / (factor - 1);
    const totalPaid = monthly * totalPayments;
    const totalInterest = totalPaid - loan;

    const elMo = document.getElementById('res-amort-monthly');
    const elPaid = document.getElementById('res-amort-total-paid');
    const elInt = document.getElementById('res-amort-total-int');

    if (elMo) elMo.textContent = this.formatCurrency(monthly);
    if (elPaid) elPaid.textContent = this.formatCurrency(totalPaid);
    if (elInt) elInt.textContent = this.formatCurrency(totalInterest);

    const tableBody = document.getElementById('amort-schedule-tbody');
    if (tableBody) {
      let balance = loan;
      let html = '';
      const displayYears = Math.min(years, 30);
      for (let y = 1; y <= displayYears; y++) {
        let yrPrincipal = 0;
        let yrInterest = 0;
        for (let m = 0; m < 12; m++) {
          if (balance <= 0) break;
          const intPmt = balance * i;
          const prinPmt = Math.min(balance, monthly - intPmt);
          yrPrincipal += prinPmt;
          yrInterest += intPmt;
          balance -= prinPmt;
        }
        html += `<tr>
          <td>Year ${y}</td>
          <td>${this.formatCurrency(yrPrincipal)}</td>
          <td>${this.formatCurrency(yrInterest)}</td>
          <td>${this.formatCurrency(Math.max(0, balance))}</td>
        </tr>`;
      }
      tableBody.innerHTML = html;
    }
  },

  // ------------------------------------------------------------------------
  // 14. INVESTMENT CALCULATOR (Future Wealth & Growth)
  // ------------------------------------------------------------------------
  calcInvestment() {
    const initial = parseFloat(document.getElementById('inv-initial')?.value) || 0;
    const monthly = parseFloat(document.getElementById('inv-monthly')?.value) || 0;
    const rate = parseFloat(document.getElementById('inv-rate')?.value) || 0;
    const years = parseFloat(document.getElementById('inv-years')?.value) || 10;

    const r = rate / 100;
    const i = r / 12;
    const n = years * 12;

    const fvInitial = initial * Math.pow(1 + i, n);
    const fvMonthly = monthly > 0 && i > 0 ? monthly * ((Math.pow(1 + i, n) - 1) / i) : (monthly * n);
    const totalWealth = fvInitial + fvMonthly;
    const totalContributed = initial + (monthly * n);
    const totalGrowth = totalWealth - totalContributed;
    const multiplier = totalContributed > 0 ? totalWealth / totalContributed : 1;

    const elWealth = document.getElementById('res-inv-wealth');
    const elContrib = document.getElementById('res-inv-contrib');
    const elGrowth = document.getElementById('res-inv-growth');
    const elMult = document.getElementById('res-inv-multiplier');

    if (elWealth) elWealth.textContent = this.formatCurrency(totalWealth);
    if (elContrib) elContrib.textContent = this.formatCurrency(totalContributed);
    if (elGrowth) elGrowth.textContent = this.formatCurrency(totalGrowth);
    if (elMult) elMult.textContent = `${multiplier.toFixed(2)}x Return`;
  },

  // ------------------------------------------------------------------------
  // 15. CURRENCY CALCULATOR (Live Multi-Currency Matrix)
  // ------------------------------------------------------------------------
  calcCurrency() {
    const amt = parseFloat(document.getElementById('curr-calc-amt')?.value) || 0;
    const from = document.getElementById('curr-calc-from')?.value || 'USD';
    const to = document.getElementById('curr-calc-to')?.value || 'INR';

    const rates = {
      USD: 1.0,
      EUR: 0.925,
      GBP: 0.785,
      INR: 83.95,
      CAD: 1.365,
      AUD: 1.520,
      JPY: 154.50,
      CHF: 0.895,
      CNY: 7.240,
      AED: 3.6725,
      SGD: 1.352
    };

    const symbols = {
      USD: '$', EUR: '€', GBP: '£', INR: '₹', CAD: 'C$', AUD: 'A$', JPY: '¥', CHF: 'CHF', CNY: '¥', AED: 'AED', SGD: 'S$'
    };

    const fromRate = rates[from] || 1.0;
    const toRate = rates[to] || 1.0;
    const converted = amt * (toRate / fromRate);
    const unitRate = toRate / fromRate;
    const revRate = fromRate / toRate;

    const elResult = document.getElementById('res-curr-result');
    const elRate = document.getElementById('res-curr-rate');
    const elRev = document.getElementById('res-curr-rev-rate');

    const toSym = symbols[to] || to;

    if (elResult) elResult.textContent = `${toSym} ${converted.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (elRate) elRate.textContent = `1 ${from} = ${unitRate.toFixed(4)} ${to}`;
    if (elRev) elRev.textContent = `1 ${to} = ${revRate.toFixed(4)} ${from}`;

    const matrixList = ['USD', 'INR', 'EUR', 'GBP', 'CAD', 'AUD', 'AED', 'JPY'];
    matrixList.forEach(code => {
      const el = document.getElementById(`curr-cross-${code.toLowerCase()}`);
      if (el) {
        const val = amt * (rates[code] / fromRate);
        const sym = symbols[code] || code;
        el.textContent = `${sym} ${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      }
    });
  },

  swapCurrency() {
    const fromEl = document.getElementById('curr-calc-from');
    const toEl = document.getElementById('curr-calc-to');
    if (!fromEl || !toEl) return;
    const temp = fromEl.value;
    fromEl.value = toEl.value;
    toEl.value = temp;
    this.calcCurrency();
  },

  // ------------------------------------------------------------------------
  // 16. INFLATION CALCULATOR (Purchasing Power & Future Cost)
  // ------------------------------------------------------------------------
  calcInflation() {
    const amount = parseFloat(document.getElementById('inf-amount')?.value) || 0;
    const rate = parseFloat(document.getElementById('inf-rate')?.value) || 0;
    const years = parseFloat(document.getElementById('inf-years')?.value) || 0;

    const r = rate / 100;
    const factor = Math.pow(1 + r, years);

    const futurePower = factor > 0 ? amount / factor : amount;
    const futureCost = amount * factor;
    const lossPct = factor > 0 ? (1 - (1 / factor)) * 100 : 0;
    const cumulativeInflation = (factor - 1) * 100;

    const elPower = document.getElementById('res-inf-power');
    const elCost = document.getElementById('res-inf-cost');
    const elLoss = document.getElementById('res-inf-loss');
    const elCum = document.getElementById('res-inf-cumulative');

    if (elPower) elPower.textContent = this.formatCurrency(futurePower);
    if (elCost) elCost.textContent = this.formatCurrency(futureCost);
    if (elLoss) elLoss.textContent = `-${lossPct.toFixed(1)}% Loss in Value`;
    if (elCum) elCum.textContent = `+${cumulativeInflation.toFixed(1)}% Total Inflation`;
  },

  // ------------------------------------------------------------------------
  // 17. FINANCE TVM CALCULATOR (Time Value of Money Solver)
  // ------------------------------------------------------------------------
  calcFinanceTVM(target = 'fv') {
    let pv = parseFloat(document.getElementById('tvm-pv')?.value) || 0;
    let fv = parseFloat(document.getElementById('tvm-fv')?.value) || 0;
    let pmt = parseFloat(document.getElementById('tvm-pmt')?.value) || 0;
    let n = parseFloat(document.getElementById('tvm-n')?.value) || 0;
    let rPct = parseFloat(document.getElementById('tvm-rate')?.value) || 0;
    const mode = document.getElementById('tvm-mode')?.value || 'end';
    const t = mode === 'begin' ? 1 : 0;
    const r = rPct / 100;

    let resLabel = '';
    let resVal = 0;

    if (target === 'fv') {
      resLabel = 'Future Value (FV)';
      if (r === 0) {
        resVal = -(pv + (pmt * n));
      } else {
        const factor = Math.pow(1 + r, n);
        resVal = -(pv * factor + pmt * (1 + r * t) * ((factor - 1) / r));
      }
      const fvInput = document.getElementById('tvm-fv');
      if (fvInput) fvInput.value = resVal.toFixed(2);
    } else if (target === 'pv') {
      resLabel = 'Present Value (PV)';
      if (r === 0) {
        resVal = -(fv + (pmt * n));
      } else {
        const factor = Math.pow(1 + r, n);
        resVal = -(fv / factor + pmt * (1 + r * t) * ((factor - 1) / (r * factor)));
      }
      const pvInput = document.getElementById('tvm-pv');
      if (pvInput) pvInput.value = resVal.toFixed(2);
    } else if (target === 'pmt') {
      resLabel = 'Payment (PMT)';
      if (r === 0) {
        resVal = -(pv + fv) / n;
      } else {
        const factor = Math.pow(1 + r, n);
        resVal = -(pv * factor + fv) / ((1 + r * t) * ((factor - 1) / r));
      }
      const pmtInput = document.getElementById('tvm-pmt');
      if (pmtInput) pmtInput.value = resVal.toFixed(2);
    } else if (target === 'n') {
      resLabel = 'Number of Periods (N)';
      if (r > 0 && pmt !== 0) {
        const num = (pmt * (1 + r * t) - fv * r);
        const den = (pmt * (1 + r * t) + pv * r);
        if (num > 0 && den > 0) {
          resVal = Math.log(num / den) / Math.log(1 + r);
        }
      }
      const nInput = document.getElementById('tvm-n');
      if (nInput) nInput.value = resVal.toFixed(1);
    }

    const elRes = document.getElementById('res-tvm-output');
    const elLabel = document.getElementById('res-tvm-label');
    if (elRes) elRes.textContent = this.formatCurrency(resVal);
    if (elLabel) elLabel.textContent = resLabel;
  },

  // ------------------------------------------------------------------------
  // 18. MORTGAGE PAYOFF CALCULATOR (Early Payoff & Interest Saved)
  // ------------------------------------------------------------------------
  calcMortgagePayoff() {
    const balance = parseFloat(document.getElementById('payoff-balance')?.value) || 0;
    const rate = parseFloat(document.getElementById('payoff-rate')?.value) || 0;
    const termYears = parseFloat(document.getElementById('payoff-term')?.value) || 30;
    const extraMo = parseFloat(document.getElementById('payoff-extra-mo')?.value) || 0;
    const extraYr = parseFloat(document.getElementById('payoff-extra-yr')?.value) || 0;

    if (balance <= 0 || rate <= 0 || termYears <= 0) return;

    const i = (rate / 100) / 12;
    const totalPayments = termYears * 12;
    const factor = Math.pow(1 + i, totalPayments);
    const standardMonthly = (balance * i * factor) / (factor - 1);
    const standardTotalInt = (standardMonthly * totalPayments) - balance;

    let balAcc = balance;
    let accMonths = 0;
    let accTotalInt = 0;
    const maxMonths = 600;

    while (balAcc > 0 && accMonths < maxMonths) {
      accMonths++;
      const intMonth = balAcc * i;
      accTotalInt += intMonth;
      let pmt = standardMonthly + extraMo;
      if (accMonths % 12 === 0) pmt += extraYr;
      const prinPaid = Math.min(balAcc, pmt - intMonth);
      balAcc -= prinPaid;
    }

    const intSaved = Math.max(0, standardTotalInt - accTotalInt);
    const monthsSaved = Math.max(0, totalPayments - accMonths);
    const yrsSaved = Math.floor(monthsSaved / 12);
    const remMoSaved = monthsSaved % 12;

    const elSaved = document.getElementById('res-payoff-saved');
    const elTimeSaved = document.getElementById('res-payoff-time-saved');
    const elAccMonths = document.getElementById('res-payoff-new-time');
    const elStdInt = document.getElementById('res-payoff-std-int');

    if (elSaved) elSaved.textContent = this.formatCurrency(intSaved);
    if (elTimeSaved) elTimeSaved.textContent = `${yrsSaved > 0 ? yrsSaved + ' Yrs ' : ''}${remMoSaved} Months Earlier!`;
    if (elAccMonths) elAccMonths.textContent = `${Math.floor(accMonths / 12)} Yrs ${accMonths % 12} Mo (vs ${termYears} Yrs)`;
    if (elStdInt) elStdInt.textContent = this.formatCurrency(standardTotalInt);
  },

  // ------------------------------------------------------------------------
  // 34. US FEDERAL & STATE INCOME TAX CALCULATOR
  // ------------------------------------------------------------------------
  calcIncomeTax() {
    const gross = parseFloat(document.getElementById('tax-gross-income')?.value) || 0;
    const status = document.getElementById('tax-filing-status')?.value || 'single';
    const dedType = document.getElementById('tax-ded-type')?.value || 'standard';
    const itemizedAmt = parseFloat(document.getElementById('tax-itemized-amt')?.value) || 0;
    const preTax = parseFloat(document.getElementById('tax-pretax')?.value) || 0;
    const stateChoice = document.getElementById('tax-state')?.value || '0';
    const customStateRate = parseFloat(document.getElementById('tax-state-custom')?.value) || 0;

    // Toggle itemized deduction input
    const itemizedWrap = document.getElementById('tax-itemized-wrap');
    if (itemizedWrap) itemizedWrap.style.display = dedType === 'itemized' ? 'block' : 'none';

    // Toggle custom state rate input
    const customStateWrap = document.getElementById('tax-custom-state-wrap');
    if (customStateWrap) customStateWrap.style.display = stateChoice === 'custom' ? 'block' : 'none';

    // Standard deductions (2024 / current IRS standard)
    const stdDeductions = {
      'single': 14600,
      'married-joint': 29200,
      'married-sep': 14600,
      'head-of-household': 21900
    };
    const stdDed = stdDeductions[status] || 14600;
    const deductionApplied = dedType === 'itemized' ? Math.max(0, itemizedAmt) : stdDed;

    // Adjusted Gross Income (AGI)
    const agi = Math.max(0, gross - preTax);
    const taxableIncome = Math.max(0, agi - deductionApplied);

    // Progressive Federal Tax Brackets (2024 / 2025)
    let brackets = [];
    if (status === 'married-joint') {
      brackets = [
        { rate: 0.10, min: 0, max: 23200 },
        { rate: 0.12, min: 23200, max: 94300 },
        { rate: 0.22, min: 94300, max: 201050 },
        { rate: 0.24, min: 201050, max: 383900 },
        { rate: 0.32, min: 383900, max: 487450 },
        { rate: 0.35, min: 487450, max: 731200 },
        { rate: 0.37, min: 731200, max: Infinity }
      ];
    } else if (status === 'head-of-household') {
      brackets = [
        { rate: 0.10, min: 0, max: 16550 },
        { rate: 0.12, min: 16550, max: 63100 },
        { rate: 0.22, min: 63100, max: 100500 },
        { rate: 0.24, min: 100500, max: 191950 },
        { rate: 0.32, min: 191950, max: 243700 },
        { rate: 0.35, min: 243700, max: 609350 },
        { rate: 0.37, min: 609350, max: Infinity }
      ];
    } else if (status === 'married-sep') {
      brackets = [
        { rate: 0.10, min: 0, max: 11600 },
        { rate: 0.12, min: 11600, max: 47150 },
        { rate: 0.22, min: 47150, max: 100525 },
        { rate: 0.24, min: 100525, max: 191950 },
        { rate: 0.32, min: 191950, max: 243725 },
        { rate: 0.35, min: 243725, max: 365600 },
        { rate: 0.37, min: 365600, max: Infinity }
      ];
    } else {
      // Single
      brackets = [
        { rate: 0.10, min: 0, max: 11600 },
        { rate: 0.12, min: 11600, max: 47150 },
        { rate: 0.22, min: 47150, max: 100525 },
        { rate: 0.24, min: 100525, max: 191950 },
        { rate: 0.32, min: 191950, max: 243725 },
        { rate: 0.35, min: 243725, max: 609350 },
        { rate: 0.37, min: 609350, max: Infinity }
      ];
    }

    let fedTax = 0;
    let marginalRate = 0;
    const bracketRows = [];

    for (const b of brackets) {
      if (taxableIncome > b.min) {
        const taxableInBracket = Math.min(taxableIncome - b.min, b.max - b.min);
        const taxInBracket = taxableInBracket * b.rate;
        fedTax += taxInBracket;
        marginalRate = b.rate * 100;

        const maxLabel = b.max === Infinity ? '+' : ` - ${this.formatCurrency(b.max)}`;
        bracketRows.push(`
          <tr>
            <td><span class="tax-bracket-badge">${(b.rate * 100).toFixed(0)}%</span> ${this.formatCurrency(b.min)}${maxLabel}</td>
            <td>${(b.rate * 100).toFixed(0)}%</td>
            <td>${this.formatCurrency(taxableInBracket)}</td>
            <td style="color:var(--accent-secondary); font-weight:700;">${this.formatCurrency(taxInBracket)}</td>
          </tr>
        `);
      } else {
        const maxLabel = b.max === Infinity ? '+' : ` - ${this.formatCurrency(b.max)}`;
        bracketRows.push(`
          <tr style="opacity:0.45;">
            <td><span class="tax-bracket-badge">${(b.rate * 100).toFixed(0)}%</span> ${this.formatCurrency(b.min)}${maxLabel}</td>
            <td>${(b.rate * 100).toFixed(0)}%</td>
            <td>${this.formatCurrency(0)}</td>
            <td>${this.formatCurrency(0)}</td>
          </tr>
        `);
      }
    }

    // Social Security (OASDI): 6.2% on gross wages up to wage base cap ($168,600)
    const ssWageCap = 168600;
    const ssTax = Math.min(gross, ssWageCap) * 0.062;

    // Medicare: 1.45% + 0.9% Additional Medicare tax over threshold ($200k single, $250k married)
    const medThreshold = status === 'married-joint' ? 250000 : (status === 'married-sep' ? 125000 : 200000);
    let medicareTax = gross * 0.0145;
    if (gross > medThreshold) {
      medicareTax += (gross - medThreshold) * 0.009;
    }

    // State Tax
    let stateRate = 0;
    if (stateChoice === 'ca') stateRate = 0.075;
    else if (stateChoice === 'ny') stateRate = 0.058;
    else if (stateChoice === 'il') stateRate = 0.0495;
    else if (stateChoice === 'pa') stateRate = 0.0307;
    else if (stateChoice === 'ma') stateRate = 0.050;
    else if (stateChoice === 'nj') stateRate = 0.055;
    else if (stateChoice === 'custom') stateRate = customStateRate / 100;
    else stateRate = 0;

    const stateTax = Math.max(0, taxableIncome * stateRate);

    const totalTax = fedTax + ssTax + medicareTax + stateTax;
    const netAnnual = Math.max(0, gross - totalTax - preTax);
    const netMonthly = netAnnual / 12;
    const effRate = gross > 0 ? (totalTax / gross) * 100 : 0;

    // Progress Bar Widths
    const netPct = gross > 0 ? (netAnnual / gross) * 100 : 100;
    const fedPct = gross > 0 ? (fedTax / gross) * 100 : 0;
    const ficaPct = gross > 0 ? ((ssTax + medicareTax) / gross) * 100 : 0;
    const statePct = gross > 0 ? (stateTax / gross) * 100 : 0;

    // Render elements
    const el = (id) => document.getElementById(id);
    if (el('res-tax-total')) el('res-tax-total').textContent = this.formatCurrency(totalTax);
    if (el('res-tax-effective-rate')) el('res-tax-effective-rate').textContent = `${effRate.toFixed(1)}%`;
    if (el('res-tax-net-annual')) el('res-tax-net-annual').textContent = this.formatCurrency(netAnnual);
    if (el('res-tax-net-monthly')) el('res-tax-net-monthly').textContent = this.formatCurrency(netMonthly);
    if (el('res-tax-fed')) el('res-tax-fed').textContent = this.formatCurrency(fedTax);
    if (el('res-tax-ss')) el('res-tax-ss').textContent = this.formatCurrency(ssTax);
    if (el('res-tax-medicare')) el('res-tax-medicare').textContent = this.formatCurrency(medicareTax);
    if (el('res-tax-state')) el('res-tax-state').textContent = this.formatCurrency(stateTax);
    if (el('res-tax-marginal')) el('res-tax-marginal').textContent = `${marginalRate.toFixed(1)}%`;
    if (el('res-tax-taxable')) el('res-tax-taxable').textContent = this.formatCurrency(taxableIncome);

    if (el('tax-bar-net')) el('tax-bar-net').style.width = `${Math.max(0, netPct)}%`;
    if (el('tax-bar-fed')) el('tax-bar-fed').style.width = `${Math.max(0, fedPct)}%`;
    if (el('tax-bar-fica')) el('tax-bar-fica').style.width = `${Math.max(0, ficaPct)}%`;
    if (el('tax-bar-state')) el('tax-bar-state').style.width = `${Math.max(0, statePct)}%`;

    if (el('tax-bracket-body')) el('tax-bracket-body').innerHTML = bracketRows.join('');
    if (el('tax-bracket-status-tag')) el('tax-bracket-status-tag').textContent = `Filing: ${status.replace('-', ' ').toUpperCase()}`;
  },

  // ------------------------------------------------------------------------
  // 35. SALARY & WAGE CONVERSION CALCULATOR
  // ------------------------------------------------------------------------
  calcSalary() {
    const amt = parseFloat(document.getElementById('sal-amount')?.value) || 0;
    const freq = document.getElementById('sal-frequency')?.value || 'annual';
    const hoursWeek = parseFloat(document.getElementById('sal-hours-week')?.value) || 40;
    const daysWeek = parseFloat(document.getElementById('sal-days-week')?.value) || 5;
    const ptoDays = parseFloat(document.getElementById('sal-pto-days')?.value) || 0;
    const otHours = parseFloat(document.getElementById('sal-ot-hours')?.value) || 0;
    const otMult = parseFloat(document.getElementById('sal-ot-multiplier')?.value) || 1.5;
    const bonus = parseFloat(document.getElementById('sal-bonus')?.value) || 0;

    const totalAnnualHours = hoursWeek * 52;
    const totalAnnualDays = daysWeek * 52;

    // Convert input amount to annual base
    let baseAnnual = 0;
    if (freq === 'annual') baseAnnual = amt;
    else if (freq === 'monthly') baseAnnual = amt * 12;
    else if (freq === 'semimonthly') baseAnnual = amt * 24;
    else if (freq === 'biweekly') baseAnnual = amt * 26;
    else if (freq === 'weekly') baseAnnual = amt * 52;
    else if (freq === 'daily') baseAnnual = amt * totalAnnualDays;
    else if (freq === 'hourly') baseAnnual = amt * totalAnnualHours;

    const baseHourly = totalAnnualHours > 0 ? baseAnnual / totalAnnualHours : 0;
    const otAnnual = otHours * 52 * baseHourly * otMult;
    const totalAnnual = baseAnnual + otAnnual + bonus;

    // Frequency conversions of total
    const monthly = totalAnnual / 12;
    const semiMonthly = totalAnnual / 24;
    const biWeekly = totalAnnual / 26;
    const weekly = totalAnnual / 52;
    const daily = totalAnnualDays > 0 ? totalAnnual / totalAnnualDays : 0;

    // Adjusted hourly rate accounting for PTO
    const hoursPerDay = daysWeek > 0 ? hoursWeek / daysWeek : 8;
    const actualWorkedHours = Math.max(1, totalAnnualHours - (ptoDays * hoursPerDay));
    const adjustedHourly = baseAnnual / actualWorkedHours;

    // 1099 Contractor Equivalent Rate (~1.30 multiplier)
    const contractorEquiv = baseHourly * 1.30;

    const el = (id) => document.getElementById(id);
    if (el('res-sal-annual-total')) el('res-sal-annual-total').textContent = this.formatCurrency(totalAnnual);
    if (el('res-sal-hourly-base')) el('res-sal-hourly-base').textContent = `${this.formatCurrency(baseHourly)} / hr`;
    if (el('res-sal-monthly')) el('res-sal-monthly').textContent = this.formatCurrency(monthly);
    if (el('res-sal-biweekly')) el('res-sal-biweekly').textContent = this.formatCurrency(biWeekly);
    if (el('res-sal-semimonthly')) el('res-sal-semimonthly').textContent = this.formatCurrency(semiMonthly);
    if (el('res-sal-weekly')) el('res-sal-weekly').textContent = this.formatCurrency(weekly);
    if (el('res-sal-daily')) el('res-sal-daily').textContent = this.formatCurrency(daily);
    if (el('res-sal-hourly-adjusted')) el('res-sal-hourly-adjusted').textContent = `${this.formatCurrency(adjustedHourly)} / hr`;
    if (el('res-sal-ot-annual')) el('res-sal-ot-annual').textContent = this.formatCurrency(otAnnual);
    if (el('res-sal-1099-equiv')) el('res-sal-1099-equiv').textContent = `${this.formatCurrency(contractorEquiv)} / hr`;

    // Matrix Table
    const rows = [
      { name: 'Annual (1 year)', base: baseAnnual, extra: otAnnual + bonus, total: totalAnnual },
      { name: 'Monthly (12x / yr)', base: baseAnnual / 12, extra: (otAnnual + bonus) / 12, total: monthly },
      { name: 'Semi-Monthly (24x / yr)', base: baseAnnual / 24, extra: (otAnnual + bonus) / 24, total: semiMonthly },
      { name: 'Bi-Weekly (26x / yr)', base: baseAnnual / 26, extra: (otAnnual + bonus) / 26, total: biWeekly },
      { name: 'Weekly (52x / yr)', base: baseAnnual / 52, extra: (otAnnual + bonus) / 52, total: weekly },
      { name: 'Daily (Worked day)', base: totalAnnualDays > 0 ? baseAnnual / totalAnnualDays : 0, extra: totalAnnualDays > 0 ? (otAnnual + bonus) / totalAnnualDays : 0, total: daily },
      { name: 'Hourly (Standard 40h)', base: baseHourly, extra: totalAnnualHours > 0 ? (otAnnual + bonus) / totalAnnualHours : 0, total: totalAnnualHours > 0 ? totalAnnual / totalAnnualHours : 0 }
    ];

    if (el('sal-table-body')) {
      el('sal-table-body').innerHTML = rows.map(r => `
        <tr>
          <td style="font-weight:700;">${r.name}</td>
          <td>${this.formatCurrency(r.base)}</td>
          <td style="color:var(--accent-secondary);">${this.formatCurrency(r.extra)}</td>
          <td style="color:var(--accent-green); font-weight:700;">${this.formatCurrency(r.total)}</td>
        </tr>
      `).join('');
    }
  },

  // ------------------------------------------------------------------------
  // 36. MARRIAGE TAX CALCULATOR (PENALTY VS BONUS)
  // ------------------------------------------------------------------------
  calcMarriageTax() {
    const sp1Gross = parseFloat(document.getElementById('mrg-sp1-income')?.value) || 0;
    const sp1Pretax = parseFloat(document.getElementById('mrg-sp1-pretax')?.value) || 0;
    const sp2Gross = parseFloat(document.getElementById('mrg-sp2-income')?.value) || 0;
    const sp2Pretax = parseFloat(document.getElementById('mrg-sp2-pretax')?.value) || 0;
    const children = parseFloat(document.getElementById('mrg-children')?.value) || 0;
    const stateRate = (parseFloat(document.getElementById('mrg-state-rate')?.value) || 0) / 100;

    const calcSingleTax = (taxable) => {
      const brackets = [
        { rate: 0.10, min: 0, max: 11600 },
        { rate: 0.12, min: 11600, max: 47150 },
        { rate: 0.22, min: 47150, max: 100525 },
        { rate: 0.24, min: 100525, max: 191950 },
        { rate: 0.32, min: 191950, max: 243725 },
        { rate: 0.35, min: 243725, max: 609350 },
        { rate: 0.37, min: 609350, max: Infinity }
      ];
      let tax = 0;
      for (const b of brackets) {
        if (taxable > b.min) {
          tax += Math.min(taxable - b.min, b.max - b.min) * b.rate;
        }
      }
      return tax;
    };

    const calcJointTax = (taxable) => {
      const brackets = [
        { rate: 0.10, min: 0, max: 23200 },
        { rate: 0.12, min: 23200, max: 94300 },
        { rate: 0.22, min: 94300, max: 201050 },
        { rate: 0.24, min: 201050, max: 383900 },
        { rate: 0.32, min: 383900, max: 487450 },
        { rate: 0.35, min: 487450, max: 731200 },
        { rate: 0.37, min: 731200, max: Infinity }
      ];
      let tax = 0;
      for (const b of brackets) {
        if (taxable > b.min) {
          tax += Math.min(taxable - b.min, b.max - b.min) * b.rate;
        }
      }
      return tax;
    };

    const singleStdDed = 14600;
    const jointStdDed = 29200;

    // Single 1
    const sp1Agi = Math.max(0, sp1Gross - sp1Pretax);
    const sp1Taxable = Math.max(0, sp1Agi - singleStdDed);
    const sp1FedTax = calcSingleTax(sp1Taxable);
    const sp1Fica = Math.min(sp1Gross, 168600) * 0.062 + sp1Gross * 0.0145 + (sp1Gross > 200000 ? (sp1Gross - 200000) * 0.009 : 0);
    const sp1State = sp1Taxable * stateRate;

    // Single 2
    const sp2Agi = Math.max(0, sp2Gross - sp2Pretax);
    const sp2Taxable = Math.max(0, sp2Agi - singleStdDed);
    const sp2FedTax = calcSingleTax(sp2Taxable);
    const sp2Fica = Math.min(sp2Gross, 168600) * 0.062 + sp2Gross * 0.0145 + (sp2Gross > 200000 ? (sp2Gross - 200000) * 0.009 : 0);
    const sp2State = sp2Taxable * stateRate;

    // Child tax credits (Single phaseout starts at $200k)
    let singleChildCredit = children * 2000;
    if (sp1Agi > 200000) singleChildCredit -= Math.max(0, (sp1Agi - 200000) * 0.05);
    singleChildCredit = Math.max(0, singleChildCredit);

    const sp1TotalTax = sp1FedTax + sp1Fica + sp1State;
    const sp2TotalTax = sp2FedTax + sp2Fica + sp2State;
    const totalSingleTax = Math.max(0, sp1TotalTax + sp2TotalTax - singleChildCredit);
    const totalSingleGross = sp1Gross + sp2Gross;
    const totalSingleNet = Math.max(0, totalSingleGross - totalSingleTax - sp1Pretax - sp2Pretax);

    // Joint Filing
    const jointGross = sp1Gross + sp2Gross;
    const jointPretax = sp1Pretax + sp2Pretax;
    const jointAgi = Math.max(0, jointGross - jointPretax);
    const jointTaxable = Math.max(0, jointAgi - jointStdDed);
    const jointFedTax = calcJointTax(jointTaxable);
    const jointFica = Math.min(sp1Gross, 168600) * 0.062 + Math.min(sp2Gross, 168600) * 0.062 +
                      jointGross * 0.0145 + (jointGross > 250000 ? (jointGross - 250000) * 0.009 : 0);
    const jointState = jointTaxable * stateRate;

    // Joint Child Credit (phaseout starts at $400k)
    let jointChildCredit = children * 2000;
    if (jointAgi > 400000) jointChildCredit -= Math.max(0, (jointAgi - 400000) * 0.05);
    jointChildCredit = Math.max(0, jointChildCredit);

    const totalJointTax = Math.max(0, jointFedTax + jointFica + jointState - jointChildCredit);
    const totalJointNet = Math.max(0, jointGross - totalJointTax - jointPretax);

    const diff = totalSingleTax - totalJointTax; // Positive => Married Bonus (tax lower)
    const diffMonthly = diff / 12;

    const el = (id) => document.getElementById(id);

    // Verdict Banner
    const banner = el('res-mrg-verdict-banner');
    const verdictText = el('res-mrg-verdict-text');
    const verdictTag = el('res-mrg-verdict-tag');
    const insight = el('mrg-insight-note');

    if (banner && verdictText && verdictTag) {
      banner.classList.remove('verdict-bonus', 'verdict-penalty', 'verdict-neutral');
      if (Math.abs(diff) < 5) {
        banner.classList.add('verdict-neutral');
        verdictText.textContent = `⚖️ Marriage Neutral: No Meaningful Tax Difference`;
        verdictTag.textContent = 'Neutral';
        verdictTag.style.background = 'rgba(100, 116, 139, 0.2)';
        if (insight) insight.innerHTML = `💡 <strong>Neutral Impact:</strong> Both partners' combined tax liabilities remain identical whether filing separately or jointly.`;
      } else if (diff > 0) {
        banner.classList.add('verdict-bonus');
        verdictText.textContent = `🎉 Marriage Bonus: Filing Jointly Saves ${this.formatCurrency(diff)} / Year`;
        verdictTag.textContent = 'Bonus';
        verdictTag.style.background = 'rgba(16, 185, 129, 0.2)';
        if (insight) insight.innerHTML = `💡 <strong>Why you get a Marriage Bonus:</strong> Because there is an income disparity, Spouse 1's income (${this.formatCurrency(sp1Gross)}) shifts into lower joint married tax brackets rather than higher single brackets upon marrying Spouse 2 (${this.formatCurrency(sp2Gross)}), resulting in immediate annual tax savings.`;
      } else {
        banner.classList.add('verdict-penalty');
        verdictText.textContent = `⚠️ Marriage Penalty: Filing Jointly Costs ${this.formatCurrency(Math.abs(diff))} / Year`;
        verdictTag.textContent = 'Penalty';
        verdictTag.style.background = 'rgba(244, 63, 94, 0.2)';
        if (insight) insight.innerHTML = `⚠️ <strong>Why you face a Marriage Penalty:</strong> When both spouses earn high and similar incomes, the joint brackets or Medicare high-earner threshold ($250k joint vs $200k single each) push combined income into higher progressive tiers or phaseouts.`;
      }
    }

    if (el('res-mrg-single-tax')) el('res-mrg-single-tax').textContent = this.formatCurrency(totalSingleTax);
    if (el('res-mrg-single-eff')) el('res-mrg-single-eff').textContent = `Effective Tax: ${totalSingleGross > 0 ? ((totalSingleTax / totalSingleGross) * 100).toFixed(1) : 0}%`;
    if (el('res-mrg-single-takehome')) el('res-mrg-single-takehome').textContent = this.formatCurrency(totalSingleNet);

    if (el('res-mrg-joint-tax')) el('res-mrg-joint-tax').textContent = this.formatCurrency(totalJointTax);
    if (el('res-mrg-joint-eff')) el('res-mrg-joint-eff').textContent = `Effective Tax: ${jointGross > 0 ? ((totalJointTax / jointGross) * 100).toFixed(1) : 0}%`;
    if (el('res-mrg-joint-takehome')) el('res-mrg-joint-takehome').textContent = this.formatCurrency(totalJointNet);

    if (el('res-mrg-diff-annual')) {
      el('res-mrg-diff-annual').textContent = diff >= 0 ? `+${this.formatCurrency(diff)}` : `-${this.formatCurrency(Math.abs(diff))}`;
      el('res-mrg-diff-annual').style.color = diff >= 0 ? 'var(--accent-green)' : 'var(--accent-secondary)';
    }
    if (el('res-mrg-diff-monthly')) {
      el('res-mrg-diff-monthly').textContent = diff >= 0 ? `+${this.formatCurrency(diffMonthly)} / mo` : `-${this.formatCurrency(Math.abs(diffMonthly))} / mo`;
      el('res-mrg-diff-monthly').style.color = diff >= 0 ? 'var(--accent-primary)' : 'var(--accent-secondary)';
    }
    if (el('res-mrg-sp1-tax')) el('res-mrg-sp1-tax').textContent = this.formatCurrency(sp1TotalTax);
    if (el('res-mrg-sp2-tax')) el('res-mrg-sp2-tax').textContent = this.formatCurrency(sp2TotalTax);

    // Table rows
    const tableRows = [
      { label: 'Gross Annual Income', sp1: sp1Gross, sp2: sp2Gross, twoSingle: sp1Gross + sp2Gross, joint: jointGross, diff: 0 },
      { label: 'Pre-Tax Deductions', sp1: sp1Pretax, sp2: sp2Pretax, twoSingle: sp1Pretax + sp2Pretax, joint: jointPretax, diff: 0 },
      { label: 'Standard Deduction', sp1: singleStdDed, sp2: singleStdDed, twoSingle: singleStdDed * 2, joint: jointStdDed, diff: 0 },
      { label: 'Taxable Income', sp1: sp1Taxable, sp2: sp2Taxable, twoSingle: sp1Taxable + sp2Taxable, joint: jointTaxable, diff: (sp1Taxable + sp2Taxable) - jointTaxable },
      { label: 'Federal Income Tax', sp1: sp1FedTax, sp2: sp2FedTax, twoSingle: sp1FedTax + sp2FedTax, joint: jointFedTax, diff: (sp1FedTax + sp2FedTax) - jointFedTax },
      { label: 'FICA (SS & Medicare)', sp1: sp1Fica, sp2: sp2Fica, twoSingle: sp1Fica + sp2Fica, joint: jointFica, diff: (sp1Fica + sp2Fica) - jointFica },
      { label: 'State Income Tax', sp1: sp1State, sp2: sp2State, twoSingle: sp1State + sp2State, joint: jointState, diff: (sp1State + sp2State) - jointState },
      { label: 'Child Tax Credits', sp1: singleChildCredit, sp2: 0, twoSingle: singleChildCredit, joint: jointChildCredit, diff: jointChildCredit - singleChildCredit },
      { label: 'TOTAL TAX LIABILITY', sp1: sp1TotalTax, sp2: sp2TotalTax, twoSingle: totalSingleTax, joint: totalJointTax, diff: diff },
      { label: 'NET AFTER-TAX TAKE-HOME', sp1: sp1Gross - sp1TotalTax - sp1Pretax, sp2: sp2Gross - sp2TotalTax - sp2Pretax, twoSingle: totalSingleNet, joint: totalJointNet, diff: totalJointNet - totalSingleNet }
    ];

    if (el('mrg-table-body')) {
      el('mrg-table-body').innerHTML = tableRows.map(r => {
        const isTotal = r.label.includes('TOTAL') || r.label.includes('NET');
        const diffFormatted = r.diff > 0 ? `+${this.formatCurrency(r.diff)}` : (r.diff < 0 ? `-${this.formatCurrency(Math.abs(r.diff))}` : '$0.00');
        const diffColor = isTotal ? (r.diff >= 0 ? 'var(--accent-green)' : 'var(--accent-secondary)') : 'inherit';
        return `
          <tr style="${isTotal ? 'font-weight:800; background:rgba(255,255,255,0.03);' : ''}">
            <td>${r.label}</td>
            <td>${this.formatCurrency(r.sp1)}</td>
            <td>${this.formatCurrency(r.sp2)}</td>
            <td>${this.formatCurrency(r.twoSingle)}</td>
            <td style="${isTotal ? 'color:var(--accent-primary);' : ''}">${this.formatCurrency(r.joint)}</td>
            <td style="color:${diffColor}; font-weight:700;">${diffFormatted}</td>
          </tr>
        `;
      }).join('');
    }
  },

  // ------------------------------------------------------------------------
  // 37. ESTATE TAX (DEATH TAX) CALCULATOR
  // ------------------------------------------------------------------------
  calcEstateTax() {
    const realEstate = parseFloat(document.getElementById('est-real-estate')?.value) || 0;
    const investments = parseFloat(document.getElementById('est-investments')?.value) || 0;
    const cash = parseFloat(document.getElementById('est-cash')?.value) || 0;
    const retirement = parseFloat(document.getElementById('est-retirement')?.value) || 0;
    const lifeIns = parseFloat(document.getElementById('est-life-ins')?.value) || 0;
    const business = parseFloat(document.getElementById('est-business')?.value) || 0;

    const debts = parseFloat(document.getElementById('est-debts')?.value) || 0;
    const admin = parseFloat(document.getElementById('est-admin')?.value) || 0;
    const charity = parseFloat(document.getElementById('est-charity')?.value) || 0;
    const spousal = parseFloat(document.getElementById('est-spousal')?.value) || 0;

    const exPreset = document.getElementById('est-exemption-preset')?.value || '13610000';
    const customEx = parseFloat(document.getElementById('est-exemption-custom')?.value) || 0;
    const priorGifts = parseFloat(document.getElementById('est-prior-gifts')?.value) || 0;
    const stateChoice = document.getElementById('est-state-choice')?.value || 'none';
    const customStateRate = parseFloat(document.getElementById('est-state-custom')?.value) || 0;

    const customWrap = document.getElementById('est-custom-exemption-wrap');
    if (customWrap) customWrap.style.display = exPreset === 'custom' ? 'block' : 'none';

    const customStateWrap = document.getElementById('est-custom-state-wrap');
    if (customStateWrap) customStateWrap.style.display = stateChoice === 'custom' ? 'block' : 'none';

    const fedExemptionBase = exPreset === 'custom' ? customEx : parseFloat(exPreset);
    const remainingExemption = Math.max(0, fedExemptionBase - priorGifts);

    const grossEstate = realEstate + investments + cash + retirement + lifeIns + business;
    const allowableDeductions = debts + admin + charity + spousal;
    const taxableBeforeExemption = Math.max(0, grossEstate - allowableDeductions);

    // Progressive Federal Estate Tax Schedule (IRC § 2001(c))
    const fedTaxableOverExemption = Math.max(0, taxableBeforeExemption - remainingExemption);

    const calcFedEstateTax = (taxableOver) => {
      if (taxableOver <= 0) return 0;
      const tiers = [
        { min: 0, max: 10000, base: 0, rate: 0.18 },
        { min: 10000, max: 20000, base: 1800, rate: 0.20 },
        { min: 20000, max: 40000, base: 3800, rate: 0.22 },
        { min: 40000, max: 60000, base: 8200, rate: 0.24 },
        { min: 60000, max: 80000, base: 13000, rate: 0.26 },
        { min: 80000, max: 100000, base: 18200, rate: 0.28 },
        { min: 100000, max: 150000, base: 23800, rate: 0.30 },
        { min: 150000, max: 250000, base: 38800, rate: 0.32 },
        { min: 250000, max: 500000, base: 70800, rate: 0.34 },
        { min: 500000, max: 750000, base: 155800, rate: 0.37 },
        { min: 750000, max: 1000000, base: 248300, rate: 0.39 },
        { min: 1000000, max: Infinity, base: 345800, rate: 0.40 }
      ];

      for (const t of tiers) {
        if (taxableOver > t.min && taxableOver <= t.max) {
          return t.base + (taxableOver - t.min) * t.rate;
        }
      }
      return 345800 + (taxableOver - 1000000) * 0.40;
    };

    const fedEstateTax = calcFedEstateTax(fedTaxableOverExemption);

    // State Estate Tax
    let stateExemption = 0;
    let stateRate = 0;
    if (stateChoice === 'ny') { stateExemption = 6940000; stateRate = 0.16; }
    else if (stateChoice === 'ma') { stateExemption = 2000000; stateRate = 0.16; }
    else if (stateChoice === 'wa') { stateExemption = 2193000; stateRate = 0.20; }
    else if (stateChoice === 'il') { stateExemption = 4000000; stateRate = 0.16; }
    else if (stateChoice === 'or') { stateExemption = 1000000; stateRate = 0.16; }
    else if (stateChoice === 'custom') { stateExemption = 2000000; stateRate = customStateRate / 100; }
    else { stateExemption = Infinity; stateRate = 0; }

    let stateEstateTax = 0;
    if (taxableBeforeExemption > stateExemption) {
      stateEstateTax = (taxableBeforeExemption - stateExemption) * stateRate;
    }

    const totalEstateTax = fedEstateTax + stateEstateTax;
    const netHeirs = Math.max(0, grossEstate - debts - admin - totalEstateTax);
    const effRate = grossEstate > 0 ? (totalEstateTax / grossEstate) * 100 : 0;

    // Progress Bar Widths
    const heirsPct = grossEstate > 0 ? (netHeirs / grossEstate) * 100 : 100;
    const fedPct = grossEstate > 0 ? (fedEstateTax / grossEstate) * 100 : 0;
    const statePct = grossEstate > 0 ? (stateEstateTax / grossEstate) * 100 : 0;
    const debtPct = grossEstate > 0 ? ((debts + admin) / grossEstate) * 100 : 0;

    const el = (id) => document.getElementById(id);
    if (el('res-est-total-tax')) {
      el('res-est-total-tax').textContent = this.formatCurrency(totalEstateTax);
      el('res-est-total-tax').style.color = totalEstateTax > 0 ? 'var(--accent-secondary)' : 'var(--accent-green)';
    }
    if (el('res-est-shield-status')) {
      if (totalEstateTax === 0) {
        el('res-est-shield-status').textContent = '100% Tax-Free Shielded by Statutory Exemption';
        el('res-est-shield-status').style.color = 'var(--accent-green)';
      } else {
        el('res-est-shield-status').textContent = `Tax Liability: ${this.formatCurrency(totalEstateTax)}`;
        el('res-est-shield-status').style.color = 'var(--accent-secondary)';
      }
    }

    if (el('res-est-net-heirs')) el('res-est-net-heirs').textContent = this.formatCurrency(netHeirs);
    if (el('res-est-gross')) el('res-est-gross').textContent = this.formatCurrency(grossEstate);
    if (el('res-est-deductions')) el('res-est-deductions').textContent = this.formatCurrency(allowableDeductions);
    if (el('res-est-taxable-gross')) el('res-est-taxable-gross').textContent = this.formatCurrency(taxableBeforeExemption);
    if (el('res-est-exemption-applied')) el('res-est-exemption-applied').textContent = this.formatCurrency(remainingExemption);
    if (el('res-est-fed-tax')) el('res-est-fed-tax').textContent = this.formatCurrency(fedEstateTax);
    if (el('res-est-state-tax')) el('res-est-state-tax').textContent = this.formatCurrency(stateEstateTax);
    if (el('res-est-eff-rate')) el('res-est-eff-rate').textContent = `${effRate.toFixed(1)}%`;

    if (el('est-bar-heirs')) el('est-bar-heirs').style.width = `${Math.max(0, heirsPct)}%`;
    if (el('est-bar-fed')) el('est-bar-fed').style.width = `${Math.max(0, fedPct)}%`;
    if (el('est-bar-state')) el('est-bar-state').style.width = `${Math.max(0, statePct)}%`;
    if (el('est-bar-debts')) el('est-bar-debts').style.width = `${Math.max(0, debtPct)}%`;

    // Summary Table
    const tableRows = [
      { item: 'Real Estate & Land Assets', cat: 'Asset', val: realEstate, tax: 'Included at Date of Death FMV' },
      { item: 'Securities & Investment Portfolio', cat: 'Asset', val: investments, tax: 'Step-up in cost basis to FMV' },
      { item: 'Cash, Bank Deposits & CDs', cat: 'Asset', val: cash, tax: 'Full face value included' },
      { item: 'Retirement Accounts (IRA, 401k)', cat: 'Asset', val: retirement, tax: 'Included in gross estate (IRD rules apply)' },
      { item: 'Life Insurance Proceeds (Owned)', cat: 'Asset', val: lifeIns, tax: 'Taxable if incidents of ownership held' },
      { item: 'Business Interests & Private Holdings', cat: 'Asset', val: business, tax: 'Valued via DCF / market appraisal' },
      { item: 'Debts, Mortgages & Liabilities', cat: 'Deduction', val: -debts, tax: 'Deductible debt reduction' },
      { item: 'Funeral & Estate Probate Administration', cat: 'Deduction', val: -admin, tax: '100% allowable deduction' },
      { item: 'Charitable Donations & Bequests', cat: 'Deduction', val: -charity, tax: '100% unlimited charitable deduction' },
      { item: 'Marital Deduction (Surviving US Spouse)', cat: 'Deduction', val: -spousal, tax: '100% unlimited spousal deduction' },
      { item: 'Federal Lifetime Exemption Shield', cat: 'Exemption', val: remainingExemption, tax: `Basic Exclusion: ${this.formatCurrency(fedExemptionBase)}` },
      { item: 'NET DISTRIBUTION TO BENEFICIARIES', cat: 'Distribution', val: netHeirs, tax: `${heirsPct.toFixed(1)}% of gross transferred to heirs` }
    ];

    if (el('est-table-body')) {
      el('est-table-body').innerHTML = tableRows.map(r => `
        <tr style="${r.cat === 'Distribution' ? 'font-weight:800; background:rgba(255,255,255,0.03);' : ''}">
          <td>${r.item}</td>
          <td><span class="box-tag">${r.cat}</span></td>
          <td style="color:${r.val < 0 ? 'var(--accent-secondary)' : (r.cat === 'Distribution' ? 'var(--accent-green)' : 'inherit')}; font-weight:700;">${this.formatCurrency(Math.abs(r.val))}</td>
          <td style="font-size:0.78rem; color:var(--text-secondary);">${r.tax}</td>
        </tr>
      `).join('');
    }
  },

  // ------------------------------------------------------------------------
  // 38. TAKE-HOME PAYCHECK & NET PAY STUB CALCULATOR
  // ------------------------------------------------------------------------
  calcPaycheck() {
    const grossPay = parseFloat(document.getElementById('chk-gross-pay')?.value) || 0;
    const freqPeriods = parseFloat(document.getElementById('chk-frequency')?.value) || 26;
    const status = document.getElementById('chk-filing-status')?.value || 'single';
    const children = parseFloat(document.getElementById('chk-children')?.value) || 0;
    const extraWithhold = parseFloat(document.getElementById('chk-extra-withhold')?.value) || 0;

    const pretax401k = parseFloat(document.getElementById('chk-pretax-401k')?.value) || 0;
    const pretaxHealth = parseFloat(document.getElementById('chk-pretax-health')?.value) || 0;
    const pretaxDental = parseFloat(document.getElementById('chk-pretax-dental')?.value) || 0;
    const pretaxHsa = parseFloat(document.getElementById('chk-pretax-hsa')?.value) || 0;

    const posttaxRoth = parseFloat(document.getElementById('chk-posttax-roth')?.value) || 0;
    const posttaxOther = parseFloat(document.getElementById('chk-posttax-other')?.value) || 0;

    const stateChoice = document.getElementById('chk-state')?.value || '0';
    const customStateRate = parseFloat(document.getElementById('chk-state-custom')?.value) || 0;

    const customStateWrap = document.getElementById('chk-custom-state-wrap');
    if (customStateWrap) customStateWrap.style.display = stateChoice === 'custom' ? 'block' : 'none';

    const totalPretax = pretax401k + pretaxHealth + pretaxDental + pretaxHsa;
    const totalPosttax = posttaxRoth + posttaxOther;

    // Annualized values
    const annualGross = grossPay * freqPeriods;
    const annualPretax = totalPretax * freqPeriods;
    const annualAgi = Math.max(0, annualGross - annualPretax);

    const stdDeductions = {
      'single': 14600,
      'married-joint': 29200,
      'head-of-household': 21900
    };
    const stdDed = stdDeductions[status] || 14600;
    const annualTaxable = Math.max(0, annualAgi - stdDed);

    // Progressive Federal Tax Brackets
    let brackets = [];
    if (status === 'married-joint') {
      brackets = [
        { rate: 0.10, min: 0, max: 23200 },
        { rate: 0.12, min: 23200, max: 94300 },
        { rate: 0.22, min: 94300, max: 201050 },
        { rate: 0.24, min: 201050, max: 383900 },
        { rate: 0.32, min: 383900, max: 487450 },
        { rate: 0.35, min: 487450, max: 731200 },
        { rate: 0.37, min: 731200, max: Infinity }
      ];
    } else if (status === 'head-of-household') {
      brackets = [
        { rate: 0.10, min: 0, max: 16550 },
        { rate: 0.12, min: 16550, max: 63100 },
        { rate: 0.22, min: 63100, max: 100500 },
        { rate: 0.24, min: 100500, max: 191950 },
        { rate: 0.32, min: 191950, max: 243700 },
        { rate: 0.35, min: 243700, max: 609350 },
        { rate: 0.37, min: 609350, max: Infinity }
      ];
    } else {
      // Single
      brackets = [
        { rate: 0.10, min: 0, max: 11600 },
        { rate: 0.12, min: 11600, max: 47150 },
        { rate: 0.22, min: 47150, max: 100525 },
        { rate: 0.24, min: 100525, max: 191950 },
        { rate: 0.32, min: 191950, max: 243725 },
        { rate: 0.35, min: 243725, max: 609350 },
        { rate: 0.37, min: 609350, max: Infinity }
      ];
    }

    let annualFedTax = 0;
    for (const b of brackets) {
      if (annualTaxable > b.min) {
        annualFedTax += Math.min(annualTaxable - b.min, b.max - b.min) * b.rate;
      }
    }

    // Dependent tax credits ($2,000 / child)
    const childCredit = children * 2000;
    annualFedTax = Math.max(0, annualFedTax - childCredit);
    const paycheckFedTax = (annualFedTax / freqPeriods) + extraWithhold;

    // Social Security (OASDI): 6.2% on gross wages up to $168,600 wage base
    const ssCapPerPeriod = 168600 / freqPeriods;
    const paycheckSs = Math.min(grossPay, ssCapPerPeriod) * 0.062;

    // Medicare: 1.45% (+ 0.9% additional over $200k/$250k threshold)
    const medThreshold = status === 'married-joint' ? 250000 : 200000;
    let paycheckMedicare = grossPay * 0.0145;
    if (annualGross > medThreshold) {
      paycheckMedicare += ((annualGross - medThreshold) / freqPeriods) * 0.009;
    }

    // State Tax Withholding
    let stateRate = 0;
    if (stateChoice === 'ca') stateRate = 0.065;
    else if (stateChoice === 'ny') stateRate = 0.055;
    else if (stateChoice === 'il') stateRate = 0.0495;
    else if (stateChoice === 'pa') stateRate = 0.0307;
    else if (stateChoice === 'ma') stateRate = 0.050;
    else if (stateChoice === 'custom') stateRate = customStateRate / 100;
    else stateRate = 0;

    const paycheckState = Math.max(0, (grossPay - totalPretax) * stateRate);

    const totalTaxes = paycheckFedTax + paycheckSs + paycheckMedicare + paycheckState;
    const totalDeductions = totalPretax + totalPosttax;
    const netTakeHome = Math.max(0, grossPay - totalPretax - totalTaxes - totalPosttax);

    const annualNet = netTakeHome * freqPeriods;
    const monthlyNet = annualNet / 12;
    const takeHomeRatio = grossPay > 0 ? (netTakeHome / grossPay) * 100 : 0;

    // Progress Bar Widths
    const netPct = grossPay > 0 ? (netTakeHome / grossPay) * 100 : 100;
    const fedPct = grossPay > 0 ? (paycheckFedTax / grossPay) * 100 : 0;
    const ssPct = grossPay > 0 ? (paycheckSs / grossPay) * 100 : 0;
    const medPct = grossPay > 0 ? (paycheckMedicare / grossPay) * 100 : 0;
    const statePct = grossPay > 0 ? (paycheckState / grossPay) * 100 : 0;
    const pretaxPct = grossPay > 0 ? (totalPretax / grossPay) * 100 : 0;
    const posttaxPct = grossPay > 0 ? (totalPosttax / grossPay) * 100 : 0;

    const el = (id) => document.getElementById(id);
    if (el('res-chk-net-paycheck')) el('res-chk-net-paycheck').textContent = this.formatCurrency(netTakeHome);
    if (el('res-chk-ratio')) el('res-chk-ratio').textContent = `${takeHomeRatio.toFixed(1)}%`;
    if (el('res-chk-net-annual')) el('res-chk-net-annual').textContent = this.formatCurrency(annualNet);
    if (el('res-chk-net-monthly')) el('res-chk-net-monthly').textContent = this.formatCurrency(monthlyNet);
    if (el('res-chk-total-taxes')) el('res-chk-total-taxes').textContent = this.formatCurrency(totalTaxes);
    if (el('res-chk-fed-tax')) el('res-chk-fed-tax').textContent = this.formatCurrency(paycheckFedTax);
    if (el('res-chk-ss')) el('res-chk-ss').textContent = this.formatCurrency(paycheckSs);
    if (el('res-chk-medicare')) el('res-chk-medicare').textContent = this.formatCurrency(paycheckMedicare);
    if (el('res-chk-state-tax')) el('res-chk-state-tax').textContent = this.formatCurrency(paycheckState);
    if (el('res-chk-total-deductions')) el('res-chk-total-deductions').textContent = this.formatCurrency(totalDeductions);

    if (el('chk-bar-net')) el('chk-bar-net').style.width = `${Math.max(0, netPct)}%`;
    if (el('chk-bar-fed')) el('chk-bar-fed').style.width = `${Math.max(0, fedPct)}%`;
    if (el('chk-bar-ss')) el('chk-bar-ss').style.width = `${Math.max(0, ssPct)}%`;
    if (el('chk-bar-medicare')) el('chk-bar-medicare').style.width = `${Math.max(0, medPct)}%`;
    if (el('chk-bar-state')) el('chk-bar-state').style.width = `${Math.max(0, statePct)}%`;
    if (el('chk-bar-pretax')) el('chk-bar-pretax').style.width = `${Math.max(0, pretaxPct)}%`;
    if (el('chk-bar-posttax')) el('chk-bar-posttax').style.width = `${Math.max(0, posttaxPct)}%`;

    // Paystub summary rows
    if (el('chk-paystub-body')) {
      el('chk-paystub-body').innerHTML = `
        <div class="paystub-row">
          <span>Gross Wages</span>
          <span class="paystub-val" style="color:var(--text-primary);">${this.formatCurrency(grossPay)}</span>
        </div>
        <div class="paystub-row">
          <span>Pre-Tax Benefits (401k, Health, HSA)</span>
          <span class="paystub-val" style="color:var(--accent-secondary);">-${this.formatCurrency(totalPretax)}</span>
        </div>
        <div class="paystub-row">
          <span>Federal Withholding (FIT)</span>
          <span class="paystub-val" style="color:var(--accent-secondary);">-${this.formatCurrency(paycheckFedTax)}</span>
        </div>
        <div class="paystub-row">
          <span>Social Security (OASDI 6.2%)</span>
          <span class="paystub-val" style="color:var(--accent-secondary);">-${this.formatCurrency(paycheckSs)}</span>
        </div>
        <div class="paystub-row">
          <span>Medicare (1.45%)</span>
          <span class="paystub-val" style="color:var(--accent-secondary);">-${this.formatCurrency(paycheckMedicare)}</span>
        </div>
        <div class="paystub-row">
          <span>State Withholding (SIT)</span>
          <span class="paystub-val" style="color:var(--accent-secondary);">-${this.formatCurrency(paycheckState)}</span>
        </div>
        <div class="paystub-row">
          <span>Post-Tax Deductions (Roth / Other)</span>
          <span class="paystub-val" style="color:var(--accent-secondary);">-${this.formatCurrency(totalPosttax)}</span>
        </div>
        <div class="paystub-row paystub-total-row">
          <span>NET TAKE-HOME DIRECT DEPOSIT</span>
          <span class="paystub-val" style="color:var(--accent-green); font-size:1.15rem;">${this.formatCurrency(netTakeHome)}</span>
        </div>
      `;
    }

    // Frequencies matrix
    const freqs = [
      { name: 'Weekly (52x)', mult: 52 / freqPeriods },
      { name: 'Bi-Weekly (26x)', mult: 26 / freqPeriods },
      { name: 'Semi-Monthly (24x)', mult: 24 / freqPeriods },
      { name: 'Monthly (12x)', mult: 12 / freqPeriods },
      { name: 'Annual (1x)', mult: freqPeriods }
    ];

    if (el('chk-freq-body')) {
      el('chk-freq-body').innerHTML = freqs.map(f => {
        const g = f.name.includes('Annual') ? annualGross : grossPay * f.mult;
        const t = f.name.includes('Annual') ? totalTaxes * freqPeriods : totalTaxes * f.mult;
        const n = f.name.includes('Annual') ? annualNet : netTakeHome * f.mult;
        return `
          <tr>
            <td style="font-weight:700;">${f.name}</td>
            <td>${this.formatCurrency(g)}</td>
            <td style="color:var(--accent-secondary);">${this.formatCurrency(t)}</td>
            <td style="color:var(--accent-green); font-weight:700;">${this.formatCurrency(n)}</td>
          </tr>
        `;
      }).join('');
    }
  },

  // ------------------------------------------------------------------------
  // 39. CASH BACK OR LOW INTEREST CALCULATOR
  // ------------------------------------------------------------------------
  calcAutoRebate() {
    const el = id => document.getElementById(id);
    const price = parseFloat(el('reb-price')?.value) || 0;
    const down = parseFloat(el('reb-down')?.value) || 0;
    const term = parseFloat(el('reb-term')?.value) || 60;
    const rebate = parseFloat(el('reb-cashback')?.value) || 0;
    const stdRate = parseFloat(el('reb-std-rate')?.value) || 0;
    const lowRate = parseFloat(el('reb-low-rate')?.value) || 0;

    // Option A: Cash Back (Rebate reduces principal, standard APR applied)
    const financedA = Math.max(0, price - down - rebate);
    let monthlyA = 0;
    let interestA = 0;
    if (financedA > 0 && term > 0) {
      if (stdRate > 0) {
        const iA = (stdRate / 100) / 12;
        const factorA = Math.pow(1 + iA, term);
        monthlyA = (financedA * iA * factorA) / (factorA - 1);
        interestA = (monthlyA * term) - financedA;
      } else {
        monthlyA = financedA / term;
        interestA = 0;
      }
    }
    const totalCostA = (monthlyA * term) + down;

    // Option B: Low Promotional APR (Full financed price without rebate, promo APR applied)
    const financedB = Math.max(0, price - down);
    let monthlyB = 0;
    let interestB = 0;
    if (financedB > 0 && term > 0) {
      if (lowRate > 0) {
        const iB = (lowRate / 100) / 12;
        const factorB = Math.pow(1 + iB, term);
        monthlyB = (financedB * iB * factorB) / (factorB - 1);
        interestB = (monthlyB * term) - financedB;
      } else {
        monthlyB = financedB / term;
        interestB = 0;
      }
    }
    const totalCostB = (monthlyB * term) + down;

    // Comparison & Differences
    const totalDiff = totalCostB - totalCostA; // Positive => Option A saves money! Negative => Option B saves money!
    const monthlyDiff = monthlyB - monthlyA;

    // Break-even interest rate solver:
    // Solve standard APR R where Option A total cost equals Option B total cost.
    let breakEvenRate = 0;
    if (financedA > 0 && monthlyB > 0 && (monthlyB * term) > financedA) {
      const targetMonthly = monthlyB;
      let low = 0;
      let high = 50;
      for (let iter = 0; iter < 50; iter++) {
        const mid = (low + high) / 2;
        const i = (mid / 100) / 12;
        const factor = Math.pow(1 + i, term);
        const m = (financedA * i * factor) / (factor - 1);
        if (m < targetMonthly) {
          low = mid;
        } else {
          high = mid;
        }
      }
      breakEvenRate = (low + high) / 2;
    }

    // Render Option A card
    if (el('res-reb-a-monthly')) el('res-reb-a-monthly').textContent = this.formatCurrency(monthlyA);
    if (el('res-reb-a-sub')) el('res-reb-a-sub').textContent = `Monthly Payment (${term} mo @ ${stdRate.toFixed(1)}%)`;
    if (el('res-reb-a-financed')) el('res-reb-a-financed').textContent = this.formatCurrency(financedA);
    if (el('res-reb-a-interest')) el('res-reb-a-interest').textContent = this.formatCurrency(interestA);
    if (el('res-reb-a-total')) el('res-reb-a-total').textContent = this.formatCurrency(totalCostA);

    // Render Option B card
    if (el('res-reb-b-monthly')) el('res-reb-b-monthly').textContent = this.formatCurrency(monthlyB);
    if (el('res-reb-b-sub')) el('res-reb-b-sub').textContent = `Monthly Payment (${term} mo @ ${lowRate.toFixed(1)}%)`;
    if (el('res-reb-b-financed')) el('res-reb-b-financed').textContent = this.formatCurrency(financedB);
    if (el('res-reb-b-interest')) el('res-reb-b-interest').textContent = this.formatCurrency(interestB);
    if (el('res-reb-b-total')) el('res-reb-b-total').textContent = this.formatCurrency(totalCostB);

    // Highlight Winner Cards & Badges
    const badgeA = el('badge-winner-a');
    const badgeB = el('badge-winner-b');
    const cardA = el('card-option-a');
    const cardB = el('card-option-b');
    const banner = el('reb-verdict-banner');
    const bannerTitle = el('reb-verdict-title');
    const bannerSub = el('reb-verdict-subtitle');
    const bannerAmt = el('reb-verdict-amount');
    const bannerIcon = el('reb-verdict-icon');

    if (totalDiff > 10) {
      // Option A wins (Cash Back saves money)
      if (cardA) cardA.classList.add('card-highlight');
      if (cardB) cardB.classList.remove('card-highlight');
      if (badgeA) badgeA.style.display = 'inline-block';
      if (badgeB) badgeB.style.display = 'none';

      if (banner) banner.className = 'auto-verdict-banner verdict-option-a';
      if (bannerIcon) bannerIcon.textContent = '🎉';
      if (bannerTitle) bannerTitle.textContent = `Recommendation: Take Option A (${this.formatCurrency(rebate)} Cash Back)`;
      if (bannerSub) bannerSub.textContent = `Taking the manufacturer cash rebate saves ${this.formatCurrency(totalDiff)} in total expenditure over ${term} months.`;
      if (bannerAmt) bannerAmt.textContent = `+${this.formatCurrency(totalDiff)}`;
    } else if (totalDiff < -10) {
      // Option B wins (Low APR saves money)
      const absDiff = Math.abs(totalDiff);
      if (cardA) cardA.classList.remove('card-highlight');
      if (cardB) cardB.classList.add('card-highlight');
      if (badgeA) badgeA.style.display = 'none';
      if (badgeB) badgeB.style.display = 'inline-block';

      if (banner) banner.className = 'auto-verdict-banner verdict-option-b';
      if (bannerIcon) bannerIcon.textContent = '🚀';
      if (bannerTitle) bannerTitle.textContent = `Recommendation: Take Option B (${lowRate.toFixed(1)}% Low APR)`;
      if (bannerSub) bannerSub.textContent = `Promotional ${lowRate.toFixed(1)}% APR saves ${this.formatCurrency(absDiff)} in total interest compared to standard financing.`;
      if (bannerAmt) bannerAmt.textContent = `+${this.formatCurrency(absDiff)}`;
    } else {
      // Equal within $10
      if (cardA) cardA.classList.remove('card-highlight');
      if (cardB) cardB.classList.remove('card-highlight');
      if (badgeA) badgeA.style.display = 'none';
      if (badgeB) badgeB.style.display = 'none';

      if (banner) banner.className = 'auto-verdict-banner verdict-neutral';
      if (bannerIcon) bannerIcon.textContent = '⚖️';
      if (bannerTitle) bannerTitle.textContent = `Both Options Are Virtually Identical`;
      if (bannerSub) bannerSub.textContent = `Total costs differ by less than $10 over the ${term}-month loan term.`;
      if (bannerAmt) bannerAmt.textContent = `$0.00`;
    }

    // Difference stats
    if (el('res-reb-diff-monthly')) {
      const diffMo = Math.abs(monthlyDiff);
      el('res-reb-diff-monthly').textContent = `${this.formatCurrency(diffMo)} / mo`;
    }
    if (el('res-reb-diff-total')) {
      el('res-reb-diff-total').textContent = this.formatCurrency(Math.abs(totalDiff));
    }
    if (el('res-reb-breakeven')) {
      el('res-reb-breakeven').textContent = `${breakEvenRate.toFixed(2)}% APR`;
    }

    // Breakdown Table
    if (el('reb-comparison-body')) {
      el('reb-comparison-body').innerHTML = `
        <tr>
          <td><strong>Sticker / Vehicle Price</strong></td>
          <td>${this.formatCurrency(price)}</td>
          <td>${this.formatCurrency(price)}</td>
          <td style="text-align:right; color:var(--text-muted);">Same</td>
        </tr>
        <tr>
          <td><strong>Manufacturer Rebate / Cash Back</strong></td>
          <td style="color:#10b981; font-weight:700;">-${this.formatCurrency(rebate)}</td>
          <td>$0.00 (Forfeited)</td>
          <td style="text-align:right; color:#10b981; font-weight:700;">Option A (+${this.formatCurrency(rebate)})</td>
        </tr>
        <tr>
          <td><strong>Down Payment & Trade-in</strong></td>
          <td>-${this.formatCurrency(down)}</td>
          <td>-${this.formatCurrency(down)}</td>
          <td style="text-align:right; color:var(--text-muted);">Same</td>
        </tr>
        <tr style="font-weight:700;">
          <td><strong>Net Loan Principal Borrowed</strong></td>
          <td>${this.formatCurrency(financedA)}</td>
          <td>${this.formatCurrency(financedB)}</td>
          <td style="text-align:right; color:#10b981;">Option A (-${this.formatCurrency(rebate)})</td>
        </tr>
        <tr>
          <td><strong>Annual Percentage Rate (APR)</strong></td>
          <td>${stdRate.toFixed(2)}% (Standard Bank Rate)</td>
          <td style="color:#3b82f6; font-weight:700;">${lowRate.toFixed(2)}% (Dealer Promo)</td>
          <td style="text-align:right; color:#3b82f6;">Option B (-${(stdRate - lowRate).toFixed(2)}%)</td>
        </tr>
        <tr style="background:rgba(37,99,235,0.06); font-weight:800;">
          <td><strong style="color:var(--text-primary);">MONTHLY PAYMENT</strong></td>
          <td style="color:${monthlyA <= monthlyB ? 'var(--accent-green)' : 'var(--text-primary)'};">${this.formatCurrency(monthlyA)}</td>
          <td style="color:${monthlyB < monthlyA ? 'var(--accent-green)' : 'var(--text-primary)'};">${this.formatCurrency(monthlyB)}</td>
          <td style="text-align:right; color:var(--accent-green);">${monthlyA <= monthlyB ? `Option A saves ${this.formatCurrency(monthlyB - monthlyA)}/mo` : `Option B saves ${this.formatCurrency(monthlyA - monthlyB)}/mo`}</td>
        </tr>
        <tr>
          <td><strong>Total Interest Expense</strong></td>
          <td style="color:#f59e0b;">${this.formatCurrency(interestA)}</td>
          <td style="color:#f59e0b;">${this.formatCurrency(interestB)}</td>
          <td style="text-align:right; color:${interestA <= interestB ? '#10b981' : '#3b82f6'};">${interestA <= interestB ? `Option A saves ${this.formatCurrency(interestB - interestA)}` : `Option B saves ${this.formatCurrency(interestA - interestB)}`}</td>
        </tr>
        <tr style="border-top:2px solid var(--card-border); font-weight:800; font-size:1.05rem;">
          <td><strong>TOTAL OUT-OF-POCKET EXPENDITURE</strong></td>
          <td style="color:${totalCostA <= totalCostB ? 'var(--accent-green)' : 'var(--text-primary)'};">${this.formatCurrency(totalCostA)}</td>
          <td style="color:${totalCostB < totalCostA ? 'var(--accent-green)' : 'var(--text-primary)'};">${this.formatCurrency(totalCostB)}</td>
          <td style="text-align:right; color:${totalCostA <= totalCostB ? 'var(--accent-green)' : 'var(--accent-primary)'};">${totalCostA <= totalCostB ? `🏆 Option A Wins by ${this.formatCurrency(totalDiff)}` : `🏆 Option B Wins by ${this.formatCurrency(Math.abs(totalDiff))}`}</td>
        </tr>
      `;
    }
  },

  // ------------------------------------------------------------------------
  // 40. AUTO LEASE CALCULATOR
  // ------------------------------------------------------------------------
  calcAutoLease() {
    const el = id => document.getElementById(id);
    const msrp = parseFloat(el('lse-msrp')?.value) || 0;
    const price = parseFloat(el('lse-price')?.value) || 0;
    const term = parseFloat(el('lse-term')?.value) || 36;
    const residualPct = parseFloat(el('lse-residual-pct')?.value) || 56;
    const moneyFactor = parseFloat(el('lse-money-factor')?.value) || 0.00225;
    const down = parseFloat(el('lse-down')?.value) || 0;
    const rebates = parseFloat(el('lse-rebates')?.value) || 0;
    const acqFee = parseFloat(el('lse-acq-fee')?.value) || 0;
    const capAcq = el('lse-cap-acq')?.checked !== false;
    const dispFee = parseFloat(el('lse-disp-fee')?.value) || 0;
    const taxRate = parseFloat(el('lse-tax-rate')?.value) || 0;

    // 1. Gross Capitalized Cost
    const grossCap = price + (capAcq ? acqFee : 0);

    // 2. Capitalized Cost Reductions
    const capReductions = down + rebates;

    // 3. Adjusted (Net) Capitalized Cost
    const netCap = Math.max(0, grossCap - capReductions);

    // 4. Residual Value (Based on MSRP as per standard leasing agreements)
    const residualVal = msrp * (residualPct / 100);

    // 5. Depreciation Fee (Monthly)
    const totalDeprec = Math.max(0, netCap - residualVal);
    const monthlyDeprec = term > 0 ? totalDeprec / term : 0;

    // 6. Finance / Rent Charge (Monthly)
    // Formula: (Net Cap Cost + Residual Value) * Money Factor
    const monthlyRent = (netCap + residualVal) * moneyFactor;

    // 7. Base Monthly Payment (Pre-Tax)
    const baseMonthly = monthlyDeprec + monthlyRent;

    // 8. Monthly Sales Tax
    const monthlyTax = baseMonthly * (taxRate / 100);

    // 9. Total Monthly Payment
    const totalMonthly = baseMonthly + monthlyTax;

    // 10. Due at Signing
    // First Month's Payment + Down Payment + (Acquisition Fee if not capitalized)
    const dueAtSigning = totalMonthly + down + (capAcq ? 0 : acqFee);

    // 11. Total Lease Out-of-Pocket Cost
    const totalCost = (totalMonthly * term) + down + (capAcq ? 0 : acqFee) + dispFee;

    // Update displays
    if (el('res-lse-monthly')) el('res-lse-monthly').textContent = this.formatCurrency(totalMonthly);
    if (el('res-lse-base-mo')) el('res-lse-base-mo').textContent = this.formatCurrency(baseMonthly);
    if (el('res-lse-net-cap')) el('res-lse-net-cap').textContent = this.formatCurrency(netCap);
    if (el('res-lse-residual-val')) el('res-lse-residual-val').textContent = `${this.formatCurrency(residualVal)} (${residualPct.toFixed(0)}%)`;
    if (el('res-lse-due-signing')) el('res-lse-due-signing').textContent = this.formatCurrency(dueAtSigning);
    if (el('res-lse-total-cost')) el('res-lse-total-cost').textContent = this.formatCurrency(totalCost);

    // Ratio Bar
    if (totalMonthly > 0) {
      const dPct = (monthlyDeprec / totalMonthly) * 100;
      const rPct = (monthlyRent / totalMonthly) * 100;
      const tPct = (monthlyTax / totalMonthly) * 100;
      if (el('lse-bar-deprec')) el('lse-bar-deprec').style.width = `${dPct.toFixed(1)}%`;
      if (el('lse-bar-rent')) el('lse-bar-rent').style.width = `${rPct.toFixed(1)}%`;
      if (el('lse-bar-tax')) el('lse-bar-tax').style.width = `${tPct.toFixed(1)}%`;
    }
    if (el('res-lse-deprec-legend')) el('res-lse-deprec-legend').textContent = this.formatCurrency(monthlyDeprec);
    if (el('res-lse-rent-legend')) el('res-lse-rent-legend').textContent = this.formatCurrency(monthlyRent);
    if (el('res-lse-tax-legend')) el('res-lse-tax-legend').textContent = this.formatCurrency(monthlyTax);

    // Itemized Lease Table
    if (el('lse-anatomy-body')) {
      el('lse-anatomy-body').innerHTML = `
        <tr>
          <td><strong>Manufacturer MSRP (Sticker)</strong></td>
          <td>Baseline sticker price used to compute residual value</td>
          <td style="text-align:right; font-weight:700;">${this.formatCurrency(msrp)}</td>
        </tr>
        <tr>
          <td><strong>Agreed Selling Price</strong></td>
          <td>Dealer negotiated purchase price</td>
          <td style="text-align:right; font-weight:700;">${this.formatCurrency(price)}</td>
        </tr>
        <tr>
          <td><strong>Acquisition Fee</strong></td>
          <td>Bank / Lessor loan processing fee (${capAcq ? 'Capitalized into Lease' : 'Paid Upfront'})</td>
          <td style="text-align:right; color:var(--text-secondary);">${this.formatCurrency(acqFee)}</td>
        </tr>
        <tr>
          <td><strong>Gross Capitalized Cost</strong></td>
          <td>Selling Price + Capitalized Acquisition Fee</td>
          <td style="text-align:right; font-weight:700;">${this.formatCurrency(grossCap)}</td>
        </tr>
        <tr>
          <td><strong>Cap Cost Reductions</strong></td>
          <td>Down Payment: ${this.formatCurrency(down)} + Rebates/Trade: ${this.formatCurrency(rebates)}</td>
          <td style="text-align:right; color:var(--accent-green); font-weight:700;">-${this.formatCurrency(capReductions)}</td>
        </tr>
        <tr style="background:rgba(37,99,235,0.06); font-weight:800;">
          <td><strong style="color:var(--accent-primary);">ADJUSTED (NET) CAPITALIZED COST</strong></td>
          <td>Amount actually financed on vehicle body</td>
          <td style="text-align:right; color:var(--accent-primary); font-size:1.05rem;">${this.formatCurrency(netCap)}</td>
        </tr>
        <tr>
          <td><strong>Contracted Residual Value</strong></td>
          <td>${residualPct.toFixed(0)}% of MSRP (${term}-month guaranteed buyout value)</td>
          <td style="text-align:right; color:var(--accent-green); font-weight:700;">${this.formatCurrency(residualVal)}</td>
        </tr>
        <tr>
          <td><strong>Total Lease Depreciation</strong></td>
          <td>Net Capitalized Cost - Residual Value (${this.formatCurrency(netCap)} - ${this.formatCurrency(residualVal)})</td>
          <td style="text-align:right; color:#3b82f6; font-weight:700;">${this.formatCurrency(totalDeprec)}</td>
        </tr>
        <tr>
          <td><strong>Monthly Depreciation Charge</strong></td>
          <td>Total Depreciation ÷ ${term} months</td>
          <td style="text-align:right; color:#3b82f6;">${this.formatCurrency(monthlyDeprec)} / mo</td>
        </tr>
        <tr>
          <td><strong>Monthly Finance / Rent Charge</strong></td>
          <td>(Net Cap + Residual) × MF ${moneyFactor.toFixed(5)} (~${(moneyFactor * 2400).toFixed(2)}% APR)</td>
          <td style="text-align:right; color:#f59e0b;">${this.formatCurrency(monthlyRent)} / mo</td>
        </tr>
        <tr>
          <td><strong>Monthly Sales Tax</strong></td>
          <td>${taxRate.toFixed(2)}% applied to base payment (${this.formatCurrency(baseMonthly)})</td>
          <td style="text-align:right; color:#a855f7;">${this.formatCurrency(monthlyTax)} / mo</td>
        </tr>
        <tr style="background:rgba(16,185,129,0.08); font-weight:800; border-top:2px solid var(--card-border);">
          <td><strong style="color:var(--accent-green);">TOTAL MONTHLY LEASE PAYMENT</strong></td>
          <td>Depreciation ($${monthlyDeprec.toFixed(2)}) + Rent ($${monthlyRent.toFixed(2)}) + Tax ($${monthlyTax.toFixed(2)})</td>
          <td style="text-align:right; color:var(--accent-green); font-size:1.15rem;">${this.formatCurrency(totalMonthly)} / mo</td>
        </tr>
        <tr style="border-top:1px solid var(--card-border);">
          <td><strong>Total Out-of-Pocket Lease Expenditure</strong></td>
          <td>${term} Payments + Down Payment + Drive-off Fees + ${this.formatCurrency(dispFee)} Disposition</td>
          <td style="text-align:right; font-weight:800;">${this.formatCurrency(totalCost)}</td>
        </tr>
      `;
    }
  },

  // ------------------------------------------------------------------------
  // 41. INTEREST RATE CALCULATOR (APR & APY SOLVER)
  // ------------------------------------------------------------------------
  irMode: 'loan',
  calcInterestRate() {
    const el = id => document.getElementById(id);
    const mode = this.irMode || 'loan';
    const principal = parseFloat(el('ir-principal')?.value) || 0;
    const years = parseFloat(el('ir-years')?.value) || 0;
    const months = parseFloat(el('ir-months')?.value) || 0;
    const totalYears = years + months / 12;
    const freq = parseInt(el('ir-freq')?.value) || 12;

    if (principal <= 0 || totalYears <= 0) return;

    let solvedApr = 0;
    let solvedApy = 0;
    let totalPaid = 0;
    let totalInterest = 0;
    let monthlyRatePct = 0;
    let formulaDesc = '';

    if (mode === 'loan') {
      const pmt = parseFloat(el('ir-payment')?.value) || 0;
      const nMonths = Math.round(totalYears * 12);
      if (pmt <= 0 || nMonths <= 0) return;

      totalPaid = pmt * nMonths;
      totalInterest = Math.max(0, totalPaid - principal);

      // Solve for monthly interest rate r using bisection
      if (totalPaid <= principal) {
        solvedApr = 0;
        solvedApy = 0;
        monthlyRatePct = 0;
      } else {
        let low = 0.0000001;
        let high = 5.0; // 500% monthly
        for (let iter = 0; iter < 60; iter++) {
          const mid = (low + high) / 2;
          const factor = Math.pow(1 + mid, -nMonths);
          const computedPmt = principal * (mid / (1 - factor));
          if (computedPmt > pmt) {
            high = mid;
          } else {
            low = mid;
          }
        }
        const rMonthly = (low + high) / 2;
        solvedApr = rMonthly * 12 * 100;
        solvedApy = (Math.pow(1 + rMonthly, 12) - 1) * 100;
        monthlyRatePct = rMonthly * 100;
      }
      formulaDesc = `Fixed loan amortized: Solved from P=$${principal.toLocaleString()}, PMT=$${pmt.toLocaleString()}, n=${nMonths} months via numerical root bisection`;
    } else {
      const targetFv = parseFloat(el('ir-target-fv')?.value) || 0;
      if (targetFv <= 0) return;

      totalPaid = targetFv;
      totalInterest = Math.max(0, targetFv - principal);

      // Compound growth: FV = PV * (1 + r/m)^(m*t) => r = m * [ (FV/PV)^(1/(m*t)) - 1 ]
      const mt = freq * totalYears;
      if (principal > 0 && targetFv > principal && mt > 0) {
        const nominalR = freq * (Math.pow(targetFv / principal, 1 / mt) - 1);
        solvedApr = nominalR * 100;
        solvedApy = (Math.pow(1 + nominalR / freq, freq) - 1) * 100;
        monthlyRatePct = (Math.pow(1 + solvedApy / 100, 1 / 12) - 1) * 100;
      }
      formulaDesc = `Compound CAGR: r = m · [(FV/PV)^(1/(m·t)) - 1] with m=${freq} compounding periods/year`;
    }

    const interestRatio = principal > 0 ? (totalInterest / principal) * 100 : 0;

    const resApr = el('res-ir-apr');
    const resApy = el('res-ir-apy');
    const resPaid = el('res-ir-total-paid');
    const resInterest = el('res-ir-total-interest');
    const resRatio = el('res-ir-interest-ratio');
    const resMonthly = el('res-ir-monthly-rate');

    if (resApr) resApr.textContent = `${solvedApr.toFixed(2)}%`;
    if (resApy) resApy.textContent = `${solvedApy.toFixed(2)}%`;
    if (resPaid) resPaid.textContent = this.formatCurrency(totalPaid);
    if (resInterest) resInterest.textContent = this.formatCurrency(totalInterest);
    if (resRatio) resRatio.textContent = `${interestRatio.toFixed(1)}%`;
    if (resMonthly) resMonthly.textContent = `${monthlyRatePct.toFixed(3)}%`;

    const summaryBody = el('ir-summary-body');
    if (summaryBody) {
      summaryBody.innerHTML = `
        <tr>
          <td><strong>Nominal APR</strong></td>
          <td>${formulaDesc}</td>
          <td style="text-align:right; font-weight:700; color:var(--accent-primary); font-size:1.05rem;">${solvedApr.toFixed(2)}% APR</td>
        </tr>
        <tr>
          <td><strong>Effective Annual Rate (APY / EAR)</strong></td>
          <td>APY = (1 + APR / ${freq})^${freq} - 1 (true annual compounding yield)</td>
          <td style="text-align:right; font-weight:700; color:var(--accent-green);">${solvedApy.toFixed(2)}% APY</td>
        </tr>
        <tr>
          <td><strong>Total Financing Cost / Interest</strong></td>
          <td>Total Outlay (${this.formatCurrency(totalPaid)}) - Principal (${this.formatCurrency(principal)})</td>
          <td style="text-align:right; color:var(--accent-rose); font-weight:700;">${this.formatCurrency(totalInterest)}</td>
        </tr>
        <tr>
          <td><strong>Periodic Monthly Interest Rate</strong></td>
          <td>Compounded effective monthly interest rate (per month accrual)</td>
          <td style="text-align:right; font-family:var(--font-mono);">${monthlyRatePct.toFixed(3)}% / mo</td>
        </tr>
      `;
    }
  },

  // ------------------------------------------------------------------------
  // 42. SAVINGS CALCULATOR (GOAL & BALANCE)
  // ------------------------------------------------------------------------
  svgMode: 'goal',
  calcSavingsGoal() {
    const el = id => document.getElementById(id);
    const mode = this.svgMode || 'goal';
    const initial = parseFloat(el('svg-initial')?.value) || 0;
    const years = parseFloat(el('svg-years')?.value) || 5;
    const rate = parseFloat(el('svg-rate')?.value) || 0;
    const freq = parseInt(el('svg-freq')?.value) || 12;

    const r = rate / 100;
    const totalMonths = Math.max(1, Math.round(years * 12));
    const effectiveMonthly = r > 0 ? (Math.pow(1 + r / freq, freq / 12) - 1) : 0;

    let mainVal = 0;
    let totalDeposited = initial;
    let totalInterest = 0;
    let finalBalance = 0;

    if (mode === 'goal') {
      const target = parseFloat(el('svg-target')?.value) || 0;
      // Future value of initial balance:
      const initialFv = initial * Math.pow(1 + effectiveMonthly, totalMonths);
      const neededFromDeposits = Math.max(0, target - initialFv);

      let pmt = 0;
      if (neededFromDeposits > 0) {
        if (effectiveMonthly > 0) {
          pmt = neededFromDeposits * (effectiveMonthly / (Math.pow(1 + effectiveMonthly, totalMonths) - 1));
        } else {
          pmt = neededFromDeposits / totalMonths;
        }
      }
      mainVal = pmt;
      finalBalance = target;
      totalDeposited = initial + (pmt * totalMonths);
      totalInterest = Math.max(0, finalBalance - totalDeposited);

      const labelEl = el('res-svg-main-label');
      if (labelEl) labelEl.textContent = 'Required Monthly Savings Deposit';
      const mainEl = el('res-svg-main-val');
      if (mainEl) mainEl.textContent = `${this.formatCurrency(pmt)} / mo`;
    } else {
      const monthlyDeposit = parseFloat(el('svg-deposit')?.value) || 0;
      const initialFv = initial * Math.pow(1 + effectiveMonthly, totalMonths);
      let depositsFv = 0;
      if (effectiveMonthly > 0) {
        depositsFv = monthlyDeposit * ((Math.pow(1 + effectiveMonthly, totalMonths) - 1) / effectiveMonthly);
      } else {
        depositsFv = monthlyDeposit * totalMonths;
      }
      finalBalance = initialFv + depositsFv;
      totalDeposited = initial + (monthlyDeposit * totalMonths);
      totalInterest = Math.max(0, finalBalance - totalDeposited);

      const labelEl = el('res-svg-main-label');
      if (labelEl) labelEl.textContent = 'Projected Total Savings Balance';
      const mainEl = el('res-svg-main-val');
      if (mainEl) mainEl.textContent = this.formatCurrency(finalBalance);
    }

    const multiplier = totalDeposited > 0 ? (finalBalance / totalDeposited) : 1;
    const statusEl = el('res-svg-status');
    if (statusEl) {
      statusEl.textContent = finalBalance >= 1000 ? 'Target Achievable' : 'Planning Stage';
      statusEl.style.color = 'var(--accent-green)';
    }

    const resTotDep = el('res-svg-total-deposit');
    const resTotInt = el('res-svg-total-interest');
    const resInit = el('res-svg-initial-val');
    const resMult = el('res-svg-multiplier');

    if (resTotDep) resTotDep.textContent = this.formatCurrency(totalDeposited);
    if (resTotInt) resTotInt.textContent = `+${this.formatCurrency(totalInterest)}`;
    if (resInit) resInit.textContent = this.formatCurrency(initial);
    if (resMult) resMult.textContent = `${multiplier.toFixed(2)}x`;

    // Composition bar
    const barPrincipal = el('svg-bar-principal');
    const barInterest = el('svg-bar-interest');
    if (barPrincipal && barInterest && finalBalance > 0) {
      const pPct = Math.min(100, Math.max(5, (totalDeposited / finalBalance) * 100));
      barPrincipal.style.width = `${pPct}%`;
      barInterest.style.width = `${100 - pPct}%`;
    }

    // Schedule Milestones
    const scheduleBody = el('svg-schedule-body');
    if (scheduleBody) {
      let rows = '';
      const milestoneYears = [];
      for (let y = 1; y <= years; y++) {
        if (y === 1 || y === 2 || y === 3 || y === 5 || y === 10 || y === 15 || y === 20 || y === 30 || y === years) {
          if (!milestoneYears.includes(y)) milestoneYears.push(y);
        }
      }
      const monthlyContribution = mode === 'goal' ? mainVal : (parseFloat(el('svg-deposit')?.value) || 0);

      milestoneYears.forEach(y => {
        const mCount = y * 12;
        const curInitFv = initial * Math.pow(1 + effectiveMonthly, mCount);
        const curDepFv = effectiveMonthly > 0 
          ? monthlyContribution * ((Math.pow(1 + effectiveMonthly, mCount) - 1) / effectiveMonthly)
          : monthlyContribution * mCount;
        const bal = curInitFv + curDepFv;
        const depTotal = initial + (monthlyContribution * mCount);
        const intEarned = Math.max(0, bal - depTotal);

        rows += `
          <tr>
            <td><strong>Year ${y}</strong></td>
            <td>${this.formatCurrency(depTotal)}</td>
            <td style="color:var(--accent-green); font-weight:600;">+${this.formatCurrency(intEarned)}</td>
            <td style="text-align:right; font-weight:700; color:var(--text-primary);">${this.formatCurrency(bal)}</td>
          </tr>
        `;
      });
      scheduleBody.innerHTML = rows;
    }
  },

  // ------------------------------------------------------------------------
  // 43. SIMPLE INTEREST CALCULATOR (I = P · r · t)
  // ------------------------------------------------------------------------
  calcSimpleInterest() {
    const el = id => document.getElementById(id);
    const principal = parseFloat(el('si-principal')?.value) || 0;
    const rate = parseFloat(el('si-rate')?.value) || 0;
    const timeVal = parseFloat(el('si-time-val')?.value) || 0;
    const timeUnit = el('si-time-unit')?.value || 'years';
    const convention = parseInt(el('si-day-convention')?.value) || 365;

    if (principal <= 0 || timeVal <= 0) return;

    let tInYears = timeVal;
    if (timeUnit === 'months') {
      tInYears = timeVal / 12;
    } else if (timeUnit === 'days') {
      tInYears = timeVal / convention;
    }

    const r = rate / 100;
    const interest = principal * r * tInYears;
    const maturity = principal + interest;
    const dailyInterest = principal * (r / convention);
    const monthlyInterest = principal * (r / 12);
    const effectiveGainPct = principal > 0 ? (interest / principal) * 100 : 0;

    const resInt = el('res-si-interest');
    const resMat = el('res-si-maturity');
    const resDaily = el('res-si-daily');
    const resMonthly = el('res-si-monthly');
    const resGain = el('res-si-gain-pct');
    const resPrinc = el('res-si-principal-val');

    if (resInt) resInt.textContent = this.formatCurrency(interest);
    if (resMat) resMat.textContent = this.formatCurrency(maturity);
    if (resDaily) resDaily.textContent = `${this.formatCurrency(dailyInterest)} / day`;
    if (resMonthly) resMonthly.textContent = `${this.formatCurrency(monthlyInterest)} / mo`;
    if (resGain) resGain.textContent = `${effectiveGainPct.toFixed(2)}%`;
    if (resPrinc) resPrinc.textContent = this.formatCurrency(principal);

    const breakdownBody = el('si-breakdown-body');
    if (breakdownBody) {
      breakdownBody.innerHTML = `
        <tr>
          <td><strong>1 Day Accrual</strong></td>
          <td>P · (r / ${convention})</td>
          <td style="text-align:right; font-family:var(--font-mono);">${this.formatCurrency(dailyInterest)}</td>
        </tr>
        <tr>
          <td><strong>30-Day Period</strong></td>
          <td>P · r · (30 / ${convention})</td>
          <td style="text-align:right; font-family:var(--font-mono);">${this.formatCurrency(dailyInterest * 30)}</td>
        </tr>
        <tr>
          <td><strong>1 Full Year (Annual)</strong></td>
          <td>P · r · 1.0</td>
          <td style="text-align:right; font-family:var(--font-mono);">${this.formatCurrency(principal * r)}</td>
        </tr>
        <tr style="border-top:1px solid var(--card-border);">
          <td><strong>Total Specified Horizon (${timeVal} ${timeUnit})</strong></td>
          <td>P · r · t = $${principal.toLocaleString()} · ${rate}% · ${tInYears.toFixed(3)} yrs</td>
          <td style="text-align:right; font-weight:700; color:var(--accent-green); font-size:1.05rem;">${this.formatCurrency(interest)}</td>
        </tr>
      `;
    }
  },

  // ------------------------------------------------------------------------
  // 44. CD CALCULATOR (CERTIFICATE OF DEPOSIT)
  // ------------------------------------------------------------------------
  calcCD() {
    const el = id => document.getElementById(id);
    const principal = parseFloat(el('cd-deposit')?.value) || 0;
    const apr = (parseFloat(el('cd-rate')?.value) || 0) / 100;
    const termVal = parseFloat(el('cd-term-val')?.value) || 12;
    const termUnit = el('cd-term-unit')?.value || 'months';
    const freq = parseInt(el('cd-freq')?.value) || 365;
    const penaltyDays = parseInt(el('cd-penalty-tier')?.value) || 0;
    const taxRate = (parseFloat(el('cd-tax-rate')?.value) || 0) / 100;

    if (principal <= 0 || termVal <= 0) return;

    const tYears = termUnit === 'years' ? termVal : termVal / 12;
    const maturity = principal * Math.pow(1 + apr / freq, freq * tYears);
    const totalInterest = Math.max(0, maturity - principal);
    const apy = (Math.pow(1 + apr / freq, freq) - 1) * 100;

    // Early withdrawal penalty: daily simple interest rate * penaltyDays
    const dailyRate = apr / 365;
    const rawPenalty = principal * dailyRate * penaltyDays;
    const penaltyAmt = Math.min(totalInterest, rawPenalty);
    const netEarlyCash = Math.max(principal, maturity - penaltyAmt);
    const afterTaxInterest = totalInterest * (1 - taxRate);

    const resMat = el('res-cd-maturity');
    const resApy = el('res-cd-apy');
    const resTotInt = el('res-cd-total-interest');
    const resPen = el('res-cd-penalty-amt');
    const resNetEarly = el('res-cd-net-early');
    const resAfterTax = el('res-cd-after-tax');

    if (resMat) resMat.textContent = this.formatCurrency(maturity);
    if (resApy) resApy.textContent = `${apy.toFixed(3)}%`;
    if (resTotInt) resTotInt.textContent = `+${this.formatCurrency(totalInterest)}`;
    if (resPen) resPen.textContent = penaltyAmt > 0 ? `-${this.formatCurrency(penaltyAmt)}` : '$0.00';
    if (resNetEarly) resNetEarly.textContent = this.formatCurrency(netEarlyCash);
    if (resAfterTax) resAfterTax.textContent = this.formatCurrency(afterTaxInterest);

    const auditBody = el('cd-audit-body');
    if (auditBody) {
      auditBody.innerHTML = `
        <tr>
          <td><strong>Initial Principal Deposit</strong></td>
          <td>Guaranteed FDIC / NCUA insured deposit base</td>
          <td style="text-align:right;">${this.formatCurrency(principal)}</td>
        </tr>
        <tr>
          <td><strong>Full Maturity Value</strong></td>
          <td>P · (1 + r / ${freq})^(${freq} · ${tYears.toFixed(2)})</td>
          <td style="text-align:right; font-weight:700; color:var(--accent-green);">${this.formatCurrency(maturity)}</td>
        </tr>
        <tr>
          <td><strong>Early Redemption Penalty (${penaltyDays} Days)</strong></td>
          <td>P · (${(apr*100).toFixed(2)}% / 365) · ${penaltyDays} days</td>
          <td style="text-align:right; color:var(--accent-rose); font-weight:600;">-${this.formatCurrency(penaltyAmt)}</td>
        </tr>
        <tr>
          <td><strong>Net Cash if Redeemed Prematurely</strong></td>
          <td>Maturity Accrual minus Penalty Tier Deduction</td>
          <td style="text-align:right; font-weight:700; color:var(--accent-primary);">${this.formatCurrency(netEarlyCash)}</td>
        </tr>
      `;
    }
  },

  // ------------------------------------------------------------------------
  // 45. BOND CALCULATOR (VALUATION & YTM)
  // ------------------------------------------------------------------------
  calcBond() {
    const el = id => document.getElementById(id);
    const par = parseFloat(el('bnd-par')?.value) || 1000;
    const couponRate = (parseFloat(el('bnd-coupon-rate')?.value) || 0) / 100;
    const freq = parseInt(el('bnd-coupon-freq')?.value);
    const ytm = (parseFloat(el('bnd-ytm')?.value) || 0) / 100;
    const years = parseFloat(el('bnd-years')?.value) || 10;
    const accruedDays = parseFloat(el('bnd-accrued-days')?.value) || 0;

    if (par <= 0 || years <= 0 || ytm <= 0) return;

    let cleanPrice = 0;
    let accruedInterest = 0;
    let annualCoupon = par * couponRate;

    if (freq === 0) {
      // Zero coupon bond: P = M / (1+y)^t
      cleanPrice = par / Math.pow(1 + ytm, years);
      accruedInterest = 0;
    } else {
      const m = freq;
      const C = (par * couponRate) / m;
      const r = ytm / m;
      const N = years * m;
      const factor = Math.pow(1 + r, -N);
      const pvCoupons = r > 0 ? C * ((1 - factor) / r) : C * N;
      const pvPar = par * factor;
      cleanPrice = pvCoupons + pvPar;

      const daysInPeriod = 365 / m;
      accruedInterest = C * Math.min(1, Math.max(0, accruedDays / daysInPeriod));
    }

    const dirtyPrice = cleanPrice + accruedInterest;
    const currentYield = cleanPrice > 0 ? (annualCoupon / cleanPrice) * 100 : 0;
    const capitalGain = par - cleanPrice;

    const resClean = el('res-bnd-clean-price');
    const resDirty = el('res-bnd-dirty-price');
    const resYield = el('res-bnd-current-yield');
    const resCoupon = el('res-bnd-annual-coupon');
    const resAccrued = el('res-bnd-accrued-interest');
    const resGain = el('res-bnd-capital-gain');
    const badgeEl = el('res-bnd-badge');

    if (resClean) resClean.textContent = this.formatCurrency(cleanPrice);
    if (resDirty) resDirty.textContent = this.formatCurrency(dirtyPrice);
    if (resYield) resYield.textContent = `${currentYield.toFixed(2)}%`;
    if (resCoupon) resCoupon.textContent = this.formatCurrency(annualCoupon);
    if (resAccrued) resAccrued.textContent = this.formatCurrency(accruedInterest);
    if (resGain) {
      resGain.textContent = (capitalGain >= 0 ? '+' : '') + this.formatCurrency(capitalGain);
      resGain.style.color = capitalGain >= 0 ? 'var(--accent-green)' : 'var(--accent-rose)';
    }

    if (badgeEl) {
      if (cleanPrice > par + 0.5) {
        badgeEl.textContent = 'Trading at Premium';
        badgeEl.className = 'invest-metric-badge badge-premium';
      } else if (cleanPrice < par - 0.5) {
        badgeEl.textContent = 'Trading at Discount';
        badgeEl.className = 'invest-metric-badge badge-discount';
      } else {
        badgeEl.textContent = 'Trading at Par';
        badgeEl.className = 'invest-metric-badge badge-par';
      }
    }

    const anatomyBody = el('bnd-anatomy-body');
    if (anatomyBody) {
      anatomyBody.innerHTML = `
        <tr>
          <td><strong>Clean Price (Market Quote)</strong></td>
          <td>Present Value of all remaining coupons + discounted par value</td>
          <td style="text-align:right; font-weight:700; color:var(--accent-primary); font-size:1.05rem;">${this.formatCurrency(cleanPrice)}</td>
        </tr>
        <tr>
          <td><strong>Accrued Coupon Interest</strong></td>
          <td>${accruedDays} days accrued since last coupon cycle</td>
          <td style="text-align:right; color:var(--accent-secondary); font-weight:600;">+${this.formatCurrency(accruedInterest)}</td>
        </tr>
        <tr>
          <td><strong>Dirty Price (Settlement Invoice)</strong></td>
          <td>Clean Price + Accrued Coupon = Buyer Out-of-Pocket</td>
          <td style="text-align:right; font-weight:800; color:var(--text-primary);">${this.formatCurrency(dirtyPrice)}</td>
        </tr>
        <tr>
          <td><strong>Current Annual Yield</strong></td>
          <td>Annual Coupon ($${annualCoupon.toFixed(2)}) / Clean Price</td>
          <td style="text-align:right; font-weight:700; color:var(--accent-green);">${currentYield.toFixed(2)}%</td>
        </tr>
      `;
    }
  },

  // ------------------------------------------------------------------------
  // 46. MUTUAL FUND CALCULATOR (EXPENSE RATIO DRAG)
  // ------------------------------------------------------------------------
  mfType: 'sip',
  calcMutualFund() {
    const el = id => document.getElementById(id);
    const type = this.mfType || 'sip';
    const monthlySIP = (type === 'lumpsum' ? 0 : parseFloat(el('mf-monthly')?.value)) || 0;
    const lumpSum = (type === 'sip' ? 0 : parseFloat(el('mf-lumpsum')?.value)) || 0;
    const grossReturnRate = (parseFloat(el('mf-return-rate')?.value) || 0) / 100;
    const expenseRatio = (parseFloat(el('mf-expense-ratio')?.value) || 0) / 100;
    const years = parseFloat(el('mf-years')?.value) || 15;

    if (years <= 0 || (monthlySIP <= 0 && lumpSum <= 0)) return;

    const netReturnRate = Math.max(0, grossReturnRate - expenseRatio);
    const totalMonths = Math.round(years * 12);
    const iGross = grossReturnRate / 12;
    const iNet = netReturnRate / 12;

    // Gross Wealth
    const grossLumpFv = lumpSum * Math.pow(1 + iGross, totalMonths);
    const grossSipFv = iGross > 0 ? monthlySIP * ((Math.pow(1 + iGross, totalMonths) - 1) / iGross) : monthlySIP * totalMonths;
    const grossValue = grossLumpFv + grossSipFv;

    // Net Wealth
    const netLumpFv = lumpSum * Math.pow(1 + iNet, totalMonths);
    const netSipFv = iNet > 0 ? monthlySIP * ((Math.pow(1 + iNet, totalMonths) - 1) / iNet) : monthlySIP * totalMonths;
    const netValue = netLumpFv + netSipFv;

    const totalInvested = lumpSum + (monthlySIP * totalMonths);
    const feeDrag = Math.max(0, grossValue - netValue);
    const netGain = Math.max(0, netValue - totalInvested);
    const dragPct = grossValue > 0 ? (feeDrag / grossValue) * 100 : 0;

    const resNet = el('res-mf-net-value');
    const resFee = el('res-mf-fee-drag');
    const resTotInv = el('res-mf-total-invested');
    const resGross = el('res-mf-gross-value');
    const resGain = el('res-mf-net-gain');
    const resDragPct = el('res-mf-drag-pct');

    if (resNet) resNet.textContent = this.formatCurrency(netValue);
    if (resFee) resFee.textContent = `-${this.formatCurrency(feeDrag)}`;
    if (resTotInv) resTotInv.textContent = this.formatCurrency(totalInvested);
    if (resGross) resGross.textContent = this.formatCurrency(grossValue);
    if (resGain) resGain.textContent = `+${this.formatCurrency(netGain)}`;
    if (resDragPct) resDragPct.textContent = `${dragPct.toFixed(1)}%`;

    const compBody = el('mf-comparison-body');
    if (compBody) {
      let rows = '';
      const milestoneYears = [1, 3, 5, 10, years].filter((v, i, a) => v <= years && a.indexOf(v) === i).sort((a,b)=>a-b);
      milestoneYears.forEach(y => {
        const m = y * 12;
        const gVal = (lumpSum * Math.pow(1 + iGross, m)) + (iGross > 0 ? monthlySIP * ((Math.pow(1 + iGross, m) - 1) / iGross) : monthlySIP * m);
        const nVal = (lumpSum * Math.pow(1 + iNet, m)) + (iNet > 0 ? monthlySIP * ((Math.pow(1 + iNet, m) - 1) / iNet) : monthlySIP * m);
        const inv = lumpSum + (monthlySIP * m);
        rows += `
          <tr>
            <td><strong>Year ${y}</strong></td>
            <td>${this.formatCurrency(inv)}</td>
            <td style="color:var(--text-secondary);">${this.formatCurrency(gVal)}</td>
            <td style="text-align:right; font-weight:700; color:var(--accent-green);">${this.formatCurrency(nVal)}</td>
          </tr>
        `;
      });
      compBody.innerHTML = rows;
    }
  },

  // ------------------------------------------------------------------------
  // 47. AVERAGE RETURN CALCULATOR (CAGR & VOLATILITY DRAG)
  // ------------------------------------------------------------------------
  retPeriods: 5,
  annualReturnsList: [25, -15, 30, 10, -5],
  renderReturnInputs() {
    const container = document.getElementById('ret-year-inputs-container');
    if (!container) return;
    const k = this.retPeriods || 5;
    let html = '';
    for (let i = 0; i < k; i++) {
      const val = this.annualReturnsList[i] !== undefined ? this.annualReturnsList[i] : 8;
      html += `
        <div class="form-group" style="margin-bottom:0;">
          <label style="font-size:0.75rem;">Year ${i + 1} (%)</label>
          <div class="input-with-affix">
            <input type="number" class="form-input ret-val-input" data-index="${i}" value="${val}" step="0.5">
            <span class="affix">%</span>
          </div>
        </div>
      `;
    }
    container.innerHTML = html;
    container.querySelectorAll('.ret-val-input').forEach(input => {
      input.addEventListener('input', (e) => {
        const idx = parseInt(e.target.dataset.index);
        this.annualReturnsList[idx] = parseFloat(e.target.value) || 0;
        this.calcAverageReturn();
      });
    });
  },

  calcAverageReturn() {
    const el = id => document.getElementById(id);
    const initial = parseFloat(el('ret-initial')?.value) || 10000;
    const k = this.retPeriods || 5;

    let sum = 0;
    let product = 1.0;
    const rates = [];

    for (let i = 0; i < k; i++) {
      const r = (this.annualReturnsList[i] !== undefined ? this.annualReturnsList[i] : 8) / 100;
      rates.push(r);
      sum += r;
      product *= (1 + r);
    }

    const arithmeticMean = (sum / k) * 100;
    let cagr = 0;
    if (product > 0) {
      cagr = (Math.pow(product, 1 / k) - 1) * 100;
    } else {
      cagr = -100;
    }

    const dragGap = arithmeticMean - cagr;
    const cumulativeReturn = (product - 1) * 100;
    const finalValue = initial * product;
    const dollarGain = finalValue - initial;

    const resCagr = el('res-ret-cagr');
    const resArith = el('res-ret-arithmetic');
    const resDrag = el('res-ret-drag-gap');
    const resTotRet = el('res-ret-total-return');
    const resFinal = el('res-ret-final-val');
    const resNetGain = el('res-ret-net-gain');

    if (resCagr) resCagr.textContent = `${cagr.toFixed(2)}%`;
    if (resArith) resArith.textContent = `${arithmeticMean.toFixed(2)}%`;
    if (resDrag) resDrag.textContent = `${dragGap.toFixed(2)}% gap`;
    if (resTotRet) resTotRet.textContent = `${cumulativeReturn >= 0 ? '+' : ''}${cumulativeReturn.toFixed(2)}%`;
    if (resFinal) resFinal.textContent = this.formatCurrency(finalValue);
    if (resNetGain) {
      resNetGain.textContent = `${dollarGain >= 0 ? '+' : ''}${this.formatCurrency(dollarGain)}`;
      resNetGain.style.color = dollarGain >= 0 ? 'var(--accent-green)' : 'var(--accent-rose)';
    }

    const scheduleBody = el('ret-schedule-body');
    if (scheduleBody) {
      let rows = '';
      let runningBal = initial;
      rates.forEach((r, idx) => {
        const startBal = runningBal;
        const gain = startBal * r;
        runningBal = startBal + gain;
        rows += `
          <tr>
            <td><strong>Year ${idx + 1}</strong></td>
            <td style="color:${r >= 0 ? 'var(--accent-green)' : 'var(--accent-rose)'}; font-weight:700;">${r >= 0 ? '+' : ''}${(r * 100).toFixed(1)}%</td>
            <td style="color:${gain >= 0 ? 'var(--accent-green)' : 'var(--accent-rose)'};">${gain >= 0 ? '+' : ''}${this.formatCurrency(gain)}</td>
            <td style="text-align:right; font-weight:700; color:var(--text-primary);">${this.formatCurrency(runningBal)}</td>
          </tr>
        `;
      });
      scheduleBody.innerHTML = rows;
    }
  },

  // ------------------------------------------------------------------------
  // 48. IRR CALCULATOR (INTERNAL RATE OF RETURN & NPV)
  // ------------------------------------------------------------------------
  irrCashFlows: [30000, 35000, 40000, 45000, 50000],
  renderIrrInputs() {
    const container = document.getElementById('irr-cf-container');
    if (!container) return;
    let html = '';
    this.irrCashFlows.forEach((cf, idx) => {
      html += `
        <div class="form-group" style="margin-bottom:0;">
          <label style="font-size:0.75rem;">Year ${idx + 1} Inflow</label>
          <div class="input-with-affix">
            <span class="affix curr-symbol">$</span>
            <input type="number" class="form-input irr-val-input" data-index="${idx}" value="${cf}" step="1000">
          </div>
        </div>
      `;
    });
    container.innerHTML = html;
    container.querySelectorAll('.irr-val-input').forEach(input => {
      input.addEventListener('input', (e) => {
        const idx = parseInt(e.target.dataset.index);
        this.irrCashFlows[idx] = parseFloat(e.target.value) || 0;
        this.calcIRR();
      });
    });
  },

  calcIRR() {
    const el = id => document.getElementById(id);
    const initial = parseFloat(el('irr-initial-cf')?.value) || 100000;
    const hurdleRate = (parseFloat(el('irr-discount-rate')?.value) || 10) / 100;
    const cfs = this.irrCashFlows || [30000, 35000, 40000, 45000, 50000];

    if (initial <= 0 || cfs.length === 0) return;

    let totalInflows = 0;
    let npv = -initial;
    let pvInflows = 0;

    cfs.forEach((cf, idx) => {
      totalInflows += cf;
      const t = idx + 1;
      const df = Math.pow(1 + hurdleRate, -t);
      const pv = cf * df;
      pvInflows += pv;
      npv += pv;
    });

    const netCf = totalInflows - initial;
    const pi = initial > 0 ? (pvInflows / initial) : 1;

    // Solve for IRR via Newton-Raphson with bisection fallback
    const npvFunc = (r) => {
      let val = -initial;
      for (let t = 1; t <= cfs.length; t++) {
        val += cfs[t - 1] / Math.pow(1 + r, t);
      }
      return val;
    };

    const derivFunc = (r) => {
      let val = 0;
      for (let t = 1; t <= cfs.length; t++) {
        val -= (t * cfs[t - 1]) / Math.pow(1 + r, t + 1);
      }
      return val;
    };

    let r = 0.1;
    let converged = false;
    for (let iter = 0; iter < 80; iter++) {
      const f = npvFunc(r);
      const df = derivFunc(r);
      if (Math.abs(df) < 1e-12) break;
      const rNext = r - f / df;
      if (Math.abs(rNext - r) < 1e-7) {
        r = rNext;
        converged = true;
        break;
      }
      r = rNext;
    }

    if (!converged || isNaN(r) || r < -0.99) {
      // Bisection fallback
      let low = -0.99;
      let high = 5.0;
      for (let iter = 0; iter < 60; iter++) {
        const mid = (low + high) / 2;
        const val = npvFunc(mid);
        if (val > 0) low = mid;
        else high = mid;
      }
      r = (low + high) / 2;
    }

    const irrPct = r * 100;
    const spread = irrPct - (hurdleRate * 100);

    const resIrr = el('res-irr-val');
    const resNpv = el('res-irr-npv');
    const resPi = el('res-irr-pi');
    const resTotInf = el('res-irr-total-inflows');
    const resNetCf = el('res-irr-net-cf');
    const resSpread = el('res-irr-spread');

    if (resIrr) resIrr.textContent = `${irrPct.toFixed(2)}%`;
    if (resNpv) {
      resNpv.textContent = `${npv >= 0 ? '+' : ''}${this.formatCurrency(npv)}`;
      resNpv.style.color = npv >= 0 ? 'var(--accent-green)' : 'var(--accent-rose)';
    }
    if (resPi) resPi.textContent = pi.toFixed(2);
    if (resTotInf) resTotInf.textContent = this.formatCurrency(totalInflows);
    if (resNetCf) {
      resNetCf.textContent = `${netCf >= 0 ? '+' : ''}${this.formatCurrency(netCf)}`;
      resNetCf.style.color = netCf >= 0 ? 'var(--accent-green)' : 'var(--accent-rose)';
    }
    if (resSpread) {
      resSpread.textContent = `${spread >= 0 ? '+' : ''}${spread.toFixed(2)}%`;
      resSpread.style.color = spread >= 0 ? 'var(--accent-green)' : 'var(--accent-rose)';
    }

    const tableBody = el('irr-cf-table-body');
    if (tableBody) {
      let rows = `
        <tr>
          <td><strong>Year 0 (Outlay)</strong></td>
          <td style="color:var(--accent-rose); font-weight:700;">-${this.formatCurrency(initial)}</td>
          <td>1.0000</td>
          <td style="text-align:right; color:var(--accent-rose); font-weight:700;">-${this.formatCurrency(initial)}</td>
        </tr>
      `;
      cfs.forEach((cf, idx) => {
        const t = idx + 1;
        const df = Math.pow(1 + hurdleRate, -t);
        const pv = cf * df;
        rows += `
          <tr>
            <td><strong>Year ${t} Inflow</strong></td>
            <td>${this.formatCurrency(cf)}</td>
            <td style="font-family:var(--font-mono);">${df.toFixed(4)}</td>
            <td style="text-align:right; font-weight:600; color:var(--accent-green);">${this.formatCurrency(pv)}</td>
          </tr>
        `;
      });
      tableBody.innerHTML = rows;
    }
  },

  // ------------------------------------------------------------------------
  // 49. PAYBACK PERIOD CALCULATOR (SIMPLE & DISCOUNTED)
  // ------------------------------------------------------------------------
  pbMode: 'even',
  pbCashFlows: [15000, 18000, 22000, 25000, 20000],
  renderPbInputs() {
    const container = document.getElementById('pb-cf-container');
    if (!container) return;
    let html = '';
    this.pbCashFlows.forEach((cf, idx) => {
      html += `
        <div class="form-group" style="margin-bottom:0;">
          <label style="font-size:0.75rem;">Year ${idx + 1} Cash</label>
          <div class="input-with-affix">
            <span class="affix curr-symbol">$</span>
            <input type="number" class="form-input pb-val-input" data-index="${idx}" value="${cf}" step="1000">
          </div>
        </div>
      `;
    });
    container.innerHTML = html;
    container.querySelectorAll('.pb-val-input').forEach(input => {
      input.addEventListener('input', (e) => {
        const idx = parseInt(e.target.dataset.index);
        this.pbCashFlows[idx] = parseFloat(e.target.value) || 0;
        this.calcPayback();
      });
    });
  },

  calcPayback() {
    const el = id => document.getElementById(id);
    const initial = parseFloat(el('pb-initial')?.value) || 60000;
    const discountRate = (parseFloat(el('pb-discount-rate')?.value) || 8) / 100;
    const mode = this.pbMode || 'even';

    if (initial <= 0) return;

    let simpleYears = 0;
    let discountedYears = 0;
    let totalInflows = 0;
    const cfs = [];

    if (mode === 'even') {
      const evenInflow = parseFloat(el('pb-even-inflow')?.value) || 15000;
      if (evenInflow <= 0) return;
      simpleYears = initial / evenInflow;

      // Generate 8 years of even inflows for table
      for (let t = 1; t <= 8; t++) {
        cfs.push(evenInflow);
      }
    } else {
      cfs.push(...this.pbCashFlows);
    }

    // Cumulative calculations
    let cumSimple = 0;
    let cumDisc = 0;
    let simpleSolved = false;
    let discSolved = false;

    cfs.forEach(cf => totalInflows += cf);

    const rows = [];
    cfs.forEach((cf, idx) => {
      const t = idx + 1;
      const df = Math.pow(1 + discountRate, -t);
      const discCf = cf * df;

      const prevSimple = cumSimple;
      cumSimple += cf;
      if (!simpleSolved && cumSimple >= initial) {
        const needed = initial - prevSimple;
        simpleYears = (t - 1) + (needed / cf);
        simpleSolved = true;
      }

      const prevDisc = cumDisc;
      cumDisc += discCf;
      if (!discSolved && cumDisc >= initial) {
        const needed = initial - prevDisc;
        discountedYears = (t - 1) + (needed / discCf);
        discSolved = true;
      }

      rows.push({ t, cf, cumSimple, cumDisc });
    });

    if (!simpleSolved && cumSimple < initial) simpleYears = Infinity;
    if (!discSolved && cumDisc < initial) discountedYears = Infinity;

    const lag = (isFinite(discountedYears) && isFinite(simpleYears)) ? Math.max(0, discountedYears - simpleYears) : 0;
    const postProfit = Math.max(0, totalInflows - initial);

    const resSim = el('res-pb-simple');
    const resDisc = el('res-pb-discounted');
    const resBe = el('res-pb-breakeven-year');
    const resRec = el('res-pb-total-recovered');
    const resProf = el('res-pb-profit');
    const resLag = el('res-pb-lag');

    if (resSim) resSim.textContent = isFinite(simpleYears) ? `${simpleYears.toFixed(2)} Years` : '> Horizon';
    if (resDisc) resDisc.textContent = isFinite(discountedYears) ? `${discountedYears.toFixed(2)} Years` : '> Horizon';
    if (resBe) resBe.textContent = isFinite(simpleYears) ? `Year ${Math.ceil(simpleYears)}` : 'Not Recovered';
    if (resRec) resRec.textContent = this.formatCurrency(totalInflows);
    if (resProf) resProf.textContent = `+${this.formatCurrency(postProfit)}`;
    if (resLag) resLag.textContent = isFinite(lag) ? `+${lag.toFixed(2)} Years` : 'N/A';

    const recoveryBody = el('pb-recovery-body');
    if (recoveryBody) {
      let html = '';
      rows.forEach(r => {
        html += `
          <tr>
            <td><strong>Year ${r.t}</strong></td>
            <td>${this.formatCurrency(r.cf)}</td>
            <td style="color:${r.cumSimple >= initial ? 'var(--accent-green)' : 'var(--text-secondary)'}; font-weight:600;">
              ${this.formatCurrency(r.cumSimple)} ${r.cumSimple >= initial ? '✓' : ''}
            </td>
            <td style="text-align:right; font-weight:700; color:${r.cumDisc >= initial ? 'var(--accent-primary)' : 'var(--text-secondary)'};">
              ${this.formatCurrency(r.cumDisc)} ${r.cumDisc >= initial ? '✓' : ''}
            </td>
          </tr>
        `;
      });
      recoveryBody.innerHTML = html;
    }
  },

  // ------------------------------------------------------------------------
  // 50. PRESENT VALUE CALCULATOR (PV & ANNUITY DISCOUNTING)
  // ------------------------------------------------------------------------
  pvType: 'lumpsum',
  calcPresentValue() {
    const el = id => document.getElementById(id);
    const type = this.pvType || 'lumpsum';
    const fvAmount = (type === 'annuity' ? 0 : parseFloat(el('pv-fv-amount')?.value)) || 0;
    const pmtAmount = (type === 'lumpsum' ? 0 : parseFloat(el('pv-pmt-amount')?.value)) || 0;
    const rate = (parseFloat(el('pv-rate')?.value) || 0) / 100;
    const years = parseFloat(el('pv-years')?.value) || 5;
    const freq = parseInt(el('pv-freq')?.value) || 1;
    const timing = el('pv-timing')?.value || 'end';

    if (years <= 0 || (fvAmount <= 0 && pmtAmount <= 0)) return;

    const N = years * freq;
    const i = rate / freq;
    const df = Math.pow(1 + i, -N);

    // Lump sum PV
    const pvLump = fvAmount * df;

    // Annuity PV
    let pvAnnuity = 0;
    if (pmtAmount > 0) {
      if (i > 0) {
        pvAnnuity = pmtAmount * ((1 - df) / i);
        if (timing === 'beg') pvAnnuity *= (1 + i);
      } else {
        pvAnnuity = pmtAmount * N;
      }
    }

    const totalPv = pvLump + pvAnnuity;
    const nominalTotal = fvAmount + (pmtAmount * N);
    const discountAmt = Math.max(0, nominalTotal - totalPv);
    const ratio = nominalTotal > 0 ? (totalPv / nominalTotal) * 100 : 0;
    const effRate = (Math.pow(1 + i, freq) - 1) * 100;

    const resPv = el('res-pv-val');
    const resDisc = el('res-pv-discount-amt');
    const resRatio = el('res-pv-ratio');
    const resLump = el('res-pv-lumpsum-part');
    const resAnn = el('res-pv-annuity-part');
    const resEff = el('res-pv-eff-rate');

    if (resPv) resPv.textContent = this.formatCurrency(totalPv);
    if (resDisc) resDisc.textContent = `-${this.formatCurrency(discountAmt)}`;
    if (resRatio) resRatio.textContent = `${ratio.toFixed(1)}%`;
    if (resLump) resLump.textContent = this.formatCurrency(pvLump);
    if (resAnn) resAnn.textContent = this.formatCurrency(pvAnnuity);
    if (resEff) resEff.textContent = `${effRate.toFixed(2)}%`;

    const tableBody = el('pv-table-body');
    if (tableBody) {
      let html = '';
      for (let y = 1; y <= years; y++) {
        const curN = y * freq;
        const curDf = Math.pow(1 + i, -curN);
        const curLumpPv = fvAmount > 0 && y === years ? fvAmount * curDf : 0;
        const curAnnPv = pmtAmount > 0 ? (i > 0 ? pmtAmount * ((1 - curDf) / i) : pmtAmount * curN) : 0;
        const subTot = (y === years ? pvLump : 0) + curAnnPv;
        html += `
          <tr>
            <td><strong>Year ${y} Horizon</strong></td>
            <td>${this.formatCurrency(y === years ? fvAmount + pmtAmount * curN : pmtAmount * curN)}</td>
            <td style="font-family:var(--font-mono);">${curDf.toFixed(4)}</td>
            <td style="text-align:right; font-weight:700; color:var(--accent-primary);">${this.formatCurrency(subTot)}</td>
          </tr>
        `;
      }
      tableBody.innerHTML = html;
    }
  },

  // ------------------------------------------------------------------------
  // 51. FUTURE VALUE CALCULATOR (COMPOUND FV)
  // ------------------------------------------------------------------------
  calcFutureValue() {
    const el = id => document.getElementById(id);
    const pv = parseFloat(el('fv-pv-amount')?.value) || 0;
    const pmt = parseFloat(el('fv-pmt-amount')?.value) || 0;
    const annualRate = (parseFloat(el('fv-rate')?.value) || 0) / 100;
    const years = parseFloat(el('fv-years')?.value) || 10;
    const freq = parseInt(el('fv-freq')?.value) || 12;
    const timing = el('fv-timing')?.value || 'end';

    if (years <= 0 || (pv <= 0 && pmt <= 0)) return;

    // Compounding periods
    const N = years * freq;
    const i = annualRate / freq;

    // Lump sum growth
    const fvPv = pv * Math.pow(1 + i, N);

    // Periodic monthly additions
    const totalMonths = Math.round(years * 12);
    const iMonth = annualRate > 0 ? (Math.pow(1 + i, freq / 12) - 1) : 0;

    let fvPmt = 0;
    if (pmt > 0) {
      if (iMonth > 0) {
        fvPmt = pmt * ((Math.pow(1 + iMonth, totalMonths) - 1) / iMonth);
        if (timing === 'beg') fvPmt *= (1 + iMonth);
      } else {
        fvPmt = pmt * totalMonths;
      }
    }

    const totalFv = fvPv + fvPmt;
    const totalPeriodicDeposits = pmt * totalMonths;
    const totalInvested = pv + totalPeriodicDeposits;
    const totalInterest = Math.max(0, totalFv - totalInvested);
    const multiplier = totalInvested > 0 ? (totalFv / totalInvested) : 1;

    const resFv = el('res-fv-val');
    const resInt = el('res-fv-interest-val');
    const resStart = el('res-fv-start-val');
    const resDep = el('res-fv-deposits-val');
    const resInv = el('res-fv-invested-val');
    const resMult = el('res-fv-multiplier');

    if (resFv) resFv.textContent = this.formatCurrency(totalFv);
    if (resInt) resInt.textContent = `+${this.formatCurrency(totalInterest)}`;
    if (resStart) resStart.textContent = this.formatCurrency(pv);
    if (resDep) resDep.textContent = this.formatCurrency(totalPeriodicDeposits);
    if (resInv) resInv.textContent = this.formatCurrency(totalInvested);
    if (resMult) resMult.textContent = `${multiplier.toFixed(2)}x`;

    // Tri-color composition bar
    const barPv = el('fv-bar-pv');
    const barPmt = el('fv-bar-pmt');
    const barInt = el('fv-bar-interest');
    if (barPv && barPmt && barInt && totalFv > 0) {
      const pvPct = Math.min(100, Math.max(0, (pv / totalFv) * 100));
      const pmtPct = Math.min(100 - pvPct, Math.max(0, (totalPeriodicDeposits / totalFv) * 100));
      const intPct = Math.max(0, 100 - pvPct - pmtPct);
      barPv.style.width = `${pvPct}%`;
      barPmt.style.width = `${pmtPct}%`;
      barInt.style.width = `${intPct}%`;
    }

    const scheduleBody = el('fv-schedule-body');
    if (scheduleBody) {
      let html = '';
      for (let y = 1; y <= years; y++) {
        const m = y * 12;
        const curFvPv = pv * Math.pow(1 + iMonth, m);
        const curFvPmt = iMonth > 0 ? pmt * ((Math.pow(1 + iMonth, m) - 1) / iMonth) * (timing === 'beg' ? (1 + iMonth) : 1) : pmt * m;
        const endingBal = curFvPv + curFvPmt;
        const annualDep = pmt * 12;
        const totalDep = pv + (pmt * m);
        const interestEarned = Math.max(0, endingBal - totalDep);

        html += `
          <tr>
            <td><strong>Year ${y}</strong></td>
            <td>${this.formatCurrency(endingBal - (y === 1 ? pv + annualDep : annualDep))}</td>
            <td>${this.formatCurrency(annualDep)}</td>
            <td style="color:var(--accent-green); font-weight:600;">+${this.formatCurrency(interestEarned)}</td>
            <td style="text-align:right; font-weight:700; color:var(--text-primary);">${this.formatCurrency(endingBal)}</td>
          </tr>
        `;
      }
      scheduleBody.innerHTML = html;
    }
  },

  // ------------------------------------------------------------------------
  // 54. SALES TAX CALCULATOR
  // ------------------------------------------------------------------------
  staxMode: 'add',
  calcSalesTax() {
    const el = id => document.getElementById(id);
    const amount = parseFloat(el('stax-amount')?.value) || 0;
    const stateRate = parseFloat(el('stax-state-rate')?.value) || 0;
    const localRate = parseFloat(el('stax-local-rate')?.value) || 0;
    const combinedRate = stateRate + localRate;
    const rTot = combinedRate / 100;
    const rState = stateRate / 100;
    const rLocal = localRate / 100;

    let baseAmount = 0;
    let totalTax = 0;
    let stateTax = 0;
    let localTax = 0;
    let grossTotal = 0;

    if (this.staxMode === 'add') {
      baseAmount = amount;
      stateTax = baseAmount * rState;
      localTax = baseAmount * rLocal;
      totalTax = stateTax + localTax;
      grossTotal = baseAmount + totalTax;
    } else {
      grossTotal = amount;
      baseAmount = rTot > -1 ? grossTotal / (1 + rTot) : 0;
      totalTax = grossTotal - baseAmount;
      stateTax = baseAmount * rState;
      localTax = baseAmount * rLocal;
    }

    if (el('res-stax-total')) el('res-stax-total').textContent = this.formatCurrency(this.staxMode === 'add' ? grossTotal : baseAmount);
    if (el('res-stax-tax')) el('res-stax-tax').textContent = this.formatCurrency(totalTax);
    if (el('res-stax-combined-rate')) el('res-stax-combined-rate').textContent = `${combinedRate.toFixed(2)}%`;
    if (el('res-stax-base')) el('res-stax-base').textContent = this.formatCurrency(baseAmount);
    if (el('res-stax-state-amt')) el('res-stax-state-amt').textContent = this.formatCurrency(stateTax);
    if (el('res-stax-local-amt')) el('res-stax-local-amt').textContent = this.formatCurrency(localTax);
    if (el('res-stax-primary-label')) el('res-stax-primary-label').textContent = this.staxMode === 'add' ? 'Final Gross Total Price' : 'Pre-Tax Base Price';
  },

  // ------------------------------------------------------------------------
  // 55. CREDIT CARD CALCULATOR
  // ------------------------------------------------------------------------
  ccPayType: 'fixed',
  calcCreditCard() {
    const el = id => document.getElementById(id);
    const balance = parseFloat(el('cc-balance')?.value) || 0;
    const apr = parseFloat(el('cc-apr')?.value) || 0;
    const fixedPmt = parseFloat(el('cc-fixed-payment')?.value) || 0;
    const minPct = parseFloat(el('cc-min-pct')?.value) || 2.0;
    const minFloor = parseFloat(el('cc-min-floor')?.value) || 25;

    const monthlyRate = (apr / 100) / 12;
    let curBal = balance;
    let totalInterest = 0;
    let totalPaid = 0;
    let months = 0;
    const maxMonths = 600; // 50 years cap

    while (curBal > 0.01 && months < maxMonths) {
      months++;
      const interest = curBal * monthlyRate;
      let pmt = 0;
      if (this.ccPayType === 'fixed') {
        pmt = Math.min(curBal + interest, fixedPmt);
        if (pmt <= interest && curBal > 0) {
          // Negative amortization
          months = 999;
          break;
        }
      } else {
        const minAmt = Math.max(curBal * (minPct / 100), minFloor);
        pmt = Math.min(curBal + interest, minAmt);
        if (pmt <= interest && curBal > 0) {
          months = 999;
          break;
        }
      }
      totalInterest += interest;
      totalPaid += pmt;
      curBal = Math.max(0, curBal + interest - pmt);
    }

    const years = Math.floor(months / 12);
    const remMonths = months % 12;
    const ratio = balance > 0 ? (totalInterest / balance) * 100 : 0;

    if (el('res-cc-months')) el('res-cc-months').textContent = months >= maxMonths ? 'Never (Trap)' : `${months} Months`;
    if (el('res-cc-years-str')) el('res-cc-years-str').textContent = months >= maxMonths ? 'Interest exceeds payment' : `${years} Yrs ${remMonths} Mos`;
    if (el('res-cc-interest')) el('res-cc-interest').textContent = this.formatCurrency(totalInterest);
    if (el('res-cc-total')) el('res-cc-total').textContent = this.formatCurrency(totalPaid);
    if (el('res-cc-ratio')) el('res-cc-ratio').textContent = `${ratio.toFixed(1)}%`;
    if (el('res-cc-savings')) el('res-cc-savings').textContent = this.ccPayType === 'fixed' ? 'Accelerated Plan' : 'Min Payment Schedule';
  },

  // ------------------------------------------------------------------------
  // 56. CREDIT CARDS PAYOFF CALCULATOR
  // ------------------------------------------------------------------------
  calcCCPayoff() {
    const el = id => document.getElementById(id);
    const balance = parseFloat(el('ccp-balance')?.value) || 0;
    const apr = parseFloat(el('ccp-apr')?.value) || 0;
    const mode = el('ccp-mode')?.value || 'target';
    const targetMonths = parseFloat(el('ccp-target-months')?.value) || 24;
    const fixedPmt = parseFloat(el('ccp-fixed-pmt')?.value) || 0;

    const r = (apr / 100) / 12;
    let monthlyPmt = 0;
    let months = 0;
    let totalInterest = 0;
    let totalCost = 0;

    if (mode === 'target') {
      months = Math.max(1, targetMonths);
      if (r > 0) {
        monthlyPmt = balance * (r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
      } else {
        monthlyPmt = balance / months;
      }
      totalCost = monthlyPmt * months;
      totalInterest = Math.max(0, totalCost - balance);
    } else {
      monthlyPmt = fixedPmt;
      if (monthlyPmt <= balance * r) {
        months = 999;
      } else {
        if (r > 0) {
          months = Math.ceil(-Math.log(1 - (balance * r / monthlyPmt)) / Math.log(1 + r));
        } else {
          months = Math.ceil(balance / monthlyPmt);
        }
        totalCost = monthlyPmt * months;
        totalInterest = Math.max(0, totalCost - balance);
      }
    }

    const baselineInterest = balance * 0.85; // approximate minimum payment interest burden
    const interestSaved = Math.max(0, baselineInterest - totalInterest);

    if (el('res-ccp-primary-label')) el('res-ccp-primary-label').textContent = mode === 'target' ? 'Required Monthly Payment' : 'Payoff Duration (Months)';
    if (el('res-ccp-primary-val')) el('res-ccp-primary-val').textContent = mode === 'target' ? this.formatCurrency(monthlyPmt) : `${months} Months`;
    if (el('res-ccp-timeline-str')) el('res-ccp-timeline-str').textContent = `${months} Months (${(months / 12).toFixed(1)} Yrs)`;
    if (el('res-ccp-interest')) el('res-ccp-interest').textContent = this.formatCurrency(totalInterest);
    if (el('res-ccp-total')) el('res-ccp-total').textContent = this.formatCurrency(totalCost);
    if (el('res-ccp-interest-saved')) el('res-ccp-interest-saved').textContent = this.formatCurrency(interestSaved);
    if (el('res-ccp-time-saved')) el('res-ccp-time-saved').textContent = `${Math.max(1, Math.round(18 - (months / 12)))} Years Saved`;
  },

  // ------------------------------------------------------------------------
  // 57. DEBT PAYOFF CALCULATOR (SNOWBALL VS AVALANCHE)
  // ------------------------------------------------------------------------
  dpoStrategy: 'avalanche',
  calcDebtPayoff() {
    const el = id => document.getElementById(id);
    const extra = parseFloat(el('dpo-extra')?.value) || 0;

    const debts = [
      { name: el('dpo-n1')?.value || 'Debt 1', bal: parseFloat(el('dpo-b1')?.value) || 0, apr: parseFloat(el('dpo-r1')?.value) || 0, min: parseFloat(el('dpo-m1')?.value) || 0 },
      { name: el('dpo-n2')?.value || 'Debt 2', bal: parseFloat(el('dpo-b2')?.value) || 0, apr: parseFloat(el('dpo-r2')?.value) || 0, min: parseFloat(el('dpo-m2')?.value) || 0 },
      { name: el('dpo-n3')?.value || 'Debt 3', bal: parseFloat(el('dpo-b3')?.value) || 0, apr: parseFloat(el('dpo-r3')?.value) || 0, min: parseFloat(el('dpo-m3')?.value) || 0 },
      { name: el('dpo-n4')?.value || 'Debt 4', bal: parseFloat(el('dpo-b4')?.value) || 0, apr: parseFloat(el('dpo-r4')?.value) || 0, min: parseFloat(el('dpo-m4')?.value) || 0 }
    ].filter(d => d.bal > 0);

    const totalStartDebt = debts.reduce((s, d) => s + d.bal, 0);
    const totalMinPmt = debts.reduce((s, d) => s + d.min, 0);
    const totalMonthlyBudget = totalMinPmt + extra;

    const simulateStrategy = (isAvalanche) => {
      const debtList = debts.map(d => ({ ...d }));
      let m = 0;
      let interestTotal = 0;
      while (debtList.some(d => d.bal > 0.01) && m < 600) {
        m++;
        // Accrue monthly interest
        debtList.forEach(d => {
          if (d.bal > 0) {
            const int = d.bal * ((d.apr / 100) / 12);
            interestTotal += int;
            d.bal += int;
          }
        });

        // Pay minimums
        let availableBudget = totalMonthlyBudget;
        debtList.forEach(d => {
          if (d.bal > 0) {
            const p = Math.min(d.bal, d.min);
            d.bal -= p;
            availableBudget -= p;
          }
        });

        // Sort active debts for priority
        const active = debtList.filter(d => d.bal > 0.01);
        if (active.length > 0) {
          if (isAvalanche) {
            active.sort((a, b) => b.apr - a.apr);
          } else {
            active.sort((a, b) => a.bal - b.bal);
          }
          let extraCash = Math.max(0, availableBudget);
          for (let d of active) {
            if (extraCash <= 0) break;
            const p = Math.min(d.bal, extraCash);
            d.bal -= p;
            extraCash -= p;
          }
        }
      }
      return { months: m, totalInterest: interestTotal };
    };

    const avaRes = simulateStrategy(true);
    const snoRes = simulateStrategy(false);
    const activeRes = this.dpoStrategy === 'avalanche' ? avaRes : snoRes;
    const diff = Math.max(0, snoRes.totalInterest - avaRes.totalInterest);

    if (el('res-dpo-label')) el('res-dpo-label').textContent = `${this.dpoStrategy === 'avalanche' ? 'Avalanche' : 'Snowball'} Debt-Free Horizon`;
    if (el('res-dpo-months')) el('res-dpo-months').textContent = `${activeRes.months} Months (${(activeRes.months / 12).toFixed(1)} Yrs)`;
    if (el('res-dpo-total-debt')) el('res-dpo-total-debt').textContent = this.formatCurrency(totalStartDebt);
    if (el('res-dpo-ava-interest')) el('res-dpo-ava-interest').textContent = this.formatCurrency(avaRes.totalInterest);
    if (el('res-dpo-sno-interest')) el('res-dpo-sno-interest').textContent = this.formatCurrency(snoRes.totalInterest);
    if (el('res-dpo-diff')) el('res-dpo-diff').textContent = `+${this.formatCurrency(diff)} Saved`;
    if (el('res-dpo-monthly-total')) el('res-dpo-monthly-total').textContent = `${this.formatCurrency(totalMonthlyBudget)}/mo`;
    if (el('res-dpo-recommendation')) {
      el('res-dpo-recommendation').textContent = diff > 50
        ? `🎯 Avalanche saves ${this.formatCurrency(diff)} in total interest compared to Snowball and finishes high-APR cards first.`
        : `👍 Both methods perform very closely for your balances. Snowball provides faster early wins!`;
    }
  },

  // ------------------------------------------------------------------------
  // 58. DEBT CONSOLIDATION CALCULATOR
  // ------------------------------------------------------------------------
  calcDebtConsolidation() {
    const el = id => document.getElementById(id);
    const b1 = parseFloat(el('dc-b1')?.value) || 0;
    const r1 = parseFloat(el('dc-r1')?.value) || 0;
    const p1 = parseFloat(el('dc-p1')?.value) || 0;

    const b2 = parseFloat(el('dc-b2')?.value) || 0;
    const r2 = parseFloat(el('dc-r2')?.value) || 0;
    const p2 = parseFloat(el('dc-p2')?.value) || 0;

    const b3 = parseFloat(el('dc-b3')?.value) || 0;
    const r3 = parseFloat(el('dc-r3')?.value) || 0;
    const p3 = parseFloat(el('dc-p3')?.value) || 0;

    const newApr = parseFloat(el('dc-new-apr')?.value) || 0;
    const newTerm = parseFloat(el('dc-new-term')?.value) || 36;
    const newFeePct = parseFloat(el('dc-new-fee')?.value) || 0;

    const totalBal = b1 + b2 + b3;
    const currentPmt = p1 + p2 + p3;

    // Upfront fee
    const feeAmt = totalBal * (newFeePct / 100);
    const loanBal = totalBal + feeAmt;
    const monthlyRate = (newApr / 100) / 12;

    let newMonthlyPmt = 0;
    if (monthlyRate > 0 && newTerm > 0) {
      newMonthlyPmt = loanBal * (monthlyRate * Math.pow(1 + monthlyRate, newTerm)) / (Math.pow(1 + monthlyRate, newTerm) - 1);
    } else if (newTerm > 0) {
      newMonthlyPmt = loanBal / newTerm;
    }

    const newTotalRepay = newMonthlyPmt * newTerm;
    const newTotalInterest = Math.max(0, newTotalRepay - totalBal);

    // Approximate remaining interest on existing debts
    const avgOldApr = totalBal > 0 ? ((b1 * r1) + (b2 * r2) + (b3 * r3)) / totalBal : 18;
    const oldEstInterest = totalBal * (avgOldApr / 100) * (newTerm / 24); // benchmark
    const lifetimeSavings = Math.max(0, oldEstInterest - newTotalInterest);
    const monthlySavings = currentPmt - newMonthlyPmt;

    if (el('res-dc-savings-pmt')) {
      el('res-dc-savings-pmt').textContent = monthlySavings >= 0 ? `-$${monthlySavings.toFixed(2)} /mo` : `+$${Math.abs(monthlySavings).toFixed(2)} /mo`;
    }
    if (el('res-dc-new-pmt')) el('res-dc-new-pmt').textContent = `${this.formatCurrency(newMonthlyPmt)} /mo`;
    if (el('res-dc-curr-pmt')) el('res-dc-curr-pmt').textContent = `${this.formatCurrency(currentPmt)} /mo`;
    if (el('res-dc-lifetime-saved')) el('res-dc-lifetime-saved').textContent = `${this.formatCurrency(lifetimeSavings)} Saved`;
    if (el('res-dc-fee-amt')) el('res-dc-fee-amt').textContent = this.formatCurrency(feeAmt);
    if (el('res-dc-total-bal')) el('res-dc-total-bal').textContent = this.formatCurrency(totalBal);
  },

  // ------------------------------------------------------------------------
  // 59. REPAYMENT CALCULATOR
  // ------------------------------------------------------------------------
  repFreq: 'monthly',
  calcRepayment() {
    const el = id => document.getElementById(id);
    const principal = parseFloat(el('rep-principal')?.value) || 0;
    const rate = parseFloat(el('rep-rate')?.value) || 0;
    const years = parseFloat(el('rep-term-years')?.value) || 5;
    const extra = parseFloat(el('rep-extra')?.value) || 0;

    const totalMonths = years * 12;
    const monthlyRate = (rate / 100) / 12;

    let baseMonthlyPmt = 0;
    if (monthlyRate > 0) {
      baseMonthlyPmt = principal * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    } else {
      baseMonthlyPmt = principal / totalMonths;
    }

    const baselineTotalInterest = (baseMonthlyPmt * totalMonths) - principal;

    // Accelerated Bi-Weekly = half of base monthly payment paid 26 times a year
    const isBiweekly = this.repFreq === 'biweekly';
    const periodPmt = isBiweekly ? (baseMonthlyPmt / 2) + (extra / 2) : baseMonthlyPmt + extra;
    const periodRate = isBiweekly ? (rate / 100) / 26 : monthlyRate;

    let bal = principal;
    let periods = 0;
    let totalInterestPaid = 0;
    const maxPeriods = isBiweekly ? 26 * 50 : 12 * 50;

    while (bal > 0.01 && periods < maxPeriods) {
      periods++;
      const int = bal * periodRate;
      totalInterestPaid += int;
      const pmt = Math.min(bal + int, periodPmt);
      bal = Math.max(0, bal + int - pmt);
    }

    const actualYears = isBiweekly ? periods / 26 : periods / 12;
    const timeSavedYears = Math.max(0, years - actualYears);
    const interestSaved = Math.max(0, baselineTotalInterest - totalInterestPaid);

    if (el('res-rep-pay-label')) el('res-rep-pay-label').textContent = isBiweekly ? 'Accelerated Bi-Weekly Payment' : 'Monthly Payment';
    if (el('res-rep-payment')) el('res-rep-payment').textContent = this.formatCurrency(periodPmt);
    if (el('res-rep-time-saved')) el('res-rep-time-saved').textContent = `${Math.round(timeSavedYears * 12)} Months Saved`;
    if (el('res-rep-total-interest')) el('res-rep-total-interest').textContent = this.formatCurrency(totalInterestPaid);
    if (el('res-rep-interest-saved')) el('res-rep-interest-saved').textContent = this.formatCurrency(interestSaved);
    if (el('res-rep-total-sum')) el('res-rep-total-sum').textContent = this.formatCurrency(principal + totalInterestPaid);
    if (el('res-rep-payoff-time')) el('res-rep-payoff-time').textContent = `${actualYears.toFixed(1)} Years`;
  },

  // ------------------------------------------------------------------------
  // 60. STUDENT LOAN CALCULATOR
  // ------------------------------------------------------------------------
  slPlan: 'standard',
  calcStudentLoan() {
    const el = id => document.getElementById(id);
    const balance = parseFloat(el('sl-balance')?.value) || 0;
    const rate = parseFloat(el('sl-rate')?.value) || 0;
    const capInt = parseFloat(el('sl-cap-int')?.value) || 0;
    const agi = parseFloat(el('sl-agi')?.value) || 0;
    const familySize = parseFloat(el('sl-family')?.value) || 1;

    const P = balance + capInt;
    const r = (rate / 100) / 12;

    let pmt = 0;
    let months = 120;
    let totalPaid = 0;
    let totalInterest = 0;
    let forgiveness = 0;

    if (this.slPlan === 'standard') {
      months = 120;
      if (r > 0) {
        pmt = P * (r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
      } else {
        pmt = P / months;
      }
      totalPaid = pmt * months;
      totalInterest = Math.max(0, totalPaid - P);
    } else if (this.slPlan === 'extended') {
      months = 300;
      if (r > 0) {
        pmt = P * (r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
      } else {
        pmt = P / months;
      }
      totalPaid = pmt * months;
      totalInterest = Math.max(0, totalPaid - P);
    } else {
      // SAVE / IDR Plan
      months = 240; // 20 years
      const povertyLine = 15060 + (familySize - 1) * 5380;
      const threshold = povertyLine * 2.25;
      const discretionary = Math.max(0, agi - threshold);
      pmt = (discretionary * 0.05) / 12;
      totalPaid = pmt * months;
      const totalRequiredPmt = P + (P * r * months * 0.5);
      forgiveness = Math.max(0, P - (totalPaid * 0.7));
      totalInterest = Math.max(0, totalPaid - (P - forgiveness));
    }

    const ratio = P > 0 ? (totalInterest / P) * 100 : 0;

    if (el('res-sl-pay-label')) {
      el('res-sl-pay-label').textContent = this.slPlan === 'idr' ? 'SAVE / IDR Monthly Payment' : (this.slPlan === 'extended' ? 'Extended Monthly Payment' : 'Standard Monthly Payment');
    }
    if (el('res-sl-payment')) el('res-sl-payment').textContent = this.formatCurrency(pmt);
    if (el('res-sl-term-str')) el('res-sl-term-str').textContent = `${months / 12} Years (${months} Mos)`;
    if (el('res-sl-interest')) el('res-sl-interest').textContent = this.formatCurrency(totalInterest);
    if (el('res-sl-total')) el('res-sl-total').textContent = this.formatCurrency(totalPaid);
    if (el('res-sl-forgiveness')) el('res-sl-forgiveness').textContent = this.formatCurrency(forgiveness);
    if (el('res-sl-ratio')) el('res-sl-ratio').textContent = `${ratio.toFixed(1)}%`;
  },

  // ------------------------------------------------------------------------
  // 61. COLLEGE COST CALCULATOR
  // ------------------------------------------------------------------------
  calcCollegeCost() {
    const el = id => document.getElementById(id);
    const childAge = parseFloat(el('col-child-age')?.value) || 0;
    const startAge = parseFloat(el('col-start-age')?.value) || 18;
    const annualCost = parseFloat(el('col-annual-cost')?.value) || 0;
    const inflation = parseFloat(el('col-inflation')?.value) || 0;
    const returnRate = parseFloat(el('col-return')?.value) || 0;
    const currentSavings = parseFloat(el('col-savings')?.value) || 0;
    const monthlyDeposit = parseFloat(el('col-monthly')?.value) || 0;

    const yearsToCollege = Math.max(0, startAge - childAge);
    const rInf = inflation / 100;
    const rRet = (returnRate / 100) / 12;
    const totalMonths = yearsToCollege * 12;

    // Inflated 4-year tuition
    let totalCollegeCost = 0;
    for (let k = 0; k < 4; k++) {
      totalCollegeCost += annualCost * Math.pow(1 + rInf, yearsToCollege + k);
    }

    // Future 529 savings balance
    const fvInitial = currentSavings * Math.pow(1 + rRet, totalMonths);
    const fvDeposits = rRet > 0 ? monthlyDeposit * ((Math.pow(1 + rRet, totalMonths) - 1) / rRet) : monthlyDeposit * totalMonths;
    const projectedSavings = fvInitial + fvDeposits;

    const fundingGap = projectedSavings - totalCollegeCost;
    const compoundGrowth = Math.max(0, projectedSavings - (currentSavings + (monthlyDeposit * totalMonths)));

    // Required monthly savings to hit 100% of college costs
    const neededFromDeposits = Math.max(0, totalCollegeCost - fvInitial);
    const reqMonthly = (rRet > 0 && totalMonths > 0)
      ? neededFromDeposits / ((Math.pow(1 + rRet, totalMonths) - 1) / rRet)
      : (totalMonths > 0 ? neededFromDeposits / totalMonths : 0);

    if (el('res-col-total-cost')) el('res-col-total-cost').textContent = this.formatCurrency(totalCollegeCost);
    if (el('res-col-savings-val')) el('res-col-savings-val').textContent = this.formatCurrency(projectedSavings);
    if (el('res-col-gap')) {
      el('res-col-gap').textContent = fundingGap >= 0 ? `+${this.formatCurrency(fundingGap)} Surplus` : `-${this.formatCurrency(Math.abs(fundingGap))} Shortfall`;
      el('res-col-gap').style.color = fundingGap >= 0 ? 'var(--accent-green)' : 'var(--accent-rose)';
    }
    if (el('res-col-req-monthly')) el('res-col-req-monthly').textContent = `${this.formatCurrency(reqMonthly)} /mo`;
    if (el('res-col-years')) el('res-col-years').textContent = `${yearsToCollege} Years`;
    if (el('res-col-growth')) el('res-col-growth').textContent = `+${this.formatCurrency(compoundGrowth)}`;
  },

  // ------------------------------------------------------------------------
  // 62. DEPRECIATION CALCULATOR
  // ------------------------------------------------------------------------
  depMethod: 'sl',
  calcDepreciation() {
    const el = id => document.getElementById(id);
    const cost = parseFloat(el('dep-cost')?.value) || 0;
    const salvage = parseFloat(el('dep-salvage')?.value) || 0;
    const life = Math.max(1, parseInt(el('dep-life')?.value) || 5);
    const method = el('dep-method')?.value || this.depMethod;

    const base = Math.max(0, cost - salvage);
    const slRate = 1 / life;
    const schedule = [];

    let currentBv = cost;
    let totalAccDep = 0;

    for (let t = 1; t <= life; t++) {
      const startBv = currentBv;
      let depExpense = 0;

      if (method === 'sl') {
        depExpense = base / life;
      } else if (method === 'ddb') {
        const rate = 2 / life;
        depExpense = Math.min(currentBv * rate, Math.max(0, currentBv - salvage));
      } else if (method === 'db150') {
        const rate = 1.5 / life;
        depExpense = Math.min(currentBv * rate, Math.max(0, currentBv - salvage));
      } else if (method === 'syd') {
        const sydSum = (life * (life + 1)) / 2;
        const remainingLife = life - t + 1;
        depExpense = base * (remainingLife / sydSum);
      }

      // Safeguard not to depreciate below salvage
      depExpense = Math.min(depExpense, Math.max(0, currentBv - salvage));
      totalAccDep += depExpense;
      currentBv = Math.max(salvage, currentBv - depExpense);

      schedule.push({
        year: t,
        startBv,
        depExpense,
        accDep: totalAccDep,
        endingBv: currentBv
      });
    }

    const y1Expense = schedule.length > 0 ? schedule[0].depExpense : 0;
    const y1EndingBv = schedule.length > 0 ? schedule[0].endingBv : cost;
    const totalDepPct = cost > 0 ? (totalAccDep / cost) * 100 : 0;

    if (el('res-dep-y1')) el('res-dep-y1').textContent = this.formatCurrency(y1Expense);
    if (el('res-dep-base')) el('res-dep-base').textContent = this.formatCurrency(base);
    if (el('res-dep-rate')) el('res-dep-rate').textContent = `${(slRate * 100).toFixed(2)}%/yr`;
    if (el('res-dep-ending-bv')) el('res-dep-ending-bv').textContent = this.formatCurrency(currentBv);
    if (el('res-dep-y1-bv')) el('res-dep-y1-bv').textContent = this.formatCurrency(y1EndingBv);
    if (el('res-dep-pct')) el('res-dep-pct').textContent = `${totalDepPct.toFixed(1)}%`;

    const tbody = el('dep-schedule-body');
    if (tbody) {
      let html = '';
      schedule.forEach(row => {
        html += `
          <tr>
            <td><strong>Year ${row.year}</strong></td>
            <td>${this.formatCurrency(row.startBv)}</td>
            <td style="color:var(--accent-rose); font-weight:600;">-${this.formatCurrency(row.depExpense)}</td>
            <td>${this.formatCurrency(row.accDep)}</td>
            <td style="text-align:right; font-weight:700; color:var(--text-primary);">${this.formatCurrency(row.endingBv)}</td>
          </tr>
        `;
      });
      tbody.innerHTML = html;
    }
  },

  // ------------------------------------------------------------------------
  // 64. MARGIN CALCULATOR
  // ------------------------------------------------------------------------
  mgMode: 'cost-margin',
  calcMargin() {
    const el = id => document.getElementById(id);
    const cost = parseFloat(el('mg-cost')?.value) || 0;
    let margin = parseFloat(el('mg-margin')?.value) || 0;
    let revenue = parseFloat(el('mg-revenue')?.value) || 0;
    let markup = parseFloat(el('mg-markup')?.value) || 0;
    let profit = 0;

    if (this.mgMode === 'cost-margin') {
      const m = margin / 100;
      revenue = m < 1 ? cost / (1 - m) : 0;
      profit = revenue - cost;
      markup = cost > 0 ? (profit / cost) * 100 : 0;
      if (el('mg-revenue')) el('mg-revenue').value = revenue.toFixed(2);
      if (el('mg-markup')) el('mg-markup').value = markup.toFixed(2);
    } else if (this.mgMode === 'cost-rev') {
      profit = revenue - cost;
      margin = revenue > 0 ? (profit / revenue) * 100 : 0;
      markup = cost > 0 ? (profit / cost) * 100 : 0;
      if (el('mg-margin')) el('mg-margin').value = margin.toFixed(2);
      if (el('mg-markup')) el('mg-markup').value = markup.toFixed(2);
    } else {
      profit = cost * (markup / 100);
      revenue = cost + profit;
      margin = revenue > 0 ? (profit / revenue) * 100 : 0;
      if (el('mg-revenue')) el('mg-revenue').value = revenue.toFixed(2);
      if (el('mg-margin')) el('mg-margin').value = margin.toFixed(2);
    }

    const cogsRatio = revenue > 0 ? (cost / revenue) * 100 : 0;
    const profitMultiplier = cost > 0 ? revenue / cost : 1;

    if (el('res-mg-revenue-val')) el('res-mg-revenue-val').textContent = this.formatCurrency(revenue);
    if (el('res-mg-profit-val')) el('res-mg-profit-val').textContent = `+${this.formatCurrency(profit)}`;
    if (el('res-mg-margin-val')) el('res-mg-margin-val').textContent = `${margin.toFixed(2)}%`;
    if (el('res-mg-markup-val')) el('res-mg-markup-val').textContent = `${markup.toFixed(2)}%`;
    if (el('res-mg-cogs-ratio')) el('res-mg-cogs-ratio').textContent = `${cogsRatio.toFixed(2)}%`;
    if (el('res-mg-multiplier')) el('res-mg-multiplier').textContent = `${profitMultiplier.toFixed(2)}x`;

    if (el('res-mg-cost-legend')) el('res-mg-cost-legend').textContent = `${this.formatCurrency(cost)} (${cogsRatio.toFixed(0)}%)`;
    if (el('res-mg-profit-legend')) el('res-mg-profit-legend').textContent = `${this.formatCurrency(profit)} (${margin.toFixed(0)}%)`;
    if (el('res-mg-bar-cost')) el('res-mg-bar-cost').style.width = `${Math.min(100, Math.max(0, cogsRatio))}%`;
    if (el('res-mg-bar-profit')) el('res-mg-bar-profit').style.width = `${Math.min(100, Math.max(0, margin))}%`;
  },

  // ------------------------------------------------------------------------
  // 65. DISCOUNT CALCULATOR
  // ------------------------------------------------------------------------
  calcDiscount() {
    const el = id => document.getElementById(id);
    const origPrice = parseFloat(el('dc-orig-price')?.value) || 0;
    const disc1 = parseFloat(el('dc-disc1')?.value) || 0;
    const disc2 = parseFloat(el('dc-disc2')?.value) || 0;
    const taxRate = parseFloat(el('dc-tax')?.value) || 0;

    const p1 = origPrice * (1 - (disc1 / 100));
    const p2 = p1 * (1 - (disc2 / 100));
    const taxAmt = p2 * (taxRate / 100);
    const finalPrice = p2 + taxAmt;
    const totalSaved = origPrice - p2;
    const effDisc = origPrice > 0 ? (totalSaved / origPrice) * 100 : 0;

    if (el('res-dc-final-price')) el('res-dc-final-price').textContent = this.formatCurrency(finalPrice);
    if (el('res-dc-total-saved')) el('res-dc-total-saved').textContent = `-${this.formatCurrency(totalSaved)} (${effDisc.toFixed(1)}% Off)`;
    if (el('res-dc-p1')) el('res-dc-p1').textContent = this.formatCurrency(p1);
    if (el('res-dc-p2')) el('res-dc-p2').textContent = this.formatCurrency(p2);
    if (el('res-dc-tax-amt')) el('res-dc-tax-amt').textContent = `+${this.formatCurrency(taxAmt)}`;
    if (el('res-dc-eff-disc')) el('res-dc-eff-disc').textContent = `${effDisc.toFixed(2)}%`;
  },

  // ------------------------------------------------------------------------
  // 66. BUSINESS LOAN CALCULATOR
  // ------------------------------------------------------------------------
  calcBusinessLoan() {
    const el = id => document.getElementById(id);
    const amount = parseFloat(el('bl-amount')?.value) || 0;
    const rate = parseFloat(el('bl-rate')?.value) || 0;
    const years = parseFloat(el('bl-term-years')?.value) || 7;
    const feePct = parseFloat(el('bl-fee')?.value) || 0;
    const ebitda = parseFloat(el('bl-ebitda')?.value) || 0;

    const n = years * 12;
    const r = (rate / 100) / 12;
    let monthlyPmt = 0;
    if (r > 0) {
      monthlyPmt = amount * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    } else {
      monthlyPmt = amount / n;
    }

    const annualDebt = monthlyPmt * 12;
    const feeAmt = amount * (feePct / 100);
    const netProceeds = amount - feeAmt;
    const totalInterest = (monthlyPmt * n) - amount;
    const dscr = annualDebt > 0 ? ebitda / annualDebt : 0;

    if (el('res-bl-payment')) el('res-bl-payment').textContent = this.formatCurrency(monthlyPmt);
    if (el('res-bl-dscr-val')) el('res-bl-dscr-val').textContent = `${dscr.toFixed(2)}x`;
    if (el('res-bl-net-proceeds')) el('res-bl-net-proceeds').textContent = this.formatCurrency(netProceeds);
    if (el('res-bl-interest')) el('res-bl-interest').textContent = this.formatCurrency(totalInterest);
    if (el('res-bl-annual-debt')) el('res-bl-annual-debt').textContent = this.formatCurrency(annualDebt);

    const badge = el('res-bl-dscr-badge');
    if (badge) {
      badge.className = 'dscr-badge';
      if (dscr >= 1.25) {
        badge.classList.add('dscr-badge-approved');
        badge.textContent = `DSCR ${dscr.toFixed(2)}x (Approved)`;
      } else if (dscr >= 1.0) {
        badge.classList.add('dscr-badge-tight');
        badge.textContent = `DSCR ${dscr.toFixed(2)}x (Tight / Borderline)`;
      } else {
        badge.classList.add('dscr-badge-risk');
        badge.textContent = `DSCR ${dscr.toFixed(2)}x (High Risk / Denied)`;
      }
    }
  },

  // ------------------------------------------------------------------------
  // 67. PERSONAL LOAN CALCULATOR
  // ------------------------------------------------------------------------
  calcPersonalLoan() {
    const el = id => document.getElementById(id);
    const amount = parseFloat(el('pl-amount')?.value) || 0;
    const apr = parseFloat(el('pl-apr')?.value) || 0;
    const term = parseFloat(el('pl-term')?.value) || 36;
    const feePct = parseFloat(el('pl-fee')?.value) || 0;

    const r = (apr / 100) / 12;
    let monthlyPmt = 0;
    if (r > 0) {
      monthlyPmt = amount * (r * Math.pow(1 + r, term)) / (Math.pow(1 + r, term) - 1);
    } else {
      monthlyPmt = amount / term;
    }

    const feeAmt = amount * (feePct / 100);
    const netCash = amount - feeAmt;
    const totalInterest = (monthlyPmt * term) - amount;
    const totalCost = (monthlyPmt * term) + feeAmt;
    const effApr = apr + (feePct / (term / 12));

    if (el('res-pl-payment')) el('res-pl-payment').textContent = this.formatCurrency(monthlyPmt);
    if (el('res-pl-net-cash')) el('res-pl-net-cash').textContent = this.formatCurrency(netCash);
    if (el('res-pl-interest')) el('res-pl-interest').textContent = this.formatCurrency(totalInterest);
    if (el('res-pl-fee-amt')) el('res-pl-fee-amt').textContent = this.formatCurrency(feeAmt);
    if (el('res-pl-total-cost')) el('res-pl-total-cost').textContent = this.formatCurrency(totalCost);
    if (el('res-pl-eff-apr')) el('res-pl-eff-apr').textContent = `${effApr.toFixed(2)}%`;
  },

  // ------------------------------------------------------------------------
  // 68. BOAT LOAN CALCULATOR
  // ------------------------------------------------------------------------
  calcBoatLoan() {
    const el = id => document.getElementById(id);
    const price = parseFloat(el('bt-price')?.value) || 0;
    const downPct = parseFloat(el('bt-down-pct')?.value) || 0;
    const rate = parseFloat(el('bt-rate')?.value) || 0;
    const years = parseFloat(el('bt-term-years')?.value) || 10;
    const slip = parseFloat(el('bt-slip')?.value) || 0;
    const ins = parseFloat(el('bt-ins')?.value) || 0;
    const maint = parseFloat(el('bt-maint')?.value) || 0;

    const downPayment = price * (downPct / 100);
    const loanBal = Math.max(0, price - downPayment);
    const n = years * 12;
    const r = (rate / 100) / 12;

    let loanPmt = 0;
    if (r > 0 && n > 0) {
      loanPmt = loanBal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    } else if (n > 0) {
      loanPmt = loanBal / n;
    }

    const annualOps = slip + ins + maint;
    const monthlyOps = annualOps / 12;
    const trueMonthly = loanPmt + monthlyOps;
    const totalInterest = (loanPmt * n) - loanBal;
    const totalLifecycle = downPayment + (loanPmt * n) + (annualOps * years);

    if (el('res-bt-true-pmt')) el('res-bt-true-pmt').textContent = `${this.formatCurrency(trueMonthly)} /mo`;
    if (el('res-bt-loan-pmt')) el('res-bt-loan-pmt').textContent = `${this.formatCurrency(loanPmt)} /mo`;
    if (el('res-bt-down-val')) el('res-bt-down-val').textContent = this.formatCurrency(downPayment);
    if (el('res-bt-interest')) el('res-bt-interest').textContent = this.formatCurrency(totalInterest);
    if (el('res-bt-monthly-ops')) el('res-bt-monthly-ops').textContent = `${this.formatCurrency(monthlyOps)} /mo`;
    if (el('res-bt-total-cost')) el('res-bt-total-cost').textContent = this.formatCurrency(totalLifecycle);
  },

  // ------------------------------------------------------------------------
  // 69. GENERAL LEASE CALCULATOR
  // ------------------------------------------------------------------------
  glStruct: 'fmv',
  calcGenLease() {
    const el = id => document.getElementById(id);
    const value = parseFloat(el('gl-value')?.value) || 0;
    const term = parseFloat(el('gl-term')?.value) || 36;
    const rate = parseFloat(el('gl-rate')?.value) || 0;
    const residualPct = this.glStruct === 'dollar' ? 0 : (parseFloat(el('gl-residual')?.value) || 20);
    const advance = parseFloat(el('gl-advance')?.value) || 1;

    const r = (rate / 100) / 12;
    const residualAmt = this.glStruct === 'dollar' ? 1.00 : value * (residualPct / 100);

    let pmt = 0;
    if (r > 0) {
      const discountFactor = Math.pow(1 + r, -term);
      const annuityFactor = (1 - discountFactor) / r;
      pmt = (value - (residualAmt * discountFactor)) / annuityFactor;
    } else {
      pmt = (value - residualAmt) / term;
    }

    const totalLeasePmt = pmt * term;
    const totalCostToOwn = totalLeasePmt + residualAmt;
    const financeCharge = Math.max(0, totalCostToOwn - value);
    const upfrontOutlay = pmt * advance;

    if (el('res-gl-pmt')) el('res-gl-pmt').textContent = this.formatCurrency(pmt);
    if (el('res-gl-buyout-val')) el('res-gl-buyout-val').textContent = this.formatCurrency(residualAmt);
    if (el('res-gl-total-pmt')) el('res-gl-total-pmt').textContent = this.formatCurrency(totalLeasePmt);
    if (el('res-gl-total-cost')) el('res-gl-total-cost').textContent = this.formatCurrency(totalCostToOwn);
    if (el('res-gl-finance-charge')) el('res-gl-finance-charge').textContent = this.formatCurrency(financeCharge);
    if (el('res-gl-upfront')) el('res-gl-upfront').textContent = this.formatCurrency(upfrontOutlay);
  },

  // ------------------------------------------------------------------------
  // 70. BUDGET CALCULATOR (50/30/20 RULE)
  // ------------------------------------------------------------------------
  calcBudget() {
    const el = id => document.getElementById(id);
    const income = parseFloat(el('bg-income')?.value) || 0;
    const actNeeds = parseFloat(el('bg-act-needs')?.value) || 0;
    const actWants = parseFloat(el('bg-act-wants')?.value) || 0;
    const actSavings = parseFloat(el('bg-act-savings')?.value) || 0;

    const targetNeeds = income * 0.50;
    const targetWants = income * 0.30;
    const targetSavings = income * 0.20;

    const needsDiff = actNeeds - targetNeeds;
    const wantsDiff = actWants - targetWants;
    const savingsDiff = actSavings - targetSavings;

    const totalSpent = actNeeds + actWants + actSavings;
    const surplus = income - totalSpent;

    const needsPct = income > 0 ? (actNeeds / income) * 100 : 50;
    const wantsPct = income > 0 ? (actWants / income) * 100 : 30;
    const savingsPct = income > 0 ? (actSavings / income) * 100 : 20;

    if (el('res-bg-status')) {
      el('res-bg-status').textContent = surplus >= 0 ? (surplus === 0 ? 'Perfectly Allocated' : `Surplus of ${this.formatCurrency(surplus)}`) : `Deficit of ${this.formatCurrency(Math.abs(surplus))}`;
      el('res-bg-status').style.color = surplus >= 0 ? 'var(--accent-green)' : 'var(--accent-rose)';
    }
    if (el('res-bg-surplus')) el('res-bg-surplus').textContent = this.formatCurrency(surplus);

    if (el('res-bg-needs-diff')) {
      el('res-bg-needs-diff').textContent = needsDiff > 0 ? `Over by ${this.formatCurrency(needsDiff)}` : `Under by ${this.formatCurrency(Math.abs(needsDiff))}`;
      el('res-bg-needs-diff').style.color = needsDiff > 0 ? 'var(--accent-rose)' : 'var(--accent-green)';
    }
    if (el('res-bg-wants-diff')) {
      el('res-bg-wants-diff').textContent = wantsDiff > 0 ? `Over by ${this.formatCurrency(wantsDiff)}` : `Under by ${this.formatCurrency(Math.abs(wantsDiff))}`;
      el('res-bg-wants-diff').style.color = wantsDiff > 0 ? 'var(--accent-rose)' : 'var(--accent-green)';
    }
    if (el('res-bg-savings-diff')) {
      el('res-bg-savings-diff').textContent = savingsDiff >= 0 ? `Over target +${this.formatCurrency(savingsDiff)}` : `Under target -${this.formatCurrency(Math.abs(savingsDiff))}`;
      el('res-bg-savings-diff').style.color = savingsDiff >= 0 ? 'var(--accent-green)' : 'var(--accent-rose)';
    }
    if (el('res-bg-total-spent')) el('res-bg-total-spent').textContent = this.formatCurrency(totalSpent);

    if (el('res-bg-bar-needs-txt')) el('res-bg-bar-needs-txt').textContent = `${needsPct.toFixed(0)}%`;
    if (el('res-bg-bar-wants-txt')) el('res-bg-bar-wants-txt').textContent = `${wantsPct.toFixed(0)}%`;
    if (el('res-bg-bar-savings-txt')) el('res-bg-bar-savings-txt').textContent = `${savingsPct.toFixed(0)}%`;

    if (el('res-bg-bar-needs')) el('res-bg-bar-needs').style.width = `${Math.min(100, Math.max(0, needsPct))}%`;
    if (el('res-bg-bar-wants')) el('res-bg-bar-wants').style.width = `${Math.min(100, Math.max(0, wantsPct))}%`;
    if (el('res-bg-bar-savings')) el('res-bg-bar-savings').style.width = `${Math.min(100, Math.max(0, savingsPct))}%`;
  },

  // ------------------------------------------------------------------------
  // 71. COMMISSION CALCULATOR
  // ------------------------------------------------------------------------
  cmStruct: 'flat',
  calcCommission() {
    const el = id => document.getElementById(id);
    const grossSales = parseFloat(el('cm-sales')?.value) || 0;
    const baseSalary = parseFloat(el('cm-base')?.value) || 0;
    const returns = parseFloat(el('cm-returns')?.value) || 0;
    const flatRate = parseFloat(el('cm-flat-rate')?.value) || 0;

    const t1Limit = parseFloat(el('cm-t1-limit')?.value) || 50000;
    const t1Pct = parseFloat(el('cm-t1-pct')?.value) || 5.0;
    const t2Limit = parseFloat(el('cm-t2-limit')?.value) || 100000;
    const t2Pct = parseFloat(el('cm-t2-pct')?.value) || 8.0;
    const t3Pct = parseFloat(el('cm-t3-pct')?.value) || 12.0;

    const netSales = Math.max(0, grossSales - returns);
    let commission = 0;

    if (this.cmStruct === 'flat') {
      commission = netSales * (flatRate / 100);
    } else {
      if (netSales <= t1Limit) {
        commission = netSales * (t1Pct / 100);
      } else if (netSales <= t2Limit) {
        commission = (t1Limit * (t1Pct / 100)) + ((netSales - t1Limit) * (t2Pct / 100));
      } else {
        commission = (t1Limit * (t1Pct / 100)) + ((t2Limit - t1Limit) * (t2Pct / 100)) + ((netSales - t2Limit) * (t3Pct / 100));
      }
    }

    const totalComp = baseSalary + commission;
    const effRate = netSales > 0 ? (commission / netSales) * 100 : 0;
    const payShare = totalComp > 0 ? (commission / totalComp) * 100 : 0;

    if (el('res-cm-total-comp')) el('res-cm-total-comp').textContent = this.formatCurrency(totalComp);
    if (el('res-cm-commission-val')) el('res-cm-commission-val').textContent = `+${this.formatCurrency(commission)}`;
    if (el('res-cm-net-sales')) el('res-cm-net-sales').textContent = this.formatCurrency(netSales);
    if (el('res-cm-base-disp')) el('res-cm-base-disp').textContent = this.formatCurrency(baseSalary);
    if (el('res-cm-eff-rate')) el('res-cm-eff-rate').textContent = `${effRate.toFixed(2)}%`;
    if (el('res-cm-pay-share')) el('res-cm-pay-share').textContent = `${payShare.toFixed(1)}%`;
  },
  showCatalog() {
    const catalogView = document.getElementById('fin-catalog-view');
    const detailView = document.getElementById('fin-detail-view');
    if (catalogView) catalogView.style.display = 'block';
    if (detailView) detailView.style.display = 'none';
    if (window.AppRouter && !window.AppRouter.isDispatching) {
      window.AppRouter.onCatalogOpened('financial', this.currentFilter || null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  filterCatalog(filterKey, btnEl) {
    this.currentFilter = filterKey;
    const catalogView = document.getElementById('fin-catalog-view');
    const detailView = document.getElementById('fin-detail-view');
    if (detailView && detailView.style.display !== 'none') {
      detailView.style.display = 'none';
      if (catalogView) catalogView.style.display = 'block';
    }

    // Update active filter pill
    document.querySelectorAll('.fin-filter-pill').forEach(btn => {
      const match = (btnEl && btn === btnEl) || (!btnEl && btn.dataset.filter === filterKey);
      btn.classList.toggle('active', !!match);
    });

    const boxes = document.querySelectorAll('#fin-catalog-view .feature-big-box');
    let visibleCount = 0;
    boxes.forEach(box => {
      const groups = (box.dataset.finGroup || '').split(' ');
      const match = filterKey === 'all' || groups.includes(filterKey);
      box.style.display = match ? 'flex' : 'none';
      if (match) visibleCount++;
    });

    const noResults = document.getElementById('fin-no-results');
    if (noResults) {
      noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }

    if (window.AppRouter && !window.AppRouter.isDispatching) {
      window.AppRouter.onCatalogOpened('financial', filterKey !== 'all' ? filterKey : null);
    }
  },

  searchCatalog(query) {
    const q = (query || '').toLowerCase().trim();
    const detailView = document.getElementById('fin-detail-view');
    const catalogView = document.getElementById('fin-catalog-view');
    if (detailView && detailView.style.display !== 'none' && q !== '') {
      detailView.style.display = 'none';
      if (catalogView) catalogView.style.display = 'block';
    }

    const boxes = document.querySelectorAll('#fin-catalog-view .feature-big-box');
    let visibleCount = 0;
    boxes.forEach(box => {
      const title = box.querySelector('.box-title')?.textContent.toLowerCase() || '';
      const desc = box.querySelector('.box-description')?.textContent.toLowerCase() || '';
      const tags = box.querySelector('.box-tags-row')?.textContent.toLowerCase() || '';
      const keywords = (box.dataset.keywords || '').toLowerCase();
      const match = q === '' || title.includes(q) || desc.includes(q) || tags.includes(q) || keywords.includes(q);
      box.style.display = match ? 'flex' : 'none';
      if (match) visibleCount++;
    });

    const noResults = document.getElementById('fin-no-results');
    if (noResults) {
      noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  },

  resetSearch() {
    const input = document.getElementById('fin-catalog-search');
    if (input) input.value = '';
    this.searchCatalog('');
    const noResults = document.getElementById('fin-no-results');
    if (noResults) noResults.style.display = 'none';
  },

  openCalculator(calcId) {
    const catalogView = document.getElementById('fin-catalog-view');
    const detailView = document.getElementById('fin-detail-view');
    if (catalogView) catalogView.style.display = 'none';
    if (detailView) detailView.style.display = 'block';

    // Show only the selected calculator, hide all others
    document.querySelectorAll('.fin-calc-unit').forEach(panel => {
      panel.style.display = panel.id === calcId ? 'block' : 'none';
    });

    // Update active state on switcher pills
    document.querySelectorAll('#fin-detail-view .switcher-pill').forEach(pill => {
      pill.classList.toggle('active', pill.dataset.target === calcId);
    });

    if (window.AppRouter && !window.AppRouter.isDispatching) {
      window.AppRouter.onCalculatorOpened(calcId, 'financial');
    }

    if (window.ensureCalculatorPdfButton) {
      window.ensureCalculatorPdfButton(calcId);
    }

    if (window.SeoGuide) {
      window.SeoGuide.updateGuide(calcId, 'financial');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  closeCalculator() {
    this.showCatalog();
  },

  showCalculator(calcKey) {
    if (calcKey && calcKey !== 'all') {
      this.openCalculator(calcKey);
    } else {
      this.showCatalog();
    }
  },

  // Setup input listeners for dynamic instant calculation
  init() {
    // 0. Currency Selector
    const currSelect = document.getElementById('global-currency-select');
    if (currSelect) {
      currSelect.addEventListener('change', (e) => {
        this.setCurrency(e.target.value);
        window.showToast?.(`Currency set to ${e.target.value}`);
      });
    }

    // Switcher pills inside detail view
    document.querySelectorAll('#fin-detail-view .switcher-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        const target = pill.dataset.target;
        if (target) this.openCalculator(target);
      });
    });

    // 1. Mortgage Inputs & Sliders
    this.syncInputSlider('mort-price', 'mort-price-range', () => this.calcMortgage());
    this.syncInputSlider('mort-down', 'mort-down-range', () => this.calcMortgage());
    this.syncInputSlider('mort-rate', 'mort-rate-range', () => this.calcMortgage());
    ['mort-term', 'mort-tax', 'mort-ins', 'mort-hoa'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcMortgage());
    });
    // Term buttons (30-yr vs 15-yr presets)
    document.querySelectorAll('.mort-term-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        const term = btn.dataset.term;
        const termInput = document.getElementById('mort-term');
        if (termInput) {
          termInput.value = term;
          document.querySelectorAll('.mort-term-preset').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.calcMortgage();
        }
      });
    });

    // 2. Loan Slider Sync
    this.syncInputSlider('loan-amount', 'loan-amount-range', () => this.calcLoanEMI());
    this.syncInputSlider('loan-rate', 'loan-rate-range', () => this.calcLoanEMI());
    this.syncInputSlider('loan-years', 'loan-years-range', () => this.calcLoanEMI());

    // 3. 401(k) Inputs
    ['ret-current-age', 'ret-retire-age', 'ret-current-bal', 'ret-salary', 'ret-contrib-pct', 'ret-match-pct', 'ret-match-cap', 'ret-return-rate', 'ret-salary-growth'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calc401k());
    });

    // 4. Compound Interest Inputs
    ['ci-principal', 'ci-monthly', 'ci-rate', 'ci-years', 'ci-freq'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcCompoundInterest());
    });

    // 5. SIP Inputs
    ['sip-amount', 'sip-rate', 'sip-years'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcSIP());
    });

    // 6. Discount Inputs & US State Presets
    ['disc-price', 'disc-percent', 'disc-coupon', 'disc-tax'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcDiscountTax());
    });
    document.getElementById('us-state-tax-preset')?.addEventListener('change', (e) => {
      if (e.target.value !== 'custom') {
        this.setUSTaxState(parseFloat(e.target.value));
      }
    });

    // 7. Tip Inputs & quick tip chips
    ['tip-bill', 'tip-percent', 'tip-people'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcTipSplit());
    });
    document.querySelectorAll('.tip-chip-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const pct = btn.dataset.tip;
        const tipInput = document.getElementById('tip-percent');
        if (tipInput) {
          tipInput.value = pct;
          document.querySelectorAll('.tip-chip-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.calcTipSplit();
        }
      });
    });

    // 8. ROI Inputs
    ['roi-invested', 'roi-returned'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcROI());
    });

    // 9. Auto Loan Inputs & Sliders
    this.syncInputSlider('auto-price', 'auto-price-range', () => this.calcAutoLoan());
    this.syncInputSlider('auto-down', 'auto-down-range', () => this.calcAutoLoan());
    this.syncInputSlider('auto-rate', 'auto-rate-range', () => this.calcAutoLoan());
    ['auto-tradein', 'auto-tradein-owed', 'auto-tax', 'auto-term', 'auto-fees'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcAutoLoan());
    });
    document.getElementById('auto-tax-mode')?.addEventListener('change', () => this.calcAutoLoan());
    document.querySelectorAll('.auto-term-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        const term = btn.dataset.term;
        const termInput = document.getElementById('auto-term');
        if (termInput) {
          termInput.value = term;
          document.querySelectorAll('.auto-term-preset').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.calcAutoLoan();
        }
      });
    });

    // 10. Interest Inputs
    ['int-principal', 'int-rate', 'int-time', 'int-mode', 'int-freq'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcInterest());
      document.getElementById(id)?.addEventListener('change', () => this.calcInterest());
    });

    // 11. Payment Inputs
    ['pay-balance', 'pay-rate', 'pay-goal', 'pay-years', 'pay-fixed-payment'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcPayment());
      document.getElementById(id)?.addEventListener('change', () => this.calcPayment());
    });
    document.getElementById('pay-goal')?.addEventListener('change', (e) => {
      const mode = e.target.value;
      const termGroup = document.getElementById('pay-term-group');
      const fixedGroup = document.getElementById('pay-fixed-group');
      if (termGroup) termGroup.style.display = mode === 'payment' ? 'block' : 'none';
      if (fixedGroup) fixedGroup.style.display = mode === 'timeline' ? 'block' : 'none';
      this.calcPayment();
    });

    // 12. Retirement Inputs
    ['retc-cur-age', 'retc-ret-age', 'retc-savings', 'retc-contrib', 'retc-return', 'retc-income'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcRetirement());
    });

    // 13. Amortization Inputs
    ['amort-loan', 'amort-rate', 'amort-term'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcAmortization());
    });

    // 14. Investment Inputs
    ['inv-initial', 'inv-monthly', 'inv-rate', 'inv-years'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcInvestment());
    });

    // 15. Currency Inputs & Swap
    ['curr-calc-amt', 'curr-calc-from', 'curr-calc-to'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcCurrency());
      document.getElementById(id)?.addEventListener('change', () => this.calcCurrency());
    });
    document.getElementById('curr-swap-btn')?.addEventListener('click', () => this.swapCurrency());

    // 16. Inflation Inputs
    ['inf-amount', 'inf-rate', 'inf-years'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcInflation());
    });

    // 17. Finance TVM Inputs
    ['tvm-pv', 'tvm-fv', 'tvm-pmt', 'tvm-n', 'tvm-rate', 'tvm-mode'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcFinanceTVM('fv'));
      document.getElementById(id)?.addEventListener('change', () => this.calcFinanceTVM('fv'));
    });
    document.querySelectorAll('.tvm-action-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.target;
        if (target) {
          document.querySelectorAll('.tvm-action-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.calcFinanceTVM(target);
        }
      });
    });

    // 19. Pension Inputs
    ['pension-fas', 'pension-service-years', 'pension-multiplier', 'pension-cur-age', 'pension-ret-age', 'pension-life-exp', 'pension-cola'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcPension());
    });

    // 20. House Affordability Inputs & Sliders
    this.syncInputSlider('afford-income', 'afford-income-range', () => this.calcHouseAffordability());
    this.syncInputSlider('afford-down', 'afford-down-range', () => this.calcHouseAffordability());
    this.syncInputSlider('afford-rate', 'afford-rate-range', () => this.calcHouseAffordability());
    ['afford-debt', 'afford-term', 'afford-tax-rate', 'afford-ins-annual', 'afford-hoa'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcHouseAffordability());
    });
    document.querySelectorAll('.afford-term-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        const term = btn.dataset.term;
        const termInput = document.getElementById('afford-term');
        if (termInput) {
          termInput.value = term;
          document.querySelectorAll('.afford-term-preset').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.calcHouseAffordability();
        }
      });
    });

    // 21. Social Security Inputs & Slider
    this.syncInputSlider('ss-claim-age', 'ss-claim-age-range', () => this.calcSocialSecurity());
    ['ss-salary', 'ss-current-age', 'ss-claim-age', 'ss-life-exp'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcSocialSecurity());
    });
    document.querySelectorAll('.ss-age-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        const age = btn.dataset.age;
        const ageInput = document.getElementById('ss-claim-age');
        const ageRange = document.getElementById('ss-claim-age-range');
        if (ageInput) ageInput.value = age;
        if (ageRange) ageRange.value = age;
        document.querySelectorAll('.ss-age-chip').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.calcSocialSecurity();
      });
    });

    // 22. Rent Inputs & Sliders
    this.syncInputSlider('rent-income', 'rent-income-range', () => this.calcRent());
    ['rent-debt', 'rent-utilities', 'rent-savings-goal'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcRent());
    });

    // 23. Annuity Accumulation Inputs
    ['ann-initial', 'ann-monthly', 'ann-rate', 'ann-years', 'ann-freq', 'ann-tax'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcAnnuity());
      document.getElementById(id)?.addEventListener('change', () => this.calcAnnuity());
    });

    // 24. Debt-to-Income (DTI) Inputs & Sliders
    this.syncInputSlider('dti-income', 'dti-income-range', () => this.calcDTI());
    this.syncInputSlider('dti-housing', 'dti-housing-range', () => this.calcDTI());
    ['dti-auto', 'dti-student', 'dti-cc', 'dti-other'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcDTI());
    });

    // 25. Annuity Payout Inputs
    ['payout-principal', 'payout-years', 'payout-freq', 'payout-rate', 'payout-timing', 'payout-type'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcAnnuityPayout());
      document.getElementById(id)?.addEventListener('change', () => this.calcAnnuityPayout());
    });

    // 26. Real Estate Inputs & Sliders
    this.syncInputSlider('re-price', 're-price-range', () => this.calcRealEstate());
    this.syncInputSlider('re-rent', 're-rent-range', () => this.calcRealEstate());
    ['re-down-pct', 're-rate', 're-term', 're-vacancy', 're-tax-yr', 're-ins-yr', 're-hoa', 're-mgmt-pct', 're-maint-pct', 're-closing-pct'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcRealEstate());
    });

    // 27. Roth IRA Inputs
    ['roth-cur-age', 'roth-ret-age', 'roth-cur-bal', 'roth-annual-contrib', 'roth-return-rate', 'roth-ret-tax'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcRothIRA());
    });
    document.querySelectorAll('.roth-contrib-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        const val = btn.dataset.val;
        const contribInput = document.getElementById('roth-annual-contrib');
        if (contribInput) {
          contribInput.value = val;
          document.querySelectorAll('.roth-contrib-preset').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.calcRothIRA();
        }
      });
    });

    // 28. Refinance Calculator
    this.syncInputSlider('refi-cur-balance', 'refi-cur-balance-range', () => this.calcRefinance());
    this.syncInputSlider('refi-new-rate', 'refi-new-rate-range', () => this.calcRefinance());
    ['refi-cur-balance', 'refi-cur-rate', 'refi-cur-term-rem', 'refi-new-rate', 'refi-new-term', 'refi-closing-costs', 'refi-cash-out'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcRefinance());
    });
    document.querySelectorAll('.refi-term-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        const term = btn.dataset.term;
        const termInput = document.getElementById('refi-new-term');
        if (termInput) {
          termInput.value = term;
          document.querySelectorAll('.refi-term-preset').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.calcRefinance();
        }
      });
    });

    // 29. Traditional IRA Calculator
    ['ira-cur-age', 'ira-ret-age', 'ira-cur-bal', 'ira-annual-contrib', 'ira-return-rate', 'ira-current-tax', 'ira-ret-tax'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcIRA());
    });
    document.querySelectorAll('.ira-contrib-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        const val = btn.dataset.val;
        const contribInput = document.getElementById('ira-annual-contrib');
        if (contribInput) {
          contribInput.value = val;
          document.querySelectorAll('.ira-contrib-preset').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.calcIRA();
        }
      });
    });

    // 30. Rental Property Calculator
    this.syncInputSlider('rental-price', 'rental-price-range', () => this.calcRentalProperty());
    this.syncInputSlider('rental-gross-rent', 'rental-gross-rent-range', () => this.calcRentalProperty());
    ['rental-price', 'rental-down-pct', 'rental-rate', 'rental-term', 'rental-gross-rent', 'rental-other-inc', 'rental-vacancy', 'rental-tax-yr', 'rental-ins-yr', 'rental-hoa', 'rental-mgmt', 'rental-maint', 'rental-capex', 'rental-closing-costs'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcRentalProperty());
    });

    // 31. RMD Calculator
    this.syncInputSlider('rmd-balance', 'rmd-balance-range', () => this.calcRMD());
    this.syncInputSlider('rmd-age', 'rmd-age-range', () => this.calcRMD());
    ['rmd-balance', 'rmd-age', 'rmd-tax-rate'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcRMD());
    });
    document.querySelectorAll('.rmd-age-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        const age = btn.dataset.age;
        const ageInput = document.getElementById('rmd-age');
        const ageRange = document.getElementById('rmd-age-range');
        if (ageInput) ageInput.value = age;
        if (ageRange) ageRange.value = age;
        document.querySelectorAll('.rmd-age-preset').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.calcRMD();
      });
    });

    // 32. APR Calculator
    this.syncInputSlider('apr-loan-amt', 'apr-loan-amt-range', () => this.calcAPR());
    this.syncInputSlider('apr-rate', 'apr-rate-range', () => this.calcAPR());
    ['apr-loan-amt', 'apr-rate', 'apr-term', 'apr-points', 'apr-origination', 'apr-other-fees'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcAPR());
    });

    // 33. FHA Loan Calculator
    this.syncInputSlider('fha-price', 'fha-price-range', () => this.calcFHALoan());
    this.syncInputSlider('fha-rate', 'fha-rate-range', () => this.calcFHALoan());
    ['fha-price', 'fha-down-pct', 'fha-rate', 'fha-term', 'fha-tax-yr', 'fha-ins-yr', 'fha-hoa'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcFHALoan());
    });
    document.querySelectorAll('.fha-down-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        const down = btn.dataset.down;
        const downInput = document.getElementById('fha-down-pct');
        if (downInput) {
          downInput.value = down;
          document.querySelectorAll('.fha-down-preset').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.calcFHALoan();
        }
      });
    });

    // 34. VA Mortgage Calculator
    this.syncInputSlider('va-price', 'va-price-range', () => this.calcVAMortgage());
    this.syncInputSlider('va-rate', 'va-rate-range', () => this.calcVAMortgage());
    ['va-price', 'va-down-pct', 'va-rate', 'va-term', 'va-tax-yr', 'va-ins-yr'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcVAMortgage());
    });
    ['va-usage', 'va-disability'].forEach(id => {
      document.getElementById(id)?.addEventListener('change', () => this.calcVAMortgage());
    });

    // 35. Home Equity Loan Calculator
    this.syncInputSlider('he-home-value', 'he-home-value-range', () => this.calcHomeEquityLoan());
    this.syncInputSlider('he-loan-amount', 'he-loan-amount-range', () => this.calcHomeEquityLoan());
    ['he-home-value', 'he-first-balance', 'he-loan-amount', 'he-rate', 'he-term', 'he-max-cltv'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcHomeEquityLoan());
    });

    // 36. HELOC Calculator
    this.syncInputSlider('heloc-home-value', 'heloc-home-value-range', () => this.calcHELOC());
    this.syncInputSlider('heloc-draw-amount', 'heloc-draw-amount-range', () => this.calcHELOC());
    ['heloc-home-value', 'heloc-mortgage', 'heloc-max-cltv', 'heloc-draw-amount', 'heloc-rate', 'heloc-draw-years', 'heloc-repay-years'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcHELOC());
    });

    // 37. Down Payment Calculator
    this.syncInputSlider('down-target-price', 'down-target-price-range', () => this.calcDownPayment());
    this.syncInputSlider('down-monthly-save', 'down-monthly-save-range', () => this.calcDownPayment());
    ['down-target-price', 'down-target-pct', 'down-closing-pct', 'down-cur-saved', 'down-monthly-save', 'down-hysa-rate'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcDownPayment());
    });
    document.querySelectorAll('.down-pct-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        const pct = btn.dataset.pct;
        const pctInput = document.getElementById('down-target-pct');
        if (pctInput) {
          pctInput.value = pct;
          document.querySelectorAll('.down-pct-preset').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.calcDownPayment();
        }
      });
    });

    // 38. Rent vs Buy Calculator
    this.syncInputSlider('rvb-home-price', 'rvb-home-price-range', () => this.calcRentVsBuy());
    this.syncInputSlider('rvb-cur-rent', 'rvb-cur-rent-range', () => this.calcRentVsBuy());
    ['rvb-home-price', 'rvb-down-pct', 'rvb-mort-rate', 'rvb-mort-term', 'rvb-home-growth', 'rvb-tax-rate', 'rvb-maint-ins', 'rvb-cur-rent', 'rvb-rent-growth', 'rvb-invest-rate', 'rvb-years-stay'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcRentVsBuy());
    });
    document.querySelectorAll('.rvb-stay-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        const stay = btn.dataset.stay;
        const stayInput = document.getElementById('rvb-years-stay');
        if (stayInput) {
          stayInput.value = stay;
          document.querySelectorAll('.rvb-stay-preset').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.calcRentVsBuy();
        }
      });
    });

    // 34. US Federal & State Income Tax Calculator
    this.syncInputSlider('tax-gross-income', 'tax-gross-income-range', () => this.calcIncomeTax());
    ['tax-gross-income', 'tax-itemized-amt', 'tax-pretax', 'tax-state-custom'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcIncomeTax());
    });
    ['tax-filing-status', 'tax-ded-type', 'tax-state'].forEach(id => {
      document.getElementById(id)?.addEventListener('change', () => this.calcIncomeTax());
    });
    document.querySelectorAll('.tax-preset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const gross = btn.dataset.gross;
        const status = btn.dataset.status;
        const grossInput = document.getElementById('tax-gross-income');
        const grossRange = document.getElementById('tax-gross-income-range');
        const statusSelect = document.getElementById('tax-filing-status');
        if (grossInput) grossInput.value = gross;
        if (grossRange) grossRange.value = gross;
        if (statusSelect) statusSelect.value = status;
        document.querySelectorAll('.tax-preset-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.calcIncomeTax();
      });
    });

    // 35. Salary & Wage Conversion Calculator
    this.syncInputSlider('sal-hours-week', 'sal-hours-week-range', () => this.calcSalary());
    this.syncInputSlider('sal-days-week', 'sal-days-week-range', () => this.calcSalary());
    this.syncInputSlider('sal-ot-hours', 'sal-ot-hours-range', () => this.calcSalary());
    ['sal-amount', 'sal-hours-week', 'sal-days-week', 'sal-pto-days', 'sal-bonus', 'sal-ot-hours'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcSalary());
    });
    ['sal-frequency', 'sal-ot-multiplier'].forEach(id => {
      document.getElementById(id)?.addEventListener('change', () => this.calcSalary());
    });
    document.querySelectorAll('.sal-preset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const amt = btn.dataset.amt;
        const freq = btn.dataset.freq;
        const amtInput = document.getElementById('sal-amount');
        const freqSelect = document.getElementById('sal-frequency');
        if (amtInput) amtInput.value = amt;
        if (freqSelect) freqSelect.value = freq;
        document.querySelectorAll('.sal-preset-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.calcSalary();
      });
    });

    // 36. Marriage Tax Calculator
    this.syncInputSlider('mrg-sp1-income', 'mrg-sp1-income-range', () => this.calcMarriageTax());
    this.syncInputSlider('mrg-sp2-income', 'mrg-sp2-income-range', () => this.calcMarriageTax());
    ['mrg-sp1-income', 'mrg-sp1-pretax', 'mrg-sp2-income', 'mrg-sp2-pretax', 'mrg-children', 'mrg-state-rate'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcMarriageTax());
    });
    document.querySelectorAll('.mrg-preset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const sp1 = btn.dataset.sp1;
        const sp2 = btn.dataset.sp2;
        const sp1Input = document.getElementById('mrg-sp1-income');
        const sp1Range = document.getElementById('mrg-sp1-income-range');
        const sp2Input = document.getElementById('mrg-sp2-income');
        const sp2Range = document.getElementById('mrg-sp2-income-range');
        if (sp1Input) sp1Input.value = sp1;
        if (sp1Range) sp1Range.value = sp1;
        if (sp2Input) sp2Input.value = sp2;
        if (sp2Range) sp2Range.value = sp2;
        document.querySelectorAll('.mrg-preset-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.calcMarriageTax();
      });
    });

    // 37. Estate Tax Calculator
    ['est-real-estate', 'est-investments', 'est-cash', 'est-retirement', 'est-life-ins', 'est-business', 'est-debts', 'est-admin', 'est-charity', 'est-spousal', 'est-exemption-custom', 'est-prior-gifts', 'est-state-custom'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcEstateTax());
    });
    ['est-exemption-preset', 'est-state-choice'].forEach(id => {
      document.getElementById(id)?.addEventListener('change', () => this.calcEstateTax());
    });
    document.querySelectorAll('.est-preset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const gross = parseFloat(btn.dataset.gross) || 0;
        const reInput = document.getElementById('est-real-estate');
        const invInput = document.getElementById('est-investments');
        const cashInput = document.getElementById('est-cash');
        if (reInput && invInput && cashInput) {
          reInput.value = Math.round(gross * 0.4);
          invInput.value = Math.round(gross * 0.45);
          cashInput.value = Math.round(gross * 0.15);
        }
        document.querySelectorAll('.est-preset-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.calcEstateTax();
      });
    });

    // 38. Take-Home Paycheck Calculator
    this.syncInputSlider('chk-gross-pay', 'chk-gross-pay-range', () => this.calcPaycheck());
    ['chk-gross-pay', 'chk-children', 'chk-extra-withhold', 'chk-pretax-401k', 'chk-pretax-health', 'chk-pretax-dental', 'chk-pretax-hsa', 'chk-posttax-roth', 'chk-posttax-other', 'chk-state-custom'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcPaycheck());
    });
    ['chk-frequency', 'chk-filing-status', 'chk-state'].forEach(id => {
      document.getElementById(id)?.addEventListener('change', () => this.calcPaycheck());
    });
    document.querySelectorAll('.chk-preset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const gross = btn.dataset.gross;
        const freq = btn.dataset.freq;
        const grossInput = document.getElementById('chk-gross-pay');
        const grossRange = document.getElementById('chk-gross-pay-range');
        const freqSelect = document.getElementById('chk-frequency');
        if (grossInput) grossInput.value = gross;
        if (grossRange) grossRange.value = gross;
        if (freqSelect) {
          if (freq === 'biweekly') freqSelect.value = '26';
          else if (freq === 'semimonthly') freqSelect.value = '24';
          else if (freq === 'weekly') freqSelect.value = '52';
          else if (freq === 'monthly') freqSelect.value = '12';
        }
        document.querySelectorAll('.chk-preset-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.calcPaycheck();
      });
    });

    // 39. Cash Back or Low Interest Inputs & Sliders
    this.syncInputSlider('reb-price', 'reb-price-range', () => this.calcAutoRebate());
    this.syncInputSlider('reb-down', 'reb-down-range', () => this.calcAutoRebate());
    ['reb-term', 'reb-cashback', 'reb-std-rate', 'reb-low-rate'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcAutoRebate());
    });
    document.querySelectorAll('.reb-term-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        const term = btn.dataset.term;
        const termInput = document.getElementById('reb-term');
        if (termInput) {
          termInput.value = term;
          document.querySelectorAll('.reb-term-preset').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.calcAutoRebate();
        }
      });
    });

    // 40. Auto Lease Inputs & Sliders
    this.syncInputSlider('lse-residual-pct', 'lse-residual-pct-range', () => this.calcAutoLease());
    ['lse-msrp', 'lse-price', 'lse-term', 'lse-down', 'lse-rebates', 'lse-acq-fee', 'lse-disp-fee', 'lse-tax-rate'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcAutoLease());
    });
    document.getElementById('lse-cap-acq')?.addEventListener('change', () => this.calcAutoLease());
    // Money factor & APR synchronization
    document.getElementById('lse-money-factor')?.addEventListener('input', (e) => {
      const mf = parseFloat(e.target.value) || 0;
      const aprInput = document.getElementById('lse-apr');
      if (aprInput) aprInput.value = (mf * 2400).toFixed(2);
      this.calcAutoLease();
    });
    document.getElementById('lse-apr')?.addEventListener('input', (e) => {
      const apr = parseFloat(e.target.value) || 0;
      const mfInput = document.getElementById('lse-money-factor');
      if (mfInput) mfInput.value = (apr / 2400).toFixed(5);
      this.calcAutoLease();
    });
    document.querySelectorAll('.lse-term-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        const term = btn.dataset.term;
        const termInput = document.getElementById('lse-term');
        if (termInput) {
          termInput.value = term;
          document.querySelectorAll('.lse-term-preset').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.calcAutoLease();
        }
      });
    });

    // 41. Interest Rate Calculator Listeners
    document.querySelectorAll('.ir-mode-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        this.irMode = btn.dataset.mode;
        document.querySelectorAll('.ir-mode-preset').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const pmtGroup = document.getElementById('ir-group-payment');
        const fvGroup = document.getElementById('ir-group-target-fv');
        if (pmtGroup) pmtGroup.style.display = this.irMode === 'loan' ? 'block' : 'none';
        if (fvGroup) fvGroup.style.display = this.irMode === 'investment' ? 'block' : 'none';
        this.calcInterestRate();
      });
    });
    ['ir-principal', 'ir-payment', 'ir-target-fv', 'ir-years', 'ir-months'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcInterestRate());
    });
    document.getElementById('ir-freq')?.addEventListener('change', () => this.calcInterestRate());

    // 42. Savings Goal Calculator Listeners
    document.querySelectorAll('.svg-mode-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        this.svgMode = btn.dataset.mode;
        document.querySelectorAll('.svg-mode-preset').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const targetGrp = document.getElementById('svg-target-group');
        const depositGrp = document.getElementById('svg-deposit-group');
        if (targetGrp) targetGrp.style.display = this.svgMode === 'goal' ? 'block' : 'none';
        if (depositGrp) depositGrp.style.display = this.svgMode === 'balance' ? 'block' : 'none';
        this.calcSavingsGoal();
      });
    });
    this.syncInputSlider('svg-years', 'svg-years-range', () => this.calcSavingsGoal());
    this.syncInputSlider('svg-rate', 'svg-rate-range', () => this.calcSavingsGoal());
    ['svg-initial', 'svg-target', 'svg-deposit'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcSavingsGoal());
    });
    document.getElementById('svg-freq')?.addEventListener('change', () => this.calcSavingsGoal());

    // 43. Simple Interest Calculator Listeners
    document.querySelectorAll('.si-term-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        const unit = btn.dataset.unit;
        const unitSelect = document.getElementById('si-time-unit');
        if (unitSelect) unitSelect.value = unit;
        document.querySelectorAll('.si-term-preset').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.calcSimpleInterest();
      });
    });
    this.syncInputSlider('si-rate', 'si-rate-range', () => this.calcSimpleInterest());
    ['si-principal', 'si-time-val'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcSimpleInterest());
    });
    ['si-time-unit', 'si-day-convention'].forEach(id => {
      document.getElementById(id)?.addEventListener('change', () => this.calcSimpleInterest());
    });

    // 44. CD Calculator Listeners
    document.querySelectorAll('.cd-term-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        const months = btn.dataset.months;
        const termInput = document.getElementById('cd-term-val');
        const unitSelect = document.getElementById('cd-term-unit');
        if (termInput) termInput.value = months;
        if (unitSelect) unitSelect.value = 'months';
        document.querySelectorAll('.cd-term-preset').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.calcCD();
      });
    });
    this.syncInputSlider('cd-deposit', 'cd-deposit-range', () => this.calcCD());
    this.syncInputSlider('cd-rate', 'cd-rate-range', () => this.calcCD());
    ['cd-term-val', 'cd-tax-rate'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcCD());
    });
    ['cd-term-unit', 'cd-freq', 'cd-penalty-tier'].forEach(id => {
      document.getElementById(id)?.addEventListener('change', () => this.calcCD());
    });

    // 45. Bond Calculator Listeners
    document.querySelectorAll('.bnd-type-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        const par = btn.dataset.par;
        const freq = btn.dataset.freq;
        const parInput = document.getElementById('bnd-par');
        const freqSelect = document.getElementById('bnd-coupon-freq');
        if (parInput) parInput.value = par;
        if (freqSelect) freqSelect.value = freq;
        document.querySelectorAll('.bnd-type-preset').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.calcBond();
      });
    });
    this.syncInputSlider('bnd-coupon-rate', 'bnd-coupon-rate-range', () => this.calcBond());
    this.syncInputSlider('bnd-ytm', 'bnd-ytm-range', () => this.calcBond());
    this.syncInputSlider('bnd-years', 'bnd-years-range', () => this.calcBond());
    ['bnd-par', 'bnd-accrued-days'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcBond());
    });
    document.getElementById('bnd-coupon-freq')?.addEventListener('change', () => this.calcBond());

    // 46. Mutual Fund Calculator Listeners
    document.querySelectorAll('.mf-type-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        this.mfType = btn.dataset.type;
        document.querySelectorAll('.mf-type-preset').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const sipGrp = document.getElementById('mf-group-monthly');
        const lumpGrp = document.getElementById('mf-group-lumpsum');
        if (sipGrp) sipGrp.style.display = (this.mfType === 'sip' || this.mfType === 'both') ? 'block' : 'none';
        if (lumpGrp) lumpGrp.style.display = (this.mfType === 'lumpsum' || this.mfType === 'both') ? 'block' : 'none';
        this.calcMutualFund();
      });
    });
    this.syncInputSlider('mf-return-rate', 'mf-return-rate-range', () => this.calcMutualFund());
    this.syncInputSlider('mf-years', 'mf-years-range', () => this.calcMutualFund());
    this.syncInputSlider('mf-expense-ratio', 'mf-expense-ratio-range', () => this.calcMutualFund());
    ['mf-monthly', 'mf-lumpsum'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcMutualFund());
    });

    // 47. Average Return Calculator Listeners
    this.renderReturnInputs();
    document.getElementById('ret-initial')?.addEventListener('input', () => this.calcAverageReturn());
    document.getElementById('ret-periods-select')?.addEventListener('change', (e) => {
      this.retPeriods = parseInt(e.target.value) || 5;
      this.renderReturnInputs();
      this.calcAverageReturn();
    });
    document.querySelectorAll('.ret-preset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const p = btn.dataset.preset;
        if (p === 'tech') this.annualReturnsList = [25, -15, 30, 10, -5];
        else if (p === 'steady') this.annualReturnsList = [8, 9, 7, 10, 8];
        else if (p === 'wild') this.annualReturnsList = [50, -40, 60, -30, 40];
        document.querySelectorAll('.ret-preset-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.renderReturnInputs();
        this.calcAverageReturn();
      });
    });

    // 48. IRR Calculator Listeners
    this.renderIrrInputs();
    this.syncInputSlider('irr-discount-rate', 'irr-discount-rate-range', () => this.calcIRR());
    document.getElementById('irr-initial-cf')?.addEventListener('input', () => this.calcIRR());
    document.getElementById('irr-add-year-btn')?.addEventListener('click', () => {
      if (this.irrCashFlows.length < 15) {
        this.irrCashFlows.push(40000);
        this.renderIrrInputs();
        this.calcIRR();
      }
    });
    document.getElementById('irr-rem-year-btn')?.addEventListener('click', () => {
      if (this.irrCashFlows.length > 2) {
        this.irrCashFlows.pop();
        this.renderIrrInputs();
        this.calcIRR();
      }
    });
    document.querySelectorAll('.irr-preset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const p = btn.dataset.preset;
        const initInput = document.getElementById('irr-initial-cf');
        if (p === 'expansion') {
          if (initInput) initInput.value = 100000;
          this.irrCashFlows = [30000, 35000, 40000, 45000, 50000];
        } else if (p === 'venture') {
          if (initInput) initInput.value = 150000;
          this.irrCashFlows = [-20000, 10000, 50000, 120000, 250000];
        } else if (p === 'realestate') {
          if (initInput) initInput.value = 80000;
          this.irrCashFlows = [12000, 14000, 16000, 18000, 110000];
        }
        document.querySelectorAll('.irr-preset-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.renderIrrInputs();
        this.calcIRR();
      });
    });

    // 49. Payback Period Calculator Listeners
    this.renderPbInputs();
    this.syncInputSlider('pb-discount-rate', 'pb-discount-rate-range', () => this.calcPayback());
    document.querySelectorAll('.pb-mode-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        this.pbMode = btn.dataset.mode;
        document.querySelectorAll('.pb-mode-preset').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const evenGrp = document.getElementById('pb-group-even');
        const unevenGrp = document.getElementById('pb-group-uneven');
        if (evenGrp) evenGrp.style.display = this.pbMode === 'even' ? 'block' : 'none';
        if (unevenGrp) unevenGrp.style.display = this.pbMode === 'uneven' ? 'block' : 'none';
        this.calcPayback();
      });
    });
    ['pb-initial', 'pb-even-inflow'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcPayback());
    });

    // 50. Present Value Calculator Listeners
    document.querySelectorAll('.pv-type-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        this.pvType = btn.dataset.type;
        document.querySelectorAll('.pv-type-preset').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const fvGrp = document.getElementById('pv-group-fv');
        const pmtGrp = document.getElementById('pv-group-pmt');
        if (fvGrp) fvGrp.style.display = (this.pvType === 'lumpsum' || this.pvType === 'both') ? 'block' : 'none';
        if (pmtGrp) pmtGrp.style.display = (this.pvType === 'annuity' || this.pvType === 'both') ? 'block' : 'none';
        this.calcPresentValue();
      });
    });
    this.syncInputSlider('pv-rate', 'pv-rate-range', () => this.calcPresentValue());
    this.syncInputSlider('pv-years', 'pv-years-range', () => this.calcPresentValue());
    ['pv-fv-amount', 'pv-pmt-amount'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcPresentValue());
    });
    ['pv-freq', 'pv-timing'].forEach(id => {
      document.getElementById(id)?.addEventListener('change', () => this.calcPresentValue());
    });

    // 51. Future Value Calculator Listeners
    document.querySelectorAll('.fv-term-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        const y = btn.dataset.years;
        const yInput = document.getElementById('fv-years');
        const yRange = document.getElementById('fv-years-range');
        if (yInput) yInput.value = y;
        if (yRange) yRange.value = y;
        document.querySelectorAll('.fv-term-preset').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.calcFutureValue();
      });
    });
    this.syncInputSlider('fv-pv-amount', 'fv-pv-amount-range', () => this.calcFutureValue());
    this.syncInputSlider('fv-pmt-amount', 'fv-pmt-amount-range', () => this.calcFutureValue());
    this.syncInputSlider('fv-rate', 'fv-rate-range', () => this.calcFutureValue());
    this.syncInputSlider('fv-years', 'fv-years-range', () => this.calcFutureValue());
    ['fv-freq', 'fv-timing'].forEach(id => {
      document.getElementById(id)?.addEventListener('change', () => this.calcFutureValue());
    });

    // 54. Sales Tax Calculator Listeners
    document.querySelectorAll('.stax-mode-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        this.staxMode = btn.dataset.mode;
        document.querySelectorAll('.stax-mode-preset').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const amtLabel = document.getElementById('stax-amount-label');
        if (amtLabel) {
          amtLabel.textContent = this.staxMode === 'add' ? 'Base Purchase Price (Pre-Tax)' : 'Total Gross Amount (Tax-Inclusive)';
        }
        this.calcSalesTax();
      });
    });
    this.syncInputSlider('stax-state-rate', 'stax-state-rate-range', () => this.calcSalesTax());
    this.syncInputSlider('stax-local-rate', 'stax-local-rate-range', () => this.calcSalesTax());
    document.getElementById('stax-amount')?.addEventListener('input', () => this.calcSalesTax());

    // 55. Credit Card Calculator Listeners
    document.querySelectorAll('.cc-paytype-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        this.ccPayType = btn.dataset.type;
        document.querySelectorAll('.cc-paytype-preset').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const fixedGrp = document.getElementById('cc-group-fixed');
        const minGrp = document.getElementById('cc-group-min');
        if (fixedGrp) fixedGrp.style.display = this.ccPayType === 'fixed' ? 'block' : 'none';
        if (minGrp) minGrp.style.display = this.ccPayType === 'minimum' ? 'grid' : 'none';
        this.calcCreditCard();
      });
    });
    this.syncInputSlider('cc-balance', 'cc-balance-range', () => this.calcCreditCard());
    this.syncInputSlider('cc-apr', 'cc-apr-range', () => this.calcCreditCard());
    ['cc-fixed-payment', 'cc-min-pct', 'cc-min-floor'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcCreditCard());
    });

    // 56. Credit Cards Payoff Calculator Listeners
    document.querySelectorAll('.ccp-term-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        const m = btn.dataset.months;
        const targetInput = document.getElementById('ccp-target-months');
        if (targetInput) targetInput.value = m;
        document.querySelectorAll('.ccp-term-preset').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const modeSelect = document.getElementById('ccp-mode');
        if (modeSelect) modeSelect.value = 'target';
        const targetGrp = document.getElementById('ccp-group-target');
        const pmtGrp = document.getElementById('ccp-group-pmt');
        if (targetGrp) targetGrp.style.display = 'block';
        if (pmtGrp) pmtGrp.style.display = 'none';
        this.calcCCPayoff();
      });
    });
    document.getElementById('ccp-mode')?.addEventListener('change', (e) => {
      const mode = e.target.value;
      const targetGrp = document.getElementById('ccp-group-target');
      const pmtGrp = document.getElementById('ccp-group-pmt');
      if (targetGrp) targetGrp.style.display = mode === 'target' ? 'block' : 'none';
      if (pmtGrp) pmtGrp.style.display = mode === 'fixed' ? 'block' : 'none';
      this.calcCCPayoff();
    });
    this.syncInputSlider('ccp-balance', 'ccp-balance-range', () => this.calcCCPayoff());
    this.syncInputSlider('ccp-apr', 'ccp-apr-range', () => this.calcCCPayoff());
    ['ccp-target-months', 'ccp-fixed-pmt'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcCCPayoff());
    });

    // 57. Debt Payoff Calculator Listeners
    document.querySelectorAll('.dpo-strategy-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        this.dpoStrategy = btn.dataset.strat;
        document.querySelectorAll('.dpo-strategy-preset').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.calcDebtPayoff();
      });
    });
    this.syncInputSlider('dpo-extra', 'dpo-extra-range', () => this.calcDebtPayoff());
    for (let i = 1; i <= 4; i++) {
      ['dpo-n' + i, 'dpo-b' + i, 'dpo-r' + i, 'dpo-m' + i].forEach(id => {
        document.getElementById(id)?.addEventListener('input', () => this.calcDebtPayoff());
      });
    }

    // 58. Debt Consolidation Calculator Listeners
    document.querySelectorAll('.dc-term-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        const y = btn.dataset.years;
        const termInput = document.getElementById('dc-new-term');
        const termRange = document.getElementById('dc-new-term-range');
        if (termInput) termInput.value = y;
        if (termRange) termRange.value = y;
        document.querySelectorAll('.dc-term-preset').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.calcDebtConsolidation();
      });
    });
    this.syncInputSlider('dc-new-apr', 'dc-new-apr-range', () => this.calcDebtConsolidation());
    this.syncInputSlider('dc-new-term', 'dc-new-term-range', () => this.calcDebtConsolidation());
    for (let i = 1; i <= 3; i++) {
      ['dc-b' + i, 'dc-r' + i, 'dc-p' + i].forEach(id => {
        document.getElementById(id)?.addEventListener('input', () => this.calcDebtConsolidation());
      });
    }
    document.getElementById('dc-new-fee')?.addEventListener('input', () => this.calcDebtConsolidation());

    // 59. Repayment Calculator Listeners
    document.querySelectorAll('.rep-freq-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        this.repFreq = btn.dataset.freq;
        document.querySelectorAll('.rep-freq-preset').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.calcRepayment();
      });
    });
    this.syncInputSlider('rep-principal', 'rep-principal-range', () => this.calcRepayment());
    this.syncInputSlider('rep-rate', 'rep-rate-range', () => this.calcRepayment());
    this.syncInputSlider('rep-term-years', 'rep-term-years-range', () => this.calcRepayment());
    document.getElementById('rep-extra')?.addEventListener('input', () => this.calcRepayment());

    // 60. Student Loan Calculator Listeners
    document.querySelectorAll('.sl-plan-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        this.slPlan = btn.dataset.plan;
        document.querySelectorAll('.sl-plan-preset').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const idrGrp = document.getElementById('sl-group-idr');
        if (idrGrp) idrGrp.style.display = this.slPlan === 'idr' ? 'block' : 'none';
        this.calcStudentLoan();
      });
    });
    this.syncInputSlider('sl-balance', 'sl-balance-range', () => this.calcStudentLoan());
    this.syncInputSlider('sl-rate', 'sl-rate-range', () => this.calcStudentLoan());
    ['sl-term', 'sl-agi', 'sl-family', 'sl-growth'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcStudentLoan());
    });

    // 61. College Cost Calculator Listeners
    document.querySelectorAll('.col-type-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        const cost = btn.dataset.cost;
        const costInput = document.getElementById('col-annual-cost');
        if (costInput) costInput.value = cost;
        document.querySelectorAll('.col-type-preset').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.calcCollegeCost();
      });
    });
    ['col-child-age', 'col-start-age', 'col-annual-cost', 'col-inflation', 'col-return', 'col-savings', 'col-monthly'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcCollegeCost());
    });

    // 62. Depreciation Calculator Listeners
    document.querySelectorAll('.dep-method-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        const m = btn.dataset.method;
        const select = document.getElementById('dep-method');
        if (select) select.value = m;
        document.querySelectorAll('.dep-method-preset').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.calcDepreciation();
      });
    });
    this.syncInputSlider('dep-cost', 'dep-cost-range', () => this.calcDepreciation());
    this.syncInputSlider('dep-salvage', 'dep-salvage-range', () => this.calcDepreciation());
    document.getElementById('dep-life')?.addEventListener('input', () => this.calcDepreciation());
    document.getElementById('dep-method')?.addEventListener('change', () => this.calcDepreciation());

    // 64. Margin Calculator Listeners
    document.querySelectorAll('.mg-mode-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        this.mgMode = btn.dataset.mode;
        document.querySelectorAll('.mg-mode-preset').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const grpMargin = document.getElementById('mg-group-margin');
        const grpRev = document.getElementById('mg-group-rev');
        const grpMarkup = document.getElementById('mg-group-markup');
        if (grpMargin) grpMargin.style.display = this.mgMode === 'cost-margin' ? 'block' : 'none';
        if (grpRev) grpRev.style.display = this.mgMode === 'cost-rev' ? 'block' : 'none';
        if (grpMarkup) grpMarkup.style.display = this.mgMode === 'cost-markup' ? 'block' : 'none';
        this.calcMargin();
      });
    });
    this.syncInputSlider('mg-cost', 'mg-cost-range', () => this.calcMargin());
    this.syncInputSlider('mg-margin', 'mg-margin-range', () => this.calcMargin());
    ['mg-revenue', 'mg-markup'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcMargin());
    });

    // 65. Discount Calculator Listeners
    document.querySelectorAll('.dc-disc-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        const d = btn.dataset.disc;
        const discInput = document.getElementById('dc-disc1');
        const discRange = document.getElementById('dc-disc1-range');
        if (discInput) discInput.value = d;
        if (discRange) discRange.value = d;
        document.querySelectorAll('.dc-disc-preset').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.calcDiscount();
      });
    });
    this.syncInputSlider('dc-orig-price', 'dc-orig-price-range', () => this.calcDiscount());
    this.syncInputSlider('dc-disc1', 'dc-disc1-range', () => this.calcDiscount());
    ['dc-disc2', 'dc-tax'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcDiscount());
    });

    // 66. Business Loan Calculator Listeners
    document.querySelectorAll('.bl-term-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        const t = btn.dataset.term;
        const termInput = document.getElementById('bl-term-years');
        if (termInput) termInput.value = t;
        document.querySelectorAll('.bl-term-preset').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.calcBusinessLoan();
      });
    });
    this.syncInputSlider('bl-amount', 'bl-amount-range', () => this.calcBusinessLoan());
    this.syncInputSlider('bl-rate', 'bl-rate-range', () => this.calcBusinessLoan());
    ['bl-term-years', 'bl-fee', 'bl-ebitda'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcBusinessLoan());
    });

    // 67. Personal Loan Calculator Listeners
    document.querySelectorAll('.pl-tier-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        const apr = btn.dataset.apr;
        const aprInput = document.getElementById('pl-apr');
        const aprRange = document.getElementById('pl-apr-range');
        if (aprInput) aprInput.value = apr;
        if (aprRange) aprRange.value = apr;
        document.querySelectorAll('.pl-tier-preset').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.calcPersonalLoan();
      });
    });
    this.syncInputSlider('pl-amount', 'pl-amount-range', () => this.calcPersonalLoan());
    this.syncInputSlider('pl-apr', 'pl-apr-range', () => this.calcPersonalLoan());
    ['pl-term', 'pl-fee'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcPersonalLoan());
      document.getElementById(id)?.addEventListener('change', () => this.calcPersonalLoan());
    });

    // 68. Boat Loan Calculator Listeners
    document.querySelectorAll('.bt-term-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        const t = btn.dataset.term;
        const termInput = document.getElementById('bt-term-years');
        if (termInput) termInput.value = t;
        document.querySelectorAll('.bt-term-preset').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.calcBoatLoan();
      });
    });
    this.syncInputSlider('bt-price', 'bt-price-range', () => this.calcBoatLoan());
    ['bt-down-pct', 'bt-rate', 'bt-term-years', 'bt-slip', 'bt-ins', 'bt-maint'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcBoatLoan());
    });

    // 69. Equipment Lease Calculator Listeners
    document.querySelectorAll('.gl-struct-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        this.glStruct = btn.dataset.struct;
        document.querySelectorAll('.gl-struct-preset').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const resInput = document.getElementById('gl-residual');
        if (resInput) {
          if (this.glStruct === 'dollar') resInput.value = '0';
          else if (this.glStruct === 'fmv') resInput.value = '20';
        }
        this.calcGenLease();
      });
    });
    this.syncInputSlider('gl-value', 'gl-value-range', () => this.calcGenLease());
    ['gl-term', 'gl-rate', 'gl-residual', 'gl-advance'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcGenLease());
    });

    // 70. 50/30/20 Budget Calculator Listeners
    document.querySelectorAll('.bg-income-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        const inc = btn.dataset.inc;
        const incInput = document.getElementById('bg-income');
        const incRange = document.getElementById('bg-income-range');
        if (incInput) incInput.value = inc;
        if (incRange) incRange.value = inc;
        document.querySelectorAll('.bg-income-preset').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.calcBudget();
      });
    });
    this.syncInputSlider('bg-income', 'bg-income-range', () => this.calcBudget());
    ['bg-act-needs', 'bg-act-wants', 'bg-act-savings'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcBudget());
    });

    // 71. Commission Calculator Listeners
    document.querySelectorAll('.cm-struct-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        this.cmStruct = btn.dataset.struct;
        document.querySelectorAll('.cm-struct-preset').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const flatGrp = document.getElementById('cm-group-flat');
        const tierGrp = document.getElementById('cm-group-tiered');
        if (flatGrp) flatGrp.style.display = this.cmStruct === 'flat' ? 'block' : 'none';
        if (tierGrp) tierGrp.style.display = this.cmStruct === 'tiered' ? 'block' : 'none';
        this.calcCommission();
      });
    });
    this.syncInputSlider('cm-sales', 'cm-sales-range', () => this.calcCommission());
    this.syncInputSlider('cm-flat-rate', 'cm-flat-rate-range', () => this.calcCommission());
    ['cm-base', 'cm-returns', 'cm-t1-cap', 'cm-t1-rate', 'cm-t2-cap', 'cm-t2-rate', 'cm-t3-rate'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcCommission());
    });

    // Run all initial calculations
    this.calcMortgage();
    this.calcLoanEMI();
    this.calcAutoLoan();
    this.calcInterest();
    this.calcPayment();
    this.calcRetirement();
    this.calcAmortization();
    this.calcInvestment();
    this.calcCurrency();
    this.calcInflation();
    this.calcFinanceTVM('fv');
    this.calcMortgagePayoff();
    this.calc401k();
    this.calcCompoundInterest();
    this.calcSIP();
    this.calcDiscountTax();
    this.calcTipSplit();
    this.calcROI();
    this.calcPension();
    this.calcHouseAffordability();
    this.calcSocialSecurity();
    this.calcRent();
    this.calcAnnuity();
    this.calcDTI();
    this.calcAnnuityPayout();
    this.calcRealEstate();
    this.calcRothIRA();
    this.calcRefinance();
    this.calcIRA();
    this.calcRentalProperty();
    this.calcRMD();
    this.calcAPR();
    this.calcFHALoan();
    this.calcVAMortgage();
    this.calcHomeEquityLoan();
    this.calcHELOC();
    this.calcDownPayment();
    this.calcRentVsBuy();
    this.calcIncomeTax();
    this.calcSalary();
    this.calcMarriageTax();
    this.calcEstateTax();
    this.calcPaycheck();
    this.calcAutoRebate();
    this.calcAutoLease();
    this.calcInterestRate();
    this.calcSavingsGoal();
    this.calcSimpleInterest();
    this.calcCD();
    this.calcBond();
    this.calcMutualFund();
    this.calcAverageReturn();
    this.calcIRR();
    this.calcPayback();
    this.calcPresentValue();
    this.calcFutureValue();
    this.calcSalesTax();
    this.calcCreditCard();
    this.calcCCPayoff();
    this.calcDebtPayoff();
    this.calcDebtConsolidation();
    this.calcRepayment();
    this.calcStudentLoan();
    this.calcCollegeCost();
    this.calcDepreciation();
    this.calcMargin();
    this.calcDiscount();
    this.calcBusinessLoan();
    this.calcPersonalLoan();
    this.calcBoatLoan();
    this.calcGenLease();
    this.calcBudget();
    this.calcCommission();
  },

  syncInputSlider(numId, rangeId, callback) {
    const numInput = document.getElementById(numId);
    const rangeInput = document.getElementById(rangeId);
    if (!numInput || !rangeInput) return;

    const preview = document.getElementById(`${numId}-val`);
    const updatePreview = () => {
      if (preview) {
        const val = parseFloat(numInput.value) || 0;
        if (numId.includes('rate') || numId.includes('pct')) {
          preview.textContent = `${val}%`;
        } else if (numId.includes('age') || numId.includes('years') || numId.includes('term')) {
          preview.textContent = `${val} Years`;
        } else {
          preview.textContent = this.formatCurrency(val);
        }
      }
    };

    numInput.addEventListener('input', () => {
      rangeInput.value = numInput.value;
      updatePreview();
      if (callback) callback();
    });

    rangeInput.addEventListener('input', () => {
      numInput.value = rangeInput.value;
      updatePreview();
      if (callback) callback();
    });

    updatePreview();
  }
};

window.FinancialCalcs = FinancialCalcs;
