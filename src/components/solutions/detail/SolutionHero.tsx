'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ChevronDown,
  ShieldCheck,
  Activity,
  ChevronLeft,
  ChevronRight,
  Terminal,
  Cpu,
} from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { SOLUTIONS_DATA, type SolutionDetail } from '@/data/solutionsData';

interface SolutionHeroProps {
  solution: SolutionDetail;
}

export function SolutionHero({ solution }: SolutionHeroProps) {
  const shouldReduceMotion = useReducedMotion();
  const prevSolution = SOLUTIONS_DATA[solution.prevSlug];
  const nextSolution = SOLUTIONS_DATA[solution.nextSlug];

  // Watermark text dynamically mapped from discipline
  const watermarkText =
    solution.number === '01'
      ? 'INTELLIGENCE'
      : solution.number === '02'
      ? 'ENGINEERING'
      : solution.number === '03'
      ? 'AUTOMATION'
      : 'KAIROTRIX';

  return (
    <section className="relative w-full bg-neutral-0 text-neutral-900 pt-24 pb-8 sm:pt-28 sm:pb-12 lg:pt-28 lg:pb-12 border-b border-neutral-200 overflow-hidden lg:min-h-[calc(100vh-64px)] lg:max-h-[780px] flex flex-col justify-center">
      
      {/* ─── 00. GIANT BACKGROUND WATERMARK TYPOGRAPHY (PLUMFIX SIGNATURE) ─── */}
      <div 
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center overflow-hidden z-0 select-none"
        aria-hidden="true"
      >
        <span className="text-[15vw] font-black font-tech tracking-tighter text-neutral-900/[0.03] leading-none whitespace-nowrap uppercase">
          {watermarkText}
        </span>
      </div>

      {/* ─── AMBIENT PURPLE ATMOSPHERIC GLOWS ─── */}
      <div
        className="pointer-events-none absolute top-1/3 left-4 w-[380px] h-[380px] rounded-full bg-brand-500/8 blur-[140px] z-0"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        
        {/* ─── 01. BREADCRUMBS & DISCIPLINE STATUS ─── */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 sm:mb-6">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-[11px] font-tech font-semibold text-neutral-500 uppercase tracking-wider">
              <li>
                <Link href="/" className="hover:text-brand-600 transition-colors">
                  HOME
                </Link>
              </li>
              <li className="text-neutral-300">/</li>
              <li>
                <Link href="/solutions" className="hover:text-brand-600 transition-colors">
                  SOLUTIONS
                </Link>
              </li>
              <li className="text-neutral-300">/</li>
              <li className="text-brand-600 font-bold truncate max-w-[220px] sm:max-w-none">
                {solution.number} // {solution.categoryTag}
              </li>
            </ol>
          </nav>

          {/* Quick discipline switcher */}
          <div className="flex items-center gap-1.5">
            {prevSolution && (
              <Link
                href={`/solutions/${prevSolution.slug}`}
                title={`Previous: ${prevSolution.title}`}
                className="p-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </Link>
            )}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-tech font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>{solution.statusBadge}</span>
            </div>
            {nextSolution && (
              <Link
                href={`/solutions/${nextSolution.slug}`}
                title={`Next: ${nextSolution.title}`}
                className="p-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>

        {/* ─── 02. SPLIT HERO COMPOSITION (PLUMFIX 1:1 EXECUTION) ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
          
          {/* Left Column: Command & Narrative (7 Columns) */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-4 sm:space-y-5">
            
            {/* Eyebrow Badge */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold tracking-wider font-tech uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
                KAIROTRIX DISCIPLINE // {solution.number}
              </div>
            </div>

            {/* Master Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[2.65rem] xl:text-[3.1rem] font-bold tracking-tight text-neutral-900 leading-[1.08] max-w-2xl">
              <span>{solution.displayHeadline.prefix} </span>
              <span className="gradient-signature-text">{solution.displayHeadline.accent}</span>{' '}
              <span>{solution.displayHeadline.suffix}</span>
            </h1>

            {/* Executive Value Narrative */}
            <p className="text-sm sm:text-[0.95rem] lg:text-base text-neutral-600 leading-relaxed font-normal max-w-xl">
              {solution.executiveSummary}
            </p>

            {/* Action CTAs */}
            <div className="pt-1 flex flex-wrap items-center gap-3.5">
              <Link
                href={`/contact?service=${solution.slug}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-tech font-semibold text-xs uppercase tracking-wider transition-all shadow-lg shadow-brand-500/25 active:scale-[0.98]"
              >
                <span>Book Architecture Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <a
                href="#capabilities"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 border border-neutral-300/80 text-neutral-900 font-tech font-semibold text-xs uppercase tracking-wider transition-all active:scale-[0.98] cursor-pointer"
              >
                <span>Explore Capabilities</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Quick Proof Badges Strip */}
            <div className="pt-3 border-t border-neutral-200 flex flex-wrap items-center gap-4 sm:gap-6 text-[11px] sm:text-xs font-tech text-neutral-500">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                <span>100% Code Ownership</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                <span>{solution.telemetry.sla}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                <span>{solution.telemetry.latency}</span>
              </div>
            </div>

          </div>

          {/* Right Column: Unboxed Levitating 3D Asset + Overlapping Glass Metric Card */}
          <div className="lg:col-span-5 relative flex items-center justify-center w-full min-h-[340px] sm:min-h-[380px] lg:min-h-[420px]">
            
            {/* Centered Optical Purple Ambient Light (Soft & Balanced) */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] sm:w-[380px] sm:h-[380px] rounded-full bg-brand-500/18 blur-[85px] pointer-events-none"
              aria-hidden="true"
            />

            {/* Dynamic Ground Contact Shadow (Reacts with levitation height) */}
            <motion.div
              animate={shouldReduceMotion ? {} : { scale: [1, 0.88, 1], opacity: [0.28, 0.15, 0.28] }}
              transition={{
                duration: 5,
                ease: 'easeInOut',
                repeat: Infinity,
              }}
              className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 w-44 sm:w-56 h-4.5 rounded-[100%] bg-neutral-950/15 blur-md pointer-events-none z-0"
              aria-hidden="true"
            />

            {/* Levitating 3D Discipline Artwork */}
            <motion.div
              animate={shouldReduceMotion ? {} : { y: [0, -12, 0] }}
              transition={{
                duration: 5,
                ease: 'easeInOut',
                repeat: Infinity,
              }}
              className="relative z-10 flex items-center justify-center w-full"
            >
              <Image
                src={solution.image}
                alt={`${solution.title} 3D visualization`}
                width={460}
                height={460}
                priority
                className="max-h-[285px] sm:max-h-[345px] lg:max-h-[385px] w-auto object-contain drop-shadow-[0_14px_28px_rgba(147,51,234,0.22)] drop-shadow-[0_6px_12px_rgba(0,0,0,0.06)] select-none pointer-events-none"
              />
            </motion.div>

            {/* ─── OVERLAPPING FLOATING GLASS METRIC CARD (PLUMFIX STYLE) ─── */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute -bottom-2 right-0 sm:bottom-1 sm:right-2 lg:-bottom-2 lg:right-0 z-20 rounded-2xl bg-white/90 backdrop-blur-xl border border-neutral-200/90 p-3.5 sm:p-4 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08),0_4px_16px_-4px_rgba(0,0,0,0.04),0_0_20px_rgba(147,51,234,0.08)] text-neutral-900 min-w-[210px] sm:min-w-[230px]"
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-2xl sm:text-3xl font-bold font-tech text-neutral-900 tracking-tight">
                  {solution.editorialSplit.statNumber}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-tech font-bold uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  VERIFIED
                </span>
              </div>

              <div className="text-[11px] text-neutral-600 font-medium leading-tight">
                {solution.editorialSplit.statLabel}
              </div>

              <div className="h-px bg-neutral-200/80 my-2.5" />

              <div className="flex items-center justify-between text-[10px] font-tech text-neutral-500">
                <div className="flex items-center gap-1">
                  <Cpu className="w-3 h-3 text-brand-600" />
                  <span className="truncate max-w-[110px]">{solution.telemetry.engine}</span>
                </div>
                <span className="text-brand-600 font-bold">{solution.telemetry.latency}</span>
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}


