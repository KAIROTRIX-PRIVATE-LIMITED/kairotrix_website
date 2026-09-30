'use client';

import React from 'react';
import { ContactProvider } from '@/components/contact/ContactContext';
import { ContactHero } from '@/components/contact/ContactHero';
import { ContactForm } from '@/components/contact/ContactForm';
import { ContactSidebar } from '@/components/contact/ContactSidebar';

function ContactContent() {
  return (
    <>
      <ContactHero />

      <section
        id="contact-form-section"
        className="relative w-full py-16 sm:py-20 lg:py-28 bg-[#FAFAFC] border-t border-neutral-200/80 scroll-mt-14"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Common Contact Form (7 cols on desktop) */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>

            {/* Right Column: Direct Channels & What to Expect (5 cols on desktop) */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <ContactSidebar />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function ContactContainer() {
  return (
    <ContactProvider>
      <ContactContent />
    </ContactProvider>
  );
}
