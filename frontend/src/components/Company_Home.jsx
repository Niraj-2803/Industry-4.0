"use client"
import React from "react"
import { motion } from "framer-motion"
import { cn } from "../lib/utils"

export function LampDemo() {
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 70 }} // Changed y from 100 to 70 to position text higher
        whileInView={{ opacity: 1, y: -30 }} // Changed y from 0 to -30 to position text higher
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut"
        }}
        className="bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-bold tracking-tighter text-transparent md:text-6xl"
      >
        Welcome to EvolvX  
        <br /> Your Partner in Industry 4.0 <br/>Transformation <br/>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
        className="mt-6 max-w-2xl text-center text-lg text-slate-300 md:text-2xl font-light"
      >
        Unlock the future of smart manufacturing with AI-powered roadmaps, expert guidance,  
        and tailored solutions designed to maximize efficiency and profitability.  
      </motion.p>
    </LampContainer>
  )
}

export const LampContainer = ({ children, className }) => {
  return (
    <div
      className={cn(
        "relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 w-full rounded-md z-0",
        className
      )}
    >
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center -translate-y-28">
        <div className="relative flex w-full flex-1 items-center justify-center isolate z-0">
          <motion.div
            initial={{ opacity: 0.5, width: "15rem" }}
            whileInView={{ opacity: 1, width: "30rem" }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut"
            }}
            style={{
              backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`
            }}
            className="absolute inset-auto right-1/2 h-72 overflow-visible w-[30rem] bg-gradient-conic from-cyan-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
          />
          <motion.div
            initial={{ opacity: 0.5, width: "15rem" }}
            whileInView={{ opacity: 1, width: "30rem" }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut"
            }}
            style={{
              backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`
            }}
            className="absolute inset-auto left-1/2 h-72 w-[30rem] bg-gradient-conic from-transparent via-transparent to-cyan-500 text-white [--conic-position:from_290deg_at_center_top]"
          />
          <div className="absolute top-1/2 h-64 w-full translate-y-16 scale-x-150 bg-slate-950 blur-2xl"></div>
        </div>
      </div>
      <div className="relative z-50 flex flex-col items-center px-5">
        {children}
      </div>
    </div>
  )
}