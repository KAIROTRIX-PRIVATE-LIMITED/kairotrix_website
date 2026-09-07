'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowDown, Sparkles } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface RiverCard {
  id: string;
  disciplineNum: string;
  disciplineName: string;
  badge: string;
  image: string;
  metric: string;
}

const COLUMN_1_CARDS: RiverCard[] = [
  {
    id: 'c1-1',
    disciplineNum: '01',
    disciplineName: 'AI & Intelligent Systems',
    badge: 'Autonomous Swarm',
    image: '/assets/images/service/SERVICE01.png',
    metric: '99.98% Tool Execution SLA',
  },
  {
    id: 'c1-2',
    disciplineNum: '04',
    disciplineName: 'Digital Transformation',
    badge: 'Cloud Decoupling',
    image: '/assets/images/service/SERVICE04.png',
    metric: 'Zero-Downtime Migration',
  },
  {
    id: 'c1-3',
    disciplineNum: '03',
    disciplineName: 'Workflow Automation',
    badge: 'Event Webhooks',
    image: '/assets/images/service/SERVICE03.png',
    metric: '14,200 Events / Min',
  },
  {
    id: 'c1-4',
    disciplineNum: '06',
    disciplineName: 'Technology Integration',
    badge: 'REST & gRPC Mesh',
    image: '/assets/images/service/SERVICE06.png',
    metric: 'Sub-Second Webhook Fabric',
  },
];

const COLUMN_2_CARDS: RiverCard[] = [
  {
    id: 'c2-1',
    disciplineNum: '02',
    disciplineName: 'Product Engineering',
    badge: 'Next.js 15 Platform',
    image: '/assets/images/service/SERVICE02.png',
    metric: 'P99 Latency < 16ms',
  },
  {
    id: 'c2-2',
    disciplineNum: '05',
    disciplineName: 'Data & BI Pipelines',
    badge: 'Real-Time Telemetry',
    image: '/assets/images/service/SERVICE05.png',
    metric: 'Deterministic ETL Sync',
  },
  {
    id: 'c2-3',
    disciplineNum: '01',
    disciplineName: 'Enterprise RAG Engines',
    badge: 'Private Vector Store',
    image: '/assets/images/service/SERVICE01.png',
    metric: 'Zero Data Retention',
  },
  {
    id: 'c2-4',
    disciplineNum: '03',
    disciplineName: 'Autonomous Ops Bots',
    badge: 'Self-Healing Workers',
    image: '/assets/images/service/SERVICE03.png',
    metric: '24/7 Zero Manual Drag',
  },
];

const COLUMN_3_CARDS: RiverCard[] = [
  {
    id: 'c3-1',
    disciplineNum: '06',
    disciplineName: 'API & Gateway Fabrics',
    badge: 'Enterprise Gateway',
    image: '/assets/images/service/SERVICE06.png',
    metric: 'Idempotent Sync',
  },
  {
    id: 'c3-2',
    disciplineNum: '02',
    disciplineName: 'Distributed Systems',
    badge: 'Microservices Mesh',
    image: '/assets/images/service/SERVICE02.png',
    metric: 'Sub-20ms Concurrency',
  },
  {
    id: 'c3-3',
    disciplineNum: '04',
    disciplineName: 'Process Modernization',
    badge: 'Headless Jamstack',
    image: '/assets/images/service/SERVICE04.png',
    metric: 'Lighthouse 98+ Speed',
  },
  {
    id: 'c3-4',
    disciplineNum: '05',
    disciplineName: 'Predictive Intelligence',
    badge: 'Decision ML Models',
    image: '/assets/images/service/SERVICE05.png',
    metric: 'Natural-Language SQL',
  },
];

const TICKER_ITEMS = [
  'AI Application Development',
  'Autonomous Agent Swarms',
  'Enterprise RAG Knowledge',
  'High-Throughput Web Platforms',
  'Workflow & Task Orchestration',
  'Legacy Monolith Decoupling',
  'Real-Time KPI Dashboards',
  'REST & gRPC Integration',
  'Zero-Lock-in Engineering',
];

export function SolutionsHero() {
  const shouldReduceMotion = useReducedMotion();

  const handleScrollToGrid = () => {
    const el = document.getElementById('ai-intelligent-systems');
    if (el) {
      el.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative w-full min-h-[82vh] sm:min-h-[86vh] bg-[#FAFAFC] text-neutral-900 overflow-hidden flex flex-col justify-center pt-24 sm:pt-28 lg:pt-28 pb-12 sm:pb-16 border-b border-neutral-200/90">
      
      {/* Ambient Brand Accent Glows */}
      <div
        className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-purple-600/6 blur-[140px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 -right-32 w-[700px] h-[700px] bg-indigo-600/5 blur-[160px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Main Split Body: Left Narrative + Right Infinite River */}
      <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        
        {/* Left Side: Headline, Ticker & CTAs (lg:col-span-6 xl:col-span-5) */}
        <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-center py-4 sm:py-8">
          
          {/* Continuous Horizontal Ticker / Pill Row */}
          <div className="relative w-full overflow-hidden mb-6 py-1.5 [mask-image:linear-gradient(to_right,transparent_0%,black_12%,black_88%,transparent_100%)]">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#FAFAFC] to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#FAFAFC] to-transparent z-10" />
            <motion.div
              animate={{ x: shouldReduceMotion ? 0 : ['0%', '-50%'] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: 'loop',
                  duration: 22,
                  ease: 'linear',
                },
              }}
              className="flex items-center gap-2.5 w-max"
            >
              {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-neutral-200/90 text-[11px] font-mono text-neutral-700 whitespace-nowrap shadow-2xs"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                  <span>{item}</span>
                </span>
              ))}
            </motion.div>
          </div>

          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-block w-2 h-2 rounded-full bg-purple-600 animate-pulse" />
            <span className="font-tech text-xs tracking-[0.25em] font-semibold text-brand-600 uppercase">
              01 — 06 // MASTER ARCHITECTURE
            </span>
          </div>

          {/* Big High-Impact Headline (Light Theme) */}
          <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-neutral-900 leading-[1.08]">
            Solutions that{' '}
            <span className="gradient-signature-text">
              feel deterministic.
            </span>
          </h1>

          {/* Narrative Lead */}
          <p className="mt-5 text-base sm:text-lg text-neutral-600 leading-relaxed font-normal max-w-lg">
            A high-performance cinematic image river across our 6 core engineering disciplines. We identify the true business problem first — then build AI, software, and automation as the answer.
          </p>

          {/* Buttons: Primary Pill + AI Diagnostic Jump + Ghost Arrow Link */}
          <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-3.5">
            <button
              onClick={handleScrollToGrid}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-neutral-900 text-white font-bold text-sm tracking-wide hover:bg-purple-600 transition-all duration-150 shadow-md cursor-pointer group"
            >
              <span>Explore Disciplines</span>
              <ArrowDown className="w-4 h-4 text-white group-hover:translate-y-0.5 transition-transform" />
            </button>

            <a
              href="#find-solution"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-700 text-sm font-bold tracking-wide transition-all duration-150 shadow-2xs group cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-purple-600 group-hover:rotate-12 transition-transform" />
              <span>Find Your Solution</span>
            </a>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white hover:bg-neutral-100 border border-neutral-300 text-neutral-800 text-sm font-semibold tracking-wide transition-colors shadow-2xs"
            >
              <span>Schedule Consultation</span>
              <ArrowRight className="w-4 h-4 text-purple-600" />
            </Link>
          </div>

        </div>

        {/* Right Side: Tilted Multi-Column Infinite Scrolling Media River (Deep Ultra-Soft Feather) */}
        <div
          className="lg:col-span-6 xl:col-span-7 relative h-[500px] sm:h-[560px] lg:h-[620px] overflow-hidden flex items-center justify-center"
          style={{
            maskImage:
              'radial-gradient(ellipse 85% 78% at 50% 50%, black 25%, rgba(0,0,0,0.75) 45%, rgba(0,0,0,0.3) 65%, transparent 84%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 85% 78% at 50% 50%, black 25%, rgba(0,0,0,0.75) 45%, rgba(0,0,0,0.3) 65%, transparent 84%)',
          }}
        >
          {/* Tilted River Canvas */}
          <div
            style={{
              transform: 'rotate(-12deg) skewX(-2deg) scale(1.02)',
            }}
            className="relative w-full max-w-[700px] flex items-center justify-center gap-3 sm:gap-4 select-none"
          >
            {/* Column 1 (Scrolls Up) */}
            <RiverColumn
              cards={[...COLUMN_1_CARDS, ...COLUMN_1_CARDS]}
              direction="up"
              duration={24}
              shouldReduceMotion={shouldReduceMotion}
            />

            {/* Column 2 (Scrolls Down - Alternate) */}
            <RiverColumn
              cards={[...COLUMN_2_CARDS, ...COLUMN_2_CARDS]}
              direction="down"
              duration={28}
              shouldReduceMotion={shouldReduceMotion}
            />

            {/* Column 3 (Scrolls Up) */}
            <RiverColumn
              cards={[...COLUMN_3_CARDS, ...COLUMN_3_CARDS]}
              direction="up"
              duration={22}
              shouldReduceMotion={shouldReduceMotion}
              className="hidden sm:block"
            />
          </div>

        </div>

      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Sub-Component: River Column (Light Theme Edition)
// ─────────────────────────────────────────────────────────────────────────────
interface RiverColumnProps {
  cards: RiverCard[];
  direction: 'up' | 'down';
  duration: number;
  shouldReduceMotion: boolean;
  className?: string;
}

function RiverColumn({
  cards,
  direction,
  duration,
  shouldReduceMotion,
  className = '',
}: RiverColumnProps) {
  const initialY = direction === 'up' ? '0%' : '-50%';
  const targetY = direction === 'up' ? '-50%' : '0%';

  return (
    <div className={`relative w-44 sm:w-52 lg:w-56 shrink-0 overflow-hidden ${className}`}>
      <motion.div
        animate={
          shouldReduceMotion
            ? { y: 0 }
            : { y: [initialY, targetY] }
        }
        transition={{
          y: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: duration,
            ease: 'linear',
          },
        }}
        className="flex flex-col gap-4 sm:gap-6 w-full"
      >
        {cards.map((card, idx) => (
          <div
            key={`${card.id}-${idx}`}
            className="group relative aspect-[9/13] w-full rounded-2xl sm:rounded-3xl bg-white border border-neutral-200/90 hover:border-purple-400/80 transition-all duration-300 shadow-md hover:shadow-xl p-4 sm:p-5 flex flex-col justify-between overflow-hidden cursor-pointer"
          >
            {/* Ambient Card Background Lift on Hover */}
            <div
              className="absolute -top-10 -right-10 w-40 h-40 bg-purple-600/5 group-hover:bg-purple-600/12 blur-[30px] transition-colors pointer-events-none"
              aria-hidden="true"
            />

            {/* Card Header: Pill & Number */}
            <div className="relative z-10 flex items-center justify-between gap-2">
              <span className="font-mono text-[11px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                {card.disciplineNum}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-neutral-100 border border-neutral-200/70 text-[10px] font-mono text-neutral-600 font-medium">
                {card.badge}
              </span>
            </div>

            {/* Centered 3D Artwork Image */}
            <div className="relative z-10 my-auto flex items-center justify-center py-2">
              <div className="relative w-28 sm:w-36 h-28 sm:h-36 transition-transform duration-500 group-hover:scale-108">
                <Image
                  src={card.image}
                  alt={card.disciplineName}
                  fill
                  className="object-contain drop-shadow-[0_12px_24px_rgba(147,51,234,0.14)]"
                />
              </div>
            </div>

            {/* Card Footer: Discipline Name & Telemetry SLA */}
            <div className="relative z-10 pt-2.5 border-t border-neutral-100">
              <div className="text-xs sm:text-sm font-bold text-neutral-900 tracking-tight truncate">
                {card.disciplineName}
              </div>
              <div className="text-[10px] sm:text-[11px] font-mono text-purple-600 font-semibold mt-0.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="truncate">{card.metric}</span>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
