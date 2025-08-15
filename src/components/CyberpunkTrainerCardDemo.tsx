import React from 'react'
import CyberpunkTrainerCard from './CyberpunkTrainerCard'

const CyberpunkTrainerCardDemo: React.FC = () => {
  return (
    <div className='min-h-screen bg-cyberpunk-dark p-8'>
      <div className='max-w-4xl mx-auto space-y-8'>
        {/* Demo Header */}
        <div className='text-center space-y-4'>
          <h1 className='text-4xl font-cyber font-bold cyberpunk-glow'>
            CYBERPUNK TRAINER CARD
          </h1>
          <p className='text-cyberpunk-neon/80 font-mono text-sm'>
            A futuristic trainer card with cyberpunk aesthetics and modular
            design
          </p>
        </div>

        {/* Main Demo Card */}
        <div className='flex justify-center'>
          <CyberpunkTrainerCard
            trainerName='HARTLEY H. LEROY'
            className='max-w-3xl w-full'
          />
        </div>

        {/* Additional Examples */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12'>
          <CyberpunkTrainerCard
            trainerName='JANE DOE'
            professionalCards={[
              {
                title: 'Frontend Lead',
                description: 'UI/UX & React specialist',
                type: 'experience',
              },
              {
                title: 'Design System',
                description: 'Component library architect',
                type: 'project',
              },
              {
                title: 'Accessibility Expert',
                description: 'WCAG compliance champion',
                type: 'achievement',
              },
            ]}
            techStack={[
              { name: 'React', category: 'Frontend', level: 'Expert' },
              { name: 'CSS', category: 'Styling', level: 'Expert' },
              { name: 'Figma', category: 'Design', level: 'Advanced' },
              { name: 'TypeScript', category: 'Language', level: 'Advanced' },
            ]}
            className='transform scale-90'
          />
          <CyberpunkTrainerCard
            trainerName='ALEX CHEN'
            professionalCards={[
              {
                title: 'DevOps Engineer',
                description: 'Infrastructure & automation',
                type: 'experience',
              },
              {
                title: 'K8s Migration',
                description: 'Containerization project',
                type: 'project',
              },
              {
                title: 'Zero Downtime',
                description: '99.99% uptime achievement',
                type: 'achievement',
              },
            ]}
            techStack={[
              { name: 'Kubernetes', category: 'DevOps', level: 'Expert' },
              { name: 'Docker', category: 'Container', level: 'Expert' },
              { name: 'AWS', category: 'Cloud', level: 'Advanced' },
              { name: 'Terraform', category: 'IaC', level: 'Advanced' },
            ]}
            className='transform scale-90'
          />
        </div>

        {/* Features List */}
        <div className='bg-gradient-to-r from-cyberpunk-purple/10 to-cyberpunk-blue/10 border border-cyberpunk-neon/30 rounded-lg p-6 mt-12'>
          <h2 className='text-xl font-cyber font-bold text-cyberpunk-pink mb-4'>
            FEATURES
          </h2>
          <ul className='space-y-2 text-cyberpunk-neon/80 font-mono text-sm'>
            <li className='flex items-center space-x-2'>
              <div className='w-2 h-2 bg-cyberpunk-green rounded-full'></div>
              <span>
                Professional name prominently displayed in top left corner
              </span>
            </li>
            <li className='flex items-center space-x-2'>
              <div className='w-2 h-2 bg-cyberpunk-green rounded-full'></div>
              <span>Stacked professional portfolio cards with full width</span>
            </li>
            <li className='flex items-center space-x-2'>
              <div className='w-2 h-2 bg-cyberpunk-green rounded-full'></div>
              <span>Tech stack cards with skill level indicators</span>
            </li>
            <li className='flex items-center space-x-2'>
              <div className='w-2 h-2 bg-cyberpunk-green rounded-full'></div>
              <span>Compact profile image section with circuit patterns</span>
            </li>
            <li className='flex items-center space-x-2'>
              <div className='w-2 h-2 bg-cyberpunk-green rounded-full'></div>
              <span>Dynamic card type icons and status indicators</span>
            </li>
            <li className='flex items-center space-x-2'>
              <div className='w-2 h-2 bg-cyberpunk-green rounded-full'></div>
              <span>
                Color-coded skill levels (Expert, Advanced, Intermediate)
              </span>
            </li>
            <li className='flex items-center space-x-2'>
              <div className='w-2 h-2 bg-cyberpunk-green rounded-full'></div>
              <span>Professional tagline and availability status</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default CyberpunkTrainerCardDemo
