import { StatType } from './game';

export type StoryId =
  | 'story_1_ethekwini'
  | 'story_2_highveld'
  | 'story_3_namaqua'
  | 'story_4_cape'
  | 'story_5_octagon';

export type StoryStatus = 'locked' | 'unlocked' | 'completed';

export interface StoryMetadata {
  id: StoryId;
  number: 1 | 2 | 3 | 4 | 5;
  title: string;
  subtitle: string;
  region: string;
  era: string;
  protagonistName: string;
  protagonistRole: string;
  caseDocket: string;
  synopsis: string;
  keystoneDossierId: string;
  keystoneTitle: string;
  keystoneSummary: string;
  accentColor: string; // Tailwind color key, e.g. 'amber', 'cyan', 'orange', 'purple', 'rose'
  imageArt: string;
  unlockConditionText: string;
  isPlayable: boolean; // true for story_1 currently, upcoming for stories 2-5
  factions: string[];
  regionalMechanic: string;
}

export interface KeystoneDossier {
  id: string;
  storyId: StoryId;
  nextStoryId: StoryId;
  title: string;
  classification: string;
  sourceLabel: string;
  summary: string;
  documentExcerpt: string[];
  gameplayEffect: string;
  inheritedHeroStat: StatType;
  inheritedBonus: number;
}

export interface StoryCompletionRecord {
  endingId: string;
  completedAt: string;
  keystoneDossierId: string;
  heroStatCarryover?: {
    stat: StatType;
    bonus: number;
  };
  unlockedFactionFavors?: string[];
}

export interface CampaignProgression {
  unlockedStories: StoryId[];
  completedStories: Partial<Record<StoryId, StoryCompletionRecord>>;
  collectedKeystones: string[];
  activeStoryId: StoryId;
  grandConspiracyBoardUnlocked: boolean;
  lastUpdated: string;
}
