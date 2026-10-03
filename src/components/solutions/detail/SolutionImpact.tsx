'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShieldCheck, TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-react';
import type { SolutionDetail } from '@/data/solutionsData';
import { MaskedReveal, DrawLine, revealMeta, revealBody, cardFromLeft, cardFromRight, EASE_CINEMATIC } from '@/lib/animations';

interface SolutionImpactProps {
  solution: SolutionDetail;
}

export function SolutionImpact({ solution }: SolutionImpactProps) {
  const { editorialSplit } = solution;

  return (
    <section id="system-focus" className="w-full bg-[#FAFAFC] py-20 lg:py-28 border-b border-neutral-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ─── EDITORIAL 3-COLUMN SPREAD ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
          {/* Left Column: Visual Artwork Card with Highlight */}
          <div className="lg:col-span-4 max-w-sm mx-auto lg:max-w-none w-full">
            <motion.div
              variants={cardFromLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, ease: EASE_CINEMATIC }}
              className="relative aspect-[4/3] sm:aspect-[4/5] rounded-3xl bg-neutral-100 border border-neutral-200 p-6 flex flex-col justify-between overflow-hidden group shadow-sm"
            >
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-[11px] font-tech text-brand-600 font-semibold uppercase tracking-wider">
                  SYSTEM FOCUS
                </span>
                <span className="w-2 h-2 rounded-full bg-brand-500" />
              </div>

              {/* Centered Visual */}
              <div className="relative my-auto w-full h-36 sm:h-44 flex items-center justify-center">
                <Image
                  src={solution.systemFocusImage || solution.image}
                  alt={`${solution.title} system focus`}
                  width={220}
                  height={220}
                  className="max-h-full w-auto object-contain transform group-hover:scale-105 transition-transform duration-500 drop-shadow-lg"
                />
              </div>

              {/* Bottom Highlight Card */}
              <div className="relative z-10 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-neutral-200">
                <div className="text-xl sm:text-2xl font-bold font-tech text-neutral-900 tracking-tight">
                  {editorialSplit.editorialHighlight.lead}
                </div>
                <div className="text-xs text-neutral-600 font-medium leading-snug mt-1">
                  {editorialSplit.editorialHighlight.detail}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Center/Right: Editorial Headline & Narrative */}
          <div className="lg:col-span-8 space-y-6">
            <motion.div
              variants={revealMeta}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              className="flex items-center justify-center lg:justify-start gap-3"
            >
              <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-pulse" />
              <span className="font-tech text-xs tracking-[0.25em] font-semibold text-brand-600 uppercase">
                {editorialSplit.badge}
              </span>
              <DrawLine className="hidden sm:block w-10 sm:w-16 bg-neutral-200" delay={0.2} />
            </motion.div>

            <div className="text-center lg:text-left">
              <MaskedReveal delay={0.06}>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] text-neutral-950 leading-[1.12]">
                  {editorialSplit.headline}
                </h2>
              </MaskedReveal>
            </div>

            <motion.p
              variants={revealBody}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: 0.16 }}
              className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal text-center lg:text-left mx-auto lg:mx-0"
            >
              {editorialSplit.lead}
            </motion.p>

            {/* System Focus Cards Grid */}
            <div
              className={`grid grid-cols-1 ${
                editorialSplit.focusCards && editorialSplit.focusCards.length === 3
                  ? 'sm:grid-cols-3 gap-4'
                  : 'sm:grid-cols-2 gap-5'
              } pt-4`}
            >
              {editorialSplit.focusCards && editorialSplit.focusCards.length > 0 ? (
                editorialSplit.focusCards.map((fc, idx) => (
                  <motion.div
                    key={idx}
                    variants={idx % 2 === 0 ? cardFromLeft : cardFromRight}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, delay: 0.2 + idx * 0.05, ease: EASE_CINEMATIC }}
                    className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-2xs hover:border-brand-400/80 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2 text-brand-600 text-xs font-tech font-bold tracking-wider uppercase mb-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-500" />
                        <span>{fc.tag || `FOCUS 0${idx + 1}`}</span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-neutral-900 tracking-tight uppercase mb-1">
                        {fc.title}
                      </h3>
                      {fc.subtitle && (
                        <div className="text-xs text-brand-600 font-medium mb-2.5">
                          {fc.subtitle}
                        </div>
                      )}
                      <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                        {fc.description}
                      </p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <>
                  <motion.div
                    variants={cardFromLeft}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, delay: 0.2, ease: EASE_CINEMATIC }}
                    className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200"
                  >
                    <div className="flex items-center gap-2 text-amber-700 text-xs font-tech font-semibold tracking-wider uppercase mb-2">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                      <span>Operational Challenge</span>
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                      {editorialSplit.problemSolved}
                    </p>
                  </motion.div>

                  <motion.div
                    variants={cardFromRight}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, delay: 0.25, ease: EASE_CINEMATIC }}
                    className="p-6 rounded-2xl bg-brand-50/50 border border-brand-200"
                  >
                    <div className="flex items-center gap-2 text-brand-700 text-xs font-tech font-semibold tracking-wider uppercase mb-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-600" />
                      <span>Engineered Solution</span>
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                      {editorialSplit.strategicAdvantage}
                    </p>
                  </motion.div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
