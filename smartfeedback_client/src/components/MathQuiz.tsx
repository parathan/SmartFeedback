'use client';

import { useState } from 'react';

const QUIZ_QUESTION = {
  question: "What is the value of (3 × 4) + (5 × 2)?",
  options: [
    { id: "1", text: "22" },
    { id: "2", text: "20" },
    { id: "3", text: "24" },
    { id: "4", text: "26" }
  ],
  correctAnswer: "1"
};

export default function MathQuiz() {
  const [selectedOption, setSelectedOption] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = () => {
    const correct = selectedOption === QUIZ_QUESTION.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);
  };

  const handleReset = () => {
    setSelectedOption("");
    setShowResult(false);
    setIsCorrect(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      {/* Question */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {QUIZ_QUESTION.question}
        </h2>
      </div>

      {/* Options */}
      <div className="space-y-4 mb-8">
        {QUIZ_QUESTION.options.map((option) => (
          <button
            key={option.id}
            onClick={() => !showResult && setSelectedOption(option.id)}
            className={`
              w-full p-4 text-left rounded-lg transition-all
              ${selectedOption === option.id 
                ? 'bg-blue-100 border-2 border-blue-500' 
                : 'border-2 border-gray-200 hover:border-blue-300'}
              ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}
            `}
            disabled={showResult}
          >
            <div className="flex items-center">
              <div className={`
                w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3
                ${selectedOption === option.id 
                  ? 'border-blue-500 bg-blue-500' 
                  : 'border-gray-300'}
              `}>
                {selectedOption === option.id && (
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                )}
              </div>
              <span className={`
                text-lg
                ${selectedOption === option.id ? 'text-blue-700 font-medium' : 'text-gray-700'}
              `}>
                {option.text}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Submit/Result Section */}
      {!showResult ? (
        <button
          onClick={handleSubmit}
          disabled={!selectedOption}
          className={`
            w-full py-3 rounded-lg font-medium text-lg transition-all
            ${selectedOption 
              ? 'bg-blue-600 text-white hover:bg-blue-700' 
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'}
          `}
        >
          Check Answer
        </button>
      ) : (
        <div className="space-y-4">
          <div className={`
            p-4 rounded-lg text-center
            ${isCorrect 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'}
          `}>
            <p className="text-lg font-medium mb-1">
              {isCorrect ? "Correct! 🎉" : "Incorrect! 🤔"}
            </p>
            <p>
              {isCorrect 
                ? "Great job! You got it right!" 
                : "Don't worry, try again!"}
            </p>
          </div>
          <button
            onClick={handleReset}
            className="w-full py-3 rounded-lg font-medium text-lg bg-gray-600 text-white hover:bg-gray-700 transition-all"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
} 