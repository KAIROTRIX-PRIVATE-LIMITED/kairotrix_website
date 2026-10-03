'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import ProjectEditorForm, { ProjectFormData } from '@/components/admin/ProjectEditorForm';

export default function AdminProjectEditPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [projectData, setProjectData] = useState<Partial<ProjectFormData> | null>(null);

  useEffect(() => {
    async function loadProject() {
      if (!id) return;
      try {
        setLoading(true);
        const res = await fetch(`/api/admin/projects/${id}`);
        if (!res.ok) {
          throw new Error('Project not found or failed to load.');
        }
        const data = await res.json();
        const p = data.project;
        setProjectData({
          id: p.id,
          title: p.title || '',
          slug: p.slug || '',
          headline: p.headline || p.summary || '',
          disciplineId: p.disciplineId || 'ai-intelligent-systems',
          disciplineName: p.disciplineName || 'AI & Intelligent Systems',
          client: p.client || '',
          year: p.year || '2026',
          badge: p.badge || 'KAIROTRIX BUILD',
          techStack: Array.isArray(p.techStack) ? p.techStack.join(', ') : p.techStack || '',
          video: p.video || '',
          image: p.image || '',
          status: p.status || 'ACTIVE',
        });
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Failed to load project details.');
      } finally {
        setLoading(false);
      }
    }

    loadProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAFC] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-6 h-6 animate-spin text-brand-600" />
        <span className="font-mono text-xs text-neutral-500 uppercase tracking-wider">
          Loading Project Specimen...
        </span>
      </div>
    );
  }

  if (error || !projectData) {
    return (
      <div className="min-h-screen bg-[#FAFAFC] flex flex-col items-center justify-center p-6 text-center">
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-mono max-w-md mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
          <span>{error || 'Project not found.'}</span>
        </div>
        <Link
          href="/admin/projects"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-900 text-white text-xs font-mono uppercase tracking-wider"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Projects</span>
        </Link>
      </div>
    );
  }

  return <ProjectEditorForm initialData={projectData} isEditMode={true} />;
}
