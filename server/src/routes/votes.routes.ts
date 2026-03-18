import { Router } from "express";

const router = Router();

// voter pour un challenge
router.post("/challenges/:id/votes", (req, res) => {
  res.json({
    message: `vote for challenge ${req.params.id}`
  });
});

// voter pour une participation
router.post("/participations/:id/votes", (req, res) => {
  res.json({
    message: `vote for participation ${req.params.id}`
  });
});

export default router;