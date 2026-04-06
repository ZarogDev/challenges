import { NextFunction, Request, Response } from "express";
import { validateBody } from "./common.middleware.js";
import z from "zod";

export async function validateCreationBody(req: Request, res: Response, next: NextFunction) {
  const challengeCreationSchema = z.object({
    title: z.string().min(3).max(100),
    description: z.string().max(255),
    conditions: z.string().max(255).optional(),
    gameId: z.coerce.number()
  });

  validateBody(challengeCreationSchema, req, res, next);
}