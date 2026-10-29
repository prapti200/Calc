/* ==========================================================================
   CALC• MODERN CALCULATOR - OTHER & UTILITY CALCULATORS ENGINE
   ========================================================================== */

// Helper constants
const ATOMIC_WEIGHTS = {
  H: 1.008, He: 4.0026, Li: 6.94, Be: 9.0122, B: 10.81, C: 12.011, N: 14.007, O: 15.999, F: 18.998, Ne: 20.180,
  Na: 22.990, Mg: 24.305, Al: 26.982, Si: 28.085, P: 30.974, S: 32.06, Cl: 35.45, Ar: 39.948,
  K: 39.098, Ca: 40.078, Sc: 44.956, Ti: 47.867, V: 50.942, Cr: 51.996, Mn: 54.938, Fe: 55.845, Co: 58.933,
  Ni: 58.693, Cu: 63.546, Zn: 65.38, Ga: 69.723, Ge: 72.630, As: 74.922, Se: 78.971, Br: 79.904, Kr: 83.798,
  Rb: 85.468, Sr: 87.62, Ag: 107.868, I: 126.904, Ba: 137.327, Pt: 195.084, Au: 196.967, Hg: 200.592, Pb: 207.2, U: 238.029
};

const WIRE_CM = {
  '14': 4110, '12': 6530, '10': 10380, '8': 16510, '6': 26240,
  '4': 41740, '3': 52620, '2': 66360, '1': 83690,
  '1/0': 105600, '2/0': 133100, '3/0': 167800, '4/0': 211600
};

const COLOR_CODES = {
  black: { digit: 0, mult: 1, tol: null, hex: '#0f172a' },
  brown: { digit: 1, mult: 10, tol: 1, hex: '#854d0e' },
  red: { digit: 2, mult: 100, tol: 2, hex: '#dc2626' },
  orange: { digit: 3, mult: 1000, tol: null, hex: '#ea580c' },
  yellow: { digit: 4, mult: 10000, tol: null, hex: '#ca8a04' },
  green: { digit: 5, mult: 100000, tol: 0.5, hex: '#16a34a' },
  blue: { digit: 6, mult: 1000000, tol: 0.25, hex: '#2563eb' },
  violet: { digit: 7, mult: 10000000, tol: 0.1, hex: '#9333ea' },
  gray: { digit: 8, mult: 100000000, tol: 0.05, hex: '#64748b' },
  white: { digit: 9, mult: 1000000000, tol: null, hex: '#f8fafc' },
  gold: { digit: null, mult: 0.1, tol: 5, hex: '#d97706' },
  silver: { digit: null, mult: 0.01, tol: 10, hex: '#94a3b8' }
};


const OtherCalcs = {
  // UNIT CONVERTER RATIOS (All converted via base unit)
  unitData: {
    length: {
      base: 'm',
      units: {
        m: { name: 'Meters (m)', factor: 1 },
        km: { name: 'Kilometers (km)', factor: 1000 },
        cm: { name: 'Centimeters (cm)', factor: 0.01 },
        mm: { name: 'Millimeters (mm)', factor: 0.001 },
        inch: { name: 'Inches (in)', factor: 0.0254 },
        ft: { name: 'Feet (ft)', factor: 0.3048 },
        yd: { name: 'Yards (yd)', factor: 0.9144 },
        mi: { name: 'Miles (mi)', factor: 1609.344 }
      }
    },
    weight: {
      base: 'kg',
      units: {
        kg: { name: 'Kilograms (kg)', factor: 1 },
        g: { name: 'Grams (g)', factor: 0.001 },
        mg: { name: 'Milligrams (mg)', factor: 0.000001 },
        lb: { name: 'Pounds (lb)', factor: 0.45359237 },
        oz: { name: 'Ounces (oz)', factor: 0.028349523 },
        ton: { name: 'Metric Tons (t)', factor: 1000 }
      }
    },
    temp: {
      units: {
        c: { name: 'Celsius (°C)' },
        f: { name: 'Fahrenheit (°F)' },
        k: { name: 'Kelvin (K)' }
      }
    },
    speed: {
      base: 'mps',
      units: {
        mps: { name: 'Meters/sec (m/s)', factor: 1 },
        kmh: { name: 'Kilometers/hour (km/h)', factor: 0.277778 },
        mph: { name: 'Miles/hour (mph)', factor: 0.44704 },
        knot: { name: 'Knots (kn)', factor: 0.514444 }
      }
    },
    area: {
      base: 'sqm',
      units: {
        sqm: { name: 'Square Meters (m²)', factor: 1 },
        sqkm: { name: 'Square Kilometers (km²)', factor: 1000000 },
        sqft: { name: 'Square Feet (ft²)', factor: 0.092903 },
        acre: { name: 'Acres', factor: 4046.86 },
        hectare: { name: 'Hectares (ha)', factor: 10000 }
      }
    },
    digital: {
      base: 'byte',
      units: {
        byte: { name: 'Bytes (B)', factor: 1 },
        kb: { name: 'Kilobytes (KB)', factor: 1024 },
        mb: { name: 'Megabytes (MB)', factor: 1048576 },
        gb: { name: 'Gigabytes (GB)', factor: 1073741824 },
        tb: { name: 'Terabytes (TB)', factor: 1099511627776 }
      }
    }
  },

  // 1. UNIVERSAL UNIT CONVERTER
  convertUnits(source = 'from') {
    const category = document.getElementById('unit-category')?.value || 'length';
    const fromUnit = document.getElementById('unit-from-type')?.value;
    const toUnit = document.getElementById('unit-to-type')?.value;
    const fromInput = document.getElementById('unit-from-val');
    const toInput = document.getElementById('unit-to-val');
    const formulaText = document.getElementById('unit-formula-text');

    if (!fromInput || !toInput) return;

    if (category === 'temp') {
      let val = parseFloat(source === 'from' ? fromInput.value : toInput.value);
      if (isNaN(val)) return;

      let cVal = 0;
      const uFrom = source === 'from' ? fromUnit : toUnit;
      const uTo = source === 'from' ? toUnit : fromUnit;

      // To Celsius
      if (uFrom === 'c') cVal = val;
      else if (uFrom === 'f') cVal = (val - 32) * (5 / 9);
      else if (uFrom === 'k') cVal = val - 273.15;

      // From Celsius to target
      let targetVal = 0;
      if (uTo === 'c') targetVal = cVal;
      else if (uTo === 'f') targetVal = cVal * (9 / 5) + 32;
      else if (uTo === 'k') targetVal = cVal + 273.15;

      const rounded = Math.round(targetVal * 1e6) / 1e6;
      if (source === 'from') {
        toInput.value = rounded;
      } else {
        fromInput.value = rounded;
      }
      if (formulaText) formulaText.textContent = `1 ${uFrom.toUpperCase()} ➔ ${rounded} ${uTo.toUpperCase()}`;
      return;
    }

    const catData = this.unitData[category];
    if (!catData) return;

    const val = parseFloat(source === 'from' ? fromInput.value : toInput.value);
    if (isNaN(val)) return;

    const fromFactor = catData.units[fromUnit]?.factor || 1;
    const toFactor = catData.units[toUnit]?.factor || 1;

    let result = 0;
    if (source === 'from') {
      // fromUnit -> base -> toUnit
      const inBase = val * fromFactor;
      result = inBase / toFactor;
      toInput.value = Math.round(result * 1e8) / 1e8;
    } else {
      const inBase = val * toFactor;
      result = inBase / fromFactor;
      fromInput.value = Math.round(result * 1e8) / 1e8;
    }

    if (formulaText) {
      const ratio = fromFactor / toFactor;
      formulaText.textContent = `1 ${fromUnit} = ${Math.round(ratio * 1e6) / 1e6} ${toUnit}`;
    }
  },

  populateUnitDropdowns() {
    const category = document.getElementById('unit-category')?.value || 'length';
    const catData = this.unitData[category];
    const fromSelect = document.getElementById('unit-from-type');
    const toSelect = document.getElementById('unit-to-type');
    if (!catData || !fromSelect || !toSelect) return;

    const options = Object.keys(catData.units).map(key => `<option value="${key}">${catData.units[key].name}</option>`).join('');
    fromSelect.innerHTML = options;
    toSelect.innerHTML = options;

    const keys = Object.keys(catData.units);
    if (keys.length > 1) {
      fromSelect.selectedIndex = 0;
      toSelect.selectedIndex = 1;
    }
    this.convertUnits('from');
  },

  swapUnits() {
    const fromSelect = document.getElementById('unit-from-type');
    const toSelect = document.getElementById('unit-to-type');
    if (!fromSelect || !toSelect) return;

    const temp = fromSelect.value;
    fromSelect.value = toSelect.value;
    toSelect.value = temp;

    this.convertUnits('from');
  },

  // 2. AGE & DATE DIFFERENCE CALCULATOR
  calcAge() {
    const dobInput = document.getElementById('age-dob')?.value;
    const targetDateInput = document.getElementById('age-target-date')?.value;

    if (!dobInput) return;

    const birthDate = new Date(dobInput);
    const targetDate = targetDateInput ? new Date(targetDateInput) : new Date();

    if (isNaN(birthDate.getTime()) || isNaN(targetDate.getTime())) return;
    if (birthDate > targetDate) {
      window.showToast?.('Birth date cannot be after the target date');
      return;
    }

    let years = targetDate.getFullYear() - birthDate.getFullYear();
    let months = targetDate.getMonth() - birthDate.getMonth();
    let days = targetDate.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      // Days in previous month
      const prevMonth = new Date(targetDate.getFullYear(), targetDate.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    // Total difference calculations
    const diffMs = targetDate - birthDate;
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const totalHours = Math.floor(diffMs / (1000 * 60 * 60));

    // Next birthday countdown
    const nextBday = new Date(targetDate.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (nextBday < targetDate) {
      nextBday.setFullYear(targetDate.getFullYear() + 1);
    }
    const daysToNextBday = Math.ceil((nextBday - targetDate) / (1000 * 60 * 60 * 24));
    const dayOfWeek = nextBday.toLocaleDateString('en-US', { weekday: 'long' });

    // Update UI
    const resYears = document.getElementById('res-age-years');
    const resMonths = document.getElementById('res-age-months');
    const resDays = document.getElementById('res-age-days');
    const resTotalDays = document.getElementById('res-age-total-days');
    const resTotalHours = document.getElementById('res-age-total-hours');
    const resNextBday = document.getElementById('res-age-next-bday');

    if (resYears) resYears.textContent = `${years} Years`;
    if (resMonths) resMonths.textContent = `${months} Months`;
    if (resDays) resDays.textContent = `${days} Days`;
    if (resTotalDays) resTotalDays.textContent = `${totalDays.toLocaleString()} Days`;
    if (resTotalHours) resTotalHours.textContent = `${totalHours.toLocaleString()} Hours`;
    if (resNextBday) resNextBday.textContent = `In ${daysToNextBday} days (${dayOfWeek})`;
  },

  // 3. COLLEGE / SCHOOL GPA CALCULATOR
  courses: [
    { id: 1, name: 'Computer Science 101', credits: 4, grade: 'A' },
    { id: 2, name: 'Calculus I', credits: 4, grade: 'A-' },
    { id: 3, name: 'Physics & Lab', credits: 4, grade: 'B+' },
    { id: 4, name: 'Academic Writing', credits: 3, grade: 'A' }
  ],

  gradePoints: {
    'A+': 4.0, 'A': 4.0, 'A-': 3.7,
    'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7,
    'D': 1.0, 'F': 0.0
  },

  renderCourses() {
    const list = document.getElementById('gpa-course-list');
    if (!list) return;

    list.innerHTML = this.courses.map((course, idx) => `
      <div class="course-row" data-id="${course.id}">
        <input type="text" class="form-input course-name" value="${course.name}" placeholder="Course Name" onchange="OtherCalcs.updateCourse(${course.id}, 'name', this.value)">
        <input type="number" class="form-input course-credits" value="${course.credits}" min="0.5" max="10" step="0.5" placeholder="Credits" oninput="OtherCalcs.updateCourse(${course.id}, 'credits', parseFloat(this.value) || 0)">
        <select class="form-select course-grade" onchange="OtherCalcs.updateCourse(${course.id}, 'grade', this.value)">
          ${Object.keys(this.gradePoints).map(g => `<option value="${g}" ${course.grade === g ? 'selected' : ''}>${g} (${this.gradePoints[g]})</option>`).join('')}
        </select>
        <button class="remove-course-btn" onclick="OtherCalcs.removeCourse(${course.id})" title="Remove course">×</button>
      </div>
    `).join('');

    this.calcGPA();
  },

  addCourse() {
    const newId = Date.now();
    this.courses.push({
      id: newId,
      name: `Course ${this.courses.length + 1}`,
      credits: 3,
      grade: 'A'
    });
    this.renderCourses();
  },

  removeCourse(id) {
    if (this.courses.length <= 1) {
      window.showToast?.('Must have at least one course');
      return;
    }
    this.courses = this.courses.filter(c => c.id !== id);
    this.renderCourses();
  },

  updateCourse(id, field, value) {
    const course = this.courses.find(c => c.id === id);
    if (course) {
      course[field] = value;
      this.calcGPA();
    }
  },

  calcGPA() {
    let totalCredits = 0;
    let totalQualityPoints = 0;

    this.courses.forEach(c => {
      const credits = parseFloat(c.credits) || 0;
      const pts = this.gradePoints[c.grade] || 0;
      totalCredits += credits;
      totalQualityPoints += credits * pts;
    });

    const gpa = totalCredits > 0 ? totalQualityPoints / totalCredits : 0;
    const roundedGPA = Math.round(gpa * 100) / 100;
    const pctEquivalent = Math.round((roundedGPA / 4.0) * 100);

    const resGpa = document.getElementById('res-gpa-val');
    const resCredits = document.getElementById('res-gpa-credits');
    const resPct = document.getElementById('res-gpa-pct');

    if (resGpa) resGpa.textContent = roundedGPA.toFixed(2);
    if (resCredits) resCredits.textContent = totalCredits;
    if (resPct) resPct.textContent = `${pctEquivalent}%`;
  },

  // 4. WORK HOURS & WAGES CALCULATOR

  // ------------------------------------------------------------------------
  // 5. DATE CALCULATOR (Add/Subtract days & Difference)
  // ------------------------------------------------------------------------
  calcDate() {
    const mode = document.getElementById('date-calc-mode')?.value || 'diff';
    const wrapDiff = document.getElementById('date-wrap-diff');
    const wrapAdd = document.getElementById('date-wrap-add');
    if (wrapDiff) wrapDiff.style.display = mode === 'diff' ? 'grid' : 'none';
    if (wrapAdd) wrapAdd.style.display = mode === 'add' ? 'grid' : 'none';

    if (mode === 'diff') {
      const d1Str = document.getElementById('date-d1')?.value;
      const d2Str = document.getElementById('date-d2')?.value;
      if (!d1Str || !d2Str) return;
      const d1 = new Date(d1Str);
      const d2 = new Date(d2Str);
      const diffMs = d2.getTime() - d1.getTime();
      const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
      const absDays = Math.abs(diffDays);
      const weeks = Math.floor(absDays / 7);
      const remDays = absDays % 7;
      const monthsApprox = (absDays / 30.4375).toFixed(1);

      const elDiff = document.getElementById('res-date-days');
      if (elDiff) elDiff.textContent = `${absDays} Days ${diffDays < 0 ? '(Past)' : ''}`;
      const elWeeks = document.getElementById('res-date-weeks');
      if (elWeeks) elWeeks.textContent = `${weeks} Weeks, ${remDays} Days`;
      const elMo = document.getElementById('res-date-months');
      if (elMo) elMo.textContent = `~${monthsApprox} Months`;
      const banner = document.getElementById('date-banner');
      if (banner) banner.innerHTML = `<strong>Date Range:</strong> ${d1Str} &nbsp;➔&nbsp; ${d2Str} = <strong>${absDays} days</strong> total.`;
    } else {
      const baseStr = document.getElementById('date-base')?.value;
      const op = document.getElementById('date-op')?.value || 'add';
      const count = parseInt(document.getElementById('date-count')?.value, 10) || 0;
      const unit = document.getElementById('date-unit')?.value || 'days';
      if (!baseStr) return;

      const d = new Date(baseStr + 'T12:00:00');
      const mult = op === 'add' ? 1 : -1;

      if (unit === 'days') {
        d.setDate(d.getDate() + (count * mult));
      } else if (unit === 'weeks') {
        d.setDate(d.getDate() + (count * 7 * mult));
      } else if (unit === 'months') {
        d.setMonth(d.getMonth() + (count * mult));
      } else if (unit === 'years') {
        d.setFullYear(d.getFullYear() + (count * mult));
      }

      const resDateStr = d.toISOString().split('T')[0];
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const dayName = days[d.getDay()];

      const elRes = document.getElementById('res-date-result');
      if (elRes) elRes.textContent = `${resDateStr} (${dayName})`;
      const banner = document.getElementById('date-banner');
      if (banner) banner.innerHTML = `<strong>Calculation:</strong> ${baseStr} ${op === 'add' ? '+' : '-'} ${count} ${unit} = <strong>${resDateStr} (${dayName})</strong>`;
    }
  },

  // ------------------------------------------------------------------------
  // 6. TIME CALCULATOR (Add/Subtract times)
  // ------------------------------------------------------------------------
  calcTime() {
    const h1 = parseInt(document.getElementById('time-h1')?.value, 10) || 0;
    const m1 = parseInt(document.getElementById('time-m1')?.value, 10) || 0;
    const s1 = parseInt(document.getElementById('time-s1')?.value, 10) || 0;
    const op = document.getElementById('time-op')?.value || '+';
    const h2 = parseInt(document.getElementById('time-h2')?.value, 10) || 0;
    const m2 = parseInt(document.getElementById('time-m2')?.value, 10) || 0;
    const s2 = parseInt(document.getElementById('time-s2')?.value, 10) || 0;

    const totalSec1 = h1 * 3600 + m1 * 60 + s1;
    const totalSec2 = h2 * 3600 + m2 * 60 + s2;
    const netSec = op === '+' ? totalSec1 + totalSec2 : Math.max(0, totalSec1 - totalSec2);

    const outH = Math.floor(netSec / 3600);
    const outM = Math.floor((netSec % 3600) / 60);
    const outS = netSec % 60;
    const decHours = netSec / 3600;

    const elTime = document.getElementById('res-time-formatted');
    if (elTime) elTime.textContent = `${outH}h ${outM}m ${outS}s`;
    const elDec = document.getElementById('res-time-dec');
    if (elDec) elDec.textContent = `${decHours.toFixed(4)} Hours`;
    const elSec = document.getElementById('res-time-sec');
    if (elSec) elSec.textContent = `${netSec.toLocaleString()} Seconds (${(netSec / 60).toFixed(2)} mins)`;

    const banner = document.getElementById('time-banner');
    if (banner) {
      banner.innerHTML = `<strong>Equation:</strong> (${h1}h ${m1}m ${s1}s) ${op} (${h2}h ${m2}m ${s2}s) = <strong>${outH}h ${outM}m ${outS}s</strong>`;
    }
  },

  // ------------------------------------------------------------------------
  // 7. HOURS CALCULATOR (Start & End with break)
  // ------------------------------------------------------------------------
  calcHours() {
    const startStr = document.getElementById('hours-start')?.value || '09:00';
    const endStr = document.getElementById('hours-end')?.value || '17:30';
    const breakMins = parseInt(document.getElementById('hours-break')?.value, 10) || 0;

    const [sH, sM] = startStr.split(':').map(Number);
    const [eH, eM] = endStr.split(':').map(Number);
    let startMin = sH * 60 + sM;
    let endMin = eH * 60 + eM;
    if (endMin < startMin) endMin += 24 * 60; // Overnight span

    const totalSpanMin = endMin - startMin;
    const netWorkedMin = Math.max(0, totalSpanMin - breakMins);

    const h = Math.floor(netWorkedMin / 60);
    const m = netWorkedMin % 60;
    const decHours = netWorkedMin / 60;

    const elTotal = document.getElementById('res-hours-total');
    if (elTotal) elTotal.textContent = `${h} hrs ${m} mins`;
    const elDec = document.getElementById('res-hours-dec');
    if (elDec) elDec.textContent = `${decHours.toFixed(2)} Decimal Hours`;
    const elBreak = document.getElementById('res-hours-break');
    if (elBreak) elBreak.textContent = `${breakMins} mins unpaid break deducted`;

    const banner = document.getElementById('hours-banner');
    if (banner) {
      banner.innerHTML = `<strong>Timeline:</strong> ${startStr} to ${endStr} (${totalSpanMin}m span) - ${breakMins}m break = <strong>${decHours.toFixed(2)} hours</strong>.`;
    }
  },

  // ------------------------------------------------------------------------
  // 8. TIME CARD CALCULATOR (7-Day Weekly Timesheet)
  // ------------------------------------------------------------------------
  calcTimeCard() {
    const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    let totalMinsWorked = 0;

    days.forEach(d => {
      const inVal = document.getElementById(`tc-${d}-in`)?.value;
      const outVal = document.getElementById(`tc-${d}-out`)?.value;
      const breakVal = parseInt(document.getElementById(`tc-${d}-break`)?.value, 10) || 0;
      const dayTotalEl = document.getElementById(`res-tc-${d}-total`);

      if (inVal && outVal) {
        const [iH, iM] = inVal.split(':').map(Number);
        const [oH, oM] = outVal.split(':').map(Number);
        let startMin = iH * 60 + iM;
        let endMin = oH * 60 + oM;
        if (endMin < startMin) endMin += 24 * 60;
        const dayNet = Math.max(0, (endMin - startMin) - breakVal);
        totalMinsWorked += dayNet;
        if (dayTotalEl) dayTotalEl.textContent = (dayNet / 60).toFixed(2) + 'h';
      } else {
        if (dayTotalEl) dayTotalEl.textContent = '0.00h';
      }
    });

    const totalHours = totalMinsWorked / 60;
    const regHours = Math.min(40, totalHours);
    const otHours = Math.max(0, totalHours - 40);

    const rate = parseFloat(document.getElementById('tc-rate')?.value) || 25;
    const otMult = parseFloat(document.getElementById('tc-ot-mult')?.value) || 1.5;

    const regPay = regHours * rate;
    const otPay = otHours * (rate * otMult);
    const grossPay = regPay + otPay;

    const elTotalH = document.getElementById('res-tc-total-hours');
    if (elTotalH) elTotalH.textContent = `${totalHours.toFixed(2)} hrs`;
    const elRegH = document.getElementById('res-tc-reg-hours');
    if (elRegH) elRegH.textContent = `${regHours.toFixed(2)} hrs (${regPay.toFixed(2)})`;
    const elOtH = document.getElementById('res-tc-ot-hours');
    if (elOtH) elOtH.textContent = `${otHours.toFixed(2)} hrs (${otPay.toFixed(2)})`;
    const elGross = document.getElementById('res-tc-gross-pay');
    if (elGross) elGross.textContent = `${grossPay.toFixed(2)}`;
  },

  // ------------------------------------------------------------------------
  // 9. TIME ZONE CALCULATOR
  // ------------------------------------------------------------------------
  calcTimeZone() {
    const inputTimeStr = document.getElementById('tz-time')?.value || '12:00';
    const inputDateStr = document.getElementById('tz-date')?.value || new Date().toISOString().split('T')[0];
    const sourceOffset = parseFloat(document.getElementById('tz-source')?.value) || 0;
    const targetOffset = parseFloat(document.getElementById('tz-target')?.value) || 0;

    const [h, m] = inputTimeStr.split(':').map(Number);
    const dt = new Date(`${inputDateStr}T${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:00Z`);
    const utcMs = dt.getTime() - (sourceOffset * 3600000);
    const targetMs = utcMs + (targetOffset * 3600000);
    const targetDate = new Date(targetMs);

    const outDateStr = targetDate.toISOString().split('T')[0];
    const outTimeStr = targetDate.toISOString().split('T')[1].substring(0, 5);
    const diffHours = targetOffset - sourceOffset;

    const elTarget = document.getElementById('res-tz-target-time');
    if (elTarget) elTarget.textContent = `${outTimeStr} (${outDateStr})`;
    const elDiff = document.getElementById('res-tz-diff');
    if (elDiff) elDiff.textContent = `${diffHours >= 0 ? '+' : ''}${diffHours} hours`;

    const banner = document.getElementById('tz-banner');
    if (banner) {
      banner.innerHTML = `<strong>Converted:</strong> ${inputDateStr} ${inputTimeStr} (UTC${sourceOffset>=0?'+':''}${sourceOffset}) &nbsp;➔&nbsp; ` +
        `<strong>${outDateStr} ${outTimeStr} (UTC${targetOffset>=0?'+':''}${targetOffset})</strong>`;
    }
  },

  // ------------------------------------------------------------------------
  // 10. TIME DURATION CALCULATOR (Between 2 full timestamps)
  // ------------------------------------------------------------------------
  calcDuration() {
    const startStr = document.getElementById('dur-start')?.value;
    const endStr = document.getElementById('dur-end')?.value;
    if (!startStr || !endStr) return;

    const t1 = new Date(startStr).getTime();
    const t2 = new Date(endStr).getTime();
    const diffMs = Math.max(0, t2 - t1);
    const totalSec = Math.floor(diffMs / 1000);

    const d = Math.floor(totalSec / 86400);
    const h = Math.floor((totalSec % 86400) / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    const totalHours = totalSec / 3600;

    const elFull = document.getElementById('res-dur-full');
    if (elFull) elFull.textContent = `${d} Days, ${h} Hours, ${m} Mins, ${s} Secs`;
    const elHours = document.getElementById('res-dur-hours');
    if (elHours) elHours.textContent = `${totalHours.toFixed(2)} Total Hours`;
    const elMins = document.getElementById('res-dur-mins');
    if (elMins) elMins.textContent = `${(totalSec / 60).toLocaleString(undefined, {maximumFractionDigits:1})} Total Minutes`;

    const banner = document.getElementById('dur-banner');
    if (banner) {
      banner.innerHTML = `<strong>Total Elapsed:</strong> ${d} days, ${h} hours, ${m} minutes, ${s} seconds (${totalSec.toLocaleString()} seconds total).`;
    }
  },

  // ------------------------------------------------------------------------
  // 11. DAY COUNTER (Total & Business Days)
  // ------------------------------------------------------------------------
  calcDayCounter() {
    const startStr = document.getElementById('dc-start')?.value;
    const endStr = document.getElementById('dc-end')?.value;
    const inclEnd = document.getElementById('dc-incl-end')?.checked || false;
    if (!startStr || !endStr) return;

    const s = new Date(startStr + 'T12:00:00');
    const e = new Date(endStr + 'T12:00:00');
    if (e < s) return;

    let businessDays = 0;
    let totalDays = 0;
    const cur = new Date(s);
    if (!inclEnd) {
      e.setDate(e.getDate() - 1);
    }

    while (cur <= e) {
      const day = cur.getDay();
      if (day !== 0 && day !== 6) businessDays++;
      totalDays++;
      cur.setDate(cur.getDate() + 1);
    }

    const weekendDays = totalDays - businessDays;
    const weeks = (totalDays / 7).toFixed(1);

    const elTotal = document.getElementById('res-dc-total');
    if (elTotal) elTotal.textContent = `${totalDays} Days`;
    const elBiz = document.getElementById('res-dc-business');
    if (elBiz) elBiz.textContent = `${businessDays} Business Days`;
    const elWknd = document.getElementById('res-dc-weekend');
    if (elWknd) elWknd.textContent = `${weekendDays} Weekend Days`;
    const elWks = document.getElementById('res-dc-weeks');
    if (elWks) elWks.textContent = `~${weeks} Weeks`;

    const banner = document.getElementById('dc-banner');
    if (banner) {
      banner.innerHTML = `<strong>Count:</strong> ${startStr} to ${endStr} (${inclEnd ? 'inclusive' : 'exclusive'}) = <strong>${businessDays} working days</strong> and <strong>${weekendDays} weekend days</strong>.`;
    }
  },

  // ------------------------------------------------------------------------
  // 12. DAY OF THE WEEK CALCULATOR
  // ------------------------------------------------------------------------
  calcDayOfWeek() {
    const dateStr = document.getElementById('dow-date')?.value;
    if (!dateStr) return;
    const d = new Date(dateStr + 'T12:00:00');
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const dayName = days[d.getDay()];
    const monthName = months[d.getMonth()];
    const year = d.getFullYear();
    const isLeap = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);

    const startYear = new Date(year, 0, 1);
    const dayOfYear = Math.floor((d - startYear) / (1000 * 60 * 60 * 24)) + 1;
    const weekNum = Math.ceil(dayOfYear / 7);

    const elDay = document.getElementById('res-dow-day');
    if (elDay) elDay.textContent = dayName;
    const elDoy = document.getElementById('res-dow-doy');
    if (elDoy) elDoy.textContent = `Day ${dayOfYear} of ${isLeap ? 366 : 365} (Week ${weekNum})`;
    const elLeap = document.getElementById('res-dow-leap');
    if (elLeap) elLeap.textContent = isLeap ? 'Yes (Leap Year 366 Days)' : 'No (Common Year 365 Days)';

    const banner = document.getElementById('dow-banner');
    if (banner) {
      banner.innerHTML = `<strong>${monthName} ${d.getDate()}, ${year}</strong> fell on a <strong>${dayName}</strong>.`;
    }
  },

  // ------------------------------------------------------------------------
  // 13. CONCRETE CALCULATOR
  // ------------------------------------------------------------------------
  updateConcreteInputs() {
    const shape = document.getElementById('conc-shape')?.value || 'slab';
    const l1 = document.getElementById('conc-lbl-p1');
    const l2 = document.getElementById('conc-lbl-p2');
    const l3 = document.getElementById('conc-lbl-p3');
    const wrapP3 = document.getElementById('conc-wrap-p3');

    if (shape === 'slab') {
      if (l1) l1.textContent = 'Length (ft)';
      if (l2) l2.textContent = 'Width (ft)';
      if (l3) l3.textContent = 'Thickness (inches)';
      if (wrapP3) wrapP3.style.display = 'block';
    } else if (shape === 'footing') {
      if (l1) l1.textContent = 'Length (ft)';
      if (l2) l2.textContent = 'Width (inches)';
      if (l3) l3.textContent = 'Depth (inches)';
      if (wrapP3) wrapP3.style.display = 'block';
    } else if (shape === 'column') {
      if (l1) l1.textContent = 'Height / Depth (ft)';
      if (l2) l2.textContent = 'Diameter (inches)';
      if (wrapP3) wrapP3.style.display = 'none';
    }
    this.calcConcrete();
  },

  calcConcrete() {
    const shape = document.getElementById('conc-shape')?.value || 'slab';
    const p1 = parseFloat(document.getElementById('conc-p1')?.value) || 0;
    const p2 = parseFloat(document.getElementById('conc-p2')?.value) || 0;
    const p3 = parseFloat(document.getElementById('conc-p3')?.value) || 0;
    const wastePct = parseFloat(document.getElementById('conc-waste')?.value) || 10;

    let cuFt = 0;
    if (shape === 'slab') {
      cuFt = p1 * p2 * (p3 / 12);
    } else if (shape === 'footing') {
      cuFt = p1 * (p2 / 12) * (p3 / 12);
    } else if (shape === 'column') {
      const rFt = (p2 / 12) / 2;
      cuFt = Math.PI * rFt * rFt * p1;
    }

    const cuYardsRaw = cuFt / 27;
    const cuYardsTotal = cuYardsRaw * (1 + wastePct / 100);
    const cuMeters = cuYardsTotal * 0.764555;
    const bags60 = Math.ceil(cuYardsTotal * 60);
    const bags80 = Math.ceil(cuYardsTotal * 45);

    const elYd = document.getElementById('res-conc-yards');
    if (elYd) elYd.textContent = `${cuYardsTotal.toFixed(2)} cu yds (${wastePct}% waste)`;
    const elBags80 = document.getElementById('res-conc-bags80');
    if (elBags80) elBags80.textContent = `${bags80} bags (80 lb)`;
    const elBags60 = document.getElementById('res-conc-bags60');
    if (elBags60) elBags60.textContent = `${bags60} bags (60 lb)`;
    const elM3 = document.getElementById('res-conc-m3');
    if (elM3) elM3.textContent = `${cuMeters.toFixed(2)} m³ (${cuFt.toFixed(1)} cu ft)`;

    const banner = document.getElementById('conc-banner');
    if (banner) {
      banner.innerHTML = `<strong>Volume:</strong> ${cuFt.toFixed(2)} ft³ &nbsp;➔&nbsp; ` +
        `<strong>${cuYardsTotal.toFixed(2)} Cubic Yards</strong> required.`;
    }
  },

  // ------------------------------------------------------------------------
  // 14. BTU CALCULATOR (Heating / Cooling)
  // ------------------------------------------------------------------------
  calcBTU() {
    const sqFt = parseFloat(document.getElementById('btu-sqft')?.value) || 0;
    const ceilingFt = parseFloat(document.getElementById('btu-ceiling')?.value) || 8;
    const sun = document.getElementById('btu-sun')?.value || 'normal';
    const climate = document.getElementById('btu-climate')?.value || 'moderate';
    const occupants = parseInt(document.getElementById('btu-occupants')?.value, 10) || 2;

    let baseBTU = sqFt * 20 * (ceilingFt / 8);
    if (sun === 'sunny') baseBTU *= 1.10;
    else if (sun === 'shaded') baseBTU *= 0.90;

    if (climate === 'hot') baseBTU *= 1.15;
    else if (climate === 'cold') baseBTU *= 0.95;

    if (occupants > 2) {
      baseBTU += (occupants - 2) * 600;
    }

    const tonsAC = baseBTU / 12000;

    const elBtu = document.getElementById('res-btu-total');
    if (elBtu) elBtu.textContent = `${Math.round(baseBTU).toLocaleString()} BTU/hr`;
    const elTons = document.getElementById('res-btu-tons');
    if (elTons) elTons.textContent = `${tonsAC.toFixed(2)} Tons AC Capacity`;
    const elKw = document.getElementById('res-btu-kw');
    if (elKw) elKw.textContent = `${(baseBTU * 0.000293071).toFixed(2)} kW equivalent`;

    const banner = document.getElementById('btu-banner');
    if (banner) {
      banner.innerHTML = `<strong>Recommended Unit:</strong> Minimum <strong>${Math.round(baseBTU).toLocaleString()} BTU</strong> (~${Math.ceil(tonsAC * 2) / 2} Ton Air Conditioner / Heat Pump).`;
    }
  },

  // ------------------------------------------------------------------------
  // 15. SQUARE FOOTAGE CALCULATOR
  // ------------------------------------------------------------------------
  calcSquareFootage() {
    const l1 = parseFloat(document.getElementById('sqft-l1')?.value) || 0;
    const w1 = parseFloat(document.getElementById('sqft-w1')?.value) || 0;
    const l2 = parseFloat(document.getElementById('sqft-l2')?.value) || 0;
    const w2 = parseFloat(document.getElementById('sqft-w2')?.value) || 0;
    const wastePct = parseFloat(document.getElementById('sqft-waste')?.value) || 10;
    const pricePerSqFt = parseFloat(document.getElementById('sqft-price')?.value) || 0;

    const area1 = l1 * w1;
    const area2 = l2 * w2;
    const rawSqFt = area1 + area2;
    const totalSqFt = rawSqFt * (1 + wastePct / 100);
    const sqMeters = totalSqFt * 0.092903;
    const estCost = totalSqFt * pricePerSqFt;

    const elSqFt = document.getElementById('res-sqft-total');
    if (elSqFt) elSqFt.textContent = `${totalSqFt.toFixed(2)} sq ft (${rawSqFt.toFixed(1)} net)`;
    const elM2 = document.getElementById('res-sqft-m2');
    if (elM2) elM2.textContent = `${sqMeters.toFixed(2)} m²`;
    const elCost = document.getElementById('res-sqft-cost');
    if (elCost) elCost.textContent = pricePerSqFt > 0 ? `${estCost.toFixed(2)}` : 'N/A';

    const banner = document.getElementById('sqft-banner');
    if (banner) {
      banner.innerHTML = `<strong>Total Area:</strong> ${rawSqFt.toFixed(1)} sq ft + ${wastePct}% waste = <strong>${totalSqFt.toFixed(2)} sq ft</strong>.`;
    }
  },

  // ------------------------------------------------------------------------
  // 16. STAIR CALCULATOR
  // ------------------------------------------------------------------------
  calcStairs() {
    const totalRiseIn = parseFloat(document.getElementById('stair-rise')?.value) || 105;
    const targetRiserIn = parseFloat(document.getElementById('stair-target-riser')?.value) || 7.5;
    const treadDepthIn = parseFloat(document.getElementById('stair-tread')?.value) || 10.5;

    if (totalRiseIn <= 0) return;

    const numRisers = Math.max(1, Math.round(totalRiseIn / targetRiserIn));
    const actualRiserIn = totalRiseIn / numRisers;
    const numTreads = numRisers - 1;
    const totalRunIn = numTreads * treadDepthIn;
    const stringerLengthIn = Math.sqrt(Math.pow(totalRiseIn, 2) + Math.pow(totalRunIn, 2));
    const angleDeg = Math.atan(totalRiseIn / totalRunIn) * (180 / Math.PI);
    const rule7_11 = 2 * actualRiserIn + treadDepthIn;
    const isCode = actualRiserIn <= 7.75 && treadDepthIn >= 10 && rule7_11 >= 24 && rule7_11 <= 25.5;

    const elRisers = document.getElementById('res-stair-risers');
    if (elRisers) elRisers.textContent = `${numRisers} Risers @ ${actualRiserIn.toFixed(2)}" each`;
    const elTreads = document.getElementById('res-stair-treads');
    if (elTreads) elTreads.textContent = `${numTreads} Treads @ ${treadDepthIn.toFixed(2)}" each`;
    const elRun = document.getElementById('res-stair-run');
    if (elRun) elRun.textContent = `${(totalRunIn / 12).toFixed(2)} ft (${totalRunIn.toFixed(1)}")`;
    const elStringer = document.getElementById('res-stair-stringer');
    if (elStringer) elStringer.textContent = `${(stringerLengthIn / 12).toFixed(2)} ft (${stringerLengthIn.toFixed(1)}")`;
    const elAngle = document.getElementById('res-stair-angle');
    if (elAngle) elAngle.textContent = `${angleDeg.toFixed(1)}° (${isCode ? '✅ Code Compliant' : '⚠️ Non-Standard Pitch'})`;

    const banner = document.getElementById('stair-banner');
    if (banner) {
      banner.innerHTML = `<strong>Stair Design:</strong> ${numRisers} risers (${actualRiserIn.toFixed(2)}"), ${numTreads} treads, Total Run: ${(totalRunIn/12).toFixed(2)} ft, Angle: ${angleDeg.toFixed(1)}°.`;
    }
  },

  // ------------------------------------------------------------------------
  // 17. ROOFING CALCULATOR
  // ------------------------------------------------------------------------
  calcRoofing() {
    const baseSqFt = parseFloat(document.getElementById('roof-sqft')?.value) || 1500;
    const pitch = parseFloat(document.getElementById('roof-pitch')?.value) || 6;
    const wastePct = parseFloat(document.getElementById('roof-waste')?.value) || 10;

    const pitchMult = Math.sqrt(1 + Math.pow(pitch / 12, 2));
    const actualSqFt = baseSqFt * pitchMult;
    const totalSqFt = actualSqFt * (1 + wastePct / 100);
    const squares = totalSqFt / 100;
    const bundles = Math.ceil(squares * 3);
    const underlaymentRolls = Math.ceil(totalSqFt / 400);

    const elSquares = document.getElementById('res-roof-squares');
    if (elSquares) elSquares.textContent = `${squares.toFixed(2)} Roofing Squares`;
    const elBundles = document.getElementById('res-roof-bundles');
    if (elBundles) elBundles.textContent = `${bundles} Bundles of Shingles (3/sq)`;
    const elArea = document.getElementById('res-roof-area');
    if (elArea) elArea.textContent = `${totalSqFt.toFixed(1)} sq ft (Pitch Mult: ${pitchMult.toFixed(3)})`;
    const elRolls = document.getElementById('res-roof-rolls');
    if (elRolls) elRolls.textContent = `${underlaymentRolls} Rolls Underlayment`;

    const banner = document.getElementById('roof-banner');
    if (banner) {
      banner.innerHTML = `<strong>Roof Requirements:</strong> ${baseSqFt} sq ft base @ ${pitch}/12 pitch = <strong>${bundles} Shingle Bundles</strong> (${squares.toFixed(2)} squares).`;
    }
  },

  // ------------------------------------------------------------------------
  // 18. TILE CALCULATOR
  // ------------------------------------------------------------------------
  calcTile() {
    const roomL = parseFloat(document.getElementById('tile-room-l')?.value) || 12;
    const roomW = parseFloat(document.getElementById('tile-room-w')?.value) || 10;
    const tileL = parseFloat(document.getElementById('tile-dim-l')?.value) || 12;
    const tileW = parseFloat(document.getElementById('tile-dim-w')?.value) || 12;
    const wastePct = parseFloat(document.getElementById('tile-waste')?.value) || 10;
    const boxSqFt = parseFloat(document.getElementById('tile-box-sqft')?.value) || 15;

    const roomSqFt = roomL * roomW;
    const tileSqFt = (tileL * tileW) / 144;
    const totalSqFt = roomSqFt * (1 + wastePct / 100);
    const numTiles = Math.ceil(totalSqFt / tileSqFt);
    const numBoxes = Math.ceil(totalSqFt / boxSqFt);

    const elTiles = document.getElementById('res-tile-count');
    if (elTiles) elTiles.textContent = `${numTiles} Individual Tiles`;
    const elBoxes = document.getElementById('res-tile-boxes');
    if (elBoxes) elBoxes.textContent = `${numBoxes} Tile Boxes (${boxSqFt} sq ft/box)`;
    const elArea = document.getElementById('res-tile-area');
    if (elArea) elArea.textContent = `${totalSqFt.toFixed(1)} sq ft (${wastePct}% waste incl)`;

    const banner = document.getElementById('tile-banner');
    if (banner) {
      banner.innerHTML = `<strong>Coverage:</strong> ${roomSqFt} sq ft room + ${wastePct}% waste = <strong>${numTiles} tiles</strong> (${numBoxes} boxes).`;
    }
  },

  // ------------------------------------------------------------------------
  // 19. MULCH CALCULATOR
  // ------------------------------------------------------------------------
  calcMulch() {
    const areaSqFt = parseFloat(document.getElementById('mulch-area')?.value) || 500;
    const depthIn = parseFloat(document.getElementById('mulch-depth')?.value) || 3;
    const wastePct = parseFloat(document.getElementById('mulch-waste')?.value) || 5;

    const cuFt = areaSqFt * (depthIn / 12) * (1 + wastePct / 100);
    const cuYds = cuFt / 27;
    const bags2 = Math.ceil(cuFt / 2);
    const bags3 = Math.ceil(cuFt / 3);

    const elYds = document.getElementById('res-mulch-yds');
    if (elYds) elYds.textContent = `${cuYds.toFixed(2)} Cubic Yards`;
    const elBags2 = document.getElementById('res-mulch-bags2');
    if (elBags2) elBags2.textContent = `${bags2} Bags (2 cu ft each)`;
    const elBags3 = document.getElementById('res-mulch-bags3');
    if (elBags3) elBags3.textContent = `${bags3} Bags (3 cu ft each)`;
    const elCuFt = document.getElementById('res-mulch-cuft');
    if (elCuFt) elCuFt.textContent = `${cuFt.toFixed(1)} Cubic Feet`;

    const banner = document.getElementById('mulch-banner');
    if (banner) {
      banner.innerHTML = `<strong>Coverage:</strong> ${areaSqFt} sq ft @ ${depthIn}" depth = <strong>${cuYds.toFixed(2)} cu yds</strong> (${bags2} standard 2-cu-ft bags).`;
    }
  },

  // ------------------------------------------------------------------------
  // 20. GRAVEL CALCULATOR
  // ------------------------------------------------------------------------
  calcGravel() {
    const l = parseFloat(document.getElementById('gravel-l')?.value) || 50;
    const w = parseFloat(document.getElementById('gravel-w')?.value) || 10;
    const depthIn = parseFloat(document.getElementById('gravel-depth')?.value) || 4;
    const density = parseFloat(document.getElementById('gravel-density')?.value) || 1.4;

    const sqFt = l * w;
    const cuFt = sqFt * (depthIn / 12);
    const cuYds = cuFt / 27;
    const tonsUS = cuYds * density;
    const tonnesMetric = tonsUS * 0.907185;

    const elTons = document.getElementById('res-gravel-tons');
    if (elTons) elTons.textContent = `${tonsUS.toFixed(2)} US Tons`;
    const elYds = document.getElementById('res-gravel-yds');
    if (elYds) elYds.textContent = `${cuYds.toFixed(2)} Cubic Yards`;
    const elMetric = document.getElementById('res-gravel-metric');
    if (elMetric) elMetric.textContent = `${tonnesMetric.toFixed(2)} Metric Tonnes`;
    const elCuFt = document.getElementById('res-gravel-cuft');
    if (elCuFt) elCuFt.textContent = `${cuFt.toFixed(1)} Cubic Feet (${sqFt} sq ft)`;

    const banner = document.getElementById('gravel-banner');
    if (banner) {
      banner.innerHTML = `<strong>Gravel Estimate:</strong> ${l}ft × ${w}ft @ ${depthIn}" depth = <strong>${tonsUS.toFixed(2)} Tons</strong> (${cuYds.toFixed(2)} cu yds).`;
    }
  },


  // 21. HEIGHT CALCULATOR
  calcHeight() {
    const mode = document.getElementById('height-mode')?.value || 'imperial';
    const wrapImp = document.getElementById('height-wrap-imp');
    const wrapMet = document.getElementById('height-wrap-met');
    if (wrapImp) wrapImp.style.display = mode === 'imperial' ? 'grid' : 'none';
    if (wrapMet) wrapMet.style.display = mode === 'metric' ? 'grid' : 'none';

    let totalIn = 0;
    let cm = 0;

    if (mode === 'imperial') {
      const ft = parseFloat(document.getElementById('height-ft')?.value) || 0;
      const inch = parseFloat(document.getElementById('height-in')?.value) || 0;
      totalIn = ft * 12 + inch;
      cm = totalIn * 2.54;
    } else {
      cm = parseFloat(document.getElementById('height-cm')?.value) || 0;
      totalIn = cm / 2.54;
    }

    const ftOut = Math.floor(totalIn / 12);
    const inOut = (totalIn % 12).toFixed(1);
    const mOut = (cm / 100).toFixed(2);

    const elMain = document.getElementById('res-height-main');
    if (elMain) {
      if (mode === 'imperial') {
        elMain.textContent = `${cm.toFixed(1)} cm (${mOut} m)`;
      } else {
        elMain.textContent = `${ftOut} ft ${inOut} in (${totalIn.toFixed(1)}")`;
      }
    }

    // Adult percentile reference (CDC/WHO US/Global adult statistics)
    // Male median = 175.3 cm (5'9"), SD = 7.5 cm. Female median = 162.6 cm (5'4"), SD = 6.5 cm
    const zMale = (cm - 175.3) / 7.5;
    const zFemale = (cm - 162.6) / 6.5;
    function normCdf(z) {
      const t = 1 / (1 + 0.2316419 * Math.abs(z));
      const d = 0.3989423 * Math.exp(-z * z / 2);
      let p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
      if (z > 0) p = 1 - p;
      return Math.round(p * 100);
    }
    const pctMale = Math.min(99.9, Math.max(0.1, normCdf(zMale)));
    const pctFemale = Math.min(99.9, Math.max(0.1, normCdf(zFemale)));

    const elPct = document.getElementById('res-height-percentile');
    if (elPct) {
      elPct.textContent = `~${pctMale}th percentile (Adult Men) | ~${pctFemale}th percentile (Adult Women)`;
    }

    // Child prediction
    const dFt = parseFloat(document.getElementById('height-dad-ft')?.value) || 5;
    const dIn = parseFloat(document.getElementById('height-dad-in')?.value) || 10;
    const mFt = parseFloat(document.getElementById('height-mom-ft')?.value) || 5;
    const mIn = parseFloat(document.getElementById('height-mom-in')?.value) || 4;
    const gender = document.getElementById('height-child-gender')?.value || 'boy';

    const dTotalIn = dFt * 12 + dIn;
    const mTotalIn = mFt * 12 + mIn;
    const childPredIn = gender === 'boy' ? (dTotalIn + mTotalIn + 5) / 2 : (dTotalIn + mTotalIn - 5) / 2;
    const cFt = Math.floor(childPredIn / 12);
    const cIn = (childPredIn % 12).toFixed(1);
    const cCm = (childPredIn * 2.54).toFixed(1);

    const elChild = document.getElementById('res-height-child');
    if (elChild) {
      elChild.textContent = `${cFt} ft ${cIn} in (${cCm} cm) ± 2"`;
    }

    const banner = document.getElementById('height-banner');
    if (banner) {
      banner.innerHTML = `<strong>Height Equivalent:</strong> ${ftOut}' ${inOut}" = <strong>${cm.toFixed(1)} cm</strong> (${mOut} meters). Mid-Parental predicted child target: <strong>${cFt}' ${cIn}"</strong>.`;
    }
  },

  // 22. CONVERSION CALCULATOR
  updateConvTypes() {
    const cat = document.getElementById('conv-cat')?.value || 'pressure';
    const selFrom = document.getElementById('conv-from-type');
    const selTo = document.getElementById('conv-to-type');
    if (!selFrom || !selTo) return;

    const units = {
      volume: [
        { id: 'l', name: 'Liters (L)' },
        { id: 'ml', name: 'Milliliters (mL)' },
        { id: 'gal', name: 'US Gallons (gal)' },
        { id: 'qt', name: 'US Quarts (qt)' },
        { id: 'pt', name: 'US Pints (pt)' },
        { id: 'cup', name: 'US Measuring Cups' },
        { id: 'floz', name: 'US Fluid Ounces (fl oz)' },
        { id: 'm3', name: 'Cubic Meters (m³)' }
      ],
      pressure: [
        { id: 'psi', name: 'Pounds/sq inch (psi)' },
        { id: 'bar', name: 'Bar (bar)' },
        { id: 'kpa', name: 'Kilopascals (kPa)' },
        { id: 'atm', name: 'Standard Atmospheres (atm)' },
        { id: 'mmhg', name: 'Millimeters of Mercury (mmHg)' }
      ],
      energy: [
        { id: 'joules', name: 'Joules (J)' },
        { id: 'cal', name: 'Gram Calories (cal)' },
        { id: 'kcal', name: 'Kilocalories / Food Cal (kcal)' },
        { id: 'kwh', name: 'Kilowatt-Hours (kWh)' },
        { id: 'btu', name: 'British Thermal Units (BTU)' },
        { id: 'ftlb', name: 'Foot-Pounds (ft-lb)' }
      ],
      power: [
        { id: 'watts', name: 'Watts (W)' },
        { id: 'kw', name: 'Kilowatts (kW)' },
        { id: 'hp', name: 'Mechanical Horsepower (hp)' },
        { id: 'btuh', name: 'BTU / hour (BTU/h)' }
      ],
      fuel: [
        { id: 'mpgus', name: 'Miles per Gallon (US MPG)' },
        { id: 'l100km', name: 'Liters per 100 km (L/100km)' },
        { id: 'mpgimp', name: 'Miles per Gallon (UK Imperial)' },
        { id: 'kml', name: 'Kilometers per Liter (km/L)' }
      ]
    };

    const list = units[cat] || units.pressure;
    selFrom.innerHTML = list.map((u, i) => `<option value="${u.id}" ${i === 0 ? 'selected' : ''}>${u.name}</option>`).join('');
    selTo.innerHTML = list.map((u, i) => `<option value="${u.id}" ${i === 1 ? 'selected' : ''}>${u.name}</option>`).join('');
    this.calcConversion();
  },

  calcConversion() {
    const cat = document.getElementById('conv-cat')?.value || 'pressure';
    const val = parseFloat(document.getElementById('conv-from-val')?.value) || 0;
    const uFrom = document.getElementById('conv-from-type')?.value;
    const uTo = document.getElementById('conv-to-type')?.value;

    const pressureBase = { psi: 6894.76, bar: 100000, kpa: 1000, atm: 101325, mmhg: 133.322 };
    const energyBase = { joules: 1, cal: 4.184, kcal: 4184, kwh: 3600000, btu: 1055.06, ftlb: 1.35582 };
    const volumeBase = { l: 1, ml: 0.001, gal: 3.78541, qt: 0.946353, pt: 0.473176, cup: 0.236588, floz: 0.0295735, m3: 1000 };
    const powerBase = { watts: 1, kw: 1000, hp: 745.699872, btuh: 0.293071 };

    let resVal = 0;
    let factorStr = '';

    if (cat === 'fuel') {
      // Special non-linear inversion for L/100km
      let mpgUS = 0;
      if (uFrom === 'mpgus') mpgUS = val;
      else if (uFrom === 'l100km') mpgUS = val > 0 ? 235.214583 / val : 0;
      else if (uFrom === 'mpgimp') mpgUS = val * 0.832674;
      else if (uFrom === 'kml') mpgUS = val * 2.35214583;

      if (uTo === 'mpgus') resVal = mpgUS;
      else if (uTo === 'l100km') resVal = mpgUS > 0 ? 235.214583 / mpgUS : 0;
      else if (uTo === 'mpgimp') resVal = mpgUS / 0.832674;
      else if (uTo === 'kml') resVal = mpgUS / 2.35214583;
      factorStr = 'Fuel Economy conversion based on standard 235.215 constant';
    } else {
      let baseDict = pressureBase;
      if (cat === 'energy') baseDict = energyBase;
      if (cat === 'volume') baseDict = volumeBase;
      if (cat === 'power') baseDict = powerBase;

      const fFrom = baseDict[uFrom] || 1;
      const fTo = baseDict[uTo] || 1;
      const baseVal = val * fFrom;
      resVal = baseVal / fTo;
      factorStr = `1 ${uFrom} = ${(fFrom / fTo).toPrecision(6)} ${uTo}`;
    }

    const elMain = document.getElementById('res-conv-main');
    if (elMain) elMain.textContent = `${Number(resVal.toFixed(6)).toLocaleString(undefined, {maximumFractionDigits:6})}`;
    const elFactor = document.getElementById('res-conv-factor');
    if (elFactor) elFactor.textContent = factorStr;

    const banner = document.getElementById('conv-banner');
    if (banner) {
      banner.innerHTML = `<strong>Conversion:</strong> ${val} ${uFrom} &nbsp;➔&nbsp; <strong>${Number(resVal.toFixed(6)).toLocaleString(undefined, {maximumFractionDigits:6})} ${uTo}</strong>`;
    }
  },

  // 23. GDP CALCULATOR
  calcGDP() {
    const c = parseFloat(document.getElementById('gdp-c')?.value) || 0;
    const i = parseFloat(document.getElementById('gdp-i')?.value) || 0;
    const g = parseFloat(document.getElementById('gdp-g')?.value) || 0;
    const x = parseFloat(document.getElementById('gdp-x')?.value) || 0;
    const m = parseFloat(document.getElementById('gdp-m')?.value) || 0;
    const pop = parseFloat(document.getElementById('gdp-pop')?.value) || 0;
    const deflator = parseFloat(document.getElementById('gdp-deflator')?.value) || 100;

    const netExports = x - m;
    const nominalGDP = c + i + g + netExports;
    const realGDP = deflator > 0 ? (nominalGDP / deflator) * 100 : nominalGDP;
    const perCapita = pop > 0 ? (nominalGDP * 1e9) / (pop * 1e6) : 0;

    const elNominal = document.getElementById('res-gdp-nominal');
    if (elNominal) elNominal.textContent = `${nominalGDP.toLocaleString(undefined, {maximumFractionDigits:2})} Billion (${(nominalGDP/1000).toFixed(2)}T)`;
    const elNx = document.getElementById('res-gdp-nx');
    if (elNx) elNx.textContent = `${netExports.toLocaleString(undefined, {maximumFractionDigits:2})} Billion (${netExports >= 0 ? 'Trade Surplus' : 'Trade Deficit'})`;
    const elPerCapita = document.getElementById('res-gdp-percapita');
    if (elPerCapita) elPerCapita.textContent = `${Math.round(perCapita).toLocaleString()} / person`;
    const elReal = document.getElementById('res-gdp-real');
    if (elReal) elReal.textContent = `${realGDP.toLocaleString(undefined, {maximumFractionDigits:2})} Billion Real GDP`;

    const banner = document.getElementById('gdp-banner');
    if (banner) {
      banner.innerHTML = `<strong>GDP Equation:</strong> C (${c}B) + I (${i}B) + G (${g}B) + (X - M: ${netExports}B) = <strong>${nominalGDP.toLocaleString()} Billion</strong>.`;
    }
  },

  // 24. DENSITY CALCULATOR
  updateDensityPreset() {
    const preset = document.getElementById('density-preset')?.value;
    const presets = {
      water: 1.0,
      air: 0.001225,
      aluminum: 2.70,
      steel: 7.85,
      copper: 8.96,
      gold: 19.32,
      silver: 10.49,
      lead: 11.34,
      concrete: 2.40,
      oak: 0.75,
      gasoline: 0.74
    };
    if (presets[preset] !== undefined) {
      const valInput = document.getElementById('density-val');
      if (valInput) valInput.value = presets[preset];
      this.calcDensity();
    }
  },

  calcDensity() {
    const solve = document.getElementById('density-solve')?.value || 'density';
    const wrapMass = document.getElementById('density-wrap-mass');
    const wrapVol = document.getElementById('density-wrap-vol');
    const wrapDens = document.getElementById('density-wrap-dens');

    if (wrapMass) wrapMass.style.display = solve === 'mass' ? 'none' : 'block';
    if (wrapVol) wrapVol.style.display = solve === 'volume' ? 'none' : 'block';
    if (wrapDens) wrapDens.style.display = solve === 'density' ? 'none' : 'block';

    const massG = parseFloat(document.getElementById('density-mass')?.value) || 0;
    const volCm3 = parseFloat(document.getElementById('density-vol')?.value) || 0;
    const densityVal = parseFloat(document.getElementById('density-val')?.value) || 0;

    let resRho = 0;
    let resM = 0;
    let resV = 0;

    if (solve === 'density') {
      if (volCm3 <= 0) return;
      resRho = massG / volCm3;
    } else if (solve === 'mass') {
      resM = densityVal * volCm3;
      resRho = densityVal;
    } else if (solve === 'volume') {
      if (densityVal <= 0) return;
      resV = massG / densityVal;
      resRho = densityVal;
    }

    const kgM3 = resRho * 1000;
    const lbFt3 = resRho * 62.42796;
    const sg = resRho; // vs water (1 g/cm3)

    const elMain = document.getElementById('res-density-main');
    if (elMain) {
      if (solve === 'density') elMain.textContent = `${resRho.toFixed(4)} g/cm³`;
      else if (solve === 'mass') elMain.textContent = `${resM.toFixed(2)} grams (${(resM/1000).toFixed(4)} kg)`;
      else elMain.textContent = `${resV.toFixed(2)} cm³ (${(resV/1000).toFixed(4)} L)`;
    }

    const elKg = document.getElementById('res-density-kgm3');
    if (elKg) elKg.textContent = `${kgM3.toLocaleString(undefined, {maximumFractionDigits:1})} kg/m³`;
    const elLb = document.getElementById('res-density-lbft3');
    if (elLb) elLb.textContent = `${lbFt3.toFixed(2)} lb/ft³`;
    const elSg = document.getElementById('res-density-sg');
    if (elSg) elSg.textContent = `${sg.toFixed(3)} (${sg < 1 ? 'Floats in water' : 'Sinks in water'})`;

    const banner = document.getElementById('density-banner');
    if (banner) {
      banner.innerHTML = `<strong>Formula:</strong> ρ = m / V &nbsp;|&nbsp; Density = <strong>${resRho.toFixed(4)} g/cm³</strong> (${kgM3.toLocaleString()} kg/m³). Specific Gravity: ${sg.toFixed(3)}.`;
    }
  },

  // 25. MASS CALCULATOR
  calcMass() {
    const mode = document.getElementById('mass-mode')?.value || 'density_vol';
    const lbl1 = document.getElementById('mass-lbl-1');
    const lbl2 = document.getElementById('mass-lbl-2');
    const p1 = parseFloat(document.getElementById('mass-p1')?.value) || 0;
    const p2 = parseFloat(document.getElementById('mass-p2')?.value) || 0;

    let massKg = 0;
    let formulaName = '';

    if (mode === 'density_vol') {
      if (lbl1) lbl1.textContent = 'Density (g/cm³)';
      if (lbl2) lbl2.textContent = 'Volume (cm³)';
      massKg = (p1 * p2) / 1000;
      formulaName = `m = ρ × V = ${p1} g/cm³ × ${p2} cm³`;
    } else if (mode === 'force_accel') {
      if (lbl1) lbl1.textContent = 'Force (Newtons, N)';
      if (lbl2) lbl2.textContent = 'Acceleration (m/s²)';
      if (p2 <= 0) return;
      massKg = p1 / p2;
      formulaName = `m = F / a = ${p1} N / ${p2} m/s²`;
    } else if (mode === 'weight_gravity') {
      if (lbl1) lbl1.textContent = 'Weight (Newtons, N)';
      if (lbl2) lbl2.textContent = 'Gravitational Field g (m/s², Earth=9.81)';
      if (p2 <= 0) return;
      massKg = p1 / p2;
      formulaName = `m = W / g = ${p1} N / ${p2} m/s²`;
    }

    const grams = massKg * 1000;
    const lbs = massKg * 2.20462;
    const oz = lbs * 16;
    const c = 299792458;
    const energyJoules = massKg * c * c;

    const elKg = document.getElementById('res-mass-kg');
    if (elKg) elKg.textContent = `${massKg.toLocaleString(undefined, {maximumFractionDigits:4})} kg`;
    const elG = document.getElementById('res-mass-g');
    if (elG) elG.textContent = `${grams.toLocaleString(undefined, {maximumFractionDigits:2})} g`;
    const elLb = document.getElementById('res-mass-lb');
    if (elLb) elLb.textContent = `${lbs.toFixed(3)} lbs (${oz.toFixed(1)} oz)`;
    const elE = document.getElementById('res-mass-energy');
    if (elE) elE.textContent = `${energyJoules.toExponential(3)} Joules`;

    const banner = document.getElementById('mass-banner');
    if (banner) {
      banner.innerHTML = `<strong>Mass Result:</strong> ${formulaName} = <strong>${massKg.toFixed(4)} kg</strong> (${lbs.toFixed(2)} lbs).`;
    }
  },

  // 26. WEIGHT CALCULATOR
  calcWeight() {
    const massVal = parseFloat(document.getElementById('weight-mass')?.value) || 70;
    const massUnit = document.getElementById('weight-unit')?.value || 'kg';
    const body = document.getElementById('weight-body')?.value || 'earth';
    const elevatorA = parseFloat(document.getElementById('weight-accel')?.value) || 0;

    const massKg = massUnit === 'kg' ? massVal : massVal * 0.45359237;

    const gMap = {
      earth: { g: 9.80665, name: 'Earth' },
      moon: { g: 1.62, name: 'Moon (0.166g)' },
      mars: { g: 3.72, name: 'Mars (0.379g)' },
      jupiter: { g: 24.79, name: 'Jupiter (2.53g)' },
      venus: { g: 8.87, name: 'Venus (0.905g)' },
      saturn: { g: 10.44, name: 'Saturn (1.06g)' },
      sun: { g: 274.0, name: 'Sun Surface (27.9g)' }
    };

    const targetG = gMap[body] ? gMap[body].g : 9.80665;
    const netG = targetG + elevatorA;
    const weightN = massKg * netG;
    const weightLbf = weightN * 0.224809;
    const weightKgf = massKg * (netG / 9.80665);
    const gRatio = (netG / 9.80665).toFixed(2);

    const elN = document.getElementById('res-weight-n');
    if (elN) elN.textContent = `${weightN.toFixed(2)} Newtons (N)`;
    const elLbf = document.getElementById('res-weight-lbf');
    if (elLbf) elLbf.textContent = `${weightLbf.toFixed(2)} lbf (Pounds-Force)`;
    const elKgf = document.getElementById('res-weight-kgf');
    if (elKgf) elKgf.textContent = `${weightKgf.toFixed(2)} kgf (Scale Reading)`;
    const elRatio = document.getElementById('res-weight-ratio');
    if (elRatio) elRatio.textContent = `${gRatio}x Earth Gravity (${netG.toFixed(2)} m/s²)`;

    const banner = document.getElementById('weight-banner');
    if (banner) {
      banner.innerHTML = `<strong>Weight on ${gMap[body].name}:</strong> A ${massKg.toFixed(1)} kg mass experiences <strong>${weightN.toFixed(1)} N</strong> (${weightLbf.toFixed(1)} lbs weight).`;
    }
  },

  // 27. SPEED CALCULATOR
  calcSpeed() {
    const solve = document.getElementById('speed-solve')?.value || 'speed';
    const wrapDist = document.getElementById('speed-wrap-dist');
    const wrapTime = document.getElementById('speed-wrap-time');
    const wrapSpeed = document.getElementById('speed-wrap-val');

    if (wrapDist) wrapDist.style.display = solve === 'dist' ? 'none' : 'block';
    if (wrapTime) wrapTime.style.display = solve === 'time' ? 'none' : 'block';
    if (wrapSpeed) wrapSpeed.style.display = solve === 'speed' ? 'none' : 'block';

    const distVal = parseFloat(document.getElementById('speed-dist-val')?.value) || 0;
    const distUnit = document.getElementById('speed-dist-unit')?.value || 'm';

    const distMeters = distUnit === 'm' ? distVal :
                       distUnit === 'km' ? distVal * 1000 :
                       distUnit === 'mi' ? distVal * 1609.344 :
                       distVal * 0.3048; // ft

    const h = parseInt(document.getElementById('speed-time-h')?.value, 10) || 0;
    const m = parseInt(document.getElementById('speed-time-m')?.value, 10) || 0;
    const s = parseInt(document.getElementById('speed-time-s')?.value, 10) || 0;
    const totalSec = h * 3600 + m * 60 + s;

    const speedInputVal = parseFloat(document.getElementById('speed-val')?.value) || 0;
    const speedInputUnit = document.getElementById('speed-unit')?.value || 'mph';
    const speedMps = speedInputUnit === 'mps' ? speedInputVal :
                     speedInputUnit === 'kmh' ? speedInputVal / 3.6 :
                     speedInputUnit === 'mph' ? speedInputVal / 2.23694 :
                     speedInputVal * 0.514444; // knots

    let outMps = 0;
    let outDistMeters = 0;
    let outTotalSec = 0;

    if (solve === 'speed') {
      if (totalSec <= 0) return;
      outMps = distMeters / totalSec;
    } else if (solve === 'dist') {
      outDistMeters = speedMps * totalSec;
      outMps = speedMps;
    } else if (solve === 'time') {
      if (speedMps <= 0) return;
      outTotalSec = distMeters / speedMps;
      outMps = speedMps;
    }

    const kmh = outMps * 3.6;
    const mph = outMps * 2.23694;
    const knots = outMps * 1.94384;
    const mach = outMps / 343;
    const paceMinKm = kmh > 0 ? 60 / kmh : 0;
    const paceMinMi = mph > 0 ? 60 / mph : 0;

    function formatPace(decMins) {
      const pm = Math.floor(decMins);
      const ps = Math.round((decMins - pm) * 60);
      return `${pm}:${String(ps).padStart(2,'0')}`;
    }

    const elMph = document.getElementById('res-speed-mph');
    if (elMph) elMph.textContent = `${mph.toFixed(2)} mph (${kmh.toFixed(2)} km/h)`;
    const elMps = document.getElementById('res-speed-mps');
    if (elMps) elMps.textContent = `${outMps.toFixed(2)} m/s (${knots.toFixed(2)} knots)`;
    const elPace = document.getElementById('res-speed-pace');
    if (elPace) elPace.textContent = `${formatPace(paceMinMi)} min/mi (${formatPace(paceMinKm)} min/km)`;
    const elMach = document.getElementById('res-speed-mach');
    if (elMach) elMach.textContent = `Mach ${mach.toFixed(3)} (Speed of Sound)`;

    const banner = document.getElementById('speed-banner');
    if (banner) {
      banner.innerHTML = `<strong>Velocity:</strong> ${mph.toFixed(2)} mph &nbsp;|&nbsp; ${kmh.toFixed(2)} km/h &nbsp;|&nbsp; Pace: ${formatPace(paceMinMi)}/mile.`;
    }
  },

  // 28. MOLARITY CALCULATOR
  calcMolarity() {
    const solve = document.getElementById('mol-solve')?.value || 'molarity';
    const wrapMass = document.getElementById('mol-wrap-mass');
    const wrapMw = document.getElementById('mol-wrap-mw');
    const wrapVol = document.getElementById('mol-wrap-vol');
    const wrapM = document.getElementById('mol-wrap-m');

    if (wrapMass) wrapMass.style.display = solve === 'mass' ? 'none' : 'block';
    if (wrapVol) wrapVol.style.display = solve === 'volume' ? 'none' : 'block';
    if (wrapM) wrapM.style.display = solve === 'molarity' ? 'none' : 'block';

    const massG = parseFloat(document.getElementById('mol-mass')?.value) || 0;
    const mw = parseFloat(document.getElementById('mol-mw')?.value) || 58.44;
    const volL = parseFloat(document.getElementById('mol-vol')?.value) || 1;
    const targetM = parseFloat(document.getElementById('mol-m')?.value) || 1;

    let resM = 0;
    let resMass = 0;
    let resVol = 0;
    let moles = 0;

    if (solve === 'molarity') {
      if (volL <= 0 || mw <= 0) return;
      moles = massG / mw;
      resM = moles / volL;
    } else if (solve === 'mass') {
      resMass = targetM * volL * mw;
      moles = targetM * volL;
      resM = targetM;
    } else if (solve === 'volume') {
      if (targetM <= 0 || mw <= 0) return;
      moles = massG / mw;
      resVol = moles / targetM;
      resM = targetM;
    }

    const elMain = document.getElementById('res-mol-main');
    if (elMain) {
      if (solve === 'molarity') elMain.textContent = `${resM.toFixed(4)} M (mol/L)`;
      else if (solve === 'mass') elMain.textContent = `${resMass.toFixed(3)} g solute needed`;
      else elMain.textContent = `${resVol.toFixed(3)} L (${(resVol*1000).toFixed(1)} mL) volume`;
    }

    const elMoles = document.getElementById('res-mol-moles');
    if (elMoles) elMoles.textContent = `${moles.toFixed(4)} moles of solute`;
    const elNormal = document.getElementById('res-mol-normal');
    if (elNormal) elNormal.textContent = `${(resM * (mw / 58.44)).toFixed(2)} g/L concentration`;

    const banner = document.getElementById('mol-banner');
    if (banner) {
      banner.innerHTML = `<strong>Solution Equation:</strong> M = (mass / MW) / Volume = <strong>${resM.toFixed(4)} M</strong> (${moles.toFixed(3)} moles in ${volL}L).`;
    }
  },

  // 29. MOLECULAR WEIGHT CALCULATOR
  updateMwPreset() {
    const preset = document.getElementById('mw-preset')?.value;
    if (preset) {
      const input = document.getElementById('mw-formula');
      if (input) input.value = preset;
      this.calcMolecularWeight();
    }
  },

  calcMolecularWeight() {
    const formulaStr = document.getElementById('mw-formula')?.value || 'H2O';
    let clean = formulaStr.replace(/\s+/g, '');
    if (!clean) return;

    let hydratePart = '';
    if (clean.includes('*') || clean.includes('·')) {
      const parts = clean.split(/[*·]/);
      clean = parts[0];
      hydratePart = parts[1];
    }

    function parseSub(subStr) {
      const counts = {};
      const reg = /([A-Z][a-z]?|\([^\)]+\))(\d*)/g;
      let match;
      while ((match = reg.exec(subStr)) !== null) {
        let group = match[1];
        let num = match[2] ? parseInt(match[2], 10) : 1;
        if (group.startsWith('(') && group.endsWith(')')) {
          const inner = group.slice(1, -1);
          const innerCounts = parseSub(inner);
          for (const el in innerCounts) {
            counts[el] = (counts[el] || 0) + innerCounts[el] * num;
          }
        } else {
          counts[group] = (counts[group] || 0) + num;
        }
      }
      return counts;
    }

    let counts = {};
    try {
      counts = parseSub(clean);
      if (hydratePart) {
        const hydMatch = hydratePart.match(/^(\d*)(.*)$/);
        const hydMult = hydMatch[1] ? parseInt(hydMatch[1], 10) : 1;
        const hydCounts = parseSub(hydMatch[2]);
        for (const el in hydCounts) {
          counts[el] = (counts[el] || 0) + hydCounts[el] * hydMult;
        }
      }
    } catch (e) {
      return;
    }

    let totalMw = 0;
    const rows = [];
    for (const el in counts) {
      const w = ATOMIC_WEIGHTS[el] || 0;
      const sub = w * counts[el];
      totalMw += sub;
      rows.push({ el, count: counts[el], weight: w, sub });
    }

    rows.forEach(r => {
      r.pct = totalMw > 0 ? ((r.sub / totalMw) * 100).toFixed(2) : '0';
    });

    const elTotal = document.getElementById('res-mw-total');
    if (elTotal) elTotal.textContent = `${totalMw.toFixed(3)} g/mol`;

    const elTable = document.getElementById('res-mw-table');
    if (elTable) {
      elTable.innerHTML = rows.map(r => `
        <tr>
          <td><strong>${r.el}</strong></td>
          <td>${r.count}</td>
          <td>${r.weight.toFixed(3)}</td>
          <td>${r.sub.toFixed(3)}</td>
          <td><strong>${r.pct}%</strong></td>
        </tr>
      `).join('');
    }

    const banner = document.getElementById('mw-banner');
    if (banner) {
      banner.innerHTML = `<strong>Compound ${formulaStr}:</strong> Molar Mass = <strong>${totalMw.toFixed(3)} g/mol</strong> (${rows.map(r => `${r.el}: ${r.pct}%`).join(', ')}).`;
    }
  },

  // 30. ROMAN NUMERAL CONVERTER
  calcRomanNumeral() {
    const mode = document.getElementById('roman-mode')?.value || 'arabic_to_roman';
    const wrapArabic = document.getElementById('roman-wrap-arabic');
    const wrapRoman = document.getElementById('roman-wrap-roman');
    if (wrapArabic) wrapArabic.style.display = mode === 'arabic_to_roman' ? 'block' : 'none';
    if (wrapRoman) wrapRoman.style.display = mode === 'roman_to_arabic' ? 'block' : 'none';

    const lookup = [
      { val: 1000, sym: 'M' }, { val: 900, sym: 'CM' }, { val: 500, sym: 'D' }, { val: 400, sym: 'CD' },
      { val: 100, sym: 'C' }, { val: 90, sym: 'XC' }, { val: 50, sym: 'L' }, { val: 40, sym: 'XL' },
      { val: 10, sym: 'X' }, { val: 9, sym: 'IX' }, { val: 5, sym: 'V' }, { val: 4, sym: 'IV' }, { val: 1, sym: 'I' }
    ];

    if (mode === 'arabic_to_roman') {
      const num = parseInt(document.getElementById('roman-arabic-in')?.value, 10) || 2026;
      if (num < 1 || num > 3999) return;
      let n = num;
      let roman = '';
      for (const item of lookup) {
        while (n >= item.val) {
          roman += item.sym;
          n -= item.val;
        }
      }
      const elOut = document.getElementById('res-roman-output');
      if (elOut) elOut.textContent = roman;
      const elDec = document.getElementById('res-roman-breakdown');
      if (elDec) elDec.textContent = `Arabic Number: ${num.toLocaleString()}`;
      const banner = document.getElementById('roman-banner');
      if (banner) banner.innerHTML = `<strong>Conversion:</strong> ${num} = <strong>${roman}</strong>`;
    } else {
      const raw = (document.getElementById('roman-str-in')?.value || 'MMXXVI').toUpperCase().trim();
      const map = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
      let total = 0;
      let valid = true;
      for (let i = 0; i < raw.length; i++) {
        const cur = map[raw[i]];
        if (!cur) { valid = false; break; }
        const next = map[raw[i + 1]];
        if (next && next > cur) {
          total += (next - cur);
          i++;
        } else {
          total += cur;
        }
      }
      if (!valid) return;
      const elOut = document.getElementById('res-roman-output');
      if (elOut) elOut.textContent = `${total.toLocaleString()}`;
      const elDec = document.getElementById('res-roman-breakdown');
      if (elDec) elDec.textContent = `Roman Numeral: ${raw}`;
      const banner = document.getElementById('roman-banner');
      if (banner) banner.innerHTML = `<strong>Conversion:</strong> ${raw} = <strong>${total.toLocaleString()}</strong>`;
    }
  },

  // 31. VOLTAGE DROP CALCULATOR
  calcVoltageDrop() {
    const vSource = parseFloat(document.getElementById('vd-voltage')?.value) || 120;
    const currentA = parseFloat(document.getElementById('vd-current')?.value) || 15;
    const distanceFt = parseFloat(document.getElementById('vd-distance')?.value) || 100;
    const gauge = document.getElementById('vd-gauge')?.value || '12';
    const material = document.getElementById('vd-material')?.value || 'copper';
    const phase = document.getElementById('vd-phase')?.value || '1';

    const K = material === 'copper' ? 12.9 : 21.2;
    const cm = WIRE_CM[gauge] || 6530;

    let vDrop = 0;
    if (phase === '1') {
      vDrop = (2 * K * currentA * distanceFt) / cm;
    } else {
      vDrop = (Math.sqrt(3) * K * currentA * distanceFt) / cm;
    }

    const pctDrop = (vDrop / vSource) * 100;
    const endV = vSource - vDrop;
    const compliant = pctDrop <= 3.0;

    const elDrop = document.getElementById('res-vd-drop');
    if (elDrop) elDrop.textContent = `${vDrop.toFixed(2)} Volts (${pctDrop.toFixed(2)}%)`;
    const elEnd = document.getElementById('res-vd-end');
    if (elEnd) elEnd.textContent = `${endV.toFixed(2)} V @ Load`;
    const elStatus = document.getElementById('res-vd-status');
    if (elStatus) {
      elStatus.textContent = compliant ? '✅ Meets NEC 3% Limit' : '⚠️ Exceeds NEC 3% (Upsize Wire)';
      elStatus.style.color = compliant ? 'var(--accent-green)' : 'var(--accent-rose)';
    }

    const banner = document.getElementById('vd-banner');
    if (banner) {
      banner.innerHTML = `<strong>Voltage Analysis:</strong> ${vSource}V source over ${distanceFt} ft of ${gauge} AWG ${material} drops <strong>${vDrop.toFixed(2)}V (${pctDrop.toFixed(2)}%)</strong>. Load voltage: <strong>${endV.toFixed(2)}V</strong>.`;
    }
  },

  // 32. RESISTOR CALCULATOR
  calcResistor() {
    const mode = document.getElementById('res-mode')?.value || 'color';
    const wrapColor = document.getElementById('res-wrap-color');
    const wrapCirc = document.getElementById('res-wrap-circuit');
    if (wrapColor) wrapColor.style.display = mode === 'color' ? 'block' : 'none';
    if (wrapCirc) wrapCirc.style.display = mode === 'circuit' ? 'block' : 'none';

    if (mode === 'color') {
      const b1 = document.getElementById('res-b1')?.value || 'brown';
      const b2 = document.getElementById('res-b2')?.value || 'black';
      const b3 = document.getElementById('res-b3')?.value || 'red';
      const b4 = document.getElementById('res-b4')?.value || 'gold';

      const d1 = COLOR_CODES[b1]?.digit ?? 1;
      const d2 = COLOR_CODES[b2]?.digit ?? 0;
      const mult = COLOR_CODES[b3]?.mult ?? 100;
      const tol = COLOR_CODES[b4]?.tol ?? 5;

      const ohms = (d1 * 10 + d2) * mult;
      let formatted = `${ohms} Ω`;
      if (ohms >= 1e6) formatted = `${(ohms / 1e6).toFixed(2)} MΩ`;
      else if (ohms >= 1e3) formatted = `${(ohms / 1e3).toFixed(2)} kΩ`;

      const minR = ohms * (1 - tol / 100);
      const maxR = ohms * (1 + tol / 100);

      const elVal = document.getElementById('res-resistor-val');
      if (elVal) elVal.textContent = `${formatted} ±${tol}%`;
      const elRange = document.getElementById('res-resistor-range');
      if (elRange) elRange.textContent = `${minR.toFixed(1)} Ω – ${maxR.toFixed(1)} Ω`;

      // Update color chips visually
      ['b1', 'b2', 'b3', 'b4'].forEach((bid, idx) => {
        const val = [b1, b2, b3, b4][idx];
        const chip = document.getElementById(`res-chip-${bid}`);
        if (chip && COLOR_CODES[val]) {
          chip.style.backgroundColor = COLOR_CODES[val].hex;
        }
      });

      const banner = document.getElementById('resistor-banner');
      if (banner) {
        banner.innerHTML = `<strong>Color Code:</strong> ${b1.toUpperCase()} - ${b2.toUpperCase()} - ${b3.toUpperCase()} - ${b4.toUpperCase()} = <strong>${formatted} ±${tol}%</strong>.`;
      }
    } else {
      const r1 = parseFloat(document.getElementById('res-r1')?.value) || 100;
      const r2 = parseFloat(document.getElementById('res-r2')?.value) || 100;
      const r3 = parseFloat(document.getElementById('res-r3')?.value) || 0;

      const series = r1 + r2 + r3;
      let invParallel = (1 / r1) + (1 / r2);
      if (r3 > 0) invParallel += (1 / r3);
      const parallel = 1 / invParallel;

      const elVal = document.getElementById('res-resistor-val');
      if (elVal) elVal.textContent = `Series: ${series.toFixed(2)} Ω | Parallel: ${parallel.toFixed(2)} Ω`;
      const elRange = document.getElementById('res-resistor-range');
      if (elRange) elRange.textContent = `R1: ${r1}Ω, R2: ${r2}Ω, R3: ${r3}Ω`;

      const banner = document.getElementById('resistor-banner');
      if (banner) {
        banner.innerHTML = `<strong>Equivalent Resistance:</strong> In Series: <strong>${series.toFixed(2)} Ω</strong> | In Parallel: <strong>${parallel.toFixed(2)} Ω</strong>.`;
      }
    }
  },

  // 33. OHM'S LAW CALCULATOR
  calcOhmsLaw() {
    const pair = document.getElementById('ohm-pair')?.value || 'vi';
    const vInput = document.getElementById('ohm-v');
    const iInput = document.getElementById('ohm-i');
    const rInput = document.getElementById('ohm-r');
    const pInput = document.getElementById('ohm-p');

    let v = parseFloat(vInput?.value) || 0;
    let i = parseFloat(iInput?.value) || 0;
    let r = parseFloat(rInput?.value) || 0;
    let p = parseFloat(pInput?.value) || 0;

    if (pair === 'vi') {
      if (i > 0) r = v / i;
      p = v * i;
    } else if (pair === 'vr') {
      if (r > 0) {
        i = v / r;
        p = (v * v) / r;
      }
    } else if (pair === 'vp') {
      if (v > 0) {
        i = p / v;
        r = (v * v) / p;
      }
    } else if (pair === 'ir') {
      v = i * r;
      p = i * i * r;
    } else if (pair === 'ip') {
      if (i > 0) {
        v = p / i;
        r = p / (i * i);
      }
    } else if (pair === 'rp') {
      v = Math.sqrt(p * r);
      if (r > 0) i = Math.sqrt(p / r);
    }

    const elV = document.getElementById('res-ohm-v');
    if (elV) elV.textContent = `${v.toFixed(2)} Volts (V)`;
    const elI = document.getElementById('res-ohm-i');
    if (elI) elI.textContent = `${i.toFixed(3)} Amperes (A)`;
    const elR = document.getElementById('res-ohm-r');
    if (elR) elR.textContent = `${r.toFixed(2)} Ohms (Ω)`;
    const elP = document.getElementById('res-ohm-p');
    if (elP) elP.textContent = `${p.toFixed(2)} Watts (W)`;

    const banner = document.getElementById('ohm-banner');
    if (banner) {
      banner.innerHTML = `<strong>Ohm's & Joule's Law:</strong> V = ${v.toFixed(2)}V, I = ${i.toFixed(3)}A, R = ${r.toFixed(2)}Ω, P = ${p.toFixed(2)}W.`;
    }
  },

  // 34. ELECTRICITY CALCULATOR
  updateElecPreset() {
    const preset = document.getElementById('elec-preset')?.value;
    const presets = {
      ac: { watts: 3500, hours: 8 },
      heater: { watts: 1500, hours: 5 },
      fridge: { watts: 150, hours: 24 },
      pc: { watts: 300, hours: 8 },
      microwave: { watts: 1200, hours: 0.5 },
      ev: { watts: 7200, hours: 4 },
      led: { watts: 10, hours: 6 },
      waterheater: { watts: 4000, hours: 3 },
      tv: { watts: 100, hours: 5 }
    };
    if (presets[preset]) {
      const wEl = document.getElementById('elec-watts');
      const hEl = document.getElementById('elec-hours');
      if (wEl) wEl.value = presets[preset].watts;
      if (hEl) hEl.value = presets[preset].hours;
      this.calcElectricity();
    }
  },

  calcElectricity() {
    const watts = parseFloat(document.getElementById('elec-watts')?.value) || 0;
    const hours = parseFloat(document.getElementById('elec-hours')?.value) || 0;
    const rate = parseFloat(document.getElementById('elec-rate')?.value) || 0.16;
    const days = parseFloat(document.getElementById('elec-days')?.value) || 30;

    const dailyKwh = (watts * hours) / 1000;
    const cycleKwh = dailyKwh * days;
    const cycleCost = cycleKwh * rate;
    const annualKwh = dailyKwh * 365;
    const annualCost = annualKwh * rate;

    const elCost = document.getElementById('res-elec-cost');
    if (elCost) elCost.textContent = `${cycleCost.toFixed(2)} / ${days} days`;
    const elKwh = document.getElementById('res-elec-kwh');
    if (elKwh) elKwh.textContent = `${cycleKwh.toFixed(1)} kWh per period`;
    const elAnnual = document.getElementById('res-elec-annual');
    if (elAnnual) elAnnual.textContent = `${annualCost.toFixed(2)} / year (${annualKwh.toFixed(0)} kWh)`;
    const elDaily = document.getElementById('res-elec-daily');
    if (elDaily) elDaily.textContent = `${(dailyKwh * rate).toFixed(2)} / day (${dailyKwh.toFixed(2)} kWh)`;

    const banner = document.getElementById('elec-banner');
    if (banner) {
      banner.innerHTML = `<strong>Appliance Power:</strong> ${watts}W running ${hours}h/day @ ${rate}/kWh costs <strong>${cycleCost.toFixed(2)}/month</strong> (${annualCost.toFixed(2)}/yr).`;
    }
  }
,

  calcWorkHours() {
    const start = document.getElementById('work-start')?.value || '09:00';
    const end = document.getElementById('work-end')?.value || '17:30';
    const breakMins = parseFloat(document.getElementById('work-break')?.value) || 30;
    const hourlyRate = parseFloat(document.getElementById('work-rate')?.value) || 25;
    const otMultiplier = parseFloat(document.getElementById('work-ot-mult')?.value) || 1.5;

    const [sh, sm] = start.split(':').map(Number);
    const [eh, em] = end.split(':').map(Number);

    let startTotalMins = sh * 60 + sm;
    let endTotalMins = eh * 60 + em;

    if (endTotalMins < startTotalMins) {
      endTotalMins += 24 * 60; // Overnight shift
    }

    const totalWorkedMins = Math.max(0, endTotalMins - startTotalMins - breakMins);
    const totalHours = totalWorkedMins / 60;

    // Regular vs Overtime (standard 8-hour workday threshold)
    const regularHours = Math.min(8, totalHours);
    const overtimeHours = Math.max(0, totalHours - 8);

    const regularPay = regularHours * hourlyRate;
    const overtimePay = overtimeHours * (hourlyRate * otMultiplier);
    const grossPay = regularPay + overtimePay;

    // Update UI
    const resHours = document.getElementById('res-work-hours');
    const resRegPay = document.getElementById('res-work-regpay');
    const resOtPay = document.getElementById('res-work-otpay');
    const resGross = document.getElementById('res-work-grosspay');

    if (resHours) resHours.textContent = `${totalHours.toFixed(2)} hrs`;
    if (resRegPay) resRegPay.textContent = `$${regularPay.toFixed(2)}`;
    if (resOtPay) resOtPay.textContent = `$${overtimePay.toFixed(2)} (${overtimeHours.toFixed(2)} hrs OT)`;
    if (resGross) resGross.textContent = `$${grossPay.toFixed(2)}`;
  },

  // =========================================================================
  // 35. IP Subnet Calculator
  // =========================================================================
  calcSubnet() {
    const ipStr = (document.getElementById('subnet-ip')?.value || '192.168.1.150').trim();
    const cidr = parseInt(document.getElementById('subnet-cidr')?.value || '24', 10);

    const parts = ipStr.split('.').map(Number);
    const validIp = parts.length === 4 && parts.every(p => !isNaN(p) && p >= 0 && p <= 255);

    if (!validIp || isNaN(cidr) || cidr < 1 || cidr > 32) {
      const errEl = document.getElementById('subnet-error');
      if (errEl) errEl.style.display = 'block';
      return;
    }
    const errEl = document.getElementById('subnet-error');
    if (errEl) errEl.style.display = 'none';

    const ipInt = (parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3];
    const maskInt = cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0;
    const wildInt = (~maskInt) >>> 0;
    const netInt = (ipInt & maskInt) >>> 0;
    const bcastInt = (netInt | wildInt) >>> 0;

    const toIp = intVal => [
      (intVal >>> 24) & 255,
      (intVal >>> 16) & 255,
      (intVal >>> 8) & 255,
      intVal & 255
    ].join('.');

    const toBin = intVal => [
      ((intVal >>> 24) & 255).toString(2).padStart(8, '0'),
      ((intVal >>> 16) & 255).toString(2).padStart(8, '0'),
      ((intVal >>> 8) & 255).toString(2).padStart(8, '0'),
      (intVal & 255).toString(2).padStart(8, '0')
    ].join('.');

    const totalHosts = Math.pow(2, 32 - cidr);
    const usableHosts = cidr >= 31 ? (cidr === 31 ? 2 : 1) : Math.max(0, totalHosts - 2);
    const firstHost = cidr >= 31 ? toIp(netInt) : toIp(netInt + 1);
    const lastHost = cidr >= 31 ? toIp(bcastInt) : toIp(bcastInt - 1);

    let ipClass = 'Class A';
    if (parts[0] >= 128 && parts[0] <= 191) ipClass = 'Class B';
    else if (parts[0] >= 192 && parts[0] <= 223) ipClass = 'Class C';
    else if (parts[0] >= 224 && parts[0] <= 239) ipClass = 'Class D (Multicast)';
    else if (parts[0] >= 240) ipClass = 'Class E (Experimental)';

    const isPrivate = (parts[0] === 10) ||
      (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) ||
      (parts[0] === 192 && parts[1] === 168);

    const netmaskStr = toIp(maskInt);
    const wildcardStr = toIp(wildInt);
    const networkStr = toIp(netInt);
    const broadcastStr = toIp(bcastInt);

    const setT = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    setT('subnet-res-ip', ipStr + ' /' + cidr);
    setT('subnet-res-mask', netmaskStr);
    setT('subnet-res-wildcard', wildcardStr);
    setT('subnet-res-network', networkStr + ' /' + cidr);
    setT('subnet-res-broadcast', broadcastStr);
    setT('subnet-res-range', firstHost + ' - ' + lastHost);
    setT('subnet-res-usable', usableHosts.toLocaleString());
    setT('subnet-res-total', totalHosts.toLocaleString());
    setT('subnet-res-class', ipClass + (isPrivate ? ' (Private RFC 1918)' : ' (Public)'));
    setT('subnet-res-binary', toBin(ipInt));
    setT('subnet-res-maskbin', toBin(maskInt));
  },

  // =========================================================================
  // 36. Password Generator
  // =========================================================================
  calcPassword() {
    const length = parseInt(document.getElementById('pwd-length')?.value || '16', 10);
    const incUpper = document.getElementById('pwd-upper')?.checked !== false;
    const incLower = document.getElementById('pwd-lower')?.checked !== false;
    const incNum = document.getElementById('pwd-nums')?.checked !== false;
    const incSym = document.getElementById('pwd-syms')?.checked !== false;
    const excSimilar = document.getElementById('pwd-no-similar')?.checked || false;

    let upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let lower = 'abcdefghijklmnopqrstuvwxyz';
    let numbers = '0123456789';
    let symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (excSimilar) {
      upper = upper.replace(/[IO]/g, '');
      lower = lower.replace(/[lo]/g, '');
      numbers = numbers.replace(/[01]/g, '');
      symbols = symbols.replace(/[|]/g, '');
    }

    let pool = '';
    let poolSize = 0;
    const requiredChars = [];

    if (incUpper) { pool += upper; poolSize += 26; requiredChars.push(upper[Math.floor(Math.random() * upper.length)]); }
    if (incLower) { pool += lower; poolSize += 26; requiredChars.push(lower[Math.floor(Math.random() * lower.length)]); }
    if (incNum) { pool += numbers; poolSize += 10; requiredChars.push(numbers[Math.floor(Math.random() * numbers.length)]); }
    if (incSym) { pool += symbols; poolSize += 30; requiredChars.push(symbols[Math.floor(Math.random() * symbols.length)]); }

    if (pool.length === 0) {
      pool = lower;
      poolSize = 26;
      requiredChars.push(lower[0]);
    }

    let password = [...requiredChars];
    const remaining = Math.max(0, length - password.length);
    for (let i = 0; i < remaining; i++) {
      const randIdx = Math.floor(Math.random() * pool.length);
      password.push(pool[randIdx]);
    }

    // Shuffle characters
    for (let i = password.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [password[i], password[j]] = [password[j], password[i]];
    }

    const pwdStr = password.join('');
    const entropy = Math.round(length * Math.log2(poolSize || 26) * 10) / 10;

    let strength = 'Weak';
    let strengthColor = '#ef4444';
    let strengthWidth = '25%';
    let crackTime = 'A few seconds';

    if (entropy >= 80) {
      strength = 'Very Strong (Military Grade)';
      strengthColor = '#10b981';
      strengthWidth = '100%';
      crackTime = 'Trillions of Centuries';
    } else if (entropy >= 60) {
      strength = 'Strong';
      strengthColor = '#06b6d4';
      strengthWidth = '75%';
      crackTime = 'Millions of Years';
    } else if (entropy >= 40) {
      strength = 'Moderate / Fair';
      strengthColor = '#f59e0b';
      strengthWidth = '50%';
      crackTime = 'Several Months';
    }

    const outEl = document.getElementById('pwd-output');
    if (outEl) outEl.value = pwdStr;
    const lenVal = document.getElementById('pwd-length-val');
    if (lenVal) lenVal.textContent = length;
    const entEl = document.getElementById('pwd-entropy');
    if (entEl) entEl.textContent = entropy + ' bits';
    const strBar = document.getElementById('pwd-strength-bar');
    if (strBar) {
      strBar.style.width = strengthWidth;
      strBar.style.backgroundColor = strengthColor;
    }
    const strLabel = document.getElementById('pwd-strength-label');
    if (strLabel) {
      strLabel.textContent = strength;
      strLabel.style.color = strengthColor;
    }
    const crackEl = document.getElementById('pwd-crack-time');
    if (crackEl) crackEl.textContent = crackTime;
  },

  copyPassword() {
    const outEl = document.getElementById('pwd-output');
    if (!outEl || !outEl.value) return;
    navigator.clipboard?.writeText(outEl.value).then(() => {
      const btn = document.getElementById('pwd-copy-btn');
      if (btn) {
        const orig = btn.textContent;
        btn.textContent = '✓ Copied!';
        setTimeout(() => { btn.textContent = orig; }, 2000);
      }
    });
  },

  // =========================================================================
  // 37. Bandwidth Calculator
  // =========================================================================
  calcBandwidth() {
    const size = parseFloat(document.getElementById('bw-size')?.value || '50');
    const sizeUnit = document.getElementById('bw-size-unit')?.value || 'GB';
    const speed = parseFloat(document.getElementById('bw-speed')?.value || '100');
    const speedUnit = document.getElementById('bw-speed-unit')?.value || 'Mbps';
    const overhead = parseFloat(document.getElementById('bw-overhead')?.value || '0.10');

    if (isNaN(size) || size <= 0 || isNaN(speed) || speed <= 0) return;

    // Convert file size to Bytes
    let bytes = size;
    if (sizeUnit === 'KB') bytes = size * 1024;
    else if (sizeUnit === 'MB') bytes = size * Math.pow(1024, 2);
    else if (sizeUnit === 'GB') bytes = size * Math.pow(1024, 3);
    else if (sizeUnit === 'TB') bytes = size * Math.pow(1024, 4);

    // Convert speed to bits per second
    let bps = speed;
    if (speedUnit === 'Kbps') bps = speed * 1000;
    else if (speedUnit === 'Mbps') bps = speed * 1000000;
    else if (speedUnit === 'Gbps') bps = speed * 1000000000;
    else if (speedUnit === 'MB/s') bps = speed * 8 * 1048576;

    // Effective bits to transfer factoring protocol overhead
    const totalBits = bytes * 8 * (1 + overhead);
    const totalSecs = totalBits / bps;

    const days = Math.floor(totalSecs / 86400);
    const hours = Math.floor((totalSecs % 86400) / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = Math.round(totalSecs % 60);

    const parts = [];
    if (days > 0) parts.push(days + 'd');
    if (hours > 0 || days > 0) parts.push(hours + 'h');
    if (mins > 0 || hours > 0 || days > 0) parts.push(mins + 'm');
    parts.push(secs + 's');

    const durationStr = parts.join(' ');
    const rateMBs = ((bps / 8) / 1048576 * (1 - overhead)).toFixed(2);
    const rateGBh = (parseFloat(rateMBs) * 3600 / 1024).toFixed(2);

    const setT = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    setT('bw-res-time', durationStr);
    setT('bw-res-exact-sec', Math.round(totalSecs).toLocaleString() + ' seconds');
    setT('bw-res-rate-mbs', rateMBs + ' MB/s');
    setT('bw-res-rate-gbh', rateGBh + ' GB/hour');
    setT('bw-res-size-raw', (bytes / 1048576).toFixed(1) + ' MB (' + (bytes / 1073741824).toFixed(2) + ' GB)');
  },

  // =========================================================================
  // 38. Base64 Encode / Decode
  // =========================================================================
  calcBase64(mode) {
    const currentMode = mode || document.querySelector('input[name="b64-mode"]:checked')?.value || 'encode';
    const input = document.getElementById('b64-input')?.value || '';
    const outEl = document.getElementById('b64-output');
    const errEl = document.getElementById('b64-error');
    if (errEl) errEl.style.display = 'none';

    if (!input) {
      if (outEl) outEl.value = '';
      const stats = document.getElementById('b64-stats');
      if (stats) stats.textContent = '0 characters | 0 bytes';
      return;
    }

    try {
      let result = '';
      if (currentMode === 'encode') {
        result = btoa(unescape(encodeURIComponent(input)));
      } else {
        result = decodeURIComponent(escape(atob(input.trim())));
      }
      if (outEl) outEl.value = result;
      const stats = document.getElementById('b64-stats');
      if (stats) {
        const inBytes = new Blob([input]).size;
        const outBytes = new Blob([result]).size;
        stats.textContent = 'Input: ' + inBytes + ' bytes | Output: ' + outBytes + ' bytes (' + result.length + ' chars)';
      }
    } catch (e) {
      if (errEl) {
        errEl.textContent = 'Invalid Base64 input string for decoding: ' + e.message;
        errEl.style.display = 'block';
      }
    }
  },

  copyBase64() {
    const outEl = document.getElementById('b64-output');
    if (!outEl || !outEl.value) return;
    navigator.clipboard?.writeText(outEl.value).then(() => {
      const btn = document.getElementById('b64-copy-btn');
      if (btn) {
        const orig = btn.textContent;
        btn.textContent = '✓ Copied!';
        setTimeout(() => { btn.textContent = orig; }, 2000);
      }
    });
  },

  // =========================================================================
  // 39. URL Encode / Decode
  // =========================================================================
  calcUrlEncode(mode) {
    const currentMode = mode || document.querySelector('input[name="url-mode"]:checked')?.value || 'encode';
    const input = document.getElementById('url-input')?.value || '';
    const isStrict = document.getElementById('url-strict-component')?.checked !== false;
    const outEl = document.getElementById('url-output');
    const errEl = document.getElementById('url-error');
    if (errEl) errEl.style.display = 'none';

    if (!input) {
      if (outEl) outEl.value = '';
      const stats = document.getElementById('url-stats');
      if (stats) stats.textContent = '0 characters';
      return;
    }

    try {
      let result = '';
      if (currentMode === 'encode') {
        result = isStrict ? encodeURIComponent(input) : encodeURI(input);
      } else {
        result = isStrict ? decodeURIComponent(input) : decodeURI(input);
      }
      if (outEl) outEl.value = result;
      const stats = document.getElementById('url-stats');
      if (stats) stats.textContent = result.length + ' characters';

      // Parse Query Params if contains ? or =
      const paramsList = document.getElementById('url-params-list');
      if (paramsList) {
        paramsList.innerHTML = '';
        const searchPart = input.includes('?') ? input.split('?')[1] : (input.includes('=') ? input : '');
        if (searchPart) {
          const params = new URLSearchParams(searchPart);
          let count = 0;
          params.forEach((val, key) => {
            count++;
            const row = document.createElement('div');
            row.style.display = 'flex';
            row.style.justifyContent = 'space-between';
            row.style.padding = '4px 8px';
            row.style.background = 'rgba(255,255,255,0.04)';
            row.style.borderRadius = '4px';
            row.style.marginBottom = '4px';
            row.style.fontSize = '0.82rem';
            row.innerHTML = '<span style="color:#38bdf8; font-weight:600; font-family:monospace;">' + key + '</span><span style="color:#e2e8f0; font-family:monospace;">' + val + '</span>';
            paramsList.appendChild(row);
          });
          const container = document.getElementById('url-params-container');
          if (container) container.style.display = count > 0 ? 'block' : 'none';
        } else {
          const container = document.getElementById('url-params-container');
          if (container) container.style.display = 'none';
        }
      }
    } catch (e) {
      if (errEl) {
        errEl.textContent = 'URI Malformed error: ' + e.message;
        errEl.style.display = 'block';
      }
    }
  },

  copyUrlOutput() {
    const outEl = document.getElementById('url-output');
    if (!outEl || !outEl.value) return;
    navigator.clipboard?.writeText(outEl.value).then(() => {
      const btn = document.getElementById('url-copy-btn');
      if (btn) {
        const orig = btn.textContent;
        btn.textContent = '✓ Copied!';
        setTimeout(() => { btn.textContent = orig; }, 2000);
      }
    });
  },

  // =========================================================================
  // 40. Grade Calculator
  // =========================================================================
  calcGrade() {
    const currentGrade = parseFloat(document.getElementById('grade-current')?.value || '85');
    const desiredGrade = parseFloat(document.getElementById('grade-target')?.value || '90');
    const finalWeight = parseFloat(document.getElementById('grade-weight')?.value || '20');

    if (isNaN(currentGrade) || isNaN(desiredGrade) || isNaN(finalWeight) || finalWeight <= 0 || finalWeight > 100) return;

    const wFinal = finalWeight / 100;
    const wCurrent = 1 - wFinal;
    const finalNeeded = (desiredGrade - (currentGrade * wCurrent)) / wFinal;
    const roundedFinal = Math.round(finalNeeded * 10) / 10;

    const setT = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    setT('grade-res-needed', roundedFinal + '%');

    const banner = document.getElementById('grade-banner');
    if (banner) {
      if (roundedFinal <= 0) {
        banner.innerHTML = '<strong style="color:#10b981;">🎉 Guaranteed Goal:</strong> You already have enough points to earn ' + desiredGrade + '% even with a 0% on the final!';
      } else if (roundedFinal <= 100) {
        banner.innerHTML = '<strong style="color:#38bdf8;">🎯 Target Achievable:</strong> You need to score <strong>' + roundedFinal + '%</strong> on your final exam (' + finalWeight + '% of grade) to secure a ' + desiredGrade + '% in the course.';
      } else {
        banner.innerHTML = '<strong style="color:#ef4444;">⚠️ Extra Credit Needed:</strong> You need <strong>' + roundedFinal + '%</strong> on the final exam. You will need extra credit to reach your ' + desiredGrade + '% target.';
      }
    }

    // Letter grade equivalence
    let letter = 'A';
    if (desiredGrade >= 93) letter = 'A';
    else if (desiredGrade >= 90) letter = 'A-';
    else if (desiredGrade >= 87) letter = 'B+';
    else if (desiredGrade >= 83) letter = 'B';
    else if (desiredGrade >= 80) letter = 'B-';
    else if (desiredGrade >= 77) letter = 'C+';
    else if (desiredGrade >= 70) letter = 'C';
    else letter = 'Passing';
    setT('grade-res-letter', letter);
  },

  // =========================================================================
  // 41. Bra Size Calculator
  // =========================================================================
  calcBraSize() {
    const under = parseFloat(document.getElementById('bra-under')?.value || '32');
    const bust = parseFloat(document.getElementById('bra-bust')?.value || '36');
    const unit = document.getElementById('bra-unit')?.value || 'in';

    if (isNaN(under) || isNaN(bust) || under <= 0 || bust <= under) return;

    let underInches = under;
    let bustInches = bust;
    if (unit === 'cm') {
      underInches = under / 2.54;
      bustInches = bust / 2.54;
    }

    // Standard snug measurement + rounding
    let band = Math.round(underInches);
    if (band % 2 !== 0) band += 1; // Round to nearest even band

    const diff = Math.round(bustInches - band);
    const cupLetters = ['AA', 'A', 'B', 'C', 'D', 'DD / E', 'DDD / F', 'G', 'H', 'I', 'J', 'K'];
    const cupIdx = Math.max(0, Math.min(cupLetters.length - 1, diff));
    const cup = cupLetters[cupIdx];

    const usUkSize = band + cup;
    const euBand = Math.round(band * 2.54 / 5) * 5;
    const euSize = euBand + cup;

    // Sister sizes: down band + up cup, up band + down cup
    const sisterDown = (band - 2) + (cupLetters[cupIdx + 1] || cup);
    const sisterUp = (band + 2) + (cupLetters[Math.max(0, cupIdx - 1)] || cup);

    const setT = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    setT('bra-res-usuk', usUkSize);
    setT('bra-res-eu', euSize);
    setT('bra-res-band', band + ' in (' + Math.round(band * 2.54) + ' cm)');
    setT('bra-res-cup', cup + ' (Diff: ' + diff + '")');
    setT('bra-res-sister-down', sisterDown + ' (Tighter band)');
    setT('bra-res-sister-up', sisterUp + ' (Looser band)');
  },

  // =========================================================================
  // 42. Shoe Size Conversion
  // =========================================================================
  calcShoeSize() {
    const size = parseFloat(document.getElementById('shoe-val')?.value || '9');
    const gender = document.getElementById('shoe-gender')?.value || 'men';
    const fromSys = document.getElementById('shoe-from-sys')?.value || 'us';

    if (isNaN(size) || size <= 0) return;

    let cm = 0;
    if (gender === 'men') {
      if (fromSys === 'us') cm = (size + 24) * 0.94;
      else if (fromSys === 'uk') cm = (size + 24.5) * 0.94;
      else if (fromSys === 'eu') cm = (size - 1.5) * 0.667;
      else cm = size;
    } else if (gender === 'women') {
      if (fromSys === 'us') cm = (size + 22.5) * 0.94;
      else if (fromSys === 'uk') cm = (size + 24) * 0.94;
      else if (fromSys === 'eu') cm = (size - 2) * 0.667;
      else cm = size;
    } else { // kids
      if (fromSys === 'us') cm = (size + 11.5) * 0.94;
      else if (fromSys === 'uk') cm = (size + 11) * 0.94;
      else if (fromSys === 'eu') cm = size * 0.667;
      else cm = size;
    }

    // Now calculate all standard values
    let us = 0, uk = 0, eu = 0, inches = cm / 2.54;
    if (gender === 'men') {
      us = Math.round(((cm / 0.94) - 24) * 2) / 2;
      uk = Math.round(((cm / 0.94) - 24.5) * 2) / 2;
      eu = Math.round(((cm / 0.667) + 1.5) * 2) / 2;
    } else if (gender === 'women') {
      us = Math.round(((cm / 0.94) - 22.5) * 2) / 2;
      uk = Math.round(((cm / 0.94) - 24) * 2) / 2;
      eu = Math.round(((cm / 0.667) + 2) * 2) / 2;
    } else {
      us = Math.round(((cm / 0.94) - 11.5) * 2) / 2;
      uk = Math.round(((cm / 0.94) - 11) * 2) / 2;
      eu = Math.round((cm / 0.667) * 2) / 2;
    }

    const setT = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    setT('shoe-res-us', us.toString());
    setT('shoe-res-uk', uk.toString());
    setT('shoe-res-eu', eu.toString());
    setT('shoe-res-cm', (Math.round(cm * 10) / 10) + ' cm');
    setT('shoe-res-in', (Math.round(inches * 10) / 10) + ' in');
  },

  // =========================================================================
  // 43. Tip & Bill Split Calculator (Everyday Utility)
  // =========================================================================
  calcTip() {
    const bill = parseFloat(document.getElementById('tip-bill')?.value || '100');
    const tipPct = parseFloat(document.getElementById('tip-pct')?.value || '20');
    const people = parseInt(document.getElementById('tip-people')?.value || '2', 10);
    const roundUp = document.getElementById('tip-round-up')?.checked || false;

    if (isNaN(bill) || bill <= 0 || isNaN(tipPct) || tipPct < 0 || isNaN(people) || people < 1) return;

    let tipAmount = bill * (tipPct / 100);
    let total = bill + tipAmount;

    if (roundUp) {
      total = Math.ceil(total);
      tipAmount = total - bill;
    }

    const tipPerPerson = tipAmount / people;
    const totalPerPerson = total / people;

    const setT = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    setT('tip-res-tip-total', '$' + tipAmount.toFixed(2));
    setT('tip-res-bill-total', '$' + total.toFixed(2));
    setT('tip-res-tip-person', '$' + tipPerPerson.toFixed(2));
    setT('tip-res-total-person', '$' + totalPerPerson.toFixed(2));
    setT('tip-res-eff-pct', ((tipAmount / bill) * 100).toFixed(1) + '%');
  },

  setTipPreset(pct) {
    const el = document.getElementById('tip-pct');
    if (el) {
      el.value = pct;
      this.calcTip();
    }
  },

  // =========================================================================
  // 44. Golf Handicap Calculator
  // =========================================================================
  calcGolfHandicap() {
    const score = parseFloat(document.getElementById('golf-score')?.value || '85');
    const rating = parseFloat(document.getElementById('golf-rating')?.value || '71.5');
    const slope = parseFloat(document.getElementById('golf-slope')?.value || '125');
    const pcc = parseFloat(document.getElementById('golf-pcc')?.value || '0');

    if (isNaN(score) || isNaN(rating) || isNaN(slope) || slope < 55 || slope > 155) return;

    // USGA / WHS Handicap Differential Formula:
    // Differential = (113 / Slope Rating) * (Adjusted Gross Score - Course Rating - PCC)
    const diff = (113 / slope) * (score - rating - pcc);
    const roundedDiff = Math.round(diff * 10) / 10;

    // Estimated Playing Handicap for a scratch course
    const playingHcp = Math.round(diff * (slope / 113) + (rating - 72));

    const setT = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    setT('golf-res-diff', (roundedDiff >= 0 ? '+' : '') + roundedDiff.toFixed(1));
    setT('golf-res-playing', playingHcp >= 0 ? playingHcp.toString() : '0');
    setT('golf-res-slope-factor', (113 / slope).toFixed(3));
    setT('golf-res-net-score', (score - playingHcp).toString());

    const note = document.getElementById('golf-whs-note');
    if (note) {
      note.textContent = 'Based on 2024 WHS standard: (113 / ' + slope + ') × (' + score + ' - ' + rating + ') = ' + roundedDiff.toFixed(1) + ' differential.';
    }
  },

  // =========================================================================
  // 45. Sleep Calculator
  // =========================================================================
  calcSleep() {
    const wakeHour = parseInt(document.getElementById('sleep-hour')?.value || '7', 10);
    const wakeMin = parseInt(document.getElementById('sleep-min')?.value || '0', 10);
    const wakeAmpm = document.getElementById('sleep-ampm')?.value || 'AM';
    const latency = parseInt(document.getElementById('sleep-latency')?.value || '15', 10);

    let h24 = wakeHour % 12;
    if (wakeAmpm === 'PM') h24 += 12;

    const wakeMinutesFromMidnight = (h24 * 60) + wakeMin;

    // 90 minute sleep cycles
    const cycles = [
      { num: 6, hrs: 9.0, label: 'Optimal Sleep (6 Cycles)', quality: 'Excellent - Full Restoration' },
      { num: 5, hrs: 7.5, label: 'Recommended (5 Cycles)', quality: 'Very Good - Normal Adult Standard' },
      { num: 4, hrs: 6.0, label: 'Sufficient (4 Cycles)', quality: 'Acceptable - Functional Day' },
      { num: 3, hrs: 4.5, label: 'Minimum (3 Cycles)', quality: 'Short Sleep - May Feel Groggy' }
    ];

    const resultsContainer = document.getElementById('sleep-cycles-cards');
    if (resultsContainer) {
      resultsContainer.innerHTML = '';
      cycles.forEach(c => {
        let sleepMin = wakeMinutesFromMidnight - (c.num * 90) - latency;
        while (sleepMin < 0) sleepMin += 1440;
        sleepMin = sleepMin % 1440;

        let bHour = Math.floor(sleepMin / 60);
        const bMin = sleepMin % 60;
        const bAmpm = bHour >= 12 ? 'PM' : 'AM';
        bHour = bHour % 12;
        if (bHour === 0) bHour = 12;

        const timeStr = bHour + ':' + bMin.toString().padStart(2, '0') + ' ' + bAmpm;

        const card = document.createElement('div');
        card.style.background = c.num === 5 ? 'rgba(56, 189, 248, 0.12)' : 'rgba(255, 255, 255, 0.04)';
        card.style.border = c.num === 5 ? '1px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.08)';
        card.style.borderRadius = '8px';
        card.style.padding = '12px 16px';
        card.style.marginBottom = '8px';
        card.style.display = 'flex';
        card.style.justifyContent = 'space-between';
        card.style.alignItems = 'center';

        card.innerHTML = '<div>' +
          '<div style="font-size:1.15rem; font-weight:700; color:' + (c.num === 5 ? '#38bdf8' : '#ffffff') + ';">' + timeStr + '</div>' +
          '<div style="font-size:0.8rem; color:#94a3b8; margin-top:2px;">' + c.label + ' (' + c.hrs + ' hrs sleep)</div>' +
          '</div>' +
          '<div style="text-align:right;">' +
          '<span style="font-size:0.75rem; font-weight:600; padding:3px 8px; border-radius:12px; background:' + (c.num >= 5 ? '#10b98133' : '#f59e0b33') + '; color:' + (c.num >= 5 ? '#34d399' : '#fbbf24') + ';">' + c.quality + '</span>' +
          '</div>';

        resultsContainer.appendChild(card);
      });
    }
  },

  // =========================================================================
  // 46. Wind Chill Calculator (NWS 2001 Formula)
  // =========================================================================
  setWindChillPreset(t, s, ut, us) {
    const elT = document.getElementById('wc-temp');
    const elUt = document.getElementById('wc-unit-temp');
    const elS = document.getElementById('wc-speed');
    const elUs = document.getElementById('wc-unit-speed');
    if (elT) elT.value = t;
    if (elUt) elUt.value = ut;
    if (elS) elS.value = s;
    if (elUs) elUs.value = us;
    this.calcWindChill();
  },

  calcWindChill() {
    const tempIn = parseFloat(document.getElementById('wc-temp')?.value || '25');
    const unitT = document.getElementById('wc-unit-temp')?.value || 'F';
    const speedIn = parseFloat(document.getElementById('wc-speed')?.value || '20');
    const unitS = document.getElementById('wc-unit-speed')?.value || 'mph';

    if (isNaN(tempIn) || isNaN(speedIn) || speedIn < 0) return;

    let tempF = tempIn;
    if (unitT === 'C') tempF = (tempIn * 9 / 5) + 32;

    let speedMph = speedIn;
    if (unitS === 'kmh') speedMph = speedIn * 0.621371;
    else if (unitS === 'knots') speedMph = speedIn * 1.15078;
    else if (unitS === 'ms') speedMph = speedIn * 2.23694;

    // NWS Official Wind Chill Equation: WCT = 35.74 + 0.6215*T - 35.75*(V^0.16) + 0.4275*T*(V^0.16)
    let wcF = tempF;
    if (tempF <= 50 && speedMph >= 3) {
      wcF = 35.74 + (0.6215 * tempF) - (35.75 * Math.pow(speedMph, 0.16)) + (0.4275 * tempF * Math.pow(speedMph, 0.16));
    }
    const wcC = (wcF - 32) * 5 / 9;
    const diffF = wcF - tempF;

    let risk = 'Low Risk (Comfortable with winter coat & layers)';
    let riskColor = '#10b981';
    let fbTime = '> 30 minutes';
    if (wcF <= -48) {
      risk = 'EXTREME DANGER: Frostbite imminent!';
      riskColor = '#ef4444';
      fbTime = 'Under 5 minutes';
    } else if (wcF <= -28) {
      risk = 'HIGH RISK: Frostbite likely in exposed skin';
      riskColor = '#ea580c';
      fbTime = 'Approx. 10 minutes';
    } else if (wcF <= -18) {
      risk = 'MODERATE RISK: Frostbite possible with prolonged exposure';
      riskColor = '#f59e0b';
      fbTime = 'Approx. 30 minutes';
    }

    // Beaufort Scale descriptor
    let beaufort = 'Gentle Breeze';
    if (speedMph >= 47) beaufort = 'Violent Storm / Gale';
    else if (speedMph >= 32) beaufort = 'Near Gale / Strong Wind';
    else if (speedMph >= 19) beaufort = 'Fresh / Strong Breeze';
    else if (speedMph >= 8) beaufort = 'Moderate Breeze';
    else if (speedMph < 3) beaufort = 'Light Air / Calm';

    const setT = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    setT('wc-res-primary', (Math.round(wcF * 10) / 10).toFixed(1) + ' °F / ' + (Math.round(wcC * 10) / 10).toFixed(1) + ' °C');
    setT('wc-res-subtext', diffF < -0.1 ? 'Feels ' + Math.abs(diffF).toFixed(1) + ' °F colder than ambient air' : 'Wind chill effect minimal at current speed/temperature');
    setT('wc-res-f', (Math.round(wcF * 10) / 10).toFixed(1) + ' °F');
    setT('wc-res-c', (Math.round(wcC * 10) / 10).toFixed(1) + ' °C');
    setT('wc-res-diff', (diffF > 0 ? '+' : '') + diffF.toFixed(1) + ' °F');
    setT('wc-res-beaufort', beaufort + ' (' + speedMph.toFixed(1) + ' mph)');
    setT('wc-res-frostbite-time', fbTime);

    const riskEl = document.getElementById('wc-res-risk');
    if (riskEl) {
      riskEl.textContent = risk;
      riskEl.style.color = riskColor;
    }
  },

  // =========================================================================
  // 47. Heat Index Calculator (NOAA / NWS Rothfusz Equation)
  // =========================================================================
  setHeatIndexPreset(t, rh, ut) {
    const elT = document.getElementById('hi-temp');
    const elUt = document.getElementById('hi-unit-temp');
    const elRh = document.getElementById('hi-rh');
    const elSlider = document.getElementById('hi-rh-slider');
    if (elT) elT.value = t;
    if (elUt) elUt.value = ut || 'F';
    if (elRh) elRh.value = rh;
    if (elSlider) elSlider.value = rh;
    this.calcHeatIndex();
  },

  syncHiSlider(val) {
    const elRh = document.getElementById('hi-rh');
    if (elRh) elRh.value = val;
    this.calcHeatIndex();
  },

  syncHiInput(val) {
    const elSlider = document.getElementById('hi-rh-slider');
    if (elSlider) elSlider.value = val;
    this.calcHeatIndex();
  },

  calcHeatIndex() {
    const tempIn = parseFloat(document.getElementById('hi-temp')?.value || '92');
    const unitT = document.getElementById('hi-unit-temp')?.value || 'F';
    const rh = parseFloat(document.getElementById('hi-rh')?.value || '65');

    if (isNaN(tempIn) || isNaN(rh) || rh < 0 || rh > 100) return;

    let tempF = tempIn;
    if (unitT === 'C') tempF = (tempIn * 9 / 5) + 32;

    // NOAA / NWS Simple Rothfusz Equation
    let hiF = 0.5 * (tempF + 61.0 + ((tempF - 68.0) * 1.2) + (rh * 0.094));
    if ((hiF + tempF) / 2 >= 80) {
      hiF = -42.379 + (2.04901523 * tempF) + (10.14333127 * rh) -
        (0.22475541 * tempF * rh) - (0.00683783 * tempF * tempF) -
        (0.05481717 * rh * rh) + (0.00122874 * tempF * tempF * rh) +
        (0.00085282 * tempF * rh * rh) - (0.00000199 * tempF * tempF * rh * rh);

      // Low RH adjustment
      if (rh < 13 && tempF >= 80 && tempF <= 112) {
        hiF += -((13 - rh) / 4) * Math.sqrt((17 - Math.abs(tempF - 95)) / 17);
      } else if (rh > 85 && tempF >= 80 && tempF <= 87) {
        hiF += ((rh - 85) / 10) * ((87 - tempF) / 5);
      }
    }
    const hiC = (hiF - 32) * 5 / 9;
    const diff = hiF - tempF;

    // Associated Dew Point via Magnus formula
    const tempC = (tempF - 32) * 5 / 9;
    const alpha = ((17.27 * tempC) / (237.7 + tempC)) + Math.log(rh / 100);
    const dpC = (237.7 * alpha) / (17.27 - alpha);
    const dpF = (dpC * 9 / 5) + 32;

    let danger = 'Normal / Safe: Fatigue unlikely';
    let dangerColor = '#10b981';
    let hydration = '16 - 20 oz/hour of cool water';
    if (hiF >= 130) {
      danger = 'EXTREME DANGER: Heat stroke highly likely!';
      dangerColor = '#dc2626';
      hydration = '32 - 40 oz/hour with electrolytes; avoid all outdoor exertion';
    } else if (hiF >= 105) {
      danger = 'DANGER: Heat cramps or heat exhaustion likely; heat stroke possible';
      dangerColor = '#ea580c';
      hydration = '28 - 32 oz/hour of electrolytes + water; take frequent shaded breaks';
    } else if (hiF >= 90) {
      danger = 'Extreme Caution: Sunstroke, muscle cramps & heat exhaustion possible';
      dangerColor = '#f59e0b';
      hydration = '24 - 28 oz/hour of water; moderate physical activity';
    } else if (hiF >= 80) {
      danger = 'Caution: Fatigue possible with prolonged physical exposure';
      dangerColor = '#eab308';
      hydration = '20 - 24 oz/hour of water';
    }

    const setT = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    setT('hi-res-primary', (Math.round(hiF * 10) / 10).toFixed(1) + ' °F / ' + (Math.round(hiC * 10) / 10).toFixed(1) + ' °C');
    setT('hi-res-f', (Math.round(hiF * 10) / 10).toFixed(1) + ' °F');
    setT('hi-res-c', (Math.round(hiC * 10) / 10).toFixed(1) + ' °C');
    setT('hi-res-diff', (diff >= 0 ? '+' : '') + (Math.round(diff * 10) / 10).toFixed(1) + ' °F');
    setT('hi-res-dew', (Math.round(dpF * 10) / 10).toFixed(1) + ' °F (' + (Math.round(dpC * 10) / 10).toFixed(1) + ' °C)');
    setT('hi-res-water', hydration);

    const dangerEl = document.getElementById('hi-res-danger');
    if (dangerEl) {
      dangerEl.textContent = danger;
      dangerEl.style.color = dangerColor;
    }
  },

  // =========================================================================
  // 48. Dew Point Calculator (Magnus-Tetens Formula)
  // =========================================================================
  setDewPointPreset(t, rh, ut) {
    const elT = document.getElementById('dp-temp');
    const elUt = document.getElementById('dp-unit-temp');
    const elRh = document.getElementById('dp-rh');
    if (elT) elT.value = t;
    if (elUt) elUt.value = ut || 'F';
    if (elRh) elRh.value = rh;
    this.calcDewPoint();
  },

  calcDewPoint() {
    const tempIn = parseFloat(document.getElementById('dp-temp')?.value || '75');
    const unitT = document.getElementById('dp-unit-temp')?.value || 'F';
    const rh = parseFloat(document.getElementById('dp-rh')?.value || '60');

    if (isNaN(tempIn) || isNaN(rh) || rh <= 0 || rh > 100) return;

    let tempC = tempIn;
    if (unitT === 'F') tempC = (tempIn - 32) * 5 / 9;

    // Magnus Formula for dew point: a = 17.27, b = 237.7
    const a = 17.27;
    const b = 237.7;
    const alpha = ((a * tempC) / (b + tempC)) + Math.log(rh / 100);
    const dpC = (b * alpha) / (a - alpha);
    const dpF = (dpC * 9 / 5) + 32;

    const tempF = (tempC * 9 / 5) + 32;
    const spreadF = tempF - dpF;

    // Actual vapor pressure in hPa
    const es = 6.112 * Math.exp((17.67 * tempC) / (tempC + 243.5));
    const e = es * (rh / 100);

    let comfort = 'Comfortable & Pleasant';
    let comfortColor = '#10b981';
    let comfortSub = 'Ideal outdoor air condition with low sweat-rate';
    if (dpF >= 75) {
      comfort = 'Severely Oppressive / Miserable';
      comfortColor = '#dc2626';
      comfortSub = 'Extreme tropical humidity; high perspiration impedance';
    } else if (dpF >= 70) {
      comfort = 'Very Humid & Muggy';
      comfortColor = '#ea580c';
      comfortSub = 'Noticeable physical discomfort; air feels heavy';
    } else if (dpF >= 65) {
      comfort = 'Humid & Sticky';
      comfortColor = '#f59e0b';
      comfortSub = 'Beginning to feel humid; noticeable stickiness';
    } else if (dpF >= 60) {
      comfort = 'Pleasant to Slightly Humid';
      comfortColor = '#38bdf8';
      comfortSub = 'Comfortable for most people; mild ambient moisture';
    } else if (dpF < 50) {
      comfort = 'Dry / Crisp Air';
      comfortColor = '#60a5fa';
      comfortSub = 'Pleasantly crisp; refreshing breathing conditions';
    }

    const fogRisk = spreadF <= 3 ? 'High Fog / Condensation Risk' : (spreadF <= 7 ? 'Moderate Risk' : 'Low / Clear');

    const setT = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    setT('dp-res-primary', (Math.round(dpF * 10) / 10).toFixed(1) + ' °F / ' + (Math.round(dpC * 10) / 10).toFixed(1) + ' °C');
    setT('dp-res-comfort-sub', comfortSub);
    setT('dp-res-f', (Math.round(dpF * 10) / 10).toFixed(1) + ' °F');
    setT('dp-res-c', (Math.round(dpC * 10) / 10).toFixed(1) + ' °C');
    setT('dp-res-spread', (Math.round(spreadF * 10) / 10).toFixed(1) + ' °F (' + (Math.round((tempC - dpC) * 10) / 10).toFixed(1) + ' °C)');
    setT('dp-res-vp', e.toFixed(1) + ' hPa / mbar');
    setT('dp-res-rh-val', rh.toFixed(0) + '%');
    setT('dp-res-fog', fogRisk);

    const comEl = document.getElementById('dp-res-comfort');
    if (comEl) {
      comEl.textContent = comfort;
      comEl.style.color = comfortColor;
    }
  },

  // =========================================================================
  // 49. Fuel Cost Calculator (Road Trip & Commute Expense)
  // =========================================================================
  setFuelCostPreset(dist, eff, price, pass, rt) {
    const elDist = document.getElementById('fc-distance');
    const elEff = document.getElementById('fc-efficiency');
    const elPrice = document.getElementById('fc-price');
    const elPass = document.getElementById('fc-passengers');
    const elRt = document.getElementById('fc-roundtrip');
    if (elDist) elDist.value = dist;
    if (elEff) elEff.value = eff;
    if (elPrice) elPrice.value = price;
    if (elPass) elPass.value = pass;
    if (elRt) elRt.checked = !!rt;
    this.calcFuelCost();
  },

  calcFuelCost() {
    const distanceIn = parseFloat(document.getElementById('fc-distance')?.value || '350');
    const unitDist = document.getElementById('fc-unit-dist')?.value || 'miles';
    const effIn = parseFloat(document.getElementById('fc-efficiency')?.value || '28');
    const unitEff = document.getElementById('fc-unit-eff')?.value || 'mpg-us';
    const priceIn = parseFloat(document.getElementById('fc-price')?.value || '3.65');
    const passengers = Math.max(1, parseInt(document.getElementById('fc-passengers')?.value || '2', 10));
    const roundTrip = document.getElementById('fc-roundtrip')?.checked || false;

    if (isNaN(distanceIn) || isNaN(effIn) || isNaN(priceIn) || distanceIn <= 0 || effIn <= 0) return;

    const totalDist = roundTrip ? distanceIn * 2 : distanceIn;

    // Convert everything to miles and US gallons for calculation
    let distMiles = totalDist;
    if (unitDist === 'km') distMiles = totalDist * 0.621371;

    let mpgUS = effIn;
    if (unitEff === 'mpg-imp') mpgUS = effIn / 1.20095;
    else if (unitEff === 'l100km') mpgUS = 235.215 / effIn;
    else if (unitEff === 'kml') mpgUS = effIn * 2.35215;

    const gallonsNeeded = distMiles / mpgUS;
    const litersNeeded = gallonsNeeded * 3.78541;

    // If unit price is per liter vs per gallon
    const isPerLiter = document.getElementById('fc-price-unit')?.value === 'liter';
    const totalCost = isPerLiter ? (litersNeeded * priceIn) : (gallonsNeeded * priceIn);
    const costPerPerson = totalCost / passengers;
    const costPerUnitDist = totalCost / totalDist;

    // Savings at +5 MPG
    const efficientGallons = distMiles / (mpgUS + 5);
    const savings = Math.max(0, (gallonsNeeded - efficientGallons) * (isPerLiter ? (priceIn * 3.78541) : priceIn));

    const setT = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    setT('fc-res-total', '$' + totalCost.toFixed(2));
    setT('fc-res-split', passengers > 1 ? '$' + costPerPerson.toFixed(2) + ' per person (' + passengers + ' passengers)' : 'Single driver (no carpool split)');
    setT('fc-res-fuel-vol', gallonsNeeded.toFixed(2) + ' gal / ' + litersNeeded.toFixed(1) + ' L');
    setT('fc-res-per-unit-dist', '$' + costPerUnitDist.toFixed(3) + ' / ' + (unitDist === 'km' ? 'km' : 'mile'));
    setT('fc-res-oneway-dist', distanceIn.toLocaleString() + ' ' + unitDist + (roundTrip ? ' (Roundtrip: ' + totalDist.toLocaleString() + ' ' + unitDist + ')' : ''));
    setT('fc-res-savings', 'Save $' + savings.toFixed(2) + ' if fuel economy improves by 5 MPG');
  },

  // =========================================================================
  // 50. Gas Mileage Calculator (MPG & L/100km Benchmark)
  // =========================================================================
  setGasMileageMode(mode) {
    const odoWrap = document.getElementById('gm-odo-inputs');
    const directWrap = document.getElementById('gm-direct-inputs');
    if (mode === 'odo') {
      if (odoWrap) odoWrap.style.display = 'grid';
      if (directWrap) directWrap.style.display = 'none';
    } else {
      if (odoWrap) odoWrap.style.display = 'none';
      if (directWrap) directWrap.style.display = 'block';
    }
    this.calcGasMileage();
  },

  calcGasMileage() {
    let distance = parseFloat(document.getElementById('gm-dist')?.value || '360');
    const odoWrap = document.getElementById('gm-odo-inputs');
    if (odoWrap && odoWrap.style.display !== 'none') {
      const odoStart = parseFloat(document.getElementById('gm-odo-start')?.value || '45200');
      const odoEnd = parseFloat(document.getElementById('gm-odo-end')?.value || '45560');
      if (!isNaN(odoStart) && !isNaN(odoEnd) && odoEnd > odoStart) {
        distance = odoEnd - odoStart;
        const distEl = document.getElementById('gm-dist');
        if (distEl) distEl.value = distance;
      }
    }

    const unitDist = document.getElementById('gm-unit-dist')?.value || 'miles';
    const fuelVal = parseFloat(document.getElementById('gm-fuel')?.value || '12.4');
    const unitFuel = document.getElementById('gm-unit-fuel')?.value || 'gal-us';
    const gasPrice = parseFloat(document.getElementById('gm-price')?.value || '3.75');

    if (isNaN(distance) || isNaN(fuelVal) || distance <= 0 || fuelVal <= 0) return;

    let distMiles = distance;
    if (unitDist === 'km') distMiles = distance * 0.621371;

    let gallonsUS = fuelVal;
    if (unitFuel === 'gal-imp') gallonsUS = fuelVal * 1.20095;
    else if (unitFuel === 'liters') gallonsUS = fuelVal / 3.78541;

    const mpgUS = distMiles / gallonsUS;
    const mpgUK = distMiles / (gallonsUS / 1.20095);
    const l100km = 235.215 / mpgUS;
    const kml = (distMiles * 1.60934) / (gallonsUS * 3.78541);

    const costPerMile = !isNaN(gasPrice) && gasPrice > 0 ? (gallonsUS * gasPrice) / distMiles : null;
    const costPer100 = costPerMile ? costPerMile * 100 : null;
    const annualFuel = costPerMile ? costPerMile * 15000 : null;

    // US EPA Average comparison (~25.4 MPG)
    const diffPct = ((mpgUS - 25.4) / 25.4) * 100;
    let rating = 'Average (~25 MPG fleet benchmark)';
    let ratingColor = '#38bdf8';
    if (mpgUS >= 45) { rating = 'Outstanding Hybrid / Eco Grade (+80%)'; ratingColor = '#10b981'; }
    else if (mpgUS >= 32) { rating = 'Excellent High-Efficiency (+30%)'; ratingColor = '#34d399'; }
    else if (mpgUS >= 26) { rating = 'Above Average Economy (+' + diffPct.toFixed(0) + '%)'; ratingColor = '#60a5fa'; }
    else if (mpgUS < 18) { rating = 'High Fuel Consumption / Heavy Duty'; ratingColor = '#f59e0b'; }

    const setT = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    setT('gm-res-mpg-us', mpgUS.toFixed(2) + ' MPG (US)');
    setT('gm-res-l100km', l100km.toFixed(2) + ' L/100 km');
    setT('gm-res-kml', kml.toFixed(2) + ' km/L');
    setT('gm-res-mpg-uk', mpgUK.toFixed(2) + ' MPG (UK / Imp)');
    setT('gm-res-cost-per-mi', costPerMile ? '$' + costPerMile.toFixed(3) + ' / mile' : 'Enter gas price');
    setT('gm-res-cost-100mi', costPer100 ? '$' + costPer100.toFixed(2) : '--');
    setT('gm-res-annual-cost', annualFuel ? '$' + Math.round(annualFuel).toLocaleString() + ' / year' : '--');

    const ratEl = document.getElementById('gm-res-rating');
    if (ratEl) {
      ratEl.textContent = rating;
      ratEl.style.color = ratingColor;
    }
  },

  // =========================================================================
  // 51. Horsepower Calculator (Torque, ET & Trap Speed)
  // =========================================================================
  setHpMethod(method) {
    const label1 = document.getElementById('hp-label-1');
    const label2 = document.getElementById('hp-label-2');
    const in1 = document.getElementById('hp-in-1');
    const in2 = document.getElementById('hp-in-2');

    if (method === 'torque') {
      if (label1) label1.textContent = 'Engine Torque';
      if (label2) label2.textContent = 'Engine Speed (RPM)';
      if (in1) in1.value = 300;
      if (in2) in2.value = 5500;
    } else if (method === 'et') {
      if (label1) label1.textContent = 'Vehicle Weight (lbs)';
      if (label2) label2.textContent = 'Quarter-Mile Elapsed Time (sec)';
      if (in1) in1.value = 3400;
      if (in2) in2.value = 11.8;
    } else if (method === 'trap') {
      if (label1) label1.textContent = 'Vehicle Weight (lbs)';
      if (label2) label2.textContent = 'Quarter-Mile Trap Speed (mph)';
      if (in1) in1.value = 3200;
      if (in2) in2.value = 115;
    }
    this.calcHorsepower();
  },

  calcHorsepower() {
    const method = document.getElementById('hp-method')?.value || 'torque';
    const val1 = parseFloat(document.getElementById('hp-in-1')?.value || '300');
    const val2 = parseFloat(document.getElementById('hp-in-2')?.value || '5500');

    if (isNaN(val1) || isNaN(val2) || val1 <= 0 || val2 <= 0) return;

    let hp = 0;
    if (method === 'torque') {
      // HP = (Torque * RPM) / 5252
      hp = (val1 * val2) / 5252;
    } else if (method === 'et') {
      // Fox / Hale Formula: HP = Weight * (5.825 / ET)^3
      hp = val1 * Math.pow(5.825 / val2, 3);
    } else if (method === 'trap') {
      // Trap Speed Formula: HP = Weight * (TrapSpeed / 234)^3
      hp = val1 * Math.pow(val2 / 234, 3);
    }

    const metricHp = hp * 1.01387; // PS / CV
    const kw = hp * 0.7456999;
    const ftlbs = hp * 550; // ft-lb / sec

    const setT = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    setT('hp-res-primary', hp.toFixed(2) + ' hp');
    setT('hp-res-kw', kw.toFixed(2) + ' kW / ' + metricHp.toFixed(2) + ' PS (Metric HP)');
    setT('hp-res-hp', hp.toFixed(2) + ' hp (Mechanical)');
    setT('hp-res-ps', metricHp.toFixed(2) + ' PS / CV');
    setT('hp-res-kw-val', kw.toFixed(2) + ' kW');
    setT('hp-res-ftlbs', Math.round(ftlbs).toLocaleString() + ' ft-lb/sec');
    setT('hp-res-ptw', method !== 'torque' ? (val1 / hp).toFixed(1) + ' lbs/hp (' + ((hp / val1) * 2000).toFixed(1) + ' hp/ton)' : 'Requires vehicle weight');
    setT('hp-res-topspeed', hp >= 500 ? '195 - 215+ mph' : (hp >= 300 ? '155 - 175 mph' : '120 - 145 mph'));
  },

  // =========================================================================
  // 52. Engine Horsepower Calculator (WHP to BHP & Parasitic Loss)
  // =========================================================================
  setDrivetrainLoss(layout, pct) {
    const lossEl = document.getElementById('ehp-loss-pct');
    if (lossEl) lossEl.value = pct;
    this.calcEngineHorsepower();
  },

  calcEngineHorsepower() {
    const whp = parseFloat(document.getElementById('ehp-whp')?.value || '340');
    const lossPct = parseFloat(document.getElementById('ehp-loss-pct')?.value || '15');
    const dispVal = parseFloat(document.getElementById('ehp-disp')?.value || '3000');
    const dispUnit = document.getElementById('ehp-disp-unit')?.value || 'cc';
    const rpm = parseFloat(document.getElementById('ehp-rpm')?.value || '6500');

    if (isNaN(whp) || isNaN(lossPct) || lossPct <= 0 || lossPct >= 50 || whp <= 0) return;

    // True Crank / Flywheel HP: BHP = WHP / (1 - LossPct/100)
    const bhp = whp / (1 - (lossPct / 100));
    const lossHp = bhp - whp;

    // Flywheel Torque estimation
    const flywheelTorque = !isNaN(rpm) && rpm > 0 ? (bhp * 5252) / rpm : null;
    const flywheelNm = flywheelTorque ? flywheelTorque * 1.35582 : null;

    // Specific Output (hp/Liter)
    let dispLiters = dispVal / 1000;
    if (dispUnit === 'ci') dispLiters = dispVal * 0.0163871;
    const hpPerLiter = dispLiters > 0 ? (bhp / dispLiters) : null;

    // BMEP estimate (Brake Mean Effective Pressure in psi)
    // BMEP = (792,000 * BHP) / (Displacement_ci * RPM)
    const dispCi = dispUnit === 'ci' ? dispVal : dispVal * 0.0610237;
    const bmep = (!isNaN(rpm) && rpm > 0 && dispCi > 0) ? (792000 * bhp) / (dispCi * rpm) : null;

    const setT = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    setT('ehp-res-bhp', bhp.toFixed(2) + ' BHP (Crank)');
    setT('ehp-res-loss-sub', lossHp.toFixed(2) + ' HP (' + lossPct + '%) drivetrain transmission & friction loss');
    setT('ehp-res-bhp-grid', bhp.toFixed(2) + ' BHP');
    setT('ehp-res-whp-grid', whp.toFixed(2) + ' WHP (Wheel)');
    setT('ehp-res-loss-hp', lossHp.toFixed(2) + ' HP');
    setT('ehp-res-torque', flywheelTorque ? flywheelTorque.toFixed(1) + ' lb-ft (' + flywheelNm.toFixed(1) + ' N·m)' : '--');
    setT('ehp-res-density', hpPerLiter ? hpPerLiter.toFixed(1) + ' hp/Liter' : '--');
    setT('ehp-res-bmep', bmep ? bmep.toFixed(1) + ' psi (' + (bmep * 0.0689476).toFixed(2) + ' bar)' : '--');
  },

  // =========================================================================
  // 53. Mileage Calculator (IRS Reimbursement & Commute Expense)
  // =========================================================================
  setMileagePurpose(purpose, rate) {
    const rateEl = document.getElementById('mc-rate');
    if (rateEl) rateEl.value = rate;
    this.calcMileage();
  },

  calcMileage() {
    const miles = parseFloat(document.getElementById('mc-miles')?.value || '1250');
    const rate = parseFloat(document.getElementById('mc-rate')?.value || '0.67');
    const tolls = parseFloat(document.getElementById('mc-tolls')?.value || '45');
    const taxBracket = parseFloat(document.getElementById('mc-tax-bracket')?.value || '0.22');
    const unitDist = document.getElementById('mc-unit-dist')?.value || 'miles';

    if (isNaN(miles) || isNaN(rate) || miles < 0 || rate < 0) return;

    const mileageAmount = miles * rate;
    const totalDeduction = mileageAmount + (isNaN(tolls) ? 0 : tolls);
    const taxSavings = totalDeduction * taxBracket;
    const effectiveRate = totalDeduction / (miles || 1);
    const annualCommute = totalDeduction * 12;

    const setT = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    setT('mc-res-total', '$' + totalDeduction.toFixed(2));
    setT('mc-res-tax-savings', 'Est. Tax Savings: $' + taxSavings.toFixed(2) + ' at ' + (taxBracket * 100).toFixed(0) + '% bracket');
    setT('mc-res-mileage-amt', '$' + mileageAmount.toFixed(2));
    setT('mc-res-tolls-amt', '$' + (isNaN(tolls) ? 0 : tolls).toFixed(2));
    setT('mc-res-effective-rate', '$' + effectiveRate.toFixed(3) + ' / ' + (unitDist === 'km' ? 'km' : 'mi'));
    setT('mc-res-annual-proj', '$' + annualCommute.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' / year');
    setT('mc-res-operating-cost', '~$' + (miles * 0.28).toFixed(2) + ' (Gas + Wear & Tear)');
  },

  // =========================================================================
  // 54. Tire Size Calculator (Comparison & Speedometer Error)
  // =========================================================================
  setTirePreset(w1, ar1, rim1, w2, ar2, rim2) {
    const ids = ['ts-w1', 'ts-ar1', 'ts-rim1', 'ts-w2', 'ts-ar2', 'ts-rim2'];
    const vals = [w1, ar1, rim1, w2, ar2, rim2];
    ids.forEach((id, i) => {
      const el = document.getElementById(id);
      if (el) el.value = vals[i];
    });
    this.calcTireSize();
  },

  calcTireSize() {
    const w1 = parseFloat(document.getElementById('ts-w1')?.value || '225');
    const ar1 = parseFloat(document.getElementById('ts-ar1')?.value || '45');
    const rim1 = parseFloat(document.getElementById('ts-rim1')?.value || '17');

    const w2 = parseFloat(document.getElementById('ts-w2')?.value || '245');
    const ar2 = parseFloat(document.getElementById('ts-ar2')?.value || '40');
    const rim2 = parseFloat(document.getElementById('ts-rim2')?.value || '18');

    if ([w1, ar1, rim1, w2, ar2, rim2].some(v => isNaN(v) || v <= 0)) return;

    // Sidewall heights in mm
    const sw1Mm = w1 * (ar1 / 100);
    const sw2Mm = w2 * (ar2 / 100);

    // Diameters in mm & inches
    const diam1Mm = (rim1 * 25.4) + (2 * sw1Mm);
    const diam2Mm = (rim2 * 25.4) + (2 * sw2Mm);
    const diam1In = diam1Mm / 25.4;
    const diam2In = diam2Mm / 25.4;

    // Circumferences
    const circ1Mm = Math.PI * diam1Mm;
    const circ2Mm = Math.PI * diam2Mm;
    const circ1In = circ1Mm / 25.4;
    const circ2In = circ2Mm / 25.4;

    // Revolutions per mile (63,360 inches/mile)
    const revs1 = 63360 / circ1In;
    const revs2 = 63360 / circ2In;

    // Speedometer error percentage
    const errorPct = ((diam2Mm - diam1Mm) / diam1Mm) * 100;
    const rideHeightDiffMm = (diam2Mm - diam1Mm) / 2;
    const rideHeightDiffIn = rideHeightDiffMm / 25.4;

    // Actual speeds at indicated markers
    const actualAt20 = 20 * (diam2Mm / diam1Mm);
    const actualAt40 = 40 * (diam2Mm / diam1Mm);
    const actualAt60 = 60 * (diam2Mm / diam1Mm);
    const actualAt70 = 70 * (diam2Mm / diam1Mm);
    const actualAt80 = 80 * (diam2Mm / diam1Mm);

    let safety = 'Safe Fitment: Diameter difference is under 3% industry threshold';
    let safetyColor = '#10b981';
    if (Math.abs(errorPct) >= 5) {
      safety = 'Warning: Over 5% difference! High risk of ABS/ESP calibration errors and rubbing';
      safetyColor = '#ef4444';
    } else if (Math.abs(errorPct) >= 3) {
      safety = 'Caution: 3% to 5% difference. Check wheel arch clearance and brake clearance';
      safetyColor = '#f59e0b';
    }

    const setT = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    setT('ts-res-speedo-error', (errorPct >= 0 ? '+' : '') + errorPct.toFixed(2) + '% (' + (errorPct >= 0 ? 'Reads Slower' : 'Reads Faster') + ')');
    setT('ts-res-speedo-detail', 'When your speedometer reads 60.0 mph, your actual vehicle speed is ' + actualAt60.toFixed(2) + ' mph');

    setT('ts-res-diam1', diam1In.toFixed(2) + ' in (' + Math.round(diam1Mm) + ' mm)');
    setT('ts-res-diam2', diam2In.toFixed(2) + ' in (' + Math.round(diam2Mm) + ' mm)');
    setT('ts-res-diam-diff', (diam2In - diam1In >= 0 ? '+' : '') + (diam2In - diam1In).toFixed(2) + ' in (' + (diam2Mm - diam1Mm).toFixed(1) + ' mm)');

    setT('ts-res-w1', w1 + ' mm (' + (w1 / 25.4).toFixed(2) + ' in)');
    setT('ts-res-w2', w2 + ' mm (' + (w2 / 25.4).toFixed(2) + ' in)');
    setT('ts-res-w-diff', (w2 - w1 >= 0 ? '+' : '') + (w2 - w1) + ' mm');

    setT('ts-res-sw1', (sw1Mm / 25.4).toFixed(2) + ' in (' + sw1Mm.toFixed(1) + ' mm)');
    setT('ts-res-sw2', (sw2Mm / 25.4).toFixed(2) + ' in (' + sw2Mm.toFixed(1) + ' mm)');
    setT('ts-res-sw-diff', ((sw2Mm - sw1Mm) / 25.4 >= 0 ? '+' : '') + ((sw2Mm - sw1Mm) / 25.4).toFixed(2) + ' in');

    setT('ts-res-circ1', circ1In.toFixed(1) + ' in (' + Math.round(circ1Mm) + ' mm)');
    setT('ts-res-circ2', circ2In.toFixed(1) + ' in (' + Math.round(circ2Mm) + ' mm)');
    setT('ts-res-circ-diff', (circ2In - circ1In >= 0 ? '+' : '') + (circ2In - circ1In).toFixed(1) + ' in');

    setT('ts-res-revs1', Math.round(revs1) + ' / mi');
    setT('ts-res-revs2', Math.round(revs2) + ' / mi');
    setT('ts-res-revs-diff', (revs2 - revs1 >= 0 ? '+' : '') + Math.round(revs2 - revs1));

    setT('ts-res-ride-height', (rideHeightDiffIn >= 0 ? '+' : '') + rideHeightDiffIn.toFixed(2) + ' in (' + rideHeightDiffMm.toFixed(1) + ' mm)');

    setT('ts-spd-20', actualAt20.toFixed(1) + ' mph');
    setT('ts-spd-40', actualAt40.toFixed(1) + ' mph');
    setT('ts-spd-60', actualAt60.toFixed(1) + ' mph');
    setT('ts-spd-70', actualAt70.toFixed(1) + ' mph');
    setT('ts-spd-80', actualAt80.toFixed(1) + ' mph');

    const safetyEl = document.getElementById('ts-res-safety');
    if (safetyEl) {
      safetyEl.textContent = safety;
      safetyEl.style.color = safetyColor;
    }
  },

  // =========================================================================
  // 55. Dice Roller Calculator (RPG & Statistical Probability)
  // =========================================================================
  diceHistory: [],

  setDiceType(sides) {
    const elSides = document.getElementById('dice-sides');
    if (elSides) elSides.value = sides;
    this.rollDice();
  },

  clearDiceHistory() {
    this.diceHistory = [];
    const list = document.getElementById('dice-history-list');
    if (list) list.innerHTML = '<div style="font-size:0.8rem; color:var(--text-muted); text-align:center; padding:0.5rem;">No previous rolls in session</div>';
  },

  rollDice() {
    const count = Math.max(1, Math.min(50, parseInt(document.getElementById('dice-count')?.value || '2', 10)));
    const sides = Math.max(2, parseInt(document.getElementById('dice-sides')?.value || '6', 10));
    const mod = parseInt(document.getElementById('dice-mod')?.value || '3', 10) || 0;
    const mode = document.getElementById('dice-roll-type')?.value || 'normal';
    const targetDc = parseInt(document.getElementById('dice-target-dc')?.value || '15', 10);

    const rolls1 = [];
    for (let i = 0; i < count; i++) {
      rolls1.push(Math.floor(Math.random() * sides) + 1);
    }

    let finalRolls = rolls1;
    let rollSubLabel = '';
    if (mode === 'adv' || mode === 'disadv') {
      const rolls2 = [];
      for (let i = 0; i < count; i++) {
        rolls2.push(Math.floor(Math.random() * sides) + 1);
      }
      const sum1 = rolls1.reduce((a, b) => a + b, 0);
      const sum2 = rolls2.reduce((a, b) => a + b, 0);
      if (mode === 'adv') {
        finalRolls = sum1 >= sum2 ? rolls1 : rolls2;
        rollSubLabel = 'Advantage: kept [' + finalRolls.join(', ') + '], dropped [' + (sum1 >= sum2 ? rolls2 : rolls1).join(', ') + ']';
      } else {
        finalRolls = sum1 <= sum2 ? rolls1 : rolls2;
        rollSubLabel = 'Disadvantage: kept [' + finalRolls.join(', ') + '], dropped [' + (sum1 <= sum2 ? rolls2 : rolls1).join(', ') + ']';
      }
    }

    const diceSum = finalRolls.reduce((a, b) => a + b, 0);
    const total = diceSum + mod;

    // Statistics
    const mean = (count * ((sides + 1) / 2)) + mod;
    const minRoll = count + mod;
    const maxRoll = (count * sides) + mod;

    // Theoretical probability of rolling >= total (for small count or approximation)
    // Approximate with normal distribution for multi-dice
    const variance = count * ((sides * sides - 1) / 12);
    const stdDev = Math.sqrt(variance);
    let probP = 50;
    if (stdDev > 0) {
      const z = (total - 0.5 - mean) / stdDev;
      // Error function approximation
      const t = 1 / (1 + 0.2316419 * Math.abs(z));
      const d = 0.3989423 * Math.exp(-z * z / 2);
      let p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
      if (z > 0) p = 1 - p;
      probP = Math.max(0.01, Math.min(99.9, (1 - p) * 100));
    }

    // Chance to beat Target DC
    let dcChance = 50;
    if (!isNaN(targetDc) && stdDev > 0) {
      const zDc = (targetDc - 0.5 - mean) / stdDev;
      const t2 = 1 / (1 + 0.2316419 * Math.abs(zDc));
      const d2 = 0.3989423 * Math.exp(-zDc * zDc / 2);
      let pDc = d2 * t2 * (0.3193815 + t2 * (-0.3565638 + t2 * (1.781478 + t2 * (-1.821256 + t2 * 1.330274))));
      if (zDc > 0) pDc = 1 - pDc;
      dcChance = Math.max(0, Math.min(100, (1 - pDc) * 100));
    }

    // Render individual die chips
    const container = document.getElementById('dice-faces-container');
    if (container) {
      container.innerHTML = '';
      finalRolls.forEach(val => {
        const chip = document.createElement('span');
        chip.style.display = 'inline-flex';
        chip.style.alignItems = 'center';
        chip.style.justifyContent = 'center';
        chip.style.width = '38px';
        chip.style.height = '38px';
        chip.style.borderRadius = '8px';
        chip.style.fontSize = '1.05rem';
        chip.style.fontWeight = '800';
        chip.style.boxShadow = '0 2px 6px rgba(0,0,0,0.2)';

        if (sides === 20 && val === 20) {
          chip.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
          chip.style.color = '#ffffff';
          chip.title = 'NATURAL 20! Critical Success!';
        } else if (sides === 20 && val === 1) {
          chip.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
          chip.style.color = '#ffffff';
          chip.title = 'NATURAL 1! Critical Fail!';
        } else if (val === sides) {
          chip.style.background = 'rgba(16,185,129,0.2)';
          chip.style.color = '#10b981';
          chip.style.border = '1px solid #10b981';
        } else if (val === 1) {
          chip.style.background = 'rgba(239,68,68,0.15)';
          chip.style.color = '#ef4444';
          chip.style.border = '1px solid #ef4444';
        } else {
          chip.style.background = 'var(--card-bg, #1e293b)';
          chip.style.color = 'var(--text-primary, #f8fafc)';
          chip.style.border = '1px solid var(--card-border, #334155)';
        }
        chip.textContent = val;
        container.appendChild(chip);
      });
    }

    const exprStr = count + 'd' + sides + (mod !== 0 ? (mod > 0 ? ' +' + mod : ' ' + mod) : '') + ': [' + finalRolls.join(', ') + ']' + (mod !== 0 ? (mod > 0 ? ' +' + mod : ' ' + mod) : '');

    const setT = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    setT('dice-res-total', total.toString());
    setT('dice-res-expr', exprStr + (rollSubLabel ? ' | ' + rollSubLabel : ''));
    setT('dice-res-mean', mean.toFixed(2));
    setT('dice-res-range', minRoll + ' - ' + maxRoll);
    setT('dice-res-prob', probP.toFixed(1) + '% chance for >= ' + total);
    setT('dice-res-dc-chance', !isNaN(targetDc) ? dcChance.toFixed(1) + '% chance to meet DC ' + targetDc : '--');

    // Add to history
    const historyItem = {
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      expr: count + 'd' + sides + (mod >= 0 ? '+' + mod : mod),
      rolls: '[' + finalRolls.join(',') + ']',
      total: total
    };
    this.diceHistory.unshift(historyItem);
    if (this.diceHistory.length > 10) this.diceHistory.pop();

    const histList = document.getElementById('dice-history-list');
    if (histList) {
      histList.innerHTML = '';
      this.diceHistory.forEach(h => {
        const item = document.createElement('div');
        item.style.display = 'flex';
        item.style.justifyContent = 'space-between';
        item.style.padding = '0.35rem 0.6rem';
        item.style.fontSize = '0.78rem';
        item.style.borderRadius = '6px';
        item.style.background = 'var(--card-bg, rgba(255,255,255,0.03))';
        item.style.border = '1px solid var(--card-border, rgba(255,255,255,0.06))';
        item.innerHTML = '<span style="color:var(--text-muted);">' + h.time + ' — ' + h.expr + ' ' + h.rolls + '</span><strong style="color:#38bdf8;">' + h.total + '</strong>';
        histList.appendChild(item);
      });
    }
  },

  calcDice() {
    this.rollDice();
  },

  // =========================================================================
  // 56. Love Calculator & Relationship Compatibility Meter
  // =========================================================================
  quickLovePreset(n1, z1, n2, z2) {
    const elN1 = document.getElementById('love-name1');
    const elZ1 = document.getElementById('love-zodiac1');
    const elN2 = document.getElementById('love-name2');
    const elZ2 = document.getElementById('love-zodiac2');
    if (elN1) elN1.value = n1;
    if (elZ1) elZ1.value = z1;
    if (elN2) elN2.value = n2;
    if (elZ2) elZ2.value = z2;
    this.calcLoveCompatibility();
  },

  calcLoveCompatibility() {
    const name1 = (document.getElementById('love-name1')?.value || 'Romeo').trim();
    const name2 = (document.getElementById('love-name2')?.value || 'Juliet').trim();
    const z1 = document.getElementById('love-zodiac1')?.value || 'leo';
    const z2 = document.getElementById('love-zodiac2')?.value || 'aries';
    const relType = document.getElementById('love-rel-type')?.value || 'dating';

    const clean1 = name1.toLowerCase().replace(/[^a-z]/g, '');
    const clean2 = name2.toLowerCase().replace(/[^a-z]/g, '');

    if (!clean1 || !clean2) return;

    // Symmetric string seed so Name1 + Name2 is always identical to Name2 + Name1
    const sortedNames = [clean1, clean2].sort();
    const pairStr = sortedNames.join('&');

    let hash = 0;
    for (let i = 0; i < pairStr.length; i++) {
      hash = (hash * 31 + pairStr.charCodeAt(i)) & 0xffffffff;
    }
    const absHash = Math.abs(hash);

    // Baseline love score (62 to 95)
    let score = 62 + (absHash % 34);

    // Zodiac elemental synergy
    const elements = {
      aries: 'fire', leo: 'fire', sagittarius: 'fire',
      taurus: 'earth', virgo: 'earth', capricorn: 'earth',
      gemini: 'air', libra: 'air', aquarius: 'air',
      cancer: 'water', scorpio: 'water', pisces: 'water'
    };
    const el1 = elements[z1] || 'fire';
    const el2 = elements[z2] || 'fire';

    let astroComment = '';
    if (el1 === el2) {
      score += 5;
      astroComment = el1.toUpperCase() + ' + ' + el2.toUpperCase() + ': Shared elemental frequency creates deep intuitive understanding, natural rhythm, and common goals.';
    } else if ((el1 === 'fire' && el2 === 'air') || (el1 === 'air' && el2 === 'fire')) {
      score += 6;
      astroComment = 'FIRE + AIR: Highly inspirational match. Air feeds the flame of Fire, sparking dynamic creativity, ambition, and continuous intellectual excitement.';
    } else if ((el1 === 'earth' && el2 === 'water') || (el1 === 'water' && el2 === 'earth')) {
      score += 6;
      astroComment = 'EARTH + WATER: Exceptionally fertile and nurturing bond. Earth grounds and stabilizes Water, while Water brings emotional warmth and empathy.';
    } else if ((el1 === 'fire' && el2 === 'water') || (el1 === 'water' && el2 === 'fire')) {
      score += 1;
      astroComment = 'FIRE + WATER: Steamy, intense, and passionate dynamics with periodic emotional waves that keep things thrilling.';
    } else {
      score += 2;
      astroComment = el1.toUpperCase() + ' + ' + el2.toUpperCase() + ': Complementary polarities with distinctive strengths that provide wonderful growth opportunities.';
    }

    score = Math.min(99, Math.max(50, score));

    // Multi-dimensional sub-metrics (derived deterministically)
    const emotionPct = Math.min(99, Math.max(55, score + ((absHash >> 2) % 11) - 5));
    const intellectPct = Math.min(99, Math.max(55, score + ((absHash >> 4) % 13) - 6));
    const passionPct = Math.min(99, Math.max(55, score + ((absHash >> 6) % 15) - 4));
    const trustPct = Math.min(99, Math.max(55, score + ((absHash >> 8) % 9) - 3));
    const longtermPct = Math.min(99, Math.max(55, score + ((absHash >> 10) % 11) - 5));

    // Romantic Archetypes
    let archetype = 'Cosmic Soulmates & Twin Flames 🔥';
    let advice = 'Keep nurturing spontaneous dates, heartfelt communication, and celebrate each other\\\'s milestones together.';
    if (score >= 90) {
      archetype = 'Twin Flames & Inseparable Destiny 💫';
      advice = 'Rare and profound resonance. You inspire each other to be your greatest selves—keep open-hearted honesty at your foundation.';
    } else if (score >= 80) {
      archetype = 'Harmonious Power Couple 🌟';
      advice = 'Deep mutual respect and magnetic chemistry. A wonderful balance of shared dreams and personal independence.';
    } else if (score >= 70) {
      archetype = 'Dynamic Sparks & Enduring Affection ✨';
      advice = 'Engaging warmth and playful energy. Focus on active listening and shared hobbies to strengthen your connection.';
    } else {
      archetype = 'Opposites Attract with Electric Chemistry ⚡';
      advice = 'Distinctive personalities that create exciting novelty and mutual expansion. Celebrate your unique differences.';
    }

    const setT = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    setT('love-res-pct', score + '%');
    setT('love-res-archetype', archetype);
    setT('love-metric-emotion', emotionPct + '%');
    setT('love-metric-intellect', intellectPct + '%');
    setT('love-metric-passion', passionPct + '%');
    setT('love-metric-trust', trustPct + '%');
    setT('love-metric-longterm', longtermPct + '%');
    setT('love-res-astrology', astroComment);
    setT('love-res-advice', advice);

    const barEl = document.getElementById('love-res-bar');
    if (barEl) {
      barEl.style.width = score + '%';
    }
  },
  // Initialize listeners
  init() {
    // Unit converter
    document.getElementById('unit-category')?.addEventListener('change', () => this.populateUnitDropdowns());
    document.getElementById('unit-from-type')?.addEventListener('change', () => this.convertUnits('from'));
    document.getElementById('unit-to-type')?.addEventListener('change', () => this.convertUnits('from'));
    document.getElementById('unit-from-val')?.addEventListener('input', () => this.convertUnits('from'));
    document.getElementById('unit-to-val')?.addEventListener('input', () => this.convertUnits('to'));
    document.getElementById('unit-swap-btn')?.addEventListener('click', () => this.swapUnits());
    this.populateUnitDropdowns();

    // Age inputs
    ['age-dob', 'age-target-date'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcAge());
    });
    const targetDateEl = document.getElementById('age-target-date');
    if (targetDateEl && !targetDateEl.value) {
      targetDateEl.value = new Date().toISOString().split('T')[0];
    }
    this.calcAge();

    // GPA
    this.renderCourses();
    document.getElementById('add-course-btn')?.addEventListener('click', () => this.addCourse());

    // Work Hours
    ['work-start', 'work-end', 'work-break', 'work-rate', 'work-ot-mult'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcWorkHours());
    });
    this.calcWorkHours();

    // 5. Date Calculator
    ['date-calc-mode', 'date-d1', 'date-d2', 'date-base', 'date-op', 'date-count', 'date-unit'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcDate());
      document.getElementById(id)?.addEventListener('change', () => this.calcDate());
    });
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];
    const prevDate = new Date();
    prevDate.setDate(now.getDate() - 30);
    const prevStr = prevDate.toISOString().split('T')[0];
    const d1El = document.getElementById('date-d1');
    const d2El = document.getElementById('date-d2');
    const dBaseEl = document.getElementById('date-base');
    if (d1El && !d1El.value) d1El.value = prevStr;
    if (d2El && !d2El.value) d2El.value = todayStr;
    if (dBaseEl && !dBaseEl.value) dBaseEl.value = todayStr;
    this.calcDate();

    // 6. Time Calculator
    ['time-h1', 'time-m1', 'time-s1', 'time-op', 'time-h2', 'time-m2', 'time-s2'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcTime());
      document.getElementById(id)?.addEventListener('change', () => this.calcTime());
    });
    this.calcTime();

    // 7. Hours Calculator
    ['hours-start', 'hours-end', 'hours-break'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcHours());
      document.getElementById(id)?.addEventListener('change', () => this.calcHours());
    });
    this.calcHours();

    // 8. Time Card Calculator
    ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].forEach(d => {
      [`tc-${d}-in`, `tc-${d}-out`, `tc-${d}-break`].forEach(id => {
        document.getElementById(id)?.addEventListener('input', () => this.calcTimeCard());
        document.getElementById(id)?.addEventListener('change', () => this.calcTimeCard());
      });
    });
    ['tc-rate', 'tc-ot-mult'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcTimeCard());
    });
    this.calcTimeCard();

    // 9. Time Zone Calculator
    ['tz-date', 'tz-time', 'tz-source', 'tz-target'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcTimeZone());
      document.getElementById(id)?.addEventListener('change', () => this.calcTimeZone());
    });
    const tzDateEl = document.getElementById('tz-date');
    if (tzDateEl && !tzDateEl.value) tzDateEl.value = todayStr;
    this.calcTimeZone();

    // 10. Time Duration Calculator
    ['dur-start', 'dur-end'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcDuration());
      document.getElementById(id)?.addEventListener('change', () => this.calcDuration());
    });
    const durStartEl = document.getElementById('dur-start');
    const durEndEl = document.getElementById('dur-end');
    if (durStartEl && !durStartEl.value) durStartEl.value = `${todayStr}T09:00`;
    if (durEndEl && !durEndEl.value) durEndEl.value = `${todayStr}T17:30`;
    this.calcDuration();

    // 11. Day Counter
    ['dc-start', 'dc-end', 'dc-incl-end'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcDayCounter());
      document.getElementById(id)?.addEventListener('change', () => this.calcDayCounter());
    });
    const dcStartEl = document.getElementById('dc-start');
    const dcEndEl = document.getElementById('dc-end');
    if (dcStartEl && !dcStartEl.value) dcStartEl.value = todayStr;
    if (dcEndEl && !dcEndEl.value) {
      const nextDate = new Date();
      nextDate.setDate(now.getDate() + 45);
      dcEndEl.value = nextDate.toISOString().split('T')[0];
    }
    this.calcDayCounter();

    // 12. Day of Week
    ['dow-date'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcDayOfWeek());
      document.getElementById(id)?.addEventListener('change', () => this.calcDayOfWeek());
    });
    const dowDateEl = document.getElementById('dow-date');
    if (dowDateEl && !dowDateEl.value) dowDateEl.value = todayStr;
    this.calcDayOfWeek();

    // 13. Concrete Calculator
    document.getElementById('conc-shape')?.addEventListener('change', () => this.updateConcreteInputs());
    ['conc-p1', 'conc-p2', 'conc-p3', 'conc-waste'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcConcrete());
    });
    this.calcConcrete();

    // 14. BTU Calculator
    ['btu-sqft', 'btu-ceiling', 'btu-sun', 'btu-climate', 'btu-occupants'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcBTU());
      document.getElementById(id)?.addEventListener('change', () => this.calcBTU());
    });
    this.calcBTU();

    // 15. Square Footage Calculator
    ['sqft-l1', 'sqft-w1', 'sqft-l2', 'sqft-w2', 'sqft-waste', 'sqft-price'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcSquareFootage());
    });
    this.calcSquareFootage();

    // 16. Stair Calculator
    ['stair-rise', 'stair-target-riser', 'stair-tread'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcStairs());
    });
    this.calcStairs();

    // 17. Roofing Calculator
    ['roof-sqft', 'roof-pitch', 'roof-waste'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcRoofing());
      document.getElementById(id)?.addEventListener('change', () => this.calcRoofing());
    });
    this.calcRoofing();

    // 18. Tile Calculator
    ['tile-room-l', 'tile-room-w', 'tile-dim-l', 'tile-dim-w', 'tile-waste', 'tile-box-sqft'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcTile());
    });
    this.calcTile();

    // 19. Mulch Calculator
    ['mulch-area', 'mulch-depth', 'mulch-waste'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcMulch());
    });
    this.calcMulch();

    // 20. Gravel Calculator
    ['gravel-l', 'gravel-w', 'gravel-depth', 'gravel-density'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcGravel());
      document.getElementById(id)?.addEventListener('change', () => this.calcGravel());
    });
    this.calcGravel();


    // 21. Height Calculator
    ['height-mode', 'height-ft', 'height-in', 'height-cm', 'height-dad-ft', 'height-dad-in', 'height-mom-ft', 'height-mom-in', 'height-child-gender'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcHeight());
      document.getElementById(id)?.addEventListener('change', () => this.calcHeight());
    });
    this.calcHeight();

    // 22. Conversion Calculator
    document.getElementById('conv-cat')?.addEventListener('change', () => this.updateConvTypes());
    ['conv-from-val', 'conv-from-type', 'conv-to-type'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcConversion());
      document.getElementById(id)?.addEventListener('change', () => this.calcConversion());
    });
    this.updateConvTypes();

    // 23. GDP Calculator
    ['gdp-c', 'gdp-i', 'gdp-g', 'gdp-x', 'gdp-m', 'gdp-pop', 'gdp-deflator'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcGDP());
      document.getElementById(id)?.addEventListener('change', () => this.calcGDP());
    });
    this.calcGDP();

    // 24. Density Calculator
    document.getElementById('density-preset')?.addEventListener('change', () => this.updateDensityPreset());
    ['density-solve', 'density-mass', 'density-vol', 'density-val'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcDensity());
      document.getElementById(id)?.addEventListener('change', () => this.calcDensity());
    });
    this.calcDensity();

    // 25. Mass Calculator
    ['mass-mode', 'mass-p1', 'mass-p2'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcMass());
      document.getElementById(id)?.addEventListener('change', () => this.calcMass());
    });
    this.calcMass();

    // 26. Weight Calculator
    ['weight-mass', 'weight-unit', 'weight-body', 'weight-accel'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcWeight());
      document.getElementById(id)?.addEventListener('change', () => this.calcWeight());
    });
    this.calcWeight();

    // 27. Speed Calculator
    ['speed-solve', 'speed-dist-val', 'speed-dist-unit', 'speed-time-h', 'speed-time-m', 'speed-time-s', 'speed-val', 'speed-unit'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcSpeed());
      document.getElementById(id)?.addEventListener('change', () => this.calcSpeed());
    });
    this.calcSpeed();

    // 28. Molarity Calculator
    ['mol-solve', 'mol-mass', 'mol-mw', 'mol-vol', 'mol-m'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcMolarity());
      document.getElementById(id)?.addEventListener('change', () => this.calcMolarity());
    });
    this.calcMolarity();

    // 29. Molecular Weight Calculator
    document.getElementById('mw-preset')?.addEventListener('change', () => this.updateMwPreset());
    document.getElementById('mw-formula')?.addEventListener('input', () => this.calcMolecularWeight());
    this.calcMolecularWeight();

    // 30. Roman Numeral Converter
    ['roman-mode', 'roman-arabic-in', 'roman-str-in'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcRomanNumeral());
      document.getElementById(id)?.addEventListener('change', () => this.calcRomanNumeral());
    });
    this.calcRomanNumeral();

    // 31. Voltage Drop Calculator
    ['vd-voltage', 'vd-current', 'vd-distance', 'vd-gauge', 'vd-material', 'vd-phase'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcVoltageDrop());
      document.getElementById(id)?.addEventListener('change', () => this.calcVoltageDrop());
    });
    this.calcVoltageDrop();

    // 32. Resistor Calculator
    ['res-mode', 'res-b1', 'res-b2', 'res-b3', 'res-b4', 'res-r1', 'res-r2', 'res-r3'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcResistor());
      document.getElementById(id)?.addEventListener('change', () => this.calcResistor());
    });
    this.calcResistor();

    // 33. Ohm's Law Calculator
    ['ohm-pair', 'ohm-v', 'ohm-i', 'ohm-r', 'ohm-p'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcOhmsLaw());
      document.getElementById(id)?.addEventListener('change', () => this.calcOhmsLaw());
    });
    this.calcOhmsLaw();

    // 34. Electricity Calculator
    document.getElementById('elec-preset')?.addEventListener('change', () => this.updateElecPreset());
    ['elec-watts', 'elec-hours', 'elec-rate', 'elec-days'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcElectricity());
      document.getElementById(id)?.addEventListener('change', () => this.calcElectricity());
    });
    this.calcElectricity();

    // 46. Wind Chill Calculator
    ['wc-temp', 'wc-unit-temp', 'wc-speed', 'wc-unit-speed'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcWindChill());
      document.getElementById(id)?.addEventListener('change', () => this.calcWindChill());
    });
    this.calcWindChill();

    // 47. Heat Index Calculator
    ['hi-temp', 'hi-unit-temp', 'hi-rh'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcHeatIndex());
      document.getElementById(id)?.addEventListener('change', () => this.calcHeatIndex());
    });
    document.getElementById('hi-rh-slider')?.addEventListener('input', (e) => this.syncHiSlider(e.target.value));
    this.calcHeatIndex();

    // 48. Dew Point Calculator
    ['dp-temp', 'dp-unit-temp', 'dp-rh'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcDewPoint());
      document.getElementById(id)?.addEventListener('change', () => this.calcDewPoint());
    });
    this.calcDewPoint();

    // 49. Fuel Cost Calculator
    ['fc-distance', 'fc-unit-dist', 'fc-efficiency', 'fc-unit-eff', 'fc-price', 'fc-price-unit', 'fc-passengers', 'fc-roundtrip'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcFuelCost());
      document.getElementById(id)?.addEventListener('change', () => this.calcFuelCost());
    });
    this.calcFuelCost();

    // 50. Gas Mileage Calculator
    ['gm-dist', 'gm-odo-start', 'gm-odo-end', 'gm-unit-dist', 'gm-fuel', 'gm-unit-fuel', 'gm-price'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcGasMileage());
      document.getElementById(id)?.addEventListener('change', () => this.calcGasMileage());
    });
    this.calcGasMileage();

    // 51. Horsepower Calculator
    ['hp-method', 'hp-in-1', 'hp-unit-1', 'hp-in-2'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcHorsepower());
      document.getElementById(id)?.addEventListener('change', () => this.calcHorsepower());
    });
    this.calcHorsepower();

    // 52. Engine Horsepower Calculator
    ['ehp-whp', 'ehp-loss-pct', 'ehp-disp', 'ehp-disp-unit', 'ehp-rpm'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcEngineHorsepower());
      document.getElementById(id)?.addEventListener('change', () => this.calcEngineHorsepower());
    });
    this.calcEngineHorsepower();

    // 53. Mileage Calculator
    ['mc-miles', 'mc-rate', 'mc-tolls', 'mc-tax-bracket', 'mc-unit-dist'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcMileage());
      document.getElementById(id)?.addEventListener('change', () => this.calcMileage());
    });
    this.calcMileage();

    // 54. Tire Size Calculator
    ['ts-w1', 'ts-ar1', 'ts-rim1', 'ts-w2', 'ts-ar2', 'ts-rim2'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcTireSize());
      document.getElementById(id)?.addEventListener('change', () => this.calcTireSize());
    });
    this.calcTireSize();

    // 55. Dice Roller Calculator
    ['dice-count', 'dice-sides', 'dice-mod', 'dice-roll-type', 'dice-target-dc'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcDice());
      document.getElementById(id)?.addEventListener('change', () => this.calcDice());
    });
    document.getElementById('btn-roll-dice')?.addEventListener('click', () => this.rollDice());
    this.rollDice();

    // 56. Love Calculator
    ['love-name1', 'love-zodiac1', 'love-name2', 'love-zodiac2', 'love-rel-type'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcLoveCompatibility());
      document.getElementById(id)?.addEventListener('change', () => this.calcLoveCompatibility());
    });
    document.getElementById('btn-calc-love')?.addEventListener('click', () => this.calcLoveCompatibility());
    this.calcLoveCompatibility();

    // Category filter pills
    document.querySelectorAll('.other-filter-pill').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const filterKey = btn.dataset.filter || 'all';
        this.filterCatalog(filterKey, btn);
      });
    });

    // Switcher pills inside detail view
    document.querySelectorAll('#other-detail-view .switcher-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        const target = pill.dataset.target;
        if (target) this.openCalculator(target);
      });
    });
  },

  // ------------------------------------------------------------------------
  // Utilities Catalog vs Detail View Management
  // ------------------------------------------------------------------------
  currentFilter: 'all',

  filterCatalog(filterKey, btnEl) {
    this.currentFilter = filterKey || 'all';

    // Update active filter pill
    document.querySelectorAll('.other-filter-pill').forEach(btn => {
      const match = (btnEl && btn === btnEl) || (!btnEl && btn.dataset.filter === filterKey);
      btn.classList.toggle('active', !!match);
    });

    const catalogView = document.getElementById('other-catalog-view');
    const detailView = document.getElementById('other-detail-view');
    if (detailView && detailView.style.display !== 'none') {
      detailView.style.display = 'none';
      if (catalogView) catalogView.style.display = 'block';
    }

    const boxes = document.querySelectorAll('#other-catalog-view .feature-big-box');
    let visibleCount = 0;
    boxes.forEach(box => {
      const groups = (box.dataset.otherGroup || 'other general').split(' ');
      const match = filterKey === 'all' || groups.includes(filterKey);
      box.style.display = match ? 'flex' : 'none';
      if (match) visibleCount++;
    });

    const badge = document.getElementById('other-count-badge');
    if (badge) {
      if (filterKey === 'date') {
        badge.textContent = `${visibleCount} Date and Time Utilities`;
      } else if (filterKey === 'internet') {
        badge.textContent = `${visibleCount} Internet Tools`;
      } else if (filterKey === 'housing') {
        badge.textContent = `${visibleCount} Housing/Building Calculators`;
      } else if (filterKey === 'everyday') {
        badge.textContent = `${visibleCount} Everyday Utility Calculators`;
      } else if (filterKey === 'weather') {
        badge.textContent = `${visibleCount} Weather Calculators`;
      } else if (filterKey === 'transportation') {
        badge.textContent = `${visibleCount} Transportation Calculators`;
      } else if (filterKey === 'measurements') {
        badge.textContent = `${visibleCount} Various Measurements/Units Calculators`;
      } else if (filterKey === 'entertainment') {
        badge.textContent = `${visibleCount} Entertainment/Anecdotes Calculators`;
      } else if (filterKey === 'electronics') {
        badge.textContent = `${visibleCount} Electronics/Circuits Tools`;
      } else {
        badge.textContent = `${visibleCount} Daily Utilities & Tools`;
      }
    }

    if (window.AppRouter && !window.AppRouter.isDispatching) {
      window.AppRouter.onCatalogOpened('other', filterKey);
    }
  },

  showCatalog() {
    const catalogView = document.getElementById('other-catalog-view');
    const detailView = document.getElementById('other-detail-view');
    if (catalogView) catalogView.style.display = 'block';
    if (detailView) detailView.style.display = 'none';
    const searchInput = document.getElementById('other-catalog-search');
    if (searchInput && searchInput.value) {
      this.searchCatalog(searchInput.value);
    } else {
      this.filterCatalog(this.currentFilter || 'all');
      const noResults = document.getElementById('other-no-results');
      if (noResults) noResults.style.display = 'none';
    }
    if (window.AppRouter && !window.AppRouter.isDispatching) {
      window.AppRouter.onCatalogOpened('other', this.currentFilter);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  searchCatalog(query) {
    const q = (query || '').toLowerCase().trim();
    const detailView = document.getElementById('other-detail-view');
    const catalogView = document.getElementById('other-catalog-view');
    if (detailView && detailView.style.display !== 'none' && q !== '') {
      detailView.style.display = 'none';
      if (catalogView) catalogView.style.display = 'block';
    }

    const boxes = document.querySelectorAll('#other-catalog-view .feature-big-box');
    let visibleCount = 0;
    boxes.forEach(box => {
      const title = box.querySelector('.box-title')?.textContent.toLowerCase() || '';
      const desc = box.querySelector('.box-description')?.textContent.toLowerCase() || '';
      const tags = box.querySelector('.box-tags-row')?.textContent.toLowerCase() || '';
      const keywords = (box.dataset.keywords || '').toLowerCase();
      const match = q === '' || title.includes(q) || desc.includes(q) || tags.includes(q) || keywords.includes(q);
      box.style.display = match ? 'flex' : 'none';
      if (match) visibleCount++;
    });

    const noResults = document.getElementById('other-no-results');
    if (noResults) {
      noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  },

  resetSearch() {
    const input = document.getElementById('other-catalog-search');
    if (input) input.value = '';
    this.searchCatalog('');
    const noResults = document.getElementById('other-no-results');
    if (noResults) noResults.style.display = 'none';
  },

  openCalculator(calcId) {
    const catalogView = document.getElementById('other-catalog-view');
    const detailView = document.getElementById('other-detail-view');
    if (catalogView) catalogView.style.display = 'none';
    if (detailView) detailView.style.display = 'block';

    document.querySelectorAll('.other-calc-unit').forEach(panel => {
      panel.style.display = panel.id === calcId ? 'block' : 'none';
    });

    document.querySelectorAll('#other-detail-view .switcher-pill').forEach(pill => {
      pill.classList.toggle('active', pill.dataset.target === calcId);
    });

    // Automatically trigger initial calculation when opening tool
    try {
      if (calcId === 'sec-ip-subnet-calc') this.calcSubnet();
      else if (calcId === 'sec-password-generator-calc') this.generatePassword();
      else if (calcId === 'sec-bandwidth-calc') { this.toggleBwMode(); this.calcBandwidth(); }
      else if (calcId === 'sec-base64-calc') this.processBase64();
      else if (calcId === 'sec-url-encode-calc') this.processUrl();
      else if (calcId === 'sec-grade-calc') { if (this.gradeMode === 'weighted') { this.renderGradeCategories(); this.calcWeightedGrade(); } else { this.calcFinalGrade(); } }
      else if (calcId === 'sec-bra-size-calc') this.calcBraSize();
      else if (calcId === 'sec-shoe-size-calc') { this.populateShoeOptions(); this.convertShoeSize(); }
      else if (calcId === 'sec-golf-handicap-calc') { this.renderGolfRounds(); this.calcGolfHandicap(); }
      else if (calcId === 'sec-sleep-calc') this.calcSleepCycles();
      else if (calcId === 'sec-wind-chill-calc') this.calcWindChill();
      else if (calcId === 'sec-heat-index-calc') this.calcHeatIndex();
      else if (calcId === 'sec-dew-point-calc') this.calcDewPoint();
      else if (calcId === 'sec-fuel-cost-calc') this.calcFuelCost();
      else if (calcId === 'sec-gas-mileage-calc') this.calcGasMileage();
      else if (calcId === 'sec-horsepower-calc') this.calcHorsepower();
      else if (calcId === 'sec-engine-horsepower-calc') this.calcEngineHorsepower();
      else if (calcId === 'sec-mileage-calc') this.calcMileage();
      else if (calcId === 'sec-tire-size-calc') this.calcTireSize();
      else if (calcId === 'sec-dice-roller-calc') this.rollDice();
      else if (calcId === 'sec-love-calc') this.calcLoveCompatibility();
      else if (calcId === 'sec-gpa-calc') { this.renderCourses(); }
    } catch (e) {
      console.warn('Initial calculation error for ' + calcId, e);
    }

    if (window.AppRouter && !window.AppRouter.isDispatching) {
      window.AppRouter.onCalculatorOpened(calcId, 'other');
    }

    if (window.SeoGuide) {
      window.SeoGuide.updateGuide(calcId, 'other');
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
  }
};

window.OtherCalcs = OtherCalcs;
