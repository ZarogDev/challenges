import { prisma } from '../prisma';

async function resetData() {
  console.log("🧹 Reset de la base de données...");

  // Suppression dans l'ordre des dépendances
  await prisma.voteParticipation.deleteMany();
  await prisma.voteChallenge.deleteMany();
  await prisma.participation.deleteMany();
  await prisma.challenge.deleteMany();
  await prisma.user.deleteMany();

  console.log("✅ Données supprimées !");
}

resetData()
  .catch((e) => {
    console.error("❌ Erreur lors du reset :", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });