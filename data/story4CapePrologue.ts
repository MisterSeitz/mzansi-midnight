import { CharacterBackground, PrologueSceneNode } from '../types/prologue';

export const CAPE_CHARACTER_BACKGROUNDS: Record<string, CharacterBackground> = {
  agu_ballistics_detective: {
    id: 'agu_ballistics_detective',
    title: 'AGU Ballistics Detective',
    formerUnit: 'Western Cape Anti-Gang Unit // Forensic Ballistics Section',
    tagline: 'Expert in projectile rifling striations, crime scene reconstruction, and police corruption.',
    description:
      'You spent eight years in the forensic ballistics lab before your partner was murdered. You know how SAPS weapon registries are manipulated to feed black-market arms into gang wars.',
    stats: {
      street: 1,
      dockets: 2,
      wire: 1,
      influence: 0,
    },
    startingCash: 950,
    factionBonus: {
      factionId: 'agu_renegades',
      delta: 1,
    },
  },
  cape_flats_infiltrator: {
    id: 'cape_flats_infiltrator',
    title: 'Cape Flats Underground Fixer',
    formerUnit: 'Crime Intelligence Directorate // Street Informant Handler',
    tagline: 'Grew up on the courts of Manenberg; speaks fluent Kaaps and knows how street syndicates breathe.',
    description:
      'You know every alleyway, every lookout whistle, and every truce brokered between the 28s and the street bosses. When the shooting starts, you know exactly who authorized the hit.',
    stats: {
      street: 2,
      dockets: 1,
      wire: 1,
      influence: 0,
    },
    startingCash: 800,
    factionBonus: {
      factionId: 'cape_gang_federation',
      delta: 1,
    },
  },
  winelands_forensic_auditor: {
    id: 'winelands_forensic_auditor',
    title: 'Winelands Forensic Auditor',
    formerUnit: 'SARS Illicit Economy Taskforce // Special Trust Investigations',
    tagline: 'Traces high-society family trusts, offshore tax havens, and money laundering through wine estates.',
    description:
      'You spent years auditing the historic family dynasties of Stellenbosch and Constantia. You understand how old money uses private security companies and offshore foundations to bypass the law.',
    stats: {
      street: 0,
      dockets: 2,
      wire: 1,
      influence: 1,
    },
    startingCash: 1200,
    factionBonus: {
      factionId: 'winelands_club',
      delta: 1,
    },
  },
};

export const CAPE_PROLOGUE_NODES: Record<string, PrologueSceneNode> = {
  prologue_cape_intro: {
    id: 'prologue_cape_intro',
    timestamp: '01:42 SAST // CAPE TOWN FORESHORE',
    speaker: 'Leila Hendricks',
    speakerRole: 'Private Investigator & Former Anti-Gang Unit Detective',
    paragraphs: [
      'The Cape Doctor gale howls through the concrete canyons of the Foreshore, driving horizontal rain against the illuminated glass towers of police headquarters.',
      'Six months ago, Detective David Damon was gunned down in an unpaved alleyway behind the Manenberg tenements. The police docket was stamped "Unresolved Gang Crossfire" within forty-eight hours.',
      'Tonight, you finally got your hands on the recovered copper slug from David’s ribcage. You spent three hours beneath an electron microscope in an abandoned safehouse. The lands and grooves don’t lie: the bullet was fired from a customized Glock 17 belonging to Provincial Police Commissioner Andre Swart.',
    ],
    options: [
      {
        id: 'opt_cape_examine_casing',
        label: 'Examine the Ballistics Striation Photos and Crime Scene Notes',
        nextSceneNodeId: 'prologue_cape_choice',
        composureDelta: 5,
        responseLog:
          'You cross-reference the firing pin impression. Swart didn’t just order the hit; he was on the scene.',
      },
      {
        id: 'opt_cape_listen_police_radio',
        label: 'Tune the Scanner to Foreshore Tactical Police Frequencies',
        nextSceneNodeId: 'prologue_cape_choice',
        clockDelta: { clockId: 'general_swart_manhunt', delta: 1 },
        responseLog:
          'Unmarked police vans are already dispatching toward the City Bowl. Swart knows someone breached the evidence locker.',
      },
    ],
  },

  prologue_cape_choice: {
    id: 'prologue_cape_choice',
    timestamp: '02:05 SAST // ABANDONED AGU BUNKER',
    paragraphs: [
      'The safehouse smells of damp concrete, stale filter coffee, and burnt wiring. Before David died, he hid three encrypted flash drives and a stash of specialized gear in the false ceiling.',
      'Who were you before the department turned its back on you, and what tools will you use to bring down the shadow oligarchy?',
    ],
    isBackgroundSelect: true,
    options: [
      {
        id: 'opt_bg_agu_detective',
        label: 'Select: AGU Ballistics Detective (+2 Dockets, +1 Street, +1 Wire)',
        nextSceneNodeId: 'prologue_cape_departure',
        setBackgroundId: 'agu_ballistics_detective',
        responseLog:
          'You pack your precision optical calipers, macro camera lenses, and certified evidence seals.',
      },
      {
        id: 'opt_bg_flats_infiltrator',
        label: 'Select: Cape Flats Underground Fixer (+2 Street, +1 Wire, +1 Dockets)',
        nextSceneNodeId: 'prologue_cape_departure',
        setBackgroundId: 'cape_flats_infiltrator',
        responseLog:
          'You slide a compact Glock into your waistband and slip your burner phone into a radio-shielded pouch.',
      },
      {
        id: 'opt_bg_winelands_auditor',
        label: 'Select: Winelands Forensic Auditor (+2 Dockets, +1 Influence, +1 Wire)',
        nextSceneNodeId: 'prologue_cape_departure',
        setBackgroundId: 'winelands_forensic_auditor',
        cashDelta: 250,
        responseLog:
          'You open an encrypted spreadsheet showing centuries of family trust deeds and offshore wire transfers.',
      },
    ],
  },

  prologue_cape_departure: {
    id: 'prologue_cape_departure',
    timestamp: '02:30 SAST // LONG STREET APPROACH',
    speaker: 'Sergeant Warren Abrahams',
    speakerRole: 'Rogue AGU Contact (Encrypted Voice Note)',
    paragraphs: [
      '"Leila, listen to me carefully. Swart has mobilized private security bouncers along Long Street to secure cash for tonight’s container shipment."',
      '"The container vessel from the Northern Cape is docking at Berth 109 in Table Bay before dawn. It’s carrying four hundred tactical rifles to arm Swart’s private shadow army. If those containers clear the port gates, this city belongs to the Octagon."',
      '"Start on Long Street. Find Zack Rossouw. Break his protection book before Swart’s death squad corners you."',
    ],
    options: [
      {
        id: 'opt_cape_step_into_rain',
        label: 'Step Out into the Howling Cape Gale and Enter Long Street',
        nextSceneNodeId: 'done',
        responseLog:
          'You pull your coat collar against the driving rain and step into the neon-lit shadows of Long Street.',
      },
    ],
  },
};
