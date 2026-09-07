'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { X, ChevronDown, Cpu, BookOpen, FileText, FlaskConical, Sparkles } from 'lucide-react';
import { INSIGHT_DISCIPLINES } from '@/data/insightsData';

interface InsightsFilterBarProps {
  activeSection: string;
  activeDiscipline: string;
  blueprintCount: number;
  caseStudyCount: number;
  articleCount: number;
  researchCount: number;
  totalResults: number;
  totalAll: number;
  onSectionJump: (sectionId: string) => void;
  onDisciplineChange: (discipline: string) => void;
  onReset: () => void;
}

export function InsightsFilterBar({
  activeSection,
  activeDiscipline,
  blueprintCount,
  caseStudyCount,
  articleCount,
  researchCount,
  totalResults,
  totalAll,
  onSectionJump,
  onDisciplineChange,
  onReset,
}: InsightsFilterBarProps) {
  const isFiltered = activeDiscipline !== 'all';

  const SECTION_TABS = [
    { id: 'all', label: 'All Knowledge', count: totalResults, icon: null },
    { id: 'blueprints', label: 'System Blueprints', count: blueprintCount, icon: Cpu },
    { id: 'case-studies', label: 'Case Studies', count: caseStudyCount, icon: BookOpen },
    { id: 'articles', label: 'Articles & Blog', count: articleCount, icon: FileText },
    { id: 'research', label: 'Research & Papers', count: researchCount, icon: FlaskConical },
  ];

  return (
    <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
      {/* ─── KNOWLEDGE PILLAR JUMP TABS ─── */}
      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
        {SECTION_TABS.map((tab) => {
          const isActive = activeSection === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onSectionJump(tab.id)}
              className={`relative px-3.5 py-2 rounded-xl font-tech text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'text-white'
                  : 'text-neutral-600 hover:text-neutral-900 bg-neutral-100/80 hover:bg-neutral-200/70 border border-neutral-200/60'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeInsightsPill"
                  className="absolute inset-0 bg-neutral-900 rounded-xl shadow-xs"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {Icon && <Icon className="w-3.5 h-3.5" />}
                <span>{tab.label}</span>
                {tab.count !== null && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-md font-mono ${
                      isActive ? 'bg-white/20 text-white' : 'bg-neutral-200 text-neutral-600'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      {/* ─── DISCIPLINE SELECTOR & RESET ─── */}
      <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
        <div className="relative min-w-[200px] sm:min-w-[240px]">
          <select
            value={activeDiscipline}
            onChange={(e) => onDisciplineChange(e.target.value)}
            className="w-full appearance-none px-3.5 py-2 pr-9 rounded-xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/80 font-tech text-xs text-neutral-800 font-semibold tracking-wide uppercase transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
          >
            {INSIGHT_DISCIPLINES.map((d) => (
              <option key={d.id} value={d.id}>
                {d.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 pointer-events-none" />
        </div>

        {isFiltered && (
          <button
            onClick={onReset}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-brand-50 hover:bg-brand-100 text-brand-700 border border-brand-200 text-xs font-tech font-semibold tracking-wider uppercase transition-colors cursor-pointer shrink-0"
          >
            <X className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        )}
      </div>
    </div>
  );
}
