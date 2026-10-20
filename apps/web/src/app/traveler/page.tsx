import React from 'react';
import { WorkspaceHeader } from '../../components/WorkspaceHeader';
import { Bookmark, Map, User } from 'lucide-react';

export default function TravelerPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-10">
      <WorkspaceHeader
        title="Traveler Personal Hub"
        subtitle="Manage saved journeys, bookmark regional itineraries, record travel journals, and customize travel preferences."
        badgeText="Traveler Workspace"
        upcomingFeatures={[
          'Authentication & session management (Phase 1)',
          'Saved journeys & bookmarked destinations list (Phase 1)',
          'Travel passport with visited regions & altitude stamps (Phase 2)',
          'Member journal publisher with photo uploads (Phase 2)',
          'Personalized currency & budget preferences (Phase 2)',
        ]}
      />

      {/* Placeholder Workspace Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-xl border border-canvas-border bg-canvas-subtle p-6 flex flex-col items-center justify-center text-center py-12">
          <Bookmark className="h-8 w-8 text-slate-400 mb-3" />
          <h2 className="text-base font-medium text-white">Saved Destinations</h2>
          <p className="mt-1 text-xs text-slate-400 max-w-xs">
            Your pinned itineraries and cultural guides will appear here once traveler profiles are
            active in Phase 1.
          </p>
          <span className="mt-4 rounded bg-canvas-card px-2.5 py-1 text-[11px] font-mono text-slate-400 border border-canvas-border">
            Status: Reserved Shell
          </span>
        </div>

        <div className="rounded-xl border border-canvas-border bg-canvas-subtle p-6 flex flex-col items-center justify-center text-center py-12">
          <Map className="h-8 w-8 text-slate-400 mb-3" />
          <h2 className="text-base font-medium text-white">Active Itineraries</h2>
          <p className="mt-1 text-xs text-slate-400 max-w-xs">
            Real-time day-by-day travel schedules, bookings, and route notes will sync across your
            devices.
          </p>
          <span className="mt-4 rounded bg-canvas-card px-2.5 py-1 text-[11px] font-mono text-slate-400 border border-canvas-border">
            Status: Reserved Shell
          </span>
        </div>

        <div className="rounded-xl border border-canvas-border bg-canvas-subtle p-6 flex flex-col items-center justify-center text-center py-12">
          <User className="h-8 w-8 text-slate-400 mb-3" />
          <h2 className="text-base font-medium text-white">Traveler Identity</h2>
          <p className="mt-1 text-xs text-slate-400 max-w-xs">
            Verified traveler credentials, dietary constraints, and preferred travel pace settings.
          </p>
          <span className="mt-4 rounded bg-canvas-card px-2.5 py-1 text-[11px] font-mono text-slate-400 border border-canvas-border">
            Status: Reserved Shell
          </span>
        </div>
      </div>
    </div>
  );
}
