/*
  Warnings:

  - You are about to drop the column `rawJson` on the `HackerNewsFirst` table. All the data in the column will be lost.
  - You are about to drop the column `upvotes` on the `HackerNewsFirst` table. All the data in the column will be lost.
  - Added the required column `upVotes` to the `HackerNewsFirst` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_HackerNewsFirst" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "hnId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "upVotes" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_HackerNewsFirst" ("createdAt", "hnId", "id", "title", "updatedAt", "url") SELECT "createdAt", "hnId", "id", "title", "updatedAt", "url" FROM "HackerNewsFirst";
DROP TABLE "HackerNewsFirst";
ALTER TABLE "new_HackerNewsFirst" RENAME TO "HackerNewsFirst";
CREATE UNIQUE INDEX "HackerNewsFirst_hnId_key" ON "HackerNewsFirst"("hnId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
