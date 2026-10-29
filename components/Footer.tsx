import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-main-grid" style={{ maxWidth: '1360px', margin: '0 auto 2.5rem', width: '100%' }}>
        {/* Brand Column */}
        <div>
          <div className="footer-brand-header">
            <div className="brand-logo-frame" style={{ width: '38px', height: '38px' }}>
              <img src="/assets/calc-logo-icon.png" className="brand-logo-img" alt="CALC•" width={38} height={38} />
            </div>
            <div className="brand-title" style={{ fontSize: '1.3rem' }}>
              <span className="brand-part-ca">CA</span>
              <span className="brand-part-lc">LC</span>
            </div>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: '320px' }}>
            High-precision, client-side calculations for finance, health, scientific math, and everyday physical units.
          </p>
          <div style={{ marginTop: '0.85rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            📍 Nashik, Maharashtra, India
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 800, marginBottom: '0.9rem', color: 'var(--text-primary)' }}>Financial Tools</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
            <li><Link href="/loan-calculator" className="footer-link">Loan & EMI Calculator</Link></li>
            <li><Link href="/mortgage-calculator" className="footer-link">Mortgage Calculator</Link></li>
            <li><Link href="/auto-loan-calculator" className="footer-link">Auto Loan Calculator</Link></li>
            <li><Link href="/compound-interest-calculator" className="footer-link">Compound Interest</Link></li>
            <li><Link href="/sip-calculator" className="footer-link">SIP Wealth Calculator</Link></li>
          </ul>
        </div>

        <div>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 800, marginBottom: '0.9rem', color: 'var(--text-primary)' }}>Health & Math</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
            <li><Link href="/bmi-calculator" className="footer-link">BMI Calculator & Gauge</Link></li>
            <li><Link href="/percentage-calculator" className="footer-link">Percentage Calculator</Link></li>
            <li><Link href="/scientific-calculator" className="footer-link">Scientific Calculator</Link></li>
            <li><Link href="/health-calculators" className="footer-link">All Health Tools</Link></li>
            <li><Link href="/math-calculators" className="footer-link">All Math Solvers</Link></li>
          </ul>
        </div>

        <div>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 800, marginBottom: '0.9rem', color: 'var(--text-primary)' }}>Daily Utilities</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
            <li><Link href="/age-calculator" className="footer-link">Age Calculator</Link></li>
            <li><Link href="/unit-converter" className="footer-link">Universal Unit Converter</Link></li>
            <li><Link href="/utility-calculators" className="footer-link">All Daily Utilities</Link></li>
            <li><Link href="/finance-calculators" className="footer-link">Finance Hub</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom-row" style={{ maxWidth: '1360px', margin: '0 auto', width: '100%', borderTop: '1px solid var(--card-border)', paddingTop: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
        <div>
          © 2026 CALC• Modern Calculator Suite. All rights reserved.
        </div>
        <div style={{ display: 'flex', gap: '1.25rem' }}>
          <Link href="/finance-calculators" className="footer-link">Finance</Link>
          <Link href="/health-calculators" className="footer-link">Health</Link>
          <Link href="/math-calculators" className="footer-link">Math</Link>
          <Link href="/utility-calculators" className="footer-link">Utilities</Link>
        </div>
      </div>
    </footer>
  );
}
