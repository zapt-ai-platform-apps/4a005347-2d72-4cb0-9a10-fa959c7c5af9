import React, { useState } from 'react';
import * as Sentry from '@sentry/browser';

const ReflectionExercise = ({ onComplete }) => {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // TODO: Add API integration
      onComplete(response);
    } catch (error) {
      Sentry.captureException(error);
      console.error('Error saving reflection:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl max-w-2xl w-full mx-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Daily Reflection</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <textarea
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          placeholder="What meaningful experiences did you have today?"
          className="w-full p-4 rounded-xl border border-gray-200 box-border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows="4"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors duration-200 cursor-pointer disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Reflection'}
        </button>
      </form>
    </div>
  );
};

export default ReflectionExercise;