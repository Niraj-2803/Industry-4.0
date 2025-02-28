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
  AlertDialogTitle } from "../ui/alert-dialog"
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
        task.completed 
          ? "bg-cyan-500 hover:bg-cyan-700" 
          : "bg-slate-300 hover:bg-slate-500" 
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
              Are you sure you have completed this task? This action can be
              undone later if needed.
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
      task: "Select an ERP vendor (e.g., SAP, Tally)",
      description:
        "Evaluate and choose an Enterprise Resource Planning solution that best fits our organization's needs. Consider factors like scalability, integration capabilities, and cost-effectiveness.",
      completed: false
    },
    {
      id: 2,
      task: "Develop a responsive website or app",
      description:
        "Create a modern, user-friendly website that works seamlessly across all devices. Implement key features like product catalogs, customer portals, and real-time updates.",
      completed: false
    },
    {
      id: 3,
      task: "Train employees on ERP usage",
      description:
        "Conduct comprehensive training sessions to ensure all team members can effectively use the new ERP system. Include hands-on workshops and provide detailed documentation.",
      completed: false
    }
  ])

  const [iotTasks, setIotTasks] = useState([
    {
      id: 1,
      task: "Conduct a feasibility study for IoT integration",
      description:
        "Analyze the potential impact and requirements of implementing IoT solutions. Identify key areas where IoT can improve efficiency and reduce costs.",
      completed: false
    },
    {
      id: 2,
      task: "Procure IoT devices from certified vendors",
      description:
        "Source high-quality IoT devices from reliable manufacturers. Ensure all devices meet industry standards and security requirements.",
      completed: false
    },
    {
      id: 3,
      task: "Build a centralized monitoring platform",
      description:
        "Develop a unified dashboard to monitor and control all IoT devices. Implement real-time analytics and automated alert systems.",
      completed: false
    }
  ])

  const [isCompleted, setIsCompleted] = useState(false)

  useEffect(() => {
    const allTasksCompleted =
      erpTasks.every(task => task.completed) &&
      iotTasks.every(task => task.completed)
    setIsCompleted(allTasksCompleted)
  }, [erpTasks, iotTasks])

  const toggleErpTask = taskId => {
    setErpTasks(tasks =>
      tasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const toggleIotTask = taskId => {
    setIotTasks(tasks =>
      tasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    )
  }

  return (
    <div className="min-h-screen bg-[#030712] p-8 font-['Georgia']">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <a
                href="/timeline"
                className="hover:text-white transition-colors"
              >
                Timeline
              </a>
              <ChevronRight size={16} />
              <span className="text-white">Phase 1</span>
            </div>
            <h1 className="text-white text-4xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Phase 1: Foundation
            </h1>
          </div>
          <a
            href="/timeline"
            className={`${
              isCompleted
                ? "bg-green-600 hover:bg-green-700"
                : "bg-red-600 hover:bg-red-700"
            } text-white text-sm font-semibold px-6 py-2 rounded-full transition-all duration-300`}
          >
            {isCompleted ? "Completed" : "In Progress"}
          </a>
        </div>

        {/* ERP Section */}
        <div className="glass-card rounded-2xl p-8 mb-8 relative overflow-hidden border border-gray-800">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-600/5 rounded-full blur-3xl -z-10" />

          <div className="flex gap-8 items-start">
            <div className="w-[60%]">
              <h2 className="text-2xl text-white font-semibold mb-4 relative z-10">
                Step 1: ERP / Company Website
              </h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Objective: Set up ERP systems for seamless departmental
                integration and a user-friendly website for customer
                interaction. This foundation will enable digital transformation
                and improve operational efficiency.
              </p>

              <div className="space-y-6 mb-8">
                <h3 className="text-white text-lg font-semibold">Tasks:</h3>
                {erpTasks.map(task => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={toggleErpTask}
                  />
                ))}
              </div>

              <div className="space-y-4">
                <h3 className="text-white text-lg font-semibold">Resources:</h3>
                <div className="grid grid-cols-2 gap-4">
                  <a
                    href="https://www.sap.com/india/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2 transition-colors"
                  >
                    SAP India <ExternalLink size={16} />
                  </a>
                  <a
                    href="https://tallysolutions.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2 transition-colors"
                  >
                    Tally Solutions <ExternalLink size={16} />
                  </a>
                  <a
                    href="https://www.digitalindia.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2 transition-colors"
                  >
                    Digital India Initiative <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </div>
              <div className="mt-24 h-[400px] w-[40%] flex items-center justify-center"> {/* Fixed height container */}
                <img 
                  src="/erp-phases.jpg"
                  alt="ERP System Illustration"
                  className="rounded-lg w-full h-full object-contain" /* Changed to object-contain */
                />
              </div>
          </div>
        </div>

        {/* IoT Section */}
        <div className="glass-card rounded-2xl p-8 relative overflow-hidden border border-gray-800">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl -z-10" />

          <div className="flex gap-8 items-start">
            <div className="flex-1">
              <h2 className="text-2xl text-white font-semibold mb-4 relative z-10">
                Step 2: Technology of Things (IoT)
              </h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Objective: Deploy IoT-enabled devices and smart monitoring
                systems to create an interconnected ecosystem that enhances
                operational visibility and enables data-driven decision making.
              </p>

              <div className="space-y-6 mb-8">
                <h3 className="text-white text-lg font-semibold">Tasks:</h3>
                {iotTasks.map(task => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={toggleIotTask}
                  />
                ))}
              </div>

              <div className="space-y-4">
                <h3 className="text-white text-lg font-semibold">Resources:</h3>
                <div className="grid grid-cols-2 gap-4">
                  <a
                    href="https://www.bosch.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2 transition-colors"
                  >
                    Bosch India IoT Solutions <ExternalLink size={16} />
                  </a>
                  <a
                    href="https://samarthudyog-i40.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2 transition-colors"
                  >
                    SAMARTH Udyog <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-24 h-[350px] w-[40%] flex items-center justify-center"> {/* Fixed height container */}
              <img 
                src="/iot-phases.jpg"
                alt="IoT System Illustration"
                className="rounded-lg w-full h-full object-contain" /* Changed to object-contain */
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
