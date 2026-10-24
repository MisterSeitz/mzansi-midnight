'use client';

import React from 'react';
import { GameState, LoadSheddingStage } from '../types/game';
import { SupportedLanguage } from '../types/settings';
import { soundscape } from '../engine/soundscape';
import { t, getLocalizedClockTitle } from '../engine/i18n';

const ROTATION_MAP: Record<LoadSheddingStage, LoadSheddingStage> = {
  0: 2,
  2: 4,
  4: 6,
  6: 2,
};

export const EndCycleModal: React.FC<{
  isOpen: boolean;
  state: GameState;
  lang?: SupportedLanguage;
  onConfirm: () => void;
  onCancel: () => void;
}> = ({ isOpen, state, lang = 'en', onConfirm, onCancel }) => {
  if (!isOpen) return null;

  const unusedDice = state.dicePool.filter((d) => !d.isUsed);
  const unusedCount = unusedDice.length;
  const nextStage = ROTATION_MAP[state.loadSheddingStage];

  // Daily ticking clocks that will advance tonight
  const tickingClocks = Object.values(state.clocks).filter(
    (c) => c.advancesDaily && c.current < c.max
  );

  // Tomorrow's dice forecast based on current composure
  let tomorrowDice = 5;
  if (state.composure < 40) tomorrowDice = 3;
  else if (state.composure < 80) tomorrowDice = 4;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 select-none font-sans"
      onClick={() => {
        soundscape.playDieSelect();
        onCancel();
      }}
    >
      <div
        className="w-full max-w-lg max-h-[90dvh] flex flex-col rounded-2xl border-2 border-amber-500/70 bg-zinc-950 shadow-[0_0_50px_rgba(245,158,11,0.2)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="px-5 py-3.5 bg-amber-950/30 border-b border-amber-900/50 flex items-center justify-between font-mono text-xs shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-amber-400 font-bold uppercase tracking-wider">
              {t('ui.cycle', 'CYCLE', lang)} {state.day} {t('ui.nightfall', 'NIGHTFALL', lang)} // {t('ui.end_cycle', 'END DAY CONFIRMATION', lang)}
            </span>
          </div>
          <button
            onClick={() => {
              soundscape.playDieSelect();
              onCancel();
            }}
            className="text-zinc-400 hover:text-white uppercase font-mono text-xs cursor-pointer"
          >
            {t('ui.close_btn', '[Close ✕]', lang)}
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-5 sm:p-6 space-y-4 overflow-y-auto">
          {/* 1. UNUSED DICE WARNING */}
          {unusedCount > 0 ? (
            <div className="p-3.5 rounded-xl border border-amber-500/80 bg-amber-950/40 space-y-1.5">
              <div className="flex items-center gap-2 text-amber-300 font-mono text-xs font-bold uppercase">
                <span>⚠️ {unusedCount} {t('endcycle.unused_dice_title', 'Unused Action Dice Remaining Today', lang)}</span>
              </div>
              <p className="text-xs text-amber-100/90 leading-relaxed">
                {t(
                  'endcycle.unused_dice_desc',
                  'You still have {count} unassigned dice in your dock. Going to sleep now will forfeit these actions and end your Day {day} shift immediately.',
                  lang
                )
                  .replace('{count}', String(unusedCount))
                  .replace('{day}', String(state.day))}
              </p>
            </div>
          ) : (
            <div className="p-3.5 rounded-xl border border-emerald-500/60 bg-emerald-950/30 space-y-1">
              <div className="text-emerald-300 font-mono text-xs font-bold uppercase">
                ✓ {t('endcycle.all_dice_spent_title', 'All Daily Action Dice Spent', lang)}
              </div>
              <p className="text-xs text-zinc-300">
                {t(
                  'endcycle.all_dice_spent_desc',
                  'You have deployed all {total} action dice for today. Lay low at your safehouse until sunrise.',
                  lang
                ).replace('{total}', String(state.dicePool.length))}
              </p>
            </div>
          )}

          {/* 2. OVERNIGHT SHIFTS PREVIEW */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400">
              {t('endcycle.overnight_sim_title', 'What Happens When You Sleep (Overnight Simulation)', lang)}
            </h3>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 divide-y divide-zinc-800 text-xs">
              {/* THREAT CLOCKS */}
              <div className="p-3 space-y-1.5">
                <div className="font-mono text-[11px] uppercase text-zinc-400">
                  {t('endcycle.threat_clocks_advance', '1. Ticking Threat Clocks Advance (+1 segment):', lang)}
                </div>
                {tickingClocks.length > 0 ? (
                  <ul className="space-y-1 pl-2">
                    {tickingClocks.map((clock) => {
                      const willComplete = clock.current + 1 >= clock.max;
                      return (
                        <li key={clock.id} className="flex items-center justify-between font-mono text-[11px]">
                          <span className={willComplete ? 'text-red-400 font-bold' : 'text-zinc-200'}>
                            &bull; {getLocalizedClockTitle(clock.id, clock.title, lang)}
                          </span>
                          <span className={willComplete ? 'text-red-400 font-bold' : 'text-amber-400'}>
                            {clock.current}/{clock.max} &rarr; {Math.min(clock.max, clock.current + 1)}/{clock.max}
                            {willComplete ? ` ${t('endcycle.trigger_alert', '[TRIGGER!]', lang)}` : ''}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <span className="text-zinc-500 text-[11px]">
                    {t('endcycle.no_threat_clocks', 'No active ticking threat clocks.', lang)}
                  </span>
                )}
              </div>

              {/* ESKOM LOAD SHEDDING */}
              <div className="p-3 flex items-center justify-between font-mono text-[11px]">
                <span className="text-zinc-400">{t('endcycle.grid_rotation_label', '2. Eskom Grid Rotation:', lang)}</span>
                <span className="text-amber-300 font-semibold">
                  {t('ui.stage', 'Stage', lang)} {state.loadSheddingStage} &rarr; {t('ui.stage', 'Stage', lang)} {nextStage} {t('ui.load_shedding', 'Load Shedding', lang)}
                </span>
              </div>

              {/* MORNING DISPATCHES */}
              <div className="p-3 flex items-center justify-between font-mono text-[11px]">
                <span className="text-zinc-400">{t('endcycle.dawn_intel_label', '3. Dawn Intel Dispatches:', lang)}</span>
                <span className="text-cyan-300">
                  {t('endcycle.dawn_intel_desc', 'New encrypted wire dispatch on Day {nextDay}', lang).replace(
                    '{nextDay}',
                    String(state.day + 1)
                  )}
                </span>
              </div>

              {/* TOMORROW'S DICE POOL */}
              <div className="p-3 flex items-center justify-between font-mono text-[11px]">
                <span className="text-zinc-400">{t('endcycle.dice_pool_label', '4. Fresh Daily Dice Pool:', lang)}</span>
                <span className="text-emerald-400 font-bold">
                  {t('endcycle.dice_pool_desc', '{dice} fresh d6 dice (Composure: {comp}%)', lang)
                    .replace('{dice}', String(tomorrowDice))
                    .replace('{comp}', String(state.composure))}
                </span>
              </div>
            </div>
          </div>

          {/* 3. BUTTONS */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-2.5 font-mono text-xs">
            <button
              onClick={() => {
                soundscape.playDieSelect();
                onCancel();
              }}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 transition-colors cursor-pointer"
            >
              {t('endcycle.stay_awake_cancel', 'Stay Awake & Use Dice (Cancel)', lang)}
            </button>

            <button
              onClick={() => {
                soundscape.playOutcome('clean');
                onConfirm();
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold uppercase tracking-wider shadow-lg transition-transform active:scale-[0.98] cursor-pointer"
            >
              {t('endcycle.confirm_sleep', 'Confirm Sleep → Advance to Day {nextDay}', lang).replace(
                '{nextDay}',
                String(state.day + 1)
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
