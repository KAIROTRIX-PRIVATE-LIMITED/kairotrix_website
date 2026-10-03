'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SOLUTIONS_DATA, type SolutionDetail } from '@/data/solutionsData';

interface SolutionScreenNavProps {
  solution: SolutionDetail;
}

export function SolutionScreenNav({ solution }: SolutionScreenNavProps) {
  const prevSolution = SOLUTIONS_DATA[solution.prevSlug];
  const nextSolution = SOLUTIONS_DATA[solution.nextSlug];

  const [hasScrolledPastHero, setHasScrolledPastHero] = useState(false);
  const [isNearBottom, setIsNearBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollPosition = scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      setHasScrolledPastHero(scrollY > 550);
      // Fade out when within 600px of page bottom so it doesn't collide with footer
      setIsNearBottom(documentHeight - scrollPosition < 600);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!prevSolution && !nextSolution) return null;

  return (
    <>
      {/* ─── DESKTOP & TABLET: SCREEN-EDGE LEFT & RIGHT BUTTONS (SCROLLED) ─── */}
      <nav
        aria-label="Solution navigation"
        className={`hidden md:block transition-all duration-300 pointer-events-none ${
          hasScrolledPastHero && !isNearBottom
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-3'
        }`}
      >
        {/* LEFT END OF SCREEN: PREVIOUS SOLUTION */}
        {prevSolution && (
          <div className="fixed left-0 top-1/2 -translate-y-1/2 z-40 pointer-events-auto">
            <Link
              href={`/solutions/${prevSolution.slug}`}
              aria-label={`Previous Solution: ${prevSolution.title}`}
              className="group relative flex items-center pl-3.5 pr-4 py-3.5 rounded-r-2xl sm:rounded-r-3xl rounded-l-none bg-gradient-to-b from-white via-purple-50 to-purple-100 hover:from-brand-600 hover:via-brand-600 hover:to-brand-700 backdrop-blur-xl border-y border-r border-purple-200/90 hover:border-brand-500 shadow-[0_20px_40px_-4px_rgba(147,51,234,0.4),0_10px_20px_-2px_rgba(0,0,0,0.18),0_4px_8px_rgba(0,0,0,0.08),inset_0_2px_1px_rgba(255,255,255,1),inset_0_-3px_6px_rgba(147,51,234,0.2)] hover:shadow-[0_22px_45px_-4px_rgba(147,51,234,0.55),0_12px_24px_-2px_rgba(0,0,0,0.25)] transition-all duration-300 hover:translate-x-1 active:scale-[0.98] cursor-pointer"
            >
              {/* Tactical Arrow Puck */}
              <div className="w-8 h-8 rounded-xl bg-white/90 group-hover:bg-white text-brand-600 group-hover:text-brand-600 flex items-center justify-center transition-colors duration-300 shrink-0 shadow-xs">
                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-300 stroke-[2.5]" />
              </div>

              {/* Telemetry & Title (Expanded on XL+) */}
              <div className="hidden xl:flex flex-col text-left pl-2.5 pr-2 max-w-[160px]">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500 group-hover:bg-white group-hover:animate-pulse transition-colors" />
                  <span className="text-[10px] font-tech font-extrabold text-brand-600 group-hover:text-white uppercase tracking-wider transition-colors">
                    PREV SOLUTION
                  </span>
                </div>
                <span className="text-xs font-bold text-neutral-900 group-hover:text-white transition-colors truncate">
                  {prevSolution.title}
                </span>
              </div>
            </Link>
          </div>
        )}

        {/* RIGHT END OF SCREEN: NEXT SOLUTION */}
        {nextSolution && (
          <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 pointer-events-auto">
            <Link
              href={`/solutions/${nextSolution.slug}`}
              aria-label={`Next Solution: ${nextSolution.title}`}
              className="group relative flex items-center pr-3.5 pl-4 py-3.5 rounded-l-2xl sm:rounded-l-3xl rounded-r-none bg-gradient-to-b from-white via-purple-50 to-purple-100 hover:from-brand-600 hover:via-brand-600 hover:to-brand-700 backdrop-blur-xl border-y border-l border-purple-200/90 hover:border-brand-500 shadow-[0_20px_40px_-4px_rgba(147,51,234,0.4),0_10px_20px_-2px_rgba(0,0,0,0.18),0_4px_8px_rgba(0,0,0,0.08),inset_0_2px_1px_rgba(255,255,255,1),inset_0_-3px_6px_rgba(147,51,234,0.2)] hover:shadow-[0_22px_45px_-4px_rgba(147,51,234,0.55),0_12px_24px_-2px_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-x-1 active:scale-[0.98] cursor-pointer"
            >
              {/* Telemetry & Title (Expanded on XL+) */}
              <div className="hidden xl:flex flex-col text-right pr-2.5 pl-2 max-w-[160px]">
                <div className="flex items-center justify-end gap-1.5">
                  <span className="text-[10px] font-tech font-extrabold text-brand-600 group-hover:text-white uppercase tracking-wider transition-colors">
                    NEXT SOLUTION
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500 group-hover:bg-white group-hover:animate-pulse transition-colors" />
                </div>
                <span className="text-xs font-bold text-neutral-900 group-hover:text-white transition-colors truncate">
                  {nextSolution.title}
                </span>
              </div>

              {/* Tactical Arrow Puck */}
              <div className="w-8 h-8 rounded-xl bg-white/90 group-hover:bg-white text-brand-600 group-hover:text-brand-600 flex items-center justify-center transition-colors duration-300 shrink-0 shadow-xs">
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300 stroke-[2.5]" />
              </div>
            </Link>
          </div>
        )}
      </nav>

      {/* ─── MOBILE ONLY: FLOATING DOCKED BOTTOM SOLUTION SWITCHER ─── */}
      <div
        className={`md:hidden fixed bottom-4 pb-safe inset-x-4 z-40 transition-all duration-300 ${
          isNearBottom ? 'opacity-0 translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'
        }`}
      >
        <div className="flex items-center justify-between gap-2 p-1.5 sm:p-2 rounded-2xl bg-white/95 backdrop-blur-xl border border-brand-200 shadow-[0_8px_30px_rgba(147,51,234,0.12)]">
          {prevSolution ? (
            <Link
              href={`/solutions/${prevSolution.slug}`}
              className="flex items-center gap-1.5 px-3 py-2.5 min-h-[44px] rounded-xl bg-brand-50/80 hover:bg-brand-600 text-brand-700 hover:text-white text-xs font-tech font-semibold transition-colors truncate max-w-[45%]"
            >
              <ChevronLeft className="w-4 h-4 shrink-0 text-brand-600 group-hover:text-white" />
              <span className="truncate">{prevSolution.title}</span>
            </Link>
          ) : (
            <div />
          )}

          <span className="text-[10px] font-tech font-bold text-neutral-400 px-1 uppercase tracking-wider">
            SOLUTIONS
          </span>

          {nextSolution ? (
            <Link
              href={`/solutions/${nextSolution.slug}`}
              className="flex items-center justify-end gap-1.5 px-3 py-2.5 min-h-[44px] rounded-xl bg-brand-50/80 hover:bg-brand-600 text-brand-700 hover:text-white text-xs font-tech font-semibold transition-colors truncate max-w-[45%]"
            >
              <span className="truncate">{nextSolution.title}</span>
              <ChevronRight className="w-4 h-4 shrink-0 text-brand-600 group-hover:text-white" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </>
  );
}
