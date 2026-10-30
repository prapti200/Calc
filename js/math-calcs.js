/* ==========================================================================
   CALC• MODERN CALCULATOR - MATH CALCULATORS ENGINE
   ========================================================================== */

const MathCalcs = {
  // Helper: GCD of two numbers (Euclidean)
  gcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b) {
      const t = b;
      b = a % b;
      a = t;
    }
    return a;
  },

  // Helper: LCM of two numbers
  lcm(a, b) {
    if (a === 0 || b === 0) return 0;
    return Math.abs((a * b) / this.gcd(a, b));
  },

  // 1. PERCENTAGE CALCULATORS (3 IN 1)
  calcPercentages() {
    // Case 1: What is X% of Y?
    const p1 = parseFloat(document.getElementById('pct1-p')?.value);
    const y1 = parseFloat(document.getElementById('pct1-y')?.value);
    const res1 = document.getElementById('res-pct-1');
    if (res1) {
      if (!isNaN(p1) && !isNaN(y1)) {
        const val = (p1 / 100) * y1;
        res1.textContent = Math.round(val * 1e6) / 1e6;
      } else {
        res1.textContent = '-';
      }
    }

    // Case 2: X is what % of Y?
    const x2 = parseFloat(document.getElementById('pct2-x')?.value);
    const y2 = parseFloat(document.getElementById('pct2-y')?.value);
    const res2 = document.getElementById('res-pct-2');
    if (res2) {
      if (!isNaN(x2) && !isNaN(y2) && y2 !== 0) {
        const val = (x2 / y2) * 100;
        res2.textContent = `${(Math.round(val * 100) / 100)}%`;
      } else {
        res2.textContent = '-';
      }
    }

    // Case 3: % Increase/Decrease from X to Y
    const x3 = parseFloat(document.getElementById('pct3-x')?.value);
    const y3 = parseFloat(document.getElementById('pct3-y')?.value);
    const res3 = document.getElementById('res-pct-3');
    if (res3) {
      if (!isNaN(x3) && !isNaN(y3) && x3 !== 0) {
        const diff = y3 - x3;
        const pctDiff = (diff / Math.abs(x3)) * 100;
        const rounded = Math.round(pctDiff * 100) / 100;
        const sign = rounded > 0 ? '+' : '';
        const direction = rounded > 0 ? 'Increase ↗' : rounded < 0 ? 'Decrease ↘' : 'No Change';
        res3.textContent = `${sign}${rounded}% (${direction})`;
      } else {
        res3.textContent = '-';
      }
    }
  },

  // 2. QUADRATIC EQUATION SOLVER
  calcQuadratic() {
    const a = parseFloat(document.getElementById('quad-a')?.value) || 0;
    const b = parseFloat(document.getElementById('quad-b')?.value) || 0;
    const c = parseFloat(document.getElementById('quad-c')?.value) || 0;

    const preview = document.getElementById('quad-equation-preview');
    const resDisc = document.getElementById('res-quad-disc');
    const resRoots = document.getElementById('res-quad-roots');
    const resVertex = document.getElementById('res-quad-vertex');
    const resAxis = document.getElementById('res-quad-axis');
    const resNature = document.getElementById('res-quad-nature');

    if (a === 0) {
      if (preview) preview.textContent = 'Coefficient "a" cannot be 0 in a quadratic equation';
      return;
    }

    // Format equation string
    let eqStr = `${a}x²`;
    eqStr += b >= 0 ? ` + ${b}x` : ` - ${Math.abs(b)}x`;
    eqStr += c >= 0 ? ` + ${c} = 0` : ` - ${Math.abs(c)} = 0`;
    if (preview) preview.textContent = eqStr;

    // Discriminant Delta = b^2 - 4ac
    const disc = b * b - 4 * a * c;
    if (resDisc) resDisc.textContent = `Δ = ${disc}`;

    // Vertex (h, k)
    const h = -b / (2 * a);
    const k = c - (b * b) / (4 * a);
    if (resVertex) resVertex.textContent = `(${h.toFixed(3)}, ${k.toFixed(3)})`;
    if (resAxis) resAxis.textContent = `x = ${h.toFixed(3)} (${a > 0 ? 'Opens Upward' : 'Opens Downward'})`;

    if (disc > 0) {
      const sqrtDisc = Math.sqrt(disc);
      const x1 = (-b + sqrtDisc) / (2 * a);
      const x2 = (-b - sqrtDisc) / (2 * a);
      if (resRoots) resRoots.textContent = `x₁ = ${x1.toFixed(4)},  x₂ = ${x2.toFixed(4)}`;
      if (resNature) resNature.textContent = 'Two Distinct Real Roots';
    } else if (disc === 0) {
      const x = -b / (2 * a);
      if (resRoots) resRoots.textContent = `x₁ = x₂ = ${x.toFixed(4)}`;
      if (resNature) resNature.textContent = 'One Repeated Real Root';
    } else {
      // Complex roots: u ± vi
      const realPart = (-b / (2 * a)).toFixed(4);
      const imagPart = (Math.sqrt(-disc) / (2 * a)).toFixed(4);
      if (resRoots) resRoots.textContent = `x = ${realPart} ± ${Math.abs(imagPart)}i`;
      if (resNature) resNature.textContent = 'Two Complex Conjugate Roots';
    }
  },

  // 3. FRACTION CALCULATOR
  calcFraction() {
    const n1 = parseInt(document.getElementById('frac-n1')?.value) || 0;
    const d1 = parseInt(document.getElementById('frac-d1')?.value) || 1;
    const n2 = parseInt(document.getElementById('frac-n2')?.value) || 0;
    const d2 = parseInt(document.getElementById('frac-d2')?.value) || 1;
    const op = document.getElementById('frac-op')?.value || '+';

    if (d1 === 0 || d2 === 0) {
      window.showToast?.('Denominator cannot be 0');
      return;
    }

    let numRes = 0;
    let denRes = 1;

    switch (op) {
      case '+':
        numRes = n1 * d2 + n2 * d1;
        denRes = d1 * d2;
        break;
      case '-':
        numRes = n1 * d2 - n2 * d1;
        denRes = d1 * d2;
        break;
      case '×':
        numRes = n1 * n2;
        denRes = d1 * d2;
        break;
      case '÷':
        if (n2 === 0) {
          window.showToast?.('Cannot divide by zero fraction');
          return;
        }
        numRes = n1 * d2;
        denRes = d1 * n2;
        break;
    }

    if (denRes < 0) {
      numRes = -numRes;
      denRes = -denRes;
    }

    const divisor = this.gcd(numRes, denRes);
    const simNum = numRes / divisor;
    const simDen = denRes / divisor;

    const decimalVal = simNum / simDen;

    // Mixed fraction conversion
    let mixedStr = '';
    if (Math.abs(simNum) >= simDen && simDen !== 1) {
      const whole = Math.trunc(simNum / simDen);
      const rem = Math.abs(simNum % simDen);
      if (rem > 0) {
        mixedStr = `Mixed: ${whole} ${rem}/${simDen}`;
      }
    }

    const resFrac = document.getElementById('res-frac-simple');
    const resMixed = document.getElementById('res-frac-mixed');
    const resDec = document.getElementById('res-frac-decimal');

    if (resFrac) {
      if (simDen === 1) {
        resFrac.textContent = `${simNum}`;
      } else {
        resFrac.innerHTML = `
          <span class="math-fraction">
            <span class="numerator">${simNum}</span>
            <span class="denominator">${simDen}</span>
          </span>
        `;
      }
    }

    if (resMixed) resMixed.textContent = mixedStr || 'None (Proper / Integer)';
    if (resDec) resDec.textContent = `≈ ${decimalVal.toFixed(6)}`;
  },

  // 4. GCD & LCM SOLVER
  calcGcdLcm() {
    const rawInput = document.getElementById('gcd-input')?.value || '24, 36, 60';
    const numbers = rawInput
      .split(/[\s,]+/)
      .map(n => parseInt(n.trim()))
      .filter(n => !isNaN(n) && n > 0);

    if (numbers.length < 2) return;

    let overallGcd = numbers[0];
    let overallLcm = numbers[0];

    for (let i = 1; i < numbers.length; i++) {
      overallGcd = this.gcd(overallGcd, numbers[i]);
      overallLcm = this.lcm(overallLcm, numbers[i]);
    }

    // Prime factorizations
    const factorizations = numbers.map(n => `${n} = ${this.primeFactorString(n)}`).join('<br>');

    const resGcd = document.getElementById('res-gcd-val');
    const resLcm = document.getElementById('res-lcm-val');
    const resFactors = document.getElementById('res-gcd-factors');

    if (resGcd) resGcd.textContent = overallGcd;
    if (resLcm) resLcm.textContent = overallLcm.toLocaleString();
    if (resFactors) resFactors.innerHTML = factorizations;
  },

  primeFactorString(n) {
    if (n === 1) return '1';
    const factors = [];
    let d = 2;
    while (d * d <= n) {
      let count = 0;
      while (n % d === 0) {
        count++;
        n /= d;
      }
      if (count > 0) {
        factors.push(count > 1 ? `${d}^${count}` : `${d}`);
      }
      d++;
    }
    if (n > 1) factors.push(`${n}`);
    return factors.join(' × ');
  },

  // 5. STATISTICS CALCULATOR
  calcStats() {
    const rawInput = document.getElementById('stats-input')?.value || '12, 15, 23, 23, 34, 45, 56';
    const numbers = rawInput
      .split(/[\s,]+/)
      .map(n => parseFloat(n.trim()))
      .filter(n => !isNaN(n));

    if (numbers.length === 0) return;

    numbers.sort((a, b) => a - b);
    const n = numbers.length;
    const sum = numbers.reduce((acc, v) => acc + v, 0);
    const mean = sum / n;

    // Median
    const mid = Math.floor(n / 2);
    const median = n % 2 === 0 ? (numbers[mid - 1] + numbers[mid]) / 2 : numbers[mid];

    // Mode
    const freq = {};
    let maxFreq = 0;
    numbers.forEach(v => {
      freq[v] = (freq[v] || 0) + 1;
      if (freq[v] > maxFreq) maxFreq = freq[v];
    });
    let modes = [];
    if (maxFreq > 1) {
      for (const k in freq) {
        if (freq[k] === maxFreq) modes.push(k);
      }
    }
    const modeStr = modes.length > 0 ? modes.join(', ') : 'No Mode';

    // Min, Max, Range
    const min = numbers[0];
    const max = numbers[n - 1];
    const range = max - min;

    // Variance & Standard Deviation
    const sqDiffs = numbers.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0);
    const sampleVar = n > 1 ? sqDiffs / (n - 1) : 0;
    const sampleStdDev = Math.sqrt(sampleVar);
    const popStdDev = Math.sqrt(sqDiffs / n);

    // Update UI
    document.getElementById('res-stats-count').textContent = n;
    document.getElementById('res-stats-sum').textContent = Math.round(sum * 1e4) / 1e4;
    document.getElementById('res-stats-mean').textContent = (Math.round(mean * 1e4) / 1e4).toFixed(4);
    document.getElementById('res-stats-median').textContent = median;
    document.getElementById('res-stats-mode').textContent = modeStr;
    document.getElementById('res-stats-range').textContent = range;
    document.getElementById('res-stats-minmax').textContent = `${min} / ${max}`;
    document.getElementById('res-stats-stddev').textContent = sampleStdDev.toFixed(4);
  },


  // ========================================================================
  // 6. SCIENTIFIC CALCULATOR (Advanced Function Solver & Formula Evaluator)
  // ========================================================================
  sciAngleUnit: 'deg', // 'deg' or 'rad'
  calcSci() {
    const expr = (document.getElementById('sci-expression')?.value || '').trim();
    const resVal = document.getElementById('res-sci-val');
    const resSteps = document.getElementById('res-sci-steps');
    const resAlt = document.getElementById('res-sci-alt');

    if (!expr) {
      if (resVal) resVal.textContent = '0';
      return;
    }

    try {
      // Safe math evaluation with trigonometric unit support
      const isDeg = this.sciAngleUnit === 'deg';
      const toRad = x => isDeg ? (x * Math.PI / 180) : x;
      const fromRad = x => isDeg ? (x * 180 / Math.PI) : x;

      // Scope helpers
      const sin = x => Math.sin(toRad(x));
      const cos = x => Math.cos(toRad(x));
      const tan = x => Math.tan(toRad(x));
      const asin = x => fromRad(Math.asin(x));
      const acos = x => fromRad(Math.acos(x));
      const atan = x => fromRad(Math.atan(x));
      const sinh = Math.sinh;
      const cosh = Math.cosh;
      const tanh = Math.tanh;
      const ln = Math.log;
      const log = Math.log10;
      const log2 = Math.log2;
      const sqrt = Math.sqrt;
      const cbrt = Math.cbrt;
      const abs = Math.abs;
      const pi = Math.PI;
      const e = Math.E;
      const phi = (1 + Math.sqrt(5)) / 2;
      const fact = n => {
        if (n < 0 || n > 170) return NaN;
        let r = 1;
        for (let i = 2; i <= Math.floor(n); i++) r *= i;
        return r;
      };

      // Sanitize expression
      let cleanExpr = expr
        .replace(/π/g, 'pi')
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/(d+)!/g, 'fact($1)')
        .replace(/^/g, '**');

      // Evaluator function using Function constructor safely with scoped Math
      const evaluator = new Function(
        'sin', 'cos', 'tan', 'asin', 'acos', 'atan',
        'sinh', 'cosh', 'tanh', 'ln', 'log', 'log2',
        'sqrt', 'cbrt', 'abs', 'pi', 'e', 'phi', 'fact',
        `return (${cleanExpr});`
      );

      const result = evaluator(
        sin, cos, tan, asin, acos, atan,
        sinh, cosh, tanh, ln, log, log2,
        sqrt, cbrt, abs, pi, e, phi, fact
      );

      if (typeof result === 'number' && !isNaN(result)) {
        const rounded = Math.round(result * 1e10) / 1e10;
        if (resVal) resVal.textContent = rounded.toLocaleString('en-US', { maximumFractionDigits: 10 });
        if (resSteps) resSteps.textContent = `Evaluated: ${expr} = ${rounded}`;
        if (resAlt) {
          resAlt.textContent = `Scientific: ${result.toExponential(6)} | Mode: ${this.sciAngleUnit.toUpperCase()}`;
        }
      } else {
        if (resVal) resVal.textContent = 'Invalid Result';
      }
    } catch (err) {
      if (resVal) resVal.textContent = 'Syntax Error';
      if (resSteps) resSteps.textContent = 'Check mathematical syntax (e.g. sin(45), 2^8, sqrt(144))';
    }
  },

  appendSciExpr(str) {
    const input = document.getElementById('sci-expression');
    if (!input) return;
    input.value = (input.value || '') + str;
    input.focus();
    this.calcSci();
  },

  clearSciExpr() {
    const input = document.getElementById('sci-expression');
    if (input) input.value = '';
    this.calcSci();
  },

  // ========================================================================
  // 7. RANDOM NUMBER GENERATOR (RNG & Dice Roller)
  // ========================================================================
  calcRandom() {
    const min = parseFloat(document.getElementById('rnd-min')?.value) || 1;
    const max = parseFloat(document.getElementById('rnd-max')?.value) || 100;
    const count = Math.min(100, Math.max(1, parseInt(document.getElementById('rnd-count')?.value, 10) || 1));
    const allowDuplicates = document.getElementById('rnd-duplicates')?.value !== 'no';
    const isDecimal = document.getElementById('rnd-type')?.value === 'decimal';
    const decPlaces = parseInt(document.getElementById('rnd-decimals')?.value, 10) || 2;
    const sortMode = document.getElementById('rnd-sort')?.value || 'none';

    if (min >= max) {
      window.showToast?.('Minimum must be less than Maximum');
      return;
    }

    const availableRange = max - min + 1;
    if (!allowDuplicates && !isDecimal && count > availableRange) {
      window.showToast?.('Cannot generate unique integers: count exceeds available range');
      return;
    }

    const results = [];
    const used = new Set();

    let attempts = 0;
    while (results.length < count && attempts < 10000) {
      attempts++;
      let val = 0;
      if (isDecimal) {
        val = min + Math.random() * (max - min);
        val = parseFloat(val.toFixed(decPlaces));
      } else {
        val = Math.floor(min + Math.random() * (max - min + 1));
      }

      if (allowDuplicates || !used.has(val)) {
        results.push(val);
        used.add(val);
      }
    }

    if (sortMode === 'asc') results.sort((a, b) => a - b);
    else if (sortMode === 'desc') results.sort((a, b) => b - a);

    const sum = results.reduce((a, b) => a + b, 0);
    const avg = sum / results.length;
    const minVal = Math.min(...results);
    const maxVal = Math.max(...results);

    const setTxt = (id, txt) => { const el = document.getElementById(id); if (el) el.textContent = txt; };

    setTxt('res-rnd-main', results.length === 1 ? results[0] : results.slice(0, 5).join(', ') + (results.length > 5 ? ` ... (+${results.length - 5} more)` : ''));
    setTxt('res-rnd-all', results.join(', '));
    setTxt('res-rnd-count', `${results.length} numbers generated`);
    setTxt('res-rnd-sum', sum.toFixed(isDecimal ? decPlaces : 0));
    setTxt('res-rnd-avg', avg.toFixed(3));
    setTxt('res-rnd-minmax', `Min: ${minVal} | Max: ${maxVal}`);
  },

  rollDice(count, sides) {
    const minInput = document.getElementById('rnd-min');
    const maxInput = document.getElementById('rnd-max');
    const countInput = document.getElementById('rnd-count');
    const typeInput = document.getElementById('rnd-type');
    const dupInput = document.getElementById('rnd-duplicates');
    if (minInput) minInput.value = 1;
    if (maxInput) maxInput.value = sides;
    if (countInput) countInput.value = count;
    if (typeInput) typeInput.value = 'integer';
    if (dupInput) dupInput.value = 'yes';
    this.calcRandom();
  },

  // ========================================================================
  // 8. PERCENT ERROR CALCULATOR (Experimental vs. Theoretical Accuracy)
  // ========================================================================
  calcPercentError() {
    const exp = parseFloat(document.getElementById('pe-experimental')?.value);
    const theo = parseFloat(document.getElementById('pe-theoretical')?.value);

    const setTxt = (id, txt) => { const el = document.getElementById(id); if (el) el.textContent = txt; };

    if (isNaN(exp) || isNaN(theo)) {
      setTxt('res-pe-val', '—');
      return;
    }
    if (theo === 0) {
      setTxt('res-pe-val', 'Undefined (Theo = 0)');
      setTxt('res-pe-formula', 'Theoretical value cannot be zero because division by zero is undefined.');
      return;
    }

    const absError = Math.abs(exp - theo);
    const relError = absError / Math.abs(theo);
    const pctError = relError * 100;
    const isOver = exp > theo;

    setTxt('res-pe-val', `${pctError.toFixed(3)}%`);
    setTxt('res-pe-abs', absError.toFixed(4));
    setTxt('res-pe-rel', relError.toFixed(6));
    setTxt('res-pe-dir', isOver ? `+${(exp - theo).toFixed(4)} (Overestimation)` : `-${(theo - exp).toFixed(4)} (Underestimation)`);
    setTxt('res-pe-formula', `| ${exp} - ${theo} | / | ${theo} | × 100% = ${absError.toFixed(4)} / ${Math.abs(theo)} × 100% = ${pctError.toFixed(3)}%`);
  },

  // ========================================================================
  // 9. EXPONENT CALCULATOR (Powers, Negative & Fractional Exponents)
  // ========================================================================
  calcExponent() {
    const base = parseFloat(document.getElementById('exp-base')?.value) || 2;
    const power = parseFloat(document.getElementById('exp-power')?.value) || 3;

    const setTxt = (id, txt) => { const el = document.getElementById(id); if (el) el.textContent = txt; };

    const result = Math.pow(base, power);

    setTxt('res-exp-val', !isNaN(result) ? (Number.isInteger(result) ? result.toLocaleString() : result.toFixed(6)) : 'Invalid (NaN)');
    setTxt('res-exp-notation', `${base}^${power}`);

    // Step expansion if small integer
    let expansion = '';
    if (Number.isInteger(power) && power >= 1 && power <= 12) {
      expansion = Array(power).fill(base).join(' × ') + ` = ${result}`;
    } else if (power === 0) {
      expansion = 'Any non-zero base raised to the power of 0 equals 1.';
    } else if (power < 0) {
      expansion = `${base}^${power} = 1 / (${base}^${Math.abs(power)}) = 1 / ${Math.pow(base, Math.abs(power))} = ${result.toFixed(6)}`;
    } else {
      expansion = `${base}^${power} = ${result.toFixed(6)}`;
    }
    setTxt('res-exp-expansion', expansion);
    setTxt('res-exp-sci', !isNaN(result) ? result.toExponential(4) : '—');
    setTxt('res-exp-neg-base', `(-${base})^${power} = ${Math.pow(-base, power)}`);
  },

  // ========================================================================
  // 10. BINARY CALCULATOR (Base 2 Arithmetic & Bitwise Logic)
  // ========================================================================
  calcBinary() {
    let b1 = (document.getElementById('bin-val1')?.value || '1101').trim();
    let b2 = (document.getElementById('bin-val2')?.value || '1011').trim();
    const op = document.getElementById('bin-op')?.value || '+';

    const setTxt = (id, txt) => { const el = document.getElementById(id); if (el) el.textContent = txt; };

    // Validate binary
    if (!/^[01]+$/.test(b1) || (!/^[01]+$/.test(b2) && op !== 'NOT')) {
      setTxt('res-bin-val', 'Invalid Binary (0 or 1 only)');
      return;
    }

    const n1 = parseInt(b1, 2);
    const n2 = parseInt(b2, 2);
    let res = 0;

    switch (op) {
      case '+': res = n1 + n2; break;
      case '-': res = n1 - n2; break;
      case '*': res = n1 * n2; break;
      case '/': res = n2 !== 0 ? Math.floor(n1 / n2) : NaN; break;
      case 'AND': res = n1 & n2; break;
      case 'OR': res = n1 | n2; break;
      case 'XOR': res = n1 ^ n2; break;
      case 'NOT': res = ~n1 & 0xFFFFFFFF; break;
      case 'LSHIFT': res = n1 << n2; break;
      case 'RSHIFT': res = n1 >> n2; break;
    }

    if (isNaN(res)) {
      setTxt('res-bin-val', 'Division by 0');
      return;
    }

    const binStr = (res >>> 0).toString(2);
    setTxt('res-bin-val', binStr);
    setTxt('res-bin-dec', `Decimal: ${res.toLocaleString()}`);
    setTxt('res-bin-hex', `Hex: 0x${(res >>> 0).toString(16).toUpperCase()}`);
    setTxt('res-bin-oct', `Octal: 0o${(res >>> 0).toString(8)}`);
  },

  // ========================================================================
  // 11. HEX CALCULATOR (Base 16 Arithmetic & Converter)
  // ========================================================================
  calcHex() {
    let h1 = (document.getElementById('hex-val1')?.value || '1A3F').trim();
    let h2 = (document.getElementById('hex-val2')?.value || 'B4').trim();
    const op = document.getElementById('hex-op')?.value || '+';

    const setTxt = (id, txt) => { const el = document.getElementById(id); if (el) el.textContent = txt; };

    if (!/^[0-9a-fA-F]+$/.test(h1) || !/^[0-9a-fA-F]+$/.test(h2)) {
      setTxt('res-hex-val', 'Invalid Hex (0–9, A–F)');
      return;
    }

    const n1 = parseInt(h1, 16);
    const n2 = parseInt(h2, 16);
    let res = 0;

    switch (op) {
      case '+': res = n1 + n2; break;
      case '-': res = n1 - n2; break;
      case '*': res = n1 * n2; break;
      case '/': res = n2 !== 0 ? Math.floor(n1 / n2) : NaN; break;
      case '%': res = n2 !== 0 ? n1 % n2 : NaN; break;
      case 'AND': res = n1 & n2; break;
      case 'OR': res = n1 | n2; break;
      case 'XOR': res = n1 ^ n2; break;
    }

    if (isNaN(res)) {
      setTxt('res-hex-val', 'Division by 0');
      return;
    }

    const hexStr = (res >>> 0).toString(16).toUpperCase();
    setTxt('res-hex-val', `0x${hexStr}`);
    setTxt('res-hex-dec', `Decimal: ${res.toLocaleString()}`);
    setTxt('res-hex-bin', `Binary: ${(res >>> 0).toString(2)}b`);
    setTxt('res-hex-oct', `Octal: 0o${(res >>> 0).toString(8)}`);
  },

  // ========================================================================
  // 12. HALF-LIFE CALCULATOR (Radioactive & Pharmacokinetic Decay)
  // ========================================================================
  calcHalfLife() {
    const N0 = parseFloat(document.getElementById('hl-initial')?.value) || 100;
    const tHalf = parseFloat(document.getElementById('hl-halflife')?.value) || 5730;
    const t = parseFloat(document.getElementById('hl-time')?.value) || 11460;

    const setTxt = (id, txt) => { const el = document.getElementById(id); if (el) el.textContent = txt; };

    if (tHalf <= 0 || t < 0) {
      setTxt('res-hl-remaining', 'Invalid Half-Life (must be > 0)');
      return;
    }

    const elapsedHalfLives = t / tHalf;
    const remaining = N0 * Math.pow(0.5, elapsedHalfLives);
    const pctRemaining = (remaining / N0) * 100;
    const decayed = N0 - remaining;
    const decayConstant = Math.LN2 / tHalf;

    setTxt('res-hl-remaining', remaining.toFixed(4));
    setTxt('res-hl-pct', `${pctRemaining.toFixed(2)}% remaining`);
    setTxt('res-hl-decayed', `Decayed: ${decayed.toFixed(4)} (${(100 - pctRemaining).toFixed(2)}%)`);
    setTxt('res-hl-cycles', `Elapsed Half-Lives: ${elapsedHalfLives.toFixed(2)}`);
    setTxt('res-hl-lambda', `Decay Constant (λ): ${decayConstant.toExponential(4)} time⁻¹`);
  },

  setHalfLifePreset(n0, tHalf, t) {
    const iN0 = document.getElementById('hl-initial');
    const iTh = document.getElementById('hl-halflife');
    const iT = document.getElementById('hl-time');
    if (iN0) iN0.value = n0;
    if (iTh) iTh.value = tHalf;
    if (iT) iT.value = t;
    this.calcHalfLife();
  },

  // ========================================================================
  // 13. LOG CALCULATOR (Natural ln, Common log10, Binary log2, Arbitrary Base)
  // ========================================================================
  calcLog() {
    const x = parseFloat(document.getElementById('log-x')?.value) || 100;
    const baseType = document.getElementById('log-base-type')?.value || '10';
    let base = 10;

    if (baseType === 'e') base = Math.E;
    else if (baseType === '2') base = 2;
    else if (baseType === 'custom') {
      base = parseFloat(document.getElementById('log-custom-base')?.value) || 10;
    } else {
      base = 10;
    }

    const setTxt = (id, txt) => { const el = document.getElementById(id); if (el) el.textContent = txt; };

    if (x <= 0) {
      setTxt('res-log-val', 'Undefined (x must be > 0)');
      return;
    }
    if (base <= 0 || base === 1) {
      setTxt('res-log-val', 'Undefined (base must be > 0 and ≠ 1)');
      return;
    }

    const res = Math.log(x) / Math.log(base);
    const antilog = Math.pow(base, res);

    setTxt('res-log-val', res.toFixed(6));
    setTxt('res-log-ln', `ln(${x}) = ${Math.log(x).toFixed(6)}`);
    setTxt('res-log-10', `log₁₀(${x}) = ${Math.log10(x).toFixed(6)}`);
    setTxt('res-log-2', `log₂(${x}) = ${Math.log2(x).toFixed(6)}`);
    setTxt('res-log-verify', `Verification: ${base.toFixed(2)}^${res.toFixed(4)} = ${antilog.toFixed(4)}`);
  },

  // ========================================================================
  // 14. RATIO CALCULATOR (Proportions, Simplification & Scaling)
  // ========================================================================
  calcRatio() {
    const a = parseFloat(document.getElementById('ratio-a')?.value) || 16;
    const b = parseFloat(document.getElementById('ratio-b')?.value) || 9;
    const c = parseFloat(document.getElementById('ratio-c')?.value) || 1920;

    const setTxt = (id, txt) => { const el = document.getElementById(id); if (el) el.textContent = txt; };

    // Solve A : B = C : D -> D = (B * C) / A
    let d = 0;
    if (a !== 0) {
      d = (b * c) / a;
    }

    // Simplification
    const gcdVal = this.gcd(Math.round(a), Math.round(b));
    const simA = Math.round(a) / gcdVal;
    const simB = Math.round(b) / gcdVal;

    setTxt('res-ratio-d', d.toFixed(2));
    setTxt('res-ratio-proportion', `${a} : ${b} = ${c} : ${d.toFixed(2)}`);
    setTxt('res-ratio-simple', `${simA} : ${simB}`);
    setTxt('res-ratio-unit', `1 : ${(b / a).toFixed(4)}`);
    setTxt('res-ratio-decimal', (a / b).toFixed(4));
  },

  setRatioPreset(a, b, c) {
    const iA = document.getElementById('ratio-a');
    const iB = document.getElementById('ratio-b');
    const iC = document.getElementById('ratio-c');
    if (iA) iA.value = a;
    if (iB) iB.value = b;
    if (iC) iC.value = c;
    this.calcRatio();
  },

  // ========================================================================
  // 15. ROOT CALCULATOR (Square, Cube, N-th Roots & Radical Simplification)
  // ========================================================================
  calcRoot() {
    const x = parseFloat(document.getElementById('root-x')?.value) || 72;
    const n = parseInt(document.getElementById('root-n')?.value, 10) || 2;

    const setTxt = (id, txt) => { const el = document.getElementById(id); if (el) el.textContent = txt; };

    if (n <= 0) {
      setTxt('res-root-val', 'Root degree must be ≥ 1');
      return;
    }
    if (x < 0 && n % 2 === 0) {
      setTxt('res-root-val', 'Complex Root (even root of negative number)');
      return;
    }

    const val = x < 0 ? -Math.pow(-x, 1 / n) : Math.pow(x, 1 / n);

    // Simplified radical if n == 2 and integer x
    let simStr = '—';
    if (n === 2 && Number.isInteger(x) && x > 0) {
      let outside = 1;
      let inside = x;
      let d = 2;
      while (d * d <= inside) {
        if (inside % (d * d) === 0) {
          outside *= d;
          inside /= (d * d);
        } else {
          d++;
        }
      }
      if (inside === 1) simStr = `${outside} (Perfect Square)`;
      else if (outside === 1) simStr = `√${inside} (Irreducible)`;
      else simStr = `${outside}√${inside}`;
    }

    setTxt('res-root-val', val.toFixed(6));
    setTxt('res-root-simple', simStr);
    setTxt('res-root-square', Math.sqrt(Math.max(0, x)).toFixed(4));
    setTxt('res-root-cube', Math.cbrt(x).toFixed(4));
  },

  // ========================================================================
  // 16. LEAST COMMON MULTIPLE (LCM) CALCULATOR
  // ========================================================================
  calcLCM() {
    const raw = document.getElementById('lcm-input')?.value || '12, 18, 30';
    const setTxt = (id, txt) => { const el = document.getElementById(id); if (el) el.textContent = txt; };

    const nums = raw.split(/[s,]+/).map(n => parseInt(n.trim(), 10)).filter(n => !isNaN(n) && n > 0);
    if (nums.length < 2) {
      setTxt('res-lcm-main', 'Enter at least 2 positive integers');
      return;
    }

    let overallLcm = nums[0];
    for (let i = 1; i < nums.length; i++) {
      overallLcm = this.lcm(overallLcm, nums[i]);
    }

    // Common multiples
    const multiples = [1, 2, 3, 4, 5].map(m => (overallLcm * m).toLocaleString()).join(', ');

    setTxt('res-lcm-main', overallLcm.toLocaleString());
    setTxt('res-lcm-multiples', multiples);
    setTxt('res-lcm-factors', nums.map(n => `${n} = ${this.primeFactorString(n)}`).join(' | '));
  },

  // ========================================================================
  // 17. GREATEST COMMON FACTOR (GCF / HCF / GCD) CALCULATOR
  // ========================================================================
  calcGCF() {
    const raw = document.getElementById('gcf-input')?.value || '48, 72, 120';
    const setTxt = (id, txt) => { const el = document.getElementById(id); if (el) el.textContent = txt; };

    const nums = raw.split(/[s,]+/).map(n => parseInt(n.trim(), 10)).filter(n => !isNaN(n) && n > 0);
    if (nums.length < 2) {
      setTxt('res-gcf-main', 'Enter at least 2 positive integers');
      return;
    }

    let overallGcf = nums[0];
    for (let i = 1; i < nums.length; i++) {
      overallGcf = this.gcd(overallGcf, nums[i]);
    }

    // Common divisors of overallGcf
    const commonDivs = [];
    for (let i = 1; i <= overallGcf; i++) {
      if (overallGcf % i === 0) commonDivs.push(i);
    }

    setTxt('res-gcf-main', overallGcf);
    setTxt('res-gcf-divisors', commonDivs.join(', '));
    setTxt('res-gcf-factors', nums.map(n => `${n} = ${this.primeFactorString(n)}`).join(' | '));
  },

  // ========================================================================
  // 18. FACTOR CALCULATOR (Divisors, Prime Factors & Number Properties)
  // ========================================================================
  calcFactor() {
    const n = Math.abs(parseInt(document.getElementById('factor-n')?.value, 10) || 72);
    const setTxt = (id, txt) => { const el = document.getElementById(id); if (el) el.textContent = txt; };

    if (n === 0) {
      setTxt('res-factor-main', '0 has infinite divisors');
      return;
    }

    const factors = [];
    for (let i = 1; i * i <= n; i++) {
      if (n % i === 0) {
        factors.push(i);
        if (i * i !== n) factors.push(n / i);
      }
    }
    factors.sort((a, b) => a - b);

    const isPrime = factors.length === 2;
    const factorPairs = [];
    for (let i = 0; i < Math.ceil(factors.length / 2); i++) {
      const companion = n / factors[i];
      factorPairs.push(`(${factors[i]} × ${companion})`);
    }

    const sumFactors = factors.reduce((a, b) => a + b, 0);
    const properSum = sumFactors - n;
    let classification = 'Deficient (sum < n)';
    if (properSum === n) classification = 'Perfect Number (sum = n)';
    else if (properSum > n) classification = 'Abundant Number (sum > n)';

    setTxt('res-factor-main', factors.join(', '));
    setTxt('res-factor-count', `${factors.length} total divisors`);
    setTxt('res-factor-pairs', factorPairs.join(', '));
    setTxt('res-factor-prime', this.primeFactorString(n));
    setTxt('res-factor-type', isPrime ? 'Prime Number (Only divisible by 1 and itself)' : `Composite Number (${classification})`);
    setTxt('res-factor-sum', `Sum of divisors: ${sumFactors.toLocaleString()}`);
  },

  // ========================================================================
  // 19. ROUNDING CALCULATOR (Place Values & Banker's Even Rounding)
  // ========================================================================
  calcRounding() {
    const num = parseFloat(document.getElementById('round-num')?.value) || 1234.5678;
    const decimals = parseInt(document.getElementById('round-decimals')?.value, 10) || 2;
    const setTxt = (id, txt) => { const el = document.getElementById(id); if (el) el.textContent = txt; };

    const roundWithMode = (x, dec, mode) => {
      const factor = Math.pow(10, dec);
      switch (mode) {
        case 'half_up': return (Math.round(x * factor) / factor).toFixed(Math.max(0, dec));
        case 'floor': return (Math.floor(x * factor) / factor).toFixed(Math.max(0, dec));
        case 'ceil': return (Math.ceil(x * factor) / factor).toFixed(Math.max(0, dec));
        case 'trunc': return (Math.trunc(x * factor) / factor).toFixed(Math.max(0, dec));
        case 'bankers': {
          const scaled = x * factor;
          const floor = Math.floor(scaled);
          const diff = scaled - floor;
          if (Math.abs(diff - 0.5) < 1e-9) {
            return ((floor % 2 === 0 ? floor : floor + 1) / factor).toFixed(Math.max(0, dec));
          }
          return (Math.round(scaled) / factor).toFixed(Math.max(0, dec));
        }
      }
    };

    setTxt('res-round-halfup', roundWithMode(num, decimals, 'half_up'));
    setTxt('res-round-bankers', roundWithMode(num, decimals, 'bankers'));
    setTxt('res-round-floor', roundWithMode(num, decimals, 'floor'));
    setTxt('res-round-ceil', roundWithMode(num, decimals, 'ceil'));
    setTxt('res-round-trunc', roundWithMode(num, decimals, 'trunc'));
  },

  // ========================================================================
  // 20. SCIENTIFIC NOTATION CALCULATOR
  // ========================================================================
  calcSciNotation() {
    const raw = (document.getElementById('scin-val')?.value || '1234500').trim();
    const setTxt = (id, txt) => { const el = document.getElementById(id); if (el) el.textContent = txt; };

    const num = parseFloat(raw);
    if (isNaN(num)) {
      setTxt('res-scin-main', 'Invalid Number');
      return;
    }

    const expStr = num.toExponential();
    const parts = expStr.split('e');
    const coeff = parseFloat(parts[0]).toFixed(4);
    const exp = parseInt(parts[1], 10);

    // Engineering notation (exponent multiple of 3)
    let engExp = Math.floor(exp / 3) * 3;
    let engCoeff = num / Math.pow(10, engExp);

    setTxt('res-scin-main', `${coeff} × 10^${exp}`);
    setTxt('res-scin-e', `${coeff}e${exp >= 0 ? '+' : ''}${exp}`);
    setTxt('res-scin-eng', `${engCoeff.toFixed(4)} × 10^${engExp}`);
    setTxt('res-scin-standard', num.toLocaleString('en-US', { maximumFractionDigits: 10 }));
  },

  // ========================================================================
  // 21. BIG NUMBER CALCULATOR (Arbitrary Precision BigInt Engine)
  // ========================================================================
  calcBigNumber() {
    const s1 = (document.getElementById('bignum-1')?.value || '123456789012345678901234567890').trim();
    const s2 = (document.getElementById('bignum-2')?.value || '987654321098765432109876543210').trim();
    const op = document.getElementById('bignum-op')?.value || '+';

    const setTxt = (id, txt) => { const el = document.getElementById(id); if (el) el.textContent = txt; };

    try {
      const b1 = BigInt(s1);
      const b2 = BigInt(s2);
      let res = 0n;
      let extra = '';

      switch (op) {
        case '+': res = b1 + b2; break;
        case '-': res = b1 - b2; break;
        case '*': res = b1 * b2; break;
        case '/':
          if (b2 === 0n) throw new Error('Division by zero');
          res = b1 / b2;
          extra = `Remainder: ${(b1 % b2).toString()}`;
          break;
        case '%':
          if (b2 === 0n) throw new Error('Modulo by zero');
          res = b1 % b2;
          break;
        case '**':
          if (b2 < 0n || b2 > 1000n) throw new Error('Exponent must be between 0 and 1000');
          res = b1 ** b2;
          break;
      }

      const resStr = res.toString();
      setTxt('res-bignum-val', resStr.length > 50 ? resStr.slice(0, 50) + ` ... (${resStr.length} digits total)` : resStr);
      setTxt('res-bignum-digits', `Digit Count: ${resStr.length} digits`);
      setTxt('res-bignum-full', resStr);
      setTxt('res-bignum-extra', extra || 'Arbitrary Precision Guaranteed (No Float Overflow)');
    } catch (err) {
      setTxt('res-bignum-val', `Error: ${err.message}`);
    }
  },

    // Setup listeners

  calcTriangle() {
    const mode = document.getElementById('tri-mode')?.value || 'sss';
    const sssWrap = document.getElementById('tri-sss-inputs');
    const bhWrap = document.getElementById('tri-bh-inputs');
    if (sssWrap) sssWrap.style.display = mode === 'sss' ? 'grid' : 'none';
    if (bhWrap) bhWrap.style.display = mode === 'bh' ? 'grid' : 'none';

    if (mode === 'bh') {
      const b = parseFloat(document.getElementById('tri-base')?.value) || 0;
      const h = parseFloat(document.getElementById('tri-height')?.value) || 0;
      if (b <= 0 || h <= 0) return;
      const area = 0.5 * b * h;
      const elArea = document.getElementById('res-tri-area');
      if (elArea) elArea.textContent = area.toLocaleString(undefined, { maximumFractionDigits: 4 });
      const elType = document.getElementById('res-tri-type');
      if (elType) elType.textContent = 'Base & Height Mode';
      const elAngles = document.getElementById('res-tri-angles');
      if (elAngles) elAngles.textContent = 'N/A (Provide 3 sides for angle calculations)';
      const elPerim = document.getElementById('res-tri-perim');
      if (elPerim) elPerim.textContent = 'N/A';
      const elInR = document.getElementById('res-tri-inradius');
      if (elInR) elInR.textContent = 'N/A';
      const elCircR = document.getElementById('res-tri-circumradius');
      if (elCircR) elCircR.textContent = 'N/A';
      const elAlt = document.getElementById('res-tri-altitudes');
      if (elAlt) elAlt.textContent = `h_b = ${h}`;
      const banner = document.getElementById('tri-formula-banner');
      if (banner) banner.textContent = `Area = 0.5 × Base × Height = 0.5 × ${b} × ${h} = ${area}`;
      return;
    }

    const a = parseFloat(document.getElementById('tri-side-a')?.value) || 0;
    const b = parseFloat(document.getElementById('tri-side-b')?.value) || 0;
    const c = parseFloat(document.getElementById('tri-side-c')?.value) || 0;

    const banner = document.getElementById('tri-formula-banner');
    if (a <= 0 || b <= 0 || c <= 0) {
      if (banner) banner.textContent = '⚠️ All three side lengths must be positive numbers.';
      return;
    }

    if (a + b <= c || a + c <= b || b + c <= a) {
      if (banner) banner.textContent = `⚠️ Invalid Triangle: The sum of any two sides must be strictly greater than the third side (${a} + ${b} ≤ ${c} or similar).`;
      return;
    }

    const s = (a + b + c) / 2;
    const area = Math.sqrt(Math.max(0, s * (s - a) * (s - b) * (s - c)));
    const perimeter = a + b + c;

    // Law of cosines
    const radA = Math.acos(Math.max(-1, Math.min(1, (b*b + c*c - a*a) / (2*b*c))));
    const radB = Math.acos(Math.max(-1, Math.min(1, (a*a + c*c - b*b) / (2*a*c))));
    const degA = radA * (180 / Math.PI);
    const degB = radB * (180 / Math.PI);
    const degC = 180 - degA - degB;

    const inradius = area / s;
    const circumradius = (a * b * c) / (4 * area);

    const ha = (2 * area) / a;
    const hb = (2 * area) / b;
    const hc = (2 * area) / c;

    // Type classification
    let sideType = 'Scalene';
    if (Math.abs(a - b) < 1e-5 && Math.abs(b - c) < 1e-5) sideType = 'Equilateral';
    else if (Math.abs(a - b) < 1e-5 || Math.abs(b - c) < 1e-5 || Math.abs(a - c) < 1e-5) sideType = 'Isosceles';

    let angleType = 'Acute';
    const maxDeg = Math.max(degA, degB, degC);
    if (Math.abs(maxDeg - 90) < 0.01) angleType = 'Right';
    else if (maxDeg > 90) angleType = 'Obtuse';

    const elArea = document.getElementById('res-tri-area');
    if (elArea) elArea.textContent = area.toLocaleString(undefined, { maximumFractionDigits: 4 });
    const elPerim = document.getElementById('res-tri-perim');
    if (elPerim) elPerim.textContent = `${perimeter.toFixed(2)} (Semi-perimeter s = ${s.toFixed(2)})`;
    const elType = document.getElementById('res-tri-type');
    if (elType) elType.textContent = `${sideType} & ${angleType} Triangle`;
    const elAngles = document.getElementById('res-tri-angles');
    if (elAngles) elAngles.textContent = `∠A = ${degA.toFixed(2)}°, ∠B = ${degB.toFixed(2)}°, ∠C = ${degC.toFixed(2)}°`;
    const elInR = document.getElementById('res-tri-inradius');
    if (elInR) elInR.textContent = inradius.toFixed(4);
    const elCircR = document.getElementById('res-tri-circumradius');
    if (elCircR) elCircR.textContent = circumradius.toFixed(4);
    const elAlt = document.getElementById('res-tri-altitudes');
    if (elAlt) elAlt.textContent = `h_a = ${ha.toFixed(2)}, h_b = ${hb.toFixed(2)}, h_c = ${hc.toFixed(2)}`;

    if (banner) {
      banner.innerHTML = `<strong>Heron's Formula:</strong> s = (${a}+${b}+${c})/2 = ${s.toFixed(2)}<br>` +
        `Area = √[${s.toFixed(2)} × (${s.toFixed(2)}-${a}) × (${s.toFixed(2)}-${b}) × (${s.toFixed(2)}-${c})] = <strong>${area.toFixed(4)}</strong>`;
    }
  },

  updateVolumeFields() {
    const shape = document.getElementById('vol-shape')?.value || 'sphere';
    const l1 = document.getElementById('vol-label-1');
    const l2 = document.getElementById('vol-label-2');
    const l3 = document.getElementById('vol-label-3');
    const w2 = document.getElementById('vol-wrap-2');
    const w3 = document.getElementById('vol-wrap-3');

    if (shape === 'sphere') {
      if (l1) l1.textContent = 'Radius (r):';
      if (w2) w2.style.display = 'none';
      if (w3) w3.style.display = 'none';
    } else if (shape === 'cylinder' || shape === 'cone') {
      if (l1) l1.textContent = 'Radius (r):';
      if (l2) l2.textContent = 'Height (h):';
      if (w2) w2.style.display = 'block';
      if (w3) w3.style.display = 'none';
    } else if (shape === 'cube') {
      if (l1) l1.textContent = 'Side Length (s):';
      if (w2) w2.style.display = 'none';
      if (w3) w3.style.display = 'none';
    } else if (shape === 'cuboid') {
      if (l1) l1.textContent = 'Length (l):';
      if (l2) l2.textContent = 'Width (w):';
      if (l3) l3.textContent = 'Height (h):';
      if (w2) w2.style.display = 'block';
      if (w3) w3.style.display = 'block';
    } else if (shape === 'pyramid') {
      if (l1) l1.textContent = 'Base Side (s):';
      if (l2) l2.textContent = 'Height (h):';
      if (w2) w2.style.display = 'block';
      if (w3) w3.style.display = 'none';
    } else if (shape === 'ellipsoid') {
      if (l1) l1.textContent = 'Semi-axis a:';
      if (l2) l2.textContent = 'Semi-axis b:';
      if (l3) l3.textContent = 'Semi-axis c:';
      if (w2) w2.style.display = 'block';
      if (w3) w3.style.display = 'block';
    }
    this.calcVolume();
  },

  calcVolume() {
    const shape = document.getElementById('vol-shape')?.value || 'sphere';
    const p1 = parseFloat(document.getElementById('vol-p1')?.value) || 0;
    const p2 = parseFloat(document.getElementById('vol-p2')?.value) || 0;
    const p3 = parseFloat(document.getElementById('vol-p3')?.value) || 0;

    let v = 0;
    let formula = '';
    if (shape === 'sphere') {
      v = (4 / 3) * Math.PI * Math.pow(p1, 3);
      formula = `V = 4/3 × π × r³ = 4/3 × π × ${p1}³ = ${v.toFixed(4)}`;
    } else if (shape === 'cylinder') {
      v = Math.PI * Math.pow(p1, 2) * p2;
      formula = `V = π × r² × h = π × ${p1}² × ${p2} = ${v.toFixed(4)}`;
    } else if (shape === 'cone') {
      v = (1 / 3) * Math.PI * Math.pow(p1, 2) * p2;
      formula = `V = 1/3 × π × r² × h = 1/3 × π × ${p1}² × ${p2} = ${v.toFixed(4)}`;
    } else if (shape === 'cube') {
      v = Math.pow(p1, 3);
      formula = `V = s³ = ${p1}³ = ${v.toFixed(4)}`;
    } else if (shape === 'cuboid') {
      v = p1 * p2 * p3;
      formula = `V = l × w × h = ${p1} × ${p2} × ${p3} = ${v.toFixed(4)}`;
    } else if (shape === 'pyramid') {
      v = (1 / 3) * Math.pow(p1, 2) * p2;
      formula = `V = 1/3 × s² × h = 1/3 × ${p1}² × ${p2} = ${v.toFixed(4)}`;
    } else if (shape === 'ellipsoid') {
      v = (4 / 3) * Math.PI * p1 * p2 * p3;
      formula = `V = 4/3 × π × a × b × c = 4/3 × π × ${p1} × ${p2} × ${p3} = ${v.toFixed(4)}`;
    }

    const elVol = document.getElementById('res-vol-value');
    if (elVol) elVol.textContent = v.toLocaleString(undefined, { maximumFractionDigits: 4 });

    const elLiters = document.getElementById('res-vol-liters');
    if (elLiters) elLiters.textContent = (v * 1000).toLocaleString(undefined, { maximumFractionDigits: 2 }) + ' L';

    const elGallons = document.getElementById('res-vol-gallons');
    if (elGallons) elGallons.textContent = (v * 264.172).toLocaleString(undefined, { maximumFractionDigits: 2 }) + ' gal (US)';

    const elCm3 = document.getElementById('res-vol-cm3');
    if (elCm3) elCm3.textContent = (v * 1e6).toLocaleString(undefined, { maximumFractionDigits: 0 }) + ' cm³';

    const elFt3 = document.getElementById('res-vol-ft3');
    if (elFt3) elFt3.textContent = (v * 35.3147).toLocaleString(undefined, { maximumFractionDigits: 2 }) + ' ft³';

    const banner = document.getElementById('vol-formula-banner');
    if (banner) banner.textContent = formula;
  },

  calcSlope() {
    const x1 = parseFloat(document.getElementById('slope-x1')?.value) || 0;
    const y1 = parseFloat(document.getElementById('slope-y1')?.value) || 0;
    const x2 = parseFloat(document.getElementById('slope-x2')?.value) || 0;
    const y2 = parseFloat(document.getElementById('slope-y2')?.value) || 0;

    const dx = x2 - x1;
    const dy = y2 - y1;

    const elSlope = document.getElementById('res-slope-m');
    const elEq = document.getElementById('res-slope-eq');
    const elAngle = document.getElementById('res-slope-angle');
    const elGrade = document.getElementById('res-slope-grade');
    const elPerp = document.getElementById('res-slope-perp');
    const elDist = document.getElementById('res-slope-dist');
    const banner = document.getElementById('slope-banner');

    if (Math.abs(dx) < 1e-9) {
      if (elSlope) elSlope.textContent = 'Undefined (Vertical)';
      if (elEq) elEq.textContent = `x = ${x1}`;
      if (elAngle) elAngle.textContent = '90.00° (π/2 rad)';
      if (elGrade) elGrade.textContent = 'Undefined (∞)';
      if (elPerp) elPerp.textContent = '0 (Horizontal)';
      if (elDist) elDist.textContent = Math.abs(dy).toFixed(4);
      if (banner) banner.textContent = `Vertical Line through x = ${x1}. Δx = 0, Δy = ${dy}`;
      return;
    }

    const m = dy / dx;
    const b = y1 - m * x1;
    const angleDeg = Math.atan(m) * (180 / Math.PI);
    const angleRad = Math.atan(m);
    const gradePct = m * 100;
    const perpSlope = m !== 0 ? -1 / m : 'Undefined (Vertical)';
    const dist = Math.sqrt(dx * dx + dy * dy);

    const bSign = b >= 0 ? `+ ${b.toFixed(4)}` : `- ${Math.abs(b).toFixed(4)}`;
    const eq = `y = ${m.toFixed(4)}x ${b !== 0 ? bSign : ''}`;

    if (elSlope) elSlope.textContent = `${m.toFixed(4)} (${dy}/${dx})`;
    if (elEq) elEq.textContent = eq;
    if (elAngle) elAngle.textContent = `${angleDeg.toFixed(2)}° (${angleRad.toFixed(4)} rad)`;
    if (elGrade) elGrade.textContent = `${gradePct.toFixed(2)}%`;
    if (elPerp) elPerp.textContent = typeof perpSlope === 'number' ? perpSlope.toFixed(4) : perpSlope;
    if (elDist) elDist.textContent = dist.toFixed(4);

    if (banner) {
      banner.innerHTML = `<strong>Formula:</strong> m = (y₂ - y₁) / (x₂ - x₁) = (${y2} - ${y1}) / (${x2} - ${x1}) = <strong>${m.toFixed(4)}</strong> | y-intercept b = <strong>${b.toFixed(4)}</strong>`;
    }
  },

  updateAreaFields() {
    const shape = document.getElementById('area-shape')?.value || 'rectangle';
    const l1 = document.getElementById('area-label-1');
    const l2 = document.getElementById('area-label-2');
    const l3 = document.getElementById('area-label-3');
    const w2 = document.getElementById('area-wrap-2');
    const w3 = document.getElementById('area-wrap-3');

    if (shape === 'rectangle') {
      if (l1) l1.textContent = 'Length (l):';
      if (l2) l2.textContent = 'Width (w):';
      if (w2) w2.style.display = 'block';
      if (w3) w3.style.display = 'none';
    } else if (shape === 'circle') {
      if (l1) l1.textContent = 'Radius (r):';
      if (w2) w2.style.display = 'none';
      if (w3) w3.style.display = 'none';
    } else if (shape === 'triangle' || shape === 'parallelogram') {
      if (l1) l1.textContent = 'Base (b):';
      if (l2) l2.textContent = 'Height (h):';
      if (w2) w2.style.display = 'block';
      if (w3) w3.style.display = 'none';
    } else if (shape === 'trapezoid') {
      if (l1) l1.textContent = 'Base a:';
      if (l2) l2.textContent = 'Base b:';
      if (l3) l3.textContent = 'Height (h):';
      if (w2) w2.style.display = 'block';
      if (w3) w3.style.display = 'block';
    } else if (shape === 'ellipse') {
      if (l1) l1.textContent = 'Semi-major axis (a):';
      if (l2) l2.textContent = 'Semi-minor axis (b):';
      if (w2) w2.style.display = 'block';
      if (w3) w3.style.display = 'none';
    } else if (shape === 'polygon') {
      if (l1) l1.textContent = 'Number of Sides (n):';
      if (l2) l2.textContent = 'Side Length (s):';
      if (w2) w2.style.display = 'block';
      if (w3) w3.style.display = 'none';
    } else if (shape === 'sector') {
      if (l1) l1.textContent = 'Radius (r):';
      if (l2) l2.textContent = 'Angle (degrees):';
      if (w2) w2.style.display = 'block';
      if (w3) w3.style.display = 'none';
    }
    this.calcArea();
  },

  calcArea() {
    const shape = document.getElementById('area-shape')?.value || 'rectangle';
    const p1 = parseFloat(document.getElementById('area-p1')?.value) || 0;
    const p2 = parseFloat(document.getElementById('area-p2')?.value) || 0;
    const p3 = parseFloat(document.getElementById('area-p3')?.value) || 0;

    let a = 0;
    let p = 0;
    let formula = '';

    if (shape === 'rectangle') {
      a = p1 * p2;
      p = 2 * (p1 + p2);
      formula = `Area = l × w = ${p1} × ${p2} = ${a.toFixed(4)} | Perimeter = 2(l + w) = ${p.toFixed(4)}`;
    } else if (shape === 'circle') {
      a = Math.PI * p1 * p1;
      p = 2 * Math.PI * p1;
      formula = `Area = π × r² = π × ${p1}² = ${a.toFixed(4)} | Circumference = 2πr = ${p.toFixed(4)}`;
    } else if (shape === 'triangle') {
      a = 0.5 * p1 * p2;
      p = 0;
      formula = `Area = 0.5 × Base × Height = 0.5 × ${p1} × ${p2} = ${a.toFixed(4)}`;
    } else if (shape === 'trapezoid') {
      a = 0.5 * (p1 + p2) * p3;
      formula = `Area = 0.5 × (a + b) × h = 0.5 × (${p1} + ${p2}) × ${p3} = ${a.toFixed(4)}`;
    } else if (shape === 'parallelogram') {
      a = p1 * p2;
      formula = `Area = Base × Height = ${p1} × ${p2} = ${a.toFixed(4)}`;
    } else if (shape === 'ellipse') {
      a = Math.PI * p1 * p2;
      p = Math.PI * (3 * (p1 + p2) - Math.sqrt((3 * p1 + p2) * (p1 + 3 * p2)));
      formula = `Area = π × a × b = π × ${p1} × ${p2} = ${a.toFixed(4)} | Approx Perimeter = ${p.toFixed(4)}`;
    } else if (shape === 'polygon') {
      const n = Math.max(3, Math.round(p1));
      const s = p2;
      a = (n * s * s) / (4 * Math.tan(Math.PI / n));
      p = n * s;
      formula = `Regular ${n}-gon Area = (${n} × ${s}²) / [4 × tan(π/${n})] = ${a.toFixed(4)} | Perimeter = ${p.toFixed(4)}`;
    } else if (shape === 'sector') {
      a = (p2 / 360) * Math.PI * p1 * p1;
      p = ((p2 / 360) * 2 * Math.PI * p1) + (2 * p1);
      formula = `Sector Area = (θ/360) × πr² = (${p2}/360) × π × ${p1}² = ${a.toFixed(4)}`;
    }

    const elArea = document.getElementById('res-area-val');
    if (elArea) elArea.textContent = a.toLocaleString(undefined, { maximumFractionDigits: 4 });

    const elPerim = document.getElementById('res-area-perim');
    if (elPerim) elPerim.textContent = p > 0 ? p.toLocaleString(undefined, { maximumFractionDigits: 4 }) : 'N/A';

    const elFt2 = document.getElementById('res-area-ft2');
    if (elFt2) elFt2.textContent = (a * 10.7639).toLocaleString(undefined, { maximumFractionDigits: 2 }) + ' ft²';

    const elAcres = document.getElementById('res-area-acres');
    if (elAcres) elAcres.textContent = (a / 4046.86).toLocaleString(undefined, { maximumFractionDigits: 4 }) + ' acres';

    const banner = document.getElementById('area-formula-banner');
    if (banner) banner.textContent = formula;
  },

  updateDistanceDim() {
    const is3D = document.getElementById('dist-dim')?.value === '3d';
    const z1 = document.getElementById('dist-wrap-z1');
    const z2 = document.getElementById('dist-wrap-z2');
    if (z1) z1.style.display = is3D ? 'block' : 'none';
    if (z2) z2.style.display = is3D ? 'block' : 'none';
    this.calcDistance();
  },

  calcDistance() {
    const is3D = document.getElementById('dist-dim')?.value === '3d';
    const x1 = parseFloat(document.getElementById('dist-x1')?.value) || 0;
    const y1 = parseFloat(document.getElementById('dist-y1')?.value) || 0;
    const z1 = parseFloat(document.getElementById('dist-z1')?.value) || 0;
    const x2 = parseFloat(document.getElementById('dist-x2')?.value) || 0;
    const y2 = parseFloat(document.getElementById('dist-y2')?.value) || 0;
    const z2 = parseFloat(document.getElementById('dist-z2')?.value) || 0;

    const dx = x2 - x1;
    const dy = y2 - y1;
    const dz = is3D ? z2 - z1 : 0;

    const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;
    const midZ = (z1 + z2) / 2;
    const manhattan = Math.abs(dx) + Math.abs(dy) + (is3D ? Math.abs(dz) : 0);

    const elDist = document.getElementById('res-dist-val');
    if (elDist) elDist.textContent = d.toLocaleString(undefined, { maximumFractionDigits: 4 });

    const elMid = document.getElementById('res-dist-mid');
    if (elMid) elMid.textContent = is3D ? `(${midX.toFixed(2)}, ${midY.toFixed(2)}, ${midZ.toFixed(2)})` : `(${midX.toFixed(2)}, ${midY.toFixed(2)})`;

    const elVec = document.getElementById('res-dist-vec');
    if (elVec) elVec.textContent = is3D ? `⟨${dx.toFixed(2)}, ${dy.toFixed(2)}, ${dz.toFixed(2)}⟩` : `⟨${dx.toFixed(2)}, ${dy.toFixed(2)}⟩`;

    const elMan = document.getElementById('res-dist-manhattan');
    if (elMan) elMan.textContent = manhattan.toLocaleString(undefined, { maximumFractionDigits: 2 });

    const banner = document.getElementById('dist-formula-banner');
    if (banner) {
      if (!is3D) {
        banner.innerHTML = `<strong>Formula:</strong> d = √[(x₂ - x₁)² + (y₂ - y₁)²] = √[(${x2} - ${x1})² + (${y2} - ${y1})²] = √[${(dx*dx).toFixed(2)} + ${(dy*dy).toFixed(2)}] = <strong>${d.toFixed(4)}</strong>`;
      } else {
        banner.innerHTML = `<strong>Formula:</strong> d = √[(Δx)² + (Δy)² + (Δz)²] = √[${(dx*dx).toFixed(2)} + ${(dy*dy).toFixed(2)} + ${(dz*dz).toFixed(2)}] = <strong>${d.toFixed(4)}</strong>`;
      }
    }
  },

  calcCircle(source = 'r') {
    let r = 0;
    if (source === 'r') {
      r = parseFloat(document.getElementById('circ-r')?.value) || 0;
    } else if (source === 'd') {
      const d = parseFloat(document.getElementById('circ-d')?.value) || 0;
      r = d / 2;
    } else if (source === 'c') {
      const c = parseFloat(document.getElementById('circ-c')?.value) || 0;
      r = c / (2 * Math.PI);
    } else if (source === 'a') {
      const a = parseFloat(document.getElementById('circ-a')?.value) || 0;
      r = a > 0 ? Math.sqrt(a / Math.PI) : 0;
    }

    if (r <= 0) return;

    const d = 2 * r;
    const c = 2 * Math.PI * r;
    const a = Math.PI * r * r;

    // Update other input fields without triggering infinite loop
    if (source !== 'r') {
      const inp = document.getElementById('circ-r');
      if (inp) inp.value = r.toFixed(4);
    }
    if (source !== 'd') {
      const inp = document.getElementById('circ-d');
      if (inp) inp.value = d.toFixed(4);
    }
    if (source !== 'c') {
      const inp = document.getElementById('circ-c');
      if (inp) inp.value = c.toFixed(4);
    }
    if (source !== 'a') {
      const inp = document.getElementById('circ-a');
      if (inp) inp.value = a.toFixed(4);
    }

    const thetaDeg = parseFloat(document.getElementById('circ-theta')?.value) || 360;
    const thetaRad = (thetaDeg * Math.PI) / 180;
    const arcLen = (thetaDeg / 360) * c;
    const sectorArea = (thetaDeg / 360) * a;
    const chordLen = 2 * r * Math.sin(thetaRad / 2);
    const segmentArea = sectorArea - 0.5 * r * r * Math.sin(thetaRad);

    const elR = document.getElementById('res-circ-r');
    if (elR) elR.textContent = r.toFixed(4);
    const elD = document.getElementById('res-circ-d');
    if (elD) elD.textContent = d.toFixed(4);
    const elC = document.getElementById('res-circ-c');
    if (elC) elC.textContent = c.toFixed(4);
    const elA = document.getElementById('res-circ-a');
    if (elA) elA.textContent = a.toFixed(4);

    const elArc = document.getElementById('res-circ-arc');
    if (elArc) elArc.textContent = `${arcLen.toFixed(4)} (at θ = ${thetaDeg}°)`;
    const elSec = document.getElementById('res-circ-sec');
    if (elSec) elSec.textContent = `${sectorArea.toFixed(4)} (at θ = ${thetaDeg}°)`;
    const elChord = document.getElementById('res-circ-chord');
    if (elChord) elChord.textContent = chordLen.toFixed(4);
    const elSeg = document.getElementById('res-circ-seg');
    if (elSeg) elSeg.textContent = segmentArea.toFixed(4);

    const banner = document.getElementById('circ-formula-banner');
    if (banner) {
      banner.innerHTML = `<strong>Circle Relations:</strong> Diameter = 2r = <strong>${d.toFixed(4)}</strong> | Circumference = 2πr = <strong>${c.toFixed(4)}</strong> | Area = πr² = <strong>${a.toFixed(4)}</strong>`;
    }
  },

  updateSurfaceAreaFields() {
    const shape = document.getElementById('sa-shape')?.value || 'sphere';
    const l1 = document.getElementById('sa-label-1');
    const l2 = document.getElementById('sa-label-2');
    const l3 = document.getElementById('sa-label-3');
    const w2 = document.getElementById('sa-wrap-2');
    const w3 = document.getElementById('sa-wrap-3');

    if (shape === 'sphere') {
      if (l1) l1.textContent = 'Radius (r):';
      if (w2) w2.style.display = 'none';
      if (w3) w3.style.display = 'none';
    } else if (shape === 'cylinder' || shape === 'cone' || shape === 'capsule') {
      if (l1) l1.textContent = 'Radius (r):';
      if (l2) l2.textContent = 'Height (h):';
      if (w2) w2.style.display = 'block';
      if (w3) w3.style.display = 'none';
    } else if (shape === 'cube') {
      if (l1) l1.textContent = 'Side Length (s):';
      if (w2) w2.style.display = 'none';
      if (w3) w3.style.display = 'none';
    } else if (shape === 'cuboid') {
      if (l1) l1.textContent = 'Length (l):';
      if (l2) l2.textContent = 'Width (w):';
      if (l3) l3.textContent = 'Height (h):';
      if (w2) w2.style.display = 'block';
      if (w3) w3.style.display = 'block';
    } else if (shape === 'pyramid') {
      if (l1) l1.textContent = 'Base Side (s):';
      if (l2) l2.textContent = 'Height (h):';
      if (w2) w2.style.display = 'block';
      if (w3) w3.style.display = 'none';
    }
    this.calcSurfaceArea();
  },

  calcSurfaceArea() {
    const shape = document.getElementById('sa-shape')?.value || 'sphere';
    const p1 = parseFloat(document.getElementById('sa-p1')?.value) || 0;
    const p2 = parseFloat(document.getElementById('sa-p2')?.value) || 0;
    const p3 = parseFloat(document.getElementById('sa-p3')?.value) || 0;

    let total = 0;
    let lateral = 0;
    let base = 0;
    let formula = '';

    if (shape === 'sphere') {
      total = 4 * Math.PI * p1 * p1;
      lateral = total;
      base = 0;
      formula = `Total Area = 4πr² = 4 × π × ${p1}² = ${total.toFixed(4)}`;
    } else if (shape === 'cylinder') {
      base = 2 * Math.PI * p1 * p1;
      lateral = 2 * Math.PI * p1 * p2;
      total = base + lateral;
      formula = `Total = Lateral (2πrh = ${lateral.toFixed(2)}) + 2 Bases (2πr² = ${base.toFixed(2)}) = ${total.toFixed(4)}`;
    } else if (shape === 'cone') {
      const s = Math.sqrt(p1 * p1 + p2 * p2);
      base = Math.PI * p1 * p1;
      lateral = Math.PI * p1 * s;
      total = base + lateral;
      formula = `Slant Height s = √(r²+h²) = ${s.toFixed(2)} | Total = πrs + πr² = ${total.toFixed(4)}`;
    } else if (shape === 'cube') {
      total = 6 * p1 * p1;
      lateral = 4 * p1 * p1;
      base = 2 * p1 * p1;
      formula = `Total Area = 6s² = 6 × ${p1}² = ${total.toFixed(4)}`;
    } else if (shape === 'cuboid') {
      total = 2 * (p1*p2 + p1*p3 + p2*p3);
      lateral = 2 * p3 * (p1 + p2);
      base = 2 * p1 * p2;
      formula = `Total Area = 2(lw + lh + wh) = ${total.toFixed(4)}`;
    } else if (shape === 'pyramid') {
      const slant = Math.sqrt(Math.pow(p1 / 2, 2) + p2 * p2);
      base = p1 * p1;
      lateral = 2 * p1 * slant;
      total = base + lateral;
      formula = `Slant Height = ${slant.toFixed(2)} | Total = s² + 2s(slant) = ${total.toFixed(4)}`;
    } else if (shape === 'capsule') {
      lateral = 2 * Math.PI * p1 * p2;
      base = 4 * Math.PI * p1 * p1; // 2 hemispherical caps
      total = lateral + base;
      formula = `Total = Cylinder Body (2πrh = ${lateral.toFixed(2)}) + 2 Hemispheres (4πr² = ${base.toFixed(2)}) = ${total.toFixed(4)}`;
    }

    const elTotal = document.getElementById('res-sa-total');
    if (elTotal) elTotal.textContent = total.toLocaleString(undefined, { maximumFractionDigits: 4 });

    const elLat = document.getElementById('res-sa-lateral');
    if (elLat) elLat.textContent = lateral.toLocaleString(undefined, { maximumFractionDigits: 4 });

    const elBase = document.getElementById('res-sa-base');
    if (elBase) elBase.textContent = base.toLocaleString(undefined, { maximumFractionDigits: 4 });

    const banner = document.getElementById('sa-formula-banner');
    if (banner) banner.textContent = formula;
  },

  updatePythagoreanMode() {
    const mode = document.getElementById('pyth-solve-mode')?.value || 'c';
    const wrapA = document.getElementById('pyth-wrap-a');
    const wrapB = document.getElementById('pyth-wrap-b');
    const wrapC = document.getElementById('pyth-wrap-c');
    const inpA = document.getElementById('pyth-a');
    const inpB = document.getElementById('pyth-b');
    const inpC = document.getElementById('pyth-c');

    if (inpA) inpA.disabled = mode === 'a';
    if (inpB) inpB.disabled = mode === 'b';
    if (inpC) inpC.disabled = mode === 'c';

    this.calcPythagorean();
  },

  calcPythagorean() {
    const mode = document.getElementById('pyth-solve-mode')?.value || 'c';
    let a = parseFloat(document.getElementById('pyth-a')?.value) || 0;
    let b = parseFloat(document.getElementById('pyth-b')?.value) || 0;
    let c = parseFloat(document.getElementById('pyth-c')?.value) || 0;

    const banner = document.getElementById('pyth-formula-banner');
    let solvedVal = 0;

    if (mode === 'c') {
      if (a <= 0 || b <= 0) return;
      solvedVal = Math.sqrt(a * a + b * b);
      c = solvedVal;
      const inpC = document.getElementById('pyth-c');
      if (inpC) inpC.value = c.toFixed(4);
    } else if (mode === 'a') {
      if (c <= b || b <= 0) {
        if (banner) banner.textContent = '⚠️ Hypotenuse c must be strictly greater than leg b.';
        return;
      }
      solvedVal = Math.sqrt(c * c - b * b);
      a = solvedVal;
      const inpA = document.getElementById('pyth-a');
      if (inpA) inpA.value = a.toFixed(4);
    } else if (mode === 'b') {
      if (c <= a || a <= 0) {
        if (banner) banner.textContent = '⚠️ Hypotenuse c must be strictly greater than leg a.';
        return;
      }
      solvedVal = Math.sqrt(c * c - a * a);
      b = solvedVal;
      const inpB = document.getElementById('pyth-b');
      if (inpB) inpB.value = b.toFixed(4);
    }

    const perimeter = a + b + c;
    const area = 0.5 * a * b;
    const altitude = (a * b) / c;
    const angleA = Math.asin(Math.max(-1, Math.min(1, a / c))) * (180 / Math.PI);
    const angleB = 90 - angleA;

    const isTriple = Number.isInteger(Math.round(a*1e4)/1e4) &&
                     Number.isInteger(Math.round(b*1e4)/1e4) &&
                     Number.isInteger(Math.round(c*1e4)/1e4);

    const elHyp = document.getElementById('res-pyth-hyp');
    if (elHyp) elHyp.textContent = c.toFixed(4);

    const elArea = document.getElementById('res-pyth-area');
    if (elArea) elArea.textContent = area.toFixed(4);

    const elPerim = document.getElementById('res-pyth-perim');
    if (elPerim) elPerim.textContent = perimeter.toFixed(4);

    const elAlt = document.getElementById('res-pyth-alt');
    if (elAlt) elAlt.textContent = altitude.toFixed(4);

    const elAngles = document.getElementById('res-pyth-angles');
    if (elAngles) elAngles.textContent = `∠A = ${angleA.toFixed(2)}°, ∠B = ${angleB.toFixed(2)}°, ∠C = 90.00°`;

    const elTriple = document.getElementById('res-pyth-triple');
    if (elTriple) {
      elTriple.textContent = isTriple ? `✅ Yes, (${Math.round(a)}, ${Math.round(b)}, ${Math.round(c)}) is a Pythagorean Triple!` : 'No (Non-integer sides)';
    }

    if (banner) {
      banner.innerHTML = `<strong>Pythagorean Theorem:</strong> a² + b² = c² &nbsp;➔&nbsp; ` +
        `<strong>${a.toFixed(2)}² + ${b.toFixed(2)}² = ${(a*a).toFixed(2)} + ${(b*b).toFixed(2)} = ${(c*c).toFixed(2)} = ${c.toFixed(4)}²</strong>`;
    }
  },

  updateRightTriangleMode() {
    const mode = document.getElementById('rt-mode')?.value || 'two_legs';
    const l1 = document.getElementById('rt-label-1');
    const l2 = document.getElementById('rt-label-2');

    if (mode === 'two_legs') {
      if (l1) l1.textContent = 'Leg a:';
      if (l2) l2.textContent = 'Leg b:';
    } else if (mode === 'leg_hyp') {
      if (l1) l1.textContent = 'Leg a:';
      if (l2) l2.textContent = 'Hypotenuse c:';
    } else if (mode === 'leg_angle') {
      if (l1) l1.textContent = 'Leg a:';
      if (l2) l2.textContent = 'Angle α (degrees):';
    } else if (mode === 'hyp_angle') {
      if (l1) l1.textContent = 'Hypotenuse c:';
      if (l2) l2.textContent = 'Angle α (degrees):';
    }
    this.calcRightTriangle();
  },

  calcRightTriangle() {
    const mode = document.getElementById('rt-mode')?.value || 'two_legs';
    const p1 = parseFloat(document.getElementById('rt-p1')?.value) || 0;
    const p2 = parseFloat(document.getElementById('rt-p2')?.value) || 0;

    const banner = document.getElementById('rt-formula-banner');
    if (p1 <= 0 || p2 <= 0) return;

    let a = 0, b = 0, c = 0, angleA = 0, angleB = 0;

    if (mode === 'two_legs') {
      a = p1; b = p2;
      c = Math.sqrt(a * a + b * b);
      angleA = Math.atan(a / b) * (180 / Math.PI);
      angleB = 90 - angleA;
    } else if (mode === 'leg_hyp') {
      a = p1; c = p2;
      if (c <= a) {
        if (banner) banner.textContent = '⚠️ Hypotenuse c must be strictly larger than leg a.';
        return;
      }
      b = Math.sqrt(c * c - a * a);
      angleA = Math.asin(a / c) * (180 / Math.PI);
      angleB = 90 - angleA;
    } else if (mode === 'leg_angle') {
      a = p1; angleA = p2;
      if (angleA <= 0 || angleA >= 90) {
        if (banner) banner.textContent = '⚠️ Acute angle α must be strictly between 0° and 90°.';
        return;
      }
      angleB = 90 - angleA;
      const radA = (angleA * Math.PI) / 180;
      c = a / Math.sin(radA);
      b = a / Math.tan(radA);
    } else if (mode === 'hyp_angle') {
      c = p1; angleA = p2;
      if (angleA <= 0 || angleA >= 90) {
        if (banner) banner.textContent = '⚠️ Acute angle α must be strictly between 0° and 90°.';
        return;
      }
      angleB = 90 - angleA;
      const radA = (angleA * Math.PI) / 180;
      a = c * Math.sin(radA);
      b = c * Math.cos(radA);
    }

    const area = 0.5 * a * b;
    const perimeter = a + b + c;
    const altitude = (a * b) / c;

    const elSides = document.getElementById('res-rt-sides');
    if (elSides) elSides.textContent = `a = ${a.toFixed(4)}, b = ${b.toFixed(4)}, c = ${c.toFixed(4)}`;

    const elAngles = document.getElementById('res-rt-angles');
    if (elAngles) elAngles.textContent = `α = ${angleA.toFixed(2)}°, β = ${angleB.toFixed(2)}°, γ = 90.00°`;

    const elArea = document.getElementById('res-rt-area');
    if (elArea) elArea.textContent = area.toFixed(4);

    const elPerim = document.getElementById('res-rt-perim');
    if (elPerim) elPerim.textContent = perimeter.toFixed(4);

    const elAlt = document.getElementById('res-rt-alt');
    if (elAlt) elAlt.textContent = altitude.toFixed(4);

    const radA = (angleA * Math.PI) / 180;
    const sinA = Math.sin(radA);
    const cosA = Math.cos(radA);
    const tanA = Math.tan(radA);

    const elTrig = document.getElementById('res-rt-trig');
    if (elTrig) {
      elTrig.textContent = `sin α = ${sinA.toFixed(4)} | cos α = ${cosA.toFixed(4)} | tan α = ${tanA.toFixed(4)}`;
    }

    if (banner) {
      banner.innerHTML = `<strong>Solved Right Triangle:</strong> Sides: [${a.toFixed(2)}, ${b.toFixed(2)}, ${c.toFixed(2)}] | Angles: [${angleA.toFixed(1)}°, ${angleB.toFixed(1)}°, 90°] | Area = <strong>${area.toFixed(4)}</strong>`;
    }
  },

  init() {
    // 1. Percentage
    ['pct1-p', 'pct1-y', 'pct2-x', 'pct2-y', 'pct3-x', 'pct3-y'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcPercentages());
    });

    // 2. Quadratic
    ['quad-a', 'quad-b', 'quad-c'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcQuadratic());
    });

    // 3. Fraction
    ['frac-n1', 'frac-d1', 'frac-n2', 'frac-d2', 'frac-op'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener(el.tagName === 'SELECT' ? 'change' : 'input', () => this.calcFraction());
    });

    // 4. GCD & LCM
    document.getElementById('gcd-input')?.addEventListener('input', () => this.calcGcdLcm());

    // 5. Statistics
    document.getElementById('stats-input')?.addEventListener('input', () => this.calcStats());


    // 6. Scientific
    document.querySelectorAll('.sci-angle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.sci-angle-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.sciAngleUnit = btn.dataset.angle;
        this.calcSci();
      });
    });
    document.getElementById('sci-expression')?.addEventListener('input', () => this.calcSci());

    // 7. Random
    ['rnd-min', 'rnd-max', 'rnd-count', 'rnd-decimals'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcRandom());
    });
    ['rnd-type', 'rnd-duplicates', 'rnd-sort'].forEach(id => {
      document.getElementById(id)?.addEventListener('change', () => this.calcRandom());
    });

    // 8. Percent Error
    ['pe-experimental', 'pe-theoretical'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcPercentError());
    });

    // 9. Exponent
    ['exp-base', 'exp-power'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcExponent());
    });

    // 10. Binary
    ['bin-val1', 'bin-val2'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcBinary());
    });
    document.getElementById('bin-op')?.addEventListener('change', (e) => {
      const v2Group = document.getElementById('bin-group-v2');
      if (v2Group) v2Group.style.display = e.target.value === 'NOT' ? 'none' : 'block';
      this.calcBinary();
    });

    // 11. Hex
    ['hex-val1', 'hex-val2'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcHex());
    });
    document.getElementById('hex-op')?.addEventListener('change', () => this.calcHex());

    // 12. Half-Life
    ['hl-initial', 'hl-halflife', 'hl-time'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcHalfLife());
    });

    // 13. Log
    document.getElementById('log-x')?.addEventListener('input', () => this.calcLog());
    document.getElementById('log-custom-base')?.addEventListener('input', () => this.calcLog());
    document.getElementById('log-base-type')?.addEventListener('change', (e) => {
      const customWrap = document.getElementById('log-custom-wrap');
      if (customWrap) customWrap.style.display = e.target.value === 'custom' ? 'block' : 'none';
      this.calcLog();
    });

    // 14. Ratio
    ['ratio-a', 'ratio-b', 'ratio-c'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcRatio());
    });

    // 15. Root
    ['root-x', 'root-n'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcRoot());
    });

    // 16. LCM
    document.getElementById('lcm-input')?.addEventListener('input', () => this.calcLCM());

    // 17. GCF
    document.getElementById('gcf-input')?.addEventListener('input', () => this.calcGCF());

    // 18. Factor
    document.getElementById('factor-n')?.addEventListener('input', () => this.calcFactor());

    // 19. Rounding
    ['round-num', 'round-decimals'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcRounding());
    });

    // 20. Scientific Notation
    document.getElementById('scin-val')?.addEventListener('input', () => this.calcSciNotation());

    // 21. Big Number
    ['bignum-1', 'bignum-2'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcBigNumber());
    });
    document.getElementById('bignum-op')?.addEventListener('change', () => this.calcBigNumber());

    // 22. Triangle
    ['tri-side-a', 'tri-side-b', 'tri-side-c', 'tri-base', 'tri-height'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcTriangle());
    });
    document.getElementById('tri-mode')?.addEventListener('change', () => this.calcTriangle());

    // 23. Volume
    ['vol-p1', 'vol-p2', 'vol-p3'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcVolume());
    });
    document.getElementById('vol-shape')?.addEventListener('change', () => this.updateVolumeFields());

    // 24. Slope
    ['slope-x1', 'slope-y1', 'slope-x2', 'slope-y2'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcSlope());
    });

    // 25. Area
    ['area-p1', 'area-p2', 'area-p3'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcArea());
    });
    document.getElementById('area-shape')?.addEventListener('change', () => this.updateAreaFields());

    // 26. Distance
    ['dist-x1', 'dist-y1', 'dist-z1', 'dist-x2', 'dist-y2', 'dist-z2'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcDistance());
    });
    document.getElementById('dist-dim')?.addEventListener('change', () => this.updateDistanceDim());

    // 27. Circle
    document.getElementById('circ-r')?.addEventListener('input', () => this.calcCircle('r'));
    document.getElementById('circ-d')?.addEventListener('input', () => this.calcCircle('d'));
    document.getElementById('circ-c')?.addEventListener('input', () => this.calcCircle('c'));
    document.getElementById('circ-a')?.addEventListener('input', () => this.calcCircle('a'));
    document.getElementById('circ-theta')?.addEventListener('input', () => this.calcCircle('r'));

    // 28. Surface Area
    ['sa-p1', 'sa-p2', 'sa-p3'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcSurfaceArea());
    });
    document.getElementById('sa-shape')?.addEventListener('change', () => this.updateSurfaceAreaFields());

    // 29. Pythagorean Theorem
    ['pyth-a', 'pyth-b', 'pyth-c'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcPythagorean());
    });
    document.getElementById('pyth-solve-mode')?.addEventListener('change', () => this.updatePythagoreanMode());

    // 30. Right Triangle
    ['rt-p1', 'rt-p2'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcRightTriangle());
    });
    document.getElementById('rt-mode')?.addEventListener('change', () => this.updateRightTriangleMode());

    // Switcher pills inside detail view
    document.querySelectorAll('#math-detail-view .switcher-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        const target = pill.dataset.target;
        if (target) this.openCalculator(target);
      });
    });

    // Initial calculations
    this.calcPercentages();
    this.calcQuadratic();
    this.calcFraction();
    this.calcGcdLcm();
    this.calcStats();

    // Initial calls for 15 new Math solvers
    this.calcSci();
    this.calcRandom();
    this.calcPercentError();
    this.calcExponent();
    this.calcBinary();
    this.calcHex();
    this.calcHalfLife();
    this.calcLog();
    this.calcRatio();
    this.calcRoot();
    this.calcLCM();
    this.calcGCF();
    this.calcFactor();
    this.calcRounding();
    this.calcSciNotation();
    this.calcBigNumber();

    // Initial calls for 9 Geometry tools
    this.calcTriangle();
    this.updateVolumeFields();
    this.calcSlope();
    this.updateAreaFields();
    this.updateDistanceDim();
    this.calcCircle('r');
    this.updateSurfaceAreaFields();
    this.updatePythagoreanMode();
    this.updateRightTriangleMode();
  },

  // ------------------------------------------------------------------------
  // Math Catalog vs Detail View Management & Category Filtering
  // ------------------------------------------------------------------------
  currentFilter: 'all',

  filterCatalog(filterKey, btnEl) {
    this.currentFilter = filterKey || 'all';

    // Update active filter pill
    document.querySelectorAll('.math-filter-pill').forEach(btn => {
      const match = (btnEl && btn === btnEl) || (!btnEl && btn.dataset.filter === filterKey);
      btn.classList.toggle('active', !!match);
    });

    const catalogView = document.getElementById('math-catalog-view');
    const detailView = document.getElementById('math-detail-view');
    if (detailView && detailView.style.display !== 'none') {
      detailView.style.display = 'none';
      if (catalogView) catalogView.style.display = 'block';
    }

    const boxes = document.querySelectorAll('#math-catalog-view .feature-big-box');
    let visibleCount = 0;
    boxes.forEach(box => {
      const groups = (box.dataset.mathGroup || 'math algebra').split(' ');
      const match = filterKey === 'all' || groups.includes(filterKey);
      box.style.display = match ? 'flex' : 'none';
      if (match) visibleCount++;
    });

    const badge = document.getElementById('math-count-badge');
    if (badge) {
      if (filterKey === 'algebra') {
        badge.textContent = `${visibleCount} Algebra & Equation Solvers`;
      } else if (filterKey === 'arithmetic') {
        badge.textContent = `${visibleCount} Arithmetic & Number Solvers`;
      } else if (filterKey === 'cs') {
        badge.textContent = `${visibleCount} Computer Science & Base Solvers`;
      } else if (filterKey === 'scientific') {
        badge.textContent = `${visibleCount} Scientific & Decay Tools`;
      } else if (filterKey === 'theory') {
        badge.textContent = `${visibleCount} Number Theory Tools`;
      } else if (filterKey === 'geometry') {
        badge.textContent = `${visibleCount} Geometry & Trigonometry Tools`;
      } else if (filterKey === 'all') {
        badge.textContent = '29 Advanced Math Solvers';
      } else {
        badge.textContent = `${visibleCount} Math Solvers`;
      }
    }

    const noResults = document.getElementById('math-no-results');
    if (noResults) {
      noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }

    if (window.AppRouter && !window.AppRouter.isDispatching) {
      window.AppRouter.onCatalogOpened('math', filterKey !== 'all' ? filterKey : null);
    }
  },
  showCatalog() {
    const catalogView = document.getElementById('math-catalog-view');
    const detailView = document.getElementById('math-detail-view');
    if (catalogView) catalogView.style.display = 'block';
    if (detailView) detailView.style.display = 'none';
    const searchInput = document.getElementById('math-catalog-search');
    if (searchInput && searchInput.value) {
      this.searchCatalog(searchInput.value);
    } else {
      document.querySelectorAll('#math-catalog-view .feature-big-box').forEach(b => b.style.display = 'flex');
      const noResults = document.getElementById('math-no-results');
      if (noResults) noResults.style.display = 'none';
    }
    if (window.AppRouter && !window.AppRouter.isDispatching) {
      window.AppRouter.onCatalogOpened('math');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  searchCatalog(query) {
    const q = (query || '').toLowerCase().trim();
    const detailView = document.getElementById('math-detail-view');
    const catalogView = document.getElementById('math-catalog-view');
    if (detailView && detailView.style.display !== 'none' && q !== '') {
      detailView.style.display = 'none';
      if (catalogView) catalogView.style.display = 'block';
    }

    const boxes = document.querySelectorAll('#math-catalog-view .feature-big-box');
    let visibleCount = 0;
    boxes.forEach(box => {
      const title = box.querySelector('.box-title')?.textContent.toLowerCase() || '';
      const desc = box.querySelector('.box-description')?.textContent.toLowerCase() || '';
      const tags = box.querySelector('.box-tags-row')?.textContent.toLowerCase() || '';
      const keywords = (box.dataset.keywords || '').toLowerCase();
      const match = q === '' || title.includes(q) || desc.includes(q) || tags.includes(q) || keywords.includes(q);
      box.style.display = match ? 'flex' : 'none';
      if (match) visibleCount++;
    });

    const noResults = document.getElementById('math-no-results');
    if (noResults) {
      noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  },

  resetSearch() {
    const input = document.getElementById('math-catalog-search');
    if (input) input.value = '';
    this.searchCatalog('');
    const noResults = document.getElementById('math-no-results');
    if (noResults) noResults.style.display = 'none';
  },

  openCalculator(calcId) {
    const catalogView = document.getElementById('math-catalog-view');
    const detailView = document.getElementById('math-detail-view');
    if (catalogView) catalogView.style.display = 'none';
    if (detailView) detailView.style.display = 'block';

    document.querySelectorAll('.math-calc-unit').forEach(panel => {
      panel.style.display = panel.id === calcId ? 'block' : 'none';
    });

    document.querySelectorAll('#math-detail-view .switcher-pill').forEach(pill => {
      pill.classList.toggle('active', pill.dataset.target === calcId);
    });

    if (window.AppRouter && !window.AppRouter.isDispatching) {
      window.AppRouter.onCalculatorOpened(calcId, 'math');
    }

    if (window.ensureCalculatorPdfButton) {
      window.ensureCalculatorPdfButton(calcId);
    }

    if (window.SeoGuide) {
      window.SeoGuide.updateGuide(calcId, 'math');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  closeCalculator() {
    this.showCatalog();
  },

  showCalculator(calcKey) {
    if (calcKey && calcKey !== 'all') {
      this.openCalculator(calcKey);
    } else {
      this.showCatalog();
    }
  }
};

window.MathCalcs = MathCalcs;
