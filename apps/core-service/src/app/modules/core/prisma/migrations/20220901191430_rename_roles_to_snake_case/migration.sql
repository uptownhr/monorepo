/*
  Warnings:

  - You are about to drop the `CompanyRole` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WorkerRole` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "WorkerRole" DROP CONSTRAINT "WorkerRole_company_role_id_fkey";

-- DropTable
DROP TABLE "CompanyRole";

-- DropTable
DROP TABLE "WorkerRole";

-- CreateTable
CREATE TABLE "company_role" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "company_id" CHAR(32) NOT NULL,

    CONSTRAINT "company_role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "worker_role" (
    "id" UUID NOT NULL,
    "is_primary" BOOLEAN NOT NULL DEFAULT false,
    "pay_rate" INTEGER NOT NULL,
    "userId" CHAR(32) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "company_role_id" UUID NOT NULL,

    CONSTRAINT "worker_role_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "company_role_company_id_idx" ON "company_role"("company_id");

-- AddForeignKey
ALTER TABLE "worker_role" ADD CONSTRAINT "worker_role_company_role_id_fkey" FOREIGN KEY ("company_role_id") REFERENCES "company_role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
