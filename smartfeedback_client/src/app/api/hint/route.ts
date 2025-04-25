import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: Request) {
  try {
    const { question, userAnswer, correctAnswer } = await request.json();

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `You are a helpful math tutor. A student is working on the following integral problem:

Question: ${question}

The student answered: ${userAnswer}
The correct answer is: ${correctAnswer}

Please provide a helpful hint that:
1. Points out where the student might have gone wrong
2. Suggests a specific approach or technique to try
3. Does NOT give away the solution
4. Uses clear, concise language
5. Focuses on one key concept at a time
6. Encourages the student to think about the problem differently

Format your response as a clear, concise hint that helps the student make progress without giving away the answer.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ hint: text || "Let's break this down step by step. First, try solving each part of the equation separately." });
  } catch (error) {
    console.error('Error generating hint:', error);
    return NextResponse.json(
      { error: "Failed to generate hint" },
      { status: 500 }
    );
  }
} 