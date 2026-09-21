'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  BookOpen,
  Plus,
  Search,
  CheckCircle2,
  PauseCircle,
  Edit3,
  Trash2,
  ExternalLink,
  AlertCircle,
  Send,
  Sparkles,
  FileText,
  Clock,
  User,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { TECH_CATEGORIES } from '@/data/insightsData';

interface InsightRecord {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  excerpt: string;
  content?: string;
  category: string;
  badge: string;
  disciplineId: string;
  disciplineName: string;
  date: string;
  readTime: string;
  author: string;
  authorRole: string;
  tags: string[] | string;
  image: string;
  videoSrc?: string;
  status: 'PUBLISHED' | 'PENDING_REVIEW' | 'DRAFT' | 'PAUSED';
}

export default function AdminInsightsPage() {
  const [insights, setInsights] = useState<InsightRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PUBLISHED' | 'PENDING_REVIEW' | 'DRAFT' | 'PAUSED'>('ALL');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const fetchInsights = async () => {
    try {
      const res = await fetch('/api/admin/insights');
      if (res.ok) {
        const data = await res.json();
        setInsights(data.insights || []);
      }
    } catch (e) {
      console.error('Failed to fetch insights:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  const handleToggleStatus = async (id: string) => {
    try {
      setTogglingId(id);
      const res = await fetch(`/api/admin/insights/${id}/toggle`, { method: 'PATCH' });
      if (res.ok) {
        const data = await res.json();
        setInsights((prev) =>
          prev.map((ins) => (ins.id === id ? { ...ins, status: data.insight.status } : ins))
        );
      }
    } catch (e) {
      console.error(e);
    } finally {
      setTogglingId(null);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/insights/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setInsights((prev) => prev.filter((i) => i.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Filter calculations
  const pendingCount = insights.filter((i) => i.status === 'PENDING_REVIEW').length;
  const publishedCount = insights.filter((i) => i.status === 'PUBLISHED').length;
  const draftCount = insights.filter((i) => i.status === 'DRAFT').length;

  const filteredInsights = insights.filter((item) => {
    // 1. Status Filter
    if (statusFilter !== 'ALL' && item.status !== statusFilter) return false;

    // 2. Category Filter
    if (categoryFilter !== 'all' && item.disciplineId !== categoryFilter) return false;

    // 3. Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchAuthor = item.author.toLowerCase().includes(q);
      const matchExcerpt = item.excerpt.toLowerCase().includes(q);
      if (!matchTitle && !matchAuthor && !matchExcerpt) return false;
    }

    return true;
  });

  return (
    <div className="space-y-8 text-neutral-900">
      {/* ─── TOP BANNER & ACTIONS ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-neutral-200/80">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200/90 text-brand-700 font-tech text-xs font-semibold tracking-wider uppercase mb-3 shadow-xs">
            <BookOpen className="w-3.5 h-3.5 text-brand-600" />
            <span>KAIROTRIX EDITORIAL CMS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-neutral-950 tracking-tight">
            Articles, Technical Blog & Whitepapers
          </h1>
          <p className="text-sm text-neutral-600 mt-1 max-w-2xl">
            Manage technical articles, team author submissions, and admin approvals using the MS Word-style Blog Writer.
          </p>
        </div>

        <Link
          href="/admin/insights/writer"
          className="self-start sm:self-auto px-5 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-500 hover:to-brand-600 text-white font-tech text-xs font-bold uppercase tracking-wider transition-all shadow-xs flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Open Blog Writer</span>
        </Link>
      </div>

      {/* ─── PENDING REVIEW NOTICE CALLOUT (IF ANY) ─── */}
      {pendingCount > 0 && (
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-200 text-amber-700 flex items-center justify-center shrink-0">
              <Send className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-display font-bold text-amber-950 flex items-center gap-2">
                <span>{pendingCount} Article{pendingCount > 1 ? 's' : ''} Awaiting Admin Review</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-200/70 text-amber-800 font-mono text-[10px] uppercase font-bold">
                  Action Needed
                </span>
              </div>
              <p className="text-xs text-amber-800/80 mt-0.5">
                Team authors have submitted new engineering articles. Review and approve them before they appear on the public site.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setStatusFilter('PENDING_REVIEW')}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-mono text-xs font-bold uppercase tracking-wider shrink-0 transition-colors cursor-pointer shadow-xs"
          >
            Filter Pending Reviews
          </button>
        </div>
      )}

      {/* ─── SEARCH & STATUS TABS ─── */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Status Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-neutral-100 border border-neutral-200/80 text-xs font-mono shadow-xs">
          <button
            type="button"
            onClick={() => setStatusFilter('ALL')}
            className={cn(
              'px-3 py-1.5 rounded-lg transition-colors cursor-pointer',
              statusFilter === 'ALL' ? 'bg-white text-neutral-950 font-bold shadow-xs' : 'text-neutral-600 hover:text-neutral-950'
            )}
          >
            All ({insights.length})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('PUBLISHED')}
            className={cn(
              'px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5',
              statusFilter === 'PUBLISHED' ? 'bg-white text-emerald-700 font-bold shadow-xs' : 'text-neutral-600 hover:text-neutral-950'
            )}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Published ({publishedCount})</span>
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('PENDING_REVIEW')}
            className={cn(
              'px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5',
              statusFilter === 'PENDING_REVIEW' ? 'bg-white text-amber-700 font-bold shadow-xs' : 'text-neutral-600 hover:text-neutral-950'
            )}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span>Pending Review ({pendingCount})</span>
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('DRAFT')}
            className={cn(
              'px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5',
              statusFilter === 'DRAFT' ? 'bg-white text-neutral-900 font-bold shadow-xs' : 'text-neutral-600 hover:text-neutral-950'
            )}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
            <span>Drafts ({draftCount})</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative flex-1 max-w-xs">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder="Search by title or author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-neutral-200 rounded-xl text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-brand-500 shadow-xs transition-colors"
          />
        </div>
      </div>

      {/* ─── ARTICLES TABLE ─── */}
      <div className="rounded-2xl bg-white border border-neutral-200/80 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-50/90 border-b border-neutral-200/80 text-neutral-500 font-mono uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-4 px-6">Article Specimen</th>
                <th className="py-4 px-6">Author Attribution</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Workflow Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 font-sans">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-neutral-500 font-mono">
                    Loading editorial publications...
                  </td>
                </tr>
              ) : filteredInsights.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-neutral-500 font-mono">
                    No articles found matching criteria.
                  </td>
                </tr>
              ) : (
                filteredInsights.map((item) => (
                  <tr key={item.id} className="hover:bg-neutral-50/70 transition-colors">
                    {/* Title & Thumbnail */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3.5">
                        <div className="w-14 h-14 rounded-xl overflow-hidden relative bg-neutral-100 border border-neutral-200 shrink-0">
                          <Image
                            src={item.image || '/assets/images/service/SERVICE01.png'}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0 max-w-sm">
                          <Link
                            href={`/admin/insights/writer/${item.id}`}
                            className="font-display font-bold text-neutral-950 hover:text-brand-600 transition-colors line-clamp-1 block text-sm"
                          >
                            {item.title}
                          </Link>
                          <div className="text-[11px] font-mono text-neutral-500 truncate mt-0.5">
                            /insights/{item.slug}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Author Attribution */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-brand-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                          {item.author.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-neutral-900">{item.author}</div>
                          <div className="text-[10px] text-neutral-500 font-mono">{item.authorRole}</div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-700 font-mono text-[11px] font-medium">
                        {item.disciplineName || item.category}
                      </span>
                    </td>

                    {/* Workflow Status */}
                    <td className="py-4 px-6">
                      {item.status === 'PUBLISHED' ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-mono text-[11px] font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Published</span>
                        </span>
                      ) : item.status === 'PENDING_REVIEW' ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 font-mono text-[11px] font-semibold animate-pulse">
                          <Send className="w-3.5 h-3.5 text-amber-600" />
                          <span>Pending Review</span>
                        </span>
                      ) : item.status === 'DRAFT' ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-600 font-mono text-[11px]">
                          <span>Draft Mode</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 font-mono text-[11px]">
                          <PauseCircle className="w-3.5 h-3.5" />
                          <span>Paused</span>
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="inline-flex items-center gap-2">
                        {item.status === 'PENDING_REVIEW' ? (
                          <Link
                            href={`/admin/insights/writer/${item.id}`}
                            className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-mono text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1 shadow-xs"
                          >
                            <span>Review &amp; Approve</span>
                          </Link>
                        ) : (
                          <Link
                            href={`/admin/insights/writer/${item.id}`}
                            className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-500 hover:text-neutral-900 transition-colors"
                            title="Edit in Blog Writer"
                          >
                            <Edit3 className="w-4 h-4" />
                          </Link>
                        )}

                        {item.status === 'PUBLISHED' && (
                          <Link
                            href={`/insights/${item.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-500 hover:text-neutral-900 transition-colors"
                            title="View Public Article"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                        )}

                        <button
                          type="button"
                          onClick={() => handleToggleStatus(item.id)}
                          disabled={togglingId === item.id}
                          className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
                          title={item.status === 'PUBLISHED' ? 'Pause Article' : 'Publish Article'}
                        >
                          {item.status === 'PUBLISHED' ? (
                            <PauseCircle className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <CheckCircle2 className="w-4 h-4 text-neutral-400" />
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(item.id, item.title)}
                          className="p-1.5 rounded-lg hover:bg-rose-50 text-neutral-500 hover:text-rose-600 transition-colors cursor-pointer"
                          title="Delete Article"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
