import React from 'react';
import { Destination } from '@wandersphere/contracts';
import { Calendar, Wallet, CheckCircle2 } from 'lucide-react';

interface DestinationCardProps {
  destination: Destination;
}

export function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <article className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-canvas-border bg-canvas-card p-6 transition-all duration-200 hover:border-brand-amber/50 hover:shadow-lg hover:shadow-black/40">
      <div>
        {/* Badges row */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center rounded-full bg-canvas-subtle px-2.5 py-1 text-xs font-medium text-slate-300 border border-canvas-border">
            {destination.category}
          </span>
          {destination.isIndiaFeatured && (
            <span className="inline-flex items-center gap-1 rounded-full bg-brand-amber/15 px-2.5 py-0.5 text-[11px] font-medium text-brand-amber border border-brand-amber/30">
              <CheckCircle2 className="h-3 w-3" />
              <span>India Spotlight</span>
            </span>
          )}
        </div>

        {/* Title and location */}
        <h3 className="font-serif text-xl font-medium text-white group-hover:text-brand-amber transition-colors">
          {destination.name}
        </h3>
        <p className="text-xs text-slate-400 mt-0.5">
          {destination.stateOrRegion ? `${destination.stateOrRegion}, ` : ''}
          {destination.country}
        </p>

        {/* Tagline & description */}
        <p className="mt-3 text-sm text-slate-300 font-sans leading-relaxed">
          {destination.tagline}
        </p>
      </div>

      {/* Footer metadata */}
      <div className="mt-6 border-t border-canvas-border/80 pt-4 flex flex-col gap-2 text-xs text-slate-300">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-slate-400">
            <Wallet className="h-3.5 w-3.5 text-brand-amber" />
            <span>Est. Daily Budget</span>
          </span>
          <span className="font-semibold text-white">
            ₹{destination.estimatedDailyBudgetInr.toLocaleString('en-IN')}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-slate-400">
            <Calendar className="h-3.5 w-3.5 text-brand-teal" />
            <span>Optimal Window</span>
          </span>
          <span className="text-slate-300">{destination.bestTimeToVisit}</span>
        </div>
      </div>
    </article>
  );
}
