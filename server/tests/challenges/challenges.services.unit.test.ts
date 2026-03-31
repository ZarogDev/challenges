import { 
  getChallenges,
  getAverageChallengeScore,
  getAverageParticipationScore,
  getFormattedChallenge,
  createVoteOnChallenge
} from "../../src/services/challenges.service";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { createMockChallenges, createMockChallengeWithParticipations, createMockParticipationWithVotes, createMockVoteChallenge } from "./mocks";
import { prisma } from '../../src/db/prisma';

// ici, uniquement des tests unitaires, qui vérifient la logique métier, en appelant un mock de prisma grâce à Vitest

beforeEach(() => {
  vi.restoreAllMocks();
});

describe("getAverageChallengeScore", () => {
  it("should return the correct average when there are votes", async () => {
    const challenge = createMockChallengeWithParticipations([4, 2, 5]);

    const result = await getAverageChallengeScore(challenge);

    expect(result).toBe((4 + 2 + 5) / 3);
  });

  it("should return null when there are no votes", async () => {
    const challenge = createMockChallengeWithParticipations([]);

    const result = await getAverageChallengeScore(challenge);

    expect(result).toBeNull();
  });

  it("should handle a single vote", async () => {
    const challenge = createMockChallengeWithParticipations([4]);

    const result = await getAverageChallengeScore(challenge);

    expect(result).toBe(4);
  });

  it("should handle negative or zero ratings", async () => {
    const challenge = createMockChallengeWithParticipations([0, -2, 2]);

    const result = await getAverageChallengeScore(challenge);

    expect(result).toBe((0 + (-2) + 2) / 3);
  });
});

describe("getAverageParticipationScore", () => {
  it("should return the correct average when there are votes", async () => {
    const participation = createMockParticipationWithVotes([5, 3, 4, 7]);

    const result = await getAverageParticipationScore(participation);

    expect(result).toBe((5 + 3 + 4 + 7) / 4);
  });

  it("should return null when there are no votes", async () => {
    const participation = createMockParticipationWithVotes([]);

    const result = await getAverageParticipationScore(participation);

    expect(result).toBeNull();
  });

  it("should handle a single vote", async () => {
    const participation = createMockParticipationWithVotes([5]);

    const result = await getAverageParticipationScore(participation);

    expect(result).toBe(5);
  });

  it("should handle negative or zero ratings", async () => {
    const participation = createMockParticipationWithVotes([0, -5, 5]);

    const result = await getAverageParticipationScore(participation);

    expect(result).toBe((0 + (-5) + 5) / 3);
  });
});

describe('getChallenges', () => {
  it("should return paginated challenges", async () => {
    vi.spyOn(prisma.challenge, 'findMany').mockResolvedValue(createMockChallenges(10));

    vi.spyOn(prisma.challenge, 'count').mockResolvedValue(10);
    
    const result = await getChallenges(1, 5);

    expect(result.data).toHaveLength(10);
    expect(result.page).toBe(1);
    expect(result.totalPages).toBe(2);
    expect(result.total).toBe(10);

    expect(prisma.challenge.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        skip: 0,
        take: 5,
        include: { creator: { select: { username: true } } },
      })
    );
  });

  it("should apply search filter correctly", async () => {
    vi.spyOn(prisma.challenge, 'findMany').mockResolvedValue(createMockChallenges(1));

    vi.spyOn(prisma.challenge, 'count').mockResolvedValue(1);

    await getChallenges(1, 5, 'test');

    expect(prisma.challenge.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          OR: [
            { title: { contains: 'test', mode: 'insensitive' } },
            { gameTitle: { contains: 'test', mode: 'insensitive' } },
          ],
        },
      })
    );
  });

  it("should handle empty search string", async () => {
    vi.spyOn(prisma.challenge, 'findMany').mockResolvedValue(createMockChallenges(1));

    vi.spyOn(prisma.challenge, 'count').mockResolvedValue(1);

    await getChallenges(1, 5, '');

    expect(prisma.challenge.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: undefined })
    );
  });

  it("should handle Prisma errors", async () => {
    vi.spyOn(prisma.challenge, 'findMany').mockRejectedValue(new Error());

    const result = await getChallenges();

    expect(result).toEqual({ error: 'Internal server error' });
  });
});

describe("getFormattedChallenge", () => {
  it("should format a challenge with participations and votes correctly", async () => {
    const challenge = createMockChallengeWithParticipations([2, 5, 4], 5);

    const result = await getFormattedChallenge(challenge);

    expect(result.averageChallengeScore).toBe((2 + 5 + 4) / 3);

    expect(result.participations).toHaveLength(5);

    expect(result.participations[0]).toMatchObject({
      id: 1,
      participant: 'Username',
      averageParticipationScore: (2 + 4 + 3) / 3,
    });
  });

  it("should handle challenge with no votes or participations", async () => {
    const challenge = createMockChallengeWithParticipations();

    const result = await getFormattedChallenge(challenge);

    expect(result.averageChallengeScore).toBeNull();
    expect(result.participations).toEqual([]);
  });

  it("should handle participations with no votes", async () => {
    const challenge = createMockChallengeWithParticipations(undefined, 2);

    challenge.participations[0].voteParticipations = [];
    challenge.participations[1].voteParticipations = [];

    const result = await getFormattedChallenge(challenge);

    expect(result.averageChallengeScore).toBeNull();
    expect(result.participations[0].averageParticipationScore).toBeNull();
    expect(result.participations[1].averageParticipationScore).toBeNull();
  });

});

describe('createVoteOnChallenge', () => {
  it("should return an error if user has already voted", async () => {
    vi.spyOn(prisma.voteChallenge, 'findFirst').mockResolvedValue(createMockVoteChallenge([3])[0]);

    const result = await createVoteOnChallenge(1, 1, 4);

    expect(result.status).toEqual(400);
    expect(result.success).toBeFalsy();
    expect(result.error).toEqual("A user can only vote once for a challenge");
  });

  it("should create a new vote if user has not voted yet", async () => {
    vi.spyOn(prisma.voteChallenge, 'findFirst').mockResolvedValue(null);
    vi.spyOn(prisma.voteChallenge, 'create').mockResolvedValue(createMockVoteChallenge([2])[0]);

    const result = await createVoteOnChallenge(1, 2, 4);

    expect(result.status).toEqual(201);
    expect(result.success).toBeTruthy();
    expect(result.data).toEqual({
      id: 1, 
      challengeId: 1, 
      userId: 1, 
      rating: 2,
      createdAt: new Date()
    });
  });

  it("should return internal server error if Prisma create fails", async () => {
    vi.spyOn(prisma.voteChallenge, 'findFirst').mockResolvedValue(null);
    vi.spyOn(prisma.voteChallenge, 'create').mockRejectedValue(new Error());

    const result = await createVoteOnChallenge(1, 2, 4);

    expect(result.status).toEqual(500);
    expect(result.error).toEqual("Internal server error");
    expect(result.success).toBeFalsy();
  });
});