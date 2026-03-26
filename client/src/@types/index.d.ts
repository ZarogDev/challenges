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
  creator: Creator;
}

export interface Creator {
  username: string;
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

export interface Authcontext {
  isLoggedIn: boolean;
  token: string | null;
  username: string | null;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export interface UserWithParticipations {
  id: number;
  email: string;
  username: string;
  birthdate: string;
  createdAt: string;
  rank: string;
  participations: Participation[];
}