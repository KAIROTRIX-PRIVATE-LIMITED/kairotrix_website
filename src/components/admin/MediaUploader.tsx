'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Upload,
  X,
  Check,
  AlertCircle,
  Film,
  Image as ImageIcon,
  Copy,
  ExternalLink,
  Loader2,
  Sparkles,
} from 'lucide-react';

interface MediaUploaderProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  onFileSelect?: (file: File | null, previewUrl: string) => void;
  mode?: 'instant-upload' | 'preview-first';
  folder?: string;
  accept?: 'image' | 'video' | 'both';
  placeholder?: string;
  helperText?: string;
}

// Helper to extract YouTube video ID
export function getYoutubeId(url: string): string | null {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i
  );
  return match ? match[1] : null;
}

export default function MediaUploader({
  label,
  value,
  onChange,
  onFileSelect,
  mode = 'preview-first',
  folder = 'kairotrix/general',
  accept = 'both',
  placeholder = 'https://... or paste YouTube / Image URL or click upload',
  helperText,
}: MediaUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const acceptedTypes =
    accept === 'video'
      ? 'video/mp4,video/webm,video/quicktime'
      : accept === 'image'
      ? 'image/png,image/jpeg,image/webp,image/svg+xml,image/avif'
      : 'image/*,video/*';

  const youtubeId = getYoutubeId(value);
  const isBlob = value && value.startsWith('blob:');

  const isVideo =
    !youtubeId &&
    value &&
    (value.endsWith('.mp4') ||
      value.endsWith('.webm') ||
      value.endsWith('.mov') ||
      value.includes('/video/upload/') ||
      (isBlob && accept === 'video'));

  const isImage =
    !youtubeId &&
    !isVideo &&
    value &&
    (value.endsWith('.png') ||
      value.endsWith('.jpg') ||
      value.endsWith('.jpeg') ||
      value.endsWith('.webp') ||
      value.endsWith('.svg') ||
      value.includes('/image/upload/') ||
      isBlob);

  const handleFile = async (file: File) => {
    setError(null);

    const isVideoFile = file.type.startsWith('video/');
    const maxSize = isVideoFile ? 100 * 1024 * 1024 : 15 * 1024 * 1024;
    if (file.size > maxSize) {
      setError(`File is too large. Maximum size is ${isVideoFile ? '100MB' : '15MB'}.`);
      return;
    }

    if (mode === 'preview-first') {
      // Create instantaneous local preview object URL (0ms latency, zero premature cloud uploads)
      const previewUrl = URL.createObjectURL(file);
      onChange(previewUrl);
      if (onFileSelect) {
        onFileSelect(file, previewUrl);
      }
      return;
    }

    // Instant-upload mode (fallback for direct immediate cloud push)
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      onChange(data.url);
      if (onFileSelect) {
        onFileSelect(file, data.url);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Upload failed. Please try again.';
      setError(msg);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleCopy = () => {
    if (!value) return;
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRemove = () => {
    if (value && value.startsWith('blob:')) {
      URL.revokeObjectURL(value);
    }
    onChange('');
    if (onFileSelect) {
      onFileSelect(null, '');
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      {/* Label + Mode Indicator */}
      <div className="flex items-center justify-between">
        <label className="block text-neutral-700 font-mono text-xs uppercase tracking-wider font-semibold">
          {label}
        </label>
        {isBlob ? (
          <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Local Preview (Uploads on Publish)
          </span>
        ) : youtubeId ? (
          <span className="text-[10px] font-mono text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 font-semibold">
            YouTube Embed
          </span>
        ) : value && value.includes('cloudinary.com') ? (
          <span className="text-[10px] font-mono text-brand-700 bg-brand-50 px-2 py-0.5 rounded border border-brand-200 font-semibold">
            Cloudinary CDN
          </span>
        ) : null}
      </div>

      {/* Upload Zone / Media Chamber */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`relative rounded-2xl border transition-all duration-200 overflow-hidden ${
          isDragging
            ? 'border-brand-500 bg-brand-50/50 shadow-xs'
            : value
            ? 'border-neutral-200 bg-neutral-50/80'
            : 'border-dashed border-neutral-300 hover:border-brand-500/60 bg-neutral-50/70 hover:bg-brand-50/20'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedTypes}
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              handleFile(e.target.files[0]);
            }
          }}
          className="hidden"
        />

        {/* Loading Overlay */}
        {isUploading && (
          <div className="absolute inset-0 z-30 bg-white/85 backdrop-blur-xs flex flex-col items-center justify-center gap-2 text-neutral-900">
            <Loader2 className="w-6 h-6 animate-spin text-brand-600" />
            <span className="text-xs font-mono text-neutral-700 font-semibold">
              Uploading media to Cloudinary CDN...
            </span>
          </div>
        )}

        {/* Existing Media Preview */}
        {value && !isUploading ? (
          <div className="p-4 space-y-3">
            {/* Visual Preview */}
            <div className="relative rounded-xl overflow-hidden bg-neutral-950/5 border border-neutral-200 flex items-center justify-center min-h-[140px] max-h-[300px]">
              {youtubeId ? (
                <div className="aspect-video w-full rounded-xl overflow-hidden shadow-xs">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0`}
                    title="YouTube Video Preview"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : isVideo ? (
                <video
                  src={value}
                  controls
                  playsInline
                  className="max-h-[260px] w-full object-contain rounded-lg"
                />
              ) : isImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={value}
                  alt="Asset Preview"
                  className="max-h-[260px] w-auto object-contain rounded-lg p-1.5"
                />
              ) : (
                <div className="py-8 flex items-center gap-2 text-neutral-600 text-xs font-mono">
                  <ExternalLink className="w-4 h-4 text-brand-600" />
                  <span className="truncate max-w-md">Media Source: {value}</span>
                </div>
              )}
            </div>

            {/* URL Input Bar with Actions */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={value}
                onChange={(e) => {
                  onChange(e.target.value);
                  if (onFileSelect) onFileSelect(null, e.target.value);
                }}
                placeholder={placeholder}
                className="flex-1 px-3 py-2 bg-white border border-neutral-200 rounded-xl text-neutral-900 text-xs font-mono focus:border-brand-500 focus:outline-none"
              />

              {!isBlob && (
                <button
                  type="button"
                  onClick={handleCopy}
                  title="Copy URL"
                  className="p-2 rounded-xl bg-white border border-neutral-200 hover:bg-neutral-100 text-neutral-700 transition-colors shadow-xs cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              )}

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                title="Replace Media"
                className="px-3 py-2 rounded-xl bg-brand-50 hover:bg-brand-100 text-brand-700 border border-brand-200 text-xs font-mono font-semibold transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Upload className="w-3 h-3" />
                <span>Replace</span>
              </button>

              <button
                type="button"
                onClick={handleRemove}
                title="Remove Media"
                className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition-colors shadow-xs cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          /* Empty Drag-and-Drop Area */
          <div
            onClick={() => fileInputRef.current?.click()}
            className="p-8 flex flex-col items-center justify-center text-center cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-white group-hover:bg-brand-50 border border-neutral-200 group-hover:border-brand-300 flex items-center justify-center text-neutral-500 group-hover:text-brand-600 transition-colors mb-3 shadow-xs">
              {accept === 'video' ? (
                <Film className="w-6 h-6" />
              ) : accept === 'image' ? (
                <ImageIcon className="w-6 h-6" />
              ) : (
                <Upload className="w-6 h-6" />
              )}
            </div>

            <p className="text-sm font-medium text-neutral-900 mb-1">
              <span className="text-brand-600 font-semibold underline decoration-brand-400/50 underline-offset-2">
                Click to upload
              </span>{' '}
              or drag &amp; drop
            </p>

            <p className="text-xs text-neutral-500 font-mono">
              {accept === 'video'
                ? 'MP4, WebM (up to 100MB)'
                : accept === 'image'
                ? 'WebP, PNG, JPG, SVG (up to 15MB)'
                : 'Images (WebP, PNG, JPG) or Videos (MP4)'}
            </p>

            {/* Direct URL paste hint */}
            <div className="mt-4 pt-3 border-t border-neutral-200/60 w-full max-w-sm text-center">
              <span className="text-[11px] text-neutral-400 font-mono">
                or paste a direct image, video, or YouTube URL below
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Manual URL input when empty */}
      {!value && !isUploading && (
        <input
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            if (onFileSelect) onFileSelect(null, e.target.value);
          }}
          placeholder={placeholder}
          className="w-full px-3.5 py-2.5 bg-white border border-neutral-200 rounded-xl text-neutral-900 text-xs font-mono placeholder:text-neutral-400 focus:border-brand-500 focus:outline-none shadow-xs transition-colors"
        />
      )}

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-mono">
          <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-600" />
          <span>{error}</span>
        </div>
      )}

      {/* Helper text */}
      {helperText && <p className="text-[11px] text-neutral-500 font-mono">{helperText}</p>}
    </div>
  );
}
