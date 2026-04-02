import { Request, Response } from "express";
import { prisma } from "../db/prisma";
import { getUserByIdService } from "../services/users.service";
import { getLeaderboardService } from "../services/leaderboard.service.js";

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

// récupérer l'utilisateur connecté + ses participations formatées + son rank
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

    // On reformate les participations pour envoyer une réponse plus propre au front
    const formattedParticipations = user.participations.map((participation) => {
      const totalScore = participation.voteParticipations.reduce((sum, vote) => {
        return sum + vote.rating;
      }, 0);

      const averageParticipationScore =
        participation.voteParticipations.length > 0
          ? totalScore / participation.voteParticipations.length
          : 0;

      return {
        id: participation.id,
        description: participation.description,
        videoLink: participation.videoLink,
        participant: user.username,
        createdAt: participation.createdAt.toISOString(),
        averageParticipationScore: Number(averageParticipationScore.toFixed(2)),
      };
    });

    //  on récupère le vrai leaderboard du projet
    // comme ça le rank de /users/me utilise exactement le même calcul
    const leaderboard = await getLeaderboardService();

    // on cherche la ligne du user connecté dans le classement
    const currentUserInLeaderboard = leaderboard.data.find(
      (player) => player.userId === user.id
    );

    // si le user n'est pas classé (par exemple aucun vote), on met null
    const rank = currentUserInLeaderboard ? currentUserInLeaderboard.rank : null;

    return res.status(200).json({
      id: user.id,
      email: user.email,
      username: user.username,
      birthdate: user.birthdate,
      createdAt: user.createdAt,
      rank,
      participations: formattedParticipations,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "error while getting current user",
    });
  }
};