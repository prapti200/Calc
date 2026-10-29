'use client';

import React, { useState, useMemo } from 'react';

export default function BMICalculator() {
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');
  const [weightKg, setWeightKg] = useState<number>(70);
  const [heightCm, setHeightCm] = useState<number>(175);
  const [weightLbs, setWeightLbs] = useState<number>(154);
  const [heightFeet, setHeightFeet] = useState<number>(5);
  const [heightInches, setHeightInches] = useState<number>(9);

  const { bmi, category, color, gaugePct, healthyRangeMin, healthyRangeMax } = useMemo(() => {
    let weightInKg = weightKg;
    let heightInM = heightCm / 100;

    if (unitSystem === 'imperial') {
      weightInKg = weightLbs * 0.45359237;
      const totalInches = (heightFeet * 12) + heightInches;
      heightInM = totalInches * 0.0254;
    }

    if (weightInKg <= 0 || heightInM <= 0) {
      return {
        bmi: 0,
        category: 'Normal',
        color: '#10b981',
        gaugePct: 50,
        healthyRangeMin: 0,
        healthyRangeMax: 0,
      };
    }

    const calculatedBMI = weightInKg / (heightInM * heightInM);

    let cat = 'Normal Weight';
    let catColor = '#10b981';

    if (calculatedBMI < 18.5) {
      cat = 'Underweight';
      catColor = '#38bdf8';
    } else if (calculatedBMI < 25) {
      cat = 'Normal Weight';
      catColor = '#10b981';
    } else if (calculatedBMI < 30) {
      cat = 'Overweight';
      catColor = '#f59e0b';
    } else {
      cat = 'Obesity';
      catColor = '#ef4444';
    }

    // Gauge positioning (clamp between 10 and 40 BMI for 0% to 100%)
    const clamped = Math.max(10, Math.min(40, calculatedBMI));
    const pct = ((clamped - 10) / 30) * 100;

    // Healthy weight range (BMI 18.5 to 24.9)
    const minW = 18.5 * (heightInM * heightInM);
    const maxW = 24.9 * (heightInM * heightInM);

    return {
      bmi: calculatedBMI,
      category: cat,
      color: catColor,
      gaugePct: pct,
      healthyRangeMin: unitSystem === 'metric' ? minW : minW * 2.20462,
      healthyRangeMax: unitSystem === 'metric' ? maxW : maxW * 2.20462,
    };
  }, [unitSystem, weightKg, heightCm, weightLbs, heightFeet, heightInches]);

  return (
    <div className="calc-panel" id="bmi-calc-widget">
      <div className="panel-header">
        <div className="panel-title-group">
          <span className="topic-accent-icon">⚖️</span>
          <h2 className="section-heading" style={{ fontSize: '1.25rem', margin: 0 }}>Body Mass Index (BMI) & Ideal Weight Gauge</h2>
        </div>
        <div className="radio-pill-group">
          <button
            type="button"
            className={`radio-pill-btn ${unitSystem === 'metric' ? 'active' : ''}`}
            onClick={() => setUnitSystem('metric')}
          >
            Metric (kg, cm)
          </button>
          <button
            type="button"
            className={`radio-pill-btn ${unitSystem === 'imperial' ? 'active' : ''}`}
            onClick={() => setUnitSystem('imperial')}
          >
            US (lbs, ft+in)
          </button>
        </div>
      </div>

      <div className="calc-split-layout">
        <div className="calc-inputs-side">
          {unitSystem === 'metric' ? (
            <>
              <div className="form-group">
                <div className="form-label-row">
                  <label htmlFor="bmi-height-cm">Height</label>
                  <span className="unit-hint">Centimeters</span>
                </div>
                <div className="input-with-affix">
                  <input
                    type="number"
                    id="bmi-height-cm"
                    className="form-input"
                    value={heightCm}
                    min={50}
                    max={250}
                    step={1}
                    onChange={(e) => setHeightCm(parseFloat(e.target.value) || 0)}
                  />
                  <span className="affix">cm</span>
                </div>
                <div className="slider-wrap">
                  <input
                    type="range"
                    className="custom-range"
                    min={120}
                    max={220}
                    step={1}
                    value={heightCm}
                    onChange={(e) => setHeightCm(parseFloat(e.target.value) || 0)}
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="form-label-row">
                  <label htmlFor="bmi-weight-kg">Weight</label>
                  <span className="unit-hint">Kilograms</span>
                </div>
                <div className="input-with-affix">
                  <input
                    type="number"
                    id="bmi-weight-kg"
                    className="form-input"
                    value={weightKg}
                    min={20}
                    max={300}
                    step={0.5}
                    onChange={(e) => setWeightKg(parseFloat(e.target.value) || 0)}
                  />
                  <span className="affix">kg</span>
                </div>
                <div className="slider-wrap">
                  <input
                    type="range"
                    className="custom-range"
                    min={30}
                    max={160}
                    step={1}
                    value={weightKg}
                    onChange={(e) => setWeightKg(parseFloat(e.target.value) || 0)}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div className="form-group">
                  <label htmlFor="bmi-height-ft" style={{ fontSize: '0.8rem', fontWeight: 600 }}>Height (Feet)</label>
                  <div className="input-with-affix">
                    <input
                      type="number"
                      id="bmi-height-ft"
                      className="form-input"
                      value={heightFeet}
                      min={2}
                      max={8}
                      step={1}
                      onChange={(e) => setHeightFeet(parseInt(e.target.value) || 0)}
                    />
                    <span className="affix">ft</span>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="bmi-height-in" style={{ fontSize: '0.8rem', fontWeight: 600 }}>Inches</label>
                  <div className="input-with-affix">
                    <input
                      type="number"
                      id="bmi-height-in"
                      className="form-input"
                      value={heightInches}
                      min={0}
                      max={11}
                      step={1}
                      onChange={(e) => setHeightInches(parseInt(e.target.value) || 0)}
                    />
                    <span className="affix">in</span>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <div className="form-label-row">
                  <label htmlFor="bmi-weight-lbs">Weight</label>
                  <span className="unit-hint">Pounds</span>
                </div>
                <div className="input-with-affix">
                  <input
                    type="number"
                    id="bmi-weight-lbs"
                    className="form-input"
                    value={weightLbs}
                    min={40}
                    max={600}
                    step={1}
                    onChange={(e) => setWeightLbs(parseFloat(e.target.value) || 0)}
                  />
                  <span className="affix">lbs</span>
                </div>
                <div className="slider-wrap">
                  <input
                    type="range"
                    className="custom-range"
                    min={60}
                    max={350}
                    step={1}
                    value={weightLbs}
                    onChange={(e) => setWeightLbs(parseFloat(e.target.value) || 0)}
                  />
                </div>
              </div>
            </>
          )}
        </div>

        <div className="calc-results-side">
          <div className="result-card-primary">
            <div className="result-label">Your Body Mass Index (BMI)</div>
            <div className="result-value-huge" style={{ color }}>
              {bmi.toFixed(1)} <span style={{ fontSize: '1rem', fontWeight: 600 }}>kg/m²</span>
            </div>
            <div style={{ marginTop: '0.4rem' }}>
              <span
                style={{
                  display: 'inline-block',
                  background: `${color}20`,
                  color: color,
                  border: `1px solid ${color}50`,
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  padding: '3px 12px',
                  borderRadius: '20px',
                }}
              >
                {category}
              </span>
            </div>
          </div>

          {/* Visual Spectrum Bar */}
          <div className="bmi-bar-container" style={{ margin: '1rem 0 0.5rem' }}>
            <div className="bmi-spectrum-bar" />
            <div className="bmi-pointer" style={{ left: `${gaugePct}%` }}>
              <span className="bmi-pointer-tag">{bmi.toFixed(1)}</span>
              <div className="bmi-needle-tip" />
            </div>
            <div className="bmi-labels-row">
              <span>Underweight (&lt;18.5)</span>
              <span>Normal (18.5-24.9)</span>
              <span>Overweight (25-29.9)</span>
              <span>Obese (30+)</span>
            </div>
          </div>

          <div className="result-stat-grid">
            <div className="stat-box" style={{ gridColumn: 'span 2' }}>
              <div className="stat-box-label">Healthy Weight Range for Your Height (BMI 18.5–24.9)</div>
              <div className="stat-box-val" style={{ color: 'var(--accent-green)' }}>
                {healthyRangeMin.toFixed(1)} – {healthyRangeMax.toFixed(1)} {unitSystem === 'metric' ? 'kg' : 'lbs'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
