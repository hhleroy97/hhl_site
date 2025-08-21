import { useState } from 'react'
import { motion } from 'framer-motion'

const colorways = {
  'Cyan Flow': 'from-cyan-400 to-blue-500',
  'Fuchsia Pulse': 'from-fuchsia-400 to-pink-500', 
  'Emerald Wave': 'from-emerald-400 to-green-500'
}

export default function SimpleShowcase() {
  const [density, setDensity] = useState(40)
  const [speed, setSpeed] = useState(1.0)
  const [colorway, setColorway] = useState<keyof typeof colorways>('Cyan Flow')
  
  // Generate lines based on density
  const lines = Array.from({ length: density }, (_, i) => ({
    id: i,
    delay: i * 0.1,
    duration: 3 + (i % 3),
    offset: (i % 5) * 20
  }))
  
  return (
    <section id="showcase" className="py-20 md:py-28">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-section-heading">Live Data Loom</h2>
          <p className="mt-2 text-zinc-400">
            CSS-driven animations with realtime controls.
          </p>
        </motion.div>
        
        <motion.div 
          className="mt-6 grid md:grid-cols-[1fr,320px] gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Visualization Area */}
          <div className="rounded-2xl ring-1 ring-white/10 overflow-hidden bg-white/5 backdrop-blur-md aspect-video relative">
            <div className="absolute inset-0 overflow-hidden">
              {lines.map((line) => (
                <motion.div
                  key={line.id}
                  className={`absolute w-1 bg-gradient-to-t ${colorways[colorway]} opacity-60 rounded-full`}
                  style={{
                    height: '100%',
                    left: `${(line.id % 20) * 5}%`,
                    top: `${line.offset}px`
                  }}
                  animate={{
                    scaleY: [0.5, 1, 0.5],
                    opacity: [0.3, 0.8, 0.3],
                    y: [0, -20, 0]
                  }}
                  transition={{
                    duration: line.duration / speed,
                    delay: line.delay / speed,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              ))}
              
              {/* Center gradient overlay */}
              <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-zinc-900/20" />
            </div>
          </div>
          
          {/* Controls */}
          <aside className="rounded-2xl ring-1 ring-white/10 p-4 bg-white/5 backdrop-blur-md space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Density: {density}
              </label>
              <input
                type="range"
                min="10"
                max="80"
                value={density}
                onChange={(e) => setDensity(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Speed: {speed.toFixed(1)}x
              </label>
              <input
                type="range"
                min="0.1"
                max="3"
                step="0.1"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Colorway
              </label>
              <select
                value={colorway}
                onChange={(e) => setColorway(e.target.value as keyof typeof colorways)}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-colors"
              >
                {Object.keys(colorways).map((color) => (
                  <option key={color} value={color} className="bg-zinc-800">
                    {color}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="pt-2 text-xs text-zinc-400">
              CSS animations with real-time parameter control
            </div>
          </aside>
        </motion.div>
      </div>
      
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: linear-gradient(45deg, #06b6d4, #d946ef);
          cursor: pointer;
        }
        
        .slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: linear-gradient(45deg, #06b6d4, #d946ef);
          cursor: pointer;
          border: none;
        }
      `}</style>
    </section>
  )
}