import { EndingId, GameState } from '../types/game';
import { hasAvailableUnclaimedDialogueReward } from '../data/contactDialogues';

export interface TacticalRecommendation {
  campaignStep: 1 | 2 | 3;
  campaignStepTitle: string;
  badgeLabel: string;
  badgeStyle: string;
  headline: string;
  hint: string;
  targetNodeId?: string;
  targetSlotId?: string;
  recommendedDieId?: string;
  actionButtonLabel?: string;
}

export interface FixerCommendation {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
}

export interface FixerEvaluation {
  totalScore: number;
  rankTitle: string;
  globalPercentile: number; // e.g. 96 means Top 4%
  leaderboard: {
    name: string;
    role: string;
    score: number;
    isPlayer?: boolean;
  }[];
  commendations: FixerCommendation[];
}

/**
 * Helper: Pick the highest unused die in the player's pool
 */
function getHighestUnusedDieId(state: GameState): string | undefined {
  const unused = state.dicePool.filter((d) => !d.isUsed);
  if (unused.length === 0) return undefined;
  unused.sort((a, b) => b.value - a.value);
  return unused[0].id;
}

/**
 * 1. SMART TACTICAL ADVISOR & NEXT-MOVE ENGINE
 */
export function getTacticalRecommendation(
  state: GameState,
  selectedDieId: string | null
): TacticalRecommendation {
  const unusedDice = state.dicePool.filter((d) => !d.isUsed);
  const bestDieId = selectedDieId || getHighestUnusedDieId(state);
  const isAct2 = state.act === 2;

  const hasFinaleEvidence = isAct2
    ? state.inventory.includes('offshore_trust_deed') ||
      state.inventory.includes('superlab_batch_telemetry')
    : state.inventory.includes('decoded_tanker_ledger') ||
      state.inventory.includes('berth_14_manifest');

  const hasBothFinaleExhibits = isAct2
    ? state.inventory.includes('offshore_trust_deed') &&
      state.inventory.includes('superlab_batch_telemetry')
    : state.inventory.includes('decoded_tanker_ledger') &&
      state.inventory.includes('berth_14_manifest');

  const campaignStep: 1 | 2 | 3 = hasBothFinaleExhibits
    ? 3
    : hasFinaleEvidence
    ? 2
    : 1;

  const campaignStepTitle = isAct2
    ? campaignStep === 1
      ? 'Step 1/3: Unmask Trust or Tanker GPS'
      : campaignStep === 2
      ? 'Step 2/3: Secure Second Exhibit or Strike Hangar 7'
      : 'Step 3/3: Execute Hangar 7 Grand Finale'
    : campaignStep === 1
    ? 'Step 1/3: Decode Docket #409 or Crack Phone'
    : campaignStep === 2
    ? 'Step 2/3: Secure Second Lead or Trigger Berth 14'
    : 'Step 3/3: Launch Berth 14 Climax';

  // 0. No dice left -> End Cycle
  if (unusedDice.length === 0) {
    return {
      campaignStep,
      campaignStepTitle,
      badgeLabel: 'CYCLE COMPLETE',
      badgeStyle: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      headline: 'All Action Dice Spent — Advance to Next Day',
      hint:
        'Click "End Cycle →" in the bottom-right bar to sleep, rotate the Eskom Load Shedding grid, and roll fresh dice.',
    };
  }

  // 1. Check urgent Game-Over / Crisis Clocks
  const nandiClock = state.clocks.nandi_condition;
  const sweepClock = state.clocks.mokoena_sweep;
  const hitSquadClock = state.clocks.cartel_hit_squad;
  const contemptClock = state.clocks.commission_subpoena;

  if (nandiClock && nandiClock.current >= 3) {
    const canAffordSurgeon = state.cash >= 1500;
    return {
      campaignStep,
      campaignStepTitle,
      badgeLabel: 'URGENT MEDICAL CRISIS',
      badgeStyle: 'bg-red-500/25 text-red-300 border-red-500/50 animate-pulse',
      headline: `Constable Nandi's Wound is ${nandiClock.current}/${nandiClock.max} — Stabilize Her Now!`,
      hint: canAffordSurgeon
        ? 'Jump to Mercury Arcade Flat and run "Call Dr. Maharaj" (R1,500) or "Rest & Patch Up Nandi" (R300) before midnight!'
        : 'Jump to Mercury Arcade Flat and run "Rest & Patch Up Nandi" (R300) or speak with Nandi before her wound clock fills!',
      targetNodeId: 'n1_safehouse',
      targetSlotId: canAffordSurgeon ? 'act_call_maharaj' : 'act_rest_safehouse',
      recommendedDieId: bestDieId,
      actionButtonLabel: 'Jump to Safehouse →',
    };
  }

  if (sweepClock && sweepClock.current >= 5) {
    return {
      campaignStep,
      campaignStepTitle,
      badgeLabel: 'IMMINENT TRT RAID',
      badgeStyle: 'bg-red-500/25 text-red-300 border-red-500/50 animate-pulse',
      headline: `Mokoena's Sweep is ${sweepClock.current}/${sweepClock.max} — Bleed Off Patrol Heat!`,
      hint:
        'Use Queen St. Taxi Rank ("Tap the Driver Network") or Golden Dragon ("Clone SAPS Radio Frequencies") to avoid a safehouse raid!',
      targetNodeId: state.cash >= 400 ? 'n2_taxi_rank' : 'n3_central_precinct',
      targetSlotId:
        state.cash >= 400 ? 'act_taxi_intel' : 'act_bluff_mokoena',
      recommendedDieId: bestDieId,
      actionButtonLabel: 'Evade Sweep →',
    };
  }

  if (hitSquadClock && hitSquadClock.current >= 5) {
    return {
      campaignStep,
      campaignStepTitle,
      badgeLabel: 'HIT SQUAD CLOSING IN',
      badgeStyle: 'bg-red-500/25 text-red-300 border-red-500/50 animate-pulse',
      headline: `Izinkabi Hit Squad at ${hitSquadClock.current}/${hitSquadClock.max} — Set Up Barricades!`,
      hint:
        'Visit Northern Township Depot to "Coordinate with Strike Committee (R400)" or speak with Bra Bheki to push back the gunmen!',
      targetNodeId: 'n9_township_depot',
      targetSlotId: 'slot_rally_civic_marshals',
      recommendedDieId: bestDieId,
      actionButtonLabel: 'Jump to Depot →',
    };
  }

  if (contemptClock && contemptClock.current >= 5) {
    return {
      campaignStep,
      campaignStepTitle,
      badgeLabel: 'WARRANT IMMINENT',
      badgeStyle: 'bg-red-500/25 text-red-300 border-red-500/50 animate-pulse',
      headline: `Contempt Warrant at ${contemptClock.current}/${contemptClock.max} — Stall the Arrest!`,
      hint:
        'Visit High Court Chambers ("File Section 205 Offshore Subpoena") or The Ridge Penthouses to quash the warrant!',
      targetNodeId: 'n10_high_court',
      targetSlotId: 'slot_subpoena_bank_records',
      recommendedDieId: bestDieId,
      actionButtonLabel: 'Jump to High Court →',
    };
  }

  // 2. Check if Composure is dangerously low (<= 30%)
  if (state.composure <= 30 && state.cash >= 300) {
    return {
      campaignStep,
      campaignStepTitle,
      badgeLabel: 'LOW COMPOSURE WARNING',
      badgeStyle: 'bg-amber-500/25 text-amber-300 border-amber-500/50',
      headline: `Composure at ${state.composure}% (Only 3 Dice/Day & Breakdown Risk)`,
      hint: isAct2
        ? 'Recover +25% Composure at High Court Chambers ("Witness Protection Safe-Room Debrief").'
        : 'Recover +25% Composure at Mercury Arcade Flat ("Rest & Patch Up Nandi").',
      targetNodeId: isAct2 ? 'n10_high_court' : 'n1_safehouse',
      targetSlotId: isAct2 ? 'slot_recess_debrief' : 'act_rest_safehouse',
      recommendedDieId: bestDieId,
      actionButtonLabel: 'Recover Composure →',
    };
  }

  // 3. Check if any unlocked node has FREE unclaimed NPC Contact Intel (0 Dice Cost!)
  for (const node of Object.values(state.nodes)) {
    if (
      node.isUnlocked &&
      hasAvailableUnclaimedDialogueReward(state, node.id)
    ) {
      return {
        campaignStep,
        campaignStepTitle,
        badgeLabel: 'FREE CONTACT INTEL (0 DICE)',
        badgeStyle: 'bg-amber-500/25 text-amber-200 border-amber-400/60',
        headline: `Unclaimed Intel Available at ${node.title}`,
        hint: `Select ${node.title} and click "Speak with Contact" in the right drawer to claim a free stat/evidence breakthrough without spending a die!`,
        targetNodeId: node.id,
        actionButtonLabel: `Visit ${node.title.split(' ')[0]} →`,
      };
    }
  }

  // 4. If Finale Evidence is ready, recommend either grabbing the 2nd exhibit or launching the Finale
  if (hasFinaleEvidence) {
    if (isAct2) {
      const targetNode = state.nodes.n12_cargo_apron?.isUnlocked
        ? 'n12_cargo_apron'
        : 'n11_citrus_estate';
      const targetSlot =
        targetNode === 'n12_cargo_apron'
          ? 'slot_act2_finale_tarmac'
          : 'slot_act2_finale_citrus';
      return {
        campaignStep,
        campaignStepTitle,
        badgeLabel: 'ACT 2 FINALE UNLOCKED',
        badgeStyle: 'bg-purple-500/25 text-purple-200 border-purple-400/60',
        headline: hasBothFinaleExhibits
          ? 'Both Supreme Exhibits Secured — Launch Hangar 7 Finale!'
          : 'Hangar 7 & Citrus Estate Unlocked — Strike Now or Secure 2nd Exhibit',
        hint:
          'Click the purple "Hangar 7 Finale →" button in the bottom bar, or run a [FINALE] slot at King Shaka Cargo Apron / Citrus Estate.',
        targetNodeId: targetNode,
        targetSlotId: targetSlot,
        recommendedDieId: bestDieId,
        actionButtonLabel: 'Jump to Finale →',
      };
    } else {
      const targetNode = state.nodes.n6_pier2_port?.isUnlocked
        ? 'n6_pier2_port'
        : 'n7_archive_basement';
      const targetSlot =
        targetNode === 'n6_pier2_port'
          ? 'act_trigger_berth14_finale'
          : 'act_trigger_whistleblower_finale';
      return {
        campaignStep,
        campaignStepTitle,
        badgeLabel: 'ACT 1 CLIMAX UNLOCKED',
        badgeStyle: 'bg-purple-500/25 text-purple-200 border-purple-400/60',
        headline: hasBothFinaleExhibits
          ? 'Full Dossier & Audio Secured — Launch the Berth 14 Finale!'
          : 'Berth 14 Climax Ready — Launch Finale or Decode Second Exhibit',
        hint:
          'Click the purple "Berth 14 Finale →" button in the bottom bar, or run the [FINALE] action at Pier 2 or Old Archive Basement.',
        targetNodeId: targetNode,
        targetSlotId: targetSlot,
        recommendedDieId: bestDieId,
        actionButtonLabel: 'Jump to Finale →',
      };
    }
  }

  // 5. Primary Step 1 Investigation Recommendations
  if (isAct2) {
    // Recommend High Court or Township Depot (or Ridge if not Stage 6)
    const stage6Locked =
      state.loadSheddingStage === 6 && !state.generatorActiveToday;
    if (stage6Locked) {
      return {
        campaignStep,
        campaignStepTitle,
        badgeLabel: 'RECOMMENDED NEXT MOVE',
        badgeStyle: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
        headline: 'Extract Tanker GPS at Northern Township Depot (Stage 6 Safe)',
        hint:
          'Stage 6 Load Shedding has locked computer servers at The Ridge & High Court. Pull physical GPS black-boxes at the Township Depot (or buy R300 Diesel).',
        targetNodeId: 'n9_township_depot',
        targetSlotId: 'slot_extract_tanker_gps',
        recommendedDieId: bestDieId,
        actionButtonLabel: 'Show Slot →',
      };
    }

    const preferTrust = state.stats.dockets >= state.stats.street;
    return {
      campaignStep,
      campaignStepTitle,
      badgeLabel: 'RECOMMENDED NEXT MOVE',
      badgeStyle: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
      headline: preferTrust
        ? 'File Section 205 Subpoena at High Court Chambers'
        : 'Pull Black-Box GPS from Tanker #114 at Township Depot',
      hint: preferTrust
        ? 'Fill the "Trace Sovereign Pearl Trust" clock (0/4) to obtain the Offshore Trust Deed and unlock Hangar 7.'
        : 'Fill the "Synthesize Super-Lab Telemetry" clock (0/4) to pinpoint the Midlands Citrus Super-Lab and Hangar 7.',
      targetNodeId: preferTrust ? 'n10_high_court' : 'n9_township_depot',
      targetSlotId: preferTrust
        ? 'slot_subpoena_bank_records'
        : 'slot_extract_tanker_gps',
      recommendedDieId: bestDieId,
      actionButtonLabel: 'Show Slot →',
    };
  } else {
    // Act 1 primary investigation
    const stage6Locked =
      state.loadSheddingStage === 6 && !state.generatorActiveToday;
    const preferWire =
      !stage6Locked && state.stats.wire > state.stats.dockets;

    return {
      campaignStep,
      campaignStepTitle,
      badgeLabel: 'RECOMMENDED NEXT MOVE',
      badgeStyle: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
      headline: preferWire
        ? "Crack Auditor's Handset at Golden Dragon Cyber-Pawn"
        : 'Cross-Reference Docket #409 at Mercury Arcade Flat',
      hint: preferWire
        ? 'Fill the 4-segment "Crack Auditor’s Handset" clock with Sparks to obtain the Berth 14 Manifest and unlock Pier 2 & Old Archive.'
        : 'Fill the 4-segment "Audit Docket #409" clock at your Safehouse to obtain the Decoded Tanker Ledger and unlock City Hall & Pier 2.',
      targetNodeId: preferWire ? 'n5_cyber_pawn' : 'n1_safehouse',
      targetSlotId: preferWire ? 'act_crack_phone' : 'act_audit_docket',
      recommendedDieId: bestDieId,
      actionButtonLabel: 'Show Slot →',
    };
  }
}

/**
 * 2. FIXER SCORE, GLOBAL PERCENTILE & COMMENDATIONS EVALUATOR
 */
export function calculateFixerEvaluation(
  state: GameState,
  endingId: EndingId
): FixerEvaluation {
  const isFailureEnding =
    endingId === 'ending_captured' || endingId === 'ending_act2_vanished';
  const isAct2Ending = endingId.startsWith('ending_act2_');

  const baseVictoryBonus = isFailureEnding
    ? 600
    : isAct2Ending
    ? 2400
    : 1500;
  const speedBonus = Math.max(0, (10 - state.day) * 160);
  const cashBonus = Math.min(1500, Math.round(state.cash * 0.4));
  const composureBonus = state.composure * 8;
  const evidenceBonus = state.inventory.length * 220;

  const totalScore =
    baseVictoryBonus +
    speedBonus +
    cashBonus +
    composureBonus +
    evidenceBonus;

  let rankTitle = 'C-RANK // COMPROMISED OPERATIVE';
  let globalPercentile = 38;
  if (totalScore >= 4600) {
    rankTitle = 'S-RANK // APEX GHOST OF ETHEKWINI';
    globalPercentile = 97;
  } else if (totalScore >= 3700) {
    rankTitle = 'A-RANK // MASTER WARRANT OFFICER';
    globalPercentile = 86;
  } else if (totalScore >= 2700) {
    rankTitle = 'B-RANK // VETERAN CBD FIXER';
    globalPercentile = 68;
  }

  const commendations: FixerCommendation[] = [
    {
      id: 'comm_iron_nerves',
      title: 'Iron Composure',
      description: 'Finished the operation with at least 80% Composure.',
      unlocked: state.composure >= 80,
    },
    {
      id: 'comm_master_archivist',
      title: 'Forensic Completionist',
      description:
        'Secured both primary breakthrough exhibits in the same campaign.',
      unlocked:
        (state.inventory.includes('decoded_tanker_ledger') &&
          state.inventory.includes('berth_14_manifest')) ||
        (state.inventory.includes('offshore_trust_deed') &&
          state.inventory.includes('superlab_batch_telemetry')),
    },
    {
      id: 'comm_black_market',
      title: 'Kitted for the Blackout',
      description:
        'Acquired at least one piece of Black-Market Hardware or Cloned Scanner.',
      unlocked: state.inventory.some((i) =>
        [
          'saps_radio_scanner',
          'item_burner_sim_array',
          'item_forged_auditor_id',
          'item_kevlar_vest',
          'item_vip_transponder',
          'item_sat_uplink',
        ].includes(i)
      ),
    },
    {
      id: 'comm_high_roller',
      title: 'Queen Street War-Chest',
      description: 'Finished the timeline holding at least R2,000 in Rands.',
      unlocked: state.cash >= 2000,
    },
    {
      id: 'comm_speed_runner',
      title: 'Before the Grid Drops',
      description: 'Resolved the campaign in 6 Cycles or fewer.',
      unlocked: !isFailureEnding && state.day <= 6,
    },
    {
      id: 'comm_act2_survivor',
      title: 'The Commission’s Verdict',
      description: 'Survived the Act 2 Hangar 7 Grand Finale.',
      unlocked: isAct2Ending && !isFailureEnding,
    },
  ];

  const leaderboard = [
    {
      name: 'Col. Piet van der Merwe (Benchmark)',
      role: 'DPCI Clean Task Force Record',
      score: 4550,
    },
    {
      name: 'Zuko "The Architect" Ndlovu',
      role: 'Berth 14 Syndicate Standard',
      score: 3850,
    },
    {
      name: 'YOU (Warrant Officer Sbu)',
      role: rankTitle,
      score: totalScore,
      isPlayer: true,
    },
    {
      name: 'Sparks (Golden Dragon)',
      role: 'Grey Street Signals Fixer',
      score: 3050,
    },
    {
      name: 'Average eThekwini Investigator',
      role: 'Regional Dossier Median',
      score: 2250,
    },
  ].sort((a, b) => b.score - a.score);

  return {
    totalScore,
    rankTitle,
    globalPercentile,
    leaderboard,
    commendations,
  };
}
