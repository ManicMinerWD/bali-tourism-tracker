/* =============================================================================
   MACTAN OPTION 2 — Punta Engaño, Cebu
   Renders MACTAN data from data.js into mactan.html
   ============================================================================= */
function renderMactan() {
  const d = DATA.mactan;
  if (!d) return;

  // ---- Land section ----
  const land = d.land;
  $("#mactanLandRow").innerHTML = `
    <div class="total-card"><div class="label">Lot area</div><div class="value">${land.area} m²</div><div class="sub">${land.frontage || ''}</div></div>
    <div class="total-card" style="background:var(--teal);color:#fff;"><div class="label" style="color:#fff;opacity:0.85;">Price (PHP)</div><div class="value">₱${land.pricePhp.toLocaleString()}</div><div class="sub" style="color:#fff;opacity:0.9;">≈ ${land.priceAud.toLocaleString()} AUD</div></div>
    <div class="total-card"><div class="label">Type</div><div class="value" style="font-size:14px;">${land.type}</div><div class="sub">${land.location}</div></div>
  `;

  // ---- Build budget phases table ----
  const phaseRows = d.build.phases.map(p => `
    <tr${p.coveredByCleared ? ' style="background:var(--sand);"':''}>
      <td><strong>${esc(p.name)}</strong></td>
      <td class="num">${p.php != null ? '₱' + p.php.toLocaleString() : '—'}</td>
      <td class="num">${p.aud != null ? '$' + p.aud.toLocaleString() : '—'}</td>
      <td>${p.coveredByCleared ? '✅ Within cleared $587k' : (p.ratio != null ? '📊 ' + p.ratio.toFixed(2) + '× covered' : 'deferred')}</td>
      <td class="muted" style="font-size:11px;">${esc(p.note || '')}</td>
    </tr>
  `).join('');
  $("#mactanPhaseTable tbody").innerHTML = phaseRows;

  // ---- Build breakdown table ----
  const bd = d.build.villaBreakdown;
  const breakdownRows = [
    ["Grey build — low (structure, roof, cladding, windows, doors, sliding)", bd.greyBuildLow],
    ["Staff quarters (caretaker, in-shell — keeps 6BR rentable)", bd.staffQuarters],
    ["Finishes (walls, cabinetry, wiring)", bd.finishes],
    ["Luxury metallic epoxy flooring", bd.luxuryEpoxyFlooring],
    ["Cabinetry — $2,000 AUD per bedroom + TV room (7 spaces)", bd.cabinetry],
    ["Kitchen upgrade — $10,000 AUD", bd.kitchenUpgrade],
    ["Bathrooms — $2,000 AUD each (7 baths: 6 ensuite + 1 common)", bd.bathrooms],
    ["Lot cost", bd.lotCost],
    ["Pool", bd.pool],
    ["Solar 10kW", bd.solar10kw],
    ["Contingency 10% (on build ex-lot)", bd.contingency10pct]
  ].map(r => `
    <tr><td>${esc(r[0])}</td><td class="num">₱${r[1].toLocaleString()}</td><td class="num">$${(r[1]/37.5).toLocaleString(undefined,{maximumFractionDigits:0})}</td></tr>
  `).join('');
  $("#mactanBreakdownTable tbody").innerHTML = breakdownRows;
  $("#mactanTotalPhp").textContent = '₱' + d.build.totalPhp.toLocaleString();
  $("#mactanTotalAud").textContent = '$' + d.build.totalAud.toLocaleString();
  $("#mactanGap").textContent = (d.build.totalAud - 587000) >= 0 ? '+' : '';
  $("#mactanGap").textContent += '$' + (d.build.totalAud - 587000).toLocaleString();
  $("#mactanGap").className = (d.build.totalAud - 587000) > 0 ? 'num' : 'num';
  $("#mactanGapNote").textContent = d.build.gapNote;

  // ---- Specs ----
  const s = d.build.specs;
  $("#mactanSpecsTable").innerHTML = `
    <tr><td style="width:140px;">Floors</td><td>${s.floors}-storey</td></tr>
    <tr><td>Floor area (per floor)</td><td>${s.floorAreaPerFloor} m²</td></tr>
    <tr><td>Total build area (approx)</td><td>${s.totalBuildArea} m²</td></tr>
    <tr><td>Bedrooms</td><td>${s.bedrooms}BR</td></tr>
    <tr><td>Bathrooms</td><td>${s.bathrooms} (6 ensuite + 1 common)</td></tr>
  `;
  $("#mactanSpecsNote").textContent = s.designNote;

  // ---- Market competitors ----
  const compRows = d.market.competitors.map(c => `
    <tr>
      <td><strong>${esc(c.name)}</strong></td>
      <td class="num">${c.beds}BR</td>
      <td class="num">${esc(c.rateUsd)}</td>
      <td class="num">${esc(c.rateAud)}</td>
      <td class="num">${esc(c.occupancy)}</td>
      <td class="num">${esc(c.monthlyAud)}</td>
      <td class="muted" style="font-size:11px;">${esc(c.source)}</td>
    </tr>
  `).join('');
  $("#mactanMarketTable tbody").innerHTML = compRows;

  // ---- Your target ----
  const t = d.market.yourTarget;
  $("#mactanYourTarget").innerHTML = `
    <td class="num" style="font-size:16px;font-weight:700;color:var(--teal);">${esc(t.rateUsd)}</td>
    <td class="num" style="font-size:16px;font-weight:700;color:var(--teal);">${esc(t.rateAud)}</td>
    <td class="num">${esc(t.occupancy)}</td>
    <td class="num" style="font-size:14px;">${esc(t.nightlyImplied)}</td>
  `;

  // ---- Premium scenarios ----
  const sc = d.market.premiumScenarios;
  const scenarioRows = [
    ["Market match (Anza $844/night)", sc.marketMatch.rateUsd, sc.marketMatch.occ, sc.marketMatch.monthlyAud, sc.marketMatch.annualAudNet75],
    ["Premium (superior styling, $1,100/night)", sc.premium.rateUsd, sc.premium.occ, sc.premium.monthlyAud, sc.premium.annualAudNet75],
    ["Premium high season ($1,400/night)", sc.premiumHigh.rateUsd, sc.premiumHigh.occ, sc.premiumHigh.monthlyAud, sc.premiumHigh.annualAudNet75]
  ].map(r => `
    <tr><td>${esc(r[0])}</td><td class="num">$${r[1]}/night</td><td class="num">${(r[2]*100).toFixed(0)}%</td><td class="num">$${r[3].toLocaleString()}</td><td class="num" style="font-weight:600;color:var(--teal);">$${r[4].toLocaleString()}</td></tr>
  `).join('');
  $("#mactanScenarioTable tbody").innerHTML = scenarioRows;

  // ---- Competition table (full) ----
  const fullCompRows = d.competition.map(c => `
    <tr>
      <td><a href="${esc(c.url)}" target="_blank" rel="noopener" style="color:var(--teal);font-size:11px;">${esc(c.platform)}</a></td>
      <td><strong>${esc(c.property)}</strong></td>
      <td class="num">${c.beds}BR</td>
      <td class="num">${c.baths != null ? c.baths + 'BA' : '—'}</td>
      <td>${esc(c.location)}</td>
      <td class="num">${esc(c.rateUsd)}</td>
      <td class="muted" style="font-size:11px;">${esc(c.feature)}</td>
      <td style="font-size:10px;color:${c.tier === 'YES' ? 'var(--teal)' : 'var(--muted)'};">${esc(c.tier)}</td>
      <td class="muted" style="font-size:10px;">${esc(c.note)}</td>
    </tr>
  `).join('');
  $("#mactanFullCompTable tbody").innerHTML = fullCompRows;

  // ---- Gapura villas (Punta Engaño) ----
  if (d.villas && d.villas.length > 0) {
    const villaRows = d.villas.map(v => `
      <tr>
        <td><strong>${esc(v.name)}</strong></td>
        <td class="num">${v.beds}BR</td>
        <td class="num">$${v.priceUsd.toLocaleString()}</td>
        <td class="num">${esc(v.rateUsd)}</td>
        <td class="num">${esc(v.occupancy)}</td>
        <td class="num">$${v.monthlyAud.toLocaleString()}</td>
        <td class="muted" style="font-size:11px;">${esc(v.source)}</td>
      </tr>`).join('');
    $("#mactanGapuraVillaTable tbody").innerHTML = villaRows;
    $("#mactanGapuraNote").innerHTML = d.villas.map(v =>
      `<div class="note" style="font-size:12px;margin-top:6px;"><strong>${esc(v.name)}:</strong> ${esc(v.verdict)}</div>`).join('');
  }

  // ---- Notes ----
  $("#mactanCompNote").textContent = d.competitionNote;
  $("#mactanPositioning").textContent = d.positioning;
  $("#mactanRiskNote").textContent = d.riskNote;
  $("#mactanSources").textContent = d.sources;
}
