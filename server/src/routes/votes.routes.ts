import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { checkIfUserAlreadyVotedOnChallenge } from "../controllers/challenges.controller";

const router = Router();

// vérifier si le user connecté a déjà voté pour un challenge
router.get("/challenges/:id/votes/me", authenticate, checkIfUserAlreadyVotedOnChallenge);

export default router;