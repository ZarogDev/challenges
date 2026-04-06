/*
  Warnings:

  - Added the required column `gameThumbnail` to the `challenge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gameTitle` to the `challenge` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "challenge" ADD COLUMN     "gameThumbnail" TEXT NOT NULL,
ADD COLUMN     "gameTitle" TEXT NOT NULL;
