'use client';

import React from 'react';
import { FlipWords } from "./ui/flip-words";

const Home = () => {
    const words = ["Empowering Growth.", "Transforming Efficiency.", "Accelerating Sustainability."];

    return (
        <div id="Home" className="min-h-screen bg-gray-900 text-white overflow-hidden relative">
            {/* Video Background */}
            <video
                autoPlay
                loop
                muted
                className="absolute top-0 left-0 w-full h-full object-cover opacity-70"
                onLoadedMetadata={(e) => e.target.playbackRate = 0.75}
            >
                <source src="/background.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Fading Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-l from-transparent to-gray-900 pointer-events-none"></div>

            {/* Content */}
            <div className="relative flex h-[calc(100vh-80px)]">
                <div className="w-full lg:w-3/5 flex flex-col justify-center lg:pr-14 pt-16 pl-10 leading-normal">
                    <h1 className="text-xl lg:text-[2.5rem] font-bold mb-4 mt-7">
                        Driving Change with Intelligence<br />
                    </h1>
                    <h1 className="text-xl lg:text-[2.5rem] font-bold mb-4 mt-3">
                        <FlipWords words={words} /><br />
                    </h1>
                    <p className="text-gray-400 text-base lg:text-lg mb-8 mt-6 max-w-[600px] text-justify">
                        Welcome to the future of business transformation! Our AI-Driven System helps Indian companies seamlessly adopt Industry 4.0 with tailored timelines, data-driven insights, and structured guidance. Unlock new opportunities, drive innovation, and achieve sustainable growth with us.
                    </p>
                    <button className="bg-white text-black font-bold text-l px-8 py-3 rounded-full w-fit hover:bg-gray-100 transition-colors">
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
