'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useMotionValue, useSpring, type MotionValue } from 'framer-motion';
import {
  Search,
  Cpu,
  Layers,
  Code2,
  Network,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Terminal,
  Activity,
  Workflow,
  Navigation,
} from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

// ─────────────────────────────────────────────────────────────────────────────
// KAIROTRIX Section 05 — "How We Think / Build"
//
// Scroll-driven serpentine pipeline architecture based on Framer StepsFlow.
// Features:
// - Alternating 2-column layout (reversed = index % 2 !== 0)
// - Scroll-driven pipeline fill (neutral #E8E8EF -> active #9333EA Kairo Purple)
// - Mechanical slot/odometer rolling numbers (01 -> 06)
// - 6 custom high-tech visualization windows
// - Mobile responsive left-aligned track
// ─────────────────────────────────────────────────────────────────────────────

interface MethodologyStage {
  id: string;
  number: string;
  stageName: string;
  headline: string;
  description: string;
  deliverables: string[];
  icon: typeof Search;
}

const STAGES: MethodologyStage[] = [
  {
    id: 'understand',
    number: '01',
    stageName: 'UNDERSTAND',
    headline: 'Uncover the real business problem before writing any code',
    description:
      'Most technology projects fail because teams build the wrong thing. We study how your business actually operates, speak with your key operators, and pinpoint the true bottleneck before touching code.',
    deliverables: [
      'Workflow & operational friction audit',
      'Clear business goals & success criteria',
      'Existing software & legacy risk review',
    ],
    icon: Search,
  },
  {
    id: 'explore',
    number: '02',
    stageName: 'EXPLORE',
    headline: 'Find the right technology for the job—not just the latest hype',
    description:
      "We don't force AI where simple automation is better, and we don't push complex custom builds where off-the-shelf software makes sense. We evaluate trade-offs honestly to choose what delivers the highest value at the lowest long-term cost.",
    deliverables: [
      'Technology approach & trade-off matrix',
      'Working prototype or proof-of-concept',
      'Clear cost, maintenance & complexity breakdown',
    ],
    icon: Cpu,
  },
  {
    id: 'architect',
    number: '03',
    stageName: 'ARCHITECT',
    headline: 'Design a rock-solid blueprint built to scale with your company',
    description:
      "Before building, we design the complete system blueprint—how data moves, how security is enforced, and how components connect. This ensures your software won't break under load or require costly complete rewrites as you grow.",
    deliverables: [
      'System architecture & data flow blueprints',
      'Security, access control & API specifications',
      'Modular foundation designed for future expansion',
    ],
    icon: Layers,
  },
  {
    id: 'build',
    number: '04',
    stageName: 'BUILD',
    headline: 'Turn the blueprint into reliable, high-performance software',
    description:
      'We turn blueprints into fast, secure, and rigorously tested software. Every feature is engineered with automated tests and safety guardrails so it runs predictably in daily business operations.',
    deliverables: [
      'Clean, production-ready source code (100% client-owned)',
      'Automated test suites & performance optimization',
      'Built-in safety guardrails & error-handling logic',
    ],
    icon: Code2,
  },
  {
    id: 'integrate',
    number: '05',
    stageName: 'INTEGRATE',
    headline: 'Connect seamlessly into your existing tools without disruption',
    description:
      "New technology is useless if it doesn't talk to the tools you already use. We connect your new system directly into your CRM, ERP, billing, and databases with safe transitions that keep your team working smoothly.",
    deliverables: [
      'Live connections with CRM, ERP & payment tools',
      'Automatic data synchronization with retry handling',
      'Safe rollout plan with zero business downtime',
    ],
    icon: Network,
  },
  {
    id: 'evolve',
    number: '06',
    stageName: 'EVOLVE',
    headline: 'Keep systems fast, secure, and continuously improving as you scale',
    description:
      'Launch day is the beginning, not the end. We monitor live system health, catch and resolve issues before users notice them, and continuously upgrade features as your team and customer base expand.',
    deliverables: [
      '24/7 system health & performance monitoring',
      'Automatic error tracking & proactive issue resolution',
      'Ongoing feature upgrades as your business scales',
    ],
    icon: TrendingUp,
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// Custom Visual Components for each stage
// ─────────────────────────────────────────────────────────────────────────────

function StageVisual({ stageId }: { stageId: string }) {
  switch (stageId) {
    case 'understand':
      return (
        <div className="">
          <img src="assets/images/home/how_we_build/s1.png" alt="Understand" className='w-full h-full object-contain' />
        </div>

      );

    case 'explore':
      return (
        <div className="">
          <img src="assets/images/home/how_we_build/s2.png" alt="explore" className='w-full h-full object-contain' />
        </div>
      );

    case 'architect':
      return (
        <div className="">
          <img src="assets/images/home/how_we_build/s3.png" alt="architect" className='w-full h-full object-contain' />
        </div>
      );

    case 'build':
      return (
        <div className="">
          <img src="assets/images/home/how_we_build/s4.png" alt="build" className='w-full h-full object-contain' />
        </div>
      );

    case 'integrate':
      return (
        <div className="">
          <img src="assets/images/home/how_we_build/s5.png" alt="integrate" className='w-full h-full object-contain' />
        </div>
      );

    case 'evolve':
      return (
        <div className="">
          <img src="assets/images/home/how_we_build/s6.png" alt="evolve" className='w-full h-full object-contain' />
        </div>
      );

    default:
      return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// GPS Navigation Puck with Animated Radar Ripples (Single Master Instance)
// ─────────────────────────────────────────────────────────────────────────────

interface NavigationPuckProps {
  x: any;
  y: any;
  rotation: any;
  opacity: any;
}

function NavigationPuck({ x, y, rotation, opacity }: NavigationPuckProps) {
  return (
    <motion.div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        opacity,
        zIndex: 35,
      }}
      className="pointer-events-none -translate-x-1/2 -translate-y-1/2"
      aria-hidden="true"
    >
      <div className="relative flex items-center justify-center">
        {/* Radar Sonar Ripple Wave 1 (Primary expanding pulse) */}
        <motion.span
          className="absolute -inset-3.5 rounded-full border border-brand-500/60 pointer-events-none"
          animate={{
            scale: [0.85, 1.9, 2.8],
            opacity: [0.85, 0.35, 0],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />

        {/* Radar Sonar Ripple Wave 2 (Secondary out-of-phase ping) */}
        <motion.span
          className="absolute -inset-3.5 rounded-full border border-brand-400/40 pointer-events-none"
          animate={{
            scale: [0.85, 1.45, 2.2],
            opacity: [0.65, 0.25, 0],
          }}
          transition={{
            duration: 2.2,
            delay: 0.75,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />

        {/* Ambient Core Glow */}
        <span className="absolute -inset-1.5 rounded-full bg-brand-500/35 blur-[4px]" />

        {/* GPS Navigation Puck - Prominent 32px size */}
        <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700 ring-[2.5px] ring-white shadow-[0_2px_16px_rgba(147,51,234,0.55)] flex items-center justify-center">
          {/* Directional Rotating Arrow (Steers with route direction) */}
          <motion.div
            style={{ rotate: rotation }}
            className="w-full h-full flex items-center justify-center"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4.5 h-4.5 text-white drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.45)]"
            >
              <path d="M12 3L4 20.5L12 17L20 20.5L12 3Z" />
            </svg>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// StepRow Component with Serpentine Scroll-Driven Pipeline & Slot Number
// ─────────────────────────────────────────────────────────────────────────────

interface StepRowProps {
  stage: MethodologyStage;
  index: number;
  isFirst: boolean;
  isLast: boolean;
  isMobile: boolean;
  verticalFill: MotionValue<number>;
  horizontalFill: MotionValue<number>;
}

function StepRow({
  stage,
  index,
  isFirst,
  isLast,
  isMobile,
  verticalFill,
  horizontalFill,
}: StepRowProps) {
  const stepRef = useRef<HTMLDivElement>(null);
  const reversed = !isMobile && index % 2 !== 0;

  const lineWidth = 6;
  const lineColor = '#E8E8EF';
  const accentColor = '#9333EA';

  // 1. Pipeline Line Fill Animations driven directly by master synchronized motion values
  const height = useTransform(verticalFill, [0, 1], ['0%', '100%']);

  if (isMobile) {
    return (
      <div ref={stepRef} data-step-row="true" className="relative pl-10 pr-2 py-10">
        {/* Mobile vertical line */}
        <div
          className="absolute top-0 bottom-0 left-3.5 w-[3px] bg-neutral-200 rounded-full"
          aria-hidden="true"
        />
        <motion.div
          style={{
            height,
            boxShadow: '0 0 8px rgba(147, 51, 234, 0.45)',
          }}
          className="absolute top-0 left-3.5 w-[3px] bg-brand-500 rounded-full"
          aria-hidden="true"
        />

        {/* Mobile Dot */}
        <div className="absolute top-12 left-2 w-6 h-6 rounded-full bg-white border-2 border-brand-500 flex items-center justify-center shadow-md z-10">
          <span className="w-2 h-2 rounded-full bg-brand-500" />
        </div>

        {/* Visual Component */}
        <div className="mb-6">
          <StageVisual stageId={stage.id} />
        </div>

        {/* Clean Stage Header */}
        <div className="flex items-center gap-3 mb-3">
          <span className="font-tech text-2xl font-bold text-brand-600">
            {stage.number}
          </span>
          <div className="h-4 w-px bg-neutral-300" />
          <span className="font-tech text-xs tracking-widest font-bold text-brand-600 uppercase">
            STAGE // {stage.stageName}
          </span>
        </div>

        <h3 className="font-display text-xl font-bold text-neutral-950 leading-snug">
          {stage.headline}
        </h3>
        <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
          {stage.description}
        </p>

        <ul className="mt-4 space-y-2 border-t border-neutral-100 pt-4">
          {stage.deliverables.map((item) => (
            <li key={item} className="flex items-center gap-2 text-xs text-neutral-700 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-brand-500 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // Desktop Serpentine Layout
  return (
    <div
      ref={stepRef}
      data-step-row="true"
      className={`relative grid grid-cols-2 gap-16 lg:gap-24 py-16 items-center ${
        isLast ? 'pb-16' : 'pb-24'
      }`}
    >
      {/* ── Background Pipeline Conduit (Base Neutral Track) ─────────── */}
      {/* Vertical Track */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: reversed ? '50%' : 0,
          width: lineWidth,
          backgroundColor: lineColor,
          borderRadius: `${isFirst ? lineWidth / 2 : 0}px ${isFirst ? lineWidth / 2 : 0}px 0 0`,
        }}
        aria-hidden="true"
      />

      {/* Horizontal Cross Track to Alternate (Spans 0 to calc(50% + lineWidth) to seal corner completely) */}
      {!isLast && (
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: `calc(50% + ${lineWidth}px)`,
            height: lineWidth,
            backgroundColor: lineColor,
          }}
          aria-hidden="true"
        />
      )}

      {/* Turn Corner Waypoint Nodes (Clean anchor pins at both turns) */}
      {!isLast && (
        <>
          <div
            style={{
              position: 'absolute',
              bottom: `${lineWidth / 2}px`,
              left: reversed ? `calc(50% + ${lineWidth / 2}px)` : `${lineWidth / 2}px`,
              transform: 'translate(-50%, 50%)',
              zIndex: 3,
            }}
            className="w-3.5 h-3.5 rounded-full bg-white border-2 border-neutral-300 shadow-sm"
            aria-hidden="true"
          />
          <div
            style={{
              position: 'absolute',
              bottom: `${lineWidth / 2}px`,
              left: reversed ? `${lineWidth / 2}px` : `calc(50% + ${lineWidth / 2}px)`,
              transform: 'translate(-50%, 50%)',
              zIndex: 3,
            }}
            className="w-3.5 h-3.5 rounded-full bg-white border-2 border-neutral-300 shadow-sm"
            aria-hidden="true"
          />
        </>
      )}

      {/* ── Active Scroll-Driven Pipeline Fill (Kairo Purple) ─────────── */}
      {/* Active Vertical Fill */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: reversed ? '50%' : 0,
          width: lineWidth,
          overflow: 'hidden',
          borderRadius: `${isFirst ? lineWidth / 2 : 0}px ${isFirst ? lineWidth / 2 : 0}px 0 0`,
          zIndex: 2,
        }}
        aria-hidden="true"
      >
        <motion.div
          style={{
            width: '100%',
            height,
            backgroundColor: accentColor,
            boxShadow: '0 0 10px rgba(147, 51, 234, 0.45)',
          }}
        />
      </div>

      {/* Active Horizontal Cross Fill (Hardware-accelerated scaleX directly locked with horizontalFill) */}
      {!isLast && (
        <motion.div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: `calc(50% + ${lineWidth}px)`,
            height: lineWidth,
            backgroundColor: accentColor,
            boxShadow: '0 0 10px rgba(147, 51, 234, 0.45)',
            transformOrigin: reversed ? 'right center' : 'left center',
            scaleX: horizontalFill,
            zIndex: 2,
          }}
          aria-hidden="true"
        />
      )}

      {/* ── Left / Right Swapped Content Columns ─────────────────────── */}
      {/* Text Column */}
      <div
        className={`relative z-10 ${
          reversed
            ? 'col-start-2 row-start-1 pl-12 pr-4'
            : 'col-start-1 row-start-1 pr-12 pl-12'
        }`}
      >
        {/* Clean Stage Header */}
        <div className="flex items-center gap-4 mb-4">
          <span className="font-tech text-3xl lg:text-4xl font-bold text-brand-600">
            {stage.number}
          </span>
          <div className="h-5 w-px bg-neutral-300" />
          <span className="font-tech text-xs tracking-[0.25em] font-bold text-brand-600 uppercase">
            STAGE // {stage.stageName}
          </span>
        </div>

        <h3 className="font-display text-2xl lg:text-3xl xl:text-4xl font-bold text-neutral-950 leading-tight">
          {stage.headline}
        </h3>

        <p className="mt-4 text-base text-neutral-600 leading-relaxed font-normal">
          {stage.description}
        </p>

        <ul className="mt-6 pt-6 border-t border-neutral-200/80 space-y-2.5">
          {stage.deliverables.map((item) => (
            <li key={item} className="flex items-center gap-3 text-xs sm:text-sm text-neutral-700 font-medium">
              <CheckCircle2 className="w-4 h-4 text-brand-500 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Visual Column */}
      <div
        className={`relative z-10 ${
          reversed
            ? 'col-start-1 row-start-1 pr-6'
            : 'col-start-2 row-start-1 pl-6'
        }`}
      >
        <StageVisual stageId={stage.id} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Section Export
// ─────────────────────────────────────────────────────────────────────────────

export function HowWeThinkBuild() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pipelineRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  // Single Master GPS Navigation Arrow MotionValues
  const arrowX = useMotionValue(3);
  const arrowY = useMotionValue(0);
  const rawArrowRotation = useMotionValue(180);
  const arrowOpacity = useMotionValue(1);

  // Smooth magnetic navigation steering with spring physics
  const smoothArrowRotation = useSpring(rawArrowRotation, {
    stiffness: 260,
    damping: 26,
    mass: 0.5,
  });

  // MotionValues for each stage's line fills (100% synchronized with arrow)
  const vFill0 = useMotionValue(0);
  const hFill0 = useMotionValue(0);
  const vFill1 = useMotionValue(0);
  const hFill1 = useMotionValue(0);
  const vFill2 = useMotionValue(0);
  const hFill2 = useMotionValue(0);
  const vFill3 = useMotionValue(0);
  const hFill3 = useMotionValue(0);
  const vFill4 = useMotionValue(0);
  const hFill4 = useMotionValue(0);
  const vFill5 = useMotionValue(0);
  const hFill5 = useMotionValue(0);

  const verticalFills = [vFill0, vFill1, vFill2, vFill3, vFill4, vFill5];
  const horizontalFills = [hFill0, hFill1, hFill2, hFill3, hFill4, hFill5];

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 810);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    let ticking = false;
    let lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    let scrollDir: 'down' | 'up' = 'down';

    const updatePipeline = () => {
      ticking = false;
      const pipeline = pipelineRef.current;
      if (!pipeline) return;

      // Detect scroll direction (downwards vs upwards)
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      if (Math.abs(delta) > 1.5) {
        scrollDir = delta > 0 ? 'down' : 'up';
        lastScrollY = currentScrollY;
      }

      const pipelineRect = pipeline.getBoundingClientRect();
      const windowH = window.innerHeight;

      // Section visibility check
      if (pipelineRect.bottom < -120 || pipelineRect.top > windowH + 120) {
        arrowOpacity.set(0);
        return;
      }
      arrowOpacity.set(prefersReduced ? 0 : 1);

      const stepEls = Array.from(pipeline.querySelectorAll('[data-step-row]')) as HTMLElement[];
      if (stepEls.length === 0) return;

      const lineWidth = 6;
      const containerW = pipeline.offsetWidth;
      const leftX = isMobile ? 15.5 : lineWidth / 2;
      const centerX = isMobile ? 15.5 : containerW / 2 + lineWidth / 2;

      // Reading focal line: 60% of viewport
      const scrollMarker = windowH * 0.60;
      const firstStepTop = stepEls[0].offsetTop;
      const currentPipelineY = scrollMarker - pipelineRect.top;

      // 1. Above first step -> Park at Origin // 01
      if (currentPipelineY <= firstStepTop) {
        arrowX.set(leftX);
        arrowY.set(0);
        rawArrowRotation.set(scrollDir === 'down' ? 180 : 0);
        for (let i = 0; i < stepEls.length; i++) {
          verticalFills[i].set(0);
          horizontalFills[i].set(0);
        }
        return;
      }

      // 2. Past last step -> Park at Destination // 06
      const lastStep = stepEls[stepEls.length - 1];
      const lastStepBottom = lastStep.offsetTop + lastStep.offsetHeight;
      if (currentPipelineY >= lastStepBottom) {
        const isLastReversed = !isMobile && (stepEls.length - 1) % 2 !== 0;
        arrowX.set(isLastReversed ? centerX : leftX);
        arrowY.set(lastStepBottom);
        rawArrowRotation.set(scrollDir === 'down' ? 180 : 0);
        for (let i = 0; i < stepEls.length; i++) {
          verticalFills[i].set(1);
          horizontalFills[i].set(1);
        }
        return;
      }

      // 3. Active step tracking
      for (let i = 0; i < stepEls.length; i++) {
        const el = stepEls[i];
        const stepTop = el.offsetTop;
        const stepH = el.offsetHeight;
        const stepBottom = stepTop + stepH;
        const isReversed = !isMobile && i % 2 !== 0;
        const isLast = i === stepEls.length - 1;

        if (currentPipelineY < stepTop) {
          // Future steps
          verticalFills[i].set(0);
          horizontalFills[i].set(0);
        } else if (currentPipelineY > stepBottom) {
          // Completed steps
          verticalFills[i].set(1);
          horizontalFills[i].set(1);
        } else {
          // Active step
          const progress = Math.max(0, Math.min(1, (currentPipelineY - stepTop) / stepH));

          if (isMobile) {
            verticalFills[i].set(progress);
            horizontalFills[i].set(0);
            arrowX.set(15.5);
            arrowY.set(stepTop + progress * stepH);
            rawArrowRotation.set(scrollDir === 'down' ? 180 : 0);
          } else if (isLast) {
            // Final stage: pure vertical descent into destination
            verticalFills[i].set(progress);
            horizontalFills[i].set(0);
            arrowX.set(isReversed ? centerX : leftX);
            arrowY.set(stepTop + progress * stepH);
            rawArrowRotation.set(scrollDir === 'down' ? 180 : 0);
          } else {
            // Desktop serpentine route:
            // 0.00 - 0.68: Vertical descent
            // 0.68 - 0.74: Smooth 90deg corner turn
            // 0.74 - 1.00: Horizontal cross conduit
            if (progress <= 0.68) {
              const vProg = progress / 0.68;
              verticalFills[i].set(vProg);
              horizontalFills[i].set(0);
              arrowX.set(isReversed ? centerX : leftX);
              arrowY.set(stepTop + vProg * (stepH - lineWidth / 2));
              rawArrowRotation.set(scrollDir === 'down' ? 180 : 0);
            } else if (progress < 0.74) {
              const turnT = (progress - 0.68) / 0.06;
              verticalFills[i].set(1);
              horizontalFills[i].set(0);
              arrowX.set(isReversed ? centerX : leftX);
              arrowY.set(stepTop + stepH - lineWidth / 2);
              if (scrollDir === 'down') {
                if (!isReversed) {
                  rawArrowRotation.set(180 - turnT * 90); // 180 -> 90 (facing right)
                } else {
                  rawArrowRotation.set(180 + turnT * 90); // 180 -> 270 (facing left)
                }
              } else {
                rawArrowRotation.set(0); // pointing up
              }
            } else {
              const hProg = (progress - 0.74) / 0.26;
              verticalFills[i].set(1);
              horizontalFills[i].set(hProg);
              arrowY.set(stepTop + stepH - lineWidth / 2);
              if (!isReversed) {
                arrowX.set(leftX + hProg * (centerX - leftX));
                if (scrollDir === 'down') {
                  if (hProg > 0.88) {
                    const endTurnT = (hProg - 0.88) / 0.12;
                    rawArrowRotation.set(90 + endTurnT * 90); // 90 -> 180 (turns down)
                  } else {
                    rawArrowRotation.set(90); // pointing right
                  }
                } else {
                  // Scrolling up: moving backward to the left
                  if (hProg < 0.12) {
                    const backTurnT = (0.12 - hProg) / 0.12;
                    rawArrowRotation.set(270 + backTurnT * 90); // 270 -> 360/0 (turns up)
                  } else {
                    rawArrowRotation.set(270); // pointing left
                  }
                }
              } else {
                arrowX.set(centerX - hProg * (centerX - leftX));
                if (scrollDir === 'down') {
                  if (hProg > 0.88) {
                    const endTurnT = (hProg - 0.88) / 0.12;
                    rawArrowRotation.set(270 - endTurnT * 90); // 270 -> 180 (turns down)
                  } else {
                    rawArrowRotation.set(270); // pointing left
                  }
                } else {
                  // Scrolling up: moving backward to the right
                  if (hProg < 0.12) {
                    const backTurnT = (0.12 - hProg) / 0.12;
                    rawArrowRotation.set(90 - backTurnT * 90); // 90 -> 0 (turns up)
                  } else {
                    rawArrowRotation.set(90); // pointing right
                  }
                }
              }
            }
          }
        }
      }
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updatePipeline);
        ticking = true;
      }
    };

    updatePipeline();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updatePipeline);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updatePipeline);
    };
  }, [isMobile, prefersReduced]);

  return (
    <section
      id="how-we-think-build"
      aria-labelledby="how-we-think-build-heading"
      className="relative w-full bg-[#FAFAFC] py-28 sm:py-36 lg:py-44 border-t border-neutral-200/80 overflow-hidden"
    >
      {/* Schema.org Structured Data for SEO / AEO / GEO Entity Indexing */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'KAIROTRIX 6-Stage Engineering Journey',
            description:
              'A disciplined 6-stage engineering journey from understanding the problem to building, integrating, and continuously improving the system.',
            itemListElement: STAGES.map((stage, idx) => ({
              '@type': 'ListItem',
              position: idx + 1,
              name: `Stage ${stage.number}: ${stage.stageName} - ${stage.headline}`,
              description: stage.description,
            })),
          }),
        }}
      />

      {/* Screen Reader & AEO/GEO Semantic Narrative Summary */}
      <p className="sr-only">
        KAIROTRIX follows a disciplined 6-stage engineering journey: 
        01 Understand (uncovering real bottlenecks before writing code), 
        02 Explore (finding the right technology for the job rather than hype), 
        03 Architect (designing a rock-solid blueprint built to scale), 
        04 Build (turning blueprints into reliable, client-owned software), 
        05 Integrate (connecting seamlessly into existing tools without disruption), and 
        06 Evolve (monitoring performance and keeping systems continuously improving).
      </p>

      {/* Background Architectural Grid Lines */}
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#00000004_1px,transparent_1px),linear-gradient(to_bottom,#00000004_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
        aria-hidden="true"
      />

      <div ref={containerRef} className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 lg:mb-24"
        >
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-pulse" />
              <span className="font-tech text-xs tracking-[0.25em] font-semibold text-brand-600 uppercase">
                05 // HOW WE BUILD
              </span>
              <div className="h-px w-10 sm:w-16 bg-neutral-200 hidden sm:block" />
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-500/10 border border-brand-500/25 text-[10px] font-mono text-brand-600 font-semibold uppercase tracking-wider">
                <Navigation className="w-2.5 h-2.5 text-brand-500 animate-pulse" />
                6-Stage Engineering Journey
              </span>
            </div>

            <h2
              id="how-we-think-build-heading"
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] text-neutral-950 leading-[1.12] max-w-3xl"
            >
              HOW WE THINK &amp;{' '}
              <span className="gradient-signature-text">BUILD.</span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
              A disciplined 6-stage engineering journey—from understanding the real business problem to building, connecting, and continuously improving your software.
            </p>
          </div>
        </motion.div>

        {/* ── Serpentine StepsFlow Pipeline ──────────────────────────── */}
        <div ref={pipelineRef} className="relative">
          {/* ── SINGLE Master GPS Navigation Arrow Puck (Always Synchronized, Never Multiplied) ── */}
          <NavigationPuck
            x={arrowX}
            y={arrowY}
            rotation={smoothArrowRotation}
            opacity={arrowOpacity}
          />

          {/* Start Point Indicator (GPS Origin Waypoint) */}
          <div
            className="hidden md:flex absolute -top-10 -left-3.5 z-20 items-center justify-center w-8 h-8 rounded-full bg-white border-2 border-brand-500 shadow-[0_2px_12px_rgba(147,51,234,0.3)]"
            aria-hidden="true"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-brand-500 animate-ping" />
            <span className="absolute -top-6 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-neutral-900 text-[9px] font-mono font-bold text-white tracking-widest whitespace-nowrap shadow-sm">
              ORIGIN // 01
            </span>
          </div>

          {STAGES.map((stage, idx) => (
            <StepRow
              key={stage.id}
              stage={stage}
              index={idx}
              isFirst={idx === 0}
              isLast={idx === STAGES.length - 1}
              isMobile={isMobile}
              verticalFill={verticalFills[idx]}
              horizontalFill={horizontalFills[idx]}
            />
          ))}

          {/* End Point Indicator (GPS Destination Waypoint) */}
          <div
            className="hidden md:flex absolute -bottom-5 z-20 items-center justify-center w-8 h-8 rounded-full bg-white border-2 border-brand-500 shadow-[0_2px_12px_rgba(147,51,234,0.3)]"
            style={{ left: STAGES.length % 2 === 0 ? 'calc(50% - 13px)' : '-13px' }}
            aria-hidden="true"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-brand-500" />
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-brand-600 text-[9px] font-mono font-bold text-white tracking-widest whitespace-nowrap shadow-sm">
              DESTINATION // 06
            </span>
          </div>
        </div>

        {/* ── Bottom Routing Banner ──────────────────────────────────── */}
        <div className="mt-20 lg:mt-28 rounded-2xl bg-white border border-neutral-200/80 p-8 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="font-tech text-[10px] tracking-[0.2em] font-bold text-brand-600 uppercase">
              NEXT STEP // DIRECT CONSULTATION
            </span>
            <h4 className="font-display text-xl sm:text-2xl font-bold text-neutral-900 mt-1">
              Have a problem you want us to diagnose?
            </h4>
            <p className="text-sm text-neutral-600 mt-1 max-w-xl">
              We begin every engagement with an objective diagnostic conversation before talking about tech stacks or contracts.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-neutral-900 text-white text-sm font-semibold hover:bg-brand-600 transition-all group whitespace-nowrap self-start md:self-center shadow-sm"
          >
            <span>Start a Conversation</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
