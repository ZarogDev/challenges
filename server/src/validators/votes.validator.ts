import z from "zod";

export const createVoteSchema = z.object({
  rating: z.coerce.number().int().min(1).max(5)
});