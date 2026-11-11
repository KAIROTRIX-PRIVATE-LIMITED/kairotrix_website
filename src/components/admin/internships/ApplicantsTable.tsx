'use client';

import React, { useState, useMemo } from 'react';
import {
  Search,
  ChevronRight,
  Download,
  Phone,
  Mail,
  MessageCircle,
  Printer,
  Sparkles,
  Check,
  UserCheck,
  CheckCircle2,
  XCircle,
  ListFilter,
  User,
} from 'lucide-react';
import { OfferLetterStudioModal } from './OfferLetterStudioModal';
import { OutreachEmailModal } from './OutreachEmailModal';
import {
  DEFAULT_WHATSAPP_TEMPLATE,
  DEFAULT_EMAIL_SUBJECT_TEMPLATE,
  DEFAULT_EMAIL_BODY_TEMPLATE,
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

interface ApplicantsTableProps {
  applicants: Applicant[];
  settings?: any;
  defaultNextOfferRef?: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  onSelectApplicant: (applicant: Applicant) => void;
  onNavigateToActiveTab?: () => void;
  onRefresh: () => void;
}

const STATUS_BADGES: Record<string, { label: string; className: string }> = {
  REVIEW: { label: 'New', className: 'bg-amber-50 text-amber-700 border-amber-200' },
  CONTACTED: { label: 'Contacted', className: 'bg-blue-50 text-blue-700 border-blue-200' },
  SHORTLISTED: { label: 'Shortlisted', className: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  REJECTED: { label: 'Not Selected', className: 'bg-neutral-100 text-neutral-600 border-neutral-300' },
  OFFERED: { label: 'Offer Extended', className: 'bg-purple-50 text-brand-700 border-purple-200' },
  ACCEPTED: { label: 'Hired / Accepted', className: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
};

type SubTab = 'pipeline' | 'rejected' | 'all';

export function ApplicantsTable({
  applicants,
  settings,
  defaultNextOfferRef = 'KT/INT/2026/004',
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  onSelectApplicant,
  onNavigateToActiveTab,
  onRefresh,
}: ApplicantsTableProps) {
  const [activeSubTab, setActiveSubTab] = useState<SubTab>('pipeline');
  const [pipelineSubFilter, setPipelineSubFilter] = useState<string>('ALL');
  const [selectedForOffer, setSelectedForOffer] = useState<Applicant | null>(null);
  const [outreachModalApplicant, setOutreachModalApplicant] = useState<Applicant | null>(null);
  const [hiredBanner, setHiredBanner] = useState<string | null>(null);

  // Group counts
  const pipelineApplicants = useMemo(
    () => applicants.filter((a) => a.status !== 'REJECTED' && a.status !== 'ACCEPTED'),
    [applicants]
  );
  const rejectedApplicants = useMemo(
    () => applicants.filter((a) => a.status === 'REJECTED'),
    [applicants]
  );
  const hiredApplicants = useMemo(
    () => applicants.filter((a) => a.status === 'ACCEPTED'),
    [applicants]
  );

  // Filter helper matching search query
  const matchesSearch = (app: Applicant) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      app.fullName.toLowerCase().includes(q) ||
      app.email.toLowerCase().includes(q) ||
      (app.phone && app.phone.includes(q)) ||
      app.institution.toLowerCase().includes(q) ||
      (app.roleAppliedFor && app.roleAppliedFor.toLowerCase().includes(q)) ||
      (app.offerRef && app.offerRef.toLowerCase().includes(q)) ||
      app.preferredDomains.some((d) => d.toLowerCase().includes(q))
    );
  };

  // Filtered lists for the active sub-tab
  const filteredPipelineApplicants = useMemo(() => {
    return pipelineApplicants.filter((app) => {
      if (!matchesSearch(app)) return false;
      if (pipelineSubFilter !== 'ALL' && app.status !== pipelineSubFilter) return false;
      return true;
    });
  }, [pipelineApplicants, searchQuery, pipelineSubFilter]);

  const filteredRejectedApplicants = useMemo(() => {
    return rejectedApplicants.filter(matchesSearch);
  }, [rejectedApplicants, searchQuery]);

  const filteredHiredApplicants = useMemo(() => {
    return hiredApplicants.filter(matchesSearch);
  }, [hiredApplicants, searchQuery]);

  // Manual mark as Contacted
  const handleManualMarkContacted = async (e: React.MouseEvent, appId: string) => {
    e.stopPropagation();
    try {
      await fetch(`/api/admin/internships/applicants/${appId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'CONTACTED' }),
      });
      onRefresh();
    } catch (err) {
      console.error('Failed to mark contacted:', err);
    }
  };

  // Manual mark as Hired -> Candidate moves to Active Interns tab
  const handleManualMarkHired = async (e: React.MouseEvent, appId: string, candidateName: string) => {
    e.stopPropagation();
    try {
      await fetch(`/api/admin/internships/applicants/${appId}/hire`, {
        method: 'POST',
      });
      setHiredBanner(`${candidateName} marked as Hired! Transferred to Active Interns directory.`);
      onRefresh();
    } catch (err) {
      console.error('Failed to mark hired:', err);
    }
  };

  // Reusable Action Buttons
  const renderActionButtons = (
    app: Applicant,
    waPhone: string,
    waMessage: string,
    offerRef?: string | null
  ) => {
    return (
      <div className="flex items-center gap-1.5">
        {/* STEP 1: Status = REVIEW (New application) */}
        {app.status === 'REVIEW' && (
          <>
            {waPhone && (
              <a
                href={`https://wa.me/${waPhone}?text=${encodeURIComponent(waMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                title="Open WhatsApp with outreach template"
                className="h-8 w-8 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 flex items-center justify-center transition-colors cursor-pointer shrink-0"
              >
                <MessageCircle className="w-3.5 h-3.5" />
              </a>
            )}

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setOutreachModalApplicant(app);
              }}
              title="Send Official Outreach Email (Server SMTP | kairotrix.official@gmail.com | BCC: 3 Founders)"
              className="h-8 w-8 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-brand-700 flex items-center justify-center transition-colors cursor-pointer shrink-0"
            >
              <Mail className="w-3.5 h-3.5" />
            </button>

            {app.phone && (
              <a
                href={`tel:${app.phone}`}
                onClick={(e) => e.stopPropagation()}
                title={`Call ${app.phone}`}
                className="h-8 w-8 rounded-xl bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 text-neutral-700 flex items-center justify-center transition-colors cursor-pointer shrink-0"
              >
                <Phone className="w-3.5 h-3.5" />
              </a>
            )}

            <button
              type="button"
              onClick={(e) => handleManualMarkContacted(e, app.id)}
              title="Mark applicant as Contacted"
              className="h-8 px-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer shrink-0 whitespace-nowrap"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Mark Contacted</span>
            </button>
          </>
        )}

        {/* STEP 2: Status = CONTACTED or SHORTLISTED -> Unlock "Publish Offer Letter" */}
        {(app.status === 'CONTACTED' || app.status === 'SHORTLISTED') && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedForOffer(app);
              }}
              title="Publish Offer Letter"
              className="h-8 px-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-2xs flex items-center gap-1.5 transition-all cursor-pointer shrink-0 whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Publish Offer Letter</span>
            </button>

            {waPhone && (
              <a
                href={`https://wa.me/${waPhone}?text=${encodeURIComponent(waMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                title="Message on WhatsApp"
                className="h-8 w-8 rounded-xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-neutral-600 flex items-center justify-center transition-colors cursor-pointer shrink-0"
              >
                <MessageCircle className="w-3.5 h-3.5" />
              </a>
            )}
          </>
        )}

        {/* STEP 3: Status = OFFERED -> Show "View Offer" & "Mark Hired" */}
        {app.status === 'OFFERED' && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedForOffer(app);
              }}
              title={`View / Print Offer Letter (${offerRef || ''})`}
              className="h-8 px-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-brand-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 whitespace-nowrap"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>View Offer</span>
            </button>

            <button
              type="button"
              onClick={(e) => handleManualMarkHired(e, app.id, app.fullName)}
              title="Candidate accepted offer - mark as Hired and transfer to Active Interns"
              className="h-8 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-2xs flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 whitespace-nowrap"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Mark Hired</span>
            </button>
          </>
        )}

        {/* STEP 4: Status = ACCEPTED -> Candidate is Hired */}
        {app.status === 'ACCEPTED' && (
          <span className="h-8 px-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-1 shrink-0 whitespace-nowrap">
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span>Hired (Active)</span>
          </span>
        )}

        {/* Resume Download */}
        <a
          href={`/api/admin/internships/applicants/${app.id}/resume?action=download`}
          download={app.resumeName || 'resume.pdf'}
          onClick={(e) => e.stopPropagation()}
          title={`Download ${app.resumeName || 'Resume'}`}
          className="h-8 w-8 rounded-xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-neutral-700 flex items-center justify-center transition-colors cursor-pointer shrink-0"
        >
          <Download className="w-3.5 h-3.5" />
        </a>

        {/* View Details Drawer Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelectApplicant(app);
          }}
          className="h-8 px-2.5 rounded-xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-xs font-semibold text-neutral-700 flex items-center gap-1 group-hover:border-brand-500 group-hover:text-brand-700 transition-colors cursor-pointer shrink-0 whitespace-nowrap"
        >
          <span>View</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  };

  // Single Desktop Row
  const renderApplicantRow = (app: Applicant) => {
    const statusObj = STATUS_BADGES[app.status] || {
      label: app.status,
      className: 'bg-neutral-100 text-neutral-700 border-neutral-200',
    };
    const roleName = app.preferredDomains?.[0] || app.roleAppliedFor || 'AI/ML Intern';
    const duration = app.weeklyAvailability || app.duration || '1 Month';
    const offerRef = app.offerRef || app.offerDetails?.offerRef;

    const rawPhone = app.phone ? app.phone.replace(/[^0-9]/g, '') : '';
    const waPhone = rawPhone.length === 10 ? `91${rawPhone}` : rawPhone;

    const today = new Date();
    const todayFormatted = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;

    const waMessage = (settings?.whatsappTemplate || DEFAULT_WHATSAPP_TEMPLATE)
      .replace(/{{name}}/g, app.fullName)
      .replace(/{{role}}/g, roleName)
      .replace(/{{institution}}/g, app.institution)
      .replace(/{{duration}}/g, duration)
      .replace(/{{date}}/g, todayFormatted)
      .replace(/{{today}}/g, todayFormatted);

    const isRejected = app.status === 'REJECTED';
    const isHired = app.status === 'ACCEPTED';

    return (
      <div
        key={app.id}
        onClick={() => onSelectApplicant(app)}
        className={`grid grid-cols-[minmax(250px,2fr)_minmax(140px,1.2fr)_95px_135px_80px_minmax(250px,auto)] items-center gap-4 px-5 py-3 transition-colors cursor-pointer group ${
          isRejected
            ? 'bg-neutral-50/40 hover:bg-neutral-100/60 opacity-80 hover:opacity-100'
            : isHired
            ? 'bg-emerald-50/30 hover:bg-emerald-50/60'
            : 'hover:bg-neutral-50/80'
        }`}
      >
        {/* Col 1: Candidate Info */}
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={`w-9 h-9 rounded-xl border flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs ${
              isRejected
                ? 'bg-neutral-100 border-neutral-300 text-neutral-600'
                : isHired
                ? 'bg-emerald-100 border-emerald-300 text-emerald-800'
                : 'bg-purple-50/90 border-purple-200/80 text-brand-700'
            }`}
          >
            {app.fullName.charAt(0).toUpperCase()}
          </div>

          <div className="min-w-0">
            <h4
              className={`text-sm font-bold truncate transition-colors ${
                isRejected
                  ? 'text-neutral-700 group-hover:text-neutral-900'
                  : 'text-neutral-900 group-hover:text-brand-700'
              }`}
            >
              {app.fullName}
            </h4>
            <p
              className="text-[11px] text-neutral-500 truncate"
              title={`${app.institution} • ${app.yearOfStudy}`}
            >
              {app.institution} • {app.yearOfStudy}
            </p>
            <div className="flex items-center gap-3 mt-0.5 text-[10px] text-neutral-400 font-mono truncate">
              {app.phone && (
                <span className="flex items-center gap-1 shrink-0">
                  <Phone className="w-2.5 h-2.5 text-neutral-400" />
                  <span>{app.phone}</span>
                </span>
              )}
              <span className="flex items-center gap-1 truncate" title={app.email}>
                <Mail className="w-2.5 h-2.5 text-neutral-400 shrink-0" />
                <span className="truncate">{app.email}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Col 2: Track / Domain */}
        <div className="min-w-0">
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold truncate max-w-full ${
              isRejected
                ? 'bg-neutral-100 text-neutral-600 border border-neutral-200'
                : 'bg-purple-50/80 text-brand-700 border border-purple-200/80'
            }`}
            title={roleName}
          >
            {roleName}
          </span>
        </div>

        {/* Col 3: Duration */}
        <div>
          <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium text-neutral-600 bg-neutral-100 border border-neutral-200/80 whitespace-nowrap">
            {duration}
          </span>
        </div>

        {/* Col 4: Status & Offer Ref */}
        <div className="flex flex-col items-start gap-1 min-w-0">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10.5px] font-semibold border ${statusObj.className} whitespace-nowrap`}
          >
            {statusObj.label}
          </span>
          {offerRef && (
            <span
              className="inline-flex items-center px-1.5 py-0.5 rounded text-[9.5px] font-mono font-bold bg-purple-100 text-brand-800 border border-purple-200/80 truncate max-w-[125px]"
              title={`Offer Ref: ${offerRef}`}
            >
              {offerRef}
            </span>
          )}
        </div>

        {/* Col 5: Applied Date */}
        <div className="text-xs text-neutral-500 font-mono font-medium whitespace-nowrap">
          {new Date(app.createdAt).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
          })}
        </div>

        {/* Col 6: Actions */}
        <div className="flex items-center justify-end">
          {renderActionButtons(app, waPhone, waMessage, offerRef)}
        </div>
      </div>
    );
  };

  // Single Mobile Card
  const renderApplicantCard = (app: Applicant) => {
    const statusObj = STATUS_BADGES[app.status] || {
      label: app.status,
      className: 'bg-neutral-100 text-neutral-700 border-neutral-200',
    };
    const roleName = app.preferredDomains?.[0] || app.roleAppliedFor || 'AI/ML Intern';
    const duration = app.weeklyAvailability || app.duration || '1 Month';
    const offerRef = app.offerRef || app.offerDetails?.offerRef;

    const rawPhone = app.phone ? app.phone.replace(/[^0-9]/g, '') : '';
    const waPhone = rawPhone.length === 10 ? `91${rawPhone}` : rawPhone;

    const today = new Date();
    const todayFormatted = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;

    const waMessage = (settings?.whatsappTemplate || DEFAULT_WHATSAPP_TEMPLATE)
      .replace(/{{name}}/g, app.fullName)
      .replace(/{{role}}/g, roleName)
      .replace(/{{institution}}/g, app.institution)
      .replace(/{{duration}}/g, duration)
      .replace(/{{date}}/g, todayFormatted)
      .replace(/{{today}}/g, todayFormatted);

    const isRejected = app.status === 'REJECTED';

    return (
      <div
        key={app.id}
        onClick={() => onSelectApplicant(app)}
        className={`p-4 transition-colors cursor-pointer space-y-3 ${
          isRejected ? 'bg-neutral-50/50 hover:bg-neutral-100/70 opacity-85' : 'hover:bg-neutral-50/70'
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className={`w-9 h-9 rounded-xl border flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs ${
                isRejected
                  ? 'bg-neutral-100 border-neutral-300 text-neutral-600'
                  : 'bg-purple-50/90 border-purple-200/80 text-brand-700'
              }`}
            >
              {app.fullName.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <h4 className="text-sm font-bold text-neutral-900 truncate">
                {app.fullName}
              </h4>
              <p className="text-[11px] text-neutral-500 truncate">
                {app.institution} • {app.yearOfStudy}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1 shrink-0">
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${statusObj.className} whitespace-nowrap`}>
              {statusObj.label}
            </span>
            <span className="text-[10px] text-neutral-400 font-mono">
              {new Date(app.createdAt).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
              })}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-0.5">
          <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold text-brand-700 bg-purple-50 border border-purple-200/80">
            {roleName}
          </span>
          <span className="px-2.5 py-0.5 rounded-md text-xs font-medium text-neutral-600 bg-neutral-100 border border-neutral-200/80">
            {duration}
          </span>
          {offerRef && (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-purple-100 text-brand-800 border border-purple-200/80">
              {offerRef}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 text-[11px] text-neutral-500 font-mono flex-wrap">
          {app.phone && (
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3 text-neutral-400" />
              <span>{app.phone}</span>
            </span>
          )}
          <span className="flex items-center gap-1 truncate">
            <Mail className="w-3 h-3 text-neutral-400" />
            <span className="truncate">{app.email}</span>
          </span>
        </div>

        <div className="flex items-center justify-between gap-2 pt-2 border-t border-neutral-100">
          <span className="text-[10.5px] font-mono text-neutral-400">Actions</span>
          {renderActionButtons(app, waPhone, waMessage, offerRef)}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Hired Transfer Toast Notification */}
      {hiredBanner && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between gap-3 animate-in fade-in duration-200 shadow-2xs">
          <div className="flex items-center gap-2.5 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{hiredBanner}</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {onNavigateToActiveTab && (
              <button
                type="button"
                onClick={onNavigateToActiveTab}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
              >
                <span>Open Active Interns</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              type="button"
              onClick={() => setHiredBanner(null)}
              className="p-1 rounded-lg text-emerald-700 hover:bg-emerald-100 cursor-pointer"
              title="Dismiss"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Top Filter & Sub-Tab Control Center */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-2xs flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Left: Sub-Tab Pills (Active Pipeline / Not Selected / All) */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-neutral-100/90 border border-neutral-200/70 overflow-x-auto shrink-0">
          {/* Active Pipeline Tab */}
          <button
            type="button"
            onClick={() => setActiveSubTab('pipeline')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeSubTab === 'pipeline'
                ? 'bg-white text-brand-700 shadow-2xs'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            <span>Active Pipeline</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10.5px] font-mono font-bold ${
                activeSubTab === 'pipeline'
                  ? 'bg-purple-100 text-brand-800'
                  : 'bg-neutral-200 text-neutral-700'
              }`}
            >
              {pipelineApplicants.length}
            </span>
          </button>

          {/* Not Selected Tab (Separate Tab for Rejected Applicants) */}
          <button
            type="button"
            onClick={() => setActiveSubTab('rejected')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeSubTab === 'rejected'
                ? 'bg-white text-neutral-900 shadow-2xs'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/50'
            }`}
          >
            <XCircle className="w-3.5 h-3.5 text-neutral-400" />
            <span>Not Selected</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10.5px] font-mono font-bold ${
                activeSubTab === 'rejected'
                  ? 'bg-neutral-200 text-neutral-900'
                  : 'bg-neutral-200 text-neutral-700'
              }`}
            >
              {rejectedApplicants.length}
            </span>
          </button>

          {/* All Applications Tab (Grouped with Not Selected at bottom) */}
          <button
            type="button"
            onClick={() => setActiveSubTab('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeSubTab === 'all'
                ? 'bg-white text-neutral-900 shadow-2xs'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/50'
            }`}
          >
            <ListFilter className="w-3.5 h-3.5 text-neutral-500" />
            <span>All</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10.5px] font-mono font-bold bg-neutral-200 text-neutral-700">
              {applicants.length}
            </span>
          </button>
        </div>

        {/* Right: Search & Quick Status Filter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 flex-1 justify-end">
          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by student, college, phone..."
              className="w-full pl-8.5 pr-3 py-1.5 rounded-xl bg-neutral-50 border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
            />
          </div>

          {/* Sub-Filter for Active Pipeline */}
          {activeSubTab === 'pipeline' && (
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-xs text-neutral-500 font-medium">Stage:</span>
              <select
                value={pipelineSubFilter}
                onChange={(e) => setPipelineSubFilter(e.target.value)}
                className="px-2.5 py-1.5 rounded-xl bg-neutral-50 border border-neutral-300 text-xs font-semibold text-neutral-800 focus:outline-none focus:ring-1 focus:ring-brand-500 cursor-pointer"
              >
                <option value="ALL">All Stages ({pipelineApplicants.length})</option>
                <option value="REVIEW">New ({applicants.filter((a) => a.status === 'REVIEW').length})</option>
                <option value="CONTACTED">Contacted ({applicants.filter((a) => a.status === 'CONTACTED').length})</option>
                <option value="SHORTLISTED">Shortlisted ({applicants.filter((a) => a.status === 'SHORTLISTED').length})</option>
                <option value="OFFERED">Offer Extended ({applicants.filter((a) => a.status === 'OFFERED').length})</option>
              </select>
            </div>
          )}

          {/* Hired Notice Link (When candidate was moved to Active Interns) */}
          {hiredApplicants.length > 0 && onNavigateToActiveTab && (
            <button
              type="button"
              onClick={onNavigateToActiveTab}
              className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 px-2.5 py-1.5 rounded-xl flex items-center gap-1 transition-colors cursor-pointer shrink-0"
              title="Candidates marked as Hired are managed in the Active Interns tab"
            >
              <UserCheck className="w-3 h-3 text-emerald-600" />
              <span>{hiredApplicants.length} Hired in Active Interns →</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Applications Table Container */}
      <div className="rounded-2xl border border-neutral-200/90 bg-white overflow-hidden shadow-2xs">
        {/* SUB-TAB 1: Active Pipeline (Excludes Not Selected & Excludes Hired) */}
        {activeSubTab === 'pipeline' && (
          <>
            {filteredPipelineApplicants.length === 0 ? (
              <div className="p-14 text-center space-y-2">
                <Sparkles className="w-7 h-7 text-neutral-300 mx-auto" />
                <p className="text-sm font-semibold text-neutral-900">No active applicants in pipeline</p>
                <p className="text-xs text-neutral-500">
                  {searchQuery
                    ? 'No active pipeline candidates match your search.'
                    : 'All candidates are either Hired in the Active Interns tab or archived under Not Selected.'}
                </p>
              </div>
            ) : (
              <>
                {/* Desktop Grid */}
                <div className="hidden lg:block overflow-x-auto">
                  <div className="min-w-[1020px]">
                    <div className="grid grid-cols-[minmax(250px,2fr)_minmax(140px,1.2fr)_95px_135px_80px_minmax(250px,auto)] items-center gap-4 px-5 py-3 bg-neutral-50/90 border-b border-neutral-200 text-[11px] font-bold text-neutral-500 uppercase tracking-wider font-mono">
                      <div>Candidate</div>
                      <div>Track / Domain</div>
                      <div>Duration</div>
                      <div>Status</div>
                      <div>Applied</div>
                      <div className="text-right">Actions</div>
                    </div>
                    <div className="divide-y divide-neutral-100">
                      {filteredPipelineApplicants.map(renderApplicantRow)}
                    </div>
                  </div>
                </div>

                {/* Mobile Cards */}
                <div className="lg:hidden divide-y divide-neutral-100">
                  {filteredPipelineApplicants.map(renderApplicantCard)}
                </div>
              </>
            )}
          </>
        )}

        {/* SUB-TAB 2: Not Selected (Separate Tab for Rejected Applicants) */}
        {activeSubTab === 'rejected' && (
          <>
            {filteredRejectedApplicants.length === 0 ? (
              <div className="p-14 text-center space-y-2">
                <XCircle className="w-7 h-7 text-neutral-300 mx-auto" />
                <p className="text-sm font-semibold text-neutral-900">No rejected candidates found</p>
                <p className="text-xs text-neutral-500">
                  Applicants marked as &quot;Not Selected&quot; will be archived here away from the active pipeline.
                </p>
              </div>
            ) : (
              <>
                {/* Desktop Grid */}
                <div className="hidden lg:block overflow-x-auto">
                  <div className="min-w-[1020px]">
                    <div className="grid grid-cols-[minmax(250px,2fr)_minmax(140px,1.2fr)_95px_135px_80px_minmax(250px,auto)] items-center gap-4 px-5 py-3 bg-neutral-100/90 border-b border-neutral-200 text-[11px] font-bold text-neutral-600 uppercase tracking-wider font-mono">
                      <div>Archived Candidate</div>
                      <div>Track / Domain</div>
                      <div>Duration</div>
                      <div>Status</div>
                      <div>Applied</div>
                      <div className="text-right">Actions</div>
                    </div>
                    <div className="divide-y divide-neutral-100">
                      {filteredRejectedApplicants.map(renderApplicantRow)}
                    </div>
                  </div>
                </div>

                {/* Mobile Cards */}
                <div className="lg:hidden divide-y divide-neutral-100">
                  {filteredRejectedApplicants.map(renderApplicantCard)}
                </div>
              </>
            )}
          </>
        )}

        {/* SUB-TAB 3: All Applications (Grouped by status with Not Selected at the bottom) */}
        {activeSubTab === 'all' && (
          <>
            {filteredPipelineApplicants.length === 0 &&
            filteredRejectedApplicants.length === 0 &&
            filteredHiredApplicants.length === 0 ? (
              <div className="p-14 text-center space-y-2">
                <p className="text-sm font-semibold text-neutral-900">No applicants found</p>
                <p className="text-xs text-neutral-500">
                  Applications submitted on the public website will appear here in real time.
                </p>
              </div>
            ) : (
              <>
                {/* Desktop Grid */}
                <div className="hidden lg:block overflow-x-auto">
                  <div className="min-w-[1020px]">
                    <div className="grid grid-cols-[minmax(250px,2fr)_minmax(140px,1.2fr)_95px_135px_80px_minmax(250px,auto)] items-center gap-4 px-5 py-3 bg-neutral-50/90 border-b border-neutral-200 text-[11px] font-bold text-neutral-500 uppercase tracking-wider font-mono">
                      <div>Candidate</div>
                      <div>Track / Domain</div>
                      <div>Duration</div>
                      <div>Status</div>
                      <div>Applied</div>
                      <div className="text-right">Actions</div>
                    </div>

                    {/* GROUP 1: Active Recruitment Pipeline */}
                    {filteredPipelineApplicants.length > 0 && (
                      <div>
                        <div className="px-5 py-2.5 bg-neutral-100/70 border-b border-neutral-200 flex items-center justify-between text-xs font-bold text-neutral-700">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-brand-500" />
                            <span>Active Recruitment Pipeline ({filteredPipelineApplicants.length})</span>
                          </div>
                          <span className="text-[11px] text-neutral-400 font-mono">In Progress</span>
                        </div>
                        <div className="divide-y divide-neutral-100">
                          {filteredPipelineApplicants.map(renderApplicantRow)}
                        </div>
                      </div>
                    )}

                    {/* GROUP 2: Not Selected (Placed cleanly at the BOTTOM) */}
                    {filteredRejectedApplicants.length > 0 && (
                      <div>
                        <div className="px-5 py-2.5 bg-neutral-100/90 border-y border-neutral-200 flex items-center justify-between text-xs font-bold text-neutral-600 mt-2">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-neutral-400" />
                            <span>Not Selected / Archived ({filteredRejectedApplicants.length})</span>
                          </div>
                          <span className="text-[11px] text-neutral-400 font-mono">Closed Applications</span>
                        </div>
                        <div className="divide-y divide-neutral-100">
                          {filteredRejectedApplicants.map(renderApplicantRow)}
                        </div>
                      </div>
                    )}

                    {/* GROUP 3: Hired Interns (Transferred to Active Interns) */}
                    {filteredHiredApplicants.length > 0 && (
                      <div>
                        <div className="px-5 py-2.5 bg-emerald-50/80 border-y border-emerald-200 flex items-center justify-between text-xs font-bold text-emerald-900 mt-2">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                            <span>Hired Candidates ({filteredHiredApplicants.length}) — Active Interns Directory</span>
                          </div>
                          {onNavigateToActiveTab && (
                            <button
                              type="button"
                              onClick={onNavigateToActiveTab}
                              className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-900 underline flex items-center gap-1 cursor-pointer"
                            >
                              <span>Manage in Active Interns tab</span>
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                        <div className="divide-y divide-neutral-100">
                          {filteredHiredApplicants.map(renderApplicantRow)}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Mobile Cards with Groupings */}
                <div className="lg:hidden divide-y divide-neutral-100">
                  {filteredPipelineApplicants.length > 0 && (
                    <div>
                      <div className="px-4 py-2 bg-neutral-100 text-xs font-bold text-neutral-700 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-brand-500" />
                        <span>Active Pipeline ({filteredPipelineApplicants.length})</span>
                      </div>
                      <div className="divide-y divide-neutral-100">
                        {filteredPipelineApplicants.map(renderApplicantCard)}
                      </div>
                    </div>
                  )}

                  {filteredRejectedApplicants.length > 0 && (
                    <div className="mt-3">
                      <div className="px-4 py-2 bg-neutral-100 text-xs font-bold text-neutral-600 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-neutral-400" />
                        <span>Not Selected ({filteredRejectedApplicants.length})</span>
                      </div>
                      <div className="divide-y divide-neutral-100">
                        {filteredRejectedApplicants.map(renderApplicantCard)}
                      </div>
                    </div>
                  )}

                  {filteredHiredApplicants.length > 0 && (
                    <div className="mt-3">
                      <div className="px-4 py-2 bg-emerald-50 text-xs font-bold text-emerald-800 flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          <span>Hired ({filteredHiredApplicants.length})</span>
                        </span>
                        {onNavigateToActiveTab && (
                          <button
                            type="button"
                            onClick={onNavigateToActiveTab}
                            className="text-[11px] underline cursor-pointer"
                          >
                            Active Tab →
                          </button>
                        )}
                      </div>
                      <div className="divide-y divide-neutral-100">
                        {filteredHiredApplicants.map(renderApplicantCard)}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </>
        )}
      </div>

      {/* Offer Letter Studio Modal */}
      {selectedForOffer && (
        <OfferLetterStudioModal
          applicant={selectedForOffer}
          defaultNextOfferRef={selectedForOffer.offerRef || defaultNextOfferRef}
          emailSubjectTemplate={settings?.offerEmailSubjectTemplate}
          emailBodyTemplate={settings?.offerEmailBodyTemplate}
          founderBccEmails={settings?.founderBccEmails}
          onClose={() => setSelectedForOffer(null)}
          onSuccess={() => {
            setSelectedForOffer(null);
            onRefresh();
          }}
        />
      )}

      {/* Official Candidate Outreach Email Modal */}
      {outreachModalApplicant && (
        <OutreachEmailModal
          applicant={outreachModalApplicant}
          settings={settings}
          isOpen={Boolean(outreachModalApplicant)}
          onClose={() => setOutreachModalApplicant(null)}
          onEmailSent={onRefresh}
          onMarkContacted={async (appId) => {
            try {
              await fetch(`/api/admin/internships/applicants/${appId}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'CONTACTED' }),
              });
              onRefresh();
            } catch (err) {
              console.error('Failed to mark contacted:', err);
            }
          }}
        />
      )}
    </div>
  );
}
