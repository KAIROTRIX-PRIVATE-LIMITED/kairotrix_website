'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Compass } from 'lucide-react';
import { SOLUTIONS_DATA, type SolutionDetail } from '@/data/solutionsData';
import { cardFromLeft, cardFromCenter, cardFromRight, EASE_CINEMATIC } from '@/lib/animations';

interface SolutionNavigationCTAProps {
  solution: SolutionDetail;
}

export function SolutionNavigationCTA({ solution }: SolutionNavigationCTAProps) {
  const prevSolution = SOLUTIONS_DATA[solution.prevSlug];
  const nextSolution = SOLUTIONS_DATA[solution.nextSlug];

  return (
    <div className="w-full bg-[#FAFAFC]">
      {/* ─── PREVIOUS / NEXT DISCIPLINE NAVIGATOR (Matching 00:24) ─── */}
      <section className="w-full border-b border-neutral-200 py-12 bg-neutral-50/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Previous Solution */}
            {prevSolution ? (
              <motion.div
                variants={cardFromLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, ease: EASE_CINEMATIC }}
              >
                <Link
                  href={`/solutions/${prevSolution.slug}`}
                  className="group p-5 rounded-2xl bg-white border border-neutral-200 hover:border-brand-400 hover:shadow-sm transition-all duration-300 flex items-center gap-4 block"
                >
                  <div className="w-10 h-10 rounded-xl bg-neutral-100 group-hover:bg-brand-50 text-neutral-600 group-hover:text-brand-600 flex items-center justify-center shrink-0 transition-colors">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-tech text-neutral-400 font-semibold uppercase tracking-wider">
                      PREVIOUS SOLUTION
                    </div>
                    <div className="text-sm font-bold text-neutral-900 group-hover:text-brand-600 transition-colors truncate">
                      {prevSolution.title}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ) : (
              <div />
            )}

            {/* Central Solutions Hub Link */}
            <motion.div
              variants={cardFromCenter}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.1, ease: EASE_CINEMATIC }}
              className="text-center"
            >
              <Link
                href="/solutions"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-neutral-100 border border-neutral-200 text-xs font-semibold font-tech text-neutral-700 uppercase tracking-wider transition-colors shadow-sm"
              >
                <Compass className="w-4 h-4 text-brand-600" />
                <span>All Solutions</span>
              </Link>
            </motion.div>

            {/* Next Solution */}
            {nextSolution ? (
              <motion.div
                variants={cardFromRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: 0.15, ease: EASE_CINEMATIC }}
              >
                <Link
                  href={`/solutions/${nextSolution.slug}`}
                  className="group p-5 rounded-2xl bg-white border border-neutral-200 hover:border-brand-400 hover:shadow-sm transition-all duration-300 flex items-center justify-between gap-4 text-right block"
                >
                  <div className="min-w-0">
                    <div className="text-[10px] font-tech text-neutral-400 font-semibold uppercase tracking-wider">
                      NEXT SOLUTION
                    </div>
                    <div className="text-sm font-bold text-neutral-900 group-hover:text-brand-600 transition-colors truncate">
                      {nextSolution.title}
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-neutral-100 group-hover:bg-brand-50 text-neutral-600 group-hover:text-brand-600 flex items-center justify-center shrink-0 transition-colors">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
