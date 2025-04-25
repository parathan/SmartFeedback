'use client';

import { useState, useCallback } from 'react';
import { QUIZ_QUESTION } from '../constants/quiz';
import { formatSolution } from '../utils/formatting';
import { fetchHint, fetchSolution } from '../utils/api';
import { LoadingType, QuizOption } from '../types/quiz';

export default function MathQuiz() {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [showResult, setShowResult] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [hint, setHint] = useState<string>("");
  const [solution, setSolution] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const [showHelpArea, setShowHelpArea] = useState<boolean>(false);
  const [loadingType, setLoadingType] = useState<LoadingType>(null);

  const handleSubmit = useCallback(() => {
    const correct = selectedOption === QUIZ_QUESTION.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);
  }, [selectedOption]);

  const handleGetHint = useCallback(async () => {
    setIsLoading(true);
    setLoadingType('hint');
    try {
      const selectedAnswer = QUIZ_QUESTION.options.find(opt => opt.id === selectedOption)?.text || "";
      const correctAnswerText = QUIZ_QUESTION.options.find(opt => opt.id === QUIZ_QUESTION.correctAnswer)?.text || "";
      
      const { hint: newHint, error } = await fetchHint(
        QUIZ_QUESTION.question,
        selectedAnswer,
        correctAnswerText
      );

      if (error) {
        console.error(error);
      }

      setHint(newHint || "");
      setShowSolution(false);
      setShowHelpArea(true);
    } finally {
      setIsLoading(false);
      setLoadingType(null);
    }
  }, [selectedOption]);

  const handleGetSolution = useCallback(async () => {
    setIsLoading(true);
    setLoadingType('solution');
    try {
      const correctAnswerText = QUIZ_QUESTION.options.find(opt => opt.id === QUIZ_QUESTION.correctAnswer)?.text || "";
      
      const { solution: newSolution, error } = await fetchSolution(
        QUIZ_QUESTION.question,
        correctAnswerText
      );

      if (error) {
        console.error(error);
      }

      setSolution(newSolution || "");
      setShowSolution(true);
      setShowHelpArea(true);
    } finally {
      setIsLoading(false);
      setLoadingType(null);
    }
  }, []);

  const handleReset = useCallback(() => {
    setSelectedOption("");
    setShowResult(false);
    setIsCorrect(false);
    setHint("");
    setSolution("");
    setShowSolution(false);
    setShowHelpArea(false);
    setLoadingType(null);
  }, []);

  const getOptionClassName = useCallback((option: QuizOption) => {
    const baseClasses = "w-full p-4 text-left rounded-lg transition-all";
    const selectedClasses = selectedOption === option.id 
      ? 'bg-blue-100 border-2 border-blue-500' 
      : 'border-2 border-gray-200 hover:border-blue-300';
    const disabledClasses = showResult ? 'cursor-not-allowed' : 'cursor-pointer';
    
    return `${baseClasses} ${selectedClasses} ${disabledClasses}`;
  }, [selectedOption, showResult]);

  const getRadioClassName = useCallback((option: QuizOption) => {
    const baseClasses = "w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3";
    const selectedClasses = selectedOption === option.id 
      ? 'border-blue-500 bg-blue-500' 
      : 'border-gray-300';
    
    return `${baseClasses} ${selectedClasses}`;
  }, [selectedOption]);

  const getTextClassName = useCallback((option: QuizOption) => {
    const baseClasses = "text-lg";
    const selectedClasses = selectedOption === option.id 
      ? 'text-blue-700 font-medium' 
      : 'text-gray-700';
    
    return `${baseClasses} ${selectedClasses}`;
  }, [selectedOption]);

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
            className={getOptionClassName(option)}
            disabled={showResult}
          >
            <div className="flex items-center">
              <div className={getRadioClassName(option)}>
                {selectedOption === option.id && (
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                )}
              </div>
              <span className={getTextClassName(option)}>
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
          
          {!isCorrect && (
            <div className="space-y-4">
              <div className="flex space-x-4">
                <button
                  onClick={handleGetHint}
                  disabled={isLoading}
                  className="flex-1 py-2 rounded-lg font-medium bg-blue-100 text-blue-700 hover:bg-blue-200 transition-all disabled:opacity-50"
                >
                  {loadingType === 'hint' ? "Generating Hint..." : "Get a Hint"}
                </button>
                <button
                  onClick={handleGetSolution}
                  disabled={isLoading}
                  className="flex-1 py-2 rounded-lg font-medium bg-purple-100 text-purple-700 hover:bg-purple-200 transition-all disabled:opacity-50"
                >
                  {loadingType === 'solution' ? "Generating Solution..." : "Show Full Solution"}
                </button>
              </div>
              
              {showHelpArea && (
                <div className="p-4 rounded-lg bg-blue-50">
                  {isLoading ? (
                    <div className="flex items-center justify-center py-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-700"></div>
                    </div>
                  ) : !showSolution ? (
                    <>
                      <h3 className="font-medium text-blue-800 mb-2">Hint:</h3>
                      <p className="text-blue-700">{hint}</p>
                    </>
                  ) : (
                    <div className="space-y-2 prose prose-purple max-w-none">
                      {formatSolution(solution)}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

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