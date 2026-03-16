import { Request, Response } from "express";

// pour voir tous les challenges
export const getAllChallenges = (req: Request, res: Response) => {
  // plus tard on mettra la BDD ici
  res.json({
    message: "liste des challenges"
  });
};

// pour voir un challenge avec son id
export const getChallengeById = (req: Request, res: Response) => {
  const { id } = req.params;

  res.json({
    message: `challenge ${id}`
  });
};