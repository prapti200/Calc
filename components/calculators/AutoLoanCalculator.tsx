'use client';

import React, { useState, useMemo } from 'react';

export default function AutoLoanCalculator() {
  const [vehiclePrice, setVehiclePrice] = useState<number>(35000);
  const [downPayment, setDownPayment] = useState<number>(5000);
  const [tradeIn, setTradeIn] = useState<number>(2000);
  const [salesTaxPct, setSalesTaxPct] = useState<number>(6.5);
  const [interestRate, setInterestRate] = useState<number>(5.9);
  const [termMonths, setTermMonths] = useState<number>(60);
  const [currency, setCurrency] = useState<string>('$');

  const {
    taxAmount,
    totalFinanced,
    monthlyPayment,
    totalInterest,
    totalCost,
  } = useMemo(() => {
    const netPrice = Math.max(0, vehiclePrice - tradeIn);
    const tax = netPrice * (salesTaxPct / 100);
    const financed = Math.max(0, vehiclePrice + tax - downPayment - tradeIn);

    if (financed <= 0 || interestRate <= 0 || termMonths <= 0) {
      return {
        taxAmount: tax,
        totalFinanced: financed,
        monthlyPayment: 0,
        totalInterest: 0,
        totalCost: vehiclePrice + tax,
      };
    }

    const r = interestRate / 100 / 12;
    const factor = Math.pow(1 + r, termMonths);
    const monthly = (financed * r * factor) / (factor - 1);
    const totalFinancePayments = monthly * termMonths;
    const totalInt = totalFinancePayments - financed;

    return {
      taxAmount: tax,
      totalFinanced: financed,
      monthlyPayment: monthly,
      totalInterest: totalInt,
      totalCost: totalFinancePayments + downPayment + tradeIn,
    };
  }, [vehiclePrice, downPayment, tradeIn, salesTaxPct, interestRate, termMonths]);

  const formatMoney = (val: number) => {
    if (isNaN(val) || !isFinite(val)) return `${currency}0.00`;
    return `${currency}${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="calc-panel" id="auto-loan-calc-widget">
      <div className="panel-header">
        <div className="panel-title-group">
          <span className="topic-accent-icon">🚗</span>
          <h2 className="section-heading" style={{ fontSize: '1.25rem', margin: 0 }}>Auto Loan & Vehicle Financing Calculator</h2>
        </div>
        <div className="radio-pill-group">
          {[36, 48, 60, 72, 84].map((m) => (
            <button
              key={m}
              type="button"
              className={`radio-pill-btn ${termMonths === m ? 'active' : ''}`}
              onClick={() => setTermMonths(m)}
            >
              {m} Mo
            </button>
          ))}
        </div>
      </div>

      <div className="calc-split-layout">
        <div className="calc-inputs-side">
          <div className="form-group">
            <div className="form-label-row">
              <label htmlFor="auto-price">Vehicle Price</label>
              <span className="unit-hint">MSRP / Negotiated</span>
            </div>
            <div className="input-with-affix">
              <span className="affix">{currency}</span>
              <input
                type="number"
                id="auto-price"
                className="form-input"
                value={vehiclePrice}
                min={1000}
                step={500}
                onChange={(e) => setVehiclePrice(parseFloat(e.target.value) || 0)}
              />
            </div>
            <div className="slider-wrap">
              <input
                type="range"
                className="custom-range"
                min={5000}
                max={100000}
                step={1000}
                value={Math.min(vehiclePrice, 100000)}
                onChange={(e) => setVehiclePrice(parseFloat(e.target.value) || 0)}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div className="form-group">
              <label htmlFor="auto-down" style={{ fontSize: '0.8rem', fontWeight: 600 }}>Cash Down Payment</label>
              <div className="input-with-affix">
                <span className="affix">{currency}</span>
                <input
                  type="number"
                  id="auto-down"
                  className="form-input"
                  value={downPayment}
                  min={0}
                  step={500}
                  onChange={(e) => setDownPayment(parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="auto-tradein" style={{ fontSize: '0.8rem', fontWeight: 600 }}>Trade-in Value</label>
              <div className="input-with-affix">
                <span className="affix">{currency}</span>
                <input
                  type="number"
                  id="auto-tradein"
                  className="form-input"
                  value={tradeIn}
                  min={0}
                  step={500}
                  onChange={(e) => setTradeIn(parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div className="form-group">
              <label htmlFor="auto-rate" style={{ fontSize: '0.8rem', fontWeight: 600 }}>Interest Rate (APR)</label>
              <div className="input-with-affix">
                <input
                  type="number"
                  id="auto-rate"
                  className="form-input"
                  value={interestRate}
                  min={0.1}
                  max={25}
                  step={0.1}
                  onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
                />
                <span className="affix">%</span>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="auto-tax" style={{ fontSize: '0.8rem', fontWeight: 600 }}>Sales Tax %</label>
              <div className="input-with-affix">
                <input
                  type="number"
                  id="auto-tax"
                  className="form-input"
                  value={salesTaxPct}
                  min={0}
                  max={15}
                  step={0.1}
                  onChange={(e) => setSalesTaxPct(parseFloat(e.target.value) || 0)}
                />
                <span className="affix">%</span>
              </div>
            </div>
          </div>

          <div className="form-group">
            <div className="form-label-row">
              <label htmlFor="auto-term">Loan Term</label>
              <span className="unit-hint">{(termMonths / 12).toFixed(1)} Years</span>
            </div>
            <div className="input-with-affix">
              <input
                type="number"
                id="auto-term"
                className="form-input"
                value={termMonths}
                min={12}
                max={96}
                step={6}
                onChange={(e) => setTermMonths(parseInt(e.target.value) || 12)}
              />
              <span className="affix">Months</span>
            </div>
          </div>
        </div>

        <div className="calc-results-side">
          <div className="result-card-primary">
            <div className="result-label">Monthly Car Payment</div>
            <div className="result-value-huge" style={{ color: 'var(--accent-primary)' }}>
              {formatMoney(monthlyPayment)}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              For {termMonths} monthly payments
            </div>
          </div>

          <div className="result-stat-grid">
            <div className="stat-box">
              <div className="stat-box-label">Total Amount Financed</div>
              <div className="stat-box-val">{formatMoney(totalFinanced)}</div>
            </div>
            <div className="stat-box">
              <div className="stat-box-label">Total Interest Paid</div>
              <div className="stat-box-val" style={{ color: 'var(--accent-rose)' }}>{formatMoney(totalInterest)}</div>
            </div>
            <div className="stat-box">
              <div className="stat-box-label">Estimated Sales Tax</div>
              <div className="stat-box-val">{formatMoney(taxAmount)}</div>
            </div>
            <div className="stat-box">
              <div className="stat-box-label">Total All-In Vehicle Cost</div>
              <div className="stat-box-val" style={{ color: 'var(--accent-green)' }}>{formatMoney(totalCost)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
