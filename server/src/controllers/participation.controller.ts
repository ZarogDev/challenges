import { Request, Response } from "express";
import { createParticipationSchema } from "../validators/participation.validator.js";
import { prisma } from "../db/prisma.js";
import { parseIntFromParams } from "../lib/utils.js";
import { createVoteOnParticipation } from "../services/participations.service.js";

export const createParticipation = async (req: Request, res: Response) => {
  try {
    const challengeId = Number(req.params.id);

    // vérifier que l'id est valide
    if (isNaN(challengeId)) {
      return res.status(400).json({
        message: "Id du challenge invalide",
      });
    }

    // validation avec Zod
    const result = createParticipationSchema.safeParse(req.body);

    if (!result.success) {
      // on transforme les erreurs avec map (remplace flatten)
      const errors = result.error.issues.map((issue) => ({
        field: issue.path[0],
        message: issue.message,
      }));

      return res.status(400).json({
        message: "Données invalides",
        errors,
      });
    }

    const { description, videoLink } = result.data;

    // récupérer l'utilisateur connecté
    const user = (req as Request & { user?: { id: string } }).user;

    if (!user) {
      return res.status(401).json({
        message: "Utilisateur non authentifié",
      });
    }

    // vérifier que le challenge existe
    const challenge = await prisma.challenge.findUnique({
      where: { id: challengeId },
    });

    if (!challenge) {
      return res.status(404).json({
        message: "Challenge introuvable",
      });
    }

    // créer la participation
    const participation = await prisma.participation.create({
      data: {
        description,
        videoLink,
        userId: Number(user.id), // important car id est string dans le token
        challengeId: challengeId,
      },
    });

    return res.status(201).json({
      message: "Participation créée avec succès",
      participation,
    });
  } catch (error) {
    console.error("Erreur createParticipation :", error);

    return res.status(500).json({
      message: "Erreur serveur lors de la création de la participation",
    });
  }
};

export const getChallengeParticipations = async (req: Request, res: Response) => {
  try {
    const challengeId = Number(req.params.id);

    if (isNaN(challengeId)) {
      return res.status(400).json({
        message: "Id du challenge invalide",
      });
    }

    const participations = await prisma.participation.findMany({
      where: {
        challengeId: challengeId,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      message: "Participations récupérées avec succès",
      participations,
    });
  } catch (error) {
    console.error("Erreur getChallengeParticipations :", error);

    return res.status(500).json({
      message: "Erreur serveur lors de la récupération des participations",
    });
  }
};

export async function voteOnParticipation(req: Request, res: Response) {
  const userId = await parseIntFromParams(req.user.id);
  const participationId = await parseIntFromParams(req.params.id);
  const { rating } = req.body;

  try {
    const newVote = await createVoteOnParticipation(participationId, userId, rating);

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

// vérifier si user a déjà voté pour une participation
export async function checkIfUserAlreadyVotedOnParticipation(req: Request, res: Response) {
  try {
    // je récupère l'id du user connecté
    const userId = Number(req.user?.id);

    // je récupère l'id de la participation dans l'url
    const participationId = Number(req.params.id);

    // sécurité si pas connecté
    if (!userId) {
      return res.status(401).json({
        message: "unauthorized",
      });
    }

    // je cherche si un vote existe déjà
    const vote = await prisma.voteParticipation.findFirst({
      where: {
        userId: userId,
        participationId: participationId,
      },
    });

    // je retourne true ou false
    return res.status(200).json({
      hasVoted: !!vote,
    });

  } catch (error) {
    console.error("error while checking participation vote:", error);

    return res.status(500).json({
      message: "error while checking vote",
    });
  }
}