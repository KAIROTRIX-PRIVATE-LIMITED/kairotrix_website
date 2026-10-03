'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Sparkles,
  Layers,
  ShieldCheck,
  CheckCircle2,
  Code2,
  Cpu,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { SolutionDetail, SubCategory } from '@/data/solutionsData';
import { MaskedReveal, DrawLine, revealMeta, revealBody } from '@/lib/animations';

interface SolutionSubServicesProps {
  solution: SolutionDetail;
}

export function SolutionSubServices({ solution }: SolutionSubServicesProps) {
  const shouldReduceMotion = useReducedMotion();

  // Track which service row is currently expanded (defaults to first subservice open by default)
  const [expandedId, setExpandedId] = useState<string | null>(solution.subCategories[0]?.id || null);

  // Track which service rows have their secondary technical approach expanded
  const [techOpenMap, setTechOpenMap] = useState<Record<string, boolean>>({});

  const toggleTechApproach = (serviceId: string) => {
    setTechOpenMap((prev) => ({
      ...prev,
      [serviceId]: !prev[serviceId],
    }));
  };

  // Sync with window.location.hash on mount, on hashchange, and on custom navbar dispatch
  useEffect(() => {
    const syncWithHash = (explicitHash?: string) => {
      if (typeof window === 'undefined') return;
      const rawHash = explicitHash || window.location.hash;
      const hash = rawHash.replace('#', '');
      if (!hash) return;

      const match = solution.subCategories.find(
        (sub) => sub.anchorId === hash || sub.id === hash || sub.slug === hash
      );
      if (match) {
        setExpandedId(match.id);

        const scrollToTarget = () => {
          const target =
            document.getElementById(match.anchorId) ||
            document.getElementById('core-services') ||
            document.getElementById('services');
          if (target) {
            const navOffset = 88;
            const targetY =
              target.getBoundingClientRect().top + window.pageYOffset - navOffset;
            window.scrollTo({
              top: Math.max(0, targetY),
              behavior: 'smooth',
            });
          }
        };

        setTimeout(scrollToTarget, 60);
        setTimeout(scrollToTarget, 260);
      }
    };

    syncWithHash();

    const onHashChange = () => syncWithHash();
    window.addEventListener('hashchange', onHashChange);

    const onCustomNav = (e: Event) => {
      const customEvent = e as CustomEvent<{ hash: string }>;
      if (customEvent.detail?.hash) {
        syncWithHash(customEvent.detail.hash);
      }
    };
    window.addEventListener('kairotrix:navigate-service', onCustomNav);

    return () => {
      window.removeEventListener('hashchange', onHashChange);
      window.removeEventListener('kairotrix:navigate-service', onCustomNav);
    };
  }, [solution.subCategories]);

  const toggleExpand = (subCat: SubCategory) => {
    const isCurrentlyExpanded = expandedId === subCat.id;
    const nextId = isCurrentlyExpanded ? null : subCat.id;
    setExpandedId(nextId);

    if (typeof window !== 'undefined') {
      if (nextId && subCat.anchorId) {
        window.history.replaceState(null, '', `#${subCat.anchorId}`);
      } else {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    }
  };

  return (
    <section
      id="core-services"
      className="relative w-full bg-neutral-50/60 py-14 sm:py-20 lg:py-24 border-b border-neutral-200 scroll-mt-20 overflow-hidden"
    >
      <div id="services" className="sr-only" aria-hidden="true" />
      <div id="capabilities" className="sr-only" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ─── 01. SECTION HEADER (HOW WE CAN HELP) ─── */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <motion.div
            variants={revealMeta}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-3 sm:mb-4"
          >
            <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-pulse" />
            <span className="font-tech text-xs tracking-[0.25em] font-semibold text-brand-600 uppercase">
              CORE SERVICES
            </span>
            <DrawLine className="w-10 sm:w-16 bg-neutral-200" delay={0.2} />
          </motion.div>
          <MaskedReveal delay={0.06}>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] text-neutral-950 uppercase leading-[1.12]">
              HOW WE CAN <span className="gradient-signature-text">HELP.</span>
            </h2>
          </MaskedReveal>
          <motion.p
            variants={revealBody}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.16 }}
            className="mt-3 sm:mt-4 text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto font-normal leading-relaxed"
          >
            Explore the services available within {solution.title}.
          </motion.p>
        </div>

        {/* ─── 02. SERVICE LIST / COLLAPSED & EXPANDED ARCHITECTURE ─── */}
        <div className="max-w-7xl mx-auto divide-y divide-neutral-200/80 border-y border-neutral-200/80">
          {solution.subCategories.map((subCat, index) => {
            const isExpanded = expandedId === subCat.id;
            const isTechOpen = Boolean(techOpenMap[subCat.id]);
            const formattedIndex = String(index + 1).padStart(2, '0');

            // Unique fallback tech tags
            const allTags =
              subCat.technicalApproach?.technologies ||
              Array.from(new Set(subCat.services.flatMap((s) => s.tags)));

            // Content fallbacks if not populated
            const whatWeBuildList =
              subCat.whatWeBuild || subCat.services.map((s) => s.name);
            const whatWeHandleList = subCat.whatWeHandle || [
              'Discovery & operational requirements mapping',
              'System architecture & database design',
              'End-to-end interface and logic implementation',
              'Integration with existing tools & APIs',
              'Testing, validation & performance optimization',
              'Production deployment & monitoring setup',
            ];
            const whatYouReceiveList = subCat.whatYouReceive || [
              'Production-ready system or application',
              'Responsive interfaces tested across devices',
              'Configured integrations & access controls',
              'Deployment configuration & monitoring setup',
              'Complete source-code handover & documentation',
            ];

            return (
              <motion.div
                key={subCat.id}
                id={subCat.anchorId}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={cn(
                  'group relative transition-all duration-300 overflow-hidden scroll-mt-24',
                  isExpanded
                    ? 'bg-white shadow-[0_12px_40px_rgba(147,51,234,0.08)]'
                    : 'hover:bg-white/80'
                )}
              >
                {/* ── Glowing Left Accent Rail on Hover & Active ── */}
                <div
                  className={cn(
                    'absolute left-0 top-0 bottom-0 w-1 sm:w-1.5 transition-all duration-300 pointer-events-none z-30',
                    isExpanded
                      ? 'bg-gradient-to-b from-brand-600 via-brand-500 to-brand-400 opacity-100 shadow-[0_0_12px_rgba(147,51,234,0.6)]'
                      : 'bg-brand-500 opacity-0 group-hover:opacity-100 shadow-[0_0_8px_rgba(147,51,234,0.5)]'
                  )}
                  aria-hidden="true"
                />

                {/* Specular sheen sweep on hover */}
                <div
                  className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-brand-500/[0.04] to-transparent z-10"
                  aria-hidden="true"
                />

                {/* ── Sleek Collapsed Service Row Header Button ── */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => toggleExpand(subCat)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleExpand(subCat);
                    }
                  }}
                  className="w-full text-left py-5 sm:py-6 lg:py-7 px-4 sm:px-6 lg:px-8 flex items-start sm:items-center justify-between gap-4 cursor-pointer select-none transition-colors relative z-20"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-start sm:items-center gap-4 sm:gap-6 min-w-0">
                    
                    

                    {/* Service Index, Title & Plain-English Description */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-tech text-xs font-semibold uppercase tracking-wider text-brand-600">
                          SERVICE {formattedIndex}
                        </span>
                      </div>

                      <h3
                        className={cn(
                          'text-lg sm:text-xl lg:text-2xl font-bold tracking-tight transition-colors duration-300 leading-snug',
                          isExpanded
                            ? 'text-brand-600'
                            : 'text-neutral-900 group-hover:text-brand-600'
                        )}
                      >
                        {subCat.title}
                      </h3>

                      <p className="mt-1 text-xs sm:text-sm text-neutral-600 font-normal line-clamp-1 sm:line-clamp-2 max-w-3xl leading-relaxed">
                        {subCat.summary}
                      </p>
                    </div>

                  </div>

                  {/* Right Action Trigger (VIEW SERVICE / EXPLORE SERVICE) */}
                  <div className="flex items-center gap-3 shrink-0 pt-1 sm:pt-0">
                    <span
                      className={cn(
                        'hidden md:inline-block text-xs font-tech font-semibold uppercase tracking-wider transition-colors',
                        isExpanded ? 'text-brand-600' : 'text-neutral-400 group-hover:text-brand-600'
                      )}
                    >
                      {isExpanded ? 'COLLAPSE' : 'EXPLORE SERVICE'}
                    </span>

                    <div
                      className={cn(
                        'w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center transition-all duration-300 shadow-2xs',
                        isExpanded
                          ? 'bg-brand-600 border-brand-600 text-white shadow-xs rotate-180 ring-2 ring-brand-500/20'
                          : 'bg-white border-neutral-200 text-neutral-400 group-hover:border-brand-600 group-hover:bg-brand-600 group-hover:text-white group-hover:scale-105'
                      )}
                    >
                      <ChevronDown className="w-4 h-4 transition-transform duration-300" />
                    </div>
                  </div>
                </div>

                {/* ── Inline Expanded Service Structure ── */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{
                        duration: shouldReduceMotion ? 0 : 0.32,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="overflow-hidden border-t border-neutral-100 relative z-20"
                    >
                      <div className="p-5 sm:p-6 lg:p-8 bg-neutral-50/40 space-y-6">
                        
                        {/* 1. SERVICE HEADER WITH DEDICATED 3D VISUAL SHOWCASE */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.05 }}
                          className="p-6 sm:p-8 rounded-2xl bg-white border border-neutral-200 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                        >
                          <div className="space-y-3 flex-1 min-w-0">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <span className="font-tech text-xs font-bold text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded border border-brand-200 uppercase tracking-wider">
                                SERVICE {formattedIndex}
                              </span>
                              <span className="text-[11px] font-tech text-neutral-500 font-medium">
                                Built bespoke to project requirements
                              </span>
                            </div>

                            <h4 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
                              {subCat.title}
                            </h4>

                            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal max-w-3xl">
                              {subCat.summary}
                            </p>

                            {/* Contextual Row: Best Suited For */}
                            {subCat.bestSuitedFor && subCat.bestSuitedFor.length > 0 && (
                              <div className="pt-2 border-t border-neutral-100 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-xs">
                                <span className="font-tech font-bold text-neutral-500 uppercase tracking-wider text-[11px]">
                                  BEST SUITED FOR:
                                </span>
                                <div className="flex flex-wrap items-center gap-1.5">
                                  {subCat.bestSuitedFor.map((item, idx) => (
                                    <span
                                      key={idx}
                                      className="inline-flex items-center px-2 py-0.5 rounded bg-neutral-100 text-neutral-800 text-xs font-normal"
                                    >
                                      {item}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Dedicated Large 3D Subservice Visual Showcase */}
                          {subCat.image && (
                            <div className="relative w-full md:w-72 lg:w-80 h-56 sm:h-64 rounded-2xl bg-gradient-to-br from-brand-50/50 via-neutral-50 to-white border border-neutral-200/90 p-4 shrink-0 flex items-center justify-center overflow-hidden shadow-sm group/img">
                              <div className="absolute inset-0 bg-brand-500/10 blur-xl pointer-events-none" />
                              <Image
                                src={subCat.image}
                                alt={subCat.title}
                                fill
                                className="object-contain p-2 drop-shadow-xl group-hover/img:scale-108 transition-transform duration-500"
                                sizes="(max-width: 768px) 100vw, 320px"
                              />
                            </div>
                          )}
                        </motion.div>

                        {/* 2. 3-COLUMN CORE SPECIFICATIONS (WHAT WE BUILD / WHAT WE HANDLE / WHAT YOU RECEIVE) */}
                        <motion.div
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.35, delay: 0.1 }}
                          className="grid grid-cols-1 lg:grid-cols-3 gap-5"
                        >
                          {/* COLUMN 1: WHAT WE BUILD */}
                          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-neutral-200 shadow-2xs flex flex-col justify-between space-y-4">
                            <div className="space-y-3">
                              <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-lg bg-brand-50 border border-brand-200/80 flex items-center justify-center text-brand-600">
                                  <Layers className="w-4 h-4 stroke-[2.2]" />
                                </div>
                                <span className="text-xs font-tech font-bold uppercase tracking-wider text-neutral-900">
                                  WHAT WE BUILD
                                </span>
                              </div>

                              <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-700">
                                {whatWeBuildList.map((item, i) => (
                                  <li key={i} className="flex items-start gap-2.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-2 shrink-0" />
                                    <span className="leading-snug font-medium text-neutral-800">
                                      {item}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <p className="text-[11px] text-neutral-500 pt-3 border-t border-neutral-100 font-normal leading-relaxed">
                              Built around the requirements of the project, not a fixed package.
                            </p>
                          </div>

                          {/* COLUMN 2: WHAT WE HANDLE */}
                          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-neutral-200 shadow-2xs space-y-3">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-lg bg-brand-50 border border-brand-200/80 flex items-center justify-center text-brand-600">
                                <ShieldCheck className="w-4 h-4 stroke-[2.2]" />
                              </div>
                              <span className="text-xs font-tech font-bold uppercase tracking-wider text-neutral-900">
                                WHAT WE HANDLE
                              </span>
                            </div>

                            <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-700">
                              {whatWeHandleList.map((item, i) => (
                                <li key={i} className="flex items-start gap-2.5">
                                  <div className="w-4 h-4 rounded-full bg-brand-50 border border-brand-200 flex items-center justify-center shrink-0 mt-0.5">
                                    <Check className="w-2.5 h-2.5 text-brand-600 stroke-[3]" />
                                  </div>
                                  <span className="leading-snug text-neutral-800 font-medium">
                                    {item}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* COLUMN 3: WHAT YOU RECEIVE */}
                          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-neutral-200 shadow-2xs space-y-3">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-lg bg-brand-50 border border-brand-200/80 flex items-center justify-center text-brand-600">
                                <CheckCircle2 className="w-4 h-4 stroke-[2.2]" />
                              </div>
                              <span className="text-xs font-tech font-bold uppercase tracking-wider text-neutral-900">
                                WHAT YOU RECEIVE
                              </span>
                            </div>

                            <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-700">
                              {whatYouReceiveList.map((item, i) => (
                                <li key={i} className="flex items-start gap-2.5">
                                  <div className="w-4 h-4 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center shrink-0 mt-0.5">
                                    <Check className="w-2.5 h-2.5 text-neutral-700 stroke-[3]" />
                                  </div>
                                  <span className="leading-snug text-neutral-800 font-medium">
                                    {item}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>

                        {/* 3. SECONDARY TECHNICAL APPROACH AREA */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.15 }}
                          className="rounded-2xl bg-white border border-neutral-200 shadow-2xs overflow-hidden"
                        >
                          <div className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="space-y-1 max-w-2xl">
                              <div className="flex items-center gap-2">
                                <Cpu className="w-4 h-4 text-brand-600" />
                                <span className="text-xs font-tech font-bold uppercase tracking-wider text-neutral-900">
                                  TECHNICAL APPROACH
                                </span>
                              </div>
                              <p className="text-xs sm:text-sm text-neutral-600 font-normal leading-relaxed">
                                Technology, architecture, and infrastructure are selected according to the requirements of the project.
                              </p>
                            </div>

                            <button
                              type="button"
                              onClick={() => toggleTechApproach(subCat.id)}
                              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-800 text-xs font-tech font-semibold tracking-wider uppercase transition-colors shrink-0 cursor-pointer"
                              aria-expanded={isTechOpen}
                            >
                              <span>{isTechOpen ? 'HIDE TECHNICAL APPROACH' : 'VIEW TECHNICAL APPROACH'}</span>
                              <ChevronDown
                                className={cn(
                                  'w-3.5 h-3.5 transition-transform duration-200',
                                  isTechOpen ? 'rotate-180' : ''
                                )}
                              />
                            </button>
                          </div>

                          {/* Expandable Technical Details Drawer */}
                          <AnimatePresence initial={false}>
                            {isTechOpen && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{
                                  duration: shouldReduceMotion ? 0 : 0.25,
                                  ease: [0.16, 1, 0.3, 1],
                                }}
                                className="border-t border-neutral-100 bg-neutral-50/50 p-5 sm:p-6 space-y-4"
                              >
                                {subCat.technicalApproach?.description && (
                                  <div className="space-y-1">
                                    <span className="text-[11px] font-tech font-semibold text-neutral-500 uppercase tracking-wider">
                                      ENGINEERING RATIONALE
                                    </span>
                                    <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-normal">
                                      {subCat.technicalApproach.description}
                                    </p>
                                  </div>
                                )}

                                <div className="space-y-2">
                                  <div className="flex items-center gap-1.5 text-[11px] font-tech font-semibold text-neutral-500 uppercase tracking-wider">
                                    <Code2 className="w-3.5 h-3.5 text-brand-600" />
                                    <span>REPRESENTATIVE ARCHITECTURAL STACK</span>
                                  </div>
                                  <div className="flex flex-wrap gap-1.5">
                                    {allTags.map((tech, i) => (
                                      <span
                                        key={i}
                                        className="inline-flex items-center px-2.5 py-1 rounded-md bg-white border border-neutral-200 text-neutral-800 text-xs font-tech font-medium hover:border-brand-300 hover:text-brand-700 transition-colors shadow-2xs"
                                      >
                                        {tech}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>

                        {/* 4. MAIN CTA BAR */}
                        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-neutral-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div
                            className="flex items-center gap-2 text-xs font-tech text-neutral-500"
                            title="Client-owned custom project code and IP, subject to third-party technologies and licenses used in the solution."
                          >
                            <Sparkles className="w-3.5 h-3.5 text-brand-500 shrink-0" />
                            <span>Client-Owned Custom Code & IP • Direct Engineering Delivery</span>
                          </div>

                          <Link
                            href={`/contact?solution=${solution.slug}&service=${subCat.anchorId}`}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-neutral-900 hover:bg-brand-600 text-white font-tech font-semibold text-xs uppercase tracking-wider transition-colors shadow-xs active:scale-[0.98]"
                          >
                            <span>Discuss This Service</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* ─── 03. COMPACT SCOPING CALLOUT ─── */}
        <div className="mt-10 sm:mt-12 p-5 sm:p-6 rounded-2xl bg-white border border-neutral-200 flex flex-col lg:flex-row items-center lg:items-center justify-between gap-4 shadow-xs text-center lg:text-left">
          <div className="space-y-0.5">
            <div className="text-[11px] font-tech font-bold uppercase tracking-wider text-brand-600">
              CUSTOM SCOPE
            </div>
            <div className="text-sm sm:text-base font-bold text-neutral-900">
              Need a custom system engineered around your business?
            </div>
            <p className="text-xs text-neutral-600 max-w-2xl font-normal">
              Tell us your business objective and operational friction — our engineering team designs and delivers the exact system architecture you need.
            </p>
          </div>

          <Link
            href={`/contact?solution=${solution.slug}&service=custom-scope`}
            className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-neutral-900 hover:bg-brand-600 text-white text-xs font-semibold font-tech tracking-wider uppercase transition-colors"
          >
            <span>Discuss Custom Scope</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </section>
  );
}
