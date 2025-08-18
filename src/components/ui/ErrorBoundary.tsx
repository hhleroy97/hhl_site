import { Component, ErrorInfo, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    this.setState({ error, errorInfo })
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <motion.div
          className='min-h-screen bg-cyberpunk-dark flex items-center justify-center p-4'
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className='max-w-md w-full bg-cyberpunk-dark-surface border border-cyberpunk-neon/20 rounded-xl p-6 backdrop-blur-sm'>
            <div className='text-center'>
              <div className='w-16 h-16 mx-auto mb-4 bg-red-500/10 border border-red-500/30 rounded-full flex items-center justify-center'>
                <AlertTriangle className='w-8 h-8 text-red-400' />
              </div>

              <h2 className='text-xl font-bold text-white mb-2'>
                Something went wrong
              </h2>

              <p className='text-cyberpunk-text-muted text-sm mb-6'>
                We encountered an unexpected error. Please try refreshing the
                page or contact support if the problem persists.
              </p>

              <div className='space-y-3'>
                <button
                  onClick={this.handleRetry}
                  className='w-full px-4 py-2 bg-cyberpunk-neon text-cyberpunk-dark font-medium rounded-lg hover:bg-cyberpunk-neon/90 transition-colors duration-200 flex items-center justify-center gap-2'
                >
                  <RefreshCw className='w-4 h-4' />
                  Try Again
                </button>

                <button
                  onClick={() => window.location.reload()}
                  className='w-full px-4 py-2 bg-cyberpunk-dark-elevated text-cyberpunk-text-primary border border-cyberpunk-neon/40 rounded-lg hover:bg-cyberpunk-dark-surface transition-colors duration-200'
                >
                  Refresh Page
                </button>
              </div>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className='mt-6 text-left'>
                  <summary className='text-cyberpunk-text-muted text-sm cursor-pointer hover:text-cyberpunk-text-secondary'>
                    Error Details (Development)
                  </summary>
                  <div className='mt-2 p-3 bg-cyberpunk-dark rounded-lg border border-cyberpunk-text-disabled/20'>
                    <pre className='text-xs text-red-400 overflow-auto'>
                      {this.state.error.toString()}
                    </pre>
                  </div>
                </details>
              )}
            </div>
          </div>
        </motion.div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
