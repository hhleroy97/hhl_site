interface CreativeWork {
  id: string
  title: string
  description: string
  type: 'image' | 'video'
  src: string
  technologies: string[]
  category: 'touchdesigner' | 'generative' | 'installation' | 'performance'
}

export const creativeWorks: CreativeWork[] = [
  {
    id: 'creative-1',
    title: 'Neural Flow Visualization',
    description:
      'Real-time generative artwork that visualizes artificial neural network data flows using particle systems and dynamic color mapping.',
    type: 'image',
    src: '/api/placeholder/800/600',
    technologies: ['TouchDesigner', 'Python', 'OpenGL', 'Neural Networks'],
    category: 'touchdesigner',
  },
  {
    id: 'creative-2',
    title: 'Sonic Landscapes',
    description:
      'Interactive audio-visual installation that transforms ambient sounds into evolving 3D landscapes in real-time.',
    type: 'video',
    src: '/api/placeholder/800/600',
    technologies: ['TouchDesigner', 'Max/MSP', 'FFT Analysis', 'Kinect'],
    category: 'installation',
  },
  {
    id: 'creative-3',
    title: 'Cellular Automata Garden',
    description:
      "Generative art piece exploring complex systems through Conway's Game of Life variations with custom rule sets.",
    type: 'image',
    src: '/api/placeholder/800/600',
    technologies: ['Processing', 'JavaScript', 'p5.js', 'Algorithms'],
    category: 'generative',
  },
  {
    id: 'creative-4',
    title: 'Live Performance Visuals',
    description:
      'Real-time visual performance system synchronized with electronic music, featuring reactive particle systems and shader effects.',
    type: 'video',
    src: '/api/placeholder/800/600',
    technologies: ['TouchDesigner', 'MIDI', 'OSC', 'GLSL Shaders'],
    category: 'performance',
  },
  {
    id: 'creative-5',
    title: 'Fractal Architecture',
    description:
      'Architectural visualization using fractal algorithms to generate impossible structures and non-Euclidean spaces.',
    type: 'image',
    src: '/api/placeholder/800/600',
    technologies: ['Blender', 'Python', 'Fractal Algorithms', '3D Rendering'],
    category: 'generative',
  },
  {
    id: 'creative-6',
    title: 'Interactive Light Installation',
    description:
      'Motion-responsive LED installation that creates immersive light patterns based on viewer movement and proximity.',
    type: 'video',
    src: '/api/placeholder/800/600',
    technologies: ['TouchDesigner', 'Arduino', 'LED Strips', 'Computer Vision'],
    category: 'installation',
  },
  {
    id: 'creative-7',
    title: 'Generative Typography',
    description:
      'Algorithmic type design system that creates unique letterforms based on mathematical principles and natural patterns.',
    type: 'image',
    src: '/api/placeholder/800/600',
    technologies: ['Processing', 'Typography', 'Algorithms', 'SVG'],
    category: 'generative',
  },
  {
    id: 'creative-8',
    title: 'Digital Ecosystem',
    description:
      'Simulated ecosystem where digital organisms evolve, interact, and adapt in a virtual environment over time.',
    type: 'video',
    src: '/api/placeholder/800/600',
    technologies: [
      'TouchDesigner',
      'AI Behavior',
      'Genetic Algorithms',
      'Simulation',
    ],
    category: 'touchdesigner',
  },
]
