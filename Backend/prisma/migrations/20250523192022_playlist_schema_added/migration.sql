/*
  Warnings:

  - You are about to drop the column `complileOutput` on the `TestCaseResult` table. All the data in the column will be lost.
  - Changed the type of `testCase` on the `TestCaseResult` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `expected` on table `TestCaseResult` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "TestCaseResult" DROP COLUMN "complileOutput",
ADD COLUMN     "compileOutput" TEXT,
DROP COLUMN "testCase",
ADD COLUMN     "testCase" INTEGER NOT NULL,
ALTER COLUMN "expected" SET NOT NULL;

-- CreateTable
CREATE TABLE "Playlist" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Playlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProblemInPlaylist" (
    "id" TEXT NOT NULL,
    "playListId" TEXT NOT NULL,
    "problemId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProblemInPlaylist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Playlist_name_userId_key" ON "Playlist"("name", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "ProblemInPlaylist_playListId_problemId_key" ON "ProblemInPlaylist"("playListId", "problemId");

-- AddForeignKey
ALTER TABLE "Playlist" ADD CONSTRAINT "Playlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProblemInPlaylist" ADD CONSTRAINT "ProblemInPlaylist_playListId_fkey" FOREIGN KEY ("playListId") REFERENCES "Playlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProblemInPlaylist" ADD CONSTRAINT "ProblemInPlaylist_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
