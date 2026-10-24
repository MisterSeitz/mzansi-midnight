import { describe, it, expect, beforeEach, vi } from 'vitest';
import { initialOctagonGameState, OCTAGON_NODES } from '../../data/story5OctagonState';
import {
  OCTAGON_CHARACTER_BACKGROUNDS,
  OCTAGON_PROLOGUE_NODES,
} from '../../data/story5OctagonPrologue';
import { OCTAGON_CONTACT_DIALOGUES } from '../../data/story5OctagonDialogues';
import { OCTAGON_EVENT_DECK } from '../../data/story5OctagonEvents';
import { OCTAGON_ENDINGS } from '../../data/story5OctagonEndings';
import {
  resolveActionSlot,
  activateFactionPerk,
} from '../resolver';
import { canSelectDialogueResponse } from '../../data/contactDialogues';
import {
  recordStoryCompletion,
  loadCampaignProgression,
} from '../campaignStorage';

describe('Story 5: The Sovereign Octagon ("The Grand National Finale")', () => {
  let localStorageMock: Record<string, string> = {};

  beforeEach(() => {
    localStorageMock = {};
    vi.stubGlobal('window', {
      localStorage: {
        getItem: vi.fn((key: string) => localStorageMock[key] || null),
        setItem: vi.fn((key: string, value: string) => {
          localStorageMock[key] = value;
        }),
        removeItem: vi.fn((key: string) => {
          delete localStorageMock[key];
        }),
        clear: vi.fn(() => {
          localStorageMock = {};
        }),
      },
    });
  });

  describe('Initial State & National Topology', () => {
    it('initializes with correct Story 5 defaults and all 25 factions', () => {
      const state = initialOctagonGameState;
      expect(state.storyId).toBe('story_5_octagon');
      expect(state.day).toBe(1);
      expect(state.cash).toBe(1500);
      expect(state.composure).toBe(90);
      expect(state.currentNodeId).toBe('o1_drakensberg_bunker');

      // 25 factions initialized across all stories
      expect(state.factionRep.united_hawks_taskforce).toBe(2);
      expect(state.factionRep.the_sovereign_octagon).toBe(-2);
      expect(state.factionRep.constitutional_court_guard).toBe(1);
      expect(state.factionRep.national_grid_command).toBe(1);
      expect(state.factionRep.people_resistance_front).toBe(1);

      // Previous stories' factions exist
      expect(state.factionRep.hawks).toBe(0);
      expect(state.factionRep.siu_clean_hands).toBe(0);
      expect(state.factionRep.namaqua_command).toBe(0);
      expect(state.factionRep.agu_renegades).toBe(0);
      expect(state.factionRep.winelands_club).toBe(0);
    });

    it('contains all 7 national command nodes with valid connections', () => {
      const nodeKeys = Object.keys(OCTAGON_NODES);
      expect(nodeKeys).toHaveLength(7);
      expect(nodeKeys).toContain('o1_drakensberg_bunker');
      expect(nodeKeys).toContain('o2_union_buildings_subbasement');
      expect(nodeKeys).toContain('o3_apollo_grid_command');
      expect(nodeKeys).toContain('o4_durban_berth_command');
      expect(nodeKeys).toContain('o5_karoo_airspace_corridor');
      expect(nodeKeys).toContain('o6_stellenbosch_oligarch_vault');
      expect(nodeKeys).toContain('o7_octagon_summit_chamber');

      // o1 starts unlocked
      expect(OCTAGON_NODES['o1_drakensberg_bunker'].isUnlocked).toBe(true);
      // o7 starts locked
      expect(OCTAGON_NODES['o7_octagon_summit_chamber'].isUnlocked).toBe(false);
    });

    it('contains all 6 regional and national clocks', () => {
      const clocks = initialOctagonGameState.clocks;
      expect(clocks.national_blackout_countdown).toBeDefined();
      expect(clocks.national_blackout_countdown.max).toBe(8);
      expect(clocks.octagon_mercenary_sweep).toBeDefined();
      expect(clocks.airspace_radar_jamming).toBeDefined();
      expect(clocks.treason_indictment_docket).toBeDefined();
      expect(clocks.decrypt_master_omega_cipher).toBeDefined();
      expect(clocks.midnight_sun_coup_countdown).toBeDefined();
    });
  });

  describe('Action Slot Resolution & Gear Acquisitions', () => {
    it('resolves war room dossier synthesis with a clean roll and unlocks adjacent nodes', () => {
      const state = structuredClone(initialOctagonGameState);
      state.dicePool[0].value = 6;
      state.dicePool[0].isUsed = false;

      const next = resolveActionSlot(
        state,
        'o1_drakensberg_bunker',
        'slot_o1_war_room_synthesis',
        'd1'
      );

      expect(next.clocks.treason_indictment_docket.current).toBe(3);
      expect(next.nodes['o2_union_buildings_subbasement'].isUnlocked).toBe(true);
      expect(next.nodes['o3_apollo_grid_command'].isUnlocked).toBe(true);
      expect(next.activeLog[0]).toContain('The four regional keystones interlock');
    });

    it('purchases taskforce satellite uplink gear cleanly from o1 bunker armory', () => {
      const state = structuredClone(initialOctagonGameState);
      state.cash = 2000;
      state.dicePool[0].value = 6;
      state.dicePool[0].isUsed = false;

      const next = resolveActionSlot(
        state,
        'o1_drakensberg_bunker',
        'slot_o1_buy_gear',
        'd1'
      );

      expect(next.inventory).toContain('gear_taskforce_satellite_uplink');
      expect(next.cash).toBe(800); // 2000 - 1200
    });

    it('reclaims manual SCADA failsafe bypass on Apollo substation slot', () => {
      const state = structuredClone(initialOctagonGameState);
      state.nodes['o3_apollo_grid_command'].isUnlocked = true;
      state.clocks.national_blackout_countdown.current = 5;
      state.dicePool[0].value = 6;
      state.dicePool[0].isUsed = false;

      const next = resolveActionSlot(
        state,
        'o3_apollo_grid_command',
        'slot_o3_reboot_scada_breakers',
        'd1'
      );

      expect(next.clocks.national_blackout_countdown.current).toBe(3); // 5 - 2
    });
  });

  describe('Story 5 Faction Standing Perks', () => {
    it('activates Taskforce Tactical Airlift (+15% Comp, -2 Mercenary Sweep)', () => {
      const state = structuredClone(initialOctagonGameState);
      state.factionRep.united_hawks_taskforce = 2;
      state.composure = 60;
      state.clocks.octagon_mercenary_sweep.current = 4;

      const next = activateFactionPerk(state, 'perk_taskforce_airlift');
      expect(next.composure).toBe(75);
      expect(next.clocks.octagon_mercenary_sweep.current).toBe(2);
      expect(next.usedPerksToday).toContain('perk_taskforce_airlift');
    });

    it('activates Constitutional Emergency Subpoena (+1 Treason Indictment, -1 Coup Countdown)', () => {
      const state = structuredClone(initialOctagonGameState);
      state.factionRep.constitutional_court_guard = 1;
      state.clocks.treason_indictment_docket.current = 2;
      state.clocks.midnight_sun_coup_countdown.current = 4;

      const next = activateFactionPerk(state, 'perk_constitutional_subpoena');
      expect(next.clocks.treason_indictment_docket.current).toBe(3);
      expect(next.clocks.midnight_sun_coup_countdown.current).toBe(3);
      expect(next.usedPerksToday).toContain('perk_constitutional_subpoena');
    });

    it('activates Apollo Black-Start Bypass (-2 Blackout Countdown, +10% Composure)', () => {
      const state = structuredClone(initialOctagonGameState);
      state.factionRep.national_grid_command = 1;
      state.composure = 70;
      state.clocks.national_blackout_countdown.current = 6;

      const next = activateFactionPerk(state, 'perk_black_start_bypass');
      expect(next.clocks.national_blackout_countdown.current).toBe(4);
      expect(next.composure).toBe(80);
      expect(next.usedPerksToday).toContain('perk_black_start_bypass');
    });

    it('activates Mass Civil Mobilization (-1 Mercenary Sweep, -1 Coup Countdown, +R300)', () => {
      const state = structuredClone(initialOctagonGameState);
      state.factionRep.people_resistance_front = 1;
      state.cash = 500;
      state.clocks.octagon_mercenary_sweep.current = 3;
      state.clocks.midnight_sun_coup_countdown.current = 3;

      const next = activateFactionPerk(state, 'perk_mass_civil_mobilization');
      expect(next.clocks.octagon_mercenary_sweep.current).toBe(2);
      expect(next.clocks.midnight_sun_coup_countdown.current).toBe(2);
      expect(next.cash).toBe(800);
      expect(next.usedPerksToday).toContain('perk_mass_civil_mobilization');
    });

    it('activates Signals Intercept Omega (+1 Omega Decryption, -1 Radar Jamming)', () => {
      const state = structuredClone(initialOctagonGameState);
      state.factionRep.the_sovereign_octagon = 1;
      state.clocks.decrypt_master_omega_cipher.current = 1;
      state.clocks.airspace_radar_jamming.current = 3;

      const next = activateFactionPerk(state, 'perk_signals_intercept_omega');
      expect(next.clocks.decrypt_master_omega_cipher.current).toBe(2);
      expect(next.clocks.airspace_radar_jamming.current).toBe(2);
      expect(next.usedPerksToday).toContain('perk_signals_intercept_omega');
    });
  });

  describe('Story 5 Contact Dialogues', () => {
    it('verifies Deputy Chief Justice Sindi Sithole dialogue options and requirements', () => {
      const tree = OCTAGON_CONTACT_DIALOGUES['o1_drakensberg_bunker'];
      expect(tree).toBeDefined();
      expect(tree.contactName).toBe('Deputy Chief Justice Sindi Sithole');

      const state = structuredClone(initialOctagonGameState);
      state.stats.dockets = 2;

      const rootNode = tree.nodes[tree.rootNodeId];
      const warrantResp = rootNode.responses.find(
        (r) => r.id === 'resp_sithole_consolidate_dockets'
      );
      expect(warrantResp).toBeDefined();

      const check = canSelectDialogueResponse(state, warrantResp!);
      expect(check.allowed).toBe(true);
    });

    it('verifies Minister Phumzile Mthembu executive seal response', () => {
      const tree = OCTAGON_CONTACT_DIALOGUES['o2_union_buildings_subbasement'];
      expect(tree).toBeDefined();
      expect(tree.contactName).toBe('Minister Phumzile Mthembu');

      const state = structuredClone(initialOctagonGameState);
      state.stats.influence = 2;

      const rootNode = tree.nodes[tree.rootNodeId];
      const sealResp = rootNode.responses.find(
        (r) => r.id === 'resp_phumzile_secure_seal'
      );
      expect(sealResp).toBeDefined();

      const check = canSelectDialogueResponse(state, sealResp!);
      expect(check.allowed).toBe(true);
    });

    it('verifies Chief Engineer Kabelo Motaung SCADA stabilization response', () => {
      const tree = OCTAGON_CONTACT_DIALOGUES['o3_apollo_grid_command'];
      expect(tree).toBeDefined();

      const state = structuredClone(initialOctagonGameState);
      state.stats.wire = 2;

      const rootNode = tree.nodes[tree.rootNodeId];
      const logicBombResp = rootNode.responses.find(
        (r) => r.id === 'resp_kabelo_neutralize_logic_bomb'
      );
      expect(logicBombResp).toBeDefined();

      const check = canSelectDialogueResponse(state, logicBombResp!);
      expect(check.allowed).toBe(true);
    });

    it('verifies Bra Bheki & Cassiem Alliance port civil blockade response', () => {
      const tree = OCTAGON_CONTACT_DIALOGUES['o4_durban_berth_command'];
      expect(tree).toBeDefined();

      const state = structuredClone(initialOctagonGameState);
      state.stats.street = 2;

      const rootNode = tree.nodes[tree.rootNodeId];
      const blockadeResp = rootNode.responses.find(
        (r) => r.id === 'resp_bheki_mobilize_civil_blockade'
      );
      expect(blockadeResp).toBeDefined();

      const check = canSelectDialogueResponse(state, blockadeResp!);
      expect(check.allowed).toBe(true);
    });

    it('verifies Lord Sterling & General Swart climax confrontation', () => {
      const tree = OCTAGON_CONTACT_DIALOGUES['o7_octagon_summit_chamber'];
      expect(tree).toBeDefined();

      const state = structuredClone(initialOctagonGameState);
      state.stats.dockets = 3;

      const rootNode = tree.nodes[tree.rootNodeId];
      const arrestResp = rootNode.responses.find(
        (r) => r.id === 'resp_sterling_constitutional_arrest'
      );
      expect(arrestResp).toBeDefined();

      const check = canSelectDialogueResponse(state, arrestResp!);
      expect(check.allowed).toBe(true);
    });
  });

  describe('Story 5 Prologue Structure', () => {
    it('has all 3 operational command backgrounds', () => {
      expect(OCTAGON_CHARACTER_BACKGROUNDS.taskforce_commander_nandi).toBeDefined();
      expect(OCTAGON_CHARACTER_BACKGROUNDS.taskforce_strike_gideon).toBeDefined();
      expect(OCTAGON_CHARACTER_BACKGROUNDS.taskforce_intelligence_leila).toBeDefined();

      expect(OCTAGON_CHARACTER_BACKGROUNDS.taskforce_commander_nandi.stats.influence).toBe(2);
      expect(OCTAGON_CHARACTER_BACKGROUNDS.taskforce_strike_gideon.stats.street).toBe(2);
      expect(OCTAGON_CHARACTER_BACKGROUNDS.taskforce_intelligence_leila.stats.wire).toBe(2);
    });

    it('has all 3 prologue narrative scene nodes chaining to launch', () => {
      expect(OCTAGON_PROLOGUE_NODES.prologue_octagon_intro).toBeDefined();
      expect(OCTAGON_PROLOGUE_NODES.prologue_octagon_choice).toBeDefined();
      expect(OCTAGON_PROLOGUE_NODES.prologue_octagon_launch).toBeDefined();

      const choiceNode = OCTAGON_PROLOGUE_NODES.prologue_octagon_choice;
      expect(choiceNode.isBackgroundSelect).toBe(true);
      expect(choiceNode.options).toHaveLength(3);

      const launchNode = OCTAGON_PROLOGUE_NODES.prologue_octagon_launch;
      expect(launchNode.options[0].nextSceneNodeId).toBe('done');
    });
  });

  describe('Story 5 Event Deck & Climax', () => {
    it('defines all threat crises, breakthroughs, and summit breach climax', () => {
      expect(OCTAGON_EVENT_DECK.evt_black_sky_collapse).toBeDefined();
      expect(OCTAGON_EVENT_DECK.evt_mercenary_air_assault).toBeDefined();
      expect(OCTAGON_EVENT_DECK.evt_radar_blackout_hazard).toBeDefined();
      expect(OCTAGON_EVENT_DECK.evt_coup_declaration_crisis).toBeDefined();
      expect(OCTAGON_EVENT_DECK.evt_treason_docket_complete).toBeDefined();
      expect(OCTAGON_EVENT_DECK.evt_omega_cipher_decrypted).toBeDefined();
      expect(OCTAGON_EVENT_DECK.evt_summit_breach_climax).toBeDefined();
    });

    it('summit breach climax offers paths to all 5 grand endings', () => {
      const climax = OCTAGON_EVENT_DECK.evt_summit_breach_climax;
      expect(climax.choices).toHaveLength(5);
      const endingIds = climax.choices.map((c) => c.effect.triggerEndingId);
      expect(endingIds).toContain('ending_octagon_constitutional_reckoning');
      expect(endingIds).toContain('ending_octagon_peoples_revolution');
      expect(endingIds).toContain('ending_octagon_shadow_director');
      expect(endingIds).toContain('ending_octagon_balkanized_republic');
      expect(endingIds).toContain('ending_octagon_vanished_watchers');
    });
  });

  describe('Story 5 Grand Endings & Campaign Completion', () => {
    it('defines all 5 grand endings with rich narratives', () => {
      expect(OCTAGON_ENDINGS.ending_octagon_constitutional_reckoning).toBeDefined();
      expect(OCTAGON_ENDINGS.ending_octagon_peoples_revolution).toBeDefined();
      expect(OCTAGON_ENDINGS.ending_octagon_shadow_director).toBeDefined();
      expect(OCTAGON_ENDINGS.ending_octagon_balkanized_republic).toBeDefined();
      expect(OCTAGON_ENDINGS.ending_octagon_vanished_watchers).toBeDefined();

      const constitutional = OCTAGON_ENDINGS.ending_octagon_constitutional_reckoning;
      expect(constitutional.pathLabel).toContain('CONSTITUTIONAL RECKONING');
      expect(constitutional.epilogueParagraphs.length).toBeGreaterThanOrEqual(3);
      expect(constitutional.cityAftermath).toHaveLength(3);
    });

    it('records story completion into campaign storage', () => {
      recordStoryCompletion(
        'story_5_octagon',
        'ending_octagon_constitutional_reckoning'
      );
      const prog = loadCampaignProgression();
      expect(prog.completedStories.story_5_octagon).toBeDefined();
      expect(prog.completedStories.story_5_octagon?.endingId).toBe(
        'ending_octagon_constitutional_reckoning'
      );
    });
  });
});
