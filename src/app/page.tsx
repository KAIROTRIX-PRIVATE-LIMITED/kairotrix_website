import { HeroSection } from '@/components/home/HeroSection';
import { WhatIsKairotrix } from '@/components/home/WhatIsKairotrix';
import { WhatWeProvide } from '@/components/home/WhatWeProvide';
import { WorkProof } from '@/components/home/WorkProof';
import { HowWeThinkBuild } from '@/components/home/HowWeThinkBuild';
import { InsightsPreview } from '@/components/home/InsightsPreview';
import { FinalCTA } from '@/components/home/FinalCTA';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhatIsKairotrix />
      <WhatWeProvide />
      <WorkProof />
      <HowWeThinkBuild />
      <InsightsPreview />
      <FinalCTA />
    </>
  );
}





