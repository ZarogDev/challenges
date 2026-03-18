import { Router } from "express";
import { getUserById } from "../controllers/users.controller";

const router = Router();

// note : route pour récupérer un user par son id
// ex : /users/3
router.get("/:id", getUserById);

export default router;