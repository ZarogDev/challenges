import { Request, Response } from "express";
import { getUserByIdService } from "../services/users.service";

// controller pour récupérer un user
export const getUserById = async (req: Request, res: Response) => {
  try {
    // je récupère l'id dans l'url
    const id = Number(req.params.id);

    // j'appelle le service
    const user = await getUserByIdService(id);

    // si user n'existe pas
    if (!user) {
      return res.status(404).json({
        message: "user not found"
      });
    }

    // sinon je renvoie le user
    return res.status(200).json(user);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "error while getting user"
    });
  }
};