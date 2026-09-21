'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

export function WorkHero() {
  const containerRef = useRef<HTMLElement>(null);

  // Parallax scrolling physics matching spector.framer.website (Images 2, 3, 4):
  const { scrollY } = useScroll();

  // 1. Background moves up with subtle slow parallax
  const bgY = useTransform(scrollY, [0, 900], [0, -80]);

  // 2. Top metadata drifts up gently
  const topY = useTransform(scrollY, [0, 900], [0, -50]);

  // 3. Bottom headline moves up slowly (feels like it stays, but moves at deliberate slow pace)
  const textY = useTransform(scrollY, [0, 900], [0, -140]);

  // 4. Subtle atmospheric fade as the curtain slides over
  const heroOpacity = useTransform(scrollY, [0, 900], [1, 0.45]);

  return (
    <section
      ref={containerRef}
      className="sticky top-0 z-0 w-full h-screen h-[100dvh] max-h-screen bg-[#FAFAFC] text-neutral-900 flex flex-col justify-between px-6 sm:px-10 lg:px-16 pt-20 sm:pt-24 lg:pt-28 pb-6 sm:pb-8 lg:pb-10 overflow-hidden select-none"
    >
      {/* === BACKGROUND 3D ARCHITECTURAL RENDER (PRECISELY FRAMED WITH SLOW PARALLAX) === */}
      <motion.div
        style={{ y: bgY }}
        initial={{ scale: 1.04, opacity: 0.92 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        <Image
          src="/assets/images/hero/ChatGPT Image Sep 14, 2026, 08_01_34 PM.png"
          alt="KAIROTRIX 3D Core Architecture"
          fill
          priority
          sizes="100vw"
          className="object-cover object-right lg:object-center"
        />

        {/* Ambient violet energy glow behind the processor core conduits */}
        <div
          className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-brand-500/10 blur-[130px] pointer-events-none"
          aria-hidden="true"
        />

        {/* Ultra-subtle bottom edge blend into curtain section */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#FAFAFC] to-transparent pointer-events-none"
          aria-hidden="true"
        />
      </motion.div>

      {/* === TOP METADATA: CLEAN EDITORIAL TYPOGRAPHY (WEBSITE BRAND FONTS) === */}
      <motion.div
        style={{ y: topY, opacity: heroOpacity }}
        className="flex items-start justify-between gap-6 z-10"
      >
        {/* Left: Studio Identity & Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-0.5"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-pulse" />
            <span className="font-tech text-xs tracking-[0.25em] font-semibold text-brand-600 uppercase">
              KAIROTRIX // WORK
            </span>
            <div className="h-px w-10 sm:w-16 bg-neutral-200" />
          </div>
          <h2 className="font-display text-sm sm:text-base md:text-lg font-bold tracking-tight text-neutral-950 uppercase mt-1">
            ENGINEERING &amp; EXPERIMENTS
          </h2>
        </motion.div>

        {/* Top-Right: Kept completely open so the 3D Core Architecture is 100% visible */}
        <div className="hidden sm:block" />
      </motion.div>

      {/* === LEFT-CENTER: COMMANDING DISPLAY STAGE (ELIMINATES EMPTY VOID) === */}
      <motion.div
        style={{ y: textY, opacity: heroOpacity }}
        className="z-10 max-w-2xl lg:max-w-3xl my-auto py-4 sm:py-6"
      >
        <h1 className="font-display text-3xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold uppercase tracking-[-0.03em] leading-[1.04] text-neutral-950">
          {/* Line 1: In Brand Purple Accent with Staggered Rise & Kinetic Asterisk */}
          <div className="overflow-hidden mb-0.5 sm:mb-1">
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2 sm:gap-3 whitespace-nowrap"
            >
              <span className="gradient-signature-text">WE DON&apos;T JUST</span>
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                className="inline-block text-brand-500 select-none text-xl sm:text-3xl lg:text-4xl font-light"
              >
                ✱
              </motion.span>
            </motion.div>
          </div>

          {/* Line 2: Dominant Solid Dark Text */}
          <div className="overflow-hidden mb-0.5 sm:mb-1">
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-neutral-950 whitespace-nowrap"
            >
              CLAIM CAPABILITY.
            </motion.div>
          </div>

          {/* Line 3: Dominant Solid Dark Text */}
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
              className="text-neutral-900 whitespace-nowrap"
            >
              WE DEMONSTRATE IT.
            </motion.div>
          </div>
        </h1>

        {/* Narrative Statement: Truthful description of what follows */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 sm:mt-6 text-base sm:text-lg text-neutral-600 font-sans leading-relaxed max-w-xl"
        >
          Software, AI, automation, data, and connected systems—shown through projects, experiments, and working technical demonstrations.
        </motion.p>

        {/* Compact Telemetry Ribbon below headline */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 sm:mt-6 flex flex-wrap items-center gap-2.5 sm:gap-3.5 text-[11px] sm:text-xs font-mono"
        >
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-neutral-950 text-white font-medium tracking-wide shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
            <span>2026 // BUILDS &amp; DEMOS</span>
          </div>
          <span className="text-neutral-300">/</span>
          <span className="tracking-wide text-neutral-600 font-medium uppercase text-[10px] sm:text-[11px]">
            PROJECTS • EXPERIMENTS • TECHNICAL DEMOS
          </span>
          <span className="text-neutral-300 hidden sm:inline">/</span>
          <a
            href="#selected-work"
            className="hidden sm:inline-flex items-center gap-1 text-brand-600 hover:text-brand-700 font-bold font-display tracking-wider transition-colors group cursor-pointer"
          >
            <span>EXPLORE</span>
            <span className="transition-transform group-hover:translate-y-0.5">↓</span>
          </a>
        </motion.div>
      </motion.div>

      {/* Subtle bottom spacer for balanced flex-col vertical rhythm */}
      <div className="hidden sm:block h-2" />
    </section>
  );
}
