import { NarrativeEvent } from '../types/events';

export const CAPE_EVENT_DECK: Record<string, NarrativeEvent> = {
  // 1. THREAT CLOCK FULL: Cape Flats Turf War (6/6)
  evt_gang_war_escalation: {
    id: 'evt_gang_war_escalation',
    title: 'The Manenberg Crossfire Eruption',
    category: 'threat_crisis',
    locationLabel: 'Manenberg Central Court • The Cape Flats',
    speakerName: 'Pastor Ronnie Jacobs',
    speakerRole: 'Community Intermediary',
    bodyText: [
      'Automatic gunfire rips through the night air across Manenberg as rival syndicate factions clash in a full-scale territorial war. R5 assault rifle rounds tear through corrugated iron shacks and brick tenement facades.',
      'Unmarked police vans circle two blocks away with their headlights switched off, deliberately waiting for the casualties to mount to justify total emergency lockdown.',
    ],
    choices: [
      {
        id: 'choice_gang_war_vest',
        label: 'Lead Trapped Civilians Under Ceramic Armor Cover',
        description: 'Use your reinforced tactical vest and combat training to evacuate the church soup kitchen.',
        requiredItem: 'gear_reinforced_agu_vest',
        effect: {
          resetClockId: 'gang_turf_war_clock',
          composureDelta: 15,
          factionRepDelta: [{ factionId: 'cape_gang_federation', delta: 2 }],
          narrativeLog:
            'You absorb bullet fragments on your ceramic chest plate while ushering twenty mothers and children into the church crypt.',
        },
      },
      {
        id: 'choice_gang_war_truce',
        label: 'Broadcast Pastor Ronnie’s Ceasefire Call',
        description: 'Use a loudspeaker and megaphone to invoke the prison number elders.',
        requiredStat: { stat: 'street', min: 2 },
        effect: {
          resetClockId: 'gang_turf_war_clock',
          composureDelta: 5,
          narrativeLog:
            'The call echoes across the courts. Gunfire sputters and dies as older syndicate generals pull their soldiers back into the shadows.',
        },
      },
      {
        id: 'choice_gang_war_pinned',
        label: 'Take Cover in a Drainage Culvert',
        description: 'Crawl through sewage ditches while bullets ricochet overhead.',
        effect: {
          composureDelta: -25,
          resetClockId: 'gang_turf_war_clock',
          narrativeLog:
            'You survive the barrage soaked in dirty stormwater, your ears ringing and your confidence badly shaken.',
        },
      },
    ],
  },

  // 2. THREAT CLOCK FULL: The Cape Doctor Gales & Mist (6/6)
  evt_gale_force_blackout: {
    id: 'evt_gale_force_blackout',
    title: 'The Cape Doctor Gale-Force Surge',
    category: 'threat_crisis',
    locationLabel: 'Table Mountain Slopes • City Bowl Feeder Lines',
    speakerName: 'Eskom Metro Dispatch',
    speakerRole: 'Regional Grid Broadcast',
    bodyText: [
      'Seventy-knot south-easterly gusts tear down the face of Table Mountain, dragging the white tablecloth cloud into the streets below. Sparks shower across Buitengracht Street as a feeder pylon collapses.',
      'The City Bowl and Atlantic Seaboard plunge into total blackout. Surveillance cameras, traffic signals, and cell phone towers drop off the air, leaving the city enveloped in violet sea-mist and darkness.',
    ],
    choices: [
      {
        id: 'choice_gale_darknet',
        label: 'Switch to Peer-to-Peer Darknet Mesh Network',
        description: 'Use your encrypted mesh communicator to maintain tactical situational awareness.',
        requiredItem: 'gear_encrypted_burner_mesh',
        effect: {
          resetClockId: 'cape_doctor_gale_clock',
          composureDelta: 15,
          clockProgress: [{ clockId: 'red_cipher_decryption', delta: 1 }],
          narrativeLog:
            'While the police network is crippled by the storm, your darknet mesh routes cleanly through pirate repeaters across Signal Hill.',
        },
      },
      {
        id: 'choice_gale_bunker',
        label: 'Navigate by Foot Through the Blackout Alleys',
        description: 'Use knowledge of Cape Town’s Victorian drainage tunnels to bypass wind tunnels.',
        requiredStat: { stat: 'wire', min: 2 },
        effect: {
          resetClockId: 'cape_doctor_gale_clock',
          composureDelta: 5,
          narrativeLog:
            'You navigate the howling darkness through underground stone sluices, emerging unnoticed behind police lines.',
        },
      },
      {
        id: 'choice_gale_blown',
        label: 'Endure the Exposed Hurricane Wind',
        description: 'Fight your way through flying debris and snapped power cables.',
        effect: {
          composureDelta: -20,
          resetClockId: 'cape_doctor_gale_clock',
          narrativeLog:
            'Flying roof tiles shatter your vehicle’s rear window and the cold Atlantic sleet chills you to the bone.',
        },
      },
    ],
  },

  // 3. THREAT CLOCK FULL: General Swart's AGU Purge (6/6)
  evt_swart_death_squad: {
    id: 'evt_swart_death_squad',
    title: 'Major-General Swart’s Tactical Ambush',
    category: 'threat_crisis',
    locationLabel: 'Signal Hill Hairpin Turn • City Lookout',
    speakerName: 'Major-General Andre Swart',
    speakerRole: 'Provincial Police Commissioner',
    bodyText: [
      'Two heavy black Toyota Fortuners ram your vehicle into the stone parapet on the Signal Hill pass. Blue tactical strobes flash against the ocean fog.',
      'Masked operatives in tactical uniforms dismount with suppressed carbines. General Swart steps into the headlights, pulling on black leather gloves. "You should have stayed in the forensic lab, Hendricks. David made the same mistake."',
    ],
    choices: [
      {
        id: 'choice_swart_renegade_support',
        label: 'Signal Sergeant Warren and the AGU Counter-Ambush',
        description: 'Trigger the pre-positioned renegade sniper overwatch from the granite ridge.',
        requiredStat: { stat: 'street', min: 2 },
        effect: {
          resetClockId: 'general_swart_manhunt',
          composureDelta: 20,
          narrativeLog:
            'Warren’s team opens fire from the ridge with tracer rounds, puncturing the radiator of Swart’s command vehicle. Swart curses and retreats down the pass.',
        },
      },
      {
        id: 'choice_swart_ballistics_reveal',
        label: 'Hold Up David’s Casing and Broadcast Live to Newsrooms',
        description: 'Shine a tactical flashlight on the matching firing-pin striations into an open satellite link.',
        requiredItem: 'evidence_agu_ballistics_dossier',
        effect: {
          resetClockId: 'general_swart_manhunt',
          composureDelta: 10,
          clockProgress: [{ clockId: 'red_cipher_decryption', delta: 2 }],
          narrativeLog:
            'Swart pauses when he sees the digital camera streaming directly to national editors. His men hesitate, lowering their weapons as you reverse into the fog.',
        },
      },
      {
        id: 'choice_swart_flee_cliff',
        label: 'Leap Down the Granite Scree Slope',
        description: 'Tumble down the steep mountain brush under a hail of suppressed gunfire.',
        effect: {
          composureDelta: -30,
          resetClockId: 'general_swart_manhunt',
          narrativeLog:
            'You tumble fifty meters down the rocky slope, tearing your clothes and spraining your wrist before losing your pursuers in the ravines.',
        },
      },
    ],
  },

  // 4. ACTION CLOCK FULL: Decrypt The Red Cipher (6/6)
  evt_red_cipher_unlocked: {
    id: 'evt_red_cipher_unlocked',
    title: 'The Red Sovereign Protocol Decrypted',
    category: 'investigation_breakthrough',
    locationLabel: 'Charred AGU Bunker • Forensic Terminal',
    speakerName: 'Sergeant Warren Abrahams',
    speakerRole: 'Renegade Ballistics Analyst',
    bodyText: [
      'The cryptographic terminal dings softly as the final algorithmic key falls into place. On the green phosphor screen, a master diagram unfolds: THE SOVEREIGN OCTAGON.',
      'Eight high-ranking conspirators are unmasked: politicians, police generals, mining barons, and logistics bosses across Durban, Johannesburg, Namaqualand, and Cape Town. Their signature protocol—Operation Midnight Sun—details the planned complete shutdown of the national power grid to seize state sovereignty.',
    ],
    choices: [
      {
        id: 'choice_red_cipher_proceed',
        label: 'Download The Grand Sovereign Protocol (The Red Cipher)',
        description: 'Extract the master dossier and prepare for the final confrontation.',
        effect: {
          addInventoryItem: 'dossier_red_protocol',
          composureDelta: 25,
          unlockNodeIds: ['c7_provincial_police_hq', 'c4_table_bay_container_berth'],
          narrativeLog:
            'The Red Cipher is in your hands. You hold the definitive proof connecting the regional cartels to the eight architects of national state capture.',
        },
      },
    ],
  },

  // 5. ACTION CLOCK FULL: Long Street Protection Racket (4/4)
  evt_extortion_ring_smashed: {
    id: 'evt_extortion_ring_smashed',
    title: 'The Long Street Security Ring Collapses',
    category: 'investigation_breakthrough',
    locationLabel: 'Wale & Long Street Intersection • Nightlife Strip',
    speakerName: 'Zack "The Bull" Rossouw',
    speakerRole: 'Bouncer Syndicate Boss',
    bodyText: [
      'With the financial paper trail exposed and police kickbacks laid bare, the nightclub owners refuse to pay their weekly protection shakedowns.',
      'Zack’s enforcement crews pack up their gear, abandoning their posts outside the VIP lounges. The private security slush fund funding Swart’s shadow operations is completely choked off.',
    ],
    choices: [
      {
        id: 'choice_extortion_seize_cash',
        label: 'Confiscate the Retainer Cash and Armory Keys',
        description: 'Secure remaining operational funds and intelligence.',
        effect: {
          cashDelta: 800,
          composureDelta: 15,
          clockProgress: [{ clockId: 'general_swart_manhunt', delta: -2 }],
          narrativeLog:
            'You secure R800 in unbanked cash and access keys to the waterfront storage lockers. The Long Street syndicate is dismantled.',
        },
      },
    ],
  },

  // 6. WORLD CLOCK FULL: Pier 109 Sovereign Arms Cargo (4/4)
  evt_climax_pier109: {
    id: 'evt_climax_pier109',
    title: 'Showdown at Table Bay Berth 109',
    category: 'story_climax',
    locationLabel: 'Table Bay Harbour • Pier 109 Container Apron',
    speakerName: 'Cassiem Petersen',
    speakerRole: 'Stevedore Union Chief',
    bodyText: [
      'The Cabo Benguela is tied to the quay beneath the colossal steel legs of Gantry Crane 4. The container vessel’s deck lights illuminate crates being swung toward a convoy of unmarked police trucks.',
      'General Swart stands on the container apron surrounded by armed mercenaries. If those containers clear the port security gate, his private army will be fully equipped to enforce the Octagon’s coup.',
    ],
    choices: [
      {
        id: 'choice_climax_prybar_breach',
        label: 'Breach the Master Armaments Container with Hardened Prybar',
        description: 'Crack the tamper-evident customs seals and expose the weapons in the open.',
        requiredItem: 'gear_stevedore_prybar',
        effect: {
          triggerEndingId: 'ending_cape_sovereign_seizure',
          composureDelta: 30,
          narrativeLog:
            'You wedge the hardened prybar into Container #MSCU-449102 and pry open the heavy doors. Crates of assault rifles spill onto the concrete under union cameras.',
        },
      },
      {
        id: 'choice_climax_gang_alliance',
        label: 'Unleash the Cape Flats Ceasefire Coalition',
        description: 'Lead Pastor Ronnie’s allied street veterans to surround the convoy.',
        requiredStat: { stat: 'street', min: 2 },
        effect: {
          triggerEndingId: 'ending_cape_gang_truce',
          composureDelta: 20,
          narrativeLog:
            'Hundreds of dockers and Cape Flats community members pour onto the apron, surrounding Swart’s convoy and blocking every exit.',
        },
      },
      {
        id: 'choice_climax_winelands_exposure',
        label: 'Broadcast the Sovereign Trust Ledger to High Court & SARS',
        description: 'Freeze the financial transactions paying the mercenary crew.',
        requiredItem: 'evidence_winelands_trust_ledger',
        effect: {
          triggerEndingId: 'ending_cape_winelands_audit',
          composureDelta: 20,
          narrativeLog:
            'The asset freeze hits in real-time. The mercenary commander looks at his phone, curses Swart, and orders his men to stand down.',
        },
      },
      {
        id: 'choice_climax_lone_stand',
        label: 'Confront General Swart Alone on the Pier',
        description: 'Face your partner’s killer beneath the howling ocean gale.',
        effect: {
          triggerEndingId: 'ending_cape_shadow_execution',
          composureDelta: -50,
          narrativeLog:
            'A bitter shootout erupts beneath the container cranes in the dark. Gunshots echo over the black water of Table Bay.',
        },
      },
    ],
  },
};
