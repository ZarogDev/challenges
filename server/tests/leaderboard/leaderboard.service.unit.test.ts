import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { prisma } from "../../src/db/prisma.js";
import { getLeaderboardService } from "../../src/services/leaderboard.service.js";

// type simple pour représenter les votes utilisés dans nos tests
type VoteWithUser = {
  rating: number;
  participation: {
    user: {
      id: number;
      username: string;
    };
  };
};

describe("getLeaderboardService", () => {
  beforeEach(() => {
    // on nettoie l'historique des mocks avant chaque test
    vi.clearAllMocks();
  });

  afterEach(() => {
    // on remet les spyOn à l'état normal après chaque test
    vi.restoreAllMocks();
  });

  it("should return an empty array when there are no votes", async () => {
    // on surveille la vraie méthode Prisma
    const findManySpy = vi.spyOn(prisma.voteParticipation, "findMany");

    // ici on simule aucun vote
    const fakeVotes: VoteWithUser[] = [];

    // on dit à Prisma de retourner notre faux tableau
    findManySpy.mockResolvedValue(fakeVotes as never);

    const result = await getLeaderboardService();

    // on vérifie que Prisma a bien été appelé
    expect(findManySpy).toHaveBeenCalled();

    // comme il n'y a aucun vote, le classement doit être vide
    expect(result.data).toEqual([]);
  });

  it("should calculate leaderboard for one player", async () => {
    const findManySpy = vi.spyOn(prisma.voteParticipation, "findMany");

    // on simule 2 votes pour le même joueur
    const fakeVotes: VoteWithUser[] = [
      {
        rating: 4,
        participation: {
          user: {
            id: 1,
            username: "alice",
          },
        },
      },
      {
        rating: 5,
        participation: {
          user: {
            id: 1,
            username: "alice",
          },
        },
      },
    ];

    findManySpy.mockResolvedValue(fakeVotes as never);

    const result = await getLeaderboardService();

    expect(findManySpy).toHaveBeenCalled();

    // il doit y avoir un seul joueur dans le classement
    expect(result.data).toHaveLength(1);

    // vérification des calculs
    expect(result.data[0].rank).toBe(1);
    expect(result.data[0].userId).toBe(1);
    expect(result.data[0].username).toBe("alice");
    expect(result.data[0].totalScore).toBe(9);
    expect(result.data[0].voteCount).toBe(2);
    expect(result.data[0].averageScore).toBe(4.5);
    expect(result.data[0].weightedScore).toBe(1.29);
  });

  it("should rank players by weighted score", async () => {
    const findManySpy = vi.spyOn(prisma.voteParticipation, "findMany");

    // alice a une meilleure moyenne mais peu de votes
    // bob a un peu moins bien, mais plus de votes
    // avec le score pondéré, bob doit passer devant
    const fakeVotes: VoteWithUser[] = [
      {
        rating: 5,
        participation: {
          user: {
            id: 1,
            username: "alice",
          },
        },
      },
      {
        rating: 4,
        participation: {
          user: {
            id: 2,
            username: "bob",
          },
        },
      },
      {
        rating: 4,
        participation: {
          user: {
            id: 2,
            username: "bob",
          },
        },
      },
      {
        rating: 4,
        participation: {
          user: {
            id: 2,
            username: "bob",
          },
        },
      },
    ];

    findManySpy.mockResolvedValue(fakeVotes as never);

    const result = await getLeaderboardService();

    expect(findManySpy).toHaveBeenCalled();
    expect(result.data).toHaveLength(2);

    // bob doit être premier
    expect(result.data[0].username).toBe("bob");
    expect(result.data[0].rank).toBe(1);

    // alice doit être deuxième
    expect(result.data[1].username).toBe("alice");
    expect(result.data[1].rank).toBe(2);
  });
});