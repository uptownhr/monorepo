/*
  Warnings:

  - You are about to drop the `AuthMfsChallengeAttempt` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AuthMfsChallengeAttempt" DROP CONSTRAINT "AuthMfsChallengeAttempt_auth_mfa_challenge_id_fkey";

-- AlterTable
ALTER TABLE "AuthMfaChallenge" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "AuthMfsChallengeAttempt";

-- CreateTable
CREATE TABLE "AuthMfaChallengeAttempt" (
    "id" UUID NOT NULL,
    "auth_id" CHAR(32) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "was_successful" BOOLEAN NOT NULL DEFAULT false,
    "auth_mfa_challenge_id" UUID NOT NULL,

    CONSTRAINT "AuthMfaChallengeAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AuthMfaChallengeAttempt_auth_id_created_at_idx" ON "AuthMfaChallengeAttempt"("auth_id", "created_at");

-- AddForeignKey
ALTER TABLE "AuthMfaChallengeAttempt" ADD CONSTRAINT "AuthMfaChallengeAttempt_auth_mfa_challenge_id_fkey" FOREIGN KEY ("auth_mfa_challenge_id") REFERENCES "AuthMfaChallenge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
