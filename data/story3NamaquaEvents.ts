import { NarrativeEvent } from '../types/events';

export const NAMAQUA_EVENT_DECK: Record<string, NarrativeEvent> = {
  // 1. WORLD CLOCK FULL: Atlantic Malmokken Fog (6/6)
  evt_namaqua_malmokken_storm: {
    id: 'evt_namaqua_malmokken_storm',
    title: 'The Malmokken Whiteout Squall',
    category: 'threat_crisis',
    locationLabel: 'Port Nolloth Breakwater • Skeleton Coast',
    speakerName: 'Harbor Radio Operator',
    speakerRole: 'VHF Emergency Broadcast',
    bodyText: [
      'The Benguela current whips the Malmokken sea-mist into a howling, freezing gale. Visibility drops to three paces. Salt crusts on your windshield as thirty-knot winds push heavy swells over the jetty.',
      'Navigation lights along the coast are completely blotted out. Off the reef, an unflagged vessel fires distress flares, its engine screaming as the surge carries it toward the rocks.',
    ],
    choices: [
      {
        id: 'choice_malmokken_compass',
        label: 'Navigate by Iridium Satellite Compass',
        description: 'Use your military GPS to chart a blind course through the churning surf.',
        requiredItem: 'gear_satellite_compass',
        effect: {
          resetClockId: 'malmokken_fog',
          composureDelta: 15,
          narrativeLog:
            'The Iridium differential receiver guides your craft safely through the reef gap, avoiding the crashing surf.',
        },
      },
      {
        id: 'choice_malmokken_shelter',
        label: 'Shelter in Protected Cove & Anchor',
        description: 'Drop heavy dual Danforth anchors in the lee of the granite breakwater.',
        requiredStat: { stat: 'street', min: 2 },
        effect: {
          resetClockId: 'malmokken_fog',
          composureDelta: 5,
          narrativeLog:
            'You ride out the ferocious whiteout anchored in the lee of the jetty, conserving fuel until the wind shifts.',
        },
      },
      {
        id: 'choice_malmokken_drift',
        label: 'Blindly Battle the Sea Surge',
        description: 'Fight the steering wheel through zero-visibility freezing spray.',
        effect: {
          composureDelta: -25,
          resetClockId: 'malmokken_fog',
          narrativeLog:
            'The storm tears off a dive cylinder and floods your bakkie’s floorboards. You barely crawl ashore shivering with hypothermia.',
        },
      },
    ],
  },

  // 2. THREAT CLOCK FULL: Aegis Naval Gunboat Patrols (6/6)
  evt_namaqua_naval_intercept: {
    id: 'evt_namaqua_naval_intercept',
    title: 'Aegis High-Speed Gunboat Intercept',
    category: 'threat_crisis',
    locationLabel: 'Alexander Bay Surfline • Concession Perimeter',
    speakerName: 'Aegis Patrol Commander',
    speakerRole: 'Loudhailer & Thermal Sights',
    bodyText: [
      'Twin four-hundred horsepower Mercury outboards roar through the fog. A blinding ten-million candlepower xenon spotlight pins your vehicle against the coastal sand dunes.',
      '"Unidentified vessel and bakkie! Cut your engine and place your hands on the roll cage! You are trespassing in an exclusion zone under private security jurisdiction!"',
    ],
    choices: [
      {
        id: 'choice_naval_dunes',
        label: 'Deploy Dune Sand Tracks & Evade Inland',
        description: 'Slingshot over the soft dune crests where their heavy pursuit truck gets bogged down.',
        requiredItem: 'gear_sand_tracks',
        effect: {
          resetClockId: 'aegis_naval_patrol',
          composureDelta: 10,
          narrativeLog:
            'Your aluminum recovery tracks give your tires instant traction. The mercenary Land Cruiser sinks to its axles in the dunes behind you.',
        },
      },
      {
        id: 'choice_naval_flares',
        label: 'Signal Shore Divers with Emergency Flares',
        description: 'Call on the local diver network to swarm the surf with support skiffs.',
        requiredFactionRep: { factionId: 'artisanal_divers', min: 2 },
        effect: {
          resetClockId: 'aegis_naval_patrol',
          composureDelta: 10,
          factionRepDelta: [{ factionId: 'artisanal_divers', delta: 1 }],
          narrativeLog:
            'Six local bakkies roar down the beach, firing red parachute flares that blind the gunboat’s thermal sights and allow you to vanish.',
        },
      },
      {
        id: 'choice_naval_ram',
        label: 'Ram Through the Coastal Checkpoint',
        description: 'Smash through the wooden boom gate into the foggy dunes under fire.',
        effect: {
          composureDelta: -30,
          resetClockId: 'aegis_naval_patrol',
          narrativeLog:
            'Automatic fire splinters your side mirrors and punctures a rear tire. You escape into the salt flats, bleeding and shaken.',
        },
      },
    ],
  },

  // 3. THREAT CLOCK FULL: Richtersveld Radiator & Heat Hazard (4/4)
  evt_namaqua_heat_exhaustion: {
    id: 'evt_namaqua_heat_exhaustion',
    title: 'Richtersveld Radiator Meltdown',
    category: 'threat_crisis',
    locationLabel: 'Moon Rock Gorge • Richtersveld National Park',
    speakerName: 'Desert Survival Alert',
    speakerRole: 'Engine Temperature Gauge 130°C',
    bodyText: [
      'A hiss of pressurized white steam geysers from beneath your bakkie’s hood. The radiator expansion tank has split under the blistering 46°C desert heat.',
      'Around you, jagged black and copper-tinted mountains bake like kiln bricks. Without water and engine cooling, you have less than six hours before heat stroke sets in.',
    ],
    choices: [
      {
        id: 'choice_heat_runner_cache',
        label: 'Locate Swartbooi’s Shaded Spring Cache',
        description: 'Use Kalahari runner trail markers to find clean water and radiator seal compound.',
        requiredFactionRep: { factionId: 'kalahari_runners', min: 1 },
        effect: {
          resetClockId: 'desert_heat_exhaustion',
          composureDelta: 10,
          narrativeLog:
            'You find a cool spring welling up beneath a rock overhang, refill your water bags, and patch the cracked hose with vulcanized tape.',
        },
      },
      {
        id: 'choice_heat_sand_tracks_shade',
        label: 'Erect Emergency Solar Shade with Sand Tracks',
        description: 'Angle your aluminum tracks and tarp to protect the engine block until dusk.',
        requiredItem: 'gear_sand_tracks',
        effect: {
          resetClockId: 'desert_heat_exhaustion',
          composureDelta: 5,
          narrativeLog:
            'You rig a desert shelter and wait out the midday inferno until temperatures drop at sundown.',
        },
      },
      {
        id: 'choice_heat_endure',
        label: 'Force-March with Empty Canteens',
        description: 'Push your vehicle downhill through dry riverbeds under the scorching sun.',
        effect: {
          composureDelta: -25,
          resetClockId: 'desert_heat_exhaustion',
          narrativeLog:
            'Delirious from dehydration and blistered by the sun, you stumble into a prospector’s windmill just before collapsing.',
        },
      },
    ],
  },

  // 4. THREAT CLOCK FULL: Diver Decompression & Bends Hazard (6/6)
  evt_namaqua_diver_embolism: {
    id: 'evt_namaqua_diver_embolism',
    title: 'Severe Arterial Decompression Sickness',
    category: 'threat_crisis',
    locationLabel: 'Alexander Bay Surf • Deep Gravel Stope',
    speakerName: 'Commercial Dive Telemetry',
    speakerRole: 'Nitrogen Tissue Saturation 180%',
    bodyText: [
      'As you climb into the boat after an emergency gravel recovery dive, an excruciating, bone-crushing ache locks your shoulders and elbows.',
      'Nitrogen bubbles are expanding in your bloodstream. Your vision tunnels, dizziness overtakes your balance, and cold sweat drenches your neoprene suit. Without rapid decompression therapy, permanent paralysis or death will follow.',
    ],
    choices: [
      {
        id: 'choice_bends_hyperbaric',
        label: 'Requisition Fisheries Hyperbaric Chamber',
        description: 'Use Captain Cloete’s authority in Springbok for emergency table-six recompression.',
        requiredFactionRep: { factionId: 'namaqua_command', min: 1 },
        effect: {
          resetClockId: 'diver_bends_hazard',
          composureDelta: 20,
          narrativeLog:
            'Paramedics lock you into the steel decompression chamber. Six hours under pure oxygen completely purges the nitrogen embolism.',
        },
      },
      {
        id: 'choice_bends_redive',
        label: 'Perform In-Water Deep Nitrogen Soak',
        description: 'Drop back into the freezing ocean with pure oxygen mix to outgas slowly.',
        requiredItem: 'gear_diver_knife',
        effect: {
          resetClockId: 'diver_bends_hazard',
          composureDelta: 0,
          narrativeLog:
            'You spend four agonizingly cold hours tethered beneath the swell, allowing the nitrogen bubbles to re-dissolve.',
        },
      },
      {
        id: 'choice_bends_suffer',
        label: 'Endure Acute Bends with Painkillers',
        description: 'Swallow high-dose anti-inflammatories and lie flat on the wooden deck.',
        effect: {
          composureDelta: -30,
          resetClockId: 'diver_bends_hazard',
          narrativeLog:
            'The joint agony is blinding. You survive the night, but lingering nerve pain leaves your diving arm trembling.',
        },
      },
    ],
  },

  // 5. WORLD CLOCK FULL: Orange River Arms Drop Countdown (4/4)
  evt_namaqua_climax_arms_drop: {
    id: 'evt_namaqua_climax_arms_drop',
    title: 'The Orange River Midnight Arms Drop',
    category: 'story_climax',
    locationLabel: 'Orange River Border Drift • Pontoon Crossing',
    speakerName: 'Namib Syndicate Spotter',
    speakerRole: 'Shortwave Intercept',
    bodyText: [
      'A low twin-turboprop aircraft flies without running lights across the Namibian border at tree-top level. Four heavy cargo parachutes blossom against the midnight sky, splashing into the river shallows.',
      'Mercenary skiffs and armored bakkies converge on the drop zone, loading wooden crates of Galil rifles and radar components. If this convoy escapes onto the N7 highway, the coup force in Cape Town will be fully armed.',
    ],
    choices: [
      {
        id: 'choice_arms_drop_intercept',
        label: 'Ambush the Convoy & Seize the Admiralty Cargo (Diamond Flight Ending)',
        description: 'Intercept the lead transport truck and recover the master Table Bay Admiralty manifest.',
        requiredItem: 'evidence_aegis_arms_bill',
        effect: {
          narrativeLog:
            'You disable the lead bakkie with accurate rifle fire and recover the Admiralty cargo manifest as the smugglers scatter.',
          triggerEndingId: 'ending_namaqua_diamond_flight',
        },
      },
      {
        id: 'choice_arms_drop_overrun',
        label: 'Get Overrun by Mercenary Fire (Desert Dune Grave Ending)',
        description: 'Attempt to hold the river crossing alone against overwhelming firepower.',
        effect: {
          narrativeLog:
            'Heavy machine-gun fire cuts across your position. The convoy pushes through into the darkness, leaving you wounded in the sand.',
          triggerEndingId: 'ending_namaqua_desert_dune_grave',
        },
      },
    ],
  },

  // 6. ACTION CLOCK FULL: Table Bay Admiralty Investigation (6/6)
  evt_namaqua_climax_admiralty: {
    id: 'evt_namaqua_climax_admiralty',
    title: 'Climax: Operation Deep-Gravel Unmasked',
    category: 'story_climax',
    locationLabel: 'Alexander Bay Harbor & Aegis Marine Compound',
    speakerName: 'Captain Gideon "Giepie" Brand',
    speakerRole: 'Investigation Conclusion',
    bodyText: [
      'The forensic paper trail, bathymetric sonar scans, and rough diamond parcels form an airtight case. Millions in stolen state energy funds were laundered through uncertified seabed dredging off Port Nolloth.',
      'Colonel Petrov’s mercenary flotilla is moored at Alexander Bay, loading forty crates of military hardware aboard the transport ship "Cabo Benguela" destined for Table Bay Harbor in Cape Town.',
      'How will you deliver justice to the Skeleton Coast?',
    ],
    choices: [
      {
        id: 'choice_climax_naval_raid',
        label: 'Execute High Court Admiralty Naval Raid (State Justice Ending)',
        description: 'Captain Cloete leads armed boarding teams and state patrol vessels to seize the mercenary fleet.',
        requiredFactionRep: { factionId: 'namaqua_command', min: 2 },
        requiredItem: 'evidence_aegis_arms_bill',
        effect: {
          narrativeLog:
            'State fisheries interceptors and naval strike teams box in the mercenary vessels under a hail of flashbangs, executing the High Court seizure warrant.',
          triggerEndingId: 'ending_namaqua_naval_raid',
        },
      },
      {
        id: 'choice_climax_divers_rebellion',
        label: 'Unleash the Artisanal Diver Flotilla Rebellion (Peoples’ Victory Ending)',
        description: 'Rally dozens of local suction boats and shore bakkies to blockade the harbor and reclaim the diamond coast.',
        requiredFactionRep: { factionId: 'artisanal_divers', min: 2 },
        effect: {
          narrativeLog:
            'The shore divers surround Petrov’s compound with roaring tractor engines and flare guns, forcing the mercenaries to surrender without firing a single shot.',
          triggerEndingId: 'ending_namaqua_divers_rebellion',
        },
      },
      {
        id: 'choice_climax_diamond_flight',
        label: 'Seize the Master Admiralty Manifest & Disappear into Namibia (Smuggler’s Escape Ending)',
        description: 'Snatch the Table Bay Admiralty manifest and slip across the Orange River drift under cover of the Malmokken fog.',
        requiredItem: 'evidence_namaqua_diamond_parcel',
        effect: {
          narrativeLog:
            'With the uncut diamond parcel in your dive bag and the Admiralty manifest in your pocket, you pilot a drift boat across the river to safety.',
          triggerEndingId: 'ending_namaqua_diamond_flight',
        },
      },
    ],
  },
};
