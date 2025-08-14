import { Project } from '@/types'

export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'Cloud-Native Microservices Platform',
    description:
      'Architected and built a scalable microservices platform handling 1M+ daily users with 99.9% uptime. Implemented advanced monitoring, auto-scaling, and deployment automation.',
    technologies: [
      'Kubernetes',
      'Docker',
      'Go',
      'gRPC',
      'Prometheus',
      'Istio',
      'AWS',
    ],
    imageUrl: '/api/placeholder/600/400',
    demoUrl: 'https://demo.example.com',
    githubUrl: 'https://github.com/hartley/microservices-platform',
    featured: true,
    category: 'technical',
  },
  {
    id: 'project-2',
    title: 'Real-Time Analytics Dashboard',
    description:
      'Built a high-performance real-time analytics dashboard processing 10TB+ daily data. Features interactive visualizations, custom alerts, and AI-powered insights.',
    technologies: [
      'React',
      'TypeScript',
      'D3.js',
      'WebSocket',
      'Python',
      'Apache Kafka',
      'ClickHouse',
    ],
    imageUrl: '/api/placeholder/600/400',
    demoUrl: 'https://analytics.example.com',
    githubUrl: 'https://github.com/hartley/analytics-dashboard',
    featured: true,
    category: 'technical',
  },
  {
    id: 'project-3',
    title: 'AI-Powered Code Review System',
    description:
      'Developed an intelligent code review system using machine learning to automatically detect bugs, security vulnerabilities, and suggest optimizations.',
    technologies: [
      'Python',
      'TensorFlow',
      'FastAPI',
      'PostgreSQL',
      'Redis',
      'Docker',
    ],
    imageUrl: '/api/placeholder/600/400',
    githubUrl: 'https://github.com/hartley/ai-code-review',
    featured: true,
    category: 'technical',
  },
  {
    id: 'project-4',
    title: 'Interactive Data Visualization Suite',
    description:
      'Created a comprehensive data visualization library with 50+ chart types, real-time updates, and advanced interaction capabilities.',
    technologies: ['JavaScript', 'D3.js', 'Canvas', 'WebGL', 'TypeScript'],
    imageUrl: '/api/placeholder/600/400',
    demoUrl: 'https://dataviz.example.com',
    githubUrl: 'https://github.com/hartley/dataviz-suite',
    featured: false,
    category: 'technical',
  },
  {
    id: 'project-5',
    title: 'Immersive AR Installation',
    description:
      'Designed and developed an augmented reality installation for art galleries, blending physical and digital spaces with TouchDesigner and Unity.',
    technologies: ['Unity', 'TouchDesigner', 'ARCore', 'C#', 'HLSL', 'OSC'],
    imageUrl: '/api/placeholder/600/400',
    demoUrl: 'https://ar-installation.example.com',
    featured: true,
    category: 'creative',
  },
  {
    id: 'project-6',
    title: 'Generative Music Visualizer',
    description:
      'Built a real-time music visualizer using generative algorithms that creates unique visual patterns synchronized to audio input.',
    technologies: [
      'Processing',
      'Max/MSP',
      'OpenGL',
      'FFT Analysis',
      'TouchDesigner',
    ],
    imageUrl: '/api/placeholder/600/400',
    demoUrl: 'https://music-viz.example.com',
    githubUrl: 'https://github.com/hartley/music-visualizer',
    featured: false,
    category: 'creative',
  },
]
