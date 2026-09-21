'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const VISION_TAGS = ['Accessible Intelligence', 'Technology You Own', 'Built to Evolve'];
const MISSION_TAGS = ['Problem-First', 'Built for Reliability', 'Client Ownership'];

export function AboutVisionMission() {
  return (
    <section id="about-vision-mission" className="w-full bg-transparent py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-3 mb-3 sm:mb-4"
        >
          <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-pulse shadow-[0_0_8px_rgba(147,51,234,0.6)]" />
          <span className="font-tech text-xs tracking-[0.25em] font-semibold text-brand-600 uppercase">
            OUR PURPOSE // VISION & MISSION
          </span>
          <div className="h-px w-10 sm:w-16 bg-neutral-200" />
        </motion.div>

        {/* Section Title with signature gradient text */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] text-neutral-950 uppercase leading-[1.12] mb-8 sm:mb-12 max-w-4xl"
        >
          PURPOSE ROOTED IN{' '}
          <span className="gradient-signature-text">
            EXECUTION.
          </span>
        </motion.h2>

        {/* Compact Agnos-Style Master Split Card with Styled Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative rounded-[2rem] bg-white border border-neutral-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_32px_rgba(147,51,234,0.06)] transition-shadow duration-300 p-6 sm:p-8 lg:p-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Left Content Column: Vision & Mission Duo */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              
              {/* 01 // OUR VISION */}
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-neutral-100 text-brand-700 border border-brand-200/50">
                      01
                    </span>
                    <span className="font-tech text-xs tracking-[0.2em] font-semibold text-brand-600 uppercase">
                      OUR VISION
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 border border-neutral-200/70 text-[10px] font-mono font-medium text-neutral-600 uppercase tracking-wider">
                    WHERE WE&apos;RE GOING
                  </span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-neutral-950 mb-2 leading-snug">
                  Technology as an accessible bridge, not a barrier.
                </h3>

                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal mb-3.5 max-w-xl">
                  KAIROTRIX envisions a world where technology is never an expensive barrier, an inflated buzzword, or a rigid vendor trap, but an accessible bridge enabling every business to operate with sovereign intelligence.
                </p>

                <div className="flex flex-wrap items-center gap-2">
                  {VISION_TAGS.map((tag, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-50 border border-neutral-200/70 text-[11px] font-mono text-neutral-700 font-medium"
                    >
                      <span className="w-1 h-1 rounded-full bg-brand-500" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Subtle Hairline Divider */}
              <div className="h-px w-full bg-neutral-100 my-6 sm:my-7" />

              {/* 02 // OUR MISSION */}
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-neutral-100 text-brand-700 border border-brand-200/50">
                      02
                    </span>
                    <span className="font-tech text-xs tracking-[0.2em] font-semibold text-brand-600 uppercase">
                      OUR MISSION
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 border border-neutral-200/70 text-[10px] font-mono font-medium text-neutral-600 uppercase tracking-wider">
                    HOW WE GET THERE
                  </span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-neutral-950 mb-2 leading-snug">
                  Solving real problems with precision engineering.
                </h3>

                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal mb-3.5 max-w-xl">
                  To identify what technology can genuinely improve, build it with precision, and make it accessible to businesses that need it — without overpromising, overcomplicating, or pushing pre-packaged hype.
                </p>

                <div className="flex flex-wrap items-center gap-2">
                  {MISSION_TAGS.map((tag, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-50 border border-neutral-200/70 text-[11px] font-mono text-neutral-700 font-medium"
                    >
                      <span className="w-1 h-1 rounded-full bg-brand-500" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Media Column: Styled Architectural Technology Image */}
            <div className="lg:col-span-5 h-full">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/11] lg:aspect-auto lg:h-[440px] bg-neutral-100 border border-neutral-200/80 shadow-md group">
                <Image
                  src="/assets/images/about/vision-mission.jpg"
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Subtle Inner Gradient Vignette */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-neutral-950/75 via-transparent to-neutral-950/20 pointer-events-none"
                  aria-hidden="true"
                />

                {/* Top-Right Floating Status Pill */}
                <div className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full bg-neutral-950/80 backdrop-blur-md border border-white/20 text-[10px] font-mono uppercase tracking-wider font-semibold text-white shadow-md">
                  CORE ARCHITECTURE
                </div>

                {/* Bottom Floating Glass Card */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-white/95 backdrop-blur-md border border-neutral-200/80 shadow-lg flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[10px] font-mono text-brand-700 font-semibold uppercase tracking-wider mb-0.5">
                      OUR COMMITMENT
                    </div>
                    <div className="text-xs font-semibold text-neutral-900 leading-snug">
                      Technology you can own, understand, and evolve.
                    </div>
                  </div>
                  <div className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.7)] shrink-0" />
                </div>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
