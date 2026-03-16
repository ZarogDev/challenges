import { Router } from "express";
import {
  getAllChallenges,
  getChallengeById
} from "../controllers/challenges.controller.js";

const router = Router();

// voir tous les challenges
router.get("/", getAllChallenges);

// voir un challenge avec son id
router.get("/:id", getChallengeById);

export default router;