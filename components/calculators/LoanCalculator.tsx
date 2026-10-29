'use client';

import React, { useState, useMemo } from 'react';

export default function LoanCalculator() {
  const [principal, setPrincipal] = useState<number>(25000);
  const [rate, setRate] = useState<number>(8.5);
  const [years, setYears] = useState<number>(5);
  const [currency, setCurrency] = useState<string>('$');

  const { emi, totalPayment, totalInterest, principalPct, interestPct, amortization } = useMemo(() => {
    if (principal <= 0 || rate <= 0 || years <= 0) {
      return { emi: 0, totalPayment: 0, totalInterest: 0, principalPct: 100, interestPct: 0, amortization: [] };
    }

    const monthlyRate = rate / 12 / 100;
    const totalMonths = years * 12;
    const factor = Math.pow(1 + monthlyRate, totalMonths);
    const monthlyEmi = (principal * monthlyRate * factor) / (factor - 1);
    const totalPay = monthlyEmi * totalMonths;
    const totalInt = totalPay - principal;

    const pPct = totalPay > 0 ? (principal / totalPay) * 100 : 100;
    const iPct = totalPay > 0 ? (totalInt / totalPay) * 100 : 0;

    // Amortization preview (first 5 years)
    let balance = principal;
    const schedule: { year: number; principalPaid: number; interestPaid: number; balance: number }[] = [];
    const maxYears = Math.min(years, 5);

    for (let y = 1; y <= maxYears; y++) {
      let yPrin = 0;
      let yInt = 0;
      for (let m = 0; m < 12; m++) {
        const intM = balance * monthlyRate;
        const prinM = monthlyEmi - intM;
        yInt += intM;
        yPrin += prinM;
        balance -= prinM;
        if (balance < 0) balance = 0;
      }
      schedule.push({
        year: y,
        principalPaid: yPrin,
        interestPaid: yInt,
        balance: balance,
      });
    }

    return {
      emi: monthlyEmi,
      totalPayment: totalPay,
      totalInterest: totalInt,
      principalPct: pPct,
      interestPct: iPct,
      amortization: schedule,
    };
  }, [principal, rate, years]);

  const formatMoney = (val: number) => {
    if (isNaN(val) || !isFinite(val)) return `${currency}0.00`;
    return `${currency}${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="calc-panel" id="loan-calc-widget">
      <div className="panel-header">
        <div className="panel-title-group">
          <span className="topic-accent-icon">💰</span>
          <h2 className="section-heading" style={{ fontSize: '1.25rem', margin: 0 }}>Loan Payment & EMI Solver</h2>
        </div>
        <div className="radio-pill-group">
          {[1, 3, 5, 10, 20].map((term) => (
            <button
              key={term}
              type="button"
              className={`radio-pill-btn ${years === term ? 'active' : ''}`}
              onClick={() => setYears(term)}
            >
              {term} Yr
            </button>
          ))}
        </div>
      </div>

      <div className="calc-split-layout">
        {/* Left Inputs */}
        <div className="calc-inputs-side">
          <div className="form-group">
            <div className="form-label-row">
              <label htmlFor="loan-principal">Loan Amount</label>
              <div className="currency-selector-inline" style={{ display: 'inline-flex', gap: '4px' }}>
                {['$', '₹', '€', '£'].map((curr) => (
                  <button
                    key={curr}
                    type="button"
                    style={{
                      border: '1px solid var(--card-border)',
                      background: currency === curr ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
                      color: currency === curr ? '#fff' : 'var(--text-secondary)',
                      borderRadius: '4px',
                      padding: '1px 6px',
                      fontSize: '0.72rem',
                      cursor: 'pointer',
                    }}
                    onClick={() => setCurrency(curr)}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            </div>
            <div className="input-with-affix">
              <span className="affix">{currency}</span>
              <input
                type="number"
                id="loan-principal"
                className="form-input"
                value={principal}
                min={500}
                max={5000000}
                step={500}
                onChange={(e) => setPrincipal(parseFloat(e.target.value) || 0)}
              />
            </div>
            <div className="slider-wrap">
              <input
                type="range"
                className="custom-range"
                min={1000}
                max={200000}
                step={1000}
                value={Math.min(principal, 200000)}
                onChange={(e) => setPrincipal(parseFloat(e.target.value) || 0)}
              />
            </div>
          </div>

          <div className="form-group">
            <div className="form-label-row">
              <label htmlFor="loan-interest-rate">Annual Interest Rate</label>
              <span className="unit-hint">APR %</span>
            </div>
            <div className="input-with-affix">
              <input
                type="number"
                id="loan-interest-rate"
                className="form-input"
                value={rate}
                min={0.5}
                max={35}
                step={0.1}
                onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
              />
              <span className="affix">%</span>
            </div>
            <div className="slider-wrap">
              <input
                type="range"
                className="custom-range"
                min={1}
                max={25}
                step={0.25}
                value={rate}
                onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
              />
            </div>
          </div>

          <div className="form-group">
            <div className="form-label-row">
              <label htmlFor="loan-term-years">Loan Tenure (Years)</label>
              <span className="unit-hint">{years * 12} Months</span>
            </div>
            <div className="input-with-affix">
              <input
                type="number"
                id="loan-term-years"
                className="form-input"
                value={years}
                min={1}
                max={30}
                step={1}
                onChange={(e) => setYears(parseFloat(e.target.value) || 1)}
              />
              <span className="affix">Years</span>
            </div>
            <div className="slider-wrap">
              <input
                type="range"
                className="custom-range"
                min={1}
                max={30}
                step={1}
                value={years}
                onChange={(e) => setYears(parseFloat(e.target.value) || 1)}
              />
            </div>
          </div>
        </div>

        {/* Right Results */}
        <div className="calc-results-side">
          <div className="result-card-primary">
            <div className="result-label">Monthly Payment (EMI)</div>
            <div className="result-value-huge" style={{ color: 'var(--accent-primary)' }}>
              {formatMoney(emi)}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              Due every month for {years * 12} installments
            </div>
          </div>

          <div className="result-stat-grid">
            <div className="stat-box">
              <div className="stat-box-label">Principal Amount</div>
              <div className="stat-box-val">{formatMoney(principal)}</div>
            </div>
            <div className="stat-box">
              <div className="stat-box-label">Total Interest Paid</div>
              <div className="stat-box-val" style={{ color: 'var(--accent-rose)' }}>{formatMoney(totalInterest)}</div>
            </div>
            <div className="stat-box" style={{ gridColumn: 'span 2' }}>
              <div className="stat-box-label">Total Amount Paid (Principal + Interest)</div>
              <div className="stat-box-val" style={{ color: 'var(--accent-green)' }}>{formatMoney(totalPayment)}</div>
            </div>
          </div>

          {/* Breakdown progress bar */}
          <div style={{ margin: '0.5rem 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 600, marginBottom: '4px' }}>
              <span>Principal: {principalPct.toFixed(1)}%</span>
              <span>Interest: {interestPct.toFixed(1)}%</span>
            </div>
            <div style={{ display: 'flex', height: '10px', borderRadius: '6px', overflow: 'hidden' }}>
              <div style={{ width: `${principalPct}%`, background: 'var(--accent-primary)' }} />
              <div style={{ width: `${interestPct}%`, background: 'var(--accent-rose)' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Amortization schedule table */}
      {amortization.length > 0 && (
        <div style={{ padding: '1.25rem 1.5rem', borderTop: '1px solid var(--card-border)', background: 'var(--bg-secondary)' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem' }}>Annual Amortization Schedule (First 5 Years)</h3>
          <div style={{ overflowX: 'auto' }}>
            <table className="breakdown-table">
              <thead>
                <tr>
                  <th>Period</th>
                  <th>Principal Paid</th>
                  <th>Interest Paid</th>
                  <th>Remaining Balance</th>
                </tr>
              </thead>
              <tbody>
                {amortization.map((row) => (
                  <tr key={row.year}>
                    <td>Year {row.year}</td>
                    <td>{formatMoney(row.principalPaid)}</td>
                    <td>{formatMoney(row.interestPaid)}</td>
                    <td>{formatMoney(row.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
