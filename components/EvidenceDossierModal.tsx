'use client';

import React from 'react';
import { ITEMS_CATALOG } from '../data/itemsCatalog';
import { SupportedLanguage } from '../types/settings';
import { t, getLocalizedCatalogItem } from '../engine/i18n';
import { soundscape } from '../engine/soundscape';

export const EvidenceDossierModal: React.FC<{
  itemId: string | null;
  lang?: SupportedLanguage;
  onClose: () => void;
}> = ({ itemId, lang = 'en', onClose }) => {
  if (!itemId) return null;

  const rawItem = ITEMS_CATALOG[itemId];
  if (!rawItem) return null;
  const item = getLocalizedCatalogItem(rawItem, lang);

  const isEvidence = item.category === 'evidence';

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 select-none font-sans"
      onClick={() => {
        soundscape.playDieSelect();
        onClose();
      }}
    >
      <div
        className={`w-full max-w-xl max-h-[90dvh] flex flex-col rounded-2xl border-2 bg-zinc-950 shadow-2xl overflow-hidden ${
          isEvidence
            ? 'border-amber-400/80 shadow-[0_0_50px_rgba(251,191,36,0.18)]'
            : 'border-cyan-400/80 shadow-[0_0_50px_rgba(34,211,238,0.18)]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* TOP HEADER BANNER */}
        <div
          className={`px-4 sm:px-6 py-3 border-b flex items-center justify-between font-mono text-[10px] sm:text-xs uppercase tracking-widest shrink-0 ${
            isEvidence
              ? 'bg-amber-950/40 border-amber-800/70 text-amber-300'
              : 'bg-cyan-950/40 border-cyan-800/70 text-cyan-300'
          }`}
        >
          <span>{item.classification}</span>
          <button
            onClick={() => {
              soundscape.playDieSelect();
              onClose();
            }}
            className="text-zinc-400 hover:text-white uppercase cursor-pointer"
          >
            {t('dossier.close_btn', '[Close ✕]', lang)}
          </button>
        </div>

        {/* DOSSIER BODY */}
        <div className="p-4 sm:p-6 space-y-4 overflow-y-auto">
          <div>
            <div className="text-[11px] font-mono text-zinc-400 uppercase">
              {t('dossier.source', 'Source', lang)}: {item.sourceLabel}
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-white mt-1">
              {item.title}
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            {item.summary}
          </p>

          {/* REDACTED DOCUMENT / INTERCEPT TRANSCRIPT */}
          <div className="rounded-xl bg-zinc-900/90 border border-zinc-800 p-3.5 sm:p-4 space-y-2.5 font-mono text-xs text-zinc-200 leading-relaxed">
            <div className="text-[10px] uppercase tracking-wider text-amber-400/90 border-b border-zinc-800 pb-1.5">
              {isEvidence
                ? t('dossier.evidence_excerpt', 'Intercepted Document / Forensic Excerpt', lang)
                : t('dossier.hardware_spec', 'Field Hardware Specification', lang)}
            </div>
            {item.documentExcerpt.map((line, idx) => (
              <p key={idx} className="text-zinc-300">
                &gt; {line}
              </p>
            ))}
          </div>

          {/* GAMEPLAY EFFECT BOX */}
          <div className="rounded-xl bg-emerald-950/25 border border-emerald-700/50 p-3 font-mono text-xs flex items-start gap-2.5">
            <span className="text-emerald-400 font-bold uppercase shrink-0">
              {t('dossier.utility', '[Utility]', lang)}
            </span>
            <span className="text-emerald-200">{item.gameplayEffect}</span>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={() => {
                soundscape.playDieSelect();
                onClose();
              }}
              className="px-5 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 font-mono text-xs uppercase tracking-wider cursor-pointer"
            >
              {t('dossier.close_dossier', 'Close Dossier', lang)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
