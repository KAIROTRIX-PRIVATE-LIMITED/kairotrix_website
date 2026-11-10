'use client';

import React from 'react';

export interface OfferLetterData {
  offerRef: string;
  issueDate: string; // DD/MM/YYYY
  candidateName: string;
  candidateEmail: string;
  designation: string;
  duration: string; // e.g. "1 Month"
  periodText: string; // e.g. "06/11/2026 – 06/12/2026"
  workMode: string; // "Remote"
  workingHours: string; // "Flexible"
  stipend: string; // "Unpaid – No stipend or salary will be provided."
  acceptanceDueDate: string; // DD/MM/YYYY
  signatoryTitle?: string; // "Chief Operating Officer"
  signatureUrl?: string | null;
}

interface OfferLetterDocumentProps {
  data: OfferLetterData;
  scale?: number;
  id?: string;
}

export function OfferLetterDocument({ data, scale = 1, id = 'printable-offer-letter' }: OfferLetterDocumentProps) {
  const upperName = (data.candidateName || 'CANDIDATE NAME').toUpperCase();
  const effectiveSignatureUrl = data.signatureUrl || '/assets/brand/offer-letter-coo-signature.png';

  // Automatically guarantee today's date if missing or not passed
  const today = new Date();
  const todayFormatted = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
  const effectiveIssueDate = data.issueDate || todayFormatted;
  const effectiveDueDate = data.acceptanceDueDate || effectiveIssueDate;

  return (
    <div
      id={id}
      className="relative bg-white text-neutral-900 font-opensans select-text overflow-hidden offer-letter-sheet"
      style={{
        width: '794px', // Standard A4 width @ 96dpi (210mm)
        height: '1123px', // Standard A4 height @ 96dpi (297mm)
        padding: '24px 48px 16px 48px',
        transform: scale !== 1 ? `scale(${scale})` : undefined,
        transformOrigin: 'top left',
        backgroundColor: '#FFFFFF',
        boxSizing: 'border-box',
      }}
    >
      {/* 100% Typographic Parity: Dedicated Font Loader & High-Fidelity Rendering */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800&family=Open+Sans:wght@400;600;700&display=swap');
        
        #${id} {
          font-family: 'Open Sans', system-ui, -apple-system, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        #${id} .font-montserrat {
          font-family: 'Montserrat', system-ui, -apple-system, sans-serif !important;
        }
        #${id} .font-opensans {
          font-family: 'Open Sans', system-ui, -apple-system, sans-serif !important;
        }
      `}</style>
      {/* Background Watermark: Giant Stylized 'K' Monogram Icon (13% Opacity from Canva) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        <img
          src="/assets/brand/offer-letter-watermark-k.png"
          alt=""
          className="w-[510px] h-[510px] object-contain opacity-[0.13] select-none  translate-y-2"
        />
      </div>

      {/* Main Document Content */}
      <div className="relative z-10 flex flex-col justify-between h-full">
        <div>
          {/* Top Header: Authentic Left-Aligned KAIROTRIX Logo from Original Template */}
          <div className="flex items-center justify-start mb-2.5">
            <img
              src="/assets/brand/offer-letter-header-logo.png"
              alt="KAIROTRIX | BUILT TO EVOLVE"
              className="h-11 w-auto object-contain"
            />
          </div>

          {/* Document Title: Centered Bold Purple + Black matching Canva Template (Increased +4px to 26px) */}
          <div className="text-center mt-0.5 mb-1">
            <h1 className="text-[26px] font-bold tracking-tight text-brand-700 uppercase font-montserrat leading-tight">
              INTERNSHIP <span className="text-neutral-950">OFFER LETTER</span>
            </h1>
          </div>

          {/* Centered Offer Ref & Date Bar on a Single Line (Increased +2.5px to 14.5px) */}
          <div className="text-center text-[14px] text-neutral-800 mb-3 font-opensans">
            <span className="font-bold text-neutral-900">Offer Ref: </span>
            <span className="font-mono text-neutral-950 font-bold">{data.offerRef || 'KT/INT/2026/001'}</span>
            <span className="inline-block w-8" />
            <span className="font-bold text-neutral-900">Date: </span>
            <span className="font-mono text-neutral-950 font-bold">{effectiveIssueDate}</span>
          </div>

          {/* Recipient Block (Increased +2.5px to 14.5px) */}
          <div className="text-[14px] space-y-1 text-neutral-900 mb-3 font-opensans">
            <p>
              <strong className="text-neutral-950 font-bold">TO: </strong>
              <span className="font-bold text-brand-700">{upperName}</span>
            </p>
            <p>
              <strong className="text-neutral-950 font-bold">Email: </strong>
              <span className="text-neutral-900">{data.candidateEmail}</span>
            </p>
            <p>
              <strong className="text-neutral-950 font-bold">Subject: </strong>
              <span>Offer of Internship – </span>
              <span className="text-brand-700 font-bold">{data.designation}</span>
            </p>
          </div>

          {/* Salutation & Opening Paragraph (Increased +2.5px to 14.5px) */}
          <div className="text-[14px] leading-relaxed text-neutral-900 space-y-1 mb-3 font-opensans">
            <p className="font-bold text-neutral-900">
              DEAR <span className="font-bold text-brand-700">{upperName}</span> ,
            </p>
            <p className="text-justify leading-relaxed">
              We are pleased to offer you the position of{' '}
              <span className="text-brand-700 font-bold">{data.designation}</span> at KAIROTRIX. We look
              forward to your contribution, learning, and professional growth through practical, project-based
              experience during your internship.
            </p>
          </div>

          {/* Section: Internship Details (Heading: 15px, Items: 14.5px) */}
          <div className="mb-3 font-opensans">
            <h2 className="text-[15px] font-bold text-brand-700 uppercase tracking-wide mb-1 font-montserrat">
              INTERNSHIP DETAILS
            </h2>
            <div className="text-[14px] space-y-1 text-neutral-900 leading-normal pl-0.5">
              <p>
                <strong className="text-neutral-950 font-bold">Designation / Domain: </strong>
                <span className="text-brand-700 font-semibold">{data.designation}</span>
              </p>
              <p>
                <strong className="text-neutral-950 font-bold">Duration: </strong>
                <span>{data.duration}</span>
              </p>
              <p>
                <strong className="text-neutral-950 font-bold">Internship Period: </strong>
                <span className="font-mono font-semibold">{data.periodText}</span>
              </p>
              <p>
                <strong className="text-neutral-950 font-bold">Work Mode: </strong>
                <span>{data.workMode || 'Remote'}</span>
              </p>
              <p>
                <strong className="text-neutral-950 font-bold">Working Hours: </strong>
                <span>{data.workingHours || 'Flexible'}</span>
              </p>
              <p>
                <strong className="text-neutral-950 font-bold">Stipend: </strong>
                <span>{data.stipend || 'Unpaid – No stipend or salary will be provided.'}</span>
              </p>
            </div>
          </div>

          {/* Section: Terms and Conditions (Heading: 15px, Items: 14px) */}
          <div className="mb-3 font-opensans">
            <h2 className="text-[15px] font-bold text-brand-700 uppercase tracking-wide mb-1 font-montserrat">
              TERMS AND CONDITIONS
            </h2>
            <ol className="text-[14px] space-y-1 text-neutral-900 list-none leading-relaxed">
              <li>
                <strong className="text-neutral-950 font-bold">1. Responsibilities: </strong>
                You are expected to complete assigned tasks, meet agreed deadlines, and collaborate professionally with the team.
              </li>
              <li>
                <strong className="text-neutral-950 font-bold">2. Work Arrangements: </strong>
                The internship will be conducted remotely with flexible working hours, subject to agreed deadlines and assigned responsibilities.
              </li>
              <li>
                <strong className="text-neutral-950 font-bold">3. Compensation: </strong>
                {data.stipend.toLowerCase().includes('unpaid')
                  ? 'This is an unpaid internship. No stipend or salary will be provided.'
                  : data.stipend}
              </li>
              <li>
                <strong className="text-neutral-950 font-bold">4. Certificate: </strong>
                A certificate of internship completion will be issued upon successful completion of the internship and fulfillment of the communicated requirements.
              </li>
              <li>
                <strong className="text-neutral-950 font-bold">5. Professional Conduct and Confidentiality: </strong>
                You must maintain professional conduct and protect confidential company information and project materials.
              </li>
            </ol>
          </div>

          {/* Section: Acceptance of Offer (Heading: 15px, Text: 14.5px) */}
          <div className="mb-3 font-opensans">
            <h2 className="text-[15px] font-bold text-brand-700 uppercase tracking-wide mb-1 font-montserrat">
              ACCEPTANCE OF OFFER
            </h2>
            <p className="text-[14px] text-neutral-900 text-justify leading-relaxed">
              Please confirm your acceptance by signing below and returning this letter by{' '}
              <strong className="text-brand-700 font-mono font-bold">{effectiveDueDate}</strong>. Your
              signature confirms that you have read and understood the terms stated in this letter.
            </p>
          </div>

          {/* Signatures Dual Column (Headers: 15px, Text: 14px) */}
          <div className="grid grid-cols-2 gap-8 text-[14px] pt-0.5 mb-1.5 font-opensans">
            {/* For KAIROTRIX Column */}
            <div>
              <p className="font-bold text-brand-700 uppercase tracking-wide mb-1 font-montserrat text-[15px]">
                FOR KAIROTRIX
              </p>
              <div className="h-18 flex items-center">
                {effectiveSignatureUrl ? (
                  <img
                    src={effectiveSignatureUrl}
                    alt="Chief Operating Officer Signature"
                    className="h-18 w-auto object-contain"
                  />
                ) : (
                  <div className="h-13 flex items-center text-neutral-400 italic text-xs">
                    [Signature on file]
                  </div>
                )}
              </div>
              <p className="font-bold text-neutral-950 mt-1">
                {data.signatoryTitle || 'Chief Operating Officer'}
              </p>
              <p className="text-[13.5px] text-neutral-950 mt-0.5">
                <span className="font-bold">Date: </span>
                <span className="font-mono font-bold">{effectiveIssueDate}</span>
              </p>
            </div>

            {/* Candidate Acceptance Column */}
            <div>
              <p className="font-bold text-brand-700 uppercase tracking-wide mb-1 font-montserrat text-[15px]">
                CANDIDATE ACCEPTANCE
              </p>
              <div className="h-18" />
              <p className="font-bold text-neutral-950 mt-1">
                Signature with Name
              </p>
              <p className="text-[13.5px] text-neutral-950 mt-0.5">
                <span className="font-bold">Date:</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Centered Tagline: 100% Mathematically Centered (50%) in Clear Valley Above Wave (Increased to 14.5px) */}
      <div
        className="absolute z-10 text-center pointer-events-none whitespace-nowrap"
        style={{
          left: '50%',
          transform: 'translateX(-50%)',
          bottom: '70px',
        }}
      >
        <p className="text-[14px] font-extrabold tracking-widest text-brand-700 font-montserrat uppercase">
          KAIROTRIX | BUILT TO EVOLVE.
        </p>
      </div>

      {/* Decorative Bottom Multi-Layer Purple Wave Shape: 100% FULL BLEED Vector SVG, Zero Margins */}
      <div
        className="absolute bottom-0 left-0 right-0 w-full pointer-events-none z-0 overflow-hidden select-none"
        style={{
          height: '173px',
          bottom: 0,
          left: 0,
          right: 0,
          margin: 0,
          padding: 0,
        }}
      >
        <svg
          viewBox="0 0 794 173"
          width="100%"
          height="100%"
          preserveAspectRatio="none"
          style={{ display: 'block', margin: 0, padding: 0 }}
        >
          <path
            d="M 834.52 76.82 C 733.99 81.62, 607.10 96.89, 449.47 130.64 C 195.86 184.93, 55.10 102.14, -22.81 0.77 L -22.81 260.89 L 834.52 260.89 Z"
            fill="#AE77D5"
          />
          <path
            d="M 834.52 50.90 C 732.51 65.43, 602.78 94.09, 441.20 146.69 C 211.72 221.41, 67.11 167.91, -22.81 85.38 L -22.81 260.90 L 834.52 260.90 Z"
            fill="#8959B5"
          />
          <path
            d="M 834.52 22.93 C 731.74 47.32, 599.71 90.07, 434.65 163.51 C 221.85 258.20, 75.27 225.89, -22.81 158.10 L -22.81 260.89 L 834.52 260.89 Z"
            fill="#542C85"
          />
        </svg>
      </div>
    </div>
  );
}
