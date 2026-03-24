import type { NextFunction, Request, Response } from "express";
import z from "zod";
import { HttpClientError } from "../lib/errors";

// eslint-disable-next-line
export function globalErrorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
  // si erreur Zod => erreur de validation, status 400
  if (error instanceof z.ZodError) return res.status(400).json({ status: 400, error: z.prettifyError(error) });

  // si erreur qui vient de la classe HttpClientError => erreur spécifique avec status associé
  if (error instanceof HttpClientError) return res.status(error.status).json({ status: error.status, error: error.message });

  return res.status(500).json({ error: 'Internal server error', status: 500 });
}