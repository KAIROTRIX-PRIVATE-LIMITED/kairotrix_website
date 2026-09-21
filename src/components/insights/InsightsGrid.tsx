'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import {
  INSIGHT_SPECIMENS,
  TECH_CATEGORIES,
  type InsightSpecimen,
} from '@/data/insightsData';
import { InsightsCard } from './InsightsCard';
import { InsightsFilterBar, type TechCategoryFilterItem } from './InsightsFilterBar';

interface InsightsGridProps {
  initialInsights?: InsightSpecimen[];
}

interface BentoRowProps {
  pair: InsightSpecimen[];
  rowIndex: number;
}

function BentoRow({ pair, rowIndex }: BentoRowProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const isEvenRow = rowIndex % 2 === 0;

  // If only 1 card in row (single or remainder)
  if (pair.length === 1) {
    return (
      <div className="w-full flex">
        <InsightsCard
          specimen={pair[0]}
          index={rowIndex * 2}
          isSingle={true}
          className="w-full min-h-[420px] sm:min-h-[460px] lg:min-h-[480px]"
        />
      </div>
    );
  }

  // 2 cards in row: determine fluid flex proportions based on hover state
  // Default proportions: Even rows are [6.5 vs 4.5], Odd rows are [4.5 vs 6.5]
  let flexA = isEvenRow ? 'md:flex-[6.5]' : 'md:flex-[4.5]';
  let flexB = isEvenRow ? 'md:flex-[4.5]' : 'md:flex-[6.5]';

  // When Card 0 is hovered: Card 0 expands, Card 1 contracts
  if (hoveredIdx === 0) {
    flexA = 'md:flex-[7.5]';
    flexB = 'md:flex-[3.5]';
  }
  // When Card 1 is hovered: Card 1 expands, Card 0 contracts (SWAPS SIZE!)
  else if (hoveredIdx === 1) {
    flexA = 'md:flex-[3.5]';
    flexB = 'md:flex-[7.5]';
  }

  return (
    <div className="flex flex-col md:flex-row gap-5 sm:gap-6 lg:gap-8 w-full">
      {/* Card A */}
      <motion.div
        layout
        transition={{ layout: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
        className={`w-full ${flexA} transition-[flex] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]`}
        onMouseEnter={() => setHoveredIdx(0)}
        onMouseLeave={() => setHoveredIdx(null)}
      >
        <InsightsCard
          specimen={pair[0]}
          index={rowIndex * 2}
          isParentHovered={hoveredIdx === 0}
          className="w-full h-full min-h-[420px] sm:min-h-[460px] lg:min-h-[500px]"
        />
      </motion.div>

      {/* Card B */}
      <motion.div
        layout
        transition={{ layout: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
        className={`w-full ${flexB} transition-[flex] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]`}
        onMouseEnter={() => setHoveredIdx(1)}
        onMouseLeave={() => setHoveredIdx(null)}
      >
        <InsightsCard
          specimen={pair[1]}
          index={rowIndex * 2 + 1}
          isParentHovered={hoveredIdx === 1}
          className="w-full h-full min-h-[420px] sm:min-h-[460px] lg:min-h-[500px]"
        />
      </motion.div>
    </div>
  );
}

export function InsightsGrid({ initialInsights }: InsightsGridProps = {}) {
  const allInsights = initialInsights && initialInsights.length > 0 ? initialInsights : INSIGHT_SPECIMENS;
  const searchParams = useSearchParams();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Synchronize with URL search params
  useEffect(() => {
    const categoryParam = searchParams.get('category') || searchParams.get('area') || searchParams.get('service');
    if (categoryParam) {
      setActiveCategory(categoryParam);
    }
    const queryParam = searchParams.get('q');
    if (queryParam) {
      setSearchQuery(queryParam);
    }
  }, [searchParams]);

  // Dynamic counts for active Tech Categories
  const categoryFilters: TechCategoryFilterItem[] = useMemo(() => {
    return TECH_CATEGORIES.filter((c) => c.id !== 'all').map((cat) => {
      const count = allInsights.filter((s) => s.techCategoryId === cat.id).length;
      return {
        id: cat.id,
        label: cat.label,
        count,
      };
    });
  }, [allInsights]);

  // Complete Tech Categories catalog for dropdown
  const allCatalogCategories = useMemo(() => {
    return TECH_CATEGORIES.filter((c) => c.id !== 'all').map((c) => ({
      id: c.id,
      label: c.label,
    }));
  }, []);

  // Filtered insights based on Tech Category & search query
  const filteredInsights = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return allInsights.filter((specimen) => {
      // 1. Filter by Tech Category
      if (activeCategory !== 'all' && specimen.techCategoryId !== activeCategory) {
        return false;
      }

      // 2. Filter by search query
      if (q) {
        const matchesTitle = specimen.title.toLowerCase().includes(q);
        const matchesSubtitle = specimen.subtitle.toLowerCase().includes(q);
        const matchesExcerpt = specimen.excerpt.toLowerCase().includes(q);
        const matchesTags = specimen.tags.some((t) => t.toLowerCase().includes(q));
        const matchesCategory = (specimen.techCategoryLabel || '').toLowerCase().includes(q);
        const matchesAuthor = specimen.author.toLowerCase().includes(q);

        if (
          !matchesTitle &&
          !matchesSubtitle &&
          !matchesExcerpt &&
          !matchesTags &&
          !matchesCategory &&
          !matchesAuthor
        ) {
          return false;
        }
      }

      return true;
    });
  }, [allInsights, activeCategory, searchQuery]);

  // Group filtered insights into pairs of 2 for fluid bento swap rows
  const cardPairs = useMemo(() => {
    const pairs: InsightSpecimen[][] = [];
    for (let i = 0; i < filteredInsights.length; i += 2) {
      pairs.push(filteredInsights.slice(i, i + 2));
    }
    return pairs;
  }, [filteredInsights]);

  return (
    <section className="w-full bg-[#FAFAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ─── INTEGRATED TECH CATEGORIES FILTER & SEARCH BAR ─── */}
        <InsightsFilterBar
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          totalCount={allInsights.length}
          categories={categoryFilters}
          allCategories={allCatalogCategories}
        />

        {/* ─── DYNAMIC BENTO GRID WITH SMOOTH CARD SIZE SWAP ON HOVER ─── */}
        <div className="pt-6 sm:pt-8 pb-8 sm:pb-12">
          {cardPairs.length > 0 ? (
            <div className="flex flex-col gap-5 sm:gap-6 lg:gap-8">
              <AnimatePresence mode="popLayout">
                {cardPairs.map((pair, rowIndex) => (
                  <BentoRow
                    key={`row-${rowIndex}-${pair.map((p) => p.id).join('-')}`}
                    pair={pair}
                    rowIndex={rowIndex}
                  />
                ))}
              </AnimatePresence>
            </div>
          ) : (
            /* Empty State when search/filter has 0 matches */
            <div className="w-full py-24 flex flex-col items-center justify-center text-center p-8 rounded-3xl bg-neutral-50 border border-neutral-200/80">
              <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mb-4 text-neutral-400">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold font-display text-neutral-900 mb-2">
                No matching articles found
              </h3>
              <p className="text-sm text-neutral-600 font-sans max-w-md mb-6">
                No articles matched your search. Try another keyword or reset your active filters.
              </p>
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setSearchQuery('');
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-950 hover:bg-brand-600 text-white font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
