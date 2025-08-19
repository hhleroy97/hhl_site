import { motion } from 'framer-motion'
import RetroDataFlow from '@components/3d/RetroDataFlow'

export default function Hero() {
  return (
    <section
      className='relative pt-20 pb-16 px-6 lg:px-8 min-h-screen flex items-center'
      aria-label='Introduction and hero section'
    >
      {/* Artistic background accent */}
      <div
        className='pointer-events-none absolute inset-0 opacity-20'
        aria-hidden='true'
        style={{
          backgroundImage: `
            radial-gradient(600px 400px at 20% 30%, rgba(0, 212, 170, 0.15), transparent 70%),
            radial-gradient(800px 600px at 80% 70%, rgba(139, 92, 246, 0.1), transparent 70%)
          `,
        }}
      />

      <div className='relative max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          {/* Left column - Content */}
          <motion.div
            className='space-y-8 z-10'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
          >
            {/* Impact Statement */}
            <div className='space-y-6'>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-tech-text-primary leading-tight mb-4'>
                  Creative Technologist{' '}
                  <span className='text-transparent bg-gradient-to-r from-tech-teal to-tech-cyan bg-clip-text'>
                    & AI Engineer
                  </span>
                </h1>
                <p className='text-xl text-tech-text-secondary font-medium leading-relaxed'>
                  I architect intelligent systems that bridge AI, robotics, and data engineering. 
                  Currently building autonomous drone fleets with real-time ML pipelines at Lucid Bots.
                </p>
              </motion.div>
              
              <motion.div
                className='flex items-center space-x-4 text-tech-text-muted'
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <span className='font-medium'>Hartley H. Leroy</span>
                <span className='w-2 h-2 bg-tech-teal rounded-full'></span>
                <span>Charlotte, NC</span>
                <span className='w-2 h-2 bg-tech-cyan rounded-full'></span>
                <span>Available for Opportunities</span>
              </motion.div>
            </div>

            {/* Key Achievements */}
            <motion.div
              className='grid grid-cols-1 sm:grid-cols-3 gap-4 py-6'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className='text-center p-4 rounded-lg bg-tech-dark-alt/50 border border-tech-teal/20'>
                <div className='text-2xl font-bold text-tech-teal'>$500K</div>
                <div className='text-sm text-tech-text-muted'>AWS Infrastructure</div>
              </div>
              <div className='text-center p-4 rounded-lg bg-tech-dark-alt/50 border border-tech-cyan/20'>
                <div className='text-2xl font-bold text-tech-cyan'>ROS2</div>
                <div className='text-sm text-tech-text-muted'>Drone Systems</div>
              </div>
              <div className='text-center p-4 rounded-lg bg-tech-dark-alt/50 border border-tech-purple/20'>
                <div className='text-2xl font-bold text-tech-purple'>AI/ML</div>
                <div className='text-sm text-tech-text-muted'>Pipelines</div>
              </div>
            </motion.div>

            {/* CTA Actions */}
            <motion.div
              className='flex flex-col sm:flex-row gap-4 pt-4'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <motion.a
                href='#experience'
                className='px-8 py-4 rounded-lg bg-gradient-to-r from-tech-teal to-tech-cyan text-tech-dark font-bold text-center transition-all hover:shadow-lg hover:shadow-tech-teal/25'
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                🚀 See My Impact
              </motion.a>
              <motion.a
                href='#contact'
                className='px-8 py-4 rounded-lg border border-tech-teal text-tech-teal font-semibold text-center hover:bg-tech-teal hover:text-tech-dark transition-all group'
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                💬 Let's Build Together
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right column - Professional Photo with 3D Grid Background */}
          <motion.div
            className='relative flex justify-center lg:justify-end'
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          >
            <div className='relative w-full max-w-[500px] h-[500px] flex items-center justify-center'>
              
              {/* 3D Grid Background - positioned behind profile pic */}
              <div className='absolute inset-0 pointer-events-none opacity-40'>
                <RetroDataFlow className="w-full h-full" />
              </div>
              
              {/* Professional Photo with 3D-inspired border */}
              <div className='relative z-10 w-96 h-96'>
                {/* Main border ring - matches 3D design */}
                <div className='absolute inset-2 rounded-full border-2 border-tech-teal/80 animate-pulse'></div>
                
                {/* Secondary border rings */}
                <div className='absolute inset-0 rounded-full border border-tech-cyan/40'></div>
                <div className='absolute inset-4 rounded-full border border-tech-purple/30'></div>
                
                {/* Octahedral accent points - positioned on circular perimeter */}
                {/* Top - 0° */}
                <div className='absolute w-3 h-3 rotate-45 border-2 border-tech-teal bg-tech-teal/30 animate-pulse' 
                     style={{top: '8px', left: '50%', transform: 'translateX(-50%) rotate(45deg)'}}></div>
                {/* Top-right - 45° */}
                <div className='absolute w-3 h-3 rotate-45 border-2 border-tech-cyan bg-tech-cyan/30 animate-pulse' 
                     style={{top: '25px', right: '25px', animationDelay: '0.2s'}}></div>
                {/* Right - 90° */}
                <div className='absolute w-3 h-3 rotate-45 border-2 border-tech-purple bg-tech-purple/30 animate-pulse' 
                     style={{top: '50%', right: '8px', transform: 'translateY(-50%) rotate(45deg)', animationDelay: '0.4s'}}></div>
                {/* Bottom-right - 135° */}
                <div className='absolute w-3 h-3 rotate-45 border-2 border-tech-teal bg-tech-teal/30 animate-pulse' 
                     style={{bottom: '25px', right: '25px', animationDelay: '0.6s'}}></div>
                {/* Bottom - 180° */}
                <div className='absolute w-3 h-3 rotate-45 border-2 border-tech-cyan bg-tech-cyan/30 animate-pulse' 
                     style={{bottom: '8px', left: '50%', transform: 'translateX(-50%) rotate(45deg)', animationDelay: '0.8s'}}></div>
                {/* Bottom-left - 225° */}
                <div className='absolute w-3 h-3 rotate-45 border-2 border-tech-purple bg-tech-purple/30 animate-pulse' 
                     style={{bottom: '25px', left: '25px', animationDelay: '1s'}}></div>
                {/* Left - 270° */}
                <div className='absolute w-3 h-3 rotate-45 border-2 border-tech-teal bg-tech-teal/30 animate-pulse' 
                     style={{top: '50%', left: '8px', transform: 'translateY(-50%) rotate(45deg)', animationDelay: '1.2s'}}></div>
                {/* Top-left - 315° */}
                <div className='absolute w-3 h-3 rotate-45 border-2 border-tech-cyan bg-tech-cyan/30 animate-pulse' 
                     style={{top: '25px', left: '25px', animationDelay: '1.4s'}}></div>
                
                {/* Corner L-shaped brackets - positioned on the circle */}
                <div className='absolute w-6 h-6 border-l-2 border-t-2 border-tech-cyan/60 animate-pulse'
                     style={{top: '60px', left: '60px'}}></div>
                <div className='absolute w-6 h-6 border-r-2 border-t-2 border-tech-cyan/60 animate-pulse'
                     style={{top: '60px', right: '60px', animationDelay: '0.3s'}}></div>
                <div className='absolute w-6 h-6 border-l-2 border-b-2 border-tech-cyan/60 animate-pulse'
                     style={{bottom: '60px', left: '60px', animationDelay: '0.6s'}}></div>
                <div className='absolute w-6 h-6 border-r-2 border-b-2 border-tech-cyan/60 animate-pulse'
                     style={{bottom: '60px', right: '60px', animationDelay: '0.9s'}}></div>
                
                {/* Image container */}
                <div className='relative w-full h-full rounded-full bg-gradient-to-br from-tech-teal/20 to-tech-cyan/20 flex items-center justify-center overflow-hidden shadow-2xl'>
                  <img 
                    src="/src/assets/prof-pic-2.jpg" 
                    alt="Hartley H. Leroy - Creative Technologist & AI Engineer"
                    className="w-full h-full object-cover"
                    style={{ 
                      imageRendering: 'optimize-quality',
                      transform: 'translateX(-20px) scale(1.2)'
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
