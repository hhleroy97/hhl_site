import About from './about'
import Experience from './experience'
import Skills from './skills'
import Services from './services'
import Contact from './contact'
import Landing from './landing'

export default function MobileStack() {
  return (
    <main className='block md:hidden w-full relative min-h-screen bg-black'>
      {/* Each section keeps its id for hash anchors; suppress per-section BG */}
      <Landing />
      <About />
      <Experience />
      <Skills />
      <Services />
      <Contact />
    </main>
  )
}
