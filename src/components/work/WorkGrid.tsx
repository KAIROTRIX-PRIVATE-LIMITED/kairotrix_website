'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Terminal,
  Cpu,
  Layers,
  Sparkles,
  FlaskConical,
  FolderGit2,
  RotateCcw,
} from 'lucide-react';
import { WORK_SPECIMENS, WorkSpecimen, WORK_DISCIPLINES } from '@/data/workData';
import { WorkCard } from './WorkCard';
import { WorkFilterBar } from './WorkFilterBar';

export function WorkGrid() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read initial filter values from URL query parameters
  const initialDiscipline = searchParams.get('area') || 'all';
  const [activeDiscipline, setActiveDiscipline] = useState<string>(initialDiscipline);
  const [activeSection, setActiveSection] = useState<string>('all');

  // Sync state if URL query params change
  useEffect(() => {
    const urlDiscipline = searchParams.get('area') || 'all';
    setActiveDiscipline(urlDiscipline);
  }, [searchParams]);

  // Update URL helper
  const handleDisciplineChange = (discipline: string) => {
    setActiveDiscipline(discipline);
    const params = new URLSearchParams();
    if (discipline !== 'all') params.set('area', discipline);

    const queryString = params.toString();
    const newPath = queryString ? `/work?${queryString}` : '/work';
    router.replace(newPath, { scroll: false });
  };

  const handleReset = () => {
    setActiveDiscipline('all');
    router.replace('/work', { scroll: false });
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'all') {
      const el = document.getElementById('work-sections');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filtered specimens across all categories
  const filteredSpecimens = useMemo(() => {
    return WORK_SPECIMENS.filter((specimen) => {
      return activeDiscipline === 'all' || specimen.disciplineId === activeDiscipline;
    });
  }, [activeDiscipline]);

  // Section 1: Production Projects
  const projectSpecimens = useMemo(() => {
    return filteredSpecimens.filter((s) => s.type === 'project');
  }, [filteredSpecimens]);

  // Section 2: Engineering Experiments
  const experimentSpecimens = useMemo(() => {
    return filteredSpecimens.filter((s) => s.type === 'experiment');
  }, [filteredSpecimens]);

  // Section 3: Technical Demonstrations
  const demoSpecimens = useMemo(() => {
    return filteredSpecimens.filter((s) => s.type === 'demo');
  }, [filteredSpecimens]);

  // Flagship specimen for Technical Demonstrations
  const flagshipSpecimen = useMemo(() => {
    return demoSpecimens.find((s) => s.featured);
  }, [demoSpecimens]);

  const secondaryDemoSpecimens = useMemo(() => {
    if (flagshipSpecimen) {
      return demoSpecimens.filter((s) => s.id !== flagshipSpecimen.id);
    }
    return demoSpecimens;
  }, [demoSpecimens, flagshipSpecimen]);

  return (
    <div id="work-sections" className="w-full bg-neutral-0">
      {/* ─── STICKY SUB-NAVIGATION & DISCIPLINE FILTER BAR ─── */}
      <div className="sticky top-[68px] sm:top-[74px] z-40 bg-neutral-0/90 backdrop-blur-xl border-b border-neutral-200/80 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <WorkFilterBar
            activeSection={activeSection}
            activeDiscipline={activeDiscipline}
            projectCount={projectSpecimens.length}
            experimentCount={experimentSpecimens.length}
            demoCount={demoSpecimens.length}
            totalResults={filteredSpecimens.length}
            totalAll={WORK_SPECIMENS.length}
            onSectionJump={scrollToSection}
            onDisciplineChange={handleDisciplineChange}
            onReset={handleReset}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-24 sm:space-y-32">
        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 01: PRODUCTION PROJECTS (id="projects")
        ════════════════════════════════════════════════════════════════════ */}
        <section id="projects" className="scroll-mt-36">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-neutral-200/80">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold tracking-wider font-tech uppercase mb-3">
                <FolderGit2 className="w-3.5 h-3.5" />
                04.1 // PRODUCTION SOFTWARE
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-neutral-900 uppercase">
                PRODUCTION PROJECTS
              </h2>
              <p className="mt-2 text-xs sm:text-sm font-tech text-neutral-500 uppercase tracking-wider">
                Full-stack production platforms, high-throughput engines, and deployed client deliverables.
              </p>
            </div>

            <div className="text-right">
              <span className="font-mono text-xs text-neutral-400 bg-neutral-100 px-3 py-1.5 rounded-lg">
                {projectSpecimens.length} DEPLOYED BUILDS
              </span>
            </div>
          </div>

          {projectSpecimens.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projectSpecimens.map((specimen, idx) => (
                <WorkCard key={specimen.id} specimen={specimen} index={idx} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center rounded-2xl bg-neutral-50 border border-neutral-200/60">
              <p className="font-tech text-xs text-neutral-500 uppercase tracking-wider">
                No production projects matching selected discipline.
              </p>
            </div>
          )}
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 02: ENGINEERING EXPERIMENTS (id="experiments")
        ════════════════════════════════════════════════════════════════════ */}
        <section id="experiments" className="scroll-mt-36">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-neutral-200/80">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold tracking-wider font-tech uppercase mb-3">
                <FlaskConical className="w-3.5 h-3.5" />
                04.2 // R&D EXPERIMENTS
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-neutral-900 uppercase">
                ENGINEERING EXPERIMENTS
              </h2>
              <p className="mt-2 text-xs sm:text-sm font-tech text-neutral-500 uppercase tracking-wider">
                Exploratory R&D prototypes evaluating emerging AI architectures, deterministic DAGs, and event bridges.
              </p>
            </div>

            <div className="text-right">
              <span className="font-mono text-xs text-neutral-400 bg-neutral-100 px-3 py-1.5 rounded-lg">
                {experimentSpecimens.length} R&D SPECIMENS
              </span>
            </div>
          </div>

          {experimentSpecimens.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {experimentSpecimens.map((specimen, idx) => (
                <WorkCard key={specimen.id} specimen={specimen} index={idx} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center rounded-2xl bg-neutral-50 border border-neutral-200/60">
              <p className="font-tech text-xs text-neutral-500 uppercase tracking-wider">
                No engineering experiments matching selected discipline.
              </p>
            </div>
          )}
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 03: TECHNICAL DEMONSTRATIONS (id="demos")
        ════════════════════════════════════════════════════════════════════ */}
        <section id="demos" className="scroll-mt-36">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-neutral-200/80">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold tracking-wider font-tech uppercase mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                04.3 // INTERACTIVE PROOFS
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-neutral-900 uppercase">
                TECHNICAL DEMONSTRATIONS
              </h2>
              <p className="mt-2 text-xs sm:text-sm font-tech text-neutral-500 uppercase tracking-wider">
                Focused proofs of engineering capability, real-time telemetry streaming, and autonomous multi-agent swarms.
              </p>
            </div>

            <div className="text-right">
              <span className="font-mono text-xs text-neutral-400 bg-neutral-100 px-3 py-1.5 rounded-lg">
                {demoSpecimens.length} LIVE DEMONSTRATIONS
              </span>
            </div>
          </div>

          {/* Featured Flagship Showcase inside Demos */}
          {flagshipSpecimen && (
            <div className="mb-10 rounded-3xl bg-gradient-to-b from-neutral-900 to-neutral-950 text-white border border-neutral-800 p-6 sm:p-8 lg:p-10 shadow-xl overflow-hidden relative">
              <div
                className="absolute -top-24 -right-24 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl pointer-events-none"
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
                {/* Video Media Container */}
                <div className="lg:col-span-6 flex flex-col justify-between">
                  <div className="relative aspect-[16/10] rounded-2xl bg-black border border-white/10 overflow-hidden shadow-2xl">
                    {flagshipSpecimen.video && (
                      <video
                        src={flagshipSpecimen.video}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover opacity-85"
                      />
                    )}

                    <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                      <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 font-tech text-[10px] uppercase font-bold text-emerald-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        ACTIVE RUNTIME VERIFICATION
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 z-20">
                      <div className="px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/15">
                        <span className="font-tech text-xs text-brand-400 uppercase font-bold mr-1.5">
                          {flagshipSpecimen.metric}
                        </span>
                        <span className="font-tech text-[11px] text-neutral-300 uppercase">
                          {flagshipSpecimen.metricLabel}
                        </span>
                      </div>
                    </div>
                  </div>

                  {flagshipSpecimen.systemEquation && (
                    <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10 flex flex-wrap items-center justify-between gap-2">
                      <span className="font-tech text-[11px] text-brand-300 uppercase font-semibold">
                        ARCHITECTURE EQUATION:
                      </span>
                      <span className="font-mono text-xs text-neutral-200">
                        {flagshipSpecimen.systemEquation.left}{' '}
                        <span className="text-brand-400 font-bold">{flagshipSpecimen.systemEquation.operator}</span>{' '}
                        {flagshipSpecimen.systemEquation.right}{' '}
                        <span className="text-brand-400 font-bold">=</span>{' '}
                        <strong className="text-white font-bold">{flagshipSpecimen.systemEquation.outcome}</strong>
                      </span>
                    </div>
                  )}
                </div>

                {/* Right Column Details */}
                <div className="lg:col-span-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 rounded-full bg-brand-500/20 border border-brand-500/30 text-brand-300 text-xs font-tech font-bold uppercase tracking-wider">
                        ★ FLAGSHIP PRODUCTION SPECIMEN
                      </span>
                      <span className="font-tech text-xs text-neutral-400 uppercase">
                        {flagshipSpecimen.disciplineName}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white uppercase mb-4 leading-tight">
                      {flagshipSpecimen.title}
                    </h3>

                    <p className="text-sm sm:text-base text-neutral-300 leading-relaxed mb-6 font-normal">
                      {flagshipSpecimen.summary}
                    </p>

                    <div className="space-y-2 mb-6">
                      <span className="font-tech text-xs text-neutral-400 uppercase tracking-wider block mb-2 font-semibold">
                        PRODUCTION DELIVERABLES:
                      </span>
                      {flagshipSpecimen.keyDeliverables.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-200">
                          <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-1.5">
                      {flagshipSpecimen.techStack.map((tech, idx) => (
                        <span
                          key={idx}
                          className="font-tech text-[10px] uppercase font-semibold px-2.5 py-1 rounded-md bg-white/10 border border-white/10 text-neutral-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/work/${flagshipSpecimen.slug}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-tech font-semibold text-xs uppercase tracking-wider transition-colors shadow-md"
                    >
                      <span>View Architecture Spec</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Secondary Demonstrations Grid */}
          {secondaryDemoSpecimens.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {secondaryDemoSpecimens.map((specimen, idx) => (
                <WorkCard key={specimen.id} specimen={specimen} index={idx} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
