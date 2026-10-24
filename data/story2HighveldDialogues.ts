import type { ContactDialogueTree } from './contactDialogues';

export const HIGHVELD_CONTACT_DIALOGUES: Record<string, ContactDialogueTree> = {
  h7_siu_headquarters: {
    nodeId: 'h7_siu_headquarters',
    contactName: 'Advocate Nomsa Khumalo',
    contactRole: 'SIU Lead Prosecutor',
    avatar: '/assets/characters/khumalo.jpg',
    factionId: 'siu_clean_hands',
    rootNodeId: 'khumalo_root',
    nodes: {
      khumalo_root: {
        id: 'khumalo_root',
        speakerMood: 'Stern, exhausted, sorting air-gapped financial affidavits',
        paragraphs: [
          '"Bra K. You shouldn’t be walking in the front entrance of the High Court. General Sithole has cameras trained on Madiba Street."',
          '"The Special Tribunal is sitting tomorrow. If we have the physical coal slurry samples and the signed sabotage directive, I will issue the Section 205 freeze orders on Sandton Arbitrage. If we don’t, Helena Van Niekerk’s lawyers will have our entire taskforce disbanded by sunset."',
        ],
        responses: [
          {
            id: 'resp_khumalo_slurry',
            label: 'Present Diluted Coal Slurry Samples from Kendon Depot',
            nextNodeId: 'khumalo_slurry_accepted',
            requiredStat: { stat: 'dockets', min: 2 },
            rewardId: 'rew_khumalo_warrants',
            rewardSummary: '+2 SIU Tribunal Docket progress & R600 witness protection stipend',
            effect: {
              clockProgress: [{ clockId: 'siu_tribunal_docket', delta: 2 }],
              cashDelta: 600,
              narrativeLog:
                'Advocate Khumalo seals the coal slurry jars in forensic evidence bags. The laboratory certificates are irrefutable.',
            },
          },
          {
            id: 'resp_khumalo_lerato',
            label: '“Tell me what you know about the night Lerato was killed on the M1.”',
            nextNodeId: 'khumalo_lerato_truth',
          },
          {
            id: 'resp_khumalo_exit',
            label: '“I’ll gather more evidence before the tribunal convenes.”',
            nextNodeId: 'EXIT',
          },
        ],
      },
      khumalo_slurry_accepted: {
        id: 'khumalo_slurry_accepted',
        speakerMood: 'Vindicated, signing urgent subpoena warrants',
        paragraphs: [
          '"This is it, Kagiso. The mineral composition proves this isn’t power-station coal—it’s discard mud mined from uncertified private pits in Witbank. They charged the state R1,400 a ton for waste rock, deliberately wrecked the pulverizer mills, and billed another R800 million in emergency diesel."',
          '"I’m issuing emergency summons for General Sithole and Helena Van Niekerk right now. Watch your back—when they see the court marshals moving, they will send everything they have."',
        ],
        responses: [
          {
            id: 'resp_khumalo_next',
            label: '“We finish this in court, Nomsa.”',
            nextNodeId: 'khumalo_root',
          },
        ],
      },
      khumalo_lerato_truth: {
        id: 'khumalo_lerato_truth',
        speakerMood: 'Somber, lowering her voice',
        paragraphs: [
          '"Lerato walked into my office three days before she died. She showed me the purchase orders: the emergency diesel was being ordered through a BVI shell company called Sovereign Pearl. The beneficial owner was listed under an encrypted code-word: PROJECT MIDAS."',
          '"She knew General Sithole was monitoring her calls. She begged me not to log the file on the court network. I promised I would protect her, Bra K. I failed her. But by God, I will not fail her brother."',
        ],
        responses: [
          {
            id: 'resp_khumalo_vow',
            label: '“We bring them all down together.”',
            nextNodeId: 'khumalo_root',
            effect: {
              composureDelta: 15,
              narrativeLog: 'Shared resolve with Advocate Khumalo bolsters your composure.',
            },
          },
        ],
      },
    },
  },

  h2_sandton_tower: {
    nodeId: 'h2_sandton_tower',
    contactName: 'Helena Van Niekerk',
    contactRole: 'Managing Director, Sandton Energy Arbitrage',
    avatar: '/assets/characters/helena.jpg',
    factionId: 'sandton_arbitrage',
    rootNodeId: 'helena_root',
    nodes: {
      helena_root: {
        id: 'helena_root',
        speakerMood: 'Cold, elegant, sipping espresso overlooking the Sandton skyline',
        paragraphs: [
          '"Mr. Molefe. My security team tells me you’ve been asking very dangerous questions at the Hillbrow substation."',
          '"You have your sister’s stubbornness. But Lerato never understood how this country actually functions. When the state cannot keep the lights on, capital fills the void. We don’t break the grid, Kagiso—we merely price the risk."',
        ],
        responses: [
          {
            id: 'resp_helena_confront_trades',
            label: 'Confront her with Bloomberg forward trade tickets',
            nextNodeId: 'helena_threat',
            requiredStat: { stat: 'wire', min: 2 },
            requiredItem: 'evidence_bloomberg_substation_telemetry',
            rewardId: 'rew_helena_hushmoney',
            rewardSummary: 'Extort R2,500 corporate settlement & unlock Midas clue',
            effect: {
              cashDelta: 2500,
              clockProgress: [{ clockId: 'crack_midas_coldstorage', delta: 1 }],
              narrativeLog:
                'Helena’s composure cracks. She authorizes an untraceable R2,500 escrow wire to your Swiss burner account.',
            },
          },
          {
            id: 'resp_helena_bribe_offer',
            label: '“What is your price to walk away from General Sithole?”',
            nextNodeId: 'helena_proposal',
            requiredStat: { stat: 'influence', min: 2 },
          },
          {
            id: 'resp_helena_exit',
            label: '“We’ll see what the Special Tribunal says about your trades, Helena.”',
            nextNodeId: 'EXIT',
          },
        ],
      },
      helena_threat: {
        id: 'helena_threat',
        speakerMood: 'Shaken but calculating, setting down her porcelain cup',
        paragraphs: [
          '"You’re more capable than your late sister, Mr. Molefe. Very well. Let us be pragmatic."',
          '"The diesel money doesn’t stay in Johannesburg. It travels west, through the desert ports of Namaqualand. If you take this to court, General Sithole will bury you in a mine shaft before you can testify. Take your payout, Kagiso. Buy a house in Camps Bay and let the Highveld burn."',
        ],
        responses: [
          {
            id: 'resp_helena_refuse',
            label: '“Your money won’t buy you out of a 25-year sentence.”',
            nextNodeId: 'helena_root',
          },
        ],
      },
      helena_proposal: {
        id: 'helena_proposal',
        speakerMood: 'Intrigued, gesturing to the panoramic glass wall',
        paragraphs: [
          '"General Sithole is a blunt instrument. A soldier playing with switches. He thinks power comes from having men with R5 rifles in unmarked bakkies."',
          '"Real power is liquidity. If you help me isolate Sithole before the tribunal acts, I can grant you 15% equity in our offshore maritime holding company. We convert the cash into rough stones in Port Nolloth. Uncut diamonds have no serial numbers, Bra K."',
        ],
        responses: [
          {
            id: 'resp_helena_consider',
            label: '“Tell me more about the diamond pipeline in Namaqualand.”',
            nextNodeId: 'helena_root',
            effect: {
              clockProgress: [{ clockId: 'crack_midas_coldstorage', delta: 1 }],
              narrativeLog: 'Helena hints at the clandestine dredging concessions operating in the Northern Cape.',
            },
          },
        ],
      },
    },
  },

  h3_hillbrow_substation: {
    nodeId: 'h3_hillbrow_substation',
    contactName: 'Vusi "Dynamite" Sithole',
    contactRole: 'Red Guard Union Strike Marshal',
    avatar: '/assets/characters/vusi.jpg',
    factionId: 'red_guard_populists',
    rootNodeId: 'vusi_root',
    nodes: {
      vusi_root: {
        id: 'vusi_root',
        speakerMood: 'Aggressive, smoke-stained, adjusting a red beret behind razor wire',
        paragraphs: [
          '"Bra K! The municipal engineers ran away an hour ago. The private security cartels brought three unmarked Toyota Hilux bakkies to the north fence."',
          '"They want this transformer to blow. When Hillbrow goes dark, the hospitals lose power, the food spoils in the shops, and the rich people in Sandton turn on their generators and laugh at us. We are holding the gates with iron bars and petrol bombs."',
        ],
        responses: [
          {
            id: 'resp_vusi_scada_key',
            label: 'Hand over SCADA Bypass Key to secure the control room',
            nextNodeId: 'vusi_defended',
            requiredStat: { stat: 'wire', min: 1 },
            requiredItem: 'gear_substation_scada_key',
            rewardId: 'rew_vusi_red_escort',
            rewardSummary: 'Red Guard armed street escort (+2 Street, -2 Sabotage clock)',
            effect: {
              clockProgress: [{ clockId: 'megawatt_sabotage', delta: -2 }],
              factionRepDelta: [{ factionId: 'red_guard_populists', delta: 3 }],
              narrativeLog:
                'Vusi plugs in the bypass key, locking down the breaker panel. The saboteurs flee into the night.',
            },
          },
          {
            id: 'resp_vusi_strike',
            label: '“If we expose the coal cartel, can you shut down the Kendon coal depot?”',
            nextNodeId: 'vusi_strike_plan',
            requiredStat: { stat: 'street', min: 2 },
          },
          {
            id: 'resp_vusi_exit',
            label: '“Hold the gates, Vusi. I’m hunting the people who gave the order.”',
            nextNodeId: 'EXIT',
          },
        ],
      },
      vusi_defended: {
        id: 'vusi_defended',
        speakerMood: 'Triumphant, pumping an iron wrench into the air',
        paragraphs: [
          '"Transformer 3 is holding! You saved the block, Bra K. The Red Guard stands with you. Any of Sithole’s surveillance rats come near Braamfontein, we’ll drag them out of their cars ourselves."',
        ],
        responses: [
          {
            id: 'resp_vusi_back',
            label: '“Stay alert. They’ll try again at Kendon.”',
            nextNodeId: 'vusi_root',
          },
        ],
      },
      vusi_strike_plan: {
        id: 'vusi_strike_plan',
        speakerMood: 'Fierce, leaning over a burning barrel',
        paragraphs: [
          '"Say the word, comrade. We have four thousand truck drivers in Mpumalanga waiting for the signal. If we block the N4 and N12 coal corridors, not a single kilogram of waste rock reaches the boilers."',
          '"We can force the government to confiscate the private diesel fleets under emergency civilian decree. Give us the proof, Bra K, and we will shut this country down until the thieves are in chains."',
        ],
        responses: [
          {
            id: 'resp_vusi_commit',
            label: '“Get your marshals ready for the Kendon depot showdown.”',
            nextNodeId: 'vusi_root',
            effect: {
              composureDelta: 10,
              narrativeLog: 'Vusi commits the union strike brigades to the final standoff at Kendon Depot.',
            },
          },
        ],
      },
    },
  },

  h4_witwatersrand_shaft: {
    nodeId: 'h4_witwatersrand_shaft',
    contactName: 'Mkhulu "Ghost" Sibanyoni',
    contactRole: 'Zama-Zama Mining Elder',
    avatar: '/assets/characters/mkhulu.jpg',
    factionId: 'reef_zamazamas',
    rootNodeId: 'mkhulu_root',
    nodes: {
      mkhulu_root: {
        id: 'mkhulu_root',
        speakerMood: 'Weathered, covered in gold dust, sitting on a wooden dynamite crate',
        paragraphs: [
          '"Welcome back to the belly of Johannesburg, Kagiso. Up on the surface, they think the gold ran out fifty years ago. Down here at Level 18, we take twenty grams a day with hammer and chisel."',
          '"The coal cartel has been paying my boys in stolen fuel to store fifty thousand litres of diesel in the old haulage stopes. The fumes are thick enough to kill a man without a respirator. What brings the auditor underground?"',
        ],
        responses: [
          {
            id: 'resp_mkhulu_diesel_cache',
            label: 'Ask Mkhulu to pinpoint the cartel’s hidden fuel drums',
            nextNodeId: 'mkhulu_fuel_revealed',
            requiredStat: { stat: 'street', min: 1 },
            rewardId: 'rew_mkhulu_stope_access',
            rewardSummary: 'Receive Crown Mines Stope Map & R1,200 raw gold advance',
            effect: {
              addInventoryItem: 'evidence_zamazama_reef_map',
              cashDelta: 1200,
              narrativeLog:
                'Mkhulu gives you the hand-drawn stope map and R1,200 in raw unrefined gold nuggets.',
            },
          },
          {
            id: 'resp_mkhulu_rockfall_warning',
            label: '“How unstable is the rock face at Level 14?”',
            nextNodeId: 'mkhulu_safety_talk',
          },
          {
            id: 'resp_mkhulu_exit',
            label: '“Watch the ventilation, Mkhulu. I need to get back to the surface.”',
            nextNodeId: 'EXIT',
          },
        ],
      },
      mkhulu_fuel_revealed: {
        id: 'mkhulu_fuel_revealed',
        speakerMood: 'Nodding grimly, spitting red snuff onto the quartzite floor',
        paragraphs: [
          '"Follow the drainage ditch on Level 14 toward the old Robinson Deep connection. You’ll find sixty red drums marked with Megawatt Logistics stencils. General Sithole’s men bring them down in the cage at midnight."',
          '"Take whatever proof you need, Kagiso. Just remember: down here, the rock makes no deals with anyone. When the ceiling cracks, it takes the innocent and the guilty alike."',
        ],
        responses: [
          {
            id: 'resp_mkhulu_thanks',
            label: '“Thank you, elder. Stay safe in the stopes.”',
            nextNodeId: 'mkhulu_root',
          },
        ],
      },
      mkhulu_safety_talk: {
        id: 'mkhulu_safety_talk',
        speakerMood: 'Cautious, glancing at the trembling wooden timber props',
        paragraphs: [
          '"The ground is angry. When they blast the substations on the surface, the shockwaves travel down the faults. Two days ago, a rockburst took down forty metres of tunnel near Shaft 5."',
          '"If you’re working down here, never travel without a Dräger respirator. If the air smells like sweet rotten eggs, run for the cage and don’t look back."',
        ],
        responses: [
          {
            id: 'resp_mkhulu_noted',
            label: '“I understand. I’ll keep my respirator close.”',
            nextNodeId: 'mkhulu_root',
          },
        ],
      },
    },
  },

  h5_union_buildings: {
    nodeId: 'h5_union_buildings',
    contactName: 'General Sibusiso Sithole',
    contactRole: 'Chief of Special Operations, National Intelligence Agency',
    avatar: '/assets/characters/sithole.jpg',
    factionId: 'neutral',
    rootNodeId: 'sithole_root',
    nodes: {
      sithole_root: {
        id: 'sithole_root',
        speakerMood: 'Imposing, menacing, sitting behind an oak desk under the national crest',
        paragraphs: [
          '"Molefe. You have extraordinary nerve walking into my briefing room in Pretoria."',
          '"You think you’re conducting a criminal investigation. You don’t understand national security. When the power stations fail, the state faces anarchy. My operations guarantee that when the lights go out, there is fuel in the tanks and money in the right hands."',
        ],
        responses: [
          {
            id: 'resp_sithole_accuse',
            label: 'Accuse him of ordering Lerato’s assassination on the M1',
            nextNodeId: 'sithole_threat_response',
            requiredStat: { stat: 'dockets', min: 2 },
            requiredItem: 'evidence_nia_sabotage_order',
            rewardId: 'rew_sithole_confession',
            rewardSummary: 'Extract verbal confession (+3 SIU Tribunal progress, unlocks finale)',
            effect: {
              clockProgress: [{ clockId: 'siu_tribunal_docket', delta: 3 }],
              composureDelta: 20,
              narrativeLog:
                'You slam the signed Black-Sky directive on Sithole’s desk. He smirks, openly admitting his complicity.',
            },
          },
          {
            id: 'resp_sithole_surveillance',
            label: '“The Hawks and the Special Tribunal have your Swiss bank accounts, General.”',
            nextNodeId: 'sithole_bluff',
            requiredStat: { stat: 'influence', min: 2 },
          },
          {
            id: 'resp_sithole_exit',
            label: '“Enjoy your office while you still have it, Sithole.”',
            nextNodeId: 'EXIT',
          },
        ],
      },
      sithole_threat_response: {
        id: 'sithole_threat_response',
        speakerMood: 'Cruel, leaning forward with cold contempt',
        paragraphs: [
          '"Your sister was a clerk who thought legal statutes could govern a collapsing continent. She was given three chances to sign the emergency variance. She refused. In my world, that is treason."',
          '"And now you’re here, holding paper in front of a man who commands two thousand armed operators. Take a good look around Pretoria, Molefe. You won’t live to see the morning tribunal."',
        ],
        responses: [
          {
            id: 'resp_sithole_done',
            label: '“We’ll see who is standing when the sun rises.”',
            nextNodeId: 'sithole_root',
          },
        ],
      },
      sithole_bluff: {
        id: 'sithole_bluff',
        speakerMood: 'Narrowing his eyes, calculating the threat',
        paragraphs: [
          '"The Tribunal is toothless. A collection of retired judges making speeches while the grid dies. Even if you freeze the Sandton accounts, Project Midas is already liquid."',
          '"The money has already moved south. Diamonds don’t leave digital footprints in the reserve bank. But perhaps... you’re smarter than your sister. What would it take to buy your badge back, Molefe?"',
        ],
        responses: [
          {
            id: 'resp_sithole_reject',
            label: '“My sister’s life has no price, General.”',
            nextNodeId: 'sithole_root',
          },
        ],
      },
    },
  },
};
