import { GameState, MapNode } from '../types/game';

export const HIGHVELD_NODES: Record<string, MapNode> = {
  h1_braamfontein_safehouse: {
    id: 'h1_braamfontein_safehouse',
    title: 'Braamfontein Loft (Room 902)',
    subtitle: 'Rooftop safehouse overlooking the electrified railway yards',
    factionOwner: 'neutral',
    tier: 'street_west',
    x: 16,
    y: 22,
    isUnlocked: true,
    connectedNodeIds: ['h3_hillbrow_substation', 'h4_witwatersrand_shaft', 'h7_siu_headquarters'],
    actionSlots: [
      {
        id: 'slot_h1_lerato_coldcase',
        title: "Analyze Lerato's Audit Files",
        description:
          "Cross-reference Lerato's recovered laptop notes with Megawatt Park supply-chain telemetry.",
        stat: 'dockets',
        isRepeatable: false,
        isCompleted: false,
        costCash: 0,
        requiredItem: 'evidence_lerato_audit_notes',
        outcomes: {
          clean: {
            clockProgress: [{ clockId: 'siu_tribunal_docket', delta: 2 }],
            composureDelta: 10,
            unlockNodeIds: ['h3_hillbrow_substation', 'h7_siu_headquarters'],
            narrativeLog:
              'The thermite burns on Conveyor 4 were matched to military demolition stores. You isolate the dispatch serial codes.',
          },
          compromised: {
            clockProgress: [{ clockId: 'siu_tribunal_docket', delta: 1 }, { clockId: 'nia_surveillance', delta: 1 }],
            unlockNodeIds: ['h3_hillbrow_substation'],
            narrativeLog:
              'You confirm the sabotage signatures, but an automated ping alerts NIA cyber-surveillance in Pretoria.',
          },
          failure: {
            composureDelta: -15,
            clockProgress: [{ clockId: 'nia_surveillance', delta: 2 }],
            narrativeLog:
              'The laptop’s dead-man encryption locks down temporarily. Memories of Lerato’s M1 ambush shake your focus.',
          },
        },
      },
      {
        id: 'slot_h1_rest',
        title: 'Review Informant Channels & Rest',
        description:
          'Monitor encrypted shortwave frequencies, patch injuries, and steady your nerves.',
        stat: 'any',
        isRepeatable: true,
        isCompleted: false,
        costCash: 0,
        outcomes: {
          clean: {
            composureDelta: 20,
            narrativeLog:
              'Hot black tea, clean bandages, and an hour of uninterrupted silence over the Braamfontein skyline restore your composure.',
          },
          compromised: {
            composureDelta: 10,
            narrativeLog:
              'Distant sirens on De Korte Street keep you on edge, but you catch your breath.',
          },
          failure: {
            composureDelta: 5,
            narrativeLog:
              'Highveld winter smog seeps through the cracked window panes, leaving your chest burning.',
          },
        },
      },
    ],
  },

  h2_sandton_tower: {
    id: 'h2_sandton_tower',
    title: 'Sandton Financial Monolith',
    subtitle: 'Helena Van Niekerk’s 38th-floor executive arbitrage penthouse',
    factionOwner: 'sandton_arbitrage',
    tier: 'civic_center',
    x: 50,
    y: 20,
    isUnlocked: false,
    connectedNodeIds: ['h3_hillbrow_substation', 'h5_union_buildings', 'h7_siu_headquarters'],
    actionSlots: [
      {
        id: 'slot_h2_bloomberg_audit',
        title: 'Infiltrate Arbitrage Trading Floor',
        description:
          'Access the proprietary Bloomberg terminals to extract forward energy derivatives trade logs.',
        stat: 'wire',
        isRepeatable: false,
        isCompleted: false,
        costCash: 250,
        outcomes: {
          clean: {
            addInventoryItem: 'evidence_bloomberg_substation_telemetry',
            clockProgress: [{ clockId: 'siu_tribunal_docket', delta: 2 }],
            cashDelta: 850,
            narrativeLog:
              'You clone Helena’s trade desk telemetry: her offshore funds shorted Eskom bonds 90 minutes before every major substation trip.',
          },
          compromised: {
            addInventoryItem: 'evidence_bloomberg_substation_telemetry',
            clockProgress: [{ clockId: 'nia_surveillance', delta: 1 }],
            cashDelta: 400,
            narrativeLog:
              'You grab the financial trade tickets, but building security logs your cloned visitor badge.',
          },
          failure: {
            composureDelta: -20,
            cashDelta: -250,
            clockProgress: [{ clockId: 'nia_surveillance', delta: 2 }],
            narrativeLog:
              'Private security interrogates you at the glass turnstiles. You burn R250 in bribes to avoid handcuffs.',
          },
        },
      },
      {
        id: 'slot_h2_corporate_bribe',
        title: 'Corporate Insider Arbitrage Shakedown',
        description:
          'Confront Helena Van Niekerk’s junior energy traders with preliminary SIU subpoena notices.',
        stat: 'influence',
        isRepeatable: true,
        isCompleted: false,
        outcomes: {
          clean: {
            cashDelta: 1200,
            factionRepDelta: [{ factionId: 'sandton_arbitrage', delta: 1 }],
            narrativeLog:
              'A terrified junior broker pays R1,200 in crisp banknotes to keep his name out of the morning subpoena list.',
          },
          compromised: {
            cashDelta: 600,
            narrativeLog:
              'The broker coughs up R600, muttering that Helena will have anyone who talks thrown out of a helicopter.',
          },
          failure: {
            composureDelta: -15,
            factionRepDelta: [{ factionId: 'sandton_arbitrage', delta: -1 }],
            narrativeLog:
              'The corporate legal team arrives with armed floor marshals. You are escorted to the street under threat of arrest.',
          },
        },
      },
    ],
  },

  h3_hillbrow_substation: {
    id: 'h3_hillbrow_substation',
    title: 'Hillbrow 88kV Substation',
    subtitle: 'Heavily fortified distribution hub surrounded by Red Guard pickets',
    factionOwner: 'red_guard_populists',
    tier: 'street_west',
    x: 44,
    y: 52,
    isUnlocked: true,
    connectedNodeIds: ['h1_braamfontein_safehouse', 'h2_sandton_tower', 'h4_witwatersrand_shaft'],
    actionSlots: [
      {
        id: 'slot_h3_prevent_sabotage',
        title: 'Splice Telemetry Relay & Intercept Saboteurs',
        description:
          'Tap into the SCADA optical relay to identify who is triggering artificial transformer overloads.',
        stat: 'wire',
        isRepeatable: false,
        isCompleted: false,
        outcomes: {
          clean: {
            clockProgress: [{ clockId: 'megawatt_sabotage', delta: -2 }, { clockId: 'siu_tribunal_docket', delta: 1 }],
            unlockNodeIds: ['h2_sandton_tower', 'h6_kendon_coal_depot'],
            factionRepDelta: [{ factionId: 'red_guard_populists', delta: 2 }],
            narrativeLog:
              'You isolate the timer device on Transformer 3, preventing an 88kV explosion and securing union trust.',
          },
          compromised: {
            clockProgress: [{ clockId: 'megawatt_sabotage', delta: -1 }, { clockId: 'nia_surveillance', delta: 1 }],
            unlockNodeIds: ['h6_kendon_coal_depot'],
            narrativeLog:
              'You disarm the secondary relay, but the cartel’s spotters capture your profile on night-vision goggles.',
          },
          failure: {
            composureDelta: -20,
            clockProgress: [{ clockId: 'megawatt_sabotage', delta: 1 }],
            narrativeLog:
              'An electrical arc flash blinds you momentarily as the transformer trips, knocking out power across Sector 01.',
          },
        },
      },
      {
        id: 'slot_h3_red_guard_rally',
        title: 'Mobilize Red Guard Strike Marshals',
        description:
          'Meet with Vusi "Dynamite" Sithole to coordinate community defense around the substation perimeter.',
        stat: 'street',
        isRepeatable: true,
        isCompleted: false,
        outcomes: {
          clean: {
            factionRepDelta: [{ factionId: 'red_guard_populists', delta: 2 }],
            clockProgress: [{ clockId: 'nia_surveillance', delta: -1 }],
            narrativeLog:
              'Vusi’s marshals throw up burning tire barricades, driving NIA surveillance vans away from the block.',
          },
          compromised: {
            factionRepDelta: [{ factionId: 'red_guard_populists', delta: 1 }],
            narrativeLog:
              'The crowd agrees to watch your back, but demands diesel donations to keep the community braai fires burning.',
          },
          failure: {
            composureDelta: -10,
            factionRepDelta: [{ factionId: 'red_guard_populists', delta: -1 }],
            narrativeLog:
              'Suspicious strike marshals accuse you of being a corporate spy before Vusi steps in to clear you.',
          },
        },
      },
    ],
  },

  h4_witwatersrand_shaft: {
    id: 'h4_witwatersrand_shaft',
    title: 'Crown Mines Shaft 4',
    subtitle: '2,000-metre subterranean zama-zama artisanal gold extraction reef',
    factionOwner: 'reef_zamazamas',
    tier: 'waterfront_east',
    x: 16,
    y: 78,
    isUnlocked: true,
    connectedNodeIds: ['h1_braamfontein_safehouse', 'h3_hillbrow_substation', 'h6_kendon_coal_depot'],
    actionSlots: [
      {
        id: 'slot_h4_mine_gold',
        title: 'Traverse Level 14 Stope & Buy Raw Nuggets',
        description:
          'Descend into the abandoned stopes to buy unrefined gold nuggets from Mkhulu’s miners at wholesale rates.',
        stat: 'street',
        isRepeatable: true,
        isCompleted: false,
        outcomes: {
          clean: {
            cashDelta: 1600,
            clockProgress: [{ clockId: 'rockfall_hazard', delta: 1 }],
            factionRepDelta: [{ factionId: 'reef_zamazamas', delta: 1 }],
            narrativeLog:
              'You trade cash for raw gold nuggets (+R1,600). The deep quartzite groans overhead as the stope shifts.',
          },
          compromised: {
            cashDelta: 900,
            clockProgress: [{ clockId: 'rockfall_hazard', delta: 2 }],
            composureDelta: -10,
            narrativeLog:
              'You secure R900 in unrefined gold, but a minor rockfall blocks the haulage passage behind you.',
          },
          failure: {
            composureDelta: -25,
            clockProgress: [{ clockId: 'rockfall_hazard', delta: 2 }],
            narrativeLog:
              'A burst of toxic stope gas leaves you retching in the dark. You scramble up the wooden ladders empty-handed.',
          },
        },
      },
      {
        id: 'slot_h4_stope_map',
        title: 'Survey Cartel Smuggling Tunnels',
        description:
          'Inspect the underground railway spur where the cartel diverts stolen fuel drums directly into the mines.',
        stat: 'dockets',
        isRepeatable: false,
        isCompleted: false,
        outcomes: {
          clean: {
            addInventoryItem: 'evidence_zamazama_reef_map',
            unlockNodeIds: ['h6_kendon_coal_depot'],
            clockProgress: [{ clockId: 'siu_tribunal_docket', delta: 1 }],
            narrativeLog:
              'Mkhulu hands you the stope survey map showing the secret rail spur connecting Crown Mines to Kendon Coal Depot.',
          },
          compromised: {
            addInventoryItem: 'evidence_zamazama_reef_map',
            clockProgress: [{ clockId: 'rockfall_hazard', delta: 1 }],
            narrativeLog:
              'You map the underground tunnel network, but the miners warn that the old timber shoring is failing.',
          },
          failure: {
            composureDelta: -15,
            clockProgress: [{ clockId: 'rockfall_hazard', delta: 2 }],
            narrativeLog:
              'A sudden pressure wave knocks your headlamp into a flooded winze shaft. You retreat before the ceiling gives way.',
          },
        },
      },
    ],
  },

  h5_union_buildings: {
    id: 'h5_union_buildings',
    title: 'Union Buildings Security Wing',
    subtitle: 'Pretoria command bunker and NIA special operations command',
    factionOwner: 'neutral',
    tier: 'civic_center',
    x: 80,
    y: 24,
    isUnlocked: false,
    connectedNodeIds: ['h2_sandton_tower', 'h7_siu_headquarters'],
    actionSlots: [
      {
        id: 'slot_h5_nia_intercept',
        title: 'Subpoena State Security Black-Sky Files',
        description:
          'Use forged ministerial credentials to extract General Sithole’s signed sabotage orders.',
        stat: 'dockets',
        isRepeatable: false,
        isCompleted: false,
        outcomes: {
          clean: {
            addInventoryItem: 'evidence_nia_sabotage_order',
            clockProgress: [{ clockId: 'siu_tribunal_docket', delta: 2 }, { clockId: 'crack_midas_coldstorage', delta: 2 }],
            narrativeLog:
              'You clone Operation Black-Sky: General Sithole’s signed mandate authorizing intentional grid blackouts to loot emergency diesel.',
          },
          compromised: {
            addInventoryItem: 'evidence_nia_sabotage_order',
            clockProgress: [{ clockId: 'nia_surveillance', delta: 2 }],
            narrativeLog:
              'You extract the sabotage order, but an alarm triggers in General Sithole’s private office suite.',
          },
          failure: {
            composureDelta: -25,
            clockProgress: [{ clockId: 'nia_surveillance', delta: 3 }],
            narrativeLog:
              'NIA tactical guards detain you at the security checkpoint. You barely slip through the diplomatic tunnel into Arcadia.',
          },
        },
      },
      {
        id: 'slot_h5_ministerial_pressure',
        title: 'Pressure Ministry Oversight Officials',
        description:
          'Present preliminary evidence of the Mpumalanga coal dilution scam to nervous department directors.',
        stat: 'influence',
        isRepeatable: true,
        isCompleted: false,
        outcomes: {
          clean: {
            clockProgress: [{ clockId: 'nia_surveillance', delta: -2 }],
            cashDelta: 800,
            narrativeLog:
              'A terrified deputy director leaks internal phone logs and slips you R800 to keep his department out of the headlines.',
          },
          compromised: {
            clockProgress: [{ clockId: 'nia_surveillance', delta: -1 }],
            narrativeLog:
              'The officials agree to delay further emergency tenders, but warn that General Sithole has hit squads on standby.',
          },
          failure: {
            composureDelta: -15,
            clockProgress: [{ clockId: 'nia_surveillance', delta: 1 }],
            narrativeLog:
              'The directors stonewall you with national security non-disclosure threats.',
          },
        },
      },
    ],
  },

  h6_kendon_coal_depot: {
    id: 'h6_kendon_coal_depot',
    title: 'Kendon Coal Washing Depot',
    subtitle: 'Mpumalanga border coal-trucking weighing bridge & convoy staging ground',
    factionOwner: 'megawatt_cartel',
    tier: 'waterfront_east',
    x: 80,
    y: 74,
    isUnlocked: false,
    connectedNodeIds: ['h4_witwatersrand_shaft', 'h7_siu_headquarters'],
    actionSlots: [
      {
        id: 'slot_h6_coal_slurry_audit',
        title: 'Sample Diluted Coal Slurry & Bribe Weighbridge',
        description:
          'Collect physical samples of discarded rock and mud being fraudulently certified as Grade-A power station coal.',
        stat: 'dockets',
        isRepeatable: false,
        isCompleted: false,
        costCash: 300,
        outcomes: {
          clean: {
            clockProgress: [{ clockId: 'siu_tribunal_docket', delta: 2 }],
            unlockNodeIds: ['h5_union_buildings'],
            factionRepDelta: [{ factionId: 'megawatt_cartel', delta: -2 }],
            narrativeLog:
              'The laboratory results are devastating: the coal is 45% waste rock designed to grind boiler tubes to powder.',
          },
          compromised: {
            clockProgress: [{ clockId: 'siu_tribunal_docket', delta: 1 }, { clockId: 'nia_surveillance', delta: 1 }],
            unlockNodeIds: ['h5_union_buildings'],
            narrativeLog:
              'You secure the sample jars, but the weighbridge marshal notifies the Megawatt Cartel convoy bosses.',
          },
          failure: {
            composureDelta: -20,
            cashDelta: -300,
            clockProgress: [{ clockId: 'nia_surveillance', delta: 2 }],
            narrativeLog:
              'Heavily armed private security guards chase you off the weighbridge apron into the coal dust smog.',
          },
        },
      },
      {
        id: 'slot_h6_sabotage_fleet',
        title: 'Intercept Cartel Fuel Tankers',
        description:
          'Ambush the convoy carrying contaminated diesel intended for the emergency gas turbines.',
        stat: 'street',
        isRepeatable: true,
        isCompleted: false,
        outcomes: {
          clean: {
            cashDelta: 1500,
            clockProgress: [{ clockId: 'kendon_blackout_countdown', delta: -1 }],
            factionRepDelta: [{ factionId: 'megawatt_cartel', delta: -1 }],
            narrativeLog:
              'You hijack a fuel tanker manifest and siphon off R1,500 in diesel black-market coupons.',
          },
          compromised: {
            cashDelta: 750,
            clockProgress: [{ clockId: 'nia_surveillance', delta: 1 }],
            narrativeLog:
              'You grab R750 worth of diesel chits, but gunfire breaks out around the weighing gantry.',
          },
          failure: {
            composureDelta: -20,
            clockProgress: [{ clockId: 'nia_surveillance', delta: 2 }],
            narrativeLog:
              'Cartel enforcers pin you down behind a coal slag mound until you make a desperate escape.',
          },
        },
      },
    ],
  },

  h7_siu_headquarters: {
    id: 'h7_siu_headquarters',
    title: 'SIU Special Tribunal Archives',
    subtitle: 'High-security forensic vaults beneath the Pretoria High Court',
    factionOwner: 'siu_clean_hands',
    tier: 'civic_center',
    x: 52,
    y: 78,
    isUnlocked: true,
    connectedNodeIds: ['h1_braamfontein_safehouse', 'h2_sandton_tower', 'h5_union_buildings', 'h6_kendon_coal_depot'],
    actionSlots: [
      {
        id: 'slot_h7_compile_docket',
        title: 'Synthesize Project Midas Evidence Docket',
        description:
          'Assemble bank wire transfers, SCADA telemetry, and witness affidavits with Advocate Nomsa Khumalo.',
        stat: 'dockets',
        isRepeatable: true,
        isCompleted: false,
        outcomes: {
          clean: {
            clockProgress: [{ clockId: 'siu_tribunal_docket', delta: 2 }, { clockId: 'crack_midas_coldstorage', delta: 1 }],
            composureDelta: 15,
            factionRepDelta: [{ factionId: 'siu_clean_hands', delta: 2 }],
            narrativeLog:
              'The dossier crystallizes: billions in emergency diesel payments flow directly into the Sovereign Pearl Offshore Trust.',
          },
          compromised: {
            clockProgress: [{ clockId: 'siu_tribunal_docket', delta: 1 }],
            composureDelta: 5,
            factionRepDelta: [{ factionId: 'siu_clean_hands', delta: 1 }],
            narrativeLog:
              'You piece together two more shell bank accounts, though state security wiretaps buzz on the tribunal line.',
          },
          failure: {
            composureDelta: -10,
            clockProgress: [{ clockId: 'nia_surveillance', delta: 1 }],
            narrativeLog:
              'A corrupted forensic database dump stalls progress, forcing you to reconstruct transaction chains manually.',
          },
        },
      },
      {
        id: 'slot_h7_crack_midas_key',
        title: 'Decrypt Project Midas Cold-Storage Ledger',
        description:
          'Run brute-force cryptographic passes on the Cahora Bassa transmission decryption key.',
        stat: 'wire',
        isRepeatable: false,
        isCompleted: false,
        requiredItem: 'evidence_bloomberg_substation_telemetry',
        outcomes: {
          clean: {
            addInventoryItem: 'dossier_project_midas',
            clockProgress: [{ clockId: 'crack_midas_coldstorage', delta: 2 }],
            unlockNodeIds: ['h5_union_buildings', 'h6_kendon_coal_depot'],
            narrativeLog:
              'KEYSTONE UNLOCKED: The Project Midas Ledger decrypts completely! Emergency diesel profits are converted into rough conflict diamonds in the Northern Cape!',
          },
          compromised: {
            clockProgress: [{ clockId: 'crack_midas_coldstorage', delta: 1 }, { clockId: 'nia_surveillance', delta: 1 }],
            narrativeLog:
              'You breach the second encryption partition, uncovering transaction ties to diamond dredging along the Skeleton Coast.',
          },
          failure: {
            composureDelta: -15,
            clockProgress: [{ clockId: 'nia_surveillance', delta: 2 }],
            narrativeLog:
              'The cryptographic key trips a honeypot alarm, burning out your primary hardware decryptor.',
          },
        },
      },
    ],
  },
};

export const initialHighveldGameState: GameState = {
  storyId: 'story_2_highveld',
  day: 1,
  cash: 850,
  composure: 90,
  loadSheddingStage: 4,
  stats: {
    dockets: 2,   // Disgraced SIU Auditor strengths
    wire: 1,
    street: 0,
    influence: -1,
  },
  factionRep: {
    abasanta: 0,
    city_hall: 0,
    saps_trt: 0,
    street_syndicate: 0,
    hawks: 0,
    megawatt_cartel: -1,
    sandton_arbitrage: 0,
    reef_zamazamas: 1,
    siu_clean_hands: 2,
    red_guard_populists: 0,
    aegis_marine: 0,
    artisanal_divers: 0,
    kalahari_runners: 0,
    namaqua_command: 0,
    namib_syndicate: 0,
    long_street_racket: 0,
    cape_gang_federation: 0,
    winelands_club: 0,
    agu_renegades: 0,
    dockers_union: 0,
    // Story 5 factions
    united_hawks_taskforce: 0,
    the_sovereign_octagon: 0,
    constitutional_court_guard: 0,
    national_grid_command: 0,
    people_resistance_front: 0,
  },
  inventory: ['evidence_lerato_audit_notes'],
  dicePool: [
    { id: 'd1', value: 6, isUsed: false },
    { id: 'd2', value: 5, isUsed: false },
    { id: 'd3', value: 4, isUsed: false },
    { id: 'd4', value: 3, isUsed: false },
    { id: 'd5', value: 2, isUsed: false },
  ],
  clocks: {
    megawatt_sabotage: {
      id: 'megawatt_sabotage',
      title: 'Megawatt Grid Sabotage',
      description: 'The coal cartel is systematically cutting substation relays across Gauteng.',
      type: 'threat',
      current: 1,
      max: 8,
      advancesDaily: true,
      onCompleteEventId: 'evt_highveld_blackout_crisis',
    },
    rockfall_hazard: {
      id: 'rockfall_hazard',
      title: 'Crown Mines Rockfall Hazard',
      description: 'Deep underground seismic pressure is shifting the ancient quartzite stopes.',
      type: 'threat',
      current: 0,
      max: 6,
      advancesDaily: false,
      onCompleteEventId: 'evt_highveld_shaft_collapse',
    },
    nia_surveillance: {
      id: 'nia_surveillance',
      title: 'General Sithole’s NIA Surveillance',
      description: 'State Security tactical cells are tracking phone pings and informant leaks.',
      type: 'threat',
      current: 1,
      max: 6,
      advancesDaily: false,
      onCompleteEventId: 'evt_highveld_nia_raid',
    },
    siu_tribunal_docket: {
      id: 'siu_tribunal_docket',
      title: 'SIU Tribunal Indictment Docket',
      description: 'Compiling evidence to issue Section 205 warrants against the syndicate.',
      type: 'action',
      current: 0,
      max: 6,
      advancesDaily: false,
      onCompleteEventId: 'evt_highveld_tribunal_ready',
    },
    crack_midas_coldstorage: {
      id: 'crack_midas_coldstorage',
      title: 'Project Midas Cold-Storage Decryption',
      description: 'Decrypting the offshore shell accounts and Cahora Bassa ciphers.',
      type: 'action',
      current: 0,
      max: 4,
      advancesDaily: false,
      onCompleteEventId: 'evt_highveld_midas_decrypted',
    },
    kendon_blackout_countdown: {
      id: 'kendon_blackout_countdown',
      title: 'Kendon Final Blackout Countdown',
      description: 'The countdown to total Stage 6 collapse and emergency diesel decree.',
      type: 'world',
      current: 1,
      max: 6,
      advancesDaily: true,
      onCompleteEventId: 'evt_highveld_climax_kendon',
    },
  },
  nodes: HIGHVELD_NODES,
  activeLog: [
    '01:15 SAST // Highveld winter smog blankets Johannesburg under Stage 4 load shedding.',
    'Six months after Lerato’s death on the M1, the Sovereign Pearl Trust Deed confirms the Durban chemical millions wired directly into Sandton.',
    'Bra K unseals his Braamfontein loft, booting the cold forensic terminal.',
  ],
  triggeredEventsQueue: [],
  activeEndingId: null,
  currentNodeId: 'h1_braamfontein_safehouse',
  generatorActiveToday: false,
  usedPerksToday: [],
  claimedDialogueRewards: [],
};
