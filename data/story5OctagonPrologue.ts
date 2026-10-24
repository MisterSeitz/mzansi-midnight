import { CharacterBackground, PrologueSceneNode } from '../types/prologue';

export const OCTAGON_CHARACTER_BACKGROUNDS: Record<string, CharacterBackground> = {
  taskforce_commander_nandi: {
    id: 'taskforce_commander_nandi',
    title: 'Captain Nandi Mthembu (Taskforce Director)',
    formerUnit: 'Directorate for Priority Crime Investigation // Special Anti-Corruption Vanguard',
    tagline: 'Master of constitutional indictments, high-level state capture dockets, and high court subpoenas.',
    description:
      'Having exposed state corruption from Durban to the Highveld, you hold the legal authority and iron will to bring down the eight oligarchs under constitutional law.',
    stats: {
      street: 0,
      dockets: 2,
      wire: 0,
      influence: 2,
    },
    startingCash: 1500,
    factionBonus: {
      factionId: 'constitutional_court_guard',
      delta: 1,
    },
  },
  taskforce_strike_gideon: {
    id: 'taskforce_strike_gideon',
    title: 'Gideon Brand (Tactical Vanguard Lead)',
    formerUnit: 'Special Forces 4 Reconnaissance Regiment // Covert Interdiction Wing',
    tagline: 'Expert in kinetic bunker breaches, helicopter convoy interdictions, and military-grade electronic warfare.',
    description:
      'Forged in deep-cover naval and desert operations across Namaqualand, you lead the frontline assault against Swart’s private army and mercenary gunships.',
    stats: {
      street: 2,
      dockets: 1,
      wire: 1,
      influence: 0,
    },
    startingCash: 1100,
    factionBonus: {
      factionId: 'united_hawks_taskforce',
      delta: 1,
    },
  },
  taskforce_intelligence_leila: {
    id: 'taskforce_intelligence_leila',
    title: 'Leila Hendricks (SIGINT & Cyber Director)',
    formerUnit: 'Crime Intelligence Directorate // National Signals Intercept Bureau',
    tagline: 'Pioneer of SCADA network counter-warfare, satellite downlink cracking, and financial forensic tracking.',
    description:
      'Having unraveled the shadow syndicates of the Cape, you control the airwaves, intercepting satellite feeds and neutralizing SCADA trojans before the grid collapses.',
    stats: {
      street: 1,
      dockets: 1,
      wire: 2,
      influence: 0,
    },
    startingCash: 1250,
    factionBonus: {
      factionId: 'national_grid_command',
      delta: 1,
    },
  },
};

export const OCTAGON_PROLOGUE_NODES: Record<string, PrologueSceneNode> = {
  prologue_octagon_intro: {
    id: 'prologue_octagon_intro',
    timestamp: '23:15 SAST // DRAKENSBERG COMMAND BUNKER',
    speaker: 'Captain Nandi Mthembu',
    speakerRole: 'Director, United Hawks Taskforce',
    paragraphs: [
      'Thunder echoes across the snow-dusted amphitheater of the Drakensberg mountains. Deep beneath thousands of feet of volcanic basalt, emergency red warning beacons pulse in the decommissioned military command redoubt.',
      'Across four provinces, the conspiracy has culminated into one catastrophic apex: Operation Midnight Sun. In forty-five minutes, at 00:00 SAST, the Sovereign Octagon will trigger a total Stage 8 black-sky collapse across the Apollo national transmission grid, plunging fifty-five million citizens into darkness while private mercenary syndicates seize the Union Buildings and Parliament.',
      'The regional files—Durban water cartels, Highveld coal syndicates, Namaqua naval arms, and Cape Town underworld networks—all converge onto eight conspirators seated in the Karoo mountain redoubt.',
    ],
    options: [
      {
        id: 'opt_octagon_examine_grid',
        label: 'Inspect the National Grid Frequency Teletype and SCADA Alerts',
        nextSceneNodeId: 'prologue_octagon_choice',
        composureDelta: 5,
        responseLog:
          'Hertz frequencies at Apollo are dropping rapidly toward the 47.5 Hz tripping threshold.',
      },
      {
        id: 'opt_octagon_scan_mercenary_airspace',
        label: 'Sweep National Radar Arrays for Unmarked Mercenary Gunships',
        nextSceneNodeId: 'prologue_octagon_choice',
        clockDelta: { clockId: 'airspace_radar_jamming', delta: 1 },
        responseLog:
          'Heavy transport helicopters are airborne from secret private airstrips across the Free State and Waterberg.',
      },
    ],
  },

  prologue_octagon_choice: {
    id: 'prologue_octagon_choice',
    timestamp: '23:30 SAST // TASKFORCE WAR ROOM',
    paragraphs: [
      'The command console displays secure feeds from Pretoria, Johannesburg, Durban, Namaqualand, and Cape Town. Nandi, Gideon, and Leila stand over the illuminated topographic map of South Africa.',
      'Every decision in this war room will determine who leads the frontline breach into the Sovereign Octagon’s national architecture. Which operational doctrine will guide the Taskforce command?',
    ],
    isBackgroundSelect: true,
    options: [
      {
        id: 'opt_bg_taskforce_nandi',
        label: 'Command: Captain Nandi Mthembu — Judicial & Constitutional Authority (+2 Dockets, +2 Influence)',
        nextSceneNodeId: 'prologue_octagon_launch',
        setBackgroundId: 'taskforce_commander_nandi',
        responseLog:
          'You unlock the Supreme Court sealed warrants, ready to arrest the conspirators under high treason statutes.',
      },
      {
        id: 'opt_bg_taskforce_gideon',
        label: 'Command: Gideon Brand — Deep Tactical Strike & Kinetic Assault (+2 Street, +1 Wire, +1 Dockets)',
        nextSceneNodeId: 'prologue_octagon_launch',
        setBackgroundId: 'taskforce_strike_gideon',
        responseLog:
          'You rack a Milkor grenade launcher and distribute encrypted satellite radios to the strike teams.',
      },
      {
        id: 'opt_bg_taskforce_leila',
        label: 'Command: Leila Hendricks — Cyber-SIGINT & SCADA Counter-Warfare (+2 Wire, +1 Dockets, +1 Street)',
        nextSceneNodeId: 'prologue_octagon_launch',
        setBackgroundId: 'taskforce_intelligence_leila',
        responseLog:
          'You deploy quantum decryption subroutines against Apollo SCADA frequencies, establishing national wire intercepts.',
      },
    ],
  },

  prologue_octagon_launch: {
    id: 'prologue_octagon_launch',
    timestamp: '23:45 SAST // EMERGENCY BROADCAST COUNTDOWN',
    speaker: 'Deputy Chief Justice Sindi Sithole',
    speakerRole: 'Constitutional Court of South Africa (Encrypted Satellite Link)',
    paragraphs: [
      '"Taskforce, listen to me. The Chief Justice has placed the Republic under Judicial Protection Order 1. The Executive has been compromised by the Octagon’s inner circle."',
      '"At midnight, Lord Sterling and General Swart will broadcast an emergency decree dissolving our constitutional democracy under the pretext of grid failure."',
      '"You have the consolidated evidence. Secure the Union Buildings, sever Apollo SCADA controls, rally the people, and breach the summit chamber before South Africa falls into permanent shadow."',
    ],
    options: [
      {
        id: 'opt_octagon_commence_operation',
        label: 'Authorize Operation Midnight Reckoning and Deploy Across the Republic',
        nextSceneNodeId: 'done',
        responseLog:
          'The bunker blast doors unlock as tactical aircraft and communications arrays roar to life.',
      },
    ],
  },
};
