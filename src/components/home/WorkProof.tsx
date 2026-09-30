'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  MotionValue,
} from 'framer-motion';
import { ArrowUpRight, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { EASE_PRECISE, MaskedReveal, DrawLine } from '@/lib/animations';
import type { WorkSpecimen } from '@/data/workData';

// ─────────────────────────────────────────────────────────────────────────────
// KAIROTRIX Section 04 — "Work / Proof + Capability"
// 3D Rotated Perspective Scroll Gallery (Dynamic DB-backed)
// ─────────────────────────────────────────────────────────────────────────────

interface ProjectSpecimen {
  id: string;
  number: string;
  badge: string;
  title: string;
  domain: string;
  description: string;
  tech: string[];
  video?: string;
  image?: string;
  slug: string;
}

interface RotatedCardProps {
  project: ProjectSpecimen;
  index: number;
  totalCards: number;
  progress: MotionValue<number>;
  prefersReduced: boolean;
}

function RotatedCard({ project, index, totalCards, progress, prefersReduced }: RotatedCardProps) {
  let yRange: number[];
  let yValues: string[];
  let rotRange: number[];
  let rotValues: number[];
  let scaleRange: number[];
  let scaleValues: number[];
  let opacRange: number[];
  let opacValues: number[];

  if (totalCards <= 1) {
    yRange = [0, 0.7, 0.85];
    yValues = ['0%', '0%', '-55%'];
    rotRange = [0, 0.7, 0.85];
    rotValues = [0, 0, -6];
    scaleRange = [0, 0.7, 0.85];
    scaleValues = [1, 1, 0.94];
    opacRange = [0, 0.7, 0.8, 0.85];
    opacValues = [1, 1, 0.35, 0];
  } else {
    const cardStep = 0.82 / totalCards;
    const enterStart = Math.max(0, (index - 0.3) * cardStep);
    const activeStart = index * cardStep;
    const activeEnd = (index + 0.7) * cardStep;
    const exitEnd = (index + 1) * cardStep;

    if (index === 0) {
      yRange = [0, activeEnd, exitEnd];
      yValues = ['0%', '0%', '-55%'];
      rotRange = [0, activeEnd, exitEnd];
      rotValues = [0, 0, -6];
      scaleRange = [0, activeEnd, exitEnd];
      scaleValues = [1, 1, 0.94];
      opacRange = [0, activeEnd, activeEnd + (exitEnd - activeEnd) * 0.6, exitEnd];
      opacValues = [1, 1, 0.35, 0];
    } else {
      yRange = [enterStart, activeStart, activeEnd, exitEnd];
      yValues = ['60%', '0%', '0%', '-55%'];
      rotRange = [enterStart, activeStart, activeEnd, exitEnd];
      rotValues = [-6, 0, 0, -6];
      scaleRange = [enterStart, activeStart, activeEnd, exitEnd];
      scaleValues = [0.94, 1, 1, 0.94];
      opacRange = [
        enterStart,
        enterStart + (activeStart - enterStart) * 0.4,
        activeStart,
        activeEnd,
        activeEnd + (exitEnd - activeEnd) * 0.6,
        exitEnd,
      ];
      opacValues = [0, 0.4, 1, 1, 0.35, 0];
    }
  }

  const y = useTransform(progress, yRange, yValues);
  const rotateZ = useTransform(progress, rotRange, rotValues);
  const scale = useTransform(progress, scaleRange, scaleValues);
  const opacity = useTransform(progress, opacRange, opacValues);
  const pointerEvents = useTransform(opacity, (o) => (o > 0.5 ? 'auto' : 'none'));

  const zIndex = (index + 1) * 10;

  return (
    <motion.div
      style={{
        y,
        rotateZ: prefersReduced ? 0 : rotateZ,
        scale,
        opacity,
        zIndex,
        pointerEvents,
        transformOrigin: 'center center',
      }}
      data-cursor="project"
      data-cursor-text="EXPLORE ↗"
      className="absolute inset-0 w-full h-full rounded-[24px] sm:rounded-[32px] overflow-hidden border border-neutral-300/80 bg-neutral-950 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.20),0_0_0_1px_rgba(0,0,0,0.04)] will-change-transform flex flex-col justify-between p-6 sm:p-8 lg:p-10"
    >
      {/* Background Media with Cinematic Clarity */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        {project.video ? (
          <video
            src={project.video}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-105 opacity-85"
          />
        ) : project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover scale-105 opacity-85"
          />
        ) : null}
        {/* Directional Cinema Edge Protection — Leaves Center 100% Bright & Visible */}
        <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-neutral-950/80 via-neutral-950/25 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-52 bg-gradient-to-t from-neutral-950/95 via-neutral-950/65 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(147,51,234,0.12)_0%,transparent_60%)]" />
      </div>

      {/* ── Top Bar: Refined Minimalist Classification ────────────────────── */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-950/40 backdrop-blur-md border border-white/20 text-white font-tech text-[11px] tracking-wider uppercase font-medium shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
          {project.number} // {project.badge}
        </div>

        <span className="font-mono text-xs text-neutral-200 hidden sm:inline-block drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
          {project.domain}
        </span>
      </div>

      {/* ── Bottom Content: Clear Hierarchy with Breathing Room ───────────── */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6 pt-6">
        <div className="max-w-xl">
          <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-2 leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            {project.title}
          </h3>

          <p className="text-xs sm:text-sm text-neutral-200 font-normal leading-relaxed mb-4 line-clamp-2 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-md bg-white/10 backdrop-blur-md text-white/85 font-mono text-[11px] border border-white/10"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="flex-shrink-0">
          <Link
            href={project.slug}
            className="group/btn inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-white text-neutral-950 font-semibold text-xs sm:text-sm hover:bg-brand-500 hover:text-white transition-all duration-300 shadow-md"
          >
            <span>Explore</span>
            <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

interface WorkProofProps {
  projects?: WorkSpecimen[];
}

export function WorkProof({ projects }: WorkProofProps = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  if (!projects || projects.length === 0) {
    return null;
  }

  const specimens: ProjectSpecimen[] = projects.slice(0, 4).map((p, idx) => ({
    id: p.id,
    number: String(idx + 1).padStart(2, '0'),
    badge: p.badge || 'KAIROTRIX BUILD',
    title: p.title,
    domain: p.disciplineName,
    description: p.summary || p.headline,
    tech: p.techStack || [],
    video: p.video,
    image: p.image,
    slug: `/work#selected-work`,
  }));

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Spring physics for butter-smooth momentum
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 24,
    mass: 0.5,
    restDelta: 0.0001,
  });

  // Active step indicator
  const totalCards = specimens.length;
  const inputSteps = Array.from({ length: totalCards }, (_, i) => (i / totalCards) * 0.85);
  inputSteps.push(0.95);
  const outputSteps = Array.from({ length: totalCards }, (_, i) => i);
  outputSteps.push(totalCards);

  const activeIndex = useTransform(smoothProgress, inputSteps, outputSteps);

  // Conclusion Archive Screen: Enters strictly AFTER Card 04 has dissolved (0.94 -> 0.98)
  const conclusionOpacity = useTransform(smoothProgress, [0.94, 0.98, 1.0], [0, 1, 1]);
  const conclusionScale = useTransform(smoothProgress, [0.94, 0.98, 1.0], [0.95, 1, 1]);
  const conclusionY = useTransform(smoothProgress, [0.94, 0.98, 1.0], ['30px', '0px', '0px']);

  return (
    <section
      ref={containerRef}
      id="work-proof"
      aria-labelledby="work-proof-heading"
      className="relative w-full bg-[#FAFAFC] h-[450vh] border-t border-neutral-200/80"
    >
      {/* Background Architectural Grid Lines */}
      <div
        className="pointer-events-none fixed inset-0 bg-[linear-gradient(to_right,#00000004_1px,transparent_1px),linear-gradient(to_bottom,#00000004_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
        aria-hidden="true"
      />

      {/* ── Sticky Viewport (Full-Screen Frozen Gallery Stage) ───────────── */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden px-4 sm:px-8 lg:px-12 pb-4 sm:pb-6">
        {/* ── FROZEN TOP SECTION HEADER (Opaque bg-[#FAFAFC] z-50 Shield with Navbar Clearance) ── */}
        <div className="relative z-50 w-full bg-[#FAFAFC] pt-20 sm:pt-24 pb-4">
          <div className="mx-auto max-w-6xl flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-2">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-pulse" />
                <motion.span
                  initial={{ opacity: prefersReduced ? 1 : 0, letterSpacing: prefersReduced ? '0.25em' : '0.35em' }}
                  whileInView={{ opacity: 1, letterSpacing: '0.25em' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: EASE_PRECISE }}
                  className="font-tech text-xs font-semibold text-brand-600 uppercase"
                >
                  WORK & PROOF
                </motion.span>
                <div className="h-px w-10 sm:w-16 bg-neutral-200 hidden sm:block" />
                <span className="font-mono text-xs text-neutral-400">Technical Demonstrations & Builds</span>
              </div>

              <MaskedReveal delay={0.06}>
                <h2
                  id="work-proof-heading"
                  className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] text-neutral-950 leading-[1.12]"
                >
                  PROVEN IN{' '}
                  <span className="gradient-signature-text">EXECUTION.</span>
                </h2>
              </MaskedReveal>
              <p className="mt-1 text-xs sm:text-sm text-neutral-500 font-mono">
                Real software systems, interactive demonstrations, and verified builds.
              </p>
            </div>

            {/* Action & Specimen Reel Indicator */}
            <motion.div
              initial={{ opacity: prefersReduced ? 1 : 0, scale: prefersReduced ? 1 : 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.12, ease: EASE_PRECISE }}
              className="flex items-center gap-3 self-start lg:self-auto flex-shrink-0"
            >
              <Link
                href="/work"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-950 hover:bg-brand-600 text-white font-tech font-semibold text-xs uppercase tracking-wider transition-all duration-300 shadow-sm hover:shadow-md group"
              >
                <span>Explore All Work</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <div className="flex items-center gap-3 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full border border-neutral-200/90 shadow-sm">
                <span className="font-mono text-xs font-semibold text-neutral-700">
                  SPECIMEN REEL
                </span>
                <div className="flex items-center gap-1.5">
                  {specimens.map((_, i) => (
                    <IndicatorDot key={i} index={i} activeIndex={activeIndex} />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
          <DrawLine className="h-px w-full bg-neutral-200/80 mt-2" />
        </div>

        {/* ── CENTER 3D PERSPECTIVE STAGE (Airy with 100px+ Vertical Clearance) ── */}
        <div
          className="relative mx-auto w-full max-w-6xl h-[380px] sm:h-[410px] lg:h-[440px] my-auto"
          style={{ perspective: 1200 }}
        >
          {/* Rotated 3D Cards with Spring Physics */}
          {specimens.map((project, idx) => (
            <RotatedCard
              key={project.id}
              project={project}
              index={idx}
              totalCards={specimens.length}
              progress={smoothProgress}
              prefersReduced={prefersReduced}
            />
          ))}

          {/* ── Exit / Conclusion Archive Card ────────────────────────────── */}
          <motion.div
            style={{
              opacity: conclusionOpacity,
              scale: conclusionScale,
              y: conclusionY,
              zIndex: 60,
            }}
            className="pointer-events-auto absolute inset-0 w-full h-full rounded-[24px] sm:rounded-[32px] overflow-hidden border border-neutral-200 bg-white shadow-[0_25px_60px_-15px_rgba(0,0,0,0.12)] flex flex-col justify-between p-6 sm:p-10 text-center"
          >
            <div className="max-w-xl mx-auto my-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-soft border border-brand-500/20 text-brand-600 text-xs font-tech font-bold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5 text-brand-500" />
                VERIFIED SOURCE CODE
              </div>

              <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-neutral-950 leading-tight">
                Explore the complete technical portfolio.
              </h3>

              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-md mx-auto">
                Every project and demonstration is backed by production source code, explicit data schemas, and verifiable engineering architecture.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/work"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-neutral-950 text-white font-semibold text-xs sm:text-sm hover:bg-brand-600 transition-colors shadow-md group"
                >
                  <span>View All Projects & Demos</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-neutral-100 text-neutral-800 font-semibold text-xs sm:text-sm hover:bg-neutral-200 transition-colors"
                >
                  <span>Request Engineering Brief</span>
                </Link>
              </div>
            </div>

            {/* Bottom Capabilities Strip */}
            <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-[11px] font-mono text-neutral-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-500" />
                100% Client Code Ownership
              </span>
              <span className="hidden sm:inline-block">Zero Synthetic Fabrication</span>
              <span>Next.js 15 • Python • ClickHouse</span>
            </div>
          </motion.div>
        </div>

        {/* ── FROZEN BOTTOM TELEMETRY BAR (Opaque bg-[#FAFAFC] z-50 Shield) ── */}
        <div className="relative z-50 w-full bg-[#FAFAFC] pt-2 pb-2">
          <DrawLine className="h-px w-full bg-neutral-200/60 mb-2.5" />
          <div className="mx-auto max-w-6xl flex items-center justify-between text-[11px] font-mono text-neutral-400">
            <span>SCROLL TO ADVANCE SPECIMENS</span>
            <Link
              href="/work"
              className="text-brand-600 hover:text-brand-700 font-tech font-semibold uppercase tracking-wider flex items-center gap-1 transition-colors"
            >
              <span>VIEW FULL 12-SPECIMEN REPOSITORY</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// Indicator Dot
function IndicatorDot({
  index,
  activeIndex,
}: {
  index: number;
  activeIndex: MotionValue<number>;
}) {
  const [active, setActive] = React.useState(index === 0);

  useMotionValueEvent(activeIndex, 'change', (latest) => {
    setActive(Math.round(latest) === index);
  });

  return (
    <span
      className={`h-1.5 rounded-full transition-all duration-300 ${
        active ? 'w-5 bg-brand-500' : 'w-1.5 bg-neutral-300'
      }`}
    />
  );
}
