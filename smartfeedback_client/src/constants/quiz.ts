import { QuizQuestion } from '../types/quiz';

export const QUIZ_QUESTION: QuizQuestion = {
  question: "Evaluate ∫(x²eˣ + 2x sin(x)) dx",
  options: [
    { id: "1", text: "eˣ(x² - 2x + 2) - 2x cos(x) + 2 sin(x) + C" },
    { id: "2", text: "eˣ(x² + 2x + 2) + 2x cos(x) - 2 sin(x) + C" },
    { id: "3", text: "eˣ(x² - 2x + 2) + 2x cos(x) - 2 sin(x) + C" },
    { id: "4", text: "eˣ(x² + 2x + 2) - 2x cos(x) + 2 sin(x) + C" }
  ],
  correctAnswer: "3"
}; 