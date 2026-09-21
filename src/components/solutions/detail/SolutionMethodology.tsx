'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Search, Box, Lightbulb, CheckCircle2 } from 'lucide-react';
import type { SolutionDetail, ProcessStep } from '@/data/solutionsData';

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
        {/* Centered Section Header (Matching 00:18 in video) */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-3 sm:mb-4">
            <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-pulse" />
            <span className="font-tech text-xs tracking-[0.25em] font-semibold text-brand-600 uppercase">
              04 // DELIVERY FRAMEWORK
            </span>
            <div className="h-px w-10 sm:w-16 bg-neutral-200" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] text-neutral-950 uppercase leading-[1.12]">
            CLEAR ENGINEERING <span className="gradient-signature-text">PROCESS.</span>
          </h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto font-normal leading-relaxed">
            A rigorous collaborative engineering methodology from initial diagnosis to battle-tested production deployment.
          </p>
        </div>

        {/* ─── 4-COLUMN PROCESS CARDS (Matching 00:18 - 00:19 in video) ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {solution.processSteps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className="rounded-3xl bg-white border border-neutral-200 p-5 flex flex-col justify-between hover:border-brand-400 hover:shadow-lg transition-all duration-300 group"
            >
              <div>
                {/* Visual Canvas with Top-Right Icon Badge (Matching 00:18 - 00:19) */}
                <div className="relative aspect-[4/3] rounded-2xl bg-neutral-900 overflow-hidden mb-5 flex items-center justify-center p-4">
                  {/* Subtle ambient light */}
                  <div
                    className="absolute inset-0 bg-gradient-to-tr from-brand-900/40 via-neutral-900 to-black"
                    aria-hidden="true"
                  />
                  <div
                    className="absolute w-28 h-28 rounded-full bg-brand-500/20 blur-xl group-hover:scale-125 transition-transform duration-500"
                    aria-hidden="true"
                  />

                  {/* 3D Illustration watermark */}
                  <Image
                    src={solution.image}
                    alt={step.name}
                    width={110}
                    height={110}
                    className="relative z-10 max-h-full w-auto object-contain opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />

                  {/* Top-Right Circular Floating Icon Badge (Matching reference video) */}
                  <div className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-white/95 backdrop-blur-md border border-neutral-200 shadow-sm flex items-center justify-center">
                    {getIcon(step.iconType)}
                  </div>

                  {/* Bottom Step Label */}
                  <div className="absolute bottom-3 left-3 z-20 font-tech text-[10px] font-bold text-white/70 uppercase tracking-widest px-2 py-0.5 rounded bg-black/40 backdrop-blur-sm">
                    PHASE // {step.step}
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
          ))}
        </div>
      </div>
    </section>
  );
}
