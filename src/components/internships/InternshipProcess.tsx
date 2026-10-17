'use client';

import React from 'react';
import {
  FileText,
  UserCheck,
  Code,
  Compass,
  Briefcase,
  FileCheck2,
  Rocket,
  CheckCircle,
  GraduationCap,
  Globe2,
  Sparkles,
  AlertCircle,
} from 'lucide-react';

const SELECTION_STEPS = [
  {
    step: '01',
    title: 'General Application Review',
    description: 'We review your background, courses, projects, GitHub repositories, and motivation from the single centralized application.',
    icon: FileText,
  },
  {
    step: '02',
    title: 'Skills & Potential Evaluation',
    description: 'Our engineering team assesses your technical capability, demonstrated curiosity, coding discipline, and weekly availability.',
    icon: UserCheck,
  },
  {
    step: '03',
    title: 'Technical Discussion / Assessment',
    description: 'Shortlisted candidates participate in a focused technical conversation or practical code walkthrough with an engineering mentor.',
    icon: Code,
  },
  {
    step: '04',
    title: 'Project & Supervisor Matching',
    description: 'We identify active internal engineering work streams, client deliverables, and assign an experienced lead engineer as mentor.',
    icon: Compass,
  },
  {
    step: '05',
    title: 'Final Role Determination',
    description: 'Administrators assign a specific internship role aligned with your proven abilities, expressed interests, and project capacity.',
    icon: Briefcase,
  },
  {
    step: '06',
    title: 'Written Offer & Disclosed Terms',
    description: 'We issue an official written offer explicitly outlining your role, supervisor, stipend terms, working hours, and completion criteria.',
    icon: FileCheck2,
  },
  {
    step: '07',
    title: 'Acceptance & Onboarding',
    description: 'Upon acceptance, you receive repository access, environment setup blueprints, and join our active communication channels.',
    icon: Rocket,
  },
];

export function InternshipProcess() {
  return (
    <section className="py-20 sm:py-28 bg-white text-neutral-900 border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200/80 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
            <span className="font-mono text-xs uppercase tracking-wider text-brand-700 font-semibold">
              The Journey
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-950">
            How Selection & Placement Works
          </h2>

          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed">
            Our selection process is designed to be transparent, merit-driven, and focused on practical software capabilities rather than textbook credentials.
          </p>
        </div>

        {/* 3 Core Pillars: Eligibility, Remote Work, Certificate Policy */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-20">
          
          {/* Eligibility */}
          <div className="p-6 sm:p-8 rounded-3xl bg-neutral-50 border border-neutral-200/80 shadow-2xs">
            <div className="p-3 rounded-2xl bg-white border border-neutral-200/80 text-brand-600 w-fit mb-5 shadow-2xs">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-neutral-950 mb-2">Student Eligibility</h3>
            <p className="text-sm text-neutral-600 leading-relaxed mb-4">
              Open to pre-final and final-year undergraduate or postgraduate students (B.Tech, BCA, MCA, B.Sc, M.Sc, or equivalent) with fundamental programming or design knowledge.
            </p>
            <ul className="space-y-2 text-xs text-neutral-700">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-brand-600" />
                <span>Enrolled students or recent graduates</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-brand-600" />
                <span>Hands-on project or repository proof required</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-brand-600" />
                <span>Minimum 15 hours/week commitment</span>
              </li>
            </ul>
          </div>


          {/* Certificate Policy */}
          <div className="p-6 sm:p-8 rounded-3xl bg-neutral-50 border border-neutral-200/80 shadow-2xs">
            <div className="p-3 rounded-2xl bg-white border border-neutral-200/80 text-brand-600 w-fit mb-5 shadow-2xs">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-neutral-950 mb-2">Verified Certificate Policy</h3>
            <p className="text-sm text-neutral-600 leading-relaxed mb-4">
              Certificates are earned through verified project milestone completion and code review signoffs. We do not distribute participation certificates without demonstrable work.
            </p>
            <ul className="space-y-2 text-xs text-neutral-700">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-brand-600" />
                <span>Unique verifiable verification ID</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-brand-600" />
                <span>Specific contribution & tech stack documented</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-brand-600" />
                <span>Letter of recommendation for top performers</span>
              </li>
            </ul>
          </div>

        </div>

        {/* 7-Step Selection Pipeline Stepper */}
        <div>
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-neutral-950">
              Structured 7-Step Selection Pipeline
            </h3>
            <p className="text-sm text-neutral-600 mt-2">
              From general application submission to final offer and verified completion.
            </p>
          </div>

          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-neutral-200 -translate-y-1/2 z-0" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4 relative z-10">
              {SELECTION_STEPS.map((step) => {
                const StepIcon = step.icon;
                return (
                  <div
                    key={step.step}
                    className="p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs hover:shadow-card hover:border-brand-500/40 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono text-xs font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full border border-brand-200/60">
                          {step.step}
                        </span>
                        <div className="p-2 rounded-xl bg-neutral-50 text-neutral-700 border border-neutral-200/60">
                          <StepIcon className="w-4 h-4 text-brand-600" />
                        </div>
                      </div>

                      <h4 className="text-sm font-bold text-neutral-950 mb-1.5 leading-snug">
                        {step.title}
                      </h4>
                      <p className="text-xs text-neutral-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
