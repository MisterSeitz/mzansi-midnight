import type { ContactDialogueTree } from './contactDialogues';

export const OCTAGON_CONTACT_DIALOGUES: Record<string, ContactDialogueTree> = {
  o1_drakensberg_bunker: {
    nodeId: 'o1_drakensberg_bunker',
    contactName: 'Deputy Chief Justice Sindi Sithole',
    contactRole: 'Constitutional Court of South Africa',
    avatar: '/assets/characters/sindi.jpg',
    factionId: 'constitutional_court_guard',
    rootNodeId: 'sithole_root',
    nodes: {
      sithole_root: {
        id: 'sithole_root',
        speakerMood:
          'Seated at a rugged tactical terminal inside the bunker, judicial robes draped over an army-issue flak jacket',
        paragraphs: [
          '"Taskforce. For thirty years, our Constitution was the shield that protected South Africa from tyranny. Tonight, eight men believe they can shatter that shield by cutting the power lines and buying off generals."',
          '"I have signed the sealed Section 179 Special Execution Order. If you place the consolidated evidence in my hands, no court in the Commonwealth can shield Sterling or Swart from high treason charges."',
        ],
        responses: [
          {
            id: 'resp_sithole_consolidate_dockets',
            label: 'Submit the Consolidated Multi-Story Dossier for Constitutional Warrants',
            nextNodeId: 'sithole_warrants_granted',
            requiredStat: { stat: 'dockets', min: 2 },
            rewardId: 'rew_sithole_warrants',
            rewardSummary: '+2 Treason Indictment Docket progress & +15 Composure',
            effect: {
              clockProgress: [{ clockId: 'treason_indictment_docket', delta: 2 }],
              composureDelta: 15,
              narrativeLog:
                'Justice Sithole applies the official Constitutional Court golden seal to the master indictment against the Sovereign Octagon.',
            },
          },
          {
            id: 'resp_sithole_coup_mechanics',
            label: 'Inquire About the Legal Pretext for Operation Midnight Sun',
            nextNodeId: 'sithole_legal_coup_detail',
          },
        ],
      },
      sithole_warrants_granted: {
        id: 'sithole_warrants_granted',
        speakerMood:
          'Handing over authenticated red-ribboned judicial execution warrants',
        paragraphs: [
          '"These warrants give the United Hawks Taskforce supreme arresting jurisdiction anywhere within the territorial borders of South Africa."',
          '"Do not hesitate. If the Apollo grid drops below 47.5 Hz, the military council will declare martial law and suspend all judicial authority. The clock is running."',
        ],
        responses: [
          {
            id: 'resp_sithole_back_root',
            label: '“The Constitution will hold, Justice.”',
            nextNodeId: 'sithole_root',
          },
        ],
      },
      sithole_legal_coup_detail: {
        id: 'sithole_legal_coup_detail',
        speakerMood:
          'Pointing to an encrypted draft of the emergency declaration on the screen',
        paragraphs: [
          '"They drafted an emergency presidential decree citing national blackout chaos under Section 37 of the Constitution. Once signed by their puppet minister in Pretoria, Parliament is automatically prorogued."',
          '"You must reach the subbasement of the Union Buildings and extract Minister Phumzile Mthembu before General Swart’s death squads force his hand."',
        ],
        responses: [
          {
            id: 'resp_sithole_back_root_2',
            label: '“We are moving on the Union Buildings immediately.”',
            nextNodeId: 'sithole_root',
          },
        ],
      },
    },
  },

  o2_union_buildings_subbasement: {
    nodeId: 'o2_union_buildings_subbasement',
    contactName: 'Minister Phumzile Mthembu',
    contactRole: 'Minister in the Presidency & Whistleblower',
    avatar: '/assets/characters/phumzile.jpg',
    factionId: 'united_hawks_taskforce',
    rootNodeId: 'phumzile_root',
    nodes: {
      phumzile_root: {
        id: 'phumzile_root',
        speakerMood:
          'Barricaded inside an underground sandstone vault beneath the Union Buildings, clutch of presidential dispatch files on the table',
        paragraphs: [
          '"Nandi! Thank God you reached Pretoria. Half the Cabinet ministers evacuated to Waterkloof Air Base two hours ago. General Swart’s private security contractors are patrolling the upper executive lawns."',
          '"They brought me an executive order declaring a permanent national energy emergency. They told me that if I didn’t stamp it with the Presidential Seal, my family would vanish."',
        ],
        responses: [
          {
            id: 'resp_phumzile_secure_seal',
            label: 'Demand the Presidential Seal and Counter-Decree',
            nextNodeId: 'phumzile_seal_secured',
            requiredStat: { stat: 'influence', min: 2 },
            rewardId: 'rew_phumzile_seal',
            rewardSummary: '+1 Treason Indictment Docket & R600 emergency contingency fund',
            effect: {
              clockProgress: [{ clockId: 'treason_indictment_docket', delta: 1 }],
              cashDelta: 600,
              narrativeLog:
                'Minister Mthembu hands you the official gold-embossed Presidential Seal and signs an executive counter-directive disavowing Swart’s troops.',
            },
          },
          {
            id: 'resp_phumzile_ask_cabinet_traitors',
            label: 'Identify Which Cabinet Members Are in Lord Sterling’s Pocket',
            nextNodeId: 'phumzile_traitors_list',
          },
        ],
      },
      phumzile_seal_secured: {
        id: 'phumzile_seal_secured',
        speakerMood:
          'Bowing his head in relief as Constitutional Marshals secure the subbasement corridors',
        paragraphs: [
          '"With this seal, Swart’s declaration has zero constitutional standing. Broadcast the counter-order across the SABC frequencies the moment you sever the Apollo blackout."',
          '"Gideon, Leila, take the armored convoy through the Karoo pass. That is where the Octagon is meeting to divide the country."',
        ],
        responses: [
          {
            id: 'resp_phumzile_back_root',
            label: '“Stay locked down until the Taskforce gives the all-clear.”',
            nextNodeId: 'phumzile_root',
          },
        ],
      },
      phumzile_traitors_list: {
        id: 'phumzile_traitors_list',
        speakerMood:
          'Showing an encrypted list of bank accounts routed through Zurich and Mauritius',
        paragraphs: [
          '"Four directors general, the chief of military intelligence, and two provincial premiers were bought through Sovereign Pearl Holdings in Dubai."',
          '"They promised each of them twenty million dollars once the regional utility assets are auctioned off to private foreign consortia."',
        ],
        responses: [
          {
            id: 'resp_phumzile_back_root_2',
            label: '“Their accounts will be frozen tonight.”',
            nextNodeId: 'phumzile_root',
          },
        ],
      },
    },
  },

  o3_apollo_grid_command: {
    nodeId: 'o3_apollo_grid_command',
    contactName: 'Chief Engineer Kabelo Motaung',
    contactRole: 'Apollo Transmission & SCADA Director',
    avatar: '/assets/characters/kabelo.jpg',
    factionId: 'national_grid_command',
    rootNodeId: 'kabelo_root',
    nodes: {
      kabelo_root: {
        id: 'kabelo_root',
        speakerMood:
          'Staring at wall-sized SCADA telemetry screens flashing crimson emergency overload alerts',
        paragraphs: [
          '"The frequency is dropping—48.2 Hz! If it touches 47.5, the automatic trip coils will blow across every power station from Medupi to Koeberg!"',
          '"Someone injected a military-grade logic bomb into our primary fiber-optic multiplexer. The control commands aren’t coming from Eskom Megawatt Park—they’re being relayed from an offshore satellite uplink!"',
        ],
        responses: [
          {
            id: 'resp_kabelo_neutralize_logic_bomb',
            label: 'Deploy Leila’s Counter-SIGINT Script to Sever Offshore SCADA Link',
            nextNodeId: 'kabelo_grid_stabilized',
            requiredStat: { stat: 'wire', min: 2 },
            rewardId: 'rew_kabelo_stabilize',
            rewardSummary: '-2 National Blackout Countdown & +1 Decrypt Master Omega Cipher',
            effect: {
              clockProgress: [
                { clockId: 'national_blackout_countdown', delta: -2 },
                { clockId: 'decrypt_master_omega_cipher', delta: 1 },
              ],
              composureDelta: 10,
              narrativeLog:
                'Chief Engineer Motaung executes the isolated SCADA failsafe bypass, reclaiming manual manual control over the Apollo high-voltage substations.',
            },
          },
          {
            id: 'resp_kabelo_black_start_status',
            label: 'Assess the National Black-Start Turbine Reserves',
            nextNodeId: 'kabelo_black_start_info',
          },
        ],
      },
      kabelo_grid_stabilized: {
        id: 'kabelo_grid_stabilized',
        speakerMood:
          'Wiping cold sweat from his forehead as grid telemetry turns amber-green at 49.8 Hz',
        paragraphs: [
          '"We caught it just in time. The frequency is holding at 49.8 Hz. The national blackout countdown has been halted!"',
          '"We also traced the encrypted heartbeat signal from the malware. It was pinging an underground command bunker situated on the Roggeveld escarpment in the Karoo."',
        ],
        responses: [
          {
            id: 'resp_kabelo_back_root',
            label: '“Keep the manual lockouts armed, Kabelo.”',
            nextNodeId: 'kabelo_root',
          },
        ],
      },
      kabelo_black_start_info: {
        id: 'kabelo_black_start_info',
        speakerMood:
          'Tapping the schematic of the Drakensberg pumped-storage hydroelectric plant',
        paragraphs: [
          '"If the grid collapses completely, a black start takes three to four weeks. During that month of darkness, civilization unravels: no water pumps, no hospital generators, no banking servers."',
          '"That is why the Octagon chose this weapon. They knew South Africa could not survive three weeks without electricity."',
        ],
        responses: [
          {
            id: 'resp_kabelo_back_root_2',
            label: '“We will not let the dark take this country.”',
            nextNodeId: 'kabelo_root',
          },
        ],
      },
    },
  },

  o4_durban_berth_command: {
    nodeId: 'o4_durban_berth_command',
    contactName: 'Bra Bheki & Cassiem Alliance',
    contactRole: 'National Port Resistance Coordinators',
    avatar: '/assets/characters/bheki_cassiem.jpg',
    factionId: 'people_resistance_front',
    rootNodeId: 'bheki_cassiem_root',
    nodes: {
      bheki_cassiem_root: {
        id: 'bheki_cassiem_root',
        speakerMood:
          'Flanked by steelworkers and dockers armed with spanners and flares under the harbor floodlights',
        paragraphs: [
          '"Nandi, Gideon! Durban Harbour and Table Bay are standing shoulder to shoulder tonight. Cassiem called from Cape Town: the stevedores have welded the container gantry rails shut."',
          '"General Swart’s mercenary supply ships are anchored three miles offshore. They’re carrying heavy armored vehicles, ammunition crates, and private radio repeaters. If they dock, the coup has tanks on our streets."',
        ],
        responses: [
          {
            id: 'resp_bheki_mobilize_civil_blockade',
            label: 'Order a Nationwide Harbor & Highway Civil Blockade',
            nextNodeId: 'bheki_blockade_active',
            requiredStat: { stat: 'street', min: 2 },
            rewardId: 'rew_bheki_blockade',
            rewardSummary: '-2 Mercenary Sweep Progress & +20 Composure',
            effect: {
              clockProgress: [{ clockId: 'octagon_mercenary_sweep', delta: -2 }],
              composureDelta: 20,
              narrativeLog:
                'Thousands of dock workers, taxi drivers, and community volunteers form an impenetrable civilian blockade across port gates and national toll routes.',
            },
          },
          {
            id: 'resp_bheki_ask_coastal_arms',
            label: 'Investigate the Offshore Mercenary Ships',
            nextNodeId: 'bheki_ship_details',
          },
        ],
      },
      bheki_blockade_active: {
        id: 'bheki_blockade_active',
        speakerMood:
          'Cheering over the blare of cargo tugboat horns ringing across the bay',
        paragraphs: [
          '"Not a single crate is moving! The crane operators cut the main hoist cables, and the pilots refused to guide the mercenary freighters into the channel."',
          '"The working people of this country have drawn the line. Now go finish it at their mountain summit!"',
        ],
        responses: [
          {
            id: 'resp_bheki_back_root',
            label: '“Thank you, brothers. Hold the gates.”',
            nextNodeId: 'bheki_cassiem_root',
          },
        ],
      },
      bheki_ship_details: {
        id: 'bheki_ship_details',
        speakerMood:
          'Handing over a thermal imaging printout of two Panamanian-flagged container ships',
        paragraphs: [
          '"They’re flying flags of convenience, but the manifest says Aegis-Atlantis Marine Security. The same private military company Gideon fought in Port Nolloth."',
          '"They have three hundred foreign combatants ready to deploy. But without port gantry cranes, they can’t offload their heavy hardware."',
        ],
        responses: [
          {
            id: 'resp_bheki_back_root_2',
            label: '“We will make sure they never set foot on our soil.”',
            nextNodeId: 'bheki_cassiem_root',
          },
        ],
      },
    },
  },

  o7_octagon_summit_chamber: {
    nodeId: 'o7_octagon_summit_chamber',
    contactName: 'Lord Sterling & General Swart',
    contactRole: 'Supreme Architects of Operation Midnight Sun',
    avatar: '/assets/characters/sterling_swart.jpg',
    factionId: 'the_sovereign_octagon',
    rootNodeId: 'sterling_swart_root',
    nodes: {
      sterling_swart_root: {
        id: 'sterling_swart_root',
        speakerMood:
          'Standing in a bulletproof glass rotunda overlooking the moonlit Karoo plateau, sipping single malt whiskey while mercenary guards stand at attention with assault rifles',
        paragraphs: [
          '"Ah, the valiant United Hawks Taskforce. Nandi Mthembu, Gideon Brand, Leila Hendricks. You fought so fiercely across four provinces to reach this table."',
          '"Look out that window. South Africa is exhausted. Crime, blackouts, decaying infrastructure, empty promises. We are not destroying this country—we are curing it. Order, discipline, enterprise. All governed by men who understand capital."',
        ],
        responses: [
          {
            id: 'resp_sterling_constitutional_arrest',
            label: 'Serve the Constitutional Court Warrants and Demand Immediate Surrender',
            nextNodeId: 'sterling_warrant_confrontation',
            requiredStat: { stat: 'dockets', min: 3 },
            rewardId: 'rew_sterling_arrest',
            rewardSummary: '+2 Treason Indictment Docket & -3 Coup Countdown',
            effect: {
              clockProgress: [
                { clockId: 'treason_indictment_docket', delta: 2 },
                { clockId: 'midnight_sun_coup_countdown', delta: -3 },
              ],
              composureDelta: 25,
              narrativeLog:
                'You slam the signed Constitutional High Warrants on the teak table. General Swart’s mercenary bodyguards exchange glances and lower their weapons.',
            },
          },
          {
            id: 'resp_sterling_shadow_director_deal',
            label: 'Listen to Lord Sterling’s Offer of Shadow Command',
            nextNodeId: 'sterling_director_offer',
          },
          {
            id: 'resp_sterling_defiance_strike',
            label: '“Your empire of shadows ends tonight. Radio the strike teams.”',
            nextNodeId: 'sterling_climax_battle',
          },
        ],
      },
      sterling_warrant_confrontation: {
        id: 'sterling_warrant_confrontation',
        speakerMood:
          'Setting his crystal glass down with a slight tremor, smiling with icy malice',
        paragraphs: [
          '"Pieces of paper from an underground courtroom. You think law can bind power, Captain Mthembu? But I see your tactical teams have already breached the perimeter."',
          '"Very well. The grand game reaches its conclusion. Let us see if your republic has the stomach to put eight billionaires on trial."',
        ],
        responses: [
          {
            id: 'resp_sterling_back_root',
            label: '“You will face the full wrath of the Constitution.”',
            nextNodeId: 'sterling_swart_root',
          },
        ],
      },
      sterling_director_offer: {
        id: 'sterling_director_offer',
        speakerMood:
          'Opening an encrypted terminal showing twenty billion rand in offshore accounts',
        paragraphs: [
          '"Do not be naive, Taskforce. The politicians will betray you within five years. Join us. Take the directorate of the national security syndicate. You will have supreme power, unlimited budget, and total authority to reshape South Africa from the shadows."',
          '"The Octagon needs strong commanders. Name your price, or face the consequences of a ruined state."',
        ],
        responses: [
          {
            id: 'resp_sterling_back_root_2',
            label: '“We serve the Republic, not your private syndicate.”',
            nextNodeId: 'sterling_swart_root',
          },
        ],
      },
      sterling_climax_battle: {
        id: 'sterling_climax_battle',
        speakerMood:
          'Sirens begin blaring as tactical breach charges detonate against the blast doors',
        paragraphs: [
          '"Then let the darkness swallow you all! Mercenaries, execute Protocol Omega!"',
          'Flashbangs detonate across the rotunda as Hawks tactical operatives storm the chamber in full battle array.',
        ],
        responses: [
          {
            id: 'resp_sterling_back_root_3',
            label: '“Breach! Take them alive!”',
            nextNodeId: 'sterling_swart_root',
          },
        ],
      },
    },
  },
};
