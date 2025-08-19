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
      category: 'Cloud & Infrastructure',
      description: 'Scalable cloud solutions and infrastructure automation',
      skills: [
        { name: 'AWS', level: 90, color: 'primary' },
        { name: 'Docker', level: 85, color: 'accent-blue' },
        { name: 'Kubernetes', level: 75, color: 'accent-green' },
        { name: 'Terraform', level: 80, color: 'accent-purple' },
      ],
    },
    {
      category: 'Backend Development',
      description: 'Robust APIs and distributed systems',
      skills: [
        { name: 'Python', level: 95, color: 'primary' },
        { name: 'Node.js', level: 85, color: 'accent-green' },
        { name: 'PostgreSQL', level: 80, color: 'accent-blue' },
        { name: 'Redis', level: 75, color: 'accent-orange' },
      ],
    },
    {
      category: 'Robotics & IoT',
      description: 'Autonomous systems and real-time control',
      skills: [
        { name: 'ROS/ROS2', level: 85, color: 'accent-purple' },
        { name: 'Computer Vision', level: 80, color: 'accent-orange' },
        { name: 'MQTT/IoT', level: 90, color: 'accent-green' },
        { name: 'Edge Computing', level: 75, color: 'accent-blue' },
      ],
    },
    {
      category: 'Data & Analytics',
      description: 'Data-driven insights and machine learning',
      skills: [
        { name: 'Data Engineering', level: 90, color: 'primary' },
        { name: 'Machine Learning', level: 75, color: 'accent-orange' },
        { name: 'Time Series', level: 85, color: 'accent-blue' },
        { name: 'Analytics', level: 80, color: 'accent-purple' },
      ],
    },
  ]

  const getColorClass = (color: string) => {
    switch (color) {
      case 'primary':
        return 'bg-primary-500'
      case 'accent-blue':
        return 'bg-accent-blue'
      case 'accent-green':
        return 'bg-accent-green'
      case 'accent-purple':
        return 'bg-accent-purple'
      case 'accent-orange':
        return 'bg-accent-orange'
      default:
        return 'bg-primary-500'
    }
  }

  return (
    <section className='relative py-20 px-6 lg:px-8 bg-background-secondary'>
      <div className='relative max-w-7xl mx-auto'>
        {/* Section Header */}
        <motion.div
          className='text-center mb-16'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className='text-4xl lg:text-5xl font-bold text-text-primary mb-6'>
            Technical
            <span className='text-primary-600 ml-3'>Expertise</span>
          </h2>
          <p className='text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed'>
            Specialized in building innovative solutions across cloud
            infrastructure, robotics, and data engineering with 4+ years of
            hands-on experience
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12'>
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              className='bg-background-primary p-8 rounded-xl border border-neutral-200 hover:border-primary-300 transition-all duration-300'
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            >
              {/* Category Header */}
              <div className='mb-6'>
                <h3 className='text-2xl font-bold text-text-primary mb-3 group-hover:text-primary-600 transition-colors'>
                  {category.category}
                </h3>
                <p className='text-text-secondary text-sm leading-relaxed'>
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
                      <span className='text-text-primary font-medium'>
                        {skill.name}
                      </span>
                      <span className='text-primary-600 text-sm font-mono'>
                        {skill.level}%
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className='relative h-2 bg-background-secondary rounded-full overflow-hidden'>
                      <motion.div
                        className={`absolute top-0 left-0 h-full ${getColorClass(skill.color)} rounded-full`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1,
                          delay: categoryIndex * 0.1 + skillIndex * 0.1 + 0.3,
                          ease: 'easeOut',
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
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
          <div className='inline-flex items-center space-x-2 px-6 py-3 bg-background-primary rounded-full border border-primary-200'>
            <div className='w-2 h-2 bg-primary-500 rounded-full' />
            <span className='text-text-secondary font-medium'>
              Available for new opportunities
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
