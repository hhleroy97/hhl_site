import React from 'react'
import CyberpunkTrainerCard from './CyberpunkTrainerCard'

const CyberpunkTrainerCardDemo: React.FC = () => {
  return (
    <div className='min-h-screen bg-cyberpunk-dark p-8'>
      <div className='max-w-4xl mx-auto space-y-8'>
        {/* Demo Header */}
        <div className='text-center space-y-4'>
          <h1 className='text-4xl font-cyber font-bold cyberpunk-glow'>
            CYBERPUNK PROFESSIONAL CARD
          </h1>
          <p className='text-cyberpunk-neon/80 font-mono text-sm'>
            Professional card with stacked work experience and achievement
            sections
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
            workExperience={[
              {
                company: 'Meta',
                role: 'Frontend Lead',
                years: '2020-2023',
                icon: '🚀',
              },
              {
                company: 'Airbnb',
                role: 'Senior Engineer',
                years: '2018-2020',
                icon: '🏠',
              },
              {
                company: 'Stripe',
                role: 'Software Engineer',
                years: '2016-2018',
                icon: '💳',
              },
              {
                company: 'Startup Co',
                role: 'Full-Stack Dev',
                years: '2014-2016',
                icon: '⚡',
              },
              {
                company: 'Agency X',
                role: 'Frontend Dev',
                years: '2012-2014',
                icon: '🎨',
              },
              {
                company: 'Freelance',
                role: 'Web Developer',
                years: '2010-2012',
                icon: '💻',
              },
            ]}
            achievements={[
              {
                title: 'Projects',
                description: 'Led major initiatives',
                value: '30+',
                icon: '🎯',
              },
              {
                title: 'Experience',
                description: 'Years in frontend',
                value: '12+',
                icon: '⏰',
              },
              {
                title: 'Frameworks',
                description: 'Frontend technologies',
                value: '8+',
                icon: '⚛️',
              },
              {
                title: 'Team Lead',
                description: 'Developers managed',
                value: '12',
                icon: '👥',
              },
              {
                title: 'Designs',
                description: 'UI/UX projects',
                value: '50+',
                icon: '🎨',
              },
              {
                title: 'Libraries',
                description: 'Open source work',
                value: '25+',
                icon: '📦',
              },
              {
                title: 'Talks',
                description: 'Conference speaking',
                value: '8',
                icon: '🎤',
              },
              {
                title: 'Mentees',
                description: 'Developers coached',
                value: '15+',
                icon: '📚',
              },
            ]}
            className='transform scale-90'
          />
          <CyberpunkTrainerCard
            trainerName='ALEX CHEN'
            workExperience={[
              {
                company: 'Netflix',
                role: 'DevOps Lead',
                years: '2021-2023',
                icon: '🎬',
              },
              {
                company: 'Uber',
                role: 'Site Reliability',
                years: '2019-2021',
                icon: '🚗',
              },
              {
                company: 'Docker',
                role: 'Platform Engineer',
                years: '2017-2019',
                icon: '🐋',
              },
              {
                company: 'Red Hat',
                role: 'Systems Engineer',
                years: '2015-2017',
                icon: '🎩',
              },
              {
                company: 'Startups',
                role: 'Infrastructure',
                years: '2013-2015',
                icon: '🏗️',
              },
              {
                company: 'IBM',
                role: 'Junior Engineer',
                years: '2011-2013',
                icon: '🏢',
              },
            ]}
            achievements={[
              {
                title: 'Uptime',
                description: 'System availability',
                value: '99.9%',
                icon: '⚡',
              },
              {
                title: 'Experience',
                description: 'Years in DevOps',
                value: '10+',
                icon: '⏰',
              },
              {
                title: 'Platforms',
                description: 'Cloud technologies',
                value: '15+',
                icon: '☁️',
              },
              {
                title: 'Clusters',
                description: 'K8s deployments',
                value: '50+',
                icon: '🎯',
              },
              {
                title: 'Automation',
                description: 'Scripts written',
                value: '200+',
                icon: '🤖',
              },
              {
                title: 'Migrations',
                description: 'Cloud transitions',
                value: '12',
                icon: '🔄',
              },
              {
                title: 'Incidents',
                description: 'Critical fixes',
                value: '100+',
                icon: '🚨',
              },
              {
                title: 'Training',
                description: 'Team workshops',
                value: '25+',
                icon: '📚',
              },
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
              <span>Name in top left corner with professional tagline</span>
            </li>
            <li className='flex items-center space-x-2'>
              <div className='w-2 h-2 bg-cyberpunk-green rounded-full'></div>
              <span>Work experience section - 6 slots in 3x2 grid</span>
            </li>
            <li className='flex items-center space-x-2'>
              <div className='w-2 h-2 bg-cyberpunk-green rounded-full'></div>
              <span>Achievement badges - 8 slots in 4x2 grid with metrics</span>
            </li>
            <li className='flex items-center space-x-2'>
              <div className='w-2 h-2 bg-cyberpunk-green rounded-full'></div>
              <span>Properly stacked sections with full width</span>
            </li>
            <li className='flex items-center space-x-2'>
              <div className='w-2 h-2 bg-cyberpunk-green rounded-full'></div>
              <span>Custom icons for each company and achievement</span>
            </li>
            <li className='flex items-center space-x-2'>
              <div className='w-2 h-2 bg-cyberpunk-green rounded-full'></div>
              <span>Hover effects and neon glow styling</span>
            </li>
            <li className='flex items-center space-x-2'>
              <div className='w-2 h-2 bg-cyberpunk-green rounded-full'></div>
              <span>Compact profile section with circuit patterns</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default CyberpunkTrainerCardDemo
