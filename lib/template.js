import fs from 'fs';
import path from 'path';
import { getCalc, STANDALONE_PAGES, normalizeSuiteKey } from './registry.js';
import { getInflationGuideHtml } from './inflation-guide.js';
import { getHelocGuideHtml } from './heloc-guide.js';
import { getPayCommissionGuideHtml } from './pay-commission-guide.js';
import { getSalaryGuideHtml } from './salary-guide.js';
import { getAdpSalaryGuideHtml } from './adp-salary-guide.js';

let cachedTemplate = null;

function loadBaseTemplate() {
  if (cachedTemplate) return cachedTemplate;
  const indexPath = path.join(process.cwd(), 'index.html');
  const indexHtml = fs.readFileSync(indexPath, 'utf8');

  const bodyStart = indexHtml.indexOf('<body>') + '<body>'.length;
  const scriptsStart = indexHtml.indexOf('<!-- Scripts -->');
  cachedTemplate = indexHtml.slice(bodyStart, scriptsStart);
  return cachedTemplate;
}

const SUITE_MAP = {
  'financial': { sec: 'view-financial', catView: 'fin-catalog-view', detView: 'fin-detail-view', unitClass: 'fin-calc-unit', nav: 'financial' },
  'finance': { sec: 'view-financial', catView: 'fin-catalog-view', detView: 'fin-detail-view', unitClass: 'fin-calc-unit', nav: 'financial' },
  'fitness': { sec: 'view-fitness', catView: 'fit-catalog-view', detView: 'fit-detail-view', unitClass: 'fit-calc-unit', nav: 'fitness' },
  'health': { sec: 'view-fitness', catView: 'fit-catalog-view', detView: 'fit-detail-view', unitClass: 'fit-calc-unit', nav: 'fitness' },
  'math': { sec: 'view-math', catView: 'math-catalog-view', detView: 'math-detail-view', unitClass: 'math-calc-unit', nav: 'math' },
  'other': { sec: 'view-other', catView: 'other-catalog-view', detView: 'other-detail-view', unitClass: 'other-calc-unit', nav: 'other' },
  'utilities': { sec: 'view-other', catView: 'other-catalog-view', detView: 'other-detail-view', unitClass: 'other-calc-unit', nav: 'other' },
  'utility': { sec: 'view-other', catView: 'other-catalog-view', detView: 'other-detail-view', unitClass: 'other-calc-unit', nav: 'other' },
  'internet': { sec: 'view-other', catView: 'other-catalog-view', detView: 'other-detail-view', unitClass: 'other-calc-unit', nav: 'other' },
  'everyday': { sec: 'view-other', catView: 'other-catalog-view', detView: 'other-detail-view', unitClass: 'other-calc-unit', nav: 'other' },
  'weather': { sec: 'view-other', catView: 'other-catalog-view', detView: 'other-detail-view', unitClass: 'other-calc-unit', nav: 'other' },
  'transportation': { sec: 'view-other', catView: 'other-catalog-view', detView: 'other-detail-view', unitClass: 'other-calc-unit', nav: 'other' },
  'entertainment': { sec: 'view-other', catView: 'other-calc-view', detView: 'other-detail-view', unitClass: 'other-calc-unit', nav: 'other' },
  'standard': { sec: 'view-standard', nav: 'standard' }
};

export function getAppHtml(routePath) {
  let html = loadBaseTemplate();
  routePath = (routePath || '/').replace(/^\/+|\/+$/g, '');

  let activeSectionId = 'view-zenith-hub';
  let activeNavTab = 'all';
  let targetCalc = null;
  let suiteKey = null;

  if (!routePath || routePath === 'all' || routePath === 'hub') {
    activeSectionId = 'view-zenith-hub';
    activeNavTab = 'all';
  } else if (routePath === 'standard' || routePath === 'standard-calculator' || routePath === 'scientific' || routePath === 'scientific-calculator') {
    activeSectionId = 'view-standard';
    activeNavTab = 'standard';
  } else if (STANDALONE_PAGES[routePath]) {
    const pageInfo = STANDALONE_PAGES[routePath];
    activeSectionId = `view-page-${pageInfo.key}`;
    activeNavTab = '';
  } else {
    const parts = routePath.split('/');
    const cat = parts[0].toLowerCase();
    const slug = parts[1] ? parts[1].toLowerCase() : null;

    if (!slug) {
      // Could be suite or direct calc slug
      targetCalc = getCalc(cat);
      if (targetCalc) {
        suiteKey = targetCalc.cat;
        const suite = SUITE_MAP[suiteKey] || SUITE_MAP.other;
        activeSectionId = suite.sec;
        activeNavTab = suite.nav;
      } else {
        suiteKey = normalizeSuiteKey(cat);
        const suite = SUITE_MAP[suiteKey] || SUITE_MAP.other;
        activeSectionId = suite.sec;
        activeNavTab = suite.nav;
      }
    } else {
      targetCalc = getCalc(cat, slug);
      suiteKey = targetCalc ? targetCalc.cat : normalizeSuiteKey(cat);
      const suite = SUITE_MAP[suiteKey] || SUITE_MAP.other;
      activeSectionId = suite.sec;
      activeNavTab = suite.nav;
    }
  }

  // 1. Activate target section
  html = html.replace(/<section\s+class="view-section(?:\s+active)?"\s+id="([^"]+)"/g, (m, id) => {
    return `<section class="view-section${id === activeSectionId ? ' active' : ''}" id="${id}"`;
  });

  // 2. Activate header ribbon pill
  html = html.replace(/<button\s+class="zenith-nav-dropdown(?:\s+active)?"([^>]*onclick="navigateToTab\('([^']+)'[^"]*"[^>]*)>/g, (m, rest, tabKey) => {
    const isAct = (activeNavTab === tabKey) || (activeNavTab === 'financial' && tabKey === 'financial');
    return `<button class="zenith-nav-dropdown${isAct ? ' active' : ''}"${rest}>`;
  });

  // 3. If target calculator, show detail view and hide catalog
  if (targetCalc && suiteKey) {
    const suite = SUITE_MAP[suiteKey] || SUITE_MAP[normalizeSuiteKey(suiteKey)];
    if (suite && suite.catView && suite.detView) {
      html = html.replace(new RegExp(`id="${suite.catView}"(?:\s+style="[^"]*")?`), `id="${suite.catView}" style="display:none;"`);
      html = html.replace(new RegExp(`id="${suite.detView}"(?:\s+style="[^"]*")?`), `id="${suite.detView}" style="display:block;"`);
      
      // Hide all panels of this suite
      html = html.replace(new RegExp(`(<div[^>]*class="[^"]*calc-panel\\s+${suite.unitClass}[^"]*"(?:\\s+style="[^"]*")?)`, 'g'), (m) => {
        return m.replace(/style="[^"]*"/, 'style="display:none;"');
      });
      // Explicitly show target panel
      html = html.replace(new RegExp(`(<div[^>]*class="[^"]*calc-panel[^"]*"[^>]*\\bid=["']${targetCalc.id}["'][^>]*)style="[^"]*"`, 'i'), '$1style="display:block;"');

      // Activate switcher pill for targetCalc
      html = html.replace(/class="switcher-pill\s+active"/g, 'class="switcher-pill"');
      html = html.replace(new RegExp(`class="switcher-pill"([^>]*data-target="${targetCalc.id}")`), 'class="switcher-pill active"$1');
    }

    if (targetCalc.id === 'sec-inflation-calc' || targetCalc.slug === 'inflation-calculator') {
      html = html.replace(/<meta\s+name="keywords"\s+content="[^"]*"/, '<meta name="keywords" content="inflation calculator, inflation calculator india, future value of money calculator, purchasing power calculator, CPI inflation calculator India, rupee value over time, inflation adjusted return calculator, historical inflation rate in India, CAGR inflation formula, consumer price index, rbi inflation target, cpi inflation, mospi cpi"');
      const finGuideStart = html.indexOf('<div class="calc-seo-guide-container" id="fin-seo-guide-container">');
      if (finGuideStart !== -1) {
        const secEnd = html.indexOf('</section>', finGuideStart);
        if (secEnd !== -1) {
          const guideCloseDiv = html.indexOf('</div>', secEnd);
          if (guideCloseDiv !== -1) {
            const prefix = '<div class="calc-seo-guide-container" id="fin-seo-guide-container">';
            html = html.slice(0, finGuideStart + prefix.length) + getInflationGuideHtml() + html.slice(guideCloseDiv);
          }
        }
      }
    }

    if (targetCalc.id === 'sec-heloc-calc' || targetCalc.slug === 'heloc-calculator') {
      const finGuideStart = html.indexOf('<div class="calc-seo-guide-container" id="fin-seo-guide-container">');
      if (finGuideStart !== -1) {
        const secEnd = html.indexOf('</section>', finGuideStart);
        if (secEnd !== -1) {
          const guideCloseDiv = html.indexOf('</div>', secEnd);
          if (guideCloseDiv !== -1) {
            const prefix = '<div class="calc-seo-guide-container" id="fin-seo-guide-container">';
            html = html.slice(0, finGuideStart + prefix.length) + getHelocGuideHtml() + html.slice(guideCloseDiv);
          }
        }
      }
    }
    if (targetCalc.id === 'sec-8th-pay-commission-calc' || targetCalc.slug === '8th-pay-commission-salary-calculator') {
      html = html.replace(/<title>.*?<\/title>/, '<title>8th Pay Commission Salary Calculator 2026 – Fitment & Matrix</title>');
      html = html.replace(/<meta\s+name="description"\s+content="[^"]*"/, '<meta name="description" content="Free 8th Pay Commission Salary Calculator (8th CPC) to estimate your revised basic pay, HRA, TA, NPS, and net monthly in-hand salary across Pay Levels 1 to 18.">');
      html = html.replace(/<meta\s+name="keywords"\s+content="[^"]*"/, '<meta name="keywords" content="8th pay commission salary calculator, 8th cpc salary calculator, 8th pay commission pay matrix calculator, fitment factor calculator, 7th vs 8th pay commission salary comparison, 8th pay commission expected salary hike, central government employee salary calculator 2026">');

      const finGuideStart = html.indexOf('<div class="calc-seo-guide-container" id="fin-seo-guide-container">');
      if (finGuideStart !== -1) {
        const secEnd = html.indexOf('</section>', finGuideStart);
        if (secEnd !== -1) {
          const guideCloseDiv = html.indexOf('</div>', secEnd);
          if (guideCloseDiv !== -1) {
            const prefix = '<div class="calc-seo-guide-container" id="fin-seo-guide-container">';
            html = html.slice(0, finGuideStart + prefix.length) + getPayCommissionGuideHtml() + html.slice(guideCloseDiv);
          }
        }
      }
    }
    if (targetCalc.id === 'sec-salary-calc' || targetCalc.slug === 'salary-calculator') {
      html = html.replace(/<title>.*?<\/title>/, '<title>In-Hand Salary Calculator India (FY 2026-27) – CTC to Net</title>');
      html = html.replace(/<meta\s+name="description"\s+content="[^"]*"/, '<meta name="description" content="Free In-Hand Salary Calculator India for FY 2026-27. Convert annual CTC to monthly take-home pay with EPF, Professional Tax, Gratuity &amp; New vs Old Tax Regime.">');
      html = html.replace(/<meta\s+name="keywords"\s+content="[^"]*"/, '<meta name="keywords" content="salary calculator, in hand salary calculator, ctc to in hand salary calculator, take home salary calculator india, monthly salary calculator, gross to net salary calculator, ctc breakdown calculator fy 2026-27, new vs old tax regime salary calculator">');

      const finGuideStart = html.indexOf('<div class="calc-seo-guide-container" id="fin-seo-guide-container">');
      if (finGuideStart !== -1) {
        const secEnd = html.indexOf('</section>', finGuideStart);
        if (secEnd !== -1) {
          const guideCloseDiv = html.indexOf('</div>', secEnd);
          if (guideCloseDiv !== -1) {
            const prefix = '<div class="calc-seo-guide-container" id="fin-seo-guide-container">';
            html = html.slice(0, finGuideStart + prefix.length) + getSalaryGuideHtml() + html.slice(guideCloseDiv);
          }
        }
      }
    }
    if (targetCalc.id === 'sec-adp-salary-calc' || targetCalc.slug === 'adp-salary-calculator') {
      html = html.replace(/<title>.*?<\/title>/, '<title>ADP Salary Calculator 2026 – US Take-Home Paycheck Estimator</title>');
      html = html.replace(/<meta\s+name="description"\s+content="[^"]*"/, '<meta name="description" content="Free ADP-style Salary &amp; Paycheck Calculator updated for 2026 IRS tax brackets, $16,100 standard deduction, FICA (Social Security &amp; Medicare), and 401(k) deductions.">');
      html = html.replace(/<meta\s+name="keywords"\s+content="[^"]*"/, '<meta name="keywords" content="adp salary calculator, adp paycheck calculator, salary paycheck calculator 2026, hourly to salary paycheck calculator, take home pay calculator usa, federal tax withholding calculator 2026, net pay calculator after taxes">');

      const finGuideStart = html.indexOf('<div class="calc-seo-guide-container" id="fin-seo-guide-container">');
      if (finGuideStart !== -1) {
        const secEnd = html.indexOf('</section>', finGuideStart);
        if (secEnd !== -1) {
          const guideCloseDiv = html.indexOf('</div>', secEnd);
          if (guideCloseDiv !== -1) {
            const prefix = '<div class="calc-seo-guide-container" id="fin-seo-guide-container">';
            html = html.slice(0, finGuideStart + prefix.length) + getAdpSalaryGuideHtml() + html.slice(guideCloseDiv);
          }
        }
      }
    }
  }

  return html;
}

