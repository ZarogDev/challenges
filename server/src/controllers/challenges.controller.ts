import { Request, Response } from "express";
import { prisma } from '../db/prisma';
import { fetchGame } from "../services/rawgio";
import { create, createVoteOnChallenge, getChallenges, getChallengeWithParticipations, getFormattedChallenge } from "../services/challenges.service";
import { parseIntFromParams } from "../lib/utils";

// voir tous les challenges
export async function getAllChallenges(req: Request, res: Response) {
  const { limit, page, search } = req.query;
  
  const parsedLimit = typeof limit === "string" ? parseInt(limit, 10) : undefined;
  const parsedPage = typeof page === "string" ? parseInt(page, 10) : undefined;
  const parsedSearch = search ? typeof search !== "string" ? search.toString() : search : undefined;

  const challenges = await getChallenges(parsedPage, parsedLimit, parsedSearch);

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

export async function voteOnChallenge(req: Request, res: Response) {
  const userId = await parseIntFromParams(req.user.id);
  const challengeId = await parseIntFromParams(req.params.id);
  const { rating } = req.body;

  try {
    const newVote = await createVoteOnChallenge(challengeId, userId, rating);

    if(!newVote.success) {
      return res.status(newVote.status).json({ error: newVote.error });
    }

    return res.status(newVote.status).json(newVote.data);
  } catch (error) {
    if(error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
  }
}
