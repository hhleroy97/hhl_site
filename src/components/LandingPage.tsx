import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Cloud,
  Database,
  Code2,
  Sparkles,
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
} from 'lucide-react'

interface LandingPageProps {
  onEnterPortfolio?: () => void
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnterPortfolio }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)

  const roles = [
    'Cloud Architect',
    'Data Engineer',
    'Systems Designer',
    'Creative Technologist',
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTyping(true)
      setTimeout(() => {
        setCurrentTextIndex((prev) => (prev + 1) % roles.length)
        setIsTyping(false)
      }, 2000)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Particles */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Geometric Shapes */}
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 border border-cyan-400/20 rounded-lg"
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-24 h-24 border border-purple-400/20 rounded-full"
          animate={{
            rotate: -360,
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-full filter blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full filter blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="max-w-6xl w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Greeting */}
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center space-x-2 text-cyan-400 font-mono text-sm"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Hello, I'm</span>
                </motion.div>
                
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-5xl lg:text-7xl font-bold text-white"
                >
                  Your Name
                </motion.h1>

                {/* Animated Role Text */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="h-12 flex items-center"
                >
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentTextIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="text-2xl lg:text-3xl font-light text-gray-300"
                    >
                      {roles[currentTextIndex]}
                    </motion.span>
                  </AnimatePresence>
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="text-2xl lg:text-3xl font-light text-cyan-400 ml-2"
                  >
                    |
                  </motion.span>
                </motion.div>
              </div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="text-lg text-gray-300 leading-relaxed max-w-lg"
              >
                I craft elegant solutions at the intersection of data, cloud infrastructure, and creative technology. 
                Transforming complex systems into beautiful, scalable architectures that power the future.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="flex flex-wrap gap-4"
              >
                <button
                  onClick={onEnterPortfolio}
                  className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25"
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <span>Explore My Work</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>

                <button className="px-8 py-4 border border-gray-600 text-gray-300 font-semibold rounded-lg hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300">
                  Download Resume
                </button>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="flex space-x-4"
              >
                <a
                  href="#"
                  className="p-3 border border-gray-600 rounded-lg text-gray-400 hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="p-3 border border-gray-600 rounded-lg text-gray-400 hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="p-3 border border-gray-600 rounded-lg text-gray-400 hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </motion.div>
            </motion.div>

            {/* Right Column - Visual Elements */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Main Visual Container */}
              <div className="relative w-full h-96 lg:h-[500px] bg-gradient-to-br from-slate-800/50 to-purple-900/50 rounded-2xl border border-gray-700/50 backdrop-blur-sm overflow-hidden">
                {/* Animated Grid */}
                <div className="absolute inset-0 opacity-10">
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(0, 255, 255, 0.3) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px)
                      `,
                      backgroundSize: '40px 40px',
                    }}
                  />
                </div>

                {/* Floating Icons */}
                <motion.div
                  className="absolute top-8 left-8 p-4 bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 rounded-xl border border-cyan-400/30 backdrop-blur-sm"
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Cloud className="w-8 h-8 text-cyan-400" />
                </motion.div>

                <motion.div
                  className="absolute top-20 right-12 p-4 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-xl border border-purple-400/30 backdrop-blur-sm"
                  animate={{
                    y: [0, 10, 0],
                    rotate: [0, -5, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                >
                  <Database className="w-8 h-8 text-purple-400" />
                </motion.div>

                <motion.div
                  className="absolute bottom-20 left-12 p-4 bg-gradient-to-br from-pink-500/20 to-pink-600/20 rounded-xl border border-pink-400/30 backdrop-blur-sm"
                  animate={{
                    y: [0, -15, 0],
                    rotate: [0, 10, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                  }}
                >
                  <Code2 className="w-8 h-8 text-pink-400" />
                </motion.div>

                {/* Central Element */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="w-32 h-32 bg-gradient-to-br from-cyan-500/30 to-purple-500/30 rounded-full border border-cyan-400/50 backdrop-blur-sm flex items-center justify-center"
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 360],
                    }}
                    transition={{
                      scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                      rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    }}
                  >
                    <Sparkles className="w-12 h-12 text-white" />
                  </motion.div>
                </div>

                {/* Connection Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <motion.path
                    d="M 100 100 Q 200 50 300 100"
                    stroke="url(#gradient1)"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="5,5"
                    animate={{
                      strokeDashoffset: [0, -10],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#00ffff" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#8000ff" stopOpacity="0.5" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Stats Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
                className="mt-8 grid grid-cols-3 gap-4"
              >
                <div className="text-center p-4 bg-slate-800/50 rounded-lg border border-gray-700/50 backdrop-blur-sm">
                  <div className="text-2xl font-bold text-cyan-400">5+</div>
                  <div className="text-sm text-gray-400">Years Experience</div>
                </div>
                <div className="text-center p-4 bg-slate-800/50 rounded-lg border border-gray-700/50 backdrop-blur-sm">
                  <div className="text-2xl font-bold text-purple-400">50+</div>
                  <div className="text-sm text-gray-400">Projects Delivered</div>
                </div>
                <div className="text-center p-4 bg-slate-800/50 rounded-lg border border-gray-700/50 backdrop-blur-sm">
                  <div className="text-2xl font-bold text-pink-400">99.9%</div>
                  <div className="text-sm text-gray-400">Uptime</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage