'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface SolutionMarqueeProps {
  items: string[];
}

export function SolutionMarquee({ items }: SolutionMarqueeProps) {
  const shouldReduceMotion = useReducedMotion();

  // Duplicate items array to ensure a seamless infinite scroll loop
  const marqueeList = [...items, ...items, ...items, ...items];

  return (
    <div className="w-full py-3.5 sm:py-4 bg-neutral-50 border-b border-neutral-200 overflow-hidden select-none">
      <div className="relative flex items-center">
        {/* Left and Right fade gradients for luxury editorial finish */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-neutral-50 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-neutral-50 to-transparent z-10" />

        <motion.div
          animate={shouldReduceMotion ? {} : { x: ['0%', '-50%'] }}
          transition={{
            duration: 35,
            ease: 'linear',
            repeat: Infinity,
          }}
          className="flex shrink-0 items-center space-x-8 whitespace-nowrap"
        >
          {marqueeList.map((item, idx) => (
            <div key={idx} className="flex items-center space-x-8">
              <span className="font-tech text-xs sm:text-sm font-semibold tracking-[0.2em] text-neutral-700 uppercase">
                {item}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}


