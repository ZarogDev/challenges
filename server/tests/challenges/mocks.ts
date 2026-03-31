import { IChallenge, IChallengeWithParticipations, IParticipationWithVotes, IVoteChallenge, IVoteParticipation } from "../../src/@types/types";

export function createMockChallengeWithParticipations(ratings: number[]): IChallengeWithParticipations {
  return {
    id: 1,
    title: "Title",
    description: "Description",
    conditions: "Conditions",
    gameId: 1,
    gameTitle: "Game Title",
    gameThumbnail: "Game Thumbnail URL",
    createdAt: new Date(),
    userId: 1,
    creator: { 
      id: 1, 
      username: "Username"
    },
    participations: [],
    voteChallenges: createMockVoteChallenge(ratings)
  };
}

function createMockVoteChallenge(ratings: number[]): IVoteChallenge[] {
  return ratings.map((rating, index) => ({
    id: index + 1,
    rating: rating,
    createdAt: new Date(),
    userId: index + 1,
    challengeId: 1
  }));
}

export function createMockParticipationWithVotes(ratings: number[]): IParticipationWithVotes {
  return {
    id: 1,
    description: "Description",
    createdAt: new Date(),
    userId: 1,
    challengeId: 1,
    videoLink: "Video Link",
    user: { 
      id: 1, 
      username: "Username" 
    },
    voteParticipations: createMockVoteParticipation(ratings)
  }
}

function createMockVoteParticipation(ratings: number[]): IVoteParticipation[] {
  return ratings.map((rating, index) => ({
    id: index + 1,
    rating: rating,
    createdAt: new Date(),
    userId: index + 1,
    participationId: 1
  }));
}

export function createMockChallenges(numberOfChallenges: number): IChallenge[] {
  return Array(numberOfChallenges).map((_, index) => ({
    id: index + 1,
    title: `Title ${index + 1}`,
    description: `Description ${index + 1}`,
    conditions: `Conditions ${index + 1}`,
    gameId: index + 1,
    gameTitle: `Game Title ${index + 1}`,
    gameThumbnail: `Game Thumbnail ${index + 1}`,
    createdAt: new Date(),
    userId: index + 1
  }))
}