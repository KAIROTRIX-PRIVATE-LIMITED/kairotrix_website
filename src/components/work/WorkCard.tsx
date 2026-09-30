'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import type { WorkSpecimen } from '@/data/workData';

interface WorkCardProps {
  specimen: WorkSpecimen;
  index: number;
}

export function WorkCard({ specimen, index }: WorkCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section
      className="sticky top-0 w-full h-screen h-[100dvh] overflow-hidden bg-black text-white group cursor-pointer border-t border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.85)]"
      style={{
        zIndex: index + 1,
      }}
    >
      <Link
        href={`/work/${specimen.slug}`}
        data-cursor="project"
        data-cursor-text="VIEW SPECIMEN ↗"
        className="block relative w-full h-full"
      >
        {/* === FULL-BLEED BACKGROUND MEDIA === */}
        {specimen.video ? (
          <video
            ref={videoRef}
            src={specimen.video}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out"
          />
        ) : (
          <div className="absolute inset-0 w-full h-full">
            <Image
              src={specimen.image}
              alt={specimen.title}
              fill
              sizes="100vw"
              priority={index === 0}
              className="object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out"
            />
          </div>
        )}

        {/* Cinematic Vignette Overlay for High Legibility */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/80 pointer-events-none transition-opacity duration-500 group-hover:opacity-90"
          aria-hidden="true"
        />

        {/* Ambient Brand Radial Glow on Hover */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand-500/20 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          aria-hidden="true"
        />

        {/* === CENTERED EDITORIAL CONTENT (COMPACT & BRAND FONTS) === */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-6 sm:px-12 md:px-16 lg:px-24">
          {/* Top: Client / Domain Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-xl border border-white/25 text-white font-display text-xs font-semibold tracking-wide transition-all duration-300 group-hover:scale-105 shadow-xl mb-4 sm:mb-6">
            <span>{specimen.client || specimen.disciplineName}</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-white/90 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>

          {/* Center: Headline (font-display Plus Jakarta Sans, Compact & Punchy) */}
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] text-white leading-[1.08] max-w-4xl mb-4 sm:mb-5 drop-shadow-2xl">
            {specimen.title}
          </h2>

          {/* 1-Line Subtitle (font-sans Geist) */}
          <p className="font-sans text-sm sm:text-base md:text-lg text-white/90 font-normal leading-relaxed max-w-2xl mx-auto drop-shadow-lg line-clamp-2">
            {specimen.headline || specimen.summary}
          </p>
        </div>

        {/* Bottom: Minimal Floating Tech Stack & Year */}
        <div className="absolute bottom-6 sm:bottom-10 left-0 right-0 z-20 flex flex-wrap items-center justify-center gap-2 px-6 pointer-events-none">
          {specimen.techStack.slice(0, 5).map((tech, tIdx) => (
            <span
              key={tIdx}
              className="font-mono text-[10px] sm:text-[11px] font-medium uppercase px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white/90 shadow-lg"
            >
              {tech}
            </span>
          ))}
          <span className="font-mono text-[10px] sm:text-[11px] font-medium px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white shadow-lg">
            {specimen.year}
          </span>
        </div>
      </Link>
    </section>
  );
}
