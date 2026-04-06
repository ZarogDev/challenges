import { prisma } from "../db/prisma.js";

export async function createVoteOnParticipation(participationId: number, userId: number, rating: number) {
  const existingVoteOnParticipation = await prisma.voteParticipation.findFirst({
    where: { participationId, userId }
  });

  if(existingVoteOnParticipation) {
    return { success: false, error: "A user can only vote once for a participation", status: 400 }
  }
  
  try {
    const newVote = await prisma.voteParticipation.create({
      data: { 
        participationId,
        userId, 
        rating
      }
    });

    return { success: true, data: newVote, status: 201 };
  } catch {
    return { success: false, error: "Internal server error", status: 500 };
  }
}