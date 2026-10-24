import React, { useState } from 'react';
import { SupportedLanguage } from '../types/settings';
import { t } from '../engine/i18n';
import { soundscape } from '../engine/soundscape';

interface TutorialStep {
  badge: string;
  zone: string;
  title: string;
  body: string;
  bullets: string[];
}

const TUTORIAL_STEPS: TutorialStep[] = [
  {
    badge: 'STEP 1 OF 6 // BOTTOM BAR & ADVISOR',
    zone: 'Daily Action Dice, Composure & Tactical Advisor',
    title: 'Roll, Preview & Follow ★ Recommendations',
    body: 'At the start of every cycle, you roll up to 5 six-sided dice (d6) based on your current Composure (80%+ = 5 dice, 40–79% = 4 dice, <40% = 3 dice).',
    bullets: [
      'Click any die in the bottom tray to hold it—every Action Slot immediately previews your exact modified total (Green 6+, Amber 4–5, Red 1–3).',
      'Not sure what to do next? Follow the "Tactical Advisor" in the Left Panel or look for pulsing "★ Recommended" badges on map nodes and action slots.',
      'When you run out of dice for the day, click "End Cycle / Sleep →" to advance to the next morning.',
    ],
  },
  {
    badge: 'STEP 2 OF 6 // RIGHT DRAWER',
    zone: 'Node Action Slots & Stat Modifiers',
    title: 'How Roll Math & Clocks Work',
    body: 'Every Action Slot uses one of your four Investigator Stats: STREET (STRT), DOCKETS (DCKT), WIRE, or INFLUENCE (INFL).',
    bullets: [
      'Final Roll = Die Face + Stat Modifier + Stage 6 Bonus + Gear/Tactical Buffs.',
      '6 or higher (Green — Clean Success): Advances Investigation Clocks by +2 segments or pays maximum Rands with zero trace.',
      '4 or 5 (Amber — Compromised Success): Advances clocks by +1 segment or pays cash, but costs minor Composure.',
      '1 to 3 (Red — Failure / Blowback): Zero progress, Composure loss, and adds Precinct Heat.',
    ],
  },
  {
    badge: 'STEP 3 OF 6 // ECONOMY & POWER-UPS',
    zone: 'Rands (ZAR), Gear Shop & Faction Perks',
    title: 'How Currency & Power-Ups Work',
    body: 'Rands (ZAR) keep your investigation alive. Earn cash via Fixer Contracts or dialogue shakes, and spend it across three power-up systems:',
    bullets: [
      'Black-Market Gear Shop (Top HUD): Buy permanent passive upgrades at Golden Dragon or Point Road (+1 WIRE, +1 STREET, -50% Trauma, or Free Roadblock Bypass).',
      '1/Day Faction Tactical Calls (Left Panel): Reach +1/+2 Rep with a faction to trigger free daily abilities (Force Stage 6, +2 WIRE boost, or -2 Threat Clock segments).',
      'Safehouse Recovery & Emergency Upkeep: Spend Rands on Trauma Patch-Ups (+25% Composure), Shabeen Hustles, Diesel Overrides (R300), and Roadblock Bribes (R200).',
    ],
  },
  {
    badge: 'STEP 4 OF 6 // THREATS & ELIMINATION',
    zone: 'Threat Clocks, Composure & Character Fate',
    title: 'Can Characters Die or Trigger Game Over?',
    body: 'Every morning when you sleep, red Threat Clocks advance by +1 segment. Letting them fill has lethal or run-ending consequences:',
    bullets: [
      'Defeat / Arrest (Game Over): If Brigadier Mokoena’s "TRT Raid Sweep" (Act 1) or "Hawks Taskforce" (Act 2) hits 6/6, Sipho’s safehouse is stormed and the run ends in arrest.',
      'NPC Elimination (Constable Nandi): If "Nandi’s Bleedout" hits 4/4 before you stabilise her, Constable Nandi dies permanently in your safehouse (-30% Composure).',
      'Zero-Composure Breakdown & Vendettas: Hitting 0% Composure triggers an emergency breakdown costing 1 Die next morning. Dropping Faction Rep to -2 triggers armed retaliation.',
    ],
  },
  {
    badge: 'STEP 5 OF 6 // TOP HUD & MAP',
    zone: 'Load Shedding & SAPS Roadblocks',
    title: 'Surviving the eThekwini-Gold Grid',
    body: 'The city grid rotates through Stage 2, Stage 4, and Stage 6 Load Shedding every cycle.',
    bullets: [
      'Stage 6 Lockouts: Computer servers at City Hall and Golden Dragon go offline during Stage 6—unless you pay R300 for Backup Generator Diesel.',
      'Stage 6 Cover Bonus: Infiltrating Pier 2 Cold Storage gets a +2 Roll Bonus during Stage 6 blackouts because harbour floodlights fail.',
      'SAPS Roadblocks: If Precinct Heat hits 4+, inner-city corridors lock down, costing R200 bribe or 1 Die to cross unless you own the SAPS Radio Scanner.',
    ],
  },
  {
    badge: 'STEP 6 OF 6 // CAMPAIGN & REPLAYABILITY',
    zone: 'Act 1 → Act 2, Endings Archive & New Game+',
    title: 'How to Win & What Happens After Act 2',
    body: 'Mzansi Midnight features a two-act narrative campaign with 8 unlockable endings, Fixer Rankings, and New Game+ carryover.',
    bullets: [
      'Winning Act 1 & Entering Act 2: Secure 2 Core Leverage Clues to launch the Berth 14 Finale (Vigilante, Whistleblower, or Kingpin), then click "Continue to Act 2: The Bluff Refinery →".',
      'Winning Act 2: Crack the Island View Pipeline Manifest and Petrochemical Mass-Balance Audit to trigger the Bluff Parliamentary Reckoning.',
      'New Game+ & Fixer Registry: After any victory, check your S-to-C Fixer Grade against the eThekwini Fixer Registry, collect 6 Commendation Badges, and launch New Game+ to keep all Black-Market Gear + R1,000 bonus cash!',
    ],
  },
];

export const TutorialOverlay: React.FC<{
  isOpen: boolean;
  lang?: SupportedLanguage;
  onClose: () => void;
}> = ({ isOpen, lang = 'en', onClose }) => {
  const [stepIdx, setStepIdx] = useState<number>(0);

  if (!isOpen) return null;

  const step = TUTORIAL_STEPS[stepIdx];
  const isLast = stepIdx === TUTORIAL_STEPS.length - 1;
  const stepNum = stepIdx + 1;
  const localizedTitle = t(`tutorial.step${stepNum}.title`, step.title, lang);
  const localizedBody = t(`tutorial.step${stepNum}.desc`, step.body, lang);
  const localizedBadge = t(`tutorial.step${stepNum}.badge`, step.badge, lang);
  const localizedZone = t(`tutorial.step${stepNum}.zone`, step.zone, lang);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 select-none font-sans">
      <div className="w-full max-w-xl max-h-[90dvh] flex flex-col rounded-2xl border-2 border-amber-400/80 bg-zinc-950 shadow-[0_0_50px_rgba(251,191,36,0.18)] overflow-hidden">
        {/* HEADER */}
        <div className="px-4 sm:px-6 py-3 bg-amber-950/40 border-b border-amber-800/60 flex items-center justify-between font-mono text-[11px] sm:text-xs shrink-0">
          <span className="text-amber-300 uppercase tracking-widest">
            {localizedBadge}
          </span>
          <button
            onClick={() => {
              soundscape.playDieSelect();
              onClose();
            }}
            className="text-zinc-400 hover:text-white uppercase cursor-pointer"
          >
            {t('tutorial.close', '[Close ✕]', lang)}
          </button>
        </div>

        {/* STEP CONTENT */}
        <div className="p-4 sm:p-6 space-y-4 overflow-y-auto">
          <div>
            <div className="text-xs font-mono uppercase text-cyan-400">
              {t('tutorial.hud_zone', 'HUD Zone', lang)}: {localizedZone}
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-white mt-1">
              {localizedTitle}
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{localizedBody}</p>

          <ul className="space-y-2 bg-zinc-900/80 border border-zinc-800 rounded-xl p-3.5 sm:p-4 text-xs text-zinc-200 leading-relaxed">
            {step.bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-amber-400 font-mono mt-0.5">&rarr;</span>
                <span>{t(`tutorial.step${stepNum}.bullet${i + 1}`, b, lang)}</span>
              </li>
            ))}
          </ul>

          {/* STEPPER DOTS & NAVIGATION */}
          <div className="pt-3 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              {TUTORIAL_STEPS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    soundscape.playDieSelect();
                    setStepIdx(idx);
                  }}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    idx === stepIdx
                      ? 'w-6 bg-amber-400'
                      : 'w-2 bg-zinc-700 hover:bg-zinc-500'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2 font-mono text-xs">
              {stepIdx > 0 && (
                <button
                  onClick={() => {
                    soundscape.playDieSelect();
                    setStepIdx((prev) => prev - 1);
                  }}
                  className="px-3.5 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 cursor-pointer"
                >
                  &larr; {t('tutorial.back', 'Back', lang)}
                </button>
              )}

              {!isLast ? (
                <button
                  onClick={() => {
                    soundscape.playDieSelect();
                    setStepIdx((prev) => prev + 1);
                  }}
                  className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold uppercase tracking-wider cursor-pointer"
                >
                  {t('tutorial.next', 'Next', lang)} &rarr;
                </button>
              ) : (
                <button
                  onClick={() => {
                    soundscape.playOutcome('clean');
                    setStepIdx(0);
                    onClose();
                  }}
                  className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold uppercase tracking-wider cursor-pointer"
                >
                  {t('tutorial.got_it', 'Got It', lang)} &rarr;
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
