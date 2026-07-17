import { createRoot } from 'react-dom/client'
import '@/index.css'
import ErrorBoundary from '@/shared/components/ErrorBoundary/ErrorBoundary'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
)
