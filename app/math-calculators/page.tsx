import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getCalculatorsByCategory, CATEGORIES } from '@/lib/calculators';

export const metadata: Metadata = {
  title: 'Math Solvers & Scientific Calculators | Percent, Trigonometry',
  description: 'Mathematical tools and solvers for percentages, fractions, trigonometry, logarithms, and scientific notation.',
  alternates: {
    canonical: 'https://calc-modern.vercel.app/math-calculators',
  },
};

export default function MathCalculatorsPage() {
  const calculators = getCalculatorsByCategory('math');
  const cat = CATEGORIES.math;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
      <nav aria-label="Breadcrumb" style={{ marginBottom: '1rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
        <Link href="/" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>Home</Link>
        {' / '}
        <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>{cat.name}</span>
      </nav>

      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          {cat.name}
        </h1>
        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: '750px', lineHeight: 1.6 }}>
          {cat.description}
        </p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
        {calculators.map((calc) => (
          <Link
            key={calc.slug}
            href={`/${calc.slug}`}
            className="zenith-card"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-primary)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                {calc.categoryLabel}
              </div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                {calc.name}
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {calc.shortDescription}
              </p>
            </div>
            <div style={{ marginTop: '1rem', fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-primary)' }}>
              Open Calculator →
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
