'use client';

import React, { useState, useRef } from 'react';
import { Upload, X, Check, AlertCircle, Film, Image as ImageIcon, Copy, ExternalLink, Loader2 } from 'lucide-react';

interface MediaUploaderProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  accept?: 'image' | 'video' | 'both';
  placeholder?: string;
  helperText?: string;
}

export default function MediaUploader({
  label,
  value,
  onChange,
  folder = 'kairotrix/general',
  accept = 'both',
  placeholder = 'https://res.cloudinary.com/... or /assets/...',
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

  const isVideo =
    value &&
    (value.endsWith('.mp4') ||
      value.endsWith('.webm') ||
      value.endsWith('.mov') ||
      value.includes('/video/upload/'));

  const isImage =
    value &&
    !isVideo &&
    (value.endsWith('.png') ||
      value.endsWith('.jpg') ||
      value.endsWith('.jpeg') ||
      value.endsWith('.webp') ||
      value.endsWith('.svg') ||
      value.includes('/image/upload/'));

  const handleFile = async (file: File) => {
    setError(null);

    // Validate size: 100MB max for video, 15MB max for image
    const isVideoFile = file.type.startsWith('video/');
    const maxSize = isVideoFile ? 100 * 1024 * 1024 : 15 * 1024 * 1024;
    if (file.size > maxSize) {
      setError(`File is too large. Maximum size is ${isVideoFile ? '100MB' : '15MB'}.`);
      return;
    }

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

  return (
    <div className="space-y-2">
      {/* Label + Mode Indicator */}
      <div className="flex items-center justify-between">
        <label className="block text-neutral-700 font-mono text-xs uppercase tracking-wider font-semibold">
          {label}
        </label>
        {value && value.includes('cloudinary.com') && (
          <span className="text-[10px] font-mono text-brand-700 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
            Cloudinary CDN
          </span>
        )}
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
            ? 'border-neutral-200 bg-neutral-50/60'
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
              Uploading to Cloudinary CDN...
            </span>
          </div>
        )}

        {/* Existing Media Preview */}
        {value && !isUploading ? (
          <div className="p-3 space-y-3">
            {/* Visual Preview */}
            <div className="relative rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200 flex items-center justify-center max-h-48 min-h-24">
              {isVideo ? (
                <video
                  src={value}
                  controls
                  playsInline
                  className="max-h-48 w-full object-contain rounded-lg"
                />
              ) : isImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={value}
                  alt="Asset Preview"
                  className="max-h-44 w-auto object-contain rounded-lg p-1"
                />
              ) : (
                <div className="py-6 flex items-center gap-2 text-neutral-500 text-xs font-mono">
                  <ExternalLink className="w-4 h-4" />
                  <span>External Media: {value}</span>
                </div>
              )}
            </div>

            {/* URL Input Bar with Actions */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="flex-1 px-3 py-2 bg-white border border-neutral-200 rounded-xl text-neutral-900 text-xs font-mono focus:border-brand-500 focus:outline-none"
              />

              <button
                type="button"
                onClick={handleCopy}
                title="Copy URL"
                className="p-2 rounded-xl bg-white border border-neutral-200 hover:bg-neutral-100 text-neutral-700 transition-colors shadow-xs cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                title="Replace Media"
                className="px-3 py-2 rounded-xl bg-brand-50 hover:bg-brand-100 text-brand-700 border border-brand-200 text-xs font-mono font-semibold transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Upload className="w-3 h-3" />
                Replace
              </button>

              <button
                type="button"
                onClick={() => onChange('')}
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
            className="p-6 flex flex-col items-center justify-center text-center cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-white group-hover:bg-brand-50 border border-neutral-200 group-hover:border-brand-300 flex items-center justify-center text-neutral-500 group-hover:text-brand-600 transition-colors mb-2 shadow-xs">
              {accept === 'video' ? (
                <Film className="w-5 h-5" />
              ) : accept === 'image' ? (
                <ImageIcon className="w-5 h-5" />
              ) : (
                <Upload className="w-5 h-5" />
              )}
            </div>

            <p className="text-xs font-medium text-neutral-900 mb-0.5">
              <span className="text-brand-600 font-semibold underline decoration-brand-400/50 underline-offset-2">
                Click to upload
              </span>{' '}
              or drag & drop
            </p>

            <p className="text-[11px] text-neutral-500 font-mono">
              {accept === 'video'
                ? 'MP4, WebM (up to 100MB)'
                : accept === 'image'
                ? 'WebP, PNG, JPG, SVG (up to 15MB)'
                : 'Images (WebP, PNG, SVG) or Videos (MP4)'}
            </p>

            {/* Direct URL paste hint */}
            <div className="mt-3 pt-2.5 border-t border-neutral-200/60 w-full max-w-xs text-center">
              <span className="text-[10px] text-neutral-500 font-mono">
                or paste a direct image/video URL below
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
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-2 bg-white border border-neutral-200 rounded-xl text-neutral-900 text-xs font-mono placeholder:text-neutral-400 focus:border-brand-500 focus:outline-none shadow-xs"
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
