'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Compass, Menu, X, ArrowUpRight } from 'lucide-react';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-canvas-border/80 bg-canvas/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand identity */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="group flex items-center gap-3 transition-opacity hover:opacity-90"
            aria-label="WanderSphere Home"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-canvas-card border border-canvas-border text-brand-amber shadow-sm">
              <Compass className="h-5 w-5 transition-transform duration-300 group-hover:rotate-45" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl tracking-tight text-white font-medium">
                WanderSphere
              </span>
              <span className="text-[10px] uppercase tracking-widest text-slate-400">
                India & Worldwide
              </span>
            </div>
          </Link>

          {/* Desktop primary links */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Main Navigation">
            <Link
              href="/#destinations"
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Destinations
            </Link>
            <Link
              href="/#community"
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Community
            </Link>
            <Link
              href="/#planner"
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Itinerary Planner
            </Link>
          </nav>
        </div>

        {/* Workspace switchers (clearly labeled Phase 0 shells) */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="flex items-center rounded-full bg-canvas-subtle p-1 border border-canvas-border">
            <Link
              href="/traveler"
              className="rounded-full px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-canvas-card hover:text-white transition-all"
            >
              Traveler Shell
            </Link>
            <Link
              href="/planner"
              className="rounded-full px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-canvas-card hover:text-white transition-all"
            >
              Planner Shell
            </Link>
            <Link
              href="/admin"
              className="rounded-full px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-canvas-card hover:text-white transition-all"
            >
              Admin Shell
            </Link>
          </div>

          <a
            href="http://localhost:4000/api/v1/health"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-brand-teal/40 bg-brand-teal/10 px-3 py-1.5 text-xs font-medium text-brand-teal-light hover:bg-brand-teal/20 transition-colors"
          >
            <span>API Health</span>
            <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-md p-2 text-slate-400 hover:bg-canvas-card hover:text-white"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="border-b border-canvas-border bg-canvas-subtle px-4 pt-2 pb-6 md:hidden">
          <nav className="flex flex-col gap-3" aria-label="Mobile Navigation">
            <Link
              href="/#destinations"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-base font-medium text-slate-300 hover:text-white"
            >
              Destinations
            </Link>
            <Link
              href="/#community"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-base font-medium text-slate-300 hover:text-white"
            >
              Community
            </Link>
            <Link
              href="/#planner"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-base font-medium text-slate-300 hover:text-white"
            >
              Itinerary Planner
            </Link>
            <hr className="my-2 border-canvas-border" />
            <span className="text-xs uppercase tracking-wider text-slate-400">Workspaces</span>
            <Link
              href="/traveler"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-slate-300 hover:text-white"
            >
              Traveler Workspace Shell
            </Link>
            <Link
              href="/planner"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-slate-300 hover:text-white"
            >
              Planner Workspace Shell
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-slate-300 hover:text-white"
            >
              Admin Workspace Shell
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
