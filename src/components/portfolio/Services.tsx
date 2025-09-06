import { motion } from 'framer-motion'
import PageSection from '../ui/PageSection'
import ServiceCard from './ServiceCard'
import {
  FaCalendarAlt,
  FaLightbulb,
  FaSearchengin,
  FaRocket,
  FaGlobe,
  FaBolt,
} from 'react-icons/fa'

const services = [
  {
    id: 'consultation',
    title: 'Free 15-Minute\nConsultation',
    description:
      'Quick discovery call to understand your project needs and explore how we can work together',
    price: 'FREE',
    icon: <FaCalendarAlt />,
    isHighlighted: true,
  },
  {
    id: 'advisory',
    title: 'Technical Advisory\nCall',
    description:
      'Strategic guidance on technology decisions, architecture review, or problem-solving session',
    price: '$199/hr',
    icon: <FaLightbulb />,
  },
  {
    id: 'code-review',
    title: 'Code Review &\nOptimization',
    description:
      'Comprehensive review of your existing codebase with optimization recommendations and security analysis',
    price: '$499+',
    icon: <FaSearchengin />,
  },
  {
    id: 'mvp',
    title: 'MVP\nDevelopment',
    description:
      'End-to-end development of your minimum viable product using modern tech stack',
    price: '$4,999-9,999',
    icon: <FaRocket />,
  },
  {
    id: 'fullstack',
    title: 'Full-Stack Web\nApplication',
    description:
      'Complete web application development with frontend, backend, database, and deployment',
    price: '$9,999+',
    icon: <FaGlobe />,
  },
  {
    id: 'interactive',
    title: 'Real-Time Interactive\nSystems',
    description:
      'Custom interactive installations, real-time visual systems, and IoT integrations',
    price: '$9,999+',
    icon: <FaBolt />,
  },
]

export default function Services() {
  const handleServiceSelect = (serviceId?: string) => {
    // Navigate with service parameter if provided
    if (serviceId) {
      // Update the URL with the service parameter
      const url = new URL(window.location.href)
      url.searchParams.set('service', serviceId)
      window.history.replaceState({}, '', url.toString())
    }

    // Navigate to contact section
    window.location.hash = '#contact'

    // Force scroll after a tiny delay
    setTimeout(() => {
      const contactElement = document.getElementById('contact')
      if (contactElement) {
        contactElement.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }

  return (
    <PageSection
      id='services'
      tagline='Services'
      taglineColor='cyan'
      title=''
      subtitle=''
    >
      {/* Services Header */}
      <div className='text-center mb-6 flex-shrink-0 -mt-6'>
        <h2
          className='text-4xl md:text-5xl font-bold mb-3'
          style={{ fontFamily: 'Orbitron, sans-serif' }}
        >
          <span className='text-white'>Professional Services</span>
          <br />
          <span className='bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent'>
            From Consultation to Delivery
          </span>
        </h2>
        <p className='text-base text-zinc-400 max-w-2xl mx-auto'>
          Transform your ideas into reality with expert development services.
          Start with a free consultation to discuss your project needs.
        </p>
      </div>

      {/* Service Cards - Full Width Row */}
      <div className='w-full'>
        <div className='flex flex-col md:flex-row gap-2 md:gap-1 h-auto'>
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className='flex-1 min-w-0'
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: 'easeOut',
              }}
            >
              <ServiceCard
                title={service.title}
                description={service.description}
                price={service.price}
                icon={service.icon}
                isHighlighted={service.isHighlighted}
                onSelect={() => handleServiceSelect(service.id)}
                serviceId={service.id}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </PageSection>
  )
}
