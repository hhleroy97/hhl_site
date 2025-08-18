import { motion } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'
import Header from './portfolio/Header'
import Hero from './portfolio/Hero'
import About from './portfolio/About'
import Experience from './portfolio/Experience'
import Projects from './portfolio/Projects'
import CreativeWork from './portfolio/CreativeWork'
import Contact from './portfolio/Contact'

export default function PortfolioSection() {
  const shouldReduceMotion = useReducedMotion()
  return (
    <motion.main
      id='main-content'
      role='main'
      aria-label='Portfolio content'
      className='min-h-screen bg-gradient-to-br from-cyberpunk-dark via-gray-900 to-cyberpunk-dark-alt'
      initial={{
        opacity: 0,
        scale: shouldReduceMotion ? 1 : 1.1,
        rotateY: shouldReduceMotion ? 0 : 90,
        filter: shouldReduceMotion ? 'blur(0px)' : 'blur(10px)',
      }}
      animate={{
        opacity: 1,
        scale: 1,
        rotateY: 0,
        filter: 'blur(0px)',
      }}
      transition={{ duration: shouldReduceMotion ? 0.2 : 1.2, ease: 'easeOut' }}
    >
      {/* Subtle grid overlay for portfolio */}
      <div
        className='fixed inset-0 opacity-5 pointer-events-none'
        aria-hidden='true'
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      />

      <Header />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <CreativeWork />
      <Contact />
    </motion.main>
  )
}
