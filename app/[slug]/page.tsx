import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CALCULATORS, getCalculatorBySlug, getAllCalculatorSlugs } from '@/lib/calculators';
import CalculatorWidget from '@/components/CalculatorWidget';

interface PageProps {
  params: {
    slug: string;
  };
}

// 1. Pre-render all calculator pages at build time
export async function generateStaticParams() {
  return getAllCalculatorSlugs().map((slug) => ({
    slug,
  }));
}

// 2. Generate unique SEO metadata for every calculator
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const calc = getCalculatorBySlug(params.slug);
  if (!calc) return {};

  const pageUrl = `https://calc-modern.vercel.app/${calc.slug}`;

  return {
    title: calc.title,
    description: calc.metaDescription,
    keywords: calc.keywords,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: calc.title,
      description: calc.metaDescription,
      url: pageUrl,
      type: 'article',
      siteName: 'CALC• Modern Calculator',
      images: [
        {
          url: '/assets/calc-logo-full.jpg',
          width: 1200,
          height: 630,
          alt: calc.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: calc.title,
      description: calc.metaDescription,
      images: ['/assets/calc-logo-full.jpg'],
    },
  };
}

// 3. Server Component: SEO Text, Schema, FAQs, and Server Breadcrumbs
export default function CalculatorPage({ params }: PageProps) {
  const calc = getCalculatorBySlug(params.slug);
  if (!calc) {
    notFound();
  }

  const pageUrl = `https://calc-modern.vercel.app/${calc.slug}`;
  const categoryUrl = `https://calc-modern.vercel.app/${calc.categorySlug}`;

  // Find related calculators objects
  const relatedCalculators = calc.relatedSlugs
    .map((slug) => getCalculatorBySlug(slug))
    .filter((c): c is NonNullable<typeof c> => !!c);

  // JSON-LD Schemas
  const jsonLdWebapp = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: calc.name,
    url: pageUrl,
    applicationCategory: calc.category === 'finance' ? 'FinanceApplication' : 'UtilityApplication',
    operatingSystem: 'All',
    description: calc.metaDescription,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  const jsonLdBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://calc-modern.vercel.app',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: calc.categoryLabel,
        item: categoryUrl,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: calc.name,
        item: pageUrl,
      },
    ],
  };

  const jsonLdFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: calc.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      {/* 4. Structured Data (JSON-LD) for Search Engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebapp) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />

      <article className="calc-page-container" style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: '1rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          <ol style={{ listStyle: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: 0, margin: 0 }}>
            <li>
              <Link href="/" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>Home</Link>
            </li>
            <li>/</li>
            <li>
              <Link href={`/${calc.categorySlug}`} style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>
                {calc.categoryLabel}
              </Link>
            </li>
            <li>/</li>
            <li aria-current="page" style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>
              {calc.name}
            </li>
          </ol>
        </nav>

        {/* Server Rendered H1 & Intro */}
        <header style={{ marginBottom: '1.5rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
            {calc.h1}
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '850px' }}>
            {calc.shortDescription}
          </p>
        </header>

        {/* Interactive Client Calculator Module */}
        <section aria-label="Interactive Calculator" style={{ marginBottom: '2.5rem' }}>
          <CalculatorWidget slug={calc.slug} />
        </section>

        {/* Server Rendered SEO Content for Google Bots */}
        <section className="seo-guide-section" style={{ margin: '2rem 0' }}>
          <div className="seo-guide-grid">
            {/* Explanation Card */}
            <div className="seo-card">
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
                How the {calc.name} Works
              </h2>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                {calc.explanation}
              </p>
            </div>

            {/* Formula Card */}
            {calc.formula && (
              <div className="seo-card">
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
                  Mathematical Formula
                </h2>
                <div
                  className="formula-box"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.88rem',
                    background: 'var(--bg-tertiary)',
                    padding: '0.85rem 1rem',
                    borderRadius: '10px',
                    border: '1px solid var(--card-border)',
                    color: 'var(--accent-primary)',
                    whiteSpace: 'pre-wrap',
                    lineHeight: 1.5,
                  }}
                >
                  {calc.formula}
                </div>
              </div>
            )}
          </div>

          {/* Visible FAQ Section matching FAQPage JSON-LD */}
          <div style={{ marginTop: '2rem' }}>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Frequently Asked Questions
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {calc.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--card-border)',
                    borderRadius: '12px',
                    padding: '1.15rem 1.35rem',
                  }}
                >
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.45rem' }}>
                    {faq.question}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Related Calculators Internal Linking Block */}
          {relatedCalculators.length > 0 && (
            <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--card-border)' }}>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-primary)' }}>
                Related Calculators
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                {relatedCalculators.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/${rel.slug}`}
                    style={{
                      display: 'block',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--card-border)',
                      borderRadius: '12px',
                      padding: '1rem 1.15rem',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-primary)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                      {rel.categoryLabel}
                    </div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {rel.name} →
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.35rem', lineHeight: 1.4 }}>
                      {rel.shortDescription}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>
      </article>
    </>
  );
}
