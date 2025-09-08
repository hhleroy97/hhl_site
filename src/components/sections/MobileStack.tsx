import About from './about'
import Experience from './experience'
import Skills from './skills'
import Services from './services'
import Contact from './contact'
import Landing from './landing'
import { useScrollTracker } from '../../hooks/useScrollTracker'

const SECTION_IDS = [
  'hero',
  'about',
  'experience',
  'skills',
  'services',
  'contact',
]

export default function MobileStack() {
  // Track scroll position and update URL hash
  useScrollTracker(SECTION_IDS, {
    offset: 150, // Consider section active when 150px from top of viewport
    throttle: 100, // Update at most every 100ms
    mobileOnly: true, // Only track on mobile devices
  })

  return (
    <main className='block md:hidden w-full'>
      {/* Each section keeps its id for hash anchors */}
      <Landing />
      <About />
      <Experience />
      <Skills />
      <Services />
      <Contact />
    </main>
  )
}
