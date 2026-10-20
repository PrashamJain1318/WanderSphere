import type { Metadata } from 'next';
import '../styles/globals.css';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const metadata: Metadata = {
  title: 'WanderSphere — Worldwide Travel Community & Itinerary Planner',
  description:
    'Discover the world. Share your journey. Plan every detail. A production-oriented travel platform launching in India first.',
  keywords: [
    'travel planner',
    'itinerary builder',
    'india travel',
    'travel community',
    'budget travel engine',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-canvas font-sans text-slate-100 flex flex-col selection:bg-brand-amber selection:text-canvas">
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
