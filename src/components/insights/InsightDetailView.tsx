'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useSpring } from 'framer-motion';
import {
  ArrowLeft,
  Clock,
  Calendar,
  ArrowRight,
  List,
  Check,
  Link2,
} from 'lucide-react';
import type { InsightSpecimen } from '@/data/insightsData';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface InsightDetailViewProps {
  specimen: InsightSpecimen;
  relatedInsights: InsightSpecimen[];
}

interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

export function InsightDetailView({
  specimen,
  relatedInsights,
}: InsightDetailViewProps) {
  const prefersReduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeHeadingId, setActiveHeadingId] = useState<string>('');

  useEffect(() => {
    setMounted(true);
  }, []);

  // ─── Reading Progress Bar (Wix Blog Format Standard) ───
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  // ─── Extract Headings for Table of Contents (SSR & Client Synchronized) ───
  const headings = useMemo<HeadingItem[]>(() => {
    if (!specimen.content) return [];
    const items: HeadingItem[] = [];
    const regex = /<(h[23])([^>]*)>(.*?)<\/\1>/gi;
    let match;
    let idx = 0;
    while ((match = regex.exec(specimen.content)) !== null) {
      const tag = match[1].toLowerCase();
      const rawText = match[3].replace(/<[^>]*>/g, '').trim();
      if (rawText) {
        const id = `sec-${idx++}-${rawText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')}`;
        items.push({
          id,
          text: rawText,
          level: tag === 'h2' ? 2 : 3,
        });
      }
    }
    return items;
  }, [specimen.content]);

  // ─── Process Content & Inject Synchronized Heading IDs for Smooth Jump Links ───
  const processedContent = useMemo(() => {
    if (!specimen.content) return '';
    let index = 0;
    return specimen.content.replace(/<(h[23])([^>]*)>(.*?)<\/\1>/gi, (match, tag, attrs, innerText) => {
      const cleanText = innerText.replace(/<[^>]*>/g, '').trim();
      const slugId = `sec-${index++}-${cleanText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')}`;
      if (/id=["'][^"']*["']/i.test(attrs)) {
        return `<${tag}${attrs.replace(/id=["'][^"']*["']/i, `id="${slugId}"`)}>${innerText}</${tag}>`;
      }
      return `<${tag}${attrs} id="${slugId}">${innerText}</${tag}>`;
    });
  }, [specimen.content]);

  // ─── Active Heading Spy on Scroll ───
  useEffect(() => {
    if (headings.length === 0) return;
    const handleScroll = () => {
      const scrollPos = window.scrollY + 140;
      for (let i = headings.length - 1; i >= 0; i--) {
        const elem = document.getElementById(headings[i].id);
        if (elem && elem.offsetTop <= scrollPos) {
          setActiveHeadingId(headings[i].id);
          return;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  // ─── Top Media Logic: ONLY Thumbnail Image or Cover Video ───
  // Note: YouTube embeds and attached inline media render inside the body content in-place where the author placed them.
  const hasDirectCoverVideo =
    Boolean(specimen.videoSrc) &&
    !specimen.videoSrc?.includes('youtube') &&
    !specimen.videoSrc?.includes('youtu.be');

  const hasThumbnailImage =
    Boolean(specimen.image) &&
    !specimen.image.includes('SERVICE01') &&
    !specimen.image.includes('youtube');

  return (
    <>
      {/* ─── Reading Progress Indicator (Fixed to Top of Viewport) ─── */}
      {mounted && (
        <motion.div
          style={{ scaleX }}
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-600 via-purple-600 to-indigo-600 origin-left z-50 pointer-events-none"
          aria-hidden="true"
        />
      )}

      {/* ─── Full-Page Width Main Container ─── */}
      <article className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-20">
        
        {/* ─── Top Breadcrumb Navigation & Meta Bar ─── */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-500 hover:text-neutral-950 transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-brand-600" />
            <span>Back to Insights &amp; Engineering Blog</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] uppercase tracking-wider px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 font-semibold shadow-xs">
              {specimen.badge || 'Engineering Deep Dive'}
            </span>

            {/* Quick Share Link */}
            <button
              type="button"
              onClick={handleCopyLink}
              title="Copy article link"
              className="px-3 py-1 rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-700 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">Link Copied!</span>
                </>
              ) : (
                <>
                  <Link2 className="w-3.5 h-3.5 text-neutral-500" />
                  <span>Share</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* ─── Elevated Full-Width Article Card ─── */}
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full p-6 sm:p-10 md:p-14 lg:p-16 rounded-3xl border border-neutral-200/90 bg-white shadow-xl space-y-8"
        >
          {/* 1. TOP COVER MEDIA: ONLY THUMBNAIL IMAGE OR HOVER VIDEO */}
          {hasDirectCoverVideo ? (
            <div className="aspect-video w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-950 shadow-md">
              <video
                src={specimen.videoSrc}
                poster={hasThumbnailImage ? specimen.image : undefined}
                controls
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          ) : hasThumbnailImage ? (
            <div className="relative aspect-[16/9] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-100 border border-neutral-200 shadow-sm">
              <Image
                src={specimen.image}
                alt={specimen.title}
                fill
                priority
                unoptimized
                sizes="(max-width: 1400px) 100vw, 1400px"
                className="object-cover"
              />
            </div>
          ) : null}

          {/* 2. CATEGORY PILL, DATE & READING TIME */}
          <div className="space-y-4 pt-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3.5 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 font-mono text-xs uppercase tracking-wider font-semibold shadow-xs">
                {specimen.techCategoryLabel || (specimen.category ? specimen.category.toUpperCase().replace('-', ' ') : 'TECHNICAL ARTICLE')}
              </span>
              <span className="text-neutral-300">•</span>
              {specimen.readTime && (
                <>
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-500">
                    <Clock className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{specimen.readTime}</span>
                  </span>
                  <span className="text-neutral-300">•</span>
                </>
              )}
              <span className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-500">
                <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                <span>{specimen.date}</span>
              </span>
            </div>

            {/* 3. MAIN TITLE (H1 HOOK) */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold text-neutral-950 tracking-tight leading-[1.12]">
              {specimen.title}
            </h1>

            {/* 4. SUBTITLE / EXCERPT */}
            {specimen.subtitle && (
              <p className="text-lg sm:text-xl md:text-2xl text-neutral-600 font-sans leading-relaxed max-w-4xl">
                {specimen.subtitle}
              </p>
            )}
          </div>

          {/* 5. AUTHOR BYLINE & TAGS ROW */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-neutral-100 text-xs font-mono text-neutral-600">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-600 to-indigo-600 text-white font-bold flex items-center justify-center text-sm shadow-xs shrink-0">
                {specimen.author ? specimen.author.charAt(0).toUpperCase() : 'K'}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-neutral-900 text-sm">{specimen.author || 'KAIROTRIX Engineering'}</span>
                  <span className="text-neutral-300">•</span>
                  <span className="text-brand-600 font-medium">{specimen.authorRole || 'Engineering Team'}</span>
                </div>
                <span className="text-[11px] text-neutral-400 block sm:hidden mt-0.5">
                  Published on {specimen.date}
                </span>
              </div>
            </div>

            {/* Tags Ribbon */}
            {specimen.tags && specimen.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5">
                {specimen.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-lg bg-neutral-100 border border-neutral-200/80 text-[11px] font-mono text-neutral-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* ─── Table of Contents (Wix Blog Format Guideline #3) ─── */}
          {headings.length >= 2 && (
            <nav
              aria-label="Table of Contents"
              className="p-5 sm:p-7 rounded-2xl bg-neutral-50/90 border border-neutral-200/90 shadow-xs space-y-3"
            >
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-neutral-800">
                <List className="w-4 h-4 text-brand-600" />
                <span>Table of Contents</span>
                <span className="text-[10px] text-neutral-400 font-normal font-mono">
                  ({headings.length} sections)
                </span>
              </div>
              <ul className="space-y-2 text-sm font-sans pt-1">
                {headings.map((h) => (
                  <li key={h.id} className={h.level === 3 ? 'pl-5 text-xs' : 'font-medium'}>
                    <a
                      href={`#${h.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        const elem = document.getElementById(h.id);
                        if (elem) {
                          elem.scrollIntoView({ behavior: 'smooth' });
                          setActiveHeadingId(h.id);
                        }
                      }}
                      className={`transition-colors flex items-center gap-2 py-0.5 ${
                        activeHeadingId === h.id
                          ? 'text-brand-700 font-bold underline underline-offset-4'
                          : 'text-neutral-600 hover:text-brand-600'
                      }`}
                    >
                      <span className="text-brand-500 font-mono text-[11px]">§</span>
                      <span>{h.text}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {/* 6. RICH PROSE CONTENT BODY (Where attached images, YouTube embeds & videos appear in-place) */}
          <div className="article-prose-content max-w-none pt-2">
            {processedContent ? (
              <div dangerouslySetInnerHTML={{ __html: processedContent }} />
            ) : (
              <div className="space-y-6 text-neutral-700 font-sans text-base sm:text-lg leading-relaxed">
                <p className="text-neutral-600">
                  {specimen.excerpt || 'No additional content provided for this article.'}
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* ─── 7. AUTHOR BIO & CREDENTIALS CARD ─── */}
        <div className="mt-10 sm:mt-12 p-6 sm:p-8 rounded-3xl bg-white border border-neutral-200/90 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white flex items-center justify-center font-display font-bold text-2xl shrink-0 shadow-xs">
            {specimen.author ? specimen.author.charAt(0).toUpperCase() : 'K'}
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h3 className="text-lg font-display font-bold text-neutral-950">
                {specimen.author || 'KAIROTRIX Engineering'}
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 font-mono text-[10px] font-semibold uppercase tracking-wider">
                {specimen.authorRole || 'Engineering Team'}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 font-sans leading-relaxed">
              Authored by the engineering collective at KAIROTRIX. Documenting deterministic AI systems, fault-tolerant software architectures, and high-performance engineering.
            </p>
          </div>
          <Link
            href="/about"
            className="shrink-0 px-4 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200/80 border border-neutral-200 text-neutral-800 font-mono text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer shadow-xs"
          >
            Meet the Team
          </Link>
        </div>

        {/* ─── 8. RELATED ENGINEERING ARTICLES ─── */}
        {relatedInsights.length > 0 && (
          <div className="mt-12 sm:mt-16 pt-10 border-t border-neutral-200/80">
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
                  className="group block p-6 sm:p-8 rounded-2xl bg-white hover:bg-brand-50/20 border border-neutral-200/80 hover:border-brand-300 shadow-xs hover:shadow-md transition-all duration-300 h-full"
                >
                  <div className="flex items-center justify-between gap-2 text-xs font-mono text-neutral-500 mb-3">
                    <span className="text-brand-600 font-semibold">{rel.techCategoryLabel}</span>
                    <span>{rel.readTime}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-display font-bold text-neutral-950 group-hover:text-brand-700 transition-colors mb-2 line-clamp-2">
                    {rel.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 font-sans line-clamp-2 mb-4 leading-relaxed">
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
    </>
  );
}
