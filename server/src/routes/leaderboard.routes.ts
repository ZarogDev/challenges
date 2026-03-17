import { Router } from "express";

const router = Router();

// voir le leaderboard
router.get("/", (req, res) => {
  res.json({
    message: "leaderboard"
  });
});

export default router;