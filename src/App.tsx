import RefactoredPortfolio from '@components/RefactoredPortfolio'
import { VisualizationProvider } from './contexts/VisualizationContext'

export default function App() {
  return (
    <VisualizationProvider>
      <RefactoredPortfolio />
    </VisualizationProvider>
  )
}
