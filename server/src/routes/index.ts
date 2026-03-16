import { Router } from "express";
import challengeRoutes from "./challenge.routes.js";
import leaderboardRoutes from "./leaderboard.routes.js";

const router = Router();

router.use("/challenges", challengeRoutes);
router.use("/leaderboard", leaderboardRoutes);

export default router;