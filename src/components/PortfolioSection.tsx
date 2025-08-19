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
      className='min-h-screen bg-background-primary'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
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
