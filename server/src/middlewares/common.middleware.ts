import { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod";

export async function validateBody(schema: ZodObject, req: Request, res: Response, next: NextFunction) {
  try {
    await schema.parseAsync(req.body);
    next();
  } catch (error) {
    if(!(error instanceof Error)) {
      return res.status(500).json({ error: 'Erreur de validation inconnue' });
    }

    res.status(400).json({ error: error.message });
  }
}