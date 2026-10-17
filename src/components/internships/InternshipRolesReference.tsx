'use client';

import React, { useState } from 'react';
import {
  Briefcase,
  User,
  Clock,
  Code2,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Sparkles,
  Info,
} from 'lucide-react';

interface RoleItem {
  id: string;
  title: string;
  domain: string;
  responsibilities: string[];
  requiredSkills: string[];
  eligibility: string;
  projectScope: string;
  supervisor: string;
  duration: string;
  workingExpectations: string;
  compensationTerms: string;
  completionCriteria: string;
}

interface InternshipRolesReferenceProps {
  roles: RoleItem[];
}

export function InternshipRolesReference({ roles }: InternshipRolesReferenceProps) {
  const [selectedRole, setSelectedRole] = useState<RoleItem | null>(null);

  if (!roles || roles.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-neutral-50 border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200/80 text-brand-700 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
            <Briefcase className="w-3.5 h-3.5 text-brand-600" />
            <span>Active Placement Scopes</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight">
            Current Project Scopes & Roles
          </h2>

          <p className="mt-3 text-sm sm:text-base text-neutral-600 leading-relaxed">
            These published scopes represent real engineering work underway at KAIROTRIX. They are managed independently by our administrators and serve as placement options during the evaluation process.
          </p>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map((role) => (
            <div
              key={role.id}
              className="p-6 rounded-3xl bg-white border border-neutral-200/90 shadow-2xs hover:shadow-card hover:border-brand-500/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-brand-50 text-brand-700 border border-brand-200/70">
                    {role.domain}
                  </span>
                  <span className="text-[11px] font-mono text-neutral-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {role.duration}
                  </span>
                </div>

                <h3 className="text-base font-bold text-neutral-950 leading-snug mb-2">
                  {role.title}
                </h3>

                <p className="text-xs text-neutral-600 leading-relaxed mb-4 line-clamp-3">
                  {role.projectScope}
                </p>

                <div className="pt-3 border-t border-neutral-100 flex flex-wrap gap-1.5 mb-4">
                  {role.requiredSkills.slice(0, 4).map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-neutral-100 text-neutral-700 border border-neutral-200"
                    >
                      {skill}
                    </span>
                  ))}
                  {role.requiredSkills.length > 4 && (
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-neutral-100 text-neutral-500">
                      +{role.requiredSkills.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                <span className="text-xs text-neutral-500 flex items-center gap-1.5 truncate max-w-[180px]">
                  <User className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                  <span className="truncate">{role.supervisor}</span>
                </span>

                <button
                  type="button"
                  onClick={() => setSelectedRole(role)}
                  className="text-xs font-semibold text-brand-600 hover:text-brand-800 flex items-center gap-1"
                >
                  <span>View Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Full Role Details */}
        {selectedRole && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/60 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-neutral-200 text-neutral-900">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-brand-50 text-brand-700 border border-brand-200">
                    {selectedRole.domain}
                  </span>
                  <h3 className="text-xl font-bold text-neutral-950 mt-2">
                    {selectedRole.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedRole(null)}
                  className="p-2 rounded-xl text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100"
                >
                  ✕
                </button>
              </div>

              <div className="mt-6 space-y-6 text-sm">
                <div>
                  <h4 className="font-bold text-xs font-mono uppercase tracking-wider text-neutral-500 mb-2">
                    Project Scope & Engineering Objectives
                  </h4>
                  <p className="text-neutral-700 leading-relaxed bg-neutral-50 p-4 rounded-xl border border-neutral-200/80">
                    {selectedRole.projectScope}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-xs font-mono uppercase tracking-wider text-neutral-500 mb-2">
                    Key Technical Responsibilities
                  </h4>
                  <ul className="space-y-2">
                    {selectedRole.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-neutral-700">
                        <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80">
                    <span className="font-mono text-xs uppercase text-neutral-500 font-bold block mb-1">
                      Mentor / Supervisor
                    </span>
                    <span className="font-semibold text-neutral-900 text-sm">{selectedRole.supervisor}</span>
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80">
                    <span className="font-mono text-xs uppercase text-neutral-500 font-bold block mb-1">
                      Duration & Schedule
                    </span>
                    <span className="font-semibold text-neutral-900 text-sm">{selectedRole.duration}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-xs font-mono uppercase tracking-wider text-neutral-500 mb-2">
                    Working Expectations & Compensation
                  </h4>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {selectedRole.workingExpectations}
                  </p>
                  <p className="text-xs text-brand-700 font-semibold mt-1">
                    {selectedRole.compensationTerms}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-xs font-mono uppercase tracking-wider text-neutral-500 mb-2">
                    Documented Completion Criteria
                  </h4>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {selectedRole.completionCriteria}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-brand-50 border border-brand-200/80 text-xs text-brand-900 flex items-start gap-3">
                  <Info className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Remember:</strong> All candidates apply through the general application form. You do not need to apply specifically to this title; administrators match qualified students during technical evaluation.
                  </span>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-neutral-200 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedRole(null);
                    const formSection = document.getElementById('apply-form-section');
                    if (formSection) formSection.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 shadow-sm transition-colors"
                >
                  Apply in General Application
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
