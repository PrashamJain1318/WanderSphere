'use client';

import React, { useState } from 'react';
import { WorkspaceHeader } from '../../components/WorkspaceHeader';
import { calculateEstimatedBudget, TravelStyle } from '@wandersphere/budget-engine';
import { Calculator } from 'lucide-react';

export default function PlannerPage() {
  const [durationDays, setDurationDays] = useState(7);
  const [travelers, setTravelers] = useState(2);
  const [travelStyle, setTravelStyle] = useState<TravelStyle>('STANDARD');
  const [baseRate, setBaseRate] = useState(2500);

  // Demonstrate deterministic package calculation
  const estimate = calculateEstimatedBudget({
    numberOfTravelers: travelers,
    durationDays,
    travelStyle,
    currency: 'INR',
    baseDailyRatePerPerson: baseRate,
    includeBufferPercentage: 10,
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-10">
      <WorkspaceHeader
        title="Itinerary Planner Engine"
        subtitle="Build day-by-day travel schedules, calculate deterministic budgets, and optimize multi-stop travel routes."
        badgeText="Planner Workspace"
        upcomingFeatures={[
          'Interactive day-by-day itinerary canvas (Phase 1)',
          'Deterministic travel budget engine integration (Phase 0 active demo below)',
          'Multi-modal route optimizer for train, flight, and road (Phase 2)',
          'Export to PDF, calendar, and offline mobile format (Phase 2)',
          'Multi-traveler real-time collaboration (Phase 3)',
        ]}
      />

      {/* Live Phase 0 Integration: Deterministic Budget Engine Preview */}
      <div className="rounded-2xl border border-canvas-border bg-canvas-card p-6 sm:p-8">
        <div className="border-b border-canvas-border/80 pb-4 mb-6">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-teal-light">
            <Calculator className="h-4 w-4" />
            <span>Phase 0 Package Demonstration: @wandersphere/budget-engine</span>
          </div>
          <h2 className="font-serif text-2xl font-medium text-white mt-1">
            Deterministic Travel Budget Calculator
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            This live widget exercises the verified `@wandersphere/budget-engine` monorepo package.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls */}
          <div className="lg:col-span-5 space-y-5">
            <div>
              <label
                htmlFor="durationDays"
                className="block text-xs font-medium text-slate-300 mb-1"
              >
                Duration (Days): <span className="font-mono text-white">{durationDays}</span>
              </label>
              <input
                id="durationDays"
                type="range"
                min="1"
                max="30"
                value={durationDays}
                onChange={(e) => setDurationDays(parseInt(e.target.value, 10))}
                className="w-full accent-brand-amber cursor-pointer"
              />
            </div>

            <div>
              <label htmlFor="travelers" className="block text-xs font-medium text-slate-300 mb-1">
                Travelers Count: <span className="font-mono text-white">{travelers}</span>
              </label>
              <input
                id="travelers"
                type="range"
                min="1"
                max="10"
                value={travelers}
                onChange={(e) => setTravelers(parseInt(e.target.value, 10))}
                className="w-full accent-brand-amber cursor-pointer"
              />
            </div>

            <div>
              <label htmlFor="baseRate" className="block text-xs font-medium text-slate-300 mb-1">
                Base Daily Rate per Person (₹ INR):{' '}
                <span className="font-mono text-white">₹{baseRate.toLocaleString('en-IN')}</span>
              </label>
              <input
                id="baseRate"
                type="range"
                min="1000"
                max="10000"
                step="500"
                value={baseRate}
                onChange={(e) => setBaseRate(parseInt(e.target.value, 10))}
                className="w-full accent-brand-amber cursor-pointer"
              />
            </div>

            <div>
              <span className="block text-xs font-medium text-slate-300 mb-1">Travel Style</span>
              <div className="grid grid-cols-2 gap-2">
                {(['BUDGET', 'STANDARD', 'PREMIUM', 'LUXURY'] as TravelStyle[]).map((style) => (
                  <button
                    key={style}
                    type="button"
                    onClick={() => setTravelStyle(style)}
                    className={`rounded-lg py-2 px-3 text-xs font-medium border transition-colors ${
                      travelStyle === style
                        ? 'border-brand-amber bg-brand-amber/15 text-brand-amber font-semibold'
                        : 'border-canvas-border bg-canvas text-slate-400 hover:text-white'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results calculation */}
          <div className="lg:col-span-7 rounded-xl border border-canvas-border bg-canvas p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-canvas-border/80 pb-4">
                <div>
                  <span className="text-xs text-slate-400">Total Calculated Estimate</span>
                  <div className="font-serif text-3xl font-medium text-white">
                    ₹{estimate.totalEstimate.toLocaleString('en-IN')}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400">Per Person</span>
                  <div className="font-serif text-xl font-medium text-brand-amber">
                    ₹{estimate.perPersonEstimate.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              {/* Category Breakdown */}
              <div className="mt-6 space-y-2.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Deterministic Category Distribution
                </span>
                {estimate.categoryBreakdowns.map((cat) => (
                  <div key={cat.category} className="space-y-1">
                    <div className="flex justify-between text-xs text-slate-300">
                      <span>{cat.category}</span>
                      <span className="font-mono">
                        ₹{cat.amount.toLocaleString('en-IN')} ({cat.percentage}%)
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-canvas-subtle overflow-hidden">
                      <div
                        className="h-full bg-brand-teal rounded-full"
                        style={{ width: `${cat.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-canvas-border/60 flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span>
                Contingency Buffer (10%): ₹{estimate.contingencyBuffer.toLocaleString('en-IN')}
              </span>
              <span className="text-brand-teal">Formula: Deterministic Pure Function</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
