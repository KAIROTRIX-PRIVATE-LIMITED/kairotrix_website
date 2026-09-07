'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Play, Terminal, ShieldCheck, Sparkles, Cpu, Clock, CheckCircle2 } from 'lucide-react';
import type { InsightSpecimen } from '@/data/insightsData';

interface InsightsCardProps {
  specimen: InsightSpecimen;
  index: number;
}

export function InsightsCard({ specimen, index }: InsightsCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handleMouseEnter = () => {
    if (specimen.videoSrc && videoRef.current) {
      videoRef.current.play().then(() => {
        setIsVideoPlaying(true);
      }).catch(() => {
        // Autoplay policy fallback
      });
    }
  };

  const handleMouseLeave = () => {
    if (specimen.videoSrc && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsVideoPlaying(false);
    }
  };

  const getBadgeStyle = (badge: InsightSpecimen['badge']) => {
    switch (badge) {
      case 'SYSTEM BLUEPRINT':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'CASE STUDY':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'TECHNICAL DEEP DIVE':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'RESEARCH':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'PERSPECTIVE':
        return 'bg-brand-50 text-brand-700 border-brand-200';
      default:
        return 'bg-neutral-100 text-neutral-700 border-neutral-200';
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.3) }}
      className="group flex flex-col justify-between bg-neutral-0 rounded-3xl border border-neutral-200/80 hover:border-brand-500/50 hover:shadow-xl transition-all duration-500 overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={`/insights/${specimen.slug}`} className="flex flex-col h-full p-6 sm:p-7">
        {/* Top Meta Bar */}
        <div className="flex items-center justify-between gap-3 mb-5">
          <span
            className={`font-tech text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full border tracking-wider uppercase ${getBadgeStyle(
              specimen.badge
            )}`}
          >
            {specimen.badge}
          </span>
          <div className="flex items-center gap-2 text-neutral-600 font-tech text-[11px] uppercase tracking-wider">
            <Clock className="w-3 h-3" />
            <span>{specimen.readTime}</span>
          </div>
        </div>

        {/* Media Chamber (Aspect 16:10) */}
        <div className="relative aspect-[16/10] w-full rounded-2xl bg-neutral-950 border border-neutral-800 overflow-hidden mb-6 flex items-center justify-center">
          {/* Ambient lighting inside chamber */}
          <div
            className="absolute inset-0 bg-gradient-to-tr from-brand-900/40 via-transparent to-transparent pointer-events-none z-10"
            aria-hidden="true"
          />
          <div
            className="absolute w-40 h-40 rounded-full bg-brand-500/20 blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none"
            aria-hidden="true"
          />

          {/* Video Preview (if available) */}
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

          {/* Fallback Graphic / Chamber Content */}
          <div className="relative z-10 flex flex-col items-center gap-2 text-white/70 group-hover:text-white transition-colors duration-300 pointer-events-none">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-500/30 group-hover:border-brand-400/50 transition-all duration-300">
              <Play className="w-4 h-4 fill-white/80" />
            </div>
            <span className="font-tech text-[10px] tracking-widest uppercase text-white/60">
              {isVideoPlaying ? 'Playing Blueprint' : 'Hover to Inspect'}
            </span>
          </div>

          {/* Live Empirical Metric Overlay */}
          <div className="absolute bottom-3 left-3 z-20 px-2.5 py-1 rounded-lg bg-neutral-900/90 backdrop-blur-md border border-neutral-700/80 flex items-center gap-2">
            <span className="font-tech text-[9px] text-neutral-400 uppercase tracking-wider">
              {specimen.empiricalMetric.label}:
            </span>
            <span className="font-tech text-xs font-bold text-brand-400">
              {specimen.empiricalMetric.value}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2 font-tech text-[11px] text-neutral-600 uppercase tracking-wider">
              <span>{specimen.disciplineName}</span>
              <span>•</span>
              <span>{specimen.date}</span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-neutral-900 leading-snug group-hover:text-brand-600 transition-colors duration-300 mb-2.5 line-clamp-2">
              {specimen.title}
            </h3>

            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed line-clamp-3 mb-5">
              {specimen.excerpt}
            </p>
          </div>

          {/* Architectural Key Takeaway Callout */}
          <div className="mb-6 p-3 rounded-xl bg-neutral-50 border border-neutral-200/90 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
            <div className="min-w-0">
              <span className="font-tech text-[10px] font-semibold text-neutral-700 tracking-wider uppercase block mb-0.5">
                Key Takeaway
              </span>
              <p className="text-[11px] text-neutral-600 leading-relaxed line-clamp-2">
                {specimen.keyTakeaway}
              </p>
            </div>
          </div>

          {/* Card Footer: Tags & Action Arrow */}
          <div className="pt-4 border-t border-neutral-200/80 flex items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5 min-w-0 overflow-hidden">
              {specimen.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="font-tech text-[10px] px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-700 truncate border border-neutral-200/60"
                >
                  {tag}
                </span>
              ))}
              {specimen.tags.length > 2 && (
                <span className="font-tech text-[10px] text-neutral-600">
                  +{specimen.tags.length - 2}
                </span>
              )}
            </div>

            <div className="w-8 h-8 rounded-full border border-neutral-200 group-hover:border-brand-500 group-hover:bg-brand-50 flex items-center justify-center transition-all duration-300 shrink-0">
              <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-brand-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
