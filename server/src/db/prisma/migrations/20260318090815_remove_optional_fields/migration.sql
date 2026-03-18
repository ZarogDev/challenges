/*
  Warnings:

  - Made the column `userId` on table `challenge` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `participation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `challengeId` on table `participation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `vote_challenge` required. This step will fail if there are existing NULL values in that column.
  - Made the column `challengeId` on table `vote_challenge` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `vote_participation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `participationId` on table `vote_participation` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "challenge" DROP CONSTRAINT "challenge_userId_fkey";

-- DropForeignKey
ALTER TABLE "participation" DROP CONSTRAINT "participation_challengeId_fkey";

-- DropForeignKey
ALTER TABLE "participation" DROP CONSTRAINT "participation_userId_fkey";

-- DropForeignKey
ALTER TABLE "vote_challenge" DROP CONSTRAINT "vote_challenge_challengeId_fkey";

-- DropForeignKey
ALTER TABLE "vote_challenge" DROP CONSTRAINT "vote_challenge_userId_fkey";

-- DropForeignKey
ALTER TABLE "vote_participation" DROP CONSTRAINT "vote_participation_participationId_fkey";

-- DropForeignKey
ALTER TABLE "vote_participation" DROP CONSTRAINT "vote_participation_userId_fkey";

-- AlterTable
ALTER TABLE "challenge" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "participation" ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "challengeId" SET NOT NULL;

-- AlterTable
ALTER TABLE "vote_challenge" ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "challengeId" SET NOT NULL;

-- AlterTable
ALTER TABLE "vote_participation" ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "participationId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "challenge" ADD CONSTRAINT "challenge_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "participation" ADD CONSTRAINT "participation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "participation" ADD CONSTRAINT "participation_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "challenge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vote_challenge" ADD CONSTRAINT "vote_challenge_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vote_challenge" ADD CONSTRAINT "vote_challenge_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "challenge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vote_participation" ADD CONSTRAINT "vote_participation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vote_participation" ADD CONSTRAINT "vote_participation_participationId_fkey" FOREIGN KEY ("participationId") REFERENCES "participation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
