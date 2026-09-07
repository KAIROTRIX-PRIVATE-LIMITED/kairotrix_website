'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Terminal, Cpu, Sparkles } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { SolutionDetail } from '@/data/solutionsData';

interface SolutionContactCTAProps {
  solution: SolutionDetail;
}

export function SolutionContactCTA({ solution }: SolutionContactCTAProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative w-full py-20 sm:py-28 bg-[#FAFAFC] overflow-hidden border-b border-neutral-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Obsidian Destination Card */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl bg-gradient-to-b from-[#0F0F17] to-[#08080C] border border-neutral-800 p-8 sm:p-12 lg:p-16 text-white overflow-hidden shadow-2xl"
        >
          {/* Ambient Purple & Violet Lighting */}
          <div
            className="absolute -top-24 -right-24 w-96 h-96 bg-brand-500/25 blur-[120px] pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-600/15 blur-[120px] pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-3xl">
            
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-block w-2 h-2 rounded-full bg-brand-400 animate-pulse" />
              <span className="font-tech text-xs tracking-[0.25em] font-semibold text-brand-400 uppercase">
                {solution.number} // INITIATE COLLABORATION
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.15]">
              READY TO ARCHITECT{' '}
              <span className="gradient-signature-text">
                {solution.title.toUpperCase()}?
              </span>
            </h2>

            {/* Narrative */}
            <p className="mt-4 text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl font-normal">
              {solution.ctaDescription}
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href={`/contact?service=${solution.slug}`}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold tracking-wide transition-all duration-200 shadow-lg shadow-brand-600/30 group active:scale-[0.98]"
              >
                <span>Schedule Architecture Consultation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-150" />
              </Link>

              <Link
                href="/solutions"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white text-sm font-semibold tracking-wide transition-colors"
              >
                <span>Explore All 6 Disciplines</span>
              </Link>
            </div>

            {/* Engineering Commitments Strip */}
            <div className="mt-12 pt-8 border-t border-neutral-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-tech text-neutral-400">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-brand-400 shrink-0" />
                <span>Senior Engineers, Not Sales</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-400 shrink-0" />
                <span>100% Code & IP Ownership</span>
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-brand-400 shrink-0" />
                <span>Deterministic SLAs & Milestones</span>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
