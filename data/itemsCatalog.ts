import { StatType } from '../types/game';

export interface CatalogItem {
  id: string;
  title: string;
  category: 'evidence' | 'gear';
  classification: string;
  sourceLabel: string;
  summary: string;
  documentExcerpt: string[];
  gameplayEffect: string;
  // For black-market gear items sold at nodes
  soldAtNodeId?: string;
  priceCash?: number;
  statBoost?: { stat: StatType; delta: number };
  composureBonus?: number;
}

export const ITEMS_CATALOG: Record<string, CatalogItem> = {
  // ----------------------------------------------------
  // EVIDENCE DOSSIER ITEMS
  // ----------------------------------------------------
  docket_409_raw: {
    id: 'docket_409_raw',
    title: 'Docket #409 (Bloodstained Originals)',
    category: 'evidence',
    classification: 'DPCI HAWKS // EXHIBIT A-409',
    sourceLabel: 'Recovered by Constable Nandi (N2 Weighbridge)',
    summary:
      'A water-damaged manila folder containing municipal emergency water-tanker invoices, weighbridge slips, and signed SAPS TRT convoy orders.',
    documentExcerpt: [
      'MUNICIPAL VOUCHER #8841-B: Paid R42,500,000.00 to ZULULAND AQUA-LOGISTICS (PTY) LTD for emergency potable water delivery (Northern Ward 14–19).',
      'HANDWRITTEN MARGIN NOTE (AUDITOR SITHOLE): "Tanker registration plates ND-449-102 through ND-449-118 never crossed the Umgeni bridge. Port transponders place all 16 tankers inside Pier 2 Cold Storage at 01:30 AM."',
    ],
    gameplayEffect:
      'Required to run "Cross-Reference Docket #409" at your Mercury Arcade Safehouse.',
  },

  auditor_encrypted_phone: {
    id: 'auditor_encrypted_phone',
    title: "Murdered Auditor's Handset",
    category: 'evidence',
    classification: 'DPCI HAWKS // DIGITAL EXHIBIT B-19',
    sourceLabel: 'Pulled from N2 Ambush Wreckage',
    summary:
      'A cracked GraphemeOS smartphone belonging to municipal forensic auditor Mandla Sithole. Locked behind biometric and hardware-key encryption.',
    documentExcerpt: [
      '[LOCK SCREEN WARNING]: 2 Failed Biometric Attempts. Remote Wipe Armed by Abasanta Cyber-Security.',
      '[PARTIAL CACHED NOTIFICATION]: Voice Note (01:44) recorded at Pier 2 Berth 14 — "Clear the weighbridge at midnight..."',
    ],
    gameplayEffect:
      'Required to run "Crack Auditor’s Handset" with Sparks at Golden Dragon Cyber-Pawn (N5).',
  },

  decoded_tanker_ledger: {
    id: 'decoded_tanker_ledger',
    title: 'Decoded Water-Tanker Ledger',
    category: 'evidence',
    classification: 'VERIFIED FINANCIAL INTELLIGENCE // LEVEL 4',
    sourceLabel: 'Cross-Referenced at Mercury Arcade Flat',
    summary:
      'Irrefutable forensic proof tying Councillor Ma-Sibi’s R400m municipal water-tanker tender to Zuko Ndlovu’s chemical precursor shipments.',
    documentExcerpt: [
      'SHELL COMPANY MATCH: Zululand Aqua-Logistics is 60% owned by Abasanta Maritime Holdings (BVI) and 40% by a family trust controlled by Councillor Khumalo ("Ma-Sibi").',
      'CARGO MANIFEST DISCREPANCY: Municipal tankers are lined with industrial stainless-steel bladders carrying methylamine precursor from Berth 14 to inland super-labs.',
    ],
    gameplayEffect:
      'Unlocks City Hall Annex (N4), Pier 2 Cold Storage (N6), Colonel van der Merwe’s briefing, Ma-Sibi’s hush-money deal, and all 3 Act 1 Finale paths.',
  },

  berth_14_manifest: {
    id: 'berth_14_manifest',
    title: 'Berth 14 Audio & Cargo Manifest',
    category: 'evidence',
    classification: 'DECRYPTED WIRETAP // EYES ONLY',
    sourceLabel: 'Decrypted by Sparks at Golden Dragon Cyber-Pawn',
    summary:
      'Cloned flash drive containing Brigadier Mokoena’s recorded voice ordering the N2 hit alongside tonight’s Berth 14 container crane schedule.',
    documentExcerpt: [
      'AUDIO TRANSCRIPT (00:48): [BRIGADIER MOKOENA]: "The auditor took photos of container MSCU-908114 at Berth 14. Take two unmarked Golf GTIs, intercept his sedan before the Umgeni off-ramp, and burn the briefcase."',
      'CONTAINER SCHEDULE: Vessel MV Southern Cross discharging 18 drums Industrial Precursor at Pier 2, Berth 14 — Convoy Departure 23:59.',
    ],
    gameplayEffect:
      'Unlocks Pier 2 Cold Storage (N6), The Old Archive Basement (N7), and all 3 Act 1 Finale paths.',
  },

  saps_radio_scanner: {
    id: 'saps_radio_scanner',
    title: 'Cloned SAPS TRT Radio Scanner',
    category: 'evidence',
    classification: 'COUNTER-SURVEILLANCE HARDWARE',
    sourceLabel: 'Soldered at Golden Dragon Cyber-Pawn',
    summary:
      'A modified digital trunking transceiver flashed with Central Precinct’s rotating encryption keys.',
    documentExcerpt: [
      '[LIVE CHANNEL 4 — CENTRAL PRECINCT TRT]: "All Shanela units, maintain stop-and-search cordons along Queen Street and Mercury Arcade. Any vehicle carrying Hawks badge #409 is to be detained on sight."',
    ],
    gameplayEffect:
      'Permanently bypasses all SAPS Roadblock travel costs (no R200 bribe or 1 Die detour required).',
  },

  // ----------------------------------------------------
  // BLACK-MARKET GEAR & UPGRADES (PHASE 9)
  // ----------------------------------------------------
  item_burner_sim_array: {
    id: 'item_burner_sim_array',
    title: "Sparks' Multi-IMSI Burner Array",
    category: 'gear',
    classification: 'BLACK-MARKET SIGNALS GEAR',
    sourceLabel: 'Golden Dragon Cyber-Pawn (Sparks)',
    summary:
      'A pocket GSM packet sniffer and rotating eSIM array that spoofs municipal cell towers and accelerates brute-force decryption.',
    documentExcerpt: [
      'HARDWARE SPEC: 8-channel SDR transceiver pre-loaded with cloned eThekwini municipal maintenance certificates.',
    ],
    gameplayEffect: 'Permanently grants +1 WIRE stat.',
    soldAtNodeId: 'n5_cyber_pawn',
    priceCash: 900,
    statBoost: { stat: 'wire', delta: 1 },
  },

  item_forged_auditor_id: {
    id: 'item_forged_auditor_id',
    title: 'Forged Treasury Compliance Credentials',
    category: 'gear',
    classification: 'COUNTERFEIT MUNICIPAL CLEARANCE',
    sourceLabel: 'Golden Dragon Cyber-Pawn (Sparks)',
    summary:
      'Holographic Provincial Treasury lanyard and smartcard that opens restricted municipal registry cabinets without raising clerk suspicion.',
    documentExcerpt: [
      'CREDENTIAL ID: PROVINCIAL AUDIT TASK TEAM — CLEARANCE TIER 4 (UNANNOUNCED MUNICIPAL INSPECTION).',
    ],
    gameplayEffect: 'Permanently grants +1 DOCKETS stat.',
    soldAtNodeId: 'n5_cyber_pawn',
    priceCash: 1000,
    statBoost: { stat: 'dockets', delta: 1 },
  },

  item_kevlar_vest: {
    id: 'item_kevlar_vest',
    title: 'Scratch-Serial Kevlar Under-Vest',
    category: 'gear',
    classification: 'TACTICAL BALLISTIC PROTECTION',
    sourceLabel: 'Queen Street Taxi Rank (Bra Bheki’s Armourer)',
    summary:
      'Concealable Level IIIA ballistic panels salvaged from an hijacked cash-in-transit van. Essential when working the docks or taxi ranks.',
    documentExcerpt: [
      'STENCIL MARKING (SANDED OFF): FIDELITY CIT ARMOURED RESPONSE — UNIT #77.',
    ],
    gameplayEffect: 'Permanently grants +1 STREET stat and +10% Composure.',
    soldAtNodeId: 'n2_taxi_rank',
    priceCash: 1100,
    statBoost: { stat: 'street', delta: 1 },
    composureBonus: 10,
  },

  item_vip_transponder: {
    id: 'item_vip_transponder',
    title: 'Blue-Light VIP Dashboard Strobe',
    category: 'gear',
    classification: 'POLITICAL SYNDICATE HARDWARE',
    sourceLabel: 'Queen Street Taxi Rank (Bra Bheki’s Contacts)',
    summary:
      'Magnetic dash-mounted strobe and tinted window permit used by municipal bodyguards and tenderpreneurs to intimidate precinct clerks.',
    documentExcerpt: [
      'PERMIT STAMP: ETHEKWINI MAYORAL SECURITY DETAIL — EXEMPT FROM MUNICIPAL WEIGHBRIDGE STOP.',
    ],
    gameplayEffect: 'Permanently grants +1 INFLUENCE stat.',
    soldAtNodeId: 'n2_taxi_rank',
    priceCash: 1000,
    statBoost: { stat: 'influence', delta: 1 },
  },

  // ----------------------------------------------------
  // ACT 2 LEGACY & EVIDENCE ITEMS ("THE COMMISSION OF INQUIRY")
  // ----------------------------------------------------
  item_act1_scorched_valves: {
    id: 'item_act1_scorched_valves',
    title: 'Scorched Berth 14 Valve Manifest',
    category: 'evidence',
    classification: 'ACT 1 LEGACY // VIGILANTE EXHIBIT',
    sourceLabel: 'Salvaged from the Berth 14 Harbour Fire',
    summary:
      'Heat-blistered stainless-steel tank plates and destination waybills recovered before the Pier 2 firebrigade arrived.',
    documentExcerpt: [
      'STAMPED CONSIGNEE: MIDLANDS HYDROPONIC CITRUS ESTATE (LOT 44, HOWICK SPUR).',
      'RESIDUE ANALYSIS: Unburned methylamine precursor bound for inland crystal synthesis.',
    ],
    gameplayEffect:
      'Carried over from the Vigilante Path (+1 STREET bonus applied on Act 2 entry).',
  },

  item_act1_subpoena_warrant: {
    id: 'item_act1_subpoena_warrant',
    title: 'Section 205 High Court Subpoena',
    category: 'evidence',
    classification: 'ACT 1 LEGACY // WHISTLEBLOWER EXHIBIT',
    sourceLabel: 'Signed by Judge Khumalo (Commission of Inquiry)',
    summary:
      'Emergency judicial warrant compelling Umhlanga Ridge corporate secretaries and telecommunications providers to surrender offshore trust records.',
    documentExcerpt: [
      'IN THE HIGH COURT OF SOUTH AFRICA (KWAZULU-NATAL DIVISION): Warrant to seize all beneficial ownership ledgers linked to Sovereign Pearl Holdings.',
    ],
    gameplayEffect:
      'Carried over from the Whistleblower Path (+1 DOCKETS bonus applied on Act 2 entry).',
  },

  item_act1_shadow_retainer: {
    id: 'item_act1_shadow_retainer',
    title: 'Abasanta Shadow Retainer Key',
    category: 'evidence',
    classification: 'ACT 1 LEGACY // KINGPIN EXHIBIT',
    sourceLabel: 'Handed over by Zuko Ndlovu at The Glass House',
    summary:
      'A titanium cold-storage hardware key granting VIP entry to Umhlanga Ridge penthouses and a 20% cut of the Northern water-tanker route.',
    documentExcerpt: [
      'LEDGER ENTRY: "Retainer Account #09-ZA — Authorized Logistics Fixer. Biometric gate clearance: The Ridge & Hangar 7."',
    ],
    gameplayEffect:
      'Carried over from the Kingpin Path (+R1,500 retainer cash applied on Act 2 entry).',
  },

  offshore_trust_deed: {
    id: 'offshore_trust_deed',
    title: 'Sovereign Pearl Offshore Trust Deed',
    category: 'evidence',
    classification: 'ACT 2 BREAKTHROUGH // SUPREME EXHIBIT A',
    sourceLabel: 'Traced via High Court & Umhlanga Ridge Servers',
    summary:
      'Unredacted beneficial-ownership register proving that Councillor Ma-Sibi, Brigadier Mokoena, and Zuko Ndlovu co-own the Dubai charter jet and Midlands super-lab.',
    documentExcerpt: [
      'TRUSTEE SCHEDULE (DIFC DUBAI): Sovereign Pearl Holdings — 45% Z. Ndlovu, 30% Cllr. N. Khumalo ("Ma-Sibi"), 25% Brig. T. Mokoena.',
      'FLIGHT CHARTER ESCROW: Gulfstream G550 (Reg: ZS-900) fuelled at King Shaka Cargo Apron (Hangar 7) for emergency midnight extraction.',
    ],
    gameplayEffect:
      'Unlocks Hydroponic Citrus Estate (N11), King Shaka Cargo Apron (N12), and the Act 2 Hangar 7 Grand Finale.',
  },

  superlab_batch_telemetry: {
    id: 'superlab_batch_telemetry',
    title: 'Midlands Super-Lab Batch Telemetry',
    category: 'evidence',
    classification: 'ACT 2 BREAKTHROUGH // SUPREME EXHIBIT B',
    sourceLabel: 'Extracted from Northern Township Tanker GPS & Citrus Estate',
    summary:
      'Encrypted telemetry logs and chemical synthesis batch sheets linking the dry township water taps directly to the Midlands hydroponic packhouse.',
    documentExcerpt: [
      'GPS TELEMETRY MATCH: 14 Municipal Water Tankers diverted from KwaMashu Reservoir to Midlands Citrus Estate Packhouse B between 01:00 and 04:00 SAST.',
      'YIELD LOG: 1.8 metric tons pure crystal product packaged in export citrus crates bound for King Shaka Hangar 7.',
    ],
    gameplayEffect:
      'Unlocks Hydroponic Citrus Estate (N11), King Shaka Cargo Apron (N12), and the Act 2 Hangar 7 Grand Finale.',
  },

  item_sat_uplink: {
    id: 'item_sat_uplink',
    title: 'Inmarsat BGAN Encrypted Sat-Terminal',
    category: 'gear',
    classification: 'ACT 2 TIER-2 BLACK-MARKET HARDWARE',
    sourceLabel: 'The Ridge Penthouses (Rogue Corporate Security)',
    summary:
      'A briefcase satellite uplink that bypasses local Eskom load-shedding cell tower blackouts and links directly to offshore financial registries.',
    documentExcerpt: [
      'UPLINK STATUS: LOCKED TO INDIAN OCEAN SATELLITE BEAM — ZERO LOCAL SAPS INTERCEPT FOOTPRINT.',
    ],
    gameplayEffect: 'Permanently grants +1 WIRE stat and +10% Composure.',
    soldAtNodeId: 'n8_ridge_penthouses',
    priceCash: 1300,
    statBoost: { stat: 'wire', delta: 1 },
    composureBonus: 10,
  },

  // ----------------------------------------------------
  // CAMPAIGN KEYSTONE DOSSIERS (CROSS-STORY ARTIFACTS)
  // ----------------------------------------------------
  dossier_sovereign_pearl: {
    id: 'dossier_sovereign_pearl',
    title: 'Sovereign Pearl Trust Deed & Tarmac Ciphers',
    category: 'evidence',
    classification: 'NATIONAL SECURITY KEYSTONE // LEVEL 5',
    sourceLabel: 'Extracted from King Shaka Hangar 7 & High Court Chambers',
    summary:
      'Proves that hundreds of millions laundered through Durban emergency water tenders funded Highveld coal sabotage fronts and Sandton offshore trusts.',
    documentExcerpt: [
      'DIFC DUBAI ESCROW #884-Z: Sovereign Pearl Holdings wired R140,000,000.00 to MEGAWATT LOGISTICS (PTY) LTD, Sandton, Johannesburg.',
      'CIPHER RECOVERED: "Highveld grid collapse scheduled for winter peak. All emergency diesel purchase orders pre-authorized by Ministry."',
    ],
    gameplayEffect:
      'Unlocks Story 2: Highveld-Chrome. Carries forward +1 DOCKETS stat and federal immunity credentials into subsequent campaigns.',
  },

  // ----------------------------------------------------
  // STORY 2: HIGHVELD-CHROME EVIDENCE & GEAR
  // ----------------------------------------------------
  evidence_lerato_audit_notes: {
    id: 'evidence_lerato_audit_notes',
    title: "Lerato's Cold Case Audit Notes",
    category: 'evidence',
    classification: 'SPECIAL INVESTIGATING UNIT // EXHIBIT LK-01',
    sourceLabel: 'Found in Sister’s Recovered Laptop (M1 Wreckage)',
    summary:
      'Handwritten audit logs and thermal scans proving coal conveyor belt #4 at Kendon was sabotaged with thermite cutter charges.',
    documentExcerpt: [
      'MEMO TO CHIEF AUDITOR (LERATO MOLEFE): "Conveyor belt 4 snapped at 19:42 due to artificial acid exposure, not fatigue. The resulting outage triggered R320 million in emergency diesel purchasing within 48 hours."',
      'AUDIT NOTE: "Dispatch records show the replacement diesel was invoiced by Megawatt Fuel Logistics, an entity registered to an NIA front company in Pretoria."',
    ],
    gameplayEffect:
      'Required to cross-reference evidence at Braamfontein Safehouse (H1) and begin compiling the SIU Tribunal Docket.',
  },

  evidence_bloomberg_substation_telemetry: {
    id: 'evidence_bloomberg_substation_telemetry',
    title: 'Bloomberg Arbitrage Telemetry Log',
    category: 'evidence',
    classification: 'FINANCIAL FORENSIC INTELLIGENCE // SANDTON',
    sourceLabel: 'Extracted from Helena Van Niekerk’s Executive Terminal (H2)',
    summary:
      'Internal trade tickets showing Sandton energy traders shorting industrial power contracts 2 hours before every major substation trip.',
    documentExcerpt: [
      'TRADE RECORD #8819-ZA: Forward contract executed at 17:15. Projected yield: R48,000,000.00 upon grid frequency drop below 48.5Hz.',
      'SIGNAL FEED: Encrypted telematic channel linked directly to Hillbrow 88kV Substation relay switch #3.',
    ],
    gameplayEffect:
      'Advances the SIU Tribunal Docket clock and unlocks high-stakes confrontation with Helena Van Niekerk.',
  },

  evidence_zamazama_reef_map: {
    id: 'evidence_zamazama_reef_map',
    title: 'Crown Mines Stope Survey Map',
    category: 'evidence',
    classification: 'CARTOGRAPHIC UNDERGROUND SURVEY // RESTRICTED',
    sourceLabel: 'Obtained from Mkhulu Sibanyoni at Crown Mines Shaft 4 (H4)',
    summary:
      'A hand-drawn map of the flooded 2,000-metre stope levels beneath southern Johannesburg, showing abandoned explosives caches and hidden gold smelting operations.',
    documentExcerpt: [
      'SURVEY NOTE: "Level 14 cross-cut connects directly into the old municipal sewer trunk line beneath Braamfontein."',
      'WARNING: "Methane pockets at Level 18. Never enter without a certified mining respirator or flame lamp."',
    ],
    gameplayEffect:
      'Bypasses rockfall hazard penalties and unlocks fast travel between Crown Mines (H4) and Braamfontein Safehouse (H1).',
  },

  evidence_nia_sabotage_order: {
    id: 'evidence_nia_sabotage_order',
    title: 'Signed NIA Substation Sabotage Directive',
    category: 'evidence',
    classification: 'STATE SECURITY AGENCY // TOP SECRET / CIPHER',
    sourceLabel: 'Recovered from Union Buildings Security Wing (H5)',
    summary:
      'An unredacted executive order signed by General Sibusiso Sithole directing covert tactical cells to disable key transmission substations during peak winter demand.',
    documentExcerpt: [
      'OPERATION DIRECTIVE BLACK-SKY: "Target Hillbrow 88kV Substation and Kendon Coal Depot. Force Stage 6 declaration. Authorize emergency OCGT procurement."',
      'SECURITY MANDATE: "All civilian forensic investigators are to be treated as hostile state adversaries."',
    ],
    gameplayEffect:
      'The definitive smoking gun linking state security to the coal mafia. Required for the SIU Tribunal Vindication Ending.',
  },

  gear_highveld_rebreather: {
    id: 'gear_highveld_rebreather',
    title: 'Industrial Dräger Mining Respirator',
    category: 'gear',
    classification: 'TACTICAL UNDERGROUND EQUIPMENT',
    sourceLabel: 'Acquired at Braamfontein Safehouse (H1) / Crown Mines (H4)',
    summary:
      'A heavy-duty closed-circuit oxygen rebreather that protects against toxic stope gas, cyanide fumes, and winter smog.',
    documentExcerpt: [
      'SPECIFICATIONS: 4-hour chemical oxygen cartridge with twin particulate filters. Rated for deep-level quartzite dust and methane.',
    ],
    gameplayEffect:
      'Immunity to Composure loss from Highveld Winter Smog and protects against Crown Mines toxic gas events.',
    priceCash: 450,
    soldAtNodeId: 'h1_braamfontein_safehouse',
    composureBonus: 10,
  },

  gear_substation_scada_key: {
    id: 'gear_substation_scada_key',
    title: 'Eskom SCADA Optical Bypass Dongle',
    category: 'gear',
    classification: 'CYBER-FORENSIC HARDWARE',
    sourceLabel: 'Purchased from Red Guard Technicians (H3)',
    summary:
      'A cloned optical transceiver calibrated to override digital relays in 88kV and 132kV substations without alerting remote dispatch.',
    documentExcerpt: [
      'DEVICE LOG: "SCADA v4.2 Handshake spoofed. Breaker status reported as NORMAL during manual phase disconnect."',
    ],
    gameplayEffect:
      'Grants +1 WIRE stat and allows free action execution at Hillbrow Substation even during Stage 6 blackouts.',
    priceCash: 600,
    soldAtNodeId: 'h3_hillbrow_substation',
    statBoost: { stat: 'wire', delta: 1 },
  },

  gear_sandton_pass: {
    id: 'gear_sandton_pass',
    title: 'Sandton Corporate Arbitrage Smart-Card',
    category: 'gear',
    classification: 'EXECUTIVE VIP CREDENTIAL',
    sourceLabel: 'Acquired at Sandton Financial Monolith (H2)',
    summary:
      'An engraved platinum RFID card granting biometric elevator access to Sandton’s most exclusive private trading floors and penthouses.',
    documentExcerpt: [
      'HOLDER: Executive Consultant — Sovereign Pearl Arbitrage Trust. Unlimited lounge and boardroom clearance.',
    ],
    gameplayEffect:
      'Grants +1 INFLUENCE stat and grants immunity to corporate security checks at Sandton Tower (H2).',
    priceCash: 800,
    soldAtNodeId: 'h2_sandton_tower',
    statBoost: { stat: 'influence', delta: 1 },
  },

  dossier_project_midas: {
    id: 'dossier_project_midas',
    title: 'Project Midas Highveld Coal Ledger',
    category: 'evidence',
    classification: 'NATIONAL SECURITY KEYSTONE // LEVEL 5',
    sourceLabel: 'Extracted from Sandton Server Vault & Witwatersrand Shafts',
    summary:
      'Proves diesel contract kickbacks are laundered into rough, uncertified conflict diamonds dredged along the Skeleton Coast.',
    documentExcerpt: [
      'ESCROW TRANSFER: R280,000,000.00 converted to 14,000 carats uncut industrial diamonds via Port Nolloth concession #B-19.',
      'SITREP: "Private military contractors taking delivery of maritime radar at Alexander Bay airstrip."',
    ],
    gameplayEffect:
      'Unlocks Story 3: Namaqua-Diamond. Carries forward +1 WIRE stat and encrypted cold-storage access into subsequent campaigns.',
  },

  // ----------------------------------------------------
  // STORY 3: NAMAQUA-DIAMOND ITEMS
  // ----------------------------------------------------
  evidence_sonar_bathymetry_log: {
    id: 'evidence_sonar_bathymetry_log',
    title: 'Offshore Sonar Bathymetry Survey',
    category: 'evidence',
    classification: 'HYDROGRAPHIC SURVEY // EXHIBIT ND-01',
    sourceLabel: 'Recovered from Salvage Cutter "Minke"',
    summary:
      'High-resolution multi-beam acoustic survey of the Atlantic seabed off Port Nolloth, revealing unmapped diamond suction trenches cutting across maritime concession boundaries.',
    documentExcerpt: [
      'ACOUSTIC LOG: "Seabed depression grid 29°14\'S 16°51\'E dredged down to bedrock gravel layer."',
      'VESSEL TELEMETRY: AIS transponder disabled during nocturnal operations. Unknown dredging craft matched acoustic signature of Aegis-Atlantis gunboat tender.',
    ],
    gameplayEffect:
      'Required to run deep dredging seabed analysis and locate illicit diamond gravel runs.',
  },

  evidence_aegis_arms_bill: {
    id: 'evidence_aegis_arms_bill',
    title: 'Aegis Maritime Armaments Consignment',
    category: 'evidence',
    classification: 'DEFENSE LOGISTICS // CLASSIFIED',
    sourceLabel: 'Infiltrated from Aegis Coastal Compound (D6)',
    summary:
      'A freight manifest and diplomatic clearance waiver for crate shipments landed at Alexander Bay runway, detailing military-grade coastal radar suites and automatic assault carbines.',
    documentExcerpt: [
      'CONSIGNMENT: 12x Furuno FAR-3000 radar transceivers, 200x Galil SAR assault rifles, 40,000 rounds 5.56 NATO.',
      'END USER: "Aegis-Atlantis Coastal Defense Auxiliary // Transshipment via N7 Highway south to Table Bay Warehouse 4."',
    ],
    gameplayEffect:
      'Exposes the mercenaries arming the Cape Town criminal syndicates using diamond profits.',
  },

  evidence_namaqua_diamond_parcel: {
    id: 'evidence_namaqua_diamond_parcel',
    title: 'Rough Alluvial Diamond Parcel (1,200 Carats)',
    category: 'evidence',
    classification: 'UNCERTIFIED CONFLICT MINERAL // LEVEL 4',
    sourceLabel: 'Recovered from De Beers Ghost Mine Sorting Vault (D4)',
    summary:
      'A velvet and oilskin drawstring pouch packed with uncut, gem-quality alluvial diamonds dredged from the Orange River delta gravel beds without Kimberley Process certificates.',
    documentExcerpt: [
      'VALUATION NOTE: 1,240 carats uncut octagonal crystals. Estimated Antwerp street value: R18,500,000.',
      'STAMP: "Uncertified — Concession 4B alluvial runoff. Payment escrow for Project Midas."',
    ],
    gameplayEffect:
      'Provides indisputable proof of energy money laundering into conflict stones.',
  },

  gear_diver_knife: {
    id: 'gear_diver_knife',
    title: 'Titanium Serrated Diver’s Blade',
    category: 'gear',
    classification: 'COMMERCIAL DIVING GEAR',
    sourceLabel: 'Purchased from Tannie Bettie’s Jetty Market (D1)',
    summary:
      'A matte black titanium drop-point knife with rope cutter and depth-gauge sheath, essential for surviving kelp tangles and hostile close-quarters engagements in the surf.',
    documentExcerpt: [
      'ENGRAVING: "Brand & Seuns Salvage — Port Nolloth. Cut clean or sink deep."',
    ],
    gameplayEffect:
      'Grants +1 STREET stat and protects against kelp entanglement during seabed stope dives.',
    priceCash: 450,
    soldAtNodeId: 'd1_port_nolloth_jetty',
    statBoost: { stat: 'street', delta: 1 },
  },

  gear_sand_tracks: {
    id: 'gear_sand_tracks',
    title: 'Reinforced Dune Recovery Tracks',
    category: 'gear',
    classification: 'OVERLAND EXPEDITION EQUIPMENT',
    sourceLabel: 'Purchased from Swartbooi’s Desert Post (D3)',
    summary:
      'Heavy-gauge anodized aluminum recovery boards with aggressive traction teeth, engineered to pull heavy 4x4 bakkies out of soft Richtersveld dune sand.',
    documentExcerpt: [
      'SPECS: Rated for 5-tonne axle load across shifting sand and river silt.',
    ],
    gameplayEffect:
      'Grants +1 DOCKETS stat and bypasses desert radiator overheating penalties on desert nodes.',
    priceCash: 550,
    soldAtNodeId: 'd3_richtersveld_canyon',
    statBoost: { stat: 'dockets', delta: 1 },
  },

  gear_satellite_compass: {
    id: 'gear_satellite_compass',
    title: 'Iridium Satellite Compass & Beacon',
    category: 'gear',
    classification: 'TACTICAL MARITIME AVIONICS',
    sourceLabel: 'Purchased at Orange River Pont Smugglers (D5)',
    summary:
      'A ruggedized differential GPS and Iridium satellite transceiver capable of dead-reckoning navigation through the thickest Atlantic Malmokken fog.',
    documentExcerpt: [
      'DEVICE STATUS: Linked to 66 low-earth orbit satellites. Real-time differential accuracy within 0.5 meters.',
    ],
    gameplayEffect:
      'Grants +1 WIRE stat and eliminates fog navigation penalties across coastal sectors.',
    priceCash: 750,
    soldAtNodeId: 'd5_orange_river_pont',
    statBoost: { stat: 'wire', delta: 1 },
  },

  dossier_admiralty_manifest: {
    id: 'dossier_admiralty_manifest',
    title: 'Table Bay Admiralty Manifest & Diamond Run',
    category: 'evidence',
    classification: 'NATIONAL SECURITY KEYSTONE // LEVEL 5',
    sourceLabel: 'Extracted from Port Nolloth Bakkie Convoy & Marine Radar',
    summary:
      'Documents the clandestine maritime transfer of Cold War armaments shipped south toward Table Bay Harbour to arm private security forces.',
    documentExcerpt: [
      'CARGO BILL #TB-091: 450 tactical assault rifles and biometric surveillance suites consigned to CAPE HARBOUR WAREHOUSE #4.',
      'CONVOY ESCORT: "Provincial Anti-Gang Unit patrol vehicles cleared the N7 corridor between Bitterfontein and Cape Town."',
    ],
    gameplayEffect:
      'Unlocks Story 4: Cape-Nocturne. Carries forward +1 STREET stat and high-frequency military transponder into subsequent campaigns.',
  },

  dossier_red_protocol: {
    id: 'dossier_red_protocol',
    title: 'The Grand Sovereign Protocol (The Red Cipher)',
    category: 'evidence',
    classification: 'TOP SECRET // PRESIDENTIAL EYES ONLY',
    sourceLabel: 'Extracted from Stellenbosch Wine Vaults & Police Headquarters',
    summary:
      'The comprehensive master blueprint unmasking the eight conspirators of The Sovereign Octagon and their plan for nationwide grid shutdown.',
    documentExcerpt: [
      'EXECUTIVE DIRECTIVE #08: "At 00:00, isolate all 9 provincial distribution nodes. Declare National State of Emergency. Transfer executive authority to the Sovereign Council."',
      'SIGNATORIES: Eight cryptographic private keys registered to the Octagon founders.',
    ],
    gameplayEffect:
      'Unlocks Story 5: The Sovereign Octagon Grand Finale and activates the National Master Red-String Conspiracy Web.',
  },
  // Story 4: Cape-Nocturne Evidence & Gear
  evidence_agu_ballistics_dossier: {
    id: 'evidence_agu_ballistics_dossier',
    title: 'Murdered Partner Ballistics Dossier',
    category: 'evidence',
    classification: 'AGU COLD CASE // HOMICIDE EXHIBIT',
    sourceLabel: 'Recovered from Charred AGU Safehouse Ruins (C6)',
    summary:
      'Forensic rifling comparison proving the hollow-point 9mm rounds that executed Detective Hendricks’s partner were fired from Major-General Swart’s personal service weapon.',
    documentExcerpt: [
      'BALLISTICS MATCH: 16 striation landmarks correspond with 99.8% certainty to SAPS-issued Glock 17 Serial #SW-9081 assigned to Provincial Commissioner Swart.',
      'SCENE REPORT: Murder was staged as a Cape Flats gang shootout in Hanover Park.',
    ],
    gameplayEffect:
      'Unlocks Provincial Police HQ (C7) and proves the top tier of provincial police command is actively executing internal whistleblowers.',
  },

  evidence_winelands_trust_ledger: {
    id: 'evidence_winelands_trust_ledger',
    title: 'Stellenbosch Sovereign Trust Ledger',
    category: 'evidence',
    classification: 'CAPITAL CLUB CONFIDENTIAL // OFFSHORE ARCHIVE',
    sourceLabel: 'Extracted from Historic Cellar Vaults (C5)',
    summary:
      'Century-old family wine dynasty trusts routing offshore capital from Geneva and Mauritius to fund private security militias and nightclub extortion rings.',
    documentExcerpt: [
      'SUBTERRANEAN ESCROW: R420,000,000.00 disbursed through Cape Wine Capital Trust to private paramilitary contractor "Aegis-Atlantis Security."',
      'DIRECTIVE: "Ensure container berths 108 through 110 remain under private security oversight during midnight hours."',
    ],
    gameplayEffect:
      'Unlocks Camps Bay Promenade (C3) and provides decisive leverage against Baroness Claudine and the Winelands Capital Club.',
  },

  evidence_pier109_arms_bill: {
    id: 'evidence_pier109_arms_bill',
    title: 'Pier 109 Stevedore Container Manifest',
    category: 'evidence',
    classification: 'TABLE BAY HARBOUR // CUSTOMS EVASION',
    sourceLabel: 'Recovered from Union Stevedore Offices (C4)',
    summary:
      'Port customs manifests showing sealed shipping containers loaded with heavy automatic weapons from Namaqualand falsely classified as agricultural tractor spares.',
    documentExcerpt: [
      'CONTAINER #MSCU-449102: Consignor: Cabo Benguela Logistics, Port Nolloth. Consignee: Long Street Security Holding, Foreshore.',
      'CARGO: "Agricultural pump spares" — X-ray scans indicate 450 tactical assault rifles, crates of night-vision optics, and biometric comms.',
    ],
    gameplayEffect:
      'Unlocks the Table Bay Pier 109 Container Berth Climax and exposes the maritime pipeline arming the private shadow army.',
  },

  evidence_red_cipher_fragment: {
    id: 'evidence_red_cipher_fragment',
    title: 'Red Protocol Cryptographic Key Fragment',
    category: 'evidence',
    classification: 'TOP SECRET // CRYPTOGRAPHIC CIPHER',
    sourceLabel: 'Decrypted via AGU Renegade Lab & Police HQ Safe',
    summary:
      'A partial cryptographic key string that links General Swart, the Winelands trustees, and the Durban and Highveld syndicates directly to The Sovereign Octagon.',
    documentExcerpt: [
      'CIPHER RECOVERED: "OCTAGON_FOUNDER_04 // GENERAL A. SWART // STATUS: CONFIRMED. AUTHORIZATION FOR OPERATION MIDNIGHT SUN GRANTED."',
    ],
    gameplayEffect:
      'Advances the Red Cipher Decryption Clock (+2 progress) and directly unmasks the Cape architect of state capture.',
  },

  gear_reinforced_agu_vest: {
    id: 'gear_reinforced_agu_vest',
    title: 'Reinforced Tactical AGU Vest',
    category: 'gear',
    classification: 'TACTICAL BALLISTIC BODY ARMOR',
    sourceLabel: 'Purchased on Long Street Strip (C1)',
    summary:
      'Ceramic trauma plates rated against high-velocity rifle fire, scavenged from decommissioned Anti-Gang Unit armories.',
    documentExcerpt: [
      'NIJ LEVEL IV RATED: Stops armor-piercing 7.62x39mm rounds. Essential protection when entering Cape Flats gang territory.',
    ],
    gameplayEffect:
      'Grants +1 STREET stat and mitigates Composure loss during gang crossfire events.',
    priceCash: 850,
    soldAtNodeId: 'c1_long_street_strip',
    statBoost: { stat: 'street', delta: 1 },
  },

  gear_encrypted_burner_mesh: {
    id: 'gear_encrypted_burner_mesh',
    title: 'Encrypted Darknet Burner Mesh',
    category: 'gear',
    classification: 'SIGNALS INTELLIGENCE HARDWARE',
    sourceLabel: 'Purchased on Long Street Strip (C1)',
    summary:
      'A localized peer-to-peer radio mesh communicator that connects to pirate repeater antennas across the Cape Flats, completely bypassing police wiretaps.',
    documentExcerpt: [
      'ENCRYPTION: 512-bit ephemeral elliptical curves. Immune to Foreshore cell-tower IMSI catchers.',
    ],
    gameplayEffect:
      'Grants +1 WIRE stat and prevents General Swart’s manhunt clock from advancing during digital investigations.',
    priceCash: 750,
    soldAtNodeId: 'c1_long_street_strip',
    statBoost: { stat: 'wire', delta: 1 },
  },

  gear_stevedore_prybar: {
    id: 'gear_stevedore_prybar',
    title: 'Hardened Stevedore Berth Prybar',
    category: 'gear',
    classification: 'INDUSTRIAL CARGO EXTRACTION TOOL',
    sourceLabel: 'Purchased at Table Bay Berth 109 (C4)',
    summary:
      'Heavy forged tungsten-steel container prybar used by union stevedores to crack tamper-evident customs seals on reinforced shipping containers.',
    documentExcerpt: [
      'SPECIFICATIONS: High-tensile forged steel. Will breach container locking rods in under 30 seconds.',
    ],
    gameplayEffect:
      'Grants +1 DOCKETS stat and unlocks clandestine container searches at Table Bay Berth 109.',
    priceCash: 600,
    soldAtNodeId: 'c4_table_bay_container_berth',
    statBoost: { stat: 'dockets', delta: 1 },
  },

  // ----------------------------------------------------
  // STORY 5: THE SOVEREIGN OCTAGON ("THE GRAND FINALE")
  // ----------------------------------------------------
  dossier_master_archive: {
    id: 'dossier_master_archive',
    title: 'National State Capture Master Dossier',
    category: 'evidence',
    classification: 'CONSTITUTIONAL COURT EXHIBIT // OMEGA',
    sourceLabel: 'Synthesized from All 4 Regional Keystones in Drakensberg Bunker',
    summary:
      'The comprehensive multi-provincial forensic docket uniting eThekwini port corruption, Highveld coal sabotage, Namaqua diamond arms smuggling, and Cape protection rackets directly to the Sovereign Octagon.',
    documentExcerpt: [
      'HIGH COURT SPECIAL TRIBUNAL // EXHIBIT 001-NATIONAL:',
      '"The eight signatories represent an integrated shadow state operating across municipal procurement, power generation, maritime concessions, and police command."',
      'DIRECTIVE: "Deliver in person to the Constitutional Court under armed judicial guard."',
    ],
    gameplayEffect:
      'Unlocks the Constitutional Reckoning Ending and provides decisive leverage against the Octagon conspirators.',
  },

  evidence_omega_protocol: {
    id: 'evidence_omega_protocol',
    title: 'Sovereign Octagon Omega Charter',
    category: 'evidence',
    classification: 'TOP SECRET // SHADOW STATE CONSTITUTION',
    sourceLabel: 'Extracted from Apollo SCADA Terminal & Drakensberg Vault',
    summary:
      'The signed, unredacted covenant detailing Operation Midnight Sun: deliberate Stage 8 national blackout to collapse democratic institutions and transfer state power to the Sovereign Council.',
    documentExcerpt: [
      'SECTION 4.1: "Upon grid frequency collapse below 47.5 Hz, all regional emergency powers automatically vest in the Sovereign Executive Council."',
      'AUTHENTICATION: 8 multi-signature cryptographic keys verified against SARB and Treasury roots.',
    ],
    gameplayEffect:
      'Advances the Decrypt Master Omega Cipher clock (+2 progress) and unlocks the Summit Chamber.',
  },

  evidence_constitutional_indictment: {
    id: 'evidence_constitutional_indictment',
    title: 'Certified Constitutional Treason Indictment',
    category: 'evidence',
    classification: 'NATIONAL PROSECUTING AUTHORITY // SPECIAL INDICTMENT',
    sourceLabel: 'Signed by Deputy Chief Justice in Union Buildings Crypt',
    summary:
      'Emergency Section 179 indictment authorizing the United Hawks Taskforce to execute immediate arrests of all eight Octagon founders without bail.',
    documentExcerpt: [
      'WARRANT OF ARREST: "To all lawful officers of the Republic: You are commanded to apprehend the eight conspirators named herein on charges of High Treason and Subversion."',
    ],
    gameplayEffect:
      'Grants +2 INFLUENCE stat and paralyzes the Octagon’s mercenary legal defense.',
  },

  gear_taskforce_satellite_uplink: {
    id: 'gear_taskforce_satellite_uplink',
    title: 'Taskforce Military Inmarsat Uplink',
    category: 'gear',
    classification: 'SECURE SATELLITE COMMS TERMINAL',
    sourceLabel: 'Drakensberg Bunker Communications Bay (O1)',
    summary:
      'Military-spec hardened satellite transceiver impervious to electronic warfare jamming, providing unbroken command links across all provinces.',
    documentExcerpt: [
      'BANDWIDTH: Encrypted burst telemetry. Immune to Karoo electronic warfare jamming and Stage 8 blackouts.',
    ],
    gameplayEffect:
      'Grants +1 WIRE stat and halts the Airspace Radar Jamming clock during operations.',
    priceCash: 1200,
    soldAtNodeId: 'o1_drakensberg_bunker',
    statBoost: { stat: 'wire', delta: 1 },
  },

  gear_black_sky_respirator: {
    id: 'gear_black_sky_respirator',
    title: 'Black-Sky Command Rebreather',
    category: 'gear',
    classification: 'HAZMAT BATTLEFIELD SURVIVAL SUIT',
    sourceLabel: 'Drakensberg Bunker Armory (O1)',
    summary:
      'Closed-circuit oxygen rebreather and ceramic anti-shrapnel trauma vest, essential for surviving chemical dispersion and nerve-agent defense grids.',
    documentExcerpt: [
      'SPECIFICATIONS: 4-hour positive pressure oxygen loop. Rated against toxic combustion and riot aerosols.',
    ],
    gameplayEffect:
      'Grants +1 STREET stat and protects against Composure loss during mercenary gunship ambushes.',
    priceCash: 1100,
    soldAtNodeId: 'o1_drakensberg_bunker',
    statBoost: { stat: 'street', delta: 1 },
  },

  gear_scada_master_key: {
    id: 'gear_scada_master_key',
    title: 'Apollo SCADA Master Override Key',
    category: 'gear',
    classification: 'CRITICAL INFRASTRUCTURE HARDWARE',
    sourceLabel: 'Apollo SCADA National Grid Command (O3)',
    summary:
      'Optical cryptographic hardware token capable of re-synchronizing high-voltage breakers across all nine provinces during Stage 8 blackouts.',
    documentExcerpt: [
      'CRYPTO TOKEN: National Grid Control Tier-0 clearance. Can initiate national black-start hydro generation in under two minutes.',
    ],
    gameplayEffect:
      'Grants +1 DOCKETS stat and unlocks emergency grid stabilization at Apollo Grid Command.',
    priceCash: 1000,
    soldAtNodeId: 'o3_apollo_grid_command',
    statBoost: { stat: 'dockets', delta: 1 },
  },
};

