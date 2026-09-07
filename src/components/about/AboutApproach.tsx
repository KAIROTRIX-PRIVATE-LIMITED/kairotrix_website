'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search, Compass, Layers, Code2, Network, RefreshCw } from 'lucide-react';

const STAGES = [
  {
    step: '01',
    name: 'UNDERSTAND',
    title: 'Root-Cause Discovery',
    description: 'We audit your actual workflows, data flows, and team bottlenecks before recommending any software.',
    deliverable: 'Operational Bottleneck Diagnostic Matrix',
    icon: Search,
  },
  {
    step: '02',
    name: 'EXPLORE',
    title: 'Feasibility & Prototype',
    description: 'We evaluate technical paths, test model capabilities, and validate architectural feasibility in days.',
    deliverable: 'Interactive Proof of Architecture Prototype',
    icon: Compass,
  },
  {
    step: '03',
    name: 'ARCHITECT',
    title: 'Systems Blueprinting',
    description: 'We draft strict schema contracts, state machines, API interfaces, and mathematical latency budgets.',
    deliverable: 'Production Systems Architecture Equation',
    icon: Layers,
  },
  {
    step: '04',
    name: 'BUILD',
    title: 'Precision Engineering',
    description: 'Senior engineers build the core engines with strict typing, zero fluff, and production invariants.',
    deliverable: 'Full Source Code & Modular Test Suites',
    icon: Code2,
  },
  {
    step: '05',
    name: 'INTEGRATE',
    title: 'Zero-Downtime Cutover',
    description: 'We deploy into your cloud infrastructure, wire webhooks, sync legacy databases, and stress-test.',
    deliverable: 'Hardened Production Runtime & Cloud Sync',
    icon: Network,
  },
  {
    step: '06',
    name: 'EVOLVE',
    title: 'Continuous Autonomy',
    description: 'We hand over 100% IP ownership, document all pipelines, and configure live telemetry alerts.',
    deliverable: 'Client Autonomy & Long-Term Scaling Bridge',
    icon: RefreshCw,
  },
];

export function AboutApproach() {
  return (
    <section className="w-full bg-neutral-0 py-20 lg:py-28 border-b border-neutral-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
            <span className="font-tech text-xs tracking-[0.25em] font-semibold text-brand-600 uppercase">
              06.4 // EXECUTION METHODOLOGY
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-950 mb-6">
            How We Build Systems.
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
            Every engagement follows a proven 6-stage lifecycle designed to eliminate uncertainty, ensure mathematical delivery, and hand over complete operational autonomy.
          </p>
        </div>

        {/* 6-Stage Process Grid / Timeline */}
        <div className="relative">
          {/* Subtle connecting line across desktop */}
          <div
            className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-500/20 via-purple-500/40 to-indigo-500/20 -translate-y-12 pointer-events-none"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {STAGES.map((stage) => {
              const Icon = stage.icon;
              return (
                <div
                  key={stage.step}
                  className="group relative rounded-3xl p-6 sm:p-8 bg-neutral-50/70 border border-neutral-200/90 hover:border-brand-500/50 hover:bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Top Row: Step Tag + Icon */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-white border border-neutral-200 text-brand-600 shadow-2xs">
                          {stage.step}
                        </span>
                        <span className="font-tech text-[11px] font-semibold tracking-wider text-neutral-500 uppercase">
                          {stage.name}
                        </span>
                      </div>
                      <div className="p-2 rounded-xl bg-neutral-100 text-neutral-700 group-hover:bg-brand-50 group-hover:text-brand-600 border border-neutral-200/80 transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-neutral-950 mb-2 group-hover:text-brand-600 transition-colors">
                      {stage.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal mb-6">
                      {stage.description}
                    </p>
                  </div>

                  {/* Concrete Deliverable Badge */}
                  <div className="pt-4 border-t border-neutral-200/80">
                    <span className="font-tech text-[10px] uppercase tracking-wider text-neutral-500 block mb-1">
                      Production Deliverable:
                    </span>
                    <span className="text-xs font-tech font-semibold text-neutral-900 group-hover:text-brand-700 transition-colors">
                      {stage.deliverable}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
