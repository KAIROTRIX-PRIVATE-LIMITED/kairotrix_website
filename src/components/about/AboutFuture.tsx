'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Rocket, Cpu, Globe2, ArrowRight } from 'lucide-react';

const ROADMAP = [
  {
    phase: '01',
    status: 'ACTIVE NOW',
    statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    title: 'Specialized Solution Engineering',
    description:
      'Delivering bespoke AI systems, custom web software, and zero-loss automation bridges directly for growing businesses with 100% IP ownership.',
    milestone: '6 Production Solution Disciplines & Verifiable Case Studies',
    icon: Layers,
  },
  {
    phase: '02',
    status: 'IN ACCELERATION',
    statusColor: 'bg-purple-50 text-purple-700 border-purple-200',
    title: 'Reusable Architectural Engines',
    description:
      'Distilling production-tested patterns (deterministic agent FSMs, WebSocket telemetry, hybrid RAG benchmarks) into internal modular accelerators.',
    milestone: '50% Faster Time-to-Production for Complex Deployments',
    icon: Cpu,
  },
  {
    phase: '03',
    status: 'UPCOMING',
    statusColor: 'bg-blue-50 text-blue-700 border-blue-200',
    title: 'Autonomous AI & Automation Products',
    description:
      'Launching purpose-built, deployable software tools designed to eliminate specific cross-industry operational friction points out of the box.',
    milestone: 'Packaged Turnkey Solutions with Client Infrastructure Hosting',
    icon: Rocket,
  },
  {
    phase: '04',
    status: 'LONG-TERM VISION',
    statusColor: 'bg-neutral-100 text-neutral-700 border-neutral-200',
    title: 'Scalable Enterprise Platform',
    description:
      'Evolving into a durable technology company providing end-to-end autonomous business intelligence and workflow orchestration platforms.',
    milestone: 'Global Operational Architecture for Modern Intelligent Enterprises',
    icon: Globe2,
  },
];

export function AboutFuture() {
  return (
    <section className="w-full bg-[#FAFAFC] py-20 lg:py-28 border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
            <span className="font-tech text-xs tracking-[0.25em] font-semibold text-brand-600 uppercase">
              06.5 // STRATEGIC HORIZON
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-950 mb-6">
            Where We Are Going.
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
            KAIROTRIX is not a static agency. We are built to evolve: transitioning from bespoke engineering partnerships into repeatable solutions, autonomous software products, and scalable technology infrastructure.
          </p>
        </div>

        {/* Roadmap Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ROADMAP.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.phase}
                className="group rounded-3xl p-6 sm:p-7 bg-neutral-50/70 border border-neutral-200/90 hover:border-brand-500/50 hover:bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Row: Phase + Status */}
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <span className="font-mono text-xs font-bold text-neutral-400 group-hover:text-brand-600 transition-colors">
                      PHASE {item.phase}
                    </span>
                    <span
                      className={`font-tech text-[10px] font-semibold px-2 py-0.5 rounded-full border uppercase tracking-wider ${item.statusColor}`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <div className="p-2.5 w-fit rounded-xl bg-neutral-100 text-brand-600 border border-neutral-200/80 mb-4 group-hover:bg-brand-50 group-hover:border-brand-200 transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-neutral-950 leading-snug mb-3 group-hover:text-brand-600 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Milestone Footer */}
                <div className="pt-4 border-t border-neutral-200/80">
                  <span className="font-tech text-[10px] uppercase tracking-wider text-neutral-500 block mb-1">
                    Key Milestone:
                  </span>
                  <span className="text-xs font-tech font-semibold text-neutral-800 leading-snug block">
                    {item.milestone}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
