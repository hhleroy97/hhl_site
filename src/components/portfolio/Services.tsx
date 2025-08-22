import { motion } from 'framer-motion'
import PageSection from '../ui/PageSection'

const services = [
  {
    title: 'Cloud & Data',
    description:
      'AWS, Kinesis, telemetry ingestion, 10M+ req/day, sub-100ms latency',
    outcomes:
      'Reduced infrastructure costs 40% while scaling to handle 3x traffic growth.',
    icon: (
      <svg
        className='w-8 h-8'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10'
        />
      </svg>
    ),
    technologies: [
      'AWS',
      'Kinesis',
      'IoT Core',
      'Lambda',
      'Athena',
      'DynamoDB',
    ],
    color: 'from-cyan-500 to-blue-600',
    bgGradient: 'from-cyan-500/10 to-blue-600/10',
    borderColor: 'border-cyan-500/30',
    glowColor: 'shadow-cyan-500/20',
  },
  {
    title: 'Real-Time Visuals',
    description: 'TouchDesigner, Kinect/MIDI visuals, R3F interactivity',
    outcomes:
      'Created immersive experiences for 500+ person events, 99.9% uptime.',
    icon: (
      <svg
        className='w-8 h-8'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z'
        />
      </svg>
    ),
    technologies: [
      'TouchDesigner',
      'Three.js',
      'Kinect',
      'MIDI',
      'WebGL',
      'Shaders',
    ],
    color: 'from-fuchsia-500 to-purple-600',
    bgGradient: 'from-fuchsia-500/10 to-purple-600/10',
    borderColor: 'border-fuchsia-500/30',
    glowColor: 'shadow-fuchsia-500/20',
  },
  {
    title: 'Product Strategy',
    description: 'Sprint planning, roadmap design, MVP scoping',
    outcomes:
      'Led 3 product launches, reduced time-to-market by 30% through agile processes.',
    icon: (
      <svg
        className='w-8 h-8'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
        />
      </svg>
    ),
    technologies: [
      'Agile',
      'Scrum',
      'Notion',
      'Figma',
      'Roadmapping',
      'Analytics',
    ],
    color: 'from-emerald-500 to-green-600',
    bgGradient: 'from-emerald-500/10 to-green-600/10',
    borderColor: 'border-emerald-500/30',
    glowColor: 'shadow-emerald-500/20',
  },
]

export default function Services() {
  return (
    <PageSection
      id='services'
      tagline='Services'
      taglineColor='cyan'
      title='Building systems that scale'
      subtitle='and experiences that inspire'
      cardVariant='floating'
    >
      <div className='max-w-7xl mx-auto'>
        <div className='grid lg:grid-cols-3 gap-8'>
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className='relative group'
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Enhanced Floating Card */}
              <motion.div
                className={`relative p-8 rounded-2xl bg-gradient-to-br from-zinc-900/80 to-zinc-900/60 border ${service.borderColor} shadow-2xl ${service.glowColor} overflow-hidden group-hover:shadow-2xl transition-all duration-500`}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.3, ease: 'easeOut' },
                }}
              >
                {/* Animated background gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                {/* Floating geometric elements */}
                <div className='absolute top-4 right-4 w-16 h-16 border border-current opacity-10 rounded-full group-hover:opacity-20 transition-opacity duration-500' />
                <div className='absolute bottom-4 left-4 w-8 h-8 border border-current opacity-10 group-hover:opacity-20 transition-opacity duration-500' />

                {/* Enhanced Icon */}
                <motion.div
                  className={`relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} p-4 text-white shadow-lg mb-6 group-hover:shadow-xl transition-all duration-300`}
                  whileHover={{
                    rotate: 5,
                    scale: 1.1,
                    transition: { duration: 0.2, ease: 'easeOut' },
                  }}
                >
                  {service.icon}
                </motion.div>

                {/* Content */}
                <div className='relative z-10 space-y-4'>
                  {/* Enhanced Title */}
                  <h3 className='text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-300 group-hover:bg-clip-text transition-all duration-300'>
                    {service.title}
                  </h3>

                  {/* Enhanced Description */}
                  <p className='text-zinc-300 leading-relaxed group-hover:text-zinc-200 transition-colors duration-300'>
                    {service.description}
                  </p>

                  {/* Enhanced Outcomes */}
                  <div className='p-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm'>
                    <p className='text-sm text-zinc-300 font-medium'>
                      <span className='text-emerald-400 font-semibold'>
                        Outcome:{' '}
                      </span>
                      {service.outcomes}
                    </p>
                  </div>

                  {/* Enhanced Technology Stack */}
                  <div className='space-y-3'>
                    <h4 className='text-sm font-semibold text-zinc-400 uppercase tracking-wide'>
                      Technologies
                    </h4>
                    <div className='flex flex-wrap gap-2'>
                      {service.technologies.map((tech, techIndex) => (
                        <motion.span
                          key={tech}
                          className={`px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${service.color} text-white shadow-md backdrop-blur-sm border border-white/20`}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.3,
                            delay: index * 0.1 + techIndex * 0.05,
                          }}
                          whileHover={{
                            scale: 1.1,
                            y: -2,
                            transition: { duration: 0.2, ease: 'easeOut' },
                          }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Enhanced glow effect on hover */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-5 blur-xl transition-opacity duration-500`}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Call to Action */}
        <motion.div
          className='mt-16 text-center'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.a
            href='#contact'
            className='inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 group'
            whileHover={{
              scale: 1.05,
              y: -4,
              transition: { duration: 0.2, ease: 'easeOut' },
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className='relative z-10'>
              Ready to Build Something Amazing?
            </span>
            {/* Enhanced glow effect */}
            <div className='absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm' />
          </motion.a>
        </motion.div>
      </div>
    </PageSection>
  )
}
