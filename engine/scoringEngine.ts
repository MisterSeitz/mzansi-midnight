import { EndingId, GameState } from '../types/game';
import { CampaignProgression } from '../types/campaign';
import { ComprehensiveScoreResult, ScoreBreakdown } from '../types/leaderboard';
import { loadUnlockedEndings } from './storage';

export const APEX_VICTORY_ENDINGS: Set<EndingId> = new Set([
  'ending_vigilante',
  'ending_act2_reckoning',
  'ending_highveld_siu_vindication',
  'ending_namaqua_naval_raid',
  'ending_cape_sovereign_seizure',
  'ending_octagon_constitutional_reckoning',
]);

export const SYNDICATE_TRIUMPH_ENDINGS: Set<EndingId> = new Set([
  'ending_kingpin',
  'ending_act2_revolution',
  'ending_act2_syndicate_state',
  'ending_highveld_arbitrage_partner',
  'ending_namaqua_diamond_flight',
  'ending_cape_gang_truce',
  'ending_octagon_shadow_director',
  'ending_octagon_peoples_revolution',
]);

export const REVELATION_ENDINGS: Set<EndingId> = new Set([
  'ending_whistleblower',
  'ending_act2_vanished',
  'ending_highveld_red_blackout',
  'ending_namaqua_divers_rebellion',
  'ending_cape_winelands_audit',
  'ending_octagon_vanished_watchers',
]);

export function calculateBaseVictoryScore(endingId: EndingId): number {
  if (APEX_VICTORY_ENDINGS.has(endingId)) return 10000;
  if (SYNDICATE_TRIUMPH_ENDINGS.has(endingId)) return 7500;
  if (REVELATION_ENDINGS.has(endingId)) return 6000;
  // Tragic / bust / catastrophic endings
  return 3000;
}

export function calculateSpeedrunBonus(elapsedSeconds: number): number {
  if (elapsedSeconds <= 0) return 4000; // fallback if untracked
  if (elapsedSeconds <= 180) {
    // Under 3 minutes: Apex lightning speedrun
    return 8000 + Math.max(0, Math.floor((180 - elapsedSeconds) * 20));
  }
  if (elapsedSeconds <= 300) {
    // Under 5 minutes: Exceptional sprint
    return 5000 + Math.floor((300 - elapsedSeconds) * 25);
  }
  if (elapsedSeconds <= 600) {
    // Under 10 minutes: Brisk tactical completion
    return 2500 + Math.floor((600 - elapsedSeconds) * 8.3);
  }
  if (elapsedSeconds <= 1200) {
    // 10 to 20 minutes
    return Math.max(1000, Math.floor(2500 - (elapsedSeconds - 600) * 2.5));
  }
  return 500;
}

export function calculateCycleEfficiency(days: number): number {
  // Fewer days spent executing the heist indicates tactical sharpness
  const baseline = 10;
  if (days <= 0) return 3000;
  const diff = Math.max(0, baseline - days);
  return Math.min(4500, diff * 500);
}

export function calculateComposureBonus(composure: number): number {
  const clamped = Math.max(0, Math.min(100, composure));
  return Math.round(clamped * 35); // 0 to 3,500
}

export function calculateCashRetainedScore(cash: number): number {
  const clampedCash = Math.max(0, cash);
  // Scale cash with diminishing returns up to 5,000 pts
  if (clampedCash <= 2000) return Math.floor(clampedCash * 1.5);
  return Math.min(5000, 3000 + Math.floor((clampedCash - 2000) * 0.5));
}

export function calculateEvidenceKeystoneScore(
  state: GameState,
  progression?: CampaignProgression
): number {
  const keystonesCount = progression?.collectedKeystones?.length ?? 0;
  const inventoryEvidence = state.inventory ? state.inventory.length * 200 : 0;
  return keystonesCount * 1250 + inventoryEvidence;
}

export function calculateAnthologyBonus(unlockedEndingsCount: number): number {
  const count = Math.max(0, Math.min(25, unlockedEndingsCount));
  const base = count * 350;
  // Grand Completionist bonus for all 25 endings
  if (count >= 25) {
    return base + 5000;
  }
  if (count >= 15) {
    return base + 2000;
  }
  return base;
}

export interface ScoreInputParams {
  state: GameState;
  endingId: EndingId;
  elapsedSeconds?: number;
  campaignProgression?: CampaignProgression;
}

export function calculateComprehensiveScore(
  params: ScoreInputParams
): ComprehensiveScoreResult {
  const { state, endingId, campaignProgression } = params;

  // Determine elapsed seconds
  let elapsed = params.elapsedSeconds;
  if (elapsed === undefined || elapsed <= 0) {
    if (state.runStartTime && state.runStartTime > 0) {
      elapsed = Math.max(1, Math.floor((Date.now() - state.runStartTime) / 1000));
    } else {
      elapsed = 360; // 6 minute fallback estimate
    }
  }

  // Count unlocked endings from storage or input
  const unlockedMap = loadUnlockedEndings();
  const unlockedCount = Math.max(1, Object.keys(unlockedMap).length);

  const breakdown: ScoreBreakdown = {
    baseVictory: calculateBaseVictoryScore(endingId),
    speedrunBonus: calculateSpeedrunBonus(elapsed),
    cycleEfficiency: calculateCycleEfficiency(state.day),
    composureBonus: calculateComposureBonus(state.composure),
    cashRetained: calculateCashRetainedScore(state.cash),
    evidenceKeystones: calculateEvidenceKeystoneScore(state, campaignProgression),
    anthologyCompletion: calculateAnthologyBonus(unlockedCount),
  };

  const totalScore =
    breakdown.baseVictory +
    breakdown.speedrunBonus +
    breakdown.cycleEfficiency +
    breakdown.composureBonus +
    breakdown.cashRetained +
    breakdown.evidenceKeystones +
    breakdown.anthologyCompletion;

  // Grade calculation
  let rankGrade: 'S+' | 'S' | 'A' | 'B' | 'C' | 'D' = 'D';
  let rankTitle = 'STREET OPERATIVE';
  let globalPercentile = 50;

  if (totalScore >= 32000) {
    rankGrade = 'S+';
    rankTitle = 'APEX MZANSI SOVEREIGN';
    globalPercentile = 99.8;
  } else if (totalScore >= 25000) {
    rankGrade = 'S';
    rankTitle = 'MASTER FIXER // GHOST PROTOCOL';
    globalPercentile = 96.5;
  } else if (totalScore >= 19000) {
    rankGrade = 'A';
    rankTitle = 'SENIOR HIGHVELD BROKER';
    globalPercentile = 86.0;
  } else if (totalScore >= 13500) {
    rankGrade = 'B';
    rankTitle = 'SPECIAL DOCKETS AGENT';
    globalPercentile = 72.0;
  } else if (totalScore >= 9000) {
    rankGrade = 'C';
    rankTitle = 'COMMISSIONED RUNNER';
    globalPercentile = 54.0;
  } else {
    rankGrade = 'D';
    rankTitle = 'COMPROMISED ASSET';
    globalPercentile = 30.0;
  }

  // Commendations
  const commendations = [
    {
      id: 'lightning_run',
      title: 'Lightning Prowler',
      description: 'Completed the operation in under 4 minutes (240s)',
      unlocked: elapsed <= 240,
    },
    {
      id: 'steel_mind',
      title: 'Steel Nerves',
      description: 'Finished with Composure at or above 85%',
      unlocked: state.composure >= 85,
    },
    {
      id: 'war_chest',
      title: 'Sandton War-Chest',
      description: 'Retained R3,500 or more in hard currency',
      unlocked: state.cash >= 3500,
    },
    {
      id: 'swift_syndicate',
      title: 'Clean Infiltration',
      description: 'Accomplished objectives in 3 cycles or fewer',
      unlocked: state.day <= 3,
    },
    {
      id: 'archival_connoisseur',
      title: 'Anthology Archivist',
      description: 'Unlocked 10 or more endings across South Africa',
      unlocked: unlockedCount >= 10,
    },
    {
      id: 'apex_victory',
      title: 'Crown Resolution',
      description: 'Achieved an Apex Victory resolution',
      unlocked: APEX_VICTORY_ENDINGS.has(endingId),
    },
  ];

  return {
    totalScore,
    rankTitle,
    rankGrade,
    globalPercentile,
    breakdown,
    commendations,
  };
}

export function formatSpeedrunTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  const mm = mins.toString().padStart(2, '0');
  const ss = secs.toString().padStart(2, '0');
  return `${mm}:${ss}`;
}
