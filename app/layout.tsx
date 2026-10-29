import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '../css/style.css';
import '../css/calculators.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://calc-modern.vercel.app'),
  title: {
    default: 'CALC• Modern Calculator | High-Precision Online Solvers',
    template: '%s | CALC• Modern Calculator',
  },
  description: '100% Client-Side Professional Calculation Suite for Finance, Health & Fitness, Math Solvers, and Daily Utilities.',
  keywords: ['calculator', 'modern calculator', 'online calculator', 'loan calculator', 'mortgage calculator', 'bmi calculator', 'scientific calculator'],
  icons: {
    icon: '/favicon-32x32.png',
    apple: '/favicon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://calc-modern.vercel.app',
    siteName: 'CALC• Modern Calculator',
    images: [
      {
        url: '/assets/calc-logo-full.jpg',
        width: 1200,
        height: 630,
        alt: 'CALC• Modern Calculator Suite',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <Header />
        <main className="main-wrapper">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
