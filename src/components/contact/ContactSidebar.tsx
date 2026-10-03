'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Copy, Check, ArrowRight } from 'lucide-react';
import { cardFromRight, EASE_CINEMATIC } from '@/lib/animations';

const ENGAGEMENT_STEPS = [
  {
    number: '01',
    title: 'We review your message',
    description: "Our engineering leads understand what you're trying to build, improve, or solve.",
  },
  {
    number: '02',
    title: 'We follow up directly',
    description: "We'll ask any questions needed to clarify requirements, scope, and technical direction.",
  },
  {
    number: '03',
    title: 'We explore the next step',
    description: "If there's a strong fit, we'll discuss the architecture, approach, and how to execute.",
  },
];

export function ContactSidebar() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('connect@kairotrix.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="space-y-6">
      {/* ── Direct Email Card ── */}
      <motion.div
        variants={cardFromRight}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55, delay: 0.1, ease: EASE_CINEMATIC }}
        className="rounded-2xl sm:rounded-3xl p-5 sm:p-8 bg-white border border-neutral-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.03)]"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            <span className="font-tech text-xs tracking-[0.2em] font-semibold uppercase text-brand-600">
              DIRECT CHANNEL
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-brand-50 text-brand-600 border border-brand-200/60">
            <Mail className="w-4 h-4" />
          </div>
        </div>

        <h3 className="font-display text-lg sm:text-xl font-bold text-neutral-950 mb-2">
          Prefer Direct Email?
        </h3>
        <p className="text-sm text-neutral-600 leading-relaxed mb-5 font-sans">
          Have an existing technical brief, RFPs, or prefer direct communication? Reach us directly anytime.
        </p>

        <div className="flex items-center justify-between p-3 sm:p-3.5 rounded-xl bg-neutral-50/80 border border-neutral-200 hover:border-brand-500/40 transition-colors min-h-[48px]">
          <a
            href="mailto:connect@kairotrix.com"
            className="font-mono text-xs sm:text-sm font-bold text-neutral-950 hover:text-brand-600 transition-colors truncate pr-2"
          >
            connect@kairotrix.com
          </a>
          <button
            type="button"
            onClick={handleCopyEmail}
            className="p-2 rounded-lg hover:bg-neutral-200/80 text-neutral-600 hover:text-neutral-950 transition-colors cursor-pointer shrink-0 min-h-[36px]"
            aria-label="Copy email address"
            title="Copy email to clipboard"
          >
            {copied ? (
              <span className="flex items-center gap-1 text-xs font-mono text-emerald-600 font-bold">
                <Check className="w-4 h-4" /> COPIED
              </span>
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>
      </motion.div>

      {/* ── What to Expect (3-Step Path) ── */}
      <motion.div
        variants={cardFromRight}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55, delay: 0.2, ease: EASE_CINEMATIC }}
        className="rounded-2xl sm:rounded-3xl p-5 sm:p-8 bg-white border border-neutral-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.03)]"
      >
        <div className="flex items-center justify-between mb-5">
          <span className="font-tech text-xs tracking-[0.2em] font-semibold uppercase text-brand-600">
            WHAT TO EXPECT
          </span>
          <span className="font-mono text-[11px] text-neutral-400 font-semibold uppercase">3-Step Path</span>
        </div>

        <div className="space-y-4">
          {ENGAGEMENT_STEPS.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.25 + idx * 0.08, ease: EASE_CINEMATIC }}
              className="flex items-start gap-3.5"
            >
              <span className="font-mono text-xs font-bold text-brand-700 bg-brand-50 border border-brand-200/70 px-2 py-0.5 rounded-md shrink-0 mt-0.5">
                {step.number}
              </span>
              <div>
                <span className="font-display text-sm sm:text-base font-bold text-neutral-950 block mb-1">
                  {step.title}
                </span>
                <span className="text-xs sm:text-sm text-neutral-600 leading-relaxed block font-sans">
                  {step.description}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── Work Cross-Link ── */}
      <motion.div
        variants={cardFromRight}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55, delay: 0.3, ease: EASE_CINEMATIC }}
      >
        <Link
          href="/work"
          className="group rounded-2xl sm:rounded-3xl p-5 sm:p-6 bg-gradient-to-r from-neutral-900 to-neutral-950 text-white border border-neutral-800 shadow-md flex items-center justify-between hover:border-brand-500/60 transition-all duration-300 block"
        >
          <div>
            <span className="font-mono text-[10px] text-brand-400 uppercase tracking-wider block mb-1">
              WANT TO SEE WHAT WE&apos;VE BUILT?
            </span>
            <span className="font-tech text-sm sm:text-base font-bold uppercase tracking-wide text-white block">
              Explore Our Work →
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-white/10 group-hover:bg-brand-600 transition-colors">
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </Link>
      </motion.div>
    </div>
  );
}
