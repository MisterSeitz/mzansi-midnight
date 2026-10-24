import { CharacterBackground, PrologueSceneNode } from '../types/prologue';

export const HIGHVELD_CHARACTER_BACKGROUNDS: Record<string, CharacterBackground> = {
  siu_whistleblower: {
    id: 'siu_whistleblower',
    title: 'The SIU Whistleblower',
    formerUnit: 'Special Investigating Unit (Pretoria Commercial Crimes)',
    tagline: 'DOCKETS +2 // WIRE +1 // INFLUENCE 0 // STREET -1',
    description:
      'You built the forensic audit that proved Eskom’s coal conveyors were cut with thermite charges. When Lerato was killed on the M1, you copied the cold database to an air-gapped flash drive and vanished into the Highveld fog.',
    stats: {
      dockets: 2,
      wire: 1,
      street: -1,
      influence: 0,
    },
    startingCash: 850,
    factionBonus: {
      factionId: 'siu_clean_hands',
      delta: 2,
    },
  },

  deep_reef_fixer: {
    id: 'deep_reef_fixer',
    title: 'The Deep Reef Fixer',
    formerUnit: 'Crown Mines Underground Logistics',
    tagline: 'STREET +2 // COMPOSURE 95% // WIRE 0 // INFLUENCE -1',
    description:
      'You know every flooded shaft and unmapped winze beneath Johannesburg’s southern sprawl. When the cartel started hiding diverted diesel drums in the stopes, Mkhulu’s zama-zamas tipped you off before the shooting started.',
    stats: {
      street: 2,
      dockets: 0,
      wire: 0,
      influence: -1,
    },
    startingCash: 1200,
    factionBonus: {
      factionId: 'reef_zamazamas',
      delta: 2,
    },
  },

  nia_ghost: {
    id: 'nia_ghost',
    title: 'The NIA Ghost Operative',
    formerUnit: 'State Security Agency (Covert Technical Operations)',
    tagline: 'INFLUENCE +2 // WIRE +1 // DOCKETS 0 // STREET -1',
    description:
      'You once routed wiretaps for General Sithole’s private intelligence unit before you discovered he was ordering hits on state auditors. You kept your encrypted clearance passes when you went underground.',
    stats: {
      influence: 2,
      wire: 1,
      dockets: 0,
      street: -1,
    },
    startingCash: 950,
    factionBonus: {
      factionId: 'sandton_arbitrage',
      delta: 1,
    },
  },
};

export const HIGHVELD_PROLOGUE_NODES: Record<string, PrologueSceneNode> = {
  highveld_scene_1_intro: {
    id: 'highveld_scene_1_intro',
    timestamp: '01:15 SAST // WINTER BLACKOUT',
    speaker: 'Kagiso "Bra K" Molefe',
    speakerRole: 'Disgraced SIU Forensic Auditor',
    paragraphs: [
      'The Highveld winter smog sits heavy and freezing over the railway tracks of Braamfontein. Below your ninth-floor loft, the shunting yards are silent—Stage 4 load shedding has cut power to the overhead catenaries, leaving Johannesburg drowning in darkness.',
      'Six months ago, your sister Lerato called you from her desk at Megawatt Park. Her hands were shaking over the microphone: "Bra K, the conveyor belts at Kendon didn’t break down. Someone cut them with thermite. They’re buying diesel from an offshore shell trust in Sandton."',
      'Two hours later, her white Polo was forced off the M1 highway near Woodmead. Three shots through the driver’s side window. The police docket disappeared before sunrise.',
      'Tonight, an encrypted satellite ping from Durban lights up your terminal screen: the Sovereign Pearl Trust Deed has been unsealed at Pier 2. The chemical money is flowing straight into Sandton. Before you take to the streets, you must remember who you were before the fire.',
    ],
    isBackgroundSelect: true,
    options: [
      {
        id: 'opt_choose_siu',
        label: 'The SIU Whistleblower (Dockets +2, Wire +1, Clean Hands Favor)',
        nextSceneNodeId: 'highveld_scene_2_contact',
        setBackgroundId: 'siu_whistleblower',
        responseLog:
          'You unlock the air-gapped forensic drive containing Lerato’s raw coal-slurry audit notes.',
      },
      {
        id: 'opt_choose_fixer',
        label: 'The Deep Reef Fixer (Street +2, Cash R1,200, Zama-Zama Alliance)',
        nextSceneNodeId: 'highveld_scene_2_contact',
        setBackgroundId: 'deep_reef_fixer',
        cashDelta: 350,
        responseLog:
          'You lace your steel-toed boots and slip Mkhulu’s brass mine token into your leather jacket.',
      },
      {
        id: 'opt_choose_nia',
        label: 'The NIA Ghost Operative (Influence +2, Wire +1, Executive Clearance)',
        nextSceneNodeId: 'highveld_scene_2_contact',
        setBackgroundId: 'nia_ghost',
        responseLog:
          'You boot the forged State Security bypass dongle, intercepting Pretoria ministerial telemetry.',
      },
    ],
  },

  highveld_scene_2_contact: {
    id: 'highveld_scene_2_contact',
    timestamp: '01:32 SAST // ENCRYPTED COMMS',
    speaker: 'Advocate Nomsa Khumalo',
    speakerRole: 'SIU Lead Prosecutor (Signal Voice Feed)',
    paragraphs: [
      'Your shortwave receiver crackles to life over a scrambled peer-to-peer relay. The voice is clipped, sharp, and exhausted: Advocate Nomsa Khumalo, calling from the basement archives beneath the Pretoria High Court.',
      '"Bra K? Keep your voice down. General Sithole’s cyber-team just pinged your old Braamfontein IP. The Durban dockers leaked the Sovereign Pearl files—Helena Van Niekerk is panicking in Sandton. She’s ordered the cartel to bomb the Hillbrow substation tonight to trigger an emergency diesel buyout."',
      '"If that substation goes down, the grid cascades into Stage 6 and the Minister signs the R2 billion procurement decree. You need to get into Hillbrow before the thermite burns through the transformer coils."',
    ],
    options: [
      {
        id: 'opt_khumalo_dockets',
        label: '“Send me the substation wiring schematics. I’ll splice the telemetry tap myself.”',
        nextSceneNodeId: 'highveld_scene_3_launch',
        statCheck: { stat: 'wire', threshold: 1 },
        clockDelta: { clockId: 'siu_tribunal_docket', delta: 1 },
        responseLog:
          'Nomsa transmits the 88kV SCADA blueprint directly to your burner handset.',
      },
      {
        id: 'opt_khumalo_street',
        label: '“I know the Red Guard pickets in Hillbrow. I’ll have Vusi’s marshals barricade the gates.”',
        nextSceneNodeId: 'highveld_scene_3_launch',
        statCheck: { stat: 'street', threshold: 1 },
        composureDelta: 10,
        responseLog:
          'You send a coded flash message to Vusi "Dynamite" Sithole at the street ranks.',
      },
      {
        id: 'opt_khumalo_caution',
        label: '“Keep the Special Tribunal vault open, Nomsa. I’m bringing you the names of everyone on the M1 that night.”',
        nextSceneNodeId: 'highveld_scene_3_launch',
        composureDelta: 15,
        responseLog:
          'Your determination hardens. You rack the slide of your Beretta and check the battery.',
      },
    ],
  },

  highveld_scene_3_launch: {
    id: 'highveld_scene_3_launch',
    timestamp: '01:50 SAST // THE STREETS BECKON',
    paragraphs: [
      'You step out onto the rooftop of the Braamfontein loft. The smell of sulfur and coal dust blows down from the south, mingling with the biting winter chill. In the distance, the Hillbrow Tower blinks a solitary warning beacon above the dark urban canopy.',
      'To the north, the glass towers of Sandton gleam under private backup generators. To the south, the deep shafts of Crown Mines rumble faintly with subterranean diesel pumps. The stage is set.',
      'It’s time to take back the Highveld.',
    ],
    options: [
      {
        id: 'opt_launch_highveld_map',
        label: 'COMMENCE HIGHVELD INVESTIGATION (ENTER GAUTENG MAP)',
        nextSceneNodeId: 'END_PROLOGUE',
        responseLog:
          'You descend the fire escape into the dark alleys of Braamfontein. Case File #711-GP is now LIVE.',
      },
    ],
  },
};
