import { FactionId, StatType } from './game';

export interface CharacterBackground {
  id:
    | 'forensic_hawk'
    | 'trt_breacher'
    | 'crime_intel'
    | 'siu_whistleblower'
    | 'deep_reef_fixer'
    | 'nia_ghost'
    | 'deep_sea_diver'
    | 'kalahari_tracker'
    | 'ex_naval_infiltrator'
    | 'agu_ballistics_detective'
    | 'cape_flats_infiltrator'
    | 'winelands_forensic_auditor'
    // Story 5: The Sovereign Octagon
    | 'taskforce_commander_nandi'
    | 'taskforce_strike_gideon'
    | 'taskforce_intelligence_leila';
  title: string;
  formerUnit: string;
  tagline: string;
  description: string;
  stats: Record<StatType, number>;
  startingCash: number;
  factionBonus: { factionId: FactionId; delta: number };
}

export interface DialogueOption {
  id: string;
  label: string;
  nextSceneNodeId: string;
  // Optional stat check or background requirement
  statCheck?: { stat: StatType; threshold: number };
  setBackgroundId?: CharacterBackground['id'];
  composureDelta?: number;
  cashDelta?: number;
  clockDelta?: { clockId: string; delta: number };
  responseLog?: string;
}

export interface PrologueSceneNode {
  id: string;
  timestamp: string;
  speaker?: string;
  speakerRole?: string;
  paragraphs: string[];
  isBackgroundSelect?: boolean;
  options: DialogueOption[];
}
