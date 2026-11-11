'use client';

import React, { useState } from 'react';
import {
  Search,
  FileText,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  Download,
  Award,
  ChevronDown,
  ChevronUp,
  Loader2,
  UserCheck,
} from 'lucide-react';

interface ActiveIntern {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  institution: string;
  roleAppliedFor?: string | null;
  duration?: string | null;
  weeklyAvailability?: string;
  status: string;
  offerRef?: string | null;
  offerDetails?: any;
  hiredAt?: string | null;
  createdAt: string;
  dailyRecords?: any[];
}

interface ActiveInternsTableProps {
  interns: ActiveIntern[];
  defaultNextOfferRef: string;
  onRefresh: () => void;
}

export function ActiveInternsTable({
  interns,
  defaultNextOfferRef,
  onRefresh,
}: ActiveInternsTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedInternId, setExpandedInternId] = useState<string | null>(null);

  // New Note Modal / Inline state
  const [activeNoteInternId, setActiveNoteInternId] = useState<string | null>(null);
  const [newNoteText, setNewNoteText] = useState('');
  const [isSubmittingNote, setIsSubmittingNote] = useState(false);

  // Completion State
  const [completingInternId, setCompletingInternId] = useState<string | null>(null);
  const [completionFeedback, setCompletionFeedback] = useState('');
  const [isCompleting, setIsCompleting] = useState(false);

  // Filtered interns
  const filteredInterns = interns.filter((i) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      i.fullName.toLowerCase().includes(q) ||
      i.email.toLowerCase().includes(q) ||
      (i.offerRef && i.offerRef.toLowerCase().includes(q)) ||
      i.institution.toLowerCase().includes(q) ||
      (i.roleAppliedFor && i.roleAppliedFor.toLowerCase().includes(q))
    );
  });

  // Handle Add Daily Record
  const handleAddDailyRecord = async (internId: string) => {
    if (!newNoteText.trim()) return;
    setIsSubmittingNote(true);

    try {
      const res = await fetch(`/api/admin/internships/applicants/${internId}/daily-records`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ note: newNoteText.trim() }),
      });

      if (!res.ok) throw new Error('Failed to log daily record');

      setNewNoteText('');
      setActiveNoteInternId(null);
      onRefresh();
    } catch {
      alert('Could not add record note.');
    } finally {
      setIsSubmittingNote(false);
    }
  };

  // Handle Mark Completed
  const handleMarkCompleted = async (internId: string) => {
    setIsCompleting(true);

    try {
      const res = await fetch(`/api/admin/internships/applicants/${internId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'COMPLETED',
          completionFeedback: completionFeedback.trim() || 'Internship completed successfully.',
        }),
      });

      if (!res.ok) throw new Error('Failed to mark as completed');

      setCompletingInternId(null);
      setCompletionFeedback('');
      onRefresh();
    } catch {
      alert('Failed to update status.');
    } finally {
      setIsCompleting(false);
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (interns.length === 0) return;

    const headers = [
      'Offer Ref',
      'Name',
      'Email',
      'Phone',
      'College',
      'Designation',
      'Period',
      'Work Mode',
      'Status',
      'Hired Date',
    ];

    const rows = interns.map((i) => [
      i.offerRef || i.offerDetails?.offerRef || 'N/A',
      `"${i.fullName}"`,
      i.email,
      i.phone || 'N/A',
      `"${i.institution}"`,
      `"${i.offerDetails?.designation || i.roleAppliedFor || 'N/A'}"`,
      `"${i.offerDetails?.period || 'N/A'}"`,
      i.offerDetails?.workMode || 'Remote',
      i.status,
      i.hiredAt ? new Date(i.hiredAt).toLocaleDateString('en-GB') : 'N/A',
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `KAIROTRIX_Active_Interns_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4">
      {/* Top Filter & Export Bar */}
      <div className="p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by intern name, Offer Ref, college..."
            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-neutral-50 border border-neutral-300 text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            type="button"
            onClick={handleExportCSV}
            disabled={interns.length === 0}
            className="px-3.5 py-2 rounded-xl bg-white border border-neutral-200/90 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 hover:text-neutral-950 shadow-2xs transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
            title="Export CSV for internal HRMS system"
          >
            <Download className="w-3.5 h-3.5 text-brand-600" />
            <span>Export to CSV (HRMS)</span>
          </button>
        </div>
      </div>

      {/* Interns List */}
      <div className="rounded-2xl border border-neutral-200/90 bg-white overflow-hidden shadow-2xs divide-y divide-neutral-100">
        {filteredInterns.length === 0 ? (
          <div className="p-16 text-center space-y-2">
            <UserCheck className="w-8 h-8 text-neutral-400 mx-auto" />
            <p className="text-sm font-semibold text-neutral-900">No active interns found</p>
            <p className="text-xs text-neutral-500">
              When candidates accept their offer letters, marking them as "Hired" will move them here.
            </p>
          </div>
        ) : (
          filteredInterns.map((intern) => {
            const role = intern.offerDetails?.designation || intern.roleAppliedFor || 'AI/ML Intern';
            const period = intern.offerDetails?.period || '1 Month';
            const ref = intern.offerRef || intern.offerDetails?.offerRef || 'N/A';
            const isExpanded = expandedInternId === intern.id;
            const dailyLogs = Array.isArray(intern.dailyRecords) ? intern.dailyRecords : [];

            return (
              <div key={intern.id} className="p-5 hover:bg-neutral-50/50 transition-colors space-y-4">
                {/* Main Card Header */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  {/* Left Column: Intern info */}
                  <div className="flex items-start gap-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 text-brand-700 flex items-center justify-center font-bold text-sm shrink-0">
                      {intern.fullName.charAt(0).toUpperCase()}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-bold text-neutral-950">
                          {intern.fullName}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-purple-100 text-brand-800 border border-purple-200">
                          {ref}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${
                            intern.status === 'COMPLETED'
                              ? 'bg-neutral-100 text-neutral-700 border-neutral-300'
                              : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          }`}
                        >
                          {intern.status === 'COMPLETED' ? 'Completed' : 'Active Intern'}
                        </span>
                      </div>

                      <p className="text-xs text-neutral-600 mt-0.5 truncate">
                        {intern.institution} • {intern.phone || 'No phone'} • {intern.email}
                      </p>
                    </div>
                  </div>

                  {/* Middle Column: Role & Period */}
                  <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-start sm:items-center gap-2 shrink-0 text-xs">
                    <span className="px-2.5 py-1 rounded-lg font-semibold text-brand-700 bg-purple-50 border border-purple-200">
                      {role}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg font-mono text-neutral-600 bg-neutral-100 border border-neutral-200 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-neutral-400" />
                      <span>{period}</span>
                    </span>
                  </div>

                  {/* Right Column: Quick Action buttons */}
                  <div className="flex items-center gap-2 shrink-0 w-full md:w-auto justify-end pt-2 md:pt-0 border-t md:border-t-0 border-neutral-100">
                    <button
                      type="button"
                      onClick={() => setExpandedInternId(isExpanded ? null : intern.id)}
                      className="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200/90 text-brand-700 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>Daily Records ({dailyLogs.length})</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Section: Daily Records / Activity Notes */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-neutral-200/70 space-y-4 bg-neutral-50/70 p-4 rounded-2xl">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-brand-600" />
                        <span>Daily Activity & Progress Logs</span>
                      </h4>

                      <div className="flex items-center gap-2">
                        {intern.status !== 'COMPLETED' && (
                          <button
                            type="button"
                            onClick={() => setCompletingInternId(intern.id)}
                            className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
                          >
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>Mark Completed</span>
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => setActiveNoteInternId(activeNoteInternId === intern.id ? null : intern.id)}
                          className="px-2.5 py-1 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-[11px] font-semibold flex items-center gap-1 shadow-2xs cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add Daily Record</span>
                        </button>
                      </div>
                    </div>

                    {/* Completion Notice (Certificate Pending) */}
                    {intern.status === 'COMPLETED' && (
                      <div className="p-3 rounded-xl bg-purple-50/80 border border-purple-200 text-brand-800 text-xs flex items-center gap-2">
                        <Award className="w-4 h-4 shrink-0 text-brand-600" />
                        <span>
                          <strong>Internship Completed:</strong> Certificate issuance is on hold pending official template approval.
                        </span>
                      </div>
                    )}

                    {/* Inline Add Note Input */}
                    {activeNoteInternId === intern.id && (
                      <div className="p-3 rounded-xl bg-white border border-neutral-300 space-y-2">
                        <textarea
                          rows={2}
                          value={newNoteText}
                          onChange={(e) => setNewNoteText(e.target.value)}
                          placeholder="Log daily tasks, milestone completion, standup notes, or feedback..."
                          className="w-full p-2.5 rounded-lg bg-neutral-50 border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:ring-1 focus:ring-brand-500"
                        />
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setActiveNoteInternId(null)}
                            className="px-2.5 py-1 rounded-lg text-xs text-neutral-600 hover:bg-neutral-100 cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            disabled={isSubmittingNote || !newNoteText.trim()}
                            onClick={() => handleAddDailyRecord(intern.id)}
                            className="px-3 py-1 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer disabled:opacity-50"
                          >
                            {isSubmittingNote ? <Loader2 className="w-3 h-3 animate-spin" /> : null}
                            <span>Save Record</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Complete Dialog */}
                    {completingInternId === intern.id && (
                      <div className="p-3 rounded-xl bg-white border border-emerald-300 space-y-2">
                        <p className="text-xs font-semibold text-neutral-900">
                          Mark internship as completed for <strong>{intern.fullName}</strong>:
                        </p>
                        <input
                          type="text"
                          value={completionFeedback}
                          onChange={(e) => setCompletionFeedback(e.target.value)}
                          placeholder="Final remarks or project feedback..."
                          className="w-full p-2 rounded-lg bg-neutral-50 border border-neutral-200 text-xs text-neutral-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setCompletingInternId(null)}
                            className="px-2.5 py-1 rounded-lg text-xs text-neutral-600 hover:bg-neutral-100 cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            disabled={isCompleting}
                            onClick={() => handleMarkCompleted(intern.id)}
                            className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer"
                          >
                            {isCompleting ? <Loader2 className="w-3 h-3 animate-spin" /> : null}
                            <span>Confirm Completed</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* List of Logs */}
                    {dailyLogs.length === 0 ? (
                      <p className="text-xs text-neutral-400 italic">No daily activity records logged yet.</p>
                    ) : (
                      <div className="space-y-2">
                        {dailyLogs.map((log: any, idx: number) => (
                          <div
                            key={log.id || idx}
                            className="p-3 rounded-xl bg-white border border-neutral-200 text-xs flex items-start justify-between gap-3 shadow-2xs"
                          >
                            <div className="space-y-0.5">
                              <p className="text-neutral-900 font-medium leading-relaxed">{log.note}</p>
                              <p className="text-[10px] text-neutral-400 font-mono">
                                Logged by {log.author || 'Admin'} •{' '}
                                {new Date(log.date).toLocaleDateString('en-GB', {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

