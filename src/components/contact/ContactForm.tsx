'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, AlertCircle, Loader2, X } from 'lucide-react';

const INTEREST_OPTIONS = [
  'AI & Intelligent Systems',
  'Software & Product Engineering',
  'Automation & Operations',
  'Digital Transformation',
  'Data & Business Intelligence',
  'Technology Integration',
  'General Inquiry',
];

// Map URL source/interest params to readable context labels
function resolveIncomingContext(params: URLSearchParams): string | null {
  const source = params.get('source');
  const interest = params.get('interest') || params.get('service');
  const solution = params.get('solution');

  if (solution) {
    // Map solution slugs to readable names
    const solutionMap: Record<string, string> = {
      'ai-intelligent-systems': 'AI & Intelligent Systems',
      'software-product-engineering': 'Software & Product Engineering',
      'automation-digital-operations': 'Automation & Operations',
      'digital-transformation': 'Digital Transformation',
      'data-business-intelligence': 'Data & Business Intelligence',
      'technology-integration': 'Technology Integration',
    };
    return solutionMap[solution] || null;
  }

  if (interest) {
    const lower = interest.toLowerCase();
    if (lower.includes('ai') || lower.includes('agent')) return 'AI & Intelligent Systems';
    if (lower.includes('software') || lower.includes('work') || lower.includes('build'))
      return 'Software & Product Engineering';
    if (lower.includes('auto') || lower.includes('workflow')) return 'Automation & Operations';
    if (lower.includes('data') || lower.includes('bi')) return 'Data & Business Intelligence';
    if (lower.includes('transform')) return 'Digital Transformation';
    if (lower.includes('integration') || lower.includes('api')) return 'Technology Integration';
  }

  // Source pages don't auto-select an interest but could show contextual text
  if (source) {
    const sourceLabels: Record<string, string> = {
      'solutions-hub': 'Solutions',
      'about': 'About KAIROTRIX',
      'insights': 'Articles & Insights',
    };
    return sourceLabels[source] ? `Arrived from: ${sourceLabels[source]}` : null;
  }

  return null;
}

export function ContactForm() {
  const searchParams = useSearchParams();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [interest, setInterest] = useState<string>('General Inquiry');
  const [message, setMessage] = useState('');
  const [incomingContext, setIncomingContext] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Auto-detect interest and context from URL params
  useEffect(() => {
    const context = resolveIncomingContext(searchParams);
    if (context) {
      // If context maps to an interest option, pre-select it
      const matchedInterest = INTEREST_OPTIONS.find((opt) => context === opt);
      if (matchedInterest) {
        setInterest(matchedInterest);
      }
      setIncomingContext(context);
    }
  }, [searchParams]);

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
      setErrorMessage('Please provide a brief message or description.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          company: company.trim() || undefined,
          interest,
          message: message.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send message.');
      }

      setIsSuccess(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('Something went wrong while sending your message. Please try again or email us directly at connect@kairotrix.com.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setCompany('');
    setMessage('');
    setIsSuccess(false);
    setErrorMessage(null);
  };

  return (
    <div className="w-full bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-8 lg:p-10 shadow-lg">
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3 }}
            className="py-12 px-4 text-center flex flex-col items-center"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mb-6 shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-neutral-950 mb-3">
              Thanks — message received.
            </h3>

            <p className="text-sm sm:text-base text-neutral-600 max-w-md mx-auto leading-relaxed mb-8">
              We&apos;ll review what you&apos;ve shared and aim to follow up at{' '}
              <span className="font-semibold text-neutral-900">{email}</span> within one business day.
            </p>

            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-tech text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <span>Send Another Message</span>
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-950 mb-1">
                Start a Conversation
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500 font-normal">
                No lengthy questionnaires — just the essentials to get in touch.
              </p>
            </div>

            {/* Incoming Context Banner */}
            {incomingContext && !INTEREST_OPTIONS.includes(incomingContext) && (
              <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-brand-50/60 border border-brand-200/50 text-xs">
                <span className="font-tech font-semibold text-brand-700 uppercase tracking-wider">
                  {incomingContext}
                </span>
                <button
                  type="button"
                  onClick={() => setIncomingContext(null)}
                  className="p-1 rounded-lg hover:bg-brand-100 text-brand-500 hover:text-brand-700 transition-colors cursor-pointer"
                  aria-label="Dismiss context"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {errorMessage && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Name, Email & Company */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block font-tech text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-2"
                >
                  Name <span className="text-brand-600">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200/90 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="block font-tech text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-2"
                >
                  Email <span className="text-brand-600">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200/90 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                />
              </div>
            </div>

            {/* Optional Company */}
            <div>
              <label
                htmlFor="contact-company"
                className="block font-tech text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-2"
              >
                Business / Company <span className="text-neutral-400 font-normal">(Optional)</span>
              </label>
              <input
                id="contact-company"
                type="text"
                placeholder="Company name"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200/90 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
              />
            </div>

            {/* Area of Interest Chips */}
            <div>
              <label className="block font-tech text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-2">
                What would you like to discuss? <span className="text-neutral-400 font-normal">(Optional)</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {INTEREST_OPTIONS.map((opt) => {
                  const isSelected = interest === opt;
                  return (
                    <button
                      type="button"
                      key={opt}
                      onClick={() => setInterest(opt)}
                      className={`px-3 py-1.5 rounded-xl font-tech text-xs transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'bg-brand-50 text-brand-700 border-2 border-brand-500 font-semibold shadow-2xs'
                          : 'bg-neutral-50 text-neutral-600 border border-neutral-200 hover:bg-neutral-100 hover:text-neutral-900'
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Message Textarea */}
            <div>
              <label
                htmlFor="contact-message"
                className="block font-tech text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-2"
              >
                How can we help? <span className="text-brand-600">*</span>
              </label>
              <textarea
                id="contact-message"
                required
                rows={4}
                placeholder="Briefly describe what you're looking to build, improve, or solve..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200/90 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all resize-y"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-neutral-950 hover:bg-brand-600 text-white font-tech font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer group"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
              <p className="text-[11px] text-neutral-500 mt-3 font-normal">
                Every inquiry is reviewed • We aim to respond within one business day
              </p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
