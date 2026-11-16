/* ==========================================================================
   CALC• MODERN CALCULATOR - OTHER & UTILITY CALCULATORS ENGINE
   ========================================================================== */

// Helper constants

const OtherCalcs = {

  // Date parsing helper to prevent UTC midnight timezone shift bugs
  parseLocalDate(dateStr) {
    if (!dateStr) {
      const now = new Date();
      return new Date(now.getFullYear(), now.getMonth(), now.getDate());
    }
    const parts = String(dateStr).split('-');
    if (parts.length === 3) {
      const y = parseInt(parts[0], 10);
      const m = parseInt(parts[1], 10) - 1;
      const d = parseInt(parts[2], 10);
      return new Date(y, m, d);
    }
    const dt = new Date(dateStr);
    return new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
  },

  getLocalDateString(date) {
    const d = date || new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
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
  // Initialize listeners
  init() {
    // 1. GPA Calculator
    this.renderCourses();
    document.getElementById('add-course-btn')?.addEventListener('click', () => this.addCourse());

    // 2. Stair Calculator
    ['stair-rise', 'stair-target-riser', 'stair-tread'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcStairs());
    });
    this.calcStairs();

    // 3. Gravel Calculator
    ['gravel-l', 'gravel-w', 'gravel-depth', 'gravel-density'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcGravel());
      document.getElementById(id)?.addEventListener('change', () => this.calcGravel());
    });
    this.calcGravel();

    // 4. Density Calculator
    document.getElementById('density-preset')?.addEventListener('change', () => this.updateDensityPreset());
    ['density-solve', 'density-mass', 'density-vol', 'density-val'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcDensity());
      document.getElementById(id)?.addEventListener('change', () => this.calcDensity());
    });
    this.calcDensity();

    // 5. Grade Calculator
    ['grade-goal', 'grade-weight', 'grade-current'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcFinalGrade());
    });
    document.getElementById('add-category-btn')?.addEventListener('click', () => this.addGradeCategory());
    this.renderGradeCategories();
    this.calcFinalGrade();

    // 6. Bra Size Calculator
    ['bra-underbust', 'bra-bust', 'bra-unit'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcBraSize());
      document.getElementById(id)?.addEventListener('change', () => this.calcBraSize());
    });
    this.calcBraSize();

    // 7. Fuel Cost Calculator
    ['fc-distance', 'fc-unit-dist', 'fc-efficiency', 'fc-unit-eff', 'fc-price', 'fc-price-unit', 'fc-passengers', 'fc-roundtrip'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcFuelCost());
      document.getElementById(id)?.addEventListener('change', () => this.calcFuelCost());
    });
    this.calcFuelCost();

    // 8. Mileage Calculator
    ['mc-miles', 'mc-rate', 'mc-tolls', 'mc-tax-bracket', 'mc-unit-dist'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calcMileage());
      document.getElementById(id)?.addEventListener('change', () => this.calcMileage());
    });
    this.calcMileage();

    // Category filter pills
    document.querySelectorAll('.other-filter-pill').forEach(btn => {
      btn.addEventListener('click', () => {
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

    // Reset any active search query
    const searchInp = document.getElementById('other-catalog-search');
    if (searchInp && searchInp.value) {
      searchInp.value = '';
      const clearBtn = document.getElementById('other-catalog-search-clear');
      if (clearBtn) clearBtn.style.display = 'none';
      const secEl = document.getElementById('other-search-results-section');
      if (secEl) secEl.style.display = 'none';
    }

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

    // Toggle topic sections so empty ones are hidden
    document.querySelectorAll('#other-catalog-view .calc-topic-section').forEach(sec => {
      if (sec.id === 'other-search-results-section') return;
      if (filterKey === 'all') {
        sec.style.display = '';
      } else {
        const hasVisible = Array.from(sec.querySelectorAll('.feature-big-box')).some(b => b.style.display !== 'none');
        sec.style.display = hasVisible ? '' : 'none';
      }
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
    const detailView = document.getElementById('other-detail-view');
    const catalogView = document.getElementById('other-catalog-view');
    if (detailView && detailView.style.display !== 'none' && (query || '').trim() !== '') {
      detailView.style.display = 'none';
      if (catalogView) catalogView.style.display = 'block';
    }

    if (window.SuiteSearchEngine) {
      window.SuiteSearchEngine.search('other', query);
    }
  },

  resetSearch() {
    if (window.SuiteSearchEngine) {
      window.SuiteSearchEngine.reset('other');
    } else {
      const input = document.getElementById('other-catalog-search');
      if (input) input.value = '';
    }
  },

  openCalculator(calcId) {
    const catalogView = document.getElementById('other-catalog-view');
    const detailView = document.getElementById('other-detail-view');
    if (catalogView) catalogView.style.display = 'none';
    if (detailView) detailView.style.display = 'block';

    if (window.updateActiveCalculatorTitle) {
      window.updateActiveCalculatorTitle('other', calcId);
    }

    document.querySelectorAll('.other-calc-unit').forEach(panel => {
      panel.style.display = panel.id === calcId ? 'block' : 'none';
    });

    document.querySelectorAll('#other-detail-view .switcher-pill').forEach(pill => {
      pill.classList.toggle('active', pill.dataset.target === calcId);
    });

    const activePill = document.querySelector('#other-detail-view .switcher-pill.active');
    if (activePill) {
      var cont = activePill.closest('.switcher-pill-group');
      if (cont) {
        cont.scrollTo({ left: activePill.offsetLeft - (cont.clientWidth / 2) + (activePill.offsetWidth / 2), behavior: 'smooth' });
      }
    }

    // Automatically trigger initial calculation when opening tool
    try {
      if (calcId === 'sec-grade-calc') { if (this.gradeMode === 'weighted') { this.renderGradeCategories(); this.calcWeightedGrade(); } else { this.calcFinalGrade(); } }
      else if (calcId === 'sec-bra-size-calc') this.calcBraSize();
      else if (calcId === 'sec-fuel-cost-calc') this.calcFuelCost();
      else if (calcId === 'sec-mileage-calc') this.calcMileage();
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

    if (window.scrollToActiveCalculator) { window.scrollToActiveCalculator('other'); } else { window.scrollTo({ top: 0, behavior: 'smooth' }); }
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
