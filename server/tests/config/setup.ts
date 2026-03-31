import { beforeAll, afterAll, beforeEach } from 'vitest';
import { prisma } from '../../src/db/prisma';

beforeAll(async () => {
  await prisma.$connect();
});

beforeEach(async () => {
   // Suppression dans l'ordre des dépendances
  await prisma.voteParticipation.deleteMany();
  await prisma.voteChallenge.deleteMany();
  await prisma.participation.deleteMany();
  await prisma.challenge.deleteMany();
  await prisma.user.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});