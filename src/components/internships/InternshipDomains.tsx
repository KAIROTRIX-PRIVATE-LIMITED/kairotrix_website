'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  Bot,
  Workflow,
  BarChart3,
  Palette,
  Info,
  Check,
  ArrowRight,
} from 'lucide-react';
import { INTERNSHIP_DOMAINS } from '@/lib/services/internshipService';

const DOMAIN_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  'software-development': Code2,
  'ai-intelligent-systems': Bot,
  'automation-technology-integration': Workflow,
  'data-analytics-bi': BarChart3,
  'ui-ux-design': Palette,
};

interface InternshipDomainsProps {
  onSelectDomainPreference?: (domainTitle: string) => void;
}

export function InternshipDomains({ onSelectDomainPreference }: InternshipDomainsProps) {
  const handleDomainClick = (domainTitle: string) => {
    if (onSelectDomainPreference) {
      onSelectDomainPreference(domainTitle);
    }
    const formSection = document.getElementById('apply-form-section');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="program-details" className="py-20 sm:py-28 bg-neutral-50/70 border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200/80 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
            <span className="font-mono text-xs uppercase tracking-wider text-brand-700 font-semibold">
              Exploratory Domains
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-950">
            Areas of Technology You May Explore
          </h2>

          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed">
            KAIROTRIX operates across five interconnected technology areas. Students can indicate one or more preferred areas of interest during application, or choose to be considered across all open project scopes.
          </p>
        </div>

        

        {/* 5 Exploratory Domains Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INTERNSHIP_DOMAINS.map((domain, index) => {
            const IconComponent = DOMAIN_ICONS[domain.id] || Code2;
            const isFullWidth = index === 4; // UI/UX centered or full-width on large screens

            return (
              <div
                key={domain.id}
                className={`group relative flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-white border border-neutral-200/90 shadow-2xs hover:shadow-card hover:border-brand-500/50 transition-all duration-300 hover:-translate-y-1 ${
                  isFullWidth ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div>
                  {/* Category Pill + Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="p-3 rounded-2xl bg-brand-50 text-brand-600 border border-brand-200/60 group-hover:scale-105 group-hover:bg-brand-500 group-hover:text-white transition-all duration-300">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-neutral-500 bg-neutral-100 px-2.5 py-1 rounded-full border border-neutral-200/60">
                      {domain.category}
                    </span>
                  </div>

                  {/* Title & Headline */}
                  <h3 className="text-xl font-bold text-neutral-950 group-hover:text-brand-700 transition-colors">
                    {domain.title}
                  </h3>
                  <p className="mt-1 text-xs font-semibold text-brand-600 font-mono">
                    {domain.headline}
                  </p>

                  <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                    {domain.description}
                  </p>
                </div>

                
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
