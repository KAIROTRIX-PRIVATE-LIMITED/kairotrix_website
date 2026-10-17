'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Upload,
  FileCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  FileText,
  X,
} from 'lucide-react';
import { GithubIcon } from '@/components/ui/SocialIcons';

interface InternshipApplicationFormProps {
  selectedRoleTitle?: string | null;
}

const COMMON_SKILLS = [
  'TypeScript',
  'Next.js',
  'React',
  'Node.js',
  'Python',
  'PostgreSQL',
  'LangChain / AI',
  'UI/UX Design',
];

const ROLES_DROPDOWN = [
  'Software Engineering Intern — Web & Backend Architecture',
  'AI Systems Intern — Agentic Workflows & RAG Pipelines',
  'Automation & Integration Intern — Operations & Systems',
  'Data Analytics & Intelligence Intern',
  'UI/UX & Product Design Intern',
  'Open to all roles (Match me based on my skills)',
];

export function InternshipApplicationForm({ selectedRoleTitle }: InternshipApplicationFormProps) {
  // Form State (9 concise inputs)
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [institution, setInstitution] = useState('');
  const [yearOfStudy, setYearOfStudy] = useState('3rd Year');
  const [roleAppliedFor, setRoleAppliedFor] = useState(selectedRoleTitle || ROLES_DROPDOWN[0]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>(['TypeScript', 'Next.js']);
  const [projectLink, setProjectLink] = useState('');
  const [resumeUrl, setResumeUrl] = useState('');
  const [resumeName, setResumeName] = useState('');
  const [isUploadingResume, setIsUploadingResume] = useState(false);
  const [motivation, setMotivation] = useState('');
  const [termsConsent, setTermsConsent] = useState(true);

  // Sync when user clicks "Apply" on a role card
  useEffect(() => {
    if (selectedRoleTitle) {
      setRoleAppliedFor(selectedRoleTitle);
    }
  }, [selectedRoleTitle]);

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedApplication, setSubmittedApplication] = useState<{
    applicantId: string;
    message: string;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Toggle skills
  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      if (selectedSkills.length > 1) {
        setSelectedSkills(selectedSkills.filter((s) => s !== skill));
      }
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  // Handle Resume Upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage('Résumé file size exceeds 10MB limit. Please upload a smaller PDF.');
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
        throw new Error(data.error || 'Failed to upload document');
      }

      setResumeUrl(data.url);
      setResumeName(data.fileName || file.name);
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMessage(error.message || 'File upload failed. You can also paste an online Google Drive link.');
    } finally {
      setIsUploadingResume(false);
    }
  };

  // Submit Application
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
    if (!institution.trim()) {
      setErrorMessage('Please enter your college name.');
      return;
    }
    if (!termsConsent) {
      setErrorMessage('Please agree to the terms and privacy policy.');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        institution: institution.trim(),
        yearOfStudy,
        preferredDomains: [roleAppliedFor],
        technicalSkills: selectedSkills,
        githubUrl: projectLink.trim() || undefined,
        portfolioUrl: projectLink.trim() || undefined,
        resumeUrl: resumeUrl.trim() || undefined,
        resumeName: resumeName.trim() || undefined,
        motivation: motivation.trim() || undefined,
        privacyConsent: true,
        complianceAck: true,
      };

      const res = await fetch('/api/internships/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Submission failed');
      }

      setSubmittedApplication({
        applicantId: data.applicantId,
        message: data.message,
      });

      const el = document.getElementById('apply-form-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMessage(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="apply-form-section" className="py-16 sm:py-24 bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        
        {/* Form Container */}
        <div className="rounded-3xl border border-neutral-200 bg-neutral-50/60 p-6 sm:p-10 shadow-sm">
          
          {/* Header: 1 heading + 1 line of intro */}
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight">
              Apply for Internship
            </h2>
            <p className="mt-2 text-base text-neutral-600">
              Submit in under two minutes. No complex essays required.
            </p>
          </div>

          {/* Success State */}
          {submittedApplication ? (
            <div className="p-8 rounded-2xl bg-white border border-emerald-200 text-center shadow-xs">
              <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <h3 className="text-xl font-bold text-neutral-950">Application Received</h3>
              <p className="mt-2 text-base text-neutral-600">
                Thank you, <strong>{fullName}</strong>. Our engineering leads review applications weekly.
              </p>

              <div className="my-5 p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 font-mono text-xs text-neutral-700">
                Reference ID: <strong className="text-neutral-950">{submittedApplication.applicantId}</strong>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSubmittedApplication(null);
                  setFullName('');
                  setEmail('');
                  setPhone('');
                  setInstitution('');
                  setProjectLink('');
                  setResumeUrl('');
                  setMotivation('');
                }}
                className="px-5 py-2 rounded-xl text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 transition-colors"
              >
                Submit another application
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Error Banner */}
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* 1. Name */}
              <div>
                <label className="block text-sm font-semibold text-neutral-800 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Aditi Sharma"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-neutral-300 text-neutral-900 text-base focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                />
              </div>

              {/* 2. Email & Phone (Grid) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-neutral-800 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-neutral-300 text-neutral-900 text-base focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-800 mb-1">
                    Phone / WhatsApp <span className="text-neutral-400 font-normal text-xs">(Optional)</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-neutral-300 text-neutral-900 text-base focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                  />
                </div>
              </div>

              {/* 3. College & Year (Grid) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-neutral-800 mb-1">
                    College / University <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    placeholder="e.g. CEG Anna University / IIT Madras"
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-neutral-300 text-neutral-900 text-base focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-800 mb-1">
                    Current Year
                  </label>
                  <select
                    value={yearOfStudy}
                    onChange={(e) => setYearOfStudy(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-white border border-neutral-300 text-neutral-900 text-base focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                  >
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                    <option value="Postgraduate / Recent Grad">Grad / Other</option>
                  </select>
                </div>
              </div>

              {/* 4. Role Applying For (Single Dropdown) */}
              <div>
                <label className="block text-sm font-semibold text-neutral-800 mb-1">
                  Role / Track Applying For <span className="text-red-500">*</span>
                </label>
                <select
                  value={roleAppliedFor}
                  onChange={(e) => setRoleAppliedFor(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-neutral-300 text-neutral-900 text-base font-medium focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                >
                  {ROLES_DROPDOWN.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              {/* 5. Key Skills (8 Common Chips) */}
              <div>
                <label className="block text-sm font-semibold text-neutral-800 mb-2">
                  Skills you actively use <span className="text-neutral-400 font-normal text-xs">(Tap to toggle)</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {COMMON_SKILLS.map((skill) => {
                    const isSelected = selectedSkills.includes(skill);
                    return (
                      <button
                        type="button"
                        key={skill}
                        onClick={() => toggleSkill(skill)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all ${
                          isSelected
                            ? 'bg-brand-600 text-white shadow-2xs'
                            : 'bg-white text-neutral-700 border border-neutral-300 hover:border-brand-400'
                        }`}
                      >
                        {isSelected ? `✓ ${skill}` : `+ ${skill}`}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 6. One Link: GitHub or Portfolio */}
              <div>
                <label className="block text-sm font-semibold text-neutral-800 mb-1">
                  GitHub Profile or Portfolio Link <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  required
                  value={projectLink}
                  onChange={(e) => setProjectLink(e.target.value)}
                  placeholder="https://github.com/your-username or portfolio URL"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-neutral-300 text-neutral-900 text-base focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                />
              </div>

              {/* 7. Résumé Upload (Optional) */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-semibold text-neutral-800">
                    Résumé (PDF) <span className="text-neutral-400 font-normal text-xs">(Optional)</span>
                  </label>
                  {resumeUrl && (
                    <button
                      type="button"
                      onClick={() => {
                        setResumeUrl('');
                        setResumeName('');
                      }}
                      className="text-xs text-red-600 hover:underline"
                    >
                      Remove
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
                  <div className="p-3 rounded-xl bg-white border border-neutral-300 flex items-center justify-center gap-2 text-xs text-brand-600 font-mono">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Uploading résumé...</span>
                  </div>
                ) : resumeUrl ? (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs">
                    <span className="font-semibold text-emerald-900 truncate">
                      ✓ {resumeName || 'Résumé uploaded'}
                    </span>
                    <span className="text-emerald-700 text-[11px]">Ready</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-2.5 px-4 rounded-xl border border-dashed border-neutral-300 hover:border-brand-500 bg-white text-xs font-semibold text-neutral-700 hover:text-brand-700 flex items-center justify-center gap-2 transition-colors"
                  >
                    <Upload className="w-4 h-4 text-neutral-400" />
                    <span>Upload résumé PDF (max 10MB)</span>
                  </button>
                )}
              </div>

              {/* 8. Why do you want to join? (2 lines, optional) */}
              <div>
                <label className="block text-sm font-semibold text-neutral-800 mb-1">
                  Why do you want to join KAIROTRIX? <span className="text-neutral-400 font-normal text-xs">(Optional, 1–2 lines)</span>
                </label>
                <textarea
                  rows={2}
                  value={motivation}
                  onChange={(e) => setMotivation(e.target.value)}
                  placeholder="What technologies or skills are you most excited to build with us?"
                  className="w-full px-4 py-2 rounded-xl bg-white border border-neutral-300 text-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                />
              </div>

              {/* 9. Single Combined Consent Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={termsConsent}
                    onChange={(e) => setTermsConsent(e.target.checked)}
                    className="mt-1 rounded text-brand-600 focus:ring-brand-500 border-neutral-400"
                  />
                  <span className="text-xs text-neutral-600 leading-snug">
                    I agree to the internship program terms and consent to KAIROTRIX processing my application under the DPDP Act.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl text-base font-semibold text-white bg-brand-600 hover:bg-brand-700 shadow-brand transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Application</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

        </div>
      </div>
    </section>
  );
}
