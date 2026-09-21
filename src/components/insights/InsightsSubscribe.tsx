'use client';

import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

export function InsightsSubscribe() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setIsSubscribed(true);
    }
  };

  return (
    <section className="w-full border-b border-neutral-200/80 bg-[#FAFAFC]">
      <div className="grid grid-cols-1 lg:grid-cols-3">
        {/* Column 1: Subscribe Heading & Narrative */}
        <div className="lg:col-span-1 p-8 sm:p-10 border-b lg:border-b-0 lg:border-r border-neutral-200/80 flex flex-col justify-between">
          <div>
            {/* Tech Glyph Eyebrow matching reference video */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-0.5 text-brand-600 font-bold font-mono text-xs">
                <span className="inline-block w-1.5 h-3 bg-brand-600 rounded-2xs" />
                <span className="inline-block w-1.5 h-3 bg-brand-600 rounded-2xs" />
              </div>
              <span className="font-mono text-xs tracking-wider uppercase font-semibold text-neutral-900">
                [KTRX®—STAY UPDATED / 更新を受け取る]
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-bold font-display text-neutral-950 tracking-tight mb-4">
              Subscribe
            </h2>

            <p className="text-sm text-neutral-600 font-sans leading-relaxed">
              Occasional updates on AI systems, architecture decisions, and real deployment insights. Zero spam.
            </p>
          </div>
        </div>

        {/* Column 2: Email Input & Action */}
        <div className="lg:col-span-1 p-8 sm:p-10 border-b lg:border-b-0 lg:border-r border-neutral-200/80 flex flex-col justify-center">
          <label className="block font-mono text-xs uppercase tracking-wider text-neutral-500 font-semibold mb-3">
            ENTER YOUR EMAIL
          </label>

          {isSubscribed ? (
            <div className="flex items-center gap-2.5 py-3 px-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-sans">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>You&apos;re subscribed. Welcome to the technical journal.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="relative flex items-center">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email@address.com"
                className="w-full pl-4 pr-14 py-3.5 bg-neutral-50 hover:bg-neutral-100/80 focus:bg-white border border-neutral-200/90 rounded-xl text-xs sm:text-sm font-sans text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
              />
              <button
                type="submit"
                aria-label="Submit email"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-lg bg-neutral-900 hover:bg-brand-600 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

        {/* Column 3: Legal & Disclaimer */}
        <div className="lg:col-span-1 p-8 sm:p-10 flex items-center">
          <p className="text-xs text-neutral-500 font-sans leading-relaxed">
            Submitting you agree with{' '}
            <span className="text-neutral-900 font-medium underline underline-offset-2 cursor-pointer">
              Privacy Policy
            </span>{' '}
            and{' '}
            <span className="text-neutral-900 font-medium underline underline-offset-2 cursor-pointer">
              Terms of Service
            </span>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
