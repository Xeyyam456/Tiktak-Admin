import { Component } from 'react'
import { ServerCrash } from 'lucide-react'
import Button from '@/shared/components/Button/Button'
import styles from './ErrorBoundary.module.css'

export default class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error(error, info)
  }

  render() {
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
