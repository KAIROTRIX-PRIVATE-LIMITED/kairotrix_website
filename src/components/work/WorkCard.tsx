'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, Play, Terminal, ShieldCheck, Sparkles, Cpu, CheckCircle2 } from 'lucide-react';
import type { WorkSpecimen } from '@/data/workData';

interface WorkCardProps {
  specimen: WorkSpecimen;
  index: number;
}

export function WorkCard({ specimen, index }: WorkCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handleMouseEnter = () => {
    if (specimen.video && videoRef.current) {
      videoRef.current.play().then(() => {
        setIsVideoPlaying(true);
      }).catch(() => {
        // Autoplay policy fallback
      });
    }
  };

  const handleMouseLeave = () => {
    if (specimen.video && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsVideoPlaying(false);
    }
  };

  // Badge badge styling
  const getBadgeStyle = (badge: WorkSpecimen['badge']) => {
    switch (badge) {
      case 'CLIENT PROJECT':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'KAIROTRIX BUILD':
        return 'bg-brand-50 text-brand-700 border-brand-200';
      case 'TECHNICAL DEMO':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'EXPERIMENT':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'CAPABILITY':
        return 'bg-purple-50 text-purple-700 border-purple-200';
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
      <Link href={`/work/${specimen.slug}`} className="flex flex-col h-full p-6 sm:p-7">
        {/* Top Meta Bar */}
        <div className="flex items-center justify-between gap-3 mb-5">
          <span
            className={`font-tech text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full border tracking-wider uppercase ${getBadgeStyle(
              specimen.badge
            )}`}
          >
            {specimen.badge}
          </span>
          <span className="font-tech text-[11px] text-neutral-600 uppercase tracking-wider">
            {specimen.year}
          </span>
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
          {specimen.video && (
            <video
              ref={videoRef}
              src={specimen.video}
              muted
              loop
              playsInline
              preload="none"
              className={`absolute inset-0 w-full h-full object-cover z-10 transition-opacity duration-500 ${
                isVideoPlaying ? 'opacity-90' : 'opacity-0'
              }`}
            />
          )}

          {/* Fallback 3D Artwork Image */}
          <div
            className={`relative z-0 flex items-center justify-center w-full h-full p-6 transition-opacity duration-500 ${
              isVideoPlaying ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <Image
              src={specimen.image}
              alt={specimen.title}
              width={180}
              height={180}
              className="max-h-full w-auto object-contain drop-shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Top Left Metric Tag */}
          <div className="absolute top-3 left-3 z-20 font-tech text-xs font-bold text-white px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md border border-white/10 shadow-sm flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
            <span>{specimen.metric}</span>
          </div>

          {/* Discipline Tag Bottom Right */}
          <div className="absolute bottom-3 right-3 z-20 font-tech text-[10px] uppercase font-semibold text-neutral-300 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md border border-white/10">
            {specimen.disciplineName}
          </div>
        </div>

        {/* Specimen Content */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-neutral-900 group-hover:text-brand-600 transition-colors uppercase tracking-tight leading-snug mb-2">
              {specimen.title}
            </h3>

            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal line-clamp-2 mb-4">
              {specimen.headline}
            </p>

            {/* Invariant Truth Box */}
            <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200/80 mb-4">
              <div className="flex items-center gap-1.5 text-[10px] font-tech font-semibold text-brand-700 uppercase tracking-wider mb-1">
                <ShieldCheck className="w-3 h-3 text-brand-600" />
                <span>ENGINEERING INVARIANT</span>
              </div>
              <p className="font-mono text-xs text-neutral-700 leading-relaxed">
                &ldquo;{specimen.invariant}&rdquo;
              </p>
            </div>
          </div>

          {/* Tech Badges & Footer Action */}
          <div>
            <div className="flex flex-wrap gap-1.5 mb-5">
              {specimen.techStack.slice(0, 4).map((tech, tIdx) => (
                <span
                  key={tIdx}
                  className="font-tech text-[10px] uppercase font-semibold px-2 py-0.5 rounded-md bg-neutral-100 border border-neutral-200/60 text-neutral-700"
                >
                  {tech}
                </span>
              ))}
              {specimen.techStack.length > 4 && (
                <span className="font-tech text-[10px] font-semibold px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-600">
                  +{specimen.techStack.length - 4}
                </span>
              )}
            </div>

            {/* Bottom Meta & Action Button */}
            <div className="pt-4 border-t border-neutral-100 flex items-center justify-between gap-4">
              <span className="font-tech text-[11px] text-neutral-600 uppercase tracking-wider truncate">
                {specimen.client}
              </span>

              <div className="shrink-0 w-9 h-9 rounded-full border border-neutral-300 group-hover:border-neutral-900 group-hover:bg-neutral-900 text-neutral-700 group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-2xs">
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
