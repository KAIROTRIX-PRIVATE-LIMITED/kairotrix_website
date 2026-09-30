'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { ArrowUpRight, Check, Compass, Cpu, Layers } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useScrambleText } from '@/hooks/useScrambleText';
import {
  EASE_CINEMATIC,
  EASE_PRECISE,
  cardFromLeft,
  cardFromCenter,
  cardFromRight,
  DrawLine,
  MaskedReveal,
} from '@/lib/animations';

// ─────────────────────────────────────────────────────────────────────────────
// 02 // IDENTITY & PHILOSOPHY — Pure Text-Animated Architecture
//
// HYBRID ARCHITECTURE:
// • Concept 1: Editorial Scroll-Scrubbed Kinetic Manifesto (Word-by-word contrast)
// • Concept 5: Restrained Transformation Continuum (6-phase interactive ribbon)
// • Concept 2: Swiss-Grid Interactive Typographic Architecture (Scramble & Focus Dimming)
//
// ZERO IMAGES • ZERO VIDEOS • LIGHT THEME ONLY (#FAFAFC / #FFFFFF)
// ─────────────────────────────────────────────────────────────────────────────

// ── Word Scrubbing Sub-Component for Part 1 ──────────────────────────────────
interface ScrubWordProps {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
  isAccent?: boolean;
  isGradient?: boolean;
  prefersReduced: boolean;
}

function ScrubWord({
  word,
  progress,
  range,
  isAccent = false,
  isGradient = false,
  prefersReduced,
}: ScrubWordProps) {
  // Invert opacity smoothly from 0.18 (dim ghost) to 1.0 (deep obsidian)
  const opacity = useTransform(progress, range, prefersReduced ? [1, 1] : [0.2, 1]);
  const y = useTransform(progress, range, prefersReduced ? [0, 0] : [6, 0]);

  if (isGradient) {
    return (
      <motion.span
        style={{ opacity, y }}
        className="inline-block gradient-signature-text font-bold mr-[0.28em] transition-colors"
      >
        {word}
      </motion.span>
    );
  }

  if (isAccent) {
    return (
      <motion.span
        style={{ opacity, y }}
        className="inline-block text-brand-600 font-semibold mr-[0.28em] transition-colors"
      >
        {word}
      </motion.span>
    );
  }

  return (
    <motion.span
      style={{ opacity, y }}
      className="inline-block text-neutral-950 mr-[0.28em] transition-colors"
    >
      {word}
    </motion.span>
  );
}

// ── Part 2 Data: The 6-Stage Transformation Continuum ─────────────────────────
interface ContinuumStage {
  step: string;
  name: string;
  tag: string;
  telemetry: string;
}

const CONTINUUM_STAGES: ContinuumStage[] = [
  {
    step: '01',
    name: 'DISCONNECTED',
    tag: 'CURRENT_STATE',
    telemetry:
      'Disconnected software, manual spreadsheet work, and isolated data silos trapped in repetitive daily tasks.',
  },
  {
    step: '02',
    name: 'UNDERSTOOD',
    tag: 'DISCOVERY',
    telemetry:
      'We interview your team and audit workflows to isolate the real bottleneck before writing a single line of code.',
  },
  {
    step: '03',
    name: 'STRUCTURED',
    tag: 'FOUNDATION',
    telemetry:
      'Clean data models, explicit schemas, and decoupled system boundaries engineered to scale reliably without breaking.',
  },
  {
    step: '04',
    name: 'CONNECTED',
    tag: 'INTEGRATION',
    telemetry:
      'Automated event pipelines and live synchronization connecting your CRM, ERP, and internal databases.',
  },
  {
    step: '05',
    name: 'INTELLIGENT',
    tag: 'AI_SYSTEMS',
    telemetry:
      'Focused AI agents and verified retrieval systems handling repetitive triage, document parsing, and routine tasks.',
  },
  {
    step: '06',
    name: 'EVOLVING',
    tag: 'LONGEVITY',
    telemetry:
      'Modular, maintainable code with full client ownership, built to adapt and expand as your business grows.',
  },
];

// ── Part 3 Data: The Three Core Principles ───────────────────────────────────
interface PrincipleItem {
  id: string;
  number: string;
  category: string;
  ruleSpec: string;
  title: string;
  thesis: string;
  axioms: string[];
  linkText: string;
  linkHref: string;
  icon: typeof Compass;
}

const PRINCIPLES: PrincipleItem[] = [
  {
    id: 'diagnostic',
    number: '01',
    category: 'STRATEGY',
    ruleSpec: '[APPROACH // PROBLEM_FIRST]',
    title: 'Problem-First Discovery',
    thesis:
      'We reject pre-packaged software stacks and decorative technology. Before recommending or writing a single line of code, we first understand what is slowing your business down.',
    axioms: [
      'Workflow and bottleneck audit',
      'Zero bias toward specific software vendors',
      'Measurable business value before building',
    ],
    linkText: 'Explore What We Build',
    linkHref: '/solutions',
    icon: Compass,
  },
  {
    id: 'execution',
    number: '02',
    category: 'ENGINEERING',
    ruleSpec: '[STANDARD // RELIABILITY]',
    title: 'Reliable Production Systems',
    thesis:
      'From custom web applications to automated AI workflows and data pipelines, we engineer reliable, thoroughly tested software built to perform under day-to-day business demands.',
    axioms: [
      'Clean system boundaries and data validation',
      'Thorough automated testing and error handling',
      'Fast, dependable performance under load',
    ],
    linkText: 'View Demonstrations',
    linkHref: '/work',
    icon: Cpu,
  },
  {
    id: 'evolution',
    number: '03',
    category: 'LONGEVITY',
    ruleSpec: '[LONGEVITY // EXTENSIBLE]',
    title: 'Built to Evolve',
    thesis:
      'Technology must never expire or demand an expensive rewrite in twelve months. Every system we deploy features modular architecture and decoupled layers designed to grow with your business.',
    axioms: [
      'Modular, decoupled architecture',
      'Easy to extend with future AI and tools',
      '100% full client code ownership',
    ],
    linkText: 'Our Philosophy',
    linkHref: '/about',
    icon: Layers,
  },
];

// ── Individual Principle Card with Hover Scramble ────────────────────────────
function PrincipleCard({
  item,
  index,
  isHovered,
  isAnyHovered,
  onHoverStart,
  onHoverEnd,
}: {
  item: PrincipleItem;
  index: number;
  isHovered: boolean;
  isAnyHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}) {
  const { displayText, trigger } = useScrambleText(item.title, { duration: 320 });
  const IconComponent = item.icon;

  const handleMouseEnter = () => {
    onHoverStart();
    trigger();
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onHoverEnd}
      className={`group relative flex flex-col justify-between p-8 sm:p-10 lg:p-11 rounded-2xl bg-white border transition-all duration-500 ${
        isHovered
          ? 'border-brand-500/50 shadow-[0_16px_40px_rgba(147,51,234,0.09)] -translate-y-1'
          : isAnyHovered
          ? 'border-neutral-200/50 opacity-35 filter blur-[0.3px]'
          : 'border-neutral-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.02)]'
      }`}
    >
      {/* Top Brand Accent Line */}
      <div
        className={`absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-brand-500 to-transparent transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div>
        {/* Header Metadata Tier */}
        <div className="flex items-start justify-between mb-8 pb-6 border-b border-neutral-100">
          <div>
            <span className="font-tech text-xs tracking-[0.2em] font-semibold text-brand-600 uppercase">
              {item.category}
            </span>
            <div className="font-mono text-[11px] text-neutral-400 mt-1">
              {item.ruleSpec}
            </div>
          </div>
          <span className="font-tech text-3xl sm:text-4xl font-black text-neutral-200 group-hover:text-brand-500/30 transition-colors">
            {item.number}
          </span>
        </div>

        {/* Title with Scramble Effect */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-brand-soft flex items-center justify-center text-brand-600 shrink-0">
            <IconComponent className="w-4 h-4" />
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-neutral-950 tracking-tight leading-snug group-hover:text-brand-600 transition-colors">
            {displayText}
          </h3>
        </div>

        {/* Thesis Narrative */}
        <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mt-4 font-normal">
          {item.thesis}
        </p>

        {/* Monospace Axioms List */}
        <div className="mt-8 pt-6 border-t border-neutral-100/90 space-y-2.5">
          <div className="font-tech text-[10px] tracking-[0.2em] text-neutral-400 uppercase mb-3">
            WHAT MAKES IT RELIABLE
          </div>
          {item.axioms.map((axiom) => (
            <div
              key={axiom}
              className="flex items-center gap-2.5 text-xs font-mono text-neutral-700"
            >
              <div className="w-3.5 h-3.5 rounded-full bg-brand-500/10 flex items-center justify-center text-brand-600 shrink-0">
                <Check className="w-2.5 h-2.5" />
              </div>
              <span>{axiom}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Route Footer */}
      <div className="mt-10 pt-6 border-t border-neutral-100 flex items-center justify-between">
        <span className="font-mono text-[11px] text-neutral-400">
          Principle // 0{index + 1}
        </span>
        <Link
          href={item.linkHref}
          className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-neutral-900 group-hover:text-brand-600 transition-colors"
        >
          <span>{item.linkText}</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </div>
  );
}

// ── Main Section 02 Component ────────────────────────────────────────────────
export function WhatIsKairotrix() {
  const prefersReduced = useReducedMotion();
  const manifestoRef = useRef<HTMLDivElement>(null);

  // Scroll Progress for Word-by-Word Scrubbing
  const { scrollYProgress } = useScroll({
    target: manifestoRef,
    offset: ['start 85%', 'end 45%'],
  });

  // State for Continuum stage selection
  const [activeStageIndex, setActiveStageIndex] = useState(1); // Default to "UNDERSTOOD"

  // State for Swiss-Grid focus dimming
  const [hoveredPrincipleIndex, setHoveredPrincipleIndex] = useState<number | null>(null);

  // Kinetic Manifesto Words Configuration
  const MANIFESTO_WORDS = [
    { text: 'We', accent: false },
    { text: 'do', accent: false },
    { text: 'not', accent: false },
    { text: 'build', accent: false },
    { text: 'software', accent: false },
    { text: 'just', accent: false },
    { text: 'to', accent: false },
    { text: 'look', accent: false },
    { text: 'impressive.', accent: false },
    { text: 'We', accent: false },
    { text: 'first', accent: true },
    { text: 'understand', accent: true },
    { text: 'what', accent: false },
    { text: 'is', accent: false },
    { text: 'slowing', accent: false },
    { text: 'your', accent: false },
    { text: 'business', accent: false },
    { text: 'down—', accent: false },
    { text: 'then', accent: false },
    { text: 'design', accent: true },
    { text: 'and', accent: false },
    { text: 'build', accent: false },
    { text: 'reliable', isGradient: true },
    { text: 'systems', isGradient: true },
    { text: 'that', accent: false },
    { text: 'can', accent: false },
    { text: 'grow', accent: true },
    { text: 'with', accent: false },
    { text: 'your', accent: false },
    { text: 'business.', accent: true },
  ];

  return (
    <section
      id="what-is-kairotrix"
      aria-labelledby="identity-philosophy-heading"
      className="relative w-full bg-[#FAFAFC] py-28 sm:py-36 lg:py-44 border-t border-neutral-200/80 overflow-hidden"
    >
      {/* Precision Geometric Grid Background Lines */}
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#00000006_1px,transparent_1px),linear-gradient(to_bottom,#00000006_1px,transparent_1px)] bg-[size:4.5rem_4.5rem] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_0%,#000_70%,transparent_100%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── SECTION HEADER & EYEBROW ──────────────────────────────────────── */}
        <div className="mb-8 sm:mb-10">
          <motion.div
            initial={{ opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: EASE_PRECISE }}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-pulse" />
              <motion.span
                initial={{ opacity: prefersReduced ? 1 : 0, letterSpacing: prefersReduced ? '0.25em' : '0.35em' }}
                whileInView={{ opacity: 1, letterSpacing: '0.25em' }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: EASE_PRECISE }}
                className="font-tech text-xs font-semibold text-brand-600 uppercase"
              >
                Identity & Philosophy
              </motion.span>
              <div className="h-px w-10 sm:w-16 bg-neutral-200" />
              <span className="font-mono text-xs text-neutral-400">
                HOW WE THINK
              </span>
            </div>

            <div className="font-mono text-xs text-neutral-500 flex items-center gap-4">
              <span>[KAIROTRIX // CORE APPROACH]</span>
              <span className="hidden md:inline text-neutral-300">•</span>
              <span className="hidden md:inline">PROBLEM_FIRST</span>
            </div>
          </motion.div>
          <DrawLine className="mt-4 h-px w-full bg-neutral-200/80" />
        </div>

        {/* Section Title with Masked Reveal */}
        <div className="mb-10 lg:mb-14 overflow-hidden">
          <MaskedReveal delay={0.08}>
            <h2
              id="identity-philosophy-heading"
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] text-neutral-950 leading-[1.12]"
            >
              BUILT TO{' '}
              <span className="gradient-signature-text">EVOLVE.</span>
            </h2>
          </MaskedReveal>
        </div>

        {/* ── PART 1: EDITORIAL SCROLL-SCRUBBED KINETIC MANIFESTO ─────────── */}
        <div ref={manifestoRef} className="max-w-5xl mb-24 lg:mb-32">
          {/* Kinetic Headline with Word-by-Word Scroll Illumination */}
          <div className="font-display text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.14]">
            {MANIFESTO_WORDS.map((item, idx) => {
              // Calculate stagger range for each word across scroll progression
              const step = 0.85 / MANIFESTO_WORDS.length;
              const start = Math.min(idx * step, 0.85);
              const end = Math.min(start + step * 1.6, 1);

              return (
                <ScrubWord
                  key={`${item.text}-${idx}`}
                  word={item.text}
                  progress={scrollYProgress}
                  range={[start, end]}
                  isAccent={item.accent}
                  isGradient={item.isGradient}
                  prefersReduced={prefersReduced}
                />
              );
            })}
          </div>

          {/* Contextual Narrative Bridge with Animated DrawLine */}
          <div className="mt-10 pt-8">
            <DrawLine className="h-px w-full bg-neutral-200/60 mb-8" />
            <motion.div
              initial={{ opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, delay: 0.15, ease: EASE_CINEMATIC }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start"
            >
              <div className="md:col-span-4">
                <span className="font-tech text-xs tracking-[0.2em] font-semibold text-neutral-400 uppercase">
                  THE PROBLEM-FIRST APPROACH
                </span>
                <p className="mt-2 text-sm font-mono text-neutral-500">
                  Moving past marketing promises into systems that actually work.
                </p>
              </div>
              <div className="md:col-span-8">
                <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
                  Most technology vendors begin with what they want to sell: a recurring software license, an off-the-shelf template, or an impressive presentation. At KAIROTRIX, we start by understanding how your business actually runs. We find the manual bottlenecks holding your team back, then design and build tailored systems that save real time and create lasting leverage.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── PART 2: RESTRAINED TRANSFORMATION CONTINUUM (6-STAGE RIBBON) ─── */}
        <motion.div
          initial={{ opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24 lg:mb-32"
        >
          {/* Continuum Ribbon Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div className="flex items-center gap-2">
              <span className="font-tech text-xs tracking-[0.2em] font-bold text-neutral-900 uppercase">
                THE TRANSFORMATION PROCESS
              </span>
              <span className="text-xs font-mono text-neutral-400">
                [6_STAGES_OF_SYSTEM_EVOLUTION]
              </span>
            </div>
            <span className="text-xs font-mono text-brand-600">
              Select any stage to explore
            </span>
          </div>

          {/* Horizontal Continuum Ribbon */}
          <div className="relative rounded-2xl bg-white border border-neutral-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-y sm:divide-y-0 sm:divide-x divide-neutral-200/80">
              {CONTINUUM_STAGES.map((stage, idx) => {
                const isActive = activeStageIndex === idx;
                return (
                  <button
                    key={stage.step}
                    type="button"
                    onClick={() => setActiveStageIndex(idx)}
                    onMouseEnter={() => setActiveStageIndex(idx)}
                    className={`relative p-5 lg:p-6 text-left transition-all duration-300 focus:outline-none ${
                      isActive
                        ? 'bg-neutral-50/90 text-neutral-950'
                        : 'bg-white hover:bg-neutral-50/50 text-neutral-600'
                    }`}
                  >
                    {/* Active Accent Top Indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeContinuumLine"
                        className="absolute top-0 left-0 right-0 h-[3px] bg-brand-500"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}

                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`font-tech text-xs font-bold transition-colors ${
                          isActive ? 'text-brand-600' : 'text-neutral-400'
                        }`}
                      >
                        {stage.step}
                      </span>
                      <span className="font-mono text-[9px] text-neutral-400">
                        {stage.tag}
                      </span>
                    </div>

                    <div className="font-display text-sm font-bold tracking-tight">
                      {stage.name}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Live Monospace Telemetry Readout */}
            <div className="px-6 py-4 bg-neutral-950 text-neutral-300 border-t border-neutral-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs">
              <div className="flex items-center gap-3">
                <span className="flex h-1.5 w-1.5 rounded-full bg-brand-400 animate-pulse" />
                <span className="text-brand-400 font-semibold">
                  STAGE_{CONTINUUM_STAGES[activeStageIndex].step} // {CONTINUUM_STAGES[activeStageIndex].name}
                </span>
                <span className="hidden md:inline text-neutral-600">|</span>
                <span className="text-neutral-300">
                  {CONTINUUM_STAGES[activeStageIndex].telemetry}
                </span>
              </div>
              <span className="text-[10px] text-neutral-400 tracking-wider shrink-0 uppercase">
                KAIROTRIX STANDARD
              </span>
            </div>
          </div>
        </motion.div>

        {/* ── PART 3: SWISS-GRID INTERACTIVE TYPOGRAPHIC PRINCIPLES ─────────── */}
        <div>
          {/* Section Eyebrow for Principles */}
          <div className="mb-10">
            <motion.div
              initial={{ opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: EASE_PRECISE }}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2"
            >
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="flex h-1.5 w-1.5 rounded-full bg-brand-500 animate-pulse" />
                  <motion.span
                    initial={{ opacity: prefersReduced ? 1 : 0, letterSpacing: prefersReduced ? '0.25em' : '0.35em' }}
                    whileInView={{ opacity: 1, letterSpacing: '0.25em' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: EASE_PRECISE }}
                    className="font-tech text-xs font-semibold text-brand-600 uppercase"
                  >
                    CORE PRINCIPLES
                  </motion.span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-neutral-950">
                  How We Build Technology
                </h3>
              </div>
              <span className="font-mono text-xs text-neutral-400">
                Hover to explore our engineering standards
              </span>
            </motion.div>
            <DrawLine className="mt-4 h-px w-full bg-neutral-200/80" />
          </div>

          {/* 3-Column Swiss Architectural Grid with Directional Entrance & Focus Dimming */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {PRINCIPLES.map((principle, idx) => {
              const directionalVariants = [cardFromLeft, cardFromCenter, cardFromRight];
              return (
                <motion.div
                  key={principle.id}
                  initial={prefersReduced ? 'visible' : 'hidden'}
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  variants={directionalVariants[idx % 3]}
                  transition={{ duration: 0.75, delay: prefersReduced ? 0 : idx * 0.12, ease: EASE_CINEMATIC }}
                  className="h-full flex flex-col"
                >
                  <PrincipleCard
                    item={principle}
                    index={idx}
                    isHovered={hoveredPrincipleIndex === idx}
                    isAnyHovered={hoveredPrincipleIndex !== null}
                    onHoverStart={() => setHoveredPrincipleIndex(idx)}
                    onHoverEnd={() => setHoveredPrincipleIndex(null)}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
