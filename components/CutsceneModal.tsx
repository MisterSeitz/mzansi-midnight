'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { CutsceneData } from '../types/cutscenes';
import { soundscape } from '../engine/soundscape';
import { SupportedLanguage } from '../types/settings';
import { t } from '../engine/i18n';

interface CutsceneModalProps {
  cutscene: CutsceneData;
  lang?: SupportedLanguage;
  onComplete: () => void;
}

export const CutsceneModal: React.FC<CutsceneModalProps> = ({
  cutscene,
  lang = 'en',
  onComplete,
}) => {
  const [currentBeatIdx, setCurrentBeatIdx] = useState<number>(0);
  const totalBeats = cutscene.beats.length;
  const currentBeat = cutscene.beats[currentBeatIdx];
  const isFinalBeat = currentBeatIdx === totalBeats - 1;

  useEffect(() => {
    soundscape.playCutsceneStinger(cutscene.audioMood);
    soundscape.playScannerSquelch();
  }, [cutscene]);

  const handleNextBeat = () => {
    if (isFinalBeat) {
      soundscape.playOutcome('clean');
      onComplete();
    } else {
      soundscape.playDieSelect();
      setCurrentBeatIdx((prev) => prev + 1);
    }
  };

  const handleSkipAll = () => {
    soundscape.playOutcome('clean');
    onComplete();
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        handleNextBeat();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        handleSkipAll();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentBeatIdx, isFinalBeat]);

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-between p-3 sm:p-6 overflow-hidden select-none font-sans">
      {/* TOP CINEMATIC LETTERBOX BAR */}
      <div className="w-full z-20 flex items-center justify-between text-zinc-400 font-mono text-[10px] sm:text-xs uppercase tracking-widest border-b border-zinc-900 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          <span className="text-red-400 font-bold">
            {t('cutscene.live_wire', 'LIVE WIRE ARCHIVE // TACTICAL INTERCEPT', lang)}
          </span>
          <span className="text-zinc-600 hidden sm:inline">•</span>
          <span className="text-zinc-400 hidden sm:inline">
            {cutscene.subtitle}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-amber-400 font-bold">
            {t('cutscene.beat', 'BEAT', lang)} {currentBeatIdx + 1}/{totalBeats}
          </span>
          <button
            onClick={handleSkipAll}
            className="px-2 py-0.5 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 text-[10px] tracking-wider transition-colors cursor-pointer"
          >
            {t('cutscene.skip', 'SKIP SCENE [ESC]', lang)}
          </button>
        </div>
      </div>

      {/* CENTER CINEMATIC FRAME WITH 16:9 ARTWORK & KEN BURNS ZOOM */}
      <div className="relative w-full max-w-5xl flex-1 max-h-[70vh] my-auto rounded-xl overflow-hidden border-2 border-zinc-800/80 shadow-2xl bg-zinc-950 flex flex-col justify-end">
        {/* Background Artwork */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src={cutscene.image}
            alt={cutscene.title}
            fill
            className="object-cover object-center transform scale-105 hover:scale-110 transition-transform duration-10000 filter brightness-90 contrast-110"
            priority
          />
          {/* Noir Scanline & Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent z-10" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/40 to-black/80 z-10 pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] z-10 opacity-30 pointer-events-none" />
        </div>

        {/* Narrative Overlay Box */}
        <div className="relative z-20 p-4 sm:p-6 lg:p-8 space-y-3.5 max-w-3xl">
          {/* Location & Time Stamp */}
          <div className="flex items-center gap-2 font-mono text-[10px] sm:text-xs uppercase text-amber-400 tracking-wider">
            <span className="px-1.5 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold">
              LOC
            </span>
            <span>{currentBeat.locationStamp}</span>
          </div>

          {/* Speaker Header (if dialogue) */}
          {currentBeat.speaker && (
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-6 rounded-full bg-cyan-400" />
              <div>
                <div className="text-sm sm:text-base font-semibold text-cyan-200">
                  {currentBeat.speaker}
                </div>
                {currentBeat.role && (
                  <div className="text-[11px] font-mono text-cyan-400/80 uppercase">
                    {currentBeat.role}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Beat Body Text */}
          <p className="text-sm sm:text-base lg:text-lg text-zinc-100 leading-relaxed font-sans font-normal tracking-wide drop-shadow-md">
            {currentBeat.text}
          </p>

          {/* Beat Dots Indicator */}
          <div className="flex items-center gap-1.5 pt-1">
            {cutscene.beats.map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentBeatIdx
                    ? 'w-6 bg-amber-400'
                    : idx < currentBeatIdx
                    ? 'w-2 bg-emerald-500'
                    : 'w-2 bg-zinc-700'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM LETTERBOX ACTION BAR */}
      <div className="w-full z-20 flex flex-col sm:flex-row items-center justify-between gap-3 text-zinc-400 font-mono text-xs border-t border-zinc-900 pt-3">
        <div className="text-[11px] text-zinc-500 hidden sm:block">
          {t('cutscene.controls_hint', 'PRESS SPACE / ENTER TO ADVANCE • ESC TO SKIP', lang)}
        </div>

        <button
          onClick={handleNextBeat}
          className={`w-full sm:w-auto px-6 py-3 rounded-xl font-mono text-xs sm:text-sm uppercase tracking-wider font-bold transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer ${
            isFinalBeat
              ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
              : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-zinc-700'
          }`}
        >
          <span>
            {isFinalBeat
              ? cutscene.actionLabel
              : t('cutscene.next_beat', 'CONTINUE TO NEXT BEAT [SPACE ►]', lang)}
          </span>
        </button>
      </div>
    </div>
  );
};
