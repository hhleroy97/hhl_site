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
    title: 'Free 15-Minute Consultation',
    description:
      'Quick discovery call to understand your project needs and explore how we can work together',
    price: 'FREE',
    icon: <FaCalendarAlt />,
    isHighlighted: true,
  },
  {
    id: 'advisory',
    title: 'Technical Advisory Call',
    description:
      'Strategic guidance on technology decisions, architecture review, or problem-solving session',
    price: '$150/hr',
    icon: <FaLightbulb />,
  },
  {
    id: 'code-review',
    title: 'Code Review & Optimization',
    description:
      'Comprehensive review of your existing codebase with optimization recommendations and security analysis',
    price: '$200-500',
    icon: <FaSearchengin />,
  },
  {
    id: 'mvp',
    title: 'MVP Development',
    description:
      'End-to-end development of your minimum viable product using modern tech stack',
    price: '$3,000-8,000',
    icon: <FaRocket />,
  },
  {
    id: 'fullstack',
    title: 'Full-Stack Web Application',
    description:
      'Complete web application development with frontend, backend, database, and deployment',
    price: '$8,000-25,000',
    icon: <FaGlobe />,
  },
  {
    id: 'interactive',
    title: 'Real-Time Interactive Systems',
    description:
      'Custom interactive installations, real-time visual systems, and IoT integrations',
    price: '$10,000-30,000',
    icon: <FaBolt />,
  },
]

export default function Services() {
  const handleServiceSelect = (serviceId: string) => {
    // TODO: Implement Calendly integration for consultation
    // TODO: Implement quote request for other services
    console.log(`Selected service: ${serviceId}`)
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
      <div className='text-center mb-12 flex-shrink-0'>
        <h2
          className='text-4xl md:text-5xl font-bold mb-4'
          style={{ fontFamily: 'Orbitron, sans-serif' }}
        >
          <span className='text-white'>Professional Services</span>
          <br />
          <span className='bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent'>
            From Consultation to Delivery
          </span>
        </h2>
        <p className='text-lg text-zinc-400 max-w-2xl mx-auto'>
          Transform your ideas into reality with expert development services.
          Start with a free consultation to discuss your project needs.
        </p>
      </div>

      {/* Service Cards Grid */}
      <div className='max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ServiceCard
                title={service.title}
                description={service.description}
                price={service.price}
                icon={service.icon}
                isHighlighted={service.isHighlighted}
                onSelect={() => handleServiceSelect(service.id)}
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          className='mt-16 text-center'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className='bg-black/30 backdrop-blur-md border border-white/20 rounded-lg p-8 max-w-2xl mx-auto'>
            <h3 className='text-2xl font-bold text-white mb-4'>
              Ready to Get Started?
            </h3>
            <p className='text-zinc-300 mb-6'>
              Every project begins with understanding your unique needs. Book a
              free 15-minute consultation to discuss your vision and get a
              custom quote.
            </p>
            <motion.button
              className='bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-400 hover:to-cyan-400 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleServiceSelect('consultation')}
            >
              Schedule Free Consultation
            </motion.button>
          </div>
        </motion.div>
      </div>
    </PageSection>
  )
}
