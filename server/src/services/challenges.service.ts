import { IChallengeCreation, IChallengeWithParticipations, IParticipationWithVotes } from '../@types/types';
import { Prisma } from '../db/generated/prisma/client';
import { prisma } from '../db/prisma';

export async function getChallenges(page = 1, limit = 9, search = "") {
  try {
    const where: Prisma.ChallengeWhereInput | undefined = search
      ? {
          OR: [
            {
              title: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              gameTitle: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
        }
      : undefined;

    const [challenges, total] = await Promise.all([
      prisma.challenge.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          creator: {
            select: {
              username: true
            }
          }
        }
      }),
      prisma.challenge.count({ where })
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data: challenges,
      page,
      totalPages,
      total
    };
  } catch (error) {
    console.error("❌ Error fetching challenges :", error);
    return { error: "Internal server error" };
  }
}

export async function create(body: IChallengeCreation, userId: number, gameTitle: string, gameThumbnail: string) {
  try {
    const newChallenge = await prisma.challenge.create({
      data: { 
        ...body,
        userId, 
        gameTitle, 
        gameThumbnail 
      }
    });

    return newChallenge;
  } catch (error) {
    console.error("❌ Error creating challenge :", error);
    return { error: "Internal server error" };
  }
}

export async function getChallengeWithParticipations(id: number) {
  try {
    const challengeWithParticipations = await prisma.challenge.findUnique({
      where: { id },
      include: {
        participations: {
          include: {
            user: {
              select: { 
                id: true, 
                username: true
              }
            },
            voteParticipations: true
          },
        },
        voteChallenges: true,
        creator: { 
          select: { 
            id: true, 
            username: true 
          }
        },
      }
    });

    return challengeWithParticipations;
  } catch (error) {
    console.error("❌ Error fetching challenge with participations :", error);
    return null;
  }
}

export async function getAverageChallengeScore(challenge: IChallengeWithParticipations) {
  return challenge.voteChallenges.length > 0
      ? challenge.voteChallenges.reduce((sum, vote) => sum + vote.rating, 0) / challenge.voteChallenges.length
      : null;
}

export async function getAverageParticipationScore(participation: IParticipationWithVotes) {
  return participation.voteParticipations.length > 0
      ? participation.voteParticipations.reduce((sum, vote) => sum + vote.rating, 0) / participation.voteParticipations.length
      : null;
}

export async function getFormattedChallenge(challengeWithParticipations: IChallengeWithParticipations) {
  const averageChallengeScore = await getAverageChallengeScore(challengeWithParticipations);

  const participations = await Promise.all(challengeWithParticipations.participations.map(async (participation) => {
    const averageParticipationScore = await getAverageParticipationScore(participation);

    return {
      id: participation.id,
      description: participation.description,
      videoLink: participation.videoLink,
      participant: participation.user.username,
      createdAt: participation.createdAt,
      averageParticipationScore
    };
  }));

  return {
    id: challengeWithParticipations.id,
    title: challengeWithParticipations.title,
    description: challengeWithParticipations.description,
    conditions: challengeWithParticipations.conditions,
    gameTitle: challengeWithParticipations.gameTitle,
    gameThumbnail: challengeWithParticipations.gameThumbnail,
    creator: challengeWithParticipations.creator.username,
    createdAt: challengeWithParticipations.createdAt,
    averageChallengeScore,
    participations
  }
};

export async function createVoteOnChallenge(challengeId: number, userId: number, rating: number) {
  const existingVoteOnChallenge = await prisma.voteChallenge.findFirst({
    where: { challengeId, userId }
  });

  if(existingVoteOnChallenge) {
    return { success: false, error: "A user can only vote once for a challenge", status: 409 }
  }
  
  try {
    const newVote = await prisma.voteChallenge.create({
      data: { 
        challengeId,
        userId, 
        rating
      }
    });

    return { success: true, data: newVote, status: 201 };
  } catch (err) {
    console.log(err);
    return { success: false, error: "Internal server error", status: 500 };
  }
}