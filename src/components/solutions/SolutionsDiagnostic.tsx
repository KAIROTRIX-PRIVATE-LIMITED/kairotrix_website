'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  RefreshCw,
  Search,
  ChevronRight,
  CornerDownLeft,
  Lightbulb,
  Info,
} from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

// ─────────────────────────────────────────────────────────────────────────────
// Interface — renamed fields per review directives
// ─────────────────────────────────────────────────────────────────────────────

interface SolutionMatch {
  id: string;
  chipLabel: string;
  userPrompt: string;
  solutionNumber: string;
  solutionName: string;
  slug: string;
  whatWeHeard: string;
  howWeCouldApproachIt: string;
  pipelineNodes: { step: string; label: string }[];
  approach: string;
  exampleOutput: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Data — 6 entries mapping exactly to the official solution areas
// Plain-English chips, problem-first language, business-readable results
// ─────────────────────────────────────────────────────────────────────────────

const SOLUTION_OPTIONS: SolutionMatch[] = [
  {
    id: 'automation',
    chipLabel: 'Too much manual work',
    userPrompt:
      'Our staff spend hours on repetitive tasks that follow the same steps every time.',
    solutionNumber: '03',
    solutionName: 'Automation & Digital Operations',
    slug: '/solutions/automation-digital-operations',
    whatWeHeard:
      'Your business is spending time on repetitive manual work that follows predictable steps.',
    howWeCouldApproachIt:
      'Design a workflow that handles repetitive steps automatically, with validation and error handling built into the process.',
    pipelineNodes: [
      { step: '01', label: 'Business Input' },
      { step: '02', label: 'Workflow Rules' },
      { step: '03', label: 'Automation + Validation' },
      { step: '04', label: 'Monitoring / Human Review' },
    ],
    approach: 'Reliable workflow with validation and error handling',
    exampleOutput: 'Automated tasks, approvals, documents, or communications',
  },
  {
    id: 'ai-knowledge',
    chipLabel: 'Finding information takes too long',
    userPrompt:
      'Our company knowledge is buried in documents, wikis, and chat threads. It takes hours to find answers.',
    solutionNumber: '01',
    solutionName: 'AI & Intelligent Systems',
    slug: '/solutions/ai-intelligent-systems',
    whatWeHeard:
      'Important information is scattered across multiple places and hard to find when you need it.',
    howWeCouldApproachIt:
      'Build a system that understands your business information and surfaces reliable, sourced answers when people need them.',
    pipelineNodes: [
      { step: '01', label: 'Business Documents' },
      { step: '02', label: 'Document Processing' },
      { step: '03', label: 'Retrieval + AI' },
      { step: '04', label: 'Answer + Sources' },
    ],
    approach:
      'Controlled AI actions with clear permissions and human oversight where needed',
    exampleOutput:
      'AI application, agent, knowledge system, or machine-learning workflow',
  },
  {
    id: 'software',
    chipLabel: "Our current software doesn't fit",
    userPrompt:
      'We have outgrown off-the-shelf tools and need software built specifically around the way our business works.',
    solutionNumber: '02',
    solutionName: 'Software & Product Engineering',
    slug: '/solutions/software-product-engineering',
    whatWeHeard:
      'Generic software no longer matches how your business actually operates, and workarounds are adding up.',
    howWeCouldApproachIt:
      'Build software designed around your specific workflow, so the tool supports the business instead of the other way around.',
    pipelineNodes: [
      { step: '01', label: 'Business Requirements' },
      { step: '02', label: 'System Architecture' },
      { step: '03', label: 'Build + Test' },
      { step: '04', label: 'Deploy + Monitor' },
    ],
    approach: 'Modular software designed around the business workflow',
    exampleOutput:
      'Custom application, internal tool, SaaS platform, or customer portal',
  },
  {
    id: 'transformation',
    chipLabel: 'We need a better digital experience',
    userPrompt:
      'Our website or digital tools are outdated, slow, and difficult for customers and staff to use.',
    solutionNumber: '04',
    solutionName: 'Digital Transformation',
    slug: '/solutions/digital-transformation',
    whatWeHeard:
      'Your digital presence or internal tools feel outdated and are slowing down the people who use them.',
    howWeCouldApproachIt:
      'Redesign the experience with modern standards, faster performance, and a clear path for future improvements.',
    pipelineNodes: [
      { step: '01', label: 'Current State Review' },
      { step: '02', label: 'Design + Prototype' },
      { step: '03', label: 'Build + Migrate' },
      { step: '04', label: 'Launch + Measure' },
    ],
    approach: 'Modern digital experience and process design',
    exampleOutput:
      'Business website, digitized workflow, redesigned interface, or modernized digital process',
  },
  {
    id: 'data-bi',
    chipLabel: 'We need better reporting',
    userPrompt:
      'Leadership relies on stale spreadsheets and gut feelings because we have no clear view of what is actually happening.',
    solutionNumber: '05',
    solutionName: 'Data & Business Intelligence',
    slug: '/solutions/data-business-intelligence',
    whatWeHeard:
      "Decision-makers don't have clear, timely information about how the business is performing.",
    howWeCouldApproachIt:
      'Connect your data sources, clean the information, and present it in dashboards and reports that update automatically.',
    pipelineNodes: [
      { step: '01', label: 'Data Sources' },
      { step: '02', label: 'Clean + Connect' },
      { step: '03', label: 'Analysis + Rules' },
      { step: '04', label: 'Dashboards + Reports' },
    ],
    approach: 'Clean, connected data with clear reporting',
    exampleOutput:
      'Analytics, KPI dashboard, interactive report, or business intelligence system',
  },
  {
    id: 'integration',
    chipLabel: "Our systems don't connect",
    userPrompt:
      "Our CRM, ERP, payment systems, and internal tools don't talk to each other, so staff copy data manually between them.",
    solutionNumber: '06',
    solutionName: 'Technology Integration',
    slug: '/solutions/technology-integration',
    whatWeHeard:
      'Your business systems work in isolation, causing manual data transfer and inconsistencies between them.',
    howWeCouldApproachIt:
      'Connect the systems so information flows automatically, with validation to catch errors and monitoring to flag problems.',
    pipelineNodes: [
      { step: '01', label: 'System Mapping' },
      { step: '02', label: 'API Connections' },
      { step: '03', label: 'Validation + Sync' },
      { step: '04', label: 'Monitoring + Error Handling' },
    ],
    approach:
      'Reliable system connections with validation and error handling',
    exampleOutput:
      'API integration, CRM/ERP connection, payment integration, or synchronized business data',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export function SolutionsDiagnostic() {
  const [activeScenario, setActiveScenario] = useState<SolutionMatch>(
    SOLUTION_OPTIONS[0],
  );
  const [inputValue, setInputValue] = useState<string>('');
  const [analyzedPrompt, setAnalyzedPrompt] = useState<string>(
    SOLUTION_OPTIONS[0].userPrompt,
  );
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisStep, setAnalysisStep] = useState<number>(0);
  const shouldReduceMotion = useReducedMotion();
  const inputRef = useRef<HTMLInputElement>(null);

  const triggerAnalysis = (option: SolutionMatch, customText?: string) => {
    setIsAnalyzing(true);
    setAnalysisStep(1);
    const query = customText || option.userPrompt;
    setAnalyzedPrompt(query);

    // Brief visual analysis sequence
    setTimeout(() => setAnalysisStep(2), 160);
    setTimeout(() => setAnalysisStep(3), 320);
    setTimeout(() => {
      setActiveScenario(option);
      setIsAnalyzing(false);
      setAnalysisStep(0);
    }, 480);
  };

  const handleChipClick = (option: SolutionMatch) => {
    setInputValue(option.userPrompt);
    triggerAnalysis(option, option.userPrompt);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = inputValue.trim();
    if (!query) return;

    // Business-language keyword matching
    const lower = query.toLowerCase();
    let matched = SOLUTION_OPTIONS[0]; // Default: Automation

    if (
      lower.includes('ai') ||
      lower.includes('bot') ||
      lower.includes('rag') ||
      lower.includes('llm') ||
      lower.includes('pdf') ||
      lower.includes('information') ||
      lower.includes('documents') ||
      lower.includes('hallucinat') ||
      lower.includes('knowledge') ||
      lower.includes('find') ||
      lower.includes('search') ||
      lower.includes('chat') ||
      lower.includes('answer')
    ) {
      matched = SOLUTION_OPTIONS[1]; // AI & Intelligent Systems
    } else if (
      lower.includes('software') ||
      lower.includes('app') ||
      lower.includes('saas') ||
      lower.includes('custom') ||
      lower.includes('build') ||
      lower.includes('outgrown') ||
      lower.includes('product') ||
      lower.includes('tool') ||
      lower.includes('portal')
    ) {
      matched = SOLUTION_OPTIONS[2]; // Software & Product Engineering
    } else if (
      lower.includes('website') ||
      lower.includes('legacy') ||
      lower.includes('monolith') ||
      lower.includes('slow') ||
      lower.includes('wordpress') ||
      lower.includes('redesign') ||
      lower.includes('digital experience') ||
      lower.includes('outdated') ||
      lower.includes('conversion') ||
      lower.includes('design') ||
      lower.includes('ui') ||
      lower.includes('ux')
    ) {
      matched = SOLUTION_OPTIONS[3]; // Digital Transformation
    } else if (
      lower.includes('data') ||
      lower.includes('bi') ||
      lower.includes('report') ||
      lower.includes('analytics') ||
      lower.includes('dashboard') ||
      lower.includes('metric') ||
      lower.includes('kpi') ||
      lower.includes('insight') ||
      lower.includes('spreadsheet')
    ) {
      matched = SOLUTION_OPTIONS[4]; // Data & Business Intelligence
    } else if (
      lower.includes('api') ||
      lower.includes('crm') ||
      lower.includes('erp') ||
      lower.includes('stripe') ||
      lower.includes('sync') ||
      lower.includes('connect') ||
      lower.includes('integrate') ||
      lower.includes('payment') ||
      lower.includes('systems')
    ) {
      matched = SOLUTION_OPTIONS[5]; // Technology Integration
    } else if (
      lower.includes('manual') ||
      lower.includes('repetitive') ||
      lower.includes('tedious') ||
      lower.includes('automat') ||
      lower.includes('workflow') ||
      lower.includes('approval') ||
      lower.includes('copy') ||
      lower.includes('paste')
    ) {
      matched = SOLUTION_OPTIONS[0]; // Automation & Digital Operations
    }

    triggerAnalysis(matched, query);
  };

  return (
    <section
      id="find-solution"
      className="relative w-full py-16 sm:py-20 lg:py-24 bg-[#FAFAFC] border-y border-neutral-200/80 overflow-hidden scroll-mt-24"
    >
      {/* Invisible anchor target for backwards compatibility with #diagnostic */}
      <span id="diagnostic" className="sr-only" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="flex items-center justify-center gap-3 mb-3 sm:mb-4">
            <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-pulse" />
            <span className="font-tech text-xs tracking-[0.25em] font-semibold text-brand-600 uppercase">
              03 // PROBLEM MATCHING
            </span>
            <div className="h-px w-10 sm:w-16 bg-neutral-200" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] text-neutral-950 uppercase leading-[1.12]">
            FIND THE RIGHT SOLUTION{' '}
            <br className="hidden sm:block" />
            FOR YOUR{' '}
            <span className="gradient-signature-text">
              PROBLEM.
            </span>
          </h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-neutral-600 font-normal leading-relaxed">
            Not sure what technology you need? Tell us what is slowing your business down, or choose a common problem below to see what could help.
          </p>
        </div>

        {/* ── THE SOLUTION FINDER CONSOLE ── */}
        <div className="max-w-5xl mx-auto rounded-2xl sm:rounded-3xl bg-white border border-neutral-200/90 shadow-xl shadow-purple-500/[0.04] overflow-hidden">

          {/* Console Status Header */}
          <div className="px-5 sm:px-6 py-3 bg-neutral-900 text-white flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2.5">
              <div className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-500" />
              </div>
              <span className="font-bold text-neutral-100 tracking-wider">
                KAIROS // SOLUTION FINDER
              </span>
              <span className="text-neutral-500 hidden sm:inline">•</span>
              <span className="text-purple-400 text-[11px] hidden sm:inline">
                Problem → Technology Match
              </span>
            </div>

            <div className="flex items-center gap-2 text-neutral-400 text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>READY</span>
            </div>
          </div>

          {/* ── 1. INPUT BAR ── */}
          <div className="p-5 sm:p-7 bg-gradient-to-b from-white to-[#FAFAFC] border-b border-neutral-100">
            <form onSubmit={handleSubmit} className="relative">
              <div className="relative flex items-center rounded-2xl bg-white border-2 border-purple-500/30 focus-within:border-purple-600 focus-within:ring-4 focus-within:ring-purple-500/10 shadow-md transition-all duration-200">

                {/* Sparkles Icon */}
                <div className="pl-4 sm:pl-5 pr-2 flex items-center pointer-events-none text-purple-600 shrink-0">
                  <Sparkles className="w-5 h-5 animate-pulse" />
                </div>

                {/* Main Input Field */}
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Tell us what is slowing your business down..."
                  className="w-full py-4 pr-36 sm:pr-40 text-xs sm:text-sm font-medium text-neutral-900 placeholder-neutral-400 bg-transparent focus:outline-hidden"
                />

                {/* Submit Button */}
                <div className="absolute right-2 sm:right-2.5 flex items-center gap-1.5">
                  <button
                    type="submit"
                    disabled={isAnalyzing}
                    className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 active:scale-[0.98] text-white text-xs font-semibold tracking-wide transition-all shadow-sm flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
                  >
                    <span>Find a Solution</span>
                    <CornerDownLeft className="w-3.5 h-3.5 opacity-80" />
                  </button>
                </div>
              </div>
            </form>

            {/* Quick Prompt Starter Chips */}
            <div className="mt-4">
              <div className="flex items-center gap-2 mb-2.5 text-[11px] font-mono font-semibold text-neutral-400 uppercase tracking-wider">
                <Search className="w-3.5 h-3.5 text-purple-600" />
                <span>Or choose a common problem:</span>
              </div>

              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {SOLUTION_OPTIONS.map((opt) => {
                  const isSelected = opt.id === activeScenario.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleChipClick(opt)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 cursor-pointer flex items-center gap-1.5 border ${
                        isSelected
                          ? 'bg-purple-600 text-white border-purple-600 shadow-xs shadow-purple-600/20 scale-[1.01]'
                          : 'bg-white hover:bg-neutral-100 text-neutral-700 border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      <span>{opt.chipLabel}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── 2. ANALYSIS PROGRESS BAR ── */}
          <AnimatePresence>
            {isAnalyzing && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="px-5 sm:px-7 py-3 bg-purple-50/70 border-b border-purple-100 flex items-center gap-3 text-xs font-mono text-purple-800 overflow-hidden"
              >
                <RefreshCw className="w-4 h-4 animate-spin text-purple-600 shrink-0" />
                <div className="flex items-center gap-2">
                  <span className="font-semibold">KAIROS:</span>
                  {analysisStep === 1 && <span>Understanding your problem...</span>}
                  {analysisStep === 2 && <span>Matching across six solution areas...</span>}
                  {analysisStep >= 3 && <span>Finding the best direction...</span>}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── 3. RESULT OUTPUT ── */}
          <div className="p-5 sm:p-7 lg:p-8 bg-white">

            {/* User Prompt Echo */}
            <div className="mb-5 pb-4 border-b border-neutral-100 flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-neutral-100 text-neutral-600 flex items-center justify-center shrink-0 text-xs font-bold font-mono">
                Q:
              </div>
              <div className="flex-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-semibold block">
                  YOUR INPUT
                </span>
                <p className="text-xs sm:text-sm font-medium text-neutral-900 mt-0.5 italic">
                  &ldquo;{analyzedPrompt}&rdquo;
                </p>
              </div>
            </div>

            {/* Result Card */}
            <motion.div
              key={activeScenario.id}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              {/* Suggested Solution Area Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-purple-50/60 border border-purple-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-xs shadow-purple-600/30">
                    <Lightbulb className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono font-bold tracking-widest text-purple-700 uppercase">
                      SUGGESTED SOLUTION AREA
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-neutral-900">
                      {activeScenario.solutionNumber} // {activeScenario.solutionName}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Two-Column: What We Heard + How We Could Approach It */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#FAFAFC] border border-neutral-200/80">
                  <div className="text-[11px] font-mono font-bold text-neutral-400 uppercase tracking-wider mb-1.5">
                    01 // WHAT WE HEARD
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-normal">
                    {activeScenario.whatWeHeard}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#FAFAFC] border border-neutral-200/80">
                  <div className="text-[11px] font-mono font-bold text-purple-700 uppercase tracking-wider mb-1.5">
                    02 // HOW WE COULD APPROACH IT
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-normal">
                    {activeScenario.howWeCouldApproachIt}
                  </p>
                </div>
              </div>

              {/* Pipeline Flow — HOW IT WORKS */}
              <div>
                <div className="flex items-center gap-1.5 mb-3 text-[11px] font-mono font-semibold text-neutral-500 uppercase tracking-wider">
                  <ChevronRight className="w-3.5 h-3.5 text-purple-600" />
                  <span>HOW IT WORKS</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                  {activeScenario.pipelineNodes.map((node, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-[#FAFAFC] border border-neutral-200/80 hover:border-purple-300 transition-colors flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-white border border-neutral-200 text-purple-700">
                          {node.step}
                        </span>
                        {idx < 3 && (
                          <ChevronRight className="w-3.5 h-3.5 text-neutral-300 hidden lg:block" />
                        )}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-neutral-900">
                          {node.label}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Approach + Example Output Footer */}
              <div className="pt-4 border-t border-neutral-100 space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 p-3 rounded-lg bg-[#FAFAFC] border border-neutral-200/80">
                    <div className="text-[10px] font-mono font-bold text-purple-700 uppercase tracking-wider mb-1">
                      APPROACH
                    </div>
                    <p className="text-xs text-neutral-700 font-medium">
                      {activeScenario.approach}
                    </p>
                  </div>
                  <div className="flex-1 p-3 rounded-lg bg-[#FAFAFC] border border-neutral-200/80">
                    <div className="text-[10px] font-mono font-bold text-purple-700 uppercase tracking-wider mb-1">
                      EXAMPLE OUTPUT
                    </div>
                    <p className="text-xs text-neutral-700 font-medium">
                      {activeScenario.exampleOutput}
                    </p>
                  </div>
                </div>

                {/* Disclaimer + CTA */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  <p className="flex items-start gap-1.5 text-[11px] text-neutral-400 italic leading-relaxed max-w-md">
                    <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span>
                      This is an initial direction based on your input. The right solution depends on your existing systems, workflows, and requirements.
                    </span>
                  </p>

                  <Link
                    href={activeScenario.slug}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold tracking-wide transition-all shadow-sm hover:shadow-md shrink-0 cursor-pointer"
                  >
                    <span>Explore {activeScenario.solutionName}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}
