import { motion } from 'framer-motion'
import PageSection from '../ui/PageSection'

const skillCategories = [
  {
    title: 'Cloud & Infra',
    icon: (
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
          d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
        />
      </svg>
    ),
    color: 'from-purple-400 to-cyan-500',
    skills: [
      'AWS',
      'IoT Core',
      'Kinesis',
      'Athena',
      'Lambda',
      'DynamoDB',
      'S3',
      'CloudWatch',
      'SQS',
      'SNS',
    ],
  },
  {
    title: 'Systems & Robotics',
    icon: (
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
          d='M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
        />
      </svg>
    ),
    color: 'from-cyan-400 to-teal-500',
    skills: [
      'ROS2',
      'PX4',
      'OTA Updates',
      'Telemetry',
      'MQTT',
      'Protocol Buffers',
      'Docker',
      'Linux',
      'Embedded',
    ],
  },
  {
    title: 'Visual & Creative',
    icon: (
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
          d='M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z'
        />
      </svg>
    ),
    color: 'from-teal-400 to-emerald-500',
    skills: [
      'TouchDesigner',
      'React Three Fiber',
      'Three.js',
      'Kinect',
      'MIDI',
      'WebGL',
      'Shaders',
      'Processing',
      'Max/MSP',
    ],
  },
  {
    title: 'Product & Process',
    icon: (
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
          d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
        />
      </svg>
    ),
    color: 'from-amber-400 to-orange-500',
    skills: [
      'Agile',
      'Scrum',
      'Notion',
      'Roadmapping',
      'Figma',
      'Analytics',
      'User Research',
      'A/B Testing',
      'Jira',
    ],
  },
]

export default function SkillsTools() {
  return (
    <PageSection
      id='skills'
      tagline='Skills'
      taglineColor='amber'
      title='Technologies I work with'
      subtitle='across the stack'
      className='bg-gradient-to-b from-zinc-900/60 to-zinc-900/90'
      cardVariant='cutcorner'
    >
      {/* Floating particles */}
      <div className='absolute top-20 left-20 w-2 h-2 bg-cyan-400 rounded-full animate-ping opacity-20' />
      <div
        className='absolute top-40 right-32 w-1.5 h-1.5 bg-fuchsia-400 rounded-full animate-ping opacity-20'
        style={{ animationDelay: '1s' }}
      />
      <div
        className='absolute bottom-32 left-1/4 w-1 h-1 bg-emerald-400 rounded-full animate-ping opacity-20'
        style={{ animationDelay: '2s' }}
      />

      <div className='space-y-6 overflow-y-auto max-h-[60vh]'>
        {skillCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.title}
            className='relative'
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
          >
            {/* Category header */}
            <div className='flex items-center gap-3 mb-4'>
              <motion.div
                className={`p-2 bg-gradient-to-r ${category.color} rounded-lg text-white shadow-lg`}
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                {category.icon}
              </motion.div>
              <h3 className='text-xl font-bold text-white'>{category.title}</h3>
            </div>

            {/* Skills pills */}
            <div className='flex flex-wrap gap-2'>
              {category.skills.map((skill, skillIndex) => (
                <motion.div
                  key={skill}
                  className='group relative'
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: categoryIndex * 0.2 + skillIndex * 0.05,
                    type: 'spring',
                    stiffness: 100,
                  }}
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  {/* Pill background */}
                  <div className='relative px-3 py-1.5 bg-white/10 border border-white/20 rounded-full backdrop-blur-sm transition-all duration-300 group-hover:bg-white/20 group-hover:border-white/40'>
                    <span className='text-xs font-medium text-zinc-300 group-hover:text-white transition-colors duration-300'>
                      {skill}
                    </span>
                  </div>

                  {/* Glow effect on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${category.color} rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm -z-10`}
                  />
                </motion.div>
              ))}
            </div>

            {/* Category separator line */}
            {categoryIndex < skillCategories.length - 1 && (
              <motion.div
                className='mt-6 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent'
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: categoryIndex * 0.1 + 0.3,
                }}
              />
            )}
          </motion.div>
        ))}
      </div>
    </PageSection>
  )
}
