'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MaskedReveal, DrawLine, revealMeta, revealBody, EASE_CINEMATIC } from '@/lib/animations';
import { usePreloader } from '@/context/PreloaderContext';

export function AboutHero() {
  const { isLoaded } = usePreloader();
  return (
    <section className="relative w-full bg-transparent pt-32 sm:pt-36 lg:pt-44 pb-16 sm:pb-20 overflow-hidden">
      {/* Concentric Circular Radar Lines in Background with Brand Tint */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ duration: 1.2, ease: EASE_CINEMATIC }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1400px] h-[700px] pointer-events-none"
      >
        <svg
          viewBox="0 0 1400 700"
          fill="none"
          className="w-full h-full"
          aria-hidden="true"
        >
          <circle cx="700" cy="0" r="180" stroke="rgba(147, 51, 234, 0.25)" strokeWidth="1.2" />
          <circle cx="700" cy="0" r="300" stroke="rgba(147, 51, 234, 0.15)" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="700" cy="0" r="440" stroke="#E8E8EF" strokeWidth="1" />
          <circle cx="700" cy="0" r="600" stroke="#E8E8EF" strokeWidth="1" />
          <circle cx="700" cy="0" r="780" stroke="#E8E8EF" strokeWidth="1" />
          <circle cx="700" cy="0" r="980" stroke="#E8E8EF" strokeWidth="1" />
        </svg>
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Centered Eyebrow */}
        <motion.div
          variants={revealMeta}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-4 text-center"
        >
          <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-pulse" />
          <span className="font-tech text-xs tracking-[0.25em] font-semibold text-brand-600 uppercase">
            ABOUT KAIROTRIX // PROBLEM-FIRST TECHNOLOGY
          </span>
          <DrawLine className="hidden sm:block w-10 sm:w-16 bg-neutral-200" delay={0.2} />
        </motion.div>

        {/* Centered Display Title */}
        <div className="text-center mb-8 sm:mb-16">
          <MaskedReveal delay={0.06}>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold uppercase tracking-[-0.03em] text-neutral-950 leading-[1.06]">
              WHO WE{' '}
              <span className="gradient-signature-text">
                ARE.
              </span>
            </h1>
          </MaskedReveal>
        </div>

        {/* Agnos-Style Main Split Card */}
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.98 }}
          animate={isLoaded ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 28, scale: 0.98 }}
          transition={{ duration: 0.65, delay: 0.16, ease: EASE_CINEMATIC }}
          className="relative rounded-2xl sm:rounded-[2rem] bg-white border border-neutral-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_32px_rgba(147,51,234,0.06)] transition-shadow duration-300 p-5 sm:p-8 lg:p-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 xl:col-span-7 flex flex-col justify-between text-center lg:text-left">
              <div>
                <motion.h2
                  variants={revealBody}
                  initial="hidden"
                  animate={isLoaded ? "visible" : "hidden"}
                  transition={{ delay: 0.22 }}
                  className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-[-0.02em] text-neutral-950 leading-snug mb-4 sm:mb-5 text-center lg:text-left"
                >
                  Technology that moves ideas into real-world solutions.
                </motion.h2>
                
                <motion.p
                  variants={revealBody}
                  initial="hidden"
                  animate={isLoaded ? "visible" : "hidden"}
                  transition={{ delay: 0.28 }}
                  className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal mb-8 max-w-xl text-center lg:text-left mx-auto lg:mx-0"
                >
                  KAIROTRIX is a technology and innovation company founded on a single conviction: real business problems come first, technology comes second. We identify the friction slowing your business down—then design and build the custom software, AI systems, or automated workflows required to solve it, with client ownership of the custom code we build and a clear handover process.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{ duration: 0.45, delay: 0.34, ease: EASE_CINEMATIC }}
                className="flex justify-center lg:justify-start w-full sm:w-auto"
              >
                <Link
                  href="/contact?source=about"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-neutral-950 hover:bg-brand-600 text-white font-medium text-sm transition-all duration-200 shadow-md hover:shadow-brand cursor-pointer text-center"
                >
                  Start a Conversation
                </Link>
              </motion.div>
            </div>

            {/* Right Media Column */}
            <div className="lg:col-span-6 xl:col-span-5">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.26, ease: EASE_CINEMATIC }}
                className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-neutral-100 border border-neutral-200/70 shadow-2xs group"
              >
                <Image
                  src="/assets/images/about/about-hero-workbench.jpg"
                  alt="KAIROTRIX Engineering Workstation"
                  fill
                  sizes="(max-width: 1024px) 100vw, 450px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  priority
                />
              </motion.div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
