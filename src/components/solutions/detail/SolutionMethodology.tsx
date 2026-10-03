'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Search, Box, Lightbulb, CheckCircle2 } from 'lucide-react';
import type { SolutionDetail, ProcessStep } from '@/data/solutionsData';
import { MaskedReveal, DrawLine, revealMeta, revealBody, cardFromLeft, cardFromCenter, cardFromRight, EASE_CINEMATIC } from '@/lib/animations';

interface SolutionMethodologyProps {
  solution: SolutionDetail;
}

export function SolutionMethodology({ solution }: SolutionMethodologyProps) {
  const getIcon = (type: ProcessStep['iconType']) => {
    switch (type) {
      case 'search':
        return <Search className="w-4 h-4 text-brand-600" />;
      case 'cube':
        return <Box className="w-4 h-4 text-brand-600" />;
      case 'lightbulb':
        return <Lightbulb className="w-4 h-4 text-brand-600" />;
      case 'check':
        return <CheckCircle2 className="w-4 h-4 text-brand-600" />;
    }
  };

  return (
    <section id="methodology" className="w-full bg-neutral-50/60 py-24 lg:py-32 border-b border-neutral-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            variants={revealMeta}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-3 sm:mb-4"
          >
            <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-pulse" />
            <span className="font-tech text-xs tracking-[0.25em] font-semibold text-brand-600 uppercase">
              HOW WE BUILD
            </span>
            <DrawLine className="w-10 sm:w-16 bg-neutral-200" delay={0.2} />
          </motion.div>
          <MaskedReveal delay={0.06}>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] text-neutral-950 uppercase leading-[1.12]">
              FROM IDEA TO <span className="gradient-signature-text">WORKING SYSTEM.</span>
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
            A clear four-stage engineering process from initial scoping to production launch.
          </motion.p>
        </div>

        {/* ─── 4-COLUMN PROCESS CARDS (Matching 00:18 - 00:19 in video) ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {solution.processSteps.map((step, idx) => {
            const cardVariant =
              idx === 0
                ? cardFromLeft
                : idx === 3
                ? cardFromRight
                : cardFromCenter;

            return (
              <motion.div
                key={idx}
                variants={cardVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: EASE_CINEMATIC }}
                className="rounded-3xl bg-white border border-neutral-200 p-5 flex flex-col justify-between hover:border-brand-400 hover:shadow-lg transition-all duration-300 group"
              >
                <div>
                  {/* Visual Canvas with Top-Right Icon Badge (Full Bleed Prominent 3D Render) */}
                  <div className="relative aspect-[16/11] rounded-2xl bg-[#090910] overflow-hidden mb-5 flex items-center justify-center">
                    {/* Subtle ambient violet stage light */}
                    <div
                      className="absolute inset-0 bg-gradient-to-tr from-brand-950/60 via-[#0B0B14] to-black pointer-events-none"
                      aria-hidden="true"
                    />
                    <div
                      className="absolute w-36 h-36 rounded-full bg-brand-500/25 blur-2xl group-hover:scale-130 transition-transform duration-700 pointer-events-none"
                      aria-hidden="true"
                    />

                    {/* 3D Illustration - Full Canvas Prominent Display */}
                    <Image
                      src={step.image || `/assets/images/solutions/methodology/methodology-${step.step}-${step.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.png`}
                      alt={step.name}
                      fill
                      className="relative z-10 object-contain p-1.5 transform group-hover:scale-110 transition-transform duration-700 ease-out drop-shadow-xl"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />

                    {/* Top-Right Circular Floating Icon Badge */}
                    <div className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-white/95 backdrop-blur-md border border-neutral-200/80 shadow-sm flex items-center justify-center">
                      {getIcon(step.iconType)}
                    </div>

                    {/* Top-Left Step Label */}
                    <div className="absolute top-3 left-3 z-20 font-tech text-[10px] font-bold text-white/90 uppercase tracking-widest px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                      PHASE 0{idx + 1}
                    </div>
                  </div>

                  {/* Step Title */}
                  <h3 className="text-base sm:text-lg font-bold text-neutral-900 mb-2 group-hover:text-brand-600 transition-colors uppercase tracking-tight">
                    {step.name}
                  </h3>

                  {/* Step Description */}
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Bottom Subtle Step Indicator */}
                <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center justify-between text-[11px] font-tech text-neutral-400">
                  <span>STAGE 0{idx + 1} OF 04</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500/60" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
