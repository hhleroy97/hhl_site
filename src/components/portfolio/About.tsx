export default function About() {
  return (
    <section id='about' className='py-20 px-6 lg:px-8 bg-white'>
      <div className='max-w-4xl mx-auto'>
        <div className='text-center mb-12'>
          <h2 className='text-4xl font-bold text-gray-900 mb-4'>
            About Me
          </h2>
        </div>

        <div className='space-y-8 text-lg text-gray-700 leading-relaxed'>
          <p>
            I'm a passionate software engineer with over 4 years of experience building 
            scalable systems and leading high-performing teams. My expertise spans from 
            architecting enterprise-level backend services to developing robotics systems 
            and IoT solutions.
          </p>

          <p>
            My journey includes leading a $500K AWS migration project, developing autonomous 
            drone systems with ROS2/PX4, and bridging the gap between technical teams and 
            stakeholders through clear communication and product management.
          </p>

          <p>
            I believe the best solutions emerge at the intersection of technical precision 
            and clear communication. Whether I'm designing complex systems or leading teams, 
            I focus on creating solutions that are both technically sound and accessible to 
            all stakeholders.
          </p>
        </div>

        {/* Core competencies */}
        <div className='mt-12'>
          <h3 className='text-2xl font-semibold text-gray-900 mb-6 text-center'>
            Core Competencies
          </h3>
          <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
            {[
              'System Architecture',
              'Team Leadership',
              'Robotics & IoT',
              'Cloud Infrastructure',
              'Technical Communication',
              'Product Management',
            ].map(skill => (
              <div
                key={skill}
                className='px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-center hover:bg-gray-100 transition-colors'
              >
                <span className='text-sm font-medium text-gray-700'>
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
