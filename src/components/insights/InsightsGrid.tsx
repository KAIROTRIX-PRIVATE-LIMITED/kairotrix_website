'use client';

import React, { useMemo } from 'react';
import {
  Cpu,
  BookOpen,
  FileText,
  FlaskConical,
} from 'lucide-react';
import {
  INSIGHT_SPECIMENS,
} from '@/data/insightsData';
import { InsightsCard } from './InsightsCard';
import { InsightsFeatured } from './InsightsFeatured';

export function InsightsGrid() {
  // Section 1: System Blueprints
  const blueprintSpecimens = useMemo(() => {
    return INSIGHT_SPECIMENS.filter((s) => s.category === 'blueprint');
  }, []);

  // Section 2: Case Studies
  const caseStudySpecimens = useMemo(() => {
    return INSIGHT_SPECIMENS.filter((s) => s.category === 'case-study');
  }, []);

  // Section 3: Articles & Blog
  const articleSpecimens = useMemo(() => {
    return INSIGHT_SPECIMENS.filter((s) => s.category === 'article');
  }, []);

  // Section 4: Research & Whitepapers
  const researchSpecimens = useMemo(() => {
    return INSIGHT_SPECIMENS.filter((s) => s.category === 'research');
  }, []);

  // Flagship specimen for Featured Banner
  const flagshipSpecimen = useMemo(() => {
    return INSIGHT_SPECIMENS.find((s) => s.featured) || INSIGHT_SPECIMENS[0];
  }, []);

  return (
    <div id="insights-sections" className="w-full bg-neutral-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* ─── FEATURED FLAGSHIP BLUEPRINT ─── */}
        <InsightsFeatured specimen={flagshipSpecimen} />

        {/* ─── SECTION 1: SYSTEM BLUEPRINTS ─── */}
        <div id="blueprints" className="scroll-mt-36 pt-4 mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 mb-8 border-b border-neutral-200/80">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(147,51,234,0.6)]" />
                <span className="font-tech text-xs tracking-[0.25em] font-semibold text-purple-600 uppercase">
                  05.1 // SYSTEM BLUEPRINTS
                </span>
                <span className="font-mono text-xs px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 font-semibold">
                  {blueprintSpecimens.length}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950">
                Production System Schematics
              </h2>
              <p className="text-sm text-neutral-600 mt-1 max-w-2xl font-normal">
                Architecture diagrams, finite-state machine workflows, schema contracts, and zero-loss integration pipelines.
              </p>
            </div>
            <div className="text-xs text-neutral-600 font-tech">
              BATTLE-TESTED ARCHITECTURES
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {blueprintSpecimens.map((specimen, idx) => (
              <InsightsCard key={specimen.id} specimen={specimen} index={idx} />
            ))}
          </div>
        </div>

        {/* ─── SECTION 2: CASE STUDIES ─── */}
        <div id="case-studies" className="scroll-mt-36 pt-4 mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 mb-8 border-b border-neutral-200/80">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                <span className="font-tech text-xs tracking-[0.25em] font-semibold text-emerald-600 uppercase">
                  05.2 // CASE STUDIES
                </span>
                <span className="font-mono text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
                  {caseStudySpecimens.length}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950">
                Technical Retrospectives
              </h2>
              <p className="text-sm text-neutral-600 mt-1 max-w-2xl font-normal">
                Honest architectural breakdowns of real engineering transformations, legacy migrations, and measured business impact.
              </p>
            </div>
            <div className="text-xs text-neutral-600 font-tech">
              MEASURED OPERATIONAL IMPACT
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {caseStudySpecimens.map((specimen, idx) => (
              <InsightsCard key={specimen.id} specimen={specimen} index={idx} />
            ))}
          </div>
        </div>

        {/* ─── SECTION 3: ARTICLES & BLOG ─── */}
        <div id="articles" className="scroll-mt-36 pt-4 mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 mb-8 border-b border-neutral-200/80">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                <span className="font-tech text-xs tracking-[0.25em] font-semibold text-blue-600 uppercase">
                  05.3 // ARTICLES & BLOG
                </span>
                <span className="font-mono text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-semibold">
                  {articleSpecimens.length}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950">
                Engineering Essays & Perspectives
              </h2>
              <p className="text-sm text-neutral-600 mt-1 max-w-2xl font-normal">
                Technical commentary on modern web engineering, real-time telemetry, SaaS sprawl economics, and custom software strategy.
              </p>
            </div>
            <div className="text-xs text-neutral-600 font-tech">
              CODE-FIRST PERSPECTIVES
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {articleSpecimens.map((specimen, idx) => (
              <InsightsCard key={specimen.id} specimen={specimen} index={idx} />
            ))}
          </div>
        </div>

        {/* ─── SECTION 4: RESEARCH & WHITEPAPERS ─── */}
        <div id="research" className="scroll-mt-36 pt-4 mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 mb-8 border-b border-neutral-200/80">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
                <span className="font-tech text-xs tracking-[0.25em] font-semibold text-amber-600 uppercase">
                  05.4 // RESEARCH & WHITEPAPERS
                </span>
                <span className="font-mono text-xs px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-semibold">
                  {researchSpecimens.length}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950">
                Empirical Evaluations & Benchmarks
              </h2>
              <p className="text-sm text-neutral-600 mt-1 max-w-2xl font-normal">
                Rigorous testing of AI retrieval algorithms, KV caching performance, latency distributions, and infrastructure token costs.
              </p>
            </div>
            <div className="text-xs text-neutral-600 font-tech">
              REPRODUCIBLE BENCHMARKS
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {researchSpecimens.map((specimen, idx) => (
              <InsightsCard key={specimen.id} specimen={specimen} index={idx} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
