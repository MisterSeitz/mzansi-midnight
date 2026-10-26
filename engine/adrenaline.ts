import { GameState } from '../types/game';

export type AdrenalineLevel = 1 | 2 | 3 | 4 | 5;
export type AdrenalineLevelName =
  | 'COVERT'
  | 'ALERT'
  | 'TENSION'
  | 'CRITICAL'
  | 'CLIMAX';

export interface AdrenalineMetrics {
  score: number; // 0 to 100
  level: AdrenalineLevel;
  levelName: AdrenalineLevelName;
  climaxClockProgress: number; // 0 to 1
  highestThreatProgress: number; // 0 to 1
  isClimaxImminent: boolean;
  composureRisk: boolean;
  themeColor: 'emerald' | 'amber' | 'orange' | 'red' | 'crimson';
  pulseSpeed: 'none' | 'slow' | 'medium' | 'fast' | 'rapid';
  scannerStatusText: string;
}

const CLIMAX_CLOCK_IDS = [
  'berth_14_countdown',
  'flight_zs900_countdown',
  'kendon_blackout_countdown',
  'arms_drop_countdown',
  'sovereign_arms_shipment',
  'stage8_collapse_countdown',
];

const CLIMAX_EVENT_IDS = [
  'evt_climax_berth14',
  'evt_act2_climax_tarmac',
  'evt_highveld_climax_kendon',
  'evt_namaqua_climax_arms_drop',
  'evt_namaqua_climax_admiralty',
  'evt_climax_pier109',
  'evt_summit_breach_climax',
];

/**
 * Pure evaluation function computing real-time narrative tension and adrenaline
 * based on climax countdown progression, threat clock saturation, composure depletion,
 * and impending crises.
 */
export function calculateAdrenaline(state: GameState): AdrenalineMetrics {
  // 1. Climax Clock Progress (0.0 to 1.0)
  let climaxProgress = 0;
  for (const clockId of CLIMAX_CLOCK_IDS) {
    const clock = state.clocks[clockId];
    if (clock && clock.max > 0) {
      const ratio = clock.current / clock.max;
      if (ratio > climaxProgress) {
        climaxProgress = ratio;
      }
    }
  }

  // 2. Highest Threat Clock Saturation (0.0 to 1.0)
  let highestThreat = 0;
  Object.values(state.clocks).forEach((clock) => {
    if (clock.type === 'threat' && clock.max > 0) {
      const ratio = clock.current / clock.max;
      if (ratio > highestThreat) {
        highestThreat = ratio;
      }
    }
  });

  // 3. Composure Strain (0.0 when 100%, 1.0 when 0%)
  const composureStrain = Math.max(0, Math.min(1, (100 - state.composure) / 100));
  const composureRisk = state.composure <= 30;

  // 4. Climax event triggered or queued
  const hasClimaxQueued = state.triggeredEventsQueue.some((id) =>
    CLIMAX_EVENT_IDS.includes(id)
  );

  // 5. Day pressure (higher cycles add baseline urgency)
  const dayFactor = Math.min(0.2, (state.day - 1) * 0.05);

  // Weighted Score (0 to 100)
  let rawScore = 0;
  if (hasClimaxQueued || climaxProgress >= 1.0) {
    rawScore = 95 + Math.round(highestThreat * 5);
  } else {
    rawScore =
      climaxProgress * 45 + // Climax clock carries 45% weight
      highestThreat * 30 + // Highest threat clock carries 30% weight
      composureStrain * 15 + // Composure panic carries 15% weight
      dayFactor * 10 * 10; // Day advancement carries 10% weight
  }

  const score = Math.max(5, Math.min(100, Math.round(rawScore)));

  // Adrenaline Tiers
  let level: AdrenalineLevel = 1;
  let levelName: AdrenalineLevelName = 'COVERT';
  let themeColor: 'emerald' | 'amber' | 'orange' | 'red' | 'crimson' = 'emerald';
  let pulseSpeed: 'none' | 'slow' | 'medium' | 'fast' | 'rapid' = 'none';
  let scannerStatusText = 'FREQUENCY CLEAR // MONITORING COLD WIRES';

  if (score >= 90 || hasClimaxQueued) {
    level = 5;
    levelName = 'CLIMAX';
    themeColor = 'crimson';
    pulseSpeed = 'rapid';
    scannerStatusText = '🚨 CLIMAX SHOWDOWN // TACTICAL BREACH IMMINENT';
  } else if (
    score >= 70 ||
    climaxProgress >= 0.75 ||
    highestThreat >= 0.8 ||
    (highestThreat >= 0.6 && composureRisk)
  ) {
    level = 4;
    levelName = 'CRITICAL';
    themeColor = 'red';
    pulseSpeed = 'fast';
    scannerStatusText = '⚠️ CRITICAL ALERT // HIT SQUAD INTERCEPT IN BOUND';
  } else if (score >= 45 || climaxProgress >= 0.5 || highestThreat >= 0.5) {
    level = 3;
    levelName = 'TENSION';
    themeColor = 'orange';
    pulseSpeed = 'medium';
    scannerStatusText = '⚡ HIGH TENSION // CORRIDORS CORDONED BY SAPS';
  } else if (score >= 25 || highestThreat >= 0.3) {
    level = 2;
    levelName = 'ALERT';
    themeColor = 'amber';
    pulseSpeed = 'slow';
    scannerStatusText = '📡 ACTIVE SURVEILLANCE // ENCRYPTED COMMS INTERCEPTED';
  }

  const isClimaxImminent = level >= 4 || climaxProgress >= 0.75;

  return {
    score,
    level,
    levelName,
    climaxClockProgress: climaxProgress,
    highestThreatProgress: highestThreat,
    isClimaxImminent,
    composureRisk,
    themeColor,
    pulseSpeed,
    scannerStatusText,
  };
}
