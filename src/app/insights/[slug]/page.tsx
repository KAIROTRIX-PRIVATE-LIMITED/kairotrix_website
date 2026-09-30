import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getInsightBySlug, getRelatedInsights } from '@/lib/services/insightsService';
import { InsightDetailView } from '@/components/insights/InsightDetailView';
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

      {/* ─── ANIMATED INSIGHT DETAIL VIEW ─── */}
      <InsightDetailView
        specimen={specimen}
        relatedInsights={relatedInsights}
      />

      {/* ─── CULMINATING CALL TO ACTION BANNER ─── */}
      <InsightsCTA />
    </div>
  );
}

