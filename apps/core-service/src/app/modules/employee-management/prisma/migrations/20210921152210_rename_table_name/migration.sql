/*
  Warnings:

  - You are about to drop the `CompanyPersonProfile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "employee_voices_feedback" DROP CONSTRAINT "employee_voices_feedback_companyPersonProfileId_fkey";

-- DropTable
DROP TABLE "CompanyPersonProfile";

-- CreateTable
CREATE TABLE "company_person_profile" (
    "id" TEXT NOT NULL,

    CONSTRAINT "company_person_profile_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "employee_voices_feedback" ADD CONSTRAINT "employee_voices_feedback_companyPersonProfileId_fkey" FOREIGN KEY ("companyPersonProfileId") REFERENCES "company_person_profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
