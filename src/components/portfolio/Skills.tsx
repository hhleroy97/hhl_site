import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageSection from '../ui/PageSection'
import {
  Code2,
  Database,
  Cloud,
  Brain,
  Users,
  Target,
  Palette,
  Rocket,
  Globe,
  Server,
  Cpu,
  Monitor,
  Layers,
  Terminal,
  GitBranch,
  Zap,
  Eye,
  BarChart3,
  TrendingUp,
  Network,
  Wifi,
  Radio,
  Crown,
  Mic,
  MessageCircle,
  Lightbulb,
  Handshake,
  Search,
  Crosshair,
  CircuitBoard,
  BookOpen,
  FileText,
  Clipboard,
  RotateCcw,
  Microscope,
  FileCode,
  Smartphone,
  Brush,
  Music,
  Sparkles,
  Play,
  Gamepad2,
  Waves,
  Signal,
  Activity,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

const skillCategories = [
  {
    id: 'fullstack',
    title: 'Full Stack',
    IconComponent: Rocket,
    color: 'from-purple-400 to-cyan-500',
    skills: [
      { name: 'React.js', endorsements: 0, stars: 3 },
      { name: 'Vue.js', endorsements: 0, stars: 2.5 },
      { name: 'JavaScript', endorsements: 0, stars: 3 },
      { name: 'TypeScript', endorsements: 0, stars: 2.5 },
      { name: 'HTML', endorsements: 0, stars: 3 },
      { name: 'CSS', endorsements: 0, stars: 2.5 },
      { name: 'Python', endorsements: 1, stars: 3 },
      { name: 'Node.js', endorsements: 0, stars: 2.5 },
      { name: 'APIs', endorsements: 0, stars: 2.5 },
      { name: 'Web Applications', endorsements: 0, stars: 3 },
      { name: 'Embedded Systems', endorsements: 0, stars: 2.5 },
      { name: 'Embedded C', endorsements: 0, stars: 2.5 },
      { name: 'Docker', endorsements: 0, stars: 2 },
      { name: 'Linux', endorsements: 0, stars: 2.5 },
      { name: 'Three.js', endorsements: 0, stars: 2 },
      { name: 'WebGL', endorsements: 0, stars: 2 },
    ],
  },
  {
    id: 'clouddata',
    title: 'Cloud & Data',
    IconComponent: Globe,
    color: 'from-cyan-400 to-teal-500',
    skills: [
      { name: 'AWS', endorsements: 0, stars: 2.5 },
      { name: 'IoT Core', endorsements: 0, stars: 2.5 },
      { name: 'Lambda', endorsements: 0, stars: 2.5 },
      { name: 'S3', endorsements: 0, stars: 2.5 },
      { name: 'Data Analysis', endorsements: 0, stars: 3 },
      { name: 'Data Science', endorsements: 0, stars: 2.5 },
      { name: 'Machine Learning', endorsements: 1, stars: 2.5 },
      { name: 'Computer Vision', endorsements: 0, stars: 2.5 },
      { name: 'Neural Networks', endorsements: 0, stars: 2.5 },
      { name: 'SQL', endorsements: 0, stars: 2.5 },
      { name: 'Data Pipelines', endorsements: 0, stars: 2 },
      { name: 'Image Processing', endorsements: 1, stars: 2.5 },
      { name: 'Statistical Analysis', endorsements: 0, stars: 2.5 },
      { name: 'ROS2', endorsements: 0, stars: 3 },
      { name: 'MQTT', endorsements: 0, stars: 2.5 },
      { name: 'Telemetry', endorsements: 0, stars: 2.5 },
    ],
  },
  {
    id: 'softskills',
    title: 'Soft Skills',
    IconComponent: Users,
    color: 'from-teal-400 to-emerald-500',
    skills: [
      { name: 'Team Leadership', endorsements: 8, stars: 3 },
      { name: 'Public Speaking', endorsements: 8, stars: 2.5 },
      { name: 'Communication', endorsements: 1, stars: 3 },
      { name: 'Creative Problem', endorsements: 1, stars: 3 },
      { name: 'Collaborative', endorsements: 2, stars: 3 },
      { name: 'Detail Oriented', endorsements: 3, stars: 3 },
      { name: 'Cross-func Lead', endorsements: 0, stars: 2.5 },
      { name: 'Coordination', endorsements: 0, stars: 2.5 },
      { name: 'Knowledge Mgmt', endorsements: 0, stars: 2.5 },
      { name: 'Peer Tutoring', endorsements: 1, stars: 2.5 },
      { name: 'Presentations', endorsements: 0, stars: 2.5 },
    ],
  },
  {
    id: 'projectmgmt',
    title: 'Project Mgmt',
    IconComponent: Target,
    color: 'from-emerald-400 to-blue-500',
    skills: [
      { name: 'Project Mgmt', endorsements: 0, stars: 2.5 },
      { name: 'Agile', endorsements: 0, stars: 2.5 },
      { name: 'Research', endorsements: 0, stars: 3 },
      { name: 'Tech Writing', endorsements: 0, stars: 2.5 },
      { name: 'Tech Docs', endorsements: 0, stars: 2.5 },
      { name: 'Notion', endorsements: 0, stars: 2 },
      { name: 'Drone Piloting', endorsements: 0, stars: 2.5 },
      { name: 'Drones', endorsements: 0, stars: 2.5 },
      { name: 'Robot Systems', endorsements: 0, stars: 3 },
      { name: 'OTA Updates', endorsements: 0, stars: 2.5 },
    ],
  },
  {
    id: 'creative',
    title: 'Creative',
    IconComponent: Palette,
    color: 'from-blue-400 to-purple-500',
    skills: [
      { name: 'Digital Art', endorsements: 0, stars: 2 },
      { name: 'Music Production', endorsements: 1, stars: 2.5 },
      { name: 'Creativity', endorsements: 4, stars: 3 },
      { name: 'TouchDesigner', endorsements: 0, stars: 2.5 },
      { name: 'R3F', endorsements: 0, stars: 2 },
      { name: 'Kinect', endorsements: 0, stars: 2 },
      { name: 'MIDI', endorsements: 0, stars: 2.5 },
      { name: 'Processing', endorsements: 0, stars: 2 },
      { name: 'Shaders', endorsements: 0, stars: 2 },
      { name: 'Wireless Comms', endorsements: 0, stars: 2.5 },
      { name: 'Signal Processing', endorsements: 0, stars: 2.5 },
      { name: 'DSP', endorsements: 1, stars: 2.5 },
    ],
  },
]

const StarRating = ({ rating }: { rating: number }) => {
  const stars = []
  for (let i = 1; i <= 3; i++) {
    if (i <= rating) {
      stars.push(
        <span key={i} className='text-yellow-400'>
          ★
        </span>
      )
    } else if (i - 0.5 <= rating) {
      stars.push(
        <span key={i} className='text-yellow-400 relative'>
          <span className='absolute inset-0 overflow-hidden w-1/2'>★</span>
          <span className='text-zinc-600'>★</span>
        </span>
      )
    } else {
      stars.push(
        <span key={i} className='text-zinc-600'>
          ★
        </span>
      )
    }
  }
  return <div className='flex text-sm'>{stars}</div>
}

const getEndorsementBadge = (count: number) => {
  if (count === 0) return null
  return (
    <div className='bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-xs rounded px-1 font-bold'>
      {count}
    </div>
  )
}

// Radar Chart Component
const SkillRadarChart = ({ activeCategory }: { activeCategory: string }) => {
  // Calculate category averages dynamically
  const calculateCategoryAverage = (categoryId: string) => {
    const category = skillCategories.find(cat => cat.id === categoryId)
    if (!category) return 0
    const avgStars =
      category.skills.reduce((sum, skill) => sum + skill.stars, 0) /
      category.skills.length
    return Math.round((avgStars / 3) * 100) // Convert 0-3 stars to 0-100%
  }

  const getSkillStats = () => {
    if (activeCategory === 'all') {
      // Show all categories when "all" is selected
      return [
        {
          label: 'Full Stack',
          value: calculateCategoryAverage('fullstack'),
          color: 'from-purple-400 to-cyan-500',
        },
        {
          label: 'Cloud/Data',
          value: calculateCategoryAverage('clouddata'),
          color: 'from-cyan-400 to-teal-500',
        },
        {
          label: 'Soft Skills',
          value: calculateCategoryAverage('softskills'),
          color: 'from-teal-400 to-emerald-500',
        },
        {
          label: 'Project Mgmt',
          value: calculateCategoryAverage('projectmgmt'),
          color: 'from-emerald-400 to-blue-500',
        },
        {
          label: 'Creative',
          value: calculateCategoryAverage('creative'),
          color: 'from-blue-400 to-purple-500',
        },
      ]
    } else {
      // Show individual skills when a specific category is selected
      const category = skillCategories.find(cat => cat.id === activeCategory)
      if (!category) return []

      // Take top 5 skills from the category, pad with empty if needed
      const topSkills = category.skills
        .sort((a, b) => b.stars - a.stars)
        .slice(0, 5)

      // Pad to exactly 5 items for consistent pentagon shape
      while (topSkills.length < 5) {
        topSkills.push({ name: '', stars: 0, endorsements: 0 })
      }

      return topSkills.map(skill => ({
        label: skill.name
          ? skill.name.length > 12
            ? skill.name.substring(0, 12) + '...'
            : skill.name
          : '',
        value: Math.round((skill.stars / 3) * 100),
        color: category.color,
      }))
    }
  }

  const skillStats = getSkillStats()

  const size = 200
  const center = size / 2
  const maxRadius = size * 0.35
  const levels = 5

  // Generate pentagon points
  const getPolygonPoints = (radius: number) => {
    const points = []
    for (let i = 0; i < skillStats.length; i++) {
      const angle = (i * 2 * Math.PI) / skillStats.length - Math.PI / 2
      const x = center + radius * Math.cos(angle)
      const y = center + radius * Math.sin(angle)
      points.push([x, y])
    }
    return points
  }

  // Generate value points based on skill levels
  const getValuePoints = () => {
    const points = []
    for (let i = 0; i < skillStats.length; i++) {
      const angle = (i * 2 * Math.PI) / skillStats.length - Math.PI / 2
      const radius = (skillStats[i].value / 100) * maxRadius
      const x = center + radius * Math.cos(angle)
      const y = center + radius * Math.sin(angle)
      points.push([x, y])
    }
    return points
  }

  const valuePoints = getValuePoints()

  return (
    <div className='relative'>
      <svg width={size} height={size} className='drop-shadow-lg'>
        {/* Background grid levels */}
        {Array.from({ length: levels }, (_, i) => {
          const radius = maxRadius * ((i + 1) / levels)
          const points = getPolygonPoints(radius)
          return (
            <polygon
              key={i}
              points={points.map(p => p.join(',')).join(' ')}
              fill='none'
              stroke='rgba(255, 255, 255, 0.1)'
              strokeWidth='1'
            />
          )
        })}

        {/* Radial lines */}
        {skillStats.map((_, i) => {
          const angle = (i * 2 * Math.PI) / skillStats.length - Math.PI / 2
          const x = center + maxRadius * Math.cos(angle)
          const y = center + maxRadius * Math.sin(angle)
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke='rgba(255, 255, 255, 0.1)'
              strokeWidth='1'
            />
          )
        })}

        {/* Skill value area */}
        <polygon
          points={valuePoints.map(p => p.join(',')).join(' ')}
          fill='url(#radarGradient)'
          stroke='rgba(124, 58, 237, 0.8)'
          strokeWidth='2'
          className='animate-pulse'
        />

        {/* Skill points */}
        {valuePoints.map((point, i) => (
          <circle
            key={i}
            cx={point[0]}
            cy={point[1]}
            r='4'
            fill='white'
            stroke='rgba(124, 58, 237, 1)'
            strokeWidth='2'
            className='drop-shadow-md'
          />
        ))}

        {/* Gradient definition */}
        <defs>
          <radialGradient id='radarGradient' cx='50%' cy='50%' r='50%'>
            <stop offset='0%' stopColor='rgba(168, 85, 247, 0.4)' />
            <stop offset='100%' stopColor='rgba(59, 130, 246, 0.1)' />
          </radialGradient>
        </defs>
      </svg>

      {/* Labels */}
      {skillStats.map((skill, i) => {
        const angle = (i * 2 * Math.PI) / skillStats.length - Math.PI / 2
        const labelRadius = maxRadius + 20
        const x = center + labelRadius * Math.cos(angle)
        const y = center + labelRadius * Math.sin(angle)

        return (
          <div
            key={i}
            className='absolute text-xs font-semibold text-white transform -translate-x-1/2 -translate-y-1/2'
            style={{
              left: x,
              top: y,
            }}
          >
            <div className='text-center'>
              <div>{skill.label}</div>
              <div className='text-xs text-zinc-400'>{skill.value}%</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function SkillsTools() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(0)

  const SKILLS_PER_PAGE = 12

  // Professional Lucide icon mapping
  const getSkillIcon = (skillName: string) => {
    const iconMap: { [key: string]: React.ComponentType } = {
      'React.js': Code2,
      'Vue.js': Code2,
      JavaScript: Code2,
      TypeScript: Code2,
      HTML: Monitor,
      CSS: Palette,
      Python: Terminal,
      'Node.js': Server,
      APIs: Network,
      'Web Applications': Globe,
      'Embedded Systems': Cpu,
      'Embedded C': CircuitBoard,
      Docker: Layers,
      Linux: Terminal,
      'Three.js': Gamepad2,
      WebGL: Zap,
      AWS: Cloud,
      'IoT Core': Wifi,
      Lambda: Zap,
      S3: Database,
      'Data Analysis': BarChart3,
      'Data Science': Microscope,
      'Machine Learning': Brain,
      'Computer Vision': Eye,
      'Neural Networks': Brain,
      SQL: Database,
      'Data Pipelines': GitBranch,
      'Image Processing': Eye,
      'Statistical Analysis': TrendingUp,
      ROS2: Cpu,
      MQTT: Radio,
      Telemetry: Signal,
      'Team Leadership': Crown,
      'Public Speaking': Mic,
      Communication: MessageCircle,
      'Creative Problem': Lightbulb,
      Collaborative: Handshake,
      'Detail Oriented': Search,
      'Cross-func Lead': Target,
      Coordination: Network,
      'Knowledge Mgmt': BookOpen,
      'Peer Tutoring': Users,
      Presentations: Monitor,
      'Project Mgmt': Clipboard,
      Agile: RotateCcw,
      Research: Microscope,
      'Tech Writing': FileText,
      'Tech Docs': FileCode,
      Notion: FileText,
      'Drone Piloting': Crosshair,
      Drones: Zap,
      'Robot Systems': Cpu,
      'OTA Updates': Smartphone,
      'Digital Art': Brush,
      'Music Production': Music,
      Creativity: Sparkles,
      TouchDesigner: Play,
      R3F: Code2,
      Kinect: Activity,
      MIDI: Music,
      Processing: Brush,
      Shaders: Sparkles,
      'Wireless Comms': Wifi,
      'Signal Processing': Waves,
      DSP: Signal,
    }
    return iconMap[skillName] || Code2
  }

  // Get all skills from all categories with Lucide icons
  const allSkills = skillCategories.flatMap(category =>
    category.skills.map(skill => ({
      ...skill,
      category: category.title,
      categoryId: category.id,
      IconComponent: getSkillIcon(skill.name),
    }))
  )

  // Filter skills based on active category and search query
  const filteredSkills = allSkills.filter(skill => {
    const matchesCategory =
      activeCategory === 'all' || skill.categoryId === activeCategory
    const matchesSearch = skill.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(0)
  }, [activeCategory, searchQuery])

  // Paginate skills
  const totalPages = Math.ceil(filteredSkills.length / SKILLS_PER_PAGE)
  const paginatedSkills = filteredSkills.slice(
    currentPage * SKILLS_PER_PAGE,
    (currentPage + 1) * SKILLS_PER_PAGE
  )

  const totalSkills = allSkills.length

  return (
    <PageSection
      id='skills'
      tagline='Skills'
      taglineColor='purple'
      title='Infrastructure, intelligence,'
      subtitle='and interactivity—wired together'
      className='bg-gradient-to-b from-zinc-900/60 to-zinc-900/90'
      cardVariant='floating'
    >
      <div className='w-full px-4'>
        {/* Search Bar - Full Width */}
        <motion.div
          className='mb-4'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className='relative w-full'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <svg
                className='h-4 w-4 text-zinc-400'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                />
              </svg>
            </div>
            <input
              type='text'
              placeholder='Search skills...'
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className='w-full pl-9 pr-4 py-2 bg-black/30 border border-white/20 rounded-lg text-white placeholder-zinc-400 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm text-sm'
            />
          </div>
        </motion.div>

        {/* All Skills Button - Top Left */}
        <motion.div
          className='mb-4 flex justify-start'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <motion.button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-2 rounded-md transition-all duration-300 text-xs flex items-center gap-2 whitespace-nowrap ${
              activeCategory === 'all'
                ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white'
                : 'bg-black/30 border border-white/20 text-zinc-300 hover:bg-white/10'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            🔍 All Skills ({totalSkills})
          </motion.button>
        </motion.div>

        {/* Main Content Layout */}
        <div className='flex gap-4'>
          {/* Category Sidebar */}
          <motion.div
            className='flex flex-col justify-between min-w-fit bg-black/20 backdrop-blur-md rounded-lg border border-white/20 p-3'
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ minHeight: '20rem' }}
          >
            {skillCategories.map(category => {
              const categorySkillCount = category.skills.length
              return (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-3 py-2 rounded-md transition-all duration-300 flex items-center gap-2 text-xs whitespace-nowrap ${
                    activeCategory === category.id
                      ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white'
                      : 'bg-black/30 border border-white/20 text-zinc-300 hover:bg-white/10'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <category.IconComponent size={16} />
                  <span>
                    {category.title} ({categorySkillCount})
                  </span>
                </motion.button>
              )
            })}
          </motion.div>

          {/* Skills Table and Radar Chart */}
          <div className='flex-1 flex gap-4' style={{ minHeight: '20rem' }}>
            {/* Skills Table */}
            <div className='flex-1'>
              <AnimatePresence mode='wait'>
                <motion.div
                  key={activeCategory + searchQuery}
                  className='bg-black/30 backdrop-blur-md rounded-lg border border-white/20 overflow-hidden'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  style={{ minHeight: '20rem' }}
                >
                  {/* Skills Grid */}
                  <div className='p-4 flex-1'>
                    <div className='grid grid-cols-3 gap-3 h-full'>
                      {paginatedSkills.map((skill, index) => (
                        <motion.div
                          key={skill.name}
                          className='bg-black/20 backdrop-blur-sm rounded-lg border border-white/10 p-3 hover:bg-white/5 hover:border-white/20 transition-all duration-200'
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            duration: 0.3,
                            delay: index * 0.02,
                          }}
                          whileHover={{ scale: 1.02 }}
                        >
                          {/* Header with icon and endorsement */}
                          <div className='flex items-center justify-between mb-2'>
                            <skill.IconComponent size={18} />
                            {skill.endorsements > 0 &&
                              getEndorsementBadge(skill.endorsements)}
                          </div>

                          {/* Skill Name */}
                          <h4 className='text-sm font-semibold text-white mb-2 leading-tight'>
                            {skill.name}
                          </h4>

                          {/* Rating and Category */}
                          <div className='flex items-center justify-between'>
                            <StarRating rating={skill.stars} />
                            <span className='text-xs text-zinc-400'>
                              {skill.category}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div className='flex justify-center items-center p-4 bg-black/10 border-t border-white/10'>
                      <div className='flex items-center gap-2'>
                        <button
                          onClick={() =>
                            setCurrentPage(Math.max(0, currentPage - 1))
                          }
                          disabled={currentPage === 0}
                          className={`w-6 h-6 rounded flex items-center justify-center transition-all ${
                            currentPage === 0
                              ? 'bg-black/20 text-zinc-600 cursor-not-allowed'
                              : 'bg-black/30 text-zinc-300 hover:bg-white/10'
                          }`}
                        >
                          <ChevronLeft size={14} />
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => (
                          <button
                            key={i}
                            onClick={() => setCurrentPage(i)}
                            className={`w-6 h-6 rounded text-xs transition-all ${
                              i === currentPage
                                ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white'
                                : 'bg-black/30 text-zinc-400 hover:bg-white/10'
                            }`}
                          >
                            {i + 1}
                          </button>
                        ))}

                        <button
                          onClick={() =>
                            setCurrentPage(
                              Math.min(totalPages - 1, currentPage + 1)
                            )
                          }
                          disabled={currentPage === totalPages - 1}
                          className={`w-6 h-6 rounded flex items-center justify-center transition-all ${
                            currentPage === totalPages - 1
                              ? 'bg-black/20 text-zinc-600 cursor-not-allowed'
                              : 'bg-black/30 text-zinc-300 hover:bg-white/10'
                          }`}
                        >
                          <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Skill Radar Chart - Right Side */}
            <motion.div
              className='w-72 bg-black/30 backdrop-blur-md rounded-lg border border-white/20 p-4 flex flex-col items-center justify-center'
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{ minHeight: '20rem' }}
            >
              <h3 className='text-sm font-bold text-white mb-3 text-center'>
                Skill Overview
              </h3>
              <div className='flex justify-center'>
                <AnimatePresence mode='wait'>
                  <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <SkillRadarChart activeCategory={activeCategory} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>

        {/* No Results Message */}
        {filteredSkills.length === 0 && (
          <motion.div
            className='text-center py-8'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className='text-4xl mb-2'>🔍</div>
            <h3 className='text-lg font-semibold text-white mb-1'>
              No skills found
            </h3>
            <p className='text-zinc-400 text-sm'>
              Try adjusting your search or selecting a different category
            </p>
          </motion.div>
        )}
      </div>

      {/* Background Elements */}
      <div className='absolute top-20 left-20 w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-20' />
      <div
        className='absolute top-40 right-32 w-1 h-1 bg-cyan-400 rounded-full animate-ping opacity-20'
        style={{ animationDelay: '1s' }}
      />
      <div
        className='absolute bottom-32 left-1/4 w-1 h-1 bg-teal-400 rounded-full animate-ping opacity-20'
        style={{ animationDelay: '2s' }}
      />
    </PageSection>
  )
}
