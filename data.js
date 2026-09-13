// Bali Tourism Tracker — data.js
// Single source of truth. Update this file when BPS / BHA release new monthly figures.
// Last updated: 2026-09-12

const DATA = {
  lastUpdated: "2026-09-12",

  sources: [
    { name: "BPS Bali (Statistics Indonesia, Bali Province)",
      url: "https://bali.bps.go.id/en/statistics-table/2/MTA2IzI=/number-of-monthly-foreign-visitor-to-bali-by-gate--person-.html",
      note: "Monthly foreign arrivals by gate (Ngurah Rai Airport + harbour). Updated monthly." },
    { name: "Bali Hotels Association (BHA)",
      url: "https://www.balihotelsassociation.com/monthly-passengers-statistic/",
      note: "Monthly international + domestic arrivals to Bali Province, with top source markets. Updated monthly." },
    { name: "Antara News / BPS Bali",
      url: "https://en.antaranews.com/news/402594/balis-foreign-tourist-arrivals-rise-nearly-10-pct-in-2025-bps-says",
      note: "2025 full-year foreign arrivals 6,948,754 (+9.72% YoY); full-year by country." },
    { name: "RoadGenius Bali Tourism Statistics",
      url: "https://roadgenius.com/statistics/tourism/indonesia/bali/",
      note: "2025 monthly international arrivals Jan-May (preliminary); 2024 annual totals." },
    { name: "Trading Economics — Indonesia Tourist Arrivals",
      url: "https://tradingeconomics.com/indonesia/tourist-arrivals",
      note: "National (Indonesia-wide) monthly arrivals, NOT Bali-specific. Context only." },
  ],

  // ---- Annual totals (hard figures) ----
  annual: [
    { year: 2023, int: 5270000, dom: null, total: null, source: "BPS via RoadGenius" },
    { year: 2024, int: 6330000, dom: 10100000, total: 16400000, source: "BPS via RoadGenius" },
    { year: 2025, int: 6948754, dom: null, total: null, source: "BPS / BHA / Antara" },
  ],

  // ---- Monthly arrivals (only months with known data; null = pending release) ----
  monthly: [
    // 2025 — Jan-May from RoadGenius; Dec from BHA
    { year: 2025, month: 1, int: 529897, dom: null, total: null, source: "RoadGenius" },
    { year: 2025, month: 2, int: 450697, dom: null, total: null, source: "RoadGenius" },
    { year: 2025, month: 3, int: 470851, dom: null, total: null, source: "RoadGenius" },
    { year: 2025, month: 4, int: 591221, dom: null, total: null, source: "RoadGenius" },
    { year: 2025, month: 5, int: 602213, dom: null, total: null, source: "RoadGenius" },
    { year: 2025, month: 6, int: null, dom: null, total: null, source: "Pending BPS" },
    { year: 2025, month: 7, int: null, dom: null, total: null, source: "Pending BPS" },
    { year: 2025, month: 8, int: null, dom: null, total: null, source: "Pending BPS" },
    { year: 2025, month: 9, int: null, dom: null, total: null, source: "Pending BPS" },
    { year: 2025, month: 10, int: null, dom: null, total: null, source: "Pending BPS" },
    { year: 2025, month: 11, int: null, dom: null, total: null, source: "Pending BPS" },
    { year: 2025, month: 12, int: 572668, dom: 2198625, total: null, source: "BHA" },
    // 2026 — Jan-Mar from BHA/BPS
    { year: 2026, month: 1, int: 502205, dom: 798977, total: 1301182, source: "BHA/BPS" },
    { year: 2026, month: 2, int: 492289, dom: 600183, total: 1092472, source: "BHA/BPS" },
    { year: 2026, month: 3, int: 472070, dom: 1060798, total: 1532868, source: "BHA/BPS" },
    { year: 2026, month: 4, int: null, dom: null, total: null, source: "Pending BPS" },
    { year: 2026, month: 5, int: null, dom: null, total: null, source: "Pending BPS" },
    { year: 2026, month: 6, int: null, dom: null, total: null, source: "Pending BPS" },
    { year: 2026, month: 7, int: null, dom: null, total: null, source: "Pending BPS" },
    { year: 2026, month: 8, int: null, dom: null, total: null, source: "Pending BPS" },
  ],

  // ---- BPS gate arrivals (foreign, by gate) — 2026 Jan-Jul ----
  bpsGate: [
    { year: 2026, month: 1, airport: 500121, harbour: 2084, total: 502205 },
    { year: 2026, month: 2, airport: 486053, harbour: 6236, total: 492289 },
    { year: 2026, month: 3, airport: 465260, harbour: 6810, total: 472070 },
    { year: 2026, month: 4, airport: 552961, harbour: 367, total: 553328 },
    { year: 2026, month: 5, airport: 578203, harbour: 48, total: 578251 },
    { year: 2026, month: 6, airport: 604962, harbour: 51, total: 605013 },
    { year: 2026, month: 7, airport: 697800, harbour: 9, total: 697809 },
  ],

  // ---- Top source countries — full year 2025 ----
  countries2025: [
    { country: "Australia", flag: "🇦🇺", visitors: 1628462, share: 23.44, yoy: 5.46 },
    { country: "India", flag: "🇮🇳", visitors: 569260, share: 8.19, yoy: 3.43 },
    { country: "China", flag: "🇨🇳", visitors: 537380, share: 7.73, yoy: 19.83 },
    { country: "South Korea", flag: "🇰🇷", visitors: 346680, share: 4.99, yoy: 17.91 },
    { country: "United Kingdom", flag: "🇬🇧", visitors: 317520, share: 4.57, yoy: 7.52 },
    { country: "France", flag: "🇫🇷", visitors: 279120, share: 4.02, yoy: 8.40 },
    { country: "United States", flag: "🇺🇸", visitors: 274610, share: 3.95, yoy: 4.88 },
    { country: "Malaysia", flag: "🇲🇾", visitors: 251160, share: 3.61, yoy: 2.04 },
    { country: "Singapore", flag: "🇸🇬", visitors: 211330, share: 3.04, yoy: -3.47 },
    { country: "Japan", flag: "🇯🇵", visitors: 208620, share: 3.00, yoy: 17.96 },
  ],

  // ---- Top source countries — March 2026 snapshot (BHA) ----
  countriesMarch2026: [
    { country: "Australia", flag: "🇦🇺", visitors: 119777, share: 25.4 },
    { country: "India", flag: "🇮🇳", visitors: 42460 },
    { country: "China", flag: "🇨🇳", visitors: 32497 },
    { country: "United Kingdom", flag: "🇬🇧", visitors: 24206 },
    { country: "United States", flag: "🇺🇸", visitors: 23003 },
    { country: "Japan", flag: "🇯🇵", visitors: 19350 },
    { country: "South Korea", flag: "🇰🇷", visitors: 17765 },
    { country: "Russia", flag: "🇷🇺", visitors: 17660 },
    { country: "Malaysia", flag: "🇲🇾", visitors: 15218 },
    { country: "Singapore", flag: "🇸🇬", visitors: 13783 },
    { country: "Germany", flag: "🇩🇪", visitors: 13714 },
    { country: "France", flag: "🇫🇷", visitors: 12043 },
    { country: "New Zealand", flag: "🇳🇿", visitors: 10017 },
    { country: "Philippines", flag: "🇵🇭", visitors: 8272 },
    { country: "Taiwan", flag: "🇹🇼", visitors: 8117 },
    { country: "Canada", flag: "🇨🇦", visitors: 7000 },
    { country: "Netherlands", flag: "🇳🇱", visitors: 6898 },
    { country: "Turkey", flag: "🇹🇷", visitors: 4441 },
    { country: "Denmark", flag: "🇩🇰", visitors: 3964 },
    { country: "Spain", flag: "🇪🇸", visitors: 3907 },
  ],

  // ---- Zone-level STR tracker — occupancy + ADR + nights.
  // IMPORTANT: no reliable public monthly source exists for zone-level STR occupancy
  // or average nightly price. These are a MANUAL tracker for you to fill in from your
  // own research (AirDNA, your property data, etc.). Values below are placeholders.
  zones: [
    { zone: "Canggu / Berawa", occupancy2025: null, adr2025: null, nights2025: null,
      notes: "Your target area. Fill from your data / AirDNA." },
    { zone: "Pererenan", occupancy2025: null, adr2025: null, nights2025: null,
      notes: "Fill from your data / AirDNA." },
    { zone: "Uluwatu / Bukit / Pecatu", occupancy2025: null, adr2025: null, nights2025: null,
      notes: "Your other target area. Fill from your data / AirDNA." },
    { zone: "Seminyak", occupancy2025: null, adr2025: null, nights2025: null,
      notes: "Fill from your data / AirDNA." },
    { zone: "Kuta", occupancy2025: null, adr2025: null, nights2025: null,
      notes: "Fill from your data / AirDNA." },
    { zone: "Sanur", occupancy2025: null, adr2025: null, nights2025: null,
      notes: "Fill from your data / AirDNA." },
    { zone: "Nusa Dua", occupancy2025: null, adr2025: null, nights2025: null,
      notes: "Fill from your data / AirDNA." },
    { zone: "Ubud", occupancy2025: null, adr2025: null, nights2025: null,
      notes: "Fill from your data / AirDNA." },
  ],
};
