'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Clock, ShieldCheck, Terminal, Copy, Check, ArrowRight } from 'lucide-react';

export function ContactSidebar() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('connect@kairotrix.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Direct Email Tile */}
      <div className="rounded-3xl p-6 sm:p-8 bg-neutral-50/80 border border-neutral-200/90 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="font-tech text-xs font-semibold uppercase tracking-wider text-brand-600">
              Direct Communication
            </span>
            <div className="p-2 rounded-xl bg-purple-50 text-purple-700 border border-purple-200">
              <Mail className="w-4 h-4" />
            </div>
          </div>

          <h3 className="text-xl font-bold text-neutral-950 mb-2">
            Email Us Directly
          </h3>

          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-6 font-normal">
            Prefer email or want to send an existing technical brief or RFC? Send your specifications directly to our engineering team.
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

      {/* Engineering Commitment Card */}
      <div className="rounded-3xl p-6 sm:p-8 bg-white border border-neutral-200/90 shadow-sm space-y-6">
        <div>
          <h4 className="font-tech text-xs font-bold uppercase tracking-wider text-neutral-900 mb-4">
            Our Engineering Invariants
          </h4>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-tech text-xs font-semibold text-neutral-900 uppercase tracking-wider block">
                  &lt; 24-Hour Turnaround
                </span>
                <span className="text-xs text-neutral-500">
                  Every technical inquiry is reviewed and answered within one business day.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Terminal className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-tech text-xs font-semibold text-neutral-900 uppercase tracking-wider block">
                  Direct Principal Engineers
                </span>
                <span className="text-xs text-neutral-500">
                  You communicate directly with systems architects who write the code.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-tech text-xs font-semibold text-neutral-900 uppercase tracking-wider block">
                  100% Confidential
                </span>
                <span className="text-xs text-neutral-500">
                  All ideas, workflows, and technical details remain under strict NDA protection.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Cross-Link */}
        <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
          <span className="text-xs text-neutral-500 font-tech">Want to inspect code first?</span>
          <Link
            href="/work"
            className="inline-flex items-center gap-1 font-tech text-xs font-bold text-brand-600 hover:text-brand-700 uppercase tracking-wider group"
          >
            <span>Explore Work</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
