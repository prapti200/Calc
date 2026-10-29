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


  // 1. BMI CALCULATOR & GAUGE
  calcBMI() {
    let weightKg = 0;
    let heightCm = 0;

    if (this.bmiUnit === 'metric') {
      weightKg = parseFloat(document.getElementById('bmi-weight')?.value) || 0;
      heightCm = parseFloat(document.getElementById('bmi-height')?.value) || 0;
    } else {
      const weightLbs = parseFloat(document.getElementById('bmi-weight-lbs')?.value) || 0;
      const heightFt = parseFloat(document.getElementById('bmi-height-ft')?.value) || 0;
      const heightIn = parseFloat(document.getElementById('bmi-height-in')?.value) || 0;

      weightKg = weightLbs * 0.45359237;
      heightCm = (heightFt * 12 + heightIn) * 2.54;
    }

    if (weightKg <= 0 || heightCm <= 0) return;

    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM);
    const roundedBMI = Math.round(bmi * 10) / 10;

    let category = '';
    let categoryColor = '';
    let pointerPercent = 0;

    if (roundedBMI < 18.5) {
      category = 'Underweight';
      categoryColor = '#38bdf8';
      pointerPercent = Math.max(5, (roundedBMI / 18.5) * 20);
    } else if (roundedBMI < 25) {
      category = 'Normal Weight';
      categoryColor = '#10b981';
      pointerPercent = 20 + ((roundedBMI - 18.5) / (24.9 - 18.5)) * 30;
    } else if (roundedBMI < 30) {
      category = 'Overweight';
      categoryColor = '#f59e0b';
      pointerPercent = 50 + ((roundedBMI - 25) / (29.9 - 25)) * 25;
    } else {
      category = 'Obese';
      categoryColor = '#ef4444';
      pointerPercent = Math.min(95, 75 + ((roundedBMI - 30) / 15) * 20);
    }

    // Healthy weight range (BMI 18.5 - 24.9)
    const minHealthyKg = 18.5 * (heightM * heightM);
    const maxHealthyKg = 24.9 * (heightM * heightM);

    let healthyRangeStr = '';
    if (this.bmiUnit === 'metric') {
      healthyRangeStr = `${minHealthyKg.toFixed(1)} kg - ${maxHealthyKg.toFixed(1)} kg`;
    } else {
      healthyRangeStr = `${(minHealthyKg * 2.20462).toFixed(1)} lbs - ${(maxHealthyKg * 2.20462).toFixed(1)} lbs`;
    }

    // Update UI elements
    const resBmiEl = document.getElementById('res-bmi-val');
    const resCatEl = document.getElementById('res-bmi-category');
    const resRangeEl = document.getElementById('res-bmi-range');
    const pointer = document.getElementById('bmi-pointer');
    const pointerTag = document.getElementById('bmi-pointer-tag');

    if (resBmiEl) resBmiEl.textContent = roundedBMI.toFixed(1);
    if (resCatEl) {
      resCatEl.textContent = category;
      resCatEl.style.color = categoryColor;
    }
    if (resRangeEl) resRangeEl.textContent = healthyRangeStr;
    if (pointer) pointer.style.left = `${pointerPercent}%`;
    if (pointerTag) pointerTag.textContent = roundedBMI.toFixed(1);
  },

  // 2. DEDICATED CALORIE CALCULATOR & MACRO PLANNER
  calcCalorie() {
    const gender = this.calGender || 'male';
    const age = parseFloat(document.getElementById('cal-age')?.value) || 28;
    let weightKg = parseFloat(document.getElementById('cal-weight')?.value) || 75;
    let heightCm = parseFloat(document.getElementById('cal-height')?.value) || 178;
    const unit = this.calUnit || 'metric';

    if (unit === 'imperial') {
      const weightLbs = parseFloat(document.getElementById('cal-weight-lbs')?.value) || 165;
      const heightFt = parseFloat(document.getElementById('cal-height-ft')?.value) || 5;
      const heightIn = parseFloat(document.getElementById('cal-height-in')?.value) || 10;
      weightKg = weightLbs * 0.45359237;
      heightCm = (heightFt * 12 + heightIn) * 2.54;
    }

    if (weightKg <= 0 || heightCm <= 0 || age <= 0) return;

    const activity = parseFloat(document.getElementById('cal-activity')?.value) || 1.55;
    const goal = document.getElementById('cal-goal')?.value || 'maintain';
    const diet = document.getElementById('cal-diet')?.value || 'balanced';

    // BMR via Mifflin-St Jeor
    let bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age);
    bmr += (gender === 'male' ? 5 : -161);

    // TDEE
    const tdee = Math.round(bmr * activity);

    // Goal adjustment
    let targetCals = tdee;
    let goalLabel = 'Maintain Current Weight';
    if (goal === 'mild-loss') {
      targetCals = tdee - 250;
      goalLabel = 'Mild Weight Loss (-0.25 kg / 0.5 lb per wk)';
    } else if (goal === 'weight-loss') {
      targetCals = tdee - 500;
      goalLabel = 'Weight Loss (-0.5 kg / 1.0 lb per wk)';
    } else if (goal === 'extreme-loss') {
      targetCals = tdee - 1000;
      goalLabel = 'Fast Weight Loss (-1.0 kg / 2.0 lbs per wk)';
    } else if (goal === 'mild-gain') {
      targetCals = tdee + 250;
      goalLabel = 'Mild Muscle Gain (+0.25 kg / 0.5 lb per wk)';
    } else if (goal === 'gain') {
      targetCals = tdee + 500;
      goalLabel = 'Bulking / Muscle Gain (+0.5 kg / 1.0 lb per wk)';
    }

    // Clinical safety floor
    const minFloor = gender === 'male' ? 1500 : 1200;
    targetCals = Math.max(minFloor, Math.round(targetCals));

    // Macro distributions
    let pPct = 0.30, cPct = 0.40, fPct = 0.30;
    if (diet === 'high-protein') { pPct = 0.40; cPct = 0.35; fPct = 0.25; }
    else if (diet === 'low-carb') { pPct = 0.35; cPct = 0.25; fPct = 0.40; }
    else if (diet === 'keto') { pPct = 0.25; cPct = 0.05; fPct = 0.70; }

    const pGrams = Math.round((targetCals * pPct) / 4);
    const cGrams = Math.round((targetCals * cPct) / 4);
    const fGrams = Math.round((targetCals * fPct) / 9);

    const setVal = (id, txt) => { const el = document.getElementById(id); if (el) el.textContent = txt; };
    setVal('res-cal-target', `${targetCals.toLocaleString()} kcal/day`);
    setVal('res-cal-maintenance', `${tdee.toLocaleString()} kcal`);
    setVal('res-cal-bmr', `${Math.round(bmr).toLocaleString()} kcal`);
    setVal('res-cal-goal-label', goalLabel);
    setVal('res-cal-protein', `${pGrams}g (${Math.round(pGrams * 4)} kcal)`);
    setVal('res-cal-carbs', `${cGrams}g (${Math.round(cGrams * 4)} kcal)`);
    setVal('res-cal-fats', `${fGrams}g (${Math.round(fGrams * 9)} kcal)`);

    setVal('res-cal-row-maintain', `${tdee.toLocaleString()} kcal`);
    setVal('res-cal-row-mild-loss', `${Math.max(minFloor, tdee - 250).toLocaleString()} kcal`);
    setVal('res-cal-row-loss', `${Math.max(minFloor, tdee - 500).toLocaleString()} kcal`);
    setVal('res-cal-row-fast-loss', `${Math.max(minFloor, tdee - 1000).toLocaleString()} kcal`);
    setVal('res-cal-row-mild-gain', `${(tdee + 250).toLocaleString()} kcal`);
    setVal('res-cal-row-gain', `${(tdee + 500).toLocaleString()} kcal`);
  },

  // 3. BODY FAT % CALCULATOR (US Navy Method)
  calcBodyFat() {
    const height = parseFloat(document.getElementById('bf-height')?.value) || 175;
    const neck = parseFloat(document.getElementById('bf-neck')?.value) || 38;
    const waist = parseFloat(document.getElementById('bf-waist')?.value) || 85;
    const hip = parseFloat(document.getElementById('bf-hip')?.value) || 95;
    const weight = parseFloat(document.getElementById('bf-weight')?.value) || 75;

    if (height <= 0 || neck <= 0 || waist <= 0) return;

    let bodyFat = 0;
    try {
      if (this.bodyFatGender === 'male') {
        if (waist - neck <= 0) return;
        bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
      } else {
        if (waist + hip - neck <= 0) return;
        bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450;
      }
    } catch (e) {
      return;
    }

    bodyFat = Math.max(3, Math.min(60, Math.round(bodyFat * 10) / 10));

    const fatMassKg = (weight * bodyFat) / 100;
    const leanMassKg = weight - fatMassKg;

    let category = '';
    let categoryColor = '';

    if (this.bodyFatGender === 'male') {
      if (bodyFat < 6) { category = 'Essential Fat'; categoryColor = '#38bdf8'; }
      else if (bodyFat < 14) { category = 'Athletes'; categoryColor = '#10b981'; }
      else if (bodyFat < 18) { category = 'Fitness'; categoryColor = '#059669'; }
      else if (bodyFat < 25) { category = 'Average'; categoryColor = '#f59e0b'; }
      else { category = 'Obese'; categoryColor = '#ef4444'; }
    } else {
      if (bodyFat < 14) { category = 'Essential Fat'; categoryColor = '#38bdf8'; }
      else if (bodyFat < 21) { category = 'Athletes'; categoryColor = '#10b981'; }
      else if (bodyFat < 25) { category = 'Fitness'; categoryColor = '#059669'; }
      else if (bodyFat < 32) { category = 'Average'; categoryColor = '#f59e0b'; }
      else { category = 'Obese'; categoryColor = '#ef4444'; }
    }

    const setVal = (id, txt) => { const el = document.getElementById(id); if (el) el.textContent = txt; };
    setVal('res-bf-val', `${bodyFat.toFixed(1)}%`);
    setVal('res-bf-category', category);
    setVal('res-bf-fatmass', `${fatMassKg.toFixed(1)} kg (${(fatMassKg * 2.20462).toFixed(1)} lbs)`);
    setVal('res-bf-leanmass', `${leanMassKg.toFixed(1)} kg (${(leanMassKg * 2.20462).toFixed(1)} lbs)`);

    const catEl = document.getElementById('res-bf-category');
    if (catEl) catEl.style.color = categoryColor;
  },

  // 4. BMR CALCULATOR (Mifflin-St Jeor, Harris-Benedict & Katch-McArdle)
  calcBMR() {
    const age = parseFloat(document.getElementById('bmr-age')?.value) || 28;
    const weight = parseFloat(document.getElementById('bmr-weight')?.value) || 75;
    const height = parseFloat(document.getElementById('bmr-height')?.value) || 178;
    const activityMult = parseFloat(document.getElementById('bmr-activity')?.value) || 1.375;
    const bfPct = parseFloat(document.getElementById('bmr-bodyfat')?.value) || 18;

    if (age <= 0 || weight <= 0 || height <= 0) return;

    // 1. Mifflin-St Jeor
    let mifflin = 10 * weight + 6.25 * height - 5 * age;
    mifflin += (this.bmrGender === 'male' ? 5 : -161);

    // 2. Revised Harris-Benedict
    let harris = this.bmrGender === 'male'
      ? 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)
      : 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);

    // 3. Katch-McArdle (Lean body mass formula)
    const lbmKg = weight * (1 - (bfPct / 100));
    const katch = 370 + (21.6 * lbmKg);

    const tdee = Math.round(mifflin * activityMult);
    const hourlyBurn = (mifflin / 24).toFixed(1);

    const setVal = (id, txt) => { const el = document.getElementById(id); if (el) el.textContent = txt; };
    setVal('res-bmr-val', `${Math.round(mifflin)} kcal/day`);
    setVal('res-tdee-val', `${tdee} kcal/day`);
    setVal('res-bmr-mifflin', `${Math.round(mifflin)} kcal`);
    setVal('res-bmr-harris', `${Math.round(harris)} kcal`);
    setVal('res-bmr-katch', `${Math.round(katch)} kcal`);
    setVal('res-bmr-hourly', `${hourlyBurn} kcal/hr`);

    setVal('res-mild-loss', `${Math.max(1200, tdee - 250)} kcal`);
    setVal('res-weight-loss', `${Math.max(1200, tdee - 500)} kcal`);
    setVal('res-muscle-gain', `${tdee + 350} kcal`);
  },

  // 5. IDEAL BODY WEIGHT (IBW) CALCULATOR
  calcIBW() {
    const heightCm = parseFloat(document.getElementById('ibw-height')?.value) || 175;
    const gender = document.getElementById('ibw-gender')?.value || 'male';

    if (heightCm <= 0) return;

    const heightInches = heightCm / 2.54;
    const inchesOver60 = Math.max(0, heightInches - 60);

    // Devine Formula (1974)
    let devine = gender === 'male' ? 50 + 2.3 * inchesOver60 : 45.5 + 2.3 * inchesOver60;
    // Robinson Formula (1983)
    let robinson = gender === 'male' ? 52 + 1.9 * inchesOver60 : 49 + 1.7 * inchesOver60;
    // Miller Formula (1983)
    let miller = gender === 'male' ? 56.2 + 1.41 * inchesOver60 : 53.1 + 1.36 * inchesOver60;
    // Hamwi Formula (1964)
    let hamwi = gender === 'male' ? 48 + 2.7 * inchesOver60 : 45.5 + 2.2 * inchesOver60;

    const setVal = (id, txt) => { const el = document.getElementById(id); if (el) el.textContent = txt; };
    setVal('res-ibw-devine', `${devine.toFixed(1)} kg (${(devine * 2.20462).toFixed(1)} lbs)`);
    setVal('res-ibw-robinson', `${robinson.toFixed(1)} kg`);
    setVal('res-ibw-miller', `${miller.toFixed(1)} kg`);
    setVal('res-ibw-hamwi', `${hamwi.toFixed(1)} kg`);
  },

  // 6. PACE CALCULATOR (Running, Walking, Cycling & Finish Predictions)
  calcPace() {
    const mode = this.paceMode || 'pace';
    const distUnit = this.paceDistUnit || 'km';
    const paceUnit = this.pacePaceUnit || 'km';

    let dist = parseFloat(document.getElementById('pace-dist')?.value) || 5;
    let distKm = distUnit === 'km' ? dist : dist * 1.609344;
    let distMiles = distKm / 1.609344;

    let h = parseInt(document.getElementById('pace-time-h')?.value) || 0;
    let m = parseInt(document.getElementById('pace-time-m')?.value) || 25;
    let s = parseInt(document.getElementById('pace-time-s')?.value) || 0;
    let totalSec = (h * 3600) + (m * 60) + s;

    let pMin = parseInt(document.getElementById('pace-p-min')?.value) || 5;
    let pSec = parseInt(document.getElementById('pace-p-sec')?.value) || 0;
    let paceSecPerUnit = (pMin * 60) + pSec;

    const formatPace = (sec) => {
      const min = Math.floor(sec / 60);
      const remSec = Math.round(sec % 60);
      return `${min}:${remSec < 10 ? '0' : ''}${remSec}`;
    };

    const setVal = (id, txt) => { const el = document.getElementById(id); if (el) el.textContent = txt; };

    if (mode === 'pace') {
      if (distKm <= 0 || totalSec <= 0) return;
      const secPerKm = totalSec / distKm;
      const secPerMi = totalSec / distMiles;

      const paceKmStr = formatPace(secPerKm) + ' /km';
      const paceMiStr = formatPace(secPerMi) + ' /mi';
      const speedKmh = ((distKm / totalSec) * 3600).toFixed(2) + ' km/h';
      const speedMph = ((distMiles / totalSec) * 3600).toFixed(2) + ' mph';

      setVal('res-pace-primary', paceUnit === 'km' ? paceKmStr : paceMiStr);
      setVal('res-pace-alt', paceUnit === 'km' ? paceMiStr : paceKmStr);
      setVal('res-pace-speed-kmh', speedKmh);
      setVal('res-pace-speed-mph', speedMph);

      const predict = (dKm) => {
        const sec = secPerKm * dKm;
        const th = Math.floor(sec / 3600);
        const tm = Math.floor((sec % 3600) / 60);
        const ts = Math.round(sec % 60);
        return th > 0 ? `${th}h ${tm < 10 ? '0' : ''}${tm}m ${ts < 10 ? '0' : ''}${ts}s` : `${tm}m ${ts < 10 ? '0' : ''}${ts}s`;
      };

      setVal('res-pace-5k', predict(5));
      setVal('res-pace-10k', predict(10));
      setVal('res-pace-half', predict(21.0975));
      setVal('res-pace-full', predict(42.195));
    } else if (mode === 'time') {
      if (distKm <= 0 || paceSecPerUnit <= 0) return;
      const secPerKm = paceUnit === 'km' ? paceSecPerUnit : paceSecPerUnit / 1.609344;
      const calcSec = Math.round(secPerKm * distKm);
      const th = Math.floor(calcSec / 3600);
      const tm = Math.floor((calcSec % 3600) / 60);
      const ts = calcSec % 60;
      setVal('res-pace-primary', `${th > 0 ? th + 'h ' : ''}${tm}m ${ts < 10 ? '0' : ''}${ts}s`);
      setVal('res-pace-alt', `${((distKm / calcSec) * 3600).toFixed(2)} km/h`);
    } else if (mode === 'distance') {
      if (totalSec <= 0 || paceSecPerUnit <= 0) return;
      const secPerKm = paceUnit === 'km' ? paceSecPerUnit : paceSecPerUnit / 1.609344;
      const calcKm = totalSec / secPerKm;
      const calcMi = calcKm / 1.609344;
      setVal('res-pace-primary', `${calcKm.toFixed(2)} km`);
      setVal('res-pace-alt', `${calcMi.toFixed(2)} miles`);
    }
  },

  // 7. ARMY BODY FAT CALCULATOR (AR 600-9 ABCP Tape Test)
  calcArmyBodyFat() {
    const gender = this.armyGender || 'male';
    const ageGroup = document.getElementById('army-age-group')?.value || '21-27';
    const unit = this.armyUnit || 'imperial';

    let heightIn = 0;
    let neckIn = 0;
    let abdomenIn = 0;
    let waistIn = 0;
    let hipIn = 0;
    let weightLbs = 0;

    if (unit === 'imperial') {
      heightIn = parseFloat(document.getElementById('army-height-in')?.value) || 70;
      neckIn = parseFloat(document.getElementById('army-neck-in')?.value) || 16;
      abdomenIn = parseFloat(document.getElementById('army-abdomen-in')?.value) || 34;
      waistIn = parseFloat(document.getElementById('army-waist-in')?.value) || 28;
      hipIn = parseFloat(document.getElementById('army-hip-in')?.value) || 38;
      weightLbs = parseFloat(document.getElementById('army-weight-lbs')?.value) || 180;
    } else {
      const heightCm = parseFloat(document.getElementById('army-height-cm')?.value) || 178;
      const neckCm = parseFloat(document.getElementById('army-neck-cm')?.value) || 40.5;
      const abdomenCm = parseFloat(document.getElementById('army-abdomen-cm')?.value) || 86.5;
      const waistCm = parseFloat(document.getElementById('army-waist-cm')?.value) || 71;
      const hipCm = parseFloat(document.getElementById('army-hip-cm')?.value) || 96.5;
      const weightKg = parseFloat(document.getElementById('army-weight-kg')?.value) || 81.6;

      heightIn = heightCm / 2.54;
      neckIn = neckCm / 2.54;
      abdomenIn = abdomenCm / 2.54;
      waistIn = waistCm / 2.54;
      hipIn = hipCm / 2.54;
      weightLbs = weightKg * 2.20462;
    }

    if (heightIn <= 0 || neckIn <= 0) return;

    let bodyFatPct = 0;
    if (gender === 'male') {
      const diff = abdomenIn - neckIn;
      if (diff <= 0) return;
      bodyFatPct = 86.010 * Math.log10(diff) - 70.041 * Math.log10(heightIn) + 36.76;
    } else {
      const sumDiff = (waistIn + hipIn) - neckIn;
      if (sumDiff <= 0) return;
      bodyFatPct = 163.205 * Math.log10(sumDiff) - 97.684 * Math.log10(heightIn) - 78.387;
    }

    bodyFatPct = Math.round(bodyFatPct * 10) / 10;
    bodyFatPct = Math.max(3, Math.min(60, bodyFatPct));

    const maxLimits = {
      male: { '17-20': 20, '21-27': 22, '28-39': 24, '40+': 26 },
      female: { '17-20': 30, '21-27': 32, '28-39': 34, '40+': 36 }
    };
    const maxAllowed = maxLimits[gender][ageGroup] || 22;
    const meetsStandard = bodyFatPct <= maxAllowed;

    const fatLbs = Math.round(weightLbs * (bodyFatPct / 100) * 10) / 10;
    const leanLbs = Math.round((weightLbs - fatLbs) * 10) / 10;

    const setVal = (id, txt) => { const el = document.getElementById(id); if (el) el.textContent = txt; };
    setVal('res-army-bf-pct', `${bodyFatPct.toFixed(1)}%`);
    setVal('res-army-max-allowable', `${maxAllowed}% (Age ${ageGroup})`);
    setVal('res-army-fat-mass', `${fatLbs} lbs (${(fatLbs * 0.453592).toFixed(1)} kg)`);
    setVal('res-army-lean-mass', `${leanLbs} lbs (${(leanLbs * 0.453592).toFixed(1)} kg)`);

    const resStatus = document.getElementById('res-army-status');
    if (resStatus) {
      if (meetsStandard) {
        resStatus.className = 'army-compliance-banner army-pass';
        resStatus.innerHTML = `✓ MEETS US ARMY AR 600-9 STANDARD (${(maxAllowed - bodyFatPct).toFixed(1)}% under maximum allowable)`;
      } else {
        const excess = (bodyFatPct - maxAllowed).toFixed(1);
        const excessLbs = Math.round(weightLbs * (excess / 100));
        resStatus.className = 'army-compliance-banner army-fail';
        resStatus.innerHTML = `⚠️ EXCEEDS ARMY LIMIT BY ${excess}% (Needs ~${excessLbs} lbs fat reduction)`;
      }
    }
  },

  // 8. LEAN BODY MASS (LBM) CALCULATOR
  calcLBM() {
    const gender = this.lbmGender || 'male';
    const unit = this.lbmUnit || 'metric';
    let w = parseFloat(document.getElementById('lbm-weight')?.value) || 75;
    let h = parseFloat(document.getElementById('lbm-height')?.value) || 178;

    if (unit === 'imperial') {
      const wLbs = parseFloat(document.getElementById('lbm-weight-lbs')?.value) || 165;
      const hFt = parseFloat(document.getElementById('lbm-height-ft')?.value) || 5;
      const hIn = parseFloat(document.getElementById('lbm-height-in')?.value) || 10;
      w = wLbs * 0.45359237;
      h = (hFt * 12 + hIn) * 2.54;
    }

    if (w <= 0 || h <= 0) return;

    let boer = gender === 'male' ? (0.407 * w) + (0.267 * h) - 19.2 : (0.252 * w) + (0.473 * h) - 48.3;
    let james = gender === 'male' ? (1.1 * w) - (128 * Math.pow(w / h, 2)) : (1.07 * w) - (148 * Math.pow(w / h, 2));
    let hume = gender === 'male' ? (0.32810 * w) + (0.33929 * h) - 29.5336 : (0.29569 * w) + (0.41813 * h) - 43.2933;

    const avgLBM = (boer + james + hume) / 3;
    const fatMass = Math.max(0, w - avgLBM);
    const leanPct = (avgLBM / w) * 100;
    const fatPct = (fatMass / w) * 100;

    const hM = h / 100;
    const ffmi = avgLBM / (hM * hM);
    const normFfmi = ffmi + 6.1 * (1.8 - hM);

    let ffmiTier = 'Average Muscularity';
    if (gender === 'male') {
      if (normFfmi < 18) ffmiTier = 'Below Average';
      else if (normFfmi < 20) ffmiTier = 'Average Muscularity';
      else if (normFfmi < 22) ffmiTier = 'Above Average / Athletic';
      else if (normFfmi < 24) ffmiTier = 'Excellent / Highly Muscular';
      else ffmiTier = 'Superior / Elite (Natural Limit)';
    } else {
      if (normFfmi < 15) ffmiTier = 'Below Average';
      else if (normFfmi < 17) ffmiTier = 'Average Muscularity';
      else if (normFfmi < 19) ffmiTier = 'Athletic';
      else ffmiTier = 'Elite Muscularity';
    }

    const setVal = (id, txt) => { const el = document.getElementById(id); if (el) el.textContent = txt; };
    setVal('res-lbm-val', `${avgLBM.toFixed(1)} kg (${(avgLBM * 2.20462).toFixed(1)} lbs)`);
    setVal('res-lbm-fat-mass', `${fatMass.toFixed(1)} kg (${(fatMass * 2.20462).toFixed(1)} lbs)`);
    setVal('res-lbm-pct', `${leanPct.toFixed(1)}%`);
    setVal('res-lbm-bf-pct', `${fatPct.toFixed(1)}%`);
    setVal('res-lbm-ffmi', `${normFfmi.toFixed(1)} (${ffmiTier})`);

    setVal('res-lbm-boer', `${boer.toFixed(1)} kg`);
    setVal('res-lbm-james', `${james.toFixed(1)} kg`);
    setVal('res-lbm-hume', `${hume.toFixed(1)} kg`);
  },

  // 9. HEALTHY WEIGHT CALCULATOR (WHO BMI & Hamwi Frame Adjustments)
  calcHealthyWeight() {
    const gender = this.hwGender || 'male';
    const unit = this.hwUnit || 'metric';
    const frame = document.getElementById('hw-frame')?.value || 'medium';

    let hCm = parseFloat(document.getElementById('hw-height')?.value) || 175;
    let currWKg = parseFloat(document.getElementById('hw-weight')?.value) || 75;

    if (unit === 'imperial') {
      const hFt = parseFloat(document.getElementById('hw-height-ft')?.value) || 5;
      const hIn = parseFloat(document.getElementById('hw-height-in')?.value) || 9;
      const wLbs = parseFloat(document.getElementById('hw-weight-lbs')?.value) || 165;
      hCm = (hFt * 12 + hIn) * 2.54;
      currWKg = wLbs * 0.45359237;
    }

    if (hCm <= 0 || currWKg <= 0) return;

    const hM = hCm / 100;
    const minKg = 18.5 * (hM * hM);
    const maxKg = 24.9 * (hM * hM);

    const inOver5ft = Math.max(0, (hCm - 152.4) / 2.54);
    let hamwi = gender === 'male' ? (48.0 + 2.7 * inOver5ft) : (45.5 + 2.2 * inOver5ft);

    if (frame === 'small') hamwi *= 0.90;
    else if (frame === 'large') hamwi *= 1.10;

    let deltaMsg = '';
    let deltaColor = '#10b981';
    let gaugePct = 50;

    if (currWKg < minKg) {
      const diffKg = (minKg - currWKg).toFixed(1);
      const diffLbs = (diffKg * 2.20462).toFixed(1);
      deltaMsg = `Under healthy range: Gain ${diffKg} kg (${diffLbs} lbs) to reach normal BMI 18.5`;
      deltaColor = '#38bdf8';
      gaugePct = Math.max(5, (currWKg / minKg) * 25);
    } else if (currWKg > maxKg) {
      const diffKg = (currWKg - maxKg).toFixed(1);
      const diffLbs = (diffKg * 2.20462).toFixed(1);
      deltaMsg = `Above healthy range: Lose ${diffKg} kg (${diffLbs} lbs) to reach normal BMI 24.9`;
      deltaColor = '#ef4444';
      gaugePct = Math.min(95, 75 + ((currWKg - maxKg) / maxKg) * 20);
    } else {
      deltaMsg = `✓ You are in the clinical healthy weight range (BMI ${(currWKg / (hM * hM)).toFixed(1)})`;
      deltaColor = '#10b981';
      gaugePct = 25 + ((currWKg - minKg) / (maxKg - minKg)) * 50;
    }

    const setVal = (id, txt) => { const el = document.getElementById(id); if (el) el.textContent = txt; };
    const minLbs = (minKg * 2.20462).toFixed(1);
    const maxLbs = (maxKg * 2.20462).toFixed(1);
    const hamwiLbs = (hamwi * 2.20462).toFixed(1);

    setVal('res-hw-range', `${minKg.toFixed(1)} – ${maxKg.toFixed(1)} kg (${minLbs} – ${maxLbs} lbs)`);
    setVal('res-hw-hamwi', `${hamwi.toFixed(1)} kg (${hamwiLbs} lbs)`);

    const deltaEl = document.getElementById('res-hw-delta');
    if (deltaEl) {
      deltaEl.textContent = deltaMsg;
      deltaEl.style.color = deltaColor;
    }

    const pointer = document.getElementById('hw-gauge-pointer');
    if (pointer) {
      pointer.style.left = `${gaugePct}%`;
    }
  },

  // 10. CALORIES BURNED CALCULATOR (MET-Based Exercise Energy Burn)
  calcCaloriesBurned() {
    const met = parseFloat(document.getElementById('cb-activity')?.value) || 8.0;
    const duration = parseFloat(document.getElementById('cb-duration')?.value) || 45;
    const unit = this.cbUnit || 'metric';

    let weightKg = parseFloat(document.getElementById('cb-weight')?.value) || 75;
    if (unit === 'imperial') {
      const weightLbs = parseFloat(document.getElementById('cb-weight-lbs')?.value) || 165;
      weightKg = weightLbs * 0.45359237;
    }

    if (duration <= 0 || weightKg <= 0) return;

    // Compendium of Physical Activities Formula:
    // Calories = Duration(min) * (MET * 3.5 * weightKg / 200)
    const calsTotal = duration * (met * 3.5 * weightKg / 200);
    const calsPerMin = calsTotal / duration;
    const calsPerHour = calsPerMin * 60;
    const fatGrams = (calsTotal / 7.7);
    const fatOz = fatGrams * 0.035274;

    const setVal = (id, txt) => { const el = document.getElementById(id); if (el) el.textContent = txt; };
    setVal('res-cb-total', `${Math.round(calsTotal).toLocaleString()} kcal`);
    setVal('res-cb-per-hour', `${Math.round(calsPerHour).toLocaleString()} kcal/hr`);
    setVal('res-cb-per-min', `${calsPerMin.toFixed(1)} kcal/min`);
    setVal('res-cb-fat', `${fatGrams.toFixed(1)} g (${fatOz.toFixed(2)} oz)`);

    const compCalc = (m) => Math.round(duration * (m * 3.5 * weightKg / 200));
    setVal('res-cb-run', `${compCalc(9.8)} kcal`);
    setVal('res-cb-cycle', `${compCalc(8.0)} kcal`);
    setVal('res-cb-swim', `${compCalc(7.0)} kcal`);
    setVal('res-cb-walk', `${compCalc(3.5)} kcal`);
    setVal('res-cb-weights', `${compCalc(6.0)} kcal`);
    setVal('res-cb-hiit', `${compCalc(8.0)} kcal`);
  },

  // 11. ONE REP MAX (1RM) CALCULATOR
  calcOneRepMax() {
    const weight = parseFloat(document.getElementById('orm-weight')?.value) || 100;
    const reps = parseInt(document.getElementById('orm-reps')?.value) || 5;
    const unit = this.ormUnit || 'kg';

    if (weight <= 0 || reps <= 0) return;

    if (reps === 1) {
      this.render1RMTable(weight, unit);
      const setVal = (id, txt) => { const el = document.getElementById(id); if (el) el.textContent = txt; };
      setVal('res-orm-max', `${weight.toFixed(1)} ${unit}`);
      setVal('res-orm-epley', `${weight.toFixed(1)} ${unit}`);
      setVal('res-orm-brzycki', `${weight.toFixed(1)} ${unit}`);
      setVal('res-orm-lombardi', `${weight.toFixed(1)} ${unit}`);
      setVal('res-orm-oconner', `${weight.toFixed(1)} ${unit}`);
      return;
    }

    const epley = weight * (1 + reps / 30);
    const brzycki = reps < 37 ? weight * (36 / (37 - reps)) : epley;
    const lombardi = weight * Math.pow(reps, 0.10);
    const oconner = weight * (1 + 0.025 * reps);
    const mayhew = (100 * weight) / (52.2 + 41.9 * Math.exp(-0.055 * reps));

    const avg1RM = (epley + brzycki + lombardi + oconner + mayhew) / 5;

    const setVal = (id, txt) => { const el = document.getElementById(id); if (el) el.textContent = txt; };
    setVal('res-orm-max', `${Math.round(avg1RM * 10) / 10} ${unit}`);
    setVal('res-orm-epley', `${Math.round(epley * 10) / 10} ${unit}`);
    setVal('res-orm-brzycki', `${Math.round(brzycki * 10) / 10} ${unit}`);
    setVal('res-orm-lombardi', `${Math.round(lombardi * 10) / 10} ${unit}`);
    setVal('res-orm-oconner', `${Math.round(oconner * 10) / 10} ${unit}`);

    this.render1RMTable(avg1RM, unit);
  },

  render1RMTable(oneRM, unit) {
    const percentages = [
      { pct: 100, reps: '1 rep' },
      { pct: 95, reps: '2 reps' },
      { pct: 90, reps: '4 reps' },
      { pct: 85, reps: '6 reps' },
      { pct: 80, reps: '8 reps' },
      { pct: 75, reps: '10 reps' },
      { pct: 70, reps: '12 reps' },
      { pct: 65, reps: '15 reps' },
      { pct: 60, reps: '20 reps' },
      { pct: 50, reps: 'Warm-up' }
    ];

    const tbody = document.getElementById('orm-breakdown-tbody');
    if (!tbody) return;

    tbody.innerHTML = percentages.map(item => {
      const load = Math.round((oneRM * (item.pct / 100)) * 10) / 10;
      return `
        <tr>
          <td><strong>${item.pct}%</strong></td>
          <td style="font-weight:700; color:var(--accent-primary);">${load} ${unit}</td>
          <td style="color:var(--text-muted);">${item.reps}</td>
        </tr>
      `;
    }).join('');
  },

  // 12. TARGET HEART RATE CALCULATOR (Karvonen HRR & 5 Heart Rate Zones)
  calcTargetHeartRate() {
    const age = parseInt(document.getElementById('thr-age')?.value) || 30;
    const rhr = parseInt(document.getElementById('thr-rhr')?.value) || 65;
    const formula = document.getElementById('thr-formula')?.value || 'tanaka';

    if (age <= 0 || rhr <= 0) return;

    let maxHR = 208 - (0.7 * age); // Tanaka
    if (formula === 'fox') {
      maxHR = 220 - age;
    } else if (formula === 'gellish') {
      maxHR = 207 - (0.7 * age);
    }
    maxHR = Math.round(maxHR);

    const hrr = Math.max(0, maxHR - rhr);

    const calcZone = (lowPct, highPct) => {
      const lowBpm = Math.round(rhr + (lowPct * hrr));
      const highBpm = Math.round(rhr + (highPct * hrr));
      return `${lowBpm} – ${highBpm} bpm`;
    };

    const setVal = (id, txt) => { const el = document.getElementById(id); if (el) el.textContent = txt; };
    setVal('res-thr-max', `${maxHR} bpm`);
    setVal('res-thr-hrr', `${hrr} bpm`);
    setVal('res-thr-rhr-display', `${rhr} bpm`);

    setVal('res-thr-zone1', calcZone(0.50, 0.60));
    setVal('res-thr-zone2', calcZone(0.60, 0.70));
    setVal('res-thr-zone3', calcZone(0.70, 0.80));
    setVal('res-thr-zone4', calcZone(0.80, 0.90));
    setVal('res-thr-zone5', calcZone(0.90, 1.00));
  },

  // 13. WATER INTAKE CALCULATOR
  calcWater() {
    const weightKg = parseFloat(document.getElementById('water-weight')?.value) || 70;
    const exerciseMins = parseFloat(document.getElementById('water-exercise')?.value) || 30;
    const climate = document.getElementById('water-climate')?.value || 'temperate';

    if (weightKg <= 0) return;

    // Baseline: ~35ml per kg body weight
    let waterMl = weightKg * 35;
    // Exercise: add ~350ml per 30 minutes of moderate activity
    waterMl += (exerciseMins / 30) * 350;
    // Climate adjustment
    if (climate === 'hot') waterMl *= 1.15;
    else if (climate === 'very-hot') waterMl *= 1.30;

    const litres = (waterMl / 1000).toFixed(1);
    const flOz = Math.round(waterMl * 0.033814);
    const glasses = Math.round(waterMl / 250);

    const setVal = (id, txt) => { const el = document.getElementById(id); if (el) el.textContent = txt; };
    setVal('res-water-litres', `${litres} L`);
    setVal('res-water-floz', `${flOz} fl oz`);
    setVal('res-water-glasses', `${glasses} glasses (250ml)`);

    const fillPercent = Math.min(100, Math.round((waterMl / 4000) * 100));
    const waterLevel = document.getElementById('water-bottle-level');
    if (waterLevel) waterLevel.style.height = `${fillPercent}%`;
  },

  // ------------------------------------------------------------------------
  // 14. PREGNANCY CALCULATOR (Gestational Age, Trimester, EDD, Fruit, Timeline)
  // ------------------------------------------------------------------------
  calcPregnancy() {
    const today = new Date();
    const todayMid = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    let eddDate = null;
    let clinicalLmp = null;

    if (this.pregMethod === 'lmp') {
      const lmpVal = document.getElementById('preg-lmp-date')?.value;
      const lmpDate = this.parseLocalDate(lmpVal);
      const cycleLen = parseInt(document.getElementById('preg-cycle-len')?.value) || 28;
      eddDate = this.addDays(lmpDate, 280 + (cycleLen - 28));
      clinicalLmp = this.addDays(eddDate, -280);
    } else if (this.pregMethod === 'duedate') {
      const ddVal = document.getElementById('preg-due-date')?.value;
      eddDate = this.parseLocalDate(ddVal);
      clinicalLmp = this.addDays(eddDate, -280);
    } else if (this.pregMethod === 'conception') {
      const concVal = document.getElementById('preg-conception-date')?.value;
      const concDate = this.parseLocalDate(concVal);
      eddDate = this.addDays(concDate, 266);
      clinicalLmp = this.addDays(eddDate, -280);
    } else if (this.pregMethod === 'ultrasound') {
      const usVal = document.getElementById('preg-us-date')?.value;
      const usDate = this.parseLocalDate(usVal);
      const usWeeks = parseInt(document.getElementById('preg-us-weeks')?.value) || 0;
      const usDays = parseInt(document.getElementById('preg-us-days')?.value) || 0;
      clinicalLmp = this.addDays(usDate, -(usWeeks * 7 + usDays));
      eddDate = this.addDays(clinicalLmp, 280);
    }

    if (!eddDate || isNaN(eddDate.getTime())) return;

    const diffDaysTotal = Math.floor((todayMid - clinicalLmp) / 86400000);
    const gaDays = Math.max(0, Math.min(308, diffDaysTotal)); // clamp 0 to 44 weeks
    const gaWeeks = Math.floor(gaDays / 7);
    const gaDaysRem = gaDays % 7;

    const daysRemaining = Math.max(0, Math.ceil((eddDate - todayMid) / 86400000));
    const pctComplete = Math.min(100, Math.max(0, Math.round((gaDays / 280) * 100)));

    let trimester = '1st Trimester';
    if (gaWeeks >= 28) {
      trimester = '3rd Trimester';
    } else if (gaWeeks >= 14) {
      trimester = '2nd Trimester';
    }

    const setVal = (id, txt) => { const el = document.getElementById(id); if (el) el.textContent = txt; };

    setVal('res-preg-ga', `${gaWeeks} Weeks, ${gaDaysRem} Days`);
    setVal('res-preg-edd', this.formatDate(eddDate));
    setVal('res-preg-days-left', `${daysRemaining} Days to Go`);
    setVal('res-preg-trimester', trimester);
    setVal('res-preg-conception', this.formatDate(this.addDays(clinicalLmp, 14)));
    setVal('res-preg-days-pregnant', `${gaDays} Days`);

    const pBar = document.getElementById('res-preg-progress-bar');
    if (pBar) pBar.style.width = `${pctComplete}%`;
    setVal('res-preg-progress-text', `${pctComplete}% of 40-Week Journey`);

    // Fetal Fruit Size lookup
    const pregFruitMap = {
      4: { fruit: 'Poppy Seed', emoji: '🌱', size: '~1 mm (0.04 in)', weight: '< 0.1 g', desc: 'Blastocyst implants into uterine wall; amniotic cavity begins forming.' },
      5: { fruit: 'Apple Seed', emoji: '🍎', size: '~2 mm (0.08 in)', weight: '~0.05 g', desc: 'Neural tube closes; primitive heartbeat circulation starts.' },
      6: { fruit: 'Sweet Pea', emoji: '🫛', size: '~6 mm (0.25 in)', weight: '~0.15 g', desc: 'Heart beats at ~110 bpm; retinal pigment and ear pits visible.' },
      7: { fruit: 'Blueberry', emoji: '🫐', size: '~1.3 cm (0.5 in)', weight: '~0.5 g', desc: 'Brain hemispheres dividing; paddle-like limb buds emerge.' },
      8: { fruit: 'Raspberry', emoji: '🍇', size: '~1.6 cm (0.6 in)', weight: '~1.0 g', desc: 'Webbed fingers separating; spontaneous tiny twitches start.' },
      9: { fruit: 'Green Olive', emoji: '🫒', size: '~2.3 cm (0.9 in)', weight: '~2.0 g', desc: 'Officially a fetus! Four-chambered heart and joints form.' },
      10: { fruit: 'Prune', emoji: '🫐', size: '~3.1 cm (1.2 in)', weight: '~4.0 g', desc: 'Vital organs functioning; tiny fingernails and tooth buds form.' },
      11: { fruit: 'Lime', emoji: '🍋', size: '~4.1 cm (1.6 in)', weight: '~7.0 g', desc: 'Bones begin ossifying; diaphragm movements practice breathing.' },
      12: { fruit: 'Plum', emoji: '🍑', size: '~5.4 cm (2.1 in)', weight: '~14 g (0.5 oz)', desc: 'Reflexes active; vocal cords form and kidneys produce urine.' },
      13: { fruit: 'Meyer Lemon', emoji: '🍋', size: '~7.4 cm (2.9 in)', weight: '~23 g (0.8 oz)', desc: 'Final week of 1st trimester; unique fingerprints set in stone.' },
      14: { fruit: 'Peach', emoji: '🍑', size: '~8.7 cm (3.4 in)', weight: '~43 g (1.5 oz)', desc: '2nd trimester begins! Facial expressions and thumb-sucking.' },
      15: { fruit: 'Apple', emoji: '🍎', size: '~10.1 cm (4.0 in)', weight: '~70 g (2.5 oz)', desc: 'Baby can perceive light through eyelids; skeleton hardening.' },
      16: { fruit: 'Avocado', emoji: '🥑', size: '~11.6 cm (4.6 in)', weight: '~100 g (3.5 oz)', desc: 'Ears in final position; heart pumps ~25 quarts of blood daily.' },
      17: { fruit: 'Pomegranate', emoji: '🫐', size: '~13.0 cm (5.1 in)', weight: '~140 g (4.9 oz)', desc: 'Adipose fat stores accumulate; rubbery cartilage skeleton.' },
      18: { fruit: 'Bell Pepper', emoji: '🫑', size: '~14.2 cm (5.6 in)', weight: '~190 g (6.7 oz)', desc: 'Myelin sheath insulates nerves; maternal flutter kicks (quickening).' },
      19: { fruit: 'Mango', emoji: '🥭', size: '~15.3 cm (6.0 in)', weight: '~240 g (8.5 oz)', desc: 'Vernix caseosa coats skin for protective waterproofing.' },
      20: { fruit: 'Banana', emoji: '🍌', size: '~25.6 cm (10.1 in)', weight: '~300 g (10.6 oz)', desc: 'Halfway mark! Detailed anatomy scan week; taste buds functional.' },
      21: { fruit: 'Carrot', emoji: '🥕', size: '~26.7 cm (10.5 in)', weight: '~360 g (12.7 oz)', desc: 'Bone marrow produces red blood cells; kicks grow stronger.' },
      22: { fruit: 'Spaghetti Squash', emoji: '🍈', size: '~27.8 cm (10.9 in)', weight: '~430 g (15.2 oz)', desc: 'Grip reflex active; eyebrows and eyelashes sculpted.' },
      23: { fruit: 'Grapefruit', emoji: '🍊', size: '~28.9 cm (11.4 in)', weight: '~500 g (1.1 lbs)', desc: 'Rapid Eye Movement (REM) sleep detected; inner ears mature.' },
      24: { fruit: 'Ear of Corn', emoji: '🌽', size: '~30.0 cm (11.8 in)', weight: '~600 g (1.3 lbs)', desc: 'Viability milestone! Lungs produce surfactant branches.' },
      25: { fruit: 'Acorn Squash', emoji: '🎃', size: '~34.6 cm (13.6 in)', weight: '~660 g (1.5 lbs)', desc: 'Spine structures solidify; capillaries give skin a rosy hue.' },
      26: { fruit: 'Zucchini', emoji: '🥒', size: '~35.6 cm (14.0 in)', weight: '~760 g (1.7 lbs)', desc: 'Eyes open for the first time; reacts to external music and voices.' },
      27: { fruit: 'Cauliflower', emoji: '🥦', size: '~36.6 cm (14.4 in)', weight: '~875 g (1.9 lbs)', desc: 'End of 2nd trimester! Rhythmic diaphragm practice breaths.' },
      28: { fruit: 'Eggplant', emoji: '🍆', size: '~37.6 cm (14.8 in)', weight: '~1.0 kg (2.2 lbs)', desc: '3rd trimester begins! Baby weighs over 1 kg; blinking eyelashes.' },
      29: { fruit: 'Butternut Squash', emoji: '🍈', size: '~38.6 cm (15.2 in)', weight: '~1.15 kg (2.5 lbs)', desc: 'Brain rapidly expanding; billions of new neurons firing.' },
      30: { fruit: 'Cabbage', emoji: '🥬', size: '~39.9 cm (15.7 in)', weight: '~1.3 kg (2.9 lbs)', desc: 'Brain surface folds deeply into distinct adult-like convolutions.' },
      31: { fruit: 'Coconut', emoji: '🥥', size: '~41.1 cm (16.2 in)', weight: '~1.5 kg (3.3 lbs)', desc: 'Major growth spurt; can turn head side to side.' },
      32: { fruit: 'Jicama', emoji: '🥔', size: '~42.4 cm (16.7 in)', weight: '~1.7 kg (3.7 lbs)', desc: 'Toenails fully formed; practice breathing exercises lung volume.' },
      33: { fruit: 'Pineapple', emoji: '🍍', size: '~43.7 cm (17.2 in)', weight: '~1.9 kg (4.2 lbs)', desc: 'Amniotic fluid volume peaks; baby usually rotates head-down.' },
      34: { fruit: 'Cantaloupe', emoji: '🍈', size: '~45.0 cm (17.7 in)', weight: '~2.15 kg (4.7 lbs)', desc: 'Maternal antibodies pass across placenta to build baby immunity.' },
      35: { fruit: 'Honeydew', emoji: '🍈', size: '~46.2 cm (18.2 in)', weight: '~2.4 kg (5.3 lbs)', desc: 'Kidneys and liver processing waste; kidneys produce urine daily.' },
      36: { fruit: 'Romaine Lettuce', emoji: '🥬', size: '~47.4 cm (18.7 in)', weight: '~2.6 kg (5.8 lbs)', desc: 'Facial and sucking muscles ready; shedding fine lanugo hair.' },
      37: { fruit: 'Swiss Chard', emoji: '🥬', size: '~48.6 cm (19.1 in)', weight: '~2.85 kg (6.3 lbs)', desc: 'Early Term! Surfactant levels fully mature for room air breathing.' },
      38: { fruit: 'Winter Melon', emoji: '🍈', size: '~49.8 cm (19.6 in)', weight: '~3.1 kg (6.8 lbs)', desc: 'Firm grasp reflex; gaining ~30g of healthy adipose tissue per day.' },
      39: { fruit: 'Mini Watermelon', emoji: '🍉', size: '~50.7 cm (20.0 in)', weight: '~3.3 kg (7.3 lbs)', desc: 'Full Term! Skull bones pliable to ease passage through birth canal.' },
      40: { fruit: 'Ripe Watermelon', emoji: '🍉', size: '~51.2 cm (20.2 in)', weight: '~3.5 kg (7.7 lbs)', desc: 'Happy Due Date! Baby is fully mature and ready to be born.' }
    };

    const targetWeekKey = Math.min(40, Math.max(4, gaWeeks || 4));
    const fruitData = pregFruitMap[targetWeekKey] || pregFruitMap[40];

    setVal('res-preg-fruit-name', `${fruitData.fruit} (Week ${targetWeekKey})`);
    setVal('res-preg-fruit-emoji', fruitData.emoji);
    setVal('res-preg-fruit-stats', `Length: ${fruitData.size} • Weight: ${fruitData.weight}`);
    setVal('res-preg-fruit-desc', fruitData.desc);

    // Dynamic Milestone Schedule
    const milestones = [
      { name: 'Estimated Conception Date', date: this.addDays(clinicalLmp, 14), dayTarget: 14 },
      { name: 'First Trimester Screening / NIPT', date: this.addDays(clinicalLmp, 70), dayTarget: 70 },
      { name: 'Doppler Fetal Heartbeat Audible', date: this.addDays(clinicalLmp, 77), dayTarget: 77 },
      { name: 'End of 1st Trimester (13w 6d)', date: this.addDays(clinicalLmp, 97), dayTarget: 97 },
      { name: 'Anatomy / Gender Scan (20w 0d)', date: this.addDays(clinicalLmp, 140), dayTarget: 140 },
      { name: 'Fetal Viability Milestone (24w 0d)', date: this.addDays(clinicalLmp, 168), dayTarget: 168 },
      { name: 'Glucose Tolerance Screening (26w)', date: this.addDays(clinicalLmp, 182), dayTarget: 182 },
      { name: 'End of 2nd Trimester (27w 6d)', date: this.addDays(clinicalLmp, 195), dayTarget: 195 },
      { name: 'Group B Strep (GBS) Screen (36w)', date: this.addDays(clinicalLmp, 252), dayTarget: 252 },
      { name: 'Full Term Milestone (37w 0d)', date: this.addDays(clinicalLmp, 259), dayTarget: 259 },
      { name: 'Estimated Due Date (40w 0d)', date: eddDate, dayTarget: 280 }
    ];

    const mlContainer = document.getElementById('res-preg-milestones-list');
    if (mlContainer) {
      mlContainer.innerHTML = milestones.map(m => {
        let statusClass = 'upcoming';
        let statusBadge = 'Upcoming';
        if (gaDays >= m.dayTarget + 7) {
          statusClass = 'completed';
          statusBadge = 'Completed ✓';
        } else if (gaDays >= m.dayTarget - 7) {
          statusClass = 'current';
          statusBadge = 'Active / Current ★';
        }
        return `
          <div class="milestone-row ${statusClass}">
            <span class="milestone-name">
              <span>${m.name}</span>
            </span>
            <div style="display:flex; align-items:center; gap:0.5rem;">
              <span class="milestone-date-badge">${this.formatDateShort(m.date)}</span>
              <span class="badge" style="font-size:0.72rem; padding:2px 6px;">${statusBadge}</span>
            </div>
          </div>
        `;
      }).join('');
    }
  },

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
  calcPregnancyConception() {
    const today = new Date();
    const todayMid = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    let conceptionDate = null;
    let eddDate = null;
    let clinicalLmp = null;

    if (this.pconcMethod === 'edd') {
      const eddVal = document.getElementById('pconc-edd-date')?.value;
      eddDate = this.parseLocalDate(eddVal);
      conceptionDate = this.addDays(eddDate, -266);
      clinicalLmp = this.addDays(eddDate, -280);
    } else if (this.pconcMethod === 'lmp') {
      const lmpVal = document.getElementById('pconc-lmp-date')?.value;
      const lmpDate = this.parseLocalDate(lmpVal);
      const cycleLen = parseInt(document.getElementById('pconc-cycle-len')?.value) || 28;
      conceptionDate = this.addDays(lmpDate, cycleLen - 14);
      eddDate = this.addDays(conceptionDate, 266);
      clinicalLmp = this.addDays(eddDate, -280);
    } else if (this.pconcMethod === 'ultrasound') {
      const usVal = document.getElementById('pconc-us-date')?.value;
      const usDate = this.parseLocalDate(usVal);
      const usWeeks = parseInt(document.getElementById('pconc-us-weeks')?.value) || 0;
      const usDays = parseInt(document.getElementById('pconc-us-days')?.value) || 0;
      clinicalLmp = this.addDays(usDate, -(usWeeks * 7 + usDays));
      conceptionDate = this.addDays(clinicalLmp, 14);
      eddDate = this.addDays(clinicalLmp, 280);
    }

    if (!conceptionDate || isNaN(conceptionDate.getTime())) return;

    const fertileStart = this.addDays(conceptionDate, -5);
    const fertileEnd = this.addDays(conceptionDate, 1);
    const implantStart = this.addDays(conceptionDate, 6);
    const implantEnd = this.addDays(conceptionDate, 12);

    const fetalDaysTotal = Math.max(0, Math.floor((todayMid - conceptionDate) / 86400000));
    const fetalWeeks = Math.floor(fetalDaysTotal / 7);
    const fetalDaysRem = fetalDaysTotal % 7;

    const gaDaysTotal = Math.max(0, Math.floor((todayMid - clinicalLmp) / 86400000));
    const gaWeeks = Math.floor(gaDaysTotal / 7);
    const gaDaysRem = gaDaysTotal % 7;

    const setVal = (id, txt) => { const el = document.getElementById(id); if (el) el.textContent = txt; };

    setVal('res-pconc-date', this.formatDate(conceptionDate));
    setVal('res-pconc-intercourse', `${this.formatDateShort(fertileStart)} – ${this.formatDateShort(fertileEnd)}`);
    setVal('res-pconc-implantation', `${this.formatDateShort(implantStart)} – ${this.formatDateShort(implantEnd)}`);
    setVal('res-pconc-fetal-age', `${fetalWeeks} Weeks, ${fetalDaysRem} Days`);
    setVal('res-pconc-ga', `${gaWeeks} Weeks, ${gaDaysRem} Days`);
    setVal('res-pconc-edd', this.formatDate(eddDate));
  },

  // ------------------------------------------------------------------------
  // 17. DUE DATE CALCULATOR (4 Clinical Methods)
  // ------------------------------------------------------------------------
  calcDueDate() {
    const today = new Date();
    const todayMid = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    let eddDate = null;
    let clinicalLmp = null;

    if (this.ddMethod === 'lmp') {
      const lmpVal = document.getElementById('dd-lmp-date')?.value;
      const lmpDate = this.parseLocalDate(lmpVal);
      const cycleLen = parseInt(document.getElementById('dd-cycle-len')?.value) || 28;
      eddDate = this.addDays(lmpDate, 280 + (cycleLen - 28));
      clinicalLmp = this.addDays(eddDate, -280);
    } else if (this.ddMethod === 'conception') {
      const concVal = document.getElementById('dd-conception-date')?.value;
      const concDate = this.parseLocalDate(concVal);
      eddDate = this.addDays(concDate, 266);
      clinicalLmp = this.addDays(eddDate, -280);
    } else if (this.ddMethod === 'ultrasound') {
      const usVal = document.getElementById('dd-us-date')?.value;
      const usDate = this.parseLocalDate(usVal);
      const usWeeks = parseInt(document.getElementById('dd-us-weeks')?.value) || 0;
      const usDays = parseInt(document.getElementById('dd-us-days')?.value) || 0;
      clinicalLmp = this.addDays(usDate, -(usWeeks * 7 + usDays));
      eddDate = this.addDays(clinicalLmp, 280);
    } else if (this.ddMethod === 'ivf') {
      const ivfVal = document.getElementById('dd-ivf-date')?.value;
      const ivfDate = this.parseLocalDate(ivfVal);
      const offsetDays = this.ddIvfType === 'day3' ? 263 : 261;
      eddDate = this.addDays(ivfDate, offsetDays);
      clinicalLmp = this.addDays(eddDate, -280);
    }

    if (!eddDate || isNaN(eddDate.getTime())) return;

    const diffDaysTotal = Math.floor((todayMid - clinicalLmp) / 86400000);
    const gaDays = Math.max(0, Math.min(308, diffDaysTotal));
    const gaWeeks = Math.floor(gaDays / 7);
    const gaDaysRem = gaDays % 7;

    const daysRemaining = Math.max(0, Math.ceil((eddDate - todayMid) / 86400000));
    const pct = Math.min(100, Math.max(0, Math.round((gaDays / 280) * 100)));

    let trimester = '1st Trimester';
    if (gaWeeks >= 28) trimester = '3rd Trimester';
    else if (gaWeeks >= 14) trimester = '2nd Trimester';

    const setVal = (id, txt) => { const el = document.getElementById(id); if (el) el.textContent = txt; };

    setVal('res-dd-due-date', this.formatDate(eddDate));
    setVal('res-dd-countdown', `${daysRemaining} Days to Arrival`);
    setVal('res-dd-ga', `${gaWeeks} Weeks, ${gaDaysRem} Days`);
    setVal('res-dd-trimester', trimester);
    setVal('res-dd-conception', this.formatDate(this.addDays(clinicalLmp, 14)));
    setVal('res-dd-end-tri1', this.formatDate(this.addDays(clinicalLmp, 97)));
    setVal('res-dd-halfway', this.formatDate(this.addDays(clinicalLmp, 140)));
    setVal('res-dd-viability', this.formatDate(this.addDays(clinicalLmp, 168)));
    setVal('res-dd-end-tri2', this.formatDate(this.addDays(clinicalLmp, 195)));
    setVal('res-dd-fullterm', this.formatDate(this.addDays(clinicalLmp, 259)));

    const pb = document.getElementById('res-dd-progress-bar');
    if (pb) pb.style.width = `${pct}%`;
    setVal('res-dd-progress-text', `${pct}% completed`);
  },

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
  calcConception() {
    const setVal = (id, txt) => { const el = document.getElementById(id); if (el) el.textContent = txt; };

    if (this.concMode === 'fertile') {
      const lmpVal = document.getElementById('conc-lmp-date')?.value;
      const lmpDate = this.parseLocalDate(lmpVal);
      const cycleLen = parseInt(document.getElementById('conc-cycle-len')?.value) || 28;

      if (!lmpDate || isNaN(lmpDate.getTime())) return;

      const ovDate = this.addDays(lmpDate, cycleLen - 14);
      const primeStart = this.addDays(ovDate, -5);
      const primeEnd = this.addDays(ovDate, 1);
      const implantStart = this.addDays(ovDate, 6);
      const implantEnd = this.addDays(ovDate, 12);
      const urineTest = this.addDays(ovDate, 12);
      const bloodTest = this.addDays(ovDate, 10);
      const predEDD = this.addDays(ovDate, 266);

      setVal('res-conc-prime-window', `${this.formatDateShort(primeStart)} – ${this.formatDateShort(primeEnd)}`);
      setVal('res-conc-ovulation', this.formatDate(ovDate));
      setVal('res-conc-implantation', `${this.formatDateShort(implantStart)} – ${this.formatDateShort(implantEnd)}`);
      setVal('res-conc-urine-test', this.formatDate(urineTest));
      setVal('res-conc-blood-test', this.formatDate(bloodTest));
      setVal('res-conc-pred-edd', this.formatDate(predEDD));
    } else {
      const targetVal = document.getElementById('conc-target-date')?.value;
      const targetEDD = this.parseLocalDate(targetVal);
      const cycleLen = parseInt(document.getElementById('conc-target-cycle-len')?.value) || 28;

      if (!targetEDD || isNaN(targetEDD.getTime())) return;

      const targetConception = this.addDays(targetEDD, -266);
      const primeStart = this.addDays(targetConception, -5);
      const primeEnd = targetConception;
      const targetLmp = this.addDays(targetConception, -(cycleLen - 14));

      const zodiac = this.getZodiacSign(targetEDD.getMonth() + 1, targetEDD.getDate());

      setVal('res-conc-target-conception', this.formatDate(targetConception));
      setVal('res-conc-target-window', `${this.formatDateShort(primeStart)} – ${this.formatDateShort(primeEnd)}`);
      setVal('res-conc-target-lmp', this.formatDate(targetLmp));
      setVal('res-conc-zodiac', zodiac);
      setVal('res-conc-target-edd-disp', this.formatDate(targetEDD));
    }
  },

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
  calcMacro() {
    const isMale = this.macroGender === 'male';
    const isMetric = this.macroUnit === 'metric';
    const age = parseFloat(document.getElementById('macro-age')?.value) || 30;
    let weightKg = parseFloat(document.getElementById('macro-weight')?.value) || 75;
    if (!isMetric) {
      const lbs = parseFloat(document.getElementById('macro-weight-lbs')?.value) || 165;
      weightKg = lbs * 0.453592;
    }
    let heightCm = parseFloat(document.getElementById('macro-height')?.value) || 175;
    if (!isMetric) {
      const ft = parseFloat(document.getElementById('macro-height-ft')?.value) || 5;
      const inch = parseFloat(document.getElementById('macro-height-in')?.value) || 9;
      heightCm = (ft * 12 + inch) * 2.54;
    }
    const actMult = parseFloat(document.getElementById('macro-activity')?.value) || 1.55;
    const goal = document.getElementById('macro-goal')?.value || 'maintain';
    const ratio = document.getElementById('macro-ratio')?.value || 'balanced';
    const meals = parseInt(document.getElementById('macro-meals')?.value, 10) || 3;

    // BMR (Mifflin-St Jeor)
    const bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + (isMale ? 5 : -161);
    const tdee = bmr * actMult;

    let calDelta = 0;
    if (goal === 'cut_mild') calDelta = -250;
    else if (goal === 'cut') calDelta = -500;
    else if (goal === 'cut_extreme') calDelta = -1000;
    else if (goal === 'bulk_lean') calDelta = 250;
    else if (goal === 'bulk') calDelta = 500;

    const targetCalories = Math.max(1000, Math.round(tdee + calDelta));

    let cPct = 0.50, pPct = 0.25, fPct = 0.25;
    if (ratio === 'high_protein') { cPct = 0.40; pPct = 0.35; fPct = 0.25; }
    else if (ratio === 'low_carb') { cPct = 0.20; pPct = 0.40; fPct = 0.40; }
    else if (ratio === 'keto') { cPct = 0.05; pPct = 0.25; fPct = 0.70; }
    else if (ratio === 'zone') { cPct = 0.40; pPct = 0.30; fPct = 0.30; }

    const protCal = Math.round(targetCalories * pPct);
    const protG = Math.round(protCal / 4);
    const carbCal = Math.round(targetCalories * cPct);
    const carbG = Math.round(carbCal / 4);
    const fatCal = Math.round(targetCalories * fPct);
    const fatG = Math.round(fatCal / 9);

    const fiberG = Math.round(targetCalories * 0.014);

    const setTxt = (id, txt) => { const el = document.getElementById(id); if (el) el.textContent = txt; };

    setTxt('res-macro-calories', `${targetCalories.toLocaleString()} kcal`);
    setTxt('res-macro-tdee', `TDEE: ${Math.round(tdee).toLocaleString()} kcal`);
    setTxt('res-macro-protein-g', `${protG} g`);
    setTxt('res-macro-protein-cal', `${protCal} kcal (${Math.round(pPct * 100)}%)`);
    setTxt('res-macro-protein-meal', `${Math.round(protG / meals)} g / meal`);

    setTxt('res-macro-carb-g', `${carbG} g`);
    setTxt('res-macro-carb-cal', `${carbCal} kcal (${Math.round(cPct * 100)}%)`);
    setTxt('res-macro-carb-meal', `${Math.round(carbG / meals)} g / meal`);

    setTxt('res-macro-fat-g', `${fatG} g`);
    setTxt('res-macro-fat-cal', `${fatCal} kcal (${Math.round(fPct * 100)}%)`);
    setTxt('res-macro-fat-meal', `${Math.round(fatG / meals)} g / meal`);

    setTxt('res-macro-fiber', `${fiberG} g daily`);

    const barCarb = document.getElementById('res-macro-bar-carb');
    const barProt = document.getElementById('res-macro-bar-prot');
    const barFat = document.getElementById('res-macro-bar-fat');
    if (barCarb) barCarb.style.width = `${cPct * 100}%`;
    if (barProt) barProt.style.width = `${pPct * 100}%`;
    if (barFat) barFat.style.width = `${fPct * 100}%`;
  },

  // ========================================================================
  // 22. CARBOHYDRATE CALCULATOR (ACSM & ISSN Training Volume Guidelines)
  // ========================================================================
  calcCarb() {
    const isMetric = this.carbUnit === 'metric';
    let weightKg = parseFloat(document.getElementById('carb-weight')?.value) || 70;
    if (!isMetric) {
      const lbs = parseFloat(document.getElementById('carb-weight-lbs')?.value) || 154;
      weightKg = lbs * 0.453592;
    }
    const intensity = document.getElementById('carb-intensity')?.value || 'moderate';
    const totalCal = parseFloat(document.getElementById('carb-calories')?.value) || 2400;

    let gPerKg = 6.0;
    if (intensity === 'light') gPerKg = 3.5;
    else if (intensity === 'moderate') gPerKg = 6.0;
    else if (intensity === 'endurance') gPerKg = 8.0;
    else if (intensity === 'extreme') gPerKg = 10.0;
    else if (intensity === 'low_carb') gPerKg = 1.5;

    const carbGrams = Math.round(weightKg * gPerKg);
    const carbKcal = carbGrams * 4;
    const carbPctOfTotal = Math.min(100, Math.round((carbKcal / totalCal) * 100));

    const complexG = Math.round(carbGrams * 0.85);
    const sugarMaxG = Math.round((totalCal * 0.10) / 4); // WHO < 10%
    const fiberMinG = Math.max(28, Math.round(totalCal * 0.014));

    // Timing breakdown
    const preG = Math.round(weightKg * 1.0);
    const intraG = intensity === 'endurance' || intensity === 'extreme' ? '45 – 60 g/hr' : '30 g/hr (if >60m)';
    const postG = Math.round(weightKg * 1.2);

    const setTxt = (id, txt) => { const el = document.getElementById(id); if (el) el.textContent = txt; };

    setTxt('res-carb-daily-g', `${carbGrams} g`);
    setTxt('res-carb-daily-cal', `${carbKcal.toLocaleString()} kcal`);
    setTxt('res-carb-pct-cal', `${carbPctOfTotal}% of total calories`);
    setTxt('res-carb-complex-g', `${complexG} g (whole grains, veggies)`);
    setTxt('res-carb-sugar-max', `< ${sugarMaxG} g max (WHO limit)`);
    setTxt('res-carb-fiber-min', `${fiberMinG} g daily minimum`);
    setTxt('res-carb-pre', `${preG} g (2–3 hrs before training)`);
    setTxt('res-carb-intra', intraG);
    setTxt('res-carb-post', `${postG} g (within 1–2 hrs post-workout)`);
  },

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
  calcFat() {
    const totalCal = parseFloat(document.getElementById('fat-calories')?.value) || 2200;
    const diet = document.getElementById('fat-diet')?.value || 'standard';

    let fatPct = 0.28;
    if (diet === 'low_fat') fatPct = 0.18;
    else if (diet === 'standard') fatPct = 0.28;
    else if (diet === 'moderate') fatPct = 0.32;
    else if (diet === 'keto') fatPct = 0.70;

    const fatCal = Math.round(totalCal * fatPct);
    const fatG = Math.round(fatCal / 9);

    const satFatMax = Math.round((totalCal * 0.08) / 9); // <8-10% of calories
    const mufaG = Math.round((totalCal * 0.15) / 9); // ~15%
    const pufaG = Math.round((totalCal * 0.07) / 9); // ~7%

    const setTxt = (id, txt) => { const el = document.getElementById(id); if (el) el.textContent = txt; };

    setTxt('res-fat-daily-g', `${fatG} g`);
    setTxt('res-fat-daily-cal', `${fatCal.toLocaleString()} kcal`);
    setTxt('res-fat-pct', `${Math.round(fatPct * 100)}% of total daily energy`);
    setTxt('res-fat-saturated-max', `< ${satFatMax} g max (<10% calories)`);
    setTxt('res-fat-mufa-g', `${mufaG} g (olive oil, avocados, nuts)`);
    setTxt('res-fat-pufa-g', `${pufaG} g (flax, chia, walnuts)`);
    setTxt('res-fat-omega3', '500 – 1,000 mg EPA/DHA combined daily');
  },

  // ========================================================================
  // 25. TDEE CALCULATOR (Mifflin-St Jeor, Katch-McArdle, Harris-Benedict)
  // ========================================================================
  calcTDEE() {
    const isMale = this.tdeeGender === 'male';
    const isMetric = this.tdeeUnit === 'metric';
    const age = parseFloat(document.getElementById('tdee-age')?.value) || 28;
    let weightKg = parseFloat(document.getElementById('tdee-weight')?.value) || 75;
    if (!isMetric) {
      const lbs = parseFloat(document.getElementById('tdee-weight-lbs')?.value) || 165;
      weightKg = lbs * 0.453592;
    }
    let heightCm = parseFloat(document.getElementById('tdee-height')?.value) || 178;
    if (!isMetric) {
      const ft = parseFloat(document.getElementById('tdee-height-ft')?.value) || 5;
      const inch = parseFloat(document.getElementById('tdee-height-in')?.value) || 10;
      heightCm = (ft * 12 + inch) * 2.54;
    }
    const actMult = parseFloat(document.getElementById('tdee-activity')?.value) || 1.55;
    const formula = document.getElementById('tdee-formula')?.value || 'mifflin';
    const bf = parseFloat(document.getElementById('tdee-bodyfat')?.value) || 18;

    let bmr = 0;
    if (formula === 'katch') {
      const lbmKg = weightKg * (1 - bf / 100);
      bmr = 370 + (21.6 * lbmKg);
    } else if (formula === 'harris') {
      if (isMale) {
        bmr = 88.362 + (13.397 * weightKg) + (4.799 * heightCm) - (5.677 * age);
      } else {
        bmr = 447.593 + (9.247 * weightKg) + (3.098 * heightCm) - (4.330 * age);
      }
    } else {
      // Mifflin-St Jeor default
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + (isMale ? 5 : -161);
    }

    const tdee = Math.round(bmr * actMult);
    const bmrRounded = Math.round(bmr);

    // Energy shares
    const bmrShare = Math.round((bmrRounded / tdee) * 100);
    const tefShare = 10;
    const neatShare = 15;
    const eatShare = Math.max(5, 100 - bmrShare - tefShare - neatShare);

    const setTxt = (id, txt) => { const el = document.getElementById(id); if (el) el.textContent = txt; };

    setTxt('res-tdee-val', `${tdee.toLocaleString()} kcal / day`);
    setTxt('res-tdee-bmr', `BMR: ${bmrRounded.toLocaleString()} kcal`);
    setTxt('res-tdee-bmr-share', `${bmrShare}% (${bmrRounded} kcal)`);
    setTxt('res-tdee-tef-share', `${tefShare}% (${Math.round(tdee * 0.1)} kcal)`);
    setTxt('res-tdee-neat-share', `${neatShare}% (${Math.round(tdee * 0.15)} kcal)`);
    setTxt('res-tdee-eat-share', `${eatShare}% (${Math.round(tdee * (eatShare / 100))} kcal)`);

    setTxt('res-tdee-maintain', `${tdee.toLocaleString()} kcal`);
    setTxt('res-tdee-cut-mild', `${(tdee - 250).toLocaleString()} kcal`);
    setTxt('res-tdee-cut', `${(tdee - 500).toLocaleString()} kcal`);
    setTxt('res-tdee-cut-extreme', `${Math.max(1200, tdee - 1000).toLocaleString()} kcal`);
    setTxt('res-tdee-bulk-clean', `${(tdee + 250).toLocaleString()} kcal`);
    setTxt('res-tdee-bulk', `${(tdee + 500).toLocaleString()} kcal`);
  },

  // ========================================================================
  // 26. GFR CALCULATOR (2021 CKD-EPI Refit & MDRD Renal Function)
  // ========================================================================
  calcGFR() {
    const isFemale = this.gfrGender === 'female';
    const isUmol = this.gfrUnit === 'umol_l';
    let scr = parseFloat(document.getElementById('gfr-creatinine')?.value) || 1.0;
    if (isUmol) {
      scr = scr / 88.4; // convert µmol/L to mg/dL
    }
    const age = parseFloat(document.getElementById('gfr-age')?.value) || 45;
    const formula = document.getElementById('gfr-formula')?.value || 'ckd_epi';

    let egfr = 0;
    if (formula === 'mdrd') {
      const femaleMult = isFemale ? 0.742 : 1.0;
      egfr = 175 * Math.pow(scr, -1.154) * Math.pow(age, -0.203) * femaleMult;
    } else {
      // 2021 CKD-EPI Creatinine Refit Equation (Race-Free)
      const kappa = isFemale ? 0.7 : 0.9;
      const alpha = isFemale ? -0.241 : -0.302;
      const minPart = Math.pow(Math.min(scr / kappa, 1), alpha);
      const maxPart = Math.pow(Math.max(scr / kappa, 1), -1.200);
      const agePart = Math.pow(0.9938, age);
      const femaleMult = isFemale ? 1.012 : 1.0;
      egfr = 142 * minPart * maxPart * agePart * femaleMult;
    }

    const roundedEgfr = Math.round(egfr * 10) / 10;

    let stage = 'G1';
    let stageTitle = 'Normal or High Kidney Function';
    let color = '#10b981';
    let desc = 'Kidney function is within optimal healthy range. Continue healthy hydration and routine blood pressure monitoring.';

    if (roundedEgfr >= 90) {
      stage = 'Stage 1 (G1)';
      stageTitle = 'Normal or High Function';
      color = '#10b981';
      desc = 'Estimated filtration rate is normal (≥90 mL/min/1.73m²). Healthy renal baseline.';
    } else if (roundedEgfr >= 60) {
      stage = 'Stage 2 (G2)';
      stageTitle = 'Mildly Decreased';
      color = '#34d399';
      desc = 'Mild reduction in filtration (60–89 mL/min/1.73m²). Common with age; check proteinuria and cardiovascular risk factors.';
    } else if (roundedEgfr >= 45) {
      stage = 'Stage 3a (G3a)';
      stageTitle = 'Mild to Moderately Decreased';
      color = '#f59e0b';
      desc = 'Moderate filtration decrease (45–59 mL/min/1.73m²). Medical nephrology evaluation and medication adjustment advised.';
    } else if (roundedEgfr >= 30) {
      stage = 'Stage 3b (G3b)';
      stageTitle = 'Moderately to Severely Decreased';
      color = '#f97316';
      desc = 'Significant loss of renal function (30–44 mL/min/1.73m²). Close monitoring of electrolytes, phosphorus, and blood pressure required.';
    } else if (roundedEgfr >= 15) {
      stage = 'Stage 4 (G4)';
      stageTitle = 'Severely Decreased';
      color = '#ef4444';
      desc = 'Severe loss of kidney filtration (15–29 mL/min/1.73m²). Nephrologist care and preparation for renal replacement therapy.';
    } else {
      stage = 'Stage 5 (G5)';
      stageTitle = 'Kidney Failure (ESRD)';
      color = '#b91c1c';
      desc = 'End-stage renal disease (<15 mL/min/1.73m²). Dialysis or kidney transplantation required.';
    }

    const setTxt = (id, txt) => { const el = document.getElementById(id); if (el) el.textContent = txt; };

    setTxt('res-gfr-val', `${roundedEgfr} mL/min/1.73m²`);
    setTxt('res-gfr-stage', stage);
    setTxt('res-gfr-title', stageTitle);
    setTxt('res-gfr-desc', desc);

    const badge = document.getElementById('res-gfr-badge');
    if (badge) {
      badge.textContent = stageTitle;
      badge.style.backgroundColor = color;
      badge.style.color = '#ffffff';
    }
  },

  // ========================================================================
  // 27. BODY TYPE CALCULATOR (Heath-Carter Somatotype & Frame Index)
  // ========================================================================
  calcBodyType() {
    const isMale = this.btGender === 'male';
    const isMetric = this.btUnit === 'metric';
    let heightIn = 70;
    if (isMetric) {
      const cm = parseFloat(document.getElementById('bt-height')?.value) || 178;
      heightIn = cm / 2.54;
    } else {
      heightIn = parseFloat(document.getElementById('bt-height-in')?.value) || 70;
    }

    let wristIn = 7.0;
    if (isMetric) {
      const cm = parseFloat(document.getElementById('bt-wrist')?.value) || 17.5;
      wristIn = cm / 2.54;
    } else {
      wristIn = parseFloat(document.getElementById('bt-wrist-in')?.value) || 7.0;
    }

    const build = document.getElementById('bt-build')?.value || 'athletic';
    const gain = document.getElementById('bt-gain')?.value || 'easy_muscle';

    // Frame size ratio r = Height / Wrist
    const r = heightIn / wristIn;
    let frame = 'Medium Frame';
    if (isMale) {
      if (r > 10.4) frame = 'Small Frame (Ectomorphic Skeleton)';
      else if (r < 9.6) frame = 'Large Frame (Endomorphic Skeleton)';
      else frame = 'Medium Frame (Mesomorphic Skeleton)';
    } else {
      if (r > 10.9) frame = 'Small Frame (Ectomorphic Skeleton)';
      else if (r < 9.9) frame = 'Large Frame (Endomorphic Skeleton)';
      else frame = 'Medium Frame (Mesomorphic Skeleton)';
    }

    let somatotype = 'Mesomorph';
    let desc = '';
    let nutrition = '';
    let training = '';

    if (build === 'narrow' || (gain === 'hard_gain' && build !== 'stocky')) {
      somatotype = 'Ectomorph';
      desc = 'Lean, linear build with longer limbs and high metabolic rate. Fast thyroid and sympathetic dominance.';
      nutrition = 'High Carbohydrates (50–55%), Moderate Protein (25–30%), Moderate Fat (20%). Caloric surplus recommended for weight gains.';
      training = 'Heavy compound resistance training (3–4 days/wk), long rest periods (2–3 mins), limit excessive endurance cardio to conserve mass.';
    } else if (build === 'stocky' || gain === 'easy_fat') {
      somatotype = 'Endomorph';
      desc = 'Solid, broad frame with natural tendency to store energy and build strong lower-body power. Slower carbohydrate tolerance.';
      nutrition = 'Moderate-to-Low Carbs (25–30%), High Protein (35%), Healthy Fats (35–40%). Strict adherence to whole unrefined foods.';
      training = 'High-density strength circuits, HIIT conditioning (2–3x/wk), daily step goal (10k+ steps), shorter rest periods (45–60s).';
    } else {
      somatotype = 'Mesomorph';
      desc = 'Naturally muscular V-taper build with optimal testosterone-to-cortisol balance. Rapid recovery and athletic efficiency.';
      nutrition = 'Balanced Macronutrients (40% Carb, 30% Protein, 30% Fat). Clean fuels around workouts for lean mass maintenance.';
      training = 'Periodized strength and hypertrophy training (4–5 days/wk) combined with moderate cardiovascular intervals.';
    }

    const setTxt = (id, txt) => { const el = document.getElementById(id); if (el) el.textContent = txt; };

    setTxt('res-bt-type', somatotype);
    setTxt('res-bt-frame', frame);
    setTxt('res-bt-ratio', `Height-to-Wrist Ratio: ${r.toFixed(2)}`);
    setTxt('res-bt-desc', desc);
    setTxt('res-bt-nutrition', nutrition);
    setTxt('res-bt-training', training);
  },

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
  calcBAC() {
    const isMale = this.bacGender === 'male';
    const isMetric = this.bacUnit === 'metric';
    let weightKg = parseFloat(document.getElementById('bac-weight')?.value) || 80;
    if (!isMetric) {
      const lbs = parseFloat(document.getElementById('bac-weight-lbs')?.value) || 176;
      weightKg = lbs * 0.453592;
    }
    const beers = parseInt(document.getElementById('bac-beers')?.value, 10) || 0;
    const wines = parseInt(document.getElementById('bac-wines')?.value, 10) || 0;
    const shots = parseInt(document.getElementById('bac-shots')?.value, 10) || 0;
    const customOz = parseFloat(document.getElementById('bac-custom-oz')?.value) || 0;
    const customAbv = parseFloat(document.getElementById('bac-custom-abv')?.value) || 0;
    const hours = parseFloat(document.getElementById('bac-hours')?.value) || 2;
    const stomach = document.getElementById('bac-stomach')?.value || 'empty';

    // Total pure alcohol in grams (14g per standard US drink)
    let alcoholG = (beers * 14) + (wines * 14) + (shots * 14);
    if (customOz > 0 && customAbv > 0) {
      const ml = customOz * 29.5735;
      alcoholG += ml * (customAbv / 100) * 0.789;
    }

    const weightG = weightKg * 1000;
    let r = isMale ? 0.68 : 0.55;
    if (stomach === 'full') r += 0.07; // food dampens peak absorption

    const beta = 0.015; // elimination % per hour

    let rawBac = 0;
    if (alcoholG > 0) {
      rawBac = ((alcoholG / (r * weightG)) * 100) - (beta * hours);
    }
    const currentBac = Math.max(0, Math.round(rawBac * 1000) / 1000);

    const soberHours = currentBac > 0 ? (currentBac / beta) : 0;
    const soberHrInt = Math.floor(soberHours);
    const soberMin = Math.round((soberHours - soberHrInt) * 60);

    const legalLimit = 0.08;
    const legalHours = currentBac > legalLimit ? ((currentBac - legalLimit) / beta) : 0;
    const legalHrInt = Math.floor(legalHours);
    const legalMin = Math.round((legalHours - legalHrInt) * 60);

    let stage = 'Sober / Normal';
    let color = '#10b981';
    let symptoms = 'Normal state, no motor impairment detected.';

    if (currentBac === 0) {
      stage = 'Zero Impairment';
      color = '#10b981';
      symptoms = 'Blood alcohol is 0.000%. Safe to drive and operate machinery.';
    } else if (currentBac < 0.03) {
      stage = 'Subclinical (0.01 – 0.02%)';
      color = '#34d399';
      symptoms = 'Mild euphoria, slight body warmth. Subtle judgment changes.';
    } else if (currentBac < 0.06) {
      stage = 'Mild Euphoria (0.03 – 0.05%)';
      color = '#f59e0b';
      symptoms = 'Relaxation, lowered inhibitions, reduced vigilance. Minor reaction time slowing.';
    } else if (currentBac < 0.08) {
      stage = 'Impaired Coordination (0.06 – 0.07%)';
      color = '#f97316';
      symptoms = 'Impaired depth perception, divided attention deficits. Approaching legal limit.';
    } else if (currentBac < 0.15) {
      stage = 'Legally Intoxicated (0.08 – 0.14%)';
      color = '#ef4444';
      symptoms = 'Illegal to drive. Balance loss, slurred speech, impaired gross motor skills, delayed reflexes.';
    } else if (currentBac < 0.25) {
      stage = 'Severe Intoxication (0.15 – 0.24%)';
      color = '#dc2626';
      symptoms = 'Severe motor impairment, loss of physical control, nausea, high risk of blackout.';
    } else {
      stage = 'Life-Threatening Poisoning (≥0.25%)';
      color = '#7f1d1d';
      symptoms = 'Risk of respiratory failure, coma, or fatal alcohol poisoning. Immediate emergency care.';
    }

    const setTxt = (id, txt) => { const el = document.getElementById(id); if (el) el.textContent = txt; };

    setTxt('res-bac-val', `${currentBac.toFixed(3)}%`);
    setTxt('res-bac-status', stage);
    setTxt('res-bac-symptoms', symptoms);

    setTxt('res-bac-sober-time', currentBac > 0 ? `${soberHrInt} hrs ${soberMin} mins` : 'Sober Now (0.000%)');
    setTxt('res-bac-legal-time', currentBac > 0.08 ? `${legalHrInt} hrs ${legalMin} mins` : 'Below Legal Limit (<0.08%)');

    const badge = document.getElementById('res-bac-badge');
    if (badge) {
      badge.textContent = stage;
      badge.style.backgroundColor = color;
      badge.style.color = '#ffffff';
    }
  },

    // Setup all event listeners
  init() {
    // 1. BMI Unit Toggle & Inputs
    document.querySelectorAll('.bmi-unit-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.bmi-unit-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.bmiUnit = btn.dataset.unit;
        
        const metricInputs = document.getElementById('bmi-metric-inputs');
        const imperialInputs = document.getElementById('bmi-imperial-inputs');
        if (metricInputs && imperialInputs) {
          metricInputs.style.display = this.bmiUnit === 'metric' ? 'flex' : 'none';
          imperialInputs.style.display = this.bmiUnit === 'imperial' ? 'flex' : 'none';
        }
        this.calcBMI();
      });
    });

    ['bmi-weight', 'bmi-height', 'bmi-weight-lbs', 'bmi-height-ft', 'bmi-height-in'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcBMI());
    });

    // 2. Calorie Calculator Unit & Inputs
    document.querySelectorAll('.cal-gender-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.cal-gender-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.calGender = btn.dataset.gender;
        this.calcCalorie();
      });
    });

    document.querySelectorAll('.cal-unit-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.cal-unit-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.calUnit = btn.dataset.unit;
        const metric = document.getElementById('cal-metric-inputs');
        const imperial = document.getElementById('cal-imperial-inputs');
        if (metric && imperial) {
          metric.style.display = this.calUnit === 'metric' ? 'flex' : 'none';
          imperial.style.display = this.calUnit === 'imperial' ? 'flex' : 'none';
        }
        this.calcCalorie();
      });
    });

    ['cal-age', 'cal-weight', 'cal-height', 'cal-weight-lbs', 'cal-height-ft', 'cal-height-in', 'cal-activity', 'cal-goal', 'cal-diet'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcCalorie());
      document.getElementById(id)?.addEventListener('change', () => this.calcCalorie());
    });

    // 3. Body Fat Gender & Inputs
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

    // 4. BMR Gender & Inputs
    document.querySelectorAll('.bmr-gender-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.bmr-gender-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.bmrGender = btn.dataset.gender;
        this.calcBMR();
      });
    });

    ['bmr-age', 'bmr-weight', 'bmr-height', 'bmr-activity', 'bmr-bodyfat'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcBMR());
      document.getElementById(id)?.addEventListener('change', () => this.calcBMR());
    });

    // 5. IBW Inputs
    ['ibw-height', 'ibw-gender'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcIBW());
      document.getElementById(id)?.addEventListener('change', () => this.calcIBW());
    });

    // 6. Pace Calculator Controls
    document.querySelectorAll('.pace-mode-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.pace-mode-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.paceMode = btn.dataset.mode;
        
        const timeWrap = document.getElementById('pace-time-group');
        const distWrap = document.getElementById('pace-dist-group');
        const paceWrap = document.getElementById('pace-pace-group');

        if (timeWrap) timeWrap.style.display = this.paceMode === 'time' ? 'none' : 'block';
        if (distWrap) distWrap.style.display = this.paceMode === 'distance' ? 'none' : 'block';
        if (paceWrap) paceWrap.style.display = this.paceMode === 'pace' ? 'none' : 'block';

        this.calcPace();
      });
    });

    document.querySelectorAll('.pace-preset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const d = parseFloat(btn.dataset.dist) || 5;
        const u = btn.dataset.unit || 'km';
        const distInput = document.getElementById('pace-dist');
        const unitSelect = document.getElementById('pace-dist-unit');
        if (distInput) distInput.value = d;
        if (unitSelect) unitSelect.value = u;
        this.paceDistUnit = u;
        this.calcPace();
      });
    });

    ['pace-dist', 'pace-dist-unit', 'pace-time-h', 'pace-time-m', 'pace-time-s', 'pace-p-min', 'pace-p-sec', 'pace-pace-unit'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => {
        if (id === 'pace-dist-unit') this.paceDistUnit = document.getElementById(id)?.value;
        if (id === 'pace-pace-unit') this.pacePaceUnit = document.getElementById(id)?.value;
        this.calcPace();
      });
      document.getElementById(id)?.addEventListener('change', () => {
        if (id === 'pace-dist-unit') this.paceDistUnit = document.getElementById(id)?.value;
        if (id === 'pace-pace-unit') this.pacePaceUnit = document.getElementById(id)?.value;
        this.calcPace();
      });
    });

    // 7. Army Body Fat Controls
    document.querySelectorAll('.army-gender-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.army-gender-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.armyGender = btn.dataset.gender;

        const maleFields = document.getElementById('army-male-fields');
        const femaleFields = document.getElementById('army-female-fields');
        if (maleFields && femaleFields) {
          maleFields.style.display = this.armyGender === 'male' ? 'block' : 'none';
          femaleFields.style.display = this.armyGender === 'female' ? 'block' : 'none';
        }
        this.calcArmyBodyFat();
      });
    });

    document.querySelectorAll('.army-unit-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.army-unit-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.armyUnit = btn.dataset.unit;

        const imp = document.getElementById('army-imperial-inputs');
        const met = document.getElementById('army-metric-inputs');
        if (imp && met) {
          imp.style.display = this.armyUnit === 'imperial' ? 'block' : 'none';
          met.style.display = this.armyUnit === 'metric' ? 'block' : 'none';
        }
        this.calcArmyBodyFat();
      });
    });

    ['army-age-group', 'army-height-in', 'army-neck-in', 'army-abdomen-in', 'army-waist-in', 'army-hip-in', 'army-weight-lbs',
     'army-height-cm', 'army-neck-cm', 'army-abdomen-cm', 'army-waist-cm', 'army-hip-cm', 'army-weight-kg'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcArmyBodyFat());
      document.getElementById(id)?.addEventListener('change', () => this.calcArmyBodyFat());
    });

    // 8. Lean Body Mass Controls
    document.querySelectorAll('.lbm-gender-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.lbm-gender-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.lbmGender = btn.dataset.gender;
        this.calcLBM();
      });
    });

    document.querySelectorAll('.lbm-unit-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.lbm-unit-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.lbmUnit = btn.dataset.unit;
        const met = document.getElementById('lbm-metric-inputs');
        const imp = document.getElementById('lbm-imperial-inputs');
        if (met && imp) {
          met.style.display = this.lbmUnit === 'metric' ? 'flex' : 'none';
          imp.style.display = this.lbmUnit === 'imperial' ? 'flex' : 'none';
        }
        this.calcLBM();
      });
    });

    ['lbm-weight', 'lbm-height', 'lbm-weight-lbs', 'lbm-height-ft', 'lbm-height-in'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcLBM());
    });

    // 9. Healthy Weight Controls
    document.querySelectorAll('.hw-gender-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.hw-gender-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.hwGender = btn.dataset.gender;
        this.calcHealthyWeight();
      });
    });

    document.querySelectorAll('.hw-unit-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.hw-unit-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.hwUnit = btn.dataset.unit;
        const met = document.getElementById('hw-metric-inputs');
        const imp = document.getElementById('hw-imperial-inputs');
        if (met && imp) {
          met.style.display = this.hwUnit === 'metric' ? 'flex' : 'none';
          imp.style.display = this.hwUnit === 'imperial' ? 'flex' : 'none';
        }
        this.calcHealthyWeight();
      });
    });

    ['hw-height', 'hw-weight', 'hw-height-ft', 'hw-height-in', 'hw-weight-lbs', 'hw-frame'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcHealthyWeight());
      document.getElementById(id)?.addEventListener('change', () => this.calcHealthyWeight());
    });

    // 10. Calories Burned Controls
    document.querySelectorAll('.cb-unit-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.cb-unit-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.cbUnit = btn.dataset.unit;
        const kgInp = document.getElementById('cb-weight-kg-wrap');
        const lbsInp = document.getElementById('cb-weight-lbs-wrap');
        if (kgInp && lbsInp) {
          kgInp.style.display = this.cbUnit === 'metric' ? 'block' : 'none';
          lbsInp.style.display = this.cbUnit === 'imperial' ? 'block' : 'none';
        }
        this.calcCaloriesBurned();
      });
    });

    ['cb-activity', 'cb-duration', 'cb-weight', 'cb-weight-lbs'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcCaloriesBurned());
      document.getElementById(id)?.addEventListener('change', () => this.calcCaloriesBurned());
    });

    // 11. One Rep Max Controls
    document.querySelectorAll('.orm-unit-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.orm-unit-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.ormUnit = btn.dataset.unit;
        const unitLabel = document.getElementById('orm-unit-label');
        if (unitLabel) unitLabel.textContent = this.ormUnit;
        this.calcOneRepMax();
      });
    });

    document.querySelectorAll('.orm-reps-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const reps = parseInt(btn.dataset.reps) || 5;
        const input = document.getElementById('orm-reps');
        if (input) input.value = reps;
        document.querySelectorAll('.orm-reps-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.calcOneRepMax();
      });
    });

    ['orm-weight', 'orm-reps'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcOneRepMax());
    });

    // 12. Target Heart Rate Controls
    ['thr-age', 'thr-rhr', 'thr-formula'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcTargetHeartRate());
      document.getElementById(id)?.addEventListener('change', () => this.calcTargetHeartRate());
    });

    // 13. Water Inputs
    ['water-weight', 'water-exercise', 'water-climate'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcWater());
      document.getElementById(id)?.addEventListener('change', () => this.calcWater());
    });

    // 14. Pregnancy Calculator Controls & Defaults
    const now = new Date();
    const setDefDate = (id, daysOffset) => {
      const el = document.getElementById(id);
      if (el && !el.value) {
        el.value = this.toInputDate(this.addDays(now, daysOffset));
      }
    };

    setDefDate('preg-lmp-date', -70);
    setDefDate('preg-due-date', 210);
    setDefDate('preg-conception-date', -56);
    setDefDate('preg-us-date', -14);

    document.querySelectorAll('.preg-method-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.preg-method-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.pregMethod = btn.dataset.method;

        ['lmp', 'duedate', 'conception', 'ultrasound'].forEach(m => {
          const wrap = document.getElementById(`preg-wrap-${m}`);
          if (wrap) wrap.style.display = m === this.pregMethod ? 'block' : 'none';
        });
        this.calcPregnancy();
      });
    });

    ['preg-lmp-date', 'preg-cycle-len', 'preg-due-date', 'preg-conception-date', 'preg-us-date', 'preg-us-weeks', 'preg-us-days'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcPregnancy());
      document.getElementById(id)?.addEventListener('change', () => this.calcPregnancy());
    });

    // 15. Pregnancy Weight Gain Controls
    document.querySelectorAll('.pw-unit-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.pw-unit-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.pwUnit = btn.dataset.unit;
        const met = document.getElementById('pw-metric-inputs');
        const imp = document.getElementById('pw-imperial-inputs');
        if (met && imp) {
          met.style.display = this.pwUnit === 'metric' ? 'flex' : 'none';
          imp.style.display = this.pwUnit === 'imperial' ? 'flex' : 'none';
        }
        this.calcPregnancyWeight();
      });
    });

    document.querySelectorAll('.pw-type-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.pw-type-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.pwType = btn.dataset.type;
        this.calcPregnancyWeight();
      });
    });

    ['pw-pre-weight', 'pw-pre-height', 'pw-cur-weight', 'pw-pre-weight-lbs', 'pw-pre-height-ft', 'pw-pre-height-in', 'pw-cur-weight-lbs', 'pw-week'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcPregnancyWeight());
      document.getElementById(id)?.addEventListener('change', () => this.calcPregnancyWeight());
    });

    // 16. Pregnancy Conception Retrospective Controls & Defaults
    setDefDate('pconc-edd-date', 182);
    setDefDate('pconc-lmp-date', -98);
    setDefDate('pconc-us-date', -28);

    document.querySelectorAll('.pconc-method-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.pconc-method-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.pconcMethod = btn.dataset.method;

        ['edd', 'lmp', 'ultrasound'].forEach(m => {
          const wrap = document.getElementById(`pconc-wrap-${m}`);
          if (wrap) wrap.style.display = m === this.pconcMethod ? 'block' : 'none';
        });
        this.calcPregnancyConception();
      });
    });

    ['pconc-edd-date', 'pconc-lmp-date', 'pconc-cycle-len', 'pconc-us-date', 'pconc-us-weeks', 'pconc-us-days'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcPregnancyConception());
      document.getElementById(id)?.addEventListener('change', () => this.calcPregnancyConception());
    });

    // 17. Due Date Calculator Controls & Defaults
    setDefDate('dd-lmp-date', -56);
    setDefDate('dd-conception-date', -42);
    setDefDate('dd-us-date', -21);
    setDefDate('dd-ivf-date', -35);

    document.querySelectorAll('.dd-method-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.dd-method-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.ddMethod = btn.dataset.method;

        ['lmp', 'conception', 'ultrasound', 'ivf'].forEach(m => {
          const wrap = document.getElementById(`dd-wrap-${m}`);
          if (wrap) wrap.style.display = m === this.ddMethod ? 'block' : 'none';
        });
        this.calcDueDate();
      });
    });

    document.querySelectorAll('.dd-ivf-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.dd-ivf-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.ddIvfType = btn.dataset.ivf;
        this.calcDueDate();
      });
    });

    ['dd-lmp-date', 'dd-cycle-len', 'dd-conception-date', 'dd-us-date', 'dd-us-weeks', 'dd-us-days', 'dd-ivf-date'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcDueDate());
      document.getElementById(id)?.addEventListener('change', () => this.calcDueDate());
    });

    // 18. Ovulation Calculator Controls & Defaults
    setDefDate('ov-lmp-date', -10);

    ['ov-lmp-date', 'ov-cycle-len', 'ov-luteal-len'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcOvulation());
      document.getElementById(id)?.addEventListener('change', () => this.calcOvulation());
    });

    // 19. Conception Planner Controls & Defaults
    setDefDate('conc-lmp-date', -8);
    setDefDate('conc-target-date', 270);

    document.querySelectorAll('.conc-mode-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.conc-mode-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.concMode = btn.dataset.mode;

        const wrapFertile = document.getElementById('conc-wrap-fertile');
        const wrapTarget = document.getElementById('conc-wrap-target');
        const resFertile = document.getElementById('conc-res-fertile');
        const resTarget = document.getElementById('conc-res-target');

        if (wrapFertile) wrapFertile.style.display = this.concMode === 'fertile' ? 'block' : 'none';
        if (wrapTarget) wrapTarget.style.display = this.concMode === 'target' ? 'block' : 'none';
        if (resFertile) resFertile.style.display = this.concMode === 'fertile' ? 'block' : 'none';
        if (resTarget) resTarget.style.display = this.concMode === 'target' ? 'block' : 'none';

        this.calcConception();
      });
    });

    ['conc-lmp-date', 'conc-cycle-len', 'conc-target-date', 'conc-target-cycle-len'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcConception());
      document.getElementById(id)?.addEventListener('change', () => this.calcConception());
    });

    // 20. Period Calculator Controls & Defaults
    setDefDate('period-lmp-date', -14);

    ['period-lmp-date', 'period-cycle-len', 'period-bleed-len'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcPeriod());
      document.getElementById(id)?.addEventListener('change', () => this.calcPeriod());
    });


    // Helper to sync range slider with number input
    const syncSlider = (rangeId, numId, badgeId, suffix, onCalc) => {
      const rangeEl = document.getElementById(rangeId);
      const numEl = document.getElementById(numId);
      const badgeEl = document.getElementById(badgeId);
      if (rangeEl && numEl) {
        rangeEl.addEventListener('input', () => {
          numEl.value = rangeEl.value;
          if (badgeEl) badgeEl.textContent = `${rangeEl.value} ${suffix}`;
          onCalc();
        });
        numEl.addEventListener('input', () => {
          rangeEl.value = numEl.value;
          if (badgeEl) badgeEl.textContent = `${numEl.value} ${suffix}`;
          onCalc();
        });
        numEl.addEventListener('change', () => {
          rangeEl.value = numEl.value;
          if (badgeEl) badgeEl.textContent = `${numEl.value} ${suffix}`;
          onCalc();
        });
      }
    };

    // 21. Macro Calculator Event Listeners
    document.querySelectorAll('.macro-unit-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.macro-unit-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.macroUnit = btn.dataset.unit;
        const met = document.getElementById('macro-inputs-metric');
        const imp = document.getElementById('macro-inputs-imperial');
        if (met && imp) {
          met.style.display = this.macroUnit === 'metric' ? 'block' : 'none';
          imp.style.display = this.macroUnit === 'imperial' ? 'block' : 'none';
        }
        this.calcMacro();
      });
    });

    document.querySelectorAll('.macro-gender-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.macro-gender-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.macroGender = btn.dataset.gender;
        this.calcMacro();
      });
    });

    syncSlider('macro-age-range', 'macro-age', 'macro-age-val', 'yrs', () => this.calcMacro());
    syncSlider('macro-weight-range', 'macro-weight', 'macro-weight-val', 'kg', () => this.calcMacro());
    syncSlider('macro-height-range', 'macro-height', 'macro-height-val', 'cm', () => this.calcMacro());
    syncSlider('macro-weight-lbs-range', 'macro-weight-lbs', 'macro-weight-lbs-val', 'lbs', () => this.calcMacro());

    ['macro-height-ft', 'macro-height-in', 'macro-activity', 'macro-goal', 'macro-ratio', 'macro-meals'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcMacro());
      document.getElementById(id)?.addEventListener('change', () => this.calcMacro());
    });

    // 22. Carbohydrate Calculator Event Listeners
    document.querySelectorAll('.carb-unit-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.carb-unit-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.carbUnit = btn.dataset.unit;
        const met = document.getElementById('carb-inputs-metric');
        const imp = document.getElementById('carb-inputs-imperial');
        if (met && imp) {
          met.style.display = this.carbUnit === 'metric' ? 'block' : 'none';
          imp.style.display = this.carbUnit === 'imperial' ? 'block' : 'none';
        }
        this.calcCarb();
      });
    });

    syncSlider('carb-weight-range', 'carb-weight', 'carb-weight-val', 'kg', () => this.calcCarb());
    syncSlider('carb-weight-lbs-range', 'carb-weight-lbs', 'carb-weight-lbs-val', 'lbs', () => this.calcCarb());
    syncSlider('carb-calories-range', 'carb-calories', 'carb-calories-val', 'kcal', () => this.calcCarb());

    ['carb-intensity'].forEach(id => {
      document.getElementById(id)?.addEventListener('change', () => this.calcCarb());
    });

    // 23. Protein Calculator Event Listeners
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

    ['prot-goal', 'prot-meals'].forEach(id => {
      document.getElementById(id)?.addEventListener('change', () => this.calcProtein());
    });

    // 24. Fat Intake Calculator Event Listeners
    syncSlider('fat-calories-range', 'fat-calories', 'fat-calories-val', 'kcal', () => this.calcFat());
    ['fat-diet'].forEach(id => {
      document.getElementById(id)?.addEventListener('change', () => this.calcFat());
    });

    // 25. TDEE Calculator Event Listeners
    document.querySelectorAll('.tdee-unit-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.tdee-unit-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.tdeeUnit = btn.dataset.unit;
        const met = document.getElementById('tdee-inputs-metric');
        const imp = document.getElementById('tdee-inputs-imperial');
        if (met && imp) {
          met.style.display = this.tdeeUnit === 'metric' ? 'block' : 'none';
          imp.style.display = this.tdeeUnit === 'imperial' ? 'block' : 'none';
        }
        this.calcTDEE();
      });
    });

    document.querySelectorAll('.tdee-gender-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.tdee-gender-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.tdeeGender = btn.dataset.gender;
        this.calcTDEE();
      });
    });

    syncSlider('tdee-age-range', 'tdee-age', 'tdee-age-val', 'yrs', () => this.calcTDEE());
    syncSlider('tdee-weight-range', 'tdee-weight', 'tdee-weight-val', 'kg', () => this.calcTDEE());
    syncSlider('tdee-height-range', 'tdee-height', 'tdee-height-val', 'cm', () => this.calcTDEE());
    syncSlider('tdee-weight-lbs-range', 'tdee-weight-lbs', 'tdee-weight-lbs-val', 'lbs', () => this.calcTDEE());

    document.getElementById('tdee-formula')?.addEventListener('change', (e) => {
      const bfGroup = document.getElementById('tdee-bodyfat-group');
      if (bfGroup) {
        bfGroup.style.display = e.target.value === 'katch' ? 'block' : 'none';
      }
      this.calcTDEE();
    });

    ['tdee-height-ft', 'tdee-height-in', 'tdee-activity', 'tdee-bodyfat'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcTDEE());
      document.getElementById(id)?.addEventListener('change', () => this.calcTDEE());
    });

    // 26. GFR Calculator Event Listeners
    document.querySelectorAll('.gfr-unit-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.gfr-unit-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.gfrUnit = btn.dataset.unit;
        const lbl = document.getElementById('gfr-unit-label');
        const badge = document.getElementById('gfr-creatinine-val');
        const crInput = document.getElementById('gfr-creatinine');
        const crRange = document.getElementById('gfr-creatinine-range');
        if (this.gfrUnit === 'umol_l') {
          if (lbl) lbl.textContent = 'µmol/L';
          if (crRange) { crRange.min = 25; crRange.max = 700; crRange.step = 5; crRange.value = 88; }
          if (crInput) { crInput.min = 20; crInput.max = 1200; crInput.step = 1; crInput.value = 88; }
          if (badge) badge.textContent = '88 µmol/L';
        } else {
          if (lbl) lbl.textContent = 'mg/dL';
          if (crRange) { crRange.min = 0.3; crRange.max = 8.0; crRange.step = 0.05; crRange.value = 1.0; }
          if (crInput) { crInput.min = 0.2; crInput.max = 15.0; crInput.step = 0.05; crInput.value = 1.0; }
          if (badge) badge.textContent = '1.0 mg/dL';
        }
        this.calcGFR();
      });
    });

    document.querySelectorAll('.gfr-gender-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.gfr-gender-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.gfrGender = btn.dataset.gender;
        this.calcGFR();
      });
    });

    syncSlider('gfr-creatinine-range', 'gfr-creatinine', 'gfr-creatinine-val', this.gfrUnit === 'umol_l' ? 'µmol/L' : 'mg/dL', () => this.calcGFR());
    syncSlider('gfr-age-range', 'gfr-age', 'gfr-age-val', 'yrs', () => this.calcGFR());
    ['gfr-formula'].forEach(id => {
      document.getElementById(id)?.addEventListener('change', () => this.calcGFR());
    });

    // 27. Body Type Calculator Event Listeners
    document.querySelectorAll('.bt-unit-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.bt-unit-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.btUnit = btn.dataset.unit;
        const met = document.getElementById('bt-inputs-metric');
        const imp = document.getElementById('bt-inputs-imperial');
        if (met && imp) {
          met.style.display = this.btUnit === 'metric' ? 'block' : 'none';
          imp.style.display = this.btUnit === 'imperial' ? 'block' : 'none';
        }
        this.calcBodyType();
      });
    });

    document.querySelectorAll('.bt-gender-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.bt-gender-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.btGender = btn.dataset.gender;
        this.calcBodyType();
      });
    });

    syncSlider('bt-height-range', 'bt-height', 'bt-height-val', 'cm', () => this.calcBodyType());
    syncSlider('bt-wrist-range', 'bt-wrist', 'bt-wrist-val', 'cm', () => this.calcBodyType());
    syncSlider('bt-height-in-range', 'bt-height-in', 'bt-height-in-val', 'in', () => this.calcBodyType());
    syncSlider('bt-wrist-in-range', 'bt-wrist-in', 'bt-wrist-in-val', 'in', () => this.calcBodyType());

    ['bt-build', 'bt-gain'].forEach(id => {
      document.getElementById(id)?.addEventListener('change', () => this.calcBodyType());
    });

    // 28. Body Surface Area (BSA) Event Listeners
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

    // 29. BAC Calculator Event Listeners
    document.querySelectorAll('.bac-unit-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.bac-unit-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.bacUnit = btn.dataset.unit;
        const met = document.getElementById('bac-inputs-metric');
        const imp = document.getElementById('bac-inputs-imperial');
        if (met && imp) {
          met.style.display = this.bacUnit === 'metric' ? 'block' : 'none';
          imp.style.display = this.bacUnit === 'imperial' ? 'block' : 'none';
        }
        this.calcBAC();
      });
    });

    document.querySelectorAll('.bac-gender-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.bac-gender-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.bacGender = btn.dataset.gender;
        this.calcBAC();
      });
    });

    syncSlider('bac-weight-range', 'bac-weight', 'bac-weight-val', 'kg', () => this.calcBAC());
    syncSlider('bac-weight-lbs-range', 'bac-weight-lbs', 'bac-weight-lbs-val', 'lbs', () => this.calcBAC());
    syncSlider('bac-hours-range', 'bac-hours', 'bac-hours-val', 'hrs', () => this.calcBAC());

    ['bac-beers', 'bac-wines', 'bac-shots', 'bac-stomach'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcBAC());
      document.getElementById(id)?.addEventListener('change', () => this.calcBAC());
    });

    // Switcher pills inside detail view
    document.querySelectorAll('#fit-detail-view .switcher-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        const target = pill.dataset.target;
        if (target) this.openCalculator(target);
      });
    });

    // Initial calculations across all tools
    this.calcBMI();
    this.calcCalorie();
    this.calcBodyFat();
    this.calcBMR();
    this.calcIBW();
    this.calcPace();
    this.calcArmyBodyFat();
    this.calcLBM();
    this.calcHealthyWeight();
    this.calcCaloriesBurned();
    this.calcOneRepMax();
    this.calcTargetHeartRate();
    this.calcWater();

    // Initial Maternal & Cycle calculations
    this.calcPregnancy();
    this.calcPregnancyWeight();
    this.calcPregnancyConception();
    this.calcDueDate();
    this.calcOvulation();
    this.calcConception();
    this.calcPeriod();

    // Initial 9 Health, Nutrition & Clinical calculations
    this.calcMacro();
    this.calcCarb();
    this.calcProtein();
    this.calcFat();
    this.calcTDEE();
    this.calcGFR();
    this.calcBodyType();
    this.calcBSA();
    this.calcBAC();
  },

  // ------------------------------------------------------------------------
  // Fitness Catalog vs Detail View Management & Group Filtering
  // ------------------------------------------------------------------------
  currentFilter: 'all',

  filterCatalog(filterKey, btnEl) {
    this.currentFilter = filterKey || 'all';

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
        badge.textContent = '29 Clinical, Maternal & Fitness Tools';
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

    document.querySelectorAll('.fit-calc-unit').forEach(panel => {
      panel.style.display = panel.id === calcId ? 'block' : 'none';
    });

    document.querySelectorAll('#fit-detail-view .switcher-pill').forEach(pill => {
      pill.classList.toggle('active', pill.dataset.target === calcId);
    });

    if (window.AppRouter && !window.AppRouter.isDispatching) {
      window.AppRouter.onCalculatorOpened(calcId, 'fitness');
    }

    if (window.SeoGuide) {
      window.SeoGuide.updateGuide(calcId, 'fitness');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    const q = (query || '').toLowerCase().trim();
    const detailView = document.getElementById('fit-detail-view');
    const catalogView = document.getElementById('fit-catalog-view');
    if (detailView && detailView.style.display !== 'none' && q !== '') {
      detailView.style.display = 'none';
      if (catalogView) catalogView.style.display = 'block';
    }

    const boxes = document.querySelectorAll('#fit-catalog-view .feature-big-box');
    let visibleCount = 0;
    boxes.forEach(box => {
      const title = box.querySelector('.box-title')?.textContent.toLowerCase() || '';
      const desc = box.querySelector('.box-description')?.textContent.toLowerCase() || '';
      const tags = box.querySelector('.box-tags-row')?.textContent.toLowerCase() || '';
      const keywords = (box.dataset.keywords || '').toLowerCase();
      const match = q === '' 
        ? (this.currentFilter === 'all' || (box.dataset.fitGroup || '').split(' ').includes(this.currentFilter))
        : (title.includes(q) || desc.includes(q) || tags.includes(q) || keywords.includes(q));
      box.style.display = match ? 'flex' : 'none';
      if (match) visibleCount++;
    });

    const noResults = document.getElementById('fit-no-results');
    if (noResults) {
      noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  },

  resetSearch() {
    const input = document.getElementById('fit-catalog-search');
    if (input) input.value = '';
    this.filterCatalog('all');
    const noResults = document.getElementById('fit-no-results');
    if (noResults) noResults.style.display = 'none';
  }
};

window.FitnessCalcs = FitnessCalcs;
