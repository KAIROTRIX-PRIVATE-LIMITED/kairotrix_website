'use client';

import React from 'react';
import { Search, ChevronDown, X } from 'lucide-react';

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
        {/* Left Section: Tech Category Dropdown (Mobile) & Pills (Desktop) */}
        <div className="lg:col-span-8 p-4 sm:p-5 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-neutral-200/80">
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Mobile Dropdown */}
            <div className="relative flex-1 min-w-[220px] lg:hidden">
              <select
                value={activeCategory}
                onChange={(e) => onSelectCategory(e.target.value)}
                aria-label="Filter by Tech Category"
                className="w-full appearance-none bg-transparent font-mono text-xs text-neutral-900 font-bold tracking-wider uppercase cursor-pointer focus:outline-none pr-8 py-1.5"
              >
                <option value="all">ALL ARTICLES ({totalCount})</option>
                {allCategories.map((cat) => {
                  const match = categories.find((c) => c.id === cat.id);
                  return (
                    <option key={cat.id} value={cat.id}>
                      {cat.label.toUpperCase()} {match ? `(${match.count})` : ''}
                    </option>
                  );
                })}
              </select>
              <ChevronDown className="absolute right-1 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 pointer-events-none" />
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
          <div className="flex items-center gap-2 overflow-x-auto pt-2 pb-1 scrollbar-none no-scrollbar">
            <button
              onClick={() => onSelectCategory('all')}
              className={`text-[11px] font-mono uppercase tracking-wider px-3 py-1.5 rounded-full transition-all shrink-0 cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-neutral-950 text-white font-semibold shadow-xs'
                  : 'bg-neutral-100 text-neutral-600 hover:text-neutral-950 hover:bg-neutral-200'
              }`}
            >
              All Articles ({totalCount})
            </button>

            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`text-[11px] font-mono uppercase tracking-wider px-3 py-1.5 rounded-full transition-all shrink-0 cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-neutral-950 text-white font-semibold shadow-xs'
                    : 'bg-neutral-100 text-neutral-600 hover:text-neutral-950 hover:bg-neutral-200'
                }`}
              >
                {cat.label} ({cat.count})
              </button>
            ))}
          </div>
        </div>

        {/* Right Section: Search */}
        <div className="lg:col-span-4 p-4 sm:p-5 flex items-center justify-between relative bg-white">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search articles, topics, or technologies..."
            className="w-full pr-8 font-mono text-xs sm:text-sm text-neutral-900 tracking-wider bg-transparent placeholder:text-neutral-400 focus:outline-none"
          />
          {searchQuery ? (
            <button
              onClick={() => onSearchChange('')}
              className="p-1 text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer"
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
