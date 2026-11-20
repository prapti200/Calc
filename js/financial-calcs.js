/* ==========================================================================
   CALC• MODERN CALCULATOR - FINANCIAL CALCULATORS ENGINE (PRO & US EDITIONS)
   ========================================================================== */

const FinancialCalcs = {
  currency: '₹',

  formatCurrency(val, currency = this.currency) {
    if (isNaN(val) || !isFinite(val)) return `${currency}0.00`;
    return `${currency}${val.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
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
    if (typeof document !== 'undefined' && document.getElementById('sal-view-adp')) {
      this.calcAdpSalary();
      this.calcCpcSalary();
    }
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
    // ------------------------------------------------------------------------
  // 31. HELOC CALCULATOR (Draw Period vs Repayment Phase Shock)
  // ------------------------------------------------------------------------
  helocMode: 'payment',
  helocTableExpanded: false,

  setHelocMode(mode) {
    this.helocMode = mode;
    const btnPay = document.getElementById('tab-btn-heloc-payment');
    const btnEq = document.getElementById('tab-btn-heloc-equity');
    const panelPay = document.getElementById('heloc-inputs-payment');
    const panelEq = document.getElementById('heloc-inputs-equity');

    if (mode === 'equity') {
      if (panelPay) panelPay.style.display = 'none';
      if (panelEq) panelEq.style.display = 'block';
      if (btnPay) {
        btnPay.classList.remove('active');
        btnPay.style.background = 'var(--bg-secondary, #ffffff)';
        btnPay.style.borderColor = 'var(--card-border, #e2e8f0)';
        btnPay.style.color = 'var(--text-secondary, #64748b)';
        btnPay.style.boxShadow = 'none';
      }
      if (btnEq) {
        btnEq.classList.add('active');
        btnEq.style.background = 'var(--btn-active-bg, #eff6ff)';
        btnEq.style.borderColor = 'var(--btn-active-border, #bfdbfe)';
        btnEq.style.color = 'var(--btn-active-text, #2563eb)';
        btnEq.style.boxShadow = '0 1px 3px rgba(37,99,235,0.12)';
      }
    } else {
      if (panelPay) panelPay.style.display = 'block';
      if (panelEq) panelEq.style.display = 'none';
      if (btnPay) {
        btnPay.classList.add('active');
        btnPay.style.background = 'var(--btn-active-bg, #eff6ff)';
        btnPay.style.borderColor = 'var(--btn-active-border, #bfdbfe)';
        btnPay.style.color = 'var(--btn-active-text, #2563eb)';
        btnPay.style.boxShadow = '0 1px 3px rgba(37,99,235,0.12)';
      }
      if (btnEq) {
        btnEq.classList.remove('active');
        btnEq.style.background = 'var(--bg-secondary, #ffffff)';
        btnEq.style.borderColor = 'var(--card-border, #e2e8f0)';
        btnEq.style.color = 'var(--text-secondary, #64748b)';
        btnEq.style.boxShadow = 'none';
      }
    }
    this.calcHELOC();
  },

  setHelocRate(rate, btn) {
    const numInput = document.getElementById('heloc-rate');
    const rangeInput = document.getElementById('heloc-rate-range');
    if (numInput) numInput.value = rate;
    if (rangeInput) rangeInput.value = rate;
    if (btn && btn.parentElement) {
      btn.parentElement.querySelectorAll('.preset-pill').forEach(p => {
        p.classList.remove('active');
        p.style.background = 'transparent';
        p.style.borderColor = 'transparent';
        p.style.color = 'var(--text-secondary)';
        p.style.fontWeight = 'normal';
      });
      btn.classList.add('active');
      btn.style.background = 'var(--btn-active-bg, #eff6ff)';
      btn.style.borderColor = 'var(--btn-active-border, #bfdbfe)';
      btn.style.color = 'var(--btn-active-text, #2563eb)';
      btn.style.fontWeight = '700';
    }
    this.calcHELOC();
  },

  setHelocDrawYears(years, btn) {
    const input = document.getElementById('heloc-draw-years');
    if (input) input.value = years;
    if (btn && btn.parentElement) {
      btn.parentElement.querySelectorAll('.preset-pill').forEach(p => {
        p.classList.remove('active');
        p.style.background = 'transparent';
        p.style.borderColor = 'transparent';
        p.style.color = 'var(--text-secondary)';
        p.style.fontWeight = 'normal';
      });
      btn.classList.add('active');
      btn.style.background = 'var(--btn-active-bg, #eff6ff)';
      btn.style.borderColor = 'var(--btn-active-border, #bfdbfe)';
      btn.style.color = 'var(--btn-active-text, #2563eb)';
      btn.style.fontWeight = '700';
    }
    this.calcHELOC();
  },

  setHelocRepayYears(years, btn) {
    const input = document.getElementById('heloc-repay-years');
    if (input) input.value = years;
    if (btn && btn.parentElement) {
      btn.parentElement.querySelectorAll('.preset-pill').forEach(p => {
        p.classList.remove('active');
        p.style.background = 'transparent';
        p.style.borderColor = 'transparent';
        p.style.color = 'var(--text-secondary)';
        p.style.fontWeight = 'normal';
      });
      btn.classList.add('active');
      btn.style.background = 'var(--btn-active-bg, #eff6ff)';
      btn.style.borderColor = 'var(--btn-active-border, #bfdbfe)';
      btn.style.color = 'var(--btn-active-text, #2563eb)';
      btn.style.fontWeight = '700';
    }
    this.calcHELOC();
  },

  setHelocCltv(cltv, btn) {
    const input = document.getElementById('heloc-max-cltv');
    if (input) input.value = cltv;
    if (btn && btn.parentElement) {
      btn.parentElement.querySelectorAll('.preset-pill').forEach(p => {
        p.classList.remove('active');
        p.style.background = 'transparent';
        p.style.borderColor = 'transparent';
        p.style.color = 'var(--text-secondary)';
        p.style.fontWeight = 'normal';
      });
      btn.classList.add('active');
      btn.style.background = 'var(--btn-active-bg, #eff6ff)';
      btn.style.borderColor = 'var(--btn-active-border, #bfdbfe)';
      btn.style.color = 'var(--btn-active-text, #2563eb)';
      btn.style.fontWeight = '700';
    }
    this.calcHELOC();
  },

  useMaxHelocLine() {
    const maxLine = parseFloat(document.getElementById('res-heloc-max-line')?.textContent.replace(/[^0-9.]/g, '')) || 70000;
    this.setHelocMode('payment');
    const drawAmtInput = document.getElementById('heloc-draw-amount');
    const drawAmtRange = document.getElementById('heloc-draw-amount-range');
    if (drawAmtInput) drawAmtInput.value = Math.round(maxLine);
    if (drawAmtRange) drawAmtRange.value = Math.min(Math.round(maxLine), 500000);
    this.calcHELOC();
    document.getElementById('sec-heloc-calc')?.scrollIntoView({ behavior: 'smooth' });
  },

  renderHelocChart(drawPay, repayPay, drawnAmt, totalInterest, drawYears, repayYears, yearlyData) {
    const container = document.getElementById('heloc-chart-container');
    if (!container) return;

    const width = 800;
    const height = 240;
    const padding = { top: 30, right: 30, bottom: 40, left: 60 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;

    const totalYears = drawYears + repayYears;
    const maxBal = Math.max(drawnAmt * 1.1, 10000);
    const maxPay = Math.max(repayPay * 1.25, 500);

    // Generate Balance line points
    const pts = [];
    const drawSplitX = padding.left + (drawYears / totalYears) * chartW;

    // Start point
    pts.push(`${padding.left},${padding.top + chartH * (1 - (drawnAmt / maxBal))}`);

    (yearlyData || []).forEach(d => {
      const x = padding.left + (d.year / totalYears) * chartW;
      const y = padding.top + chartH * (1 - (d.endBal / maxBal));
      pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    });

    const pathD = `M ${pts.join(' L ')}`;
    const areaD = `${pathD} L ${padding.left + chartW},${padding.top + chartH} L ${padding.left},${padding.top + chartH} Z`;

    const svgHtml = `
      <svg viewBox="0 0 ${width} ${height}" style="width:100%; height:100%; overflow:visible; font-family:sans-serif;" aria-label="HELOC Payment Shock Chart">
        <defs>
          <linearGradient id="helocBalGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.25"/>
            <stop offset="100%" stop-color="#f59e0b" stop-opacity="0.02"/>
          </linearGradient>
          <linearGradient id="helocDrawGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#10b981" stop-opacity="0.12"/>
            <stop offset="100%" stop-color="#10b981" stop-opacity="0.02"/>
          </linearGradient>
          <linearGradient id="helocRepayGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.12"/>
            <stop offset="100%" stop-color="#3b82f6" stop-opacity="0.02"/>
          </linearGradient>
        </defs>

        <!-- Horizontal Gridlines -->
        <line x1="${padding.left}" y1="${padding.top}" x2="${width - padding.right}" y2="${padding.top}" stroke="rgba(0,0,0,0.06)" stroke-dasharray="3,3"/>
        <line x1="${padding.left}" y1="${padding.top + chartH * 0.5}" x2="${width - padding.right}" y2="${padding.top + chartH * 0.5}" stroke="rgba(0,0,0,0.06)" stroke-dasharray="3,3"/>
        <line x1="${padding.left}" y1="${padding.top + chartH}" x2="${width - padding.right}" y2="${padding.top + chartH}" stroke="rgba(0,0,0,0.12)"/>

        <!-- Phase Dividing Vertical Line -->
        <line x1="${drawSplitX}" y1="${padding.top - 10}" x2="${drawSplitX}" y2="${padding.top + chartH}" stroke="rgba(225,29,72,0.6)" stroke-width="2" stroke-dasharray="4,4"/>
        
        <!-- Phase Regions Background -->
        <rect x="${padding.left}" y="${padding.top}" width="${drawSplitX - padding.left}" height="${chartH}" fill="url(#helocDrawGrad)"/>
        <rect x="${drawSplitX}" y="${padding.top}" width="${width - padding.right - drawSplitX}" height="${chartH}" fill="url(#helocRepayGrad)"/>

        <!-- Phase Labels Above Chart -->
        <text x="${padding.left + (drawSplitX - padding.left) / 2}" y="${padding.top - 12}" fill="#059669" font-size="11" font-weight="700" text-anchor="middle">
          Phase 1: Draw Period (${drawYears} Yrs) • $${drawPay.toFixed(0)}/mo
        </text>
        <text x="${drawSplitX + (width - padding.right - drawSplitX) / 2}" y="${padding.top - 12}" fill="#2563eb" font-size="11" font-weight="700" text-anchor="middle">
          Phase 2: Repayment Phase (${repayYears} Yrs) • $${repayPay.toFixed(0)}/mo
        </text>

        <!-- Payment Shock Indicator Badge at Dividing Line -->
        <g transform="translate(${drawSplitX}, ${padding.top + chartH * 0.35})">
          <rect x="-48" y="-12" width="96" height="24" rx="12" fill="#e11d48" stroke="#ffffff" stroke-width="1.5" filter="drop-shadow(0 2px 4px rgba(225,29,72,0.3))"/>
          <text x="0" y="4" fill="#ffffff" font-size="10" font-weight="800" text-anchor="middle">⚡ Shock Jump</text>
        </g>

        <!-- Balance Filled Area & Line -->
        <path d="${areaD}" fill="url(#helocBalGrad)"/>
        <path d="${pathD}" fill="none" stroke="#f59e0b" stroke-width="3" stroke-linecap="round"/>

        <!-- X-Axis Labels -->
        <text x="${padding.left}" y="${padding.top + chartH + 20}" fill="#64748b" font-size="11" font-weight="600" text-anchor="start">Year 0</text>
        <text x="${drawSplitX}" y="${padding.top + chartH + 20}" fill="#e11d48" font-size="11" font-weight="700" text-anchor="middle">Year ${drawYears}</text>
        <text x="${width - padding.right}" y="${padding.top + chartH + 20}" fill="#64748b" font-size="11" font-weight="600" text-anchor="end">Year ${totalYears}</text>

        <!-- Y-Axis Ticks (Balance) -->
        <text x="${padding.left - 8}" y="${padding.top + 5}" fill="#d97706" font-size="10" font-weight="700" text-anchor="end">$${(drawnAmt / 1000).toFixed(0)}k</text>
        <text x="${padding.left - 8}" y="${padding.top + chartH * 0.5 + 4}" fill="#64748b" font-size="10" text-anchor="end">$${(drawnAmt * 0.5 / 1000).toFixed(0)}k</text>
        <text x="${padding.left - 8}" y="${padding.top + chartH}" fill="#64748b" font-size="10" text-anchor="end">$0</text>
      </svg>
    `;

    container.innerHTML = svgHtml;
  },

  renderHelocTable(yearlyData) {
    const tbody = document.getElementById('heloc-amortization-tbody');
    if (!tbody) return;

    if (!yearlyData || yearlyData.length === 0) {
      tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding:1.5rem; color:#64748b;">No schedule data available.</td></tr>';
      return;
    }

    const rowsHtml = yearlyData.map(row => {
      const isDraw = row.phase.includes('Draw');
      const badgeStyle = isDraw
        ? 'background:rgba(16,185,129,0.1); color:#059669; border:1px solid rgba(16,185,129,0.25);'
        : 'background:rgba(37,99,235,0.08); color:#2563eb; border:1px solid rgba(37,99,235,0.2);';

      return `
        <tr style="border-bottom:1px solid var(--card-border, #e2e8f0); transition:background 0.15s ease;">
          <td style="padding:0.65rem 0.85rem; text-align:left; font-weight:700; color:var(--text-primary, #0f172a);">Yr ${row.year}</td>
          <td style="padding:0.65rem 0.85rem; text-align:left;">
            <span style="display:inline-block; font-size:0.75rem; font-weight:600; padding:0.25rem 0.55rem; border-radius:6px; ${badgeStyle}">
              ${row.phase}
            </span>
          </td>
          <td style="padding:0.65rem 0.85rem; color:var(--text-secondary, #475569);">$${row.startBal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
          <td style="padding:0.65rem 0.85rem; color:#e11d48; font-weight:600;">$${row.interest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
          <td style="padding:0.65rem 0.85rem; color:#059669; font-weight:600;">$${row.principal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
          <td style="padding:0.65rem 0.85rem; font-weight:700; color:var(--text-primary, #0f172a);">$${row.totalPaid.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
          <td style="padding:0.65rem 0.85rem; font-weight:700; color:#d97706;">$${row.endBal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
        </tr>
      `;
    }).join('');

    tbody.innerHTML = rowsHtml;
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
  // ------------------------------------------------------------------------
  // 16. INFLATION CALCULATOR (Purchasing Power & Future Cost)
  // ------------------------------------------------------------------------
  inflationMode: 'forward', // 'forward' = Future Cost, 'backward' = Past Value
  inflationCurr: '₹',

  calcInflation() {
    const elAmount = document.getElementById('inf-amount');
    const elAmountSlider = document.getElementById('inf-amount-slider');
    const elAmountDisplay = document.getElementById('inf-amount-display');

    const elRate = document.getElementById('inf-rate');
    const elRateSlider = document.getElementById('inf-rate-slider');
    const elRateDisplay = document.getElementById('inf-rate-display');

    const elYears = document.getElementById('inf-years');
    const elYearsSlider = document.getElementById('inf-years-slider');
    const elYearsDisplay = document.getElementById('inf-years-display');

    let amount = parseFloat(elAmount?.value) || 0;
    let rate = parseFloat(elRate?.value) || 0;
    let years = parseFloat(elYears?.value) || 0;

    // Boundary guards
    if (amount < 0) amount = 0;
    if (rate < 0) rate = 0;
    if (years < 1) years = 1;

    const curr = this.inflationCurr || '₹';
    const mode = this.inflationMode || 'forward';

    // Synchronize display text
    if (elAmountDisplay) {
      elAmountDisplay.textContent = `${curr}${Math.round(amount).toLocaleString('en-IN')}`;
    }
    if (elRateDisplay) {
      elRateDisplay.textContent = `${rate.toFixed(1)}%`;
    }
    if (elYearsDisplay) {
      elYearsDisplay.textContent = `${Math.round(years)} ${years === 1 ? 'Year' : 'Years'}`;
    }

    const r = rate / 100;
    const factor = Math.pow(1 + r, years);

    // Dynamic labels depending on mode
    const elLblAmount = document.getElementById('lbl-inf-amount');
    const elLblCost = document.getElementById('lbl-res-inf-cost');
    const elLblPower = document.getElementById('lbl-res-inf-power');
    const elCostSub = document.getElementById('res-inf-cost-sub');

    let futureCost = 0;
    let purchasingPower = 0;
    let lossPct = 0;
    let cumulativeInflation = 0;
    let costIncrease = 0;
    let doublingYears = rate > 0 ? (Math.log(2) / Math.log(1 + r)) : 0;

    if (mode === 'forward') {
      if (elLblAmount) elLblAmount.textContent = 'Current Amount Today';
      if (elLblCost) elLblCost.textContent = 'Future Inflation-Adjusted Cost';
      if (elLblPower) elLblPower.textContent = "Purchasing Power";

      futureCost = amount * factor;
      purchasingPower = factor > 0 ? amount / factor : amount;
      lossPct = factor > 0 ? (1 - (1 / factor)) * 100 : 0;
      cumulativeInflation = (factor - 1) * 100;
      costIncrease = futureCost - amount;

      if (elCostSub) {
        elCostSub.textContent = `Required in ${Math.round(years)} years to purchase what ${curr}${Math.round(amount).toLocaleString('en-IN')} buys today.`;
      }
    } else {
      // Backward: Past Value / Historical Equivalent
      if (elLblAmount) elLblAmount.textContent = 'Historical Amount in Past Year';
      if (elLblCost) elLblCost.textContent = "Today's Equivalent Purchasing Power";
      if (elLblPower) elLblPower.textContent = 'Past Purchasing Base';

      futureCost = amount * factor; // What ₹X in past year equals today
      purchasingPower = amount;
      cumulativeInflation = (factor - 1) * 100;
      lossPct = (1 - (1 / factor)) * 100;
      costIncrease = futureCost - amount;

      if (elCostSub) {
        elCostSub.textContent = `What ${curr}${Math.round(amount).toLocaleString('en-IN')} from ${Math.round(years)} years ago is worth in today's money.`;
      }
    }

    const elPower = document.getElementById('res-inf-power');
    const elCost = document.getElementById('res-inf-cost');
    const elLoss = document.getElementById('res-inf-loss');
    const elCum = document.getElementById('res-inf-cumulative');
    const elDoubling = document.getElementById('res-inf-doubling');

    const fmtCurr = (val) => `${curr}${Math.round(val).toLocaleString('en-IN')}`;

    if (elCost) elCost.textContent = fmtCurr(futureCost);
    if (elPower) elPower.textContent = fmtCurr(purchasingPower);
    if (elLoss) elLoss.textContent = `-${lossPct.toFixed(1)}% Loss`;
    if (elCum) elCum.textContent = `+${fmtCurr(costIncrease)} (+${cumulativeInflation.toFixed(1)}%)`;
    if (elDoubling) {
      elDoubling.textContent = doublingYears > 0 && doublingYears < 100 ? `~${doublingYears.toFixed(1)} Years` : 'N/A';
    }

    this.renderInflationChart(amount, rate, years, mode, curr);
    this.renderInflationTable(amount, rate, years, mode, curr);
  },

  renderInflationChart(amount, rate, years, mode, curr) {
    const wrapper = document.getElementById('inf-chart-wrapper');
    if (!wrapper) return;

    const r = rate / 100;
    const n = Math.min(Math.max(Math.round(years), 1), 40);

    const pointsCost = [];
    const pointsPower = [];
    let maxVal = amount;

    for (let i = 0; i <= n; i++) {
      const f = Math.pow(1 + r, i);
      const c = amount * f;
      const p = f > 0 ? amount / f : amount;
      pointsCost.push({ year: i, val: c });
      pointsPower.push({ year: i, val: p });
      if (c > maxVal) maxVal = c;
    }

    const width = 600;
    const height = 200;
    const padX = 55;
    const padY = 25;
    const chartW = width - padX - 20;
    const chartH = height - padY - 30;

    const scaleX = (yr) => padX + (yr / n) * chartW;
    const scaleY = (v) => padY + chartH - (v / (maxVal * 1.08)) * chartH;

    let pathCostD = `M ${scaleX(0)} ${scaleY(pointsCost[0].val)}`;
    let pathPowerD = `M ${scaleX(0)} ${scaleY(pointsPower[0].val)}`;
    let areaCostD = `M ${scaleX(0)} ${scaleY(pointsCost[0].val)}`;
    let areaPowerD = `M ${scaleX(0)} ${scaleY(pointsPower[0].val)}`;

    for (let i = 1; i <= n; i++) {
      const x = scaleX(i);
      const yC = scaleY(pointsCost[i].val);
      const yP = scaleY(pointsPower[i].val);
      pathCostD += ` L ${x} ${yC}`;
      pathPowerD += ` L ${x} ${yP}`;
      areaCostD += ` L ${x} ${yC}`;
      areaPowerD += ` L ${x} ${yP}`;
    }

    areaCostD += ` L ${scaleX(n)} ${padY + chartH} L ${scaleX(0)} ${padY + chartH} Z`;
    areaPowerD += ` L ${scaleX(n)} ${padY + chartH} L ${scaleX(0)} ${padY + chartH} Z`;

    const baselineY = scaleY(amount);

    const fmtCompact = (num) => {
      if (num >= 10000000) return `${curr}${(num / 10000000).toFixed(1)}Cr`;
      if (num >= 100000) return `${curr}${(num / 100000).toFixed(1)}L`;
      if (num >= 1000) return `${curr}${(num / 1000).toFixed(0)}k`;
      return `${curr}${Math.round(num)}`;
    };

    const gridY = [0, 0.33, 0.66, 1.0].map(pct => {
      const val = maxVal * 1.08 * pct;
      const y = scaleY(val);
      return `<g>
        <line x1="${padX}" y1="${y}" x2="${width - 15}" y2="${y}" stroke="var(--card-border)" stroke-dasharray="3 3" stroke-width="1"/>
        <text x="${padX - 8}" y="${y + 4}" font-size="10" fill="var(--text-muted)" text-anchor="end" font-family="var(--font-mono)">${fmtCompact(val)}</text>
      </g>`;
    }).join('');

    const midYear = Math.round(n / 2);
    const yearTicks = `
      <text x="${scaleX(0)}" y="${height - 8}" font-size="10" fill="var(--text-muted)" text-anchor="start" font-family="var(--font-mono)">Yr 0</text>
      <text x="${scaleX(midYear)}" y="${height - 8}" font-size="10" fill="var(--text-muted)" text-anchor="middle" font-family="var(--font-mono)">Yr ${midYear}</text>
      <text x="${scaleX(n)}" y="${height - 8}" font-size="10" fill="var(--text-muted)" text-anchor="end" font-family="var(--font-mono)">Yr ${n}</text>
    `;

    const endX = scaleX(n);
    const endCostY = scaleY(pointsCost[n].val);
    const endPowerY = scaleY(pointsPower[n].val);

    const svg = `
      <svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" style="width:100%; height:100%; display:block; overflow:visible;">
        <defs>
          <linearGradient id="grad-cost-inf" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#10b981" stop-opacity="0.32"/>
            <stop offset="100%" stop-color="#10b981" stop-opacity="0.02"/>
          </linearGradient>
          <linearGradient id="grad-power-inf" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#f43f5e" stop-opacity="0.25"/>
            <stop offset="100%" stop-color="#f43f5e" stop-opacity="0.02"/>
          </linearGradient>
        </defs>

        ${gridY}

        <line x1="${padX}" y1="${baselineY}" x2="${width - 15}" y2="${baselineY}" stroke="var(--text-muted)" stroke-dasharray="4 4" stroke-width="1.2" opacity="0.65"/>
        <text x="${width - 18}" y="${baselineY - 4}" font-size="10" fill="var(--text-muted)" text-anchor="end" font-family="var(--font-mono)">Base: ${fmtCompact(amount)}</text>

        <path d="${areaCostD}" fill="url(#grad-cost-inf)"/>
        <path d="${areaPowerD}" fill="url(#grad-power-inf)"/>

        <path d="${pathCostD}" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="${pathPowerD}" fill="none" stroke="#f43f5e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>

        <circle cx="${scaleX(0)}" cy="${scaleY(amount)}" r="4" fill="#10b981"/>
        <circle cx="${endX}" cy="${endCostY}" r="4.5" fill="#10b981"/>
        <circle cx="${endX}" cy="${endPowerY}" r="4.5" fill="#f43f5e"/>

        <text x="${endX - 6}" y="${endCostY - 8}" font-size="10.5" font-weight="700" fill="#10b981" text-anchor="end" font-family="var(--font-mono)">${fmtCompact(pointsCost[n].val)}</text>
        <text x="${endX - 6}" y="${endPowerY + 14}" font-size="10.5" font-weight="700" fill="#f43f5e" text-anchor="end" font-family="var(--font-mono)">${fmtCompact(pointsPower[n].val)}</text>

        ${yearTicks}
      </svg>
    `;

    wrapper.innerHTML = svg;
  },

  renderInflationTable(amount, rate, years, mode, curr) {
    const tbody = document.getElementById('inf-table-body');
    if (!tbody) return;

    const r = rate / 100;
    const n = Math.min(Math.max(Math.round(years), 1), 40);
    const rows = [];

    const fmt = (v) => `${curr}${Math.round(v).toLocaleString('en-IN')}`;

    let prevCost = amount;
    for (let yr = 1; yr <= n; yr++) {
      const factor = Math.pow(1 + r, yr);
      const cost = amount * factor;
      const power = factor > 0 ? amount / factor : amount;
      const cumPct = (factor - 1) * 100;
      const delta = cost - prevCost;
      prevCost = cost;

      rows.push(`
        <tr>
          <td style="font-weight:700; color:var(--text-primary);">Year ${yr}</td>
          <td style="font-weight:700; color:var(--accent-emerald);">${fmt(cost)}</td>
          <td style="font-weight:600; color:var(--accent-rose);">${fmt(power)}</td>
          <td style="color:var(--accent-amber);">+${cumPct.toFixed(1)}%</td>
          <td style="color:var(--text-secondary);">+${fmt(delta)}</td>
        </tr>
      `);
    }

    tbody.innerHTML = rows.join('');
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
  // 35. SALARY CALCULATOR: IN HAND, ADP & 8TH PAY COMMISSION (UNIFIED HUB)
  // ------------------------------------------------------------------------
  salMode: 'inhand',

  salState: {
    ctc: 1200000,
    basicPct: 50,
    variablePct: 0,
    isMetro: true,
    epfMode: 'standard', // 'standard' = 12% or 'capped' = ₹1,800/mo
    ptAmount: 200,       // ₹200/mo or 0
    regime: 'new'        // 'new' (FY 2026-27) or 'old'
  },

  adpState: {
    grossAmt: 75000,
    freq: 'biweekly',
    pretax401kPct: 6,
    fedTaxRate: 12,
    ficaRate: 6.2,
    medRate: 1.45,
    insPerMonth: 200
  },

  cpcState: {
    basic7th: 35400,
    levelName: 'Level 6',
    fitment: 2.57,
    hraRate: 0.20 // 20% for Y city default
  },

  // --- TAB SWITCHER ---
  switchSalaryTab(mode, btn) {
    this.salMode = mode;
    const tabs = ['inhand', 'adp', 'cpc'];
    tabs.forEach(t => {
      const b = document.getElementById('tab-btn-' + t);
      const v = document.getElementById('sal-view-' + t);
      if (b) {
        if (t === mode) {
          b.className = 'sal-mode-tab active';
          b.style.border = '1px solid var(--btn-active-border, #bfdbfe)';
          b.style.borderBottom = '2px solid #2563eb';
          b.style.background = 'var(--btn-active-bg, #eff6ff)';
          b.style.color = 'var(--btn-active-text, #2563eb)';
          b.style.fontWeight = '700';
        } else {
          b.className = 'sal-mode-tab';
          b.style.border = '1px solid transparent';
          b.style.borderBottom = '2px solid transparent';
          b.style.background = 'transparent';
          b.style.color = 'var(--text-secondary)';
          b.style.fontWeight = '600';
        }
      }
      if (v) {
        v.style.display = (t === mode) ? 'block' : 'none';
      }
    });

    if (mode === 'inhand') this.calcSalary();
    else if (mode === 'adp') this.calcAdpSalary();
    else if (mode === 'cpc') this.calcCpcSalary();
  },

  // --- MODE 1: IN HAND SALARY CALCULATOR (CTC TO TAKE HOME) ---
  onSalCtcInput(val) {
    const num = parseFloat(val) || 0;
    this.salState.ctc = num;
    const disp = document.getElementById('sal-ctc-display');
    if (disp) disp.textContent = '₹' + Math.round(num).toLocaleString('en-IN');
    document.querySelectorAll('.sal-ctc-pill').forEach(p => {
      p.classList.remove('active');
      p.style.background = 'transparent';
      p.style.color = 'var(--text-secondary)';
      p.style.borderColor = 'var(--card-border)';
      p.style.fontWeight = '400';
    });
    this.calcSalary();
  },

  setSalCtc(val, btn) {
    this.salState.ctc = val;
    const inp = document.getElementById('sal-ctc-input');
    if (inp) inp.value = val;
    const disp = document.getElementById('sal-ctc-display');
    if (disp) disp.textContent = '₹' + Math.round(val).toLocaleString('en-IN');

    document.querySelectorAll('.sal-ctc-pill').forEach(p => {
      p.classList.remove('active');
      p.style.background = 'transparent';
      p.style.color = 'var(--text-secondary)';
      p.style.borderColor = 'var(--card-border)';
      p.style.fontWeight = '400';
    });
    if (btn) {
      btn.classList.add('active');
      btn.style.background = 'var(--btn-active-bg, #eff6ff)';
      btn.style.color = 'var(--btn-active-text, #2563eb)';
      btn.style.borderColor = 'var(--btn-active-border, #bfdbfe)';
      btn.style.fontWeight = '700';
    }
    this.calcSalary();
  },

  onSalBasicRange(val) {
    const num = parseFloat(val) || 50;
    this.salState.basicPct = num;
    this.calcSalary();
  },

  onSalVariableChange(val) {
    const num = parseFloat(val) || 0;
    this.salState.variablePct = num;
    this.calcSalary();
  },

  setSalHra(isMetro, btn) {
    this.salState.isMetro = isMetro;
    document.querySelectorAll('.sal-hra-pill').forEach(p => {
      p.classList.remove('active');
      p.style.background = 'transparent';
      p.style.color = 'var(--text-secondary)';
      p.style.borderColor = 'transparent';
      p.style.fontWeight = '400';
    });
    if (btn) {
      btn.classList.add('active');
      btn.style.background = 'var(--btn-active-bg, #eff6ff)';
      btn.style.color = 'var(--btn-active-text, #2563eb)';
      btn.style.borderColor = 'var(--btn-active-border, #bfdbfe)';
      btn.style.fontWeight = '700';
    }
    this.calcSalary();
  },

  setSalEpf(mode, btn) {
    this.salState.epfMode = mode;
    document.querySelectorAll('.sal-epf-pill').forEach(p => {
      p.classList.remove('active');
      p.style.background = 'transparent';
      p.style.color = 'var(--text-secondary)';
      p.style.borderColor = 'transparent';
      p.style.fontWeight = '400';
    });
    if (btn) {
      btn.classList.add('active');
      btn.style.background = 'var(--btn-active-bg, #eff6ff)';
      btn.style.color = 'var(--btn-active-text, #2563eb)';
      btn.style.borderColor = 'var(--btn-active-border, #bfdbfe)';
      btn.style.fontWeight = '700';
    }
    this.calcSalary();
  },

  setSalPt(ptAmount, btn) {
    this.salState.ptAmount = ptAmount;
    document.querySelectorAll('.sal-pt-pill').forEach(p => {
      p.classList.remove('active');
      p.style.background = 'transparent';
      p.style.color = 'var(--text-secondary)';
      p.style.borderColor = 'transparent';
      p.style.fontWeight = '400';
    });
    if (btn) {
      btn.classList.add('active');
      btn.style.background = 'var(--btn-active-bg, #eff6ff)';
      btn.style.color = 'var(--btn-active-text, #2563eb)';
      btn.style.borderColor = 'var(--btn-active-border, #bfdbfe)';
      btn.style.fontWeight = '700';
    }
    this.calcSalary();
  },

  setSalRegime(regime, btn) {
    this.salState.regime = regime;
    document.querySelectorAll('.sal-regime-pill').forEach(p => {
      p.classList.remove('active');
      p.style.background = 'transparent';
      p.style.color = 'var(--text-secondary)';
      p.style.borderColor = 'transparent';
      p.style.fontWeight = '400';
    });
    if (btn) {
      btn.classList.add('active');
      btn.style.background = 'var(--btn-active-bg, #eff6ff)';
      btn.style.color = 'var(--btn-active-text, #2563eb)';
      btn.style.borderColor = 'var(--btn-active-border, #bfdbfe)';
      btn.style.fontWeight = '700';
    }
    this.calcSalary();
  },

  calcSalary() {
    const ctc = this.salState.ctc || 0;
    const basicPct = this.salState.basicPct || 50;
    const variablePct = this.salState.variablePct || 0;

    const variableAmt = ctc * (variablePct / 100);
    const fixedCtc = Math.max(0, ctc - variableAmt);

    const basicDisp = document.getElementById('sal-basic-pct-display');
    const annualBasic = fixedCtc * (basicPct / 100);
    if (basicDisp) {
      basicDisp.textContent = basicPct + '% (₹' + Math.round(annualBasic).toLocaleString('en-IN') + '/yr)';
    }
    const varDisp = document.getElementById('sal-variable-display');
    if (varDisp) {
      varDisp.textContent = variablePct + '% (₹' + Math.round(variableAmt).toLocaleString('en-IN') + ')';
    }

    const monthlyBasic = annualBasic / 12;
    const hraPct = this.salState.isMetro ? 0.50 : 0.40;
    const annualHra = annualBasic * hraPct;
    const monthlyHra = annualHra / 12;

    let monthlyEpf = 0;
    let monthlyEmployerPf = 0;
    if (this.salState.epfMode === 'capped') {
      monthlyEpf = 1800;
      monthlyEmployerPf = 1800;
    } else {
      monthlyEpf = Math.round(monthlyBasic * 0.12);
      monthlyEmployerPf = monthlyEpf;
    }
    const annualEpf = monthlyEpf * 12;
    const annualEmployerPf = monthlyEmployerPf * 12;

    const annualGratuity = Math.round((annualBasic * 15) / 26 / 12);

    const annualGross = Math.max(0, fixedCtc - annualEmployerPf - annualGratuity);
    const monthlyGross = annualGross / 12;

    const monthlyPt = this.salState.ptAmount;
    const annualPt = monthlyPt * 12;

    let annualTax = 0;
    if (this.salState.regime === 'new') {
      const standardDed = 75000;
      const taxableIncome = Math.max(0, annualGross - standardDed);

      if (taxableIncome <= 1200000) {
        annualTax = 0;
      } else {
        let t = 0;
        if (taxableIncome > 1500000) {
          t += (taxableIncome - 1500000) * 0.30;
          t += 300000 * 0.20;
          t += 200000 * 0.15;
          t += 300000 * 0.10;
          t += 400000 * 0.05;
        } else if (taxableIncome > 1200000) {
          t += (taxableIncome - 1200000) * 0.20;
          t += 200000 * 0.15;
          t += 300000 * 0.10;
          t += 400000 * 0.05;
        } else if (taxableIncome > 1000000) {
          t += (taxableIncome - 1000000) * 0.15;
          t += 300000 * 0.10;
          t += 400000 * 0.05;
        } else if (taxableIncome > 700000) {
          t += (taxableIncome - 700000) * 0.10;
          t += 400000 * 0.05;
        } else if (taxableIncome > 300000) {
          t += (taxableIncome - 300000) * 0.05;
        }
        annualTax = t * 1.04;
      }
    } else {
      const standardDed = 50000;
      const sec80c = Math.min(annualEpf, 150000);
      const taxableIncome = Math.max(0, annualGross - standardDed - sec80c);

      if (taxableIncome <= 500000) {
        annualTax = 0;
      } else {
        let t = 0;
        if (taxableIncome > 1000000) {
          t += (taxableIncome - 1000000) * 0.30;
          t += 500000 * 0.20;
          t += 250000 * 0.05;
        } else if (taxableIncome > 500000) {
          t += (taxableIncome - 500000) * 0.20;
          t += 250000 * 0.05;
        } else if (taxableIncome > 250000) {
          t += (taxableIncome - 250000) * 0.05;
        }
        annualTax = t * 1.04;
      }
    }

    const monthlyTax = Math.round(annualTax / 12);
    const monthlyTotalDeductions = monthlyEpf + monthlyPt + monthlyTax;
    const monthlyInHand = Math.max(0, Math.round(monthlyGross - monthlyTotalDeductions));
    const annualInHand = monthlyInHand * 12;

    const inHandPct = monthlyGross > 0 ? Math.min(100, (monthlyInHand / monthlyGross) * 100) : 0;
    const pfPct = monthlyGross > 0 ? (monthlyEpf / monthlyGross) * 100 : 0;
    const taxPct = monthlyGross > 0 ? (monthlyTax / monthlyGross) * 100 : 0;

    const el = (id) => document.getElementById(id);
    if (el('res-sal-inhand-monthly')) el('res-sal-inhand-monthly').textContent = '₹' + Math.round(monthlyInHand).toLocaleString('en-IN') + ' / mo';
    if (el('res-sal-inhand-annual')) el('res-sal-inhand-annual').textContent = '₹' + Math.round(annualInHand).toLocaleString('en-IN');
    if (el('res-sal-gross-monthly')) el('res-sal-gross-monthly').textContent = '₹' + Math.round(monthlyGross).toLocaleString('en-IN');
    if (el('res-sal-tax-monthly')) el('res-sal-tax-monthly').textContent = '₹' + Math.round(monthlyTax).toLocaleString('en-IN');
    if (el('res-sal-deductions-monthly')) el('res-sal-deductions-monthly').textContent = '₹' + Math.round(monthlyTotalDeductions).toLocaleString('en-IN');
    if (el('res-sal-epf-monthly')) el('res-sal-epf-monthly').textContent = '₹' + Math.round(monthlyEpf).toLocaleString('en-IN');

    const badge = el('res-sal-regime-badge');
    if (badge) {
      if (this.salState.regime === 'new' && annualTax === 0) {
        badge.textContent = '100% Tax-Free under New Tax Regime (Sec 87A Rebate)';
        badge.style.display = 'inline-flex';
      } else if (this.salState.regime === 'new') {
        badge.textContent = 'FY 2026-27 New Tax Regime Applied';
        badge.style.display = 'inline-flex';
      } else {
        badge.textContent = 'Old Tax Regime (with 80C Deductions)';
        badge.style.display = 'inline-flex';
      }
    }

    if (el('bar-sal-inhand-fill')) el('bar-sal-inhand-fill').style.width = inHandPct.toFixed(1) + '%';
    if (el('bar-sal-pf-fill')) el('bar-sal-pf-fill').style.width = pfPct.toFixed(1) + '%';
    if (el('bar-sal-tax-fill')) el('bar-sal-tax-fill').style.width = taxPct.toFixed(1) + '%';

    if (el('bar-sal-inhand-pct')) el('bar-sal-inhand-pct').textContent = inHandPct.toFixed(0) + '%';
    if (el('bar-sal-pf-pct')) el('bar-sal-pf-pct').textContent = pfPct.toFixed(0) + '%';
    if (el('bar-sal-tax-pct')) el('bar-sal-tax-pct').textContent = taxPct.toFixed(0) + '%';

    const tableBody = el('sal-breakdown-rows');
    if (tableBody) {
      const specialAllowanceAnnual = Math.max(0, annualGross - annualBasic - annualHra);
      tableBody.innerHTML = `
        <tr style="border-bottom:1px solid var(--card-border);">
          <td style="padding:0.45rem 0.75rem; font-weight:600;">Basic Salary (${basicPct}%)</td>
          <td style="padding:0.45rem 0.75rem; text-align:right;">₹${Math.round(annualBasic).toLocaleString('en-IN')}</td>
          <td style="padding:0.45rem 0.75rem; text-align:right; font-weight:600;">₹${Math.round(monthlyBasic).toLocaleString('en-IN')}</td>
        </tr>
        <tr style="border-bottom:1px solid var(--card-border); background:var(--bg-tertiary);">
          <td style="padding:0.45rem 0.75rem;">House Rent Allowance (HRA)</td>
          <td style="padding:0.45rem 0.75rem; text-align:right;">₹${Math.round(annualHra).toLocaleString('en-IN')}</td>
          <td style="padding:0.45rem 0.75rem; text-align:right;">₹${Math.round(monthlyHra).toLocaleString('en-IN')}</td>
        </tr>
        <tr style="border-bottom:1px solid var(--card-border);">
          <td style="padding:0.45rem 0.75rem;">Special / Other Allowances</td>
          <td style="padding:0.45rem 0.75rem; text-align:right;">₹${Math.round(specialAllowanceAnnual).toLocaleString('en-IN')}</td>
          <td style="padding:0.45rem 0.75rem; text-align:right;">₹${Math.round(specialAllowanceAnnual / 12).toLocaleString('en-IN')}</td>
        </tr>
        <tr style="border-bottom:1px solid var(--card-border); background:var(--bg-tertiary); font-weight:700;">
          <td style="padding:0.45rem 0.75rem; color:#2563eb;">Gross Salary</td>
          <td style="padding:0.45rem 0.75rem; text-align:right; color:#2563eb;">₹${Math.round(annualGross).toLocaleString('en-IN')}</td>
          <td style="padding:0.45rem 0.75rem; text-align:right; color:#2563eb;">₹${Math.round(monthlyGross).toLocaleString('en-IN')}</td>
        </tr>
        <tr style="border-bottom:1px solid var(--card-border);">
          <td style="padding:0.45rem 0.75rem; color:#dc2626;">Employee EPF (12%)</td>
          <td style="padding:0.45rem 0.75rem; text-align:right; color:#dc2626;">-₹${Math.round(annualEpf).toLocaleString('en-IN')}</td>
          <td style="padding:0.45rem 0.75rem; text-align:right; color:#dc2626;">-₹${Math.round(monthlyEpf).toLocaleString('en-IN')}</td>
        </tr>
        <tr style="border-bottom:1px solid var(--card-border); background:var(--bg-tertiary);">
          <td style="padding:0.45rem 0.75rem; color:#dc2626;">Professional Tax (PT)</td>
          <td style="padding:0.45rem 0.75rem; text-align:right; color:#dc2626;">-₹${Math.round(annualPt).toLocaleString('en-IN')}</td>
          <td style="padding:0.45rem 0.75rem; text-align:right; color:#dc2626;">-₹${Math.round(monthlyPt).toLocaleString('en-IN')}</td>
        </tr>
        <tr style="border-bottom:1px solid var(--card-border);">
          <td style="padding:0.45rem 0.75rem; color:#dc2626;">Income Tax / TDS (${this.salState.regime.toUpperCase()})</td>
          <td style="padding:0.45rem 0.75rem; text-align:right; color:#dc2626;">-₹${Math.round(annualTax).toLocaleString('en-IN')}</td>
          <td style="padding:0.45rem 0.75rem; text-align:right; color:#dc2626;">-₹${Math.round(monthlyTax).toLocaleString('en-IN')}</td>
        </tr>
        <tr style="background:#f0fdf4; font-weight:800; border-top:2px solid #86efac;">
          <td style="padding:0.55rem 0.75rem; color:#059669;">Net Monthly In-Hand Salary</td>
          <td style="padding:0.55rem 0.75rem; text-align:right; color:#059669;">₹${Math.round(annualInHand).toLocaleString('en-IN')}</td>
          <td style="padding:0.55rem 0.75rem; text-align:right; color:#059669; font-size:0.95rem;">₹${Math.round(monthlyInHand).toLocaleString('en-IN')}</td>
        </tr>
      `;
    }
  },

  // --- MODE 2: ADP SALARY CALCULATOR (GROSS-TO-NET PAYCHECK) ---
  onAdpGrossInput(val) {
    const num = parseFloat(val) || 0;
    this.adpState.grossAmt = num;
    const disp = document.getElementById('adp-gross-display');
    if (disp) disp.textContent = '$' + Math.round(num).toLocaleString('en-US');
    document.querySelectorAll('.adp-gross-pill').forEach(p => {
      p.classList.remove('active');
      p.style.background = 'transparent';
      p.style.color = 'var(--text-secondary)';
      p.style.borderColor = 'var(--card-border)';
      p.style.fontWeight = '400';
    });
    this.calcAdpSalary();
  },

  setAdpGross(val, btn) {
    this.adpState.grossAmt = val;
    const inp = document.getElementById('adp-gross-input');
    if (inp) inp.value = val;
    const disp = document.getElementById('adp-gross-display');
    if (disp) disp.textContent = '$' + Math.round(val).toLocaleString('en-US');

    document.querySelectorAll('.adp-gross-pill').forEach(p => {
      p.classList.remove('active');
      p.style.background = 'transparent';
      p.style.color = 'var(--text-secondary)';
      p.style.borderColor = 'var(--card-border)';
      p.style.fontWeight = '400';
    });
    if (btn) {
      btn.classList.add('active');
      btn.style.background = 'var(--btn-active-bg, #eff6ff)';
      btn.style.color = 'var(--btn-active-text, #2563eb)';
      btn.style.borderColor = 'var(--btn-active-border, #bfdbfe)';
      btn.style.fontWeight = '700';
    }
    this.calcAdpSalary();
  },

  setAdpFreq(freq, btn) {
    this.adpState.freq = freq;
    document.querySelectorAll('.adp-freq-pill').forEach(p => {
      p.classList.remove('active');
      p.style.background = 'transparent';
      p.style.color = 'var(--text-secondary)';
      p.style.borderColor = 'transparent';
      p.style.fontWeight = '400';
    });
    if (btn) {
      btn.classList.add('active');
      btn.style.background = 'var(--btn-active-bg, #eff6ff)';
      btn.style.color = 'var(--btn-active-text, #2563eb)';
      btn.style.borderColor = 'var(--btn-active-border, #bfdbfe)';
      btn.style.fontWeight = '700';
    }
    this.calcAdpSalary();
  },

  onAdp401kRange(val) {
    const num = parseFloat(val) || 0;
    this.adpState.pretax401kPct = num;
    this.calcAdpSalary();
  },

  onAdpTaxRate(val) {
    const num = parseFloat(val) || 0;
    this.adpState.fedTaxRate = num;
    this.calcAdpSalary();
  },

  onAdpFicaRate(val) {
    const num = parseFloat(val) || 6.2;
    this.adpState.ficaRate = num;
    this.calcAdpSalary();
  },

  onAdpMedRate(val) {
    const num = parseFloat(val) || 1.45;
    this.adpState.medRate = num;
    this.calcAdpSalary();
  },

  onAdpInsurance(val) {
    const num = parseFloat(val) || 0;
    this.adpState.insPerMonth = num;
    this.calcAdpSalary();
  },

  calcAdpSalary() {
    const annualGross = this.adpState.grossAmt || 0;
    const freq = this.adpState.freq || 'biweekly';

    const periodsMap = {
      biweekly: 26,
      semimonthly: 24,
      weekly: 52,
      monthly: 12
    };
    const periods = periodsMap[freq] || 26;

    const grossPerPeriod = annualGross / periods;
    const pretax401kPerPeriod = grossPerPeriod * (this.adpState.pretax401kPct / 100);
    const insPerPeriod = (this.adpState.insPerMonth * 12) / periods;

    const taxablePerPeriod = Math.max(0, grossPerPeriod - pretax401kPerPeriod - insPerPeriod);

    const fedTaxPerPeriod = taxablePerPeriod * (this.adpState.fedTaxRate / 100);
    const ficaPerPeriod = grossPerPeriod * (this.adpState.ficaRate / 100);
    const medPerPeriod = grossPerPeriod * (this.adpState.medRate / 100);

    const totalDeductionsPerPeriod = pretax401kPerPeriod + insPerPeriod + fedTaxPerPeriod + ficaPerPeriod + medPerPeriod;
    const netPaycheck = Math.max(0, grossPerPeriod - totalDeductionsPerPeriod);
    const netAnnual = netPaycheck * periods;

    const effectiveTaxRate = grossPerPeriod > 0 ? (totalDeductionsPerPeriod / grossPerPeriod) * 100 : 0;

    const netPct = grossPerPeriod > 0 ? (netPaycheck / grossPerPeriod) * 100 : 0;
    const pretaxPct = grossPerPeriod > 0 ? ((pretax401kPerPeriod + insPerPeriod) / grossPerPeriod) * 100 : 0;
    const taxPct = grossPerPeriod > 0 ? ((fedTaxPerPeriod + ficaPerPeriod + medPerPeriod) / grossPerPeriod) * 100 : 0;

    const el = (id) => document.getElementById(id);
    const disp401k = el('adp-401k-display');
    if (disp401k) {
      disp401k.textContent = this.adpState.pretax401kPct + '% ($' + Math.round(pretax401kPerPeriod).toLocaleString('en-US') + '/ck)';
    }

    if (el('res-adp-net-check')) el('res-adp-net-check').textContent = '$' + Math.round(netPaycheck).toLocaleString('en-US') + ' / ck';
    if (el('res-adp-net-annual')) el('res-adp-net-annual').textContent = '$' + Math.round(netAnnual).toLocaleString('en-US');
    if (el('res-adp-gross-check')) el('res-adp-gross-check').textContent = '$' + Math.round(grossPerPeriod).toLocaleString('en-US');
    if (el('res-adp-deductions-check')) el('res-adp-deductions-check').textContent = '$' + Math.round(totalDeductionsPerPeriod).toLocaleString('en-US');
    if (el('res-adp-fica-check')) el('res-adp-fica-check').textContent = '$' + Math.round(ficaPerPeriod + medPerPeriod).toLocaleString('en-US');
    if (el('res-adp-pretax-check')) el('res-adp-pretax-check').textContent = '$' + Math.round(pretax401kPerPeriod + insPerPeriod).toLocaleString('en-US');

    const badge = el('res-adp-tax-rate-badge');
    if (badge) {
      badge.textContent = 'Effective Total Deduction Rate: ' + effectiveTaxRate.toFixed(1) + '% of Gross';
    }

    if (el('bar-adp-net-fill')) el('bar-adp-net-fill').style.width = netPct.toFixed(1) + '%';
    if (el('bar-adp-pretax-fill')) el('bar-adp-pretax-fill').style.width = pretaxPct.toFixed(1) + '%';
    if (el('bar-adp-tax-fill')) el('bar-adp-tax-fill').style.width = taxPct.toFixed(1) + '%';

    if (el('bar-adp-net-pct')) el('bar-adp-net-pct').textContent = netPct.toFixed(0) + '%';
    if (el('bar-adp-pretax-pct')) el('bar-adp-pretax-pct').textContent = pretaxPct.toFixed(0) + '%';
    if (el('bar-adp-tax-pct')) el('bar-adp-tax-pct').textContent = taxPct.toFixed(0) + '%';

    const tableBody = el('adp-breakdown-rows');
    if (tableBody) {
      tableBody.innerHTML = `
        <tr style="border-bottom:1px solid var(--card-border);">
          <td style="padding:0.45rem 0.75rem; font-weight:700;">Gross Pay (${freq})</td>
          <td style="padding:0.45rem 0.75rem; text-align:right;">$${Math.round(annualGross).toLocaleString('en-US')}</td>
          <td style="padding:0.45rem 0.75rem; text-align:right; font-weight:700; color:#2563eb;">$${Math.round(grossPerPeriod).toLocaleString('en-US')}</td>
        </tr>
        <tr style="border-bottom:1px solid var(--card-border); background:var(--bg-tertiary);">
          <td style="padding:0.45rem 0.75rem;">Pre-Tax 401(k) Retirement (${this.adpState.pretax401kPct}%)</td>
          <td style="padding:0.45rem 0.75rem; text-align:right; color:#dc2626;">-$${Math.round(pretax401kPerPeriod * periods).toLocaleString('en-US')}</td>
          <td style="padding:0.45rem 0.75rem; text-align:right; color:#dc2626;">-$${Math.round(pretax401kPerPeriod).toLocaleString('en-US')}</td>
        </tr>
        <tr style="border-bottom:1px solid var(--card-border);">
          <td style="padding:0.45rem 0.75rem;">Health Insurance / Benefits</td>
          <td style="padding:0.45rem 0.75rem; text-align:right; color:#dc2626;">-$${Math.round(insPerPeriod * periods).toLocaleString('en-US')}</td>
          <td style="padding:0.45rem 0.75rem; text-align:right; color:#dc2626;">-$${Math.round(insPerPeriod).toLocaleString('en-US')}</td>
        </tr>
        <tr style="border-bottom:1px solid var(--card-border); background:var(--bg-tertiary);">
          <td style="padding:0.45rem 0.75rem;">Federal &amp; State Income Tax (${this.adpState.fedTaxRate}%)</td>
          <td style="padding:0.45rem 0.75rem; text-align:right; color:#dc2626;">-$${Math.round(fedTaxPerPeriod * periods).toLocaleString('en-US')}</td>
          <td style="padding:0.45rem 0.75rem; text-align:right; color:#dc2626;">-$${Math.round(fedTaxPerPeriod).toLocaleString('en-US')}</td>
        </tr>
        <tr style="border-bottom:1px solid var(--card-border);">
          <td style="padding:0.45rem 0.75rem;">FICA Social Security (6.2%)</td>
          <td style="padding:0.45rem 0.75rem; text-align:right; color:#dc2626;">-$${Math.round(ficaPerPeriod * periods).toLocaleString('en-US')}</td>
          <td style="padding:0.45rem 0.75rem; text-align:right; color:#dc2626;">-$${Math.round(ficaPerPeriod).toLocaleString('en-US')}</td>
        </tr>
        <tr style="border-bottom:1px solid var(--card-border); background:var(--bg-tertiary);">
          <td style="padding:0.45rem 0.75rem;">Medicare (1.45%)</td>
          <td style="padding:0.45rem 0.75rem; text-align:right; color:#dc2626;">-$${Math.round(medPerPeriod * periods).toLocaleString('en-US')}</td>
          <td style="padding:0.45rem 0.75rem; text-align:right; color:#dc2626;">-$${Math.round(medPerPeriod).toLocaleString('en-US')}</td>
        </tr>
        <tr style="background:#f0fdf4; font-weight:800; border-top:2px solid #86efac;">
          <td style="padding:0.55rem 0.75rem; color:#059669;">Net Take-Home Paycheck</td>
          <td style="padding:0.55rem 0.75rem; text-align:right; color:#059669;">$${Math.round(netAnnual).toLocaleString('en-US')}</td>
          <td style="padding:0.55rem 0.75rem; text-align:right; color:#059669; font-size:0.95rem;">$${Math.round(netPaycheck).toLocaleString('en-US')}</td>
        </tr>
      `;
    }
  },

  // --- MODE 3: 8TH PAY COMMISSION SALARY CALCULATOR ---
  onCpcBasicInput(val) {
    const num = parseFloat(val) || 0;
    this.cpcState.basic7th = num;
    const disp = document.getElementById('cpc-basic-display');
    if (disp) disp.textContent = '₹' + Math.round(num).toLocaleString('en-IN');
    document.querySelectorAll('.cpc-level-pill').forEach(p => {
      p.classList.remove('active');
      p.style.background = 'transparent';
      p.style.color = 'var(--text-secondary)';
      p.style.borderColor = 'var(--card-border)';
      p.style.fontWeight = '400';
    });
    this.calcCpcSalary();
  },

  setCpcBasic(val, levelName, btn) {
    this.cpcState.basic7th = val;
    this.cpcState.levelName = levelName;
    const inp = document.getElementById('cpc-basic-input');
    if (inp) inp.value = val;
    const disp = document.getElementById('cpc-basic-display');
    if (disp) disp.textContent = '₹' + Math.round(val).toLocaleString('en-IN');

    document.querySelectorAll('.cpc-level-pill').forEach(p => {
      p.classList.remove('active');
      p.style.background = 'transparent';
      p.style.color = 'var(--text-secondary)';
      p.style.borderColor = 'var(--card-border)';
      p.style.fontWeight = '400';
    });
    if (btn) {
      btn.classList.add('active');
      btn.style.background = 'var(--btn-active-bg, #eff6ff)';
      btn.style.color = 'var(--btn-active-text, #2563eb)';
      btn.style.borderColor = 'var(--btn-active-border, #bfdbfe)';
      btn.style.fontWeight = '700';
    }
    this.calcCpcSalary();
  },

  setCpcFitment(val, btn) {
    this.cpcState.fitment = val;
    const rng = document.getElementById('cpc-fitment-range');
    if (rng) rng.value = val;
    const disp = document.getElementById('cpc-fitment-display');
    if (disp) disp.textContent = val.toFixed(2) + '×';

    document.querySelectorAll('.cpc-fitment-pill').forEach(p => {
      p.classList.remove('active');
      p.style.background = 'transparent';
      p.style.color = 'var(--text-secondary)';
      p.style.borderColor = 'var(--card-border)';
      p.style.fontWeight = '400';
    });
    if (btn) {
      btn.classList.add('active');
      btn.style.background = 'var(--btn-active-bg, #eff6ff)';
      btn.style.color = 'var(--btn-active-text, #2563eb)';
      btn.style.borderColor = 'var(--btn-active-border, #bfdbfe)';
      btn.style.fontWeight = '700';
    }
    this.calcCpcSalary();
  },

  onCpcFitmentRange(val) {
    const num = parseFloat(val) || 2.57;
    this.cpcState.fitment = num;
    const disp = document.getElementById('cpc-fitment-display');
    if (disp) disp.textContent = num.toFixed(2) + '×';
    document.querySelectorAll('.cpc-fitment-pill').forEach(p => {
      p.classList.remove('active');
      p.style.background = 'transparent';
      p.style.color = 'var(--text-secondary)';
      p.style.borderColor = 'var(--card-border)';
      p.style.fontWeight = '400';
    });
    this.calcCpcSalary();
  },

  setCpcHra(rate, btn) {
    this.cpcState.hraRate = rate;
    document.querySelectorAll('.cpc-hra-pill').forEach(p => {
      p.classList.remove('active');
      p.style.background = 'transparent';
      p.style.color = 'var(--text-secondary)';
      p.style.borderColor = 'transparent';
      p.style.fontWeight = '400';
    });
    if (btn) {
      btn.classList.add('active');
      btn.style.background = 'var(--btn-active-bg, #eff6ff)';
      btn.style.color = 'var(--btn-active-text, #2563eb)';
      btn.style.borderColor = 'var(--btn-active-border, #bfdbfe)';
      btn.style.fontWeight = '700';
    }
    this.calcCpcSalary();
  },

  calcCpcSalary() {
    const basic7th = this.cpcState.basic7th || 0;
    const fitment = this.cpcState.fitment || 2.57;
    const hraRate = this.cpcState.hraRate || 0.20;

    const revisedBasic = Math.round(basic7th * fitment);
    const revisedHra = Math.round(revisedBasic * hraRate);

    let ta = 3600;
    if (basic7th <= 21700) ta = 1800;
    else if (basic7th >= 56100) ta = 7200;

    const projectedGross = revisedBasic + revisedHra + ta;

    const da7th = Math.round(basic7th * 0.63);
    const hra7thRate = (hraRate === 0.30) ? 0.27 : ((hraRate === 0.20) ? 0.18 : 0.09);
    const hra7th = Math.round(basic7th * hra7thRate);
    const ta7th = Math.round(ta * 1.63);
    const total7th = basic7th + da7th + hra7th + ta7th;

    const hikeMonthly = projectedGross - total7th;
    const hikePct = total7th > 0 ? (hikeMonthly / total7th) * 100 : 0;

    const el = (id) => document.getElementById(id);
    if (el('res-cpc-revised-basic')) el('res-cpc-revised-basic').textContent = '₹' + revisedBasic.toLocaleString('en-IN') + ' / mo';
    if (el('res-cpc-basic-sub')) {
      el('res-cpc-basic-sub').innerHTML = 'Current Basic: <strong>₹' + basic7th.toLocaleString('en-IN') + '</strong> &bull; Fitment: <strong>' + fitment.toFixed(2) + '×</strong>';
    }
    if (el('res-cpc-hike-badge')) {
      const sign = hikeMonthly >= 0 ? '+' : '';
      el('res-cpc-hike-badge').textContent = 'Estimated Net Salary Hike: ' + sign + '₹' + Math.round(hikeMonthly).toLocaleString('en-IN') + '/mo (' + sign + hikePct.toFixed(1) + '% over 7th CPC with 63% DA)';
    }
    if (el('res-cpc-gross')) el('res-cpc-gross').textContent = '₹' + Math.round(projectedGross).toLocaleString('en-IN') + ' / mo';
    if (el('res-cpc-hra')) el('res-cpc-hra').textContent = '₹' + Math.round(revisedHra).toLocaleString('en-IN') + ' / mo';
    if (el('res-cpc-ta')) el('res-cpc-ta').textContent = '₹' + Math.round(ta).toLocaleString('en-IN') + ' / mo';
    if (el('res-cpc-7th-total')) el('res-cpc-7th-total').textContent = '₹' + Math.round(total7th).toLocaleString('en-IN') + ' / mo';

    const tableBody = el('cpc-breakdown-rows');
    if (tableBody) {
      tableBody.innerHTML = `
        <tr style="border-bottom:1px solid var(--card-border);">
          <td style="padding:0.45rem 0.75rem; font-weight:600;">Basic Pay</td>
          <td style="padding:0.45rem 0.75rem; text-align:right;">₹${basic7th.toLocaleString('en-IN')}</td>
          <td style="padding:0.45rem 0.75rem; text-align:right; font-weight:700; color:#2563eb;">₹${revisedBasic.toLocaleString('en-IN')}</td>
        </tr>
        <tr style="border-bottom:1px solid var(--card-border); background:var(--bg-tertiary);">
          <td style="padding:0.45rem 0.75rem;">Dearness Allowance (DA)</td>
          <td style="padding:0.45rem 0.75rem; text-align:right;">₹${da7th.toLocaleString('en-IN')} (63%)</td>
          <td style="padding:0.45rem 0.75rem; text-align:right; color:#059669; font-weight:600;">₹0 (Merged into Basic)</td>
        </tr>
        <tr style="border-bottom:1px solid var(--card-border);">
          <td style="padding:0.45rem 0.75rem;">House Rent Allowance (HRA)</td>
          <td style="padding:0.45rem 0.75rem; text-align:right;">₹${hra7th.toLocaleString('en-IN')} (${(hra7thRate * 100).toFixed(0)}%)</td>
          <td style="padding:0.45rem 0.75rem; text-align:right;">₹${revisedHra.toLocaleString('en-IN')} (${(hraRate * 100).toFixed(0)}%)</td>
        </tr>
        <tr style="border-bottom:1px solid var(--card-border); background:var(--bg-tertiary);">
          <td style="padding:0.45rem 0.75rem;">Transport Allowance (TA)</td>
          <td style="padding:0.45rem 0.75rem; text-align:right;">₹${ta7th.toLocaleString('en-IN')}</td>
          <td style="padding:0.45rem 0.75rem; text-align:right;">₹${ta.toLocaleString('en-IN')}</td>
        </tr>
        <tr style="background:#f0fdf4; font-weight:800; border-top:2px solid #86efac;">
          <td style="padding:0.55rem 0.75rem; color:#059669;">Total Projected Gross Salary</td>
          <td style="padding:0.55rem 0.75rem; text-align:right; color:var(--text-secondary);">₹${total7th.toLocaleString('en-IN')}</td>
          <td style="padding:0.55rem 0.75rem; text-align:right; color:#059669; font-size:0.95rem;">₹${projectedGross.toLocaleString('en-IN')}</td>
        </tr>
      `;
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

    // 2. Loan Slider Sync & Presets (Bike Loan, Car Loan, General EMI)
    document.querySelectorAll('.loan-preset-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const amt = parseFloat(btn.dataset.amt);
        const rate = parseFloat(btn.dataset.rate);
        const years = parseFloat(btn.dataset.years);

        const amtInp = document.getElementById('loan-amount');
        const amtRange = document.getElementById('loan-amount-range');
        const rateInp = document.getElementById('loan-rate');
        const rateRange = document.getElementById('loan-rate-range');
        const yearsInp = document.getElementById('loan-years');
        const yearsRange = document.getElementById('loan-years-range');

        if (amtInp) amtInp.value = amt;
        if (amtRange) {
          if (amt > parseFloat(amtRange.max)) amtRange.max = amt * 1.5;
          amtRange.value = amt;
        }
        if (rateInp) rateInp.value = rate;
        if (rateRange) rateRange.value = rate;
        if (yearsInp) yearsInp.value = years;
        if (yearsRange) yearsRange.value = years;

        document.querySelectorAll('.loan-preset-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        this.calcLoanEMI();
      });
    });

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

    // 16. Inflation Inputs & Sliders
    const bindInfSync = (numId, sliderId) => {
      const numEl = document.getElementById(numId);
      const sliderEl = document.getElementById(sliderId);
      if (!numEl || !sliderEl) return;
      numEl.addEventListener('input', () => {
        sliderEl.value = numEl.value;
        this.calcInflation();
      });
      sliderEl.addEventListener('input', () => {
        numEl.value = sliderEl.value;
        this.calcInflation();
      });
    };

    bindInfSync('inf-amount', 'inf-amount-slider');
    bindInfSync('inf-rate', 'inf-rate-slider');
    bindInfSync('inf-years', 'inf-years-slider');

    // Mode Toggle Buttons
    document.querySelectorAll('.inf-mode-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.inf-mode-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.inflationMode = btn.getAttribute('data-mode') || 'forward';
        this.calcInflation();
      });
    });

    // Currency Switcher Buttons
    document.querySelectorAll('.inf-curr-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.inf-curr-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const c = btn.getAttribute('data-curr') || '₹';
        this.inflationCurr = c;
        document.querySelectorAll('.inf-curr-symbol').forEach(el => el.textContent = c);
        this.calcInflation();
      });
    });

    // Rate Preset Pills
    document.querySelectorAll('.inf-rate-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.inf-rate-pill').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const rVal = parseFloat(btn.getAttribute('data-rate'));
        const numEl = document.getElementById('inf-rate');
        const sliderEl = document.getElementById('inf-rate-slider');
        if (numEl) numEl.value = rVal;
        if (sliderEl) sliderEl.value = rVal;
        this.calcInflation();
      });
    });

    // Years Preset Pills
    document.querySelectorAll('.inf-years-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.inf-years-pill').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const yVal = parseFloat(btn.getAttribute('data-years'));
        const numEl = document.getElementById('inf-years');
        const sliderEl = document.getElementById('inf-years-slider');
        if (numEl) numEl.value = yVal;
        if (sliderEl) sliderEl.value = yVal;
        this.calcInflation();
      });
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
    this.syncInputSlider('heloc-draw-amount', 'heloc-draw-amount-range', () => this.calcHELOC());
    this.syncInputSlider('heloc-rate', 'heloc-rate-range', () => this.calcHELOC());
    this.syncInputSlider('heloc-extra-payment', 'heloc-extra-payment-range', () => this.calcHELOC());
    this.syncInputSlider('heloc-home-value', 'heloc-home-value-range', () => this.calcHELOC());
    this.syncInputSlider('heloc-mortgage', 'heloc-mortgage-range', () => this.calcHELOC());
    ['heloc-draw-amount', 'heloc-rate', 'heloc-draw-years', 'heloc-repay-years', 'heloc-extra-payment', 'heloc-home-value', 'heloc-mortgage', 'heloc-max-cltv'].forEach(id => {
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