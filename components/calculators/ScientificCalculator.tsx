'use client';

import React, { useState } from 'react';

export default function ScientificCalculator() {
  const [display, setDisplay] = useState<string>('0');
  const [expression, setExpression] = useState<string>('');
  const [memory, setMemory] = useState<number>(0);
  const [isRad, setIsRad] = useState<boolean>(false);
  const [isScientific, setIsScientific] = useState<boolean>(true);
  const [hasCalculated, setHasCalculated] = useState<boolean>(false);

  const handleNumber = (digit: string) => {
    if (display === '0' || hasCalculated) {
      setDisplay(digit);
      setHasCalculated(false);
    } else {
      setDisplay(display + digit);
    }
  };

  const handleDecimal = () => {
    if (hasCalculated) {
      setDisplay('0.');
      setHasCalculated(false);
      return;
    }
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperator = (op: string) => {
    setExpression(`${display} ${op} `);
    setDisplay('0');
    setHasCalculated(false);
  };

  const handleClear = () => {
    setDisplay('0');
    setExpression('');
    setHasCalculated(false);
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const handleEquals = () => {
    try {
      const fullExpr = (expression + display)
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/−/g, '-');

      // Safe arithmetic evaluation
      const result = Function(`"use strict"; return (${fullExpr})`)();
      if (isNaN(result) || !isFinite(result)) {
        setDisplay('Error');
      } else {
        setDisplay(String(Number(result.toFixed(8))));
      }
      setExpression('');
      setHasCalculated(true);
    } catch {
      setDisplay('Error');
    }
  };

  // Scientific operations
  const handleScientificOp = (op: string) => {
    const val = parseFloat(display) || 0;
    let res = 0;

    switch (op) {
      case 'sin':
        res = isRad ? Math.sin(val) : Math.sin((val * Math.PI) / 180);
        break;
      case 'cos':
        res = isRad ? Math.cos(val) : Math.cos((val * Math.PI) / 180);
        break;
      case 'tan':
        res = isRad ? Math.tan(val) : Math.tan((val * Math.PI) / 180);
        break;
      case 'sqrt':
        res = val >= 0 ? Math.sqrt(val) : NaN;
        break;
      case 'sqr':
        res = val * val;
        break;
      case 'log':
        res = val > 0 ? Math.log10(val) : NaN;
        break;
      case 'ln':
        res = val > 0 ? Math.log(val) : NaN;
        break;
      case 'inv':
        res = val !== 0 ? 1 / val : NaN;
        break;
      case 'percent':
        res = val / 100;
        break;
      case 'neg':
        res = -val;
        break;
      case 'pi':
        res = Math.PI;
        break;
      case 'e':
        res = Math.E;
        break;
      default:
        return;
    }

    if (isNaN(res) || !isFinite(res)) {
      setDisplay('Error');
    } else {
      setDisplay(String(Number(res.toFixed(8))));
    }
    setHasCalculated(true);
  };

  return (
    <div className="calc-panel" id="standard-calc-widget">
      <div className="calc-machine">
        {/* Screen */}
        <div className="calc-screen">
          <div className="calc-screen-top">
            <span className="calc-mode-indicator">{isRad ? 'RAD' : 'DEG'}</span>
            <span className={`calc-memory-indicator ${memory !== 0 ? 'active' : ''}`}>M</span>
          </div>
          <div className="calc-expression">{expression}</div>
          <div className="calc-current-input">{display}</div>
        </div>

        {/* Controls bar */}
        <div className="calc-controls-bar">
          <div className="mode-toggle-group">
            <button
              type="button"
              className={`mode-btn ${!isRad ? 'active' : ''}`}
              onClick={() => setIsRad(false)}
            >
              DEG
            </button>
            <button
              type="button"
              className={`mode-btn ${isRad ? 'active' : ''}`}
              onClick={() => setIsRad(true)}
            >
              RAD
            </button>
          </div>

          <div className="memory-btn-row">
            <button type="button" className="mem-btn" onClick={() => setMemory(0)}>MC</button>
            <button type="button" className="mem-btn" onClick={() => setDisplay(String(memory))}>MR</button>
            <button type="button" className="mem-btn" onClick={() => setMemory(m => m + (parseFloat(display) || 0))}>M+</button>
            <button type="button" className="mem-btn" onClick={() => setMemory(m => m - (parseFloat(display) || 0))}>M-</button>
          </div>

          <button
            type="button"
            className="mode-btn"
            onClick={() => setIsScientific(!isScientific)}
          >
            {isScientific ? 'Compact' : 'Scientific'}
          </button>
        </div>

        {/* Keypad */}
        <div className={`calc-keypad ${isScientific ? 'scientific-active' : ''}`}>
          {isScientific && (
            <>
              <button type="button" className="key-btn sci" onClick={() => handleScientificOp('sin')}>sin</button>
              <button type="button" className="key-btn sci" onClick={() => handleScientificOp('cos')}>cos</button>
              <button type="button" className="key-btn sci" onClick={() => handleScientificOp('tan')}>tan</button>
              <button type="button" className="key-btn sci" onClick={() => handleScientificOp('pi')}>π</button>
              <button type="button" className="key-btn action" onClick={handleClear}>AC</button>

              <button type="button" className="key-btn sci" onClick={() => handleScientificOp('sqrt')}>√</button>
              <button type="button" className="key-btn sci" onClick={() => handleScientificOp('sqr')}>x²</button>
              <button type="button" className="key-btn sci" onClick={() => handleScientificOp('log')}>log</button>
              <button type="button" className="key-btn sci" onClick={() => handleScientificOp('ln')}>ln</button>
              <button type="button" className="key-btn action" onClick={handleBackspace}>⌫</button>

              <button type="button" className="key-btn sci" onClick={() => handleScientificOp('inv')}>1/x</button>
              <button type="button" className="key-btn" onClick={() => handleNumber('7')}>7</button>
              <button type="button" className="key-btn" onClick={() => handleNumber('8')}>8</button>
              <button type="button" className="key-btn" onClick={() => handleNumber('9')}>9</button>
              <button type="button" className="key-btn operator" onClick={() => handleOperator('÷')}>÷</button>

              <button type="button" className="key-btn sci" onClick={() => handleScientificOp('percent')}>%</button>
              <button type="button" className="key-btn" onClick={() => handleNumber('4')}>4</button>
              <button type="button" className="key-btn" onClick={() => handleNumber('5')}>5</button>
              <button type="button" className="key-btn" onClick={() => handleNumber('6')}>6</button>
              <button type="button" className="key-btn operator" onClick={() => handleOperator('×')}>×</button>

              <button type="button" className="key-btn sci" onClick={() => handleScientificOp('e')}>e</button>
              <button type="button" className="key-btn" onClick={() => handleNumber('1')}>1</button>
              <button type="button" className="key-btn" onClick={() => handleNumber('2')}>2</button>
              <button type="button" className="key-btn" onClick={() => handleNumber('3')}>3</button>
              <button type="button" className="key-btn operator" onClick={() => handleOperator('−')}>−</button>

              <button type="button" className="key-btn sci" onClick={() => handleScientificOp('neg')}>±</button>
              <button type="button" className="key-btn" onClick={() => handleNumber('0')}>0</button>
              <button type="button" className="key-btn" onClick={handleDecimal}>.</button>
              <button type="button" className="key-btn equals" style={{ gridColumn: 'span 2' }} onClick={handleEquals}>=</button>
            </>
          )}

          {!isScientific && (
            <>
              <button type="button" className="key-btn action" onClick={handleClear}>AC</button>
              <button type="button" className="key-btn action" onClick={handleBackspace}>⌫</button>
              <button type="button" className="key-btn sci" onClick={() => handleScientificOp('percent')}>%</button>
              <button type="button" className="key-btn operator" onClick={() => handleOperator('÷')}>÷</button>

              <button type="button" className="key-btn" onClick={() => handleNumber('7')}>7</button>
              <button type="button" className="key-btn" onClick={() => handleNumber('8')}>8</button>
              <button type="button" className="key-btn" onClick={() => handleNumber('9')}>9</button>
              <button type="button" className="key-btn operator" onClick={() => handleOperator('×')}>×</button>

              <button type="button" className="key-btn" onClick={() => handleNumber('4')}>4</button>
              <button type="button" className="key-btn" onClick={() => handleNumber('5')}>5</button>
              <button type="button" className="key-btn" onClick={() => handleNumber('6')}>6</button>
              <button type="button" className="key-btn operator" onClick={() => handleOperator('−')}>−</button>

              <button type="button" className="key-btn" onClick={() => handleNumber('1')}>1</button>
              <button type="button" className="key-btn" onClick={() => handleNumber('2')}>2</button>
              <button type="button" className="key-btn" onClick={() => handleNumber('3')}>3</button>
              <button type="button" className="key-btn operator" onClick={() => handleOperator('+')}>+</button>

              <button type="button" className="key-btn" onClick={() => handleNumber('0')} style={{ gridColumn: 'span 2' }}>0</button>
              <button type="button" className="key-btn" onClick={handleDecimal}>.</button>
              <button type="button" className="key-btn equals" onClick={handleEquals}>=</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
