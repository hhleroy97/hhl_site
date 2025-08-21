import Navigation from './ui/Navigation'
import SimpleHero from './SimpleHero'
import SimpleShowcase from './portfolio/SimpleShowcase'
import Services from './portfolio/Services'
import NewAbout from './portfolio/NewAbout'
import TestimonialsPlaceholder from './portfolio/TestimonialsPlaceholder'
import ContactFooter from './portfolio/ContactFooter'
import { Canvas } from '@react-three/fiber'
import { Line } from '@react-three/drei'

export default function SimplePortfolio() {
  return (
    <div className="relative min-h-screen bg-zinc-900 text-white">
      {/* Direct Canvas test */}
      <div className="fixed inset-0 -z-10">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={2} />
          <Line
            points={[[-10, -5, 0], [0, 0, 0], [10, 5, 0]]}
            color="cyan"
            lineWidth={10}
          />
          <Line
            points={[[-10, 5, 0], [0, 0, 0], [10, -5, 0]]}
            color="fuchsia"
            lineWidth={10}
          />
        </Canvas>
      </div>
      
      <Navigation />
      <SimpleHero />
      <SimpleShowcase />
      <Services />
      <NewAbout />
      <TestimonialsPlaceholder />
      <ContactFooter />
    </div>
  )
}