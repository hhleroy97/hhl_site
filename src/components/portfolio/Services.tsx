import { motion } from 'framer-motion'

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
  },
]

export default function Services() {
  return (
    <section id='services' className='py-24 relative overflow-hidden'>
      {/* Background effects */}
      <div className='absolute inset-0 bg-gradient-to-b from-zinc-900/50 to-zinc-900/80' />
      <div className='absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent' />
      <div className='absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-fuchsia-500/20 to-transparent' />

      <div className='container-custom relative z-10'>
        <motion.div
          className='text-center mb-16'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className='inline-flex items-center gap-3 px-6 py-3 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-lg font-medium mb-6'
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className='w-3 h-3 bg-cyan-400 rounded-full animate-pulse' />
            Services
          </motion.div>
          <h2 className='text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent'>
            Engineering at the intersection of
            <br />
            <span className='bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent'>
              art, insight, and autonomy
            </span>
          </h2>
        </motion.div>

        <div className='grid md:grid-cols-3 gap-8'>
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className='relative group'
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              {/* Card background with glow effect */}
              <div className='absolute inset-0 bg-gradient-to-b from-white/5 to-white/[0.02] rounded-2xl border border-white/10 transition-all duration-500 group-hover:border-white/20 group-hover:from-white/10 group-hover:to-white/[0.05]' />
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`}
              />

              {/* Card content */}
              <div className='relative p-8 space-y-6'>
                {/* Icon */}
                <motion.div
                  className={`inline-flex p-3 bg-gradient-to-br ${service.color} rounded-xl text-white`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {service.icon}
                </motion.div>

                {/* Title */}
                <h3 className='text-2xl font-bold text-white group-hover:text-cyan-100 transition-colors duration-300'>
                  {service.title}
                </h3>

                {/* Description */}
                <p className='text-zinc-300 leading-relaxed'>
                  {service.description}
                </p>

                {/* Outcomes */}
                <div className='p-4 bg-white/5 rounded-xl border border-white/10'>
                  <p className='text-sm text-zinc-400 leading-relaxed'>
                    <span className='text-emerald-400 font-medium'>
                      Impact:
                    </span>{' '}
                    {service.outcomes}
                  </p>
                </div>

                {/* Technologies */}
                <div className='flex flex-wrap gap-2'>
                  {service.technologies.map(tech => (
                    <span
                      key={tech}
                      className='px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs font-medium text-zinc-300 hover:bg-white/20 hover:text-white transition-all duration-300 cursor-default'
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Hover effect arrow */}
                <motion.div
                  className='absolute top-8 right-8 opacity-0 group-hover:opacity-100 text-cyan-400'
                  initial={{ x: -10 }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg
                    className='w-5 h-5'
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
