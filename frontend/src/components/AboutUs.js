import React from 'react';

const AboutUs = () => {
  return (
    <div section id="about" className="bg-zinc-200 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        {/* Text Content Section */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">About EvolvX 4.0</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed text-justify">
          <p className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 mt-1 flex-shrink-0 text-blue-600">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              EvolvX is an AI-driven platform designed to accelerate Industry 4.0 adoption by providing businesses with a customized roadmap for digital transformation. By connecting companies with the right vendors and expert counsellors, we ensure a seamless transition to smart manufacturing, automation, and AI integration.
            </p>
            <p className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 mt-1 flex-shrink-0 text-blue-600">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              With India lagging behind in Industry 4.0 adoption, EvolvX takes a data-driven approach to bridge this gap. Our system tailors implementation timelines, optimizes strategies, and incorporates relevant government benefits, helping businesses maximize efficiency, profitability, and sustainability. EvolvX enables companies to make informed decisions.
            </p>
            <p className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 mt-1 flex-shrink-0 text-blue-600">
                <path d="M7 10l5 5 5-5"></path>
                <path d="M9 13l2.5 2.5L14 12"></path>
                <rect x="2" y="4" width="20" height="16" rx="2"></rect>
              </svg>
              Whether upgrading existing systems or adopting cutting-edge innovations, EvolvX empowers industries to evolve and stay competitive in the future-ready industrial landscape.
            </p>
            
          </div>
        </div>

        {/* Animated GIF Section */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden flex justify-center items-center">
            <img 
              src="/Gifs/Gif2.jpg" 
              alt="Assembly Line Automation" 
              className="w-auto h-auto max-h-48 max-w-full transform hover:scale-110 transition duration-300"
            />
          </div>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden flex justify-center items-center">
            <img 
              src="/Gifs/Gif3.jpg" 
              alt="Robotic Automation" 
              className="w-auto h-auto max-h-48 max-w-full transform hover:scale-110 transition duration-300"
            />
          </div>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden flex justify-center items-center">
            <img 
              src="/Gifs/GIf1.jpg" 
              alt="Custom Automation Solutions" 
              className="w-auto h-auto max-h-48 max-w-full transform hover:scale-110 transition duration-300"
            />
          </div>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden flex justify-center items-center">
            <img 
              src="/Gifs/Gif4.jpg" 
              alt="Industrial Control Systems" 
              className="w-auto h-auto max-h-48 max-w-full transform hover:scale-110 transition duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
