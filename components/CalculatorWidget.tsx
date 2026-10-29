'use client';

import React from 'react';
import LoanCalculator from './calculators/LoanCalculator';
import MortgageCalculator from './calculators/MortgageCalculator';
import AutoLoanCalculator from './calculators/AutoLoanCalculator';
import CompoundInterestCalculator from './calculators/CompoundInterestCalculator';
import SIPCalculator from './calculators/SIPCalculator';
import BMICalculator from './calculators/BMICalculator';
import PercentageCalculator from './calculators/PercentageCalculator';
import AgeCalculator from './calculators/AgeCalculator';
import UnitConverter from './calculators/UnitConverter';
import ScientificCalculator from './calculators/ScientificCalculator';

export default function CalculatorWidget({ slug }: { slug: string }) {
  switch (slug) {
    case 'loan-calculator':
      return <LoanCalculator />;
    case 'mortgage-calculator':
      return <MortgageCalculator />;
    case 'auto-loan-calculator':
      return <AutoLoanCalculator />;
    case 'compound-interest-calculator':
      return <CompoundInterestCalculator />;
    case 'sip-calculator':
      return <SIPCalculator />;
    case 'bmi-calculator':
      return <BMICalculator />;
    case 'percentage-calculator':
      return <PercentageCalculator />;
    case 'age-calculator':
      return <AgeCalculator />;
    case 'unit-converter':
      return <UnitConverter />;
    case 'scientific-calculator':
      return <ScientificCalculator />;
    default:
      return (
        <div className="calc-panel" style={{ padding: '2rem', textAlign: 'center' }}>
          <h3>Interactive calculation module coming soon.</h3>
        </div>
      );
  }
}
