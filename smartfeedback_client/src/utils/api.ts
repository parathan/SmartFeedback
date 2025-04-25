import { ApiResponse } from '../types/quiz';

const API_BASE_URL = '/api';

export const fetchHint = async (question: string, userAnswer: string, correctAnswer: string): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/hint`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question,
        userAnswer,
        correctAnswer,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate hint');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching hint:', error);
    return {
      error: 'Failed to generate hint. Please try again.',
      hint: "Let's break this down step by step. First, try solving each part of the equation separately."
    };
  }
};

export const fetchSolution = async (question: string, correctAnswer: string): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/solution`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question,
        correctAnswer,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate solution');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching solution:', error);
    return {
      error: 'Failed to generate solution. Please try again.',
      solution: "Here's how to solve this problem step by step..."
    };
  }
}; 