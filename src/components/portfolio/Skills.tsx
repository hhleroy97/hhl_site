import { motion } from 'framer-motion'

interface SkillCategory {
  category: string
  description: string
  skills: {
    name: string
    level: number
    color: string
    icon?: string
  }[]
}

export default function Skills() {
  const skillCategories: SkillCategory[] = [
    {
      category: 'AI & Machine Learning',
      description: 'Intelligent systems and real-time ML pipelines',
      skills: [
        { name: 'Computer Vision', level: 85, color: 'tech-teal' },
        { name: 'TensorFlow/PyTorch', level: 80, color: 'tech-blue' },
        { name: 'Real-time ML Pipelines', level: 90, color: 'tech-cyan' },
        { name: 'Edge AI Deployment', level: 85, color: 'tech-purple' },
      ],
    },
    {
      category: 'Robotics & Autonomous Systems',
      description: 'ROS2-based drone fleets and autonomous navigation',
      skills: [
        { name: 'ROS2/PX4 Drones', level: 95, color: 'tech-teal' },
        { name: 'Autonomous Navigation', level: 90, color: 'tech-blue' },
        { name: 'Sensor Fusion', level: 85, color: 'tech-cyan' },
        { name: 'Fleet Management', level: 90, color: 'tech-purple' },
      ],
    },
    {
      category: 'Cloud & Data Architecture',
      description: 'AWS IoT infrastructure and real-time data processing',
      skills: [
        { name: 'AWS IoT Core/Kinesis', level: 95, color: 'tech-teal' },
        { name: 'Real-time Telemetry', level: 90, color: 'tech-blue' },
        { name: 'Python/Embedded C', level: 95, color: 'tech-cyan' },
        { name: 'Infrastructure as Code', level: 85, color: 'tech-purple' },
      ],
    },
    {
      category: 'Creative Technology',
      description: 'Innovation at the intersection of art and engineering',
      skills: [
        { name: 'Creative Problem Solving', level: 95, color: 'tech-teal' },
        { name: 'Rapid Prototyping', level: 90, color: 'tech-blue' },
        { name: 'Cross-disciplinary Design', level: 85, color: 'tech-cyan' },
        { name: 'Technology Innovation', level: 90, color: 'tech-purple' },
      ],
    },
  ]

  return (
    <section className='relative py-20 px-6 lg:px-8 overflow-hidden'>
      {/* Background decorative elements */}
      <div className='absolute inset-0'>
        <div className='absolute top-20 left-10 w-72 h-72 bg-tech-teal/5 rounded-full filter blur-3xl' />
        <div className='absolute bottom-20 right-10 w-96 h-96 bg-tech-purple/5 rounded-full filter blur-3xl' />
      </div>

      <div className='relative max-w-7xl mx-auto'>
        {/* Section Header */}
        <motion.div
          className='text-center mb-16'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className='text-4xl lg:text-5xl font-display font-bold text-tech-text-primary mb-6'>
            Creative Technology
            <span className='text-gradient-primary ml-3'>& AI Engineering</span>
          </h2>
          <p className='text-xl text-tech-text-secondary max-w-3xl mx-auto leading-relaxed'>
            Building intelligent autonomous systems at Lucid Bots. Expertise spans AI/ML pipelines, 
            robotics engineering, and creative problem-solving for next-generation drone technologies.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12'>
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              className='card-elevated p-8 group hover:bg-tech-dark-elevated/80 transition-all duration-300'
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            >
              {/* Category Header */}
              <div className='mb-6'>
                <h3 className='text-2xl font-display font-bold text-tech-text-primary mb-3 group-hover:text-tech-teal transition-colors'>
                  {category.category}
                </h3>
                <p className='text-tech-text-secondary text-sm leading-relaxed'>
                  {category.description}
                </p>
              </div>

              {/* Skills List */}
              <div className='space-y-4'>
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    className='relative'
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: categoryIndex * 0.1 + skillIndex * 0.05,
                    }}
                  >
                    {/* Skill Name & Level */}
                    <div className='flex justify-between items-center mb-2'>
                      <span className='text-tech-text-primary font-medium'>
                        {skill.name}
                      </span>
                      <span className={`text-${skill.color} text-sm font-mono`}>
                        {skill.level}%
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className='relative h-2 bg-tech-dark-surface rounded-full overflow-hidden'>
                      <motion.div
                        className={`absolute top-0 left-0 h-full bg-${skill.color} rounded-full`}
                        style={{
                          boxShadow: `0 0 8px var(--tw-color-${skill.color})`,
                        }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1,
                          delay: categoryIndex * 0.1 + skillIndex * 0.1 + 0.3,
                          ease: 'easeOut',
                        }}
                      />

                      {/* Subtle pulse effect */}
                      <motion.div
                        className={`absolute top-0 left-0 h-full bg-${skill.color} rounded-full opacity-30`}
                        initial={{ width: 0, opacity: 0.3 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        animate={{
                          opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                          width: {
                            duration: 1,
                            delay: categoryIndex * 0.1 + skillIndex * 0.1 + 0.3,
                            ease: 'easeOut',
                          },
                          opacity: {
                            duration: 2,
                            repeat: Infinity,
                            delay: 1,
                          },
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Decorative Corner */}
              <div className='absolute top-4 right-4 w-8 h-8'>
                <div
                  className={`w-2 h-2 bg-tech-teal rounded-full opacity-60 group-hover:opacity-100 transition-opacity`}
                />
                <div
                  className={`w-1 h-1 bg-tech-cyan rounded-full mt-1 ml-1 opacity-40 group-hover:opacity-80 transition-opacity`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          className='text-center mt-16'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className='inline-flex items-center space-x-2 px-6 py-3 bg-tech-dark-surface/50 rounded-full border border-tech-teal/20'>
            <div className='status-online' />
            <span className='text-tech-text-secondary font-medium'>
              Available for new opportunities
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
