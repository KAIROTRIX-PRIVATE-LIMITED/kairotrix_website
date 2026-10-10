'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

// Dynamically import the heavy ChatModal (messages, streaming, RAG knowledge, markdown parser)
// so that the initial page bundle carries 0KB of chat dialog weight.
const ChatModal = dynamic(
  () => import('./ChatModal').then((mod) => mod.ChatModal),
  { ssr: false }
);

export function AIAssistant() {
  const pathname = usePathname();
  const isSolutionDetailPage = Boolean(pathname?.startsWith('/solutions/') && pathname !== '/solutions');
  const prefersReduced = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [showCallout, setShowCallout] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Preload ChatModal module on hover over trigger button so click is instantaneous
  const handleMouseEnterTrigger = () => {
    import('./ChatModal');
  };

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

  const handleOpenToggle = () => {
    setIsOpen((prev) => !prev);
    setShowCallout(false);
    setHasInteracted(true);
  };

  return (
    <>
      {/* 1. FLOATING AVATAR TRIGGER (LIGHT THEME) */}
      <div
        className={cn(
          "fixed z-40 transition-all duration-300 flex flex-col items-end pointer-events-none pb-safe",
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
                  src="/assets/images/404/chat_icon.webp"
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
          onMouseEnter={handleMouseEnterTrigger}
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
                src="/assets/images/404/chat_icon.webp"
                alt="KIRO Assistant"
                fill
                sizes="56px"
                className="object-cover"
              />
            )}
          </div>

          {/* Live Status Dot */}
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white shadow-sm" />
        </motion.button>
      </div>

      {/* 2. CHAT MODAL (LAZY-LOADED) */}
      {isOpen && (
        <ChatModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
