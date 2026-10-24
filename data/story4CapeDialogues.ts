import type { ContactDialogueTree } from './contactDialogues';

export const CAPE_CONTACT_DIALOGUES: Record<string, ContactDialogueTree> = {
  c1_long_street_strip: {
    nodeId: 'c1_long_street_strip',
    contactName: 'Zack "The Bull" Rossouw',
    contactRole: 'Long Street Nightclub Security Boss',
    avatar: '/assets/characters/zack.jpg',
    factionId: 'long_street_racket',
    rootNodeId: 'zack_root',
    nodes: {
      zack_root: {
        id: 'zack_root',
        speakerMood: 'Leaning against a chrome velvet rope under the buzzing neon sign of Club Mirage, arms folded across a bulletproof jacket',
        paragraphs: [
          '"Leila Hendricks. You got some nerve showing your face on Long Street on a Saturday night. The whole city knows Swart’s people have an open warrant on your head."',
          '"My boys run the doors from Wale Street to Strand. Every DJ, every cocktail lounge, every strip joint pays their security retainer to us. If you’re looking to start trouble, you’re talking to the wrong guy."',
        ],
        responses: [
          {
            id: 'resp_zack_extortion',
            label: 'Present Evidence of Swart’s Extortion Kickbacks',
            nextNodeId: 'zack_extortion_reveal',
            requiredStat: { stat: 'dockets', min: 1 },
            rewardId: 'rew_zack_intel',
            rewardSummary: '+1 Protection Racket progress & R350 operational cash',
            effect: {
              clockProgress: [{ clockId: 'nightclub_extortion_clock', delta: 1 }],
              cashDelta: 350,
              narrativeLog:
                'You flash the bank deposit slips showing bouncer fees funneled into Swart’s shell company. Zack’s eyes narrow as he realizes he was being skimmed.',
            },
          },
          {
            id: 'resp_zack_flats_warning',
            label: 'Ask about the Weapons Flowing to Cape Flats Gangs',
            nextNodeId: 'zack_arms_warning',
          },
        ],
      },
      zack_extortion_reveal: {
        id: 'zack_extortion_reveal',
        speakerMood: 'Lighting a cigarette with shaking hands, stepping into the club entrance vestibule',
        paragraphs: [
          '"Damn it, Leila... We thought the cash was going toward private security licenses in Pretoria. We had no idea Swart was using us to fund an unsanctioned military unit."',
          '"Listen to me. There is an arms shipment arriving at Table Bay Berth 109 tonight on a freighter called the Cabo Benguela. Four hundred tactical rifles. Swart’s police vans are providing the armed escort."',
        ],
        responses: [
          {
            id: 'resp_zack_back_root',
            label: '“Keep your men off the streets tonight, Zack.”',
            nextNodeId: 'zack_root',
          },
        ],
      },
      zack_arms_warning: {
        id: 'zack_arms_warning',
        speakerMood: 'Looking up and down the neon strip with grim suspicion',
        paragraphs: [
          '"The 28s don’t get their guns from the harbour, Leila. General Swart’s special tactical vans deliver the crates straight to the back alleys of Manenberg to keep the gang wars hot. A hot city justifies a private security army."',
          '"If you want to stop the war, go talk to Pastor Ronnie in Manenberg. He’s the only man alive who can call a truce."',
        ],
        responses: [
          {
            id: 'resp_zack_back_root_2',
            label: '“Understood. I’m heading to the Flats.”',
            nextNodeId: 'zack_root',
          },
        ],
      },
    },
  },

  c2_manenberg_tenements: {
    nodeId: 'c2_manenberg_tenements',
    contactName: 'Pastor Ronald "Uncle Ronnie" Jacobs',
    contactRole: 'Community Peacemaker & Former 28s General',
    avatar: '/assets/characters/ronnie.jpg',
    factionId: 'cape_gang_federation',
    rootNodeId: 'ronnie_root',
    nodes: {
      ronnie_root: {
        id: 'ronnie_root',
        speakerMood: 'Sitting inside a modest church hall beside a soup kitchen boiler, his weathered hands clasped in prayer',
        paragraphs: [
          '"Sister Leila. David spoke of you often before they took him. He was one of the few who wore the police badge with honour."',
          '"These flats are bleeding. The young boys are shooting at shadows because the fear is fed to them daily with fresh crated ammunition. Who authorized this bloodshed?"',
        ],
        responses: [
          {
            id: 'resp_ronnie_ballistics',
            label: 'Show the Ballistics Match Linking Swart to David’s Murder',
            nextNodeId: 'ronnie_ballistics_reveal',
            requiredStat: { stat: 'dockets', min: 1 },
            rewardId: 'rew_ronnie_truce',
            rewardSummary: '-2 Gang Turf War tension & Cape Flats Ceasefire support',
            effect: {
              clockProgress: [{ clockId: 'gang_turf_war_clock', delta: -2 }],
              factionRepDelta: [{ factionId: 'cape_gang_federation', delta: 2 }],
              narrativeLog:
                'Pastor Ronnie looks at the striation analysis. A deep, sorrowful resolve settles over him: "The Commissioner will not use our children as his sacrificial pawns any longer."',
            },
          },
          {
            id: 'resp_ronnie_arms_cache',
            label: 'Ask about the Arms Caches Hidden in the Courts',
            nextNodeId: 'ronnie_cache_info',
          },
        ],
      },
      ronnie_ballistics_reveal: {
        id: 'ronnie_ballistics_reveal',
        speakerMood: 'Standing up, adjusting his pastoral collar with iron dignity',
        paragraphs: [
          '"I have called the gang elders across Hanover Park and Manenberg. We are holding a ceasefire tonight. No shots will be fired in the courts."',
          '"If Swart comes looking for blood, he will find the streets silent and all eyes watching his police vans."',
        ],
        responses: [
          {
            id: 'resp_ronnie_back_root',
            label: '“Thank you, Uncle Ronnie. Justice will be served tonight.”',
            nextNodeId: 'ronnie_root',
          },
        ],
      },
      ronnie_cache_info: {
        id: 'ronnie_cache_info',
        speakerMood: 'Pointing through the window toward the concrete laundry courts',
        paragraphs: [
          '"The crates come in unmarked white ambulances from the Foreshore depot. They drop them at three in the morning when the load-shedding stage turns the streetlights black."',
          '"Swart pays the syndicate captains with conflict diamonds brought down from the Northern Cape. It is all one poisoned river, Leila."',
        ],
        responses: [
          {
            id: 'resp_ronnie_back_root_2',
            label: '“We are going to dam that river tonight.”',
            nextNodeId: 'ronnie_root',
          },
        ],
      },
    },
  },

  c3_camps_bay_promenade: {
    nodeId: 'c3_camps_bay_promenade',
    contactName: 'Baroness Claudine de Villiers',
    contactRole: 'Winelands Heiress & Capital Club Trustee',
    avatar: '/assets/characters/claudine.jpg',
    factionId: 'winelands_club',
    rootNodeId: 'claudine_root',
    nodes: {
      claudine_root: {
        id: 'claudine_root',
        speakerMood: 'Lounging on an expansive ocean-view terrace wrapped in cashmere, a glass of estate Cap Classique in hand as the Atlantic breakers crash below',
        paragraphs: [
          '"Detective Hendricks. Or is it private investigator now? How charmingly persistent you are to track me down to Camps Bay."',
          '"You seem to think the Winelands Capital Club is some crude criminal syndicate. We are merely custodians of generational order, Leila. Governments fall; politicians take bribes. But our land and our investments endure."',
        ],
        responses: [
          {
            id: 'resp_claudine_ledger',
            label: 'Confront her with the Offshore Trust Disbursement Ledgers',
            nextNodeId: 'claudine_ledger_reveal',
            requiredStat: { stat: 'influence', min: 1 },
            rewardId: 'rew_claudine_payoff',
            rewardSummary: '+R1,000 operational capital & +1 Red Cipher progress',
            effect: {
              cashDelta: 1000,
              clockProgress: [{ clockId: 'red_cipher_decryption', delta: 1 }],
              narrativeLog:
                'Claudine’s veneer of aristocratic detachment cracks as you place the Jersey trust documents on the marble table.',
            },
          },
          {
            id: 'resp_claudine_swart',
            label: 'Demand to Know Swart’s Role in The Sovereign Octagon',
            nextNodeId: 'claudine_swart_role',
          },
        ],
      },
      claudine_ledger_reveal: {
        id: 'claudine_ledger_reveal',
        speakerMood: 'Setting her champagne flute down with a sharp click',
        paragraphs: [
          '"You have been busy, haven’t you? Very well. We funded the acquisition of the tactical armaments because we cannot rely on a collapsing state to protect private commerce."',
          '"General Swart is our guarantor on the coast. He ensures the container terminals operate without union interference. Take this settlement and leave the Western Cape before dawn."',
        ],
        responses: [
          {
            id: 'resp_claudine_back_root',
            label: '“Your money won’t buy you immunity when the court convenes.”',
            nextNodeId: 'claudine_root',
          },
        ],
      },
      claudine_swart_role: {
        id: 'claudine_swart_role',
        speakerMood: 'Smiling coldly into the sea mist',
        paragraphs: [
          '"Andre Swart is a brute with a badge, but he understands power. When the national grid goes dark in Operation Midnight Sun, the Octagon will step in to guarantee order."',
          '"You are trying to hold back the tide with a teaspoon, Leila. The Octagon already controls the ports, the mines, and the high command."',
        ],
        responses: [
          {
            id: 'resp_claudine_back_root_2',
            label: '“Every empire thinks it is permanent until the foundation cracks.”',
            nextNodeId: 'claudine_root',
          },
        ],
      },
    },
  },

  c4_table_bay_container_berth: {
    nodeId: 'c4_table_bay_container_berth',
    contactName: 'Cassiem Petersen',
    contactRole: 'Harbour Stevedore Chief Shop Steward',
    avatar: '/assets/characters/cassiem.jpg',
    factionId: 'dockers_union',
    rootNodeId: 'cassiem_root',
    nodes: {
      cassiem_root: {
        id: 'cassiem_root',
        speakerMood: 'Standing in high-visibility overalls on the gantry crane catwalk, rain dripping from his yellow hard hat',
        paragraphs: [
          '"Hendricks! Get off the apron! We’ve got forty-tonne straddle carriers moving containers in the dark with no spreader lights because of Stage 4."',
          '"Management brought in private security from Foreshore to guard Berth 109. They locked our union shop out of the manifest office. Something dirty is coming off that ship."',
        ],
        responses: [
          {
            id: 'resp_cassiem_arms_proof',
            label: 'Show the Manifest Proving Containers Hold Tactical Rifles',
            nextNodeId: 'cassiem_strike_declared',
            requiredStat: { stat: 'dockets', min: 1 },
            rewardId: 'rew_cassiem_blockade',
            rewardSummary: '-2 Sovereign Arms Shipment clock & stevedore dock strike',
            effect: {
              clockProgress: [{ clockId: 'sovereign_arms_shipment', delta: -2 }],
              factionRepDelta: [{ factionId: 'dockers_union', delta: 2 }],
              narrativeLog:
                'Cassiem grips the rail in fury. "We load fruit and auto parts, not weapons for police death squads to kill our sons on the Flats!"',
            },
          },
          {
            id: 'resp_cassiem_gantry_help',
            label: 'Ask for Help Sneaking Aboard the Container Ship',
            nextNodeId: 'cassiem_ship_access',
          },
        ],
      },
      cassiem_strike_declared: {
        id: 'cassiem_strike_declared',
        speakerMood: 'Blowing an industrial emergency air horn across the container apron',
        paragraphs: [
          '"All crane operators! Drop the spreaders and kill the hydraulic pumps! We are shutting down Berth 109 under Section 23 safety regulations!"',
          '"The ship is frozen at the quay, Leila. Swart’s mercenaries can’t move a single container without our drivers."',
        ],
        responses: [
          {
            id: 'resp_cassiem_back_root',
            label: '“Outstanding work, Cassiem. Hold the line.”',
            nextNodeId: 'cassiem_root',
          },
        ],
      },
      cassiem_ship_access: {
        id: 'cassiem_ship_access',
        speakerMood: 'Pointing down a narrow ladder beside the crane leg',
        paragraphs: [
          '"Take crane stairwell four down to the stormwater sluice. It opens right beside the Cabo Benguela’s stern mooring lines."',
          '"Watch for the private mercenaries in tactical fleeces. They have thermal scopes mounted on the container stacks."',
        ],
        responses: [
          {
            id: 'resp_cassiem_back_root_2',
            label: '“Got it. Heading down now.”',
            nextNodeId: 'cassiem_root',
          },
        ],
      },
    },
  },

  c6_agu_safehouse_ruin: {
    nodeId: 'c6_agu_safehouse_ruin',
    contactName: 'Sergeant Warren Abrahams',
    contactRole: 'Rogue AGU Ballistics Specialist',
    avatar: '/assets/characters/warren.jpg',
    factionId: 'agu_renegades',
    rootNodeId: 'warren_root',
    nodes: {
      warren_root: {
        id: 'warren_root',
        speakerMood: 'Working over a field microscope in the charred remnants of the basement office, an R5 assault rifle slung across his back',
        paragraphs: [
          '"Leila, thank God you made it back. Swart sent two tactical teams to my sister’s house in Belhar. The gloves are completely off."',
          '"I’ve been compiling the encrypted evidence files David hid before his murder. We have the complete ballistic footprint, the payout trail, and the communications relay linking Swart to Pretoria."',
        ],
        responses: [
          {
            id: 'resp_warren_assemble_docket',
            label: 'Assemble the Complete Anti-Gang Unit Indictment',
            nextNodeId: 'warren_indictment_ready',
            requiredStat: { stat: 'dockets', min: 1 },
            rewardId: 'rew_warren_ballistics_intel',
            rewardSummary: '+2 Red Cipher Decryption progress & full renegade tactical backup',
            effect: {
              clockProgress: [{ clockId: 'red_cipher_decryption', delta: 2 }],
              factionRepDelta: [{ factionId: 'agu_renegades', delta: 2 }],
              narrativeLog:
                'Warren binds the certified ballistic dockets. "This is David’s voice from the grave. Even the High Court cannot ignore this."',
            },
          },
          {
            id: 'resp_warren_final_assault',
            label: 'Plan the Breach on General Swart’s Headquarters Office',
            nextNodeId: 'warren_assault_plan',
          },
        ],
      },
      warren_indictment_ready: {
        id: 'warren_indictment_ready',
        speakerMood: 'Loading high-capacity magazines into a tactical chest rig',
        paragraphs: [
          '"We’ve got five renegade detectives ready to breach Swart’s Foreshore office on your signal. We will cut the power at the street substation and move up the fire stairs."',
          '"When you enter his office, make sure you download The Red Protocol from his private safe. That cipher is what David died to protect."',
        ],
        responses: [
          {
            id: 'resp_warren_back_root',
            label: '“We move together. For David.”',
            nextNodeId: 'warren_root',
          },
        ],
      },
      warren_assault_plan: {
        id: 'warren_assault_plan',
        speakerMood: 'Spreading an architectural floorplan across a scarred wooden crate',
        paragraphs: [
          '"The nineteenth floor of Police HQ has its own biometric locks and backup diesel generator. But when Stage 4 load shedding hits at 03:00, there’s a ninety-second breaker reboot window."',
          '"That is our only way inside, Leila. If we miss that window, his private security squad will pin us in the elevator shafts."',
        ],
        responses: [
          {
            id: 'resp_warren_back_root_2',
            label: '“We won’t miss it. Synchronize watches.”',
            nextNodeId: 'warren_root',
          },
        ],
      },
    },
  },
};
