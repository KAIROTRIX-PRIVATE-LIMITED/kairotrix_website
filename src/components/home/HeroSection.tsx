'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { HeroBackgroundCanvas } from '@/components/home/HeroBackgroundCanvas';

// ─────────────────────────────────────────────────────────────────────────────
// KAIROTRIX HeroSection — Cinematic Identity & Scroll-Controlled Video Reveal
//
// Stage 1 (0% scroll):
//   - Interactive 3D digital wave mesh canvas reacting to cursor position in real-time.
//   - Luminous, airy ambient lighting (#FAFAFC / #FFFFFF).
//   - Substantial, commanding central composition:
//       [ KAIROTRIX // BUILT TO EVOLVE ] (top pill)
//       "BUILT IN SILENCE"  —  [ 150px VIDEO MASK SYMBOL ]  —  "PROVEN IN MOTION"
//       "AI Systems • Software Engineering • Intelligent Automation" (sub-caption)
//
// Stage 2 (0% → 70% scroll):
//   - Taglines and framing elements smoothly part and dissolve early (0% → 18%).
//   - Logo mask expands outwards smoothly from 150px to full-screen breakout.
//   - Canvas and light background dissolve seamlessly into the dark video universe.
//
// Stage 3 (70% → 100% scroll):
//   - Full-bleed cinematic video.
//   - Bold white headline "BECOME WHAT YOU WORK FOR" slides up & fades in.
//   - Ambient glowing "Explore KAIROTRIX" CTA button.
// ─────────────────────────────────────────────────────────────────────────────

const SCROLL_MULTIPLIER = 4;
const SYMBOL_MASK_URL = "url('/assets/brand/kairotrix-symbol.svg')";

export function HeroSection() {
  const prefersReduced = useReducedMotion();

  // Outer tall wrapper for scroll distance
  const containerRef = useRef<HTMLDivElement>(null);

  // Animated DOM refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoMaskRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const taglineLeftRef = useRef<HTMLSpanElement>(null);
  const taglineRightRef = useRef<HTMLSpanElement>(null);
  const identitySubRef = useRef<HTMLParagraphElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReduced) return;

    const container = containerRef.current;
    const video = videoRef.current;
    const videoMask = videoMaskRef.current;
    const bg = bgRef.current;
    const taglineLeft = taglineLeftRef.current;
    const taglineRight = taglineRightRef.current;
    const identitySub = identitySubRef.current;
    const scrollHint = scrollHintRef.current;
    const overlay = overlayRef.current;

    if (!container || !videoMask || !bg) return;

    let ticking = false;

    function applyScrollProgress() {
      ticking = false;
      if (!container || !videoMask || !bg) return;

      const rect = container.getBoundingClientRect();
      const totalScrollable = container.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      const scrolled = Math.max(0, -rect.top);
      const progress = Math.min(1, Math.max(0, scrolled / totalScrollable));

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const isMobile = vw < 768;

      // ── 1. Logo Mask Scaling (150px initial -> Full-screen breakout) ─────────
      const initialSize = isMobile ? 110 : 150;
      const maxDimension = Math.max(vw, vh);
      const targetMaxSize = maxDimension * 7;

      if (progress >= 0.72) {
        videoMask.style.webkitMaskImage = 'none';
        videoMask.style.maskImage = 'none';
      } else {
        videoMask.style.webkitMaskImage = SYMBOL_MASK_URL;
        videoMask.style.maskImage = SYMBOL_MASK_URL;
        videoMask.style.webkitMaskPosition = 'center';
        videoMask.style.maskPosition = 'center';
        videoMask.style.webkitMaskRepeat = 'no-repeat';
        videoMask.style.maskRepeat = 'no-repeat';

        const eased = Math.pow(progress / 0.72, 2.2);
        const currentSize = Math.round(initialSize + eased * (targetMaxSize - initialSize));

        const sizeStr = `${currentSize}px ${currentSize}px`;
        videoMask.style.webkitMaskSize = sizeStr;
        videoMask.style.maskSize = sizeStr;
      }

      // ── 2. Light Background & Interactive Canvas Dissolve (0% → 40%) ───────
      const bgOpacity = Math.max(0, 1 - progress / 0.4);
      bg.style.opacity = bgOpacity.toFixed(3);

      // ── 3. Central Identity Elements Part & Dissolve Early (0% → 18%) ───────
      // Ensures complete clearance before the video expands over them
      const textProgress = Math.min(1, progress / 0.18);
      const maxSlide = isMobile ? 70 : 130;
      const slideDist = Math.pow(textProgress, 1.2) * maxSlide;
      const textOpacity = Math.max(0, 1 - Math.pow(textProgress, 1.1));

      if (taglineLeft) {
        taglineLeft.style.transform = `translateX(${-slideDist.toFixed(1)}px) translateZ(0)`;
        taglineLeft.style.opacity = textOpacity.toFixed(3);
      }
      if (taglineRight) {
        taglineRight.style.transform = `translateX(${slideDist.toFixed(1)}px) translateZ(0)`;
        taglineRight.style.opacity = textOpacity.toFixed(3);
      }
      if (identitySub) {
        identitySub.style.transform = `translateY(${slideDist * 0.4}px) translateZ(0)`;
        identitySub.style.opacity = textOpacity.toFixed(3);
      }

      // ── 4. Scroll Indicator Fade ───────────────────────────────────────────
      if (scrollHint) {
        const hintOpacity = Math.max(0, 1 - progress / 0.12);
        scrollHint.style.opacity = hintOpacity.toFixed(3);
      }

      // ── 5. Overlay Headline Slide Up & Fade In (55% → 92%) ─────────────────
      if (overlay) {
        const headlineProgress = Math.max(0, Math.min(1, (progress - 0.55) / 0.37));
        overlay.style.opacity = headlineProgress.toFixed(3);
        overlay.style.transform = `translateY(${(1 - headlineProgress) * 28}px)`;
        overlay.style.pointerEvents = headlineProgress > 0.05 ? 'auto' : 'none';
      }

      // ── 6. Video Playback Control ──────────────────────────────────────────
      // Starts playing when scrolling reaches the video visually (progress >= 0.4)
      if (video) {
        if (progress >= 0.4 && progress <= 1.0) {
          if (video.paused) {
            const playPromise = video.play();
            if (playPromise !== undefined) {
              playPromise.catch(() => {});
            }
          }
        } else {
          // Paused when in the top identity stage or completely past the hero
          if (!video.paused) {
            video.pause();
            if (progress < 0.2) {
              video.currentTime = 0; // Rewind to start so it starts fresh on next scroll down
            }
          }
        }
      }
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(applyScrollProgress);
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    applyScrollProgress();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (video && !video.paused) {
        video.pause();
      }
    };
  }, [prefersReduced]);

  // ── Reduced-motion fallback ────────────────────────────────────────────────
  if (prefersReduced) {
    return (
      <section
        aria-label="Hero — KAIROTRIX"
        className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-[#FAFAFC]"
      >
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          src="/assets/videos/home-hero.mp4"
        />
        {/* Full-height Left Cinema Gradient anchored to left edge */}
        <div
          className="absolute inset-y-0 left-0 w-full lg:w-[62%] bg-gradient-to-r from-black/90 via-black/60 via-45% to-transparent pointer-events-none"
          aria-hidden="true"
        />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 pt-20 sm:pt-24 lg:pt-28 pb-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/30 backdrop-blur-xl border border-white/20 text-neutral-100 font-display text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase mb-6 shadow-[0_4px_24px_rgba(0,0,0,0.35)]">
              <span className="w-2 h-2 rounded-full bg-brand-400 shadow-[0_0_10px_bg-brand-400] animate-pulse" />
              <span>Custom Software &bull; AI Systems &bull; Business Automation</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[56px] xl:text-[64px] font-extrabold text-neutral-0 uppercase leading-[1.05] tracking-[-0.025em] text-left drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              Technology Built to Solve Real Problems
            </h1>
            <p className="mt-6 text-neutral-200 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed font-sans text-left drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
              We are a technology company that builds custom software, AI systems, automation, and data integrations to solve real business problems.
            </p>
            <div className="mt-8 sm:mt-10">
              <Link
                href="/solutions"
                className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-brand-600 hover:bg-brand-500 text-neutral-0 font-display text-xs md:text-sm font-bold tracking-[0.16em] uppercase shadow-[0_0_30px_rgba(147,51,234,0.5)] transition-all"
              >
                <span>Explore What We Build</span>
              </Link>
            </div>
          </div>
          <div className="hidden lg:block lg:col-span-5 xl:col-span-5 pointer-events-none" aria-hidden="true" />
        </div>
      </section>
    );
  }

  // ── Full scroll-animated hero ───────────────────────────────────────────────
  return (
    <div
      ref={containerRef}
      style={{ height: `${SCROLL_MULTIPLIER * 100}vh` }}
      className="relative w-full"
    >
      {/* Pinned 100vh viewport */}
      <section
        aria-label="Hero — KAIROTRIX"
        className="sticky top-0 w-full h-screen overflow-hidden bg-[#FAFAFC]"
      >
        {/* ── Layer 1: Light Theme Video Background (Fades out 0% → 40%) ─────── */}
        <div
          ref={bgRef}
          className="absolute inset-0 bg-[#FAFAFC] z-0 overflow-hidden will-change-[opacity]"
          style={{ transition: 'none' }}
        >
          {/* 3D Perspective Grid Tunnel Background (Canvas) */}
          <HeroBackgroundCanvas />

          {/* Soft ambient clarity wash for center logo & text */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 75% 60% at 50% 50%, rgba(250,250,252,0.55) 0%, rgba(250,250,252,0.18) 60%, transparent 100%)',
            }}
          />
        </div>

        {/* ── Layer 2: Commanding Centered Identity Stage ─────────────────────── */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {/* Main Symmetrical Lockup: EXACTLY CENTERED at 50vh, locked to the video logo mark */}
          <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex items-center justify-center px-4">
            {/* Left Tagline: BUILT TO EVOLVE */}
            <span
              ref={taglineLeftRef}
              className="font-tech text-base sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-[0.2em] uppercase select-none text-neutral-950 whitespace-nowrap text-right leading-none will-change-[opacity,transform]"
              style={{ transition: 'none' }}
              aria-hidden="true"
            >
              Built to Evolve
            </span>

            {/* Center Spacer: matches the 150px logo video portal exactly */}
            <div
              className="w-[110px] h-[110px] md:w-[150px] md:h-[150px] mx-3 sm:mx-4 md:mx-6 flex-shrink-0"
              aria-hidden="true"
            />

            {/* Right Tagline: MADE TO SOLVE (tracking tuned to [0.26em] for exact equal visual weight to Built to Evolve) */}
            <span
              ref={taglineRightRef}
              className="font-tech text-base sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-[0.26em] uppercase select-none text-neutral-950 whitespace-nowrap text-left leading-none will-change-[opacity,transform]"
              style={{ transition: 'none' }}
              aria-hidden="true"
            >
              Made to Solve
            </span>
          </div>

          {/* SEO & Accessibility Headline (accessible to search engines & screen readers) */}
          <h1 className="sr-only">
            KAIROTRIX — Technology Company | Custom Software, AI Systems &amp; Business Automation | Built to Evolve
          </h1>

          {/* Category Descriptors: Generously spaced below the 150px logo */}
          <div
            ref={identitySubRef}
            className="absolute top-[calc(50%+112px)] sm:top-[calc(50%+122px)] left-0 right-0 flex items-center justify-center text-center px-6 will-change-[opacity,transform]"
            style={{ transition: 'none' }}
          >
            <p className="font-tech text-[9px] sm:text-[10px] md:text-[11px] font-semibold tracking-[0.28em] uppercase text-neutral-600/80 whitespace-nowrap text-center">
              Custom Software &bull; AI Systems &bull; Business Automation
            </p>
          </div>
        </div>

        {/* ── Layer 3: Masked Video Container (Positioned ABOVE identity) ─────── */}
        {/* Starts as a commanding 150px logo mark in the center, expands on scroll */}
        <div
          ref={videoMaskRef}
          className="absolute inset-0 z-20 pointer-events-none will-change-[mask-size,-webkit-mask-size]"
          style={{
            WebkitMaskImage: SYMBOL_MASK_URL,
            maskImage: SYMBOL_MASK_URL,
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
            maskPosition: 'center',
            WebkitMaskSize: '150px 150px',
            maskSize: '150px 150px',
            transition: 'none',
          }}
        >
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            muted
            loop
            playsInline
            preload="auto"
            src="/assets/videos/home-hero.mp4"
          />
        </div>

        {/* ── Layer 4: Stage 3 Content Overlay (Fades in 55% → 92%) ─────────── */}
        <div
          ref={overlayRef}
          className="absolute inset-0 z-[25] flex items-center will-change-[opacity,transform] pointer-events-none"
          style={{ opacity: 0, transform: 'translateY(28px)', transition: 'none' }}
        >
          {/* Full-height Left Cinema Gradient anchored to left viewport edge */}
          <div
            className="absolute inset-y-0 left-0 w-full lg:w-[62%] bg-gradient-to-r from-black/90 via-black/60 via-45% to-transparent pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 pt-20 sm:pt-24 lg:pt-28 pb-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left-aligned text content (Columns 1-7), leaving Columns 8-12 completely open for the full video */}
            <div className="lg:col-span-7 xl:col-span-7 flex flex-col items-start text-left">
              {/* Eyebrow badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-xl border border-white/20 text-neutral-100 font-display text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase mb-6 shadow-[0_4px_24px_rgba(0,0,0,0.35)]">
                <span className="w-2 h-2 rounded-full bg-brand-400 shadow-[0_0_10px_rgba(251,191,36,0.9)] animate-pulse" />
                <span>Custom Software &bull; AI Systems &bull; Business Automation</span>
              </div>

              {/* Main Display Headline */}
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[54px] xl:text-[62px] font-extrabold text-neutral-0 uppercase leading-[1.08] tracking-[-0.025em] text-left drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                Technology Built to Solve Real Problems
              </h2>

              {/* Description */}
              <p className="mt-6 text-neutral-200 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed font-sans text-left drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                We are a technology company that builds custom software, AI systems, automation, and data integrations to solve real business problems.
              </p>

              {/* CTA Action */}
              <div className="mt-8 sm:mt-10 pointer-events-auto flex flex-wrap items-center gap-3.5">
                <Link
                  href="/solutions"
                  className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-brand-600 hover:bg-brand-500 text-neutral-0 font-display text-xs md:text-sm font-bold tracking-[0.16em] uppercase shadow-[0_0_30px_rgba(147,51,234,0.5)] transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <span>Explore What We Build</span>
                </Link>

                <Link
                  href="/solutions#find-solution"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/25 text-neutral-0 font-display text-xs md:text-sm font-bold tracking-[0.16em] uppercase shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all duration-300 hover:scale-105 active:scale-95 group"
                >
                  <Sparkles className="w-4 h-4 text-purple-400 group-hover:rotate-12 transition-transform" />
                  <span>Find Your Solution</span>
                </Link>
              </div>
            </div>

            {/* Right side unobstructed to showcase video subject */}
            <div className="hidden lg:block lg:col-span-5 xl:col-span-5 pointer-events-none" aria-hidden="true" />
          </div>
        </div>

        {/* ── Layer 5: Scroll Indicator ─────────────────────────────────────── */}
        <div
          ref={scrollHintRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 will-change-[opacity]"
          aria-hidden="true"
        >
          <span className="font-tech text-[9px] tracking-[0.35em] uppercase font-bold text-neutral-700">
            Scroll
          </span>
          <div className="w-px h-8 animate-pulse bg-gradient-to-b from-neutral-700 to-transparent" />
        </div>
      </section>
    </div>
  );
}
