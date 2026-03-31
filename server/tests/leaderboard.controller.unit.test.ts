import { describe, it, expect, vi, beforeEach } from "vitest";
import { getLeaderboard } from "../src/controllers/leaderboard.controller";
import { getLeaderboardService } from "../src/services/leaderboard.service";

vi.mock("../src/services/leaderboard.service", () => ({
  getLeaderboardService: vi.fn(),
}));

describe("getLeaderboard controller", () => {
  beforeEach(() => {
    // remet les mocks à zéro avant chaque test
    vi.clearAllMocks();
  });

  it("should return status 200 with leaderboard data", async () => {
    // on simule la réponse du service
    vi.mocked(getLeaderboardService).mockResolvedValue([
      {
        rank: 1,
        userId: 1,
        username: "alice",
        totalScore: 9,
        voteCount: 2,
        averageScore: 4.5,
        weightedScore: 1.29,
      },
    ]);

    // faux req
    const req = {} as any;

    // faux res express
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as any;

    await getLeaderboard(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "leaderboard loaded",
      data: [
        {
          rank: 1,
          userId: 1,
          username: "alice",
          totalScore: 9,
          voteCount: 2,
          averageScore: 4.5,
          weightedScore: 1.29,
        },
      ],
    });
  });

  it("should return status 500 when service throws an error", async () => {
    // on simule une erreur du service
    vi.mocked(getLeaderboardService).mockRejectedValue(new Error("service error"));

    const req = {} as any;

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as any;

    await getLeaderboard(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "error while getting leaderboard",
    });
  });
});