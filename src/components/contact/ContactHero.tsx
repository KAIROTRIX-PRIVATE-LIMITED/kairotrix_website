'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function ContactHero() {
  return (
    <section className="relative w-full bg-[#FAFAFC] border-b border-neutral-200/80 pt-32 sm:pt-36 lg:pt-40 pb-16 overflow-hidden">
      {/* Ambient background engineering grid */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"
        aria-hidden="true"
      />

      {/* Subtle brand radial glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-500/5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="flex flex-wrap items-center gap-3 mb-6"
        >
          <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-pulse" />
          <span className="font-tech text-xs tracking-[0.25em] font-semibold text-brand-600 uppercase">
            CONTACT // KAIROTRIX
          </span>
          <div className="h-px w-10 sm:w-16 bg-neutral-200" />
          <span className="font-mono text-xs text-neutral-500 uppercase px-2.5 py-0.5 rounded-full border border-neutral-200/80 bg-white shadow-2xs">
            RESPONSE WITHIN ONE BUSINESS DAY
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-3xl"
        >
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold uppercase tracking-[-0.03em] text-neutral-950 leading-[1.06] mb-6">
            START A{' '}
            <span className="gradient-signature-text">
              CONVERSATION.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal max-w-2xl">
            Tell us what you&apos;re looking to build, improve, or solve. Every inquiry is reviewed, and we aim to follow up within one business day.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
