import { motion } from 'framer-motion'
import Header from './portfolio/Header'
import Hero from './portfolio/Hero'
import Experience from './portfolio/Experience'
import Projects from './portfolio/Projects'
import Contact from './portfolio/Contact'

export default function PortfolioSection() {
  return (
    <motion.div
      className='min-h-screen bg-tech-dark'
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
      <Experience />
      <Projects />
      <Contact />
    </motion.div>
  )
}
