'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { INITIAL_TEAM_MEMBERS, TeamMemberData } from '@/lib/services/teamService';
import { MaskedReveal, DrawLine, revealMeta, cardFromLeft, cardFromCenter, cardFromRight, EASE_CINEMATIC } from '@/lib/animations';

interface AboutValuesProps {
  members?: TeamMemberData[];
}

function SocialPills({
  twitter,
  linkedin,
  github,
}: {
  twitter?: string | null;
  linkedin?: string | null;
  github?: string | null;
}) {
  return (
    <div className="flex items-center gap-2 pt-1">
      {twitter ? (
        <a
          href={twitter}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter / X"
          className="w-7 h-7 rounded-lg bg-neutral-950 hover:bg-brand-600 text-white flex items-center justify-center transition-colors cursor-pointer shadow-xs"
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>
      ) : (
        <span
          aria-label="Twitter / X"
          className="w-7 h-7 rounded-lg bg-neutral-950/70 text-white/50 flex items-center justify-center cursor-default shadow-xs"
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </span>
      )}

      {linkedin ? (
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="w-7 h-7 rounded-lg bg-neutral-950 hover:bg-brand-600 text-white flex items-center justify-center transition-colors cursor-pointer shadow-xs"
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.68 1.68 0 1 0 0-3.36 1.68 1.68 0 0 0 0 3.36m1.39 9.74v-8.37H5.07v8.37h2.78z" />
          </svg>
        </a>
      ) : (
        <span
          aria-label="LinkedIn"
          className="w-7 h-7 rounded-lg bg-neutral-950/70 text-white/50 flex items-center justify-center cursor-default shadow-xs"
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.68 1.68 0 1 0 0-3.36 1.68 1.68 0 0 0 0 3.36m1.39 9.74v-8.37H5.07v8.37h2.78z" />
          </svg>
        </span>
      )}

      {github ? (
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="w-7 h-7 rounded-lg bg-neutral-950 hover:bg-brand-600 text-white flex items-center justify-center transition-colors cursor-pointer shadow-xs"
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
          </svg>
        </a>
      ) : (
        <span
          aria-label="GitHub"
          className="w-7 h-7 rounded-lg bg-neutral-950/70 text-white/50 flex items-center justify-center cursor-default shadow-xs"
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
          </svg>
        </span>
      )}
    </div>
  );
}

export function AboutValues({ members }: AboutValuesProps) {
  const teamList = members && members.length > 0 ? members : INITIAL_TEAM_MEMBERS;

  if (!teamList || teamList.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-transparent py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Eyebrow */}
        <motion.div
          variants={revealMeta}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="flex items-center justify-center gap-3 mb-3 sm:mb-4"
        >
          <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-pulse" />
          <span className="font-tech text-xs tracking-[0.25em] font-semibold text-brand-600 uppercase">
            TEAM // LEADERSHIP
          </span>
          <DrawLine className="w-10 sm:w-16 bg-neutral-200" delay={0.2} />
        </motion.div>

        {/* Section Heading: People behind the work with signature gradient */}
        <div className="text-center mb-12 sm:mb-16">
          <MaskedReveal delay={0.06}>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] text-neutral-950 uppercase">
              PEOPLE BEHIND THE{' '}
              <span className="gradient-signature-text">
                WORK.
              </span>
            </h2>
          </MaskedReveal>
        </div>

        {/* Outer Container matching cool neutral framing */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE_CINEMATIC }}
          className="rounded-[2.25rem] bg-neutral-100/70 border border-neutral-200/80 p-6 sm:p-8 lg:p-10"
        >
          {/* Dynamic Grid: adapts to 1, 2, 3, or more members */}
          <div
            className={
              teamList.length === 1
                ? 'max-w-sm mx-auto'
                : teamList.length === 2
                ? 'grid grid-cols-1 md:grid-cols-2 max-w-2xl mx-auto gap-6 lg:gap-8 items-stretch'
                : 'grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch'
            }
          >
            {teamList.map((member, idx) => {
              const cardVariant =
                teamList.length === 3
                  ? idx === 0
                    ? cardFromLeft
                    : idx === 1
                    ? cardFromCenter
                    : cardFromRight
                  : cardFromCenter;

              return (
                <motion.div
                  key={member.id || member.name}
                  variants={cardVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.55, delay: 0.1 + idx * 0.08, ease: EASE_CINEMATIC }}
                  className="group rounded-2xl overflow-hidden bg-white border border-neutral-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:border-brand-500/40 hover:shadow-[0_12px_36px_rgba(147,51,234,0.08)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
                >
                  {/* Portrait Container with consistent 4:5 aspect ratio */}
                  <div className="relative w-full aspect-[4/5] overflow-hidden bg-neutral-100">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-neutral-100 text-neutral-400 font-display font-bold text-3xl">
                        {member.name.charAt(0)}
                      </div>
                    )}
                    {member.badge && (
                      <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-sm border border-brand-200/50 text-[10px] font-mono uppercase tracking-wider font-semibold text-brand-700 shadow-2xs">
                        {member.badge}
                      </div>
                    )}
                  </div>

                  {/* Card Details Base */}
                  <div className="p-5 sm:p-6 bg-white border-t border-neutral-100 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="font-display font-semibold text-base sm:text-lg text-neutral-950 mb-1 leading-snug group-hover:text-brand-600 transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 mb-4">
                        {member.role}
                      </p>
                    </div>
                    <SocialPills
                      twitter={member.twitter}
                      linkedin={member.linkedin}
                      github={member.github}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
