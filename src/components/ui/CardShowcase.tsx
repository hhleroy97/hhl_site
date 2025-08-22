import { motion } from 'framer-motion'
import TechCard from './TechCard'

export default function CardShowcase() {
  const sampleContent = (
    <div className='space-y-4'>
      <p className='text-zinc-300 text-lg leading-relaxed font-light'>
        I'm a{' '}
        <span className='text-cyan-400 font-medium'>creative technologist</span>{' '}
        who engineers systems that move — and move people.
      </p>

      <p className='text-zinc-400 leading-relaxed'>
        With experience across robotics, cloud systems, and interactive visuals,
        I bring a rare blend of technical rigor and artistic vision to the
        table.
      </p>

      <div className='flex flex-wrap gap-2 mt-6'>
        {['React', 'TypeScript', 'AWS', 'Python', 'TouchDesigner'].map(tech => (
          <span
            key={tech}
            className='px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs font-medium text-zinc-300 hover:bg-white/20 hover:text-white transition-all duration-300'
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  )

  return (
    <div className='min-h-screen bg-zinc-900 p-8'>
      <div className='max-w-7xl mx-auto'>
        <motion.div
          className='text-center mb-16'
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className='text-5xl font-bold text-white mb-4 bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent'>
            Tech Card Variations
          </h1>
          <p className='text-zinc-400 text-xl'>
            Four distinct header styles for striking content cards
          </p>
        </motion.div>

        <div className='grid lg:grid-cols-2 gap-12'>
          {/* Floating Tag Style */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h2 className='text-2xl font-bold text-cyan-400 mb-4 tracking-wide'>
              01. Floating Tag Header
            </h2>
            <TechCard title='About' variant='floating' color='cyan'>
              {sampleContent}
            </TechCard>
          </motion.div>

          {/* Rotated Margin Header */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h2 className='text-2xl font-bold text-fuchsia-400 mb-4 tracking-wide'>
              02. Rotated Margin Header
            </h2>
            <TechCard title='Skills' variant='rotated' color='fuchsia'>
              {sampleContent}
            </TechCard>
          </motion.div>

          {/* Background Text Header */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <h2 className='text-2xl font-bold text-emerald-400 mb-4 tracking-wide'>
              03. Background Text Header
            </h2>
            <TechCard title='Work' variant='background' color='emerald'>
              {sampleContent}
            </TechCard>
          </motion.div>

          {/* Cut Corner Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <h2 className='text-2xl font-bold text-amber-400 mb-4 tracking-wide'>
              04. Cut Corner Header
            </h2>
            <TechCard title='Contact' variant='cutcorner' color='amber'>
              {sampleContent}
            </TechCard>
          </motion.div>
        </div>

        {/* Design Notes */}
        <motion.div
          className='mt-16 p-8 bg-zinc-800/50 border border-zinc-700 rounded-2xl'
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <h3 className='text-xl font-bold text-white mb-4'>Design Features</h3>
          <div className='grid md:grid-cols-2 gap-6 text-zinc-300'>
            <div>
              <h4 className='font-semibold text-cyan-400 mb-2'>Typography</h4>
              <ul className='space-y-1 text-sm'>
                <li>• Headers: Orbitron, Space Grotesk, Russo One</li>
                <li>• Body: Inter/system fonts for readability</li>
                <li>• Contrast through font weight variation</li>
              </ul>
            </div>
            <div>
              <h4 className='font-semibold text-fuchsia-400 mb-2'>
                Visual Elements
              </h4>
              <ul className='space-y-1 text-sm'>
                <li>• Asymmetric cut corners (clip-path)</li>
                <li>• Circuit board patterns and grid overlays</li>
                <li>• Gradient accents with glow effects</li>
                <li>• Semi-transparent background elements</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
