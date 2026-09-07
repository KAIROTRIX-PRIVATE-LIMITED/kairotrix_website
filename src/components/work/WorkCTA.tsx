'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Terminal, ShieldCheck, Cpu } from 'lucide-react';

export function WorkCTA() {
  return (
    <section className="w-full bg-neutral-0 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-b from-neutral-950 to-black text-white p-8 sm:p-12 lg:p-16 border border-neutral-800 shadow-2xl overflow-hidden">
          {/* Ambient Purple Glow */}
          <div
            className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500/15 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-600/10 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-3xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-brand-300 font-tech text-xs font-semibold tracking-wider uppercase mb-6">
              <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" />
              04.CTA // INITIATE COLLABORATION
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white uppercase leading-[1.08] mb-6">
              HAVE A COMPLEX SYSTEM TO BUILD? <span className="gradient-signature-text">LET&apos;S ENGINEER IT.</span>
            </h2>

            {/* Narrative */}
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-normal mb-10">
              We turn difficult operational bottlenecks into clean, deterministic software and autonomous systems. No generic templates, no middlemen — just senior engineering rigor and mathematical performance guarantees.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12">
              <Link
                href="/contact?interest=work-build"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white hover:bg-neutral-100 text-neutral-950 font-tech font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer group"
              >
                <span>Discuss Your System Spec</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/solutions"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-tech font-bold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer"
              >
                <span>Explore Solution Disciplines</span>
                <ArrowUpRight className="w-4 h-4 text-neutral-400" />
              </Link>
            </div>

            {/* 3 Trust Pillars */}
            <div className="pt-8 border-t border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-brand-400 shrink-0" />
                <span className="font-tech text-xs uppercase tracking-wider text-neutral-300 font-semibold">
                  100% IP Ownership Delivered
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Terminal className="w-5 h-5 text-brand-400 shrink-0" />
                <span className="font-tech text-xs uppercase tracking-wider text-neutral-300 font-semibold">
                  Direct Senior Engineers Only
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Cpu className="w-5 h-5 text-brand-400 shrink-0" />
                <span className="font-tech text-xs uppercase tracking-wider text-neutral-300 font-semibold">
                  P99 Performance Guaranteed
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
