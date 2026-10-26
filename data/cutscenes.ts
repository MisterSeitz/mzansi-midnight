import { CutsceneData } from '../types/cutscenes';

export const STORY_CUTSCENES: Record<string, CutsceneData> = {
  // --- STORY 1: ETHEKWINI-GOLD CLIMAX ---
  cutscene_berth14_breach: {
    id: 'cutscene_berth14_breach',
    storyId: 'story_1_ethekwini',
    title: 'The Iron Convoy at Berth 14',
    subtitle: 'Pier 2 Container Basin • Durban Port Under Stage 6 Storm',
    image: '/assets/cutscenes/climax_berth14.jpg',
    audioMood: 'crisis',
    beats: [
      {
        locationStamp: 'PIER 2 CONTAINER TERMINAL // 01:45 AM // STAGE 6 BLACKOUT',
        text: 'The coastal storm crashes against the concrete seawalls of Durban Harbour. All primary high-voltage floodlights die simultaneously as Stage 6 cuts the port grid into absolute darkness.',
      },
      {
        locationStamp: 'BERTH 14 QUAYSIDE // SAPS RADIO TRANSCEIVER CHATTER',
        speaker: 'Brigadier Titus Mokoena',
        role: 'SAPS Organized Crime Escort',
        text: '“Convoy Alpha, step on the gas. Transnet weighbridge is bypassed. Keep the municipal tankers sealed and get them alongside Berth 14 before the Hawks warrant hits the magistrate’s desk.”',
      },
      {
        locationStamp: 'BREAKWATER PERIMETER // COVERT RECON VANTAGE',
        text: 'Four massive municipal water tankers roll through the breached security gate under heavy rain, flanked by unmarked TRT Nyala gun trucks. Inside those pressurized tanks isn’t emergency drinking water—it is R400 million in liquid precursor chemicals for the super-labs.',
      },
      {
        locationStamp: 'POINT WATERFRONT ALLEY // ZERO HOUR',
        text: 'You rack the slide on your service sidearm. Beside you, the encrypted Hawks radio crackles to life. This is the moment Docket #409 was built for. There is no turning back.',
      },
    ],
    actionLabel: 'CONFRONT THE CONVOY AT BERTH 14 ►',
    linkedEventId: 'evt_climax_berth14',
  },

  // --- STORY 2: HIGHVELD-CHROME CLIMAX ---
  cutscene_kendon_sabotage: {
    id: 'cutscene_kendon_sabotage',
    storyId: 'story_2_highveld',
    title: 'The Megawatt Overload',
    subtitle: 'Kendon Coal Depot & Hillbrow Substation • Midnight Crisis',
    image: '/assets/cutscenes/climax_kendon.jpg',
    audioMood: 'crisis',
    beats: [
      {
        locationStamp: 'WITWATERSRAND INDUSTRIAL BASIN // 23:58 PM',
        text: 'Across Johannesburg, the night air smells of sulfur and ozone. Deep inside the Kendon rail depot, the coal conveyors grind to a sudden, violent halt.',
      },
      {
        locationStamp: 'SCADA CONTROL TERMINAL // SIU WIRETAP FEED',
        speaker: 'Helena Van Niekerk',
        role: 'Sandton Energy Arbitrage Broker',
        text: '“Trip the Hillbrow 400kV transformers right now. Let the spot price hit five Rand per kilowatt-hour before dawn. When the lights go out, our offshore accounts triple in value.”',
      },
      {
        locationStamp: 'HILLBROW MAIN SUBSTATION // EXPLOSIVE ARCING',
        text: 'A blinding turquoise explosion tears through the substation towers. Thousands of volts arc into the midnight rain, plunging four million residents into darkness. The coal cartel’s endgame is underway.',
      },
      {
        locationStamp: 'PRETORIA HIGHWAY // SIU VANGUARD',
        text: 'With your cold-storage forensic hard drives loaded, you accelerate toward the burning substation gates. It is time to freeze the arbitrage syndicate before the national grid collapses completely.',
      },
    ],
    actionLabel: 'BREACH KENDON COAL DEPOT ►',
    linkedEventId: 'evt_highveld_climax_kendon',
  },

  // --- STORY 3: NAMAQUA-DIAMOND CLIMAX ---
  cutscene_namaqua_drop: {
    id: 'cutscene_namaqua_drop',
    storyId: 'story_3_namaqua',
    title: 'Midnight Off Port Nolloth',
    subtitle: 'Atlantic Skeleton Coast • Contraband Run in Dense Fog',
    image: '/assets/cutscenes/climax_namaqua.jpg',
    audioMood: 'crisis',
    beats: [
      {
        locationStamp: 'ATLANTIC MALMOKKEN MIST // 02:10 AM',
        text: 'Freezing Antarctic swell thunders against the desolate quartz reefs of the Richtersveld. A suffocating maritime fog blankets the coastline, cutting visibility down to three paces.',
      },
      {
        locationStamp: 'OFFSHORE DREDGE VESSEL MV KOWIE // DECK RADAR',
        speaker: 'Colonel Yuri Petrov',
        role: 'Aegis Maritime Mercenary Commander',
        text: '“Kill the deck lights. Transfer the diamond cases onto the pontoon skiffs and haul the surface-to-air crates ashore. If Sea Fisheries patrols intercept, engage with live fire.”',
      },
      {
        locationStamp: 'ORANGE RIVER DRIFT // SKELETON REEF AMBUSH',
        text: 'Twin outboard engines rumble in the surf. Wooden skiffs manned by armed mercenaries scrape against the rocky shingle. Sealed Pelican cases packed with uncertified alluvial diamonds and military crates are carried up the dunes.',
      },
      {
        locationStamp: 'DESERT DUNE CREST // TACTICAL PERIMETER',
        text: 'Captain Giepie Brand and the artisanal diver vanguard cock their flare guns and dive shotguns. The Table Bay Admiralty Manifest is about to be enforced with hot lead.',
      },
    ],
    actionLabel: 'INTERCEPT THE ARMS DROP ►',
    linkedEventId: 'evt_namaqua_climax_arms_drop',
  },

  // --- STORY 4: CAPE-NOCTURNE CLIMAX ---
  cutscene_cape_dockers: {
    id: 'cutscene_cape_dockers',
    storyId: 'story_4_cape',
    title: 'Gale-Force Strike at Berth 109',
    subtitle: 'Table Bay Harbour // 60-Knot Cape Doctor Gale',
    image: '/assets/cutscenes/climax_cape.jpg',
    audioMood: 'crisis',
    beats: [
      {
        locationStamp: 'TABLE BAY CONTAINER BASIN // 03:00 AM // GALE WARNING',
        text: 'The legendary Cape Doctor gale howls off Table Mountain at sixty knots, whipping freezing sea spray across the wet concrete aprons of Table Bay Berth 109.',
      },
      {
        locationStamp: 'CRANE GANTRY 4 // RED CIPHER COMMS INTERCEPT',
        speaker: 'Major-General Andre Swart',
        role: 'Disavowed State Security Cadre',
        text: '“Container ZAF-8890 is unsealed. Ten thousand military rifles and encrypted satellite transceivers for the national coup. Clear the dockers off the quay immediately.”',
      },
      {
        locationStamp: 'DOCKERS UNION LINE // FORESHORE CONTAINER STACK',
        text: 'Hundreds of dockworkers armed with cargo hooks stand shoulder-to-shoulder with Leila Hendricks and rogue AGU detectives, blocking the transport flatbeds in the blinding wind.',
      },
      {
        locationStamp: 'QUAY APEX // THE CONFRONTATION',
        text: 'The steel doors of Container ZAF-8890 swing wide under the crane lights, revealing crates of heavy weaponry. The Sovereign Protocol’s shadow military arm stands exposed.',
      },
    ],
    actionLabel: 'SEIZE BERTH 109 ARMS SHIPMENT ►',
    linkedEventId: 'evt_climax_pier109',
  },

  // --- STORY 5: THE SOVEREIGN OCTAGON CLIMAX ---
  cutscene_octagon_bunker: {
    id: 'cutscene_octagon_bunker',
    storyId: 'story_5_octagon',
    title: 'Breaching the Drakensberg Redoubt',
    subtitle: 'Subterranean Command Sanctum • Total Grid Collapse Zero Hour',
    image: '/assets/cutscenes/climax_octagon.jpg',
    audioMood: 'crisis',
    beats: [
      {
        locationStamp: 'DRAKENSBERG ESCARPMENT // SUBTERRANEAN ACCESS SHAFT 01',
        text: 'Three hundred metres beneath the basalt cliffs of the Drakensberg, massive reinforced hydraulic blast doors groan open against decades of mountain pressure.',
      },
      {
        locationStamp: 'WAR ROOM COMMAND CONSOLE // APOLLO SCADA FEED',
        speaker: 'Lord Sterling & General Swart',
        role: 'The Sovereign Octagon Leadership',
        text: '“Stage 8 Black-Sky complete. Ninety-two percent of South Africa is without power. By dawn, the interim council assumes emergency sovereign control over the mineral basins.”',
      },
      {
        locationStamp: 'NATIONAL SCADA DISPLAY SANCTUM // OMEGA BREACH',
        text: 'Massive glowing tactical map walls flicker in dark crimson. Every power station, harbour terminal, and gold reef in the Republic is displayed in real-time telemetry.',
      },
      {
        locationStamp: 'SANCTUM GATES // UNITED HAWKS TASKFORCE',
        text: 'Captain Nandi Mthembu, Gideon Brand, and Leila Hendricks step across the threshold with the unified forensic dossiers from all four provinces. The Republic will not fall tonight.',
      },
    ],
    actionLabel: 'ENTER THE OCTAGON SUMMIT SANCTUM ►',
    linkedEventId: 'evt_summit_breach_climax',
  },
};
