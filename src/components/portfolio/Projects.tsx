export default function Projects() {
  const projects = [
    {
      title: 'AWS Cloud Migration Platform',
      description:
        'Led a $500K AWS migration project, architecting a scalable cloud infrastructure that reduced costs by 40% and improved system reliability to 99.9% uptime.',
      technologies: ['AWS', 'Docker', 'Kubernetes', 'Python', 'Terraform'],
      featured: true,
    },
    {
      title: 'Autonomous Drone Navigation System',
      description:
        'Developed a real-time navigation system for autonomous drones using ROS2 and PX4, implementing computer vision algorithms for obstacle detection and path planning.',
      technologies: ['ROS2', 'PX4', 'Python', 'OpenCV', 'C++', 'MQTT'],
      featured: true,
    },
    {
      title: 'Real-Time Data Processing Pipeline',
      description:
        'Built a high-throughput data processing system handling 10TB+ daily data with real-time analytics, monitoring, and automated alerting capabilities.',
      technologies: ['Python', 'Apache Kafka', 'PostgreSQL', 'Redis', 'Docker'],
      featured: true,
    },
    {
      title: 'IoT Device Management Platform',
      description:
        'Created a comprehensive IoT platform for managing thousands of edge devices with real-time monitoring, remote updates, and predictive maintenance.',
      technologies: ['Node.js', 'React', 'MQTT', 'InfluxDB', 'Grafana'],
      featured: false,
    },
    {
      title: 'Microservices API Gateway',
      description:
        'Designed and implemented a high-performance API gateway handling 1M+ daily requests with advanced routing, authentication, and rate limiting.',
      technologies: ['Go', 'gRPC', 'Redis', 'PostgreSQL', 'Prometheus'],
      featured: false,
    },
  ]

  return (
    <section id='projects' className='py-20 px-6 lg:px-8 bg-white'>
      <div className='max-w-4xl mx-auto'>
        <div className='text-center mb-12'>
          <h2 className='text-4xl font-bold text-gray-900 mb-4'>
            Projects
          </h2>
        </div>

        <div className='space-y-8'>
          {projects.map((project, index) => (
            <div
              key={index}
              className='bg-gray-50 rounded-lg border border-gray-200 p-8 hover:shadow-lg transition-shadow'
            >
              <div className='flex items-start justify-between mb-4'>
                <h3 className='text-xl font-semibold text-gray-900'>
                  {project.title}
                </h3>
                {project.featured && (
                  <span className='px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full'>
                    Featured
                  </span>
                )}
              </div>

              <p className='text-gray-700 mb-6 leading-relaxed'>
                {project.description}
              </p>

              <div className='flex flex-wrap gap-2'>
                {project.technologies.map(tech => (
                  <span
                    key={tech}
                    className='px-3 py-1 bg-white border border-gray-200 text-gray-700 text-sm rounded-full'
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className='text-center mt-12'>
          <a
            href='https://github.com/hartley'
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors'
          >
            <svg
              className='w-5 h-5'
              fill='currentColor'
              viewBox='0 0 20 20'
            >
              <path
                fillRule='evenodd'
                d='M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z'
                clipRule='evenodd'
              />
            </svg>
            View All Projects
          </a>
        </div>
      </div>
    </section>
  )
}