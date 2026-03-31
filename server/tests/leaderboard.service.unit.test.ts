import { describe, it, expect, vi, beforeEach } from "vitest";
import { getLeaderboardService } from "../src/services/leaderboard.service";
import { prisma } from "../src/db/prisma";

// on remplace le vrai prisma par un faux prisma
vi.mock("../../src/db/prisma", () => ({
  prisma: {
    voteParticipation: {
      findMany: vi.fn(),
    },
  },
}));

describe("getLeaderboardService", () => {
  beforeEach(() => {
    // remet les mocks à zéro avant chaque test
    vi.clearAllMocks();
  });

  it("should return an empty array when there are no votes", async () => {
    // on simule une base vide
    vi.mocked(prisma.voteParticipation.findMany).mockResolvedValue([] as any);

    const result = await getLeaderboardService();

    expect(result).toEqual([]);
  });

  it("should calculate leaderboard for one player", async () => {
    // on simule 2 votes pour le même joueur
    vi.mocked(prisma.voteParticipation.findMany).mockResolvedValue([
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
    ] as any);

    const result = await getLeaderboardService();

    // on vérifie qu'il y a bien 1 joueur dans le classement
    expect(result).toHaveLength(1);

    // totalScore = 4 + 5 = 9
    expect(result[0].totalScore).toBe(9);

    // 2 votes
    expect(result[0].voteCount).toBe(2);

    // moyenne = 9 / 2 = 4.5
    expect(result[0].averageScore).toBe(4.5);

    // weighted score = 4.5 * (2 / (2 + 5)) = 1.2857...
    // arrondi à 2 décimales = 1.29
    expect(result[0].weightedScore).toBe(1.29);

    expect(result[0].rank).toBe(1);
    expect(result[0].userId).toBe(1);
    expect(result[0].username).toBe("alice");
  });

  it("should rank players by weighted score", async () => {
    // alice a une très bonne note mais peu de votes
    // bob a une note un peu moins haute mais plus de votes
    // avec ton calcul pondéré, bob doit passer devant
    vi.mocked(prisma.voteParticipation.findMany).mockResolvedValue([
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
    ] as any);

    const result = await getLeaderboardService();

    expect(result).toHaveLength(2);

    // bob doit être premier
    expect(result[0].username).toBe("bob");
    expect(result[0].rank).toBe(1);

    // alice doit être deuxième
    expect(result[1].username).toBe("alice");
    expect(result[1].rank).toBe(2);
  });
});