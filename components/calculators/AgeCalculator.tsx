'use client';

import React, { useState, useMemo } from 'react';

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState<string>('1998-05-15');
  const [targetDate, setTargetDate] = useState<string>(new Date().toISOString().split('T')[0]);

  const {
    years,
    months,
    days,
    totalMonths,
    totalWeeks,
    totalDays,
    totalHours,
    daysUntilBirthday,
    nextBirthdayDayName,
  } = useMemo(() => {
    const bDate = new Date(birthDate);
    const tDate = new Date(targetDate);

    if (isNaN(bDate.getTime()) || isNaN(tDate.getTime()) || bDate > tDate) {
      return {
        years: 0,
        months: 0,
        days: 0,
        totalMonths: 0,
        totalWeeks: 0,
        totalDays: 0,
        totalHours: 0,
        daysUntilBirthday: 0,
        nextBirthdayDayName: '',
      };
    }

    let y = tDate.getFullYear() - bDate.getFullYear();
    let m = tDate.getMonth() - bDate.getMonth();
    let d = tDate.getDate() - bDate.getDate();

    if (d < 0) {
      m -= 1;
      const prevMonthLastDay = new Date(tDate.getFullYear(), tDate.getMonth(), 0).getDate();
      d += prevMonthLastDay;
    }

    if (m < 0) {
      y -= 1;
      m += 12;
    }

    const diffMs = tDate.getTime() - bDate.getTime();
    const totDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const totWeeks = Math.floor(totDays / 7);
    const totMonths = (y * 12) + m;
    const totHours = totDays * 24;

    // Next birthday calculation
    const currentYear = tDate.getFullYear();
    let nextBday = new Date(currentYear, bDate.getMonth(), bDate.getDate());
    if (nextBday < tDate) {
      nextBday = new Date(currentYear + 1, bDate.getMonth(), bDate.getDate());
    }
    const daysToBday = Math.ceil((nextBday.getTime() - tDate.getTime()) / (1000 * 60 * 60 * 24));
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const nextBdayName = dayNames[nextBday.getDay()];

    return {
      years: y,
      months: m,
      days: d,
      totalMonths: totMonths,
      totalWeeks: totWeeks,
      totalDays: totDays,
      totalHours: totHours,
      daysUntilBirthday: daysToBday,
      nextBirthdayDayName: nextBdayName,
    };
  }, [birthDate, targetDate]);

  return (
    <div className="calc-panel" id="age-calc-widget">
      <div className="panel-header">
        <div className="panel-title-group">
          <span className="topic-accent-icon">🎂</span>
          <h2 className="section-heading" style={{ fontSize: '1.25rem', margin: 0 }}>Exact Age & Chronological Timeline Solver</h2>
        </div>
      </div>

      <div className="calc-split-layout">
        <div className="calc-inputs-side">
          <div className="form-group">
            <div className="form-label-row">
              <label htmlFor="age-birth-date">Date of Birth</label>
              <span className="unit-hint">YYYY-MM-DD</span>
            </div>
            <input
              type="date"
              id="age-birth-date"
              className="form-input"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>

          <div className="form-group">
            <div className="form-label-row">
              <label htmlFor="age-target-date">Age at the Date of</label>
              <span className="unit-hint">Target Date</span>
            </div>
            <input
              type="date"
              id="age-target-date"
              className="form-input"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
            />
          </div>
        </div>

        <div className="calc-results-side">
          <div className="result-card-primary">
            <div className="result-label">Your Exact Chronological Age</div>
            <div className="result-value-huge" style={{ color: 'var(--accent-primary)', fontSize: '1.8rem' }}>
              {years} <span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>years</span>{' '}
              {months} <span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>months</span>{' '}
              {days} <span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>days</span>
            </div>
          </div>

          <div className="result-stat-grid">
            <div className="stat-box">
              <div className="stat-box-label">Total Days Lived</div>
              <div className="stat-box-val">{totalDays.toLocaleString()} days</div>
            </div>
            <div className="stat-box">
              <div className="stat-box-label">Total Weeks Lived</div>
              <div className="stat-box-val">{totalWeeks.toLocaleString()} weeks</div>
            </div>
            <div className="stat-box">
              <div className="stat-box-label">Total Months</div>
              <div className="stat-box-val">{totalMonths} months</div>
            </div>
            <div className="stat-box">
              <div className="stat-box-label">Total Hours (approx)</div>
              <div className="stat-box-val">{totalHours.toLocaleString()} hrs</div>
            </div>
          </div>

          {daysUntilBirthday > 0 && (
            <div style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--card-border)', borderRadius: '12px', padding: '0.85rem 1rem', marginTop: '0.5rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Next Birthday Countdown</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-purple)', marginTop: '2px' }}>
                {daysUntilBirthday} days remaining (on a {nextBirthdayDayName})
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
