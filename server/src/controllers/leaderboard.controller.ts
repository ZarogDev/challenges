import { Request, Response } from "express";
import { getLeaderboardService } from "../services/leaderboard.service.js";

// controller pour récupérer le classement
export const getLeaderboard = async (req: Request, res: Response) => {
  try {
    // je vais chercher le classement
    const leaderboard = await getLeaderboardService();

    // j'envoie la réponse au front
    return res.status(200).json({
      message: "leaderboard loaded",
      data: leaderboard
    });
  } catch (error) {
    console.error("error while getting leaderboard:", error);

    return res.status(500).json({
      message: "error while getting leaderboard"
    });
  }
};