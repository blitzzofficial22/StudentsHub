export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role: 'admin' | 'student';
  points: number;
  streak: number;
  badges: string[];
}

export interface Post {
  id: string;
  authorId: string;
  authorName: string;
  content: string;
  tags: string[];
  upvotes: number;
  timestamp: number;
  comments: Comment[];
}

export interface Comment {
  id: string;
  authorName: string;
  content: string;
  timestamp: number;
  isAI?: boolean;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string; // The correct string value
  explanation: string;
}

export interface QuizResult {
  topic: string;
  score: number;
  total: number;
  date: string;
}

export enum AnalyticsPeriod {
  WEEK = 'WEEK',
  MONTH = 'MONTH',
  YEAR = 'YEAR'
}