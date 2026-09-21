'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Play } from 'lucide-react';
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
        // Fallback for browser autoplay policy
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

  const serviceLabel = specimen.serviceName || specimen.disciplineName;

  return (
    <div className="w-full border-b border-neutral-200/80 bg-[#FAFAFC]">
      <Link
        href={`/insights/${specimen.slug}`}
        className="group grid grid-cols-1 lg:grid-cols-3 overflow-hidden cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Left Column (2 Cols): Wide Cinematic Visual Chamber */}
        <div className="lg:col-span-2 relative aspect-[16/9] lg:aspect-auto lg:min-h-[440px] bg-neutral-950 overflow-hidden flex items-center justify-center">
          {/* Cover image as base */}
          {specimen.image && (
            <Image
              src={specimen.image}
              alt={specimen.title}
              fill
              priority
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
            />
          )}

          {/* Video preview on hover */}
          {specimen.videoSrc && (
            <video
              ref={videoRef}
              src={specimen.videoSrc}
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
          )}

          {/* Subtle dark vignette overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-15 pointer-events-none"
            aria-hidden="true"
          />

          {/* Play/Inspect indicator */}
          <div className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-500 transition-all duration-300">
            <Play className="w-4 h-4 fill-white text-white ml-0.5" />
          </div>

          {/* Live Empirical Metric Overlay in bottom left */}
          <div className="absolute bottom-4 left-4 z-20 px-3 py-1.5 rounded-lg bg-neutral-900/80 backdrop-blur-md border border-neutral-700/80 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[10px] text-neutral-300 uppercase tracking-wider">
              {specimen.empiricalMetric.label}:
            </span>
            <span className="font-mono text-xs font-bold text-brand-300">
              {specimen.empiricalMetric.value}
            </span>
          </div>
        </div>

        {/* Right Column (1 Col): Editorial Metadata & Author Info */}
        <div className="lg:col-span-1 p-8 sm:p-10 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-neutral-200/80 bg-[#FAFAFC]">
          <div>
            {/* Date & Read Time */}
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-500 font-semibold mb-3">
              <span>{specimen.date}</span>
              <span>•</span>
              <span>{specimen.readTime}</span>
            </div>

            {/* L2 Service Pill */}
            <div className="mb-3">
              <span className="inline-block font-tech text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 border border-brand-200 uppercase tracking-wider">
                {serviceLabel}
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-neutral-950 leading-snug group-hover:text-brand-600 transition-colors duration-300 mb-4">
              {specimen.title}
            </h2>

            {/* Excerpt */}
            <p className="text-sm sm:text-base text-neutral-600 font-sans leading-relaxed line-clamp-4 mb-6">
              {specimen.excerpt}
            </p>
          </div>

          {/* Bottom Author Section matching Neiden reference */}
          <div className="pt-6 border-t border-neutral-200/60 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-neutral-900 to-brand-700 text-white flex items-center justify-center font-display font-bold text-xs shrink-0 shadow-xs">
              {specimen.author.charAt(0)}
            </div>
            <div className="min-w-0">
              <span className="text-[11px] font-sans text-neutral-400 block leading-tight">
                Article by
              </span>
              <span className="text-xs font-sans font-semibold text-neutral-900 truncate block">
                {specimen.author}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
