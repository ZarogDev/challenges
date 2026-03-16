import { Router } from "express";
import {
  getAllChallenges,
  getChallengeById
} from "../controllers/challenge.controller.js";

const router = Router();

// GET /challenges
router.get("/", getAllChallenges);

// GET /challenges/:id
router.get("/:id", getChallengeById);

export default router;