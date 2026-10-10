'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Send,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Copy,
  Check,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  KIRO_INITIAL_GREETING,
  QUICK_STARTER_PROMPTS,
  findAssistantResponse,
  ActionButton,
} from '@/data/aiAssistantKnowledge';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'kiro';
  text: string;
  actions?: ActionButton[];
  suggestedFollowUps?: string[];
  timestamp: string;
  isStreaming?: boolean;
}

// Clean all markdown artifacts (lines, boxes, stars, headings, prompt brackets) to show only pure text
function cleanDisplayText(rawText: string): string {
  if (!rawText) return '';
  return (
    rawText
      .replace(/\[(?:DOCUMENT|VERIFIED)[^\]]*\]/gi, '')
      .replace(/={3,}.*?={3,}/g, '')
      .replace(/^\s*\|?[-+:| ]{3,}\|?\s*$/gm, '')
      .replace(/^\s*\|\s*([^|\n]+)\s*\|\s*([^|\n]+)\s*\|\s*$/gm, '$1: $2')
      .replace(/\|/g, ' ')
      .replace(/^\s*[-*_]{3,}\s*$/gm, '')
      .replace(/^\s*[*•\-+]\s+/gm, '• ')
      .replace(/^#{1,6}\s+/gm, '')
      .replace(/\*{1,3}([^*]+)\*{1,3}/g, '$1')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
      .replace(/\n{3,}/g, '\n\n')
      .trim()
  );
}

function renderCleanText(rawText: string) {
  const cleaned = cleanDisplayText(rawText);
  const lines = cleaned.split('\n');

  return lines.map((line, lineIdx) => {
    const trimmed = line.trim();
    if (!trimmed) {
      return <div key={lineIdx} className="h-2" />;
    }

    if (trimmed.startsWith('•')) {
      const content = trimmed.slice(1).trim();
      return (
        <div
          key={lineIdx}
          className="flex items-start gap-2 pl-0.5 my-1 text-xs sm:text-sm text-neutral-800 leading-relaxed"
        >
          <span className="text-brand-600 font-bold select-none shrink-0">•</span>
          <span className="flex-1">{content}</span>
        </div>
      );
    }

    const numMatch = trimmed.match(/^(\d+\.)\s+(.*)/);
    if (numMatch) {
      return (
        <div
          key={lineIdx}
          className="flex items-start gap-2 pl-0.5 my-1 text-xs sm:text-sm text-neutral-800 leading-relaxed"
        >
          <span className="text-brand-600 font-semibold select-none shrink-0">
            {numMatch[1]}
          </span>
          <span className="flex-1">{numMatch[2]}</span>
        </div>
      );
    }

    return (
      <p
        key={lineIdx}
        className="text-xs sm:text-sm leading-relaxed mb-2 last:mb-0 text-neutral-800"
      >
        {trimmed}
      </p>
    );
  });
}

function TypewriterMessage({
  text,
  onComplete,
}: {
  text: string;
  onComplete: () => void;
}) {
  const prefersReduced = useReducedMotion();
  const cleaned = useMemo(() => cleanDisplayText(text), [text]);

  const [displayedText, setDisplayedText] = useState(prefersReduced ? cleaned : '');
  const [typingDone, setTypingDone] = useState(prefersReduced);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (prefersReduced) {
      setDisplayedText(cleaned);
      setTypingDone(true);
      onCompleteRef.current();
      return;
    }

    let index = 0;
    const speed = 12;
    const stepSize = 3;

    timerRef.current = setInterval(() => {
      index += stepSize;
      if (index >= cleaned.length) {
        setDisplayedText(cleaned);
        setTypingDone(true);
        if (timerRef.current) clearInterval(timerRef.current);
        onCompleteRef.current();
      } else {
        setDisplayedText(cleaned.slice(0, index));
      }
    }, speed);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [cleaned, prefersReduced]);

  const handleSkip = () => {
    if (!typingDone) {
      if (timerRef.current) clearInterval(timerRef.current);
      setDisplayedText(cleaned);
      setTypingDone(true);
      onCompleteRef.current();
    }
  };

  return (
    <div onClick={handleSkip} className="cursor-pointer select-text">
      {renderCleanText(displayedText)}
      {!typingDone && (
        <span className="inline-block w-1.5 h-3.5 ml-1 bg-brand-500 animate-pulse align-middle rounded-xs" />
      )}
    </div>
  );
}

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChatModal({ isOpen, onClose }: ChatModalProps) {
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);
  const [currentlyStreamingId, setCurrentlyStreamingId] = useState<string | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'msg-init',
      sender: 'kiro',
      text: "Hello! I'm KIRO, your KAIROTRIX assistant. I can answer questions about our custom software development, AI systems, and how we work with clients.\n\nWhat can I help you with today?",
      actions: KIRO_INITIAL_GREETING.actions,
      suggestedFollowUps: [
        "What services do you provide?",
        "Help me choose the right solution",
        "How do we start a project?",
        "Talk with an engineer",
      ],
      timestamp: 'Just now',
      isStreaming: false,
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      let sid = localStorage.getItem('kairotrix_kiro_sid');
      if (!sid) {
        sid = `sid_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        localStorage.setItem('kairotrix_kiro_sid', sid);
      }
      setSessionId(sid);
    }
  }, []);

  const scrollToBottom = useCallback((smooth = true) => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: smooth ? 'smooth' : 'auto',
        block: 'end',
      });
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        scrollToBottom(false);
        inputRef.current?.focus();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isOpen, scrollToBottom]);

  const handleCopy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(cleanDisplayText(text));
      setCopiedMsgId(id);
      setTimeout(() => setCopiedMsgId(null), 2000);
    } catch {}
  };

  const handleResetConversation = () => {
    setMessages([
      {
        id: `msg-reset-${Date.now()}`,
        sender: 'kiro',
        text: "Conversation refreshed. How else can I assist you with KAIROTRIX technology and services?",
        actions: KIRO_INITIAL_GREETING.actions,
        suggestedFollowUps: [
          "What services do you provide?",
          "Help me choose the right solution",
          "How do we start a project?",
          "Talk with an engineer",
        ],
        timestamp: 'Just now',
        isStreaming: false,
      },
    ]);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query || isTyping) return;

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          sessionId,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const kiroMsgId = `kiro-${Date.now()}`;
        setCurrentlyStreamingId(kiroMsgId);

        const kiroMessage: ChatMessage = {
          id: kiroMsgId,
          sender: 'kiro',
          text: data.reply,
          actions: data.actions || [],
          suggestedFollowUps: data.suggestedFollowUps || [],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isStreaming: true,
        };

        setMessages((prev) => [...prev, kiroMessage]);
      } else {
        throw new Error('API request failed');
      }
    } catch {
      const offlineFallback = findAssistantResponse(query);
      const kiroMsgId = `kiro-${Date.now()}`;
      setCurrentlyStreamingId(kiroMsgId);

      const fallbackMsg: ChatMessage = {
        id: kiroMsgId,
        sender: 'kiro',
        text: offlineFallback.text,
        actions: offlineFallback.actions,
        suggestedFollowUps: offlineFallback.suggestedFollowUps,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isStreaming: true,
      };

      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="sm:hidden fixed inset-0 bg-neutral-950/40 z-50 backdrop-blur-xs"
            aria-hidden="true"
          />

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 bottom-0 sm:bottom-24 sm:right-6 sm:left-auto z-50 w-full sm:w-[410px] h-[90dvh] sm:h-[580px] sm:max-h-[82vh] bg-white border-t sm:border border-neutral-200/90 rounded-t-3xl sm:rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.18)] flex flex-col overflow-hidden text-neutral-900 pb-safe"
          >
            <div className="sm:hidden w-full flex justify-center pt-2.5 pb-1 shrink-0">
              <span className="w-10 h-1 rounded-full bg-neutral-300" />
            </div>

            {/* HEADER */}
            <div className="px-4 py-3.5 bg-white border-b border-neutral-200/80 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-brand-500/20 shrink-0 bg-neutral-100">
                  <Image
                    src="/assets/images/404/chat_icon.webp"
                    alt="KIRO"
                    fill
                    sizes="36px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-bold text-sm tracking-tight text-neutral-900">
                      KIRO
                    </h3>
                    <span className="px-1.5 py-0.5 rounded-full bg-brand-50 text-brand-700 font-mono text-[10px] font-semibold border border-brand-200/60">
                      AI REP
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-500 flex items-center gap-1.5 font-sans mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Live • Verified Engineering Knowledge</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleResetConversation}
                  className="p-2 rounded-xl text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-colors cursor-pointer"
                  title="Reset conversation"
                  aria-label="Reset conversation"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 rounded-xl text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-colors cursor-pointer"
                  aria-label="Close Assistant"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* MESSAGES CONTAINER */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-50/50 scroll-smooth">
              {messages.map((msg) => {
                const isUser = msg.sender === 'user';
                const isStreamingThis = currentlyStreamingId === msg.id && msg.isStreaming;

                return (
                  <div
                    key={msg.id}
                    className={cn(
                      'flex gap-2.5 max-w-[92%]',
                      isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'
                    )}
                  >
                    {!isUser && (
                      <div className="relative w-7 h-7 rounded-full overflow-hidden shrink-0 mt-0.5 ring-1.5 ring-brand-500/20 bg-white">
                        <Image
                          src="/assets/images/404/chat_icon.webp"
                          alt="KIRO"
                          fill
                          sizes="28px"
                          className="object-cover"
                        />
                      </div>
                    )}

                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div
                        className={cn(
                          'p-3.5 rounded-2xl text-xs sm:text-sm font-sans relative group',
                          isUser
                            ? 'bg-neutral-900 text-white rounded-br-xs shadow-xs'
                            : 'bg-white border border-neutral-200/90 text-neutral-800 rounded-tl-xs shadow-xs'
                        )}
                      >
                        {!isUser && (
                          <button
                            type="button"
                            onClick={() => handleCopy(msg.id, msg.text)}
                            className="absolute top-2 right-2 p-1 rounded-md bg-neutral-100/80 hover:bg-neutral-200 text-neutral-500 hover:text-neutral-800 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                            title="Copy response"
                            aria-label="Copy response"
                          >
                            {copiedMsgId === msg.id ? (
                              <Check className="w-3 h-3 text-emerald-600" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        )}

                        {isUser ? (
                          <div className="whitespace-pre-wrap leading-relaxed select-text">
                            {msg.text}
                          </div>
                        ) : isStreamingThis ? (
                          <TypewriterMessage
                            text={msg.text}
                            onComplete={() => {
                              setCurrentlyStreamingId(null);
                              setMessages((prev) =>
                                prev.map((m) =>
                                  m.id === msg.id ? { ...m, isStreaming: false } : m
                                )
                              );
                            }}
                          />
                        ) : (
                          <div className="select-text leading-relaxed">
                            {renderCleanText(msg.text)}
                          </div>
                        )}
                      </div>

                      {msg.actions && msg.actions.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {msg.actions.map((act, actIdx) => (
                            <Link
                              key={actIdx}
                              href={act.href}
                              onClick={onClose}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-neutral-50 border border-brand-200/80 hover:border-brand-500 text-brand-700 hover:text-brand-900 text-xs font-medium transition-colors shadow-2xs group"
                            >
                              <span>{act.label}</span>
                              <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                            </Link>
                          ))}
                        </div>
                      )}

                      {msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && !isStreamingThis && (
                        <div className="flex flex-wrap gap-1.5 pt-1.5">
                          {msg.suggestedFollowUps.map((promptText, pIdx) => (
                            <button
                              key={pIdx}
                              type="button"
                              onClick={() => handleSendMessage(promptText)}
                              className="text-left px-2.5 py-1 rounded-lg bg-brand-50/70 hover:bg-brand-100/80 text-brand-700 text-[11px] font-medium border border-brand-200/50 transition-colors cursor-pointer"
                            >
                              {promptText}
                            </button>
                          ))}
                        </div>
                      )}

                      <div
                        className={cn(
                          'text-[10px] text-neutral-400 px-1',
                          isUser ? 'text-right' : 'text-left'
                        )}
                      >
                        {msg.timestamp}
                      </div>
                    </div>
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex gap-2.5 items-center mr-auto">
                  <div className="relative w-7 h-7 rounded-full overflow-hidden shrink-0 ring-1.5 ring-brand-500/20 bg-white">
                    <Image
                      src="/assets/images/404/chat_icon.webp"
                      alt="KIRO"
                      fill
                      sizes="28px"
                      className="object-cover"
                    />
                  </div>
                  <div className="px-3.5 py-2.5 rounded-2xl bg-white border border-neutral-200/90 text-neutral-500 text-xs flex items-center gap-1.5 shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-600 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-600 animate-bounce [animation-delay:0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-600 animate-bounce [animation-delay:0.3s]" />
                    <span className="ml-1 text-[11px] font-mono text-neutral-400">Thinking...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* QUICK STARTERS */}
            {messages.length === 1 && (
              <div className="px-4 py-2 bg-white border-t border-neutral-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
                {QUICK_STARTER_PROMPTS.map((prompt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSendMessage(prompt.query)}
                    className="shrink-0 px-3 py-1.5 rounded-xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-neutral-700 hover:text-neutral-900 text-xs font-normal transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3 h-3 text-brand-600" />
                    <span>{prompt.label}</span>
                  </button>
                ))}
              </div>
            )}

            {/* INPUT BAR */}
            <div className="p-3 sm:p-3.5 bg-white border-t border-neutral-200/80 shrink-0">
              <form onSubmit={handleFormSubmit} className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Ask a question..."
                  className="flex-1 px-4 py-2.5 bg-neutral-100 hover:bg-neutral-100/90 focus:bg-white rounded-xl text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 border border-transparent focus:border-brand-500 focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim() || isTyping}
                  className="p-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-30 disabled:pointer-events-none text-white transition-colors cursor-pointer shrink-0 shadow-xs"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

              <div className="mt-2 flex items-center justify-between text-[11px] text-neutral-500 px-1 font-sans">
                <span>We reply to inquiries within 1 business day</span>
                <Link
                  href="/contact"
                  onClick={onClose}
                  className="text-brand-600 hover:text-brand-700 hover:underline inline-flex items-center gap-0.5 font-medium"
                >
                  Contact page <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
