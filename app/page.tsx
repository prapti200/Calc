'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CALCULATORS, CalculatorDefinition } from '@/lib/calculators';

export default function HomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sidebarFilter, setSidebarFilter] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  // ⌘K Keyboard Shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter calculators by category and search
  const filteredCalculators = useMemo(() => {
    return CALCULATORS.filter((calc) => {
      const matchesCategory = selectedCategory === 'all' || calc.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        calc.name.toLowerCase().includes(q) ||
        calc.shortDescription.toLowerCase().includes(q) ||
        calc.keywords.some((kw) => kw.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Sidebar filtered list
  const sidebarCalculators = useMemo(() => {
    if (!sidebarFilter.trim()) return CALCULATORS;
    const q = sidebarFilter.toLowerCase().trim();
    return CALCULATORS.filter((c) => c.name.toLowerCase().includes(q) || c.category.toLowerCase().includes(q));
  }, [sidebarFilter]);

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && filteredCalculators.length > 0) {
      router.push(`/${filteredCalculators[0].slug}`);
    }
  };

  return (
    <div className="home-container" style={{ maxWidth: '1360px', margin: '0 auto', width: '100%' }}>
      {/* Centered Hero Search Section */}
      <div className="zenith-hero-search-container">
        <div className="zenith-hero-search-wrapper">
          <span className="zenith-search-icon">
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </span>
          <input
            ref={searchInputRef}
            type="text"
            id="global-search-input"
            className="zenith-hero-search-input"
            placeholder="Search across all calculators (e.g. Loan, Mortgage, Auto, BMI, SIP, Percentage, Age)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            autoComplete="off"
          />
          <span className="search-shortcut">⌘K</span>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="zenith-filter-section" style={{ margin: '1rem auto 1.5rem', textAlign: 'center' }}>
        <div className="zenith-pills-row" style={{ display: 'inline-flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: 'All Solvers' },
            { id: 'finance', label: 'Finance' },
            { id: 'health', label: 'Health & Fitness' },
            { id: 'math', label: 'Math Solvers' },
            { id: 'utility', label: 'Daily Utilities' },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`zenith-pill ${selectedCategory === cat.id ? 'active' : ''}`}
              style={{
                background: selectedCategory === cat.id ? 'var(--accent-primary)' : 'var(--bg-secondary)',
                color: selectedCategory === cat.id ? '#ffffff' : 'var(--text-secondary)',
                border: '1px solid var(--card-border)',
                borderRadius: '9999px',
                padding: '0.45rem 1.15rem',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Section Title Row */}
      <div className="zenith-section-row" style={{ marginBottom: '1.25rem' }}>
        <div className="zenith-heading-wrap">
          <span className="zenith-accent-dot"></span>
          <h2 className="zenith-section-title">
            {selectedCategory === 'all' ? 'All Calculators' : `${selectedCategory.toUpperCase()} Calculators`}
          </h2>
        </div>
        <span className="zenith-count-capsule">
          {filteredCalculators.length} Calculators Ready
        </span>
      </div>

      <div className="calc-page-layout">
        {/* Left Column: Quick Directory Sidebar */}
        <aside className="calc-directory-sidebar">
          <div className="sidebar-sticky-inner">
            <div className="sidebar-header">
              <div className="sidebar-title-row">
                <span className="sidebar-title">Directory</span>
                <span className="sidebar-count-badge">{sidebarCalculators.length}</span>
              </div>
              <div className="sidebar-search-wrap">
                <input
                  type="text"
                  className="sidebar-search-input"
                  placeholder="Filter directory..."
                  value={sidebarFilter}
                  onChange={(e) => setSidebarFilter(e.target.value)}
                />
              </div>
            </div>
            <nav className="sidebar-nav-list" aria-label="Calculator directory">
              {sidebarCalculators.map((calc) => (
                <Link
                  key={calc.slug}
                  href={`/${calc.slug}`}
                  className="sidebar-calc-item"
                >
                  <span className="sidebar-calc-dot" />
                  <span className="sidebar-calc-name">{calc.name}</span>
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* Right Column: Calculator Cards */}
        <div className="calc-directory-main">
          {filteredCalculators.length === 0 ? (
            <div className="catalog-no-results" style={{ display: 'block' }}>
              <div className="catalog-no-results-icon">🔍</div>
              <div className="catalog-no-results-title">No calculators found matching &quot;{searchQuery}&quot;</div>
              <p className="catalog-no-results-desc">Try searching for keywords like loan, mortgage, bmi, or sip.</p>
              <button
                type="button"
                className="catalog-no-results-btn"
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              >
                Clear Search
              </button>
            </div>
          ) : (
            <div className="zenith-tools-grid" style={{ margin: 0, padding: 0 }}>
              {filteredCalculators.map((calc) => (
                <Link
                  key={calc.slug}
                  href={`/${calc.slug}`}
                  className="zenith-card"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <div>
                    <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--accent-primary)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                      {calc.categoryLabel}
                    </div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.45rem' }}>
                      {calc.name}
                    </h3>
                    <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                      {calc.shortDescription}
                    </p>
                  </div>
                  <div style={{ marginTop: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 700, color: 'var(--accent-primary)' }}>
                    <span>Calculate Now</span>
                    <span>→</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
