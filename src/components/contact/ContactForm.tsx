'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

const INTEREST_OPTIONS = [
  'AI & Intelligent Systems',
  'Software & Product Engineering',
  'Automation & Operations',
  'Digital Transformation',
  'Data & Business Intelligence',
  'Technology Integration',
  'General Inquiry',
];

export function ContactForm() {
  const searchParams = useSearchParams();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState<string>('General Inquiry');
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Auto-detect interest from URL params (?interest=... or ?service=...)
  useEffect(() => {
    const urlInterest = searchParams.get('interest') || searchParams.get('service');
    if (urlInterest) {
      const lower = urlInterest.toLowerCase();
      if (lower.includes('ai') || lower.includes('agent')) {
        setInterest('AI & Intelligent Systems');
      } else if (lower.includes('software') || lower.includes('work') || lower.includes('build')) {
        setInterest('Software & Product Engineering');
      } else if (lower.includes('auto') || lower.includes('workflow')) {
        setInterest('Automation & Operations');
      } else if (lower.includes('data') || lower.includes('bi')) {
        setInterest('Data & Business Intelligence');
      } else if (lower.includes('transform')) {
        setInterest('Digital Transformation');
      } else if (lower.includes('integration') || lower.includes('api')) {
        setInterest('Technology Integration');
      }
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
      setErrorMessage('Please provide a valid work email address.');
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
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setMessage('');
    setIsSuccess(false);
    setErrorMessage(null);
  };

  return (
    <div className="w-full bg-neutral-0 rounded-3xl border border-neutral-200/90 p-6 sm:p-8 lg:p-10 shadow-lg">
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
              Message Received.
            </h3>

            <p className="text-sm sm:text-base text-neutral-600 max-w-md mx-auto leading-relaxed mb-8">
              Thank you, <span className="font-semibold text-neutral-900">{name}</span>. We will review your inquiry and follow up directly at{' '}
              <span className="font-semibold text-neutral-900">{email}</span> within 24 hours.
            </p>

            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-tech text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <span>Send Another Note</span>
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
                Start a Direct Conversation
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500 font-normal">
                No lengthy questionnaires — just the essentials to get in touch.
              </p>
            </div>

            {errorMessage && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Name & Email (2 Columns on Tablet/Desktop) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block font-tech text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-2"
                >
                  Your Name <span className="text-brand-600">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  placeholder="e.g. Alex Mercer"
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
                  Work Email <span className="text-brand-600">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  placeholder="alex@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200/90 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                />
              </div>
            </div>

            {/* Area of Interest Chips */}
            <div>
              <label className="block font-tech text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-2">
                What are you looking to build or solve? <span className="text-neutral-400 font-normal">(Optional)</span>
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
                placeholder="Briefly describe your challenge, workflow bottleneck, or what you'd like to build..."
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
                    <span>Sending Inquiry...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
              <p className="text-[11px] text-neutral-500 mt-3 font-normal">
                Direct engineer review • Response within 24 hours • 100% confidential
              </p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
