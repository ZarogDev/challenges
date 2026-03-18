import { Router } from "express";
import {
  getAllChallenges,
  getChallengeById,
  createChallenge
} from "../controllers/challenges.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validateCreationBody } from "../middlewares/challenges.middleware.js";

const router = Router();

// voir tous les challenges
router.get("/", getAllChallenges);

// voir un challenge avec son id
router.get("/:id", getChallengeById);

// créer un challenge
router.post("/", authenticate, validateCreationBody, createChallenge);

export default router;