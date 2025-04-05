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
export default function Phase3Page() {
  const [erpTasks, setErpTasks] = useState([
    {
      id: 1,
      task: "Allocate R&D budgets for Industry 4.0 technologies. ",
      description: "Strategically investing in emerging technologies like AI, IoT, and automation",
      completed: false,
    },
    {
      id: 2,
      task: "Develop digital twins and simulations. ",
      description: "Create digital twins and simulations for real-time analysis and optimization.",
      completed: false,
    },
    {
      id: 3,
      task: "Collaborate with academic institutions",
      description:
        "Collaborate with academic institutions involves partnering with universities and research centers to exchange knowledge, conduct joint research, and drive innovation.",
      completed: false,
    },
  ])

  const [iotTasks, setIotTasks] = useState([
    {
      id: 1,
      task: "Conduct workshops on IoT, AI, and ERP tools.",
      description: "Host workshops on IoT, AI, and ERP tools for hands-on industry training.",
      completed: false,
    },
    {
      id: 2,
      task: "Measure skill improvements through assessments.",
      description: "Evaluate skill growth using structured assessments and benchmarks.",
      completed: false,
    },
    {
      id: 3,
      task: "Partner with training organizations.",
      description: "Collaborate with training organizations to upskill the workforce in Industry 4.0 technologies.",
      completed: false,
    },
  ])

  const [isCompleted, setIsCompleted] = useState(false)

  useEffect(() => {
    const allTasksCompleted = erpTasks.every((task) => task.completed) && iotTasks.every((task) => task.completed)
    setIsCompleted(allTasksCompleted)
  }, [erpTasks, iotTasks])

  const toggleErpTask = (taskId) => {
    setErpTasks((tasks) => tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))
  }

  const toggleIotTask = (taskId) => {
    setIotTasks((tasks) => tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))
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
              <span className="text-white">Phase 3</span>
            </div>
            <h1 className="text-white text-4xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Phase 3: Integration and Scalability
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

        {/* R&D Section */}
        <div className="glass-card rounded-2xl p-8 mb-8 relative overflow-hidden border border-gray-800">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-600/5 rounded-full blur-3xl -z-10" />

          <div className="flex gap-8 items-start">
            <div className="w-[60%]">
              <h2 className="text-2xl text-white font-semibold mb-4 relative z-10">
                Step 6: Research and Development (R&D)
              </h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Objective: Invest in R&D for continuous innovation and process optimization.
              </p>

              <div className="space-y-6 mb-8">
                <h3 className="text-white text-lg font-semibold">Tasks:</h3>
                {erpTasks.map((task) => (
                  <TaskItem key={task.id} task={task} onToggle={toggleErpTask} />
                ))}
              </div>

              <div className="space-y-4 mb-6">
                <h3 className="text-white text-lg font-semibold">Government Support for R&D in India:</h3>
                <div className="grid grid-cols-2 gap-4">
                  <a
                    href="https://www.makeinindia.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2 transition-colors"
                  >
                    Make in India <ExternalLink size={16} />
                  </a>
                  <a
                    href="https://www.startupindia.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2 transition-colors"
                  >
                    Startup India <ExternalLink size={16} />
                  </a>
                  <a
                    href="https://www.india.gov.in/production-linked-incentive-pli-scheme"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2 transition-colors"
                  >
                    Production Linked Incentive (PLI) Scheme <ExternalLink size={16} />
                  </a>
                  <a
                    href="https://dst.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2 transition-colors"
                  >
                    Department of Science & Technology (DST) <ExternalLink size={16} />
                  </a>
                  <a
                    href="https://www.incometaxindia.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2 transition-colors"
                  >
                    Income Tax Deductions for R&D <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-24 h-[400px] w-[40%] flex items-center justify-center">
              <img
                src="/r&d_phases.jpg"
                alt="R&D Illustration"
                className="rounded-lg w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* Skill Level Section */}
        <div className="glass-card rounded-2xl p-8 relative overflow-hidden border border-gray-800">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl -z-10" />

          <div className="flex gap-8 items-start">
            <div className="flex-1">
              <h2 className="text-2xl text-white font-semibold mb-4 relative z-10">Step 7: Skill Level</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Objective: Upskill employees in Industry 4.0 technologies.
              </p>

              <div className="space-y-6 mb-8">
                <h3 className="text-white text-lg font-semibold">Tasks:</h3>
                {iotTasks.map((task) => (
                  <TaskItem key={task.id} task={task} onToggle={toggleIotTask} />
                ))}
              </div>

              <div className="space-y-4 mb-6">
                <h3 className="text-white text-lg font-semibold">Training and Consultancy Providers:</h3>
                <div className="grid grid-cols-2 gap-4">
                  <a
                    href="https://www.henryharvin.com/blog/industry-4-0-courses-india/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2 transition-colors"
                  >
                    Henry Harvin Analytics Academy <ExternalLink size={16} />
                  </a>
                  <a
                    href="https://www.tetrahedron.in/corporate-trainingcompanies/technical-trainings/industry-4-0-courses/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2 transition-colors"
                  >
                    Tetrahedron <ExternalLink size={16} />
                  </a>
                  <a
                    href="https://www.tuvsud.com/en-in/store/academyin/sectors/sector-agnostic/1008-industry4.0-fundamentals"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2 transition-colors"
                  >
                    TÜV SÜD <ExternalLink size={16} />
                  </a>
                  <a
                    href="https://360digitmg.com/india/industrialrevolution-certification-course-training-institute"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2 transition-colors"
                  >
                    360DigiTMG <ExternalLink size={16} />
                  </a>
                  <a
                    href="https://skillindia.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2 transition-colors"
                  >
                    Skill India <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-24 h-[350px] w-[40%] flex items-center justify-center">
              <img
                src="/training_phases.png"
                alt="Skill Development Illustration"
                className="rounded-lg w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

