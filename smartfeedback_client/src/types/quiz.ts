export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  question: string;
  options: QuizOption[];
  correctAnswer: string;
}

export type LoadingType = 'hint' | 'solution' | null;

export interface ApiResponse {
  hint?: string;
  solution?: string;
  error?: string;
} 