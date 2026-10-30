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
  const settingsBackdrop = document.getElementById('settings-backdrop');
  const settingsCloseBtn = document.getElementById('settings-close-btn');
  const settingsOpenHistory = document.getElementById('settings-open-history');
  const settingsClearHistory = document.getElementById('settings-clear-history');

  function toggleSettings(forceClose = false) {
    if (!settingsPopover) return;
    const isOpen = settingsPopover.classList.contains('open');
    if (forceClose || isOpen) {
      settingsPopover.classList.remove('open');
      if (settingsBackdrop) settingsBackdrop.classList.remove('open');
      if (settingsToggleBtn) {
        settingsToggleBtn.classList.remove('active');
        settingsToggleBtn.setAttribute('aria-expanded', 'false');
      }
      document.body.classList.remove('settings-sheet-open');
    } else {
      settingsPopover.classList.add('open');
      if (settingsBackdrop) settingsBackdrop.classList.add('open');
      if (settingsToggleBtn) {
        settingsToggleBtn.classList.add('active');
        settingsToggleBtn.setAttribute('aria-expanded', 'true');
      }
      if (window.innerWidth <= 820) {
        document.body.classList.add('settings-sheet-open');
      }
    }
  }
  window.toggleSettings = toggleSettings;

  if (settingsToggleBtn) {
    settingsToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleSettings();
    });
  }

  if (settingsBackdrop) {
    settingsBackdrop.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleSettings(true);
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
      if (!settingsPopover.contains(e.target) && !settingsToggleBtn?.contains(e.target) && !settingsBackdrop?.contains(e.target)) {
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
    if (historyDrawerBackdrop) historyDrawerBackdrop.classList.add('open');
  }

  function closeHistory() {
    if (historyDrawerBackdrop) historyDrawerBackdrop.classList.remove('open');
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

  // --- FILEZENITH ROUTING & FILTERING SYSTEM ---
  window.openZenithCalc = function (category, calcId) {
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

    // Ensure prominent, dedicated PDF export action in the calculator results area
    setTimeout(() => ensureCalculatorPdfButton(calcId), 60);

    if (window.AppRouter && !window.AppRouter.isDispatching) {
      window.AppRouter.onCalculatorOpened(calcId, category);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  function ensureCalculatorPdfButton(calcId) {
    if (!calcId) return;
    const panel = document.getElementById(calcId);
    if (!panel) return;
    const resultsSide = panel.querySelector('.calc-results-side');
    if (!resultsSide || resultsSide.querySelector('.calc-pdf-action-block')) return;

    const pdfBlock = document.createElement('div');
    pdfBlock.className = 'calc-pdf-action-block';
    pdfBlock.innerHTML = `
      <button type="button" class="btn-dedicated-pdf" onclick="CalcPdfReport && CalcPdfReport.downloadCurrentPdf()" title="Download official verified calculation report as PDF">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="12" y1="18" x2="12" y2="12"></line>
          <polyline points="9 15 12 18 15 15"></polyline>
        </svg>
        <span>Download Official PDF Report</span>
      </button>
    `;
    resultsSide.appendChild(pdfBlock);
  }
  window.ensureCalculatorPdfButton = ensureCalculatorPdfButton;

  // Global listener for switcher pills to attach PDF button to whichever calculator is active
  document.addEventListener('click', (e) => {
    const pill = e.target.closest('.switcher-pill');
    if (pill && pill.dataset.target) {
      setTimeout(() => ensureCalculatorPdfButton(pill.dataset.target), 60);
    }
  });

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
    // Update active state on upper ribbon navigation buttons
    document.querySelectorAll('.zenith-nav-dropdown').forEach(btn => {
      const match = (btnEl && btn === btnEl) || (!btnEl && btn.getAttribute('onclick')?.includes(`'${tabKey}'`));
      btn.classList.toggle('active', !!match);
    });

    if (tabKey === 'all') {
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
        sec.classList.toggle('active', sec.id === `view-${tabKey}`);
      });
      if (tabKey === 'financial' && window.FinancialCalcs) {
        window.FinancialCalcs.showCatalog();
      } else if (tabKey === 'fitness' && window.FitnessCalcs) {
        window.FitnessCalcs.showCatalog();
      } else if (tabKey === 'math' && window.MathCalcs) {
        window.MathCalcs.showCatalog();
      } else if (tabKey === 'other' && window.OtherCalcs) {
        window.OtherCalcs.showCatalog();
      }
      if (window.AppRouter && !window.AppRouter.isDispatching) {
        window.AppRouter.onCatalogOpened(tabKey);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

  // --- 6. SEARCH SYSTEM (FILEZENITH REAL-TIME SEARCH & LIVE DROPDOWN) ---
  const globalSearchInput = document.getElementById('global-search-input');
  const searchShortcut = document.getElementById('search-shortcut');
  const globalSearchClear = document.getElementById('global-search-clear');
  const globalSearchDropdown = document.getElementById('global-search-dropdown');

  let indexedCalcs = [];
  function buildSearchIndex() {
    indexedCalcs = [];
    document.querySelectorAll('.zenith-card').forEach(card => {
      const titleSpan = card.querySelector('.zenith-card-title span');
      const title = (titleSpan?.textContent || card.querySelector('.zenith-card-title')?.textContent || '').replace('→', '').trim();
      const desc = card.querySelector('.zenith-card-desc')?.textContent.trim() || '';
      const category = card.dataset.category || '';
      const sub = card.dataset.sub || '';
      const keywords = (card.dataset.keywords || '').toLowerCase();
      const onclickAttr = card.getAttribute('onclick') || '';
      const match = onclickAttr.match(/openZenithCalc\(\s*['"]([^'"]+)['"]\s*,\s*['"]([^'"]+)['"]\s*\)/);
      const categoryKey = match ? match[1] : category;
      const calcId = match ? match[2] : (card.dataset.calcId || '');

      if (title && calcId) {
        indexedCalcs.push({
          title,
          desc,
          category: categoryKey,
          sub,
          keywords,
          calcId,
          element: card
        });
      }
    });
  }

  function getCategoryLabel(cat) {
    switch (cat) {
      case 'financial': return { text: 'Finance', cls: 'fin' };
      case 'fitness': return { text: 'Health', cls: 'fit' };
      case 'math': return { text: 'Math', cls: 'math' };
      case 'other': return { text: 'Utility', cls: 'util' };
      case 'standard': return { text: 'Scientific', cls: 'sci' };
      default: return { text: 'Tool', cls: 'fin' };
    }
  }

  function escapeHtml(str) {
    return (str || '').replace(/[&<>"']/g, m => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
    }[m]));
  }

  function highlightMatch(text, query) {
    if (!query) return escapeHtml(text);
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escaped})`, 'gi');
    return escapeHtml(text).replace(regex, '<span class="search-match-highlight">$1</span>');
  }

  const POPULAR_SUGGESTIONS = [
    { title: 'Mortgage Calculator', desc: 'Home loan P&I, property tax, PMI, HOA & 30-year schedule', category: 'financial', calcId: 'sec-mort-calc' },
    { title: 'Body Mass Index (BMI) & Gauge', desc: 'WHO clinical weight categories, BMI prime & healthy range', category: 'fitness', calcId: 'sec-bmi-calc' },
    { title: 'Auto & Personal Loan / EMI', desc: 'Monthly payments, total interest & loan amortization', category: 'financial', calcId: 'sec-loan-calc' },
    { title: 'Percentage Calculator', desc: 'What is X% of Y, percentage increase, decrease & difference', category: 'math', calcId: 'sec-pct-calc' },
    { title: 'Compound Interest Calculator', desc: 'Long-term investment compounding with regular contributions', category: 'financial', calcId: 'sec-ci-calc' },
    { title: 'Unit Converter', desc: 'Convert length, mass, temperature, speed, area & digital storage', category: 'other', calcId: 'sec-unit-calc' },
    { title: 'Calorie & TDEE Calculator', desc: 'Mifflin-St Jeor daily energy expenditure & macro targets', category: 'fitness', calcId: 'sec-cal-calc' },
    { title: 'Standard & Scientific Calculator', desc: 'Arithmetic, trig sin/cos/tan, logarithms & exponents', category: 'standard', calcId: 'box-std-mode' }
  ];

  function showPopularSuggestions() {
    if (!globalSearchDropdown) return;
    let html = `
      <div class="search-dropdown-header">
        <span>✨ Recommended & Popular Calculators</span>
        <span>Tap to open</span>
      </div>
    `;

    POPULAR_SUGGESTIONS.forEach(item => {
      const catInfo = getCategoryLabel(item.category);
      html += `
        <div class="search-result-item" role="option" onclick="handleSearchResultClick('${item.category}', '${item.calcId}')">
          <span class="search-result-badge ${catInfo.cls}">${catInfo.text}</span>
          <div class="search-result-info">
            <div class="search-result-title">${escapeHtml(item.title)}</div>
            <div class="search-result-desc">${escapeHtml(item.desc)}</div>
          </div>
          <span class="search-result-arrow">→</span>
        </div>
      `;
    });

    globalSearchDropdown.innerHTML = html;
    globalSearchDropdown.style.display = 'block';
  }

  function renderSearchDropdown(matches, query) {
    if (!globalSearchDropdown) return;
    if (query === '') {
      showPopularSuggestions();
      return;
    }

    if (matches.length === 0) {
      globalSearchDropdown.innerHTML = `
        <div class="search-dropdown-empty">
          <p>No calculators found matching <strong>"${escapeHtml(query)}"</strong></p>
          <button type="button" class="catalog-no-results-btn" onclick="clearGlobalSearch()" style="margin-top:0.6rem; padding:0.35rem 0.9rem; font-size:0.78rem;">Clear Search</button>
        </div>
      `;
      globalSearchDropdown.style.display = 'block';
      return;
    }

    const topMatches = matches.slice(0, 8);
    let html = `
      <div class="search-dropdown-header">
        <span>Matching Calculators (${matches.length} found)</span>
        <span>Tap to open</span>
      </div>
    `;

    topMatches.forEach(item => {
      const catInfo = getCategoryLabel(item.category);
      const highlightedTitle = highlightMatch(item.title, query);
      html += `
        <div class="search-result-item" role="option" onclick="handleSearchResultClick('${item.category}', '${item.calcId}')">
          <span class="search-result-badge ${catInfo.cls}">${catInfo.text}</span>
          <div class="search-result-info">
            <div class="search-result-title">${highlightedTitle}</div>
            <div class="search-result-desc">${escapeHtml(item.desc)}</div>
          </div>
          <span class="search-result-arrow">→</span>
        </div>
      `;
    });

    globalSearchDropdown.innerHTML = html;
    globalSearchDropdown.style.display = 'block';
  }

  window.handleSearchResultClick = function (category, calcId) {
    if (globalSearchDropdown) globalSearchDropdown.style.display = 'none';
    if (globalSearchInput) globalSearchInput.blur();
    window.openZenithCalc(category, calcId);
  };

  window.clearGlobalSearch = function () {
    if (globalSearchInput) {
      globalSearchInput.value = '';
    }
    if (globalSearchClear) {
      globalSearchClear.style.display = 'none';
    }
    if (globalSearchDropdown) {
      globalSearchDropdown.style.display = 'none';
      globalSearchDropdown.innerHTML = '';
    }

    // Restore all cards and all topic sections
    document.querySelectorAll('.zenith-card').forEach(c => c.style.display = 'flex');
    document.querySelectorAll('.calc-topic-section').forEach(sec => {
      sec.style.display = 'block';
    });

    // Reset topic pills to default count
    const defaultPills = {
      'hub-topic-financial': '70 Calculators',
      'hub-topic-fitness': '29 Calculators',
      'hub-topic-math': '30 Calculators',
      'hub-topic-other': '55 Calculators',
      'hub-topic-standard': '1 Calculator'
    };
    Object.keys(defaultPills).forEach(id => {
      const pill = document.querySelector(`#${id} .topic-count-pill`);
      if (pill) pill.textContent = defaultPills[id];
    });

    const badge = document.getElementById('zenith-count-badge');
    if (badge) {
      badge.textContent = `189 Calculators (70 Financial, 29 Health & Fitness, 29 Math, 55 Daily Utilities, Weather & Transport, 6 Keypads)`;
    }
  };

  function performGlobalSearch(query) {
    if (indexedCalcs.length === 0) buildSearchIndex();

    if (globalSearchClear) {
      globalSearchClear.style.display = query ? 'flex' : 'none';
    }

    // Automatically route to zenith-hub if searching
    const hubSec = document.getElementById('view-zenith-hub');
    if (hubSec && !hubSec.classList.contains('active')) {
      document.querySelectorAll('.view-section').forEach(sec => {
        sec.classList.toggle('active', sec.id === 'view-zenith-hub');
      });
    }

    if (query === '') {
      window.clearGlobalSearch();
      return;
    }

    // Rank matching items
    const scoredMatches = [];
    indexedCalcs.forEach(item => {
      const titleLower = item.title.toLowerCase();
      const descLower = item.desc.toLowerCase();
      const keywordsLower = item.keywords;
      let score = 0;

      if (titleLower === query) score += 200;
      else if (titleLower.startsWith(query)) score += 120;
      else if (titleLower.includes(query)) score += 80;

      if (keywordsLower.includes(query)) score += 40;
      if (descLower.includes(query)) score += 20;
      if (item.category.includes(query)) score += 10;

      if (score > 0) {
        scoredMatches.push({ ...item, score });
      }
    });

    scoredMatches.sort((a, b) => b.score - a.score);

    // Render instant live dropdown
    renderSearchDropdown(scoredMatches, query);

    // Filter cards on page and topic sections
    const matchedCalcIds = new Set(scoredMatches.map(m => m.calcId));
    let visibleCount = 0;

    document.querySelectorAll('.zenith-card').forEach(card => {
      const onclickAttr = card.getAttribute('onclick') || '';
      const match = onclickAttr.match(/openZenithCalc\(\s*['"]([^'"]+)['"]\s*,\s*['"]([^'"]+)['"]\s*\)/);
      const calcId = match ? match[2] : (card.dataset.calcId || '');
      const isMatch = matchedCalcIds.has(calcId);
      card.style.display = isMatch ? 'flex' : 'none';
      if (isMatch) visibleCount++;
    });

    // Filter each topic section: hide sections with 0 matches!
    document.querySelectorAll('.calc-topic-section').forEach(sec => {
      const visibleCards = sec.querySelectorAll('.zenith-card[style*="display: flex"]');
      if (visibleCards.length === 0) {
        sec.style.display = 'none';
      } else {
        sec.style.display = 'block';
        const pill = sec.querySelector('.topic-count-pill');
        if (pill) {
          pill.textContent = `${visibleCards.length} ${visibleCards.length === 1 ? 'match' : 'matches'}`;
        }
      }
    });

    const badge = document.getElementById('zenith-count-badge');
    if (badge) {
      badge.textContent = `${visibleCount} ${visibleCount === 1 ? 'Calculator found' : 'Calculators found'}`;
    }
  }

  if (globalSearchInput) {
    globalSearchInput.addEventListener('focus', () => {
      const query = globalSearchInput.value.toLowerCase().trim();
      if (query) {
        performGlobalSearch(query);
      } else {
        showPopularSuggestions();
      }
    });

    globalSearchInput.addEventListener('click', (e) => {
      e.stopPropagation();
      const query = globalSearchInput.value.toLowerCase().trim();
      if (query) {
        performGlobalSearch(query);
      } else {
        showPopularSuggestions();
      }
    });

    globalSearchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      performGlobalSearch(query);
    });

    // Close dropdown on click outside
    document.addEventListener('click', (e) => {
      if (globalSearchDropdown && !globalSearchDropdown.contains(e.target) && e.target !== globalSearchInput) {
        globalSearchDropdown.style.display = 'none';
      }
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
        if (globalSearchDropdown) globalSearchDropdown.style.display = 'none';
        document.querySelectorAll('.zenith-hero-search-input').forEach(inp => {
          if (document.activeElement === inp) inp.blur();
        });
      }
    });
  }

  // Build index on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildSearchIndex);
  } else {
    setTimeout(buildSearchIndex, 100);
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
    localStorage.setItem('calcCatalogViewMode', mode);

    const activeView = document.querySelector('.view-section.active');
    const container = activeView || document;

    container.querySelectorAll('.view-mode-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.mode === mode);
    });

    container.querySelectorAll('.topic-cards-grid').forEach(grid => {
      grid.style.display = mode === 'list' ? 'none' : '';
    });
    container.querySelectorAll('.topic-compact-list').forEach(list => {
      list.style.display = mode === 'list' ? 'grid' : 'none';
    });
  };

  window.filterSidebarList = function (inputEl, category) {
    const query = (inputEl.value || '').trim().toLowerCase();
    const listEl = document.getElementById(`sidebar-list-${category}`);
    if (!listEl) return;

    const items = listEl.querySelectorAll('.sidebar-calc-item');
    items.forEach(item => {
      const text = item.textContent.toLowerCase();
      const match = !query || text.includes(query);
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
      h.style.display = hasVisible ? '' : 'none';
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
    if (savedMode === 'list') {
      window.setCatalogViewMode('list');
    }
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
    e.preventDefault();
    if (window.showToast) {
      window.showToast('✓ Message sent! Our engineering team will respond within 24 hours.');
    }
    e.target.reset();
    setTimeout(() => {
      window.closeLegalModal();
    }, 1200);
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

