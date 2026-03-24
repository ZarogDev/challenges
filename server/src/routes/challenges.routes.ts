import { Router } from "express";
import {
  getAllChallenges,
  getChallengeById,
  createChallenge,
  getChallengeParticipations,
  voteOnChallenge
} from "../controllers/challenges.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validateCreationBody } from "../middlewares/challenges.middleware.js";
import { validateVoteBody } from "../middlewares/common.middleware.js";

const router = Router();

// récupérer tous les challenges
router.get("/", getAllChallenges);

// récupérer un challenge avec son id
router.get("/:id", getChallengeById);

// récupérer les participations d'un challenge avec son id
router.get("/:id/participations", getChallengeParticipations);

// créer un challenge
router.post("/", authenticate, validateCreationBody, createChallenge);

// voter pour un challenge
router.post("/:id/votes", authenticate, validateVoteBody, voteOnChallenge);

export default router;