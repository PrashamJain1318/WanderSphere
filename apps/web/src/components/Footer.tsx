import React from 'react';
import Link from 'next/link';
import { Compass, Shield, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-canvas-border bg-canvas-subtle text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-canvas-card border border-canvas-border text-brand-amber">
                <Compass className="h-5 w-5" />
              </div>
              <span className="font-serif text-xl tracking-tight text-white font-medium">
                WanderSphere
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-slate-300 leading-relaxed font-sans">
              Discover the world. Share your journey. Plan every detail.
            </p>
            <p className="mt-2 text-xs text-slate-400">
              A modern, production-grade worldwide travel community and itinerary planner launching
              in India first.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs text-brand-amber">
              <MapPin className="h-3.5 w-3.5" />
              <span>Phase 0: Project Foundation • Active India Hub</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Navigation
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/#destinations" className="hover:text-white transition-colors">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="/#community" className="hover:text-white transition-colors">
                  Community Stories
                </Link>
              </li>
              <li>
                <Link href="/#planner" className="hover:text-white transition-colors">
                  Trip Planner
                </Link>
              </li>
            </ul>
          </div>

          {/* Workspaces (Placeholders) */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Workspaces (Phase 0)
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/traveler" className="hover:text-white transition-colors">
                  Traveler Hub Shell
                </Link>
              </li>
              <li>
                <Link href="/planner" className="hover:text-white transition-colors">
                  Planner Engine Shell
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white transition-colors">
                  Admin Console Shell
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal and Support */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Trust & Legal
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <span className="text-slate-400 cursor-not-allowed">
                  Terms of Service (Phase 1)
                </span>
              </li>
              <li>
                <span className="text-slate-400 cursor-not-allowed">Privacy Policy (Phase 1)</span>
              </li>
              <li>
                <span className="text-slate-400 cursor-not-allowed">
                  Community Guidelines (Phase 1)
                </span>
              </li>
              <li>
                <span className="text-slate-400 cursor-not-allowed">
                  Data & Cookies Policy (Phase 1)
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-canvas-border/80 pt-8 sm:flex-row text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} WanderSphere. Built with Next.js, Express & TypeScript.
          </p>
          <div className="flex items-center gap-2 text-slate-400">
            <Shield className="h-3.5 w-3.5 text-brand-teal" />
            <span>Strict Zero-Mock Data Policy • Production Verified</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
