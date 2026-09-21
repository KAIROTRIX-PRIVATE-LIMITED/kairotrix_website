'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
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
  Image as ImageIcon,
  Link as LinkIcon,
  Unlink,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo,
  RemoveFormatting,
  X,
  Upload,
  Check,
  AlertCircle,
} from 'lucide-react';
import MediaUploader from '@/components/admin/MediaUploader';

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

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: string;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = 'Write your technical article here... (Use H1, H2, H3, images, code blocks, or embed YouTube videos)',
  minHeight = '420px',
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [activeFormats, setActiveFormats] = useState<{ [key: string]: boolean }>({});
  const [wordCount, setWordCount] = useState(0);
  const [readingTime, setReadingTime] = useState('1 min read');

  // Insert Image Modal State
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imageCaption, setImageCaption] = useState('');

  // Insert YouTube Video Modal State
  const [isYoutubeModalOpen, setIsYoutubeModalOpen] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [youtubeCaption, setYoutubeCaption] = useState('');

  // Insert Link Modal State
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');

  // Initialize editor content once
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || '';
      updateWordCount(value || '');
    }
  }, [value]);

  const updateWordCount = useCallback((html: string) => {
    const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    const words = text ? text.split(/\s+/).length : 0;
    setWordCount(words);
    const readMin = Math.max(1, Math.ceil(words / 200));
    setReadingTime(`${readMin} min read`);
  }, []);

  const checkActiveFormats = useCallback(() => {
    if (typeof document === 'undefined') return;
    try {
      setActiveFormats({
        bold: document.queryCommandState('bold'),
        italic: document.queryCommandState('italic'),
        underline: document.queryCommandState('underline'),
        strikeThrough: document.queryCommandState('strikeThrough'),
        insertUnorderedList: document.queryCommandState('insertUnorderedList'),
        insertOrderedList: document.queryCommandState('insertOrderedList'),
        justifyLeft: document.queryCommandState('justifyLeft'),
        justifyCenter: document.queryCommandState('justifyCenter'),
        justifyRight: document.queryCommandState('justifyRight'),
      });
    } catch {
      // ignore
    }
  }, []);

  const exec = (command: string, val: string | null = null) => {
    if (typeof document === 'undefined') return;
    document.execCommand(command, false, val ?? undefined);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
      updateWordCount(editorRef.current.innerHTML);
    }
    checkActiveFormats();
  };

  const formatBlock = (tag: string) => {
    if (typeof document === 'undefined') return;
    document.execCommand('formatBlock', false, tag);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
      updateWordCount(editorRef.current.innerHTML);
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      onChange(html);
      updateWordCount(html);
      checkActiveFormats();
    }
  };

  // Helper to extract YouTube video ID
  const extractYoutubeId = (url: string): string | null => {
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
    return match ? match[1] : null;
  };

  // Insert Image into Editor HTML
  const handleInsertImage = () => {
    if (!imageUrl) return;
    const captionHtml = imageCaption
      ? `<figcaption class="text-center text-xs font-mono text-neutral-500 mt-2 italic">${imageCaption}</figcaption>`
      : '';
    const figureHtml = `
      <figure class="my-8 rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-50 p-2 shadow-xs">
        <img src="${imageUrl}" alt="${imageCaption || 'Article figure'}" class="w-full h-auto rounded-xl object-cover" />
        ${captionHtml}
      </figure>
      <p><br></p>
    `;

    exec('insertHTML', figureHtml);
    setImageUrl('');
    setImageCaption('');
    setIsImageModalOpen(false);
  };

  // Insert YouTube Video into Editor HTML
  const handleInsertYoutube = () => {
    const videoId = extractYoutubeId(youtubeUrl);
    if (!videoId) {
      alert('Please enter a valid YouTube video URL.');
      return;
    }

    const captionHtml = youtubeCaption
      ? `<figcaption class="text-center text-xs font-mono text-neutral-500 mt-2">${youtubeCaption}</figcaption>`
      : '';

    const videoEmbedHtml = `
      <figure class="my-8 rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-900 p-2 shadow-md">
        <div class="aspect-video w-full rounded-xl overflow-hidden">
          <iframe 
            class="w-full h-full"
            src="https://www.youtube-nocookie.com/embed/${videoId}?rel=0" 
            title="${youtubeCaption || 'YouTube Video Player'}"
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerpolicy="strict-origin-when-cross-origin" 
            allowfullscreen
          ></iframe>
        </div>
        ${captionHtml}
      </figure>
      <p><br></p>
    `;

    exec('insertHTML', videoEmbedHtml);
    setYoutubeUrl('');
    setYoutubeCaption('');
    setIsYoutubeModalOpen(false);
  };

  // Insert Hyperlink
  const handleInsertLink = () => {
    if (!linkUrl) return;
    if (linkText) {
      const linkHtml = `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer" class="text-brand-600 hover:text-brand-700 underline font-medium">${linkText}</a>`;
      exec('insertHTML', linkHtml);
    } else {
      exec('createLink', linkUrl);
    }
    setLinkUrl('');
    setLinkText('');
    setIsLinkModalOpen(false);
  };

  return (
    <div className="w-full rounded-2xl bg-white border border-neutral-200/80 shadow-xs overflow-hidden flex flex-col">
      {/* ─── 1. FIXED WORD-STYLE FORMATTING RIBBON ─── */}
      <div className="p-2 sm:p-2.5 bg-neutral-100/90 border-b border-neutral-200 flex flex-wrap items-center gap-1 sm:gap-1.5 text-neutral-700 select-none sticky top-0 z-20 backdrop-blur-md">
        {/* Headings Dropdown */}
        <div className="flex items-center gap-1 pr-2 border-r border-neutral-200">
          <button
            type="button"
            title="Normal Paragraph"
            onClick={() => formatBlock('p')}
            className="px-2 py-1 rounded hover:bg-neutral-200/70 text-xs font-mono font-medium flex items-center gap-1 cursor-pointer transition-colors"
          >
            <Pilcrow className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">P</span>
          </button>
          <button
            type="button"
            title="Heading 1 (Main Section)"
            onClick={() => formatBlock('h1')}
            className="px-2 py-1 rounded hover:bg-neutral-200/70 text-xs font-display font-bold flex items-center gap-0.5 cursor-pointer text-brand-700 transition-colors"
          >
            <Heading1 className="w-3.5 h-3.5" />
            <span>H1</span>
          </button>
          <button
            type="button"
            title="Heading 2 (Subsection)"
            onClick={() => formatBlock('h2')}
            className="px-2 py-1 rounded hover:bg-neutral-200/70 text-xs font-display font-bold flex items-center gap-0.5 cursor-pointer text-purple-700 transition-colors"
          >
            <Heading2 className="w-3.5 h-3.5" />
            <span>H2</span>
          </button>
          <button
            type="button"
            title="Heading 3 (Minor Topic)"
            onClick={() => formatBlock('h3')}
            className="px-2 py-1 rounded hover:bg-neutral-200/70 text-xs font-display font-bold flex items-center gap-0.5 cursor-pointer text-indigo-700 transition-colors"
          >
            <Heading3 className="w-3.5 h-3.5" />
            <span>H3</span>
          </button>
        </div>

        {/* Text Style: Bold, Italic, Underline, Strike */}
        <div className="flex items-center gap-0.5 pr-2 border-r border-neutral-200">
          <button
            type="button"
            title="Bold (Ctrl+B)"
            onClick={() => exec('bold')}
            className={`p-1.5 rounded hover:bg-neutral-200/70 cursor-pointer transition-colors ${
              activeFormats.bold ? 'bg-brand-100 text-brand-800 font-bold' : ''
            }`}
          >
            <Bold className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            title="Italic (Ctrl+I)"
            onClick={() => exec('italic')}
            className={`p-1.5 rounded hover:bg-neutral-200/70 cursor-pointer transition-colors ${
              activeFormats.italic ? 'bg-brand-100 text-brand-800' : ''
            }`}
          >
            <Italic className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            title="Underline (Ctrl+U)"
            onClick={() => exec('underline')}
            className={`p-1.5 rounded hover:bg-neutral-200/70 cursor-pointer transition-colors ${
              activeFormats.underline ? 'bg-brand-100 text-brand-800' : ''
            }`}
          >
            <Underline className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            title="Strikethrough"
            onClick={() => exec('strikeThrough')}
            className={`p-1.5 rounded hover:bg-neutral-200/70 cursor-pointer transition-colors ${
              activeFormats.strikeThrough ? 'bg-brand-100 text-brand-800' : ''
            }`}
          >
            <Strikethrough className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Lists & Quotes */}
        <div className="flex items-center gap-0.5 pr-2 border-r border-neutral-200">
          <button
            type="button"
            title="Bullet List"
            onClick={() => exec('insertUnorderedList')}
            className={`p-1.5 rounded hover:bg-neutral-200/70 cursor-pointer transition-colors ${
              activeFormats.insertUnorderedList ? 'bg-brand-100 text-brand-800' : ''
            }`}
          >
            <List className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            title="Numbered List"
            onClick={() => exec('insertOrderedList')}
            className={`p-1.5 rounded hover:bg-neutral-200/70 cursor-pointer transition-colors ${
              activeFormats.insertOrderedList ? 'bg-brand-100 text-brand-800' : ''
            }`}
          >
            <ListOrdered className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            title="Blockquote Callout"
            onClick={() => formatBlock('blockquote')}
            className="p-1.5 rounded hover:bg-neutral-200/70 cursor-pointer transition-colors"
          >
            <Quote className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            title="Code Block"
            onClick={() => formatBlock('pre')}
            className="p-1.5 rounded hover:bg-neutral-200/70 cursor-pointer transition-colors"
          >
            <Code className="w-3.5 h-3.5 text-brand-700" />
          </button>
        </div>

        {/* Alignment */}
        <div className="hidden sm:flex items-center gap-0.5 pr-2 border-r border-neutral-200">
          <button
            type="button"
            title="Align Left"
            onClick={() => exec('justifyLeft')}
            className={`p-1.5 rounded hover:bg-neutral-200/70 cursor-pointer transition-colors ${
              activeFormats.justifyLeft ? 'bg-brand-100 text-brand-800' : ''
            }`}
          >
            <AlignLeft className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            title="Align Center"
            onClick={() => exec('justifyCenter')}
            className={`p-1.5 rounded hover:bg-neutral-200/70 cursor-pointer transition-colors ${
              activeFormats.justifyCenter ? 'bg-brand-100 text-brand-800' : ''
            }`}
          >
            <AlignCenter className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            title="Align Right"
            onClick={() => exec('justifyRight')}
            className={`p-1.5 rounded hover:bg-neutral-200/70 cursor-pointer transition-colors ${
              activeFormats.justifyRight ? 'bg-brand-100 text-brand-800' : ''
            }`}
          >
            <AlignRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Rich Media: Insert Image, Insert YouTube Video, Link */}
        <div className="flex items-center gap-1 pr-2 border-r border-neutral-200">
          <button
            type="button"
            title="Insert Image (Upload or URL)"
            onClick={() => setIsImageModalOpen(true)}
            className="px-2.5 py-1 rounded bg-white hover:bg-brand-50 hover:text-brand-700 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer border border-neutral-200 shadow-xs"
          >
            <ImageIcon className="w-3.5 h-3.5 text-brand-600" />
            <span className="hidden md:inline font-semibold">Image</span>
          </button>

          <button
            type="button"
            title="Insert YouTube Video (Paste Link)"
            onClick={() => setIsYoutubeModalOpen(true)}
            className="px-2.5 py-1 rounded bg-white hover:bg-red-50 hover:text-red-700 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer border border-neutral-200 shadow-xs"
          >
            <YoutubeIcon className="w-3.5 h-3.5 text-red-600" />
            <span className="hidden md:inline font-semibold">YouTube</span>
          </button>

          <button
            type="button"
            title="Insert Hyperlink"
            onClick={() => setIsLinkModalOpen(true)}
            className="p-1.5 rounded hover:bg-neutral-200/70 cursor-pointer transition-colors"
          >
            <LinkIcon className="w-3.5 h-3.5 text-blue-600" />
          </button>
          <button
            type="button"
            title="Remove Link"
            onClick={() => exec('unlink')}
            className="p-1.5 rounded hover:bg-neutral-200/70 cursor-pointer transition-colors"
          >
            <Unlink className="w-3.5 h-3.5 text-neutral-400" />
          </button>
        </div>

        {/* Utilities: Undo, Redo, Clear */}
        <div className="flex items-center gap-0.5 ml-auto">
          <button
            type="button"
            title="Undo"
            onClick={() => exec('undo')}
            className="p-1.5 rounded hover:bg-neutral-200/70 cursor-pointer text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            <Undo className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            title="Redo"
            onClick={() => exec('redo')}
            className="p-1.5 rounded hover:bg-neutral-200/70 cursor-pointer text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            <Redo className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            title="Clear Formatting"
            onClick={() => exec('removeFormat')}
            className="p-1.5 rounded hover:bg-neutral-200/70 cursor-pointer text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            <RemoveFormatting className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ─── 2. DOCUMENT CANVAS / PAPER ─── */}
      <div className="relative p-6 sm:p-10 flex-1 bg-white overflow-y-auto min-h-[420px]">
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={handleInput}
          onKeyUp={checkActiveFormats}
          onMouseUp={checkActiveFormats}
          data-placeholder={placeholder}
          style={{ minHeight }}
          className="rich-editor-content outline-none text-neutral-900 text-base sm:text-lg leading-relaxed font-sans
            prose prose-neutral max-w-none
            prose-headings:font-display prose-headings:font-bold prose-headings:text-neutral-950 prose-headings:tracking-tight
            prose-h1:text-2xl prose-h1:sm:text-3xl prose-h1:mt-8 prose-h1:mb-4 prose-h1:text-neutral-950
            prose-h2:text-xl prose-h2:sm:text-2xl prose-h2:mt-6 prose-h2:mb-3 prose-h2:text-neutral-900
            prose-h3:text-lg prose-h3:sm:text-xl prose-h3:mt-4 prose-h3:mb-2 prose-h3:text-neutral-800
            prose-p:text-neutral-700 prose-p:mb-4
            prose-blockquote:border-l-4 prose-blockquote:border-brand-500 prose-blockquote:bg-brand-50/60 prose-blockquote:py-3 prose-blockquote:px-5 prose-blockquote:rounded-r-xl prose-blockquote:italic prose-blockquote:text-neutral-800
            prose-pre:bg-neutral-900 prose-pre:border prose-pre:border-neutral-800 prose-pre:p-4 prose-pre:rounded-xl prose-pre:font-mono prose-pre:text-sm prose-pre:text-brand-300
            prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-1
            prose-ol:list-decimal prose-ol:pl-6 prose-ol:space-y-1"
        />
      </div>

      {/* ─── 3. BOTTOM WORD COUNT & READING TIME TICKER ─── */}
      <div className="px-4 py-2.5 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between text-[11px] font-mono text-neutral-500">
        <div className="flex items-center gap-4">
          <span className="font-semibold text-neutral-700">{wordCount} words</span>
          <span>•</span>
          <span className="font-semibold text-neutral-700">{readingTime}</span>
        </div>
        <span className="text-neutral-400 hidden sm:inline">
          Rich text editor • HTML formatted
        </span>
      </div>

      {/* ─── INSERT IMAGE MODAL ─── */}
      {isImageModalOpen && (
        <div className="fixed inset-0 z-50 bg-neutral-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white border border-neutral-200 p-6 sm:p-8 shadow-2xl text-neutral-900">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100 mb-5">
              <div className="flex items-center gap-2 text-brand-700 font-display font-bold text-sm">
                <ImageIcon className="w-4 h-4 text-brand-600" />
                <span>Insert Image into Article</span>
              </div>
              <button
                type="button"
                onClick={() => setIsImageModalOpen(false)}
                className="text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 p-1.5 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-2 font-semibold">
                  Upload or Select Image:
                </label>
                <MediaUploader
                  value={imageUrl}
                  onChange={(url) => setImageUrl(url)}
                  label="Upload Image via Cloudinary or URL"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-1.5 font-semibold">
                  Optional Caption / Alt Text:
                </label>
                <input
                  type="text"
                  placeholder="e.g. Multi-agent state machine architecture diagram"
                  value={imageCaption}
                  onChange={(e) => setImageCaption(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 text-xs font-sans placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:border-brand-500 transition-colors"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setIsImageModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200/70 text-neutral-700 text-xs font-mono uppercase cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleInsertImage}
                  disabled={!imageUrl}
                  className="px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:opacity-40 text-white text-xs font-mono uppercase font-bold transition-all cursor-pointer shadow-xs"
                >
                  Insert Image
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── INSERT YOUTUBE MODAL ─── */}
      {isYoutubeModalOpen && (
        <div className="fixed inset-0 z-50 bg-neutral-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white border border-neutral-200 p-6 sm:p-8 shadow-2xl text-neutral-900">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100 mb-5">
              <div className="flex items-center gap-2 text-red-600 font-display font-bold text-sm">
                <YoutubeIcon className="w-4 h-4 text-red-600" />
                <span>Embed YouTube Video</span>
              </div>
              <button
                type="button"
                onClick={() => setIsYoutubeModalOpen(false)}
                className="text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 p-1.5 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-1.5 font-semibold">
                  YouTube Video Link:
                </label>
                <input
                  type="url"
                  placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..."
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 text-xs font-mono placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:border-red-500 transition-colors"
                />
                <span className="text-[10px] text-neutral-500 mt-1 block">
                  Paste any public or unlisted YouTube video URL.
                </span>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-1.5 font-semibold">
                  Optional Video Caption / Title:
                </label>
                <input
                  type="text"
                  placeholder="e.g. End-to-end benchmark walkthrough and live telemetry demo"
                  value={youtubeCaption}
                  onChange={(e) => setYoutubeCaption(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 text-xs font-sans placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setIsYoutubeModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200/70 text-neutral-700 text-xs font-mono uppercase cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleInsertYoutube}
                  disabled={!youtubeUrl}
                  className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-40 text-white text-xs font-mono uppercase font-bold transition-all cursor-pointer shadow-xs"
                >
                  Embed Video
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── INSERT LINK MODAL ─── */}
      {isLinkModalOpen && (
        <div className="fixed inset-0 z-50 bg-neutral-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-white border border-neutral-200 p-6 sm:p-8 shadow-2xl text-neutral-900">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100 mb-4">
              <div className="flex items-center gap-2 text-blue-600 font-display font-bold text-sm">
                <LinkIcon className="w-4 h-4 text-blue-600" />
                <span>Insert Hyperlink</span>
              </div>
              <button
                type="button"
                onClick={() => setIsLinkModalOpen(false)}
                className="text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 p-1.5 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-1.5 font-semibold">
                  Link Destination (URL):
                </label>
                <input
                  type="url"
                  placeholder="https://example.com"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 text-xs font-mono placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-1.5 font-semibold">
                  Link Text (Optional if text selected):
                </label>
                <input
                  type="text"
                  placeholder="Click here"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 text-xs font-sans placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setIsLinkModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200/70 text-neutral-700 text-xs font-mono uppercase cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleInsertLink}
                  disabled={!linkUrl}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white text-xs font-mono uppercase font-bold transition-all cursor-pointer shadow-xs"
                >
                  Insert Link
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
