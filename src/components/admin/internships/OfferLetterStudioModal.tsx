'use client';

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import {
  X,
  FileText,
  Mail,
  Printer,
  Download,
  Check,
  Loader2,
  AlertCircle,
  Copy,
  ExternalLink,
  Sparkles,
  Paperclip,
  Send,
  CheckCircle2,
  Trash2,
} from 'lucide-react';
import { OfferLetterDocument, OfferLetterData } from './OfferLetterDocument';
import {
  DEFAULT_OFFER_EMAIL_SUBJECT_TEMPLATE,
  DEFAULT_OFFER_EMAIL_BODY_TEMPLATE,
  OFFICIAL_SENDER_EMAIL,
  DEFAULT_FOUNDER_BCC_EMAILS,
  buildGmailComposeUrl,
} from '@/types/internship';

interface Applicant {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  institution: string;
  roleAppliedFor?: string | null;
  duration?: string | null;
  weeklyAvailability?: string;
  preferredDomains?: string[];
  offerRef?: string | null;
  offerDetails?: any;
}

interface OfferLetterStudioModalProps {
  applicant: Applicant;
  defaultNextOfferRef: string;
  emailSubjectTemplate?: string;
  emailBodyTemplate?: string;
  founderBccEmails?: string;
  onClose: () => void;
  onSuccess: () => void;
}

// Format Date as DD/MM/YYYY
function formatDateDDMMYYYY(d: Date): string {
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

// Convert YYYY-MM-DD input value to DD/MM/YYYY
function inputDateToDDMMYYYY(val: string): string {
  if (!val) return '';
  const parts = val.split('-');
  if (parts.length !== 3) return val;
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

export function OfferLetterStudioModal({
  applicant,
  defaultNextOfferRef,
  emailSubjectTemplate,
  emailBodyTemplate,
  founderBccEmails,
  onClose,
  onSuccess,
}: OfferLetterStudioModalProps) {
  const [activeTab, setActiveTab] = useState<'pdf' | 'email'>('pdf');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [publishedSuccess, setPublishedSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  const effectiveBcc = founderBccEmails || DEFAULT_FOUNDER_BCC_EMAILS;

  // Initial Calculation of Dates
  const today = new Date();
  const defaultIssueDate = formatDateDDMMYYYY(today);

  // Determine Duration (e.g. "1 Month", "3 Months")
  const rawDuration = applicant.weeklyAvailability || applicant.duration || '1 Month';
  const durationMonths = rawDuration.toLowerCase().includes('3')
    ? 3
    : rawDuration.toLowerCase().includes('6')
    ? 6
    : rawDuration.toLowerCase().includes('2')
    ? 2
    : 1;

  const endDateCalc = new Date(today);
  endDateCalc.setMonth(endDateCalc.getMonth() + durationMonths);
  const defaultPeriodText = `${defaultIssueDate} – ${formatDateDDMMYYYY(endDateCalc)}`;

  // Form State - Automatically initialized to TODAY'S DATE
  const [offerRef, setOfferRef] = useState(
    applicant.offerRef || applicant.offerDetails?.offerRef || defaultNextOfferRef
  );
  const [candidateName, setCandidateName] = useState(applicant.fullName || '');
  const [candidateEmail, setCandidateEmail] = useState(applicant.email || '');
  const [designation, setDesignation] = useState(
    applicant.roleAppliedFor || applicant.preferredDomains?.[0] || 'AI/ML Intern'
  );
  const [duration, setDuration] = useState(rawDuration);
  const [periodText, setPeriodText] = useState(defaultPeriodText);
  const [issueDate, setIssueDate] = useState(defaultIssueDate);
  const [workMode, setWorkMode] = useState(
    applicant.offerDetails?.workMode || 'Remote'
  );
  const [workingHours, setWorkingHours] = useState(
    applicant.offerDetails?.workingHours || 'Flexible'
  );
  const [stipend, setStipend] = useState(
    applicant.offerDetails?.stipend || 'Unpaid – No stipend or salary will be provided.'
  );
  const [acceptanceDueDate, setAcceptanceDueDate] = useState(defaultIssueDate);
  const [signatoryTitle, setSignatoryTitle] = useState(
    applicant.offerDetails?.signatoryTitle || 'Chief Operating Officer'
  );
  const [signatureUrl, setSignatureUrl] = useState<string | null>(null);
  const [previewScale, setPreviewScale] = useState(0.8);
  const [isMounted, setIsMounted] = useState(false);
  const [dispatchEmailOnPublish, setDispatchEmailOnPublish] = useState(true);
  const [publishProgress, setPublishProgress] = useState<
    'idle' | 'generating' | 'saving' | 'sending' | 'done'
  >('idle');
  const pdfCaptureRef = useRef<HTMLDivElement>(null);
  const [publishFeedback, setPublishFeedback] = useState<{
    type: 'success' | 'warning' | 'error';
    title: string;
    message: string;
    gmailWebUrl?: string;
  } | null>(null);

  useEffect(() => {
    setIsMounted(true);
    document.body.classList.add('offer-letter-modal-open');
    return () => {
      document.body.classList.remove('offer-letter-modal-open');
    };
  }, []);

  useEffect(() => {
    async function loadSignature() {
      try {
        const res = await fetch('/api/admin/internships/signature');
        if (res.ok) {
          const data = await res.json();
          if (data.signatureUrl) setSignatureUrl(data.signatureUrl);
        }
      } catch (err) {
        console.error('Failed to load secure signature:', err);
      }
    }
    loadSignature();
  }, []);

  const handleDurationChange = (newDuration: string) => {
    setDuration(newDuration);
    const months = newDuration.toLowerCase().includes('3')
      ? 3
      : newDuration.toLowerCase().includes('6')
      ? 6
      : newDuration.toLowerCase().includes('2')
      ? 2
      : 1;
    const end = new Date();
    end.setMonth(end.getMonth() + months);
    setPeriodText(`${issueDate || defaultIssueDate} – ${formatDateDDMMYYYY(end)}`);
  };

  const handleIssueDateChange = (newDate: string) => {
    const prevDate = issueDate;
    setIssueDate(newDate);
    if (!acceptanceDueDate || acceptanceDueDate === prevDate) {
      setAcceptanceDueDate(newDate);
    }
  };

  const offerData: OfferLetterData = {
    offerRef,
    issueDate,
    candidateName,
    candidateEmail,
    designation,
    duration,
    periodText,
    workMode,
    workingHours,
    stipend,
    acceptanceDueDate,
    signatoryTitle,
    signatureUrl,
  };

  // Interpolate Email Template
  const emailSubject = (emailSubjectTemplate || DEFAULT_OFFER_EMAIL_SUBJECT_TEMPLATE)
    .replace(/{{name}}/g, candidateName)
    .replace(/{{role}}/g, designation)
    .replace(/{{offerRef}}/g, offerRef)
    .replace(/{{date}}/g, issueDate || defaultIssueDate)
    .replace(/{{today}}/g, issueDate || defaultIssueDate)
    .replace(/{{issueDate}}/g, issueDate || defaultIssueDate);

  const emailBody = (emailBodyTemplate || DEFAULT_OFFER_EMAIL_BODY_TEMPLATE)
    .replace(/{{name}}/g, candidateName)
    .replace(/{{role}}/g, designation)
    .replace(/{{offerRef}}/g, offerRef)
    .replace(/{{duration}}/g, duration)
    .replace(/{{period}}/g, periodText)
    .replace(/{{acceptanceDueDate}}/g, acceptanceDueDate || defaultIssueDate)
    .replace(/{{date}}/g, issueDate || defaultIssueDate)
    .replace(/{{today}}/g, issueDate || defaultIssueDate)
    .replace(/{{issueDate}}/g, issueDate || defaultIssueDate)
    .replace(/{{institution}}/g, applicant.institution || '');

  // Handle 1-Click Automated Publish: Generates PDF, Saves Locally & Dispatches via Gmail SMTP
  const handlePublish = async () => {
    setIsSubmitting(true);
    setError(null);
    setPublishFeedback(null);
    setPublishProgress('generating');

    try {
      // 1. Ensure fonts are loaded and ready before rasterization
      if (typeof document !== 'undefined' && document.fonts) {
        await document.fonts.ready;
      }

      // 2. Select unscaled target element for 100% pixel-perfect A4 canvas capture
      const targetElement =
        pdfCaptureRef.current ||
        document.getElementById('offer-letter-screen-preview');

      if (!targetElement) {
        throw new Error('Offer letter template element could not be found.');
      }

      // Temporarily position targetElement behind modal during the 200ms snapshot
      const prevLeft = targetElement.style.left;
      const prevTop = targetElement.style.top;
      const prevZ = targetElement.style.zIndex;
      targetElement.style.left = '0px';
      targetElement.style.top = '0px';
      targetElement.style.zIndex = '-9999';

      let canvas;
      try {
        canvas = await html2canvas(targetElement, {
          scale: 2, // 2x Retina clarity (1588 x 2246 px)
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#FFFFFF',
          logging: false,
        });
      } finally {
        targetElement.style.left = prevLeft || '-99999px';
        targetElement.style.top = prevTop || '-99999px';
        targetElement.style.zIndex = prevZ || '-9999';
      }

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
      });

      // Standard A4 dimensions: 210mm x 297mm
      pdf.addImage(imgData, 'PNG', 0, 0, 210, 297, undefined, 'FAST');

      // 3. Automatically save/download the PDF to user's local machine
      setPublishProgress('saving');
      const cleanRef = offerRef.replace(/[^a-zA-Z0-9]/g, '_');
      const fileName = `${cleanRef}_Offer_Letter.pdf`;
      pdf.save(fileName);

      // 4. Extract Base64 Data URL for automated backend email attachment
      const pdfBase64 = pdf.output('datauristring');

      // 5. Save offer terms to database and update status to OFFERED
      const res = await fetch(`/api/admin/internships/applicants/${applicant.id}/offer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          offerRef,
          designation,
          duration,
          periodText,
          issueDate,
          workMode,
          workingHours,
          stipend,
          acceptanceDueDate,
          signatoryTitle,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save offer letter');

      // 6. If dispatch email is enabled, send official email with PDF attachment
      if (dispatchEmailOnPublish) {
        setPublishProgress('sending');
        try {
          const emailRes = await fetch(
            `/api/admin/internships/applicants/${applicant.id}/send-offer-email`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                subject: emailSubject,
                bodyText: emailBody,
                offerRef,
                pdfBase64,
                bcc: effectiveBcc,
              }),
            }
          );

          const emailData = await emailRes.json();
          if (emailRes.ok && emailData.success) {
            setPublishedSuccess(true);
            setPublishProgress('done');
            setPublishFeedback({
              type: 'success',
              title: 'Offer Letter Published, Downloaded & Dispatched!',
              message: `Official Offer Letter saved to your downloads as "${fileName}" and dispatched to ${candidateEmail} with PDF attached (BCC: 3 founders).`,
            });
            setTimeout(() => {
              onSuccess();
            }, 2600);
            return;
          } else {
            // Email dispatch failed (e.g. Gmail App Password issue)
            setPublishedSuccess(true);
            setPublishProgress('idle');
            setPublishFeedback({
              type: 'warning',
              title: 'Offer Saved & PDF Downloaded, But Email Failed',
              message:
                emailData.error ||
                'Google App Password may be unconfigured or SMTP timed out. The PDF has been saved to your downloads; you can dispatch directly via Gmail Web below.',
              gmailWebUrl: buildGmailComposeUrl({
                to: candidateEmail,
                subject: emailSubject,
                body: emailBody,
                bcc: effectiveBcc,
              }),
            });
            return;
          }
        } catch (emailErr: unknown) {
          const err = emailErr as Error;
          setPublishedSuccess(true);
          setPublishProgress('idle');
          setPublishFeedback({
            type: 'warning',
            title: 'Offer Saved & PDF Downloaded, But Email Service Error',
            message: err.message || 'Error communicating with Gmail service.',
            gmailWebUrl: buildGmailComposeUrl({
              to: candidateEmail,
              subject: emailSubject,
              body: emailBody,
              bcc: effectiveBcc,
            }),
          });
          return;
        }
      } else {
        // Saved locally and in DB without automated email
        setPublishedSuccess(true);
        setPublishProgress('done');
        setPublishFeedback({
          type: 'success',
          title: 'Offer Letter Published & Downloaded',
          message: `Offer terms saved to database and PDF downloaded locally as "${fileName}".`,
        });
        setTimeout(() => {
          onSuccess();
        }, 1800);
      }
    } catch (err: unknown) {
      const e = err as Error;
      setError(e.message || 'Error publishing offer letter.');
      setPublishFeedback({
        type: 'error',
        title: 'Error Publishing Offer Letter',
        message: e.message || 'Could not generate PDF or save offer letter.',
      });
    } finally {
      setIsSubmitting(false);
      setPublishProgress('idle');
    }
  };

  // Print Handler: Triggers native browser print targeting the dedicated 1-page A4 body portal
  const handlePrint = () => {
    window.print();
  };

  // Copy Email Body
  const handleCopyEmail = () => {
    navigator.clipboard.writeText(`Subject: ${emailSubject}\n\n${emailBody}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 lg:p-6 animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-7xl h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-neutral-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/80 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-brand-700 border border-purple-200 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-neutral-950">
                  Offer Letter Studio
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-purple-100 text-brand-800 border border-purple-200">
                  {offerRef}
                </span>
              </div>
              <p className="text-xs text-neutral-500">
                Candidate: <strong className="text-neutral-800">{applicant.fullName}</strong> • {applicant.institution}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Tabs for Preview */}
            <div className="hidden sm:flex items-center bg-neutral-200/70 p-1 rounded-xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveTab('pdf')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'pdf'
                    ? 'bg-white text-neutral-950 shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-brand-600" />
                <span>PDF Preview</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('email')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'email'
                    ? 'bg-white text-neutral-950 shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <Mail className="w-3.5 h-3.5 text-brand-600" />
                <span>Email Preview</span>
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body: Split Screen */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          
          {/* Left Column: Form Controls (5 cols) */}
          <div className="lg:col-span-5 border-r border-neutral-200 p-5 overflow-y-auto space-y-4 bg-neutral-50/40 text-xs">
            
            {/* Success Banner */}
            {publishedSuccess && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Offer Letter Published Successfully!</span>
                </div>
                <p className="text-xs text-emerald-700">
                  Offer reference <strong>{offerRef}</strong> has been assigned and saved. Candidate status updated to OFFERED.
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="px-3 py-1.5 rounded-xl bg-white border border-emerald-300 text-emerald-800 font-semibold text-xs flex items-center gap-1.5 shadow-2xs hover:bg-emerald-100 cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print / Save PDF</span>
                  </button>
                </div>
              </div>
            )}

            {publishFeedback && (
              <div
                className={`p-4 rounded-2xl border text-xs space-y-2 animate-in fade-in ${
                  publishFeedback.type === 'success'
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : publishFeedback.type === 'warning'
                    ? 'bg-amber-50 border-amber-200 text-amber-900'
                    : 'bg-red-50 border-red-200 text-red-900'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-sm">
                  {publishFeedback.type === 'success' ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                  )}
                  <span>{publishFeedback.title}</span>
                </div>
                <p className="leading-relaxed">{publishFeedback.message}</p>
                {publishFeedback.gmailWebUrl && (
                  <div className="pt-2">
                    <a
                      href={publishFeedback.gmailWebUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Open in Gmail Web (1-Click Send with Founders in BCC)</span>
                    </a>
                  </div>
                )}
              </div>
            )}

            {error && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Offer Reference & Issue Date */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-1">
                  Offer Ref #
                </label>
                <input
                  type="text"
                  value={offerRef}
                  onChange={(e) => setOfferRef(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-neutral-300 font-mono font-bold text-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-1">
                  Date of Issue
                </label>
                <input
                  type="text"
                  value={issueDate}
                  onChange={(e) => handleIssueDateChange(e.target.value)}
                  placeholder="DD/MM/YYYY"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-neutral-300 font-mono text-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                />
              </div>
            </div>

            {/* Candidate Details */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-1">
                  Candidate Name
                </label>
                <input
                  type="text"
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-neutral-300 font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-1">
                  Candidate Email
                </label>
                <input
                  type="email"
                  value={candidateEmail}
                  onChange={(e) => setCandidateEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-neutral-300 font-mono text-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                />
              </div>
            </div>

            {/* Role & Duration */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-1">
                  Designation / Domain
                </label>
                <input
                  type="text"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-neutral-300 font-semibold text-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-1">
                  Duration
                </label>
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => handleDurationChange(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-neutral-300 font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                />
              </div>
            </div>

            {/* Internship Period */}
            <div>
              <label className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-1">
                Internship Period Text (DD/MM/YYYY – DD/MM/YYYY)
              </label>
              <input
                type="text"
                value={periodText}
                onChange={(e) => setPeriodText(e.target.value)}
                placeholder="06/11/2026 – 06/12/2026"
                className="w-full px-3 py-2 rounded-xl bg-white border border-neutral-300 font-mono text-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              />
            </div>

            {/* Work Mode & Working Hours */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-1">
                  Work Mode
                </label>
                <select
                  value={workMode}
                  onChange={(e) => setWorkMode(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-neutral-300 font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                >
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="On-site">On-site</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-1">
                  Working Hours
                </label>
                <input
                  type="text"
                  value={workingHours}
                  onChange={(e) => setWorkingHours(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-neutral-300 font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                />
              </div>
            </div>

            {/* Stipend */}
            <div>
              <label className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-1">
                Stipend / Terms
              </label>
              <input
                type="text"
                value={stipend}
                onChange={(e) => setStipend(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white border border-neutral-300 font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              />
            </div>

            {/* Acceptance Due Date & Signatory Title */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-1">
                  Acceptance Due Date
                </label>
                <input
                  type="text"
                  value={acceptanceDueDate}
                  onChange={(e) => setAcceptanceDueDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-neutral-300 font-mono text-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-1">
                  Signatory Title
                </label>
                <input
                  type="text"
                  value={signatoryTitle}
                  onChange={(e) => setSignatoryTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-neutral-300 font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                />
              </div>
            </div>

          </div>

          {/* Right Column: Live Dual Preview (7 cols) */}
          <div className="lg:col-span-7 bg-neutral-100 overflow-y-auto p-4 sm:p-6 flex flex-col justify-start items-center">
            
            {/* Mobile Tab switch */}
            <div className="flex sm:hidden w-full items-center bg-white p-1 rounded-xl text-xs font-semibold mb-4 shadow-2xs">
              <button
                type="button"
                onClick={() => setActiveTab('pdf')}
                className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 ${
                  activeTab === 'pdf' ? 'bg-brand-50 text-brand-700 font-bold' : 'text-neutral-600'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>PDF Preview</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('email')}
                className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 ${
                  activeTab === 'email' ? 'bg-brand-50 text-brand-700 font-bold' : 'text-neutral-600'
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email Preview</span>
              </button>
            </div>

            {/* View 1: Live PDF Letterhead Preview */}
            {activeTab === 'pdf' && (
              <div className="w-full flex flex-col items-center">
                <div className="w-full flex flex-wrap items-center justify-between mb-3 px-1 gap-2">
                  <span className="text-xs font-mono font-semibold text-neutral-600 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-brand-600" />
                    <span>A4 Official Sheet Preview</span>
                  </span>

                  <div className="flex items-center gap-2">
                    {/* Zoom / Fit Controls */}
                    <div className="flex items-center bg-white border border-neutral-200 rounded-xl p-0.5 shadow-2xs text-[11px] font-mono">
                      <button
                        type="button"
                        onClick={() => setPreviewScale(0.72)}
                        className={`px-2 py-0.5 rounded-lg transition-colors cursor-pointer ${
                          previewScale === 0.72
                            ? 'bg-purple-100 text-brand-800 font-bold'
                            : 'text-neutral-500 hover:text-neutral-900'
                        }`}
                        title="Compact View (72%)"
                      >
                        72%
                      </button>
                      <button
                        type="button"
                        onClick={() => setPreviewScale(0.8)}
                        className={`px-2.5 py-0.5 rounded-lg transition-colors cursor-pointer ${
                          previewScale === 0.8
                            ? 'bg-purple-100 text-brand-800 font-bold'
                            : 'text-neutral-500 hover:text-neutral-900'
                        }`}
                        title="Fit Full A4 Page in Window (80%)"
                      >
                        Fit A4
                      </button>
                      <button
                        type="button"
                        onClick={() => setPreviewScale(1)}
                        className={`px-2 py-0.5 rounded-lg transition-colors cursor-pointer ${
                          previewScale === 1
                            ? 'bg-purple-100 text-brand-800 font-bold'
                            : 'text-neutral-500 hover:text-neutral-900'
                        }`}
                        title="100% Actual Print Size"
                      >
                        100%
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={handlePrint}
                      className="px-3 py-1.5 rounded-xl bg-white border border-neutral-200 text-xs font-semibold text-neutral-800 hover:bg-neutral-50 shadow-2xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5 text-brand-600" />
                      <span>Print / Save PDF</span>
                    </button>
                  </div>
                </div>

                {/* Scaled A4 Preview Box - Left-clipping bug fixed using mx-auto and safe-centering */}
                <div className="w-full overflow-x-auto py-2 px-2 flex justify-start lg:justify-center">
                  <div
                    className="mx-auto border border-neutral-300 rounded-lg shadow-2xl overflow-hidden bg-white shrink-0 relative transition-all"
                    style={{
                      width: `${Math.round(794 * previewScale)}px`,
                      height: `${Math.round(1123 * previewScale)}px`,
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '794px',
                        height: '1123px',
                        transform: `scale(${previewScale})`,
                        transformOrigin: 'top left',
                      }}
                    >
                      <OfferLetterDocument data={offerData} id="offer-letter-screen-preview" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* View 2: Live Email Message Preview */}
            {activeTab === 'email' && (
              <div className="w-full max-w-2xl bg-white rounded-2xl border border-neutral-200/90 shadow-md p-6 space-y-4 text-xs">
                {/* Status Feedback Banner */}
                {publishFeedback && (
                  <div
                    className={`p-4 rounded-2xl border text-xs space-y-2 animate-in fade-in ${
                      publishFeedback.type === 'success'
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                        : publishFeedback.type === 'warning'
                        ? 'bg-amber-50 border-amber-200 text-amber-900'
                        : 'bg-red-50 border-red-200 text-red-900'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold text-sm">
                      {publishFeedback.type === 'success' ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                      )}
                      <span>{publishFeedback.title}</span>
                    </div>
                    <p className="leading-relaxed">{publishFeedback.message}</p>
                    {publishFeedback.gmailWebUrl && (
                      <div className="pt-2">
                        <a
                          href={publishFeedback.gmailWebUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs transition-colors"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Open in Gmail Web (1-Click Send with Founders in BCC)</span>
                        </a>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-200 pb-3 gap-2">
                  <span className="font-bold text-neutral-900 text-sm">Official Offer Email Preview</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="px-3 py-1.5 rounded-xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-xs font-semibold text-neutral-700 flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>

                    <a
                      href={buildGmailComposeUrl({
                        to: candidateEmail,
                        subject: emailSubject,
                        body: emailBody,
                        bcc: effectiveBcc,
                      })}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 text-neutral-800 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                      title="Open in Gmail Web (Fallback)"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Gmail Web Fallback</span>
                    </a>
                  </div>
                </div>

                {/* Email Metadata */}
                <div className="bg-neutral-50 rounded-xl p-3.5 space-y-2 border border-neutral-200 font-mono text-[11px]">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-neutral-500 font-bold">From: </span>
                      <span className="text-neutral-900 font-bold text-brand-700">{OFFICIAL_SENDER_EMAIL}</span>
                    </div>
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-sans font-medium">
                      Official Server SMTP
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-500 font-bold">To: </span>
                    <span className="text-neutral-900 font-semibold">{candidateEmail}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 font-bold">BCC (3 Founders): </span>
                    <span className="text-neutral-700 text-[10px] break-all">{effectiveBcc}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 font-bold">Subject: </span>
                    <span className="text-neutral-900">{emailSubject}</span>
                  </div>
                  
                  {/* Automated PDF Attachment Notice */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2.5 border-t border-neutral-200/70 font-sans">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-neutral-500 font-bold font-mono text-[11px]">Attachment:</span>
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-50 border border-purple-200 text-brand-900 text-xs shadow-2xs">
                        <Paperclip className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                        <span className="font-mono font-bold text-neutral-900 text-[11.5px]">
                          {offerRef.replace(/[^a-zA-Z0-9]/g, '_')}_Offer_Letter.pdf
                        </span>
                        <span className="text-[10px] font-bold text-brand-700 bg-white px-2 py-0.5 rounded-md border border-purple-200 whitespace-nowrap">
                          Auto-Attached on Publish
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] text-neutral-500 font-medium">
                      Attached directly as a standard PDF file
                    </span>
                  </div>
                </div>

                {/* Email Body Preview */}
                <div className="bg-white rounded-xl p-4 border border-neutral-200/80 whitespace-pre-wrap font-sans text-neutral-800 leading-relaxed text-xs">
                  {emailBody}
                </div>

                {/* Official Signature Banner Preview (Clickable Link to Website) */}
                <div className="bg-neutral-50/70 rounded-2xl p-4 border border-neutral-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-semibold text-neutral-500 uppercase tracking-wider">
                      Appended Official Signature Banner
                    </span>
                    <span className="text-[10px] text-purple-700 font-semibold bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <ExternalLink className="w-3 h-3" />
                      Clickable link to www.kairotrix.in
                    </span>
                  </div>
                  <a
                    href="https://www.kairotrix.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-white p-2 rounded-xl border border-neutral-200 hover:border-brand-500 transition-all shadow-2xs group"
                    title="Click to visit www.kairotrix.in"
                  >
                    <img
                      src="/assets/brand/kairotrix-email-signature.png"
                      alt="KAIROTRIX Official Signature"
                      width={526}
                      height={80}
                      className="w-full max-w-[526px] h-auto object-contain block"
                    />
                  </a>
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-neutral-200 bg-neutral-50/90 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <label className="flex items-center gap-2 text-xs font-semibold text-neutral-800 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={dispatchEmailOnPublish}
              onChange={(e) => setDispatchEmailOnPublish(e.target.checked)}
              className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-neutral-300"
            />
            <span>
              Send official offer email to <strong className="text-brand-700">{candidateEmail}</strong> with 3 founders in BCC
            </span>
          </label>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-white border border-neutral-300 text-neutral-700 text-xs font-semibold hover:bg-neutral-50 cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handlePublish}
              disabled={isSubmitting}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>
                    {publishProgress === 'generating'
                      ? 'Generating A4 PDF...'
                      : publishProgress === 'saving'
                      ? 'Saving Local PDF...'
                      : publishProgress === 'sending'
                      ? 'Sending Email with PDF...'
                      : 'Publishing...'}
                  </span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>
                    {dispatchEmailOnPublish
                      ? 'Publish & Send Offer Letter'
                      : 'Publish Offer Letter (Save Only)'}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>

      {/* Offscreen Unscaled Capture Container for High-DPI Canvas/PDF Generation (Kept completely offscreen to eliminate any screen overlap) */}
      <div
        ref={pdfCaptureRef}
        style={{
          position: 'fixed',
          top: '-99999px',
          left: '-99999px',
          width: '794px',
          height: '1123px',
          zIndex: -9999,
          pointerEvents: 'none',
          backgroundColor: '#FFFFFF',
          overflow: 'hidden',
        }}
        aria-hidden="true"
      >
        <OfferLetterDocument data={offerData} id="offer-letter-capture-sheet" />
      </div>

      {/* Dedicated Print Portal: Directly attached to document.body for 100% 1-page A4 printing */}
      {isMounted &&
        createPortal(
          <div id="offer-letter-print-portal" aria-hidden="true">
            <OfferLetterDocument data={offerData} id="offer-letter-print-sheet" />
          </div>,
          document.body
        )}
    </div>
  );
}

