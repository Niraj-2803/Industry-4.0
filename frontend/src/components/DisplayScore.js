"use client"

import { useState, useEffect } from "react"
import { Lock, Unlock, Info } from "lucide-react"
import { TimelineDemo } from "./Timeline"
import { useLocation, useNavigate } from "react-router-dom"
import { ReportGenerator } from "./report-generator"

// Semi-circle progress component with tooltip for phase completion
const SemiCircleProgress = ({ percentage, title, color, description }) => {
  const radius = 40
  const diameter = radius * 2
  const circumference = Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div className="flex flex-col items-center bg-gray-900/50 p-4 rounded-lg border border-gray-800 hover:border-cyan-800 transition-all duration-300">
      <div className="relative">
        <svg width={diameter} height={radius + 10} viewBox={`0 0 ${diameter} ${radius + 5}`}>
          {/* Background semi-circle */}
          <path
            d={`M ${diameter},${radius} a ${radius},${radius} 0 0,0 -${diameter},0`}
            fill="transparent"
            stroke="#333"
            strokeWidth="8"
          />
          {/* Foreground semi-circle */}
          <path
            d={`M ${diameter},${radius} a ${radius},${radius} 0 0,0 -${diameter},0`}
            fill="transparent"
            stroke={color}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
            strokeLinecap="round"
          />
          {/* Percentage text */}
          <text x="50%" y="75%" textAnchor="middle" fill="white" className="text-lg font-bold">
            {percentage}%
          </text>
        </svg>
      </div>
      <div className="relative w-full mt-3">
        <div className="flex justify-between items-center">
          <h3 className="text-gray-300 text-sm font-medium">{title}</h3>
          <div className="relative">
            <button
              className="text-gray-400 hover:text-cyan-400 transition-colors"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <Info size={16} />
            </button>
            {showTooltip && (
              <div className="absolute right-0 bottom-full mb-2 w-48 text-xs text-gray-300 bg-black/80 p-2 rounded border border-gray-700 shadow-lg z-10">
                {description}
                <div className="absolute w-2 h-2 bg-black/80 border-r border-b border-gray-700 transform rotate-45 right-2 -bottom-1"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const FormalCircularProgress = ({ percentage }) => {
  const radius = 60
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg className="transform -rotate-90 w-48 h-48">
        <circle
          cx="96"
          cy="96"
          r={radius}
          stroke="currentColor"
          strokeWidth="10"
          fill="transparent"
          className="text-gray-800"
        />
        <circle
          cx="96"
          cy="96"
          r={radius}
          stroke="currentColor"
          strokeWidth="10"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="text-cyan-700 transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-3xl font-semibold text-gray-200">
          {percentage.toFixed(1)}
          <span className="text-3xl text-gray-400">%</span>
        </span>
      </div>
    </div>
  )
}

const DisplayScore = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [isTimelineUnlocked, setIsTimelineUnlocked] = useState(false)
  const [animatedScore, setAnimatedScore] = useState(0)
  const [animatedPhases, setAnimatedPhases] = useState({
    phase1: 0,
    phase2: 0,
    phase3: 0,
    phase4: 0,
  })

  // Sample phase data (in a real app, this would come from your assessment)
  const phaseData = {
    phase1: 31, // 45% complete
    phase2: 23, // 32% complete
    phase3: 19, // 28% complete
    phase4: 21, // 21% complete
  }

  // Phase descriptions
  const phaseDescriptions = {
    phase1:
      "Your systems show foundational connectivity but require enhanced integration between operational technology and IT systems.",
    phase2:
      "Data visibility needs improvement to enable better real-time monitoring and decision making across your production processes.",
    phase3:
      "Your predictive capabilities are developing. Advanced analytics could help forecast maintenance needs and production outcomes.",
    phase4:
      "Autonomous systems adoption is in early stages. Focus on implementing self-optimizing processes for greater adaptability.",
  }

  // Get score and level from navigation state
  const { score, level } = location.state || { score: 14.2, level: "Basic" }

  useEffect(() => {
    // Animate the score from 0 to the actual value
    const duration = 1500 // Animation duration in milliseconds
    const steps = 60 // Number of steps in the animation
    const stepDuration = duration / steps
    const increment = score / steps

    let currentStep = 0

    const timer = setInterval(() => {
      if (currentStep < steps) {
        setAnimatedScore((prev) => Math.min(prev + increment, score))

        // Animate phase percentages
        setAnimatedPhases((prev) => ({
          phase1: Math.min(prev.phase1 + phaseData.phase1 / steps, phaseData.phase1),
          phase2: Math.min(prev.phase2 + phaseData.phase2 / steps, phaseData.phase2),
          phase3: Math.min(prev.phase3 + phaseData.phase3 / steps, phaseData.phase3),
          phase4: Math.min(prev.phase4 + phaseData.phase4 / steps, phaseData.phase4),
        }))

        currentStep++
      } else {
        clearInterval(timer)
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [score])

  const handleBack = () => {
    navigate("/assessment")
  }

  const getLevelMessage = () => {
    switch (level) {
      case "Leader":
        return "Outstanding! Your organization shows excellent Industry 4.0 readiness."
      case "Advanced":
        return "Good progress! Some areas need attention for optimal Industry 4.0 readiness."
      case "Developing":
        return "You're on your way. Let's focus on key improvement areas."
      default:
        return "We've identified several opportunities to enhance your Industry 4.0 capabilities."
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-800 to-gray-900 text-gray-100">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Back button */}
        <button
          onClick={handleBack}
          className="mb-6 px-4 py-2 text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
        >
          <span className="transform transition-transform group-hover:-translate-x-1">←</span> Back to Assessment
        </button>

        {/* Enhanced Score Card with Phase Graphs - Reduced border emphasis */}
        <div className="bg-gradient-to-b from-black to-gray-900 rounded-xl shadow-2xl mb-6 overflow-hidden border border-gray-700 relative">
          <div className="absolute inset-0 bg-cyan-900/5"></div>
          {/* Reduced brightness of top border */}
          <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-cyan-800 via-blue-800 to-purple-800 opacity-60"></div>
          <div className="p-6 relative z-10">
            {/* Reduced brightness of heading */}
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-400">Industry 4.0 Readiness Dashboard</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left side - Overall score with formal design */}
              <div className="flex flex-col items-center justify-start border-r border-gray-800 pr-4">
                <h3 className="text-xl text-gray-400 mb-2 font-medium">Overall Score</h3>

                <div className="flex flex-col items-center">
                  {/* More formal overall score UI */}
                  <FormalCircularProgress percentage={animatedScore} />

                  {/* Level below score */}
                  <div className="-mt-2.5 text-center mb-2">
                    <span className="inline-block bg-gray-800 text-gray-300 px-3 py-1 rounded text-sm font-medium">
                      {level} Level
                    </span>
                  </div>

                  {/* Message positioned closer to level indicator */}
                  <p className="text-sm text-gray-400 text-center max-w-md mt-1 border-l-2 border-gray-600 pl-3 py-1">
                    {getLevelMessage()}
                  </p>
                </div>
              </div>

              {/* Right side - Phase completion */}
              <div className="flex flex-col">
                <h3 className="text-xl text-gray-400 mb-3 text-center font-medium">Implementation Progress</h3>

                {/* Grid for the four cards */}
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <SemiCircleProgress
                    percentage={Math.round(animatedPhases.phase1)}
                    title="Foundation"
                    color="#22d3ee"
                    description={phaseDescriptions.phase1}
                  />
                  <SemiCircleProgress
                    percentage={Math.round(animatedPhases.phase2)}
                    title="Advanced"
                    color="#0ea5e9"
                    description={phaseDescriptions.phase2}
                  />
                  <SemiCircleProgress
                    percentage={Math.round(animatedPhases.phase3)}
                    title="Integration"
                    color="#2563eb"
                    description={phaseDescriptions.phase3}
                  />
                  <SemiCircleProgress
                    percentage={Math.round(animatedPhases.phase4)}
                    title="Optimization"
                    color="#7c3aed"
                    description={phaseDescriptions.phase4}
                  />
                </div>
              </div>
            </div>

            {/* Download Report Button */}
            <div className="mt-6 flex justify-center">
              <ReportGenerator score={score} phaseData={phaseData} />
            </div>
          </div>
        </div>

        {/* Unlock Button - Toned down colors */}
        <div className="text-center mb-6">
          <button
            onClick={() => setIsTimelineUnlocked(true)}
            disabled={isTimelineUnlocked}
            className="bg-gradient-to-r from-cyan-800 to-blue-900 text-gray-200 px-8 py-3 rounded-lg flex items-center gap-2 mx-auto hover:from-cyan-900 hover:to-blue-950 transition-all disabled:opacity-70 disabled:cursor-not-allowed text-lg font-medium shadow-md"
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

        <div
          className={`transition-all duration-500 ${!isTimelineUnlocked ? "filter blur-md pointer-events-none" : ""}`}
        >
          <div className="bg-gradient-to-b from-black to-gray-900 border border-gray-700 rounded-xl shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-cyan-800 via-blue-800 to-purple-800 opacity-60"></div>
            <div className="p-6 relative">
              <TimelineDemo />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DisplayScore