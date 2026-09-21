'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Send, CheckCircle2, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';
import type { SolutionDetail } from '@/data/solutionsData';

interface SolutionConsultationFormProps {
  solution: SolutionDetail;
}

export function SolutionConsultationForm({ solution }: SolutionConsultationFormProps) {
  const [projectType, setProjectType] = useState<'mvp' | 'enterprise'>('enterprise');
  const [projectScale, setProjectScale] = useState<string>('$25k - $50k');
  const [selectedSub, setSelectedSub] = useState<string>(solution.subCategories[0]?.title || '');
  const [submitted, setSubmitted] = useState(false);

  const scaleOptions = ['< $25k', '$25k - $50k', '$50k - $100k', '> $100k'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact-cta" className="w-full bg-neutral-50/70 py-24 lg:py-32 border-b border-neutral-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ─── SPLIT CONSULTATION SECTION (Matching 00:22 - 00:23 in video) ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Editorial Invitation & Contact Info */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-pulse" />
                <span className="font-tech text-xs tracking-[0.25em] font-semibold text-brand-600 uppercase">
                  INITIATE COLLABORATION
                </span>
                <div className="h-px w-10 sm:w-16 bg-neutral-200" />
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] text-neutral-950 uppercase leading-[1.12]">
                LET&apos;S TALK ABOUT YOUR <span className="gradient-signature-text">ARCHITECTURE.</span>
              </h2>
              <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
                Every breakthrough begins with a technical conversation. Tell us about your operational bottlenecks, product vision, or system integration goals.
              </p>
            </div>

            {/* Direct Contact Points (Matching 00:22 in video) */}
            <div className="space-y-4 pt-4 border-t border-neutral-200">
              <div className="flex items-center gap-3 text-sm text-neutral-700">
                <Mail className="w-4 h-4 text-brand-600 shrink-0" />
                <span className="font-tech text-xs text-neutral-400 uppercase tracking-wider w-20">EMAIL</span>
                <span className="font-medium text-neutral-900">contact@kairotrix.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-neutral-700">
                <ShieldCheck className="w-4 h-4 text-brand-600 shrink-0" />
                <span className="font-tech text-xs text-neutral-400 uppercase tracking-wider w-20">INTEGRITY</span>
                <span className="font-medium text-neutral-900">100% Code Ownership & NDA Guaranteed</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-neutral-700">
                <MapPin className="w-4 h-4 text-brand-600 shrink-0" />
                <span className="font-tech text-xs text-neutral-400 uppercase tracking-wider w-20">DELIVERY</span>
                <span className="font-medium text-neutral-900">Global Engineering Delivery</span>
              </div>
            </div>
          </div>

          {/* Right Column: Structured Architecture Form (Matching 00:22 - 00:23 in video) */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-neutral-200 shadow-xl relative overflow-hidden">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-900">
                    Inquiry Transmitted
                  </h3>
                  <p className="text-sm text-neutral-600 max-w-md mx-auto">
                    Our lead systems architect will review your architecture requirements and reach out within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="text-xs font-tech font-bold uppercase tracking-wider text-neutral-400 mb-2">
                    Enter Technical Scope
                  </div>

                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-tech font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 text-sm focus:outline-none focus:border-brand-500 focus:bg-white transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-tech font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                        Work Email
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="john@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 text-sm focus:outline-none focus:border-brand-500 focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  {/* Sub-Discipline Select Dropdown */}
                  <div>
                    <label className="block text-xs font-tech font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                      Primary Discipline Focus
                    </label>
                    <select
                      value={selectedSub}
                      onChange={(e) => setSelectedSub(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-900 text-sm focus:outline-none focus:border-brand-500 focus:bg-white transition-colors"
                    >
                      {solution.subCategories.map((sub) => (
                        <option key={sub.id} value={sub.title}>
                          {sub.number} // {sub.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Project Type Toggle (Matching 00:22 Residential / Commercial toggle) */}
                  <div>
                    <label className="block text-xs font-tech font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                      Architecture Type
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setProjectType('mvp')}
                        className={`py-2.5 px-4 rounded-xl text-xs font-tech font-semibold uppercase tracking-wider border transition-all ${
                          projectType === 'mvp'
                            ? 'bg-neutral-900 text-white border-neutral-900'
                            : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-neutral-400'
                        }`}
                      >
                        Rapid MVP / Prototype
                      </button>
                      <button
                        type="button"
                        onClick={() => setProjectType('enterprise')}
                        className={`py-2.5 px-4 rounded-xl text-xs font-tech font-semibold uppercase tracking-wider border transition-all ${
                          projectType === 'enterprise'
                            ? 'bg-neutral-900 text-white border-neutral-900'
                            : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-neutral-400'
                        }`}
                      >
                        Production Enterprise Engine
                      </button>
                    </div>
                  </div>

                  {/* Project Scale Chips (Matching 00:22 Scale chips) */}
                  <div>
                    <label className="block text-xs font-tech font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                      Project Scale / Budget Scope
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {scaleOptions.map((scale) => (
                        <button
                          key={scale}
                          type="button"
                          onClick={() => setProjectScale(scale)}
                          className={`py-2 px-3 rounded-xl text-xs font-tech font-medium border transition-all text-center ${
                            projectScale === scale
                              ? 'bg-brand-50 text-brand-700 border-brand-500 font-bold'
                              : 'bg-neutral-50 text-neutral-600 border-neutral-200 hover:border-neutral-300'
                          }`}
                        >
                          {scale}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-tech font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[0.99]"
                    >
                      <span>Submit Architecture Inquiry</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
