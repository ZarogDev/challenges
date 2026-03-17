import { Request, Response } from "express";
import { prisma } from '../db/prisma';

// pour voir tous les challenges
export const getAllChallenges = async (req: Request, res: Response) => {
  try {
    const challenges = await prisma.challenge.findMany();
    res.json(challenges);
  } catch (error) {
    console.error("❌ Error fetching challenges :", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// TODO pour voir un challenge avec son id
export const getChallengeById = async (req: Request, res: Response) => {
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