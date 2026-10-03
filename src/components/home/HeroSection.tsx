'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

// ─────────────────────────────────────────────────────────────────────────────
// KAIROTRIX HeroSection — Unified Light-Theme Master Hero
//
// Aligned with SolutionsHero & WorkHero standards:
// 1. Unified H1 scale: font-display text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold uppercase
// 2. Signature gradient text accent on final clause: gradient-signature-text
// 3. Precision Eyebrow: Pulse brand dot + font-tech text-xs tracking-[0.25em] + hairline divider + mono badge
// 4. Subtitle scale: text-base sm:text-lg text-neutral-600 font-normal leading-relaxed
// 5. Unified dual CTAs with tactile hover & transition states
// 6. Seamless integration with interactive robot video (Robot_tracking_mouse_and_waving.mp4)
// ─────────────────────────────────────────────────────────────────────────────

const VIDEO_URL = '/assets/videos/Robot_tracking_mouse_and_waving.mp4';
const SENSITIVITY = 0.8;
const FILM_EASE = [0.16, 1, 0.3, 1] as const;

export function HeroSection() {
  const prefersReduced = useReducedMotion();

  // ── Video scrubbing state & refs ───────────────────────────────────────────
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const prevXRef = useRef<number | null>(null);
  const targetTimeRef = useRef<number>(0);
  const isSeekingRef = useRef<boolean>(false);
  const pendingSeekRef = useRef<boolean>(false);
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false);

  // ── Execute seek safely without flooding browser media decoder ────────────
  const executeSeek = useCallback(() => {
    const video = videoRef.current;
    if (!video || isNaN(video.duration) || isSeekingRef.current) return;

    isSeekingRef.current = true;
    try {
      video.currentTime = targetTimeRef.current;
    } catch {
      isSeekingRef.current = false;
    }
  }, []);

  const handleSeeked = useCallback(() => {
    isSeekingRef.current = false;
    const video = videoRef.current;
    if (!video || isNaN(video.duration)) return;

    if (pendingSeekRef.current || Math.abs(video.currentTime - targetTimeRef.current) > 0.05) {
      pendingSeekRef.current = false;
      executeSeek();
    }
  }, [executeSeek]);

  // ── Window mousemove listener for horizontal scrub ────────────────────────
  useEffect(() => {
    // Completely disable scrubbing and playback on mobile or if prefersReduced
    if (prefersReduced || (typeof window !== 'undefined' && window.innerWidth < 1024)) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const video = videoRef.current;
      if (!video || !video.duration || isNaN(video.duration)) return;

      if (prevXRef.current === null) {
        prevXRef.current = e.clientX;
        return;
      }

      const delta = e.clientX - prevXRef.current;
      prevXRef.current = e.clientX;

      const duration = video.duration;
      const timeDelta = (delta / window.innerWidth) * SENSITIVITY * duration;
      targetTimeRef.current = Math.max(0, Math.min(duration, targetTimeRef.current + timeDelta));

      if (!isSeekingRef.current) {
        executeSeek();
      } else {
        pendingSeekRef.current = true;
      }
    };

    const handleMouseLeave = () => {
      prevXRef.current = null;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [prefersReduced, executeSeek]);

  // ── Animation Variants (Film Ease) ────────────────────────────────────────
  const containerVariants = {
    hidden: { opacity: prefersReduced ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReduced ? 0 : 0.12,
        delayChildren: prefersReduced ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: FILM_EASE },
    },
  };

  return (
    <section
      ref={containerRef}
      aria-label="Hero — KAIROTRIX"
      className="relative w-full min-h-[100dvh] lg:h-screen lg:min-h-[680px] lg:max-h-[1100px] overflow-hidden bg-[#FAFAFC] text-neutral-950 flex items-center select-none border-b border-neutral-200/90 py-20 lg:py-0"
    >
      {/* ── 1. BACKGROUND VIDEO (Desktop Only, Interactive Mouse-Scrub Controlled) ── */}
      <video
        ref={videoRef}
        src={VIDEO_URL}
        muted
        playsInline
        preload="auto"
        onLoadedMetadata={() => {
          setVideoLoaded(true);
          const video = videoRef.current;
          if (video && video.duration && !isNaN(video.duration)) {
            video.currentTime = Math.min(0.1, video.duration);
            targetTimeRef.current = Math.min(0.1, video.duration);
          }
        }}
        onSeeked={handleSeeked}
        className="hidden lg:block absolute inset-0 w-full h-full object-cover object-[68%_center] z-0 pointer-events-none select-none transition-opacity duration-500"
      />

      {/* ── Soft Editorial Contrast Scrim (Desktop Only) ───────────────────────── */}
      <div 
        className="hidden lg:block absolute inset-0 z-1 pointer-events-none lg:bg-gradient-to-r lg:from-[#FAFAFC] lg:via-[#FAFAFC]/90 lg:to-transparent lg:w-3/4" 
        aria-hidden="true" 
      />

      {/* ── 2. HERO CONTENT CONTAINER (Centered on Mobile, Left-Aligned on Desktop) ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-0 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 xl:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left mx-auto lg:mx-0 w-full"
        >
          {/* Eyebrow: Precision Horizon Layout */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3 mb-4 sm:mb-6 mx-auto lg:mx-0">
            <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-pulse shadow-[0_0_8px_rgba(147,51,234,0.8)]" />

            <span className="font-tech text-xs tracking-[0.25em] font-semibold text-brand-600 uppercase">
              KAIROTRIX // SYSTEMS
            </span>

            <div className="h-px w-8 sm:w-12 bg-neutral-300" />

            <span className="font-mono text-xs text-neutral-900 uppercase tracking-wider font-semibold">
              [KTRX®]
            </span>

            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white border border-neutral-200/90 font-mono text-[10px] uppercase tracking-wider text-neutral-600 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Custom Software &bull; AI Systems &bull; Business Automation</span>
            </span>
          </motion.div>

          {/* Master Display Headline (Center-aligned on Mobile, Left on Desktop) */}
          <motion.h1
            variants={itemVariants}
            className="font-display text-3xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold uppercase tracking-[-0.03em] text-neutral-950 leading-[1.08] sm:leading-[1.06] mb-4 sm:mb-6 text-center lg:text-left"
          >
            <span className="block">TECHNOLOGY BUILT</span>
            <span className="block">
              TO SOLVE <span className="gradient-signature-text">REAL PROBLEMS.</span>
            </span>
          </motion.h1>

          {/* Description Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-lg text-neutral-600 font-sans leading-relaxed font-normal max-w-2xl mb-6 sm:mb-8 text-center lg:text-left mx-auto lg:mx-0"
          >
            We are a technology company that builds custom software, AI systems, automation, and data integrations to solve real business problems.
          </motion.p>

          {/* Dual CTAs (Centered on Mobile) */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pointer-events-auto w-full sm:w-auto mx-auto lg:mx-0"
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
              <Link
                href="/solutions"
                className="group flex sm:inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-full bg-brand-600 hover:bg-brand-500 text-white font-display text-xs sm:text-sm font-bold tracking-[0.16em] uppercase shadow-[0_4px_24px_rgba(147,51,234,0.35)] hover:shadow-[0_6px_32px_rgba(147,51,234,0.5)] transition-all duration-300 w-full sm:w-auto text-center"
              >
                <span>Explore What We Build</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
              <Link
                href="/contact"
                className="group flex sm:inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-full bg-white hover:bg-neutral-50 border border-neutral-300 hover:border-neutral-400 text-neutral-800 text-sm font-semibold tracking-wide transition-all shadow-xs cursor-pointer w-full sm:w-auto text-center"
              >
                <span>Discuss Your Project</span>
                <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-brand-600 group-hover:translate-x-0.5 transition-all" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Interactive Specimen Telemetry Hint */}
          <motion.div
            variants={itemVariants}
            className="mt-6 sm:mt-7 inline-flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-neutral-200/90 backdrop-blur-md text-neutral-600 font-mono text-[10px] sm:text-[11px] shadow-2xs select-none mx-auto lg:mx-0"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500 shadow-[0_0_6px_rgba(147,51,234,0.8)] animate-pulse" />
            <span className="hidden sm:inline">Interactive Specimen &bull; Move cursor horizontally to track robot</span>
            <span className="sm:hidden">Autonomous AI &bull; Interactive Systems</span>
          </motion.div>
        </motion.div>

        {/* Right side unobstructed: leaving space for the interactive robot on desktop */}
        <div className="hidden lg:block lg:col-span-5 xl:col-span-5 pointer-events-none" aria-hidden="true" />
      </div>

      {/* ── 3. SCROLL INDICATOR ────────────────────────────────────────────── */}
      <div
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-auto cursor-pointer"
        aria-hidden="true"
      >
        <Link
          href="/#what-is-kairotrix"
          className="flex flex-col items-center gap-1.5 text-neutral-500 hover:text-neutral-950 transition-colors group"
        >
          <span className="font-tech text-[9px] tracking-[0.3em] uppercase font-bold text-neutral-500 group-hover:text-neutral-950 transition-colors">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
            className="w-px h-6 bg-gradient-to-b from-brand-500 to-transparent group-hover:h-8 transition-all duration-300"
          />
        </Link>
      </div>
    </section>
  );
}
