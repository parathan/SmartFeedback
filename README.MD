# Smart Feedback - Interactive Mathematics Learning Platform

Smart Feedback is an interactive mathematics learning platform that provides intelligent feedback and explanations for math problems. It uses Gemini's GPT model to generate hints and solutions when users get the answer wrong.

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/parathan/SmartFeedback.git
cd SmartFeedback
```

2. Install dependencies:
```bash
cd smartfeedback_client
npm install
```

3. Create a `.env` file in the `smartfeedback_client` directory and add your Gemini API key:
```
GEMINI_API_KEY=your_gemini_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:3000`

## Example Prompts

The system uses the following prompts to generate helpful feedback:

### For Hints:
```
You are a helpful math tutor. A student is working on the following integral problem:

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

Format your response as a clear, concise hint that helps the student make progress without giving away the answer.
```

### For Full Solutions:
```
You are a helpful math tutor. Please provide a detailed solution to the following integral problem:

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
5. Highlight key concepts and techniques used
```

## Future Improvements

With more time, I would implement the following improvements:

1. **Interactive Solutions**
   - For the steps given in the full solution, each step has an interactive feature that allows the user to select an option, multiple choice style
   - This breaks down the solution into manageable parts, allowing the user to learn interactively, rather than just get the full solution all at once.

2. **Enhanced Learning Features**
   - Progress tracking and performance analytics
   - interactive animations for problems that can be taught with animations

3. **Content Expansion**
   - If a user gets an answer wrong, and gets the explanation for it, providing another question based on similar themes will help the user apply the knowledge they learned
   - Being able to continuously generate questions based on their progress and analytics from improvement #2, to target the themes they are weakest at
   - The idea is generating questions and solutions dynamically to fit the users needs.
   - Would need to modify the prompts to suit the dynamic questions.


## Tech Stack

The following tech stack was used:  
- Frontend: NextJS  
- Backend: NextJS (serverless API functions)  
- LLM: Gemini  
