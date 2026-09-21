'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import type { SolutionDetail } from '@/data/solutionsData';

interface SolutionContactCTAProps {
  solution: SolutionDetail;
}

export function SolutionContactCTA({ solution }: SolutionContactCTAProps) {
  return (
    <section className="relative w-full bg-transparent py-16 sm:py-24 overflow-hidden border-b border-neutral-200">
      {/* Background Decorative Rings on Canvas with Brand Tint */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
        <div className="w-[850px] h-[450px] rounded-full border border-brand-500/20" />
        <div className="absolute w-[1100px] h-[600px] rounded-full border border-neutral-200/70" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[2.25rem] bg-gradient-to-br from-neutral-950 via-[#1A0E38] to-[#120824] p-8 sm:p-12 lg:p-14 overflow-hidden shadow-[0_20px_50px_rgba(15,15,23,0.3)] border border-brand-500/20"
        >
          {/* Ambient Purple Glow inside Banner */}
          <div
            className="absolute -top-24 -right-24 w-[450px] h-[450px] bg-brand-500/20 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-24 -left-24 w-[350px] h-[350px] bg-indigo-500/15 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          {/* Subtle Curving Radar Accent Lines inside Banner */}
          <div className="absolute inset-0 pointer-events-none opacity-25 overflow-hidden">
            <svg
              className="absolute -top-24 -left-24 w-[700px] h-[700px] text-white/50"
              viewBox="0 0 700 700"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="350" cy="350" r="200" strokeWidth="1.5" />
              <circle cx="350" cy="350" r="300" strokeWidth="1.5" strokeDasharray="6 6" />
              <circle cx="350" cy="350" r="380" strokeWidth="1.5" />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 lg:gap-12">
            {/* Left Column: Heading, Narrative, and Actions */}
            <div className="max-w-xl">
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-5">
                <span className="flex h-2 w-2 rounded-full bg-brand-400 animate-pulse" />
                <span className="font-tech text-xs tracking-[0.25em] font-semibold text-brand-300 uppercase">
                  {solution.number} // INITIATE COLLABORATION
                </span>
                <div className="h-px w-10 sm:w-16 bg-neutral-800" />
              </div>

              {/* Main Display Headline */}
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] text-white uppercase leading-[1.12] mb-4">
                READY TO ARCHITECT{' '}
                <span className="gradient-signature-text">
                  {solution.title.toUpperCase()}?
                </span>
              </h2>

              {/* Narrative */}
              <p className="text-sm sm:text-base text-neutral-300 font-sans leading-relaxed mb-8 max-w-lg">
                {solution.ctaDescription}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href={`/contact?service=${solution.slug}`}
                  className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-white hover:bg-neutral-100 text-neutral-950 font-medium text-sm transition-all duration-200 shadow-md hover:shadow-brand cursor-pointer group"
                >
                  <span>Get in touch</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
                </Link>

                <Link
                  href="/solutions"
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-medium text-sm transition-all duration-200 cursor-pointer"
                >
                  <span>Explore All 6 Disciplines</span>
                  <ArrowUpRight className="w-4 h-4 ml-1.5 text-neutral-400" />
                </Link>
              </div>
            </div>

            {/* Right Column: Floating White Card */}
            <div className="w-full sm:w-auto shrink-0 flex justify-center lg:justify-end">
              <div className="w-full sm:w-[320px] rounded-2xl bg-white p-6 shadow-2xl border border-white/90 flex flex-col">
                {/* Available for Project Pill */}
                <div className="self-start inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-[11px] font-mono uppercase tracking-wider text-emerald-700 font-semibold mb-5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>AVAILABLE FOR PROJECT</span>
                </div>

                {/* Avatar Stack */}
                <div className="flex items-center mb-4">
                  <div className="w-9 h-9 rounded-full overflow-hidden relative border-2 border-white shrink-0 shadow-2xs">
                    <Image
                      src="/assets/images/about/team-ethan.jpg"
                      alt="Ethan Cole"
                      fill
                      sizes="36px"
                      className="object-cover"
                    />
                  </div>
                  <div className="w-5 h-5 rounded-full bg-neutral-200 text-neutral-600 flex items-center justify-center text-[10px] font-bold -ml-1.5 border-2 border-white shrink-0 z-10">
                    +
                  </div>
                  <div className="w-9 h-9 rounded-full bg-neutral-950 text-white text-xs font-semibold flex items-center justify-center -ml-1.5 border-2 border-white shrink-0 z-20 shadow-2xs">
                    You
                  </div>
                </div>

                {/* Call Info */}
                <h3 className="font-display font-semibold text-lg text-neutral-950 mb-1 leading-snug">
                  Quick 15-minute call.
                </h3>
                <p className="text-xs text-neutral-500 font-normal mb-6">
                  Discuss architecture, feasibility & scope.
                </p>

                {/* Book a free call button */}
                <Link
                  href={`/contact?service=${solution.slug}`}
                  className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-brand-600 via-purple-600 to-indigo-600 hover:brightness-110 text-white font-medium text-sm transition-all text-center shadow-[0_4px_16px_rgba(147,51,234,0.3)] hover:shadow-brand flex items-center justify-center cursor-pointer"
                >
                  <span>Book a free call</span>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
