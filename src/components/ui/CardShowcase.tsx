import { motion } from 'framer-motion'
import { useCardVariant } from '../../context/CardVariantContext'

export default function CardShowcase() {
  const { variant, setVariant } = useCardVariant()

  const cardVariants = [
    {
      key: 'floating',
      name: 'Floating Tag',
      description: 'Clean floating header with subtle circuit patterns',
      color: 'cyan',
    },
    {
      key: 'rotated',
      name: 'Rotated Margin',
      description: 'Dynamic side-mounted header with tech grid overlay',
      color: 'fuchsia',
    },
    {
      key: 'background',
      name: 'Background Text',
      description: 'Large background text with corner accents',
      color: 'emerald',
    },
    {
      key: 'cutcorner',
      name: 'Cut Corner',
      description: 'Futuristic angled corners with circuit lines',
      color: 'amber',
    },
  ] as const

  return (
    <div className='min-h-screen bg-zinc-900 p-8 flex items-center justify-center'>
      <div className='max-w-4xl mx-auto'>
        <motion.div
          className='text-center'
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className='text-5xl font-bold text-white mb-8 bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent'>
            Card Style Control Panel
          </h1>

          {/* Card Variant Selector */}
          <motion.div
            className='grid grid-cols-2 md:grid-cols-4 gap-4'
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {cardVariants.map((card, index) => {
              const isActive = variant === card.key
              const getActiveClasses = () => {
                switch (card.color) {
                  case 'cyan':
                    return 'border-cyan-400 bg-cyan-500/20 text-cyan-400'
                  case 'fuchsia':
                    return 'border-fuchsia-400 bg-fuchsia-500/20 text-fuchsia-400'
                  case 'emerald':
                    return 'border-emerald-400 bg-emerald-500/20 text-emerald-400'
                  case 'amber':
                    return 'border-amber-400 bg-amber-500/20 text-amber-400'
                  default:
                    return 'border-cyan-400 bg-cyan-500/20 text-cyan-400'
                }
              }

              return (
                <motion.button
                  key={card.key}
                  onClick={() => setVariant(card.key)}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                    isActive
                      ? getActiveClasses()
                      : 'border-white/20 bg-white/5 text-zinc-400 hover:border-white/40 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                >
                  <div className='text-center'>
                    <div className='font-bold text-lg tracking-wide mb-2 text-white'>
                      {card.name}
                    </div>
                    <div className='text-sm opacity-80 text-zinc-300'>
                      {card.description}
                    </div>
                  </div>
                </motion.button>
              )
            })}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
