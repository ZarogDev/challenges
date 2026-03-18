import { prisma } from "../db/prisma";

// note : ici je fais le service qui va chercher le user en base
export const getUserByIdService = async (id: number) => {
  return await prisma.user.findUnique({
    where: {
      // note : je cherche le user avec son id
      id: id,
    },

    // note : très important
    // je mets select pour NE PAS renvoyer tout l'objet user
    // sinon je risque de renvoyer aussi le password et d'autres infos sensibles
    // donc je choisis seulement les champs utiles pour le profil
    select: {
      id: true,
      username: true,
      email: true, // note : à enlever si on ne veut pas afficher l'email dans le profil public
      createdAt: true,

      
    },
  });
};