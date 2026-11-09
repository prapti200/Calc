import './globals.css';

export const metadata = {
  metadataBase: new URL('https://calcmoderncalcultor.vercel.app'),
  title: 'CALC• Modern Calculator - Professional All-In-One Calculation Suite',
  description: 'CALC• Modern Calculator - Comprehensive, interactive, professional suite of calculators for US & Indian Finance, Health & Fitness, Math Solvers, and Daily Utilities.',
  keywords: 'calculator, modern calculator, calc, scientific calculator, loan emi, mortgage calculator, 401k planner, compound interest, sip calculator, bmi gauge, unit converter, age calculator, gpa calculator',
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: 'CALC• Modern Calculator - Professional Calculators Suite',
    description: '100% Client-Side Calculation Suite for Finance, Health, Math, and Daily Utilities.',
    type: 'website',
    images: ['/assets/calc-logo-full.jpg'],
  },
};

export const viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
};

const earlyBootstrapScript = `
  (function() {
    try {
      var t = localStorage.getItem('filezenith_theme') || 'light';
      document.documentElement.setAttribute('data-theme', t);
      if (document.body) document.body.setAttribute('data-theme', t);
      var m = localStorage.getItem('calcCatalogViewMode') || 'grid';
      document.documentElement.setAttribute('data-catalog-mode', m);
      if (document.body) document.body.setAttribute('data-catalog-mode', m);
    } catch (e) {}

    window.normalizeSuiteKey = function(key) {
      if (!key) return 'all';
      key = String(key).toLowerCase().trim();
      if (key === 'finance' || key === 'financial' || key === 'fin') return 'financial';
      if (key === 'health' || key === 'fitness' || key === 'fit') return 'fitness';
      if (key === 'math' || key === 'mathematics') return 'math';
      if (key === 'utility' || key === 'utilities' || key === 'other' || key === 'everyday' || key === 'internet' || key === 'weather' || key === 'transportation' || key === 'entertainment') return 'other';
      if (key === 'standard' || key === 'scientific') return 'standard';
      if (key === 'zenith-hub' || key === 'hub' || key === 'all') return 'all';
      return key;
    };

    window.navigateToTab = function(tabKey, btnEl) {
      var navKey = window.normalizeSuiteKey(tabKey);
      var secId = (navKey === 'all') ? 'view-zenith-hub' : ('view-' + navKey);
      var sections = document.querySelectorAll('.view-section');
      for (var i = 0; i < sections.length; i++) {
        sections[i].classList.toggle('active', sections[i].id === secId);
      }
      var pills = document.querySelectorAll('.zenith-nav-dropdown');
      for (var j = 0; j < pills.length; j++) {
        var p = pills[j];
        var match = (btnEl && p === btnEl) || (!btnEl && p.getAttribute('onclick') && (
          p.getAttribute('onclick').indexOf("'" + navKey + "'") !== -1 ||
          (navKey === 'financial' && p.getAttribute('onclick').indexOf("'finance'") !== -1) ||
          (navKey === 'all' && p.getAttribute('onclick').indexOf("'all'") !== -1)
        ));
        p.classList.toggle('active', !!match);
      }
      var menuItems = document.querySelectorAll('.mobile-nav-item');
      for (var k = 0; k < menuItems.length; k++) {
        var m = menuItems[k];
        var mTab = m.getAttribute('data-tab');
        var mMatch = (mTab === 'zenith-hub' && navKey === 'all') ||
                     (mTab === 'finance' && navKey === 'financial') ||
                     (mTab === 'fitness' && navKey === 'fitness') ||
                     (mTab === 'math' && navKey === 'math') ||
                     (mTab === 'other' && navKey === 'other') ||
                     (mTab === navKey);
        m.classList.toggle('active', !!mMatch);
      }
      var catViews = {
        'financial': { cat: 'fin-catalog-view', det: 'fin-detail-view', obj: window.FinancialCalcs },
        'fitness': { cat: 'fit-catalog-view', det: 'fit-detail-view', obj: window.FitnessCalcs },
        'math': { cat: 'math-catalog-view', det: 'math-detail-view', obj: window.MathCalcs },
        'other': { cat: 'other-catalog-view', det: 'other-detail-view', obj: window.OtherCalcs }
      };
      if (catViews[navKey]) {
        var cEl = document.getElementById(catViews[navKey].cat);
        var dEl = document.getElementById(catViews[navKey].det);
        if (cEl) cEl.style.display = 'block';
        if (dEl) dEl.style.display = 'none';
        if (catViews[navKey].obj && typeof catViews[navKey].obj.showCatalog === 'function') {
          catViews[navKey].obj.showCatalog();
        }
      } else if (navKey === 'standard' && window.stdCalc) {
        window.stdCalc.setScientificMode(true);
      }
      if (!window.AppRouter || !window.AppRouter.isDispatching) {
        try {
          var targetPath = (navKey === 'all') ? '/' : ('/' + navKey);
          if (window.location.pathname !== targetPath) {
            history.pushState({ path: targetPath }, '', targetPath);
          }
        } catch (_) {}
      }
      if (window.AppRouter && !window.AppRouter.isDispatching) {
        if (navKey === 'all') {
          window.AppRouter.onHubOpened();
        } else {
          window.AppRouter.onCatalogOpened(navKey);
        }
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.handleMobileNavSelect = function(tabKey, btnEl) {
      if (typeof window.closeMobileNavMenu === 'function') {
        window.closeMobileNavMenu(false);
      } else {
        var pop = document.getElementById('mobile-nav-popover');
        if (pop) pop.classList.remove('open');
        var btn = document.getElementById('mobile-menu-toggle-btn');
        if (btn) {
          btn.classList.remove('active');
          btn.setAttribute('aria-expanded', 'false');
        }
      }
      var navKey = window.normalizeSuiteKey(tabKey);
      window.navigateToTab(navKey, btnEl);
    };

    window.toggleMobileNavMenu = function(e) {
      if (e && e.stopPropagation) e.stopPropagation();
      var pop = document.getElementById('mobile-nav-popover');
      var btn = document.getElementById('mobile-menu-toggle-btn');
      if (!pop) return;
      if (pop.classList.contains('open')) {
        if (typeof window.closeMobileNavMenu === 'function') {
          window.closeMobileNavMenu(true);
        } else {
          pop.classList.remove('open');
          if (btn) {
            btn.classList.remove('active');
            btn.setAttribute('aria-expanded', 'false');
          }
        }
      } else {
        if (typeof window.openMobileNavMenu === 'function') {
          window.openMobileNavMenu();
        } else {
          pop.classList.add('open');
          if (btn) {
            btn.classList.add('active');
            btn.setAttribute('aria-expanded', 'true');
          }
        }
      }
    };

    window.openMobileNavMenu = function() {
      var pop = document.getElementById('mobile-nav-popover');
      var btn = document.getElementById('mobile-menu-toggle-btn');
      if (!pop) return;
      pop.classList.add('open');
      if (btn) {
        btn.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      }
      try {
        history.pushState({ mobileOverlay: 'suites-menu' }, '', window.location.href);
      } catch (_) {}
    };

    window.closeMobileNavMenu = function(popHistory) {
      if (typeof popHistory === 'undefined') popHistory = true;
      var pop = document.getElementById('mobile-nav-popover');
      var btn = document.getElementById('mobile-menu-toggle-btn');
      var wasOpen = pop && pop.classList.contains('open');
      if (pop) pop.classList.remove('open');
      if (btn) {
        btn.classList.remove('active');
        btn.setAttribute('aria-expanded', 'false');
      }
      if (wasOpen && popHistory && history.state && history.state.mobileOverlay === 'suites-menu') {
        history.back();
      }
    };
  })();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <head>
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
        <link rel="stylesheet" href="/css/style.css?v=20261109_v60" />
        <link rel="stylesheet" href="/css/calculators.css?v=20261109_v60" />
        <script dangerouslySetInnerHTML={{ __html: earlyBootstrapScript }} />
      </head>
      <body>
        {children}

        {/* Calculation Engines & App Logic */}
        <script src="/js/router.js?v=20261109_v60" />
        <script src="/js/standard-calc.js?v=20261109_v60" />
        <script src="/js/financial-calcs.js?v=20261109_v60" />
        <script src="/js/fitness-calcs.js?v=20261109_v60" />
        <script src="/js/math-calcs.js?v=20261109_v60" />
        <script src="/js/other-calcs.js?v=20261109_v60" />
        <script src="/js/seo-guide.js?v=20261109_v60" />
        <script src="/js/html2pdf.bundle.min.js" />
        <script src="/js/pdf-report.js" />
        <script src="/js/app.js?v=20261109_v60" />
      </body>
    </html>
  );
}
