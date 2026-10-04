import React from 'react';
import type { Metadata } from 'next';
import { AboutHero } from '@/components/about/AboutHero';
import { AboutOverview } from '@/components/about/AboutOverview';
import { AboutPhilosophy } from '@/components/about/AboutPhilosophy';
import { AboutVisionMission } from '@/components/about/AboutVisionMission';
import { AboutValues } from '@/components/about/AboutValues';
import { AboutCTA } from '@/components/about/AboutCTA';
import { getTeamConfig } from '@/lib/services/teamService';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'About',
  description:
    'KAIROTRIX is a technology and innovation company that identifies real business problems first, then designs and builds custom software, AI systems, automation, and connected digital infrastructure. Built to evolve.',
  keywords: [
    'About KAIROTRIX',
    'technology company',
    'custom software engineering',
    'problem-first technology',
    'business automation',
    'software development company',
  ],
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About | KAIROTRIX',
    description:
      'Learn why KAIROTRIX exists, the principles behind our work, and how we approach building useful, reliable technology around real business needs.',
  },
  twitter: {
    title: 'About | KAIROTRIX',
    description:
      'Learn why KAIROTRIX exists, the principles behind our work, and how we approach building useful, reliable technology around real business needs.',
  },
};

export default async function AboutPage() {
  const { isTeamSectionVisible, members } = await getTeamConfig();

  return (
    <main className="relative w-full min-h-screen bg-neutral-50 overflow-hidden">
      {/* Subtle brand ambient glow for page continuity */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-brand-500/5 to-transparent rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <AboutHero />
      <AboutPhilosophy />
      <AboutVisionMission />
      {isTeamSectionVisible && members && members.length > 0 && <AboutValues members={members} />}
      <AboutOverview />
      <AboutCTA />
    </main>
  );
}
