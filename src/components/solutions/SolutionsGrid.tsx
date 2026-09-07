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

const LEFT_RIBBON_ITEMS = [
  '01 // AUTONOMOUS SYSTEMS',
  '02 // PRODUCT ENGINEERING',
  '03 // WORKFLOW ORCHESTRATION',
  '04 // DIGITAL MODERNIZATION',
  '05 // BUSINESS INTELLIGENCE',
  '06 // SYSTEM INTEGRATION',
];

const RIGHT_RIBBON_ITEMS = [
  'DETERMINISTIC ARCHITECTURE',
  'FULL CODE OWNERSHIP',
  'ENTERPRISE SLA 99.99%',
  'PRODUCTION GRADE DEPLOYMENT',
  'ZERO DOWNTIME MIGRATION',
  'BUILT TO EVOLVE',
];

interface DisciplineRowProps {
  discipline: SolutionDetail;
  index: number;
  isHovered: boolean;
  onHover: () => void;
}

function DisciplineRow({ discipline, index, isHovered, onHover }: DisciplineRowProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.45,
        delay: index * 0.05,
        ease: [0.16, 1, 0.3, 1],
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
                src={discipline.image}
                alt={discipline.title}
                fill
                className="object-contain p-2 drop-shadow-[0_4px_14px_rgba(147,51,234,0.22)] transition-transform duration-500 group-hover:scale-105"
                sizes="140px"
              />
            </div>
          </motion.div>

          {/* Discipline Text Stack */}
          <div className="space-y-1.5 min-w-0">
            {/* Meta Eyebrow */}
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-xs font-bold text-brand-700 bg-brand-50 group-hover:bg-brand-600 group-hover:text-white px-2 py-0.5 rounded-md border border-brand-200 group-hover:border-brand-600 transition-colors duration-300 shrink-0">
                {discipline.number}
              </span>
              <span className="font-tech text-[10px] sm:text-[11px] tracking-[0.16em] font-semibold text-neutral-400 group-hover:text-neutral-600 uppercase transition-colors truncate">
                {discipline.categoryTag}
              </span>
            </div>

            {/* Discipline Title */}
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-neutral-900 group-hover:text-brand-600 transition-colors duration-300">
              {discipline.title}
            </h3>

            {/* Concise Subtitle / Description */}
            <p className="text-xs sm:text-sm text-neutral-600 font-normal line-clamp-1 sm:line-clamp-2 max-w-2xl leading-relaxed">
              {discipline.subtitle || discipline.editorialHeadline}
            </p>
          </div>

        </div>

        {/* Right Side: Capabilities Counter & Circular Arrow Trigger */}
        <div className="flex items-center gap-3 shrink-0 z-20">
          {/* Mobile Image (shown only on small screens < sm) */}
          <div className="sm:hidden relative w-12 h-12 shrink-0 rounded-lg overflow-hidden border border-neutral-200/80 bg-neutral-50 p-1">
            <Image
              src={discipline.image}
              alt={discipline.title}
              fill
              className="object-contain p-1"
              sizes="48px"
            />
          </div>

          <span className="hidden md:inline-block text-xs font-tech font-semibold uppercase tracking-wider text-neutral-400 group-hover:text-brand-600 transition-colors">
            {discipline.subCategories.length} CAPABILITIES
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
    <section className="relative w-full py-14 sm:py-18 lg:py-20 bg-[#FAFAFC] overflow-hidden">
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
        <div className="mb-6 sm:mb-8 max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-block w-2 h-2 rounded-full bg-brand-600 animate-pulse" />
            <span className="font-tech text-xs tracking-[0.25em] font-semibold text-brand-600 uppercase">
              THE 6 DISCIPLINES
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-neutral-900 leading-tight">
            SIX CORE{' '}
            <span className="gradient-signature-text">
              DISCIPLINES.
            </span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-neutral-600 max-w-2xl font-normal">
            Deterministic architecture, verified engineering, and full source code ownership across six core technology disciplines.
          </p>
        </div>

        {/* The 6 Disciplines (Single Column Editorial Directory with Slide-in Image on Hover) */}
        <div
          onMouseLeave={() => setHoveredSlug(null)}
          className="max-w-5xl mx-auto divide-y divide-neutral-200/80 border-y border-neutral-200/80"
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

      </div>
    </section>
  );
}
