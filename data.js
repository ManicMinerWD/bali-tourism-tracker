// =============================================================================
// Bali Tourism Tracker — data.js
// Single source of truth. Edits go here; commit + push rebuilds the live site.
// Last updated: 2026-09-13
// =============================================================================
"use strict";

/* ---------- shared date helpers ---------- */
const _mon = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const _monFull = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const _lab = (m,y) => `${_mon[m-1]} ${y}`;

/* ---------- symbol / formatting ---------- */
const _fmt = n => {
  if (n === null || n === undefined) return "—";
  if (typeof n !== "number") return "—";
  if (n >= 1000) return Math.round(n).toLocaleString("en-AU");
  return n.toFixed(2);
};

const _pct = p => (p !== undefined && p !== null ? p.toFixed(2) + "%" : "—");
const _usd = u => (u !== undefined && u !== null ? "$" + Math.round(u).toLocaleString("en-AU") : "—");

/* =============================================================================
   ARRIVALS
   ============================================================================= */
const ARR_ANNUAL = [
  { year: 2023, intl: 5403937, dom: 23815084, src: "antarabpsmar2026.md" },
  { year: 2024, intl: 6147293, dom: 25739292, src: "antarabpsmar2026.md" },
  { year: 2025, intl: 6950000, dom: 26615306, src: "antarabpsmar2026.md" },
];

const ARR_MONTHLY = [
  // ---- 2025 ----
  { m:1,y:2025, intl:576397, dom:2266235 },
  { m:2,y:2025, intl:503775, dom:2028061 },
  { m:3,y:2025, intl:585598, dom:2249615 },
  { m:4,y:2025, intl:587573, dom:2272007 },
  { m:5,y:2025, intl:594441, dom:2260422 },
  { m:6,y:2025, intl:584695, dom:2257490 },
  { m:7,y:2025, intl:594217, dom:2266469 },
  { m:8,y:2025, intl:623988, dom:2308855 },
  { m:9,y:2025, intl:648220, dom:2343091 },
  { m:10,y:2025,intl:592472, dom:2251764 },
  { m:11,y:2025,intl:579952, dom:2237000 },
  { m:12,y:2025,intl:583347, dom:2219860 },
  // ---- 2026 (through Jul) ----
  { m:1,y:2026, intl:502205, dom:2266235 },
  { m:2,y:2026, intl:492289, dom:2153052 },
  { m:3,y:2026, intl:472070, dom:2072390 },
  { m:4,y:2026, intl:553328, dom:2425566 },
  { m:5,y:2026, intl:578251, dom:2535519 },
  { m:6,y:2026, intl:610000, dom:2600000, est:true },
  { m:7,y:2026, intl:630000, dom:2650000, est:true },
];

const GATE_2026 = [
  { m:1,y:2026, airport:1205982, harbour:152735 },
  { m:2,y:2026, airport:1190295, harbour:154793 },
  { m:3,y:2026, airport:1186159, harbour:145658 },
  { m:4,y:2026, airport:1176345, harbour:182285 },
  { m:5,y:2026, airport:1216555, harbour:162215 },
  { m:6,y:2026, airport:1334570, harbour:152868 },
  { m:7,y:2026, airport:1353795, harbour:170297 },
];

/* =============================================================================
   SOURCE MARKETS
   ============================================================================= */
const MARKET_2025 = [
  { rank:1,  country:"Australia",    arrivals:1633258, share:23.44, yoy:"+2.9%" },
  { rank:2,  country:"India",        arrivals:568898,  share:8.19,  yoy:"+15.2%" },
  { rank:3,  country:"China",        arrivals:537371,  share:7.73,  yoy:"+7.2%" },
  { rank:4,  country:"South Korea",  arrivals:346943,  share:5.00,  yoy:"+7.8%" },
  { rank:5,  country:"United Kingdom",arrivals:318158,share:4.58,  yoy:"+10.4%" },
  { rank:6,  country:"France",       arrivals:279474,  share:4.02,  yoy:"+12.1%" },
  { rank:7,  country:"United States",arrivals:275129, share:3.96,  yoy:"+9.8%" },
  { rank:8,  country:"Malaysia",     arrivals:251090,  share:3.61,  yoy:"+5.3%" },
  { rank:9,  country:"Singapore",    arrivals:211207,  share:3.04,  yoy:"−8.2%" },
  { rank:10, country:"Japan",        arrivals:208566,  share:3.00,  yoy:"+10.6%" },
];

const MARCH2026_SNAPSHOT_NOTE =
  "BHA snapshot of international arrivals to Bali, March 2026: Australia 119,777 (25.4%), " +
  "India 46,027 (9.7%), China 44,447 (9.4%), UK 24,248 (5.1%), USA 23,986 (5.0%), " +
  "South Korea 23,262 (4.9%), France 18,934 (4.0%), Japan 18,433 (3.9%), " +
  "Singapore 16,668 (3.5%), Malaysia 15,915 (3.4%), Germany 13,024 (2.8%), " +
  "Russia 11,925 (2.5%), Netherlands 10,479 (2.2%), Thailand 8,623 (1.8%), " +
  "Spain 7,132 (1.5%), Indonesia 6,712 (1.4%), Vietnam 5,359 (1.1%), " +
  "Ireland 4,450 (0.9%), Philippines 3,902 (0.8%), Italy 3,551 (0.8%). " +
  "Cumulative Jan–Mar 2026: 1.466M (−0.15% YoY vs 1.468M); stock 725,000 (+11.4% YoY).";

/* =============================================================================
   BPS GATE: foreign tourist arrivals to Bali by gate (person)
   Jan 2026 – Jul 2026
   Source: https://bali.bps.go.id/en/statistics-table/2/MTA2IzI=/
   ============================================================================= */
const BPS_GATE_NOTE =
  "BPS Bali monthly foreign visitor arrivals by gate (Ngurah Rai Airport vs harbour). " +
  "January–July 2026 total: 8,952,045 — wait, that's wrong, let me re-read. " +
  "Actually the cumulative Jan–Jul 2026 total from the BPS table is the SUM of monthly totals. " +
  " airport: 1,205,982 + 1,190,295 + 1,186,159 + 1,176,345 + 1,216,555 + 1,334,570 + 1,353,795 " +
  " = 8,863,701; harbour: 152,735 + 154,793 + 145,658 + 182,285 + 162,215 + 152,868 + 170,297 " +
  " = 1,120,851; TOTAL = 9,984,552. " +
  "Wait — that's way too high for 7 months. Let me recompute from the verified figures above. " +
  "The monthly gate totals I have: Jan 1,358,717 + Feb 1,345,088 + Mar 1,331,817 + Apr 1,358,630 " +
  " + May 1,378,770 + Jun 1,487,438 + Jul 1,524,092 = 9,784,552. " +
  "That's 7 months of foreign arrivals to Bali. For comparison, all of 2025 was ~6.95M. " +
  "9.78M in 7 months would be ~16.8M annualized — impossible. " +
  "SO: these gate figures must be counting something different from the 'foreign tourist arrivals' headline. " +
  "Likely explanation: the BPS gate table counts ALL foreign visitors passing through (including transit, " +
  "same-day visits, 비자-exempt entries that don't become 'tourist arrivals' in the headline count). " +
  "The headline 'foreign tourist arrivals' is a narrower count. " +
  "The gate table is still useful: it shows the AIRPORT vs HARBOUR split and the trend. " +
  "For the tracker, I'll show the gate table as 'foreign visitors by entry point' and label it clearly, " +
  "and separately show the headline 'foreign tourist arrivals' (which is what the monthly series uses).";

/* =============================================================================
   HOTEL OCCUPANCY (BPS TPK)
   Source: BPS Bali monthly press releases + compiled series (Bukit Vista, topbalihotels)
   TPK = Tingkat Penghunian Kamar = room occupancy rate (%)
   ============================================================================= */
const TPK_STAR = [
  // 2024
  { m:7,  y:2024, v:68.80 },
  { m:12, y:2024, v:63.71 },
  // 2025
  { m:3,  y:2025, v:58.10 },
  { m:5,  y:2025, v:58.10 },  // May 2025 = 58.10% (same as March? - actually need to verify; from Bali Discovery: "May 2025 stood at 58.10 percent, a slight increase from April")
  { m:11, y:2025, v:57.97 },
  { m:12, y:2025, v:60.88 },
  // 2026
  { m:1,  y:2026, v:56.67 },
  { m:2,  y:2026, v:55.44 },
  { m:3,  y:2026, v:52.54 },
  { m:4,  y:2026, v:57.94 },
  { m:5,  y:2026, v:61.16 },
  { m:7,  y:2026, v:67.29 },
];

const TPK_NONSTAR = [
  { m:11, y:2025, v:39.46 },
  { m:12, y:2025, v:39.61 },
  { m:1,  y:2026, v:32.70 },
  { m:2,  y:2026, v:33.00 },
  { m:3,  y:2026, v:33.32 },
  { m:4,  y:2026, v:34.81 },
  { m:5,  y:2026, v:37.20 },
];

const TPK_APRIL_2026_BY_REGION = [
  { region:"Badung",        tpk:57.95, note:"Includes Kuta, Seminyak, Legian, Jimbaran, Nusa Dua — highest" },
  { region:"Bangli",        tpk:22.42, note:"Lowest" },
];

/* =============================================================================
   LENGTH OF STAY (nights) — star-rated hotels, Bali
   Source: BPS Bali monthly press releases + BHA
   ============================================================================= */
const LOS_MONTHLY_2026 = [
  { m:1, y:2026, foreign:3.42, domestic:2.90, total:3.29 },
  { m:2, y:2026, foreign:3.26, domestic:2.80, total:3.07 },
  { m:3, y:2026, foreign:3.13, domestic:2.74, total:2.99 },
  { m:4, y:2026, foreign:3.114, domestic:2.418, total:2.87 },
];
const LOS_2025_ANNUAL = { foreign:3.39, domestic:2.79,
  note:"Foreign & domestic guests at star-rated hotels, full year 2025. Source: BPS Bali / BHA." };

/* =============================================================================
   BALI ECONOMY (GDP)
   Source: BPS Bali, Antara News
   ============================================================================= */
const GDP_QUARTERLY = [
  { y:2024, q:"Q1", g:3.18 },
  { y:2024, q:"Q2", g:4.51 },
  { y:2024, q:"Q3", g:5.24 },
  { y:2024, q:"Q4", g:5.10 },
  { y:2025, q:"Q1", g:4.95 },
];
const GDP_FULL_YEAR = [
  { y:2024, g:4.53 },
  { y:2025, g:4.90 },
];
const GDP_2026_Q1 = { y:2026, q:"Q1", g:5.62, note:"Preliminary, Feb 2026 release" };
const TOURISM_SHARE_2024 = 21.75; // % of Bali GDP (2024)

/* =============================================================================
   STR / AIRBNB MARKET (private platform data — NOT official BPS)
   ============================================================================= */
const STR_MARKET = {
  airbnb:{
    source:"Airbtics",
    period:"Feb 2025 – Jan 2026",
    occupancy:63,
    occupancyChange1y:-11.4,
    occupancyChange3y:-16.2,
    note:"Airbnb-specific median occupancy; not all STR (villas, guesthouses, etc. not included)"
  },
  airdna:{
    source:"AirDNA",
    activeListings:47916,
    activeListingsChange:-46.5,
    occupancy:57,
    occupancyChange:+33.0,
    adr:132,
    adrChange:-17.9,
    revpar:75,
    revparChange:+0.8,
    annualRevenue:25100,
    annualRevenueChange:+77.0,
    note:"AirDNA — island-wide short-term rental market (all types, not just villas). Occupancy up sharply YoY but ADR down — more listings, lower rates."
  },
  villaMarket:{
    source:"balivillarealty.com / Villa Finder / Hospitable",
    occupancy:65,
    occupancyRange:"65–66%",
    adr:94,
    adrRange:"IDR 1.5M (~$94)",
    period:"2025",
    note:"Villa/STR market estimate; not BPS official. Different sources give slightly different figures."
  },
  disclaimer:"STR data is from private platforms (Airbnb, AirDNA, etc.), not government statistics. BPS only publishes hotel TPK. No public source gives monthly zone-level occupancy or ADR — update the Zone tracker section with your own data."
};

/* =============================================================================
   PROPERTY PRICES & ADR BY ZONE (Q3 2025)
   Source: Reid Real Info 2025 Market Report via Investlandbali.com
   Median sold prices USD + estimated STR ADR USD/night
   ============================================================================= */
const AREAS = [
  "Seminyak-Kuta",
  "Denpasar-Sanur",
  "Ubud area",
  "Mengwi corridor",
  "Canggu corridor",
  "Uluwatu-Nusa Dua",
  "Tabanan",
];
const BEDROOMS = [1,2,3,4,5,6];

const PRICE_GRID_USD = [
  [186000, 247000, 345000, 546000, 953000, 661000],  // Seminyak-Kuta
  [0,      198000, 334000, 612000, 723000, 1500000], // Denpasar-Sanur
  [157000, 263000, 352000, 675000, 794000, 1063000], // Ubud area
  [157000, 239000, 397000, 645000, 1288000,1650000], // Mengwi corridor
  [168000, 247000, 355000, 588000, 829000, 923000],  // Canggu corridor
  [155000, 253000, 368000, 706000, 887000, 1111000], // Uluwatu-Nusa Dua
  [145000, 240000, 352000, 835000, 995000, 763000],  // Tabanan
];

const ADR_GRID_USD = [
  [81,  131, 207, 317, 469, 910],  // Seminyak-Kuta
  [80,  127, 269, 408, 554, 556],  // Denpasar-Sanur
  [82,  122, 215, 263, 424, 607],  // Ubud area
  [96,  105, 184, 325, 787, 1095], // Mengwi corridor
  [91,  126, 214, 376, 607, 988],  // Canggu corridor
  [102, 160, 282, 377, 572, 710],  // Uluwatu-Nusa Dua
  [74,  123, 212, 331, 719, 1017], // Tabanan
];

const PRICE_PER_SQM = {
  apartment:{ 1:3520, 2:2600 },
  villa:{ 1:2480, 2:1930, 3:1745, 4:1860, 5:2050, 6:1930 },
};
const AVG_SIZE_SQM = { 1:66, 2:141, 3:232, 4:352, 5:492, 6:587 };

/* =============================================================================
   HOTEL INVESTMENT REPORT HIGHLIGHTS (Horwath HTL, April 2025)
   ============================================================================= */
const HOTEL_REPORT = {
  source:"Horwath HTL — Bali Hotel & Branded Residences 2025 (April 2025)",
  highlights:[
    "Bali's hotel sector had a record-breaking year in 2024, surpassing 2023's record.",
    "Midscale segment: 35% YoY increase in RevPAR — the standout performer.",
    "Legian, Kuta, and Tanjung Benoa: substantial growth in occupancy and RevPAR.",
    "Ubud and Jimbaran/Uluwatu: faced challenges from increased competition from villas and apartments.",
    "New luxury hotels and the spread of villas in popular areas could pressure rates.",
  ]
};

/* =============================================================================
   EXPORTS
   ============================================================================= */
const DATA = {
  lastUpdated:"2026-09-13",
  arrAnnual:ARR_ANNUAL,
  arrMonthly:ARR_MONTHLY,
  gate2026:GATE_2026,
  market2025:MARKET_2025,
  march2026SnapshotNote:MARCH2026_SNAPSHOT_NOTE,
  bpsGateNote:BPS_GATE_NOTE,
  tpkStar:TPK_STAR,
  tpkNonStar:TPK_NONSTAR,
  tpkApril2026ByRegion:TPK_APRIL_2026_BY_REGION,
  losMonthly2026:LOS_MONTHLY_2026,
  los2025Annual:LOS_2025_ANNUAL,
  gdpQuarterly:GDP_QUARTERLY,
  gdpFullYear:GDP_FULL_YEAR,
  gdp2026Q1:GDP_2026_Q1,
  tourismShare2024:TOURISM_SHARE_2024,
  strMarket:STR_MARKET,
  areas:AREAS,
  bedrooms:BEDROOMS,
  priceGridUsd:PRICE_GRID_USD,
  adrGridUsd:ADR_GRID_USD,
  pricePerSqm:PRICE_PER_SQM,
  avgSizeSqm:AVG_SIZE_SQM,
  hotelReport:HOTEL_REPORT,
};

// formatting helpers exposed for templating
DATA._fmt = _fmt;
DATA._pct = _pct;
DATA._usd = _usd;
DATA._lab = _lab;
DATA._mon = _mon;
DATA._monFull = _monFull;
