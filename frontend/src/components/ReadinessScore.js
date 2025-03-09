import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ReadinessScore = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { companyName, employees, locationName, industryType } = location.state || {};

  const [responses, setResponses] = useState(Array(50).fill(0));

  const questions = [
    "ERP / Company Website",
    "Internet of Things (IoT)",
    "Artificial Intelligence (AI)",
    "Cybersecurity",
    "Cloud Computing",
    "Research and Development (R&D)",
    "Skill Level",
    "Smart Machines",
    "Customer Integration",
    "Sustainability",
  ];

  const options = [
    [
      "Our ERP integrates seamlessly across departments (e.g., finance, HR, production).",
      "Real-time data analytics is available through our ERP system.",
      "We use ERP data for optimizing inventory and production levels.",
      "Our website/app allows customers to provide feedback.",
      "Customer insights from the website are used to improve operations.",
    ],
    [
      "Our machines and devices are IoT-enabled and connected to a network.",
      "We have a centralized system for real-time monitoring of connected devices.",
      "IoT data is used for predictive maintenance.",
      "IoT data helps in optimizing resource usage.",
      "We use smart sensors to monitor environmental conditions.",
    ],
    [
      "AI is used to predict maintenance needs and prevent machinery breakdowns.",
      "AI helps optimize production workflows.",
      "AI dynamically adjusts production in response to demand fluctuations.",
      "AI is used to analyze customer behavior and improve product offerings.",
      "AI assists in segmenting customers for targeted marketing or recommendations.",
    ],
    [
      "All our data is encrypted both at rest and in transit.",
      "We have a robust backup and recovery system for data protection.",
      "Multi-factor authentication is implemented for accessing critical systems.",
      "Regular reviews and updates are conducted for all access controls.",
      "We have an incident response plan and conduct cybersecurity audits regularly.",
    ],
    [
      "Critical data is stored on cloud servers with redundancy.",
      "Our cloud infrastructure supports scalable storage and processing.",
      "Key applications (e.g., ERP, CRM) are hosted on the cloud.",
      "Our cloud setup is optimized for high availability and low downtime.",
      "Data stored in the cloud is encrypted and has strict access controls.",
    ],
    [
      "We have a dedicated budget for research on Industry 4.0 technologies.",
      "There are active projects exploring AIML or other digital innovations.",
      "Data-driven research informs product development.",
      "Digital simulations or digital twins are used in product design or testing.",
      "We collaborate with external institutions or universities for R&D initiatives.",
    ],
    [
      "Employees are trained in using digital tools like ERP platforms.",
      "The company regularly conducts training and upskilling sessions.",
      "We have specialized staff for data science, cybersecurity, or automation.",
      "There's a structured program to develop technical and digital skills.",
      "Employee skill development is measured and rewarded.",
    ],
    [
      "A significant percentage of our machines are equipped with automation.",
      "Machines adjust operations autonomously based on feedback from sensors.",
      "Sensors on machines collect real-time data for monitoring and reporting.",
      "Machine data is used to improve production efficiency and reduce waste.",
      "Smart machines alert maintenance teams when issues are detected.",
    ],
    [
      "We have a system for collecting and analyzing customer feedback.",
      "Customer feedback informs product improvements or new features.",
      "We use customer data to forecast demand and adjust production.",
      "Insights from customer behavior help in targeted marketing and promotions.",
      "Customers can personalize orders through our online platform.",
    ],
    [
      "Energy consumption is tracked and reported regularly.",
      "Initiatives are in place to reduce energy usage in production processes.",
      "Protocols exist to minimize waste during production.",
      "We have a recycling or repurposing program for materials and by-products.",
      "Sustainable and ethically sourced materials are prioritized in procurement.",
    ],
  ];

  const handleCheckboxChange = (questionIndex, optionIndex, isChecked) => {
    const updatedResponses = [...responses];
    updatedResponses[questionIndex * 5 + optionIndex] = isChecked ? 1 : 0;
    setResponses(updatedResponses);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          responses
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get prediction');
      }

      const data = await response.json();
      
      if (data.status === 'success') {
        navigate('/timeline', { 
            state: { 
                ...location.state,
                score: data.score,
                level: data.level
            }
        });
        window.scrollTo(0, 0); // Ensures the page scrolls to the top
    }else {
        throw new Error(data.error || 'Failed to process prediction');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-800 to-gray-900 text-white flex flex-col items-center relative">
      {/* Home Button */}
      <button
        className="absolute top-3 left-3 bg-none text-white px-4 py-2 rounded"
        onClick={() => navigate("/")}>
        <div className="flex items-center">
          <img 
            src="/logo.png" 
            alt="Tech Star Logo" 
            className="h-10 w-auto mr-3 left-4"
          />
          <span className="left-4 font-bold text-xl bg-gradient-to-r from-cyan-500 to-cyan-700 text-transparent bg-clip-text">
            EvolvX 4.0
          </span>
        </div>
      </button>
      
      <button
        className="absolute top-5 right-28 bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-800"
        onClick={() => navigate("/")}>
        Home
      </button>
      
      <button
        className="absolute top-5 right-6 bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-800">
        Help
      </button>

      {/* Company Details */}
      <div className="flex items-center justify-center w-full mt-20 mb-8">
        <div className="w-1/2 bg-gray-800 p-5 rounded-md shadow-lg flex border border-cyan-600">
          <div className="w-1/3 rounded-full flex justify-center items-center">
            <img
              src="/company.png"
              alt="Company Logo"
              className="rounded-full shadow-md"
            />
          </div>
          <div className="max-w-2xl grid grid-cols-2 gap-4 px-6">
            <div className="bg-gray-700 p-4 rounded shadow-md flex items-center">
              <span className="text-green-400 mr-2">🏦</span>
              <div>
                <p className="font-semibold"></p>
                <p>{companyName || "Not Provided"}</p>
              </div>
            </div>
            <div className="bg-gray-700 p-4 rounded shadow-md flex items-center">
              <span className="text-blue-400 mr-2">👨‍💼</span>
              <div>
                <p className="font-semibold">Employees :</p>
                <p>{employees || "Not Provided"}</p>
              </div>
            </div>
            <div className="bg-gray-700 p-4 rounded shadow-md flex items-center">
              <span className="text-yellow-400 mr-2">🌍</span>
              <div>
                <p className="font-semibold"></p>
                <p>{locationName || "Not Provided"}</p>
              </div>
            </div>
            <div className="bg-gray-700 p-4 rounded shadow-md flex items-center">
              <span className="text-purple-400 mr-2">🏭</span>
              <div>
                <p className="font-semibold"></p>
                <p>{industryType || "Not Provided"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 border border-cyan-600 p-8 mb-6 rounded-lg shadow-lg max-w-2xl w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Readiness Assessment</h2>

        {error && (
          <div className="bg-red-500 text-white p-3 rounded mb-4">
            {error}
          </div>
        )}

        {questions.map((question, qIndex) => (
          <div key={qIndex} className="mb-6">
            <h3 className="font-semibold text-lg mb-2">
              {qIndex + 1}. {question}
            </h3>
            {options[qIndex]?.map((option, oIndex) => (
              <label key={oIndex} className="block mb-1 hover:bg-gray-700 p-2 rounded cursor-pointer">
                <input
                  type="checkbox"
                  className="mr-2"
                  onChange={(e) =>
                    handleCheckboxChange(qIndex, oIndex, e.target.checked)
                  }
                />
                {option}
              </label>
            ))}
          </div>
        ))}

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={isLoading}
            className={`px-6 py-2 rounded text-lg font-semibold shadow-md ${
              isLoading 
                ? 'bg-gray-500 cursor-not-allowed' 
                : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            {isLoading ? 'Processing...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReadinessScore;