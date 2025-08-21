import { motion } from 'framer-motion'
import Hero from './portfolio/Hero'
import Highlights from './portfolio/Highlights'
import About from './portfolio/About'
import Experience from './portfolio/Experience'
import Contact from './portfolio/Contact'

export default function PortfolioSection() {
  return (
    <motion.div
      className='min-h-screen bg-transparent'
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
      <Hero />
      <Highlights />
      <About />
      <Experience />
      <Contact />
    </motion.div>
  )
}
