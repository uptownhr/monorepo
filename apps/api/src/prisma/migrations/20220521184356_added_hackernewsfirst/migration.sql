/*
  Warnings:

  - You are about to drop the `Repository` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Repository";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "HackerNewsFirst" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "hnId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "upvotes" INTEGER NOT NULL,
    "rawJson" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "HackerNewsFirst_hnId_key" ON "HackerNewsFirst"("hnId");
