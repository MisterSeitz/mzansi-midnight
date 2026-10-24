import React, { useState } from 'react';
import { GameState } from '../types/game';
import { SupportedLanguage } from '../types/settings';
import { soundscape } from '../engine/soundscape';
import { getTacticalRecommendation } from '../engine/advisor';
import { ITEMS_CATALOG } from '../data/itemsCatalog';
import {
  t,
  getLocalizedItemName,
  getLocalizedClockTitle,
  getLocalizedFactionName,
  getLocalizedRecommendation,
} from '../engine/i18n';

const FACTION_DISPLAY_NAMES: Record<string, string> = {
  abasanta: 'Abasanta Precursor Cartel',
  city_hall: 'City Hall Tender Coalition',
  saps_trt: 'SAPS TRT Strike Squads',
  street_syndicate: 'Queen St. Taxi Syndicate',
  hawks: 'DPCI Hawks Anti-Corruption',
};

type MissionTab = 'objective' | 'faq' | 'clocks' | 'inventory';

export const MissionStatusModal: React.FC<{
  isOpen: boolean;
  state: GameState;
  lang?: SupportedLanguage;
  onClose: () => void;
  onInspectItem: (itemId: string) => void;
  onSelectNode: (nodeId: string) => void;
}> = ({ isOpen, state, lang = 'en', onClose, onInspectItem, onSelectNode }) => {
  const [activeTab, setActiveTab] = useState<MissionTab>('objective');

  if (!isOpen) return null;

  const rawRec = getTacticalRecommendation(state, null);
  const recommendation = getLocalizedRecommendation(rawRec, lang);
  const isAct2 = state.act === 2;

  const hasExhibit1 = isAct2
    ? state.inventory.includes('offshore_trust_deed')
    : state.inventory.includes('decoded_tanker_ledger');

  const hasExhibit2 = isAct2
    ? state.inventory.includes('superlab_batch_telemetry')
    : state.inventory.includes('berth_14_manifest');

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 select-none font-sans"
      onClick={() => {
        soundscape.playDieSelect();
        onClose();
      }}
    >
      <div
        className="w-full max-w-2xl max-h-[90dvh] flex flex-col rounded-2xl border-2 border-amber-500/70 bg-zinc-950 shadow-[0_0_50px_rgba(245,158,11,0.2)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="px-5 py-3.5 bg-amber-950/30 border-b border-amber-900/50 flex items-center justify-between font-mono text-xs shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-amber-400 font-bold uppercase tracking-wider">
              {isAct2
                ? t('mission.act2_title', 'ACT 2: COMMISSION OF INQUIRY // CASE FILE & STATUS', lang)
                : t('mission.act1_title', 'ACT 1: THE GHOST DOCKET // CASE FILE & STATUS', lang)}
            </span>
            <span className="px-2 py-0.5 rounded bg-zinc-900 text-cyan-300 border border-zinc-700">
              {t('mission.cycle', 'Cycle', lang)} {state.day}
            </span>
          </div>
          <button
            onClick={() => {
              soundscape.playDieSelect();
              onClose();
            }}
            className="text-zinc-400 hover:text-white uppercase font-mono text-xs cursor-pointer"
          >
            {t('mission.close', '[Close ✕]', lang)}
          </button>
        </div>

        {/* TABS */}
        <div className="flex border-b border-zinc-800 bg-zinc-900/60 font-mono text-xs overflow-x-auto shrink-0">
          <button
            onClick={() => {
              soundscape.playDieSelect();
              setActiveTab('objective');
            }}
            className={`px-4 py-2.5 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'objective'
                ? 'border-amber-400 text-amber-300 font-bold bg-amber-500/10'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            01 // {t('mission.tab_objective', 'Objective & Leads', lang)}
          </button>
          <button
            onClick={() => {
              soundscape.playDieSelect();
              setActiveTab('faq');
            }}
            className={`px-4 py-2.5 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'faq'
                ? 'border-amber-400 text-amber-300 font-bold bg-amber-500/10'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            02 // {t('mission.tab_faq', 'How Cycles & Dice Work', lang)}
          </button>
          <button
            onClick={() => {
              soundscape.playDieSelect();
              setActiveTab('clocks');
            }}
            className={`px-4 py-2.5 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'clocks'
                ? 'border-amber-400 text-amber-300 font-bold bg-amber-500/10'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            03 // {t('mission.tab_clocks', 'Active Clocks', lang)} ({Object.keys(state.clocks).length})
          </button>
          <button
            onClick={() => {
              soundscape.playDieSelect();
              setActiveTab('inventory');
            }}
            className={`px-4 py-2.5 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'inventory'
                ? 'border-amber-400 text-amber-300 font-bold bg-amber-500/10'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            04 // {t('mission.tab_inventory', 'Evidence Dossier', lang)} ({state.inventory.length})
          </button>
        </div>

        {/* BODY */}
        <div className="p-5 sm:p-6 space-y-4 overflow-y-auto text-xs sm:text-sm">
          {/* TAB 1: OBJECTIVES & NEXT STEPS */}
          {activeTab === 'objective' && (
            <div className="space-y-4">
              {/* 3-STEP CAMPAIGN PROGRESS BAR */}
              <div className="p-3.5 rounded-xl border border-zinc-800 bg-zinc-900/80 space-y-2">
                <div className="flex items-center justify-between font-mono text-[11px] text-zinc-400 uppercase">
                  <span>{t('mission.campaign_progress', 'Campaign Progress', lang)}</span>
                  <span className="text-amber-400 font-bold">
                    {t('mission.step_x_of_y', 'Step {step} of 3', lang).replace('{step}', String(recommendation.campaignStep))}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 font-mono text-[10px]">
                  <div
                    className={`p-2 rounded-lg border text-center ${
                      hasExhibit1 || hasExhibit2
                        ? 'border-emerald-500/80 bg-emerald-950/40 text-emerald-300 font-bold'
                        : 'border-amber-400 bg-amber-500/20 text-amber-200 font-bold animate-pulse'
                    }`}
                  >
                    {t('mission.crack_1st_exhibit', '1. Crack 1st Exhibit', lang)}
                  </div>
                  <div
                    className={`p-2 rounded-lg border text-center ${
                      hasExhibit1 && hasExhibit2
                        ? 'border-emerald-500/80 bg-emerald-950/40 text-emerald-300 font-bold'
                        : hasExhibit1 || hasExhibit2
                        ? 'border-amber-400 bg-amber-500/20 text-amber-200 font-bold animate-pulse'
                        : 'border-zinc-800 bg-zinc-950/60 text-zinc-500'
                    }`}
                  >
                    {t('mission.secure_2nd_exhibit', '2. Secure 2nd Exhibit', lang)}
                  </div>
                  <div
                    className={`p-2 rounded-lg border text-center ${
                      hasExhibit1 || hasExhibit2
                        ? 'border-purple-500/80 bg-purple-950/40 text-purple-200 font-bold'
                        : 'border-zinc-800 bg-zinc-950/60 text-zinc-500'
                    }`}
                  >
                    {t('mission.launch_grand_finale', '3. Launch Grand Finale', lang)}
                  </div>
                </div>
              </div>

              {/* CURRENT TACTICAL ADVICE */}
              <div className="p-4 rounded-xl border-2 border-amber-500/60 bg-amber-950/25 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2 py-0.5 rounded font-mono text-[10px] uppercase font-bold bg-amber-500 text-slate-950">
                    {recommendation.badgeLabel}
                  </span>
                  {recommendation.targetNodeId && (
                    <button
                      onClick={() => {
                        soundscape.playDieSelect();
                        onSelectNode(recommendation.targetNodeId!);
                        onClose();
                      }}
                      className="px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono text-xs font-bold uppercase transition-colors cursor-pointer"
                    >
                      {recommendation.actionButtonLabel || 'Go to Target Node →'}
                    </button>
                  )}
                </div>
                <h3 className="text-base font-bold text-white">
                  {recommendation.headline}
                </h3>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {recommendation.hint}
                </p>
              </div>

              {/* HOW TO WIN */}
              <div className="p-3.5 rounded-xl border border-zinc-800 bg-zinc-900/60 space-y-1.5">
                <div className="font-mono text-xs uppercase text-cyan-400 font-bold">
                  {t('mission.how_you_win', 'How You Win', lang)} {isAct2 ? t('mission.act2', 'Act 2', lang) : t('mission.act1', 'Act 1', lang)}
                </div>
                <p
                  className="text-xs text-zinc-300 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: isAct2
                      ? t(
                          'mission.how_to_win_act2',
                          'Secure the <span class="text-amber-300 font-semibold">Sovereign Pearl Trust Deed</span> (at High Court) or <span class="text-amber-300 font-semibold">Super-Lab Telemetry</span> (at Township Depot). Once obtained, King Shaka Cargo Apron and the Citrus Estate unlock. Trigger the <span class="text-purple-300 font-semibold">Hangar 7 Finale</span> to choose your ultimate destiny (Reckoning, Revolution, Syndicate State, or Vanished).',
                          lang
                        )
                      : t(
                          'mission.how_to_win_act1',
                          'Decode <span class="text-amber-300 font-semibold">Docket #409</span> (at Mercury Arcade Flat) or crack the <span class="text-amber-300 font-semibold">Auditor\'s Handset</span> (at Golden Dragon). Once you hold either clue, Pier 2 and Old Archive unlock, allowing you to trigger the <span class="text-purple-300 font-semibold">Berth 14 Finale</span> and transition into Act 2!',
                          lang
                        ),
                  }}
                />
              </div>
            </div>
          )}

          {/* TAB 2: HOW CYCLES & DICE WORK */}
          {activeTab === 'faq' && (
            <div className="space-y-3.5">
              <div className="p-3.5 rounded-xl border border-zinc-800 bg-zinc-900/80 space-y-1">
                <h4 className="font-mono text-xs uppercase text-amber-400 font-bold">
                  {t('mission.faq_q1_title', '1. What is a "Cycle" and how many are there?', lang)}
                </h4>
                <p
                  className="text-xs text-zinc-300 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: t(
                      'mission.faq_q1_body',
                      'A <strong>Cycle is 1 In-Game Day (a 24-hour shift)</strong>. There is no arbitrary maximum like 50 or 100 days. Instead, you are racing against <strong>Ticking Threat Clocks</strong> (like Brigadier Mokoena\'s Sweep at 6 segments). An average investigation takes <strong>3 to 6 cycles for Act 1</strong> and <strong>4 to 8 cycles for Act 2</strong>.',
                      lang
                    ),
                  }}
                />
              </div>

              <div className="p-3.5 rounded-xl border border-zinc-800 bg-zinc-900/80 space-y-1">
                <h4 className="font-mono text-xs uppercase text-amber-400 font-bold">
                  {t('mission.faq_q2_title', '2. How many dice do I get? Do I throw dice at every venue?', lang)}
                </h4>
                <p
                  className="text-xs text-zinc-300 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: t(
                      'mission.faq_q2_body',
                      'Each morning, you roll <strong>3 to 5 dice TOTAL for the whole city</strong> based on your Composure (80%+ = 5 dice, 40–79% = 4 dice, <40% = 3 dice). You do <strong>NOT</strong> throw dice at every venue! You choose 3 to 5 key actions across the map to invest your daily effort into.',
                      lang
                    ),
                  }}
                />
              </div>

              <div className="p-3.5 rounded-xl border border-zinc-800 bg-zinc-900/80 space-y-1">
                <h4 className="font-mono text-xs uppercase text-amber-400 font-bold">
                  {t('mission.faq_q3_title', '3. What happens when I click "End Cycle / Sleep"?', lang)}
                </h4>
                <p
                  className="text-xs text-zinc-300 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: t(
                      'mission.faq_q3_body',
                      'Clicking End Cycle ends your shift and advances to the next morning:<br />&bull; <strong>Threat Clocks advance</strong> (+1 segment on active red clocks).<br />&bull; <strong>Load Shedding rotates</strong> (Stage 2 &rarr; 4 &rarr; 6 &rarr; 2).<br />&bull; <strong>Dawn Encrypted Wire arrive</strong> with new story leads.<br />&bull; <strong>You roll a fresh pool of dice</strong> tomorrow morning.',
                      lang
                    ),
                  }}
                />
              </div>

              <div className="p-3.5 rounded-xl border border-zinc-800 bg-zinc-900/80 space-y-1">
                <h4 className="font-mono text-xs uppercase text-amber-400 font-bold">
                  {t('mission.faq_q4_title', '4. How do I know which dice are spent vs. available?', lang)}
                </h4>
                <p
                  className="text-xs text-zinc-300 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: t(
                      'mission.faq_q4_body',
                      'The bottom tray displays <strong>"X Available &bull; Y Spent"</strong>. Spent dice turn dark gray and display a <strong>[SPENT]</strong> tag. Available dice are brightly lit slate blocks with ivory/gold dots or numbers.',
                      lang
                    ),
                  }}
                />
              </div>

              <div className="p-3.5 rounded-xl border border-zinc-800 bg-zinc-900/80 space-y-1">
                <h4 className="font-mono text-xs uppercase text-amber-400 font-bold">
                  {t('mission.faq_q5_title', '5. Can my character die or trigger a Game Over?', lang)}
                </h4>
                <p
                  className="text-xs text-zinc-300 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: t(
                      'mission.faq_q5_body',
                      'Yes! If Brigadier Mokoena\'s Sweep reaches 6/6, your flat is raided and the run ends in arrest. If Constable Nandi\'s Bleedout hits 4/4 before you stabilize her, she dies permanently in your flat (-30% Composure). If your Composure hits 0%, you trigger Blackout Paranoia!',
                      lang
                    ),
                  }}
                />
              </div>
            </div>
          )}

          {/* TAB 3: ACTIVE CLOCKS */}
          {activeTab === 'clocks' && (
            <div className="space-y-3">
              <div className="font-mono text-[11px] uppercase text-zinc-400">
                {t('mission.segmented_clocks_active', 'Segmented Clocks Active in eThekwini-Gold:', lang)}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.values(state.clocks).map((clock) => {
                  const isThreat = clock.type === 'threat';
                  const isAction = clock.type === 'action';
                  const isCritical = clock.current >= clock.max - 1;

                  return (
                    <div
                      key={clock.id}
                      className={`p-3.5 rounded-xl border space-y-1.5 ${
                        isCritical
                          ? 'border-red-500/80 bg-red-950/30'
                          : isThreat
                          ? 'border-red-900/60 bg-zinc-900/80'
                          : isAction
                          ? 'border-amber-700/60 bg-zinc-900/80'
                          : 'border-purple-800/60 bg-zinc-900/80'
                      }`}
                    >
                      <div className="flex items-center justify-between font-mono text-xs">
                        <span className={isCritical ? 'text-red-300 font-bold' : 'text-white font-medium'}>
                          {getLocalizedClockTitle(clock.id, clock.title, lang)}
                        </span>
                        <span
                          className={`font-bold ${
                            isCritical
                              ? 'text-red-400 animate-pulse'
                              : isThreat
                              ? 'text-red-400'
                              : 'text-amber-400'
                          }`}
                        >
                          {clock.current} / {clock.max}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400 leading-snug">
                        {t(`clock.${clock.id}.desc`, clock.description, lang)}
                      </p>
                      <div className="flex items-center justify-between font-mono text-[10px] text-zinc-500 pt-1 border-t border-zinc-800">
                        <span>{t('mission.clock_type', 'Type', lang)}: {t(`mission.clock_type_${clock.type}`, clock.type.toUpperCase(), lang)}</span>
                        <span>{clock.advancesDaily ? t('mission.clock_advances_daily', '+1 / Night', lang) : t('mission.clock_advances_rolls', 'Progress On Rolls', lang)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: EVIDENCE & GEAR DOSSIER */}
          {activeTab === 'inventory' && (
            <div className="space-y-3">
              <div className="font-mono text-[11px] uppercase text-zinc-400">
                {t('mission.classified_exhibits_header', 'Classified Exhibits & Black-Market Hardware:', lang)}
              </div>
              {state.inventory.length === 0 ? (
                <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/60 text-zinc-500 text-center font-mono">
                  {t('mission.no_evidence', 'No evidence or hardware acquired yet.', lang)}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {state.inventory.map((itemId) => {
                    const item = ITEMS_CATALOG[itemId];
                    return (
                      <div
                        key={itemId}
                        className="p-3 rounded-xl border border-zinc-800 bg-zinc-900/80 flex items-center justify-between gap-2"
                      >
                        <div className="truncate">
                          <div className="text-xs font-semibold text-zinc-100 truncate">
                            {getLocalizedItemName(itemId, item?.title || itemId, lang)}
                          </div>
                          <div className="text-[10px] font-mono text-amber-400">
                            {item?.category ? t(`item_category.${item.category}`, item.category.toUpperCase(), lang) : t('item_category.exhibit', 'EXHIBIT', lang)}
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            soundscape.playDieSelect();
                            onInspectItem(itemId);
                          }}
                          className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-cyan-300 text-[10px] font-mono uppercase cursor-pointer shrink-0"
                        >
                          {t('mission.inspect', '[Inspect]', lang)}
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
