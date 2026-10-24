import { Clock, EndingId, GameState, MapNode } from '../types/game';
import { initialGameState } from './initialState';

export const ACT_2_CLOCKS: Record<string, Clock> = {
  cartel_hit_squad: {
    id: 'cartel_hit_squad',
    title: 'Izinkabi Hit Squad',
    description:
      'Zuko and Brigadier Mokoena have hired out-of-province contract gunmen to silence you before the Commission concludes.',
    type: 'threat',
    current: 0,
    max: 6,
    advancesDaily: true,
    onCompleteEventId: 'evt_act2_izinkabi_ambush',
  },
  commission_subpoena: {
    id: 'commission_subpoena',
    title: 'Contempt & Security Warrant',
    description:
      'Compromised prosecutors within the Inquiry are building a warrant to detain you under State Security statutes.',
    type: 'threat',
    current: 1,
    max: 6,
    advancesDaily: false,
    onCompleteEventId: 'evt_act2_contempt_arrest',
  },
  trace_offshore_trust: {
    id: 'trace_offshore_trust',
    title: 'Trace Sovereign Pearl Trust',
    description:
      'Cross-reference Umhlanga Ridge corporate registries and High Court subpoenas to unmask the Dubai beneficial owners.',
    type: 'action',
    current: 0,
    max: 4,
    advancesDaily: false,
    onCompleteEventId: 'evt_act2_trust_unmasked',
  },
  compile_ballistics_file: {
    id: 'compile_ballistics_file',
    title: 'Synthesize Super-Lab Telemetry',
    description:
      'Extract GPS route logs from impounded Northern Township water tankers to pinpoint the inland chemical synthesis estate.',
    type: 'action',
    current: 0,
    max: 4,
    advancesDaily: false,
    onCompleteEventId: 'evt_act2_lab_telemetry',
  },
  tarmac_extraction_countdown: {
    id: 'tarmac_extraction_countdown',
    title: 'Flight ZS-900 Charter Departure',
    description:
      'Countdown until Zuko Ndlovu, Ma-Sibi, and Mokoena board the Dubai-bound Gulfstream at King Shaka Hangar 7.',
    type: 'world',
    current: 0,
    max: 4,
    advancesDaily: true,
    onCompleteEventId: 'evt_act2_climax_tarmac',
  },
};

export const ACT_2_NODES: Record<string, MapNode> = {
  // ---------------------------------------------------------------------------
  // N8: THE RIDGE PENTHOUSES (UMHLANGA RIDGE)
  // ---------------------------------------------------------------------------
  n8_ridge_penthouses: {
    id: 'n8_ridge_penthouses',
    title: 'The Ridge Penthouses',
    subtitle: 'Umhlanga Glass Towers & Trust Offices',
    factionOwner: 'city_hall',
    tier: 'street_west',
    x: 20,
    y: 26,
    isUnlocked: true,
    connectedNodeIds: ['n9_township_depot', 'n10_high_court'],
    actionSlots: [
      {
        id: 'slot_breach_ridge_server',
        title: 'Breach Fiduciary Escrow Server',
        description:
          'Slice into the private wealth-management server on the 28th floor to trace the Sovereign Pearl offshore shell trust.',
        stat: 'wire',
        isRepeatable: true,
        isCompleted: false,
        disabledDuringStage6: true,
        outcomes: {
          clean: {
            clockProgress: [{ clockId: 'trace_offshore_trust', delta: 2 }],
            narrativeLog:
              'Clean slice. You mirror the DIFC Dubai bearer-share certificates before the private security firewall reacts.',
          },
          compromised: {
            clockProgress: [
              { clockId: 'trace_offshore_trust', delta: 1 },
              { clockId: 'commission_subpoena', delta: 1 },
            ],
            composureDelta: -5,
            narrativeLog:
              'You pull half the registry, but a silent alarm flags your MAC address to the legal team (+1 Contempt Warrant).',
          },
          failure: {
            clockProgress: [{ clockId: 'cartel_hit_squad', delta: 1 }],
            composureDelta: -15,
            narrativeLog:
              'Biometric shutters slam down. You barely slip down the service stairwell as private tactical guards sweep the lobby.',
          },
        },
      },
      {
        id: 'slot_shakedown_consultant',
        title: 'Press Tender Consultant in Sky-Bar',
        description:
          'Corner Councillor Ma-Sibi’s offshore tax attorney over single-malt scotch and demand retainer hush-money.',
        stat: 'influence',
        isRepeatable: true,
        isCompleted: false,
        outcomes: {
          clean: {
            cashDelta: 1100,
            clockProgress: [{ clockId: 'commission_subpoena', delta: -1 }],
            factionRepDelta: [{ factionId: 'city_hall', delta: 1 }],
            narrativeLog:
              'He slides a platinum casino chip and R1,100 cash across the marble table, promising to stall the contempt warrant.',
          },
          compromised: {
            cashDelta: 650,
            composureDelta: -5,
            narrativeLog:
              'He pays R650 out of pocket to keep his name off the roll, though his bodyguard photographs your plates.',
          },
          failure: {
            composureDelta: -10,
            clockProgress: [{ clockId: 'commission_subpoena', delta: 1 }],
            factionRepDelta: [{ factionId: 'city_hall', delta: -1 }],
            narrativeLog:
              'He laughs in your face and calls the Commission’s security clerk to report witness intimidation.',
          },
        },
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // N9: NORTHERN TOWNSHIP WATER DEPOT (KWAMASHU SPUR)
  // ---------------------------------------------------------------------------
  n9_township_depot: {
    id: 'n9_township_depot',
    title: 'Northern Township Depot',
    subtitle: 'Impounded Water-Tanker Staging Yard',
    factionOwner: 'street_syndicate',
    tier: 'street_west',
    x: 22,
    y: 74,
    isUnlocked: true,
    connectedNodeIds: ['n8_ridge_penthouses', 'n10_high_court'],
    actionSlots: [
      {
        id: 'slot_extract_tanker_gps',
        title: 'Pull Black-Box GPS from Tanker #114',
        description:
          'Pry open the dashboard telemetry unit of an impounded municipal tanker to trace its midnight stops in the Midlands.',
        stat: 'street',
        isRepeatable: true,
        isCompleted: false,
        outcomes: {
          clean: {
            clockProgress: [{ clockId: 'compile_ballistics_file', delta: 2 }],
            factionRepDelta: [{ factionId: 'street_syndicate', delta: 1 }],
            narrativeLog:
              'With Bra Bheki’s marshals keeping watch, you extract the uncorrupted Howick highway coordinates (+2 Lab Telemetry).',
          },
          compromised: {
            clockProgress: [
              { clockId: 'compile_ballistics_file', delta: 1 },
              { clockId: 'cartel_hit_squad', delta: 1 },
            ],
            composureDelta: -5,
            narrativeLog:
              'You rip the GPS module free, but a cartel spotter on the ridge logs your silhouette (+1 Hit Squad).',
          },
          failure: {
            composureDelta: -15,
            clockProgress: [{ clockId: 'cartel_hit_squad', delta: 1 }],
            narrativeLog:
              'Booby-trapped ignition wiring sparks across your hands, drawing armed depot guards.',
          },
        },
      },
      {
        id: 'slot_rally_civic_marshals',
        title: 'Coordinate with Strike Committee (R400)',
        description:
          'Fund the township water-crisis marshals to set up community barricades that slow down cartel hit squads.',
        stat: 'influence',
        isRepeatable: true,
        isCompleted: false,
        costCash: 400,
        outcomes: {
          clean: {
            clockProgress: [{ clockId: 'cartel_hit_squad', delta: -2 }],
            composureDelta: 10,
            factionRepDelta: [{ factionId: 'street_syndicate', delta: 1 }],
            narrativeLog:
              'Burning tyres and minibus blockades seal the northern access roads—Zuko’s gunmen are forced to retreat (-2 Hit Squad).',
          },
          compromised: {
            clockProgress: [{ clockId: 'cartel_hit_squad', delta: -1 }],
            narrativeLog:
              'The strike marshals reroute traffic around your safehouse (-1 Hit Squad).',
          },
          failure: {
            composureDelta: -10,
            narrativeLog:
              'SAPS Nyalas disperse the picket line with stun grenades before the barricade can hold.',
          },
        },
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // N10: HIGH COURT CHAMBERS (COMMISSION OF INQUIRY)
  // ---------------------------------------------------------------------------
  n10_high_court: {
    id: 'n10_high_court',
    title: 'High Court Chambers',
    subtitle: 'State Capture Commission of Inquiry',
    factionOwner: 'hawks',
    tier: 'civic_center',
    x: 52,
    y: 48,
    isUnlocked: true,
    connectedNodeIds: [
      'n8_ridge_penthouses',
      'n9_township_depot',
      'n11_citrus_estate',
      'n12_cargo_apron',
    ],
    actionSlots: [
      {
        id: 'slot_subpoena_bank_records',
        title: 'File Section 205 Offshore Subpoena',
        description:
          'Work with Colonel van der Merwe’s evidence leaders to force standard charter banks to unmask Sovereign Pearl Holdings.',
        stat: 'dockets',
        isRepeatable: true,
        isCompleted: false,
        disabledDuringStage6: true,
        outcomes: {
          clean: {
            clockProgress: [
              { clockId: 'trace_offshore_trust', delta: 2 },
              { clockId: 'commission_subpoena', delta: -1 },
            ],
            factionRepDelta: [{ factionId: 'hawks', delta: 1 }],
            narrativeLog:
              'Judge Khumalo signs the bench order. The bank’s compliance officer uploads the wire transfers within the hour (+2 Trust, -1 Contempt).',
          },
          compromised: {
            clockProgress: [{ clockId: 'trace_offshore_trust', delta: 1 }],
            composureDelta: -5,
            narrativeLog:
              'Defense counsel files three urgent interdicts, but you secure the primary signatory page (+1 Trust).',
          },
          failure: {
            clockProgress: [{ clockId: 'commission_subpoena', delta: 1 }],
            composureDelta: -10,
            narrativeLog:
              'Mokoena’s counsel accuses you of fabricating evidence on the stand (+1 Contempt Warrant).',
          },
        },
      },
      {
        id: 'slot_recess_debrief',
        title: 'Witness Protection Safe-Room Debrief (R300)',
        description:
          'Grab coffee and clean bandages in the guarded Hawks chambers beneath Courtroom A to steady your nerves.',
        stat: 'any',
        isRepeatable: true,
        isCompleted: false,
        costCash: 300,
        outcomes: {
          clean: {
            composureDelta: 25,
            clockProgress: [{ clockId: 'commission_subpoena', delta: -1 }],
            narrativeLog:
              'Constable Nandi—now walking on crutches—reviews your timeline over strong rooibos tea (+25% Composure, -1 Contempt).',
          },
          compromised: {
            composureDelta: 15,
            narrativeLog:
              'Two hours of uninterrupted sleep behind bulletproof glass restores your focus (+15% Composure).',
          },
          failure: {
            composureDelta: 5,
            narrativeLog:
              'Reporters bang on the chamber doors all afternoon, leaving you only marginally rested (+5% Composure).',
          },
        },
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // N11: HYDROPONIC CITRUS ESTATE (INLAND MIDLANDS SUPER-LAB)
  // ---------------------------------------------------------------------------
  n11_citrus_estate: {
    id: 'n11_citrus_estate',
    title: 'Hydroponic Citrus Estate',
    subtitle: 'Midlands Precursor Super-Lab (Lot 44)',
    factionOwner: 'abasanta',
    tier: 'waterfront_east',
    x: 82,
    y: 26,
    isUnlocked: false, // Unlocks when Trust or Telemetry clock completes
    connectedNodeIds: ['n10_high_court', 'n12_cargo_apron'],
    actionSlots: [
      {
        id: 'slot_infiltrate_packhouse',
        title: 'Breach Packhouse B Synthesis Vats',
        description:
          'Slip past the perimeter dogs to photograph the municipal water tankers pumping precursor into the citrus packhouse. Stage 6 kills the electric fence (+2).',
        stat: 'street',
        isRepeatable: true,
        isCompleted: false,
        stage6BonusModifier: 2,
        outcomes: {
          clean: {
            cashDelta: 900,
            clockProgress: [{ clockId: 'compile_ballistics_file', delta: 2 }],
            addInventoryItem: 'superlab_batch_telemetry',
            narrativeLog:
              'Under blackout cover you photograph the entire synthesis line and pocket R900 in bearer bonds from the foreman’s safe.',
          },
          compromised: {
            clockProgress: [
              { clockId: 'compile_ballistics_file', delta: 1 },
              { clockId: 'cartel_hit_squad', delta: 1 },
            ],
            composureDelta: -10,
            narrativeLog:
              'You capture the batch serial numbers, but floodlights snap back on as Rottweilers hit the fence line.',
          },
          failure: {
            composureDelta: -20,
            clockProgress: [{ clockId: 'cartel_hit_squad', delta: 2 }],
            narrativeLog:
              'Private mercenaries open fire with R5 rifles from the watchtower. You escape through the irrigation canal soaked in chemical runoff.',
          },
        },
      },
      {
        id: 'slot_act2_finale_citrus',
        title: '[FINALE] Storm the Midlands Super-Lab',
        description:
          'Lead the township strike marshals or Hawks tactical team directly into Packhouse B before the evidence can be incinerated.',
        stat: 'street',
        isRepeatable: false,
        isCompleted: false,
        outcomes: {
          clean: {
            clockProgress: [{ clockId: 'tarmac_extraction_countdown', delta: 4 }],
            composureDelta: 10,
            narrativeLog:
              'You breach the packhouse gates and seize the master ledger—forcing Zuko and Mokoena into a desperate dash for Hangar 7!',
          },
          compromised: {
            clockProgress: [{ clockId: 'tarmac_extraction_countdown', delta: 4 }],
            composureDelta: -5,
            narrativeLog:
              'Through heavy gunfire you secure the synthesis vats as the syndicate convoy races toward King Shaka Airport!',
          },
          failure: {
            clockProgress: [{ clockId: 'tarmac_extraction_countdown', delta: 4 }],
            composureDelta: -15,
            narrativeLog:
              'The packhouse erupts in flames, triggering the final confrontation at King Shaka Hangar 7!',
          },
        },
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // N12: KING SHAKA CARGO APRON (HANGAR 7 CHARTER TARMAC)
  // ---------------------------------------------------------------------------
  n12_cargo_apron: {
    id: 'n12_cargo_apron',
    title: 'King Shaka Cargo Apron',
    subtitle: 'Hangar 7 Diplomatic Charter Tarmac',
    factionOwner: 'saps_trt',
    tier: 'waterfront_east',
    x: 82,
    y: 74,
    isUnlocked: false, // Unlocks when Trust or Telemetry clock completes
    connectedNodeIds: ['n10_high_court', 'n11_citrus_estate'],
    actionSlots: [
      {
        id: 'slot_sabotage_transponder',
        title: 'Lock Gulfstream ZS-900 Avionics',
        description:
          'Override the hangar radar transponder to ground Zuko’s Dubai flight plan. Stage 6 blacks out tarmac radar (+2).',
        stat: 'wire',
        isRepeatable: true,
        isCompleted: false,
        stage6BonusModifier: 2,
        outcomes: {
          clean: {
            clockProgress: [
              { clockId: 'tarmac_extraction_countdown', delta: -1 },
              { clockId: 'cartel_hit_squad', delta: -1 },
            ],
            composureDelta: 10,
            narrativeLog:
              'You inject a false engine-fire fault into ZS-900’s flight computer, delaying takeoff clearance (-1 Flight Countdown, -1 Hit Squad).',
          },
          compromised: {
            clockProgress: [{ clockId: 'tarmac_extraction_countdown', delta: -1 }],
            composureDelta: -5,
            narrativeLog:
              'Air Traffic Control holds the charter jet at the taxiway threshold (-1 Flight Countdown).',
          },
          failure: {
            composureDelta: -15,
            clockProgress: [{ clockId: 'cartel_hit_squad', delta: 1 }],
            narrativeLog:
              'SAPS TRT snipers on the hangar roof spot your laser link across the wet tarmac.',
          },
        },
      },
      {
        id: 'slot_act2_finale_tarmac',
        title: '[FINALE] Intercept Flight ZS-900 at Hangar 7',
        description:
          'Drive onto the rain-swept apron as Zuko Ndlovu, Councillor Ma-Sibi, and Brigadier Mokoena board the Gulfstream.',
        stat: 'dockets',
        isRepeatable: false,
        isCompleted: false,
        outcomes: {
          clean: {
            clockProgress: [{ clockId: 'tarmac_extraction_countdown', delta: 4 }],
            composureDelta: 10,
            narrativeLog:
              'Your headlights cut across the Gulfstream’s nose wheel—blocking the taxiway for the final reckoning!',
          },
          compromised: {
            clockProgress: [{ clockId: 'tarmac_extraction_countdown', delta: 4 }],
            composureDelta: -5,
            narrativeLog:
              'You ram through the Hangar 7 perimeter barrier just as the jet turbines spool up!',
          },
          failure: {
            clockProgress: [{ clockId: 'tarmac_extraction_countdown', delta: 4 }],
            composureDelta: -15,
            narrativeLog:
              'Taking fire from Mokoena’s escort detail, you skid onto the apron as the boarding stairs begin to retract!',
          },
        },
      },
    ],
  },
};

/**
 * Transitions a completed Act 1 GameState (or a fresh state) into Act 2: "The Commission of Inquiry"
 */
export function transitionToAct2(
  prevState?: GameState,
  act1EndingId: EndingId = 'ending_whistleblower'
): GameState {
  const base = prevState
    ? structuredClone(prevState)
    : structuredClone(initialGameState);

  const preservedGear = base.inventory.filter(
    (id) => id.startsWith('item_') || id === 'saps_radio_scanner'
  );

  let legacyItem = 'item_act1_subpoena_warrant';
  let introBanner =
    '--- ACT 2: THE COMMISSION OF INQUIRY | High Court Subpoena (+1 DOCKETS) Active ---';

  if (act1EndingId === 'ending_vigilante') {
    legacyItem = 'item_act1_scorched_valves';
    base.stats.street += 1;
    introBanner =
      '--- ACT 2: THE COMMISSION OF INQUIRY | Berth 14 Vigilante Carryover (+1 STREET) ---';
  } else if (act1EndingId === 'ending_kingpin') {
    legacyItem = 'item_act1_shadow_retainer';
    base.cash += 1500;
    introBanner =
      '--- ACT 2: THE COMMISSION OF INQUIRY | Abasanta Retainer Carryover (+R1,500) ---';
  } else {
    base.stats.dockets += 1;
  }

  const nextInventory = Array.from(new Set([...preservedGear, legacyItem]));
  const nextComposure = Math.max(75, base.composure);
  const nextDay = prevState ? base.day + 1 : 6;

  return {
    act: 2,
    act1EndingPath: act1EndingId,
    day: nextDay,
    cash: Math.max(900, base.cash),
    composure: nextComposure,
    loadSheddingStage: 2,
    stats: base.stats,
    factionRep: base.factionRep,
    inventory: nextInventory,
    dicePool: Array.from({ length: 5 }, (_, idx) => ({
      id: `d_act2_${nextDay}_${idx + 1}`,
      value: (Math.floor(Math.random() * 6) + 1) as 1 | 2 | 3 | 4 | 5 | 6,
      isUsed: false,
    })),
    clocks: structuredClone(ACT_2_CLOCKS),
    nodes: structuredClone(ACT_2_NODES),
    activeLog: [
      introBanner,
      'The Berth 14 fallout has moved uphill to Umhlanga Ridge, the High Court Commission, and the Midlands Super-Lab.',
      ...base.activeLog.slice(0, 8),
    ],
    triggeredEventsQueue: [],
    activeEndingId: null,
    currentNodeId: 'n10_high_court',
    generatorActiveToday: false,
    usedPerksToday: [],
    claimedDialogueRewards: base.claimedDialogueRewards ?? [],
  };
}
