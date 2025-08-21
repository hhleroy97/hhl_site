import React from 'react'
import { motion } from 'framer-motion'
import Navigation from './ui/Navigation'
import NewHero from './portfolio/NewHero'
import LiveDataLoom from './portfolio/LiveDataLoom'
import Services from './portfolio/Services'
import NewAbout from './portfolio/NewAbout'
import TestimonialsPlaceholder from './portfolio/TestimonialsPlaceholder'
import ContactFooter from './portfolio/ContactFooter'

export default function RefactoredPortfolio() {
  return (
    <div className="relative min-h-screen bg-zinc-900 text-white">
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <motion.main
        className="relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Hero Section - LCP optimized */}
        <NewHero />

        {/* Live Data Loom Showcase */}
        <LiveDataLoom />

        {/* Services */}
        <Services />

        {/* About */}
        <NewAbout />

        {/* Testimonials Placeholder */}
        <TestimonialsPlaceholder />

        {/* Contact & Footer */}
        <ContactFooter />
      </motion.main>
    </div>
  )
}