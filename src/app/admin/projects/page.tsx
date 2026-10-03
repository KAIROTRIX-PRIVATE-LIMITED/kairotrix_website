'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  FolderGit2,
  Plus,
  Search,
  CheckCircle2,
  PauseCircle,
  Edit3,
  Trash2,
  ExternalLink,
  Layers,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { WORK_DISCIPLINES } from '@/data/workData';

interface ProjectRecord {
  id: string;
  title: string;
  slug: string;
  headline: string;
  disciplineId: string;
  disciplineName: string;
  techStack: string[] | string;
  video?: string;
  image: string;
  client: string;
  year: string;
  status: string;
  badge?: string;
  summary?: string;
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'PAUSED'>('ALL');
  const [disciplineFilter, setDisciplineFilter] = useState('all');
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/admin/projects');
      if (res.ok) {
        const data = await res.json();
        setProjects(data.projects || []);
      }
    } catch (e) {
      console.error('Failed to fetch projects:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleToggleStatus = async (id: string) => {
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

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to permanently delete "${title}"? This cannot be undone.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/projects/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Filtered projects
  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.headline?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.client?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'ALL' || p.status === statusFilter;

    const matchesDiscipline =
      disciplineFilter === 'all' || p.disciplineId === disciplineFilter;

    return matchesSearch && matchesStatus && matchesDiscipline;
  });

  return (
    <div className="space-y-6 text-neutral-900">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200/90 text-brand-700 font-tech text-xs font-semibold tracking-wider uppercase mb-3 shadow-2xs">
            <Layers className="w-3.5 h-3.5 text-brand-600" />
            <span>KAIROTRIX ADMIN</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-950 tracking-tight font-display">
            Projects &amp; Work
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-2xl">
            Manage projects shown on the public <code className="text-brand-700 bg-brand-50 px-1.5 py-0.5 rounded font-mono font-semibold">/work</code> page.
          </p>
        </div>

        <Link
          href="/admin/projects/editor"
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-500 hover:to-brand-600 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer shrink-0 font-mono"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between bg-white border border-neutral-200/80 p-3 rounded-2xl shadow-2xs">
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects..."
            className="w-full pl-9 pr-3 py-1.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:border-brand-500 transition-colors"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Status Tabs */}
          <div className="flex items-center p-1 bg-neutral-100 border border-neutral-200/80 rounded-xl text-xs font-mono">
            {(['ALL', 'ACTIVE', 'PAUSED'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={cn(
                  'px-2.5 py-1 rounded-lg transition-colors cursor-pointer',
                  statusFilter === st
                    ? 'bg-brand-600 text-white font-bold shadow-2xs'
                    : 'text-neutral-600 hover:text-neutral-950'
                )}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Discipline Selector */}
          <select
            value={disciplineFilter}
            onChange={(e) => setDisciplineFilter(e.target.value)}
            className="px-3 py-1.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-800 focus:bg-white focus:outline-none focus:border-brand-500 transition-colors cursor-pointer"
          >
            {WORK_DISCIPLINES.map((d) => (
              <option key={d.id} value={d.id}>
                {d.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white border border-neutral-200/80 rounded-2xl overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-50/90 border-b border-neutral-200/80 text-neutral-500 font-mono uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Project</th>
                <th className="py-3 px-4">Discipline</th>
                <th className="py-3 px-4">Client &amp; Year</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredProjects.map((project) => {
                const isPaused = project.status === 'PAUSED';
                const isToggling = togglingId === project.id;

                return (
                  <tr key={project.id} className="hover:bg-neutral-50/70 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-neutral-100 border border-neutral-200 overflow-hidden shrink-0 relative flex items-center justify-center">
                          {project.image ? (
                            <Image
                              src={project.image}
                              alt={project.title}
                              fill
                              unoptimized
                              className="object-cover"
                            />
                          ) : (
                            <FolderGit2 className="w-4 h-4 text-neutral-400" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <Link
                            href={`/admin/projects/editor/${project.id}`}
                            className="font-semibold text-neutral-900 block truncate hover:text-brand-600 transition-colors"
                          >
                            {project.title}
                          </Link>
                          <span className="text-[11px] text-neutral-500 truncate block max-w-sm">
                            {project.headline || project.summary}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-[11px]">
                      <span className="text-neutral-700 block font-medium">{project.disciplineName}</span>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-[11px]">
                      <span className="text-neutral-700 block font-medium">{project.client || 'KAIROTRIX'}</span>
                      <span className="text-neutral-500 text-[10px] block">{project.year}</span>
                    </td>

                    <td className="py-3.5 px-4">
                      {/* 1-Click Status Toggle Button */}
                      <button
                        onClick={() => handleToggleStatus(project.id)}
                        disabled={isToggling}
                        className={cn(
                          'px-2.5 py-1 rounded-full text-[10px] font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs',
                          isPaused
                            ? 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100/80'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100/80'
                        )}
                        title={isPaused ? 'Click to Activate (Make Live on Public Site)' : 'Click to Pause (Hide from Public Site)'}
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
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/admin/projects/editor/${project.id}`}
                          className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
                          title="Edit Project"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(project.id, project.title)}
                          className="p-1.5 rounded-lg text-rose-600 hover:text-rose-700 hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Delete Project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredProjects.length === 0 && !loading && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-xs text-neutral-500 font-mono">
                    No projects match your current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
