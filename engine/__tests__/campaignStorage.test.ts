import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  loadCampaignProgression,
  saveCampaignProgression,
  recordStoryCompletion,
  unlockNextStory,
  getStoryStatus,
  setActiveStory,
  resetCampaignProgression,
  CAMPAIGN_PROGRESSION_KEY,
} from '../campaignStorage';
import { CAMPAIGN_STORIES, KEYSTONE_DOSSIERS } from '../../data/campaignStories';

describe('Campaign Storage & Progression Engine', () => {
  let localStorageMock: Record<string, string> = {};

  beforeEach(() => {
    localStorageMock = {};
    vi.stubGlobal('window', {
      localStorage: {
        getItem: vi.fn((key: string) => localStorageMock[key] || null),
        setItem: vi.fn((key: string, value: string) => {
          localStorageMock[key] = value;
        }),
        removeItem: vi.fn((key: string) => {
          delete localStorageMock[key];
        }),
      },
    });
  });

  it('initializes with Story 1 unlocked by default when no prior save exists', () => {
    const progression = loadCampaignProgression();
    expect(progression.unlockedStories).toContain('story_1_ethekwini');
    expect(progression.unlockedStories.length).toBe(1);
    expect(progression.collectedKeystones).toEqual([]);
    expect(progression.activeStoryId).toBe('story_1_ethekwini');
    expect(getStoryStatus('story_1_ethekwini', progression)).toBe('unlocked');
    expect(getStoryStatus('story_2_highveld', progression)).toBe('locked');
  });

  it('records completion of Story 1, awards Sovereign Pearl Keystone, and unlocks Story 2', () => {
    const updated = recordStoryCompletion(
      'story_1_ethekwini',
      'ending_whistleblower',
      { stat: 'dockets', bonus: 1 }
    );

    expect(getStoryStatus('story_1_ethekwini', updated)).toBe('completed');
    expect(getStoryStatus('story_2_highveld', updated)).toBe('unlocked');
    expect(getStoryStatus('story_3_namaqua', updated)).toBe('locked');
    expect(updated.collectedKeystones).toContain('dossier_sovereign_pearl');
    expect(updated.completedStories['story_1_ethekwini']?.endingId).toBe(
      'ending_whistleblower'
    );
    expect(
      updated.completedStories['story_1_ethekwini']?.heroStatCarryover?.stat
    ).toBe('dockets');
  });

  it('sequentially unlocks all 5 stories as each chapter completes', () => {
    // Complete Story 1
    recordStoryCompletion('story_1_ethekwini', 'ending_whistleblower');
    // Complete Story 2
    recordStoryCompletion('story_2_highveld', 'ending_midas_exposed');
    // Complete Story 3
    recordStoryCompletion('story_3_namaqua', 'ending_desert_salvage');

    let current = loadCampaignProgression();
    expect(getStoryStatus('story_1_ethekwini', current)).toBe('completed');
    expect(getStoryStatus('story_2_highveld', current)).toBe('completed');
    expect(getStoryStatus('story_3_namaqua', current)).toBe('completed');
    expect(getStoryStatus('story_4_cape', current)).toBe('unlocked');
    expect(getStoryStatus('story_5_octagon', current)).toBe('locked');
    expect(current.grandConspiracyBoardUnlocked).toBe(false);

    // Complete Story 4 -> Grand Finale Story 5 unlocks!
    current = recordStoryCompletion('story_4_cape', 'ending_red_sovereign_broken');
    expect(getStoryStatus('story_4_cape', current)).toBe('completed');
    expect(getStoryStatus('story_5_octagon', current)).toBe('unlocked');
    expect(current.grandConspiracyBoardUnlocked).toBe(true);
    expect(current.collectedKeystones).toEqual([
      'dossier_sovereign_pearl',
      'dossier_project_midas',
      'dossier_admiralty_manifest',
      'dossier_red_protocol',
    ]);
  });

  it('auto-syncs with existing unlocked endings from storage', () => {
    // Simulate pre-existing endings from mzansi_midnight_endings_v1
    localStorageMock['mzansi_midnight_endings_v1'] = JSON.stringify({
      ending_whistleblower: {
        endingId: 'ending_whistleblower',
        unlockedAt: '2026-10-19T12:00:00Z',
        cyclesSurvived: 4,
        closingCash: 2400,
      },
    });

    const progression = loadCampaignProgression();
    expect(getStoryStatus('story_1_ethekwini', progression)).toBe('completed');
    expect(getStoryStatus('story_2_highveld', progression)).toBe('unlocked');
    expect(progression.collectedKeystones).toContain('dossier_sovereign_pearl');
  });

  it('updates activeStoryId when setActiveStory is called on unlocked story and ignores locked story', () => {
    // Initial state: story 1 unlocked, story 2 locked
    let prog = loadCampaignProgression();
    expect(prog.activeStoryId).toBe('story_1_ethekwini');

    // Attempting to set locked story 2 should be rejected
    prog = setActiveStory('story_2_highveld');
    expect(prog.activeStoryId).toBe('story_1_ethekwini');

    // Unlock story 2
    recordStoryCompletion('story_1_ethekwini', 'ending_whistleblower');
    prog = setActiveStory('story_2_highveld');
    expect(prog.activeStoryId).toBe('story_2_highveld');

    // Verify persistence across reloads
    const reloaded = loadCampaignProgression();
    expect(reloaded.activeStoryId).toBe('story_2_highveld');
  });

  it('resets progression cleanly when resetCampaignProgression is called', () => {
    recordStoryCompletion('story_1_ethekwini', 'ending_vigilante');
    const reset = resetCampaignProgression();
    expect(reset.unlockedStories).toEqual(['story_1_ethekwini']);
    expect(reset.collectedKeystones).toEqual([]);
    expect(reset.completedStories).toEqual({});
  });

  it('has verified metadata for all 5 stories in CAMPAIGN_STORIES', () => {
    expect(CAMPAIGN_STORIES.length).toBe(5);
    const storyIds = CAMPAIGN_STORIES.map((s) => s.id);
    expect(storyIds).toEqual([
      'story_1_ethekwini',
      'story_2_highveld',
      'story_3_namaqua',
      'story_4_cape',
      'story_5_octagon',
    ]);

    CAMPAIGN_STORIES.forEach((story) => {
      expect(story.title).toBeTruthy();
      expect(story.region).toBeTruthy();
      expect(story.synopsis).toBeTruthy();
      expect(story.factions.length).toBeGreaterThan(0);
    });
  });

  it('has verified definitions for all 4 Keystone Dossiers', () => {
    const keys = Object.keys(KEYSTONE_DOSSIERS);
    expect(keys).toContain('dossier_sovereign_pearl');
    expect(keys).toContain('dossier_project_midas');
    expect(keys).toContain('dossier_admiralty_manifest');
    expect(keys).toContain('dossier_red_protocol');

    keys.forEach((k) => {
      const d = KEYSTONE_DOSSIERS[k];
      expect(d.title).toBeTruthy();
      expect(d.documentExcerpt.length).toBeGreaterThan(0);
      expect(d.inheritedHeroStat).toBeTruthy();
    });
  });
});
