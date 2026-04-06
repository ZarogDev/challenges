import { prisma } from "../db/prisma.js";

// je récupère les votes sur les participations
// puis je fais le classement des joueurs
export const getLeaderboardService = async (page = 1, limit = 24) => {
  const votes = await prisma.voteParticipation.findMany({
    include: {
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

    // j'additionne les notes
    scores[player.id].totalScore += vote.rating;

    // je compte les votes
    scores[player.id].voteCount += 1;
  }

  // je transforme l'objet en tableau
  const leaderboard = Object.values(scores);

  // je trie avec une moyenne pondérée
  leaderboard.sort((a, b) => {

    // moyenne classique
    const avgA = a.voteCount === 0 ? 0 : a.totalScore / a.voteCount;
    const avgB = b.voteCount === 0 ? 0 : b.totalScore / b.voteCount;

    // moyenne pondérée
    // classement basé sur les votes des joueurs (nombre de votes + note sur 5)
    // le score part de la moyenne des notes et on applique un coefficient(de fiabilité) : (votes / (votes + 5))
    // peu de votes --> moyenne réduite
    // beaucoup de votes --> moyenne presque inchangée
    // ça rend le classement plus fiable et prend bien en compte les 2paramètres

    const scoreA = avgA * (a.voteCount / (a.voteCount + 5));
    const scoreB = avgB * (b.voteCount / (b.voteCount + 5));

    return scoreB - scoreA;
  });

  // j'ajoute le rang + infos
  const formattedLeaderboard = leaderboard.map((player, index) => {

    const average = player.voteCount === 0
      ? 0
      : player.totalScore / player.voteCount;

    // même calcul ici pour l'afficher
    const weightedScore = player.voteCount === 0
      ? 0
      : average * (player.voteCount / (player.voteCount + 5));

    return {
      rank: index + 1,
      userId: player.userId,
      username: player.username,
      totalScore: player.totalScore,
      voteCount: player.voteCount,
      averageScore: Number(average.toFixed(2)),

      // score ajusté avec le nombre de votes
      weightedScore: Number(weightedScore.toFixed(2))
    };
  });

  const start = (page - 1) * limit;
  const end = start + limit;

  const paginatedLeaderboard = formattedLeaderboard.slice(start, end);
  const totalPages = Math.ceil(formattedLeaderboard.length / limit);

  return {
    data: paginatedLeaderboard,
    page,
    totalPages,
    total: formattedLeaderboard.length
  }
};