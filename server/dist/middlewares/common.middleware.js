import z, { ZodError } from "zod";
export async function validateBody(schema, req, res, next) {
    try {
        await schema.parseAsync(req.body);
        next();
    }
    catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({ error: z.prettifyError(error) });
        }
        return res.status(500).json({ error: "Internal server error" });
    }
}
// common to challenges & participations resources
export async function validateVoteBody(req, res, next) {
    const voteOnChallengeSchema = z.object({
        rating: z.number().int().min(1).max(5)
    });
    validateBody(voteOnChallengeSchema, req, res, next);
}
