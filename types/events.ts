import { ActionEffect, EndingId, FactionId, StatType } from './game';

export interface EventChoice {
  id: string;
  label: string;
  description: string;
  // Optional gates to click this choice
  requiredCash?: number;
  requiredItem?: string;
  requiredAnyItem?: string[];
  requiredStat?: { stat: StatType; min: number };
  requiredFactionRep?: { factionId: FactionId; min: number };
  // State changes when selected
  effect: ActionEffect & {
    resetClockId?: string;       // Resets a repeatable threat clock back to 0
    removeClockId?: string;      // Permanently deletes a one-time clock
    removeInventoryItem?: string;
    triggerEndingId?: EndingId;  // Transitions to Act 1 Epilogue screen
  };
}

export interface NarrativeEvent {
  id: string;
  title: string;
  category:
    | 'threat_crisis'
    | 'investigation_breakthrough'
    | 'world_event'
    | 'story_climax';
  locationLabel: string;
  speakerName?: string;
  speakerRole?: string;
  bodyText: string[];
  choices: EventChoice[];
}
