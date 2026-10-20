import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Info, CheckCircle2 } from 'lucide-react';

interface WorkspaceHeaderProps {
  title: string;
  subtitle: string;
  badgeText: string;
  upcomingFeatures: string[];
}

export function WorkspaceHeader({
  title,
  subtitle,
  badgeText,
  upcomingFeatures,
}: WorkspaceHeaderProps) {
  return (
    <div className="space-y-6">
      {/* Back link */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Back to Landing Page</span>
        </Link>
      </div>

      {/* Header title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-canvas-border pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-amber/10 border border-brand-amber/30 px-3 py-1 text-xs font-medium text-brand-amber mb-3">
            <span>{badgeText}</span>
          </div>
          <h1 className="font-serif text-3xl font-medium text-white tracking-tight sm:text-4xl">
            {title}
          </h1>
          <p className="mt-2 text-sm text-slate-300 max-w-2xl">{subtitle}</p>
        </div>
      </div>

      {/* Explicit Phase 0 status banner */}
      <div className="rounded-xl border border-canvas-border bg-canvas-card p-5">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-brand-teal mt-0.5 flex-shrink-0" />
          <div>
            <h2 className="text-sm font-semibold text-white">Phase 0 Architectural Shell</h2>
            <p className="mt-1 text-xs text-slate-300 leading-relaxed">
              This route establishes the dedicated layout, navigation contract, and component
              boundaries for this workspace. Full authentication, live database hydration, and
              interactive state management are reserved for Phase 1.
            </p>

            <div className="mt-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Planned Capabilities
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {upcomingFeatures.map((feat, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="h-3.5 w-3.5 text-brand-amber flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
