import { Router } from "express";
import challengeRoutes from "./challenges.routes.js";
import leaderboardRoutes from "./leaderboard.routes.js";
import authRouter from "./auth.router.js";

const router = Router();

router.use("/challenges", challengeRoutes);
router.use("/leaderboard", leaderboardRoutes);
router.use('/auth', authRouter);

export default router;