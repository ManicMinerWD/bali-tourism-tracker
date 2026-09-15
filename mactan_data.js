// =============================================================================
// MACTAN OPTION 2 — Punta Engaño, Cebu (from Warren's spreadsheet, Mactan tabs)
// Sidetable detached from Bali. FX: PHP→AUD 37.5, USD→AUD 1.52
// =============================================================================
const MACTAN_VILLA = {
  // Land
  land: {
    area: 241,            // m²
    frontage: "2.09m N edge",
    pricePhp: 6300000,
    priceAud: 168000,
    type: "Sea-view (secondary from shore, coral-rock foreshore)",
    location: "Punta Engaño tip, Wellfleet St (near Dusit Thani)",
    source: "Lamudi — your original lot; re-listed as 'RUSH SALE'",
    note: "241m² sea-view lot (not beachfront — secondary from shore). Coral-rock foreshore near Dusit Thani. Titled. Same lot re-listed 'RUSH SALE', owner bedridden. Your 200m² sea-view original lot at Punta Engaño tip."
  },
  // Build budget (all-in)
  build: {
    phases: [
      { name: "Phase 1 — Lock-up + Pool + Lot (funded now)", php: 6000000, aud: 160000, coveredByCleared: true,  ratio: 1.78, note: "Grey mid + lot + pool. Fully within cleared $587k." },
      { name: "Phase 2 — Finishes + Epoxy + Cabinetry + Kitchen + Bath + Solar (deferred)", php: 9675000, aud: 258000, coveredByCleared: false, ratio: null, note: "Self-funded from rental income later. Deferred — lock-up protects asset first." },
      { name: "Phase 3 — Scale loop (after Villa #1 earning)", php: null, aud: null, coveredByCleared: false, ratio: null, note: "Job (Manila/SG/Dubai) funds Villa #1 manager + builds savings. Buy lot #2 (~₱5M), build Villa #2 to lock-up only (~₱15.5M/$413k). Each villa self-funds the next lock-up. Exit AU fully (183-day tax residency cut) so PH 25% / SG 0% applies." }
    ],
    totalPhp: 16792500,
    totalAud: 447800,
    villaBreakdown: {
      greyBuildLow: 8500000,     // structure, roof, cladding, windows, doors, sliding
      staffQuarters: 400000,    // caretaker in-shell, keeps 6BR rentable
      finishes: 6000000,        // walls, cabinetry, wiring
      luxuryEpoxyFlooring: 1500000,
      cabinetry: 525000,        // $2,000 AUD per bedroom + TV room (7 spaces)
      kitchenUpgrade: 375000,   // $10,000 AUD
      bathrooms: 525000,        // $2,000 AUD each (7 baths: 6 ensuite + 1 common)
      lotCost: 4500000,
      pool: 1500000,
      solar10kw: 750000,
      contingency10pct: 1117500  // 10% on build ex-lot
    },
    specs: {
      floors: 3,
      floorAreaPerFloor: 140,   // m² per floor (design basis)
      totalBuildArea: 420,       // 3 × 140 (approx — actual on 241m² lot may be tighter)
      bedrooms: 6,
      bathrooms: 7,             // 6 ensuite + 1 common
      designNote: "3-storey 6BR on ~204m² lot near tip rotonda confirms build model fits a ~200m² tip lot. Your 241m² plan is feasible and demand-validated on-site. Shangri-La-grade finishes across 6 suites may need ~300–360m² — tight inside 420m²/3-floor plan (may need 4–5 full suites + 1–2 smaller, or larger build)."
    },
    gapNote: "All-in vs cleared $587k (AUD) = −$139,200 gap if built all at once. Phase-staggered: Phase 1 (~$160k / $8.35M PHP-equiv) fully within cleared; Phase 2 (~$258k / $9.675M PHP-equiv) deferred. Net gap bridged by sequencing."
  },
  // Market rates (2026 competitor rates, Airbnb/VRBO/Booking/FB)
  market: {
    competitors: [
      { name: "Anza Mactan Beach House (5BR beachfront+pool)", beds: 5, rateUsd: "$844–917", rateAud: "$1,283–1,401", occupancy: "60%", monthlyAud: "$23,092", source: "VRBO" },
      { name: "FB Exclusive Luxury Pool Villa (up to 20 guests)", beds: 6, rateUsd: "$855", rateAud: "$1,300", occupancy: "55%", monthlyAud: "$21,443", source: "FB" },
      { name: "Travelocity premium villa (6BR)", beds: 6, rateUsd: "$835", rateAud: "$1,269", occupancy: "55%", monthlyAud: "$20,942", source: "Travelocity" },
      { name: "Booking top Mactan villa (5BR)", beds: 5, rateUsd: "$307", rateAud: "$467", occupancy: "60%", monthlyAud: "$8,400", source: "Booking" }
    ],
    yourTarget: {
      beds: 6,
      ratePhp: "₱150k/month",
      rateUsd: "~$4,800/month",
      rateAud: "~$5,790/month",
      occupancy: "55%",
      nightlyImplied: "~$146/night (conservative floor)",
      note: "Market 5-6BR luxury villas = $1,000–1,000+/night. Your villa is MORE luxurious than Anza-class competitors, so $1,100–1,400/night is achievable. At $1,100/night, 55% occ → ~$1.7M AUD/yr net (vs ₱150k/mo = ~$70k AUD/yr assumption). Your rental model is 20x conservative."
    },
    premiumScenarios: {
      marketMatch: { rateUsd: 844, occ: 0.55, monthlyAud: 21168, annualAudNet75: 190508 },
      premium:     { rateUsd: 1100, occ: 0.55, monthlyAud: 27588, annualAudNet75: 248292 },
      premiumHigh: { rateUsd: 1400, occ: 0.50, monthlyAud: 31920, annualAudNet75: 287280 }
    },
    locationAdvantage: "200m from Dusit Thani / Mövenpick / Shangri-La. Luxury hotels pull affluent travellers to Punta Engaño; villa captures the 'want the location, more space/privacy' group WITHOUT strata drag. Hotels anchor price (Shangri-La $200–350/room, Mövenpick res ₱45–60k/mo) so your $100/room ($400–480/night whole villa) looks cheap for 5–6BR. Exit value permanent: '200m from Shangri-La' is a lasting premium."
  },
  // Competition (luxury 4/5/6BR villas, Mactan / Punta Engaño)
  competition: [
    { platform: "Airbnb",  property: "Private Beach Villa in Anza Mactan w/ Ocean View",  beds: 5, baths: 4, location: "Punta Engaño (beachfront)", rateUsd: "$844–917 (base)", feature: "Beachfront, private pool, sleeps 16", url: "https://www.airbnb.com/rooms/882415197823634288", tier: "YES", note: "True luxury — beachfront 5BR, private pool" },
    { platform: "Booking", property: "Private Beach Villa in Anza Mactan (Ocean View)", beds: 5, baths: 4, location: "Punta Engaño (beachfront)", rateUsd: "$854 (from)", feature: "Beachfront, near Shangri-La/Mövenpick", url: "https://www.booking.com/hotel/ph/anza-mactan-beach-house.html", tier: "YES", note: "Same Anza property (Booking) — true luxury" },
    { platform: "VRBO",   property: "Anza Mactan Beach House 5BR", beds: 5, baths: 4, location: "Punta Engaño (beachfront)", rateUsd: "$844 (from, incl taxes)", feature: "Beachfront, private pool", url: "https://www.vrbo.com/4677149", tier: "YES", note: "Same Anza property (VRBO) — true luxury" },
    { platform: "Agoda",  property: "Villa Amare (Luxury Pool Villa)", beds: 5, baths: 6, location: "Cebu (Lapu-Lapu area)", rateUsd: "UNVERIFIED", feature: "5BR/6BA, 900m², private pool, sauna, karaoke", url: "https://www.agoda.com/luxury-pool-villa-villa-amare/hotel/cebu-ph.html", tier: "YES", note: "Verified specs but rate hidden on Agoda. Inland Mactan near airport — different sub-market from your beachfront Punta Engaño play." },
    { platform: "Agoda",  property: "Luxury 4-Bedroom Villa in Mactan, Cebu", beds: 4, baths: null, location: "Mactan, Cebu", rateUsd: "—", feature: "Relaxation/elegance focus", url: "https://www.agoda.com/en-in/luxury-4-bedroom-villa-in-mactan-cebu-h30297195/hotel/cebu-ph.html", tier: "NO", note: "Generic 4BR 'luxury' label, no standout amenity — mid-tier" }
  ],
  competitionNote: "TRUE LUXURY COMP SET = Anza (5BR beachfront Punta Engaño, $844–917, RATE CONFIRMED via VRBO/Booking/Airbnb) + Villa Amare (5BR/900m² inland Mactan, RATE UNVERIFIED — Agoda hides it). Only 2 confirmed standalone luxury villas. Your 6BR beachfront/jetty at Punta Engaño tip enters a near-empty premium slot. Most competitors do NOT publish per-room rates — they sell whole-villa. 6BR whole-villa competition is thin in Punta Engaño.",
  positioning: "6BR private villa, Punta Engaño tip, Shangri-La-grade bedrooms, private pool + beach/jetty — rented WHOLE at $100–140/room vs Shangri-La's $200–350/room. Resort quality, villa privacy, 40–70% less per room. Scarce: no confirmed 6BR at this spec at the tip.",
  riskNote: "Shangri-La-grade finishes may exceed the ₱6M finishes budget across 6 suites — verify fit-out cost before locking the 'quality' claim. Build size: 6 suite-grade BRs need ~300–360m²; tight inside 420m²/3-floor plan (may need 4–5 full suites + 1–2 smaller, or larger build).",
  sources: "Mactan Villa Budget, Land Options, Mactan Villa Market Rate, Competition (Mactan Villas) — tabs from Warren's 5-143-Sussex-CTG-workbook.xlsx. Web search 2026-08-28. FX: PHP→AUD 37.5, USD→AUD 1.52."
};

// Export
const MACTAN = MACTAN_VILLA;
