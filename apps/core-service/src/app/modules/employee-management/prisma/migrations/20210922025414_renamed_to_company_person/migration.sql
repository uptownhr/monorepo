/*
  Warnings:

  - You are about to drop the column `companyPersonProfileId` on the `employee_voices_feedback` table. All the data in the column will be lost.
  - Added the required column `companyPersonId` to the `employee_voices_feedback` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "employee_voices_feedback" DROP CONSTRAINT "employee_voices_feedback_companyPersonProfileId_fkey";

-- AlterTable
ALTER TABLE "employee_voices_feedback" DROP COLUMN "companyPersonProfileId",
ADD COLUMN     "companyPersonId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "employee_voices_feedback" ADD CONSTRAINT "employee_voices_feedback_companyPersonId_fkey" FOREIGN KEY ("companyPersonId") REFERENCES "company_person_profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
