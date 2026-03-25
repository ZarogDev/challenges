import { Request, Response } from "express";
import { prisma } from "../db/prisma";
import { getUserByIdService } from "../services/users.service";

// récupérer un user par son id
export const getUserById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        message: "invalid user id",
      });
    }

    const user = await getUserByIdService(id);

    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "error while getting user",
    });
  }
};

// récupérer l'utilisateur connecté + ses participations (formatées)
export const getMe = async (req: Request, res: Response) => {
  try {
    const id = Number(req.user?.id);

    if (!id) {
      return res.status(401).json({
        message: "unauthorized",
      });
    }

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        username: true,
        birthdate: true,
        createdAt: true,
        participations: {
          select: {
            id: true,
            description: true,
            videoLink: true,
            createdAt: true,
            voteParticipations: {
              select: {
                rating: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    // ici on transforme les participations
    const formattedParticipations = user.participations.map((p) => {
      const total = p.voteParticipations.reduce((sum, v) => sum + v.rating, 0);

      const average =
        p.voteParticipations.length > 0
          ? total / p.voteParticipations.length
          : 0;

      return {
        id: p.id,
        description: p.description,
        videoLink: p.videoLink,
        participant: user.username, // username du user
        createdAt: p.createdAt.toISOString(), // en string
        averageParticipationScore: average,
      };
    });

    return res.status(200).json({
      id: user.id,
      email: user.email,
      username: user.username,
      birthdate: user.birthdate,
      createdAt: user.createdAt,
      participations: formattedParticipations,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "error while getting current user",
    });
  }
};