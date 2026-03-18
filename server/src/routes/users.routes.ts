import { Router } from "express";

const router = Router();

// voir le profil d'un user
router.get("/:id", (req, res) => {
  res.json({
    message: `user profile ${req.params.id}`
  });
});

// voir les participations d'un user
router.get("/:id/participations", (req, res) => {
  res.json({
    message: `participations of user ${req.params.id}`
  });
});

export default router;