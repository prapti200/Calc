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
    this.calcInterest();
    this.calcPayment();
    this.calcRetirement();
    this.calcAmortization();
    this.calcInvestment();
    this.calcCurrency();
    this.calcInflation();
    this.calcFinanceTVM('fv');
    this.calcSIP();
    this.calcDiscountTax();
    this.calcTipSplit();
    this.calcROI();
    this.calcHELOC();
    this.calcSalary();
    this.calcSimpleInterest();
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
  // NEW: PENSION CALCULATOR (Defined Benefit Plan Engine)

  // ------------------------------------------------------------------------
  // NEW: HOUSE AFFORDABILITY CALCULATOR (US 28/36 Underwriting Rule)
  // ------------------------------------------------------------------------
  // ------------------------------------------------------------------------
  // NEW: SOCIAL SECURITY CALCULATOR (US SSA Full Retirement & Early/Delayed)

  // ------------------------------------------------------------------------
  // NEW: RENT CALCULATOR (30% Rule, 40x Rule & 50/30/20 Framework)
  // ------------------------------------------------------------------------
  // ------------------------------------------------------------------------
  // NEW: ANNUITY CALCULATOR (Deferred Annuity & Compound Wealth Growth)

  // ------------------------------------------------------------------------
  // NEW: DEBT-TO-INCOME (DTI) RATIO CALCULATOR (Front & Back-End Ratios)
  // ------------------------------------------------------------------------
  // ------------------------------------------------------------------------
  // NEW: ANNUITY PAYOUT CALCULATOR (Immediate SPIA & Term-Certain Payouts)

  // ------------------------------------------------------------------------
  // NEW: REAL ESTATE CALCULATOR (Rental Property ROI & Cap Rate Analyzer)
  // ------------------------------------------------------------------------
  // ------------------------------------------------------------------------
  // NEW: ROTH IRA CALCULATOR (Tax-Free Wealth & Compounding)

  // ------------------------------------------------------------------------
  // 23. REFINANCE CALCULATOR (Break-Even & Lifetime Interest Savings)
  // ------------------------------------------------------------------------
  // ------------------------------------------------------------------------
  // 24. TRADITIONAL IRA CALCULATOR (Upfront Deductions & Growth)

  // ------------------------------------------------------------------------
  // 25. RENTAL PROPERTY CALCULATOR (Multi-unit, OpEx, NOI & Returns)
  // ------------------------------------------------------------------------
  // ------------------------------------------------------------------------
  // 26. RMD CALCULATOR (IRS SECURE 2.0 Uniform Lifetime Table)

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
  // 40. AUTO LEASE CALCULATOR

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
  // 46. MUTUAL FUND CALCULATOR (EXPENSE RATIO DRAG)

  // ------------------------------------------------------------------------
  // 47. AVERAGE RETURN CALCULATOR (CAGR & VOLATILITY DRAG)

  // ------------------------------------------------------------------------
  // 48. IRR CALCULATOR (INTERNAL RATE OF RETURN & NPV)

  // ------------------------------------------------------------------------
  // 49. PAYBACK PERIOD CALCULATOR (SIMPLE & DISCOUNTED)

  // ------------------------------------------------------------------------
  // 50. PRESENT VALUE CALCULATOR (PV & ANNUITY DISCOUNTING)

  // ------------------------------------------------------------------------
  // 51. FUTURE VALUE CALCULATOR (COMPOUND FV)

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
  // 62. DEPRECIATION CALCULATOR

  // ------------------------------------------------------------------------
  // 64. MARGIN CALCULATOR

  // ------------------------------------------------------------------------
  // 65. DISCOUNT CALCULATOR

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
  // 70. BUDGET CALCULATOR (50/30/20 RULE)

  // ------------------------------------------------------------------------
  // 71. COMMISSION CALCULATOR
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

    // 22. Rent Inputs & Sliders
    ['rent-debt', 'rent-utilities', 'rent-savings-goal'].forEach(id => {
    });

    // 24. Debt-to-Income (DTI) Inputs & Sliders
    ['dti-auto', 'dti-student', 'dti-cc', 'dti-other'].forEach(id => {
    });

    // 26. Real Estate Inputs & Sliders
    ['re-down-pct', 're-rate', 're-term', 're-vacancy', 're-tax-yr', 're-ins-yr', 're-hoa', 're-mgmt-pct', 're-maint-pct', 're-closing-pct'].forEach(id => {
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

    // 30. Rental Property Calculator
    ['rental-price', 'rental-down-pct', 'rental-rate', 'rental-term', 'rental-gross-rent', 'rental-other-inc', 'rental-vacancy', 'rental-tax-yr', 'rental-ins-yr', 'rental-hoa', 'rental-mgmt', 'rental-maint', 'rental-capex', 'rental-closing-costs'].forEach(id => {
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

    // Run all initial calculations
    this.calcMortgage();
    this.calcLoanEMI();
    this.calcInterest();
    this.calcPayment();
    this.calcRetirement();
    this.calcAmortization();
    this.calcInvestment();
    this.calcCurrency();
    this.calcInflation();
    this.calcFinanceTVM('fv');
    this.calcSIP();
    this.calcDiscountTax();
    this.calcTipSplit();
    this.calcROI();
    this.calcHELOC();
    this.calcSalary();
    this.calcSimpleInterest();
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