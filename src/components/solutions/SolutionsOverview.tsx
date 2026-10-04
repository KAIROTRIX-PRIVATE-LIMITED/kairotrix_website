'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HelpCircle, ArrowUpRight, Cpu, Layers, Workflow, RefreshCw, BarChart3, Network } from 'lucide-react';
import { MaskedReveal, DrawLine, revealMeta, EASE_CINEMATIC } from '@/lib/animations';

interface QuestionAnswerItem {
  question: string;
  answer: string;
}

interface SolutionSummaryItem {
  number: string;
  title: string;
  slug: string;
  summary: string;
  icon: React.ElementType;
}

const SOLUTIONS_QUESTIONS: QuestionAnswerItem[] = [
  {
    question: 'What does KAIROTRIX build?',
    answer:
      'KAIROTRIX builds custom software, AI systems, workflow automations, web applications, data intelligence platforms, and system integrations. We design and engineer production systems to solve practical business problems, replacing manual processes and fragmented tools with software tailored to client operations.',
  },
  {
    question: 'How do you decide which solution a business needs?',
    answer:
      'We determine the technical approach through diagnostic problem discovery. Rather than prescribing a predetermined tool or vendor product, we examine where operational friction, manual data entry, or communication delays occur. We then identify whether software engineering, automation, AI assistance, or system integration is the most direct solution.',
  },
  {
    question: 'What types of systems do you work on?',
    answer:
      'We build internal business systems, customer-facing web applications, workflow automation engines, intelligent knowledge retrieval systems (RAG), executive analytics cockpits, and multi-platform synchronization middleware across commercial software tools.',
  },
  {
    question: 'How does a project usually begin?',
    answer:
      'Engagements begin with a scoping conversation to review your current workflow, system constraints, and objectives. We deliver an architectural plan outlining scope, milestones, and deliverable specifications before engineering starts.',
  },
];

const SIX_SOLUTIONS_SUMMARY: SolutionSummaryItem[] = [
  {
    number: '01',
    title: 'AI & Intelligent Systems',
    slug: 'ai-intelligent-systems',
    summary:
      'Custom AI applications, autonomous task agents with human oversight, RAG knowledge systems, and machine learning adaptation.',
    icon: Cpu,
  },
  {
    number: '02',
    title: 'Software & Product Engineering',
    slug: 'software-product-engineering',
    summary:
      'Purpose-built custom software, responsive web applications, full-lifecycle digital product development, and modular design systems.',
    icon: Layers,
  },
  {
    number: '03',
    title: 'Automation & Digital Operations',
    slug: 'automation-digital-operations',
    summary:
      'Business process automation, background task orchestration queues, document processing, and operational health monitoring.',
    icon: Workflow,
  },
  {
    number: '04',
    title: 'Digital Transformation',
    slug: 'digital-transformation',
    summary:
      'High-performance digital flagships, paper and spreadsheet process digitization, and interface usability modernizations.',
    icon: RefreshCw,
  },
  {
    number: '05',
    title: 'Data & Business Intelligence',
    slug: 'data-business-intelligence',
    summary:
      'Centralized analytical data storage, executive KPI reporting scorecards, predictive forecasting, and natural-language queries.',
    icon: BarChart3,
  },
  {
    number: '06',
    title: 'Technology Integration',
    slug: 'technology-integration',
    summary:
      'Custom API connectors, CRM and ERP synchronization, payment gateway integrations, and cross-system data pipelines.',
    icon: Network,
  },
];

export function SolutionsOverview() {
  return (
    <section id="solutions-overview" className="w-full bg-[#FAFAFC] py-16 sm:py-24 border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Eyebrow */}
        <motion.div
          variants={revealMeta}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3 mb-3 sm:mb-4 text-center lg:text-left"
        >
          <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-pulse shadow-[0_0_8px_rgba(147,51,234,0.6)]" />
          <span className="font-tech text-xs tracking-[0.25em] font-semibold text-brand-600 uppercase">
            HOW WE DELIVER // CORE QUESTIONS
          </span>
          <DrawLine className="hidden sm:block w-10 sm:w-16 bg-neutral-200" delay={0.2} />
        </motion.div>

        {/* Section Title */}
        <div className="mb-10 sm:mb-14 max-w-4xl text-center lg:text-left mx-auto lg:mx-0">
          <MaskedReveal delay={0.06}>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] text-neutral-950 uppercase leading-[1.12]">
              HOW WE DELIVER{' '}
              <span className="gradient-signature-text">
                SOLUTIONS.
              </span>
            </h2>
          </MaskedReveal>
        </div>

        {/* 2x2 Question-Answer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-16 sm:mb-20">
          {SOLUTIONS_QUESTIONS.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.1 + idx * 0.08, ease: EASE_CINEMATIC }}
              className="p-6 sm:p-8 rounded-2xl bg-white border border-neutral-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:border-brand-300 hover:shadow-[0_8px_24px_rgba(147,51,234,0.06)] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 text-brand-600 mb-3">
                  <HelpCircle className="w-4 h-4 text-brand-500 shrink-0" />
                  <span className="text-[11px] font-tech font-semibold uppercase tracking-wider text-brand-700">
                    Question 0{idx + 1}
                  </span>
                </div>
                <h3 className="font-display text-lg sm:text-xl font-bold text-neutral-950 mb-3 tracking-tight">
                  {item.question}
                </h3>
                <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
                  {item.answer}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Compact Summary of All Six Solutions */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 pb-4 border-b border-neutral-200">
            <div>
              <span className="font-tech text-xs tracking-[0.2em] font-semibold text-brand-600 uppercase block mb-1">
                DIRECTORY SUMMARY
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-neutral-950 tracking-tight">
                Six Core Solution Areas
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-neutral-500 font-mono">
              6 CORE SOLUTIONS // ZERO VENDOR LOCK-IN
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {SIX_SOLUTIONS_SUMMARY.map((sol, idx) => {
              const IconComponent = sol.icon;
              return (
                <Link
                  key={idx}
                  href={`/solutions/${sol.slug}`}
                  className="group p-5 sm:p-6 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs hover:border-brand-400 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-lg bg-brand-50 border border-brand-200/70 text-brand-600 flex items-center justify-center">
                          <IconComponent className="w-3.5 h-3.5" />
                        </span>
                        <span className="text-xs font-mono font-semibold text-neutral-400">
                          {sol.number}
                        </span>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-brand-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                    <h4 className="font-display text-base font-bold text-neutral-950 group-hover:text-brand-600 transition-colors mb-2">
                      {sol.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                      {sol.summary}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center text-xs font-tech font-semibold text-brand-600 group-hover:underline">
                    <span>Explore Solution</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
