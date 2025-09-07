import { motion } from 'framer-motion'
import { useState } from 'react'
import PageSection from '../../ui/PageSection'
import ServiceCard from './ServiceCard'
import {
  FaCalendarAlt,
  FaLightbulb,
  FaSearchengin,
  FaRocket,
  FaGlobe,
  FaBolt,
  FaHandshake,
  FaBriefcase,
} from 'react-icons/fa'

const quickServices = [
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

const longTermServices = [
  {
    id: 'freelance',
    title: 'Freelance\nContract',
    description:
      'Ongoing development partnership for your team with flexible commitment and specialized expertise',
    price: 'Negotiable',
    icon: <FaHandshake />,
    isHighlighted: true,
  },
  {
    id: 'fulltime',
    title: 'Full-Time\nEmployment',
    description:
      'Join your team as a dedicated full-stack developer with comprehensive benefits and long-term commitment',
    price: 'Negotiable',
    icon: <FaBriefcase />,
  },
]

export default function Services() {
  const [serviceType, setServiceType] = useState<'quick' | 'longterm'>('quick')

  // Show services based on toggle for both mobile and desktop
  const currentServices =
    serviceType === 'quick' ? quickServices : longTermServices

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
      flipMobileCorners={true}
    >
      {/* Desktop: "I need something..." text and toggle - RIGHT UNDER TAGLINE */}
      <div className='hidden sm:block mb-4 border-2 border-blue-400'>
        {/* DESKTOP TOGGLE SECTION */}
        {/* "I need something..." text */}
        <div className='mb-4'>
          <p className='text-lg text-white text-center font-medium'>
            I need something...
          </p>
        </div>

        {/* Toggle Switch */}
        <div className='flex items-center justify-center'>
          <div className='relative bg-black/40 rounded-full p-1 border border-white/20'>
            <div className='flex'>
              <button
                onClick={() => setServiceType('quick')}
                className={`px-8 py-3 rounded-full text-base font-medium transition-all duration-300 ${
                  serviceType === 'quick'
                    ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Quick
              </button>
              <button
                onClick={() => setServiceType('longterm')}
                className={`px-8 py-3 rounded-full text-base font-medium transition-all duration-300 ${
                  serviceType === 'longterm'
                    ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Long Term
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Description Text */}
      <p className='sm:hidden text-sm text-zinc-400 max-w-2xl mx-auto text-center mb-6 border-2 border-yellow-400'>
        {/* MOBILE DESCRIPTION */}
        Transform your ideas into reality with expert development services.
        Start with a free consultation to discuss your project needs.
      </p>

      {/* Mobile: Toggle below description */}
      <div className='sm:hidden mb-4 border-2 border-orange-400'>
        {/* MOBILE TOGGLE SECTION */}
        {/* "I need something..." text */}
        <div className='mb-4'>
          <p className='text-base text-white text-center font-medium'>
            I need something...
          </p>
        </div>

        {/* Toggle Switch */}
        <div className='flex items-center justify-center'>
          <div className='relative bg-black/40 rounded-full p-1 border border-white/20'>
            <div className='flex'>
              <button
                onClick={() => setServiceType('quick')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  serviceType === 'quick'
                    ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Quick
              </button>
              <button
                onClick={() => setServiceType('longterm')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  serviceType === 'longterm'
                    ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Long Term
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className='w-full px-2 sm:px-4 border-4 border-red-500 pt-0 pb-4 -mt-4 flex flex-col'>
        {/* MAIN CONTENT CONTAINER - MOVED UP */}

        {/* Service Cards - Desktop and Mobile with Toggle */}
        <div className='w-full border-4 border-violet-500 flex-1 h-full min-h-full'>
          {/* CARDS MAIN CONTAINER - FULL HEIGHT OF RED CONTAINER */}
          {/* Desktop: Toggle-based slim card grid layout */}
          <div className='hidden sm:block border-4 border-emerald-500 h-full'>
            {/* DESKTOP CARDS WRAPPER - FULL HEIGHT */}
            {serviceType === 'longterm' ? (
              /* Long-term: Centered layout for 2 services with constrained width */
              <div className='flex justify-center gap-8 sm:gap-12 md:gap-16 lg:gap-12 xl:gap-8 border-4 border-amber-500 h-full items-center'>
                {/* DESKTOP LONGTERM LAYOUT - FULL HEIGHT CENTERED */}
                {currentServices.map((service, index) => (
                  <motion.div
                    key={service.id}
                    className='h-full w-full max-w-[270px] sm:max-w-[300px] md:max-w-[350px] lg:max-w-[300px] xl:max-w-[240px]'
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
            ) : (
              /* Quick: Grid layout for 6 services */
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8 sm:gap-12 md:gap-16 lg:gap-12 xl:gap-8 border-4 border-sky-500 h-full items-center'>
                {/* DESKTOP QUICK GRID - FULL HEIGHT */}
                {currentServices.map((service, index) => (
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
            )}
          </div>

          {/* Mobile: Toggle-based layout */}
          <div className='sm:hidden border-4 border-fuchsia-500 h-full'>
            {/* MOBILE CARDS WRAPPER - FULL HEIGHT */}
            {serviceType === 'longterm' ? (
              /* Long-term: Centered flex layout */
              <div className='flex flex-col gap-6'>
                {currentServices.map(service => (
                  <motion.div
                    key={service.id}
                    className='h-full'
                    initial={false}
                    animate={{ opacity: 1, y: 0 }}
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
            ) : (
              /* Quick: Mobile stack layout */
              <div className='flex flex-col gap-6'>
                {currentServices.map(service => (
                  <motion.div
                    key={service.id}
                    className='h-full'
                    initial={false}
                    animate={{ opacity: 1, y: 0 }}
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
            )}
          </div>
        </div>
      </div>
    </PageSection>
  )
}
