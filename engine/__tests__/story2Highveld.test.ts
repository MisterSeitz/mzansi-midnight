import { describe, it, expect, beforeEach, vi } from 'vitest';
import { initialHighveldGameState } from '../../data/story2HighveldState';
import { HIGHVELD_CONTACT_DIALOGUES } from '../../data/story2HighveldDialogues';
import { HIGHVELD_ENDINGS } from '../../data/story2HighveldEndings';
import {
  resolveActionSlot,
  activateFactionPerk,
  applyDialogueReward,
} from '../resolver';
import {
  recordStoryCompletion,
  getStoryStatus,
} from '../campaignStorage';
import { GameState } from '../../types/game';

function cloneHighveldState(): GameState {
  return structuredClone(initialHighveldGameState);
}

describe('Story 2: Highveld-Chrome ("The Capital Syndicate") Engine Tests', () => {
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
      },
    });
  });

  describe('1. State Initialization & Regional Foundation', () => {
    it('initializes with correct Highveld metadata and storyId', () => {
      const state = cloneHighveldState();
      expect(state.storyId).toBe('story_2_highveld');
      expect(state.currentNodeId).toBe('h1_braamfontein_safehouse');
      expect(state.inventory).toContain('evidence_lerato_audit_notes');
    });

    it('contains all 7 Highveld nodes with valid coordinates and action slots', () => {
      const state = cloneHighveldState();
      const nodeKeys = Object.keys(state.nodes);
      expect(nodeKeys).toHaveLength(7);
      expect(nodeKeys).toContain('h1_braamfontein_safehouse');
      expect(nodeKeys).toContain('h2_sandton_tower');
      expect(nodeKeys).toContain('h3_hillbrow_substation');
      expect(nodeKeys).toContain('h4_witwatersrand_shaft');
      expect(nodeKeys).toContain('h5_union_buildings');
      expect(nodeKeys).toContain('h6_kendon_coal_depot');
      expect(nodeKeys).toContain('h7_siu_headquarters');

      expect(state.nodes['h1_braamfontein_safehouse'].isUnlocked).toBe(true);
      expect(state.nodes['h1_braamfontein_safehouse'].actionSlots.length).toBeGreaterThan(0);
    });

    it('initializes all 6 Highveld threat and world clocks', () => {
      const state = cloneHighveldState();
      expect(state.clocks.megawatt_sabotage).toBeDefined();
      expect(state.clocks.megawatt_sabotage.max).toBe(8);
      expect(state.clocks.rockfall_hazard).toBeDefined();
      expect(state.clocks.rockfall_hazard.max).toBe(6);
      expect(state.clocks.siu_tribunal_docket).toBeDefined();
      expect(state.clocks.siu_tribunal_docket.max).toBe(6);
      expect(state.clocks.nia_surveillance).toBeDefined();
      expect(state.clocks.crack_midas_coldstorage).toBeDefined();
      expect(state.clocks.kendon_blackout_countdown).toBeDefined();
    });

    it('initializes all 10 factions with baseline reputations', () => {
      const state = cloneHighveldState();
      expect(state.factionRep.megawatt_cartel).toBe(-1);
      expect(state.factionRep.sandton_arbitrage).toBe(0);
      expect(state.factionRep.reef_zamazamas).toBe(1);
      expect(state.factionRep.siu_clean_hands).toBe(2);
      expect(state.factionRep.red_guard_populists).toBe(0);
    });
  });

  describe('2. Action Slot Resolution & Mechanical Modifiers', () => {
    it('resolves Lerato Cold Case slot on clean success (6+), advancing SIU Tribunal Docket', () => {
      const state = cloneHighveldState();
      const dieId = state.dicePool[0].id;
      state.dicePool[0].value = 6;
      state.stats.dockets = 1;

      const next = resolveActionSlot(
        state,
        'h1_braamfontein_safehouse',
        'slot_h1_lerato_coldcase',
        dieId
      );

      expect(next.dicePool[0].isUsed).toBe(true);
      expect(next.clocks.siu_tribunal_docket.current).toBe(2);
      expect(next.nodes['h3_hillbrow_substation'].isUnlocked).toBe(true);
      expect(next.nodes['h7_siu_headquarters'].isUnlocked).toBe(true);
    });

    it('resolves Crown Mines Level 14 gold trade, incrementing rockfall hazard clock', () => {
      const state = cloneHighveldState();
      state.nodes['h4_witwatersrand_shaft'].isUnlocked = true;
      state.currentNodeId = 'h4_witwatersrand_shaft';

      const dieId = state.dicePool[0].id;
      state.dicePool[0].value = 5;
      state.stats.street = 1; // 5 + 1 = 6 Clean Success

      const next = resolveActionSlot(
        state,
        'h4_witwatersrand_shaft',
        'slot_h4_mine_gold',
        dieId
      );

      expect(next.clocks.rockfall_hazard.current).toBe(1);
      expect(next.cash).toBe(state.cash + 1600);
      expect(next.factionRep.reef_zamazamas).toBe(state.factionRep.reef_zamazamas + 1);
    });
  });

  describe('3. Highveld Faction Perks', () => {
    it('activates Red Guard Substation Bypass to reduce Megawatt Sabotage clock', () => {
      const state = cloneHighveldState();
      state.clocks.megawatt_sabotage.current = 4;
      state.factionRep.red_guard_populists = 3;

      const next = activateFactionPerk(state, 'perk_substation_bypass');
      expect(next.clocks.megawatt_sabotage.current).toBe(3);
      expect(next.usedPerksToday).toContain('perk_substation_bypass');
    });

    it('activates SIU Subpoena to advance SIU Tribunal Docket clock', () => {
      const state = cloneHighveldState();
      state.clocks.siu_tribunal_docket.current = 2;
      state.factionRep.siu_clean_hands = 3;

      const next = activateFactionPerk(state, 'perk_siu_subpoena');
      expect(next.clocks.siu_tribunal_docket.current).toBe(3);
      expect(next.usedPerksToday).toContain('perk_siu_subpoena');
    });
  });

  describe('4. Highveld Contact Dialogues & Unclaimed Rewards', () => {
    it('loads Advocate Nomsa Khumalo dialogue tree and claims laboratory warrants reward', () => {
      const state = cloneHighveldState();
      const khumaloTree = HIGHVELD_CONTACT_DIALOGUES['h7_siu_headquarters'];
      expect(khumaloTree).toBeDefined();
      expect(khumaloTree.contactName).toBe('Advocate Nomsa Khumalo');

      const response = khumaloTree.nodes.khumalo_root.responses.find(
        (r) => r.id === 'resp_khumalo_slurry'
      );
      expect(response).toBeDefined();
      expect(response?.rewardId).toBe('rew_khumalo_warrants');

      if (response && response.rewardId && response.effect) {
        const next = applyDialogueReward(
          state,
          response.rewardId,
          response.effect,
          response.costCash
        );
        expect(next.claimedDialogueRewards).toContain('rew_khumalo_warrants');
        expect(next.cash).toBe(state.cash + 600);
        expect(next.clocks.siu_tribunal_docket.current).toBe(2);
      }
    });
  });

  describe('5. Highveld Endings & Campaign Progression Unlocks', () => {
    it('defines all 4 Highveld narrative endings with title, subtitle, and pathLabel', () => {
      expect(HIGHVELD_ENDINGS.ending_highveld_siu_vindication).toBeDefined();
      expect(HIGHVELD_ENDINGS.ending_highveld_red_blackout).toBeDefined();
      expect(HIGHVELD_ENDINGS.ending_highveld_arbitrage_partner).toBeDefined();
      expect(HIGHVELD_ENDINGS.ending_highveld_shaft_collapse).toBeDefined();

      expect(HIGHVELD_ENDINGS.ending_highveld_siu_vindication.pathLabel).toBe(
        'THE CONSTITUTIONAL INDICTMENT // CLEAN HANDS'
      );
    });

    it('records completion of Story 2, extracts Keystone Dossier Project Midas, and unlocks Story 3', () => {
      // First complete Story 1
      recordStoryCompletion('story_1_ethekwini', 'ending_whistleblower');

      // Now complete Story 2
      const updated = recordStoryCompletion(
        'story_2_highveld',
        'ending_highveld_siu_vindication',
        { stat: 'wire', bonus: 1 }
      );

      expect(getStoryStatus('story_2_highveld', updated)).toBe('completed');
      expect(getStoryStatus('story_3_namaqua', updated)).toBe('unlocked');
      expect(updated.collectedKeystones).toContain('dossier_project_midas');
      expect(updated.completedStories['story_2_highveld']?.endingId).toBe(
        'ending_highveld_siu_vindication'
      );
      expect(
        updated.completedStories['story_2_highveld']?.heroStatCarryover?.stat
      ).toBe('wire');
    });
  });
});
