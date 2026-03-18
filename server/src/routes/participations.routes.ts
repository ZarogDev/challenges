import { Router } from "express";

const router = Router();

// créer une participation pour un challenge
router.post("/challenges/:id/participations", (req, res) => {
  res.json({
    message: `create participation for challenge ${req.params.id}`
  });
});

// voir les participations d'un challenge
router.get("/challenges/:id/participations", (req, res) => {
  res.json({
    message: `participations of challenge ${req.params.id}`
  });
});

export default router;