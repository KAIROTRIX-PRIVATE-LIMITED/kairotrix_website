'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Copy, Check, ArrowRight } from 'lucide-react';

const JOURNEY_STEPS = [
  {
    number: '01',
    title: 'We review your message',
    description:
      'We read what you\u0027re trying to build, improve, or solve and understand the context.',
  },
  {
    number: '02',
    title: 'We follow up',
    description:
      'We\u0027ll ask any questions needed to understand the situation and clarify next steps.',
  },
  {
    number: '03',
    title: 'We explore the right direction',
    description:
      'If there\u0027s a good fit, we\u0027ll discuss the approach, scope, and how to move forward.',
  },
];

export function ContactSidebar() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('connect@kairotrix.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* What to Expect — 3-Step Journey */}
      <div className="rounded-3xl p-6 sm:p-8 bg-white border border-neutral-200/90 shadow-sm">
        <h4 className="font-tech text-xs font-bold uppercase tracking-wider text-neutral-900 mb-6">
          What to Expect
        </h4>

        <div className="space-y-5">
          {JOURNEY_STEPS.map((step) => (
            <div key={step.number} className="flex items-start gap-3.5">
              <span className="font-mono text-xs font-bold text-brand-600 bg-brand-50 border border-brand-200/50 px-2 py-0.5 rounded-md shrink-0 mt-0.5">
                {step.number}
              </span>
              <div>
                <span className="font-display text-sm font-semibold text-neutral-950 block mb-0.5 leading-snug">
                  {step.title}
                </span>
                <span className="text-xs text-neutral-500 leading-relaxed">
                  {step.description}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Smaller trust statements */}
        <div className="mt-6 pt-5 border-t border-neutral-100 space-y-3">
          <div className="flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0 mt-1.5" />
            <div>
              <span className="text-xs font-semibold text-neutral-800 block">Talk to the people who build</span>
              <span className="text-[11px] text-neutral-500">
                You&apos;ll speak directly with the people involved in understanding, designing, and building the work.
              </span>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0 mt-1.5" />
            <div>
              <span className="text-xs font-semibold text-neutral-800 block">Handled responsibly</span>
              <span className="text-[11px] text-neutral-500">
                We treat the information you share responsibly and only use it to understand and respond to your inquiry.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Direct Email Tile */}
      <div className="rounded-3xl p-6 sm:p-8 bg-neutral-50/80 border border-neutral-200/90 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="font-tech text-xs font-semibold uppercase tracking-wider text-brand-600">
              Prefer Email?
            </span>
            <div className="p-2 rounded-xl bg-purple-50 text-purple-700 border border-purple-200">
              <Mail className="w-4 h-4" />
            </div>
          </div>

          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-5 font-normal">
            Prefer email or want to send a project brief? Reach us directly.
          </p>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs">
            <a
              href="mailto:connect@kairotrix.com"
              className="font-mono text-xs font-semibold text-neutral-900 hover:text-brand-600 transition-colors"
            >
              connect@kairotrix.com
            </a>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
              aria-label="Copy email address"
              title="Copy to clipboard"
            >
              {copied ? (
                <Check className="w-4 h-4 text-emerald-600" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Cross-link to Work */}
      <div className="rounded-3xl p-5 sm:p-6 bg-white border border-neutral-200/90 shadow-sm flex items-center justify-between">
        <span className="text-xs text-neutral-500 font-tech">Want to see what we&apos;ve built?</span>
        <Link
          href="/work"
          className="inline-flex items-center gap-1 font-tech text-xs font-bold text-brand-600 hover:text-brand-700 uppercase tracking-wider group"
        >
          <span>Explore Our Work</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
