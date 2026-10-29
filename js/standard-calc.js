/* ==========================================================================
   CALC• MODERN CALCULATOR - STANDARD & SCIENTIFIC CALCULATOR ENGINE
   ========================================================================== */

class StandardCalculator {
  constructor() {
    this.currentInput = '0';
    this.expression = '';
    this.memory = 0;
    this.isScientific = false;
    this.angleMode = 'DEG'; // 'DEG' or 'RAD'
    this.history = JSON.parse(localStorage.getItem('omnicalc_history') || '[]');
    this.audioEnabled = true;

    this.initAudio();
    this.initElements();
    this.bindEvents();
    this.updateDisplay();
    this.renderHistory();
    if (window.SeoGuide) {
      window.SeoGuide.updateGuide(this.isScientific ? 'scientific' : 'standard', 'standard');
    }
  }

  initAudio() {
    try {
      this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      this.audioCtx = null;
    }
  }

  playKeySound(type = 'click') {
    if (!this.audioEnabled || !this.audioCtx) return;
    try {
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      const now = this.audioCtx.currentTime;
      if (type === 'operator') {
        osc.frequency.setValueAtTime(580, now);
        osc.frequency.exponentialRampToValueAtTime(320, now + 0.05);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'equals') {
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
        gain.gain.setValueAtTime(0.09, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else {
        osc.frequency.setValueAtTime(420, now);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.03);
        osc.start(now);
        osc.stop(now + 0.03);
      }
    } catch (e) {
      // Audio not permitted or failed
    }
  }

  initElements() {
    this.screenExpr = document.getElementById('calc-expression');
    this.screenCurrent = document.getElementById('calc-current-input');
    this.modeIndicator = document.getElementById('calc-mode-indicator');
    this.memIndicator = document.getElementById('calc-memory-indicator');
    this.historyList = document.getElementById('history-list');
    this.keypad = document.getElementById('calc-keypad');
  }

  bindEvents() {
    // Keypad button clicks
    if (this.keypad) {
      this.keypad.addEventListener('click', (e) => {
        const btn = e.target.closest('button');
        if (!btn) return;
        const action = btn.dataset.action;
        const val = btn.dataset.val;

        if (action === 'operator') {
          this.playKeySound('operator');
          this.handleOperator(val);
        } else if (action === 'number') {
          this.playKeySound('click');
          this.handleNumber(val);
        } else if (action === 'equals') {
          this.playKeySound('equals');
          this.calculate();
        } else if (action === 'clear') {
          this.playKeySound('click');
          this.clearAll();
        } else if (action === 'delete') {
          this.playKeySound('click');
          this.backspace();
        } else if (action === 'dot') {
          this.playKeySound('click');
          this.handleDot();
        } else if (action === 'plus-minus') {
          this.playKeySound('click');
          this.toggleSign();
        } else if (action === 'sci') {
          this.playKeySound('operator');
          this.handleScientific(val);
        }
      });
    }

    // Keyboard support
    window.addEventListener('keydown', (e) => {
      // Only capture if not focused in another input element
      const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
      if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select') return;

      if ((e.key >= '0' && e.key <= '9')) {
        this.playKeySound('click');
        this.handleNumber(e.key);
      } else if (['+', '-', '*', '/'].includes(e.key)) {
        this.playKeySound('operator');
        this.handleOperator(e.key === '*' ? '×' : e.key === '/' ? '÷' : e.key);
      } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        this.playKeySound('equals');
        this.calculate();
      } else if (e.key === 'Backspace') {
        this.playKeySound('click');
        this.backspace();
      } else if (e.key === 'Escape') {
        this.playKeySound('click');
        this.clearAll();
      } else if (e.key === '.') {
        this.playKeySound('click');
        this.handleDot();
      } else if (e.key === '%') {
        this.handleScientific('%');
      } else if (e.key === '(' || e.key === ')') {
        this.handleNumber(e.key);
      }
    });

    // Memory controls
    document.querySelectorAll('.mem-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.dataset.mem;
        this.handleMemory(action);
      });
    });

    // Angle mode button
    const angleBtn = document.getElementById('calc-angle-btn');
    if (angleBtn) {
      angleBtn.addEventListener('click', () => {
        this.angleMode = this.angleMode === 'DEG' ? 'RAD' : 'DEG';
        angleBtn.textContent = this.angleMode;
        if (this.modeIndicator) {
          this.modeIndicator.textContent = `${this.isScientific ? 'SCI' : 'STD'} • ${this.angleMode}`;
        }
      });
    }

    // Scientific / Standard mode toggler
    const toggleSciBtn = document.getElementById('toggle-sci-mode-btn');
    if (toggleSciBtn) {
      toggleSciBtn.addEventListener('click', () => {
        this.setScientificMode(!this.isScientific);
      });
    }

    // Standard Workspace Mode Selector Cards Click
    const boxStd = document.getElementById('box-std-mode');
    const boxSci = document.getElementById('box-sci-mode');
    const boxMem = document.getElementById('box-mem-mode');
    if (boxStd) boxStd.addEventListener('click', () => this.setScientificMode(false));
    if (boxSci) boxSci.addEventListener('click', () => this.setScientificMode(true));
    if (boxMem) boxMem.addEventListener('click', () => {
      document.getElementById('history-toggle-btn')?.click();
    });

    // Clear history button
    const clearHistBtn = document.getElementById('clear-history-btn');
    if (clearHistBtn) {
      clearHistBtn.addEventListener('click', () => {
        this.history = [];
        localStorage.removeItem('omnicalc_history');
        this.renderHistory();
        window.showToast?.('History cleared');
      });
    }
  }

  setScientificMode(isSci) {
    this.isScientific = isSci;
    const toggleSciBtn = document.getElementById('toggle-sci-mode-btn');
    if (toggleSciBtn) toggleSciBtn.classList.toggle('active', this.isScientific);
    if (this.keypad) this.keypad.classList.toggle('scientific-active', this.isScientific);
    document.querySelectorAll('.sci-key').forEach(el => {
      el.style.display = this.isScientific ? 'flex' : 'none';
    });
    if (this.modeIndicator) {
      this.modeIndicator.textContent = `${this.isScientific ? 'SCI' : 'STD'} • ${this.angleMode}`;
    }
    // Update selector card active states
    document.getElementById('box-std-mode')?.classList.toggle('active', !this.isScientific);
    document.getElementById('box-sci-mode')?.classList.toggle('active', this.isScientific);

    if (window.AppRouter && !window.AppRouter.isDispatching) {
      window.AppRouter.onCalculatorOpened(this.isScientific ? 'box-sci-mode' : 'box-std-mode', 'standard');
    }

    if (window.SeoGuide) {
      window.SeoGuide.updateGuide(this.isScientific ? 'scientific' : 'standard', 'standard');
    }
  }

  handleNumber(num) {
    if (this.currentInput === '0' && num !== '.') {
      this.currentInput = num;
    } else {
      this.currentInput += num;
    }
    this.updateDisplay();
  }

  handleDot() {
    // Check if the current number segment already has a decimal point
    const parts = this.currentInput.split(/[\+\-\×\÷]/);
    const lastPart = parts[parts.length - 1];
    if (!lastPart.includes('.')) {
      this.currentInput += '.';
      this.updateDisplay();
    }
  }

  handleOperator(op) {
    const lastChar = this.currentInput.trim().slice(-1);
    if (['+', '-', '×', '÷'].includes(lastChar)) {
      this.currentInput = this.currentInput.trim().slice(0, -1) + ` ${op} `;
    } else {
      this.currentInput += ` ${op} `;
    }
    this.updateDisplay();
  }

  toggleSign() {
    if (this.currentInput === '0') return;
    if (this.currentInput.startsWith('-')) {
      this.currentInput = this.currentInput.slice(1);
    } else {
      this.currentInput = '-' + this.currentInput;
    }
    this.updateDisplay();
  }

  backspace() {
    if (this.currentInput.length > 1) {
      this.currentInput = this.currentInput.trimEnd();
      this.currentInput = this.currentInput.slice(0, -1).trimEnd();
      if (this.currentInput === '') this.currentInput = '0';
    } else {
      this.currentInput = '0';
    }
    this.updateDisplay();
  }

  clearAll() {
    this.currentInput = '0';
    this.expression = '';
    this.updateDisplay();
  }

  handleScientific(fn) {
    try {
      let val = parseFloat(this.currentInput) || 0;
      let res;
      const angleMultiplier = this.angleMode === 'DEG' ? Math.PI / 180 : 1;

      switch (fn) {
        case 'sin':
          res = Math.sin(val * angleMultiplier);
          break;
        case 'cos':
          res = Math.cos(val * angleMultiplier);
          break;
        case 'tan':
          res = Math.tan(val * angleMultiplier);
          break;
        case 'sqrt':
          if (val < 0) throw new Error('Invalid Input');
          res = Math.sqrt(val);
          break;
        case 'sqr':
          res = Math.pow(val, 2);
          break;
        case 'cube':
          res = Math.pow(val, 3);
          break;
        case 'log':
          if (val <= 0) throw new Error('Invalid Input');
          res = Math.log10(val);
          break;
        case 'ln':
          if (val <= 0) throw new Error('Invalid Input');
          res = Math.log(val);
          break;
        case 'reciprocal':
          if (val === 0) throw new Error('Divide by 0');
          res = 1 / val;
          break;
        case 'pi':
          res = Math.PI;
          break;
        case 'e':
          res = Math.E;
          break;
        case 'fact':
          if (val < 0 || !Number.isInteger(val)) throw new Error('Integer ≥ 0 only');
          res = this.factorial(val);
          break;
        case '%':
          res = val / 100;
          break;
        case 'abs':
          res = Math.abs(val);
          break;
        case 'power':
          this.currentInput += ' ^ ';
          this.updateDisplay();
          return;
        default:
          return;
      }

      // Format clean decimals
      res = Math.round(res * 1e10) / 1e10;
      this.expression = `${fn}(${val}) =`;
      this.currentInput = String(res);
      this.addToHistory(this.expression, this.currentInput);
      this.updateDisplay();
    } catch (err) {
      this.currentInput = 'Error';
      this.updateDisplay();
    }
  }

  factorial(n) {
    if (n === 0 || n === 1) return 1;
    if (n > 170) return Infinity; // JS overflow
    let f = 1;
    for (let i = 2; i <= n; i++) f *= i;
    return f;
  }

  handleMemory(action) {
    const val = parseFloat(this.currentInput) || 0;
    switch (action) {
      case 'MC':
        this.memory = 0;
        window.showToast?.('Memory Cleared (MC)');
        break;
      case 'MR':
        this.currentInput = String(this.memory);
        this.updateDisplay();
        window.showToast?.(`Memory Recalled: ${this.memory}`);
        break;
      case 'M+':
        this.memory += val;
        window.showToast?.(`Added to Memory (M+): ${this.memory}`);
        break;
      case 'M-':
        this.memory -= val;
        window.showToast?.(`Subtracted from Memory (M-): ${this.memory}`);
        break;
      case 'MS':
        this.memory = val;
        window.showToast?.(`Stored in Memory (MS): ${this.memory}`);
        break;
    }
    if (this.memIndicator) {
      this.memIndicator.classList.toggle('active', this.memory !== 0);
    }
  }

  calculate() {
    if (!this.currentInput || this.currentInput === 'Error') return;
    try {
      let expr = this.currentInput
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/\^/g, '**');

      // Safe evaluation of sanitized math expressions
      // Check for valid characters
      if (/[^0-9\+\-\*\/\.\(\)\s\*\*%eE]/.test(expr)) {
        throw new Error('Invalid Expression');
      }

      // Evaluate safely
      const fn = new Function(`'use strict'; return (${expr})`);
      let result = fn();

      if (typeof result !== 'number' || !isFinite(result)) {
        throw new Error('Math Error');
      }

      result = Math.round(result * 1e10) / 1e10;
      this.expression = `${this.currentInput} =`;
      this.addToHistory(this.expression, result);
      this.currentInput = String(result);
      this.updateDisplay();
    } catch (err) {
      this.currentInput = 'Error';
      this.updateDisplay();
    }
  }

  addToHistory(expr, result) {
    this.history.unshift({
      expr,
      result,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    if (this.history.length > 50) this.history.pop();
    localStorage.setItem('omnicalc_history', JSON.stringify(this.history));
    this.renderHistory();
  }

  renderHistory() {
    if (!this.historyList) return;
    const badge = document.getElementById('history-count-badge');
    if (badge) badge.textContent = this.history.length;

    if (this.history.length === 0) {
      this.historyList.innerHTML = `<div class="history-empty">No calculations recorded yet.<br>Do some math to see history here!</div>`;
      return;
    }

    this.historyList.innerHTML = this.history.map(item => `
      <div class="history-item" onclick="window.stdCalc.restoreFromHistory('${item.result}')">
        <div class="history-expr">${item.expr}</div>
        <div class="history-res">${item.result}</div>
      </div>
    `).join('');
  }

  restoreFromHistory(val) {
    this.currentInput = String(val);
    this.updateDisplay();
    window.showToast?.(`Restored ${val}`);
    document.getElementById('history-drawer-backdrop')?.classList.remove('open');
  }

  updateDisplay() {
    if (this.screenExpr) this.screenExpr.textContent = this.expression;
    if (this.screenCurrent) this.screenCurrent.textContent = this.currentInput;
  }
}

// Instantiate and expose globally
window.addEventListener('DOMContentLoaded', () => {
  window.stdCalc = new StandardCalculator();
});
