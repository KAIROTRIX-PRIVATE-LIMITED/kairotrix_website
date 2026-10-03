'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronDown, X } from 'lucide-react';
import { revealTag } from '@/lib/animations';

export interface TechCategoryFilterItem {
  id: string;
  label: string;
  count: number;
}

interface InsightsFilterBarProps {
  activeCategory: string;
  onSelectCategory: (categoryId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalCount: number;
  categories: TechCategoryFilterItem[];
  allCategories?: { id: string; label: string }[];
}

export function InsightsFilterBar({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  totalCount,
  categories,
  allCategories = [],
}: InsightsFilterBarProps) {
  const isFiltered = activeCategory !== 'all' || searchQuery.trim().length > 0;

  const handleReset = () => {
    onSelectCategory('all');
    onSearchChange('');
  };

  return (
    <div className="w-full border-y border-neutral-200/80 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Section: Tech Category Pills (with smooth horizontal scroll on mobile) */}
        <div className="lg:col-span-8 p-3.5 sm:p-5 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-neutral-200/80">
          <div className="flex items-center justify-between gap-3 mb-2">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
              <span className="font-mono text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-neutral-500">
                Filter by Topic ({totalCount})
              </span>
            </div>

            {isFiltered && (
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer shrink-0"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Tech Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none no-scrollbar -mx-3.5 px-3.5 sm:mx-0 sm:px-0">
            <motion.button
              initial="hidden"
              animate="visible"
              variants={revealTag}
              onClick={() => onSelectCategory('all')}
              className={`text-xs font-mono uppercase tracking-wider px-3.5 py-2 rounded-full transition-all shrink-0 cursor-pointer min-h-[38px] flex items-center justify-center ${
                activeCategory === 'all'
                  ? 'bg-neutral-950 text-white font-semibold shadow-xs'
                  : 'bg-neutral-100 text-neutral-600 hover:text-neutral-950 hover:bg-neutral-200'
              }`}
            >
              All Articles ({totalCount})
            </motion.button>

            {categories.map((cat, cIdx) => (
              <motion.button
                key={cat.id}
                initial="hidden"
                animate="visible"
                variants={revealTag}
                transition={{ delay: (cIdx + 1) * 0.04 }}
                onClick={() => onSelectCategory(cat.id)}
                className={`text-xs font-mono uppercase tracking-wider px-3.5 py-2 rounded-full transition-all shrink-0 cursor-pointer min-h-[38px] flex items-center justify-center ${
                  activeCategory === cat.id
                    ? 'bg-neutral-950 text-white font-semibold shadow-xs'
                    : 'bg-neutral-100 text-neutral-600 hover:text-neutral-950 hover:bg-neutral-200'
                }`}
              >
                {cat.label} ({cat.count})
              </motion.button>
            ))}
          </div>
        </div>

        {/* Right Section: Search */}
        <div className="lg:col-span-4 p-3.5 sm:p-5 flex items-center justify-between relative bg-white min-h-[52px]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search articles, topics, tech..."
            className="w-full pr-8 font-mono text-xs sm:text-sm text-neutral-900 tracking-wider bg-transparent placeholder:text-neutral-400 focus:outline-none min-h-[44px]"
          />
          {searchQuery ? (
            <button
              onClick={() => onSearchChange('')}
              className="p-2 text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <Search className="w-4 h-4 text-neutral-400 pointer-events-none shrink-0" />
          )}
        </div>
      </div>
    </div>
  );
}
