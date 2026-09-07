'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Send,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  MessageSquare,
} from 'lucide-react';
import {
  KIRO_INITIAL_GREETING,
  QUICK_STARTER_PROMPTS,
  findAssistantResponse,
  AssistantResponse,
  ActionButton,
} from '@/data/aiAssistantKnowledge';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ChatMessage {
  id: string;
  sender: 'user' | 'kiro';
  text: string;
  actions?: ActionButton[];
  suggestedFollowUps?: string[];
  timestamp: string;
}

export function AIAssistant() {
  const prefersReduced = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [showCallout, setShowCallout] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'msg-init',
      sender: 'kiro',
      text: KIRO_INITIAL_GREETING.text,
      actions: KIRO_INITIAL_GREETING.actions,
      suggestedFollowUps: KIRO_INITIAL_GREETING.suggestedFollowUps,
      timestamp: 'Just now',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Show invitation callout badge after initial delay if user hasn't opened yet
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasInteracted && !isOpen) {
        setShowCallout(true);
      }
    }, 2800);

    return () => clearTimeout(timer);
  }, [hasInteracted, isOpen]);

  // Auto-scroll chat to latest message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
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
    setMessages([
      {
        id: `msg-${Date.now()}`,
        sender: 'kiro',
        text: KIRO_INITIAL_GREETING.text,
        actions: KIRO_INITIAL_GREETING.actions,
        suggestedFollowUps: KIRO_INITIAL_GREETING.suggestedFollowUps,
        timestamp: 'Just now',
      },
    ]);
    setInputText('');
  };

  const handleSendMessage = (textToSend?: string) => {
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
      },
    ];

    setMessages(newMessages);
    setInputText('');
    setIsTyping(true);

    // Natural assistant reaction delay
    setTimeout(() => {
      const reply = findAssistantResponse(query);
      setMessages((prev) => [
        ...prev,
        {
          id: `kiro-${Date.now()}`,
          sender: 'kiro',
          text: reply.text,
          actions: reply.actions,
          suggestedFollowUps: reply.suggestedFollowUps,
          timestamp: 'Just now',
        },
      ]);
      setIsTyping(false);
    }, 450);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage();
  };

  // Simple Markdown-style formatter for bold and bullet points
  const renderFormattedText = (rawText: string) => {
    const lines = rawText.split('\n');
    return lines.map((line, lineIdx) => {
      if (!line.trim()) {
        return <div key={lineIdx} className="h-2" />;
      }

      // Handle bold **text**
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const parsedContent = parts.map((part, partIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={partIdx} className="font-bold text-neutral-950">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      });

      // Handle bullet point lines
      if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
        return (
          <div key={lineIdx} className="flex items-start gap-2 pl-1 my-0.5 text-xs sm:text-sm">
            <span className="text-brand-500 font-bold select-none">•</span>
            <span className="flex-1">{parsedContent}</span>
          </div>
        );
      }

      return (
        <p key={lineIdx} className="text-xs sm:text-sm leading-relaxed mb-1.5 last:mb-0">
          {parsedContent}
        </p>
      );
    });
  };

  return (
    <>
      {/* 1. FLOATING LAUNCHER & INVITATION BADGE */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end pointer-events-none">
        
        {/* Entrance Invitation Callout */}
        <AnimatePresence>
          {showCallout && !isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="pointer-events-auto mb-3 max-w-[280px] bg-white border border-neutral-200/80 rounded-2xl shadow-xl p-3.5 flex items-start gap-3 relative cursor-pointer group hover:border-brand-300 transition-colors"
              onClick={handleOpenToggle}
            >
              <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 ring-2 ring-brand-500/30">
                <Image
                  src="/assets/images/404/chat_icon.png"
                  alt="KIRO Avatar"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0 pr-4">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="font-display font-bold text-xs text-neutral-900">KIRO</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-tech text-[10px] text-neutral-600 uppercase">AI Rep</span>
                </div>
                <p className="text-xs text-neutral-600 leading-snug">
                  Have questions about our solutions or engineering approach?
                </p>
              </div>

              {/* Dismiss Callout Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowCallout(false);
                  setHasInteracted(true);
                }}
                className="absolute top-2 right-2 text-neutral-600 hover:text-neutral-700 p-1 cursor-pointer"
                aria-label="Dismiss message"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* The Main Circular Avatar Trigger Button */}
        <motion.button
          type="button"
          onClick={handleOpenToggle}
          whileHover={prefersReduced ? {} : { scale: 1.06 }}
          whileTap={prefersReduced ? {} : { scale: 0.96 }}
          className="pointer-events-auto relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-neutral-950 p-0.5 shadow-2xl hover:shadow-[0_8px_30px_rgba(147,51,234,0.4)] transition-shadow duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/50 cursor-pointer group"
          aria-label={isOpen ? 'Close KIRO AI Assistant' : 'Open KIRO AI Assistant'}
        >
          {/* Subtle Ambient Pulse Ring */}
          <span
            className="absolute inset-0 rounded-full bg-brand-500/30 animate-ping opacity-60 pointer-events-none"
            aria-hidden="true"
          />

          {/* Glowing Avatar Border Container */}
          <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-brand-500/60 group-hover:border-brand-400 transition-colors bg-surface-dark flex items-center justify-center">
            {isOpen ? (
              <X className="w-6 h-6 text-white transition-transform group-hover:rotate-90 duration-300" />
            ) : (
              <Image
                src="/assets/images/404/chat_icon.png"
                alt="KIRO Assistant"
                fill
                priority
                className="object-cover"
              />
            )}
          </div>

          {/* Active Live Status Dot */}
          <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white shadow-sm" />
        </motion.button>
      </div>

      {/* 2. EXPANDABLE CHAT CHAMBER */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.94 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-3 bottom-22 sm:bottom-24 sm:right-6 sm:left-auto z-50 w-auto sm:w-[410px] h-[550px] max-h-[82vh] bg-white/95 backdrop-blur-xl border border-neutral-200/90 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.18)] flex flex-col overflow-hidden text-neutral-900"
          >
            {/* Header */}
            <div className="px-4.5 py-3.5 bg-neutral-950 text-white flex items-center justify-between border-b border-neutral-800">
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-brand-500/60 shrink-0 bg-neutral-900">
                  <Image
                    src="/assets/images/404/chat_icon.png"
                    alt="KIRO"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-display font-bold text-sm tracking-tight text-white">
                      KIRO
                    </h3>
                    <span className="px-1.5 py-0.5 rounded-full bg-brand-500/20 text-brand-300 font-tech text-[9px] uppercase tracking-wider font-semibold border border-brand-500/40">
                      Representative
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-400 font-tech flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    KAIROTRIX Systems Navigator
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleReset}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                  title="Reset conversation"
                  aria-label="Reset conversation"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                  title="Close assistant"
                  aria-label="Close assistant"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Message History Area */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-gradient-to-b from-neutral-50/50 to-white">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`flex items-start gap-2.5 max-w-[88%] ${
                      msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    {/* KIRO Avatar for Bot responses */}
                    {msg.sender === 'kiro' && (
                      <div className="relative w-7 h-7 rounded-full overflow-hidden shrink-0 mt-0.5 ring-1 ring-brand-500/40">
                        <Image
                          src="/assets/images/404/chat_icon.png"
                          alt="KIRO"
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}

                    {/* Chat Bubble */}
                    <div
                      className={`px-3.5 py-3 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                        msg.sender === 'user'
                          ? 'bg-neutral-950 text-white rounded-tr-xs'
                          : 'bg-white border border-neutral-200/80 text-neutral-800 rounded-tl-xs'
                      }`}
                    >
                      {msg.sender === 'kiro' ? (
                        <div>{renderFormattedText(msg.text)}</div>
                      ) : (
                        <p>{msg.text}</p>
                      )}

                      {/* Embedded Action Buttons */}
                      {msg.actions && msg.actions.length > 0 && (
                        <div className="mt-3 pt-2.5 border-t border-neutral-100 flex flex-wrap gap-1.5">
                          {msg.actions.map((act, actIdx) => (
                            <Link
                              key={actIdx}
                              href={act.href}
                              onClick={() => setIsOpen(false)}
                              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-tech font-semibold tracking-wide transition-all cursor-pointer ${
                                act.variant === 'primary'
                                  ? 'bg-brand-600 hover:bg-brand-700 text-white shadow-xs'
                                  : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-800'
                              }`}
                            >
                              <span>{act.label}</span>
                              <ArrowRight className="w-3 h-3" />
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Suggested Follow-Up Chips underneath KIRO message */}
                  {msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && (
                    <div className="mt-2.5 pl-9 flex flex-wrap gap-1.5">
                      {msg.suggestedFollowUps.map((chip, chipIdx) => (
                        <button
                          key={chipIdx}
                          type="button"
                          onClick={() => handleSendMessage(chip)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-neutral-100/90 hover:bg-brand-50 hover:text-brand-700 text-neutral-600 border border-neutral-200 text-[11px] font-medium transition-colors cursor-pointer text-left"
                        >
                          <ChevronRight className="w-3 h-3 text-brand-500 shrink-0" />
                          <span>{chip}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex items-start gap-2.5">
                  <div className="relative w-7 h-7 rounded-full overflow-hidden shrink-0 mt-0.5 ring-1 ring-brand-500/40">
                    <Image
                      src="/assets/images/404/chat_icon.png"
                      alt="KIRO"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="px-4 py-2.5 rounded-2xl bg-white border border-neutral-200/80 rounded-tl-xs shadow-xs flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-bounce" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Starter Pills Bar (Visible if only 1 message) */}
            {messages.length <= 1 && (
              <div className="px-3.5 py-2 bg-neutral-50/80 border-t border-neutral-100 overflow-x-auto scrollbar-none flex gap-1.5">
                {QUICK_STARTER_PROMPTS.map((prompt) => (
                  <button
                    key={prompt.id}
                    type="button"
                    onClick={() => handleSendMessage(prompt.query)}
                    className="shrink-0 px-2.5 py-1 rounded-lg bg-white border border-neutral-200 text-neutral-700 hover:border-brand-400 hover:text-brand-700 text-[11px] font-tech font-medium transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Sparkles className="w-2.5 h-2.5 text-brand-500" />
                    <span>{prompt.label}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Input Form Bar */}
            <div className="p-3 bg-white border-t border-neutral-200/80">
              <form onSubmit={handleFormSubmit} className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Ask KIRO anything..."
                  className="flex-1 px-3.5 py-2.5 bg-neutral-100 hover:bg-neutral-100/80 focus:bg-white rounded-xl text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-600 border border-transparent focus:border-brand-500 focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim() || isTyping}
                  className="p-2.5 rounded-xl bg-neutral-950 hover:bg-brand-600 disabled:opacity-30 disabled:pointer-events-none text-white transition-colors cursor-pointer shrink-0 shadow-xs"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              
              <div className="mt-1.5 flex items-center justify-between text-[10px] text-neutral-600 font-tech px-1">
                <span>Principal engineers response &lt; 24h</span>
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="text-brand-600 hover:underline inline-flex items-center gap-0.5"
                >
                  Direct contact <ArrowRight className="w-2.5 h-2.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
