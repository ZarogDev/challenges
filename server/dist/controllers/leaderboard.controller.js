import { getLeaderboardService } from "../services/leaderboard.service.js";
// controller pour récupérer le classement
export const getLeaderboard = async (req, res) => {
    const { limit, page } = req.query;
    const parsedLimit = typeof limit === "string" ? parseInt(limit, 10) : undefined;
    const parsedPage = typeof page === "string" ? parseInt(page, 10) : undefined;
    try {
        // je récupère le classement (calcul déjà fait dans le service)
        const leaderboard = await getLeaderboardService(parsedPage, parsedLimit);
        // j'envoie au front
        return res.status(200).json(leaderboard);
    }
    catch (error) {
        console.error("error while getting leaderboard:", error);
        return res.status(500).json({
            message: "error while getting leaderboard"
        });
    }
};
