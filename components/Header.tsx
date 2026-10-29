'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('calc_theme') as 'light' | 'dark' | null;
    const initialTheme = savedTheme || 'light';
    setTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);
  }, []);

  const toggleTheme = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    localStorage.setItem('calc_theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <header className="app-header">
      <div className="header-left-group">
        <Link href="/" className="brand-wrapper" title="CALC• Modern Calculator">
          <div className="brand-logo-frame">
            <img src="/assets/calc-logo-icon.png" className="brand-logo-img" alt="CALC• Logo" width={44} height={44} />
          </div>
          <div className="brand-text-group">
            <div className="brand-title">
              <span className="brand-part-ca">CA</span>
              <span className="brand-part-lc">LC</span>
              <span className="brand-neon-dot" aria-hidden="true"></span>
            </div>
            <span className="zenith-brand-subtitle">MODERN CALCULATOR</span>
          </div>
        </Link>

        {/* Upper Ribbon Navigation */}
        <nav className="zenith-header-nav" aria-label="Main Navigation">
          <Link
            href="/"
            className={`zenith-nav-dropdown ${pathname === '/' ? 'active' : ''}`}
          >
            All Calculators
          </Link>
          <Link
            href="/finance-calculators"
            className={`zenith-nav-dropdown ${pathname === '/finance-calculators' ? 'active' : ''}`}
          >
            Finance
          </Link>
          <Link
            href="/health-calculators"
            className={`zenith-nav-dropdown ${pathname === '/health-calculators' ? 'active' : ''}`}
          >
            Health & Fitness
          </Link>
          <Link
            href="/math-calculators"
            className={`zenith-nav-dropdown ${pathname === '/math-calculators' ? 'active' : ''}`}
          >
            Math Solvers
          </Link>
          <Link
            href="/utility-calculators"
            className={`zenith-nav-dropdown ${pathname === '/utility-calculators' ? 'active' : ''}`}
          >
            Daily Utilities
          </Link>
          <Link
            href="/scientific-calculator"
            className={`zenith-nav-dropdown ${pathname === '/scientific-calculator' ? 'active' : ''}`}
          >
            Scientific
          </Link>
        </nav>
      </div>

      {/* Header Actions */}
      <div className="header-actions">
        <div className="settings-anchor-wrap">
          <button
            type="button"
            className={`header-settings-btn ${isSettingsOpen ? 'active' : ''}`}
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            title="Preferences & Settings"
            aria-label="Settings"
          >
            <svg className="settings-gear-icon" viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
            <span className="settings-btn-label">Theme</span>
          </button>

          {/* Settings Popover */}
          <div className={`settings-popover ${isSettingsOpen ? 'open' : ''}`} role="dialog">
            <div className="settings-popover-header">
              <div className="settings-popover-title">
                <span>Display & Preferences</span>
              </div>
              <button
                type="button"
                className="settings-close-icon-btn"
                onClick={() => setIsSettingsOpen(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="settings-popover-body">
              <div className="settings-row">
                <div className="settings-row-text">
                  <div className="settings-row-title">Color Theme</div>
                  <div className="settings-row-desc">Day (Light) vs Night (Dark)</div>
                </div>
                <div className="settings-theme-segmented">
                  <button
                    type="button"
                    className={`settings-seg-btn ${theme === 'light' ? 'active' : ''}`}
                    onClick={() => toggleTheme('light')}
                  >
                    ☀️ Day
                  </button>
                  <button
                    type="button"
                    className={`settings-seg-btn ${theme === 'dark' ? 'active' : ''}`}
                    onClick={() => toggleTheme('dark')}
                  >
                    🌙 Night
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
