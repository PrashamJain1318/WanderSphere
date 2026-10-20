import React from 'react';
import { WorkspaceHeader } from '../../components/WorkspaceHeader';
import { Flag, FileCheck, Activity } from 'lucide-react';

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-10">
      <WorkspaceHeader
        title="Admin Operations Console"
        subtitle="Manage destination catalogs, moderate community dispatches, audit travel safety flags, and monitor system health."
        badgeText="Admin Workspace"
        upcomingFeatures={[
          'Role-based access control & multi-factor verification (Phase 1)',
          'Curated destination CMS with seasonality tags & pricing reviews (Phase 1)',
          'Community content moderation queue & anti-spam heuristics (Phase 2)',
          'Real-time MongoDB cluster telemetry & API request analytics (Phase 2)',
          'System-wide audit trail with immutable change logs (Phase 3)',
        ]}
      />

      {/* Placeholder Administration Modules */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-xl border border-canvas-border bg-canvas-subtle p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-lg bg-canvas-card p-2 border border-canvas-border text-brand-amber">
              <FileCheck className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">Destination Curation</h2>
              <span className="text-[10px] uppercase tracking-wider text-slate-400">
                CMS Pipeline
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Draft, review, and publish destination guides for India states and worldwide regions.
          </p>
          <div className="mt-4 pt-3 border-t border-canvas-border/80 flex items-center justify-between text-[11px] text-slate-400">
            <span>Catalog Items: 6 (Phase 0)</span>
            <span className="text-brand-amber">Mock State</span>
          </div>
        </div>

        <div className="rounded-xl border border-canvas-border bg-canvas-subtle p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-lg bg-canvas-card p-2 border border-canvas-border text-brand-teal">
              <Flag className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">Community Moderation</h2>
              <span className="text-[10px] uppercase tracking-wider text-slate-400">
                Safety & Trust
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Review community reports, verify high-altitude passes advisories, and approve verified
            traveler stories.
          </p>
          <div className="mt-4 pt-3 border-t border-canvas-border/80 flex items-center justify-between text-[11px] text-slate-400">
            <span>Reports Queue: 0</span>
            <span className="text-brand-teal">Idle Shell</span>
          </div>
        </div>

        <div className="rounded-xl border border-canvas-border bg-canvas-subtle p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-lg bg-canvas-card p-2 border border-canvas-border text-emerald-400">
              <Activity className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">API Health & Probes</h2>
              <span className="text-[10px] uppercase tracking-wider text-slate-400">
                Liveness / Readiness
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Examines backend process memory, database ping status, and request-id correlations.
          </p>
          <div className="mt-4 pt-3 border-t border-canvas-border/80 flex items-center justify-between text-[11px]">
            <a
              href="http://localhost:4000/api/v1/health"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-teal hover:underline font-mono"
            >
              /api/v1/health →
            </a>
            <span className="text-emerald-400">Online</span>
          </div>
        </div>
      </div>
    </div>
  );
}
