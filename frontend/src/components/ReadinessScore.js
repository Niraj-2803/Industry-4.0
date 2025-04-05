"use client"

import { useState, useEffect, useRef } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import {
  CheckCircle,
  AlertCircle,
  Home,
  HelpCircle,
  Building,
  Users,
  MapPin,
  Factory,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Shield,
  Cloud,
  Database,
  Zap,
  LineChart,
  SettingsIcon,
  Globe,
  PieChart,
  Leaf,
  ArrowRight,
  X,
  Info,
} from "lucide-react"

const ReadinessScore = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [activeSection, setActiveSection] = useState(0)
  const [progress, setProgress] = useState(0)
  const [showTip, setShowTip] = useState(false)
  const [tipIndex, setTipIndex] = useState(0)
  const [showCompanyForm, setShowCompanyForm] = useState(!location.state)
  const [companyData, setCompanyData] = useState({
    companyName: location.state?.companyName || "",
    employees: location.state?.employees || "",
    locationName: location.state?.locationName || "",
    industryType: location.state?.industryType || "",
  })
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const formRef = useRef(null)

  // Category icons mapping for visual enhancement
  const categoryIcons = [
    <Database key="database" size={22} />,
    <Cpu key="cpu" size={22} />,
    <Globe key="globe" size={22} />,
    <Shield key="shield" size={22} />,
    <Cloud key="cloud" size={22} />,
    <SettingsIcon key="settings" size={22} />,
    <Users key="users" size={22} />,
    <Zap key="zap" size={22} />,
    <LineChart key="linechart" size={22} />,
    <Leaf key="leaf" size={22} />,
  ]

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
  ]

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
      "Compliance with ISO 45001 standards ensures a safe and healthy workplace for employees.",
      "A structured environmental management system, in accordance with ISO 14001, is actively maintained.",
      "Supply chain operations align with ISO 28000 standards for security management.",
      "Product lifecycle assessments are conducted as per ISO 14040 to minimize environmental impact.",
      "Data privacy and protection policies comply with ISO/IEC 27701 standards.",
    ],
  ]

  // Tips for each category to help users understand what they're evaluating
  const categoryTips = [
    "ERP systems integrate business processes. Advanced implementations connect all departments in real-time.",
    "IoT connects physical devices to networks, enabling data collection and remote monitoring.",
    "AI systems can predict maintenance needs, optimize workflows, and personalize customer experiences.",
    "Strong cybersecurity includes encryption, access controls, and incident response planning.",
    "Cloud computing provides scalable resources and enables remote access to applications and data.",
    "R&D in Industry 4.0 focuses on digital innovation, simulations, and data-driven product development.",
    "Digital skills are crucial for Industry 4.0. Training programs should develop technical competencies.",
    "Smart machines can self-adjust, collect data, and alert maintenance teams to potential issues.",
    "Customer integration involves using feedback and data to improve products and personalize experiences.",
    "Sustainability in Industry 4.0 includes energy monitoring, waste reduction, and ethical sourcing.",
  ]

  // Initialize responses from localStorage if available, otherwise use default
  const [responses, setResponses] = useState(() => {
    const savedResponses = localStorage.getItem("industry40_responses")
    return savedResponses ? JSON.parse(savedResponses) : Array(50).fill(0)
  })

  // Save responses to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("industry40_responses", JSON.stringify(responses))
  }, [responses])

  // Save active section to localStorage
  useEffect(() => {
    localStorage.setItem("industry40_activeSection", activeSection.toString())
  }, [activeSection])

  // Restore active section from localStorage on initial load
  useEffect(() => {
    const savedSection = localStorage.getItem("industry40_activeSection")
    if (savedSection) {
      setActiveSection(Number.parseInt(savedSection, 10))
    }
  }, [])

  // Save company data to localStorage
  useEffect(() => {
    localStorage.setItem("industry40_companyData", JSON.stringify(companyData))
  }, [companyData])

  // Restore company data from localStorage on initial load
  useEffect(() => {
    const savedCompanyData = localStorage.getItem("industry40_companyData")
    if (savedCompanyData) {
      setCompanyData(JSON.parse(savedCompanyData))
    }
  }, [])

  // Calculate progress whenever responses change
  useEffect(() => {
    const checkedCount = responses.filter((r) => r === 1).length
    const totalCount = responses.length
    setProgress((checkedCount / totalCount) * 100)
  }, [responses])

  // Show random tips occasionally
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setTipIndex(activeSection)
        setShowTip(true)
        setTimeout(() => setShowTip(false), 5000)
      }
    }, 10000)

    return () => clearInterval(interval)
  }, [activeSection])

  const handleCheckboxChange = (questionIndex, optionIndex, isChecked) => {
    const updatedResponses = [...responses]
    updatedResponses[questionIndex * 5 + optionIndex] = isChecked ? 1 : 0
    setResponses(updatedResponses)

    // Provide visual feedback when checking items
    if (isChecked) {
      const checkbox = document.createElement("div")
      checkbox.className = "checkbox-pulse"
      formRef.current.appendChild(checkbox)
      setTimeout(() => checkbox.remove(), 500)
    }
  }

  const handleCompanyDataChange = (e) => {
    const { name, value } = e.target
    setCompanyData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCompanyFormSubmit = (e) => {
    e.preventDefault()
    setShowCompanyForm(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("https://industry-4-0-1.onrender.com/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          responses,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get prediction")
      }

      const data = await response.json()

      if (data.status === "success") {
        // Show success message
        setShowSuccessMessage(true)

        // Navigate after a short delay to show the success message
        setTimeout(() => {
          // Clear form data from localStorage after successful submission
          localStorage.removeItem("industry40_responses")
          localStorage.removeItem("industry40_activeSection")

          navigate("/timeline", {
            state: {
              ...companyData,
              score: data.score,
              level: data.level,
            },
          })
          window.scrollTo(0, 0)
        }, 2000)
      } else {
        throw new Error(data.error || "Failed to process prediction")
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleNext = () => {
    if (activeSection < questions.length - 1) {
      setActiveSection(activeSection + 1)
      // Smooth scroll to top of form
      document.getElementById("assessment-form").scrollIntoView({ behavior: "smooth" })
    }
  }

  const handlePrevious = () => {
    if (activeSection > 0) {
      setActiveSection(activeSection - 1)
      document.getElementById("assessment-form").scrollIntoView({ behavior: "smooth" })
    }
  }

  // Calculate section completion
  const getSectionCompletion = (sectionIndex) => {
    const startIdx = sectionIndex * 5
    const endIdx = startIdx + 5
    const sectionResponses = responses.slice(startIdx, endIdx)
    return sectionResponses.filter((r) => r === 1).length
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-900 text-white flex flex-col items-center relative">
      {/* Animated background overlay */}
      <div className="fixed inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-gray-800 bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      </div>

      {/* Success message */}
      {showSuccessMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-gray-800 rounded-xl p-6 shadow-2xl border border-green-600/30 max-w-md animate-fadeIn">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-green-600/20 flex items-center justify-center">
                <CheckCircle size={24} className="text-green-500" />
              </div>
              <h3 className="text-xl font-bold text-white">Assessment Submitted</h3>
            </div>
            <p className="text-gray-300 mb-4">
              Thank you for completing the Industry 4.0 readiness assessment. Your results are being processed.
            </p>
            <p className="text-gray-400 text-sm">You will be redirected to the results page shortly...</p>
          </div>
        </div>
      )}

      {/* Header with navigation */}
      <header className="w-full bg-gray-900 bg-opacity-80 backdrop-blur-md py-3 px-4 flex justify-between items-center fixed top-0 z-10 shadow-xl border-b border-cyan-800/50">
        <button
          className="flex items-center text-white hover:text-cyan-400 transition-colors"
          onClick={() => navigate("/")}
        >
          <div className="relative">
            <img src="/logo.png" alt="4.0 logo" className="h-12 w-auto mr-3" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-400 rounded-full animate-pulse"></div>
          </div>
          <span className="font-bold text-2xl bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-500 text-transparent bg-clip-text drop-shadow-lg">
            EvolvX
          </span>
        </button>

        <div className="flex gap-3">
          <button
            className="flex items-center gap-2 bg-gray-800/80 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-all shadow-lg hover:shadow-cyan-900/20 border border-gray-700 hover:border-cyan-700"
            onClick={() => navigate("/")}
          >
            <Home size={18} className="text-cyan-400" />
            <span className="hidden sm:inline font-medium">Home</span>
          </button>

          <button className="flex items-center gap-2 bg-gray-800/80 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-all shadow-lg hover:shadow-cyan-900/20 border border-gray-700 hover:border-cyan-700">
            <HelpCircle size={18} className="text-cyan-400" />
            <span className="hidden sm:inline font-medium">Help</span>
          </button>
        </div>
      </header>

      <div className="w-full max-w-6xl mt-28 mb-10 px-4 relative z-1" ref={formRef}>
        {/* Company Information Form */}
        {showCompanyForm && (
          <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className="bg-gray-800 rounded-2xl shadow-2xl border border-cyan-800/30 p-6 max-w-md w-full animate-fadeIn">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-cyan-400 flex items-center gap-2">
                  <Building size={20} />
                  Company Information
                </h2>
                <button onClick={() => setShowCompanyForm(false)} className="text-gray-400 hover:text-white">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleCompanyFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Company Name</label>
                  <input
                    type="text"
                    name="companyName"
                    value={companyData.companyName}
                    onChange={handleCompanyDataChange}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="Enter company name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Number of Employees</label>
                  <select
                    name="employees"
                    value={companyData.employees}
                    onChange={handleCompanyDataChange}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select employee count</option>
                    <option value="1-10">1-10</option>
                    <option value="11-50">11-50</option>
                    <option value="51-200">51-200</option>
                    <option value="201-500">201-500</option>
                    <option value="501-1000">501-1000</option>
                    <option value="1000+">1000+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Location</label>
                  <input
                    type="text"
                    name="locationName"
                    value={companyData.locationName}
                    onChange={handleCompanyDataChange}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="City, Country"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Industry Type</label>
                  <select
                    name="industryType"
                    value={companyData.industryType}
                    onChange={handleCompanyDataChange}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select industry</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Technology">Technology</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Retail">Retail</option>
                    <option value="Finance">Finance</option>
                    <option value="Energy">Energy</option>
                    <option value="Automotive">Automotive</option>
                    <option value="Agriculture">Agriculture</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-cyan-600 to-cyan-500 text-white font-medium rounded-lg shadow-lg hover:shadow-cyan-900/30 transition-all flex items-center justify-center gap-2"
                >
                  Start Assessment
                  <ArrowRight size={18} />
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Tip popup */}
        {showTip && (
          <div className="fixed bottom-4 right-4 max-w-xs bg-gradient-to-r from-cyan-900 to-gray-800 p-4 rounded-xl shadow-xl border border-cyan-700/50 animate-fadeIn z-30">
            <div className="flex items-start gap-3">
              <div className="mt-1 text-cyan-400">
                <Info size={20} />
              </div>
              <div>
                <h4 className="font-medium text-cyan-300 mb-1">Tip: {questions[tipIndex]}</h4>
                <p className="text-sm text-gray-300">{categoryTips[tipIndex]}</p>
              </div>
              <button onClick={() => setShowTip(false)} className="text-gray-400 hover:text-white mt-1">
                <X size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Progress bar with animated glow */}
        <div className="mb-8 bg-gray-800/80 backdrop-blur-md rounded-xl border border-gray-700 p-5 shadow-lg hover:shadow-cyan-900/20 transition-all duration-300">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <PieChart size={20} className="text-cyan-400" />
              <span className="text-sm font-medium text-cyan-400">Assessment Progress</span>
            </div>
            <div className="bg-gray-700 px-3 py-1 rounded-full text-sm font-medium text-cyan-300">
              {Math.round(progress)}%
            </div>
          </div>
          <div className="w-full bg-gray-700/50 rounded-full h-3 backdrop-blur-sm">
            <div
              className="bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-500 h-3 rounded-full transition-all duration-500 ease-out shadow-lg shadow-cyan-900/50"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Progress statistics */}
          <div className="flex justify-between mt-3 text-xs text-gray-400">
            <div>
              Completed: {responses.filter((r) => r === 1).length}/{responses.length} items
            </div>
            <div>
              Sections: {questions.filter((_, idx) => getSectionCompletion(idx) > 0).length}/{questions.length} started
            </div>
          </div>
        </div>

        {/* Company Details Card */}
        <div className="bg-gray-800/90 rounded-2xl shadow-2xl overflow-hidden border border-gray-700/70 mb-8 transform hover:scale-[1.01] transition-transform duration-300 backdrop-blur-md">
          <div className="p-5 bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700/70 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-600 to-cyan-400 flex items-center justify-center shadow-lg">
              <Building size={20} className="text-gray-900" />
            </div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-white to-cyan-300 text-transparent bg-clip-text">
              Company Profile
            </h2>

            <button
              onClick={() => setShowCompanyForm(true)}
              className="ml-auto text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded text-cyan-300 flex items-center gap-1"
            >
              <SettingsIcon size={12} />
              Edit
            </button>
          </div>
          <div className="p-6 flex flex-col md:flex-row gap-6">
            <div className="md:w-1/4 flex justify-center">
              <div className="w-36 h-36 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-700 flex items-center justify-center shadow-lg relative group">
                <Building size={70} className="text-white group-hover:scale-110 transition-transform duration-300" />
                {/* Decorative circles */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <div className="absolute inset-0 rounded-full border border-cyan-500/50"></div>
              </div>
            </div>
            <div className="md:w-3/4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-gray-700/50 to-gray-800/50 p-5 rounded-xl shadow-lg flex items-center gap-4 hover:shadow-cyan-900/10 transition-all border border-gray-700/50 group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-900 to-cyan-700 flex items-center justify-center shadow-md group-hover:shadow-cyan-700/30 transition-all">
                  <Building size={24} className="text-cyan-300 group-hover:text-cyan-200 transition-colors" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider">Company Name</p>
                  <p className="font-medium text-lg text-white">{companyData.companyName || "Not Provided"}</p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-gray-700/50 to-gray-800/50 p-5 rounded-xl shadow-lg flex items-center gap-4 hover:shadow-cyan-900/10 transition-all border border-gray-700/50 group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-900 to-cyan-700 flex items-center justify-center shadow-md group-hover:shadow-cyan-700/30 transition-all">
                  <Users size={24} className="text-cyan-300 group-hover:text-cyan-200 transition-colors" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider">Employees</p>
                  <p className="font-medium text-lg text-white">{companyData.employees || "Not Provided"}</p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-gray-700/50 to-gray-800/50 p-5 rounded-xl shadow-lg flex items-center gap-4 hover:shadow-cyan-900/10 transition-all border border-gray-700/50 group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-900 to-cyan-700 flex items-center justify-center shadow-md group-hover:shadow-cyan-700/30 transition-all">
                  <MapPin size={24} className="text-cyan-300 group-hover:text-cyan-200 transition-colors" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider">Location</p>
                  <p className="font-medium text-lg text-white">{companyData.locationName || "Not Provided"}</p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-gray-700/50 to-gray-800/50 p-5 rounded-xl shadow-lg flex items-center gap-4 hover:shadow-cyan-900/10 transition-all border border-gray-700/50 group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-900 to-cyan-700 flex items-center justify-center shadow-md group-hover:shadow-cyan-700/30 transition-all">
                  <Factory size={24} className="text-cyan-300 group-hover:text-cyan-200 transition-colors" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider">Industry Type</p>
                  <p className="font-medium text-lg text-white">{companyData.industryType || "Not Provided"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Assessment Form */}
        <form
          id="assessment-form"
          onSubmit={handleSubmit}
          className="bg-gray-800/90 border border-gray-700/70 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-md"
        >
          <div className="p-5 bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700/70 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="hidden md:flex w-10 h-10 rounded-full bg-gradient-to-br from-cyan-600 to-cyan-400 items-center justify-center shadow-lg">
                <Cpu size={20} className="text-gray-900" />
              </div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-white to-cyan-300 text-transparent bg-clip-text">
                Industry 4.0 Readiness Assessment
              </h2>
            </div>
            <div className="bg-gray-700/80 px-3 py-1 rounded-full text-sm font-medium text-cyan-300 border border-gray-600">
              Section {activeSection + 1} of {questions.length}
            </div>
          </div>

          {error && (
            <div className="m-5 bg-gradient-to-r from-red-900/60 to-red-800/60 border border-red-700/50 text-white p-4 rounded-xl flex items-center gap-3 shadow-lg">
              <div className="w-10 h-10 rounded-full bg-red-800 flex items-center justify-center">
                <AlertCircle size={20} className="text-red-300" />
              </div>
              <div>
                <h4 className="font-semibold text-red-300">Error Occurred</h4>
                <p className="text-sm">{error}</p>
              </div>
            </div>
          )}

          {/* Simplified section navigation - replaced the slider with icon buttons */}
          <div className="flex overflow-x-auto py-3 px-4 gap-2 border-b border-gray-700/50 bg-gray-800/30">
            {questions.map((_, index) => {
              const completion = getSectionCompletion(index)
              const isActive = activeSection === index

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveSection(index)}
                  className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all ${
                    isActive
                      ? "bg-gradient-to-br from-cyan-900/70 to-cyan-800/70 shadow-lg border border-cyan-700/50"
                      : "bg-gray-700/40 hover:bg-gray-700/70 border border-gray-600/30"
                  }`}
                >
                  <div
                    className={`relative ${
                      completion === 5 ? "text-green-400" : isActive ? "text-cyan-400" : "text-gray-400"
                    }`}
                  >
                    {categoryIcons[index]}
                    {completion > 0 && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gray-800 flex items-center justify-center text-[10px] font-bold">
                        {completion}
                      </div>
                    )}
                  </div>
                </button>
              )
            })}
          </div>

          <div className="p-6">
            {/* Current section */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-800 to-cyan-600 flex items-center justify-center shadow-lg">
                  {categoryIcons[activeSection]}
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-cyan-300 text-transparent bg-clip-text">
                    {questions[activeSection]}
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">
                    Select all statements that apply to your organization's capabilities
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setTipIndex(activeSection)
                    setShowTip(true)
                  }}
                  className="ml-auto bg-gray-700/50 hover:bg-gray-600/70 w-8 h-8 rounded-full flex items-center justify-center text-cyan-400"
                >
                  <Info size={16} />
                </button>
              </div>

              <div className="space-y-4">
                {options[activeSection]?.map((option, oIndex) => {
                  const responseIndex = activeSection * 5 + oIndex
                  const isChecked = responses[responseIndex] === 1

                  return (
                    <label
                      key={oIndex}
                      className={`block p-5 rounded-xl cursor-pointer transition-all duration-300 border ${
                        isChecked
                          ? "bg-gradient-to-br from-cyan-900/30 to-cyan-800/30 border-cyan-700/70 shadow-md"
                          : "bg-gradient-to-br from-gray-700/40 to-gray-800/40 border-gray-600/50 hover:border-gray-500"
                      } group`}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`mt-0.5 w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 transition-all group-hover:shadow-cyan-900/30 ${
                            isChecked
                              ? "bg-gradient-to-br from-cyan-500 to-cyan-700 shadow-md"
                              : "border-2 border-gray-500 group-hover:border-cyan-500"
                          }`}
                        >
                          {isChecked && <CheckCircle size={16} className="text-white" />}
                        </div>
                        <div>
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={isChecked}
                            onChange={(e) => handleCheckboxChange(activeSection, oIndex, e.target.checked)}
                          />
                          <p
                            className={`${isChecked ? "text-white font-medium" : "text-gray-300"} text-base leading-relaxed transition-colors`}
                          >
                            {option}
                          </p>
                        </div>
                      </div>
                    </label>
                  )
                })}
              </div>
            </div>

            {/* Navigation buttons - Enhanced with better styling and animations */}
            <div className="flex justify-between mt-10">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={activeSection === 0}
                className={`px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all ${
                  activeSection === 0
                    ? "bg-gray-700/50 text-gray-500 cursor-not-allowed border border-gray-700"
                    : "bg-gray-700/70 hover:bg-gray-600 text-white hover:shadow-lg border border-gray-600 hover:border-gray-500"
                }`}
              >
                <ChevronLeft size={20} className={activeSection === 0 ? "text-gray-500" : "text-cyan-400"} />
                Previous
              </button>

              {activeSection < questions.length - 1 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-3 rounded-xl font-medium bg-gradient-to-r from-cyan-700 to-cyan-600 hover:from-cyan-600 hover:to-cyan-500 text-white flex items-center gap-2 shadow-lg hover:shadow-cyan-900/30 transition-all border border-cyan-600"
                >
                  Next
                  <ChevronRight size={20} />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`px-8 py-3 rounded-xl font-semibold shadow-lg transition-all flex items-center gap-3 ${
                    isLoading
                      ? "bg-gray-600/70 cursor-not-allowed border border-gray-500"
                      : "bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white hover:shadow-emerald-900/30 border border-emerald-500"
                  }`}
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      Submit Assessment
                      <CheckCircle size={20} />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(2); opacity: 0; }
        }
        
        .checkbox-pulse {
          position: absolute;
          width: 20px;
          height: 20px;
          background: rgba(0, 255, 255, 0.3);
          border-radius: 50%;
          animation: pulse 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

export default ReadinessScore