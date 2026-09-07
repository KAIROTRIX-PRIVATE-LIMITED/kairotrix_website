import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { WorkHero } from '@/components/work/WorkHero';
import { WorkGrid } from '@/components/work/WorkGrid';
import { WorkCapabilities } from '@/components/work/WorkCapabilities';
import { WorkCTA } from '@/components/work/WorkCTA';

export const metadata: Metadata = {
  title: 'Work & Technical Capability Proof — KAIROTRIX',
  description:
    'Explore KAIROTRIX’s verified production builds, exploratory R&D experiments, interactive technical demonstrations, and engineering invariants across AI, software engineering, automation, and data systems.',
  keywords: [
    'KAIROTRIX work',
    'AI agent systems',
    'enterprise RAG engine',
    'fintech trading portal',
    'low-latency telemetry',
    'workflow automation bridge',
    'technical demonstrations',
    'software engineering proof',
  ],
  openGraph: {
    title: 'Work & Technical Capability Proof — KAIROTRIX',
    description:
      'We don’t just claim capability — we demonstrate it. Explore our deployed production systems, technical experiments, and live demonstrations.',
    type: 'website',
  },
};

export default function WorkPage() {
  return (
    <main className="w-full min-h-screen bg-neutral-0">
      <WorkHero />
      <Suspense
        fallback={
          <div className="w-full py-24 flex items-center justify-center">
            <div className="flex items-center gap-3 font-tech text-xs uppercase tracking-widest text-neutral-500">
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
              <span>Loading Specimen Repository...</span>
            </div>
          </div>
        }
      >
        <WorkGrid />
      </Suspense>
      <WorkCapabilities />
      <WorkCTA />
    </main>
  );
}
