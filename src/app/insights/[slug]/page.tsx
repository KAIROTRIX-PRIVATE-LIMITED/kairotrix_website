import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  Clock,
  Calendar,
  Share2,
  Copy,
  ExternalLink,
  Check,
  Cpu,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Terminal,
} from 'lucide-react';
import { getInsightBySlug, getRelatedInsights } from '@/lib/services/insightsService';
import { InsightsCTA } from '@/components/insights/InsightsCTA';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const specimen = await getInsightBySlug(slug, true);

  if (!specimen) {
    return {
      title: 'Article Not Found — KAIROTRIX',
      description: 'The requested engineering article could not be found.',
    };
  }

  return {
    title: `${specimen.title} — KAIROTRIX Engineering`,
    description: specimen.excerpt,
    keywords: [
      specimen.techCategoryLabel,
      specimen.disciplineName,
      ...specimen.tags,
      'engineering blog',
      'system architecture',
    ],
    openGraph: {
      title: specimen.title,
      description: specimen.excerpt,
      type: 'article',
      publishedTime: specimen.date,
      authors: [specimen.author],
      tags: specimen.tags,
    },
  };
}

export default async function InsightDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const specimen = await getInsightBySlug(slug, true);

  if (!specimen) {
    notFound();
  }

  const relatedInsights = await getRelatedInsights(slug, specimen.techCategoryId, 2);

  return (
    <div className="w-full min-h-screen bg-neutral-50 text-neutral-900">
      {/* ─── AMBIENT ATMOSPHERIC BACKGROUND ─── */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[500px] bg-gradient-to-b from-brand-500/10 via-brand-500/[0.03] to-transparent rounded-full blur-3xl pointer-events-none z-0"
        aria-hidden="true"
      />

      <article className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-20">
        {/* ─── 1. BREADCRUMBS & BACK LINK ─── */}
        <div className="mb-8 flex items-center justify-between gap-4">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-500 hover:text-neutral-900 transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-brand-600" />
            <span>Back to Articles &amp; Engineering Blog</span>
          </Link>

          <span className="font-mono text-[11px] uppercase tracking-wider px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 font-semibold shadow-xs">
            {specimen.badge}
          </span>
        </div>

        {/* ─── 2. HERO HEADER ─── */}
        <header className="mb-10 sm:mb-14">
          {/* Eyebrow / Category Pill */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 font-mono text-xs font-semibold uppercase tracking-wider shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
              {specimen.techCategoryLabel}
            </span>

            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-500">
              <Clock className="w-3.5 h-3.5 text-neutral-400" />
              <span>{specimen.readTime}</span>
            </span>

            <span className="text-neutral-300">•</span>

            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-500">
              <Calendar className="w-3.5 h-3.5 text-neutral-400" />
              <span>{specimen.date}</span>
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-neutral-950 tracking-tight leading-[1.12] mb-6">
            {specimen.title}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-neutral-600 font-sans leading-relaxed max-w-3xl mb-8">
            {specimen.subtitle}
          </p>

          {/* Author Card Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-5 border-y border-neutral-200/80">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-brand-600 via-purple-600 to-indigo-600 text-white flex items-center justify-center font-display font-bold text-sm shadow-xs">
                {specimen.author.charAt(0)}
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block leading-tight">
                  Written by
                </span>
                <span className="text-sm sm:text-base font-sans font-semibold text-neutral-900">
                  {specimen.author}
                </span>
                <span className="text-xs text-brand-600 font-mono block">
                  {specimen.authorRole}
                </span>
              </div>
            </div>

            {/* Tags Ribbon */}
            <div className="flex flex-wrap items-center gap-1.5">
              {specimen.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 rounded-md bg-neutral-100 border border-neutral-200/80 text-[11px] font-mono text-neutral-600"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </header>

        {/* ─── 3. FEATURED COVER MEDIA ─── */}
        <div className="relative w-full rounded-3xl overflow-hidden bg-white border border-neutral-200/80 mb-12 sm:mb-16 shadow-lg aspect-[16/9]">
          {specimen.videoSrc ? (
            <video
              src={specimen.videoSrc}
              poster={specimen.image || undefined}
              controls
              playsInline
              className="w-full h-full object-cover"
            />
          ) : specimen.image ? (
            <Image
              src={specimen.image}
              alt={specimen.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200 text-neutral-500 font-mono text-xs">
              KAIROTRIX Architectural Specimen
            </div>
          )}
        </div>

        {/* ─── 4. KEY INVARIANT & EMPIRICAL BENCHMARK CALLOUTS ─── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12 sm:mb-16">
          {/* Key Takeaway / Production Invariant */}
          <div className="md:col-span-8 p-6 sm:p-8 rounded-2xl bg-brand-50/60 border border-brand-200/80 shadow-xs">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-brand-700 font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
              <span>CORE ARCHITECTURAL TAKEAWAY</span>
            </div>
            <p className="text-sm sm:text-base text-neutral-800 font-sans leading-relaxed">
              {specimen.keyTakeaway}
            </p>
          </div>

          {/* Empirical Benchmark Metric */}
          <div className="md:col-span-4 p-6 sm:p-8 rounded-2xl bg-white border border-neutral-200/80 shadow-xs flex flex-col justify-between">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-500 mb-2">
              <Cpu className="w-3.5 h-3.5 text-brand-600" />
              <span>EMPIRICAL BENCHMARK</span>
            </div>
            <div className="my-2">
              <div className="text-3xl sm:text-4xl font-display font-bold text-neutral-950 tracking-tight">
                {specimen.empiricalMetric.value}
              </div>
              <div className="text-xs text-neutral-500 font-mono mt-1">
                {specimen.empiricalMetric.label}
              </div>
            </div>
            <div className="text-[11px] font-mono text-neutral-400 border-t border-neutral-100 pt-3">
              Verified in KAIROTRIX production testbed
            </div>
          </div>
        </div>

        {/* ─── 5. ARCHITECTURE EQUATION (IF PRESENT) ─── */}
        {specimen.architectureEquation && (
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-neutral-200/80 shadow-xs mb-12 sm:mb-16">
            <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 mb-4 font-semibold">
              SYSTEM FORMULA // ARCHITECTURAL COMPOSITION
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm sm:text-base font-mono">
              <span className="px-3 py-1.5 rounded-xl bg-neutral-100 border border-neutral-200 text-neutral-800 font-semibold">
                {specimen.architectureEquation.left}
              </span>
              <span className="text-brand-600 font-bold text-lg">
                {specimen.architectureEquation.operator}
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-neutral-100 border border-neutral-200 text-neutral-800 font-semibold">
                {specimen.architectureEquation.right}
              </span>
              <span className="text-brand-600 font-bold text-lg">=</span>
              <span className="px-3 py-1.5 rounded-xl bg-brand-50 border border-brand-200 text-brand-700 font-bold">
                {specimen.architectureEquation.outcome}
              </span>
            </div>
          </div>
        )}

        {/* ─── 6. RICH ARTICLE CONTENT BODY ─── */}
        <section className="article-rich-content mb-16 sm:mb-20">
          {specimen.content ? (
            /* Render HTML produced by the Word-style Blog Writer */
            <div
              className="prose prose-neutral max-w-none 
                prose-headings:font-display prose-headings:font-bold prose-headings:text-neutral-950 prose-headings:tracking-tight
                prose-h1:text-2xl prose-h1:sm:text-3xl prose-h1:mt-10 prose-h1:mb-4
                prose-h2:text-xl prose-h2:sm:text-2xl prose-h2:mt-8 prose-h2:mb-4
                prose-h3:text-lg prose-h3:sm:text-xl prose-h3:mt-6 prose-h3:mb-3
                prose-p:text-neutral-700 prose-p:font-sans prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-p:mb-6
                prose-blockquote:border-l-4 prose-blockquote:border-brand-500 prose-blockquote:bg-brand-50/60 prose-blockquote:py-3 prose-blockquote:px-5 prose-blockquote:rounded-r-xl prose-blockquote:text-neutral-800 prose-blockquote:italic
                prose-code:text-brand-700 prose-code:bg-neutral-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-mono prose-code:text-sm
                prose-pre:bg-neutral-900 prose-pre:text-neutral-100 prose-pre:border prose-pre:border-neutral-800 prose-pre:rounded-2xl prose-pre:p-5
                prose-ul:list-disc prose-ul:pl-6 prose-ul:text-neutral-700 prose-ul:space-y-2
                prose-ol:list-decimal prose-ol:pl-6 prose-ol:text-neutral-700 prose-ol:space-y-2
                prose-img:rounded-2xl prose-img:border prose-img:border-neutral-200 prose-img:my-8 prose-img:shadow-lg"
              dangerouslySetInnerHTML={{ __html: specimen.content }}
            />
          ) : (
            /* Default Rich Deep Dive for Specimens without raw HTML */
            <div className="space-y-10 text-neutral-700 font-sans text-base sm:text-lg leading-relaxed">
              <div>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-neutral-950 mb-4">
                  1. Production Problem &amp; Operational Bottleneck
                </h2>
                <p className="mb-4">
                  Modern enterprises increasingly rely on automated workflows, yet conventional software architectures struggle with high operational friction. In this engineering breakdown, we explore the precise invariants required to transition from fragile, error-prone processes to deterministic, high-throughput systems.
                </p>
                <p>
                  {specimen.excerpt}
                </p>
              </div>

              <div className="p-6 sm:p-8 rounded-2xl bg-white border border-neutral-200/80 shadow-xs">
                <h3 className="text-lg font-display font-bold text-neutral-950 mb-3">
                  Core Invariant Definition
                </h3>
                <p className="text-sm sm:text-base text-neutral-700 mb-4 font-mono">
                  {specimen.keyTakeaway}
                </p>
                <div className="flex items-center gap-2 text-xs font-mono text-brand-600 font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Guaranteed Deterministic Execution</span>
                </div>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-neutral-950 mb-4">
                  2. Architectural Invariants &amp; Execution Flow
                </h2>
                <p className="mb-4">
                  To eliminate unexpected failure modes, systems must adhere to strict contracts. We introduce zero-overhead telemetry checkpoints, idempotent message routing, and persistent state validation across every phase of execution.
                </p>
                <ul className="list-disc pl-6 space-y-3 text-neutral-700">
                  {specimen.keySections.map((section, idx) => (
                    <li key={idx} className="font-sans">
                      <strong className="text-neutral-900 font-medium">{section}</strong>: Verified through end-to-end automated replay testbeds under peak concurrency conditions.
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-neutral-950 mb-4">
                  3. Production Retrospective &amp; Empirical Results
                </h2>
                <p className="mb-4">
                  Deploying this pattern at enterprise scale yielded quantifiable efficiency improvements. The {specimen.empiricalMetric.label} benchmark recorded an immediate {specimen.empiricalMetric.value}, confirming stability under enterprise production load.
                </p>
              </div>
            </div>
          )}
        </section>

        {/* ─── 7. AUTHOR PROFILE & CREDENTIALS ─── */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-neutral-200/80 shadow-xs mb-16 sm:mb-20 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-600 to-purple-600 text-white flex items-center justify-center font-display font-bold text-2xl shrink-0 shadow-xs">
            {specimen.author.charAt(0)}
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h3 className="text-lg font-display font-bold text-neutral-950">
                {specimen.author}
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 font-mono text-[10px] font-semibold uppercase tracking-wider">
                {specimen.authorRole}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 font-sans leading-relaxed">
              Principal engineer at KAIROTRIX. Focuses on deterministic AI systems, fault-tolerant distributed infrastructure, and high-performance software engineering.
            </p>
          </div>
          <Link
            href="/about"
            className="shrink-0 px-4 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200/80 border border-neutral-200 text-neutral-800 font-mono text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer shadow-xs"
          >
            Meet the Team
          </Link>
        </div>

        {/* ─── 8. RELATED TECHNICAL ARTICLES ─── */}
        {relatedInsights.length > 0 && (
          <div className="border-t border-neutral-200/80 pt-12 sm:pt-16 mb-16">
            <div className="flex items-center justify-between gap-4 mb-8">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-brand-600 font-semibold block mb-1">
                  CONTINUE READING
                </span>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-neutral-950">
                  Related Engineering Articles
                </h2>
              </div>

              <Link
                href="/insights"
                className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-neutral-500 hover:text-neutral-900 transition-colors"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedInsights.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/insights/${rel.slug}`}
                  className="group block p-6 rounded-2xl bg-white hover:bg-brand-50/20 border border-neutral-200/80 hover:border-brand-300 shadow-xs hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center justify-between gap-2 text-xs font-mono text-neutral-500 mb-3">
                    <span className="text-brand-600 font-semibold">{rel.techCategoryLabel}</span>
                    <span>{rel.readTime}</span>
                  </div>
                  <h3 className="text-lg font-display font-bold text-neutral-950 group-hover:text-brand-700 transition-colors mb-2 line-clamp-2">
                    {rel.title}
                  </h3>
                  <p className="text-xs text-neutral-600 font-sans line-clamp-2 mb-4 leading-relaxed">
                    {rel.excerpt}
                  </p>
                  <div className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-neutral-900 group-hover:text-brand-600 transition-colors">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* ─── 9. CULMINATING CALL TO ACTION BANNER ─── */}
      <InsightsCTA />
    </div>
  );
}
