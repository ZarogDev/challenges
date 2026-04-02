import { prisma } from '../prisma';
import argon2 from 'argon2';
import { faker } from "@faker-js/faker";
import { fetchGame } from '../../services/rawgio';
async function createRandomUser() {
    return {
        email: faker.internet.email(),
        username: faker.internet.username(),
        password: await argon2.hash(faker.internet.password()),
        birthdate: faker.date.birthdate()
    };
}
async function createRandomChallenge(usersArray) {
    const titles = [
        'Terminer sans mourir',
        'Speedrun',
        '100% complétion',
        'No damage',
        'Only headshots',
        'Sans équipement',
        'Mode hardcore',
        'Aucune amélioration',
        'Run pacifiste',
        'Sans utiliser de soins',
        'Full stealth',
        'Sans HUD',
        'Mode réaliste',
        'Armes de base uniquement',
        'Sans checkpoints',
        'Permadeath',
        'Run aveugle',
        'Sans compétences',
        'Aucun tir manqué',
        'Objectif secret uniquement',
        'Run minimaliste',
        'Aucune armure',
        'Sans sprint',
        'Un seul type d\'arme',
        'No hit run',
        'Temps limité',
        'Run inversé',
        'Sans carte',
        'Sans sauvegarde',
        'Run solo extrême',
        'Aucune aide externe',
        'Run en une seule session',
        'Sans dégâts critiques',
        'Mode survie extrême',
        'Objectifs secondaires uniquement',
        'Sans mourir en boss',
        'Run aléatoire',
        'Sans loot',
        'Inventaire limité',
        'Sans compétences actives',
        'Run silencieux total',
        'Mode chaos',
        'Sans viser',
        'Armes aléatoires',
        'Sans interface',
        'Run défi ultime',
        'Sans amélioration d\'arme',
        'Mode vitesse extrême',
        'Sans esquive',
        'Run expert'
    ];
    const { game } = await getValidGame();
    return {
        title: faker.helpers.arrayElement(titles),
        description: faker.lorem.paragraph(),
        conditions: faker.datatype.boolean()
            ? `Difficulté ${faker.helpers.arrayElement(['facile', 'normale', 'hardcore'])}`
            : null,
        gameId: game.id,
        gameTitle: game.name,
        gameThumbnail: game.background_image || "",
        userId: faker.helpers.arrayElement(usersArray).id
    };
}
async function getValidGame(maxRetries = 10) {
    let attempts = 0;
    while (attempts < maxRetries) {
        const fakeId = faker.number.int({ min: 1, max: 50000 });
        const res = await fetchGame(fakeId);
        if (res.ok && res.data) {
            return { game: res.data };
        }
        attempts++;
    }
    throw new Error(`Impossible de récupérer un jeu valide après ${attempts} tentatives`);
}
async function getValidVideoUrl(gameTitle, maxResults = 1, index = 0) {
    const apiKey = process.env.YOUTUBE_API_KEY;
    const query = encodeURIComponent(`${gameTitle} gameplay`);
    const url = `https://www.googleapis.com/youtube/v3/search?type=video&maxResults=${maxResults}&q=${query}&key=${apiKey}&order=viewCount`;
    const res = await fetch(url);
    const data = await res.json();
    if (!data.items)
        return "https://www.youtube.com/watch?v=DJFm06njNS4";
    return `https://www.youtube.com/watch?v=${data.items[index].id.videoId}`;
}
async function createRandomParticipation(userId, challengeId, gameTitle, count, index) {
    const videoLink = await getValidVideoUrl(gameTitle, count, index);
    return {
        description: faker.lorem.paragraph(),
        videoLink,
        userId,
        challengeId
    };
}
async function main() {
    console.log('🌱 Seeding...');
    // Clean DB
    await prisma.voteParticipation.deleteMany();
    await prisma.voteChallenge.deleteMany();
    await prisma.participation.deleteMany();
    await prisma.challenge.deleteMany();
    await prisma.user.deleteMany();
    console.log('🧹 Database cleaned');
    // USERS (100)
    const fakeUsers = await Promise.all(faker.helpers.multiple(createRandomUser, { count: 100 }));
    const users = await prisma.user.createManyAndReturn({ data: fakeUsers });
    console.log('✅ Users:', users.length);
    // CHALLENGES (50)
    const fakeChallenges = await Promise.all(faker.helpers.multiple(() => createRandomChallenge(users), { count: 50 }));
    const challenges = await prisma.challenge.createManyAndReturn({ data: fakeChallenges });
    console.log('✅ Challenges:', challenges.length);
    // PARTICIPATIONS (1 to 6 per challenge)
    const participations = [];
    for (const challenge of challenges) {
        const count = faker.number.int({ min: 1, max: 6 });
        const shuffledUsers = [...users].sort(() => 0.5 - Math.random());
        for (let i = 0; i < count; i++) {
            const fakeParticipation = await createRandomParticipation(shuffledUsers[i].id, challenge.id, challenge.gameTitle, count, i);
            const participation = await prisma.participation.create({
                data: fakeParticipation
            });
            participations.push(participation);
        }
    }
    console.log('✅ Participations:', participations.length);
    // CHALLENGES VOTES (1 user = 1 vote per challenge - max 10 votes per challenge)
    const challengesVotes = [];
    for (const challenge of challenges) {
        const voteCount = faker.number.int({ min: 1, max: 10 });
        const shuffledUsers = [...users].sort(() => 0.5 - Math.random());
        const voters = shuffledUsers.slice(0, voteCount);
        for (const user of voters) {
            const vote = await prisma.voteChallenge.create({
                data: {
                    rating: faker.number.int({ min: 1, max: 5 }),
                    userId: user.id,
                    challengeId: challenge.id,
                },
            });
            challengesVotes.push(vote);
        }
    }
    console.log('✅ Challenges votes: ', challengesVotes.length);
    // PARTICIPATIONS VOTES (1 user = 1 vote per participation - max 10 votes per participation)
    const participationsVotes = [];
    for (const participation of participations) {
        const voteCount = faker.number.int({ min: 1, max: 10 });
        const shuffledUsers = [...users].sort(() => 0.5 - Math.random());
        const voters = shuffledUsers.slice(0, voteCount);
        for (const user of voters) {
            const vote = await prisma.voteParticipation.create({
                data: {
                    rating: faker.number.int({ min: 1, max: 5 }),
                    userId: user.id,
                    participationId: participation.id,
                },
            });
            participationsVotes.push(vote);
        }
    }
    console.log('✅ Participations votes: ', participationsVotes.length);
    console.log('🌱 Seed terminé !');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
