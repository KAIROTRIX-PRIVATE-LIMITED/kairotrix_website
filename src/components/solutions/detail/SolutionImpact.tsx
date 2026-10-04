'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShieldCheck, TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-react';
import type { SolutionDetail } from '@/data/solutionsData';
import { MaskedReveal, DrawLine, revealMeta, revealBody, cardFromLeft, cardFromRight, EASE_CINEMATIC } from '@/lib/animations';

interface SolutionImpactProps {
  solution: SolutionDetail;
}

const SOLUTION_DEFINITIONS: Record<string, string> = {
  'ai-intelligent-systems':
    'AI & Intelligent Systems at KAIROTRIX covers software that uses artificial intelligence to assist, automate, retrieve, analyze, or act within real business workflows. This includes custom AI applications, autonomous agents with human oversight, contextual knowledge retrieval (RAG), and model adaptation. It is appropriate when manual information processing limits operational speed, enabling teams to automate complex tasks and query organizational knowledge with high accuracy.',
  'software-product-engineering':
    'Software & Product Engineering at KAIROTRIX covers purpose-built software, web applications, and digital products engineered around your proprietary business logic. This includes bespoke operational tools, multi-tenant web platforms, and modular design systems. It is appropriate when off-the-shelf software or spreadsheets no longer fit your workflow, providing reliable, client-owned systems built to evolve as your business grows.',
  'automation-digital-operations':
    'Automation & Digital Operations at KAIROTRIX covers automated workflows, background execution engines, and document processing systems that eliminate repetitive manual handoffs. This includes cross-tool process automations, queued task orchestration, and operational health monitoring. It is appropriate when teams spend excessive hours on routine data transfers, reducing administrative overhead and operational errors.',
  'digital-transformation':
    'Digital Transformation at KAIROTRIX covers modernizing outdated digital touchpoints, legacy websites, and paper- or spreadsheet-driven processes into structured web systems. This includes high-performance corporate platforms, internal workflow digitization, and UI/UX redesigns. It is appropriate when manual record-keeping or clunky interfaces slow operations down, creating clean digital systems that improve efficiency and user engagement.',
  'data-business-intelligence':
    'Data & Business Intelligence at KAIROTRIX covers centralizing fragmented business data, engineering analytical storage, and creating reporting dashboards and forecasting tools. This includes data pipeline modeling, executive KPI scorecards, predictive models, and plain-language database queries. It is appropriate when leadership lacks timely visibility into operations, transforming scattered numbers into clear, reliable intelligence.',
  'technology-integration':
    'Technology Integration at KAIROTRIX covers connecting isolated software platforms, third-party APIs, and commercial records into a coordinated, synchronized network. This includes custom API connectors, bi-directional CRM and ERP synchronization, payment workflows, and cross-system data pipelines. It is appropriate when data re-entry across disconnected tools causes delays, ensuring operational records remain accurate across platforms.',
};

export function SolutionImpact({ solution }: SolutionImpactProps) {
  const { editorialSplit } = solution;
  const answerFirstDefinition = SOLUTION_DEFINITIONS[solution.slug] || editorialSplit.lead;

  return (
    <section id="system-focus" className="w-full bg-[#FAFAFC] py-20 lg:py-28 border-b border-neutral-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ─── EDITORIAL 3-COLUMN SPREAD ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
          {/* Left Column: Visual Artwork Card with Highlight */}
          <div className="lg:col-span-5 max-w-md mx-auto lg:max-w-none w-full">
            <motion.div
              variants={cardFromLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, ease: EASE_CINEMATIC }}
              className="relative min-h-[460px] sm:min-h-[520px] rounded-3xl bg-gradient-to-b from-white via-brand-50/25 to-neutral-50/70 border border-neutral-200/90 p-6 sm:p-7 flex flex-col justify-between overflow-hidden group shadow-lg shadow-brand-500/5"
            >
              {/* Subtle architectural grid pattern */}
              <div 
                className="absolute inset-0 bg-[linear-gradient(to_right,#00000007_1px,transparent_1px),linear-gradient(to_bottom,#00000007_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" 
                aria-hidden="true" 
              />
              {/* Ambient radial violet illumination behind 3D render */}
              <div 
                className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-500/15 via-brand-500/4 to-transparent blur-2xl pointer-events-none" 
                aria-hidden="true" 
              />

              <div className="relative z-10 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-neutral-200/80 text-[11px] font-tech text-brand-700 font-semibold uppercase tracking-wider shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
                  SYSTEM FOCUS
                </span>
                <span className="text-[10px] font-tech text-neutral-400 uppercase tracking-widest">
                  SPECS 01
                </span>
              </div>

              {/* Centered Visual - Prominent Studio Scale */}
              <div className="relative flex-1 w-full my-3 min-h-[300px] sm:min-h-[350px] flex items-center justify-center">
                <Image
                  src={solution.systemFocusImage || solution.image}
                  alt={`${solution.title} system focus`}
                  fill
                  className="object-contain transform group-hover:scale-108 transition-transform duration-700 ease-out drop-shadow-[0_20px_40px_rgba(147,51,234,0.22)]"
                  sizes="(max-width: 1024px) 100vw, 540px"
                  priority
                />
              </div>

              {/* Bottom Highlight Card */}
              <div className="relative z-10 p-4 sm:p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-neutral-200 shadow-md shadow-neutral-900/5">
                <div className="text-xl sm:text-2xl font-bold font-tech text-neutral-950 tracking-tight">
                  {editorialSplit.editorialHighlight.lead}
                </div>
                <div className="text-xs sm:text-sm text-neutral-600 font-medium leading-relaxed mt-1">
                  {editorialSplit.editorialHighlight.detail}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Center/Right: Editorial Headline & Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              variants={revealMeta}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              className="flex items-center justify-center lg:justify-start gap-3"
            >
              <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-pulse" />
              <span className="font-tech text-xs tracking-[0.25em] font-semibold text-brand-600 uppercase">
                {editorialSplit.badge}
              </span>
              <DrawLine className="hidden sm:block w-10 sm:w-16 bg-neutral-200" delay={0.2} />
            </motion.div>

            <div className="text-center lg:text-left">
              <MaskedReveal delay={0.06}>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] text-neutral-950 leading-[1.12]">
                  {editorialSplit.headline}
                </h2>
              </MaskedReveal>
            </div>

            {/* Answer-First Solution Overview */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.12, ease: EASE_CINEMATIC }}
              className="p-6 sm:p-7 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs"
            >
              <div className="flex items-center gap-2 text-brand-600 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                <span className="text-[11px] font-tech font-semibold uppercase tracking-wider text-brand-700">
                  Solution Overview
                </span>
              </div>
              <h3 className="font-display text-base sm:text-lg font-bold text-neutral-950 mb-2 tracking-tight">
                What is {solution.title}?
              </h3>
              <p className="text-sm sm:text-base text-neutral-700 leading-relaxed font-normal">
                {answerFirstDefinition}
              </p>
            </motion.div>

            {/* System Focus Cards Grid */}
            <div
              className={`grid grid-cols-1 ${
                editorialSplit.focusCards && editorialSplit.focusCards.length === 3
                  ? 'sm:grid-cols-3 gap-4'
                  : 'sm:grid-cols-2 gap-5'
              } pt-4`}
            >
              {editorialSplit.focusCards && editorialSplit.focusCards.length > 0 ? (
                editorialSplit.focusCards.map((fc, idx) => (
                  <motion.div
                    key={idx}
                    variants={idx % 2 === 0 ? cardFromLeft : cardFromRight}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, delay: 0.2 + idx * 0.05, ease: EASE_CINEMATIC }}
                    className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-2xs hover:border-brand-400/80 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2 text-brand-600 text-xs font-tech font-bold tracking-wider uppercase mb-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-500" />
                        <span>{fc.tag || `FOCUS 0${idx + 1}`}</span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-neutral-900 tracking-tight uppercase mb-1">
                        {fc.title}
                      </h3>
                      {fc.subtitle && (
                        <div className="text-xs text-brand-600 font-medium mb-2.5">
                          {fc.subtitle}
                        </div>
                      )}
                      <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                        {fc.description}
                      </p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <>
                  <motion.div
                    variants={cardFromLeft}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, delay: 0.2, ease: EASE_CINEMATIC }}
                    className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200"
                  >
                    <div className="flex items-center gap-2 text-amber-700 text-xs font-tech font-semibold tracking-wider uppercase mb-2">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                      <span>Operational Challenge</span>
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                      {editorialSplit.problemSolved}
                    </p>
                  </motion.div>

                  <motion.div
                    variants={cardFromRight}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, delay: 0.25, ease: EASE_CINEMATIC }}
                    className="p-6 rounded-2xl bg-brand-50/50 border border-brand-200"
                  >
                    <div className="flex items-center gap-2 text-brand-700 text-xs font-tech font-semibold tracking-wider uppercase mb-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-600" />
                      <span>Engineered Solution</span>
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                      {editorialSplit.strategicAdvantage}
                    </p>
                  </motion.div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
