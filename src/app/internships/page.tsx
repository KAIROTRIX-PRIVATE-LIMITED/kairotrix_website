import type { Metadata } from 'next';
import { getPublishedInternshipRoles } from '@/lib/services/internshipService';
import { InternshipPageClient } from '@/components/internships/InternshipPageClient';

export const metadata: Metadata = {
  title: 'Internship Program — Build Skills by Building Real Technology | KAIROTRIX',
  description:
    'Join the KAIROTRIX engineering fellowship & remote internship program. Work on production software systems, AI pipelines, and automation infrastructure through a single general application.',
  keywords: [
    'KAIROTRIX internship',
    'software engineering internship India',
    'remote AI internship',
    'student developer fellowship',
    'automation engineering internship',
    'full stack internship',
  ],
  openGraph: {
    title: 'KAIROTRIX Internship Program — Build Skills by Building Real Technology',
    description:
      'Work on production codebases, AI systems, and automation infrastructure alongside active engineers. General-only application with centralized technical matching.',
    url: 'https://www.kairotrix.in/internships',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.kairotrix.in/internships',
  },
};

export default async function InternshipsPage() {
  const publishedRoles = await getPublishedInternshipRoles();

  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'EducationalOccupationalProgram',
            name: 'KAIROTRIX Engineering Fellowship & Internship Program',
            description:
              'Remote student-focused technology internship program covering software engineering, AI systems, automation, and data systems.',
            provider: {
              '@type': 'Organization',
              name: 'KAIROTRIX PRIVATE LIMITED',
              url: 'https://www.kairotrix.in',
            },
            timeToComplete: 'P12W',
            educationalProgramMode: 'online',
            occupationalCategory: '15-1252.00',
            offers: {
              '@type': 'Offer',
              category: 'Paid Internship Fellowship with Milestone Stipend',
            },
          }),
        }}
      />

      <InternshipPageClient roles={publishedRoles} />
    </main>
  );
}
