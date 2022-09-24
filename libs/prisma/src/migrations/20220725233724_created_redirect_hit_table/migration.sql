-- CreateTable
CREATE TABLE "HackerNewsRedirectHit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "hackerNewsFirstId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "HackerNewsRedirectHit_hackerNewsFirstId_fkey" FOREIGN KEY ("hackerNewsFirstId") REFERENCES "HackerNewsFirst" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
