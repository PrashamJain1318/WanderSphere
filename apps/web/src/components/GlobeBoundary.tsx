import React from 'react';
import { Globe, Layers, Navigation } from 'lucide-react';

interface GlobeBoundaryProps {
  className?: string;
}

/**
 * Architectural Boundary for Three.js Globe.
 * In Phase 0, this boundary reserves the layout dimensions, coordinates, and fallback UI
 * without pulling in Three.js bundles until later phases.
 */
export function GlobeBoundary({ className = '' }: GlobeBoundaryProps) {
  return (
    <section
      aria-label="Interactive Globe Component Boundary"
      className={`relative overflow-hidden rounded-2xl border border-canvas-border bg-gradient-to-b from-canvas-card to-canvas-subtle p-8 shadow-2xl ${className}`}
    >
      <div className="flex flex-col items-center justify-center text-center py-12 px-4">
        {/* Placeholder decorative rings */}
        <div className="relative mb-6 flex h-32 w-32 items-center justify-center rounded-full border border-canvas-border/80 bg-canvas/60 shadow-inner">
          <div className="absolute inset-2 rounded-full border border-dashed border-brand-amber/30 animate-spin-slow" />
          <Globe className="h-12 w-12 text-brand-amber/80" />
          <div className="absolute -top-1 right-2 flex items-center gap-1 rounded-full bg-brand-teal/20 px-2 py-0.5 text-[10px] font-medium text-brand-teal-light border border-brand-teal/40">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-teal animate-pulse" />
            20.5937° N, 78.9629° E
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 rounded-full border border-canvas-border bg-canvas px-3 py-1 text-xs text-slate-300 mb-3">
          <Layers className="h-3 w-3 text-brand-amber" />
          <span className="font-mono text-[11px]">Component Boundary: 3D Planetary Canvas</span>
        </div>

        <h3 className="font-serif text-2xl text-white font-medium">
          Global Route Projection System
        </h3>
        <p className="mt-2 max-w-md text-sm text-slate-300 leading-relaxed">
          This reserved boundary will host our high-performance WebGL / Three.js interactive globe
          in Phase 1, rendering real-time waypoint arcs, regional weather overlays, and topological
          elevations.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <Navigation className="h-3.5 w-3.5 text-brand-amber" />
            <span>Center Node: New Delhi (DEL)</span>
          </div>
          <span className="text-canvas-border">•</span>
          <span>Deferred Three.js bundle (Phase 1)</span>
          <span className="text-canvas-border">•</span>
          <span className="text-brand-teal">Zero Hydration Bottlenecks</span>
        </div>
      </div>
    </section>
  );
}
