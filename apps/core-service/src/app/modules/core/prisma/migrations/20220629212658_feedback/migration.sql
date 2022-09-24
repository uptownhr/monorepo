-- CreateEnum
CREATE TYPE "CoreUserFeedbackValue" AS ENUM ('BELOW_EXPECTATIONS', 'MEETS_EXPECTATIONS', 'ABOVE_EXPECTATIONS');

-- CreateTable
CREATE TABLE "core_user_feedback" (
    "id" UUID NOT NULL,
    "byUserId" CHAR(32) NOT NULL,
    "forUserId" CHAR(32) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "channelId" TEXT,
    "messageId" BIGINT,
    "message" TEXT,
    "value" "CoreUserFeedbackValue" NOT NULL DEFAULT 'MEETS_EXPECTATIONS',

    CONSTRAINT "core_user_feedback_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "core_user_feedback_byUserId_createdAt_idx" ON "core_user_feedback"("byUserId", "createdAt");

-- CreateIndex
CREATE INDEX "core_user_feedback_forUserId_createdAt_idx" ON "core_user_feedback"("forUserId", "createdAt");
