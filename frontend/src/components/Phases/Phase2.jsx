"use client"

import { useState, useEffect } from "react"
import { ExternalLink, ChevronRight, CheckCircle2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog"
import { Button } from "../ui/button"

// 3D Model Component

// Task Item Component
function TaskItem({ task, onToggle }) {
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <>
      <div className="space-y-2 relative z-10">
        <div className="flex items-center gap-3">
          <Button
            variant={task.completed ? "default" : "outline"}
            className={`w-full justify-start gap-2 rounded-xl ${
              task.completed ? "bg-cyan-500 hover:bg-cyan-700" : "bg-slate-300 hover:bg-slate-500"
            }`}
            onClick={() => !task.completed && setDialogOpen(true)}
          >
            {task.completed && <CheckCircle2 className="h-4 w-4" />}
            <span className="font-medium">{task.task}</span>
          </Button>
        </div>
        <p className="text-gray-400 text-sm ml-1">{task.description}</p>
      </div>

      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Task Completion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you have completed this task? This action can be undone later if needed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                onToggle(task.id)
                setDialogOpen(false)
              }}
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

// Main Page Component
export default function Phase2Page() {
  const [erpTasks, setErpTasks] = useState([
    {
      id: 1,
      task: "Identify AI use cases specific to your industry.",
      description:
        "Research and document AI applications that can provide value to your specific industry sector. Focus on use cases with proven ROI and implementation feasibility.",
      completed: false,
    },
    {
      id: 2,
      task: "Develop or deploy AI models (e.g., TensorFlow).",
      description:
        "Build or implement AI models using frameworks like TensorFlow to address the identified use cases. Ensure proper integration with existing systems.",
      completed: false,
    },
    {
      id: 3,
      task: "Monitor and refine AI performance.",
      description:
        "Establish metrics to track AI model performance and implement continuous improvement processes to enhance accuracy and efficiency over time.",
      completed: false,
    },
  ])

  const [iotTasks, setIotTasks] = useState([
    {
      id: 1,
      task: "Implement multi-factor authentication.",
      description:
        "Deploy MFA across all critical systems and access points to enhance security posture and prevent unauthorized access through compromised credentials.",
      completed: false,
    },
    {
      id: 2,
      task: "Conduct regular vulnerability assessments.",
      description:
        "Establish a schedule for regular security scans and penetration testing to identify and address potential vulnerabilities before they can be exploited.",
      completed: false,
    },
    {
      id: 3,
      task: "Develop an incident response plan.",
      description:
        "Create a comprehensive plan detailing steps to take during security incidents, including roles, communication protocols, and recovery procedures.",
      completed: false,
    },
  ])

  const [cloudTasks, setCloudTasks] = useState([
    {
      id: 1,
      task: "Select a cloud provider (e.g., AWS, Azure).",
      description:
        "Evaluate and choose a cloud service provider that best meets your organization's requirements for scalability, security, and cost-effectiveness.",
      completed: false,
    },
    {
      id: 2,
      task: "Migrate applications and databases to the cloud.",
      description:
        "Plan and execute the migration of existing applications and databases to your chosen cloud platform with minimal disruption to operations.",
      completed: false,
    },
    {
      id: 3,
      task: "Implement disaster recovery protocols.",
      description:
        "Develop and test comprehensive disaster recovery procedures to ensure business continuity in case of system failures or data loss.",
      completed: false,
    },
  ])

  const [isCompleted, setIsCompleted] = useState(false)

  useEffect(() => {
    const allTasksCompleted =
      erpTasks.every((task) => task.completed) &&
      iotTasks.every((task) => task.completed) &&
      cloudTasks.every((task) => task.completed)
    setIsCompleted(allTasksCompleted)
  }, [erpTasks, iotTasks, cloudTasks])

  const toggleErpTask = (taskId) => {
    setErpTasks((tasks) => tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))
  }

  const toggleIotTask = (taskId) => {
    setIotTasks((tasks) => tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))
  }

  const toggleCloudTask = (taskId) => {
    setCloudTasks((tasks) => tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))
  }

  return (
    <div className="min-h-screen bg-[#030712] p-8 font-['Georgia']">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <a href="/timeline" className="hover:text-white transition-colors">
                Timeline
              </a>
              <ChevronRight size={16} />
              <span className="text-white">Phase 1</span>
            </div>
            <h1 className="text-white text-4xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Phase 2: Advanced Implementation
            </h1>
          </div>
          <a
            href="/timeline"
            className={`${
              isCompleted ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
            } text-white text-sm font-semibold px-6 py-2 rounded-full transition-all duration-300`}
          >
            {isCompleted ? "Completed" : "In Progress"}
          </a>
        </div>

        {/* AI Section */}
        <div className="glass-card rounded-2xl p-8 mb-8 relative overflow-hidden border border-gray-800">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-600/5 rounded-full blur-3xl -z-10" />

          <div className="flex gap-8 items-start">
            <div className="w-[60%]">
              <h2 className="text-2xl text-white font-semibold mb-4 relative z-10">
                Step 3: Artificial Intelligence (AI)
              </h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Objective: Leverage AI for predictive analytics, workflow optimization, and customer insights.
              </p>

              <div className="space-y-6 mb-8">
                <h3 className="text-white text-lg font-semibold">Tasks:</h3>
                {erpTasks.map((task) => (
                  <TaskItem key={task.id} task={task} onToggle={toggleErpTask} />
                ))}
              </div>

              <div className="space-y-4 mb-6">
                <h3 className="text-white text-lg font-semibold">Resources:</h3>
                <div className="grid grid-cols-2 gap-4">
                  <a
                    href="https://www.bain.com/vector-digital/advanced-analytics/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2 transition-colors"
                  >
                    Bain & Company Analytics <ExternalLink size={16} />
                  </a>
                  <a
                    href="https://www.wipro.com/ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2 transition-colors"
                  >
                    Wipro AI Solutions <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-24 h-[400px] w-[40%] flex items-center justify-center">
              <img
                src="/ai_phases.jpg"
                alt="AI System Illustration"
                className="rounded-lg w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* Cybersecurity Section */}
        <div className="glass-card rounded-2xl p-8 mb-8 relative overflow-hidden border border-gray-800">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl -z-10" />

          <div className="flex gap-8 items-start">
            <div className="flex-1">
              <h2 className="text-2xl text-white font-semibold mb-4 relative z-10">Step 4: Cybersecurity</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Objective: Strengthen digital security protocols and data protection.
              </p>

              <div className="space-y-6 mb-8">
                <h3 className="text-white text-lg font-semibold">Tasks:</h3>
                {iotTasks.map((task) => (
                  <TaskItem key={task.id} task={task} onToggle={toggleIotTask} />
                ))}
              </div>

              <div className="space-y-4 mb-6">
                <h3 className="text-white text-lg font-semibold">Courses:</h3>
                <div className="grid grid-cols-2 gap-4">
                  <a
                    href="https://www.mygreatlearning.com/academy/learn-forfree/courses/advanced-cyber-security-threats-and-governance"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2 transition-colors"
                  >
                    Advanced Cyber Security Threats and Governance <ExternalLink size={16} />
                  </a>
                  <a
                    href="https://www.fortinet.com/training/cybersecurity-professionals"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2 transition-colors"
                  >
                    Fortinet Free Cybersecurity Training <ExternalLink size={16} />
                  </a>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <h3 className="text-white text-lg font-semibold">Awareness Videos:</h3>
                <div className="grid grid-cols-2 gap-4">
                  <a
                    href="https://www.youtube.com/watch?v=4AAsmZ4PdE8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2 transition-colors"
                  >
                    Security Threats in Smart Factory <ExternalLink size={16} />
                  </a>
                  <a
                    href="https://www.youtube.com/watch?v=EQ7sITyg8Eg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2 transition-colors"
                  >
                    Industry 4.0 <ExternalLink size={16} />
                  </a>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-white text-lg font-semibold">Resources:</h3>
                <div className="grid grid-cols-2 gap-4">
                  <a
                    href="https://www.siemens.com/global/en/products/automation/topic-areas/digital-enterprise.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2 transition-colors"
                  >
                    Siemens Digital Industries <ExternalLink size={16} />
                  </a>
                  <a
                    href="https://www.honeywell.com/us/en/solutions/honeywellforge"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2 transition-colors"
                  >
                    Honeywell Forge <ExternalLink size={16} />
                  </a>
                  <a
                    href="https://www.fortinet.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2 transition-colors"
                  >
                    Fortinet <ExternalLink size={16} />
                  </a>
                  <a
                    href="https://www.seqrite.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2 transition-colors"
                  >
                    Quick Heal Technologies (Seqrite) <ExternalLink size={16} />
                  </a>
                  <a
                    href="https://www.paloaltonetworks.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2 transition-colors"
                  >
                    Palo Alto Networks <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-24 h-[350px] w-[40%] flex items-center justify-center">
              <img
                src="/cs_phases.jpg"
                alt="Cybersecurity Illustration"
                className="rounded-lg w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* Cloud Computing Section */}
        <div className="glass-card rounded-2xl p-8 relative overflow-hidden border border-gray-800">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl -z-10" />

          <div className="flex gap-8 items-start">
            <div className="flex-1">
              <h2 className="text-2xl text-white font-semibold mb-4 relative z-10">Step 5: Cloud Computing</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Objective: Leverage cloud infrastructure for scalability, flexibility, and cost optimization.
              </p>

              <div className="space-y-6 mb-8">
                <h3 className="text-white text-lg font-semibold">Tasks:</h3>
                {cloudTasks.map((task) => (
                  <TaskItem key={task.id} task={task} onToggle={toggleCloudTask} />
                ))}
              </div>

              <div className="space-y-4">
                <h3 className="text-white text-lg font-semibold">Resources:</h3>
                <div className="grid grid-cols-2 gap-4">
                  <a
                    href="https://aws.amazon.com/local/india/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2 transition-colors"
                  >
                    AWS India <ExternalLink size={16} />
                  </a>
                  <a
                    href="https://azure.microsoft.com/en-us/regions/india/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2 transition-colors"
                  >
                    Microsoft Azure <ExternalLink size={16} />
                  </a>
                  <a
                    href="https://meity.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2 transition-colors"
                  >
                    Government Schemes: Cloud First Policy <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-24 h-[350px] w-[40%] flex items-center justify-center">
              <img
                src="/cc_phases.jpg"
                alt="Cloud Computing Illustration"
                className="rounded-lg w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

