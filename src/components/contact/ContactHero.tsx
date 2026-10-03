'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowDown, Mail, Clock, ShieldCheck, Sparkles, MessageSquare } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { MaskedReveal, DrawLine, revealMeta, revealBody, EASE_CINEMATIC } from '@/lib/animations';

export function ContactHero() {
  const shouldReduceMotion = useReducedMotion();

  const scrollToForm = () => {
    const el = document.getElementById('contact-form-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full bg-[#FAFAFC] pt-32 sm:pt-36 lg:pt-42 pb-16 sm:pb-20 lg:pb-24 overflow-hidden border-b border-neutral-200/80">
      {/* ── Background Grid Pattern ── */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#00000006_1px,transparent_1px),linear-gradient(to_bottom,#00000006_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_20%,#000_70%,transparent_100%)] pointer-events-none"
        aria-hidden="true"
      />

      {/* ── Atmospheric Radial Glows matching other heroes ── */}
      <div
        className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[540px] h-[340px] bg-brand-500/[0.06] rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 right-10 w-[640px] h-[500px] bg-purple-500/[0.10] rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* ── Left Column: Editorial Content (6 cols) ── */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left z-10">
            {/* Standardized Eyebrow aligned with Insights/About heroes */}
            <motion.div
              variants={revealMeta}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3 mb-6 text-center lg:text-left"
            >
              <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-pulse" />
              <span className="font-tech text-xs tracking-[0.25em] font-semibold text-brand-600 uppercase">
                CONTACT // KAIROTRIX
              </span>
              <DrawLine className="hidden sm:block w-8 sm:w-12 bg-neutral-200" delay={0.2} />
            </motion.div>

            {/* Monumental Headline */}
            <div className="mb-6">
              <MaskedReveal delay={0.06}>
                <h1 className="font-display text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold uppercase tracking-[-0.03em] text-neutral-950 leading-[1.06] text-center lg:text-left">
                  START A <br />
                  <span className="gradient-signature-text">CONVERSATION.</span>
                </h1>
              </MaskedReveal>
            </div>

            {/* Subtitle */}
            <motion.p
              variants={revealBody}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.16 }}
              className="text-base sm:text-lg lg:text-xl text-neutral-600 leading-relaxed font-normal max-w-xl mb-8 text-center lg:text-left mx-auto lg:mx-0"
            >
              Tell us briefly what you&apos;re looking to build, improve, or solve. Every inquiry is reviewed directly by our engineering team, and we aim to follow up within one business day.
            </motion.p>

            {/* Fast Action Buttons */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.24, ease: EASE_CINEMATIC }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-10 w-full sm:w-auto"
            >
              <button
                type="button"
                onClick={scrollToForm}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-neutral-950 hover:bg-brand-600 text-white font-sans font-semibold text-sm uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-brand-500/20 cursor-pointer group"
              >
                <MessageSquare className="w-4 h-4 text-brand-400 group-hover:text-white transition-colors" />
                <span>Send a Message</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </button>

              <a
                href="mailto:connect@kairotrix.com"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white hover:bg-neutral-50 text-neutral-900 border border-neutral-200/90 font-mono text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-2xs hover:border-brand-500/40"
              >
                <Mail className="w-4 h-4 text-brand-500" />
                <span>connect@kairotrix.com</span>
              </a>
            </motion.div>

            {/* Verified Trust Strip */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.32, ease: EASE_CINEMATIC }}
              className="w-full pt-8 border-t border-neutral-200/90 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm text-neutral-600 font-mono"
            >
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <div className="p-1 rounded-md bg-brand-50 text-brand-600">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <span>fast respond in 1 day</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <div className="p-1 rounded-md bg-brand-50 text-brand-600">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <span>Talk to the people who build</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <div className="p-1 rounded-md bg-brand-50 text-brand-600">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <span>Handled responsibly</span>
              </div>
            </motion.div>
          </div>

          {/* ── Right Column: Grand Mascot Stage (Preserving 100% of character float loop) ── */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE_CINEMATIC }}
            className="lg:col-span-6 relative flex items-center justify-center lg:justify-end"
          >
            {/* Floating Character Container */}
            <motion.div
              animate={shouldReduceMotion ? {} : { y: [0, -12, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative w-full max-w-[580px] lg:max-w-[640px] xl:max-w-[700px] flex items-center justify-center select-none"
            >
              {/* High-Resolution Mascot Render */}
              <Image
                src="/assets/images/Contact/hello.png"
                alt="KAIROTRIX Mascot KIRO welcoming you to connect"
                width={1200}
                height={960}
                priority
                className="w-full h-auto object-contain"
              />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
