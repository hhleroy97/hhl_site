import { useEffect, useRef, useState, useCallback } from 'react'

interface UseAccessibilityOptions {
  announceToScreenReader?: boolean
  trapFocus?: boolean
  autoFocus?: boolean
  escapeKeyHandler?: () => void
}

export const useAccessibility = (options: UseAccessibilityOptions = {}) => {
  const {
    announceToScreenReader = false,
    trapFocus = false,
    autoFocus = false,
    escapeKeyHandler,
  } = options

  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLElement>(null)

  // Announce to screen reader
  const announce = useCallback(
    (message: string, priority: 'polite' | 'assertive' = 'polite') => {
      if (!announceToScreenReader) return

      const announcement = document.createElement('div')
      announcement.setAttribute('aria-live', priority)
      announcement.setAttribute('aria-atomic', 'true')
      announcement.className = 'sr-only'
      announcement.textContent = message

      document.body.appendChild(announcement)

      // Remove after announcement
      setTimeout(() => {
        document.body.removeChild(announcement)
      }, 1000)
    },
    [announceToScreenReader]
  )

  // Get focusable elements
  const getFocusableElements = useCallback(() => {
    if (!containerRef.current) return []

    const focusableSelectors = [
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'a[href]',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]',
    ]

    return Array.from(
      containerRef.current.querySelectorAll<HTMLElement>(
        focusableSelectors.join(', ')
      )
    ).filter(el => {
      const style = window.getComputedStyle(el)
      return style.display !== 'none' && style.visibility !== 'hidden'
    })
  }, [])

  // Focus trap
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!trapFocus || !containerRef.current) return

      const focusableElements = getFocusableElements()
      if (focusableElements.length === 0) return

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (event.key === 'Tab') {
        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault()
            lastElement.focus()
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault()
            firstElement.focus()
          }
        }
      }

      if (event.key === 'Escape' && escapeKeyHandler) {
        escapeKeyHandler()
      }
    },
    [trapFocus, getFocusableElements, escapeKeyHandler]
  )

  // Auto focus
  useEffect(() => {
    if (autoFocus && containerRef.current) {
      const focusableElements = getFocusableElements()
      if (focusableElements.length > 0) {
        focusableElements[0].focus()
      }
    }
  }, [autoFocus, getFocusableElements])

  // Keyboard event listener
  useEffect(() => {
    if (trapFocus) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [trapFocus, handleKeyDown])

  // Focus management
  const focusFirstElement = useCallback(() => {
    const focusableElements = getFocusableElements()
    if (focusableElements.length > 0) {
      focusableElements[0].focus()
    }
  }, [getFocusableElements])

  const focusLastElement = useCallback(() => {
    const focusableElements = getFocusableElements()
    if (focusableElements.length > 0) {
      focusableElements[focusableElements.length - 1].focus()
    }
  }, [getFocusableElements])

  // Visibility management
  const show = useCallback(() => {
    setIsVisible(true)
    if (autoFocus) {
      setTimeout(focusFirstElement, 100)
    }
  }, [autoFocus, focusFirstElement])

  const hide = useCallback(() => {
    setIsVisible(false)
  }, [])

  return {
    containerRef,
    isVisible,
    show,
    hide,
    announce,
    focusFirstElement,
    focusLastElement,
    getFocusableElements,
  }
}

// Hook for reduced motion preference
export const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return prefersReducedMotion
}

// Hook for high contrast preference
export const useHighContrast = () => {
  const [prefersHighContrast, setPrefersHighContrast] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-contrast: high)')
    setPrefersHighContrast(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersHighContrast(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return prefersHighContrast
}

// Hook for color scheme preference
export const useColorScheme = () => {
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('dark')

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setColorScheme(mediaQuery.matches ? 'dark' : 'light')

    const handleChange = (e: MediaQueryListEvent) => {
      setColorScheme(e.matches ? 'dark' : 'light')
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return colorScheme
}
