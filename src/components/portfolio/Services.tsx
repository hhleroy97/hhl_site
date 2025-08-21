import { motion } from 'framer-motion'

// Simple line icons using SVG
const CloudIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
  </svg>
)

const ZapIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="13,2 3,14 12,14 11,22 21,10 12,10"/>
  </svg>
)

const SettingsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3"/>
    <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
  </svg>
)

const services = [
  {
    icon: CloudIcon,
    title: "Cloud & Data",
    bullets: [
      "AWS IoT + Kinesis ingestion",
      "S3/Athena queryable telemetry", 
      "ETL + cost-optimized storage"
    ],
    microcopy: "Scalable data infrastructure that grows with your needs"
  },
  {
    icon: ZapIcon,
    title: "Realtime/Creative",
    bullets: [
      "R3F/TouchDesigner visuals",
      "Audio/MIDI-reactive systems",
      "3D web hooks & dashboards"
    ],
    microcopy: "Interactive experiences that captivate and engage"
  },
  {
    icon: SettingsIcon,
    title: "Product/PM",
    bullets: [
      "Roadmaps & specs",
      "Sprint hygiene & handoff",
      "Developer enablement"
    ],
    microcopy: "Strategic guidance from concept to delivery"
  }
]

export default function Services() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-custom">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-section-heading mb-4">What I Do</h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Full-stack solutions from cloud infrastructure to interactive experiences
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="group p-6 rounded-2xl bg-white/5 ring-1 ring-white/10 backdrop-blur-md hover:bg-white/10 hover:ring-white/20 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.02,
                y: -4
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-400/20 to-fuchsia-500/20 ring-1 ring-white/20">
                  <service.icon />
                </div>
                <h3 className="text-xl font-semibold">{service.title}</h3>
              </div>
              
              <ul className="space-y-2 mb-4">
                {service.bullets.map((bullet, i) => (
                  <li key={i} className="text-zinc-300 text-sm flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 mt-2 flex-shrink-0" />
                    {bullet}
                  </li>
                ))}
              </ul>
              
              <p className="text-xs text-zinc-400 border-t border-white/10 pt-4">
                {service.microcopy}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <a 
            href="#contact"
            className="btn-primary group inline-flex items-center gap-2"
          >
            <span>Book a 20-min intro</span>
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              className="group-hover:translate-x-1 transition-transform"
            >
              <path d="M5 12h14m-7-7 7 7-7 7"/>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}