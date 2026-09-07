'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Terminal,
  Cpu,
  Clock,
  Sparkles,
  Layers,
  Play,
} from 'lucide-react';
import type { InsightSpecimen } from '@/data/insightsData';

interface InsightsFeaturedProps {
  specimen: InsightSpecimen;
}

export function InsightsFeatured({ specimen }: InsightsFeaturedProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMouseEnter = () => {
    if (specimen.videoSrc && videoRef.current) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Autoplay policy fallback
      });
    }
  };

  const handleMouseLeave = () => {
    if (specimen.videoSrc && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  return (
    <div className="w-full mb-16 sm:mb-20">
      <div className="flex items-center gap-2 mb-4">
        <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
        <span className="font-tech text-xs tracking-[0.25em] font-semibold text-brand-600 uppercase">
          FEATURED SPECIMEN // FLAGSHIP BLUEPRINT
        </span>
      </div>

      <div
        className="group relative rounded-3xl bg-neutral-0 border border-neutral-200/90 hover:border-brand-500/60 transition-all duration-500 overflow-hidden shadow-xl hover:shadow-2xl"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Left Column: Media Chamber (5 Cols on Desktop) */}
          <div className="lg:col-span-6 relative aspect-[16/10] lg:aspect-auto lg:min-h-[460px] bg-neutral-950 flex items-center justify-center overflow-hidden border-b lg:border-b-0 lg:border-r border-neutral-200/80">
            {/* Ambient Purple Glow */}
            <div
              className="absolute inset-0 bg-gradient-to-tr from-brand-900/40 via-transparent to-transparent pointer-events-none z-10"
              aria-hidden="true"
            />
            <div
              className="absolute w-72 h-72 rounded-full bg-brand-500/25 blur-3xl group-hover:scale-125 transition-transform duration-700 pointer-events-none"
              aria-hidden="true"
            />

            {/* Video Preview */}
            {specimen.videoSrc && (
              <video
                ref={videoRef}
                src={specimen.videoSrc}
                muted
                loop
                playsInline
                preload="metadata"
                className="absolute inset-0 w-full h-full object-cover z-0 opacity-80 group-hover:opacity-100 transition-opacity duration-500"
              />
            )}

            {/* Chamber Center Graphic */}
            <div className="relative z-10 flex flex-col items-center gap-3 text-white/80 group-hover:text-white transition-colors duration-300 pointer-events-none">
              <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-500/40 group-hover:border-brand-400/60 transition-all duration-300 shadow-lg">
                <Play className="w-6 h-6 fill-white/80" />
              </div>
              <span className="font-tech text-xs tracking-widest uppercase text-white/70">
                {isPlaying ? 'Inspecting Live Schematic' : 'Hover to Inspect Video'}
              </span>
            </div>

            {/* Bottom Live Metric Badge */}
            <div className="absolute bottom-4 left-4 z-20 px-3 py-1.5 rounded-xl bg-neutral-900/90 backdrop-blur-md border border-neutral-700/80 flex items-center gap-2.5 shadow-md">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-tech text-[10px] text-neutral-300 uppercase tracking-wider">
                {specimen.empiricalMetric.label}:
              </span>
              <span className="font-tech text-sm font-bold text-brand-300">
                {specimen.empiricalMetric.value}
              </span>
            </div>
          </div>

          {/* Right Column: Editorial & Technical Architecture (7 Cols) */}
          <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-neutral-0">
            <div>
              {/* Header Badges */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="font-tech text-xs font-semibold px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200 tracking-wider uppercase">
                    {specimen.badge}
                  </span>
                  <span className="font-tech text-[11px] text-neutral-600 uppercase tracking-wider">
                    {specimen.disciplineName}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-neutral-600 font-tech text-xs uppercase tracking-wider">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{specimen.readTime}</span>
                  <span>•</span>
                  <span>{specimen.date}</span>
                </div>
              </div>

              {/* Title & Subtitle */}
              <Link href={`/insights/${specimen.slug}`} className="block group/title">
                <h2 className="text-2xl sm:text-3xl font-bold text-neutral-950 leading-tight group-hover/title:text-brand-600 transition-colors duration-300 mb-2">
                  {specimen.title}
                </h2>
                <p className="text-xs sm:text-sm font-tech text-brand-700 uppercase tracking-wider mb-4">
                  {specimen.subtitle}
                </p>
              </Link>

              {/* Excerpt */}
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal mb-6">
                {specimen.excerpt}
              </p>

              {/* Systems Architecture Equation */}
              {specimen.architectureEquation && (
                <div className="mb-6 p-4 rounded-2xl bg-neutral-50 border border-neutral-200/90 font-tech">
                  <span className="text-[10px] text-neutral-600 font-semibold tracking-wider uppercase block mb-2">
                    Systems Architecture Equation
                  </span>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-800">
                    <span className="px-2.5 py-1 rounded-lg bg-white border border-neutral-200 font-medium">
                      {specimen.architectureEquation.left}
                    </span>
                    <span className="text-brand-600 font-bold">
                      {specimen.architectureEquation.operator}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-white border border-neutral-200 font-medium">
                      {specimen.architectureEquation.right}
                    </span>
                    <span className="text-neutral-400 font-bold">=</span>
                    <span className="px-2.5 py-1 rounded-lg bg-brand-50 border border-brand-200 text-brand-700 font-bold">
                      {specimen.architectureEquation.outcome}
                    </span>
                  </div>
                </div>
              )}

              {/* Key Sections Checklist */}
              <div className="mb-6">
                <span className="font-tech text-[10px] font-semibold text-neutral-600 tracking-wider uppercase block mb-2">
                  Key Technical Sections
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {specimen.keySections.slice(0, 4).map((section, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-2 text-xs text-neutral-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0" />
                      <span className="truncate">{section}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-neutral-200/80 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-1.5">
                {specimen.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-tech text-[10px] px-2.5 py-1 rounded-lg bg-neutral-100 text-neutral-700 border border-neutral-200/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                href={`/insights/${specimen.slug}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-950 hover:bg-brand-600 text-white font-tech text-xs tracking-wider uppercase transition-all duration-300 shadow-md group/btn"
              >
                <span>Read Blueprint</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
