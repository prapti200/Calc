'use client';

import React, { useState, useMemo } from 'react';

export default function SIPCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(5000);
  const [expectedReturn, setExpectedReturn] = useState<number>(12.0);
  const [years, setYears] = useState<number>(10);
  const [currency, setCurrency] = useState<string>('₹');

  const { investedAmount, futureValue, wealthGain, gainMultiplier } = useMemo(() => {
    if (monthlyInvestment <= 0 || expectedReturn <= 0 || years <= 0) {
      return { investedAmount: 0, futureValue: 0, wealthGain: 0, gainMultiplier: 1 };
    }

    const i = expectedReturn / 12 / 100;
    const n = years * 12;

    // Standard SIP Formula: M = P × [((1 + i)^n - 1) / i] × (1 + i)
    const fv = monthlyInvestment * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    const invested = monthlyInvestment * n;
    const gain = fv - invested;
    const mult = invested > 0 ? fv / invested : 1;

    return {
      investedAmount: invested,
      futureValue: fv,
      wealthGain: gain,
      gainMultiplier: mult,
    };
  }, [monthlyInvestment, expectedReturn, years]);

  const formatMoney = (val: number) => {
    if (isNaN(val) || !isFinite(val)) return `${currency}0.00`;
    return `${currency}${val.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  return (
    <div className="calc-panel" id="sip-calc-widget">
      <div className="panel-header">
        <div className="panel-title-group">
          <span className="topic-accent-icon">📊</span>
          <h2 className="section-heading" style={{ fontSize: '1.25rem', margin: 0 }}>Systematic Investment Plan (SIP) Wealth Calculator</h2>
        </div>
        <div className="radio-pill-group">
          {['₹', '$', '€', '£'].map((curr) => (
            <button
              key={curr}
              type="button"
              className={`radio-pill-btn ${currency === curr ? 'active' : ''}`}
              onClick={() => setCurrency(curr)}
            >
              {curr}
            </button>
          ))}
        </div>
      </div>

      <div className="calc-split-layout">
        <div className="calc-inputs-side">
          <div className="form-group">
            <div className="form-label-row">
              <label htmlFor="sip-monthly">Monthly Investment</label>
              <span className="unit-hint">Periodic Installment</span>
            </div>
            <div className="input-with-affix">
              <span className="affix">{currency}</span>
              <input
                type="number"
                id="sip-monthly"
                className="form-input"
                value={monthlyInvestment}
                min={500}
                step={500}
                onChange={(e) => setMonthlyInvestment(parseFloat(e.target.value) || 0)}
              />
            </div>
            <div className="slider-wrap">
              <input
                type="range"
                className="custom-range"
                min={500}
                max={50000}
                step={500}
                value={Math.min(monthlyInvestment, 50000)}
                onChange={(e) => setMonthlyInvestment(parseFloat(e.target.value) || 0)}
              />
            </div>
          </div>

          <div className="form-group">
            <div className="form-label-row">
              <label htmlFor="sip-return">Expected Annual Return Rate</label>
              <span className="unit-hint">p.a. %</span>
            </div>
            <div className="input-with-affix">
              <input
                type="number"
                id="sip-return"
                className="form-input"
                value={expectedReturn}
                min={1}
                max={30}
                step={0.5}
                onChange={(e) => setExpectedReturn(parseFloat(e.target.value) || 0)}
              />
              <span className="affix">%</span>
            </div>
            <div className="slider-wrap">
              <input
                type="range"
                className="custom-range"
                min={5}
                max={25}
                step={0.5}
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(parseFloat(e.target.value) || 0)}
              />
            </div>
          </div>

          <div className="form-group">
            <div className="form-label-row">
              <label htmlFor="sip-years">Investment Period (Years)</label>
              <span className="unit-hint">{years * 12} Installments</span>
            </div>
            <div className="input-with-affix">
              <input
                type="number"
                id="sip-years"
                className="form-input"
                value={years}
                min={1}
                max={40}
                step={1}
                onChange={(e) => setYears(parseInt(e.target.value) || 1)}
              />
              <span className="affix">Years</span>
            </div>
            <div className="slider-wrap">
              <input
                type="range"
                className="custom-range"
                min={1}
                max={35}
                step={1}
                value={years}
                onChange={(e) => setYears(parseInt(e.target.value) || 1)}
              />
            </div>
          </div>
        </div>

        <div className="calc-results-side">
          <div className="result-card-primary">
            <div className="result-label">Expected Maturity Amount</div>
            <div className="result-value-huge" style={{ color: 'var(--accent-green)' }}>
              {formatMoney(futureValue)}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              Wealth multiplied by {gainMultiplier.toFixed(2)}x in {years} years
            </div>
          </div>

          <div className="result-stat-grid">
            <div className="stat-box">
              <div className="stat-box-label">Total Amount Invested</div>
              <div className="stat-box-val">{formatMoney(investedAmount)}</div>
            </div>
            <div className="stat-box">
              <div className="stat-box-label">Estimated Wealth Gain</div>
              <div className="stat-box-val" style={{ color: 'var(--accent-primary)' }}>{formatMoney(wealthGain)}</div>
            </div>
          </div>

          <div style={{ margin: '0.5rem 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 600, marginBottom: '4px' }}>
              <span>Invested: {futureValue > 0 ? ((investedAmount / futureValue) * 100).toFixed(1) : 100}%</span>
              <span>Returns: {futureValue > 0 ? ((wealthGain / futureValue) * 100).toFixed(1) : 0}%</span>
            </div>
            <div style={{ display: 'flex', height: '10px', borderRadius: '6px', overflow: 'hidden' }}>
              <div style={{ width: `${futureValue > 0 ? (investedAmount / futureValue) * 100 : 100}%`, background: 'var(--accent-primary)' }} />
              <div style={{ width: `${futureValue > 0 ? (wealthGain / futureValue) * 100 : 0}%`, background: 'var(--accent-green)' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
