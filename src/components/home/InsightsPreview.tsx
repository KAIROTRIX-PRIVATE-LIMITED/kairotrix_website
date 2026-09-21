'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  BookOpen,
  Clock,
  Sparkles,
  Layers,
  FileText,
  Activity,
  Cpu,
  Play,
} from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

// ─────────────────────────────────────────────────────────────────────────────
// KAIROTRIX Section 06 — "Insights Preview" (Split Editorial Carousel)
//
// Asymmetrical Split Layout:
// Left: Sticky architectural header, narrative, research tags, odometer counter,
//       progress bar, and navigation controls.
// Right: Cards carousel with exact 1.5 card visibility (full card + half next card)
//        and directional left-fade when cards move leftwards.
// Strictly Light Theme (#FAFAFC / #FFFFFF), generous whitespace, refined typography.
// ─────────────────────────────────────────────────────────────────────────────

interface InsightArticle {
  id: string;
  badge: 'SYSTEM BLUEPRINT' | 'PERSPECTIVE' | 'TECHNICAL DEEP DIVE' | 'CASE STUDY' | 'RESEARCH';
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  tags: string[];
  slug: string;
  videoSrc: string;
  icon: typeof FileText;
}

const INSIGHTS: InsightArticle[] = [
  {
    id: 'deterministic-ai-agents',
    badge: 'SYSTEM BLUEPRINT',
    title: 'Architecting Deterministic Autonomous AI Agents for Enterprise Workflows',
    excerpt:
      'How to eliminate non-deterministic LLM hallucinations using strict schema validation contracts, tool-calling guardrails, and persistent context memory.',
    readTime: '8 min read',
    date: 'Sep 2026',
    tags: ['Autonomous Agents', 'Schema Contracts', 'Tool-Use'],
    slug: '/insights/deterministic-ai-agents',
    videoSrc: '/assets/videos/smart-search.mp4',
    icon: Cpu,
  },
  {
    id: 'problem-first-vs-saas-sprawl',
    badge: 'PERSPECTIVE',
    title: 'Why Problem-First Architecture Outperforms Pre-Packaged SaaS Vendor Stacks',
    excerpt:
      'A critical breakdown of enterprise software sprawl and how purpose-built bespoke software delivers significantly higher 5-year operational ROI.',
    readTime: '5 min read',
    date: 'Aug 2026',
    tags: ['Architecture', 'ROI', 'Software Strategy'],
    slug: '/insights/problem-first-vs-saas-sprawl',
    videoSrc: '/assets/videos/ai-assistant.mp4',
    icon: Sparkles,
  },
  {
    id: 'sub-50ms-telemetry-nextjs',
    badge: 'TECHNICAL DEEP DIVE',
    title: 'Engineering Sub-50ms Real-Time Event Telemetry with Next.js 15 & WebSockets',
    excerpt:
      'How to ingest and render thousands of high-frequency events per second with memory-efficient client canvas pipelines and WebSocket event streams.',
    readTime: '7 min read',
    date: 'Aug 2026',
    tags: ['Next.js 15', 'WebSockets', 'Telemetry'],
    slug: '/insights/sub-50ms-telemetry-nextjs',
    videoSrc: '/assets/videos/automated-workflows.mp4',
    icon: Activity,
  },
  {
    id: 'legacy-spreadsheets-to-event-bridge',
    badge: 'CASE STUDY',
    title: 'From Fragile Spreadsheets to an Event-Driven Operations Engine: A Technical Retrospective',
    excerpt:
      'The step-by-step architectural transition from manual operational spreadsheets to an automated webhook bridge syncing ERP and CRM databases.',
    readTime: '9 min read',
    date: 'Jul 2026',
    tags: ['Digital Transformation', 'Webhooks', 'ERP Sync'],
    slug: '/insights/legacy-spreadsheets-to-event-bridge',
    videoSrc: '/assets/videos/live-dashboard.mp4',
    icon: Layers,
  },
  {
    id: 'rag-vector-vs-hybrid-benchmarks',
    badge: 'RESEARCH',
    title: 'Evaluating RAG Retrieval Fidelity: Dense Vector Embeddings vs Hybrid BM25 Search',
    excerpt:
      'Empirical benchmarks comparing dense vector embeddings against hybrid BM25 lexical search across complex multi-tenant enterprise documentation.',
    readTime: '6 min read',
    date: 'Jun 2026',
    tags: ['Vector DB', 'RAG Retrieval', 'Benchmarks'],
    slug: '/insights/rag-vector-vs-hybrid-benchmarks',
    videoSrc: '/assets/videos/fast-analytics.mp4',
    icon: BookOpen,
  },
];

const TOPIC_TAGS = [
  'AI & Autonomous Agents',
  'Software Architecture',
  'Workflow Automation',
  'Data & Telemetry',
];

// ─────────────────────────────────────────────────────────────────────────────
// Individual InsightCard with Hover Video Playback
// ─────────────────────────────────────────────────────────────────────────────

function InsightCard({
  article,
  isActive,
  isPast,
  onSelect,
}: {
  article: InsightArticle;
  isActive: boolean;
  isPast: boolean;
  onSelect: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const prefersReduced = useReducedMotion();
  const IconComponent = article.icon;

  const handleMouseEnter = () => {
    if (prefersReduced) return;
    const vid = videoRef.current;
    if (vid) {
      vid
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    const vid = videoRef.current;
    if (vid) {
      vid.pause();
      vid.currentTime = 0;
      setIsPlaying(false);
    }
  };

  return (
    <article
      aria-labelledby={`insight-title-${article.id}`}
      onClick={() => {
        if (!isActive) onSelect();
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative h-[490px] sm:h-[520px] rounded-3xl overflow-hidden bg-white border transition-all duration-400 flex flex-col cursor-pointer ${
        isActive
          ? 'border-neutral-300 shadow-[0_8px_32px_rgba(0,0,0,0.06)] opacity-100'
          : isPast
            ? 'border-neutral-200/60 opacity-45 hover:opacity-80'
            : 'border-neutral-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] opacity-90 hover:opacity-100 hover:border-brand-500/40 hover:-translate-y-1'
      }`}
    >
      {/* Top accent line on hover */}
      <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-brand-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />

      {/* ── Top 58%: Video Thumbnail (Plays on Hover) ─────────────── */}
      <div className="relative h-[58%] w-full overflow-hidden bg-neutral-950 border-b border-neutral-100">
        <video
          ref={videoRef}
          src={article.videoSrc}
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-500 ease-out opacity-90 group-hover:opacity-100"
        />

        {/* Ambient Subtle Vignette */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/30" />

        {/* Category Badge Floating Top Left */}
        <div className="absolute top-3.5 left-3.5 z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/65 backdrop-blur-md border border-white/15 text-[10px] font-tech font-bold tracking-wider text-white uppercase shadow-sm">
            <IconComponent className="w-3.5 h-3.5 text-brand-400" />
            {article.badge}
          </span>
        </div>

        {/* Live Hover Status Pill Floating Bottom Right */}
        <div className="absolute bottom-3.5 right-3.5 z-10 px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-md border border-white/15 flex items-center gap-2 text-[10px] font-mono text-white pointer-events-none shadow-sm">
          {isPlaying ? (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" />
              <span className="text-green-300 font-bold tracking-wide">PLAYING</span>
            </>
          ) : (
            <>
              <Play className="w-3 h-3 text-brand-400 fill-brand-400" />
              <span className="text-neutral-300 tracking-wide">HOVER TO PREVIEW</span>
            </>
          )}
        </div>
      </div>

      {/* ── Bottom 42%: Content Info ──────────────────────────────── */}
      <div className="h-[42%] p-6 sm:p-7 flex flex-col justify-between bg-white">
        <div>
          {/* Metadata: Read Time & Date */}
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-2">
            <Clock className="w-3.5 h-3.5 text-brand-500" />
            <span>{article.readTime}</span>
            <span className="text-neutral-300">•</span>
            <span>{article.date}</span>
          </div>

          {/* Main Title */}
          <h3
            id={`insight-title-${article.id}`}
            className="font-display text-base sm:text-lg lg:text-xl font-bold text-neutral-950 group-hover:text-brand-600 transition-colors duration-200 line-clamp-2 leading-snug"
          >
            {article.title}
          </h3>

          {/* Compact Teaser */}
          <p className="mt-2 text-xs text-neutral-500 line-clamp-2 leading-relaxed">
            {article.excerpt}
          </p>
        </div>

        {/* Action Link Row */}
        <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
          <span className="text-[10px] font-mono tracking-wider uppercase text-neutral-400">
            KAIROTRIX // BLOG
          </span>

          <Link
            href={article.slug}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 group-hover:text-brand-700 transition-colors"
          >
            <span>Read Article</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Section Export — Asymmetrical Split Layout
// ─────────────────────────────────────────────────────────────────────────────

export function InsightsPreview() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const prefersReduced = useReducedMotion();

  const updateScrollState = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;

    const scrollLeft = el.scrollLeft;
    const card = el.querySelector<HTMLDivElement>('.insight-card');
    if (!card) return;
    const cardWidth = card.offsetWidth;
    const gap = 24;
    const rawIndex = Math.round(scrollLeft / (cardWidth + gap));
    const activeIndex = rawIndex >= INSIGHTS.length ? 0 : Math.max(0, rawIndex);
    setCurrentIndex(activeIndex);

    setCanScrollPrev(activeIndex > 0);
    setCanScrollNext(true); // Always true so user can loop back to 01 from specimen 05
  }, []);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    updateScrollState();
    el.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);
    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [updateScrollState]);

  // Average reading preview timer duration (6.5s per article preview)
  // Auto-advances in the background with Smart Pause on hover and prefers-reduced-motion check
  const READING_DURATION_MS = 6500;

  const scrollToIndex = useCallback(
    (index: number) => {
      const el = carouselRef.current;
      if (!el) return;

      const cards = el.querySelectorAll<HTMLDivElement>('.insight-card');
      if (!cards[index]) return;
      const paddingLeft = parseFloat(getComputedStyle(el).paddingLeft) || 0;
      const targetLeft = cards[index].offsetLeft - paddingLeft;

      el.scrollTo({
        left: targetLeft,
        behavior: prefersReduced ? 'auto' : 'smooth',
      });
    },
    [prefersReduced]
  );

  const handlePrev = () => {
    if (currentIndex > 0) {
      scrollToIndex(currentIndex - 1);
    } else {
      scrollToIndex(INSIGHTS.length - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < INSIGHTS.length - 1) {
      scrollToIndex(currentIndex + 1);
    } else {
      scrollToIndex(0);
    }
  };

  // Background auto-advance: advances to next article after preview reading duration (~6.5s)
  // Functional Smart Pause: automatically pauses when hovered or when prefers-reduced-motion is active
  useEffect(() => {
    if (isHovered || prefersReduced) return;

    const timer = setTimeout(() => {
      if (currentIndex < INSIGHTS.length - 1) {
        scrollToIndex(currentIndex + 1);
      } else {
        scrollToIndex(0);
      }
    }, READING_DURATION_MS);

    return () => clearTimeout(timer);
  }, [currentIndex, isHovered, prefersReduced, scrollToIndex]);

  return (
    <section
      id="insights-preview"
      aria-labelledby="insights-preview-heading"
      className="relative w-full bg-[#FAFAFC] bg-[radial-gradient(ellipse_80%_60%_at_100%_0%,rgba(147,51,234,0.04),transparent_70%)] py-16 sm:py-24 lg:py-28 border-t border-neutral-200/80 overflow-hidden"
    >
      {/* Schema.org Structured Data for Blog & Article Archiving */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: 'KAIROTRIX Engineering Blog & Articles',
            description:
              'Technical articles, architectural breakdowns, and engineering guides from KAIROTRIX engineers.',
            blogPost: INSIGHTS.map((article, idx) => ({
              '@type': 'BlogPosting',
              position: idx + 1,
              headline: article.title,
              description: article.excerpt,
              datePublished: article.date,
              url: `https://kairotrix.com${article.slug}`,
            })),
          }),
        }}
      />

      {/* Screen Reader & AEO/GEO Semantic Narrative Summary */}
      <p className="sr-only">
        Read KAIROTRIX technical articles and engineering blog posts covering autonomous AI agents, bespoke software strategy, real-time telemetry pipelines, and enterprise document search.
      </p>

      {/* Background Architectural Grid Pattern */}
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#00000004_1px,transparent_1px),linear-gradient(to_bottom,#00000004_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Main Split Layout: Left Content + Right Cards Carousel ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-start">
          
          {/* ══════════════════════════════════════════════════════════ */}
          {/* LEFT COLUMN: Header, Narrative, Telemetry, Controls & CTA */}
          {/* ══════════════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 xl:col-span-5 lg:sticky lg:top-36 z-20 flex flex-col justify-between"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div>
              {/* Eyebrow Pill */}
              <div className="flex items-center gap-3 mb-5">
                <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-pulse" />
                <span className="font-tech text-xs tracking-[0.25em] font-semibold text-brand-600 uppercase">
                  06 // ARTICLES &amp; BLOG
                </span>
                <div className="h-px w-10 sm:w-16 bg-neutral-200" />
              </div>

              {/* Main Headline */}
              <h2
                id="insights-preview-heading"
                className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] text-neutral-950 leading-[1.12]"
              >
                ARTICLES &amp;{' '}
                <span className="gradient-signature-text">PERSPECTIVES.</span>
              </h2>

              {/* Narrative Paragraph */}
              <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
                Technical articles, architectural breakdowns, and engineering guides. We write about how we build real software systems, automate complex workflows, and solve production bottlenecks.
              </p>

              {/* Topic Filters / Discipline Tags */}
              <div className="mt-6 flex flex-wrap gap-2">
                {TOPIC_TAGS.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-mono bg-white border border-neutral-200 text-neutral-600 shadow-sm transition-colors hover:border-brand-500/40 hover:text-brand-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* ── Carousel Controls & Archive Action ────────────────── */}
            <div className="mt-10 pt-8 border-t border-neutral-200/80">
              <div className="flex items-center justify-between mb-8">
                {/* Odometer Specimen Counter */}
                <div className="flex items-baseline gap-2 font-mono">
                  <span className="font-tech text-2xl sm:text-3xl font-bold text-neutral-950">
                    {String(currentIndex + 1).padStart(2, '0')}
                  </span>
                  <span className="text-xs tracking-wider text-neutral-400 uppercase">
                    / {String(INSIGHTS.length).padStart(2, '0')} ARTICLES
                  </span>
                </div>

                {/* Arrow Navigation Buttons */}
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={handlePrev}
                    disabled={!canScrollPrev}
                    aria-label="Previous article"
                    className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all ${
                      canScrollPrev
                        ? 'border-neutral-300 text-neutral-900 hover:border-brand-500 hover:text-brand-600 hover:bg-brand-soft/30 cursor-pointer shadow-sm active:scale-95'
                        : 'border-neutral-200 text-neutral-300 cursor-not-allowed opacity-40'
                    }`}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!canScrollNext}
                    aria-label="Next article"
                    className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all ${
                      canScrollNext
                        ? 'border-neutral-300 text-neutral-900 hover:border-brand-500 hover:text-brand-600 hover:bg-brand-soft/30 cursor-pointer shadow-sm active:scale-95'
                        : 'border-neutral-200 text-neutral-300 cursor-not-allowed opacity-40'
                    }`}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Direct Archive Call-to-Action */}
              <Link
                href="/insights"
                className="inline-flex items-center justify-between w-full px-6 py-3.5 rounded-2xl bg-white border border-neutral-200/90 hover:border-brand-500 text-neutral-900 hover:text-brand-600 text-sm font-semibold transition-all duration-200 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_20px_rgba(147,51,234,0.08)] group"
              >
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                    Articles &amp; Engineering Blog
                  </span>
                  <span className="font-display font-bold text-neutral-950 group-hover:text-brand-600 transition-colors">
                    Explore All Articles &amp; Guides
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full bg-neutral-100 group-hover:bg-brand-soft/50 flex items-center justify-center transition-colors">
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-neutral-700 group-hover:text-brand-600" />
                </div>
              </Link>
            </div>
          </motion.div>

          {/* ══════════════════════════════════════════════════════════ */}
          {/* RIGHT COLUMN: Cards Carousel with 1.5 Visible Card Ratio  */}
          {/* ══════════════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: prefersReduced ? 1 : 0, x: prefersReduced ? 0 : 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 xl:col-span-7 relative min-w-0"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* ── Masked Carousel Track: Main Card Centered; Left and Right Feathers via Clean CSS Alpha Mask ── */}
            <div
              className="relative w-full overflow-hidden"
              style={{
                maskImage:
                  'linear-gradient(to right, transparent 0%, black 40px, black calc(100% - 120px), transparent 100%)',
                WebkitMaskImage:
                  'linear-gradient(to right, transparent 0%, black 40px, black calc(100% - 120px), transparent 100%)',
              }}
            >
              <div
                ref={carouselRef}
                className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth py-4 pl-12 sm:pl-16 lg:pl-20 scroll-pl-12 sm:scroll-pl-16 lg:scroll-pl-20 pr-6 sm:pr-8 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              >
                {INSIGHTS.map((article, idx) => {
                  const isActive = currentIndex === idx;
                  const isPast = idx < currentIndex;

                  return (
                    <div
                      key={article.id}
                      className="insight-card flex-shrink-0 w-[84vw] sm:w-[360px] lg:w-[380px] xl:w-[390px] snap-start"
                    >
                      <InsightCard
                        article={article}
                        isActive={isActive}
                        isPast={isPast}
                        onSelect={() => scrollToIndex(idx)}
                      />
                    </div>
                  );
                })}

                {/* ── Companion Loop Card (Card 01): Ensures the right side is never empty when Card 05 is active ── */}
                <div
                  key="loop-specimen-01"
                  className="insight-card flex-shrink-0 w-[84vw] sm:w-[360px] lg:w-[380px] xl:w-[390px] snap-start"
                >
                  <InsightCard
                    article={INSIGHTS[0]}
                    isActive={false}
                    isPast={false}
                    onSelect={() => scrollToIndex(0)}
                  />
                </div>

                {/* Trailing micro-buffer to ensure full clearance on all screen sizes */}
                <div
                  className="flex-shrink-0 w-8 sm:w-16 lg:w-20 pointer-events-none"
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* ── Bottom Carousel Pagination Indicator Dots ─────────── */}
            <div className="flex items-center justify-center gap-2 mt-6">
              {INSIGHTS.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToIndex(idx)}
                  aria-label={`Go to article ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === idx
                      ? 'w-8 bg-brand-500 shadow-sm'
                      : 'w-2 bg-neutral-300 hover:bg-neutral-400'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
