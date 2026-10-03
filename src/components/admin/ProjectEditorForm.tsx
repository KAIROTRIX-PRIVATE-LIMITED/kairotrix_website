'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Eye,
  Save,
  Sparkles,
  CheckCircle2,
  PauseCircle,
  AlertCircle,
  Loader2,
  Upload,
  FolderOpen,
  Building2,
  Calendar,
  Award,
  Tag,
  Film,
  Image as ImageIcon,
  X,
  Play,
  ArrowUpRight,
} from 'lucide-react';
import { WORK_DISCIPLINES, type WorkBadge } from '@/data/workData';

export interface ProjectFormData {
  id?: string;
  title: string;
  slug?: string;
  headline: string;
  disciplineId: string;
  disciplineName: string;
  client: string;
  year: string;
  badge: WorkBadge;
  techStack: string;
  video: string;
  image: string;
  status: 'ACTIVE' | 'PAUSED';
}

interface ProjectEditorFormProps {
  initialData?: Partial<ProjectFormData>;
  isEditMode?: boolean;
}

const BADGE_OPTIONS: { id: WorkBadge; label: string }[] = [
  { id: 'KAIROTRIX BUILD', label: 'KAIROTRIX BUILD' },
  { id: 'CLIENT PROJECT', label: 'CLIENT PROJECT' },
  { id: 'TECHNICAL DEMO', label: 'TECHNICAL DEMO' },
  { id: 'EXPERIMENT', label: 'EXPERIMENT' },
  { id: 'CAPABILITY', label: 'CAPABILITY' },
];

export default function ProjectEditorForm({
  initialData,
  isEditMode = false,
}: ProjectEditorFormProps) {
  const router = useRouter();

  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [title, setTitle] = useState(initialData?.title || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [headline, setHeadline] = useState(initialData?.headline || '');
  const [disciplineId, setDisciplineId] = useState(
    initialData?.disciplineId || 'ai-intelligent-systems'
  );
  const [disciplineName, setDisciplineName] = useState(
    initialData?.disciplineName || 'AI & Intelligent Systems'
  );
  const [client, setClient] = useState(initialData?.client || 'KAIROTRIX Engineering');
  const [year, setYear] = useState(
    initialData?.year || new Date().getFullYear().toString()
  );
  const [badge, setBadge] = useState<WorkBadge>(
    initialData?.badge || 'KAIROTRIX BUILD'
  );
  const [techStack, setTechStack] = useState(
    Array.isArray(initialData?.techStack)
      ? initialData.techStack.join(', ')
      : initialData?.techStack || 'Next.js 15, TypeScript, Python, PgVector'
  );
  const [status, setStatus] = useState<'ACTIVE' | 'PAUSED'>(
    initialData?.status || 'ACTIVE'
  );

  // Media State 1: Image
  const [image, setImage] = useState(initialData?.image || '');
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Media State 2: Video
  const [video, setVideo] = useState(initialData?.video || '');
  const [videoFile, setVideoFile] = useState<File | null>(null);

  // UI / Workflow State
  const [previewMode, setPreviewMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savingStatusText, setSavingStatusText] = useState('Saving...');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Synchronize disciplineName when disciplineId changes
  const handleDisciplineChange = (newId: string) => {
    setDisciplineId(newId);
    const found = WORK_DISCIPLINES.find((d) => d.id === newId);
    if (found) {
      setDisciplineName(found.label);
    }
  };

  // Image Selection (Instant Blob Preview)
  const handleImageFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImageFile(file);
      const preview = URL.createObjectURL(file);
      setImage(preview);
    }
  };

  // Video Selection (Instant Blob Preview)
  const handleVideoFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setVideoFile(file);
      const preview = URL.createObjectURL(file);
      setVideo(preview);
    }
  };

  // Cloudinary Upload Helper
  const uploadFileToCloudinary = async (
    file: File,
    folder = 'kairotrix/projects'
  ): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    const res = await fetch('/api/admin/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Failed to upload media to cloud.');
    }
    return data.url;
  };

  // Save / Publish Action
  const handleSave = async (targetStatus: 'ACTIVE' | 'PAUSED') => {
    if (!title.trim()) {
      setErrorMessage('Project Title is required before saving.');
      return;
    }
    if (!headline.trim()) {
      setErrorMessage('A 1-line headline or description is required.');
      return;
    }

    setSaving(true);
    setErrorMessage(null);

    try {
      let finalImageUrl = image;
      let finalVideoUrl = video;

      // Upload local image if pending
      if (imageFile) {
        setSavingStatusText('Uploading project cover image...');
        finalImageUrl = await uploadFileToCloudinary(imageFile, 'kairotrix/projects');
      }

      // Upload local video if pending
      if (videoFile) {
        setSavingStatusText('Uploading project demo video...');
        finalVideoUrl = await uploadFileToCloudinary(videoFile, 'kairotrix/projects');
      }

      const techStackArray = techStack
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      const payload = {
        title: title.trim(),
        slug: slug.trim() || undefined,
        headline: headline.trim(),
        summary: headline.trim(),
        invariant: headline.trim(),
        disciplineId,
        disciplineName,
        client: client.trim() || 'KAIROTRIX Engineering',
        year: year.trim() || new Date().getFullYear().toString(),
        badge,
        type: 'project',
        techStack: techStackArray,
        image: finalImageUrl || '/assets/images/solutions/sub_hero/s1.png',
        video: finalVideoUrl || null,
        status: targetStatus,
      };

      setSavingStatusText(
        isEditMode ? 'Updating database...' : 'Publishing to /work...'
      );

      const endpoint = isEditMode
        ? `/api/admin/projects/${initialData?.id}`
        : '/api/admin/projects';
      const method = isEditMode ? 'PUT' : 'POST';

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save project.');
      }

      setSavedSuccess(true);
      setTimeout(() => {
        router.push('/admin/projects');
      }, 700);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'An unexpected error occurred while saving.');
    } finally {
      setSaving(false);
    }
  };

  const parsedTechStack = techStack
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-[#FAFAFC] text-neutral-900 pb-20">
      {/* ─── 1. STICKY TOP TOOLBAR ─── */}
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-neutral-200/80 px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between shadow-2xs">
        {/* Left: Back Link & Status Badge */}
        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700 text-xs font-mono font-medium transition-colors shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-neutral-500" />
            <span className="hidden sm:inline">Projects</span>
          </Link>

          <div
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border shadow-2xs ${
              status === 'ACTIVE'
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-amber-50 text-amber-700 border-amber-200'
            }`}
          >
            {status === 'ACTIVE' ? (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>ACTIVE (Live on /work)</span>
              </>
            ) : (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span>PAUSED (Hidden)</span>
              </>
            )}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <button
            type="button"
            onClick={() => setPreviewMode(!previewMode)}
            className="px-3.5 py-2 rounded-xl border border-neutral-200 bg-white hover:bg-brand-50 hover:border-brand-300 hover:text-brand-700 text-neutral-700 text-xs font-mono font-medium flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
          >
            <Eye className="w-3.5 h-3.5 text-neutral-500" />
            <span>{previewMode ? 'Back to Editor' : 'Live Card Preview'}</span>
          </button>

          <button
            type="button"
            disabled={saving}
            onClick={() => {
              setStatus('PAUSED');
              handleSave('PAUSED');
            }}
            className="px-3.5 py-2 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700 text-xs font-mono uppercase tracking-wider font-semibold hidden md:flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs disabled:opacity-50"
          >
            <PauseCircle className="w-3.5 h-3.5 text-neutral-400" />
            <span>Save as Paused</span>
          </button>

          <button
            type="button"
            disabled={saving}
            onClick={() => {
              setStatus('ACTIVE');
              handleSave('ACTIVE');
            }}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-brand-600 via-purple-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white text-xs font-mono uppercase tracking-wider font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>{savingStatusText}</span>
              </>
            ) : savedSuccess ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                <span>{isEditMode ? 'Updated!' : 'Published!'}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isEditMode ? 'Save Changes' : 'Publish Project'}</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Error Message Toast */}
      {errorMessage && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-mono flex items-center gap-2 shadow-xs">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{errorMessage}</span>
          </div>
        </div>
      )}

      {/* ─── 2. MAIN CANVAS ─── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {previewMode ? (
          /* Full Live Preview Mode (Matching /work Stacked Specimen Card) */
          <div className="p-6 sm:p-10 rounded-3xl border border-neutral-200/90 bg-white shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100 text-xs font-mono text-neutral-500">
              <span className="text-brand-700 font-bold uppercase tracking-wider">
                LIVE /WORK CARD PREVIEW
              </span>
              <span>Aspect: 100vh Full-Bleed Card</span>
            </div>

            {/* Miniature /work Viewport Simulation */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-black text-white shadow-2xl flex flex-col items-center justify-center text-center p-6 sm:p-12">
              {/* Background Media */}
              {video ? (
                <video
                  src={video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover opacity-80"
                />
              ) : image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={image}
                  alt={title || 'Project Display'}
                  className="absolute inset-0 w-full h-full object-cover opacity-80"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-tr from-neutral-950 via-purple-950/40 to-neutral-900" />
              )}

              {/* Cinematic Vignette */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/80 pointer-events-none" />

              {/* Centered Specimen Content */}
              <div className="relative z-10 max-w-3xl flex flex-col items-center">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-xl border border-white/25 text-white font-display text-xs font-semibold mb-4 shadow-xl">
                  <span>{client || disciplineName}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-white/90" />
                </div>

                <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight mb-3 drop-shadow-2xl">
                  {title || 'Project Title...'}
                </h2>

                <p className="font-sans text-xs sm:text-base text-white/90 font-normal leading-relaxed max-w-xl mx-auto drop-shadow-lg line-clamp-2">
                  {headline || '1-line description of the system and business problem solved...'}
                </p>
              </div>

              {/* Floating Bottom Tech Tags */}
              <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 z-20 flex flex-wrap items-center justify-center gap-2 px-4">
                {parsedTechStack.slice(0, 5).map((tech, idx) => (
                  <span
                    key={idx}
                    className="font-mono text-[10px] sm:text-[11px] font-medium uppercase px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white/90 shadow-md"
                  >
                    {tech}
                  </span>
                ))}
                <span className="font-mono text-[10px] sm:text-[11px] font-medium px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white shadow-md">
                  {year}
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* Normal Minimalist Editor Flow */
          <>
            {/* 1. Large Clean Headline Input */}
            <div className="pt-2">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter Project Title..."
                className="w-full text-2xl sm:text-4xl font-display font-bold text-neutral-950 placeholder:text-neutral-300 border-none outline-none focus:ring-0 bg-transparent tracking-tight"
              />
            </div>

            {/* 2. Metadata Pills Strip */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono text-neutral-600 pb-2">
              {/* Discipline / Category Pill */}
              <div className="flex items-center gap-1.5 bg-white px-3 py-2 rounded-xl border border-neutral-200/90 shadow-2xs">
                <FolderOpen className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                <span className="text-[10px] text-neutral-400 uppercase font-semibold">Discipline:</span>
                <select
                  value={disciplineId}
                  onChange={(e) => handleDisciplineChange(e.target.value)}
                  className="bg-transparent border-none text-neutral-800 text-xs font-mono outline-none cursor-pointer font-semibold"
                >
                  {WORK_DISCIPLINES.filter((d) => d.id !== 'all').map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Client / Domain Pill */}
              <div className="flex items-center gap-1.5 bg-white px-3 py-2 rounded-xl border border-neutral-200/90 shadow-2xs">
                <Building2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                <span className="text-[10px] text-neutral-400 uppercase font-semibold">Client:</span>
                <input
                  type="text"
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                  placeholder="Client or Domain"
                  className="text-xs font-mono font-semibold text-neutral-900 bg-transparent border-b border-neutral-200 hover:border-neutral-400 focus:border-brand-500 outline-none w-28 sm:w-36 transition-colors"
                />
              </div>

              {/* Year Pill */}
              <div className="flex items-center gap-1.5 bg-white px-3 py-2 rounded-xl border border-neutral-200/90 shadow-2xs">
                <Calendar className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <span className="text-[10px] text-neutral-400 uppercase font-semibold">Year:</span>
                <input
                  type="text"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  placeholder="2026"
                  className="text-xs font-mono font-semibold text-neutral-900 bg-transparent border-b border-neutral-200 hover:border-neutral-400 focus:border-brand-500 outline-none w-14 sm:w-16 transition-colors"
                />
              </div>

              {/* Badge Pill */}
              <div className="flex items-center gap-1.5 bg-white px-3 py-2 rounded-xl border border-neutral-200/90 shadow-2xs">
                <Award className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                <span className="text-[10px] text-neutral-400 uppercase font-semibold">Badge:</span>
                <select
                  value={badge}
                  onChange={(e) => setBadge(e.target.value as WorkBadge)}
                  className="bg-transparent border-none text-neutral-800 text-xs font-mono outline-none cursor-pointer"
                >
                  {BADGE_OPTIONS.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Card Status */}
              <div className="flex items-center gap-1.5 bg-white px-3 py-2 rounded-xl border border-neutral-200/90 shadow-2xs">
                <span className="text-[10px] text-neutral-400 uppercase font-semibold">Status:</span>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as 'ACTIVE' | 'PAUSED')}
                  className="bg-transparent border-none text-neutral-800 text-xs font-mono outline-none cursor-pointer font-bold"
                >
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="PAUSED">PAUSED</option>
                </select>
              </div>
            </div>

            {/* 3. 1-Line Headline / Narrative Summary Box */}
            <div className="rounded-3xl border border-neutral-200/90 bg-white p-5 sm:p-6 shadow-2xs space-y-2">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-500 font-semibold">
                1-Line Headline / Architecture Summary *
              </label>
              <textarea
                rows={2}
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder="e.g. Deterministic multi-agent software pipelines with zero hallucinations and sub-second execution."
                className="w-full text-sm sm:text-base text-neutral-900 placeholder:text-neutral-300 border-none outline-none focus:ring-0 bg-transparent resize-none font-sans leading-relaxed"
              />
            </div>

            {/* 4. Tech Stack Tags Input with Live Badges */}
            <div className="rounded-3xl border border-neutral-200/90 bg-white p-5 sm:p-6 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 font-semibold flex items-center gap-2">
                  <Tag className="w-3.5 h-3.5 text-brand-600" />
                  <span>Tech Stack &amp; Architectural Components</span>
                </label>
                <span className="text-[10px] font-mono text-neutral-400">
                  Separate with commas
                </span>
              </div>

              <input
                type="text"
                value={techStack}
                onChange={(e) => setTechStack(e.target.value)}
                placeholder="e.g. Next.js 15, TypeScript, Python, PgVector, Docker"
                className="w-full text-xs font-mono text-neutral-900 placeholder:text-neutral-400 bg-neutral-50/80 border border-neutral-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-brand-500 focus:bg-white transition-all"
              />

              {parsedTechStack.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {parsedTechStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-brand-50 border border-brand-200 text-brand-700 font-mono text-[10px] font-semibold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* ─── 5. MEDIA & LIVE CARD PREVIEW (3-CARD SPLIT) ─── */}
            <div className="pt-2 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-brand-700 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                  <span>Project Media &amp; Live Card Representation</span>
                </h2>
                <span className="text-[11px] font-mono text-neutral-400">
                  Instant preview • Uploads on save
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
                {/* Card 1: 16:9 Display Image */}
                <div className="lg:col-span-4 rounded-3xl border-2 border-dashed border-neutral-300 hover:border-brand-500/80 bg-white hover:bg-brand-50/10 p-5 flex flex-col justify-between transition-all relative overflow-hidden min-h-[240px] shadow-2xs">
                  <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/svg+xml"
                    onChange={handleImageFileSelect}
                    className="hidden"
                  />

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 flex items-center gap-1.5">
                        <ImageIcon className="w-3.5 h-3.5 text-brand-600" />
                        <span>Card Display Image *</span>
                      </span>
                      {image && (
                        <button
                          type="button"
                          onClick={() => {
                            setImage('');
                            setImageFile(null);
                          }}
                          className="text-[10px] font-mono text-rose-500 hover:text-rose-700 font-semibold"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                    <p className="text-[11px] font-sans text-neutral-500 text-left mb-3">
                      Used as primary background image across desktop and mobile.
                    </p>
                  </div>

                  {image ? (
                    <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-neutral-200 group bg-neutral-900">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={image}
                        alt="Project Display"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <button
                          type="button"
                          onClick={() => imageInputRef.current?.click()}
                          className="px-3 py-1.5 rounded-lg bg-white text-neutral-900 text-xs font-mono font-semibold"
                        >
                          Change Image
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => imageInputRef.current?.click()}
                      className="aspect-video w-full rounded-2xl border border-dashed border-neutral-200 bg-neutral-50 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-neutral-100/80 transition-colors"
                    >
                      <Upload className="w-5 h-5 text-neutral-400" />
                      <span className="text-xs font-mono text-neutral-600 font-medium">
                        Click or drag image
                      </span>
                      <span className="text-[10px] font-mono text-neutral-400">
                        PNG, JPG, WebP
                      </span>
                    </div>
                  )}

                  <div className="pt-3">
                    <input
                      type="text"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      placeholder="Or paste image URL..."
                      className="w-full text-[11px] font-mono text-neutral-700 bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-1.5 outline-none focus:border-brand-500"
                    />
                  </div>
                </div>

                {/* Card 2: Demo Video */}
                <div className="lg:col-span-4 rounded-3xl border-2 border-dashed border-neutral-300 hover:border-brand-500/80 bg-white hover:bg-brand-50/10 p-5 flex flex-col justify-between transition-all relative overflow-hidden min-h-[240px] shadow-2xs">
                  <input
                    ref={videoInputRef}
                    type="file"
                    accept="video/mp4,video/webm"
                    onChange={handleVideoFileSelect}
                    className="hidden"
                  />

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 flex items-center gap-1.5">
                        <Film className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Demo Video (Optional)</span>
                      </span>
                      {video && (
                        <button
                          type="button"
                          onClick={() => {
                            setVideo('');
                            setVideoFile(null);
                          }}
                          className="text-[10px] font-mono text-rose-500 hover:text-rose-700 font-semibold"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                    <p className="text-[11px] font-sans text-neutral-500 text-left mb-3">
                      Full-bleed video background that autoplays smoothly on /work.
                    </p>
                  </div>

                  {video ? (
                    <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-neutral-200 group bg-neutral-900">
                      <video
                        src={video}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <button
                          type="button"
                          onClick={() => videoInputRef.current?.click()}
                          className="px-3 py-1.5 rounded-lg bg-white text-neutral-900 text-xs font-mono font-semibold"
                        >
                          Change Video
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => videoInputRef.current?.click()}
                      className="aspect-video w-full rounded-2xl border border-dashed border-neutral-200 bg-neutral-50 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-neutral-100/80 transition-colors"
                    >
                      <Film className="w-5 h-5 text-neutral-400" />
                      <span className="text-xs font-mono text-neutral-600 font-medium">
                        Click or drag video
                      </span>
                      <span className="text-[10px] font-mono text-neutral-400">
                        MP4 or WebM
                      </span>
                    </div>
                  )}

                  <div className="pt-3">
                    <input
                      type="text"
                      value={video}
                      onChange={(e) => setVideo(e.target.value)}
                      placeholder="Or paste video URL..."
                      className="w-full text-[11px] font-mono text-neutral-700 bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-1.5 outline-none focus:border-brand-500"
                    />
                  </div>
                </div>

                {/* Card 3: Live Miniature Preview */}
                <div className="lg:col-span-4 rounded-3xl border border-neutral-200/90 bg-white p-5 flex flex-col justify-between shadow-2xs">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5 text-brand-600" />
                        <span>Live Miniature</span>
                      </span>
                      <span className="text-[10px] font-mono text-brand-700 font-semibold bg-brand-50 px-2 py-0.5 rounded">
                        Real-Time
                      </span>
                    </div>
                    <p className="text-[11px] font-sans text-neutral-500 text-left mb-3">
                      Shows how this project card appears in the public gallery.
                    </p>
                  </div>

                  <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black text-white shadow-md flex flex-col items-center justify-center text-center p-4">
                    {/* Media */}
                    {video ? (
                      <video
                        src={video}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover opacity-70"
                      />
                    ) : image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={image}
                        alt="Preview"
                        className="absolute inset-0 w-full h-full object-cover opacity-70"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-tr from-neutral-950 to-neutral-900" />
                    )}

                    <div className="absolute inset-0 bg-black/40 pointer-events-none" />

                    <div className="relative z-10 px-2">
                      <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[9px] font-mono mb-1.5">
                        <span>{client || disciplineName}</span>
                      </div>
                      <h4 className="font-display text-sm font-bold text-white line-clamp-1">
                        {title || 'Project Title'}
                      </h4>
                      <p className="text-[10px] text-white/80 line-clamp-1 mt-0.5">
                        {headline || 'Headline overview...'}
                      </p>
                    </div>

                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-center gap-1 text-[8px] font-mono text-white/70">
                      <span>{year}</span>
                      <span>•</span>
                      <span>{parsedTechStack[0] || 'Next.js 15'}</span>
                    </div>
                  </div>

                  <div className="pt-3">
                    <button
                      type="button"
                      onClick={() => setPreviewMode(true)}
                      className="w-full py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-mono font-medium transition-colors"
                    >
                      Expand Full Preview
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
