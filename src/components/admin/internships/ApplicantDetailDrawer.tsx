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
  MessageCircle,
  Trash2,
  Check,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { GithubIcon } from '@/components/ui/SocialIcons';

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
  createdAt: string;
}

interface ApplicantDetailDrawerProps {
  applicant: Applicant;
  onClose: () => void;
  onRefresh: () => void;
}

const STATUS_LIST = [
  { value: 'REVIEW', label: 'New Application', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { value: 'CONTACTED', label: 'Contacted', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { value: 'SHORTLISTED', label: 'Shortlisted', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { value: 'REJECTED', label: 'Not Selected', color: 'bg-neutral-100 text-neutral-600 border-neutral-300' },
];

export function ApplicantDetailDrawer({
  applicant,
  onClose,
  onRefresh,
}: ApplicantDetailDrawerProps) {
  const [currentStatus, setCurrentStatus] = useState(applicant.status || 'REVIEW');
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // Clean phone number for WhatsApp URL
  const rawPhone = applicant.phone ? applicant.phone.replace(/[^0-9]/g, '') : '';
  const waPhone = rawPhone.length === 10 ? `91${rawPhone}` : rawPhone;

  // Selected Role & Duration
  const roleName = applicant.preferredDomains?.[0] || applicant.roleAppliedFor || 'General Software / Tech';
  const internshipPeriod = applicant.weeklyAvailability || applicant.duration || '3 Months';
  const projectLink = applicant.githubUrl || applicant.portfolioUrl;

  // Handle status update
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
      setMessage('Status updated');
      setTimeout(() => setMessage(null), 2000);
      onRefresh();
    } catch {
      setMessage('Update failed');
    } finally {
      setIsUpdating(false);
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
            </div>
            <p className="text-xs text-neutral-500 mt-0.5">
              Applied on {new Date(applicant.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Quick Contact Bar */}
          <div className="grid grid-cols-3 gap-2">
            {applicant.phone ? (
              <a
                href={`tel:${applicant.phone}`}
                className="py-2.5 px-3 rounded-xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-xs font-semibold text-neutral-800 flex items-center justify-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-brand-600" />
                <span>Call</span>
              </a>
            ) : null}

            {waPhone ? (
              <a
                href={`https://wa.me/${waPhone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-xs font-semibold text-emerald-800 flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp</span>
              </a>
            ) : null}

            <a
              href={`mailto:${applicant.email}`}
              className="py-2.5 px-3 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-xs font-semibold text-brand-700 flex items-center justify-center gap-1.5 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-brand-600" />
              <span>Email</span>
            </a>
          </div>

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

          {/* Résumé Section */}
          <div className="p-4 rounded-2xl bg-white border border-neutral-200 shadow-2xs">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-purple-50 text-brand-600 border border-purple-200">
                <FileText className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-neutral-950 truncate">
                  {applicant.resumeName || 'Applicant Résumé (PDF)'}
                </h4>
                <p className="text-[11px] text-neutral-500">Candidate document</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {applicant.resumeUrl.includes('.pdf') && (
                <a
                  href={applicant.resumeUrl.replace(/\.pdf$/i, '.jpg')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-3 rounded-xl border border-neutral-200 hover:bg-neutral-50 text-xs font-semibold text-neutral-800 text-center flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>View Preview</span>
                  <ExternalLink className="w-3 h-3 text-neutral-400" />
                </a>
              )}

              <a
                href={applicant.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 px-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold text-center flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
              >
                <span>Download PDF</span>
                <ExternalLink className="w-3 h-3" />
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
            className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
            title="Delete application"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
