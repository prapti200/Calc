/* ==========================================================================
   CALC• MODERN CALCULATOR - MAIN APPLICATION ORCHESTRATOR
   ========================================================================== */

(function () {
  'use strict';

  // --- 1. TOAST SYSTEM ---
  function showToast(message, icon = '✓') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span style="color:var(--accent-green);font-weight:bold;">${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px) scale(0.95)';
      toast.style.transition = 'all 0.2s ease';
      setTimeout(() => toast.remove(), 200);
    }, 2400);
  }
  window.showToast = showToast;

  // --- 2. THEME SWITCHER (Day / Night Mode) ---
  const storedTheme = localStorage.getItem('filezenith_theme') || 'light';
  const themeBtnLight = document.getElementById('theme-btn-light');
  const themeBtnDark = document.getElementById('theme-btn-dark');

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (document.body) document.body.setAttribute('data-theme', theme);
    localStorage.setItem('filezenith_theme', theme);
    if (themeBtnLight) themeBtnLight.classList.toggle('active', theme === 'light');
    if (themeBtnDark) themeBtnDark.classList.toggle('active', theme === 'dark');
  }

  applyTheme(storedTheme);

  if (themeBtnLight) {
    themeBtnLight.addEventListener('click', () => {
      applyTheme('light');
      showToast('Switched to Day (Light) Mode');
    });
  }
  if (themeBtnDark) {
    themeBtnDark.addEventListener('click', () => {
      applyTheme('dark');
      showToast('Switched to Night (Dark) Mode');
    });
  }

  // --- 3. SOUND TOGGLE (Settings & FX) ---
  const soundSwitch = document.getElementById('settings-sound-switch');
  let soundEnabled = localStorage.getItem('omnicalc_sound') !== 'false';

  function updateSoundState() {
    if (soundSwitch) {
      soundSwitch.checked = soundEnabled;
    }
    if (window.stdCalc) {
      window.stdCalc.audioEnabled = soundEnabled;
    }
  }

  updateSoundState();

  if (soundSwitch) {
    soundSwitch.addEventListener('change', () => {
      soundEnabled = soundSwitch.checked;
      localStorage.setItem('omnicalc_sound', soundEnabled);
      updateSoundState();
      showToast(soundEnabled ? 'Key click sounds enabled' : 'Key click sounds muted');
    });
  }

  // --- 4. SETTINGS POPOVER MENU ---
  const settingsToggleBtn = document.getElementById('settings-toggle-btn');
  const settingsPopover = document.getElementById('settings-popover');
  const settingsCloseBtn = document.getElementById('settings-close-btn');
  const settingsOpenHistory = document.getElementById('settings-open-history');
  const settingsClearHistory = document.getElementById('settings-clear-history');

  function toggleSettings(forceClose = false, popHistory = true) {
    if (!settingsPopover) return;
    const wasOpen = settingsPopover.classList.contains('open');
    if (forceClose || wasOpen) {
      settingsPopover.classList.remove('open');
      if (settingsToggleBtn) {
        settingsToggleBtn.classList.remove('active');
        settingsToggleBtn.setAttribute('aria-expanded', 'false');
      }
      if (wasOpen && popHistory && history.state && history.state.mobileOverlay === 'settings') {
        history.back();
      }
    } else {
      settingsPopover.classList.add('open');
      if (settingsToggleBtn) {
        settingsToggleBtn.classList.add('active');
        settingsToggleBtn.setAttribute('aria-expanded', 'true');
      }
      try {
        history.pushState({ mobileOverlay: 'settings' }, '', window.location.href);
      } catch (_) {}
    }
  }

  if (settingsToggleBtn) {
    settingsToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleSettings();
    });
  }

  if (settingsCloseBtn) {
    settingsCloseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleSettings(true);
    });
  }

  // Close Settings on clicking outside
  document.addEventListener('click', (e) => {
    if (settingsPopover && settingsPopover.classList.contains('open')) {
      if (!settingsPopover.contains(e.target) && !settingsToggleBtn.contains(e.target)) {
        toggleSettings(true);
      }
    }
  });

  // Close Settings on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      toggleSettings(true);
      closeHistory();
    }
  });

  if (settingsOpenHistory) {
    settingsOpenHistory.addEventListener('click', () => {
      toggleSettings(true);
      openHistory();
    });
  }

  if (settingsClearHistory) {
    settingsClearHistory.addEventListener('click', () => {
      const clearBtn = document.getElementById('clear-history-btn');
      if (clearBtn) {
        clearBtn.click();
      } else if (window.stdCalc && typeof window.stdCalc.clearHistory === 'function') {
        window.stdCalc.clearHistory();
      }
      showToast('Calculation history cleared');
    });
  }

  // --- 5. HISTORY DRAWER ---
  const historyToggleBtn = document.getElementById('history-toggle-btn');
  const historyDrawerBackdrop = document.getElementById('history-drawer-backdrop');
  const closeHistoryBtn = document.getElementById('close-history-btn');

  function openHistory() {
    if (historyDrawerBackdrop) {
      historyDrawerBackdrop.classList.add('open');
      try {
        history.pushState({ mobileOverlay: 'history' }, '', window.location.href);
      } catch (_) {}
    }
  }

  function closeHistory(popHistory = true) {
    if (historyDrawerBackdrop) {
      const wasOpen = historyDrawerBackdrop.classList.contains('open');
      historyDrawerBackdrop.classList.remove('open');
      if (wasOpen && popHistory && history.state && history.state.mobileOverlay === 'history') {
        history.back();
      }
    }
  }

  if (historyToggleBtn) historyToggleBtn.addEventListener('click', openHistory);
  if (closeHistoryBtn) closeHistoryBtn.addEventListener('click', closeHistory);
  if (historyDrawerBackdrop) {
    historyDrawerBackdrop.addEventListener('click', (e) => {
      if (e.target === historyDrawerBackdrop) closeHistory();
    });
  }

  // --- 5. CATEGORY TABS & VIEW ROUTER ---
  const categoryTabs = document.querySelectorAll('.cat-tab-btn');
  const viewSections = document.querySelectorAll('.view-section');

  function switchView(targetViewId, targetSubSection = null) {
    // Update tab pills
    categoryTabs.forEach(tab => {
      tab.classList.toggle('active', tab.dataset.view === targetViewId);
    });

    // Toggle view sections
    viewSections.forEach(sec => {
      const isMatch = sec.id === `view-${targetViewId}`;
      sec.classList.toggle('active', isMatch);
    });

    // Handle sub-box activation across all categories (do not pre-select when entering category)
    if (targetViewId === 'financial' && window.FinancialCalcs) {
      window.FinancialCalcs.showCalculator(targetSubSection);
    } else if (targetViewId === 'fitness' && window.FitnessCalcs) {
      window.FitnessCalcs.showCalculator(targetSubSection);
    } else if (targetViewId === 'math' && window.MathCalcs) {
      window.MathCalcs.showCalculator(targetSubSection);
    } else if (targetViewId === 'other' && window.OtherCalcs) {
      window.OtherCalcs.showCalculator(targetSubSection);
    } else if (targetViewId === 'standard' && window.stdCalc) {
      if (targetSubSection === 'scientific') {
        window.stdCalc.setScientificMode(true);
      }
    }

    // Scroll to top or sub-section
    if (targetSubSection) {
      setTimeout(() => {
        const subEl = document.getElementById(targetSubSection);
        if (subEl) {
          subEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          subEl.classList.remove('highlight-pulse');
          void subEl.offsetWidth;
          subEl.classList.add('highlight-pulse');
          setTimeout(() => subEl.classList.remove('highlight-pulse'), 2100);
        }
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const view = tab.dataset.view;
      switchView(view);
    });
  });

  // Global launcher handler for card clicks
  window.navigateToCalc = function (category, calcId) {
    if (category === 'all') category = 'standard';
    switchView(category, calcId);
  };

  // --- COMPREHENSIVE SYNONYMS & RELATED KEYWORDS DICTIONARY ---
  const SYNONYM_MAP = {
    // Vehicles & Auto
    'car': ['auto loan', 'auto lease', 'car loan', 'auto financing', 'vehicle', 'automobile', 'gas mileage', 'fuel cost', 'horsepower', 'auto rebate', 'auto'],
    'cars': ['auto loan', 'auto lease', 'car loan', 'vehicle', 'automobile', 'car', 'auto'],
    'vehicle': ['auto loan', 'auto lease', 'car loan', 'automobile', 'gas mileage', 'fuel cost', 'car', 'auto'],
    'vehicles': ['auto loan', 'auto lease', 'car loan', 'automobile', 'car', 'auto'],
    'auto': ['auto loan', 'auto lease', 'car loan', 'vehicle', 'automobile', 'car', 'auto rebate'],
    'bike': ['bicycle', 'cycling', 'speed', 'distance', 'pace', 'calories burned'],
    'fuel': ['gas', 'gasoline', 'petrol', 'diesel', 'mileage', 'mpg', 'fuel cost'],
    'gas': ['fuel', 'petrol', 'gasoline', 'mileage', 'mpg', 'fuel cost'],
    'mileage': ['gas', 'fuel', 'mpg', 'distance', 'speed', 'commute'],
    'horsepower': ['hp', 'engine', 'power', 'torque', 'watts', 'vehicle'],

    // Real Estate & Homes
    'home': ['mortgage', 'house', 'property', 'flat', 'realty', 'rent vs buy', 'refinance', 'down payment', 'amortization', 'real estate'],
    'house': ['home', 'mortgage', 'property', 'flat', 'realty', 'rent vs buy', 'refinance', 'down payment'],
    'flat': ['home', 'house', 'apartment', 'rent', 'mortgage'],
    'property': ['mortgage', 'home', 'real estate', 'depreciation', 'rent', 'refinance', 'tax'],
    'rent': ['rent vs buy', 'lease', 'rental', 'landlord', 'tenant'],
    'mortgage': ['home loan', 'house loan', 'amortization', 'pmi', 'property tax', 'refinance'],

    // Loans, Debt & Banking
    'loan': ['emi', 'borrow', 'lending', 'debt', 'mortgage', 'personal loan', 'student loan', 'interest', 'amortization'],
    'loans': ['loan', 'emi', 'borrow', 'debt', 'mortgage'],
    'emi': ['loan', 'monthly payment', 'installment', 'debt', 'interest', 'borrow'],
    'debt': ['payoff', 'snowball', 'avalanche', 'credit card', 'loan', 'emi', 'borrow'],
    'borrow': ['loan', 'emi', 'debt', 'credit', 'interest'],
    'credit': ['credit card', 'payoff', 'score', 'debt', 'interest', 'apr'],
    'interest': ['simple interest', 'compound interest', 'apr', 'apy', 'fd', 'rd', 'return'],
    'fd': ['fixed deposit', 'certificate of deposit', 'cd', 'compound interest', 'savings'],
    'rd': ['recurring deposit', 'sip', 'savings', 'interest'],
    'sip': ['mutual fund', 'systematic investment', 'compound interest', 'wealth', 'invest'],
    'invest': ['investment', 'roi', 'stocks', 'crypto', 'return', 'wealth', 'sip', '401k'],
    'investment': ['invest', 'roi', 'stocks', 'crypto', 'return', 'wealth', 'sip', '401k', 'roth ira'],

    // Taxes & Salary
    'tax': ['sales tax', 'income tax', 'vat', 'gst', 'paycheck', 'salary', 'bracket', 'deduction'],
    'taxes': ['tax', 'sales tax', 'income tax', 'vat', 'gst', 'paycheck'],
    'salary': ['income', 'paycheck', 'wages', 'hourly', 'pay', 'net pay', 'take home'],
    'wages': ['salary', 'hourly', 'paycheck', 'income', 'overtime'],
    'income': ['salary', 'paycheck', 'wages', 'earnings', 'tax'],
    'pay': ['salary', 'paycheck', 'wage', 'hourly', 'overtime'],
    'vat': ['sales tax', 'goods and services', 'gst', 'tax'],
    'gst': ['sales tax', 'vat', 'tax', 'duty'],

    // Diet, Fitness & Health
    'diet': ['calorie', 'deficit', 'macro', 'protein', 'carb', 'fat', 'nutrition', 'meal', 'tdee', 'bmr', 'weight loss'],
    'food': ['diet', 'calorie', 'macro', 'protein', 'nutrition', 'meal'],
    'nutrition': ['macro', 'protein', 'carb', 'fat', 'calorie', 'diet'],
    'gym': ['workout', 'one rep max', '1rm', 'exercise', 'muscle', 'strength', 'bench press', 'squat', 'deadlift', 'heart rate'],
    'workout': ['gym', 'exercise', 'calories burned', 'one rep max', 'heart rate', 'cardio', 'strength'],
    'exercise': ['workout', 'calories burned', 'met', 'running', 'cycling', 'gym', 'cardio'],
    'muscle': ['lean body mass', 'lbm', 'one rep max', 'protein', 'strength', 'muscle mass'],
    'weight': ['body mass index', 'bmi', 'ideal weight', 'healthy weight', 'weight loss', 'calorie deficit', 'body fat'],
    'bmi': ['body mass index', 'bmi calculator', 'bmi gauge', 'ideal weight', 'healthy weight', 'obesity'],
    'fat': ['body fat', 'army body fat', 'skin fold', 'bmi', 'lean body mass', 'weight loss', 'calorie'],
    'baby': ['pregnancy', 'due date', 'conception', 'ovulation', 'period', 'fetal', 'trimester', 'child'],
    'pregnant': ['pregnancy', 'due date', 'conception', 'ovulation', 'period', 'gestational'],
    'pregnancy': ['baby', 'due date', 'conception', 'ovulation', 'period', 'trimester', 'fertility'],
    'delivery': ['pregnancy due date', 'edd', 'birth', 'baby', 'conception'],
    'heart': ['heart rate', 'target heart rate', 'thr', 'pulse', 'bpm', 'cardio'],
    'cardio': ['running', 'pace', 'marathon', 'target heart rate', 'calories burned', 'cycling'],
    'run': ['running', 'pace', '5k', '10k', 'marathon', 'half marathon', 'speed', 'calories burned'],
    'running': ['pace', 'marathon', '5k', 'speed', 'run', 'calories burned'],

    // Math & Tools
    'percentage': ['percent', 'pct', 'ratio', 'fraction', 'discount', 'markup'],
    'percent': ['percentage', 'pct', 'ratio', 'fraction', 'discount'],
    'fraction': ['fractions', 'reducer', 'numerator', 'denominator', 'decimal', 'ratio', 'math'],
    'fractions': ['fraction', 'reducer', 'numerator', 'denominator', 'decimal'],
    'equation': ['quadratic', 'algebra', 'roots', 'parabola', 'solver'],
    'average': ['mean', 'median', 'mode', 'statistics', 'stats', 'data'],
    'stats': ['statistics', 'mean', 'median', 'mode', 'standard deviation', 'variance'],
    'probability': ['dice', 'coin flip', 'random', 'odds', 'lottery'],
    'dice': ['dice roller', 'random number', 'probability', 'roll', 'd6', 'd20'],
    'coin': ['coin flipper', 'heads tails', 'random', 'flip', 'probability'],
    'random': ['random number generator', 'rng', 'dice', 'coin flip', 'lottery', 'picker'],

    // Everyday Utilities
    'time': ['time duration', 'hours', 'minutes', 'time card', 'work hours', 'clock'],
    'hours': ['time duration', 'time card', 'work hours', 'hourly', 'paycheck'],
    'clock': ['time duration', 'world clock', 'stopwatch', 'timer', 'time zone'],
    'date': ['date difference', 'age calculator', 'calendar', 'countdown', 'days between'],
    'age': ['age calculator', 'age difference', 'birthday', 'date difference', 'chronological age', 'how old', 'days lived', 'birth date'],
    'birthday': ['age', 'age calculator', 'date difference', 'countdown', 'birth date'],
    'unit': ['unit converter', 'conversion', 'metric', 'imperial', 'length', 'weight', 'temperature'],
    'units': ['unit converter', 'conversion', 'metric', 'imperial'],
    'convert': ['converter', 'conversion', 'unit', 'currency', 'metric'],
    'conversion': ['unit converter', 'currency converter', 'convert', 'metric', 'imperial'],
    'temp': ['temperature', 'celsius', 'fahrenheit', 'kelvin', 'weather'],
    'temperature': ['celsius', 'fahrenheit', 'kelvin', 'weather', 'wind chill', 'heat index'],
    'weather': ['wind chill', 'heat index', 'dew point', 'humidity', 'temperature'],
    'speed': ['distance', 'time', 'pace', 'mph', 'kmh', 'velocity'],
    'love': ['love calculator', 'flames', 'crush', 'romance', 'relationship', 'compatibility'],
    'grade': ['gpa', 'grade calculator', 'college', 'school', 'marks', 'score', 'percentage'],
    'grades': ['gpa', 'grade calculator', 'college', 'school', 'marks'],
    'gpa': ['grade point average', 'college gpa', 'high school', 'grades', 'semester', 'cumulative'],
    'tip': ['tip calculator', 'gratuity', 'restaurant', 'bill split', 'dining'],
    'bill': ['bill split', 'tip calculator', 'split bill', 'dining', 'friends', 'expense'],
    'crypto': ['cryptocurrency', 'bitcoin', 'btc', 'ethereum', 'eth', 'profit', 'roi', 'coin'],
    'discount': ['sale', 'discount calculator', 'coupon', 'savings', 'percentage off'],
    'dog': ['dog age', 'puppy', 'pet', 'cat age'],
    'cat': ['cat age', 'kitten', 'pet', 'dog age']
  };

  function getSearchTerms(word) {
    if (!word) return [];
    const list = [word];
    if (word.endsWith('s') && word.length > 3) {
      list.push(word.slice(0, -1));
    }
    if (word.endsWith('es') && word.length > 4) {
      list.push(word.slice(0, -2));
    }
    const syns = SYNONYM_MAP[word];
    if (syns && Array.isArray(syns)) {
      syns.forEach(s => {
        if (!list.includes(s)) list.push(s);
      });
    }
    return list;
  }

  function matchesTerm(text, term) {
    if (!text || !term) return false;
    const cleanTerm = term.trim();
    if (!cleanTerm) return false;
    const escaped = cleanTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // Prefix match at word boundary: word starts with the term (e.g. 'ag' matches 'Age', 'lo' matches 'Loan')
    const regex = new RegExp(`(^|[^a-z0-9])${escaped}`, 'i');
    return regex.test(text);
  }

  // --- FILEZENITH SUITE DETAIL SIDEBAR SEARCH FILTER ---
  function normalizeSearchText(str) {
    if (!str) return '';
    return str
      .toLowerCase()
      .replace(/&amp;/g, ' and ')
      .replace(/&/g, ' and ')
      .replace(/[+]/g, ' and ')
      .replace(/[\/\-_]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  // Helper to escape regex special characters
  function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // Master Calculator Registry for instant search across all 185+ calculators
  window.getAllCalculatorsRegistry = function () {
    if (window._allCalculatorsMasterCache) {
      return window._allCalculatorsMasterCache;
    }

    const reg = (window.CALC_REGISTRY || window.AppRouter?.registry || []).map(r => {
      let rawCat = r.cat || 'other';
      let effectiveCat = rawCat;
      if (effectiveCat === 'utility' || effectiveCat === 'internet') effectiveCat = 'other';

      let catLabel = 'Daily Utilities';
      let catBadge = 'other';
      if (effectiveCat === 'financial') { catLabel = 'Finance'; catBadge = 'finance'; }
      else if (effectiveCat === 'fitness') { catLabel = 'Health & Fitness'; catBadge = 'fitness'; }
      else if (effectiveCat === 'math') { catLabel = 'Math'; catBadge = 'math'; }
      else if (effectiveCat === 'standard') { catLabel = 'Standard'; catBadge = 'finance'; }

      return {
        id: r.id,
        title: r.title,
        category: effectiveCat,
        categoryLabel: catLabel,
        categoryBadge: catBadge,
        slug: r.slug || '',
        aliases: (r.aliases || []).slice(),
        keywords: ''
      };
    });

    // Enrich with keywords from DOM cards if available
    try {
      document.querySelectorAll('.zenith-card, .feature-big-box, .compact-calc-link').forEach(el => {
        let targetId = el.getAttribute('data-calc-id');
        if (!targetId) {
          const oc = el.getAttribute('onclick') || '';
          const m = oc.match(/'([^']+)'/g);
          if (m && m.length >= 2) targetId = m[1].replace(/'/g, '');
        }
        if (!targetId) return;
        const kw = el.getAttribute('data-keywords') || '';
        const entry = reg.find(c => c.id === targetId);
        if (entry && kw) {
          entry.keywords = (entry.keywords + ' ' + kw).trim();
        }
      });
    } catch (e) {}

    window._allCalculatorsMasterCache = reg;
    return reg;
  };

  // Helper to highlight matching characters in title
  function highlightMatches(text, query) {
    if (!query) return text;
    const cleanQ = query.trim();
    const regex = new RegExp(`(${escapeRegExp(cleanQ)})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }

  // --- 185+ ALL CALCULATORS DOWNWARD AUTO-SUGGESTIONS & SWITCHER ENGINE ---
  window.filterDetailSwitcher = function (suitePrefix, rawQuery) {
    const query = normalizeSearchText(rawQuery);
    const clearBtn = document.getElementById(`${suitePrefix}-detail-search-clear`);
    if (clearBtn) {
      clearBtn.style.display = query ? 'flex' : 'none';
    }

    const suggestionsEl = document.getElementById(`${suitePrefix}-detail-suggestions`);
    const allCalculators = window.getAllCalculatorsRegistry();
    const words = query ? query.split(/\s+/).filter(Boolean) : [];

    // If query is empty, close suggestions dropdown and restore switch tab pills
    if (!query) {
      if (suggestionsEl) {
        suggestionsEl.innerHTML = '';
        suggestionsEl.classList.remove('active');
        suggestionsEl.style.display = 'none';
      }

      // Restore all pills
      document.querySelectorAll(`#${suitePrefix}-detail-view .switcher-pill`).forEach(pill => {
        pill.classList.remove('switcher-pill-hidden');
        pill.style.removeProperty('display');
        pill.removeAttribute('hidden');
      });

      // Restore all category headers
      document.querySelectorAll(`#${suitePrefix}-detail-view .sidebar-category-header-pill`).forEach(hdr => {
        hdr.classList.remove('switcher-pill-hidden');
        hdr.style.removeProperty('display');
        hdr.removeAttribute('hidden');
      });

      const noMatchMsg = document.getElementById(`${suitePrefix}-switcher-no-match`);
      if (noMatchMsg) noMatchMsg.style.display = 'none';
      return;
    }

    // High-precision priority scoring across all 185+ calculators
    const scoredList = [];
    allCalculators.forEach(calc => {
      const title = normalizeSearchText(calc.title || '');
      const id = normalizeSearchText(calc.id || '');
      const slug = normalizeSearchText(calc.slug || '');
      const aliases = (calc.aliases || []).map(a => normalizeSearchText(a));
      const keywords = normalizeSearchText(calc.keywords || '');
      const q = query;

      let score = 0;

      // 1. Exact match in title (top priority)
      if (title === q) {
        score += 100000;
      }
      // 2. Title starts with query (e.g. "age" -> "Age Calculator")
      else if (title.startsWith(q)) {
        score += 80000;
      }
      // 3. Word in title starts with query (e.g. "loan" -> "Auto Loan")
      else if (new RegExp('\\b' + escapeRegExp(q), 'i').test(title)) {
        score += 50000;
      }
      // 4. Exact match in alias or slug
      else if (aliases.includes(q) || slug === q) {
        score += 45000;
      }
      // 5. Alias starts with query
      else if (aliases.some(a => a.startsWith(q))) {
        score += 35000;
      }
      // 6. Word in alias starts with query
      else if (aliases.some(a => new RegExp('\\b' + escapeRegExp(q), 'i').test(a))) {
        score += 25000;
      }
      // 7. Multi-word all match in title or aliases
      else if (words.length > 1 && words.every(w => title.includes(w) || aliases.some(a => a.includes(w)))) {
        score += 20000;
      }
      // 8. Keyword word boundary match
      else if (new RegExp('\\b' + escapeRegExp(q), 'i').test(keywords)) {
        score += 15000;
      }
      // 9. Substring match inside title (e.g. "mortgage" matching "age")
      else if (title.includes(q)) {
        score += 3000;
      }
      // 10. Substring match inside keywords or aliases
      else if (keywords.includes(q) || aliases.some(a => a.includes(q))) {
        score += 1000;
      }

      if (score > 0) {
        scoredList.push({ calc, score });
      }
    });

    // Sort descending by relevance score (highest priority first)
    scoredList.sort((a, b) => b.score - a.score);

    // --- RENDER DOWNWARD AUTO-SUGGESTIONS DROPDOWN (MOBILE ONLY) ---
    const isMobile = window.innerWidth <= 820;

    if (suggestionsEl) {
      // On PC / Laptop, NEVER show the popup suggestions dropdown
      if (!isMobile) {
        suggestionsEl.innerHTML = '';
        suggestionsEl.classList.remove('active');
        suggestionsEl.style.display = 'none';
      } else {
        // On Mobile, show downward suggestions box
        if (scoredList.length === 0) {
          suggestionsEl.innerHTML = `
            <div class="detail-suggestion-empty">
              No calculators matching "<strong>${rawQuery.trim()}</strong>"
            </div>
          `;
          suggestionsEl.classList.add('active');
          suggestionsEl.style.display = 'flex';
        } else {
          const topMatches = scoredList.slice(0, 9);
          let itemsHtml = '';
          topMatches.forEach(({ calc }, index) => {
            const highlightedTitle = highlightMatches(calc.title, rawQuery);
            itemsHtml += `
              <div class="detail-suggestion-item ${index === 0 ? 'selected' : ''}" 
                   data-category="${calc.category}" 
                   data-target="${calc.id}" 
                   onclick="window.selectDetailSuggestion('${calc.category}', '${calc.id}', '${suitePrefix}')"
                   role="option">
                <div class="suggestion-left">
                  <div class="suggestion-title-row">
                    <span class="suggestion-title">${highlightedTitle}</span>
                    <span class="suggestion-category-badge category-badge-${calc.categoryBadge}">${calc.categoryLabel}</span>
                  </div>
                </div>
                <span class="suggestion-arrow">→</span>
              </div>
            `;
          });

          itemsHtml += `
            <div class="detail-suggestion-hint">
              <span>Showing top ${topMatches.length} of ${scoredList.length} calculators across all suites</span>
              <span>Tap to open</span>
            </div>
          `;

          suggestionsEl.innerHTML = itemsHtml;
          suggestionsEl.classList.add('active');
          suggestionsEl.style.display = 'flex';
        }
      }
    }

    // --- SYNCHRONIZE SWITCH TAB PILLS BELOW SEARCH BAR ---
    const matchingIds = new Set(scoredList.map(item => item.calc.id));
    const matchingCategories = new Set(scoredList.map(item => item.calc.category));
    let visibleCount = 0;

    const pills = document.querySelectorAll(`#${suitePrefix}-detail-view .switcher-pill`);
    pills.forEach(pill => {
      const targetId = pill.getAttribute('data-target');
      const isMatch = matchingIds.has(targetId);
      if (isMatch) {
        pill.classList.remove('switcher-pill-hidden');
        pill.style.removeProperty('display');
        pill.removeAttribute('hidden');
        visibleCount++;
      } else {
        pill.classList.add('switcher-pill-hidden');
        pill.style.setProperty('display', 'none', 'important');
        pill.setAttribute('hidden', 'true');
      }
    });

    // Update category headers in the switch tab
    const headers = document.querySelectorAll(`#${suitePrefix}-detail-view .sidebar-category-header-pill`);
    headers.forEach(hdr => {
      const cat = hdr.getAttribute('data-category');
      const showHeader = matchingCategories.has(cat);
      if (showHeader) {
        hdr.classList.remove('switcher-pill-hidden');
        hdr.style.removeProperty('display');
        hdr.removeAttribute('hidden');
      } else {
        hdr.classList.add('switcher-pill-hidden');
        hdr.style.setProperty('display', 'none', 'important');
        hdr.setAttribute('hidden', 'true');
      }
    });

    const noMatchMsg = document.getElementById(`${suitePrefix}-switcher-no-match`);
    if (noMatchMsg) {
      noMatchMsg.style.display = (visibleCount === 0 && query) ? 'block' : 'none';
    }
  };

  // Click handler for suggestion item
  window.selectDetailSuggestion = function (category, calcId, suitePrefix) {
    const input = document.getElementById(`${suitePrefix}-detail-search`);
    if (input) input.value = '';

    const suggestionsEl = document.getElementById(`${suitePrefix}-detail-suggestions`);
    if (suggestionsEl) {
      suggestionsEl.innerHTML = '';
      suggestionsEl.classList.remove('active');
      suggestionsEl.style.display = 'none';
    }

    const clearBtn = document.getElementById(`${suitePrefix}-detail-search-clear`);
    if (clearBtn) clearBtn.style.display = 'none';

    window.filterDetailSwitcher(suitePrefix, '');

    if (window.openZenithCalc) {
      window.openZenithCalc(category, calcId);
    }
  };

  // Keyboard navigation & click-outside listeners for detail search
  document.addEventListener('keydown', function (e) {
    const activeInput = document.activeElement;
    if (!activeInput || !activeInput.classList.contains('detail-sidebar-search-input')) return;

    const wrap = activeInput.closest('.detail-sidebar-search-wrap');
    if (!wrap) return;
    const suggEl = wrap.querySelector('.detail-search-suggestions');
    if (!suggEl || suggEl.style.display === 'none') return;

    const items = Array.from(suggEl.querySelectorAll('.detail-suggestion-item'));
    if (items.length === 0) return;

    const currentIndex = items.findIndex(item => item.classList.contains('selected'));

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % items.length;
      items.forEach(item => item.classList.remove('selected'));
      items[nextIndex].classList.add('selected');
      items[nextIndex].scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (currentIndex - 1 + items.length) % items.length;
      items.forEach(item => item.classList.remove('selected'));
      items[prevIndex].classList.add('selected');
      items[prevIndex].scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const selected = items[currentIndex >= 0 ? currentIndex : 0];
      if (selected) selected.click();
    } else if (e.key === 'Escape') {
      suggEl.style.display = 'none';
    }
  });

  // Re-open suggestions when clicking or focusing an input that already has text
  document.addEventListener('focusin', function (e) {
    if (e.target && e.target.classList.contains('detail-sidebar-search-input')) {
      const id = e.target.id || '';
      const prefix = id.split('-')[0];
      if (prefix && e.target.value.trim()) {
        window.filterDetailSwitcher(prefix, e.target.value);
      }
    }
  });

  // Close suggestions when clicking outside
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.detail-sidebar-search-wrap')) {
      document.querySelectorAll('.detail-search-suggestions').forEach(sugg => {
        sugg.style.display = 'none';
      });
    }
  });

  window.clearDetailSearch = function (suitePrefix) {
    const input = document.getElementById(`${suitePrefix}-detail-search`);
    if (input) {
      input.value = '';
      window.filterDetailSwitcher(suitePrefix, '');
      input.focus();
    }
  };

  // --- UNIFIED LEFT SIDEBAR CALCULATOR SWITCHER CLICK HANDLER ---
  document.addEventListener('click', function (e) {
    const pill = e.target.closest('.calc-detail-sidebar .switcher-pill');
    if (!pill) return;
    const cat = pill.getAttribute('data-category');
    const target = pill.getAttribute('data-target');
    if (cat && target && window.openZenithCalc) {
      e.preventDefault();
      e.stopImmediatePropagation();
      window.openZenithCalc(cat, target);
    }
  }, true);

  // --- FILEZENITH ACTIVE CALCULATOR TITLE SYNCHRONIZER ---
  window.updateActiveCalculatorTitle = function (suitePrefix, calcId) {
    const titleEl = document.getElementById(`${suitePrefix}-active-calc-title`);
    if (!titleEl) return;

    let title = '';
    const panel = document.getElementById(calcId);
    if (panel) {
      const heading = panel.querySelector('.panel-title-group h2, .section-heading, .panel-title, h2');
      if (heading) {
        title = heading.textContent.trim();
      }
    }

    if (!title) {
      const pill = document.querySelector(`#${suitePrefix}-detail-view .switcher-pill[data-target="${calcId}"]`);
      if (pill) {
        title = pill.textContent.trim();
      }
    }

    if (!title && window.ZenithTitles && window.ZenithTitles[calcId]) {
      title = window.ZenithTitles[calcId];
    }

    if (!title) {
      title = calcId.replace(/^sec-/, '').replace(/-calc$/, '').replace(/-/g, ' ').replace(/\w/g, c => c.toUpperCase());
    }

    titleEl.textContent = title;
  };

  // --- FILEZENITH MOBILE-FRIENDLY SMOOTH SCROLL HELPER ---
  window.scrollToActiveCalculator = function (suitePrefix) {
    setTimeout(function () {
      var detailView = document.getElementById(suitePrefix + '-detail-view');
      if (detailView && detailView.style.display !== 'none') {
        var headerCard = detailView.querySelector('.calc-detail-header-card') || detailView;
        var headerEl = document.querySelector('.app-header');
        var headerHeight = headerEl ? headerEl.offsetHeight : 64;
        var rect = headerCard.getBoundingClientRect();
        var topOffset = rect.top + (window.pageYOffset || document.documentElement.scrollTop) - headerHeight - 12;
        window.scrollTo({ top: Math.max(0, topOffset), behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 40);
  };

  // --- FILEZENITH ROUTING & FILTERING SYSTEM ---
  window.openZenithCalc = function (category, calcId) {
    if (typeof window.normalizeSuiteKey === 'function') {
      category = window.normalizeSuiteKey(category);
    } else {
      if (category === 'utility' || category === 'utilities' || category === 'internet' || category === 'everyday' || category === 'weather' || category === 'transportation' || category === 'entertainment') category = 'other';
      if (category === 'finance') category = 'financial';
      if (category === 'health') category = 'fitness';
    }
    // Clear and close any open detail search suggestions dropdowns
    ['fin', 'fit', 'math', 'other'].forEach(p => {
      const inp = document.getElementById(`${p}-detail-search`);
      if (inp) inp.value = '';
      const sugg = document.getElementById(`${p}-detail-suggestions`);
      if (sugg) { sugg.innerHTML = ''; sugg.style.display = 'none'; }
      const clr = document.getElementById(`${p}-detail-search-clear`);
      if (clr) clr.style.display = 'none';
    });

    // Hide all view sections
    document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
    // Activate target view section
    const targetSection = document.getElementById(`view-${category}`);
    if (targetSection) {
      targetSection.classList.add('active');
    }

    // Sync ribbon nav button
    document.querySelectorAll('.zenith-nav-dropdown').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('onclick')?.includes(`'${category}'`));
    });

    // Call sub-engine calculator activator
    if (category === 'financial' && window.FinancialCalcs) {
      window.FinancialCalcs.showCalculator(calcId);
    } else if (category === 'fitness' && window.FitnessCalcs) {
      window.FitnessCalcs.showCalculator(calcId);
    } else if (category === 'math' && window.MathCalcs) {
      window.MathCalcs.showCalculator(calcId);
    } else if (category === 'other' && window.OtherCalcs) {
      window.OtherCalcs.showCalculator(calcId);
    } else if (category === 'standard' && window.stdCalc) {
      if (calcId === 'box-sci-mode') {
        window.stdCalc.setScientificMode(true);
      } else {
        window.stdCalc.setScientificMode(false);
      }
    }

    const suiteMap = { financial: 'fin', fitness: 'fit', math: 'math', other: 'other' };
    if (suiteMap[category] && window.updateActiveCalculatorTitle) {
      window.updateActiveCalculatorTitle(suiteMap[category], calcId);
    }

    if (window.AppRouter && !window.AppRouter.isDispatching) {
      window.AppRouter.onCalculatorOpened(calcId, category);
    }

    if (suiteMap[category] && window.scrollToActiveCalculator) {
      window.scrollToActiveCalculator(suiteMap[category]);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  window.backToZenithHub = function () {
    document.querySelectorAll('.view-section').forEach(sec => {
      sec.classList.toggle('active', sec.id === 'view-zenith-hub');
    });
    document.querySelectorAll('.zenith-nav-dropdown').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('onclick')?.includes("'all'"));
    });
    if (window.AppRouter && !window.AppRouter.isDispatching) {
      window.AppRouter.onHubOpened();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.navigateToTab = function (tabKey, btnEl) {
    const navKey = typeof window.normalizeSuiteKey === 'function' ? window.normalizeSuiteKey(tabKey) : (
      (tabKey === 'zenith-hub' || tabKey === 'all') ? 'all' :
      (tabKey === 'finance' || tabKey === 'financial') ? 'financial' :
      (tabKey === 'health' || tabKey === 'fitness') ? 'fitness' :
      (tabKey === 'math' || tabKey === 'mathematics') ? 'math' :
      (tabKey === 'utility' || tabKey === 'utilities' || tabKey === 'other' || tabKey === 'everyday' || tabKey === 'internet' || tabKey === 'weather' || tabKey === 'transportation' || tabKey === 'entertainment') ? 'other' :
      (tabKey === 'scientific' || tabKey === 'standard') ? 'standard' : tabKey
    );

    // Update active state on upper ribbon navigation buttons
    document.querySelectorAll('.zenith-nav-dropdown').forEach(btn => {
      const match = (btnEl && btn === btnEl) || (!btnEl && (
        btn.getAttribute('onclick')?.includes(`'${navKey}'`) ||
        (navKey === 'financial' && btn.getAttribute('onclick')?.includes("'finance'")) ||
        (navKey === 'all' && btn.getAttribute('onclick')?.includes("'all'"))
      ));
      btn.classList.toggle('active', !!match);
    });

    if (navKey === 'all') {
      document.querySelectorAll('.view-section').forEach(sec => {
        sec.classList.toggle('active', sec.id === 'view-zenith-hub');
      });
      if (typeof window.filterZenith === 'function') {
        window.filterZenith('all');
      }
      if (window.AppRouter && !window.AppRouter.isDispatching) {
        window.AppRouter.onHubOpened();
      }
    } else {
      document.querySelectorAll('.view-section').forEach(sec => {
        sec.classList.toggle('active', sec.id === `view-${navKey}`);
      });
      if (navKey === 'financial' && window.FinancialCalcs) {
        window.FinancialCalcs.showCatalog();
      } else if (navKey === 'fitness' && window.FitnessCalcs) {
        window.FitnessCalcs.showCatalog();
      } else if (navKey === 'math' && window.MathCalcs) {
        window.MathCalcs.showCatalog();
      } else if (navKey === 'other' && window.OtherCalcs) {
        window.OtherCalcs.showCatalog();
      } else if (navKey === 'standard' && window.stdCalc) {
        window.stdCalc.setScientificMode(true);
      }
      if (window.AppRouter && !window.AppRouter.isDispatching) {
        window.AppRouter.onCatalogOpened(navKey);
      }
    }
    // Sync mobile hamburger menu active highlights
    document.querySelectorAll('.mobile-nav-item').forEach(item => {
      const itemTab = item.getAttribute('data-tab');
      const isMatch = (itemTab === 'zenith-hub' && navKey === 'all') ||
                      (itemTab === 'finance' && navKey === 'financial') ||
                      (itemTab === 'fitness' && navKey === 'fitness') ||
                      (itemTab === 'math' && navKey === 'math') ||
                      (itemTab === 'other' && navKey === 'other') ||
                      (itemTab === navKey);
      item.classList.toggle('active', !!isMatch);
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- STANDALONE PAGES (Privacy, About, Contact, Terms, etc.) ---
  window.navigateToPage = function (pageKey, pushHistory = true) {
    const pageMeta = {
      about: { slug: '/about-us', file: 'about-us.html', title: 'About Us & Mission' },
      contact: { slug: '/contact', file: 'contact.html', title: 'Contact & Support' },
      privacy: { slug: '/privacy-policy', file: 'privacy-policy.html', title: 'Privacy Policy' },
      terms: { slug: '/terms-of-service', file: 'terms-of-service.html', title: 'Terms of Service' },
      editorial: { slug: '/editorial-policy', file: 'editorial-policy.html', title: 'Editorial Policy & Standards' },
      affiliate: { slug: '/affiliate-disclosure', file: 'affiliate-disclosure.html', title: 'Affiliate Disclosure' },
      security: { slug: '/security', file: 'security.html', title: 'Security Architecture' }
    };

    const targetId = `view-page-${pageKey}`;
    const targetSection = document.getElementById(targetId);
    if (!targetSection) {
      const info = pageMeta[pageKey];
      if (info && info.file) {
        window.location.href = info.file;
      }
      return;
    }

    // Remember previous calculator view to restore on Back / Close
    const activeSec = document.querySelector('.view-section.active');
    if (activeSec && !activeSec.id.startsWith('view-page-')) {
      window._lastActiveView = activeSec.id;
    }

    // Hide all view-sections, show target standalone page
    document.querySelectorAll('.view-section').forEach(sec => {
      sec.classList.toggle('active', sec.id === targetId);
    });

    // Un-highlight top ribbon tabs & mobile menu items
    document.querySelectorAll('.zenith-nav-dropdown, .cat-tab-btn, .mobile-nav-item').forEach(el => {
      el.classList.remove('active');
    });

    const info = pageMeta[pageKey] || { slug: `/${pageKey}`, title: pageKey.toUpperCase() };

    if (pushHistory && window.AppRouter && !window.AppRouter.isDispatching) {
      try {
        window.AppRouter.setAddressUrl(info.slug, info.title);
      } catch (e) {}
    } else {
      document.title = `${info.title} | CALC• Modern Calculator`;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.backToPreviousView = function () {
    const targetId = window._lastActiveView || 'view-zenith-hub';
    const targetSec = document.getElementById(targetId) || document.getElementById('view-zenith-hub');

    document.querySelectorAll('.view-section').forEach(sec => {
      sec.classList.toggle('active', sec === targetSec);
    });

    // Ensure all calculator cards and sections are visible in Zenith Hub
    document.querySelectorAll('#view-zenith-hub .calc-topic-section').forEach(sec => {
      sec.classList.remove('calc-search-hidden');
      sec.style.display = '';
    });
    document.querySelectorAll('#view-zenith-hub .zenith-card, #view-zenith-hub .compact-calc-link').forEach(el => {
      el.classList.remove('calc-search-hidden');
      el.style.display = '';
    });

    if (targetId === 'view-zenith-hub') {
      document.querySelectorAll('.zenith-nav-dropdown').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('onclick')?.includes("'all'"));
      });
      if (window.AppRouter && !window.AppRouter.isDispatching) {
        window.AppRouter.onHubOpened();
      }
    } else {
      const cat = targetId.replace('view-', '');
      document.querySelectorAll('.zenith-nav-dropdown').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('onclick')?.includes(`'${cat}'`));
      });
      if (window.AppRouter && !window.AppRouter.isDispatching) {
        window.AppRouter.onCatalogOpened(cat);
      }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- MOBILE TOP-RIGHT 3-DASH HAMBURGER MENU HANDLERS ---
  window.toggleMobileNavMenu = function (e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const popover = document.getElementById('mobile-nav-popover');
    if (!popover) return;
    if (popover.classList.contains('open')) {
      window.closeMobileNavMenu(true);
    } else {
      window.openMobileNavMenu();
    }
  };

  window.openMobileNavMenu = function () {
    const popover = document.getElementById('mobile-nav-popover');
    const btn = document.getElementById('mobile-menu-toggle-btn');
    if (!popover) return;

    popover.classList.add('open');
    btn?.classList.add('active');
    btn?.setAttribute('aria-expanded', 'true');

    // Push history state so the phone hardware / gesture Back button closes this menu
    try {
      history.pushState({ mobileOverlay: 'suites-menu' }, '', window.location.href);
    } catch (_) {}

    // Sync active state with currently visible section
    const activeSec = document.querySelector('.view-section.active');
    let activeKey = 'zenith-hub';
    if (activeSec) {
      if (activeSec.id === 'view-financial') activeKey = 'finance';
      else if (activeSec.id === 'view-fitness') activeKey = 'fitness';
      else if (activeSec.id === 'view-math') activeKey = 'math';
      else if (activeSec.id === 'view-other') activeKey = 'other';
      else if (activeSec.id === 'view-standard') activeKey = 'standard';
    }
    document.querySelectorAll('.mobile-nav-item').forEach(item => {
      item.classList.toggle('active', item.getAttribute('data-tab') === activeKey);
    });
  };

  window.closeMobileNavMenu = function (popHistory = true) {
    const popover = document.getElementById('mobile-nav-popover');
    const btn = document.getElementById('mobile-menu-toggle-btn');
    const wasOpen = popover?.classList.contains('open');

    if (popover) popover.classList.remove('open');
    if (btn) {
      btn.classList.remove('active');
      btn.setAttribute('aria-expanded', 'false');
    }

    // If closed via cross button (or code) and history was pushed, pop it cleanly
    if (wasOpen && popHistory && history.state && history.state.mobileOverlay === 'suites-menu') {
      history.back();
    }
  };

  window.handleMobileNavSelect = function (tabKey, btnEl) {
    window.closeMobileNavMenu(false);
    const navKey = typeof window.normalizeSuiteKey === 'function' ? window.normalizeSuiteKey(tabKey) : (
      (tabKey === 'zenith-hub') ? 'all' : (tabKey === 'finance') ? 'financial' : (tabKey === 'health') ? 'fitness' : (tabKey === 'utility' || tabKey === 'utilities') ? 'other' : tabKey
    );
    if (typeof window.navigateToTab === 'function') {
      window.navigateToTab(navKey, btnEl);
    }
  };

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.mobile-menu-anchor-wrap')) {
      window.closeMobileNavMenu(true);
    }
  });

  // Dual dismissal for phone Back button / gesture (Way 1: Cross button, Way 2: Phone Back)
  window.addEventListener('popstate', (e) => {
    const mobileMenu = document.getElementById('mobile-nav-popover');
    if (mobileMenu && mobileMenu.classList.contains('open')) {
      window.closeMobileNavMenu(false); // Closed via phone back, don't call history.back again
    }
    const settingsPop = document.getElementById('settings-popover');
    if (settingsPop && settingsPop.classList.contains('open')) {
      if (typeof toggleSettings === 'function') toggleSettings(true, false);
    }
    const historyBackdrop = document.getElementById('history-drawer-backdrop');
    if (historyBackdrop && historyBackdrop.classList.contains('open')) {
      if (typeof closeHistory === 'function') closeHistory(false);
    }
  });

  window.filterZenith = function (filterKey, btnEl) {
    // Ensure Zenith Hub is the active view
    const hubSec = document.getElementById('view-zenith-hub');
    if (hubSec && !hubSec.classList.contains('active')) {
      document.querySelectorAll('.view-section').forEach(sec => {
        sec.classList.toggle('active', sec.id === 'view-zenith-hub');
      });
    }

    // Update active state on upper ribbon navigation buttons
    const navButtons = document.querySelectorAll('.zenith-nav-dropdown');
    navButtons.forEach(btn => {
      const match = (btnEl && btn === btnEl) || (!btnEl && btn.getAttribute('onclick')?.includes(`'${filterKey}'`));
      btn.classList.toggle('active', !!match);
    });

    // Filter cards
    const cards = document.querySelectorAll('.zenith-card');
    let visibleCount = 0;

    cards.forEach(card => {
      const cat = card.dataset.category || '';
      const sub = card.dataset.sub || '';
      let match = false;
      if (filterKey === 'all') {
        match = true;
      } else if (filterKey === 'pregnancy') {
        match = sub === 'pregnancy';
      } else if (filterKey === 'fitness-only') {
        match = cat === 'fitness' && sub !== 'pregnancy';
      } else {
        match = cat === filterKey || sub === filterKey;
      }
      card.style.display = match ? 'flex' : 'none';
      if (match) visibleCount++;
    });

    // Update section title dynamically based on selected upper ribbon category
    const titleEl = document.getElementById('zenith-section-title');
    const titles = {
      'all': 'All Calculators',
      'financial': 'Financial Calculators',
      'fitness': 'Health & Fitness Calculators',
      'fitness-only': 'Fitness & Workout Calculators',
      'pregnancy': 'Pregnancy & Maternal Calculators',
      'math': 'Math & Algebra Solvers',
      'other': 'Daily Utilities & Tools',
      'standard': 'Standard & Scientific Keypad'
    };
    if (titleEl && titles[filterKey]) {
      titleEl.textContent = titles[filterKey];
    }

    // Update badge counter
    const badge = document.getElementById('zenith-count-badge');
    if (badge) {
      badge.textContent = `${visibleCount} ${visibleCount === 1 ? 'Calculator' : 'Calculators'}`;
    }
  };

  // --- 6. SMART SEARCH SYSTEM (INSTANT CALCULATOR BOXES SUGGESTIONS & PRIORITY RANKING) ---
  const globalSearchInput = document.getElementById('global-search-input');
  const searchShortcut = document.getElementById('search-shortcut');
  const searchSuggestions = document.getElementById('global-search-suggestions');
  const hubSearchSection = document.getElementById('hub-search-results-section');
  const hubSearchGrid = document.getElementById('hub-search-results-grid');
  const hubSearchCompact = document.getElementById('hub-search-results-compact');
  const hubSearchNoResults = document.getElementById('hub-search-no-results');
  const hubSearchTitle = document.getElementById('hub-search-results-title');
  const hubSearchCount = document.getElementById('hub-search-results-count');

  const STOP_WORDS = new Set([
    'calculator', 'calculators', 'calc', 'calcs',
    'tool', 'tools', 'free', 'online', 'app', 'apps',
    'solver', 'solvers', 'software', 'suite', 'helper'
  ]);

  function calculateCardScore(card, rawQuery, rawWords, coreWords) {
    const titleText = card.querySelector('.zenith-card-title')?.textContent?.trim() || '';
    const title = normalizeSearchText(titleText);
    const descText = card.querySelector('.zenith-card-desc')?.textContent?.trim() || '';
    const desc = normalizeSearchText(descText);
    const category = (card.dataset.category || '').toLowerCase();
    const sub = (card.dataset.sub || '').toLowerCase();
    const keywords = normalizeSearchText(card.dataset.keywords || '');

    const searchWords = coreWords.length > 0 ? coreWords : rawWords;

    // Check if card matches core terms
    const isMatch = searchWords.length === 0 || searchWords.every(w => {
      if (matchesTerm(title, w) || matchesTerm(keywords, w) || matchesTerm(sub, w) || matchesTerm(category, w) || matchesTerm(desc, w)) {
        return true;
      }
      const terms = getSearchTerms(w);
      for (let i = 1; i < terms.length; i++) {
        const t = terms[i];
        if (matchesTerm(title, t) || matchesTerm(keywords, t) || matchesTerm(sub, t) || matchesTerm(desc, t)) {
          return true;
        }
      }
      return false;
    });

    if (!isMatch) return -1;

    // Compute priority ranking score
    let score = 0;
    const cleanRaw = normalizeSearchText(rawQuery);

    // Exact title match or title starts with query
    if (title === cleanRaw) {
      score += 50000;
    } else if (title.startsWith(cleanRaw)) {
      score += 30000;
    } else if (matchesTerm(title, cleanRaw)) {
      score += 20000;
    }

    searchWords.forEach(w => {
      // Direct word match in title with word boundary
      if (title.startsWith(w)) {
        score += 18000;
      } else if (matchesTerm(title, w)) {
        score += 12000;
      }

      // Keyword match with word boundary
      if (matchesTerm(keywords, w)) {
        score += 5000;
      }

      // Subcategory match
      if (matchesTerm(sub, w)) {
        score += 3000;
      }

      // Category match
      if (matchesTerm(category, w)) {
        score += 1500;
      }

      // Synonyms match in title or keywords
      const terms = getSearchTerms(w);
      for (let i = 1; i < terms.length; i++) {
        const syn = terms[i];
        if (matchesTerm(title, syn)) score += 3500;
        else if (matchesTerm(keywords, syn)) score += 2500;
        else if (matchesTerm(sub, syn)) score += 1800;
        else if (matchesTerm(desc, syn)) score += 500;
      }

      // Description match
      if (matchesTerm(desc, w)) {
        score += 300;
      }
    });

    return score;
  }

  if (globalSearchInput) {
    globalSearchInput.addEventListener('input', (e) => {
      const rawVal = e.target.value;
      const query = typeof normalizeSearchText === 'function' ? normalizeSearchText(rawVal) : rawVal.toLowerCase().trim();
      const rawWords = query ? query.split(/\s+/).filter(Boolean) : [];
      const coreWords = rawWords.filter(w => !STOP_WORDS.has(w));

      // Ensure dropdown popup is completely hidden - calculator boxes below are the suggestions
      if (searchSuggestions) {
        searchSuggestions.innerHTML = '';
        searchSuggestions.style.display = 'none';
      }

      // Automatically route to zenith-hub if searching
      const hubSec = document.getElementById('view-zenith-hub');
      if (hubSec && !hubSec.classList.contains('active')) {
        document.querySelectorAll('.view-section').forEach(sec => {
          sec.classList.toggle('active', sec.id === 'view-zenith-hub');
        });
        document.querySelectorAll('.zenith-nav-dropdown').forEach(btn => {
          btn.classList.toggle('active', btn.getAttribute('onclick')?.includes("'all'"));
        });
      }

      const standardSections = document.querySelectorAll('#view-zenith-hub .calc-topic-section:not(#hub-search-results-section)');

      if (!query) {
        // Query cleared: restore pristine standard view
        if (hubSearchSection) hubSearchSection.style.display = 'none';
        if (hubSearchGrid) hubSearchGrid.innerHTML = '';
        if (hubSearchCompact) hubSearchCompact.innerHTML = '';
        if (hubSearchNoResults) hubSearchNoResults.style.display = 'none';

        standardSections.forEach(sec => {
          sec.classList.remove('calc-search-hidden');
          sec.style.display = '';
        });

        document.querySelectorAll('#view-zenith-hub .zenith-card, #view-zenith-hub .compact-calc-link, .calc-directory-sidebar .sidebar-calc-item').forEach(el => {
          el.classList.remove('calc-search-hidden');
          el.style.display = '';
        });

        const badge = document.getElementById('zenith-count-badge');
        if (badge) badge.textContent = '189 Calculators (70 Financial, 29 Health & Fitness, 29 Math, 55 Daily Utilities, Weather & Transport, 6 Keypads)';
        const hint = document.querySelector('.view-mode-hint');
        if (hint) hint.textContent = 'Organized by suite • 185 calculators';
        return;
      }

      // Hide all standard topic sections
      standardSections.forEach(sec => {
        sec.classList.add('calc-search-hidden');
        sec.style.display = 'none';
      });

      // Get all original cards from standard sections
      const originalCards = [];
      standardSections.forEach(sec => {
        sec.querySelectorAll('.zenith-card').forEach(card => originalCards.push(card));
      });

      // Score and rank cards
      const scored = [];
      originalCards.forEach(card => {
        const score = calculateCardScore(card, rawVal, rawWords, coreWords);
        if (score >= 0) {
          scored.push({ card, score });
        }
      });

      // Sort in descending order of relevance priority (highest score first)
      scored.sort((a, b) => b.score - a.score);

      // If highest score is strong (>= 2000), filter out very weak matches (< 350)
      const topScore = scored.length > 0 ? scored[0].score : 0;
      const matches = topScore >= 2000 ? scored.filter(item => item.score >= 350) : scored;

      // Show search results section
      if (hubSearchSection) hubSearchSection.style.display = '';
      if (hubSearchTitle) hubSearchTitle.textContent = `Search Results for "${rawVal.trim()}"`;
      if (hubSearchCount) hubSearchCount.textContent = `${matches.length} ${matches.length === 1 ? 'Calculator' : 'Calculators'}`;

      if (hubSearchGrid) {
        hubSearchGrid.innerHTML = '';
        matches.forEach(({ card }) => {
          const clone = card.cloneNode(true);
          clone.classList.remove('calc-search-hidden');
          clone.style.display = 'flex';
          hubSearchGrid.appendChild(clone);
        });
      }

      if (hubSearchCompact) {
        hubSearchCompact.innerHTML = '';
        matches.forEach(({ card }) => {
          const onclickAttr = card.getAttribute('onclick') || '';
          const match = onclickAttr.match(/'([^']+)'/g);
          if (match && match.length >= 2) {
            const calcId = match[1].replace(/'/g, '');
            const origLink = document.querySelector(`.calc-topic-section:not(#hub-search-results-section) .compact-calc-link[data-calc-id="${calcId}"]`);
            if (origLink) {
              const clone = origLink.cloneNode(true);
              clone.classList.remove('calc-search-hidden');
              clone.style.display = 'flex';
              hubSearchCompact.appendChild(clone);
            }
          }
        });
      }

      const isListMode = (localStorage.getItem('calcCatalogViewMode') || 'grid') === 'list';
      if (hubSearchGrid) {
        hubSearchGrid.style.setProperty('display', (matches.length === 0 || isListMode) ? 'none' : 'grid', 'important');
      }
      if (hubSearchCompact) {
        hubSearchCompact.style.setProperty('display', (matches.length === 0 || !isListMode) ? 'none' : 'grid', 'important');
      }

      if (hubSearchNoResults) {
        hubSearchNoResults.style.display = matches.length === 0 ? 'block' : 'none';
      }

      // Filter left directory sidebar items on desktop to match search results
      const sidebarItems = document.querySelectorAll('.calc-directory-sidebar .sidebar-calc-item');
      sidebarItems.forEach(item => {
        const calcId = item.dataset.calcId;
        const matched = matches.some(m => (m.card.getAttribute('onclick') || '').includes(calcId));
        item.classList.toggle('calc-search-hidden', !matched);
        item.style.display = matched ? 'flex' : 'none';
      });

      // Update badge and hint
      const badge = document.getElementById('zenith-count-badge');
      if (badge) badge.textContent = `${matches.length} ${matches.length === 1 ? 'Calculator' : 'Calculators'}`;
      const hint = document.querySelector('.view-mode-hint');
      if (hint) hint.textContent = `${matches.length} ${matches.length === 1 ? 'Calculator' : 'Calculators'} found`;
    });

    // Keyboard shortcut '/' or Ctrl+K / Cmd+K to jump to active view search bar
    window.addEventListener('keydown', (e) => {
      const isInput = ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName);
      if ((e.key === '/' || ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')))) {
        if (isInput && (e.key === '/' || document.activeElement.classList.contains('zenith-hero-search-input'))) {
          return;
        }
        e.preventDefault();

        const activeSec = document.querySelector('.view-section.active');
        let target = globalSearchInput;

        if (activeSec) {
          if (activeSec.id === 'view-financial') {
            target = document.getElementById('fin-catalog-search') || globalSearchInput;
          } else if (activeSec.id === 'view-fitness') {
            target = document.getElementById('fit-catalog-search') || globalSearchInput;
          } else if (activeSec.id === 'view-math') {
            target = document.getElementById('math-catalog-search') || globalSearchInput;
          } else if (activeSec.id === 'view-other') {
            target = document.getElementById('other-catalog-search') || globalSearchInput;
          }
        }

        if (target) {
          target.focus();
          target.select();
        }
      } else if (e.key === 'Escape') {
        document.querySelectorAll('.zenith-hero-search-input').forEach(inp => {
          if (document.activeElement === inp) inp.blur();
        });
      }
    });
  }

  // --- 7. FULLSCREEN UTILITY ---
  window.toggleFullscreen = function () {
    if (!document.fullscreenElement) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => { });
      }
      showToast('Entered Fullscreen mode', '🖥️');
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => { });
      }
      showToast('Exited Fullscreen mode', '🪟');
    }
  };

  // --- 8. COPY-TO-CLIPBOARD FOR ALL RESULT VALUES ---
  document.addEventListener('click', (e) => {
    const copyTarget = e.target.closest('[data-copyable="true"]');
    if (copyTarget) {
      const textToCopy = copyTarget.textContent.replace(/[$,\s]/g, '').trim() || copyTarget.textContent.trim();
      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copied "${textToCopy}" to clipboard!`, '📋');
      }).catch(() => {
        showToast('Copied to clipboard!', '📋');
      });
    }
  });

  // --- 9. TACTILE BUTTON RIPPLE & AUDIO FEEDBACK ---
  document.addEventListener('pointerdown', (e) => {
    const btn = e.target.closest('button, .cat-tab-btn, .radio-pill-btn, .fin-selector-card, .selector-box-card, .swap-btn-circular, .calc-card, .key-btn');
    if (!btn) return;

    // Optional audio tone for buttons outside standard calculator
    if (!btn.classList.contains('key-btn') && soundEnabled && window.stdCalc && typeof window.stdCalc.playKeyTone === 'function') {
      window.stdCalc.playKeyTone(720, 'sine', 0.025);
    }

    // Ripple visual animation
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const ripple = document.createElement('span');
    ripple.className = 'btn-ripple-fx';
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    btn.appendChild(ripple);
    setTimeout(() => {
      ripple.remove();
    }, 550);
  });

  // --- 11. SIDEBAR FILTER & VIEW MODE TOGGLE (Grid vs Compact List) ---
  window.setCatalogViewMode = function (mode, btnEl) {
    const validMode = mode === 'list' ? 'list' : 'grid';
    try {
      localStorage.setItem('calcCatalogViewMode', validMode);
    } catch (e) {}

    // 1. Enforce data-catalog-mode attribute globally on root elements
    document.documentElement.setAttribute('data-catalog-mode', validMode);
    if (document.body) {
      document.body.setAttribute('data-catalog-mode', validMode);
    }

    // 2. Synchronize all view-mode toggle buttons across Zenith Hub & all Suite views
    document.querySelectorAll('.view-mode-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.mode === validMode);
    });

    // 3. Explicitly toggle card grids across the entire application
    document.querySelectorAll('.topic-cards-grid, .zenith-tools-grid:not(#hub-search-results-grid), .feature-big-box-grid').forEach(grid => {
      if (grid.id === 'hub-search-results-grid') return;
      if (validMode === 'list') {
        grid.style.setProperty('display', 'none', 'important');
      } else {
        grid.style.setProperty('display', 'grid', 'important');
      }
    });

    // 4. Explicitly toggle compact lists across the entire application
    document.querySelectorAll('.topic-compact-list').forEach(list => {
      if (list.id === 'hub-search-results-compact') return;
      if (validMode === 'list') {
        list.style.setProperty('display', 'grid', 'important');
      } else {
        list.style.setProperty('display', 'none', 'important');
      }
    });

    // 5. Synchronize dynamic search results if currently open on Zenith Hub
    const searchSection = document.getElementById('hub-search-results-section');
    const hubSearchGrid = document.getElementById('hub-search-results-grid');
    const hubSearchCompact = document.getElementById('hub-search-results-compact');
    if (searchSection && searchSection.style.display !== 'none') {
      if (hubSearchGrid) {
        hubSearchGrid.style.setProperty('display', validMode === 'list' ? 'none' : 'grid', 'important');
      }
      if (hubSearchCompact) {
        hubSearchCompact.style.setProperty('display', validMode === 'list' ? 'grid' : 'none', 'important');
      }
    }
  };

  window.filterSidebarList = function (inputEl, category) {
    const rawVal = inputEl.value || '';
    const query = typeof normalizeSearchText === 'function' ? normalizeSearchText(rawVal) : rawVal.trim().toLowerCase();
    const listEl = document.getElementById(`sidebar-list-${category}`);
    if (!listEl) return;

    const words = query ? query.split(/\s+/).filter(Boolean) : [];
    const coreWords = words.filter(w => !STOP_WORDS.has(w));
    const searchWords = coreWords.length > 0 ? coreWords : words;

    const items = listEl.querySelectorAll('.sidebar-calc-item');
    items.forEach(item => {
      if (!query) {
        item.style.display = 'flex';
        return;
      }
      const title = normalizeSearchText(item.textContent || '');
      const keywords = normalizeSearchText(item.dataset.keywords || '');
      const sub = (item.dataset.sub || '').toLowerCase();
      const cat = (item.dataset.category || '').toLowerCase();

      const match = searchWords.every(w => {
        if (matchesTerm(title, w) || matchesTerm(keywords, w) || matchesTerm(sub, w) || matchesTerm(cat, w)) return true;
        const terms = getSearchTerms(w);
        for (let i = 1; i < terms.length; i++) {
          if (matchesTerm(title, terms[i]) || matchesTerm(keywords, terms[i])) return true;
        }
        return false;
      });

      item.style.display = match ? 'flex' : 'none';
    });

    const headers = listEl.querySelectorAll('.sidebar-category-header');
    headers.forEach(h => {
      let next = h.nextElementSibling;
      let hasVisible = false;
      while (next && !next.classList.contains('sidebar-category-header')) {
        if (next.style.display !== 'none') {
          hasVisible = true;
          break;
        }
        next = next.nextElementSibling;
      }
      h.style.display = hasVisible ? 'flex' : 'none';
    });
  };

  // --- 10. INITIALIZE SUB-ENGINES ---
  window.addEventListener('DOMContentLoaded', () => {
    if (window.FinancialCalcs) window.FinancialCalcs.init();
    if (window.FitnessCalcs) window.FitnessCalcs.init();
    if (window.MathCalcs) window.MathCalcs.init();
    if (window.OtherCalcs) window.OtherCalcs.init();
    if (typeof window.filterZenith === 'function') {
      window.filterZenith('all');
    }
    // Initialize AppRouter for direct deep-linking on load
    if (window.AppRouter) {
      window.AppRouter.init();
    }

    // Initialize View Mode (Grid vs Compact List)
    const savedMode = localStorage.getItem('calcCatalogViewMode') || 'grid';
    window.setCatalogViewMode(savedMode);
  });

  // --- 11. COMPANY & LEGAL MODAL CONTROLLER ---
  window.openLegalModal = function (tabKey = 'about') {
    const modal = document.getElementById('legal-modal');
    if (!modal) return;
    window.switchLegalTab(tabKey);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeLegalModal = function () {
    const modal = document.getElementById('legal-modal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  window.switchLegalTab = function (tabKey) {
    const modal = document.getElementById('legal-modal');
    if (!modal) return;

    // Normalizing aliases
    if (tabKey === 'verification') tabKey = 'editorial';
    if (tabKey === 'disclaimer') tabKey = 'terms';
    if (tabKey === 'cookies' || tabKey === 'accessibility') tabKey = 'privacy';

    // Update active tab buttons
    modal.querySelectorAll('.legal-nav-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.tab === tabKey);
    });

    // Update active panes
    modal.querySelectorAll('.legal-tab-pane').forEach(pane => {
      pane.classList.toggle('active', pane.id === `legal-pane-${tabKey}`);
    });
  };

  window.handleContactSubmit = function (e) {
    if (e && e.preventDefault) e.preventDefault();
    if (window.showToast) {
      window.showToast('✓ Message sent! Our engineering team will respond within 24 hours.', '✉️');
    } else {
      alert('✓ Message sent! Our engineering team will respond within 24 hours.');
    }
    if (e && e.target && typeof e.target.reset === 'function') {
      e.target.reset();
    }
    if (typeof window.closeLegalModal === 'function') {
      window.closeLegalModal();
    }
    return false;
  };

  // Keyboard and backdrop dismiss for legal modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      window.closeLegalModal();
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('legal-modal');
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          window.closeLegalModal();
        }
      });
    }
  });

})();

