import { Router } from "express";
import { createParticipation, getChallengeParticipations } from "../controllers/participation.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

// créer une participation pour un challenge
router.post("/challenges/:id/participations", authenticate, createParticipation);

// voir les participations d'un challenge
router.get("/challenges/:id/participations", getChallengeParticipations);

export default router;