-- CreateTable
CREATE TABLE "CompanyRole" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "company_id" CHAR(32) NOT NULL,

    CONSTRAINT "CompanyRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkerRole" (
    "id" UUID NOT NULL,
    "is_primary" BOOLEAN NOT NULL DEFAULT false,
    "pay_rate" INTEGER NOT NULL,
    "userId" CHAR(32) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "company_role_id" UUID NOT NULL,

    CONSTRAINT "WorkerRole_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CompanyRole_company_id_idx" ON "CompanyRole"("company_id");

-- AddForeignKey
ALTER TABLE "WorkerRole" ADD CONSTRAINT "WorkerRole_company_role_id_fkey" FOREIGN KEY ("company_role_id") REFERENCES "CompanyRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
