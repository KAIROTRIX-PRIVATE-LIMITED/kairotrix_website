'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Users,
  Plus,
  Edit3,
  Trash2,
  CheckCircle2,
  PauseCircle,
  Eye,
  EyeOff,
  ExternalLink,
  X,
  AlertCircle,
  Loader2,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import MediaUploader from '@/components/admin/MediaUploader';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  badge?: string | null;
  image: string;
  twitter?: string | null;
  linkedin?: string | null;
  github?: string | null;
  order: number;
  isActive: boolean;
}

const PRESET_IMAGES = [
  { label: 'Ethan Cole (Founder)', url: '/assets/images/about/team-ethan.jpg' },
  { label: 'Grace Thompson (AI PM)', url: '/assets/images/about/team-grace.jpg' },
  { label: 'Sophia Bennett (Design)', url: '/assets/images/about/team-sophia.jpg' },
  { label: 'Ava Morgan (Developer)', url: '/assets/images/about/team-ava.jpg' },
  { label: 'Maya Clarke (QA)', url: '/assets/images/about/team-maya.jpg' },
];

export default function AdminTeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [isSectionVisible, setIsSectionVisible] = useState<boolean>(true);
  const [loading, setLoading] = useState(true);
  const [togglingVisibility, setTogglingVisibility] = useState(false);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Auto-dismiss toast
  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(null), 3500);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [formSaving, setFormSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Form Fields
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    badge: '',
    image: '/assets/images/about/team-ethan.jpg',
    twitter: '',
    linkedin: '',
    github: '',
    order: 0,
    isActive: true,
  });

  const fetchData = async () => {
    try {
      const res = await fetch('/api/admin/team');
      if (res.ok) {
        const data = await res.json();
        setMembers(data.members || []);
        setIsSectionVisible(data.isTeamSectionVisible ?? true);
      }
    } catch (err) {
      console.error('Failed to fetch team data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 1-Click Master Visibility Toggle
  const handleToggleSectionVisibility = async () => {
    const targetState = !isSectionVisible;
    setIsSectionVisible(targetState);
    setTogglingVisibility(true);

    try {
      const res = await fetch('/api/admin/team/visibility', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isVisible: targetState }),
      });

      if (res.ok) {
        const data = await res.json();
        setIsSectionVisible(data.isTeamSectionVisible);
        setToastMessage(
          data.isTeamSectionVisible
            ? 'Team section is now VISIBLE on /about'
            : 'Team section is now HIDDEN on /about'
        );
      } else {
        setIsSectionVisible(!targetState);
        setToastMessage('Failed to update visibility');
      }
    } catch (err) {
      console.error('Failed to toggle team visibility:', err);
      setIsSectionVisible(!targetState);
      setToastMessage('Network error updating visibility');
    } finally {
      setTogglingVisibility(false);
    }
  };

  // 1-Click Toggle Active for a specific member
  const handleToggleMember = async (id: string) => {
    setTogglingId(id);
    try {
      const res = await fetch(`/api/admin/team/${id}/toggle`, { method: 'PATCH' });
      if (res.ok) {
        const data = await res.json();
        setMembers((prev) =>
          prev.map((m) => (m.id === id ? { ...m, isActive: data.member.isActive } : m))
        );
        setToastMessage(
          data.member.isActive
            ? `${data.member.name} is now ACTIVE`
            : `${data.member.name} is now PAUSED`
        );
      }
    } catch (err) {
      console.error('Failed to toggle member active state:', err);
    } finally {
      setTogglingId(null);
    }
  };

  const openCreateModal = () => {
    setModalMode('create');
    setEditingMember(null);
    setFormData({
      name: '',
      role: '',
      badge: '',
      image: '/assets/images/about/team-ethan.jpg',
      twitter: '',
      linkedin: '',
      github: '',
      order: members.length,
      isActive: true,
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (member: TeamMember) => {
    setModalMode('edit');
    setEditingMember(member);
    setFormData({
      name: member.name,
      role: member.role,
      badge: member.badge || '',
      image: member.image,
      twitter: member.twitter || '',
      linkedin: member.linkedin || '',
      github: member.github || '',
      order: member.order,
      isActive: member.isActive,
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleDeleteMember = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete ${name}? This cannot be undone.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/team/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMembers((prev) => prev.filter((m) => m.id !== id));
        setToastMessage(`Deleted ${name} successfully.`);
      } else {
        const data = await res.json();
        setToastMessage(data.error || 'Failed to delete member');
      }
    } catch (err) {
      console.error('Failed to delete member:', err);
      setToastMessage('Network error deleting member');
    }
  };

  // Form Submit
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSaving(true);
    setFormError(null);

    try {
      if (!formData.name.trim() || !formData.role.trim()) {
        throw new Error('Name and Role are required.');
      }

      if (modalMode === 'create') {
        const res = await fetch('/api/admin/team', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to create team member');
        setMembers((prev) => [...prev, data.member]);
        setToastMessage(`Created ${data.member.name} successfully.`);
      } else if (editingMember) {
        const res = await fetch(`/api/admin/team/${editingMember.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to update team member');
        setMembers((prev) =>
          prev.map((m) => (m.id === editingMember.id ? data.member : m))
        );
        setToastMessage(`Updated ${data.member.name} successfully.`);
      }

      setIsModalOpen(false);
    } catch (err: unknown) {
      setFormError((err as Error).message);
    } finally {
      setFormSaving(false);
    }
  };

  return (
    <div className="space-y-8 text-neutral-900">
      {/* Top Banner & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-neutral-200/80">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200/90 text-brand-700 font-tech text-xs font-semibold tracking-wider uppercase mb-3 shadow-xs">
            <Users className="w-3.5 h-3.5 text-brand-600" />
            <span>KAIROTRIX TEAM MANAGEMENT</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-neutral-950 tracking-tight">
            Team &amp; Leadership Profiles
          </h1>
          <p className="text-sm text-neutral-600 mt-1 max-w-2xl">
            Control the &ldquo;People behind the work&rdquo; section on the public About page. Update member photos, titles, and social profile links.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-500 hover:to-brand-600 text-white font-tech text-xs font-bold uppercase tracking-wider transition-all shadow-xs flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Member</span>
        </button>
      </div>

      {/* Prominent Master Visibility Toggle Card */}
      <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div
            className={cn(
              'w-12 h-12 rounded-xl flex items-center justify-center transition-colors shrink-0',
              isSectionVisible
                ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                : 'bg-neutral-100 text-neutral-400 border border-neutral-200'
            )}
          >
            {isSectionVisible ? <Eye className="w-6 h-6" /> : <EyeOff className="w-6 h-6" />}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-base font-display font-semibold text-neutral-950">
                &ldquo;People behind the work&rdquo; Section
              </span>
              <span
                className={cn(
                  'px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold tracking-wider',
                  isSectionVisible
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-neutral-100 text-neutral-600 border border-neutral-200'
                )}
              >
                {isSectionVisible ? '🟢 VISIBLE ON /ABOUT' : '⏸️ HIDDEN ON /ABOUT'}
              </span>
            </div>
            <p className="text-xs text-neutral-600 mt-1">
              {isSectionVisible
                ? 'The team section is currently live and visible to visitors on the public About page.'
                : 'The team section is completely hidden from the public About page.'}
            </p>
          </div>
        </div>

        {/* Interactive Toggle Switch Button */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          <span className="text-xs font-mono font-semibold uppercase text-neutral-500">
            {isSectionVisible ? 'ON' : 'OFF'}
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={isSectionVisible}
            onClick={handleToggleSectionVisibility}
            disabled={togglingVisibility}
            className={cn(
              'relative inline-flex h-8 w-16 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none shadow-inner',
              isSectionVisible ? 'bg-brand-600 hover:bg-brand-500' : 'bg-neutral-300 hover:bg-neutral-400'
            )}
          >
            <span
              className={cn(
                'pointer-events-none inline-flex items-center justify-center h-7 w-7 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out text-neutral-950',
                isSectionVisible ? 'translate-x-8' : 'translate-x-0'
              )}
            >
              {togglingVisibility ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-brand-600" />
              ) : isSectionVisible ? (
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              ) : (
                <span className="w-2 h-2 rounded-full bg-neutral-400" />
              )}
            </span>
          </button>
        </div>
      </div>

      {/* Team Cards Grid */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3 text-neutral-500 font-mono text-xs">
          <Loader2 className="w-6 h-6 animate-spin text-brand-600" />
          <span>Loading team members...</span>
        </div>
      ) : members.length === 0 ? (
        <div className="py-16 text-center rounded-2xl bg-white border border-neutral-200/80 p-8 shadow-xs">
          <Users className="w-12 h-12 text-neutral-400 mx-auto mb-3 opacity-50" />
          <h3 className="text-neutral-950 font-display text-base font-semibold mb-1">No Team Members Found</h3>
          <p className="text-neutral-500 text-xs mb-4">Add your first team member using the button above.</p>
          <button
            onClick={openCreateModal}
            className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-tech font-bold uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Member</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member) => (
            <div
              key={member.id}
              className={cn(
                'rounded-2xl bg-white border transition-all duration-200 overflow-hidden flex flex-col',
                member.isActive
                  ? 'border-neutral-200/80 hover:border-brand-300 shadow-xs'
                  : 'border-neutral-200 opacity-60'
              )}
            >
              {/* Card Media Header */}
              <div className="relative w-full aspect-[4/5] bg-neutral-100 overflow-hidden">
                <Image
                  src={member.image || '/assets/images/about/team-ethan.jpg'}
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-top"
                />

                {/* Badge Overlay */}
                {member.badge && (
                  <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-neutral-200/80 text-[10px] font-mono uppercase tracking-wider font-semibold text-brand-700 shadow-xs">
                    {member.badge}
                  </div>
                )}

                {/* Status Indicator */}
                <div className="absolute top-3.5 left-3.5">
                  <span
                    className={cn(
                      'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase font-semibold backdrop-blur-md border shadow-xs',
                      member.isActive
                        ? 'bg-emerald-50/90 text-emerald-800 border-emerald-200'
                        : 'bg-neutral-100/90 text-neutral-600 border-neutral-200'
                    )}
                  >
                    <span
                      className={cn(
                        'w-1.5 h-1.5 rounded-full',
                        member.isActive ? 'bg-emerald-500 animate-pulse' : 'bg-neutral-400'
                      )}
                    />
                    <span>{member.isActive ? 'ACTIVE' : 'PAUSED'}</span>
                  </span>
                </div>
              </div>

              {/* Card Details Base */}
              <div className="p-5 flex flex-col justify-between flex-1 space-y-4">
                <div>
                  <h3 className="text-lg font-display font-semibold text-neutral-950 mb-0.5 truncate">
                    {member.name}
                  </h3>
                  <p className="text-xs font-mono uppercase tracking-wider text-brand-700 font-semibold">
                    {member.role}
                  </p>
                </div>

                {/* Social Links Indicator */}
                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    {member.twitter && (
                      <a
                        href={member.twitter}
                        target="_blank"
                        rel="noreferrer"
                        className="w-7 h-7 rounded-lg bg-neutral-100 hover:bg-neutral-200/80 text-neutral-700 flex items-center justify-center transition-colors shadow-xs"
                        title="Twitter / X Profile"
                      >
                        <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      </a>
                    )}
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="w-7 h-7 rounded-lg bg-neutral-100 hover:bg-neutral-200/80 text-neutral-700 flex items-center justify-center transition-colors shadow-xs"
                        title="LinkedIn Profile"
                      >
                        <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.68 1.68 0 1 0 0-3.36 1.68 1.68 0 0 0 0 3.36m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                        </svg>
                      </a>
                    )}
                    {member.github && (
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noreferrer"
                        className="w-7 h-7 rounded-lg bg-neutral-100 hover:bg-neutral-200/80 text-neutral-700 flex items-center justify-center transition-colors shadow-xs"
                        title="GitHub Profile"
                      >
                        <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                          <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
                        </svg>
                      </a>
                    )}
                    {!member.twitter && !member.linkedin && !member.github && (
                      <span className="text-[11px] font-mono text-neutral-400 italic">No links set</span>
                    )}
                  </div>

                  <span className="text-[10px] font-mono text-neutral-400">Order #{member.order}</span>
                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleToggleMember(member.id)}
                    disabled={togglingId === member.id}
                    className={cn(
                      'px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs',
                      member.isActive
                        ? 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200/80'
                        : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100/80 border border-emerald-200'
                    )}
                  >
                    {togglingId === member.id ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : member.isActive ? (
                      <>
                        <PauseCircle className="w-3 h-3 text-amber-600" />
                        <span>Pause</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Activate</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => openEditModal(member)}
                      className="p-1.5 rounded-lg bg-white border border-neutral-200 hover:bg-neutral-100 text-neutral-700 transition-colors cursor-pointer shadow-xs"
                      title="Edit Member"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteMember(member.id, member.name)}
                      className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition-colors cursor-pointer shadow-xs"
                      title="Delete Member"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/50 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-lg rounded-3xl bg-white border border-neutral-200 p-6 sm:p-8 shadow-2xl my-8 text-neutral-900">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-1 rounded-lg text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-display font-bold text-neutral-950 mb-1">
              {modalMode === 'create' ? 'Add Team Member' : 'Edit Team Member'}
            </h2>
            <p className="text-xs text-neutral-500 mb-6 font-mono">
              Configure profile picture, name, role, and profile URLs.
            </p>

            {formError && (
              <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-mono flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-1.5 font-semibold">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Ethan Cole"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 text-sm focus:bg-white focus:outline-none focus:border-brand-500"
                />
              </div>

              {/* Role */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-1.5 font-semibold">
                  Role / Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="e.g. Founder & Chief Architect"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 text-sm focus:bg-white focus:outline-none focus:border-brand-500"
                />
              </div>

              {/* Badge */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-700 mb-1.5 font-semibold">
                  Badge Tag (Optional)
                </label>
                <input
                  type="text"
                  value={formData.badge}
                  onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                  placeholder="e.g. Founder, AI Systems, Product & UX"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 text-sm focus:bg-white focus:outline-none focus:border-brand-500"
                />
              </div>

              {/* Picture / Image Upload + Presets */}
              <div className="space-y-2">
                <MediaUploader
                  label="Profile Picture (Upload or URL)"
                  value={formData.image}
                  onChange={(url) => setFormData({ ...formData, image: url })}
                  accept="image"
                  folder="kairotrix/team"
                  placeholder="https://... or /assets/images/about/team-ethan.jpg"
                  helperText="Upload custom portrait or pick a studio preset below."
                />

                {/* Quick Presets */}
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 block mb-1 font-semibold">
                    Quick Studio Presets:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {PRESET_IMAGES.map((preset) => (
                      <button
                        type="button"
                        key={preset.url}
                        onClick={() => setFormData({ ...formData, image: preset.url })}
                        className={cn(
                          'px-2.5 py-1 rounded-md text-[10px] font-mono border transition-all cursor-pointer shadow-xs',
                          formData.image === preset.url
                            ? 'bg-brand-50 border-brand-300 text-brand-700 font-bold'
                            : 'bg-neutral-50 border-neutral-200 text-neutral-600 hover:text-neutral-950'
                        )}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Social Profile Links */}
              <div className="space-y-3 pt-2 border-t border-neutral-100">
                <span className="text-xs font-mono uppercase tracking-wider text-brand-700 font-bold block">
                  Profile Links
                </span>

                {/* Twitter / X */}
                <div>
                  <label className="block text-[11px] font-mono text-neutral-600 mb-1 font-medium">
                    Twitter / X URL
                  </label>
                  <input
                    type="url"
                    value={formData.twitter}
                    onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                    placeholder="https://x.com/username"
                    className="w-full px-3 py-2 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 text-xs focus:bg-white focus:outline-none focus:border-brand-500"
                  />
                </div>

                {/* LinkedIn */}
                <div>
                  <label className="block text-[11px] font-mono text-neutral-600 mb-1 font-medium">
                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    value={formData.linkedin}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                    placeholder="https://linkedin.com/in/username"
                    className="w-full px-3 py-2 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 text-xs focus:bg-white focus:outline-none focus:border-brand-500"
                  />
                </div>

                {/* GitHub */}
                <div>
                  <label className="block text-[11px] font-mono text-neutral-600 mb-1 font-medium">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    value={formData.github}
                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                    placeholder="https://github.com/username"
                    className="w-full px-3 py-2 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 text-xs focus:bg-white focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              {/* Order & Active */}
              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-neutral-100 items-center">
                <div>
                  <label className="block text-[11px] font-mono text-neutral-600 mb-1 font-medium">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 text-xs focus:bg-white focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div className="pt-4">
                  <label className="inline-flex items-center gap-2 text-xs font-mono text-neutral-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="rounded border-neutral-300 text-brand-600 focus:ring-brand-500"
                    />
                    <span className="font-semibold">Active on site</span>
                  </label>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200/70 text-neutral-700 font-tech text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formSaving}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-500 hover:to-brand-600 text-white font-tech text-xs font-bold uppercase tracking-wider transition-all shadow-xs flex items-center gap-2 cursor-pointer"
                >
                  {formSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>{modalMode === 'create' ? 'Create Member' : 'Save Changes'}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl bg-white border border-neutral-200 text-neutral-900 shadow-2xl backdrop-blur-md text-xs font-mono animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Sparkles className="w-4 h-4 text-brand-600 shrink-0" />
          <span className="font-medium">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-neutral-400 hover:text-neutral-900 ml-2 cursor-pointer p-0.5"
            aria-label="Close notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
