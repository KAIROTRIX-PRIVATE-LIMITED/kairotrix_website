'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const HUD_VERBS = ['DEMONSTRATE', 'EXPERIMENT', 'PROTOTYPE', 'DEPLOY', 'SCALE'];
const FILM_EASE = [0.16, 1, 0.3, 1] as const;

export function WorkHero() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [verbIdx, setVerbIdx] = useState(0);

  const mouseX = useSpring(0, { damping: 28, stiffness: 260 });
  const mouseY = useSpring(0, { damping: 28, stiffness: 260 });

  useEffect(() => {
    setIsMounted(true);
    const interval = setInterval(() => {
      setVerbIdx((prev) => (prev + 1) % HUD_VERBS.length);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left + 16);
    mouseY.set(e.clientY - rect.top + 16);
    if (!isHovered) setIsHovered(true);
  };

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Spector Curtain Scroll Exit Transforms
  const contentY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, -60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.35]);
  const contentScale = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [1, 1] : [1, 0.92]);
  const bgY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ['0%', '0%'] : ['0%', '15%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [1, 1] : [1, 1.08]);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setIsHovered(false)}
      className="sticky top-0 w-full h-[100dvh] bg-[#FAFAFC] flex flex-col overflow-hidden z-0 border-b border-neutral-200/90"
    >
      {/* ── Spector Floating Interactive Crosshair HUD ── */}
      {isMounted && !shouldReduceMotion && (
        <motion.div
          style={{ x: mouseX, y: mouseY, opacity: isHovered ? 1 : 0 }}
          className="pointer-events-none absolute top-0 left-0 z-30 hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-950/85 text-white backdrop-blur-md border border-white/20 shadow-lg select-none transition-opacity duration-300"
        >
          <span className="text-brand-400 text-xs font-bold leading-none">+</span>
          <span className="font-mono text-[10px] font-bold tracking-widest uppercase">
            {HUD_VERBS[verbIdx]}
          </span>
        </motion.div>
      )}

      {/* ── Layer 1: Background image with Spector optical zoom (1.15 -> 1.0) + parallax exit ── */}
      <motion.div
        className="absolute inset-0 z-0 origin-center overflow-hidden"
        style={isMounted ? { y: bgY, scale: bgScale } : undefined}
        suppressHydrationWarning
      >
        <motion.div
          className="relative w-full h-full"
          initial={shouldReduceMotion ? { scale: 1, opacity: 0.6 } : { scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 1.6, ease: FILM_EASE }}
        >
          <Image
            src="/assets/images/hero/ChatGPT Image Sep 14, 2026, 08_01_34 PM.png"
            alt="KAIROTRIX 3D Core Architecture"
            fill
            priority
            sizes="100vw"
            className="object-cover object-right lg:object-center"
          />
        </motion.div>
      </motion.div>

      {/* ── Layer 2: Light gradient overlay ── */}
      <div
        className="absolute inset-0 z-[1] bg-gradient-to-r from-[#FAFAFC] via-[#FAFAFC]/90 to-[#FAFAFC]/50 pointer-events-none"
        aria-hidden="true"
      />

      {/* ── Layer 3: Subtle grid texture ── */}
      <div
        className="absolute inset-0 z-[2] bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"
        aria-hidden="true"
      />

      {/* ── Layer 4: Brand accent glows with soft luminous swell ── */}
      <motion.div
        className="absolute inset-0 z-[2] pointer-events-none"
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8, delay: 0.2 }}
        style={isMounted ? { opacity: contentOpacity } : undefined}
        suppressHydrationWarning
      >
        <div
          className="absolute -top-28 -left-28 w-[540px] h-[540px] bg-purple-600/6 blur-[140px] pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute top-1/3 -right-28 w-[640px] h-[640px] bg-indigo-600/5 blur-[160px] pointer-events-none"
          aria-hidden="true"
        />
      </motion.div>

      {/* ── Coordinated Content Stage with Spector Recede & Masked Reveal ── */}
      <motion.div
        style={isMounted ? { y: contentY, opacity: contentOpacity, scale: contentScale } : undefined}
        suppressHydrationWarning
        className="relative z-10 flex-1 flex flex-col items-center lg:items-start max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-24 sm:pt-36 lg:pt-40 pb-8 sm:pb-10 text-center lg:text-left"
      >
        {/* 1. Eyebrow: Precision Technical Horizon Reveal */}
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3 mb-5 sm:mb-6 mx-auto lg:mx-0">
          <motion.span
            initial={shouldReduceMotion ? {} : { scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex h-2 w-2 rounded-full bg-brand-500 animate-pulse"
          />

          <motion.span
            initial={shouldReduceMotion ? {} : { opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: FILM_EASE }}
            className="font-tech text-xs tracking-[0.25em] font-semibold text-brand-600 uppercase"
          >
            KAIROTRIX // WORK
          </motion.span>

          <motion.div
            initial={shouldReduceMotion ? {} : { scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.28, ease: FILM_EASE }}
            style={{ originX: 0 }}
            className="h-px w-10 sm:w-16 bg-neutral-200 hidden sm:block"
          />

          <motion.span
            initial={shouldReduceMotion ? {} : { opacity: 0, filter: 'blur(3px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.45, delay: 0.35 }}
            className="font-mono text-xs tracking-wider uppercase font-semibold text-neutral-900"
          >
            [KAIROTRIX // ENGINEERING]
          </motion.span>

          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.42 }}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white border border-neutral-200/80 font-mono text-[10px] uppercase tracking-wider text-neutral-600 shadow-2xs"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>ENGINEERING &amp; EXPERIMENTS</span>
          </motion.div>
        </div>

        {/* Headline & Body Container */}
        <div className="max-w-5xl mx-auto lg:mx-0">
          {/* 2. Monumental Headline: Spector Masked Line-by-Line Rise */}
          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold uppercase tracking-[-0.03em] text-neutral-950 leading-[1.08] sm:leading-[1.06] mb-5 sm:mb-6 text-center lg:text-left">
            <div className="overflow-hidden">
              <motion.span
                initial={shouldReduceMotion ? {} : { opacity: 0, y: '100%' }}
                animate={{ opacity: 1, y: '0%' }}
                transition={{ duration: 0.85, delay: 0.22, ease: FILM_EASE }}
                className="block"
              >
                WE DON&apos;T JUST CLAIM CAPABILITY.
              </motion.span>
            </div>
            <div className="overflow-hidden">
              <motion.span
                initial={shouldReduceMotion ? {} : { opacity: 0, y: '100%' }}
                animate={{ opacity: 1, y: '0%' }}
                transition={{ duration: 0.85, delay: 0.35, ease: FILM_EASE }}
                className="gradient-signature-text block"
              >
                WE DEMONSTRATE IT.
              </motion.span>
            </div>
          </h1>

          {/* 3. Subtitle: Optical Focus Pull */}
          <motion.p
            initial={shouldReduceMotion ? {} : { opacity: 0, filter: 'blur(8px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.85, delay: 0.5, ease: FILM_EASE }}
            className="text-sm sm:text-lg text-neutral-600 font-sans leading-relaxed font-normal max-w-3xl mb-7 sm:mb-8 text-center lg:text-left mx-auto lg:mx-0"
          >
            Software, AI, automation, data, and connected systems—shown through real projects,
            experiments, and working technical demonstrations.
          </motion.p>

          {/* 4. Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 sm:gap-4 w-full sm:w-auto mx-auto lg:mx-0">
            <motion.a
              initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.94, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.65, ease: FILM_EASE }}
              href="#selected-work"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-neutral-900 text-white font-bold text-sm tracking-wide hover:bg-brand-600 transition-all duration-200 shadow-md cursor-pointer group w-full sm:w-auto text-center"
            >
              <span>Explore Work</span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
            </motion.a>

            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.75, ease: FILM_EASE }}
              className="w-full sm:w-auto text-center"
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-neutral-600 hover:text-brand-600 transition-colors py-2 px-1 group cursor-pointer w-full sm:w-auto"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-brand-600 group-hover:translate-x-0.5 transition-all" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* 5. Bottom Stats Strip: Sequential Instrument Telemetry Activation */}
        <div className="mt-auto relative pt-8">
          {/* Laser horizontal beam dividing line */}
          <motion.div
            initial={shouldReduceMotion ? {} : { scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1, ease: FILM_EASE }}
            style={{ originX: 0 }}
            className="absolute top-0 left-0 right-0 h-px bg-neutral-200/80"
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 1.22, ease: FILM_EASE }}
            >
              <div className="font-display font-black text-2xl sm:text-3xl text-neutral-950">2026</div>
              <div className="font-mono text-[11px] uppercase tracking-wider text-neutral-500 mt-1">
                Builds &amp; Demos
              </div>
            </motion.div>

            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 1.32, ease: FILM_EASE }}
            >
              <div className="font-display font-black text-2xl sm:text-3xl text-neutral-950">Projects</div>
              <div className="font-mono text-[11px] uppercase tracking-wider text-neutral-500 mt-1">
                Real Deliverables
              </div>
            </motion.div>

            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 1.42, ease: FILM_EASE }}
            >
              <div className="font-display font-black text-2xl sm:text-3xl text-neutral-950">Experiments</div>
              <div className="font-mono text-[11px] uppercase tracking-wider text-neutral-500 mt-1">
                Technical Exploration
              </div>
            </motion.div>

            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 1.52, ease: FILM_EASE }}
            >
              <div className="font-display font-black text-2xl sm:text-3xl text-brand-600">Live Demos</div>
              <div className="font-mono text-[11px] uppercase tracking-wider text-neutral-500 mt-1">
                Working Systems
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
