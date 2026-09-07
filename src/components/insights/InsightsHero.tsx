'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, BookOpen, ShieldCheck, Sparkles, Terminal, FileText, Cpu, Activity } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface TelemetryMetric {
  label: string;
  value: string;
  subtext: string;
  icon: React.ComponentType<{ className?: string }>;
}

const TELEMETRY_METRICS: TelemetryMetric[] = [
  {
    label: 'KNOWLEDGE SPECIMENS',
    value: '8',
    subtext: 'Across 4 Pillars',
    icon: Terminal,
  },
  {
    label: 'EMPIRICAL RIGOR',
    value: '100%',
    subtext: 'Reproducible Benchmarks',
    icon: ShieldCheck,
  },
  {
    label: 'MARKETING NOISE',
    value: '0%',
    subtext: 'Zero Generic Buzzwords',
    icon: Sparkles,
  },
  {
    label: 'SYSTEM BLUEPRINTS',
    value: 'PRODUCTION',
    subtext: 'Battle-Tested Schematics',
    icon: Cpu,
  },
];

export function InsightsHero() {
  const prefersReduced = useReducedMotion();

  const scrollToGallery = () => {
    const el = document.getElementById('insights-sections');
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
          transition={{ duration: 0.45 }}
          className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse shadow-[0_0_8px_rgba(147,51,234,0.6)]" />
          <span className="font-tech text-xs tracking-[0.25em] font-semibold text-brand-600 uppercase">
            05 // KNOWLEDGE & THOUGHT LEADERSHIP
          </span>
          <div className="h-px w-10 sm:w-16 bg-neutral-200" />
          <span className="font-tech text-[10px] text-neutral-600 uppercase px-2.5 py-0.5 rounded-full border border-neutral-200/80 bg-neutral-50 shadow-2xs">
            SYSTEM BLUEPRINTS & PERSPECTIVES
          </span>
        </motion.div>

        {/* Commanding Dual-Tone Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-4xl"
        >
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-neutral-950 leading-[1.08] mb-6">
            THINKING, LEARNING &{' '}
            <span className="bg-gradient-to-r from-brand-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              BUILDING IN PUBLIC.
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-neutral-600 leading-relaxed font-normal mb-10 max-w-3xl">
            We don’t write generic thought-leadership marketing. We document real technical architectures,
            empirical performance benchmarks, legacy migration post-mortems, and production system blueprints.
          </p>

          {/* Quick Jump Action */}
          <div className="flex items-center gap-4 mb-16">
            <button
              onClick={scrollToGallery}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-neutral-950 hover:bg-brand-600 text-white font-tech text-xs tracking-wider uppercase transition-all duration-300 shadow-md group cursor-pointer"
            >
              <span>Explore Knowledge Repository</span>
              <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
            </button>
            <span className="text-xs text-neutral-600 font-tech">
              8 Verified Schematics & Articles
            </span>
          </div>
        </motion.div>

        {/* Live Engineering Telemetry Ribbon */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-4"
        >
          {TELEMETRY_METRICS.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <div
                key={idx}
                className="relative bg-neutral-50/80 border border-neutral-200/90 rounded-2xl p-4 sm:p-5 flex flex-col justify-between group hover:border-brand-500/40 hover:bg-white hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-tech text-[10px] sm:text-xs text-neutral-600 tracking-wider uppercase">
                    {metric.label}
                  </span>
                  <div className="p-1.5 rounded-lg bg-neutral-100 text-brand-600 border border-neutral-200/80 group-hover:bg-brand-50 group-hover:border-brand-200 transition-colors">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div>
                  <div className="font-tech text-xl sm:text-2xl lg:text-3xl font-bold text-neutral-950 tracking-tight group-hover:text-brand-600 transition-colors">
                    {metric.value}
                  </div>
                  <div className="text-xs text-neutral-600 mt-1 font-normal">
                    {metric.subtext}
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
