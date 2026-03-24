import { Router } from "express";
import { getUserById, getMe } from "../controllers/users.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

// note : route pour récupérer le user connecté
// ex : /users/me
router.get("/me", authenticate, getMe);

// note : route pour récupérer un user par son id
// ex : /users/3
router.get("/:id", getUserById);

export default router;