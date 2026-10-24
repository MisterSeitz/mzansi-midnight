import { describe, it, expect } from 'vitest';
import { initialGameState } from '../../data/initialState';
import { transitionToAct2 } from '../../data/act2State';
import {
  resolveActionSlot,
  advanceToNextDay,
  travelToNode,
  isCorridorRoadblocked,
  hasFreeRoadblockBypass,
  activateGeneratorDiesel,
  activateFactionPerk,
  purchaseBlackMarketGear,
  getHostileTurfPenalty,
  applyDialogueReward,
} from '../resolver';
import { resolveTriggeredEvent } from '../eventResolver';
import {
  getTacticalRecommendation,
  calculateFixerEvaluation,
} from '../advisor';
import { GameState } from '../../types/game';

function cloneInitialState(): GameState {
  return structuredClone(initialGameState);
}

describe('Mzansi Midnight Core Engine Test Suite (Phase 14)', () => {
  describe('1. resolveActionSlot — Roll Math, Modifiers & Clocks', () => {
    it('resolves a 6+ Clean Success on Audit Docket #409 (+2 clock segments, 0 composure loss)', () => {
      const state = cloneInitialState();
      // Give die d1 a face value of 5 and player +1 dockets => finalRoll = 6
      const dieId = state.dicePool[0].id;
      state.dicePool[0].value = 5;
      state.stats.dockets = 1;

      const next = resolveActionSlot(
        state,
        'n1_safehouse',
        'act_audit_docket',
        dieId
      );

      expect(next.dicePool[0].isUsed).toBe(true);
      expect(next.clocks.audit_docket_409.current).toBe(2);
      expect(next.composure).toBe(state.composure);
    });

    it('resolves a 4-5 Compromised Success (+1 clock segment and composure cost)', () => {
      const state = cloneInitialState();
      const dieId = state.dicePool[0].id;
      // Base die = 3, dockets = 1 => finalRoll = 4 (Compromised)
      state.dicePool[0].value = 3;
      state.stats.dockets = 1;

      const next = resolveActionSlot(
        state,
        'n1_safehouse',
        'act_audit_docket',
        dieId
      );

      expect(next.dicePool[0].isUsed).toBe(true);
      expect(next.clocks.audit_docket_409.current).toBe(1);
      expect(next.composure).toBeLessThan(state.composure);
    });

    it('resolves a 1-3 Failure with blowback (composure loss & no investigation progress)', () => {
      const state = cloneInitialState();
      const dieId = state.dicePool[0].id;
      // Base die = 1, dockets = 1 => finalRoll = 2 (Failure)
      state.dicePool[0].value = 1;
      state.stats.dockets = 1;

      const next = resolveActionSlot(
        state,
        'n1_safehouse',
        'act_audit_docket',
        dieId
      );

      expect(next.dicePool[0].isUsed).toBe(true);
      expect(next.clocks.audit_docket_409.current).toBe(0);
      expect(next.composure).toBeLessThan(state.composure);
    });

    it('enforces Stage 6 Load Shedding lockout unless Generator Diesel is active', () => {
      const state = cloneInitialState();
      const dieId = state.dicePool[0].id;
      state.currentNodeId = 'n5_cyber_pawn';
      state.loadSheddingStage = 6;
      state.dicePool[0].value = 6;

      // Blocked during Stage 6
      const blocked = resolveActionSlot(
        state,
        'n5_cyber_pawn',
        'act_crack_phone',
        dieId
      );
      expect(blocked.dicePool[0].isUsed).toBe(false);
      expect(blocked.activeLog[0]).toContain('Stage 6 Load Shedding');

      // Activate R300 Generator Diesel and retry
      const withDiesel = activateGeneratorDiesel(state);
      expect(withDiesel.generatorActiveToday).toBe(true);
      expect(withDiesel.cash).toBe(state.cash - 300);

      const unblocked = resolveActionSlot(
        withDiesel,
        'n5_cyber_pawn',
        'act_crack_phone',
        dieId
      );
      expect(unblocked.dicePool[0].isUsed).toBe(true);
      expect(unblocked.clocks.crack_auditor_phone.current).toBeGreaterThan(0);
    });

    it('applies -1 Hostile Turf penalty when operating on a node owned by a faction with Rep <= -2', () => {
      const state = cloneInitialState();
      state.factionRep.street_syndicate = -2;
      expect(getHostileTurfPenalty(state, 'n2_taxi_rank')).toBe(-1);
      expect(getHostileTurfPenalty(state, 'n1_safehouse')).toBe(0);
    });

    it('queues breakthrough event when an Investigation Clock reaches max segments', () => {
      const state = cloneInitialState();
      const dieId = state.dicePool[0].id;
      state.clocks.audit_docket_409.current = 3; // 3/4
      state.dicePool[0].value = 5;

      const next = resolveActionSlot(
        state,
        'n1_safehouse',
        'act_audit_docket',
        dieId
      );

      expect(next.clocks.audit_docket_409.current).toBe(4);
      expect(next.triggeredEventsQueue).toContain('evt_docket_decoded');
    });

    it('queues evt_composure_breakdown when Composure drops to 0%', () => {
      const state = cloneInitialState();
      const dieId = state.dicePool[0].id;
      state.composure = 5;
      state.dicePool[0].value = 1;
      state.stats.dockets = 0;

      const next = resolveActionSlot(
        state,
        'n1_safehouse',
        'act_audit_docket',
        dieId
      );

      expect(next.composure).toBe(0);
      expect(next.triggeredEventsQueue).toContain('evt_composure_breakdown');
    });
  });

  describe('2. advanceToNextDay — Cycle Progression, Load Shedding & Dice Pool', () => {
    it('increments day, rotates Load Shedding (4 -> 6 -> 2 -> 4), and ticks daily clocks', () => {
      const state = cloneInitialState();
      expect(state.day).toBe(1);
      expect(state.loadSheddingStage).toBe(4);

      const day2 = advanceToNextDay(state);
      expect(day2.day).toBe(2);
      expect(day2.loadSheddingStage).toBe(6);
      expect(day2.clocks.mokoena_sweep.current).toBe(
        state.clocks.mokoena_sweep.current + 1
      );
      expect(day2.triggeredEventsQueue).toContain('evt_morning_masibi_wire');

      const day3 = advanceToNextDay(day2);
      expect(day3.day).toBe(3);
      expect(day3.loadSheddingStage).toBe(2);

      const day4 = advanceToNextDay(day3);
      expect(day4.day).toBe(4);
      expect(day4.loadSheddingStage).toBe(4);
    });

    it('scales daily d6 pool size based on Composure (80%+ = 5, 40-79% = 4, <40% = 3)', () => {
      const highComp = cloneInitialState();
      highComp.composure = 85;
      expect(advanceToNextDay(highComp).dicePool).toHaveLength(5);

      const midComp = cloneInitialState();
      midComp.composure = 60;
      expect(advanceToNextDay(midComp).dicePool).toHaveLength(4);

      const lowComp = cloneInitialState();
      lowComp.composure = 25;
      expect(advanceToNextDay(lowComp).dicePool).toHaveLength(3);
    });

    it('resets spent dice and generates a completely fresh pool for the new cycle', () => {
      const state = cloneInitialState();
      state.dicePool[0].isUsed = true;
      state.dicePool[1].isUsed = true;
      const next = advanceToNextDay(state);
      expect(next.dicePool.every((d) => !d.isUsed)).toBe(true);
      expect(next.dicePool.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('3. SAPS Roadblocks & Transit Mechanics', () => {
    it('locks CBD corridors when Precinct Heat >= 4 and allows R200 bribe, 1 Die detour, or Scanner bypass', () => {
      const state = cloneInitialState();
      const dieId = state.dicePool[0].id;
      state.clocks.precinct_heat.current = 4;

      expect(isCorridorRoadblocked(state, 'n1_safehouse', 'n2_taxi_rank')).toBe(
        true
      );
      expect(hasFreeRoadblockBypass(state)).toBe(false);

      // Bribe R200
      const bribed = travelToNode(state, 'n2_taxi_rank', 'bribe');
      expect(bribed.currentNodeId).toBe('n2_taxi_rank');
      expect(bribed.cash).toBe(state.cash - 200);

      // Detour with 1 Die
      const detoured = travelToNode(state, 'n2_taxi_rank', 'die', dieId);
      expect(detoured.currentNodeId).toBe('n2_taxi_rank');
      expect(detoured.dicePool[0].isUsed).toBe(true);

      // Free bypass with Cloned SAPS Radio Scanner
      const withScanner = cloneInitialState();
      withScanner.clocks.precinct_heat.current = 4;
      withScanner.inventory.push('saps_radio_scanner');
      expect(hasFreeRoadblockBypass(withScanner)).toBe(true);

      const bypassed = travelToNode(withScanner, 'n2_taxi_rank', 'free');
      expect(bypassed.currentNodeId).toBe('n2_taxi_rank');
      expect(bypassed.cash).toBe(withScanner.cash);
    });
  });

  describe('4. Faction Perks, Black-Market Gear & Contact Dialogue Rewards', () => {
    it('activates Grid Manipulation and Izinkabi Muscle faction perks once per day', () => {
      const state = cloneInitialState();
      state.factionRep.city_hall = 1;
      state.factionRep.street_syndicate = 2;
      state.cash = 1000;
      state.dicePool.forEach((d, idx) => {
        d.value = idx === 0 ? 1 : 5;
      });

      const toggledGrid = activateFactionPerk(state, 'perk_grid_manipulation');
      expect(toggledGrid.loadSheddingStage).toBe(6);
      expect(toggledGrid.usedPerksToday).toContain('perk_grid_manipulation');

      const upgradedDie = activateFactionPerk(
        toggledGrid,
        'perk_izinkabi_muscle'
      );
      expect(upgradedDie.dicePool[0].value).toBe(6);
      expect(upgradedDie.cash).toBe(400);
    });

    it('purchases Black-Market Gear and permanently boosts Investigator Stats', () => {
      const state = cloneInitialState();
      state.cash = 1500;
      const prevWire = state.stats.wire;

      const next = purchaseBlackMarketGear(state, 'item_burner_sim_array');
      expect(next.inventory).toContain('item_burner_sim_array');
      expect(next.stats.wire).toBe(prevWire + 1);
      expect(next.cash).toBe(600);
    });

    it('applies NPC Contact Dialogue rewards idempotently once per timeline', () => {
      const state = cloneInitialState();
      const effect = {
        cashDelta: 250,
        narrativeLog: 'Extracted secret ledger key.',
      };

      const first = applyDialogueReward(state, 'reward_test_1', effect);
      expect(first.cash).toBe(state.cash + 250);
      expect(first.claimedDialogueRewards).toContain('reward_test_1');

      // Second attempt with same rewardId is a no-op
      const second = applyDialogueReward(first, 'reward_test_1', effect);
      expect(second.cash).toBe(first.cash);
    });
  });

  describe('5. Event Deck Resolution, Act 2 Carryover & Tactical Advisor', () => {
    it('resolves triggered breakthrough event and unlocks City Hall & Pier 2', () => {
      const state = cloneInitialState();
      state.triggeredEventsQueue = ['evt_docket_decoded'];

      const resolved = resolveTriggeredEvent(
        state,
        'evt_docket_decoded',
        'choice_unlock_leads'
      );

      expect(resolved.triggeredEventsQueue).not.toContain('evt_docket_decoded');
      expect(resolved.inventory).toContain('decoded_tanker_ledger');
      expect(resolved.nodes.n4_city_hall.isUnlocked).toBe(true);
      expect(resolved.nodes.n6_pier2_port.isUnlocked).toBe(true);
    });

    it('transitions from Act 1 to Act 2 preserving stats, gear, and granting Legacy Dossier item', () => {
      const state = cloneInitialState();
      state.cash = 900;
      state.inventory.push('item_kevlar_vest');

      const act2 = transitionToAct2(state, 'ending_whistleblower');
      expect(act2.act).toBe(2);
      expect(act2.currentNodeId).toBe('n10_high_court');
      expect(act2.inventory).toContain('item_kevlar_vest');
      expect(act2.inventory).toContain('item_act1_subpoena_warrant');
      expect(act2.stats.dockets).toBe(state.stats.dockets + 1);
    });

    it('computes Smart Tactical Advisor recommendations and Fixer Evaluation grades', () => {
      const state = cloneInitialState();
      const rec = getTacticalRecommendation(state, null);
      expect(rec.campaignStep).toBe(1);
      expect(rec.headline.length).toBeGreaterThan(0);

      // Emergency bleedout check when Nandi's wound is at 3/4
      state.clocks.nandi_condition.current = 3;
      const urgentRec = getTacticalRecommendation(state, null);
      expect(urgentRec.badgeLabel).toBe('URGENT MEDICAL CRISIS');
      expect(urgentRec.targetNodeId).toBe('n1_safehouse');

      const evaluation = calculateFixerEvaluation(state, 'ending_whistleblower');
      expect(evaluation.rankTitle.length).toBeGreaterThan(0);
      expect(evaluation.totalScore).toBeGreaterThan(0);
      expect(evaluation.commendations.length).toBe(6);
    });
  });
});
