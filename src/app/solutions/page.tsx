import type { Metadata } from 'next';
import { SolutionsHero } from '@/components/solutions/SolutionsHero';
import { SolutionsGrid } from '@/components/solutions/SolutionsGrid';
import { SolutionsDiagnostic } from '@/components/solutions/SolutionsDiagnostic';
import { SolutionsLifecycle } from '@/components/solutions/SolutionsLifecycle';
import { SolutionsCTA } from '@/components/solutions/SolutionsCTA';

export const metadata: Metadata = {
  title: 'Solutions Architecture & Core Disciplines — KAIROTRIX',
  description:
    'Explore KAIROTRIX’s six core technology disciplines: AI & Intelligent Systems, Software Engineering, Workflow Automation, Digital Transformation, Data Intelligence, and System Integration.',
  keywords: [
    'AI solutions',
    'autonomous agents',
    'enterprise RAG',
    'custom software development',
    'workflow automation',
    'digital transformation',
    'data analytics',
    'system integration',
    'KAIROTRIX solutions',
  ],
  openGraph: {
    title: 'Solutions Architecture & Core Disciplines — KAIROTRIX',
    description:
      'We diagnose operational bottlenecks first — then engineer custom software, autonomous AI, workflow automation, or high-throughput data infrastructure as the deterministic answer.',
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
