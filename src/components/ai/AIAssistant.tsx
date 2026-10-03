'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
import { usePreloader } from '@/context/PreloaderContext';

interface ChatMessage {
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
      // Remove RAG / document brackets like [DOCUMENT: ...] or [VERIFIED ...]
      .replace(/\[(?:DOCUMENT|VERIFIED)[^\]]*\]/gi, '')
      .replace(/={3,}.*?={3,}/g, '')
      // Remove markdown table divider rows (|---|---|)
      .replace(/^\s*\|?[-+:| ]{3,}\|?\s*$/gm, '')
      // Convert table rows | Key | Value | -> Key: Value
      .replace(/^\s*\|\s*([^|\n]+)\s*\|\s*([^|\n]+)\s*\|\s*$/gm, '$1: $2')
      // Remove any leftover pipe symbols
      .replace(/\|/g, ' ')
      // Remove horizontal rules (---, ___, ***)
      .replace(/^\s*[-*_]{3,}\s*$/gm, '')
      // Standardize bullet points (*, -, +, •) to clean bullet symbol
      .replace(/^\s*[*•\-+]\s+/gm, '• ')
      // Remove markdown headings (###, ##, #)
      .replace(/^#{1,6}\s+/gm, '')
      // Remove bold/italic markdown stars (**bold**, *italic*, ***both***)
      .replace(/\*{1,3}([^*]+)\*{1,3}/g, '$1')
      // Remove any lingering stray asterisks
      .replace(/\*/g, '')
      // Remove backticks
      .replace(/`{1,3}[^`]*`{1,3}/g, (m) => m.replace(/`/g, ''))
      .replace(/`+/g, '')
      // Clean markdown links [Text](url) -> Text
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
      // Clean multiple blank lines
      .replace(/\n{3,}/g, '\n\n')
      .trim()
  );
}

// Render clean formatted text with elegant paragraphs and bullet points
function renderCleanText(rawText: string) {
  const cleaned = cleanDisplayText(rawText);
  const lines = cleaned.split('\n');

  return lines.map((line, lineIdx) => {
    const trimmed = line.trim();
    if (!trimmed) {
      return <div key={lineIdx} className="h-2" />;
    }

    // Bullet point line
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

    // Numbered step line like "1. Understand" or "Step 1:"
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

    // Regular clean paragraph
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

// Typewriter Component: animates text exactly ONCE and never repeats
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
    const speed = 12; // milliseconds per step
    const stepSize = 3; // chars per tick for smooth natural cadence

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

  // Click to reveal all instantly
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

export function AIAssistant() {
  const pathname = usePathname();
  const { isLoaded } = usePreloader();
  const isSolutionDetailPage = Boolean(pathname?.startsWith('/solutions/') && pathname !== '/solutions');
  const prefersReduced = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [showCallout, setShowCallout] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);
  const [currentlyStreamingId, setCurrentlyStreamingId] = useState<string | null>(null);

  // Prevent background page scrolling on mobile when chat sheet is open
  useEffect(() => {
    if (isOpen && typeof window !== 'undefined' && window.innerWidth < 640) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

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

  // Initialize or retrieve persistent anonymous sessionId
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

  // Listen for global custom event to open the widget
  useEffect(() => {
    const handleOpenEvent = () => {
      setIsOpen(true);
      setShowCallout(false);
      setHasInteracted(true);
    };

    window.addEventListener('kairotrix:open-ai-widget', handleOpenEvent);
    return () => window.removeEventListener('kairotrix:open-ai-widget', handleOpenEvent);
  }, []);

  const dismissTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Show invitation callout badge after initial delay if user hasn't opened yet, and auto-dismiss after 6 seconds
  useEffect(() => {
    if (hasInteracted || isOpen) {
      setShowCallout(false);
      if (dismissTimerRef.current) clearTimeout(dismissTimerRef.current);
      return;
    }

    const showTimer = setTimeout(() => {
      if (!hasInteracted && !isOpen) {
        setShowCallout(true);
        dismissTimerRef.current = setTimeout(() => {
          setShowCallout(false);
        }, 6000);
      }
    }, 2800);

    return () => {
      clearTimeout(showTimer);
      if (dismissTimerRef.current) clearTimeout(dismissTimerRef.current);
    };
  }, [hasInteracted, isOpen]);

  const handleCalloutMouseEnter = () => {
    if (dismissTimerRef.current) {
      clearTimeout(dismissTimerRef.current);
    }
  };

  const handleCalloutMouseLeave = () => {
    if (showCallout) {
      dismissTimerRef.current = setTimeout(() => {
        setShowCallout(false);
      }, 3000);
    }
  };

  // Auto-scroll chat to latest message (smoothly during typing)
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' });
    }
  }, [messages, isTyping, isOpen, currentlyStreamingId, prefersReduced]);

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleOpenToggle = () => {
    setIsOpen((prev) => !prev);
    setShowCallout(false);
    setHasInteracted(true);
  };

  const handleReset = () => {
    setCurrentlyStreamingId(null);
    setMessages([
      {
        id: `msg-${Date.now()}`,
        sender: 'kiro',
        text: "Conversation cleared. How can I help your business today?",
        actions: KIRO_INITIAL_GREETING.actions,
        suggestedFollowUps: [
          "What services do you provide?",
          "Help me choose the right solution",
          "How do we start a project?",
        ],
        timestamp: 'Just now',
        isStreaming: false,
      },
    ]);
    setInputText('');
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMsgId(id);
    setTimeout(() => setCopiedMsgId(null), 2000);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend ?? inputText).trim();
    if (!query || isTyping) return;

    const userMsgId = `user-${Date.now()}`;
    const newMessages: ChatMessage[] = [
      ...messages,
      {
        id: userMsgId,
        sender: 'user',
        text: query,
        timestamp: 'Just now',
        isStreaming: false,
      },
    ];

    setMessages(newMessages);
    setInputText('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query, sessionId }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.reply) {
          const newBotMsgId = `kiro-${Date.now()}`;
          const cleanedText = cleanDisplayText(data.reply.text);
          setCurrentlyStreamingId(newBotMsgId);
          setMessages((prev) => [
            ...prev,
            {
              id: newBotMsgId,
              sender: 'kiro',
              text: cleanedText,
              actions: data.reply.actions,
              suggestedFollowUps: data.reply.suggestedFollowUps,
              timestamp: 'Just now',
              isStreaming: true,
            },
          ]);
          return;
        }
      }

      // Smooth fallback if response was non-200
      const reply = findAssistantResponse(query);
      const cleanedReply = cleanDisplayText(reply.text);
      const newBotMsgId = `kiro-${Date.now()}`;
      setCurrentlyStreamingId(newBotMsgId);
      setMessages((prev) => [
        ...prev,
        {
          id: newBotMsgId,
          sender: 'kiro',
          text: cleanedReply,
          actions: reply.actions,
          suggestedFollowUps: reply.suggestedFollowUps,
          timestamp: 'Just now',
          isStreaming: true,
        },
      ]);
    } catch {
      // Smooth fallback if network failed
      const reply = findAssistantResponse(query);
      const cleanedReply = cleanDisplayText(reply.text);
      const newBotMsgId = `kiro-${Date.now()}`;
      setCurrentlyStreamingId(newBotMsgId);
      setMessages((prev) => [
        ...prev,
        {
          id: newBotMsgId,
          sender: 'kiro',
          text: cleanedReply,
          actions: reply.actions,
          suggestedFollowUps: reply.suggestedFollowUps,
          timestamp: 'Just now',
          isStreaming: true,
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage();
  };

  const handleTypingComplete = useCallback((id: string) => {
    setCurrentlyStreamingId(null);
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isStreaming: false } : m))
    );
  }, []);

  if (pathname?.startsWith('/admin') || !isLoaded) {
    return null;
  }

  return (
    <>
      {/* 1. FLOATING LAUNCHER & INVITATION CALLOUT */}
      <div
        className={cn(
          "fixed z-50 flex flex-col items-end pointer-events-none transition-all duration-300",
          isSolutionDetailPage
            ? "bottom-20 right-4 sm:bottom-6 sm:right-6"
            : "bottom-5 right-4 sm:bottom-6 sm:right-6"
        )}
      >
        
        {/* Entrance Invitation Callout */}
        <AnimatePresence>
          {showCallout && !isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.94 }}
              transition={{ duration: 0.25 }}
              onMouseEnter={handleCalloutMouseEnter}
              onMouseLeave={handleCalloutMouseLeave}
              className="pointer-events-auto mb-2.5 bg-white border border-neutral-200/90 rounded-2xl shadow-xl hover:shadow-2xl pl-3 pr-2 py-2 flex items-center gap-2.5 relative cursor-pointer group hover:border-brand-400 transition-all select-none"
              onClick={handleOpenToggle}
            >
              <div className="relative w-6 h-6 rounded-full overflow-hidden shrink-0 ring-1.5 ring-brand-500/25">
                <Image
                  src="/assets/images/404/chat_icon.png"
                  alt="KIRO Avatar"
                  fill
                  sizes="24px"
                  className="object-cover"
                />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-medium text-xs sm:text-sm text-neutral-900 tracking-tight">
                  Need help?
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              </div>

              {/* Dismiss Callout Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowCallout(false);
                  setHasInteracted(true);
                }}
                className="text-neutral-400 hover:text-neutral-700 p-1 rounded-md hover:bg-neutral-100 cursor-pointer transition-colors ml-0.5"
                aria-label="Dismiss notification"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              {/* Speech bubble pointer notch */}
              <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white border-r border-b border-neutral-200/90 rotate-45 group-hover:border-brand-400 transition-colors" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Circular Avatar Trigger Button */}
        <motion.button
          type="button"
          onClick={handleOpenToggle}
          whileHover={prefersReduced ? {} : { scale: 1.05 }}
          whileTap={prefersReduced ? {} : { scale: 0.95 }}
          className="pointer-events-auto relative w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-white shadow-xl hover:shadow-[0_8px_30px_rgba(147,51,234,0.3)] border border-neutral-200/90 transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/40 cursor-pointer group flex items-center justify-center p-0.5"
          aria-label={isOpen ? 'Close AI Assistant' : 'Open AI Assistant'}
        >
          {/* Subtle Ambient Pulse Ring */}
          <span
            className="absolute inset-0 rounded-full bg-brand-500/20 animate-ping opacity-50 pointer-events-none"
            aria-hidden="true"
          />

          {/* Avatar Container */}
          <div className="relative w-full h-full rounded-full overflow-hidden bg-neutral-100 flex items-center justify-center">
            {isOpen ? (
              <X className="w-5 h-5 text-neutral-700 transition-transform group-hover:rotate-90 duration-300" />
            ) : (
              <Image
                src="/assets/images/404/chat_icon.png"
                alt="KIRO Assistant"
                fill
                priority
                sizes="56px"
                className="object-cover"
              />
            )}
          </div>

          {/* Live Status Dot */}
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white shadow-sm" />
        </motion.button>
      </div>

      {/* 2. CHAT WINDOW (PROFESSIONAL LIGHT THEME - MOBILE BOTTOM SHEET) */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Mobile Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
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
              {/* Mobile Grab Handle Indicator */}
              <div className="sm:hidden w-full flex justify-center pt-2.5 pb-1 shrink-0">
                <span className="w-10 h-1 rounded-full bg-neutral-300" />
              </div>

              {/* 2.1 CLEAN LIGHT HEADER (WITH LIVE STATUS BAR) */}
              <div className="px-4 py-3.5 bg-white border-b border-neutral-200/80 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-brand-500/20 shrink-0 bg-neutral-100">
                  <Image
                    src="/assets/images/404/chat_icon.png"
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
                    <span className="px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600 font-tech text-[10px] uppercase font-medium">
                      Assistant
                    </span>
                  </div>
                  {/* Live Status Bar */}
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[11px] text-neutral-500 font-medium">
                      Online • Ready to help
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleReset}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
                  title="Clear conversation"
                  aria-label="Clear conversation"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
                  title="Close assistant"
                  aria-label="Close assistant"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 2.2 CONVERSATION MESSAGE FEED */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-neutral-50/40">
              {messages.map((msg) => {
                const isCurrentlyTyping = currentlyStreamingId === msg.id;

                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.22 }}
                    className={`flex flex-col group ${
                      msg.sender === 'user' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`flex items-start gap-2.5 max-w-[88%] ${
                        msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                      }`}
                    >
                      {/* Bot Avatar */}
                      {msg.sender === 'kiro' && (
                        <div className="relative w-7 h-7 rounded-full overflow-hidden shrink-0 mt-0.5 ring-1 ring-neutral-200 bg-neutral-100">
                          <Image
                            src="/assets/images/404/chat_icon.png"
                            alt="KIRO"
                            fill
                            sizes="28px"
                            className="object-cover"
                          />
                        </div>
                      )}

                      {/* Chat Bubble */}
                      <div
                        className={`relative px-4 py-3 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs transition-all ${
                          msg.sender === 'user'
                            ? 'bg-neutral-900 text-white rounded-tr-xs'
                            : 'bg-white border border-neutral-200/80 text-neutral-800 rounded-tl-xs'
                        }`}
                      >
                        {/* Copy response button */}
                        {msg.sender === 'kiro' && !isCurrentlyTyping && (
                          <button
                            type="button"
                            onClick={() => handleCopyText(msg.id, msg.text)}
                            className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 text-neutral-400 hover:text-neutral-700 transition-opacity p-1 cursor-pointer"
                            title="Copy text"
                            aria-label="Copy text"
                          >
                            {copiedMsgId === msg.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        )}

                        {/* Text Content (with Typewriter animation for new bot responses) */}
                        {msg.sender === 'kiro' ? (
                          msg.isStreaming ? (
                            <TypewriterMessage
                              key={msg.id}
                              text={msg.text}
                              onComplete={() => handleTypingComplete(msg.id)}
                            />
                          ) : (
                            <div>{renderCleanText(msg.text)}</div>
                          )
                        ) : (
                          <p className="text-xs sm:text-sm leading-relaxed">{msg.text}</p>
                        )}

                        {/* Action Links (Revealed after typing) */}
                        {msg.actions && msg.actions.length > 0 && !isCurrentlyTyping && (
                          <motion.div
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                            className="mt-3 pt-2.5 border-t border-neutral-100 flex flex-wrap gap-1.5"
                          >
                            {msg.actions.map((act, actIdx) => (
                              <Link
                                key={actIdx}
                                href={act.href}
                                onClick={() => setIsOpen(false)}
                                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                                  act.variant === 'primary'
                                    ? 'bg-brand-600 hover:bg-brand-700 text-white shadow-xs'
                                    : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-800'
                                }`}
                              >
                                <span>{act.label}</span>
                                <ArrowRight className="w-3 h-3" />
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </div>
                    </div>

                    {/* Suggested Follow-Up Questions (Revealed after typing) */}
                    {msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && !isCurrentlyTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: 0.1 }}
                        className="mt-2 pl-9 flex flex-wrap gap-1.5"
                      >
                        {msg.suggestedFollowUps.map((chip, chipIdx) => (
                          <button
                            key={chipIdx}
                            type="button"
                            onClick={() => handleSendMessage(chip)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white hover:bg-neutral-100 text-neutral-700 border border-neutral-200/80 text-xs font-normal transition-colors cursor-pointer text-left shadow-2xs"
                          >
                            <ChevronRight className="w-3 h-3 text-brand-500 shrink-0" />
                            <span>{chip}</span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}

              {/* Awaiting API Response Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-2.5"
                >
                  <div className="relative w-7 h-7 rounded-full overflow-hidden shrink-0 mt-0.5 ring-1 ring-neutral-200 bg-neutral-100">
                    <Image
                      src="/assets/images/404/chat_icon.png"
                      alt="KIRO"
                      fill
                      sizes="28px"
                      className="object-cover"
                    />
                  </div>
                  <div className="px-4 py-3 rounded-2xl bg-white border border-neutral-200/80 rounded-tl-xs shadow-xs flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-bounce" />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* 2.3 QUICK STARTER QUESTIONS (VISIBLE AT START) */}
            {messages.length <= 1 && (
              <div className="px-4 py-2.5 bg-white border-t border-neutral-100 overflow-x-auto scrollbar-none flex gap-1.5">
                {QUICK_STARTER_PROMPTS.map((prompt) => (
                  <button
                    key={prompt.id}
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

            {/* 2.4 INPUT BAR */}
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
                  onClick={() => setIsOpen(false)}
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
    </>
  );
}
