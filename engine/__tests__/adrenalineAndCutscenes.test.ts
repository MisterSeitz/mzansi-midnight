import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { initialGameState } from '../../data/initialState';
import { calculateAdrenaline } from '../adrenaline';
import { STORY_CUTSCENES } from '../../data/cutscenes';
import { ACT_1_ENDINGS } from '../../data/endings';
import { HIGHVELD_ENDINGS } from '../../data/story2HighveldEndings';
import { NAMAQUA_ENDINGS } from '../../data/story3NamaquaEndings';
import { CAPE_ENDINGS } from '../../data/story4CapeEndings';
import { OCTAGON_ENDINGS } from '../../data/story5OctagonEndings';

describe('Adrenaline & Tension Engine', () => {
  it('1. Initializes at COVERT level on fresh Act 1 game state', () => {
    const metrics = calculateAdrenaline(initialGameState);
    expect(metrics.level).toBe(1);
    expect(metrics.levelName).toBe('COVERT');
    expect(metrics.score).toBeLessThanOrEqual(25);
    expect(metrics.isClimaxImminent).toBe(false);
  });

  it('2. Escalates to ALERT when threat clocks advance', () => {
    const state = structuredClone(initialGameState);
    state.clocks.mokoena_sweep.current = 3; // 3/6
    state.clocks.precinct_heat.current = 3; // 3/6
    const metrics = calculateAdrenaline(state);
    expect(metrics.level).toBeGreaterThanOrEqual(2);
    expect(metrics.highestThreatProgress).toBe(0.5);
  });

  it('3. Escalates to TENSION when climax clock reaches 50%', () => {
    const state = structuredClone(initialGameState);
    state.clocks.berth_14_countdown.current = 2; // 2/4 (50%)
    const metrics = calculateAdrenaline(state);
    expect(metrics.level).toBeGreaterThanOrEqual(3);
    expect(metrics.climaxClockProgress).toBe(0.5);
  });

  it('4. Escalates to CRITICAL when threat is near max or composure is shattered', () => {
    const state = structuredClone(initialGameState);
    state.clocks.mokoena_sweep.current = 5; // 5/6 (83%)
    state.composure = 15;
    const metrics = calculateAdrenaline(state);
    expect(metrics.level).toBeGreaterThanOrEqual(4);
    expect(metrics.composureRisk).toBe(true);
  });

  it('5. Peaks at CLIMAX level (Level 5) when climax event is queued or countdown is full', () => {
    const state = structuredClone(initialGameState);
    state.clocks.berth_14_countdown.current = 4; // 4/4 (100%)
    state.triggeredEventsQueue = ['evt_climax_berth14'];
    const metrics = calculateAdrenaline(state);
    expect(metrics.level).toBe(5);
    expect(metrics.levelName).toBe('CLIMAX');
    expect(metrics.score).toBeGreaterThanOrEqual(95);
    expect(metrics.isClimaxImminent).toBe(true);
  });
});

describe('Cinematic Cutscenes & Visual Assets on Disk', () => {
  it('1. Verifies all 5 regional climax cutscenes have complete narrative beats and valid image paths', () => {
    const cutsceneKeys = [
      'cutscene_berth14_breach',
      'cutscene_kendon_sabotage',
      'cutscene_namaqua_drop',
      'cutscene_cape_dockers',
      'cutscene_octagon_bunker',
    ];

    cutsceneKeys.forEach((key) => {
      const cutscene = STORY_CUTSCENES[key];
      expect(cutscene).toBeDefined();
      expect(cutscene.beats.length).toBeGreaterThanOrEqual(3);
      expect(cutscene.title).toBeTruthy();
      expect(cutscene.actionLabel).toBeTruthy();

      const diskPath = path.join(process.cwd(), 'public', cutscene.image);
      expect(fs.existsSync(diskPath), `Cutscene image missing on disk: ${cutscene.image}`).toBe(true);
      expect(fs.statSync(diskPath).size).toBeGreaterThan(10000);
    });
  });

  it('2. Verifies generated ending artworks exist on disk and exceed 50KB', () => {
    const endingFiles = [
      'ending_vigilante.jpg',
      'ending_whistleblower.jpg',
      'ending_kingpin.jpg',
      'ending_captured.jpg',
      'ending_act2_reckoning.jpg',
      'ending_highveld_vindication.jpg',
      'ending_namaqua_rebellion.jpg',
      'ending_cape_seizure.jpg',
      'ending_octagon_reckoning.jpg',
    ];

    endingFiles.forEach((filename) => {
      const diskPath = path.join(process.cwd(), 'public', 'assets', 'endings', filename);
      expect(fs.existsSync(diskPath), `Ending artwork missing on disk: ${filename}`).toBe(true);
      expect(fs.statSync(diskPath).size).toBeGreaterThan(50000);
    });
  });

  it('3. Verifies all Act 1 and Anthology endings have defined aftermaths and epilogue paragraphs', () => {
    const allEndings = [
      ...Object.values(ACT_1_ENDINGS),
      ...Object.values(HIGHVELD_ENDINGS),
      ...Object.values(NAMAQUA_ENDINGS),
      ...Object.values(CAPE_ENDINGS),
      ...Object.values(OCTAGON_ENDINGS),
    ];

    allEndings.forEach((ending) => {
      expect(ending.title).toBeTruthy();
      expect(ending.epilogueParagraphs.length).toBeGreaterThanOrEqual(2);
      expect(ending.cityAftermath.length).toBeGreaterThanOrEqual(2);
    });
  });
});
