'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Compass,
  Code2,
  LineChart,
  CheckCircle2,
  GitBranch,
} from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

// ─────────────────────────────────────────────────────────────────────────────
// Phase 3.4 — Solutions Engineering Lifecycle
//
// Communicates HOW A CLIENT PROJECT MOVES FROM PROBLEM TO LAUNCH.
// This is intentionally distinct from the homepage 6-stage engineering
// approach (which communicates how KAIROTRIX thinks about engineering).
//
// Key rules applied:
// - No fixed week/timeline numbers (projects vary too widely)
// - No absolute ownership claims (use "clear ownership and handover")
// - Plain-English descriptions accessible to business owners
// - Technical terms only where they add useful information
// ─────────────────────────────────────────────────────────────────────────────

interface LifecyclePhase {
  number: string;
  stepName: string;
  title: string;
  description: string;
  deliverables: string[];
  outcome: string;
  icon: React.ComponentType<{ className?: string }>;
}

const PHASES: LifecyclePhase[] = [
  {
    number: '01',
    stepName: 'Understand',
    title: 'Understand & Scope',
    description:
      'We study how your business works, identify what needs to improve, and determine the right technology approach before development begins.',
    deliverables: [
      'Problem and requirements definition',
      'Recommended direction',
      'Project scope and delivery plan',
    ],
    outcome: 'Clear problem definition and project scope',
    icon: Search,
  },
  {
    number: '02',
    stepName: 'Design',
    title: 'Design & Plan',
    description:
      'We design the system architecture, data flows, security boundaries, and integration points. Everything is documented and agreed before development begins.',
    deliverables: [
      'System architecture and technical plan',
      'Security and data handling approach',
      'Integration specifications',
    ],
    outcome: 'Agreed technical plan and project structure',
    icon: Compass,
  },
  {
    number: '03',
    stepName: 'Build',
    title: 'Build & Test',
    description:
      'We build the system in structured stages, test it throughout development, and connect it with your existing technology where needed.',
    deliverables: [
      'Working software and source code',
      'Testing and quality checks',
      'Review or staging environment where appropriate',
    ],
    outcome: 'Working software ready for launch',
    icon: Code2,
  },
  {
    number: '04',
    stepName: 'Launch',
    title: 'Launch & Support',
    description:
      'We launch the system, monitor how it performs, address issues, and continue improving it as your business and requirements evolve.',
    deliverables: [
      'Production launch',
      'Monitoring and error tracking where applicable',
      'Documentation and handover',
      'Ongoing support and improvements',
    ],
    outcome: 'Live system with monitoring and ongoing care',
    icon: LineChart,
  },
];

export function SolutionsLifecycle() {
  const [activeStage, setActiveStage] = useState<number>(0);
  const [isAutoCycling, setIsAutoCycling] = useState<boolean>(true);
  const shouldReduceMotion = useReducedMotion();

  // Gentle auto-cycle through stages unless hovered or clicked
  useEffect(() => {
    if (!isAutoCycling || shouldReduceMotion) return;
    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % PHASES.length);
    }, 3600);
    return () => clearInterval(interval);
  }, [isAutoCycling, shouldReduceMotion]);

  return (
    <section className="relative w-full py-20 sm:py-24 lg:py-28 bg-[#FAFAFC] border-b border-neutral-200/80 overflow-hidden">

      {/* Ambient Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-purple-500/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-3 sm:mb-4">
            <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-pulse" />
            <span className="font-tech text-xs tracking-[0.25em] font-semibold text-brand-600 uppercase">
              04 // HOW WE BUILD
            </span>
            <div className="h-px w-10 sm:w-16 bg-neutral-200" />
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] text-neutral-950 uppercase leading-[1.12]">
            FROM PROBLEM TO WORKING{' '}
            <span className="gradient-signature-text">
              SYSTEM.
            </span>
          </h2>

          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-neutral-600 font-normal leading-relaxed">
            Our projects follow a clear path: understand the problem, design the right approach, build and test the system, then launch and improve it over time.
          </p>

          {/* Phase Badge */}
          <div className="mt-5 inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white border border-neutral-200/90 shadow-2xs text-xs font-mono">
            <span className="font-bold text-purple-700">4 PHASES</span>
            <span className="text-neutral-300">•</span>
            <span className="text-neutral-500">
              Phase {PHASES[activeStage].number} — {PHASES[activeStage].stepName}
            </span>
          </div>
        </div>

        {/* ── TOP PIPELINE PROGRESS TRACKER (Desktop) ── */}
        <div className="hidden lg:block mb-10">
          <div className="relative">

            {/* Horizontal Track Line */}
            <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-[2px] bg-neutral-200/80 rounded-full overflow-hidden">
              {!shouldReduceMotion && (
                <motion.div
                  className="absolute top-0 bottom-0 w-48 bg-gradient-to-r from-transparent via-purple-600 to-transparent"
                  animate={{ x: ['-100%', '600%'] }}
                  transition={{
                    repeat: Infinity,
                    duration: 3.5,
                    ease: 'easeInOut',
                  }}
                />
              )}
            </div>

            {/* 4 Interactive Process Steps */}
            <div className="relative grid grid-cols-4 gap-6">
              {PHASES.map((phase, idx) => {
                const isActive = idx === activeStage;
                return (
                  <button
                    key={phase.number}
                    type="button"
                    onClick={() => setActiveStage(idx)}
                    className="flex items-center gap-3 bg-[#FAFAFC] pr-4 focus:outline-hidden text-left cursor-pointer group"
                  >
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-200 shrink-0 ${
                        isActive
                          ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30 scale-105'
                          : 'bg-white text-neutral-600 border border-neutral-300 group-hover:border-purple-400 group-hover:text-purple-700'
                      }`}
                    >
                      {phase.number}
                    </div>

                    <div className="min-w-0">
                      <div
                        className={`text-xs font-bold tracking-tight truncate transition-colors ${
                          isActive
                            ? 'text-purple-700'
                            : 'text-neutral-700 group-hover:text-neutral-900'
                        }`}
                      >
                        {phase.stepName}
                      </div>
                      <div className="text-[10px] font-mono text-neutral-400 truncate">
                        Phase {phase.number}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

          </div>
        </div>

        {/* ── THE 4 PROCESS CARDS ── */}
        <div
          className="grid grid-cols-1 lg:grid-cols-4 gap-6"
          onMouseEnter={() => setIsAutoCycling(false)}
          onMouseLeave={() => setIsAutoCycling(true)}
        >
          {PHASES.map((phase, idx) => {
            const Icon = phase.icon;
            const isActive = idx === activeStage;

            return (
              <motion.div
                key={phase.number}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setActiveStage(idx)}
                className={`rounded-2xl bg-white border transition-all duration-200 p-6 flex flex-col justify-between cursor-pointer relative overflow-hidden ${
                  isActive
                    ? 'border-purple-400/90 shadow-lg shadow-purple-500/5 ring-1 ring-purple-500/20'
                    : 'border-neutral-200/90 shadow-2xs hover:shadow-md hover:border-neutral-300'
                }`}
              >
                {/* Active Top Accent Strip */}
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-brand-500 to-purple-600" />
                )}

                <div>
                  {/* Card Header: Phase Number */}
                  <div className="flex items-center justify-between gap-2 pb-4 border-b border-neutral-100">
                    <span
                      className={`font-mono text-xs font-bold px-2.5 py-0.5 rounded-md border transition-colors ${
                        isActive
                          ? 'bg-purple-600 text-white border-purple-600 shadow-2xs'
                          : 'bg-purple-50 text-purple-700 border-purple-100'
                      }`}
                    >
                      PHASE {phase.number}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="mt-5 flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 ${
                        isActive
                          ? 'bg-purple-600 text-white shadow-xs shadow-purple-600/30'
                          : 'bg-neutral-900 text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-purple-300" />
                    </div>
                    <h3 className="font-bold text-base text-neutral-900 tracking-tight leading-snug">
                      {phase.title}
                    </h3>
                  </div>

                  {/* Narrative Description */}
                  <p className="mt-3.5 text-xs sm:text-[13px] text-neutral-600 leading-relaxed font-normal">
                    {phase.description}
                  </p>

                  {/* Deliverables List */}
                  <div className="mt-6 pt-4 border-t border-neutral-100">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 font-semibold mb-2.5">
                      What comes out of this phase:
                    </div>
                    <ul className="space-y-2" role="list">
                      {phase.deliverables.map((item, dIdx) => (
                        <li key={dIdx} className="text-xs text-neutral-700 flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                          <span className="font-medium leading-tight">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Outcome Transition Badge */}
                <div
                  className={`mt-6 pt-3 border-t text-[11px] font-mono flex items-center justify-between gap-2 transition-colors ${
                    isActive
                      ? 'border-purple-100 text-purple-800'
                      : 'border-neutral-100 text-neutral-500'
                  }`}
                >
                  <span className="font-bold text-neutral-400 uppercase text-[10px]">
                    Outcome:
                  </span>
                  <span className="font-semibold truncate text-right text-neutral-800">
                    {phase.outcome}
                  </span>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* ── Bottom Ownership Bar ── */}
        <div className="mt-10 sm:mt-12 p-4 sm:p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3 text-neutral-700">
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center shrink-0 border border-purple-100">
              <GitBranch className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <span className="font-bold text-neutral-900 block">Your code, your repository</span>
              <span className="text-neutral-500 font-normal">
                Project source code is maintained in a repository you can access, with clear ownership and handover of the work we create for you.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 font-mono text-[11px] text-purple-700 font-semibold bg-purple-50 px-3 py-1.5 rounded-lg border border-purple-100">
            <span>CODE OWNERSHIP & HANDOVER</span>
          </div>
        </div>

      </div>
    </section>
  );
}
