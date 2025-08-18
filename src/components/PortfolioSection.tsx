import { motion } from 'framer-motion'
import Header from './portfolio/Header'
import Hero from './portfolio/Hero'
import About from './portfolio/About'
import Experience from './portfolio/Experience'
import Projects from './portfolio/Projects'
import CreativeWork from './portfolio/CreativeWork'
import Contact from './portfolio/Contact'

export default function PortfolioSection() {
  return (
    <motion.div
      className='min-h-screen bg-gradient-to-br from-cyberpunk-dark via-gray-900 to-cyberpunk-dark-alt'
      initial={{
        opacity: 0,
        scale: 1.1,
        rotateY: 90,
        filter: 'blur(10px)',
      }}
      animate={{
        opacity: 1,
        scale: 1,
        rotateY: 0,
        filter: 'blur(0px)',
      }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
    >
      {/* Subtle grid overlay for portfolio */}
      <div
        className='fixed inset-0 opacity-5 pointer-events-none'
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      />

      <Header />
      <div className='pt-16'>
        <Hero />
      </div>
      <About />
      <Experience />
      <Projects />
      <CreativeWork />
      <Contact />
    </motion.div>
  )
}
