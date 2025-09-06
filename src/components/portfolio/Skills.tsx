import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageSection from '../ui/PageSection'
// Technology-specific icons from react-icons
import {
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
  SiNumpy,
  SiPytorch,
  SiJira,
  SiGithub,
} from 'react-icons/si'
import { MdFlightTakeoff } from 'react-icons/md'
import { VscVscode } from 'react-icons/vsc'
import {
  SiGit,
  SiGitlab,
  SiBitbucket,
  SiJest,
  SiReact,
  SiFigma,
  SiAdobexd,
  SiTrello,
  SiBlender,
  SiArduino,
  SiRaspberrypi,
} from 'react-icons/si'
// Fallback Lucide icons for skills without specific tech icons
import {
  Users,
  Target,
  Rocket,
  Globe,
  Cpu,
  Monitor,
  Terminal,
  GitBranch,
  Eye,
  Network,
  Wifi,
  Mic,
  MessageCircle,
  Lightbulb,
  Handshake,
  Search,
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
  ChevronLeft,
  ChevronRight,
  Gamepad2,
  Award,
  BarChart3,
  Calculator,
  Mail,
  Brain,
  AlertTriangle,
  Music,
  Zap,
  DollarSign,
  Presentation,
  Database,
  Code,
  Palette,
} from 'lucide-react'

const skillCategories = [
  {
    id: 'softwaredev',
    title: 'Software Development',
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
      { name: 'AWS', endorsements: 0, stars: 2.5 },
      { name: 'IoT Core', endorsements: 0, stars: 2.5 },
      { name: 'Lambda', endorsements: 0, stars: 2.5 },
      { name: 'S3', endorsements: 0, stars: 2.5 },
      { name: 'Data Analysis', endorsements: 0, stars: 3 },
      { name: 'Data Science', endorsements: 0, stars: 2.5 },
      { name: 'Machine Learning', endorsements: 1, stars: 2.5 },
      { name: 'TensorFlow', endorsements: 0, stars: 2 },
      { name: 'AI', endorsements: 0, stars: 2.5 },
      { name: 'Cursor', endorsements: 0, stars: 2.5 },
      { name: 'Claude Code', endorsements: 0, stars: 2.5 },
      { name: 'GitHub', endorsements: 0, stars: 3 },
      { name: 'VS Code', endorsements: 0, stars: 3 },
      { name: 'Computer Vision', endorsements: 0, stars: 2.5 },
      { name: 'OpenCV', endorsements: 0, stars: 2.5 },
      { name: 'Neural Networks', endorsements: 0, stars: 2.5 },
      { name: 'SQL', endorsements: 0, stars: 2.5 },
      { name: 'Data Pipelines', endorsements: 0, stars: 2 },
      { name: 'Image Processing', endorsements: 1, stars: 2.5 },
      { name: 'Statistical Analysis', endorsements: 0, stars: 2.5 },
      { name: 'ROS2', endorsements: 0, stars: 3 },
      { name: 'MQTT', endorsements: 0, stars: 2.5 },
      { name: 'Telemetry', endorsements: 0, stars: 2.5 },
      { name: 'OTA Updates', endorsements: 0, stars: 2.5 },
      { name: 'Robotic Systems', endorsements: 0, stars: 3 },
      { name: 'Documentation', endorsements: 0, stars: 2.5 },
      { name: 'R&D', endorsements: 0, stars: 3 },
      { name: 'Wireless Comms', endorsements: 0, stars: 2.5 },
      { name: 'Digital Signal Processing', endorsements: 1, stars: 2.5 },
      { name: 'Beautiful Soup', endorsements: 0, stars: 2 },
      { name: 'Selenium', endorsements: 0, stars: 2 },
      { name: 'Git', endorsements: 0, stars: 3 },
      { name: 'GitLab', endorsements: 0, stars: 2.5 },
      { name: 'Bitbucket', endorsements: 0, stars: 2.5 },
      { name: 'Jest', endorsements: 0, stars: 2 },
      { name: 'Unit Testing', endorsements: 0, stars: 2.5 },
      { name: 'Integration Testing', endorsements: 0, stars: 2 },
      { name: 'MongoDB', endorsements: 0, stars: 2 },
      { name: 'PostgreSQL', endorsements: 0, stars: 2 },
      { name: 'Redis', endorsements: 0, stars: 2 },
      { name: 'Firebase', endorsements: 0, stars: 2 },
      { name: 'Express.js', endorsements: 0, stars: 2.5 },
      { name: 'Django', endorsements: 0, stars: 2 },
      { name: 'Flask', endorsements: 0, stars: 2 },
      { name: 'FastAPI', endorsements: 0, stars: 2 },
      { name: 'React Native', endorsements: 0, stars: 2 },
      { name: 'Figma', endorsements: 0, stars: 2.5 },
      { name: 'Adobe XD', endorsements: 0, stars: 2 },
    ],
  },
  {
    id: 'projectmgmt',
    title: 'Project Mgmt',
    IconComponent: Target,
    color: 'from-emerald-400 to-blue-500',
    skills: [
      { name: 'Agile', endorsements: 0, stars: 2.5 },
      { name: 'Notion', endorsements: 0, stars: 2 },
      { name: 'Jira', endorsements: 0, stars: 2.5 },
      { name: 'Sprint Planning', endorsements: 0, stars: 2.5 },
      { name: 'Scrum', endorsements: 0, stars: 2.5 },
      { name: 'Team Coordination', endorsements: 0, stars: 2.5 },
      { name: 'Kanban', endorsements: 0, stars: 2.5 },
      { name: 'Lean', endorsements: 0, stars: 2 },
      { name: 'Waterfall', endorsements: 0, stars: 2 },
      { name: 'Hybrid', endorsements: 0, stars: 2 },
      { name: 'Trello', endorsements: 0, stars: 2.5 },
      { name: 'Risk Management', endorsements: 0, stars: 2.5 },
      { name: 'Resource Planning', endorsements: 0, stars: 2.5 },
      { name: 'Budget Management', endorsements: 0, stars: 2 },
      { name: 'Stakeholder Management', endorsements: 0, stars: 2.5 },
      { name: 'Client Relations', endorsements: 0, stars: 2.5 },
      { name: 'Vendor Management', endorsements: 0, stars: 2 },
      { name: 'Technical Writing', endorsements: 0, stars: 2.5 },
      { name: 'Process Documentation', endorsements: 0, stars: 2.5 },
      { name: 'SOPs', endorsements: 0, stars: 2 },
      { name: 'Project Metrics', endorsements: 0, stars: 2 },
      { name: 'KPI Tracking', endorsements: 0, stars: 2 },
      { name: 'Performance Analysis', endorsements: 0, stars: 2 },
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
      { name: 'Cross-functional Communication', endorsements: 1, stars: 3 },
      { name: 'Creative Problem Solving', endorsements: 1, stars: 3 },
      { name: 'Team Collaboration', endorsements: 2, stars: 3 },
      { name: 'Attention to Detail', endorsements: 3, stars: 3 },
      { name: 'Knowledge Mgmt', endorsements: 0, stars: 2.5 },
      { name: 'Peer Tutoring', endorsements: 1, stars: 2.5 },
      { name: 'Presentations', endorsements: 0, stars: 2.5 },
      { name: 'Academic Writing', endorsements: 0, stars: 2.5 },
      { name: 'Excel', endorsements: 0, stars: 2.5 },
      { name: 'PowerPoint', endorsements: 0, stars: 2.5 },
      { name: 'Word', endorsements: 0, stars: 2.5 },
      { name: 'Google Sheets', endorsements: 0, stars: 2.5 },
      { name: 'Google Slides', endorsements: 0, stars: 2.5 },
      { name: 'Strategic Thinking', endorsements: 0, stars: 2.5 },
      { name: 'Root Cause Analysis', endorsements: 0, stars: 2.5 },
      { name: 'Design Thinking', endorsements: 0, stars: 2 },
      { name: 'Innovation', endorsements: 0, stars: 2.5 },
      { name: 'Change Management', endorsements: 0, stars: 2 },
      { name: 'Learning Agility', endorsements: 0, stars: 2.5 },
      { name: 'Resilience', endorsements: 0, stars: 2.5 },
    ],
  },
  {
    id: 'creative',
    title: 'Other',
    IconComponent: Sparkles,
    color: 'from-blue-400 to-purple-500',
    skills: [
      { name: 'Digital Art', endorsements: 0, stars: 2 },
      { name: 'Music Production', endorsements: 1, stars: 2.5 },
      { name: 'TouchDesigner', endorsements: 0, stars: 2.5 },
      { name: 'R3F', endorsements: 0, stars: 2 },
      { name: 'Kinect', endorsements: 0, stars: 2 },
      { name: 'MIDI', endorsements: 0, stars: 2.5 },
      { name: 'Processing', endorsements: 0, stars: 2 },
      { name: 'Shaders', endorsements: 0, stars: 2 },
      { name: 'Drone Piloting', endorsements: 0, stars: 2.5 },
      { name: 'Drones', endorsements: 0, stars: 2.5 },
      { name: 'Part 107 License', endorsements: 0, stars: 3 },
      { name: 'Blender', endorsements: 0, stars: 2 },
      { name: 'Adobe Photoshop', endorsements: 0, stars: 2 },
      { name: 'Adobe Illustrator', endorsements: 0, stars: 2 },
      { name: 'Photo Editing', endorsements: 0, stars: 2.5 },
      { name: 'FL Studio', endorsements: 0, stars: 2 },
      { name: 'Ableton Live', endorsements: 0, stars: 2 },
      { name: 'Sound Design', endorsements: 0, stars: 2.5 },
      { name: 'Composition', endorsements: 0, stars: 2.5 },
      { name: 'Arduino', endorsements: 0, stars: 2.5 },
      { name: 'Raspberry Pi', endorsements: 0, stars: 2.5 },
      { name: 'Component Selection', endorsements: 0, stars: 2.5 },
    ],
  },
]

export default function SkillsTools() {
  const [activeCategory, setActiveCategory] = useState('softwaredev')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(0)

  const SKILLS_PER_PAGE = 24

  // Get technology-specific colors
  const getTechColor = (IconComponent: React.ComponentType) => {
    const iconName = IconComponent.name

    // Technology-specific brand colors
    const colorMap: { [key: string]: string } = {
      SiReact: '#ffffff', // React white
      SiVuedotjs: '#ffffff', // Vue white
      SiJavascript: '#ffffff', // JavaScript white
      SiTypescript: '#ffffff', // TypeScript white
      SiHtml5: '#ffffff', // HTML5 white
      SiCss3: '#ffffff', // CSS3 white
      SiPython: '#ffffff', // Python white
      SiNodedotjs: '#ffffff', // Node.js white
      SiDocker: '#ffffff', // Docker white
      SiLinux: '#ffffff', // Linux white
      SiAmazon: '#ffffff', // AWS white
      SiTensorflow: '#ffffff', // TensorFlow white
      SiOpencv: '#ffffff', // OpenCV white
      SiPytorch: '#ffffff', // PyTorch white
      SiMysql: '#ffffff', // MySQL white
      SiMqtt: '#ffffff', // MQTT white
      SiRos: '#ffffff', // ROS2 white
      SiNotion: '#ffffff', // Notion white
      SiC: '#ffffff', // C language white
      SiThreedotjs: '#ffffff', // Three.js white

      // New specific icon colors
      SiGit: '#ffffff', // Git white
      SiGitlab: '#ffffff', // GitLab white
      SiBitbucket: '#ffffff', // Bitbucket white
      SiJest: '#ffffff', // Jest white
      SiFigma: '#ffffff', // Figma white
      SiAdobexd: '#ffffff', // Adobe XD white
      SiTrello: '#ffffff', // Trello white
      SiBlender: '#ffffff', // Blender white
      SiArduino: '#ffffff', // Arduino white
      SiRaspberrypi: '#ffffff', // Raspberry Pi white
      SiSelenium: '#ffffff', // Selenium white
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
      'Machine Learning': Brain,
      TensorFlow: SiTensorflow,
      AI: Brain,
      Cursor: Brain,
      'Claude Code': Brain,
      GitHub: SiGithub,
      'VS Code': VscVscode,
      'Computer Vision': Eye,
      OpenCV: SiOpencv,
      'Neural Networks': SiPytorch,
      'Data Science': BarChart3,
      'Data Analysis': Calculator,
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
      Jira: SiJira,
      Documentation: FileCode,
      'Project Mgmt': Clipboard,

      // Fallback Lucide icons for skills without specific tech icons
      APIs: Network,
      'Web Applications': Globe,
      'Embedded Systems': Cpu,
      'IoT Core': Wifi,
      'Data Pipelines': GitBranch,
      'Image Processing': Eye,
      Telemetry: Mail,
      'Team Leadership': Users,
      'Public Speaking': Mic,
      Communication: MessageCircle,
      'Creative Problem Solving': Lightbulb,
      'Team Collaboration': Handshake,
      'Attention to Detail': Search,
      'Cross-functional Communication': MessageCircle,
      'Team Coordination': Network,
      'Knowledge Mgmt': FileText,
      'Peer Tutoring': BookOpen,
      Presentations: Presentation,
      Agile: RotateCcw,
      'Sprint Planning': Target,
      Scrum: Users,
      'R&D': Microscope,
      'Academic Writing': FileText,
      'Drone Piloting': Gamepad2,
      Drones: MdFlightTakeoff,
      'Part 107 License': Award,
      'Robotic Systems': Cpu,
      'OTA Updates': Smartphone,
      'Digital Art': Brush,
      R3F: SiThreedotjs,
      Shaders: Sparkles,
      'Wireless Comms': Wifi,
      'Digital Signal Processing': Waves,

      // New Software Development Skills
      'Beautiful Soup': Brain,
      Selenium: Brain,
      Git: SiGit,
      GitLab: SiGitlab,
      Bitbucket: SiBitbucket,
      Jest: SiJest,
      'Unit Testing': Brain,
      'Integration Testing': Brain,
      MongoDB: Database,
      PostgreSQL: Database,
      Redis: Database,
      Firebase: Database,
      'Express.js': Code,
      Django: Code,
      Flask: Code,
      FastAPI: Code,
      'React Native': Smartphone,
      Figma: SiFigma,
      'Adobe XD': SiAdobexd,

      // New Project Management Skills
      Kanban: RotateCcw,
      Lean: Zap,
      Waterfall: Waves,
      Hybrid: RotateCcw,
      Trello: SiTrello,
      'Risk Management': AlertTriangle,
      'Resource Planning': Users,
      'Budget Management': DollarSign,
      'Stakeholder Management': Users,
      'Client Relations': Handshake,
      'Vendor Management': Users,
      'Technical Writing': FileText,
      'Process Documentation': FileText,
      SOPs: FileText,
      'Project Metrics': BarChart3,
      'KPI Tracking': Target,
      'Performance Analysis': BarChart3,

      // New Soft Skills
      Excel: Calculator,
      PowerPoint: Monitor,
      Word: FileText,
      'Google Sheets': Calculator,
      'Google Slides': Monitor,
      'Strategic Thinking': Brain,
      'Root Cause Analysis': Search,
      'Design Thinking': Lightbulb,
      Innovation: Sparkles,
      'Change Management': RotateCcw,
      'Learning Agility': Brain,
      Resilience: Zap,

      // New Creative Skills
      Blender: SiBlender,
      'Adobe Photoshop': Palette,
      'Adobe Illustrator': Palette,
      'Photo Editing': Eye,
      'FL Studio': Music,
      'Ableton Live': Music,
      'Sound Design': Music,
      Composition: Music,
      Arduino: SiArduino,
      'Raspberry Pi': SiRaspberrypi,
      'Component Selection': Search,
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
  const filteredSkills = allSkills
    .filter(skill => {
      const matchesCategory =
        activeCategory === 'all' || skill.categoryId === activeCategory
      const matchesSearch = skill.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
    .sort((a, b) => a.name.localeCompare(b.name))

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

  // Get animation delay - diagonal fan-out for full pages, sequential for partial pages
  const getAnimationDelay = (index: number) => {
    if (paginatedSkills.length >= 24) {
      // Full page: diagonal fan-out effect
      const row = Math.floor(index / 8)
      const col = index % 8
      const diagonalDistance = row + col
      return diagonalDistance * 0.1
    } else {
      // Partial page: sequential left-to-right like reading
      return index * 0.05
    }
  }

  // Get filtered counts for each category based on current search
  const getFilteredCountForCategory = (categoryId: string) => {
    return allSkills.filter(skill => {
      const matchesCategory =
        categoryId === 'all' || skill.categoryId === categoryId
      const matchesSearch = skill.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    }).length
  }

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
          className='mb-4 flex justify-center'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Search Bar */}
          <div className='relative max-w-md w-full'>
            <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
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
              onChange={e => {
                const query = e.target.value
                setSearchQuery(query)
                // Switch to "All Skills" when user starts searching
                if (query.length > 0 && activeCategory !== 'all') {
                  setActiveCategory('all')
                }
              }}
              className='w-full pl-10 pr-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-zinc-400 focus:border-cyan-400 focus:bg-white/15 hover:bg-white/15 transition-all duration-300 text-sm focus:outline-none'
            />
          </div>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          className='flex gap-1'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* All Skills Tab */}
          <motion.button
            onClick={() => setActiveCategory('all')}
            className={`flex-1 px-4 py-3 transition-all duration-300 text-sm font-medium flex items-center justify-center gap-2 whitespace-nowrap ${
              activeCategory === 'all'
                ? 'bg-black/30 text-white rounded-t-lg backdrop-blur-md border border-white/20 border-b-0'
                : 'bg-white/5 text-zinc-300 hover:bg-white/10 rounded-t-lg border border-white/10 border-b-0 hover:border-white/20'
            }`}
            style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 'bold' }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            All Skills{' '}
            <span className='text-blue-400 font-normal'>
              ({getFilteredCountForCategory('all')})
            </span>
          </motion.button>

          {skillCategories.map(category => {
            const categorySkillCount = getFilteredCountForCategory(category.id)
            return (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex-1 px-4 py-3 transition-all duration-300 flex items-center justify-center gap-2 text-sm font-medium whitespace-nowrap ${
                  activeCategory === category.id
                    ? 'bg-black/30 text-white rounded-t-lg backdrop-blur-md border border-white/20 border-b-0'
                    : 'bg-white/5 text-zinc-300 hover:bg-white/10 rounded-t-lg border border-white/10 border-b-0 hover:border-white/20'
                }`}
                style={{
                  fontFamily: 'Orbitron, sans-serif',
                  fontWeight: 'bold',
                }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <IconWrapper IconComponent={category.IconComponent} size={16} />
                <span>
                  {category.title}{' '}
                  <span className='text-blue-400 font-normal'>
                    ({categorySkillCount})
                  </span>
                </span>
              </motion.button>
            )
          })}
        </motion.div>

        {/* Skills Table */}
        <div className='w-full'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={activeCategory + searchQuery}
              className='bg-black/30 backdrop-blur-md rounded-b-lg rounded-tr-lg border-b border-l border-r border-white/20 overflow-hidden flex flex-col'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              style={{ height: 'fit-content' }}
            >
              {/* Skills Grid */}
              <div className='p-4 flex-1 flex flex-col'>
                {filteredSkills.length === 0 ? (
                  <div className='flex-1 flex items-center justify-center'>
                    <motion.div
                      className='text-center'
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      <h3 className='text-lg font-semibold text-white mb-1'>
                        {searchQuery ? 'Skill not found :/' : 'No skills found'}
                      </h3>
                      <p className='text-zinc-400 text-sm'>
                        {searchQuery
                          ? ''
                          : 'Try selecting a different category'}
                      </p>
                    </motion.div>
                  </div>
                ) : (
                  <div
                    className='grid grid-cols-8 grid-rows-3 gap-3'
                    style={{ height: 'fit-content' }}
                  >
                    {Array.from({ length: 24 }, (_, index) => {
                      const skill = paginatedSkills[index]

                      if (skill) {
                        return (
                          <motion.div
                            key={skill.name}
                            className='bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-3 hover:bg-white/15 hover:border-white/30 transition-all duration-200 flex flex-col items-center justify-center text-center h-full'
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                              duration: 0.3,
                              delay: getAnimationDelay(index),
                            }}
                            whileHover={{ scale: 1.02 }}
                          >
                            {/* Centered icon */}
                            <div className='mb-3'>
                              <IconWrapper
                                IconComponent={skill.IconComponent}
                                size={36}
                              />
                            </div>

                            {/* Centered skill name */}
                            <h4 className='text-sm font-semibold text-white leading-tight'>
                              {skill.name}
                            </h4>
                          </motion.div>
                        )
                      } else {
                        // Empty placeholder slot
                        return (
                          <div
                            key={`empty-${index}`}
                            className='bg-transparent rounded-lg h-full'
                          />
                        )
                      }
                    })}
                  </div>
                )}
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
