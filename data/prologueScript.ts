import { CharacterBackground, PrologueSceneNode } from '../types/prologue';

export const CHARACTER_BACKGROUNDS: Partial<
  Record<CharacterBackground['id'], CharacterBackground>
> = {
  forensic_hawk: {
    id: 'forensic_hawk',
    title: 'The Paper-Trail Auditor',
    formerUnit: 'DPCI (Hawks) Serious Commercial Crime Unit',
    tagline: 'You follow the Rands through shell companies and municipal tenders.',
    description:
      'Brigadier Mokoena framed you when your audit of municipal water-tanker contracts got too close to City Hall. You cannot fight a hit squad head-on, but give you a ledger and a magistrate clerk, and you can bring down an empire.',
    stats: { dockets: 2, influence: 1, street: 0, wire: -1 },
    startingCash: 950,
    factionBonus: { factionId: 'hawks', delta: 1 },
  },
  trt_breacher: {
    id: 'trt_breacher',
    title: 'The Burned Enforcer',
    formerUnit: 'SAPS Tactical Response Team (TRT) — Detached to Hawks',
    tagline: 'You know how Mokoena’s hit squads operate because you used to lead one.',
    description:
      'You kicked down doors from KwaMashu to the Point until you refused an order to stage a shootout at Pier 2. Every taxi boss and station commander knows your face—and respects your trigger discipline.',
    stats: { street: 2, dockets: 1, influence: 0, wire: -1 },
    startingCash: 550,
    factionBonus: { factionId: 'street_syndicate', delta: 1 },
  },
  crime_intel: {
    id: 'crime_intel',
    title: 'The Ghost Wiretapper',
    formerUnit: 'Crime Intelligence Signals & Covert Surveillance',
    tagline: 'Cell-tower dumps, cloned transponders, and off-the-record blackmail.',
    description:
      'You lived in the back of an unmarked panel van listening to cartel bosses whisper to city councillors. When someone wiped the central server and pinned the leak on you, you kept backup drives hidden across the CBD.',
    stats: { wire: 2, influence: 1, dockets: 0, street: -1 },
    startingCash: 800,
    factionBonus: { factionId: 'abasanta', delta: 1 },
  },
};

export const PROLOGUE_NODES: Record<string, PrologueSceneNode> = {
  // BEAT 1: THE WAKE-UP & ARCHETYPE SELECTION
  scene_1_wakeup: {
    id: 'scene_1_wakeup',
    timestamp: '02:04 AM // STAGE 4 LOAD SHEDDING',
    paragraphs: [
      'At two in the morning, the municipal grid dies with a heavy metallic clunk from the substation down on Queen Street. The ceiling fan slows to a halt. Outside your slatted windows, the humid coastal rain hammers the corrugated tin roofs of the Mercury Arcade, lit only by the amber glow of a spaza shop’s diesel generator across the alley.',
      'On your desk sits a half-empty bottle of cane spirits and the suspension letter signed by Brigadier Titus Mokoena six months ago.',
      'Then comes the sound—not on the downstairs buzzer, but three frantic, wet slams against your welded steel Trellidor gate at the top of the fire escape. Before you reach for the 9mm Parabellum under your mattress, remember who you were before Mokoena buried your career:',
    ],
    isBackgroundSelect: true,
    options: [
      {
        id: 'pick_forensic',
        label: 'Select Background: The Paper-Trail Auditor (+2 Dockets, +1 Influence)',
        nextSceneNodeId: 'scene_2_the_door',
        setBackgroundId: 'forensic_hawk',
      },
      {
        id: 'pick_breacher',
        label: 'Select Background: The Burned Enforcer (+2 Street, +1 Dockets)',
        nextSceneNodeId: 'scene_2_the_door',
        setBackgroundId: 'trt_breacher',
      },
      {
        id: 'pick_intel',
        label: 'Select Background: The Ghost Wiretapper (+2 Wire, +1 Influence)',
        nextSceneNodeId: 'scene_2_the_door',
        setBackgroundId: 'crime_intel',
      },
    ],
  },

  // BEAT 2: OPENING THE GATE
  scene_2_the_door: {
    id: 'scene_2_the_door',
    timestamp: '02:06 AM // MERCURY ARCADE CORRIDOR',
    speaker: 'Constable Nandi',
    speakerRole: 'SAPS Rapid Rail & Highway Patrol (Your Former Rookie)',
    paragraphs: [
      'You rack the slide of your Z88 and step to the side of the doorframe. Through the peephole, the emergency rechargeable bulb flickers over a soaked blue SAPS windbreaker.',
      'It’s Constable Nandi—the only rookie in the precinct who refused to sign Mokoena’s false affidavit against you. She is clutching her left ribs, dark blood seeping between her fingers, with a heavy brown manila docket and a cracked smartphone wedged under her arm.',
      '"Warrant..." she gasps, eyes darting toward the stairwell shadow. "Open the gate. Please. Mokoena’s TRT vans just swept past the taxi rank. If my radio transponder is still pinging, they’re two blocks behind me."',
    ],
    options: [
      {
        id: 'opt_wire_kill_radio',
        label: '[WIRE] Rip the battery and GPS module out of her SAPS handset first',
        nextSceneNodeId: 'scene_3_the_ambush',
        statCheck: { stat: 'wire', threshold: 1 },
        clockDelta: { clockId: 'mokoena_sweep', delta: -1 },
        responseLog: 'You pop the casing off her Tetraburst radio and drop the GPS chip into a glass of gin before dragging her inside.',
      },
      {
        id: 'opt_street_clear_alley',
        label: '[STREET] Check the alley sightlines, haul her inside, and padlock the gate',
        nextSceneNodeId: 'scene_3_the_ambush',
        statCheck: { stat: 'street', threshold: 1 },
        composureDelta: 5,
        responseLog: 'You scan the rain-swept roofline—no laser sights or unmarked Golfs yet—and pull her onto the sofa.',
      },
      {
        id: 'opt_standard_pull_in',
        label: 'Unlock the Trellidor and get her onto the kitchen floor',
        nextSceneNodeId: 'scene_3_the_ambush',
        responseLog: 'You haul Nandi inside and bolt the deadlocks as thunder shakes the arcade glass.',
      },
    ],
  },

  // BEAT 3: THE N2 HIGHWAY REVEAL
  scene_3_the_ambush: {
    id: 'scene_3_the_ambush',
    timestamp: '02:14 AM // SAFEHOUSE LIVING ROOM',
    speaker: 'Constable Nandi',
    speakerRole: 'Wounded Whistleblower',
    paragraphs: [
      'You press a clean towel against her side. A 9mm hollow-point grazed her lower ribcage—deep enough to bleed steadily, too dangerous to stitch up at a state hospital where police clerks log every gunshot victim.',
      'Nandi shoves Docket #409 and a blood-smeared smartphone into your hands. "We responded to a Cash-in-Transit heist on the N2 south ramp at midnight. The G4S van was blown open with commercial C4, Warrant. Only there weren’t any cash cassettes inside."',
      'She swallows hard, trembling. "There was a dead municipal auditor handcuffed to the floor cages, and this ledger. Four hundred million Rand in emergency water-tanker tenders routed through Councillor Ma-Sibi’s office straight to Zuko Ndlovu’s port warehouses. When my partner tried to log it over dispatch, Brigadier Mokoena pulled up in an unmarked TRT bakkie... and shot him in the chest."',
    ],
    options: [
      {
        id: 'opt_dockets_inspect',
        label: '[DOCKETS] Flip open Docket #409 and check the treasury authorisation stamps',
        nextSceneNodeId: 'scene_4_the_squeeze',
        statCheck: { stat: 'dockets', threshold: 1 },
        clockDelta: { clockId: 'audit_docket_409', delta: 1 },
        responseLog: 'You spot it immediately: the tender bypassed provincial treasury using a Fake Disaster Declaration signature.',
      },
      {
        id: 'opt_influence_calm_nandi',
        label: '[INFLUENCE] "Breathe, Nandi. Mokoena doesn’t know this flat exists. You’re alive."',
        nextSceneNodeId: 'scene_4_the_squeeze',
        statCheck: { stat: 'influence', threshold: 1 },
        composureDelta: 10,
        responseLog: 'Your steadiness slows her breathing. She gives you the passcode hint the auditor muttered before dying.',
      },
      {
        id: 'opt_ask_phone',
        label: '"Whose phone is this? And who else saw you escape the N2?"',
        nextSceneNodeId: 'scene_4_the_squeeze',
        responseLog: '"The dead auditor’s phone," she whispers. "I rolled down the storm embankment into the sugarcane when the second TRT van arrived."',
      },
    ],
  },

  // BEAT 4: LAUNCHING INTO ACT 1 MAP
  scene_4_the_squeeze: {
    id: 'scene_4_the_squeeze',
    timestamp: '05:45 AM // FIRST LIGHT OVER THE HARBOUR',
    paragraphs: [
      'Nandi passes out on your sofa as the grey coastal dawn bleeds through the blinds. Outside, the first minibus taxis begin honking down on Queen Street.',
      'You have two ticking problems: Nandi’s gunshot wound will turn septic within four days unless you pay an off-the-books surgeon (R1,500), and Brigadier Mokoena’s TRT squads are sweeping the district block by block.',
      'In your hands sits the evidence that links City Hall, SAPS Organized Crime, and the Abasanta Cartel. Your daily dice are ready on the table.',
    ],
    options: [
      {
        id: 'opt_start_game',
        label: 'Step Up to the District Map (Begin Cycle 1)',
        nextSceneNodeId: 'COMPLETE_PROLOGUE',
      },
    ],
  },
};
