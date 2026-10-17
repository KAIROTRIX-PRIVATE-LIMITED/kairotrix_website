'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Laptop,
  CheckCircle2,
  Award,
  Users,
} from 'lucide-react';

interface InternshipHeroProps {
  onApplyClick?: () => void;
}

export function InternshipHero({ onApplyClick }: InternshipHeroProps) {
  const scrollToForm = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onApplyClick) {
      onApplyClick();
    } else {
      const el = document.getElementById('apply-form-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 overflow-hidden bg-white text-neutral-900 border-b border-neutral-200/80">
      {/* Subtle Ambient Radial Brand Glow Behind Hero */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[360px] bg-brand-500/10 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Eyebrow Pill */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200/80 shadow-2xs mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-brand-500" />
            <span className="font-mono text-xs uppercase tracking-widest text-brand-700 font-bold">
              Engineering Fellowship & Internships
            </span>
          </motion.div>

          {/* Primary Punchy Display Headline (Strictly mandated) */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-neutral-950 leading-[1.08]"
          >
            Build skills by building{' '}
            <span className="bg-gradient-to-r from-brand-600 via-purple-600 to-brand-700 bg-clip-text text-transparent">
              real technology.
            </span>
          </motion.h1>

          {/* One-line Grounded Intro (min 16px body text) */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-6 text-base sm:text-lg md:text-xl text-neutral-700 max-w-2xl mx-auto leading-relaxed"
          >
            Work on production codebases, AI pipelines, and automation systems alongside active engineers.
          </motion.p>

          {/* Single Focused Action CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 flex justify-center"
          >
            <a
              href="#apply-form-section"
              onClick={scrollToForm}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-base font-semibold text-white bg-brand-600 hover:bg-brand-700 shadow-brand transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              <span>Apply now</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          

        </div>
      </div>
    </section>
  );
}
