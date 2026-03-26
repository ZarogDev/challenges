import { Router } from "express";
import { createParticipation, getChallengeParticipations, voteOnParticipation } from "../controllers/participation.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { validateVoteBody } from "../middlewares/common.middleware";
import { checkIfUserAlreadyVotedOnParticipation } from "../controllers/participation.controller";
const router = Router();

// créer une participation pour un challenge
router.post("/challenges/:id/participations", authenticate, createParticipation);

// voir les participations d'un challenge
router.get("/challenges/:id/participations", getChallengeParticipations);

// voter pour un challenge
router.post("/participations/:id/votes", authenticate, validateVoteBody, voteOnParticipation);
// check si user a déjà voté pour une participation
router.get(
  "/participations/:id/votes/me",
  authenticate,
  checkIfUserAlreadyVotedOnParticipation
);


export default router;