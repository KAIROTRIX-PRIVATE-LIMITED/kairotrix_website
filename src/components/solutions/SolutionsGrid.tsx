'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import {
  SOLUTIONS_DATA,
  type SolutionDetail,
} from '@/data/solutionsData';
import {
  MaskedReveal,
  DrawLine,
  revealMeta,
  revealBody,
  EASE_CINEMATIC,
  EASE_PRECISE,
} from '@/lib/animations';

const LEFT_RIBBON_ITEMS = [
  'AI SYSTEMS & AGENTS',
  'CUSTOM SOFTWARE & PRODUCTS',
  'BUSINESS AUTOMATION',
  'WEBSITES & EXPERIENCES',
  'DATA & INTELLIGENCE',
  'SYSTEM INTEGRATION',
];

const RIGHT_RIBBON_ITEMS = [
  'DETERMINISTIC ARCHITECTURE',
  'FULL CODE OWNERSHIP',
  'DESIGNED FOR RELIABILITY',
  'PRODUCTION GRADE DEPLOYMENT',
  'ZERO DOWNTIME MIGRATION',
  'BUILT TO EVOLVE',
];

const SOLUTION_DESCRIPTIONS: Record<string, string> = {
  'ai-intelligent-systems':
    'Build AI-powered applications, intelligent agents, machine learning systems, and knowledge tools that help businesses automate work, use information, and make better decisions.',
  'software-product-engineering':
    'Design and build custom business software, web applications, SaaS platforms, and digital products—from the first idea and MVP to ongoing development and improvement.',
  'automation-digital-operations':
    'Automate repetitive workflows, documents, approvals, communications, and administrative tasks so everyday operations require less manual work.',
  'digital-transformation':
    'Modernize how your business works and interacts online through websites, digital workflows, process digitization, and user-focused UI/UX design.',
  'data-business-intelligence':
    'Turn business data into useful insights through analytics, KPI dashboards, interactive reports, and natural-language tools for exploring information.',
  'technology-integration':
    'Connect the software your business already uses through APIs, CRM and ERP integrations, payment services, and reliable data synchronization between systems.',
};


interface DisciplineRowProps {
  discipline: SolutionDetail;
  index: number;
  isHovered: boolean;
  onHover: () => void;
}

function DisciplineRow({ discipline, index, isHovered, onHover }: DisciplineRowProps) {
  const shouldReduceMotion = useReducedMotion();
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: shouldReduceMotion ? 0 : isEven ? -22 : 22,
        y: shouldReduceMotion ? 0 : 12,
      }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: 0.55,
        delay: index * 0.07,
        ease: EASE_CINEMATIC,
      }}
      className="scroll-mt-28"
    >
      <Link
        href={`/solutions/${discipline.slug}`}
        onMouseEnter={onHover}
        className="group relative flex items-center justify-between py-5 sm:py-6 lg:py-6.5 px-3 sm:px-5 transition-all duration-300 hover:bg-white rounded-2xl hover:shadow-[0_10px_36px_rgba(147,51,234,0.08)] overflow-hidden"
      >
        {/* Specular sheen sweep on hover */}
        <div
          className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-brand-500/[0.05] to-transparent z-10"
          aria-hidden="true"
        />

        {/* Left Side: Sliding Image Chamber + Discipline Content */}
        <div className="flex items-center min-w-0 pr-4 z-20">
          
          {/* ── Slide-in Image Chamber (ArcSphere Studio Interaction) ── */}
          <motion.div
            initial={false}
            animate={{
              width: isHovered ? 140 : 0,
              opacity: isHovered ? 1 : 0,
              marginRight: isHovered ? 20 : 0,
              scale: isHovered ? 1 : 0.88,
            }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.36,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="hidden sm:block overflow-hidden shrink-0 rounded-xl relative border border-brand-500/20 bg-neutral-900/[0.02] shadow-2xs"
            style={{ height: 84 }}
          >
            <div className="relative w-[140px] h-[84px] flex items-center justify-center p-2 bg-gradient-to-br from-brand-50/70 via-white to-neutral-50/80 overflow-hidden">
              <div className="absolute inset-0 bg-brand-500/10 blur-sm pointer-events-none" />
              <Image
                src={discipline.gridImage || discipline.image}
                alt={discipline.title}
                fill
                className="object-contain p-2 drop-shadow-[0_4px_14px_rgba(147,51,234,0.22)] transition-transform duration-500 group-hover:scale-105"
                sizes="140px"
              />
            </div>
          </motion.div>

          {/* Discipline Text Stack */}
          <div className="space-y-1.5 min-w-0">
            {/* Meta Eyebrow: CORE SOLUTION */}
           

            {/* Discipline Title */}
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-neutral-900 group-hover:text-brand-600 transition-colors duration-300">
              {discipline.title}
            </h3>

            {/* Plain-English Purpose Description */}
            <p className="text-xs sm:text-sm text-neutral-600 font-normal line-clamp-2 max-w-2xl leading-relaxed">
              {SOLUTION_DESCRIPTIONS[discipline.slug] || discipline.subtitle}
            </p>
          </div>

        </div>

        {/* Right Side: Exact Core Services Count & Circular Arrow Trigger */}
        <div className="flex items-center gap-3 shrink-0 z-20">
          {/* Mobile Image (shown only on small screens < sm) */}
          <div className="sm:hidden relative w-12 h-12 shrink-0 rounded-lg overflow-hidden border border-neutral-200/80 bg-neutral-50 p-1">
            <Image
              src={discipline.gridImage || discipline.image}
              alt={discipline.title}
              fill
              className="object-contain p-1"
              sizes="48px"
            />
          </div>

          <span className="hidden md:inline-block text-xs font-tech font-semibold uppercase tracking-wider text-neutral-400 group-hover:text-brand-600 transition-colors">
            EXPLORE
          </span>

          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-neutral-200/90 flex items-center justify-center text-neutral-400 group-hover:border-brand-600 group-hover:bg-brand-600 group-hover:text-white group-hover:scale-105 group-hover:shadow-[0_4px_16px_rgba(147,51,234,0.25)] transition-all duration-300 shadow-2xs">
            <ArrowUpRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>

      </Link>
    </motion.div>
  );
}

export function SolutionsGrid() {
  const disciplines = Object.values(SOLUTIONS_DATA);
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  return (
    <section
      id="solutions-directory"
      className="relative w-full py-14 sm:py-18 lg:py-20 bg-[#FAFAFC] overflow-hidden scroll-mt-24"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* ── LEFT FLANK: Vertical Ribbon Flowing UPWARDS (↑) ── */}
        <div
          className="absolute left-0 xl:left-1 top-16 bottom-12 w-14 xl:w-18 hidden lg:flex flex-col items-center overflow-hidden pointer-events-none select-none z-20"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
          }}
          aria-hidden="true"
        >
          <motion.div
            animate={{ y: ['0%', '-50%'] }}
            transition={{
              repeat: Infinity,
              duration: 28,
              ease: 'linear',
            }}
            className="flex flex-col items-center gap-12 py-6 shrink-0"
          >
            {[...LEFT_RIBBON_ITEMS, ...LEFT_RIBBON_ITEMS].map((item, idx) => {
              const isStroke = idx % 2 !== 0;
              return (
                <div key={idx} className="flex flex-col items-center gap-10">
                  <span
                    className={`font-mono text-2xl xl:text-3xl font-black tracking-tight uppercase whitespace-nowrap ${
                      isStroke
                        ? 'text-transparent [-webkit-text-stroke:1.5px_rgba(147,51,234,0.22)]'
                        : 'text-neutral-900/[0.08]'
                    }`}
                    style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                  >
                    {item}
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-500/30" />
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* ── RIGHT FLANK: Vertical Ribbon Flowing DOWNWARDS (↓) ── */}
        <div
          className="absolute right-0 xl:right-1 top-16 bottom-12 w-14 xl:w-18 hidden lg:flex flex-col items-center overflow-hidden pointer-events-none select-none z-20"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
          }}
          aria-hidden="true"
        >
          <motion.div
            animate={{ y: ['-50%', '0%'] }}
            transition={{
              repeat: Infinity,
              duration: 28,
              ease: 'linear',
            }}
            className="flex flex-col items-center gap-12 py-6 shrink-0"
          >
            {[...RIGHT_RIBBON_ITEMS, ...RIGHT_RIBBON_ITEMS].map((item, idx) => {
              const isStroke = idx % 2 !== 0;
              return (
                <div key={idx} className="flex flex-col items-center gap-10">
                  <span
                    className={`font-mono text-2xl xl:text-3xl font-black tracking-tight uppercase whitespace-nowrap ${
                      isStroke
                        ? 'text-transparent [-webkit-text-stroke:1.5px_rgba(147,51,234,0.22)]'
                        : 'text-neutral-900/[0.08]'
                    }`}
                    style={{ writingMode: 'vertical-rl' }}
                  >
                    {item}
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-500/30" />
                </div>
              );
            })}
          </motion.div>
        </div>
        
        {/* Section Header */}
        <div className="mb-8 sm:mb-12 max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={revealMeta}
            className="flex items-center gap-3 mb-3 sm:mb-4"
          >
            <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-pulse shadow-[0_0_8px_rgba(147,51,234,0.6)]" />
            <span className="font-tech text-xs tracking-[0.25em] font-semibold text-brand-600 uppercase">
              EXPLORE SOLUTIONS
            </span>
            <DrawLine className="h-px w-10 sm:w-16 bg-neutral-300" delay={0.2} />
          </motion.div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] text-neutral-950 uppercase leading-[1.12]">
            <MaskedReveal delay={0.1}>
              <span>CORE </span>
              <span className="gradient-signature-text">SOLUTIONS.</span>
            </MaskedReveal>
          </h2>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={revealBody}
            className="mt-3 sm:mt-4 text-base sm:text-lg text-neutral-600 max-w-2xl font-normal leading-relaxed"
          >
            From AI and custom software to automation, digital experiences, data, and integration—explore the technology we design and build around real business needs.
          </motion.p>
        </div>

        {/* Top dividing hairline */}
        <div className="max-w-5xl mx-auto">
          <DrawLine className="h-px w-full bg-neutral-200/80" delay={0.15} origin="left" />
        </div>

        {/* Core Solutions Directory (Single Column Editorial Directory with Slide-in Image on Hover) */}
        <div
          onMouseLeave={() => setHoveredSlug(null)}
          className="max-w-5xl mx-auto divide-y divide-neutral-200/80"
        >
          {disciplines.map((discipline, index) => (
            <DisciplineRow
              key={discipline.slug}
              discipline={discipline}
              index={index}
              isHovered={hoveredSlug === discipline.slug}
              onHover={() => setHoveredSlug(discipline.slug)}
            />
          ))}
        </div>

        {/* Bottom dividing hairline */}
        <div className="max-w-5xl mx-auto">
          <DrawLine className="h-px w-full bg-neutral-200/80" delay={0.25} origin="right" />
        </div>

      </div>
    </section>
  );
}
