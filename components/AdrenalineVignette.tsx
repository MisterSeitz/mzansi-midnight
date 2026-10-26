'use client';

import React from 'react';
import { AdrenalineMetrics } from '../engine/adrenaline';

interface AdrenalineVignetteProps {
  adrenaline: AdrenalineMetrics;
}

export const AdrenalineVignette: React.FC<AdrenalineVignetteProps> = ({
  adrenaline,
}) => {
  const { level, score, themeColor, pulseSpeed, isClimaxImminent } = adrenaline;

  if (level <= 1) {
    return null;
  }

  // Dynamic CSS classes for pulse & edge vignette
  const borderClasses = {
    amber: 'border-amber-500/20 shadow-[inset_0_0_40px_rgba(245,158,11,0.15)]',
    orange: 'border-orange-500/35 shadow-[inset_0_0_60px_rgba(249,115,22,0.25)]',
    red: 'border-red-600/50 shadow-[inset_0_0_90px_rgba(220,38,38,0.35)]',
    crimson: 'border-red-500/70 shadow-[inset_0_0_120px_rgba(239,68,68,0.5)]',
    emerald: 'border-emerald-500/20 shadow-[inset_0_0_30px_rgba(16,185,129,0.1)]',
  }[themeColor];

  const animationClasses = {
    none: '',
    slow: 'animate-pulse duration-3000',
    medium: 'animate-pulse duration-1500',
    fast: 'animate-pulse duration-1000',
    rapid: 'animate-pulse duration-500',
  }[pulseSpeed];

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-30 transition-all duration-700 border-2 ${borderClasses} ${animationClasses}`}
      aria-hidden="true"
    >
      {/* Top Hazard Caution Tape in Critical/Climax */}
      {isClimaxImminent && (
        <div className="absolute top-0 inset-x-0 h-1 bg-[repeating-linear-gradient(45deg,#ef4444,#ef4444_10px,#000_10px,#000_20px)] opacity-80" />
      )}

      {/* Subtle Corner Reticle Accents for High Tension */}
      {level >= 3 && (
        <>
          <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-red-500/60" />
          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-red-500/60" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-red-500/60" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-red-500/60" />
        </>
      )}
    </div>
  );
};
