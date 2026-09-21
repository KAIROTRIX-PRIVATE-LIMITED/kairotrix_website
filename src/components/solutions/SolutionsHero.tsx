'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowDown, Sparkles } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface RiverCard {
  id: string;
  solutionNum: string;
  solutionName: string;
  badge: string;
  image: string;
  aspect: string;
}

const COLUMN_1_CARDS: RiverCard[] = [
  {
    id: 'c1-1',
    solutionNum: '01',
    solutionName: 'AI Systems & Agents',
    badge: 'AI Workflows',
    image: '/assets/images/service/SERVICE01.png',
    aspect: 'Controlled AI Actions',
  },
  {
    id: 'c1-2',
    solutionNum: '04',
    solutionName: 'Websites & Experiences',
    badge: 'Web Architecture',
    image: '/assets/images/service/SERVICE04.png',
    aspect: 'Maintainable Software',
  },
  {
    id: 'c1-3',
    solutionNum: '03',
    solutionName: 'Business Automation',
    badge: 'Process Flow',
    image: '/assets/images/service/SERVICE03.png',
    aspect: 'Error Handling & Retries',
  },
  {
    id: 'c1-4',
    solutionNum: '06',
    solutionName: 'Technology Integration',
    badge: 'API Gateway',
    image: '/assets/images/service/SERVICE06.png',
    aspect: 'API & System Connections',
  },
];

const COLUMN_2_CARDS: RiverCard[] = [
  {
    id: 'c2-1',
    solutionNum: '02',
    solutionName: 'Custom Software & Products',
    badge: 'Architecture',
    image: '/assets/images/service/SERVICE02.png',
    aspect: 'Clear System Architecture',
  },
  {
    id: 'c2-2',
    solutionNum: '05',
    solutionName: 'Data & Intelligence',
    badge: 'Pipelines',
    image: '/assets/images/service/SERVICE05.png',
    aspect: 'Data Validation',
  },
  {
    id: 'c2-3',
    solutionNum: '01',
    solutionName: 'AI Systems & Agents',
    badge: 'Engineered Models',
    image: '/assets/images/service/SERVICE01.png',
    aspect: 'Documented Code',
  },
  {
    id: 'c2-4',
    solutionNum: '03',
    solutionName: 'Business Automation',
    badge: 'Operations',
    image: '/assets/images/service/SERVICE03.png',
    aspect: 'Monitoring & Logging',
  },
];

const COLUMN_3_CARDS: RiverCard[] = [
  {
    id: 'c3-1',
    solutionNum: '06',
    solutionName: 'Technology Integration',
    badge: 'Ecosystems',
    image: '/assets/images/service/SERVICE06.png',
    aspect: 'Automated Data Sync',
  },
  {
    id: 'c3-2',
    solutionNum: '02',
    solutionName: 'Custom Software & Products',
    badge: 'Security',
    image: '/assets/images/service/SERVICE02.png',
    aspect: 'Secure Access Controls',
  },
  {
    id: 'c3-3',
    solutionNum: '04',
    solutionName: 'Websites & Experiences',
    badge: 'Deployment',
    image: '/assets/images/service/SERVICE04.png',
    aspect: 'Staged System Cutover',
  },
  {
    id: 'c3-4',
    solutionNum: '05',
    solutionName: 'Data & Intelligence',
    badge: 'Schemas',
    image: '/assets/images/service/SERVICE05.png',
    aspect: 'Structured Data Schemas',
  },
];

const TICKER_ITEMS = [
  '01 // AI Systems & Agents',
  '02 // Custom Software & Products',
  '03 // Business Automation',
  '04 // Websites & Digital Experiences',
  '05 // Data & Business Intelligence',
  '06 // Technology Integration',
];

export function SolutionsHero() {
  const shouldReduceMotion = useReducedMotion();

  const handleScrollToDirectory = () => {
    const el = document.getElementById('solutions-directory');
    if (el) {
      el.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative w-full bg-[#FAFAFC] text-neutral-900 overflow-hidden border-b border-neutral-200/90 pt-28 sm:pt-32 lg:pt-36 pb-12 sm:pb-16">
      {/* Ambient engineering background grid */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"
        aria-hidden="true"
      />

      {/* Ambient Brand Accent Glows */}
      <div
        className="absolute -top-28 -left-28 w-[540px] h-[540px] bg-purple-600/6 blur-[140px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 -right-28 w-[640px] h-[640px] bg-indigo-600/5 blur-[160px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Main Split Body: Left Narrative + Right Sliding Image River */}
      <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        {/* Left Side: Standardized Eyebrow, Proportioned 2-Line Headline, Narrative & CTAs */}
        <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center py-2 sm:py-6">
          {/* Standardized Eyebrow */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-pulse shadow-[0_0_8px_rgba(147,51,234,0.6)]" />
            <span className="font-tech text-xs tracking-[0.25em] font-semibold text-brand-600 uppercase">
              01 // CORE SOLUTIONS
            </span>
            <div className="h-px w-10 sm:w-16 bg-neutral-200" />

            <span className="font-mono text-xs tracking-wider uppercase font-semibold text-neutral-900">
              [KTRX®—SOLUTIONS]
            </span>

            <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white border border-neutral-200/80 font-mono text-[10px] uppercase tracking-wider text-neutral-600 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>6 DISCIPLINES</span>
            </div>
          </div>

          {/* Controlled Proportioned Headline (Guaranteed 2-Line Flow) */}
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[52px] font-extrabold uppercase tracking-[-0.03em] text-neutral-950 leading-[1.08] mb-5">
            FROM BUSINESS PROBLEMS <br className="hidden sm:inline" />
            TO{' '}
            <span className="gradient-signature-text">
              WORKING SYSTEMS.
            </span>
          </h1>

          {/* Plain-English Narrative Lead */}
          <p className="text-base sm:text-lg text-neutral-600 font-sans leading-relaxed font-normal max-w-xl mb-7">
            We start by understanding what your business needs, then design and build the right solution—from software and AI to automation, websites, data systems, and integrations.
          </p>

          {/* Three-Tiered Intent Journey CTAs */}
          <div className="flex flex-wrap items-center gap-3.5 sm:gap-4">
            <button
              onClick={handleScrollToDirectory}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-neutral-900 text-white font-bold text-sm tracking-wide hover:bg-brand-600 transition-all duration-200 shadow-md cursor-pointer group"
            >
              <span>Explore Solutions</span>
              <ArrowDown className="w-4 h-4 text-white group-hover:translate-y-0.5 transition-transform" />
            </button>

            <a
              href="#find-solution"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-brand-50 hover:bg-brand-100 border border-brand-200 text-brand-700 text-sm font-bold tracking-wide transition-all duration-200 shadow-2xs group cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-brand-600 group-hover:rotate-12 transition-transform" />
              <span>Find the Right Solution</span>
            </a>

            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-600 hover:text-brand-600 transition-colors py-2 px-1 group cursor-pointer"
            >
              <span>Discuss Your Project</span>
              <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-brand-600 group-hover:translate-x-0.5 transition-all" />
            </Link>
          </div>
        </div>

        {/* Right Side: Sliding Image Animation (Tilted Infinite Scrolling Media River) */}
        <div
          className="lg:col-span-6 xl:col-span-6 relative h-[480px] sm:h-[540px] lg:h-[600px] overflow-hidden flex items-center justify-center select-none"
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
              transform: 'rotate(-10deg) skewX(-2deg) scale(1.02)',
            }}
            className="relative w-full max-w-[620px] flex items-center justify-center gap-3 sm:gap-4"
          >
            {/* Column 1 (Scrolls Up) */}
            <RiverColumn
              cards={[...COLUMN_1_CARDS, ...COLUMN_1_CARDS]}
              direction="up"
              duration={24}
              shouldReduceMotion={shouldReduceMotion}
            />

            {/* Column 2 (Scrolls Down) */}
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

      {/* Continuous 6-Discipline Ticker Flow at Bottom of Hero */}
      <div className="mt-10 sm:mt-12 pt-4 pb-1 border-t border-neutral-200/60 overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)]">
        <motion.div
          animate={{ x: shouldReduceMotion ? 0 : ['0%', '-50%'] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 26,
              ease: 'linear',
            },
          }}
          className="flex items-center gap-6 w-max select-none"
        >
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <span className="font-mono text-xs font-semibold tracking-wider text-neutral-600 uppercase whitespace-nowrap">
                {item}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500/40" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Sub-Component: River Column (Sliding 3D Image Specimen Cards)
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
    <div className={`relative w-40 sm:w-48 lg:w-52 shrink-0 overflow-hidden ${className}`}>
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
        className="flex flex-col gap-4 sm:gap-5 w-full"
      >
        {cards.map((card, idx) => (
          <div
            key={`${card.id}-${idx}`}
            className="group relative aspect-[9/13] w-full rounded-2xl sm:rounded-3xl bg-white border border-neutral-200/90 hover:border-purple-400/80 transition-all duration-300 shadow-md hover:shadow-xl p-4 sm:p-5 flex flex-col justify-between overflow-hidden cursor-pointer"
          >
            {/* Ambient Card Background Lift on Hover */}
            <div
              className="absolute -top-10 -right-10 w-36 h-36 bg-purple-600/5 group-hover:bg-purple-600/12 blur-[30px] transition-colors pointer-events-none"
              aria-hidden="true"
            />

            {/* Card Header: Pill & Number */}
            <div className="relative z-10 flex items-center justify-between gap-2">
              <span className="font-mono text-[11px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                {card.solutionNum}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-neutral-100 border border-neutral-200/70 text-[10px] font-mono text-neutral-600 font-medium">
                {card.badge}
              </span>
            </div>

            {/* Centered 3D Artwork Image */}
            <div className="relative z-10 my-auto flex items-center justify-center py-2">
              <div className="relative w-24 sm:w-32 h-24 sm:h-32 transition-transform duration-500 group-hover:scale-108">
                <Image
                  src={card.image}
                  alt={card.solutionName}
                  fill
                  className="object-contain drop-shadow-[0_12px_24px_rgba(147,51,234,0.14)]"
                />
              </div>
            </div>

            {/* Card Footer: Solution Name & Concrete Engineering Consideration */}
            <div className="relative z-10 pt-2.5 border-t border-neutral-100">
              <div className="text-xs sm:text-sm font-bold text-neutral-900 tracking-tight truncate">
                {card.solutionName}
              </div>
              <div className="text-[10px] sm:text-[11px] font-mono text-purple-700 font-semibold mt-1 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0" />
                <span className="truncate uppercase tracking-wider">{card.aspect}</span>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
