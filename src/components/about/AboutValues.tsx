'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, ShieldCheck, RefreshCw, Zap, Eye } from 'lucide-react';

const VALUES = [
  {
    number: '01',
    title: 'Problem First, Technology Second',
    tagline: 'Never sell a hammer when a lever is needed',
    description:
      'We never propose an LLM agent, a distributed microservice, or a complex vector database when a streamlined automation script or normalized relational database solves the problem with greater reliability and lower cost.',
    icon: Terminal,
  },
  {
    number: '02',
    title: 'Honest Capability Over Inflated Claims',
    tagline: 'Zero fabricated metrics or manufactured social proof',
    description:
      'We do not inflate results, fabricate case studies, or use deceptive marketing metrics. Our engineering capability is verified through live code, observable demonstrations, and the performance of the systems we deploy.',
    icon: ShieldCheck,
  },
  {
    number: '03',
    title: 'Built to Evolve, Never Locked',
    tagline: 'Durable architectural invariants',
    description:
      'Software is living infrastructure. We design every database schema, API gateway, and automation pipeline with modular boundaries so our clients can swap models, scale workloads, and evolve without vendor lock-in.',
    icon: RefreshCw,
  },
  {
    number: '04',
    title: 'Quality Is Not Optional — It Is the Product',
    tagline: 'Mathematical precision and resilience',
    description:
      'P99 latency budgets, sub-second error recoveries, idempotency guarantees, and WCAG accessibility standards are non-negotiable baselines. We engineer systems intended to operate flawlessly under production load.',
    icon: Zap,
  },
  {
    number: '05',
    title: 'Demystify Technology, Never Obfuscate',
    tagline: 'Complete architectural transparency',
    description:
      'We explain complex systems in clear, plain language. Our clients understand what their systems do, how the data flows, and why decisions were made. True partnership means total architectural visibility.',
    icon: Eye,
  },
];

export function AboutValues() {
  return (
    <section className="w-full bg-neutral-0 py-20 lg:py-28 border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
            <span className="font-tech text-xs tracking-[0.25em] font-semibold text-brand-600 uppercase">
              06.3 // GUIDING PRINCIPLES
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-950 mb-6">
            Philosophy & Core Values.
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
            These five invariants guide every line of code we write, every architecture equation we design, and every client engagement we undertake.
          </p>
        </div>

        {/* 5 Values Grid (Asymmetrical: 3 on top, 2 on bottom or responsive grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {VALUES.map((val, idx) => {
            const Icon = val.icon;
            const isWide = idx === 3 || idx === 4;
            return (
              <div
                key={val.number}
                className={`group relative rounded-3xl p-8 bg-neutral-50/70 border border-neutral-200/90 hover:border-brand-500/50 hover:bg-white hover:shadow-xl transition-all duration-500 flex flex-col justify-between overflow-hidden ${
                  isWide ? 'lg:col-span-1.5' : ''
                }`}
              >
                {/* Large Muted Number Watermark in Background */}
                <span
                  className="absolute -right-3 -bottom-5 font-mono text-8xl lg:text-9xl font-bold text-neutral-200/40 select-none pointer-events-none group-hover:text-brand-500/10 group-hover:scale-105 transition-all duration-500"
                  aria-hidden="true"
                >
                  {val.number}
                </span>

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-white border border-neutral-200 text-neutral-900 shadow-2xs">
                      {val.number}
                    </span>
                    <div className="p-2 rounded-xl bg-brand-50 text-brand-600 border border-brand-200 group-hover:bg-brand-600 group-hover:text-white transition-all duration-300">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-neutral-950 leading-tight mb-2 group-hover:text-brand-600 transition-colors">
                    {val.title}
                  </h3>

                  <p className="font-tech text-xs text-brand-700 font-semibold uppercase tracking-wider mb-4">
                    {val.tagline}
                  </p>

                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                    {val.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
