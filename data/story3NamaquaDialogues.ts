import type { ContactDialogueTree } from './contactDialogues';

export const NAMAQUA_CONTACT_DIALOGUES: Record<string, ContactDialogueTree> = {
  d1_port_nolloth_jetty: {
    nodeId: 'd1_port_nolloth_jetty',
    contactName: 'Tannie Bettie van Zyl',
    contactRole: 'Port Nolloth Fish Market Doyenne',
    avatar: '/assets/characters/bettie.jpg',
    factionId: 'artisanal_divers',
    rootNodeId: 'bettie_root',
    nodes: {
      bettie_root: {
        id: 'bettie_root',
        speakerMood: 'Wiping snoek scales from an apron, eyes sharp behind smoke-tinted spectacles',
        paragraphs: [
          '"Giepie Brand. Look at you—still smelling of sea salt and diesel. Sit down before your knees lock up from the cold."',
          '"The harbor isn’t what it used to be. Those Aegis gunboats with the black radar domes dock at two in the morning, pushing the local snoek boats into the shallows. Everyone knows they’re dredging off concession 4B, but nobody in Springbok wants to touch them. What are you chasing?"',
        ],
        responses: [
          {
            id: 'resp_bettie_sonar',
            label: 'Show the Offshore Sonar Bathymetry Logs',
            nextNodeId: 'bettie_sonar_reveal',
            requiredStat: { stat: 'dockets', min: 1 },
            rewardId: 'rew_bettie_dive_intel',
            rewardSummary: '+1 Admiralty Investigation progress & R400 local diver stipend',
            effect: {
              clockProgress: [{ clockId: 'admiralty_investigation', delta: 1 }],
              cashDelta: 400,
              narrativeLog:
                'Tannie Bettie studies the bathymetric suction trenches. She circles buoy Bravo-Four in pencil and hands you a fold of cash from the till.',
            },
          },
          {
            id: 'resp_bettie_fog',
            label: '“How bad is the Malmokken fog out on the bay tonight?”',
            nextNodeId: 'bettie_fog_warning',
          },
          {
            id: 'resp_bettie_exit',
            label: '“I need to prep my dive tanks, Tannie. Stay safe.”',
            nextNodeId: 'EXIT',
          },
        ],
      },
      bettie_sonar_reveal: {
        id: 'bettie_sonar_reveal',
        speakerMood: 'Grim, pointing out the harbor mouth into the sea spray',
        paragraphs: [
          '"I knew it. Those suction trenches are forty meters wide—no ordinary gravel boat cuts that deep into the bedrock without commercial underwater cutters. They’re stripping millions in stones every low tide."',
          '"My nephew saw where they stash the gravel: in the old De Beers sorting vaults near Alexander Bay before running it across the Namibian border. If you’re going down there, take my advice: watch the surge tides, and never dive without a backup blade."',
        ],
        responses: [
          {
            id: 'resp_bettie_back',
            label: '“Thank you, Tannie. I’ll make sure our divers get their coast back.”',
            nextNodeId: 'bettie_root',
          },
        ],
      },
      bettie_fog_warning: {
        id: 'bettie_fog_warning',
        speakerMood: 'Peering into the white mist rolling across the breakwater',
        paragraphs: [
          '"The Malmokken is freezing cold and thick as mutton fat tonight, Giepie. A blessing and a curse. You can sneak right under Petrov’s gunboat bows if your engine is quiet. But if your compass spins out, the Benguela drift will carry you eighty miles north into the Namibian surf."',
          '"Keep your shore bearings by the horn on the jetty. Three short blasts every five minutes."',
        ],
        responses: [
          {
            id: 'resp_bettie_fog_back',
            label: '“Understood. I’ll keep my eyes on the surfline.”',
            nextNodeId: 'bettie_root',
          },
        ],
      },
    },
  },

  d3_richtersveld_canyon: {
    nodeId: 'd3_richtersveld_canyon',
    contactName: 'Swartbooi Witbooi',
    contactRole: 'Nama Desert Elder & Kalahari Runner Guide',
    avatar: '/assets/characters/swartbooi.jpg',
    factionId: 'kalahari_runners',
    rootNodeId: 'swartbooi_root',
    nodes: {
      swartbooi_root: {
        id: 'swartbooi_root',
        speakerMood: 'Squatting beside a small fire of dry camelthorn twigs beneath red granite overhangs',
        paragraphs: [
          '"The wind has been speaking of your bakkie since you left Steinkopf, Captain Brand. The tracks you leave in the red sand are heavy. You carry many questions."',
          '"The mercenaries from Alexander Bay have been flying helicopters over the gorges at noon. They think the desert is empty because there are no tar roads. But we see every jerrycan and every rifle case they move across the drift."',
        ],
        responses: [
          {
            id: 'resp_swartbooi_trails',
            label: 'Request Safe Smuggler Corridors to the Orange River',
            nextNodeId: 'swartbooi_trails_granted',
            requiredStat: { stat: 'street', min: 1 },
            rewardId: 'rew_swartbooi_guidance',
            rewardSummary: '-2 Richtersveld Heat Exhaustion & +2 Kalahari Runners Rep',
            effect: {
              clockProgress: [{ clockId: 'desert_heat_exhaustion', delta: -2 }],
              factionRepDelta: [{ factionId: 'kalahari_runners', delta: 2 }],
              narrativeLog:
                'Swartbooi traces ancient shaded canyon passes where underground springwater and cool sandstone keep your vehicle engine safe.',
            },
          },
          {
            id: 'resp_swartbooi_history',
            label: '“Why are the mercenaries storing arms near the river?”',
            nextNodeId: 'swartbooi_arms_history',
          },
          {
            id: 'resp_swartbooi_exit',
            label: '“I must move before the heat rises in the valley.”',
            nextNodeId: 'EXIT',
          },
        ],
      },
      swartbooi_trails_granted: {
        id: 'swartbooi_trails_granted',
        speakerMood: 'Handing you a water gourd carved from dried wild melon',
        paragraphs: [
          '"Follow the dry wash past the red quiver trees until you see the twin granite koppies. Stay off the ridge at midday—the sun will bake your transmission fluid into tar."',
          '"In the wash, the sand is firm and shaded. Our runners have buried two drums of clean diesel near the dry windmill. Drink deeply, Gideon. The desert does not give second chances to men without patience."',
        ],
        responses: [
          {
            id: 'resp_swartbooi_thanks',
            label: '“Peace to your fire, Oom Swartbooi.”',
            nextNodeId: 'swartbooi_root',
          },
        ],
      },
      swartbooi_arms_history: {
        id: 'swartbooi_arms_history',
        speakerMood: 'Looking up at the scorched canyon rims',
        paragraphs: [
          '"Because a border on a map is only water, and water flows where it pleases. The men in Walvis Bay fly the crates in under false mining permits. At night, pontoon rafts slip across the reeds to the South African bank."',
          '"They trade three cases of assault rifles for one pocket of clear blue-white river stones. The men who buy them speak with the accents of Cape Town and Johannesburg. They are building an army while the country sleeps."',
        ],
        responses: [
          {
            id: 'resp_swartbooi_arms_back',
            label: '“We will break their crossing.”',
            nextNodeId: 'swartbooi_root',
          },
        ],
      },
    },
  },

  d4_debeers_ghost_mine: {
    nodeId: 'd4_debeers_ghost_mine',
    contactName: 'Dirk "Oom Dirk" Coetzee',
    contactRole: 'Dispossessed 1968 Concession Holder',
    avatar: '/assets/characters/oom_dirk.jpg',
    factionId: 'namib_syndicate',
    rootNodeId: 'dirk_root',
    nodes: {
      dirk_root: {
        id: 'dirk_root',
        speakerMood: 'Sitting in a rusted sorting office chair, oiling a vintage Mauser rifle',
        paragraphs: [
          '"Step into the shade, diver. Close that corrugated door behind you. The sand out there will strip the skin right off your knuckles."',
          '"I’ve sat on this concession since nineteen-sixty-eight. Back then, we sorted diamond carats by grease tables and paraffin lamps. Now these Russian mercenaries and Sandton bankers fly in with satellite receivers and kick me off my own tailings dumps. You look like you’re looking for a fight."',
        ],
        responses: [
          {
            id: 'resp_dirk_deeds',
            label: 'Examine Fraudulent Mining Concession Transfer Documents',
            nextNodeId: 'dirk_deeds_verified',
            requiredStat: { stat: 'wire', min: 1 },
            rewardId: 'rew_dirk_concession_audit',
            rewardSummary: '+2 Admiralty Investigation progress & R500 salvage fee',
            effect: {
              clockProgress: [{ clockId: 'admiralty_investigation', delta: 2 }],
              cashDelta: 500,
              narrativeLog:
                'Oom Dirk unlocks an iron strongbox containing original concession deeds and forged transfer signatures linking Aegis directly to Windhoek diamond brokers.',
            },
          },
          {
            id: 'resp_dirk_vault',
            label: '“Where did they hide the rough diamond sorting tables?”',
            nextNodeId: 'dirk_vault_intel',
          },
          {
            id: 'resp_dirk_exit',
            label: '“I’ll leave you to your watch, Oom Dirk.”',
            nextNodeId: 'EXIT',
          },
        ],
      },
      dirk_deeds_verified: {
        id: 'dirk_deeds_verified',
        speakerMood: 'Snorting in bitter satisfaction as he slaps the yellowed deeds',
        paragraphs: [
          '"Look at that notary stamp right there! Signed in Pretoria during the state of emergency, transferred to a shell outfit called Namib Crest Ltd. Same address as Petrov’s gunboat maintenance contractor."',
          '"They used state capture funds from the power stations to buy off the regional mining commissioner. Take these certified copies, Giepie. Hand them to Captain Cloete in Springbok and sink Petrov’s fleet in paperwork before he sinks you in the surf."',
        ],
        responses: [
          {
            id: 'resp_dirk_back',
            label: '“This evidence will hold up in any court in the country.”',
            nextNodeId: 'dirk_root',
          },
        ],
      },
      dirk_vault_intel: {
        id: 'dirk_vault_intel',
        speakerMood: 'Tapping a spot on the concrete floor with his boot heel',
        paragraphs: [
          '"Down the spiral stair into the lower gravity separator. They installed modern lithium batteries and ultraviolet sorting lamps last month."',
          '"They bring the wet gravel up from the shore boats at dusk. If you breach the cellar, bring bolt cutters—the padlocks are heavy bronze from the naval stores."',
        ],
        responses: [
          {
            id: 'resp_dirk_vault_back',
            label: '“I’ll find what they buried.”',
            nextNodeId: 'dirk_root',
          },
        ],
      },
    },
  },

  d6_aegis_coastal_compound: {
    nodeId: 'd6_aegis_coastal_compound',
    contactName: 'Colonel Yuri Petrov',
    contactRole: 'Aegis-Atlantis Marine Commander',
    avatar: '/assets/characters/petrov.jpg',
    factionId: 'aegis_marine',
    rootNodeId: 'petrov_root',
    nodes: {
      petrov_root: {
        id: 'petrov_root',
        speakerMood: 'Standing on the compound watchtower in tactical fleece, binocular harness over broad shoulders',
        paragraphs: [
          '"Captain Brand. My patrol craft reported your bakkie idling near the perimeter fence. You are trespassing on private maritime concession property under international security contract."',
          '"You used to serve the South African Navy, yes? Then you understand power. Governments rot from within, currencies fail, and electricity flickers out. But titanium, diesel, and uncut stones never lose their value. Why are you interfering in operations that do not concern you?"',
        ],
        responses: [
          {
            id: 'resp_petrov_confront',
            label: 'Confront Petrov with Evidence of Illegal Arms Shipments',
            nextNodeId: 'petrov_defiance',
            requiredStat: { stat: 'influence', min: 2 },
            rewardId: 'rew_petrov_concession',
            rewardSummary: '-2 Aegis Naval Patrol Heat & +15 Composure',
            effect: {
              clockProgress: [{ clockId: 'aegis_naval_patrol', delta: -2 }],
              composureDelta: 15,
              narrativeLog:
                'You lay out the maritime shipping bills and court warrants. Petrov realizes his diplomatic cover is blown and orders his gunboats to stand down temporarily.',
            },
          },
          {
            id: 'resp_petrov_cape_town',
            label: '“Who is waiting for these weapons in Table Bay?”',
            nextNodeId: 'petrov_cape_town_hint',
          },
          {
            id: 'resp_petrov_exit',
            label: '“I’m leaving the compound now.”',
            nextNodeId: 'EXIT',
          },
        ],
      },
      petrov_defiance: {
        id: 'petrov_defiance',
        speakerMood: 'Smiling coldly without warmth, lighting a cigar in the coastal wind',
        paragraphs: [
          '"You think a magistrate in Springbok can issue a writ that stops Aegis-Atlantis? My vessels are flagged in Monrovia, my cargo is cleared through diplomatic transit waivers, and my clients write the national energy budget."',
          '"Still... you have surprising resourcefulness for a beachcomber diver. I will recall the gunboats from the surf for tonight. But do not try to board the cargo barge at Alexander Bay. My divers shoot first, and the Benguela tide hides everything."',
        ],
        responses: [
          {
            id: 'resp_petrov_back',
            label: '“We’ll see what survives the tide, Petrov.”',
            nextNodeId: 'petrov_root',
          },
        ],
      },
      petrov_cape_town_hint: {
        id: 'petrov_cape_town_hint',
        speakerMood: 'Glancing out toward the dark southern horizon',
        paragraphs: [
          '"The people who can afford peace, Captain Brand. The old wine families in Constantia and the private security barons who protect the Atlantic Seaboard. When the lights go out across the republic for good, Cape Town will not burn like Johannesburg did."',
          '"They are buying order. And we are delivering the keys."',
        ],
        responses: [
          {
            id: 'resp_petrov_hint_back',
            label: '“You’re arming a coup, not providing security.”',
            nextNodeId: 'petrov_root',
          },
        ],
      },
    },
  },

  d7_springbok_magistrate: {
    nodeId: 'd7_springbok_magistrate',
    contactName: 'Captain Annelize Cloete',
    contactRole: 'Sea Fisheries & Maritime Enforcement Holdout',
    avatar: '/assets/characters/cloete.jpg',
    factionId: 'namaqua_command',
    rootNodeId: 'cloete_root',
    nodes: {
      cloete_root: {
        id: 'cloete_root',
        speakerMood: 'Pouring bitter chicory coffee beside rows of steel filing cabinets and confiscated dredge motors',
        paragraphs: [
          '"Gideon. Thank God you made it inland. Close the blinds—there are two unmarked bakkies parked outside with GP registration plates watching the court building."',
          '"Pretoria has been leaning on our magistrate to drop the maritime poaching dockets against Aegis. They claim it’s an \'inter-governmental defense exercise\'. I have three patrol boats impounded in the yard because someone sliced the hydraulic steering lines. Have you got anything solid enough to override ministerial interference?"',
        ],
        responses: [
          {
            id: 'resp_cloete_arms_bill',
            label: 'Present the Aegis Maritime Armaments Consignment Bill',
            nextNodeId: 'cloete_warrants_issued',
            requiredStat: { stat: 'dockets', min: 2 },
            rewardId: 'rew_cloete_naval_raid',
            rewardSummary: '+3 Admiralty Investigation & unlocks State Naval Raid climax',
            effect: {
              clockProgress: [{ clockId: 'admiralty_investigation', delta: 3 }],
              factionRepDelta: [{ factionId: 'namaqua_command', delta: 3 }],
              composureDelta: 20,
              narrativeLog:
                'Captain Cloete slams her fist on the mahogany desk. She prepares the emergency High Court Admiralty seizure warrant and alerts the naval station in Saldanha Bay.',
            },
          },
          {
            id: 'resp_cloete_divers',
            label: '“Can Sea Fisheries protect our shore divers if they strike?”',
            nextNodeId: 'cloete_divers_pledge',
          },
          {
            id: 'resp_cloete_exit',
            label: '“I’m heading back to the coast to secure more evidence.”',
            nextNodeId: 'EXIT',
          },
        ],
      },
      cloete_warrants_issued: {
        id: 'cloete_warrants_issued',
        speakerMood: 'Stamping an Admiralty seal with heavy brass embossment',
        paragraphs: [
          '"Galil assault rifles and military radar consoles listed as \'agricultural drill parts\'? This is high treason under the Maritime Security Act. Ministerial immunity cannot protect them from an in rem maritime arrest warrant."',
          '"I’m mobilizing the Sea Fisheries boarding teams and contacting the Saldanha naval base. We intercept the cargo convoy before it leaves the coast. Take care of yourself out on the dunes, Gideon. We have one shot at this."',
        ],
        responses: [
          {
            id: 'resp_cloete_back',
            label: '“Let’s finish it, Captain.”',
            nextNodeId: 'cloete_root',
          },
        ],
      },
      cloete_divers_pledge: {
        id: 'cloete_divers_pledge',
        speakerMood: 'Resolute, checking her sidearm holster',
        paragraphs: [
          '"If Bettie’s shore divers bring their suction bakkies together to block the harbor channel, I will station armed fisheries officers on the slipway to protect them."',
          '"Petrov might think he owns the sea, but in South African territorial waters, this badge still answers to the Constitution."',
        ],
        responses: [
          {
            id: 'resp_cloete_pledge_back',
            label: '“The divers will stand with you.”',
            nextNodeId: 'cloete_root',
          },
        ],
      },
    },
  },
};
