'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface InsightsHeroProps {
  totalArticles?: number;
}

export function InsightsHero({ totalArticles = 8 }: InsightsHeroProps) {
  const formattedCount = totalArticles < 10 ? `0${totalArticles}` : `${totalArticles}`;

  return (
    <section className="relative w-full bg-[#FAFAFC] pt-32 sm:pt-36 lg:pt-40 pb-12 sm:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Eyebrow & Status Tag */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap items-center gap-3 mb-6"
        >
          <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-pulse" />
          <span className="font-tech text-xs tracking-[0.25em] font-semibold text-brand-600 uppercase">
            INSIGHTS // ARTICLES &amp; ENGINEERING
          </span>
          <div className="h-px w-10 sm:w-16 bg-neutral-200" />

          <span className="font-mono text-xs tracking-wider uppercase font-semibold text-neutral-900">
            [KAIROTRIX // TECHNICAL JOURNAL]
          </span>

          <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-neutral-100 border border-neutral-200/80 font-mono text-[10px] uppercase tracking-wider text-neutral-600">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>TECHNICAL PERSPECTIVES</span>
          </div>
        </motion.div>

        {/* Monumental Headline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="max-w-5xl"
        >
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold uppercase tracking-[-0.03em] text-neutral-950 leading-[1.06] mb-6">
            THINKING, LEARNING &amp;{' '}
            <span className="gradient-signature-text">
              BUILDING IN PUBLIC.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 font-sans leading-relaxed font-normal max-w-3xl">
            We document how we approach technical challenges—from architecture and system design to implementation decisions, experiments, performance, and lessons learned while building.
          </p>
        </motion.div>

        {/* Content Categories Strip (Replaces Vanity Stats) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.16 }}
          className="mt-12 sm:mt-16 pt-8 border-t border-neutral-200/80 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8"
        >
          <div>
            <div className="font-display font-black text-2xl sm:text-3xl text-neutral-950">
              {formattedCount}
            </div>
            <div className="font-mono text-[11px] uppercase tracking-wider text-neutral-500 mt-1">
              Articles &amp; Deep Dives
            </div>
          </div>

          <div>
            <div className="font-display font-black text-2xl sm:text-3xl text-neutral-950">
              Blueprints
            </div>
            <div className="font-mono text-[11px] uppercase tracking-wider text-neutral-500 mt-1">
              Systems &amp; Workflows
            </div>
          </div>

          <div>
            <div className="font-display font-black text-2xl sm:text-3xl text-neutral-950">
              Breakdowns
            </div>
            <div className="font-mono text-[11px] uppercase tracking-wider text-neutral-500 mt-1">
              Decisions &amp; Architecture
            </div>
          </div>

          <div>
            <div className="font-display font-black text-2xl sm:text-3xl text-brand-600">
              Build Notes
            </div>
            <div className="font-mono text-[11px] uppercase tracking-wider text-neutral-500 mt-1">
              Lessons &amp; Experiments
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
