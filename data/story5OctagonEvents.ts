import { NarrativeEvent } from '../types/events';

export const OCTAGON_EVENT_DECK: Record<string, NarrativeEvent> = {
  // 1. THREAT CRISIS: Stage 8 Black-Sky Grid Collapse (8/8)
  evt_black_sky_collapse: {
    id: 'evt_black_sky_collapse',
    title: 'Stage 8 Black-Sky National Grid Collapse',
    category: 'threat_crisis',
    locationLabel: 'Apollo Transmission Hub • National Power Grid',
    speakerName: 'National System Operator',
    speakerRole: 'Eskom Control Center Broadcast',
    bodyText: [
      'The Apollo frequency crashes through 47.5 Hz into terminal collapse. Cascading trip coils sever the 765kV transmission corridors between the Highveld, Drakensberg, and the Cape.',
      'Fifty-five million citizens plunge into total, pitch-black darkness. Telecommunications towers go dead, water treatment plants lose pressure, and airport runways shut down across nine provinces.',
    ],
    choices: [
      {
        id: 'choice_blackout_scada_key',
        label: 'Engage Drakensberg Hydro Black-Start with SCADA Master Key',
        description: 'Bypass the corrupted relays and restart the emergency pumped-storage turbines.',
        requiredItem: 'gear_scada_master_key',
        effect: {
          resetClockId: 'national_blackout_countdown',
          composureDelta: 20,
          clockProgress: [{ clockId: 'decrypt_master_omega_cipher', delta: 1 }],
          narrativeLog:
            'You slam the physical SCADA master key into the emergency islanding console, restoring a stable 50 Hz island frequency for key national command centers.',
        },
      },
      {
        id: 'choice_blackout_wire_bypass',
        label: 'Manually Reroute Grid Hydro Power via Wire Engineering',
        description: 'Direct high-voltage technicians using wire communications.',
        requiredStat: { stat: 'wire', min: 2 },
        effect: {
          resetClockId: 'national_blackout_countdown',
          composureDelta: 5,
          narrativeLog:
            'Technicians establish a fragile emergency corridor to Pretoria and Johannesburg hospitals.',
        },
      },
      {
        id: 'choice_blackout_endure',
        label: 'Endure Total Blackout in the Bunker',
        description: 'Rely on auxiliary diesel generators as darkness blankets the subcontinent.',
        effect: {
          resetClockId: 'national_blackout_countdown',
          composureDelta: -25,
          narrativeLog:
            'Emergency generators cough and struggle against fuel contamination; morale drops across the Taskforce.',
        },
      },
    ],
  },

  // 2. THREAT CRISIS: Mercenary Air Assault (6/6)
  evt_mercenary_air_assault: {
    id: 'evt_mercenary_air_assault',
    title: 'Aegis Mercenary Gunship Air Assault',
    category: 'threat_crisis',
    locationLabel: 'Drakensberg Escarpment • Taskforce Airspace',
    speakerName: 'Gideon Brand',
    speakerRole: 'Vanguard Strike Commander',
    bodyText: [
      'Four blacked-out Super Hind combat helicopters roar over the mountain ridge, launching thermal decoys and illuminating the Taskforce bunker with targeting lasers.',
      'Foreign private military contractors descend on fast ropes, armed with suppressed assault carbines and thermite breaching charges.',
    ],
    choices: [
      {
        id: 'choice_air_assault_satellite_link',
        label: 'Call Close Tactical Air Support via Satellite Uplink',
        description: 'Coordinate friendly SAAF Gripen interceptors using your secure satellite transponder.',
        requiredItem: 'gear_taskforce_satellite_uplink',
        effect: {
          resetClockId: 'octagon_mercenary_sweep',
          composureDelta: 15,
          narrativeLog:
            'Air Force interceptors sweep the valley, forcing the mercenary gunships to scatter into the clouds.',
        },
      },
      {
        id: 'choice_air_assault_tactical_repel',
        label: 'Lead Surface Counter-Ambush with Kinetic Fire',
        description: 'Mount heavy machine guns on the perimeter revetments.',
        requiredStat: { stat: 'street', min: 2 },
        effect: {
          resetClockId: 'octagon_mercenary_sweep',
          composureDelta: 5,
          cashDelta: 400,
          narrativeLog:
            'You repel the mercenary vanguard, capturing a crate of NATO-spec munitions and communication radios.',
        },
      },
      {
        id: 'choice_air_assault_fall_back',
        label: 'Seal the Blast Doors and Bunker Down',
        description: 'Abandon the exterior landing pad and lock the mountain vault.',
        effect: {
          resetClockId: 'octagon_mercenary_sweep',
          composureDelta: -20,
          narrativeLog:
            'The exterior observation deck is shredded by cannon fire; the Taskforce is pinned underground.',
        },
      },
    ],
  },

  // 3. THREAT CRISIS: Radar Blackout Hazard (6/6)
  evt_radar_blackout_hazard: {
    id: 'evt_radar_blackout_hazard',
    title: 'Electronic Warfare & Radar Blindness',
    category: 'threat_crisis',
    locationLabel: 'National Air Traffic Management • Overberg Relay',
    speakerName: 'Leila Hendricks',
    speakerRole: 'SIGINT Director',
    bodyText: [
      'High-power military radar jammers stationed along the Great Karoo saturate national airspace with white noise. Civilian airliners are forced to circle blindly over the Indian Ocean.',
      'Under the radar blind spot, unmarked cargo transports are landing at remote desert strips to unload heavy combat gear for the coup.',
    ],
    choices: [
      {
        id: 'choice_radar_burn_frequencies',
        label: 'Burn Through Jamming Using Quantum Wire Filters',
        description: 'Reconfigure satellite phased-array frequencies to lock onto the jammer source.',
        requiredStat: { stat: 'wire', min: 2 },
        effect: {
          resetClockId: 'airspace_radar_jamming',
          composureDelta: 10,
          clockProgress: [{ clockId: 'decrypt_master_omega_cipher', delta: 1 }],
          narrativeLog:
            'You pinpoint the mobile jammer convoy in the Karoo basin and transmit coordinates to provincial police intercepts.',
        },
      },
      {
        id: 'choice_radar_scramble_transponders',
        label: 'Broadcast Ground-to-Air Warning Signals',
        description: 'Alert commercial flights to divert to neighboring southern African airports.',
        requiredStat: { stat: 'influence', min: 1 },
        effect: {
          resetClockId: 'airspace_radar_jamming',
          composureDelta: 5,
          narrativeLog:
            'Air traffic controllers safely ground twenty inbound passenger flights in Gaborone and Maputo.',
        },
      },
      {
        id: 'choice_radar_blindness',
        label: 'Operate Under Sensor Blackout',
        description: 'Proceed with night operations without radar guidance.',
        effect: {
          resetClockId: 'airspace_radar_jamming',
          composureDelta: -15,
          narrativeLog:
            'Taskforce transport choppers are grounded by zero visibility and electronic jamming.',
        },
      },
    ],
  },

  // 4. THREAT CRISIS: Coup Declaration (6/6)
  evt_coup_declaration_crisis: {
    id: 'evt_coup_declaration_crisis',
    title: 'General Swart’s National Military Junta Broadcast',
    category: 'threat_crisis',
    locationLabel: 'SABC Radio Park Broadcast Tower • Auckland Park',
    speakerName: 'General Andre Swart',
    speakerRole: 'Self-Proclaimed Commander, National Restoration Council',
    bodyText: [
      'Emergency broadcast sirens wail through television and radio receivers across South Africa. General Swart appears in full dress uniform flanked by heavily armed soldiers.',
      '"Citizens of South Africa. Due to catastrophic sabotage of our electrical grid and widespread civil collapse, the Constitutional Court and National Assembly have been suspended. The National Restoration Council now assumes executive authority."',
    ],
    choices: [
      {
        id: 'choice_coup_executive_indictment',
        label: 'Broadcast the Constitutional High Treason Indictment',
        description: 'Use your certified high-court indictment docket to override the pirate broadcast.',
        requiredItem: 'evidence_constitutional_indictment',
        effect: {
          resetClockId: 'midnight_sun_coup_countdown',
          composureDelta: 20,
          clockProgress: [{ clockId: 'treason_indictment_docket', delta: 2 }],
          narrativeLog:
            'Justice Sithole’s counter-broadcast cuts directly into the national feed, presenting incontrovertible evidence of Swart’s treason to the entire nation.',
        },
      },
      {
        id: 'choice_coup_rally_people',
        label: 'Broadcast Captain Nandi Mthembu’s Rallying Call to the Nation',
        description: 'Appeal to police commanders, soldiers, and citizens to defend democracy.',
        requiredStat: { stat: 'influence', min: 2 },
        effect: {
          resetClockId: 'midnight_sun_coup_countdown',
          composureDelta: 10,
          factionRepDelta: [{ factionId: 'people_resistance_front', delta: 2 }],
          narrativeLog:
            'Tens of thousands of citizens pour into Church Square in Pretoria and Grand Parade in Cape Town, singing national hymns and defying the curfew.',
        },
      },
      {
        id: 'choice_coup_shaken',
        label: 'Scramble Communications as Loyalist Units Waver',
        description: 'Frantically attempt to maintain command coherence.',
        effect: {
          resetClockId: 'midnight_sun_coup_countdown',
          composureDelta: -30,
          narrativeLog:
            'Several regional police stations acknowledge Swart’s junta, throwing security forces into chaotic disarray.',
        },
      },
    ],
  },

  // 5. INVESTIGATION BREAKTHROUGH: Treason Docket Complete (6/6)
  evt_treason_docket_complete: {
    id: 'evt_treason_docket_complete',
    title: 'The Master Constitutional Indictment Unsealed',
    category: 'investigation_breakthrough',
    locationLabel: 'Constitutional Court Chambers • Constitution Hill, Braamfontein',
    speakerName: 'Deputy Chief Justice Sindi Sithole',
    speakerRole: 'Presiding Justice of the Constitutional Court',
    bodyText: [
      'The final evidentiary seal is set onto the master indictment docket. Combining four regional dossiers with the financial ledgers of Sovereign Pearl Holdings, the case is airtight.',
      'All eight members of the Sovereign Octagon are formally indicted under Section 198 of the Constitution for high treason, sabotage, corruption, and crimes against the Republic.',
    ],
    choices: [
      {
        id: 'choice_docket_issue_arrests',
        label: 'Issue High Court Red Warrants for the Sovereign Octagon',
        description: 'Authorize the United Hawks Taskforce to execute arrests at the Karoo summit.',
        effect: {
          removeClockId: 'treason_indictment_docket',
          composureDelta: 30,
          addInventoryItem: 'evidence_constitutional_indictment',
          unlockNodeIds: ['o7_octagon_summit_chamber'],
          narrativeLog:
            'The warrants are transmitted simultaneously to Interpol, the SA National Defence Force, and all border posts. The conspirators are trapped.',
        },
      },
    ],
  },

  // 6. INVESTIGATION BREAKTHROUGH: Master Omega Cipher Decrypted (6/6)
  evt_omega_cipher_decrypted: {
    id: 'evt_omega_cipher_decrypted',
    title: 'Operation Midnight Sun: The Master Omega Cipher Decrypted',
    category: 'investigation_breakthrough',
    locationLabel: 'Karoo High-Altitude Satellite Receiver • Sutherland',
    speakerName: 'Leila Hendricks',
    speakerRole: 'SIGINT Director',
    bodyText: [
      'The multi-tier quantum cipher shatters on Leila’s screen. The full operational blueprint of the Sovereign Octagon is exposed to the light.',
      'The files contain the exact coordinates of the Karoo summit vault, the kill codes for the Apollo grid trojans, and the escrow accounts funding the private military battalions.',
    ],
    choices: [
      {
        id: 'choice_omega_deploy_kill_codes',
        label: 'Broadcast Trojan Kill-Codes & Unlock Karoo Mountain Vault',
        description: 'Neutralize the black-sky malware and unlock the blast doors to the summit chamber.',
        effect: {
          removeClockId: 'decrypt_master_omega_cipher',
          composureDelta: 30,
          addInventoryItem: 'evidence_omega_protocol',
          unlockNodeIds: ['o7_octagon_summit_chamber'],
          narrativeLog:
            'The SCADA malware dissolves across the national grid. The blast doors of the Karoo mountain chamber override to open.',
        },
      },
    ],
  },

  // 7. STORY CLIMAX: Summit Chamber Breach
  evt_summit_breach_climax: {
    id: 'evt_summit_breach_climax',
    title: 'The Karoo Summit Breach: Midnight Reckoning',
    category: 'story_climax',
    locationLabel: 'The Sovereign Octagon Chamber • Roggeveld Escarpment',
    speakerName: 'Lord Sterling',
    speakerRole: 'Convener of the Sovereign Octagon',
    bodyText: [
      'The circular titanium blast doors slide back. Inside the cliffside observatory, the eight masters of the shadow empire sit around a polished granite table.',
      'Through the floor-to-ceiling glass, the vast Karoo plateau stretches to the horizon beneath a canopy of stars. A helicopter idles on the private helipad outside.',
      'The grand anthology of Mzansi Midnight ends here. The future of South Africa rests entirely in your hands.',
    ],
    choices: [
      {
        id: 'choice_ending_constitutional',
        label: 'Uphold the Constitution: Arrest the Octagon for High Treason',
        description: 'Read the Constitutional Court warrants and deliver the conspirators to the dock.',
        requiredItem: 'evidence_constitutional_indictment',
        effect: {
          triggerEndingId: 'ending_octagon_constitutional_reckoning',
          narrativeLog:
            'The eight oligarchs are cuffed and marched to waiting helicopters under the glare of justice.',
        },
      },
      {
        id: 'choice_ending_revolution',
        label: 'People’s Justice: Hand the Conspirators to the Civil Resistance',
        description: 'Open the gates to the thousands of citizens marching on the compound.',
        requiredFactionRep: { factionId: 'people_resistance_front', min: 2 },
        effect: {
          triggerEndingId: 'ending_octagon_peoples_revolution',
          narrativeLog:
            'The people tear down the security walls, seizing the vaults and reclaiming national wealth.',
        },
      },
      {
        id: 'choice_ending_shadow_director',
        label: 'Accept the Mantle: Become the Shadow Director of South Africa',
        description: 'Take Lord Sterling’s seat at the granite octagon and command the deep state.',
        requiredCash: 3000,
        effect: {
          triggerEndingId: 'ending_octagon_shadow_director',
          narrativeLog:
            'You pour yourself a glass of scotch and assume total clandestine command over the Republic.',
        },
      },
      {
        id: 'choice_ending_balkanized',
        label: 'Shattered Republic: Allow the Regional Warlords to Partition the Nation',
        description: 'Fail to secure a unified state, allowing regional cartels to declare autonomy.',
        effect: {
          triggerEndingId: 'ending_octagon_balkanized_republic',
          narrativeLog:
            'The Republic fractures into autonomous corporate and regional enclaves.',
        },
      },
      {
        id: 'choice_ending_vanished',
        label: 'The Vanished Watchers: Burn the Dossiers and Fade into the Karoo Night',
        description: 'Realize power corrupts all institutions; walk away into the southern stars.',
        effect: {
          triggerEndingId: 'ending_octagon_vanished_watchers',
          narrativeLog:
            'You throw the encrypted drives into the incinerator and walk into the desert breeze.',
        },
      },
    ],
  },
};
