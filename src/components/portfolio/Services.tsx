import { motion } from 'framer-motion'
import PageSection from '../ui/PageSection'

const services = [
  {
    title: 'Cloud & Data Systems',
    description:
      'AWS • Kinesis • IoT Core • 10M+ events/day • Sub-100ms latency',
    impact:
      'Reduced infrastructure costs 40% while scaling to handle 3x traffic growth',
    technologies: ['AWS', 'Kinesis', 'IoT Core', 'Lambda', 'DynamoDB'],
    gradient: 'from-purple-500 to-cyan-500',
  },
  {
    title: 'Real-Time Visual Systems',
    description:
      'TouchDesigner • Kinect/MIDI • R3F • WebGL • Live performances',
    impact:
      'Created immersive experiences for 500+ person events with 99.9% uptime',
    technologies: ['TouchDesigner', 'Three.js', 'Kinect', 'MIDI', 'WebGL'],
    gradient: 'from-cyan-500 to-emerald-500',
  },
  {
    title: 'Product Strategy & Execution',
    description:
      'Sprint planning • Roadmap design • MVP scoping • Team leadership',
    impact:
      'Led 3 product launches, reduced time-to-market by 30% through agile processes',
    technologies: ['Agile', 'Scrum', 'Notion', 'Figma', 'Analytics'],
    gradient: 'from-emerald-500 to-teal-500',
  },
]

export default function Services() {
  return (
    <PageSection
      id='services'
      tagline='Services'
      taglineColor='cyan'
      title='Engineering at the Intersection'
      subtitle='where art meets insight and autonomy'
    >
      {/* Ultra Compact Layout */}
      <div className='max-w-5xl mx-auto space-y-2'>
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            className='group relative'
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            {/* Service Row - Ultra Compact */}
            <motion.div
              className='group relative bg-black/30 backdrop-blur-md border border-white/20 rounded-lg p-3 transition-all duration-300 shadow-xl hover:shadow-2xl cursor-pointer overflow-hidden'
              whileHover={{
                scale: 1.01,
                y: -2,
                borderColor: 'rgba(255, 255, 255, 0.4)',
                boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3)',
                transition: { duration: 0.3, ease: 'easeOut' },
              }}
            >
              {/* Enhanced depth effects */}
              <div className='absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-black/[0.03] pointer-events-none' />
              <div className='absolute -top-10 -right-10 w-20 h-20 bg-white/10 rounded-full blur-2xl pointer-events-none group-hover:bg-white/15 transition-all duration-500' />
              <div className='absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent group-hover:via-white/70 transition-all duration-300' />
              <div className='relative z-10'>
                <div className='flex items-start gap-3'>
                  {/* Icon - Smaller */}
                  <div
                    className={`flex-shrink-0 w-2 h-2 bg-gradient-to-r ${service.gradient} rounded-full mt-1.5`}
                  ></div>

                  <div className='flex-1 min-w-0'>
                    {/* Title & Description - Compact */}
                    <div className='mb-2'>
                      <h3 className='text-base font-bold text-white group-hover:text-purple-100 transition-colors mb-1'>
                        {service.title}
                      </h3>
                      <p className='text-xs text-zinc-300 leading-relaxed mb-1'>
                        {service.description}
                      </p>
                      {/* Impact - Inline */}
                      <p className='text-xs text-emerald-400'>
                        {service.impact}
                      </p>
                    </div>

                    {/* Technologies - Inline */}
                    <div className='flex flex-wrap gap-1'>
                      {service.technologies.map(tech => (
                        <span
                          key={tech}
                          className='px-1.5 py-0.5 bg-white/10 border border-white/20 rounded-full text-xs font-medium text-zinc-300'
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Arrow - Smaller */}
                  <motion.div
                    className='flex-shrink-0 opacity-0 group-hover:opacity-100 text-cyan-400'
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg
                      className='w-3 h-3'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M17 8l4 4m0 0l-4 4m4-4H3'
                      />
                    </svg>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}

        {/* Bottom CTA - Compact */}
        <motion.div
          className='group mt-3 p-3 bg-black/30 backdrop-blur-md rounded-lg border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden'
          whileHover={{
            scale: 1.01,
            y: -1,
            borderColor: 'rgba(255, 255, 255, 0.4)',
            boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3)',
            transition: { duration: 0.3, ease: 'easeOut' },
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Enhanced depth effects */}
          <div className='absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-black/[0.03] pointer-events-none' />
          <div className='absolute -top-10 -right-10 w-20 h-20 bg-white/10 rounded-full blur-2xl pointer-events-none group-hover:bg-white/15 transition-all duration-500' />
          <div className='absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent group-hover:via-white/70 transition-all duration-300' />
          <div className='relative z-10 flex items-center justify-between'>
            <div className='text-xs text-zinc-300'>
              <span className='text-white font-medium'>
                Ready to build something extraordinary?
              </span>
              <span className='text-zinc-400 ml-2'>
                Let's turn your vision into scalable reality.
              </span>
            </div>
            <div className='flex gap-1'>
              <div className='w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse'></div>
              <div
                className='w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse'
                style={{ animationDelay: '0.5s' }}
              ></div>
              <div
                className='w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse'
                style={{ animationDelay: '1s' }}
              ></div>
            </div>
          </div>
        </motion.div>
      </div>
    </PageSection>
  )
}
