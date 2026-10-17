'use client';

import React, { useState, useEffect } from 'react';
import {
  Users,
  Briefcase,
  RefreshCw,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { ApplicantsTable } from '@/components/admin/internships/ApplicantsTable';
import { ApplicantDetailDrawer } from '@/components/admin/internships/ApplicantDetailDrawer';
import { RolesManager } from '@/components/admin/internships/RolesManager';

export default function AdminInternshipsPage() {
  const [activeTab, setActiveTab] = useState<'applicants' | 'roles'>('applicants');

  // Data State
  const [applicants, setApplicants] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Selected Applicant for Detail Drawer
  const [selectedApplicant, setSelectedApplicant] = useState<any | null>(null);

  // Fetch Data
  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (statusFilter !== 'ALL') params.append('status', statusFilter);
      if (searchQuery.trim()) params.append('search', searchQuery.trim());

      const [applicantsRes, rolesRes] = await Promise.all([
        fetch(`/api/admin/internships/applicants?${params.toString()}`),
        fetch('/api/admin/internships/roles'),
      ]);

      if (!applicantsRes.ok) throw new Error('Failed to load applicants');
      if (!rolesRes.ok) throw new Error('Failed to load internship roles');

      const applicantsData = await applicantsRes.json();
      const rolesData = await rolesRes.json();

      setApplicants(applicantsData.applicants || []);
      setRoles(rolesData.roles || []);

      if (selectedApplicant) {
        const updated = (applicantsData.applicants || []).find(
          (a: any) => a.id === selectedApplicant.id
        );
        if (updated) setSelectedApplicant(updated);
      }
    } catch (err: unknown) {
      const e = err as Error;
      setError(e.message || 'An error occurred fetching internship data.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [statusFilter]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 350);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-brand-500" />
            <span className="text-xs uppercase tracking-wider text-neutral-500 font-semibold font-mono">
              Internship Console
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight">
            Internship Applications
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 mt-1">
            View submitted applications, open candidate resumes, and reach out directly.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchData}
          disabled={isLoading}
          className="px-3.5 py-2 rounded-xl bg-white border border-neutral-200/90 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 hover:text-neutral-950 shadow-2xs transition-colors flex items-center gap-2 cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-brand-600' : 'text-neutral-500'}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-neutral-200 pb-px">
        <button
          type="button"
          onClick={() => setActiveTab('applicants')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-semibold border-b-2 transition-all cursor-pointer ${
            activeTab === 'applicants'
              ? 'border-brand-600 text-brand-700 bg-brand-50/50 font-bold'
              : 'border-transparent text-neutral-600 hover:text-neutral-900'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Applications ({applicants.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('roles')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-semibold border-b-2 transition-all cursor-pointer ${
            activeTab === 'roles'
              ? 'border-brand-600 text-brand-700 bg-brand-50/50 font-bold'
              : 'border-transparent text-neutral-600 hover:text-neutral-900'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Manage Roles ({roles.length})</span>
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Content */}
      {isLoading && applicants.length === 0 ? (
        <div className="p-16 flex flex-col items-center justify-center text-neutral-500 gap-3">
          <Loader2 className="w-6 h-6 text-brand-600 animate-spin" />
          <span className="text-xs">Loading applications...</span>
        </div>
      ) : (
        <>
          {activeTab === 'applicants' && (
            <ApplicantsTable
              applicants={applicants}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              onSelectApplicant={(app) => setSelectedApplicant(app)}
            />
          )}

          {activeTab === 'roles' && (
            <RolesManager
              roles={roles}
              onRefresh={fetchData}
            />
          )}
        </>
      )}

      {/* Simplified Detail Drawer */}
      {selectedApplicant && (
        <ApplicantDetailDrawer
          applicant={selectedApplicant}
          onClose={() => setSelectedApplicant(null)}
          onRefresh={fetchData}
        />
      )}
    </div>
  );
}
