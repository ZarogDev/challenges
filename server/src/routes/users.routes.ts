import { Router } from "express";
import { getUserById } from "../controllers/users.controller";

const router = Router();

// récupérer un utilisateur par son id
router.get("/:id", getUserById);

export default router;