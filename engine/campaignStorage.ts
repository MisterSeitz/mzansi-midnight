import {
  CampaignProgression,
  StoryId,
  StoryStatus,
} from '../types/campaign';
import { StatType } from '../types/game';
import { CAMPAIGN_STORIES } from '../data/campaignStories';
import { loadUnlockedEndings } from './storage';

export const CAMPAIGN_PROGRESSION_KEY = 'mzansi_campaign_progression_v1';

export const STORY_SEQUENCE: StoryId[] = [
  'story_1_ethekwini',
  'story_2_highveld',
  'story_3_namaqua',
  'story_4_cape',
  'story_5_octagon',
];

export function getDefaultProgression(): CampaignProgression {
  return {
    unlockedStories: ['story_1_ethekwini'],
    completedStories: {},
    collectedKeystones: [],
    activeStoryId: 'story_1_ethekwini',
    grandConspiracyBoardUnlocked: false,
    lastUpdated: new Date().toISOString(),
  };
}

/**
 * Loads the campaign progression from localStorage.
 * Automatically synchronizes with existing completed endings from mzansi_midnight_endings_v1
 * so returning players who already finished eThekwini-Gold have Story 2 and their Keystone unlocked.
 */
export function loadCampaignProgression(): CampaignProgression {
  if (typeof window === 'undefined') {
    return getDefaultProgression();
  }

  let progression: CampaignProgression = getDefaultProgression();

  try {
    const raw = window.localStorage.getItem(CAMPAIGN_PROGRESSION_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      progression = {
        unlockedStories: Array.isArray(parsed.unlockedStories)
          ? parsed.unlockedStories
          : ['story_1_ethekwini'],
        completedStories: parsed.completedStories || {},
        collectedKeystones: Array.isArray(parsed.collectedKeystones)
          ? parsed.collectedKeystones
          : [],
        activeStoryId: parsed.activeStoryId || 'story_1_ethekwini',
        grandConspiracyBoardUnlocked: Boolean(parsed.grandConspiracyBoardUnlocked),
        lastUpdated: parsed.lastUpdated || new Date().toISOString(),
      };
    }
  } catch (err) {
    console.error('Failed to parse campaign progression from localStorage:', err);
    progression = getDefaultProgression();
  }

  // Auto-sync with existing unlocked endings
  try {
    const existingEndings = loadUnlockedEndings();
    const endingKeys = Object.keys(existingEndings);
    const hasStory1Completion = endingKeys.some((id) =>
      [
        'ending_vigilante',
        'ending_whistleblower',
        'ending_kingpin',
        'ending_act2_reckoning',
        'ending_act2_revolution',
        'ending_act2_syndicate_state',
        'ending_act2_vanished',
      ].includes(id)
    );

    if (hasStory1Completion && !progression.completedStories['story_1_ethekwini']) {
      const bestEnding = endingKeys[0] || 'ending_whistleblower';
      progression.completedStories['story_1_ethekwini'] = {
        endingId: bestEnding,
        completedAt: new Date().toISOString(),
        keystoneDossierId: 'dossier_sovereign_pearl',
        heroStatCarryover: {
          stat: 'dockets',
          bonus: 1,
        },
      };

      if (!progression.collectedKeystones.includes('dossier_sovereign_pearl')) {
        progression.collectedKeystones.push('dossier_sovereign_pearl');
      }

      if (!progression.unlockedStories.includes('story_2_highveld')) {
        progression.unlockedStories.push('story_2_highveld');
      }

      progression.lastUpdated = new Date().toISOString();
      saveCampaignProgression(progression);
    }
  } catch (err) {
    console.warn('Unable to auto-sync campaign with unlocked endings:', err);
  }

  return progression;
}

/**
 * Saves campaign progression to localStorage.
 */
export function saveCampaignProgression(
  progression: CampaignProgression
): void {
  if (typeof window === 'undefined') return;
  try {
    progression.lastUpdated = new Date().toISOString();
    window.localStorage.setItem(
      CAMPAIGN_PROGRESSION_KEY,
      JSON.stringify(progression)
    );
  } catch (err) {
    console.error('Failed to save campaign progression to localStorage:', err);
  }
}

/**
 * Records the completion of a story campaign, awards its Keystone Dossier,
 * and unlocks the next story in the sequence.
 */
export function recordStoryCompletion(
  storyId: StoryId,
  endingId: string,
  heroStatCarryover?: { stat: StatType; bonus: number }
): CampaignProgression {
  const progression = loadCampaignProgression();
  const storyMeta = CAMPAIGN_STORIES.find((s) => s.id === storyId);
  const keystoneId = storyMeta?.keystoneDossierId || 'dossier_sovereign_pearl';

  progression.completedStories[storyId] = {
    endingId,
    completedAt: new Date().toISOString(),
    keystoneDossierId: keystoneId,
    heroStatCarryover: heroStatCarryover || { stat: 'dockets', bonus: 1 },
  };

  // Add Keystone if not present
  if (keystoneId && !progression.collectedKeystones.includes(keystoneId)) {
    progression.collectedKeystones.push(keystoneId);
  }

  // Determine next story to unlock
  const currentIndex = STORY_SEQUENCE.indexOf(storyId);
  if (currentIndex !== -1 && currentIndex < STORY_SEQUENCE.length - 1) {
    const nextStoryId = STORY_SEQUENCE[currentIndex + 1];
    if (!progression.unlockedStories.includes(nextStoryId)) {
      progression.unlockedStories.push(nextStoryId);
    }
  }

  // Check if all 4 regional stories are completed to unlock Grand Finale
  const allFourCompleted = (
    ['story_1_ethekwini', 'story_2_highveld', 'story_3_namaqua', 'story_4_cape'] as StoryId[]
  ).every((id) => Boolean(progression.completedStories[id]));

  if (allFourCompleted) {
    progression.grandConspiracyBoardUnlocked = true;
    if (!progression.unlockedStories.includes('story_5_octagon')) {
      progression.unlockedStories.push('story_5_octagon');
    }
  }

  saveCampaignProgression(progression);
  return progression;
}

/**
 * Directly unlocks the next story in the campaign sequence.
 */
export function unlockNextStory(currentStoryId: StoryId): CampaignProgression {
  const progression = loadCampaignProgression();
  const currentIndex = STORY_SEQUENCE.indexOf(currentStoryId);

  if (currentIndex !== -1 && currentIndex < STORY_SEQUENCE.length - 1) {
    const nextStoryId = STORY_SEQUENCE[currentIndex + 1];
    if (!progression.unlockedStories.includes(nextStoryId)) {
      progression.unlockedStories.push(nextStoryId);
    }
    saveCampaignProgression(progression);
  }

  return progression;
}

/**
 * Returns whether a story is 'completed', 'unlocked', or 'locked'.
 */
export function getStoryStatus(
  storyId: StoryId,
  progression?: CampaignProgression
): StoryStatus {
  const prog = progression || loadCampaignProgression();
  if (prog.completedStories[storyId]) {
    return 'completed';
  }
  if (prog.unlockedStories.includes(storyId)) {
    return 'unlocked';
  }
  return 'locked';
}

/**
 * Sets the active story ID.
 */
export function setActiveStory(storyId: StoryId): CampaignProgression {
  const progression = loadCampaignProgression();
  if (progression.unlockedStories.includes(storyId)) {
    progression.activeStoryId = storyId;
    saveCampaignProgression(progression);
  }
  return progression;
}

/**
 * Resets campaign progression to default state (Story 1 unlocked only).
 */
export function resetCampaignProgression(): CampaignProgression {
  const defaultProg = getDefaultProgression();
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(CAMPAIGN_PROGRESSION_KEY);
  }
  return defaultProg;
}
