import z from 'zod';
export const registerSchema = z.object({
    email: z.email(),
    username: z.string().min(3).max(20),
    password: z.string().min(6),
    password_confirm: z.string().min(6),
    birthdate: z.string().refine((date) => {
        const parsedDate = new Date(date);
        return !isNaN(parsedDate.getTime());
    }, { message: 'Invalid date format' }),
});
export const loginSchema = z.object({
    email: z.email({ pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }),
    password: z.string().min(6)
});
