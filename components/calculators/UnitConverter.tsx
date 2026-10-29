'use client';

import React, { useState, useMemo } from 'react';

type UnitCategory = 'length' | 'weight' | 'temperature' | 'area' | 'speed';

interface UnitDef {
  id: string;
  name: string;
  toBase: (v: number) => number;
  fromBase: (v: number) => number;
}

const UNIT_DATA: Record<UnitCategory, { name: string; units: UnitDef[] }> = {
  length: {
    name: 'Length',
    units: [
      { id: 'm', name: 'Meters (m)', toBase: v => v, fromBase: v => v },
      { id: 'km', name: 'Kilometers (km)', toBase: v => v * 1000, fromBase: v => v / 1000 },
      { id: 'cm', name: 'Centimeters (cm)', toBase: v => v / 100, fromBase: v => v * 100 },
      { id: 'mm', name: 'Millimeters (mm)', toBase: v => v / 1000, fromBase: v => v * 1000 },
      { id: 'in', name: 'Inches (in)', toBase: v => v * 0.0254, fromBase: v => v / 0.0254 },
      { id: 'ft', name: 'Feet (ft)', toBase: v => v * 0.3048, fromBase: v => v / 0.3048 },
      { id: 'yd', name: 'Yards (yd)', toBase: v => v * 0.9144, fromBase: v => v / 0.9144 },
      { id: 'mi', name: 'Miles (mi)', toBase: v => v * 1609.344, fromBase: v => v / 1609.344 },
    ],
  },
  weight: {
    name: 'Weight & Mass',
    units: [
      { id: 'kg', name: 'Kilograms (kg)', toBase: v => v, fromBase: v => v },
      { id: 'g', name: 'Grams (g)', toBase: v => v / 1000, fromBase: v => v * 1000 },
      { id: 'mg', name: 'Milligrams (mg)', toBase: v => v / 1000000, fromBase: v => v * 1000000 },
      { id: 'lb', name: 'Pounds (lbs)', toBase: v => v * 0.45359237, fromBase: v => v / 0.45359237 },
      { id: 'oz', name: 'Ounces (oz)', toBase: v => v * 0.0283495, fromBase: v => v / 0.0283495 },
      { id: 'ton', name: 'Metric Tons (t)', toBase: v => v * 1000, fromBase: v => v / 1000 },
    ],
  },
  temperature: {
    name: 'Temperature',
    units: [
      { id: 'c', name: 'Celsius (°C)', toBase: v => v, fromBase: v => v },
      { id: 'f', name: 'Fahrenheit (°F)', toBase: v => (v - 32) * (5 / 9), fromBase: v => (v * (9 / 5)) + 32 },
      { id: 'k', name: 'Kelvin (K)', toBase: v => v - 273.15, fromBase: v => v + 273.15 },
    ],
  },
  area: {
    name: 'Area',
    units: [
      { id: 'sqm', name: 'Square Meters (m²)', toBase: v => v, fromBase: v => v },
      { id: 'sqft', name: 'Square Feet (sq ft)', toBase: v => v * 0.092903, fromBase: v => v / 0.092903 },
      { id: 'sqkm', name: 'Square Kilometers (km²)', toBase: v => v * 1000000, fromBase: v => v / 1000000 },
      { id: 'acre', name: 'Acres (ac)', toBase: v => v * 4046.86, fromBase: v => v / 4046.86 },
      { id: 'hectare', name: 'Hectares (ha)', toBase: v => v * 10000, fromBase: v => v / 10000 },
    ],
  },
  speed: {
    name: 'Speed',
    units: [
      { id: 'kmh', name: 'Kilometers per hour (km/h)', toBase: v => v, fromBase: v => v },
      { id: 'mph', name: 'Miles per hour (mph)', toBase: v => v * 1.60934, fromBase: v => v / 1.60934 },
      { id: 'ms', name: 'Meters per second (m/s)', toBase: v => v * 3.6, fromBase: v => v / 3.6 },
      { id: 'knot', name: 'Knots (kn)', toBase: v => v * 1.852, fromBase: v => v / 1.852 },
    ],
  },
};

export default function UnitConverter() {
  const [category, setCategory] = useState<UnitCategory>('length');
  const [fromValue, setFromValue] = useState<number>(10);
  const [fromUnitId, setFromUnitId] = useState<string>('m');
  const [toUnitId, setToUnitId] = useState<string>('ft');

  const currentCategoryData = UNIT_DATA[category];

  const convertedValue = useMemo(() => {
    const fromDef = currentCategoryData.units.find(u => u.id === fromUnitId) || currentCategoryData.units[0];
    const toDef = currentCategoryData.units.find(u => u.id === toUnitId) || currentCategoryData.units[1];

    const baseValue = fromDef.toBase(fromValue);
    return toDef.fromBase(baseValue);
  }, [category, fromValue, fromUnitId, toUnitId, currentCategoryData]);

  const handleCategoryChange = (cat: UnitCategory) => {
    setCategory(cat);
    const units = UNIT_DATA[cat].units;
    setFromUnitId(units[0].id);
    setToUnitId(units[1]?.id || units[0].id);
  };

  const handleSwap = () => {
    const temp = fromUnitId;
    setFromUnitId(toUnitId);
    setToUnitId(temp);
  };

  return (
    <div className="calc-panel" id="unit-converter-widget">
      <div className="panel-header">
        <div className="panel-title-group">
          <span className="topic-accent-icon">🔄</span>
          <h2 className="section-heading" style={{ fontSize: '1.25rem', margin: 0 }}>Universal Precision Unit Converter</h2>
        </div>
        <div className="radio-pill-group" style={{ overflowX: 'auto', maxWidth: '100%' }}>
          {(Object.keys(UNIT_DATA) as UnitCategory[]).map((cat) => (
            <button
              key={cat}
              type="button"
              className={`radio-pill-btn ${category === cat ? 'active' : ''}`}
              onClick={() => handleCategoryChange(cat)}
            >
              {UNIT_DATA[cat].name}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: '1.5rem' }}>
        <div className="unit-converter-grid">
          {/* From Side */}
          <div className="form-group">
            <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-secondary)' }}>From</label>
            <input
              type="number"
              className="form-input"
              style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--card-border)', borderRadius: '10px' }}
              value={fromValue}
              onChange={(e) => setFromValue(parseFloat(e.target.value) || 0)}
            />
            <select
              className="form-select"
              value={fromUnitId}
              onChange={(e) => setFromUnitId(e.target.value)}
            >
              {currentCategoryData.units.map((u) => (
                <option key={u.id} value={u.id}>{u.name}</option>
              ))}
            </select>
          </div>

          {/* Swap Button */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              type="button"
              className="swap-btn-circular"
              title="Swap Units"
              onClick={handleSwap}
            >
              ⇄
            </button>
          </div>

          {/* To Side */}
          <div className="form-group">
            <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-secondary)' }}>To (Result)</label>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '1.4rem',
                fontWeight: 800,
                color: 'var(--accent-primary)',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--card-border)',
                borderRadius: '10px',
                padding: '0.65rem 0.85rem',
                marginBottom: '0.5rem',
                overflowX: 'auto',
                whiteSpace: 'nowrap',
              }}
            >
              {convertedValue.toLocaleString('en-US', { maximumFractionDigits: 6 })}
            </div>
            <select
              className="form-select"
              value={toUnitId}
              onChange={(e) => setToUnitId(e.target.value)}
            >
              {currentCategoryData.units.map((u) => (
                <option key={u.id} value={u.id}>{u.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Reference Equation */}
        <div style={{ marginTop: '1.5rem', textAlign: 'center', background: 'var(--bg-tertiary)', padding: '0.85rem 1rem', borderRadius: '12px', border: '1px solid var(--card-border)' }}>
          <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            {fromValue} {currentCategoryData.units.find(u => u.id === fromUnitId)?.name} ={' '}
            <strong style={{ color: 'var(--accent-primary)' }}>
              {convertedValue.toLocaleString('en-US', { maximumFractionDigits: 6 })}{' '}
              {currentCategoryData.units.find(u => u.id === toUnitId)?.name}
            </strong>
          </span>
        </div>
      </div>
    </div>
  );
}
