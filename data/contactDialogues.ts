import { ActionEffect, FactionId, GameState, StatType } from '../types/game';
import { ITEMS_CATALOG } from './itemsCatalog';
import { HIGHVELD_CONTACT_DIALOGUES } from './story2HighveldDialogues';
import { NAMAQUA_CONTACT_DIALOGUES } from './story3NamaquaDialogues';
import { CAPE_CONTACT_DIALOGUES } from './story4CapeDialogues';
import { OCTAGON_CONTACT_DIALOGUES } from './story5OctagonDialogues';

export const FACTION_NAMES: Record<FactionId, string> = {
  abasanta: 'Abasanta Cartel',
  city_hall: 'City Hall',
  saps_trt: 'SAPS TRT',
  street_syndicate: 'Street Syndicate',
  hawks: 'DPCI Hawks',
  megawatt_cartel: 'The Megawatt Cartel',
  sandton_arbitrage: 'Sandton Arbitrage',
  reef_zamazamas: 'The Reef Zama-Zamas',
  siu_clean_hands: 'SIU Clean Hands',
  red_guard_populists: 'Red Guard Populists',
  aegis_marine: 'Aegis-Atlantis Marine Security',
  artisanal_divers: 'Artisanal Shore Divers',
  kalahari_runners: 'Kalahari Desert Runners',
  namaqua_command: 'Namaqua Coastal Command',
  namib_syndicate: 'Namib Diamond Syndicate',
  long_street_racket: 'Long Street Security Racket',
  cape_gang_federation: 'Cape Flats Gang Federation',
  winelands_club: 'The Winelands Capital Club',
  agu_renegades: 'Anti-Gang Unit Renegades',
  dockers_union: 'Table Bay Stevedores Union',
  united_hawks_taskforce: 'United Hawks Taskforce',
  the_sovereign_octagon: 'The Sovereign Octagon',
  constitutional_court_guard: 'Constitutional Court Guard',
  national_grid_command: 'National Grid Command',
  people_resistance_front: "People's Resistance Front",
};

/**
 * Helper: Check if a dialogue response's requirements are met by the current GameState
 */
export function canSelectDialogueResponse(
  state: GameState,
  response: DialogueResponse
): { allowed: boolean; lockReason?: string } {
  if (response.requiredStat) {
    const playerVal = state.stats[response.requiredStat.stat] ?? 0;
    if (playerVal < response.requiredStat.min) {
      return {
        allowed: false,
        lockReason: `Requires ${response.requiredStat.stat.toUpperCase()} >= ${
          response.requiredStat.min
        } (Yours: ${playerVal})`,
      };
    }
  }

  if (response.requiredItem) {
    if (!state.inventory.includes(response.requiredItem)) {
      const itemTitle =
        ITEMS_CATALOG[response.requiredItem]?.title ?? response.requiredItem;
      return {
        allowed: false,
        lockReason: `Requires Evidence: ${itemTitle}`,
      };
    }
  }

  if (response.requiredFactionRep) {
    const rep = state.factionRep[response.requiredFactionRep.factionId] ?? 0;
    if (rep < response.requiredFactionRep.min) {
      const facName = FACTION_NAMES[response.requiredFactionRep.factionId];
      return {
        allowed: false,
        lockReason: `Requires ${facName} Rep >= +${response.requiredFactionRep.min} (Yours: ${rep})`,
      };
    }
  }

  const isAlreadyClaimed =
    response.rewardId &&
    (state.claimedDialogueRewards ?? []).includes(response.rewardId);

  if (response.costCash && !isAlreadyClaimed && state.cash < response.costCash) {
    return {
      allowed: false,
      lockReason: `Requires R${response.costCash} Cash (Yours: R${state.cash})`,
    };
  }

  return { allowed: true };
}

/**
 * Helper: Returns true if the contact at `nodeId` has at least one unclaimed reward
 * that the player currently meets all stat/item/rep/cash requirements to claim.
 */
export function hasAvailableUnclaimedDialogueReward(
  state: GameState,
  nodeId: string
): boolean {
  const tree = ALL_CONTACT_DIALOGUES[nodeId] ?? CONTACT_DIALOGUES[nodeId];
  if (!tree) return false;
  const claimed = state.claimedDialogueRewards ?? [];

  for (const dNode of Object.values(tree.nodes)) {
    for (const resp of dNode.responses) {
      if (resp.rewardId && resp.effect && !claimed.includes(resp.rewardId)) {
        const { allowed } = canSelectDialogueResponse(state, resp);
        if (allowed) return true;
      }
    }
  }
  return false;
}

export interface DialogueResponse {
  id: string;
  label: string;
  nextNodeId: string | 'EXIT';
  // Optional gating requirements
  requiredStat?: { stat: StatType; min: number };
  requiredItem?: string;
  requiredFactionRep?: { factionId: FactionId; min: number };
  costCash?: number;
  // Optional one-time mechanical reward/favor (tracked via state.claimedDialogueRewards)
  rewardId?: string;
  rewardSummary?: string;
  effect?: ActionEffect;
}

export interface DialogueNode {
  id: string;
  speakerMood: string;
  paragraphs: string[];
  responses: DialogueResponse[];
}

export interface ContactDialogueTree {
  nodeId: string;
  contactName: string;
  contactRole: string;
  avatar: string;
  factionId: FactionId | 'neutral';
  rootNodeId: string;
  nodes: Record<string, DialogueNode>;
}

export const CONTACT_DIALOGUES: Record<string, ContactDialogueTree> = {
  // ===========================================================================
  // ACT 1 NODES (N1 - N7)
  // ===========================================================================

  // ---------------------------------------------------------------------------
  // N1: CONSTABLE NANDI (MERCURY ARCADE SAFEHOUSE)
  // ---------------------------------------------------------------------------
  n1_safehouse: {
    nodeId: 'n1_safehouse',
    contactName: 'Constable Nandi',
    contactRole: 'Wounded Whistleblower • Key Witness',
    avatar: '/assets/characters/nandi.jpg',
    factionId: 'neutral',
    rootNodeId: 'root',
    nodes: {
      root: {
        id: 'root',
        speakerMood:
          'Pressing a blood-soaked gauze pad against her shoulder under the buzzing emergency LED.',
        paragraphs: [
          '"Don\'t open the blinds, Sbu. Mokoena\'s unmarked Golf GTIs are circling Anton Lembede Street every twenty minutes. They didn\'t just kill Auditor Sithole at the Umgeni weighbridge—they were waiting for him with port transponders already scrubbed."',
          '"Everything Sithole died for is inside Docket #409 and that cracked handset. Tell me we aren\'t dying in this flat tonight."',
        ],
        responses: [
          {
            id: 'nandi_ask_ambush',
            label: '"Walk me through the N2 weighbridge ambush again. Who pulled the trigger?"',
            nextNodeId: 'ambush_details',
          },
          {
            id: 'nandi_dockets_check',
            label:
              '[DOCKETS >= 2] "Look at these weighbridge timestamps with me. Which tanker plates were ghosted?"',
            nextNodeId: 'dockets_breakthrough',
            requiredStat: { stat: 'dockets', min: 2 },
            rewardId: 'reward_n1_nandi_audit_tip',
            rewardSummary: '+1 Audit Docket #409 Clock, +10% Composure',
            effect: {
              clockProgress: [{ clockId: 'audit_docket_409', delta: 1 }],
              composureDelta: 10,
              narrativeLog:
                'Constable Nandi points out the forged weighbridge tare weights on Voucher #8841-B (+1 Audit Docket #409).',
            },
          },
          {
            id: 'nandi_show_ledger',
            label:
              '[Present Evidence: Decoded Water-Tanker Ledger] "I traced the shell company. Ma-Sibi and Zuko own the tankers."',
            nextNodeId: 'ledger_reaction',
            requiredItem: 'decoded_tanker_ledger',
            rewardId: 'reward_n1_nandi_composure',
            rewardSummary: '+15% Composure, -1 Nandi Gunshot Wound Clock',
            effect: {
              composureDelta: 15,
              clockProgress: [{ clockId: 'nandi_condition', delta: -1 }],
              narrativeLog:
                'Seeing hard proof that Sithole’s death wasn’t in vain steadies Nandi’s breathing (+15% Composure, -1 Wound Clock).',
            },
          },
          {
            id: 'nandi_exit',
            label: '"Rest up, Nandi. Keep the deadbolt thrown while I work the street."',
            nextNodeId: 'EXIT',
          },
        ],
      },
      ambush_details: {
        id: 'ambush_details',
        speakerMood: 'Eyes fixed on the rain streaking the louvered glass.',
        paragraphs: [
          '"Two blue-light sedans boxed us in just past the Umgeni off-ramp. Brigadier Mokoena didn\'t even wear a balaclava. He stepped out in his pressed TRT fatigues, took one look at Sithole\'s briefcase, and told his corporal to burn the car."',
          '"I rolled down the embankment into the storm drain with the original manila folder under my vest. If Sparks at Golden Dragon can crack Sithole\'s phone, Mokoena\'s own voice is on that cached voice note."',
        ],
        responses: [
          {
            id: 'nandi_back_root',
            label: '"Let\'s go back over our options."',
            nextNodeId: 'root',
          },
          {
            id: 'nandi_leave_ambush',
            label: '"I\'ll make sure that voice note sees daylight."',
            nextNodeId: 'EXIT',
          },
        ],
      },
      dockets_breakthrough: {
        id: 'dockets_breakthrough',
        speakerMood: 'Tracing a trembling finger across the carbon-copy invoice.',
        paragraphs: [
          '"Here—plates ND-449-102 through 118. They billed City Hall for forty-two million Rand to deliver drinking water to KwaMashu during the drought, but look at the diesel toll tags. They never turned north."',
          '"Every single tanker drove straight into Pier 2 Cold Storage at 01:30 AM. They\'re hauling Zuko Ndlovu\'s chemical precursors under municipal water livery."',
        ],
        responses: [
          {
            id: 'nandi_dockets_back',
            label: '"That saves me hours of ledger cross-checking. Hold tight."',
            nextNodeId: 'root',
          },
        ],
      },
      ledger_reaction: {
        id: 'ledger_reaction',
        speakerMood: 'A fierce, exhausted relief breaking across her face.',
        paragraphs: [
          '"Zululand Aqua-Logistics... sixty percent Abasanta Maritime, forty percent Ma-Sibi\'s family trust. You actually nailed it, Sbu."',
          '"Get this to Colonel van der Merwe in the Old Archive Basement—or burn Berth 14 to the waterline yourself. Either way, they don\'t get away clean."',
        ],
        responses: [
          {
            id: 'nandi_ledger_back',
            label: '"Stay off your feet. We\'re entering the endgame."',
            nextNodeId: 'root',
          },
        ],
      },
    },
  },

  // ---------------------------------------------------------------------------
  // N2: BRA BHEKI SITHOLE (QUEEN STREET TAXI RANK)
  // ---------------------------------------------------------------------------
  n2_taxi_rank: {
    nodeId: 'n2_taxi_rank',
    contactName: 'Bra Bheki Sithole',
    contactRole: 'Queen Street Taxi Boss • Syndicate Fixer',
    avatar: '/assets/characters/bheki.jpg',
    factionId: 'street_syndicate',
    rootNodeId: 'root',
    nodes: {
      root: {
        id: 'root',
        speakerMood:
          'Counting crisp hundred-Rand notes inside a parked Quantum minibus while rank marshals whistle outside.',
        paragraphs: [
          '"Hawu, the ex-Hawk walks into Queen Street while Mokoena\'s TRT boys are turning over every second minibus at Warwick Junction. You\'ve got brass, Sbu, I\'ll give you that."',
          '"Nothing moves through the CBD without my drivers seeing it first—not SAPS Nyalas, and definitely not those shiny municipal water tankers running heavy at two in the morning."',
        ],
        responses: [
          {
            id: 'bheki_ask_tankers',
            label: '"What are your night-shift drivers saying about the municipal tankers?"',
            nextNodeId: 'tanker_rumors',
          },
          {
            id: 'bheki_street_check',
            label:
              '[STREET >= 2] "Your rank marshals owe me from the Berea route truce. Scrub my plates from Mokoena\'s spotters."',
            nextNodeId: 'street_favor',
            requiredStat: { stat: 'street', min: 2 },
            rewardId: 'reward_n2_bheki_plates',
            rewardSummary: '-1 Precinct Heat, +1 Street Syndicate Rep',
            effect: {
              clockProgress: [{ clockId: 'precinct_heat', delta: -1 }],
              factionRepDelta: [{ factionId: 'street_syndicate', delta: 1 }],
              narrativeLog:
                'Bra Bheki flashes two fingers to his rank marshals; decoy Quantum plates throw off SAPS spotters (-1 Precinct Heat, +1 Street Syndicate Rep).',
            },
          },
          {
            id: 'bheki_rep_stipend',
            label:
              '[Street Syndicate Rep >= 2] "The Queen Street alliance stands together. Can the rank float me operation cash?"',
            nextNodeId: 'syndicate_stipend',
            requiredFactionRep: { factionId: 'street_syndicate', min: 2 },
            rewardId: 'reward_n2_bheki_cash',
            rewardSummary: '+R450 Cash',
            effect: {
              cashDelta: 450,
              narrativeLog:
                'Bra Bheki peels R450 from the rank kitty and drops it into your palm (+R450 Cash).',
            },
          },
          {
            id: 'bheki_exit',
            label: '"Keep your headlights low, Bra Bheki."',
            nextNodeId: 'EXIT',
          },
        ],
      },
      tanker_rumors: {
        id: 'tanker_rumors',
        speakerMood: 'Leaning out the sliding door, voice dropping below the diesel idle.',
        paragraphs: [
          '"Listen carefully. Those tankers have City Hall decals on the doors, yeah? But my boys who run the Umbilo graveyard shift say the tyres are Squatting under chemical drum weight, and Abasanta gunmen ride shotgun in Golf R sedans."',
          '"meanwhile our mothers in KwaMashu queue with plastic buckets at dry standpipes. Councillor Ma-Sibi is selling out her own wards."',
        ],
        responses: [
          {
            id: 'bheki_back',
            label: '"Good intel. Let\'s talk about something else."',
            nextNodeId: 'root',
          },
        ],
      },
      street_favor: {
        id: 'street_favor',
        speakerMood: 'Chuckling warmly as he taps his Motorola two-way radio.',
        paragraphs: [
          '"You never forgot how the street works, Sbu. Done. Three of my Quantums just boxed in the SAPS camera van on Monty Naicker Road. You\'ve got breathing room."',
        ],
        responses: [
          {
            id: 'bheki_favor_back',
            label: '"Respect, Bra Bheki."',
            nextNodeId: 'root',
          },
        ],
      },
      syndicate_stipend: {
        id: 'syndicate_stipend',
        speakerMood: 'Pressing a thick roll of notes into your jacket pocket.',
        paragraphs: [
          '"Take this from the route association war-chest. Buy diesel, bribe a clerk, or get Nandi patched up. Just make sure Mokoena bleeds for choking our streets."',
        ],
        responses: [
          {
            id: 'bheki_stipend_back',
            label: '"It\'ll go straight into breaking their convoy."',
            nextNodeId: 'root',
          },
        ],
      },
    },
  },

  // ---------------------------------------------------------------------------
  // N3: BRIGADIER TITUS MOKOENA (SAPS CENTRAL PRECINCT)
  // ---------------------------------------------------------------------------
  n3_central_precinct: {
    nodeId: 'n3_central_precinct',
    contactName: 'Brigadier Titus Mokoena',
    contactRole: 'SAPS TRT Commander • Cartel Enforcer',
    avatar: '/assets/characters/mokoena.jpg',
    factionId: 'saps_trt',
    rootNodeId: 'root',
    nodes: {
      root: {
        id: 'root',
        speakerMood:
          'Standing under the flickering fluorescent tubes of the Central Precinct charge office, thumb hooked in his tactical vest.',
        paragraphs: [
          '"Well, well. Look what the monsoon washed into my charge office. You\'re suspended from the Hawks, Sbu—walking in here takes either a death wish or a very expensive lawyer."',
          '"Where is Constable Nandi, and where is the municipal auditor\'s briefcase?"',
        ],
        responses: [
          {
            id: 'mokoena_bluff',
            label: '"I\'m just checking the public charge sheet, Brigadier. Nervous about something on the N2?"',
            nextNodeId: 'mokoena_threat',
          },
          {
            id: 'mokoena_influence_check',
            label:
              '[INFLUENCE >= 2] "Internal Affairs in Pretoria already has a blind copy of Docket #409. Call off your sweep or we both burn."',
            nextNodeId: 'mokoena_standdown',
            requiredStat: { stat: 'influence', min: 2 },
            rewardId: 'reward_n3_mokoena_stall',
            rewardSummary: '-1 Brigadier Mokoena’s Sweep Clock, +1 SAPS TRT Rep',
            effect: {
              clockProgress: [{ clockId: 'mokoena_sweep', delta: -1 }],
              factionRepDelta: [{ factionId: 'saps_trt', delta: 1 }],
              narrativeLog:
                'Your Pretoria bluff forces Mokoena to pull back two TRT patrol squads (-1 Mokoena Sweep Clock, +1 SAPS TRT Rep).',
            },
          },
          {
            id: 'mokoena_present_manifest',
            label:
              '[Present Evidence: Berth 14 Manifest] "I have your voice on tape ordering the Umgeni hit, Titus. Pay me to misplace the copy."',
            nextNodeId: 'mokoena_shakedown',
            requiredItem: 'berth_14_manifest',
            rewardId: 'reward_n3_mokoena_shakedown',
            rewardSummary: '+R600 Hush Money, -1 Precinct Heat',
            effect: {
              cashDelta: 600,
              clockProgress: [{ clockId: 'precinct_heat', delta: -1 }],
              narrativeLog:
                'Mokoena slides an unmarked evidence envelope of confiscated cash across the desk to buy your silence (+R600 Cash, -1 Precinct Heat).',
            },
          },
          {
            id: 'mokoena_exit',
            label: '"Goodnight, Brigadier. Watch your step in the blackout."',
            nextNodeId: 'EXIT',
          },
        ],
      },
      mokoena_threat: {
        id: 'mokoena_threat',
        speakerMood: 'Jaw clenching as a desk sergeant hurriedly looks away.',
        paragraphs: [
          '"Durban runs on order, Sbu. Zuko keeps the docks quiet, Ma-Sibi keeps the lights on at City Hall, and my Task Force keeps the peace. Mandla Sithole thought a spreadsheet could stop a freight train."',
          '"Hand Nandi over before midnight on Day 4, or my men won\'t bother knocking on your Mercury Arcade door."',
        ],
        responses: [
          {
            id: 'mokoena_threat_back',
            label: '"Hold that thought, Titus."',
            nextNodeId: 'root',
          },
        ],
      },
      mokoena_standdown: {
        id: 'mokoena_standdown',
        speakerMood: 'Studying your eyes for a bluff before barking into his shoulder mic.',
        paragraphs: [
          '"...Stand down Car 4 and Car 7 from the Victoria Embankment sector. You always knew how to play bureaucratic chess, Sbu. Enjoy the extra twenty-four hours—it won\'t save you when Berth 14 clears."',
        ],
        responses: [
          {
            id: 'mokoena_standdown_back',
            label: '"Pleasure doing business with SAPS command."',
            nextNodeId: 'root',
          },
        ],
      },
      mokoena_shakedown: {
        id: 'mokoena_shakedown',
        speakerMood: 'Voice dropping to a venomous whisper as he unlocks a desk drawer.',
        paragraphs: [
          '"So the idealistic Hawk finally learned the price of meat in eThekwini. Take this seized cash from the locker. Keep that audio file off Colonel van der Merwe\'s desk, and maybe Zuko lets you live to see next week."',
        ],
        responses: [
          {
            id: 'mokoena_shakedown_back',
            label: '"We\'ll see how long your credit holds."',
            nextNodeId: 'root',
          },
        ],
      },
    },
  },

  // ---------------------------------------------------------------------------
  // N4: COUNCILLOR "MA-SIBI" KHUMALO (CITY HALL ANNEX)
  // ---------------------------------------------------------------------------
  n4_city_hall: {
    nodeId: 'n4_city_hall',
    contactName: 'Councillor "Ma-Sibi" Khumalo',
    contactRole: 'Metro Renewal Coalition • Tender Mafia',
    avatar: '/assets/characters/masibi.jpg',
    factionId: 'city_hall',
    rootNodeId: 'root',
    nodes: {
      root: {
        id: 'root',
        speakerMood:
          'Sipping rooibos from fine bone china while her private diesel generator hums smoothly outside the teak-paneled office.',
        paragraphs: [
          '"Close the door, darling, the humidity ruins the mahogany. Everybody in this city complains when the grid drops to Stage 6, yet nobody asks who pays for coalition politics."',
          '"You\'ve been sniffing around Procurement Registry B. Tell me what a disgraced investigator wants with emergency water infrastructure."',
        ],
        responses: [
          {
            id: 'masibi_ask_grid',
            label: '"Why does Sub-Station 14 always trip right when Pier 2 unloads at midnight?"',
            nextNodeId: 'grid_admission',
          },
          {
            id: 'masibi_present_ledger',
            label:
              '[Present Evidence: Decoded Water-Tanker Ledger] "Forty percent of Zululand Aqua-Logistics belongs to your family trust, Ma-Sibi."',
            nextNodeId: 'ledger_leverage',
            requiredItem: 'decoded_tanker_ledger',
            rewardId: 'reward_n4_masibi_retainer',
            rewardSummary: '+R500 Consulting Fee, +1 City Hall Rep, -1 Precinct Heat',
            effect: {
              cashDelta: 500,
              factionRepDelta: [{ factionId: 'city_hall', delta: 1 }],
              clockProgress: [{ clockId: 'precinct_heat', delta: -1 }],
              narrativeLog:
                'Councillor Ma-Sibi authorizes an instant R500 "municipal security consultancy" payout and calls off metro police spotters (+R500, +1 City Hall Rep, -1 Heat).',
            },
          },
          {
            id: 'masibi_dockets_check',
            label:
              '[DOCKETS >= 2] "Your clerk left the Sub-Station 14 override schedule on the fax machine. I\'m copying the port blackout window."',
            nextNodeId: 'dockets_fax',
            requiredStat: { stat: 'dockets', min: 2 },
            rewardId: 'reward_n4_masibi_dockets',
            rewardSummary: '+10% Composure, +1 Crack Auditor’s Handset Clock',
            effect: {
              composureDelta: 10,
              clockProgress: [{ clockId: 'crack_auditor_phone', delta: 1 }],
              narrativeLog:
                'The municipal telecoms pin-code on Ma-Sibi’s fax header gives Sparks a shortcut on the Auditor’s handset (+1 Crack Auditor’s Handset Clock, +10% Composure).',
            },
          },
          {
            id: 'masibi_exit',
            label: '"Enjoy the air-conditioning while it lasts, Councillor."',
            nextNodeId: 'EXIT',
          },
        ],
      },
      grid_admission: {
        id: 'grid_admission',
        speakerMood: 'Smiling thinly over the rim of her teacup.',
        paragraphs: [
          '"Load shedding is a tragedy, Sbu—unless you know which breaker to pull and when. When Stage 6 hits the Point Waterfront, Transnet\'s automated cameras go blind for four hours."',
          '"Friends of City Hall never sit in the dark. Enemies find their safehouses raided before the streetlights come back on."',
        ],
        responses: [
          {
            id: 'masibi_grid_back',
            label: '"A convenient arrangement."',
            nextNodeId: 'root',
          },
        ],
      },
      ledger_leverage: {
        id: 'ledger_leverage',
        speakerMood: 'Setting her cup down without a sound, eyes razor-sharp.',
        paragraphs: [
          '"Mandla Sithole was a brilliant accountant with zero survival instinct. You, on the other hand, understand leverage."',
          '"Here is a five-hundred Rand retainer from the discretionary ward fund. Keep my trust\'s name out of the newspapers, and my office can even manipulate the Eskom grid when you need a blackout."',
        ],
        responses: [
          {
            id: 'masibi_leverage_back',
            label: '"I\'ll pocket the retainer. We\'ll see about the newspapers."',
            nextNodeId: 'root',
          },
        ],
      },
      dockets_fax: {
        id: 'dockets_fax',
        speakerMood: 'Glancing irritably toward the outer secretariat.',
        paragraphs: [
          '"Competent staff are impossible to find in this municipality. Fine—take the telecoms routing sheet. You\'ll find it leads straight back to Zuko\'s crane at Berth 14 anyway."',
        ],
        responses: [
          {
            id: 'masibi_fax_back',
            label: '"Much obliged, Councillor."',
            nextNodeId: 'root',
          },
        ],
      },
    },
  },

  // ---------------------------------------------------------------------------
  // N5: SPARKS (GOLDEN DRAGON CYBER-PAWN)
  // ---------------------------------------------------------------------------
  n5_cyber_pawn: {
    nodeId: 'n5_cyber_pawn',
    contactName: 'Sparks',
    contactRole: 'Signals & Hardware Fixer • Black-Market Tech',
    avatar: '/assets/characters/sparks.jpg',
    factionId: 'neutral',
    rootNodeId: 'root',
    nodes: {
      root: {
        id: 'root',
        speakerMood:
          'Peering through jeweler’s loupes under a neon dragon sign while a soldering iron smokes beside a stack of stripped PlayStations.',
        paragraphs: [
          '"Mind the tripwire by the umbrella stand, Sbu! Stage 4 voltage spikes just fried two of my oscilloscopes, and Mokoena\'s cyber-crime goons have been pinging every cell tower between Grey Street and the harbour."',
          '"You brought me Mandla Sithole\'s GraphemeOS brick? That handset has an Abasanta remote-wipe daemon sitting on the baseband chip."',
        ],
        responses: [
          {
            id: 'sparks_ask_phone',
            label: '"What\'s on the auditor\'s phone that has Zuko and Mokoena so terrified?"',
            nextNodeId: 'phone_lore',
          },
          {
            id: 'sparks_wire_check',
            label:
              '[WIRE >= 2] "Let\'s bridge the JTAG pins inside a Faraday cage before the baseband pings the tower."',
            nextNodeId: 'wire_collab',
            requiredStat: { stat: 'wire', min: 2 },
            rewardId: 'reward_n5_sparks_jtag',
            rewardSummary: '+1 Crack Auditor’s Handset Clock, +10% Composure',
            effect: {
              clockProgress: [{ clockId: 'crack_auditor_phone', delta: 1 }],
              composureDelta: 10,
              narrativeLog:
                'You and Sparks solder a clean JTAG bypass on the auditor’s handset (+1 Crack Auditor’s Handset Clock, +10% Composure).',
            },
          },
          {
            id: 'sparks_coffee_stim',
            label:
              '[Pay R100] "Put a pot of Ethiopian espresso on the gas burner and sweep my burner phone for SAPS IMSI-catchers."',
            nextNodeId: 'imsi_sweep',
            costCash: 100,
            rewardId: 'reward_n5_sparks_imsi',
            rewardSummary: '-1 Precinct Heat, +10% Composure (Costs R100)',
            effect: {
              clockProgress: [{ clockId: 'precinct_heat', delta: -1 }],
              composureDelta: 10,
              narrativeLog:
                'Sparks flashes fresh IMEI firmware onto your handset over midnight espresso (-R100, -1 Precinct Heat, +10% Composure).',
            },
          },
          {
            id: 'sparks_exit',
            label: '"Keep the Faraday cage sealed, Sparks."',
            nextNodeId: 'EXIT',
          },
        ],
      },
      phone_lore: {
        id: 'phone_lore',
        speakerMood: 'Tapping the cracked OLED screen with insulated tweezers.',
        paragraphs: [
          '"Sithole wasn\'t just an accountant—he planted a directional mic inside Pier 2 Cold Storage. Before they rammed his car on the N2, his phone cached a forty-eight-second voice note and the container manifest for MV Southern Cross."',
          '"Watch out for Stage 6 blackouts, though. Unless you run your safehouse diesel generator, my main decryption rig loses grid power."',
        ],
        responses: [
          {
            id: 'sparks_lore_back',
            label: '"Good to know. Let\'s check the bench."',
            nextNodeId: 'root',
          },
        ],
      },
      wire_collab: {
        id: 'wire_collab',
        speakerMood: 'Grinning as green hexadecimal dumps cascade down his CRT monitor.',
        paragraphs: [
          '"Ayoba! Look at that voltage timing—we bypassed the first biometric lock without tripping the Abasanta wipe daemon. One more clean pass on the bench and this drive is yours."',
        ],
        responses: [
          {
            id: 'sparks_collab_back',
            label: '"Nice soldering, Sparks."',
            nextNodeId: 'root',
          },
        ],
      },
      imsi_sweep: {
        id: 'imsi_sweep',
        speakerMood: 'Handing you a tin mug of tar-black coffee as his spectrum analyzer chirps.',
        paragraphs: [
          '"Yup, Central Precinct had a stingray tower locked onto your old SIM serial. I\'ve rotated your baseband MAC address to look like a municipal parking meter. Drink up!"',
        ],
        responses: [
          {
            id: 'sparks_imsi_back',
            label: '"That hits the spot."',
            nextNodeId: 'root',
          },
        ],
      },
    },
  },

  // ---------------------------------------------------------------------------
  // N6: ZUKO "THE ARCHITECT" NDLOVU (PIER 2 COLD STORAGE)
  // ---------------------------------------------------------------------------
  n6_pier2_port: {
    nodeId: 'n6_pier2_port',
    contactName: 'Zuko "The Architect" Ndlovu',
    contactRole: 'Abasanta Logistics Kingpin • Berth 14',
    avatar: '/assets/characters/zuko.jpg',
    factionId: 'abasanta',
    rootNodeId: 'root',
    nodes: {
      root: {
        id: 'root',
        speakerMood:
          'Standing on the rain-slick catwalk above Berth 14 in a tailored cashmere overcoat, watching gantry cranes swing forty-foot containers through the fog.',
        paragraphs: [
          '"Look out at the channel, Sbu. Sixty ships waiting at anchor, three thousand containers a day, and Pretoria thinks a piece of paper signed by a magistrate governs this harbour."',
          '"I built Abasanta Logistics from a single cold-storage shed. Now you stand on my catwalk with a dead auditor\'s ledger. Are you here to play hero, or are you here to understand supply and demand?"',
        ],
        responses: [
          {
            id: 'zuko_philosophy',
            label: '"You\'re poisoning township water routes to haul chemical precursors, Zuko."',
            nextNodeId: 'zuko_vision',
          },
          {
            id: 'zuko_present_manifest',
            label:
              '[Present Evidence: Berth 14 Manifest] "Container MSCU-908114 is flagged. Cut me in on the logistics retainer or the Hawks board MV Southern Cross."',
            nextNodeId: 'zuko_deal',
            requiredItem: 'berth_14_manifest',
            rewardId: 'reward_n6_zuko_retainer',
            rewardSummary: '+R700 Cash, +1 Abasanta Rep',
            effect: {
              cashDelta: 700,
              factionRepDelta: [{ factionId: 'abasanta', delta: 1 }],
              narrativeLog:
                'Zuko Ndlovu nods slowly and authorizes a R700 Abasanta bearer payout (+R700 Cash, +1 Abasanta Rep).',
            },
          },
          {
            id: 'zuko_street_spot',
            label:
              '[STREET >= 2] "Your Berth 14 crane guards just rotated shifts. I\'ve already clocked the blind spot by the fuel valves."',
            nextNodeId: 'zuko_respect',
            requiredStat: { stat: 'street', min: 2 },
            rewardId: 'reward_n6_zuko_composure',
            rewardSummary: '+15% Composure, -1 Brigadier Mokoena’s Sweep Clock',
            effect: {
              composureDelta: 15,
              clockProgress: [{ clockId: 'mokoena_sweep', delta: -1 }],
              narrativeLog:
                'Scouting Berth 14’s security perimeter firsthand steels your nerves and lets you slip past Mokoena’s harbour cordon (+15% Composure, -1 Mokoena Sweep).',
            },
          },
          {
            id: 'zuko_exit',
            label: '"We\'ll settle this when the midnight convoy rolls, Zuko."',
            nextNodeId: 'EXIT',
          },
        ],
      },
      zuko_vision: {
        id: 'zuko_vision',
        speakerMood: 'Gesturing toward the glowing skyline of the CBD across the water.',
        paragraphs: [
          '"City Hall stole the water budget ten years before I ever leased a tanker, Sbu. I simply rented their empty trucks. In this country, infrastructure belongs to whoever maintains the diesel and pays the guards."',
          '"Mokoena is a blunt instrument, and Ma-Sibi is a parasite. Help me clear Berth 14 tonight, and you\'ll never scrape for rent in Mercury Arcade again."',
        ],
        responses: [
          {
            id: 'zuko_vision_back',
            label: '"Every kingpin thinks he\'s a philosopher."',
            nextNodeId: 'root',
          },
        ],
      },
      zuko_deal: {
        id: 'zuko_deal',
        speakerMood: 'Signaling his lieutenant to hand over a sealed customs pouch.',
        paragraphs: [
          '"Smart man. The Hawks paid you peanuts and threw you to the wolves when you got too close to the truth. Consider this your first dividend from Berth 14. When midnight comes, make sure that convoy rolls."',
        ],
        responses: [
          {
            id: 'zuko_deal_back',
            label: '"We\'ll see what midnight brings."',
            nextNodeId: 'root',
          },
        ],
      },
      zuko_respect: {
        id: 'zuko_respect',
        speakerMood: 'A cold, appraising smile crossing his face in the sodium crane glare.',
        paragraphs: [
          '"No wonder Mokoena\'s hit squad missed you on the N2. You move like dockyard smoke. Tell Titus I called off his harbour patrol dogs for tonight—if we\'re going to test each other, let\'s do it without amateurs in the way."',
        ],
        responses: [
          {
            id: 'zuko_respect_back',
            label: '"Until midnight at Berth 14."',
            nextNodeId: 'root',
          },
        ],
      },
    },
  },

  // ---------------------------------------------------------------------------
  // N7: COLONEL PIET VAN DER MERWE (THE OLD ARCHIVE BASEMENT)
  // ---------------------------------------------------------------------------
  n7_archive_basement: {
    nodeId: 'n7_archive_basement',
    contactName: 'Colonel Piet van der Merwe',
    contactRole: 'DPCI Hawks Holdout • Clean Task Force',
    avatar: '/assets/characters/vandermerwe.jpg',
    factionId: 'hawks',
    rootNodeId: 'root',
    nodes: {
      root: {
        id: 'root',
        speakerMood:
          'hunched over a green-shaded banker’s lamp between towering steel shelves of mouldering magistrate dockets.',
        paragraphs: [
          '"You made it past the magistrate court cameras, Sbu. Good. Half of Provincial Headquarters is on Mokoena\'s payroll, which is why I moved my task force down here with the 1980s microfiche machines."',
          '"You look like hell, my boy—and I hear Constable Nandi took a round on the N2. Tell me you brought something that can survive a High Court judge."',
        ],
        responses: [
          {
            id: 'vdm_ask_hawks',
            label: '"Why haven\'t the Hawks arrested Mokoena and Ma-Sibi already, Colonel?"',
            nextNodeId: 'vdm_politics',
          },
          {
            id: 'vdm_present_both',
            label:
              '[Present Evidence: Berth 14 Manifest] "Listen to this audio file, Colonel. Mokoena ordered the N2 hit himself."',
            nextNodeId: 'vdm_audio_shock',
            requiredItem: 'berth_14_manifest',
            rewardId: 'reward_n7_vdm_safechannel',
            rewardSummary: '+1 Hawks Rep, -1 Precinct Heat, +15% Composure',
            effect: {
              factionRepDelta: [{ factionId: 'hawks', delta: 1 }],
              clockProgress: [{ clockId: 'precinct_heat', delta: -1 }],
              composureDelta: 15,
              narrativeLog:
                'Colonel van der Merwe logs the Berth 14 audio into the classified DPCI vault and assigns counter-surveillance cover (+1 Hawks Rep, -1 Heat, +15% Composure).',
            },
          },
          {
            id: 'vdm_exit',
            label: '"Keep the blast door bolted, Colonel. I\'m almost ready."',
            nextNodeId: 'EXIT',
          },
        ],
      },
      vdm_politics: {
        id: 'vdm_politics',
        speakerMood: 'Polishing his wire-rimmed glasses with a tired sigh.',
        paragraphs: [
          '"Because every time I draft a warrant Upstairs, someone in the Ministry tips off City Hall within fifteen minutes. Without both the financial ledger AND the Berth 14 audio, the prosecutor will throw the case out before breakfast."',
          '"If we transmit the full package straight to The Daily Veld newsroom while locking down witness protection for Nandi, they can\'t bury it."',
        ],
        responses: [
          {
            id: 'vdm_politics_back',
            label: '"Then we bypass Upstairs completely."',
            nextNodeId: 'root',
          },
        ],
      },
      vdm_audio_shock: {
        id: 'vdm_audio_shock',
        speakerMood: 'Pulling off his headphones, face pale beneath the banker’s lamp.',
        paragraphs: [
          '"Good God... \'intercept his sedan before the Umgeni off-ramp and burn the briefcase.\' That\'s Titus Mokoena\'s voice, crystal clear."',
          '"I\'m putting your vehicle on our federal diplomatic registry right now to scrub your Precinct Heat. Stay alive until we broadcast this, Sbu."',
        ],
        responses: [
          {
            id: 'vdm_audio_back',
            label: '"Thank you, Colonel."',
            nextNodeId: 'root',
          },
        ],
      },
    },
  },

  // ===========================================================================
  // ACT 2 NODES ("THE COMMISSION OF INQUIRY" — N8 - N12)
  // ===========================================================================

  // ---------------------------------------------------------------------------
  // N8: COUNCILLOR "MA-SIBI" KHUMALO (THE RIDGE PENTHOUSES)
  // ---------------------------------------------------------------------------
  n8_ridge_penthouses: {
    nodeId: 'n8_ridge_penthouses',
    contactName: 'Councillor "Ma-Sibi" Khumalo',
    contactRole: 'Sovereign Pearl Trustee • Umhlanga Ridge',
    avatar: '/assets/characters/masibi.jpg',
    factionId: 'city_hall',
    rootNodeId: 'root',
    nodes: {
      root: {
        id: 'root',
        speakerMood:
          'Standing on a wind-swept 28th-floor glass balcony overlooking the Indian Ocean while paper shredders hum inside the penthouse suite.',
        paragraphs: [
          '"The air is cleaner up here on the Ridge, isn\'t it, Sbu? Down in the CBD they\'re holding their little Judicial Commission of Inquiry, pretending a retired judge can unwind twenty years of municipal patronage."',
          '"My suitcases are already at King Shaka Hangar 7. Why are you climbing my glass tower when the storm is almost over?"',
        ],
        responses: [
          {
            id: 'masibi_act2_trust',
            label: '"What is Sovereign Pearl Holdings, and why is a Gulfstream fuelled at Hangar 7?"',
            nextNodeId: 'masibi_dubai_lore',
          },
          {
            id: 'masibi_act2_wire',
            label:
              '[WIRE >= 2] "Your fiduciary clerk forgot to wipe the Dubai SWIFT mirror on the 28th-floor server."',
            nextNodeId: 'masibi_swift_trace',
            requiredStat: { stat: 'wire', min: 2 },
            rewardId: 'reward_n8_masibi_trace',
            rewardSummary: '+1 Trace Sovereign Pearl Trust Clock, -1 Contempt Warrant',
            effect: {
              clockProgress: [
                { clockId: 'trace_offshore_trust', delta: 1 },
                { clockId: 'commission_subpoena', delta: -1 },
              ],
              narrativeLog:
                'You siphon the DIFC escrow header from Ma-Sibi’s penthouse router (+1 Trace Sovereign Pearl Trust, -1 Contempt Warrant).',
            },
          },
          {
            id: 'masibi_act2_deed',
            label:
              '[Present Evidence: Sovereign Pearl Trust Deed] "I have the beneficial ownership schedule, Ma-Sibi. Buy your seat off my charge sheet."',
            nextNodeId: 'masibi_act2_payoff',
            requiredItem: 'offshore_trust_deed',
            rewardId: 'reward_n8_masibi_bribe',
            rewardSummary: '+R800 Offshore Cash, +1 City Hall Rep',
            effect: {
              cashDelta: 800,
              factionRepDelta: [{ factionId: 'city_hall', delta: 1 }],
              narrativeLog:
                'Ma-Sibi hands over R800 in crisp bearer notes from her travel safe (+R800 Cash, +1 City Hall Rep).',
            },
          },
          {
            id: 'masibi_act2_exit',
            label: '"Don\'t board that Gulfstream yet, Councillor."',
            nextNodeId: 'EXIT',
          },
        ],
      },
      masibi_dubai_lore: {
        id: 'masibi_dubai_lore',
        speakerMood: 'Watching lightning flicker over the Umhlanga lighthouse.',
        paragraphs: [
          '"Every smart politician in KwaZulu-Natal knows the Rand is for spending and the Dirham is for keeping. Sovereign Pearl holds the real estate in Dubai, the citrus estate in the Midlands, and the charter jet at Hangar 7."',
          '"Zuko owns forty-five percent, I hold thirty, and Titus Mokoena holds twenty-five for keeping the guns pointed away from us."',
        ],
        responses: [
          {
            id: 'masibi_act2_back',
            label: '"A neat three-way split."',
            nextNodeId: 'root',
          },
        ],
      },
      masibi_swift_trace: {
        id: 'masibi_swift_trace',
        speakerMood: 'Her composure cracking for a fraction of a second.',
        paragraphs: [
          '"You hacked the escrow terminal? You really are relentless. Fine—the prosecutors shepherding that Contempt Warrant against you answer to my coalition whip. I\'ll tell them to slow-walk your arrest file."',
        ],
        responses: [
          {
            id: 'masibi_swift_back',
            label: '"Smart move."',
            nextNodeId: 'root',
          },
        ],
      },
      masibi_act2_payoff: {
        id: 'masibi_act2_payoff',
        speakerMood: 'Unlocking a leather travel Valise and counting out notes.',
        paragraphs: [
          '"Take it. Focus your wrath on Zuko\'s Midlands super-lab or Mokoena\'s hitmen—leave an old woman to her retirement villa on the Palm Jumeirah."',
        ],
        responses: [
          {
            id: 'masibi_payoff_back',
            label: '"We\'ll see who makes the flight."',
            nextNodeId: 'root',
          },
        ],
      },
    },
  },

  // ---------------------------------------------------------------------------
  // N9: BRA BHEKI SITHOLE (NORTHERN TOWNSHIP DEPOT)
  // ---------------------------------------------------------------------------
  n9_township_depot: {
    nodeId: 'n9_township_depot',
    contactName: 'Bra Bheki Sithole',
    contactRole: 'Northern Water Strike Marshal • Queen St. Alliance',
    avatar: '/assets/characters/bheki.jpg',
    factionId: 'street_syndicate',
    rootNodeId: 'root',
    nodes: {
      root: {
        id: 'root',
        speakerMood:
          'Standing atop an impounded municipal water tanker in KwaMashu while hundreds of residents bang empty twenty-litre buckets against the depot gates.',
        paragraphs: [
          '"Look at these tankers we seized last night, Sbu! False baffles welded inside the drums—dry as bone in the water compartment, and chemical precursor residue in the hidden core."',
          '"The people in the northern wards are done waiting for High Court commissions. My drivers have locked down the depot, and Mokoena\'s out-of-province izinkabi hitmen are prowling the ridge roads looking for you."',
        ],
        responses: [
          {
            id: 'bheki_act2_gps',
            label: '"Did the impounded tankers still have their dash-mount GPS transponders intact?"',
            nextNodeId: 'bheki_gps_info',
          },
          {
            id: 'bheki_act2_street',
            label:
              '[STREET >= 2] "Let\'s pull the GPS flash chips from Lead Tanker #14 right now and set up citizen spotters against the hit squad."',
            nextNodeId: 'bheki_street_rally',
            requiredStat: { stat: 'street', min: 2 },
            rewardId: 'reward_n9_bheki_telemetry',
            rewardSummary:
              '+1 Synthesize Super-Lab Telemetry Clock, -1 Izinkabi Hit Squad Clock',
            effect: {
              clockProgress: [
                { clockId: 'compile_ballistics_file', delta: 1 },
                { clockId: 'cartel_hit_squad', delta: -1 },
              ],
              factionRepDelta: [{ factionId: 'street_syndicate', delta: 1 }],
              narrativeLog:
                'Bra Bheki’s mechanics pry out the tanker GPS chip while township taxi patrols block the izinkabi hitmen (+1 Super-Lab Telemetry, -1 Hit Squad, +1 Street Rep).',
            },
          },
          {
            id: 'bheki_act2_exit',
            label: '"Hold the depot gates, Bra Bheki. We\'re taking the fight to their estate."',
            nextNodeId: 'EXIT',
          },
        ],
      },
      bheki_gps_info: {
        id: 'bheki_gps_info',
        speakerMood: 'Slamming his palm against the stainless-steel tanker flank.',
        paragraphs: [
          '"Every single one of them! Between 1:00 AM and 4:00 AM, instead of pumping water from the reservoir, these trucks climbed the N3 inland to a hydroponic citrus estate near the Howick spur."',
          '"Synthesize that telemetry data, Sbu, and you\'ll have the exact coordinates of Zuko\'s inland super-lab."',
        ],
        responses: [
          {
            id: 'bheki_gps_back',
            label: '"That\'s the missing link between the harbour and the airport."',
            nextNodeId: 'root',
          },
        ],
      },
      bheki_street_rally: {
        id: 'bheki_street_rally',
        speakerMood: 'Raising his fist as the crowd roars along the perimeter fence.',
        paragraphs: [
          '"Here\'s the flash module from Tanker #14! And don\'t worry about those contract gunmen from Joburg—any strange sedan entering the northern corridor gets boxed in by forty Quantums before they can load a magazine."',
        ],
        responses: [
          {
            id: 'bheki_rally_back',
            label: '"Amandla, Bra Bheki."',
            nextNodeId: 'root',
          },
        ],
      },
    },
  },

  // ---------------------------------------------------------------------------
  // N10: COLONEL PIET VAN DER MERWE (HIGH COURT COMMISSION CHAMBERS)
  // ---------------------------------------------------------------------------
  n10_high_court: {
    nodeId: 'n10_high_court',
    contactName: 'Colonel Piet van der Merwe',
    contactRole: 'Commission Evidence Leader • DPCI Hawks',
    avatar: '/assets/characters/vandermerwe.jpg',
    factionId: 'hawks',
    rootNodeId: 'root',
    nodes: {
      root: {
        id: 'root',
        speakerMood:
          'Standing in the marble rotunda of the KZN High Court with a stack of red-ribboned subpoenas under his arm.',
        paragraphs: [
          '"Welcome to the Commission of Inquiry, Sbu. Berth 14 blew the lid off the harbour, so now the syndicate is fighting us with silk-robed advocates and State Security gag orders."',
          '"Worse still, we intercepted flight-plan telemetry from King Shaka International. Flight ZS-900—a private Gulfstream—is fuelled at Hangar 7 to extract Zuko, Ma-Sibi, and Mokoena to Dubai."',
        ],
        responses: [
          {
            id: 'vdm_act2_plan',
            label: '"What do we need to ground Flight ZS-900 and finish them for good?"',
            nextNodeId: 'vdm_act2_briefing',
          },
          {
            id: 'vdm_act2_dockets',
            label:
              '[DOCKETS >= 2] "Let\'s file an emergency counter-affidavit right now to quash the Contempt Warrant and subpoena the Ridge escrow records."',
            nextNodeId: 'vdm_dockets_motion',
            requiredStat: { stat: 'dockets', min: 2 },
            rewardId: 'reward_n10_vdm_motion',
            rewardSummary:
              '+1 Trace Sovereign Pearl Trust Clock, -1 Contempt Warrant, +10% Composure',
            effect: {
              clockProgress: [
                { clockId: 'trace_offshore_trust', delta: 1 },
                { clockId: 'commission_subpoena', delta: -1 },
              ],
              composureDelta: 10,
              narrativeLog:
                'Judge Khumalo signs your emergency counter-motion in chambers (+1 Trace Sovereign Pearl Trust, -1 Contempt Warrant, +10% Composure).',
            },
          },
          {
            id: 'vdm_act2_exit',
            label: '"Keep the Commission in session, Colonel. I\'m going hunting."',
            nextNodeId: 'EXIT',
          },
        ],
      },
      vdm_act2_briefing: {
        id: 'vdm_act2_briefing',
        speakerMood: 'Lowering his voice as two defense advocates walk past.',
        paragraphs: [
          '"Two supreme exhibits: First, the Sovereign Pearl Offshore Trust Deed from the Ridge Penthouses proving all three of them co-own the syndicate. Second, the Midlands Super-Lab Batch Telemetry from the northern water tankers."',
          '"Unlock either breakthrough to reveal the Citrus Estate and King Shaka Hangar 7—or secure both if you want to put every last one of them in chains on the tarmac."',
        ],
        responses: [
          {
            id: 'vdm_briefing_back',
            label: '"Understood, Colonel."',
            nextNodeId: 'root',
          },
        ],
      },
      vdm_dockets_motion: {
        id: 'vdm_dockets_motion',
        speakerMood: 'Stamping the affidavit with the red DPCI seal.',
        paragraphs: [
          '"Brilliant statutory citation, Sbu. That ties the hands of Ma-Sibi\'s compromised prosecutors for another forty-eight hours and forces the Ridge corporate secretary to open the DIFC ledger."',
        ],
        responses: [
          {
            id: 'vdm_motion_back',
            label: '"Let\'s press the advantage."',
            nextNodeId: 'root',
          },
        ],
      },
    },
  },

  // ---------------------------------------------------------------------------
  // N11: ZUKO "THE ARCHITECT" NDLOVU (HYDROPONIC CITRUS ESTATE)
  // ---------------------------------------------------------------------------
  n11_citrus_estate: {
    nodeId: 'n11_citrus_estate',
    contactName: 'Zuko "The Architect" Ndlovu',
    contactRole: 'Midlands Super-Lab Proprietor • Abasanta',
    avatar: '/assets/characters/zuko.jpg',
    factionId: 'abasanta',
    rootNodeId: 'root',
    nodes: {
      root: {
        id: 'root',
        speakerMood:
          'Standing amid rows of UV-lit hydroponic citrus trees and stainless-steel distillation towers in the misty Midlands hills.',
        paragraphs: [
          '"You followed the water tankers all the way up the escarpment, Sbu. Impressive. Most men stop once they reach the beachside penthouses in Umhlanga."',
          '"Look around Packhouse B. Valencia oranges on the top conveyor, ninety-nine percent pure export crystal in the false crates below, bound straight for King Shaka Cargo Apron. And you\'re standing in the middle of my harvest."',
        ],
        responses: [
          {
            id: 'zuko_act2_why',
            label: '"You\'re evacuating to Dubai on Flight ZS-900 tonight. Is the Architect running scared?"',
            nextNodeId: 'zuko_act2_manifesto',
          },
          {
            id: 'zuko_act2_present_telemetry',
            label:
              '[Present Evidence: Super-Lab Telemetry] "Every batch number and tanker route is already mirrored off-site. Call off your izinkabi hit squad and pay the transition tax."',
            nextNodeId: 'zuko_act2_truce',
            requiredItem: 'superlab_batch_telemetry',
            rewardId: 'reward_n11_zuko_truce',
            rewardSummary: '-2 Izinkabi Hit Squad Clock, +R900 Cash, +1 Abasanta Rep',
            effect: {
              clockProgress: [{ clockId: 'cartel_hit_squad', delta: -2 }],
              cashDelta: 900,
              factionRepDelta: [{ factionId: 'abasanta', delta: 1 }],
              narrativeLog:
                'Zuko calls off the Gauteng contract gunmen and transfers R900 from the Packhouse B vault (-2 Izinkabi Hit Squad, +R900 Cash, +1 Abasanta Rep).',
            },
          },
          {
            id: 'zuko_act2_exit',
            label: '"See you on the tarmac at Hangar 7, Zuko."',
            nextNodeId: 'EXIT',
          },
        ],
      },
      zuko_act2_manifesto: {
        id: 'zuko_act2_manifesto',
        speakerMood: 'Running a gloved hand over a crate stenciled for Rotterdam.',
        paragraphs: [
          '"Scared? No, Sbu—restructuring. The Commission of Inquiry needs a circus, so Ma-Sibi and Mokoena are panicking. Meanwhile, the infrastructure we built here prints twenty million Euro a month."',
          '"When you reach Hangar 7 tonight, you\'ll have a choice: arrest us for a state that will replace us by Tuesday, burn the estate with Bra Bheki\'s mob, or take the keys to the throne yourself."',
        ],
        responses: [
          {
            id: 'zuko_manifesto_back',
            label: '"We\'ll make that choice at Hangar 7."',
            nextNodeId: 'root',
          },
        ],
      },
      zuko_act2_truce: {
        id: 'zuko_act2_truce',
        speakerMood: 'Dialing a short code on his satellite handset and speaking in crisp isiZulu.',
        paragraphs: [
          '"The Gauteng shooters are standing down. You\'ve earned a seat at the table, Sbu. Take this from the packhouse safe—and think very carefully before you let Colonel van der Merwe put handcuffs on the future."',
        ],
        responses: [
          {
            id: 'zuko_truce_back',
            label: '"I\'ll see you at the airport."',
            nextNodeId: 'root',
          },
        ],
      },
    },
  },

  // ---------------------------------------------------------------------------
  // N12: BRIGADIER TITUS MOKOENA (KING SHAKA CARGO APRON — HANGAR 7)
  // ---------------------------------------------------------------------------
  n12_cargo_apron: {
    nodeId: 'n12_cargo_apron',
    contactName: 'Brigadier Titus Mokoena',
    contactRole: 'Hangar 7 Charter Escort • SAPS TRT',
    avatar: '/assets/characters/mokoena.jpg',
    factionId: 'saps_trt',
    rootNodeId: 'root',
    nodes: {
      root: {
        id: 'root',
        speakerMood:
          'Standing on the rain-lashed tarmac beside the screaming twin turbines of Gulfstream ZS-900, flanked by blue-light NYALA armoured carriers.',
        paragraphs: [
          '"End of the runway, Sbu! The Gulfstream engines are warm, diplomatic clearance is filed, and the pallet jacks are loading the last crates into the hold."',
          '"You survived the N2, you survived Pier 2, and you survived my hit squad. Speak your piece before the boarding stairs retract!"',
        ],
        responses: [
          {
            id: 'mokoena_act2_tarmac',
            label: '"If you climb those stairs, Titus, you\'re a fugitive for the rest of your life."',
            nextNodeId: 'mokoena_act2_defiance',
          },
          {
            id: 'mokoena_act2_influence',
            label:
              '[INFLUENCE >= 2] "Half your TRT sergeants aren\'t on that plane, Titus. I just told them you\'re leaving them to take the fall at the Commission."',
            nextNodeId: 'mokoena_act2_mutiny',
            requiredStat: { stat: 'influence', min: 2 },
            rewardId: 'reward_n12_mokoena_mutiny',
            rewardSummary: '-2 Izinkabi Hit Squad Clock, +15% Composure',
            effect: {
              clockProgress: [{ clockId: 'cartel_hit_squad', delta: -2 }],
              composureDelta: 15,
              narrativeLog:
                'Mokoena’s abandoned TRT sergeants lower their rifles and clear the Hangar 7 perimeter (-2 Izinkabi Hit Squad, +15% Composure).',
            },
          },
          {
            id: 'mokoena_act2_exit',
            label: '"Time to finish this on the tarmac."',
            nextNodeId: 'EXIT',
          },
        ],
      },
      mokoena_act2_defiance: {
        id: 'mokoena_act2_defiance',
        speakerMood: 'Shouting over the whine of the Gulfstream jet engines.',
        paragraphs: [
          '"Fugitive? With twenty-five percent of Sovereign Pearl Holdings in a Dubai vault, they\'ll call me an international security consultant! Either get out of the way of the nosewheel, or make your final play right here!"',
        ],
        responses: [
          {
            id: 'mokoena_defiance_back',
            label: '"Watch me."',
            nextNodeId: 'root',
          },
        ],
      },
      mokoena_act2_mutiny: {
        id: 'mokoena_act2_mutiny',
        speakerMood: 'Looking back in alarm as two TRT Nyala crews switch off their roof strobes and reverse away.',
        paragraphs: [
          '"Where are Unit 3 and Unit 5 going?! Damn you, Sbu—you turned my own sergeants against the perimeter! Every man for himself on the tarmac!"',
        ],
        responses: [
          {
            id: 'mokoena_mutiny_back',
            label: '"The tarmac is open. Let\'s end this."',
            nextNodeId: 'root',
          },
        ],
      },
    },
  },
};

export const ALL_CONTACT_DIALOGUES: Record<string, ContactDialogueTree> = {
  ...CONTACT_DIALOGUES,
  ...HIGHVELD_CONTACT_DIALOGUES,
  ...NAMAQUA_CONTACT_DIALOGUES,
  ...CAPE_CONTACT_DIALOGUES,
  ...OCTAGON_CONTACT_DIALOGUES,
};
