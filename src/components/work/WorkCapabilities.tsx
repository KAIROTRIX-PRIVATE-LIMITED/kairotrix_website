'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Cpu, Terminal, Layers, ArrowRight, Zap, Database, Lock } from 'lucide-react';

interface InvariantCard {
  id: string;
  number: string;
  title: string;
  invariant: string;
  description: string;
  benchmark: string;
  icon: React.ComponentType<{ className?: string }>;
}

const INVARIANTS: InvariantCard[] = [
  {
    id: 'inv-1',
    number: '01',
    title: 'Deterministic Multi-Agent Runtime',
    invariant: 'Finite Directed Acyclic Graph (DAG) Execution',
    description:
      'We eliminate stochastic LLM infinite loops through graph-based state machines, strict Zod function-calling schemas, and deterministic cost ceilings.',
    benchmark: '99.98% Tool Execution SLA',
    icon: ShieldCheck,
  },
  {
    id: 'inv-2',
    number: '02',
    title: 'Sub-Millisecond Event Streaming',
    invariant: 'Idempotent Zero-Lock Event Ingestion',
    description:
      'High-throughput distributed pipelines streaming directly to Redis and ClickHouse columnar storage with zero-latency client state synchronization.',
    benchmark: 'P99 < 16ms Latency',
    icon: Cpu,
  },
  {
    id: 'inv-3',
    number: '03',
    title: 'Sub-Second Attributed Retrieval',
    invariant: 'Mathematical Provenance & Source Citations',
    description:
      'Hybrid dense and sparse vector indexing with reciprocal rank fusion (RRF) ensuring 100% verifiability of all synthesized business intelligence.',
    benchmark: '< 180ms TTFT',
    icon: Database,
  },
  {
    id: 'inv-4',
    number: '04',
    title: 'Zero-Loss Autonomous Pipelines',
    invariant: 'Guaranteed Idempotency & Dead-Letter Replays',
    description:
      'Webhook ingestion fabric incorporating SHA-256 HMAC cryptographic signatures, partitioned message queues, and automated dead-letter replay buffers.',
    benchmark: '99.999% Delivery Guarantee',
    icon: Lock,
  },
];

const STACK_LAYERS = [
  {
    category: 'Foundation & AI Intelligence',
    items: ['Claude 3.5 Sonnet', 'OpenAI GPT-4o', 'PgVector', 'Pinecone', 'LangGraph', 'ONNX Runtime'],
  },
  {
    category: 'High-Performance Backend',
    items: ['Python FastAPI', 'Go (Golang)', 'Node.js', 'Redis Streams', 'ClickHouse', 'PostgreSQL'],
  },
  {
    category: 'Interface & Interactive Craft',
    items: ['Next.js 15 App Router', 'React 19', 'Tailwind CSS v4', 'Framer Motion', 'GSAP ScrollTrigger', 'TypeScript'],
  },
  {
    category: 'Edge & Infrastructure Mesh',
    items: ['Docker Containers', 'Kubernetes Clusters', 'AWS Lambda', 'Vercel Edge', 'Cloudflare Workers'],
  },
];

export function WorkCapabilities() {
  return (
    <section id="capabilities" className="w-full bg-neutral-50/70 py-20 lg:py-28 border-b border-neutral-200/80 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold tracking-wider font-tech uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-brand-500" />
            04.2 // ARCHITECTURAL STANDARDS
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 uppercase leading-[1.1]">
            ENGINEERING <span className="gradient-signature-text">INVARIANTS.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
            We don’t treat software engineering as a guessing game. Whether deploying high-throughput streaming systems or multi-agent autonomous swarms, we enforce four non-negotiable architectural invariants across every client and internal build.
          </p>
        </div>

        {/* 4 Invariant Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {INVARIANTS.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-6 sm:p-7 rounded-2xl bg-neutral-0 border border-neutral-200/80 hover:border-brand-500/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-xs font-bold text-brand-600 px-2.5 py-1 rounded-md bg-brand-50 border border-brand-100">
                      INVARIANT {card.number}
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-700">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-neutral-900 uppercase tracking-tight mb-2">
                    {card.title}
                  </h3>

                  <div className="font-mono text-xs text-brand-700 font-semibold mb-3">
                    &ldquo;{card.invariant}&rdquo;
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal mb-6">
                    {card.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                  <span className="font-tech text-[11px] text-neutral-600 uppercase tracking-wider font-semibold">
                    BENCHMARK
                  </span>
                  <span className="font-tech text-xs font-bold text-neutral-900 bg-neutral-100 px-2 py-0.5 rounded">
                    {card.benchmark}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Production Tech Stack Matrix */}
        <div className="p-8 sm:p-10 rounded-3xl bg-neutral-900 text-white border border-neutral-800 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-8 border-b border-white/10">
            <div>
              <span className="font-tech text-xs font-semibold uppercase tracking-wider text-brand-400 block mb-2">
                VERIFIED CAPABILITY MATRIX
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
                PRODUCTION TECHNOLOGY STACK
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-md font-normal leading-relaxed">
              We choose modern, battle-tested technologies based strictly on architectural merit, latency requirements, and long-term client maintainability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {STACK_LAYERS.map((layer, idx) => (
              <div key={idx} className="space-y-3">
                <h4 className="font-tech text-xs font-bold text-brand-300 uppercase tracking-wider pb-2 border-b border-white/10">
                  {layer.category}
                </h4>
                <ul className="space-y-2">
                  {layer.items.map((item, iIdx) => (
                    <li
                      key={iIdx}
                      className="font-mono text-xs text-neutral-300 flex items-center gap-2 hover:text-white transition-colors"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
