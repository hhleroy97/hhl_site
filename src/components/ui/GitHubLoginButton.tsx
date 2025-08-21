import { Github, LogOut } from 'lucide-react'
import { useGitHubAuth } from '../../contexts/GitHubAuthContext'

interface GitHubLoginButtonProps {
  className?: string
}

export function GitHubLoginButton({ className = '' }: GitHubLoginButtonProps) {
  const { user, isLoading, isAuthenticated, loginUrl, logout } = useGitHubAuth()

  if (isLoading) {
    return (
      <div
        className={`inline-flex items-center px-4 py-2 text-sm ${className}`}
      >
        <div className='animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent mr-2' />
        Loading...
      </div>
    )
  }

  if (isAuthenticated && user) {
    return (
      <div className={`inline-flex items-center space-x-3 ${className}`}>
        <div className='inline-flex items-center space-x-2'>
          <img
            src={user.avatar_url}
            alt={user.login}
            className='w-6 h-6 rounded-full'
          />
          <span className='text-sm font-medium'>{user.name || user.login}</span>
        </div>
        <button
          onClick={logout}
          className='inline-flex items-center px-3 py-1 text-xs bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors'
        >
          <LogOut className='w-3 h-3 mr-1' />
          Logout
        </button>
      </div>
    )
  }

  return (
    <a
      href={loginUrl}
      className={`inline-flex items-center px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-md transition-colors text-sm font-medium ${className}`}
    >
      <Github className='w-4 h-4 mr-2' />
      Login with GitHub
    </a>
  )
}
