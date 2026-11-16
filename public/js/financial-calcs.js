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
    this.calc401k();
    this.calcSIP();
    this.calcDiscountTax();
    this.calcTipSplit();
    this.calcROI();
    this.calcPension();
    this.calcSocialSecurity();
    this.calcAnnuity();
    this.calcAnnuityPayout();
    this.calcRothIRA();
    this.calcIRA();
    this.calcRMD();
    this.calcHELOC();
    this.calcSalary();
    this.calcAutoRebate();
    this.calcAutoLease();
    this.calcSimpleInterest();
    this.calcBond();
    this.calcMutualFund();
    this.calcAverageReturn();
    this.calcIRR();
    this.calcPayback();
    this.calcPresentValue();
    this.calcFutureValue();
    this.calcCollegeCost();
    this.calcDepreciation();
    this.calcMargin();
    this.calcDiscount();
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

    if (principal <= 0 || tenureYears <= 0) {
      this.updateLoanOutputs(0, 0, 0, 100, 0);
      return;
    }

    const totalMonths = tenureYears * 12;
    if (totalMonths <= 0) {
      this.updateLoanOutputs(0, 0, 0, 100, 0);
      return;
    }

    // Handle 0% interest rate without dividing by zero
    if (annualRate <= 0) {
      const emi = principal / totalMonths;
      this.updateLoanOutputs(emi, 0, principal, 100, 0);
      return;
    }

    const monthlyRate = (annualRate / 12) / 100;
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
  // ------------------------------------------------------------------------
  // 28. FHA LOAN CALCULATOR (Upfront & Monthly MIP Breakdown)
  // ------------------------------------------------------------------------
  // ------------------------------------------------------------------------
  // 29. VA MORTGAGE CALCULATOR (0% Down, $0 PMI & Tiered Funding Fee)
  // ------------------------------------------------------------------------
  // ------------------------------------------------------------------------
  // 30. HOME EQUITY LOAN CALCULATOR (Second Mortgage & CLTV)
  // ------------------------------------------------------------------------
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
  // ------------------------------------------------------------------------
  // 33. RENT VS. BUY CALCULATOR (Wealth Comparison & Break-Even Year)
  // ------------------------------------------------------------------------
  // ------------------------------------------------------------------------
  // 4. COMPOUND INTEREST CALCULATOR
  // ------------------------------------------------------------------------
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
  // 10. INTEREST CALCULATOR (Simple & Compound with Date-to-Date & APY)
  // ------------------------------------------------------------------------
  toggleInterestPeriodMode() {
    const periodMode = document.getElementById('int-period-mode')?.value || 'dates';
    const datesGroup = document.getElementById('int-dates-group');
    const termGroup = document.getElementById('int-term-group');
    const basisGroup = document.getElementById('int-day-basis-group');
    const mode = document.getElementById('int-mode')?.value || 'compound';

    if (datesGroup) datesGroup.style.display = periodMode === 'dates' ? 'grid' : 'none';
    if (termGroup) termGroup.style.display = periodMode === 'term' ? 'block' : 'none';
    if (basisGroup) basisGroup.style.display = (periodMode === 'dates' && mode === 'simple') ? 'block' : 'none';

    this.calcInterest();
  },

  toggleInterestModeControls() {
    const mode = document.getElementById('int-mode')?.value || 'compound';
    const periodMode = document.getElementById('int-period-mode')?.value || 'dates';
    const freqGroup = document.getElementById('int-freq-group');
    const basisGroup = document.getElementById('int-day-basis-group');

    if (freqGroup) freqGroup.style.display = mode === 'compound' ? 'block' : 'none';
    if (basisGroup) basisGroup.style.display = (periodMode === 'dates' && mode === 'simple') ? 'block' : 'none';

    this.calcInterest();
  },

  calcInterest() {
    const principal = parseFloat(document.getElementById('int-principal')?.value) || 0;
    const rate = parseFloat(document.getElementById('int-rate')?.value) || 0;
    const periodMode = document.getElementById('int-period-mode')?.value || 'dates';
    const mode = document.getElementById('int-mode')?.value || 'compound';
    const freq = parseFloat(document.getElementById('int-freq')?.value) || 12;
    const dayBasis = parseFloat(document.getElementById('int-day-basis')?.value) || 365;

    let years = 1;
    let daysCount = 365;
    let durationText = '';

    if (periodMode === 'dates') {
      const startInput = document.getElementById('int-start-date');
      const endInput = document.getElementById('int-end-date');
      if (startInput && !startInput.value) {
        const d = new Date();
        d.setFullYear(d.getFullYear() - 1);
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        startInput.value = `${d.getFullYear()}-${m}-${day}`;
      }
      if (endInput && !endInput.value) {
        const now = new Date();
        const m = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        endInput.value = `${now.getFullYear()}-${m}-${day}`;
      }

      const sStr = startInput?.value;
      const eStr = endInput?.value;
      if (sStr && eStr) {
        const [sy, sm, sd] = sStr.split('-').map(Number);
        const [ey, em, ed] = eStr.split('-').map(Number);
        const d1 = new Date(sy, sm - 1, sd);
        const d2 = new Date(ey, em - 1, ed);
        const diffMs = d2.getTime() - d1.getTime();
        daysCount = Math.round(diffMs / (1000 * 60 * 60 * 24));
        if (daysCount < 0) daysCount = 0;
        years = daysCount / dayBasis;
        durationText = `${daysCount.toLocaleString()} Day${daysCount !== 1 ? 's' : ''} (${years.toFixed(2)} Yrs)`;
      } else {
        years = 1;
        daysCount = 365;
        durationText = '365 Days (1.00 Year)';
      }
    } else {
      years = parseFloat(document.getElementById('int-time')?.value) || 1;
      daysCount = Math.round(years * 365);
      durationText = `${years} Year${years !== 1 ? 's' : ''} (${daysCount.toLocaleString()} Days)`;
    }

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
        if (periodMode === 'dates' && freq === 365) {
          endBalance = principal * Math.pow(1 + (r / 365), daysCount);
        } else {
          endBalance = principal * Math.pow(1 + (r / freq), freq * years);
        }
        totalInterest = endBalance - principal;
        apy = (Math.pow(1 + (r / freq), freq) - 1) * 100;
      }
    }

    const elEnd = document.getElementById('res-int-end-bal');
    const elEarned = document.getElementById('res-int-earned');
    const elApy = document.getElementById('res-int-apy');
    const elDuration = document.getElementById('res-int-duration');

    if (elEnd) elEnd.textContent = this.formatCurrency(endBalance);
    if (elEarned) elEarned.textContent = this.formatCurrency(totalInterest);
    if (elApy) elApy.textContent = `${apy.toFixed(2)}% APY`;
    if (elDuration) elDuration.textContent = durationText;
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
  // ------------------------------------------------------------------------
  // 34. US FEDERAL & STATE INCOME TAX CALCULATOR
  // ------------------------------------------------------------------------
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
  // 37. ESTATE TAX (DEATH TAX) CALCULATOR
  

  // ------------------------------------------------------------------------
  // 38. TAKE-HOME PAYCHECK & NET PAY STUB CALCULATOR
  

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
  // ------------------------------------------------------------------------
  // 42. SAVINGS CALCULATOR (GOAL & BALANCE)
  // ------------------------------------------------------------------------
  svgMode: 'goal',
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
  // ------------------------------------------------------------------------
  // 56. CREDIT CARDS PAYOFF CALCULATOR
  // ------------------------------------------------------------------------
  // ------------------------------------------------------------------------
  // 57. DEBT PAYOFF CALCULATOR (SNOWBALL VS AVALANCHE)
  // ------------------------------------------------------------------------
  dpoStrategy: 'avalanche',
  // ------------------------------------------------------------------------
  // 58. DEBT CONSOLIDATION CALCULATOR
  // ------------------------------------------------------------------------
  // ------------------------------------------------------------------------
  // 59. REPAYMENT CALCULATOR
  // ------------------------------------------------------------------------
  repFreq: 'monthly',
  // ------------------------------------------------------------------------
  // 60. STUDENT LOAN CALCULATOR
  // ------------------------------------------------------------------------
  slPlan: 'standard',
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
  // ------------------------------------------------------------------------
  // 67. PERSONAL LOAN CALCULATOR
  // ------------------------------------------------------------------------
  // ------------------------------------------------------------------------
  // 68. BOAT LOAN CALCULATOR
  // ------------------------------------------------------------------------
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

    // Reset any active search query
    const searchInp = document.getElementById('fin-catalog-search');
    if (searchInp && searchInp.value) {
      searchInp.value = '';
      const clearBtn = document.getElementById('fin-catalog-search-clear');
      if (clearBtn) clearBtn.style.display = 'none';
      const secEl = document.getElementById('fin-search-results-section');
      if (secEl) secEl.style.display = 'none';
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

    // Toggle topic sections so empty ones are hidden
    document.querySelectorAll('#fin-catalog-view .calc-topic-section').forEach(sec => {
      if (sec.id === 'fin-search-results-section') return;
      if (filterKey === 'all') {
        sec.style.display = '';
      } else {
        const hasVisible = Array.from(sec.querySelectorAll('.feature-big-box')).some(b => b.style.display !== 'none');
        sec.style.display = hasVisible ? '' : 'none';
      }
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
    const detailView = document.getElementById('fin-detail-view');
    const catalogView = document.getElementById('fin-catalog-view');
    if (detailView && detailView.style.display !== 'none' && (query || '').trim() !== '') {
      detailView.style.display = 'none';
      if (catalogView) catalogView.style.display = 'block';
    }

    if (window.SuiteSearchEngine) {
      window.SuiteSearchEngine.search('financial', query);
    }
  },

  resetSearch() {
    if (window.SuiteSearchEngine) {
      window.SuiteSearchEngine.reset('financial');
    } else {
      const input = document.getElementById('fin-catalog-search');
      if (input) input.value = '';
    }
  },

  openCalculator(calcId) {
    const catalogView = document.getElementById('fin-catalog-view');
    const detailView = document.getElementById('fin-detail-view');
    if (catalogView) catalogView.style.display = 'none';
    if (detailView) detailView.style.display = 'block';

    if (window.updateActiveCalculatorTitle) {
      window.updateActiveCalculatorTitle('fin', calcId);
    }

    // Show only the selected calculator, hide all others
    document.querySelectorAll('.fin-calc-unit').forEach(panel => {
      panel.style.display = panel.id === calcId ? 'block' : 'none';
    });

    // Update active state on switcher pills
    document.querySelectorAll('#fin-detail-view .switcher-pill').forEach(pill => {
      pill.classList.toggle('active', pill.dataset.target === calcId);
    });

    const activePill = document.querySelector('#fin-detail-view .switcher-pill.active');
    if (activePill) {
      var cont = activePill.closest('.switcher-pill-group');
      if (cont) {
        cont.scrollTo({ left: activePill.offsetLeft - (cont.clientWidth / 2) + (activePill.offsetWidth / 2), behavior: 'smooth' });
      }
    }

    if (window.AppRouter && !window.AppRouter.isDispatching) {
      window.AppRouter.onCalculatorOpened(calcId, 'financial');
    }

    if (window.SeoGuide) {
      window.SeoGuide.updateGuide(calcId, 'financial');
    }

    if (window.scrollToActiveCalculator) { window.scrollToActiveCalculator('fin'); } else { window.scrollTo({ top: 0, behavior: 'smooth' }); }
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

    // 10. Interest Inputs (Date to Date & Term)
    const intStart = document.getElementById('int-start-date');
    const intEnd = document.getElementById('int-end-date');
    if (intStart && !intStart.value) {
      const d = new Date();
      d.setFullYear(d.getFullYear() - 1);
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      intStart.value = `${d.getFullYear()}-${m}-${day}`;
    }
    if (intEnd && !intEnd.value) {
      const now = new Date();
      const m = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      intEnd.value = `${now.getFullYear()}-${m}-${day}`;
    }
    ['int-principal', 'int-rate', 'int-time', 'int-mode', 'int-freq', 'int-period-mode', 'int-start-date', 'int-end-date', 'int-day-basis'].forEach(id => {
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
    ['afford-debt', 'afford-term', 'afford-tax-rate', 'afford-ins-annual', 'afford-hoa'].forEach(id => {
    });
    document.querySelectorAll('.afford-term-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        const term = btn.dataset.term;
        const termInput = document.getElementById('afford-term');
        if (termInput) {
          termInput.value = term;
          document.querySelectorAll('.afford-term-preset').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
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
    ['rent-debt', 'rent-utilities', 'rent-savings-goal'].forEach(id => {
    });

    // 23. Annuity Accumulation Inputs
    ['ann-initial', 'ann-monthly', 'ann-rate', 'ann-years', 'ann-freq', 'ann-tax'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcAnnuity());
      document.getElementById(id)?.addEventListener('change', () => this.calcAnnuity());
    });

    // 24. Debt-to-Income (DTI) Inputs & Sliders
    ['dti-auto', 'dti-student', 'dti-cc', 'dti-other'].forEach(id => {
    });

    // 25. Annuity Payout Inputs
    ['payout-principal', 'payout-years', 'payout-freq', 'payout-rate', 'payout-timing', 'payout-type'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcAnnuityPayout());
      document.getElementById(id)?.addEventListener('change', () => this.calcAnnuityPayout());
    });

    // 26. Real Estate Inputs & Sliders
    ['re-down-pct', 're-rate', 're-term', 're-vacancy', 're-tax-yr', 're-ins-yr', 're-hoa', 're-mgmt-pct', 're-maint-pct', 're-closing-pct'].forEach(id => {
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
    ['refi-cur-balance', 'refi-cur-rate', 'refi-cur-term-rem', 'refi-new-rate', 'refi-new-term', 'refi-closing-costs', 'refi-cash-out'].forEach(id => {
    });
    document.querySelectorAll('.refi-term-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        const term = btn.dataset.term;
        const termInput = document.getElementById('refi-new-term');
        if (termInput) {
          termInput.value = term;
          document.querySelectorAll('.refi-term-preset').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
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
    ['rental-price', 'rental-down-pct', 'rental-rate', 'rental-term', 'rental-gross-rent', 'rental-other-inc', 'rental-vacancy', 'rental-tax-yr', 'rental-ins-yr', 'rental-hoa', 'rental-mgmt', 'rental-maint', 'rental-capex', 'rental-closing-costs'].forEach(id => {
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
    ['apr-loan-amt', 'apr-rate', 'apr-term', 'apr-points', 'apr-origination', 'apr-other-fees'].forEach(id => {
    });

    // 33. FHA Loan Calculator
    ['fha-price', 'fha-down-pct', 'fha-rate', 'fha-term', 'fha-tax-yr', 'fha-ins-yr', 'fha-hoa'].forEach(id => {
    });
    document.querySelectorAll('.fha-down-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        const down = btn.dataset.down;
        const downInput = document.getElementById('fha-down-pct');
        if (downInput) {
          downInput.value = down;
          document.querySelectorAll('.fha-down-preset').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
        }
      });
    });

    // 34. VA Mortgage Calculator
    ['va-price', 'va-down-pct', 'va-rate', 'va-term', 'va-tax-yr', 'va-ins-yr'].forEach(id => {
    });
    ['va-usage', 'va-disability'].forEach(id => {
    });

    // 35. Home Equity Loan Calculator
    ['he-home-value', 'he-first-balance', 'he-loan-amount', 'he-rate', 'he-term', 'he-max-cltv'].forEach(id => {
    });

    // 36. HELOC Calculator
    this.syncInputSlider('heloc-home-value', 'heloc-home-value-range', () => this.calcHELOC());
    this.syncInputSlider('heloc-draw-amount', 'heloc-draw-amount-range', () => this.calcHELOC());
    ['heloc-home-value', 'heloc-mortgage', 'heloc-max-cltv', 'heloc-draw-amount', 'heloc-rate', 'heloc-draw-years', 'heloc-repay-years'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcHELOC());
    });

    // 37. Down Payment Calculator
    ['down-target-price', 'down-target-pct', 'down-closing-pct', 'down-cur-saved', 'down-monthly-save', 'down-hysa-rate'].forEach(id => {
    });
    document.querySelectorAll('.down-pct-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        const pct = btn.dataset.pct;
        const pctInput = document.getElementById('down-target-pct');
        if (pctInput) {
          pctInput.value = pct;
          document.querySelectorAll('.down-pct-preset').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
        }
      });
    });

    // 38. Rent vs Buy Calculator
    ['rvb-home-price', 'rvb-down-pct', 'rvb-mort-rate', 'rvb-mort-term', 'rvb-home-growth', 'rvb-tax-rate', 'rvb-maint-ins', 'rvb-cur-rent', 'rvb-rent-growth', 'rvb-invest-rate', 'rvb-years-stay'].forEach(id => {
    });
    document.querySelectorAll('.rvb-stay-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        const stay = btn.dataset.stay;
        const stayInput = document.getElementById('rvb-years-stay');
        if (stayInput) {
          stayInput.value = stay;
          document.querySelectorAll('.rvb-stay-preset').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
        }
      });
    });

    // 34. US Federal & State Income Tax Calculator
    ['tax-gross-income', 'tax-itemized-amt', 'tax-pretax', 'tax-state-custom'].forEach(id => {
    });
    ['tax-filing-status', 'tax-ded-type', 'tax-state'].forEach(id => {
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
      });
    });
    ['ir-principal', 'ir-payment', 'ir-target-fv', 'ir-years', 'ir-months'].forEach(id => {
    });

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
      });
    });
    ['svg-initial', 'svg-target', 'svg-deposit'].forEach(id => {
    });

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
      });
    });
    ['cd-term-val', 'cd-tax-rate'].forEach(id => {
    });
    ['cd-term-unit', 'cd-freq', 'cd-penalty-tier'].forEach(id => {
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
      });
    });
    ['cc-fixed-payment', 'cc-min-pct', 'cc-min-floor'].forEach(id => {
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
      });
    });
    document.getElementById('ccp-mode')?.addEventListener('change', (e) => {
      const mode = e.target.value;
      const targetGrp = document.getElementById('ccp-group-target');
      const pmtGrp = document.getElementById('ccp-group-pmt');
      if (targetGrp) targetGrp.style.display = mode === 'target' ? 'block' : 'none';
      if (pmtGrp) pmtGrp.style.display = mode === 'fixed' ? 'block' : 'none';
    });
    ['ccp-target-months', 'ccp-fixed-pmt'].forEach(id => {
    });

    // 57. Debt Payoff Calculator Listeners
    document.querySelectorAll('.dpo-strategy-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        this.dpoStrategy = btn.dataset.strat;
        document.querySelectorAll('.dpo-strategy-preset').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
    for (let i = 1; i <= 4; i++) {
      ['dpo-n' + i, 'dpo-b' + i, 'dpo-r' + i, 'dpo-m' + i].forEach(id => {
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
      });
    });
    for (let i = 1; i <= 3; i++) {
      ['dc-b' + i, 'dc-r' + i, 'dc-p' + i].forEach(id => {
      });
    }

    // 59. Repayment Calculator Listeners
    document.querySelectorAll('.rep-freq-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        this.repFreq = btn.dataset.freq;
        document.querySelectorAll('.rep-freq-preset').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });

    // 60. Student Loan Calculator Listeners
    document.querySelectorAll('.sl-plan-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        this.slPlan = btn.dataset.plan;
        document.querySelectorAll('.sl-plan-preset').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const idrGrp = document.getElementById('sl-group-idr');
        if (idrGrp) idrGrp.style.display = this.slPlan === 'idr' ? 'block' : 'none';
      });
    });
    ['sl-term', 'sl-agi', 'sl-family', 'sl-growth'].forEach(id => {
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
      });
    });
    ['bl-term-years', 'bl-fee', 'bl-ebitda'].forEach(id => {
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
      });
    });
    ['pl-term', 'pl-fee'].forEach(id => {
    });

    // 68. Boat Loan Calculator Listeners
    document.querySelectorAll('.bt-term-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        const t = btn.dataset.term;
        const termInput = document.getElementById('bt-term-years');
        if (termInput) termInput.value = t;
        document.querySelectorAll('.bt-term-preset').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
    ['bt-down-pct', 'bt-rate', 'bt-term-years', 'bt-slip', 'bt-ins', 'bt-maint'].forEach(id => {
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
    this.calc401k();
    this.calcSIP();
    this.calcDiscountTax();
    this.calcTipSplit();
    this.calcROI();
    this.calcPension();
    this.calcSocialSecurity();
    this.calcAnnuity();
    this.calcAnnuityPayout();
    this.calcRothIRA();
    this.calcIRA();
    this.calcRMD();
    this.calcHELOC();
    this.calcSalary();
    this.calcAutoRebate();
    this.calcAutoLease();
    this.calcSimpleInterest();
    this.calcBond();
    this.calcMutualFund();
    this.calcAverageReturn();
    this.calcIRR();
    this.calcPayback();
    this.calcPresentValue();
    this.calcFutureValue();
    this.calcCollegeCost();
    this.calcDepreciation();
    this.calcMargin();
    this.calcDiscount();
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