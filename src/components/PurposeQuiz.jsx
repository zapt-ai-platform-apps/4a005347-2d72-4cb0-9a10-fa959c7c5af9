import React, { useState, useEffect } from 'react';
import * as Sentry from '@sentry/browser';
import { supabase } from './supabaseClient';

const PurposeQuiz = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);

  const questions = [
    {
      question: "When do you feel most energized?",
      options: [
        "Helping others",
        "Creating something new",
        "Solving complex problems",
        "Leading a team"
      ]
    },
    {
      question: "What values are most important to you?",
      options: [
        "Creativity & Innovation",
        "Community & Relationships",
        "Growth & Learning",
        "Impact & Legacy"
      ]
    }
  ];

  const handleAnswer = async (answer) => {
    try {
      setLoading(true);
      const newAnswers = [...answers, answer];
      setAnswers(newAnswers);
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
      } else {
        onComplete(newAnswers);
      }
    } catch (error) {
      Sentry.captureException(error);
      console.error('Error saving answer:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl max-w-2xl w-full mx-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {questions[currentQuestion].question}
      </h2>
      <div className="space-y-4">
        {questions[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            disabled={loading}
            className="w-full p-4 text-left rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors duration-200 cursor-pointer border border-blue-200"
          >
            {option}
          </button>
        ))}
      </div>
      <div className="mt-6 text-gray-500">
        Question {currentQuestion + 1} of {questions.length}
      </div>
    </div>
  );
};

export default PurposeQuiz;