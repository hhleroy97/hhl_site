import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageSection from '../../ui/PageSection'
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
    id: 'cloud-data',
    title: 'Cloud & Data Engineering',
    IconComponent: Database,
    color: 'from-purple-400 to-cyan-500',
    skills: [
      { name: 'AWS IoT Core', endorsements: 0, stars: 3 },
      { name: 'AWS Lambda', endorsements: 0, stars: 3 },
      { name: 'AWS S3', endorsements: 0, stars: 3 },
      { name: 'Data Pipelines', endorsements: 0, stars: 3 },
      { name: 'SQL', endorsements: 0, stars: 3 },
      { name: 'PostgreSQL', endorsements: 0, stars: 3 },
      { name: 'Redis', endorsements: 0, stars: 3 },
      { name: 'Python', endorsements: 0, stars: 3 },
    ],
  },
  {
    id: 'software-systems',
    title: 'Software & Systems Development',
    IconComponent: Rocket,
    color: 'from-emerald-400 to-blue-500',
    skills: [
      { name: 'React.js', endorsements: 0, stars: 3 },
      { name: 'TypeScript', endorsements: 0, stars: 3 },
      { name: 'Node.js', endorsements: 0, stars: 3 },
      { name: 'APIs', endorsements: 0, stars: 3 },
      { name: 'Linux', endorsements: 0, stars: 3 },
      { name: 'Embedded C', endorsements: 0, stars: 3 },
      { name: 'Docker', endorsements: 0, stars: 3 },
      { name: 'Three.js / WebGL', endorsements: 0, stars: 3 },
    ],
  },
  {
    id: 'robotics-ai',
    title: 'Robotics & AI',
    IconComponent: Brain,
    color: 'from-teal-400 to-emerald-500',
    skills: [
      { name: 'ROS2', endorsements: 0, stars: 3 },
      { name: 'MQTT', endorsements: 0, stars: 3 },
      { name: 'Telemetry', endorsements: 0, stars: 3 },
      { name: 'OTA Updates', endorsements: 0, stars: 3 },
      { name: 'Computer Vision (OpenCV)', endorsements: 0, stars: 3 },
      { name: 'Neural Networks', endorsements: 0, stars: 3 },
      { name: 'TensorFlow', endorsements: 0, stars: 3 },
      { name: 'AI / Machine Learning', endorsements: 0, stars: 3 },
    ],
  },
  {
    id: 'product-project',
    title: 'Product & Project Management',
    IconComponent: Clipboard,
    color: 'from-blue-400 to-purple-500',
    skills: [
      { name: 'Agile', endorsements: 0, stars: 3 },
      { name: 'Scrum', endorsements: 0, stars: 3 },
      { name: 'Sprint Planning', endorsements: 0, stars: 3 },
      { name: 'Jira', endorsements: 0, stars: 3 },
      { name: 'Notion', endorsements: 0, stars: 3 },
      { name: 'Stakeholder Management', endorsements: 0, stars: 3 },
      { name: 'Team Coordination', endorsements: 0, stars: 3 },
      { name: 'Roadmapping', endorsements: 0, stars: 3 },
    ],
  },
  {
    id: 'creative-other',
    title: 'Creative Technology & Other',
    IconComponent: Sparkles,
    color: 'from-purple-400 to-cyan-500',
    skills: [
      { name: 'TouchDesigner', endorsements: 0, stars: 3 },
      { name: 'React Three Fiber (R3F)', endorsements: 0, stars: 3 },
      { name: 'Shaders', endorsements: 0, stars: 3 },
      { name: 'Blender', endorsements: 0, stars: 3 },
      { name: 'MIDI Systems', endorsements: 0, stars: 3 },
      {
        name: 'Adobe Suite (Photoshop, Illustrator)',
        endorsements: 0,
        stars: 3,
      },
      { name: 'Digital Art & Music Production', endorsements: 0, stars: 3 },
      {
        name: 'Drone Piloting (Part 107 Certified)',
        endorsements: 0,
        stars: 3,
      },
    ],
  },
]

export default function SkillsTools() {
  const [activeCategory, setActiveCategory] = useState('cloud-data')
  const activeAccent = 'from-purple-400 to-cyan-500'

  // Get technology-specific colors
  const getTechColor = (_IconComponent: React.ElementType) => '#ffffff'

  // Icon wrapper component to handle different prop formats and colors
  const IconWrapper = ({
    IconComponent,
    size,
    color,
  }: {
    IconComponent: React.ElementType
    size: number
    color?: string
  }) => {
    const iconColor = color || getTechColor(IconComponent)

    return (
      <div
        style={{ width: size, height: size }}
        className='flex items-center justify-center'
      >
        <IconComponent size={size} style={{ color: iconColor }} />
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
      'Three.js / WebGL': SiThreedotjs,

      // Backend Technologies
      Python: SiPython,
      'Node.js': SiNodedotjs,
      'Embedded C': SiC,

      // Infrastructure & DevOps
      Docker: SiDocker,
      Linux: SiLinux,
      AWS: SiAmazon,
      'AWS Lambda': SiAwslambda,
      Lambda: SiAwslambda,
      'AWS S3': SiAmazons3,
      S3: SiAmazons3,
      'AWS IoT Core': Wifi,

      // Data & Analytics
      SQL: SiMysql,
      'Machine Learning': Brain,
      TensorFlow: SiTensorflow,
      AI: Brain,
      'AI / Machine Learning': Brain,
      Cursor: Brain,
      'Claude Code': Brain,
      GitHub: SiGithub,
      'VS Code': VscVscode,
      'Computer Vision': Eye,
      'Computer Vision (OpenCV)': Eye,
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
      'MIDI Systems': SiMidi,
      TouchDesigner: Monitor,
      Kinect: Eye,
      Processing: SiProcessingfoundation,

      // Productivity & Management
      Notion: SiNotion,
      Jira: SiJira,
      Documentation: FileCode,
      'Project Mgmt': Clipboard,
      Roadmapping: Target,

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
      'React Three Fiber (R3F)': SiThreedotjs,
      Shaders: Sparkles,
      'Wireless Comms': Wifi,
      'Digital Signal Processing': Waves,
      'Adobe Suite (Photoshop, Illustrator)': Palette,
      'Digital Art & Music Production': Music,
      'Drone Piloting (Part 107 Certified)': Award,

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

  // Filter skills based on active category (preserve curated order)
  const filteredSkills = allSkills.filter(
    skill => skill.categoryId === activeCategory
  )

  // No mobile accordion state required

  // Animation delay: simple sequential for responsiveness
  const getAnimationDelay = (index: number) => index * 0.05

  // No counts needed

  return (
    <PageSection
      id='skills'
      tagline='Skills'
      taglineColor='purple'
      title='Infrastructure, intelligence,'
      subtitle='and interactivity—wired together'
      className='bg-gradient-to-b from-zinc-900/60 to-zinc-900/90'
      cardVariant='floating'
      flipMobileCorners={false}
    >
      <div className='w-full h-full px-2 sm:px-4 flex flex-col'>
        {/* No search bar */}

        {/* Bottom buttons are rendered after the grid */}

        {/* Skills Table */}
        <div className='w-[55%] h-[1000%] mx-auto'>
          <AnimatePresence mode='wait'>
            <div
              className={`rounded-lg p-4 bg-gradient-to-r ${activeAccent} bg-black/30 backdrop-blur-md overflow-hidden flex flex-col`}
              style={{ height: 'fit-content' }}
            >
              {filteredSkills.length === 0 ? (
                <div className='flex-1 flex items-center justify-center'>
                  <motion.div
                    className='text-center'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h3 className='text-lg font-semibold text-white mb-1'>
                      {'No skills found'}
                    </h3>
                    <p className='text-zinc-400 text-sm'>
                      {'Try selecting a different category'}
                    </p>
                  </motion.div>
                </div>
              ) : (
                <div className='grid grid-cols-2 md:grid-cols-4 gap-0 sm:gap-1 w-[100%] h-[100%] mx-auto'>
                  {filteredSkills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      className='bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-3 sm:p-4 hover:bg-white/15 hover:border-white/30 transition-all duration-200 flex flex-col items-center justify-center text-center aspect-square w-full'
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.3,
                        delay: getAnimationDelay(index),
                      }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className='mb-3 sm:mb-4'>
                        <IconWrapper
                          IconComponent={skill.IconComponent}
                          size={72}
                        />
                      </div>
                      <h4 className='text-xs sm:text-sm font-semibold text-white leading-tight'>
                        {skill.name}
                      </h4>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </AnimatePresence>
        </div>

        {/* Bottom category buttons: 3 on first row, 2 centered on second */}
        <div className='mt-4 space-y-2'>
          <div className='flex justify-center gap-2'>
            {skillCategories.slice(0, 3).map(category => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`${
                  activeCategory === category.id
                    ? 'bg-white/15 text-blue-400 border-white/30'
                    : 'bg-white/5 text-zinc-300 hover:bg-white/10 border-white/20'
                } border rounded-full px-3 py-2 text-xs sm:text-sm font-medium flex items-center gap-2 transition-all`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  fontFamily: 'Orbitron, sans-serif',
                  fontWeight: 'bold',
                }}
              >
                <IconWrapper
                  IconComponent={category.IconComponent}
                  size={14}
                  color={activeCategory === category.id ? '#60a5fa' : undefined}
                />
                <span>{category.title}</span>
              </motion.button>
            ))}
          </div>
          <div className='flex justify-center gap-2'>
            {skillCategories.slice(3).map(category => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`${
                  activeCategory === category.id
                    ? 'bg-white/15 text-blue-400 border-white/30'
                    : 'bg-white/5 text-zinc-300 hover:bg-white/10 border-white/20'
                } border rounded-full px-3 py-2 text-xs sm:text-sm font-medium flex items-center gap-2 transition-all`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  fontFamily: 'Orbitron, sans-serif',
                  fontWeight: 'bold',
                }}
              >
                <IconWrapper
                  IconComponent={category.IconComponent}
                  size={14}
                  color={activeCategory === category.id ? '#60a5fa' : undefined}
                />
                <span>{category.title}</span>
              </motion.button>
            ))}
          </div>
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
