export default function Experience() {
  const experiences = [
    {
      company: 'TechCorp Solutions',
      role: 'Senior Software Engineer',
      duration: '2022 - Present',
      description: [
        'Led $500K AWS migration project, reducing infrastructure costs by 40%',
        'Architected microservices infrastructure serving 1M+ daily users',
        'Mentored team of 6 engineers and established coding standards',
        'Built real-time data processing pipelines handling 10TB+ daily throughput',
      ],
      technologies: ['Python', 'AWS', 'Docker', 'Kubernetes', 'PostgreSQL'],
    },
    {
      company: 'Robotics Innovations',
      role: 'Robotics Software Engineer',
      duration: '2020 - 2022',
      description: [
        'Developed autonomous drone systems using ROS2 and PX4',
        'Implemented computer vision algorithms for object detection and tracking',
        'Built IoT communication systems with MQTT and edge computing',
        'Created real-time control systems for precision navigation',
      ],
      technologies: ['ROS2', 'Python', 'C++', 'OpenCV', 'MQTT', 'Embedded C'],
    },
    {
      company: 'InnovateLabs',
      role: 'Full Stack Developer',
      duration: '2019 - 2020',
      description: [
        'Built responsive web applications with React and Node.js',
        'Implemented GraphQL APIs with advanced caching strategies',
        'Created CI/CD pipelines reducing deployment time by 80%',
        'Developed automated testing suites achieving 95% code coverage',
      ],
      technologies: ['React', 'Node.js', 'GraphQL', 'MongoDB', 'Jenkins'],
    },
  ]

  return (
    <section id='experience' className='py-20 px-6 lg:px-8 bg-gray-50'>
      <div className='max-w-4xl mx-auto'>
        <div className='text-center mb-12'>
          <h2 className='text-4xl font-bold text-gray-900 mb-4'>
            Experience
          </h2>
        </div>

        <div className='space-y-8'>
          {experiences.map((exp, index) => (
            <div
              key={index}
              className='bg-white rounded-lg border border-gray-200 p-8 hover:shadow-lg transition-shadow'
            >
              <div className='flex flex-col md:flex-row md:items-center md:justify-between mb-4'>
                <div>
                  <h3 className='text-xl font-semibold text-gray-900'>
                    {exp.role}
                  </h3>
                  <p className='text-lg text-gray-600'>{exp.company}</p>
                </div>
                <span className='text-sm text-gray-500 mt-2 md:mt-0'>
                  {exp.duration}
                </span>
              </div>

              <ul className='space-y-2 mb-6'>
                {exp.description.map((item, i) => (
                  <li key={i} className='text-gray-700 flex items-start'>
                    <span className='text-gray-400 mr-2'>•</span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className='flex flex-wrap gap-2'>
                {exp.technologies.map(tech => (
                  <span
                    key={tech}
                    className='px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full'
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
