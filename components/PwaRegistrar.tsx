'use client';

import { useEffect } from 'react';

export const PwaRegistrar: React.FC = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        // Ignore registration errors in dev mode
      });
    }
  }, []);

  return null;
};
