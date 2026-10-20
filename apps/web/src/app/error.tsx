'use client';

import React, { useEffect } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('WanderSphere Web Error:', error);
  }, [error]);

  return (
    <div className="flex min-h-[65vh] flex-col items-center justify-center px-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 shadow-lg mb-6">
        <AlertTriangle className="h-8 w-8" />
      </div>
      <span className="text-xs font-mono uppercase tracking-widest text-rose-400">
        System Disruption
      </span>
      <h1 className="font-serif text-3xl font-medium text-white tracking-tight mt-2">
        Something went wrong on the trail
      </h1>
      <p className="mt-3 max-w-md text-sm text-slate-300 leading-relaxed">
        An unexpected client error occurred while rendering this interface. Details have been logged
        for diagnosis.
      </p>
      <div className="mt-8 flex gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex items-center gap-2 rounded-lg bg-brand-amber px-5 py-2.5 text-xs font-semibold text-canvas hover:bg-brand-amber-light transition-colors"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Try Again</span>
        </button>
      </div>
    </div>
  );
}
