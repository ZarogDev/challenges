import request from "supertest";
import jwt from "jsonwebtoken";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import app from "../../src/app.js";
import { prisma } from "../../src/db/prisma.js";

describe("GET /api/challenges/:id/votes/me", () => {
  beforeEach(() => {
    // on nettoie l'historique des mocks avant chaque test
    vi.clearAllMocks();

    // sécurité : on met une clé JWT de test si elle n'existe pas
    if (!process.env.JWT_SECRET) {
      process.env.JWT_SECRET = "test-secret";
    }
  });

  afterEach(() => {
    // on remet les spies dans leur état normal après chaque test
    vi.restoreAllMocks();
  });

  it("should return 401 when no token is provided", async () => {
    const res = await request(app).get("/api/challenges/1/votes/me");

    expect(res.status).toBe(401);
    expect(res.body).toEqual({
      error: "No token provided",
    });
  });

  it("should return 401 when token is invalid", async () => {
    const res = await request(app)
      .get("/api/challenges/1/votes/me")
      .set("Authorization", "Bearer invalid-token");

    expect(res.status).toBe(401);
    expect(res.body).toEqual({
      error: "Invalid token",
    });
  });

  it("should return hasVoted false when user has not voted yet", async () => {
    // on crée un vrai token JWT de test
    const token = jwt.sign(
      { userId: "1" },
      process.env.JWT_SECRET as string
    );

    // on espionne Prisma et on simule : aucun vote trouvé
    const findFirstSpy = vi.spyOn(prisma.voteChallenge, "findFirst");
    findFirstSpy.mockResolvedValue(null as never);

    const res = await request(app)
      .get("/api/challenges/12/votes/me")
      .set("Authorization", `Bearer ${token}`);

    expect(findFirstSpy).toHaveBeenCalled();
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      hasVoted: false,
    });
  });

  it("should return hasVoted true when user already voted", async () => {
    const token = jwt.sign(
      { userId: "1" },
      process.env.JWT_SECRET as string
    );

    // on simule un vote déjà existant
    const fakeVote = {
      id: 1,
      userId: 1,
      challengeId: 12,
    };

    const findFirstSpy = vi.spyOn(prisma.voteChallenge, "findFirst");
    findFirstSpy.mockResolvedValue(fakeVote as never);

    const res = await request(app)
      .get("/api/challenges/12/votes/me")
      .set("Authorization", `Bearer ${token}`);

    expect(findFirstSpy).toHaveBeenCalled();
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      hasVoted: true,
    });
  });
});