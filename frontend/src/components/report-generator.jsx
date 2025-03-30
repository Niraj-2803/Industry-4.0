"use client"
import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"
import { FileDown } from "lucide-react"
import ReactDOM from "react-dom"

// Chart components for the PDF report
const ReportBarChart = ({ data }) => {
  const maxHeight = 120

  return (
    <div className="flex items-end justify-between h-32 gap-4 mt-4 mb-2">
      {data.map((item, index) => (
        <div key={index} className="flex flex-col items-center">
          <div
            className="w-16 rounded-t-md transition-all duration-500"
            style={{
              height: `${(item.percentage / 100) * maxHeight}px`,
              backgroundColor: getPhaseColor(index)
            }}
          />
          <div className="text-xs font-medium mt-1">{item.phase}</div>
          <div className="text-xs font-bold">{item.percentage}%</div>
        </div>
      ))}
    </div>
  )
}

const ReportCircularProgress = ({ percentage }) => {
  const radius = 50
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg className="transform -rotate-90 w-40 h-40">
        <circle
          cx="80"
          cy="80"
          r={radius}
          stroke="#e5e7eb"
          strokeWidth="8"
          fill="transparent"
        />
        <circle
          cx="80"
          cy="80"
          r={radius}
          stroke={getLevelColor(percentage)}
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-2xl font-bold">{percentage.toFixed(1)}%</span>
      </div>
    </div>
  )
}

// Helper functions
const getPhaseColor = index => {
  const colors = ["#22d3ee", "#0ea5e9", "#2563eb", "#7c3aed"]
  return colors[index % colors.length]
}

const getLevelColor = score => {
  if (score < 20) return "#ef4444" // red
  if (score < 40) return "#f97316" // orange
  if (score < 60) return "#eab308" // yellow
  if (score < 80) return "#22c55e" // green
  return "#3b82f6" // blue
}

const getLevelName = score => {
  if (score < 20) return "Beginner"
  if (score < 40) return "Basic"
  if (score < 60) return "Intermediate"
  if (score < 80) return "Advanced"
  return "Expert"
}

const getRecommendations = level => {
  switch (level) {
    case "Beginner":
      return [
        "Focus on building basic digital infrastructure",
        "Implement data collection systems across key processes",
        "Train staff on digital literacy and basic Industry 4.0 concepts",
        "Start with small pilot projects to demonstrate value"
      ]
    case "Basic":
      return [
        "Enhance connectivity between operational technology and IT systems",
        "Implement real-time monitoring for critical processes",
        "Develop a comprehensive digital transformation roadmap",
        "Invest in cybersecurity infrastructure"
      ]
    case "Intermediate":
      return [
        "Implement advanced analytics for predictive maintenance",
        "Integrate supply chain data with production systems",
        "Develop digital twins for key production processes",
        "Implement cloud-based solutions for data storage and processing"
      ]
    case "Advanced":
      return [
        "Implement AI-driven decision making in production processes",
        "Develop autonomous systems for quality control",
        "Create end-to-end digital value chain integration",
        "Implement advanced simulation capabilities"
      ]
    case "Expert":
      return [
        "Develop fully autonomous production systems",
        "Implement advanced AI for process optimization",
        "Create digital marketplaces and platforms",
        "Lead industry standards and innovation initiatives"
      ]
    default:
      return []
  }
}

// Main Report Generator Component
export const ReportGenerator = ({ score, phaseData }) => {
  const level = getLevelName(score)

  const generatePDF = async () => {
    // Create a temporary div for the report content
    const reportContainer = document.createElement("div")
    reportContainer.className = "report-container"
    reportContainer.style.width = "210mm" // A4 width
    reportContainer.style.padding = "15mm"
    reportContainer.style.backgroundColor = "white"
    reportContainer.style.color = "black"
    reportContainer.style.fontFamily = "Arial, sans-serif"

    // Create report content
    reportContainer.innerHTML = `
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color: #1e3a8a; margin-bottom: 5px; font-size: 24px;">Industry 4.0 Readiness Assessment Report</h1>
        <p style="color: #64748b; font-size: 14px;">Generated on ${new Date().toLocaleDateString()}</p>
      </div>
      
      <div style="margin-bottom: 20px; padding: 15px; background-color: #f8fafc; border-radius: 8px;">
        <h2 style="color: #334155; font-size: 18px; margin-bottom: 10px;">Executive Summary</h2>
        <p style="color: #475569; font-size: 14px; line-height: 1.5;">
          This report provides an assessment of your organization's Industry 4.0 readiness.
          Your overall readiness score is <strong>${score.toFixed(
            1
          )}%</strong>, placing you at the 
          <strong>${level}</strong> level. The assessment evaluates your progress across four key phases
          of Industry 4.0 implementation.
        </p>
      </div>
      
      <div id="score-section" style="display: flex; justify-content: space-between; margin-bottom: 30px;">
        <div id="score-container" style="width: 45%; display: flex; flex-direction: column; align-items: center;">
          <!-- Circular progress will be added here -->
        </div>
        
        <div style="width: 50%; padding: 15px; background-color: #f1f5f9; border-radius: 8px;">
          <h3 style="color: #334155; font-size: 16px; margin-bottom: 10px;">What This Means</h3>
          <p style="color: #475569; font-size: 14px; line-height: 1.5; margin-bottom: 15px;">
            At the <strong>${level}</strong> level, your organization ${getAssessmentDescription(
      level
    )}.
          </p>
          <div style="background-color: #e0f2fe; padding: 10px; border-radius: 6px; border-left: 4px solid #0ea5e9;">
            <p style="color: #0c4a6e; font-size: 14px; margin: 0;">
              By 2030, businesses that fully adopt Industry 4.0 could see profit increases of up to 20%.
            </p>
          </div>
        </div>
      </div>
      
      <div style="margin-bottom: 30px;">
        <h2 style="color: #334155; font-size: 18px; margin-bottom: 15px;">Implementation Progress by Phase</h2>
        <div id="phases-chart" style="height: 200px; margin-bottom: 20px;">
          <!-- Bar chart will be added here -->
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
          <div style="padding: 12px; background-color: #f8fafc; border-radius: 8px; border-top: 3px solid #22d3ee;">
            <h4 style="color: #334155; font-size: 15px; margin-bottom: 5px;">Foundation Phase: ${
              phaseData.phase1
            }%</h4>
            <p style="color: #475569; font-size: 13px; margin: 0;">Basic connectivity and digitalization of key processes.</p>
          </div>
          <div style="padding: 12px; background-color: #f8fafc; border-radius: 8px; border-top: 3px solid #0ea5e9;">
            <h4 style="color: #334155; font-size: 15px; margin-bottom: 5px;">Advanced Phase: ${
              phaseData.phase2
            }%</h4>
            <p style="color: #475569; font-size: 13px; margin: 0;">Data visibility and real-time monitoring capabilities.</p>
          </div>
          <div style="padding: 12px; background-color: #f8fafc; border-radius: 8px; border-top: 3px solid #2563eb;">
            <h4 style="color: #334155; font-size: 15px; margin-bottom: 5px;">Integration Phase: ${
              phaseData.phase3
            }%</h4>
            <p style="color: #475569; font-size: 13px; margin: 0;">Predictive capabilities and advanced analytics integration.</p>
          </div>
          <div style="padding: 12px; background-color: #f8fafc; border-radius: 8px; border-top: 3px solid #7c3aed;">
            <h4 style="color: #334155; font-size: 15px; margin-bottom: 5px;">Optimization Phase: ${
              phaseData.phase4
            }%</h4>
            <p style="color: #475569; font-size: 13px; margin: 0;">Autonomous systems and self-optimizing processes.</p>
          </div>
        </div>
      </div>
      
      <div style="margin-bottom: 30px;">
        <h2 style="color: #334155; font-size: 18px; margin-bottom: 15px;">Key Recommendations</h2>
        <ul style="color: #475569; font-size: 14px; line-height: 1.6; padding-left: 20px;">
          ${getRecommendations(level)
            .map(rec => `<li>${rec}</li>`)
            .join("")}
        </ul>
      </div>
      
      <div style="margin-top: 40px; border-top: 1px solid #e2e8f0; padding-top: 15px;">
        <h3 style="color: #334155; font-size: 16px; margin-bottom: 10px;">About Industry 4.0</h3>
        <p style="color: #475569; font-size: 13px; line-height: 1.5;">
          The implementation of Industry 4.0 has revolutionized manufacturing and
          business operations around the world. Globally 72% companies are already using the strategies to improve efficiency, productivity, and sustainability. But India
          is lagging behind with an adoption rate of only 25-30%. This gap highlights the
          urgent need for tailored solution which will accelerate the adoption of Industry
          4.0 technology in India.
        </p>
      </div>
      
      <div style="margin-top: 30px; text-align: center;">
        <p style="color: #94a3b8; font-size: 12px;">
          This report is generated based on your Industry 4.0 readiness assessment.
          For detailed implementation guidance, please contact our team.
        </p>
      </div>
    `

    // Temporarily append to document
    document.body.appendChild(reportContainer)

    // Add circular progress chart
    const scoreContainer = reportContainer.querySelector("#score-container")
    if (scoreContainer) {
      const circularProgressElement = document.createElement("div")
      circularProgressElement.id = "circular-progress"
      scoreContainer.appendChild(circularProgressElement)

      // Render the React component to the DOM element
      const circularProgress = <ReportCircularProgress percentage={score} />
      ReactDOM.render(circularProgress, circularProgressElement)

      // Add level text
      const levelElement = document.createElement("div")
      levelElement.style.marginTop = "10px"
      levelElement.style.fontWeight = "bold"
      levelElement.style.fontSize = "18px"
      levelElement.style.color = "#334155"
      levelElement.textContent = `${level} Level`
      scoreContainer.appendChild(levelElement)
    }

    const { phase1, phase2, phase3, phase4 } = phaseData

    // Add phases bar chart
    const phasesChartContainer = reportContainer.querySelector("#phases-chart")
    if (phasesChartContainer) {
      const chartElement = document.createElement("div")
      chartElement.id = "bar-chart"
      phasesChartContainer.appendChild(chartElement)

      // Render the React component to the DOM element
      const phaseDataForChart = [
        { phase: "Foundation", percentage: phase1 },
        { phase: "Advanced", percentage: phase2 },
        { phase: "Integration", percentage: phase3 },
        { phase: "Optimization", percentage: phase4 }
      ]
      const barChart = <ReportBarChart data={phaseDataForChart} />
      ReactDOM.render(barChart, chartElement)
    }

    // Wait for React components to render
    await new Promise(resolve => setTimeout(resolve, 100))

    // Generate PDF from the container
    try {
      const canvas = await html2canvas(reportContainer, {
        scale: 2,
        useCORS: true,
        logging: false
      })

      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF("p", "mm", "a4")
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight)
      pdf.save("Industry4.0_Readiness_Report.pdf")

      // Clean up
      document.body.removeChild(reportContainer)
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("There was an error generating the PDF. Please try again.")
      document.body.removeChild(reportContainer)
    }
  }

  return (
    <button
      onClick={generatePDF}
      className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:from-blue-800 hover:to-indigo-900 transition-all shadow-md"
    >
      <FileDown className="w-5 h-5" />
      Download Assessment Report
    </button>
  )
}

// Helper function for assessment description
function getAssessmentDescription(level) {
  switch (level) {
    case "Beginner":
      return "is in the early stages of Industry 4.0 adoption with limited digital infrastructure and connectivity"
    case "Basic":
      return "has established some digital foundations but needs to enhance integration between systems and improve data visibility"
    case "Intermediate":
      return "has made significant progress in digital transformation with good connectivity and data visibility, but needs to develop more advanced analytics capabilities"
    case "Advanced":
      return "demonstrates strong Industry 4.0 capabilities with integrated systems and predictive analytics, approaching full digital maturity"
    case "Expert":
      return "has achieved comprehensive Industry 4.0 implementation with autonomous systems and advanced optimization capabilities"
    default:
      return ""
  }
}
