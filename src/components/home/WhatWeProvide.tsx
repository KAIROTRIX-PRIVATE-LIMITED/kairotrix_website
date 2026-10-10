'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { EASE_CINEMATIC, EASE_PRECISE, MaskedReveal } from '@/lib/animations';

// ─────────────────────────────────────────────────────────────────────────────
// KAIROTRIX Section 03 — "Core Solutions" (Rotating Curved Orbital Dial)
//
// 1. Frozen Big Section Header: Locked at top-16/top-20 with full bold presence
//    (Eyebrow, "WHAT WE BUILD.", and narrative description; NO top tabs).
// 2. Preserved Scroll Animation: Full-height rotating curved orbital wheel where
//    active node centers at vertical midpoint (y = 50%) as user scrolls.
// 3. Centralized solution specs: Category badge, display title, dual-layer
//    Challenge/Solution/Outcome specs, and "Explore Solutions →" button.
// 4. Floating 3D circuit brain illustration with ambient depth & telemetry.
// ─────────────────────────────────────────────────────────────────────────────

interface ServiceData {
  number: string;
  shortLabel: string;
  title: string;
  architectureBadge: string;
  description: string;
  pills: string[];
  telemetry: {
    topBadge: string;
    bottomTag: string;
  };
  image: string;
  slug: string;
}

const SERVICES: ServiceData[] = [
  {
    number: '01',
    shortLabel: '01 AI Systems',
    title: 'AI & Intelligent Systems',
    architectureBadge: 'Human-in-the-Loop Validation',
    description:
      'AI applications, intelligent agents, voice systems, machine learning, and knowledge systems built for real business use.',
    pills: ['AI Agents & Voice', 'Custom AI Apps', 'RAG Knowledge Bases', 'Machine Learning'],
    telemetry: {
      topBadge: 'Verified Source Citations',
      bottomTag: 'Deterministic AI Architecture',
    },
    image: '/assets/images/service/SERVICE01.webp',
    slug: '/solutions/ai-intelligent-systems',
  },
  {
    number: '02',
    shortLabel: '02 Custom Software',
    title: 'Software & Product Engineering',
    architectureBadge: 'Full Source Code Ownership',
    description:
      'Custom business software, web applications, internal operations tools, and SaaS products engineered to scale with your company.',
    pills: ['Custom Business Software', 'Web & SaaS Apps', '0→1 Product Dev', 'Product UI/UX'],
    telemetry: {
      topBadge: 'Production-Grade Quality',
      bottomTag: 'Modern Web & API Systems',
    },
    image: '/assets/images/service/SERVICE02.webp',
    slug: '/solutions/software-product-engineering',
  },
  {
    number: '03',
    shortLabel: '03 Automation',
    title: 'Automation & Digital Operations',
    architectureBadge: 'Controlled Failure Handling',
    description:
      'End-to-end workflow automation, document processing, approval chains, and task orchestration that eliminate manual administrative busywork.',
    pills: ['Workflow Automation', 'Document Processing', 'Approval Chains', 'Task Automation'],
    telemetry: {
      topBadge: 'Automated Event Triggers',
      bottomTag: 'Event-Driven Workflow Engine',
    },
    image: '/assets/images/service/SERVICE03.webp',
    slug: '/solutions/automation-digital-operations',
  },
  {
    number: '04',
    shortLabel: '04 Modernization',
    title: 'Digital Transformation',
    architectureBadge: 'Zero-Downtime Migration',
    description:
      'Modern web and e-commerce development, process digitization, legacy modernization, and thoughtful UI/UX design.',
    pills: ['Web & E-Commerce', 'Process Digitization', 'Legacy Modernization', 'UI/UX Design'],
    telemetry: {
      topBadge: 'Staged System Cutover',
      bottomTag: 'Pragmatic Cloud Modernization',
    },
    image: '/assets/images/service/SERVICE04.webp',
    slug: '/solutions/digital-transformation',
  },
  {
    number: '05',
    shortLabel: '05 Data & BI',
    title: 'Data & Business Intelligence',
    architectureBadge: 'Structured Metric Models',
    description:
      'Business data analytics, real-time KPI dashboards, automated management reporting, and natural-language data query tools.',
    pills: ['KPI Dashboards', 'Business Analytics', 'Automated Reporting', 'NL Data Queries'],
    telemetry: {
      topBadge: 'Single Source of Truth',
      bottomTag: 'Unified Business Dashboards',
    },
    image: '/assets/images/service/SERVICE05.webp',
    slug: '/solutions/data-business-intelligence',
  },
  {
    number: '06',
    shortLabel: '06 Integrations',
    title: 'Technology Integration',
    architectureBadge: 'Validated Data Contracts',
    description:
      'API, CRM & ERP integrations, payment connections, and data synchronization that keep your core business systems working together.',
    pills: ['CRM & ERP Integration', 'API & System Bridges', 'Real-Time Data Sync', 'Payment Gateways'],
    telemetry: {
      topBadge: 'Bi-Directional Sync',
      bottomTag: 'Multi-System Middleware',
    },
    image: '/assets/images/service/SERVICE06.webp',
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

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : SERVICES.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < SERVICES.length - 1 ? prev + 1 : 0));
  };

  const currentService = SERVICES[activeIndex];
  const cx = ARC_CONFIG.apexX - ARC_CONFIG.radius;

  return (
    <section
      id="what-we-build"
      ref={containerRef}
      className="relative w-full bg-[#FAFAFC] border-t border-neutral-200/80 h-auto lg:h-[380vh]"
      aria-label="Section 03: What We Build"
    >
      {/* Background Architectural Grid Lines */}
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#00000004_1px,transparent_1px),linear-gradient(to_bottom,#00000004_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
        aria-hidden="true"
      />

      {/* ── 1. FROZEN BIG SECTION HEADER (Sticky at top-16 md:top-20) ──────── */}
      <div className="sticky top-16 md:top-20 z-30 w-full bg-[#FAFAFC]/95 backdrop-blur-md border-b border-neutral-200/80 py-4.5 px-4 sm:px-6 lg:px-8 shadow-2xs">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row md:items-end justify-between gap-4 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
              <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-pulse" />
              <motion.span
                initial={{ opacity: prefersReduced ? 1 : 0, letterSpacing: prefersReduced ? '0.25em' : '0.35em' }}
                whileInView={{ opacity: 1, letterSpacing: '0.25em' }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE_PRECISE }}
                className="font-tech text-xs font-semibold text-brand-600 uppercase"
              >
                What We Build
              </motion.span>
              <div className="h-px w-10 sm:w-16 bg-neutral-200" />
            </div>

            <MaskedReveal delay={0.06}>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] text-neutral-950 leading-[1.12]">
                WHAT WE{' '}
                <span className="gradient-signature-text">BUILD.</span>
              </h2>
            </MaskedReveal>
          </div>

          {/* Live Architecture Scope Pill & Enhanced AI Discovery Chip */}
          <motion.div
            initial={{ opacity: prefersReduced ? 1 : 0, scale: prefersReduced ? 1 : 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.12, ease: EASE_PRECISE }}
            className="hidden md:flex items-center gap-2.5"
          >
            <Link
              href="/solutions"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/85 hover:bg-white border border-neutral-200/80 hover:border-neutral-300 text-neutral-600 hover:text-neutral-900 text-xs font-mono shadow-2xs hover:shadow-xs transition-all duration-200 group cursor-pointer"
            >
              <span className="h-2 w-2 rounded-full bg-brand-500 animate-pulse" />
              <span className="font-semibold text-neutral-800 group-hover:text-purple-700 transition-colors">
                Solutions Hub
              </span>
              <span className="text-neutral-300">|</span>
              <span className="text-neutral-500 group-hover:text-neutral-700">Solutions</span>
              <ArrowRight className="w-3 h-3 text-neutral-400 group-hover:text-purple-600 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ── 2. DEDICATED MOBILE TOUCH CARD SHOWCASE (< lg) ────────────────── */}
      <div className="lg:hidden px-4 sm:px-6 py-6 space-y-5">
        {/* Mobile Stepper Controls: Index Indicator & Next/Prev */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold text-brand-600">
              {currentService.number}
            </span>
            <span className="text-neutral-300">/</span>
            <span className="font-mono text-xs text-neutral-400">
              06
            </span>
            <span className="mx-1 h-3 w-px bg-neutral-200" />
            <span className="text-xs font-medium text-neutral-500 truncate max-w-[170px]">
              {currentService.architectureBadge}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handlePrev}
              className="p-2 rounded-lg bg-white border border-neutral-200/80 text-neutral-700 hover:text-neutral-950 hover:bg-neutral-50 shadow-2xs cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
              aria-label="Previous service"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="p-2 rounded-lg bg-white border border-neutral-200/80 text-neutral-700 hover:text-neutral-950 hover:bg-neutral-50 shadow-2xs cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
              aria-label="Next service"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Active Service Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentService.number}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="bg-white border border-neutral-200/90 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4"
          >
            {/* 3D Illustration Container */}
            <div className="relative w-full aspect-[16/10] rounded-xl bg-gradient-to-b from-neutral-50 to-neutral-100/70 border border-neutral-100 flex items-center justify-center overflow-hidden p-3 sm:p-4">
              <img
                src={currentService.image}
                alt={currentService.title}
                className="w-full h-full object-contain drop-shadow-[0_12px_24px_rgba(147,51,234,0.14)]"
                draggable={false}
              />

              {/* Frosted Telemetry Badge */}
              <div className="absolute top-2 right-2 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-neutral-200/80 text-neutral-800 text-[10px] font-mono shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-semibold">{currentService.telemetry.topBadge}</span>
              </div>

              {/* Obsidian Telemetry Tag */}
              <div className="absolute bottom-2 left-2 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-950/90 backdrop-blur-md border border-white/10 text-[10px] font-mono shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-400" />
                <span className="text-brand-200 font-semibold">{currentService.telemetry.bottomTag}</span>
              </div>
            </div>

            {/* Title & Description */}
            <div className="text-center sm:text-left">
              <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-neutral-950 leading-snug">
                {currentService.title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                {currentService.description}
              </p>
            </div>

            {/* Capability Pills */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 pt-1">
              {currentService.pills.map((pill) => (
                <span
                  key={pill}
                  className="px-2.5 py-1 rounded-full bg-neutral-100/90 border border-neutral-200 text-[11px] font-medium text-neutral-700"
                >
                  {pill}
                </span>
              ))}
            </div>

            {/* Commercial Action Links */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              <Link
                href={currentService.slug}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-neutral-950 hover:bg-brand-600 text-white text-xs font-semibold tracking-wide transition-all shadow-xs"
              >
                <span>Explore Solutions</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/solutions"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-white hover:bg-neutral-50 border border-neutral-200/90 text-neutral-700 text-xs font-medium transition-colors shadow-2xs"
              >
                <span>Solutions Hub</span>
                <ArrowRight className="h-3 w-3 text-neutral-400" />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── 3. STICKY PRESERVED SCROLL STAGE (Rotating Orbital Dial for Desktop) ─ */}
      <div className="hidden lg:flex sticky top-[135px] md:top-[160px] z-20 h-[calc(100vh-9.5rem)] md:h-[calc(100vh-11rem)] items-center px-4 sm:px-6 lg:px-8 overflow-hidden">
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
                    aria-label={`Select solution ${srv.number}: ${srv.title}`}
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
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentService.number}
                  initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -16, filter: 'blur(4px)' }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-3 sm:space-y-3.5"
                >
                  {/* Category Header: CORE SOLUTION • Architecture Badge */}
                  

                  {/* Title: Big display typography with clean line breaking */}
                  <h3 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-[1.7rem] xl:text-[2rem] 2xl:text-[2.25rem] font-bold tracking-tight text-neutral-950 leading-tight">
                    {currentService.title}
                  </h3>

                  {/* Short and Sweet Plain-English Description */}
                  <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
                    {currentService.description}
                  </p>

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
                      <span>Explore Solutions</span>
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
                    <div className="relative w-full h-full flex items-center justify-center">
                      <Image
                        src={currentService.image}
                        alt={currentService.title}
                        width={475}
                        height={356}
                        sizes="(max-width: 640px) 380px, (max-width: 1024px) 450px, 475px"
                        loading="lazy"
                        className="w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(147,51,234,0.16)] drop-shadow-[0_6px_16px_rgba(0,0,0,0.06)] filter transition-transform duration-500 hover:scale-[1.02]"
                        draggable={false}
                      />
                    </div>

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
                      <span className="font-semibold tracking-tight">{currentService.telemetry.topBadge}</span>
                    </motion.div>

                    {/* Floating Tag Chip (Obsidian Glass) */}
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.35 }}
                      className="absolute bottom-3 left-1 sm:bottom-4 sm:left-2 flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-neutral-950/90 backdrop-blur-xl border border-white/15 text-white text-xs font-mono shadow-[0_12px_30px_rgba(0,0,0,0.2)] z-10"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-400 shadow-[0_0_8px_rgba(192,132,252,0.9)]" />
                      <span className="text-brand-200 font-semibold tracking-wide">{currentService.telemetry.bottomTag}</span>
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
