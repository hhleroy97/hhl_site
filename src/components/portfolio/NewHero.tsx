import { motion } from 'framer-motion'

export default function NewHero() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container-custom">
        <div className="relative z-10 max-w-3xl">
          <motion.div
            className="glass-card p-8 md:p-12 inline-block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-hero">
              <span 
                className="bg-gradient-to-r from-fuchsia-500 via-cyan-400 to-emerald-400 bg-clip-text text-transparent"
                style={{
                  textShadow: '0 0 1px rgba(255, 255, 255, 0.5)'
                }}
              >
                Hartley Leroy
              </span>
            </h1>
            
            <motion.p 
              className="mt-4 text-lg text-zinc-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Cloud & creative engineer — robotics fleet management, data pipelines, and realtime visuals.
            </motion.p>
            
            <motion.ul 
              className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-zinc-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <li>Charlotte, NC</li>
              <li>Open to freelance · FT</li>
              <li>
                <a 
                  href="mailto:hartley.leroy1997@gmail.com" 
                  className="underline decoration-1 underline-offset-2 hover:decoration-2 hover:underline-offset-1 transition-all"
                >
                  Email
                </a>
              </li>
            </motion.ul>
            
            <motion.div 
              className="mt-6 flex gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <a 
                href="#showcase" 
                className="btn-primary group"
                role="button"
                aria-label="View my work and projects"
              >
                <span>View Work</span>
              </a>
              <a 
                href="/docs/Hartley_LeRoy_Resume_Aug25.pdf"
                className="btn-secondary"
                target="_blank"
                rel="noopener noreferrer"
                role="button"
                aria-label="Download resume PDF"
                onError={(e) => {
                  // Fallback to .docx if PDF doesn't exist
                  const target = e.target as HTMLAnchorElement;
                  target.href = "/docs/Hartley_LeRoy_Resume_Aug25.docx";
                }}
              >
                Resume
              </a>
            </motion.div>
            
            <motion.div 
              className="mt-3 text-xs text-zinc-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              Now: building realtime viz templates & cloud data tools
            </motion.div>
          </motion.div>
        </div>
        
        {/* Glass card background fade */}
        <div className="absolute inset-0 -z-0 hero-fade pointer-events-none"></div>
      </div>
    </section>
  )
}