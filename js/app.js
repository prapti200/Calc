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
  const settingsCloseBtn = document.getElementById('settings-close-btn');
  const settingsOpenHistory = document.getElementById('settings-open-history');
  const settingsClearHistory = document.getElementById('settings-clear-history');

  function toggleSettings(forceClose = false) {
    if (!settingsPopover) return;
    const isOpen = settingsPopover.classList.contains('open');
    if (forceClose || isOpen) {
      settingsPopover.classList.remove('open');
      if (settingsToggleBtn) {
        settingsToggleBtn.classList.remove('active');
        settingsToggleBtn.setAttribute('aria-expanded', 'false');
      }
    } else {
      settingsPopover.classList.add('open');
      if (settingsToggleBtn) {
        settingsToggleBtn.classList.add('active');
        settingsToggleBtn.setAttribute('aria-expanded', 'true');
      }
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

    if (window.AppRouter && !window.AppRouter.isDispatching) {
      window.AppRouter.onCalculatorOpened(calcId, category);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  // --- 6. SEARCH SYSTEM (FILEZENITH REAL-TIME SEARCH) ---
  const globalSearchInput = document.getElementById('global-search-input');
  const searchShortcut = document.getElementById('search-shortcut');

  if (globalSearchInput) {
    globalSearchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();

      // Automatically route to zenith-hub if searching
      const hubSec = document.getElementById('view-zenith-hub');
      if (hubSec && !hubSec.classList.contains('active')) {
        document.querySelectorAll('.view-section').forEach(sec => {
          sec.classList.toggle('active', sec.id === 'view-zenith-hub');
        });
      }

      const cards = document.querySelectorAll('.zenith-card');
      let visibleCount = 0;
      cards.forEach(card => {
        const title = card.querySelector('.zenith-card-title')?.textContent.toLowerCase() || '';
        const desc = card.querySelector('.zenith-card-desc')?.textContent.toLowerCase() || '';
        const category = card.dataset.category?.toLowerCase() || '';
        const sub = card.dataset.sub?.toLowerCase() || '';
        const keywords = card.dataset.keywords?.toLowerCase() || '';

        const match = query === '' || title.includes(query) || desc.includes(query) || category.includes(query) || sub.includes(query) || keywords.includes(query);
        card.style.display = match ? 'flex' : 'none';
        if (match) visibleCount++;
      });

      const badge = document.getElementById('zenith-count-badge');
      if (badge) {
        badge.textContent = `${visibleCount} Calculators`;
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

