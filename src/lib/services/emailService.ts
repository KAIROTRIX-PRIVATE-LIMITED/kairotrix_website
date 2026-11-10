import nodemailer from 'nodemailer';
import type { SendMailOptions } from 'nodemailer';
import {
  OFFICIAL_SENDER_EMAIL,
  DEFAULT_FOUNDER_BCC_EMAILS,
} from '@/types/internship';

/**
 * High-availability CDN URL for the official KAIROTRIX signature banner.
 * Loading this via HTTPS ensures Gmail treats it as an authentic inline signature
 * and never flags the email with an attachment paperclip or downloads box.
 */
export const OFFICIAL_SIGNATURE_BANNER_URL =
  process.env.OFFICIAL_SIGNATURE_BANNER_URL ||
  'https://res.cloudinary.com/yw4t6nm3/image/upload/v1794065797/kairotrix/brand/kairotrix-official-signature.png';

/**
 * Checks whether Gmail SMTP is configured in environment variables
 */
export function isGmailSmtpConfigured(): boolean {
  return Boolean(process.env.GMAIL_APP_PASSWORD);
}

/**
 * Creates a configured Nodemailer transporter for Gmail
 */
function getEmailTransporter() {
  const user = process.env.GMAIL_USER || OFFICIAL_SENDER_EMAIL;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!pass) {
    throw new Error(
      'GMAIL_APP_PASSWORD is not configured in .env. Please generate a Google App Password for kairotrix.official@gmail.com.'
    );
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: user.trim(),
      pass: pass.replace(/\s+/g, ''), // Strip any accidental spaces from the 16-char app password
    },
  });
}

export interface SendOutreachEmailOptions {
  to: string;
  candidateName: string;
  roleName?: string;
  subject: string;
  body: string;
  bcc?: string | null;
}

/**
 * Builds clean, native Gmail-matching HTML with:
 * - Font: Arial, Helvetica, sans-serif, size 13.5px, line-height 1.5, color #222222
 * - Candidate name, role, and KAIROTRIX Team highlighted in bold purple #9333EA
 * - Built to Evolve in bold black
 * - Clickable official signature banner sized to exactly 526*80 linking to https://www.kairotrix.in
 */
function buildGmailCompatibleHtml(
  rawBody: string,
  options?: {
    candidateName?: string;
    roleName?: string;
    attachmentNotice?: string;
  }
): string {
  // Strip trailing plain text signature block if present
  let text = rawBody.replace(/\n*--\s*\nKAIROTRIX[\s\S]*$/i, '').trim();

  // Highlight candidate name in bold purple (#9333EA)
  if (options?.candidateName) {
    const safeName = options.candidateName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${safeName})`, 'gi');
    text = text.replace(regex, '<span style="color: #9333EA; font-weight: bold;">$1</span>');
  }

  // Highlight role in bold purple (#9333EA)
  if (options?.roleName) {
    const safeRole = options.roleName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${safeRole})`, 'gi');
    text = text.replace(regex, '<span style="color: #9333EA; font-weight: bold;">$1</span>');
  }

  // Highlight 'KAIROTRIX Team' / 'Kairotrix Team' in bold purple (#9333EA)
  text = text.replace(/(KAIROTRIX Team|Kairotrix Team\.?)/gi, '<span style="color: #9333EA; font-weight: bold;">$1</span>');

  // Highlight 'Built to Evolve' in bold black (#222222)
  text = text.replace(/(Built to Evolve)/gi, '<strong style="color: #222222;">$1</strong>');

  // Split into paragraphs with clean line-height matching Gmail
  const paragraphs = text
    .split(/\n\s*\n/)
    .map((p) => `<p style="margin: 0 0 16px 0; padding: 0; line-height: 1.5;">${p.replace(/\n/g, '<br>')}</p>`)
    .join('');

  return `
    <div style="font-family: Arial, Helvetica, sans-serif; font-size: 13.5px; line-height: 1.5; color: #222222; max-width: 650px; margin: 0; padding: 12px 0; background-color: #ffffff;">
      <div style="color: #222222;">
        ${paragraphs}
      </div>

      <!-- KAIROTRIX Official Signature Banner (Clickable Link to Website, 526x80) -->
      <div style="margin-top: 22px; padding: 0;">
        <a href="https://www.kairotrix.in" target="_blank" rel="noopener noreferrer" style="display: inline-block; text-decoration: none;" title="Visit KAIROTRIX Website">
          <img src="${OFFICIAL_SIGNATURE_BANNER_URL}" alt="KAIROTRIX | BUILT TO EVOLVE" width="526" height="80" style="display: block; max-width: 526px; width: 100%; height: auto; border: 0;" />
        </a>
      </div>
    </div>
  `;
}

/**
 * Sends candidate outreach email directly from server via kairotrix.official@gmail.com
 */
export async function sendOutreachEmailServer(options: SendOutreachEmailOptions) {
  const transporter = getEmailTransporter();
  const bcc = (options.bcc || DEFAULT_FOUNDER_BCC_EMAILS)
    .split(',')
    .map((e) => e.trim())
    .filter(Boolean);

  const fromAddress = `"Kairotrix" <${process.env.GMAIL_USER || OFFICIAL_SENDER_EMAIL}>`;

  const htmlBody = buildGmailCompatibleHtml(options.body, {
    candidateName: options.candidateName,
    roleName: options.roleName,
  });

  const info = await transporter.sendMail({
    from: fromAddress,
    to: options.to,
    bcc: bcc,
    subject: options.subject,
    text: options.body,
    html: htmlBody,
    attachments: [],
  });

  return {
    success: true,
    messageId: info.messageId,
  };
}

export interface SendOfferEmailOptions {
  to: string;
  candidateName: string;
  roleName?: string;
  offerRef: string;
  subject: string;
  body: string;
  pdfBase64?: string; // Optional raw base64 or data URL
  bcc?: string | null;
}

/**
 * Sends official Offer Letter email with PDF attachment directly from server via kairotrix.official@gmail.com
 */
export async function sendOfferLetterEmailServer(options: SendOfferEmailOptions) {
  const transporter = getEmailTransporter();
  const bcc = (options.bcc || DEFAULT_FOUNDER_BCC_EMAILS)
    .split(',')
    .map((e) => e.trim())
    .filter(Boolean);

  const fromAddress = `"Kairotrix" <${process.env.GMAIL_USER || OFFICIAL_SENDER_EMAIL}>`;
  const cleanRef = options.offerRef.replace(/[^a-zA-Z0-9]/g, '_');

  const attachments: SendMailOptions['attachments'] = [];

  if (options.pdfBase64) {
    const rawData = options.pdfBase64.includes('base64,')
      ? options.pdfBase64.split('base64,')[1]
      : options.pdfBase64;
    attachments.push({
      filename: `${cleanRef}_Offer_Letter.pdf`,
      content: Buffer.from(rawData, 'base64'),
      contentType: 'application/pdf',
    });
  }

  const htmlBody = buildGmailCompatibleHtml(options.body, {
    candidateName: options.candidateName,
    roleName: options.roleName,
  });

  const info = await transporter.sendMail({
    from: fromAddress,
    to: options.to,
    bcc: bcc,
    subject: options.subject,
    text: options.body,
    html: htmlBody,
    attachments,
  });

  return {
    success: true,
    messageId: info.messageId,
  };
}
