'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload,
  CheckCircle2,
  FileText,
  Sparkles,
  ArrowRight,
  Clock,
  Laptop,
  Award,
  AlertCircle,
  X,
  Code2,
} from 'lucide-react';

interface Role {
  id: string;
  title: string;
  domain?: string;
}

interface InternshipPageClientProps {
  roles?: Role[];
}

const DEFAULT_ROLES = [
  'Software Engineering — Full Stack & Web Architecture',
  'AI Systems & Autonomous Agents',
  'Automation & Workflow Pipelines',
  'Data Systems & Analytics',
  'UI/UX & Product Design',
];

const DURATION_OPTIONS = [
  '1 Month',
  '2 Months',
  '3 Months (Recommended)',
  '6 Months',
];

const YEAR_OPTIONS = [
  '1st Year',
  '2nd Year',
  '3rd Year',
  '4th Year',
  'Postgraduate / Recent Graduate',
];

export function InternshipPageClient({ roles = [] }: InternshipPageClientProps) {
  // Dynamic live roles synced with database
  const [roleTitles, setRoleTitles] = useState<string[]>(
    roles.length > 0 ? roles.map((r) => r.title) : []
  );

  useEffect(() => {
    if (roles.length > 0) {
      setRoleTitles(roles.map((r) => r.title));
    }

    // Always query fresh roles to guarantee immediate sync with admin panel changes
    let isMounted = true;
    fetch('/api/internships/roles', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;
        if (data.roles && Array.isArray(data.roles) && data.roles.length > 0) {
          const titles = data.roles.map((r: { title: string }) => r.title);
          setRoleTitles(titles);
        }
      })
      .catch((err) => console.error('Failed to sync live internship roles:', err));

    return () => {
      isMounted = false;
    };
  }, [roles]);

  // Use dynamic admin roles if available, else standard fallback domains
  const availableRoles = roleTitles.length > 0 
    ? roleTitles
    : DEFAULT_ROLES;

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [institution, setInstitution] = useState('');
  const [yearOfStudy, setYearOfStudy] = useState('3rd Year');
  const [roleAppliedFor, setRoleAppliedFor] = useState(availableRoles[0] || DEFAULT_ROLES[0]);

  // Ensure roleAppliedFor stays valid when dynamic roles update
  useEffect(() => {
    if (availableRoles.length > 0 && !availableRoles.includes(roleAppliedFor)) {
      setRoleAppliedFor(availableRoles[0]);
    }
  }, [availableRoles, roleAppliedFor]);
  const [projectLink, setProjectLink] = useState('');
  const [duration, setDuration] = useState('3 Months (Recommended)');
  const [resumeUrl, setResumeUrl] = useState('');
  const [resumeName, setResumeName] = useState('');
  const [isUploadingResume, setIsUploadingResume] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  // Status State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Resume Upload Logic
  const uploadFile = async (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage('File size exceeds 10MB. Please upload a smaller PDF or Word document.');
      return;
    }

    const validTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    if (!validTypes.includes(file.type) && !file.name.match(/\.(pdf|doc|docx)$/i)) {
      setErrorMessage('Please upload a PDF or Word document (.pdf, .doc, .docx).');
      return;
    }

    setIsUploadingResume(true);
    setErrorMessage(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/internships/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to upload resume');
      }

      setResumeUrl(data.url);
      setResumeName(data.fileName || file.name);
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMessage(error.message || 'Upload failed. Please try again.');
    } finally {
      setIsUploadingResume(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  };

  // Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!phone.trim()) {
      setErrorMessage('Please enter your mobile phone number.');
      return;
    }
    if (!institution.trim()) {
      setErrorMessage('Please enter your college or university.');
      return;
    }
    if (!resumeUrl) {
      setErrorMessage('Resume upload is mandatory. Please attach your resume.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/internships/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          institution: institution.trim(),
          yearOfStudy,
          roleAppliedFor,
          duration,
          projectLink: projectLink.trim() || undefined,
          resumeUrl: resumeUrl.trim(),
          resumeName: resumeName.trim() || undefined,
          privacyConsent: true,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Submission failed');
      }

      setIsSubmitted(true);
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMessage(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setInstitution('');
    setProjectLink('');
    setResumeUrl('');
    setResumeName('');
    setIsSubmitted(false);
    setErrorMessage(null);
  };

  return (
    <div className="relative min-h-screen bg-[#FAFAF8] text-[#0B0B0F] flex flex-col font-sans selection:bg-[#6D28D9] selection:text-white overflow-hidden">
      {/* Ambient Radial Gradient Overlays */}
      <div 
        className="absolute top-0 left-1/4 w-[600px] h-[450px] bg-gradient-to-br from-purple-200/40 via-purple-100/20 to-transparent blur-3xl pointer-events-none -z-0"
        aria-hidden="true"
      />
      <div 
        className="absolute top-1/3 right-0 w-[500px] h-[400px] bg-gradient-to-bl from-indigo-200/30 via-brand-100/15 to-transparent blur-3xl pointer-events-none -z-0"
        aria-hidden="true"
      />

      {/* Main Split-Screen Container with top spacing to clear the fixed global Navbar */}
      <main className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-28 sm:pt-36 lg:pt-32 pb-16 lg:pb-24 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-start lg:items-center">
          
          {/* === LEFT SIDE: HERO (ANIMATED WITH FRAMER MOTION) === */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center space-y-8"
          >
            {/* Live Hiring Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/90 border border-purple-200/80 shadow-[0_2px_12px_rgba(109,40,217,0.06)] self-start backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-xs font-semibold tracking-wide text-neutral-800">
                KAIROTRIX Fellowship
              </span>
              <span className="text-neutral-300">|</span>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#6D28D9]">
                Applications Open
              </span>
            </motion.div>

            {/* Main Headline */}
            <div className="space-y-4">
              <motion.h1 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.55 }}
                className="text-4xl sm:text-5xl lg:text-[56px] xl:text-[62px] font-bold tracking-tight text-[#0B0B0F] leading-[1.07]"
              >
                Build skills by building{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6D28D9] via-purple-600 to-indigo-600">
                  real technology.
                </span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.55 }}
                className="text-[16px] sm:text-[18px] text-[#555562] leading-relaxed max-w-xl font-normal"
              >
                Work on live production codebases, AI agent pipelines, and enterprise automation alongside active engineers. No artificial exercises — you build systems that ship.
              </motion.p>
            </div>

           

            {/* Quiet Bottom Reassurance */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.55 }}
              className="pt-4 border-t border-neutral-200/70 flex items-center gap-2 text-xs text-neutral-500"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#6D28D9]" />
              <span>
                One simplified application — our technical leads review and match your role directly.
              </span>
            </motion.div>
          </motion.div>

          {/* === RIGHT SIDE: FORM CARD (ID='apply-form-section' for direct smooth scroll from Navbar) === */}
          <motion.div 
            id="apply-form-section"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 w-full"
          >
            <div className="relative bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 lg:p-9 border border-neutral-200/80 shadow-[0_20px_50px_-15px_rgba(109,40,217,0.08),0_1px_3px_rgba(0,0,0,0.04)] transition-all">
              
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  /* Success View */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.4 }}
                    className="py-12 sm:py-16 text-center space-y-5"
                  >
                    <div className="relative w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200/80 shadow-[0_0_24px_rgba(16,185,129,0.2)]">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>

                    <div className="space-y-2">
                      <h2 className="text-2xl font-bold text-[#0B0B0F]">
                        Application Received!
                      </h2>
                      <p className="text-[15px] text-[#555562] max-w-md mx-auto leading-relaxed">
                        Thank you for applying to KAIROTRIX. Our engineering team reviews each application thoroughly. We will contact you via email or phone within <strong>5 business days</strong>.
                      </p>
                    </div>

                    <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={handleResetForm}
                        className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors cursor-pointer"
                      >
                        Submit another application
                      </button>
                      <Link
                        href="/work"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#6D28D9] text-white text-xs font-semibold hover:bg-[#5B21B6] transition-colors"
                      >
                        <span>Explore our work</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </motion.div>
                ) : (
                  /* Form View */
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between pb-5 mb-5 border-b border-neutral-100">
                      <div>
                        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0B0B0F]">
                          Apply for internship
                        </h2>
                        <p className="text-xs text-neutral-500 mt-0.5">
                          Takes under 2 minutes · Direct review by tech leads
                        </p>
                      </div>
                      <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold bg-purple-50 text-[#6D28D9] border border-purple-200/70">
                        General Application
                      </span>
                    </div>

                    {/* Error Banner */}
                    {errorMessage && (
                      <motion.div 
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2"
                      >
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                        <span>{errorMessage}</span>
                      </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* 1. Full name */}
                      <div>
                        <label className="block text-xs font-semibold text-neutral-700 mb-1">
                          Full Name <span className="text-purple-600">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Aditi Sharma"
                          className="w-full h-11 px-3.5 rounded-xl border border-neutral-200 text-sm text-[#0B0B0F] bg-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#6D28D9]/20 focus:border-[#6D28D9] transition-all shadow-2xs"
                        />
                      </div>

                      {/* 2 & 3. Email & Mobile no. */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className="block text-xs font-semibold text-neutral-700 mb-1">
                            Email Address <span className="text-purple-600">*</span>
                          </label>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="aditi@example.com"
                            className="w-full h-11 px-3.5 rounded-xl border border-neutral-200 text-sm text-[#0B0B0F] bg-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#6D28D9]/20 focus:border-[#6D28D9] transition-all shadow-2xs"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-neutral-700 mb-1">
                            Mobile No. <span className="text-purple-600">*</span>
                          </label>
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+91 98765 43210"
                            className="w-full h-11 px-3.5 rounded-xl border border-neutral-200 text-sm text-[#0B0B0F] bg-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#6D28D9]/20 focus:border-[#6D28D9] transition-all shadow-2xs"
                          />
                        </div>
                      </div>

                      {/* 4 & 5. College / University & Year */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-semibold text-neutral-700 mb-1">
                            College / University <span className="text-purple-600">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={institution}
                            onChange={(e) => setInstitution(e.target.value)}
                            placeholder="e.g. CEG Anna Univ / IIT Madras"
                            className="w-full h-11 px-3.5 rounded-xl border border-neutral-200 text-sm text-[#0B0B0F] bg-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#6D28D9]/20 focus:border-[#6D28D9] transition-all shadow-2xs"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-neutral-700 mb-1">
                            Year of Study
                          </label>
                          <select
                            value={yearOfStudy}
                            onChange={(e) => setYearOfStudy(e.target.value)}
                            className="w-full h-11 px-3 rounded-xl border border-neutral-200 text-xs sm:text-sm text-[#0B0B0F] bg-white focus:outline-none focus:ring-2 focus:ring-[#6D28D9]/20 focus:border-[#6D28D9] transition-all shadow-2xs cursor-pointer"
                          >
                            {YEAR_OPTIONS.map((y) => (
                              <option key={y} value={y}>
                                {y}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* 6 & 7. Role/Domain & Duration */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className="block text-xs font-semibold text-neutral-700 mb-1">
                            Preferred Role / Domain
                          </label>
                          <select
                            value={roleAppliedFor}
                            onChange={(e) => setRoleAppliedFor(e.target.value)}
                            className="w-full h-11 px-3 rounded-xl border border-neutral-200 text-xs sm:text-sm text-[#0B0B0F] bg-white focus:outline-none focus:ring-2 focus:ring-[#6D28D9]/20 focus:border-[#6D28D9] transition-all shadow-2xs cursor-pointer truncate"
                          >
                            {availableRoles.map((role) => (
                              <option key={role} value={role}>
                                {role}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-neutral-700 mb-1">
                            Internship Duration
                          </label>
                          <select
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            className="w-full h-11 px-3 rounded-xl border border-neutral-200 text-xs sm:text-sm text-[#0B0B0F] bg-white focus:outline-none focus:ring-2 focus:ring-[#6D28D9]/20 focus:border-[#6D28D9] transition-all shadow-2xs cursor-pointer"
                          >
                            {DURATION_OPTIONS.map((d) => (
                              <option key={d} value={d}>
                                {d}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* 8. GitHub or portfolio link */}
                      <div>
                        <label className="block text-xs font-semibold text-neutral-700 mb-1">
                          GitHub / Portfolio / LinkedIn Link <span className="text-neutral-400 text-[11px] font-normal">(Optional)</span>
                        </label>
                        <input
                          type="url"
                          value={projectLink}
                          onChange={(e) => setProjectLink(e.target.value)}
                          placeholder="https://github.com/your-username or portfolio URL"
                          className="w-full h-11 px-3.5 rounded-xl border border-neutral-200 text-sm text-[#0B0B0F] bg-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#6D28D9]/20 focus:border-[#6D28D9] transition-all shadow-2xs"
                        />
                      </div>

                      {/* 9. Resume Upload */}
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="block text-xs font-semibold text-neutral-700">
                            Resume Attachment <span className="text-purple-600">*</span>
                          </label>
                          {resumeUrl && (
                            <button
                              type="button"
                              onClick={() => {
                                setResumeUrl('');
                                setResumeName('');
                              }}
                              className="inline-flex items-center gap-1 text-[11px] text-red-600 hover:text-red-700 transition-colors font-medium cursor-pointer"
                            >
                              <X className="w-3 h-3" />
                              <span>Remove</span>
                            </button>
                          )}
                        </div>

                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileUpload}
                          accept=".pdf,.doc,.docx"
                          className="hidden"
                        />

                        {isUploadingResume ? (
                          <div className="w-full h-14 px-4 rounded-xl border border-purple-200 bg-purple-50/50 flex items-center justify-center gap-2 text-xs font-medium text-[#6D28D9] animate-pulse">
                            <span className="w-4 h-4 border-2 border-[#6D28D9] border-t-transparent rounded-full animate-spin" />
                            <span>Uploading resume securely...</span>
                          </div>
                        ) : resumeUrl ? (
                          <div className="w-full h-14 px-4 rounded-xl border border-emerald-200 bg-emerald-50/50 flex items-center justify-between text-xs text-emerald-900 shadow-2xs">
                            <div className="flex items-center gap-2.5 truncate pr-2">
                              <FileText className="w-4 h-4 text-emerald-600 shrink-0" />
                              <span className="font-medium truncate">{resumeName || 'Resume uploaded'}</span>
                            </div>
                            <span className="shrink-0 px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[11px] font-semibold">
                              Attached
                            </span>
                          </div>
                        ) : (
                          <div
                            onDragOver={(e) => {
                              e.preventDefault();
                              setIsDragOver(true);
                            }}
                            onDragLeave={() => setIsDragOver(false)}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                            className={`w-full h-14 px-4 rounded-xl border-2 border-dashed transition-all flex items-center justify-center gap-2.5 cursor-pointer ${
                              isDragOver
                                ? 'border-[#6D28D9] bg-purple-50/50 text-[#6D28D9]'
                                : 'border-neutral-200 hover:border-[#6D28D9] bg-neutral-50/50 hover:bg-white text-neutral-600 hover:text-[#6D28D9]'
                            }`}
                          >
                            <Upload className="w-4 h-4 text-purple-600 shrink-0" />
                            <div className="text-xs">
                              <span className="font-semibold text-neutral-800">Click to upload</span> or drag resume here{' '}
                              <span className="text-neutral-400 font-normal">(PDF, DOCX max 10MB)</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Submit Button */}
                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={isSubmitting || isUploadingResume}
                          className="relative group w-full h-12 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#6D28D9] via-purple-600 to-indigo-600 hover:opacity-95 active:scale-[0.99] transition-all shadow-[0_4px_16px_rgba(109,40,217,0.35)] disabled:opacity-50 cursor-pointer overflow-hidden flex items-center justify-center gap-2"
                        >
                          {/* Subtle light sweep */}
                          <span className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 group-hover:left-[120%] transition-all duration-700 ease-out pointer-events-none" />

                          {isSubmitting ? (
                            <>
                              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              <span>Submitting application...</span>
                            </>
                          ) : (
                            <>
                              <span>Apply now</span>
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                            </>
                          )}
                        </button>

                        {/* Quiet Terms Text */}
                        <p className="mt-3 text-center text-[11px] text-neutral-500 leading-normal">
                          By submitting, you agree to our terms of evaluation and data privacy policy.
                        </p>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </motion.div>

        </div>
      </main>
    </div>
  );
}
