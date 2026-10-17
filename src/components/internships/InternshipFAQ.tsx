'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

const FAQS: FAQItem[] = [
  {
    question: 'Who is eligible to apply?',
    answer: (
      <div className="space-y-2 text-sm text-neutral-600 leading-relaxed">
        <p>
          Students currently pursuing undergraduate or postgraduate programs (B.Tech, B.E., BCA, MCA, B.Sc, M.Sc) or recent graduates with self-taught programming or design experience.
        </p>
        <p>
          We prioritize demonstrated curiosity and working projects (GitHub repositories, websites, or apps) over numerical GPA.
        </p>
      </div>
    ),
  },
  {
    question: 'How does the remote work arrangement and schedule function?',
    answer: (
      <div className="space-y-2 text-sm text-neutral-600 leading-relaxed">
        <p>
          The internship is 100% remote across India. We expect an average commitment of 15–20 hours per week.
        </p>
        <p>
          Collaboration happens asynchronously via Git pull requests, issue trackers, and team channels, paired with scheduled weekly video syncs with your lead engineer to ensure zero academic disruption.
        </p>
      </div>
    ),
  },
  {
    question: 'What is the certificate and letter of recommendation policy?',
    answer: (
      <div className="space-y-2 text-sm text-neutral-600 leading-relaxed">
        <p>
          Certificates are earned through verified project milestone delivery and code review signoffs. Each certificate includes an online verification ID and details your specific technical contribution.
        </p>
        <p>
          Top performers who demonstrate exceptional engineering leadership receive personalized letters of recommendation from our Principal Architects.
        </p>
      </div>
    ),
  },
  {
    question: 'Legal Compliance, Stipend Terms & DPDP Data Protection',
    answer: (
      <div className="space-y-2.5 text-sm text-neutral-600 leading-relaxed">
        <p>
          <strong>Indian Labour Law Alignment:</strong> KAIROTRIX adheres to applicable statutory guidelines. We do not operate informal unpaid arrangements; roles feature performance-linked milestone stipends explicitly documented prior to onboarding.
        </p>
        <p>
          <strong>Written Agreements:</strong> Every accepted student receives a formal written agreement outlining deliverables, assigned mentors, IP assignment, and working terms.
        </p>
        <p>
          <strong>University NOC:</strong> We provide formal acceptance letters and progress reports required by college placement cells.
        </p>
        <p>
          <strong>DPDP Act Data Protection:</strong> All applicant personal data and résumé uploads are encrypted and processed strictly for recruitment evaluation in accordance with the Digital Personal Data Protection framework.
        </p>
      </div>
    ),
  },
];

export function InternshipFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 sm:py-20 bg-neutral-50/70 border-b border-neutral-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-base text-neutral-600">
            Common questions about eligibility, remote expectations, certificates, and compliance.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="rounded-2xl border border-neutral-200 bg-white overflow-hidden shadow-2xs transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(idx)}
                  className="w-full flex items-center justify-between p-5 text-left text-base font-bold text-neutral-900 hover:text-brand-700 transition-colors"
                >
                  <span className="pr-4">{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-brand-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-neutral-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 border-t border-neutral-100 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
