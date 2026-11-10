'use client';

import React, { useState, useEffect } from 'react';
import {
  DEFAULT_WHATSAPP_TEMPLATE,
  DEFAULT_EMAIL_SUBJECT_TEMPLATE,
  DEFAULT_EMAIL_BODY_TEMPLATE,
  DEFAULT_OFFER_EMAIL_SUBJECT_TEMPLATE,
  DEFAULT_OFFER_EMAIL_BODY_TEMPLATE,
  DEFAULT_FOUNDER_BCC_EMAILS,
  OFFICIAL_SENDER_EMAIL,
} from '@/types/internship';
import {
  Save,
  MessageCircle,
  Mail,
  FileText,
  Sparkles,
  Check,
  AlertCircle,
  Loader2,
  HelpCircle,
  ShieldCheck,
  Upload,
  Trash2,
  ExternalLink,
} from 'lucide-react';

interface InternshipSettingsTabProps {
  settings: any;
  nextOfferRefPreview: string;
  onRefresh: () => void;
}

export function InternshipSettingsTab({
  settings,
  nextOfferRefPreview,
  onRefresh,
}: InternshipSettingsTabProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Form State
  const [offerLetterPrefix, setOfferLetterPrefix] = useState(
    settings?.offerLetterPrefix || 'KT/INT/2026/'
  );
  const [offerLetterNextNumber, setOfferLetterNextNumber] = useState<number>(
    settings?.offerLetterNextNumber ?? 4
  );
  const [offerLetterSignatoryTitle, setOfferLetterSignatoryTitle] = useState(
    settings?.offerLetterSignatoryTitle || 'Chief Operating Officer'
  );

  // Secure Signature State
  const [signatureUrl, setSignatureUrl] = useState<string | null>(settings?.cooSignatureData || null);
  const [isUploadingSig, setIsUploadingSig] = useState(false);

  const [whatsappTemplate, setWhatsappTemplate] = useState(
    settings?.whatsappTemplate || DEFAULT_WHATSAPP_TEMPLATE
  );

  const [emailSubjectTemplate, setEmailSubjectTemplate] = useState(
    settings?.emailSubjectTemplate || DEFAULT_EMAIL_SUBJECT_TEMPLATE
  );

  const [emailBodyTemplate, setEmailBodyTemplate] = useState(
    settings?.emailBodyTemplate || DEFAULT_EMAIL_BODY_TEMPLATE
  );

  const [offerEmailSubjectTemplate, setOfferEmailSubjectTemplate] = useState(
    settings?.offerEmailSubjectTemplate || DEFAULT_OFFER_EMAIL_SUBJECT_TEMPLATE
  );

  const [offerEmailBodyTemplate, setOfferEmailBodyTemplate] = useState(
    settings?.offerEmailBodyTemplate || DEFAULT_OFFER_EMAIL_BODY_TEMPLATE
  );

  const [founderBccEmails, setFounderBccEmails] = useState(
    settings?.founderBccEmails || DEFAULT_FOUNDER_BCC_EMAILS
  );
  const [isSmtpConfigured, setIsSmtpConfigured] = useState<boolean>(false);

  // Sync state whenever settings prop updates from database fetch
  useEffect(() => {
    if (!settings) return;
    if (settings.offerLetterPrefix) {
      setOfferLetterPrefix(settings.offerLetterPrefix);
    }
    if (settings.offerLetterNextNumber !== undefined && settings.offerLetterNextNumber !== null) {
      setOfferLetterNextNumber(settings.offerLetterNextNumber);
    }
    if (settings.offerLetterSignatoryTitle) {
      setOfferLetterSignatoryTitle(settings.offerLetterSignatoryTitle);
    }
    if (settings.whatsappTemplate) {
      setWhatsappTemplate(settings.whatsappTemplate);
    }
    if (settings.emailSubjectTemplate) {
      setEmailSubjectTemplate(settings.emailSubjectTemplate);
    }
    if (settings.emailBodyTemplate) {
      setEmailBodyTemplate(settings.emailBodyTemplate);
    }
    if (settings.offerEmailSubjectTemplate) {
      setOfferEmailSubjectTemplate(settings.offerEmailSubjectTemplate);
    }
    if (settings.offerEmailBodyTemplate) {
      setOfferEmailBodyTemplate(settings.offerEmailBodyTemplate);
    }
    if (settings.founderBccEmails) {
      setFounderBccEmails(settings.founderBccEmails);
    }
    if (settings.cooSignatureData) {
      setSignatureUrl(settings.cooSignatureData);
    }
  }, [settings]);

  useEffect(() => {
    async function fetchSignature() {
      try {
        const res = await fetch('/api/admin/internships/signature');
        if (res.ok) {
          const data = await res.json();
          if (data.signatureUrl) setSignatureUrl(data.signatureUrl);
        }
      } catch (err) {
        console.error('Failed to fetch signature:', err);
      }
    }
    fetchSignature();
  }, []);

  useEffect(() => {
    async function checkSmtp() {
      try {
        const res = await fetch('/api/admin/internships/settings');
        if (res.ok) {
          const data = await res.json();
          if (typeof data.isSmtpConfigured === 'boolean') {
            setIsSmtpConfigured(data.isSmtpConfigured);
          }
        }
      } catch (err) {
        console.error('Failed to check SMTP status:', err);
      }
    }
    checkSmtp();
  }, []);

  const handleUploadSignature = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingSig(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/admin/internships/signature', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to upload signature');
      setSignatureUrl(data.signatureUrl);
      setSuccessMsg('Executive signature updated securely in database!');
      setTimeout(() => setSuccessMsg(null), 3000);
      onRefresh();
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMsg(error.message || 'Error uploading signature');
    } finally {
      setIsUploadingSig(false);
    }
  };

  const handleDeleteSignature = async () => {
    if (!window.confirm('Are you sure you want to remove the executive signature?')) return;
    setIsUploadingSig(true);
    try {
      const res = await fetch('/api/admin/internships/signature', { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete signature');
      setSignatureUrl(null);
      setSuccessMsg('Executive signature removed.');
      setTimeout(() => setSuccessMsg(null), 3000);
      onRefresh();
    } catch {
      setErrorMsg('Failed to delete signature');
    } finally {
      setIsUploadingSig(false);
    }
  };

  // Compute live preview of next ID
  const computedNextOfferRef = `${offerLetterPrefix}${String(offerLetterNextNumber).padStart(3, '0')}`;

  // Insert Variable helper
  const insertVariable = (
    variable: string,
    currentText: string,
    setter: (val: string) => void
  ) => {
    setter(currentText + ` {{${variable}}}`);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccessMsg(null);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/admin/internships/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          offerLetterPrefix,
          offerLetterNextNumber: Number(offerLetterNextNumber),
          offerLetterSignatoryTitle,
          whatsappTemplate,
          emailSubjectTemplate,
          emailBodyTemplate,
          offerEmailSubjectTemplate,
          offerEmailBodyTemplate,
          founderBccEmails,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update settings');

      setSuccessMsg('Settings and communication templates saved successfully!');
      setTimeout(() => setSuccessMsg(null), 3000);
      onRefresh();
    } catch (err: unknown) {
      const e = err as Error;
      setErrorMsg(e.message || 'Error updating settings');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-5xl">
      {/* Notifications */}
      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Top Banner: Offer Ref Configuration */}
      <div className="p-6 rounded-3xl bg-white border border-neutral-200/90 shadow-2xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-50 text-brand-700 border border-purple-200 flex items-center justify-center font-bold">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-neutral-950">
              Offer Letter Identification & Numbering Sequence
            </h3>
            <p className="text-xs text-neutral-500">
              Configure your unique Offer Reference prefix and starting sequence number.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div>
            <label className="block text-xs font-semibold text-neutral-800 mb-1">
              Prefix Format
            </label>
            <input
              type="text"
              value={offerLetterPrefix}
              onChange={(e) => setOfferLetterPrefix(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 border border-neutral-300 font-mono text-xs font-bold text-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            <span className="text-[10px] text-neutral-500 mt-1 block">
              Default: <code className="text-neutral-700 font-mono">KT/INT/2026/</code>
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-800 mb-1">
              Next Sequence Number
            </label>
            <input
              type="number"
              min={1}
              value={offerLetterNextNumber}
              onChange={(e) => setOfferLetterNextNumber(parseInt(e.target.value) || 1)}
              className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 border border-neutral-300 font-mono text-xs font-bold text-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            <span className="text-[10px] text-neutral-500 mt-1 block">
              Current published count: set to <code className="text-neutral-700 font-mono">4</code> for <code className="text-neutral-700 font-mono">004</code>
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-800 mb-1">
              Next Generated Offer Ref
            </label>
            <div className="px-3.5 py-2 rounded-xl bg-purple-50 border border-purple-200 text-brand-700 font-mono text-xs font-extrabold flex items-center justify-between">
              <span>{computedNextOfferRef}</span>
              <span className="text-[10px] uppercase font-sans font-semibold text-brand-600 bg-white px-2 py-0.5 rounded-full border border-purple-200">
                Preview
              </span>
            </div>
            <span className="text-[10px] text-neutral-500 mt-1 block">
              Auto-increments upon every published offer.
            </span>
          </div>
        </div>

        <div className="pt-2 border-t border-neutral-100">
          <label className="block text-xs font-semibold text-neutral-800 mb-1">
            Official Signatory Title
          </label>
          <input
            type="text"
            value={offerLetterSignatoryTitle}
            onChange={(e) => setOfferLetterSignatoryTitle(e.target.value)}
            className="w-full sm:w-1/2 px-3.5 py-2 rounded-xl bg-neutral-50 border border-neutral-300 text-xs font-semibold text-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
          <span className="text-[10px] text-neutral-500 mt-1 block">
            Appears underneath the digital COO signature on the official letterhead.
          </span>
        </div>
      </div>

      {/* Executive Digital Signature (Secured) */}
      <div className="p-6 rounded-3xl bg-white border border-neutral-200/90 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-brand-700 border border-purple-200 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5 text-brand-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-neutral-950">
                  Executive Digital Signature
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  Protected in DB / Cloudinary
                </span>
              </div>
              <p className="text-xs text-neutral-500">
                Confidential executive asset. Stored securely and served exclusively through authenticated admin endpoints (never in GitHub).
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Signature Preview Chamber */}
          <div className="flex items-center gap-4">
            <div className="h-20 w-44 rounded-xl border border-neutral-300 bg-white flex items-center justify-center p-2 shadow-2xs overflow-hidden">
              {signatureUrl ? (
                <img
                  src={signatureUrl}
                  alt="Active Executive Signature"
                  className="max-h-16 max-w-full object-contain"
                />
              ) : (
                <span className="text-xs text-neutral-400 italic">No signature loaded</span>
              )}
            </div>

            <div className="text-xs space-y-1">
              <p className="font-bold text-neutral-900">
                {signatureUrl ? 'Active Signature Configured' : 'No Signature Uploaded'}
              </p>
              <p className="text-neutral-500 text-[11px]">
                {signatureUrl
                  ? 'Rendered dynamically on official offer letters when published or previewed by admin.'
                  : 'Upload a PNG with transparent background for official documents.'}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <label className="px-3.5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-2xs cursor-pointer transition-colors">
              <Upload className="w-3.5 h-3.5" />
              <span>{isUploadingSig ? 'Uploading...' : 'Upload New Signature'}</span>
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                disabled={isUploadingSig}
                onChange={handleUploadSignature}
              />
            </label>

            {signatureUrl && (
              <button
                type="button"
                disabled={isUploadingSig}
                onClick={handleDeleteSignature}
                className="p-2 rounded-xl text-neutral-400 hover:text-red-600 hover:bg-red-50 border border-neutral-200 transition-colors cursor-pointer"
                title="Remove signature"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Gmail & 3 Founders BCC Configuration */}
      <div className="p-6 rounded-3xl bg-white border border-neutral-200/90 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-brand-700 border border-purple-200 flex items-center justify-center font-bold">
              <Mail className="w-5 h-5 text-brand-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-neutral-950">
                  Gmail Delivery & 3 Founders BCC Configuration
                </h3>
                {isSmtpConfigured ? (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    Automated SMTP Active
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    App Password Pending
                  </span>
                )}
              </div>
              <p className="text-xs text-neutral-500">
                Candidate outreach and offer emails are dispatched directly from <code>kairotrix.official@gmail.com</code> with all 3 founders in BCC and official branding.
              </p>
            </div>
          </div>
        </div>

        {/* Server SMTP Guidance Card if pending */}
        {!isSmtpConfigured && (
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-950">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>How to Enable Automated 1-Click Server Dispatch</span>
            </div>
            <p className="text-[11px] text-amber-800 leading-relaxed">
              Because multiple founders use the admin dashboard across different computers and browsers, setting the Google App Password allows any founder to send emails from <strong>kairotrix.official@gmail.com</strong> in 1 click without needing to log in to that account on their browser:
            </p>
            <ol className="list-decimal list-inside text-[11px] text-amber-900 space-y-1 bg-white/70 p-3 rounded-xl border border-amber-200/80 font-medium">
              <li>Log in to Google with <strong>kairotrix.official@gmail.com</strong>.</li>
              <li>Go to <strong>Google Account &gt; Security &gt; 2-Step Verification &gt; App Passwords</strong>.</li>
              <li>Generate a 16-character password named &quot;Kairotrix Admin&quot;.</li>
              <li>Add to server <code className="font-mono bg-amber-100 px-1 py-0.5 rounded">.env</code>: <code className="font-mono bg-amber-100 px-1 py-0.5 rounded">GMAIL_APP_PASSWORD=&quot;xxxx xxxx xxxx xxxx&quot;</code></li>
            </ol>
            <p className="text-[10px] text-amber-700">
              *While pending, founders can still preview templates and use the &quot;Open in Gmail Web&quot; button.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <div>
            <label className="block text-xs font-semibold text-neutral-800 mb-1">
              Official Sender Email (Fixed)
            </label>
            <div className="px-3.5 py-2.5 rounded-xl bg-neutral-100 border border-neutral-300 font-mono text-xs font-bold text-neutral-900 flex items-center justify-between">
              <span>{OFFICIAL_SENDER_EMAIL}</span>
              <span className="text-[10px] text-emerald-700 bg-emerald-100/70 border border-emerald-300 px-2 py-0.5 rounded-full font-sans font-semibold">
                Sender
              </span>
            </div>
            <span className="text-[10px] text-neutral-500 mt-1 block">
              Direct sender for server SMTP dispatch and fallback web compose.
            </span>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-neutral-800">
                Official Graphical Signature Banner
              </label>
              <a
                href="https://www.kairotrix.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-purple-700 font-semibold hover:underline flex items-center gap-0.5"
              >
                <span>Links to www.kairotrix.in</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
            <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-300 text-xs text-neutral-800 flex items-center justify-start">
              <a
                href="https://www.kairotrix.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white p-1.5 rounded-lg border border-neutral-200 hover:border-brand-500 shadow-2xs transition-colors"
                title="Click to visit www.kairotrix.in"
              >
                <img
                  src="/assets/brand/kairotrix-email-signature.png"
                  alt="KAIROTRIX Official Signature Banner"
                  width={526}
                  height={80}
                  className="w-full max-w-[526px] h-auto object-contain block"
                />
              </a>
            </div>
            <span className="text-[10px] text-neutral-500 mt-1 block">
              Auto-attached to all automated server emails as an interactive banner linking to <code>www.kairotrix.in</code>.
            </span>
          </div>
        </div>

        <div className="pt-2 border-t border-neutral-100">
          <label className="block text-xs font-semibold text-neutral-800 mb-1">
            Founder BCC Email Addresses (Comma-separated)
          </label>
          <input
            type="text"
            value={founderBccEmails}
            onChange={(e) => setFounderBccEmails(e.target.value)}
            placeholder="founder1@gmail.com, founder2@gmail.com, founder3@gmail.com"
            className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 border border-neutral-300 font-mono text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
          <p className="text-[10px] text-neutral-500 mt-1">
            These 3 founders are automatically prefilled in the BCC field of all candidate outreach emails and offer letter dispatches.
          </p>
        </div>
      </div>

      {/* WhatsApp Template Card */}
      <div className="p-6 rounded-3xl bg-white border border-neutral-200/90 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center font-bold">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-neutral-950">
                Predefined WhatsApp Outreach Template
              </h3>
              <p className="text-xs text-neutral-500">
                Opened automatically in WhatsApp with the applicant's details pre-filled.
              </p>
            </div>
          </div>
        </div>

        {/* Variables Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-semibold text-neutral-500 mr-1">Insert Variable:</span>
          {['name', 'role', 'institution', 'duration', 'phone', 'date'].map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => insertVariable(v, whatsappTemplate, setWhatsappTemplate)}
              className="px-2 py-0.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 text-[11px] font-mono text-neutral-700 transition-colors cursor-pointer"
            >
              +{`{{${v}}}`}
            </button>
          ))}
        </div>

        <textarea
          rows={5}
          value={whatsappTemplate}
          onChange={(e) => setWhatsappTemplate(e.target.value)}
          className="w-full p-3.5 rounded-2xl bg-neutral-50 border border-neutral-300 font-mono text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 leading-relaxed"
        />
      </div>

      {/* Email Initial Outreach Template Card */}
      <div className="p-6 rounded-3xl bg-white border border-neutral-200/90 shadow-2xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center font-bold">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-neutral-950">
              Predefined Email Outreach Template (Introductory)
            </h3>
            <p className="text-xs text-neutral-500">
              Used when reaching out to applicants to schedule interviews or discuss projects.
            </p>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-neutral-800 mb-1">
            Subject Line Template
          </label>
          <input
            type="text"
            value={emailSubjectTemplate}
            onChange={(e) => setEmailSubjectTemplate(e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 border border-neutral-300 text-xs font-semibold text-neutral-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-semibold text-neutral-800">
              Email Body Template
            </label>
            <div className="flex items-center gap-1.5 flex-wrap">
              {['name', 'role', 'institution', 'duration', 'date'].map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => insertVariable(v, emailBodyTemplate, setEmailBodyTemplate)}
                  className="px-2 py-0.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 text-[11px] font-mono text-neutral-700 transition-colors cursor-pointer"
                >
                  +{`{{${v}}}`}
                </button>
              ))}
            </div>
          </div>
          <textarea
            rows={5}
            value={emailBodyTemplate}
            onChange={(e) => setEmailBodyTemplate(e.target.value)}
            className="w-full p-3.5 rounded-2xl bg-neutral-50 border border-neutral-300 font-mono text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 leading-relaxed"
          />
        </div>
      </div>

      {/* Offer Letter Delivery Email Template */}
      <div className="p-6 rounded-3xl bg-white border border-neutral-200/90 shadow-2xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-50 text-brand-700 border border-purple-200 flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-neutral-950">
              Offer Letter Delivery Email Template
            </h3>
            <p className="text-xs text-neutral-500">
              The email message sent alongside the official Offer Letter PDF.
            </p>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-neutral-800 mb-1">
            Offer Email Subject Line
          </label>
          <input
            type="text"
            value={offerEmailSubjectTemplate}
            onChange={(e) => setOfferEmailSubjectTemplate(e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 border border-neutral-300 text-xs font-semibold text-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-semibold text-neutral-800">
              Offer Email Body Template
            </label>
            <div className="flex items-center gap-1.5 flex-wrap">
              {['name', 'role', 'offerRef', 'duration', 'period', 'date', 'acceptanceDueDate'].map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => insertVariable(v, offerEmailBodyTemplate, setOfferEmailBodyTemplate)}
                  className="px-2 py-0.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 text-[11px] font-mono text-neutral-700 transition-colors cursor-pointer"
                >
                  +{`{{${v}}}`}
                </button>
              ))}
            </div>
          </div>
          <textarea
            rows={6}
            value={offerEmailBodyTemplate}
            onChange={(e) => setOfferEmailBodyTemplate(e.target.value)}
            className="w-full p-3.5 rounded-2xl bg-neutral-50 border border-neutral-300 font-mono text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 leading-relaxed"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="submit"
          disabled={isSaving}
          className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving Changes...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Settings & Templates</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}

