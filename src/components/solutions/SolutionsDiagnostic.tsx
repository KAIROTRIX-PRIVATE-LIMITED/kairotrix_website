'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  Send,
  Bot,
  CheckCircle2,
  RefreshCw,
  Terminal,
  Cpu,
  Layers,
  ShieldCheck,
  Zap,
  Workflow,
  Search,
  ChevronRight,
  CornerDownLeft,
} from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ArchitectureOption {
  id: string;
  chipLabel: string;
  userPrompt: string;
  disciplineNumber: string;
  disciplineName: string;
  slug: string;
  aiDiagnosis: string;
  solutionSummary: string;
  pipelineNodes: { step: string; label: string; tech: string }[];
  kpi: string;
  sla: string;
}

const AI_OPTIONS: ArchitectureOption[] = [
  {
    id: 'automation',
    chipLabel: '⚡ Manual Workflows & Spreadsheets',
    userPrompt: 'Our team wastes 15+ hours weekly copying data between spreadsheets and chasing manual email approvals.',
    disciplineNumber: '03',
    disciplineName: 'Automation & Digital Operations',
    slug: '/solutions/automation-digital-operations',
    aiDiagnosis:
      'Class-3 Operational Latency. Repetitive manual handoffs between siloed tools create execution lag, human copy-paste errors, and blocked teams.',
    solutionSummary:
      'We engineer deterministic event-driven webhook pipelines, autonomous background bots, and idempotent database sync layers to run ops hands-free.',
    pipelineNodes: [
      { step: '01', label: 'Webhook Event Mesh', tech: 'Cloudflare Workers / Inngest' },
      { step: '02', label: 'Document OCR AI', tech: 'Vision Transformer Parser' },
      { step: '03', label: 'Autonomous Ops Bot', tech: 'Idempotent Queue Engine' },
      { step: '04', label: 'Target System Sync', tech: 'PostgreSQL / ERP Bus' },
    ],
    kpi: '80% Reduction in Operational Cycle Time',
    sla: '100% Deterministic Execution Guarantee',
  },
  {
    id: 'ai-knowledge',
    chipLabel: '🧠 Trapped Knowledge & Hallucinations',
    userPrompt: 'Our company knowledge is buried in wikis, PDFs, and chats. Queries take hours and generic AI tools hallucinate answers.',
    disciplineNumber: '01',
    disciplineName: 'AI & Intelligent Systems',
    slug: '/solutions/ai-intelligent-systems',
    aiDiagnosis:
      'Unstructured Knowledge Siloing. Public LLMs lack company context and leak data, while keyword search fails to answer complex contextual questions.',
    solutionSummary:
      'We deploy a private, isolated enterprise RAG architecture with vector similarity search, mathematical citation verification, and strict zero-hallucination guardrails.',
    pipelineNodes: [
      { step: '01', label: 'Multi-Source Chunking', tech: 'Docling / Unstructured.io' },
      { step: '02', label: 'Hybrid Vector Embed', tech: 'Qdrant / pgvector HNSW' },
      { step: '03', label: 'Fact-Check Guardrail', tech: 'Deterministic Rerank Engine' },
      { step: '04', label: 'Audited AI Copilot', tech: 'Private VPC LLM Mesh' },
    ],
    kpi: '99.98% Citation Accuracy SLA',
    sla: 'Zero Model Data Leakage / VPC Isolation',
  },
  {
    id: 'software',
    chipLabel: '💻 Outgrown Rigid SaaS',
    userPrompt: 'We have outgrown generic SaaS tools and need bespoke software with 100% full source code ownership and custom workflows.',
    disciplineNumber: '02',
    disciplineName: 'Software & Product Engineering',
    slug: '/solutions/software-product-engineering',
    aiDiagnosis:
      'SaaS Capability Ceiling. Generic off-the-shelf software charges exorbitant per-seat licenses while blocking tailored workflows and proprietary logic.',
    solutionSummary:
      'We engineer bespoke, enterprise-grade web applications from 0 to 1 with modern Next.js 15, sub-18ms API gateways, and complete source code ownership.',
    pipelineNodes: [
      { step: '01', label: 'Next.js 15 App Core', tech: 'React Server Components' },
      { step: '02', label: 'gRPC / REST Gateway', tech: 'High-Throughput Node Mesh' },
      { step: '03', label: 'Isolated Database', tech: 'Multi-Tenant PostgreSQL' },
      { step: '04', label: 'Global Edge Runtime', tech: 'Sub-18ms Latency Mesh' },
    ],
    kpi: '< 18ms P99 Request Latency',
    sla: '100% Complete IP & Source Ownership',
  },
  {
    id: 'transformation',
    chipLabel: '🌐 Slow Legacy Web & Monoliths',
    userPrompt: 'Our legacy website or software is slow, difficult to update, and our enterprise conversion rate is plummeting.',
    disciplineNumber: '04',
    disciplineName: 'Digital Transformation',
    slug: '/solutions/digital-transformation',
    aiDiagnosis:
      'Monolithic Technical Debt. Outdated CMS platforms cause slow TTFB (>2.5s), hurt Google Core Web Vitals, and fail modern mobile expectations.',
    solutionSummary:
      'We decouple legacy monoliths into lightning-fast headless architectures with automated zero-downtime database transitions.',
    pipelineNodes: [
      { step: '01', label: 'Decoupling Gateway', tech: 'Edge Routing Proxy' },
      { step: '02', label: 'Headless Content API', tech: 'Zero-Downtime Data Sync' },
      { step: '03', label: 'Modern Reactive UI', tech: 'Tailwind + Framer Motion' },
      { step: '04', label: 'Global CDN Delivery', tech: 'Lighthouse 98+ Score' },
    ],
    kpi: '3.4x Faster Page Speeds & 98+ Performance',
    sla: 'Zero-Downtime Migration Warranty',
  },
  {
    id: 'data-bi',
    chipLabel: '📊 Blind to Real-Time Data',
    userPrompt: 'We have millions of data points, but leadership relies on stale end-of-month spreadsheets and gut feelings to make decisions.',
    disciplineNumber: '05',
    disciplineName: 'Data & Business Intelligence',
    slug: '/solutions/data-business-intelligence',
    aiDiagnosis:
      'Executive Telemetry Blindness. Decision-makers operate on lagging 30-day exports across fragmented tools with zero real-time visibility.',
    solutionSummary:
      'We build real-time streaming ETL pipelines and lightning-fast ClickHouse analytics engines feeding interactive C-Suite command centers.',
    pipelineNodes: [
      { step: '01', label: 'Streaming Data Ingest', tech: 'Apache Kafka / Debezium' },
      { step: '02', label: 'Columnar Warehouse', tech: 'ClickHouse / dbt Pipeline' },
      { step: '03', label: 'Predictive ML Engine', tech: 'Automated Trend Forecasting' },
      { step: '04', label: 'Live Executive HUD', tech: 'Sub-Second KPI Dashboard' },
    ],
    kpi: 'Sub-Second Executive Telemetry Refresh',
    sla: 'Deterministic Data Freshness SLA',
  },
  {
    id: 'integration',
    chipLabel: '🔌 Fractured CRM, ERP & Payment APIs',
    userPrompt: 'Our CRM, ERP, payment gateways, and warehouse systems do not communicate in real time, causing inventory and billing drift.',
    disciplineNumber: '06',
    disciplineName: 'Technology Integration',
    slug: '/solutions/technology-integration',
    aiDiagnosis:
      'API Mesh Fragmentation. Unsynchronized point-to-point connections create inventory drift, duplicate charges, and manual reconciliation overhead.',
    solutionSummary:
      'We architect high-resilience API gateways with event queues, dead-letter recovery, and bidirectional real-time state synchronization.',
    pipelineNodes: [
      { step: '01', label: 'Universal Gateway', tech: 'Rate-Limited Reverse Proxy' },
      { step: '02', label: 'Dead-Letter Queue', tech: 'Redis / BullMQ Resilience' },
      { step: '03', label: 'Bi-Directional Mesh', tech: 'Idempotent Webhook Engine' },
      { step: '04', label: 'Audited Event Ledger', tech: 'Immutable Transaction Log' },
    ],
    kpi: '99.99% Transaction Delivery SLA',
    sla: 'Zero Lost Payload & Auto-Healing Queue',
  },
];

export function SolutionsDiagnostic() {
  const [activeScenario, setActiveScenario] = useState<ArchitectureOption>(AI_OPTIONS[0]);
  const [inputValue, setInputValue] = useState<string>('');
  const [analyzedPrompt, setAnalyzedPrompt] = useState<string>(AI_OPTIONS[0].userPrompt);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisStep, setAnalysisStep] = useState<number>(0);
  const shouldReduceMotion = useReducedMotion();
  const inputRef = useRef<HTMLInputElement>(null);

  const triggerAnalysis = (option: ArchitectureOption, customText?: string) => {
    setIsAnalyzing(true);
    setAnalysisStep(1);
    const query = customText || option.userPrompt;
    setAnalyzedPrompt(query);

    // Simulated multi-step AI reasoning sequence
    setTimeout(() => setAnalysisStep(2), 160);
    setTimeout(() => setAnalysisStep(3), 320);
    setTimeout(() => {
      setActiveScenario(option);
      setIsAnalyzing(false);
      setAnalysisStep(0);
    }, 480);
  };

  const handleChipClick = (option: ArchitectureOption) => {
    setInputValue(option.userPrompt);
    triggerAnalysis(option, option.userPrompt);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = inputValue.trim();
    if (!query) return;

    // Intelligent keyword matching to map any user input to the correct discipline
    const lower = query.toLowerCase();
    let matched = AI_OPTIONS[0];

    if (
      lower.includes('ai') ||
      lower.includes('bot') ||
      lower.includes('rag') ||
      lower.includes('llm') ||
      lower.includes('pdf') ||
      lower.includes('vector') ||
      lower.includes('hallucinat') ||
      lower.includes('knowledge') ||
      lower.includes('search') ||
      lower.includes('chat')
    ) {
      matched = AI_OPTIONS[1]; // AI & Intelligent Systems
    } else if (
      lower.includes('software') ||
      lower.includes('app') ||
      lower.includes('saas') ||
      lower.includes('custom code') ||
      lower.includes('build') ||
      lower.includes('ownership') ||
      lower.includes('product')
    ) {
      matched = AI_OPTIONS[2]; // Software & Product Engineering
    } else if (
      lower.includes('monolith') ||
      lower.includes('legacy') ||
      lower.includes('slow') ||
      lower.includes('website') ||
      lower.includes('wordpress') ||
      lower.includes('speed') ||
      lower.includes('conversion') ||
      lower.includes('redesign')
    ) {
      matched = AI_OPTIONS[3]; // Digital Transformation
    } else if (
      lower.includes('data') ||
      lower.includes('bi') ||
      lower.includes('report') ||
      lower.includes('analytics') ||
      lower.includes('dashboard') ||
      lower.includes('telemetry') ||
      lower.includes('metric')
    ) {
      matched = AI_OPTIONS[4]; // Data & BI
    } else if (
      lower.includes('api') ||
      lower.includes('crm') ||
      lower.includes('erp') ||
      lower.includes('stripe') ||
      lower.includes('sync') ||
      lower.includes('connect') ||
      lower.includes('integrate') ||
      lower.includes('warehouse')
    ) {
      matched = AI_OPTIONS[5]; // Technology Integration
    } else {
      matched = AI_OPTIONS[0]; // Automation & Digital Operations
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

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="inline-block w-2 h-2 rounded-full bg-purple-600 animate-pulse" />
            <span className="font-tech text-xs tracking-[0.25em] font-semibold text-brand-600 uppercase">
              INTERACTIVE ARCHITECTURAL DIAGNOSTIC
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 leading-tight">
            FIND YOUR{' '}
            <span className="gradient-signature-text">
              SOLUTION.
            </span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-600 font-normal">
            Describe your core operational friction or select a prompt below. KAIROS AI maps your challenge to the exact engineering discipline and blueprint.
          </p>
        </div>

        {/* ── THE AI INTERACTION CONSOLE ── */}
        <div className="rounded-2xl sm:rounded-3xl bg-white border border-neutral-200/90 shadow-xl shadow-purple-500/[0.04] overflow-hidden">
          
          {/* Top Status Header */}
          <div className="px-5 sm:px-6 py-3 bg-neutral-900 text-white flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2.5">
              <div className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-500" />
              </div>
              <span className="font-bold text-neutral-100 tracking-wider">KAIROS AI // ARCHITECTURAL COPILOT</span>
              <span className="text-neutral-500 hidden sm:inline">•</span>
              <span className="text-purple-400 text-[11px] hidden sm:inline">v2.4 Deterministic Engine</span>
            </div>

            <div className="flex items-center gap-2 text-neutral-400 text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Ready for input</span>
            </div>
          </div>

          {/* ── 1. PROMINENT AI PROMPT INPUT BAR (THE MAIN INTERACTION) ── */}
          <div className="p-5 sm:p-7 bg-gradient-to-b from-white to-[#FAFAFC] border-b border-neutral-100">
            <form onSubmit={handleSubmit} className="relative">
              <div className="relative flex items-center rounded-2xl bg-white border-2 border-purple-500/30 focus-within:border-purple-600 focus-within:ring-4 focus-within:ring-purple-500/10 shadow-md transition-all duration-200">
                
                {/* AI Sparkles Icon */}
                <div className="pl-4 sm:pl-5 pr-2 flex items-center pointer-events-none text-purple-600 shrink-0">
                  <Sparkles className="w-5 h-5 animate-pulse" />
                </div>

                {/* Main Input Field */}
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Describe your technical challenge or operational friction..."
                  className="w-full py-4 pr-32 sm:pr-36 text-xs sm:text-sm font-medium text-neutral-900 placeholder-neutral-400 bg-transparent focus:outline-hidden"
                />

                {/* Submit / Ask AI Button */}
                <div className="absolute right-2 sm:right-2.5 flex items-center gap-1.5">
                  <button
                    type="submit"
                    disabled={isAnalyzing}
                    className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 active:scale-[0.98] text-white text-xs font-semibold tracking-wide transition-all shadow-sm flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
                  >
                    <span>Diagnose</span>
                    <CornerDownLeft className="w-3.5 h-3.5 opacity-80" />
                  </button>
                </div>
              </div>
            </form>

            {/* Quick Prompt Starter Chips */}
            <div className="mt-4">
              <div className="flex items-center gap-2 mb-2.5 text-[11px] font-mono font-semibold text-neutral-400 uppercase tracking-wider">
                <Terminal className="w-3.5 h-3.5 text-purple-600" />
                <span>Or select a challenge to test:</span>
              </div>

              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {AI_OPTIONS.map((opt) => {
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

          {/* ── 2. AI REASONING / THINKING TRACE BAR (WHEN TRIGGERED) ── */}
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
                  <span className="font-semibold">KAIROS AI:</span>
                  {analysisStep === 1 && <span>Parsing operational constraints & root bottleneck...</span>}
                  {analysisStep === 2 && <span>Evaluating 6 core engineering disciplines...</span>}
                  {analysisStep >= 3 && <span>Synthesizing deterministic architecture blueprint...</span>}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── 3. AI INTERACTION OUTPUT CANVAS ── */}
          <div className="p-5 sm:p-7 lg:p-8 bg-white">
            
            {/* User Prompt Context Echo */}
            <div className="mb-5 pb-4 border-b border-neutral-100 flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-neutral-100 text-neutral-600 flex items-center justify-center shrink-0 text-xs font-bold font-mono">
                Q:
              </div>
              <div className="flex-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-semibold block">
                  Analyzed Operational Prompt
                </span>
                <p className="text-xs sm:text-sm font-medium text-neutral-900 mt-0.5 italic">
                  &ldquo;{analyzedPrompt}&rdquo;
                </p>
              </div>
            </div>

            {/* AI Diagnosis Output Card */}
            <motion.div
              key={activeScenario.id}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              {/* Prescribed Discipline Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-purple-50/60 border border-purple-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-xs shadow-purple-600/30">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono font-bold tracking-widest text-purple-700 uppercase">
                      PRESCRIBED DISCIPLINE {activeScenario.disciplineNumber}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-neutral-900">
                      {activeScenario.disciplineName}
                    </h3>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-purple-200 text-xs font-semibold text-purple-700 shadow-2xs self-start sm:self-auto">
                  <Zap className="w-3.5 h-3.5 text-purple-600" />
                  <span>{activeScenario.kpi}</span>
                </div>
              </div>

              {/* Two-Column Diagnosis & Solution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#FAFAFC] border border-neutral-200/80">
                  <div className="text-[11px] font-mono font-bold text-neutral-400 uppercase tracking-wider mb-1.5">
                    // 01 AI Diagnosis of Root Cause
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-normal">
                    {activeScenario.aiDiagnosis}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#FAFAFC] border border-neutral-200/80">
                  <div className="text-[11px] font-mono font-bold text-purple-700 uppercase tracking-wider mb-1.5">
                    // 02 Engineered Architectural Solution
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-normal">
                    {activeScenario.solutionSummary}
                  </p>
                </div>
              </div>

              {/* Interactive Architecture Flow Diagram (Pipeline Nodes) */}
              <div>
                <div className="flex items-center justify-between mb-3 text-[11px] font-mono font-semibold text-neutral-500 uppercase tracking-wider">
                  <div className="flex items-center gap-1.5">
                    <Workflow className="w-3.5 h-3.5 text-purple-600" />
                    <span>Engineered 4-Node Architecture Pipeline</span>
                  </div>
                  <span className="text-neutral-400 text-[10px]">Deterministic Topology</span>
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
                        <div className="text-[11px] font-mono text-neutral-500 mt-0.5">
                          {node.tech}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Commitments & Direct CTA */}
              <div className="pt-4 border-t border-neutral-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4 text-xs text-neutral-600 font-medium">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-purple-600" />
                    <span>{activeScenario.sla}</span>
                  </div>
                </div>

                <Link
                  href={activeScenario.slug}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold tracking-wide transition-all shadow-sm hover:shadow-md shrink-0 cursor-pointer"
                >
                  <span>Explore Full Architecture & Tech Specs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}

