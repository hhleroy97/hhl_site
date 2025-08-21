import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'
import { env } from '../utils/env'

interface GitHubUser {
  id: number
  login: string
  name: string | null
  avatar_url: string
  email: string | null
}

interface GitHubAuthContextType {
  user: GitHubUser | null
  isLoading: boolean
  isAuthenticated: boolean
  loginUrl: string
  logout: () => void
}

const GitHubAuthContext = createContext<GitHubAuthContextType | undefined>(
  undefined
)

interface GitHubAuthProviderProps {
  children: ReactNode
}

export function GitHubAuthProvider({ children }: GitHubAuthProviderProps) {
  const [user, setUser] = useState<GitHubUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const loginUrl = `https://github.com/login/oauth/authorize?client_id=${env.github.clientId}&redirect_uri=${encodeURIComponent(env.github.redirectUri)}&scope=user:email`

  const logout = () => {
    localStorage.removeItem('github_access_token')
    localStorage.removeItem('github_user')
    setUser(null)
  }

  useEffect(() => {
    const handleCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search)
      const code = urlParams.get('code')

      if (code) {
        try {
          // For demo purposes, we'll use a simplified approach
          // In production, you'd exchange the code on your backend
          console.log('OAuth code received:', code)

          // Simulate successful authentication for demo
          const demoUser = {
            id: 123456,
            login: 'demo-user',
            name: 'Demo User',
            avatar_url: 'https://github.com/identicons/demo-user.png',
            email: 'demo@example.com',
          }

          setUser(demoUser)
          localStorage.setItem('github_user', JSON.stringify(demoUser))
          window.history.replaceState(
            {},
            document.title,
            window.location.pathname
          )
        } catch (error) {
          console.error('Error handling callback:', error)
        }
      }

      // Check for saved user
      const savedUser = localStorage.getItem('github_user')
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser))
        } catch (error) {
          console.error('Error parsing saved user:', error)
          localStorage.removeItem('github_user')
        }
      }

      setIsLoading(false)
    }

    handleCallback()
  }, [])

  const value: GitHubAuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    loginUrl,
    logout,
  }

  return (
    <GitHubAuthContext.Provider value={value}>
      {children}
    </GitHubAuthContext.Provider>
  )
}

export function useGitHubAuth() {
  const context = useContext(GitHubAuthContext)
  if (context === undefined) {
    throw new Error('useGitHubAuth must be used within a GitHubAuthProvider')
  }
  return context
}
