'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Layers, ShieldCheck, Sparkles, Terminal, Cpu } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface TelemetryMetric {
  label: string;
  value: string;
  subtext: string;
  icon: React.ComponentType<{ className?: string }>;
}

const TELEMETRY_METRICS: TelemetryMetric[] = [
  {
    label: 'PRODUCTION BUILDS',
    value: '12',
    subtext: 'Across 6 Disciplines',
    icon: Terminal,
  },
  {
    label: 'LATENCY BENCHMARK',
    value: 'P99 < 16ms',
    subtext: 'Edge & WebSocket Streaming',
    icon: Cpu,
  },
  {
    label: 'RUNTIME SLA',
    value: '99.98%',
    subtext: 'Deterministic Execution',
    icon: ShieldCheck,
  },
  {
    label: 'SOCIAL PROOF',
    value: '0% FABRICATION',
    subtext: '100% Verifiable Systems',
    icon: Sparkles,
  },
];

export function WorkHero() {
  const prefersReduced = useReducedMotion();

  const scrollToGrid = () => {
    const el = document.getElementById('work-grid');
    if (el) {
      el.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' });
    }
  };

  return (
    <section className="relative w-full bg-neutral-0 border-b border-neutral-200/80 pt-32 sm:pt-36 lg:pt-40 pb-20 overflow-hidden">
      {/* Ambient background engineering grid */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"
        aria-hidden="true"
      />

      {/* Subtle brand radial glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-brand-500/5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold tracking-wider font-tech uppercase">
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
            04 // PROVEN IN EXECUTION
          </div>
          <div className="h-px w-12 sm:w-20 bg-neutral-200" aria-hidden="true" />
          <span className="font-tech text-xs text-neutral-600 uppercase tracking-widest hidden sm:inline">
            CAPABILITY & EVIDENCE REPOSITORY
          </span>
        </motion.div>

        {/* Headline + Narrative Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8"
          >
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-neutral-900 uppercase leading-[1.05]">
              WHAT WE <span className="gradient-signature-text">BUILD.</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-neutral-600 leading-relaxed font-normal max-w-3xl">
              We don&apos;t just claim engineering capability — we demonstrate it. Every system in this repository is built against uncompromising production standards: deterministic multi-agent execution, sub-16ms latencies, and verifiable operational impact.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-6"
          >
            <div className="text-left lg:text-right">
              <span className="font-tech text-xs uppercase tracking-widest text-neutral-600 block mb-1">
                SYSTEM VERIFICATION
              </span>
              <span className="text-xs font-mono text-neutral-600 bg-neutral-100 border border-neutral-200/80 px-3 py-1.5 rounded-lg inline-block">
                LIVE ARTIFACTS • CODE & SPECS
              </span>
            </div>

            <button
              onClick={scrollToGrid}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-neutral-900 text-white hover:bg-neutral-800 font-tech font-semibold text-xs uppercase tracking-wider transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer group"
            >
              <span>Explore Specimens</span>
              <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </button>
          </motion.div>
        </div>

        {/* Telemetry Summary Ribbon (4 Columns) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 sm:p-6 rounded-2xl bg-neutral-50/80 border border-neutral-200/80 backdrop-blur-sm"
        >
          {TELEMETRY_METRICS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-4 rounded-xl bg-neutral-0 border border-neutral-200/60 shadow-xs flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-tech text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-neutral-600">
                    {item.label}
                  </span>
                  <div className="w-6 h-6 rounded-lg bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold font-tech text-neutral-900 tracking-tight">
                    {item.value}
                  </div>
                  <div className="text-[11px] font-tech text-neutral-600 uppercase tracking-wider mt-0.5">
                    {item.subtext}
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
