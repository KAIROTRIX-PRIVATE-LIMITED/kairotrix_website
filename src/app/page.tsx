import dynamic from 'next/dynamic';
import { HeroSection } from '@/components/home/HeroSection';
import { WhatIsKairotrix } from '@/components/home/WhatIsKairotrix';
import { WhatWeProvide } from '@/components/home/WhatWeProvide';
import { InsightsPreview } from '@/components/home/InsightsPreview';
import { getActiveWorkSpecimens } from '@/lib/services/workService';
import { getPublishedInsights } from '@/lib/services/insightsService';

// Below-the-fold modules dynamically chunked to minimize initial main-thread TBT while preserving SSR SEO
const WorkProof = dynamic(
  () => import('@/components/home/WorkProof').then((m) => m.WorkProof),
  { ssr: true }
);

const HowWeThinkBuild = dynamic(
  () => import('@/components/home/HowWeThinkBuild').then((m) => m.HowWeThinkBuild),
  { ssr: true }
);

const FinalCTA = dynamic(
  () => import('@/components/home/FinalCTA').then((m) => m.FinalCTA),
  { ssr: true }
);

export const revalidate = 60;

export default async function HomePage() {
  const [projects, insights] = await Promise.all([
    getActiveWorkSpecimens(),
    getPublishedInsights(),
  ]);

  return (
    <>
      <HeroSection />
      <WhatIsKairotrix />
      <WhatWeProvide />
      <WorkProof projects={projects} />
      <HowWeThinkBuild />
      <InsightsPreview insights={insights} />
      <FinalCTA />
    </>
  );
}
