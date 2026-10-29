'use client';

import React, { useState } from 'react';

export default function PercentageCalculator() {
  // Mode 1: What is X% of Y?
  const [p1X, setP1X] = useState<number>(15);
  const [p1Y, setP1Y] = useState<number>(200);

  // Mode 2: X is what % of Y?
  const [p2X, setP2X] = useState<number>(30);
  const [p2Y, setP2Y] = useState<number>(150);

  // Mode 3: Percent Change from X to Y
  const [p3X, setP3X] = useState<number>(50);
  const [p3Y, setP3Y] = useState<number>(75);

  const res1 = (p1X / 100) * p1Y;
  const res2 = p2Y !== 0 ? (p2X / p2Y) * 100 : 0;
  const changeDiff = p3Y - p3X;
  const res3Pct = p3X !== 0 ? ((p3Y - p3X) / p3X) * 100 : 0;

  return (
    <div className="calc-panel" id="percentage-calc-widget">
      <div className="panel-header">
        <div className="panel-title-group">
          <span className="topic-accent-icon">🔢</span>
          <h2 className="section-heading" style={{ fontSize: '1.25rem', margin: 0 }}>Percentage Multi-Solver & Percent Change</h2>
        </div>
      </div>

      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Card 1: What is X% of Y? */}
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--card-border)', borderRadius: '14px', padding: '1.25rem' }}>
          <div style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
            1. Percentage of a Number
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <span>What is</span>
            <div className="input-with-affix" style={{ width: '110px' }}>
              <input
                type="number"
                className="form-input"
                value={p1X}
                onChange={(e) => setP1X(parseFloat(e.target.value) || 0)}
              />
              <span className="affix">%</span>
            </div>
            <span>of</span>
            <div className="input-with-affix" style={{ width: '130px' }}>
              <input
                type="number"
                className="form-input"
                value={p1Y}
                onChange={(e) => setP1Y(parseFloat(e.target.value) || 0)}
              />
            </div>
            <span>=</span>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '1.4rem',
                fontWeight: 800,
                color: 'var(--accent-primary)',
                background: 'var(--bg-tertiary)',
                padding: '0.35rem 0.9rem',
                borderRadius: '8px',
                border: '1px solid var(--card-border)',
              }}
            >
              {res1.toLocaleString('en-US', { maximumFractionDigits: 4 })}
            </div>
          </div>
        </div>

        {/* Card 2: X is what % of Y? */}
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--card-border)', borderRadius: '14px', padding: '1.25rem' }}>
          <div style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
            2. Proportion & Ratio Percentage
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <div className="input-with-affix" style={{ width: '120px' }}>
              <input
                type="number"
                className="form-input"
                value={p2X}
                onChange={(e) => setP2X(parseFloat(e.target.value) || 0)}
              />
            </div>
            <span>is what percentage of</span>
            <div className="input-with-affix" style={{ width: '120px' }}>
              <input
                type="number"
                className="form-input"
                value={p2Y}
                onChange={(e) => setP2Y(parseFloat(e.target.value) || 0)}
              />
            </div>
            <span>=</span>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '1.4rem',
                fontWeight: 800,
                color: 'var(--accent-green)',
                background: 'var(--bg-tertiary)',
                padding: '0.35rem 0.9rem',
                borderRadius: '8px',
                border: '1px solid var(--card-border)',
              }}
            >
              {res2.toFixed(2)}%
            </div>
          </div>
        </div>

        {/* Card 3: Percentage Increase / Decrease */}
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--card-border)', borderRadius: '14px', padding: '1.25rem' }}>
          <div style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
            3. Percentage Increase / Decrease (Percent Change)
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <span>From</span>
            <div className="input-with-affix" style={{ width: '120px' }}>
              <input
                type="number"
                className="form-input"
                value={p3X}
                onChange={(e) => setP3X(parseFloat(e.target.value) || 0)}
              />
            </div>
            <span>to</span>
            <div className="input-with-affix" style={{ width: '120px' }}>
              <input
                type="number"
                className="form-input"
                value={p3Y}
                onChange={(e) => setP3Y(parseFloat(e.target.value) || 0)}
              />
            </div>
            <span>=</span>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '1.4rem',
                fontWeight: 800,
                color: res3Pct >= 0 ? 'var(--accent-green)' : 'var(--accent-rose)',
                background: 'var(--bg-tertiary)',
                padding: '0.35rem 0.9rem',
                borderRadius: '8px',
                border: '1px solid var(--card-border)',
              }}
            >
              {res3Pct >= 0 ? `+${res3Pct.toFixed(2)}%` : `${res3Pct.toFixed(2)}%`}
            </div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              ({changeDiff >= 0 ? `Increase of ${changeDiff}` : `Decrease of ${Math.abs(changeDiff)}`})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
