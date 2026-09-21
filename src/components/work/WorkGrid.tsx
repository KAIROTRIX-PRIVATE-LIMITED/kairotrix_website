'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { RotateCcw } from 'lucide-react';
import { WORK_SPECIMENS, WorkSpecimen, WORK_DISCIPLINES } from '@/data/workData';
import { WorkCard } from './WorkCard';

interface WorkGridProps {
  initialSpecimens?: WorkSpecimen[];
}

export function WorkGrid({ initialSpecimens }: WorkGridProps = {}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const allSpecimens =
    initialSpecimens && initialSpecimens.length > 0 ? initialSpecimens : WORK_SPECIMENS;

  // Read initial filter from URL query
  const initialDiscipline = searchParams.get('area') || 'all';
  const [activeDiscipline, setActiveDiscipline] = useState<string>(initialDiscipline);

  // Sync state if URL query params change
  useEffect(() => {
    const urlDiscipline = searchParams.get('area') || 'all';
    setActiveDiscipline(urlDiscipline);
  }, [searchParams]);

  // Update URL helper
  const handleDisciplineChange = (discipline: string) => {
    setActiveDiscipline(discipline);
    const params = new URLSearchParams();
    if (discipline !== 'all') params.set('area', discipline);

    const queryString = params.toString();
    const newPath = queryString ? `/work?${queryString}` : '/work';
    router.replace(newPath, { scroll: false });
  };

  const handleReset = () => {
    setActiveDiscipline('all');
    router.replace('/work', { scroll: false });
  };

  // Filtered specimens by discipline
  const filteredSpecimens = useMemo(() => {
    return allSpecimens.filter((specimen) => {
      return activeDiscipline === 'all' || specimen.disciplineId === activeDiscipline;
    });
  }, [allSpecimens, activeDiscipline]);

  return (
    <div className="relative w-full bg-[#FAFAFC]">
      {/* ─── HERO-TO-WORK TRANSITION SECTION (LIGHT THEME, COMPACT & BRAND FONTS) ─── */}
      <div
        id="selected-work"
        className="relative z-10 w-full bg-[#FAFAFC] pt-14 pb-10 sm:pt-20 sm:pb-12 px-4 sm:px-6 lg:px-8 text-center"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Eyebrow / Number */}
          <div className="flex items-center justify-center gap-3 mb-3 sm:mb-4">
            <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-pulse" />
            <span className="font-tech text-xs tracking-[0.25em] font-semibold text-brand-600 uppercase">
              WORK // PROJECTS &amp; EXPERIMENTS
            </span>
            <div className="h-px w-10 sm:w-16 bg-neutral-200" />
          </div>

          {/* Monumental Transition Title (font-display Plus Jakarta Sans) */}
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] text-neutral-950 uppercase leading-[1.12]">
            SELECTED <span className="gradient-signature-text">WORK.</span>
          </h2>

          {/* Plain-English Subtitle */}
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-neutral-600 max-w-xl mx-auto mb-8 leading-relaxed font-normal">
            Projects, experiments, and technical demonstrations across our core technology areas.
          </p>

          {/* Clean Non-Colliding Category Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
            {WORK_DISCIPLINES.map((discipline) => {
              const isActive = activeDiscipline === discipline.id;
              return (
                <button
                  key={discipline.id}
                  type="button"
                  onClick={() => handleDisciplineChange(discipline.id)}
                  className={`relative px-3.5 py-1.5 rounded-full font-display text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-white bg-brand-600 border border-brand-500 shadow-sm'
                      : 'text-neutral-600 hover:text-neutral-950 bg-white hover:bg-neutral-100 border border-neutral-200/80 shadow-2xs'
                  }`}
                >
                  <span>{discipline.label}</span>
                  {discipline.id === 'all' && (
                    <span
                      className={`ml-1.5 font-mono text-[10px] ${
                        isActive ? 'text-white/90' : 'text-neutral-400'
                      }`}
                    >
                      {allSpecimens.length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ─── FULL-BLEED STICKY STACKING CARDS ─── */}
      {filteredSpecimens.length > 0 ? (
        <div className="relative w-full">
          {filteredSpecimens.map((specimen, idx) => (
            <WorkCard key={specimen.id} specimen={specimen} index={idx} />
          ))}
        </div>
      ) : (
        <div className="w-full min-h-[50vh] flex flex-col items-center justify-center text-center p-8 bg-[#FAFAFC] text-neutral-900">
          <h4 className="text-2xl font-bold mb-3 text-neutral-900">No work found in this area</h4>
          <p className="text-base text-neutral-600 mb-8 max-w-md">
            Try selecting another category or clear your active filter to view all work.
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-neutral-900 text-white font-tech text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-colors cursor-pointer shadow-sm"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Show All Work</span>
          </button>
        </div>
      )}
    </div>
  );
}
