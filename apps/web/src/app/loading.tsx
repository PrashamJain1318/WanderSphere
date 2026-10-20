import React from 'react';
import { Compass } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-canvas-card border border-canvas-border text-brand-amber shadow-lg">
        <Compass className="h-8 w-8 animate-spin-slow" />
      </div>
      <p className="mt-4 text-sm font-medium text-slate-300">Loading WanderSphere...</p>
      <span className="text-xs text-slate-400 mt-1">Preparing curated travel paths</span>
    </div>
  );
}
