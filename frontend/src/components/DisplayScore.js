import React, { useState, useEffect } from 'react';
import { Lock, Unlock } from 'lucide-react';
import { TimelineDemo } from './Timeline';
import { useLocation, useNavigate } from 'react-router-dom';

const CircularProgress = ({ percentage }) => {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg className="transform -rotate-90 w-48 h-48">
        <circle
          cx="96"
          cy="96"
          r={radius}
          stroke="currentColor"
          strokeWidth="12"
          fill="transparent"
          className="text-gray-700"
        />
        <circle
          cx="96"
          cy="96"
          r={radius}
          stroke="currentColor"
          strokeWidth="12"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="text-cyan-600 transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-5xl font-bold text-gray-300">{percentage.toFixed(1)}</span>
        <span className="text-xl text-gray-300">%</span>
      </div>
    </div>
  );
};

const DisplayScore = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isTimelineUnlocked, setIsTimelineUnlocked] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(0);

  // Get score and level from navigation state
  const { score, level } = location.state || { score: 0, level: 'Basic' };

  useEffect(() => {
    // Animate the score from 0 to the actual value
    const duration = 1500; // Animation duration in milliseconds
    const steps = 60; // Number of steps in the animation
    const stepDuration = duration / steps;
    const increment = score / steps;

    let currentStep = 0;

    const timer = setInterval(() => {
      if (currentStep < steps) {
        setAnimatedScore(prev => Math.min(prev + increment, score));
        currentStep++;
      } else {
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [score]);

  const handleBack = () => {
    navigate('/assessment');
  };

  const getLevelMessage = () => {
    switch (level) {
      case 'Leader':
        return "Outstanding! Your organization shows excellent Industry 4.0 readiness.";
      case 'Advanced':
        return "Good progress! Some areas need attention for optimal Industry 4.0 readiness.";
      case 'Developing':
        return "You're on your way. Let's focus on key improvement areas.";
      default:
        return "We've identified several opportunities to enhance your Industry 4.0 capabilities.";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-800 to-gray-900 text-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back button */}
        <button 
          onClick={handleBack} 
          className="mb-8 px-4 py-2 text-gray-400 hover:text-white transition-colors flex items-center gap-2"
        >
          ← Back to Assessment
        </button>

        {/* Score Card */}
        <div className="bg-black rounded-xl shadow-2xl mb-8 overflow-hidden border border-cyan-600">
          <div className="p-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-400 italic">Your Industry 4.0 Readiness Score</h2>
            <div className="flex flex-col items-center justify-center gap-6">
              <CircularProgress percentage={animatedScore} />
              <p className="text-lg italic text-gray-400 text-center max-w-2xl mt-4">
                {getLevelMessage()}
              </p>
            </div>
          </div>
        </div>

        {/* Unlock Button */}
        <div className="text-center mb-8">
          <button
            onClick={() => setIsTimelineUnlocked(true)}
            disabled={isTimelineUnlocked}
            className="bg-cyan-600 text-white px-8 py-4 rounded-lg flex items-center gap-2 mx-auto hover:bg-cyan-900 transition-colors disabled:bg-cyan-800 disabled:cursor-not-allowed text-lg font-medium"
          >
            {isTimelineUnlocked ? (
              <>
                <Unlock className="w-6 h-6" />
                Timeline Unlocked
              </>
            ) : (
              <>
                <Lock className="w-6 h-6" />
                Unlock Your Transformation Timeline
              </>
            )}
          </button>
        </div>

        <div className={`transition-all duration-500 ${!isTimelineUnlocked ? 'filter blur-md pointer-events-none' : ''}`}>
          <div className="from-black via-gray-800 to-gray-900 border border-cyan-600 rounded-xl shadow-2xl overflow-hidden">
            <div className="p-8">
              <TimelineDemo />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayScore;