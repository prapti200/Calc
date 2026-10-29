'use client';

import React, { useState, useMemo } from 'react';

export default function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState<number>(400000);
  const [downPayment, setDownPayment] = useState<number>(80000);
  const [termYears, setTermYears] = useState<number>(30);
  const [rate, setRate] = useState<number>(6.85);
  const [annualTax, setAnnualTax] = useState<number>(4800);
  const [annualIns, setAnnualIns] = useState<number>(1200);
  const [monthlyHOA, setMonthlyHOA] = useState<number>(0);
  const [currency, setCurrency] = useState<string>('$');

  const {
    loanAmount,
    downPaymentPct,
    monthlyPI,
    monthlyTax,
    monthlyIns,
    monthlyPMI,
    totalMonthlyPayment,
    totalInterest,
    totalLoanCost,
  } = useMemo(() => {
    const loan = Math.max(0, homePrice - downPayment);
    const downPct = homePrice > 0 ? (downPayment / homePrice) * 100 : 0;

    if (loan <= 0 || rate <= 0 || termYears <= 0) {
      return {
        loanAmount: loan,
        downPaymentPct: downPct,
        monthlyPI: 0,
        monthlyTax: annualTax / 12,
        monthlyIns: annualIns / 12,
        monthlyPMI: 0,
        totalMonthlyPayment: 0,
        totalInterest: 0,
        totalLoanCost: 0,
      };
    }

    const monthlyRate = rate / 100 / 12;
    const totalPayments = termYears * 12;
    const factor = Math.pow(1 + monthlyRate, totalPayments);
    const pi = (loan * monthlyRate * factor) / (factor - 1);

    const mTax = annualTax / 12;
    const mIns = annualIns / 12;

    // US PMI: ~0.75% per year if down payment < 20%
    const pmi = downPct < 20 ? (loan * 0.0075) / 12 : 0;

    const totalMo = pi + mTax + mIns + monthlyHOA + pmi;
    const totalCost = pi * totalPayments;
    const totalInt = totalCost - loan;

    return {
      loanAmount: loan,
      downPaymentPct: downPct,
      monthlyPI: pi,
      monthlyTax: mTax,
      monthlyIns: mIns,
      monthlyPMI: pmi,
      totalMonthlyPayment: totalMo,
      totalInterest: totalInt,
      totalLoanCost: totalCost,
    };
  }, [homePrice, downPayment, termYears, rate, annualTax, annualIns, monthlyHOA]);

  const formatMoney = (val: number) => {
    if (isNaN(val) || !isFinite(val)) return `${currency}0.00`;
    return `${currency}${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="calc-panel" id="mortgage-calc-widget">
      <div className="panel-header">
        <div className="panel-title-group">
          <span className="topic-accent-icon">🏠</span>
          <h2 className="section-heading" style={{ fontSize: '1.25rem', margin: 0 }}>US Mortgage Payment Solver</h2>
        </div>
        <div className="radio-pill-group">
          {[30, 20, 15].map((t) => (
            <button
              key={t}
              type="button"
              className={`radio-pill-btn ${termYears === t ? 'active' : ''}`}
              onClick={() => setTermYears(t)}
            >
              {t}-Yr Fixed
            </button>
          ))}
        </div>
      </div>

      <div className="calc-split-layout">
        <div className="calc-inputs-side">
          <div className="form-group">
            <div className="form-label-row">
              <label htmlFor="mort-price">Home Purchase Price</label>
              <span className="unit-hint">Total Value</span>
            </div>
            <div className="input-with-affix">
              <span className="affix">{currency}</span>
              <input
                type="number"
                id="mort-price"
                className="form-input"
                value={homePrice}
                min={20000}
                step={5000}
                onChange={(e) => {
                  const val = parseFloat(e.target.value) || 0;
                  setHomePrice(val);
                }}
              />
            </div>
            <div className="slider-wrap">
              <input
                type="range"
                className="custom-range"
                min={50000}
                max={1500000}
                step={10000}
                value={Math.min(homePrice, 1500000)}
                onChange={(e) => setHomePrice(parseFloat(e.target.value) || 0)}
              />
            </div>
          </div>

          <div className="form-group">
            <div className="form-label-row">
              <label htmlFor="mort-down">Down Payment ({downPaymentPct.toFixed(1)}%)</label>
              <span className="unit-hint">{downPaymentPct >= 20 ? '✅ 20%+ avoids PMI' : '⚠️ <20% requires PMI'}</span>
            </div>
            <div className="input-with-affix">
              <span className="affix">{currency}</span>
              <input
                type="number"
                id="mort-down"
                className="form-input"
                value={downPayment}
                min={0}
                step={5000}
                onChange={(e) => setDownPayment(parseFloat(e.target.value) || 0)}
              />
            </div>
            <div className="slider-wrap">
              <input
                type="range"
                className="custom-range"
                min={0}
                max={Math.max(homePrice, 500000)}
                step={5000}
                value={Math.min(downPayment, Math.max(homePrice, 500000))}
                onChange={(e) => setDownPayment(parseFloat(e.target.value) || 0)}
              />
            </div>
          </div>

          <div className="form-group">
            <div className="form-label-row">
              <label htmlFor="mort-rate">Interest Rate</label>
              <span className="unit-hint">Annual %</span>
            </div>
            <div className="input-with-affix">
              <input
                type="number"
                id="mort-rate"
                className="form-input"
                value={rate}
                min={1}
                max={20}
                step={0.05}
                onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
              />
              <span className="affix">%</span>
            </div>
            <div className="slider-wrap">
              <input
                type="range"
                className="custom-range"
                min={2}
                max={15}
                step={0.05}
                value={rate}
                onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div className="form-group">
              <label htmlFor="mort-tax" style={{ fontSize: '0.8rem', fontWeight: 600 }}>Annual Property Tax</label>
              <div className="input-with-affix">
                <span className="affix">{currency}</span>
                <input
                  type="number"
                  id="mort-tax"
                  className="form-input"
                  value={annualTax}
                  min={0}
                  step={100}
                  onChange={(e) => setAnnualTax(parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="mort-ins" style={{ fontSize: '0.8rem', fontWeight: 600 }}>Home Insurance/Yr</label>
              <div className="input-with-affix">
                <span className="affix">{currency}</span>
                <input
                  type="number"
                  id="mort-ins"
                  className="form-input"
                  value={annualIns}
                  min={0}
                  step={50}
                  onChange={(e) => setAnnualIns(parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="mort-hoa" style={{ fontSize: '0.8rem', fontWeight: 600 }}>Monthly HOA Fees (optional)</label>
            <div className="input-with-affix">
              <span className="affix">{currency}</span>
              <input
                type="number"
                id="mort-hoa"
                className="form-input"
                value={monthlyHOA}
                min={0}
                step={25}
                onChange={(e) => setMonthlyHOA(parseFloat(e.target.value) || 0)}
              />
            </div>
          </div>
        </div>

        <div className="calc-results-side">
          <div className="result-card-primary">
            <div className="result-label">Total Monthly Housing Cost</div>
            <div className="result-value-huge" style={{ color: 'var(--accent-primary)' }}>
              {formatMoney(totalMonthlyPayment)}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              Includes P&I + Property Tax + Insurance + PMI
            </div>
          </div>

          <div className="result-stat-grid">
            <div className="stat-box">
              <div className="stat-box-label">Principal & Interest (P&I)</div>
              <div className="stat-box-val">{formatMoney(monthlyPI)}/mo</div>
            </div>
            <div className="stat-box">
              <div className="stat-box-label">Property Taxes</div>
              <div className="stat-box-val">{formatMoney(monthlyTax)}/mo</div>
            </div>
            <div className="stat-box">
              <div className="stat-box-label">Homeowners Insurance</div>
              <div className="stat-box-val">{formatMoney(monthlyIns)}/mo</div>
            </div>
            <div className="stat-box">
              <div className="stat-box-label">Private Mortgage Ins (PMI)</div>
              <div className="stat-box-val" style={{ color: monthlyPMI > 0 ? 'var(--accent-rose)' : 'var(--accent-green)' }}>
                {monthlyPMI > 0 ? `${formatMoney(monthlyPMI)}/mo` : '$0 (None)'}
              </div>
            </div>
            <div className="stat-box">
              <div className="stat-box-label">Loan Financed</div>
              <div className="stat-box-val">{formatMoney(loanAmount)}</div>
            </div>
            <div className="stat-box">
              <div className="stat-box-label">Total Lifetime Interest</div>
              <div className="stat-box-val" style={{ color: 'var(--accent-rose)' }}>{formatMoney(totalInterest)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
