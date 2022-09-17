-- CreateTable
CREATE TABLE "HackerNewsSelected" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "hackerNewsFirstId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "HackerNewsSelected_hackerNewsFirstId_fkey" FOREIGN KEY ("hackerNewsFirstId") REFERENCES "HackerNewsFirst" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "HackerNewsSelected_hackerNewsFirstId_key" ON "HackerNewsSelected"("hackerNewsFirstId");
