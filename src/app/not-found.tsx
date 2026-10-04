'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, ArrowRight, Layers, FolderGit2 } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { usePreloader } from '@/context/PreloaderContext';
import {
  MaskedReveal,
  DrawLine,
  revealMeta,
  revealBody,
  EASE_CINEMATIC,
} from '@/lib/animations';

export default function NotFound() {
  const prefersReduced = useReducedMotion();
  const { isLoaded } = usePreloader();

  return (
    <main className="relative w-full min-h-[85vh] bg-[#FAFAFC] flex items-center justify-center pt-32 sm:pt-36 lg:pt-40 pb-20 overflow-hidden">
      {/* Ambient background engineering grid */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        
        {/* Animated Kiro Mascot Illustration */}
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, scale: 0.92, y: 24 }}
          animate={isLoaded ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.92, y: 24 }}
          transition={{ duration: 0.6, ease: EASE_CINEMATIC }}
          className="relative mb-6"
        >
          <motion.div
            animate={
              prefersReduced
                ? {}
                : {
                    y: [-6, 6, -6],
                  }
            }
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Image
              src="/assets/images/404/404.png"
              alt="404 - Kiro took a wrong turn"
              width={400}
              height={440}
              priority
              sizes="(max-width: 640px) 100vw, 360px"
              className="w-auto h-auto max-w-[260px] sm:max-w-[320px] md:max-w-[360px] object-contain drop-shadow-2xl select-none"
            />
          </motion.div>
        </motion.div>

        {/* Eyebrow badge */}
        <motion.div
          variants={prefersReduced ? undefined : revealMeta}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse shadow-[0_0_8px_rgba(147,51,234,0.6)]" />
          <span className="font-tech text-xs tracking-[0.25em] font-semibold text-brand-600 uppercase">
            404 // ROUTE EXCEPTION
          </span>
          <DrawLine className="hidden sm:block h-px w-12 sm:w-16 bg-neutral-200" origin="left" />
        </motion.div>

        {/* Exact User Headline with Masked Reveal */}
        <MaskedReveal delay={0.25} className="mb-3">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-neutral-950">
            Looks like Kiro took a wrong turn!
          </h1>
        </MaskedReveal>

        {/* Exact User Subtext */}
        <motion.p
          variants={prefersReduced ? undefined : revealBody}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.35 }}
          className="text-base sm:text-sm text-neutral-600 leading-relaxed font-normal max-w-md mb-8"
        >
          The page you are looking for doesn&apos;t exist or has moved.
        </motion.p>

        {/* Primary and Quick Link Actions */}
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45, ease: EASE_CINEMATIC }}
          className="flex flex-col sm:flex-row items-center gap-3.5 mb-10"
        >
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-brand-600 hover:scale-105 text-white font-tech font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer group"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/solutions"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-tech font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            <Layers className="w-4 h-4 text-brand-600" />
            <span>Explore Solutions</span>
          </Link>

          <Link
            href="/work"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-tech font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            <FolderGit2 className="w-4 h-4 text-brand-600" />
            <span>View Work</span>
          </Link>
        </motion.div>

        {/* Support Note */}
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="pt-6 border-t border-neutral-200/80 flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 text-xs text-neutral-500 font-tech text-center"
        >
          <span>Need help finding something specific?</span>
          <Link
            href="/contact"
            className="font-semibold text-brand-600 hover:text-brand-700 underline underline-offset-4"
          >
            Contact our engineering team
          </Link>
        </motion.div>

      </div>
    </main>
  );
}

