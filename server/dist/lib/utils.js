import z from "zod";
export async function parseIntFromParams(id) {
    return await z.coerce.number().int().min(1).parseAsync(id);
}
