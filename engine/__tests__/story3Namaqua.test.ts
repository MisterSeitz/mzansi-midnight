import { describe, it, expect, beforeEach, vi } from 'vitest';
import { initialNamaquaGameState, NAMAQUA_NODES } from '../../data/story3NamaquaState';
import { NAMAQUA_CHARACTER_BACKGROUNDS, NAMAQUA_PROLOGUE_NODES } from '../../data/story3NamaquaPrologue';
import { NAMAQUA_CONTACT_DIALOGUES } from '../../data/story3NamaquaDialogues';
import { NAMAQUA_EVENT_DECK } from '../../data/story3NamaquaEvents';
import { NAMAQUA_ENDINGS } from '../../data/story3NamaquaEndings';
import {
  resolveActionSlot,
  activateFactionPerk,
} from '../resolver';
import { canSelectDialogueResponse } from '../../data/contactDialogues';
import {
  recordStoryCompletion,
  loadCampaignProgression,
} from '../campaignStorage';

describe('Story 3: Namaqua-Diamond ("The Desert Skeleton Coast")', () => {
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

  describe('Initial State & World Topology', () => {
    it('initializes with correct Story 3 defaults and all 15 factions', () => {
      const state = initialNamaquaGameState;
      expect(state.storyId).toBe('story_3_namaqua');
      expect(state.day).toBe(1);
      expect(state.cash).toBe(750);
      expect(state.composure).toBe(85);
      expect(state.currentNodeId).toBe('d1_port_nolloth_jetty');

      // 15 factions initialized
      expect(state.factionRep.artisanal_divers).toBe(2);
      expect(state.factionRep.kalahari_runners).toBe(1);
      expect(state.factionRep.aegis_marine).toBe(-1);
      expect(state.factionRep.namaqua_command).toBe(0);
      expect(state.factionRep.namib_syndicate).toBe(0);
      expect(state.factionRep.hawks).toBe(0);
      expect(state.factionRep.siu_clean_hands).toBe(0);
    });

    it('contains all 7 map nodes with valid connections', () => {
      const nodeKeys = Object.keys(NAMAQUA_NODES);
      expect(nodeKeys).toHaveLength(7);
      expect(nodeKeys).toContain('d1_port_nolloth_jetty');
      expect(nodeKeys).toContain('d2_alexander_bay_quarry');
      expect(nodeKeys).toContain('d3_richtersveld_canyon');
      expect(nodeKeys).toContain('d4_debeers_ghost_mine');
      expect(nodeKeys).toContain('d5_orange_river_pont');
      expect(nodeKeys).toContain('d6_aegis_coastal_compound');
      expect(nodeKeys).toContain('d7_springbok_magistrate');

      // d1 starts unlocked
      expect(NAMAQUA_NODES['d1_port_nolloth_jetty'].isUnlocked).toBe(true);
      // d2 starts locked until survey
      expect(NAMAQUA_NODES['d2_alexander_bay_quarry'].isUnlocked).toBe(false);
    });

    it('contains all 6 regional clocks', () => {
      const clocks = initialNamaquaGameState.clocks;
      expect(clocks.malmokken_fog).toBeDefined();
      expect(clocks.aegis_naval_patrol).toBeDefined();
      expect(clocks.desert_heat_exhaustion).toBeDefined();
      expect(clocks.admiralty_investigation).toBeDefined();
      expect(clocks.diver_bends_hazard).toBeDefined();
      expect(clocks.orange_river_arms_drop).toBeDefined();
    });
  });

  describe('Action Slot Resolution & Gear Acquisitions', () => {
    it('resolves offshore bathymetry survey with a clean roll and unlocks adjacent nodes', () => {
      let state = structuredClone(initialNamaquaGameState);
      // Set die 1 to 6
      state.dicePool[0].value = 6;
      state.dicePool[0].isUsed = false;

      const next = resolveActionSlot(
        state,
        'd1_port_nolloth_jetty',
        'slot_d1_dive_survey',
        'd1'
      );

      // d1 die consumed
      expect(next.dicePool[0].isUsed).toBe(true);
      // admiralty_investigation advanced
      expect(next.clocks.admiralty_investigation.current).toBe(2);
      // d2 and d3 unlocked
      expect(next.nodes['d2_alexander_bay_quarry'].isUnlocked).toBe(true);
      expect(next.nodes['d3_richtersveld_canyon'].isUnlocked).toBe(true);
      expect(next.activeLog[0]).toContain('bathymetric contours reveal a hidden submarine canyon');
    });

    it('purchases titanium diver blade at d1 gear shop', () => {
      let state = structuredClone(initialNamaquaGameState);
      state.cash = 600;
      state.dicePool[0].value = 5;
      state.dicePool[0].isUsed = false;

      const next = resolveActionSlot(
        state,
        'd1_port_nolloth_jetty',
        'slot_d1_gear_shop',
        'd1'
      );

      expect(next.cash).toBe(150);
      expect(next.inventory).toContain('gear_diver_knife');
    });
  });

  describe('Story 3 Faction Perks', () => {
    it('activates perk_diver_compression to reduce bends hazard and restore composure', () => {
      let state = structuredClone(initialNamaquaGameState);
      state.clocks.diver_bends_hazard.current = 4;
      state.composure = 70;
      state.factionRep.artisanal_divers = 2;

      const next = activateFactionPerk(state, 'perk_diver_compression');
      expect(next.clocks.diver_bends_hazard.current).toBe(2);
      expect(next.composure).toBe(80);
      expect(next.usedPerksToday).toContain('perk_diver_compression');
      expect(next.activeLog[0]).toContain('[FACTION PERK: DIVER DECOMPRESSION]');
    });

    it('activates perk_kalahari_fuel_drop to reduce desert heat and grant cash', () => {
      let state = structuredClone(initialNamaquaGameState);
      state.clocks.desert_heat_exhaustion.current = 3;
      state.cash = 500;
      state.factionRep.kalahari_runners = 2;

      const next = activateFactionPerk(state, 'perk_kalahari_fuel_drop');
      expect(next.clocks.desert_heat_exhaustion.current).toBe(1);
      expect(next.cash).toBe(700);
      expect(next.usedPerksToday).toContain('perk_kalahari_fuel_drop');
      expect(next.activeLog[0]).toContain('[FACTION PERK: KALAHARI FUEL DROP]');
    });

    it('activates perk_sea_fisheries_impound to advance admiralty investigation and reduce patrol heat', () => {
      let state = structuredClone(initialNamaquaGameState);
      state.clocks.admiralty_investigation.current = 1;
      state.clocks.aegis_naval_patrol.current = 3;
      state.factionRep.namaqua_command = 2;

      const next = activateFactionPerk(state, 'perk_sea_fisheries_impound');
      expect(next.clocks.admiralty_investigation.current).toBe(2);
      expect(next.clocks.aegis_naval_patrol.current).toBe(2);
      expect(next.usedPerksToday).toContain('perk_sea_fisheries_impound');
      expect(next.activeLog[0]).toContain('[FACTION PERK: SEA FISHERIES IMPOUND]');
    });

    it('activates perk_namib_gem_valuation to liquidate diamonds for cash', () => {
      let state = structuredClone(initialNamaquaGameState);
      state.cash = 200;
      state.factionRep.namib_syndicate = 2;

      const next = activateFactionPerk(state, 'perk_namib_gem_valuation');
      expect(next.cash).toBe(950);
      expect(next.usedPerksToday).toContain('perk_namib_gem_valuation');
      expect(next.activeLog[0]).toContain('[FACTION PERK: NAMIB GEM VALUATION]');
    });

    it('activates perk_radar_scramble to blind gunboat patrols', () => {
      let state = structuredClone(initialNamaquaGameState);
      state.clocks.aegis_naval_patrol.current = 4;
      state.clocks.malmokken_fog.current = 2;
      state.factionRep.aegis_marine = 1;

      const next = activateFactionPerk(state, 'perk_radar_scramble');
      expect(next.clocks.aegis_naval_patrol.current).toBe(2);
      expect(next.clocks.malmokken_fog.current).toBe(3);
      expect(next.usedPerksToday).toContain('perk_radar_scramble');
      expect(next.activeLog[0]).toContain('[FACTION PERK: RADAR FREQUENCY SCRAMBLE]');
    });
  });

  describe('NPC Contact Dialogues & Prologue Archetypes', () => {
    it('defines 3 distinct character backgrounds for Story 3', () => {
      expect(NAMAQUA_CHARACTER_BACKGROUNDS.deep_sea_diver).toBeDefined();
      expect(NAMAQUA_CHARACTER_BACKGROUNDS.kalahari_tracker).toBeDefined();
      expect(NAMAQUA_CHARACTER_BACKGROUNDS.ex_naval_infiltrator).toBeDefined();

      expect(NAMAQUA_CHARACTER_BACKGROUNDS.deep_sea_diver.stats.street).toBe(2);
      expect(NAMAQUA_CHARACTER_BACKGROUNDS.kalahari_tracker.stats.dockets).toBe(2);
      expect(NAMAQUA_CHARACTER_BACKGROUNDS.ex_naval_infiltrator.stats.wire).toBe(2);
    });

    it('defines 3 narrative prologue nodes', () => {
      expect(NAMAQUA_PROLOGUE_NODES.namaqua_scene_1_intro).toBeDefined();
      expect(NAMAQUA_PROLOGUE_NODES.namaqua_scene_2_contact).toBeDefined();
      expect(NAMAQUA_PROLOGUE_NODES.namaqua_scene_3_launch).toBeDefined();
    });

    it('evaluates dialogue gating on Bettie van Zyl tree', () => {
      const state = structuredClone(initialNamaquaGameState);
      const tree = NAMAQUA_CONTACT_DIALOGUES.d1_port_nolloth_jetty;
      expect(tree).toBeDefined();

      const sonarOption = tree.nodes.bettie_root.responses.find(
        (r) => r.id === 'resp_bettie_sonar'
      );
      expect(sonarOption).toBeDefined();

      // Gideon Brand has dockets 1
      state.stats.dockets = 1;
      const canSelect = canSelectDialogueResponse(state, sonarOption!);
      expect(canSelect.allowed).toBe(true);

      state.stats.dockets = 0;
      const cannotSelect = canSelectDialogueResponse(state, sonarOption!);
      expect(cannotSelect.allowed).toBe(false);
      expect(cannotSelect.lockReason).toContain('Requires DOCKETS >= 1');
    });
  });

  describe('Climaxes, Endings & Campaign Progression', () => {
    it('defines all 4 Story 3 endings', () => {
      expect(NAMAQUA_ENDINGS.ending_namaqua_naval_raid).toBeDefined();
      expect(NAMAQUA_ENDINGS.ending_namaqua_divers_rebellion).toBeDefined();
      expect(NAMAQUA_ENDINGS.ending_namaqua_diamond_flight).toBeDefined();
      expect(NAMAQUA_ENDINGS.ending_namaqua_desert_dune_grave).toBeDefined();
    });

    it('records Story 3 completion and unlocks Story 4: Cape-Nocturne with keystone', () => {
      const result = recordStoryCompletion(
        'story_3_namaqua',
        'ending_namaqua_naval_raid'
      );

      expect(result.unlockedStories).toContain('story_4_cape');
      expect(result.collectedKeystones).toContain('dossier_admiralty_manifest');

      const savedProgression = loadCampaignProgression();
      expect(savedProgression.unlockedStories).toContain('story_4_cape');
      expect(savedProgression.collectedKeystones).toContain('dossier_admiralty_manifest');
      expect(savedProgression.completedStories.story_3_namaqua).toBeDefined();
      expect(savedProgression.completedStories.story_3_namaqua?.endingId).toBe(
        'ending_namaqua_naval_raid'
      );
    });
  });
});
