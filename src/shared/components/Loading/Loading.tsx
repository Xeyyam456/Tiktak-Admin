import styles from './Loading.module.css'

interface LoadingProps {
  fullScreen?: boolean
}

export default function Loading({ fullScreen = false }: LoadingProps) {
  return (
    <div className={`flex flex-col items-center justify-center gap-5 ${styles.wrap} ${fullScreen ? styles.fullScreen : ''}`}>
      <span className={styles.spinner} />
      <span className={styles.text}>Yüklənir...</span>
    </div>
  )
}
