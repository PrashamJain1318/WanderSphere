import React from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin, Calculator, Users } from 'lucide-react';
import { Destination, CommunityPostPreview } from '@wandersphere/contracts';
import { DestinationCard } from '../components/DestinationCard';
import { CommunityPreviewCard } from '../components/CommunityPreviewCard';
import { GlobeBoundary } from '../components/GlobeBoundary';

const SAMPLE_DESTINATIONS: Destination[] = [
  {
    id: 'ladakh-01',
    name: 'Ladakh High Passes',
    country: 'India',
    stateOrRegion: 'Ladakh UT',
    category: 'ADVENTURE',
    region: 'INDIA_NORTH',
    tagline: 'High-altitude monasteries, turquoise glacial lakes, and raw Himalayan passes.',
    description:
      'Traverse Khardung La and Chang La, camp beneath pristine night skies by Pangong Tso, and explore ancient Buddhist gompas perched on dramatic cliffs.',
    estimatedDailyBudgetInr: 3500,
    bestTimeToVisit: 'June to September',
    isIndiaFeatured: true,
  },
  {
    id: 'kerala-02',
    name: 'Kerala Backwaters & Alleppey',
    country: 'India',
    stateOrRegion: 'Kerala',
    category: 'COASTAL',
    region: 'INDIA_SOUTH',
    tagline:
      'Tranquil palm-fringed lagoons, traditional kettuvallam boats, and coastal spice groves.',
    description:
      'Glide through serene waterways, savor authentic Malabar coastal cuisine, and experience gentle Ayurvedic wellness traditions along the Arabian Sea.',
    estimatedDailyBudgetInr: 2800,
    bestTimeToVisit: 'October to March',
    isIndiaFeatured: true,
  },
  {
    id: 'rajasthan-03',
    name: 'Jaisalmer & The Thar Desert',
    country: 'India',
    stateOrRegion: 'Rajasthan',
    category: 'HERITAGE',
    region: 'INDIA_WEST',
    tagline: 'Golden sandstone ramparts, desert dunes, and timeless Rajput architecture.',
    description:
      'Step inside the living Sonar Qila fort, listen to Rajasthani folk musicians around evening desert campfires, and discover intricate havelis.',
    estimatedDailyBudgetInr: 2400,
    bestTimeToVisit: 'November to February',
    isIndiaFeatured: true,
  },
  {
    id: 'meghalaya-04',
    name: 'Meghalaya Living Root Bridges',
    country: 'India',
    stateOrRegion: 'Meghalaya',
    category: 'NATURE',
    region: 'INDIA_NORTHEAST',
    tagline: 'Bio-engineered double-decker root bridges, limestone caves, and roaring waterfalls.',
    description:
      'Trek through lush subtropical rainforests in Cherrapunji and Mawlynnong, discovering ingenious bio-architecture nurtured over generations by the Khasi people.',
    estimatedDailyBudgetInr: 2200,
    bestTimeToVisit: 'October to April',
    isIndiaFeatured: true,
  },
  {
    id: 'kyoto-05',
    name: 'Kyoto Historic Temples',
    country: 'Japan',
    stateOrRegion: 'Kansai',
    category: 'HERITAGE',
    region: 'INTERNATIONAL_ASIA',
    tagline: 'Centuries-old wooden shrines, bamboo groves, and traditional tea ceremonies.',
    description:
      'Wander through Gion historic alleys, contemplate zen gardens at Ryoan-ji, and stroll beneath thousands of vermilion torii gates at Fushimi Inari.',
    estimatedDailyBudgetInr: 8500,
    bestTimeToVisit: 'March to May & Oct to Nov',
    isIndiaFeatured: false,
  },
  {
    id: 'amalfi-06',
    name: 'Amalfi Maritime Cliffs',
    country: 'Italy',
    stateOrRegion: 'Campania',
    category: 'COASTAL',
    region: 'INTERNATIONAL_EUROPE',
    tagline: 'Pastel cliffside villages, lemon terraces, and sparkling Mediterranean coves.',
    description:
      'Hike the Path of the Gods high above the Tyrrhenian Sea, cruise past Positano grottos, and sample handcrafted sfogliatella in seaside piazzas.',
    estimatedDailyBudgetInr: 14000,
    bestTimeToVisit: 'May to September',
    isIndiaFeatured: false,
  },
];

const SAMPLE_COMMUNITY_STORIES: CommunityPostPreview[] = [
  {
    id: 'story-01',
    title: 'Navigating the Konkan Railway in Peak Monsoon',
    authorName: 'Arjun Nambiar',
    authorHandle: 'arjuntravels',
    destinationName: 'Konkan Coast, India',
    travelDurationDays: 6,
    snippet:
      'There is nothing quite like watching emerald green Western Ghats waterfalls plunge beside your train window between Ratnagiri and Madgaon. Here are the exact trains, stops, and homestays I used.',
    likesCount: 142,
    isVerifiedStory: true,
    publishedDate: '2026-09-12',
  },
  {
    id: 'story-02',
    title: 'Solo Bikepacking From Manali to Zanskar',
    authorName: 'Tanya Sen',
    authorHandle: 'tanyas_tracks',
    destinationName: 'Zanskar Valley, India',
    travelDurationDays: 10,
    snippet:
      'The new Shinku La road opens up untouched terrain, but altitude acclimatization cannot be rushed. My breakdown covers fuel stops, basic homestays, and realistic gear requirements.',
    likesCount: 289,
    isVerifiedStory: true,
    publishedDate: '2026-08-28',
  },
  {
    id: 'story-03',
    title: 'A Culinary Trail Through Old Delhi and Varanasi',
    authorName: 'Devansh Roy',
    authorHandle: 'streetfeasts',
    destinationName: 'Delhi & Varanasi, India',
    travelDurationDays: 5,
    snippet:
      'From Daulat ki Chaat in Chawri Bazar to morning malaiyo near Dashashwamedh Ghat, here is how to navigate ancient lanes respectfully while eating like royalty on a ₹1,200 daily budget.',
    likesCount: 310,
    isVerifiedStory: true,
    publishedDate: '2026-10-04',
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col gap-20 pb-24">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-12 md:pt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            {/* India launch badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-canvas-border bg-canvas-card px-4 py-1.5 text-xs font-medium text-slate-300 mb-6 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-brand-amber animate-pulse" />
              <span>Worldwide Travel Community • Launching in India First</span>
            </div>

            {/* Main headline */}
            <h1 className="max-w-4xl font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-white leading-[1.1]">
              Discover the world. <br className="hidden sm:inline" />
              <span className="italic text-brand-amber">Share your journey.</span> <br />
              Plan every detail.
            </h1>

            {/* Subtitle */}
            <p className="mt-6 max-w-2xl text-base sm:text-lg text-slate-300 font-sans leading-relaxed">
              WanderSphere combines verified cultural itineraries, deterministic budgeting, and
              community-verified stories for travelers seeking authentic journeys across the Indian
              subcontinent and worldwide.
            </p>

            {/* Call to actions */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/planner"
                className="inline-flex items-center gap-2 rounded-lg bg-brand-amber px-6 py-3.5 text-sm font-semibold text-canvas transition-all hover:bg-brand-amber-light hover:shadow-lg hover:shadow-brand-amber/20 focus-visible:ring-2 focus-visible:ring-brand-amber"
              >
                <span>Launch Itinerary Planner</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#destinations"
                className="inline-flex items-center gap-2 rounded-lg border border-canvas-border bg-canvas-card px-6 py-3.5 text-sm font-semibold text-slate-200 transition-colors hover:bg-canvas-subtle hover:text-white"
              >
                <span>Explore Curated Destinations</span>
              </Link>
            </div>

            {/* Value props strip */}
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-4xl text-left border-t border-canvas-border/80 pt-8">
              <div className="p-3">
                <span className="font-serif text-lg font-medium text-white block">Phase 0</span>
                <span className="text-xs text-slate-400">Foundation Ready</span>
              </div>
              <div className="p-3">
                <span className="font-serif text-lg font-medium text-white block">
                  INR & Multi-Curr
                </span>
                <span className="text-xs text-slate-400">Budget Calculations</span>
              </div>
              <div className="p-3">
                <span className="font-serif text-lg font-medium text-white block">Zero Fakes</span>
                <span className="text-xs text-slate-400">Verified Travel Data</span>
              </div>
              <div className="p-3">
                <span className="font-serif text-lg font-medium text-white block">App Router</span>
                <span className="text-xs text-slate-400">Next.js & TypeScript</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Three.js Globe Boundary (Reserved Component) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <GlobeBoundary />
      </section>

      {/* 3. Destination Discovery Area */}
      <section id="destinations" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-teal-light mb-2">
              <MapPin className="h-3.5 w-3.5" />
              <span>Curated Destinations</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-white tracking-tight">
              India First, Worldwide Ready
            </h2>
            <p className="mt-2 text-sm text-slate-300 max-w-xl">
              Authentic journeys vetted for seasonality, accessibility, and honest daily cost
              breakdowns in Indian Rupees (₹).
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="inline-block h-2 w-2 rounded-full bg-brand-teal" />
            <span>Showing {SAMPLE_DESTINATIONS.length} Curated Guides</span>
          </div>
        </div>

        {/* Destination grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SAMPLE_DESTINATIONS.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      </section>

      {/* 4. Travel Community Preview */}
      <section id="community" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="rounded-2xl border border-canvas-border bg-canvas-subtle p-8 sm:p-12">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-amber mb-2">
                <Users className="h-3.5 w-3.5" />
                <span>Travel Community Preview</span>
              </div>
              <h2 className="font-serif text-3xl font-medium text-white tracking-tight">
                Dispatches From The Trail
              </h2>
              <p className="mt-2 text-sm text-slate-300 max-w-xl">
                Real journeys from fellow travelers. In Phase 0, these preview cards demonstrate the
                editorial content format before community publishing opens in Phase 1.
              </p>
            </div>

            <div className="rounded-lg bg-canvas border border-canvas-border px-3 py-1.5 text-xs text-slate-400">
              <span className="font-semibold text-slate-200">Phase 0 Spec:</span> Clearly Labeled
              Previews
            </div>
          </div>

          {/* Stories grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SAMPLE_COMMUNITY_STORIES.map((post) => (
              <CommunityPreviewCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Trip Planning Call to Action */}
      <section id="planner" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="relative overflow-hidden rounded-2xl border border-canvas-border bg-gradient-to-r from-canvas-card via-canvas-subtle to-canvas-card p-8 sm:p-12 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-teal/15 border border-brand-teal/30 px-3 py-1 text-xs font-medium text-brand-teal-light mb-4">
                <Calculator className="h-3.5 w-3.5" />
                <span>Deterministic Travel Cost Engine</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-medium text-white tracking-tight">
                Plan with precision, not guesswork.
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                WanderSphere’s dedicated budget engine calculates predictable travel costs
                incorporating accommodation, regional transport, food, activities, and contingency
                buffers. No black-box algorithms or hidden estimates.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/planner"
                  className="inline-flex items-center gap-2 rounded-lg bg-brand-amber px-6 py-3 text-sm font-semibold text-canvas hover:bg-brand-amber-light transition-colors"
                >
                  <span>Open Planner Shell</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/traveler"
                  className="inline-flex items-center gap-2 rounded-lg border border-canvas-border bg-canvas px-6 py-3 text-sm font-semibold text-slate-200 hover:text-white transition-colors"
                >
                  <span>Explore Traveler Hub</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 rounded-xl border border-canvas-border bg-canvas p-6 text-xs space-y-3">
              <h3 className="font-semibold text-white uppercase tracking-wider text-[11px]">
                Engine Specifications
              </h3>
              <div className="flex justify-between border-b border-canvas-border/60 pb-2">
                <span className="text-slate-400">Launch Currencies:</span>
                <span className="font-mono text-slate-200">INR, USD, EUR, GBP</span>
              </div>
              <div className="flex justify-between border-b border-canvas-border/60 pb-2">
                <span className="text-slate-400">Cost Categories:</span>
                <span className="font-mono text-slate-200">5 Distinct Buckets</span>
              </div>
              <div className="flex justify-between border-b border-canvas-border/60 pb-2">
                <span className="text-slate-400">Contingency Buffer:</span>
                <span className="font-mono text-slate-200">User-Configurable (10%)</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-slate-400">Calculation Mode:</span>
                <span className="font-mono text-brand-teal">Pure Deterministic</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
