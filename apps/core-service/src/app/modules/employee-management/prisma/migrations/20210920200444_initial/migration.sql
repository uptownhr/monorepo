-- CreateTable
CREATE TABLE "CompanyPersonProfile" (
    "id" TEXT NOT NULL,

    CONSTRAINT "CompanyPersonProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_voices_feedback" (
    "id" INTEGER NOT NULL,
    "companyPersonProfileId" TEXT NOT NULL,
    "feedback" TEXT NOT NULL,
    "anonymous" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_voices_feedback_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "employee_voices_feedback" ADD CONSTRAINT "employee_voices_feedback_companyPersonProfileId_fkey" FOREIGN KEY ("companyPersonProfileId") REFERENCES "CompanyPersonProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
