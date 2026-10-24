import { CharacterBackground, PrologueSceneNode } from '../types/prologue';

export const NAMAQUA_CHARACTER_BACKGROUNDS: Record<string, CharacterBackground> = {
  deep_sea_diver: {
    id: 'deep_sea_diver',
    title: 'The Deep Sea Diver',
    formerUnit: 'Port Nolloth Commercial Diamond Salvage',
    tagline: 'STREET +2 // DOCKETS +1 // WIRE 0 // INFLUENCE -1',
    description:
      'You spent fifteen years thirty meters down on the freezing Atlantic seabed, operating heavy gravel suction pipes in blinding underwater undertows. You know every uncharted reef and dredging trench off the Skeleton Coast, and you know which harbor bosses take kickbacks to look away.',
    stats: {
      street: 2,
      dockets: 1,
      wire: 0,
      influence: -1,
    },
    startingCash: 950,
    factionBonus: {
      factionId: 'artisanal_divers',
      delta: 2,
    },
  },

  kalahari_tracker: {
    id: 'kalahari_tracker',
    title: 'The Kalahari Desert Tracker',
    formerUnit: 'Richtersveld Community Ranger Auxiliary',
    tagline: 'DOCKETS +2 // STREET +1 // WIRE 0 // INFLUENCE -1',
    description:
      'You can read tire tracks in shifting red dunes forty-eight hours after a desert sandstorm. When unflagged mercenary convoys started running heavy weapons down from the Orange River pontoon, you tracked them straight to the abandoned De Beers sorting plants.',
    stats: {
      dockets: 2,
      street: 1,
      wire: 0,
      influence: -1,
    },
    startingCash: 800,
    factionBonus: {
      factionId: 'kalahari_runners',
      delta: 2,
    },
  },

  ex_naval_infiltrator: {
    id: 'ex_naval_infiltrator',
    title: 'The Ex-Naval Infiltrator',
    formerUnit: 'SAN Maritime Special Operations / SANIC',
    tagline: 'WIRE +2 // INFLUENCE +1 // STREET 0 // DOCKETS -1',
    description:
      'You ran electronic intercept patrols aboard naval frigates before Aegis-Atlantis started bribing senior admirals in Simon’s Town. You still possess the hydrophone acoustic ciphers, coastal radar codes, and satellite decryption keys.',
    stats: {
      wire: 2,
      influence: 1,
      street: 0,
      dockets: -1,
    },
    startingCash: 1100,
    factionBonus: {
      factionId: 'namaqua_command',
      delta: 2,
    },
  },
};

export const NAMAQUA_PROLOGUE_NODES: Record<string, PrologueSceneNode> = {
  namaqua_scene_1_intro: {
    id: 'namaqua_scene_1_intro',
    timestamp: '02:15 SAST // COLD ATLANTIC MALMOKKEN',
    speaker: 'Captain Gideon "Giepie" Brand',
    speakerRole: 'Ex-Maritime Border Diver & Desert Tracker',
    paragraphs: [
      'The freezing Atlantic Benguela current smashes against the barnacle-encrusted pilings of the Port Nolloth breakwater. Outside your converted shipping container, the Malmokken fog hangs so thick and salty that you cannot see the harbor navigation lights twenty paces away.',
      'Three days ago, an air-gapped satellite packet reached you from a safehouse in Braamfontein: the Project Midas coal syndicate in Johannesburg laundered R280 million in kickbacks into rough, uncertified diamond parcels right here along the Skeleton Coast.',
      'The diamonds are not heading for Amsterdam or Tel Aviv. They are being traded to Aegis-Atlantis Marine Security for crates of tactical assault rifles, military radar stations, and electronic jammers landed at Alexander Bay. The guns are bound south for Cape Town to arm private protection syndicates.',
      'Before you prime your dive tanks and fuel your 4x4 bakkie, you must lock in your tradecraft.',
    ],
    isBackgroundSelect: true,
    options: [
      {
        id: 'opt_choose_diver',
        label: 'The Deep Sea Diver (Street +2, Dockets +1, Artisanal Divers Alliance)',
        nextSceneNodeId: 'namaqua_scene_2_contact',
        setBackgroundId: 'deep_sea_diver',
        responseLog:
          'You test the dual regulator on your steel scuba cylinder and buckle your heavy titanium dive knife to your calf.',
      },
      {
        id: 'opt_choose_tracker',
        label: 'The Kalahari Desert Tracker (Dockets +2, Street +1, Kalahari Runner Favor)',
        nextSceneNodeId: 'namaqua_scene_2_contact',
        setBackgroundId: 'kalahari_tracker',
        cashDelta: 200,
        responseLog:
          'You roll out your topo maps of the Richtersveld gorges and inspect the tire deflation kit for your 4x4.',
      },
      {
        id: 'opt_choose_naval',
        label: 'The Ex-Naval Infiltrator (Wire +2, Influence +1, Coastal Radar Ciphers)',
        nextSceneNodeId: 'namaqua_scene_2_contact',
        setBackgroundId: 'ex_naval_infiltrator',
        cashDelta: 350,
        responseLog:
          'You boot your ruggedized Panasonic Toughbook, syncing the naval hydrophone frequencies off the coast.',
      },
    ],
  },

  namaqua_scene_2_contact: {
    id: 'namaqua_scene_2_contact',
    timestamp: '02:35 SAST // VHF CHANNEL 16 SHORTWAVE',
    speaker: 'Tannie Bettie van Zyl',
    speakerRole: 'Port Nolloth Fish Market Doyenne (VHF Comm)',
    paragraphs: [
      'A squawk of static breaks the quiet on your modified marine VHF transceiver. The voice is gravelly, steady, and sharp as a filleting knife: Tannie Bettie, speaking from the ice room behind the fish cleaning stalls.',
      '"Giepie? Don’t key your mic for more than three seconds. An Aegis gunboat entered the harbor channel under the fog blanket twenty minutes ago. They offloaded four heavy crates at the north slipway and loaded them onto a camouflaged Mercedes truck."',
      '"Colonel Petrov’s men are sweeping the gravel roads toward the Orange River. If they link up with the Namibian border runners at the pontoon tonight, those weapons will be in the Western Cape before the magistrate wakes up. What’s your move, seuntjie?"',
    ],
    options: [
      {
        id: 'opt_bettie_sonar',
        label: '“I have the bathymetric seabed logs. I’ll dive the dredge trenches and prove they’re stealing state diamonds.”',
        nextSceneNodeId: 'namaqua_scene_3_launch',
        statCheck: { stat: 'dockets', threshold: 1 },
        clockDelta: { clockId: 'admiralty_investigation', delta: 1 },
        responseLog:
          'Tannie Bettie confirms the dredge coordinates: "Look for buoy Bravo-Four. The suction scars are fresh."',
      },
      {
        id: 'opt_bettie_strike',
        label: '“Tell Swartbooi and the desert runners to block the dune pass. We choke their fuel lines.”',
        nextSceneNodeId: 'namaqua_scene_3_launch',
        statCheck: { stat: 'street', threshold: 1 },
        composureDelta: 10,
        responseLog:
          'You dispatch a shortwave burst to the Kalahari runners to prepare roadblock obstacles.',
      },
      {
        id: 'opt_bettie_wire',
        label: '“I’m spoofing the naval radar at Alexander Bay. We blind their coastal interceptors.”',
        nextSceneNodeId: 'namaqua_scene_3_launch',
        statCheck: { stat: 'wire', threshold: 1 },
        composureDelta: 15,
        responseLog:
          'You upload false radar echoes into the Aegis-Atlantis automated receiver tower.',
      },
    ],
  },

  namaqua_scene_3_launch: {
    id: 'namaqua_scene_3_launch',
    timestamp: '02:55 SAST // SKELETON COAST DAWN',
    paragraphs: [
      'You step out through the container door into the stinging sea spray. The Atlantic swells thunder against the breakwater with rhythmic, bone-shaking force.',
      'To the west, the freezing ocean hides billions in illicit alluvial diamonds under shifting seabed gravel. To the east, the jagged black mountains of the Richtersveld carve into the starlit sky like fractured moon rock.',
      'The corrupt energy barons in Durban and Johannesburg thought they could bury their crimes in the desert sand. They forgot who owns this coast.',
      'It’s time to hunt.',
    ],
    options: [
      {
        id: 'opt_launch_namaqua_map',
        label: 'COMMENCE NAMAQUA INVESTIGATION (ENTER NORTHERN CAPE MAP)',
        nextSceneNodeId: 'END_PROLOGUE',
        responseLog:
          'You engage four-wheel drive and pull out onto the misty coastal track. Case File #204-NC is now LIVE.',
      },
    ],
  },
};
