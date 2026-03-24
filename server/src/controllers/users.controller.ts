import { prisma } from "../db/prisma";

// récupère l'utilisateur connecté grâce au token
export const getMe = async (req: Request, res: Response) => {
  try {
    //id vient du middleware auth
    const id = Number(req.user?.id);

    // si pas d'id dans le token, on refuse
    if (!id) {
      return res.status(401).json({
        message: "unauthorized",
      });
    }

    // note : on va chercher le user connecté + ses participations
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

    //  si jamais le user n'existe pas / plus
    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    // on renvoie le user connecté + ses participations
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "error while getting current user",
    });
  }
};