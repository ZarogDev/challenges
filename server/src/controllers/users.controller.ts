import { Request, Response } from "express";
import { getUserByIdService } from "../services/users.service";

// note : controller = récupère l'id dans l'url puis appelle le service
export const getUserById = async (req: Request, res: Response) => {
  try {
    // note : je récupère l'id depuis l'url
    const id = Number(req.params.id);

    // note : sécurité simple
    // si l'id n'est pas un nombre, je bloque direct
    if (isNaN(id)) {
      return res.status(400).json({
        message: "invalid user id",
      });
    }

    // note : j'appelle le service pour aller chercher le user
    const user = await getUserByIdService(id);

    // note : si aucun user trouvé avec cet id
    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    // note : ici je renvoie le user
    // mais seulement les champs choisis dans le select
    // donc normalement pas de password, pas de données sensibles
    return res.status(200).json(user);
  } catch (error) {
    // note : si bug serveur
    console.error(error);

    return res.status(500).json({
      message: "error while getting user",
    });
  }
};