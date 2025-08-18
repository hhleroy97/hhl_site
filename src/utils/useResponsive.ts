import { useState, useEffect } from 'react'

interface BreakpointConfig {
  xs: number
  sm: number
  md: number
  lg: number
  xl: number
  '2xl': number
}

const breakpoints: BreakpointConfig = {
  xs: 475,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

type BreakpointKey = keyof BreakpointConfig

interface ResponsiveState {
  width: number
  height: number
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isXs: boolean
  isSm: boolean
  isMd: boolean
  isLg: boolean
  isXl: boolean
  is2xl: boolean
  breakpoint: BreakpointKey
}

export const useResponsive = (): ResponsiveState => {
  const [state, setState] = useState<ResponsiveState>(() => {
    // Default state for SSR
    const defaultWidth =
      typeof window !== 'undefined' ? window.innerWidth : 1024
    const defaultHeight =
      typeof window !== 'undefined' ? window.innerHeight : 768

    return {
      width: defaultWidth,
      height: defaultHeight,
      isMobile: defaultWidth < breakpoints.md,
      isTablet: defaultWidth >= breakpoints.md && defaultWidth < breakpoints.lg,
      isDesktop: defaultWidth >= breakpoints.lg,
      isXs: defaultWidth >= breakpoints.xs,
      isSm: defaultWidth >= breakpoints.sm,
      isMd: defaultWidth >= breakpoints.md,
      isLg: defaultWidth >= breakpoints.lg,
      isXl: defaultWidth >= breakpoints.xl,
      is2xl: defaultWidth >= breakpoints['2xl'],
      breakpoint: getBreakpoint(defaultWidth),
    }
  })

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      setState({
        width,
        height,
        isMobile: width < breakpoints.md,
        isTablet: width >= breakpoints.md && width < breakpoints.lg,
        isDesktop: width >= breakpoints.lg,
        isXs: width >= breakpoints.xs,
        isSm: width >= breakpoints.sm,
        isMd: width >= breakpoints.md,
        isLg: width >= breakpoints.lg,
        isXl: width >= breakpoints.xl,
        is2xl: width >= breakpoints['2xl'],
        breakpoint: getBreakpoint(width),
      })
    }

    // Set initial state
    handleResize()

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return state
}

function getBreakpoint(width: number): BreakpointKey {
  if (width >= breakpoints['2xl']) return '2xl'
  if (width >= breakpoints.xl) return 'xl'
  if (width >= breakpoints.lg) return 'lg'
  if (width >= breakpoints.md) return 'md'
  if (width >= breakpoints.sm) return 'sm'
  if (width >= breakpoints.xs) return 'xs'
  return 'xs'
}

// Utility hook for checking specific breakpoints
export const useBreakpoint = (breakpoint: BreakpointKey): boolean => {
  const { width } = useResponsive()
  return width >= breakpoints[breakpoint]
}

// Utility hook for media queries
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia(query)
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    setMatches(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleChange)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [query])

  return matches
}

// Utility for responsive values
export const useResponsiveValue = <T>(values: {
  xs?: T
  sm?: T
  md?: T
  lg?: T
  xl?: T
  '2xl'?: T
}): T | undefined => {
  const { breakpoint } = useResponsive()

  // Return the value for the current breakpoint or the closest smaller one
  const breakpointOrder: BreakpointKey[] = ['2xl', 'xl', 'lg', 'md', 'sm', 'xs']
  const currentIndex = breakpointOrder.indexOf(breakpoint)

  for (let i = currentIndex; i < breakpointOrder.length; i++) {
    const key = breakpointOrder[i]
    if (values[key] !== undefined) {
      return values[key]
    }
  }

  return undefined
}
