'use client';

import React from 'react';
import {
  Search,
  ExternalLink,
  ChevronRight,
  FileText,
  Phone,
  Mail,
  Clock,
  Briefcase,
  User,
} from 'lucide-react';

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

interface ApplicantsTableProps {
  applicants: Applicant[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  onSelectApplicant: (applicant: Applicant) => void;
}

const STATUS_BADGES: Record<string, { label: string; className: string }> = {
  REVIEW: { label: 'New', className: 'bg-amber-50 text-amber-700 border-amber-200' },
  CONTACTED: { label: 'Contacted', className: 'bg-blue-50 text-blue-700 border-blue-200' },
  SHORTLISTED: { label: 'Shortlisted', className: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  REJECTED: { label: 'Not Selected', className: 'bg-neutral-100 text-neutral-600 border-neutral-300' },
  OFFERED: { label: 'Offer Extended', className: 'bg-yellow-50 text-yellow-800 border-yellow-200' },
  ACCEPTED: { label: 'Accepted', className: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
};

export function ApplicantsTable({
  applicants,
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  onSelectApplicant,
}: ApplicantsTableProps) {
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

        {/* Status filter */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-neutral-500 font-medium">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-neutral-50 border border-neutral-300 text-xs font-semibold text-neutral-800 focus:outline-none focus:ring-1 focus:ring-brand-500"
          >
            <option value="ALL">All Applicants</option>
            <option value="REVIEW">New</option>
            <option value="CONTACTED">Contacted</option>
            <option value="SHORTLISTED">Shortlisted</option>
            <option value="REJECTED">Not Selected</option>
          </select>
        </div>
      </div>

      {/* Applications List */}
      <div className="rounded-2xl border border-neutral-200/90 bg-white overflow-hidden shadow-2xs divide-y divide-neutral-100">
        {applicants.length === 0 ? (
          <div className="p-12 text-center space-y-2">
            <p className="text-sm font-semibold text-neutral-900">No applicants found</p>
            <p className="text-xs text-neutral-500">
              Applications submitted on the public website will appear here in real time.
            </p>
          </div>
        ) : (
          applicants.map((app) => {
            const statusObj = STATUS_BADGES[app.status] || {
              label: app.status,
              className: 'bg-neutral-100 text-neutral-700 border-neutral-200',
            };
            const roleName = app.preferredDomains?.[0] || app.roleAppliedFor || 'General Software / Tech';
            const duration = app.weeklyAvailability || app.duration || '3 Months';

            return (
              <div
                key={app.id}
                onClick={() => onSelectApplicant(app)}
                className="p-4 sm:p-5 hover:bg-neutral-50/70 transition-colors cursor-pointer flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group"
              >
                {/* Left Column: Candidate Info */}
                <div className="flex items-start gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 text-brand-700 flex items-center justify-center font-bold text-sm shrink-0">
                    {app.fullName.charAt(0).toUpperCase()}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-bold text-neutral-950 group-hover:text-brand-700 transition-colors">
                        {app.fullName}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${statusObj.className}`}>
                        {statusObj.label}
                      </span>
                    </div>

                    <p className="text-xs text-neutral-600 mt-0.5 truncate">
                      {app.institution} • {app.yearOfStudy}
                    </p>

                    <div className="flex items-center gap-3 mt-1.5 text-xs text-neutral-500 font-mono flex-wrap">
                      {app.phone && (
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3 text-neutral-400" />
                          <span>{app.phone}</span>
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3 text-neutral-400" />
                        <span className="truncate max-w-[200px]">{app.email}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Middle Column: Role & Duration */}
                <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-start sm:items-center gap-2 shrink-0">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-semibold text-brand-700 bg-purple-50/80 border border-purple-200">
                    {roleName}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg text-xs font-medium text-neutral-600 bg-neutral-100 border border-neutral-200">
                    {duration}
                  </span>
                </div>

                {/* Right Column: Actions & Date */}
                <div className="flex items-center gap-3 shrink-0 w-full md:w-auto justify-between md:justify-end pt-2 md:pt-0 border-t md:border-t-0 border-neutral-100">
                  <span className="text-[11px] text-neutral-400 font-mono">
                    {new Date(app.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                    })}
                  </span>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectApplicant(app);
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-xs font-semibold text-neutral-700 flex items-center gap-1 group-hover:border-brand-500 group-hover:text-brand-700 transition-colors"
                  >
                    <span>View</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
