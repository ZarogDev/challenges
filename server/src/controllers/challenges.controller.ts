import { Request, Response } from "express";
import { prisma } from '../db/prisma';
import { fetchGame } from "../services/rawgio";
import { create, getChallenges, getChallengeWithParticipations, getFormattedChallenge } from "../services/challenges.service";

// voir tous les challenges
export async function getAllChallenges(req: Request, res: Response) {
  const { limit } = req.query;
  
  const parsedLimit = typeof limit === "string" ? parseInt(limit, 10) : undefined;

  const challenges = await getChallenges(parsedLimit);

  res.json(challenges);
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
      include: {
        creator: {
          select: {
            username: true
          }
        }
      }
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
  const userId = parseInt(req.user.id, 10);

  const game = await fetchGame(req.body.gameId);

  if (!game.ok) {
    return res.status(400).json({ error: game.message });
  }

  const newChallenge = await create(req.body, userId, game.data.name, game.data.background_image);

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

  const challengeWithParticipations = await getChallengeWithParticipations(parsedId);

  if(!challengeWithParticipations) {
    return res.status(404).json({ error: "Challenge not found" });
  }

  const formatedChallenge = await getFormattedChallenge(challengeWithParticipations);

  res.json(formatedChallenge);
};
