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

// récupérer l'utilisateur connecté + ses participations
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
        participations: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "error while getting current user",
    });
  }
};