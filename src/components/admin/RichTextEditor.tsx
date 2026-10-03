'use client';

import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from 'react';
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
} from 'lucide-react';
import { getYoutubeId } from './MediaUploader';

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

export interface RichTextEditorHandle {
  exec: (command: string, val?: string | null) => void;
  formatBlock: (tag: 'h1' | 'h2' | 'h3' | 'p' | 'blockquote' | 'pre') => void;
  openImageModal: () => void;
  openYoutubeModal: () => void;
  openLinkModal: () => void;
  activeFormats: { [key: string]: boolean };
  wordCount: number;
  readingTime: string;
}

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  onRegisterPendingFile?: (blobUrl: string, file: File) => void;
  placeholder?: string;
  minHeight?: string;
  hideToolbar?: boolean;
}

const RichTextEditor = forwardRef<RichTextEditorHandle, RichTextEditorProps>(
  function RichTextEditor(
    {
      value,
      onChange,
      onRegisterPendingFile,
      placeholder = 'Start writing your blog content here... Use headings, bullet lists, bold text, images or embeds.',
      minHeight = '420px',
      hideToolbar = false,
    },
    ref
  ) {
    const editorRef = useRef<HTMLDivElement>(null);
    const savedRangeRef = useRef<Range | null>(null);

    const [activeFormats, setActiveFormats] = useState<{ [key: string]: boolean }>({});
    const [wordCount, setWordCount] = useState(0);
    const [readingTime, setReadingTime] = useState('1 min read');

    // Insert Image Modal State
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imageCaption, setImageCaption] = useState('');
    const imageInputRef = useRef<HTMLInputElement>(null);

    // Insert YouTube Video Modal State
    const [isYoutubeModalOpen, setIsYoutubeModalOpen] = useState(false);
    const [youtubeUrl, setYoutubeUrl] = useState('');
    const [youtubeCaption, setYoutubeCaption] = useState('');

    // Insert Link Modal State
    const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
    const [linkUrl, setLinkUrl] = useState('');
    const [linkText, setLinkText] = useState('');

    // 1. Synchronize external value with contentEditable innerHTML
    useEffect(() => {
      if (editorRef.current && editorRef.current.innerHTML !== (value || '')) {
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

    // Save selection range
    const saveSelection = useCallback(() => {
      if (typeof window === 'undefined') return;
      const sel = window.getSelection();
      if (sel && sel.rangeCount > 0 && editorRef.current) {
        const range = sel.getRangeAt(0);
        if (editorRef.current.contains(range.commonAncestorContainer)) {
          savedRangeRef.current = range.cloneRange();
        }
      }
    }, []);

    // Restore selection range
    const restoreSelection = useCallback(() => {
      if (typeof window === 'undefined') return;
      const sel = window.getSelection();
      if (sel && savedRangeRef.current && editorRef.current) {
        sel.removeAllRanges();
        sel.addRange(savedRangeRef.current);
      }
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

    const handleInput = useCallback(() => {
      if (editorRef.current) {
        const html = editorRef.current.innerHTML;
        onChange(html);
        updateWordCount(html);
        checkActiveFormats();
        saveSelection();
      }
    }, [onChange, updateWordCount, checkActiveFormats, saveSelection]);

    // Execute standard command
    const exec = useCallback(
      (command: string, val: string | null = null) => {
        if (typeof document === 'undefined') return;
        editorRef.current?.focus();
        restoreSelection();
        document.execCommand(command, false, val ?? undefined);
        handleInput();
      },
      [restoreSelection, handleInput]
    );

    // Format block (H1, H2, H3, P, Quote, Pre)
    const formatBlock = useCallback(
      (tag: 'h1' | 'h2' | 'h3' | 'p' | 'blockquote' | 'pre') => {
        if (typeof document === 'undefined') return;
        editorRef.current?.focus();
        restoreSelection();

        let success = false;
        try {
          success = document.execCommand('formatBlock', false, `<${tag.toUpperCase()}>`);
        } catch {}
        if (!success) {
          try {
            success = document.execCommand('formatBlock', false, `<${tag}>`);
          } catch {}
        }
        if (!success) {
          try {
            document.execCommand('formatBlock', false, tag);
          } catch {}
        }

        handleInput();
      },
      [restoreSelection, handleInput]
    );

    // Open Image Modal
    const openImageModal = useCallback(() => {
      saveSelection();
      setImageUrl('');
      setImageFile(null);
      setImageCaption('');
      setIsImageModalOpen(true);
    }, [saveSelection]);

    // Open YouTube Modal
    const openYoutubeModal = useCallback(() => {
      saveSelection();
      setYoutubeUrl('');
      setYoutubeCaption('');
      setIsYoutubeModalOpen(true);
    }, [saveSelection]);

    // Open Link Modal
    const openLinkModal = useCallback(() => {
      saveSelection();
      const sel = window.getSelection();
      if (sel && sel.toString().trim()) {
        setLinkText(sel.toString().trim());
      } else {
        setLinkText('');
      }
      setLinkUrl('');
      setIsLinkModalOpen(true);
    }, [saveSelection]);

    // Expose handle for external toolbar integration
    useImperativeHandle(
      ref,
      () => ({
        exec,
        formatBlock,
        openImageModal,
        openYoutubeModal,
        openLinkModal,
        activeFormats,
        wordCount,
        readingTime,
      }),
      [
        exec,
        formatBlock,
        openImageModal,
        openYoutubeModal,
        openLinkModal,
        activeFormats,
        wordCount,
        readingTime,
      ]
    );

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'b' || e.key === 'B') {
          e.preventDefault();
          exec('bold');
        } else if (e.key === 'i' || e.key === 'I') {
          e.preventDefault();
          exec('italic');
        } else if (e.key === 'u' || e.key === 'U') {
          e.preventDefault();
          exec('underline');
        } else if (e.key === 'z' || e.key === 'Z') {
          if (e.shiftKey) {
            e.preventDefault();
            exec('redo');
          } else {
            e.preventDefault();
            exec('undo');
          }
        } else if (e.key === 'y' || e.key === 'Y') {
          e.preventDefault();
          exec('redo');
        }
      }
    };

    const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        setImageFile(file);
        const preview = URL.createObjectURL(file);
        setImageUrl(preview);
      }
    };

    const handleInsertImage = () => {
      if (!imageUrl) return;

      if (imageFile && imageUrl.startsWith('blob:') && onRegisterPendingFile) {
        onRegisterPendingFile(imageUrl, imageFile);
      }

      const captionHtml = imageCaption.trim()
        ? `<figcaption class="text-center text-xs font-mono text-neutral-500 mt-2 italic">${imageCaption.trim()}</figcaption>`
        : '';

      const figureHtml = `
        <figure class="my-6 rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-50 p-2 shadow-xs">
          <img src="${imageUrl}" alt="${imageCaption.trim() || 'Article figure'}" class="w-full h-auto rounded-xl object-cover" />
          ${captionHtml}
        </figure>
        <p><br></p>
      `;

      editorRef.current?.focus();
      restoreSelection();
      document.execCommand('insertHTML', false, figureHtml);
      handleInput();

      setImageUrl('');
      setImageFile(null);
      setImageCaption('');
      setIsImageModalOpen(false);
    };

    const handleInsertYoutube = () => {
      const videoId = getYoutubeId(youtubeUrl);
      if (!videoId) {
        alert('Please enter a valid YouTube video URL');
        return;
      }

      const captionHtml = youtubeCaption.trim()
        ? `<figcaption class="text-center text-xs font-mono text-neutral-500 mt-2 italic">${youtubeCaption.trim()}</figcaption>`
        : '';

      const videoEmbedHtml = `
        <figure class="my-6 rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-900 p-2 shadow-md">
          <div class="aspect-video w-full rounded-xl overflow-hidden">
            <iframe 
              class="w-full h-full"
              src="https://www.youtube-nocookie.com/embed/${videoId}?rel=0" 
              title="${youtubeCaption.trim() || 'YouTube Video Player'}"
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

      editorRef.current?.focus();
      restoreSelection();
      document.execCommand('insertHTML', false, videoEmbedHtml);
      handleInput();

      setYoutubeUrl('');
      setYoutubeCaption('');
      setIsYoutubeModalOpen(false);
    };

    const handleInsertLink = () => {
      if (!linkUrl) return;
      editorRef.current?.focus();
      restoreSelection();

      if (linkText) {
        const cleanUrl =
          linkUrl.startsWith('http://') ||
          linkUrl.startsWith('https://') ||
          linkUrl.startsWith('/')
            ? linkUrl
            : `https://${linkUrl}`;
        const linkHtml = `<a href="${cleanUrl}" target="_blank" rel="noopener noreferrer" class="text-brand-600 hover:text-brand-700 underline font-medium">${linkText}</a>`;
        document.execCommand('insertHTML', false, linkHtml);
      } else {
        document.execCommand('createLink', false, linkUrl);
      }

      handleInput();
      setLinkUrl('');
      setLinkText('');
      setIsLinkModalOpen(false);
    };

    const previewYoutubeId = getYoutubeId(youtubeUrl);

    return (
      <div className="w-full flex flex-col">
        {/* Optional Inline Ribbon if not hidden */}
        {!hideToolbar && (
          <div className="p-2 sm:p-2.5 bg-neutral-100/90 border-b border-neutral-200/90 flex flex-wrap items-center gap-1 sm:gap-1.5 text-neutral-700 select-none rounded-t-2xl">
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => formatBlock('p')}
              className="px-2 py-1.5 rounded-lg hover:bg-neutral-200/80 text-xs font-mono cursor-pointer"
            >
              <Pilcrow className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => formatBlock('h1')}
              className="px-2 py-1.5 rounded-lg hover:bg-neutral-200/80 text-xs font-display font-bold cursor-pointer"
            >
              H1
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => formatBlock('h2')}
              className="px-2 py-1.5 rounded-lg hover:bg-neutral-200/80 text-xs font-display font-bold cursor-pointer"
            >
              H2
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => formatBlock('h3')}
              className="px-2 py-1.5 rounded-lg hover:bg-neutral-200/80 text-xs font-display font-bold cursor-pointer"
            >
              H3
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => exec('bold')}
              className="p-1.5 rounded-lg hover:bg-neutral-200/80 cursor-pointer"
            >
              <Bold className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => exec('italic')}
              className="p-1.5 rounded-lg hover:bg-neutral-200/80 cursor-pointer"
            >
              <Italic className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => exec('insertUnorderedList')}
              className="p-1.5 rounded-lg hover:bg-neutral-200/80 cursor-pointer"
            >
              <List className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => exec('insertOrderedList')}
              className="p-1.5 rounded-lg hover:bg-neutral-200/80 cursor-pointer"
            >
              <ListOrdered className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={openImageModal}
              className="p-1.5 rounded-lg hover:bg-neutral-200/80 cursor-pointer text-brand-600"
            >
              <ImageIcon className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={openYoutubeModal}
              className="p-1.5 rounded-lg hover:bg-neutral-200/80 cursor-pointer text-rose-600"
            >
              <YoutubeIcon className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={openLinkModal}
              className="p-1.5 rounded-lg hover:bg-neutral-200/80 cursor-pointer text-blue-600"
            >
              <LinkIcon className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* ContentEditable Canvas Area */}
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={handleInput}
          onKeyUp={() => {
            checkActiveFormats();
            saveSelection();
          }}
          onMouseUp={() => {
            checkActiveFormats();
            saveSelection();
          }}
          onBlur={saveSelection}
          onKeyDown={handleKeyDown}
          data-placeholder={placeholder}
          style={{ minHeight }}
          className="rich-editor-content outline-none text-neutral-900 text-base sm:text-lg leading-relaxed font-sans w-full"
        />

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
                    Choose Image File or Paste URL:
                  </label>
                  <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/svg+xml,image/avif"
                    onChange={handleImageFileChange}
                    className="hidden"
                  />

                  {imageUrl ? (
                    <div className="relative rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-50 p-2 space-y-2">
                      <div className="relative max-h-56 min-h-28 flex items-center justify-center overflow-hidden rounded-xl bg-neutral-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={imageUrl}
                          alt="Preview"
                          className="max-h-52 w-auto object-contain rounded-lg"
                        />
                      </div>
                      <div className="flex items-center justify-between gap-2 pt-1">
                        <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold">
                          Preview ready
                        </span>
                        <button
                          type="button"
                          onClick={() => imageInputRef.current?.click()}
                          className="text-xs font-mono text-brand-600 hover:underline cursor-pointer"
                        >
                          Change Image
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => imageInputRef.current?.click()}
                      className="p-6 rounded-2xl border-2 border-dashed border-neutral-300 hover:border-brand-500 bg-neutral-50 hover:bg-brand-50/20 text-center cursor-pointer transition-colors"
                    >
                      <Upload className="w-6 h-6 text-brand-600 mx-auto mb-2" />
                      <p className="text-xs font-semibold text-neutral-900">
                        Click to choose image file
                      </p>
                      <p className="text-[11px] text-neutral-500 font-mono mt-0.5">
                        WebP, PNG, JPG, SVG (Instant preview)
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-1">
                    Or Direct Image URL:
                  </label>
                  <input
                    type="text"
                    placeholder="https://example.com/diagram.png"
                    value={imageUrl.startsWith('blob:') ? '' : imageUrl}
                    onChange={(e) => {
                      setImageUrl(e.target.value);
                      setImageFile(null);
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 text-xs font-mono placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:border-brand-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-1 font-semibold">
                    Caption / Figure Label (Optional):
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Figure 1: Architecture breakdown"
                    value={imageCaption}
                    onChange={(e) => setImageCaption(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 text-xs font-sans placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:border-brand-500 transition-colors"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-100">
                  <button
                    type="button"
                    onClick={() => setIsImageModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200/80 text-neutral-700 text-xs font-mono uppercase cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleInsertImage}
                    disabled={!imageUrl}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-500 hover:to-brand-600 disabled:opacity-40 text-white text-xs font-mono uppercase font-bold transition-all cursor-pointer shadow-xs"
                  >
                    Insert Image
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─── INSERT YOUTUBE VIDEO MODAL ─── */}
        {isYoutubeModalOpen && (
          <div className="fixed inset-0 z-50 bg-neutral-900/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-lg rounded-3xl bg-white border border-neutral-200 p-6 sm:p-8 shadow-2xl text-neutral-900">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-100 mb-5">
                <div className="flex items-center gap-2 text-rose-700 font-display font-bold text-sm">
                  <YoutubeIcon className="w-5 h-5 text-rose-600" />
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
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-2 font-semibold">
                    YouTube Video URL:
                  </label>
                  <input
                    type="text"
                    placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..."
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 text-xs font-mono placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:border-rose-500 transition-colors"
                  />
                </div>

                {previewYoutubeId && (
                  <div className="rounded-2xl overflow-hidden border border-neutral-200 shadow-xs bg-black">
                    <div className="aspect-video w-full">
                      <iframe
                        className="w-full h-full"
                        src={`https://www.youtube-nocookie.com/embed/${previewYoutubeId}?rel=0`}
                        title="YouTube Preview"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-1.5 font-semibold">
                    Optional Video Caption:
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Demonstration of real-time multi-agent negotiation"
                    value={youtubeCaption}
                    onChange={(e) => setYoutubeCaption(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 text-xs font-sans placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:border-rose-500 transition-colors"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-100">
                  <button
                    type="button"
                    onClick={() => setIsYoutubeModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200/80 text-neutral-700 text-xs font-mono uppercase cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleInsertYoutube}
                    disabled={!previewYoutubeId}
                    className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-40 text-white text-xs font-mono uppercase font-bold transition-all cursor-pointer shadow-xs"
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
              <div className="flex items-center justify-between pb-4 border-b border-neutral-100 mb-5">
                <div className="flex items-center gap-2 text-blue-700 font-display font-bold text-sm">
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
                    Destination URL:
                  </label>
                  <input
                    type="text"
                    placeholder="https://example.com/spec or /solutions/ai-intelligent-systems"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 text-xs font-mono placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-1.5 font-semibold">
                    Display Text (Optional):
                  </label>
                  <input
                    type="text"
                    placeholder="Clickable link label"
                    value={linkText}
                    onChange={(e) => setLinkText(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 text-xs font-sans placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-100">
                  <button
                    type="button"
                    onClick={() => setIsLinkModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200/80 text-neutral-700 text-xs font-mono uppercase cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleInsertLink}
                    disabled={!linkUrl}
                    className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white text-xs font-mono uppercase font-bold transition-all cursor-pointer shadow-xs"
                  >
                    Apply Link
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

export default RichTextEditor;
