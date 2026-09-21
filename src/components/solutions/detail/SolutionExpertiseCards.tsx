'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, ShieldCheck, Cpu } from 'lucide-react';
import type { SolutionDetail } from '@/data/solutionsData';

interface SolutionExpertiseCardsProps {
  solution: SolutionDetail;
}

export function SolutionExpertiseCards({ solution }: SolutionExpertiseCardsProps) {
  return (
    <section id="expertise" className="w-full bg-[#FAFAFC] py-16 sm:py-20 lg:py-24 border-b border-neutral-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Centered Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="flex items-center justify-center gap-3 mb-3 sm:mb-4">
            <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-pulse" />
            <span className="font-tech text-xs tracking-[0.25em] font-semibold text-brand-600 uppercase">
              03 // TECHNICAL PROOF
            </span>
            <div className="h-px w-10 sm:w-16 bg-neutral-200" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] text-neutral-950 uppercase leading-[1.12]">
            ENGINEERING <span className="gradient-signature-text">DEPTH.</span>
          </h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto font-normal leading-relaxed">
            Representative capabilities and production standards behind our systems.
          </p>
        </div>

        {/* ─── TECHNICAL PROOF CARDS (COMPACT OBSIDIAN — NO BUSY TEXTURES) ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {solution.expertiseCards.map((card, idx) => (
            <motion.a
              key={idx}
              href={card.href}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className="relative rounded-2xl bg-[#0B0B0F] border border-neutral-800 hover:border-brand-500/40 p-6 sm:p-7 flex flex-col justify-between overflow-hidden group shadow-md transition-all duration-300"
            >
              {/* Top Row: Category tag + Arrow */}
              <div className="relative z-10 flex items-center justify-between mb-4">
                <span className="font-tech text-[11px] font-bold text-brand-400 uppercase tracking-wider">
                  {card.category}
                </span>
                <div className="w-8 h-8 rounded-lg bg-white/10 group-hover:bg-brand-600 text-white flex items-center justify-center transition-colors shrink-0">
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>

              {/* Bottom: Stat & Big Bold Title */}
              <div className="relative z-10 space-y-1.5 mt-auto">
                <div className="text-2xl sm:text-3xl font-black text-white font-tech tracking-tight">
                  {card.stat}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug group-hover:text-brand-300 transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed font-normal pt-1">
                  {card.description}
                </p>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}
