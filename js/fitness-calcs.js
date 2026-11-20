/* ==========================================================================
   CALC• MODERN CALCULATOR - FITNESS & HEALTH CALCULATORS ENGINE (20 CLINICAL & MATERNAL TOOLS)
   ========================================================================== */

const FitnessCalcs = {
  bmiUnit: 'metric', // 'metric' or 'imperial'
  bmrGender: 'male',
  bodyFatGender: 'male',
  calGender: 'male',
  calUnit: 'metric',
  paceMode: 'pace',
  paceDistUnit: 'km',
  pacePaceUnit: 'km',
  armyGender: 'male',
  armyUnit: 'imperial',
  lbmGender: 'male',
  lbmUnit: 'metric',
  hwGender: 'male',
  hwUnit: 'metric',
  cbUnit: 'metric',
  ormUnit: 'kg',

  // Maternal & Reproductive Health State
  pwUnit: 'metric', // 'metric' or 'imperial'
  pwType: 'singleton', // 'singleton' or 'twins'
  pregMethod: 'lmp', // 'lmp', 'duedate', 'conception', 'ultrasound'
  pconcMethod: 'edd', // 'edd', 'lmp', 'ultrasound'
  ddMethod: 'lmp', // 'lmp', 'conception', 'ultrasound', 'ivf'
  ddIvfType: 'day5', // 'day3' or 'day5'
  concMode: 'fertile', // 'fertile' or 'target'

  // 9 New Health, Nutrition & Clinical States
  macroUnit: 'metric',
  macroGender: 'male',
  carbUnit: 'metric',
  protUnit: 'metric',
  tdeeUnit: 'metric',
  tdeeGender: 'male',
  gfrUnit: 'mg_dl',
  gfrGender: 'male',
  btUnit: 'metric',
  btGender: 'male',
  bsaUnit: 'metric',
  bacUnit: 'metric',
  bacGender: 'male',

  // Date Utilities for Accurate Calendrical & Gestational Math
  parseLocalDate(dateStr) {
    if (!dateStr) return new Date();
    const parts = String(dateStr).split('-');
    if (parts.length === 3) {
      return new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
    }
    return new Date(dateStr);
  },

  addDays(date, days) {
    const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    d.setDate(d.getDate() + days);
    return d;
  },

  formatDate(date) {
    if (!date || isNaN(date.getTime())) return '—';
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  },

  formatDateShort(date) {
    if (!date || isNaN(date.getTime())) return '—';
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  },

  toInputDate(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  },

  getZodiacSign(month, day) {
    // month is 1-indexed (1 = Jan, 12 = Dec)
    const signs = [
      { name: 'Capricorn ♑', start: [1, 1], end: [1, 19] },
      { name: 'Aquarius ♒', start: [1, 20], end: [2, 18] },
      { name: 'Pisces ♓', start: [2, 19], end: [3, 20] },
      { name: 'Aries ♈', start: [3, 21], end: [4, 19] },
      { name: 'Taurus ♉', start: [4, 20], end: [5, 20] },
      { name: 'Gemini ♊', start: [5, 21], end: [6, 20] },
      { name: 'Cancer ♋', start: [6, 21], end: [7, 22] },
      { name: 'Leo ♌', start: [7, 23], end: [8, 22] },
      { name: 'Virgo ♍', start: [8, 23], end: [9, 22] },
      { name: 'Libra ♎', start: [9, 23], end: [10, 22] },
      { name: 'Scorpio ♏', start: [10, 23], end: [11, 21] },
      { name: 'Sagittarius ♐', start: [11, 22], end: [12, 21] },
      { name: 'Capricorn ♑', start: [12, 22], end: [12, 31] }
    ];
    for (const s of signs) {
      if ((month === s.start[0] && day >= s.start[1]) || (month === s.end[0] && day <= s.end[1])) {
        return s.name;
      }
    }
    return 'Capricorn ♑';
  },

  // 2. DEDICATED CALORIE CALCULATOR & MACRO PLANNER
  // 3. BODY FAT % CALCULATOR (US Navy Method & Deurenberg BMI Method)
  bfUnit: 'metric',      // 'metric' or 'us'
  bfMethod: 'navy',      // 'navy' or 'bmi'
  bfGender: 'male',      // 'male' or 'female'

  setBfUnit(unit, btn) {
    if (this.bfUnit === unit) return;
    const oldUnit = this.bfUnit;
    this.bfUnit = unit;

    const btnMetric = document.getElementById('bf-unit-metric');
    const btnUs = document.getElementById('bf-unit-us');
    if (btnMetric && btnUs) {
      if (unit === 'metric') {
        btnMetric.className = 'bf-toggle-pill active';
        btnMetric.style.background = '#ffffff';
        btnMetric.style.color = '#2563eb';
        btnMetric.style.fontWeight = '700';
        btnMetric.style.boxShadow = '0 1px 2px rgba(0,0,0,0.06)';
        btnUs.className = 'bf-toggle-pill';
        btnUs.style.background = 'transparent';
        btnUs.style.color = '#64748b';
        btnUs.style.fontWeight = '600';
        btnUs.style.boxShadow = 'none';
      } else {
        btnUs.className = 'bf-toggle-pill active';
        btnUs.style.background = '#ffffff';
        btnUs.style.color = '#2563eb';
        btnUs.style.fontWeight = '700';
        btnUs.style.boxShadow = '0 1px 2px rgba(0,0,0,0.06)';
        btnMetric.className = 'bf-toggle-pill';
        btnMetric.style.background = 'transparent';
        btnMetric.style.color = '#64748b';
        btnMetric.style.fontWeight = '600';
        btnMetric.style.boxShadow = 'none';
      }
    }

    const weightEl = document.getElementById('bf-weight');
    const heightEl = document.getElementById('bf-height');
    const neckEl = document.getElementById('bf-neck');
    const waistEl = document.getElementById('bf-waist');
    const hipEl = document.getElementById('bf-hip');

    if (unit === 'us' && oldUnit === 'metric') {
      if (weightEl) weightEl.value = (parseFloat(weightEl.value) * 2.20462).toFixed(1);
      if (heightEl) heightEl.value = (parseFloat(heightEl.value) / 2.54).toFixed(1);
      if (neckEl) neckEl.value = (parseFloat(neckEl.value) / 2.54).toFixed(1);
      if (waistEl) waistEl.value = (parseFloat(waistEl.value) / 2.54).toFixed(1);
      if (hipEl) hipEl.value = (parseFloat(hipEl.value) / 2.54).toFixed(1);
      const wLbl = document.getElementById('bf-weight-unit-label'); if (wLbl) wLbl.textContent = 'lbs';
      const hLbl = document.getElementById('bf-height-unit-label'); if (hLbl) hLbl.textContent = 'in';
      const nLbl = document.getElementById('bf-neck-unit-label'); if (nLbl) nLbl.textContent = 'in';
      const wstLbl = document.getElementById('bf-waist-unit-label'); if (wstLbl) wstLbl.textContent = 'in';
      const hpLbl = document.getElementById('bf-hip-unit-label'); if (hpLbl) hpLbl.textContent = 'in';
    } else if (unit === 'metric' && oldUnit === 'us') {
      if (weightEl) weightEl.value = (parseFloat(weightEl.value) / 2.20462).toFixed(1);
      if (heightEl) heightEl.value = (parseFloat(heightEl.value) * 2.54).toFixed(1);
      if (neckEl) neckEl.value = (parseFloat(neckEl.value) * 2.54).toFixed(1);
      if (waistEl) waistEl.value = (parseFloat(waistEl.value) * 2.54).toFixed(1);
      if (hipEl) hipEl.value = (parseFloat(hipEl.value) * 2.54).toFixed(1);
      const wLbl = document.getElementById('bf-weight-unit-label'); if (wLbl) wLbl.textContent = 'kg';
      const hLbl = document.getElementById('bf-height-unit-label'); if (hLbl) hLbl.textContent = 'cm';
      const nLbl = document.getElementById('bf-neck-unit-label'); if (nLbl) nLbl.textContent = 'cm';
      const wstLbl = document.getElementById('bf-waist-unit-label'); if (wstLbl) wstLbl.textContent = 'cm';
      const hpLbl = document.getElementById('bf-hip-unit-label'); if (hpLbl) hpLbl.textContent = 'cm';
    }

    this.calcBodyFat();
  },

  setBfMethod(method, btn) {
    this.bfMethod = method;
    const btnNavy = document.getElementById('bf-method-navy');
    const btnBmi = document.getElementById('bf-method-bmi');
    if (btnNavy && btnBmi) {
      if (method === 'navy') {
        btnNavy.className = 'bf-toggle-pill active';
        btnNavy.style.background = '#ffffff';
        btnNavy.style.color = '#2563eb';
        btnNavy.style.fontWeight = '700';
        btnNavy.style.boxShadow = '0 1px 2px rgba(0,0,0,0.06)';
        btnBmi.className = 'bf-toggle-pill';
        btnBmi.style.background = 'transparent';
        btnBmi.style.color = '#64748b';
        btnBmi.style.fontWeight = '600';
        btnBmi.style.boxShadow = 'none';
      } else {
        btnBmi.className = 'bf-toggle-pill active';
        btnBmi.style.background = '#ffffff';
        btnBmi.style.color = '#2563eb';
        btnBmi.style.fontWeight = '700';
        btnBmi.style.boxShadow = '0 1px 2px rgba(0,0,0,0.06)';
        btnNavy.className = 'bf-toggle-pill';
        btnNavy.style.background = 'transparent';
        btnNavy.style.color = '#64748b';
        btnNavy.style.fontWeight = '600';
        btnNavy.style.boxShadow = 'none';
      }
    }
    this.calcBodyFat();
  },

  setBfGender(gender, btn) {
    this.bfGender = gender;
    this.bodyFatGender = gender;
    const btnMale = document.getElementById('bf-gender-male');
    const btnFemale = document.getElementById('bf-gender-female');
    if (btnMale && btnFemale) {
      if (gender === 'male') {
        btnMale.className = 'bf-gender-pill active';
        btnMale.style.background = '#ffffff';
        btnMale.style.color = '#2563eb';
        btnMale.style.fontWeight = '700';
        btnMale.style.boxShadow = '0 1px 2px rgba(0,0,0,0.06)';
        btnFemale.className = 'bf-gender-pill';
        btnFemale.style.background = 'transparent';
        btnFemale.style.color = '#64748b';
        btnFemale.style.fontWeight = '600';
        btnFemale.style.boxShadow = 'none';
      } else {
        btnFemale.className = 'bf-gender-pill active';
        btnFemale.style.background = '#ffffff';
        btnFemale.style.color = '#2563eb';
        btnFemale.style.fontWeight = '700';
        btnFemale.style.boxShadow = '0 1px 2px rgba(0,0,0,0.06)';
        btnMale.className = 'bf-gender-pill';
        btnMale.style.background = 'transparent';
        btnMale.style.color = '#64748b';
        btnMale.style.fontWeight = '600';
        btnMale.style.boxShadow = 'none';
      }
    }

    const hipGroup = document.getElementById('bf-hip-group');
    if (hipGroup) {
      hipGroup.style.display = gender === 'female' ? 'block' : 'none';
    }

    const waistHint = document.getElementById('bf-waist-hint');
    if (waistHint) {
      waistHint.textContent = gender === 'male' ? 'Men: at navel (relaxed exhalation)' : 'Women: narrowest point of torso';
    }

    this.calcBodyFat();
  },

  onBfInput() {
    this.calcBodyFat();
  },

  calcBodyFat() {
    const age = parseFloat(document.getElementById('bf-age')?.value) || 30;
    const rawWeight = parseFloat(document.getElementById('bf-weight')?.value) || 75;
    const rawHeight = parseFloat(document.getElementById('bf-height')?.value) || 175;
    const rawNeck = parseFloat(document.getElementById('bf-neck')?.value) || 38;
    const rawWaist = parseFloat(document.getElementById('bf-waist')?.value) || 85;
    const rawHip = parseFloat(document.getElementById('bf-hip')?.value) || 95;

    const isUS = this.bfUnit === 'us';
    const heightCm = isUS ? rawHeight * 2.54 : rawHeight;
    const weightKg = isUS ? rawWeight / 2.20462 : rawWeight;
    const neckCm = isUS ? rawNeck * 2.54 : rawNeck;
    const waistCm = isUS ? rawWaist * 2.54 : rawWaist;
    const hipCm = isUS ? rawHip * 2.54 : rawHip;

    const alertEl = document.getElementById('bf-validation-alert');
    const msgEl = document.getElementById('bf-validation-msg');

    if (heightCm <= 50 || weightKg <= 10) {
      if (alertEl && msgEl) {
        msgEl.textContent = 'Please enter realistic height and weight values.';
        alertEl.style.display = 'block';
      }
      return;
    }

    if (this.bfMethod === 'navy') {
      if (this.bfGender === 'male' && (waistCm - neckCm <= 0)) {
        if (alertEl && msgEl) {
          msgEl.textContent = 'Waist circumference must be greater than neck circumference.';
          alertEl.style.display = 'block';
        }
        return;
      }
      if (this.bfGender === 'female' && ((waistCm + hipCm - neckCm) <= 0)) {
        if (alertEl && msgEl) {
          msgEl.textContent = 'Waist + Hip measurements must be greater than neck circumference.';
          alertEl.style.display = 'block';
        }
        return;
      }
    }

    if (alertEl) alertEl.style.display = 'none';

    // 1. U.S. Navy Method
    let navyBf = 0;
    try {
      if (this.bfGender === 'male') {
        navyBf = 495 / (1.0324 - 0.19077 * Math.log10(Math.max(1, waistCm - neckCm)) + 0.15456 * Math.log10(heightCm)) - 450;
      } else {
        navyBf = 495 / (1.29579 - 0.35004 * Math.log10(Math.max(1, waistCm + hipCm - neckCm)) + 0.22100 * Math.log10(heightCm)) - 450;
      }
    } catch (e) {
      navyBf = 16.4;
    }
    navyBf = Math.max(2, Math.min(65, Math.round(navyBf * 10) / 10));

    // 2. Deurenberg BMI Formula
    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM);
    let bmiBf = (this.bfGender === 'male') ? ((1.20 * bmi) + (0.23 * age) - 16.2) : ((1.20 * bmi) + (0.23 * age) - 5.4);
    bmiBf = Math.max(2, Math.min(65, Math.round(bmiBf * 10) / 10));

    const activeBf = (this.bfMethod === 'bmi') ? bmiBf : navyBf;

    // 3. Mass Split
    const fatMassKg = (weightKg * activeBf) / 100;
    const leanMassKg = Math.max(0, weightKg - fatMassKg);
    const fatMassLbs = fatMassKg * 2.20462;
    const leanMassLbs = leanMassKg * 2.20462;

    // 4. ACE Category
    let category = '';
    let categoryColor = '#15803d';
    let categoryBg = '#dcfce7';
    let categoryBorder = '#86efac';

    if (this.bfGender === 'male') {
      if (activeBf < 2) {
        category = 'Extremely Low'; categoryColor = '#b91c1c'; categoryBg = '#fef2f2'; categoryBorder = '#fecaca';
      } else if (activeBf < 6) {
        category = 'Essential Fat'; categoryColor = '#0369a1'; categoryBg = '#f0f9ff'; categoryBorder = '#bae6fd';
      } else if (activeBf < 14) {
        category = 'Athletes'; categoryColor = '#15803d'; categoryBg = '#f0fdf4'; categoryBorder = '#bbf7d0';
      } else if (activeBf < 18) {
        category = 'Fitness'; categoryColor = '#059669'; categoryBg = '#ecfdf5'; categoryBorder = '#a7f3d0';
      } else if (activeBf < 25) {
        category = 'Average'; categoryColor = '#b45309'; categoryBg = '#fefce8'; categoryBorder = '#fef08a';
      } else {
        category = 'Obese'; categoryColor = '#b91c1c'; categoryBg = '#fef2f2'; categoryBorder = '#fecaca';
      }
    } else {
      if (activeBf < 10) {
        category = 'Extremely Low'; categoryColor = '#b91c1c'; categoryBg = '#fef2f2'; categoryBorder = '#fecaca';
      } else if (activeBf < 14) {
        category = 'Essential Fat'; categoryColor = '#0369a1'; categoryBg = '#f0f9ff'; categoryBorder = '#bae6fd';
      } else if (activeBf < 21) {
        category = 'Athletes'; categoryColor = '#15803d'; categoryBg = '#f0fdf4'; categoryBorder = '#bbf7d0';
      } else if (activeBf < 25) {
        category = 'Fitness'; categoryColor = '#059669'; categoryBg = '#ecfdf5'; categoryBorder = '#a7f3d0';
      } else if (activeBf < 32) {
        category = 'Average'; categoryColor = '#b45309'; categoryBg = '#fefce8'; categoryBorder = '#fef08a';
      } else {
        category = 'Obese'; categoryColor = '#b91c1c'; categoryBg = '#fef2f2'; categoryBorder = '#fecaca';
      }
    }

    // 5. Ideal Range
    let idealRange = '';
    let ageGroup = '';
    if (this.bfGender === 'male') {
      if (age < 40) { idealRange = '8% – 19%'; ageGroup = 'Men (Age 20–39)'; }
      else if (age < 60) { idealRange = '11% – 21%'; ageGroup = 'Men (Age 40–59)'; }
      else { idealRange = '13% – 24%'; ageGroup = 'Men (Age 60+)'; }
    } else {
      if (age < 40) { idealRange = '21% – 32%'; ageGroup = 'Women (Age 20–39)'; }
      else if (age < 60) { idealRange = '23% – 33%'; ageGroup = 'Women (Age 40–59)'; }
      else { idealRange = '24% – 35%'; ageGroup = 'Women (Age 60+)'; }
    }

    // 6. Range bar marker position
    const minBar = this.bfGender === 'male' ? 2 : 8;
    const maxBar = this.bfGender === 'male' ? 35 : 45;
    const pos = Math.max(3, Math.min(96, ((activeBf - minBar) / (maxBar - minBar)) * 100));

    // 7. Update DOM elements
    const setVal = (id, txt) => { const el = document.getElementById(id); if (el) el.textContent = txt; };

    setVal('res-bf-val', activeBf.toFixed(1) + '%');
    
    const badge = document.getElementById('res-bf-category-badge');
    if (badge) {
      badge.textContent = category;
      badge.style.color = categoryColor;
      badge.style.background = categoryBg;
      badge.style.borderColor = categoryBorder;
    }

    setVal('res-bf-method-label', this.bfMethod === 'navy' ? '(U.S. Navy Method)' : '(BMI Estimate Method)');

    const marker = document.getElementById('res-bf-marker');
    if (marker) {
      marker.style.left = pos.toFixed(1) + '%';
    }

    if (isUS) {
      setVal('res-bf-fatmass', fatMassLbs.toFixed(1) + ' lbs');
      setVal('res-bf-fatmass-sub', fatMassKg.toFixed(1) + ' kg');
      setVal('res-bf-leanmass', leanMassLbs.toFixed(1) + ' lbs');
      setVal('res-bf-leanmass-sub', leanMassKg.toFixed(1) + ' kg');
    } else {
      setVal('res-bf-fatmass', fatMassKg.toFixed(1) + ' kg');
      setVal('res-bf-fatmass-sub', fatMassLbs.toFixed(1) + ' lbs');
      setVal('res-bf-leanmass', leanMassKg.toFixed(1) + ' kg');
      setVal('res-bf-leanmass-sub', leanMassLbs.toFixed(1) + ' lbs');
    }

    const secLabel = document.getElementById('res-bf-secondary-label');
    const secVal = document.getElementById('res-bf-secondary-val');
    const secSub = document.getElementById('res-bf-secondary-sub');
    if (secLabel && secVal && secSub) {
      if (this.bfMethod === 'navy') {
        secLabel.textContent = 'BMI-Based Estimate';
        secVal.textContent = bmiBf.toFixed(1) + '%';
        secSub.textContent = 'Deurenberg Formula';
      } else {
        secLabel.textContent = 'U.S. Navy Estimate';
        secVal.textContent = navyBf.toFixed(1) + '%';
        secSub.textContent = 'Hodgdon & Beckett';
      }
    }

    setVal('res-bf-ideal-range', idealRange);
    setVal('res-bf-ideal-sub', ageGroup);

    setVal('res-bf-bmi-quick', bmi.toFixed(1) + ' kg/m²');
    setVal('res-bf-bodytype-quick', category);
  },
  // 4. BMR CALCULATOR (Mifflin-St Jeor, Harris-Benedict & Katch-McArdle)
  // 6. PACE CALCULATOR (Running, Walking, Cycling & Finish Predictions)
  // 10. CALORIES BURNED CALCULATOR (MET-Based Exercise Energy Burn)
  // 11. ONE REP MAX (1RM) CALCULATOR
  // 12. TARGET HEART RATE CALCULATOR (Karvonen HRR & 5 Heart Rate Zones)
  // 13. WATER INTAKE CALCULATOR
  // ------------------------------------------------------------------------
  // 14. PREGNANCY CALCULATOR (Gestational Age, Trimester, EDD, Fruit, Timeline)
  // ------------------------------------------------------------------------
  // ------------------------------------------------------------------------
  // 15. PREGNANCY WEIGHT GAIN CALCULATOR (IOM & ACOG Guidelines)
  // ------------------------------------------------------------------------
  calcPregnancyWeight() {
    let preWtKg = 0;
    let preHtCm = 0;
    let curWtKg = 0;

    if (this.pwUnit === 'metric') {
      preWtKg = parseFloat(document.getElementById('pw-pre-weight')?.value) || 0;
      preHtCm = parseFloat(document.getElementById('pw-pre-height')?.value) || 0;
      curWtKg = parseFloat(document.getElementById('pw-cur-weight')?.value) || 0;
    } else {
      const preWtLbs = parseFloat(document.getElementById('pw-pre-weight-lbs')?.value) || 0;
      const ft = parseFloat(document.getElementById('pw-pre-height-ft')?.value) || 0;
      const inch = parseFloat(document.getElementById('pw-pre-height-in')?.value) || 0;
      const curWtLbs = parseFloat(document.getElementById('pw-cur-weight-lbs')?.value) || 0;

      preWtKg = preWtLbs * 0.45359237;
      preHtCm = (ft * 12 + inch) * 2.54;
      curWtKg = curWtLbs * 0.45359237;
    }

    const week = parseInt(document.getElementById('pw-week')?.value) || 20;
    const isTwins = this.pwType === 'twins';

    if (preWtKg <= 0 || preHtCm <= 0 || curWtKg <= 0) return;

    const heightM = preHtCm / 100;
    const bmi = preWtKg / (heightM * heightM);
    const roundedBMI = Math.round(bmi * 10) / 10;

    let catKey = 'normal';
    let catTitle = 'Normal Weight';

    if (roundedBMI < 18.5) {
      catKey = 'underweight';
      catTitle = 'Underweight (BMI < 18.5)';
    } else if (roundedBMI < 25) {
      catKey = 'normal';
      catTitle = 'Normal Weight (BMI 18.5 – 24.9)';
    } else if (roundedBMI < 30) {
      catKey = 'overweight';
      catTitle = 'Overweight (BMI 25.0 – 29.9)';
    } else {
      catKey = 'obese';
      catTitle = 'Obese (BMI ≥ 30.0)';
    }

    // IOM Guidelines Data
    const iomParams = {
      singleton: {
        underweight: { totalKg: [12.5, 18.0], tri1Kg: [0.5, 2.0], rateKg: [0.44, 0.58], totalLbs: [28, 40], rateLbs: [1.0, 1.3] },
        normal:      { totalKg: [11.5, 16.0], tri1Kg: [0.5, 2.0], rateKg: [0.35, 0.50], totalLbs: [25, 35], rateLbs: [0.8, 1.0] },
        overweight:  { totalKg: [7.0, 11.5],  tri1Kg: [0.5, 2.0], rateKg: [0.23, 0.33], totalLbs: [15, 25], rateLbs: [0.5, 0.7] },
        obese:       { totalKg: [5.0, 9.0],   tri1Kg: [0.5, 2.0], rateKg: [0.17, 0.27], totalLbs: [11, 20], rateLbs: [0.4, 0.6] }
      },
      twins: {
        underweight: { totalKg: [18.0, 27.0], tri1Kg: [1.0, 3.0], rateKg: [0.65, 0.85], totalLbs: [40, 60], rateLbs: [1.4, 1.9] },
        normal:      { totalKg: [16.8, 24.5], tri1Kg: [1.0, 3.0], rateKg: [0.60, 0.75], totalLbs: [37, 54], rateLbs: [1.3, 1.7] },
        overweight:  { totalKg: [14.1, 22.7], tri1Kg: [1.0, 3.0], rateKg: [0.50, 0.65], totalLbs: [31, 50], rateLbs: [1.1, 1.4] },
        obese:       { totalKg: [11.3, 19.1], tri1Kg: [1.0, 3.0], rateKg: [0.40, 0.55], totalLbs: [25, 42], rateLbs: [0.9, 1.2] }
      }
    };

    const cfg = iomParams[isTwins ? 'twins' : 'singleton'][catKey];

    const actualGainKg = curWtKg - preWtKg;
    const actualGainLbs = actualGainKg * 2.20462;

    let minExpectedKg = 0;
    let maxExpectedKg = 0;

    if (week <= 13) {
      minExpectedKg = cfg.tri1Kg[0] * (week / 13);
      maxExpectedKg = cfg.tri1Kg[1] * (week / 13);
    } else {
      const wPostTri1 = week - 13;
      minExpectedKg = cfg.tri1Kg[0] + wPostTri1 * cfg.rateKg[0];
      maxExpectedKg = cfg.tri1Kg[1] + wPostTri1 * cfg.rateKg[1];
    }

    const minExpectedLbs = minExpectedKg * 2.20462;
    const maxExpectedLbs = maxExpectedKg * 2.20462;

    // Status evaluation with 0.4 kg / 0.9 lb tolerance buffer
    let statusText = 'Within Recommended Range (On Track)';
    let statusClass = 'status-optimal';

    if (actualGainKg < minExpectedKg - 0.4) {
      statusText = 'Below Recommended Range (Slow Gain)';
      statusClass = 'status-below';
    } else if (actualGainKg > maxExpectedKg + 0.4) {
      statusText = 'Above Recommended Range (Rapid Gain)';
      statusClass = 'status-above';
    }

    const setVal = (id, txt) => { const el = document.getElementById(id); if (el) el.textContent = txt; };

    const sign = actualGainKg >= 0 ? '+' : '';
    if (this.pwUnit === 'metric') {
      setVal('res-pw-actual-gain', `${sign}${actualGainKg.toFixed(1)} kg (${sign}${actualGainLbs.toFixed(1)} lbs)`);
      setVal('res-pw-expected-range', `${minExpectedKg.toFixed(1)} – ${maxExpectedKg.toFixed(1)} kg`);
      setVal('res-pw-total-target', `${cfg.totalKg[0]} – ${cfg.totalKg[1]} kg (${cfg.totalLbs[0]} – ${cfg.totalLbs[1]} lbs)`);
      setVal('res-pw-weekly-rate', `~${((cfg.rateKg[0] + cfg.rateKg[1]) / 2).toFixed(2)} kg/wk`);
    } else {
      setVal('res-pw-actual-gain', `${sign}${actualGainLbs.toFixed(1)} lbs (${sign}${actualGainKg.toFixed(1)} kg)`);
      setVal('res-pw-expected-range', `${minExpectedLbs.toFixed(1)} – ${maxExpectedLbs.toFixed(1)} lbs`);
      setVal('res-pw-total-target', `${cfg.totalLbs[0]} – ${cfg.totalLbs[1]} lbs (${cfg.totalKg[0]} – ${cfg.totalKg[1]} kg)`);
      setVal('res-pw-weekly-rate', `~${((cfg.rateLbs[0] + cfg.rateLbs[1]) / 2).toFixed(1)} lbs/wk`);
    }

    setVal('res-pw-pre-bmi', `${roundedBMI}`);
    setVal('res-pw-bmi-cat', catTitle);

    const statusEl = document.getElementById('res-pw-status');
    if (statusEl) {
      statusEl.className = `pw-status-pill ${statusClass}`;
      statusEl.textContent = statusText;
    }
  },

  // ------------------------------------------------------------------------
  // 16. PREGNANCY CONCEPTION CALCULATOR (Retrospective Dating)
  // ------------------------------------------------------------------------
  // ------------------------------------------------------------------------
  // 17. DUE DATE CALCULATOR (4 Clinical Methods)
  // ------------------------------------------------------------------------
  // ------------------------------------------------------------------------
  // 18. OVULATION CALCULATOR (Peak Fertility & 6-Cycle Forecast)
  // ------------------------------------------------------------------------
  calcOvulation() {
    const lmpVal = document.getElementById('ov-lmp-date')?.value;
    const lmpDate = this.parseLocalDate(lmpVal);
    const cycleLen = parseInt(document.getElementById('ov-cycle-len')?.value) || 28;
    const lutealLen = parseInt(document.getElementById('ov-luteal-len')?.value) || 14;

    if (!lmpDate || isNaN(lmpDate.getTime())) return;

    const ovDayOfCycle = cycleLen - lutealLen;
    const nextOvulation = this.addDays(lmpDate, ovDayOfCycle);
    const fertileStart = this.addDays(nextOvulation, -5);
    const fertileEnd = nextOvulation;
    const peakStart = this.addDays(nextOvulation, -2);
    const peakEnd = nextOvulation;
    const nextPeriod = this.addDays(lmpDate, cycleLen);
    const testDate = this.addDays(nextOvulation, 14);

    const setVal = (id, txt) => { const el = document.getElementById(id); if (el) el.textContent = txt; };

    setVal('res-ov-date', this.formatDate(nextOvulation));
    setVal('res-ov-fertile-window', `${this.formatDateShort(fertileStart)} – ${this.formatDateShort(fertileEnd)}`);
    setVal('res-ov-peak-days', `${this.formatDateShort(peakStart)} – ${this.formatDateShort(peakEnd)}`);
    setVal('res-ov-next-period', this.formatDate(nextPeriod));
    setVal('res-ov-test-date', this.formatDate(testDate));

    // Next 6 Cycles Table
    const tbody = document.getElementById('res-ov-table-body');
    if (tbody) {
      let rows = '';
      for (let i = 0; i < 6; i++) {
        const cStart = this.addDays(lmpDate, i * cycleLen);
        const cOv = this.addDays(cStart, ovDayOfCycle);
        const cFertileStart = this.addDays(cOv, -5);
        const cDue = this.addDays(cOv, 266);
        const isCurrent = i === 0;

        rows += `
          <tr ${isCurrent ? 'style="font-weight:700; background:rgba(236,72,153,0.06);"' : ''}>
            <td>Cycle ${i + 1} ${isCurrent ? '<span class="badge" style="background:#ec4899; color:#fff; font-size:0.7rem; padding:1px 5px; margin-left:4px;">Next</span>' : ''}</td>
            <td>${this.formatDateShort(cStart)}</td>
            <td><span class="fertile-highlight-badge high">${this.formatDateShort(cFertileStart)} – ${this.formatDateShort(cOv)}</span></td>
            <td><span class="fertile-highlight-badge peak">${this.formatDateShort(cOv)}</span></td>
            <td style="color:var(--text-secondary);">${this.formatDateShort(cDue)}</td>
          </tr>
        `;
      }
      tbody.innerHTML = rows;
    }
  },

  // ------------------------------------------------------------------------
  // 19. CONCEPTION CALCULATOR (Planning Conception & Reverse Target EDD)
  // ------------------------------------------------------------------------
  // ------------------------------------------------------------------------
  // 20. PERIOD CALCULATOR (Cycle Tracker, Phase Progress, PMS Schedule)
  // ------------------------------------------------------------------------
  calcPeriod() {
    const today = new Date();
    const todayMid = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const lmpVal = document.getElementById('period-lmp-date')?.value;
    const lmpDate = this.parseLocalDate(lmpVal);
    const cycleLen = parseInt(document.getElementById('period-cycle-len')?.value) || 28;
    const bleedLen = parseInt(document.getElementById('period-bleed-len')?.value) || 5;

    if (!lmpDate || isNaN(lmpDate.getTime())) return;

    const diffDaysTotal = Math.floor((todayMid - lmpDate) / 86400000);
    const cycleDay = (diffDaysTotal >= 0 ? (diffDaysTotal % cycleLen) : 0) + 1;

    let phaseName = 'Follicular Phase';
    let phaseClass = 'follicular';
    if (cycleDay <= bleedLen) {
      phaseName = 'Menstrual Phase (Period)';
      phaseClass = 'menstrual';
    } else if (cycleDay >= cycleLen - 16 && cycleDay <= cycleLen - 12) {
      phaseName = 'Ovulatory Phase (Peak Fertility)';
      phaseClass = 'ovulation';
    } else if (cycleDay > cycleLen - 12) {
      phaseName = 'Luteal Phase';
      phaseClass = 'luteal';
    }

    const cyclesPassed = Math.max(0, Math.floor(diffDaysTotal / cycleLen));
    const recentCycleStart = this.addDays(lmpDate, cyclesPassed * cycleLen);
    let nextPeriodStart = this.addDays(recentCycleStart, cycleLen);
    if (nextPeriodStart <= todayMid) {
      nextPeriodStart = this.addDays(nextPeriodStart, cycleLen);
    }

    const daysUntilNext = Math.max(0, Math.ceil((nextPeriodStart - todayMid) / 86400000));
    const pmsStart = this.addDays(nextPeriodStart, -7);
    const pmsEnd = this.addDays(nextPeriodStart, -1);

    const ovDayOfCycle = cycleLen - 14;
    const curOvulation = this.addDays(recentCycleStart, ovDayOfCycle);
    const curFertileStart = this.addDays(curOvulation, -5);

    const setVal = (id, txt) => { const el = document.getElementById(id); if (el) el.textContent = txt; };

    setVal('res-period-cycle-day', `Day ${cycleDay} of ${cycleLen}-Day Cycle`);
    setVal('res-period-phase', phaseName);
    setVal('res-period-next-date', this.formatDate(nextPeriodStart));
    setVal('res-period-countdown', `${daysUntilNext} Days to Next Period`);
    setVal('res-period-pms', `${this.formatDateShort(pmsStart)} – ${this.formatDateShort(pmsEnd)}`);
    setVal('res-period-fertile', `${this.formatDateShort(curFertileStart)} – ${this.formatDateShort(curOvulation)}`);

    // Highlight cycle phase pills
    document.querySelectorAll('.cycle-phase-pill').forEach(pill => {
      pill.classList.toggle('active', pill.dataset.phase === phaseClass);
    });

    // 6-Month Period Forecast Table
    const tbody = document.getElementById('res-period-table-body');
    if (tbody) {
      let rows = '';
      for (let i = 0; i < 6; i++) {
        const pStart = this.addDays(nextPeriodStart, i * cycleLen);
        const pEnd = this.addDays(pStart, bleedLen - 1);
        const ovDate = this.addDays(pStart, ovDayOfCycle);
        const fertStart = this.addDays(ovDate, -5);
        const pmsS = this.addDays(this.addDays(pStart, cycleLen), -7);
        const pmsE = this.addDays(this.addDays(pStart, cycleLen), -1);

        rows += `
          <tr>
            <td style="font-weight:700;">Month ${i + 1}</td>
            <td><span style="font-weight:700; color:var(--text-primary);">${this.formatDateShort(pStart)} – ${this.formatDateShort(pEnd)}</span></td>
            <td><span class="fertile-highlight-badge high">${this.formatDateShort(fertStart)} – ${this.formatDateShort(ovDate)}</span></td>
            <td style="color:var(--text-secondary);">${this.formatDateShort(pmsS)} – ${this.formatDateShort(pmsE)}</td>
          </tr>
        `;
      }
      tbody.innerHTML = rows;
    }
  },


  // ========================================================================
  // 21. MACRO CALCULATOR (Mifflin-St Jeor + Goal + Macro Distribution)
  // ========================================================================
  // ========================================================================
  // 22. CARBOHYDRATE CALCULATOR (ACSM & ISSN Training Volume Guidelines)
  // ========================================================================
  // ========================================================================
  // 23. PROTEIN CALCULATOR (ISSN / Morton et al. Hypertrophy Standards)
  // ========================================================================
  calcProtein() {
    const isMetric = this.protUnit === 'metric';
    let weightKg = parseFloat(document.getElementById('prot-weight')?.value) || 75;
    if (!isMetric) {
      const lbs = parseFloat(document.getElementById('prot-weight-lbs')?.value) || 165;
      weightKg = lbs * 0.453592;
    }
    const goal = document.getElementById('prot-goal')?.value || 'strength';
    const meals = parseInt(document.getElementById('prot-meals')?.value, 10) || 4;

    let gPerKg = 2.0;
    if (goal === 'sedentary') gPerKg = 0.8;
    else if (goal === 'maintenance') gPerKg = 1.3;
    else if (goal === 'endurance') gPerKg = 1.5;
    else if (goal === 'strength') gPerKg = 2.0;
    else if (goal === 'deficit') gPerKg = 2.3;

    const dailyProtein = Math.round(weightKg * gPerKg);
    const dailyCal = dailyProtein * 4;
    const perMeal = Math.round(dailyProtein / meals);

    // Food equivalents
    const chickenG = Math.round((dailyProtein / 31) * 100);
    const eggsCount = Math.round(dailyProtein / 6);
    const yogurtG = Math.round((dailyProtein / 10) * 100);
    const wheyScoops = (dailyProtein / 25).toFixed(1);

    const setTxt = (id, txt) => { const el = document.getElementById(id); if (el) el.textContent = txt; };

    setTxt('res-prot-daily-g', `${dailyProtein} g / day`);
    setTxt('res-prot-daily-cal', `${dailyCal} kcal`);
    setTxt('res-prot-g-per-kg', `${gPerKg.toFixed(1)} g/kg bodyweight`);
    setTxt('res-prot-per-meal', `${perMeal} g across ${meals} meals`);
    setTxt('res-prot-chicken', `~${chickenG} g cooked chicken breast`);
    setTxt('res-prot-eggs', `~${eggsCount} large whole eggs`);
    setTxt('res-prot-yogurt', `~${yogurtG} g Greek yogurt`);
    setTxt('res-prot-whey', `~${wheyScoops} standard protein scoops`);
  },

  // ========================================================================
  // 24. FAT INTAKE CALCULATOR (AHA & Dietary Guidelines for Americans)
  // ========================================================================
  // ========================================================================
  // 25. TDEE CALCULATOR (Mifflin-St Jeor, Katch-McArdle, Harris-Benedict)
  // ========================================================================
  // ========================================================================
  // 26. GFR CALCULATOR (2021 CKD-EPI Refit & MDRD Renal Function)
  // ========================================================================
  // ========================================================================
  // 28. BODY SURFACE AREA (BSA) CALCULATOR (Mosteller, Du Bois, Haycock)
  // ========================================================================
  calcBSA() {
    const isMetric = this.bsaUnit === 'metric';
    let heightCm = parseFloat(document.getElementById('bsa-height')?.value) || 175;
    let weightKg = parseFloat(document.getElementById('bsa-weight')?.value) || 70;

    if (!isMetric) {
      const ft = parseFloat(document.getElementById('bsa-height-ft')?.value) || 5;
      const inch = parseFloat(document.getElementById('bsa-height-in')?.value) || 9;
      heightCm = (ft * 12 + inch) * 2.54;
      const lbs = parseFloat(document.getElementById('bsa-weight-lbs')?.value) || 154;
      weightKg = lbs * 0.453592;
    }

    // 1. Mosteller Formula
    const bsaMosteller = Math.sqrt((heightCm * weightKg) / 3600);

    // 2. Du Bois & Du Bois Formula
    const bsaDuBois = 0.007184 * Math.pow(heightCm, 0.725) * Math.pow(weightKg, 0.425);

    // 3. Haycock Formula
    const bsaHaycock = 0.024265 * Math.pow(heightCm, 0.3964) * Math.pow(weightKg, 0.5378);

    // 4. Gehan & George Formula
    const bsaGehan = 0.0235 * Math.pow(heightCm, 0.42246) * Math.pow(weightKg, 0.51456);

    // 5. Boyd Formula
    const weightG = weightKg * 1000;
    const bsaBoyd = 0.0003207 * Math.pow(heightCm, 0.3) * Math.pow(weightG, (0.7285 - (0.0188 * Math.log10(weightG))));

    const setTxt = (id, txt) => { const el = document.getElementById(id); if (el) el.textContent = txt; };

    setTxt('res-bsa-mosteller', `${bsaMosteller.toFixed(2)} m²`);
    setTxt('res-bsa-dubois', `${bsaDuBois.toFixed(2)} m²`);
    setTxt('res-bsa-haycock', `${bsaHaycock.toFixed(2)} m²`);
    setTxt('res-bsa-gehan', `${bsaGehan.toFixed(2)} m²`);
    setTxt('res-bsa-boyd', `${bsaBoyd.toFixed(2)} m²`);

    const variance = (Math.max(bsaMosteller, bsaDuBois, bsaHaycock) - Math.min(bsaMosteller, bsaDuBois, bsaHaycock)) / bsaMosteller * 100;
    setTxt('res-bsa-variance', `Formula Variance: ±${variance.toFixed(1)}%`);

    const diffFromAvg = ((bsaMosteller - 1.73) / 1.73) * 100;
    const diffSign = diffFromAvg >= 0 ? '+' : '';
    setTxt('res-bsa-norm-diff', `${diffSign}${diffFromAvg.toFixed(1)}% vs. Normal Adult Reference (1.73 m²)`);
  },

  // ========================================================================
  // 29. BAC CALCULATOR (Widmark Ethanol Pharmacokinetics Model)
  // ========================================================================
    // Setup all event listeners
  init() {
    const now = new Date();
    const setDefDate = (id, daysOffset) => {
      const el = document.getElementById(id);
      if (el && !el.value) {
        el.value = this.toInputDate(this.addDays(now, daysOffset));
      }
    };

    const syncSlider = (rangeId, numId, badgeId, suffix, onCalc) => {
      const rangeEl = document.getElementById(rangeId);
      const numEl = document.getElementById(numId);
      const badgeEl = document.getElementById(badgeId);
      if (rangeEl && numEl) {
        rangeEl.addEventListener('input', () => {
          numEl.value = rangeEl.value;
          if (badgeEl) badgeEl.textContent = rangeEl.value + (suffix ? ' ' + suffix : '');
          if (onCalc) onCalc();
        });
        numEl.addEventListener('input', () => {
          rangeEl.value = numEl.value;
          if (badgeEl) badgeEl.textContent = numEl.value + (suffix ? ' ' + suffix : '');
          if (onCalc) onCalc();
        });
      }
    };

    // 1. Body Fat (US Navy Method) Gender & Inputs
    document.querySelectorAll('.bf-gender-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.bf-gender-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.bodyFatGender = btn.dataset.gender;
        const hipGroup = document.getElementById('bf-hip-group');
        if (hipGroup) {
          hipGroup.style.display = this.bodyFatGender === 'female' ? 'flex' : 'none';
        }
        this.calcBodyFat();
      });
    });

    ['bf-height', 'bf-neck', 'bf-waist', 'bf-hip', 'bf-weight'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcBodyFat());
    });

    // 2. Pregnancy Weight Gain Controls
    document.querySelectorAll('.pw-unit-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.pw-unit-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.pwUnit = btn.dataset.unit;
        const met = document.getElementById('pw-inputs-metric');
        const imp = document.getElementById('pw-inputs-imperial');
        if (met && imp) {
          met.style.display = this.pwUnit === 'metric' ? 'block' : 'none';
          imp.style.display = this.pwUnit === 'imperial' ? 'block' : 'none';
        }
        this.calcPregnancyWeight();
      });
    });

    document.querySelectorAll('.pw-preg-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.pw-preg-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.pwPregnancyType = btn.dataset.type;
        this.calcPregnancyWeight();
      });
    });

    ['pw-pre-weight', 'pw-height', 'pw-cur-weight', 'pw-week', 'pw-pre-weight-lbs', 'pw-height-ft', 'pw-height-in', 'pw-cur-weight-lbs'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcPregnancyWeight());
      document.getElementById(id)?.addEventListener('change', () => this.calcPregnancyWeight());
    });

    // 3. Ovulation Calculator Controls & Defaults
    setDefDate('ov-lmp-date', -10);

    ['ov-lmp-date', 'ov-cycle-len', 'ov-luteal-len'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcOvulation());
      document.getElementById(id)?.addEventListener('change', () => this.calcOvulation());
    });

    // 4. Period Calculator Controls & Defaults
    setDefDate('period-lmp-date', -14);

    ['period-lmp-date', 'period-cycle-len', 'period-bleed-len'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcPeriod());
      document.getElementById(id)?.addEventListener('change', () => this.calcPeriod());
    });

    // 5. Protein Calculator Event Listeners
    document.querySelectorAll('.prot-unit-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.prot-unit-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.protUnit = btn.dataset.unit;
        const met = document.getElementById('prot-inputs-metric');
        const imp = document.getElementById('prot-inputs-imperial');
        if (met && imp) {
          met.style.display = this.protUnit === 'metric' ? 'block' : 'none';
          imp.style.display = this.protUnit === 'imperial' ? 'block' : 'none';
        }
        this.calcProtein();
      });
    });

    syncSlider('prot-weight-range', 'prot-weight', 'prot-weight-val', 'kg', () => this.calcProtein());
    syncSlider('prot-weight-lbs-range', 'prot-weight-lbs', 'prot-weight-lbs-val', 'lbs', () => this.calcProtein());

    ['prot-activity', 'prot-goal'].forEach(id => {
      document.getElementById(id)?.addEventListener('change', () => this.calcProtein());
    });

    // 6. Body Surface Area (BSA) Event Listeners
    document.querySelectorAll('.bsa-unit-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.bsa-unit-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.bsaUnit = btn.dataset.unit;
        const met = document.getElementById('bsa-inputs-metric');
        const imp = document.getElementById('bsa-inputs-imperial');
        if (met && imp) {
          met.style.display = this.bsaUnit === 'metric' ? 'block' : 'none';
          imp.style.display = this.bsaUnit === 'imperial' ? 'block' : 'none';
        }
        this.calcBSA();
      });
    });

    syncSlider('bsa-height-range', 'bsa-height', 'bsa-height-val', 'cm', () => this.calcBSA());
    syncSlider('bsa-weight-range', 'bsa-weight', 'bsa-weight-val', 'kg', () => this.calcBSA());
    syncSlider('bsa-weight-lbs-range', 'bsa-weight-lbs', 'bsa-weight-lbs-val', 'lbs', () => this.calcBSA());

    ['bsa-height-ft', 'bsa-height-in'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcBSA());
      document.getElementById(id)?.addEventListener('change', () => this.calcBSA());
    });

    // Switcher pills inside detail view
    document.querySelectorAll('#fit-detail-view .switcher-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        const target = pill.dataset.target;
        if (target) this.openCalculator(target);
      });
    });

    // Initial calculations across preserved tools
    this.calcBodyFat();
    this.calcPregnancyWeight();
    this.calcOvulation();
    this.calcPeriod();
    this.calcProtein();
    this.calcBSA();
  },

  // ------------------------------------------------------------------------
  // Fitness Catalog vs Detail View Management & Group Filtering
  // ------------------------------------------------------------------------
  currentFilter: 'all',

  filterCatalog(filterKey, btnEl) {
    this.currentFilter = filterKey || 'all';

    // Reset any active search query
    const searchInp = document.getElementById('fit-catalog-search');
    if (searchInp && searchInp.value) {
      searchInp.value = '';
      const clearBtn = document.getElementById('fit-catalog-search-clear');
      if (clearBtn) clearBtn.style.display = 'none';
      const secEl = document.getElementById('fit-search-results-section');
      if (secEl) secEl.style.display = 'none';
    }

    // Update active filter pill
    document.querySelectorAll('.fit-filter-pill').forEach(btn => {
      const match = (btnEl && btn === btnEl) || (!btnEl && btn.dataset.filter === filterKey);
      btn.classList.toggle('active', !!match);
    });

    const catalogView = document.getElementById('fit-catalog-view');
    const detailView = document.getElementById('fit-detail-view');
    if (detailView && detailView.style.display !== 'none') {
      detailView.style.display = 'none';
      if (catalogView) catalogView.style.display = 'block';
    }

    const boxes = document.querySelectorAll('#fit-catalog-view .feature-big-box');
    let visibleCount = 0;
    boxes.forEach(box => {
      const groups = (box.dataset.fitGroup || '').split(' ');
      const match = filterKey === 'all' || groups.includes(filterKey);
      box.style.display = match ? 'flex' : 'none';
      if (match) visibleCount++;
    });

    // Toggle topic sections so empty ones are hidden
    document.querySelectorAll('#fit-catalog-view .calc-topic-section').forEach(sec => {
      if (sec.id === 'fit-search-results-section') return;
      if (filterKey === 'all') {
        sec.style.display = '';
      } else {
        const hasVisible = Array.from(sec.querySelectorAll('.feature-big-box')).some(b => b.style.display !== 'none');
        sec.style.display = hasVisible ? '' : 'none';
      }
    });

    const badge = document.getElementById('fit-count-badge');
    if (badge) {
      if (filterKey === 'fitness') {
        badge.textContent = `${visibleCount} Fitness & Workout Calculators`;
      } else if (filterKey === 'pregnancy') {
        badge.textContent = `${visibleCount} Pregnancy & Maternal Calculators`;
      } else if (filterKey === 'nutrition') {
        badge.textContent = `${visibleCount} Nutrition & Macro Calculators`;
      } else if (filterKey === 'metabolism') {
        badge.textContent = `${visibleCount} Metabolism & TDEE Calculators`;
      } else if (filterKey === 'clinical') {
        badge.textContent = `${visibleCount} Clinical & Renal Tools`;
      } else if (filterKey === 'body') {
        badge.textContent = `${visibleCount} Body & Frame Calculators`;
      } else if (filterKey === 'all') {
        badge.textContent = '23 Clinical, Maternal & Fitness Tools';
      } else {
        badge.textContent = `${visibleCount} Calculators`;
      }
    }

    const noResults = document.getElementById('fit-no-results');
    if (noResults) {
      noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }

    if (window.AppRouter && !window.AppRouter.isDispatching) {
      window.AppRouter.onCatalogOpened('fitness', filterKey !== 'all' ? filterKey : null);
    }
  },

  showCatalog() {
    const catalogView = document.getElementById('fit-catalog-view');
    const detailView = document.getElementById('fit-detail-view');
    if (catalogView) catalogView.style.display = 'block';
    if (detailView) detailView.style.display = 'none';
    const searchInput = document.getElementById('fit-catalog-search');
    if (searchInput && searchInput.value) {
      this.searchCatalog(searchInput.value);
    } else {
      this.filterCatalog(this.currentFilter || 'all');
    }
    if (window.AppRouter && !window.AppRouter.isDispatching) {
      window.AppRouter.onCatalogOpened('fitness', this.currentFilter || null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  openCalculator(calcId) {
    const catalogView = document.getElementById('fit-catalog-view');
    const detailView = document.getElementById('fit-detail-view');
    if (catalogView) catalogView.style.display = 'none';
    if (detailView) detailView.style.display = 'block';

    if (window.updateActiveCalculatorTitle) {
      window.updateActiveCalculatorTitle('fit', calcId);
    }

    document.querySelectorAll('.fit-calc-unit').forEach(panel => {
      panel.style.display = panel.id === calcId ? 'block' : 'none';
    });

    document.querySelectorAll('#fit-detail-view .switcher-pill').forEach(pill => {
      pill.classList.toggle('active', pill.dataset.target === calcId);
    });

    const activePill = document.querySelector('#fit-detail-view .switcher-pill.active');
    if (activePill) {
      var cont = activePill.closest('.switcher-pill-group');
      if (cont) {
        cont.scrollTo({ left: activePill.offsetLeft - (cont.clientWidth / 2) + (activePill.offsetWidth / 2), behavior: 'smooth' });
      }
    }

    if (window.AppRouter && !window.AppRouter.isDispatching) {
      window.AppRouter.onCalculatorOpened(calcId, 'fitness');
    }

    if (window.SeoGuide) {
      window.SeoGuide.updateGuide(calcId, 'fitness');
    }

    if (window.scrollToActiveCalculator) { window.scrollToActiveCalculator('fit'); } else { window.scrollTo({ top: 0, behavior: 'smooth' }); }
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
  },

  searchCatalog(query) {
    const detailView = document.getElementById('fit-detail-view');
    const catalogView = document.getElementById('fit-catalog-view');
    if (detailView && detailView.style.display !== 'none' && (query || '').trim() !== '') {
      detailView.style.display = 'none';
      if (catalogView) catalogView.style.display = 'block';
    }

    if (window.SuiteSearchEngine) {
      window.SuiteSearchEngine.search('fitness', query);
    }
  },

  resetSearch() {
    if (window.SuiteSearchEngine) {
      window.SuiteSearchEngine.reset('fitness');
    } else {
      const input = document.getElementById('fit-catalog-search');
      if (input) input.value = '';
    }
  }
};

window.FitnessCalcs = FitnessCalcs;
