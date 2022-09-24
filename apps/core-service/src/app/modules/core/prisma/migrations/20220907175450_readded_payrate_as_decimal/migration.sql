/*
  Warnings:

  - The `pay_rate` column on the `worker_role` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "worker_role" DROP COLUMN "pay_rate",
ADD COLUMN     "pay_rate" MONEY NOT NULL DEFAULT 0;
ALTER TABLE "worker_role" ALTER COLUMN "pay_rate" DROP DEFAULT;

