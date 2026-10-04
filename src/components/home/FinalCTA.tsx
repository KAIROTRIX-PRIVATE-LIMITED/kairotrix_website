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
  Users,
  Copy,
  Check,
  Clock,
  Lock,
  Layers,
} from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { EASE_CINEMATIC, EASE_PRECISE, MaskedReveal, DrawLine } from '@/lib/animations';

// ─────────────────────────────────────────────────────────────────────────────
// KAIROTRIX Section 07 — "Final CTA: Work With Us"
//
// The culminating homepage destination section before the global footer.
// Premium engineering invitation with interactive intent scoping, tactile high-contrast
// CTA buttons, verified delivery invariants, and one-click contact capabilities.
// Strictly Light Theme (#FAFAFC / #FFFFFF with #9333EA brand accents).
// ─────────────────────────────────────────────────────────────────────────────

interface AssuranceItem {
  icon: typeof ShieldCheck;
  title: string;
  description: string;
  badge: string;
}

const ASSURANCES: AssuranceItem[] = [
  {
    icon: Cpu,
    title: 'Problem-First Discovery',
    description:
      'We analyze your operational bottlenecks, team workflows, and business goals before recommending any software architecture.',
    badge: 'Output: Architecture & ROI Roadmap',
  },
  {
    icon: Code2,
    title: '100% Code Ownership',
    description:
      'You own every line of source code, database architecture, and design asset. Zero vendor lock-in and zero recurring platform fees.',
    badge: 'Standard: Full IP & Git Repository Handover',
  },
  {
    icon: Users,
    title: 'Direct Senior Engineers',
    description:
      'Work directly with the senior architects and engineers building your software. Clear weekly demos with zero middleman friction.',
    badge: 'Access: Lead Architects • Zero Middlemen',
  },
  {
    icon: ShieldCheck,
    title: 'Disruption-Free Launch',
    description:
      'Every system is thoroughly tested and staged in sandbox environments before cutover, ensuring your business never misses a beat.',
    badge: 'Safety: Staged Rollouts & Rollback Guards',
  },
];

export function FinalCTA() {
  const prefersReduced = useReducedMotion();
  const [aiWidgetPinged, setAiWidgetPinged] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  const handleAiAssistantClick = () => {
    setAiWidgetPinged(true);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('kairotrix:open-ai-widget'));
    }
    setTimeout(() => setAiWidgetPinged(false), 2400);
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('kairotrix.official@gmail.com');
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2200);
    } catch {
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2200);
    }
  };

  const containerVariants = {
    hidden: { opacity: prefersReduced ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReduced ? 0 : 0.1,
        delayChildren: prefersReduced ? 0 : 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section
      id="final-cta"
      aria-labelledby="final-cta-heading"
      className="relative w-full overflow-hidden bg-[#FAFAFC] py-24 sm:py-32 lg:py-36 border-t border-neutral-200/80"
    >
      {/* Schema.org Structured Data for Direct Business Contact & Services */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ProfessionalService',
            name: 'KAIROTRIX',
            url: 'https://www.kairotrix.in',
            description:
              'Software engineering and technology partner delivering custom business software, workflow automation, AI systems, and enterprise integrations with 100% client code ownership.',
            email: 'kairotrix.official@gmail.com',
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'Engineering Inquiries',
              email: 'kairotrix.official@gmail.com',
              availableLanguage: ['English'],
            },
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Engineering Services',
              itemListElement: [
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Custom Software & Product Engineering',
                    description:
                      'Full-cycle bespoke web applications and software platforms with complete source code ownership.',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Workflow & Process Automation',
                    description:
                      'End-to-end task and document automation that eliminates manual operational bottlenecks.',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'AI & Intelligent Systems',
                    description:
                      'Custom AI applications, autonomous agents, and enterprise knowledge search systems.',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Technology & API Integration',
                    description:
                      'Connecting CRM, ERP, billing, and database tools into a unified, synchronized ecosystem.',
                  },
                },
              ],
            },
          }),
        }}
      />

      {/* Background Architectural Grid Accent */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 bg-[linear-gradient(to_right,#E2E4EB_1px,transparent_1px),linear-gradient(to_bottom,#E2E4EB_1px,transparent_1px)] bg-[size:4.5rem_4.5rem] [mask-image:radial-gradient(ellipse_65%_55%_at_50%_50%,#000_65%,transparent_100%)]"
        aria-hidden="true"
      />

      {/* Atmospheric Soft Brand Radial Glow */}
      <div
        className="absolute -bottom-28 left-1/2 -translate-x-1/2 w-[840px] h-[400px] bg-gradient-to-t from-brand-500/12 via-brand-500/6 to-transparent rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Eyebrow Badge */}
          <div className="flex items-center gap-3 mb-6">
            <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-pulse" />
            <motion.span
              initial={{ opacity: prefersReduced ? 1 : 0, letterSpacing: prefersReduced ? '0.25em' : '0.35em' }}
              whileInView={{ opacity: 1, letterSpacing: '0.25em' }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE_PRECISE }}
              className="font-tech text-xs font-semibold text-brand-600 uppercase"
            >
              WORK WITH US
            </motion.span>
            <div className="h-px w-10 sm:w-16 bg-neutral-200" />
          </div>

          {/* Main Headline with Masked Reveal */}
          <div className="overflow-hidden">
            <MaskedReveal delay={0.06}>
              <h2
                id="final-cta-heading"
                className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-neutral-950 leading-[1.05]"
              >
                LET&apos;S{' '}
                <span className="gradient-signature-text">
                  BUILD.
                </span>
              </h2>
            </MaskedReveal>
          </div>

          {/* Plain English, Confident & Catchy Narrative */}
          <motion.p
            initial={{ opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, delay: 0.12, ease: EASE_CINEMATIC }}
            className="mt-6 sm:mt-8 max-w-xl text-base sm:text-lg md:text-xl text-neutral-600 leading-relaxed font-normal"
          >
            Bring us the problem slowing your business down. We&apos;ll engineer the software that fixes it—clean, fast, and built to last.
          </motion.p>

          {/* ── Enhanced Interactive CTA Buttons ── */}
          <motion.div
            initial={{ opacity: prefersReduced ? 1 : 0, scale: prefersReduced ? 1 : 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.16, ease: EASE_PRECISE }}
            className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 w-full max-w-md sm:max-w-none"
          >
            {/* Primary Action Button (High-End Tactile Gradient with Inner Glow) */}
            <Link
              href="/contact"
              className="group relative inline-flex items-center justify-between sm:justify-center gap-4 w-full sm:w-auto pl-7 pr-4 sm:pl-8 sm:pr-5 py-4 text-base font-semibold text-white bg-gradient-to-r from-brand-600 via-brand-600 to-purple-700 hover:from-brand-500 hover:to-purple-600 rounded-full transition-all duration-300 shadow-[0_4px_24px_rgba(147,51,234,0.32)] hover:shadow-[0_8px_36px_rgba(147,51,234,0.48)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] ring-1 ring-white/25 ring-inset focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
            >
              <div className="flex flex-col text-left">
                <span>Start a Project Conversation</span>
                <span className="text-[10px] font-mono font-normal text-purple-200/90 tracking-wide">
                  Direct Lead Architect Review
                </span>
              </div>
              <div className="w-9 h-9 rounded-full bg-white/15 group-hover:bg-white/25 flex items-center justify-center transition-all duration-300 group-hover:scale-105">
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </div>
            </Link>

            {/* Secondary Action: AI Assistant Trigger (Futuristic Glassmorphic Instrument) */}
            <button
              type="button"
              onClick={handleAiAssistantClick}
              className="group relative inline-flex items-center justify-between sm:justify-center gap-4 w-full sm:w-auto pl-6 pr-5 py-4 text-base font-medium text-neutral-800 hover:text-brand-600 bg-white/95 hover:bg-white backdrop-blur-md border border-neutral-200/90 hover:border-brand-400/80 rounded-full transition-all duration-300 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_6px_24px_rgba(147,51,234,0.12)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 cursor-pointer"
              title="Open persistent KAIROTRIX AI Assistant"
            >
              <div className="flex items-center gap-3">
                <div className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-semibold text-neutral-900 group-hover:text-brand-600 transition-colors">
                    Talk to KAIROTRIX AI
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400">
                    Instant Answers 24/7
                  </span>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-brand-soft/40 group-hover:bg-brand-soft/80 flex items-center justify-center transition-colors">
                <Sparkles className="w-4 h-4 text-brand-600 group-hover:rotate-12 transition-transform duration-300" />
              </div>
              {aiWidgetPinged && (
                <span className="absolute -top-2.5 -right-2 px-2.5 py-0.5 text-[10px] font-mono font-semibold text-brand-700 bg-brand-soft border border-brand-300 rounded-full shadow-md animate-bounce">
                  Opening KIRO...
                </span>
              )}
            </button>
          </motion.div>

          {/* ── Direct Trust & Interactive Copy Ribbon ── */}
          <motion.div
            initial={{ opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.22, ease: EASE_CINEMATIC }}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs font-mono text-neutral-500 bg-white/70 backdrop-blur-xs px-5 sm:px-6 py-2.5 rounded-2xl sm:rounded-full border border-neutral-200/70 shadow-xs text-center"
          >
            {/* Interactive One-Click Email Copy */}
            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-1.5 text-neutral-700 hover:text-brand-600 transition-colors cursor-pointer group"
              title="Click to copy email address"
            >
              <span className="text-neutral-400">Direct:</span>
              <span className="font-semibold underline underline-offset-4 group-hover:text-brand-600">
                kairotrix.official@gmail.com
              </span>
              {emailCopied ? (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 animate-in fade-in duration-150">
                  <Check className="w-3 h-3" /> Copied!
                </span>
              ) : (
                <Copy className="w-3.5 h-3.5 text-neutral-400 group-hover:text-brand-600 transition-colors" />
              )}
            </button>

            <span className="hidden sm:inline text-neutral-300">•</span>

            {/* SLA Badge */}
            <div className="flex items-center gap-1.5 text-neutral-600">
              <Clock className="w-3.5 h-3.5 text-brand-500" />
              <span>&lt; 24h Response SLA</span>
            </div>

            <span className="hidden sm:inline text-neutral-300">•</span>

            {/* Senior Engineers Badge */}
            <div className="flex items-center gap-1.5 text-neutral-600">
              <Users className="w-3.5 h-3.5 text-brand-500" />
              <span>Direct Senior Engineers</span>
            </div>

            <span className="hidden sm:inline text-neutral-300">•</span>

            {/* IP Ownership Badge */}
            <div className="flex items-center gap-1.5 text-neutral-600">
              <Lock className="w-3.5 h-3.5 text-brand-500" />
              <span>100% Client Code Ownership</span>
            </div>
          </motion.div>

          {/* Hairline Animated Divider */}
          <DrawLine className="mt-16 sm:mt-20 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-neutral-300/80 to-transparent" origin="center" />

          {/* ── 4 Grounded Business & Engineering Assurances with Directional Entrance ── */}
          <div className="mt-12 sm:mt-16 w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left">
            {ASSURANCES.map((item, idx) => {
              const Icon = item.icon;
              // Directional spatial entrance based on position
              const getDirectionalInitial = () => {
                if (prefersReduced) return { opacity: 1 };
                if (idx === 0) return { opacity: 0, x: -16, scale: 0.97 };
                if (idx === 1) return { opacity: 0, y: 18, scale: 0.97 };
                if (idx === 2) return { opacity: 0, y: 18, scale: 0.97 };
                return { opacity: 0, x: 16, scale: 0.97 };
              };

              return (
                <motion.div
                  key={idx}
                  initial={getDirectionalInitial()}
                  whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.65, delay: prefersReduced ? 0 : idx * 0.08, ease: EASE_CINEMATIC }}
                  className="group relative flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-white border border-neutral-200/80 hover:border-brand-500/40 transition-all duration-300 shadow-sm hover:shadow-[0_8px_28px_rgba(147,51,234,0.08)] hover:-translate-y-1"
                >
                  <div className="flex flex-col items-center sm:items-start">
                    <div className="flex items-center justify-between w-full mb-4">
                      <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-brand-soft/50 text-brand-600 border border-brand-200/60 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300 shadow-xs">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-mono text-[10px] text-neutral-400 font-semibold tracking-wider">
                        0{idx + 1} // STANDARD
                      </span>
                    </div>

                    <h3 className="font-display text-sm font-bold text-neutral-950 group-hover:text-brand-600 transition-colors duration-200">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-xs text-neutral-600 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>

                  {/* Concrete Deliverable / Standard Footprint */}
                  <div className="mt-5 pt-3.5 border-t border-neutral-100 flex items-center justify-center sm:justify-start gap-1.5 text-[10px] font-mono text-neutral-400 group-hover:text-brand-600 transition-colors">
                    <span className="w-1 h-1 rounded-full bg-brand-500" />
                    <span className="truncate">{item.badge}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
