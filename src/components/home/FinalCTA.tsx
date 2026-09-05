'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Code2,
  Cpu,
  Layers,
} from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

// ─────────────────────────────────────────────────────────────────────────────
// KAIROTRIX Section 07 — "Final CTA: Let's Build"
//
// The culminating homepage section before the footer.
// Confident, dignified invitation — not aggressive sales or generic SaaS marketing.
// Generous whitespace, razor-sharp typography, and authentic engineering assurances.
// Strictly Light Theme (#FAFAFC / #FFFFFF with #9333EA brand accents).
// ─────────────────────────────────────────────────────────────────────────────

interface AssuranceItem {
  icon: typeof ShieldCheck;
  title: string;
  description: string;
}

const ASSURANCES: AssuranceItem[] = [
  {
    icon: Cpu,
    title: 'Problem-First Diagnostic',
    description: 'We dissect root causes and evaluate real-world trade-offs before prescribing architecture or writing code.',
  },
  {
    icon: Code2,
    title: '100% Code & Blueprint Ownership',
    description: 'You own every line of source code, configuration, and architectural blueprint. Zero proprietary lock-in.',
  },
  {
    icon: ShieldCheck,
    title: 'Production-Grade Determinism',
    description: 'Engineered for high-availability enterprise environments with strict security, low latency, and deterministic reliability.',
  },
  {
    icon: Layers,
    title: 'Direct Engineering Access',
    description: 'Work directly alongside lead system architects and engineers. Transparent weekly milestones, zero middleman bureaucracy.',
  },
];

export function FinalCTA() {
  const prefersReduced = useReducedMotion();
  const [aiWidgetPinged, setAiWidgetPinged] = useState(false);

  const handleAiAssistantClick = () => {
    setAiWidgetPinged(true);
    // Dispatch custom event to notify persistent AI widget if initialized
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('kairotrix:open-ai-widget'));
    }
    setTimeout(() => setAiWidgetPinged(false), 2400);
  };

  const containerVariants = {
    hidden: { opacity: prefersReduced ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReduced ? 0 : 0.12,
        delayChildren: prefersReduced ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section
      id="final-cta"
      className="relative w-full overflow-hidden bg-[#FAFAFC] py-24 sm:py-32 lg:py-40 border-t border-neutral-200/80"
      aria-label="Final Call to Action — Let's Build"
    >
      {/* Background Architectural Grid Accent */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 bg-[linear-gradient(to_right,#E2E4EB_1px,transparent_1px),linear-gradient(to_bottom,#E2E4EB_1px,transparent_1px)] bg-[size:4.5rem_4.5rem] [mask-image:radial-gradient(ellipse_65%_55%_at_50%_50%,#000_65%,transparent_100%)]"
        aria-hidden="true"
      />

      {/* Atmospheric Soft Brand Radial Glow */}
      <div
        className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-gradient-to-t from-purple-500/10 via-purple-400/5 to-transparent rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="flex flex-col items-center text-center"
        >
          {/* Eyebrow Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 mb-6">
            <span className="flex h-2 w-2 rounded-full bg-purple-600 animate-pulse" />
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-neutral-500">
              07 // INITIATE COLLABORATION
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-neutral-900 leading-[1.05]"
          >
            LET&apos;S{' '}
            <span className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 bg-clip-text text-transparent">
              BUILD.
            </span>
          </motion.h2>

          {/* Subtitle / Positioning Copy */}
          <motion.p
            variants={itemVariants}
            className="mt-6 sm:mt-8 max-w-2xl text-base sm:text-lg md:text-xl text-neutral-600 leading-relaxed font-normal"
          >
            You have an idea, an operational bottleneck, or a mission-critical system to engineer.
            We provide the deep engineering rigor and architectural clarity to bring it to life.
          </motion.p>

          {/* Interactive CTAs */}
          <motion.div
            variants={itemVariants}
            className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 w-full max-w-md sm:max-w-none"
          >
            {/* Primary Action Button */}
            <Link
              href="/contact"
              className="group relative inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 text-base font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-full transition-all duration-300 shadow-[0_4px_24px_rgba(147,51,234,0.28)] hover:shadow-[0_8px_32px_rgba(147,51,234,0.42)] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
            >
              <span>Start a Conversation</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            {/* Secondary Action: AI Assistant Trigger */}
            <button
              type="button"
              onClick={handleAiAssistantClick}
              className="group relative inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-7 py-4 text-base font-medium text-neutral-700 hover:text-purple-700 bg-white hover:bg-neutral-50/90 border border-neutral-200/90 hover:border-purple-300 rounded-full transition-all duration-300 shadow-sm hover:shadow-md active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
              title="Open persistent KAIROTRIX AI Assistant"
            >
              <Sparkles className="w-4 h-4 text-purple-600 transition-transform duration-300 group-hover:scale-110" />
              <span>Talk to KAIROTRIX AI</span>
              {aiWidgetPinged && (
                <span className="absolute -top-2 -right-2 px-2 py-0.5 text-[10px] font-mono font-medium text-purple-700 bg-purple-100 border border-purple-200 rounded-full shadow-sm animate-bounce">
                  Opening...
                </span>
              )}
            </button>
          </motion.div>

          {/* Direct Email Line */}
          <motion.div
            variants={itemVariants}
            className="mt-6 flex items-center justify-center gap-2 text-xs text-neutral-500 font-mono"
          >
            <span>Or direct correspondence:</span>
            <a
              href="mailto:connect@kairotrix.com"
              className="inline-flex items-center gap-1 text-purple-600 hover:text-purple-700 font-semibold underline underline-offset-4 transition-colors"
            >
              connect@kairotrix.com
            </a>
          </motion.div>

          {/* Divider Line */}
          <motion.div
            variants={itemVariants}
            className="mt-16 sm:mt-20 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent"
            aria-hidden="true"
          />

          {/* Engineering Commitments Grid (Rule 4 compliant — authentic philosophical assurance) */}
          <motion.div
            variants={itemVariants}
            className="mt-12 sm:mt-16 w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left"
          >
            {ASSURANCES.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="group relative flex flex-col p-5 sm:p-6 rounded-2xl bg-white border border-neutral-200/80 hover:border-purple-200 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-50 text-purple-600 border border-purple-100 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-mono text-[10px] text-neutral-400 font-semibold tracking-wider">
                      [ 0{idx + 1} ]
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-neutral-900 group-hover:text-purple-700 transition-colors duration-200">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs text-neutral-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
