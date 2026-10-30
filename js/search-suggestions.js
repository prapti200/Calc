/**
 * ==============================================================================
 * CALC• REAL-TIME SEARCH & INSTANT AUTO-SUGGESTIONS ENGINE
 * High-performance, client-side typeahead search across all 189 calculators.
 * Provides instant live suggestions, category badges, query highlighting,
 * popular search chips, touch-friendly 1-tap launch, and full keyboard navigation.
 * ==============================================================================
 */

(function () {
  'use strict';

  // Category visual metadata
  const CAT_META = {
    financial: { label: 'Finance', icon: '💰', cssClass: 'fin', color: '#2563eb', bg: '#eff6ff' },
    fitness: { label: 'Health', icon: '🏃', cssClass: 'fit', color: '#16a34a', bg: '#f0fdf4' },
    math: { label: 'Math', icon: '📐', cssClass: 'math', color: '#7c3aed', bg: '#f5f3ff' },
    other: { label: 'Utility', icon: '⚡', cssClass: 'util', color: '#d97706', bg: '#fffbeb' },
    utility: { label: 'Utility', icon: '⚡', cssClass: 'util', color: '#d97706', bg: '#fffbeb' },
    everyday: { label: 'Everyday', icon: '🛠️', cssClass: 'util', color: '#d97706', bg: '#fffbeb' },
    weather: { label: 'Weather', icon: '⛅', cssClass: 'util', color: '#0284c7', bg: '#f0f9ff' },
    transportation: { label: 'Transport', icon: '🚗', cssClass: 'util', color: '#ea580c', bg: '#fff7ed' },
    entertainment: { label: 'Fun', icon: '🎲', cssClass: 'util', color: '#db2777', bg: '#fdf2f8' },
    internet: { label: 'Internet', icon: '🌐', cssClass: 'util', color: '#4f46e5', bg: '#eef2ff' },
    standard: { label: 'Keypad', icon: '🧮', cssClass: 'sci', color: '#0891b2', bg: '#ecfeff' }
  };

  // Popular quick search queries
  const POPULAR_SEARCHES = [
    { title: 'Mortgage', cat: 'financial', id: 'sec-mort-calc', icon: '🏠' },
    { title: 'Loan & EMI', cat: 'financial', id: 'sec-loan-calc', icon: '💳' },
    { title: 'BMI Calculator', cat: 'fitness', id: 'sec-bmi-calc', icon: '⚖️' },
    { title: 'Salary & Wage', cat: 'financial', id: 'sec-salary-calc', icon: '💵' },
    { title: 'Compound Interest', cat: 'financial', id: 'sec-ci-calc', icon: '📈' },
    { title: 'Percentage', cat: 'math', id: 'sec-percentage-calc', icon: '🔢' },
    { title: 'Age Calculator', cat: 'other', id: 'sec-age-calc', icon: '🎂' },
    { title: 'Currency Converter', cat: 'financial', id: 'sec-currency-calc', icon: '💱' },
    { title: 'Auto Loan', cat: 'financial', id: 'sec-auto-loan-calc', icon: '🚗' },
    { title: 'Scientific Keypad', cat: 'standard', id: 'box-sci-mode', icon: '🧮' },
    { title: 'Unit Converter', cat: 'other', id: 'sec-unit-calc', icon: '📏' }
  ];

  class SearchSuggestionsEngine {
    constructor() {
      this.index = [];
      this.selectedIndex = -1;
      this.currentResults = [];
      this.isInitialized = false;
      this.boundInputs = new Set();
    }

    init() {
      if (this.isInitialized) return;
      this.buildIndex();
      this.bindGlobalInput();
      this.bindHeaderSearchButton();
      this.bindDocumentEvents();
      this.isInitialized = true;
    }

    buildIndex() {
      const registry = (window.AppRouter && window.AppRouter.registry) || [];
      const indexMap = new Map();

      // 1. Ingest from Router Registry
      registry.forEach(r => {
        const meta = CAT_META[r.cat] || CAT_META.other;
        indexMap.set(r.id, {
          id: r.id,
          cat: r.cat,
          slug: r.slug,
          title: r.title,
          desc: `${r.title} with high-precision instant formula calculations.`,
          keywords: (r.aliases || []).join(' ').toLowerCase(),
          badge: meta.label,
          icon: meta.icon,
          cssClass: meta.cssClass
        });
      });

      // 2. Enrich from DOM cards (descriptions & keyword attributes)
      document.querySelectorAll('.zenith-card, .sidebar-calc-item').forEach(el => {
        const id = el.dataset.calcId || (el.getAttribute('onclick')?.match(/'([^']+)'\s*\)/)?.[1]);
        if (!id || !indexMap.has(id)) return;

        const item = indexMap.get(id);
        const cardDesc = el.querySelector('.zenith-card-desc')?.textContent.trim();
        const cardKeywords = el.dataset.keywords || '';
        const cardSub = el.dataset.sub || '';

        if (cardDesc) item.desc = cardDesc;
        if (cardKeywords) item.keywords = `${item.keywords} ${cardKeywords.toLowerCase()} ${cardSub.toLowerCase()}`;
      });

      this.index = Array.from(indexMap.values());
    }

    bindGlobalInput() {
      const input = document.getElementById('global-search-input');
      if (!input || this.boundInputs.has(input)) return;

      this.boundInputs.add(input);
      const wrapper = input.closest('.zenith-hero-search-wrapper');
      if (!wrapper) return;

      // Ensure wrapper is positioned for dropdown
      wrapper.style.position = 'relative';

      // 1. Inject Clear Button if not present
      let clearBtn = wrapper.querySelector('.search-clear-btn');
      if (!clearBtn) {
        clearBtn = document.createElement('button');
        clearBtn.type = 'button';
        clearBtn.className = 'search-clear-btn';
        clearBtn.id = 'search-clear-btn';
        clearBtn.title = 'Clear search query';
        clearBtn.setAttribute('aria-label', 'Clear search query');
        clearBtn.innerHTML = '✕';
        clearBtn.style.display = 'none';
        wrapper.appendChild(clearBtn);

        clearBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          input.value = '';
          clearBtn.style.display = 'none';
          input.focus();
          this.renderPopularSearches(dropdown);
          this.filterZenithCards('');
        });
      }

      // 2. Inject Suggestions Dropdown Container
      let dropdown = wrapper.querySelector('.zenith-search-suggestions');
      if (!dropdown) {
        dropdown = document.createElement('div');
        dropdown.className = 'zenith-search-suggestions';
        dropdown.id = 'zenith-search-suggestions';
        dropdown.setAttribute('role', 'listbox');
        dropdown.style.display = 'none';
        wrapper.appendChild(dropdown);
      }

      // 3. Input Event: Real-time search & auto-suggestions
      input.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        clearBtn.style.display = query ? 'flex' : 'none';

        if (!query) {
          this.renderPopularSearches(dropdown);
          this.filterZenithCards('');
          return;
        }

        const results = this.queryIndex(query);
        this.renderResults(dropdown, query, results);
        this.filterZenithCards(query);
      });

      // 4. Focus Event: Show suggestions or popular searches
      input.addEventListener('focus', () => {
        const query = input.value.trim();
        clearBtn.style.display = query ? 'flex' : 'none';

        if (!query) {
          this.renderPopularSearches(dropdown);
        } else {
          const results = this.queryIndex(query);
          this.renderResults(dropdown, query, results);
        }
        dropdown.style.display = 'block';
      });

      // 5. Keyboard Navigation (Arrows, Enter, Escape)
      input.addEventListener('keydown', (e) => {
        if (dropdown.style.display !== 'block') return;

        const items = dropdown.querySelectorAll('.suggestion-item');
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          this.selectedIndex = (this.selectedIndex + 1) % items.length;
          this.updateHighlight(items);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          this.selectedIndex = (this.selectedIndex - 1 + items.length) % items.length;
          this.updateHighlight(items);
        } else if (e.key === 'Enter') {
          e.preventDefault();
          if (this.selectedIndex >= 0 && items[this.selectedIndex]) {
            items[this.selectedIndex].click();
          } else if (this.currentResults.length > 0) {
            const first = this.currentResults[0];
            this.selectCalculator(first.cat, first.id);
          }
        } else if (e.key === 'Escape') {
          this.closeDropdown(dropdown);
        }
      });
    }

    updateHighlight(items) {
      items.forEach((item, idx) => {
        const isSel = idx === this.selectedIndex;
        item.classList.toggle('selected', isSel);
        if (isSel) {
          item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
      });
    }

    queryIndex(rawQuery) {
      const q = rawQuery.toLowerCase().trim();
      if (!q) return [];

      const tokens = q.split(/\s+/).filter(Boolean);
      const scored = [];

      this.index.forEach(item => {
        const t = item.title.toLowerCase();
        const k = item.keywords;
        const d = item.desc.toLowerCase();
        const b = item.badge.toLowerCase();

        let score = 0;

        // Exact match bonus
        if (t === q) {
          score += 120;
        } else if (t.startsWith(q)) {
          score += 70;
        } else if (t.includes(q)) {
          score += 45;
        }

        // Token match
        let allTokens = true;
        for (const tok of tokens) {
          if (t.includes(tok)) {
            score += 25;
          } else if (k.includes(tok)) {
            score += 15;
          } else if (d.includes(tok)) {
            score += 8;
          } else if (b.includes(tok)) {
            score += 5;
          } else {
            allTokens = false;
          }
        }

        if (score > 0 && (tokens.length === 1 || allTokens)) {
          scored.push({ item, score });
        }
      });

      scored.sort((a, b) => b.score - a.score);
      return scored.slice(0, 8).map(s => s.item);
    }

    highlight(text, query) {
      if (!query) return text;
      const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(${escaped})`, 'gi');
      return text.replace(regex, '<mark class="search-hl">$1</mark>');
    }

    renderPopularSearches(dropdown) {
      this.selectedIndex = -1;
      this.currentResults = [];

      dropdown.innerHTML = `
        <div class="sugg-header">
          <span class="sugg-header-title">🔥 Popular Calculators</span>
          <span class="sugg-header-hint">Tap to open directly</span>
        </div>
        <div class="sugg-chips-grid">
          ${POPULAR_SEARCHES.map(p => `
            <button type="button" class="sugg-chip-btn" data-cat="${p.cat}" data-id="${p.id}">
              <span class="sugg-chip-icon">${p.icon}</span>
              <span class="sugg-chip-text">${p.title}</span>
            </button>
          `).join('')}
        </div>
      `;

      dropdown.querySelectorAll('.sugg-chip-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const cat = btn.dataset.cat;
          const id = btn.dataset.id;
          this.selectCalculator(cat, id);
        });
      });

      dropdown.style.display = 'block';
    }

    renderResults(dropdown, query, results) {
      this.selectedIndex = -1;
      this.currentResults = results;

      if (results.length === 0) {
        dropdown.innerHTML = `
          <div class="sugg-empty-state">
            <span class="sugg-empty-icon">🔍</span>
            <div class="sugg-empty-title">No calculators found for "<strong>${this.escapeHtml(query)}</strong>"</div>
            <div class="sugg-empty-sub">Try searching for <em>Mortgage</em>, <em>BMI</em>, <em>Loan EMI</em>, <em>Salary</em>, or <em>Percentage</em>.</div>
            <div class="sugg-chips-grid compact">
              ${POPULAR_SEARCHES.slice(0, 5).map(p => `
                <button type="button" class="sugg-chip-btn" data-cat="${p.cat}" data-id="${p.id}">
                  <span class="sugg-chip-icon">${p.icon}</span>
                  <span class="sugg-chip-text">${p.title}</span>
                </button>
              `).join('')}
            </div>
          </div>
        `;

        dropdown.querySelectorAll('.sugg-chip-btn').forEach(btn => {
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.selectCalculator(btn.dataset.cat, btn.dataset.id);
          });
        });

        dropdown.style.display = 'block';
        return;
      }

      dropdown.innerHTML = `
        <div class="sugg-header">
          <span class="sugg-header-title">Suggested Calculators (${results.length})</span>
          <span class="sugg-header-hint">Tap to launch</span>
        </div>
        <div class="sugg-items-list" role="list">
          ${results.map((res, idx) => `
            <div class="suggestion-item" data-cat="${res.cat}" data-id="${res.id}" data-idx="${idx}" role="option" tabindex="0">
              <div class="sugg-item-icon ${res.cssClass}">
                <span>${res.icon}</span>
              </div>
              <div class="sugg-item-body">
                <div class="sugg-item-title">${this.highlight(res.title, query)}</div>
                <div class="sugg-item-desc">${res.desc}</div>
              </div>
              <div class="sugg-item-meta">
                <span class="sugg-item-badge ${res.cssClass}">${res.badge}</span>
                <span class="sugg-item-arrow">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </span>
              </div>
            </div>
          `).join('')}
        </div>
      `;

      dropdown.querySelectorAll('.suggestion-item').forEach(item => {
        item.addEventListener('click', (e) => {
          e.stopPropagation();
          const cat = item.dataset.cat;
          const id = item.dataset.id;
          this.selectCalculator(cat, id);
        });
      });

      dropdown.style.display = 'block';
    }

    selectCalculator(category, calcId) {
      if (typeof window.openZenithCalc === 'function') {
        window.openZenithCalc(category, calcId);
      } else if (window.AppRouter) {
        const calc = window.AppRouter.getCalcById(calcId);
        if (calc) {
          window.AppRouter.applyRoute({
            type: 'calc',
            category: category,
            id: calcId,
            slug: calc.slug,
            title: calc.title
          });
        }
      }

      // Close all dropdowns
      document.querySelectorAll('.zenith-search-suggestions').forEach(d => {
        d.style.display = 'none';
      });

      const inp = document.getElementById('global-search-input');
      if (inp) {
        inp.blur();
        inp.value = '';
        const clr = document.getElementById('search-clear-btn');
        if (clr) clr.style.display = 'none';
      }
    }

    filterZenithCards(query) {
      const q = (query || '').toLowerCase().trim();
      const cards = document.querySelectorAll('.zenith-card');
      if (cards.length === 0) return;

      let visible = 0;
      cards.forEach(card => {
        if (!q) {
          card.style.display = 'flex';
          visible++;
          return;
        }
        const title = card.querySelector('.zenith-card-title')?.textContent.toLowerCase() || '';
        const desc = card.querySelector('.zenith-card-desc')?.textContent.toLowerCase() || '';
        const cat = card.dataset.category?.toLowerCase() || '';
        const sub = card.dataset.sub?.toLowerCase() || '';
        const kw = card.dataset.keywords?.toLowerCase() || '';

        const match = title.includes(q) || desc.includes(q) || cat.includes(q) || sub.includes(q) || kw.includes(q);
        card.style.display = match ? 'flex' : 'none';
        if (match) visible++;
      });

      const countBadge = document.getElementById('zenith-count-badge');
      if (countBadge) {
        countBadge.textContent = q ? `${visible} ${visible === 1 ? 'Calculator' : 'Calculators'} Matching "${query}"` : '189 Calculators';
      }
    }

    bindHeaderSearchButton() {
      // Create quick search button in header actions for mobile if not present
      const headerActions = document.querySelector('.header-actions');
      if (!headerActions || document.getElementById('header-quick-search-btn')) return;

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'icon-btn header-action-btn header-search-trigger-btn';
      btn.id = 'header-quick-search-btn';
      btn.title = 'Quick Search Calculators';
      btn.setAttribute('aria-label', 'Search all calculators');
      btn.innerHTML = `
        <svg class="header-svg-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      `;

      // Insert before history button
      const histBtn = document.getElementById('history-toggle-btn');
      if (histBtn) {
        headerActions.insertBefore(btn, histBtn);
      } else {
        headerActions.prepend(btn);
      }

      btn.addEventListener('click', () => {
        // Switch to zenith-hub
        if (typeof window.backToZenithHub === 'function') {
          window.backToZenithHub();
        } else {
          document.querySelectorAll('.view-section').forEach(sec => {
            sec.classList.toggle('active', sec.id === 'view-zenith-hub');
          });
        }

        const input = document.getElementById('global-search-input');
        if (input) {
          input.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setTimeout(() => {
            input.focus();
            input.select();
          }, 300);
        }
      });
    }

    bindDocumentEvents() {
      // Close dropdown on click outside
      document.addEventListener('click', (e) => {
        const wrapper = e.target.closest('.zenith-hero-search-wrapper');
        if (!wrapper) {
          document.querySelectorAll('.zenith-search-suggestions').forEach(d => {
            d.style.display = 'none';
          });
        }
      });
    }

    closeDropdown(dropdown) {
      if (dropdown) dropdown.style.display = 'none';
      this.selectedIndex = -1;
    }

    escapeHtml(str) {
      return (str || '').replace(/[&<>"']/g, m => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      })[m]);
    }
  }

  // Global instance
  window.CalcSearchEngine = new SearchSuggestionsEngine();

  // Auto-init
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.CalcSearchEngine.init());
  } else {
    window.CalcSearchEngine.init();
  }

})();
