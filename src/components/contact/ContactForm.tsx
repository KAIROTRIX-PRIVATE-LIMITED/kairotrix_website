'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  X,
} from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useContact } from '@/components/contact/ContactContext';
import { EASE_CINEMATIC } from '@/lib/animations';

export function ContactForm() {
  const shouldReduceMotion = useReducedMotion();
  const {
    name,
    setName,
    email,
    setEmail,
    company,
    setCompany,
    message,
    setMessage,
    incomingContext,
    clearIncomingContext,
    resetAll,
  } = useContact();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name.trim()) {
      setErrorMessage('Please provide your name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }
    if (!message.trim()) {
      setErrorMessage('Please briefly describe what you are looking to build, improve, or solve.');
      return;
    }

    setIsSubmitting(true);

    try {
      const formattedInterest = incomingContext?.label || 'General Inquiry';
      const structuredMessage = company.trim()
        ? `Company: ${company.trim()}\n\n${message.trim()}`
        : message.trim();

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          interest: formattedInterest,
          message: structuredMessage,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong while sending your message.');
      }

      setIsSuccess(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage(
          'Something went wrong while sending your message. Please try again or email us directly at kairotrix.official@gmail.com.'
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    resetAll();
    setIsSuccess(false);
    setErrorMessage(null);
  };

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: EASE_CINEMATIC }}
      className="relative w-full bg-white rounded-2xl sm:rounded-3xl border border-neutral-200/90 p-5 sm:p-10 lg:p-12 shadow-[0_8px_32px_rgba(0,0,0,0.04)] overflow-hidden"
    >
      {/* Subtle brand glow accent */}
      <div
        className="absolute top-0 right-0 w-80 h-80 bg-brand-500/[0.04] rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            key="success"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35 }}
            className="py-14 px-4 text-center flex flex-col items-center"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mb-6 shadow-xs">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-mono text-xs font-bold uppercase tracking-wider mb-4">
              <span>MESSAGE RECEIVED</span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-neutral-950 mb-3">
              Thanks — your message has been received.
            </h3>

            <p className="text-base text-neutral-600 max-w-lg mx-auto leading-relaxed mb-8">
              We&apos;ll review what you&apos;ve shared and aim to follow up at{' '}
              <span className="font-bold text-neutral-950 underline decoration-neutral-300 underline-offset-4">
                {email}
              </span>{' '}
              within one business day.
            </p>

            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-neutral-950 hover:bg-brand-600 text-white font-sans font-semibold text-sm transition-colors cursor-pointer shadow-md"
            >
              <span>Send Another Message</span>
            </button>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {/* ── Form Header ── */}
            <div className="border-b border-neutral-200 pb-6 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                <span className="flex h-2 w-2 rounded-full bg-brand-500" />
                <span className="font-tech text-xs tracking-[0.2em] font-semibold text-brand-600 uppercase">
                  GET IN TOUCH
                </span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-neutral-950">
                Send Us a Message
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 mt-2 font-normal leading-relaxed max-w-xl mx-auto sm:mx-0">
                Tell us about your project, idea, or problem. Every note is reviewed directly by our engineering leads.
              </p>
            </div>

            {/* Incoming Context Banner if visiting from solutions/work */}
            {incomingContext && (
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-brand-50 border border-brand-200 text-xs sm:text-sm text-neutral-900">
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-brand-600 shrink-0" />
                  <span>
                    {incomingContext.source ? `Exploring from ${incomingContext.source}: ` : `Topic: `}
                    <strong className="font-bold text-brand-700">{incomingContext.label}</strong>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={clearIncomingContext}
                  className="text-neutral-400 hover:text-neutral-800 p-1 rounded-md hover:bg-white transition-colors cursor-pointer"
                  aria-label="Clear context"
                  title="Clear context"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-center gap-3 font-medium"
              >
                <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
                <span>{errorMessage}</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="font-sans text-sm font-semibold text-neutral-900 block mb-2"
                  >
                    Your Name <span className="text-brand-600 font-bold">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="e.g. Maya Patel"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl bg-neutral-50/50 border border-neutral-300 text-neutral-950 text-base placeholder:text-neutral-400 font-sans focus:bg-white focus:outline-none focus:border-brand-600 focus:ring-4 focus:ring-brand-500/15 transition-all shadow-xs"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="font-sans text-sm font-semibold text-neutral-900 block mb-2"
                  >
                    Email Address <span className="text-brand-600 font-bold">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl bg-neutral-50/50 border border-neutral-300 text-neutral-950 text-base placeholder:text-neutral-400 font-sans focus:bg-white focus:outline-none focus:border-brand-600 focus:ring-4 focus:ring-brand-500/15 transition-all shadow-xs"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-company"
                  className="font-sans text-sm font-semibold text-neutral-900 block mb-2"
                >
                  Business / Company <span className="text-neutral-500 font-normal text-xs">(optional)</span>
                </label>
                <input
                  id="contact-company"
                  type="text"
                  placeholder="Company or organization name"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl bg-neutral-50/50 border border-neutral-300 text-neutral-950 text-base placeholder:text-neutral-400 font-sans focus:bg-white focus:outline-none focus:border-brand-600 focus:ring-4 focus:ring-brand-500/15 transition-all shadow-xs"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="font-sans text-sm font-semibold text-neutral-900 block mb-2"
                >
                  What Would You Like to Discuss? <span className="text-brand-600 font-bold">*</span>
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  placeholder="Briefly describe what you're looking to build, improve, or solve..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl bg-neutral-50/50 border border-neutral-300 text-neutral-950 text-base placeholder:text-neutral-400 font-sans focus:bg-white focus:outline-none focus:border-brand-600 focus:ring-4 focus:ring-brand-500/15 transition-all shadow-xs resize-y leading-relaxed"
                />
                <p className="mt-2 text-xs text-neutral-500 font-sans leading-normal">
                  Please don&apos;t include passwords, credentials, or sensitive access keys.
                </p>
              </div>

              {/* ── Submit Action & Guarantees ── */}
              <div className="pt-3 border-t border-neutral-200">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-neutral-950 hover:bg-brand-600 active:scale-[0.99] text-white font-sans font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-brand-500/25 disabled:opacity-50 cursor-pointer group"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin text-brand-300" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </>
                  )}
                </button>

                <div className="mt-5 flex flex-wrap items-center justify-center sm:justify-between gap-3 text-xs sm:text-sm text-neutral-600 font-medium font-sans text-center sm:text-left">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                    Every inquiry is reviewed
                  </span>
                  <span>• We aim to respond within 1 business day</span>
                  <span>• Handled responsibly</span>
                </div>
              </div>
            </form>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
