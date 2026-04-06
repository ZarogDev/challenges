export interface IChallengeCreation {
  title: string;
  description: string;
  conditions?: string;
  gameId: number;
}

export interface IVoteChallenge {
  rating: number;
  id: number;
  createdAt: Date;
  userId: number;
  challengeId: number;
}

export interface ICreator {
  id: number;
  username: string;
}

export interface IVoteParticipation {
  rating: number;
  id: number;
  createdAt: Date;
  userId: number;
  participationId: number;
}

export interface IParticipation {
  id: number;
  description: string;
  createdAt: Date;
  userId: number;
  challengeId: number;
  videoLink: string;
}

export interface IParticipationWithVotes extends IParticipation {
  user: ICreator;
  voteParticipations: IVoteParticipation[];
}

export interface IChallenge {
  id: number;
  title: string;
  description: string;
  conditions: string | null;
  gameId: number;
  gameTitle: string;
  gameThumbnail: string;
  createdAt: Date;
  userId: number;
}

export interface IChallengeWithParticipations extends IChallenge{
    voteChallenges: IVoteChallenge[];
    creator: ICreator;
    participations: IParticipationWithVotes[];
}