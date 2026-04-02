import { Router } from "express";
import { getLeaderboard } from "../controllers/leaderboard.controller.js";
const router = Router();
// route pour récupérer le leaderboard
// quand quelqu’un appelle GET /api/leaderboard
router.get("/", getLeaderboard);
export default router;
