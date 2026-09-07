'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, ShieldCheck, Sparkles, CheckCircle2, XCircle } from 'lucide-react';

const COMPARISON_POINTS = [
  {
    topic: 'Problem Framing',
    defaultApproach: 'Pushes pre-packaged vendor stacks or expensive LLM wrappers regardless of the actual bottleneck.',
    kairotrixStandard: 'Diagnoses the root operational problem first. Selects AI, automation, or custom software only where it delivers genuine leverage.',
  },
  {
    topic: 'Ownership & Intellectual Property',
    defaultApproach: 'Locks clients into proprietary closed ecosystems and compounding monthly per-seat licensing penalties.',
    kairotrixStandard: '100% client-owned source code, data pipelines, and deployment infrastructure with zero recurring license tax.',
  },
  {
    topic: 'Engineering Accountability',
    defaultApproach: 'Senior partners sell the engagement, then quietly delegate delivery to rotating junior outsourced resources.',
    kairotrixStandard: 'Direct collaboration with principal systems architects who write the production schemas, pipelines, and code.',
  },
  {
    topic: 'Verifiability & Claims',
    defaultApproach: 'Inflated marketing buzzwords, vague metrics, and fabricated social proof to manufacture artificial trust.',
    kairotrixStandard: 'Zero fabricated claims. Technical depth, observable demos, and the website itself serve as proof of capability.',
  },
];

export function AboutIdentity() {
  return (
    <section id="about-identity" className="w-full bg-neutral-0 py-20 lg:py-28 border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
            <span className="font-tech text-xs tracking-[0.25em] font-semibold text-brand-600 uppercase">
              06.1 // IDENTITY & ORIGIN
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-950 mb-6">
            Why KAIROTRIX Exists.
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
            Most businesses don’t need another bloated subscription, another marketing agency, or another generic AI chatbot. They need practical, well-engineered systems that remove friction, automate repetitive manual work, and actually solve the bottleneck holding their business back.
          </p>
        </div>

        {/* The Core Manifesto Banner */}
        <div className="mb-20 p-8 sm:p-10 rounded-3xl bg-neutral-50 border border-neutral-200/90 relative overflow-hidden">
          <div
            className="absolute top-0 right-0 w-80 h-80 bg-brand-500/10 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />
          <div className="relative z-10 max-w-3xl">
            <span className="font-tech text-xs font-semibold text-brand-700 uppercase tracking-widest block mb-3">
              Core Identity Principle
            </span>
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-neutral-950 leading-snug tracking-tight mb-4">
              &ldquo;We don’t just claim capability — we demonstrate it. The website itself is part of the proof of what KAIROTRIX can build.&rdquo;
            </p>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
              From our sub-16ms WebSocket event streaming and deterministic AI runtime to our custom design tokens and interactive 3D components, every interaction reflects our refusal to cut corners.
            </p>
          </div>
        </div>

        {/* Side-by-Side Comparison: Industry Default vs KAIROTRIX Standard */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-tech text-xs font-semibold text-neutral-600 uppercase tracking-widest block mb-2">
              Architectural Contrast
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-neutral-950">
              The Industry Default vs. The KAIROTRIX Standard
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* The Industry Default Card */}
            <div className="rounded-3xl p-6 sm:p-8 bg-neutral-50/70 border border-neutral-200/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-neutral-200">
                  <div className="p-2 rounded-xl bg-red-50 text-red-600 border border-red-200">
                    <XCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-tech text-sm font-bold uppercase tracking-wider text-neutral-900">
                      The Industry Default
                    </h4>
                    <span className="text-xs text-neutral-600">
                      Agency Retainers & SaaS Sprawl
                    </span>
                  </div>
                </div>

                <div className="space-y-6">
                  {COMPARISON_POINTS.map((pt, idx) => (
                    <div key={idx} className="space-y-1">
                      <span className="font-tech text-[11px] font-semibold uppercase tracking-wider text-neutral-600 block">
                        {pt.topic}
                      </span>
                      <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                        {pt.defaultApproach}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* The KAIROTRIX Standard Card */}
            <div className="rounded-3xl p-6 sm:p-8 bg-white border-2 border-brand-500/40 shadow-xl shadow-brand-500/5 flex flex-col justify-between relative overflow-hidden">
              <div
                className="absolute -top-12 -right-12 w-48 h-48 bg-brand-500/10 rounded-full blur-2xl pointer-events-none"
                aria-hidden="true"
              />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-brand-100">
                  <div className="p-2 rounded-xl bg-brand-50 text-brand-600 border border-brand-200">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-tech text-sm font-bold uppercase tracking-wider text-neutral-950">
                      The KAIROTRIX Standard
                    </h4>
                    <span className="text-xs text-brand-600 font-medium">
                      Problem-First Engineering Rigor
                    </span>
                  </div>
                </div>

                <div className="space-y-6">
                  {COMPARISON_POINTS.map((pt, idx) => (
                    <div key={idx} className="space-y-1">
                      <span className="font-tech text-[11px] font-semibold uppercase tracking-wider text-brand-700 block">
                        {pt.topic}
                      </span>
                      <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed font-medium">
                        {pt.kairotrixStandard}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
