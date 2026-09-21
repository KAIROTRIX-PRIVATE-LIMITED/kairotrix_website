'use client';

import React from 'react';
import { motion } from 'framer-motion';

const STANDARDS_DATA = [
  {
    title: 'Full Source & IP Ownership',
    description: 'You own 100% of all code, schemas, and system architecture. Zero proprietary lock-in, licensing traps, or hidden dependencies.',
    value: '100%',
  },
  {
    title: 'Core Solution Disciplines',
    description: 'Specialized engineering across AI Systems, Custom Software, Automation, Digital Transformation, Data & BI, and Integration.',
    value: '06',
  },
  {
    title: 'Availability Target',
    description: 'Engineered for enterprise fault-tolerance, resilient fallback routing, and mathematical latency budgets from day one.',
    value: '99.9%',
  },
];

export function AboutStats() {
  return (
    <section className="w-full bg-transparent py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-3 mb-3 sm:mb-4"
        >
          <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-pulse" />
          <span className="font-tech text-xs tracking-[0.25em] font-semibold text-brand-600 uppercase">
            FOUNDATIONS // PRODUCTION STANDARDS
          </span>
          <div className="h-px w-10 sm:w-16 bg-neutral-200" />
        </motion.div>

        {/* Section Heading with signature gradient */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] text-neutral-950 uppercase leading-[1.12] mb-8 sm:mb-12"
        >
          ENGINEERED WITHOUT{' '}
          <span className="gradient-signature-text">
            COMPROMISE.
          </span>
        </motion.h2>

        {/* 3 Standards Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {STANDARDS_DATA.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: 0.08 * (idx + 1) }}
              className="rounded-[2rem] bg-white border border-neutral-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:border-brand-500/40 hover:shadow-[0_8px_32px_rgba(147,51,234,0.08)] transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between min-h-[260px] sm:min-h-[290px]"
            >
              {/* Top Text Content */}
              <div>
                <h3 className="text-lg sm:text-xl font-display font-semibold text-neutral-950 mb-2.5 tracking-tight">
                  {stat.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                  {stat.description}
                </p>
              </div>

              {/* Bottom Stat Value & Accent Dots */}
              <div className="pt-6 border-t border-dashed border-neutral-200 flex items-end justify-between gap-4">
                <div className="text-4xl sm:text-5xl font-display font-medium text-neutral-950 tracking-tight">
                  {stat.value}
                </div>

                {/* Accent Indicator Dots with Brand Purple Pulse */}
                <div className="flex items-center gap-1.5 pb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500 shadow-[0_0_6px_rgba(147,51,234,0.6)]" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
