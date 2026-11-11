'use client';

import React, { useState } from 'react';
import {
  X,
  Mail,
  Phone,
  GraduationCap,
  Calendar,
  Clock,
  Briefcase,
  FileText,
  ExternalLink,
  Download,
  MessageCircle,
  Trash2,
  Check,
  AlertCircle,
  Loader2,
  Sparkles,
  Printer,
  UserCheck,
} from 'lucide-react';
import { OfferLetterStudioModal } from './OfferLetterStudioModal';
import { OutreachEmailModal } from './OutreachEmailModal';
import {
  DEFAULT_WHATSAPP_TEMPLATE,
  DEFAULT_EMAIL_SUBJECT_TEMPLATE,
  DEFAULT_EMAIL_BODY_TEMPLATE,
  DEFAULT_OFFER_EMAIL_SUBJECT_TEMPLATE,
  DEFAULT_OFFER_EMAIL_BODY_TEMPLATE,
  buildGmailComposeUrl,
} from '@/types/internship';

interface Applicant {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  institution: string;
  yearOfStudy: string;
  roleAppliedFor?: string | null;
  duration?: string | null;
  weeklyAvailability?: string;
  preferredDomains: string[];
  githubUrl: string | null;
  portfolioUrl: string | null;
  resumeUrl: string;
  resumeName: string | null;
  status: string;
  offerRef?: string | null;
  offerDetails?: any;
  createdAt: string;
}

interface ApplicantDetailDrawerProps {
  applicant: Applicant;
  settings?: any;
  defaultNextOfferRef?: string;
  onClose: () => void;
  onRefresh: () => void;
}

const STATUS_LIST = [
  { value: 'REVIEW', label: 'New Application', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { value: 'CONTACTED', label: 'Contacted', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { value: 'SHORTLISTED', label: 'Shortlisted', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { value: 'OFFERED', label: 'Offer Extended', color: 'bg-purple-50 text-brand-700 border-purple-200' },
  { value: 'ACCEPTED', label: 'Hired / Accepted', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
  { value: 'REJECTED', label: 'Not Selected', color: 'bg-neutral-100 text-neutral-600 border-neutral-300' },
];

export function ApplicantDetailDrawer({
  applicant,
  settings,
  defaultNextOfferRef = 'KT/INT/2026/004',
  onClose,
  onRefresh,
}: ApplicantDetailDrawerProps) {
  const [currentStatus, setCurrentStatus] = useState(applicant.status || 'REVIEW');
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isHiring, setIsHiring] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isOfferStudioOpen, setIsOfferStudioOpen] = useState(false);
  const [isOutreachModalOpen, setIsOutreachModalOpen] = useState(false);

  // Selected Role & Duration
  const roleName = applicant.preferredDomains?.[0] || applicant.roleAppliedFor || 'AI/ML Intern';
  const internshipPeriod = applicant.weeklyAvailability || applicant.duration || '1 Month';
  const projectLink = applicant.githubUrl || applicant.portfolioUrl;

  // Clean phone number for WhatsApp URL
  const rawPhone = applicant.phone ? applicant.phone.replace(/[^0-9]/g, '') : '';
  const waPhone = rawPhone.length === 10 ? `91${rawPhone}` : rawPhone;

  const today = new Date();
  const todayFormatted = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;

  // Predefined Message Interpolation
  const interpolatedWaMessage = (settings?.whatsappTemplate || DEFAULT_WHATSAPP_TEMPLATE)
    .replace(/{{name}}/g, applicant.fullName)
    .replace(/{{role}}/g, roleName)
    .replace(/{{institution}}/g, applicant.institution)
    .replace(/{{duration}}/g, internshipPeriod)
    .replace(/{{date}}/g, todayFormatted)
    .replace(/{{today}}/g, todayFormatted);

  const interpolatedEmailSubject = (settings?.emailSubjectTemplate || DEFAULT_EMAIL_SUBJECT_TEMPLATE)
    .replace(/{{name}}/g, applicant.fullName)
    .replace(/{{role}}/g, roleName)
    .replace(/{{date}}/g, todayFormatted)
    .replace(/{{today}}/g, todayFormatted);

  const interpolatedEmailBody = (settings?.emailBodyTemplate || DEFAULT_EMAIL_BODY_TEMPLATE)
    .replace(/{{name}}/g, applicant.fullName)
    .replace(/{{role}}/g, roleName)
    .replace(/{{institution}}/g, applicant.institution)
    .replace(/{{duration}}/g, internshipPeriod)
    .replace(/{{date}}/g, todayFormatted)
    .replace(/{{today}}/g, todayFormatted);

  // Handle manual status update
  const handleStatusChange = async (newStatus: string) => {
    setIsUpdating(true);
    setMessage(null);

    try {
      const res = await fetch(`/api/admin/internships/applicants/${applicant.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error('Failed to update status');

      setCurrentStatus(newStatus);
      setMessage(`Status updated to ${newStatus}`);
      setTimeout(() => setMessage(null), 2500);
      onRefresh();
    } catch {
      setMessage('Update failed');
    } finally {
      setIsUpdating(false);
    }
  };

  // Handle Mark as Hired
  const handleMarkAsHired = async () => {
    setIsHiring(true);
    try {
      const res = await fetch(`/api/admin/internships/applicants/${applicant.id}/hire`, {
        method: 'POST',
      });
      if (!res.ok) throw new Error('Failed to mark as hired');
      setCurrentStatus('ACCEPTED');
      setMessage('Candidate marked as Hired! Moved to Active Interns.');
      setTimeout(() => setMessage(null), 3000);
      onRefresh();
    } catch {
      alert('Could not update to Hired.');
    } finally {
      setIsHiring(false);
    }
  };

  // Handle delete
  const handleDelete = async () => {
    if (!window.confirm(`Delete application for ${applicant.fullName}?`)) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/internships/applicants/${applicant.id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete');
      onRefresh();
      onClose();
    } catch {
      alert('Failed to delete applicant.');
      setIsDeleting(false);
    }
  };

  const statusObj = STATUS_LIST.find((s) => s.value === currentStatus) || STATUS_LIST[0];

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-hidden bg-neutral-950/50 backdrop-blur-xs flex justify-end animate-in fade-in">
        <div className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-200">
          
          {/* Header */}
          <div className="p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/70">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-neutral-950">
                  {applicant.fullName}
                </h2>
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${statusObj.color}`}>
                  {statusObj.label}
                </span>
                {applicant.offerRef && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-100 text-brand-800 border border-purple-200">
                    {applicant.offerRef}
                  </span>
                )}
              </div>
              <p className="text-xs text-neutral-500 mt-0.5">
                Applied on {new Date(applicant.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200/60 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Quick Contact Bar: Call, WhatsApp, Email with Predefined Templates */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
                  Direct Outreach Options
                </span>
                <span className="text-[10px] text-neutral-400 font-mono">
                  Configured templates
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {applicant.phone ? (
                  <a
                    href={`tel:${applicant.phone}`}
                    className="py-2.5 px-3 rounded-xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-xs font-semibold text-neutral-800 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5 text-brand-600" />
                    <span>Call</span>
                  </a>
                ) : null}

                {waPhone ? (
                  <a
                    href={`https://wa.me/${waPhone}?text=${encodeURIComponent(interpolatedWaMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-xs font-semibold text-emerald-800 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    title="Launch WhatsApp with pre-filled candidate template"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>WhatsApp</span>
                  </a>
                ) : null}

                <button
                  type="button"
                  onClick={() => setIsOutreachModalOpen(true)}
                  className="py-2.5 px-3 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-xs font-semibold text-brand-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  title="Send Official Outreach Email (Server SMTP | kairotrix.official@gmail.com | BCC: 3 Founders)"
                >
                  <Mail className="w-3.5 h-3.5 text-brand-600" />
                  <span>Email (Official Gmail)</span>
                </button>
              </div>
            </div>

            {/* STEP-BY-STEP PROGRESSION CHAMBER */}
            
            {/* STAGE 1: New Application (REVIEW) */}
            {currentStatus === 'REVIEW' && (
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/90 space-y-3">
                <div className="flex items-center gap-2 font-bold text-xs text-amber-900">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>Step 1: Contact Applicant First</span>
                </div>
                <p className="text-xs text-amber-800 leading-relaxed">
                  Use the WhatsApp, Email, or Call buttons above to reach out with the configured templates. Once contacted, click below to mark the candidate as Contacted and unlock the Offer Letter stage.
                </p>
                <button
                  type="button"
                  disabled={isUpdating}
                  onClick={() => handleStatusChange('CONTACTED')}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-2xs flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Mark as Contacted</span>
                </button>
              </div>
            )}

            {/* STAGE 2: Contacted or Shortlisted (Ready for Offer Letter) */}
            {(currentStatus === 'CONTACTED' || currentStatus === 'SHORTLISTED') && (
              <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200/90 shadow-2xs space-y-3">
                <div className="flex items-center gap-2 font-bold text-xs text-brand-900">
                  <Sparkles className="w-4 h-4 text-brand-600" />
                  <span>Step 2: Prepare & Publish Offer Letter</span>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Candidate has been contacted. You can now launch the Offer Letter Studio to verify candidate details, preview both the official A4 PDF letterhead and email template, and publish.
                </p>
                <button
                  type="button"
                  onClick={() => setIsOfferStudioOpen(true)}
                  className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-2xs flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Publish Offer Letter</span>
                </button>
              </div>
            )}

            {/* STAGE 3: Offer Published (OFFERED) */}
            {currentStatus === 'OFFERED' && (
              <div className="p-4 rounded-2xl bg-purple-50/80 border border-purple-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-xs text-brand-900">
                    <FileText className="w-4 h-4 text-brand-600" />
                    <span>Step 3: Offer Extended ({applicant.offerRef || 'Pending'})</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-white px-2 py-0.5 rounded-full border border-purple-200 text-brand-700">
                    Awaiting Acceptance
                  </span>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Offer letter was issued. Once the candidate confirms acceptance, click below to mark them as Hired and transfer them into the Active Interns roster.
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={() => setIsOfferStudioOpen(true)}
                    className="px-3.5 py-2 rounded-xl bg-white hover:bg-neutral-50 border border-neutral-300 text-neutral-800 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5 text-brand-600" />
                    <span>View / Print Letter</span>
                  </button>
                  <button
                    type="button"
                    disabled={isHiring}
                    onClick={handleMarkAsHired}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-2xs flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isHiring ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <UserCheck className="w-3.5 h-3.5" />}
                    <span>Mark as Hired / Accepted</span>
                  </button>
                </div>
              </div>
            )}

            {/* STAGE 4: Candidate Hired & Active */}
            {currentStatus === 'ACCEPTED' && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-2">
                <div className="flex items-center gap-2 font-bold text-xs text-emerald-900">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Step 4: Active Hired Intern</span>
                </div>
                <p className="text-xs text-emerald-700 leading-relaxed">
                  This intern has accepted the offer and is recorded in the Active Interns directory with daily progress logs.
                </p>
              </div>
            )}

            {/* Core Candidate Details */}
            <div className="bg-neutral-50/70 border border-neutral-200/80 rounded-2xl p-4 space-y-3.5 text-xs">
              <div className="flex items-start justify-between">
                <span className="text-neutral-500 font-medium">Role / Track</span>
                <span className="font-bold text-neutral-900 text-right">{roleName}</span>
              </div>

              <div className="flex items-start justify-between">
                <span className="text-neutral-500 font-medium">Internship Period</span>
                <span className="font-semibold text-neutral-900">{internshipPeriod}</span>
              </div>

              <div className="flex items-start justify-between">
                <span className="text-neutral-500 font-medium">College / University</span>
                <span className="font-semibold text-neutral-900 text-right">{applicant.institution}</span>
              </div>

              <div className="flex items-start justify-between">
                <span className="text-neutral-500 font-medium">Current Year</span>
                <span className="font-semibold text-neutral-900">{applicant.yearOfStudy}</span>
              </div>

              <div className="flex items-start justify-between">
                <span className="text-neutral-500 font-medium">Mobile Phone</span>
                <span className="font-mono text-neutral-900 font-semibold">{applicant.phone || 'Not provided'}</span>
              </div>

              <div className="flex items-start justify-between">
                <span className="text-neutral-500 font-medium">Email Address</span>
                <span className="font-mono text-neutral-900">{applicant.email}</span>
              </div>

              {projectLink && (
                <div className="flex items-start justify-between pt-2 border-t border-neutral-200/70">
                  <span className="text-neutral-500 font-medium">Portfolio / GitHub</span>
                  <a
                    href={projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-700 font-semibold hover:underline flex items-center gap-1"
                  >
                    <span className="truncate max-w-[200px]">{projectLink}</span>
                    <ExternalLink className="w-3 h-3 shrink-0" />
                  </a>
                </div>
              )}
            </div>

            {/* Candidate Submitted Résumé Section */}
            <div className="p-4 rounded-2xl bg-white border border-neutral-200 shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wider">
                  Candidate Submitted Application
                </span>
                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-semibold">
                  Verified Upload
                </span>
              </div>

              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 rounded-xl bg-neutral-100 text-neutral-700 border border-neutral-200">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-neutral-950 truncate">
                    {applicant.resumeName || `${applicant.fullName} Résumé`}
                  </h4>
                  <p className="text-[11px] text-neutral-500 font-mono">
                    Candidate Resume File
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`/api/admin/internships/applicants/${applicant.id}/resume?action=view`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-3 rounded-xl border border-neutral-200 hover:bg-neutral-50 text-xs font-semibold text-neutral-800 text-center flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>View Candidate Résumé</span>
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
                </a>

                <a
                  href={`/api/admin/internships/applicants/${applicant.id}/resume?action=download`}
                  download={applicant.resumeName || 'resume.pdf'}
                  className="flex-1 py-2 px-3 rounded-xl bg-neutral-900 hover:bg-black text-white text-xs font-semibold text-center flex items-center justify-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Résumé</span>
                </a>
              </div>
            </div>

          </div>

          {/* Footer: Quick Status Update & Delete */}
          <div className="p-4 border-t border-neutral-200 bg-neutral-50/70 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-neutral-500">Status:</span>
              <select
                value={currentStatus}
                disabled={isUpdating}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-white border border-neutral-300 text-xs font-semibold text-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                {STATUS_LIST.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
              {message && <span className="text-xs font-semibold text-emerald-600">{message}</span>}
            </div>

            <button
              type="button"
              disabled={isDeleting}
              onClick={handleDelete}
              className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
              title="Delete application"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* Offer Letter Studio Modal */}
      {isOfferStudioOpen && (
        <OfferLetterStudioModal
          applicant={applicant}
          defaultNextOfferRef={applicant.offerRef || defaultNextOfferRef}
          emailSubjectTemplate={settings?.offerEmailSubjectTemplate}
          emailBodyTemplate={settings?.offerEmailBodyTemplate}
          founderBccEmails={settings?.founderBccEmails}
          onClose={() => setIsOfferStudioOpen(false)}
          onSuccess={() => {
            setIsOfferStudioOpen(false);
            onRefresh();
          }}
        />
      )}

      {/* Official Candidate Outreach Email Modal */}
      {isOutreachModalOpen && (
        <OutreachEmailModal
          applicant={applicant as any}
          settings={settings}
          isOpen={isOutreachModalOpen}
          onClose={() => setIsOutreachModalOpen(false)}
          onEmailSent={onRefresh}
          onMarkContacted={async () => {
            await handleStatusChange('CONTACTED');
          }}
        />
      )}
    </>
  );
}
