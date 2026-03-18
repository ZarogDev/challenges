import prisma from "../db/prisma.js";

// je récupère les votes sur les participations
// puis je fais le classement des joueurs
export const getLeaderboardService = async () => {
  const votes = await prisma.vote_participation.findMany({
    include: {
      user: true,
      participation: {
        include: {
          user: true
        }
      }
    }
  });

  // objet pour stocker les scores par joueur
  const scores: Record<number, {
    userId: number;
    username: string;
    totalScore: number;
    voteCount: number;
  }> = {};

  for (const vote of votes) {
    const player = vote.participation.user;

    if (!scores[player.id]) {
      scores[player.id] = {
        userId: player.id,
        username: player.username,
        totalScore: 0,
        voteCount: 0
      };
    }

    scores[player.id].totalScore += vote.rating;
    scores[player.id].voteCount += 1;
  }

  // je transforme l'objet en tableau
  const leaderboard = Object.values(scores);

  // je trie du plus grand score au plus petit
  leaderboard.sort((a, b) => b.totalScore - a.totalScore);

  // j'ajoute le rang
  return leaderboard.map((player, index) => ({
    rank: index + 1,
    userId: player.userId,
    username: player.username,
    totalScore: player.totalScore,
    voteCount: player.voteCount
  }));
};