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
    color: 'from-cyan-400 to-blue-500',
    bgGradient: 'from-cyan-500/10 to-blue-600/10',
    borderColor: 'border-cyan-500/30',
    glowColor: 'shadow-cyan-500/20',
    skills: [
      { name: 'AWS', level: 95 },
      { name: 'IoT Core', level: 90 },
      { name: 'Kinesis', level: 88 },
      { name: 'Athena', level: 85 },
      { name: 'Lambda', level: 92 },
      { name: 'DynamoDB', level: 87 },
      { name: 'S3', level: 90 },
      { name: 'CloudWatch', level: 85 },
      { name: 'SQS', level: 88 },
      { name: 'SNS', level: 83 },
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
    color: 'from-emerald-400 to-green-500',
    bgGradient: 'from-emerald-500/10 to-green-600/10',
    borderColor: 'border-emerald-500/30',
    glowColor: 'shadow-emerald-500/20',
    skills: [
      { name: 'ROS2', level: 85 },
      { name: 'PX4', level: 80 },
      { name: 'OTA Updates', level: 88 },
      { name: 'Telemetry', level: 92 },
      { name: 'MQTT', level: 87 },
      { name: 'Protocol Buffers', level: 85 },
      { name: 'Docker', level: 90 },
      { name: 'Linux', level: 88 },
      { name: 'Embedded', level: 82 },
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
    color: 'from-fuchsia-400 to-purple-500',
    bgGradient: 'from-fuchsia-500/10 to-purple-600/10',
    borderColor: 'border-fuchsia-500/30',
    glowColor: 'shadow-fuchsia-500/20',
    skills: [
      { name: 'TouchDesigner', level: 90 },
      { name: 'React Three Fiber', level: 85 },
      { name: 'Three.js', level: 88 },
      { name: 'Kinect', level: 82 },
      { name: 'MIDI', level: 85 },
      { name: 'WebGL', level: 80 },
      { name: 'Shaders', level: 78 },
      { name: 'Processing', level: 85 },
      { name: 'Max/MSP', level: 75 },
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
          d='M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01'
        />
      </svg>
    ),
    color: 'from-amber-400 to-orange-500',
    bgGradient: 'from-amber-500/10 to-orange-600/10',
    borderColor: 'border-amber-500/30',
    glowColor: 'shadow-amber-500/20',
    skills: [
      { name: 'Agile', level: 90 },
      { name: 'Scrum', level: 88 },
      { name: 'Notion', level: 92 },
      { name: 'Figma', level: 85 },
      { name: 'Roadmapping', level: 87 },
      { name: 'Analytics', level: 85 },
      { name: 'User Research', level: 80 },
      { name: 'Prototyping', level: 83 },
      { name: 'Stakeholder Management', level: 88 },
    ],
  },
]

export default function SkillsTools() {
  return (
    <PageSection
      id='skills'
      tagline='Skills'
      taglineColor='amber'
      title='Technical expertise across'
      subtitle='infrastructure and imagination'
      cardVariant='cutcorner'
    >
      <div className='max-w-7xl mx-auto'>
        <div className='grid lg:grid-cols-2 gap-8'>
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              className='relative group'
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Enhanced Floating Category Card */}
              <motion.div
                className={`relative p-8 rounded-2xl bg-gradient-to-br from-zinc-900/80 to-zinc-900/60 border ${category.borderColor} shadow-2xl ${category.glowColor} overflow-hidden group-hover:shadow-2xl transition-all duration-500`}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.3, ease: 'easeOut' },
                }}
              >
                {/* Animated background gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${category.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                {/* Floating geometric elements */}
                <div className='absolute top-4 right-4 w-16 h-16 border border-current opacity-10 rounded-full group-hover:opacity-20 transition-opacity duration-500' />
                <div className='absolute bottom-4 left-4 w-8 h-8 border border-current opacity-10 group-hover:opacity-20 transition-opacity duration-500' />

                {/* Enhanced Header */}
                <div className='relative z-10 space-y-6'>
                  <div className='flex items-center gap-4'>
                    <motion.div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center text-white shadow-lg`}
                      whileHover={{
                        rotate: 5,
                        scale: 1.1,
                        transition: { duration: 0.2, ease: 'easeOut' },
                      }}
                    >
                      {category.icon}
                    </motion.div>
                    <div>
                      <h3 className='text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-300 group-hover:bg-clip-text transition-all duration-300'>
                        {category.title}
                      </h3>
                      <p className='text-sm text-zinc-400'>
                        {category.skills.length} skills
                      </p>
                    </div>
                  </div>

                  {/* Enhanced Skills with Progress Bars */}
                  <div className='space-y-4'>
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        className='space-y-2'
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.3,
                          delay: index * 0.1 + skillIndex * 0.05,
                        }}
                      >
                        <div className='flex justify-between items-center'>
                          <span className='text-sm font-medium text-zinc-300'>
                            {skill.name}
                          </span>
                          <span className='text-xs text-zinc-400'>
                            {skill.level}%
                          </span>
                        </div>
                        <div className='relative h-2 bg-white/10 rounded-full overflow-hidden'>
                          <motion.div
                            className={`h-full bg-gradient-to-r ${category.color} rounded-full shadow-lg`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 1,
                              delay: index * 0.1 + skillIndex * 0.05,
                            }}
                          />
                          {/* Glow effect on progress bar */}
                          <div
                            className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-20 blur-sm`}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Enhanced Skill Level Summary */}
                  <div className='p-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm'>
                    <div className='flex items-center justify-between'>
                      <span className='text-sm text-zinc-400'>
                        Average Proficiency
                      </span>
                      <span className='text-lg font-bold text-white'>
                        {Math.round(
                          category.skills.reduce(
                            (acc, skill) => acc + skill.level,
                            0
                          ) / category.skills.length
                        )}
                        %
                      </span>
                    </div>
                    <div className='mt-2 flex items-center gap-2'>
                      {[...Array(5)].map((_, i) => {
                        const avgLevel =
                          category.skills.reduce(
                            (acc, skill) => acc + skill.level,
                            0
                          ) / category.skills.length
                        const filled = i < Math.floor(avgLevel / 20)
                        return (
                          <div
                            key={i}
                            className={`w-3 h-3 rounded-full ${
                              filled
                                ? `bg-gradient-to-r ${category.color}`
                                : 'bg-white/20'
                            }`}
                          />
                        )
                      })}
                    </div>
                  </div>
                </div>

                {/* Enhanced glow effect on hover */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-5 blur-xl transition-opacity duration-500`}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Skills Summary */}
        <motion.div
          className='mt-16 p-8 bg-gradient-to-r from-white/5 to-white/[0.02] rounded-2xl border border-white/10 backdrop-blur-sm'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className='text-center space-y-4'>
            <h3 className='text-2xl font-bold text-white'>
              Technical Expertise Overview
            </h3>
            <p className='text-zinc-300 max-w-2xl mx-auto'>
              With expertise spanning cloud infrastructure, robotics systems,
              creative technology, and product strategy, I bring a comprehensive
              skill set to tackle complex technical challenges.
            </p>

            {/* Enhanced Stats */}
            <div className='grid grid-cols-2 md:grid-cols-4 gap-6 mt-8'>
              {[
                {
                  label: 'Skills',
                  value: '37+',
                  color: 'from-cyan-400 to-blue-500',
                },
                {
                  label: 'Years Experience',
                  value: '5+',
                  color: 'from-fuchsia-400 to-purple-500',
                },
                {
                  label: 'Projects',
                  value: '50+',
                  color: 'from-emerald-400 to-green-500',
                },
                {
                  label: 'Technologies',
                  value: '25+',
                  color: 'from-amber-400 to-orange-500',
                },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className='text-center'
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                >
                  <div
                    className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}
                  >
                    {stat.value}
                  </div>
                  <div className='text-sm text-zinc-400'>{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Enhanced Call to Action */}
        <motion.div
          className='mt-12 text-center'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.a
            href='#contact'
            className='inline-flex items-center px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-300 group'
            whileHover={{
              scale: 1.05,
              y: -4,
              transition: { duration: 0.2, ease: 'easeOut' },
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className='relative z-10'>
              Ready to Leverage These Skills?
            </span>
            {/* Enhanced glow effect */}
            <div className='absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm' />
          </motion.a>
        </motion.div>
      </div>
    </PageSection>
  )
}
