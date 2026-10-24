import React from 'react';
import { Clock } from '../types/game';
import { SupportedLanguage } from '../types/settings';
import { t, getLocalizedClock } from '../engine/i18n';

export const SegmentedClock: React.FC<{ clock: Clock; lang?: SupportedLanguage }> = ({
  clock,
  lang = 'en',
}) => {
  const loc = getLocalizedClock(clock, lang);
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const gap = 4; // Space between segments
  const segmentLength = circumference / clock.max - gap;

  const isThreat = clock.type === 'threat';
  const isWorld = clock.type === 'world';
  const activeColor = isThreat
    ? 'stroke-red-500'
    : isWorld
    ? 'stroke-purple-400'
    : 'stroke-amber-400';

  return (
    <div className="flex items-center gap-3 p-2.5 rounded-lg bg-zinc-900/90 border border-zinc-800">
      <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 56 56">
          {Array.from({ length: clock.max }).map((_, index) => {
            const isFilled = index < clock.current;
            const rotation = (360 / clock.max) * index;
            return (
              <circle
                key={index}
                cx="28"
                cy="28"
                r={radius}
                fill="transparent"
                strokeWidth="6"
                className={`transition-all duration-300 ${
                  isFilled ? activeColor : 'stroke-zinc-800'
                }`}
                strokeDasharray={`${segmentLength} ${circumference}`}
                transform={`rotate(${rotation} 28 28)`}
              />
            );
          })}
        </svg>
        <span className="absolute text-xs font-mono text-zinc-300">
          {clock.current}/{clock.max}
        </span>
      </div>

      <div className="flex flex-col min-w-0 flex-1">
        <div className="flex items-center justify-between gap-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 truncate">
            {clock.type === 'threat'
              ? t('clocks.type_threat', 'Threat Clock', lang)
              : clock.type === 'world'
              ? t('clocks.type_world', 'Finale Countdown', lang)
              : t('clocks.type_opportunity', 'Investigation', lang)}
          </span>
          {clock.advancesDaily ? (
            <span
              className={`px-1.5 py-0.5 rounded text-[9px] font-mono uppercase shrink-0 border ${
                isThreat
                  ? 'bg-red-950/60 border-red-800/80 text-red-300'
                  : 'bg-purple-950/60 border-purple-800/80 text-purple-300'
              }`}
            >
              {t('clocks.daily', '+1 / Cycle', lang)}
            </span>
          ) : (
            <span className="px-1.5 py-0.5 rounded text-[9px] font-mono uppercase shrink-0 bg-zinc-800/80 text-zinc-400">
              {isThreat ? t('clocks.on_heat', 'On Heat', lang) : t('clocks.on_roll', 'On Roll', lang)}
            </span>
          )}
        </div>
        <p className="text-sm font-medium text-zinc-100 truncate mt-0.5">
          {loc.title}
        </p>
        <p className="text-xs text-zinc-500 line-clamp-2">{loc.description}</p>
      </div>
    </div>
  );
};
