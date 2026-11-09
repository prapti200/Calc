import fs from 'fs';
import path from 'path';
import { getCalc, STANDALONE_PAGES, normalizeSuiteKey } from './registry.js';

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
      html = html.replace(new RegExp(`id="${targetCalc.id}"(?:\s+style="[^"]*")?`), `id="${targetCalc.id}" style="display:block;"`);
    }
  }

  return html;
}

