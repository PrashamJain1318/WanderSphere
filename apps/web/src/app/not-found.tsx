import React from 'react';
import Link from 'next/link';
import { Compass, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-[65vh] flex-col items-center justify-center px-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-canvas-card border border-canvas-border text-brand-amber shadow-lg mb-6">
        <Compass className="h-8 w-8 text-brand-amber" />
      </div>
      <span className="text-xs font-mono uppercase tracking-widest text-brand-amber">
        404 — Waypoint Not Found
      </span>
      <h1 className="font-serif text-3xl sm:text-4xl font-medium text-white tracking-tight mt-2">
        Off The Explored Map
      </h1>
      <p className="mt-3 max-w-md text-sm text-slate-300 leading-relaxed">
        The route or page you are searching for does not exist or hasn’t been charted in this
        version of WanderSphere.
      </p>
      <div className="mt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-brand-amber px-5 py-2.5 text-xs font-semibold text-canvas hover:bg-brand-amber-light transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Return to Base Camp</span>
        </Link>
      </div>
    </div>
  );
}
