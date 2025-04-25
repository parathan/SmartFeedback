import React, { ReactNode } from 'react';

export const formatSolution = (text: string): ReactNode[] => {
  const lines = text.split('\n');
  return lines.map((line, index) => {
    // Handle headers
    if (line.startsWith('# ')) {
      return <h2 key={index} className="text-2xl font-bold text-purple-800 mt-8 mb-4">{line.substring(2)}</h2>;
    }
    if (line.startsWith('## ')) {
      return <h3 key={index} className="text-xl font-bold text-purple-800 mt-6 mb-3">{line.substring(3)}</h3>;
    }
    if (line.startsWith('### ')) {
      return <h4 key={index} className="text-lg font-bold text-purple-800 mt-4 mb-2">{line.substring(4)}</h4>;
    }

    // Handle bold text with asterisks
    if (line.includes('*')) {
      const parts = line.split('*');
      return (
        <p key={index} className="text-purple-700 my-2">
          {parts.map((part, i) => 
            i % 2 === 1 ? 
              <span key={i} className="font-bold">{part}</span> : 
              part
          )}
        </p>
      );
    }

    // Handle numbered lists with proper indentation
    if (line.match(/^\d+\.\s/)) {
      return (
        <div key={index} className="ml-4 my-3">
          <p className="text-purple-700 font-medium">{line}</p>
        </div>
      );
    }

    // Handle bullet points with proper indentation
    if (line.startsWith('- ')) {
      return (
        <li key={index} className="text-purple-700 ml-6 list-disc my-1">
          {line.substring(2)}
        </li>
      );
    }

    // Handle italicized text (for reasoning and work sections)
    if (line.startsWith('*Reasoning:*') || line.startsWith('*Work:*')) {
      return (
        <div key={index} className="ml-4 my-2">
          <p className="text-purple-700 italic">
            <span className="font-semibold not-italic">{line.split(':')[0]}:</span>
            {line.split(':')[1]}
          </p>
        </div>
      );
    }

    // Handle regular paragraphs with proper spacing
    if (line.trim() === '') {
      return <div key={index} className="h-4" />;
    }

    // Handle mathematical expressions
    if (line.includes('∫') || line.includes('=>') || line.includes('=')) {
      return (
        <div key={index} className="ml-8 my-2">
          <p className="text-purple-700 font-mono">{line}</p>
        </div>
      );
    }

    return <p key={index} className="text-purple-700 my-2">{line}</p>;
  });
}; 