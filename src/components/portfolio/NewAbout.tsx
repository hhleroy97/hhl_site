import { motion } from 'framer-motion'

const tools = [
  { name: 'AWS IoT', category: 'Cloud' },
  { name: 'Kinesis', category: 'Cloud' },
  { name: 'S3', category: 'Cloud' },
  { name: 'Athena', category: 'Cloud' },
  { name: 'ROS2', category: 'Robotics' },
  { name: 'PX4', category: 'Robotics' },
  { name: 'TouchDesigner', category: 'Creative' },
  { name: 'React Three Fiber', category: 'Creative' },
  { name: 'Python', category: 'Language' },
  { name: 'TypeScript', category: 'Language' }
]

const categoryColors = {
  Cloud: 'from-blue-400 to-cyan-400',
  Robotics: 'from-green-400 to-emerald-400', 
  Creative: 'from-fuchsia-400 to-pink-400',
  Language: 'from-amber-400 to-orange-400'
}

export default function NewAbout() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-custom">
        <div className="grid lg:grid-cols-[2fr,1fr] gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-section-heading mb-6">About</h2>
            
            <div className="prose prose-invert prose-lg max-w-none">
              <p className="text-zinc-300 leading-relaxed mb-6">
                I'm a creative technologist who bridges the gap between complex data systems 
                and human-centered experiences. With 8+ years across robotics, cloud infrastructure, 
                and interactive media, I help teams turn ambitious technical visions into 
                scalable realities.
              </p>
              
              <p className="text-zinc-300 leading-relaxed">
                Whether it's orchestrating autonomous drone fleets, building real-time data 
                pipelines that handle terabytes daily, or creating immersive visualizations 
                that make complex systems intuitive — I thrive at the intersection of 
                engineering rigor and creative problem-solving.
              </p>
            </div>

            <motion.div
              className="mt-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-4 text-zinc-200">Tools & Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool, index) => (
                  <motion.span
                    key={tool.name}
                    className={`px-3 py-1.5 text-sm rounded-full bg-gradient-to-r ${
                      categoryColors[tool.category as keyof typeof categoryColors]
                    } bg-opacity-10 ring-1 ring-white/20 text-white hover:ring-white/40 transition-all duration-200`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      delay: 0.4 + (index * 0.05), 
                      duration: 0.4,
                      type: "spring",
                      stiffness: 150
                    }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {tool.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Subtle avatar/sprite area */}
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 ring-1 ring-white/20 backdrop-blur-md flex items-center justify-center">
                {/* Simple geometric avatar or could be replaced with actual image */}
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 opacity-60" />
              </div>
              
              {/* Floating accent elements */}
              <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-cyan-400 animate-pulse" />
              <div className="absolute -bottom-2 -left-2 w-3 h-3 rounded-full bg-fuchsia-500 animate-pulse" style={{ animationDelay: '1s' }} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}