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
import { SolutionScreenNav } from '@/components/solutions/detail/SolutionScreenNav';
import { getWorkSpecimensByDiscipline } from '@/lib/services/workService';

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
      title: 'Solution Not Found — KAIROTRIX',
    };
  }

  const subServiceNames = solution.subCategories.flatMap((c) => c.services.map((s) => s.name));

  return {
    title: `${solution.title} — Solutions | KAIROTRIX`,
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
    alternates: {
      canonical: `https://kairotrix.com/solutions/${solution.slug}`,
    },
    openGraph: {
      title: `${solution.title} — Solutions | KAIROTRIX`,
      description: solution.executiveSummary,
      url: `https://kairotrix.com/solutions/${solution.slug}`,
      siteName: 'KAIROTRIX',
      type: 'website',
    },
  };
}

export default async function SolutionDetailPage({ params }: SolutionDetailPageProps) {
  const { slug } = await params;
  const solution = SOLUTIONS_DATA[slug];

  if (!solution) {
    notFound();
  }

  const relatedProjects = await getWorkSpecimensByDiscipline(slug);

  // Schema.org structured data (Service + OfferCatalog + BreadcrumbList)
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: solution.title,
    provider: {
      '@type': 'Organization',
      name: 'KAIROTRIX',
      url: 'https://kairotrix.com',
      description:
        'Technology and software solutions company that designs and builds custom software, AI systems, automation workflows, and data platforms.',
    },
    description: solution.executiveSummary,
    areaServed: 'Global',
    url: `https://kairotrix.com/solutions/${solution.slug}`,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${solution.title} Services`,
      itemListElement: solution.subCategories.map((sub, idx) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: sub.title,
          description: sub.summary,
          url: `https://kairotrix.com/solutions/${solution.slug}#${sub.anchorId}`,
        },
        position: idx + 1,
      })),
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://kairotrix.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Solutions',
        item: 'https://kairotrix.com/solutions',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: solution.title,
        item: `https://kairotrix.com/solutions/${solution.slug}`,
      },
    ],
  };

  return (
    <>
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([serviceJsonLd, breadcrumbJsonLd]) }}
      />

      <main className="w-full min-h-screen bg-[#FAFAFC] text-neutral-900">
        {/* Screen-Edge Prev / Next Solution Navigator */}
        <SolutionScreenNav solution={solution} />

        {/* 01. Hero with Flanked Carousel */}
        <SolutionHero solution={solution} />

        {/* 02. Infinite Telemetry Marquee Ticker */}
        <SolutionMarquee items={solution.marqueeItems} />

        {/* 03. Editorial Rationale & Purpose */}
        <SolutionImpact solution={solution} />

        {/* 04. Core Services & Systems (Complete Interactive Service Explorer) */}
        <SolutionSubServices solution={solution} />

        {/* 05. Engineering Depth (Selected Technical Proof & Production Standards) */}
        <SolutionExpertiseCards solution={solution} />

        {/* 06. 4-Column Clear Engineering Process Cards */}
        <SolutionMethodology solution={solution} />

        {/* 07. Featured Builds from Work Catalog */}
        <SolutionRelatedWork solution={solution} projects={relatedProjects} />

        {/* 08. High-Impact Obsidian Contact CTA Card */}
        <SolutionContactCTA solution={solution} />

        {/* 09. Prev/Next Discipline Navigator */}
        <SolutionNavigationCTA solution={solution} />
      </main>
    </>
  );
}
