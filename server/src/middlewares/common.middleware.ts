import { NextFunction, Request, Response } from "express";
import z, { ZodError, ZodObject } from "zod";

export async function validateBody(schema: ZodObject, req: Request, res: Response, next: NextFunction) {
  try {
    await schema.parseAsync(req.body);
    next();
  } catch (error) {
    if(error instanceof ZodError) {
      return res.status(400).json({ error: z.prettifyError(error) });
    }

    return res.status(500).json({ error: "Internal server error" });
  }
}