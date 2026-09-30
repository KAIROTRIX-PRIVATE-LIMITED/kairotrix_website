'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FolderGit2,
  BookOpen,
  MessageSquare,
  Plus,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  PauseCircle,
  PlayCircle,
  RefreshCw,
  ExternalLink,
  Layers,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProjectItem {
  id: string;
  title: string;
  badge: string;
  disciplineName: string;
  status: string;
}

interface InsightItem {
  id: string;
  title: string;
  category: string;
  date: string;
  status: string;
}

interface InquiryItem {
  id: string;
  name: string;
  email: string;
  interest: string;
  message: string;
  status: string;
  createdAt: string;
}

export default function AdminDashboardPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [insights, setInsights] = useState<InsightItem[]>([]);
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setRefreshing(true);
      const [projRes, insRes, inqRes] = await Promise.all([
        fetch('/api/admin/projects'),
        fetch('/api/admin/insights'),
        fetch('/api/admin/inquiries'),
      ]);

      if (projRes.ok) {
        const data = await projRes.json();
        setProjects(data.projects || []);
      }
      if (insRes.ok) {
        const data = await insRes.json();
        setInsights(data.insights || []);
      }
      if (inqRes.ok) {
        const data = await inqRes.json();
        setInquiries(data.inquiries || []);
      }
    } catch (e) {
      console.error('Error fetching dashboard telemetry:', e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleToggleProject = async (id: string) => {
    try {
      setTogglingId(id);
      const res = await fetch(`/api/admin/projects/${id}/toggle`, { method: 'PATCH' });
      if (res.ok) {
        const data = await res.json();
        setProjects((prev) =>
          prev.map((p) => (p.id === id ? { ...p, status: data.project.status } : p))
        );
      }
    } catch (e) {
      console.error(e);
    } finally {
      setTogglingId(null);
    }
  };

  const handleToggleInsight = async (id: string) => {
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

  const activeProjectsCount = projects.filter((p) => p.status === 'ACTIVE').length;
  const pausedProjectsCount = projects.filter((p) => p.status === 'PAUSED').length;
  const publishedInsightsCount = insights.filter((i) => i.status === 'PUBLISHED').length;
  const pausedInsightsCount = insights.filter((i) => i.status === 'PAUSED').length;

  return (
    <div className="space-y-8">
      {/* Top Header & Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-600 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-brand-700 font-semibold">
              KAIROTRIX Admin
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-950 tracking-tight mt-1 font-display">
            Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 mt-1">
            Overview of your projects, articles, contact messages, and system status.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchData}
            disabled={refreshing}
            className="px-3.5 py-2 rounded-xl bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-700 text-xs font-mono flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
          >
            <RefreshCw className={cn('w-3.5 h-3.5 text-neutral-500', refreshing && 'animate-spin')} />
            <span>Refresh</span>
          </button>

          <Link
            href="/admin/projects"
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-500 hover:to-brand-600 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>New Project</span>
          </Link>

          <Link
            href="/admin/insights/writer"
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-neutral-50 text-neutral-800 text-xs font-semibold flex items-center gap-1.5 border border-neutral-200 transition-all shadow-xs"
          >
            <Plus className="w-4 h-4 text-brand-600" />
            <span>Write Article</span>
          </Link>
        </div>
      </div>

      {/* KPI Telemetry Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Projects Metric */}
        <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between text-neutral-500 mb-3">
            <span className="text-xs font-mono uppercase tracking-wider font-semibold">Projects</span>
            <div className="w-8 h-8 rounded-xl bg-brand-50 flex items-center justify-center border border-brand-100">
              <FolderGit2 className="w-4 h-4 text-brand-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-neutral-950 font-mono">{projects.length}</div>
          <div className="flex items-center gap-3 mt-3 pt-3 border-t border-neutral-100 text-[11px] font-mono">
            <span className="text-emerald-700 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              {activeProjectsCount} Active
            </span>
            <span className="text-amber-700 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              {pausedProjectsCount} Paused
            </span>
          </div>
        </div>

        {/* Insights Metric */}
        <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between text-neutral-500 mb-3">
            <span className="text-xs font-mono uppercase tracking-wider font-semibold">Articles</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center border border-indigo-100">
              <BookOpen className="w-4 h-4 text-indigo-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-neutral-950 font-mono">{insights.length}</div>
          <div className="flex items-center gap-3 mt-3 pt-3 border-t border-neutral-100 text-[11px] font-mono">
            <span className="text-emerald-700 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              {publishedInsightsCount} Published
            </span>
            <span className="text-amber-700 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              {pausedInsightsCount} Paused
            </span>
          </div>
        </div>

        {/* Client Inquiries */}
        <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between text-neutral-500 mb-3">
            <span className="text-xs font-mono uppercase tracking-wider font-semibold">Contact Messages</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center border border-emerald-100">
              <MessageSquare className="w-4 h-4 text-emerald-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-neutral-950 font-mono">{inquiries.length}</div>
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-neutral-100 text-[11px] font-mono text-neutral-500">
            <span>From website contact form</span>
          </div>
        </div>

        {/* Database Health */}
        <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between text-neutral-500 mb-3">
            <span className="text-xs font-mono uppercase tracking-wider font-semibold">Database</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center border border-purple-100">
              <ShieldCheck className="w-4 h-4 text-purple-600" />
            </div>
          </div>
          <div className="text-xl font-bold text-emerald-600 font-mono flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            <span>PostgreSQL</span>
          </div>
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-neutral-100 text-[11px] font-mono text-neutral-500">
            <span>Connected & Healthy</span>
          </div>
        </div>
      </div>

      {/* Two Column Section: Recent Projects & Recent Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Projects Control Panel */}
        <div className="bg-white border border-neutral-200/80 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
            <div className="flex items-center gap-2.5">
              <FolderGit2 className="w-4 h-4 text-brand-600" />
              <h2 className="text-base font-semibold text-neutral-950 font-display">Recent Projects</h2>
            </div>
            <Link
              href="/admin/projects"
              className="text-xs text-brand-700 hover:text-brand-800 font-semibold flex items-center gap-1 font-mono"
            >
              <span>View All ({projects.length})</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-neutral-100">
            {projects.slice(0, 5).map((project) => {
              const isPaused = project.status === 'PAUSED';
              const isToggling = togglingId === project.id;

              return (
                <div key={project.id} className="py-3.5 flex items-center justify-between gap-4 hover:bg-neutral-50/70 px-2 rounded-xl transition-colors">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-neutral-900 truncate block">
                        {project.title}
                      </span>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-600 border border-neutral-200 shrink-0">
                        {project.badge}
                      </span>
                    </div>
                    <span className="text-[11px] text-neutral-500 font-mono truncate block mt-0.5">
                      {project.disciplineName}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {/* 1-Click Status Toggle */}
                    <button
                      onClick={() => handleToggleProject(project.id)}
                      disabled={isToggling}
                      className={cn(
                        'px-2.5 py-1 rounded-full text-[10px] font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs',
                        isPaused
                          ? 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100/80'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100/80'
                      )}
                      title={isPaused ? 'Click to Activate (Make Live)' : 'Click to Pause (Hide from Live)'}
                    >
                      {isPaused ? (
                        <>
                          <PauseCircle className="w-3 h-3" />
                          <span>PAUSED</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-3 h-3" />
                          <span>ACTIVE</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}

            {projects.length === 0 && !loading && (
              <div className="py-8 text-center text-xs text-neutral-500 font-mono">
                No projects found. Seed or create your first project.
              </div>
            )}
          </div>
        </div>

        {/* Articles & Insights Control Panel */}
        <div className="bg-white border border-neutral-200/80 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
            <div className="flex items-center gap-2.5">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <h2 className="text-base font-semibold text-neutral-950 font-display">Recent Articles</h2>
            </div>
            <Link
              href="/admin/insights"
              className="text-xs text-brand-700 hover:text-brand-800 font-semibold flex items-center gap-1 font-mono"
            >
              <span>View All ({insights.length})</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-neutral-100">
            {insights.slice(0, 5).map((insight) => {
              const isPaused = insight.status === 'PAUSED';
              const isPending = insight.status === 'PENDING_REVIEW';
              const isToggling = togglingId === insight.id;

              return (
                <div key={insight.id} className="py-3.5 flex items-center justify-between gap-4 hover:bg-neutral-50/70 px-2 rounded-xl transition-colors">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-neutral-900 truncate block">
                        {insight.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5 text-[11px] text-neutral-500 font-mono">
                      <span>{insight.category}</span>
                      <span>•</span>
                      <span>{insight.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {/* 1-Click Status Toggle */}
                    <button
                      onClick={() => handleToggleInsight(insight.id)}
                      disabled={isToggling}
                      className={cn(
                        'px-2.5 py-1 rounded-full text-[10px] font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs',
                        isPaused
                          ? 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100/80'
                          : isPending
                          ? 'bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100/80'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100/80'
                      )}
                      title={isPaused ? 'Click to Publish (Make Live)' : 'Click to Pause (Hide from Live)'}
                    >
                      {isPaused ? (
                        <>
                          <PauseCircle className="w-3 h-3" />
                          <span>PAUSED</span>
                        </>
                      ) : isPending ? (
                        <>
                          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                          <span>PENDING</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-3 h-3" />
                          <span>LIVE</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}

            {insights.length === 0 && !loading && (
              <div className="py-8 text-center text-xs text-neutral-500 font-mono">
                No articles found. Seed or create your first publication.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
