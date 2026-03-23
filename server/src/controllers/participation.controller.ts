import { Request, Response } from "express";
import { createParticipationSchema } from "../validators/participation.validator";
import { prisma } from "../db/prisma";

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