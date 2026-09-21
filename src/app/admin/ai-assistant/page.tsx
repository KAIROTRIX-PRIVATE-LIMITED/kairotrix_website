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

export default function AdminAiAssistantPage() {
  const [conversations, setConversations] = useState<ConversationItem[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<ConversationItem | null>(null);
  const [config, setConfig] = useState<AgentConfig>({
    id: 'default',
    isEnabled: true,
    mode: 'HYBRID',
    model: 'gpt-4o-mini',
    systemPrompt: '',
    temperature: 0.3,
  });

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [savingConfig, setSavingConfig] = useState(false);
  const [configSavedToast, setConfigSavedToast] = useState(false);
  const [togglingStatus, setTogglingStatus] = useState(false);
  const [activeTab, setActiveTab] = useState<'conversations' | 'settings'>('conversations');

  const fetchData = async () => {
    try {
      setRefreshing(true);
      const [convRes, confRes] = await Promise.all([
        fetch('/api/admin/assistant/conversations'),
        fetch('/api/admin/assistant/config'),
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
      console.error(e);
    } finally {
      setSavingConfig(false);
    }
  };

  const handleDeleteConversation = async (id: string) => {
    if (!confirm('Are you sure you want to delete this conversation log?')) return;
    try {
      const res = await fetch(`/api/admin/assistant/conversations/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setConversations((prev) => prev.filter((c) => c.id !== id));
        if (selectedConversation?.id === id) {
          setSelectedConversation(null);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const qualifiedLeadsCount = conversations.filter(
    (c) => c.status === 'QUALIFIED_LEAD' || Boolean(c.leadEmail)
  ).length;

  return (
    <div className="space-y-6">
      {/* Header & Master Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4 text-brand-600" />
            <span className="text-xs font-mono uppercase tracking-widest text-brand-600 font-semibold">
              AI Representative Control Center
            </span>
          </div>
          <h1 className="text-2xl font-bold text-neutral-900 tracking-tight mt-1">
            KIRO Agent Command
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Monitor visitor conversations, track qualified leads, and tune KIRO&apos;s system prompt.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Master 1-Click Status Toggle */}
          <button
            onClick={handleToggleAgentStatus}
            disabled={togglingStatus}
            className={cn(
              'px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer shadow-xs',
              config.isEnabled
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100 shadow-emerald-500/10'
                : 'bg-amber-50 text-amber-700 border border-amber-300 hover:bg-amber-100 shadow-amber-500/10'
            )}
            title={config.isEnabled ? 'Click to Pause KIRO Site-Wide' : 'Click to Activate KIRO Site-Wide'}
          >
            {config.isEnabled ? (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>KIRO ACTIVE (LIVE)</span>
              </>
            ) : (
              <>
                <PauseCircle className="w-3.5 h-3.5" />
                <span>KIRO PAUSED (OFFLINE)</span>
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
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
            Active Mode
          </span>
          <div className="text-2xl font-bold text-brand-700 font-mono">
            {config.mode || 'HYBRID'}
          </div>
          <span className="text-[11px] text-neutral-400 font-mono mt-1 block">
            LLM Grounded + Deterministic Fallback
          </span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-neutral-200 pb-2 text-xs font-mono">
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
                    'p-3.5 rounded-xl border text-left transition-all cursor-pointer',
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
                  <button
                    onClick={() => handleDeleteConversation(selectedConversation.id)}
                    className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 transition-colors border border-transparent hover:border-rose-200 cursor-pointer"
                    title="Delete Conversation"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Message Bubble Thread */}
                <div className="space-y-3.5 pr-2 overflow-y-auto max-h-[480px]">
                  {selectedConversation.messages.map((msg) => {
                    const isUser = msg.sender === 'user';
                    return (
                      <div
                        key={msg.id}
                        className={cn(
                          'flex items-start gap-2.5 max-w-[85%]',
                          isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'
                        )}
                      >
                        <div
                          className={cn(
                            'w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-mono shadow-xs',
                            isUser
                              ? 'bg-neutral-900 text-white'
                              : 'bg-brand-50 text-brand-700 border border-brand-200'
                          )}
                        >
                          {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                        </div>

                        <div
                          className={cn(
                            'p-3 rounded-2xl text-xs leading-relaxed shadow-xs',
                            isUser
                              ? 'bg-gradient-to-r from-brand-600 to-brand-700 text-white rounded-tr-none'
                              : 'bg-neutral-50 border border-neutral-200 text-neutral-800 rounded-tl-none'
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

      {/* Tab 2: Prompt Tuning & Model Settings */}
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
                HYBRID (LLM if API Key exists, else Deterministic Matcher)
              </option>
              <option value="LLM_ONLY">
                LLM_ONLY (Requires OPENAI_API_KEY in .env)
              </option>
              <option value="DETERMINISTIC">
                DETERMINISTIC (Zero API cost, uses internal knowledge base)
              </option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-600 font-medium mb-1.5">
                Target Model
              </label>
              <input
                type="text"
                value={config.model}
                onChange={(e) => setConfig({ ...config, model: e.target.value })}
                placeholder="gpt-4o-mini"
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:border-brand-500 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-neutral-600 font-medium mb-1.5">
                Temperature ({config.temperature})
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={config.temperature}
                onChange={(e) => setConfig({ ...config, temperature: parseFloat(e.target.value) })}
                className="w-full accent-brand-600 mt-2"
              />
            </div>
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
              KIRO automatically ingests active database projects and official service areas on top of this prompt.
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
    </div>
  );
}
