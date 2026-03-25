import xss from "xss";
import { Request, Response, NextFunction } from "express";

// nettoie les strings dans les objets, tableaux...
function sanitizeData(data: unknown): unknown {
  if (typeof data === "string") {
    return xss(data);
  }

  if (Array.isArray(data)) {
    return data.map((item) => sanitizeData(item));
  }

  if (data && typeof data === "object") {
    const sanitizedObject: Record<string, unknown> = {};

    for (const key in data as Record<string, unknown>) {
      sanitizedObject[key] = sanitizeData((data as Record<string, unknown>)[key]);
    }

    return sanitizedObject;
  }

  return data;
}

// middleware global pour nettoyer body, query et params
export function sanitizeXss(req: Request, _res: Response, next: NextFunction) {
  if (req.body) {
    req.body = sanitizeData(req.body);
  }

  if (req.query) {
    req.query = sanitizeData(req.query) as Request["query"];
  }

  if (req.params) {
    req.params = sanitizeData(req.params) as Request["params"];
  }

  next();
}