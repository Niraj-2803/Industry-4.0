"use client"

import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"
import {
  Building2,
  Store,
  UserRound,
  ChevronRight,
} from "lucide-react"

import { Button } from "./ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "./ui/card"

export default function IndustrySection() {
  const navigate = useNavigate();
  const cardData = [
    {
      title: "Vendor",
      description:
        "Vendors are the backbone of Industry 4.0 transformation, offering specialized solutions in ERP, IoT, AI, and more. Our platform connects companies with the right vendors based on their unique requirements, ensuring they get the best technology and services. Whether it's upgrading systems or implementing new innovations, vendors play a key role in industrial growth.",
      icon: <Store className="h-12 w-12" />,
      color: "from-purple-600 to-pink-600",
      hoverColor: "group-hover:from-purple-700 group-hover:to-pink-700",
      shadowColor: "purple-500/20"
    },
    {
      title: "Company",
      description:
        "A company looking to transform into Industry 4.0 needs the right tools, technology, and expertise to modernize its operations. Our platform helps businesses identify their specific needs and provides a step-by-step roadmap for digital transformation. From automation to AI integration, we ensure a seamless transition while maximizing efficiency and profitability.",
      icon: <Building2 className="h-12 w-12" />,
      color: "from-rose-500 to-orange-500",
      hoverColor: "group-hover:from-rose-600 group-hover:to-orange-600",
      shadowColor: "rose-500/20"
    },
    {
      title: "Counsellor",
      description:
        "Counsellors are industry experts who guide companies through their Industry 4.0 journey. Acting like AI-powered advisors, they provide insights, suggest best practices, and help businesses make informed decisions. With their expertise, companies can navigate challenges, optimize their transformation strategy, and stay ahead in the competitive landscape.",
      icon: <UserRound className="h-12 w-12" />,
      color: "from-emerald-500 to-teal-500",
      hoverColor: "group-hover:from-emerald-600 group-hover:to-teal-600",
      shadowColor: "emerald-500/20"
    }
  ]


  return (
    <section  id="platform" className="py-20 bg-gradient-to-br from-black via-gray-800 to-black text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-3 text-gray-200 text-center">
            Industry 4.0 Transformation Platform
          </h2>
          <p className="max-w-2xl mx-auto text-gray-300">
            Accelerate your digital transformation journey with our
            comprehensive platform designed for companies, vendors, and industry
            experts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {cardData.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="group h-full"
            >
              <Card className="bg-black/30 backdrop-blur-xl border-gray-800 h-full flex flex-col overflow-hidden rounded-xl hover:shadow-lg hover:shadow-purple-900/20 transition-all duration-300">
                <div
                  className={`h-2 w-full bg-gradient-to-r ${card.color} ${card.hoverColor} transition-all duration-300`}
                ></div>
                <CardHeader className="pb-2">
                  <div className="flex justify-center mb-4">
                    <div
                      className={`p-3 rounded-xl bg-gradient-to-br ${card.color} ${card.hoverColor} transition-all duration-300 shadow-lg`}
                    >
                      {card.icon}
                    </div>
                  </div>
                  <CardTitle className="text-xl font-mono font-semibold text-white">
                    <div className="text-center">{card.title}</div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-gray-300 text-sm leading-relaxed text-justify">
                    {card.description}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button
                     onClick={() => {
                      navigate(`/${card.title}`);
                      window.scrollTo(0, 0); // Scroll to the top
                    }}
                    variant="outline"
                    className={`w-full border-gray-700 text-gray-200 hover:bg-gradient-to-r ${card.color} hover:border-transparent hover:text-white group-hover:border-transparent transition-all duration-300 rounded-lg`}
                  >
                    Get Started as {card.title}
                    <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}