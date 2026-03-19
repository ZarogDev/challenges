export interface Challenge {
  id: number;
  title: string; 
  description: string;
  conditions: string;
  gameId: number;
  gameTitle: string;
  gameThumbnail: string;
  createdAt: string;
  userId: number;
}

export interface ChallengeWithParticipations {
  id: number;
  title: string;
  description: string;
  conditions: string;
  gameTitle: string;
  gameThumbnail: string;
  createdAt: string;
  creator: string;
  averageChallengeScore: number;
  participations: Participation[];
}

export interface Participation {
  id: number;
  description: string;
  videoLink: string;
  participant: string;
  createdAt: string;
  averageParticipationScore: number;
}