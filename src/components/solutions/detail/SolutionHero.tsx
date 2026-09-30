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
  Terminal,
  Cpu,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { SOLUTIONS_DATA, type SolutionDetail } from '@/data/solutionsData';
import { MaskedReveal, DrawLine, revealMeta, revealBody, cardFromRight, EASE_CINEMATIC } from '@/lib/animations';

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
    <section className="relative w-full bg-[#FAFAFC] text-neutral-900 pt-24 pb-8 sm:pt-28 sm:pb-12 lg:pt-28 lg:pb-12 border-b border-neutral-200 overflow-hidden lg:min-h-[calc(100vh-64px)] lg:max-h-[780px] flex flex-col justify-center">
      
      {/* ─── 00. GIANT BACKGROUND WATERMARK TYPOGRAPHY (PLUMFIX SIGNATURE) ─── */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: EASE_CINEMATIC }}
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center overflow-hidden z-0 select-none"
        aria-hidden="true"
      >
        <span className="text-[15vw] font-black font-tech tracking-tighter text-neutral-900/[0.03] leading-none whitespace-nowrap uppercase">
          {watermarkText}
        </span>
      </motion.div>

      {/* ─── AMBIENT PURPLE ATMOSPHERIC GLOWS ─── */}
      <div
        className="pointer-events-none absolute top-1/3 left-4 w-[380px] h-[380px] rounded-full bg-brand-500/8 blur-[140px] z-0"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        
        {/* ─── 01. BREADCRUMBS ─── */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center mb-4 sm:mb-6"
        >
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
                {solution.title}
              </li>
            </ol>
          </nav>
        </motion.div>

        {/* ─── 02. SPLIT HERO COMPOSITION ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
          
          {/* Left Column: Command & Narrative (7 Columns) */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-4 sm:space-y-5">
            
            {/* Eyebrow Badge */}
            <motion.div
              variants={revealMeta}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-3"
            >
              <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-pulse" />
              <span className="font-tech text-xs tracking-[0.25em] font-semibold text-brand-600 uppercase">
                KAIROTRIX // SOLUTION ARCHITECTURE
              </span>
              <DrawLine className="w-10 sm:w-16 bg-neutral-200" delay={0.2} />
            </motion.div>

            {/* Master Headline */}
            <div>
              <MaskedReveal delay={0.06}>
                <h1 className="max-w-2xl">
                  <span className="block font-tech text-xs sm:text-sm font-bold tracking-[0.2em] text-brand-600 uppercase mb-2 sm:mb-2.5">
                    {solution.title}
                  </span>
                  <span className="block font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-[-0.03em] text-neutral-950 leading-[1.06]">
                    <span>{solution.displayHeadline.prefix} </span>
                    <span className="gradient-signature-text">{solution.displayHeadline.accent}</span>{' '}
                    <span>{solution.displayHeadline.suffix}</span>
                  </span>
                </h1>
              </MaskedReveal>
            </div>

            {/* Executive Value Narrative */}
            <motion.p
              variants={revealBody}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.16 }}
              className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal max-w-xl"
            >
              {solution.executiveSummary}
            </motion.p>

            {/* Action CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.24, ease: EASE_CINEMATIC }}
              className="pt-1 flex flex-wrap items-center gap-3.5"
            >
              <Link
                href={`/contact?solution=${solution.slug}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-tech font-semibold text-xs uppercase tracking-wider transition-all shadow-lg shadow-brand-500/25 active:scale-[0.98]"
              >
                <span>Start a Conversation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <a
                href="#core-services"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 border border-neutral-300/80 text-neutral-900 font-tech font-semibold text-xs uppercase tracking-wider transition-all active:scale-[0.98] cursor-pointer"
              >
                <span>Explore Core Services</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </a>
            </motion.div>

            {/* Quick Proof Badges Strip */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.32, ease: EASE_CINEMATIC }}
              className="pt-3 border-t border-neutral-200 flex flex-wrap items-center gap-4 sm:gap-6 text-[11px] sm:text-xs font-tech text-neutral-500"
            >
              <div className="flex items-center gap-1.5" title="Clear source-code handover for the custom software we build.">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                <span className="font-semibold text-neutral-800">Client Code Ownership</span>
              </div>
              {solution.engineeringFocus.slice(0, 2).map((focus, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                  <span>
                    {focus.label}: <strong className="text-neutral-800 font-semibold">{focus.value}</strong>
                  </span>
                </div>
              ))}
            </motion.div>

          </div>

          {/* Right Column: Unboxed Levitating 3D Asset + Overlapping Glass Metric Card */}
          <div className="lg:col-span-5 relative flex items-center justify-center w-full min-h-[340px] sm:min-h-[380px] lg:min-h-[420px]">
            
            {/* Centered Optical Purple Ambient Light (Soft & Balanced) */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] sm:w-[380px] sm:h-[380px] rounded-full bg-brand-500/18 blur-[85px] pointer-events-none"
              aria-hidden="true"
            />

            {/* Dynamic Ground Contact Shadow */}
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

            {/* Levitating 3D Solution Artwork */}
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

            {/* ─── OVERLAPPING FLOATING GLASS HIGHLIGHT CARD ─── */}
            <motion.div
              variants={cardFromRight}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.6, delay: 0.28, ease: EASE_CINEMATIC }}
              className="absolute -bottom-5 right-0 sm:bottom-1 sm:right-2 lg:-bottom-5 lg:right-0 z-20 rounded-2xl bg-white/90 backdrop-blur-xl border border-neutral-200/90 p-3.5 sm:p-4 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08),0_4px_16px_-4px_rgba(0,0,0,0.04),0_0_20px_rgba(147,51,234,0.08)] text-neutral-900 min-w-[210px] sm:min-w-[240px]"
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-lg sm:text-xl font-bold font-tech text-neutral-900 tracking-tight">
                  {solution.editorialSplit.editorialHighlight.lead}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand-50 border border-brand-200 text-brand-800 text-[10px] font-tech font-bold uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
                  SYSTEM FOCUS
                </span>
              </div>

              <div className="text-[11px] text-neutral-600 font-medium leading-tight">
                {solution.editorialSplit.editorialHighlight.detail}
              </div>

              <div className="h-px bg-neutral-200/80 my-2.5" />

              <div className="flex items-center justify-between text-[10px] font-tech text-neutral-500">
                <div className="flex items-center gap-1">
                  <Cpu className="w-3 h-3 text-brand-600" />
                  <span className="truncate max-w-[120px]">{solution.engineeringFocus[0]?.value}</span>
                </div>
                <span className="text-brand-600 font-bold truncate max-w-[90px]">{solution.engineeringFocus[1]?.label}</span>
              </div>
            </motion.div>

          </div>

        </div>

      </div>

      {/* ─── SCREEN-EDGE PREVIOUS SOLUTION BUTTON (HERO LEFT END: 3D CURVED WITH DEEP UNDER-SHADOW) ─── */}
      {prevSolution && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 z-30 hidden md:flex items-center">
          <Link
            href={`/solutions/${prevSolution.slug}`}
            aria-label={`Previous Solution: ${prevSolution.title}`}
            className="group relative flex items-center pl-3.5 pr-4 sm:pl-4 sm:pr-5 py-4 sm:py-5 rounded-r-2xl sm:rounded-r-3xl rounded-l-none bg-gradient-to-b from-white via-purple-50 to-purple-100 hover:from-brand-600 hover:via-brand-600 hover:to-brand-700 backdrop-blur-xl border-y border-r border-purple-200/90 hover:border-brand-500 shadow-[0_20px_40px_-4px_rgba(147,51,234,0.4),0_10px_20px_-2px_rgba(0,0,0,0.18),0_4px_8px_rgba(0,0,0,0.08),inset_0_2px_1px_rgba(255,255,255,1),inset_0_-3px_6px_rgba(147,51,234,0.2)] hover:shadow-[0_22px_45px_-4px_rgba(147,51,234,0.55),0_12px_24px_-2px_rgba(0,0,0,0.25),inset_0_2px_1px_rgba(255,255,255,0.6)] transition-all duration-300 hover:translate-x-1 active:scale-[0.98] cursor-pointer"
          >
            {/* 3D Tactile Arrow & Label */}
            <div className="flex flex-col items-center justify-center w-8 sm:w-9 transition-colors">
              <ChevronLeft className="w-5 h-5 text-brand-600 group-hover:text-white group-hover:-translate-x-1 transition-all duration-300 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] group-hover:drop-shadow-none stroke-[2.5]" />
              <span className="text-[10px] font-tech font-bold uppercase tracking-wider mt-1 text-brand-700 group-hover:text-white transition-colors">
                PREV
              </span>
            </div>

            {/* 3D Floating Tooltip Pill (Slide right on hover) */}
            <div className="pointer-events-none absolute left-full ml-3.5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200 whitespace-nowrap z-40">
              <div className="px-4 py-2.5 rounded-2xl bg-white/98 backdrop-blur-xl border border-purple-200 text-neutral-900 shadow-[0_16px_36px_-4px_rgba(147,51,234,0.25),0_6px_16px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,1)] flex items-center gap-2.5">
                <span className="text-[11px] font-tech font-extrabold text-brand-600 uppercase tracking-wider">
                  PREVIOUS SOLUTION
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-brand-400" />
                <span className="text-xs font-bold text-neutral-900">
                  {prevSolution.title}
                </span>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* ─── SCREEN-EDGE NEXT SOLUTION BUTTON (HERO RIGHT END: 3D CURVED WITH DEEP UNDER-SHADOW) ─── */}
      {nextSolution && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 z-30 hidden md:flex items-center">
          <Link
            href={`/solutions/${nextSolution.slug}`}
            aria-label={`Next Solution: ${nextSolution.title}`}
            className="group relative flex items-center pr-3.5 pl-4 sm:pr-4 sm:pl-5 py-4 sm:py-5 rounded-l-2xl sm:rounded-l-3xl rounded-r-none bg-gradient-to-b from-white via-purple-50 to-purple-100 hover:from-brand-600 hover:via-brand-600 hover:to-brand-700 backdrop-blur-xl border-y border-l border-purple-200/90 hover:border-brand-500 shadow-[0_20px_40px_-4px_rgba(147,51,234,0.4),0_10px_20px_-2px_rgba(0,0,0,0.18),0_4px_8px_rgba(0,0,0,0.08),inset_0_2px_1px_rgba(255,255,255,1),inset_0_-3px_6px_rgba(147,51,234,0.2)] hover:shadow-[0_22px_45px_-4px_rgba(147,51,234,0.55),0_12px_24px_-2px_rgba(0,0,0,0.25),inset_0_2px_1px_rgba(255,255,255,0.6)] transition-all duration-300 hover:-translate-x-1 active:scale-[0.98] cursor-pointer"
          >
            {/* 3D Floating Tooltip Pill (Slide left on hover) */}
            <div className="pointer-events-none absolute right-full mr-3.5 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-200 whitespace-nowrap z-40">
              <div className="px-4 py-2.5 rounded-2xl bg-white/98 backdrop-blur-xl border border-purple-200 text-neutral-900 shadow-[0_16px_36px_-4px_rgba(147,51,234,0.25),0_6px_16px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,1)] flex items-center gap-2.5">
                <span className="text-xs font-bold text-neutral-900">
                  {nextSolution.title}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-brand-400" />
                <span className="text-[11px] font-tech font-extrabold text-brand-600 uppercase tracking-wider">
                  NEXT SOLUTION
                </span>
              </div>
            </div>

            {/* 3D Tactile Arrow & Label */}
            <div className="flex flex-col items-center justify-center w-8 sm:w-9 transition-colors">
              <ChevronRight className="w-5 h-5 text-brand-600 group-hover:text-white group-hover:translate-x-1 transition-all duration-300 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] group-hover:drop-shadow-none stroke-[2.5]" />
              <span className="text-[10px] font-tech font-bold uppercase tracking-wider mt-1 text-brand-700 group-hover:text-white transition-colors">
                NEXT
              </span>
            </div>
          </Link>
        </div>
      )}
    </section>
  );
}


