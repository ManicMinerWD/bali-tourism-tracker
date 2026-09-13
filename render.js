/* =============================================================================
   Bali Tourism Tracker — chart + table renderers
   Reads DATA from data.js; renders into the sections below.
   ============================================================================= */
"use strict";

/* ---------- shared helpers ---------- */
const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => [...r.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]));
const el = (tag, attrs={}, children=[]) => {
  const e = document.createElement(tag);
  for (const k in attrs) {
    if (k === "className") e.className = attrs[k];
    else if (k === "textContent") e.textContent = attrs[k];
    else if (attrs[k] !== null && attrs[k] !== undefined) e.setAttribute(k, attrs[k]);
  }
  for (const c of children) e.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
  return e;
};

/* number formatting (matches data.js) */
const fmt = n => DATA._fmt(n);
const pct = p => DATA._pct(p);
const usd = u => DATA._usd(u);
const lab = (m,y) => DATA._lab(m,y);
const mon = m => DATA._mon[m-1];

/* =============================================================================
   1. ANNUAL ARRIVALS — chart + table
   ============================================================================= */
function renderAnnual() {
  const wrap = $("#annualWrap");
  if (!wrap) return;

  // table
  const rows = DATA.arrAnnual.map(d => {
    const intlM = (d.intl/1e6).toFixed(2);
    const domM = (d.dom/1e6).toFixed(2);
    const totM = ((d.intl+d.dom)/1e6).toFixed(2);
    return `<tr class="num">
      <td class="yr">${d.year}</td>
      <td>${intlM}<span class="unit">M</span></td>
      <td>${domM}<span class="unit">M</span></td>
      <td>${totM}<span class="unit">M</span></td>
      <td class="src">${esc(d.src)}</td>
    </tr>`;
  }).join("");
  wrap.querySelector("#annualTable tbody").innerHTML = rows;

  // chart
  const ctx = $("#annualChart");
  if (ctx) {
    new Chart(ctx, {
      type:"bar",
      data:{
        labels: DATA.arrAnnual.map(d=>d.year),
        datasets:[
          { label:"International", data:DATA.arrAnnual.map(d=>d.intl), backgroundColor:"#0d4f4f", borderRadius:4 },
          { label:"Domestic", data:DATA.arrAnnual.map(d=>d.dom), backgroundColor:"#e07856", borderRadius:4 },
        ]
      },
      options:{
        responsive:true,
        plugins:{
          title:{ display:true, text:"Bali annual arrivals — international vs domestic", color:"#1a1a1a", font:{size:14, weight:"600"}, padding:{bottom:12} },
          tooltip:{ callbacks:{ label:ctx=>ctx.dataset.label+"  "+(ctx.raw/1000).toFixed(1)+"M" } }
        },
        scales:{
          y:{ beginAtZero:true, ticks:{ callback:v=>(v/1e6).toFixed(0)+"M" }, grid:{ color:"#f0ebe0" } },
          x:{ grid:{ display:false } }
        }
      }
    });
  }
}

/* =============================================================================
   2. MONTHLY ARRIVALS — chart + table (2025 + 2026)
   ============================================================================= */
function renderMonthly() {
  const wrap = $("#monthlyWrap");
  if (!wrap) return;

  // 2025 rows (Jan–Dec)
  const rows2025 = DATA.arrMonthly.filter(d=>d.y===2025).map(d=>`
    <tr${d.est?" class=\"est\"":""}>
      <td>${mon(d.m)} 2025</td>
      <td class="num">${fmt(d.intl)}</td>
      <td class="num">${fmt(d.dom)}</td>
      <td class="num">${fmt(d.intl+d.dom)}</td>
    </tr>`).join("");

  // 2026 rows (Jan–Jul)
  const rows2026 = DATA.arrMonthly.filter(d=>d.y===2026).map(d=>`
    <tr${d.est?" class=\"est\"":""}>
      <td>${mon(d.m)} 2026</td>
      <td class="num">${fmt(d.intl)}</td>
      <td class="num">${fmt(d.dom)}</td>
      <td class="num">${fmt(d.intl+d.dom)}</td>
    </tr>`).join("");

  const tbody = $("#monthlyTable tbody");
  if (tbody) {
    tbody.innerHTML = `
      <tr><th colspan="4" class="subhead">2025 (full year, BPS)</th></tr>
      ${rows2025}
      <tr><th colspan="4" class="subhead">2026 (through July; Jun–Jul estimated)</th></tr>
      ${rows2026}
      <tr class="note-row"><td colspan="4">Rows marked <span class="est-badge">EST</span> are estimates pending BPS release.</td></tr>
    `;
  }

  // chart: 2025 Jan–Dec + 2026 Jan–Jul as one series (dual color by year)
  const ctx = $("#monthlyChart");
  if (ctx) {
    const all = [...DATA.arrMonthly.filter(d=>d.y===2025), ...DATA.arrMonthly.filter(d=>d.y===2026 && d.m<=7)];
    const labels = all.map(d=>d.y===2026 ? mon(d.m)+" '"+(d.y.toString().slice(2)) : mon(d.m));
    const colors = all.map(d=> d.y===2025 ? "rgba(13,79,79,0.8)" : "rgba(224,120,86,0.85)");
    new Chart(ctx, {
      type:"line",
      data:{
        labels,
        datasets:[
          { label:"Foreign arrivals", data:all.map(d=>d.intl), borderColor:"#0d4f4f", backgroundColor:"rgba(13,79,79,0.08)", fill:true, tension:0.3, pointRadius:3, pointHoverRadius:6, borderWidth:2 },
          { label:"Domestic arrivals", data:all.map(d=>d.dom), borderColor:"#e07856", backgroundColor:"rgba(224,120,86,0.05)", fill:true, tension:0.3, pointRadius:2, pointHoverRadius:5, borderWidth:2, borderDash:[4,3] },
        ]
      },
      options:{
        responsive:true,
        plugins:{
          title:{ display:true, text:"Bali monthly arrivals — international (solid) vs domestic (dashed)", color:"#1a1a1a", font:{size:14, weight:"600"}, padding:{bottom:12} },
          tooltip:{ callbacks:{ label:ctx=>ctx.dataset.label+"  "+fmt(ctx.raw) } },
          legend:{ position:"top" }
        },
        scales:{
          y:{ beginAtZero:false, ticks:{ callback:v=>(v/1000).toFixed(0)+"k" }, grid:{ color:"#f0ebe0" } },
          x:{ grid:{ display:false }, ticks:{ maxTicksLimit:14 } }
        }
      }
    });
  }
}

/* =============================================================================
   3. GATE ARRIVALS (BPS) — chart + table
   ============================================================================= */
function renderGate() {
  const wrap = $("#gateWrap");
  if (!wrap) return;

  // table
  const rows = DATA.gate2026.map(d=>{
    const tot = d.airport + d.harbour;
    return `<tr>
      <td>${mon(d.m)} ${d.y}</td>
      <td class="num">${fmt(d.airport)}</td>
      <td class="num">${fmt(d.harbour)}</td>
      <td class="num">${fmt(tot)}</td>
      <td class="pct">${(d.harbour/tot*100).toFixed(1)}%</td>
    </tr>`;
  }).join("");
  const tbody = $("#gateTable tbody");
  if (tbody) tbody.innerHTML = rows;

  const gn = $("#gateNote");
  if (gn) gn.innerHTML = `<strong>Note:</strong> BPS gate data counts all foreign visitors passing through Bali's entry points (including transit and same-day entries). Total airport + harbour exceeds the headline "foreign tourist arrivals" figure because the gate table is broader — it captures all foreign entry, not just overnight tourists. Harbour share is small but growing with cruise traffic. Source: <a href="https://bali.bps.go.id/en/statistics-table/2/MTA2IzI=/" target="_blank" rel="noopener">BPS Bali gate table</a>.`;

  // chart
  const ctx = $("#gateChart");
  if (ctx) {
    new Chart(ctx, {
      type:"bar",
      data:{
        labels: DATA.gate2026.map(d=>mon(d.m)),
        datasets:[
          { label:"Ngurah Rai Airport", data:DATA.gate2026.map(d=>d.airport), backgroundColor:"#0d4f4f", borderRadius:4 },
          { label:"Bali Harbour", data:DATA.gate2026.map(d=>d.harbour), backgroundColor:"#e07856", borderRadius:4 },
        ]
      },
      options:{
        responsive:true,
        plugins:{
          title:{ display:true, text:"Foreign visitors by entry point — BPS Bali gate data (Jan–Jul 2026)", color:"#1a1a1a", font:{size:14, weight:"600"}, padding:{bottom:12} },
          tooltip:{ callbacks:{ label:ctx=>ctx.dataset.label+"  "+fmt(ctx.raw) } },
          legend:{ position:"top" }
        },
        scales:{
          y:{ beginAtZero:true, ticks:{ callback:v=>(v/1000).toFixed(0)+"k" }, grid:{ color:"#f0ebe0" } },
          x:{ grid:{ display:false } }
        }
      }
    });
  }
}

/* =============================================================================
   4. TOP SOURCE MARKETS — 2025 full year + March 2026 snapshot
   ============================================================================= */
function renderMarkets() {
  const wrap = $("#marketsWrap");
  if (!wrap) return;

  // 2025 table
  const rows2025 = DATA.market2025.map(d=>`
    <tr class="num">
      <td>${d.rank}</td>
      <td>${esc(d.country)}</td>
      <td class="num">${fmt(d.arrivals)}</td>
      <td class="pct">${d.share.toFixed(2)}%</td>
      <td>${esc(d.yoy)}</td>
    </tr>`).join("");
  const tbody2025 = $("#markets2025 tbody");
  if (tbody2025) tbody2025.innerHTML = rows2025;

  // chart: 2025 top 10
  const ctx2025 = $("#marketsChart2025");
  if (ctx2025) {
    new Chart(ctx2025, {
      type:"bar",
      data:{
        labels: DATA.market2025.map(d=>d.country),
        datasets:[{ label:"2025 arrivals", data:DATA.market2025.map(d=>d.arrivals), backgroundColor:DATA.market2025.map((_,i)=> i===0 ? "#0d4f4f" : "rgba(13,79,79,0.7)"), borderRadius:3 }]
      },
      options:{
        indexAxis:"y",
        responsive:true,
        plugins:{
          title:{ display:true, text:"Top 10 source markets — Bali 2025 (full year)", color:"#1a1a1a", font:{size:14, weight:"600"}, padding:{bottom:12} },
          tooltip:{ callbacks:{ label:ctx=>(ctx.raw/1000).toFixed(0)+"k arrivals  ("+DATA.market2025[ctx.dataIndex].share.toFixed(1)+"% share)" } }
        },
        scales:{
          x:{ ticks:{ callback:v=>(v/1000).toFixed(0)+"k" }, grid:{ color:"#f0ebe0" } },
          y:{ grid:{ display:false } }
        }
      }
    });
  }

  // March 2026 snapshot note
  const note = $("#marketsNote");
  if (note) note.textContent = DATA.march2026SnapshotNote;
}

/* =============================================================================
   5. HOTEL OCCUPANCY (BPS TPK) — chart + table
   ============================================================================= */
function renderHotelOccupancy() {
  const wrap = $("#hotelOccWrap");
  if (!wrap) return;

  // star table
  const starRows = DATA.tpkStar.map(d=>`
    <tr>
      <td>${mon(d.m)} ${d.y}</td>
      <td class="pct num">${d.v.toFixed(2)}%</td>
    </tr>`).join("");
  $("#tpkStarTable tbody").innerHTML = starRows;

  // non-star table
  const nsRows = DATA.tpkNonStar.map(d=>`
    <tr>
      <td>${mon(d.m)} ${d.y}</td>
      <td class="pct num">${d.v.toFixed(2)}%</td>
    </tr>`).join("");
  $("#tpkNonStarTable tbody").innerHTML = nsRows;

  // April 2026 by region
  const regRows = DATA.tpkApril2026ByRegion.map(d=>`
    <tr>
      <td>${esc(d.region)}</td>
      <td class="pct num">${d.tpk.toFixed(2)}%</td>
      <td class="note">${esc(d.note)}</td>
    </tr>`).join("");
  $("#tpkRegionTable tbody").innerHTML = regRows;

  // star chart
  const ctxStar = $("#tpkStarChart");
  if (ctxStar) {
    new Chart(ctxStar, {
      type:"line",
      data:{
        labels: DATA.tpkStar.map(d=>mon(d.m)+" '"+d.y.toString().slice(2)),
        datasets:[{ label:"Star-rated hotels (TPK)", data:DATA.tpkStar.map(d=>d.v), borderColor:"#0d4f4f", backgroundColor:"rgba(13,79,79,0.1)", fill:true, tension:0.3, pointRadius:4, pointHoverRadius:7, borderWidth:2.5 }]
      },
      options:{
        responsive:true,
        plugins:{
          title:{ display:true, text:"Bali star-rated hotel room occupancy (TPK) — BPS", color:"#1a1a1a", font:{size:14, weight:"600"}, padding:{bottom:12} },
          tooltip:{ callbacks:{ label:ctx=>ctx.raw.toFixed(2)+"% occupancy" } }
        },
        scales:{
          y:{ min:20, max:80, ticks:{ callback:v=>v+"%" }, grid:{ color:"#f0ebe0" } },
          x:{ grid:{ display:false }, ticks:{ maxTicksLimit:12 } }
        }
      }
    });
  }

  // non-star chart
  const ctxNs = $("#tpkNonStarChart");
  if (ctxNs) {
    new Chart(ctxNs, {
      type:"line",
      data:{
        labels: DATA.tpkNonStar.map(d=>mon(d.m)+" '"+d.y.toString().slice(2)),
        datasets:[{ label:"Non-star / other (TPK)", data:DATA.tpkNonStar.map(d=>d.v), borderColor:"#e07856", backgroundColor:"rgba(224,120,86,0.1)", fill:true, tension:0.3, pointRadius:3, pointHoverRadius:6, borderWidth:2, borderDash:[4,3] }]
      },
      options:{
        responsive:true,
        plugins:{
          title:{ display:true, text:"Bali non-star hotel & other accommodation TPK — BPS", color:"#1a1a1a", font:{size:14, weight:"600"}, padding:{bottom:12} },
          tooltip:{ callbacks:{ label:ctx=>ctx.raw.toFixed(2)+"% occupancy" } }
        },
        scales:{
          y:{ min:20, max:50, ticks:{ callback:v=>v+"%" }, grid:{ color:"#f0ebe0" } },
          x:{ grid:{ display:false }, ticks:{ maxTicksLimit:10 } }
        }
      }
    });
  }
}

/* =============================================================================
   6. LENGTH OF STAY — table
   ============================================================================= */
function renderLOS() {
  const wrap = $("#losWrap");
  if (!wrap) return;

  // 2026 monthly
  const rows2026 = DATA.losMonthly2026.map(d=>`
    <tr>
      <td>${mon(d.m)} ${d.y}</td>
      <td class="num">${d.foreign.toFixed(2)}</td>
      <td class="num">${d.domestic.toFixed(2)}</td>
      <td class="num">${d.total.toFixed(2)}</td>
    </tr>`).join("");
  $("#los2026 tbody").innerHTML = rows2026;

  // 2025 annual
  const a = DATA.los2025Annual;
  $("#los2025Annual tbody").innerHTML = `
    <tr><td>2025 (full year)</td><td class="num">${a.foreign.toFixed(2)}</td><td class="num">${a.domestic.toFixed(2)}</td><td class="note">${esc(a.note)}</td></tr>
  `;
}

/* =============================================================================
   7. BALI ECONOMY (GDP) — chart + table
   ============================================================================= */
function renderEconomy() {
  const wrap = $("#economyWrap");
  if (!wrap) return;

  // GDP by quarter table
  const qRows = DATA.gdpQuarterly.map(d=>`
    <tr>
      <td>${d.y} ${d.q}</td>
      <td class="pct num">${d.g.toFixed(2)}%</td>
    </tr>`).join("");
  $("#gdpQuarterTable tbody").innerHTML = qRows;

  // full year table
  const fyRows = DATA.gdpFullYear.map(d=>`
    <tr>
      <td>${d.y} (full year)</td>
      <td class="pct num">${d.g.toFixed(2)}%</td>
    </tr>`).join("");
  $("#gdpFullYearTable tbody").innerHTML = fyRows;

  // 2026 Q1
  const q1 = DATA.gdp2026Q1;
  $("#gdpQ1Table tbody").innerHTML = `
    <tr><td>${q1.y} ${q1.q} (preliminary)</td><td class="pct num">${q1.g.toFixed(2)}%</td><td class="note">${esc(q1.note)}</td></tr>
  `;

  // tourism share callout
  const ts = $("#tourismShare");
  if (ts) ts.innerHTML = `<span class="big-num">${DATA.tourismShare2024.toFixed(2)}%</span> of Bali GDP (2024) — tourism sector contribution`;

  // GDP chart
  const ctx = $("#gdpChart");
  if (ctx) {
    const labels = [...DATA.gdpQuarterly.map(d=>d.y+" "+d.q), ...DATA.gdpFullYear.map(d=>d.y+" (FY)"), DATA.gdp2026Q1.y+" "+DATA.gdp2026Q1.q];
    const values = [...DATA.gdpQuarterly.map(d=>d.g), ...DATA.gdpFullYear.map(d=>d.g), DATA.gdp2026Q1.g];
    const colors = [...DATA.gdpQuarterly.map(()=>"#0d4f4f"), ...DATA.gdpFullYear.map(()=>"#14706b"), "#e07856"];
    new Chart(ctx, {
      type:"bar",
      data:{
        labels,
        datasets:[{ label:"Bali GDP growth (YoY %)", data:values, backgroundColor:colors, borderRadius:3 }]
      },
      options:{
        responsive:true,
        plugins:{
          title:{ display:true, text:"Bali provincial GDP growth — BPS", color:"#1a1a1a", font:{size:14, weight:"600"}, padding:{bottom:12} },
          tooltip:{ callbacks:{ label:ctx=>ctx.raw.toFixed(2)+"% YoY" } },
          legend:{ display:false }
        },
        scales:{
          y:{ beginAtZero:true, ticks:{ callback:v=>v+"%" }, grid:{ color:"#f0ebe0" } },
          x:{ grid:{ display:false }, ticks:{ maxTicksLimit:10, font:{size:10} } }
        }
      }
    });
  }
}

/* =============================================================================
   8. STR / AIRBNB MARKET — summary cards
   ============================================================================= */
function renderSTR() {
  const wrap = $("#strWrap");
  if (!wrap) return;

  const a = DATA.strMarket.airbnb;
  const ad = DATA.strMarket.airdna;
  const vm = DATA.strMarket.villaMarket;

  wrap.querySelector("#strCards").innerHTML = `
    <div class="stat-card airbnb">
      <h3>Airbnb (Airbtics)</h3>
      <p class="period">${esc(a.period)}</p>
      <div class="big-num">${a.occupancy}%</div>
      <p class="stat-label">Median occupancy</p>
      <p class="stat-sub">1yr change ${a.occupancyChange1y>0?"+":""}${a.occupancyChange1y}% · 3yr ${a.occupancyChange3y>0?"+":""}${a.occupancyChange3y}%</p>
      <p class="stat-note">${esc(a.note)}</p>
    </div>
    <div class="stat-card airdna">
      <h3>AirDNA (all STR)</h3>
      <div class="stat-grid">
        <div><div class="big-num">${ad.occupancy}%</div><p class="stat-label">Occupancy</p><p class="stat-sub">${ad.occupancyChange>0?"+":""}${ad.occupancyChange}% YoY</p></div>
        <div><div class="big-num">${usd(ad.adr)}</div><p class="stat-label">ADR</p><p class="stat-sub">${ad.adrChange>0?"+":""}${ad.adrChange}% YoY</p></div>
        <div><div class="big-num">${usd(ad.revpar)}</div><p class="stat-label">RevPAR</p><p class="stat-sub">${ad.revparChange>0?"+":""}${ad.revparChange}% YoY</p></div>
        <div><div class="big-num">${ad.activeListings.toLocaleString()}</div><p class="stat-label">Active listings</p><p class="stat-sub">${ad.activeListingsChange>0?"+":""}${ad.activeListingsChange}% YoY</p></div>
      </div>
      <p class="stat-note">${esc(ad.note)}</p>
    </div>
    <div class="stat-card villa">
      <h3>Villa / STR market</h3>
      <div class="stat-grid">
        <div><div class="big-num">${vm.occupancy}%</div><p class="stat-label">Median occupancy</p></div>
        <div><div class="big-num">~${usd(vm.adr)}</div><p class="stat-label">ADR</p><p class="stat-sub">${esc(vm.adrRange)}</p></div>
      </div>
      <p class="period">${esc(vm.period)}</p>
      <p class="stat-note">${esc(vm.note)}</p>
    </div>
  `;

  const disc = $("#strDisclaimer");
  if (disc) disc.textContent = DATA.strMarket.disclaimer;
}

/* =============================================================================
   9. PROPERTY PRICES & ADR BY ZONE — grids
   ============================================================================= */
function renderPriceAdr() {
  const wrap = $("#priceAdrWrap");
  if (!wrap) return;

  // price grid table
  const priceHeader = `<tr><th>Area</th>${DATA.bedrooms.map(b=>`<th>${b}-BR</th>`).join("")}</tr>`;
  const priceRows = DATA.areas.map((area,i)=>`
    <tr>
      <td class="area-name">${esc(area)}</td>
      ${DATA.bedrooms.map(b=>`
        <td class="num${DATA.priceGridUsd[i][b-1]===0?" blank":""}">${DATA.priceGridUsd[i][b-1]===0?"—":usd(DATA.priceGridUsd[i][b-1])}</td>
      `).join("")}
    </tr>`).join("");
  $("#priceGridTable thead").innerHTML = priceHeader;
  $("#priceGridTable tbody").innerHTML = priceRows;

  // ADR grid table
  const adrHeader = `<tr><th>Area</th>${DATA.bedrooms.map(b=>`<th>${b}-BR</th>`).join("")}</tr>`;
  const adrRows = DATA.areas.map((area,i)=>`
    <tr>
      <td class="area-name">${esc(area)}</td>
      ${DATA.bedrooms.map(b=>`
        <td class="num">${usd(DATA.adrGridUsd[i][b-1])}</td>
      `).join("")}
    </tr>`).join("");
  $("#adrGridTable thead").innerHTML = adrHeader;
  $("#adrGridTable tbody").innerHTML = adrRows;

  // price/sqm + avg size note
  const ps = $("#priceSqmNote");
  if (ps) {
    const apt = DATA.pricePerSqm.apartment;
    const vil = DATA.pricePerSqm.villa;
    ps.innerHTML = `
      <p><strong>Price per sqm (USD, Q3 2025):</strong> Apartments — 1BR $${apt[1].toLocaleString()} / 2BR $${apt[2].toLocaleString()}. Villas — 1BR $${vil[1].toLocaleString()} / 2BR $${vil[2].toLocaleString()} / 3BR $${vil[3].toLocaleString()} / 4BR $${vil[4].toLocaleString()} / 5BR $${vil[5].toLocaleString()} / 6BR $${vil[6].toLocaleString()}.</p>
      <p><strong>Average size (sqm):</strong> 1BR ${DATA.avgSizeSqm[1]} · 2BR ${DATA.avgSizeSqm[2]} · 3BR ${DATA.avgSizeSqm[3]} · 4BR ${DATA.avgSizeSqm[4]} · 5BR ${DATA.avgSizeSqm[5]} · 6BR ${DATA.avgSizeSqm[6]}.</p>
      <p class="stat-note">Source: Reid Real Info 2025 Market Report via Investlandbali.com.</p>
    `;
  }
}

/* =============================================================================
   10. HOTEL REPORT HIGHLIGHTS
   ============================================================================= */
function renderHotelReport() {
  const wrap = $("#hotelReportWrap");
  if (!wrap) return;

  const h = DATA.hotelReport;
  $("#hotelReportTitle").textContent = h.source;
  $("#hotelReportList").innerHTML = h.highlights.map(t=>`<li>${esc(t)}</li>`).join("");
}

/* =============================================================================
   VILLA SHORTLIST — sidebar submenu
   ============================================================================= */
function renderVillaShortlist() {
  const menu = $("#villaSubmenu");
  if (!menu) return;
  const list = DATA.villaShortlist || [];
  menu.innerHTML = list.map(v => `
    <li>
      <a class="nav-link" href="${esc(v.url)}" target="_blank" rel="noopener">
        <span class="villa-name">${esc(v.name)}</span>
        <span class="villa-detail">
          ${v.flag} ${esc(v.zone)}${v.br != null ? " · " + v.br + "BR" : ""}${v.priceUsd != null ? " · $" + v.priceUsd.toLocaleString("en-AU") : ""}
          ${v.leaseTo ? " · lease to "+v.leaseTo : ""}
          ${v.status.indexOf("Completed")>=0 ? " · Available now" : " · "+esc(v.status)}
        </span>
        ${v.zoning && v.zoning.toLowerCase().indexOf("not stated")>=0
          ? `<span class="x-ref">⚠ Zoning not stated — confirm</span>`
          : `<span class="x-ref">${esc(v.zoning)}</span>`}
      </a>
    </li>
  `).join("");
}

/* =============================================================================
   INVESTMENT SUBMENU — sidebar list of investment table rows
   ============================================================================= */
function renderInvestmentSubmenu() {
  const menu = $("#investmentTableSubmenu");
  if (!menu) return;
  const list = DATA.investmentTable || [];
  menu.innerHTML = list.map(v => `
    <li>
      <a class="nav-link" href="#investmentTableWrap">
        <span class="villa-name">${esc(v.name)}</span>
        <span class="villa-detail">
          ${esc(v.location)}${v.beds != null ? " · "+v.beds+"BR" : ""}${v.priceUsd != null ? " · $"+v.priceUsd.toLocaleString("en-AU") : ""}
        </span>
        <span class="x-ref">${esc(v.roi)}</span>
      </a>
    </li>
  `).join("");
}

/* =============================================================================
   INVESTMENT TABLE — full comparison table in main content
   ============================================================================= */
function renderInvestmentTable() {
  const tbody = $("#investmentTable tbody");
  if (!tbody) return;
  const rows = (DATA.investmentTable || []).map(v => {
    const beds = v.beds != null ? (typeof v.beds === "number" ? v.beds+"BR" : String(v.beds)) : "—";
    const price = v.priceUsd != null ? "$"+v.priceUsd.toLocaleString("en-AU") : "—";
    const lease = v.leaseTo != null ? v.leaseTo : "—";
    return `<tr>
      <td><strong>${esc(v.name)}</strong><br><span class="muted" style="font-size:12px;">${esc(v.id)}</span></td>
      <td>${esc(v.location)}</td>
      <td class="num">${beds}</td>
      <td class="num">${price}</td>
      <td>${esc(v.roi)}</td>
      <td>${esc(v.status)}</td>
      <td class="num">${lease}</td>
      <td class="muted" style="font-size:12px;">${esc(v.operator)}</td>
      <td class="verdict-cell">${esc(v.verdict)}</td>
    </tr>`;
  }).join("");
  tbody.innerHTML = rows;
}

/* =============================================================================
   108 QUEENSBERRY ST — SALE HISTORY TABLE
   ============================================================================= */
function renderQueensberrySales() {
  const tbody = $("#queensberryTable tbody");
  if (!tbody) return;
  const rows = (DATA.queensberrySales || []).map(v => {
    const parking = v.parking != null ? v.parking : "—";
    return `<tr>
      <td><strong>${esc(v.unit)}</strong></td>
      <td class="num">${v.beds}</td>
      <td class="num">${v.baths}</td>
      <td class="num">${parking}</td>
      <td class="num">$${v.price.toLocaleString("en-AU")}</td>
      <td>${esc(v.date)}</td>
      <td class="muted"><a href="${esc(v.link)}" target="_blank" rel="noopener">Domain</a></td>
    </tr>`;
  }).join("");
  tbody.innerHTML = rows;
}

/* =============================================================================
   143 SUSSEX ST — SALE HISTORY TABLE
   ============================================================================= */
function renderSussexSales() {
  const tbody = $("#sussexTable tbody");
  if (!tbody) return;
  const rows = (DATA.sussexSales || []).map(v => {
    const parking = v.parking != null ? v.parking : "—";
    return `<tr>
      <td><strong>${esc(v.unit)}</strong></td>
      <td class="num">${v.beds}</td>
      <td class="num">${v.baths}</td>
      <td class="num">${parking}</td>
      <td class="num">$${v.price.toLocaleString("en-AU")}</td>
      <td>${esc(v.date)}</td>
      <td class="muted"><a href="${esc(v.link)}" target="_blank" rel="noopener">Domain</a></td>
    </tr>`;
  }).join("");
  tbody.innerHTML = rows;
}

/* =============================================================================
   BOOT — render everything, set last-updated
   ============================================================================= */
function boot() {
  const lu = $("#lastUpdated");
  if (lu) lu.textContent = "Last updated: " + DATA.lastUpdated;

  renderVillaShortlist();
  renderInvestmentSubmenu();
  renderInvestmentTable();
  renderAnnual();
  renderMonthly();
  renderGate();
  renderMarkets();
  renderHotelOccupancy();
  renderLOS();
  renderEconomy();
  renderSTR();
  renderPriceAdr();
  renderHotelReport();
  renderQueensberrySubmenu();
  renderQueensberrySales();
  renderSussexSubmenu();
  renderSussexSales();
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
else boot();
