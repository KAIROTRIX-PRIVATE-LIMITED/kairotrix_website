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
  X,
  ExternalLink,
  AlertCircle,
  Layers,
  Filter,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { WORK_DISCIPLINES } from '@/data/workData';
import MediaUploader from '@/components/admin/MediaUploader';

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
  invariant?: string;
  metric?: string;
  metricLabel?: string;
  keyDeliverables?: string[] | string;
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'PAUSED'>('ALL');
  const [disciplineFilter, setDisciplineFilter] = useState('all');
  const [togglingId, setTogglingId] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [editingProject, setEditingProject] = useState<ProjectRecord | null>(null);
  const [formSaving, setFormSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Form Fields (Streamlined to card-necessary fields only)
  const [formData, setFormData] = useState({
    title: '',
    disciplineId: 'ai-intelligent-systems',
    disciplineName: 'AI & Intelligent Systems',
    client: '',
    year: new Date().getFullYear().toString(),
    headline: '',
    techStack: 'Next.js 15, TypeScript, Python',
    video: '',
    image: '/assets/images/service/SERVICE01.png',
    status: 'ACTIVE',
  });

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

  const openCreateModal = () => {
    setModalMode('create');
    setEditingProject(null);
    setFormData({
      title: '',
      disciplineId: 'ai-intelligent-systems',
      disciplineName: 'AI & Intelligent Systems',
      client: '',
      year: new Date().getFullYear().toString(),
      headline: '',
      techStack: 'Next.js 15, TypeScript, Python',
      video: '',
      image: '/assets/images/service/SERVICE01.png',
      status: 'ACTIVE',
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (project: ProjectRecord) => {
    setModalMode('edit');
    setEditingProject(project);
    setFormData({
      title: project.title,
      disciplineId: project.disciplineId,
      disciplineName: project.disciplineName,
      client: project.client || '',
      year: project.year || '2026',
      headline: project.headline || '',
      techStack: Array.isArray(project.techStack) ? project.techStack.join(', ') : project.techStack || '',
      video: project.video || '',
      image: project.image || '',
      status: project.status || 'ACTIVE',
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSaving(true);
    setFormError(null);

    try {
      const techStackArray = formData.techStack
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      const payload = {
        title: formData.title,
        disciplineId: formData.disciplineId,
        disciplineName: formData.disciplineName,
        client: formData.client || 'KAIROTRIX Internal',
        year: formData.year,
        headline: formData.headline,
        techStack: techStackArray,
        video: formData.video || null,
        image: formData.image,
        status: formData.status,
        summary: formData.headline,
      };

      if (modalMode === 'create') {
        const res = await fetch('/api/admin/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to create project');
        setProjects((prev) => [data.project, ...prev]);
      } else if (editingProject) {
        const res = await fetch(`/api/admin/projects/${editingProject.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to update project');
        setProjects((prev) =>
          prev.map((p) => (p.id === editingProject.id ? data.project : p))
        );
      }

      setIsModalOpen(false);
    } catch (err: any) {
      setFormError(err.message || 'An error occurred while saving.');
    } finally {
      setFormSaving(false);
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
          <h1 className="text-2xl font-bold text-neutral-950 tracking-tight font-display">
            Work & Projects Manager
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 mt-1">
            Add, update, or instantly pause projects displayed on the public <code className="text-brand-700 bg-brand-50 px-1.5 py-0.5 rounded font-mono font-semibold">/work</code> portal.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-500 hover:to-brand-600 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between bg-white border border-neutral-200/80 p-3 rounded-2xl shadow-xs">
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
                    ? 'bg-brand-600 text-white font-bold shadow-xs'
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
      <div className="bg-white border border-neutral-200/80 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-50/90 border-b border-neutral-200/80 text-neutral-500 font-mono uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Project</th>
                <th className="py-3 px-4">Discipline</th>
                <th className="py-3 px-4">Client & Year</th>
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
                              className="object-cover"
                            />
                          ) : (
                            <FolderGit2 className="w-4 h-4 text-neutral-400" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <span className="font-semibold text-neutral-900 block truncate">
                            {project.title}
                          </span>
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
                          'px-2.5 py-1 rounded-full text-[10px] font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs',
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
                        <button
                          onClick={() => openEditModal(project)}
                          className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-colors cursor-pointer"
                          title="Edit Project"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
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

      {/* Create / Edit Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-neutral-900/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-neutral-200 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
              <div>
                <h2 className="text-lg font-bold text-neutral-950 font-display">
                  {modalMode === 'create' ? 'Add Work Card Specimen' : 'Edit Work Card Specimen'}
                </h2>
                <span className="text-xs text-neutral-500 font-mono">
                  Syncs directly to PostgreSQL database
                </span>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs font-sans">
              {/* Row 1: Title */}
              <div>
                <label className="block text-neutral-700 font-mono text-[11px] uppercase tracking-wider mb-1.5 font-semibold">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Autonomous Operations Agent System"
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:border-brand-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Row 2: Discipline, Client, Year */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-neutral-700 font-mono text-[11px] uppercase tracking-wider mb-1.5 font-semibold">
                    Discipline / Category *
                  </label>
                  <select
                    value={formData.disciplineId}
                    onChange={(e) => {
                      const d = WORK_DISCIPLINES.find((item) => item.id === e.target.value);
                      setFormData({
                        ...formData,
                        disciplineId: e.target.value,
                        disciplineName: d ? d.label : e.target.value,
                      });
                    }}
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 focus:bg-white focus:border-brand-500 focus:outline-none transition-colors cursor-pointer"
                  >
                    {WORK_DISCIPLINES.filter((d) => d.id !== 'all').map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-700 font-mono text-[11px] uppercase tracking-wider mb-1.5 font-semibold">
                    Client / Domain
                  </label>
                  <input
                    type="text"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    placeholder="e.g. Fintech Partner"
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:border-brand-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-neutral-700 font-mono text-[11px] uppercase tracking-wider mb-1.5 font-semibold">
                    Year
                  </label>
                  <input
                    type="text"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    placeholder="2026"
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:border-brand-500 focus:outline-none transition-colors font-mono"
                  />
                </div>
              </div>

              {/* Row 3: Headline / Subtitle */}
              <div>
                <label className="block text-neutral-700 font-mono text-[11px] uppercase tracking-wider mb-1.5 font-semibold">
                  Headline / 1-Line Description *
                </label>
                <input
                  type="text"
                  required
                  value={formData.headline}
                  onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                  placeholder="e.g. Deterministic multi-agent execution with zero-hallucination guardrails and real-time tool calling."
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:border-brand-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Row 4: Tech Stack and Status */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-neutral-700 font-mono text-[11px] uppercase tracking-wider mb-1.5 font-semibold">
                    Tech Stack (Comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.techStack}
                    onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                    placeholder="Python, FastAPI, Agentic LLMs, PgVector, Docker"
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:border-brand-500 focus:outline-none transition-colors font-mono text-[11px]"
                  />
                </div>

                <div>
                  <label className="block text-neutral-700 font-mono text-[11px] uppercase tracking-wider mb-1.5 font-semibold">
                    Card Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 focus:bg-white focus:border-brand-500 focus:outline-none transition-colors cursor-pointer font-mono"
                  >
                    <option value="ACTIVE">ACTIVE (Live on /work)</option>
                    <option value="PAUSED">PAUSED (Hidden from site)</option>
                  </select>
                </div>
              </div>

              {/* Row 5: Media Uploaders */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <MediaUploader
                  label="Card Display Image *"
                  value={formData.image}
                  onChange={(url) => setFormData({ ...formData, image: url })}
                  folder="kairotrix/projects"
                  accept="image"
                  placeholder="Upload or paste image URL..."
                  helperText="WebP, PNG, or JPG (1920x1080 recommended)"
                />

                <MediaUploader
                  label="Demo Video (Optional)"
                  value={formData.video}
                  onChange={(url) => setFormData({ ...formData, video: url })}
                  folder="kairotrix/projects"
                  accept="video"
                  placeholder="Upload or paste video URL..."
                  helperText="MP4 or WebM (Autoplays full-bleed in background)"
                />
              </div>

              {/* Row 6: Modal Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200/70 text-neutral-700 font-mono text-xs transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formSaving}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-500 hover:to-brand-600 text-white font-semibold text-xs flex items-center gap-2 shadow-xs disabled:opacity-50 transition-all cursor-pointer"
                >
                  {formSaving ? 'Saving to Database...' : modalMode === 'create' ? 'Create Project Card' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
