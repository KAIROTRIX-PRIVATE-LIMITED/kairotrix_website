import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { ContactHero } from '@/components/contact/ContactHero';
import { ContactForm } from '@/components/contact/ContactForm';
import { ContactSidebar } from '@/components/contact/ContactSidebar';

export const metadata: Metadata = {
  title: 'Contact KAIROTRIX — Start a Direct Conversation',
  description:
    'Have an operational challenge, custom software requirement, or AI architecture to build? Contact KAIROTRIX. Every inquiry is reviewed directly by a principal engineer.',
  keywords: [
    'Contact KAIROTRIX',
    'Hire AI engineers',
    'Custom software development inquiry',
    'AI solutions consultation',
    'Enterprise software engineering',
  ],
  openGraph: {
    title: 'Contact KAIROTRIX — Let’s Build Something',
    description:
      'Start a direct conversation with our engineering team. We review every technical inquiry within 24 hours.',
    type: 'website',
  },
};

export default function ContactPage() {
  return (
    <main className="w-full min-h-screen bg-neutral-0">
      <ContactHero />

      <section className="w-full py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left: Simple Contact Form (7 cols on desktop) */}
            <div className="lg:col-span-7">
              <Suspense
                fallback={
                  <div className="w-full p-12 rounded-3xl bg-neutral-50 border border-neutral-200 text-center">
                    <span className="font-tech text-xs uppercase tracking-widest text-neutral-400">
                      Loading Contact Interface...
                    </span>
                  </div>
                }
              >
                <ContactForm />
              </Suspense>
            </div>

            {/* Right: Direct Information Sidebar (5 cols on desktop) */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <ContactSidebar />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
