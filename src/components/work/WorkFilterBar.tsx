'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { WORK_DISCIPLINES } from '@/data/workData';

interface WorkFilterBarProps {
  activeDiscipline: string;
  totalResults: number;
  totalAll: number;
  onDisciplineChange: (discipline: string) => void;
  onReset: () => void;
}

export function WorkFilterBar({
  activeDiscipline,
  totalResults,
  totalAll,
  onDisciplineChange,
  onReset,
}: WorkFilterBarProps) {
  return (
    <nav
      aria-label="Filter Projects by Discipline"
      className="fixed top-20 sm:top-22 left-1/2 -translate-x-1/2 z-40 max-w-[92vw] sm:max-w-none overflow-x-auto p-1.5 rounded-full bg-black/60 backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.8)] flex items-center gap-1 scrollbar-none"
    >
      {WORK_DISCIPLINES.map((discipline) => {
        const isActive = activeDiscipline === discipline.id;
        return (
          <button
            key={discipline.id}
            type="button"
            onClick={() => onDisciplineChange(discipline.id)}
            className={`relative px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-tech text-[10px] sm:text-xs font-semibold tracking-wide uppercase transition-all duration-200 cursor-pointer whitespace-nowrap ${
              isActive
                ? 'text-white shadow-sm'
                : 'text-neutral-400 hover:text-white hover:bg-white/10'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="activeWorkDisciplinePill"
                className="absolute inset-0 bg-white/20 backdrop-blur-md rounded-full border border-white/30"
                transition={{ type: 'spring', stiffness: 450, damping: 35 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <span>{discipline.label}</span>
              {discipline.id === 'all' && (
                <span className="text-[10px] font-mono text-white/70">
                  {totalAll}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
