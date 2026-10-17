'use client';

import React from 'react';
import { FileText, CheckCircle2, Video, Rocket } from 'lucide-react';

const STEPS = [
  {
    num: '01',
    title: 'Apply',
    desc: 'Submit our 2-minute general application with your background and project links.',
    icon: FileText,
  },
  {
    num: '02',
    title: 'Review',
    desc: 'Our engineering team reviews your practical code capability and problem-solving skills.',
    icon: CheckCircle2,
  },
  {
    num: '03',
    title: 'Interview',
    desc: 'A 20-minute technical discussion with a lead engineer on your projects and interests.',
    icon: Video,
  },
  {
    num: '04',
    title: 'Start',
    desc: 'Receive your written agreement, repository access, and start building live software.',
    icon: Rocket,
  },
];

export function InternshipSteps() {
  return (
    <section className="py-16 sm:py-20 bg-white border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: 1 heading + 1 line of intro */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950">
            How It Works
          </h2>
          <p className="mt-2 text-base text-neutral-600">
            From quick application to building production software in four transparent steps.
          </p>
        </div>

        {/* 4-Step Horizontal Line */}
        <div className="relative">
          {/* Subtle connecting line for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-0.5 bg-neutral-200 -translate-y-1/2 -z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {STEPS.map((s) => {
              const StepIcon = s.icon;
              return (
                <div
                  key={s.num}
                  className="p-6 rounded-2xl bg-neutral-50/90 border border-neutral-200/80 shadow-2xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs font-bold text-brand-700 bg-brand-50 px-2.5 py-1 rounded-full border border-brand-200">
                        Step {s.num}
                      </span>
                      <div className="p-2.5 rounded-xl bg-white border border-neutral-200/80 text-brand-600 shadow-2xs">
                        <StepIcon className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-neutral-950 mb-1">
                      {s.title}
                    </h3>

                    <p className="text-sm text-neutral-600 leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
