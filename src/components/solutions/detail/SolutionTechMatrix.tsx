'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Cpu, CheckCircle } from 'lucide-react';
import type { SolutionDetail } from '@/data/solutionsData';

interface SolutionTechMatrixProps {
  solution: SolutionDetail;
}

export function SolutionTechMatrix({ solution }: SolutionTechMatrixProps) {
  return (
    <section id="stack" className="w-full bg-neutral-0 py-20 lg:py-28 border-b border-neutral-200 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold tracking-wider font-tech uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-brand-500" />
            04 // SYSTEM ARCHITECTURE
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 leading-tight">
            <span>TECHNOLOGY </span>
            <span className="gradient-signature-text">STACK</span>
            <span>.</span>
          </h2>
          <p className="mt-3 text-base sm:text-lg text-neutral-600 leading-relaxed">
            We operate strictly with production-grade, battle-tested technologies selected for deterministic reliability, sub-millisecond execution, and total enterprise security.
          </p>
        </div>

        {/* Tech Stack Tiers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {solution.techStack.map((tier, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className="p-6 sm:p-8 rounded-2xl bg-neutral-50/70 border border-neutral-200 hover:border-brand-300 transition-all duration-300"
            >
              {/* Tier Header */}
              <div className="flex items-center justify-between gap-3 pb-4 mb-6 border-b border-neutral-200/80">
                <div className="flex items-center gap-2.5">
                  <Cpu className="w-4 h-4 text-brand-600" />
                  <h3 className="text-base sm:text-lg font-bold text-neutral-900 tracking-tight">
                    {tier.category}
                  </h3>
                </div>
                <span className="font-tech text-[11px] font-semibold text-neutral-400">
                  TIER // 0{idx + 1}
                </span>
              </div>

              {/* Technologies in Tier */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {tier.items.map((item, tIdx) => (
                  <div
                    key={tIdx}
                    className="p-3.5 rounded-xl bg-white border border-neutral-200/90 hover:border-brand-400 hover:shadow-sm transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-1.5 font-bold text-sm text-neutral-900 group-hover:text-brand-600 transition-colors mb-1">
                      <Terminal className="w-3.5 h-3.5 text-neutral-400 group-hover:text-brand-500 transition-colors" />
                      <span>{item.name}</span>
                    </div>
                    <p className="text-xs text-neutral-500 leading-snug pl-5">
                      {item.role}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
