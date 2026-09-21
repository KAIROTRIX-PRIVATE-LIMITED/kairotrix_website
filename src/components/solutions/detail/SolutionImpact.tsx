'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShieldCheck, TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-react';
import type { SolutionDetail } from '@/data/solutionsData';

interface SolutionImpactProps {
  solution: SolutionDetail;
}

export function SolutionImpact({ solution }: SolutionImpactProps) {
  const { editorialSplit } = solution;

  return (
    <section id="impact" className="w-full bg-[#FAFAFC] py-20 lg:py-28 border-b border-neutral-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ─── EDITORIAL 3-COLUMN SPREAD (Matching 00:04 - 00:05) ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
          {/* Left Column: Visual Artwork Card with Stat Tag */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5 }}
              className="relative aspect-[4/5] rounded-3xl bg-neutral-100 border border-neutral-200 p-6 flex flex-col justify-between overflow-hidden group shadow-sm"
            >
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-[11px] font-tech text-brand-600 font-semibold uppercase tracking-wider">
                  EXECUTION SLA
                </span>
                <span className="w-2 h-2 rounded-full bg-brand-500" />
              </div>

              {/* Centered Visual */}
              <div className="relative my-auto w-full h-44 flex items-center justify-center">
                <Image
                  src={solution.image}
                  alt={solution.title}
                  width={220}
                  height={220}
                  className="max-h-full w-auto object-contain transform group-hover:scale-105 transition-transform duration-500 drop-shadow-lg"
                />
              </div>

              {/* Bottom Stat Card */}
              <div className="relative z-10 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-neutral-200">
                <div className="text-3xl font-black text-neutral-900 tracking-tight font-sans">
                  {editorialSplit.statNumber}
                </div>
                <div className="text-xs text-neutral-600 font-medium leading-snug mt-1">
                  {editorialSplit.statLabel}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Center/Right: Editorial Headline & Narrative */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center gap-3">
              <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-pulse" />
              <span className="font-tech text-xs tracking-[0.25em] font-semibold text-brand-600 uppercase">
                {editorialSplit.badge}
              </span>
              <div className="h-px w-10 sm:w-16 bg-neutral-200" />
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] text-neutral-950 leading-[1.12]">
              {editorialSplit.headline}
            </h2>

            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
              {editorialSplit.lead}
            </p>

            {/* Problem Solved vs. Strategic Advantage Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4">
              <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200">
                <div className="flex items-center gap-2 text-amber-700 text-xs font-tech font-semibold tracking-wider uppercase mb-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  <span>The Legacy Friction</span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  {editorialSplit.problemSolved}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-brand-50/50 border border-brand-200">
                <div className="flex items-center gap-2 text-brand-700 text-xs font-tech font-semibold tracking-wider uppercase mb-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-600" />
                  <span>The Deterministic Outcome</span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                  {editorialSplit.strategicAdvantage}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
