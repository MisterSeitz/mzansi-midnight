import { StoryId } from './campaign';
export type { StoryId };

export type StatType = 'street' | 'dockets' | 'wire' | 'influence';

export type FactionId =
  // Story 1: eThekwini-Gold
  | 'abasanta'
  | 'city_hall'
  | 'saps_trt'
  | 'street_syndicate'
  | 'hawks'
  // Story 2: Highveld-Chrome
  | 'megawatt_cartel'
  | 'sandton_arbitrage'
  | 'reef_zamazamas'
  | 'siu_clean_hands'
  | 'red_guard_populists'
  // Story 3: Namaqua-Diamond
  | 'aegis_marine'
  | 'artisanal_divers'
  | 'kalahari_runners'
  | 'namaqua_command'
  | 'namib_syndicate'
  // Story 4: Cape-Nocturne
  | 'long_street_racket'
  | 'cape_gang_federation'
  | 'winelands_club'
  | 'agu_renegades'
  | 'dockers_union'
  // Story 5: The Sovereign Octagon
  | 'united_hawks_taskforce'
  | 'the_sovereign_octagon'
  | 'constitutional_court_guard'
  | 'national_grid_command'
  | 'people_resistance_front';

export type LoadSheddingStage = 0 | 2 | 4 | 6;

export interface Die {
  id: string;
  value: 1 | 2 | 3 | 4 | 5 | 6;
  isUsed: boolean;
}

export interface Clock {
  id: string;
  title: string;
  description: string;
  type: 'action' | 'threat' | 'world';
  current: number;
  max: 4 | 6 | 8 | 12;
  advancesDaily: boolean; // True for threat/world clocks that tick at midnight
  onCompleteEventId: string; // Triggers narrative event or unlocks nodes when full
}

export interface ActionEffect {
  cashDelta?: number;
  composureDelta?: number;
  clockProgress?: { clockId: string; delta: number }[];
  factionRepDelta?: { factionId: FactionId; delta: number }[];
  unlockNodeIds?: string[];
  addInventoryItem?: string;
  narrativeLog: string;
}

export interface ActionSlot {
  id: string;
  title: string;
  description: string;
  stat: StatType | 'any';
  isRepeatable: boolean;
  isCompleted: boolean;
  costCash?: number;
  requiredItem?: string;
  // Load shedding interaction rules
  disabledDuringStage6?: boolean;
  stage6BonusModifier?: number;
  // Outcomes based on modified die roll
  outcomes: {
    clean: ActionEffect;       // Modified roll >= 6
    compromised: ActionEffect; // Modified roll 4 - 5
    failure: ActionEffect;     // Modified roll <= 3
  };
}

export interface MapNode {
  id: string;
  title: string;
  subtitle: string;
  factionOwner: FactionId | 'neutral';
  tier: 'street_west' | 'civic_center' | 'waterfront_east';
  x: number; // Percentage 0 - 100 across the map canvas
  y: number; // Percentage 0 - 100 down the map canvas
  isUnlocked: boolean;
  connectedNodeIds: string[];
  actionSlots: ActionSlot[];
}

export type EndingId =
  // Story 1: eThekwini-Gold (Act 1 & Act 2)
  | 'ending_vigilante'
  | 'ending_whistleblower'
  | 'ending_kingpin'
  | 'ending_captured'
  | 'ending_act2_reckoning'
  | 'ending_act2_revolution'
  | 'ending_act2_syndicate_state'
  | 'ending_act2_vanished'
  // Story 2: Highveld-Chrome
  | 'ending_highveld_siu_vindication'
  | 'ending_highveld_red_blackout'
  | 'ending_highveld_arbitrage_partner'
  | 'ending_highveld_shaft_collapse'
  // Story 3: Namaqua-Diamond
  | 'ending_namaqua_naval_raid'
  | 'ending_namaqua_divers_rebellion'
  | 'ending_namaqua_diamond_flight'
  | 'ending_namaqua_desert_dune_grave'
  // Story 4: Cape-Nocturne
  | 'ending_cape_sovereign_seizure'
  | 'ending_cape_gang_truce'
  | 'ending_cape_winelands_audit'
  | 'ending_cape_shadow_execution'
  // Story 5: The Sovereign Octagon
  | 'ending_octagon_constitutional_reckoning'
  | 'ending_octagon_peoples_revolution'
  | 'ending_octagon_shadow_director'
  | 'ending_octagon_balkanized_republic'
  | 'ending_octagon_vanished_watchers';

export type FactionPerkId =
  // Story 1 perks
  | 'perk_grid_manipulation'
  | 'perk_bluelight_escort'
  | 'perk_izinkabi_muscle'
  | 'perk_hawks_safechannel'
  // Story 2 perks
  | 'perk_substation_bypass'
  | 'perk_sandton_liquidity'
  | 'perk_zamazama_tunnels'
  | 'perk_siu_subpoena'
  | 'perk_red_guard_strike'
  // Story 3 perks
  | 'perk_diver_compression'
  | 'perk_kalahari_fuel_drop'
  | 'perk_sea_fisheries_impound'
  | 'perk_namib_gem_valuation'
  | 'perk_radar_scramble'
  // Story 4 perks
  | 'perk_bouncer_shakedown'
  | 'perk_flats_recon'
  | 'perk_winelands_liquidity'
  | 'perk_agu_ballistics'
  | 'perk_dockers_blockade'
  // Story 5 perks
  | 'perk_taskforce_airlift'
  | 'perk_constitutional_subpoena'
  | 'perk_black_start_bypass'
  | 'perk_mass_civil_mobilization'
  | 'perk_signals_intercept_omega';

export interface GameState {
  storyId?: StoryId; // 'story_1_ethekwini' | 'story_2_highveld' etc.
  act?: 1 | 2;
  act1EndingPath?: EndingId;
  day: number;
  cash: number; // In Rands (ZAR)
  composure: number; // 0 to 100
  loadSheddingStage: LoadSheddingStage;
  stats: Record<StatType, number>;
  factionRep: Record<FactionId, number>;
  inventory: string[];
  dicePool: Die[];
  clocks: Record<string, Clock>;
  nodes: Record<string, MapNode>;
  activeLog: string[];
  triggeredEventsQueue: string[]; // Event IDs waiting to fire
  activeEndingId?: EndingId | null;
  currentNodeId: string; // Player's physical location on the district map
  generatorActiveToday: boolean; // True if R300 diesel was spent today to bypass Stage 6
  usedPerksToday: FactionPerkId[]; // Perks used during the current cycle
  claimedDialogueRewards?: string[]; // One-time rewards claimed inside NPC dialogue trees
}

