'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  ArrowLeft,
  Eye,
  Save,
  Send,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Clock,
  User,
  Tag,
  Video,
  FileText,
  Cpu,
  Layers,
  Loader2,
} from 'lucide-react';
import RichTextEditor from '@/components/admin/RichTextEditor';
import MediaUploader from '@/components/admin/MediaUploader';
import { TECH_CATEGORIES } from '@/data/insightsData';

interface TeamMemberRecord {
  id: string;
  name: string;
  role: string;
  image: string;
}

export default function BlogWriterCreatePage() {
  const router = useRouter();

  // Form State
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<'article' | 'case-study' | 'system-blueprint' | 'research'>('article');
  const [techCategoryId, setTechCategoryId] = useState('ai-agents');
  const [tags, setTags] = useState('AI Agents, Architecture, Systems');
  const [image, setImage] = useState('/assets/images/service/SERVICE01.png');
  const [videoSrc, setVideoSrc] = useState('');

  // Author Mapping State (Dynamically loaded from database TeamMembers)
  const [teamMembers, setTeamMembers] = useState<TeamMemberRecord[]>([]);
  const [authorName, setAuthorName] = useState('KAIROTRIX Engineering');
  const [authorRole, setAuthorRole] = useState('Engineering Team');
  const [authorAvatar, setAuthorAvatar] = useState('/assets/brand/kairotrix-symbol.svg');
  const [loadingTeam, setLoadingTeam] = useState(true);

  // Workflow State
  const [status, setStatus] = useState<'DRAFT' | 'PENDING_REVIEW' | 'PUBLISHED'>('DRAFT');
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState(false);

  // 1. Fetch Verified Team Members to populate Authors dropdown
  useEffect(() => {
    async function loadTeam() {
      try {
        const res = await fetch('/api/admin/team');
        if (res.ok) {
          const data = await res.json();
          const members: TeamMemberRecord[] = (data.members || []).filter((m: any) => m.isActive);
          setTeamMembers(members);
          if (members.length > 0) {
            setAuthorName(members[0].name);
            setAuthorRole(members[0].role);
            setAuthorAvatar(members[0].image || '/assets/brand/kairotrix-symbol.svg');
          }
        }
      } catch (err) {
        console.error('Failed to load team authors:', err);
      } finally {
        setLoadingTeam(false);
      }
    }
    loadTeam();
  }, []);

  // Handle Author Dropdown Change
  const handleSelectAuthor = (memberId: string) => {
    const selected = teamMembers.find((m) => m.id === memberId);
    if (selected) {
      setAuthorName(selected.name);
      setAuthorRole(selected.role);
      setAuthorAvatar(selected.image);
    }
  };

  // Submit Article (Save Draft, Submit for Review, or Publish)
  const handleSave = async (targetStatus: 'DRAFT' | 'PENDING_REVIEW' | 'PUBLISHED') => {
    if (!title.trim()) {
      setErrorMessage('Article Title is required before saving.');
      return;
    }

    setSaving(true);
    setErrorMessage(null);

    // Auto-generate clean, collision-free slug from title
    const computedSlug =
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '') || `insight-${Date.now()}`;

    const selectedTech = TECH_CATEGORIES.find((c) => c.id === techCategoryId);
    const techCategoryLabel = selectedTech ? selectedTech.label : 'Software & Web Engineering';

    const tagsArray = tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    // If video is provided from Cloudinary and image is default, use Cloudinary video thumbnail poster
    let finalImage = image;
    if (videoSrc && videoSrc.includes('cloudinary.com') && (!finalImage || finalImage.includes('/service/'))) {
      finalImage = videoSrc.replace(/\.[^/.]+$/, '.jpg');
    }

    const payload = {
      title: title.trim(),
      slug: computedSlug,
      subtitle: subtitle.trim() || title.trim(),
      excerpt: subtitle.trim() || title.trim(),
      content: content || null,
      category,
      badge: 'TECHNICAL DEEP DIVE',
      disciplineId: techCategoryId,
      disciplineName: techCategoryLabel,
      techCategoryId,
      techCategoryLabel,
      date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      readTime: `${Math.max(1, Math.ceil((content.replace(/<[^>]*>/g, '').split(/\s+/).length) / 200))} min read`,
      author: authorName,
      authorRole: authorRole,
      tags: tagsArray,
      image: finalImage,
      videoSrc: videoSrc || null,
      keyTakeaway: subtitle.trim() || title.trim() || 'Verified in production engineering.',
      empiricalMetricLabel: null,
      empiricalMetricValue: null,
      status: targetStatus,
    };

    try {
      const res = await fetch('/api/admin/insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save article.');
      }

      setStatus(targetStatus);
      setSavedSuccess(true);
      setTimeout(() => {
        router.push('/admin/insights');
      }, 1200);
    } catch (err: unknown) {
      setErrorMessage((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 pb-16">
      {/* ─── TOP ACTION BAR ─── */}
      <div className="sticky top-0 z-30 bg-white/95 border-b border-neutral-200/80 px-4 sm:px-8 py-3.5 backdrop-blur-md flex flex-wrap items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/insights"
            className="p-2 rounded-xl bg-neutral-100 hover:bg-neutral-200/80 text-neutral-600 hover:text-neutral-950 transition-colors cursor-pointer shadow-xs"
            title="Back to Articles Dashboard"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-700">
                KAIROTRIX BLOG WRITER
              </span>
              <span className="text-neutral-300">•</span>
              <span className="text-xs font-mono uppercase px-2.5 py-0.5 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-700 font-semibold">
                {status === 'DRAFT'
                  ? '⚪ Draft'
                  : status === 'PENDING_REVIEW'
                  ? '🟡 Pending Admin Review'
                  : '🟢 Published'}
              </span>
            </div>
            <h1 className="text-sm sm:text-base font-display font-bold text-neutral-950 truncate max-w-sm sm:max-w-md">
              {title || 'Untitled Article'}
            </h1>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Live Preview Toggle */}
          <button
            type="button"
            onClick={() => setPreviewMode(!previewMode)}
            className={`px-3.5 py-2 rounded-xl border text-xs font-mono font-medium flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs ${
              previewMode
                ? 'bg-brand-50 border-brand-300 text-brand-700 font-bold'
                : 'bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{previewMode ? 'Back to Editor' : 'Live Preview'}</span>
          </button>

          {/* Save as Draft */}
          <button
            type="button"
            disabled={saving}
            onClick={() => handleSave('DRAFT')}
            className="px-4 py-2 rounded-xl bg-white hover:bg-neutral-50 border border-neutral-200 text-neutral-700 text-xs font-mono uppercase tracking-wider font-semibold transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50 shadow-xs"
          >
            <Save className="w-3.5 h-3.5 text-neutral-500" />
            <span>Save Draft</span>
          </button>

          {/* Submit for Admin Review */}
          <button
            type="button"
            disabled={saving}
            onClick={() => handleSave('PENDING_REVIEW')}
            className="px-4 py-2 rounded-xl bg-amber-50 hover:bg-amber-100/80 border border-amber-200 text-amber-800 text-xs font-mono uppercase tracking-wider font-semibold transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50 shadow-xs"
          >
            <Send className="w-3.5 h-3.5 text-amber-600" />
            <span>Submit for Review</span>
          </button>

          {/* Direct Publish (Admin) */}
          <button
            type="button"
            disabled={saving}
            onClick={() => handleSave('PUBLISHED')}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-500 hover:to-brand-600 text-white text-xs font-mono uppercase tracking-wider font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Saving...</span>
              </>
            ) : savedSuccess ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                <span>Saved!</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Publish Now</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Error Banner */}
      {errorMessage && (
        <div className="max-w-7xl mx-auto px-4 pt-4">
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-mono flex items-center gap-2 shadow-xs">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{errorMessage}</span>
          </div>
        </div>
      )}

      {/* ─── MAIN WRITER WORKSPACE ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {previewMode ? (
          /* ─── LIVE PREVIEW MODE ─── */
          <div className="max-w-4xl mx-auto p-8 rounded-3xl bg-white border border-neutral-200/80 shadow-xl">
            <div className="mb-6 flex items-center justify-between pb-4 border-b border-neutral-100">
              <span className="font-mono text-xs text-brand-700 font-bold uppercase tracking-wider">
                PREVIEW: {title || 'Untitled Article'}
              </span>
              <span className="font-mono text-xs text-neutral-500">
                {authorName} • {authorRole}
              </span>
            </div>

            <div className="mb-6">
              <span className="px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 font-mono text-xs uppercase tracking-wider font-semibold">
                TECHNICAL DEEP DIVE
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-display font-bold text-neutral-950 mb-4">
              {title || 'Your Article Title'}
            </h1>
            <p className="text-lg text-neutral-600 font-sans mb-8">
              {subtitle || 'Your article subtitle and premise...'}
            </p>

            {videoSrc ? (
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-neutral-200 mb-8 shadow-xs bg-black">
                <video src={videoSrc} controls autoPlay muted loop className="w-full h-full object-cover" />
              </div>
            ) : image ? (
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-neutral-200 mb-8 shadow-xs">
                <Image src={image} alt={title} fill className="object-cover" />
              </div>
            ) : null}

            <div
              className="prose prose-neutral max-w-none"
              dangerouslySetInnerHTML={{ __html: content || '<p>Article body will render here...</p>' }}
            />
          </div>
        ) : (
          /* ─── WRITER EDITOR & SIDEBAR LAYOUT ─── */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column (8 Cols): Title, Subtitle & MS Word Editor */}
            <div className="lg:col-span-8 space-y-6">
              {/* Article Title Input */}
              <div className="p-6 rounded-2xl bg-white border border-neutral-200/80 shadow-xs space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-2 font-semibold">
                    ARTICLE TITLE *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Architecting Deterministic Autonomous AI Agents for Enterprise Workflows"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-lg sm:text-xl font-display font-bold text-neutral-950 placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:border-brand-500 transition-colors"
                  />
                </div>

                {/* Subtitle / Excerpt */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-2 font-semibold">
                    SUBTITLE / NARRATIVE PREMISE
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Briefly describe the operational breakdown or key architectural insight..."
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-sans text-neutral-800 placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:border-brand-500 resize-none transition-colors"
                  />
                </div>
              </div>

              {/* MS Word-Style Rich Text Editor */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-2 flex items-center justify-between font-semibold">
                  <span>ARTICLE CONTENT & MEDIA BODY (MS WORD FORMATTING)</span>
                  <span className="text-[11px] text-brand-700 font-normal">
                    Format with H1-H3, Images & YouTube Embeds
                  </span>
                </label>
                <RichTextEditor
                  value={content}
                  onChange={(html) => setContent(html)}
                  placeholder="Start typing your technical breakdown... Use the ribbon toolbar above for H1, H2, H3, Bold, Italic, Images, and YouTube video embeds."
                  minHeight="560px"
                />
              </div>
            </div>

            {/* Right Column (4 Cols): Author, Cover Media & Taxonomy Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              {/* Author Assignment Card */}
              <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-xs space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-brand-700 font-bold uppercase tracking-wider pb-2 border-b border-neutral-100">
                  <User className="w-4 h-4 text-brand-600" />
                  <span>Author & Team Attribution</span>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-2 font-semibold">
                    Assign Team Author:
                  </label>
                  {loadingTeam ? (
                    <div className="text-xs font-mono text-neutral-500 flex items-center gap-2 py-2">
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-brand-600" />
                      <span>Loading team members...</span>
                    </div>
                  ) : teamMembers.length > 0 ? (
                    <select
                      value={
                        teamMembers.find((m) => m.name === authorName)?.id || teamMembers[0]?.id
                      }
                      onChange={(e) => handleSelectAuthor(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-mono text-neutral-900 focus:bg-white focus:outline-none focus:border-brand-500 cursor-pointer"
                    >
                      {teamMembers.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.name} ({m.role})
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-mono text-neutral-900 focus:bg-white"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-1.5 font-semibold">
                    Author Title / Role:
                  </label>
                  <input
                    type="text"
                    value={authorRole}
                    onChange={(e) => setAuthorRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-mono text-neutral-700 focus:bg-white focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              {/* Cover Media Card with Direct Cloudinary Upload */}
              <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-xs space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-brand-700 font-bold uppercase tracking-wider pb-2 border-b border-neutral-100">
                  <Video className="w-4 h-4 text-brand-600" />
                  <span>Media & Video (Cloudinary CDN)</span>
                </div>

                <div>
                  <MediaUploader
                    value={image}
                    onChange={(url) => setImage(url)}
                    label="Cover / Thumbnail Image"
                    folder="kairotrix/insights"
                    accept="image"
                    helperText="Upload to Cloudinary CDN for instant optimized loading"
                  />
                </div>

                <div>
                  <MediaUploader
                    value={videoSrc}
                    onChange={(url) => {
                      setVideoSrc(url);
                      if (url && url.includes('cloudinary.com') && (!image || image.includes('/service/'))) {
                        setImage(url.replace(/\.[^/.]+$/, '.jpg'));
                      }
                    }}
                    label="Featured / Teaser Video"
                    folder="kairotrix/insights"
                    accept="video"
                    placeholder="Upload MP4/WebM to Cloudinary CDN..."
                    helperText="Cloudinary video streams dynamically on article page & feed"
                  />
                  <div className="flex flex-wrap items-center gap-1.5 mt-2">
                    <span className="text-[10px] font-mono text-neutral-400">Presets:</span>
                    {[
                      { label: 'AI Service', url: '/assets/videos/ai-service.mp4' },
                      { label: 'Workflows', url: '/assets/videos/automated-workflows.mp4' },
                      { label: 'Dashboard', url: '/assets/videos/live-dashboard.mp4' },
                      { label: 'Smart Search', url: '/assets/videos/smart-search.mp4' },
                    ].map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => setVideoSrc(preset.url)}
                        className="px-2 py-0.5 rounded bg-neutral-100 hover:bg-neutral-200/80 text-[10px] font-mono text-neutral-600 hover:text-neutral-900 border border-neutral-200/60 transition-colors cursor-pointer"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Taxonomy & Category */}
              <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-xs space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-brand-700 font-bold uppercase tracking-wider pb-2 border-b border-neutral-100">
                  <Tag className="w-4 h-4 text-brand-600" />
                  <span>Taxonomy & Tags</span>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-1.5 font-semibold">
                    Tech Category:
                  </label>
                  <select
                    value={techCategoryId}
                    onChange={(e) => setTechCategoryId(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-mono text-neutral-900 focus:bg-white focus:outline-none focus:border-brand-500 cursor-pointer"
                  >
                    {TECH_CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-1.5 font-semibold">
                    Tags (Comma-separated):
                  </label>
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="AI Agents, Architecture, Benchmarks"
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-mono text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
