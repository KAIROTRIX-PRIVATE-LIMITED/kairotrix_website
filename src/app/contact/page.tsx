import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { ContactContainer } from '@/components/contact/ContactContainer';

export const metadata: Metadata = {
  title: 'Contact KAIROTRIX — Start a Conversation',
  description:
    'Have a business challenge, product idea, or technology project to discuss? Start a conversation with KAIROTRIX about what you\'re looking to build, improve, or solve.',
  keywords: [
    'Contact KAIROTRIX',
    'Custom software development',
    'AI solutions',
    'Business automation',
    'Technology partner',
  ],
  openGraph: {
    title: 'Contact KAIROTRIX — Start a Conversation',
    description:
      'Tell us what you\'re working on and what you\'re looking to build, improve, or solve. Start a conversation with KAIROTRIX.',
    type: 'website',
  },
};

export default function ContactPage() {
  return (
    <main className="w-full min-h-screen bg-[#FAFAFC]">
      <Suspense
        fallback={
          <div className="w-full min-h-screen flex items-center justify-center bg-[#FAFAFC]">
            <span className="font-tech text-xs uppercase tracking-widest text-neutral-400">
              Loading...
            </span>
          </div>
        }
      >
        <ContactContainer />
      </Suspense>
    </main>
  );
}
