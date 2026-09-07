'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Compass,
  Code2,
  LineChart,
  CheckCircle2,
  ArrowRight,
  Zap,
  Activity,
} from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface LifecyclePhase {
  number: string;
  stepName: string;
  title: string;
  timeline: string;
  description: string;
  deliverables: string[];
  outcome: string;
  icon: React.ComponentType<{ className?: string }>;
}

const PHASES: LifecyclePhase[] = [
  {
    number: '01',
    stepName: 'Diagnosis',
    title: 'Diagnosis & Scoping',
    timeline: 'Week 1',
    description:
      'We audit your existing tech stack, manual bottlenecks, and database schemas before writing code. We verify whether AI, custom software, or automation is the true answer.',
    deliverables: [
      'System Architecture Audit',
      'ROI Feasibility Report',
      'Technology Selection Matrix',
    ],
    outcome: 'Verified Problem-Solution Blueprint',
    icon: Search,
  },
  {
    number: '02',
    stepName: 'Architecture',
    title: 'Architecture & Guardrails',
    timeline: 'Weeks 2–3',
    description:
      'We design end-to-end dataflows, schema contracts, security boundaries, and strict SLA benchmarks. Every API endpoint, webhook, and vector pipeline is mapped deterministically.',
    deliverables: [
      'Technical Specification Blueprint',
      'Security & Compliance Guardrails',
      'API Schema Contracts',
    ],
    outcome: 'Deterministic Specification & Contracts',
    icon: Compass,
  },
  {
    number: '03',
    stepName: 'Engineering',
    title: 'Engineering & Integration',
    timeline: 'Weeks 4–8',
    description:
      'Agile sprints with clean TypeScript, deterministic algorithms, and continuous integration. We integrate with your existing CRM, ERP, and payment databases with zero downtime.',
    deliverables: [
      'Full Source Code Repository',
      'Automated Test Suites',
      'Production Staging Environment',
    ],
    outcome: 'Production-Ready Codebase & Staging',
    icon: Code2,
  },
  {
    number: '04',
    stepName: 'Evolution',
    title: 'Deployment & Evolution',
    timeline: 'Production SLA',
    description:
      'Production deployment with live telemetry, error tracking, token budget alerts, and automated performance health checks. Built to evolve as your business scales.',
    deliverables: [
      'Telemetry & Health Dashboards',
      'Zero-Downtime CI/CD Pipeline',
      'Ongoing Architectural Support',
    ],
    outcome: 'Continuous Telemetry & SLA Health',
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
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-block w-2 h-2 rounded-full bg-purple-600 animate-pulse" />
            <span className="font-tech text-xs tracking-[0.25em] font-semibold text-brand-600 uppercase">
              DELIVERY LIFECYCLE
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 leading-tight">
            HOW WE BUILD{' '}
            <span className="gradient-signature-text">
              SOLUTIONS.
            </span>
          </h2>

          <p className="mt-3 text-base sm:text-lg text-neutral-600 font-normal leading-relaxed">
            Engineering is not guesswork — it is a disciplined, deterministic delivery science. Each phase produces verifiable artifacts that seamlessly transition into the next, guaranteeing zero ambiguity and full code ownership.
          </p>

          {/* Telemetry Status Indicator */}
          <div className="mt-5 inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white border border-neutral-200/90 shadow-2xs text-xs font-mono">
            <Activity className="w-3.5 h-3.5 text-purple-600 animate-pulse" />
            <span className="text-neutral-500">Pipeline Status:</span>
            <span className="font-bold text-purple-700">
              Phase {PHASES[activeStage].number} // {PHASES[activeStage].title}
            </span>
          </div>
        </div>

        {/* ── TOP PIPELINE PROGRESS TRACKER (CLEAN, SPACIOUS, ZERO OVERLAP) ── */}
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
                        {phase.timeline}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

          </div>
        </div>

        {/* ── THE 4 CLEAN, SPACIOUS PROCESS CARDS ── */}
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
                  {/* Card Header: Phase & Timeline */}
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

                    <span className="font-mono text-[11px] text-neutral-400 font-medium">
                      {phase.timeline}
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
                      Key Deliverables:
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

        {/* Bottom SLA Guarantee Bar */}
        <div className="mt-10 sm:mt-12 p-4 sm:p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3 text-neutral-700">
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center shrink-0 border border-purple-100">
              <Zap className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <span className="font-bold text-neutral-900 block">Deterministic Science SLA:</span>
              <span className="text-neutral-500 font-normal">
                Every deliverable artifact is version-controlled in your private repository with 100% full code and IP ownership.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 font-mono text-[11px] text-purple-700 font-semibold bg-purple-50 px-3 py-1.5 rounded-lg border border-purple-100">
            <span>Zero Guesswork Guarantee</span>
          </div>
        </div>

      </div>
    </section>
  );
}


