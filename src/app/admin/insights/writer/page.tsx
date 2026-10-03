'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Eye,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  Pilcrow,
  List,
  ListOrdered,
  Quote,
  Code,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Image as ImageIcon,
  Link as LinkIcon,
  Save,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Upload,
  User,
  Tag,
  FolderOpen,
  FileText,
  Film,
  X,
  Play,
} from 'lucide-react';
import RichTextEditor, { RichTextEditorHandle } from '@/components/admin/RichTextEditor';
import { getYoutubeId } from '@/components/admin/MediaUploader';
import { TECH_CATEGORIES } from '@/data/insightsData';

function YoutubeIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

interface TeamMemberRecord {
  id: string;
  name: string;
  role: string;
  image: string;
}

export default function BlogWriterCreatePage() {
  const router = useRouter();
  const editorRef = useRef<RichTextEditorHandle>(null);

  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<'article' | 'case-study' | 'system-blueprint' | 'research'>('article');
  const [techCategoryId, setTechCategoryId] = useState('ai-agents');
  const [tags, setTags] = useState('AI Agents, Architecture, Systems');

  // Media State 1: Thumbnail Image (Poster)
  const [image, setImage] = useState('');
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  // Media State 2: Hover Video (Plays when card is hovered on website)
  const [videoSrc, setVideoSrc] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);

  // Pending Editor Inline Images
  const pendingEditorFilesRef = useRef<Map<string, File>>(new Map());

  // Author State (Directly Editable + Autofill from team members)
  const [authorName, setAuthorName] = useState('KAIROTRIX Engineering');
  const [authorRole, setAuthorRole] = useState('Engineering Team');
  const [teamMembers, setTeamMembers] = useState<TeamMemberRecord[]>([]);
  const [loadingTeam, setLoadingTeam] = useState(true);

  // Workflow State (Direct publish only)
  const [status, setStatus] = useState<'DRAFT' | 'PUBLISHED'>('DRAFT');
  const [saving, setSaving] = useState(false);
  const [savingStatusText, setSavingStatusText] = useState('Saving...');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState(false);

  // Load team members for quick autofill
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

  const handleSelectAuthor = (memberId: string) => {
    const selected = teamMembers.find((m) => m.id === memberId);
    if (selected) {
      setAuthorName(selected.name);
      setAuthorRole(selected.role);
    }
  };

  const handleRegisterPendingFile = (blobUrl: string, file: File) => {
    pendingEditorFilesRef.current.set(blobUrl, file);
  };

  // Thumbnail Image Selection (Preview-First)
  const handleThumbnailFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setThumbnailFile(file);
      const preview = URL.createObjectURL(file);
      setImage(preview);
    }
  };

  // Hover Video Selection (Preview-First)
  const handleVideoFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setVideoFile(file);
      const preview = URL.createObjectURL(file);
      setVideoSrc(preview);
    }
  };

  const uploadFileToCloudinary = async (file: File, folder = 'kairotrix/insights'): Promise<string> => {
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

  // Direct Publish or Save Draft
  const handleSave = async (targetStatus: 'DRAFT' | 'PUBLISHED') => {
    if (!title.trim()) {
      setErrorMessage('Article Title is required before publishing.');
      return;
    }

    setSaving(true);
    setErrorMessage(null);

    try {
      // 1. Upload Cover Thumbnail Image if local file
      let finalImage = image;
      if (thumbnailFile && image.startsWith('blob:')) {
        setSavingStatusText('Uploading thumbnail image to Cloudinary CDN...');
        const uploadedUrl = await uploadFileToCloudinary(thumbnailFile, 'kairotrix/thumbnails');
        finalImage = uploadedUrl;
      }

      // 2. Upload Hover Video if local file
      let finalVideoSrc = videoSrc;
      if (videoFile && videoSrc.startsWith('blob:')) {
        setSavingStatusText('Uploading hover video to Cloudinary CDN...');
        const uploadedUrl = await uploadFileToCloudinary(videoFile, 'kairotrix/videos');
        finalVideoSrc = uploadedUrl;
      }

      // 3. Upload any local images in the editor body
      let finalContent = content;
      if (pendingEditorFilesRef.current.size > 0) {
        setSavingStatusText('Uploading inline images to Cloudinary CDN...');
        for (const [blobUrl, file] of Array.from(pendingEditorFilesRef.current.entries())) {
          if (finalContent.includes(blobUrl)) {
            try {
              const uploadedUrl = await uploadFileToCloudinary(file, 'kairotrix/insights-body');
              finalContent = finalContent.split(blobUrl).join(uploadedUrl);
              URL.revokeObjectURL(blobUrl);
            } catch (uploadErr) {
              console.warn('Failed to upload inline body image:', uploadErr);
            }
          }
        }
        pendingEditorFilesRef.current.clear();
      }

      // 4. Compute Slug & Save to Database
      setSavingStatusText('Publishing article to database...');
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

      const words = (finalContent || '').replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length;
      const readTime = `${Math.max(1, Math.ceil(words / 200))} min read`;

      const payload = {
        title: title.trim(),
        slug: computedSlug,
        subtitle: subtitle.trim() || title.trim(),
        excerpt: subtitle.trim() || title.trim(),
        content: finalContent || null,
        category,
        badge: category === 'system-blueprint' ? 'SYSTEM BLUEPRINT' : category === 'case-study' ? 'CASE STUDY' : 'TECHNICAL DEEP DIVE',
        disciplineId: techCategoryId,
        disciplineName: techCategoryLabel,
        techCategoryId,
        techCategoryLabel,
        date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        readTime,
        author: authorName.trim() || 'KAIROTRIX Engineering',
        authorRole: authorRole.trim() || 'Engineering Team',
        tags: tagsArray,
        image: finalImage || '',
        videoSrc: finalVideoSrc || null,
        keyTakeaway: subtitle.trim() || title.trim(),
        status: targetStatus,
      };

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
      }, 1000);
    } catch (err: unknown) {
      setErrorMessage((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const previewYoutubeId = getYoutubeId(videoSrc);

  return (
    <div className="min-h-screen bg-[#FAFAFC] text-neutral-900 pb-24">
      {/* ─── 1. INTEGRATED STICKY TOP BAR (KAIROTRIX BRAND THEME) ─── */}
      <header className="sticky top-0 z-30 bg-white/95 border-b border-neutral-200/90 px-4 sm:px-8 py-2.5 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 shadow-xs">
        {/* Left: Brand Eyebrow & Status */}
        <div className="flex items-center gap-3">
          <Link
            href="/admin/insights"
            className="p-2 rounded-xl bg-neutral-100 hover:bg-neutral-200/80 text-neutral-700 hover:text-neutral-950 transition-colors cursor-pointer shadow-xs"
            title="Back to Articles Dashboard"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>

          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse shadow-[0_0_8px_rgba(147,51,234,0.6)]" />
              <span className="font-tech text-xs tracking-[0.2em] font-semibold text-brand-700 uppercase">
                KAIROTRIX // BLOG WRITER
              </span>
              <span className="text-neutral-300">•</span>
              <span
                className={`text-[11px] font-mono uppercase px-2 py-0.5 rounded-full border font-semibold ${
                  status === 'PUBLISHED'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-neutral-100 text-neutral-700 border-neutral-200'
                }`}
              >
                {status === 'PUBLISHED' ? '🟢 Published' : '⚪ Draft'}
              </span>
            </div>
          </div>
        </div>

        {/* Center: Formatting Toolbar Group */}
        <div className="flex items-center gap-0.5 sm:gap-1 p-1 rounded-xl bg-neutral-100/80 border border-neutral-200/90 shadow-xs text-neutral-700">
          <button
            type="button"
            title="Paragraph"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editorRef.current?.formatBlock('p')}
            className="px-2 py-1 rounded-lg hover:bg-white hover:text-brand-700 active:bg-neutral-200 text-xs font-mono font-medium cursor-pointer transition-colors"
          >
            <Pilcrow className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            title="Heading 1"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editorRef.current?.formatBlock('h1')}
            className="px-2 py-1 rounded-lg hover:bg-white hover:text-brand-700 active:bg-neutral-200 text-xs font-display font-extrabold cursor-pointer transition-colors"
          >
            H1
          </button>
          <button
            type="button"
            title="Heading 2"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editorRef.current?.formatBlock('h2')}
            className="px-2 py-1 rounded-lg hover:bg-white hover:text-purple-700 active:bg-neutral-200 text-xs font-display font-bold cursor-pointer transition-colors"
          >
            H2
          </button>
          <button
            type="button"
            title="Heading 3"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editorRef.current?.formatBlock('h3')}
            className="px-2 py-1 rounded-lg hover:bg-white hover:text-indigo-700 active:bg-neutral-200 text-xs font-display font-semibold cursor-pointer transition-colors"
          >
            H3
          </button>
          <div className="h-4 w-px bg-neutral-200 mx-0.5" />

          <button
            type="button"
            title="Bold (Ctrl+B)"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editorRef.current?.exec('bold')}
            className="p-1.5 rounded-lg hover:bg-white hover:text-brand-700 active:bg-neutral-200 text-xs font-bold cursor-pointer transition-colors"
          >
            <Bold className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            title="Italic (Ctrl+I)"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editorRef.current?.exec('italic')}
            className="p-1.5 rounded-lg hover:bg-white hover:text-brand-700 active:bg-neutral-200 text-xs font-bold cursor-pointer transition-colors"
          >
            <Italic className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            title="Underline (Ctrl+U)"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editorRef.current?.exec('underline')}
            className="p-1.5 rounded-lg hover:bg-white hover:text-brand-700 active:bg-neutral-200 text-xs font-bold cursor-pointer transition-colors hidden sm:block"
          >
            <Underline className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            title="Strikethrough"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editorRef.current?.exec('strikeThrough')}
            className="p-1.5 rounded-lg hover:bg-white hover:text-brand-700 active:bg-neutral-200 text-xs cursor-pointer transition-colors hidden sm:block"
          >
            <Strikethrough className="w-3.5 h-3.5" />
          </button>
          <div className="h-4 w-px bg-neutral-200 mx-0.5" />

          <button
            type="button"
            title="Bullet List"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editorRef.current?.exec('insertUnorderedList')}
            className="p-1.5 rounded-lg hover:bg-white hover:text-brand-700 active:bg-neutral-200 cursor-pointer transition-colors"
          >
            <List className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            title="Numbered List"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editorRef.current?.exec('insertOrderedList')}
            className="p-1.5 rounded-lg hover:bg-white hover:text-brand-700 active:bg-neutral-200 cursor-pointer transition-colors"
          >
            <ListOrdered className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            title="Blockquote Callout"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editorRef.current?.formatBlock('blockquote')}
            className="p-1.5 rounded-lg hover:bg-white hover:text-brand-700 active:bg-neutral-200 cursor-pointer transition-colors hidden sm:block"
          >
            <Quote className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            title="Code Block"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editorRef.current?.formatBlock('pre')}
            className="p-1.5 rounded-lg hover:bg-white hover:text-brand-700 active:bg-neutral-200 cursor-pointer transition-colors font-mono hidden sm:block"
          >
            <Code className="w-3.5 h-3.5" />
          </button>
          <div className="h-4 w-px bg-neutral-200 mx-0.5 hidden md:block" />

          <button
            type="button"
            title="Align Left"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editorRef.current?.exec('justifyLeft')}
            className="p-1.5 rounded-lg hover:bg-white hover:text-brand-700 active:bg-neutral-200 cursor-pointer transition-colors hidden md:block"
          >
            <AlignLeft className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            title="Align Center"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editorRef.current?.exec('justifyCenter')}
            className="p-1.5 rounded-lg hover:bg-white hover:text-brand-700 active:bg-neutral-200 cursor-pointer transition-colors hidden md:block"
          >
            <AlignCenter className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            title="Align Right"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editorRef.current?.exec('justifyRight')}
            className="p-1.5 rounded-lg hover:bg-white hover:text-brand-700 active:bg-neutral-200 cursor-pointer transition-colors hidden md:block"
          >
            <AlignRight className="w-3.5 h-3.5" />
          </button>
          <div className="h-4 w-px bg-neutral-200 mx-0.5" />

          <button
            type="button"
            title="Insert Image (Instant Preview)"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editorRef.current?.openImageModal()}
            className="p-1.5 rounded-lg hover:bg-white hover:text-brand-700 active:bg-neutral-200 cursor-pointer text-brand-600 transition-colors"
          >
            <ImageIcon className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            title="Embed YouTube Video"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editorRef.current?.openYoutubeModal()}
            className="p-1.5 rounded-lg hover:bg-white hover:text-rose-600 active:bg-neutral-200 cursor-pointer text-rose-600 transition-colors"
          >
            <YoutubeIcon className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            title="Insert Hyperlink"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editorRef.current?.openLinkModal()}
            className="p-1.5 rounded-lg hover:bg-white hover:text-blue-600 active:bg-neutral-200 cursor-pointer text-blue-600 transition-colors"
          >
            <LinkIcon className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right: Word Count, Preview & Publish Actions */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setPreviewMode(!previewMode)}
            className="px-3.5 py-2 rounded-xl border border-neutral-200 bg-white hover:bg-brand-50 hover:border-brand-300 hover:text-brand-700 text-neutral-700 text-xs font-mono font-medium flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <Eye className="w-3.5 h-3.5 text-neutral-500" />
            <span>{previewMode ? 'Back to Editor' : 'Live Preview'}</span>
          </button>

          <button
            type="button"
            disabled={saving}
            onClick={() => handleSave('DRAFT')}
            className="px-3.5 py-2 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700 text-xs font-mono uppercase tracking-wider font-semibold hidden md:flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
          >
            <Save className="w-3.5 h-3.5 text-neutral-400" />
            <span>Draft</span>
          </button>

          <button
            type="button"
            disabled={saving}
            onClick={() => handleSave('PUBLISHED')}
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
                <span>Published!</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Publish Article</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Error Message */}
      {errorMessage && (
        <div className="max-w-4xl mx-auto px-6 pt-6">
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-mono flex items-center gap-2 shadow-xs">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{errorMessage}</span>
          </div>
        </div>
      )}

      {/* ─── 2. MAIN DOCUMENT CANVAS (FULL-PAGE EXPANSIVE WIDTH) ─── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {previewMode ? (
          /* Live Preview Mode (Matching Full-Width Website Blog View) */
          <div className="p-6 sm:p-10 md:p-14 rounded-3xl border border-neutral-200/90 bg-white shadow-xl space-y-8">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100 text-xs font-mono text-neutral-500">
              <span className="text-brand-700 font-bold uppercase tracking-wider">
                LIVE ARTICLE PREVIEW
              </span>
              <span>{new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
            </div>

            {/* 1. TOP COVER MEDIA: THUMBNAIL IMAGE OR HOVER VIDEO ONLY (Inline YouTube/media renders inside content) */}
            {videoSrc && !previewYoutubeId ? (
              <div className="aspect-video w-full rounded-2xl overflow-hidden bg-neutral-900 shadow-md">
                <video src={videoSrc} controls autoPlay muted loop className="w-full h-full object-cover" />
              </div>
            ) : image ? (
              <div className="aspect-video w-full rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200 shadow-xs">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image} alt={title || 'Thumbnail Cover'} className="w-full h-full object-cover" />
              </div>
            ) : null}

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 font-mono text-xs uppercase tracking-wider font-semibold">
                {category.toUpperCase().replace('-', ' ')}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-neutral-950 tracking-tight leading-tight">
                {title || 'Untitled Article'}
              </h1>
              {subtitle && (
                <p className="text-lg sm:text-xl text-neutral-600 font-sans leading-relaxed">
                  {subtitle}
                </p>
              )}
            </div>

            <div className="flex items-center gap-3 text-xs font-mono text-neutral-500 py-3 border-y border-neutral-100">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-600 to-indigo-600 text-white font-bold flex items-center justify-center text-xs shadow-xs">
                {authorName.charAt(0)}
              </div>
              <div>
                <span className="font-semibold text-neutral-900">{authorName}</span>
                <span className="mx-2">•</span>
                <span className="text-brand-600">{authorRole}</span>
              </div>
            </div>

            <div
              className="article-prose-content max-w-none pt-2"
              dangerouslySetInnerHTML={{
                __html: content || '<p className="text-neutral-400 italic">No content written yet...</p>',
              }}
            />
          </div>
        ) : (
          /* Normal Simple Editor Flow */
          <>
            {/* Title: "Enter Blog Title..." */}
            <div className="pt-2">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter Blog Title..."
                className="w-full text-2xl sm:text-4xl font-display font-bold text-neutral-950 placeholder:text-neutral-300 border-none outline-none focus:ring-0 bg-transparent tracking-tight"
              />
            </div>

            {/* Author / Metadata Row (Directly Editable Author Name & Role) */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-neutral-600 pb-2">
              {/* Editable Author Box */}
              <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-neutral-200/90 shadow-xs">
                <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-brand-600 to-indigo-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                  {authorName ? authorName.charAt(0).toUpperCase() : 'A'}
                </div>
                
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] uppercase text-neutral-400 font-semibold">Author:</span>
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="Enter author name"
                    className="text-xs font-mono font-semibold text-neutral-900 bg-transparent border-b border-neutral-200 hover:border-neutral-400 focus:border-brand-500 outline-none w-32 sm:w-40 transition-colors"
                  />
                  <span className="text-neutral-300">•</span>
                  <input
                    type="text"
                    value={authorRole}
                    onChange={(e) => setAuthorRole(e.target.value)}
                    placeholder="Role"
                    className="text-[11px] font-mono text-brand-600 bg-transparent border-b border-neutral-200 hover:border-neutral-400 focus:border-brand-500 outline-none w-28 sm:w-36 transition-colors"
                  />
                </div>

                {/* Optional Quick Autofill from team */}
                {teamMembers.length > 0 && (
                  <select
                    value=""
                    onChange={(e) => {
                      if (e.target.value) handleSelectAuthor(e.target.value);
                    }}
                    title="Autofill from registered team member"
                    className="text-[10px] font-mono text-neutral-500 bg-neutral-100 hover:bg-neutral-200 rounded px-1.5 py-0.5 border border-neutral-200 cursor-pointer outline-none ml-1"
                  >
                    <option value="">Autofill Team...</option>
                    {teamMembers.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name} ({m.role})
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Category Selector */}
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-neutral-200/90 shadow-xs">
                <FolderOpen className="w-3.5 h-3.5 text-brand-600" />
                <select
                  value={techCategoryId}
                  onChange={(e) => setTechCategoryId(e.target.value)}
                  className="bg-transparent border-none text-neutral-800 text-xs font-mono outline-none cursor-pointer"
                >
                  {TECH_CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Publication Type */}
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-neutral-200/90 shadow-xs">
                <FileText className="w-3.5 h-3.5 text-purple-600" />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="bg-transparent border-none text-neutral-800 text-xs font-mono outline-none cursor-pointer"
                >
                  <option value="article">Technical Deep Dive</option>
                  <option value="system-blueprint">System Blueprint</option>
                  <option value="case-study">Case Study</option>
                  <option value="research">Research Whitepaper</option>
                </select>
              </div>

              {/* Tags Input */}
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-neutral-200/90 shadow-xs flex-1 min-w-[200px]">
                <Tag className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="Tags: AI Agents, Systems, Architecture..."
                  className="w-full bg-transparent text-xs font-mono text-neutral-800 placeholder:text-neutral-400 outline-none"
                />
              </div>
            </div>

            {/* Clean Rounded Editor Frame (KAIROTRIX Light Theme Canvas) */}
            <div className="rounded-3xl border border-neutral-200/90 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-100 bg-white p-6 sm:p-10 min-h-[440px] shadow-xs transition-all">
              <RichTextEditor
                ref={editorRef}
                value={content}
                onChange={(html) => setContent(html)}
                onRegisterPendingFile={handleRegisterPendingFile}
                hideToolbar={true}
                placeholder="Start writing blog content here... Use headings, bullet lists, bold text, images or embeds."
                minHeight="380px"
              />
            </div>

            {/* ─── 3. THUMBNAIL IMAGE, HOVER VIDEO & SEO CARDS ─── */}
            <div className="pt-4 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-brand-700 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                  <span>Media &amp; SEO Specifications</span>
                </h2>
                <span className="text-[11px] font-mono text-neutral-400">
                  Instant preview • Uploads on Publish
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
                {/* 1. THUMBNAIL IMAGE (16:9 Static Cover) */}
                <div className="md:col-span-4 rounded-2xl border-2 border-dashed border-neutral-300 hover:border-brand-500/80 bg-neutral-50/70 hover:bg-brand-50/20 p-5 flex flex-col justify-between text-center transition-all relative overflow-hidden min-h-[220px]">
                  <input
                    ref={thumbnailInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/svg+xml"
                    onChange={handleThumbnailFileSelect}
                    className="hidden"
                  />

                  <div className="w-full">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-bold text-neutral-800 uppercase tracking-wider flex items-center gap-1.5">
                        <ImageIcon className="w-3.5 h-3.5 text-brand-600" />
                        <span>Thumbnail (16:9)</span>
                      </span>
                      {image && (
                        <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                          Ready
                        </span>
                      )}
                    </div>

                    {image ? (
                      <div className="space-y-2">
                        <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200 flex items-center justify-center">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={image} alt="Thumbnail preview" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex items-center justify-between text-xs font-mono pt-1">
                          <button
                            type="button"
                            onClick={() => thumbnailInputRef.current?.click()}
                            className="text-brand-600 hover:underline cursor-pointer font-semibold"
                          >
                            Replace
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setImage('');
                              setThumbnailFile(null);
                            }}
                            className="text-rose-600 hover:underline cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        onClick={() => thumbnailInputRef.current?.click()}
                        className="cursor-pointer space-y-1.5 flex flex-col items-center group py-4"
                      >
                        <div className="w-10 h-10 rounded-xl bg-white group-hover:bg-brand-50 border border-neutral-200 group-hover:border-brand-300 flex items-center justify-center text-neutral-500 group-hover:text-brand-600 transition-colors shadow-xs">
                          <ImageIcon className="w-5 h-5 text-brand-600" />
                        </div>
                        <p className="text-xs font-bold text-neutral-900 group-hover:text-brand-700 transition-colors">
                          Upload Thumbnail Image
                        </p>
                        <p className="text-[11px] text-neutral-500 font-mono">
                          16:9 JPG, PNG, WebP image
                        </p>
                      </div>
                    )}
                  </div>

                  {!image && (
                    <div className="w-full pt-2 mt-2 border-t border-neutral-200/60">
                      <input
                        type="text"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        placeholder="Or paste image URL..."
                        className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-neutral-200 text-[11px] font-mono text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-brand-500 transition-colors shadow-xs"
                      />
                    </div>
                  )}
                </div>

                {/* 2. HOVER VIDEO (Plays on card hover) */}
                <div className="md:col-span-4 rounded-2xl border-2 border-dashed border-neutral-300 hover:border-purple-500/80 bg-neutral-50/70 hover:bg-purple-50/20 p-5 flex flex-col justify-between text-center transition-all relative overflow-hidden min-h-[220px]">
                  <input
                    ref={videoInputRef}
                    type="file"
                    accept="video/mp4,video/webm"
                    onChange={handleVideoFileSelect}
                    className="hidden"
                  />

                  <div className="w-full">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-bold text-neutral-800 uppercase tracking-wider flex items-center gap-1.5">
                        <Film className="w-3.5 h-3.5 text-purple-600" />
                        <span>Hover Video</span>
                      </span>
                      {videoSrc && (
                        <span className="text-[10px] font-mono text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded border border-purple-200">
                          Hover Active
                        </span>
                      )}
                    </div>

                    {previewYoutubeId ? (
                      <div className="space-y-2">
                        <div className="aspect-video w-full rounded-xl overflow-hidden bg-black shadow-xs">
                          <iframe
                            className="w-full h-full"
                            src={`https://www.youtube-nocookie.com/embed/${previewYoutubeId}?rel=0`}
                            title="Preview"
                            frameBorder="0"
                            allowFullScreen
                          />
                        </div>
                        <div className="flex items-center justify-between text-xs font-mono pt-1">
                          <span className="text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200 text-[10px]">
                            YouTube Link
                          </span>
                          <button
                            type="button"
                            onClick={() => setVideoSrc('')}
                            className="text-rose-600 hover:underline cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ) : videoSrc ? (
                      <div className="space-y-2">
                        <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-neutral-900 border border-neutral-200 flex items-center justify-center">
                          <video src={videoSrc} controls muted className="w-full h-full object-cover" />
                        </div>
                        <div className="flex items-center justify-between text-xs font-mono pt-1">
                          <button
                            type="button"
                            onClick={() => videoInputRef.current?.click()}
                            className="text-purple-600 hover:underline cursor-pointer font-semibold"
                          >
                            Replace Video
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setVideoSrc('');
                              setVideoFile(null);
                            }}
                            className="text-rose-600 hover:underline cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        onClick={() => videoInputRef.current?.click()}
                        className="cursor-pointer space-y-1.5 flex flex-col items-center group py-4"
                      >
                        <div className="w-10 h-10 rounded-xl bg-white group-hover:bg-purple-50 border border-neutral-200 group-hover:border-purple-300 flex items-center justify-center text-neutral-500 group-hover:text-purple-600 transition-colors shadow-xs">
                          <Play className="w-5 h-5 text-purple-600" />
                        </div>
                        <p className="text-xs font-bold text-neutral-900 group-hover:text-purple-700 transition-colors">
                          Upload Hover Video
                        </p>
                        <p className="text-[11px] text-neutral-500 font-mono">
                          Plays when user hovers card
                        </p>
                      </div>
                    )}
                  </div>

                  {!videoSrc && (
                    <div className="w-full pt-2 mt-2 border-t border-neutral-200/60">
                      <input
                        type="text"
                        value={videoSrc}
                        onChange={(e) => setVideoSrc(e.target.value)}
                        placeholder="Or paste video/YouTube URL..."
                        className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-neutral-200 text-[11px] font-mono text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-purple-500 transition-colors shadow-xs"
                      />
                    </div>
                  )}
                </div>

                {/* 3. SEO ALT TEXT & SUBTITLE */}
                <div className="md:col-span-4 rounded-2xl border border-neutral-200/90 bg-white p-5 flex flex-col justify-between shadow-xs min-h-[220px]">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 font-bold">
                        SEO Alt Text &amp; Subtitle
                      </label>
                      <span className="text-[10px] font-mono text-brand-600 bg-brand-50 px-1.5 py-0.5 rounded border border-brand-200">
                        Required
                      </span>
                    </div>
                    <textarea
                      rows={4}
                      value={subtitle}
                      onChange={(e) => setSubtitle(e.target.value)}
                      placeholder="Describe this article premise and image for SEO and accessibility (min 3 words)..."
                      className="w-full p-3 rounded-xl bg-neutral-50 border border-neutral-200 text-xs font-sans text-neutral-800 placeholder:text-neutral-400 outline-none focus:bg-white focus:border-brand-500 resize-none transition-colors"
                    />
                  </div>
                  <span className="text-[10px] text-neutral-400 font-mono mt-2 block">
                    Displays as the article narrative premise &amp; SEO meta
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
