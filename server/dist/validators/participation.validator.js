import z from "zod";
export const createParticipationSchema = z.object({
    description: z
        .string()
        .min(3, "La description doit contenir au moins 3 caractères")
        .max(500, "La description ne doit pas dépasser 500 caractères"),
    videoLink: z
        .string()
        .url("Le lien vidéo doit être une URL valide"),
});
