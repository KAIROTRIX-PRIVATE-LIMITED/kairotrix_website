'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';
import { MaskedReveal, DrawLine, revealMeta, EASE_CINEMATIC } from '@/lib/animations';

interface QuestionAnswerItem {
  question: string;
  answer: string;
}

const ABOUT_QUESTIONS: QuestionAnswerItem[] = [
  {
    question: 'What kind of company is KAIROTRIX?',
    answer:
      'KAIROTRIX is a technology solutions company that designs and builds custom software, artificial intelligence systems, workflow automation, and connected digital infrastructure. We partner with growing businesses to diagnose operational bottlenecks and engineer reliable, production-ready software tailored to their proprietary business logic.',
  },
  {
    question: 'What does KAIROTRIX build?',
    answer:
      'We engineer purpose-built software across six core areas: AI applications and autonomous agents, full-stack web applications, business process automations, modern digital flagships, analytical data systems, and system integrations. Every project delivers client-owned source code without vendor lock-in.',
  },
  {
    question: 'How does KAIROTRIX approach technology projects?',
    answer:
      'We follow a problem-first engineering approach. Before selecting languages, models, or cloud architectures, we analyze the specific operational constraint slowing the business down. Once scoped, systems are delivered through a transparent four-stage lifecycle: Understand & Scope, Design & Plan, Build & Test, and Launch & Support.',
  },
  {
    question: 'Where is KAIROTRIX based?',
    answer:
      'KAIROTRIX PRIVATE LIMITED is headquartered in Chennai, Tamil Nadu, India. We engineer and deliver software systems for businesses locally and internationally, providing direct access to the engineers building the work.',
  },
];

export function AboutOverview() {
  return (
    <section id="about-overview" className="w-full bg-transparent py-14 sm:py-20 border-b border-neutral-200/80">
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
            AT A GLANCE // CORE QUESTIONS
          </span>
          <DrawLine className="hidden sm:block w-10 sm:w-16 bg-neutral-200" delay={0.2} />
        </motion.div>

        {/* Section Title */}
        <div className="mb-8 sm:mb-12 max-w-4xl text-center lg:text-left mx-auto lg:mx-0">
          <MaskedReveal delay={0.06}>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] text-neutral-950 uppercase leading-[1.12]">
              WHAT WE ARE & HOW WE{' '}
              <span className="gradient-signature-text">
                WORK.
              </span>
            </h2>
          </MaskedReveal>
        </div>

        {/* 2x2 Question-Answer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {ABOUT_QUESTIONS.map((item, idx) => (
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

      </div>
    </section>
  );
}
