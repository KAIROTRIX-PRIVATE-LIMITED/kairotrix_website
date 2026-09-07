'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Target, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function AboutVisionMission() {
  return (
    <section className="w-full bg-neutral-0 py-20 lg:py-28 border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Eyebrow */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
            <span className="font-tech text-xs tracking-[0.25em] font-semibold text-brand-600 uppercase">
              06.2 // DIRECTION & PURPOSE
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-950 mb-6">
            Vision & Mission.
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
            Clarity of direction defines engineering discipline. We build for longevity, autonomy, and tangible business results.
          </p>
        </div>

        {/* Dual Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          
          {/* VISION CARD */}
          <div className="group rounded-3xl p-8 sm:p-10 bg-neutral-50/80 border border-neutral-200/90 hover:border-brand-500/50 hover:bg-white hover:shadow-xl transition-all duration-500 flex flex-col justify-between relative overflow-hidden">
            <div
              className="absolute -top-16 -right-16 w-60 h-60 bg-brand-500/10 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700"
              aria-hidden="true"
            />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <span className="font-tech text-xs font-semibold px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200 tracking-wider uppercase">
                  OUR VISION
                </span>
                <div className="p-2.5 rounded-xl bg-purple-100/80 text-purple-700 border border-purple-200 group-hover:scale-110 transition-transform">
                  <Compass className="w-5 h-5" />
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-neutral-950 leading-tight mb-4">
                Technology as an Appreciating Bridge.
              </h3>

              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal mb-8">
                KAIROTRIX envisions a world where technology is not an incomprehensible barrier or a monthly recurring penalty, but a bridge — where every business, regardless of scale, possesses deterministic, well-architected systems that solve real problems, appreciate in value, and enable unconstrained operational evolution.
              </p>

              <div className="space-y-3 pt-6 border-t border-neutral-200/80">
                <div className="flex items-center gap-2.5 text-xs text-neutral-700 font-tech">
                  <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0" />
                  <span>Durable architecture that outlasts vendor hype cycles</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-neutral-700 font-tech">
                  <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0" />
                  <span>Democratization of production-grade AI & automated runtimes</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-neutral-700 font-tech">
                  <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0" />
                  <span>Zero arbitrary per-seat enterprise taxes</span>
                </div>
              </div>
            </div>
          </div>

          {/* MISSION CARD */}
          <div className="group rounded-3xl p-8 sm:p-10 bg-neutral-50/80 border border-neutral-200/90 hover:border-brand-500/50 hover:bg-white hover:shadow-xl transition-all duration-500 flex flex-col justify-between relative overflow-hidden">
            <div
              className="absolute -top-16 -right-16 w-60 h-60 bg-brand-500/10 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700"
              aria-hidden="true"
            />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <span className="font-tech text-xs font-semibold px-3 py-1 rounded-full bg-brand-50 text-brand-700 border border-brand-200 tracking-wider uppercase">
                  OUR MISSION
                </span>
                <div className="p-2.5 rounded-xl bg-brand-100/80 text-brand-700 border border-brand-200 group-hover:scale-110 transition-transform">
                  <Target className="w-5 h-5" />
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-neutral-950 leading-tight mb-4">
                Precision Engineering for Practical Problems.
              </h3>

              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal mb-8">
                To identify what technology can genuinely improve, build it with mathematical precision, and make intelligent systems accessible to the businesses that need them — without overpromising, overcomplicating, or obfuscating behind marketing jargon.
              </p>

              <div className="space-y-3 pt-6 border-t border-neutral-200/80">
                <div className="flex items-center gap-2.5 text-xs text-neutral-700 font-tech">
                  <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0" />
                  <span>Root-cause operational bottleneck diagnosis</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-neutral-700 font-tech">
                  <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0" />
                  <span>Mathematically verified performance (P99 latency, 0% event loss)</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-neutral-700 font-tech">
                  <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0" />
                  <span>Uncompromised source code and infrastructure ownership</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
