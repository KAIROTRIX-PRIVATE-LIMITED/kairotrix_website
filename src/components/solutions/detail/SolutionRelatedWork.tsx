'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import type { SolutionDetail } from '@/data/solutionsData';
import type { WorkSpecimen } from '@/data/workData';
import { cn } from '@/lib/utils';
import { MaskedReveal, DrawLine, revealMeta, revealBody, cardFromLeft, cardFromCenter, cardFromRight, EASE_CINEMATIC } from '@/lib/animations';

interface SolutionRelatedWorkProps {
  solution: SolutionDetail;
  projects?: WorkSpecimen[];
}

export function SolutionRelatedWork({ solution, projects }: SolutionRelatedWorkProps) {
  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <section id="work" className="w-full bg-[#FAFAFC] py-24 lg:py-32 border-b border-neutral-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            variants={revealMeta}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-3 sm:mb-4"
          >
            <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-pulse" />
            <span className="font-tech text-xs tracking-[0.25em] font-semibold text-brand-600 uppercase">
              RELATED WORK
            </span>
            <DrawLine className="w-10 sm:w-16 bg-neutral-200" delay={0.2} />
          </motion.div>
          <MaskedReveal delay={0.06}>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] text-neutral-950 uppercase leading-[1.12]">
              FEATURED <span className="gradient-signature-text">BUILDS.</span>
            </h2>
          </MaskedReveal>
          <motion.p
            variants={revealBody}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.16 }}
            className="mt-3 sm:mt-4 text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto font-normal leading-relaxed"
          >
            Selected production builds, experiments, and technical demonstrations in this solution area.
          </motion.p>
        </div>

        {/* ─── DYNAMIC WORK SPECIMEN CARDS ─── */}
        <div
          className={cn(
            'grid gap-8 mb-16',
            projects.length === 1 && 'grid-cols-1 max-w-md mx-auto',
            projects.length === 2 && 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto',
            projects.length >= 3 && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          )}
        >
          {projects.map((project, idx) => {
            const cardVariant =
              idx === 0
                ? cardFromLeft
                : idx === 2
                ? cardFromRight
                : cardFromCenter;

            return (
              <motion.div
                key={project.id || idx}
                variants={cardVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: EASE_CINEMATIC }}
                className="group flex flex-col justify-between"
              >
              <Link
                href={`/work?area=${solution.slug}#selected-work`}
                className="block h-full flex flex-col justify-between"
              >
                {/* Portrait Visual Image Frame */}
                <div className="relative aspect-[3/4] rounded-3xl bg-gradient-to-b from-neutral-900 to-black border border-neutral-800 p-6 flex items-center justify-center overflow-hidden mb-5 shadow-sm group-hover:shadow-xl group-hover:border-brand-500/50 transition-all duration-500">
                  <div
                    className="absolute inset-0 bg-gradient-to-tr from-brand-900/30 to-transparent"
                    aria-hidden="true"
                  />
                  <div
                    className="absolute w-40 h-40 rounded-full bg-brand-500/20 blur-2xl group-hover:scale-125 transition-transform duration-700"
                    aria-hidden="true"
                  />

                  {/* 3D Artwork */}
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={220}
                    height={220}
                    className="relative z-10 max-h-full w-auto object-contain drop-shadow-2xl transform group-hover:scale-105 group-hover:-translate-y-1 transition-all duration-500"
                  />

                  {/* Top Specimen Badge */}
                  <div className="absolute top-4 left-4 z-20 font-tech text-xs font-bold text-white px-2.5 py-1 rounded bg-black/60 backdrop-blur-md border border-white/10 tracking-wider uppercase">
                    {project.badge}
                  </div>
                </div>

                {/* Card Bottom Meta */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-neutral-900 group-hover:text-brand-600 transition-colors uppercase tracking-tight">
                      {project.title}
                    </h3>
                    <div className="mt-1 text-xs font-tech text-neutral-500 uppercase tracking-wider">
                      {project.disciplineName}
                    </div>
                    <p className="mt-1.5 text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                      {project.headline || project.summary}
                    </p>
                    <div className="text-[11px] font-tech text-neutral-400 uppercase tracking-widest mt-1">
                      {project.year}
                    </div>
                  </div>

                  {/* Circular Arrow Button */}
                  <div className="shrink-0 w-9 h-9 rounded-full border border-neutral-300 group-hover:border-neutral-900 group-hover:bg-neutral-900 text-neutral-700 group-hover:text-white flex items-center justify-center transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

        {/* View More Projects Action */}
        <div className="text-center">
          <Link
            href={`/work?area=${solution.slug}#selected-work`}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 text-neutral-900 font-tech font-semibold text-xs uppercase tracking-wider transition-colors shadow-sm"
          >
            <span>Explore All {solution.title} Builds</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

