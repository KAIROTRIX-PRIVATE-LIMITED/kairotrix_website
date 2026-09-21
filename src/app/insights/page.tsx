import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { InsightsHero } from '@/components/insights/InsightsHero';
import { InsightsGrid } from '@/components/insights/InsightsGrid';
import { InsightsCTA } from '@/components/insights/InsightsCTA';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Articles & Engineering Blog — KAIROTRIX',
  description:
    'Technical articles, architecture breakdowns, and engineering perspectives from KAIROTRIX—documenting how we design, build, and evolve software systems.',
  keywords: [
    'KAIROTRIX articles',
    'engineering blog',
    'AI agent architecture',
    'software engineering',
    'workflow automation',
    'data systems',
    'system architecture',
  ],
  openGraph: {
    title: 'Articles & Engineering Blog — KAIROTRIX',
    description:
      'Technical articles, architecture breakdowns, and engineering perspectives from KAIROTRIX—documenting how we design, build, and evolve software systems.',
    type: 'website',
  },
};

import { getPublishedInsights } from '@/lib/services/insightsService';

export default async function InsightsPage() {
  const insights = await getPublishedInsights();

  return (
    <main className="w-full min-h-screen bg-[#FAFAFC]">
      <InsightsHero totalArticles={insights.length} />
      <Suspense
        fallback={
          <div className="w-full py-24 flex items-center justify-center">
            <div className="flex items-center gap-3 font-tech text-xs uppercase tracking-widest text-neutral-500">
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
              <span>Loading Articles...</span>
            </div>
          </div>
        }
      >
        <InsightsGrid initialInsights={insights} />
      </Suspense>
      <InsightsCTA />
    </main>
  );
}
