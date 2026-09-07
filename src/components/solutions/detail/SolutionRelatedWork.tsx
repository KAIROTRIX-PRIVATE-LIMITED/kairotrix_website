'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import type { SolutionDetail } from '@/data/solutionsData';

interface SolutionRelatedWorkProps {
  solution: SolutionDetail;
}

export function SolutionRelatedWork({ solution }: SolutionRelatedWorkProps) {
  return (
    <section id="work" className="w-full bg-neutral-0 py-24 lg:py-32 border-b border-neutral-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Section Header (Matching 00:06 in video) */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold tracking-wider font-tech uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-brand-500" />
            05 // PROVEN EXECUTION
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 uppercase">
            FEATURED PROJECTS
          </h2>
          <p className="mt-3 text-xs sm:text-sm font-tech font-semibold tracking-widest text-neutral-500 uppercase">
            A CURATED SELECTION OF OUR RECENT PRODUCTION BUILDS AND TECHNICAL DEMOS
          </p>
        </div>

        {/* ─── 3-COLUMN PORTRAIT PROJECT CARDS (Matching 00:07 - 00:09 in video) ─── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {solution.featuredProjects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="group flex flex-col justify-between"
            >
              <Link href={project.href} className="block">
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

                  {/* Top Metric Tag */}
                  <div className="absolute top-4 left-4 z-20 font-tech text-xs font-bold text-white px-2.5 py-1 rounded bg-black/60 backdrop-blur-md border border-white/10">
                    {project.metric}
                  </div>
                </div>

                {/* Card Bottom Meta (Title + Subtitle + Circular Arrow Button) */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-neutral-900 group-hover:text-brand-600 transition-colors uppercase tracking-tight">
                      {project.title}
                    </h3>
                    <div className="mt-1 text-xs font-tech text-neutral-500 uppercase tracking-wider">
                      {project.category}
                    </div>
                    <div className="text-[11px] font-tech text-neutral-400 uppercase tracking-widest mt-0.5">
                      {project.year}
                    </div>
                  </div>

                  {/* Circular Arrow Button (Matching 00:07 - 00:09 in video) */}
                  <div className="shrink-0 w-9 h-9 rounded-full border border-neutral-300 group-hover:border-neutral-900 group-hover:bg-neutral-900 text-neutral-700 group-hover:text-white flex items-center justify-center transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View More Projects Action (Matching 00:09 in video) */}
        <div className="text-center">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 text-neutral-900 font-tech font-semibold text-xs uppercase tracking-wider transition-colors shadow-sm"
          >
            <span>View More Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
