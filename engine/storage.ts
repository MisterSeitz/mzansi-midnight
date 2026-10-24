import { EndingId, GameState } from '../types/game';
import {
  DEFAULT_GAME_SETTINGS,
  GameSettings,
  SaveSlotId,
  SaveSlotRecord,
} from '../types/settings';

const LEGACY_SAVE_KEY = 'mzansi_midnight_save_v1';
const SAVES_V2_KEY = 'mzansi_midnight_saves_v2';
const SETTINGS_KEY = 'mzansi_midnight_settings_v1';
const UNLOCKED_ENDINGS_KEY = 'mzansi_midnight_endings_v1';
export const GUIDE_SEEN_KEY = 'mzansi_midnight_seen_guide_v1';

export interface UnlockedEndingRecord {
  endingId: EndingId;
  unlockedAt: string;
  cyclesSurvived: number;
  closingCash: number;
}

export const SLOT_LABELS: Record<SaveSlotId, string> = {
  autosave: 'Auto-Save Dossier',
  slot_1: 'Case File Slot 01',
  slot_2: 'Case File Slot 02',
  slot_3: 'Case File Slot 03',
};

export const SAVE_SLOT_LABELS = SLOT_LABELS;

export const MANUAL_SAVE_SLOT_IDS: SaveSlotId[] = ['slot_1', 'slot_2', 'slot_3'];

export function loadUnlockedEndings(): Partial<
  Record<EndingId, UnlockedEndingRecord>
> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(UNLOCKED_ENDINGS_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export function recordUnlockedEnding(
  endingId: EndingId,
  state: GameState
): Partial<Record<EndingId, UnlockedEndingRecord>> {
  if (typeof window === 'undefined') return {};
  try {
    const current = loadUnlockedEndings();
    current[endingId] = {
      endingId,
      unlockedAt: new Date().toISOString(),
      cyclesSurvived: state.day,
      closingCash: state.cash,
    };
    window.localStorage.setItem(UNLOCKED_ENDINGS_KEY, JSON.stringify(current));
    return current;
  } catch {
    return {};
  }
}

export function loadSettings(): GameSettings {
  if (typeof window === 'undefined') return DEFAULT_GAME_SETTINGS;
  try {
    const raw = window.localStorage.getItem(SETTINGS_KEY);
    if (!raw) return DEFAULT_GAME_SETTINGS;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_GAME_SETTINGS,
      ...parsed,
    };
  } catch {
    return DEFAULT_GAME_SETTINGS;
  }
}

export function saveSettings(settings: GameSettings): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch {
    // Ignore storage errors
  }
}

export function loadAllSaveSlots(): Partial<Record<SaveSlotId, SaveSlotRecord>> {
  if (typeof window === 'undefined') return {};
  try {
    const rawV2 = window.localStorage.getItem(SAVES_V2_KEY);
    const records: Partial<Record<SaveSlotId, SaveSlotRecord>> = rawV2
      ? JSON.parse(rawV2)
      : {};

    // Migrate legacy v1 save into autosave if present and valid
    if (!records.autosave) {
      const rawV1 = window.localStorage.getItem(LEGACY_SAVE_KEY);
      if (rawV1) {
        const parsedV1 = JSON.parse(rawV1);
        if (parsedV1?.gameState && !parsedV1.gameState.activeEndingId) {
          records.autosave = {
            slotId: 'autosave',
            label: SLOT_LABELS.autosave,
            savedAt: new Date().toISOString(),
            inPrologue: Boolean(parsedV1.inPrologue),
            gameState: parsedV1.gameState,
          };
          window.localStorage.setItem(SAVES_V2_KEY, JSON.stringify(records));
        }
      }
    }

    return records;
  } catch {
    return {};
  }
}

export function writeSaveSlot(
  slotId: SaveSlotId,
  gameState: GameState,
  inPrologue: boolean
): Partial<Record<SaveSlotId, SaveSlotRecord>> {
  if (typeof window === 'undefined') return {};
  try {
    const all = loadAllSaveSlots();
    if (gameState.activeEndingId) {
      // Automatically record the unlocked ending in the Case Archive
      recordUnlockedEnding(gameState.activeEndingId, gameState);
      // Completed timeline should clear active autosave so player isn't stuck on ending
      if (slotId === 'autosave') {
        delete all.autosave;
        window.localStorage.removeItem(LEGACY_SAVE_KEY);
      }
    } else {
      all[slotId] = {
        slotId,
        label: SLOT_LABELS[slotId],
        savedAt: new Date().toISOString(),
        inPrologue,
        gameState,
      };
    }
    window.localStorage.setItem(SAVES_V2_KEY, JSON.stringify(all));
    return all;
  } catch {
    return {};
  }
}

export function deleteSaveSlot(
  slotId: SaveSlotId
): Partial<Record<SaveSlotId, SaveSlotRecord>> {
  if (typeof window === 'undefined') return {};
  try {
    const all = loadAllSaveSlots();
    delete all[slotId];
    if (slotId === 'autosave') {
      window.localStorage.removeItem(LEGACY_SAVE_KEY);
    }
    window.localStorage.setItem(SAVES_V2_KEY, JSON.stringify(all));
    return all;
  } catch {
    return {};
  }
}

export function clearAllSavesAndTutorial(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(SAVES_V2_KEY);
    window.localStorage.removeItem(LEGACY_SAVE_KEY);
    window.localStorage.removeItem(GUIDE_SEEN_KEY);
    window.localStorage.removeItem(UNLOCKED_ENDINGS_KEY);
  } catch {
    // Ignore
  }
}
