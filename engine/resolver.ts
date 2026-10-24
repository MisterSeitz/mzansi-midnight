import {
  GameState,
  ActionEffect,
  LoadSheddingStage,
  FactionPerkId,
} from '../types/game';
import { ITEMS_CATALOG } from '../data/itemsCatalog';

/**
 * Helper: Check if a node imposes a -1 Hostile Turf roll penalty (Faction Rep <= -2)
 */
export function getHostileTurfPenalty(state: GameState, nodeId: string): number {
  const node = state.nodes[nodeId];
  if (!node || node.factionOwner === 'neutral') return 0;
  const rep = state.factionRep[node.factionOwner] ?? 0;
  return rep <= -2 ? -1 : 0;
}

/**
 * PURCHASE BLACK-MARKET GEAR / STAT UPGRADE
 */
export function purchaseBlackMarketGear(
  state: GameState,
  itemId: string
): GameState {
  const item = ITEMS_CATALOG[itemId];
  if (!item || item.category !== 'gear' || !item.priceCash) return state;
  if (state.inventory.includes(itemId)) return state;
  if (state.cash < item.priceCash) {
    return {
      ...state,
      activeLog: [
        `Insufficient funds: ${item.title} costs R${item.priceCash}.`,
        ...state.activeLog,
      ],
    };
  }

  const nextState: GameState = structuredClone(state);
  nextState.cash -= item.priceCash;
  nextState.inventory.push(itemId);

  if (item.statBoost) {
    nextState.stats[item.statBoost.stat] += item.statBoost.delta;
  }
  if (item.composureBonus) {
    nextState.composure = Math.min(100, nextState.composure + item.composureBonus);
  }

  nextState.activeLog.unshift(
    `[GEAR ACQUIRED] Purchased ${item.title} (-R${item.priceCash}) — ${item.gameplayEffect}`
  );
  return nextState;
}

/**
 * Helper: Check if SAPS Operation Shanela roadblocks are active on inner-city corridors
 */
export function isRoadblockSystemActive(state: GameState): boolean {
  if (state.act === 2) {
    return (
      (state.clocks.commission_subpoena?.current ?? 0) >= 4 ||
      (state.clocks.cartel_hit_squad?.current ?? 0) >= 5
    );
  }
  return (
    (state.clocks.precinct_heat?.current ?? 0) >= 4 ||
    (state.clocks.mokoena_sweep?.current ?? 0) >= 5
  );
}

/**
 * Helper: Check if moving between two nodes crosses an active SAPS roadblock
 */
export function isCorridorRoadblocked(
  state: GameState,
  fromNodeId: string,
  toNodeId: string
): boolean {
  if (fromNodeId === toNodeId) return false;
  if (!isRoadblockSystemActive(state)) return false;

  if (state.act === 2) {
    return (
      fromNodeId === 'n8_ridge_penthouses' ||
      toNodeId === 'n8_ridge_penthouses' ||
      fromNodeId === 'n9_township_depot' ||
      toNodeId === 'n9_township_depot'
    );
  }

  const touchesCbdArtery =
    fromNodeId === 'n1_safehouse' ||
    toNodeId === 'n1_safehouse' ||
    fromNodeId === 'n2_taxi_rank' ||
    toNodeId === 'n2_taxi_rank';

  return touchesCbdArtery;
}

/**
 * Helper: Check if the player can bypass SAPS roadblocks for free
 */
export function hasFreeRoadblockBypass(state: GameState): boolean {
  return (
    state.inventory.includes('saps_radio_scanner') ||
    state.factionRep.street_syndicate >= 2
  );
}

/**
 * TRAVEL BETWEEN NODES (HANDLES SAPS ROADBLOCK INTERCEPTS)
 */
export function travelToNode(
  state: GameState,
  targetNodeId: string,
  method: 'free' | 'bribe' | 'die',
  dieId?: string
): GameState {
  if (state.currentNodeId === targetNodeId) return state;
  const targetNode = state.nodes[targetNodeId];
  if (!targetNode || !targetNode.isUnlocked) return state;

  const blocked = isCorridorRoadblocked(state, state.currentNodeId, targetNodeId);
  const canBypass = hasFreeRoadblockBypass(state);

  const nextState: GameState = structuredClone(state);

  if (!blocked || canBypass) {
    nextState.currentNodeId = targetNodeId;
    if (blocked && canBypass) {
      const reason = state.inventory.includes('saps_radio_scanner')
        ? 'Cloned SAPS Scanner'
        : "Bra Bheki's VIP Kombi";
      nextState.activeLog.unshift(
        `[TRANSIT] Slipped past SAPS roadblock to ${targetNode.title} via ${reason}.`
      );
    }
    return nextState;
  }

  if (method === 'bribe') {
    if (nextState.cash < 200) {
      nextState.activeLog.unshift(
        'Cannot cross roadblock: Requires R200 "cold drink" bribe.'
      );
      return nextState;
    }
    nextState.cash -= 200;
    nextState.currentNodeId = targetNodeId;
    nextState.activeLog.unshift(
      `[TRANSIT] Paid R200 roadblock bribe to reach ${targetNode.title}.`
    );
    return nextState;
  }

  if (method === 'die') {
    const unusedDie = dieId
      ? nextState.dicePool.find((d) => d.id === dieId && !d.isUsed)
      : nextState.dicePool.find((d) => !d.isUsed);

    if (!unusedDie) {
      nextState.activeLog.unshift(
        'Cannot detour around roadblock: No unused Action Dice remaining.'
      );
      return nextState;
    }
    unusedDie.isUsed = true;
    nextState.currentNodeId = targetNodeId;
    nextState.activeLog.unshift(
      `[TRANSIT] Burned [Die ${unusedDie.value}] detouring through service alleys to reach ${targetNode.title}.`
    );
    return nextState;
  }

  return state;
}

/**
 * BUY & BURN GENERATOR DIESEL (R300) TO OVERRIDE STAGE 6 LOCKOUTS TODAY
 */
export function activateGeneratorDiesel(state: GameState): GameState {
  if (state.generatorActiveToday) return state;
  if (state.cash < 300) {
    return {
      ...state,
      activeLog: [
        'Insufficient funds: Generator diesel requires R300.',
        ...state.activeLog,
      ],
    };
  }

  const nextState: GameState = structuredClone(state);
  nextState.cash -= 300;
  nextState.generatorActiveToday = true;
  nextState.activeLog.unshift(
    '[DIESEL OVERRIDE] Paid R300 for backup diesel. Stage 6 server lockouts bypassed for today.'
  );
  return nextState;
}

/**
 * ACTIVATE ONCE-PER-DAY FACTION STANDING PERK
 */
export function activateFactionPerk(
  state: GameState,
  perkId: FactionPerkId
): GameState {
  if (state.usedPerksToday.includes(perkId)) return state;
  const nextState: GameState = structuredClone(state);

  switch (perkId) {
    case 'perk_grid_manipulation': {
      if (nextState.factionRep.city_hall < 1) return state;
      nextState.loadSheddingStage = nextState.loadSheddingStage === 6 ? 2 : 6;
      nextState.usedPerksToday.push(perkId);
      nextState.activeLog.unshift(
        `[FACTION PERK: GRID MANIPULATION] City Hall switches the district grid to Stage ${nextState.loadSheddingStage} Load Shedding.`
      );
      return nextState;
    }

    case 'perk_bluelight_escort': {
      if (nextState.factionRep.saps_trt < 1) return state;
      if (nextState.clocks.precinct_heat) {
        nextState.clocks.precinct_heat.current = Math.max(
          0,
          nextState.clocks.precinct_heat.current - 2
        );
      }
      if (nextState.clocks.mokoena_sweep) {
        nextState.clocks.mokoena_sweep.current = Math.max(
          0,
          nextState.clocks.mokoena_sweep.current - 1
        );
      }
      if (nextState.clocks.commission_subpoena) {
        nextState.clocks.commission_subpoena.current = Math.max(
          0,
          nextState.clocks.commission_subpoena.current - 2
        );
      }
      if (nextState.clocks.cartel_hit_squad) {
        nextState.clocks.cartel_hit_squad.current = Math.max(
          0,
          nextState.clocks.cartel_hit_squad.current - 1
        );
      }
      nextState.usedPerksToday.push(perkId);
      nextState.activeLog.unshift(
        '[FACTION PERK: BLUE-LIGHT ESCORT] Precinct duty desk scrubs your vehicle plates (-2 Heat/Contempt, -1 Sweep/Hit Squad).'
      );
      return nextState;
    }

    case 'perk_izinkabi_muscle': {
      if (nextState.factionRep.street_syndicate < 2) return state;
      if (nextState.cash < 600) {
        nextState.activeLog.unshift(
          'Insufficient funds: Hiring Bra Bheki’s izinkabi muscle costs R600.'
        );
        return nextState;
      }
      const unusedDice = nextState.dicePool.filter((d) => !d.isUsed);
      if (unusedDice.length === 0) {
        nextState.activeLog.unshift('No unused dice available to upgrade.');
        return nextState;
      }
      unusedDice.sort((a, b) => a.value - b.value);
      const lowestDie = unusedDice[0];
      const oldVal = lowestDie.value;
      lowestDie.value = 6;
      nextState.cash -= 600;
      nextState.usedPerksToday.push(perkId);
      nextState.activeLog.unshift(
        `[FACTION PERK: IZINKABI MUSCLE] Paid R600 to Bra Bheki’s enforcers—upgraded [Die ${oldVal}] to [Die 6].`
      );
      return nextState;
    }

    case 'perk_hawks_safechannel': {
      if (nextState.factionRep.hawks < 2) return state;
      nextState.composure = Math.min(100, nextState.composure + 15);
      if (nextState.clocks.mokoena_sweep) {
        nextState.clocks.mokoena_sweep.current = Math.max(
          0,
          nextState.clocks.mokoena_sweep.current - 1
        );
      }
      if (nextState.clocks.cartel_hit_squad) {
        nextState.clocks.cartel_hit_squad.current = Math.max(
          0,
          nextState.clocks.cartel_hit_squad.current - 1
        );
      }
      nextState.usedPerksToday.push(perkId);
      nextState.activeLog.unshift(
        '[FACTION PERK: HAWKS SAFE-CHANNEL] Col. van der Merwe relays counter-surveillance (+15% Composure, -1 Sweep/Hit Squad).'
      );
      return nextState;
    }

    case 'perk_substation_bypass': {
      if ((nextState.factionRep.red_guard_populists ?? 0) < 1) return state;
      if (nextState.clocks.megawatt_sabotage) {
        nextState.clocks.megawatt_sabotage.current = Math.max(
          0,
          nextState.clocks.megawatt_sabotage.current - 1
        );
      }
      nextState.usedPerksToday.push(perkId);
      nextState.activeLog.unshift(
        '[FACTION PERK: SUBSTATION BYPASS] Red Guard line marshals bypass compromised breakers (-1 Grid Sabotage).'
      );
      return nextState;
    }

    case 'perk_sandton_liquidity': {
      if ((nextState.factionRep.sandton_arbitrage ?? 0) < 1) return state;
      nextState.cash += 800;
      nextState.usedPerksToday.push(perkId);
      nextState.activeLog.unshift(
        '[FACTION PERK: SANDTON LIQUIDITY] Drew an immediate R800 operational liquidity advance from Sandton Arbitrage.'
      );
      return nextState;
    }

    case 'perk_zamazama_tunnels': {
      if ((nextState.factionRep.reef_zamazamas ?? 0) < 1) return state;
      nextState.composure = Math.min(100, nextState.composure + 10);
      if (nextState.clocks.rockfall_hazard) {
        nextState.clocks.rockfall_hazard.current = Math.max(
          0,
          nextState.clocks.rockfall_hazard.current - 1
        );
      }
      nextState.usedPerksToday.push(perkId);
      nextState.activeLog.unshift(
        '[FACTION PERK: ZAMA-ZAMA TUNNELS] Navigated unmapped underground stopes (+10% Composure, -1 Rockfall Hazard).'
      );
      return nextState;
    }

    case 'perk_siu_subpoena': {
      if ((nextState.factionRep.siu_clean_hands ?? 0) < 1) return state;
      if (nextState.clocks.siu_tribunal_docket) {
        nextState.clocks.siu_tribunal_docket.current = Math.min(
          nextState.clocks.siu_tribunal_docket.max,
          nextState.clocks.siu_tribunal_docket.current + 1
        );
      }
      nextState.usedPerksToday.push(perkId);
      nextState.activeLog.unshift(
        '[FACTION PERK: SIU EMERGENCY SUBPOENA] Advocate Khumalo expedites Section 205 asset freeze orders (+1 SIU Docket).'
      );
      return nextState;
    }

    case 'perk_red_guard_strike': {
      if ((nextState.factionRep.red_guard_populists ?? 0) < 2) return state;
      if (nextState.cash < 300) {
        nextState.activeLog.unshift(
          'Insufficient funds: Mobilizing Red Guard highway blockade costs R300.'
        );
        return nextState;
      }
      nextState.cash -= 300;
      if (nextState.clocks.kendon_blackout_countdown) {
        nextState.clocks.kendon_blackout_countdown.current = Math.max(
          0,
          nextState.clocks.kendon_blackout_countdown.current - 1
        );
      }
      nextState.usedPerksToday.push(perkId);
      nextState.activeLog.unshift(
        '[FACTION PERK: RED GUARD HIGHWAY BLOCKADE] Paid R300 to blockade N4/N12 coal corridors (-1 Kendon Climax Countdown).'
      );
      return nextState;
    }

    case 'perk_diver_compression': {
      if ((nextState.factionRep.artisanal_divers ?? 0) < 1) return state;
      nextState.composure = Math.min(100, nextState.composure + 10);
      if (nextState.clocks.diver_bends_hazard) {
        nextState.clocks.diver_bends_hazard.current = Math.max(
          0,
          nextState.clocks.diver_bends_hazard.current - 2
        );
      }
      nextState.usedPerksToday.push(perkId);
      nextState.activeLog.unshift(
        '[FACTION PERK: DIVER DECOMPRESSION] Shore divers hook up oxygen deco-regulators (-2 Bends Hazard, +10% Composure).'
      );
      return nextState;
    }

    case 'perk_kalahari_fuel_drop': {
      if ((nextState.factionRep.kalahari_runners ?? 0) < 1) return state;
      nextState.cash += 200;
      if (nextState.clocks.desert_heat_exhaustion) {
        nextState.clocks.desert_heat_exhaustion.current = Math.max(
          0,
          nextState.clocks.desert_heat_exhaustion.current - 2
        );
      }
      nextState.usedPerksToday.push(perkId);
      nextState.activeLog.unshift(
        '[FACTION PERK: KALAHARI FUEL DROP] Desert runners stash high-octane jerrycans and fresh water (-2 Heat Hazard, +R200).'
      );
      return nextState;
    }

    case 'perk_sea_fisheries_impound': {
      if ((nextState.factionRep.namaqua_command ?? 0) < 1) return state;
      if (nextState.clocks.admiralty_investigation) {
        nextState.clocks.admiralty_investigation.current = Math.min(
          nextState.clocks.admiralty_investigation.max,
          nextState.clocks.admiralty_investigation.current + 1
        );
      }
      if (nextState.clocks.aegis_naval_patrol) {
        nextState.clocks.aegis_naval_patrol.current = Math.max(
          0,
          nextState.clocks.aegis_naval_patrol.current - 1
        );
      }
      nextState.usedPerksToday.push(perkId);
      nextState.activeLog.unshift(
        '[FACTION PERK: SEA FISHERIES IMPOUND] Captain Cloete deploys patrol cutters to impound mercenary skiffs (+1 Admiralty Investigation, -1 Naval Patrol).'
      );
      return nextState;
    }

    case 'perk_namib_gem_valuation': {
      if ((nextState.factionRep.namib_syndicate ?? 0) < 1) return state;
      nextState.cash += 750;
      nextState.composure = Math.min(100, nextState.composure + 5);
      nextState.usedPerksToday.push(perkId);
      nextState.activeLog.unshift(
        '[FACTION PERK: NAMIB GEM VALUATION] Trans-border brokers cash out rough alluvial diamond stones (+R750 cash, +5% Composure).'
      );
      return nextState;
    }

    case 'perk_radar_scramble': {
      if ((nextState.factionRep.aegis_marine ?? 0) < 1) return state;
      if (nextState.clocks.aegis_naval_patrol) {
        nextState.clocks.aegis_naval_patrol.current = Math.max(
          0,
          nextState.clocks.aegis_naval_patrol.current - 2
        );
      }
      if (nextState.clocks.malmokken_fog) {
        nextState.clocks.malmokken_fog.current = Math.min(
          nextState.clocks.malmokken_fog.max,
          nextState.clocks.malmokken_fog.current + 1
        );
      }
      nextState.usedPerksToday.push(perkId);
      nextState.activeLog.unshift(
        '[FACTION PERK: RADAR FREQUENCY SCRAMBLE] Tactical radar towers blinded with false maritime echoes (-2 Naval Patrol, +1 Fog Stealth).'
      );
      return nextState;
    }

    // Story 4 Cape Perks
    case 'perk_bouncer_shakedown': {
      if ((nextState.factionRep.long_street_racket ?? 0) < 1) return state;
      nextState.cash += 600;
      nextState.composure = Math.min(100, nextState.composure + 10);
      nextState.usedPerksToday.push(perkId);
      nextState.activeLog.unshift(
        '[FACTION PERK: BOUNCER SHAKEDOWN] Long Street security retainers collected from VIP lounges (+R600 cash, +10% Composure).'
      );
      return nextState;
    }

    case 'perk_flats_recon': {
      if ((nextState.factionRep.cape_gang_federation ?? 0) < 1) return state;
      if (nextState.clocks.gang_turf_war_clock) {
        nextState.clocks.gang_turf_war_clock.current = Math.max(
          0,
          nextState.clocks.gang_turf_war_clock.current - 2
        );
      }
      if (nextState.clocks.general_swart_manhunt) {
        nextState.clocks.general_swart_manhunt.current = Math.max(
          0,
          nextState.clocks.general_swart_manhunt.current - 1
        );
      }
      nextState.usedPerksToday.push(perkId);
      nextState.activeLog.unshift(
        '[FACTION PERK: CAPE FLATS RECON] Street lookouts track unmarked police vans (-2 Gang Turf War, -1 Swart Manhunt).'
      );
      return nextState;
    }

    case 'perk_winelands_liquidity': {
      if ((nextState.factionRep.winelands_club ?? 0) < 1) return state;
      nextState.cash += 1000;
      nextState.composure = Math.max(0, nextState.composure - 10);
      nextState.usedPerksToday.push(perkId);
      nextState.activeLog.unshift(
        '[FACTION PERK: WINELANDS CAPITAL ADVANCE] Drew R1,000 operational advance from Swiss trusts (-10% Composure for high-society debt).'
      );
      return nextState;
    }

    case 'perk_agu_ballistics': {
      if ((nextState.factionRep.agu_renegades ?? 0) < 1) return state;
      if (nextState.clocks.red_cipher_decryption) {
        nextState.clocks.red_cipher_decryption.current = Math.min(
          nextState.clocks.red_cipher_decryption.max,
          nextState.clocks.red_cipher_decryption.current + 1
        );
      }
      nextState.usedPerksToday.push(perkId);
      nextState.activeLog.unshift(
        '[FACTION PERK: AGU BALLISTICS AUDIT] Forensic striation match advances decryption of the Red Protocol (+1 Decrypt Red Cipher).'
      );
      return nextState;
    }

    case 'perk_dockers_blockade': {
      if ((nextState.factionRep.dockers_union ?? 0) < 1) return state;
      if (nextState.clocks.sovereign_arms_shipment) {
        nextState.clocks.sovereign_arms_shipment.current = Math.max(
          0,
          nextState.clocks.sovereign_arms_shipment.current - 2
        );
      }
      nextState.usedPerksToday.push(perkId);
      nextState.activeLog.unshift(
        '[FACTION PERK: STEVEDORE DOCK BLOCKADE] Crane operators kill power to Berth 109 spreaders (-2 Arms Shipment Countdown).'
      );
      return nextState;
    }

    // Story 5 Sovereign Octagon Perks
    case 'perk_taskforce_airlift': {
      if ((nextState.factionRep.united_hawks_taskforce ?? 0) < 1) return state;
      nextState.composure = Math.min(100, nextState.composure + 15);
      if (nextState.clocks.octagon_mercenary_sweep) {
        nextState.clocks.octagon_mercenary_sweep.current = Math.max(
          0,
          nextState.clocks.octagon_mercenary_sweep.current - 2
        );
      }
      nextState.usedPerksToday.push(perkId);
      nextState.activeLog.unshift(
        '[FACTION PERK: TASKFORCE TACTICAL AIRLIFT] SAAF tactical air transport repositions strike units (-2 Mercenary Sweep, +15% Composure).'
      );
      return nextState;
    }

    case 'perk_constitutional_subpoena': {
      if ((nextState.factionRep.constitutional_court_guard ?? 0) < 1) return state;
      if (nextState.clocks.treason_indictment_docket) {
        nextState.clocks.treason_indictment_docket.current = Math.min(
          nextState.clocks.treason_indictment_docket.max,
          nextState.clocks.treason_indictment_docket.current + 1
        );
      }
      if (nextState.clocks.midnight_sun_coup_countdown) {
        nextState.clocks.midnight_sun_coup_countdown.current = Math.max(
          0,
          nextState.clocks.midnight_sun_coup_countdown.current - 1
        );
      }
      nextState.usedPerksToday.push(perkId);
      nextState.activeLog.unshift(
        '[FACTION PERK: CONSTITUTIONAL SUBPOENA] High Court injunction executed under Section 179 (+1 Treason Indictment, -1 Coup Countdown).'
      );
      return nextState;
    }

    case 'perk_black_start_bypass': {
      if ((nextState.factionRep.national_grid_command ?? 0) < 1) return state;
      if (nextState.clocks.national_blackout_countdown) {
        nextState.clocks.national_blackout_countdown.current = Math.max(
          0,
          nextState.clocks.national_blackout_countdown.current - 2
        );
      }
      nextState.composure = Math.min(100, nextState.composure + 10);
      nextState.usedPerksToday.push(perkId);
      nextState.activeLog.unshift(
        '[FACTION PERK: BLACK-START BYPASS] Apollo engineers isolate SCADA multiplexer relays (-2 Blackout Countdown, +10% Composure).'
      );
      return nextState;
    }

    case 'perk_mass_civil_mobilization': {
      if ((nextState.factionRep.people_resistance_front ?? 0) < 1) return state;
      if (nextState.clocks.octagon_mercenary_sweep) {
        nextState.clocks.octagon_mercenary_sweep.current = Math.max(
          0,
          nextState.clocks.octagon_mercenary_sweep.current - 1
        );
      }
      if (nextState.clocks.midnight_sun_coup_countdown) {
        nextState.clocks.midnight_sun_coup_countdown.current = Math.max(
          0,
          nextState.clocks.midnight_sun_coup_countdown.current - 1
        );
      }
      nextState.cash += 300;
      nextState.usedPerksToday.push(perkId);
      nextState.activeLog.unshift(
        '[FACTION PERK: MASS CIVIL MOBILIZATION] Nationwide union barricades block transport arteries (-1 Mercenary Sweep, -1 Coup Countdown, +R300).'
      );
      return nextState;
    }

    case 'perk_signals_intercept_omega': {
      if ((nextState.factionRep.the_sovereign_octagon ?? 0) < 1) return state;
      if (nextState.clocks.decrypt_master_omega_cipher) {
        nextState.clocks.decrypt_master_omega_cipher.current = Math.min(
          nextState.clocks.decrypt_master_omega_cipher.max,
          nextState.clocks.decrypt_master_omega_cipher.current + 1
        );
      }
      if (nextState.clocks.airspace_radar_jamming) {
        nextState.clocks.airspace_radar_jamming.current = Math.max(
          0,
          nextState.clocks.airspace_radar_jamming.current - 1
        );
      }
      nextState.usedPerksToday.push(perkId);
      nextState.activeLog.unshift(
        '[FACTION PERK: SIGNALS INTERCEPT OMEGA] Counter-intelligence tap breaches the Octagon satellite uplink (+1 Omega Decryption, -1 Radar Jamming).'
      );
      return nextState;
    }
  }
}

/**
 * 1. RESOLVE DIE PLACEMENT ON A NODE ACTION SLOT
 */
export function resolveActionSlot(
  state: GameState,
  nodeId: string,
  slotId: string,
  dieId: string
): GameState {
  const node = state.nodes[nodeId];
  const slot = node?.actionSlots.find((s) => s.id === slotId);
  const die = state.dicePool.find((d) => d.id === dieId);

  if (!node || !slot || !die || die.isUsed || slot.isCompleted) {
    return state;
  }

  // Check if roadblock prevents reaching this node without paying/detouring first
  if (
    state.currentNodeId !== nodeId &&
    isCorridorRoadblocked(state, state.currentNodeId, nodeId) &&
    !hasFreeRoadblockBypass(state)
  ) {
    return {
      ...state,
      activeLog: [
        `Action blocked: Cross the SAPS Roadblock to reach ${node.title} first (R200 Bribe or 1 Die detour).`,
        ...state.activeLog,
      ],
    };
  }

  // Check Stage 6 Load Shedding lockouts (unless generator diesel is active today)
  if (
    state.loadSheddingStage === 6 &&
    slot.disabledDuringStage6 &&
    !state.generatorActiveToday
  ) {
    return {
      ...state,
      activeLog: [
        'Action blocked: Stage 6 Load Shedding has killed power to this sector. Buy Generator Diesel (R300) or use Grid Manipulation.',
        ...state.activeLog,
      ],
    };
  }

  // Check required item
  if (slot.requiredItem && !state.inventory.includes(slot.requiredItem)) {
    return {
      ...state,
      activeLog: [
        `Missing required evidence/item: ${slot.requiredItem}.`,
        ...state.activeLog,
      ],
    };
  }

  // Check cash requirement
  if (slot.costCash && state.cash < slot.costCash) {
    return {
      ...state,
      activeLog: [`Insufficient funds: Requires R${slot.costCash}.`, ...state.activeLog],
    };
  }

  // Calculate Modified Roll: Base Die + Stat Modifier + Stage 6 Bonus + Hostile Turf Penalty
  const statMod = slot.stat === 'any' ? 0 : state.stats[slot.stat];
  const blackoutBonus =
    state.loadSheddingStage === 6 ? (slot.stage6BonusModifier ?? 0) : 0;
  const turfPenalty = getHostileTurfPenalty(state, nodeId);
  const finalRoll = die.value + statMod + blackoutBonus + turfPenalty;

  // Pick outcome tier
  let effect: ActionEffect;
  if (finalRoll >= 6) {
    effect = slot.outcomes.clean;
  } else if (finalRoll >= 4) {
    effect = slot.outcomes.compromised;
  } else {
    effect = slot.outcomes.failure;
  }

  // Clone state for immutable update
  const nextState: GameState = structuredClone(state);
  nextState.currentNodeId = nodeId;

  // Mark die as used & deduct slot cost
  const targetDie = nextState.dicePool.find((d) => d.id === dieId)!;
  targetDie.isUsed = true;
  if (slot.costCash) nextState.cash -= slot.costCash;

  // Mark non-repeatable slot as completed on success
  if (!slot.isRepeatable && finalRoll >= 4) {
    const targetSlot = nextState.nodes[nodeId]?.actionSlots.find(
      (s) => s.id === slotId
    );
    if (targetSlot) {
      targetSlot.isCompleted = true;
    }
  }

  // Apply cash & composure deltas
  if (effect.cashDelta) nextState.cash = Math.max(0, nextState.cash + effect.cashDelta);
  if (effect.composureDelta) {
    nextState.composure = Math.min(
      100,
      Math.max(0, nextState.composure + effect.composureDelta)
    );
  }

  // Apply clock progress & check completions
  if (effect.clockProgress) {
    for (const cp of effect.clockProgress) {
      const clock = nextState.clocks[cp.clockId];
      if (clock) {
        clock.current = Math.min(clock.max, Math.max(0, clock.current + cp.delta));
        if (
          clock.current >= clock.max &&
          !nextState.triggeredEventsQueue.includes(clock.onCompleteEventId)
        ) {
          nextState.triggeredEventsQueue.push(clock.onCompleteEventId);
        }
      }
    }
  }

  // Apply faction reputation shifts
  if (effect.factionRepDelta) {
    for (const fr of effect.factionRepDelta) {
      nextState.factionRep[fr.factionId] += fr.delta;
    }
  }

  // Add inventory item if granted
  if (
    effect.addInventoryItem &&
    !nextState.inventory.includes(effect.addInventoryItem)
  ) {
    nextState.inventory.push(effect.addInventoryItem);
  }

  // Unlock connected map nodes
  if (effect.unlockNodeIds) {
    for (const unlockId of effect.unlockNodeIds) {
      if (nextState.nodes[unlockId]) {
        nextState.nodes[unlockId].isUnlocked = true;
      }
    }
  }

  // Trigger Zero-Composure Breakdown Crisis if Composure hits 0%
  if (
    nextState.composure <= 0 &&
    !nextState.triggeredEventsQueue.includes('evt_composure_breakdown')
  ) {
    nextState.triggeredEventsQueue.push('evt_composure_breakdown');
    nextState.activeLog.unshift(
      '[CRISIS] Composure dropped to 0% — Blackout Paranoia triggered!'
    );
  }

  // Append narrative log
  nextState.activeLog.unshift(
    `[Roll ${die.value} -> ${finalRoll}] ${slot.title}: ${effect.narrativeLog}`
  );

  return nextState;
}

/**
 * 2. END OF DAY / MIDNIGHT CYCLE TRANSITION
 */
export function advanceToNextDay(state: GameState): GameState {
  const nextState: GameState = structuredClone(state);
  nextState.day += 1;
  nextState.generatorActiveToday = false;
  nextState.usedPerksToday = [];

  // 1. Advance all daily ticking clocks
  Object.values(nextState.clocks).forEach((clock) => {
    if (clock.advancesDaily && clock.current < clock.max) {
      clock.current = Math.min(clock.max, clock.current + 1);
      if (
        clock.current >= clock.max &&
        !nextState.triggeredEventsQueue.includes(clock.onCompleteEventId)
      ) {
        nextState.triggeredEventsQueue.push(clock.onCompleteEventId);
      }
    }
  });

  // 2. Queue Morning Encrypted Wire / Street Encounter for the new Day
  if (nextState.act === 2) {
    if (
      nextState.clocks.tarmac_extraction_countdown?.current === 1 &&
      !nextState.triggeredEventsQueue.includes('evt_act2_morning_commission_leak')
    ) {
      nextState.triggeredEventsQueue.push('evt_act2_morning_commission_leak');
    }
  } else {
    const morningWireByDay: Record<number, string> = {
      2: 'evt_morning_masibi_wire',
      3: 'evt_morning_cable_theft',
      4: 'evt_morning_port_tipoff',
    };
    const morningEventId = morningWireByDay[nextState.day];
    if (
      morningEventId &&
      !nextState.triggeredEventsQueue.includes(morningEventId)
    ) {
      nextState.triggeredEventsQueue.push(morningEventId);
    }
  }

  // 3. Cycle Load Shedding Schedule (rotates 2 -> 4 -> 6 -> 2)
  const stageRotation: Record<LoadSheddingStage, LoadSheddingStage> = {
    0: 2,
    2: 4,
    4: 6,
    6: 2,
  };
  nextState.loadSheddingStage = stageRotation[nextState.loadSheddingStage];

  // 4. Determine Dice Count from Composure
  let diceCount = 5;
  if (nextState.composure < 40) diceCount = 3;
  else if (nextState.composure < 80) diceCount = 4;

  // 5. Roll fresh d6 pool
  nextState.dicePool = Array.from({ length: diceCount }, (_, idx) => ({
    id: `d_${nextState.day}_${idx + 1}`,
    value: (Math.floor(Math.random() * 6) + 1) as 1 | 2 | 3 | 4 | 5 | 6,
    isUsed: false,
  }));

  nextState.activeLog.unshift(
    `--- DAY ${nextState.day} BEGINS | Stage ${nextState.loadSheddingStage} Load Shedding | Rolled ${diceCount} Dice ---`
  );

  return nextState;
}

/**
 * 3. APPLY ONE-TIME NPC DIALOGUE INTERROGATION / FAVOR REWARD (PHASE 12)
 */
export function applyDialogueReward(
  state: GameState,
  rewardId: string,
  effect: ActionEffect,
  costCash?: number
): GameState {
  const claimed = state.claimedDialogueRewards ?? [];
  if (claimed.includes(rewardId)) {
    return state;
  }

  if (costCash && state.cash < costCash) {
    return state;
  }

  const nextState: GameState = structuredClone(state);
  if (!nextState.claimedDialogueRewards) {
    nextState.claimedDialogueRewards = [];
  }
  nextState.claimedDialogueRewards.push(rewardId);

  if (costCash) {
    nextState.cash = Math.max(0, nextState.cash - costCash);
  }

  if (effect.cashDelta) {
    nextState.cash = Math.max(0, nextState.cash + effect.cashDelta);
  }

  if (effect.composureDelta) {
    nextState.composure = Math.max(
      0,
      Math.min(100, nextState.composure + effect.composureDelta)
    );
  }

  if (effect.clockProgress) {
    for (const cp of effect.clockProgress) {
      const targetClock = nextState.clocks[cp.clockId];
      if (targetClock) {
        targetClock.current = Math.max(
          0,
          Math.min(targetClock.max, targetClock.current + cp.delta)
        );
        if (
          targetClock.current >= targetClock.max &&
          !nextState.triggeredEventsQueue.includes(targetClock.onCompleteEventId)
        ) {
          nextState.triggeredEventsQueue.push(targetClock.onCompleteEventId);
        }
      }
    }
  }

  if (effect.factionRepDelta) {
    for (const rep of effect.factionRepDelta) {
      nextState.factionRep[rep.factionId] =
        (nextState.factionRep[rep.factionId] || 0) + rep.delta;
    }
  }

  if (
    effect.addInventoryItem &&
    !nextState.inventory.includes(effect.addInventoryItem)
  ) {
    nextState.inventory.push(effect.addInventoryItem);
  }

  if (effect.unlockNodeIds) {
    for (const unlockId of effect.unlockNodeIds) {
      if (nextState.nodes[unlockId]) {
        nextState.nodes[unlockId].isUnlocked = true;
      }
    }
  }

  nextState.activeLog.unshift(`[CONTACT INTEL] ${effect.narrativeLog}`);
  return nextState;
}

