
"use client"

import { useRef } from "react"
import { motion,  useInView } from "framer-motion"

const features = [
  {
    title: "Readiness Assessment",
      description: "The company’s readiness for Industry 4.0 adoption is evaluated based on key factors like technology infrastructure, digital maturity, and workforce readiness of the company.",
    image: "/Whyus/Inspection.png",
    alt: "Security shield illustration"
  },
  {
    title: "Timeline Generation",
      description: "A customized timeline is developed, outlining the steps that are required for achieving Industry 4.0 transformation. Improved efficiency is forecasted based on the planned implementations.",
      image: "/Whyus/Design.png",
    alt: "AI automation illustration"
  },
  {
    title: "Implementation & Monitoring",
      description: "The project tasks are implemented and continuously monitored to ensure they align with the timeline and goals. The company is regularly updated about the progress",
    image: "/Whyus/Plc_based.png",
    alt: "24/7 support illustration"
  }
]

function FeatureCard({ title, description, image, alt, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="bg-black/10 backdrop-blur-xl rounded-xl p-6 shadow-xl hover:shadow-3xl transition-shadow"
    >
      <div section id="why-us" className="relative h-48 mb-6">
        <motion.img
          src={image}
          alt={alt}
          className="w-full h-full object-contain"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
        />
      </div>
      <h3 className="text-xl font-semibold mb-3 text-white text-center">{title}</h3>
      <p className="text-gray-200/90 text-sm leading-relaxed">{description}</p>
    </motion.div>
  )
}

export default function AnimatedFeatures() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden ">
        <h2 className="text-3xl font-bold text-center mb-7 -mt-1">Why Us?</h2>
        <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto text-justify">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}


