import React from 'react'
import { motion } from 'framer-motion'
import Navigation from './ui/Navigation'
import NewHero from './portfolio/NewHero'
import Services from './portfolio/Services'
import WorkExperience from './portfolio/WorkExperience'
import NewAbout from './portfolio/NewAbout'
import SkillsTools from './portfolio/SkillsTools'
import ContactFooter from './portfolio/ContactFooter'

export default function RefactoredPortfolio() {
  return (
    <div className="relative min-h-screen bg-zinc-900 text-white overflow-x-hidden">
      {/* Navigation */}
      <Navigation />

      {/* Background elements */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Floating data streams */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent animate-pulse" style={{ animationDuration: '3s' }} />
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-fuchsia-400/20 to-transparent animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }} />
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }} />
      </div>

      {/* Main Content */}
      <motion.main
        className="relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Hero Section */}
        <NewHero />

        {/* Services - What I Do */}
        <Services />

        {/* Work Experience */}
        <WorkExperience />

        {/* About */}
        <NewAbout />

        {/* Skills & Tools */}
        <SkillsTools />

        {/* Contact & Footer */}
        <ContactFooter />
      </motion.main>
    </div>
  )
}