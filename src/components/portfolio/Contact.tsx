import { motion } from 'framer-motion'
import { useState } from 'react'
import { useContactContent } from '@/hooks/useSiteContent'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const { contact, loading } = useContactContent()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setSubmitStatus('success')
    
    // Reset form after success
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' })
      setSubmitStatus('idle')
    }, 3000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  if (loading || !contact) {
    return (
      <section id='contact' className='min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden'>
        <div className='max-w-7xl mx-auto w-full'>
          <div className='space-y-8'>
            <div className='h-8 bg-tech-dark-surface/50 rounded animate-pulse'></div>
            <div className='h-4 bg-tech-dark-surface/50 rounded animate-pulse max-w-md mx-auto'></div>
            <div className='grid gap-6 md:grid-cols-2'>
              <div className='h-64 bg-tech-dark-surface/50 rounded-xl animate-pulse'></div>
              <div className='space-y-4'>
                {[...Array(4)].map((_, i) => (
                  <div key={i} className='h-12 bg-tech-dark-surface/50 rounded animate-pulse'></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id='contact' className='min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden'>
      {/* Background depth layer */}
      <div className='absolute inset-0 bg-gradient-to-br from-tech-dark via-tech-dark-alt to-tech-dark opacity-95' />
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accentWarm/5 via-transparent to-accentCool/5' />

      <div className='max-w-7xl mx-auto w-full relative z-10'>
        {/* Section header */}
        <motion.div
          className='text-center mb-16'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className='text-h2 font-bold text-text-primary mb-4'>
            Get In <span className='text-accentWarm text-glow-warm'>Touch</span>
          </h2>
          <div className='w-24 h-1 bg-accentWarm mx-auto mb-6' />
          <p className='text-body text-text-secondary max-w-2xl mx-auto'>
            {contact.hook}
          </p>
        </motion.div>

        <div className='grid gap-12 lg:grid-cols-2 items-start'>
          {/* Contact form */}
          <motion.div
            className='space-y-6'
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className='space-y-6'>
              <div className='grid gap-6 md:grid-cols-2'>
                <div>
                  <label htmlFor='name' className='block text-sm font-semibold text-text-primary mb-2'>
                    {contact.form.name}
                  </label>
                  <input
                    type='text'
                    id='name'
                    name='name'
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className='w-full px-4 py-3 bg-tech-dark-surface/80 border border-accentWarm/20 rounded-xl 
                             text-text-primary placeholder-text-muted focus:border-accentWarm focus:ring-2 
                             focus:ring-accentWarm/20 focus:outline-none transition-all duration-300 backdrop-blur-sm'
                    placeholder='Your name'
                  />
                </div>
                <div>
                  <label htmlFor='email' className='block text-sm font-semibold text-text-primary mb-2'>
                    {contact.form.email}
                  </label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className='w-full px-4 py-3 bg-tech-dark-surface/80 border border-accentWarm/20 rounded-xl 
                             text-text-primary placeholder-text-muted focus:border-accentWarm focus:ring-2 
                             focus:ring-accentWarm/20 focus:outline-none transition-all duration-300 backdrop-blur-sm'
                    placeholder='your.email@example.com'
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor='subject' className='block text-sm font-semibold text-text-primary mb-2'>
                  {contact.form.subject}
                </label>
                <input
                  type='text'
                  id='subject'
                  name='subject'
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className='w-full px-4 py-3 bg-tech-dark-surface/80 border border-accentWarm/20 rounded-xl 
                           text-text-primary placeholder-text-muted focus:border-accentWarm focus:ring-2 
                           focus:ring-accentWarm/20 focus:outline-none transition-all duration-300 backdrop-blur-sm'
                  placeholder='Project inquiry'
                />
              </div>
              
              <div>
                <label htmlFor='message' className='block text-sm font-semibold text-text-primary mb-2'>
                  {contact.form.message}
                </label>
                <textarea
                  id='message'
                  name='message'
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className='w-full px-4 py-3 bg-tech-dark-surface/80 border border-accentWarm/20 rounded-xl 
                           text-text-primary placeholder-text-muted focus:border-accentWarm focus:ring-2 
                           focus:ring-accentWarm/20 focus:outline-none transition-all duration-300 backdrop-blur-sm resize-none'
                  placeholder='Tell me about your project...'
                />
              </div>
              
              <motion.button
                type='submit'
                disabled={isSubmitting}
                className='w-full px-6 py-4 bg-accentWarm text-tech-dark font-semibold rounded-xl 
                         hover:bg-accentWarm/90 focus:ring-2 focus:ring-accentWarm/20 focus:outline-none 
                         transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? contact.form.sending : contact.form.submit}
              </motion.button>
            </form>

            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className='p-4 bg-green-500/20 border border-green-500/30 rounded-xl text-green-400 text-center'
              >
                {contact.form.success}
              </motion.div>
            )}
          </motion.div>

          {/* Contact info */}
          <motion.div
            className='space-y-8'
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className='space-y-6'>
              <h3 className='text-h3 font-semibold text-text-primary'>Contact Information</h3>
              
              <div className='space-y-4'>
                <div className='flex items-center space-x-3'>
                  <div className='w-2 h-2 bg-accentWarm rounded-full'></div>
                  <span className='text-body text-text-secondary'>{contact.info.email}</span>
                </div>
                <div className='flex items-center space-x-3'>
                  <div className='w-2 h-2 bg-accentWarm rounded-full'></div>
                  <span className='text-body text-text-secondary'>{contact.info.location}</span>
                </div>
              </div>
            </div>

            <div className='space-y-6'>
              <h3 className='text-h3 font-semibold text-text-primary'>Connect</h3>
              
              <div className='grid gap-4'>
                {contact.social.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex items-center space-x-3 p-4 bg-tech-dark-surface/50 border border-accentWarm/10 
                             rounded-xl hover:border-accentWarm/30 hover:bg-tech-dark-surface/70 
                             transition-all duration-300 backdrop-blur-sm'
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <span className='text-accentWarm'>{social.icon}</span>
                    <span className='text-body text-text-secondary'>{social.name}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
