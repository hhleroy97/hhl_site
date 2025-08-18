import { Component, ErrorInfo, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface Props {
  children?: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
    this.setState({
      error,
      errorInfo,
    })
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className='min-h-screen bg-tech-dark flex items-center justify-center px-4'>
          <motion.div
            className='max-w-md w-full text-center'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className='w-20 h-20 mx-auto mb-6 rounded-full bg-error/10 flex items-center justify-center'
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
            >
              <AlertTriangle className='w-10 h-10 text-error' />
            </motion.div>

            <motion.h1
              className='text-2xl font-display font-bold text-tech-text-primary mb-4'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Something went wrong
            </motion.h1>

            <motion.p
              className='text-tech-text-secondary mb-8 leading-relaxed'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              We encountered an unexpected error. Don't worry, this has been
              logged and we're working on it.
            </motion.p>

            <motion.div
              className='space-y-4'
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <button
                onClick={this.handleRetry}
                className='w-full px-6 py-3 bg-primary-500 hover:bg-primary-400 text-gray-900 font-display font-semibold rounded-lg transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-primary-500/20 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2 focus:ring-offset-tech-dark flex items-center justify-center gap-2'
                aria-label='Try again'
              >
                <RefreshCw className='w-4 h-4' />
                Try Again
              </button>

              <button
                onClick={() => window.location.reload()}
                className='w-full px-6 py-3 bg-tech-dark-surface hover:bg-tech-dark-elevated text-tech-text-secondary border border-tech-text-disabled/20 hover:border-tech-text-disabled/40 font-display font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-tech-neon focus:ring-offset-2 focus:ring-offset-tech-dark'
                aria-label='Reload page'
              >
                Reload Page
              </button>
            </motion.div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <motion.details
                className='mt-8 text-left'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <summary className='cursor-pointer text-sm text-cyberpunk-text-muted hover:text-tech-text-secondary transition-colors'>
                  Error Details (Development)
                </summary>
                <pre className='mt-4 p-4 bg-tech-dark-surface rounded-lg text-xs text-cyberpunk-text-muted overflow-auto max-h-40 border border-tech-text-disabled/10'>
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </motion.details>
            )}
          </motion.div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
