import type { Metadata } from 'next';
import { SolutionsHero } from '@/components/solutions/SolutionsHero';
import { SolutionsGrid } from '@/components/solutions/SolutionsGrid';
import { SolutionsDiagnostic } from '@/components/solutions/SolutionsDiagnostic';
import { SolutionsLifecycle } from '@/components/solutions/SolutionsLifecycle';
import { SolutionsCTA } from '@/components/solutions/SolutionsCTA';

export const metadata: Metadata = {
  title: 'Solutions & Technology Systems — KAIROTRIX',
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
  openGraph: {
    title: 'Solutions & Technology Systems — KAIROTRIX',
    description:
      'We start by understanding what your business needs, then design and build the right solution—from software and AI to automation, websites, data systems, and integrations.',
    type: 'website',
  },
};

export default function SolutionsPage() {
  return (
    <>
      <SolutionsHero />
      <SolutionsGrid />
      <SolutionsDiagnostic />
      <SolutionsLifecycle />
      <SolutionsCTA />
    </>
  );
}
