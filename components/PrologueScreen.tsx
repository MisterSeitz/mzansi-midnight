'use client';

import React, { useState } from 'react';
import { GameState } from '../types/game';
import { CHARACTER_BACKGROUNDS, PROLOGUE_NODES } from '../data/prologueScript';
import {
  HIGHVELD_CHARACTER_BACKGROUNDS,
  HIGHVELD_PROLOGUE_NODES,
} from '../data/story2HighveldPrologue';
import {
  NAMAQUA_CHARACTER_BACKGROUNDS,
  NAMAQUA_PROLOGUE_NODES,
} from '../data/story3NamaquaPrologue';
import {
  CAPE_CHARACTER_BACKGROUNDS,
  CAPE_PROLOGUE_NODES,
} from '../data/story4CapePrologue';
import {
  OCTAGON_CHARACTER_BACKGROUNDS,
  OCTAGON_PROLOGUE_NODES,
} from '../data/story5OctagonPrologue';
import { CharacterBackground, DialogueOption } from '../types/prologue';
import { soundscape } from '../engine/soundscape';

import { SupportedLanguage } from '../types/settings';
import {
  t,
  getLocalizedPrologueNode,
  getLocalizedBackground,
  getLocalizedLogEntry,
  getLocalizedStatName,
} from '../engine/i18n';

export const PrologueScreen: React.FC<{
  initialState: GameState;
  lang?: SupportedLanguage;
  onCompletePrologue: (configuredState: GameState) => void;
}> = ({ initialState, lang = 'en', onCompletePrologue }) => {
  const isOctagon = initialState.storyId === 'story_5_octagon';
  const isCape = initialState.storyId === 'story_4_cape';
  const isNamaqua = initialState.storyId === 'story_3_namaqua';
  const isHighveld = initialState.storyId === 'story_2_highveld';
  const allNodes = isOctagon
    ? OCTAGON_PROLOGUE_NODES
    : isCape
    ? CAPE_PROLOGUE_NODES
    : isNamaqua
    ? NAMAQUA_PROLOGUE_NODES
    : isHighveld
    ? HIGHVELD_PROLOGUE_NODES
    : PROLOGUE_NODES;
  const allBackgrounds = isOctagon
    ? OCTAGON_CHARACTER_BACKGROUNDS
    : isCape
    ? CAPE_CHARACTER_BACKGROUNDS
    : isNamaqua
    ? NAMAQUA_CHARACTER_BACKGROUNDS
    : isHighveld
    ? HIGHVELD_CHARACTER_BACKGROUNDS
    : CHARACTER_BACKGROUNDS;

  const [sceneId, setSceneId] = useState<string>(
    isOctagon
      ? 'prologue_octagon_intro'
      : isCape
      ? 'prologue_cape_intro'
      : isNamaqua
      ? 'namaqua_scene_1_intro'
      : isHighveld
      ? 'highveld_scene_1_intro'
      : 'scene_1_wakeup'
  );
  const [workingState, setWorkingState] = useState<GameState>(initialState);
  const [selectedBg, setSelectedBg] = useState<CharacterBackground['id']>(
    isOctagon
      ? 'taskforce_commander_nandi'
      : isCape
      ? 'agu_ballistics_detective'
      : isNamaqua
      ? 'deep_sea_diver'
      : isHighveld
      ? 'siu_whistleblower'
      : 'forensic_hawk'
  );
  const [lastFeedback, setLastFeedback] = useState<string | null>(null);

  const rawScene = allNodes[sceneId] || allNodes[Object.keys(allNodes)[0]];
  const currentScene = getLocalizedPrologueNode(rawScene, lang);

  const handleOptionSelect = (option: DialogueOption) => {
    soundscape.playDieSelect();
    const nextState: GameState = structuredClone(workingState);

    // 1. Apply Character Background if chosen on Beat 1
    if (option.setBackgroundId) {
      const bg = allBackgrounds[option.setBackgroundId];
      if (bg) {
        nextState.stats = { ...bg.stats };
        nextState.cash = bg.startingCash;
        nextState.factionRep[bg.factionBonus.factionId] =
          (nextState.factionRep[bg.factionBonus.factionId] ?? 0) +
          bg.factionBonus.delta;
        nextState.activeLog.unshift(
          `Background Selected: ${bg.title} (${bg.formerUnit})`
        );
      }
    }

    // 2. Apply Composure, Cash, and Clock shifts from dialogue choices
    if (option.composureDelta) {
      nextState.composure = Math.min(
        100,
        Math.max(0, nextState.composure + option.composureDelta)
      );
    }
    if (option.cashDelta) {
      nextState.cash = Math.max(0, nextState.cash + option.cashDelta);
    }
    if (option.clockDelta && nextState.clocks[option.clockDelta.clockId]) {
      const targetClock = nextState.clocks[option.clockDelta.clockId];
      targetClock.current = Math.min(
        targetClock.max,
        Math.max(0, targetClock.current + option.clockDelta.delta)
      );
    }
    if (option.responseLog) {
      nextState.activeLog.unshift(option.responseLog);
      setLastFeedback(option.responseLog);
    } else {
      setLastFeedback(null);
    }

    // 3. Check if Prologue is finished
    if (
      option.nextSceneNodeId === 'COMPLETE_PROLOGUE' ||
      option.nextSceneNodeId === 'END_PROLOGUE' ||
      option.nextSceneNodeId === 'done'
    ) {
      onCompletePrologue(nextState);
      return;
    }

    setWorkingState(nextState);
    setSceneId(option.nextSceneNodeId);
  };

  const speakerAvatar = isOctagon
    ? currentScene.speaker?.includes('Sindi')
      ? '/assets/characters/sindi.jpg'
      : currentScene.speaker?.includes('Phumzile')
      ? '/assets/characters/phumzile.jpg'
      : '/assets/characters/taskforce.jpg'
    : isCape
    ? currentScene.speaker?.includes('Warren')
      ? '/assets/characters/warren.jpg'
      : currentScene.speaker?.includes('Zack')
      ? '/assets/characters/zack.jpg'
      : '/assets/characters/leila.jpg'
    : isNamaqua
    ? currentScene.speaker?.includes('Bettie')
      ? '/assets/characters/bettie.jpg'
      : currentScene.speaker?.includes('Swartbooi')
      ? '/assets/characters/swartbooi.jpg'
      : '/assets/characters/giepie.jpg'
    : isHighveld
    ? currentScene.speaker?.includes('Khumalo')
      ? '/assets/characters/khumalo.jpg'
      : currentScene.speaker?.includes('Vusi')
      ? '/assets/characters/vusi.jpg'
      : '/assets/characters/bra_k.jpg'
    : '/assets/characters/nandi.jpg';

  return (
    <div className="min-h-[100dvh] w-full bg-slate-950 text-zinc-100 flex items-center justify-center p-3 sm:p-6 select-none font-sans overflow-y-auto">
      <div className="w-full max-w-4xl my-auto rounded-2xl border border-zinc-800 bg-zinc-950/90 shadow-2xl overflow-hidden">
        {/* TOP STATUS HEADER */}
        <div className="px-4 sm:px-6 py-3 bg-zinc-900/80 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-1 text-[10px] sm:text-xs font-mono">
          <span className="text-amber-400 tracking-widest uppercase">
            {isOctagon
              ? t('prologue.octagon_header', 'PROLOGUE // CASE FILE #000-NAT (THE SOVEREIGN OCTAGON)', lang)
              : isCape
              ? t('prologue.cape_header', 'PROLOGUE // CASE FILE #990-WC (CAPE-NOCTURNE)', lang)
              : isNamaqua
              ? t('prologue.namaqua_header', 'PROLOGUE // CASE FILE #204-NC (NAMAQUA-DIAMOND)', lang)
              : isHighveld
              ? t('prologue.highveld_header', 'PROLOGUE // CASE FILE #711-GP (HIGHVELD-CHROME)', lang)
              : t('prologue.header', 'PROLOGUE // THE GHOST DOCKET', lang)}
          </span>
          <span className="text-zinc-400">{currentScene.timestamp}</span>
        </div>

        <div className="p-4 sm:p-6 lg:p-8 space-y-5 sm:space-y-6">
          {/* SPEAKER PORTRAIT & BADGE IF PRESENT */}
          {currentScene.speaker && (
            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 w-fit">
              <img
                src={speakerAvatar}
                alt={currentScene.speaker}
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg object-cover border border-amber-500/50"
              />
              <div className="flex flex-col text-xs font-mono pr-2">
                <span className="text-amber-400 text-xs sm:text-sm font-medium">
                  {currentScene.speaker}
                </span>
                <span className="text-zinc-400 text-[11px]">{currentScene.speakerRole}</span>
              </div>
            </div>
          )}

          {/* PREVIOUS ACTION FEEDBACK BANNER */}
          {lastFeedback && (
            <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-700/50 text-xs font-mono text-amber-300">
              &gt; {getLocalizedLogEntry(lastFeedback, lang)}
            </div>
          )}

          {/* NARRATIVE PARAGRAPHS */}
          <div className="space-y-3.5 sm:space-y-4 text-sm sm:text-base leading-relaxed text-zinc-200">
            {currentScene.paragraphs.map((text, idx) => (
              <p key={idx}>{text}</p>
            ))}
          </div>

          {/* ARCHETYPE CARDS WITH GENERATED NOIR ART (SHOWN ON BEAT 1) */}
          {currentScene.isBackgroundSelect && (
            <div className="space-y-4 pt-2">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.values(allBackgrounds).map((bg) => {
                  const locBg = getLocalizedBackground(bg, lang);
                  const isSelected = selectedBg === bg.id;
                  const matchingOpt = currentScene.options.find(
                    (o) => o.setBackgroundId === bg.id
                  );

                  return (
                    <div
                      key={bg.id}
                      onClick={() => {
                        if (isSelected && matchingOpt) {
                          handleOptionSelect(matchingOpt);
                        } else {
                          soundscape.playDieSelect();
                          setSelectedBg(bg.id);
                        }
                      }}
                      className={`rounded-xl border transition-all cursor-pointer flex flex-col justify-between overflow-hidden relative group ${
                        isSelected
                          ? 'border-amber-400 bg-zinc-900 shadow-[0_0_25px_rgba(251,191,36,0.22)] ring-1 ring-amber-400/40'
                          : 'border-zinc-800 bg-zinc-900/40 hover:border-zinc-700 hover:bg-zinc-900/60'
                      }`}
                    >
                      <div>
                        <div className="relative h-36 w-full overflow-hidden bg-zinc-950">
                          <img
                            src={`/assets/backgrounds/${bg.id}.jpg`}
                            alt={locBg.title}
                            className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                          <div className="absolute bottom-2 left-3 right-3 text-[10px] font-mono uppercase text-amber-400 font-semibold truncate">
                            {locBg.tagline || bg.formerUnit}
                          </div>
                          {isSelected && (
                            <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-amber-500 text-zinc-950 text-[10px] font-mono font-bold tracking-wider shadow">
                              ACTIVE
                            </div>
                          )}
                        </div>
                        <div className="p-4 pt-2.5">
                          <h3 className="text-base font-medium text-white group-hover:text-amber-300 transition-colors">
                            {locBg.title}
                          </h3>
                          <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed line-clamp-4">
                            {locBg.description}
                          </p>
                        </div>
                      </div>

                      <div>
                        <div className="px-4 pb-3 pt-2.5 border-t border-zinc-800/80 space-y-1 text-[11px] font-mono">
                          <div className="flex justify-between text-zinc-300">
                            <span>STRT: {bg.stats.street}</span>
                            <span>DCKT: {bg.stats.dockets}</span>
                            <span>WIRE: {bg.stats.wire}</span>
                            <span>INFL: {bg.stats.influence}</span>
                          </div>
                          <div className="text-emerald-400 pt-0.5">
                            Starting Cash: R{bg.startingCash}
                          </div>
                        </div>

                        {/* EXPLICIT SELECT / CONFIRM BUTTON PER CARD */}
                        <div className="p-3 pt-0">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (isSelected && matchingOpt) {
                                handleOptionSelect(matchingOpt);
                              } else {
                                soundscape.playDieSelect();
                                setSelectedBg(bg.id);
                              }
                            }}
                            className={`w-full py-2.5 px-3 rounded-lg font-mono text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-zinc-950 shadow-md shadow-amber-500/30 ring-1 ring-amber-300'
                                : 'bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-zinc-700/60'
                            }`}
                          >
                            {isSelected ? (
                              <>
                                <span>✓</span>
                                <span>
                                  {t('prologue.select_this_bg', 'Select This Background', lang)}: {locBg.title}
                                </span>
                                <span>&rarr;</span>
                              </>
                            ) : (
                              <>
                                <span>{t('prologue.choose_bg', 'Select', lang)} {locBg.title}</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* DEDICATED PRIMARY CONFIRMATION BANNER */}
              {selectedBg && allBackgrounds[selectedBg] && (() => {
                const bgObj = allBackgrounds[selectedBg]!;
                const locBg = getLocalizedBackground(bgObj, lang);
                return (
                  <div className="p-4 sm:p-5 rounded-xl border border-amber-500/60 bg-gradient-to-r from-amber-950/40 via-zinc-900 to-amber-950/25 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in duration-200">
                    <div className="flex items-center gap-3.5 w-full sm:w-auto">
                      <div className="w-12 h-12 rounded-lg overflow-hidden border border-amber-400/60 shrink-0 shadow-md">
                        <img
                          src={`/assets/backgrounds/${selectedBg}.jpg`}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-0.5 text-left">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                          <span>{t('prologue.chosen_path', 'Selected Path', lang)}</span>
                          <span>//</span>
                          <span className="text-zinc-400 truncate max-w-[200px] sm:max-w-none">
                            {locBg.formerUnit || bgObj.formerUnit}
                          </span>
                        </div>
                        <div className="text-sm sm:text-base font-semibold text-white">
                          {locBg.title}
                        </div>
                        <div className="text-xs text-zinc-400 line-clamp-1">
                          {locBg.tagline}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        const opt = currentScene.options.find(
                          (o) => o.setBackgroundId === selectedBg
                        );
                        if (opt) handleOptionSelect(opt);
                      }}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-zinc-950 font-mono font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.02] shrink-0"
                    >
                      <span>
                        {t('prologue.select_this_bg', 'Select This Background', lang)}: {locBg.title}
                      </span>
                      <span className="text-base leading-none">&rarr;</span>
                    </button>
                  </div>
                );
              })()}
            </div>
          )}

          {/* DIALOGUE OPTIONS */}
          <div className="space-y-2.5 pt-4 border-t border-zinc-800/80">
            {currentScene.options.map((opt) => {
              // Check if option requires a stat threshold
              const meetsStat =
                !opt.statCheck ||
                workingState.stats[opt.statCheck.stat] >= opt.statCheck.threshold;

              const isHighlightedBg =
                opt.setBackgroundId && opt.setBackgroundId === selectedBg;

              return (
                <button
                  key={opt.id}
                  disabled={!meetsStat}
                  onClick={() => {
                    if (opt.setBackgroundId) {
                      setSelectedBg(opt.setBackgroundId);
                    }
                    handleOptionSelect(opt);
                  }}
                  className={`w-full text-left px-4 py-3.5 rounded-xl border font-mono text-xs transition-all flex items-center justify-between ${
                    !meetsStat
                      ? 'bg-zinc-950 border-zinc-900 text-zinc-600 cursor-not-allowed'
                      : isHighlightedBg
                      ? 'bg-zinc-900 border-amber-400 text-amber-300 shadow-md shadow-amber-400/10 cursor-pointer'
                      : 'bg-zinc-900 border-zinc-700 hover:border-amber-400 text-zinc-100 cursor-pointer'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {isHighlightedBg && <span className="text-amber-400">✓</span>}
                    <span>&rarr; {opt.label}</span>
                  </span>
                  {!meetsStat && opt.statCheck && (
                    <span className="text-[10px] text-red-400 uppercase">
                      {t('ui.requires', 'Requires', lang)} {getLocalizedStatName(opt.statCheck.stat, lang).toUpperCase()} +{opt.statCheck.threshold}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
