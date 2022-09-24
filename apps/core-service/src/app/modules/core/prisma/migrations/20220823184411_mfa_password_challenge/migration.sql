/*
  Warnings:

  - You are about to drop the `AuthDevice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AuthMfaChallenge` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AuthMfaChallengeAttempt` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AuthMfaConfig` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
ALTER TYPE "AuthMfaType" ADD VALUE 'PASSWORD';

-- DropForeignKey
ALTER TABLE "AuthMfaChallenge" DROP CONSTRAINT "AuthMfaChallenge_auth_device_id_fkey";

-- DropForeignKey
ALTER TABLE "AuthMfaChallenge" DROP CONSTRAINT "AuthMfaChallenge_auth_mfa_config_id_fkey";

-- DropForeignKey
ALTER TABLE "AuthMfaChallengeAttempt" DROP CONSTRAINT "AuthMfaChallengeAttempt_auth_mfa_challenge_id_fkey";

-- DropTable
DROP TABLE "AuthDevice";

-- DropTable
DROP TABLE "AuthMfaChallenge";

-- DropTable
DROP TABLE "AuthMfaChallengeAttempt";

-- DropTable
DROP TABLE "AuthMfaConfig";

-- CreateTable
CREATE TABLE "auth_mfa_config" (
    "id" UUID NOT NULL,
    "auth_id" CHAR(32) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "confirmed_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),
    "type" "AuthMfaType" NOT NULL,
    "configuration" JSONB NOT NULL,

    CONSTRAINT "auth_mfa_config_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth_mfa_device" (
    "id" UUID NOT NULL,
    "auth_id" CHAR(32) NOT NULL,
    "device_id" VARCHAR NOT NULL,
    "user_agent" VARCHAR NOT NULL,

    CONSTRAINT "auth_mfa_device_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth_mfa_challenge" (
    "id" UUID NOT NULL,
    "auth_id" CHAR(32) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "succeeded_at" TIMESTAMP(3),
    "remember_until" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "auth_device_id" UUID NOT NULL,
    "reason" VARCHAR,
    "authMfaConfigId" UUID,

    CONSTRAINT "auth_mfa_challenge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth_mfa_challenge_attempt" (
    "id" UUID NOT NULL,
    "auth_id" CHAR(32) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "was_successful" BOOLEAN NOT NULL DEFAULT false,
    "auth_mfa_challenge_id" UUID NOT NULL,
    "auth_mfa_config_id" UUID NOT NULL,

    CONSTRAINT "auth_mfa_challenge_attempt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "auth_mfa_device_auth_id_device_id_key" ON "auth_mfa_device"("auth_id", "device_id");

-- CreateIndex
CREATE INDEX "auth_mfa_challenge_auth_id_succeeded_at_auth_device_id_idx" ON "auth_mfa_challenge"("auth_id", "succeeded_at", "auth_device_id");

-- CreateIndex
CREATE INDEX "auth_mfa_challenge_auth_id_idx" ON "auth_mfa_challenge"("auth_id");

-- CreateIndex
CREATE INDEX "auth_mfa_challenge_auth_id_reason_idx" ON "auth_mfa_challenge"("auth_id", "reason");

-- CreateIndex
CREATE INDEX "auth_mfa_challenge_auth_id_reason_succeeded_at_idx" ON "auth_mfa_challenge"("auth_id", "reason", "succeeded_at");

-- CreateIndex
CREATE INDEX "auth_mfa_challenge_attempt_auth_id_created_at_idx" ON "auth_mfa_challenge_attempt"("auth_id", "created_at");

-- AddForeignKey
ALTER TABLE "auth_mfa_challenge" ADD CONSTRAINT "auth_mfa_challenge_auth_device_id_fkey" FOREIGN KEY ("auth_device_id") REFERENCES "auth_mfa_device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth_mfa_challenge" ADD CONSTRAINT "auth_mfa_challenge_authMfaConfigId_fkey" FOREIGN KEY ("authMfaConfigId") REFERENCES "auth_mfa_config"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth_mfa_challenge_attempt" ADD CONSTRAINT "auth_mfa_challenge_attempt_auth_mfa_challenge_id_fkey" FOREIGN KEY ("auth_mfa_challenge_id") REFERENCES "auth_mfa_challenge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auth_mfa_challenge_attempt" ADD CONSTRAINT "auth_mfa_challenge_attempt_auth_mfa_config_id_fkey" FOREIGN KEY ("auth_mfa_config_id") REFERENCES "auth_mfa_config"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
