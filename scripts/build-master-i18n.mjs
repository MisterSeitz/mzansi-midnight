import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

// Pure in-memory recursive TypeScript loader for data extraction
function loadTsModule(relativePath) {
  const fullPath = path.join(process.cwd(), relativePath);
  const tsCode = fs.readFileSync(fullPath, 'utf8');
  const jsCode = ts.transpileModule(tsCode, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
    },
  }).outputText;

  const m = { exports: {} };
  const customRequire = (modPath) => {
    if (modPath.startsWith('./') || modPath.startsWith('../')) {
      const resolved = path.resolve(path.dirname(fullPath), modPath);
      const candidates = [resolved, resolved + '.ts', resolved + '.tsx', resolved + '.js'];
      for (const c of candidates) {
        if (fs.existsSync(c) && !fs.statSync(c).isDirectory()) {
          return loadTsModule(path.relative(process.cwd(), c));
        }
      }
    }
    return {};
  };

  const fn = new Function('exports', 'require', 'module', '__filename', '__dirname', jsCode);
  fn(m.exports, customRequire, m, fullPath, path.dirname(fullPath));
  return m.exports;
}

const BASE_UI_STRINGS = {
  // Global HUD & Resource Headers
  'ui.cash': 'Cash',
  'ui.composure': 'Composure',
  'ui.cycle': 'Cycle',
  'ui.load_shedding': 'Load Shedding',
  'ui.stage': 'Stage',
  'ui.diesel_on': 'DIESEL ON',
  'ui.add_diesel': '+ Diesel (R300)',
  'ui.board': 'BOARD',
  'ui.guide': 'GUIDE',
  'ui.save': 'SAVE',
  'ui.saved': 'SAVED ✓',
  'ui.settings': 'SETTINGS',
  'ui.menu': 'MENU',
  'ui.status': 'STATUS',
  'ui.district_map': 'District Map',
  'ui.actions': 'Actions',
  'ui.clocks_turf': 'Clocks & Turf',
  'ui.active_clocks': 'Active Clocks',
  'ui.faction_standing': 'Faction Standing',
  'ui.faction_perks': 'Faction Perks',
  'ui.action_dice': 'Action Dice',
  'ui.available': 'Available',
  'ui.spent': 'Spent',
  'ui.roll_die': 'Roll Die',
  'ui.execute_action': 'Execute Action',
  'ui.end_cycle': 'End Cycle',
  'ui.sleep': 'Sleep',
  'ui.nightfall': 'Nightfall',
  'ui.confirm': 'Confirm',
  'ui.cancel': 'Cancel',
  'ui.close': 'Close',
  'ui.back': 'Back',
  'ui.done': 'Done',
  'ui.hotkeys': 'Hotkeys',
  'ui.inventory': 'Inventory & Evidence',
  'ui.language': 'Language',

  // Investigator Stats
  'stats.street': 'Street Canny',
  'stats.dockets': 'Forensic Dockets',
  'stats.wire': 'Signals Wire',
  'stats.influence': 'Political Influence',

  // Factions
  'faction.abasanta': 'Abasanta Cartel',
  'faction.city_hall': 'City Hall (Ma-Sibi)',
  'faction.saps_trt': 'SAPS TRT (Mokoena)',
  'faction.street_syndicate': 'Queen St. Syndicate',
  'faction.hawks': 'DPCI Hawks Holdout',

  // Core Evidence Items
  'item.docket_409_raw': 'Docket #409 (Raw)',
  'item.auditor_encrypted_phone': "Auditor's Encrypted Phone",
  'item.decoded_tanker_ledger': 'Decoded Tanker Ledger',
  'item.berth_14_manifest': 'Berth 14 Manifest',
  'item.saps_radio_scanner': 'Cloned SAPS Scanner',
  'item.item_burner_sim_array': 'Multi-IMSI Burner Array',
  'item.item_forged_auditor_id': 'Forged Treasury ID',
  'item.item_kevlar_vest': 'Kevlar Under-Vest',
  'item.item_vip_transponder': 'VIP Dash Strobe',
  'item.offshore_trust_deed': 'Sovereign Pearl Trust Deed',
  'item.superlab_batch_telemetry': 'Super-Lab Batch Telemetry',

  // Main Menu & Title Intro Screen
  'ui.app_title': 'Mzansi Midnight',
  'ui.case_number': 'CASE FILE #409-ZA',
  'ui.tagline': 'eThekwini-Gold Noir Investigation',
  'ui.subtitle': 'A Dice-and-Node RPG of Municipal State Capture & Port Precursor Cartels',
  'ui.start_new_case': 'Start New Case',
  'ui.load_dossier': 'Load Case Dossier',
  'ui.case_endings': 'Case Endings',
  'ui.field_briefing': 'Field Briefing & Manual',
  'ui.system_config': 'System & Audio Config',
  'ui.menu_start': '01 // START',
  'ui.menu_dossiers': '02 // DOSSIERS',
  'ui.menu_archive': '03 // ARCHIVE',
  'ui.menu_primer': '04 // PRIMER',
  'ui.menu_system': '05 // SYSTEM',
  'ui.select_save_slot': 'Select Target Case File Storage Slot:',
  'ui.select_launch_mode': 'Select Launch Mode:',
  'ui.mode_prologue_title': 'Act 1: Interactive 2:00 AM Prologue',
  'ui.mode_prologue_desc': 'Select your Hawks investigator background & reconstruct Docket #409 in your Mercury Arcade flat.',
  'ui.mode_act1_map_title': 'Act 1: Direct to District Map',
  'ui.mode_act1_map_desc': 'Skip intro and deploy directly to the Mercury Arcade flat (Day 1, Stage 2 Load Shedding, 4 Dice Pool).',
  'ui.mode_act2_map_title': 'Act 2: The Commission of Inquiry',
  'ui.mode_act2_map_desc': 'Launch directly into Act 2 with high stats and legacy evidence at the Upper Ridge Penthouses.',
  'ui.begin_case': 'Begin Case →',
  'ui.load_case_dossier': 'Load Case Dossier',
  'ui.load_dossier_btn': 'Load Dossier',
  'ui.delete_slot': 'Delete',
  'ui.confirm_delete': 'Confirm Delete',
  'ui.slot_autosave': 'Auto-Save Dossier',
  'ui.slot_1': 'Case File 01',
  'ui.slot_2': 'Case File 02',
  'ui.slot_3': 'Case File 03',
  'ui.empty_slot': 'Empty Storage Slot',
  'ui.case_archive_title': 'Case File #409-ZA Archive — Epilogue Records',
  'ui.inspected_ending': 'Inspected Timeline',
  'ui.unlocked': 'UNLOCKED',
  'ui.classified': 'CLASSIFIED // LOCKED',
  'ui.how_the_city_works': 'Field Rules — How the City Works',
  'ui.return_to_menu': 'Return to Menu',
  'ui.deploy_to_map': 'Deploy to District Map →',
  'ui.select_background': 'Select Investigator Background',
  'ui.continue_investigation': 'Continue Investigation →',

  // Dice Dock & Rolls
  'ui.daily_action_dice': 'Daily Action Dice',
  'ui.dice_dock_instruction': 'Hold or click a die, then tap an Action Slot',
  'ui.dice_dock_empty': 'All Action Dice Deployed',
  'ui.end_cycle_sleep': 'End Cycle / Sleep →',
  'ui.dice_mode_numbers': '123',
  'ui.dice_mode_dots': '⚄ DOTS',
  'ui.last_action_outcome': 'Last Action Outcome',
  'ui.clean_success': 'Clean Success',
  'ui.compromised_success': 'Compromised Success',
  'ui.failure_blowback': 'Failure / Blowback',
  'ui.hostile_turf_warning': 'Hostile Turf Penalty (-1 to all rolls)',
  'ui.stage6_lockout': 'Server Disabled by Stage 6 Blackout (Requires Diesel or Grid Perk)',
  'ui.stage6_cover': 'Stage 6 Cover Bonus (+2 to rolls)',
  'ui.speak_with_contact': 'Speak with Contact',
  'ui.intel_available': 'INTEL',
  'ui.contact_dialogue_closed': 'Contact Dialogue Closed',
  'ui.contact_dialogue_title': 'Contact Interrogation & Intel',
  'ui.black_market_hardware': 'Black-Market Field Hardware',
  'ui.purchase_hardware': 'Purchase Hardware',
  'ui.permanent_stat_boost': 'Permanent Field Upgrade',
  'ui.cost': 'Cost',
  'ui.requires_die': 'Requires 1 Die',
  'ui.free_action': 'No Die Required',
  'ui.preview_outcomes': 'Deterministic Outcome Tiers',
  'ui.tier_clean': '6+ Clean Success',
  'ui.tier_compromised': '4–5 Compromised',
  'ui.tier_failure': '1–3 Failure',
  'ui.saps_roadblock_warning': 'SAPS Roadblock Active (Burns 1 Die or R200 Bribe)',
  'ui.hotkey_bar': 'Hotkeys: 1–5 Select Die • Tab Next Node • Space End Day • D Dice Style • B Corkboard • Esc Deselect',

  // Faction Perks
  'ui.tactical_perks': 'Tactical Faction Perks',
  'ui.perk_available': 'Available Today',
  'ui.perk_used': 'Used Today',
  'ui.activate_perk': 'Activate',
  'ui.perk_grid_manipulation_name': 'Grid Manipulation',
  'ui.perk_grid_manipulation_desc': 'Toggle Load Shedding between Stage 2 and Stage 6 on demand.',
  'ui.perk_bluelight_escort_name': 'Blue-Light Escort',
  'ui.perk_bluelight_escort_desc': 'Scrub plates: -2 Heat/Contempt, -1 Sweep/Hit Squad.',
  'ui.perk_izinkabi_muscle_name': 'Izinkabi Muscle (R600)',
  'ui.perk_izinkabi_muscle_desc': 'Upgrade lowest unused die to a 6.',
  'ui.perk_hawks_safechannel_name': 'Hawks Safe-Channel',
  'ui.perk_hawks_safechannel_desc': 'Recover +15% Composure, -1 Sweep/Hit Squad.',

  // Map Sectors
  'ui.sector_a': 'SECTOR A // WEST STREET GRID',
  'ui.sector_b': 'SECTOR B // CENTRAL CIVIC SPINE',
  'ui.sector_c': 'SECTOR C // EAST HARBOUR CHANNEL',
  'ui.sector_act2_ridge': 'UPPER RIDGE & COASTAL FREEWAY',
  'ui.sector_act2_inland': 'MIDLANDS & CARGO RUNWAY',
  'ui.tactical_priority': 'TACTICAL PRIORITY',
  'ui.show_slot': 'Show Slot →',
  'ui.campaign_progress': 'Campaign Progress',

  // Conspiracy Board & Dossiers
  'ui.conspiracy_board_title': 'Case File #409 Conspiracy Board',
  'ui.conspiracy_board_subtitle': 'Red-String Forensic Links • Suspects & Exhibits',
  'ui.suspects': 'Suspects & Conspirators',
  'ui.exhibits': 'Forensic Exhibits',
  'ui.connected_threads': 'Connected Red-String Threads',
  'ui.case_notes': 'Classified Case Notes',
  'ui.evidence_dossier_title': 'Classified Forensic Dossier',
  'ui.exhibit_spec': 'Exhibit Specification',
  'ui.document_excerpt': 'Forensic Excerpt',
  'ui.mechanical_utility': 'Mechanical Utility',
  'ui.close_dossier': 'Close Dossier',

  // Ending & Epilogue
  'ui.case_concluded': 'Case Concluded // Epilogue Dossier',
  'ui.power_shift_aftermath': 'District Power-Shift Aftermath',
  'ui.fixer_evaluation': 'Fixer Evaluation Ledger',
  'ui.commendations': 'Tactical Commendations',
  'ui.continue_act2': 'Continue to Act 2: The Commission →',
  'ui.new_game_plus': 'New Game+ (Keep Gear & +R1,000) →',
  'ui.play_again': 'Play Again / Reset Timeline',

  // Tutorial
  'ui.tutorial_title': 'Field Guide — Investigator Operational Manual',
  'ui.tutorial_next': 'Next Step →',
  'ui.tutorial_prev': '← Previous',
  'ui.tutorial_got_it': 'Acknowledge & Close [✕]',
  'ui.step': 'Step',
  'ui.of': 'of',

  // Settings
  'ui.master_mute': 'Master Audio Mute',
  'ui.master_mute_desc': 'Mute all Web Audio synthesis and ambient rain loops',
  'ui.coastal_rain_hum': 'Coastal Rain & 55Hz Grid Hum',
  'ui.tactical_dice_sfx': 'Tactical Dice & Crisis Alerts',
  'ui.reduce_flicker': 'Reduce Blackout Screen Flicker',
  'ui.reduce_flicker_desc': 'Disable screen flash during Load Shedding grid transitions',
  'ui.auto_show_guide': 'Auto-Show Field Guide on First Visit',
  'ui.auto_show_guide_desc': 'Open the 6-step tactical HUD tutorial on new timelines',
  'ui.dossier_storage': 'Dossier Storage Management',
  'ui.purge_all_data': 'Purge All Saved Dossiers & Reset Tutorial',
  'ui.confirm_purge': 'Confirm permanent deletion of all save slots?',
  'ui.audio_config': '01 // Procedural Noir Soundscape',
  'ui.display_config': '02 // Display & Guidance Preferences',
  'ui.lang_config': '03 // Language & Localisation',
  'ui.dossier_config': '04 // Dossier Storage Management',
  'ui.active': 'ACTIVE',
  'ui.muted': 'MUTED',
  'ui.on': 'ON',
  'ui.off': 'OFF',
  'ui.test': 'Test',
  'ui.wipe_data': 'Wipe Data',

  // End Cycle Modal
  'ui.all_dice_spent': 'All Daily Action Dice Spent',
  'ui.unused_dice_warning': 'Unused Action Dice Remaining Today',
  'ui.overnight_forecast': 'What Happens When You Sleep (Overnight Simulation)',
  'ui.threat_clocks_advance': 'Threat Clocks Advancing Tonight',
  'ui.grid_rotation': 'Eskom Load Shedding Grid Rotation',
  'ui.tomorrow_pool': "Tomorrow's Action Dice Forecast",
  'ui.confirm_sleep': 'Sleep & Advance to Next Day →',
  'ui.stay_awake': 'Stay Awake (Cancel)',
};

const TUTORIAL_STRINGS = {
  'tutorial.step1.title': 'Step 1: Daily Action Dice & Composure',
  'tutorial.step1.desc': "At dawn each Cycle (Day), your investigator rolls a pool of 3 to 5 six-sided dice based on current Composure (80–100% = 5 dice, 40–79% = 4 dice, <40% = 3 dice). Composure is your mental stamina and resilience against Durban's underworld.",
  'tutorial.step2.title': 'Step 2: Assigning Dice to Action Slots',
  'tutorial.step2.desc': 'Hold or click a die from your bottom dock, then click an Action Slot on any unlocked map node. Rolls resolve deterministically: Die Value + Stat Modifier + Stage 6 Blackout Modifier + Hostile Turf Penalty. Tiers preview cleanly: 6+ Clean Success, 4–5 Compromised, 1–3 Failure.',
  'tutorial.step3.title': 'Step 3: Rolling Blackouts (Load Shedding)',
  'tutorial.step3.desc': 'Eskom power rotates across Stages 2 -> 4 -> 6 -> 2 each night. During Stage 6 Blackouts, high-tech server slots lock down unless you spend R300 on Backup Generator Diesel, but covert operations at the Port and Estates gain a +2 Roll Bonus under cover of darkness.',
  'tutorial.step4.title': 'Step 4: Threat & Investigation Clocks',
  'tutorial.step4.desc': "Circular segmented clocks tick down impending catastrophes (Brigadier Mokoena's Sweep, Nandi's Wound, Izinkabi Hit Squads) and track your forensic breakthroughs (Docket #409 Audit, Phone Cracking, Berth 14 Convoy). When investigation clocks fill, climactic finale showdowns unlock.",
  'tutorial.step5.title': 'Step 5: Roadblocks & Faction Perks',
  'tutorial.step5.desc': 'High Precinct Heat or Threat levels trigger armed SAPS roadblock corridors between sectors. Crossing them burns 1 Die or R200 in cold drink bribes unless you possess a cloned SAPS scanner. Earn positive Faction Rep to unlock 1/day tactical abilities like Grid Manipulation and Blue-Light Escorts.',
  'tutorial.step6.title': 'Step 6: Contacts, Evidence & Red-String Board',
  'tutorial.step6.desc': "Speak with local fixers and faction bosses at each node to interrogate leads, present forensic exhibits, and claim one-time favors. Press 'B' or tap 'BOARD' anytime to inspect your red-string conspiracy corkboard, tracing the money trail from City Hall to Berth 14.",
};

const ENDING_HINTS = {
  'ending_hint.ending_vigilante': 'Act 1 Climax (Berth 14): Strike the precursor convoy with Bra Bheki’s street syndicate or trigger the Vigilante Finale at Pier 2.',
  'ending_hint.ending_whistleblower': 'Act 1 Climax (Berth 14): Broadcast the decrypted audio & ledger to The Daily Veld with Colonel van der Merwe at the Old Archive Basement.',
  'ending_hint.ending_kingpin': 'Act 1 Climax (Berth 14): Sell the original Docket #409 to Zuko Ndlovu and Councillor Ma-Sibi for a 20% syndicate retainer.',
  'ending_hint.ending_captured': 'Act 1 Threat Crisis: Allow Brigadier Mokoena’s Sweep or Nandi’s Gunshot Wound to overwhelm your safehouse without an escape plan.',
  'ending_hint.ending_act2_reckoning': 'Act 2 Finale (Hangar 7): Execute the Supreme Court Tarmac Arrest with both Act 2 supreme exhibits and DPCI Hawks backing.',
  'ending_hint.ending_act2_revolution': 'Act 2 Finale (Hangar 7): Storm Hangar 7 and the Midlands Super-Lab alongside Bra Bheki’s Northern Water Strike coalition.',
  'ending_hint.ending_act2_syndicate_state': 'Act 2 Finale (Hangar 7): Board Gulfstream ZS-900 with Zuko and Ma-Sibi as the new Shadow Fixer of Sovereign Pearl Holdings.',
  'ending_hint.ending_act2_vanished': 'Act 2 Threat Crisis: Fall to the Izinkabi Hit Squad or State Security Contempt Warrant before Flight ZS-900 departs.',
};

const ADVISOR_STRINGS = {
  // Badges
  'advisor.badge.free_intel': 'FREE CONTACT INTEL (0 DICE)',
  'advisor.badge.cycle_complete': 'CYCLE COMPLETE',
  'advisor.badge.medical_crisis': 'URGENT MEDICAL CRISIS',
  'advisor.badge.trt_raid': 'IMMINENT TRT RAID',
  'advisor.badge.hit_squad': 'HIT SQUAD CLOSING IN',
  'advisor.badge.warrant': 'WARRANT IMMINENT',
  'advisor.badge.low_composure': 'LOW COMPOSURE WARNING',
  'advisor.badge.act2_finale': 'ACT 2 FINALE UNLOCKED',
  'advisor.badge.act1_climax': 'ACT 1 CLIMAX UNLOCKED',
  'advisor.badge.recommended': 'RECOMMENDED NEXT MOVE',
  'advisor.badge.tactical_priority': 'TACTICAL PRIORITY',

  // Headlines
  'advisor.headline.unclaimed_intel': 'Unclaimed Intel Available at {node}',
  'advisor.headline.cycle_complete': 'All Action Dice Spent — Advance to Next Day',
  'advisor.headline.nandi_wound': "Constable Nandi's Wound is {current}/{max} — Stabilize Her Now!",
  'advisor.headline.mokoena_sweep': "Mokoena's Sweep is {current}/{max} — Bleed Off Patrol Heat!",
  'advisor.headline.hit_squad': 'Izinkabi Hit Squad at {current}/{max} — Set Up Barricades!',
  'advisor.headline.contempt_warrant': 'Contempt Warrant at {current}/{max} — Stall the Arrest!',
  'advisor.headline.low_composure': 'Composure at {composure}% (Only 3 Dice/Day & Breakdown Risk)',
  'advisor.headline.both_act2_exhibits': 'Both Supreme Exhibits Secured — Launch Hangar 7 Finale!',
  'advisor.headline.one_act2_exhibit': 'Hangar 7 & Citrus Estate Unlocked — Strike Now or Secure 2nd Exhibit',
  'advisor.headline.both_act1_exhibits': 'Full Dossier & Audio Secured — Launch the Berth 14 Finale!',
  'advisor.headline.one_act1_exhibit': 'Berth 14 Climax Ready — Launch Finale or Decode Second Exhibit',
  'advisor.headline.act2_stage6': 'Extract Tanker GPS at Northern Township Depot (Stage 6 Safe)',
  'advisor.headline.subpoena_high_court': 'File Section 205 Subpoena at High Court Chambers',
  'advisor.headline.gps_depot': 'Pull Black-Box GPS from Tanker #114 at Township Depot',
  'advisor.headline.crack_handset': "Crack Auditor's Handset at Golden Dragon Cyber-Pawn",
  'advisor.headline.audit_docket': 'Cross-Reference Docket #409 at Mercury Arcade Flat',

  // Hints
  'advisor.hint.unclaimed_intel': 'Select {node} and click "Speak with Contact" in the right drawer to claim a free stat/evidence breakthrough without spending a die!',
  'advisor.hint.cycle_complete': 'Click "End Cycle →" in the bottom-right bar to sleep, rotate the Eskom Load Shedding grid, and roll fresh dice.',
  'advisor.hint.nandi_surgeon': 'Jump to Mercury Arcade Flat and run "Call Dr. Maharaj" (R1,500) or "Rest & Patch Up Nandi" (R300) before midnight!',
  'advisor.hint.nandi_patch': 'Jump to Mercury Arcade Flat and run "Rest & Patch Up Nandi" (R300) or speak with Nandi before her wound clock fills!',
  'advisor.hint.mokoena_sweep': 'Use Queen St. Taxi Rank ("Tap the Driver Network") or Golden Dragon ("Clone SAPS Radio Frequencies") to avoid a safehouse raid!',
  'advisor.hint.hit_squad': 'Visit Northern Township Depot to "Coordinate with Strike Committee (R400)" or speak with Bra Bheki to push back the gunmen!',
  'advisor.hint.contempt_warrant': 'Visit High Court Chambers ("File Section 205 Offshore Subpoena") or The Ridge Penthouses to quash the warrant!',
  'advisor.hint.recover_act1': 'Recover +25% Composure at Mercury Arcade Flat ("Rest & Patch Up Nandi").',
  'advisor.hint.recover_act2': 'Recover +25% Composure at High Court Chambers ("Witness Protection Safe-Room Debrief").',
  'advisor.hint.act2_finale': 'Click the purple "Hangar 7 Finale →" button in the bottom bar, or run a [FINALE] slot at King Shaka Cargo Apron / Citrus Estate.',
  'advisor.hint.act1_finale': 'Click the purple "Berth 14 Finale →" button in the bottom bar, or run the [FINALE] action at Pier 2 or Old Archive Basement.',
  'advisor.hint.act2_stage6': 'Stage 6 Load Shedding has locked computer servers at The Ridge & High Court. Pull physical GPS black-boxes at the Township Depot (or buy R300 Diesel).',
  'advisor.hint.subpoena_high_court': 'Fill the "Trace Sovereign Pearl Trust" clock (0/4) to obtain the Offshore Trust Deed and unlock Hangar 7.',
  'advisor.hint.gps_depot': 'Fill the "Synthesize Super-Lab Telemetry" clock (0/4) to pinpoint the Midlands Citrus Super-Lab and Hangar 7.',
  'advisor.hint.crack_handset': 'Fill the 4-segment "Crack Auditor’s Handset" clock with Sparks to obtain the Berth 14 Manifest and unlock Pier 2 & Old Archive.',
  'advisor.hint.audit_docket': 'Fill the 4-segment "Audit Docket #409" clock at your Safehouse to obtain the Decoded Tanker Ledger and unlock City Hall & Pier 2.',

  // Action Buttons
  'advisor.action.visit_node': 'Visit {node} →',
  'advisor.action.safehouse': 'Jump to Safehouse →',
  'advisor.action.evade_sweep': 'Evade Sweep →',
  'advisor.action.jump_depot': 'Jump to Depot →',
  'advisor.action.jump_high_court': 'Jump to High Court →',
  'advisor.action.recover_composure': 'Recover Composure →',
  'advisor.action.finale': 'Jump to Finale →',
  'advisor.action.show_slot': 'Show Slot →',

  // Campaign Steps
  'advisor.step_title.act1_step1': 'Step 1/3: Decode Docket #409 or Crack Phone',
  'advisor.step_title.act1_step2': 'Step 2/3: Secure Second Lead or Trigger Berth 14',
  'advisor.step_title.act1_step3': 'Step 3/3: Launch Berth 14 Climax',
  'advisor.step_title.act2_step1': 'Step 1/3: Unmask Trust or Tanker GPS',
  'advisor.step_title.act2_step2': 'Step 2/3: Secure Second Exhibit or Strike Hangar 7',
  'advisor.step_title.act2_step3': 'Step 3/3: Execute Hangar 7 Grand Finale',
};

const PERK_STRINGS = {
  'perk.perk_grid_manipulation.name': 'Grid Manipulation',
  'perk.perk_grid_manipulation.desc': 'Toggle Stage 2 / Stage 6 Load Shedding',
  'perk.perk_bluelight_escort.name': 'Blue-Light Escort',
  'perk.perk_bluelight_escort.desc': 'Clear -2 Precinct Heat & -1 Sweep',
  'perk.perk_izinkabi_muscle.name': 'Izinkabi Muscle (R600)',
  'perk.perk_izinkabi_muscle.desc': 'Upgrade lowest unused die to a 6',
  'perk.perk_hawks_safechannel.name': 'Hawks Safe-Channel',
  'perk.perk_hawks_safechannel.desc': 'Recover +15% Composure & -1 Sweep',
};

const LOG_STRINGS = {
  'ui.metro_dispatch_log': 'Metro Dispatch & Comms Log',
  'log.initial_act1': 'Day 1, 02:00 AM — Stage 4 Load Shedding. Constable Nandi collapses on your floor with Docket #409.',
  'log.initial_act2': 'Day 5, 08:00 AM — Commission of Inquiry begins. High Court subpoenas issued under Stage 2 Load Shedding.',
  'log.no_unused_dice': 'No unused dice available to upgrade.',
};

const MAP_SECTOR_STRINGS = {
  'map.sector.west_street': 'SECTOR 01 // WEST STREET',
  'map.sector.civic_spine': 'SECTOR 02 // CIVIC SPINE',
  'map.sector.pier2_port': 'SECTOR 03 // PIER 2 PORT',
  'map.sector.umhlanga_north': 'SECTOR 01 // UMHLANGA & NORTH',
  'map.sector.high_court': 'SECTOR 02 // HIGH COURT INQUIRY',
  'map.sector.midlands_hangar7': 'SECTOR 03 // MIDLANDS & HANGAR 7',
  'map.water.hangar7': 'KING SHAKA APRON // HANGAR 7',
  'map.water.berth14': 'NATAL PORT CHANNEL // BERTH 14',
  'map.nodes_label': 'Nodes:',
};

async function extractAllStrings() {
  console.log('Extracting all game strings across Mzansi Midnight codebase...');

  const master = {};

  // 1. Base UI strings
  Object.assign(master, BASE_UI_STRINGS);
  Object.assign(master, TUTORIAL_STRINGS);
  Object.assign(master, ENDING_HINTS);
  Object.assign(master, ADVISOR_STRINGS);
  Object.assign(master, PERK_STRINGS);
  Object.assign(master, LOG_STRINGS);
  Object.assign(master, MAP_SECTOR_STRINGS);

  // Ingest identified missing keys from components
  const missingKeysPath = path.join(process.cwd(), '.system_generated', 'missing_keys.json');
  if (fs.existsSync(missingKeysPath)) {
    try {
      const missingKeys = JSON.parse(fs.readFileSync(missingKeysPath, 'utf8'));
      Object.assign(master, missingKeys);
    } catch (e) {
      console.warn('Could not read missing_keys.json:', e.message);
    }
  }

  // Load existing en.json if any custom keys were manually added
  const enPath = path.join(process.cwd(), 'data', 'i18n', 'en.json');
  if (fs.existsSync(enPath)) {
    const existing = JSON.parse(fs.readFileSync(enPath, 'utf8'));
    Object.assign(master, existing);
    // Ensure our comprehensive base strings take precedence or supplement
    Object.assign(master, BASE_UI_STRINGS);
    Object.assign(master, TUTORIAL_STRINGS);
    Object.assign(master, ENDING_HINTS);
    Object.assign(master, ADVISOR_STRINGS);
    Object.assign(master, PERK_STRINGS);
    Object.assign(master, LOG_STRINGS);
    Object.assign(master, MAP_SECTOR_STRINGS);
    if (fs.existsSync(missingKeysPath)) {
      const missingKeys = JSON.parse(fs.readFileSync(missingKeysPath, 'utf8'));
      Object.assign(master, missingKeys);
    }
  }

  // 2. Act 1 Initial State (Nodes, Actions, Clocks)
  try {
    const { initialGameState } = loadTsModule('data/initialState.ts');
    for (const [nodeId, node] of Object.entries(initialGameState.nodes)) {
      master[`node.${nodeId}.title`] = node.title;
      master[`node.${nodeId}.district`] = node.subtitle;
      if (node.description) master[`node.${nodeId}.desc`] = node.description;

      for (const slot of node.actionSlots) {
        master[`slot.${slot.id}.title`] = slot.title;
        master[`slot.${slot.id}.desc`] = slot.description;
        if (slot.outcomes?.clean?.narrativeLog) {
          master[`slot.${slot.id}.clean`] = slot.outcomes.clean.narrativeLog;
        }
        if (slot.outcomes?.compromised?.narrativeLog) {
          master[`slot.${slot.id}.compromised`] = slot.outcomes.compromised.narrativeLog;
        }
        if (slot.outcomes?.failure?.narrativeLog) {
          master[`slot.${slot.id}.failure`] = slot.outcomes.failure.narrativeLog;
        }
      }
    }

    for (const [clockId, clock] of Object.entries(initialGameState.clocks)) {
      master[`clock.${clockId}.title`] = clock.title;
      master[`clock.${clockId}.desc`] = clock.description;
    }
  } catch (err) {
    console.warn('Failed to extract initialState:', err.message);
  }

  // 3. Act 2 State (Nodes, Actions, Clocks)
  try {
    const { ACT_2_NODES, ACT_2_CLOCKS } = loadTsModule('data/act2State.ts');
    if (ACT_2_NODES) {
      for (const [nodeId, node] of Object.entries(ACT_2_NODES)) {
        master[`node.${nodeId}.title`] = node.title;
        master[`node.${nodeId}.district`] = node.subtitle;
        if (node.description) master[`node.${nodeId}.desc`] = node.description;

        for (const slot of node.actionSlots) {
          master[`slot.${slot.id}.title`] = slot.title;
          master[`slot.${slot.id}.desc`] = slot.description;
          if (slot.outcomes?.clean?.narrativeLog) {
            master[`slot.${slot.id}.clean`] = slot.outcomes.clean.narrativeLog;
          }
          if (slot.outcomes?.compromised?.narrativeLog) {
            master[`slot.${slot.id}.compromised`] = slot.outcomes.compromised.narrativeLog;
          }
          if (slot.outcomes?.failure?.narrativeLog) {
            master[`slot.${slot.id}.failure`] = slot.outcomes.failure.narrativeLog;
          }
        }
      }
    }

    if (ACT_2_CLOCKS) {
      for (const [clockId, clock] of Object.entries(ACT_2_CLOCKS)) {
        master[`clock.${clockId}.title`] = clock.title;
        master[`clock.${clockId}.desc`] = clock.description;
      }
    }
  } catch (err) {
    console.warn('Failed to extract act2State:', err.message);
  }

  // 4. Items Catalog
  try {
    const { ITEMS_CATALOG } = loadTsModule('data/itemsCatalog.ts');
    for (const [itemId, item] of Object.entries(ITEMS_CATALOG)) {
      if (!master[`item.${itemId}`]) {
        master[`item.${itemId}`] = item.title;
      }
      master[`item.${itemId}.name`] = item.title;
      master[`item.${itemId}.desc`] = item.summary;
      if (item.gameplayEffect) {
        master[`item.${itemId}.effect`] = item.gameplayEffect;
      }
    }
  } catch (err) {
    console.warn('Failed to extract itemsCatalog:', err.message);
  }

  // 5. Narrative Events Deck
  try {
    const { EVENT_DECK } = loadTsModule('data/eventDeck.ts');
    for (const [evtId, evt] of Object.entries(EVENT_DECK)) {
      master[`event.${evtId}.title`] = evt.title;
      if (evt.locationLabel) master[`event.${evtId}.location`] = evt.locationLabel;
      if (evt.speakerName) master[`event.${evtId}.speaker`] = evt.speakerName;
      if (evt.speakerRole) master[`event.${evtId}.role`] = evt.speakerRole;

      if (Array.isArray(evt.bodyText)) {
        evt.bodyText.forEach((paragraph, idx) => {
          master[`event.${evtId}.p${idx + 1}`] = paragraph;
        });
      }

      if (Array.isArray(evt.choices)) {
        evt.choices.forEach((choice) => {
          master[`choice.${choice.id}.label`] = choice.label;
          master[`choice.${choice.id}.desc`] = choice.description;
          if (choice.effect?.narrativeLog) {
            master[`choice.${choice.id}.log`] = choice.effect.narrativeLog;
          }
        });
      }
    }
  } catch (err) {
    console.warn('Failed to extract eventDeck:', err.message);
  }

  // 6. Act 1 & Act 2 Endings
  try {
    const { ACT_1_ENDINGS, ACT_2_ENDINGS } = loadTsModule('data/endings.ts');
    const allEndings = { ...(ACT_1_ENDINGS || {}), ...(ACT_2_ENDINGS || {}) };
    for (const [endingId, ending] of Object.entries(allEndings)) {
      if (ending.pathLabel) master[`ending.${endingId}.pathLabel`] = ending.pathLabel;
      master[`ending.${endingId}.title`] = ending.title;
      master[`ending.${endingId}.subtitle`] = ending.subtitle;
      master[`ending.${endingId}.quote`] = ending.summaryQuote;
      if (ending.act2Hook) master[`ending.${endingId}.hook`] = ending.act2Hook;
      if (Array.isArray(ending.epilogueParagraphs)) {
        ending.epilogueParagraphs.forEach((p, idx) => {
          master[`ending.${endingId}.p${idx + 1}`] = p;
        });
      }
      if (Array.isArray(ending.cityAftermath)) {
        ending.cityAftermath.forEach((shift, idx) => {
          master[`ending.${endingId}.shift${idx + 1}.title`] = shift.heading;
          master[`ending.${endingId}.shift${idx + 1}.summary`] = shift.detail;
        });
      }
    }
  } catch (err) {
    console.warn('Failed to extract endings:', err.message);
  }

  // 7. Contact Dialogues
  try {
    const { CONTACT_DIALOGUES } = loadTsModule('data/contactDialogues.ts');
    if (CONTACT_DIALOGUES) {
      for (const [nodeId, dialogue] of Object.entries(CONTACT_DIALOGUES)) {
        master[`dialogue.${nodeId}.name`] = dialogue.contactName;
        master[`dialogue.${nodeId}.role`] = dialogue.contactRole;

        if (dialogue.nodes) {
          for (const [dnodeId, dnode] of Object.entries(dialogue.nodes)) {
            if (Array.isArray(dnode.paragraphs)) {
              dnode.paragraphs.forEach((p, idx) => {
                master[`dialogue.${nodeId}.${dnodeId}.p${idx + 1}`] = p;
              });
            }
            if (Array.isArray(dnode.responses)) {
              dnode.responses.forEach((resp) => {
                master[`dialogue_resp.${resp.id}.label`] = resp.label;
                if (resp.rejoinder) {
                  master[`dialogue_resp.${resp.id}.rejoinder`] = resp.rejoinder;
                }
              });
            }
          }
        }
      }
    }
  } catch (err) {
    console.warn('Failed to extract contactDialogues:', err.message);
  }

  // 8. Prologue Beats
  try {
    const { CHARACTER_BACKGROUNDS, PROLOGUE_NODES } = loadTsModule('data/prologueScript.ts');
    for (const [bgId, bg] of Object.entries(CHARACTER_BACKGROUNDS)) {
      master[`bg.${bgId}.title`] = bg.title;
      master[`bg.${bgId}.tagline`] = bg.tagline;
      master[`bg.${bgId}.desc`] = bg.description;
    }
    for (const [nodeId, pnode] of Object.entries(PROLOGUE_NODES)) {
      master[`pnode.${nodeId}.time`] = pnode.timestamp;
      pnode.paragraphs.forEach((p, idx) => {
        master[`pnode.${nodeId}.p${idx + 1}`] = p;
      });
      pnode.options.forEach((opt) => {
        master[`popt.${opt.id}.label`] = opt.label;
      });
    }
  } catch (err) {
    console.warn('Failed to extract prologueScript:', err.message);
  }

  console.log(`Extraction complete: ${Object.keys(master).length} total master strings.`);
  fs.writeFileSync(enPath, JSON.stringify(master, null, 2), 'utf8');
  return master;
}

extractAllStrings().catch(console.error);
