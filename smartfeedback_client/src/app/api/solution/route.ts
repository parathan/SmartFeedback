import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import { apiCache } from '@/utils/cache';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: Request) {
  try {
    const { question, correctAnswer } = await request.json();

    // Create a unique cache key based on the input
    const cacheKey = `solution:${question}:${correctAnswer}`;

    // Check if we have a cached response
    const cachedResponse = apiCache.get<{ solution: string }>(cacheKey);
    if (cachedResponse) {
      return NextResponse.json(cachedResponse);
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `You are a helpful math tutor. Please provide a detailed solution to the following integral problem:

Question: ${question}
Correct Answer: ${correctAnswer}

Please structure your solution as follows:

# Solution

## Step 1: Break Down the Problem
*Reasoning:* Explain how to approach this integral by breaking it into manageable parts.

## Step 2: Solve Each Part
*Work:* Show the step-by-step solution for each part of the integral:
1. Solve the first part (x²eˣ)
2. Solve the second part (2x sin(x))
3. Combine the results

## Step 3: Final Answer
*Reasoning:* Explain how the parts come together to form the final answer.

Format your response using markdown with:
- Headers for each major step
- Bullet points for key observations
- Italicized reasoning sections
- Clear mathematical notation
- Proper spacing between steps

Make sure to:
1. Show all intermediate steps
2. Explain the reasoning behind each step
3. Use proper mathematical notation
4. Keep explanations clear and concise
5. Highlight key concepts and techniques used`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const apiResponse = { solution: text || "I couldn't generate a solution for this problem. Please try again later." };

    // Cache the response
    apiCache.set(cacheKey, apiResponse);

    return NextResponse.json(apiResponse);
  } catch (error) {
    console.error('Error generating solution:', error);
    return NextResponse.json(
      { error: "Failed to generate solution" },
      { status: 500 }
    );
  }
} 