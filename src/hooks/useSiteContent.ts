import { useState, useEffect } from 'react'
import siteContent from '../content/site.json'

export interface SiteContent {
  meta: {
    title: string
    description: string
    keywords: string[]
    author: string
    resumeFile: string
  }
  navigation: {
    logo: string
    links: Array<{ label: string; href: string }>
    cta: {
      label: string
      href: string
      external: boolean
    }
  }
  hero: {
    headline: string
    subhead: string
    primaryCta: string
    secondaryCta: string
    metrics: Array<{
      key: string
      title: string
      blurb: string
      skill: string
    }>
  }
  highlights: Array<{
    title: string
    how: string
    proof: string[]
    skill: string
  }>
  about: {
    positioning: string
    bestAt: string[]
    avoid: string[]
    bio: string[]
    quote: string
  }
  skills: {
    Ship: Array<{ name: string; evidence: string }>
    Scale: Array<{ name: string; evidence: string }>
    Serve: Array<{ name: string; evidence: string }>
  }
  process: Array<{
    step: string
    outcome: string
    derisk: string
  }>
  testimonials: Array<{
    quote: string
    author: string
    link: string
  }>
  contact: {
    hook: string
    sub: string
    form: {
      name: string
      email: string
      subject: string
      message: string
      submit: string
      sending: string
      success: string
    }
    social: Array<{
      name: string
      url: string
      icon: string
    }>
    info: {
      email: string
      location: string
    }
  }
  footer: {
    copyright: string
    links: Array<{ label: string; href: string }>
  }
}

export function useSiteContent() {
  const [content, setContent] = useState<SiteContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      // In a real app, this would be an API call
      // For now, we're using the imported JSON
      setContent(siteContent as SiteContent)
      setLoading(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load content')
      setLoading(false)
    }
  }, [])

  return { content, loading, error }
}

// Helper functions for specific content sections
export function useHeroContent() {
  const { content, loading, error } = useSiteContent()
  return {
    hero: content?.hero,
    loading,
    error,
  }
}



export function useAboutContent() {
  const { content, loading, error } = useSiteContent()
  return {
    about: content?.about,
    loading,
    error,
  }
}

export function useContactContent() {
  const { content, loading, error } = useSiteContent()
  return {
    contact: content?.contact,
    loading,
    error,
  }
}

export function useNavigationContent() {
  const { content, loading, error } = useSiteContent()
  return {
    navigation: content?.navigation,
    loading,
    error,
  }
}

// Resume file detection helper
export function getResumePath(): string {
  const { content } = useSiteContent()
  if (!content) return '/docs/Hartley_LeRoy_Resume_Aug25.docx.pdf'
  
  return `/docs/${content.meta.resumeFile}`
} 