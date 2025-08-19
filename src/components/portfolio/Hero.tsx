export default function Hero() {
  return (
    <section className='pt-24 pb-16 px-6 lg:px-8 min-h-screen flex items-center bg-gray-50'>
      <div className='max-w-6xl mx-auto'>
        <div className='text-center space-y-8'>
          {/* Main heading */}
          <div className='space-y-4'>
            <h1 className='text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight'>
              Hartley H. Leroy
            </h1>
            <p className='text-2xl text-gray-600 font-medium'>
              Software Engineer
            </p>
            <p className='text-lg text-gray-500 max-w-2xl mx-auto'>
              Specializing in complex systems, robotics, and technical communication.
              I build scalable solutions and bridge the gap between technical teams and stakeholders.
            </p>
          </div>

          {/* Tech stack */}
          <div className='flex flex-wrap justify-center gap-3 max-w-2xl mx-auto'>
            {[
              'AWS IoT',
              'ROS2/PX4',
              'Python',
              'React',
              'Embedded C',
              'Product Management',
            ].map(tech => (
              <span
                key={tech}
                className='px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-gray-300 transition-colors'
              >
                {tech}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className='flex flex-col sm:flex-row gap-4 justify-center pt-8'>
            <a
              href='#projects'
              className='px-8 py-4 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors text-center'
            >
              View My Work
            </a>
            <a
              href='#contact'
              className='px-8 py-4 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 hover:text-gray-900 transition-colors text-center'
            >
              Get In Touch
            </a>
          </div>

          {/* Achievement stats */}
          <div className='grid grid-cols-3 gap-8 max-w-md mx-auto pt-12'>
            {[
              { label: 'Years Experience', value: '4+' },
              { label: 'AWS Migration', value: '$500K' },
              { label: 'Team Size Led', value: '6' },
            ].map(stat => (
              <div key={stat.label} className='text-center'>
                <div className='text-2xl font-bold text-gray-900'>
                  {stat.value}
                </div>
                <div className='text-sm text-gray-500 mt-1'>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
