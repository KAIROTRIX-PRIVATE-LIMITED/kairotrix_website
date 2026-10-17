-- CreateTable
CREATE TABLE "InternshipProgramConfig" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "isAcceptingApplications" BOOLEAN NOT NULL DEFAULT true,
    "bannerAnnouncement" TEXT,
    "complianceNotice" TEXT,
    "termsAndConditions" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InternshipProgramConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InternshipRole" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "responsibilities" TEXT[],
    "requiredSkills" TEXT[],
    "eligibility" TEXT NOT NULL,
    "projectScope" TEXT NOT NULL,
    "supervisor" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "workingExpectations" TEXT NOT NULL,
    "compensationTerms" TEXT NOT NULL,
    "completionCriteria" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PUBLISHED',
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InternshipRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InternshipApplicant" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "institution" TEXT NOT NULL,
    "degree" TEXT NOT NULL,
    "course" TEXT NOT NULL,
    "yearOfStudy" TEXT NOT NULL,
    "technicalSkills" TEXT[],
    "projectExperience" TEXT NOT NULL,
    "preferredDomains" TEXT[],
    "githubUrl" TEXT,
    "portfolioUrl" TEXT,
    "linkedinUrl" TEXT,
    "otherLinks" TEXT,
    "resumeUrl" TEXT NOT NULL,
    "resumeName" TEXT,
    "weeklyAvailability" TEXT NOT NULL,
    "potentialStartDate" TEXT NOT NULL,
    "motivation" TEXT NOT NULL,
    "privacyConsent" BOOLEAN NOT NULL DEFAULT true,
    "complianceAck" BOOLEAN NOT NULL DEFAULT true,
    "status" TEXT NOT NULL DEFAULT 'REVIEW',
    "internalRating" INTEGER,
    "interviewFeedback" TEXT,
    "assessmentNotes" TEXT,
    "internalNotes" TEXT,
    "assignedRoleId" TEXT,
    "assignedRoleTitle" TEXT,
    "assignmentReason" TEXT,
    "assignedAt" TIMESTAMP(3),
    "offerDetails" JSONB,
    "offerStatus" TEXT,
    "offerIssuedAt" TIMESTAMP(3),
    "offerAcceptedAt" TIMESTAMP(3),
    "certificateIssued" BOOLEAN NOT NULL DEFAULT false,
    "certificateId" TEXT,
    "certificateIssuedAt" TIMESTAMP(3),
    "certificateCriteriaMet" BOOLEAN NOT NULL DEFAULT false,
    "completionFeedback" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InternshipApplicant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InternshipTimelineEvent" (
    "id" TEXT NOT NULL,
    "applicantId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "actor" TEXT NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InternshipTimelineEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InternshipRole_slug_key" ON "InternshipRole"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "InternshipApplicant_certificateId_key" ON "InternshipApplicant"("certificateId");

-- AddForeignKey
ALTER TABLE "InternshipApplicant" ADD CONSTRAINT "InternshipApplicant_assignedRoleId_fkey" FOREIGN KEY ("assignedRoleId") REFERENCES "InternshipRole"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InternshipTimelineEvent" ADD CONSTRAINT "InternshipTimelineEvent_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "InternshipApplicant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
