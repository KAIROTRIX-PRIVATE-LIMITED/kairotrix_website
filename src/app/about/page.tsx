import React from 'react';
import type { Metadata } from 'next';
import { AboutHero } from '@/components/about/AboutHero';
import { AboutIdentity } from '@/components/about/AboutIdentity';
import { AboutVisionMission } from '@/components/about/AboutVisionMission';
import { AboutValues } from '@/components/about/AboutValues';
import { AboutApproach } from '@/components/about/AboutApproach';
import { AboutFuture } from '@/components/about/AboutFuture';
import { AboutCTA } from '@/components/about/AboutCTA';

export const metadata: Metadata = {
  title: 'About KAIROTRIX — AI Technology & Software Solutions Company',
  description:
    'KAIROTRIX is an AI technology and software solutions company that identifies real operational problems first, then engineers custom AI, software, automation, or integration systems. Built to evolve.',
  keywords: [
    'About KAIROTRIX',
    'AI solutions company',
    'custom software engineering',
    'problem-first technology',
    'business automation architecture',
    'software development company',
    'enterprise AI systems',
  ],
  openGraph: {
    title: 'About KAIROTRIX — Built to Evolve',
    description:
      'We don’t just claim capability — we demonstrate it. Learn why KAIROTRIX exists, our problem-first engineering philosophy, and our vision for enterprise technology.',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <main className="w-full min-h-screen bg-neutral-0">
      <AboutHero />
      <AboutIdentity />
      <AboutVisionMission />
      <AboutValues />
      <AboutApproach />
      <AboutFuture />
      <AboutCTA />
    </main>
  );
}
