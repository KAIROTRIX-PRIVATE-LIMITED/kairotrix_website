-- AlterTable
ALTER TABLE "InternshipProgramConfig" ADD COLUMN IF NOT EXISTS "whatsappTemplate" TEXT,
ADD COLUMN IF NOT EXISTS "emailSubjectTemplate" TEXT,
ADD COLUMN IF NOT EXISTS "emailBodyTemplate" TEXT,
ADD COLUMN IF NOT EXISTS "offerEmailSubjectTemplate" TEXT,
ADD COLUMN IF NOT EXISTS "offerEmailBodyTemplate" TEXT,
ADD COLUMN IF NOT EXISTS "offerLetterPrefix" TEXT DEFAULT 'KT/INT/2026/',
ADD COLUMN IF NOT EXISTS "offerLetterNextNumber" INTEGER DEFAULT 4,
ADD COLUMN IF NOT EXISTS "offerLetterSignatoryTitle" TEXT DEFAULT 'Chief Operating Officer';

-- AlterTable
ALTER TABLE "InternshipApplicant" ADD COLUMN IF NOT EXISTS "offerRef" TEXT,
ADD COLUMN IF NOT EXISTS "hiredAt" TIMESTAMP(3),
ADD COLUMN IF NOT EXISTS "dailyRecords" JSONB;

