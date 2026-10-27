import { Achievement, LeaderboardEntry } from '../types/leaderboard';
import { GameState } from '../types/game';
import { CampaignProgression } from '../types/campaign';
import { loadUnlockedEndings } from './storage';

export const ACHIEVEMENTS_STORAGE_KEY = 'mzansi_midnight_achievements_v1';

export const BASE_ACHIEVEMENTS: Omit<Achievement, 'unlocked' | 'unlockedAt'>[] = [
  {
    id: 'speed_prowler',
    title: 'Speedrun Prowler',
    description: 'Complete any case docket in under 4 minutes (240s)',
    category: 'speedrun',
    icon: '⚡',
  },
  {
    id: 'ghost_master',
    title: 'Apex Ghost Protocol',
    description: 'Achieve S or S+ Rank on the Fixer Evaluation scoring engine',
    category: 'mastery',
    icon: '👑',
  },
  {
    id: 'harbour_heist',
    title: 'eThekwini Fixer',
    description: 'Resolve the Durban Pier 2 chemical tanker conspiracy',
    category: 'story',
    icon: '🌊',
  },
  {
    id: 'highveld_sovereign',
    title: 'Megawatt Saboteur',
    description: 'Expose or seize the Highveld coal power syndicate',
    category: 'story',
    icon: '⚡',
  },
  {
    id: 'desert_skeleton',
    title: 'Namaqua Diver',
    description: 'Survive the Richtersveld desert and recover the skeleton coast gems',
    category: 'story',
    icon: '💎',
  },
  {
    id: 'cape_infiltrator',
    title: 'Long Street Infiltrator',
    description: 'Breach the Winelands oligarchs and Cape gang cartel',
    category: 'story',
    icon: '🍷',
  },
  {
    id: 'octagon_unveiled',
    title: 'Octagon Sovereign',
    description: 'Confront the Deep State shadow cabinet at the Constitutional Court',
    category: 'story',
    icon: '🏛️',
  },
  {
    id: 'iron_mind',
    title: 'Ice in the Veins',
    description: 'Survive to the ending with Composure at or above 90%',
    category: 'mastery',
    icon: '🧠',
  },
  {
    id: 'sandton_millionaire',
    title: 'Rand War-Chest',
    description: 'Extract from a case with R5,000 or more in hard cash',
    category: 'mastery',
    icon: '💰',
  },
  {
    id: 'archivist_initiate',
    title: 'Dockets Collector',
    description: 'Unlock 5 distinct endings in the Mzansi Midnight anthology',
    category: 'completion',
    icon: '📂',
  },
  {
    id: 'archivist_adept',
    title: 'Syndicate Chronicler',
    description: 'Unlock 12 distinct endings across South Africa',
    category: 'completion',
    icon: '📚',
  },
  {
    id: 'all_endings_unlocked',
    title: 'Grandmaster of Midnight',
    description: 'Unlock all 25 endings across the entire South African anthology',
    category: 'completion',
    icon: '🌌',
  },
];

export function loadAchievements(): Achievement[] {
  if (typeof window === 'undefined') {
    return BASE_ACHIEVEMENTS.map((a) => ({ ...a, unlocked: false }));
  }
  try {
    const raw = window.localStorage.getItem(ACHIEVEMENTS_STORAGE_KEY);
    const saved: Record<string, { unlocked: boolean; unlockedAt?: string }> = raw
      ? JSON.parse(raw)
      : {};

    return BASE_ACHIEVEMENTS.map((base) => {
      const match = saved[base.id];
      return {
        ...base,
        unlocked: Boolean(match?.unlocked),
        unlockedAt: match?.unlockedAt,
      };
    });
  } catch {
    return BASE_ACHIEVEMENTS.map((a) => ({ ...a, unlocked: false }));
  }
}

export function saveAchievements(achievements: Achievement[]): void {
  if (typeof window === 'undefined') return;
  try {
    const map: Record<string, { unlocked: boolean; unlockedAt?: string }> = {};
    for (const a of achievements) {
      if (a.unlocked) {
        map[a.id] = { unlocked: true, unlockedAt: a.unlockedAt };
      }
    }
    window.localStorage.setItem(ACHIEVEMENTS_STORAGE_KEY, JSON.stringify(map));
  } catch {
    // Ignore storage errors
  }
}

export function evaluateAchievements(params: {
  state?: GameState;
  lastEntry?: Partial<LeaderboardEntry>;
  progression?: CampaignProgression;
}): { achievements: Achievement[]; newlyUnlocked: Achievement[] } {
  const current = loadAchievements();
  const unlockedEndings = loadUnlockedEndings();
  const endingsCount = Object.keys(unlockedEndings).length;
  const now = new Date().toISOString();
  const newlyUnlocked: Achievement[] = [];

  const updated = current.map((ach) => {
    if (ach.unlocked) return ach; // Already unlocked

    let shouldUnlock = false;

    // Check conditions
    if (ach.id === 'speed_prowler') {
      if (
        params.lastEntry?.completionSeconds &&
        params.lastEntry.completionSeconds > 0 &&
        params.lastEntry.completionSeconds <= 240
      ) {
        shouldUnlock = true;
      }
    } else if (ach.id === 'ghost_master') {
      if (params.lastEntry?.score && params.lastEntry.score >= 25000) {
        shouldUnlock = true;
      }
    } else if (ach.id === 'harbour_heist') {
      if (
        params.progression?.completedStories['story_1_ethekwini'] ||
        (params.lastEntry?.storyId === 'story_1_ethekwini')
      ) {
        shouldUnlock = true;
      }
    } else if (ach.id === 'highveld_sovereign') {
      if (
        params.progression?.completedStories['story_2_highveld'] ||
        (params.lastEntry?.storyId === 'story_2_highveld')
      ) {
        shouldUnlock = true;
      }
    } else if (ach.id === 'desert_skeleton') {
      if (
        params.progression?.completedStories['story_3_namaqua'] ||
        (params.lastEntry?.storyId === 'story_3_namaqua')
      ) {
        shouldUnlock = true;
      }
    } else if (ach.id === 'cape_infiltrator') {
      if (
        params.progression?.completedStories['story_4_cape'] ||
        (params.lastEntry?.storyId === 'story_4_cape')
      ) {
        shouldUnlock = true;
      }
    } else if (ach.id === 'octagon_unveiled') {
      if (
        params.progression?.completedStories['story_5_octagon'] ||
        (params.lastEntry?.storyId === 'story_5_octagon')
      ) {
        shouldUnlock = true;
      }
    } else if (ach.id === 'iron_mind') {
      if (
        (params.state && params.state.composure >= 90) ||
        (params.lastEntry?.composure && params.lastEntry.composure >= 90)
      ) {
        shouldUnlock = true;
      }
    } else if (ach.id === 'sandton_millionaire') {
      if (
        (params.state && params.state.cash >= 5000) ||
        (params.lastEntry?.cash && params.lastEntry.cash >= 5000)
      ) {
        shouldUnlock = true;
      }
    } else if (ach.id === 'archivist_initiate') {
      if (endingsCount >= 5) shouldUnlock = true;
    } else if (ach.id === 'archivist_adept') {
      if (endingsCount >= 12) shouldUnlock = true;
    } else if (ach.id === 'all_endings_unlocked') {
      if (endingsCount >= 25) shouldUnlock = true;
    }

    if (shouldUnlock) {
      const unlockedItem = { ...ach, unlocked: true, unlockedAt: now };
      newlyUnlocked.push(unlockedItem);
      return unlockedItem;
    }

    return ach;
  });

  saveAchievements(updated);
  return { achievements: updated, newlyUnlocked };
}
