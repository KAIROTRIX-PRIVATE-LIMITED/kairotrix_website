import { HeroSection } from '@/components/home/HeroSection';
import { WhatIsKairotrix } from '@/components/home/WhatIsKairotrix';
import { WhatWeProvide } from '@/components/home/WhatWeProvide';
import { WorkProof } from '@/components/home/WorkProof';
import { HowWeThinkBuild } from '@/components/home/HowWeThinkBuild';
import { InsightsPreview } from '@/components/home/InsightsPreview';
import { FinalCTA } from '@/components/home/FinalCTA';
import { getActiveWorkSpecimens } from '@/lib/services/workService';
import { getPublishedInsights } from '@/lib/services/insightsService';

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





