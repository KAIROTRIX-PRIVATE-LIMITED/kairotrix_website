import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { InsightsHero } from '@/components/insights/InsightsHero';
import { InsightsGrid } from '@/components/insights/InsightsGrid';
import { InsightsCTA } from '@/components/insights/InsightsCTA';

export const metadata: Metadata = {
  title: 'Insights, System Blueprints & Engineering Retrospectives — KAIROTRIX',
  description:
    'Explore KAIROTRIX’s technical articles, production system blueprints, engineering case studies, and empirical AI benchmarks. Zero marketing fluff — real architecture.',
  keywords: [
    'KAIROTRIX insights',
    'system blueprints',
    'AI agent architecture',
    'deterministic LLMs',
    'event-driven operations',
    'real-time telemetry Next.js 15',
    'hybrid RAG benchmarks',
    'software engineering retrospectives',
  ],
  openGraph: {
    title: 'Insights, System Blueprints & Engineering Retrospectives — KAIROTRIX',
    description:
      'Thinking, learning, and building in public. Explore our production system schematics, technical retrospectives, and empirical evaluations.',
    type: 'website',
  },
};

export default function InsightsPage() {
  return (
    <main className="w-full min-h-screen bg-neutral-0">
      <InsightsHero />
      <Suspense
        fallback={
          <div className="w-full py-24 flex items-center justify-center">
            <div className="flex items-center gap-3 font-tech text-xs uppercase tracking-widest text-neutral-500">
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
              <span>Loading Knowledge Repository...</span>
            </div>
          </div>
        }
      >
        <InsightsGrid />
      </Suspense>
      <InsightsCTA />
    </main>
  );
}
