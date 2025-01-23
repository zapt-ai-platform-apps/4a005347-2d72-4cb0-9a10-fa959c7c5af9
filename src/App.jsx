import React, { useState } from 'react';
import PurposeQuiz from './components/PurposeQuiz';
import ReflectionExercise from './components/ReflectionExercise';

export default function App() {
  const [purposeInsights, setPurposeInsights] = useState(null);
  const [currentStep, setCurrentStep] = useState('quiz');

  const handleQuizComplete = (answers) => {
    console.log('Quiz answers:', answers);
    setCurrentStep('reflection');
  };

  const handleReflectionComplete = () => {
    setCurrentStep('progress');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-800">Purpose Pathfinder</h1>
            <a 
              href="https://www.zapt.ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600"
            >
              Made on ZAPT
            </a>
          </div>
        </div>
      </nav>

      <main className="py-16 px-4">
        {currentStep === 'quiz' && (
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Discover Your Life's Purpose
            </h1>
            <p className="text-gray-600 mb-8 max-w-xl mx-auto">
              Answer a few questions about your values and experiences to uncover your unique purpose path
            </p>
            <PurposeQuiz onComplete={handleQuizComplete} />
          </div>
        )}

        {currentStep === 'reflection' && (
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Daily Reflection
            </h1>
            <p className="text-gray-600 mb-8 max-w-xl mx-auto">
              Regular reflection helps deepen your understanding of what truly matters to you
            </p>
            <ReflectionExercise onComplete={handleReflectionComplete} />
          </div>
        )}

        {currentStep === 'progress' && (
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Your Purpose Journey
            </h1>
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-2xl w-full mx-4">
              <p className="text-gray-600 mb-4">
                Your personalized insights will appear here as you continue your journey...
              </p>
              <div className="animate-pulse h-32 bg-gray-100 rounded-xl" />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}