import { prisma } from '../prisma';
import argon2 from 'argon2';

async function main() {
  // Création des utilisateurs
  const users = await Promise.all([
    prisma.user.create({
      data: { email: 'alice@example.com', username: 'alice', password: await argon2.hash('password1'), birthdate: new Date('1990-01-01') },
    }),
    prisma.user.create({
      data: { email: 'bob@example.com', username: 'bob', password: await argon2.hash('password2'), birthdate: new Date('1992-05-12') },
    }),
    prisma.user.create({
      data: { email: 'carol@example.com', username: 'carol', password: await argon2.hash('password3'), birthdate: new Date('1988-07-23') },
    }),
    prisma.user.create({
      data: { email: 'dave@example.com', username: 'dave', password: await argon2.hash('password4'), birthdate: new Date('1995-03-15') },
    }),
    prisma.user.create({
      data: { email: 'eve@example.com', username: 'eve', password: await argon2.hash('password5'), birthdate: new Date('1991-11-30') },
    }),
  ]);

  // Création des challenges
  const challenges = await Promise.all([
    prisma.challenge.create({
      data: { title: 'Challenge 1', description: 'Description du challenge 1', conditions: 'Aucune', gameId: 101, gameTitle: "Vikings - Wolves of Midgard", gameThumbnail: "https://media.rawg.io/media/screenshots/d96/d968719f37eaba04920ba2cfe2b7813a.jpg", userId: users[0].id },
    }),
    prisma.challenge.create({
      data: { title: 'Challenge 2', description: 'Description du challenge 2', conditions: 'Règles strictes', gameId: 102, gameTitle: "Subway Surfers", gameThumbnail: "https://media.rawg.io/media/screenshots/fb5/fb554f480b9896b031d68ef5ef9937fa.jpeg", userId: users[1].id },
    }),
    prisma.challenge.create({
      data: { title: 'Challenge 3', description: 'Description du challenge 3', conditions: null, gameId: 103, gameTitle: "Trigger Fist", gameThumbnail: "https://media.rawg.io/media/screenshots/097/097898d5a9795ce259af94f8e5add71d_jBo7XvC.jpg", userId: users[2].id },
    }),
    prisma.challenge.create({
      data: { title: 'Challenge 4', description: 'Description du challenge 4', conditions: 'Doit être créatif', gameId: 104, gameTitle: "We Are The Dwarves", gameThumbnail: "https://media.rawg.io/media/screenshots/d2c/d2c7c465091722d1c13f8a5ae8f54bcf.jpg", userId: users[3].id },
    }),
  ]);

  // Création des participations (2 par challenge)
  const participations = [];
  for (const challenge of challenges) {
    const part1 = await prisma.participation.create({
      data: {
        description: `Participation 1 pour ${challenge.title}`,
        videoLink: `https://example.com/${challenge.title}-1.mp4`,
        userId: users[0].id,
        challengeId: challenge.id,
      },
    });
    const part2 = await prisma.participation.create({
      data: {
        description: `Participation 2 pour ${challenge.title}`,
        videoLink: `https://example.com/${challenge.title}-2.mp4`,
        userId: users[1].id,
        challengeId: challenge.id,
      },
    });
    participations.push(part1, part2);
  }

  // Votes sur challenges (chaque utilisateur vote pour chaque challenge)
  for (const user of users) {
    for (const challenge of challenges) {
      await prisma.voteChallenge.create({
        data: {
          rating: Math.floor(Math.random() * 5) + 1, // note aléatoire 1 à 5
          userId: user.id,
          challengeId: challenge.id,
        },
      });
    }
  }

  // Votes sur participations (chaque utilisateur vote pour chaque participation)
  for (const user of users) {
    for (const participation of participations) {
      await prisma.voteParticipation.create({
        data: {
          rating: Math.floor(Math.random() * 5) + 1,
          userId: user.id,
          participationId: participation.id,
        },
      });
    }
  }

  console.log('✅ Seed terminé !');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });