'use client';

import React, { useState } from 'react';
import {
  Clock,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Code2,
  Bot,
  Workflow,
  BarChart3,
  Palette,
  CheckCircle2,
  Info,
} from 'lucide-react';

interface RoleItem {
  id: string;
  title: string;
  domain: string;
  projectScope: string;
  duration: string;
  responsibilities?: string[];
  requiredSkills?: string[];
  supervisor?: string;
  workingExpectations?: string;
  compensationTerms?: string;
}

interface InternshipOpenRolesProps {
  roles: RoleItem[];
  onSelectRole: (roleTitle: string) => void;
}

const DOMAIN_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  'Software Development': Code2,
  'AI & Intelligent Systems': Bot,
  'Automation & Technology Integration': Workflow,
  'Data Analytics & Business Intelligence': BarChart3,
  'UI/UX Design': Palette,
};

export function InternshipOpenRoles({ roles, onSelectRole }: InternshipOpenRolesProps) {
  const [expandedRoleId, setExpandedRoleId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedRoleId(expandedRoleId === id ? null : id);
  };

  const handleApply = (roleTitle: string) => {
    onSelectRole(roleTitle);
    const formEl = document.getElementById('apply-form-section');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="open-roles" className="py-16 sm:py-20 bg-neutral-50/70 border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: 1 heading + 1 line of intro */}
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950">
            Open Internship Roles
          </h2>
          <p className="mt-2 text-base text-neutral-600">
            Select a project track below to pre-select it in your application, or apply generally.
          </p>
        </div>

        {/* 1-Sentence Warning */}
        <div className="max-w-2xl mx-auto mb-10 p-3.5 rounded-xl bg-purple-50/80 border border-purple-200 text-purple-900 text-xs sm:text-sm text-center flex items-center justify-center gap-2">
          <Info className="w-4 h-4 text-brand-600 shrink-0" />
          <span>
            <strong>Note:</strong> Role selection indicates your preference; our engineering team determines final matches during review.
          </span>
        </div>

        {/* 5 Simple Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {roles.map((role) => {
            const IconComponent = DOMAIN_ICONS[role.domain] || Code2;
            const isExpanded = expandedRoleId === role.id;

            return (
              <div
                key={role.id}
                className="flex flex-col justify-between p-6 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs hover:border-brand-500/50 hover:shadow-card transition-all"
              >
                <div>
                  {/* Top Bar: Icon + Duration badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-brand-50 text-brand-600 border border-brand-200/60">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-600 text-xs font-medium">
                      <Clock className="w-3 h-3 text-neutral-400" />
                      <span>{role.duration || '8–12 Weeks'}</span>
                    </div>
                  </div>

                  {/* Role Title */}
                  <h3 className="text-lg font-bold text-neutral-950 leading-snug">
                    {role.title}
                  </h3>

                  {/* One Line Description */}
                  <p className="mt-2 text-sm text-neutral-600 leading-relaxed line-clamp-2">
                    {role.projectScope}
                  </p>

                  {/* Expandable Details (Tech Stacks & Project Scope) */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-neutral-100 space-y-3 text-xs animate-in fade-in duration-200">
                      {role.requiredSkills && role.requiredSkills.length > 0 && (
                        <div>
                          <span className="font-semibold text-neutral-900 block mb-1.5">Tech Stack:</span>
                          <div className="flex flex-wrap gap-1.5">
                            {role.requiredSkills.map((skill, sIdx) => (
                              <span
                                key={sIdx}
                                className="px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-700 font-mono text-[11px]"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {role.responsibilities && role.responsibilities.length > 0 && (
                        <div>
                          <span className="font-semibold text-neutral-900 block mb-1">Key Focus:</span>
                          <ul className="space-y-1 text-neutral-600 pl-4 list-disc">
                            {role.responsibilities.slice(0, 3).map((resp, rIdx) => (
                              <li key={rIdx}>{resp}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {role.supervisor && (
                        <div className="text-[11px] text-neutral-500 pt-1">
                          Mentored by: <span className="font-medium text-neutral-700">{role.supervisor}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Actions: View Details Toggle & Apply Button */}
                <div className="mt-5 pt-4 border-t border-neutral-100 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => toggleExpand(role.id)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-600 hover:text-brand-600 transition-colors py-1"
                  >
                    <span>{isExpanded ? 'Hide details' : 'View details'}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleApply(role.title)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 transition-colors shadow-2xs"
                  >
                    <span>Apply</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
