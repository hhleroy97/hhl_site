import { Experience } from '@/types'

export const technicalExperience: Experience[] = [
  {
    id: 'tech-1',
    company: 'TechCorp Solutions',
    role: 'Senior Software Engineer',
    duration: '2022 - Present',
    description: [
      'Architected and implemented microservices infrastructure serving 1M+ daily users',
      'Led migration from monolithic to containerized architecture, reducing deployment time by 80%',
      'Built real-time data processing pipelines handling 10TB+ daily throughput',
      'Mentored junior developers and established coding standards across 3 teams',
    ],
    technologies: [
      'TypeScript',
      'Node.js',
      'Docker',
      'Kubernetes',
      'AWS',
      'PostgreSQL',
      'Redis',
    ],
    type: 'technical',
  },
  {
    id: 'tech-2',
    company: 'InnovateLabs',
    role: 'Full Stack Developer',
    duration: '2020 - 2022',
    description: [
      'Developed high-performance React applications with server-side rendering',
      'Implemented GraphQL APIs with advanced caching and optimization strategies',
      'Built CI/CD pipelines reducing deployment cycles from days to minutes',
      'Created automated testing suites achieving 95+ % code coverage',
    ],
    technologies: [
      'React',
      'GraphQL',
      'Python',
      'Django',
      'Jenkins',
      'MongoDB',
      'Elasticsearch',
    ],
    type: 'technical',
  },
  {
    id: 'tech-3',
    company: 'StartupXYZ',
    role: 'Software Developer',
    duration: '2018 - 2020',
    description: [
      'Developed MVP from concept to production in 6 months',
      'Implemented real-time features using WebSocket and Socket.io',
      'Optimized database queries reducing response times by 60%',
      'Integrated third-party APIs and payment processing systems',
    ],
    technologies: [
      'JavaScript',
      'Vue.js',
      'Node.js',
      'MySQL',
      'Socket.io',
      'Stripe API',
    ],
    type: 'technical',
  },
]

export const leadershipExperience: Experience[] = [
  {
    id: 'lead-1',
    company: 'TechCorp Solutions',
    role: 'Technical Team Lead',
    duration: '2023 - Present',
    description: [
      'Led cross-functional team of 12 engineers across 3 different time zones',
      'Established agile processes reducing project delivery time by 40%',
      'Drove technical strategy and architecture decisions for core platform',
      'Managed stakeholder relationships and translated business requirements to technical solutions',
    ],
    technologies: [
      'Team Management',
      'Agile/Scrum',
      'Architecture Design',
      'Stakeholder Communication',
    ],
    type: 'leadership',
  },
  {
    id: 'lead-2',
    company: 'Innovation Collective',
    role: 'Project Manager & Tech Lead',
    duration: '2021 - 2023',
    description: [
      'Managed portfolio of 5+ concurrent projects with $2M+ combined budget',
      'Built and scaled engineering team from 3 to 15 members',
      'Implemented OKR framework improving team productivity by 35%',
      'Established engineering culture focused on innovation and continuous learning',
    ],
    technologies: [
      'Project Management',
      'Team Building',
      'OKR Implementation',
      'Budget Management',
    ],
    type: 'leadership',
  },
  {
    id: 'lead-3',
    company: 'Creative Tech Studio',
    role: 'Co-Founder & CTO',
    duration: '2019 - 2021',
    description: [
      'Co-founded studio specializing in interactive digital installations',
      'Led technical vision and product development strategy',
      'Built partnerships with major brands and cultural institutions',
      'Grew company from 2 to 20 employees with 400% revenue growth',
    ],
    technologies: [
      'Strategic Planning',
      'Business Development',
      'Product Strategy',
      'Partnership Building',
    ],
    type: 'leadership',
  },
]
