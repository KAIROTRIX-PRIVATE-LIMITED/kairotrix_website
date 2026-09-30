'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Database, Sliders, Activity, CheckCircle2 } from 'lucide-react';
import type { SolutionDetail } from '@/data/solutionsData';
import { MaskedReveal, DrawLine, revealMeta, revealBody, cardFromLeft, cardFromRight, EASE_CINEMATIC } from '@/lib/animations';

interface SolutionExpertiseCardsProps {
  solution: SolutionDetail;
}

export function SolutionExpertiseCards({ solution }: SolutionExpertiseCardsProps) {
  const getStandardIcon = (idx: number, title: string) => {
    const t = title.toUpperCase();
    if (t.includes('CONTROL') || t.includes('SAFE') || t.includes('ACCESS') || t.includes('MODULAR')) {
      return <ShieldCheck className="w-5 h-5 text-brand-600 group-hover:text-white transition-colors" />;
    }
    if (t.includes('DATA') || t.includes('CONTEXT') || t.includes('STRUCTURE') || t.includes('CONTENT')) {
      return <Database className="w-5 h-5 text-brand-600 group-hover:text-white transition-colors" />;
    }
    if (t.includes('HUMAN') || t.includes('EXCEPTION') || t.includes('USABILITY') || t.includes('ACCESSIBILITY')) {
      return <Sliders className="w-5 h-5 text-brand-600 group-hover:text-white transition-colors" />;
    }
    if (t.includes('TEST') || t.includes('EVALUATION') || t.includes('RETRY') || t.includes('PERFORMANCE') || t.includes('FRESHNESS') || t.includes('MONITORING')) {
      return <Activity className="w-5 h-5 text-brand-600 group-hover:text-white transition-colors" />;
    }
    const fallbackIcons = [
      <ShieldCheck key="0" className="w-5 h-5 text-brand-600 group-hover:text-white transition-colors" />,
      <Database key="1" className="w-5 h-5 text-brand-600 group-hover:text-white transition-colors" />,
      <Sliders key="2" className="w-5 h-5 text-brand-600 group-hover:text-white transition-colors" />,
      <Activity key="3" className="w-5 h-5 text-brand-600 group-hover:text-white transition-colors" />,
    ];
    return fallbackIcons[idx % fallbackIcons.length];
  };

  return (
    <section id="expertise" className="w-full bg-[#FAFAFC] py-20 sm:py-24 lg:py-28 border-b border-neutral-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Centered Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <motion.div
            variants={revealMeta}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-3 sm:mb-4"
          >
            <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-pulse" />
            <span className="font-tech text-xs tracking-[0.25em] font-semibold text-brand-600 uppercase">
              ENGINEERING DEPTH
            </span>
            <DrawLine className="w-10 sm:w-16 bg-neutral-200" delay={0.2} />
          </motion.div>
          <MaskedReveal delay={0.06}>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] text-neutral-950 uppercase leading-[1.12]">
              ENGINEERING <span className="gradient-signature-text">STANDARDS.</span>
            </h2>
          </MaskedReveal>
          <motion.p
            variants={revealBody}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.16 }}
            className="mt-3 sm:mt-4 text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto font-normal leading-relaxed"
          >
            Architectural principles and production baselines behind how our systems are engineered and delivered.
          </motion.p>
        </div>

        {/* ─── 4-COLUMN ARCHITECTURAL STANDARDS CARDS ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {solution.expertiseCards.map((card, idx) => (
            <motion.div
              key={idx}
              variants={idx % 2 === 0 ? cardFromLeft : cardFromRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: EASE_CINEMATIC }}
              className="group relative rounded-3xl bg-white border border-neutral-200/90 p-7 sm:p-8 flex flex-col justify-between overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(147,51,234,0.08)] hover:border-brand-500/40 transition-all duration-300"
            >
              {/* Top Brand Accent Line on Hover */}
              <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-brand-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Ambient purple backlight on hover */}
              <div className="pointer-events-none absolute -top-16 -right-16 w-36 h-36 rounded-full bg-brand-500/5 blur-2xl group-hover:bg-brand-500/10 transition-colors" />

              <div>
                {/* Top Row: Category Pill + Standard Index Number */}
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                    <span className="font-tech text-[10px] sm:text-[11px] font-bold text-brand-600 uppercase tracking-widest">
                      {card.category || 'ENGINEERING STANDARD'}
                    </span>
                  </div>
                  <span className="font-tech text-2xl sm:text-3xl font-black text-neutral-200 group-hover:text-brand-500/30 transition-colors select-none">
                    0{idx + 1}
                  </span>
                </div>

                {/* Middle: Icon + Standard Title + Pillar Tag */}
                <div className="space-y-3.5">
                  <div className="flex items-start gap-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-purple-50 border border-purple-100/90 text-brand-600 flex items-center justify-center shrink-0 group-hover:bg-brand-600 group-hover:border-brand-600 group-hover:shadow-[0_4px_14px_rgba(147,51,234,0.3)] transition-all duration-300">
                      {getStandardIcon(idx, card.title)}
                    </div>
                    <div className="space-y-1.5 min-w-0">
                      <h3 className="font-display text-lg sm:text-xl font-bold text-neutral-950 tracking-tight leading-snug group-hover:text-brand-600 transition-colors">
                        {card.title}
                      </h3>
                      {card.stat && (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-neutral-100 text-neutral-700 font-tech text-[11px] font-semibold tracking-wider uppercase border border-neutral-200/70">
                          <span className="w-1 h-1 rounded-full bg-brand-500" />
                          <span className="truncate">{card.stat}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Standard Description */}
                  <p className="text-sm sm:text-[15px] text-neutral-600 leading-relaxed font-normal pt-2">
                    {card.description}
                  </p>
                </div>
              </div>

              {/* Bottom Row: Baseline & Status Indicator */}
              <div className="mt-8 pt-4 border-t border-neutral-100 flex items-center justify-between text-[11px] font-tech text-neutral-400">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-600" />
                  <span className="font-medium text-neutral-700 uppercase tracking-wider">PRODUCTION PRINCIPLE</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-emerald-700 font-semibold uppercase tracking-wider text-[10px]">ACTIVE</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
