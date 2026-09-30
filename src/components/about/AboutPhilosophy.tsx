'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MaskedReveal, DrawLine, revealMeta, EASE_CINEMATIC } from '@/lib/animations';

const CORE_PRINCIPLES = [
  'Problem first, technology second.',
  'Honest capability over inflated claims.',
  'Built to evolve — never locked, never finished.',
  'Quality is not optional — it is the product.',
  'Make technology understandable, not mystifying.',
];

export function AboutPhilosophy() {
  return (
    <section id="about-philosophy" className="w-full bg-transparent py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Eyebrow */}
        <motion.div
          variants={revealMeta}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="flex items-center gap-3 mb-3 sm:mb-4"
        >
          <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-pulse" />
          <span className="font-tech text-xs tracking-[0.25em] font-semibold text-brand-600 uppercase">
            OUR PHILOSOPHY // CORE VALUES
          </span>
          <DrawLine className="w-10 sm:w-16 bg-neutral-200" delay={0.2} />
        </motion.div>

        {/* Section Title with signature gradient text */}
        <div className="mb-8 sm:mb-12 max-w-4xl">
          <MaskedReveal delay={0.06}>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] text-neutral-950 uppercase leading-[1.12]">
              BUILT ON UNCOMPROMISING{' '}
              <span className="gradient-signature-text">
                PRINCIPLES.
              </span>
            </h2>
          </MaskedReveal>
        </div>

        {/* Wide Banner Card with Full-Bleed Media & Floating Core Philosophy Card */}
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, delay: 0.1, ease: EASE_CINEMATIC }}
          className="relative rounded-[2rem] overflow-hidden border border-neutral-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_32px_rgba(147,51,234,0.06)] transition-shadow duration-300 min-h-[440px] sm:min-h-[480px] flex items-center justify-end p-6 sm:p-8 lg:p-12 group"
        >
          {/* Full-Bleed Background Image */}
          <Image
            src="/assets/images/about/about-philosophy-craft.jpg"
            alt="System architecture sketchpad and engineering first principles"
            fill
            sizes="(max-width: 1200px) 100vw, 1150px"
            className="object-cover object-left sm:object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          />

          {/* Floating White Core Philosophy Card */}
          <motion.div
            initial={{ opacity: 0, x: 24, scale: 0.96 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.22, ease: EASE_CINEMATIC }}
            className="relative z-10 w-full max-w-xs sm:max-w-sm rounded-2xl bg-white/95 backdrop-blur-md p-6 sm:p-8 border border-neutral-200/80 shadow-2xl"
          >
            <div className="flex items-center justify-between gap-2 mb-5">
              <h3 className="text-lg sm:text-xl font-display font-semibold text-neutral-950 tracking-tight">
                Core Philosophy
              </h3>
              <span className="px-2 py-0.5 rounded-md bg-neutral-100 border border-neutral-200 text-[10px] font-mono font-medium text-neutral-600">
                05 PRINCIPLES
              </span>
            </div>

            <ul className="space-y-3.5">
              {CORE_PRINCIPLES.map((principle, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: 8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.28 + idx * 0.07, ease: EASE_CINEMATIC }}
                  className="flex items-start gap-3"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500 shadow-[0_0_6px_rgba(147,51,234,0.6)] shrink-0 mt-1.5" />
                  <span className="text-xs sm:text-sm font-medium text-neutral-800 leading-snug">
                    {principle}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
