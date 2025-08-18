import { motion } from 'framer-motion'
import Header from './portfolio/Header'
import Hero from './portfolio/Hero'
import About from './portfolio/About'
import Skills from './portfolio/Skills'
import Experience from './portfolio/Experience'
import Projects from './portfolio/Projects'
import CreativeWork from './portfolio/CreativeWork'
import Contact from './portfolio/Contact'

export default function PortfolioSection() {
  return (
    <motion.div
      className='min-h-screen bg-gradient-to-br from-tech-dark via-tech-dark-alt to-tech-navy-deep'
      initial={{
        opacity: 0,
        scale: 1.02,
        filter: 'blur(5px)',
      }}
      animate={{
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
      }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <Header />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <CreativeWork />
      <Contact />
    </motion.div>
  )
}
