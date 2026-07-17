import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'
import { ServerCrash } from 'lucide-react'
import Button from '@/shared/components/Button/Button'
import styles from './ErrorBoundary.module.css'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  override state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  override componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info)
  }

  override render() {
    if (!this.state.hasError) return this.props.children

    return (
      <div className={styles.page}>
        <span className={styles.badge}>
          <ServerCrash size={32} />
        </span>
        <h1 className={styles.title}>Nəsə səhv getdi</h1>
        <p className={styles.text}>Sorğunu yerinə yetirmək mümkün olmadı. Bir az sonra yenidən cəhd edin.</p>
        <Button onClick={() => (window.location.href = '/sifarisler')}>Ana səhifəyə qayıt</Button>
      </div>
    )
  }
}
