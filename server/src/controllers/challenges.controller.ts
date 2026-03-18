import { Request, Response } from "express";
import { prisma } from '../db/prisma';
import { fetchGame } from "../services/rawgio";

// voir tous les challenges
export async function getAllChallenges(req: Request, res: Response) {
  try {
    const challenges = await prisma.challenge.findMany();
    res.json(challenges);
  } catch (error) {
    console.error("❌ Error fetching challenges :", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// voir un challenge avec son id
export async function getChallengeById(req: Request, res: Response) {
  const { id } = req.params;
  if(typeof id !== "string") {
    return res.status(400).json({ error: "Invalid challenge ID" });
  }

  const parseId = parseInt(id, 10);
  if (isNaN(parseId)) {
    return res.status(400).json({ error: "Challenge ID must be a number" });
  }

  try {
    const challenge = await prisma.challenge.findUnique({
      where: { id: parseId },
    });

    if (!challenge) {
      return res.status(404).json({ error: "Challenge not found" });
    }

    res.json(challenge);
  } catch (error) {
    console.error("❌ Error fetching challenge :", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// créer un challenge
export async function createChallenge(req: Request, res: Response) {
  const userId = req.user.id;

  const game = await fetchGame(req.body.gameId);

  if (!game.ok) {
    return res.status(400).json({ error: game.message });
  }

  const newChallenge = await prisma.challenge.create({
    data: { ...req.body, userId, gameTitle: game.data.name, gameThumbnail: game.data.background_image }
  });

  return res.status(201).json(newChallenge);
}

// voir les participations d'un challenge avec son id
export async function getChallengeParticipations(req: Request, res: Response) {
  const { id } = req.params;

  if(typeof id !== "string") {
    return res.status(400).json({ error: "Invalid challenge ID" });
  }

  const parsedId = parseInt(id, 10);

  if (isNaN(parsedId)) {
    return res.status(400).json({ error: "Challenge ID must be a number" });
  }

  try {
    const challengeWithParticipations = await prisma.challenge.findUnique({
      where: { id: parsedId },
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

    if(!challengeWithParticipations) {
      return res.status(404).json({ error: "Challenge not found" });
    }

    const averageChallengeScore = challengeWithParticipations.voteChallenges.length > 0
      ? challengeWithParticipations.voteChallenges.reduce((sum, vote) => sum + vote.rating, 0) / challengeWithParticipations.voteChallenges.length
      : null;

    const participations = challengeWithParticipations.participations.map(participation => {
      const averageParticipationScore = participation.voteParticipations.length > 0
        ? participation.voteParticipations.reduce((sum, vote) => sum + vote.rating, 0) / participation.voteParticipations.length
        : null;
      return {
        id: participation.id,
        description: participation.description,
        videoLink: participation.videoLink,
        participant: participation.user.username,
        createdAt: participation.createdAt,
        averageParticipationScore
      };
    });

    const formatedChallenge = {
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
    };

    res.json(formatedChallenge);
  } catch (error) {
    console.error("❌ Error fetching challenge participations :", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
