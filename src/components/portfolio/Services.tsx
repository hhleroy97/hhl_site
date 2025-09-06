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
      title='Professional Services'
      subtitle='From Consultation to Delivery'
      cardVariant='floating'
    >
      <div className='w-full px-4'>
        <p className='text-base text-zinc-400 max-w-2xl mx-auto text-center mb-8'>
          Transform your ideas into reality with expert development services.
          Start with a free consultation to discuss your project needs.
        </p>

        {/* Service Cards - Responsive Grid */}
        <div className='w-full max-w-7xl mx-auto'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-16 lg:gap-12 xl:gap-8'>
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                className='h-full'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
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
      </div>
    </PageSection>
  )
}
