import { describe, it, expect, beforeEach, vi } from 'vitest';
import { initialCapeGameState, CAPE_NODES } from '../../data/story4CapeState';
import { CAPE_CHARACTER_BACKGROUNDS, CAPE_PROLOGUE_NODES } from '../../data/story4CapePrologue';
import { CAPE_CONTACT_DIALOGUES } from '../../data/story4CapeDialogues';
import { CAPE_EVENT_DECK } from '../../data/story4CapeEvents';
import { CAPE_ENDINGS } from '../../data/story4CapeEndings';
import {
  resolveActionSlot,
  activateFactionPerk,
} from '../resolver';
import { canSelectDialogueResponse } from '../../data/contactDialogues';
import {
  recordStoryCompletion,
  loadCampaignProgression,
} from '../campaignStorage';

describe('Story 4: Cape-Nocturne ("The Shadow Oligarchy")', () => {
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
    it('initializes with correct Story 4 defaults and all 20 factions', () => {
      const state = initialCapeGameState;
      expect(state.storyId).toBe('story_4_cape');
      expect(state.day).toBe(1);
      expect(state.cash).toBe(850);
      expect(state.composure).toBe(85);
      expect(state.currentNodeId).toBe('c1_long_street_strip');

      // 20 factions initialized
      expect(state.factionRep.long_street_racket).toBe(-1);
      expect(state.factionRep.cape_gang_federation).toBe(0);
      expect(state.factionRep.winelands_club).toBe(0);
      expect(state.factionRep.agu_renegades).toBe(2);
      expect(state.factionRep.dockers_union).toBe(1);
      expect(state.factionRep.hawks).toBe(0);
      expect(state.factionRep.siu_clean_hands).toBe(0);
      expect(state.factionRep.namaqua_command).toBe(0);
    });

    it('contains all 7 map nodes with valid connections', () => {
      const nodeKeys = Object.keys(CAPE_NODES);
      expect(nodeKeys).toHaveLength(7);
      expect(nodeKeys).toContain('c1_long_street_strip');
      expect(nodeKeys).toContain('c2_manenberg_tenements');
      expect(nodeKeys).toContain('c3_camps_bay_promenade');
      expect(nodeKeys).toContain('c4_table_bay_container_berth');
      expect(nodeKeys).toContain('c5_stellenbosch_wine_estate');
      expect(nodeKeys).toContain('c6_agu_safehouse_ruin');
      expect(nodeKeys).toContain('c7_provincial_police_hq');

      // c1 starts unlocked
      expect(CAPE_NODES['c1_long_street_strip'].isUnlocked).toBe(true);
      // c6 and c7 start locked
      expect(CAPE_NODES['c6_agu_safehouse_ruin'].isUnlocked).toBe(false);
      expect(CAPE_NODES['c7_provincial_police_hq'].isUnlocked).toBe(false);
    });

    it('contains all 6 regional clocks', () => {
      const clocks = initialCapeGameState.clocks;
      expect(clocks.gang_turf_war_clock).toBeDefined();
      expect(clocks.cape_doctor_gale_clock).toBeDefined();
      expect(clocks.general_swart_manhunt).toBeDefined();
      expect(clocks.red_cipher_decryption).toBeDefined();
      expect(clocks.nightclub_extortion_clock).toBeDefined();
      expect(clocks.sovereign_arms_shipment).toBeDefined();
    });
  });

  describe('Action Slot Resolution & Gear Acquisitions', () => {
    it('resolves nightclub surveillance with a clean roll and unlocks adjacent nodes', () => {
      let state = structuredClone(initialCapeGameState);
      // Set die 1 to 6
      state.dicePool[0].value = 6;
      state.dicePool[0].isUsed = false;

      const next = resolveActionSlot(
        state,
        'c1_long_street_strip',
        'slot_c1_surveil_nightclubs',
        'd1'
      );

      // d1 die consumed
      expect(next.dicePool[0].isUsed).toBe(true);
      // nightclub_extortion_clock advanced (+2)
      expect(next.clocks.nightclub_extortion_clock.current).toBe(3);
      // c3 and c4 unlocked
      expect(next.nodes['c3_camps_bay_promenade'].isUnlocked).toBe(true);
      expect(next.nodes['c4_table_bay_container_berth'].isUnlocked).toBe(true);
      expect(next.activeLog[0]).toContain('Foreshore Holdings');
    });

    it('purchases darknet burner mesh at c1 gear shop', () => {
      let state = structuredClone(initialCapeGameState);
      state.cash = 1000;
      state.dicePool[0].value = 5;
      state.dicePool[0].isUsed = false;

      const next = resolveActionSlot(
        state,
        'c1_long_street_strip',
        'slot_c1_buy_gear',
        'd1'
      );

      expect(next.cash).toBe(150);
      expect(next.inventory).toContain('gear_encrypted_burner_mesh');
    });

    it('purchases stevedore prybar at c4 container berth', () => {
      let state = structuredClone(initialCapeGameState);
      state.cash = 800;
      state.dicePool[0].value = 6;
      state.dicePool[0].isUsed = false;

      const next = resolveActionSlot(
        state,
        'c4_table_bay_container_berth',
        'slot_c4_buy_prybar',
        'd1'
      );

      expect(next.cash).toBe(200);
      expect(next.inventory).toContain('gear_stevedore_prybar');
    });
  });

  describe('Story 4 Faction Perks', () => {
    it('activates perk_bouncer_shakedown to collect cash and composure', () => {
      let state = structuredClone(initialCapeGameState);
      state.cash = 400;
      state.composure = 70;
      state.factionRep.long_street_racket = 1;

      const next = activateFactionPerk(state, 'perk_bouncer_shakedown');
      expect(next.cash).toBe(1000);
      expect(next.composure).toBe(80);
      expect(next.usedPerksToday).toContain('perk_bouncer_shakedown');
      expect(next.activeLog[0]).toContain('[FACTION PERK: BOUNCER SHAKEDOWN]');
    });

    it('activates perk_flats_recon to reduce turf war and manhunt clocks', () => {
      let state = structuredClone(initialCapeGameState);
      state.clocks.gang_turf_war_clock.current = 4;
      state.clocks.general_swart_manhunt.current = 3;
      state.factionRep.cape_gang_federation = 2;

      const next = activateFactionPerk(state, 'perk_flats_recon');
      expect(next.clocks.gang_turf_war_clock.current).toBe(2);
      expect(next.clocks.general_swart_manhunt.current).toBe(2);
      expect(next.usedPerksToday).toContain('perk_flats_recon');
      expect(next.activeLog[0]).toContain('[FACTION PERK: CAPE FLATS RECON]');
    });

    it('activates perk_winelands_liquidity to draw emergency Swiss capital', () => {
      let state = structuredClone(initialCapeGameState);
      state.cash = 100;
      state.composure = 80;
      state.factionRep.winelands_club = 1;

      const next = activateFactionPerk(state, 'perk_winelands_liquidity');
      expect(next.cash).toBe(1100);
      expect(next.composure).toBe(70);
      expect(next.usedPerksToday).toContain('perk_winelands_liquidity');
      expect(next.activeLog[0]).toContain('[FACTION PERK: WINELANDS CAPITAL ADVANCE]');
    });

    it('activates perk_agu_ballistics to advance Red Cipher decryption', () => {
      let state = structuredClone(initialCapeGameState);
      state.clocks.red_cipher_decryption.current = 2;
      state.factionRep.agu_renegades = 2;

      const next = activateFactionPerk(state, 'perk_agu_ballistics');
      expect(next.clocks.red_cipher_decryption.current).toBe(3);
      expect(next.usedPerksToday).toContain('perk_agu_ballistics');
      expect(next.activeLog[0]).toContain('[FACTION PERK: AGU BALLISTICS AUDIT]');
    });

    it('activates perk_dockers_blockade to delay arms shipment countdown', () => {
      let state = structuredClone(initialCapeGameState);
      state.clocks.sovereign_arms_shipment.current = 3;
      state.factionRep.dockers_union = 1;

      const next = activateFactionPerk(state, 'perk_dockers_blockade');
      expect(next.clocks.sovereign_arms_shipment.current).toBe(1);
      expect(next.usedPerksToday).toContain('perk_dockers_blockade');
      expect(next.activeLog[0]).toContain('[FACTION PERK: STEVEDORE DOCK BLOCKADE]');
    });
  });

  describe('NPC Contact Dialogues & Prologue Archetypes', () => {
    it('defines 3 distinct character backgrounds for Story 4', () => {
      expect(CAPE_CHARACTER_BACKGROUNDS.agu_ballistics_detective).toBeDefined();
      expect(CAPE_CHARACTER_BACKGROUNDS.cape_flats_infiltrator).toBeDefined();
      expect(CAPE_CHARACTER_BACKGROUNDS.winelands_forensic_auditor).toBeDefined();

      expect(CAPE_CHARACTER_BACKGROUNDS.agu_ballistics_detective.stats.dockets).toBe(2);
      expect(CAPE_CHARACTER_BACKGROUNDS.cape_flats_infiltrator.stats.street).toBe(2);
      expect(CAPE_CHARACTER_BACKGROUNDS.winelands_forensic_auditor.stats.dockets).toBe(2);
      expect(CAPE_CHARACTER_BACKGROUNDS.winelands_forensic_auditor.stats.influence).toBe(1);
    });

    it('defines 3 narrative prologue nodes', () => {
      expect(CAPE_PROLOGUE_NODES.prologue_cape_intro).toBeDefined();
      expect(CAPE_PROLOGUE_NODES.prologue_cape_choice).toBeDefined();
      expect(CAPE_PROLOGUE_NODES.prologue_cape_departure).toBeDefined();
    });

    it('evaluates dialogue gating on Zack Rossouw tree', () => {
      const state = structuredClone(initialCapeGameState);
      const tree = CAPE_CONTACT_DIALOGUES.c1_long_street_strip;
      expect(tree).toBeDefined();

      const extortionOption = tree.nodes.zack_root.responses.find(
        (r) => r.id === 'resp_zack_extortion'
      );
      expect(extortionOption).toBeDefined();

      // Leila has dockets 2
      state.stats.dockets = 2;
      const canSelect = canSelectDialogueResponse(state, extortionOption!);
      expect(canSelect.allowed).toBe(true);

      state.stats.dockets = 0;
      const cannotSelect = canSelectDialogueResponse(state, extortionOption!);
      expect(cannotSelect.allowed).toBe(false);
      expect(cannotSelect.lockReason).toContain('Requires DOCKETS >= 1');
    });
  });

  describe('Climaxes, Endings & Campaign Progression', () => {
    it('defines all 4 Story 4 endings', () => {
      expect(CAPE_ENDINGS.ending_cape_sovereign_seizure).toBeDefined();
      expect(CAPE_ENDINGS.ending_cape_gang_truce).toBeDefined();
      expect(CAPE_ENDINGS.ending_cape_winelands_audit).toBeDefined();
      expect(CAPE_ENDINGS.ending_cape_shadow_execution).toBeDefined();
    });

    it('records Story 4 completion, awards keystone, and unlocks Story 5: The Sovereign Octagon when all 4 stories completed', () => {
      // Simulate completion of stories 1, 2, and 3 first
      recordStoryCompletion('story_1_ethekwini', 'ending_whistleblower');
      recordStoryCompletion('story_2_highveld', 'ending_highveld_tribunal');
      recordStoryCompletion('story_3_namaqua', 'ending_namaqua_naval_raid');

      // Now complete Story 4
      const result = recordStoryCompletion(
        'story_4_cape',
        'ending_cape_sovereign_seizure'
      );

      expect(result.collectedKeystones).toContain('dossier_red_protocol');
      expect(result.unlockedStories).toContain('story_5_octagon');
      expect(result.grandConspiracyBoardUnlocked).toBe(true);

      const savedProgression = loadCampaignProgression();
      expect(savedProgression.unlockedStories).toContain('story_5_octagon');
      expect(savedProgression.collectedKeystones).toContain('dossier_red_protocol');
      expect(savedProgression.completedStories.story_4_cape).toBeDefined();
      expect(savedProgression.completedStories.story_4_cape?.endingId).toBe(
        'ending_cape_sovereign_seizure'
      );
      expect(savedProgression.grandConspiracyBoardUnlocked).toBe(true);
    });
  });
});
