import { Router } from "express";

const router = Router();

// voir tous les challenges
router.get("/", (req, res) => {
  res.json({
    message: "liste des challenges"
  });
});

// voir un challenge par id
router.get("/:id", (req, res) => {
  res.json({
    message: `challenge ${req.params.id}`
  });
});

export default router;