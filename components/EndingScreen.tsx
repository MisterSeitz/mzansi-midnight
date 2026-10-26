'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { EndingId, FactionId, GameState } from '../types/game';
import { ACT_1_ENDINGS } from '../data/endings';
import { HIGHVELD_ENDINGS } from '../data/story2HighveldEndings';
import { NAMAQUA_ENDINGS } from '../data/story3NamaquaEndings';
import { CAPE_ENDINGS } from '../data/story4CapeEndings';
import { OCTAGON_ENDINGS } from '../data/story5OctagonEndings';
import { SupportedLanguage } from '../types/settings';
import { t, getLocalizedEnding, getLocalizedFactionName } from '../engine/i18n';
import { recordUnlockedEnding } from '../engine/storage';
import { recordStoryCompletion } from '../engine/campaignStorage';
import { calculateFixerEvaluation } from '../engine/advisor';
import { soundscape } from '../engine/soundscape';

const ENDING_SCENE_ARTWORK_MAP: Record<string, string> = {
  // Story 1 Act 1
  ending_vigilante: '/assets/endings/ending_vigilante.jpg',
  ending_whistleblower: '/assets/endings/ending_whistleblower.jpg',
  ending_kingpin: '/assets/endings/ending_kingpin.jpg',
  ending_captured: '/assets/endings/ending_captured.jpg',
  // Story 1 Act 2
  ending_act2_reckoning: '/assets/endings/ending_act2_reckoning.jpg',
  ending_act2_revolution: '/assets/endings/ending_act2_reckoning.jpg',
  ending_act2_syndicate_state: '/assets/endings/ending_kingpin.jpg',
  ending_act2_vanished: '/assets/endings/ending_captured.jpg',
  // Story 2 Highveld
  ending_highveld_siu_vindication: '/assets/endings/ending_highveld_vindication.jpg',
  ending_highveld_red_blackout: '/assets/cutscenes/climax_kendon.jpg',
  ending_highveld_arbitrage_partner: '/assets/endings/ending_kingpin.jpg',
  ending_highveld_shaft_collapse: '/assets/endings/ending_captured.jpg',
  // Story 3 Namaqua
  ending_namaqua_naval_raid: '/assets/endings/ending_namaqua_rebellion.jpg',
  ending_namaqua_divers_rebellion: '/assets/endings/ending_namaqua_rebellion.jpg',
  ending_namaqua_diamond_flight: '/assets/cutscenes/climax_namaqua.jpg',
  ending_namaqua_desert_dune_grave: '/assets/endings/ending_captured.jpg',
  // Story 4 Cape
  ending_cape_sovereign_seizure: '/assets/endings/ending_cape_seizure.jpg',
  ending_cape_gang_truce: '/assets/cutscenes/climax_cape.jpg',
  ending_cape_winelands_audit: '/assets/endings/ending_cape_seizure.jpg',
  ending_cape_shadow_execution: '/assets/endings/ending_captured.jpg',
  // Story 5 Octagon
  ending_octagon_constitutional_reckoning: '/assets/endings/ending_octagon_reckoning.jpg',
  ending_octagon_peoples_revolution: '/assets/endings/ending_octagon_reckoning.jpg',
  ending_octagon_shadow_director: '/assets/cutscenes/climax_octagon.jpg',
  ending_octagon_balkanized_republic: '/assets/cutscenes/climax_kendon.jpg',
  ending_octagon_vanished_watchers: '/assets/cutscenes/climax_octagon.jpg',
};

const STORY_FACTIONS: Record<string, FactionId[]> = {
  story_1_ethekwini: ['abasanta', 'city_hall', 'saps_trt', 'street_syndicate', 'hawks'],
  story_2_highveld: ['megawatt_cartel', 'sandton_arbitrage', 'reef_zamazamas', 'siu_clean_hands', 'red_guard_populists'],
  story_3_namaqua: ['aegis_marine', 'artisanal_divers', 'kalahari_runners', 'namaqua_command', 'namib_syndicate'],
  story_4_cape: ['long_street_racket', 'cape_gang_federation', 'winelands_club', 'agu_renegades', 'dockers_union'],
  story_5_octagon: ['united_hawks_taskforce', 'the_sovereign_octagon', 'constitutional_court_guard', 'national_grid_command', 'people_resistance_front'],
};

type EndingPhase = 'scene' | 'aftermath' | 'fixer';

export const EndingScreen: React.FC<{
  state: GameState;
  endingId: EndingId;
  lang?: SupportedLanguage;
  onContinueToAct2?: (endingId: EndingId) => void;
  onStartNewGamePlus?: () => void;
  onRestart: () => void;
}> = ({
  state,
  endingId,
  lang = 'en',
  onContinueToAct2,
  onStartNewGamePlus,
  onRestart,
}) => {
  const [phase, setPhase] = useState<EndingPhase>('scene');
  const isOctagon = state.storyId === 'story_5_octagon';
  const isCape = state.storyId === 'story_4_cape';
  const isNamaqua = state.storyId === 'story_3_namaqua';
  const isHighveld = state.storyId === 'story_2_highveld';

  const rawEnding = isOctagon
    ? OCTAGON_ENDINGS[endingId] || ACT_1_ENDINGS[endingId]
    : isCape
    ? CAPE_ENDINGS[endingId] || ACT_1_ENDINGS[endingId]
    : isNamaqua
    ? NAMAQUA_ENDINGS[endingId] || ACT_1_ENDINGS[endingId]
    : isHighveld
    ? HIGHVELD_ENDINGS[endingId] || ACT_1_ENDINGS[endingId]
    : ACT_1_ENDINGS[endingId] || HIGHVELD_ENDINGS[endingId];

  const ending = getLocalizedEnding(rawEnding, lang);
  const evaluation = calculateFixerEvaluation(state, endingId);
  const artwork = ENDING_SCENE_ARTWORK_MAP[endingId] || '/assets/endings/ending_vigilante.jpg';

  const canContinueToAct2 =
    Boolean(onContinueToAct2) &&
    (endingId === 'ending_vigilante' ||
      endingId === 'ending_whistleblower' ||
      endingId === 'ending_kingpin');
  const isAct2Ending = endingId.startsWith('ending_act2_');
  const canNewGamePlus =
    Boolean(onStartNewGamePlus) &&
    (isAct2Ending || isHighveld || isNamaqua || isCape || isOctagon) &&
    endingId !== 'ending_act2_vanished' &&
    endingId !== 'ending_highveld_shaft_collapse' &&
    endingId !== 'ending_namaqua_desert_dune_grave' &&
    endingId !== 'ending_cape_shadow_execution' &&
    endingId !== 'ending_octagon_balkanized_republic';

  useEffect(() => {
    recordUnlockedEnding(endingId, state);
    const sId = state.storyId || 'story_1_ethekwini';
    recordStoryCompletion(sId, endingId);
    soundscape.playCutsceneStinger('triumph');
  }, [endingId, state]);

  const themeClasses = {
    amber: {
      border: 'border-amber-500/80',
      banner: 'bg-amber-950/60 border-amber-800 text-amber-300',
      accentText: 'text-amber-400',
      tabActive: 'bg-amber-500 text-slate-950 font-bold',
      cardBorder: 'border-amber-800/50 bg-amber-950/15',
    },
    cyan: {
      border: 'border-cyan-500/80',
      banner: 'bg-cyan-950/60 border-cyan-800 text-cyan-300',
      accentText: 'text-cyan-400',
      tabActive: 'bg-cyan-400 text-slate-950 font-bold',
      cardBorder: 'border-cyan-800/50 bg-cyan-950/15',
    },
    purple: {
      border: 'border-purple-500/80',
      banner: 'bg-purple-950/60 border-purple-800 text-purple-300',
      accentText: 'text-purple-400',
      tabActive: 'bg-purple-400 text-slate-950 font-bold',
      cardBorder: 'border-purple-800/50 bg-purple-950/15',
    },
    red: {
      border: 'border-red-600/80',
      banner: 'bg-red-950/60 border-red-800 text-red-300',
      accentText: 'text-red-400',
      tabActive: 'bg-red-500 text-slate-950 font-bold',
      cardBorder: 'border-red-800/50 bg-red-950/15',
    },
  }[ending.accentColor as 'amber' | 'cyan' | 'purple' | 'red'] ?? {
    border: 'border-amber-500/80',
    banner: 'bg-amber-950/60 border-amber-800 text-amber-300',
    accentText: 'text-amber-400',
    tabActive: 'bg-amber-500 text-slate-950 font-bold',
    cardBorder: 'border-amber-800/50 bg-amber-950/15',
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl overflow-y-auto flex items-center justify-center p-2 sm:p-4 md:p-6 select-none font-sans">
      <div
        className={`w-full max-w-5xl my-auto rounded-2xl border-2 bg-zinc-950 shadow-2xl overflow-hidden flex flex-col ${themeClasses.border}`}
      >
        {/* TOP DOSSIER BANNER */}
        <div
          className={`px-4 sm:px-6 py-3 border-b flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] sm:text-xs uppercase tracking-widest ${themeClasses.banner}`}
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>
              {isOctagon
                ? 'STORY 5 NATIONAL FINALE'
                : isCape
                ? 'STORY 4 GRAND FINALE'
                : isNamaqua
                ? 'STORY 3 GRAND FINALE'
                : isHighveld
                ? 'STORY 2 GRAND FINALE'
                : isAct2Ending
                ? 'ACT 2 GRAND FINALE'
                : 'ACT 1 FINALE'}{' '}
              // {ending.pathLabel}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-emerald-950/70 border border-emerald-600/60 text-emerald-300 text-[10px]">
              ✓ ARCHIVED IN GALLERY
            </span>
            <span className="text-zinc-400 hidden sm:inline">
              CYCLE {state.day}
            </span>
          </div>
        </div>

        {/* PHASE TAB SELECTOR */}
        <div className="flex border-b border-zinc-800/80 bg-zinc-900/60 font-mono text-xs">
          <button
            onClick={() => {
              soundscape.playDieSelect();
              setPhase('scene');
            }}
            className={`flex-1 py-3 px-4 text-center border-r border-zinc-800 uppercase tracking-wider transition-colors cursor-pointer ${
              phase === 'scene'
                ? themeClasses.tabActive
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
            }`}
          >
            01 // {t('ending.tab_scene', 'CINEMATIC SCENE', lang)}
          </button>
          <button
            onClick={() => {
              soundscape.playDieSelect();
              setPhase('aftermath');
            }}
            className={`flex-1 py-3 px-4 text-center border-r border-zinc-800 uppercase tracking-wider transition-colors cursor-pointer ${
              phase === 'aftermath'
                ? themeClasses.tabActive
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
            }`}
          >
            02 // {t('ending.tab_aftermath', 'DISTRICT AFTERMATH', lang)}
          </button>
          <button
            onClick={() => {
              soundscape.playDieSelect();
              setPhase('fixer');
            }}
            className={`flex-1 py-3 px-4 text-center uppercase tracking-wider transition-colors cursor-pointer ${
              phase === 'fixer'
                ? themeClasses.tabActive
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
            }`}
          >
            03 // {t('ending.tab_fixer', 'FIXER EVALUATION', lang)}
          </button>
        </div>

        {/* MAIN BODY CONTENT BASED ON PHASE */}
        <div className="p-4 sm:p-6 lg:p-8 space-y-6">
          {/* PHASE 1: CINEMATIC SCENE & NARRATIVE */}
          {phase === 'scene' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              {/* WIDESCREEN 16:9 CINEMATIC SCENE ARTWORK */}
              <div className="relative w-full aspect-video sm:aspect-[21/9] rounded-xl overflow-hidden border border-zinc-800 shadow-2xl bg-black">
                <Image
                  src={artwork}
                  alt={ending.title}
                  fill
                  className="object-cover object-center filter brightness-95 contrast-105 transform hover:scale-105 transition-transform duration-7000"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/30 to-black/70 pointer-events-none" />

                {/* Subtitle & Title overlay at base of artwork */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-10">
                  <div
                    className={`text-[11px] sm:text-xs font-mono uppercase tracking-widest ${themeClasses.accentText} drop-shadow`}
                  >
                    {ending.subtitle}
                  </div>
                  <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight drop-shadow-lg mt-1">
                    {ending.title}
                  </h1>
                </div>
              </div>

              {/* SUMMARY QUOTE */}
              <blockquote className="text-sm sm:text-base italic text-zinc-200 border-l-4 border-amber-500/80 pl-4 py-1 bg-zinc-900/40 rounded-r-lg">
                {ending.summaryQuote}
              </blockquote>

              {/* NARRATIVE EPILOGUE PARAGRAPHS */}
              <div className="space-y-3.5 text-xs sm:text-sm leading-relaxed text-zinc-200 bg-zinc-900/50 p-4 sm:p-6 rounded-xl border border-zinc-800/80">
                {ending.epilogueParagraphs.map((para: string, idx: number) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </div>
          )}

          {/* PHASE 2: DISTRICT AFTERMATH */}
          {phase === 'aftermath' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3">
                  {t('ending.district_power_shift', 'District Power Shift & Systemic Fallout', lang)}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {ending.cityAftermath.map(
                    (item: { heading: string; detail: string }, idx: number) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-xl border ${themeClasses.cardBorder}`}
                      >
                        <h3 className={`text-sm font-semibold ${themeClasses.accentText}`}>
                          {item.heading}
                        </h3>
                        <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
                          {item.detail}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* FINAL STATS & FACTION LEDGER */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800 font-mono text-xs space-y-2">
                  <div className="text-zinc-400 uppercase font-bold border-b border-zinc-800 pb-1.5">
                    {t('ending.final_ledger', 'Final Fixer Ledger', lang)}
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Closing Cash:</span>
                    <span className="text-emerald-400 font-bold">
                      R{state.cash.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Final Composure:</span>
                    <span className="text-cyan-400 font-bold">{state.composure}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Cycles Survived:</span>
                    <span className="text-zinc-200">{state.day} Days</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800 font-mono text-xs space-y-1.5">
                  <div className="text-zinc-400 uppercase font-bold border-b border-zinc-800 pb-1.5 mb-1">
                    {t('ending.faction_standing', 'Final Faction Standing', lang)}
                  </div>
                  {((state.storyId && STORY_FACTIONS[state.storyId]) ||
                    STORY_FACTIONS.story_1_ethekwini).map((fid) => {
                    const rep = state.factionRep[fid] ?? 0;
                    return (
                      <div key={fid} className="flex justify-between">
                        <span className="text-zinc-400">
                          {getLocalizedFactionName(fid, lang)}:
                        </span>
                        <span
                          className={
                            rep > 0
                              ? 'text-emerald-400 font-semibold'
                              : rep < 0
                              ? 'text-red-400 font-semibold'
                              : 'text-zinc-400'
                          }
                        >
                          {rep > 0 ? `+${rep}` : rep}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* PHASE 3: FIXER EVALUATION & LEADERBOARD */}
          {phase === 'fixer' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* SYNDICATE BENCHMARK LEADERBOARD */}
                <div className="p-4 sm:p-5 rounded-xl bg-zinc-900/80 border border-amber-500/30 font-mono text-xs space-y-3">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                    <div>
                      <div className="text-[10px] text-amber-400 uppercase">
                        {t('advisor.registry_title', 'eThekwini Fixer Registry', lang)}
                      </div>
                      <div className="text-base font-bold text-white">
                        {evaluation.rankTitle}
                      </div>
                    </div>
                    <span className="px-2 py-1 rounded bg-amber-500/20 border border-amber-500/50 text-amber-300 text-[11px] font-bold">
                      Top {100 - evaluation.globalPercentile}% Operative
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    {evaluation.leaderboard.map((row, idx) => (
                      <div
                        key={row.name}
                        className={`flex items-center justify-between px-2.5 py-1.5 rounded ${
                          row.isPlayer
                            ? 'bg-amber-500/20 border border-amber-500/50 text-amber-200 font-semibold'
                            : 'bg-zinc-950/60 text-zinc-400'
                        }`}
                      >
                        <span className="truncate">
                          #{idx + 1} {row.name}
                        </span>
                        <span className="shrink-0 font-mono">
                          {row.score.toLocaleString()} pts
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* UNLOCKED RUN COMMENDATIONS */}
                <div className="p-4 sm:p-5 rounded-xl bg-zinc-900/80 border border-zinc-800 font-mono text-xs space-y-3">
                  <div className="text-[10px] text-cyan-400 uppercase border-b border-zinc-800 pb-2 font-bold">
                    {t('advisor.commendations_title', 'Tactical Commendations & Badges', lang)} (
                    {evaluation.commendations.filter((c) => c.unlocked).length}/
                    {evaluation.commendations.length})
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto">
                    {evaluation.commendations.map((comm) => (
                      <div
                        key={comm.id}
                        className={`p-2.5 rounded-lg border ${
                          comm.unlocked
                            ? 'bg-emerald-950/40 border-emerald-600/50 text-emerald-200'
                            : 'bg-zinc-950/50 border-zinc-800/80 text-zinc-500'
                        }`}
                      >
                        <div className="text-[11px] font-semibold flex items-center justify-between">
                          <span>{comm.title}</span>
                          <span>{comm.unlocked ? '★' : '—'}</span>
                        </div>
                        <div className="text-[10px] opacity-80 mt-1 leading-snug">
                          {comm.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ACT 2 HOOK & CONTINUE / NEW GAME+ / RESTART BUTTONS */}
          <div className="pt-4 border-t border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="text-xs font-mono text-zinc-300 max-w-xl">{ending.act2Hook}</p>
              <div className="flex items-center gap-2 pt-1">
                {phase !== 'scene' && (
                  <button
                    onClick={() => setPhase(phase === 'fixer' ? 'aftermath' : 'scene')}
                    className="px-3 py-1 rounded bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-400 hover:text-white cursor-pointer"
                  >
                    ◄ {t('ui.previous_phase', 'Previous', lang)}
                  </button>
                )}
                {phase !== 'fixer' && (
                  <button
                    onClick={() => setPhase(phase === 'scene' ? 'aftermath' : 'fixer')}
                    className="px-3 py-1 rounded bg-zinc-800 border border-zinc-700 text-[11px] font-mono text-zinc-200 hover:text-white cursor-pointer"
                  >
                    {t('ui.next_phase', 'Next Section ►', lang)}
                  </button>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              {canContinueToAct2 && onContinueToAct2 && (
                <button
                  onClick={() => onContinueToAct2(endingId)}
                  className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono text-xs font-semibold uppercase tracking-wider shadow-[0_0_25px_rgba(16,185,129,0.3)] transition-all cursor-pointer"
                >
                  {t('ending.continue_act2', 'Continue to Act 2: The Commission →', lang)}
                </button>
              )}
              {canNewGamePlus && onStartNewGamePlus && (
                <button
                  onClick={onStartNewGamePlus}
                  className="px-5 py-3 rounded-xl bg-purple-500 hover:bg-purple-400 text-slate-950 font-mono text-xs font-semibold uppercase tracking-wider shadow-[0_0_25px_rgba(168,85,247,0.3)] transition-all cursor-pointer"
                >
                  {t('ending.new_game_plus', 'New Game+ (Keep Gear & +R1,000) →', lang)}
                </button>
              )}
              <button
                onClick={onRestart}
                className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono text-xs font-semibold uppercase tracking-wider shrink-0 transition-colors cursor-pointer"
              >
                {t('ending.new_timeline', 'New Timeline / Main Menu →', lang)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
