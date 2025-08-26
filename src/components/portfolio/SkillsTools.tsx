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
      cardVariant='cutcorner'
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
              <div className='relative bg-gradient-to-r from-white/5 to-white/[0.02] rounded-lg border border-white/10 p-3 hover:border-white/20 hover:from-white/8 transition-all duration-300 h-full'>
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
          <div className='text-center p-2 bg-purple-500/10 rounded-lg border border-purple-500/20'>
            <div className='text-sm font-bold text-purple-400'>32+</div>
            <div className='text-xs text-zinc-400'>Technologies</div>
          </div>
          <div className='text-center p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/20'>
            <div className='text-sm font-bold text-cyan-400'>4+</div>
            <div className='text-xs text-zinc-400'>Years Experience</div>
          </div>
          <div className='text-center p-2 bg-teal-500/10 rounded-lg border border-teal-500/20'>
            <div className='text-sm font-bold text-teal-400'>Multi</div>
            <div className='text-xs text-zinc-400'>Domain Expert</div>
          </div>
          <div className='text-center p-2 bg-amber-500/10 rounded-lg border border-amber-500/20'>
            <div className='text-sm font-bold text-amber-400'>Full</div>
            <div className='text-xs text-zinc-400'>Stack Coverage</div>
          </div>
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
