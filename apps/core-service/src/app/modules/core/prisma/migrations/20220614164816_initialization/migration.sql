-- CreateEnum
CREATE TYPE "CoreUserGroupType" AS ENUM ('CUSTOM', 'EMPLOYEES', 'CONTRACTORS', 'MANAGERS', 'ADMINS', 'MANAGERS_WITH_REPORTS');

-- CreateTable
CREATE TABLE "core_user_group" (
    "id" UUID NOT NULL,
    "companyId" CHAR(32) NOT NULL,
    "type" "CoreUserGroupType" NOT NULL DEFAULT E'CUSTOM',

    CONSTRAINT "core_user_group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "core_user_group_membership" (
    "id" UUID NOT NULL,
    "group_id" UUID NOT NULL,
    "userId" CHAR(32) NOT NULL,

    CONSTRAINT "core_user_group_membership_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "core_user_group_companyId_type_idx" ON "core_user_group"("companyId", "type");

-- CreateIndex
CREATE INDEX "core_user_group_companyId_idx" ON "core_user_group"("companyId");

-- CreateIndex
CREATE INDEX "core_user_group_membership_userId_idx" ON "core_user_group_membership"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "core_user_group_membership_group_id_userId_key" ON "core_user_group_membership"("group_id", "userId");

-- AddForeignKey
ALTER TABLE "core_user_group_membership" ADD CONSTRAINT "core_user_group_membership_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "core_user_group"("id") ON DELETE CASCADE ON UPDATE CASCADE;
