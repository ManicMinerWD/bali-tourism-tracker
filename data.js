// =============================================================================
// Bali Tourism Tracker — data.js
// Single source of truth. Edits go here; commit + push rebuilds the live site.
// Last updated: 2026-09-13T18:00
// =============================================================================

"use strict";

/* ---------- shared date helpers ---------- */
const _mon = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const _monFull = ["January","February","March","April","May","June","July","August","September","October","November","December"];

/* ---------- number formatting ---------- */
const _fmt = n => {
  if (n == null) return "—";
  if (Math.abs(n) >= 1e9) return (n/1e9).toFixed(2) + "B";
  if (Math.abs(n) >= 1e6) return (n/1e6).toFixed(2) + "M";
  if (Math.abs(n) >= 1e3) return (n/1e3).toFixed(1) + "K";
  return n.toLocaleString("en-AU");
};
const _pct = p => (p == null ? "—" : p.toFixed(1) + "%");
const _usd = u => (u == null ? "—" : "$" + u.toLocaleString("en-AU"));
const _lab = (m,y) => _monFull[m-1] + " " + y;

/* =============================================================================
   ANNUAL TOTALS — BPS Bali annual tourist arrivals
   ============================================================================= */
const ARR_ANNUAL = [
  { year: 2019, intl: 6520000, dom: 24996099, src: "bps-balinese-arrivals" },
  { year: 2020, intl: 1110000, dom: 6808965, src: "bps-balinese-arrivals" },
  { year: 2021, intl: 210000, dom: 3930032, src: "bps-balinese-arrivals" },
  { year: 2022, intl: 2700000, dom: 18061127, src: "bps-balinese-arrivals" },
  { year: 2023, intl: 5403900, dom: 24900000, src: "bps-balinese-arrivals" },
  { year: 2024, intl: 5950000, dom: 26200000, src: "bps-balinese-arrivals" },
  { year: 2025, intl: 6950000, dom: 26615306, src: "antarabpsmar2026.md" },
];

/* =============================================================================
   MONTHLY ARRIVALS — BPS Bali monthly foreign + domestic arrivals
   ============================================================================= */
const ARR_MONTHLY = [
  // ---- 2025 ----
  { m:1,y:2025, intl:576397, dom:2266235 },
  { m:2,y:2025, intl:503775, dom:2028061 },
  { m:3,y:2025, intl:585598, dom:2249615 },
  { m:4,y:2025, intl:587573, dom:2272007 },
  { m:5,y:2025, intl:594441, dom:2260422 },
  { m:6,y:2025, intl:576025, dom:2250818 },
  { m:7,y:2025, intl:556926, dom:2210225 },
  { m:8,y:2025, intl:592557, dom:2297617 },
  { m:9,y:2025, intl:512623, dom:2147543 },
  { m:10,y:2025, intl:541315, dom:2169945 },
  { m:11,y:2025, intl:503861, dom:2133435 },
  { m:12,y:2025, intl:439690, dom:2006927 },
  // ---- 2026 (Jan–May from BPS; Jun–Jul estimated) ----
  { m:1,y:2026, intl:532105, dom:2122665 },
  { m:2,y:2026, intl:482494, dom:1974488 },
  { m:3,y:2026, intl:471026, dom:1959646 },
  { m:4,y:2026, intl:477991, dom:2000374 },
  { m:5,y:2026, intl:473900, dom:1991267 },
  { m:6,y:2026, intl:530000, dom:2150000, est:true },
  { m:7,y:2026, intl:520000, dom:2110000, est:true },
];

/* =============================================================================
   BPS GATE DATA — 2026 monthly foreign arrivals by entry point
   ============================================================================= */
const GATE_2026 = [
  { mon:1, airport:532105, harbour:1204, total:533309 },
  { mon:2, airport:482494, harbour:1023, total:483517 },
  { mon:3, airport:471026, harbour:969, total:471995 },
  { mon:4, airport:477991, harbour:1422, total:479413 },
  { mon:5, airport:473900, harbour:1386, total:475286 },
  { mon:6, airport:530000, harbour:1755, total:531755, est:true },
  { mon:7, airport:520000, harbour:1700, total:521700, est:true },
];

const BPS_GATE_NOTE = "BPS gate data counts all foreign visitors passing through Bali's entry points — not just overnight tourists. Source: https://bali.bps.go.id";

/* =============================================================================
   TOP SOURCE MARKETS — 2025 full year
   ============================================================================= */
const MARKET_2025 = [
  { rank:1, market:"Australia", visitors:1598018, share:0.230, yoy:"+5.2%" },
  { rank:2, market:"India", visitors:666945, share:0.096, yoy:"+11.8%" },
  { rank:3, market:"China", visitors:532159, share:0.077, yoy:"+18.6%" },
  { rank:4, market:"Malaysia", visitors:320504, share:0.046, yoy:"+2.1%" },
  { rank:5, market:"Japan", visitors:278151, share:0.040, yoy:"-12.4%" },
  { rank:6, market:"Singapore", visitors:278117, share:0.040, yoy:"-13.4%" },
  { rank:7, market:"South Korea", visitors:215199, share:0.031, yoy:"+15.2%" },
  { rank:8, market:"United States", visitors:203018, share:0.029, yoy:"+1.8%" },
  { rank:9, market:"Taiwan", visitors:170207, share:0.025, yoy:"+8.3%" },
  { rank:10, market:"Netherlands", visitors:157843, share:0.023, yoy:"+10.1%" },
];

/* =============================================================================
   HOTEL OCCUPANCY (TPK) — BPS Bali
   ============================================================================= */
const TPK_STAR = [
  { mon:1, tpk:45.99 },
  { mon:2, tpk:47.31 },
  { mon:3, tpk:50.57 },
  { mon:4, tpk:52.42 },
  { mon:5, tpk:53.68 },
  { mon:6, tpk:54.88 },
  { mon:7, tpk:60.79 },
  { mon:8, tpk:62.15 },
  { mon:9, tpk:58.34 },
  { mon:10, tpk:56.21 },
  { mon:11, tpk:54.08 },
  { mon:12, tpk:52.93 },
];

const TPK_NONSTAR = [
  { mon:1, tpk:36.99 },
  { mon:2, tpk:31.98 },
  { mon:3, tpk:33.70 },
  { mon:4, tpk:32.75 },
  { mon:5, tpk:30.84 },
  { mon:6, tpk:33.69 },
  { mon:7, tpk:37.54 },
  { mon:8, tpk:38.92 },
  { mon:9, tpk:36.18 },
  { mon:10, tpk:34.55 },
  { mon:11, tpk:33.02 },
  { mon:12, tpk:31.87 },
];

/* =============================================================================
   LENGTH OF STAY — star-rated hotels, BPS Bali
   ============================================================================= */
const LOS_MONTHLY_2026 = [
  { month:1, foreign:3.78, domestic:2.60, total:3.25 },
  { month:2, foreign:3.79, domestic:2.60, total:3.24 },
  { month:3, foreign:3.58, domestic:2.54, total:3.11 },
  { month:4, foreign:3.58, domestic:2.56, total:3.12 },
  { month:5, foreign:3.55, domestic:2.52, total:3.08 },
  { month:6, foreign:3.50, domestic:2.50, total:3.05 },
  { month:7, foreign:3.48, domestic:2.48, total:3.02 },
];

/* =============================================================================
   BALI ECONOMY (GDP) — BPS Bali
   ============================================================================= */
const GDP_QUARTERLY = [
  { quarter:"2024 Q1", gdp:4.43 },
  { quarter:"2024 Q2", gdp:4.58 },
  { quarter:"2024 Q3", gdp:4.50 },
  { quarter:"2024 Q4", gdp:4.53 },
  { quarter:"2025 Q1", gdp:4.78 },
  { quarter:"2025 Q2", gdp:5.02 },
  { quarter:"2025 Q3", gdp:4.88 },
  { quarter:"2025 Q4", gdp:4.90 },
  { quarter:"2026 Q1 (prelim)", gdp:5.62 },
];

const GDP_FULL_YEAR = [
  { year:2022, gdp:4.98 },
  { year:2023, gdp:4.83 },
  { year:2024, gdp:4.53 },
  { year:2025, gdp:4.90 },
];

const GDP_2026_Q1 = { quarter:"2026 Q1 (preliminary)", gdp:5.62, note:"Antara News — highest quarterly growth in recent years" };
const TOURISM_SHARE_2024 = 21.75;

/* =============================================================================
   STR / AIRBNB MARKET — private platforms (not BPS)
   ============================================================================= */
const STR_MARKET = {
  airbnb: {
    source: "AirDNA",
    occupancy: 57,
    occupancyChange: "+33.0%",
    adr: 132,
    adrChange: "-12.5%",
    activeListings: 47916,
    activeListingsChange: "-46.5%",
  },
  airdna: {
    source: "AirDNA (all STR)",
    occupancy: 65,
    occupancyChange: "+33.0%",
    adr: 132,
    adrChange: "-12.5%",
    activeListings: 47916,
    activeListingsChange: "-46.5%",
    period: "2025",
  },
  villaMarket: {
    source: "Villa Finder / Hospitable",
    occupancy: 65,
    occupancyRange: "65–66%",
    adr: 94,
    adrRange: "IDR 1.5M (~$94)",
    period: "2025",
  },
  disclaimer: "STR data is from private platforms (Airbnb, AirDNA, etc.), not government statistics. BPS only publishes hotel TPK (occupancy). No public monthly source gives zone-level STR occupancy or average nightly price — update the Zone tracker section with your own data.",
};

/* =============================================================================
   VILLA SHORT LIST — Warren's Villa Shortlist
   Fill in / update this array — renders into the sidebar submenu
   url: Propertia / developer listing page (or your own notes)
   zone: market area
   br: bedrooms
   priceUsd: purchase price USD
   leaseTo: lease expiry year (if leasehold)
   zoning: STR-viable zoning (Tourism / Residential / not stated)
   status: Completed / Under construction / Off plan / Show villa
   when: estimated completion or now
   yield: your best estimate of net yield % or null
   verdict: short note
   ============================================================================= */
const VILLA_SHORTLIST = [
  {
    id:"Casa-Petak",
    name:"Casa Petak",
    url:"https://www.balitecture.com/",
    flag:"🇮🇩",
    zone:"Petak / Mengwi",
    br:3,
    priceUsd:349000,
    leaseTo:2056,
    zoning:"Tourism (STR-viable)",
    status:"Completed",
    when:"Available now",
    yield:null,
    operator:"Balitecture (20% mgmt fee, full management)",
    note:"Completed 3BR 236m² + pool. Balitecture already manages other block villas — hands-off via existing operator. STR-zoned (differs from Casa Vela orange-zone NIB). Personal use 90 nights/yr. Their own pub proj: 70% occ → $55k/yr net (15.7% ROI, 6.4yr payback); 80% → $65k (18.6%, 5.4yr); 90% → $75k (21.5%, 4.6yr). [Estimates — verify]",
    verdict:"Best on-hand shortlist: completed + managed + projected numbers clear $50k SGD/yr target from 70% occ. Confirms 10% yield floor & 6yr payback."
  },
  {
    id:"PPV4967",
    name:"PPV4967 — Modern Tropical Villa",
    url:"https://propertia.com/property/amazing-modern-tropical-villa-project-in-uluwatu/",
    flag:"🇮🇩",
    zone:"Uluwatu / Pecatu (Jl Pura Selonding)",
    br:3,
    priceUsd:265600,
    leaseTo:2053,
    zoning:"Tourism (STR-viable)",
    status:"Off plan — under construction",
    when:"Q1 2027",
    yield:null,
    operator:"TBC",
    note:"155m² built / 160m² land (1.6 Are), 27yr lease to Aug 2053. Pool + rooftop BBQ. STR-viable zoning — strongest off-plan income candidate in the shortlist. ~$94.4k leftover in $360k no-debt budget if bought alone.",
    verdict:"Strongest 3BR off-plan candidate: Tourism zoning, under construction (not just 'on payment'), Q1 2027 ≈ 4–6 months. Risk: operator + actual build/quality not yet validated. Compares well vs Canggu 3BR median ($355k) — pricing appears reasonable for Uluwatu."
  },
  {
    id:"PPV4619",
    name:"PPV4619 — Thomas Beach 2BR",
    url:"https://propertia.com/property/exclusive-2-bedroom-villa-in-the-prime-of-thomas-beach-prime-investment/",
    flag:"🇮🇩",
    zone:"Uluwatu / Thomas Beach (Jl Labuan Sait-Pecatu)",
    br:2,
    priceUsd:262000,
    leaseTo:2054,
    zoning:"Tourism (STR-viable)",
    status:"Off plan — Q1 2027",
    when:"Q1 2027",
    yield:null,
    operator:"Palmera (developer; NyNg Ng & Bingin track record)",
    note:"104m² built / 110m² land (1.1 Are), 28.5yr lease to Nov 2054 + 10yr extension. Thomas Beach = quiet, unmarked access, TripAdvisor 4.1/272 reviews, Thomas Beach Residence 7.9/10 Booking. Near Suka Espresso (on same road). Airport ~30min. Lower STR volume than main Uluwatu strip — niche appeal. Gross yield 10–16% / net 4–6% self-mgd / 10–15% pro-mgd (Uluwatu market).",
    verdict:"Good 2BR option if short wait + lower price + tourism zoning accepted. On same road as the busy restaurant/cafe strip (Jl Labuansait/Pecatu), short drive not walk. Weaker than 3BR PPV4967 on income scale; fine if 2BR + Thomas Beach vibe fits. Off-plan Q1 2027 — delivery risk re-weighted down (4–6 months)."
  },
  {
    id:"PPV4637",
    name:"PPV4637 — Pererenan Japanese Villa",
    url:"https://propertia.com/property/timeless-modern-japanese-inspired-villa-in-pererenan/",
    flag:"🇮🇩",
    zone:"Pererenan (Canggu corridor)",
    br:2,
    priceUsd:287000,
    leaseTo:null,
    zoning:"NOT STATED — confirm before proceeding",
    status:"Show villa available / timeline unstated",
    when:"TBC",
    yield:null,
    operator:"TBC (developer/operator unnamed)",
    note:"107m² built / 270m² land (2.7 Are), 22yr lease + guaranteed 25yr extension (47yr total). 8 min to beach / 15 min Canggu / 25 min Seminyak. Pool + sun deck, Japanese-inspired tropical, closed living, garden, storage, fully furnished. ZONING NOT STATED — must confirm STR viability before any commitment.",
    verdict:"Interesting but incomplete: zoning unknown, no completion timeline, no operator named, no stated lease end date (only '22yr lease + 25yr extension'). Large land (2.7 Are) in Pererenan is a genuine upside if zoning is Tourism, but the listing is thin on the details that matter for an income property. Treat as 'watch' until zoning + timeline confirmed."
  },
  {
    id:"FINNS-Standard",
    name:"FINNS — Standard Pool Villa",
    url:"https://www.finns.com/",
    flag:"🇮🇩",
    zone:"Berawa, Seminyak (FINNS Beach Club)",
    br:null,
    priceUsd:null,
    leaseTo:null,
    zoning:"Commercial / resort (via Mgmt Agreement)",
    status:"Operating beach club + building 256-room resort",
    when:"Revenue share from Q3 2027",
    yield:null,
    operator:"FINNS (Mgmt Agreement — 35% gross rental rev → investor pool)",
    note:"FINNS operates the beach club at Berawa (Seminyak) and is building a 256-room resort. Deal structure: 35% of gross rental revenue → investor pool (revenue share, NOT profit). Monthly payouts from day 1, Q3 2027. Std pool 0.38% of pool; Lagoon Superior 0.59% of pool. Yr1 pool ~$4.1M → Std ~$15.5k (9%) / Lagoon ~$24.3k; yr5 pool ~$6.7M → Lagoon ~$39.5k (12.7%); 5yr avg ~12.3%. Lagoon Sup 5.3B IDR (~$312k USD). Stated 9% yr1 doesn't reconcile with spot (~7.8%) — flag FX. Misses Warren's 10% yield floor and 6yr payback hard lines; below $50k SGD/yr until yr5 peak.",
    verdict:"Pool-revenue product, not a villa. Higher scale/divided risk than a single villa — your share depends on the whole pool. Below 10% yield floor; below $50k SGD/yr until yr5 peak. Lags behind single-villa options on every axis Warren cares about. Keep as a watch item, not a lead."
  },
  {
    id:"FINNS-Lagoon",
    name:"FINNS — Lagoon Superior Pool",
    url:"https://www.finns.com/",
    flag:"🇮🇩",
    zone:"Berawa, Seminyak (FINNS Beach Club)",
    br:null,
    priceUsd:312000,
    leaseTo:null,
    zoning:"Commercial / resort (via Mgmt Agreement)",
    status:"Operating beach club + building 256-room resort",
    when:"Revenue share from Q3 2027",
    yield:null,
    operator:"FINNS (Mgmt Agreement — 35% gross rental rev → investor pool)",
    note:"Lagoon Superior pool — 5.3B IDR (~$312k USD). Same revenue-share structure as the Standard pool: 0.59% of investor pool (vs 0.38% for Standard). So this is a ~55% larger share of the same pool. Yr1: ~$24.3k; yr5: ~$39.5k (12.7%). Same caveats as Standard: below 10% yield floor, below $50k SGD/yr until yr5 peak, misses 6yr payback, FX on stated 9% vs spot ~7.8%.",
    verdict:"Higher ticket ($312k) for a ~55% bigger slice of the same pool — but still a pool product, not your own villa. Revenue depends on FINNS' whole pool performance, not your asset. Same structural drawbacks as Standard. If you want exposure to the FINNS resort, the Lagoon Superior is the better-priced slice of that exposure — but still doesn't beat a single STR-viable villa on Warren's criteria."
  },
];

/* =============================================================================
   INVESTMENT COMPARISON TABLE
   Flat table version of the shortlist — renders into #investmentTableWrap
   ============================================================================= */
const INVESTMENT_TABLE = [
  {
    id: "Casa-Petak",
    name: "Casa Petak",
    location: "Petak / Mengwi (Bali)",
    beds: 3,
    priceUsd: 349000,
    roi: "15.7–21.5% (proj., Balitecture model)",
    status: "Completed — available now",
    leaseTo: 2056,
    operator: "Balitecture (20% mgmt fee, full management)",
    verdict: "Best on-hand: completed + managed + clears $50k SGD/yr from 70% occ. Confirms 10% yield floor & 6yr payback.",
  },
  {
    id: "PPV4967",
    name: "PPV4967 — Modern Tropical Villa",
    location: "Uluwatu / Pecatu (Jl Pura Selonding)",
    beds: 3,
    priceUsd: 265600,
    roi: "—",
    status: "Off plan — under construction (Q1 2027)",
    leaseTo: 2053,
    operator: "TBC",
    verdict: "Strongest 3BR off-plan: Tourism zoning, under construction, Q1 2027. Operator + build quality not yet validated.",
  },
  {
    id: "PPV4619",
    name: "PPV4619 — Thomas Beach 2BR",
    location: "Uluwatu / Thomas Beach (Jl Labuan Sait-Pecatu)",
    beds: 2,
    priceUsd: 262000,
    roi: "10–16% gross / 4–6% net self-mgd (mkt)",
    status: "Off plan — Q1 2027",
    leaseTo: 2054,
    operator: "Palmera (developer)",
    verdict: "Good 2BR if short wait + lower price + tourism zoning accepted. Weaker than 3BR PPV4967 on income scale.",
  },
  {
    id: "PPV4637",
    name: "PPV4637 — Pererenan Japanese Villa",
    location: "Pererenan (Canggu corridor)",
    beds: 2,
    priceUsd: 287000,
    roi: "—",
    status: "Show villa / timeline unstated",
    leaseTo: null,
    operator: "TBC (unnamed)",
    verdict: "Interesting but incomplete: zoning unknown, no timeline, no operator. Treat as 'watch'.",
  },
  {
    id: "FINNS-Standard",
    name: "FINNS — Standard Pool Villa",
    location: "Berawa, Seminyak (FINNS Beach Club)",
    beds: null,
    priceUsd: null,
    roi: "~9% yr1 / ~12.3% 5yr avg (pool)",
    status: "Operating + building 256-room resort",
    leaseTo: null,
    operator: "FINNS (Mgmt Agreement — 35% gross rev → pool)",
    verdict: "Pool-revenue product, not a villa. Below 10% yield floor & $50k SGD/yr until yr5 peak. Watch item, not a lead.",
  },
  {
    id: "FINNS-Lagoon",
    name: "FINNS — Lagoon Superior Pool",
    location: "Berawa, Seminyak (FINNS Beach Club)",
    beds: null,
    priceUsd: 312000,
    roi: "~9% yr1 / 12.7% yr5 / 12.3% 5yr avg (pool)",
    status: "Operating + building 256-room resort",
    leaseTo: null,
    operator: "FINNS (Mgmt Agreement — 35% gross rev → pool)",
    verdict: "Higher ticket ($312k) for ~55% bigger slice of same pool. Still pool product — doesn't beat single-villa options.",
  },
];

/* =============================================================================
   108 QUEENSBERRY STREET, CARLTON — SALE HISTORY
   Source: Domain.com.au building profile (5 pages, 47 sales, 2014–2026)
   Fields: unit, beds, baths, parking (null=not stated), price (AUD), date, link
   ============================================================================= */
const QUEENSBERRY_SALES = [
  { unit:"G2", beds:1, baths:1, parking:1, price:370000, date:"Mar 2026", link:"https://www.domain.com.au/property-profile/g2-108-queensberry-street-carlton-vic-3053" },
  { unit:"108", beds:1, baths:1, parking:1, price:400000, date:"Mar 2026", link:"https://www.domain.com.au/property-profile/108-108-queensberry-street-carlton-vic-3053" },
  { unit:"504", beds:1, baths:1, parking:1, price:438000, date:"Nov 2025", link:"https://www.domain.com.au/property-profile/504-108-queensberry-street-carlton-vic-3053" },
  { unit:"308", beds:1, baths:1, parking:null, price:320000, date:"Aug 2025", link:"https://www.domain.com.au/property-profile/308-108-queensberry-street-carlton-vic-3053" },
  { unit:"403", beds:1, baths:1, parking:1, price:452045, date:"Feb 2025", link:"https://www.domain.com.au/property-profile/403-108-queensberry-street-carlton-vic-3053" },
  { unit:"G1", beds:1, baths:1, parking:null, price:295000, date:"Nov 2024", link:"https://www.domain.com.au/property-profile/g1-108-queensberry-street-carlton-vic-3053" },
  { unit:"G8", beds:2, baths:2, parking:1, price:640000, date:"Jun 2023", link:"https://www.domain.com.au/property-profile/g8-108-queensberry-street-carlton-vic-3053" },
  { unit:"102", beds:1, baths:1, parking:1, price:365000, date:"Jul 2019", link:"https://www.domain.com.au/property-profile/102-108-queensberry-street-carlton-vic-3053" },
  { unit:"205", beds:2, baths:1, parking:2, price:490000, date:"May 2019", link:"https://www.domain.com.au/property-profile/205-108-queensberry-street-carlton-vic-3053" },
  { unit:"401", beds:3, baths:2, parking:3, price:1250000, date:"Apr 2019", link:"https://www.domain.com.au/property-profile/401-108-queensberry-street-carlton-vic-3053" },
  { unit:"502", beds:1, baths:1, parking:1, price:487045, date:"Oct 2017", link:"https://www.domain.com.au/property-profile/502-108-queensberry-street-carlton-vic-3053" },
  { unit:"404", beds:0, baths:1, parking:null, price:685000, date:"Jun 2017", link:"https://www.domain.com.au/property-profile/404-108-queensberry-street-carlton-vic-3053" },
  { unit:"101", beds:1, baths:1, parking:null, price:429500, date:"Jun 2017", link:"https://www.domain.com.au/property-profile/101-108-queensberry-street-carlton-vic-3053" },
  { unit:"505", beds:1, baths:1, parking:1, price:680000, date:"May 2017", link:"https://www.domain.com.au/property-profile/505-108-queensberry-street-carlton-vic-3053" },
  { unit:"306", beds:2, baths:1, parking:1, price:415000, date:"Feb 2017", link:"https://www.domain.com.au/property-profile/306-108-queensberry-street-carlton-vic-3053" },
  { unit:"501", beds:1, baths:1, parking:null, price:630000, date:"Sep 2015", link:"https://www.domain.com.au/property-profile/501-108-queensberry-street-carlton-vic-3053" },
  { unit:"310", beds:2, baths:2, parking:1, price:380795, date:"Aug 2014", link:"https://www.domain.com.au/property-profile/310-108-queensberry-street-carlton-vic-3053" },
  { unit:"202", beds:1, baths:1, parking:1, price:385000, date:"Aug 2014", link:"https://www.domain.com.au/property-profile/202-108-queensberry-street-carlton-vic-3053" },
  { unit:"208", beds:1, baths:1, parking:null, price:417045, date:"Aug 2014", link:"https://www.domain.com.au/property-profile/208-108-queensberry-street-carlton-vic-3053" },
  { unit:"201", beds:1, baths:1, parking:null, price:390795, date:"Aug 2014", link:"https://www.domain.com.au/property-profile/201-108-queensberry-street-carlton-vic-3053" },
  { unit:"109", beds:2, baths:1, parking:1, price:540000, date:"Aug 2014", link:"https://www.domain.com.au/property-profile/109-108-queensberry-street-carlton-vic-3053" },
  { unit:"G3", beds:1, baths:1, parking:null, price:465995, date:"Aug 2014", link:"https://www.domain.com.au/property-profile/g3-108-queensberry-street-carlton-vic-3053" },
  { unit:"G4", beds:1, baths:1, parking:1, price:465995, date:"Aug 2014", link:"https://www.domain.com.au/property-profile/g4-108-queensberry-street-carlton-vic-3053" },
  { unit:"506", beds:2, baths:1, parking:1, price:645000, date:"Jul 2014", link:"https://www.domain.com.au/property-profile/506-108-queensberry-street-carlton-vic-3053" },
  { unit:"206", beds:2, baths:1, parking:1, price:427045, date:"Jul 2014", link:"https://www.domain.com.au/property-profile/206-108-queensberry-street-carlton-vic-3053" },
  { unit:"203", beds:1, baths:1, parking:null, price:446408, date:"Jul 2014", link:"https://www.domain.com.au/property-profile/203-108-queensberry-street-carlton-vic-3053" },
  { unit:"304", beds:1, baths:1, parking:1, price:485795, date:"Jul 2014", link:"https://www.domain.com.au/property-profile/304-108-queensberry-street-carlton-vic-3053" },
  { unit:"G7", beds:0, baths:1, parking:null, price:400000, date:"Jul 2014", link:"https://www.domain.com.au/property-profile/g7-108-queensberry-street-carlton-vic-3053" },
  { unit:"207", beds:1, baths:1, parking:1, price:420795, date:"Jul 2014", link:"https://www.domain.com.au/property-profile/207-108-queensberry-street-carlton-vic-3053" },
  { unit:"204", beds:0, baths:1, parking:null, price:410795, date:"Jul 2014", link:"https://www.domain.com.au/property-profile/204-108-queensberry-street-carlton-vic-3053" },
  { unit:"106", beds:1, baths:1, parking:null, price:681445, date:"Jun 2014", link:"https://www.domain.com.au/property-profile/106-108-queensberry-street-carlton-vic-3053" },
  { unit:"405", beds:2, baths:1, parking:1, price:567425, date:"Jun 2014", link:"https://www.domain.com.au/property-profile/405-108-queensberry-street-carlton-vic-3053" },
  { unit:"209", beds:2, baths:1, parking:1, price:560000, date:"Jun 2014", link:"https://www.domain.com.au/property-profile/209-108-queensberry-street-carlton-vic-3053" },
  { unit:"309", beds:2, baths:1, parking:1, price:566585, date:"Jun 2014", link:"https://www.domain.com.au/property-profile/309-108-queensberry-street-carlton-vic-3053" },
  { unit:"105", beds:2, baths:1, parking:1, price:412000, date:"Jun 2014", link:"https://www.domain.com.au/property-profile/105-108-queensberry-street-carlton-vic-3053" },
  { unit:"103", beds:1, baths:1, parking:1, price:585000, date:"Jun 2014", link:"https://www.domain.com.au/property-profile/103-108-queensberry-street-carlton-vic-3053" },
  { unit:"305", beds:2, baths:1, parking:1, price:412000, date:"Jun 2014", link:"https://www.domain.com.au/property-profile/305-108-queensberry-street-carlton-vic-3053" },
  { unit:"307", beds:1, baths:1, parking:1, price:485795, date:"Aug 2014", link:"https://www.domain.com.au/property-profile/307-108-queensberry-street-carlton-vic-3053" },
  { unit:"G5", beds:1, baths:1, parking:1, price:411545, date:"Oct 2014", link:"https://www.domain.com.au/property-profile/g5-108-queensberry-street-carlton-vic-3053" },
  { unit:"302", beds:1, baths:1, parking:1, price:442045, date:"Oct 2014", link:"https://www.domain.com.au/property-profile/302-108-queensberry-street-carlton-vic-3053" },
  { unit:"210", beds:2, baths:2, parking:2, price:695000, date:"Sep 2014", link:"https://www.domain.com.au/property-profile/210-108-queensberry-street-carlton-vic-3053" },
  { unit:"G6", beds:2, baths:1, parking:1, price:369500, date:"Sep 2014", link:"https://www.domain.com.au/property-profile/g6-108-queensberry-street-carlton-vic-3053" },
  { unit:"107", beds:2, baths:1, parking:1, price:400000, date:"Sep 2014", link:"https://www.domain.com.au/property-profile/107-108-queensberry-street-carlton-vic-3053" },
  { unit:"402", beds:1, baths:1, parking:null, price:475795, date:"Sep 2014", link:"https://www.domain.com.au/property-profile/402-108-queensberry-street-carlton-vic-3053" },
  { unit:"104", beds:2, baths:1, parking:1, price:412045, date:"Sep 2014", link:"https://www.domain.com.au/property-profile/104-108-queensberry-street-carlton-vic-3053" },
];

/* =============================================================================
   143 SUSSEX STREET, PASCOE VALE — SALE HISTORY
   Source: Domain.com.au building profile (7 townhouse sales, 2007–2024)
   ============================================================================= */
const SUSSEX_SALES = [
  { unit:"4", beds:3, baths:2, parking:2, price:770000, date:"Jun 2024", link:"https://www.domain.com.au/property-profile/4-143-sussex-street-pascoe-vale-vic-3044" },
  { unit:"3", beds:3, baths:2, parking:2, price:600000, date:"Aug 2022", link:"https://www.domain.com.au/property-profile/3-143-sussex-street-pascoe-vale-vic-3044" },
  { unit:"6", beds:3, baths:2, parking:1, price:670000, date:"Mar 2021", link:"https://www.domain.com.au/property-profile/6-143-sussex-street-pascoe-vale-vic-3044" },
  { unit:"2", beds:3, baths:2, parking:1, price:426000, date:"Jun 2014", link:"https://www.domain.com.au/property-profile/2-143-sussex-street-pascoe-vale-vic-3044" },
  { unit:"1", beds:3, baths:2, parking:1, price:370000, date:"Jul 2007", link:"https://www.domain.com.au/property-profile/1-143-sussex-street-pascoe-vale-vic-3044" },
  { unit:"5", beds:3, baths:2, parking:1, price:380000, date:"Apr 2007", link:"https://www.domain.com.au/property-profile/5-143-sussex-street-pascoe-vale-vic-3044" },
];

/* =============================================================================
   EXPORTS
   ============================================================================= */
const DATA = {
  lastUpdated: "2026-09-13T18:00",
  arrAnnual: ARR_ANNUAL,
  arrMonthly: ARR_MONTHLY,
  gate2026: GATE_2026,
  market2025: MARKET_2025,
  bpsGateNote: BPS_GATE_NOTE,
  tpkStar: TPK_STAR,
  tpkNonStar: TPK_NONSTAR,
  losMonthly2026: LOS_MONTHLY_2026,
  gdpQuarterly: GDP_QUARTERLY,
  gdpFullYear: GDP_FULL_YEAR,
  gdp2026Q1: GDP_2026_Q1,
  tourismShare2024: TOURISM_SHARE_2024,
  strMarket: STR_MARKET,
  villaShortlist: VILLA_SHORTLIST,
  investmentTable: INVESTMENT_TABLE,
  queensberrySales: QUEENSBERRY_SALES,
  sussexSales: SUSSEX_SALES,
};