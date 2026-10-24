import React, { useEffect } from 'react';
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

const FACTION_NAMES: Record<FactionId, string> = {
  abasanta: 'Abasanta Cartel',
  city_hall: 'City Hall Coalition',
  saps_trt: 'SAPS TRT (Mokoena)',
  street_syndicate: 'Queen St. Syndicate',
  hawks: 'DPCI Hawks Holdout',
  megawatt_cartel: 'The Megawatt Cartel',
  sandton_arbitrage: 'Sandton Energy Arbitrage',
  reef_zamazamas: 'The Reef Zama-Zamas',
  siu_clean_hands: 'SIU Clean Hands',
  red_guard_populists: 'Red Guard Populists',
  aegis_marine: 'Aegis-Atlantis Marine Security',
  artisanal_divers: 'Artisanal Shore Divers',
  kalahari_runners: 'Kalahari Desert Runners',
  namaqua_command: 'Namaqua Coastal Command',
  namib_syndicate: 'Namib Diamond Syndicate',
  long_street_racket: 'Long Street Racket',
  cape_gang_federation: 'Cape Gang Federation',
  winelands_club: 'Winelands Capital Club',
  agu_renegades: 'AGU Renegades',
  dockers_union: 'Table Bay Dockers Union',
  united_hawks_taskforce: 'United Hawks Taskforce',
  the_sovereign_octagon: 'The Sovereign Octagon',
  constitutional_court_guard: 'Constitutional Court Guard',
  national_grid_command: 'National Grid Command',
  people_resistance_front: "People's Resistance Front",
};

const STORY_FACTIONS: Record<string, FactionId[]> = {
  story_1_ethekwini: ['abasanta', 'city_hall', 'saps_trt', 'street_syndicate', 'hawks'],
  story_2_highveld: ['megawatt_cartel', 'sandton_arbitrage', 'reef_zamazamas', 'siu_clean_hands', 'red_guard_populists'],
  story_3_namaqua: ['aegis_marine', 'artisanal_divers', 'kalahari_runners', 'namaqua_command', 'namib_syndicate'],
  story_4_cape: ['long_street_racket', 'cape_gang_federation', 'winelands_club', 'agu_renegades', 'dockers_union'],
  story_5_octagon: ['united_hawks_taskforce', 'the_sovereign_octagon', 'constitutional_court_guard', 'national_grid_command', 'people_resistance_front'],
};

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
  }, [endingId, state]);


  const themeClasses = {
    amber: {
      border: 'border-amber-500/80',
      banner: 'bg-amber-950/60 border-amber-800 text-amber-300',
      accentText: 'text-amber-400',
      cardBorder: 'border-amber-800/50 bg-amber-950/15',
    },
    cyan: {
      border: 'border-cyan-500/80',
      banner: 'bg-cyan-950/60 border-cyan-800 text-cyan-300',
      accentText: 'text-cyan-400',
      cardBorder: 'border-cyan-800/50 bg-cyan-950/15',
    },
    purple: {
      border: 'border-purple-500/80',
      banner: 'bg-purple-950/60 border-purple-800 text-purple-300',
      accentText: 'text-purple-400',
      cardBorder: 'border-purple-800/50 bg-purple-950/15',
    },
    red: {
      border: 'border-red-600/80',
      banner: 'bg-red-950/60 border-red-800 text-red-300',
      accentText: 'text-red-400',
      cardBorder: 'border-red-800/50 bg-red-950/15',
    },
  }[ending.accentColor as 'amber' | 'cyan' | 'purple' | 'red'] ?? {
    border: 'border-amber-500/80',
    banner: 'bg-amber-950/60 border-amber-800 text-amber-300',
    accentText: 'text-amber-400',
    cardBorder: 'border-amber-800/50 bg-amber-950/15',
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-lg overflow-y-auto flex items-center justify-center p-3 sm:p-6 select-none font-sans">
      <div
        className={`w-full max-w-4xl my-auto rounded-2xl border-2 bg-zinc-950 shadow-2xl overflow-hidden ${themeClasses.border}`}
      >
        {/* TOP DOSSIER BANNER */}
        <div
          className={`px-4 sm:px-6 py-3 border-b flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] sm:text-xs uppercase tracking-widest ${themeClasses.banner}`}
        >
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
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-emerald-950/70 border border-emerald-600/60 text-emerald-300 text-[10px]">
              ✓ ARCHIVED IN GALLERY
            </span>
            <span>
              CYCLE {state.day} •{' '}
              {isOctagon
                ? 'THE SOVEREIGN OCTAGON'
                : isCape
                ? 'CAPE-NOCTURNE'
                : isNamaqua
                ? 'NAMAQUA-DIAMOND'
                : isHighveld
                ? 'HIGHVELD-COAL'
                : 'ETHEKWINI-GOLD'}
            </span>
          </div>
        </div>

        <div className="p-4 sm:p-6 lg:p-8 space-y-5 sm:space-y-6">
          {/* TITLE & QUOTE */}
          <div>
            <div className={`text-xs font-mono uppercase ${themeClasses.accentText}`}>
              {ending.subtitle}
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-white mt-1">{ending.title}</h1>
            <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm italic text-zinc-300 border-l-2 border-zinc-700 pl-3.5 sm:pl-4">
              {ending.summaryQuote}
            </p>
          </div>

          {/* NARRATIVE EPILOGUE PARAGRAPHS */}
          <div className="space-y-3 text-xs sm:text-sm leading-relaxed text-zinc-200 bg-zinc-900/50 p-4 sm:p-5 rounded-xl border border-zinc-800/80">
            {ending.epilogueParagraphs.map((para: string, idx: number) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          {/* CITY AFTERMATH CARDS */}
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3">
              District Power Shift &amp; Aftermath
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {ending.cityAftermath.map((item: { heading: string; detail: string }, idx: number) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border ${themeClasses.cardBorder}`}
                >
                  <h3 className={`text-sm font-medium ${themeClasses.accentText}`}>
                    {item.heading}
                  </h3>
                  <p className="text-xs text-zinc-300 mt-1.5 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* GLOBAL FIXER PERCENTILE & COMMENDATIONS (ACHIEVEMENTS) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            {/* SYNDICATE BENCHMARK LEADERBOARD */}
            <div className="p-4 rounded-xl bg-zinc-900/80 border border-amber-500/30 font-mono text-xs space-y-2.5">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                <div>
                  <div className="text-[10px] text-amber-400 uppercase">
                    eThekwini Fixer Registry
                  </div>
                  <div className="text-sm font-semibold text-white">
                    {evaluation.rankTitle}
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/50 text-amber-300 text-[10px]">
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
                    <span className="shrink-0">
                      {row.score.toLocaleString()} pts
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* UNLOCKED RUN COMMENDATIONS */}
            <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 font-mono text-xs space-y-2">
              <div className="text-[10px] text-cyan-400 uppercase border-b border-zinc-800 pb-2">
                Tactical Commendations &amp; Badges (
                {evaluation.commendations.filter((c) => c.unlocked).length}/
                {evaluation.commendations.length})
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {evaluation.commendations.map((comm) => (
                  <div
                    key={comm.id}
                    className={`p-2 rounded-lg border ${
                      comm.unlocked
                        ? 'bg-emerald-950/40 border-emerald-600/50 text-emerald-200'
                        : 'bg-zinc-950/50 border-zinc-800/80 text-zinc-500'
                    }`}
                  >
                    <div className="text-[11px] font-semibold flex items-center justify-between">
                      <span>{comm.title}</span>
                      <span>{comm.unlocked ? '★' : '—'}</span>
                    </div>
                    <div className="text-[10px] opacity-80 mt-0.5 leading-snug">
                      {comm.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* FINAL STATS & FACTION LEDGER */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            <div className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800 font-mono text-xs space-y-2">
              <div className="text-zinc-400 uppercase">Final Fixer Ledger</div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Closing Cash:</span>
                <span className="text-emerald-400">R{state.cash.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Final Composure:</span>
                <span className="text-cyan-400">{state.composure}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Cycles Survived:</span>
                <span className="text-zinc-200">{state.day} Days</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800 font-mono text-xs space-y-1.5">
              <div className="text-zinc-400 uppercase mb-1">{t('ending.faction_standing', 'Final Faction Standing', lang)}</div>
              {((state.storyId && STORY_FACTIONS[state.storyId]) ||
                STORY_FACTIONS.story_1_ethekwini).map((fid) => {
                const rep = state.factionRep[fid] ?? 0;
                return (
                  <div key={fid} className="flex justify-between">
                    <span className="text-zinc-400">{getLocalizedFactionName(fid, lang)}:</span>
                    <span
                      className={
                        rep > 0
                          ? 'text-emerald-400'
                          : rep < 0
                          ? 'text-red-400'
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

          {/* ACT 2 HOOK & CONTINUE / NEW GAME+ / RESTART BUTTONS */}
          <div className="pt-4 border-t border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs font-mono text-zinc-400 max-w-xl">{ending.act2Hook}</p>
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
