import React from 'react';
import { GameState } from '../types/game';
import { SupportedLanguage } from '../types/settings';
import { t, getLocalizedRecommendation } from '../engine/i18n';
import {
  getTacticalRecommendation,
  TacticalRecommendation,
} from '../engine/advisor';
import { soundscape } from '../engine/soundscape';

export const ObjectiveTracker: React.FC<{
  state: GameState;
  selectedDieId: string | null;
  lang?: SupportedLanguage;
  onOpenGuide: () => void;
  onFollowRecommendation?: (rec: TacticalRecommendation) => void;
}> = ({ state, selectedDieId, lang = 'en', onOpenGuide, onFollowRecommendation }) => {
  const rawRec = getTacticalRecommendation(state, selectedDieId);
  const rec = getLocalizedRecommendation(rawRec, lang);
  const isCape = state.storyId === 'story_4_cape';
  const isNamaqua = state.storyId === 'story_3_namaqua';
  const isHighveld = state.storyId === 'story_2_highveld';
  const isAct2 = state.act === 2;

  const steps = isCape
    ? [
        t('tracker.cape.step1', '1. Break Protection Racket', lang),
        t('tracker.cape.step2', '2. Decrypt Red Cipher', lang),
        t('tracker.cape.step3', '3. Pier 109 Finale', lang),
      ]
    : isNamaqua
    ? [
        t('tracker.namaqua.step1', '1. Survey Submarine Canyon', lang),
        t('tracker.namaqua.step2', '2. Intercept Arms Consignment', lang),
        t('tracker.namaqua.step3', '3. Orange River Climax', lang),
      ]
    : isHighveld
    ? [
        t('tracker.highveld.step1', '1. Crack Midas Decrypt', lang),
        t('tracker.highveld.step2', '2. Build SIU Docket', lang),
        t('tracker.highveld.step3', '3. Kendon Grid Climax', lang),
      ]
    : isAct2
    ? [
        t('tracker.act2.step1', '1. Trace Trust / GPS', lang),
        t('tracker.act2.step2', '2. Unlock Hangar 7', lang),
        t('tracker.act2.step3', '3. Tarmac Finale', lang),
      ]
    : [
        t('tracker.act1.step1', '1. Decode Docket / Phone', lang),
        t('tracker.act1.step2', '2. Unlock Pier 2', lang),
        t('tracker.act1.step3', '3. Berth 14 Finale', lang),
      ];

  return (
    <div className="px-3.5 py-2.5 rounded-xl bg-zinc-900/95 border border-zinc-800 flex flex-col gap-2 shrink-0">
      {/* TOP ROW: 3-STEP CAMPAIGN PROGRESS INDICATOR */}
      <div className="flex items-center justify-between gap-2 border-b border-zinc-800/80 pb-1.5 text-[10px] font-mono">
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto">
          {steps.map((label, idx) => {
            const stepNum = (idx + 1) as 1 | 2 | 3;
            const isCompleted = rec.campaignStep > stepNum;
            const isCurrent = rec.campaignStep === stepNum;
            return (
              <React.Fragment key={label}>
                <span
                  className={`px-2 py-0.5 rounded border whitespace-nowrap ${
                    isCompleted
                      ? 'bg-emerald-950/60 border-emerald-600/50 text-emerald-300'
                      : isCurrent
                      ? 'bg-amber-500/20 border-amber-400/60 text-amber-200 font-semibold'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-500'
                  }`}
                >
                  {isCompleted ? `✓ ${label}` : label}
                </span>
                {idx < steps.length - 1 && (
                  <span className="text-zinc-600">&rarr;</span>
                )}
              </React.Fragment>
            );
          })}
        </div>

        <button
          onClick={() => {
            soundscape.playDieSelect();
            onOpenGuide();
          }}
          className="px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-[10px] font-mono text-amber-300 shrink-0 transition-colors cursor-pointer"
        >
          {t('tracker.field_rules', '? Field Rules', lang)}
        </button>
      </div>

      {/* BOTTOM ROW: LIVE TACTICAL RECOMMENDATION & ONE-CLICK JUMP */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-start sm:items-center gap-2.5 min-w-0">
          <span
            className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider border shrink-0 ${rec.badgeStyle}`}
          >
            {rec.badgeLabel}
          </span>
          <div className="min-w-0">
            <div className="text-xs font-medium text-zinc-100 truncate">
              {rec.headline}
            </div>
            <div className="text-[11px] text-zinc-400 line-clamp-2 sm:truncate">
              {rec.hint}
            </div>
          </div>
        </div>

        {rec.targetNodeId && onFollowRecommendation && (
          <button
            onClick={() => {
              soundscape.playDieSelect();
              onFollowRecommendation(rec);
            }}
            className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono text-[11px] font-semibold uppercase tracking-wider shrink-0 transition-colors cursor-pointer shadow-sm"
          >
            {rec.actionButtonLabel || t('tracker.show_move', 'Show Move →', lang)}
          </button>
        )}
      </div>
    </div>
  );
};
