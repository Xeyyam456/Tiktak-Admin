import styles from './Loading.module.css'

export default function Loading({ fullScreen = false }) {
  return (
    <div className={`${styles.wrap} ${fullScreen ? styles.fullScreen : ''}`}>
      <span className={styles.spinner} />
      <span className={styles.text}>Yüklənir...</span>
    </div>
  )
}
