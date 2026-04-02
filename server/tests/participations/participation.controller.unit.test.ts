import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import type { Request, Response } from "express";
import { prisma } from "../../src/db/prisma.js";
import { checkIfUserAlreadyVotedOnParticipation } from "../../src/controllers/participation.controller.js";

// type simple pour ajouter req.user dans nos faux req
type AuthenticatedRequest = Request & {
  user?: {
    id: string;
  };
};

// petite fonction pour simuler un res Express
function createMockResponse(): Response {
  const res = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn(),
  };

  return res as unknown as Response;
}

describe("checkIfUserAlreadyVotedOnParticipation", () => {
  beforeEach(() => {
    // on nettoie l'historique des mocks avant chaque test
    vi.clearAllMocks();
  });

  afterEach(() => {
    // on remet les spies à l'état normal après chaque test
    vi.restoreAllMocks();
  });

  it("should return 401 when user is not authenticated", async () => {
    // faux req sans utilisateur connecté
    const req = {
      params: { id: "12" },
    } as unknown as AuthenticatedRequest;

    const res = createMockResponse();

    await checkIfUserAlreadyVotedOnParticipation(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "unauthorized",
    });
  });

  it("should return hasVoted false when no vote exists", async () => {
    // faux req avec user connecté
    const req = {
      user: { id: "1" },
      params: { id: "12" },
    } as unknown as AuthenticatedRequest;

    const res = createMockResponse();

    // on espionne Prisma et on simule : aucun vote trouvé
    const findFirstSpy = vi.spyOn(prisma.voteParticipation, "findFirst");
    findFirstSpy.mockResolvedValue(null as never);

    await checkIfUserAlreadyVotedOnParticipation(req, res);

    expect(findFirstSpy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      hasVoted: false,
    });
  });

  it("should return hasVoted true when a vote already exists", async () => {
    const req = {
      user: { id: "1" },
      params: { id: "12" },
    } as unknown as AuthenticatedRequest;

    const res = createMockResponse();

    // faux vote trouvé
    const fakeVote = {
      id: 1,
      userId: 1,
      participationId: 12,
    };

    const findFirstSpy = vi.spyOn(prisma.voteParticipation, "findFirst");
    findFirstSpy.mockResolvedValue(fakeVote as never);

    await checkIfUserAlreadyVotedOnParticipation(req, res);

    expect(findFirstSpy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      hasVoted: true,
    });
  });

  it("should return 500 when prisma throws an error", async () => {
    const req = {
      user: { id: "1" },
      params: { id: "12" },
    } as unknown as AuthenticatedRequest;

    const res = createMockResponse();

    const findFirstSpy = vi.spyOn(prisma.voteParticipation, "findFirst");
    findFirstSpy.mockRejectedValue(new Error("database error"));

    await checkIfUserAlreadyVotedOnParticipation(req, res);

    expect(findFirstSpy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "error while checking vote",
    });
  });
});