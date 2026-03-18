import prisma from "../db/prisma.js";

// récupérer un utilisateur par son id
export const getUserByIdService = async (id: number) => {
  return await prisma.user.findUnique({
    where: {
      id: id
    }
  });
};