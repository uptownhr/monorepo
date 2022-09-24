-- CreateEnum
CREATE TYPE "AuthMfaType" AS ENUM ('SMS');

-- CreateTable
CREATE TABLE "AuthMfaConfig" (
    "id" UUID NOT NULL,
    "auth_id" CHAR(32) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "confirmed_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),
    "type" "AuthMfaType" NOT NULL,
    "configuration" JSONB NOT NULL,

    CONSTRAINT "AuthMfaConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthDevice" (
    "id" UUID NOT NULL,
    "auth_id" CHAR(32) NOT NULL,
    "device_id" VARCHAR NOT NULL,
    "user_agent" VARCHAR NOT NULL,

    CONSTRAINT "AuthDevice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthMfaChallenge" (
    "id" UUID NOT NULL,
    "auth_id" CHAR(32) NOT NULL,
    "succeeded_at" TIMESTAMP(3),
    "remember_until" TIMESTAMP(3),
    "auth_device_id" UUID NOT NULL,
    "auth_mfa_config_id" UUID NOT NULL,

    CONSTRAINT "AuthMfaChallenge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthMfsChallengeAttempt" (
    "id" UUID NOT NULL,
    "auth_id" CHAR(32) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "was_successful" BOOLEAN NOT NULL DEFAULT false,
    "auth_mfa_challenge_id" UUID NOT NULL,

    CONSTRAINT "AuthMfsChallengeAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AuthDevice_auth_id_device_id_key" ON "AuthDevice"("auth_id", "device_id");

-- CreateIndex
CREATE INDEX "AuthMfaChallenge_auth_id_succeeded_at_auth_device_id_idx" ON "AuthMfaChallenge"("auth_id", "succeeded_at", "auth_device_id");

-- CreateIndex
CREATE INDEX "AuthMfaChallenge_auth_id_idx" ON "AuthMfaChallenge"("auth_id");

-- CreateIndex
CREATE INDEX "AuthMfsChallengeAttempt_auth_id_created_at_idx" ON "AuthMfsChallengeAttempt"("auth_id", "created_at");

-- AddForeignKey
ALTER TABLE "AuthMfaChallenge" ADD CONSTRAINT "AuthMfaChallenge_auth_device_id_fkey" FOREIGN KEY ("auth_device_id") REFERENCES "AuthDevice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthMfaChallenge" ADD CONSTRAINT "AuthMfaChallenge_auth_mfa_config_id_fkey" FOREIGN KEY ("auth_mfa_config_id") REFERENCES "AuthMfaConfig"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthMfsChallengeAttempt" ADD CONSTRAINT "AuthMfsChallengeAttempt_auth_mfa_challenge_id_fkey" FOREIGN KEY ("auth_mfa_challenge_id") REFERENCES "AuthMfaChallenge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
