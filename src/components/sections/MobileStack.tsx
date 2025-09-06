import About from './about'
import Experience from './experience'
import Skills from './skills'
import Services from './services'
import Contact from './contact'
import Landing from './landing'

export default function MobileStack() {
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
