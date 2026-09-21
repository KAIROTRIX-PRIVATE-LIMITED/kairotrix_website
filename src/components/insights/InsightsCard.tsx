'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowRight, Clock } from 'lucide-react';
import type { InsightSpecimen } from '@/data/insightsData';

interface InsightsCardProps {
  specimen: InsightSpecimen;
  index: number;
  isParentHovered?: boolean;
  isSingle?: boolean;
  className?: string;
}

export function InsightsCard({
  specimen,
  index,
  isParentHovered = false,
  isSingle = false,
  className = '',
}: InsightsCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isSelfHovered, setIsSelfHovered] = useState(false);

  const isHovered = isParentHovered || isSelfHovered;

  // Fallback video if specimen has none
  const videoSrc = specimen.videoSrc || '/assets/videos/smart-search.mp4';
  const videoPosterUrl = `${videoSrc}#t=0.001`;

  // Play video on hover, pause & rewind on leave
  useEffect(() => {
    if (videoRef.current) {
      if (isHovered) {
        videoRef.current.play().catch(() => {
          // Autoplay policy fallback
        });
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isHovered]);

  const categoryLabel =
    specimen.techCategoryLabel || specimen.serviceName || specimen.disciplineName;

  // ─────────────────────────────────────────────────────────────
  // 1. SINGLE / REMAINDER FULL-WIDTH SPOTLIGHT CARD (Odd count)
  // ─────────────────────────────────────────────────────────────
  if (isSingle) {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.25) }}
        className={`group relative rounded-3xl overflow-hidden bg-neutral-950 border border-neutral-200/80 hover:border-brand-500/60 shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col ${className}`}
        onMouseEnter={() => setIsSelfHovered(true)}
        onMouseLeave={() => setIsSelfHovered(false)}
      >
        <Link
          href={`/insights/${specimen.slug}`}
          className="relative w-full flex-1 flex flex-col justify-between p-6 sm:p-10 lg:p-12 z-10"
        >
          {/* Background Image Poster Fallback */}
          {specimen.image && (
            <Image
              src={specimen.image}
              alt={specimen.title}
              fill
              sizes="100vw"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out z-0 pointer-events-none"
              priority={false}
            />
          )}

          {/* Full-Bleed Video Background */}
          <video
            ref={videoRef}
            src={videoPosterUrl}
            poster={specimen.image || undefined}
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out z-0 pointer-events-none"
          />

          {/* Desktop Left-to-Right / Mobile Top-to-Bottom Scrim Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-neutral-950/40 sm:bg-gradient-to-r sm:from-neutral-950 sm:via-neutral-950/85 sm:to-transparent z-[1] pointer-events-none" />

          {/* Top Bar: Badges & Action Arrow */}
          <div className="relative z-10 flex items-center justify-between gap-4 w-full mb-8">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="font-mono text-[10px] sm:text-xs font-semibold px-3.5 py-1.5 rounded-full bg-brand-500/20 backdrop-blur-md border border-brand-500/40 text-brand-300 tracking-wider uppercase shadow-xs">
                {categoryLabel}
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white/80 font-mono text-[10px] uppercase tracking-wider">
                <Clock className="w-3 h-3 text-brand-400" />
                <span>{specimen.readTime || '6 min read'}</span>
              </span>
            </div>

            <div
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-300 shrink-0 ${
                isHovered ? 'bg-brand-600 border-brand-500 scale-110' : 'group-hover:bg-white/20'
              }`}
            >
              <ArrowUpRight
                className={`w-5 h-5 text-white transition-transform ${
                  isHovered ? 'translate-x-0.5 -translate-y-0.5' : ''
                }`}
              />
            </div>
          </div>

          {/* Center/Bottom Content: Title, Excerpt, Author, and Action Button */}
          <div className="relative z-10 max-w-3xl flex flex-col justify-end mt-auto">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-white leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] mb-3 group-hover:text-brand-300 transition-colors duration-300">
              {specimen.title}
            </h3>

            {specimen.excerpt && (
              <p className="text-sm sm:text-base text-neutral-300 font-sans leading-relaxed line-clamp-2 sm:line-clamp-3 mb-6 drop-shadow-md max-w-2xl">
                {specimen.excerpt}
              </p>
            )}

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/20">
              {/* Author Info */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-brand-600 to-purple-500 text-white flex items-center justify-center font-display font-bold text-xs shrink-0 shadow-md">
                  {specimen.author.charAt(0)}
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block leading-tight">
                    Technical Specimen by
                  </span>
                  <span className="text-xs sm:text-sm font-sans font-semibold text-white">
                    {specimen.author}
                  </span>
                </div>
              </div>

              {/* Read Button */}
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-white hover:bg-brand-500 text-neutral-950 hover:text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md">
                <span>Read Full Article</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // 2. STANDARD 2-COLUMN BENTO CARD
  // ─────────────────────────────────────────────────────────────
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.25) }}
      className={`group relative rounded-3xl overflow-hidden bg-neutral-950 border border-neutral-200/80 hover:border-brand-500/60 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col ${className}`}
      onMouseEnter={() => setIsSelfHovered(true)}
      onMouseLeave={() => setIsSelfHovered(false)}
    >
      <Link
        href={`/insights/${specimen.slug}`}
        className="relative w-full flex-1 flex flex-col justify-between p-6 sm:p-8 z-10"
      >
        {/* Background Image Poster Fallback */}
        {specimen.image && (
          <Image
            src={specimen.image}
            alt={specimen.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out z-0 pointer-events-none"
            priority={index < 2}
          />
        )}

        {/* Full-Bleed Video Background */}
        <video
          ref={videoRef}
          src={videoPosterUrl}
          poster={specimen.image || undefined}
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out z-0 pointer-events-none"
        />

        {/* Ambient Dark Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/95 via-neutral-950/40 to-neutral-950/20 z-[1] pointer-events-none transition-opacity duration-300" />

        {/* Top Bar: Tech Category Pill & Action Arrow */}
        <div className="relative z-10 flex items-center justify-between gap-3 w-full">
          <span className="font-mono text-[10px] sm:text-xs font-semibold px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white tracking-wider uppercase truncate max-w-[260px] shadow-xs">
            {categoryLabel}
          </span>

          <div
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-300 shrink-0 ${
              isHovered ? 'bg-brand-600 border-brand-500 scale-110' : 'group-hover:bg-white/20'
            }`}
          >
            <ArrowUpRight
              className={`w-4 h-4 text-white transition-transform ${
                isHovered ? 'translate-x-0.5 -translate-y-0.5' : ''
              }`}
            />
          </div>
        </div>

        {/* Bottom Chamber: Title & Hover-Revealed Author Bar */}
        <div className="relative z-10 pt-16 flex flex-col justify-end">
          {/* Article Heading */}
          <h3 className="text-xl sm:text-2xl font-bold font-display text-white leading-snug drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] mb-3 group-hover:text-brand-300 transition-colors duration-300">
            {specimen.title}
          </h3>

          {/* Author Credit & Read Button */}
          <div
            className={`flex items-center justify-between gap-3 pt-3 border-t border-white/30 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] transition-all duration-300 ${
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-85 sm:opacity-0 sm:translate-y-2'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-brand-600 text-white flex items-center justify-center font-display font-bold text-xs shrink-0 shadow-md">
                {specimen.author.charAt(0)}
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-sans text-neutral-300 block leading-tight">
                  Article by
                </span>
                <span className="text-xs font-sans font-semibold text-white truncate block">
                  {specimen.author}
                </span>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-black/60 hover:bg-white text-white hover:text-neutral-950 backdrop-blur-md border border-white/30 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md shrink-0">
              <span>Read Article</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
