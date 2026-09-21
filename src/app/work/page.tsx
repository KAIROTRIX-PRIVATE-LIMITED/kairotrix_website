import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { WorkHero } from '@/components/work/WorkHero';
import { WorkGrid } from '@/components/work/WorkGrid';
import { WorkCTA } from '@/components/work/WorkCTA';
import { getActiveWorkSpecimens } from '@/lib/services/workService';

export const metadata: Metadata = {
  title: 'Projects & Work — KAIROTRIX',
  description:
    'A selection of projects, experiments, and technical demonstrations built by KAIROTRIX across software, AI, automation, digital systems, data, and integration.',
  keywords: [
    'KAIROTRIX work',
    'KAIROTRIX projects',
    'AI agent systems',
    'custom software development',
    'web applications',
    'workflow automation',
    'data systems',
    'integration',
  ],
  openGraph: {
    title: 'Projects & Work — KAIROTRIX',
    description:
      'A selection of projects, experiments, and technical demonstrations built by KAIROTRIX across software, AI, automation, digital systems, data, and integration.',
    type: 'website',
  },
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function WorkPage() {
  const specimens = await getActiveWorkSpecimens();

  return (
    <main className="w-full min-h-screen bg-[#FAFAFC] text-neutral-900 selection:bg-brand-500 selection:text-white">
      <WorkHero />
      {/* ─── OVERLAY CURTAIN: SELECTED WORK & STACKING CARDS (Slides UP OVER still Hero) ─── */}
      <div className="relative z-10 w-full bg-[#FAFAFC] shadow-[0_-30px_70px_rgba(0,0,0,0.06)] border-t border-neutral-200/80">
        <Suspense
          fallback={
            <div className="w-full h-screen flex items-center justify-center bg-[#FAFAFC]">
              <div className="flex items-center gap-3 font-tech text-xs uppercase tracking-widest text-neutral-600">
                <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
                <span>Loading Work...</span>
              </div>
            </div>
          }
        >
          <WorkGrid initialSpecimens={specimens} />
        </Suspense>
        <WorkCTA />
      </div>
    </main>
  );
}
