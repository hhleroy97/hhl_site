import { motion } from 'framer-motion'
import PageSection from '../ui/PageSection'

const skillCategories = [
  {
    title: 'Cloud & Infrastructure',
    icon: '☁️',
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
    ],
  },
  {
    title: 'Systems & Robotics',
    icon: '🤖',
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
    ],
  },
  {
    title: 'Visual & Creative Tech',
    icon: '🎨',
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
    ],
  },
  {
    title: 'Product & Strategy',
    icon: '📊',
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
    ],
  },
]

export default function SkillsTools() {
  return (
    <PageSection
      id='skills'
      tagline='Skills'
      taglineColor='purple'
      title='Technologies I Work With'
      subtitle='across the full stack'
      className='bg-gradient-to-b from-zinc-900/60 to-zinc-900/90'
      cardVariant='floating'
    >
      {/* Ultra Compact Grid */}
      <div className='max-w-6xl mx-auto'>
        {/* Skills Matrix - Compact 2x2 */}
        <div className='grid md:grid-cols-2 gap-3'>
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              className='group'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            >
              {/* Category Card - Ultra Compact */}
              <motion.div
                className='group relative bg-black/30 backdrop-blur-md rounded-lg border border-white/20 p-3 transition-all duration-300 h-full shadow-xl hover:shadow-2xl cursor-pointer overflow-hidden'
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
                  {/* Category Header - Minimal */}
                  <div className='flex items-center gap-2 mb-2'>
                    <div className='text-sm'>{category.icon}</div>
                    <h3 className='text-sm font-bold text-white'>
                      {category.title}
                    </h3>
                  </div>

                  {/* Skills Ultra Compact - 4 columns */}
                  <div className='grid grid-cols-4 gap-1'>
                    {category.skills.slice(0, 8).map((skill, skillIndex) => (
                      <motion.div
                        key={skill}
                        className='group/skill relative'
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.4,
                          delay: categoryIndex * 0.1 + skillIndex * 0.02,
                          type: 'spring',
                          stiffness: 150,
                        }}
                        whileHover={{ scale: 1.02, y: -1 }}
                      >
                        {/* Skill Pill - Ultra Small */}
                        <div className='relative px-1.5 py-0.5 bg-white/10 border border-white/20 rounded-md backdrop-blur-sm transition-all duration-300 group-hover/skill:bg-white/15 group-hover/skill:border-white/30'>
                          <span className='text-xs font-medium text-zinc-300 group-hover/skill:text-white transition-colors duration-300 truncate block'>
                            {skill}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Category Color Accent */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${category.color} rounded-b-lg opacity-0 group-hover:opacity-60 transition-opacity duration-300`}
                  />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Skills Summary - Ultra Compact */}
        <motion.div
          className='mt-3 grid grid-cols-4 gap-2'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <motion.div
            className='group text-center p-2 bg-black/30 backdrop-blur-md rounded-lg border border-white/20 shadow-lg cursor-pointer overflow-hidden relative'
            whileHover={{
              scale: 1.02,
              y: -1,
              borderColor: 'rgba(255, 255, 255, 0.4)',
              boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
              transition: { duration: 0.3, ease: 'easeOut' },
            }}
          >
            <div className='absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-black/[0.03] pointer-events-none' />
            <div className='absolute -top-5 -right-5 w-10 h-10 bg-white/10 rounded-full blur-xl pointer-events-none group-hover:bg-white/15 transition-all duration-500' />
            <div className='relative z-10'>
              <div className='text-sm font-bold text-purple-400'>32+</div>
              <div className='text-xs text-zinc-400'>Technologies</div>
            </div>
          </motion.div>
          <motion.div
            className='group text-center p-2 bg-black/30 backdrop-blur-md rounded-lg border border-white/20 shadow-lg cursor-pointer overflow-hidden relative'
            whileHover={{
              scale: 1.02,
              y: -1,
              borderColor: 'rgba(255, 255, 255, 0.4)',
              boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
              transition: { duration: 0.3, ease: 'easeOut' },
            }}
          >
            <div className='absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-black/[0.03] pointer-events-none' />
            <div className='absolute -top-5 -right-5 w-10 h-10 bg-white/10 rounded-full blur-xl pointer-events-none group-hover:bg-white/15 transition-all duration-500' />
            <div className='relative z-10'>
              <div className='text-sm font-bold text-cyan-400'>4+</div>
              <div className='text-xs text-zinc-400'>Years Experience</div>
            </div>
          </motion.div>
          <motion.div
            className='group text-center p-2 bg-black/30 backdrop-blur-md rounded-lg border border-white/20 shadow-lg cursor-pointer overflow-hidden relative'
            whileHover={{
              scale: 1.02,
              y: -1,
              borderColor: 'rgba(255, 255, 255, 0.4)',
              boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
              transition: { duration: 0.3, ease: 'easeOut' },
            }}
          >
            <div className='absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-black/[0.03] pointer-events-none' />
            <div className='absolute -top-5 -right-5 w-10 h-10 bg-white/10 rounded-full blur-xl pointer-events-none group-hover:bg-white/15 transition-all duration-500' />
            <div className='relative z-10'>
              <div className='text-sm font-bold text-teal-400'>Multi</div>
              <div className='text-xs text-zinc-400'>Domain Expert</div>
            </div>
          </motion.div>
          <motion.div
            className='group text-center p-2 bg-black/30 backdrop-blur-md rounded-lg border border-white/20 shadow-lg cursor-pointer overflow-hidden relative'
            whileHover={{
              scale: 1.02,
              y: -1,
              borderColor: 'rgba(255, 255, 255, 0.4)',
              boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
              transition: { duration: 0.3, ease: 'easeOut' },
            }}
          >
            <div className='absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-black/[0.03] pointer-events-none' />
            <div className='absolute -top-5 -right-5 w-10 h-10 bg-white/10 rounded-full blur-xl pointer-events-none group-hover:bg-white/15 transition-all duration-500' />
            <div className='relative z-10'>
              <div className='text-sm font-bold text-amber-400'>Full</div>
              <div className='text-xs text-zinc-400'>Stack Coverage</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Background Accent Elements - Minimal */}
      <div className='absolute top-20 left-20 w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-20' />
      <div
        className='absolute top-40 right-32 w-1 h-1 bg-cyan-400 rounded-full animate-ping opacity-20'
        style={{ animationDelay: '1s' }}
      />
      <div
        className='absolute bottom-32 left-1/4 w-1 h-1 bg-teal-400 rounded-full animate-ping opacity-20'
        style={{ animationDelay: '2s' }}
      />
    </PageSection>
  )
}
