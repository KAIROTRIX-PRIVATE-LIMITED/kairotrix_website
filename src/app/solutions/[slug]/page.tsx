import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SOLUTIONS_DATA, ALL_SOLUTION_SLUGS } from '@/data/solutionsData';
import { SolutionHero } from '@/components/solutions/detail/SolutionHero';
import { SolutionMarquee } from '@/components/solutions/detail/SolutionMarquee';
import { SolutionImpact } from '@/components/solutions/detail/SolutionImpact';
import { SolutionSubServices } from '@/components/solutions/detail/SolutionSubServices';
import { SolutionExpertiseCards } from '@/components/solutions/detail/SolutionExpertiseCards';
import { SolutionMethodology } from '@/components/solutions/detail/SolutionMethodology';
import { SolutionRelatedWork } from '@/components/solutions/detail/SolutionRelatedWork';
import { SolutionContactCTA } from '@/components/solutions/detail/SolutionContactCTA';
import { SolutionNavigationCTA } from '@/components/solutions/detail/SolutionNavigationCTA';

interface SolutionDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ALL_SOLUTION_SLUGS.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: SolutionDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const solution = SOLUTIONS_DATA[slug];

  if (!solution) {
    return {
      title: 'Discipline Not Found — KAIROTRIX',
    };
  }

  const subServiceNames = solution.subCategories.flatMap((c) => c.services.map((s) => s.name));

  return {
    title: `${solution.title} — KAIROTRIX Solutions Architecture`,
    description: solution.executiveSummary,
    keywords: [
      solution.title,
      solution.categoryTag,
      ...solution.subCategories.map((sc) => sc.title),
      ...subServiceNames.slice(0, 8),
      'KAIROTRIX solutions',
      'enterprise software architecture',
      'technology partner',
    ],
    openGraph: {
      title: `${solution.number} // ${solution.title} — KAIROTRIX`,
      description: solution.executiveSummary,
      type: 'article',
    },
  };
}

export default async function SolutionDetailPage({ params }: SolutionDetailPageProps) {
  const { slug } = await params;
  const solution = SOLUTIONS_DATA[slug];

  if (!solution) {
    notFound();
  }

  // Schema.org structured data (Service + OfferCatalog)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: solution.title,
    provider: {
      '@type': 'Organization',
      name: 'KAIROTRIX',
      url: 'https://kairotrix.com',
    },
    description: solution.executiveSummary,
    areaServed: 'Global',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${solution.title} Service Catalogue`,
      itemListElement: solution.subCategories.map((sub, idx) => ({
        '@type': 'OfferCatalog',
        name: sub.title,
        position: idx + 1,
      })),
    },
  };

  return (
    <>
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="w-full min-h-screen bg-[#FAFAFC] text-neutral-900">
        {/* 01. Hero with Flanked Carousel */}
        <SolutionHero solution={solution} />

        {/* 02. Infinite Telemetry Marquee Ticker */}
        <SolutionMarquee items={solution.marqueeItems} />

        {/* 03. Editorial Rationale & Purpose */}
        <SolutionImpact solution={solution} />

        {/* 04. Explore Capabilities & Systems (Complete Interactive Explorer) */}
        <SolutionSubServices solution={solution} />

        {/* 05. Engineering Depth (Selected Technical Proof & Production Standards) */}
        <SolutionExpertiseCards solution={solution} />

        {/* 06. 4-Column Clear Engineering Process Cards */}
        <SolutionMethodology solution={solution} />

        {/* 07. 3-Column Featured Projects Showcase */}
        <SolutionRelatedWork solution={solution} />

        {/* 08. High-Impact Obsidian Contact CTA Card */}
        <SolutionContactCTA solution={solution} />

        {/* 09. Prev/Next Discipline Navigator */}
        <SolutionNavigationCTA solution={solution} />
      </main>
    </>
  );
}
