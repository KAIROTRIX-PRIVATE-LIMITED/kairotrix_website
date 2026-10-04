import type { Metadata } from 'next';
import { SolutionsHero } from '@/components/solutions/SolutionsHero';
import { SolutionsGrid } from '@/components/solutions/SolutionsGrid';
import { SolutionsLifecycle } from '@/components/solutions/SolutionsLifecycle';
import { SolutionsCTA } from '@/components/solutions/SolutionsCTA';

export const metadata: Metadata = {
  title: 'Solutions & Technology Systems',
  description:
    'We start by understanding what your business needs, then design and build the right solution—from software and AI to automation, websites, data systems, and integrations.',
  keywords: [
    'AI systems & agents',
    'custom software development',
    'business automation',
    'websites & digital experiences',
    'data & business intelligence',
    'technology integration',
    'KAIROTRIX solutions',
  ],
  alternates: {
    canonical: '/solutions',
  },
  openGraph: {
    title: 'Solutions & Technology Systems | KAIROTRIX',
    description:
      'We start by understanding what your business needs, then design and build the right solution—from software and AI to automation, websites, data systems, and integrations.',
  },
  twitter: {
    title: 'Solutions & Technology Systems | KAIROTRIX',
    description:
      'We start by understanding what your business needs, then design and build the right solution—from software and AI to automation, websites, data systems, and integrations.',
  },
};

export default function SolutionsPage() {
  return (
    <>
      <SolutionsHero />
      {/* ─── OVERLAY CURTAIN: Sections slide UP OVER sticky Hero (Spector effect) ─── */}
      <div className="relative z-10 w-full bg-[#FAFAFC] shadow-[0_-30px_70px_rgba(0,0,0,0.06)] border-t border-neutral-200/80">
        <SolutionsGrid />
        <SolutionsLifecycle />
        <SolutionsCTA />
      </div>
    </>
  );
}
