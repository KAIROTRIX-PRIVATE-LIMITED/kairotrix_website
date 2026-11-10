'use client';

import React, { useState } from 'react';
import {
  Mail,
  Send,
  X,
  ExternalLink,
  Copy,
  Check,
  AlertCircle,
  Loader2,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import {
  InternshipApplicant,
  InternshipProgramConfig,
  OFFICIAL_SENDER_EMAIL,
  DEFAULT_FOUNDER_BCC_EMAILS,
  DEFAULT_EMAIL_SUBJECT_TEMPLATE,
  DEFAULT_EMAIL_BODY_TEMPLATE,
  buildGmailComposeUrl,
} from '@/types/internship';

interface OutreachEmailModalProps {
  applicant: InternshipApplicant | null;
  settings?: InternshipProgramConfig | null;
  isOpen: boolean;
  onClose: () => void;
  onEmailSent?: () => void;
  onMarkContacted?: (applicantId: string) => Promise<void>;
}

export function OutreachEmailModal({
  applicant,
  settings,
  isOpen,
  onClose,
  onEmailSent,
  onMarkContacted,
}: OutreachEmailModalProps) {
  if (!isOpen || !applicant) return null;

  const roleName = applicant.roleAppliedFor || applicant.preferredDomains?.[0] || 'Intern';
  const duration = applicant.duration || applicant.weeklyAvailability || '1 Month';
  const institution = applicant.institution || 'your institution';

  const today = new Date();
  const todayFormatted = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;

  const defaultSubject = (settings?.emailSubjectTemplate || DEFAULT_EMAIL_SUBJECT_TEMPLATE)
    .replace(/{{name}}/g, applicant.fullName)
    .replace(/{{role}}/g, roleName)
    .replace(/{{date}}/g, todayFormatted)
    .replace(/{{today}}/g, todayFormatted);

  const defaultBody = (settings?.emailBodyTemplate || DEFAULT_EMAIL_BODY_TEMPLATE)
    .replace(/{{name}}/g, applicant.fullName)
    .replace(/{{role}}/g, roleName)
    .replace(/{{institution}}/g, institution)
    .replace(/{{duration}}/g, duration)
    .replace(/{{date}}/g, todayFormatted)
    .replace(/{{today}}/g, todayFormatted);

  const effectiveBcc = settings?.founderBccEmails || DEFAULT_FOUNDER_BCC_EMAILS;

  const [subject, setSubject] = useState(defaultSubject);
  const [bodyText, setBodyText] = useState(defaultBody);
  const [bccEmails, setBccEmails] = useState(effectiveBcc);
  const [showBccInput, setShowBccInput] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notConfigured, setNotConfigured] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isMarkingContacted, setIsMarkingContacted] = useState(false);

  const handleSendServerEmail = async () => {
    setIsSending(true);
    setError(null);
    setNotConfigured(false);

    try {
      const res = await fetch(`/api/admin/internships/applicants/${applicant.id}/email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject,
          bodyText,
          bcc: bccEmails,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.notConfigured) {
          setNotConfigured(true);
        }
        throw new Error(data.error || 'Failed to dispatch email');
      }

      setSentSuccess(true);
      if (onEmailSent) {
        onEmailSent();
      }
    } catch (err: unknown) {
      const e = err as Error;
      setError(e.message || 'Failed to send email');
    } finally {
      setIsSending(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`Subject: ${subject}\n\n${bodyText}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleMarkContactedClick = async () => {
    if (!onMarkContacted) return;
    setIsMarkingContacted(true);
    try {
      await onMarkContacted(applicant.id);
      onClose();
    } catch (err) {
      console.error('Failed to mark contacted:', err);
    } finally {
      setIsMarkingContacted(false);
    }
  };

  const gmailComposeUrl = buildGmailComposeUrl({
    to: applicant.email,
    subject,
    body: bodyText,
    bcc: bccEmails,
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-neutral-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/80 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-brand-700 border border-purple-200 flex items-center justify-center font-bold">
              <Mail className="w-5 h-5 text-brand-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-neutral-950">
                  Official Candidate Outreach
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  Official Gmail
                </span>
              </div>
              <p className="text-xs text-neutral-500">
                To: <strong className="text-neutral-800">{applicant.fullName}</strong> ({applicant.email})
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 text-xs">
          
          {/* Success Banner */}
          {sentSuccess && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-2 animate-in fade-in">
              <div className="flex items-center gap-2 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Email Dispatched Successfully!</span>
              </div>
              <p className="text-xs text-emerald-800 leading-relaxed">
                The email was dispatched directly from <strong>{OFFICIAL_SENDER_EMAIL}</strong> to <strong>{applicant.email}</strong> with all 3 founders in BCC. A timeline audit event has been recorded.
              </p>
              
              {applicant.status === 'REVIEW' && onMarkContacted && (
                <div className="pt-2 flex items-center gap-2">
                  <button
                    type="button"
                    disabled={isMarkingContacted}
                    onClick={handleMarkContactedClick}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs flex items-center gap-1.5 shadow-2xs cursor-pointer transition-colors"
                  >
                    {isMarkingContacted ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Check className="w-3.5 h-3.5" />
                    )}
                    <span>Mark Candidate as Contacted</span>
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-3 py-1.5 rounded-xl bg-white border border-emerald-300 text-emerald-800 font-semibold text-xs hover:bg-emerald-100 cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Not Configured Alert */}
          {notConfigured && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 space-y-2.5 animate-in fade-in">
              <div className="flex items-center gap-2 font-bold text-sm text-amber-950">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                <span>Google App Password Pending</span>
              </div>
              <p className="text-xs text-amber-800 leading-relaxed">
                Automated 1-click server dispatch requires a 16-character Google App Password in your server <code className="bg-amber-100 px-1 py-0.5 rounded font-mono text-[11px]">.env</code>:
              </p>
              <div className="bg-white/80 p-3 rounded-xl border border-amber-200 text-[11px] font-mono text-neutral-800 space-y-1">
                <div>GMAIL_USER=&quot;kairotrix.official@gmail.com&quot;</div>
                <div>GMAIL_APP_PASSWORD=&quot;xxxx xxxx xxxx xxxx&quot;</div>
              </div>
              <p className="text-[11px] text-amber-700">
                Generate it at: <strong>Google Account &gt; Security &gt; 2-Step Verification &gt; App Passwords</strong>.
              </p>
              <div className="pt-1">
                <a
                  href={gmailComposeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs shadow-2xs transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open & Send in Gmail Web Instead</span>
                </a>
              </div>
            </div>
          )}

          {error && !notConfigured && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Envelope Metadata Card */}
          <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-200 font-mono text-[11px] space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-neutral-500 font-bold">From: </span>
                <span className="text-brand-700 font-bold">{OFFICIAL_SENDER_EMAIL}</span>
                <span className="text-neutral-400 font-sans ml-1">(Kairotrix Official)</span>
              </div>
              <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-sans font-medium">
                Server SMTP
              </span>
            </div>

            <div>
              <span className="text-neutral-500 font-bold">To: </span>
              <span className="text-neutral-900 font-semibold">{applicant.fullName} &lt;{applicant.email}&gt;</span>
            </div>

            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <span className="text-neutral-500 font-bold">BCC (3 Founders): </span>
                <span className="text-neutral-700 text-[10px] break-all">{bccEmails}</span>
              </div>
              <button
                type="button"
                onClick={() => setShowBccInput(!showBccInput)}
                className="text-[10px] font-sans text-brand-600 hover:underline shrink-0"
              >
                {showBccInput ? 'Hide' : 'Edit BCC'}
              </button>
            </div>

            {showBccInput && (
              <div className="pt-2 font-sans">
                <input
                  type="text"
                  value={bccEmails}
                  onChange={(e) => setBccEmails(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-white border border-neutral-300 font-mono text-[11px] text-neutral-800 focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
              </div>
            )}
          </div>

          {/* Subject Field */}
          <div>
            <label className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider mb-1">
              Subject Line
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-white border border-neutral-300 font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
            />
          </div>

          {/* Email Body Field */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-[11px] font-bold text-neutral-700 uppercase tracking-wider">
                Message Body
              </label>
              <button
                type="button"
                onClick={handleCopy}
                className="text-[11px] text-neutral-500 hover:text-brand-600 flex items-center gap-1 cursor-pointer"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy Text'}</span>
              </button>
            </div>
            <textarea
              rows={8}
              value={bodyText}
              onChange={(e) => setBodyText(e.target.value)}
              className="w-full p-3.5 rounded-xl bg-white border border-neutral-300 font-sans text-xs text-neutral-800 leading-relaxed focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 resize-y"
            />
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

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-neutral-200 bg-neutral-50/90 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-neutral-500 text-xs">
            <a
              href={gmailComposeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-neutral-600 hover:text-brand-700 flex items-center gap-1 font-medium transition-colors"
              title="Open in Gmail Web with all details pre-filled"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open in Gmail Web</span>
            </a>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white border border-neutral-300 text-neutral-700 text-xs font-semibold hover:bg-neutral-50 cursor-pointer"
            >
              Close
            </button>

            <button
              type="button"
              onClick={handleSendServerEmail}
              disabled={isSending || sentSuccess}
              className="px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Sending via kairotrix.official@gmail.com...</span>
                </>
              ) : sentSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Dispatched!</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Email (Official Gmail)</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
