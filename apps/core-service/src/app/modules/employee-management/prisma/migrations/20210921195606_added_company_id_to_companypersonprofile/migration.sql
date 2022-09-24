/*
  Warnings:

  - Added the required column `companyId` to the `company_person_profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "company_person_profile" ADD COLUMN     "companyId" TEXT NOT NULL;
