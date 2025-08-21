import { motion } from 'framer-motion'
import { useState } from 'react'
import { ContactFormData } from '@/types'

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle')

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })

      setTimeout(() => setSubmitStatus('idle'), 5000)
    }, 2000)
  }

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/hartleyhleroy',
      icon: '',
      color: 'tech-teal',
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/hartleyhleroy',
      icon: '',
      color: 'tech-coral',
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/hartleyhleroy',
      icon: '',
      color: 'tech-teal',
    },
    {
      name: 'Email',
      url: 'mailto:contact@hartleyleroy.dev',
      icon: '',
      color: 'tech-coral',
    },
  ]

  return (
    <section id='contact' className='py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden'>
      {/* Background depth layer */}
      <div className='absolute inset-0 bg-gradient-to-br from-tech-dark via-tech-dark-alt to-tech-dark opacity-90' />
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-tech-coral/5 via-transparent to-tech-teal/5' />
      
      <div className='max-w-7xl mx-auto relative z-10'>
        {/* Section header - Enhanced with disciplined glow */}
        <motion.div
          className='text-center mb-16'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className='text-4xl sm:text-5xl font-cyber font-bold text-white mb-4 relative'>
            GET IN{' '}
            <span className='relative inline-block'>
              <span className='text-tech-coral relative z-10'>TOUCH</span>
              {/* Disciplined glow matching hero */}
              <span className='absolute inset-0 text-tech-coral blur-sm opacity-40'>
                TOUCH
              </span>
            </span>
          </h2>
          <div className='w-24 h-1 bg-tech-coral mx-auto mb-6 relative'>
            {/* Glow effect on accent line */}
            <div className='absolute inset-0 bg-tech-coral blur-sm opacity-60'></div>
          </div>
          <p className='text-lg text-gray-400 font-display max-w-2xl mx-auto'>
            Ready to collaborate on something amazing? Let's build the future
            together.
          </p>
        </motion.div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-16'>
          {/* Contact Form - Enhanced floating container */}
          <motion.div
            className='space-y-6'
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h3 
              className='text-2xl font-cyber font-bold text-tech-coral mb-6 relative'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <span className='relative z-10'>SEND MESSAGE</span>
              <span className='absolute inset-0 text-tech-coral blur-sm opacity-30'>SEND MESSAGE</span>
            </motion.h3>

            <form onSubmit={handleSubmit} className='space-y-6'>
              {/* Name field - Enhanced with floating styling */}
              <motion.div
                className='relative group'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className='w-full px-4 py-3 bg-tech-dark-surface/80 border-2 border-tech-coral/20 
                           rounded-xl text-white font-display placeholder-gray-500
                           focus:border-tech-coral focus:outline-none focus:ring-2 focus:ring-tech-coral/20
                           transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-xl
                           group-hover:border-tech-coral/40'
                  placeholder='Your Name'
                />
                {/* Floating glow effect */}
                <div className='absolute inset-0 bg-tech-coral/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm'></div>
              </motion.div>

              {/* Email field - Enhanced with floating styling */}
              <motion.div
                className='relative group'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className='w-full px-4 py-3 bg-tech-dark-surface/80 border-2 border-tech-coral/20 
                           rounded-xl text-white font-display placeholder-gray-500
                           focus:border-tech-coral focus:outline-none focus:ring-2 focus:ring-tech-coral/20
                           transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-xl
                           group-hover:border-tech-coral/40'
                  placeholder='Your Email'
                />
                {/* Floating glow effect */}
                <div className='absolute inset-0 bg-tech-coral/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm'></div>
              </motion.div>

              {/* Subject field - Enhanced with floating styling */}
              <motion.div
                className='relative group'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <input
                  type='text'
                  name='subject'
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className='w-full px-4 py-3 bg-tech-dark-surface/80 border-2 border-tech-coral/20 
                           rounded-xl text-white font-display placeholder-gray-500
                           focus:border-tech-coral focus:outline-none focus:ring-2 focus:ring-tech-coral/20
                           transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-xl
                           group-hover:border-tech-coral/40'
                  placeholder='Subject'
                />
                {/* Floating glow effect */}
                <div className='absolute inset-0 bg-tech-coral/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm'></div>
              </motion.div>

              {/* Message field - Enhanced with floating styling */}
              <motion.div
                className='relative group'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <textarea
                  name='message'
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className='w-full px-4 py-3 bg-tech-dark-surface/80 border-2 border-tech-coral/20 
                           rounded-xl text-white font-display placeholder-gray-500 resize-none
                           focus:border-tech-coral focus:outline-none focus:ring-2 focus:ring-tech-coral/20
                           transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-xl
                           group-hover:border-tech-coral/40'
                  placeholder='Your Message'
                />
                {/* Floating glow effect */}
                <div className='absolute inset-0 bg-tech-coral/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm'></div>
              </motion.div>

              {/* Submit button - Enhanced with premium styling */}
              <motion.button
                type='submit'
                disabled={isSubmitting}
                className='group relative w-full px-6 py-4 bg-tech-coral text-tech-dark font-cyber font-bold rounded-xl
                         hover:bg-tech-coral/90 hover:shadow-xl hover:shadow-tech-coral/30
                         disabled:opacity-50 disabled:cursor-not-allowed
                         transition-all duration-300 overflow-hidden backdrop-blur-sm'
                whileHover={{
                  scale: isSubmitting ? 1 : 1.02,
                  y: isSubmitting ? 0 : -3,
                  transition: { duration: 0.2, ease: 'easeOut' }
                }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                {/* Button glow effects */}
                <div className='absolute inset-0 bg-tech-coral blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-400'></div>
                <div className='absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10'></div>
                
                {isSubmitting ? (
                  <motion.div
                    className='flex items-center justify-center relative z-10'
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  >
                    <span className='mr-2'></span>
                    SENDING...
                  </motion.div>
                ) : (
                  <span className='relative z-10'>SEND MESSAGE</span>
                )}
              </motion.button>
            </form>

            {/* Success message - Enhanced with glow */}
            {submitStatus === 'success' && (
              <motion.div
                className='relative p-4 bg-green-900/50 border border-green-500 rounded-xl text-green-300 font-display backdrop-blur-sm'
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className='absolute inset-0 bg-green-500/10 rounded-xl blur-sm'></div>
                <span className='relative z-10'>Message sent successfully! I'll get back to you soon.</span>
              </motion.div>
            )}
          </motion.div>

          {/* Contact Info & Social Links - Enhanced floating containers */}
          <motion.div
            className='space-y-8'
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.h3 
              className='text-2xl font-cyber font-bold text-tech-coral mb-6 relative'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <span className='relative z-10'>CONNECT WITH ME</span>
              <span className='absolute inset-0 text-tech-coral blur-sm opacity-30'>CONNECT WITH ME</span>
            </motion.h3>

            {/* Direct contact info - Enhanced floating cards */}
            <div className='space-y-4'>
              <motion.div
                className='group relative flex items-center space-x-4 p-4 bg-tech-dark-surface/80 rounded-xl border border-tech-coral/20 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300'
                whileHover={{ 
                  scale: 1.02,
                  y: -2,
                  borderColor: '#ff4757',
                  transition: { duration: 0.2, ease: 'easeOut' }
                }}
              >
                {/* Depth effects */}
                <div className='absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-black/[0.02] rounded-xl pointer-events-none' />
                <div className='absolute -top-8 -right-8 w-16 h-16 bg-tech-coral/8 rounded-full blur-2xl pointer-events-none group-hover:bg-tech-coral/12 transition-all duration-300' />
                
                <span className='text-2xl relative z-10'>📧</span>
                <div className='relative z-10'>
                  <p className='font-cyber font-bold text-tech-coral'>Email</p>
                  <p className='text-gray-300 font-display'>
                    contact@hartleyleroy.dev
                  </p>
                </div>
              </motion.div>

              <motion.div
                className='group relative flex items-center space-x-4 p-4 bg-tech-dark-surface/80 rounded-xl border border-tech-teal/20 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300'
                whileHover={{ 
                  scale: 1.02,
                  y: -2,
                  borderColor: '#00d4aa',
                  transition: { duration: 0.2, ease: 'easeOut' }
                }}
              >
                {/* Depth effects */}
                <div className='absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-black/[0.02] rounded-xl pointer-events-none' />
                <div className='absolute -top-8 -right-8 w-16 h-16 bg-tech-teal/8 rounded-full blur-2xl pointer-events-none group-hover:bg-tech-teal/12 transition-all duration-300' />
                
                <span className='text-2xl relative z-10'>📍</span>
                <div className='relative z-10'>
                  <p className='font-cyber font-bold text-tech-teal'>
                    Location
                  </p>
                  <p className='text-gray-300 font-display'>
                    Available Worldwide (Remote)
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Social links - Enhanced floating cards */}
            <div>
              <h4 className='text-lg font-cyber font-bold text-white mb-4 relative'>
                <span className='relative z-10'>SOCIAL LINKS</span>
                <span className='absolute inset-0 text-white blur-sm opacity-20'>SOCIAL LINKS</span>
              </h4>
              <div className='grid grid-cols-2 gap-4'>
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='group relative flex items-center space-x-3 p-4 bg-tech-dark-surface/80 rounded-xl 
                             border border-gray-600/30 hover:border-tech-coral/40
                             transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-xl'
                    whileHover={{ 
                      scale: 1.02,
                      y: -3,
                      transition: { duration: 0.2, ease: 'easeOut' }
                    }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  >
                    {/* Depth effects */}
                    <div className='absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-black/[0.02] rounded-xl pointer-events-none' />
                    <div className={`absolute -top-6 -right-6 w-12 h-12 bg-${link.color}/8 rounded-full blur-xl pointer-events-none group-hover:bg-${link.color}/12 transition-all duration-300`} />
                    
                    <span className='text-xl relative z-10'>{link.icon}</span>
                    <span className='font-cyber font-bold text-white relative z-10 group-hover:text-tech-coral transition-colors duration-300'>
                      {link.name}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Resume download - Enhanced with premium styling */}
            <motion.div
              className='pt-6'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <motion.a
                href='/resume.pdf'
                download
                className='group relative inline-flex items-center px-6 py-3 border-2 border-tech-coral text-tech-coral 
                         font-cyber font-bold rounded-xl hover:bg-tech-coral hover:text-tech-dark 
                         hover:shadow-xl hover:shadow-tech-coral/30 transition-all duration-300 overflow-hidden backdrop-blur-sm'
                whileHover={{ 
                  scale: 1.03,
                  y: -3,
                  transition: { duration: 0.2, ease: 'easeOut' }
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Button glow effects */}
                <div className='absolute inset-0 bg-tech-coral blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-400'></div>
                <div className='absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10'></div>
                
                <span className='mr-2 relative z-10'>📄</span>
                <span className='relative z-10'>DOWNLOAD RESUME</span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
