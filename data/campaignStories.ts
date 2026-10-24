import { StoryId, StoryMetadata, KeystoneDossier } from '../types/campaign';

export const CAMPAIGN_STORIES: StoryMetadata[] = [
  {
    id: 'story_1_ethekwini',
    number: 1,
    title: 'eThekwini-Gold',
    subtitle: 'The Coastal Gateway',
    region: 'Durban & KwaZulu-Natal Coastal Grid',
    era: 'Act 1: CBD / Waterfront • Act 2: Umhlanga / Midlands',
    protagonistName: 'Warrant Officer (Choose Archetype)',
    protagonistRole: 'Suspended Hawks (DPCI) Investigator',
    caseDocket: 'CASE FILE #409-ZA // GHOST CONVOYS',
    synopsis:
      'A R400 million municipal water-tanker tender used as an off-the-books logistics cover to smuggle liquid chemical precursors from Pier 2 to illicit methamphetamine super-labs in the Midlands.',
    keystoneDossierId: 'dossier_sovereign_pearl',
    keystoneTitle: 'Sovereign Pearl Trust Deed & Tarmac Ciphers',
    keystoneSummary:
      'Unredacted beneficial-ownership register linking port cartels, City Hall politicians, and police generals to Highveld energy fronts.',
    accentColor: 'amber',
    imageArt: '/assets/backgrounds/title_keyart.jpg',
    unlockConditionText: 'Default Active Chapter // Available from Game Start',
    isPlayable: true,
    factions: [
      'Abasanta Logistics',
      'Metro Renewal Coalition',
      'SAPS TRT',
      'Queen Street Alliance',
      'DPCI Hawks Holdouts',
    ],
    regionalMechanic:
      'Rolling Stage 6 Blackouts, Generator Overrides, and SAPS Roadblock Bribes.',
  },
  {
    id: 'story_2_highveld',
    number: 2,
    title: 'Highveld-Chrome',
    subtitle: 'The Capital Syndicate',
    region: 'Johannesburg & Pretoria (Gauteng Gold Grid)',
    era: 'Act 1: Sandton & Hillbrow • Act 2: Union Buildings & Abandoned Reefs',
    protagonistName: 'Kagiso "Bra K" Molefe',
    protagonistRole: 'Disgraced SIU Forensic Investigator',
    caseDocket: 'CASE FILE #711-GP // MEGAWATT SABOTAGE',
    synopsis:
      'Strategic destruction of Eskom power generation to force emergency open-cycle gas turbine diesel tenders, bankrolled by private security oligarchs and corrupt cabinet insiders.',
    keystoneDossierId: 'dossier_project_midas',
    keystoneTitle: 'Project Midas Highveld Coal Ledger',
    keystoneSummary:
      'Encrypted cold-storage ledger proving emergency diesel profits are converted into rough conflict diamonds in the Northern Cape.',
    accentColor: 'cyan',
    imageArt: '/assets/backgrounds/story2_highveld_keyart.jpg',
    unlockConditionText:
      'Requires completing Story 1: eThekwini-Gold and recovering the Sovereign Pearl Trust Deed.',
    isPlayable: true,
    factions: [
      'The Megawatt Cartel',
      'Sandton Energy Arbitrage',
      'The Reef Zama-Zamas',
      'SIU Clean Hands',
      'The Red Guard Populists',
    ],
    regionalMechanic:
      'Substation Grid Overload, Deep Mine Shaft Gas / Rockfall Hazard Clocks (0/6), and Highveld Winter Smog.',
  },
  {
    id: 'story_3_namaqua',
    number: 3,
    title: 'Namaqua-Diamond',
    subtitle: 'The Desert Skeleton Coast',
    region: 'Port Nolloth & Richtersveld Desert (Northern Cape)',
    era: 'Act 1: Skeleton Coast Dredging • Act 2: Orange River Border Strip',
    protagonistName: 'Captain Gideon "Giepie" Brand',
    protagonistRole: 'Ex-Maritime Border Diver & Desert Tracker',
    caseDocket: 'CASE FILE #204-NC // OPERATION DEEP-GRAVEL',
    synopsis:
      'Unregistered seabed diamond-dredging concessions, cross-border arms drops, and private naval mercenaries laundering energy cash into international conflict stones.',
    keystoneDossierId: 'dossier_admiralty_manifest',
    keystoneTitle: 'Table Bay Admiralty Manifest & Diamond Run',
    keystoneSummary:
      'Documents a clandestine maritime transfer of Cold War tactical armaments and biometric ciphers shipped south toward Table Bay Harbour.',
    accentColor: 'orange',
    imageArt: '/assets/backgrounds/story3_namaqua_keyart.jpg',
    unlockConditionText:
      'Requires completing Story 2: Highveld-Chrome and recovering the Project Midas Ledger.',
    isPlayable: true,
    factions: [
      'Aegis-Atlantis Marine Security',
      'The Artisanal Shore Divers',
      'The Kalahari Runners',
      'Namaqua Coastal Command',
      'The Namib Diamond Syndicate',
    ],
    regionalMechanic:
      'Coastal Fog (The Malmokken) Infiltration Stealth vs. Desert Fuel Scarcity & Jerrycan logistics.',
  },
  {
    id: 'story_4_cape',
    number: 4,
    title: 'Cape-Nocturne',
    subtitle: 'The Shadow Oligarchy',
    region: 'Cape Town & The Winelands (Western Cape)',
    era: 'Act 1: Camps Bay & Long Street • Act 2: Manenberg & Stellenbosch Cellars',
    protagonistName: 'Leila Hendricks',
    protagonistRole: 'Former Anti-Gang Unit Detective turned PI',
    caseDocket: 'CASE FILE #990-WC // THE RED SOVEREIGN',
    synopsis:
      'A shadow alliance of provincial police generals, unified Cape Flats gang cartels, and historic Winelands oligarchs arming a private security army to control the night economy and export docks.',
    keystoneDossierId: 'dossier_red_protocol',
    keystoneTitle: 'The Grand Sovereign Protocol (The Red Cipher)',
    keystoneSummary:
      'The ultimate classified master blueprint connecting the regional syndicates directly to the eight conspirators of The Sovereign Octagon.',
    accentColor: 'purple',
    imageArt: '/assets/backgrounds/story4_cape_keyart.jpg',
    unlockConditionText:
      'Requires completing Story 3: Namaqua-Diamond and recovering the Table Bay Admiralty Manifest.',
    isPlayable: true,
    factions: [
      'The Long Street Security Racket',
      'The 28s / Cape Flats Federation',
      'The Winelands Capital Club',
      'AGU Renegades',
      'The Harbour Stevedores Union',
    ],
    regionalMechanic:
      'Dynamic Gang Turf Warfare Tension Clocks (0/6), Mountain Sea-Mist Infiltration, and Historic Wine Estate Forensic Audits.',
  },
  {
    id: 'story_5_octagon',
    number: 5,
    title: 'The Sovereign Octagon',
    subtitle: 'The Grand National Finale',
    region: 'Drakensberg Subterranean Bunker & Pretoria Union Buildings',
    era: 'Act 1: Four Regional Fronts • Act 2: Midnight Sun Bunker Breach',
    protagonistName: 'The United Hawks Taskforce',
    protagonistRole: 'Multi-Hero National Strike Team',
    caseDocket: 'CASE FILE #001-NATIONAL // MIDNIGHT SUN',
    synopsis:
      'Total Stage 8 Black-Sky Grid Collapse and the planned authoritarian transfer of South African state sovereignty to the eight corporate-state conspirators.',
    keystoneDossierId: 'dossier_master_archive',
    keystoneTitle: 'National State Capture Master Dossier',
    keystoneSummary:
      'Unified forensic evidence stream spanning Durban, Johannesburg, the Richtersveld, and Cape Town presented before the Constitutional Court.',
    accentColor: 'rose',
    imageArt: '/assets/backgrounds/story5_octagon_keyart.jpg',
    unlockConditionText:
      'Requires completing all four regional campaigns (Stories 1 through 4) and collecting all Keystone Dossiers.',
    isPlayable: true,
    factions: [
      'The United Hawks Taskforce',
      'The Sovereign Octagon',
      'The Constitutional Court Guard',
      'The National Grid Command',
      'The Federal Resistance Network',
    ],
    regionalMechanic:
      'Multi-Front National Operational Board, National Grid Collapse Countdown Clock (0/8), and Simultaneous Multi-Hero Strike Allocations.',
  },
];

export const KEYSTONE_DOSSIERS: Record<string, KeystoneDossier> = {
  dossier_sovereign_pearl: {
    id: 'dossier_sovereign_pearl',
    storyId: 'story_1_ethekwini',
    nextStoryId: 'story_2_highveld',
    title: 'Sovereign Pearl Trust Deed & Tarmac Ciphers',
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
    inheritedHeroStat: 'dockets',
    inheritedBonus: 1,
  },
  dossier_project_midas: {
    id: 'dossier_project_midas',
    storyId: 'story_2_highveld',
    nextStoryId: 'story_3_namaqua',
    title: 'Project Midas Highveld Coal Ledger',
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
    inheritedHeroStat: 'wire',
    inheritedBonus: 1,
  },
  dossier_admiralty_manifest: {
    id: 'dossier_admiralty_manifest',
    storyId: 'story_3_namaqua',
    nextStoryId: 'story_4_cape',
    title: 'Table Bay Admiralty Manifest & Diamond Run',
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
    inheritedHeroStat: 'street',
    inheritedBonus: 1,
  },
  dossier_red_protocol: {
    id: 'dossier_red_protocol',
    storyId: 'story_4_cape',
    nextStoryId: 'story_5_octagon',
    title: 'The Grand Sovereign Protocol (The Red Cipher)',
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
    inheritedHeroStat: 'influence',
    inheritedBonus: 1,
  },
};
