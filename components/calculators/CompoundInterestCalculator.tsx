'use client';

import React, { useState, useMemo } from 'react';

export default function CompoundInterestCalculator() {
  const [initialPrincipal, setInitialPrincipal] = useState<number>(10000);
  const [monthlyDeposit, setMonthlyDeposit] = useState<number>(500);
  const [annualRate, setAnnualRate] = useState<number>(8.0);
  const [years, setYears] = useState<number>(15);
  const [compoundFreq, setCompoundFreq] = useState<number>(12); // monthly
  const [currency, setCurrency] = useState<string>('$');

  const {
    totalContributions,
    futureValue,
    totalInterestEarned,
    growthMultiplier,
  } = useMemo(() => {
    if (annualRate < 0 || years <= 0) {
      return { totalContributions: initialPrincipal, futureValue: initialPrincipal, totalInterestEarned: 0, growthMultiplier: 1 };
    }

    const r = annualRate / 100;
    const n = compoundFreq;
    const t = years;

    // Principal future value: P * (1 + r/n)^(n*t)
    const principalFV = initialPrincipal * Math.pow(1 + r / n, n * t);

    // Recurring deposits future value (assuming monthly deposits converted to compound freq)
    // PMT * [((1 + r/n)^(n*t) - 1) / (r/n)]
    let depositFV = 0;
    if (monthlyDeposit > 0) {
      const annualDeposit = monthlyDeposit * 12;
      const depositPerPeriod = annualDeposit / n;
      depositFV = depositPerPeriod * ((Math.pow(1 + r / n, n * t) - 1) / (r / n));
    }

    const totalFV = principalFV + depositFV;
    const totalDeposits = initialPrincipal + (monthlyDeposit * 12 * t);
    const totalInt = totalFV - totalDeposits;
    const mult = totalDeposits > 0 ? totalFV / totalDeposits : 1;

    return {
      totalContributions: totalDeposits,
      futureValue: totalFV,
      totalInterestEarned: totalInt,
      growthMultiplier: mult,
    };
  }, [initialPrincipal, monthlyDeposit, annualRate, years, compoundFreq]);

  const formatMoney = (val: number) => {
    if (isNaN(val) || !isFinite(val)) return `${currency}0.00`;
    return `${currency}${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="calc-panel" id="compound-interest-widget">
      <div className="panel-header">
        <div className="panel-title-group">
          <span className="topic-accent-icon">📈</span>
          <h2 className="section-heading" style={{ fontSize: '1.25rem', margin: 0 }}>Compound Interest & Wealth Growth Calculator</h2>
        </div>
        <div className="radio-pill-group">
          {[5, 10, 15, 20, 30].map((y) => (
            <button
              key={y}
              type="button"
              className={`radio-pill-btn ${years === y ? 'active' : ''}`}
              onClick={() => setYears(y)}
            >
              {y} Yrs
            </button>
          ))}
        </div>
      </div>

      <div className="calc-split-layout">
        <div className="calc-inputs-side">
          <div className="form-group">
            <div className="form-label-row">
              <label htmlFor="ci-principal">Initial Starting Investment</label>
              <span className="unit-hint">Initial Principal</span>
            </div>
            <div className="input-with-affix">
              <span className="affix">{currency}</span>
              <input
                type="number"
                id="ci-principal"
                className="form-input"
                value={initialPrincipal}
                min={0}
                step={500}
                onChange={(e) => setInitialPrincipal(parseFloat(e.target.value) || 0)}
              />
            </div>
            <div className="slider-wrap">
              <input
                type="range"
                className="custom-range"
                min={0}
                max={100000}
                step={1000}
                value={Math.min(initialPrincipal, 100000)}
                onChange={(e) => setInitialPrincipal(parseFloat(e.target.value) || 0)}
              />
            </div>
          </div>

          <div className="form-group">
            <div className="form-label-row">
              <label htmlFor="ci-monthly">Monthly Recurring Deposit</label>
              <span className="unit-hint">Added Every Month</span>
            </div>
            <div className="input-with-affix">
              <span className="affix">{currency}</span>
              <input
                type="number"
                id="ci-monthly"
                className="form-input"
                value={monthlyDeposit}
                min={0}
                step={50}
                onChange={(e) => setMonthlyDeposit(parseFloat(e.target.value) || 0)}
              />
            </div>
            <div className="slider-wrap">
              <input
                type="range"
                className="custom-range"
                min={0}
                max={5000}
                step={50}
                value={Math.min(monthlyDeposit, 5000)}
                onChange={(e) => setMonthlyDeposit(parseFloat(e.target.value) || 0)}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div className="form-group">
              <label htmlFor="ci-rate" style={{ fontSize: '0.8rem', fontWeight: 600 }}>Estimated Return %</label>
              <div className="input-with-affix">
                <input
                  type="number"
                  id="ci-rate"
                  className="form-input"
                  value={annualRate}
                  min={0.1}
                  max={30}
                  step={0.1}
                  onChange={(e) => setAnnualRate(parseFloat(e.target.value) || 0)}
                />
                <span className="affix">%</span>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="ci-freq" style={{ fontSize: '0.8rem', fontWeight: 600 }}>Compounding Frequency</label>
              <select
                id="ci-freq"
                className="form-select"
                value={compoundFreq}
                onChange={(e) => setCompoundFreq(parseInt(e.target.value) || 12)}
              >
                <option value={12}>Monthly (12/yr)</option>
                <option value={365}>Daily (365/yr)</option>
                <option value={4}>Quarterly (4/yr)</option>
                <option value={1}>Annually (1/yr)</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <div className="form-label-row">
              <label htmlFor="ci-years">Investment Duration</label>
              <span className="unit-hint">{years} Years</span>
            </div>
            <div className="input-with-affix">
              <input
                type="number"
                id="ci-years"
                className="form-input"
                value={years}
                min={1}
                max={50}
                step={1}
                onChange={(e) => setYears(parseInt(e.target.value) || 1)}
              />
              <span className="affix">Years</span>
            </div>
          </div>
        </div>

        <div className="calc-results-side">
          <div className="result-card-primary">
            <div className="result-label">Total Future Portfolio Value</div>
            <div className="result-value-huge" style={{ color: 'var(--accent-green)' }}>
              {formatMoney(futureValue)}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              Wealth multiplied by {growthMultiplier.toFixed(2)}x in {years} years
            </div>
          </div>

          <div className="result-stat-grid">
            <div className="stat-box">
              <div className="stat-box-label">Total Invested Principal</div>
              <div className="stat-box-val">{formatMoney(totalContributions)}</div>
            </div>
            <div className="stat-box">
              <div className="stat-box-label">Total Compound Interest Earned</div>
              <div className="stat-box-val" style={{ color: 'var(--accent-primary)' }}>{formatMoney(totalInterestEarned)}</div>
            </div>
          </div>

          <div style={{ margin: '0.5rem 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 600, marginBottom: '4px' }}>
              <span>Principal: {futureValue > 0 ? ((totalContributions / futureValue) * 100).toFixed(1) : 100}%</span>
              <span>Compound Gains: {futureValue > 0 ? ((totalInterestEarned / futureValue) * 100).toFixed(1) : 0}%</span>
            </div>
            <div style={{ display: 'flex', height: '10px', borderRadius: '6px', overflow: 'hidden' }}>
              <div style={{ width: `${futureValue > 0 ? (totalContributions / futureValue) * 100 : 100}%`, background: 'var(--accent-primary)' }} />
              <div style={{ width: `${futureValue > 0 ? (totalInterestEarned / futureValue) * 100 : 0}%`, background: 'var(--accent-green)' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
