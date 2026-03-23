import z, { ZodError } from "zod";

// ✅ Récupère les deux premières lettres du username
export const getInitials = (username: string): string => {
  return username.charAt(0).toUpperCase();
};

// ✅ Couleur unique par username pour différencier les avatars
export const getAvatarColor = (username: string): string => {
  const colors = [
    'rgba(0, 212, 255, 0.15)',   // cyan
    'rgba(255, 58, 58, 0.15)',   // rouge
    'rgba(168, 85, 247, 0.15)',  // violet
    'rgba(255, 215, 0, 0.15)',   // or
  ];
  // const borderColors = [
  //   '#00d4ff',
  //   '#ff3a3a',
  //   '#a855f7',
  //   '#FFD700',
  // ];
  const index = username.charCodeAt(0) % colors.length;
  return colors[index];
};

export const getAvatarBorder = (username: string): string => {
  const borderColors = [
    '#00d4ff',
    '#ff3a3a',
    '#a855f7',
    '#FFD700',
  ];
  const index = username.charCodeAt(0) % borderColors.length;
  return borderColors[index];
};

export const getInitialColor = (username: string): string => {
  const textColors = [
    '#00d4ff',
    '#ff3a3a',
    '#a855f7',
    '#FFD700',
  ];
  const index = username.charCodeAt(0) % textColors.length;
  return textColors[index];
};

export async function isValidRegister(username: string, email: string, password: string, password_confirm: string, birthdate: string): Promise<{ valid: boolean; messages?: {
    [x: string]: string;
}[] }> {

  const registerSchema = z.object({
    username: z.string().min(3, "Le nom d'utilisateur doit contenir au moins 3 caractères").max(20, "Le nom d'utilisateur ne peut pas dépasser 20 caractères"),
    email: z.email("Veuillez entrer une adresse email valide"),
    password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères").max(50, "Le mot de passe ne peut pas dépasser 50 caractères"),
    password_confirm: z.string(),
    birthdate: z.string().refine((date) => {
      const birthDate = new Date(date);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      return age >= 15 && birthDate <= today;
    }, "Vous devez avoir au moins 15 ans pour vous inscrire"),
  }).refine((data) => data.password === data.password_confirm, {
    message: "Les mots de passe doivent être identiques",
    path: ["password_confirm"],
  });

  try {
    registerSchema.parse({ username, email, password, password_confirm, birthdate });
    return { valid: true };
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = error.issues;

      const messages = errors.map(err => ({[err.path[0]]: err.message}));

      return { valid: false, messages };
    }

    return { valid: false, messages: [{ global: "Une erreur inconnue est survenue"}] };
  }
}