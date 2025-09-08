import { useEffect, useRef } from 'react'

interface SectionData {
  id: string
  element: HTMLElement
  top: number
  bottom: number
}

export function useScrollTracker(
  sectionIds: string[],
  options?: {
    /** Offset from top of viewport to consider section active (default: 100px) */
    offset?: number
    /** Throttle scroll events in milliseconds (default: 100ms) */
    throttle?: number
    /** Only update hash on mobile (default: true) */
    mobileOnly?: boolean
  }
) {
  const throttleTimerRef = useRef<NodeJS.Timeout | null>(null)
  const lastHashRef = useRef<string>('')

  const { offset = 100, throttle = 100, mobileOnly = true } = options || {}

  useEffect(() => {
    const updateHash = (newHash: string) => {
      if (newHash !== lastHashRef.current) {
        lastHashRef.current = newHash
        // Update URL without triggering scroll
        history.replaceState(
          null,
          '',
          newHash ? `#${newHash}` : window.location.pathname
        )

        // Track with Google Analytics if available
        if (typeof window !== 'undefined' && 'gtag' in window) {
          ;(window as any).gtag('event', 'page_view', {
            page_title: document.title,
            page_location: window.location.href,
            section: newHash,
          })
        }
      }
    }

    const handleScroll = () => {
      // Clear existing throttle timer
      if (throttleTimerRef.current) {
        clearTimeout(throttleTimerRef.current)
      }

      // Throttle scroll events
      throttleTimerRef.current = setTimeout(() => {
        // Check if mobile only mode is enabled
        if (mobileOnly) {
          const isMobile = window.matchMedia('(max-width: 767px)').matches
          if (!isMobile) return
        }

        // Get all sections and their positions
        const sections: SectionData[] = sectionIds
          .map(id => {
            const element = document.getElementById(id)
            if (!element) return null

            const rect = element.getBoundingClientRect()
            return {
              id,
              element,
              top: rect.top,
              bottom: rect.bottom,
            }
          })
          .filter((section): section is SectionData => section !== null)

        if (sections.length === 0) return

        // Find the section currently in view
        const viewportHeight = window.innerHeight
        let activeSection: SectionData | null = null

        // Check which section is most prominent in the viewport
        for (const section of sections) {
          // Section is considered active if its top is within the offset from viewport top
          // or if it's currently filling most of the viewport
          const sectionVisible =
            section.bottom > offset && section.top < viewportHeight - offset

          if (sectionVisible) {
            // If section top is above the offset line, it's the active section
            if (section.top <= offset) {
              activeSection = section
            }
            // If no section is above the offset line, pick the first visible one
            else if (!activeSection) {
              activeSection = section
            }
          }
        }

        // Special case: if user is at very top of page, always show hero
        if (window.scrollY < 100) {
          activeSection = sections.find(s => s.id === 'hero') || sections[0]
        }

        // Update hash if we found an active section
        if (activeSection) {
          updateHash(activeSection.id)
        }
      }, throttle)
    }

    // Initial check
    handleScroll()

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (throttleTimerRef.current) {
        clearTimeout(throttleTimerRef.current)
      }
    }
  }, [sectionIds, offset, throttle, mobileOnly])
}
