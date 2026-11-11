'use client';

import React, { useState } from 'react';
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

export function ApplicantsTable({
  applicants,
  settings,
  defaultNextOfferRef = 'KT/INT/2026/004',
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  onSelectApplicant,
  onRefresh,
}: ApplicantsTableProps) {
  const [selectedForOffer, setSelectedForOffer] = useState<Applicant | null>(null);
  const [outreachModalApplicant, setOutreachModalApplicant] = useState<Applicant | null>(null);

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

  // Manual mark as Hired
  const handleManualMarkHired = async (e: React.MouseEvent, appId: string) => {
    e.stopPropagation();
    try {
      await fetch(`/api/admin/internships/applicants/${appId}/hire`, {
        method: 'POST',
      });
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
              onClick={(e) => handleManualMarkHired(e, app.id)}
              title="Candidate accepted offer - mark as Hired"
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
            <span>Hired</span>
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

  return (
    <div className="space-y-4">
      {/* Search & Filter Bar */}
      <div className="p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by student, college, phone..."
            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-neutral-50 border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
          />
        </div>

        {/* Status filter & Counter */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <span className="text-xs text-neutral-500 font-mono hidden sm:inline">
            {applicants.length} {applicants.length === 1 ? 'applicant' : 'applicants'}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-500 font-medium">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => onStatusFilterChange(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-neutral-50 border border-neutral-300 text-xs font-semibold text-neutral-800 focus:outline-none focus:ring-1 focus:ring-brand-500 cursor-pointer"
            >
              <option value="ALL">All Applicants</option>
              <option value="REVIEW">New</option>
              <option value="CONTACTED">Contacted</option>
              <option value="SHORTLISTED">Shortlisted</option>
              <option value="OFFERED">Offer Extended</option>
              <option value="ACCEPTED">Hired / Accepted</option>
              <option value="REJECTED">Not Selected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Applications Table Card */}
      <div className="rounded-2xl border border-neutral-200/90 bg-white overflow-hidden shadow-2xs">
        {applicants.length === 0 ? (
          <div className="p-12 text-center space-y-2">
            <p className="text-sm font-semibold text-neutral-900">No applicants found</p>
            <p className="text-xs text-neutral-500">
              Applications submitted on the public website will appear here in real time.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Structured Tabular Grid (lg and above) */}
            <div className="hidden lg:block overflow-x-auto">
              <div className="min-w-[1020px]">
                {/* Table Header Row */}
                <div className="grid grid-cols-[minmax(250px,2fr)_minmax(140px,1.2fr)_95px_135px_80px_minmax(250px,auto)] items-center gap-4 px-5 py-3 bg-neutral-50/90 border-b border-neutral-200 text-[11px] font-bold text-neutral-500 uppercase tracking-wider font-mono">
                  <div>Candidate</div>
                  <div>Track / Domain</div>
                  <div>Duration</div>
                  <div>Status</div>
                  <div>Applied</div>
                  <div className="text-right">Actions</div>
                </div>

                {/* Table Body Rows */}
                <div className="divide-y divide-neutral-100">
                  {applicants.map((app) => {
                    const statusObj = STATUS_BADGES[app.status] || {
                      label: app.status,
                      className: 'bg-neutral-100 text-neutral-700 border-neutral-200',
                    };
                    const roleName = app.preferredDomains?.[0] || app.roleAppliedFor || 'AI/ML Intern';
                    const duration = app.weeklyAvailability || app.duration || '1 Month';
                    const offerRef = app.offerRef || app.offerDetails?.offerRef;

                    // Clean phone for WhatsApp
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

                    return (
                      <div
                        key={app.id}
                        onClick={() => onSelectApplicant(app)}
                        className="grid grid-cols-[minmax(250px,2fr)_minmax(140px,1.2fr)_95px_135px_80px_minmax(250px,auto)] items-center gap-4 px-5 py-3 hover:bg-neutral-50/80 transition-colors cursor-pointer group"
                      >
                        {/* Col 1: Candidate Info */}
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-9 h-9 rounded-xl bg-purple-50/90 border border-purple-200/80 text-brand-700 flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                            {app.fullName.charAt(0).toUpperCase()}
                          </div>

                          <div className="min-w-0">
                            <h4 className="text-sm font-bold text-neutral-900 group-hover:text-brand-700 transition-colors truncate">
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
                            className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold text-brand-700 bg-purple-50/80 border border-purple-200/80 truncate max-w-full"
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

                        {/* Col 6: Actions (Right-aligned) */}
                        <div className="flex items-center justify-end">
                          {renderActionButtons(app, waPhone, waMessage, offerRef)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Mobile / Tablet Card View (< lg) */}
            <div className="lg:hidden divide-y divide-neutral-100">
              {applicants.map((app) => {
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

                return (
                  <div
                    key={app.id}
                    onClick={() => onSelectApplicant(app)}
                    className="p-4 hover:bg-neutral-50/70 transition-colors cursor-pointer space-y-3"
                  >
                    {/* Top Row: Candidate Avatar, Name, Status, Date */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-xl bg-purple-50/90 border border-purple-200/80 text-brand-700 flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
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

                    {/* Middle Row: Track, Duration, Offer Ref Chips */}
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

                    {/* Contact Details */}
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

                    {/* Bottom Row: Actions */}
                    <div className="flex items-center justify-between gap-2 pt-2 border-t border-neutral-100">
                      <span className="text-[10.5px] font-mono text-neutral-400">Actions</span>
                      {renderActionButtons(app, waPhone, waMessage, offerRef)}
                    </div>
                  </div>
                );
              })}
            </div>
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
