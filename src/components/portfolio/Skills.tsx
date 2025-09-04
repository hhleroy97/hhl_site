import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageSection from '../ui/PageSection'
// Technology-specific icons from react-icons
import {
  SiReact,
  SiVuedotjs,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss3,
  SiPython,
  SiNodedotjs,
  SiDocker,
  SiLinux,
  SiThreedotjs,
  SiWebgl,
  SiAmazon,
  SiAmazons3,
  SiAwslambda,
  SiMqtt,
  SiRos,
  SiMysql,
  SiTensorflow,
  SiOpencv,
  SiNotion,
  SiProcessingfoundation,
  SiMidi,
  SiC,
  SiJupyter,
  SiPandas,
  SiNumpy,
  SiPytorch,
} from 'react-icons/si'
// Fallback Lucide icons for skills without specific tech icons
import {
  Users,
  Target,
  Palette,
  Rocket,
  Globe,
  Cpu,
  Monitor,
  Terminal,
  GitBranch,
  Zap,
  Eye,
  Network,
  Wifi,
  Crown,
  Mic,
  MessageCircle,
  Lightbulb,
  Handshake,
  Search,
  Crosshair,
  BookOpen,
  FileText,
  Clipboard,
  RotateCcw,
  Microscope,
  FileCode,
  Smartphone,
  Brush,
  Sparkles,
  Waves,
  Signal,
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

export default function SkillsTools() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(0)

  const SKILLS_PER_PAGE = 12

  // Get technology-specific colors
  const getTechColor = (IconComponent: React.ComponentType) => {
    const iconName = IconComponent.name

    // Technology-specific brand colors
    const colorMap: { [key: string]: string } = {
      SiReact: '#61DAFB', // React cyan
      SiVuedotjs: '#4FC08D', // Vue green
      SiJavascript: '#F7DF1E', // JavaScript yellow
      SiTypescript: '#3178C6', // TypeScript blue
      SiHtml5: '#E34F26', // HTML5 orange
      SiCss3: '#1572B6', // CSS3 blue
      SiPython: '#3776AB', // Python blue
      SiNodedotjs: '#339933', // Node.js green
      SiDocker: '#2496ED', // Docker blue
      SiLinux: '#FCC624', // Linux yellow
      SiAmazon: '#FF9900', // AWS orange
      SiTensorflow: '#FF6F00', // TensorFlow orange
      SiOpencv: '#5C3EE8', // OpenCV purple
      SiPytorch: '#EE4C2C', // PyTorch red
      SiMysql: '#4479A1', // MySQL blue
      SiMqtt: '#660066', // MQTT purple
      SiRos: '#22314E', // ROS dark blue
      SiNotion: '#000000', // Notion black
      SiC: '#A8B9CC', // C language gray-blue
      SiThreedotjs: '#000000', // Three.js black
    }

    return colorMap[iconName] || '#ffffff' // Default to white for unmatched icons
  }

  // Icon wrapper component to handle different prop formats and colors
  const IconWrapper = ({
    IconComponent,
    size,
  }: {
    IconComponent: React.ComponentType<any>
    size: number
  }) => {
    const color = getTechColor(IconComponent)

    return (
      <div
        style={{ width: size, height: size }}
        className='flex items-center justify-center'
      >
        <IconComponent size={size} style={{ color }} />
      </div>
    )
  }

  // Professional technology-specific icon mapping
  const getSkillIcon = (skillName: string) => {
    const iconMap: { [key: string]: React.ComponentType } = {
      // Frontend Technologies
      'React.js': SiReact,
      'Vue.js': SiVuedotjs,
      JavaScript: SiJavascript,
      TypeScript: SiTypescript,
      HTML: SiHtml5,
      CSS: SiCss3,
      'Three.js': SiThreedotjs,
      WebGL: SiWebgl,

      // Backend Technologies
      Python: SiPython,
      'Node.js': SiNodedotjs,
      'Embedded C': SiC,

      // Infrastructure & DevOps
      Docker: SiDocker,
      Linux: SiLinux,
      AWS: SiAmazon,
      Lambda: SiAwslambda,
      S3: SiAmazons3,

      // Data & Analytics
      SQL: SiMysql,
      'Machine Learning': SiTensorflow,
      'Computer Vision': SiOpencv,
      'Neural Networks': SiPytorch,
      'Data Science': SiJupyter,
      'Data Analysis': SiPandas,
      'Statistical Analysis': SiNumpy,

      // Communication & IoT
      MQTT: SiMqtt,
      ROS2: SiRos,

      // Creative & Multimedia
      'Music Production': Brush,
      MIDI: SiMidi,
      TouchDesigner: Monitor,
      Kinect: Eye,
      Processing: SiProcessingfoundation,

      // Productivity & Management
      Notion: SiNotion,
      'Tech Docs': FileCode,
      'Project Mgmt': Clipboard,

      // Fallback Lucide icons for skills without specific tech icons
      APIs: Network,
      'Web Applications': Globe,
      'Embedded Systems': Cpu,
      'IoT Core': Wifi,
      'Data Pipelines': GitBranch,
      'Image Processing': Eye,
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
      Agile: RotateCcw,
      Research: Microscope,
      'Tech Writing': FileText,
      'Drone Piloting': Crosshair,
      Drones: Zap,
      'Robot Systems': Cpu,
      'OTA Updates': Smartphone,
      'Digital Art': Brush,
      Creativity: Sparkles,
      R3F: SiThreedotjs,
      Shaders: Sparkles,
      'Wireless Comms': Wifi,
      'Signal Processing': Waves,
      DSP: Signal,
    }
    return iconMap[skillName] || Terminal
  }

  // Get all skills from all categories with technology-specific icons
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
        {/* Top Bar - Search Only */}
        <motion.div
          className='mb-4'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Search Bar */}
          <div className='relative'>
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

        {/* Main Content Layout */}
        <div className='flex gap-4 items-stretch'>
          {/* Category Sidebar */}
          <motion.div
            className='flex flex-col gap-2 min-w-fit bg-black/20 backdrop-blur-md rounded-lg border border-white/20 p-3'
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* All Skills Button */}
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
                  <IconWrapper
                    IconComponent={category.IconComponent}
                    size={16}
                  />
                  <span>
                    {category.title} ({categorySkillCount})
                  </span>
                </motion.button>
              )
            })}
          </motion.div>

          {/* Skills Table */}
          <div className='flex-1'>
            <AnimatePresence mode='wait'>
              <motion.div
                key={activeCategory + searchQuery}
                className='bg-black/30 backdrop-blur-md rounded-lg border border-white/20 overflow-hidden flex flex-col'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                style={{ minHeight: '30rem' }}
              >
                {/* Skills Grid */}
                <div className='p-4 flex-1'>
                  <div className='grid grid-cols-4 gap-3 h-full'>
                    {paginatedSkills.map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        className='bg-black/20 backdrop-blur-sm rounded-lg border border-white/10 p-3 hover:bg-white/5 hover:border-white/20 transition-all duration-200 flex flex-col items-center justify-center text-center'
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.3,
                          delay: index * 0.02,
                        }}
                        whileHover={{ scale: 1.02 }}
                      >
                        {/* Centered icon */}
                        <div className='mb-3'>
                          <IconWrapper
                            IconComponent={skill.IconComponent}
                            size={24}
                          />
                        </div>

                        {/* Centered skill name */}
                        <h4 className='text-sm font-semibold text-white leading-tight'>
                          {skill.name}
                        </h4>
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
