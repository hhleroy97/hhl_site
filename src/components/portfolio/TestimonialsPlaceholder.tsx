import { motion } from 'framer-motion'

export default function TestimonialsPlaceholder() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-custom">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-section-heading mb-8">What Collaborators Say</h2>
          
          <motion.div
            className="max-w-2xl mx-auto p-8 rounded-2xl bg-white/5 ring-1 ring-white/10 backdrop-blur-md"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-400/20 to-fuchsia-500/20 ring-1 ring-white/20 flex items-center justify-center">
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1.5"
                  className="text-zinc-400"
                >
                  <path d="M8 21s-4-3-4-9 4-9 4-9"/>
                  <path d="M16 3s4 3 4 9-4 9-4 9"/>
                </svg>
              </div>
            </div>
            
            <p className="text-lg text-zinc-300 mb-6 italic">
              Collecting a few words from past collaborators.
            </p>
            
            <p className="text-sm text-zinc-400">
              Check back soon for testimonials from recent projects involving 
              cloud infrastructure optimization, robotics system integration, 
              and interactive visualization development.
            </p>
            
            {/* Subtle animation elements */}
            <div className="flex justify-center mt-6 space-x-1">
              <div className="w-2 h-2 rounded-full bg-cyan-400/40 animate-pulse" />
              <div className="w-2 h-2 rounded-full bg-cyan-400/40 animate-pulse" style={{ animationDelay: '0.5s' }} />
              <div className="w-2 h-2 rounded-full bg-cyan-400/40 animate-pulse" style={{ animationDelay: '1s' }} />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}