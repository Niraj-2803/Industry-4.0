import React from "react";
import { Timeline } from "../components/ui/timeline";

export function TimelineDemo() {
  
  const data = [
    {
      title: "Phase 1: Foundation",
      content: (
        <div>
          {/* Technologies Used Section */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white text-2xl font-semibold">Lets Get Started</h3>
            <a
              href="/phase1" // Replace with your live project link
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 text-white text-xs md:text-sm font-semibold px-3 py-2 rounded-full transition-all duration-300 hover:bg-red-800 hover:text-white"
              onMouseLeave={(e) => (e.target.innerText = "Start Phase 1")}
            >
              Start Phase 1
            </a>
          </div>
    
          {/* Technologies Section */}
          <div className="flex flex-wrap gap-4 mb-6">
            <span className="inline-block border border-cyan-600 text-white px-4 py-1 rounded-full text-xs md:text-sm font-medium transition-all duration-300 hover:bg-gray-300 hover:text-black cursor-pointer">
              Step 1 : ERP
            </span>
            <span className="inline-block border border-cyan-600 text-white px-4 py-1 rounded-full text-xs md:text-sm font-medium transition-all duration-300 hover:bg-gray-300 hover:text-black cursor-pointer">
              Step 2 : IoT
            </span>
          </div>
    
          {/* Content Lines with Cool Bullet Points */}
          <ul className="list-none text-white text-xs md:text-lg font-normal mb-8 space-y-2">
            <li className="flex items-start">
              <span className="bg-yellow-600 w-3 h-3 rounded-full inline-block mt-1 mr-3"></span>
              Leverage analytics for accurate forecasting and strategic planning.
            </li>
            <li className="flex items-start">
              <span className="bg-yellow-600 w-3 h-3 rounded-full inline-block mt-1 mr-3"></span>
              Easily expand capabilities as business requirements grow.
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "Phase 2: Advanced Implementation",
      content: (
        <div>
          {/* Technologies Used Section */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white text-2xl font-semibold mr-3">Lets Get Started</h3>
            <a
              href="/phase2" // Replace with your live project link
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 text-white text-xs md:text-sm font-semibold px-3 py-2 rounded-full transition-all duration-300 hover:bg-red-800 hover:text-white"
              onMouseLeave={(e) => (e.target.innerText = "Start Phase 2")}
            >
              Start Phase 2
            </a>
          </div>
    
          {/* Technologies Section */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="inline-block border border-cyan-600 text-white px-3 py-1 rounded-full text-xs md:text-sm font-medium transition-all duration-300 hover:bg-gray-300 hover:text-black cursor-pointer">
              Step 3 : AI
            </span>
            <span className="inline-block border border-cyan-600 text-white px-3 py-1 rounded-full text-xs md:text-sm font-medium transition-all duration-300 hover:bg-gray-300 hover:text-black cursor-pointer">
              Step 4 : CS
            </span>
            <span className="inline-block border border-cyan-600 text-white px-3 py-1 rounded-full text-xs md:text-sm font-medium transition-all duration-300 hover:bg-gray-300 hover:text-black cursor-pointer">
              Step 5 : CC
            </span>
          </div>
    
          {/* Content Lines with Cool Bullet Points */}
          <ul className="list-none text-white text-xs md:text-lg font-normal mb-8 space-y-2">
            <li className="flex items-start">
              <span className="bg-yellow-600 w-3 h-3 rounded-full inline-block mt-1 mr-3"></span>
              Utilize AI-driven insights for precise decision-making and adaptive strategies.
            </li>
            <li className="flex items-start">
              <span className="bg-yellow-600 w-3 h-3 rounded-full inline-block mt-1 mr-3"></span>
              Effortlessly scale infrastructure to meet dynamic workload demands.
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "Phase 3: Integration and Scalability",
      content: (
        <div>
          {/* Technologies Used Section */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white text-2xl font-semibold mr-3">Lets Get Started</h3>
            <a
              href="/phase3" // Replace with your live project link
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 text-white text-xs md:text-sm font-semibold px-3 py-2 rounded-full transition-all duration-300 hover:bg-red-800 hover:text-white"
              onMouseLeave={(e) => (e.target.innerText = "Start Phase 2")}
            >
              Start Phase 3
            </a>
          </div>
    
          {/* Technologies Section */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="inline-block border border-cyan-600 text-white px-3 py-1 rounded-full text-xs md:text-sm font-medium transition-all duration-300 hover:bg-gray-300 hover:text-black cursor-pointer">
              Step 6 : R&D
            </span>
            <span className="inline-block border border-cyan-600 text-white px-3 py-1 rounded-full text-xs md:text-sm font-medium transition-all duration-300 hover:bg-gray-300 hover:text-black cursor-pointer">
              Step 7 : Skill Level
            </span>
          </div>
    
          {/* Content Lines with Cool Bullet Points */}
          <ul className="list-none text-white text-xs md:text-lg font-normal mb-8 space-y-2">
            <li className="flex items-start">
              <span className="bg-yellow-600 w-3 h-3 rounded-full inline-block mt-1 mr-3"></span>
              Foster a data-driven approach to drive strategic advancements in research.
            </li>
            <li className="flex items-start">
              <span className="bg-yellow-600 w-3 h-3 rounded-full inline-block mt-1 mr-3"></span>
              Enhance expertise through hands-on simulations and real-time feedback.
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "Phase 4: Optimization and Sustainability",
      content: (
        <div>
          {/* Technologies Used Section */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white text-2xl font-semibold mr-3">Lets Get Started</h3>
            <a
              href="/phase4" // Replace with your live project link
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 text-white text-xs md:text-sm font-semibold px-3 py-2 rounded-full transition-all duration-300 hover:bg-red-800 hover:text-white"
              onMouseLeave={(e) => (e.target.innerText = "Start Phase 2")}
            >
              Start Final Phase
            </a>
          </div>
    
          {/* Technologies Section */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="inline-block border border-cyan-600 text-white px-3 py-1 rounded-full text-xs md:text-sm font-medium transition-all duration-300 hover:bg-gray-300 hover:text-black cursor-pointer">
              Step 8 : Smart Machines
            </span>
            <span className="inline-block border border-cyan-600 text-white px-3 py-1 rounded-full text-xs md:text-sm font-medium transition-all duration-300 hover:bg-gray-300 hover:text-black cursor-pointer">
              Step 9 : CI
            </span>
            <span className="inline-block border border-cyan-600 text-white px-3 py-1 rounded-full text-xs md:text-sm font-medium transition-all duration-300 hover:bg-gray-300 hover:text-black cursor-pointer">
              Step 10 : Sustainability
            </span>
          </div>
    
          {/* Content Lines with Cool Bullet Points */}
          <ul className="list-none text-white text-xs md:text-lg font-normal mb-8 space-y-2">
            <li className="flex items-start">
              <span className="bg-yellow-600 w-3 h-3 rounded-full inline-block mt-1 mr-3"></span>
              Seamlessly refine processes to adapt to evolving industry standards.
            </li>
            <li className="flex items-start">
              <span className="bg-yellow-600 w-3 h-3 rounded-full inline-block mt-1 mr-3"></span>
              Automate feedback loops for sustained operational excellence.
            </li>
          </ul>
        </div>
      ),
    },
    
  ];
  return (
    (<div className="w-full">
      <Timeline data={data} />
    </div>)
  );
}