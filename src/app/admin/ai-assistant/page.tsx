'use client';

import React, { useState, useEffect } from 'react';
import {
  Bot,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  PauseCircle,
  PlayCircle,
  RefreshCw,
  Save,
  Trash2,
  Mail,
  Clock,
  Sliders,
  AlertCircle,
  User,
  Send,
  FileText,
  Plus,
  Edit,
  X,
  Tag,
  BookOpen,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatMessageItem {
  id: string;
  sender: string;
  text: string;
  actions?: any;
  createdAt: string;
}

interface ConversationItem {
  id: string;
  sessionId: string;
  status: string;
  leadName?: string;
  leadEmail?: string;
  requirementSummary?: string;
  messages: ChatMessageItem[];
  createdAt: string;
  updatedAt: string;
}

interface AgentConfig {
  id: string;
  isEnabled: boolean;
  mode: string;
  model: string;
  systemPrompt: string;
  temperature: number;
}

interface CompanyDocumentItem {
  id: string;
  title: string;
  category: string;
  content: string;
  tags: string[];
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export default function AdminAiAssistantPage() {
  const [conversations, setConversations] = useState<ConversationItem[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<ConversationItem | null>(null);
  const [documents, setDocuments] = useState<CompanyDocumentItem[]>([]);
  const [config, setConfig] = useState<AgentConfig>({
    id: 'default',
    isEnabled: true,
    mode: 'HYBRID',
    model: 'openai/gpt-oss-20b',
    systemPrompt: '',
    temperature: 0.3,
  });

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [savingConfig, setSavingConfig] = useState(false);
  const [configSavedToast, setConfigSavedToast] = useState(false);
  const [togglingStatus, setTogglingStatus] = useState(false);
  const [activeTab, setActiveTab] = useState<'conversations' | 'knowledge' | 'settings'>('conversations');

  // Document modal state
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);
  const [editingDoc, setEditingDoc] = useState<Partial<CompanyDocumentItem> | null>(null);
  const [savingDoc, setSavingDoc] = useState(false);
  const [docFilterCategory, setDocFilterCategory] = useState<string>('ALL');

  const fetchData = async () => {
    try {
      setRefreshing(true);
      const [convRes, confRes, docRes] = await Promise.all([
        fetch('/api/admin/assistant/conversations'),
        fetch('/api/admin/assistant/config'),
        fetch('/api/admin/assistant/documents'),
      ]);

      if (convRes.ok) {
        const convData = await convRes.json();
        const convs: ConversationItem[] = convData.conversations || [];
        setConversations(convs);
        if (convs.length > 0 && !selectedConversation) {
          setSelectedConversation(convs[0]);
        }
      }

      if (confRes.ok) {
        const confData = await confRes.json();
        if (confData.config) {
          setConfig(confData.config);
        }
      }

      if (docRes.ok) {
        const docData = await docRes.json();
        setDocuments(docData.documents || []);
      }
    } catch (e) {
      console.error('Error fetching AI Assistant admin telemetry:', e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleToggleAgentStatus = async () => {
    try {
      setTogglingStatus(true);
      const newStatus = !config.isEnabled;
      const res = await fetch('/api/admin/assistant/config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isEnabled: newStatus }),
      });

      if (res.ok) {
        setConfig((prev) => ({ ...prev, isEnabled: newStatus }));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setTogglingStatus(false);
    }
  };

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSavingConfig(true);
      const res = await fetch('/api/admin/assistant/config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });

      if (res.ok) {
        setConfigSavedToast(true);
        setTimeout(() => setConfigSavedToast(false), 3000);
      }
    } catch (e) {
      console.error('Error saving config:', e);
    } finally {
      setSavingConfig(false);
    }
  };

  // Open Document Modal (Create or Edit)
  const handleOpenDocModal = (doc?: CompanyDocumentItem) => {
    if (doc) {
      setEditingDoc({ ...doc });
    } else {
      setEditingDoc({
        title: '',
        category: 'Services',
        content: '',
        tags: [],
        isActive: true,
      });
    }
    setIsDocModalOpen(true);
  };

  // Save Document
  const handleSaveDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDoc || !editingDoc.title?.trim() || !editingDoc.content?.trim()) return;

    try {
      setSavingDoc(true);
      const isUpdating = Boolean(editingDoc.id);
      const method = isUpdating ? 'PUT' : 'POST';

      const res = await fetch('/api/admin/assistant/documents', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingDoc),
      });

      if (res.ok) {
        setIsDocModalOpen(false);
        setEditingDoc(null);
        await fetchData();
      } else {
        const data = await res.json().catch(() => ({}));
        alert(data.error || 'Failed to save document. Please check the fields and try again.');
      }
    } catch (err) {
      console.error('Error saving document:', err);
      alert('Network or server error while saving document.');
    } finally {
      setSavingDoc(false);
    }
  };

  // Toggle Document Active / Paused
  const handleToggleDocStatus = async (doc: CompanyDocumentItem) => {
    try {
      const res = await fetch('/api/admin/assistant/documents', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: doc.id, isActive: !doc.isActive }),
      });
      if (res.ok) {
        setDocuments((prev) =>
          prev.map((d) => (d.id === doc.id ? { ...d, isActive: !d.isActive } : d))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete Document
  const handleDeleteDocument = async (id: string) => {
    if (!confirm('Are you sure you want to delete this company knowledge document?')) return;
    try {
      const res = await fetch(`/api/admin/assistant/documents?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setDocuments((prev) => prev.filter((d) => d.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const qualifiedLeadsCount = conversations.filter(
    (c) => c.status === 'QUALIFIED_LEAD' || c.leadEmail
  ).length;

  const categories = ['ALL', 'Overview', 'Services', 'Technical', 'Pricing', 'Process', 'FAQ'];

  const filteredDocs =
    docFilterCategory === 'ALL'
      ? documents
      : documents.filter((d) => d.category.toLowerCase() === docFilterCategory.toLowerCase());

  return (
    <div className="space-y-6">
      {/* Top Header & Master Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold font-mono text-neutral-900 tracking-tight flex items-center gap-2.5">
            <Bot className="w-6 h-6 text-brand-600" />
            <span>AI Command Center (KIRO)</span>
          </h1>
          <p className="text-xs text-neutral-500 font-mono mt-1">
            Manage real-time visitor interactions, RAG company documents, and Groq LLM prompt parameters.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Master 1-Click Toggle */}
          <button
            onClick={handleToggleAgentStatus}
            disabled={togglingStatus}
            className={cn(
              'px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer shadow-xs',
              config.isEnabled
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100 shadow-emerald-500/10'
                : 'bg-amber-50 text-amber-700 border border-amber-300 hover:bg-amber-100 shadow-amber-500/10'
            )}
            title={config.isEnabled ? 'Click to pause chat assistant site-wide' : 'Click to turn on chat assistant site-wide'}
          >
            {config.isEnabled ? (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Assistant Active (Online)</span>
              </>
            ) : (
              <>
                <PauseCircle className="w-3.5 h-3.5" />
                <span>Assistant Paused (Offline)</span>
              </>
            )}
          </button>

          <button
            onClick={fetchData}
            disabled={refreshing}
            className="p-2 rounded-xl bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 transition-colors cursor-pointer shadow-xs"
            title="Refresh logs and configuration"
          >
            <RefreshCw className={cn('w-4 h-4', refreshing && 'animate-spin')} />
          </button>
        </div>
      </div>

      {/* Telemetry Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-xs">
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 block mb-1">
            Total Conversations
          </span>
          <div className="text-2xl font-bold text-neutral-900 font-mono">{conversations.length}</div>
          <span className="text-[11px] text-neutral-400 font-mono mt-1 block">
            Engaged visitor sessions
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-xs">
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 block mb-1">
            Qualified Leads Captured
          </span>
          <div className="text-2xl font-bold text-emerald-600 font-mono">
            {qualifiedLeadsCount}
          </div>
          <span className="text-[11px] text-emerald-600/80 font-mono mt-1 block">
            Email or project qualified
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-xs">
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 block mb-1">
            RAG Knowledge Base
          </span>
          <div className="text-2xl font-bold text-brand-600 font-mono">
            {documents.filter((d) => d.isActive).length} <span className="text-xs text-neutral-400 font-normal">/ {documents.length} docs</span>
          </div>
          <span className="text-[11px] text-neutral-400 font-mono mt-1 block">
            Active company documents
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-xs">
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 block mb-1">
            Active Model
          </span>
          <div className="text-sm font-bold text-neutral-800 font-mono truncate mt-1">
            {config.model || 'openai/gpt-oss-20b'}
          </div>
          <span className="text-[11px] text-neutral-400 font-mono mt-1 block">
            Groq High-Speed LPU
          </span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-neutral-200 pb-2 text-xs font-mono flex-wrap">
        <button
          onClick={() => setActiveTab('conversations')}
          className={cn(
            'px-3.5 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-2',
            activeTab === 'conversations'
              ? 'bg-brand-50 text-brand-700 border border-brand-200 font-bold shadow-xs'
              : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/60'
          )}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Visitor Conversation Logs ({conversations.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('knowledge')}
          className={cn(
            'px-3.5 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-2',
            activeTab === 'knowledge'
              ? 'bg-brand-50 text-brand-700 border border-brand-200 font-bold shadow-xs'
              : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/60'
          )}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Company Knowledge & RAG Docs ({documents.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={cn(
            'px-3.5 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-2',
            activeTab === 'settings'
              ? 'bg-brand-50 text-brand-700 border border-brand-200 font-bold shadow-xs'
              : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/60'
          )}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Prompt Tuning & Model Settings</span>
        </button>
      </div>

      {/* Tab 1: Conversation Logs Explorer */}
      {activeTab === 'conversations' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white border border-neutral-200/80 rounded-2xl p-4 sm:p-6 min-h-[500px] shadow-xs">
          {/* Conversation List (Left) */}
          <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-neutral-200 pr-0 lg:pr-4 space-y-2 max-h-[600px] overflow-y-auto">
            <span className="text-[11px] font-mono uppercase text-neutral-400 px-2 block mb-2 font-medium">
              Recent Visitor Threads
            </span>

            {conversations.map((conv) => {
              const isSelected = selectedConversation?.id === conv.id;
              const isLead = conv.status === 'QUALIFIED_LEAD' || Boolean(conv.leadEmail);
              const lastMsg = conv.messages[conv.messages.length - 1];

              return (
                <div
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv)}
                  className={cn(
                    'p-3.5 rounded-xl border text-left cursor-pointer transition-all',
                    isSelected
                      ? 'bg-brand-50/70 border-brand-300 text-neutral-900 shadow-xs ring-1 ring-brand-400/30'
                      : 'bg-neutral-50/70 border-neutral-200 text-neutral-700 hover:bg-neutral-100/70 hover:border-neutral-300'
                  )}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-mono text-[11px] text-neutral-500 truncate">
                      {conv.sessionId}
                    </span>
                    {isLead && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                        LEAD
                      </span>
                    )}
                  </div>

                  {conv.leadEmail && (
                    <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-mono mb-1">
                      <Mail className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span className="truncate">{conv.leadEmail}</span>
                    </div>
                  )}

                  <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                    {lastMsg ? lastMsg.text : 'New session started'}
                  </p>

                  <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 mt-2 pt-2 border-t border-neutral-200/60">
                    <span>{conv.messages.length} messages</span>
                    <span>
                      {new Date(conv.updatedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>
              );
            })}

            {conversations.length === 0 && !loading && (
              <div className="py-16 text-center text-xs text-neutral-400 font-mono">
                No conversations logged yet. Open the AI Assistant on the public site to begin chatting.
              </div>
            )}
          </div>

          {/* Conversation Detail (Right) */}
          <div className="lg:col-span-7 flex flex-col justify-between max-h-[600px] overflow-y-auto pl-0 lg:pl-2">
            {selectedConversation ? (
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                  <div>
                    <span className="text-xs font-mono text-neutral-400 block">Session ID</span>
                    <span className="text-sm font-bold text-neutral-900 font-mono">
                      {selectedConversation.sessionId}
                    </span>
                  </div>
                  {selectedConversation.leadEmail && (
                    <div className="text-right">
                      <span className="text-xs font-mono text-neutral-400 block">Qualified Lead Email</span>
                      <a
                        href={`mailto:${selectedConversation.leadEmail}`}
                        className="text-xs font-bold text-emerald-700 font-mono hover:underline"
                      >
                        {selectedConversation.leadEmail}
                      </a>
                    </div>
                  )}
                </div>

                {/* Chat message bubbles */}
                <div className="space-y-3 pr-2">
                  {selectedConversation.messages.map((msg) => {
                    const isUser = msg.sender === 'user';
                    return (
                      <div
                        key={msg.id}
                        className={cn('flex flex-col', isUser ? 'items-end' : 'items-start')}
                      >
                        <span className="text-[10px] font-mono text-neutral-400 mb-1 px-1">
                          {isUser ? 'Visitor' : 'KIRO (AI)'}
                        </span>
                        <div
                          className={cn(
                            'p-3.5 rounded-2xl max-w-[85%] text-xs leading-relaxed',
                            isUser
                              ? 'bg-neutral-900 text-white rounded-tr-xs shadow-xs'
                              : 'bg-neutral-100 text-neutral-800 border border-neutral-200 rounded-tl-xs'
                          )}
                        >
                          <p className="whitespace-pre-wrap">{msg.text}</p>
                          <span
                            className={cn(
                              'text-[9px] font-mono mt-1 block text-right',
                              isUser ? 'text-white/80' : 'text-neutral-400'
                            )}
                          >
                            {new Date(msg.createdAt).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-neutral-400 text-xs font-mono py-24">
                <MessageSquare className="w-8 h-8 mb-2 opacity-40" />
                <span>Select a conversation from the left to view the full chat thread</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Company Knowledge & RAG Docs */}
      {activeTab === 'knowledge' && (
        <div className="space-y-4">
          {/* Action Ribbon */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white border border-neutral-200/80 rounded-2xl p-4 shadow-xs">
            {/* Category Filter Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setDocFilterCategory(cat)}
                  className={cn(
                    'px-3 py-1.5 rounded-xl text-xs font-mono transition-colors cursor-pointer shrink-0',
                    docFilterCategory === cat
                      ? 'bg-brand-600 text-white font-bold'
                      : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            <button
              onClick={() => handleOpenDocModal()}
              className="px-4 py-2 rounded-xl bg-neutral-950 hover:bg-brand-600 text-white text-xs font-mono font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Knowledge Document</span>
            </button>
          </div>

          {/* Document Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredDocs.map((doc) => (
              <div
                key={doc.id}
                className={cn(
                  'p-5 bg-white border rounded-2xl shadow-xs transition-all relative flex flex-col justify-between',
                  doc.isActive ? 'border-neutral-200/80' : 'border-neutral-200 opacity-60 bg-neutral-50/50'
                )}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 font-mono text-[10px] uppercase font-bold border border-brand-200">
                      {doc.category}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleDocStatus(doc)}
                        className={cn(
                          'px-2 py-0.5 rounded text-[10px] font-mono font-semibold transition-colors cursor-pointer',
                          doc.isActive
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-neutral-100 text-neutral-500 border border-neutral-200'
                        )}
                      >
                        {doc.isActive ? 'Active (In RAG)' : 'Paused'}
                      </button>

                      <button
                        onClick={() => handleOpenDocModal(doc)}
                        className="p-1 rounded-lg text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
                        title="Edit document"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleDeleteDocument(doc.id)}
                        className="p-1 rounded-lg text-neutral-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Delete document"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <h3 className="font-bold text-sm text-neutral-900 font-mono mb-2">
                    {doc.title}
                  </h3>

                  <p className="text-xs text-neutral-600 font-mono line-clamp-4 leading-relaxed whitespace-pre-wrap bg-neutral-50 p-3 rounded-xl border border-neutral-100 mb-3">
                    {doc.content}
                  </p>
                </div>

                {/* Footer Tags */}
                <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-neutral-100">
                  <Tag className="w-3 h-3 text-neutral-400 shrink-0" />
                  {doc.tags && doc.tags.length > 0 ? (
                    doc.tags.map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        className="px-1.5 py-0.5 bg-neutral-100 text-neutral-600 rounded text-[10px] font-mono"
                      >
                        {tag}
                      </span>
                    ))
                  ) : (
                    <span className="text-[10px] font-mono text-neutral-400">No tags</span>
                  )}
                </div>
              </div>
            ))}

            {filteredDocs.length === 0 && (
              <div className="col-span-full py-16 text-center text-xs text-neutral-400 font-mono bg-white rounded-2xl border border-neutral-200">
                No documents found in this category. Click &quot;Add Knowledge Document&quot; to upload or write company docs.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 3: Prompt Tuning & Model Settings */}
      {activeTab === 'settings' && (
        <form
          onSubmit={handleSaveConfig}
          className="bg-white border border-neutral-200/80 rounded-2xl p-6 space-y-6 max-w-3xl shadow-xs"
        >
          {configSavedToast && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 font-mono">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>AI Agent configuration saved and updated successfully.</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-mono uppercase text-neutral-600 font-medium mb-1.5">
              Operating Mode
            </label>
            <select
              value={config.mode}
              onChange={(e) => setConfig({ ...config, mode: e.target.value })}
              className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:bg-white focus:border-brand-500 focus:outline-none transition-colors"
            >
              <option value="HYBRID">
                HYBRID (Groq Cloud LLM with RAG Knowledge + Deterministic Fallback)
              </option>
              <option value="LLM_ONLY">
                LLM_ONLY (Requires GROQ_API_KEY in .env)
              </option>
              <option value="DETERMINISTIC">
                DETERMINISTIC (Zero API cost, uses internal knowledge base only)
              </option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-neutral-600 font-medium mb-1.5">
              KIRO Master System Prompt & Guardrails
            </label>
            <textarea
              rows={8}
              value={config.systemPrompt}
              onChange={(e) => setConfig({ ...config, systemPrompt: e.target.value })}
              placeholder="Instructions defining KIRO's tone, scope, and problem-first identity..."
              className="w-full px-3.5 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:border-brand-500 focus:outline-none font-mono leading-relaxed transition-colors"
            />
            <span className="text-[11px] text-neutral-500 font-mono mt-1 block">
              KIRO automatically ingests active RAG company documents and live portfolio projects on top of this prompt.
            </span>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-200">
            <button
              type="submit"
              disabled={savingConfig}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-500 hover:to-brand-600 text-white font-medium text-xs flex items-center gap-2 shadow-xs disabled:opacity-50 cursor-pointer transition-all"
            >
              <Save className="w-4 h-4" />
              <span>{savingConfig ? 'Saving...' : 'Save Agent Configuration'}</span>
            </button>
          </div>
        </form>
      )}

      {/* DOCUMENT CREATOR / EDITOR MODAL */}
      {isDocModalOpen && editingDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/50 backdrop-blur-xs">
          <div className="bg-white border border-neutral-200 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
              <h3 className="font-bold text-base font-mono text-neutral-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-brand-600" />
                <span>{editingDoc.id ? 'Edit Company Knowledge Document' : 'Add Company Knowledge Document'}</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsDocModalOpen(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveDocument} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-neutral-700 font-semibold mb-1">
                  Document Title <span className="text-brand-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editingDoc.title || ''}
                  onChange={(e) => setEditingDoc({ ...editingDoc, title: e.target.value })}
                  placeholder="e.g. Enterprise Security, SLA & IP Ownership Policy"
                  className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:bg-white focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-700 font-semibold mb-1">
                    Category
                  </label>
                  <select
                    value={editingDoc.category || 'Services'}
                    onChange={(e) => setEditingDoc({ ...editingDoc, category: e.target.value })}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:bg-white focus:border-brand-500 focus:outline-none"
                  >
                    <option value="Overview">Overview</option>
                    <option value="Services">Services</option>
                    <option value="Technical">Technical</option>
                    <option value="Pricing">Pricing</option>
                    <option value="Process">Process</option>
                    <option value="FAQ">FAQ</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-700 font-semibold mb-1">
                    Tags (Comma-separated)
                  </label>
                  <input
                    type="text"
                    value={Array.isArray(editingDoc.tags) ? editingDoc.tags.join(', ') : ''}
                    onChange={(e) =>
                      setEditingDoc({
                        ...editingDoc,
                        tags: e.target.value.split(',').map((t) => t.trim()),
                      })
                    }
                    placeholder="pricing, security, rag, timeline"
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 focus:bg-white focus:border-brand-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-neutral-700 font-semibold mb-1">
                  Document Content (Markdown or Plain Text) <span className="text-brand-600">*</span>
                </label>
                <textarea
                  required
                  rows={9}
                  value={editingDoc.content || ''}
                  onChange={(e) => setEditingDoc({ ...editingDoc, content: e.target.value })}
                  placeholder="Paste or write the factual company knowledge, policies, technical specifics, or guidelines that KIRO should cite when answering visitor questions..."
                  className="w-full px-3.5 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 font-mono leading-relaxed focus:bg-white focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="doc-active"
                  checked={editingDoc.isActive ?? true}
                  onChange={(e) => setEditingDoc({ ...editingDoc, isActive: e.target.checked })}
                  className="rounded text-brand-600 focus:ring-brand-500 w-4 h-4 cursor-pointer"
                />
                <label htmlFor="doc-active" className="text-xs font-mono text-neutral-700 cursor-pointer">
                  Active (Include in RAG context for visitor questions)
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={() => setIsDocModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-neutral-200 text-xs font-mono text-neutral-600 hover:bg-neutral-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingDoc}
                  className="px-5 py-2 rounded-xl bg-neutral-950 hover:bg-brand-600 text-white text-xs font-mono font-bold transition-colors disabled:opacity-50"
                >
                  {savingDoc ? 'Saving...' : 'Save Knowledge Document'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
