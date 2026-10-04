import type { Metadata } from 'next';
import { SolutionsHero } from '@/components/solutions/SolutionsHero';
import { SolutionsGrid } from '@/components/solutions/SolutionsGrid';
import { SolutionsOverview } from '@/components/solutions/SolutionsOverview';
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

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  '@id': 'https://www.kairotrix.in/solutions#breadcrumb',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://www.kairotrix.in',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Solutions',
      item: 'https://www.kairotrix.in/solutions',
    },
  ],
};

export default function SolutionsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <SolutionsHero />
      {/* ─── OVERLAY CURTAIN: Sections slide UP OVER sticky Hero (Spector effect) ─── */}
      <div className="relative z-10 w-full bg-[#FAFAFC] shadow-[0_-30px_70px_rgba(0,0,0,0.06)] border-t border-neutral-200/80">
        <SolutionsGrid />
        <SolutionsLifecycle />
        <SolutionsOverview />
        <SolutionsCTA />
      </div>
    </>
  );
}
