import { Router } from "express";
import authRoutes from "./auth.router.js";
import challengesRoutes from "./challenges.routes.js";
import leaderboardRoutes from "./leaderboard.routes.js";
import usersRoutes from "./users.routes.js";
import participationsRoutes from "./participations.routes.js";
// import votesRoutes from "./votes.routes.js";

const router = Router();

// auth
router.use("/auth", authRoutes);

// challenges
router.use("/challenges", challengesRoutes);

// leaderboard
router.use("/leaderboard", leaderboardRoutes);

// users
router.use("/users", usersRoutes);

// participations et votes
// => votesRoutes à retirer, pas RESTful
// => participationsRoutes doit être utilisé sur les routes /participations
router.use("/", participationsRoutes);
// router.use("/", votesRoutes);

export default router;