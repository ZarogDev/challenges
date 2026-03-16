/*
  Warnings:

  - You are about to drop the `Challenge` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Participation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VoteChallenge` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VoteParticipation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Challenge" DROP CONSTRAINT "Challenge_userId_fkey";

-- DropForeignKey
ALTER TABLE "Participation" DROP CONSTRAINT "Participation_challengeId_fkey";

-- DropForeignKey
ALTER TABLE "Participation" DROP CONSTRAINT "Participation_userId_fkey";

-- DropForeignKey
ALTER TABLE "VoteChallenge" DROP CONSTRAINT "VoteChallenge_challengeId_fkey";

-- DropForeignKey
ALTER TABLE "VoteChallenge" DROP CONSTRAINT "VoteChallenge_userId_fkey";

-- DropForeignKey
ALTER TABLE "VoteParticipation" DROP CONSTRAINT "VoteParticipation_participationId_fkey";

-- DropForeignKey
ALTER TABLE "VoteParticipation" DROP CONSTRAINT "VoteParticipation_userId_fkey";

-- DropTable
DROP TABLE "Challenge";

-- DropTable
DROP TABLE "Participation";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "VoteChallenge";

-- DropTable
DROP TABLE "VoteParticipation";

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "birthdate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "challenge" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "conditions" TEXT,
    "gameId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER,

    CONSTRAINT "challenge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "participation" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "videoLink" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER,
    "challengeId" INTEGER,

    CONSTRAINT "participation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vote_challenge" (
    "id" SERIAL NOT NULL,
    "rating" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER,
    "challengeId" INTEGER,

    CONSTRAINT "vote_challenge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vote_participation" (
    "id" SERIAL NOT NULL,
    "rating" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER,
    "participationId" INTEGER,

    CONSTRAINT "vote_participation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "vote_challenge_userId_challengeId_key" ON "vote_challenge"("userId", "challengeId");

-- CreateIndex
CREATE UNIQUE INDEX "vote_participation_userId_participationId_key" ON "vote_participation"("userId", "participationId");

-- AddForeignKey
ALTER TABLE "challenge" ADD CONSTRAINT "challenge_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "participation" ADD CONSTRAINT "participation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "participation" ADD CONSTRAINT "participation_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "challenge"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vote_challenge" ADD CONSTRAINT "vote_challenge_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vote_challenge" ADD CONSTRAINT "vote_challenge_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "challenge"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vote_participation" ADD CONSTRAINT "vote_participation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vote_participation" ADD CONSTRAINT "vote_participation_participationId_fkey" FOREIGN KEY ("participationId") REFERENCES "participation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
