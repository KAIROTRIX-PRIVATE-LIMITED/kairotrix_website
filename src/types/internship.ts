export interface DailyRecordEntry {
  id: string;
  date: string;
  note: string;
  author: string;
}

export interface OfferDetailsPayload {
  offerRef: string;
  designation: string;
  duration: string;
  startDate?: string;
  endDate?: string;
  period: string;
  issueDate: string;
  workMode: string;
  workingHours: string;
  stipend: string;
  acceptanceDueDate: string;
  signatoryTitle: string;
  terms?: string[];
  pdfDataUrl?: string | null;
}

export interface InternshipApplicantItem {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  institution: string;
  degree?: string | null;
  course?: string | null;
  yearOfStudy: string;
  roleAppliedFor?: string | null;
  duration?: string | null;
  weeklyAvailability?: string | null;
  technicalSkills?: string[];
  preferredDomains: string[];
  githubUrl?: string | null;
  portfolioUrl?: string | null;
  linkedinUrl?: string | null;
  resumeUrl: string;
  resumeName?: string | null;
  status: string;
  offerRef?: string | null;
  offerDetails?: OfferDetailsPayload | null;
  offerStatus?: string | null;
  offerIssuedAt?: string | null;
  offerAcceptedAt?: string | null;
  hiredAt?: string | null;
  dailyRecords?: DailyRecordEntry[] | null;
  createdAt: string;
}

export interface InternshipSettingsConfig {
  id: string;
  isAcceptingApplications: boolean;
  bannerAnnouncement?: string | null;
  complianceNotice?: string | null;
  termsAndConditions?: string | null;
  whatsappTemplate?: string | null;
  emailSubjectTemplate?: string | null;
  emailBodyTemplate?: string | null;
  offerEmailSubjectTemplate?: string | null;
  offerEmailBodyTemplate?: string | null;
  offerLetterPrefix?: string | null;
  offerLetterNextNumber?: number | null;
  offerLetterSignatoryTitle?: string | null;
  cooSignatureData?: string | null;
  founderBccEmails?: string | null;
  updatedAt: string;
}

export type InternshipApplicant = InternshipApplicantItem;
export type InternshipProgramConfig = InternshipSettingsConfig;

export const OFFICIAL_SENDER_EMAIL = 'kairotrix.official@gmail.com';

export const DEFAULT_FOUNDER_BCC_EMAILS = [
  'jeyaprakash2630@gmail.com',
  'sowmiyapgowda0504@gmail.com',
  'afzalmohamed098@gmail.com',
].join(',');

export const DEFAULT_WHATSAPP_TEMPLATE = `Hi {{name}},

Greetings from Kairotrix!

Regarding your application for the {{role}} internship ({{duration}}), we would like to confirm your interest in joining our internship program.

Kindly let us know when you would be available and willing to join.

Further details and internship tasks will be shared through Email.

Thank you!
Team Kairotrix`;

export const DEFAULT_EMAIL_SUBJECT_TEMPLATE = `Internship Application – Next Steps | KAIROTRIX`;

export const DEFAULT_EMAIL_BODY_TEMPLATE = `Dear {{name}},

Greetings from KAIROTRIX!

Thank you for your interest in joining KAIROTRIX as an {{role}} and for sharing your resume with us.

We have received your application and appreciate your interest in exploring internship opportunities with our team.

Our team will contact you shortly to discuss your application, understand your interests, and guide you through the next steps of the internship process.

We look forward to connecting with you and learning more about your aspirations.

Best regards,
KAIROTRIX Team
Built to Evolve`;

export const DEFAULT_OFFER_EMAIL_SUBJECT_TEMPLATE = `Internship Offer Letter – {{role}} | Kairotrix`;

export const DEFAULT_OFFER_EMAIL_BODY_TEMPLATE = `Dear {{name}},

Greetings from Kairotrix!

We are pleased to offer you the position of {{role}} at Kairotrix.

Please find the attached Internship offer letter containing the details of your internship, including the duration, work mode, and other terms.

Kindly review the offer letter, sign it as a confirmation of your acceptance, and reply to this email with the signed copy.

We look forward to having you onboard and wish you a valuable learning experience with Kairotrix.

Congratulations on your selection!

Best regards,
Kairotrix Team.
Built to Evolve`;

/**
 * Generates a direct Gmail Web Compose URL targeting the official mailbox:
 * - Uses `/mail/u/kairotrix.official@gmail.com/` to force Gmail to switch to the official Kairotrix account
 * - Sets `authuser=kairotrix.official@gmail.com`
 * - Prefills To with candidate email
 * - Prefills Subject
 * - Prefills Body with official Kairotrix signature
 * - Prefills BCC with all 3 founders
 */
export function buildGmailComposeUrl(params: {
  to: string;
  subject: string;
  body: string;
  bcc?: string | null;
}): string {
  const bcc = params.bcc || DEFAULT_FOUNDER_BCC_EMAILS;
  const searchParams = new URLSearchParams({
    view: 'cm',
    fs: '1',
    authuser: OFFICIAL_SENDER_EMAIL,
    to: params.to,
    su: params.subject,
    body: params.body,
    bcc: bcc,
  });
  return `https://mail.google.com/mail/u/${encodeURIComponent(OFFICIAL_SENDER_EMAIL)}/?${searchParams.toString()}`;
}

/**
 * Standard mailto fallback with BCC support
 */
export function buildMailtoUrl(params: {
  to: string;
  subject: string;
  body: string;
  bcc?: string | null;
}): string {
  const bcc = params.bcc || DEFAULT_FOUNDER_BCC_EMAILS;
  const searchParams = new URLSearchParams({
    subject: params.subject,
    body: params.body,
    bcc: bcc,
  });
  return `mailto:${params.to}?${searchParams.toString()}`;
}



