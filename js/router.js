/* ==========================================================================
   OMNICALC STUDIO - ADVANCED HTML5 BROWSER ROUTER (HISTORY API)
   Full Browser Router with clean path-based URLs (no hash router).
   Supports deep-linking, browser history (back/forward), and dynamic titles.
   ========================================================================== */

(function () {
  'use strict';

  // Master definition of all 104+ calculators with canonical slugs, aliases, and titles
  const CALC_REGISTRY = [
    // --- FINANCIAL CALCULATORS (73 Tools) ---
    { id: 'sec-loan-calc', cat: 'financial', slug: 'bike-emi-calculator', aliases: ['bike-loan', 'bike-loan-calculator', 'bike-emi', 'two-wheeler-loan', 'loan-calculator', 'loan', 'emi', 'loan-calc', 'emi-calculator', 'gold-loan', 'gold-loan-calculator', 'gold-loan-calc'], title: 'Bike EMI Calculator – Two-Wheeler, Car & Loan EMI Calculator' },
    { id: 'sec-inflation-calc', cat: 'financial', slug: 'inflation-calculator', aliases: ['inflation', 'inflation-calculator-india', 'cpi', 'purchasing-power', 'future-value-of-money', 'cpi-inflation-calculator-india', 'rupee-value-over-time', 'inflation-adjusted-return', 'cagr-inflation-formula'], keywords: 'inflation calculator, inflation calculator india, future value of money calculator, purchasing power calculator, CPI inflation calculator India, rupee value over time, inflation adjusted return calculator, historical inflation rate in India, CAGR inflation formula, consumer price index, rbi inflation target, cpi inflation, mospi cpi', title: 'Inflation Calculator India – Future Value & Purchasing Power' },
    { id: 'sec-heloc-calc', cat: 'financial', slug: 'heloc-calculator', aliases: ['heloc', 'home-equity-line-of-credit', 'heloc-payment-calculator', 'home-equity-calculator', 'cltv-calculator', 'heloc-interest-only-calculator', 'heloc-amortization-schedule'], keywords: 'heloc calculator, heloc calculator payment, home equity line of credit calculator, heloc payment calculator, heloc interest only payment calculator, heloc draw period and repayment period calculator, combined loan to value (CLTV) calculator, how much equity can I borrow, heloc amortization schedule', title: 'HELOC Calculator – Monthly Draw & Repayment Payment Estimator' },
    { id: 'sec-salary-calc', cat: 'financial', slug: 'salary-calculator', aliases: ['salary', 'wage-conversion', 'hourly-to-salary', 'wage-calculator', 'in-hand-salary-calculator', 'adp-salary-calculator', '8th-pay-commission-salary-calculator'], title: 'Salary Calculator – In Hand, ADP & 8th Pay Commission (2026)', keywords: 'salary calculator, in hand salary calculator, adp salary calculator, 8th pay commission salary calculator' },
    { id: 'sec-roi-calc', cat: 'financial', slug: 'roi-calculator', aliases: ['roi', 'return-on-investment', 'profit-margin-calc'], title: 'ROI & Profit Margin Calculator' },
    { id: 'sec-sip-calc', cat: 'financial', slug: 'sip-calculator', aliases: ['sip', 'systematic-investment', 'mutual-fund-sip'], title: 'SIP Investment Calculator' },
    { id: 'sec-disc-calc', cat: 'financial', slug: 'price-discount-calculator', aliases: ['price-discount', 'sale-price', 'percent-off'], title: 'Sale Price Discount Calculator' },

    // --- HEALTH, FITNESS & MATERNAL CALCULATORS (20 Tools) ---
    { id: 'sec-bf-calc', cat: 'fitness', slug: 'body-fat-calculator', aliases: ['body-fat', 'bf', 'body-fat-percentage', 'navy-body-fat'], title: 'Body Fat % (US Navy Method)' },
    // 7 Maternal & Cycle Calculators
    { id: 'sec-pregnancy-weight-calc', cat: 'fitness', slug: 'pregnancy-weight-gain-calculator', aliases: ['pregnancy-weight', 'pregnancy-weight-gain', 'maternal-weight', 'iom-weight'], title: 'Pregnancy Weight Gain Calculator' },
    { id: 'sec-ovulation-calc', cat: 'fitness', slug: 'ovulation-calculator', aliases: ['ovulation', 'fertile-days', 'ovulation-calendar'], title: 'Ovulation Calculator' },
    { id: 'sec-period-calc', cat: 'fitness', slug: 'period-calculator', aliases: ['period', 'period-tracker', 'menstrual-cycle'], title: 'Period Calculator (Cycle Forecasting)' },

    // 9 New Clinical, Nutrition & Health Calculators
    { id: 'sec-protein-calc', cat: 'fitness', slug: 'protein-calculator', aliases: ['protein', 'hypertrophy-protein', 'protein-intake'], title: 'Protein Calculator' },
    { id: 'sec-bsa-calc', cat: 'fitness', slug: 'bsa-calculator', aliases: ['bsa', 'body-surface-area', 'mosteller'], title: 'Body Surface Area (BSA) Calculator' },

    // --- MATH & ALGEBRA (20 Tools) ---
    { id: 'sec-pct-calc', cat: 'math', slug: 'percentage-calculator', aliases: ['percentage', 'pct', 'percent'], title: 'Percentage Calculator (3-in-1 Suite)' },
    { id: 'sec-gcd-calc', cat: 'math', slug: 'gcd-calculator', aliases: ['gcd', 'gcd-lcm', 'greatest-common-divisor', 'gcd-lcm-calculator'], title: 'GCD & LCM Integer Solver' },
    { id: 'sec-stats-calc', cat: 'math', slug: 'statistics-calculator', aliases: ['statistics', 'stats', 'mean-median-mode'], title: 'Statistics & Data Analyzer' },

    // 15 New Math Solvers
    { id: 'sec-sci-calc', cat: 'math', slug: 'scientific-calculator', aliases: ['scientific-calc', 'scientific', 'trig-calc'], title: 'Scientific Calculator' },
    { id: 'sec-binary-calc', cat: 'math', slug: 'binary-calculator', aliases: ['binary', 'bitwise', 'binary-converter', 'base2'], title: 'Binary Calculator' },
    { id: 'sec-hex-calc', cat: 'math', slug: 'hex-calculator', aliases: ['hex', 'hexadecimal', 'hexadecimal-calculator', 'base16'], title: 'Hex Calculator' },
    { id: 'sec-half-life-calc', cat: 'math', slug: 'half-life-calculator', aliases: ['half-life', 'radioactive-decay', 'decay', 'half-life-calc'], title: 'Half-Life Calculator' },
    { id: 'sec-log-calc', cat: 'math', slug: 'log-calculator', aliases: ['log', 'logarithm', 'ln', 'natural-log', 'logarithm-calculator'], title: 'Log Calculator' },
    { id: 'sec-ratio-calc', cat: 'math', slug: 'ratio-calculator', aliases: ['ratio', 'proportion', 'aspect-ratio', 'ratio-solver', 'ratio-proportion-calculator'], title: 'Ratio Calculator' },
    { id: 'sec-root-calc', cat: 'math', slug: 'root-calculator', aliases: ['root', 'square-root', 'cube-root', 'radical', 'square-root-calculator'], title: 'Root Calculator' },
    { id: 'sec-lcm-calc', cat: 'math', slug: 'least-common-multiple-calculator', aliases: ['lcm-calculator', 'lcm', 'least-common-multiple', 'lowest-common-multiple'], title: 'Least Common Multiple (LCM)' },
    { id: 'sec-gcf-calc', cat: 'math', slug: 'greatest-common-factor-calculator', aliases: ['gcf-calculator', 'gcf', 'hcf', 'greatest-common-factor', 'hcf-calculator'], title: 'Greatest Common Factor (GCF)' },
    { id: 'sec-factor-calc', cat: 'math', slug: 'factor-calculator', aliases: ['factor', 'factors', 'prime-factors', 'divisors'], title: 'Factor Calculator' },
    { id: 'sec-sci-notation-calc', cat: 'math', slug: 'scientific-notation-calculator', aliases: ['scientific-notation', 'sci-notation', 'standard-form', 'engineering-notation'], title: 'Scientific Notation Calculator' },

    // --- 9 NEW GEOMETRY & TRIGONOMETRY CALCULATORS ---
    { id: 'sec-volume-calc', cat: 'math', slug: 'volume-calculator', aliases: ['volume', '3d-volume', 'volume-solver'], title: 'Volume Calculator' },
    { id: 'sec-slope-calc', cat: 'math', slug: 'slope-calculator', aliases: ['slope', 'gradient', 'slope-intercept-calculator'], title: 'Slope Calculator' },
    { id: 'sec-area-calc', cat: 'math', slug: 'area-calculator', aliases: ['area', '2d-area', 'surface-area-2d'], title: 'Area Calculator' },
    { id: 'sec-distance-calc', cat: 'math', slug: 'distance-calculator', aliases: ['distance', '2d-distance', '3d-distance', 'euclidean-distance'], title: 'Distance Calculator' },
    { id: 'sec-circle-calc', cat: 'math', slug: 'circle-calculator', aliases: ['circle', 'circumference', 'circle-solver'], title: 'Circle Calculator' },
    { id: 'sec-surface-area-calc', cat: 'math', slug: 'surface-area-calculator', aliases: ['surface-area', 'total-surface-area', '3d-surface-area'], title: 'Surface Area Calculator' },
    { id: 'sec-pythagorean-calc', cat: 'math', slug: 'pythagorean-theorem-calculator', aliases: ['pythagorean', 'pythagoras', 'pythagorean-calculator'], title: 'Pythagorean Theorem Calculator' },
    { id: 'sec-right-triangle-calc', cat: 'math', slug: 'right-triangle-calculator', aliases: ['right-triangle', 'right-angle-triangle', 'hypotenuse-calculator'], title: 'Right Triangle Calculator' },

    // --- DAILY UTILITIES & TOOLS (34 Tools) ---
    { id: 'sec-gpa-calc', cat: 'utility', slug: 'gpa-calculator', aliases: ['gpa', 'college-gpa', 'grade-point-average', 'other/gpa-calculator', 'everyday/gpa-calculator'], title: 'College & School GPA Calculator' },
    // Date & Time Suite (9)
    // Housing / Building Suite (8)
    { id: 'sec-stair-calc', cat: 'other', slug: 'stair-calculator', aliases: ['stair', 'stairs-calculator', 'staircase-calculator', 'riser-tread-calculator'], title: 'Stair Calculator' },
    { id: 'sec-gravel-calc', cat: 'other', slug: 'gravel-calculator', aliases: ['gravel', 'aggregate-calculator', 'crushed-stone-calculator', 'driveway-gravel-calculator'], title: 'Gravel Calculator' },
    // Measurements & Science Suite (10)
    { id: 'sec-density-calc', cat: 'other', slug: 'density-calculator', aliases: ['density', 'mass-volume-density', 'specific-gravity-calculator'], title: 'Density Calculator' },
    // Electronics & Circuits Suite (4)

    
    // --- INTERNET & NETWORKING SUITE (5 Tools) ---

    // --- EVERYDAY UTILITY SUITE (5 New Tools) ---
    { id: 'sec-grade-calc', cat: 'utility', slug: 'grade-calculator', aliases: ['grade', 'final-grade-calculator', 'class-grade-calculator', 'exam-grade-calculator', 'other/grade-calculator', 'everyday/grade-calculator'], title: 'Grade Calculator' },
    { id: 'sec-bra-size-calc', cat: 'utility', slug: 'bra-size-calculator', aliases: ['bra-size', 'bra-calculator', 'cup-size-calculator', 'bra-fitting', 'other/bra-size-calculator', 'everyday/bra-size-calculator'], title: 'Bra Size Calculator' },

    // --- WEATHER & CLIMATE SUITE (3 Tools) ---

    // --- TRANSPORTATION & VEHICLE SUITE (6 Tools) ---
    { id: 'sec-fuel-cost-calc', cat: 'other', slug: 'fuel-cost-calculator', aliases: ['fuel-cost', 'fuel-cost-calc', 'trip-fuel-calculator', 'gas-cost-calculator', 'road-trip-cost', 'transportation/fuel-cost-calculator', 'other/fuel-cost-calculator', 'transportation/fuel-cost'], title: 'Fuel Cost & Trip Expense Calculator' },
    { id: 'sec-mileage-calc', cat: 'other', slug: 'mileage-calculator', aliases: ['mileage', 'mileage-calc', 'business-mileage-calculator', 'irs-mileage-calculator', 'commute-mileage-calculator', 'transportation/mileage-calculator', 'other/mileage-calculator', 'transportation/mileage'], title: 'Mileage Reimbursement Calculator' },

    // --- ENTERTAINMENT & ANECDOTES SUITE (2 Tools) ---

    // --- STANDARD & SCIENTIFIC KEYPAD (2 Modes) ---
    { id: 'box-std-mode', cat: 'standard', slug: 'standard-calculator', aliases: ['standard', 'standard-keypad', 'keypad', 'calc'], title: 'Standard Calculator' },
    { id: 'box-sci-mode', cat: 'standard', slug: 'scientific-calculator', aliases: ['scientific', 'sci', 'scientific-keypad', 'scientific-calc'], title: 'Scientific Calculator' }
  ];

  // Lookup fast indexes
  const byId = new Map();
  const bySlug = new Map();
  const byAlias = new Map();

  CALC_REGISTRY.forEach(item => {
    byId.set(item.id, item);
    bySlug.set(`${item.cat}/${item.slug}`, item);
    bySlug.set(item.slug, item);
    bySlug.set(`other/${item.slug}`, item);
    bySlug.set(`utility/${item.slug}`, item);
    bySlug.set(`weather/${item.slug}`, item);
    bySlug.set(`transportation/${item.slug}`, item);
    bySlug.set(`entertainment/${item.slug}`, item);
    if (item.cat === 'utility') bySlug.set(`everyday/${item.slug}`, item);
    if (item.cat === 'internet') bySlug.set(`net/${item.slug}`, item);
    if (item.aliases) {
      item.aliases.forEach(alias => {
        byAlias.set(alias.toLowerCase(), item);
        byAlias.set(`${item.cat}/${alias.toLowerCase()}`, item);
      });
    }
  });

  const BASE_APP_TITLE = 'CALC• Modern Calculator';

  // Master definition of standalone pages (Privacy Policy, About Us, Contact, Terms, etc.)
  const STANDALONE_PAGES = {
    'privacy-policy': { key: 'privacy', slug: 'privacy-policy', title: 'Privacy Policy' },
    'privacy': { key: 'privacy', slug: 'privacy-policy', title: 'Privacy Policy' },
    'about-us': { key: 'about', slug: 'about-us', title: 'About Us & Mission' },
    'about': { key: 'about', slug: 'about-us', title: 'About Us & Mission' },
    'contact': { key: 'contact', slug: 'contact', title: 'Contact & Support' },
    'contact-us': { key: 'contact', slug: 'contact', title: 'Contact & Support' },
    'support': { key: 'contact', slug: 'contact', title: 'Contact & Support' },
    'terms-of-service': { key: 'terms', slug: 'terms-of-service', title: 'Terms of Service' },
    'terms': { key: 'terms', slug: 'terms-of-service', title: 'Terms of Service' },
    'tos': { key: 'terms', slug: 'terms-of-service', title: 'Terms of Service' },
    'editorial-policy': { key: 'editorial', slug: 'editorial-policy', title: 'Editorial Policy & Standards' },
    'editorial': { key: 'editorial', slug: 'editorial-policy', title: 'Editorial Policy & Standards' },
    'affiliate-disclosure': { key: 'affiliate', slug: 'affiliate-disclosure', title: 'Affiliate Disclosure' },
    'affiliate': { key: 'affiliate', slug: 'affiliate-disclosure', title: 'Affiliate Disclosure' },
    'security': { key: 'security', slug: 'security', title: 'Security Architecture' },
    'security-architecture': { key: 'security', slug: 'security', title: 'Security Architecture' },
    'sandbox': { key: 'security', slug: 'security', title: 'Security & Sandboxing Architecture' }
  };

  // HTML5 History API Browser Router Engine
  const AppRouter = {
    registry: CALC_REGISTRY,
    isDispatching: false,
    getCalcById(id) {
      return byId.get(id);
    },

    /**
     * Resolve any pathname and query string into a concrete navigation instruction.
     * Works with:
     * - /fitness/pregnancy
     * - /financial/auto-loan
     * - /financial/mortgage
     * - /math/percentage
     * - /other/age
     * - /standard
     * - /scientific
     * - /financial?filter=auto
     * - /fitness?filter=pregnancy
     * - /calculator/pregnancy
     * - /pregnancy
     * - /
     */
    resolve(rawPath, rawSearch = '') {
      let pathStr = (rawPath || (typeof window !== 'undefined' ? window.location.pathname : '/')).trim();

      // Clean leading and trailing slashes
      pathStr = pathStr.replace(/^\/+|\/+$/g, '');

      // Parse query params
      const searchStr = rawSearch || (typeof window !== 'undefined' ? window.location.search : '');
      const queryParams = {};
      if (searchStr) {
        const cleaned = searchStr.replace(/^\?/, '');
        const sp = new URLSearchParams(cleaned);
        sp.forEach((v, k) => queryParams[k] = v);
      }

      // Root, hub, all, or index.html -> Zenith Hub
      if (!pathStr || pathStr === 'hub' || pathStr === 'all' || pathStr === 'index.html' || pathStr === 'view-zenith-hub') {
        return { type: 'hub', path: '/', title: 'All-in-One Calculator Suite' };
      }

      // Path segments
      const segments = pathStr.split('/').filter(Boolean);

      // Check for standalone pages (SEO friendly /privacy-policy, /about-us, /contact, etc.)
      const lastSegment = segments[segments.length - 1] ? segments[segments.length - 1].toLowerCase().replace(/\.html$/, '') : '';
      const firstSegment = segments[0] ? segments[0].toLowerCase().replace(/\.html$/, '') : '';
      const pageMatch = STANDALONE_PAGES[lastSegment] || STANDALONE_PAGES[firstSegment];
      if (pageMatch) {
        return {
          type: 'page',
          pageKey: pageMatch.key,
          slug: pageMatch.slug,
          path: `/${pageMatch.slug}`,
          title: pageMatch.title
        };
      }

      const directIdMatch = byId.get(segments[segments.length - 1]) || byId.get(pathStr);
      if (directIdMatch) {
        return {
          type: 'calc',
          category: directIdMatch.cat,
          id: directIdMatch.id,
          slug: directIdMatch.slug,
          path: `/${directIdMatch.cat}/${directIdMatch.slug}`,
          title: directIdMatch.title,
          calc: directIdMatch
        };
      }

      // 2. /calculator/<slug> or /calc/<slug>
      if (segments.length >= 2 && (segments[0] === 'calculator' || segments[0] === 'calc')) {
        const targetSlug = segments[1].toLowerCase();
        const found = bySlug.get(targetSlug) || byAlias.get(targetSlug) || byId.get(targetSlug);
        if (found) {
          return {
            type: 'calc',
            category: found.cat,
            id: found.id,
            slug: found.slug,
            path: `/${found.cat}/${found.slug}`,
            title: found.title,
            calc: found
          };
        }
      }

      // 3. /<category>/<slug> (e.g. /fitness/pregnancy, /financial/auto-loan)
      if (segments.length >= 2) {
        const combined = `${segments[0].toLowerCase()}/${segments[1].toLowerCase()}`;
        const found = bySlug.get(combined) || byAlias.get(combined);
        if (found) {
          return {
            type: 'calc',
            category: found.cat,
            id: found.id,
            slug: found.slug,
            path: `/${found.cat}/${found.slug}`,
            title: found.title,
            calc: found
          };
        }
      }

      // 4. Single segment (category catalog, direct slug, or keypad mode)
      if (segments.length === 1) {
        const single = segments[0].toLowerCase();

        // Keypad modes
        if (single === 'scientific' || single === 'scientific-calculator') {
          const sci = byId.get('box-sci-mode');
          return { type: 'calc', category: 'standard', id: sci.id, slug: 'scientific-calculator', path: '/scientific-calculator', title: 'Scientific Calculator', calc: sci };
        }
        if (single === 'standard' || single === 'standard-calculator') {
          const std = byId.get('box-std-mode');
          return { type: 'calc', category: 'standard', id: std.id, slug: 'standard-calculator', path: '/standard-calculator', title: 'Standard Calculator', calc: std };
        }

        // Category catalogs
        const categories = [
          'financial', 'finance',
          'fitness', 'health',
          'math', 'mathematics',
          'other', 'utility', 'utilities', 'everyday', 'internet', 'weather', 'transportation', 'entertainment'
        ];
        if (categories.includes(single)) {
          let catTarget = single;
          let filter = queryParams.filter || null;
          if (single === 'finance' || single === 'financial') {
            catTarget = 'financial';
          } else if (single === 'health' || single === 'fitness') {
            catTarget = 'fitness';
          } else if (single === 'math' || single === 'mathematics') {
            catTarget = 'math';
          } else if (single === 'internet') {
            catTarget = 'other';
            filter = 'internet';
          } else if (single === 'utility' || single === 'utilities' || single === 'everyday') {
            catTarget = 'other';
            filter = 'everyday';
          } else if (single === 'weather') {
            catTarget = 'other';
            filter = 'weather';
          } else if (single === 'transportation') {
            catTarget = 'other';
            filter = 'transportation';
          } else if (single === 'entertainment') {
            catTarget = 'other';
            filter = 'entertainment';
          } else {
            catTarget = 'other';
          }
          let catalogPath = `/${catTarget}`;
          if (queryParams.filter && queryParams.filter !== 'all') {
            catalogPath += `?filter=${encodeURIComponent(queryParams.filter)}`;
          }
          return {
            type: 'catalog',
            category: catTarget,
            filter: filter,
            path: catalogPath,
            title: this.getCategoryTitle(catTarget, filter)
          };
        }

        // Direct slug match (e.g. /pregnancy, /mortgage, /auto-loan)
        const found = bySlug.get(single) || byAlias.get(single);
        if (found) {
          return {
            type: 'calc',
            category: found.cat,
            id: found.id,
            slug: found.slug,
            path: `/${found.cat}/${found.slug}`,
            title: found.title,
            calc: found
          };
        }
      }

      // Fallback -> Zenith Hub
      return { type: 'hub', path: '/', title: 'All-in-One Calculator Suite' };
    },

    getCategoryTitle(category, filter) {
      if (category === 'financial') {
        return filter ? `Financial - ${filter.toUpperCase()} | CALC•` : 'Financial Calculators Suite | CALC•';
      }
      if (category === 'fitness') {
        if (filter === 'pregnancy') return 'Pregnancy & Maternal Calculators | CALC•';
        if (filter === 'fitness') return 'Fitness & Workout Calculators | CALC•';
        return 'Health & Fitness Suite | CALC•';
      }
      if (category === 'math') return 'Math & Algebra Solvers | CALC•';
      if (category === 'internet' || filter === 'internet') return 'Internet & Networking Tools | CALC•';
      if (category === 'utility' || category === 'everyday' || filter === 'everyday') return 'Everyday Utility Calculators | CALC•';
      if (category === 'weather' || filter === 'weather') return 'Weather & Climate Calculators | CALC•';
      if (category === 'transportation' || filter === 'transportation') return 'Transportation & Vehicle Calculators | CALC•';
      if (category === 'entertainment' || filter === 'entertainment') return 'Entertainment & Anecdotes Calculators | CALC•';
      if (category === 'other') {
        if (filter === 'internet') return 'Internet & Networking Tools | CALC•';
        if (filter === 'everyday') return 'Everyday Utility Calculators | CALC•';
        if (filter === 'weather') return 'Weather & Climate Calculators | CALC•';
        if (filter === 'transportation') return 'Transportation & Vehicle Calculators | CALC•';
        if (filter === 'entertainment') return 'Entertainment & Anecdotes Calculators | CALC•';
        if (filter === 'date') return 'Date & Time Calculators | CALC•';
        if (filter === 'housing') return 'Housing & Building Calculators | CALC•';
        if (filter === 'measurements') return 'Measurements & Science Calculators | CALC•';
        if (filter === 'electronics') return 'Electronics & Circuit Calculators | CALC•';
        if (filter === 'general') return 'Daily Utilities & Tools | CALC•';
        return 'Daily Utilities & Tools | CALC•';
      }
      if (category === 'standard') return 'Standard Calculator | CALC•';
      return BASE_APP_TITLE;
    },

    /**
     * Get the canonical clean path for a given calculator (Browser Router format)
     */
    getUrlForCalc(calcOrId) {
      let calc = typeof calcOrId === 'object' ? calcOrId : byId.get(calcOrId);
      if (!calc && typeof calcOrId === 'string') {
        calc = bySlug.get(calcOrId) || byAlias.get(calcOrId);
      }
      if (!calc) return '/';
      if (calc.cat === 'standard') {
        return calc.slug.includes('scientific') ? '/scientific-calculator' : '/standard-calculator';
      }
      return `/${calc.cat}/${calc.slug}`;
    },

    /**
     * Update URL in browser address bar using HTML5 History API (pushState)
     */
    setAddressUrl(targetPath, newTitle, replace = false) {
      if (typeof window === 'undefined') return;
      const cleanPath = targetPath.startsWith('/') ? targetPath : `/${targetPath}`;
      const currentFull = window.location.pathname + window.location.search;

      if (currentFull !== cleanPath) {
        if (window.history && window.history.pushState) {
          try {
            if (replace) {
              window.history.replaceState({ path: cleanPath }, newTitle || document.title, cleanPath);
            } else {
              window.history.pushState({ path: cleanPath }, newTitle || document.title, cleanPath);
            }
          } catch (e) {
            // Safe fallback for file:// protocol or iframe security sandboxes
          }
        }
      }

      if (newTitle) {
        document.title = `${newTitle} | ${BASE_APP_TITLE}`;
        try {
          if (typeof document !== 'undefined') {
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) {
              if (newTitle && newTitle.includes('Interest Calculator From Date to Date')) {
                metaDesc.setAttribute('content', 'Calculate exact simple and compound returns with our interest calculator from date to date. Use this free simple interest calculator from date to date, bank interest calculator, and compound interest calculator India to compute exact interest, APY, and maturity value for loans, fixed deposits, and investments.');
              } else {
                metaDesc.setAttribute('content', `Use the free, interactive ${newTitle} on CALC• Modern Calculator - 100% client-side precision calculations, instantaneous results, and comprehensive benchmarks.`);
              }
            }
            const ogTitle = document.querySelector('meta[property="og:title"]');
            if (ogTitle) {
              ogTitle.setAttribute('content', `${newTitle} | CALC• Modern Calculator`);
            }
          }
        } catch (e) {}
      }
    },

    /**
     * Notify router that a calculator has been opened in the UI.
     * Updates URL with clean browser path (e.g. /fitness/pregnancy).
     */
    onCalculatorOpened(calcId, category) {
      if (this.isDispatching) return;
      const calc = byId.get(calcId);
      if (calc) {
        const canonicalPath = this.getUrlForCalc(calc);
        this.setAddressUrl(canonicalPath, calc.title);
      } else {
        const fallbackCat = category || 'financial';
        this.setAddressUrl(`/${fallbackCat}/${calcId}`, 'Calculator');
      }
    },

    /**
     * Notify router that a catalog view has been opened (e.g. Back to Catalog or Filter click).
     */
    onCatalogOpened(category, filter = null) {
      if (this.isDispatching) return;
      let targetPath = `/${category}`;
      if (filter && filter !== 'all') {
        targetPath += `?filter=${encodeURIComponent(filter)}`;
      }
      const title = this.getCategoryTitle(category, filter);
      this.setAddressUrl(targetPath, title.replace(` | ${BASE_APP_TITLE}`, ''));
    },

    /**
     * Notify router that user returned to Zenith Hub
     */
    onHubOpened() {
      if (this.isDispatching) return;
      this.setAddressUrl('/', 'All Calculators');
      document.title = `${BASE_APP_TITLE} - All-in-One Calculator Suite`;
    },

    /**
     * Notify router that a standalone page has been opened
     */
    onPageOpened(pageKey, targetPath, title) {
      if (this.isDispatching) return;
      this.setAddressUrl(targetPath, title);
    },

    /**
     * Synchronize DOM according to a resolved route.
     */
    applyRoute(route) {
      this.isDispatching = true;
      try {
        if (route.type === 'page') {
          if (typeof window.navigateToPage === 'function') {
            window.navigateToPage(route.pageKey, false);
          } else {
            document.querySelectorAll('.view-section').forEach(sec => {
              sec.classList.toggle('active', sec.id === `view-page-${route.pageKey}`);
            });
            document.querySelectorAll('.zenith-nav-dropdown, .cat-tab-btn, .mobile-nav-item').forEach(el => {
              el.classList.remove('active');
            });
          }
          document.title = `${route.title} | ${BASE_APP_TITLE}`;
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }

        if (route.type === 'hub') {
          if (typeof window.backToZenithHub === 'function') {
            window.backToZenithHub();
          } else {
            document.querySelectorAll('.view-section').forEach(sec => {
              sec.classList.toggle('active', sec.id === 'view-zenith-hub');
            });
          }
          if (typeof window.filterZenith === 'function') {
            window.filterZenith('all');
          }
          document.querySelectorAll('.mobile-nav-item').forEach(item => {
            const itemTab = item.getAttribute('data-tab');
            item.classList.toggle('active', itemTab === 'zenith-hub' || itemTab === 'all');
          });
          document.title = `${BASE_APP_TITLE} - All-in-One Calculator Suite`;
          return;
        }

        if (route.type === 'catalog') {
          // Switch to category view
          if (typeof window.navigateToTab === 'function') {
            window.navigateToTab(route.category);
          } else {
            document.querySelectorAll('.view-section').forEach(sec => {
              sec.classList.toggle('active', sec.id === `view-${route.category}`);
            });
          }

          // Ensure catalog view is visible, detail hidden
          if (route.category === 'financial' && window.FinancialCalcs) {
            window.FinancialCalcs.showCatalog();
            if (route.filter) window.FinancialCalcs.filterCatalog(route.filter);
          } else if (route.category === 'fitness' && window.FitnessCalcs) {
            window.FitnessCalcs.showCatalog();
            if (route.filter) window.FitnessCalcs.filterCatalog(route.filter);
          } else if (route.category === 'math' && window.MathCalcs) {
            window.MathCalcs.showCatalog();
          } else if (route.category === 'other' && window.OtherCalcs) {
            window.OtherCalcs.showCatalog();
            if (route.filter) window.OtherCalcs.filterCatalog(route.filter);
          }

          document.querySelectorAll('.mobile-nav-item').forEach(item => {
            const itemTab = item.getAttribute('data-tab');
            const isMatch = (itemTab === 'zenith-hub' && route.category === 'all') ||
                            (itemTab === 'finance' && route.category === 'financial') ||
                            (itemTab === 'fitness' && route.category === 'fitness') ||
                            (itemTab === 'math' && route.category === 'math') ||
                            (itemTab === 'other' && route.category === 'other') ||
                            (itemTab === route.category);
            item.classList.toggle('active', !!isMatch);
          });

          document.title = `${route.title} | ${BASE_APP_TITLE}`;
          return;
        }

        if (route.type === 'calc') {
          const cat = route.category;
          const calcId = route.id;
          const actualViewCat = (cat === 'internet' || cat === 'utility' || cat === 'everyday' || cat === 'weather' || cat === 'transportation' || cat === 'entertainment') ? 'other' : cat;

          // 1. Switch to appropriate view section
          document.querySelectorAll('.view-section').forEach(sec => {
            sec.classList.toggle('active', sec.id === `view-${actualViewCat}`);
          });

          // 2. Sync tab pill navigation
          document.querySelectorAll('.zenith-nav-dropdown').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('onclick')?.includes(`'${actualViewCat}'`));
          });
          document.querySelectorAll('.cat-tab-btn').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.view === actualViewCat);
          });
          document.querySelectorAll('.mobile-nav-item').forEach(item => {
            const itemTab = item.getAttribute('data-tab');
            const isMatch = (itemTab === 'zenith-hub' && actualViewCat === 'all') ||
                            (itemTab === 'finance' && actualViewCat === 'financial') ||
                            (itemTab === 'fitness' && actualViewCat === 'fitness') ||
                            (itemTab === 'math' && actualViewCat === 'math') ||
                            (itemTab === 'other' && actualViewCat === 'other') ||
                            (itemTab === actualViewCat);
            item.classList.toggle('active', !!isMatch);
          });

          // 3. Open the specific calculator inside the engine
          if (cat === 'financial' && window.FinancialCalcs) {
            window.FinancialCalcs.openCalculator(calcId);
          } else if (cat === 'fitness' && window.FitnessCalcs) {
            window.FitnessCalcs.openCalculator(calcId);
          } else if (cat === 'math' && window.MathCalcs) {
            window.MathCalcs.openCalculator(calcId);
          } else if ((actualViewCat === 'other') && window.OtherCalcs) {
            window.OtherCalcs.openCalculator(calcId);
          } else if (cat === 'standard' && window.stdCalc) {
            if (calcId === 'box-sci-mode' || route.slug === 'scientific') {
              window.stdCalc.setScientificMode(true);
            } else {
              window.stdCalc.setScientificMode(false);
            }
          }

          document.title = `${route.title} | ${BASE_APP_TITLE}`;

          // Scroll to top
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } finally {
        this.isDispatching = false;
      }
    },

    /**
     * Copy direct clean URL of currently opened calculator or view
     */
    copyCurrentUrl() {
      const fullUrl = window.location.href;
      navigator.clipboard.writeText(fullUrl).then(() => {
        if (typeof window.showToast === 'function') {
          window.showToast(`Clean URL copied: ${fullUrl} 🔗`, '🔗');
        }
      }).catch(() => {
        if (typeof window.showToast === 'function') {
          window.showToast(`URL copied!`, '🔗');
        }
      });
    },

    /**
     * Main dispatch triggered by initial load or popstate
     */
    dispatch() {
      // Legacy hash migration: If user arrives with a hash like /#/fitness/pregnancy, convert it to browser router
      if (window.location.hash && window.location.hash.length > 1) {
        const hashContent = window.location.hash.replace(/^#\/?/, '');
        const resolvedFromHash = this.resolve(hashContent);
        if (resolvedFromHash && resolvedFromHash.path) {
          // Replace state with clean browser router path
          this.setAddressUrl(resolvedFromHash.path, resolvedFromHash.title, true);
          this.applyRoute(resolvedFromHash);
          return;
        }
      }

      const route = this.resolve(window.location.pathname, window.location.search);
      this.applyRoute(route);
    },

    /**
     * Initialize event listeners for HTML5 Browser Router
     */
    init() {
      // Listen for browser forward/back buttons
      window.addEventListener('popstate', () => {
        this.dispatch();
      });

      // Dispatch initial route on page load
      this.dispatch();
    }
  };

  // Expose globally
  AppRouter.registry = CALC_REGISTRY;
  window.CALC_REGISTRY = CALC_REGISTRY;
  window.AppRouter = AppRouter;

})();
