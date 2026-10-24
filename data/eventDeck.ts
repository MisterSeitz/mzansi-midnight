import { NarrativeEvent } from '../types/events';

export const EVENT_DECK: Record<string, NarrativeEvent> = {
  // 1. THREAT CLOCK FULL: Brigadier Mokoena's Sweep (6/6)
  evt_trt_safehouse_raid: {
    id: 'evt_trt_safehouse_raid',
    title: 'Blue Lights in the Alley',
    category: 'threat_crisis',
    locationLabel: 'Mercury Arcade Flat • 03:15 AM',
    speakerName: 'Sergeant Dlamini',
    speakerRole: 'SAPS Tactical Response Team (Mokoena Unit)',
    bodyText: [
      'Heavy combat boots thunder up the concrete stairwell of the Mercury Arcade. Through the slatted blinds, three unmarked Volkswagen Golf GTIs and a Nyala armoured carrier block both ends of the street.',
      'A rifle butt hammers your steel security gate. "Hawks Warrant Officer! Open the gate or we blow the hinges! Brigadier Mokoena wants his docket back!"',
    ],
    choices: [
      {
        id: 'choice_roof_escape',
        label: 'Slip Across the Arcade Tin Roofs',
        description: 'Grab Nandi and the docket, climb through the skylight, and drop into the taxi rank alley.',
        requiredStat: { stat: 'street', min: 1 },
        effect: {
          composureDelta: -10,
          resetClockId: 'mokoena_sweep',
          narrativeLog: 'You scramble across rusted corrugated iron in the rain. TRT breaches an empty flat.',
        },
      },
      {
        id: 'choice_pay_dlamini',
        label: 'Pass a Brown Envelope Through the Bars (R1,200)',
        description: 'Sergeant Dlamini has gambling debts at Greyville. Pay him to report that the flat was vacant.',
        requiredCash: 1200,
        effect: {
          resetClockId: 'mokoena_sweep',
          clockProgress: [{ clockId: 'precinct_heat', delta: -2 }],
          narrativeLog: 'Dlamini weighs the cash, barks into his radio that the tip was cold, and pulls his squad back.',
        },
      },
      {
        id: 'choice_burn_decoy',
        label: 'Surrender Decoy Pages & Take a Beating',
        description: 'Hide the genuine ledger pages under the floorboards and take the TRT shakedown.',
        effect: {
          composureDelta: -30,
          resetClockId: 'mokoena_sweep',
          narrativeLog: 'Dlamini leaves you bruised on the linoleum floor, taking fake annexures back to Central Precinct.',
        },
      },
    ],
  },

  // 2. THREAT CLOCK FULL: Nandi's Gunshot Wound (4/4)
  evt_nandi_critical: {
    id: 'evt_nandi_critical',
    title: 'Septic Shock',
    category: 'threat_crisis',
    locationLabel: 'Mercury Arcade Flat • Safehouse Bedroom',
    speakerName: 'Constable Nandi',
    speakerRole: 'Wounded Whistleblower',
    bodyText: [
      'Nandi is shivering violently under a sweat-soaked blanket. The grazing bullet wound along her ribs has turned an angry, dark purple, and she is slipping in and out of consciousness.',
      'If you take her to Addington or Inkosi Albert Luthuli Hospital, the gunshot register will alert Brigadier Mokoena within twenty minutes.',
    ],
    choices: [
      {
        id: 'choice_emergency_maharaj',
        label: 'Pay Dr. Maharaj for Emergency Surgery (R1,500)',
        description: 'Call the off-the-books surgeon with a portable cauterizer and IV antibiotics.',
        requiredCash: 1500,
        effect: {
          removeClockId: 'nandi_condition',
          composureDelta: 10,
          narrativeLog: 'Dr. Maharaj extracts the brass jacket fragments and stabilizes Nandi before dawn.',
        },
      },
      {
        id: 'choice_hawks_extraction',
        label: 'Call Colonel van der Merwe for Safe-House Medics',
        description: 'Requires Hawks trust. Hand Nandi over to the Old Archive task force for covert medical care.',
        requiredFactionRep: { factionId: 'hawks', min: 1 },
        effect: {
          removeClockId: 'nandi_condition',
          factionRepDelta: [{ factionId: 'hawks', delta: 1 }],
          clockProgress: [{ clockId: 'precinct_heat', delta: 1 }],
          narrativeLog: 'Van der Merwe smuggles Nandi out in a laundry van to a rural safe clinic.',
        },
      },
      {
        id: 'choice_public_hospital',
        label: 'Dump Her at the State Trauma Ward & Run',
        description: 'Saves her life for free, but Mokoena immediately locks onto your trail.',
        effect: {
          removeClockId: 'nandi_condition',
          composureDelta: -25,
          clockProgress: [
            { clockId: 'mokoena_sweep', delta: 3 },
            { clockId: 'precinct_heat', delta: 2 },
          ],
          narrativeLog: 'Doctors stabilize Nandi, but TRT detectives surround the trauma ward within the hour.',
        },
      },
    ],
  },

  // 3. THREAT CLOCK FULL: Precinct Heat (6/6)
  evt_shanela_roadblock: {
    id: 'evt_shanela_roadblock',
    title: 'Operation Shanela Lockdown',
    category: 'threat_crisis',
    locationLabel: 'Queen Street & Umgeni Interchange',
    speakerName: 'Metro Police Dispatch',
    speakerRole: 'Joint SAPS / Metro Roadblock',
    bodyText: [
      'Sirens echo between the high-rises. Floodlights and orange cones seal off the main CBD intersections as SAPS and Metro Police mount a high-density stop-and-search cordon.',
      'Every minibus, courier bike, and pedestrian is being searched for unlicensed firearms and stolen dockets.',
    ],
    choices: [
      {
        id: 'choice_taxi_smuggle',
        label: 'Ride in Bra Bheki’s VIP Kombi Convoy',
        description: 'Use your Street Syndicate standing to slip past the cordon in an untouchable association vehicle.',
        requiredFactionRep: { factionId: 'street_syndicate', min: 1 },
        effect: {
          resetClockId: 'precinct_heat',
          narrativeLog: 'The Metro cops wave Bra Bheki’s tinted Quantum straight through without checking IDs.',
        },
      },
      {
        id: 'choice_spot_fine',
        label: 'Pay "Cold Drink" Money at the Cordon (R600)',
        description: 'Fold three R200 notes inside your driver’s license and keep your head down.',
        requiredCash: 600,
        effect: {
          resetClockId: 'precinct_heat',
          narrativeLog: 'The officer pockets the notes, taps your roof, and waves you through the cones.',
        },
      },
      {
        id: 'choice_drainage_tunnels',
        label: 'Wait it Out in the Stormwater Culverts',
        description: 'Spend hours wading through ankle-deep runoff beneath the N2 until the roadblock packs up.',
        effect: {
          composureDelta: -20,
          resetClockId: 'precinct_heat',
          narrativeLog: 'You emerge soaked and exhausted at dawn, but your trail is cold.',
        },
      },
    ],
  },

  // 4. INVESTIGATION COMPLETE: Audit Docket #409 (4/4)
  evt_docket_decoded: {
    id: 'evt_docket_decoded',
    title: 'The Water-Tanker Pipeline',
    category: 'investigation_breakthrough',
    locationLabel: 'Mercury Arcade Flat • Evidence Board',
    bodyText: [
      'You lay the bloodstained pages of Docket #409 across your table under the inverter lamp. The numbers finally click into place.',
      '"Zululand Aqua-Logistics" billed City Hall R400 million to deliver emergency water to dry northern townships. Except the GPS logs show those municipal tankers never went to the townships—they drove straight from Pier 2 Cold Storage to industrial warehouses outside town, escorted by Brigadier Mokoena’s TRT vans.',
      'Councillor Ma-Sibi isn’t just stealing water money. Her municipal tankers are transporting liquid chemical precursors for Zuko Ndlovu’s methamphetamine super-labs.',
    ],
    choices: [
      {
        id: 'choice_unlock_leads',
        label: 'Pin City Hall and Pier 2 to the Map',
        description: 'Unlocks City Hall Annex (N4) and Pier 2 Cold Storage (N6) for direct investigation or blackmail.',
        effect: {
          removeClockId: 'audit_docket_409',
          addInventoryItem: 'decoded_tanker_ledger',
          unlockNodeIds: ['n4_city_hall', 'n6_pier2_port'],
          composureDelta: 10,
          narrativeLog: 'Breakthrough: City Hall Annex and Pier 2 Cold Storage are now unlocked on your district map.',
        },
      },
    ],
  },

  // 5. INVESTIGATION COMPLETE: Crack Auditor's Handset (4/4)
  evt_phone_decrypted: {
    id: 'evt_phone_decrypted',
    title: 'Voice Note from Berth 14',
    category: 'investigation_breakthrough',
    locationLabel: 'Golden Dragon Cyber-Pawn • Back Booth',
    speakerName: 'Sparks',
    speakerRole: 'Signals & Encryption Fixer',
    bodyText: [
      'Sparks exhales a cloud of vape smoke as the dead auditor’s phone finally bypasses its biometric lock. Inside a hidden vault folder sits an encrypted audio recording and a shipping manifest for tonight.',
      'On the recording, Brigadier Mokoena’s gravel voice is unmistakable: "Clear the N2 weighbridge at midnight. Zuko’s container drops at Berth 14, and anyone from the Hawks who sniffs around gets buried in a mine shaft."',
    ],
    choices: [
      {
        id: 'choice_take_manifest',
        label: 'Download the Berth 14 Manifest & Hawks Contact',
        description: 'Unlocks The Old Archive Basement (N7) and gives you hard leverage over Mokoena and Zuko.',
        effect: {
          removeClockId: 'crack_auditor_phone',
          addInventoryItem: 'berth_14_manifest',
          unlockNodeIds: ['n6_pier2_port', 'n7_archive_basement'],
          composureDelta: 10,
          narrativeLog: 'You pocket the cloned drive. Colonel van der Merwe’s basement archive is now accessible.',
        },
      },
    ],
  },

  // 6. ACT 1 CLIMAX SHOWDOWN: MIDNIGHT AT BERTH 14
  evt_climax_berth14: {
    id: 'evt_climax_berth14',
    title: 'Midnight at Berth 14: The Final Play',
    category: 'investigation_breakthrough',
    locationLabel: 'Pier 2 Container Terminal • 11:55 PM',
    speakerName: ' Port Control & Tactical Dispatch',
    speakerRole: 'Act 1 Finale Decision',
    bodyText: [
      'Rain sheets sideways across the Natal Port Channel as the giant gantry cranes of Pier 2 loom out of the mist. Below Berth 14, three municipal water tankers idly wait beside Zuko Ndlovu’s refrigerated shipping containers, flanked by Brigadier Mokoena’s blue-light TRT Nyalas.',
      'Your time is up. Whether you arrived here with decoded treasury ledgers, the auditor’s encrypted voice notes, or sheer street muscle, you only have one shot to play your hand before the convoy rolls out onto the N2 highway.',
    ],
    choices: [
      {
        id: 'climax_choice_vigilante',
        label: '[VIGILANTE PATH] Signal Bra Bheki’s Izinkabi & Torch the Convoy',
        description:
          'Spark an all-out harbour turf war between the Queen Street Syndicate and Mokoena’s TRT squads, burn the chemical tankers, and hijack R450,000 in cartel bearer cash.',
        requiredAnyItem: ['decoded_tanker_ledger', 'berth_14_manifest'],
        effect: {
          cashDelta: 450000,
          factionRepDelta: [
            { factionId: 'street_syndicate', delta: 3 },
            { factionId: 'abasanta', delta: -3 },
            { factionId: 'saps_trt', delta: -3 },
          ],
          triggerEndingId: 'ending_vigilante',
          narrativeLog:
            'Tracer rounds ignite the Pier 2 precursor drums as you breach the command van and vanish into the blackout with the cartel’s bearer cash.',
        },
      },
      {
        id: 'climax_choice_whistleblower',
        label: '[WHISTLEBLOWER PATH] Broadcast the Dossier to The Daily Veld & Hawks',
        description:
          'Transmit the audited water-tanker ledger and Mokoena’s audio recording nationwide while Colonel van der Merwe extracts Constable Nandi into witness protection.',
        requiredAnyItem: ['decoded_tanker_ledger', 'berth_14_manifest'],
        effect: {
          factionRepDelta: [
            { factionId: 'hawks', delta: 3 },
            { factionId: 'city_hall', delta: -3 },
            { factionId: 'saps_trt', delta: -3 },
          ],
          triggerEndingId: 'ending_whistleblower',
          narrativeLog:
            'By 06:00 AM, Brigadier Mokoena’s voice note is playing on every radio station in South Africa and Treasury freezes Ma-Sibi’s R400m tender.',
        },
      },
      {
        id: 'climax_choice_kingpin',
        label: '[KINGPIN PATH] Ascend to The Glass House & Demand 20% of the Pipeline',
        description:
          'Meet Zuko Ndlovu, Ma-Sibi’s Chief of Staff, and Brigadier Mokoena atop the grain silos. Burn Docket #409 yourself in exchange for reinstatement and a syndicate partnership.',
        requiredAnyItem: ['decoded_tanker_ledger', 'berth_14_manifest'],
        effect: {
          cashDelta: 80000,
          factionRepDelta: [
            { factionId: 'abasanta', delta: 3 },
            { factionId: 'city_hall', delta: 3 },
            { factionId: 'saps_trt', delta: 2 },
            { factionId: 'hawks', delta: -3 },
          ],
          triggerEndingId: 'ending_kingpin',
          narrativeLog:
            'You drop Docket #409 into the brazier atop The Glass House. Your suspension is wiped, and your first R80,000 tanker retainer clears before dawn.',
        },
      },
      {
        id: 'climax_choice_captured',
        label: '[NO LEVERAGE] Caught in the Pier 2 Perimeter Dragnet',
        description:
          'Without the decoded ledger or the decrypted Berth 14 manifest, Mokoena’s TRT spotters box you in before you can reach the quay.',
        effect: {
          triggerEndingId: 'ending_captured',
          narrativeLog:
            'Four unmarked TRT Golf GTIs cut off your escape in the rain. Docket #409 is seized before sunrise.',
        },
      },
    ],
  },

  // 7. ZERO-COMPOSURE BREAKDOWN CRISIS (0% COMPOSURE)
  evt_composure_breakdown: {
    id: 'evt_composure_breakdown',
    title: 'Blackout Paranoia: Nervous Collapse',
    category: 'threat_crisis',
    locationLabel: 'Mercury Arcade Stairwell • Exhaustion Threshold',
    speakerName: 'Internal Monologue',
    speakerRole: '0% Composure Breakdown',
    bodyText: [
      'Your hands won’t stop shaking. Between the diesel generator fumes, the wail of sirens down Queen Street, and six months of watching your own back, your vision tunnels into static.',
      'You slump against the damp concrete stairwell of the Mercury Arcade, struggling to catch your breath. If you don’t steady your nerves right now, you’re going to make a fatal mistake.',
    ],
    choices: [
      {
        id: 'choice_breakdown_stimulants',
        label: 'Score Black-Market Amphetamines at the Arcade Kiosk (R500)',
        description:
          'Forces your focus back online immediately (+45% Composure), though the dealer talks (+1 Precinct Heat).',
        requiredCash: 500,
        effect: {
          composureDelta: 45,
          clockProgress: [{ clockId: 'precinct_heat', delta: 1 }],
          narrativeLog:
            'Bitter chemical tablets shock your nervous system back into focus (+45% Composure, +1 Precinct Heat).',
        },
      },
      {
        id: 'choice_breakdown_hawks_medic',
        label: 'Call Colonel van der Merwe’s Field Medic (Hawks Rep >= 1)',
        description:
          'Use your Hawks holdout trust for a clean adrenaline shot and counter-surveillance watch (+50% Composure).',
        requiredFactionRep: { factionId: 'hawks', min: 1 },
        effect: {
          composureDelta: 50,
          clockProgress: [{ clockId: 'mokoena_sweep', delta: -1 }],
          narrativeLog:
            'A retired Hawks paramedic patches you up in the back of an unmarked van (+50% Composure, -1 Sweep).',
        },
      },
      {
        id: 'choice_breakdown_passout',
        label: 'Pass Out on the Safehouse Floor Until the Shaking Stops',
        description:
          'Recovers +35% Composure for free, but you lose precious hours while Mokoena’s net tightens (+1 Sweep, +1 Nandi’s Wound).',
        effect: {
          composureDelta: 35,
          clockProgress: [
            { clockId: 'mokoena_sweep', delta: 1 },
            { clockId: 'nandi_condition', delta: 1 },
          ],
          narrativeLog:
            'You wake up hours later on the cold linoleum floor (+35% Composure, but Threat Clocks advance).',
        },
      },
    ],
  },

  // 8. DAY 2 MORNING ENCRYPTED WIRE BRIEFING
  evt_morning_masibi_wire: {
    id: 'evt_morning_masibi_wire',
    title: 'Encrypted Wire: The 4th-Floor Olive Branch',
    category: 'world_event',
    locationLabel: 'Burner Phone Intercept • Cycle 2 Dawn',
    speakerName: "Councillor Ma-Sibi's Chief of Staff",
    speakerRole: 'Metro Renewal Coalition (City Hall)',
    bodyText: [
      'As the morning taxis begin honking along Queen Street, your burner handset vibrates with an unindexed Signal message from City Hall’s 4th Floor.',
      '"Warrant Officer. We know Constable Nandi brought you Mandla Sithole’s paperwork. Nobody at City Hall wants another funeral. Slow down your audit today, and an R800 municipal consulting retainer will be dropped in your mailbox within the hour."',
    ],
    choices: [
      {
        id: 'choice_masibi_accept_retainer',
        label: 'Accept the R800 "Consulting Retainer" & Play Along',
        description:
          'Pocket R800 and gain +1 City Hall Rep, but costs -10% Composure as you stomach the corruption.',
        effect: {
          cashDelta: 800,
          composureDelta: -10,
          factionRepDelta: [{ factionId: 'city_hall', delta: 1 }],
          narrativeLog:
            'A courier drops a brown municipal envelope with R800 cash at your arcade postbox (+R800, +1 City Hall Rep).',
        },
      },
      {
        id: 'choice_masibi_trace_packet',
        label: 'Back-Trace the Burner Message Header (WIRE >= 1)',
        description:
          'Use your signals skill to strip the metadata from the Chief of Staff’s message (+1 Crack Auditor’s Handset).',
        requiredStat: { stat: 'wire', min: 1 },
        effect: {
          clockProgress: [{ clockId: 'crack_auditor_phone', delta: 1 }],
          composureDelta: 5,
          narrativeLog:
            'You capture the municipal server certificate from the message header (+1 Crack Auditor’s Handset).',
        },
      },
      {
        id: 'choice_masibi_burn_sim',
        label: 'Snap the Burner SIM in Half & Keep Digging',
        description:
          'Refuse to be bought (+10% Composure, +1 Hawks Rep, -1 City Hall Rep).',
        effect: {
          composureDelta: 10,
          factionRepDelta: [
            { factionId: 'hawks', delta: 1 },
            { factionId: 'city_hall', delta: -1 },
          ],
          narrativeLog:
            'You snap the SIM card in half and toss it into the rain gutter (+10% Composure, +1 Hawks Rep).',
        },
      },
    ],
  },

  // 9. DAY 3 MORNING STREET ENCOUNTER
  evt_morning_cable_theft: {
    id: 'evt_morning_cable_theft',
    title: 'Morning Dispatch: Umgeni Feeder Cable Stripped',
    category: 'world_event',
    locationLabel: 'West Street & Umgeni Corridor • Cycle 3 Dawn',
    speakerName: 'Bra Bheki Sithole',
    speakerRole: 'Queen Street Taxi Alliance',
    bodyText: [
      'Thick black smoke rises from the Umgeni substation at dawn. A copper-theft syndicate stripped three high-voltage feeder cables overnight, throwing the CBD traffic lights into chaos.',
      'Bra Bheki’s route marshals have taken over the intersections with whistles and sjamboks, while SAPS patrol vans are stuck gridlocked two blocks away.',
    ],
    choices: [
      {
        id: 'choice_cable_help_bheki',
        label: 'Help Bra Bheki’s Marshals Reroute the Morning Rank',
        description:
          'Earn R500 cut from the rank marshals and +1 Street Syndicate standing.',
        effect: {
          cashDelta: 500,
          factionRepDelta: [{ factionId: 'street_syndicate', delta: 1 }],
          narrativeLog:
            'You clear the delivery lane for Bra Bheki’s Quantums and pocket R500 (+R500, +1 Street Syndicate Rep).',
        },
      },
      {
        id: 'choice_cable_scrub_cctv',
        label: 'Exploit the Grid Surge to Scrub Precinct ANPR Cameras',
        description:
          'Use the substation voltage drop to wipe license-plate hits (-2 Precinct Heat).',
        effect: {
          clockProgress: [{ clockId: 'precinct_heat', delta: -2 }],
          narrativeLog:
            'The substation surge corrupts Central Precinct’s last 24 hours of street camera logs (-2 Precinct Heat).',
        },
      },
    ],
  },

  // 10. DAY 4 MORNING FINAL COUNTDOWN ALERT
  evt_morning_port_tipoff: {
    id: 'evt_morning_port_tipoff',
    title: 'Urgent Wire: MV Southern Cross Docking at Berth 14',
    category: 'world_event',
    locationLabel: 'Natal Port Channel • Cycle 4 Dawn',
    speakerName: 'Colonel Piet van der Merwe',
    speakerRole: 'DPCI Hawks Holdout',
    bodyText: [
      'A horn blasts across the harbour mist as the container ship MV Southern Cross clears the breakwater. Your encrypted radio crackles with Colonel van der Merwe’s voice.',
      '"Listen carefully. Zuko Ndlovu’s chemical drums are being offloaded at Berth 14 tonight, and Mokoena’s TRT vans are already staging at the weighbridge. Make sure you hold either the Decoded Tanker Ledger or the Berth 14 Manifest before midnight strikes."',
    ],
    choices: [
      {
        id: 'choice_port_lock_and_load',
        label: 'Check Your Evidence Dossier & Prepare for Tonight',
        description:
          'Steels your nerves for the final cycle (+15% Composure).',
        effect: {
          composureDelta: 15,
          narrativeLog:
            'The MV Southern Cross is in port. Tonight is the final countdown for Berth 14 (+15% Composure).',
        },
      },
    ],
  },

  // ===========================================================================
  // ACT 2 EVENT DECK ("THE COMMISSION OF INQUIRY")
  // ===========================================================================

  // 11. ACT 2 THREAT CRISIS: IZINKABI HIT SQUAD AMBUSH
  evt_act2_izinkabi_ambush: {
    id: 'evt_act2_izinkabi_ambush',
    title: 'Crossfire on the M4 Flyover',
    category: 'threat_crisis',
    locationLabel: 'Umhlanga M4 Highway Overpass • Midnight',
    speakerName: 'Out-of-Province Izinkabi',
    speakerRole: 'Contract Hit Squad',
    bodyText: [
      'Two unlicensed white double-cab bakkies box your sedan against the concrete barrier of the M4 coastal flyover. Muzzle flashes light up the rain as automatic rifle fire spiders across your windscreen.',
      'Zuko and Brigadier Mokoena have activated their out-of-province contract killers to make sure you never reach the High Court witness stand.',
    ],
    choices: [
      {
        id: 'choice_act2_ambush_ram',
        label: 'Ram the Lead Bakkie & Return Fire (STREET >= 2)',
        description:
          'Smash through the roadblock with tactical precision (-2 Hit Squad, -10% Composure).',
        requiredStat: { stat: 'street', min: 2 },
        effect: {
          composureDelta: -10,
          resetClockId: 'cartel_hit_squad',
          narrativeLog:
            'You pit-maneuver the lead bakkie into the guardrail and vanish into the northern township lanes (Hit Squad clock reset).',
        },
      },
      {
        id: 'choice_act2_ambush_payoff',
        label: 'Wire R900 via Bra Bheki’s Rank Marshals to Call Off the Contract',
        description:
          'Use syndicate back-channels and R900 cash to buy off the gunmen.',
        requiredCash: 900,
        effect: {
          resetClockId: 'cartel_hit_squad',
          factionRepDelta: [{ factionId: 'street_syndicate', delta: 1 }],
          narrativeLog:
            'A single phone call from Queen Street pulls the gunmen off your tail (-R900, Hit Squad clock reset).',
        },
      },
      {
        id: 'choice_act2_ambush_ditch',
        label: 'Bail Out Into the Stormwater Ravine',
        description:
          'Survive with heavy bruising (-30% Composure, +1 Contempt Warrant), but escape the kill-zone.',
        effect: {
          composureDelta: -30,
          resetClockId: 'cartel_hit_squad',
          clockProgress: [{ clockId: 'commission_subpoena', delta: 1 }],
          narrativeLog:
            'Your car is riddled with bullets as you roll down the flooded embankment (-30% Composure, Hit Squad reset).',
        },
      },
    ],
  },

  // 12. ACT 2 THREAT CRISIS: COMMISSION CONTEMPT WARRANT
  evt_act2_contempt_arrest: {
    id: 'evt_act2_contempt_arrest',
    title: 'State Security Contempt Warrant',
    category: 'threat_crisis',
    locationLabel: 'High Court Precinct Steps',
    speakerName: 'Advocate Vermeulen',
    speakerRole: 'Compromised Inquiry Prosecutor',
    bodyText: [
      'Armed sheriffs and State Security agents surround you on the marble steps of the High Court, waving a sealed detention order signed under the Protection of State Information Act.',
      '"You are hereby placed under preventive custody for unlawful possession of classified municipal infrastructure records."',
    ],
    choices: [
      {
        id: 'choice_act2_contempt_quash',
        label: 'Cite Section 205 Whistleblower Immunity (DOCKETS >= 2)',
        description:
          'Destroy the defective warrant in open court (+1 Hawks Rep, resets Contempt Warrant).',
        requiredStat: { stat: 'dockets', min: 2 },
        effect: {
          resetClockId: 'commission_subpoena',
          composureDelta: 10,
          factionRepDelta: [{ factionId: 'hawks', delta: 1 }],
          narrativeLog:
            'Judge Khumalo quashes the arrest warrant from the bench as television cameras roll (Contempt Warrant reset).',
        },
      },
      {
        id: 'choice_act2_contempt_bail',
        label: 'Post R800 Emergency Senior Counsel Bail',
        description:
          'Pay R800 legal retainer to stay out of the holding cells.',
        requiredCash: 800,
        effect: {
          resetClockId: 'commission_subpoena',
          composureDelta: -5,
          narrativeLog:
            'Your emergency counsel secures an interim interdict keeping you on the street (-R800, Contempt Warrant reset).',
        },
      },
      {
        id: 'choice_act2_contempt_flee',
        label: 'Slip Out Through the Magistrates’ Basement Tunnel',
        description:
          'Avoid detention but lose -25% Composure and +1 Hit Squad heat.',
        effect: {
          resetClockId: 'commission_subpoena',
          composureDelta: -25,
          clockProgress: [{ clockId: 'cartel_hit_squad', delta: 1 }],
          narrativeLog:
            'You bolt through the subterranean archive tunnel before the handcuffs click (-25% Composure, +1 Hit Squad).',
        },
      },
    ],
  },

  // 13. ACT 2 BREAKTHROUGH: SOVEREIGN PEARL OFFSHORE TRUST UNMASKED
  evt_act2_trust_unmasked: {
    id: 'evt_act2_trust_unmasked',
    title: 'Breakthrough: The Sovereign Pearl Trust Deed',
    category: 'investigation_breakthrough',
    locationLabel: 'High Court Evidence Vault • Encrypted Uplink',
    speakerName: 'Colonel Piet van der Merwe',
    speakerRole: 'DPCI Hawks Evidence Leader',
    bodyText: [
      'The printer in Colonel van der Merwe’s locked chamber hums to life, spitting out the unredacted DIFC Dubai beneficial-ownership register for Sovereign Pearl Holdings.',
      'There it is in black and white: Zuko Ndlovu (45%), Councillor Ma-Sibi (30%), and Brigadier Titus Mokoena (25%)—alongside a paid charter escrow for a Gulfstream G550 (Flight ZS-900) waiting at King Shaka Hangar 7 and property deeds to Lot 44 in the Midlands.',
    ],
    choices: [
      {
        id: 'choice_act2_claim_trust_deed',
        label: 'Certify the Sovereign Pearl Trust Deed & Unlock Inland Leads',
        description:
          'Adds Sovereign Pearl Offshore Trust Deed to your inventory and unlocks Hydroponic Citrus Estate (N11) & King Shaka Cargo Apron (N12).',
        effect: {
          addInventoryItem: 'offshore_trust_deed',
          unlockNodeIds: ['n11_citrus_estate', 'n12_cargo_apron'],
          composureDelta: 15,
          narrativeLog:
            'Secured Sovereign Pearl Offshore Trust Deed! Unlocked Midlands Citrus Estate (N11) & King Shaka Cargo Apron (N12).',
        },
      },
    ],
  },

  // 14. ACT 2 BREAKTHROUGH: SUPER-LAB BATCH TELEMETRY
  evt_act2_lab_telemetry: {
    id: 'evt_act2_lab_telemetry',
    title: 'Breakthrough: Midlands Packhouse Telemetry',
    category: 'investigation_breakthrough',
    locationLabel: 'Northern Township Depot • Telemetry Bench',
    speakerName: 'Bra Bheki Sithole',
    speakerRole: 'Queen Street Taxi Alliance',
    bodyText: [
      'Sparks’ decoded GPS plot overlays cleanly onto the provincial agricultural map. Every municipal water tanker billed to the dry northern townships actually diverted up the N3 highway to Lot 44: the Hydroponic Citrus Estate.',
      'Even better, the cargo manifests show 1.8 metric tons of finished crystal product loaded into export citrus pallets bound for Hangar 7 at King Shaka International Airport tonight.',
    ],
    choices: [
      {
        id: 'choice_act2_claim_telemetry',
        label: 'Log Midlands Batch Telemetry & Unlock Inland Targets',
        description:
          'Adds Midlands Super-Lab Batch Telemetry to your inventory and unlocks Hydroponic Citrus Estate (N11) & King Shaka Cargo Apron (N12).',
        effect: {
          addInventoryItem: 'superlab_batch_telemetry',
          unlockNodeIds: ['n11_citrus_estate', 'n12_cargo_apron'],
          composureDelta: 15,
          narrativeLog:
            'Secured Midlands Super-Lab Batch Telemetry! Unlocked Midlands Citrus Estate (N11) & King Shaka Cargo Apron (N12).',
        },
      },
    ],
  },

  // 15. ACT 2 MORNING WIRE 1
  evt_act2_morning_commission_leak: {
    id: 'evt_act2_morning_commission_leak',
    title: 'Morning Dispatch: Panic on Umhlanga Ridge',
    category: 'world_event',
    locationLabel: 'High Court Press Gallery • Dawn',
    speakerName: 'Constable Nandi',
    speakerRole: 'Protected State Witness',
    bodyText: [
      'Morning newspapers across KwaZulu-Natal carry banner headlines from the Commission of Inquiry. On Umhlanga Ridge, paper shredders are working overtime as shell-company directors scramble to book flights out of King Shaka.',
    ],
    choices: [
      {
        id: 'choice_act2_morning_press_pack',
        label: 'Brief the Court Press Gallery (+1 Trace Trust, +1 Contempt)',
        description:
          'Keep the public spotlight burning on Sovereign Pearl Holdings.',
        effect: {
          clockProgress: [
            { clockId: 'trace_offshore_trust', delta: 1 },
            { clockId: 'commission_subpoena', delta: 1 },
          ],
          narrativeLog:
            'Your anonymous press packet forces the bank’s directors onto the back foot (+1 Trace Trust).',
        },
      },
      {
        id: 'choice_act2_morning_lay_low',
        label: 'Rotate Safehouse Vehicles & Keep Nandi Hidden',
        description:
          'Throw Zuko’s spotters off your trail (-1 Hit Squad, +10% Composure).',
        effect: {
          clockProgress: [{ clockId: 'cartel_hit_squad', delta: -1 }],
          composureDelta: 10,
          narrativeLog:
            'You swap plates in the basement garage, leaving the hit squad circling an empty hotel (-1 Hit Squad, +10% Composure).',
        },
      },
    ],
  },

  // 16. ACT 2 GRAND FINALE CLIMAX: WHEELS UP AT HANGAR 7
  evt_act2_climax_tarmac: {
    id: 'evt_act2_climax_tarmac',
    title: 'Wheels Up at Hangar 7: The Final Reckoning',
    category: 'world_event',
    locationLabel: 'King Shaka Cargo Apron (Hangar 7) • 23:55 SAST',
    speakerName: 'Zuko Ndlovu, Cllr. Ma-Sibi & Brig. Mokoena',
    speakerRole: 'The Sovereign Pearl Triumvirate',
    bodyText: [
      'Sheets of warm coastal rain lash the floodlit concrete of Hangar 7. The twin Rolls-Royce turbines of Gulfstream ZS-900 scream at idle as forklift crews load the final pallets of bearer bonds and diplomatic pouches into the hold.',
      'At the foot of the airstairs stand all three architects of eThekwini-Gold’s capture: Zuko Ndlovu in his spotless trench coat, Councillor Ma-Sibi clutching her diplomatic passport, and Brigadier Mokoena with his service rifle aimed across the wet tarmac.',
      '"Five minutes to wheels-up, Warrant Officer," Zuko calls over the jet wash. "Decide what kind of country you’re waking up in tomorrow."',
    ],
    choices: [
      {
        id: 'choice_act2_ending_reckoning',
        label:
          '[CONSTITUTIONAL RECKONING] Execute the High Court Arrest Warrants & Ground ZS-900',
        description:
          'Requires Sovereign Pearl Trust Deed or Super-Lab Telemetry. Lead Col. van der Merwe’s Hawks unit onto the tarmac and arrest all three on live national television.',
        requiredAnyItem: ['offshore_trust_deed', 'superlab_batch_telemetry'],
        effect: {
          triggerEndingId: 'ending_act2_reckoning',
          narrativeLog:
            'Hawks armoured vehicles lock the runway as you serve the High Court indictment at gunpoint.',
        },
      },
      {
        id: 'choice_act2_ending_revolution',
        label:
          "[DRY-TAP UPRISING] Seize the Tanker Fleet & Hand the Midlands Millions to the Townships",
        description:
          'Requires Sovereign Pearl Trust Deed or Super-Lab Telemetry. Let Bra Bheki’s strike marshals storm Hangar 7, expropriate the syndicate’s R400m escrow, and turn the water valves back on.',
        requiredAnyItem: ['offshore_trust_deed', 'superlab_batch_telemetry'],
        effect: {
          triggerEndingId: 'ending_act2_revolution',
          narrativeLog:
            'Hundreds of minibus taxis and municipal tankers breach the perimeter fence, seizing the cartel’s fortune for the dry wards.',
        },
      },
      {
        id: 'choice_act2_ending_syndicate_state',
        label:
          '[THE GHOST SOVEREIGN] Wave Flight ZS-900 Through in Exchange for the Master Trust Keys',
        description:
          'Requires Sovereign Pearl Trust Deed or Super-Lab Telemetry. Let the politicians flee to Dubai while you inherit sole command of the province’s shadow logistics empire.',
        requiredAnyItem: ['offshore_trust_deed', 'superlab_batch_telemetry'],
        effect: {
          triggerEndingId: 'ending_act2_syndicate_state',
          narrativeLog:
            'Zuko tosses you the master cryptographic key from the airstairs as ZS-900 hurtles down the runway into the storm.',
        },
      },
      {
        id: 'choice_act2_ending_vanished',
        label: '[UNARMED ON THE APRON] Confront the Triumvirate Without Certified Proof',
        description:
          'If you arrived at Hangar 7 without the Trust Deed or Super-Lab Telemetry, Mokoena’s bodyguards close the hangar doors behind you.',
        effect: {
          triggerEndingId: 'ending_act2_vanished',
          narrativeLog:
            'Without certified High Court exhibits, the hangar floodlights cut out and the jet wash drowns out your final shot.',
        },
      },
    ],
  },
};

