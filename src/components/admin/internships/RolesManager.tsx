'use client';

import React, { useState } from 'react';
import {
  Plus,
  Briefcase,
  Trash2,
  Edit2,
  Check,
  X,
  Loader2,
} from 'lucide-react';

interface Role {
  id: string;
  title: string;
  status: string;
  _count?: {
    assignedApplicants: number;
  };
}

interface RolesManagerProps {
  roles: Role[];
  onRefresh: () => void;
}

export function RolesManager({ roles, onRefresh }: RolesManagerProps) {
  const [newRoleTitle, setNewRoleTitle] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Inline editing state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  // Add new role
  const handleAddRole = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoleTitle.trim()) return;

    setIsAdding(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/admin/internships/roles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newRoleTitle.trim(),
          domain: 'Engineering',
          duration: '3 Months',
          status: 'PUBLISHED',
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to add role');

      setNewRoleTitle('');
      onRefresh();
    } catch (err: unknown) {
      const e = err as Error;
      setErrorMessage(e.message);
    } finally {
      setIsAdding(false);
    }
  };

  // Start editing
  const startEditing = (role: Role) => {
    setEditingId(role.id);
    setEditingTitle(role.title);
  };

  // Save edited role
  const handleSaveEdit = async (roleId: string) => {
    if (!editingTitle.trim()) return;

    setIsUpdating(true);
    try {
      const res = await fetch(`/api/admin/internships/roles/${roleId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: editingTitle.trim() }),
      });

      if (!res.ok) throw new Error('Failed to update role');

      setEditingId(null);
      onRefresh();
    } catch (err: unknown) {
      const e = err as Error;
      alert(e.message || 'Update failed');
    } finally {
      setIsUpdating(false);
    }
  };

  // Delete / Archive role
  const handleDeleteRole = async (roleId: string, title: string) => {
    if (!window.confirm(`Delete role "${title}" from dropdown?`)) return;

    try {
      const res = await fetch(`/api/admin/internships/roles/${roleId}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete role');
      onRefresh();
    } catch (err: unknown) {
      const e = err as Error;
      alert(e.message || 'Delete failed');
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header Info */}
      <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-2xs">
        <h3 className="text-base font-bold text-neutral-950">
          Application Form Roles
        </h3>
        <p className="text-xs text-neutral-500 mt-0.5">
          These roles appear in the &quot;Role / domain&quot; dropdown on the student application form.
        </p>

        {/* Add Role Form */}
        <form onSubmit={handleAddRole} className="mt-4 flex gap-2">
          <input
            type="text"
            required
            value={newRoleTitle}
            onChange={(e) => setNewRoleTitle(e.target.value)}
            placeholder="Enter role title (e.g. AI Systems, Software Engineering)..."
            className="flex-1 h-11 px-4 rounded-xl border border-neutral-300 text-xs text-neutral-900 bg-neutral-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors"
          />
          <button
            type="submit"
            disabled={isAdding}
            className="h-11 px-5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors disabled:opacity-50 cursor-pointer shrink-0"
          >
            {isAdding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            <span>Add Role</span>
          </button>
        </form>

        {errorMessage && (
          <p className="text-xs text-red-600 mt-2">{errorMessage}</p>
        )}
      </div>

      {/* Simple Roles List */}
      <div className="rounded-2xl border border-neutral-200/90 bg-white shadow-2xs divide-y divide-neutral-100 overflow-hidden">
        {roles.length === 0 ? (
          <div className="p-8 text-center text-xs text-neutral-500">
            No roles added yet. Add your first role above.
          </div>
        ) : (
          roles.map((role) => {
            const isEditing = editingId === role.id;

            return (
              <div
                key={role.id}
                className="p-4 sm:px-5 flex items-center justify-between gap-3 hover:bg-neutral-50/60 transition-colors"
              >
                {/* Left: Role Icon & Title */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 text-brand-600 flex items-center justify-center shrink-0 border border-purple-200/60">
                    <Briefcase className="w-4 h-4" />
                  </div>

                  {isEditing ? (
                    <div className="flex items-center gap-2 flex-1 max-w-md">
                      <input
                        type="text"
                        value={editingTitle}
                        onChange={(e) => setEditingTitle(e.target.value)}
                        className="flex-1 h-9 px-3 rounded-lg border border-brand-500 text-xs font-semibold text-neutral-900 focus:outline-none"
                        autoFocus
                      />
                      <button
                        type="button"
                        disabled={isUpdating}
                        onClick={() => handleSaveEdit(role.id)}
                        className="p-1.5 rounded-lg bg-brand-600 text-white hover:bg-brand-700 transition-colors"
                        title="Save"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                        className="p-1.5 rounded-lg border border-neutral-300 text-neutral-600 hover:bg-neutral-100 transition-colors"
                        title="Cancel"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="min-w-0">
                      <span className="text-sm font-semibold text-neutral-900 block truncate">
                        {role.title}
                      </span>
                    </div>
                  )}
                </div>

                {/* Right: Actions */}
                {!isEditing && (
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => startEditing(role)}
                      className="p-2 text-neutral-400 hover:text-brand-600 hover:bg-purple-50 rounded-lg transition-colors cursor-pointer"
                      title="Edit role name"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteRole(role.id, role.title)}
                      className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      title="Remove role"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
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
