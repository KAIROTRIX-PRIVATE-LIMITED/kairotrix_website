'use client';

import React from 'react';
import { ShieldCheck, Scale, FileText, Lock, CheckCircle2, AlertTriangle } from 'lucide-react';

export function InternshipTermsLegal() {
  return (
    <section className="py-16 sm:py-24 bg-neutral-900 text-neutral-100 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 border border-brand-500/30 text-brand-300 mb-3">
            <Scale className="w-4 h-4" />
            <span className="font-mono text-xs uppercase tracking-wider font-semibold">
              Legal Compliance & Governance
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Program Transparency & Compliance Standards
          </h2>

          <p className="mt-4 text-base text-neutral-400 leading-relaxed">
            KAIROTRIX upholds strict compliance with applicable Indian central and state labour regulations, student data privacy safeguards, and transparent compensation standards.
          </p>
        </div>

        {/* 4 Compliance Safeguards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-6 rounded-2xl bg-neutral-800/80 border border-neutral-700/80">
            <div className="p-2.5 rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/20 w-fit mb-4">
              <Scale className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Indian Labour Law Alignment</h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              We do not rely on informal unpaid assumptions. All internships feature documented agreements, structured learning curriculums, and milestone stipends adhering to Indian statutory norms.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-800/80 border border-neutral-700/80">
            <div className="p-2.5 rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/20 w-fit mb-4">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">DPDP Act Data Protection</h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Applicant contact details, educational records, and uploaded résumés are encrypted and stored in full alignment with the Digital Personal Data Protection (DPDP) Act.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-800/80 border border-neutral-700/80">
            <div className="p-2.5 rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/20 w-fit mb-4">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Written Agreements & IP</h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Every accepted candidate receives an official written agreement with explicit disclosures on assigned duties, duration, supervisor, IP ownership, and termination terms.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-800/80 border border-neutral-700/80">
            <div className="p-2.5 rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/20 w-fit mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Academic & College NOC</h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              We provide formal documentation, supervisor letters, and progress evaluations required by university internship cells or placement coordinators for academic credits.
            </p>
          </div>

        </div>

        {/* Clear Legal Disclaimer Footer */}
        <div className="mt-10 p-5 rounded-2xl bg-neutral-950/60 border border-neutral-800 text-xs text-neutral-400 leading-relaxed text-center max-w-4xl mx-auto">
          <p>
            <strong className="text-neutral-200">Notice on Employment & Accreditation:</strong> KAIROTRIX internships are structured professional learning programs designed to equip students with real-world technology competencies. Participation does not constitute a guarantee of permanent employment, university accreditation, or statutory credentials not explicitly issued by KAIROTRIX.
          </p>
        </div>

      </div>
    </section>
  );
}
