import z from "zod";

export async function parseIntFromParams(id: unknown) {
  return await z.coerce.number().int().min(1).parseAsync(id);
}