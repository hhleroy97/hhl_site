export interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  imageUrl?: string
  demoUrl?: string
  githubUrl?: string
  featured: boolean
  category: 'technical' | 'creative' | 'leadership'
}

export interface Experience {
  id: string
  company: string
  role: string
  duration: string
  description: string[]
  technologies: string[]
  type: 'technical' | 'leadership'
}

export interface Skill {
  name: string
  level: number
  category: 'frontend' | 'backend' | 'tools' | 'design'
}

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export interface AnimationConfig {
  duration: number
  delay?: number
  easing?: string
}

export interface ThemeConfig {
  cyberpunk: boolean
  animations: boolean
  reducedMotion: boolean
}
