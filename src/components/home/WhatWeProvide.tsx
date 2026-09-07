'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import clsx from 'clsx';
import { useReducedMotion } from '@/hooks/useReducedMotion';

// ─────────────────────────────────────────────────────────────────────────────
// KAIROTRIX Section 03 — "Core Disciplines" (Rotating Curved Orbital Dial)
//
// 1. Frozen Big Section Header: Locked at top-16/top-20 with full bold presence
//    (Eyebrow, "WHAT WE BUILD.", and narrative description; NO top tabs).
// 2. Preserved Scroll Animation: Full-height rotating curved orbital wheel where
//    active node centers at vertical midpoint (y = 50%) as user scrolls.
// 3. Centralized service specs: Category badge, display title, description,
//    capability pills, and "Explore Architecture & Scope →" button.
// 4. Floating 3D circuit brain illustration with ambient depth & telemetry.
// ─────────────────────────────────────────────────────────────────────────────

interface ServiceData {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  pills: string[];
  statusBadge: string;
  telemetry: {
    liveMetric: string;
    systemTag: string;
  };
  image: string;
  slug: string;
}

const SERVICES: ServiceData[] = [
  {
    number: '01',
    title: 'AI & Intelligent Systems',
    subtitle: 'Autonomous Agents, Enterprise RAG & Custom LLM Fine-Tuning',
    description:
      'We engineer deterministic autonomous agents, custom LLMs, and enterprise RAG pipelines that embed directly into your core business operations.',
    pills: ['Autonomous Agents', 'Enterprise RAG', 'Custom LLMs', 'Decision ML'],
    statusBadge: 'Production Ready',
    telemetry: {
      liveMetric: '99.98% Tool Execution SLA',
      systemTag: 'Autonomous Multi-Agent Swarm',
    },
    image: '/assets/images/service/SERVICE01.png',
    slug: '/solutions/ai-intelligent-systems',
  },
  {
    number: '02',
    title: 'Software & Product Engineering',
    subtitle: 'Full-Stack Digital Platforms & High-Throughput Distributed APIs',
    description:
      'Full-stack digital platforms and distributed microservices purpose-built for enterprise concurrency, sub-20ms latency, and complete source code ownership.',
    pills: ['Web Platforms', 'Distributed APIs', 'Cloud Native', 'Design Systems'],
    statusBadge: 'Sub-20ms Latency',
    telemetry: {
      liveMetric: 'P99 Latency < 16ms',
      systemTag: 'Next.js 15 Microservices',
    },
    image: '/assets/images/service/SERVICE02.png',
    slug: '/solutions/software-product-engineering',
  },
  {
    number: '03',
    title: 'Automation & Digital Operations',
    subtitle: 'End-to-End Workflow Orchestration & Self-Healing Bots',
    description:
      'Eliminate manual operational bottlenecks with autonomous workflow orchestration, multi-system webhook synchronization, and self-healing background bots.',
    pills: ['Workflow Automation', 'Ops Bots', 'Approval Engines', 'Data Sync'],
    statusBadge: 'Zero Human Bottlenecks',
    telemetry: {
      liveMetric: '14,200 Events / Min',
      systemTag: 'Self-Healing Event Workers',
    },
    image: '/assets/images/service/SERVICE03.png',
    slug: '/solutions/automation-digital-operations',
  },
  {
    number: '04',
    title: 'Digital Transformation',
    subtitle: 'Legacy Monolith Decoupling & Zero-Downtime Cloud Migration',
    description:
      'Modernize legacy monoliths without business downtime. We decouple legacy systems, migrate workloads to cloud-native serverless architecture, and tune database performance.',
    pills: ['Cloud Migration', 'Monolith Decoupling', 'Audits & SLAs', 'Optimization'],
    statusBadge: '100% SLA Guarantee',
    telemetry: {
      liveMetric: '100% Data Integrity',
      systemTag: 'Zero Cutover Downtime',
    },
    image: '/assets/images/service/SERVICE04.png',
    slug: '/solutions/digital-transformation',
  },
  {
    number: '05',
    title: 'Data & Business Intelligence',
    subtitle: 'Real-Time Telemetry Streaming & Governed Executive Dashboards',
    description:
      'Transform distributed raw event streams into sub-second visual intelligence, automated anomaly alerts, and trustworthy governed semantic metrics.',
    pills: ['Real-Time Streaming', 'Fast Dashboards', 'Data Warehousing', 'Metrics'],
    statusBadge: 'Sub-Second Analytics',
    telemetry: {
      liveMetric: '< 420ms Query Times',
      systemTag: '10M+ Rows Scanned / Sec',
    },
    image: '/assets/images/service/SERVICE05.png',
    slug: '/solutions/data-business-intelligence',
  },
  {
    number: '06',
    title: 'Technology Integration',
    subtitle: 'Multi-Protocol Middleware & Enterprise System Bridges',
    description:
      'Bridge disparate software stacks, IoT hardware sensors, and enterprise ERP backbones with robust, resilient multi-protocol middleware adapters.',
    pills: ['Multi-Protocol', 'ERP/CRM Sync', 'IoT Telemetry', 'Webhook Routers'],
    statusBadge: 'Multi-Protocol Active',
    telemetry: {
      liveMetric: 'Bi-Directional Sync Active',
      systemTag: 'Multi-Protocol Protocol Routing',
    },
    image: '/assets/images/service/SERVICE06.png',
    slug: '/solutions/technology-integration',
  },
];

// Orbital Arc Geometry Configuration (Tuned for balanced 3-column instrument)
const ARC_CONFIG = {
  radius: 480,
  apexX: 210, // x-coordinate of active node at apex
  angleStep: 22, // degrees between consecutive nodes
};

export function WhatWeProvide() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isUserInteracting = useRef(false);
  const prefersReduced = useReducedMotion();

  // Smooth scroll progress synchronization: scrolling advances the orbital dial
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    if (isUserInteracting.current) return;
    const count = SERVICES.length;
    const segment = 1 / count;
    const computedIndex = Math.min(count - 1, Math.max(0, Math.floor(progress / segment)));
    setActiveIndex((prev) => (prev !== computedIndex ? computedIndex : prev));
  });

  // Direct click on node
  const handleSelect = (index: number) => {
    setActiveIndex(index);
    isUserInteracting.current = true;

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const currentScrollTop = window.scrollY || document.documentElement.scrollTop;
      const sectionStart = currentScrollTop + rect.top;
      const sectionScrollableHeight = rect.height - window.innerHeight;

      if (sectionScrollableHeight > 0) {
        const targetScroll =
          sectionStart + (index / (SERVICES.length - 1)) * sectionScrollableHeight;
        window.scrollTo({
          top: targetScroll,
          behavior: 'smooth',
        });
      }
    }

    setTimeout(() => {
      isUserInteracting.current = false;
    }, 700);
  };

  const currentService = SERVICES[activeIndex];
  const cx = ARC_CONFIG.apexX - ARC_CONFIG.radius;

  return (
    <section
      id="core-disciplines"
      ref={containerRef}
      className="relative w-full bg-[#FAFAFC] border-t border-neutral-200/80"
      style={{ height: '380vh' }}
      aria-label="Section 03: Core Disciplines"
    >
      {/* Background Architectural Grid Lines */}
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#00000004_1px,transparent_1px),linear-gradient(to_bottom,#00000004_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
        aria-hidden="true"
      />

      {/* ── 1. FROZEN BIG SECTION HEADER (Sticky at top-16 md:top-20) ──────── */}
      <div className="sticky top-16 md:top-20 z-30 w-full bg-[#FAFAFC]/95 backdrop-blur-md border-b border-neutral-200/80 py-4.5 px-4 sm:px-6 lg:px-8 shadow-2xs">
        <motion.div
          initial={{ opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-7xl flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-pulse" />
              <span className="font-tech text-xs tracking-[0.25em] font-semibold text-brand-600 uppercase">
                03 // Core Disciplines
              </span>
              <div className="h-px w-10 sm:w-16 bg-neutral-200" />
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] text-neutral-950 leading-[1.12]">
              WHAT WE{' '}
              <span className="gradient-signature-text">BUILD.</span>
            </h2>
          </div>

          {/* Live Architecture Scope Pill & Enhanced AI Discovery Chip */}
          <div className="hidden md:flex items-center gap-2.5">
            <Link
              href="/solutions"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/85 hover:bg-white border border-neutral-200/80 hover:border-neutral-300 text-neutral-600 hover:text-neutral-900 text-xs font-mono shadow-2xs hover:shadow-xs transition-all duration-200 group cursor-pointer"
            >
              <span className="h-2 w-2 rounded-full bg-brand-500 animate-pulse" />
              <span className="font-semibold text-neutral-800 group-hover:text-purple-700 transition-colors">
                Solutions Hub
              </span>
              <span className="text-neutral-300">|</span>
              <span className="text-neutral-500 group-hover:text-neutral-700">6 Disciplines</span>
              <ArrowRight className="w-3 h-3 text-neutral-400 group-hover:text-purple-600 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <Link
              href="/solutions#find-solution"
              className="group relative inline-flex items-center gap-2 pl-3 pr-3.5 py-1.5 rounded-full bg-gradient-to-r from-purple-600 via-brand-600 to-indigo-600 hover:opacity-95 text-white font-mono text-xs font-semibold shadow-[0_2px_12px_rgba(147,51,234,0.3)] hover:shadow-[0_4px_18px_rgba(147,51,234,0.45)] transition-all duration-200 active:scale-[0.98] cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-200 group-hover:rotate-12 transition-transform shrink-0" />

              <span className="tracking-tight text-white font-medium">
                Find Your Solution
              </span>

              <span className="text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded-full bg-white/20 text-white border border-white/30 tracking-wider">
                AI
              </span>

              <ArrowRight className="w-3 h-3 text-purple-200 group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* ── 2. STICKY PRESERVED SCROLL STAGE (Rotating Orbital Dial) ───────── */}
      <div className="sticky top-[135px] md:top-[160px] z-20 h-[calc(100vh-9.5rem)] md:h-[calc(100vh-11rem)] flex items-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="mx-auto max-w-7xl w-full h-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-center w-full">

            {/* ── LEFT: ROTATING CURVED ORBITAL DIAL (Balanced 3-col) ─────── */}
            <div className="hidden lg:flex lg:col-span-3 relative h-[520px] items-center select-none overflow-visible">
              {/* Massive Sweeping Orbital Arc SVG Track */}
              <svg
                className="absolute inset-0 h-full w-[300px] pointer-events-none overflow-visible"
                viewBox="0 0 300 520"
                fill="none"
              >
                <defs>
                  <linearGradient id="dial-arc-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#9333EA" stopOpacity="0" />
                    <stop offset="25%" stopColor="#9333EA" stopOpacity="0.35" />
                    <stop offset="50%" stopColor="#9333EA" stopOpacity="0.85" />
                    <stop offset="75%" stopColor="#9333EA" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#9333EA" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Background Full Orbit Circle Track */}
                <circle
                  cx={cx}
                  cy="260"
                  r={ARC_CONFIG.radius}
                  fill="none"
                  stroke="rgba(0, 0, 0, 0.07)"
                  strokeWidth="1.5"
                />
                {/* Glowing Purple Arc Segment (apex at x=210, cy=260, r=480) */}
                <path
                  d="M 38.54 -107.47 A 480 480 0 0 1 38.54 627.47"
                  fill="none"
                  stroke="url(#dial-arc-gradient)"
                  strokeWidth="2.5"
                  strokeDasharray="6 6"
                />
              </svg>

              {/* Numbered Nodes Gliding along the Circular Orbit in Natural Top-to-Bottom Order */}
              {SERVICES.map((srv, idx) => {
                const delta = idx - activeIndex;
                const angleDeg = delta * ARC_CONFIG.angleStep;
                const angleRad = (angleDeg * Math.PI) / 180;
                const xPos = Math.round(cx + ARC_CONFIG.radius * Math.cos(angleRad));
                const yPos = Math.round(260 + ARC_CONFIG.radius * Math.sin(angleRad));
                const isActive = activeIndex === idx;
                const isOutOfView = Math.abs(delta) > 2;

                return (
                  <motion.button
                    key={srv.number}
                    onClick={() => handleSelect(idx)}
                    animate={{
                      left: xPos,
                      top: yPos,
                      opacity: isOutOfView ? 0 : 1,
                      scale: isActive ? 1.06 : 0.88,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 220,
                      damping: 26,
                      mass: 0.8,
                    }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer focus:outline-hidden z-10"
                    aria-label={`Select service ${srv.number}`}
                  >
                    <div
                      className={clsx(
                        'relative flex items-center justify-center rounded-full transition-all duration-300',
                        isActive
                          ? 'h-18 w-18 sm:h-20 sm:w-20 bg-neutral-950 text-white shadow-2xl ring-4 ring-brand-500/30'
                          : 'h-12 w-12 sm:h-14 sm:w-14 bg-white/90 backdrop-blur-md text-neutral-700 border border-neutral-300/90 shadow-xs hover:border-brand-500 hover:text-brand-600'
                      )}
                    >
                      <span
                        className={clsx(
                          'font-mono font-bold tracking-tight',
                          isActive ? 'text-lg sm:text-xl' : 'text-xs sm:text-sm'
                        )}
                      >
                        {srv.number}
                      </span>

                      {/* Active Indicator Pulse Ring */}
                      {isActive && (
                        <motion.span
                          layoutId="orbital-wheel-halo"
                          transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                          className="absolute -inset-2.5 rounded-full border-2 border-brand-500/40 pointer-events-none animate-pulse"
                        />
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* ── CENTER: STREAMLINED SERVICE SPECIFICATION (Maintains Bold Single-Line Title) ── */}
            <div className="lg:col-span-5 flex flex-col justify-center min-w-0">
              {/* Mobile Quick Stepper Pills (visible only on < lg) */}
              <div className="flex lg:hidden items-center gap-1.5 pb-3 overflow-x-auto no-scrollbar">
                {SERVICES.map((srv, idx) => (
                  <button
                    key={srv.number}
                    onClick={() => handleSelect(idx)}
                    className={clsx(
                      'px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer',
                      activeIndex === idx
                        ? 'bg-neutral-900 text-white shadow-xs'
                        : 'bg-white border border-neutral-200 text-neutral-500 hover:text-neutral-900'
                    )}
                  >
                    {srv.number}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentService.number}
                  initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -16, filter: 'blur(4px)' }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-4 sm:space-y-5"
                >
                  {/* Category Header: SERVICE 01 // 06 • Status Badge */}
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200/70 shadow-2xs">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-600 animate-pulse" />
                      <span className="font-mono text-xs font-bold uppercase tracking-widest text-brand-700">
                        SERVICE {currentService.number} // 06
                      </span>
                    </div>
                    <span className="font-mono text-[11px] text-neutral-500 font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-neutral-100 border border-neutral-200/60">
                      {currentService.statusBadge}
                    </span>
                  </div>

                  {/* Title: Big display typography strictly on ONE line */}
                  <h3 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-[1.8rem] xl:text-[2.15rem] 2xl:text-[2.35rem] font-bold tracking-tight text-neutral-950 leading-tight whitespace-nowrap">
                    {currentService.title}
                  </h3>

                  {/* Capability Pills */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    {currentService.pills.map((pill) => (
                      <span
                        key={pill}
                        className="px-3.5 py-1.5 rounded-full bg-white/95 border border-neutral-200/90 text-xs font-medium text-neutral-700 shadow-2xs hover:border-brand-500/50 hover:text-brand-700 hover:shadow-xs transition-all duration-200 select-none"
                      >
                        {pill}
                      </span>
                    ))}
                  </div>

                  {/* Commercial Action Links */}
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <Link
                      href={currentService.slug}
                      className="inline-flex items-center gap-2.5 px-5 sm:px-6 py-3 rounded-xl bg-neutral-950 hover:bg-brand-600 text-white text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-brand-500/25 group cursor-pointer"
                    >
                      <span>Explore Architecture & Scope</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>

                    <Link
                      href="/solutions"
                      className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl bg-white hover:bg-neutral-50 border border-neutral-200/90 hover:border-neutral-300 text-neutral-700 hover:text-neutral-950 text-xs sm:text-sm font-medium transition-colors shadow-2xs group cursor-pointer"
                    >
                      <span>Solutions Hub</span>
                      <ArrowRight className="h-3.5 w-3.5 text-neutral-400 group-hover:text-neutral-700 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ── RIGHT: BALANCED 3D ILLUSTRATION STAGE (Harmonious 4-col Presence) ── */}
            <div className="lg:col-span-4 flex items-center justify-center relative">
              {/* Soft ambient floor shadow & multi-layer purple glow */}
              <div className="absolute bottom-2 w-64 sm:w-72 lg:w-80 h-10 bg-brand-600/25 rounded-full blur-2xl -z-10 pointer-events-none" />
              <div className="absolute -inset-6 bg-radial from-brand-600/15 via-transparent to-transparent blur-2xl -z-10 pointer-events-none" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentService.number}
                  initial={{ opacity: 0, scale: 0.92, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.06, y: -16 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex items-center justify-center w-full"
                >
                  <motion.div
                    animate={
                      prefersReduced
                        ? {}
                        : { y: [0, -10, 0], rotate: [0, 0.8, 0] }
                    }
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative w-full max-w-[380px] sm:max-w-[420px] lg:max-w-[450px] xl:max-w-[475px] aspect-[4/3] flex items-center justify-center select-none"
                  >
                    {/* Glowing 3D Service Mockup Image (Balanced Visual Proportions) */}
                    <img
                      src={currentService.image}
                      alt={currentService.title}
                      className="w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(147,51,234,0.16)] drop-shadow-[0_6px_16px_rgba(0,0,0,0.06)] filter transition-transform duration-500 hover:scale-[1.02]"
                      draggable={false}
                    />

                    {/* Floating Telemetry Metric Chip (Frosted Glass) */}
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15, duration: 0.35 }}
                      className="absolute top-3 right-1 sm:top-4 sm:right-2 flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-xl border border-white/80 text-neutral-800 text-[11px] font-mono shadow-[0_8px_20px_rgba(0,0,0,0.08)] z-10"
                    >
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                      </span>
                      <span className="font-semibold tracking-tight">{currentService.telemetry.liveMetric}</span>
                    </motion.div>

                    {/* Floating Tag Chip (Obsidian Glass) */}
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.35 }}
                      className="absolute bottom-3 left-1 sm:bottom-4 sm:left-2 flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-neutral-950/90 backdrop-blur-xl border border-white/15 text-white text-xs font-mono shadow-[0_12px_30px_rgba(0,0,0,0.2)] z-10"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-400 shadow-[0_0_8px_rgba(192,132,252,0.9)]" />
                      <span className="text-brand-200 font-semibold tracking-wide">{currentService.telemetry.systemTag}</span>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
